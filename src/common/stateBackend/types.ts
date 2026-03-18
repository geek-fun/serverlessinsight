import { StateFile, LockOptions, LockMetadata } from '../../types';

/**
 * Storage adapter interface for remote state backends.
 * Abstracts the underlying storage SDK (OSS, COS, S3, etc.) into a common interface.
 */
export type StorageAdapter = {
  /** Read an object from storage, returns null if not found */
  read: <T>(key: string) => Promise<T | null>;
  /** Write an object to storage */
  write: (key: string, data: unknown) => Promise<void>;
  /** Delete an object from storage */
  delete: (key: string) => Promise<void>;
  /** The base path for lock metadata (e.g., 'oss://bucket/key') */
  lockPath: string;
};

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
