jest.mock('../../../../src/lang', () => ({
  lang: { __: (key: string) => key },
}));

jest.mock('../../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

const mockApiClient = {
  get: jest.fn(),
  post: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
};

jest.mock('../../../../src/common/apiClient', () => ({
  createApiClient: jest.fn(() => mockApiClient),
}));

jest.mock('../../../../src/common/credentialStore', () => ({
  loadCredentials: jest.fn(),
  getConsoleUrl: jest.fn(),
}));

import { createSaasStateBackend } from '../../../../src/common/stateBackend/saasStateBackend';
import { loadCredentials, getConsoleUrl } from '../../../../src/common/credentialStore';
import type { StateBackend } from '../../../../src/common/stateBackend/types';
import type { StateFile } from '../../../../src/types';

describe('saasStateBackend', () => {
  let backend: StateBackend;

  const createBackend = () =>
    createSaasStateBackend({
      app: 'myapp',
      service: 'myservice',
    });

  beforeEach(() => {
    jest.clearAllMocks();
    (loadCredentials as jest.Mock).mockReturnValue({
      apiKey: 'si_test_testkey123456789012345678901234',
      consoleUrl: 'https://api.test.com',
      orgId: 'org-1',
    });
    (getConsoleUrl as jest.Mock).mockReturnValue('https://api.test.com');
    backend = createBackend();
  });

  describe('createSaasStateBackend', () => {
    it('should throw when no credentials are stored', () => {
      (loadCredentials as jest.Mock).mockReturnValue(null);

      expect(() => createBackend()).toThrow('SAAS_BACKEND_NO_CREDENTIALS');
    });
  });

  describe('loadState', () => {
    it('should provision deployment and return state from Console', async () => {
      mockApiClient.post.mockResolvedValueOnce({
        id: 'deploy-1',
        appId: 'app-1',
        serviceId: 'svc-1',
        status: 'active',
        isNewApp: false,
        isNewService: false,
      });
      mockApiClient.get.mockResolvedValueOnce({
        stateJson: {
          version: '3.0',
          provider: 'aliyun',
          app: 'myapp',
          service: 'myservice',
          stages: { dev: { resources: {} } },
          resources: {},
        },
      });

      const result = await backend.loadState('aliyun', 'myapp', 'myservice', 'dev');

      expect(mockApiClient.post).toHaveBeenCalledWith('api/v1/deployments/', {
        appName: 'myapp',
        serviceName: 'myservice',
        provider: 'aliyun',
        stage: 'dev',
        spec: { operation: 'init' },
        source: 'cli',
      });
      expect(mockApiClient.get).toHaveBeenCalledWith(
        'api/v1/apps/app-1/services/svc-1/state/current?stage=dev',
      );
      expect(result.version).toBe('3.0');
      expect(result).toEqual(
        expect.objectContaining({
          orgId: 'org-1',
          appId: 'app-1',
          serviceId: 'svc-1',
        }),
      );
    });

    it('should return default state when Console state fetch fails', async () => {
      mockApiClient.post.mockResolvedValueOnce({
        id: 'deploy-1',
        appId: 'app-1',
        serviceId: 'svc-1',
        status: 'active',
        isNewApp: false,
        isNewService: false,
      });
      mockApiClient.get.mockRejectedValueOnce(new Error('not found'));

      const result = await backend.loadState('aliyun', 'myapp', 'myservice', 'dev');

      expect(result.resources).toEqual({});
      expect(result).toEqual(
        expect.objectContaining({
          appId: 'app-1',
          serviceId: 'svc-1',
        }),
      );
    });

    it('should provision only once across calls', async () => {
      mockApiClient.post.mockResolvedValueOnce({
        id: 'deploy-1',
        appId: 'app-1',
        serviceId: 'svc-1',
        status: 'active',
        isNewApp: false,
        isNewService: false,
      });
      mockApiClient.get.mockResolvedValue({
        stateJson: {
          version: '3.0',
          provider: 'aliyun',
          app: 'myapp',
          service: 'myservice',
          stages: {},
          resources: {},
        },
      });

      await backend.loadState('aliyun', 'myapp', 'myservice', 'dev');
      await backend.loadState('aliyun', 'myapp', 'myservice', 'prod');

      expect(mockApiClient.post).toHaveBeenCalledTimes(1);
    });
  });

  describe('saveState', () => {
    it('should POST state/sync with correct payload', async () => {
      mockApiClient.post.mockResolvedValueOnce({
        id: 'deploy-1',
        appId: 'app-1',
        serviceId: 'svc-1',
        status: 'active',
        isNewApp: false,
        isNewService: false,
      });
      mockApiClient.post.mockResolvedValueOnce({});

      const state: StateFile = {
        version: '3.0',
        provider: 'aliyun',
        app: 'myapp',
        service: 'myservice',
        stages: {},
        resources: {
          func1: {
            mode: 'managed',
            region: 'cn-hk',
            definition: {},
            instances: [],
            lastUpdated: '',
          },
        },
      };

      await backend.saveState(state, 'myapp', 'myservice', 'dev');

      expect(mockApiClient.post).toHaveBeenLastCalledWith(
        'api/v1/apps/app-1/services/svc-1/state/sync',
        expect.objectContaining({
          appName: 'myapp',
          serviceName: 'myservice',
          stage: 'dev',
          resourceCount: 1,
        }),
      );
    });
  });

  describe('forceUnlock', () => {
    it('should return true when force-unlock succeeds', async () => {
      mockApiClient.post.mockResolvedValue({});

      const result = await backend.forceUnlock('deploy-1');

      expect(mockApiClient.post).toHaveBeenCalledWith(
        'api/v1/deployments/deploy-1/force-unlock',
        {},
      );
      expect(result).toBe(true);
    });

    it('should return false when force-unlock fails', async () => {
      mockApiClient.post.mockRejectedValue(new Error('failed'));

      const result = await backend.forceUnlock('deploy-1');

      expect(result).toBe(false);
    });
  });

  describe('readLock', () => {
    it('should return null before any loadState', async () => {
      const result = await backend.readLock();

      expect(result).toBeNull();
    });

    it('should return LockMetadata when an active deployment exists', async () => {
      mockApiClient.post.mockResolvedValueOnce({
        id: 'deploy-1',
        appId: 'app-1',
        serviceId: 'svc-1',
        status: 'active',
        isNewApp: false,
        isNewService: false,
      });
      mockApiClient.get.mockResolvedValueOnce({
        stateJson: {
          version: '3.0',
          provider: 'aliyun',
          app: 'myapp',
          service: 'myservice',
          stages: {},
          resources: {},
        },
      });
      mockApiClient.get.mockResolvedValueOnce([{ id: 'deploy-9', status: 'active' }]);

      await backend.loadState('aliyun', 'myapp', 'myservice', 'dev');
      const lock = await backend.readLock();

      expect(mockApiClient.get).toHaveBeenLastCalledWith(
        'api/v1/deployments/active?service_id=svc-1&stage=dev',
      );
      expect(lock).toEqual(
        expect.objectContaining({
          id: 'deploy-9',
          operation: 'deploy',
          user: 'Console',
        }),
      );
    });

    it('should return null when no active deployment exists', async () => {
      mockApiClient.post.mockResolvedValueOnce({
        id: 'deploy-1',
        appId: 'app-1',
        serviceId: 'svc-1',
        status: 'active',
        isNewApp: false,
        isNewService: false,
      });
      mockApiClient.get.mockResolvedValueOnce({
        stateJson: {
          version: '3.0',
          provider: 'aliyun',
          app: 'myapp',
          service: 'myservice',
          stages: {},
          resources: {},
        },
      });
      mockApiClient.get.mockResolvedValueOnce([]);

      await backend.loadState('aliyun', 'myapp', 'myservice', 'dev');
      const lock = await backend.readLock();

      expect(lock).toBeNull();
    });
  });

  describe('withLock', () => {
    it('should start phase, execute, and complete', async () => {
      mockApiClient.post.mockResolvedValueOnce({
        id: 'deploy-1',
        appId: 'app-1',
        serviceId: 'svc-1',
        status: 'active',
        isNewApp: false,
        isNewService: false,
      });
      mockApiClient.get.mockResolvedValueOnce({
        stateJson: {
          version: '3.0',
          provider: 'aliyun',
          app: 'myapp',
          service: 'myservice',
          stages: {},
          resources: {},
        },
      });
      mockApiClient.patch.mockResolvedValue({});

      await backend.loadState('aliyun', 'myapp', 'myservice', 'dev');

      const fn = jest.fn().mockResolvedValue('ok');
      const result = await backend.withLock('deploy', fn);

      expect(mockApiClient.patch).toHaveBeenCalledWith('api/v1/deployments/deploy-1', {
        phase: 'start',
      });
      expect(fn).toHaveBeenCalled();
      expect(mockApiClient.patch).toHaveBeenLastCalledWith(
        'api/v1/deployments/deploy-1',
        expect.objectContaining({ phase: 'complete', result: 'ok' }),
      );
      expect(result).toBe('ok');
    });

    it('should notify fail phase and rethrow when fn throws', async () => {
      mockApiClient.post.mockResolvedValueOnce({
        id: 'deploy-1',
        appId: 'app-1',
        serviceId: 'svc-1',
        status: 'active',
        isNewApp: false,
        isNewService: false,
      });
      mockApiClient.get.mockResolvedValueOnce({
        stateJson: {
          version: '3.0',
          provider: 'aliyun',
          app: 'myapp',
          service: 'myservice',
          stages: {},
          resources: {},
        },
      });
      mockApiClient.patch.mockResolvedValue({});

      await backend.loadState('aliyun', 'myapp', 'myservice', 'dev');

      const fn = jest.fn().mockRejectedValue(new Error('boom'));

      await expect(backend.withLock('deploy', fn)).rejects.toThrow('boom');

      expect(mockApiClient.patch).toHaveBeenLastCalledWith(
        'api/v1/deployments/deploy-1',
        expect.objectContaining({ phase: 'fail' }),
      );
    });

    it('should throw when loadState was never called', async () => {
      const fn = jest.fn().mockResolvedValue('ok');

      await expect(backend.withLock('deploy', fn)).rejects.toThrow('call loadState() first');
      expect(fn).not.toHaveBeenCalled();
    });
  });
});
