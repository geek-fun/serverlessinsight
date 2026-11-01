import fs from 'node:fs';
import { StateFile, LockOptions, StateCorruptError } from '../../types';
import {
  loadScopedState,
  saveScopedState,
  patchScopedPersistedState,
  patchPersistedState,
  readLegacyPersistedState,
  emptyScopedState,
  migrateState,
  getStatePath,
} from '../stateManager';
import { normalizeScope, buildScopedStatePath } from '../stateScope';
import { enforceMigrationMarker, MigrationMarkerAction } from '../migrationMarker';
import {
  withLock as fsWithLock,
  forceUnlock as fsForceUnlock,
  readLockFileForCommand,
  acquireLockInternal,
  releaseLockInternal,
} from '../lockManager';
import {
  StateBackend,
  LockMetadata,
  StateSource,
  WriteReadiness,
  BackendCapabilities,
} from './types';
import type { DeploymentScope } from '../stateScope';
import { lang } from '../../lang';

export type LocalBackendOptions = {
  baseDir?: string;
  markerAction?: MigrationMarkerAction;
};

/**
 * Scope-bound LOCAL backend (issue #280).
 *
 * Storage layout: `.serverlessinsight/states/<app>/<service>/<stage>/<region>/state.json`
 * — one V4 document per Stage/Region deployment scope, with independent
 * lineage/serial/lock/backup per document. The legacy V3 aggregate
 * (`.serverlessinsight/state-<app>-<service>.json`) remains the discovery entry:
 * it is read for read-only compatibility until `si migrate --to-regional` splits
 * it, and it is never written by this backend.
 */
export const createLocalStateBackend = (
  scope: DeploymentScope,
  options: LocalBackendOptions = {},
): StateBackend => {
  const normalized = normalizeScope(scope);
  const baseDir = options.baseDir ?? process.cwd();
  const markerAction: MigrationMarkerAction = options.markerAction ?? 'off';
  const scopedPath = buildScopedStatePath(
    normalized.app,
    normalized.service,
    normalized.stage,
    normalized.region,
    baseDir,
  );
  const legacyPath = getStatePath(normalized.app, normalized.service, baseDir);

  const capabilities: BackendCapabilities = { conditionalCreate: true };

  const legacyStageHasResources = (
    legacy: ReturnType<typeof readLegacyPersistedState>,
  ): boolean => {
    const stageResources = legacy?.stages?.[normalized.stage]?.resources;
    return !!stageResources && Object.keys(stageResources).length > 0;
  };

  const detectSource = (): StateSource => {
    if (fs.existsSync(scopedPath)) {
      return 'scoped';
    }
    const legacy = readLegacyPersistedState(normalized.app, normalized.service, baseDir);
    return legacyStageHasResources(legacy) ? 'legacy' : 'empty';
  };

  return {
    scope: normalized,
    capabilities,

    loadState: async (): Promise<StateFile> => {
      if (fs.existsSync(scopedPath)) {
        const state = loadScopedState(normalized, baseDir);
        enforceMigrationMarker(state, markerAction);
        return state;
      }
      const legacy = readLegacyPersistedState(normalized.app, normalized.service, baseDir);
      if (legacy) {
        let legacyState: StateFile;
        try {
          const migrated = migrateState(legacy as unknown as StateFile);
          const stageResources = migrated.stages?.[normalized.stage]?.resources ?? {};
          legacyState = { ...migrated, resources: stageResources };
        } catch (error) {
          // A legacy aggregate that cannot be parsed/migrated is malformed data —
          // never silently treated as empty state.
          throw new StateCorruptError(legacyPath, error);
        }
        enforceMigrationMarker(legacyState, markerAction);
        return legacyState;
      }
      return emptyScopedState(normalized);
    },

    saveState: async (state: StateFile): Promise<void> => {
      // saveScopedState validates the state identity against the bound scope.
      saveScopedState(state, normalized, baseDir);
    },

    patchPersisted: async (patch: Record<string, unknown | undefined>): Promise<void> => {
      // Patch whichever persisted document backs the current state source, so
      // `si migrate` marker/backfill writes land on the document the state came
      // from (legacy aggregate before the split, scoped doc afterwards).
      if (detectSource() === 'scoped') {
        patchScopedPersistedState(normalized, patch, baseDir);
      } else {
        patchPersistedState(normalized.app, normalized.service, patch, baseDir);
      }
    },

    readStateSource: (): StateSource => detectSource(),

    probeWriteReadiness: async (): Promise<WriteReadiness> => {
      const source = detectSource();
      if (source === 'legacy') {
        return {
          ready: false,
          source,
          reason: lang.__('STATE_WRITE_BLOCKED_LEGACY', { statePath: legacyPath }),
        };
      }
      return { ready: true, source };
    },

    acquireLock: async (operation: string, lockOptions?: LockOptions): Promise<string> => {
      const lockMeta = await acquireLockInternal(scopedPath, operation, lockOptions);
      return lockMeta.id;
    },

    releaseLock: async (lockId: string): Promise<void> => {
      releaseLockInternal(scopedPath, lockId);
    },

    forceUnlock: async (lockId: string): Promise<boolean> => {
      return fsForceUnlock(scopedPath, lockId);
    },

    readLock: async (): Promise<LockMetadata | null> => {
      return readLockFileForCommand(scopedPath);
    },

    withLock: async <T>(
      operation: string,
      fn: () => Promise<T>,
      lockOptions?: LockOptions,
      onLockAcquired?: (lockId: string) => void,
    ): Promise<T> => {
      if (onLockAcquired) {
        return fsWithLock(scopedPath, operation, fn, lockOptions, onLockAcquired);
      }
      return fsWithLock(scopedPath, operation, fn, lockOptions);
    },
  };
};
