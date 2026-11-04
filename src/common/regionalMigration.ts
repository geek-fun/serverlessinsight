import crypto from 'node:crypto';

import {
  AGGREGATE_STATE_VERSION,
  readAggregateDocument,
  mergeAggregateScope,
  type AggregateStateFile,
} from './aggregateState';
import {
  PersistedStateFile,
  ResourceState,
  StateFile,
  StateMigrationInfo,
  CURRENT_STATE_VERSION,
  LEGACY_STATE_VERSION,
} from '../types';
import { canonicalizeRegion, validateScopeKeyPart } from './stateScope';
import { MANAGED_BY_SAAS } from './migrationMarker';
import { logger } from './logger';
import { REGIONAL_MIGRATION_SUFFIX } from './constants';
import { lang } from '../lang';

export type KeyValueIO = {
  read: <T>(key: string) => Promise<T | null>;
  write: (key: string, data: unknown) => Promise<void>;
};

export type RegionalMigrationPaths = {
  legacyKey: string;
  reportKey: (opId: string) => string;
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
  aggregate?: AggregateStateFile;
  plan: RegionalMigrationPlan;
  options: RegionalMigrationOptions;
  targets: Array<{ stage: string; region: string; state: PersistedStateFile }>;
  phase: 'applying' | 'complete';
};

const journalKey = (paths: RegionalMigrationPaths): string =>
  `${paths.legacyKey}${REGIONAL_MIGRATION_SUFFIX}`;

export const readRegionalMigrationJournal = (
  io: Pick<KeyValueIO, 'read'>,
  paths: RegionalMigrationPaths,
): Promise<RegionalMigrationJournal | null> => io.read(journalKey(paths));

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

const aggregateMigrationTargets = (
  targets: RegionalMigrationJournal['targets'],
  options: RegionalMigrationOptions,
): AggregateStateFile =>
  targets.reduce<AggregateStateFile>(
    (document, { stage, region, state }) =>
      mergeAggregateScope(
        document,
        { app: options.app, service: options.service, provider: state.provider, stage, region },
        { ...state, resources: state.stages[stage].resources },
      ),
    { version: AGGREGATE_STATE_VERSION, app: options.app, service: options.service, stages: {} },
  );

const migrationReport = (journal: RegionalMigrationJournal): RegionalMigrationReport => ({
  ...journal.plan,
  documents: journal.targets.map(({ stage, region, state }) => ({
    stage,
    region,
    resources: Object.keys(state.stages[stage].resources).length,
    shared: Object.keys(state.stages[stage].shared ?? {}).length,
  })),
  migratedAt: new Date().toISOString(),
  barrierWritten: true,
});

/** The caller holds the original file/key lock throughout the in-place upgrade. */
export const applyRegionalMigration = async (
  io: Pick<KeyValueIO, 'read' | 'write'>,
  legacy: PersistedStateFile,
  paths: RegionalMigrationPaths,
  plan: RegionalMigrationPlan,
  options: RegionalMigrationOptions,
): Promise<RegionalMigrationReport> => {
  if (plan.unknown.length > 0 && !options.bindUnknownRegion) {
    throw new Error(lang.__('REGIONAL_MIGRATION_UNKNOWN_REGION_REQUIRED'));
  }
  if (hashDocument(legacy) !== plan.sourceHash) {
    throw new Error(lang.__('REGIONAL_MIGRATION_SOURCE_CHANGED'));
  }
  const previous = await readRegionalMigrationJournal(io, paths);
  if (
    previous &&
    (previous.plan.opId !== plan.opId ||
      !previous.aggregate ||
      !(['provider', 'app', 'service', 'stage', 'bindUnknownRegion'] as const).every(
        (key) => previous.options[key] === options[key],
      ))
  ) {
    throw new Error(lang.__('REGIONAL_MIGRATION_PENDING', { opId: previous.plan.opId }));
  }
  const targets = previous?.targets ?? buildMigrationTargets(legacy, plan, options);
  const completePlan = {
    ...planRegionalMigration(legacy, { ...options, stage: undefined }),
    opId: plan.opId,
  };
  const expectedTargets = buildMigrationTargets(legacy, completePlan, options);
  const uncovered = Object.entries(legacy.stages).filter(
    ([stage, value]) =>
      (Object.keys(value.resources ?? {}).length || Object.keys(value.shared ?? {}).length) &&
      !targets.some((target) => target.stage === stage),
  );
  const coverage = (items: RegionalMigrationJournal['targets']) =>
    items
      .map(({ stage, region, state }) => ({
        stage,
        region,
        provider: state.provider,
        resources: state.stages[stage].resources,
        shared: state.stages[stage].shared ?? {},
      }))
      .sort((left, right) =>
        `${left.stage}/${left.region}`.localeCompare(`${right.stage}/${right.region}`),
      );
  if (
    uncovered.length ||
    hashDocument(coverage(targets)) !== hashDocument(coverage(expectedTargets))
  ) {
    throw new Error(
      lang.__('REGIONAL_MIGRATION_INCOMPLETE_STAGE_COVERAGE', {
        stages: Object.keys(legacy.stages).join(', '),
      }),
    );
  }
  const journal: RegionalMigrationJournal = previous ?? {
    plan,
    options,
    targets,
    phase: 'applying',
    aggregate: aggregateMigrationTargets(targets, options),
  };
  if (journal.phase === 'complete') {
    const report = await io.read<RegionalMigrationReport>(paths.reportKey(plan.opId));
    if (report) {
      readAggregateDocument(await io.read(paths.legacyKey), options, paths.legacyKey);
      return report;
    }
  }
  const current = await io.read<unknown>(paths.legacyKey);
  const sourceMatches = current !== null && hashDocument(current) === plan.sourceHash;
  const aggregateMatches =
    current !== null && hashDocument(current) === hashDocument(journal.aggregate);
  if (!sourceMatches && !aggregateMatches) {
    throw new Error(lang.__('REGIONAL_MIGRATION_SOURCE_CHANGED'));
  }
  const backup = await io.read<PersistedStateFile>(paths.backupKey(plan.opId));
  if (backup && hashDocument(backup) !== plan.sourceHash) {
    throw new Error(lang.__('REGIONAL_MIGRATION_SOURCE_CHANGED'));
  }
  if (!backup) await io.write(paths.backupKey(plan.opId), legacy);
  if (!previous) await io.write(journalKey(paths), journal);
  try {
    if (sourceMatches) await io.write(paths.legacyKey, journal.aggregate);
    const report = migrationReport(journal);
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
};
