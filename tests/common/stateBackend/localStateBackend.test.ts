import { createLocalStateBackend } from '../../../src/common/stateBackend/localStateBackend';
import * as stateManager from '../../../src/common/stateManager';
import * as lockManager from '../../../src/common/lockManager';
import {
  StateFile,
  LockMetadata,
  LockOptions,
  CURRENT_STATE_VERSION,
  ResourceState,
} from '../../../src/types';

jest.mock('../../../src/common/stateManager');
jest.mock('../../../src/common/lockManager');

describe('localStateBackend', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mockStateManager = stateManager as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mockLockManager = lockManager as any;

  const testApp = 'test-app';
  const testService = 'test-service';
  const testBaseDir = '/test/dir';

  beforeEach(() => {
    jest.clearAllMocks();
    mockStateManager.getStatePath.mockReturnValue(
      '/test/dir/.serverlessinsight/state-test-app-test-service.json',
    );
  });

  describe('createLocalStateBackend', () => {
    it('should return a state backend object with all required methods', () => {
      const backend = createLocalStateBackend(testApp, testService, testBaseDir);

      expect(backend).toHaveProperty('loadState');
      expect(backend).toHaveProperty('saveState');
      expect(backend).toHaveProperty('acquireLock');
      expect(backend).toHaveProperty('releaseLock');
      expect(backend).toHaveProperty('forceUnlock');
      expect(backend).toHaveProperty('readLock');
      expect(backend).toHaveProperty('withLock');
    });
  });

  describe('loadState', () => {
    it('should delegate to stateManager.loadState with correct parameters', async () => {
      const mockState: StateFile = {
        version: CURRENT_STATE_VERSION,
        provider: 'aliyun',
        app: testApp,
        service: testService,
        stages: {},
        resources: {},
      };
      mockStateManager.loadState.mockResolvedValue(mockState);

      const backend = createLocalStateBackend(testApp, testService, testBaseDir);
      const result = await backend.loadState('aliyun', testApp, testService, 'dev');

      expect(mockStateManager.loadState).toHaveBeenCalledWith(
        'aliyun',
        testApp,
        testService,
        'dev',
        testBaseDir,
      );
      expect(result).toEqual(mockState);
    });

    it('should return state from stateManager', async () => {
      const mockResource: ResourceState = {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: { name: 'func1' },
        instances: [{ sid: 'resource-1', id: 'id1' }],
        lastUpdated: new Date().toISOString(),
        status: 'ready',
      };
      const mockState: StateFile = {
        version: CURRENT_STATE_VERSION,
        provider: 'aliyun',
        app: 'myapp',
        service: 'myservice',
        stages: {},
        resources: { func1: mockResource },
      };
      mockStateManager.loadState.mockResolvedValue(mockState);

      const backend = createLocalStateBackend(testApp, testService, testBaseDir);
      const result = await backend.loadState('aliyun', testApp, testService, 'prod');

      expect(result).toEqual(mockState);
    });
  });

  describe('saveState', () => {
    it('should delegate to stateManager.saveState with correct parameters', async () => {
      const mockResource: ResourceState = {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: { name: 'func1' },
        instances: [{ sid: 'resource-1', id: 'id1' }],
        lastUpdated: new Date().toISOString(),
        status: 'ready',
      };
      const mockState: StateFile = {
        version: CURRENT_STATE_VERSION,
        provider: 'aliyun',
        app: testApp,
        service: testService,
        stages: {},
        resources: { func1: mockResource },
      };
      mockStateManager.saveState.mockImplementation();

      const backend = createLocalStateBackend(testApp, testService, testBaseDir);
      await backend.saveState(mockState, testApp, testService, 'dev');

      expect(mockStateManager.saveState).toHaveBeenCalledWith(
        mockState,
        testApp,
        testService,
        'dev',
        testBaseDir,
      );
    });

    it('should save state without error', async () => {
      const mockState: StateFile = {
        version: CURRENT_STATE_VERSION,
        provider: 'aliyun',
        app: testApp,
        service: testService,
        stages: {},
        resources: {},
      };
      mockStateManager.saveState.mockImplementation();

      const backend = createLocalStateBackend(testApp, testService, testBaseDir);
      await expect(
        backend.saveState(mockState, testApp, testService, 'prod'),
      ).resolves.toBeUndefined();
    });
  });

  describe('acquireLock', () => {
    it('should acquire lock and return lock ID', async () => {
      const mockLockMeta: LockMetadata = {
        id: 'lock-123',
        user: 'user@host',
        processId: 1234,
        hostname: 'hostname',
        operation: 'deploy',
        acquiredAt: new Date().toISOString(),
        path: '/path/to/state',
      };
      mockLockManager.acquireLockInternal.mockResolvedValue(mockLockMeta);

      const backend = createLocalStateBackend(testApp, testService, testBaseDir);
      const result = await backend.acquireLock('deploy');

      expect(result).toBe('lock-123');
      expect(mockLockManager.acquireLockInternal).toHaveBeenCalledWith(
        '/test/dir/.serverlessinsight/state-test-app-test-service.json',
        'deploy',
        undefined,
      );
    });

    it('should pass lock options to lockManager', async () => {
      const mockLockMeta: LockMetadata = {
        id: 'lock-456',
        user: 'user@host',
        processId: 1234,
        hostname: 'hostname',
        operation: 'destroy',
        acquiredAt: new Date().toISOString(),
        path: '/path/to/state',
      };
      mockLockManager.acquireLockInternal.mockResolvedValue(mockLockMeta);

      const backend = createLocalStateBackend(testApp, testService, testBaseDir);
      const options: LockOptions = { timeout: 5000, retryDelay: 500 };
      const result = await backend.acquireLock('destroy', options);

      expect(result).toBe('lock-456');
      expect(mockLockManager.acquireLockInternal).toHaveBeenCalledWith(
        '/test/dir/.serverlessinsight/state-test-app-test-service.json',
        'destroy',
        options,
      );
    });
  });

  describe('releaseLock', () => {
    it('should release lock by ID', async () => {
      mockLockManager.releaseLockInternal.mockImplementation();

      const backend = createLocalStateBackend(testApp, testService, testBaseDir);
      await backend.releaseLock('lock-123');

      expect(mockLockManager.releaseLockInternal).toHaveBeenCalledWith(
        '/test/dir/.serverlessinsight/state-test-app-test-service.json',
        'lock-123',
      );
    });

    it('should not throw error when releasing non-existent lock', async () => {
      mockLockManager.releaseLockInternal.mockImplementation();

      const backend = createLocalStateBackend(testApp, testService, testBaseDir);
      await expect(backend.releaseLock('non-existent')).resolves.toBeUndefined();
    });
  });

  describe('forceUnlock', () => {
    it('should force unlock and return true when lock exists', async () => {
      mockLockManager.forceUnlock.mockResolvedValue(true);

      const backend = createLocalStateBackend(testApp, testService, testBaseDir);
      const result = await backend.forceUnlock('lock-123');

      expect(result).toBe(true);
      expect(mockLockManager.forceUnlock).toHaveBeenCalledWith(
        '/test/dir/.serverlessinsight/state-test-app-test-service.json',
        'lock-123',
      );
    });

    it('should force unlock and return false when lock does not exist', async () => {
      mockLockManager.forceUnlock.mockResolvedValue(false);

      const backend = createLocalStateBackend(testApp, testService, testBaseDir);
      const result = await backend.forceUnlock('non-existent');

      expect(result).toBe(false);
    });
  });

  describe('readLock', () => {
    it('should read lock metadata when lock exists', async () => {
      const mockLockMeta: LockMetadata = {
        id: 'lock-123',
        user: 'user@host',
        processId: 1234,
        hostname: 'hostname',
        operation: 'deploy',
        acquiredAt: new Date().toISOString(),
        path: '/path/to/state',
      };
      mockLockManager.readLockFileForCommand.mockResolvedValue(mockLockMeta);

      const backend = createLocalStateBackend(testApp, testService, testBaseDir);
      const result = await backend.readLock();

      expect(result).toEqual(mockLockMeta);
      expect(mockLockManager.readLockFileForCommand).toHaveBeenCalledWith(
        '/test/dir/.serverlessinsight/state-test-app-test-service.json',
      );
    });

    it('should return null when no lock exists', async () => {
      mockLockManager.readLockFileForCommand.mockResolvedValue(null);

      const backend = createLocalStateBackend(testApp, testService, testBaseDir);
      const result = await backend.readLock();

      expect(result).toBeNull();
    });
  });

  describe('withLock', () => {
    it('should execute function with lock acquisition and release', async () => {
      let executed = false;
      mockLockManager.withLock.mockImplementation(
        async (_path: string, _op: string, fn: () => Promise<unknown>) => fn(),
      );

      const backend = createLocalStateBackend(testApp, testService, testBaseDir);
      await backend.withLock('deploy', async () => {
        executed = true;
        return 'result';
      });

      expect(executed).toBe(true);
    });

    it('should return function result', async () => {
      mockLockManager.withLock.mockImplementation(
        async (_path: string, _op: string, fn: () => Promise<unknown>) => fn(),
      );

      const backend = createLocalStateBackend(testApp, testService, testBaseDir);
      const result = await backend.withLock('deploy', async () => {
        return 'test-result';
      });

      expect(result).toBe('test-result');
    });

    it('should pass lock options to withLock', async () => {
      mockLockManager.withLock.mockImplementation(
        async (_path: string, _op: string, fn: () => Promise<unknown>) => fn(),
      );

      const backend = createLocalStateBackend(testApp, testService, testBaseDir);
      const options: LockOptions = { timeout: 3000 };
      await backend.withLock('destroy', async () => 'ok', options);

      expect(mockLockManager.withLock).toHaveBeenCalledWith(
        '/test/dir/.serverlessinsight/state-test-app-test-service.json',
        'destroy',
        expect.any(Function),
        options,
      );
    });

    it('should propagate errors from function', async () => {
      mockLockManager.withLock.mockImplementation(
        async (_path: string, _op: string, fn: () => Promise<unknown>) => fn(),
      );

      const backend = createLocalStateBackend(testApp, testService, testBaseDir);
      await expect(
        backend.withLock('deploy', async () => {
          throw new Error('Function error');
        }),
      ).rejects.toThrow('Function error');
    });
  });
});
