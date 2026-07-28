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

import { createSaasStateBackend } from '../../../../src/common/stateBackend/saasStateBackend';
import type { StateBackend } from '../../../../src/common/stateBackend/types';
import type { StateFile } from '../../../../src/types';

describe('saasStateBackend', () => {
  let backend: StateBackend;

  const createBackend = () =>
    createSaasStateBackend({
      apiKey: 'si_test_testkey123456789012345678901234',
      consoleUrl: 'https://api.test.com',
      orgId: 'org-1',
      app: 'myapp',
      service: 'myservice',
    });

  beforeEach(() => {
    jest.clearAllMocks();
    backend = createBackend();
  });

  describe('loadState', () => {
    it('should resolve IDs and return state from Console', async () => {
      mockApiClient.get
        .mockResolvedValueOnce([{ id: 'app-1', name: 'myapp' }])
        .mockResolvedValueOnce([{ id: 'svc-1', name: 'myservice' }])
        .mockResolvedValueOnce({
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
      expect(result.version).toBe('3.0');
      expect(mockApiClient.get).toHaveBeenCalledWith('/api/v1/apps');
    });

    it('should return empty state when Console returns 404', async () => {
      mockApiClient.get
        .mockResolvedValueOnce([{ id: 'app-1', name: 'myapp' }])
        .mockResolvedValueOnce([{ id: 'svc-1', name: 'myservice' }])
        .mockRejectedValueOnce(new Error('not found'));

      const result = await backend.loadState('aliyun', 'myapp', 'myservice', 'dev');
      expect(result.resources).toEqual({});
    });
  });

  describe('saveState', () => {
    it('should POST state/sync with correct payload', async () => {
      mockApiClient.get
        .mockResolvedValueOnce([{ id: 'app-1', name: 'myapp' }])
        .mockResolvedValueOnce([{ id: 'svc-1', name: 'myservice' }]);
      mockApiClient.post.mockResolvedValue({});

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
      expect(mockApiClient.post).toHaveBeenCalledWith(
        '/api/v1/apps/app-1/services/svc-1/state/sync',
        expect.objectContaining({
          appName: 'myapp',
          serviceName: 'myservice',
          stage: 'dev',
          resourceCount: 1,
        }),
      );
    });
  });

  describe('withLock', () => {
    it('should create deployment, start, execute, and complete', async () => {
      await backend.loadState('aliyun', 'myapp', 'myservice', 'dev');
      jest.clearAllMocks();

      mockApiClient.get
        .mockResolvedValueOnce([{ id: 'app-1', name: 'myapp' }])
        .mockResolvedValueOnce([{ id: 'svc-1', name: 'myservice' }]);

      mockApiClient.get
        .mockResolvedValueOnce([{ id: 'app-1', name: 'myapp' }])
        .mockResolvedValueOnce([{ id: 'svc-1', name: 'myservice' }]);
      mockApiClient.post.mockResolvedValue({ id: 'deploy-1' });
      mockApiClient.patch.mockResolvedValue({});

      const fn = jest.fn().mockResolvedValue('ok');
      const result = await backend.withLock('deploy', fn);

      expect(result).toBe('ok');
      expect(mockApiClient.post).toHaveBeenCalledWith(
        '/api/v1/apps/app-1/services/svc-1/deployments',
        expect.objectContaining({ stage: 'dev', source: 'cli' }),
      );
      expect(mockApiClient.patch).toHaveBeenCalledWith('/api/v1/apps/app-1/deployments/deploy-1', {
        phase: 'start',
      });
      expect(fn).toHaveBeenCalled();
    });
  });
});
