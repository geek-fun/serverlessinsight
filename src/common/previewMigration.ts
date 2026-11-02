import crypto from 'node:crypto';

import { lang } from '../lang';
import { logger } from './logger';
import { CURRENT_STATE_VERSION, type PersistedStateFile } from '../types';
import {
  AGGREGATE_STATE_VERSION,
  aggregatePartition,
  mergeAggregateScope,
  readAggregateDocument,
  aggregateStateCorruptError,
  type AggregateStateFile,
} from './aggregateState';
import { AGGREGATE_MIGRATION_SUFFIX } from './constants';
import {
  hashDocument,
  readRegionalMigrationJournal,
  withIoLock,
  type KeyValueIO,
  type RegionalMigrationPaths,
  type RegionalMigrationOptions,
} from './regionalMigration';
import { normalizeScope, type DeploymentScope } from './stateScope';
import { validateScopedDocument } from './stateManager';
import { LOCK_KEY_SUFFIX } from './stateBackend/lockUtils';

type PreviewSource = { key: string; state: PersistedStateFile; scope: DeploymentScope };
type ConsolidationJournal = {
  opId: string;
  primary: unknown | null;
  sources: PreviewSource[];
  aggregate: AggregateStateFile;
  phase: 'applying' | 'complete' | 'rolling-back';
};

const conflict = (scope: string): never => {
  throw new Error(lang.__('STATE_PREVIEW_CONFLICT', { scope }));
};

const readJournal = (io: KeyValueIO, paths: RegionalMigrationPaths) =>
  io.read<ConsolidationJournal>(`${paths.legacyKey}${AGGREGATE_MIGRATION_SUFFIX}`);

const sourceFiles = async (
  io: KeyValueIO,
  paths: RegionalMigrationPaths,
  options: RegionalMigrationOptions,
): Promise<string[]> => {
  if (!io.list || !paths.previewPrefix) {
    throw new Error(lang.__('STATE_PREVIEW_INVENTORY_REQUIRED'));
  }
  const prefix = paths.previewPrefix.replace(/\\/g, '/').replace(/\/$/, '') + '/';
  const encodedService = encodeURIComponent(options.service).replace(/_/g, '%5F');
  const entries = (await io.list(paths.previewPrefix)).filter((key) => {
    const relative = key.replace(/\\/g, '/').slice(prefix.length);
    return relative.startsWith(`${encodedService}_`) || relative.startsWith(`${options.service}/`);
  });
  if (entries.some((key) => key.endsWith('.tmp'))) return conflict(options.service);
  const states = entries.filter((key) => /(?:_|\/)state\.json$/.test(key));
  const orphan = entries.find(
    (key) =>
      /state\.json\.(?:backup|si-lock)$/.test(key) &&
      !states.includes(key.replace(/\.(?:backup|si-lock)$/, '')),
  );
  if (orphan) return conflict(orphan);
  return states.sort();
};

const readSource = async (
  io: KeyValueIO,
  key: string,
  options: RegionalMigrationOptions,
): Promise<PreviewSource> => {
  const state = await io.read<PersistedStateFile>(key);
  if (!state?.scope || state.version !== CURRENT_STATE_VERSION) return conflict(key);
  const scope = normalizeScope({
    app: options.app,
    service: options.service,
    provider: state.provider,
    stage: state.scope.stage,
    region: state.scope.region,
  });
  validateScopedDocument(state, scope);
  const stage = state.stages?.[scope.stage];
  if (!stage || Object.keys(state.stages).length !== 1 || !stage.resources) return conflict(key);
  const entries = [...Object.values(stage.resources), ...Object.values(stage.shared ?? {})];
  if (entries.some((entry) => entry.region?.toLowerCase() !== scope.region)) return conflict(key);
  return { key, state, scope };
};

const combineSources = (
  sources: PreviewSource[],
  options: RegionalMigrationOptions,
): AggregateStateFile =>
  sources.reduce<AggregateStateFile>(
    (aggregate, source) => {
      if (aggregatePartition(aggregate, source.scope)) return conflict(source.key);
      const next = mergeAggregateScope(
        aggregate,
        source.scope,
        {
          ...source.state,
          resources: source.state.stages[source.scope.stage].resources,
        },
        { preserveRevision: true },
      );
      return next;
    },
    { version: AGGREGATE_STATE_VERSION, app: options.app, service: options.service, stages: {} },
  );

