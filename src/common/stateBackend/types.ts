import { StateFile, LockOptions, LockMetadata } from '../../types';
import type { DeploymentScope } from '../stateScope';
import type { DeploymentEventRecord } from '../eventQueue';

/**
 * Where the backend's most recent loadState found its data. Mutating commands
 * use this to gate writes (issue #280): a 'legacy' source means a pre-V4
 * aggregate is authoritative and regional writes must not silently replace it.
 */
export type StateSource = 'scoped' | 'legacy' | 'empty';

/** Declared backend capabilities (issue #280 §3): honest, not assumed. */
export type BackendCapabilities = {
  /**
   * The storage supports verified exclusive create (conditional put). When
   * true, remote locks are created atomically; when false, mutations are refused.
   */
  conditionalCreate: boolean;
};

/**
 * Thrown by StorageAdapter.putIfAbsent when the storage cannot evaluate the
 * exclusivity condition at all (unsupported header, proxy rejection). The
 * backend declares conditionalCreate=false and refuses mutations.
 */
export class ConditionalPutUnsupportedError extends Error {
  constructor(cause: unknown) {
    super('storage does not support conditional (create-only) writes');
    this.name = 'ConditionalPutUnsupportedError';
    this.cause = cause;
  }
}

/** Write readiness reported by mutating-command gates. */
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
  /** Read an object from storage, returns null if the object does not exist */
  read: <T>(key: string) => Promise<T | null>;
  /** Write an object to storage */
  write: (key: string, data: unknown) => Promise<void>;
  /**
   * Exclusive create: write only when the object does not exist yet.
   * Returns false when the object already exists. Throws
   * ConditionalPutUnsupportedError when the storage cannot evaluate the
   * condition at all — the backend then downgrades to conditionalCreate=false.
   */
  putIfAbsent?: (key: string, data: unknown) => Promise<boolean>;
  /** Delete an object from storage */
  delete: (key: string) => Promise<void>;
  /** The base path for lock metadata (e.g., 'oss://bucket/key') */
  lockPath: string;
};

/**
 * Scope-bound state backend (issue #280 §2): created ONCE per command with the
 * resolved deployment scope and a separate storage location. Load/save/patch/
 * lock/unlock/events never reconstruct their own scope, and saves whose state
 * does not match the bound scope are rejected.
 */
export type StateBackend = {
  /** The deployment scope this backend instance is bound to. */
  readonly scope: DeploymentScope;
  readonly capabilities: BackendCapabilities;
  /** Load the state for the bound scope; also caches the state source. */
  loadState: () => Promise<StateFile>;
  /** Persist state; the state's identity must match the bound scope. */
  saveState: (state: StateFile) => Promise<void>;
  /**
   * Merge top-level fields into the persisted state; a value of `undefined`
   * deletes the key. Written as a new persisted version (the backend's usual
   * backup/atomicity rules apply). Used by `si migrate` for the console-UUID
   * backfill and the migration marker. Backends without a persisted legacy
   * state (SaaS) omit it.
   */
  patchPersisted?: (patch: Record<string, unknown | undefined>) => Promise<void>;
  /** Where the most recent loadState found its data (scoped V4 / legacy / empty). */
  readStateSource: () => StateSource;
  /**
   * Mutating-command gate: verifies regional writes are safe for the bound
   * scope — scoped state exists (or none does), the source is not a legacy
   * aggregate, and the backend/storage supports the regional protocol.
   */
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
