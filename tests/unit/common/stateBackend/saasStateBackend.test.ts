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

      expect(mockApiClient.post).toHaveBeenCalledWith('/api/v1/deployments/', {
        appName: 'myapp',
        serviceName: 'myservice',
        provider: 'aliyun',
        stage: 'dev',
        spec: { operation: 'init' },
        source: 'cli',
      });
      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/api/v1/apps/app-1/services/svc-1/state/current?stage=dev',
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

  describe('forceUnlock', () => {
    it('should throw a web-console hint (SaaS force-unlock is not supported via CLI)', async () => {
      await expect(backend.forceUnlock('deploy-1')).rejects.toThrow(
        'SAAS_FORCE_UNLOCK_NOT_SUPPORTED',
      );
      expect(mockApiClient.post).not.toHaveBeenCalled();
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
        '/api/v1/deployments/active?service_id=svc-1&stage=dev',
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

      expect(mockApiClient.patch).toHaveBeenCalledWith('/api/v1/deployments/deploy-1', {
        phase: 'start',
      });
      expect(fn).toHaveBeenCalled();
      expect(mockApiClient.patch).toHaveBeenCalledWith(
        '/api/v1/deployments/deploy-1',
        expect.objectContaining({ phase: 'complete', result: 'ok' }),
      );
      expect(result).toBe('ok');
    });

    it('should forward stateJson/plan/contentHash when fn returns a deployment summary', async () => {
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

      const summary = {
        plan: { items: [{ logicalId: 'functions.f', action: 'create' }] },
        stateJson: { version: '3.0', resources: { 'functions.f': {} } },
        contentHash: 'abc123',
        resourceCount: 1,
      };
      const result = await backend.withLock('deploy', jest.fn().mockResolvedValue(summary));

      expect(mockApiClient.patch).toHaveBeenCalledWith('/api/v1/deployments/deploy-1', {
        phase: 'complete',
        result: null,
        stateJson: summary.stateJson,
        contentHash: 'abc123',
        resourceCount: 1,
        plan: summary.plan,
      });
      expect(result).toBe(summary);
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

      expect(mockApiClient.patch).toHaveBeenCalledWith(
        '/api/v1/deployments/deploy-1',
        expect.objectContaining({ phase: 'fail' }),
      );
    });

    it('should forward plan/stateJson/contentHash when the failed fn attached them', async () => {
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
          resources: { 'functions.fn': { mode: 'managed', instances: [] } },
        },
      });
      mockApiClient.patch.mockResolvedValue({});

      await backend.loadState('aliyun', 'myapp', 'myservice', 'dev');

      const failure = new Error('CreateFunction failed') as Error & {
        plan?: { items: Array<unknown> };
        stateJson?: Record<string, unknown>;
      };
      failure.plan = { items: [{ logicalId: 'functions.fn', action: 'create' }] };
      failure.stateJson = {
        version: '3.0',
        provider: 'aliyun',
        app: 'myapp',
        service: 'myservice',
        stages: {},
        resources: { 'functions.fn': { mode: 'managed', instances: [] } },
      };

      await expect(backend.withLock('deploy', () => Promise.reject(failure))).rejects.toThrow(
        'CreateFunction failed',
      );

      const failCall = mockApiClient.patch.mock.calls.find(
        (c) => (c[1] as { phase?: string }).phase === 'fail',
      );
      expect(failCall).toBeDefined();
      const payload = failCall![1];
      expect(payload).toEqual(
        expect.objectContaining({
          phase: 'fail',
          error: { message: 'CreateFunction failed' },
          plan: { items: [{ logicalId: 'functions.fn', action: 'create' }] },
          stateJson: expect.any(Object),
          contentHash: expect.any(String),
          resourceCount: 1,
        }),
      );
    });

    it('should throw when loadState was never called', async () => {
      const fn = jest.fn().mockResolvedValue('ok');

      await expect(backend.withLock('deploy', fn)).rejects.toThrow('call loadState() first');
      expect(fn).not.toHaveBeenCalled();
    });

    it('reportEvent sends a typed event via PATCH phase:event', async () => {
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

      const report = (backend as StateBackend & { reportEvent?: (e: unknown) => Promise<void> })
        .reportEvent;
      expect(report).toBeDefined();
      await report!({
        type: 'resource_pre',
        logicalId: 'functions.fn',
        action: 'create',
        sequence: 1,
      });

      // reportEvent is fire-and-forget (batch queue) — flush on exit drains it
      const flush = (backend as StateBackend & { flushEvents?: () => Promise<void> }).flushEvents;
      if (flush) await flush();

      expect(mockApiClient.patch).toHaveBeenCalledWith(
        '/api/v1/deployments/deploy-1',
        expect.objectContaining({
          phase: 'event',
          events: expect.arrayContaining([
            expect.objectContaining({
              type: 'resource_pre',
              logicalId: 'functions.fn',
              action: 'create',
              sequence: 1,
            }),
          ]),
        }),
      );
    });
  });
});