const barrier = (journal: ConsolidationJournal, source: PreviewSource) => ({
  version: AGGREGATE_STATE_VERSION,
  app: source.scope.app,
  service: source.scope.service,
  managedBy: 'aggregate',
  migration: { opId: journal.opId, targetVersion: AGGREGATE_STATE_VERSION },
});

const withSourceLocks = <T>(
  io: KeyValueIO,
  paths: RegionalMigrationPaths,
  sources: PreviewSource[],
  fn: () => Promise<T>,
): Promise<T> =>
  sources
    .map(({ key }) => key)
    .filter((key) => key !== paths.legacyKey)
    .sort()
    .reduceRight<() => Promise<T>>(
      (next, key) => () => withIoLock(io, `${key}${LOCK_KEY_SUFFIX}`, key, 'migrate-preview', next),
      fn,
    )();

const verifySources = async (
  io: KeyValueIO,
  paths: RegionalMigrationPaths,
  journal: ConsolidationJournal,
): Promise<void> => {
  await Promise.all(
    journal.sources.map(async (source) => {
      const current = await io.read(source.key);
      if (
        source.key === paths.legacyKey &&
        hashDocument(current) === hashDocument(journal.aggregate)
      )
        return;
      if (
        hashDocument(current) !== hashDocument(source.state) &&
        hashDocument(current) !== hashDocument(barrier(journal, source))
      )
        return conflict(source.key);
    }),
  );
};

export const consolidatePreviewState = async (
  io: KeyValueIO,
  paths: RegionalMigrationPaths,
  options: RegionalMigrationOptions,
  controls: { dryRun?: boolean; confirm: () => Promise<boolean> },
): Promise<boolean> => {
  const pending = await readJournal(io, paths);
  if (pending) readAggregateDocument(pending.aggregate, options, paths.legacyKey);
  if (pending?.phase === 'complete') {
    readAggregateDocument(await io.read(paths.legacyKey), options, paths.legacyKey);
    return true;
  }
  if (pending?.phase === 'rolling-back') {
    throw new Error(lang.__('STATE_PREVIEW_MIGRATION_PENDING', { opId: pending.opId }));
  }
  const primary = pending
    ? pending.primary
    : await io.read<unknown>(paths.legacyKey).catch((error: unknown) => {
        if (error instanceof SyntaxError) throw aggregateStateCorruptError(paths.legacyKey, error);
        throw error;
      });
  const value = primary as PersistedStateFile | null;
  if (!pending && value?.version === AGGREGATE_STATE_VERSION) {
    readAggregateDocument(value, options, paths.legacyKey);
    return true;
  }
  const keys = pending
    ? pending.sources.map(({ key }) => key)
    : await sourceFiles(io, paths, options);
  if (!pending && !keys.length && value?.version !== CURRENT_STATE_VERSION) return false;
  if (!pending && value && value.managedBy !== 'regional' && !value.scope)
    return conflict(paths.legacyKey);
  const sources =
    pending?.sources ??
    (await Promise.all(
      [...keys, ...(value?.scope ? [paths.legacyKey] : [])].map((key) =>
        readSource(io, key, options),
      ),
    ));
  if (!pending && value?.managedBy === 'regional') {
    const split = await readRegionalMigrationJournal(io, paths);
    if (
      !split ||
      split.phase !== 'complete' ||
      !split.targets.length ||
      split.targets.some(
        ({ stage, region, state }) =>
          !sources.some(
            (source) =>
              source.scope.stage === stage &&
              source.scope.region === region &&
              source.scope.provider === state.provider,
          ),
      )
    )
      return conflict(paths.legacyKey);
  }
  if (!sources.length) return conflict(paths.legacyKey);
  const journal: ConsolidationJournal = pending ?? {
    opId: crypto.randomUUID(),
    primary,
    sources,
    aggregate: combineSources(sources, options),
    phase: 'applying',
  };
  readAggregateDocument(journal.aggregate, options, paths.legacyKey);
  logger.info(
    lang.__('STATE_PREVIEW_MIGRATION_PLAN', {
      opId: journal.opId,
      count: String(journal.sources.length),
    }),
  );
  journal.sources.forEach(({ key, scope, state }) =>
    logger.info(
      lang.__('STATE_PREVIEW_MIGRATION_SOURCE', {
        key,
        provider: scope.provider,
        stage: scope.stage,
        region: scope.region,
        resources: String(Object.keys(state.stages[scope.stage].resources).length),
        shared: String(Object.keys(state.stages[scope.stage].shared ?? {}).length),
      }),
    ),
  );
  if (controls.dryRun) {
    logger.info(lang.__('REGIONAL_MIGRATION_DRY_RUN_NOTICE'));
    return true;
  }
  if (!(await controls.confirm())) {
    logger.info(lang.__('MIGRATE_CANCELLED'));
    return true;
  }
  return withSourceLocks(io, paths, journal.sources, async () => {
    await verifySources(io, paths, journal);
    const current = await io.read<unknown>(paths.legacyKey);
    if (
      hashDocument(current) !== hashDocument(journal.primary) &&
      hashDocument(current) !== hashDocument(journal.aggregate)
    )
      return conflict(paths.legacyKey);
    if (!pending) {
      const listed = await sourceFiles(io, paths, options);
      if (hashDocument(listed) !== hashDocument(keys)) return conflict(paths.legacyKey);
      await io.write(`${paths.legacyKey}${AGGREGATE_MIGRATION_SUFFIX}`, journal);
    }
    const backupKey = paths.backupKey(journal.opId);
    const backup = { primary: journal.primary, sources: journal.sources };
    const existingBackup = await io.read<unknown>(backupKey);
    if (existingBackup !== null && hashDocument(existingBackup) !== hashDocument(backup))
      return conflict(backupKey);
    if (existingBackup === null) await io.write(backupKey, backup);
    await io.write(paths.legacyKey, journal.aggregate);
    await journal.sources
      .filter(({ key }) => key !== paths.legacyKey)
      .reduce(async (previous, source) => {
        await previous;
        await io.write(source.key, barrier(journal, source));
      }, Promise.resolve());
    await io.write(`${paths.legacyKey}${AGGREGATE_MIGRATION_SUFFIX}`, {
      ...journal,
      phase: 'complete',
    });
    logger.info(lang.__('REGIONAL_MIGRATION_APPLIED', { opId: journal.opId }));
    return true;
  });
};

