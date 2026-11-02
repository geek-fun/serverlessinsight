import fs from 'node:fs';

import { assertLocalStateLayout } from '../stateLayout';
import { StateFile, LockOptions, StateCorruptError, StateScopeMismatchError } from '../../types';
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
import { normalizeScope, buildScopedStatePath, buildServiceBindingPath } from '../stateScope';
import { enforceMigrationMarker, MigrationMarkerAction } from '../migrationMarker';
import type { ProviderBinding } from '../regionalMigration';
import { claimProviderBinding } from '../providerBinding';
import { createLocalStateIO } from '../stateStorageIO';
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
  const bindingPath = buildServiceBindingPath(normalized.app, normalized.service, baseDir);

  const capabilities: BackendCapabilities = { conditionalCreate: true };

  const readProviderBinding = (): ProviderBinding | null => {
    if (!fs.existsSync(bindingPath)) {
      return null;
    }
    try {
      return JSON.parse(fs.readFileSync(bindingPath, 'utf-8')) as ProviderBinding;
    } catch (error) {
      throw new StateCorruptError(bindingPath, error);
    }
  };

  const enforceProviderBinding = (): void => {
    const binding = readProviderBinding();
    if (binding && binding.provider !== normalized.provider) {
      throw new Error(
        lang.__('STATE_PROVIDER_BINDING_MISMATCH', {
          stored: binding.provider,
          requested: normalized.provider,
        }),
      );
    }
  };

  const legacyStageHasResources = (
    legacy: ReturnType<typeof readLegacyPersistedState>,
  ): boolean => {
    const stageResources = legacy?.stages?.[normalized.stage]?.resources;
    return !!stageResources && Object.keys(stageResources).length > 0;
  };

  const detectSource = (): StateSource => {
    assertLocalStateLayout(scopedPath);
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
      assertLocalStateLayout(scopedPath);
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
          throw new StateCorruptError(legacyPath, error);
        }
        enforceMigrationMarker(legacyState, markerAction);
        return legacyState;
      }
      return emptyScopedState(normalized);
    },

    saveState: async (state: StateFile): Promise<void> => {
      if (
        state.app !== normalized.app ||
        state.service !== normalized.service ||
        state.provider !== normalized.provider
      ) {
        throw new StateScopeMismatchError(normalized, {
          provider: state.provider,
          app: state.app,
          service: state.service,
          stage: state.scope?.stage,
          region: state.scope?.region,
        });
      }
      assertLocalStateLayout(scopedPath);
      await claimProviderBinding(createLocalStateIO(), bindingPath, normalized.provider);
      saveScopedState(state, normalized, baseDir);
    },

    patchPersisted: async (patch: Record<string, unknown | undefined>): Promise<void> => {
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

      try {
        enforceProviderBinding();
        await claimProviderBinding(createLocalStateIO(), bindingPath, normalized.provider);
      } catch (error) {
        return {
          ready: false,
          source,
          reason: error instanceof Error ? error.message : String(error),
        };
      }
      return { ready: true, source };
    },

    acquireLock: async (operation: string, lockOptions?: LockOptions): Promise<string> => {
      assertLocalStateLayout(scopedPath);
      await claimProviderBinding(createLocalStateIO(), bindingPath, normalized.provider);
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
      assertLocalStateLayout(scopedPath);
      if (!operation.startsWith('migrate')) {
        await claimProviderBinding(createLocalStateIO(), bindingPath, normalized.provider);
      }
      if (onLockAcquired) {
        return fsWithLock(scopedPath, operation, fn, lockOptions, onLockAcquired);
      }
      return fsWithLock(scopedPath, operation, fn, lockOptions);
    },
  };
};
