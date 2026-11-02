import crypto from 'node:crypto';
import os from 'node:os';
import {
  PersistedStateFile,
  ResourceState,
  StateFile,
  StateMigrationInfo,
  CURRENT_STATE_VERSION,
  LEGACY_STATE_VERSION,
  LockMetadata,
} from '../types';
import { canonicalizeRegion, validateScopeKeyPart } from './stateScope';
import { MANAGED_BY_REGIONAL, MANAGED_BY_SAAS } from './migrationMarker';
import { logger } from './logger';
import { LockError, formatLockInfo } from './lockManager';
import {
  LOCK_KEY_SUFFIX,
  createLockMetadata,
  isLockStale,
  isProcessAlive,
  sleep,
} from './stateBackend/lockUtils';
import { DEFAULT_LOCK_TIMEOUT, DEFAULT_LOCK_RETRY_DELAY } from './constants';
import { lang } from '../lang';
import { claimProviderBinding } from './providerBinding';
import { ConditionalPutUnsupportedError } from './stateBackend/types';

export type KeyValueIO = {
  read: <T>(key: string) => Promise<T | null>;
  write: (key: string, data: unknown) => Promise<void>;
  delete: (key: string) => Promise<void>;
  putIfAbsent?: (key: string, data: unknown) => Promise<boolean>;
};

export type RegionalMigrationPaths = {
  legacyKey: string;
  scopedPrefixBuilder: (stage: string, region: string) => string;
  reportKey: (opId: string) => string;
  backupKey: (opId: string) => string;
  serviceBindingKey: string;
};

export type ProviderBinding = {
  provider: string;
  recordedAt: string;
};

export const withIoLock = async <T>(
  io: KeyValueIO,
  lockKey: string,
  displayPath: string,
  operation: string,
  fn: () => Promise<T>,
  options?: { timeout?: number; retryDelay?: number; maxRetries?: number },
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
      if (!io.putIfAbsent) throw new Error(lang.__('STATE_ATOMIC_CREATE_REQUIRED'));
      let created: boolean;
      try {
        created = await io.putIfAbsent(lockKey, metadata);
      } catch (error) {
        if (error instanceof ConditionalPutUnsupportedError) {
          throw new Error(lang.__('STATE_ATOMIC_CREATE_REQUIRED'), { cause: error });
        }
        throw error;
      }
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
    } else if (existing.hostname === os.hostname() && !isProcessAlive(existing.processId)) {
      await io.delete(lockKey);
      continue;
    } else if (isLockStale(existing)) {
      throw new LockError(
        lang.__('REGIONAL_LOCK_STALE', { info: formatLockInfo(existing), id: existing.id }),
        existing,
      );
    } else if (Date.now() - startTime >= timeout) {
      throw new LockError(
        lang.__('REGIONAL_LOCK_TIMEOUT', {
          seconds: String(timeout / 1000),
          info: formatLockInfo(existing),
        }),
        existing,
      );
    } else {
      logger.info(
        lang.__('LOCK_WAITING', {
          user: existing.user,
          timeAgo: '1m',
          attempt: String(attempt + 1),
        }),
      );
    }
    if (attempt >= maxRetries) {
      throw new LockError(lang.__('REGIONAL_LOCK_FAILED', { path: displayPath }), undefined);
    }
    await sleep(Math.min(retryDelay * Math.pow(2, attempt), 30000));
    attempt++;
  }
};

const readProviderBinding = async (
  io: KeyValueIO,
  paths: Pick<RegionalMigrationPaths, 'serviceBindingKey'>,
): Promise<ProviderBinding | null> => io.read<ProviderBinding>(paths.serviceBindingKey);

export type RegionEvidence = {
  logicalId: string;
  kind: 'resource' | 'shared';
  region: string | null;
};

export type RegionalMigrationPlan = {
  opId: string;
  sourceVersion: string;
  sourceHash: string;
  documents: Array<{
    stage: string;
    region: string;
    resources: number;
    shared: number;
  }>;
  unknown: Array<{ stage: string; logicalId: string; kind: 'resource' | 'shared' }>;
  warnings: string[];
};