export const rollbackPreviewConsolidation = async (
  io: KeyValueIO,
  paths: RegionalMigrationPaths,
  opId: string,
): Promise<boolean> => {
  const journal = await readJournal(io, paths);
  if (!journal || journal.opId !== opId) return false;
  const backup = await io.read<unknown>(paths.backupKey(opId));
  if (
    !backup ||
    hashDocument(backup) !== hashDocument({ primary: journal.primary, sources: journal.sources })
  ) {
    throw new Error(lang.__('REGIONAL_MIGRATION_BACKUP_MISSING', { opId }));
  }
  return withSourceLocks(io, paths, journal.sources, async () => {
    await verifySources(io, paths, journal);
    const current = await io.read<unknown>(paths.legacyKey);
    if (
      hashDocument(current) !== hashDocument(journal.aggregate) &&
      hashDocument(current) !== hashDocument(journal.primary)
    ) {
      throw new Error(lang.__('REGIONAL_MIGRATION_ROLLBACK_BLOCKED'));
    }
    await io.write(`${paths.legacyKey}${AGGREGATE_MIGRATION_SUFFIX}`, {
      ...journal,
      phase: 'rolling-back',
    });
    await journal.sources
      .filter(({ key }) => key !== paths.legacyKey)
      .reduce(async (previous, source) => {
        await previous;
        await io.write(source.key, source.state);
      }, Promise.resolve());
    if (journal.primary === null) await io.delete(paths.legacyKey);
    else await io.write(paths.legacyKey, journal.primary);
    await io.delete(`${paths.legacyKey}${AGGREGATE_MIGRATION_SUFFIX}`);
    logger.info(lang.__('REGIONAL_MIGRATION_ROLLED_BACK', { opId }));
    return true;
  });
};
