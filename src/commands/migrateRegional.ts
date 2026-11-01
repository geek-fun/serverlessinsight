import fs from 'node:fs';
import path from 'node:path';
import { PersistedStateFile } from '../types';
import { readLegacyPersistedState, getStatePath } from '../common/stateManager';
import { MANAGED_BY_REGIONAL } from '../common/migrationMarker';
import {
  buildScopedStatePath,
  buildScopedObjectKey,
  buildServiceBindingPath,
  buildServiceObjectKey,
} from '../common/stateScope';
import {
  applyRegionalMigration,
  planRegionalMigration,
  rollbackRegionalMigration,
  withIoLock,
  RegionalMigrationOptions,
  RegionalMigrationPaths,
  KeyValueIO,
  RegionalMigrationPlan,
} from '../common/regionalMigration';
import { createOssStorageAdapter } from '../common/stateBackend/ossStateBackend';
import { createCosStorageAdapter } from '../common/stateBackend/cosStateBackend';
import { LOCK_KEY_SUFFIX } from '../common/stateBackend/lockUtils';
import { ProviderEnum } from '../common/providerEnum';
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
    /** Static storage provider — may differ from the workload provider. */
    storageProvider?: string;
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
  storageProvider: string,
  config: NonNullable<RegionalMigrationCommandOptions['bucketConfig']>,
): KeyValueIO => {
  const isTencent = storageProvider === ProviderEnum.TENCENT;
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
    // Preserve the adapter's atomic exclusive create so the migration lock is
    // race-safe on bucket storage too (issue #280 §3).
    ...(adapter.putIfAbsent ? { putIfAbsent: adapter.putIfAbsent } : {}),
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
        serviceBindingKey: buildServiceBindingPath(options.app, options.service, options.baseDir),
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
      serviceBindingKey: buildServiceObjectKey(key, options.app, options.service),
    },
  };
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
      : createBucketKeyValueIO(
          options.bucketConfig!.storageProvider ?? options.provider,
          options.bucketConfig!,
        );

  const { paths, legacyKey } = buildPaths(options);
  const sourceApp = options.legacyApp ?? options.app;
  const sourceService = options.legacyService ?? options.service;

  // --rollback: restore the exact pre-split aggregate; refused once any split
  // document has taken independent regional writes.
  if (options.rollbackOpId) {
    await withIoLock(
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

  await withIoLock(
    io,
    `${legacyKey}${LOCK_KEY_SUFFIX}`,
    legacyKey,
    'migrate-regional',
    async () => {
      // ① read the legacy aggregate (LOCAL: legacy path; BUCKET: discovery key)
      let legacy: PersistedStateFile | null;
      if (options.backendType === 'LOCAL') {
        // STRICT read (issue #280): corrupt → StateCorruptError, future
        // version → StateVersionError. The only null-with-file case is the
        // post-split tombstone — surface the already-split guidance.
        legacy = readLegacyPersistedState(sourceApp, sourceService, options.baseDir);
        if (!legacy && fs.existsSync(legacyKey)) {
          const tombstone = JSON.parse(fs.readFileSync(legacyKey, 'utf-8')) as {
            managedBy?: string;
          };
          if (tombstone.managedBy === MANAGED_BY_REGIONAL) {
            throw new Error(lang.__('REGIONAL_MIGRATION_ALREADY_SPLIT'));
          }
          legacy = null;
        }
      } else {
        legacy = await io.read<PersistedStateFile>(legacyKey);
        if (legacy?.managedBy === MANAGED_BY_REGIONAL) {
          throw new Error(lang.__('REGIONAL_MIGRATION_ALREADY_SPLIT'));
        }
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
