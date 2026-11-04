import { AsyncLocalStorage } from 'node:async_hooks';

import { createAggregateStore } from '../aggregateStore';
import { getStatePath } from '../stateManager';
import { normalizeScope } from '../stateScope';
import { createLocalStateIO } from '../stateStorageIO';
import {
  withLock as fsWithLock,
  forceUnlock as fsForceUnlock,
  readLockFileForCommand,
  acquireLockInternal,
  releaseLockInternal,
} from '../lockManager';
import type { StateBackend, LockMetadata } from './types';
import type { StateFile, LockOptions } from '../../types';
import type { DeploymentScope } from '../stateScope';
import type { MigrationMarkerAction } from '../migrationMarker';

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
  const statePath = getStatePath(normalized.app, normalized.service, baseDir);
  const store = createAggregateStore(createLocalStateIO({ backupWrites: false }), normalized, {
    key: statePath,
    backupWrites: true,
    markerAction: options.markerAction ?? 'off',
  });
  const writer = new AsyncLocalStorage<boolean>();
  let manualLockId: string | null = null;

  const withLock = async <T>(
    operation: string,
    fn: () => Promise<T>,
    lockOptions?: LockOptions,
    onLockAcquired?: (lockId: string) => void,
  ): Promise<T> =>
    fsWithLock(
      statePath,
      operation,
      () =>
        writer.run(true, async () => {
          try {
            if (!operation.startsWith('migrate')) await store.verifyPlanBase();
            return await fn();
          } finally {
            store.clearPlanBase();
          }
        }),
      lockOptions,
      onLockAcquired,
    );

  const mutate = async (operation: string, fn: () => Promise<void>): Promise<void> => {
    if (writer.getStore() || manualLockId) return fn();
    return withLock(operation, fn);
  };

  return {
    scope: normalized,
    capabilities: { conditionalCreate: true },
    loadState: (): Promise<StateFile> => store.loadState(!writer.getStore() && !manualLockId),
    saveState: (state): Promise<void> => mutate('state-save', () => store.saveState(state)),
    patchPersisted: (patch): Promise<void> =>
      mutate('migrate-metadata', () => store.patchPersisted(patch)),
    readStateSource: store.readStateSource,
    probeWriteReadiness: store.probeWriteReadiness,
    acquireLock: async (operation, lockOptions): Promise<string> => {
      const lock = await acquireLockInternal(statePath, operation, lockOptions);
      try {
        if (!operation.startsWith('migrate')) await store.verifyPlanBase();
        manualLockId = lock.id;
        return lock.id;
      } catch (error) {
        releaseLockInternal(statePath, lock.id);
        throw error;
      }
    },
    releaseLock: async (lockId): Promise<void> => {
      releaseLockInternal(statePath, lockId);
      if (manualLockId === lockId) {
        manualLockId = null;
        store.clearPlanBase();
      }
    },
    forceUnlock: async (lockId): Promise<boolean> => {
      const removed = fsForceUnlock(statePath, lockId);
      if (removed && manualLockId === lockId) {
        manualLockId = null;
        store.clearPlanBase();
      }
      return removed;
    },
    readLock: async (): Promise<LockMetadata | null> => readLockFileForCommand(statePath),
    withLock,
  };
};
