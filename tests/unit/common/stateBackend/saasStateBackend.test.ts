jest.mock('../../../../src/lang', () => ({
  lang: { __: (key: string) => key },
}));

jest.mock('../../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

// replayOrphanedEvents resolves the queue dir from the real homedir at module
// load — pin it to a throwaway directory so tests never touch the user's home.
jest.mock('node:os', () => {
  const actual = jest.requireActual<typeof import('node:os')>('node:os');
  const mocked = { ...actual, homedir: () => `${actual.tmpdir()}/si-saas-backend-test-home` };
  return { ...mocked, default: mocked };
});

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

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createSaasStateBackend } from '../../../../src/common/stateBackend/saasStateBackend';
import {
  loadCredentials,
  saveCredentials,
  getConsoleUrl,
} from '../../../../src/common/credentialStore';
import { logger } from '../../../../src/common/logger';
import { ApiError } from '../../../../src/common/apiClient';
import type { StateBackend } from '../../../../src/common/stateBackend/types';
import type { DeploymentScope } from '../../../../src/common/stateScope';
import type { StateFile } from '../../../../src/types';

describe('saasStateBackend (scope-bound, issue #280)', () => {
  const scope: DeploymentScope = {
    provider: 'aliyun',
    app: 'myapp',
    service: 'myservice',
    stage: 'dev',
    region: 'cn-hangzhou',
  };

  const createBackend = () => createSaasStateBackend({ scope });

  const deploymentResponse = (id = 'deploy-1') => ({
    id,
    appId: 'app-1',
    serviceId: 'svc-1',
    status: 'active',
    isNewApp: false,
    isNewService: false,
  });

  const emptyStateJson = () => ({
    version: '4.0',
    provider: 'aliyun',
    app: 'myapp',
    service: 'myservice',
    scope: { stage: 'dev', region: 'cn-hangzhou' },
    stages: { dev: { resources: {} } },
    resources: {},
  });

  /** Standard mutating happy path: capabilities probe, provision, state fetch. */
  const mockMutatingLoad = (stateJson: unknown = emptyStateJson()) => {
    mockApiClient.get.mockResolvedValueOnce({ regionalScope: true });
    mockApiClient.post.mockResolvedValueOnce(deploymentResponse());
    mockApiClient.get.mockResolvedValueOnce({ stateJson });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (loadCredentials as jest.Mock).mockReturnValue({
      apiKey: 'si_test_testkey123456789012345678901234',
      consoleUrl: 'https://api.test.com',
      orgId: 'org-1',
    });
    (getConsoleUrl as jest.Mock).mockReturnValue('https://api.test.com');
  });

  describe('createSaasStateBackend', () => {
    it('should throw when no credentials are stored', () => {
      (loadCredentials as jest.Mock).mockReturnValue(null);

      expect(() => createBackend()).toThrow('SAAS_BACKEND_NO_CREDENTIALS');
    });

    it('binds the normalized scope and exposes the backend contract', () => {
      const backend = createSaasStateBackend({
        scope: { ...scope, region: 'CN-Hangzhou' },
      });

      expect(backend.scope).toEqual({ ...scope, region: 'cn-hangzhou' });
      expect(backend.capabilities).toEqual({ conditionalCreate: true });
      expect(backend).toHaveProperty('loadState');
      expect(backend).toHaveProperty('saveState');
      expect(backend).toHaveProperty('readStateSource');
      expect(backend).toHaveProperty('probeWriteReadiness');
    });
  });

  describe('org declaration cross-check (D-6)', () => {
    it('should fail at creation when the declared org differs from the stored key org slug', () => {
      (loadCredentials as jest.Mock).mockReturnValue({
        apiKey: 'si_test_testkey123456789012345678901234',
        consoleUrl: 'https://api.test.com',
        orgId: 'org-1',
        orgSlug: 'other-org',
      });

      expect(() => createSaasStateBackend({ scope, declaredOrg: 'wentsen' })).toThrow(
        'SAAS_ORG_MISMATCH',
      );
    });

    it('should allow provisioning when the declared org matches the stored slug', async () => {
      (loadCredentials as jest.Mock).mockReturnValue({
        apiKey: 'si_test_testkey123456789012345678901234',
        consoleUrl: 'https://api.test.com',
        orgId: 'org-1',
        orgSlug: 'wentsen',
      });
      const local = createSaasStateBackend({ scope, declaredOrg: 'wentsen' });
      mockMutatingLoad();

      await local.loadState();

      expect(mockApiClient.post).toHaveBeenCalledWith(
        '/api/v1/deployments/',
        expect.objectContaining({
          appName: 'myapp',
          serviceName: 'myservice',
          provider: 'aliyun',
          stage: 'dev',
        }),
      );
      expect(mockApiClient.get).not.toHaveBeenCalledWith('/api/v1/auth/api-keys/validate');
    });

    it('should fetch the slug once and heal the credentials file when the stored creds predate it', async () => {
      (loadCredentials as jest.Mock).mockReturnValue({
        apiKey: 'si_test_testkey123456789012345678901234',
        consoleUrl: 'https://api.test.com',
        orgId: 'org-1',
      });
      const local = createSaasStateBackend({ scope, declaredOrg: 'wentsen' });
      // Call order: provision's validate roundtrip, capabilities probe, then state/current
      mockApiClient.get.mockResolvedValueOnce({ orgSlug: 'wentsen' });
      mockMutatingLoad();

      await local.loadState();

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
      const local = createSaasStateBackend({ scope, declaredOrg: 'wentsen' });
      mockApiClient.get.mockResolvedValueOnce({ orgSlug: 'other-org' });

      await expect(local.loadState()).rejects.toThrow('SAAS_ORG_MISMATCH');
      expect(mockApiClient.post).not.toHaveBeenCalled();
    });

    it('should not consult the org at all when no org is declared', async () => {
      mockMutatingLoad();

      await createBackend().loadState();

      expect(mockApiClient.get).not.toHaveBeenCalledWith('/api/v1/auth/api-keys/validate');
      expect(mockApiClient.post).toHaveBeenCalled();
    });

    it('should refuse state whose recorded org id differs from the key org (identity anchor)', async () => {
      // Slug-based local identity so no validate roundtrip is needed
      (loadCredentials as jest.Mock).mockReturnValue({
        apiKey: 'si_test_testkey123456789012345678901234',
        consoleUrl: 'https://api.test.com',
        orgId: 'org-1',
        orgSlug: 'wentsen',
      });
      const local = createSaasStateBackend({ scope });
      mockMutatingLoad({
        version: '3.0',
        provider: 'aliyun',
        app: 'myapp',
        service: 'myservice',
        orgId: 'org-2',
        stages: { dev: { resources: {} } },
        resources: {},
      });

      await expect(local.loadState()).rejects.toThrow('SAAS_STATE_ORG_MISMATCH');
    });

    it('should load state whose recorded org id matches the key org', async () => {
      (loadCredentials as jest.Mock).mockReturnValue({
        apiKey: 'si_test_testkey123456789012345678901234',
        consoleUrl: 'https://api.test.com',
        orgId: 'org-1',
        orgSlug: 'wentsen',
      });
      const local = createSaasStateBackend({ scope });
      mockMutatingLoad({
        version: '3.0',
        provider: 'aliyun',
        app: 'myapp',
        service: 'myservice',
        orgId: 'org-1',
        stages: { dev: { resources: {} } },
        resources: {},
      });

      const result = await local.loadState();

      expect(result.orgId).toBe('org-1');
    });

    it('should degrade open when the identity fetch fails (guardrail, not a gate)', async () => {
      (loadCredentials as jest.Mock).mockReturnValue({
        apiKey: 'si_test_testkey123456789012345678901234',
        consoleUrl: 'https://api.test.com',
        orgId: 'org-1',
      });
      const local = createSaasStateBackend({ scope, declaredOrg: 'wentsen' });
      mockApiClient.get.mockRejectedValueOnce(new Error('validate unreachable'));
      mockMutatingLoad();

      await local.loadState();

      // Unverifiable declaration → proceeds; the key still only writes its own org
      expect(mockApiClient.post).toHaveBeenCalled();
      expect(saveCredentials).not.toHaveBeenCalled();
    });

    it('should resolve the identity from validate when only an API key is available (no credentials file)', async () => {
      (loadCredentials as jest.Mock).mockReturnValue(null);
      const local = createSaasStateBackend(
        { scope, declaredOrg: 'wentsen' },
        { apiKey: 'si_test_testkey123456789012345678901234' },
      );
      // Call order: validate, capabilities probe, state/current (state carries
      // the org id so the anchor check reuses the cached identity)
      mockApiClient.get.mockResolvedValueOnce({ orgId: 'org-1', orgSlug: 'wentsen' });
      mockMutatingLoad({
        version: '3.0',
        provider: 'aliyun',
        app: 'myapp',
        service: 'myservice',
        orgId: 'org-1',
        stages: { dev: { resources: {} } },
        resources: {},
      });

      const result = await local.loadState();

      expect(saveCredentials).not.toHaveBeenCalled();
      expect(mockApiClient.post).toHaveBeenCalled();
      expect(result.orgId).toBe('org-1');
    });

    it('should keep the pre-existing org id when validate resolves a slug but no org id', async () => {
      (loadCredentials as jest.Mock).mockReturnValue({
        apiKey: 'si_test_testkey123456789012345678901234',
        consoleUrl: 'https://api.test.com',
      });
      const local = createSaasStateBackend({ scope, declaredOrg: 'wentsen' });
      // Call order: validate, capabilities probe, then state/current
      mockApiClient.get.mockResolvedValueOnce({ orgSlug: 'wentsen' });
      mockMutatingLoad();

      const result = await local.loadState();

      // The slug heals into the credentials file, but the state must not claim
      // an org id that was never verified — the D-6 anchor stays honest.
      expect(saveCredentials).toHaveBeenCalledWith(expect.objectContaining({ orgSlug: 'wentsen' }));
      expect(mockApiClient.post).toHaveBeenCalled();
      expect(result.orgId).toBe('');
    });

    it('should announce the credentials org when no org is declared', () => {
      (loadCredentials as jest.Mock).mockReturnValue({
        apiKey: 'si_test_testkey123456789012345678901234',
        consoleUrl: 'https://api.test.com',
        orgId: 'org-1',
        orgName: 'Wentsen',
      });
      createSaasStateBackend({ scope });

      expect(logger.info).toHaveBeenCalledWith('SAAS_ORG_FROM_CREDENTIALS');
    });
  });

  describe('regional scope protocol (issue #280)', () => {
    it('provisions with region, scope and scopeProtocol in the payload', async () => {
      mockMutatingLoad();

      await createBackend().loadState();

      expect(mockApiClient.post).toHaveBeenCalledWith('/api/v1/deployments/', {
        appName: 'myapp',
        serviceName: 'myservice',
        provider: 'aliyun',
        stage: 'dev',
        region: 'cn-hangzhou',
        scope: { stage: 'dev', region: 'cn-hangzhou' },
        scopeProtocol: 1,
        spec: { operation: 'init' },
        source: 'cli',
      });
    });

    it('probes /api/v1/capabilities before provisioning', async () => {
      mockMutatingLoad();

      await createBackend().loadState();

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/v1/capabilities');
    });

    it('refuses to provision when the server lacks the regional scope capability', async () => {
      mockApiClient.get.mockRejectedValueOnce(new ApiError('not found', 404));

      await expect(createBackend().loadState()).rejects.toThrow('SAAS_REGIONAL_SCOPE_UNSUPPORTED');
      expect(mockApiClient.post).not.toHaveBeenCalled();
    });

    it('refuses to provision when the capabilities probe reports 405', async () => {
      mockApiClient.get.mockRejectedValueOnce(new ApiError('method not allowed', 405));

      await expect(createBackend().loadState()).rejects.toThrow('SAAS_REGIONAL_SCOPE_UNSUPPORTED');
      expect(mockApiClient.post).not.toHaveBeenCalled();
    });

    it('rethrows unexpected capabilities probe failures instead of guessing capabilities', async () => {
      mockApiClient.get.mockRejectedValueOnce(new ApiError('upstream exploded', 500));

      // A network/5xx failure must not be read as "no regional scope" (which
      // would block writes) nor as "capabilities known" — it surfaces.
      await expect(createBackend().probeWriteReadiness()).rejects.toThrow('upstream exploded');
    });

    it('appends the region to the state fetch', async () => {
      mockMutatingLoad();

      await createBackend().loadState();

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/api/v1/apps/app-1/services/svc-1/state/current?stage=dev&region=cn-hangzhou',
      );
    });

    it('reports a scoped source when the returned document carries the matching scope', async () => {
      mockMutatingLoad(emptyStateJson());

      const backend = createBackend();
      await backend.loadState();

      expect(backend.readStateSource()).toBe('scoped');
    });

    it('reports a legacy source when the returned document predates the regional protocol', async () => {
      mockMutatingLoad({
        version: '3.0',
        provider: 'aliyun',
        app: 'myapp',
        service: 'myservice',
        stages: { dev: { resources: {} } },
        resources: {},
      });

      const backend = createBackend();
      await backend.loadState();

      expect(backend.readStateSource()).toBe('legacy');
    });

    it('rejects a returned document whose scope does not match the bound scope', async () => {
      mockMutatingLoad({
        ...emptyStateJson(),
        scope: { stage: 'dev', region: 'ap-southeast-1' },
      });

      await expect(createBackend().loadState()).rejects.toThrow('SAAS_STATE_SCOPE_MISMATCH');
    });
  });

  describe('loadState', () => {
    it('should provision deployment and return state from Console', async () => {
      mockMutatingLoad();

      const result = await createBackend().loadState();

      expect(result.version).toBe('4.0');
      expect(result).toEqual(
        expect.objectContaining({
          orgId: 'org-1',
          appId: 'app-1',
          serviceId: 'svc-1',
        }),
      );
    });

    it('should hydrate the resources projection from stages[stage]', async () => {
      mockMutatingLoad({
        ...emptyStateJson(),
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
      });

      const result = await createBackend().loadState();

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
      mockMutatingLoad({
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
      });

      const result = await createBackend().loadState();

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
      mockApiClient.get.mockResolvedValueOnce({ regionalScope: true });
      mockApiClient.post.mockResolvedValueOnce(deploymentResponse());
      mockApiClient.get.mockRejectedValueOnce(new ApiError('not found', 404));

      const result = await createBackend().loadState();

      expect(result.resources).toEqual({});
      expect(result).toEqual(
        expect.objectContaining({
          orgId: 'org-1',
          appId: 'app-1',
          serviceId: 'svc-1',
          scope: { stage: 'dev', region: 'cn-hangzhou' },
        }),
      );
    });

    it('surfaces non-404 fetch failures instead of assuming an empty state', async () => {
      mockApiClient.get.mockResolvedValueOnce({ regionalScope: true });
      mockApiClient.post.mockResolvedValueOnce(deploymentResponse());
      mockApiClient.get.mockRejectedValueOnce(new ApiError('upstream exploded', 500));

      // Treating network/5xx failures as "empty state" would make the next
      // plan propose full re-creation of live resources — it must throw.
      await expect(createBackend().loadState()).rejects.toThrow('upstream exploded');
    });

    it('should provision only once across calls', async () => {
      mockApiClient.get.mockResolvedValueOnce({ regionalScope: true });
      mockApiClient.post.mockResolvedValueOnce(deploymentResponse());
      mockApiClient.get.mockResolvedValue({ stateJson: emptyStateJson() });

      const backend = createBackend();
      await backend.loadState();
      await backend.loadState();

      expect(mockApiClient.post).toHaveBeenCalledTimes(1);
    });
  });

  describe('saveState', () => {
    const savedState: StateFile = {
      version: '4.0',
      provider: 'aliyun',
      app: 'myapp',
      service: 'myservice',
      serial: 5,
      lineage: 'lineage-1',
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

    it('should POST state/sync with the regional scope payload', async () => {
      mockMutatingLoad();
      mockApiClient.post.mockResolvedValueOnce({ serial: 6, lineage: 'lineage-1' });

      const backend = createBackend();
      await backend.loadState();
      await backend.saveState(savedState);

      expect(mockApiClient.post).toHaveBeenLastCalledWith(
        '/api/v1/apps/app-1/services/svc-1/state/sync',
        expect.objectContaining({
          appName: 'myapp',
          serviceName: 'myservice',
          provider: 'aliyun',
          stage: 'dev',
          region: 'cn-hangzhou',
          scope: { stage: 'dev', region: 'cn-hangzhou' },
          scopeProtocol: 1,
          baseSerial: 5,
          baseLineage: 'lineage-1',
          idempotencyKey: expect.any(String),
          resourceCount: 1,
        }),
      );
    });

    it('projects the runtime resources into the synced stage document', async () => {
      mockMutatingLoad();
      mockApiClient.post.mockResolvedValueOnce({ serial: 6, lineage: 'lineage-1' });

      const backend = createBackend();
      await backend.loadState();
      await backend.saveState(savedState);

      const syncPayload = mockApiClient.post.mock.calls.find(
        (call) => call[0] === '/api/v1/apps/app-1/services/svc-1/state/sync',
      )?.[1] as { stateJson: Record<string, unknown> };
      expect(syncPayload.stateJson.resources).toBeUndefined();
      expect(syncPayload.stateJson.scope).toEqual({ stage: 'dev', region: 'cn-hangzhou' });
      expect(syncPayload.stateJson.stages).toEqual({
        dev: { resources: savedState.resources },
      });
    });

    it('refuses writes in read-only mode', async () => {
      const backend = createSaasStateBackend(
        { scope },
        { apiKey: 'si_test_key', mode: 'read-only' },
      );

      await expect(backend.saveState(savedState)).rejects.toThrow('SAAS_READ_ONLY_WRITE_REFUSED');
      expect(mockApiClient.post).not.toHaveBeenCalled();
    });

    it('refuses a save whose identity differs from the bound scope before any HTTP call', async () => {
      const backend = createBackend();

      await expect(backend.saveState({ ...savedState, app: 'other-app' })).rejects.toThrow(
        'SAAS_STATE_SCOPE_MISMATCH',
      );
      expect(mockApiClient.get).not.toHaveBeenCalled();
      expect(mockApiClient.post).not.toHaveBeenCalled();
    });

    it('refuses a save when the server lacks the regional scope capability', async () => {
      mockApiClient.get.mockRejectedValueOnce(new ApiError('not found', 404));

      await expect(createBackend().saveState(savedState)).rejects.toThrow(
        'SAAS_REGIONAL_SCOPE_UNSUPPORTED',
      );
      expect(mockApiClient.post).not.toHaveBeenCalled();
    });

    describe('idempotency and base serial (issue #280 §4)', () => {
      const syncPayloads = (): Array<Record<string, unknown>> =>
        mockApiClient.post.mock.calls
          .filter((call) => call[0] === '/api/v1/apps/app-1/services/svc-1/state/sync')
          .map((call) => call[1] as Record<string, unknown>);

      it('derives baseSerial from the loaded state serial and advances it across saves', async () => {
        mockMutatingLoad({ ...emptyStateJson(), serial: 7 });
        mockApiClient.post
          .mockResolvedValueOnce({ serial: 8, lineage: 'lineage-1' })
          .mockResolvedValueOnce({ serial: 9, lineage: 'lineage-1' });
        const backend = createBackend();
        await backend.loadState();

        await backend.saveState(savedState);
        await backend.saveState({
          ...savedState,
          resources: {
            ...savedState.resources,
            func2: {
              mode: 'managed',
              region: 'cn-hk',
              definition: {},
              instances: [],
              lastUpdated: '',
            },
          },
        });

        const payloads = syncPayloads();
        expect(payloads).toHaveLength(2);
        // The first save bases on the revision acknowledged by the load...
        expect(payloads[0].baseSerial).toBe(7);
        // ...and the acknowledged serial advances with every confirmed save.
        expect(payloads[1].baseSerial).toBe(8);
        // Distinct incremental content → distinct idempotency keys.
        expect(payloads[0].idempotencyKey).not.toBe(payloads[1].idempotencyKey);
      });

      it('uses the returned revision when the server deduplicates an identical save', async () => {
        mockMutatingLoad({ ...emptyStateJson(), serial: 3, lineage: 'lineage-1' });
        mockApiClient.post
          .mockResolvedValueOnce({ serial: 4, lineage: 'lineage-1' })
          .mockResolvedValueOnce({ serial: 4, lineage: 'lineage-1' })
          .mockResolvedValueOnce({ serial: 5, lineage: 'lineage-1' });
        const backend = createBackend();
        await backend.loadState();
        await backend.saveState(savedState);
        await backend.saveState(savedState);
        await backend.saveState({ ...savedState, resources: {} });
        const payloads = syncPayloads();
        expect(payloads.map((payload) => payload.baseSerial)).toEqual([3, 4, 4]);
        expect(payloads[1].idempotencyKey).not.toBe(payloads[0].idempotencyKey);
        expect(payloads[2].idempotencyKey).not.toBe(payloads[1].idempotencyKey);
      });
      it('retries a lost response with the same key and continues from the actual deduplicated revision', async () => {
        mockMutatingLoad({ ...emptyStateJson(), serial: 5, lineage: 'lineage-1' });
        const backend = createBackend();
        await backend.loadState();
        let revision = 5;
        let lost = true;
        const acknowledgments = new Map<string, { serial: number; lineage: string }>();
        mockApiClient.post.mockImplementation(async (_url, body) => {
          if (acknowledgments.has(body.idempotencyKey))
            return acknowledgments.get(body.idempotencyKey);
          if (body.baseSerial !== revision) throw new Error('stale revision');
          revision += 1;
          const ack = { serial: revision, lineage: 'lineage-1' };
          acknowledgments.set(body.idempotencyKey, ack);
          if (lost) {
            lost = false;
            throw new Error('lost response');
          }
          return ack;
        });
        await expect(backend.saveState(savedState)).rejects.toThrow('lost response');
        await backend.saveState(savedState);
        await backend.saveState({ ...savedState, resources: {} });
        const calls = syncPayloads();
        expect(calls.map((call) => call.baseSerial)).toEqual([5, 5, 6]);
        expect(calls[0].idempotencyKey).toBe(calls[1].idempotencyKey);
        expect(revision).toBe(7);
      });

      it('requires valid server acknowledgments and learns the assigned lineage of a new deployment', async () => {
        mockMutatingLoad();
        const backend = createBackend();
        await backend.loadState();
        const state = { ...savedState, serial: undefined, lineage: undefined };
        mockApiClient.post.mockResolvedValueOnce({});
        await expect(backend.saveState(state)).rejects.toThrow('SAAS_STATE_ACK_INVALID');
        mockApiClient.post
          .mockResolvedValueOnce({ stateJson: { serial: 1, lineage: 'assigned' } })
          .mockResolvedValueOnce({ serial: 2, lineage: 'assigned' });
        await backend.saveState(state);
        await backend.saveState({ ...state, resources: {} });
        expect(syncPayloads().at(-1)).toMatchObject({ baseSerial: 1, baseLineage: 'assigned' });
      });
    });
  });

  describe('read-only identity resolution (issue #280 §4)', () => {
    const readOnlyBackend = () =>
      createSaasStateBackend(
        { scope },
        { apiKey: 'si_test_testkey123456789012345678901234', mode: 'read-only' },
      );

    it('resolves identity via migrate-targets without posting a deployment', async () => {
      mockApiClient.get.mockResolvedValueOnce({
        app: { name: 'myapp', exists: true, id: 'app-1' },
        service: { name: 'myservice', exists: true, id: 'svc-1', provider: 'aliyun' },
        stages: [{ name: 'dev', registered: true, hasState: true, latestVersion: null }],
      });
      mockApiClient.get.mockResolvedValueOnce({ stateJson: emptyStateJson() });

      const backend = readOnlyBackend();
      const result = await backend.loadState();

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/api/v1/state/migrate/targets?app_name=myapp&service_name=myservice&stages=dev',
      );
      expect(mockApiClient.post).not.toHaveBeenCalled();
      expect(result).toEqual(expect.objectContaining({ appId: 'app-1', serviceId: 'svc-1' }));
    });

    it('returns empty state without creating records when app/service do not exist', async () => {
      mockApiClient.get.mockResolvedValueOnce({
        app: { name: 'myapp', exists: false, id: null },
        service: { name: 'myservice', exists: false, id: null, provider: null },
        stages: [],
      });

      const backend = readOnlyBackend();
      const result = await backend.loadState();

      expect(result.resources).toEqual({});
      expect(backend.readStateSource()).toBe('empty');
      expect(mockApiClient.post).not.toHaveBeenCalled();
    });
  });

  describe('probeWriteReadiness', () => {
    it('is not ready when the server lacks the regional scope capability', async () => {
      mockApiClient.get.mockRejectedValueOnce(new ApiError('not found', 404));

      const readiness = await createBackend().probeWriteReadiness();

      expect(readiness.ready).toBe(false);
      expect(readiness.reason).toBe('SAAS_REGIONAL_SCOPE_UNSUPPORTED');
    });

    it('blocks writes while the resolved state is an unscoped legacy aggregate', async () => {
      mockMutatingLoad({
        version: '3.0',
        provider: 'aliyun',
        app: 'myapp',
        service: 'myservice',
        stages: { dev: { resources: { func1: { mode: 'managed', instances: [] } } } },
        resources: {},
      });

      const backend = createBackend();
      await backend.loadState();
      const readiness = await backend.probeWriteReadiness();

      expect(readiness.ready).toBe(false);
      expect(readiness.source).toBe('legacy');
      expect(readiness.reason).toBe('SAAS_WRITE_BLOCKED_UNSCOPED_STATE');
    });

    it('is ready for a scoped regional state', async () => {
      mockMutatingLoad(emptyStateJson());

      const backend = createBackend();
      await backend.loadState();
      const readiness = await backend.probeWriteReadiness();

      expect(readiness.ready).toBe(true);
      expect(readiness.source).toBe('scoped');
    });
  });

  describe('forceUnlock', () => {
    it('should throw a web-console hint (SaaS force-unlock is not supported via CLI)', async () => {
      const backend = createBackend();

      await expect(backend.forceUnlock('deploy-1')).rejects.toThrow(
        'SAAS_FORCE_UNLOCK_NOT_SUPPORTED',
      );
      expect(mockApiClient.post).not.toHaveBeenCalled();
    });
  });

  describe('acquireLock', () => {
    it('should return the SaaS lock placeholder', async () => {
      await expect(createBackend().acquireLock('deploy')).resolves.toBe('saas-lock-placeholder');
    });
  });

  describe('readLock', () => {
    it('should return null before any loadState', async () => {
      const result = await createBackend().readLock();

      expect(result).toBeNull();
    });

    it('should return LockMetadata when an active deployment exists', async () => {
      mockMutatingLoad();
      mockApiClient.get.mockResolvedValueOnce([{ id: 'deploy-9', status: 'active' }]);

      const backend = createBackend();
      await backend.loadState();
      const lock = await backend.readLock();

      expect(mockApiClient.get).toHaveBeenLastCalledWith(
        '/api/v1/deployments/active?service_id=svc-1&stage=dev&region=cn-hangzhou',
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
      mockMutatingLoad();
      mockApiClient.get.mockResolvedValueOnce([]);

      const backend = createBackend();
      await backend.loadState();
      const lock = await backend.readLock();

      expect(lock).toBeNull();
    });

    it('should return null when the active deployment lookup fails', async () => {
      mockMutatingLoad();
      mockApiClient.get.mockRejectedValueOnce(new Error('service unavailable'));

      const backend = createBackend();
      await backend.loadState();

      await expect(backend.readLock()).resolves.toBeNull();
    });
  });

  describe('withLock', () => {
    it('should start phase with the regional scope, execute, and complete', async () => {
      mockMutatingLoad();
      mockApiClient.patch.mockResolvedValue({});

      const backend = createBackend();
      await backend.loadState();

      const fn = jest.fn().mockResolvedValue('ok');
      const result = await backend.withLock('deploy', fn);

      expect(mockApiClient.patch).toHaveBeenCalledWith('/api/v1/deployments/deploy-1', {
        phase: 'start',
        region: 'cn-hangzhou',
        scope: { stage: 'dev', region: 'cn-hangzhou' },
        scopeProtocol: 1,
      });
      expect(fn).toHaveBeenCalled();
      expect(mockApiClient.patch).toHaveBeenCalledWith(
        '/api/v1/deployments/deploy-1',
        expect.objectContaining({ phase: 'complete', result: 'ok' }),
      );
      expect(result).toBe('ok');
    });

    it('should forward stateJson/plan/contentHash when fn returns a deployment summary', async () => {
      mockMutatingLoad();
      mockApiClient.patch.mockResolvedValue({});

      const backend = createBackend();
      await backend.loadState();

      const summary = {
        plan: { items: [{ logicalId: 'functions.f', action: 'create' }] },
        stateJson: { version: '4.0', resources: { 'functions.f': {} } },
        contentHash: 'abc123',
        resourceCount: 1,
      };
      const result = await backend.withLock('deploy', jest.fn().mockResolvedValue(summary));

      expect(mockApiClient.patch).toHaveBeenCalledWith('/api/v1/deployments/deploy-1', {
        phase: 'complete',
        region: 'cn-hangzhou',
        result: null,
        stateJson: summary.stateJson,
        contentHash: 'abc123',
        resourceCount: 1,
        plan: summary.plan,
      });
      expect(result).toBe(summary);
    });

    it('should notify fail phase and rethrow when fn throws', async () => {
      mockMutatingLoad();
      mockApiClient.patch.mockResolvedValue({});

      const backend = createBackend();
      await backend.loadState();

      const fn = jest.fn().mockRejectedValue(new Error('boom'));

      await expect(backend.withLock('deploy', fn)).rejects.toThrow('boom');

      expect(mockApiClient.patch).toHaveBeenCalledWith(
        '/api/v1/deployments/deploy-1',
        expect.objectContaining({ phase: 'fail', region: 'cn-hangzhou' }),
      );
    });

    it('should forward plan/stateJson/contentHash when the failed fn attached them', async () => {
      mockMutatingLoad();
      mockApiClient.patch.mockResolvedValue({});

      const backend = createBackend();
      await backend.loadState();

      const failure = new Error('CreateFunction failed') as Error & {
        plan?: { items: Array<unknown> };
        stateJson?: Record<string, unknown>;
      };
      failure.plan = { items: [{ logicalId: 'functions.fn', action: 'create' }] };
      failure.stateJson = {
        version: '4.0',
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
      const backend = createBackend();
      const fn = jest.fn().mockResolvedValue('ok');

      await expect(backend.withLock('deploy', fn)).rejects.toThrow('SAAS_BACKEND_NO_DEPLOYMENT');
      expect(fn).not.toHaveBeenCalled();
    });

    it('should throw when provisioning did not produce a deployment', async () => {
      mockApiClient.get.mockResolvedValueOnce({ regionalScope: true });
      mockApiClient.post.mockResolvedValueOnce(deploymentResponse(''));
      mockApiClient.get.mockResolvedValueOnce({ stateJson: emptyStateJson() });

      const backend = createBackend();
      await backend.loadState();

      await expect(backend.withLock('deploy', jest.fn())).rejects.toThrow(
        'SAAS_BACKEND_NO_DEPLOYMENT',
      );
    });

    it('reportEvent sends a typed event via PATCH phase:event', async () => {
      mockMutatingLoad();
      mockApiClient.patch.mockResolvedValue({});

      const backend = createBackend();
      await backend.loadState();

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
      const backend = createBackend();
      await expect(backend.replayOrphanedEvents?.()).resolves.toBeUndefined();
    });

    it('replays orphaned queue files through the deployment recorded in each event', async () => {
      const queueDir = path.join(os.homedir(), '.serverlessinsight', 'event-queue');
      fs.mkdirSync(queueDir, { recursive: true });
      fs.writeFileSync(
        path.join(queueDir, 'deploy-old.jsonl'),
        `${JSON.stringify({ type: 'resource_post', deploymentId: 'deploy-42', sequence: 3 })}\n`,
        'utf-8',
      );
      // A batch whose first event carries no deploymentId cannot be routed —
      // it is dropped without an HTTP call.
      fs.writeFileSync(
        path.join(queueDir, 'anonymous.jsonl'),
        `${JSON.stringify({ type: 'resource_post', sequence: 4 })}\n`,
        'utf-8',
      );
      mockApiClient.patch.mockResolvedValue({});

      try {
        const backend = createBackend();
        await backend.replayOrphanedEvents?.();

        expect(mockApiClient.patch).toHaveBeenCalledTimes(1);
        expect(mockApiClient.patch).toHaveBeenCalledWith('/api/v1/deployments/deploy-42', {
          phase: 'event',
          events: [{ type: 'resource_post', deploymentId: 'deploy-42', sequence: 3 }],
        });
        expect(fs.existsSync(path.join(queueDir, 'deploy-old.jsonl'))).toBe(false);
        expect(fs.existsSync(path.join(queueDir, 'anonymous.jsonl'))).toBe(false);
      } finally {
        fs.rmSync(queueDir, { recursive: true, force: true });
      }
    });
  });
});
