import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { PersistedStateFile, StateCorruptError, LockMetadata, LockOptions } from '../types';
import { readLegacyPersistedState, getStatePath } from '../common/stateManager';
import { buildScopedStatePath, buildScopedObjectKey } from '../common/stateScope';
import {
  applyRegionalMigration,
  planRegionalMigration,
  rollbackRegionalMigration,
  RegionalMigrationOptions,
  RegionalMigrationPaths,
  KeyValueIO,
  RegionalMigrationPlan,
} from '../common/regionalMigration';
import { createOssStorageAdapter } from '../common/stateBackend/ossStateBackend';
import { createCosStorageAdapter } from '../common/stateBackend/cosStateBackend';
import {
  createLockMetadata,
  isLockStale,
  isProcessAlive,
  LOCK_KEY_SUFFIX,
  sleep,
} from '../common/stateBackend/lockUtils';
import { LockError, formatLockInfo } from '../common/lockManager';
import { ProviderEnum } from '../common/providerEnum';
import { DEFAULT_LOCK_TIMEOUT, DEFAULT_LOCK_RETRY_DELAY } from '../common/constants';
import { logger } from '../common/logger';
import { lang } from '../lang';

/**
 * `si migrate --to-regional` (issue #280 §6): the explicit, protected V3 → V4
 * regional split for LOCAL and BUCKET_STORE backends — dry-run/apply, evidence
 * classification, exact backups, old-entry write barrier, auditable rollback.
 * Distinguishable from (and composable with) the legacy-to-SaaS migration,
 * which remains the default `si migrate` flow.
 */

export type RegionalMigrationCommandOptions = {
  provider: string;
  app: string;
  service: string;
  region: string;
  stage?: string;
  baseDir: string;
  backendType: 'LOCAL' | 'BUCKET_STORE';
  bucketConfig?: {
    bucket: string;
    key: string;
    storageRegion: string;
    accessKeyId: string;
    accessKeySecret: string;
    securityToken?: string;
  };
  /** Read the legacy aggregate of a renamed app/service (explicit rebinding). */
  legacyApp?: string;
  legacyService?: string;
  bindUnknownRegion?: string;
  dryRun?: boolean;
  rollbackOpId?: string;
  autoApprove?: boolean;
  askConfirmation: (message: string) => Promise<boolean>;
};

/* ---------------- storage IO adapters ---------------- */

