import crypto from 'node:crypto';
import {
  PersistedStateFile,
  ResourceState,
  StateFile,
  StateMigrationInfo,
  CURRENT_STATE_VERSION,
  LEGACY_STATE_VERSION,
} from '../types';
import { canonicalizeRegion, validateScopeKeyPart } from './stateScope';
import { MANAGED_BY_REGIONAL } from './migrationMarker';
import { logger } from './logger';
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
};

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
  if (legacy.version && legacy.version !== LEGACY_STATE_VERSION) {
    throw new Error(
      lang.__('REGIONAL_MIGRATION_UNSUPPORTED_SOURCE', {
        version: legacy.version,
        expected: LEGACY_STATE_VERSION,
      }),
    );
  }
  if (legacy.managedBy === MANAGED_BY_REGIONAL) {
    throw new Error(lang.__('REGIONAL_MIGRATION_ALREADY_SPLIT'));
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

  // ② Write the scoped documents. Stages whose resources are ALL
  // unknown-region still get a document when an explicit binding is given.
  const docTargets = [...plan.documents];
  if (bindRegion) {
    for (const item of plan.unknown) {
      if (!docTargets.some((d) => d.stage === item.stage && d.region === bindRegion)) {
        docTargets.push({ stage: item.stage, region: bindRegion, resources: 0, shared: 0 });
      }
    }
  }
  const written: Array<{ stage: string; region: string; doc: StateFile }> = [];
  try {
    for (const doc of docTargets) {
      const scoped = buildScopedDocument(
        legacy,
        { sourceVersion: plan.sourceVersion, sourceHash: plan.sourceHash, opId: plan.opId },
        { stage: doc.stage, region: doc.region },
        { provider: options.provider, app: options.app, service: options.service },
      );
      // Unknown-evidence resources bound explicitly land in the chosen region.
      if (bindRegion) {
        const stageEvidence = plan.unknown.filter((u) => u.stage === doc.stage);
        const stageState = legacy.stages?.[doc.stage];
        for (const item of stageEvidence) {
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
      const targetKey = paths.scopedPrefixBuilder(doc.stage, doc.region);
      await io.write(targetKey, stripRuntimeProjection(scoped));
      written.push({ stage: doc.stage, region: doc.region, doc: scoped });
    }

    // ③ Barrier: the legacy entry KEEPS its content (deleting it would let an
    // old CLI treat the deployment as fresh) but is marked as split so this and
    // later CLIs never mutate or re-split it.
    const barriered: PersistedStateFile = { ...legacy, managedBy: MANAGED_BY_REGIONAL };
    await io.write(paths.legacyKey, barriered);

    const report: RegionalMigrationReport = {
      ...plan,
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

  // Verify no scoped document has diverged from its migration-time creation.
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
    await io.delete(paths.scopedPrefixBuilder(doc.stage, doc.region));
  }

  // Restore the exact original document (without the barrier marker).
  await io.write(paths.legacyKey, backup);
  await io.delete(paths.reportKey(opId));
  await io.delete(paths.backupKey(opId));
  logger.info(lang.__('REGIONAL_MIGRATION_ROLLED_BACK', { opId }));
};
