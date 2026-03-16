import { StateFile, LockOptions } from '../../types';
import { loadState as fsLoadState, saveState as fsSaveState, getStatePath } from '../stateManager';
import {
  withLock as fsWithLock,
  forceUnlock as fsForceUnlock,
  readLockFileForCommand,
  acquireLockInternal,
  releaseLockInternal,
} from '../lockManager';
import { StateBackend, LockMetadata } from './types';

export const createLocalStateBackend = (
  app: string,
  service: string,
  baseDir: string = process.cwd(),
): StateBackend => {
  const statePath = getStatePath(app, service, baseDir);

  return {
    loadState: async (
      provider: string,
      loadApp: string,
      loadService: string,
      stage: string,
    ): Promise<StateFile> => {
      return fsLoadState(provider, loadApp, loadService, stage, baseDir);
    },

    saveState: async (
      state: StateFile,
      saveApp: string,
      saveService: string,
      stage: string,
    ): Promise<void> => {
      fsSaveState(state, saveApp, saveService, stage, baseDir);
    },

    acquireLock: async (operation: string, options?: LockOptions): Promise<string> => {
      const lockMeta = await acquireLockInternal(statePath, operation, options);
      return lockMeta.id;
    },

    releaseLock: async (lockId: string): Promise<void> => {
      releaseLockInternal(statePath, lockId);
    },

    forceUnlock: async (lockId: string): Promise<boolean> => {
      return fsForceUnlock(statePath, lockId);
    },

    readLock: async (): Promise<LockMetadata | null> => {
      return readLockFileForCommand(statePath);
    },

    withLock: async <T>(
      operation: string,
      fn: () => Promise<T>,
      options?: LockOptions,
    ): Promise<T> => {
      return fsWithLock(statePath, operation, fn, options);
    },
  };
};
