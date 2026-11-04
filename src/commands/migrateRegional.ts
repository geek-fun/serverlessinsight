import { createLocalStateIO } from '../common';
import {
  PersistedStateFile,
  LEGACY_STATE_VERSION,
  StateCorruptError,
  StateVersionError,
} from '../types';
import { readLegacyPersistedState, getStatePath } from '../common/stateManager';
import {
  applyRegionalMigration,
  planRegionalMigration,
  rollbackRegionalMigration,
  withIoLock,
  readRegionalMigrationJournal,
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
import { AGGREGATE_STATE_VERSION, readAggregateDocument } from '../common/aggregateState';

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
    storageProvider?: string;
    accessKeyId: string;
    accessKeySecret: string;
    securityToken?: string;
  };
  legacyApp?: string;
  legacyService?: string;
  bindUnknownRegion?: string;
  dryRun?: boolean;
  rollbackOpId?: string;
  autoApprove?: boolean;
  askConfirmation: (message: string) => Promise<boolean>;
};

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
    ...(adapter.putIfAbsent ? { putIfAbsent: adapter.putIfAbsent } : {}),
  };
};

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
        reportKey: (opId) => `${legacyKey}.migration-report-${opId}.json`,
        backupKey: (opId) => `${legacyKey}.pre-regional-${opId}`,
      },
    };
  }

  const key = options.bucketConfig!.key;
  return {
    legacyKey: key,
    paths: {
      legacyKey: key,
      reportKey: (opId) => `${key}.migration-report-${opId}.json`,
      backupKey: (opId) => `${key}.pre-regional-${opId}.json`,
    },
  };
};

const printPlanReport = (plan: RegionalMigrationPlan, legacyLocation: string): void => {
  logger.info(lang.__('REGIONAL_MIGRATION_PLAN_HEADER', { location: legacyLocation }));
  logger.info(lang.__('REGIONAL_MIGRATION_SOURCE_HASH', { hash: plan.sourceHash }));
  if (plan.documents.length === 0) {
    logger.info(lang.__('REGIONAL_MIGRATION_NO_REGIONAL_RESOURCES'));
  }
  plan.documents.forEach((doc) => {
    logger.info(
      lang.__('REGIONAL_MIGRATION_PLAN_DOCUMENT', {
        stage: doc.stage,
        region: doc.region,
        resources: String(doc.resources),
        shared: String(doc.shared),
      }),
    );
  });
  if (plan.unknown.length > 0) {
    logger.warn(lang.__('REGIONAL_MIGRATION_UNKNOWN_HEADER'));
    plan.unknown.forEach((item) => {
      logger.warn(
        lang.__('REGIONAL_MIGRATION_UNKNOWN_ITEM', {
          stage: item.stage,
          logicalId: item.logicalId,
          kind: item.kind,
        }),
      );
    });
    logger.warn(lang.__('REGIONAL_MIGRATION_UNKNOWN_HINT'));
  }
  plan.warnings.forEach((warning) => logger.warn(warning));
  logger.info(lang.__('REGIONAL_MIGRATION_BACKUP_NOTICE'));
};

export const runRegionalMigration = async (
  options: RegionalMigrationCommandOptions,
): Promise<void> => {
  if (options.backendType !== 'LOCAL' && options.backendType !== 'BUCKET_STORE') {
    throw new Error(lang.__('REGIONAL_MIGRATION_LOCAL_OR_BUCKET_ONLY'));
  }

  const io =
    options.backendType === 'LOCAL'
      ? createLocalStateIO()
      : createBucketKeyValueIO(
          options.bucketConfig!.storageProvider ?? options.provider,
          options.bucketConfig!,
        );

  const { paths, legacyKey } = buildPaths(options);
  if (
    (options.legacyApp && options.legacyApp !== options.app) ||
    (options.legacyService && options.legacyService !== options.service)
  ) {
    throw new Error(lang.__('STATE_IDENTITY_REBIND_UNSUPPORTED'));
  }
  const sourceApp = options.legacyApp ?? options.app;
  const sourceService = options.legacyService ?? options.service;

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
      const pending = await readRegionalMigrationJournal(io, paths);
      if (pending?.phase === 'rolling-back') {
        throw new Error(lang.__('REGIONAL_MIGRATION_PENDING', { opId: pending.plan.opId }));
      }
      if (pending?.phase === 'applying' && !pending.aggregate) {
        throw new Error(lang.__('REGIONAL_MIGRATION_PENDING', { opId: pending.plan.opId }));
      }
      if (pending?.phase !== 'applying') {
        const current = await io.read<PersistedStateFile>(legacyKey).catch((error: unknown) => {
          if (error instanceof SyntaxError) throw new StateCorruptError(legacyKey, error);
          throw error;
        });
        if (current?.version === AGGREGATE_STATE_VERSION) {
          readAggregateDocument(current, options, legacyKey);
          return;
        }
        if (current?.version && current.version !== LEGACY_STATE_VERSION) {
          throw new StateVersionError(current.version, LEGACY_STATE_VERSION);
        }
      }
      let legacy: PersistedStateFile | null;
      if (pending?.phase === 'applying') {
        legacy = await io.read<PersistedStateFile>(paths.backupKey(pending.plan.opId));
      } else if (options.backendType === 'LOCAL') {
        legacy = readLegacyPersistedState(sourceApp, sourceService, options.baseDir);
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

      const plan =
        pending?.phase === 'applying'
          ? pending.plan
          : planRegionalMigration(legacy, migrationOptions);
      printPlanReport(plan, legacyKey);

      if (options.dryRun) {
        logger.info(lang.__('REGIONAL_MIGRATION_DRY_RUN_NOTICE'));
        return;
      }

      if (!options.autoApprove) {
        if (!(await options.askConfirmation(lang.__('REGIONAL_MIGRATION_CONFIRM')))) {
          logger.info(lang.__('MIGRATE_CANCELLED'));
          return;
        }
      }

      await applyRegionalMigration(io, legacy, paths, plan, {
        ...migrationOptions,
        app: options.app,
        service: options.service,
        provider: options.provider,
      });
    },
  );
};
