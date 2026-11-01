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

/**
 * Protected V3 → V4 regional split (issue #280 §6).
 *
 * A legacy V3 aggregate mixes every stage of one App/Service in one document
 * with no region axis. Splitting it into one V4 document per Stage/Region must
 * be explicit (dry-run/apply), evidence-based, backed up, and reversible — it
 * must never infer ownership the source cannot prove.
 */

/** Minimal key/value IO shared by local (fs) and bucket (OSS/COS) storage. */
export type KeyValueIO = {
  read: <T>(key: string) => Promise<T | null>;
  write: (key: string, data: unknown) => Promise<void>;
  delete: (key: string) => Promise<void>;
  /** Atomic exclusive create. Mutations refuse stores that lack this operation. */
  putIfAbsent?: (key: string, data: unknown) => Promise<boolean>;
};

export type RegionalMigrationPaths = {
  /** Legacy aggregate location (local path or bucket object key). */
  legacyKey: string;
  /** Absolute storage root for scoped documents (dir or key prefix). */
  scopedPrefixBuilder: (stage: string, region: string) => string;
  /** Where the migration report is stored. */
  reportKey: (opId: string) => string;
  /** Where the pre-migration backup is stored. */
  backupKey: (opId: string) => string;
  /** Service-level provider binding record (states/<app>/<service>/provider.json). */
  serviceBindingKey: string;
};

/**
 * Service-level provider binding record (issue #280 §1): one Service has
 * exactly one provider across ALL its Stage/Region scopes. Stored next to the
 * scoped documents so a new region cannot open the service under a different
 * provider.
 */
export type ProviderBinding = {
  provider: string;
  recordedAt: string;
};

/**
 * Exclusive lock over an arbitrary IO key. Used for the legacy aggregate AND
 * each migration target so a concurrent deploy on one scope cannot interleave
 * with the split. Requires verified conditional creation; read/write/verify is not mutual exclusion.
 */
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
        `State is currently locked (stale lock detected).\n${formatLockInfo(existing)}\nIf you are certain no other operation is running, use:\n  si force-unlock ${existing.id}`,
        existing,
      );
    } else if (Date.now() - startTime >= timeout) {
      throw new LockError(
        `Failed to acquire lock after ${timeout / 1000} seconds.\n${formatLockInfo(existing)}`,
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
      throw new LockError(`Failed to acquire lock.\n${displayPath}`, undefined);
    }
    await sleep(Math.min(retryDelay * Math.pow(2, attempt), 30000));
    attempt++;
  }
};

/** Read the service provider binding; null when not yet recorded. */
export const readProviderBinding = async (
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
  /** Resources whose recorded provider does not match the effective provider. */
  warnings: string[];
};

export type RegionalMigrationOptions = {
  provider: string;
  app: string;
  service: string;
  /** Explicit binding for resources without region evidence (required when unknowns exist). */
  bindUnknownRegion?: string;
  /** Restrict the split to one stage (others stay in the legacy aggregate). */
  stage?: string;
};

export type RegionalMigrationReport = RegionalMigrationPlan & {
  migratedAt: string;
  barrierWritten: boolean;
};

const emptyRegion = (region: string | undefined | null): boolean =>
  !region || String(region).trim().length === 0;

/** Collect region evidence for every resource in the legacy aggregate. */
export const collectRegionEvidence = (
  legacy: PersistedStateFile,
): Array<{ stage: string; evidence: RegionEvidence }> => {
  const result: Array<{ stage: string; evidence: RegionEvidence }> = [];
  for (const [stage, stageState] of Object.entries(legacy.stages ?? {})) {
    for (const [logicalId, resource] of Object.entries(stageState.resources ?? {})) {
      result.push({
        stage,
        evidence: {
          logicalId,
          kind: 'resource',
          region: emptyRegion(resource.region) ? null : String(resource.region).toLowerCase(),
        },
      });
    }
    for (const [logicalId, resource] of Object.entries(stageState.shared ?? {})) {
      result.push({
        stage,
        evidence: {
          logicalId,
          kind: 'shared',
          region: emptyRegion(resource.region) ? null : String(resource.region).toLowerCase(),
        },
      });
    }
  }
  return result;
};

