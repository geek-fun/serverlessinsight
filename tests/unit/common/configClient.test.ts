jest.mock('../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

jest.mock('../../../src/lang', () => ({
  lang: {
    __: (key: string, vars?: Record<string, string>) =>
      vars ? `${key}:${JSON.stringify(vars)}` : key,
  },
}));

const mockLineContext = {
  line: 'com',
  consoleUrl: 'https://console.example.test',
  apiKey: 'si_com_abc_secret',
  orgId: 'org-1',
  orgSlug: 'my-org',
};

jest.mock('../../../src/common/lineContext', () => ({
  resolveLineContext: jest.fn(async () => mockLineContext),
}));

const mockIdentity = { orgId: 'org-1', orgSlug: 'my-org', region: 'com' };
jest.mock('../../../src/common/apiClient', () => ({
  validateApiKey: jest.fn(async () => mockIdentity),
  createApiClient: jest.fn(() => mockClient),
}));

jest.mock('../../../src/common/consoleLines', () => ({
  assertValidatedRegion: jest.fn(),
  assertValidatedOrg: jest.fn(),
}));

const mockClient = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
};

import { resolveLineContext } from '../../../src/common/lineContext';
import { validateApiKey } from '../../../src/common/apiClient';
import {
  createConfigClient,
  resolveConfigRefsViaSaas,
  resolveTargetIds,
} from '../../../src/common/configClient';

const mockResolveLineContext = resolveLineContext as jest.Mock;
const mockValidateApiKey = validateApiKey as jest.Mock;