export type RegionalMigrationOptions = {
  provider: string;
  app: string;
  service: string;
  bindUnknownRegion?: string;
  stage?: string;
};

type RegionalMigrationReport = RegionalMigrationPlan & {
  migratedAt: string;
  barrierWritten: boolean;
};

const emptyRegion = (region: string | undefined | null): boolean =>
  !region || String(region).trim().length === 0;

export const collectRegionEvidence = (
  legacy: PersistedStateFile,
): Array<{ stage: string; evidence: RegionEvidence }> => {
  return Object.entries(legacy.stages ?? {}).flatMap(([stage, stageState]) =>
    (['resource', 'shared'] as const).flatMap((kind) =>
      Object.entries(
        kind === 'resource' ? (stageState.resources ?? {}) : (stageState.shared ?? {}),
      ).map(([logicalId, resource]) => ({
        stage,
        evidence: {
          logicalId,
          kind,
          region: emptyRegion(resource.region) ? null : String(resource.region).toLowerCase(),
        },
      })),
    ),
  );
};

export const hashDocument = (doc: unknown): string =>
  crypto.createHash('sha256').update(JSON.stringify(doc)).digest('hex');

export const planRegionalMigration = (
  legacy: PersistedStateFile,
  options: RegionalMigrationOptions,
): RegionalMigrationPlan => {
  if (legacy.managedBy === MANAGED_BY_SAAS) {
    throw new Error(lang.__('REGIONAL_MIGRATION_SOURCE_MANAGED_BY_SAAS'));
  }

  if (legacy.managedBy === MANAGED_BY_REGIONAL) {
    throw new Error(lang.__('REGIONAL_MIGRATION_ALREADY_SPLIT'));
  }
  if (legacy.version && legacy.version !== LEGACY_STATE_VERSION) {
    throw new Error(
      lang.__('REGIONAL_MIGRATION_UNSUPPORTED_SOURCE', {
        version: legacy.version,
        expected: LEGACY_STATE_VERSION,
      }),
    );
  }

  const evidence = collectRegionEvidence(legacy).filter(
    ({ stage }) => !options.stage || stage === options.stage,
  );
  const unknown = evidence
    .filter(({ evidence: item }) => item.region === null)
    .map(({ stage, evidence: item }) => ({ stage, logicalId: item.logicalId, kind: item.kind }));
  // A local Map keeps grouping linear without mutating the source state.
  const regionGroups = evidence.reduce((groups, { stage, evidence: item }) => {
    if (item.region === null) return groups;
    const key = `${stage}::${item.region}`;
    const previous = groups.get(key) ?? { resources: 0, shared: 0 };
    return groups.set(key, {
      resources: previous.resources + Number(item.kind === 'resource'),
      shared: previous.shared + Number(item.kind === 'shared'),
    });
  }, new Map<string, { resources: number; shared: number }>());
  const warnings =
    legacy.provider && legacy.provider !== options.provider
      ? [
          lang.__('REGIONAL_MIGRATION_PROVIDER_MISMATCH', {
            source: legacy.provider,
            effective: options.provider,
          }),
        ]
      : [];

  return {
    opId: crypto.randomUUID(),
    sourceVersion: legacy.version ?? LEGACY_STATE_VERSION,
    sourceHash: hashDocument(legacy),
    documents: Array.from(regionGroups.entries()).map(([key, group]) => {
      const [stage, region] = key.split('::');
      return { stage, region, ...group };
    }),
    unknown,
    warnings,
  };
};

const buildStageStateForRegion = (
  legacy: PersistedStateFile,
  stage: string,
  region: string,
): { resources: Record<string, ResourceState>; shared: Record<string, ResourceState> } => {
  const stageState = legacy.stages?.[stage];
  const selectRegion = (resources: Record<string, ResourceState> = {}) =>
    Object.fromEntries(
      Object.entries(resources).filter(
        ([, resource]) =>
          !emptyRegion(resource.region) && String(resource.region).toLowerCase() === region,
      ),
    );
  return {
    resources: selectRegion(stageState?.resources),
    shared: selectRegion(stageState?.shared),
  };
};