/** Canonical hash of the source document (stable JSON serialization). */
export const hashDocument = (doc: unknown): string =>
  crypto.createHash('sha256').update(JSON.stringify(doc)).digest('hex');

/**
 * Dry-run: classify the legacy aggregate and produce the reviewed split plan.
 * No writes. Unknown/empty region evidence is reported — the caller must obtain
 * an explicit binding before apply.
 */
export const planRegionalMigration = (
  legacy: PersistedStateFile,
  paths: RegionalMigrationPaths,
  options: RegionalMigrationOptions,
): RegionalMigrationPlan => {
  // Ownership handover first: a source already managed by the Console belongs
  // to the SaaS backend — a regional split must never reopen it (that would
  // create an unmarked local copy and a second writable authority).
  if (legacy.managedBy === MANAGED_BY_SAAS) {
    throw new Error(lang.__('REGIONAL_MIGRATION_SOURCE_MANAGED_BY_SAAS'));
  }
  // A tombstone-marked aggregate has already been split; the regional
  // documents are authoritative.
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

  const evidence = collectRegionEvidence(legacy);
  const regionGroups = new Map<string, { resources: number; shared: number }>();
  const unknown: RegionalMigrationPlan['unknown'] = [];

  for (const { stage, evidence: item } of evidence) {
    if (options.stage && stage !== options.stage) {
      continue;
    }
    if (item.region === null) {
      unknown.push({ stage, logicalId: item.logicalId, kind: item.kind });
      continue;
    }
    const key = `${stage}::${item.region}`;
    const group = regionGroups.get(key) ?? { resources: 0, shared: 0 };
    if (item.kind === 'shared') {
      group.shared += 1;
    } else {
      group.resources += 1;
    }
    regionGroups.set(key, group);
  }

  const warnings: string[] = [];
  if (legacy.provider && legacy.provider !== options.provider) {
    warnings.push(
      lang.__('REGIONAL_MIGRATION_PROVIDER_MISMATCH', {
        source: legacy.provider,
        effective: options.provider,
      }),
    );
  }

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

/** Subset of one stage's state for one region (resources + shared classified by region). */
const buildStageStateForRegion = (
  legacy: PersistedStateFile,
  stage: string,
  region: string,
): { resources: Record<string, ResourceState>; shared: Record<string, ResourceState> } => {
  const stageState = legacy.stages?.[stage];
  const resources: Record<string, ResourceState> = {};
  const shared: Record<string, ResourceState> = {};
  for (const [logicalId, resource] of Object.entries(stageState?.resources ?? {})) {
    const resourceRegion = emptyRegion(resource.region)
      ? null
      : String(resource.region).toLowerCase();
    if (resourceRegion === region) {
      resources[logicalId] = resource;
    }
  }
  for (const [logicalId, resource] of Object.entries(stageState?.shared ?? {})) {
    const resourceRegion = emptyRegion(resource.region)
      ? null
      : String(resource.region).toLowerCase();
    if (resourceRegion === region) {
      // Shared resources stay owned by exactly one regional document — they are
      // never duplicated across regional documents (issue #280 §5).
      shared[logicalId] = resource;
    }
  }
  return { resources, shared };
};

/**
 * Build one V4 document for a (stage, region) scope from the legacy aggregate.
 * Independent lineage; serial starts at 1; provenance stamped.
 */
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

export type RegionalMigrationJournal = {
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
  const scopes = [...plan.documents];
  plan.unknown.forEach((item) => {
    if (bound && !scopes.some((scope) => scope.stage === item.stage && scope.region === bound)) {
      scopes.push({ stage: item.stage, region: bound, resources: 0, shared: 0 });
    }
  });
  return scopes.map(({ stage, region }) => {
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
    if (bound === region) {
      plan.unknown
        .filter((item) => item.stage === stage)
        .forEach((item) => {
          const store = item.kind === 'shared' ? 'shared' : 'resources';
          const resource = legacy.stages[stage]?.[store]?.[item.logicalId];
          if (resource) {
            state.stages[stage][store] = {
              ...state.stages[stage][store],
              [item.logicalId]: { ...resource, region },
            };
          }
        });
    }
    return { stage, region, state: stripRuntimeProjection(state) };
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
