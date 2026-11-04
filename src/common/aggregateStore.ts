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
import { normalizeScope, type DeploymentScope } from './stateScope';
import { enforceMigrationMarker, type MigrationMarkerAction } from './migrationMarker';
import type { StateSource, WriteReadiness } from './stateBackend/types';
import { REGIONAL_MIGRATION_SUFFIX } from './constants';

type StoreIO = {
  read: (key: string) => Promise<unknown | null>;
  write: (key: string, value: unknown) => Promise<void>;
};

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
  let source: StateSource = 'empty';
  let plannedHash: string | undefined;

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

  const isAggregate = (
    document: AggregateStateFile | PersistedStateFile,
  ): document is AggregateStateFile => document.version === AGGREGATE_STATE_VERSION;

  const loadState = async (captureBase = true): Promise<StateFile> => {
    const document = await readDocument();
    if (document && !isAggregate(document)) {
      source = 'legacy';
      enforceMigrationMarker(document, options.markerAction);
      if (document.provider !== scope.provider) {
        throw new StateScopeMismatchError(scope, {
          app: document.app,
          service: document.service,
          provider: document.provider,
          stage: scope.stage,
          region: document.scope?.region,
        });
      }
      return { ...document, resources: document.stages[scope.stage]?.resources ?? {} };
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

  return {
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