export const buildScopedDocument = (
  legacy: PersistedStateFile,
  plan: { sourceVersion: string; sourceHash: string; opId: string },
  scope: { stage: string; region: string },
  target: { provider: string; app: string; service: string },
): StateFile => {
  validateScopeKeyPart(scope.stage, 'stage');
  canonicalizeRegion(scope.region);
  const { resources, shared } = buildStageStateForRegion(legacy, scope.stage, scope.region);
  const migration: StateMigrationInfo = {
    opId: plan.opId,
    sourceVersion: plan.sourceVersion,
    sourceHash: plan.sourceHash,
    migratedAt: new Date().toISOString(),
  };
  return {
    version: CURRENT_STATE_VERSION,
    provider: target.provider,
    app: target.app,
    service: target.service,
    ...(legacy.orgId ? { orgId: legacy.orgId } : {}),
    ...(legacy.appId ? { appId: legacy.appId } : {}),
    ...(legacy.serviceId ? { serviceId: legacy.serviceId } : {}),
    scope: { stage: scope.stage, region: scope.region },
    lineage: crypto.randomUUID(),
    serial: 1,
    migration,
    stages: {
      [scope.stage]: {
        resources,
        ...(Object.keys(shared).length > 0 ? { shared } : {}),
      },
    },
    resources,
  };
};

type RegionalMigrationJournal = {
  plan: RegionalMigrationPlan;
  options: RegionalMigrationOptions;
  targets: Array<{ stage: string; region: string; state: PersistedStateFile }>;
  phase: 'applying' | 'complete' | 'rolling-back';
};

const journalKey = (paths: RegionalMigrationPaths): string =>
  `${paths.legacyKey}.regional-migration.json`;

export const readRegionalMigrationJournal = (
  io: KeyValueIO,
  paths: RegionalMigrationPaths,
): Promise<RegionalMigrationJournal | null> => io.read(journalKey(paths));

const withTargetLocks = <T>(
  io: KeyValueIO,
  paths: RegionalMigrationPaths,
  targets: Array<{ stage: string; region: string }>,
  operation: string,
  fn: () => Promise<T>,
): Promise<T> =>
  [...new Set(targets.map((target) => paths.scopedPrefixBuilder(target.stage, target.region)))]
    .sort()
    .reduceRight<() => Promise<T>>(
      (next, key) => () => withIoLock(io, `${key}${LOCK_KEY_SUFFIX}`, key, operation, next),
      fn,
    )();

const stripRuntimeProjection = (state: StateFile): PersistedStateFile => {
  const { resources: _projection, ...persisted } = state;
  return persisted;
};

const buildMigrationTargets = (
  legacy: PersistedStateFile,
  plan: RegionalMigrationPlan,
  options: RegionalMigrationOptions,
): RegionalMigrationJournal['targets'] => {
  const bound = options.bindUnknownRegion
    ? canonicalizeRegion(options.bindUnknownRegion)
    : undefined;
  const boundScopes = bound
    ? [...new Set(plan.unknown.map((item) => item.stage))]
        .filter(
          (stage) =>
            !plan.documents.some((scope) => scope.stage === stage && scope.region === bound),
        )
        .map((stage) => ({ stage, region: bound, resources: 0, shared: 0 }))
    : [];
  return [...plan.documents, ...boundScopes].map(({ stage, region }) => {
    const state = buildScopedDocument(
      legacy,
      plan,
      { stage, region },
      {
        provider: legacy.provider || options.provider,
        app: options.app,
        service: options.service,
      },
    );
    if (bound !== region) return { stage, region, state: stripRuntimeProjection(state) };
    const unknownFor = (kind: 'resource' | 'shared') =>
      Object.fromEntries(
        plan.unknown
          .filter((item) => item.stage === stage && item.kind === kind)
          .flatMap((item) => {
            const store = kind === 'shared' ? 'shared' : 'resources';
            const resource = legacy.stages[stage]?.[store]?.[item.logicalId];
            return resource ? [[item.logicalId, { ...resource, region }]] : [];
          }),
      );
    const shared = unknownFor('shared');
    return {
      stage,
      region,
      state: stripRuntimeProjection({
        ...state,
        stages: {
          ...state.stages,
          [stage]: {
            ...state.stages[stage],
            resources: { ...state.stages[stage].resources, ...unknownFor('resource') },
            ...(Object.keys(shared).length
              ? { shared: { ...state.stages[stage].shared, ...shared } }
              : {}),
          },
        },
      }),
    };
  });
};

