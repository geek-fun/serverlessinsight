jest.mock('../../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

jest.mock('../../../../src/lang', () => ({
  lang: { __: (key: string) => key },
}));

const mockLineContext = {
  line: 'com',
  consoleUrl: 'https://console.example.test',
  apiKey: 'si_com_abc_secret',
  orgId: 'org-1',
  orgSlug: 'my-org',
};

jest.mock('../../../../src/common/lineContext', () => ({
  resolveLineContext: jest.fn(async () => mockLineContext),
}));

const mockClient = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
};

jest.mock('../../../../src/common/apiClient', () => ({
  validateApiKey: jest.fn(async () => ({ orgId: 'org-1', orgSlug: 'my-org', region: 'com' })),
  createApiClient: jest.fn(() => mockClient),
}));

jest.mock('../../../../src/common/consoleLines', () => ({
  assertValidatedRegion: jest.fn(),
  assertValidatedOrg: jest.fn(),
  assertOrgMatches: jest.fn(),
}));

import { createSaasStateBackend } from '../../../../src/common/stateBackend/saasStateBackend';
import { normalizeScope } from '../../../../src/common/stateScope';

describe('saasStateBackend issueRuntimeConfigToken (epic #53 P2)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockClient.get.mockReset();
    mockClient.post.mockReset();
  });

  const makeBackend = async () =>
    createSaasStateBackend(
      {
        scope: normalizeScope({
          provider: 'aliyun',
          app: 'demo-app',
          service: 'demo-service',
          stage: 'prod',
          region: 'cn-hangzhou',
        }),
        declaredOrg: 'my-org',
      },
      { apiKey: 'si_com_abc_secret' },
    );

  it('resolves the service via read-only targets when not yet provisioned, then mints the key', async () => {
    const backend = await makeBackend();
    mockClient.get.mockResolvedValueOnce({
      app: { name: 'demo-app', exists: true, id: 'app-1' },
      service: { name: 'demo-service', exists: true, id: 'svc-1', provider: 'aliyun' },
      stages: [],
    });
    mockClient.post.mockResolvedValueOnce({
      fullKey: 'sirt_com_abc_secret',
      rotated: false,
    });

    const result = await backend.issueRuntimeConfigToken!();

    expect(mockClient.get).toHaveBeenCalledWith(
      expect.stringContaining(
        '/api/v1/state/migrate/targets?app_name=demo-app&service_name=demo-service',
      ),
    );
    expect(mockClient.post).toHaveBeenCalledWith('/api/v1/runtime-keys', {
      stage: 'prod',
      serviceId: 'svc-1',
    });
    expect(result).toEqual({
      token: 'sirt_com_abc_secret',
      consoleUrl: 'https://console.example.test',
    });
  });

  it('provisions the deployment identity on a first deploy (targets do not exist yet)', async () => {
    const backend = await makeBackend();
    // read-only targets: nothing exists yet → the factory provision path creates it
    mockClient.get.mockImplementation((path: string) => {
      if (String(path).includes('/api/v1/state/migrate/targets')) {
        return Promise.resolve({
          app: { name: 'demo-app', exists: false, id: null },
          service: { name: 'demo-service', exists: false, id: null, provider: null },
          stages: [],
        });
      }
      return Promise.resolve({
        regionalScope: true,
        providerScope: true,
        scopeProtocol: 3,
        stateFormat: '4.0',
      });
    });
    mockClient.post
      .mockResolvedValueOnce({
        provider: 'aliyun',
        id: 'dep-1',
        appId: 'app-1',
        serviceId: 'svc-1',
        status: 'in_progress',
        isNewApp: true,
        isNewService: true,
        stage: 'prod',
        region: 'cn-hangzhou',
        stageId: 'stage-1',
        scopeProtocol: 3,
      })
      .mockResolvedValueOnce({ fullKey: 'sirt_com_after_provision', rotated: false });

    const result = await backend.issueRuntimeConfigToken!();

    expect(mockClient.post).toHaveBeenNthCalledWith(
      1,
      '/api/v1/deployments/',
      expect.objectContaining({ appName: 'demo-app', serviceName: 'demo-service', stage: 'prod' }),
    );
    expect(mockClient.post).toHaveBeenNthCalledWith(2, '/api/v1/runtime-keys', {
      stage: 'prod',
      serviceId: 'svc-1',
    });
    expect(result.token).toBe('sirt_com_after_provision');
  });
});