describe('configClient (epic #53 P1/P2 SaaS surface)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockClient.get.mockReset();
    mockClient.post.mockReset();
    mockClient.put.mockReset();
  });

  describe('createConfigClient', () => {
    it('routes through line-context resolution and validates the org', async () => {
      const result = await createConfigClient({ siApiKey: 'si_com_abc_secret', operation: 'test' });
      expect(mockResolveLineContext).toHaveBeenCalledWith({
        siApiKey: 'si_com_abc_secret',
        declaredOrg: undefined,
        orgFlag: undefined,
        lineFlag: undefined,
        operation: 'test',
      });
      expect(mockValidateApiKey).toHaveBeenCalledWith(
        mockLineContext.apiKey,
        mockLineContext.consoleUrl,
      );
      expect(result.orgId).toBe('org-1');
      expect(result.consoleUrl).toBe('https://console.example.test');
    });

    it('passes the declared org and line flag through', async () => {
      await createConfigClient({
        declaredOrg: 'yaml-org',
        org: 'flag-org',
        line: 'china',
        operation: 'test',
      });
      expect(mockResolveLineContext).toHaveBeenCalledWith({
        siApiKey: undefined,
        declaredOrg: 'yaml-org',
        orgFlag: 'flag-org',
        lineFlag: 'china',
        operation: 'test',
      });
    });
  });

  describe('resolveTargetIds', () => {
    it('returns ids when app and service exist', async () => {
      mockClient.get.mockResolvedValueOnce({
        app: { name: 'app', exists: true, id: 'app-1' },
        service: { name: 'svc', exists: true, id: 'svc-1' },
      });
      const ids = await resolveTargetIds(
        { client: mockClient, consoleUrl: 'https://x', orgId: 'org-1' },
        { app: 'app', service: 'svc', stage: 'prod', region: 'cn-hangzhou', provider: 'aliyun' },
      );
      expect(ids).toEqual({ appId: 'app-1', serviceId: 'svc-1' });
      expect(mockClient.get).toHaveBeenCalledWith(
        '/api/v1/state/migrate/targets?app_name=app&service_name=svc&stages=prod&region=cn-hangzhou&provider=aliyun',
      );
    });

    it('returns nulls for not-yet-existing targets (first deploy)', async () => {
      mockClient.get.mockResolvedValueOnce({
        app: { name: 'app', exists: false, id: null },
        service: { name: 'svc', exists: false, id: null },
      });
      const ids = await resolveTargetIds(
        { client: mockClient, consoleUrl: 'https://x', orgId: 'org-1' },
        { app: 'app', service: 'svc', stage: 'prod', region: 'cn-hangzhou', provider: 'aliyun' },
      );
      expect(ids).toEqual({ appId: null, serviceId: null });
    });
  });

  describe('resolveConfigRefsViaSaas', () => {
    it('resolves appId/serviceId when deployment scope is given and maps resolved items', async () => {
      mockClient.get.mockResolvedValueOnce({
        app: { name: 'demo-app', exists: true, id: 'app-1' },
        service: { name: 'demo-svc', exists: true, id: 'svc-1' },
      });
      mockClient.post.mockResolvedValueOnce({
        items: [
          {
            ref: 'db.host',
            value: 'db.prod.internal',
            secret: false,
            source: { configSetId: 'cs-1', name: 'db', versionNumber: 5, scope: 'stage' },
          },
          {
            ref: 'db.password',
            value: 'plain',
            secret: true,
            source: { configSetId: 'cs-1', name: 'db', versionNumber: 5, scope: 'stage' },
          },
        ],
        missing: [],
      });

      const resolved = await resolveConfigRefsViaSaas(['db.host', 'db.password'], {
        stage: 'prod',
        app: 'demo-app',
        service: 'demo-svc',
        provider: 'aliyun',
        region: 'cn-hangzhou',
        siApiKey: 'si_com_abc_secret',
      });
      expect(mockClient.get).toHaveBeenCalledWith(
        '/api/v1/state/migrate/targets?app_name=demo-app&service_name=demo-svc&stages=prod&region=cn-hangzhou&provider=aliyun',
      );
      expect(mockClient.post).toHaveBeenCalledWith('/api/v1/config-sets/resolve', {
        refs: ['db.host', 'db.password'],
        stage: 'prod',
        appId: 'app-1',
        serviceId: 'svc-1',
      });
      expect(resolved.get('db.host')).toEqual({
        value: 'db.prod.internal',
        versionNumber: 5,
        secret: false,
        scope: 'stage',
        configSet: 'db',
      });
      expect(resolved.get('db.password')?.secret).toBe(true);
    });

    it('omits appId/serviceId when targets do not exist yet or scope is omitted', async () => {
      mockClient.get.mockResolvedValueOnce({
        app: { name: 'new-app', exists: false, id: null },
        service: { name: 'new-svc', exists: false, id: null },
      });
      mockClient.post.mockResolvedValueOnce({ items: [], missing: [] });

      await resolveConfigRefsViaSaas(['shared.smtp'], {
        stage: 'prod',
        app: 'new-app',
        service: 'new-svc',
        provider: 'aliyun',
        region: 'cn-hangzhou',
      });
      expect(mockClient.post).toHaveBeenCalledWith('/api/v1/config-sets/resolve', {
        refs: ['shared.smtp'],
        stage: 'prod',
      });

      mockClient.post.mockResolvedValueOnce({ items: [], missing: [] });
      await resolveConfigRefsViaSaas(['shared.smtp'], { stage: 'prod' });
      expect(mockClient.post).toHaveBeenLastCalledWith('/api/v1/config-sets/resolve', {
        refs: ['shared.smtp'],
        stage: 'prod',
      });
    });

    it('fails closed listing every missing ref when the resolve reports any', async () => {
      mockClient.post.mockResolvedValueOnce({
        items: [],
        missing: [
          { ref: 'nope.host', reason: 'config set "nope" not found (searched scopes: org)' },
          { ref: 'db.absent', reason: 'item "absent" not found in "db"@v5 (scope=stage)' },
        ],
      });

      await expect(
        resolveConfigRefsViaSaas(['nope.host', 'db.absent'], { stage: 'prod' }),
      ).rejects.toThrow(/CONFIG_ITEM_NOT_FOUND/);
    });
  });
});