const assertMigrationSource = (
  source: PersistedStateFile | null,
  plan: RegionalMigrationPlan,
): void => {
  if (!source) throw new Error(lang.__('REGIONAL_MIGRATION_SOURCE_MISSING'));
  const ownTombstone =
    source.managedBy === MANAGED_BY_REGIONAL &&
    source.migration?.opId === plan.opId &&
    source.migration.sourceHash === plan.sourceHash;
  if (!ownTombstone && hashDocument(source) !== plan.sourceHash) {
    throw new Error(lang.__('REGIONAL_MIGRATION_SOURCE_CHANGED'));
  }
};

/** Caller holds the legacy lock; all target locks remain held through cutover. */
export const applyRegionalMigration = async (
  io: KeyValueIO,
  legacy: PersistedStateFile,
  paths: RegionalMigrationPaths,
  plan: RegionalMigrationPlan,
  options: RegionalMigrationOptions,
): Promise<RegionalMigrationReport> => {
  if (plan.unknown.length > 0 && !options.bindUnknownRegion) {
    throw new Error(lang.__('REGIONAL_MIGRATION_UNKNOWN_REGION_REQUIRED'));
  }
  const binding = await readProviderBinding(io, paths);
  if (binding && binding.provider !== (legacy.provider || options.provider)) {
    throw new Error(
      lang.__('STATE_PROVIDER_BINDING_MISMATCH', {
        stored: binding.provider,
        requested: legacy.provider || options.provider,
      }),
    );
  }
  const previous = await readRegionalMigrationJournal(io, paths);
  if (
    previous &&
    (previous.plan.opId !== plan.opId ||
      !(['provider', 'app', 'service', 'stage', 'bindUnknownRegion'] as const).every(
        (key) => previous.options[key] === options[key],
      ) ||
      previous.phase === 'rolling-back')
  ) {
    throw new Error(lang.__('REGIONAL_MIGRATION_PENDING', { opId: previous.plan.opId }));
  }
  const journal: RegionalMigrationJournal = previous ?? {
    plan,
    options,
    targets: buildMigrationTargets(legacy, plan, options),
    phase: 'applying',
  };
  const uncovered = Object.entries(legacy.stages).filter(
    ([stage, value]) =>
      (Object.keys(value.resources ?? {}).length || Object.keys(value.shared ?? {}).length) &&
      !journal.targets.some((target) => target.stage === stage),
  );
  if (uncovered.length) {
    throw new Error(
      lang.__('REGIONAL_MIGRATION_INCOMPLETE_STAGE_COVERAGE', {
        stages: uncovered.map(([stage]) => stage).join(', '),
      }),
    );
  }
  return withTargetLocks(io, paths, journal.targets, 'migrate-regional-target', async () => {
    assertMigrationSource(await io.read<PersistedStateFile>(paths.legacyKey), plan);
    if (journal.phase !== 'complete') {
      await Promise.all(
        journal.targets.map(async (target) => {
          const existing = await io.read<PersistedStateFile>(
            paths.scopedPrefixBuilder(target.stage, target.region),
          );
          if (existing && (!previous || hashDocument(existing) !== hashDocument(target.state))) {
            throw new Error(
              lang.__('REGIONAL_MIGRATION_TARGET_EXISTS', {
                stage: target.stage,
                region: target.region,
                opId: existing.migration?.opId ?? 'independent',
              }),
            );
          }
        }),
      );
    }
    const backup = await io.read<PersistedStateFile>(paths.backupKey(plan.opId));
    if (backup && hashDocument(backup) !== plan.sourceHash) {
      throw new Error(lang.__('REGIONAL_MIGRATION_SOURCE_CHANGED'));
    }
    if (!backup) await io.write(paths.backupKey(plan.opId), legacy);
    if (!previous) await io.write(journalKey(paths), journal);
    try {
      await claimProviderBinding(io, paths.serviceBindingKey, legacy.provider || options.provider);
      if (journal.phase !== 'complete') {
        // Persist in journal order so a failed write leaves a deterministic recovery boundary.
        for (const target of journal.targets) {
          const key = paths.scopedPrefixBuilder(target.stage, target.region);
          if (!(await io.read(key))) await io.write(key, target.state);
        }
        await io.write(paths.legacyKey, {
          ...legacy,
          version: CURRENT_STATE_VERSION,
          managedBy: MANAGED_BY_REGIONAL,
          migration: journal.targets[0]?.state.migration ?? {
            opId: plan.opId,
            sourceVersion: plan.sourceVersion,
            sourceHash: plan.sourceHash,
            migratedAt: new Date().toISOString(),
          },
        });
      }
      const report: RegionalMigrationReport = {
        ...plan,
        documents: journal.targets.map(({ stage, region, state }) => ({
          stage,
          region,
          resources: Object.keys(state.stages[stage].resources).length,
          shared: Object.keys(state.stages[stage].shared ?? {}).length,
        })),
        migratedAt: new Date().toISOString(),
        barrierWritten: true,
      };
      await io.write(paths.reportKey(plan.opId), report);
      await io.write(journalKey(paths), { ...journal, phase: 'complete' });
      logger.info(lang.__('REGIONAL_MIGRATION_APPLIED', { opId: plan.opId }));
      return report;
    } catch (error) {
      logger.error(
        lang.__('REGIONAL_MIGRATION_PARTIAL_FAILURE', {
          opId: plan.opId,
          error: error instanceof Error ? error.message : String(error),
        }),
      );
      throw error;
    }
  });
};

