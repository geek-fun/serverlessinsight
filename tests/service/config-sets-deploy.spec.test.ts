import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { deploy } from '../../src/commands/deploy';
import { plan } from '../../src/commands/plan';
import { createMockAliyunClient, type MockAliyunClient } from './mockCloudClient';

jest.mock('../../src/common/aliyunClient', () => ({
  createAliyunClient: jest.fn(),
}));

jest.mock('../../src/common/imsClient', () => ({
  getIamInfo: jest.fn().mockResolvedValue({
    accountId: '123456789012',
    displayName: 'Test User',
    userId: 'test-user-id',
  }),
}));

jest.mock('../../src/common/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mockCreateAliyunClient = require('../../src/common/aliyunClient')
  .createAliyunClient as jest.Mock;

describe('Config & Secrets end-to-end deploy + diff service flow (epic #53)', () => {
  const originalFetch = global.fetch;
  let mockClient: MockAliyunClient;
  let tmpDir: string;
  let yamlPath: string;
  let savedStateJson: Record<string, unknown> | null = null;
  let savedContentHash = '';
  let lastCompletedPlan: unknown = null;
  let lastResolveBody: Record<string, unknown> | null = null;
  let runtimeKeyCalls = 0;

  beforeEach(async () => {
    jest.clearAllMocks();
    mockClient = createMockAliyunClient();
    mockCreateAliyunClient.mockReturnValue(mockClient);
    savedStateJson = null;
    savedContentHash = '';
    lastCompletedPlan = null;
    lastResolveBody = null;
    runtimeKeyCalls = 0;

    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'si-config-e2e-'));
    yamlPath = path.join(tmpDir, 'serverlessinsight.yml');
    const artifactZip = path.resolve(process.cwd(), 'tests/fixtures/artifacts/artifact.zip');
    await fs.writeFile(
      yamlPath,
      [
        'version: 0.0.1',
        'org: demo-org',
        'app: cfg-e2e-app',
        'service: cfg-e2e-svc',
        'provider:',
        '  name: aliyun',
        '  region: cn-hangzhou',
        'backend:',
        '  state_manager:',
        '    type: SAAS',
        'functions:',
        '  api_fn:',
        '    name: cfg-e2e-fn',
        '    code:',
        '      runtime: nodejs18',
        '      handler: index.handler',
        `      path: ${artifactZip}`,
        '    environment:',
        '      DB_PORT: ${config_sets.db.port}',
        '      APP_CONN: postgres://${config_sets.db.user}:${config_sets.db.password}@${config_sets.db.host}/orders',
        '      STRIPE_HOOK: ${config_sets.stripe.signing_val}',
        '',
      ].join('\n'),
      'utf-8',
    );

    global.fetch = jest.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      const method = (init?.method ?? 'GET').toUpperCase();
      const body = init?.body ? (JSON.parse(String(init.body)) as Record<string, unknown>) : {};
      const okJson = (data: unknown) =>
        new Response(JSON.stringify({ code: 2001, data }), { status: 200 });

      if (url.endsWith('/api/v1/auth/api-keys/validate')) {
        return okJson({ orgId: 'org-1', orgSlug: 'demo-org', region: 'com' });
      }
      if (url.includes('/api/v1/state/migrate/targets')) {
        return okJson({
          app: { name: 'cfg-e2e-app', exists: true, id: 'app-1' },
          service: {
            name: 'cfg-e2e-svc',
            exists: true,
            id: 'svc-1',
            provider: 'aliyun',
            scopeProtocol: 3,
          },
          stages: [],
        });
      }
      if (url.endsWith('/api/v1/config-sets/resolve') && method === 'POST') {
        lastResolveBody = body;
        return okJson({
          items: [
            {
              ref: 'db.port',
              value: '5432',
              secret: false,
              source: { configSetId: 'cs-1', name: 'db', versionNumber: 2, scope: 'stage' },
            },
            {
              ref: 'db.user',
              value: 'app',
              secret: false,
              source: { configSetId: 'cs-1', name: 'db', versionNumber: 2, scope: 'stage' },
            },
            {
              ref: 'db.password',
              value: 'sup3r-s3cret',
              secret: true,
              source: { configSetId: 'cs-1', name: 'db', versionNumber: 3, scope: 'stage' },
            },
            {
              ref: 'db.host',
              value: 'db.prod.internal',
              secret: false,
              source: { configSetId: 'cs-1', name: 'db', versionNumber: 2, scope: 'stage' },
            },
            {
              ref: 'stripe.signing_val',
              value: 'whsec_v3_plain',
              secret: true,
              source: { configSetId: 'cs-2', name: 'stripe', versionNumber: 3, scope: 'stage' },
            },
          ],
          missing: [],
        });
      }
      if (url.endsWith('/api/v1/capabilities')) {
        return okJson({
          regionalScope: true,
          providerScope: true,
          scopeProtocol: 3,
          stateFormat: '4.0',
        });
      }
      if (url.endsWith('/api/v1/deployments/') && method === 'POST') {
        return okJson({
          id: 'dep-1',
          orgId: 'org-1',
          appId: 'app-1',
          serviceId: 'svc-1',
          stageId: 'stage-1',
          provider: 'aliyun',
          stage: 'prod',
          region: 'cn-hangzhou',
          scopeProtocol: 3,
          status: 'pending',
        });
      }
      if (url.includes('/state/current') && method === 'GET') {
        if (!savedStateJson) {
          return new Response(JSON.stringify({ code: 4004, messages: ['not found'] }), {
            status: 404,
          });
        }
        return okJson({
          id: 'snap-1',
          serviceId: 'svc-1',
          stageId: 'stage-1',
          provider: 'aliyun',
          stage: 'prod',
          region: 'cn-hangzhou',
          scopeProtocol: 3,
          versionNumber: 1,
          contentHash: savedContentHash,
          stateJson: savedStateJson,
        });
      }
      if (url.includes('/state/sync') && method === 'POST') {
        savedStateJson = body.stateJson as Record<string, unknown>;
        savedContentHash = String(body.contentHash);
        return okJson({
          id: 'snap-1',
          serviceId: 'svc-1',
          stageId: 'stage-1',
          provider: 'aliyun',
          stage: 'prod',
          region: 'cn-hangzhou',
          scopeProtocol: 3,
          versionNumber: 1,
          contentHash: savedContentHash,
          stateJson: savedStateJson,
        });
      }
      if (url.endsWith('/api/v1/runtime-keys') && method === 'POST') {
        runtimeKeyCalls += 1;
        return okJson({
          fullKey: `sirt_com_v${runtimeKeyCalls}_secret`,
          rotated: runtimeKeyCalls > 1,
        });
      }
      if (url.includes('/api/v1/deployments/dep-1') && method === 'PATCH') {
        const phase = String(body.phase ?? '');
        if (phase === 'complete') {
          lastCompletedPlan = body.plan;
        }
        const status =
          phase === 'start' ? 'deploying' : phase === 'complete' ? 'completed' : 'failed';
        return okJson({
          id: 'dep-1',
          orgId: 'org-1',
          appId: 'app-1',
          serviceId: 'svc-1',
          stageId: 'stage-1',
          provider: 'aliyun',
          stage: 'prod',
          region: 'cn-hangzhou',
          scopeProtocol: 3,
          status,
        });
      }
      throw new Error(`Unexpected fetch in test: ${method} ${url}`);
    }) as typeof fetch;
  });

  afterEach(async () => {
    global.fetch = originalFetch;
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it('resolves refs with appId/serviceId, masks all secrets in state/plan, and converges diff + redeploy to noop without rotating runtime key', async () => {
    // Deploy 1: function does not exist yet
    mockClient.fc3.getFunction.mockResolvedValue(null);
    let createdEnv: Record<string, string> | undefined;
    mockClient.fc3.createFunction.mockImplementation(
      async (cfg: { environmentVariables?: Record<string, string> }) => {
        createdEnv = { ...(cfg.environmentVariables ?? {}) };
        mockClient.fc3.getFunction.mockResolvedValue({
          functionName: 'cfg-e2e-fn',
          runtime: 'nodejs18',
          handler: 'index.handler',
          memorySize: 128,
          timeout: 3,
          environmentVariables: createdEnv,
          logConfig: { enableRequestMetrics: false, enableInstanceMetrics: false },
          tags: [{ Key: 'si-owned-by', Value: 'cfg-e2e-app/cfg-e2e-svc/prod/functions.api_fn' }],
        });
        return { functionName: 'cfg-e2e-fn' };
      },
    );

    await deploy({
      location: yamlPath,
      stage: 'prod',
      region: 'cn-hangzhou',
      provider: 'aliyun',
      siApiKey: 'si_com_abc123_secret456',
      line: 'international',
      autoApprove: true,
    });

    // 1. Resolve sent appId + serviceId so org-scoped keys walk the full cascade.
    expect(lastResolveBody).toEqual(
      expect.objectContaining({
        stage: 'prod',
        appId: 'app-1',
        serviceId: 'svc-1',
      }),
    );
    // 2. Cloud received real strings (including numeric port as string) + minted token.
    expect(createdEnv).toEqual({
      DB_PORT: '5432',
      APP_CONN: 'postgres://app:sup3r-s3cret@db.prod.internal/orders',
      STRIPE_HOOK: 'whsec_v3_plain',
      SI_CONFIG_TOKEN: 'sirt_com_v1_secret',
      SI_CONSOLE_URL: 'https://console.serverlessinsight.com',
    });
    expect(runtimeKeyCalls).toBe(1);

    // 3. Persisted SaaS state & published plan contain ZERO plaintext secrets.
    const serializedState = JSON.stringify(savedStateJson);
    const serializedPlan = JSON.stringify(lastCompletedPlan);
    for (const secret of ['sup3r-s3cret', 'whsec_v3_plain', 'sirt_com_v1_secret']) {
      expect(serializedState).not.toContain(secret);
      expect(serializedPlan).not.toContain(secret);
    }
    expect(serializedState).toContain('cfgref:config_sets.db.password@v3');
    expect(serializedState).toContain('cfgref:config_sets.stripe.signing_val@v3');

    // 4. Read-only `si diff` converges to zero changes without rotating the runtime key.
    const diffResult = await plan({
      location: yamlPath,
      stage: 'prod',
      region: 'cn-hangzhou',
      provider: 'aliyun',
      siApiKey: 'si_com_abc123_secret456',
      line: 'international',
    });
    expect(diffResult.hasChanges).toBe(false);
    expect(runtimeKeyCalls).toBe(1);

    // 5. Unchanged redeploy stays noop — zero function updates and zero runtime key rotations.
    await deploy({
      location: yamlPath,
      stage: 'prod',
      region: 'cn-hangzhou',
      provider: 'aliyun',
      siApiKey: 'si_com_abc123_secret456',
      line: 'international',
      autoApprove: true,
    });
    expect(runtimeKeyCalls).toBe(1);
    expect(mockClient.fc3.updateFunctionConfiguration).not.toHaveBeenCalled();
  });
});
