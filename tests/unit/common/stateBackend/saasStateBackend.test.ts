jest.mock('node:fs', () =>
  jest.requireActual('../../../autils/memoryFileSystem').createMemoryFileSystem(),
);

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

import fs from 'node:fs';
import crypto from 'node:crypto';
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
    stage: 'dev',
    region: 'cn-hangzhou',
    stageId: 'stage-1',
    scopeProtocol: 2,
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

  const hash = (value: unknown) =>
    crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
  const snapshot = (
    stateJson: unknown = emptyStateJson(),
    overrides: Record<string, unknown> = {},
  ) => ({
    id: 'state-1',
    serviceId: 'svc-1',
    stageId: 'stage-1',
    stage: 'dev',
    region: 'cn-hangzhou',
    scopeProtocol: 2,
    contentHash: hash(stateJson),
    versionNumber: 1,
    stateJson,
    ...overrides,
  });
  const acknowledgeSave = (versionNumber = 2) =>
    mockApiClient.post.mockImplementationOnce(async (_url, body) =>
      snapshot(body.stateJson, { contentHash: body.contentHash, versionNumber }),
    );

  /** Standard mutating happy path: capabilities probe, provision, state fetch. */
  const mockMutatingLoad = (
    stateJson: unknown = emptyStateJson(),
    regional = !!(stateJson as StateFile).scope,
  ) => {
    mockApiClient.get.mockResolvedValueOnce({
      regionalScope: true,
      scopeProtocol: 2,
      stateFormat: '4.0',
    });
    mockApiClient.post.mockResolvedValueOnce(deploymentResponse());
    mockApiClient.get.mockResolvedValueOnce(
      snapshot(stateJson, regional ? {} : { scopeProtocol: 1, region: '' }),
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    fs.rmSync(path.join(os.homedir(), '.serverlessinsight', 'event-queue'), {
      recursive: true,
      force: true,
    });
    Object.values(mockApiClient).forEach((mock) => mock.mockReset());
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
    it.each([1, 3])(
      'refuses unsupported protocol %s before provisioning',
      async (scopeProtocol) => {
        mockApiClient.get.mockResolvedValueOnce({
          regionalScope: true,
          scopeProtocol,
          stateFormat: '4.0',
        });
        await expect(createBackend().loadState()).rejects.toThrow(
          'SAAS_REGIONAL_SCOPE_UNSUPPORTED',
        );
        expect(mockApiClient.post).not.toHaveBeenCalled();
      },
    );

    it('projects an activated, bound legacy document without changing the acknowledged hash', async () => {
      const legacy = {
        ...emptyStateJson(),
        version: '3.0',
        scope: undefined,
        stages: {
          dev: { resources: { demo: { instances: [{ id: 'native-id' }] } } },
          old: { resources: { foreign: {} } },
        },
      };
      mockMutatingLoad(legacy, true);
      const backend = createBackend();
      const state = await backend.loadState();
      expect(state.version).toBe('4.0');
      expect(state.scope).toEqual(scope && { stage: 'dev', region: 'cn-hangzhou' });
      expect(Object.keys(state.stages)).toEqual(['dev']);
      expect((state.resources.demo.instances[0] as { id: string }).id).toBe('native-id');
      expect((await backend.probeWriteReadiness()).ready).toBe(true);
      acknowledgeSave();
      await backend.saveState(state);
      expect(mockApiClient.post.mock.calls.at(-1)?.[1].baseContentHash).toBe(hash(legacy));
    });
    it('provisions with region, scope and scopeProtocol in the payload', async () => {
      mockMutatingLoad();

      await createBackend().loadState();

      expect(mockApiClient.post).toHaveBeenCalledWith('/api/v1/deployments/', {
        appName: 'myapp',
        serviceName: 'myservice',
        provider: 'aliyun',
        stage: 'dev',
        region: 'cn-hangzhou',
        scopeProtocol: 2,
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
      mockApiClient.get.mockResolvedValueOnce({
        regionalScope: true,
        scopeProtocol: 2,
        stateFormat: '4.0',
      });
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
      mockApiClient.get.mockResolvedValueOnce({
        regionalScope: true,
        scopeProtocol: 2,
        stateFormat: '4.0',
      });
      mockApiClient.post.mockResolvedValueOnce(deploymentResponse());
      mockApiClient.get.mockRejectedValueOnce(new ApiError('upstream exploded', 500));

      // Treating network/5xx failures as "empty state" would make the next
      // plan propose full re-creation of live resources — it must throw.
      await expect(createBackend().loadState()).rejects.toThrow('upstream exploded');
    });

    it('should provision only once across calls', async () => {
      mockApiClient.get.mockResolvedValueOnce({
        regionalScope: true,
        scopeProtocol: 2,
        stateFormat: '4.0',
      });
      mockApiClient.post.mockResolvedValueOnce(deploymentResponse());
      mockApiClient.get.mockResolvedValue(snapshot());

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
      scope: { stage: 'dev', region: 'cn-hangzhou' },
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
      acknowledgeSave();

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
          scopeProtocol: 2,
          baseContentHash: hash(emptyStateJson()),
          resourceCount: 1,
        }),
      );
    });

    it('refuses a write that has no acknowledged base', async () => {
      mockApiClient.get.mockResolvedValueOnce({
        regionalScope: true,
        scopeProtocol: 2,
        stateFormat: '4.0',
      });
      mockApiClient.post.mockResolvedValueOnce(deploymentResponse());
      await expect(createBackend().saveState(savedState)).rejects.toThrow(
        'SAAS_STATE_BASE_UNKNOWN',
      );
      expect(mockApiClient.post).toHaveBeenCalledTimes(1);
    });

    it('does not retry a CAS conflict or advance its base from the rejected write', async () => {
      mockMutatingLoad();
      const backend = createBackend();
      await backend.loadState();
      mockApiClient.post.mockRejectedValueOnce(new ApiError('stale', 409));
      await expect(backend.saveState(savedState)).rejects.toThrow('stale');
      acknowledgeSave();
      await backend.saveState(savedState);
      const calls = mockApiClient.post.mock.calls.filter((call) => call[0].endsWith('/sync'));
      expect(calls).toHaveLength(2);
      expect(calls[0][1].baseContentHash).toBe(calls[1][1].baseContentHash);
    });

    it('projects the runtime resources into the synced stage document', async () => {
      mockMutatingLoad();
      acknowledgeSave();

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

    describe('content-hash CAS and idempotency', () => {
      const payloads = () =>
        mockApiClient.post.mock.calls
          .filter((call) => call[0].endsWith('/state/sync'))
          .map((call) => call[1] as Record<string, unknown>);

      it('uses the loaded hash and advances the base only from successful acknowledgements', async () => {
        mockMutatingLoad();
        acknowledgeSave(2);
        acknowledgeSave(3);
        const backend = createBackend();
        await backend.loadState();
        await backend.saveState(savedState);
        await backend.saveState({ ...savedState, resources: {} });
        const calls = payloads();
        expect(calls[0].baseContentHash).toBe(hash(emptyStateJson()));
        expect(calls[1].baseContentHash).toBe(calls[0].contentHash);
        expect(calls[0].contentHash).not.toBe(calls[1].contentHash);
        expect(calls[0]).not.toHaveProperty('baseSerial');
      });

      it('keeps the same acknowledged head when identical content is deduplicated', async () => {
        mockMutatingLoad();
        acknowledgeSave(2);
        acknowledgeSave(2);
        acknowledgeSave(3);
        const backend = createBackend();
        await backend.loadState();
        await backend.saveState(savedState);
        await backend.saveState(savedState);
        await backend.saveState({ ...savedState, resources: {} });
        const calls = payloads();
        expect(calls[1].baseContentHash).toBe(calls[0].contentHash);
        expect(calls[2].baseContentHash).toBe(calls[0].contentHash);
      });

      it('retries a lost response with the same base/content and continues from the confirmed hash', async () => {
        mockMutatingLoad();
        const backend = createBackend();
        await backend.loadState();
        let head = snapshot();
        let lost = true;
        mockApiClient.post.mockImplementation(async (_url, body) => {
          if (head.contentHash === body.contentHash) return head;
          if (body.baseContentHash !== head.contentHash) throw new ApiError('stale revision', 409);
          head = snapshot(body.stateJson, {
            contentHash: body.contentHash,
            versionNumber: head.versionNumber + 1,
          });
          if (lost) {
            lost = false;
            throw new Error('lost response');
          }
          return head;
        });
        await backend.saveState(savedState);
        await backend.saveState({ ...savedState, resources: {} });
        const calls = payloads();
        expect(calls[0]).toEqual(calls[1]);
        expect(calls[2].baseContentHash).toBe(calls[0].contentHash);
        expect(head.versionNumber).toBe(3);
      });

      it('rejects invalid acknowledgements and accepts a first snapshot without serial or lineage', async () => {
        mockApiClient.get.mockResolvedValueOnce({
          regionalScope: true,
          scopeProtocol: 2,
          stateFormat: '4.0',
        });
        mockApiClient.post.mockResolvedValueOnce(deploymentResponse());
        mockApiClient.get.mockRejectedValueOnce(new ApiError('not found', 404));
        const backend = createBackend();
        await backend.loadState();
        const state = { ...savedState, serial: undefined, lineage: undefined };
        mockApiClient.post.mockResolvedValueOnce({});
        await expect(backend.saveState(state)).rejects.toThrow('SAAS_STATE_ACK_INVALID');
        acknowledgeSave(1);
        acknowledgeSave(2);
        await backend.saveState(state);
        await backend.saveState({ ...state, resources: {} });
        const calls = payloads();
        expect(calls[0].baseContentHash).toBe('');
        expect(calls.at(-1)?.baseContentHash).toBe(calls[1].contentHash);
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
      mockApiClient.get.mockResolvedValueOnce(snapshot());

      const backend = readOnlyBackend();
      const result = await backend.loadState();

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/api/v1/state/migrate/targets?app_name=myapp&service_name=myservice&stages=dev&region=cn-hangzhou',
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
    it('isolates the durable spool without sending its filesystem path as event data', async () => {
      const spool = fs.mkdtempSync(path.join(os.tmpdir(), 'si-saas-spool-'));
      try {
        mockMutatingLoad();
        mockApiClient.patch.mockResolvedValue({});
        const backend = createSaasStateBackend({ scope }, { eventQueueDir: spool });
        await backend.loadState();
        backend.reportEvent!({ type: 'diagnostic', message: 'test event' });
        const file = path.join(spool, 'deploy-1.jsonl');
        expect(fs.existsSync(file)).toBe(true);
        expect(JSON.parse(fs.readFileSync(file, 'utf8'))).not.toHaveProperty('queueDir');
        await backend.flushEvents!();
        expect(fs.existsSync(file)).toBe(false);
      } finally {
        fs.rmSync(spool, { recursive: true, force: true });
      }
    });
    it('sends the owning deployment on incremental writes and retries terminal delivery only', async () => {
      mockMutatingLoad();
      acknowledgeSave();
      const backend = createBackend();
      const state = await backend.loadState();
      let lose = true;
      mockApiClient.patch.mockImplementation(async (_path, body) => {
        if (body.phase === 'complete' && lose) {
          lose = false;
          throw new Error('lost completion');
        }
        return {};
      });
      const callback = jest.fn(async () => backend.saveState(state));
      await backend.withLock('deploy', callback);
      expect(callback).toHaveBeenCalledTimes(1);
      expect(mockApiClient.post.mock.calls.at(-1)?.[1].deploymentId).toBe('deploy-1');
      const terminals = mockApiClient.patch.mock.calls.filter(
        (call) => call[1].phase === 'complete',
      );
      expect(terminals).toHaveLength(2);
      expect(terminals[0][1]).toEqual(terminals[1][1]);
    });

    it('can complete an empty first deploy without inventing a snapshot reference', async () => {
      mockApiClient.get.mockResolvedValueOnce({
        regionalScope: true,
        scopeProtocol: 2,
        stateFormat: '4.0',
      });
      mockApiClient.post.mockResolvedValueOnce(deploymentResponse());
      mockApiClient.get.mockRejectedValueOnce(new ApiError('absent', 404));
      mockApiClient.patch.mockResolvedValue({});
      const backend = createBackend();
      const state = await backend.loadState();
      await backend.withLock('deploy', async () => ({ stateJson: state, resourceCount: 0 }));
      const complete = mockApiClient.patch.mock.calls.find(
        (call) => call[1].phase === 'complete',
      )![1];
      expect(complete.baseContentHash).toBe('');
      expect(complete).not.toHaveProperty('stateId');
      expect(complete.stateJson.scope.region).toBe('cn-hangzhou');
    });

    it('falls back to a diagnostic-only failure when its snapshot is no longer current', async () => {
      mockMutatingLoad();
      const backend = createBackend();
      await backend.loadState();
      mockApiClient.patch.mockImplementation(async (_url, body) => {
        if (body.phase === 'fail' && body.stateId) throw new ApiError('newer head', 409);
        return {};
      });
      const failure = Object.assign(new Error('cloud failure'), { stateJson: { partial: true } });
      await expect(
        backend.withLock('deploy', async () => {
          throw failure;
        }),
      ).rejects.toThrow('cloud failure');
      const fails = mockApiClient.patch.mock.calls.filter((call) => call[1].phase === 'fail');
      expect(fails).toHaveLength(2);
      expect(fails[1][1]).not.toHaveProperty('stateId');
      expect(fails[1][1].stateSnapshot).toEqual({ partial: true });
    });
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
        scopeProtocol: 2,
        baseContentHash: hash(emptyStateJson()),
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
        stateId: 'state-1',
        scopeProtocol: 2,
        baseContentHash: hash(emptyStateJson()),
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
          stateId: 'state-1',
          stateSnapshot: failure.stateJson,
          baseContentHash: hash(emptyStateJson()),
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
      mockApiClient.get.mockResolvedValueOnce({
        regionalScope: true,
        scopeProtocol: 2,
        stateFormat: '4.0',
      });
      mockApiClient.post.mockResolvedValueOnce(deploymentResponse(''));
      mockApiClient.get.mockResolvedValueOnce(snapshot());

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