export const rollbackRegionalMigration = async (
  io: KeyValueIO,
  paths: RegionalMigrationPaths,
  opId: string,
): Promise<void> => {
  const journal = await readRegionalMigrationJournal(io, paths);
  const report = await io.read<RegionalMigrationReport>(paths.reportKey(opId));
  const ownJournal = journal?.plan.opId === opId ? journal : null;
  if (!report && !ownJournal)
    throw new Error(lang.__('REGIONAL_MIGRATION_REPORT_MISSING', { opId }));
  const plan = report ?? ownJournal!.plan;
  const backup = await io.read<PersistedStateFile>(paths.backupKey(opId));
  if (!backup) throw new Error(lang.__('REGIONAL_MIGRATION_BACKUP_MISSING', { opId }));
  const targets = ownJournal?.targets ?? plan.documents;
  await withTargetLocks(io, paths, targets, 'migrate-regional-rollback-target', async () => {
    assertMigrationSource(await io.read<PersistedStateFile>(paths.legacyKey), plan);
    if (hashDocument(backup) !== plan.sourceHash)
      throw new Error(lang.__('REGIONAL_MIGRATION_SOURCE_CHANGED'));
    await Promise.all(
      targets.map(async (target) => {
        const current = await io.read<PersistedStateFile>(
          paths.scopedPrefixBuilder(target.stage, target.region),
        );
        if (!current) return;
        const pristine =
          current.migration?.opId === opId &&
          current.serial === 1 &&
          (!('state' in target) || hashDocument(current) === hashDocument(target.state));
        if (!pristine)
          throw new Error(
            lang.__('REGIONAL_MIGRATION_ROLLBACK_BLOCKED', {
              stage: target.stage,
              region: target.region,
            }),
          );
      }),
    );
    if (ownJournal) await io.write(journalKey(paths), { ...ownJournal, phase: 'rolling-back' });
    for (const target of targets)
      await io.delete(paths.scopedPrefixBuilder(target.stage, target.region));
    await io.write(paths.legacyKey, backup);
    await io.delete(paths.reportKey(opId));
    if (ownJournal) await io.delete(journalKey(paths));
    await io.delete(paths.backupKey(opId));
    logger.info(lang.__('REGIONAL_MIGRATION_ROLLED_BACK', { opId }));
  });
};
