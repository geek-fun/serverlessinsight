/* eslint-disable @typescript-eslint/no-explicit-any */
import os from 'node:os';
import { createRemoteStateBackend } from '../../../../src/common/stateBackend/remoteStateBackend';
import {
  ConditionalPutUnsupportedError,
  StorageAdapter,
} from '../../../../src/common/stateBackend/types';
import {
  LockMetadata,
  StateCorruptError,
  CURRENT_STATE_VERSION,
  ResourceState,
} from '../../../../src/types';
import { LockError } from '../../../../src/common/lockManager';

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
    putIfAbsent: jest.fn(async (key: string, data: unknown) => {
      if (store.has(key)) return false;
      store.set(key, JSON.parse(JSON.stringify(data)));
      return true;
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
  const SCOPED_KEY = 'states/test-app/test-service/prod/cn-hangzhou.json';
  const LEGACY_KEY = 'legacy/state.json';
  const LOCK_KEY = `${SCOPED_KEY}.si-lock`;

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
    it('binds the normalized scope and declares conditional create when supported', () => {
      const backend = createRemoteStateBackend(adapter, {
        scope: { ...scope, region: 'CN-Hangzhou' },
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
      });

      expect(backend.scope).toEqual({ ...scope, region: 'cn-hangzhou' });
      expect(backend.capabilities).toEqual({ conditionalCreate: true });
      expect(backend).toHaveProperty('loadState');
      expect(backend).toHaveProperty('saveState');
      expect(backend).toHaveProperty('readStateSource');
      expect(backend).toHaveProperty('probeWriteReadiness');
      expect(backend).toHaveProperty('patchPersisted');
    });

    it('downgrades capabilities when the adapter cannot conditionally create', () => {
      delete (adapter as Partial<StorageAdapter>).putIfAbsent;
      const backend = createRemoteStateBackend(adapter, {
        scope,
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
      });

      expect(backend.capabilities).toEqual({ conditionalCreate: false });
    });
  });

  describe('loadState', () => {
    it('loads the scoped V4 document for the bound scope', async () => {
      adapter.store.set(SCOPED_KEY, {
        version: CURRENT_STATE_VERSION,
        provider: scope.provider,
        app: scope.app,
        service: scope.service,
        scope: { stage: scope.stage, region: scope.region },
        stages: { prod: { resources: { 'functions.a': makeResource('a') } } },
      });
      const backend = createRemoteStateBackend(adapter, {
        scope,
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
      });

      const state = await backend.loadState();

      expect(Object.keys(state.resources)).toEqual(['functions.a']);
      expect(state.resources['functions.a']).toMatchObject({
        mode: 'managed',
        definition: { name: 'a' },
      });
      expect(backend.readStateSource()).toBe('scoped');
      expect(mockEnforceMigrationMarker).toHaveBeenCalledWith(state, 'off');
    });

    it('passes the configured markerAction to enforceMigrationMarker', async () => {
      adapter.store.set(SCOPED_KEY, {
        version: CURRENT_STATE_VERSION,
        provider: scope.provider,
        app: scope.app,
        service: scope.service,
        scope: { stage: scope.stage, region: scope.region },
        stages: { prod: { resources: {} } },
      });
      const backend = createRemoteStateBackend(adapter, {
        scope,
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
        markerAction: 'refuse',
      });

      await backend.loadState();

      expect(mockEnforceMigrationMarker).toHaveBeenCalledWith(expect.anything(), 'refuse');
    });

    it('falls back to the legacy object for read-only compatibility', async () => {
      adapter.store.set(LEGACY_KEY, {
        version: '3.0',
        provider: scope.provider,
        app: scope.app,
        service: scope.service,
        lineage: 'legacy-lineage',
        serial: 3,
        stages: { prod: { resources: { 'functions.legacy': makeResource('legacy') } } },
      });
      const backend = createRemoteStateBackend(adapter, {
        scope,
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
      });

      const state = await backend.loadState();

      expect(state.resources['functions.legacy']).toBeDefined();
      expect(state.version).toBe('3.0');
      expect(backend.readStateSource()).toBe('legacy');
    });

    it('reports empty when the legacy object holds no resources for this stage', async () => {
      adapter.store.set(LEGACY_KEY, {
        version: '3.0',
        provider: scope.provider,
        app: scope.app,
        service: scope.service,
        stages: { dev: { resources: { 'functions.x': makeResource('x') } } },
      });
      const backend = createRemoteStateBackend(adapter, {
        scope,
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
      });

      const state = await backend.loadState();

      expect(state.resources).toEqual({});
      // The legacy document is served as-is (no scope stamping on the fallback path)
      expect(state.version).toBe('3.0');
      expect(state.scope).toBeUndefined();
      expect(backend.readStateSource()).toBe('empty');
    });

    it('returns an empty scoped state when neither object exists', async () => {
      const backend = createRemoteStateBackend(adapter, {
        scope,
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
      });

      const state = await backend.loadState();

      expect(state.version).toBe(CURRENT_STATE_VERSION);
      expect(state.resources).toEqual({});
      expect(state.scope).toEqual({ stage: 'prod', region: 'cn-hangzhou' });
      expect(backend.readStateSource()).toBe('empty');
    });

    it('rejects a scoped object with an unsupported version instead of serving it', async () => {
      adapter.store.set(SCOPED_KEY, {
        version: '99.0',
        provider: scope.provider,
        app: scope.app,
        service: scope.service,
        scope: { stage: scope.stage, region: scope.region },
        stages: { prod: { resources: {} } },
      });
      const backend = createRemoteStateBackend(adapter, {
        scope,
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
      });

      await expect(backend.loadState()).rejects.toThrow(StateCorruptError);
    });

    it('rejects a scoped object whose identity does not match the bound scope', async () => {
      adapter.store.set(SCOPED_KEY, {
        version: CURRENT_STATE_VERSION,
        provider: scope.provider,
        app: scope.app,
        service: scope.service,
        scope: { stage: scope.stage, region: 'ap-southeast-1' },
        stages: { prod: { resources: {} } },
      });
      const backend = createRemoteStateBackend(adapter, {
        scope,
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
      });

      await expect(backend.loadState()).rejects.toThrow(StateCorruptError);
    });

    it('rejects a legacy object that cannot be migrated instead of treating it as empty', async () => {
      adapter.store.set(LEGACY_KEY, {
        version: '99.0',
        provider: scope.provider,
        app: scope.app,
        service: scope.service,
        stages: { prod: { resources: {} } },
      });
      const backend = createRemoteStateBackend(adapter, {
        scope,
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
      });

      await expect(backend.loadState()).rejects.toThrow(StateCorruptError);
    });
  });

  describe('saveState', () => {
    it('writes the scoped object with scope stamping and projects resources into the stage', async () => {
      const backend = createRemoteStateBackend(adapter, {
        scope,
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
      });

      await backend.saveState({
        version: CURRENT_STATE_VERSION,
        provider: scope.provider,
        app: scope.app,
        service: scope.service,
        stages: { prod: { resources: {} } },
        resources: { 'functions.a': makeResource('a') },
      });

      const persisted = adapter.store.get(SCOPED_KEY) as Record<string, any>;
      expect(persisted.version).toBe(CURRENT_STATE_VERSION);
      expect(persisted.provider).toBe('aliyun');
      expect(persisted.app).toBe('test-app');
      expect(persisted.service).toBe('test-service');
      expect(persisted.scope).toEqual({ stage: 'prod', region: 'cn-hangzhou' });
      expect(persisted.stages.prod.resources['functions.a']).toBeDefined();
      expect(persisted.resources).toBeUndefined();
      expect(persisted.serial).toBe(1);
      expect(persisted.lineage).toBeDefined();
      expect(backend.readStateSource()).toBe('scoped');
    });

    it('continues the scope document lineage and serial across saves', async () => {
      adapter.store.set(SCOPED_KEY, {
        version: CURRENT_STATE_VERSION,
        provider: scope.provider,
        app: scope.app,
        service: scope.service,
        scope: { stage: scope.stage, region: scope.region },
        lineage: 'existing-lineage',
        serial: 7,
        stages: { prod: { resources: {} } },
      });
      const backend = createRemoteStateBackend(adapter, {
        scope,
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
      });

      await backend.saveState({
        version: CURRENT_STATE_VERSION,
        provider: scope.provider,
        app: scope.app,
        service: scope.service,
        stages: { prod: { resources: {} } },
        resources: {},
      });

      const persisted = adapter.store.get(SCOPED_KEY) as Record<string, any>;
      expect(persisted.serial).toBe(8);
      expect(persisted.lineage).toBe('existing-lineage');
    });

    it('merges shared resources from the saved stage', async () => {
      const sharedLog = makeResource('logs');
      const backend = createRemoteStateBackend(adapter, {
        scope,
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
      });

      await backend.saveState({
        version: CURRENT_STATE_VERSION,
        provider: scope.provider,
        app: scope.app,
        service: scope.service,
        stages: { prod: { resources: {}, shared: { logs: sharedLog } } },
        resources: {},
      });

      const persisted = adapter.store.get(SCOPED_KEY) as Record<string, any>;
      expect(persisted.stages.prod.shared).toEqual({ logs: sharedLog });
    });

    it('rejects a save whose identity differs from the bound scope', async () => {
      const backend = createRemoteStateBackend(adapter, {
        scope,
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
      });

      await expect(
        backend.saveState({
          version: CURRENT_STATE_VERSION,
          provider: scope.provider,
          app: 'other-app',
          service: scope.service,
          stages: { prod: { resources: {} } },
          resources: {},
        }),
      ).rejects.toThrow(StateCorruptError);
      expect(adapter.write).not.toHaveBeenCalled();
    });
  });

  describe('patchPersisted', () => {
    it('patches the scoped object when the state source is scoped', async () => {
      adapter.store.set(SCOPED_KEY, {
        version: CURRENT_STATE_VERSION,
        provider: scope.provider,
        app: scope.app,
        service: scope.service,
        scope: { stage: scope.stage, region: scope.region },
        stages: { prod: { resources: {} } },
      });
      const backend = createRemoteStateBackend(adapter, {
        scope,
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
      });
      await backend.loadState();

      await backend.patchPersisted!({ managedBy: 'saas' });

      expect(adapter.write).toHaveBeenCalledWith(
        SCOPED_KEY,
        expect.objectContaining({ managedBy: 'saas' }),
      );
    });

    it('patches the legacy object while it backs the state source', async () => {
      adapter.store.set(LEGACY_KEY, {
        version: '3.0',
        provider: scope.provider,
        app: scope.app,
        service: scope.service,
        stages: { prod: { resources: { 'functions.l': makeResource('l') } } },
      });
      const backend = createRemoteStateBackend(adapter, {
        scope,
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
      });
      await backend.loadState();

      await backend.patchPersisted!({ managedBy: 'saas' });

      expect(adapter.write).toHaveBeenCalledWith(
        LEGACY_KEY,
        expect.objectContaining({ managedBy: 'saas' }),
      );
    });

    it('deletes keys patched with undefined', async () => {
      adapter.store.set(LEGACY_KEY, {
        version: '3.0',
        provider: scope.provider,
        app: scope.app,
        service: scope.service,
        managedBy: 'saas',
        stages: { prod: { resources: { 'functions.l': makeResource('l') } } },
      });
      const backend = createRemoteStateBackend(adapter, {
        scope,
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
      });
      await backend.loadState();

      await backend.patchPersisted!({ managedBy: undefined });

      const written = (adapter.write as jest.Mock).mock.calls[0][1] as Record<string, unknown>;
      expect(written).not.toHaveProperty('managedBy');
    });
  });

  describe('probeWriteReadiness', () => {
    it('blocks writes while the legacy object is authoritative', async () => {
      adapter.store.set(LEGACY_KEY, {
        version: '3.0',
        provider: scope.provider,
        app: scope.app,
        service: scope.service,
        stages: { prod: { resources: { 'functions.l': makeResource('l') } } },
      });
      const backend = createRemoteStateBackend(adapter, {
        scope,
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
      });

      const readiness = await backend.probeWriteReadiness();

      expect(readiness.ready).toBe(false);
      expect(readiness.source).toBe('legacy');
      expect(readiness.reason).toContain('migrate --to-regional');
    });

    it('allows writes for fresh and scoped sources', async () => {
      const backend = createRemoteStateBackend(adapter, {
        scope,
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
      });
      expect((await backend.probeWriteReadiness()).ready).toBe(true);

      adapter.store.set(SCOPED_KEY, {
        version: CURRENT_STATE_VERSION,
        provider: scope.provider,
        app: scope.app,
        service: scope.service,
        scope: { stage: scope.stage, region: scope.region },
        stages: { prod: { resources: {} } },
      });
      const after = await backend.probeWriteReadiness();
      expect(after.ready).toBe(true);
      expect(after.source).toBe('scoped');
    });
  });

  describe('acquireLock', () => {
    it('acquires the scoped lock object exclusively via putIfAbsent', async () => {
      const backend = createRemoteStateBackend(adapter, {
        scope,
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
      });

      const lockId = await backend.acquireLock('deploy');

      expect(adapter.putIfAbsent).toHaveBeenCalledWith(LOCK_KEY, expect.anything());
      expect(lockId).toBe((adapter.store.get(LOCK_KEY) as LockMetadata).id);
      expect(await backend.readLock()).toMatchObject({ id: lockId, operation: 'deploy' });
    });

    it('retries and fails when the lock is held by a live process', async () => {
      adapter.store.set(LOCK_KEY, makeLock());
      const backend = createRemoteStateBackend(adapter, {
        scope,
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
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
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
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
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
      });

      await expect(backend.acquireLock('deploy', { timeout: 0, maxRetries: 0 })).rejects.toThrow(
        LockError,
      );
      await expect(backend.acquireLock('deploy', { timeout: 0, maxRetries: 0 })).rejects.toThrow(
        /stale/,
      );
    });

    it('loses the exclusive-create race and reports the failure', async () => {
      (adapter.putIfAbsent as jest.Mock).mockResolvedValue(false);
      const backend = createRemoteStateBackend(adapter, {
        scope,
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
      });

      await expect(
        backend.acquireLock('deploy', { timeout: 0, maxRetries: 0, retryDelay: 0 }),
      ).rejects.toThrow('Failed to acquire lock');
    });

    it('downgrades conditional create when the storage cannot evaluate exclusivity', async () => {
      (adapter.putIfAbsent as jest.Mock).mockRejectedValueOnce(
        new ConditionalPutUnsupportedError(new Error('nope')),
      );
      const backend = createRemoteStateBackend(adapter, {
        scope,
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
      });
      const { logger } = jest.requireMock('../../../../src/common/logger');

      const lockId = await backend.acquireLock('deploy');

      expect(lockId).toBe((adapter.store.get(LOCK_KEY) as LockMetadata).id);
      expect(adapter.putIfAbsent).toBeUndefined();
      expect(backend.capabilities).toEqual({ conditionalCreate: false });
      expect(logger.warn).toHaveBeenCalledTimes(1);

      // A later acquisition uses the verified fallback without warning again.
      await backend.releaseLock(lockId);
      const secondId = await backend.acquireLock('deploy');
      expect(secondId).toBe((adapter.store.get(LOCK_KEY) as LockMetadata).id);
      expect(logger.warn).toHaveBeenCalledTimes(1);
    });

    it('falls back to a verified plain write with a warning when the adapter has no conditional create', async () => {
      delete (adapter as Partial<StorageAdapter>).putIfAbsent;
      const backend = createRemoteStateBackend(adapter, {
        scope,
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
      });
      const { logger } = jest.requireMock('../../../../src/common/logger');

      const lockId = await backend.acquireLock('deploy');

      expect(lockId).toBe((adapter.store.get(LOCK_KEY) as LockMetadata).id);
      expect(adapter.write).toHaveBeenCalledWith(LOCK_KEY, expect.anything());
      expect(logger.warn).toHaveBeenCalledTimes(1);
    });

    it('rethrows unexpected putIfAbsent failures instead of downgrading exclusivity', async () => {
      (adapter.putIfAbsent as jest.Mock).mockRejectedValue(new Error('network down'));
      const backend = createRemoteStateBackend(adapter, {
        scope,
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
      });

      await expect(backend.acquireLock('deploy', { timeout: 0, maxRetries: 0 })).rejects.toThrow(
        'network down',
      );
      expect(adapter.write).not.toHaveBeenCalled();
    });

    it('waits and retries while a live lock from another host is held', async () => {
      adapter.store.set(LOCK_KEY, makeLock());
      const backend = createRemoteStateBackend(adapter, {
        scope,
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
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
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
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
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
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
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
      });

      await expect(backend.forceUnlock('test-lock-id')).resolves.toBe(true);
      expect(adapter.delete).toHaveBeenCalledWith(LOCK_KEY);
    });

    it('returns false when there is no lock', async () => {
      const backend = createRemoteStateBackend(adapter, {
        scope,
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
      });

      await expect(backend.forceUnlock('test-lock-id')).resolves.toBe(false);
      expect(adapter.delete).not.toHaveBeenCalled();
    });

    it('throws on ID mismatch', async () => {
      adapter.store.set(LOCK_KEY, makeLock({ id: 'other-lock-id' }));
      const backend = createRemoteStateBackend(adapter, {
        scope,
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
      });

      await expect(backend.forceUnlock('test-lock-id')).rejects.toThrow('Lock ID mismatch');
    });
  });

  describe('readLock', () => {
    it('returns the lock metadata or null', async () => {
      const backend = createRemoteStateBackend(adapter, {
        scope,
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
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
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
      });

      const result = await backend.withLock('deploy', async () => 'test-result');

      expect(result).toBe('test-result');
      expect(adapter.putIfAbsent).toHaveBeenCalledWith(LOCK_KEY, expect.anything());
      expect(adapter.store.has(LOCK_KEY)).toBe(false);
    });

    it('releases the lock when the function fails', async () => {
      const backend = createRemoteStateBackend(adapter, {
        scope,
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
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
        scopedKey: SCOPED_KEY,
        legacyKey: LEGACY_KEY,
      });
      const onLockAcquired = jest.fn();

      await backend.withLock('deploy', async () => undefined, undefined, onLockAcquired);

      expect(onLockAcquired).toHaveBeenCalledWith(expect.any(String));
    });
  });
});