const createLocalKeyValueIO = (): KeyValueIO => ({
  read: async <T>(filePath: string): Promise<T | null> => {
    if (!fs.existsSync(filePath)) {
      return null;
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T;
  },
  write: async (filePath: string, data: unknown): Promise<void> => {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const tmpPath = `${filePath}.tmp`;
    const fd = fs.openSync(tmpPath, 'w');
    try {
      fs.writeFileSync(fd, JSON.stringify(data, null, 2), 'utf-8');
      fs.fsyncSync(fd);
    } finally {
      fs.closeSync(fd);
    }
    fs.renameSync(tmpPath, filePath);
  },
  delete: async (filePath: string): Promise<void> => {
    try {
      fs.rmSync(filePath);
    } catch {
      // already gone
    }
  },
});

const createBucketKeyValueIO = (
  provider: string,
  config: NonNullable<RegionalMigrationCommandOptions['bucketConfig']>,
): KeyValueIO => {
  const isTencent = provider === ProviderEnum.TENCENT;
  const storageConfig = {
    bucket: config.bucket,
    region: config.storageRegion,
    accessKeyId: config.accessKeyId,
    accessKeySecret: config.accessKeySecret,
    securityToken: config.securityToken,
    lockPath: `${isTencent ? 'cos' : 'oss'}://${config.bucket}/${config.key}`,
  };
  const adapter = isTencent
    ? createCosStorageAdapter(storageConfig)
    : createOssStorageAdapter(storageConfig);
  return {
    read: adapter.read,
    write: adapter.write,
    delete: adapter.delete,
  };
};

/* ---------------- paths ---------------- */

const buildPaths = (
  options: RegionalMigrationCommandOptions,
): { paths: RegionalMigrationPaths; legacyKey: string } => {
  const sourceApp = options.legacyApp ?? options.app;
  const sourceService = options.legacyService ?? options.service;

  if (options.backendType === 'LOCAL') {
    const legacyKey = getStatePath(sourceApp, sourceService, options.baseDir);
    return {
      legacyKey,
      paths: {
        legacyKey,
        scopedPrefixBuilder: (stage, region) =>
          buildScopedStatePath(options.app, options.service, stage, region, options.baseDir),
        reportKey: (opId) =>
          path.join(
            options.baseDir,
            '.serverlessinsight',
            'states',
            `migration-report-${opId}.json`,
          ),
        backupKey: (opId) => `${legacyKey}.pre-regional-${opId}`,
      },
    };
  }

  const key = options.bucketConfig!.key;
  return {
    legacyKey: key,
    paths: {
      legacyKey: key,
      scopedPrefixBuilder: (stage, region) =>
        buildScopedObjectKey(key, options.app, options.service, stage, region),
      reportKey: (opId) => `${key}.scopes/migration-report-${opId}.json`,
      backupKey: (opId) => `${key}.pre-regional-${opId}.json`,
    },
  };
};

/* ---------------- migration-scoped exclusive lock ---------------- */

const withMigrationLock = async <T>(
  io: KeyValueIO,
  lockKey: string,
  displayPath: string,
  operation: string,
  fn: () => Promise<T>,
  options?: LockOptions,
): Promise<T> => {
  const timeout = options?.timeout ?? DEFAULT_LOCK_TIMEOUT;
  const retryDelay = options?.retryDelay ?? DEFAULT_LOCK_RETRY_DELAY;
  const maxRetries = options?.maxRetries ?? Math.ceil(timeout / retryDelay);
  const metadata = createLockMetadata(operation, displayPath);
  const startTime = Date.now();
  let attempt = 0;

  for (;;) {
    const existing = await io.read<LockMetadata>(lockKey);
    if (!existing) {
      // Protect the legacy aggregate with the same lock file/object an old CLI
      // would take, so the split cannot race a concurrent legacy write.
      const legacyIo = io as KeyValueIO & {
        putIfAbsent?: (key: string, data: unknown) => Promise<boolean>;
      };
      const created = legacyIo.putIfAbsent
        ? await legacyIo.putIfAbsent(lockKey, metadata)
        : await io.write(lockKey, metadata).then(() => true);
      if (created) {
        try {
          return await fn();
        } finally {
          const current = await io.read<LockMetadata>(lockKey);
          if (current?.id === metadata.id) {
            await io.delete(lockKey);
          }
        }
      }
    } else {
      if (existing.hostname === os.hostname() && !isProcessAlive(existing.processId)) {
        await io.delete(lockKey);
        continue;
      }
      if (isLockStale(existing)) {
        throw new LockError(
          `Legacy state is currently locked (stale lock detected).\n${formatLockInfo(existing)}\nIf you are certain no other operation is running, use:\n  si force-unlock ${existing.id}`,
          existing,
        );
      }
      if (Date.now() - startTime >= timeout) {
        throw new LockError(
          `Failed to acquire lock after ${timeout / 1000} seconds.\n${formatLockInfo(existing)}`,
          existing,
        );
      }
      logger.info(
        lang.__('LOCK_WAITING', {
          user: existing.user,
          timeAgo: '1m',
          attempt: String(attempt + 1),
        }),
      );
    }
    if (attempt >= maxRetries) {
      throw new LockError(`Failed to acquire lock.\n${displayPath}`, undefined);
    }
    await sleep(Math.min(retryDelay * Math.pow(2, attempt), 30000));
    attempt++;
  }
};

/* ---------------- command flows ---------------- */

const printPlanReport = (plan: RegionalMigrationPlan, legacyLocation: string): void => {
  logger.info(lang.__('REGIONAL_MIGRATION_PLAN_HEADER', { location: legacyLocation }));
  logger.info(lang.__('REGIONAL_MIGRATION_SOURCE_HASH', { hash: plan.sourceHash }));
  if (plan.documents.length === 0) {
    logger.info(lang.__('REGIONAL_MIGRATION_NO_REGIONAL_RESOURCES'));
  }
  for (const doc of plan.documents) {
    logger.info(
      lang.__('REGIONAL_MIGRATION_PLAN_DOCUMENT', {
        stage: doc.stage,
        region: doc.region,
        resources: String(doc.resources),
        shared: String(doc.shared),
      }),
    );
  }
  if (plan.unknown.length > 0) {
    logger.warn(lang.__('REGIONAL_MIGRATION_UNKNOWN_HEADER'));
    for (const item of plan.unknown) {
      logger.warn(
        lang.__('REGIONAL_MIGRATION_UNKNOWN_ITEM', {
          stage: item.stage,
          logicalId: item.logicalId,
          kind: item.kind,
        }),
      );
    }
    logger.warn(lang.__('REGIONAL_MIGRATION_UNKNOWN_HINT'));
  }
  for (const warning of plan.warnings) {
    logger.warn(warning);
  }
  logger.info(lang.__('REGIONAL_MIGRATION_BACKUP_NOTICE'));
};

/** Entry point behind `si migrate --to-regional`. */
export const runRegionalMigration = async (
  options: RegionalMigrationCommandOptions,
): Promise<void> => {
  if (options.backendType !== 'LOCAL' && options.backendType !== 'BUCKET_STORE') {
    throw new Error(lang.__('REGIONAL_MIGRATION_LOCAL_OR_BUCKET_ONLY'));
  }

  const io =
    options.backendType === 'LOCAL'
      ? createLocalKeyValueIO()
      : createBucketKeyValueIO(options.provider, options.bucketConfig!);

  const { paths, legacyKey } = buildPaths(options);
  const sourceApp = options.legacyApp ?? options.app;
  const sourceService = options.legacyService ?? options.service;

  // --rollback: restore the exact pre-split aggregate; refused once any split
  // document has taken independent regional writes.
  if (options.rollbackOpId) {
    await withMigrationLock(
      io,
      `${legacyKey}${LOCK_KEY_SUFFIX}`,
      legacyKey,
      'migrate-regional-rollback',
      async () => {
        await rollbackRegionalMigration(io, paths, options.rollbackOpId!);
      },
    );
    return;
  }

  await withMigrationLock(
    io,
    `${legacyKey}${LOCK_KEY_SUFFIX}`,
    legacyKey,
    'migrate-regional',
    async () => {
      // ① read the legacy aggregate (LOCAL: legacy path; BUCKET: discovery key)
      let legacy: PersistedStateFile | null;
      if (options.backendType === 'LOCAL') {
        legacy = readLegacyPersistedState(sourceApp, sourceService, options.baseDir);
        if (!legacy && fs.existsSync(legacyKey)) {
          // A legacy file exists but is not readable V3 — malformed data, never
          // silently treated as an empty deployment.
          try {
            JSON.parse(fs.readFileSync(legacyKey, 'utf-8'));
          } catch (error) {
            throw new StateCorruptError(legacyKey, error);
          }
          legacy = null;
        }
      } else {
        legacy = await io.read<PersistedStateFile>(legacyKey);
      }
      if (!legacy) {
        throw new Error(lang.__('REGIONAL_MIGRATION_NO_LEGACY_STATE', { location: legacyKey }));
      }

      const migrationOptions: RegionalMigrationOptions = {
        provider: options.provider,
        app: options.app,
        service: options.service,
        ...(options.bindUnknownRegion ? { bindUnknownRegion: options.bindUnknownRegion } : {}),
        ...(options.stage ? { stage: options.stage } : {}),
      };

      // ② classify + plan (dry-run)
      const plan = planRegionalMigration(legacy, paths, migrationOptions);
      printPlanReport(plan, legacyKey);

      if (options.dryRun) {
        logger.info(lang.__('REGIONAL_MIGRATION_DRY_RUN_NOTICE'));
        return;
      }

      // ③ confirm (skipped with --auto-approve)
      if (!options.autoApprove) {
        if (!(await options.askConfirmation(lang.__('REGIONAL_MIGRATION_CONFIRM')))) {
          logger.info(lang.__('MIGRATE_CANCELLED'));
          return;
        }
      }

      // ④ apply: backup → scoped docs → barrier → report
      await applyRegionalMigration(io, legacy, paths, plan, {
        ...migrationOptions,
        app: options.app,
        service: options.service,
        provider: options.provider,
      });
    },
  );
};
