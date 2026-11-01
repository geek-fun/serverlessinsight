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
  /** Atomic exclusive create when the storage supports it (verified fallback otherwise). */
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
 * with the split. Uses verified conditional create when the storage provides
 * it; falls back to write-then-verify otherwise (capability is declared by the
 * backend, never assumed).
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
      const created = io.putIfAbsent
        ? await io.putIfAbsent(lockKey, metadata)
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

/**
 * Apply the reviewed split: protect → back up → write scoped documents →
 * barrier the legacy entry → write the report. Every artifact is named by the
 * migration opId so a partial run is auditable and recoverable.
 */
export const applyRegionalMigration = async (
  io: KeyValueIO,
  legacy: PersistedStateFile,
  paths: RegionalMigrationPaths,
  plan: RegionalMigrationPlan,
  options: RegionalMigrationOptions & { app: string; service: string; provider: string },
): Promise<RegionalMigrationReport> => {
  if (plan.unknown.length > 0 && !options.bindUnknownRegion) {
    throw new Error(lang.__('REGIONAL_MIGRATION_UNKNOWN_REGION_REQUIRED'));
  }
  const bindRegion = options.bindUnknownRegion
    ? canonicalizeRegion(options.bindUnknownRegion)
    : undefined;

  // ⓪ Stage-coverage guard: the barrier is document-global (the tombstone
  // hides the whole legacy aggregate from this CLI), so a split that leaves
  // any stage with resources uncovered would strand it. Refuse instead.
  const stagesWithResources = Object.entries(legacy.stages ?? {})
    .filter(
      ([, stageState]) =>
        Object.keys(stageState?.resources ?? {}).length > 0 ||
        Object.keys(stageState?.shared ?? {}).length > 0,
    )
    .map(([stage]) => stage);
  const coveredStages = new Set<string>([
    ...plan.documents.map((d) => d.stage),
    ...(bindRegion ? plan.unknown.map((u) => u.stage) : []),
  ]);
  const uncoveredStages = stagesWithResources.filter((stage) => !coveredStages.has(stage));
  if (uncoveredStages.length > 0) {
    throw new Error(
      lang.__('REGIONAL_MIGRATION_INCOMPLETE_STAGE_COVERAGE', {
        stages: uncoveredStages.join(', '),
      }),
    );
  }

  // ⓪b Service provider binding: refuse a conflicting binding before anything
  // is written, then record the source provider for future scopes (issue #280
  // §1 — one Service has one provider across all regions).
  const binding = await readProviderBinding(io, paths);
  const sourceProvider = legacy.provider || options.provider;
  if (binding && binding.provider !== sourceProvider) {
    throw new Error(
      lang.__('STATE_PROVIDER_BINDING_MISMATCH', {
        stored: binding.provider,
        requested: sourceProvider,
      }),
    );
  }

  // ① Protect: exact source backup first — nothing is written before the
  // original document is recoverable byte-for-byte (canonical serialization).
  const backup = await io.read<PersistedStateFile>(paths.legacyKey);
  if (!backup) {
    throw new Error(lang.__('REGIONAL_MIGRATION_SOURCE_MISSING'));
  }
  if (hashDocument(backup) !== plan.sourceHash) {
    throw new Error(lang.__('REGIONAL_MIGRATION_SOURCE_CHANGED'));
  }
  await io.write(paths.backupKey(plan.opId), backup);

  // ② Verify ALL targets BEFORE writing anything (review finding: a refusal
  // must never leave partially-mutated targets). A target that already holds a
  // document from a DIFFERENT migration (or independent regional writes) is
  // refused — the split never overwrites authoritative state. A target from
  // THIS opId is a resume of the same operation and is rewritten in place.
  const docTargets = [...plan.documents];
  if (bindRegion) {
    for (const item of plan.unknown) {
      if (!docTargets.some((d) => d.stage === item.stage && d.region === bindRegion)) {
        docTargets.push({ stage: item.stage, region: bindRegion, resources: 0, shared: 0 });
      }
    }
  }
  for (const target of docTargets) {
    const existing = await io.read<PersistedStateFile>(
      paths.scopedPrefixBuilder(target.stage, target.region),
    );
    if (existing && existing.migration?.opId !== plan.opId) {
      throw new Error(
        lang.__('REGIONAL_MIGRATION_TARGET_EXISTS', {
          stage: target.stage,
          region: target.region,
          opId: existing.migration?.opId ?? 'independent',
        }),
      );
    }
  }

  // ③ Write the scoped documents, each under its own scope lock so a
  // concurrent deploy on that Stage/Region cannot interleave with the split.
  // Unknown-region resources land ONLY in the explicitly bound region — never
  // duplicated across sibling regions of the same stage.
  const written: Array<{ stage: string; region: string; doc: StateFile }> = [];
  try {
    for (const doc of docTargets) {
      const targetKey = paths.scopedPrefixBuilder(doc.stage, doc.region);
      const existing = await io.read<PersistedStateFile>(targetKey);
      await withIoLock(
        io,
        `${targetKey}${LOCK_KEY_SUFFIX}`,
        targetKey,
        'migrate-regional-target',
        async () => {
          const scoped = buildScopedDocument(
            legacy,
            { sourceVersion: plan.sourceVersion, sourceHash: plan.sourceHash, opId: plan.opId },
            { stage: doc.stage, region: doc.region },
            { provider: options.provider, app: options.app, service: options.service },
          );
          if (bindRegion && doc.region === bindRegion) {
            const stageState = legacy.stages?.[doc.stage];
            for (const item of plan.unknown.filter((u) => u.stage === doc.stage)) {
              const source = item.kind === 'shared' ? stageState?.shared : stageState?.resources;
              const resource = source?.[item.logicalId];
              if (resource) {
                const withRegion: ResourceState = { ...resource, region: bindRegion };
                if (item.kind === 'shared') {
                  scoped.stages[doc.stage].shared = {
                    ...scoped.stages[doc.stage].shared,
                    [item.logicalId]: withRegion,
                  };
                } else {
                  scoped.stages[doc.stage].resources[item.logicalId] = withRegion;
                  scoped.resources[item.logicalId] = withRegion;
                }
              }
            }
          }
          // Resume of this same operation: keep the existing lineage/serial
          // instead of resetting them.
          if (existing && existing.migration?.opId === plan.opId) {
            scoped.lineage = existing.lineage;
            scoped.serial = existing.serial;
          }
          await io.write(targetKey, stripRuntimeProjection(scoped));
          written.push({ stage: doc.stage, region: doc.region, doc: scoped });
        },
      );
    }

    // ④ Record the service provider binding for future scopes.
    if (!binding) {
      await io.write(paths.serviceBindingKey, {
        provider: sourceProvider,
        recordedAt: new Date().toISOString(),
      } satisfies ProviderBinding);
    }

    // ⑤ Barrier as a V4 TOMBSTONE: the legacy entry keeps its content (for
    // forensics) but is versioned 4.0 — old CLIs refuse it with a version
    // error BEFORE any mutation, and this CLI treats it as an absent source
    // (the scoped documents are authoritative; new regions start fresh).
    const tombstone: Record<string, unknown> = {
      ...legacy,
      version: CURRENT_STATE_VERSION,
      managedBy: MANAGED_BY_REGIONAL,
      migration: {
        opId: plan.opId,
        sourceVersion: plan.sourceVersion,
        sourceHash: plan.sourceHash,
        migratedAt: new Date().toISOString(),
      } satisfies StateMigrationInfo,
    };
    await io.write(paths.legacyKey, tombstone);

    // ⑥ The report carries the ACTUAL written set (including binding-generated
    // documents) so rollback validates and removes everything it created.
    const report: RegionalMigrationReport = {
      ...plan,
      documents: docTargets,
      migratedAt: new Date().toISOString(),
      barrierWritten: true,
    };
    await io.write(paths.reportKey(plan.opId), report);
    logger.info(lang.__('REGIONAL_MIGRATION_APPLIED', { opId: plan.opId }));
    return report;
  } catch (error) {
    // Partial multi-object update: scoped documents already written stay (they
    // are individually valid); the legacy entry is untouched, so no state was
    // lost and the run can be repeated safely after fixing the cause.
    logger.error(
      lang.__('REGIONAL_MIGRATION_PARTIAL_FAILURE', {
        opId: plan.opId,
        error: error instanceof Error ? error.message : String(error),
      }),
    );
    throw error;
  }
};

