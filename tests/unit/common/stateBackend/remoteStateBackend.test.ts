import os from 'node:os';
import { createRemoteStateBackend } from '../../../../src/common/stateBackend/remoteStateBackend';
import type { StorageAdapter } from '../../../../src/common/stateBackend/types';
import {
  LockMetadata,
  StateCorruptError,
  StateVersionError,
  ResourceState,
} from '../../../../src/types';
import { LockError } from '../../../../src/common/lockManager';
import {
  aggregatePartition,
  emptyDeploymentState,
  type AggregateStateFile,
} from '../../../../src/common/aggregateState';

jest.mock('../../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

const mockEnforceMigrationMarker = jest.fn();
jest.mock('../../../../src/common/migrationMarker', () => ({
  enforceMigrationMarker: (...args: unknown[]) => mockEnforceMigrationMarker(...args),
}));

type FakeAdapter = StorageAdapter & { store: Map<string, unknown> };

/** In-memory storage adapter: all external I/O the backend touches is faked. */
const createFakeAdapter = (initial: Record<string, unknown> = {}): FakeAdapter => {
  const store = new Map<string, unknown>(Object.entries(initial));
  const adapter = {
    store,
    read: jest.fn(async <T>(key: string): Promise<T | null> =>
      store.has(key) ? (store.get(key) as T) : null,
    ),
    write: jest.fn(async (key: string, data: unknown) => {
      store.set(key, JSON.parse(JSON.stringify(data)));
    }),
    delete: jest.fn(async (key: string) => {
      store.delete(key);
    }),
    lockPath: 'oss://test-bucket/state',
  };
  return adapter as unknown as FakeAdapter;
};

describe('remoteStateBackend (scope-bound, issue #280)', () => {
  const scope = {
    provider: 'aliyun',
    app: 'test-app',
    service: 'test-service',
    stage: 'prod',
    region: 'cn-hangzhou',
  };
  const LEGACY_KEY = 'legacy/state.json';
  const LOCK_KEY = `${LEGACY_KEY}.si-lock`;

  const makeResource = (name: string): ResourceState => ({
    mode: 'managed',
    region: scope.region,
    definition: { name },
    instances: [],
    lastUpdated: new Date().toISOString(),
  });

  const makeLock = (overrides: Partial<LockMetadata> = {}): LockMetadata => ({
    id: 'other-lock-id',
    user: 'user@host',
    processId: process.pid,
    hostname: 'other-host',
    operation: 'deploy',
    acquiredAt: new Date().toISOString(),
    path: 'oss://test-bucket/state',
    ...overrides,
  });

  let adapter: FakeAdapter;

  beforeEach(() => {
    jest.clearAllMocks();
    adapter = createFakeAdapter();
  });

  describe('creation contract', () => {
    it('binds the normalized scope and reports non-atomic Bucket locking', () => {
      const backend = createRemoteStateBackend(adapter, {
        scope: { ...scope, region: 'CN-Hangzhou' },
        key: LEGACY_KEY,
      });

      expect(backend.scope).toEqual({ ...scope, region: 'cn-hangzhou' });
      expect(backend.capabilities).toEqual({ conditionalCreate: false });
      expect(backend).toHaveProperty('loadState');
      expect(backend).toHaveProperty('saveState');
      expect(backend).toHaveProperty('readStateSource');
      expect(backend).toHaveProperty('probeWriteReadiness');
      expect(backend).toHaveProperty('patchPersisted');
    });

    it('does not access storage when constructing the backend', () => {
      const backend = createRemoteStateBackend(adapter, {
        scope,
        key: LEGACY_KEY,
      });

      expect(backend.capabilities).toEqual({ conditionalCreate: false });
      expect(adapter.read).not.toHaveBeenCalled();
      expect(adapter.write).not.toHaveBeenCalled();
    });
  });

  describe('aggregate IO', () => {
    const backend = () =>
      createRemoteStateBackend(adapter, {
        scope,
        key: LEGACY_KEY,
      });

    it('persists only the original key and returns a V4 target projection', async () => {
      await backend().saveState(emptyDeploymentState(scope));
      const saved = adapter.store.get(LEGACY_KEY) as AggregateStateFile;
      expect(saved.version).toBe('4.0');
      expect((await backend().loadState()).scope).toEqual({
        stage: scope.stage,
        region: scope.region,
      });
    });

    it('merges fresh sibling state and patches only selected migration ownership', async () => {
      const first = backend();
      await first.saveState(emptyDeploymentState(scope));
      const sibling = { ...scope, provider: 'tencent', region: 'ap-shanghai' };
      await createRemoteStateBackend(adapter, {
        scope: sibling,
        key: LEGACY_KEY,
      }).saveState(emptyDeploymentState(sibling));
      await first.patchPersisted!({ managedBy: 'saas' });
      const doc = adapter.store.get(LEGACY_KEY) as AggregateStateFile;
      expect(aggregatePartition(doc, scope)?.managedBy).toBe('saas');
      expect(aggregatePartition(doc, sibling)?.serial).toBe(1);
      expect(adapter.store.has(LEGACY_KEY + '.backup')).toBe(true);
    });

    it('refuses legacy writes and returns their exact original stage for read-only review', async () => {
      const legacy = {
        version: '3.0',
        provider: 'aliyun',
        app: scope.app,
        service: scope.service,
        stages: { prod: { resources: { handler: makeResource('handler') } } },
      };
      adapter.store.set(LEGACY_KEY, legacy);
      expect((await backend().loadState()).resources).toEqual(legacy.stages.prod.resources);
      expect(await backend().probeWriteReadiness()).toMatchObject({
        ready: false,
        source: 'legacy',
      });
      await expect(backend().saveState(emptyDeploymentState(scope))).rejects.toThrow(
        /in-place format upgrade/,
      );
      expect(adapter.store.get(LEGACY_KEY)).toEqual(legacy);
    });

    it('propagates storage errors and releases the shared lock after a failed save', async () => {
      const error = new Error('network unavailable');
      (adapter.write as jest.Mock).mockRejectedValueOnce(error);
      await expect(backend().saveState(emptyDeploymentState(scope))).rejects.toBe(error);
      expect(adapter.store.has(LOCK_KEY)).toBe(false);
      expect(adapter.store.has(LEGACY_KEY)).toBe(false);
    });

    it('does not overwrite corrupt, foreign or unsupported aggregate documents', async () => {
      adapter.store.set(LEGACY_KEY, { version: '8.0', app: scope.app, service: scope.service });
      await expect(backend().loadState()).rejects.toBeInstanceOf(StateVersionError);
      adapter.store.set(LEGACY_KEY, {
        version: '4.0',
        app: scope.app,
        service: scope.service,
        stages: [],
      });
      await expect(backend().loadState()).rejects.toBeInstanceOf(StateCorruptError);
      expect(adapter.write).not.toHaveBeenCalled();
    });
  });

  describe('acquireLock', () => {
    it('writes and verifies the original shared lock object', async () => {
      const backend = createRemoteStateBackend(adapter, {
        scope,
        key: LEGACY_KEY,
      });

      const lockId = await backend.acquireLock('deploy');

      expect(adapter.write).toHaveBeenCalledWith(LOCK_KEY, expect.anything());
      expect(lockId).toBe((adapter.store.get(LOCK_KEY) as LockMetadata).id);
      expect(await backend.readLock()).toMatchObject({ id: lockId, operation: 'deploy' });
    });

    it('retries and fails when the lock is held by a live process', async () => {
      adapter.store.set(LOCK_KEY, makeLock());
      const backend = createRemoteStateBackend(adapter, {
        scope,
        key: LEGACY_KEY,
      });

      await expect(backend.acquireLock('deploy', { timeout: 0, maxRetries: 0 })).rejects.toThrow(
        'Failed to acquire lock after 0 seconds',
      );
      expect(adapter.delete).not.toHaveBeenCalled();
    });

    it('auto-releases a lock left by a dead process on this host', async () => {
      adapter.store.set(LOCK_KEY, makeLock({ hostname: os.hostname(), processId: 999999999 }));
      const backend = createRemoteStateBackend(adapter, {
        scope,
        key: LEGACY_KEY,
      });

      const lockId = await backend.acquireLock('deploy', { maxRetries: 1, retryDelay: 0 });

      expect(adapter.delete).toHaveBeenCalledWith(LOCK_KEY);
      expect(lockId).not.toBe('other-lock-id');
    });

    it('refuses a stale lock and points at force-unlock', async () => {
      adapter.store.set(
        LOCK_KEY,
        makeLock({ acquiredAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() }),
      );
      const backend = createRemoteStateBackend(adapter, {
        scope,
        key: LEGACY_KEY,
      });

      await expect(backend.acquireLock('deploy', { timeout: 0, maxRetries: 0 })).rejects.toThrow(
        LockError,
      );
      await expect(backend.acquireLock('deploy', { timeout: 0, maxRetries: 0 })).rejects.toThrow(
        /stale/,
      );
    });

    it('does not run the operation when another writer replaces the lock before verification', async () => {
      (adapter.write as jest.Mock).mockImplementationOnce(async (key: string) => {
        adapter.store.set(key, makeLock());
      });
      const backend = createRemoteStateBackend(adapter, { scope, key: LEGACY_KEY });
      const callback = jest.fn();

      await expect(
        backend.withLock('deploy', callback, { timeout: 0, maxRetries: 0, retryDelay: 0 }),
      ).rejects.toThrow('Failed to acquire lock');
      expect(callback).not.toHaveBeenCalled();
      expect(adapter.delete).not.toHaveBeenCalled();
    });

    it('does not run the operation when the written lock cannot be read back', async () => {
      (adapter.read as jest.Mock).mockResolvedValue(null);
      const backend = createRemoteStateBackend(adapter, { scope, key: LEGACY_KEY });
      const callback = jest.fn();

      await expect(
        backend.withLock('deploy', callback, { timeout: 0, maxRetries: 0, retryDelay: 0 }),
      ).rejects.toThrow('Failed to acquire lock');
      expect(callback).not.toHaveBeenCalled();
    });

    it('propagates a failed initial lock read without writing or running the operation', async () => {
      const error = new Error('network down');
      (adapter.read as jest.Mock).mockRejectedValueOnce(error);
      const backend = createRemoteStateBackend(adapter, { scope, key: LEGACY_KEY });
      const callback = jest.fn();

      await expect(backend.withLock('deploy', callback)).rejects.toBe(error);
      expect(adapter.write).not.toHaveBeenCalled();
      expect(callback).not.toHaveBeenCalled();
    });

    it('propagates a failed lock write without running the operation', async () => {
      const error = new Error('write denied');
      (adapter.write as jest.Mock).mockRejectedValueOnce(error);
      const backend = createRemoteStateBackend(adapter, { scope, key: LEGACY_KEY });
      const callback = jest.fn();

      await expect(backend.withLock('deploy', callback)).rejects.toBe(error);
      expect(adapter.read).toHaveBeenCalledTimes(1);
      expect(callback).not.toHaveBeenCalled();
    });

    it('propagates a failed verification read without deleting an unverified lock', async () => {
      const error = new Error('read timed out');
      (adapter.read as jest.Mock).mockResolvedValueOnce(null).mockRejectedValueOnce(error);
      const backend = createRemoteStateBackend(adapter, { scope, key: LEGACY_KEY });
      const callback = jest.fn();

      await expect(backend.withLock('deploy', callback)).rejects.toBe(error);
      expect(adapter.delete).not.toHaveBeenCalled();
      expect(callback).not.toHaveBeenCalled();
    });

    it('waits and retries while a live lock from another host is held', async () => {
      adapter.store.set(LOCK_KEY, makeLock());
      const backend = createRemoteStateBackend(adapter, {
        scope,
        key: LEGACY_KEY,
      });
      const { logger } = jest.requireMock('../../../../src/common/logger');

      // The foreign lock is fresh (not stale) and lives on another host, so the
      // waiter logs its wait and retries until the retry budget is exhausted.
      await expect(
        backend.acquireLock('deploy', { timeout: 100, maxRetries: 1, retryDelay: 0 }),
      ).rejects.toThrow('Failed to acquire lock');

      expect(logger.info).toHaveBeenCalledWith(expect.stringContaining('Waiting to acquire lock'));
      expect(adapter.delete).not.toHaveBeenCalled();
      expect(adapter.store.has(LOCK_KEY)).toBe(true);
    });
  });

  describe('releaseLock', () => {
    it('deletes the lock object only when the ID matches', async () => {
      const lock = makeLock({ id: 'test-lock-id', hostname: os.hostname() });
      adapter.store.set(LOCK_KEY, lock);
      const backend = createRemoteStateBackend(adapter, {
        scope,
        key: LEGACY_KEY,
      });

      await backend.releaseLock('other-id');
      expect(adapter.delete).not.toHaveBeenCalled();

      await backend.releaseLock('test-lock-id');
      expect(adapter.delete).toHaveBeenCalledWith(LOCK_KEY);
      expect(adapter.store.has(LOCK_KEY)).toBe(false);
    });

    it('does nothing when no lock exists', async () => {
      const backend = createRemoteStateBackend(adapter, {
        scope,
        key: LEGACY_KEY,
      });

      await backend.releaseLock('test-lock-id');

      expect(adapter.delete).not.toHaveBeenCalled();
    });
  });

  describe('forceUnlock', () => {
    it('removes the lock and reports success', async () => {
      adapter.store.set(LOCK_KEY, makeLock({ id: 'test-lock-id' }));
      const backend = createRemoteStateBackend(adapter, {
        scope,
        key: LEGACY_KEY,
      });

      await expect(backend.forceUnlock('test-lock-id')).resolves.toBe(true);
      expect(adapter.delete).toHaveBeenCalledWith(LOCK_KEY);
    });

    it('returns false when there is no lock', async () => {
      const backend = createRemoteStateBackend(adapter, {
        scope,
        key: LEGACY_KEY,
      });

      await expect(backend.forceUnlock('test-lock-id')).resolves.toBe(false);
      expect(adapter.delete).not.toHaveBeenCalled();
    });

    it('throws on ID mismatch', async () => {
      adapter.store.set(LOCK_KEY, makeLock({ id: 'other-lock-id' }));
      const backend = createRemoteStateBackend(adapter, {
        scope,
        key: LEGACY_KEY,
      });

      await expect(backend.forceUnlock('test-lock-id')).rejects.toThrow('Lock ID mismatch');
    });
  });

  describe('readLock', () => {
    it('returns the lock metadata or null', async () => {
      const backend = createRemoteStateBackend(adapter, {
        scope,
        key: LEGACY_KEY,
      });
      expect(await backend.readLock()).toBeNull();

      const lock = makeLock({ id: 'test-lock-id' });
      adapter.store.set(LOCK_KEY, lock);
      expect(await backend.readLock()).toEqual(lock);
    });
  });

  describe('withLock', () => {
    it('executes the function and releases the lock afterwards', async () => {
      const backend = createRemoteStateBackend(adapter, {
        scope,
        key: LEGACY_KEY,
      });

      const result = await backend.withLock('deploy', async () => 'test-result');

      expect(result).toBe('test-result');
      expect(adapter.write).toHaveBeenCalledWith(LOCK_KEY, expect.anything());
      expect(adapter.store.has(LOCK_KEY)).toBe(false);
    });

    it('releases the lock when the function fails', async () => {
      const backend = createRemoteStateBackend(adapter, {
        scope,
        key: LEGACY_KEY,
      });

      await expect(
        backend.withLock('deploy', async () => {
          throw new Error('Function error');
        }),
      ).rejects.toThrow('Function error');

      expect(adapter.store.has(LOCK_KEY)).toBe(false);
    });

    it('invokes the onLockAcquired callback with the lock id', async () => {
      const backend = createRemoteStateBackend(adapter, {
        scope,
        key: LEGACY_KEY,
      });
      const onLockAcquired = jest.fn();

      await backend.withLock('deploy', async () => undefined, undefined, onLockAcquired);

      expect(onLockAcquired).toHaveBeenCalledWith(expect.any(String));
    });
  });
});
