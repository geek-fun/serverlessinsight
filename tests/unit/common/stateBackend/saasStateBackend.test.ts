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

jest.mock('../../../../src/common/apiClient', () => {
  class MockApiError extends Error {
    status: number;

    constructor(message: string, status: number) {
      super(message);
      this.name = 'ApiError';
      this.status = status;
    }
  }
  return {
    createApiClient: jest.fn(() => mockApiClient),
    ApiError: MockApiError,
  };
});

jest.mock('../../../../src/common/credentialStore', () => ({
  loadCredentials: jest.fn(),
  getConsoleUrl: jest.fn(),
  saveCredentials: jest.fn(),
}));

import { createSaasStateBackend } from '../../../../src/common/stateBackend/saasStateBackend';
import {
  loadCredentials,
  saveCredentials,
  getConsoleUrl,
} from '../../../../src/common/credentialStore';
import { ApiError } from '../../../../src/common/apiClient';
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

  describe('org declaration cross-check (D-6)', () => {
    const provisionOnce = () => {
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
    };

    it('should fail at creation when the declared org differs from the stored key org slug', () => {
      (loadCredentials as jest.Mock).mockReturnValue({
        apiKey: 'si_test_testkey123456789012345678901234',
        consoleUrl: 'https://api.test.com',
        orgId: 'org-1',
        orgSlug: 'other-org',
      });

      expect(() =>
        createSaasStateBackend({ app: 'myapp', service: 'myservice', declaredOrg: 'wentsen' }),
      ).toThrow('SAAS_ORG_MISMATCH');
    });

    it('should allow provisioning when the declared org matches the stored slug', async () => {
      (loadCredentials as jest.Mock).mockReturnValue({
        apiKey: 'si_test_testkey123456789012345678901234',
        consoleUrl: 'https://api.test.com',
        orgId: 'org-1',
        orgSlug: 'wentsen',
      });
      const local = createSaasStateBackend({
        app: 'myapp',
        service: 'myservice',
        declaredOrg: 'wentsen',
      });
      provisionOnce();

      await local.loadState('aliyun', 'myapp', 'myservice', 'dev');

      expect(mockApiClient.post).toHaveBeenCalledWith('/api/v1/deployments/', {
        appName: 'myapp',
        serviceName: 'myservice',
        provider: 'aliyun',
        stage: 'dev',
        spec: { operation: 'init' },
        source: 'cli',
      });
    });

    it('should fetch the slug once and heal the credentials file when the stored creds predate it', async () => {
      (loadCredentials as jest.Mock).mockReturnValue({
        apiKey: 'si_test_testkey123456789012345678901234',
        consoleUrl: 'https://api.test.com',
        orgId: 'org-1',
      });
      const local = createSaasStateBackend({
        app: 'myapp',
        service: 'myservice',
        declaredOrg: 'wentsen',
      });
      // Call order: provision's validate roundtrip first, then state/current
      mockApiClient.get.mockResolvedValueOnce({ orgSlug: 'wentsen' });
      provisionOnce();

      await local.loadState('aliyun', 'myapp', 'myservice', 'dev');

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/v1/auth/api-keys/validate');
      expect(saveCredentials).toHaveBeenCalledWith(
        expect.objectContaining({ orgId: 'org-1', orgSlug: 'wentsen' }),
      );
      expect(mockApiClient.post).toHaveBeenCalled();
    });

    it('should refuse provisioning when the validate roundtrip reveals a different org', async () => {
      (loadCredentials as jest.Mock).mockReturnValue({
        apiKey: 'si_test_testkey123456789012345678901234',
        consoleUrl: 'https://api.test.com',
        orgId: 'org-1',
      });
      const local = createSaasStateBackend({
        app: 'myapp',
        service: 'myservice',
        declaredOrg: 'wentsen',
      });
      mockApiClient.get.mockResolvedValueOnce({ orgSlug: 'other-org' });

      await expect(local.loadState('aliyun', 'myapp', 'myservice', 'dev')).rejects.toThrow(
        'SAAS_ORG_MISMATCH',
      );
      expect(mockApiClient.post).not.toHaveBeenCalled();
    });

    it('should not consult the org at all when no org is declared', async () => {
      provisionOnce();

      await backend.loadState('aliyun', 'myapp', 'myservice', 'dev');

      expect(mockApiClient.get).not.toHaveBeenCalledWith('/api/v1/auth/api-keys/validate');
      expect(mockApiClient.post).toHaveBeenCalled();
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

    it('should hydrate the resources projection from stages[stage]', async () => {
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
          stages: {
            dev: {
              resources: {
                func1: {
                  mode: 'managed',
                  region: 'cn-hk',
                  definition: {},
                  instances: [],
                  lastUpdated: '',
                },
              },
            },
          },
        },
      });

      const result = await backend.loadState('aliyun', 'myapp', 'myservice', 'dev');

      expect(result.resources).toEqual({
        func1: {
          mode: 'managed',
          region: 'cn-hk',
          definition: {},
          instances: [],
          lastUpdated: '',
        },
      });
    });

    it('should fall back to the legacy top-level resources when stages is empty', async () => {
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
          resources: {
            func1: {
              mode: 'managed',
              region: 'cn-hk',
              definition: {},
              instances: [],
              lastUpdated: '',
            },
          },
        },
      });

      const result = await backend.loadState('aliyun', 'myapp', 'myservice', 'dev');

      expect(result.resources).toEqual({
        func1: {
          mode: 'managed',
          region: 'cn-hk',
          definition: {},
          instances: [],
          lastUpdated: '',
        },
      });
    });

    it('returns default state only when Console reports 404 (no state yet)', async () => {
      mockApiClient.post.mockResolvedValueOnce({
        id: 'deploy-1',
        appId: 'app-1',
        serviceId: 'svc-1',
        status: 'active',
        isNewApp: false,
        isNewService: false,
      });
      mockApiClient.get.mockRejectedValueOnce(new ApiError('not found', 404));

      const result = await backend.loadState('aliyun', 'myapp', 'myservice', 'dev');

      expect(result.resources).toEqual({});
      expect(result).toEqual(
        expect.objectContaining({
          appId: 'app-1',
          serviceId: 'svc-1',
        }),
      );
    });

    it('surfaces non-404 fetch failures instead of assuming an empty state', async () => {
      mockApiClient.post.mockResolvedValueOnce({
        id: 'deploy-1',
        appId: 'app-1',
        serviceId: 'svc-1',
        status: 'active',
        isNewApp: false,
        isNewService: false,
      });
      mockApiClient.get.mockRejectedValueOnce(new ApiError('upstream exploded', 500));

      // Treating network/5xx failures as "empty state" would make the next
      // plan propose full re-creation of live resources — it must throw.
      await expect(backend.loadState('aliyun', 'myapp', 'myservice', 'dev')).rejects.toThrow(
        'upstream exploded',
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

      const syncPayload = mockApiClient.post.mock.calls.find(
        (call) => call[0] === '/api/v1/apps/app-1/services/svc-1/state/sync',
      )?.[1] as { stateJson: Record<string, unknown> };
      expect(syncPayload.stateJson.resources).toBeUndefined();
      expect(syncPayload.stateJson.stages).toEqual({
        dev: { resources: state.resources },
      });
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

  describe('acquireLock', () => {
    it('should return the SaaS lock placeholder', async () => {
      await expect(backend.acquireLock('deploy')).resolves.toBe('saas-lock-placeholder');
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

    it('should return null when the active deployment lookup fails', async () => {
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
      mockApiClient.get.mockRejectedValueOnce(new Error('service unavailable'));

      await backend.loadState('aliyun', 'myapp', 'myservice', 'dev');

      await expect(backend.readLock()).resolves.toBeNull();
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

      await expect(backend.withLock('deploy', fn)).rejects.toThrow('SAAS_BACKEND_SET_STAGE_FIRST');
      expect(fn).not.toHaveBeenCalled();
    });

    it('should throw when provisioning did not produce a deployment', async () => {
      mockApiClient.post.mockResolvedValueOnce({
        id: '',
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

      await backend.loadState('aliyun', 'myapp', 'myservice', 'dev');

      await expect(backend.withLock('deploy', jest.fn())).rejects.toThrow(
        'SAAS_BACKEND_NO_DEPLOYMENT',
      );
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

    it('should replay orphaned event queues without throwing', async () => {
      await expect(backend.replayOrphanedEvents?.()).resolves.toBeUndefined();
    });
  });
});