/** Runtime `resources` projection is never persisted. */
const stripRuntimeProjection = (state: StateFile): PersistedStateFile => {
  const { resources: _projection, ...persisted } = state;
  return persisted;
};

/**
 * Backup-based reversal — allowed ONLY while no independent regional write has
 * happened on any split document (every scoped doc must still be the migration's
 * serial-1 creation). After independent regional writes exist, states are never
 * collapsed back into the old aggregate automatically.
 */
export const rollbackRegionalMigration = async (
  io: KeyValueIO,
  paths: RegionalMigrationPaths,
  opId: string,
): Promise<void> => {
  const report = await io.read<RegionalMigrationReport>(paths.reportKey(opId));
  if (!report) {
    throw new Error(lang.__('REGIONAL_MIGRATION_REPORT_MISSING', { opId }));
  }
  const backup = await io.read<PersistedStateFile>(paths.backupKey(opId));
  if (!backup) {
    throw new Error(lang.__('REGIONAL_MIGRATION_BACKUP_MISSING', { opId }));
  }

  // Phase 1 — verify EVERY scoped document is still the migration's serial-1
  // creation BEFORE mutating anything (review finding: a refusal must never
  // leave already-deleted documents behind).
  for (const doc of report.documents) {
    const current = await io.read<PersistedStateFile>(
      paths.scopedPrefixBuilder(doc.stage, doc.region),
    );
    if (!current) {
      continue;
    }
    const stillPristine = current.migration?.opId === opId && (current.serial ?? 1) === 1;
    if (!stillPristine) {
      throw new Error(
        lang.__('REGIONAL_MIGRATION_ROLLBACK_BLOCKED', {
          stage: doc.stage,
          region: doc.region,
        }),
      );
    }
  }

  // Phase 2 — verified reversible: remove the scoped documents, restore the
  // exact original document (without the tombstone), and clean the artifacts.
  for (const doc of report.documents) {
    await io.delete(paths.scopedPrefixBuilder(doc.stage, doc.region));
  }
  await io.write(paths.legacyKey, backup);
  await io.delete(paths.reportKey(opId));
  await io.delete(paths.backupKey(opId));
  logger.info(lang.__('REGIONAL_MIGRATION_ROLLED_BACK', { opId }));
};
