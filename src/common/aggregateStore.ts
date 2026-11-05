import {
  StateScopeMismatchError,
  StateVersionError,
  type PersistedStateFile,
  type StateFile,
} from '../types';
import { lang } from '../lang';
import {
  AGGREGATE_STATE_VERSION,
  aggregatePartition,
  aggregateStateCorruptError,
  deploymentStateHash,
  mergeAggregateScope,
  patchAggregateScope,
  projectAggregateScope,
  readAggregateDocument,
  type AggregateStateFile,
} from './aggregateState';
import { canonicalizeRegion, normalizeScope, type DeploymentScope } from './stateScope';
import {
  enforceMigrationMarker,
  MANAGED_BY_SAAS,
  type MigrationMarkerAction,
} from './migrationMarker';
import type { StateSource, WriteReadiness } from './stateBackend/types';
import { REGIONAL_MIGRATION_SUFFIX } from './constants';
import {
  applyRegionalMigration,
  planRegionalMigration,
  readRegionalMigrationJournal,
  type KeyValueIO,
  type RegionalMigrationOptions,
} from './regionalMigration';
import { logger } from './logger';

type StoreIO = Pick<KeyValueIO, 'read' | 'write'>;

export const createAggregateStore = (
  io: StoreIO,
  selected: DeploymentScope,
  options: {
    key: string;
    markerAction: MigrationMarkerAction;
    backupWrites?: boolean;
  },
) => {
  const scope = normalizeScope(selected);
  const scopeKey = options.key;
  const markerAction = options.markerAction;
  let source: StateSource = 'empty';
  let plannedHash: string | undefined;
  let legacyRegionBinding: string | undefined;

  const validateDocument = (raw: unknown): AggregateStateFile | PersistedStateFile => {
    if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
      throw aggregateStateCorruptError(options.key);
    }
    const value = raw as Record<string, unknown>;
    if (value.app !== scope.app || value.service !== scope.service) {
      throw new StateScopeMismatchError(scope, {
        app: String(value.app ?? ''),
        service: String(value.service ?? ''),
        provider: typeof value.provider === 'string' ? value.provider : scope.provider,
        stage: scope.stage,
        region: scope.region,
      });
    }
    if (value.version === AGGREGATE_STATE_VERSION) {
      return readAggregateDocument(value, scope, options.key);
    }
    if (value.version !== '3.0') {
      throw new StateVersionError(String(value.version ?? ''), AGGREGATE_STATE_VERSION);
    }
    if (
      typeof value.provider !== 'string' ||
      typeof value.stages !== 'object' ||
      value.stages === null ||
      Array.isArray(value.stages)
    ) {
      throw aggregateStateCorruptError(options.key);
    }
    return value as PersistedStateFile;
  };

  const readStoredDocument = async (): Promise<AggregateStateFile | PersistedStateFile | null> => {
    let raw: unknown;
    try {
      raw = await io.read(options.key);
    } catch (error) {
      if (!(error instanceof SyntaxError)) throw error;
      const backup = await io.read(`${options.key}.backup`);
      if (backup === null) throw aggregateStateCorruptError(options.key, error);
      return validateDocument(backup);
    }
    if (raw === null) {
      const backup = await io.read(`${options.key}.backup`);
      if (backup !== null) return validateDocument(backup);
      return null;
    }
    return validateDocument(raw);
  };

  const readDocument = async (): Promise<AggregateStateFile | PersistedStateFile | null> => {
    const migration = await io.read(`${options.key}${REGIONAL_MIGRATION_SUFFIX}`);
    if (migration !== null) {
      if (typeof migration !== 'object' || !migration || !('phase' in migration))
        throw aggregateStateCorruptError(options.key);
      if (migration.phase !== 'complete') {
        const opId = 'opId' in migration ? String(migration.opId) : options.key;
        throw new Error(lang.__('REGIONAL_MIGRATION_PENDING', { opId }));
      }
    }
    const document = await readStoredDocument();
    if (migration && !document) throw aggregateStateCorruptError(scopeKey);
    return document;
  };

  const isAggregate = (
    document: AggregateStateFile | PersistedStateFile,
  ): document is AggregateStateFile => document.version === AGGREGATE_STATE_VERSION;

  const loadState = async (captureBase = true): Promise<StateFile> => {
    const document = await readDocument();
    if (document && !isAggregate(document)) {
      source = 'legacy';
      enforceMigrationMarker(document, options.markerAction);
      if (document.managedBy === MANAGED_BY_SAAS) {
        return { ...document, resources: document.stages[scope.stage]?.resources ?? {} };
      }
      const empty = projectAggregateScope(null, scope);
      const selected = document.stages[scope.stage];
      const selectRegion = (resources: typeof selected.resources | undefined) =>
        Object.fromEntries(
          Object.entries(resources ?? {}).filter(([, resource]) => {
            const region = resource.region?.trim() || legacyRegionBinding;
            if (!region) {
              throw new Error(lang.__('REGIONAL_MIGRATION_UNKNOWN_REGION_REQUIRED'));
            }
            return canonicalizeRegion(region) === scope.region;
          }),
        );
      const resources =
        document.provider === scope.provider ? selectRegion(selected?.resources) : {};
      const shared = document.provider === scope.provider ? selectRegion(selected?.shared) : {};
      const metadata = Object.fromEntries(
        ['orgId', 'appId', 'serviceId', 'managedBy']
          .filter((key) => document[key as keyof typeof document] !== undefined)
          .map((key) => [key, document[key as keyof typeof document]]),
      );
      return { ...empty, ...metadata, stages: { [scope.stage]: { resources, shared } }, resources };
    }
    source = aggregatePartition(document, scope) ? 'scoped' : 'empty';
    const state = projectAggregateScope(document, scope);
    enforceMigrationMarker(state, options.markerAction);
    if (captureBase && plannedHash === undefined) plannedHash = deploymentStateHash(state);
    return state;
  };

  const probeWriteReadiness = async (): Promise<WriteReadiness> => {
    const document = await readDocument();
    if (document && !isAggregate(document)) {
      source = 'legacy';
      enforceMigrationMarker(document, options.markerAction);
      return {
        ready: false,
        source,
        reason: lang.__('STATE_STORE_UPGRADE_REQUIRED', { location: options.key }),
      };
    }
    source = aggregatePartition(document, scope) ? 'scoped' : 'empty';
    enforceMigrationMarker(projectAggregateScope(document, scope), options.markerAction);
    return { ready: true, source };
  };

  const writableDocument = async (): Promise<AggregateStateFile | null> => {
    const document = await readDocument();
    if (document && !isAggregate(document)) {
      throw new Error(lang.__('STATE_STORE_UPGRADE_REQUIRED', { location: options.key }));
    }
    return document;
  };

  const writeDocument = async (
    previous: AggregateStateFile | null,
    next: AggregateStateFile,
  ): Promise<void> => {
    if (previous && options.backupWrites) await io.write(`${options.key}.backup`, previous);
    await io.write(options.key, next);
    source = 'scoped';
  };

  const upgradeLegacyState = async (
    options: { bindUnknownRegion?: string; dryRun?: boolean } = {},
  ): Promise<void> => {
    const binding =
      options.bindUnknownRegion === undefined
        ? undefined
        : canonicalizeRegion(options.bindUnknownRegion);
    legacyRegionBinding = binding;
    const paths = {
      legacyKey: scopeKey,
      backupKey: (opId: string) => `${scopeKey}.pre-upgrade-${opId}.json`,
      reportKey: (opId: string) => `${scopeKey}.upgrade-report-${opId}.json`,
    };
    const pending = await readRegionalMigrationJournal(io, paths);
    if (
      pending &&
      (!pending.plan ||
        !pending.options ||
        typeof pending.plan.opId !== 'string' ||
        !['applying', 'complete'].includes(pending.phase))
    ) {
      throw aggregateStateCorruptError(scopeKey);
    }
    const document = await readStoredDocument();
    if (pending?.phase === 'complete' && (!document || !isAggregate(document))) {
      throw new Error(lang.__('REGIONAL_MIGRATION_SOURCE_CHANGED'));
    }
    if (pending?.phase !== 'applying' && (!document || isAggregate(document))) return;
    const legacy =
      pending?.phase === 'applying'
        ? await io.read<PersistedStateFile>(paths.backupKey(pending.plan.opId))
        : document;
    if (!legacy)
      throw new Error(
        lang.__('REGIONAL_MIGRATION_BACKUP_MISSING', { opId: pending?.plan.opId ?? scopeKey }),
      );
    if (isAggregate(legacy)) throw aggregateStateCorruptError(scopeKey);
    validateDocument(legacy);
    if (legacy.managedBy === MANAGED_BY_SAAS) {
      enforceMigrationMarker(legacy, markerAction);
      return;
    }
    if (
      pending &&
      (pending.options.app !== scope.app ||
        pending.options.service !== scope.service ||
        (binding !== undefined && binding !== pending.options.bindUnknownRegion))
    ) {
      throw new Error(lang.__('REGIONAL_MIGRATION_PENDING', { opId: pending.plan.opId }));
    }
    const migrationOptions: RegionalMigrationOptions = pending?.options ?? {
      app: scope.app,
      service: scope.service,
      provider: legacy.provider,
      ...(binding ? { bindUnknownRegion: binding } : {}),
    };
    const plan = pending?.plan ?? planRegionalMigration(legacy, migrationOptions);
    if (plan.unknown.length && !migrationOptions.bindUnknownRegion) {
      plan.unknown.forEach((item) => logger.warn(lang.__('REGIONAL_MIGRATION_UNKNOWN_ITEM', item)));
      throw new Error(lang.__('REGIONAL_MIGRATION_UNKNOWN_REGION_REQUIRED'));
    }
    if (!options.dryRun) await applyRegionalMigration(io, legacy, paths, plan, migrationOptions);
  };

  return {
    upgradeLegacyState,
    loadState,
    probeWriteReadiness,
    readStateSource: (): StateSource => source,
    clearPlanBase: (): void => {
      plannedHash = undefined;
    },
    verifyPlanBase: async (): Promise<void> => {
      const readiness = await probeWriteReadiness();
      if (!readiness.ready) throw new Error(readiness.reason);
      if (
        plannedHash !== undefined &&
        deploymentStateHash(await loadState(false)) !== plannedHash
      ) {
        throw new Error(lang.__('STATE_PLAN_BASE_CHANGED'));
      }
    },
    saveState: async (state: StateFile): Promise<void> => {
      const document = await writableDocument();
      enforceMigrationMarker(projectAggregateScope(document, scope), options.markerAction);
      await writeDocument(document, mergeAggregateScope(document, scope, state));
    },
    patchPersisted: async (patch: Record<string, unknown | undefined>): Promise<void> => {
      const existing = await readDocument();
      if (
        existing &&
        !isAggregate(existing) &&
        markerAction === 'off' &&
        existing.managedBy === MANAGED_BY_SAAS &&
        Object.keys(patch).length === 1 &&
        Object.prototype.hasOwnProperty.call(patch, 'managedBy') &&
        patch.managedBy === undefined
      ) {
        const { managedBy: _owner, ...legacy } = existing;
        if (options.backupWrites) await io.write(`${scopeKey}.backup`, existing);
        await io.write(scopeKey, { ...legacy, serial: (legacy.serial ?? 0) + 1 });
        return;
      }
      const document = await writableDocument();
      const current: AggregateStateFile = document ?? {
        version: AGGREGATE_STATE_VERSION,
        app: scope.app,
        service: scope.service,
        stages: {},
      };
      await writeDocument(document, patchAggregateScope(current, scope, patch));
    },
  };
};
