import { StateFile, LockOptions, LockMetadata } from '../../types';

export type StateBackend = {
  loadState: (provider: string, app: string, service: string, stage: string) => Promise<StateFile>;
  saveState: (state: StateFile, app: string, service: string, stage: string) => Promise<void>;
  acquireLock: (operation: string, options?: LockOptions) => Promise<string>;
  releaseLock: (lockId: string) => Promise<void>;
  forceUnlock: (lockId: string) => Promise<boolean>;
  readLock: () => Promise<LockMetadata | null>;
  withLock: <T>(operation: string, fn: () => Promise<T>, options?: LockOptions) => Promise<T>;
};

export type { LockMetadata };
