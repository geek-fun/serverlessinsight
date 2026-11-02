import { StateFile, LockOptions, LockMetadata } from '../../types';
import type { DeploymentScope } from '../stateScope';
import type { DeploymentEventRecord } from '../eventQueue';

export type StateSource = 'scoped' | 'legacy' | 'empty';

export type BackendCapabilities = {
  conditionalCreate: boolean;
};

export class ConditionalPutUnsupportedError extends Error {
  constructor(cause: unknown) {
    super('storage does not support conditional (create-only) writes');
    this.name = 'ConditionalPutUnsupportedError';
    this.cause = cause;
  }
}

export type WriteReadiness = {
  ready: boolean;
  source: StateSource;
  reason?: string;
};

/**
 * Storage adapter interface for remote state backends.
 * Abstracts the underlying storage SDK (OSS, COS, S3, etc.) into a common interface.
 */
export type StorageAdapter = {
  list?: (prefix: string) => Promise<string[]>;
  /** null means confirmed absence, never a network or permission failure. */
  read: <T>(key: string) => Promise<T | null>;
  /** Write an object to storage */
  write: (key: string, data: unknown) => Promise<void>;
  /** false means another writer won; unsupported conditional creation must throw. */
  putIfAbsent?: (key: string, data: unknown) => Promise<boolean>;
  /** Delete an object from storage */
  delete: (key: string) => Promise<void>;
  /** The base path for lock metadata (e.g., 'oss://bucket/key') */
  lockPath: string;
};

export type StateBackend = {
  readonly scope: DeploymentScope;
  readonly capabilities: BackendCapabilities;
  loadState: () => Promise<StateFile>;
  saveState: (state: StateFile) => Promise<void>;
  /**
   * Merge top-level fields into the persisted state; a value of `undefined`
   * deletes the key. Written as a new persisted version (the backend's usual
   * backup/atomicity rules apply). Used by `si migrate` for the console-UUID
   * backfill and the migration marker. Backends without a persisted legacy
   * state (SaaS) omit it.
   */
  patchPersisted?: (patch: Record<string, unknown | undefined>) => Promise<void>;
  readStateSource: () => StateSource;
  probeWriteReadiness: () => Promise<WriteReadiness>;
  acquireLock: (operation: string, options?: LockOptions) => Promise<string>;
  releaseLock: (lockId: string) => Promise<void>;
  forceUnlock: (lockId: string) => Promise<boolean>;
  readLock: () => Promise<LockMetadata | null>;
  withLock: <T>(
    operation: string,
    fn: () => Promise<T>,
    options?: LockOptions,
    onLockAcquired?: (lockId: string) => void,
  ) => Promise<T>;
  /** ADR-005: report a typed deployment event (SaaS backend persists via API). */
  reportEvent?: (event: DeploymentEventRecord) => void;
  /** ADR-005: flush any buffered deployment events (used on exit / in tests). */
  flushEvents?: () => Promise<void>;
  /** ADR-005: replay event-queue files orphaned by a previous interrupted run. */
  replayOrphanedEvents?: () => Promise<void>;
};

export type { LockMetadata };
export type { DeploymentScope };
