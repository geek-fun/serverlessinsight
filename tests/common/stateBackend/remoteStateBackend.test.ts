import { createRemoteStateBackend } from '../../../src/common/stateBackend/remoteStateBackend';
import { StorageAdapter } from '../../../src/common/stateBackend/types';
import {
  StateFile,
  LockMetadata,
  CURRENT_STATE_VERSION,
  ResourceState,
  LockOptions,
} from '../../../src/types';
import { LockError } from '../../../src/common/lockManager';
import * as lockUtils from '../../../src/common/stateBackend/lockUtils';

jest.mock('../../../src/common/stateBackend/lockUtils');
jest.mock('../../../src/common/logger');

describe('remoteStateBackend', () => {
  let mockAdapter: jest.Mocked<StorageAdapter>;
  const mockLockUtils = lockUtils as any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockAdapter = {
      read: jest.fn(),
      write: jest.fn(),
      delete: jest.fn(),
      lockPath: 'oss://test-bucket/state',
    };
    mockLockUtils.sleep.mockResolvedValue(undefined);
    mockLockUtils.isLockStale.mockReturnValue(false);
    mockLockUtils.isProcessAlive.mockReturnValue(true);
    mockLockUtils.createLockMetadata.mockImplementation((op: string, path: string) => ({
      id: 'test-lock-id',
      user: 'user@host',
      processId: process.pid,
      hostname: 'localhost',
      operation: op,
      acquiredAt: new Date().toISOString(),
      path,
    }));
  });

  describe('loadState', () => {
    it('should load stage-specific resources', async () => {
      const mockResource: ResourceState = {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {},
        instances: [],
        lastUpdated: new Date().toISOString(),
      };
      const mockState: StateFile = {
        version: CURRENT_STATE_VERSION,
        provider: 'aliyun',
        app: 'test-app',
        service: 'test-service',
        stages: {
          dev: { resources: { func1: mockResource } },
        },
        resources: {},
      };
      mockAdapter.read.mockResolvedValue(mockState);

      const backend = createRemoteStateBackend(mockAdapter, { key: 'state.json' });
      const result = await backend.loadState('aliyun', 'test-app', 'test-service', 'dev');

      expect(result.resources).toEqual({ func1: mockResource });
    });

    it('should return empty state if not found', async () => {
      mockAdapter.read.mockResolvedValue(null);

      const backend = createRemoteStateBackend(mockAdapter, { key: 'state.json' });
      const result = await backend.loadState('aliyun', 'test-app', 'test-service', 'dev');

      expect(result.resources).toEqual({});
      expect(result.version).toBe(CURRENT_STATE_VERSION);
    });

    it('should handle missing stage gracefully', async () => {
      const mockState: StateFile = {
        version: CURRENT_STATE_VERSION,
        provider: 'aliyun',
        app: 'test-app',
        service: 'test-service',
        stages: {},
        resources: {},
      };
      mockAdapter.read.mockResolvedValue(mockState);

      const backend = createRemoteStateBackend(mockAdapter, { key: 'state.json' });
      const result = await backend.loadState('aliyun', 'test-app', 'test-service', 'dev');

      expect(result.resources).toEqual({});
    });
  });

  describe('saveState', () => {
    it('should save state with stage separation', async () => {
      mockAdapter.read.mockResolvedValue(null);
      const resource: ResourceState = {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: { name: 'func1' },
        instances: [],
        lastUpdated: new Date().toISOString(),
      };
      const newState: StateFile = {
        version: CURRENT_STATE_VERSION,
        provider: 'aliyun',
        app: 'test-app',
        service: 'test-service',
        stages: {},
        resources: { func1: resource },
      };

      const backend = createRemoteStateBackend(mockAdapter, { key: 'state.json' });
      await backend.saveState(newState, 'test-app', 'test-service', 'dev');

      expect(mockAdapter.write).toHaveBeenCalled();
      const savedState = (mockAdapter.write as jest.Mock).mock.calls[0][1] as StateFile;
      expect(savedState.stages.dev.resources).toEqual({ func1: resource });
    });

    it('should merge with existing stages', async () => {
      const existingResource: ResourceState = {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {},
        instances: [],
        lastUpdated: new Date().toISOString(),
      };
      const existingState: StateFile = {
        version: CURRENT_STATE_VERSION,
        provider: 'aliyun',
        app: 'test-app',
        service: 'test-service',
        stages: { prod: { resources: { existing: existingResource } } },
        resources: {},
      };
      mockAdapter.read.mockResolvedValue(existingState);

      const newResource: ResourceState = {
        mode: 'managed',
        region: 'us-west-1',
        definition: { name: 'func2' },
        instances: [],
        lastUpdated: new Date().toISOString(),
      };
      const newState: StateFile = {
        version: CURRENT_STATE_VERSION,
        provider: 'aliyun',
        app: 'test-app',
        service: 'test-service',
        stages: {},
        resources: { func2: newResource },
      };

      const backend = createRemoteStateBackend(mockAdapter, { key: 'state.json' });
      await backend.saveState(newState, 'test-app', 'test-service', 'dev');

      const savedState = (mockAdapter.write as jest.Mock).mock.calls[0][1] as StateFile;
      expect(savedState.stages.prod.resources).toEqual({ existing: existingResource });
      expect(savedState.stages.dev.resources).toEqual({ func2: newResource });
    });
  });

  describe('acquireLock', () => {
    it('should call adapter methods for lock acquisition', async () => {
      const mockLock: LockMetadata = {
        id: 'test-lock-id',
        user: 'user@host',
        processId: process.pid,
        hostname: 'localhost',
        operation: 'deploy',
        acquiredAt: new Date().toISOString(),
        path: 'oss://test-bucket/state',
      };
      mockAdapter.read.mockResolvedValueOnce(null);
      mockAdapter.read.mockResolvedValueOnce(mockLock);
      mockAdapter.write.mockResolvedValue(undefined);

      const backend = createRemoteStateBackend(mockAdapter, { key: 'state.json' });
      const lockId = await backend.acquireLock('deploy');

      expect(lockId).toBe('test-lock-id');
      expect(mockAdapter.read).toHaveBeenCalled();
      expect(mockAdapter.write).toHaveBeenCalled();
    });

    it('should throw LockError when lock is stale', async () => {
      const staleLock: LockMetadata = {
        id: 'stale-lock',
        user: 'user@host',
        processId: 1234,
        hostname: 'localhost',
        operation: 'deploy',
        acquiredAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        path: '/path',
      };

      mockLockUtils.isProcessAlive.mockReturnValue(true);
      mockLockUtils.isLockStale.mockReturnValue(true);
      mockAdapter.read.mockResolvedValue(staleLock);

      const backend = createRemoteStateBackend(mockAdapter, { key: 'state.json' });

      await expect(backend.acquireLock('deploy')).rejects.toThrow(LockError);
    });
  });

  describe('releaseLock', () => {
    it('should release lock when ID matches', async () => {
      const lockKey = 'state.json.si-lock';
      const lock: LockMetadata = {
        id: 'test-lock-id',
        user: 'user@host',
        processId: 1234,
        hostname: 'localhost',
        operation: 'deploy',
        acquiredAt: new Date().toISOString(),
        path: '/path',
      };
      mockAdapter.read.mockResolvedValue(lock);
      mockAdapter.delete.mockResolvedValue(undefined);

      const backend = createRemoteStateBackend(mockAdapter, { key: 'state.json' });
      await backend.releaseLock('test-lock-id');

      expect(mockAdapter.delete).toHaveBeenCalledWith(lockKey);
    });

    it('should not delete when lock ID does not match', async () => {
      const lock: LockMetadata = {
        id: 'other-lock-id',
        user: 'user@host',
        processId: 1234,
        hostname: 'localhost',
        operation: 'deploy',
        acquiredAt: new Date().toISOString(),
        path: '/path',
      };
      mockAdapter.read.mockResolvedValue(lock);

      const backend = createRemoteStateBackend(mockAdapter, { key: 'state.json' });
      await backend.releaseLock('test-lock-id');

      expect(mockAdapter.delete).not.toHaveBeenCalled();
    });

    it('should not delete when no lock exists', async () => {
      mockAdapter.read.mockResolvedValue(null);

      const backend = createRemoteStateBackend(mockAdapter, { key: 'state.json' });
      await backend.releaseLock('test-lock-id');

      expect(mockAdapter.delete).not.toHaveBeenCalled();
    });
  });

  describe('forceUnlock', () => {
    it('should force unlock and return true', async () => {
      const lock: LockMetadata = {
        id: 'test-lock-id',
        user: 'user@host',
        processId: 1234,
        hostname: 'localhost',
        operation: 'deploy',
        acquiredAt: new Date().toISOString(),
        path: '/path',
      };
      mockAdapter.read.mockResolvedValue(lock);
      mockAdapter.delete.mockResolvedValue(undefined);

      const backend = createRemoteStateBackend(mockAdapter, { key: 'state.json' });
      const result = await backend.forceUnlock('test-lock-id');

      expect(result).toBe(true);
      expect(mockAdapter.delete).toHaveBeenCalled();
    });

    it('should return false when lock does not exist', async () => {
      mockAdapter.read.mockResolvedValue(null);

      const backend = createRemoteStateBackend(mockAdapter, { key: 'state.json' });
      const result = await backend.forceUnlock('test-lock-id');

      expect(result).toBe(false);
      expect(mockAdapter.delete).not.toHaveBeenCalled();
    });

    it('should throw error on ID mismatch', async () => {
      const lock: LockMetadata = {
        id: 'other-lock-id',
        user: 'user@host',
        processId: 1234,
        hostname: 'localhost',
        operation: 'deploy',
        acquiredAt: new Date().toISOString(),
        path: '/path',
      };
      mockAdapter.read.mockResolvedValue(lock);

      const backend = createRemoteStateBackend(mockAdapter, { key: 'state.json' });

      await expect(backend.forceUnlock('test-lock-id')).rejects.toThrow('Lock ID mismatch');
    });
  });

  describe('readLock', () => {
    it('should read lock metadata', async () => {
      const lock: LockMetadata = {
        id: 'test-lock-id',
        user: 'user@host',
        processId: 1234,
        hostname: 'localhost',
        operation: 'deploy',
        acquiredAt: new Date().toISOString(),
        path: '/path',
      };
      mockAdapter.read.mockResolvedValue(lock);

      const backend = createRemoteStateBackend(mockAdapter, { key: 'state.json' });
      const result = await backend.readLock();

      expect(result).toEqual(lock);
    });

    it('should return null when no lock exists', async () => {
      mockAdapter.read.mockResolvedValue(null);

      const backend = createRemoteStateBackend(mockAdapter, { key: 'state.json' });
      const result = await backend.readLock();

      expect(result).toBeNull();
    });
  });

  describe('withLock', () => {
    it('should execute function and manage lock lifecycle', async () => {
      const mockLock: LockMetadata = {
        id: 'test-lock-id',
        user: 'user@host',
        processId: process.pid,
        hostname: 'localhost',
        operation: 'deploy',
        acquiredAt: new Date().toISOString(),
        path: 'oss://test-bucket/state',
      };
      mockAdapter.read.mockResolvedValueOnce(null);
      mockAdapter.read.mockResolvedValueOnce(mockLock);
      mockAdapter.read.mockResolvedValueOnce(mockLock);
      mockAdapter.write.mockResolvedValue(undefined);
      mockAdapter.delete.mockResolvedValue(undefined);

      let executed = false;
      const backend = createRemoteStateBackend(mockAdapter, { key: 'state.json' });
      await backend.withLock('deploy', async () => {
        executed = true;
      });

      expect(executed).toBe(true);
      expect(mockAdapter.write).toHaveBeenCalled();
      expect(mockAdapter.delete).toHaveBeenCalled();
    });

    it('should return function result', async () => {
      const mockLock: LockMetadata = {
        id: 'test-lock-id',
        user: 'user@host',
        processId: process.pid,
        hostname: 'localhost',
        operation: 'deploy',
        acquiredAt: new Date().toISOString(),
        path: 'oss://test-bucket/state',
      };
      mockAdapter.read.mockResolvedValueOnce(null);
      mockAdapter.read.mockResolvedValueOnce(mockLock);
      mockAdapter.read.mockResolvedValueOnce(mockLock);
      mockAdapter.write.mockResolvedValue(undefined);
      mockAdapter.delete.mockResolvedValue(undefined);

      const backend = createRemoteStateBackend(mockAdapter, { key: 'state.json' });
      const result = await backend.withLock('deploy', async () => 'test-result');

      expect(result).toBe('test-result');
    });

    it('should clean up on error', async () => {
      const mockLock: LockMetadata = {
        id: 'test-lock-id',
        user: 'user@host',
        processId: process.pid,
        hostname: 'localhost',
        operation: 'deploy',
        acquiredAt: new Date().toISOString(),
        path: 'oss://test-bucket/state',
      };
      mockAdapter.read.mockResolvedValueOnce(null);
      mockAdapter.read.mockResolvedValueOnce(mockLock);
      mockAdapter.read.mockResolvedValueOnce(mockLock);
      mockAdapter.write.mockResolvedValue(undefined);
      mockAdapter.delete.mockResolvedValue(undefined);

      const backend = createRemoteStateBackend(mockAdapter, { key: 'state.json' });

      await expect(
        backend.withLock('deploy', async () => {
          throw new Error('Function error');
        }),
      ).rejects.toThrow('Function error');

      expect(mockAdapter.delete).toHaveBeenCalled();
    });
  });
});
