import { hashSaasState } from '../../../src/common/saasProtocol';
import { migrate } from '../../../src/commands/migrate';
import { createStateBackend } from '../../../src/common/stateBackend';
import { resolveLineContext } from '../../../src/common/lineContext';
import { createApiClient, validateApiKey, ApiError } from '../../../src/common/apiClient';
import { parseYaml, revalYaml } from '../../../src/parser';
import { getContext, setContext } from '../../../src/common';

const mockLoggerInfo = jest.fn();
const mockLoggerWarn = jest.fn();
const mockReadlineAnswers: string[] = [];

jest.mock('node:readline', () => ({
  createInterface: jest.fn(() => ({
    question: jest.fn((_query: string, callback: (answer: string) => void) => {
      callback(mockReadlineAnswers.shift() ?? 'n');
    }),
    close: jest.fn(),
  })),
}));

jest.mock('../../../src/lang', () => ({
  lang: { __: (key: string) => key },
}));

jest.mock('../../../src/common/logger', () => ({
  logger: {
    info: (...args: unknown[]) => mockLoggerInfo(...args),
    warn: (...args: unknown[]) => mockLoggerWarn(...args),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

jest.mock('../../../src/common', () => ({
  ...jest.requireActual('../../../src/common/saasProtocol'),
  normalizeScope: jest.requireActual('../../../src/common/stateScope').normalizeScope,
  validateScopedDocument: jest.requireActual('../../../src/common/stateManager')
    .validateScopedDocument,
  getContext: jest.fn(),
  getIacLocation: jest.fn(),
  setContext: jest.fn(),
  setIac: jest.fn(),
  toPersistedState: jest.fn((state: Record<string, unknown>) => ({ ...state })),
  logger: {
    info: (...args: unknown[]) => mockLoggerInfo(...args),
    warn: (...args: unknown[]) => mockLoggerWarn(...args),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

jest.mock('../../../src/common/stateBackend', () => ({
  ...jest.requireActual('../../../src/common/stateBackend'),
  createStateBackend: jest.fn(),
}));

jest.mock('../../../src/common/lineContext', () => ({
  resolveLineContext: jest.fn(),
}));

jest.mock('../../../src/common/apiClient', () => {
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
    validateApiKey: jest.fn(),
    ApiError: MockApiError,
  };
});

jest.mock('../../../src/parser', () => ({
  parseYaml: jest.fn(),
  revalYaml: jest.fn(),
}));

const mockApiClient = {
  get: jest.fn(),
  post: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
};

const mockedCreateStateBackend = createStateBackend as jest.Mock;
const mockedResolveLineContext = resolveLineContext as jest.Mock;
const mockedValidateApiKey = validateApiKey as jest.Mock;
const mockedCreateApiClient = createApiClient as jest.Mock;
const mockedParseYaml = parseYaml as jest.Mock;
const mockedRevalYaml = revalYaml as jest.Mock;
const mockedGetContext = getContext as unknown as jest.Mock;
const mockedSetContext = setContext as unknown as jest.Mock;

const rawIac = {
  version: '0.0.1',
  app: 'myapp',
  service: 'myservice',
  provider: { name: 'aliyun', region: 'cn-hangzhou' },
  stages: { dev: {} },
};

const bucketIac = {
  ...rawIac,
  backend: { type: 'BUCKET_STORE', bucket: 'my-bucket', key: 'state.json' },
};

const mockContext = {
  app: 'myapp',
  service: 'myservice',
  provider: 'aliyun',
  region: 'cn-hangzhou',
  stage: 'dev',
  accessKeyId: 'ak',
  accessKeySecret: 'sk',
};

const legacyState = (overrides: Record<string, unknown> = {}) => ({
  version: '4.0',
  scope: { stage: 'dev', region: 'cn-hangzhou' },
  provider: 'aliyun',
  app: 'myapp',
  service: 'myservice',
  stages: {
    dev: { resources: { 'functions.hello': { mode: 'managed' } } },
  },
  resources: {},
  ...overrides,
});

const targetsResponse = {
  app: { name: 'myapp', exists: true, id: 'app-1' },
  service: {
    name: 'myservice',
    exists: true,
    id: 'svc-1',
    provider: 'aliyun',
    regionalScopeEnabled: true,
    scopeProtocol: 3,
  },
  stages: [{ name: 'dev', registered: true, hasState: false, latestVersion: null }],
};

const uploadResponse = {
  stateId: 'st-1',
  versionNumber: 1,
  appId: 'app-1',
  serviceId: 'svc-1',
  deduped: false,
  stageId: 'stage-1',
  provider: 'aliyun',
  region: 'cn-hangzhou',
  scopeProtocol: 3,
};

const MIGRATE_TEST_CREDENTIALS = {
  apiKey: 'si_test_testkey123456789012345678901234',
  consoleUrl: 'https://api.test.com',
  orgId: 'org-1',
};

const MIGRATE_TEST_IDENTITY = {
  orgId: 'org-1',
  orgName: 'Example Org',
  orgSlug: 'example-org',
};

/** Mirror of the command's hash: sha256(JSON.stringify({...state, orgId})) with the mocked toPersistedState. */
const expectedHash = (state: Record<string, unknown>): string =>
  hashSaasState({
    ...state,
    stages: { dev: (state.stages as Record<string, unknown>).dev },
    orgId: 'org-1',
  });

/**
 * Echo-style migration API: every upload is verified against what was posted
 * (the real server contract), so tests assert the multi-stage flow without
 * hand-computing content hashes.
 */
const mockEchoMigrationApi = () => {
  let lastUpload: Record<string, unknown> | undefined;
  mockApiClient.post.mockImplementation(async (_url: string, body: Record<string, unknown>) => {
    lastUpload = body;
    return {
      stateId: `st-${body.stage}`,
      versionNumber: 1,
      appId: 'app-1',
      serviceId: 'svc-1',
      stageId: `stage-${body.stage}`,
      scopeProtocol: 3,
      provider: body.provider,
      region: body.region,
      deduped: false,
    };
  });
  mockApiClient.get.mockImplementation(async (url: string) => {
    if (url === '/api/v1/capabilities') {
      return { regionalScope: true, providerScope: true, scopeProtocol: 3, stateFormat: '4.0' };
    }
    if (url.includes('/state/migrate/targets')) {
      const stage = /stages=([^&]+)/.exec(url)![1]!;
      return {
        app: { name: 'myapp', exists: false, id: null },
        service: {
          name: 'myservice',
          exists: false,
          id: null,
          provider: 'aliyun',
        },
        stages: [
          {
            name: decodeURIComponent(stage),
            registered: false,
            hasState: false,
            latestVersion: null,
          },
        ],
      };
    }
    if (url.includes('/state/current')) {
      const stage = decodeURIComponent(/stage=([^&]+)/.exec(url)![1]!);
      const stages = lastUpload?.stateJson as Record<
        string,
        Record<string, { resources?: unknown }>
      >;
      return {
        id: `st-${stage}`,
        serviceId: 'svc-1',
        stageId: `stage-${stage}`,
        provider: 'aliyun',
        stage,
        region: 'cn-hangzhou',
        scopeProtocol: 3,
        stateJson: lastUpload?.stateJson,
        contentHash: lastUpload?.contentHash,
        versionNumber: 1,
        resourceCount: Object.keys(stages?.[stage]?.resources ?? {}).length,
      };
    }
    return {};
  });
};

const makeSourceBackend = (state: Record<string, unknown> | Error) => ({
  upgradeLegacyState: jest.fn().mockResolvedValue(undefined),
  loadState: jest.fn(
    state instanceof Error
      ? jest.fn().mockRejectedValue(state)
      : jest.fn().mockResolvedValue(state),
  ),
  patchPersisted: jest.fn().mockResolvedValue(undefined),
  withLock: jest.fn(async (_op: string, fn: () => Promise<unknown>) => fn()),
});

type MigrationRunOptions = {
  /** Legacy state returned by the source backend (default: a dev-stage aliyun state). */
  state?: Record<string, unknown>;
  /** Override the /state/migrate/targets response. */
  targets?: Record<string, unknown>;
  /** Override the read-back verification response (default: echo of the uploaded hash). */
  verify?: Record<string, unknown>;
  /** Queue only the targets fetch — for runs that must stop before the upload. */
  planOnly?: boolean;
  /** Reject the upload with this error instead of resolving. */
  uploadError?: unknown;
  /** Simulate a legacy backend that cannot persist the marker. */
  patchable?: boolean;
};

/**
 * Full Console-side migration setup, queued in the order the command consumes
 * it: targets → upload → read-back verify. Returns the source backend.
 */
const setupMigrationRun = (options: MigrationRunOptions = {}) => {
  const state = options.state ?? legacyState();
  const backend = makeSourceBackend(state);
  mockedCreateStateBackend.mockReturnValue(
    options.patchable === false ? { ...backend, patchPersisted: undefined } : backend,
  );
  mockedResolveLineContext.mockResolvedValue({
    line: 'international',
    consoleUrl: 'https://api.test.com',
    apiKey: MIGRATE_TEST_CREDENTIALS.apiKey,
    orgId: MIGRATE_TEST_CREDENTIALS.orgId,
    orgSlug: MIGRATE_TEST_IDENTITY.orgSlug,
    keySource: 'profile',
    lineSource: 'active',
  });
  mockedValidateApiKey.mockResolvedValue(MIGRATE_TEST_IDENTITY);
  mockApiClient.get.mockResolvedValueOnce({
    regionalScope: true,
    providerScope: true,
    scopeProtocol: 3,
    stateFormat: '4.0',
  });
  mockApiClient.get.mockResolvedValueOnce(options.targets ?? targetsResponse);
  if (options.planOnly) {
    return backend;
  }
  if (options.uploadError) {
    mockApiClient.post.mockRejectedValueOnce(options.uploadError);
    return backend;
  }
  mockApiClient.post.mockResolvedValueOnce(uploadResponse);
  mockApiClient.get.mockResolvedValueOnce(
    options.verify ?? {
      id: 'st-1',
      serviceId: 'svc-1',
      stageId: 'stage-1',
      provider: 'aliyun',
      stage: 'dev',
      region: 'cn-hangzhou',
      scopeProtocol: 3,
      stateJson: state,
      contentHash: expectedHash(state),
      versionNumber: 1,
      resourceCount: 1,
    },
  );
  return backend;
};

describe('migrate command', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // clearAllMocks keeps leftover once-implementations; tests consume
    // different prefixes of the get/post queues, so reset them fully.
    mockApiClient.get.mockReset();
    mockApiClient.post.mockReset();
    mockedResolveLineContext.mockResolvedValue({
      line: 'international',
      consoleUrl: 'https://api.test.com',
      apiKey: MIGRATE_TEST_CREDENTIALS.apiKey,
      orgId: MIGRATE_TEST_CREDENTIALS.orgId,
      orgSlug: MIGRATE_TEST_IDENTITY.orgSlug,
      keySource: 'profile',
      lineSource: 'active',
    });
    mockedParseYaml.mockReturnValue(rawIac);
    mockedRevalYaml.mockReturnValue(bucketIac);
    mockedCreateApiClient.mockReturnValue(mockApiClient);
    mockedGetContext.mockReturnValue(mockContext);
  });

  describe('preflight', () => {
    it('rejects a SaaS source backend — there is nothing legacy to migrate', async () => {
      mockedRevalYaml.mockReturnValue({ ...rawIac, backend: { type: 'SAAS' } });

      await expect(migrate({ location: 'stack.yml' })).rejects.toThrow('MIGRATE_NO_BACKEND_SOURCE');
    });

    it('rejects when no Console credentials are available', async () => {
      mockedResolveLineContext.mockRejectedValue(new Error('SAAS_BACKEND_NO_CREDENTIALS'));
      mockedCreateStateBackend.mockReturnValue(makeSourceBackend(legacyState()));

      await expect(migrate({ location: 'stack.yml' })).rejects.toThrow(
        'SAAS_BACKEND_NO_CREDENTIALS',
      );
    });

    it('rejects a console on the wrong line before locking or changing source state', async () => {
      const backend = setupMigrationRun();
      mockedValidateApiKey.mockResolvedValue({ ...MIGRATE_TEST_IDENTITY, region: 'cn' });

      await expect(migrate({ location: 'stack.yml', autoApprove: true })).rejects.toThrow(
        'SAAS_LINE_CONFLICT',
      );
      expect(mockedCreateApiClient).not.toHaveBeenCalled();
      expect(backend.withLock).not.toHaveBeenCalled();
      expect(backend.patchPersisted).not.toHaveBeenCalled();
      expect(mockApiClient.post).not.toHaveBeenCalled();
    });

    it('rejects a --org mismatch with the authenticated key before migration', async () => {
      const backend = setupMigrationRun();
      mockedValidateApiKey.mockResolvedValue({ ...MIGRATE_TEST_IDENTITY, region: 'com' });

      await expect(migrate({ location: 'stack.yml', org: 'other-org' })).rejects.toThrow(
        'SAAS_ORG_MISMATCH',
      );
      expect(mockedCreateApiClient).not.toHaveBeenCalled();
      expect(backend.withLock).not.toHaveBeenCalled();
    });

    it('preflights without cloud credentials (setContext probes nothing)', async () => {
      mockedCreateStateBackend.mockReturnValue(makeSourceBackend(legacyState()));

      await migrate({ location: 'stack.yml', rollback: true }).catch(() => undefined);

      expect(mockedSetContext).toHaveBeenCalledWith(expect.anything(), false);
    });
  });

  describe('rollback', () => {
    it('reports and does nothing when the source state carries no marker', async () => {
      const backend = makeSourceBackend(legacyState());
      mockedCreateStateBackend.mockReturnValue(backend);

      await migrate({ location: 'stack.yml', rollback: true });

      expect(backend.patchPersisted).not.toHaveBeenCalled();
      expect(mockLoggerInfo).toHaveBeenCalledWith('MIGRATE_ROLLBACK_NO_MARKER');
    });

    it('clears the marker so the legacy backend reopens', async () => {
      const backend = makeSourceBackend(legacyState({ managedBy: 'saas' }));
      mockedCreateStateBackend.mockReturnValue(backend);

      await migrate({ location: 'stack.yml', rollback: true });

      expect(backend.patchPersisted).toHaveBeenCalledWith({ managedBy: undefined });
      expect(mockLoggerInfo).toHaveBeenCalledWith('MIGRATE_ROLLBACK_DONE');
      expect(mockLoggerInfo).toHaveBeenCalledWith('MIGRATE_ROLLBACK_DONE_HINT');
    });

    it('requires a patchable source backend to clear the marker', async () => {
      const backend = {
        ...makeSourceBackend(legacyState({ managedBy: 'saas' })),
        patchPersisted: undefined,
      };
      mockedCreateStateBackend.mockReturnValue(backend);

      await expect(migrate({ location: 'stack.yml', rollback: true })).rejects.toThrow(
        'MIGRATE_NO_BACKEND_SOURCE',
      );
    });
  });

  describe('migration run', () => {
    it('prepares source format under the source lock before importing', async () => {
      const backend = setupMigrationRun();
      const prepare = jest.fn().mockResolvedValue(undefined);
      backend.upgradeLegacyState = prepare;

      await migrate({ location: 'stack.yml', autoApprove: true, bindUnknownRegion: 'cn-hangzhou' });

      expect(prepare).toHaveBeenCalledWith({ bindUnknownRegion: 'cn-hangzhou', dryRun: undefined });
      expect(mockApiClient.post).toHaveBeenCalledTimes(1);
    });

    it('does not import or close the source when automatic preparation fails', async () => {
      const backend = setupMigrationRun();
      const failure = new Error('upgrade unavailable');
      backend.upgradeLegacyState = jest.fn().mockRejectedValue(failure);

      await expect(migrate({ location: 'stack.yml', autoApprove: true })).rejects.toBe(failure);

      expect(mockApiClient.post).not.toHaveBeenCalled();
      expect(backend.patchPersisted).not.toHaveBeenCalled();
    });

    it('prepares a source dry-run without performing the upgrade or uploading', async () => {
      const backend = setupMigrationRun({ planOnly: true });
      const prepare = jest.fn().mockResolvedValue(undefined);
      backend.upgradeLegacyState = prepare;

      await migrate({ location: 'stack.yml', autoApprove: true, dryRun: true });

      expect(prepare).toHaveBeenCalledWith({ bindUnknownRegion: undefined, dryRun: true });
      expect(mockApiClient.post).not.toHaveBeenCalled();
      expect(backend.patchPersisted).not.toHaveBeenCalled();
    });

    it('refuses a backend that does not provide the prepared deployment view', async () => {
      const backend = setupMigrationRun({
        state: legacyState({ version: '3.0', scope: undefined }),
        planOnly: true,
      });
      await expect(migrate({ location: 'stack.yml', autoApprove: true })).rejects.toThrow(
        'MIGRATE_SOURCE_FORMAT_INVALID',
      );
      expect(mockApiClient.post).not.toHaveBeenCalled();
      expect(backend.patchPersisted).not.toHaveBeenCalled();
    });

    it('migrates every resource-bearing stage when -s is omitted', async () => {
      const twoStageState = legacyState({
        stages: {
          dev: { resources: { demo: {} } },
          prod: { resources: { other: {} } },
        },
      }) as Record<string, unknown>;
      const backend = setupMigrationRun({ state: twoStageState, planOnly: true });
      // Queue: caps + targets(dev) are already queued by setupMigrationRun.
      mockApiClient.get.mockResolvedValueOnce(targetsResponse); // targets(prod)
      mockApiClient.post.mockResolvedValueOnce(uploadResponse); // upload(dev)
      const devPersisted = {
        ...twoStageState,
        scope: { stage: 'dev', region: 'cn-hangzhou' },
        stages: { dev: (twoStageState.stages as Record<string, unknown>).dev },
        orgId: 'org-1',
      };
      mockApiClient.get.mockResolvedValueOnce({
        id: 'st-1',
        serviceId: 'svc-1',
        stageId: 'stage-1',
        provider: 'aliyun',
        stage: 'dev',
        region: 'cn-hangzhou',
        scopeProtocol: 3,
        stateJson: devPersisted,
        contentHash: hashSaasState(devPersisted),
        versionNumber: 1,
        resourceCount: 1,
      });
      mockApiClient.post.mockResolvedValueOnce({
        ...uploadResponse,
        stateId: 'st-2',
        stageId: 'stage-2',
        versionNumber: 1,
      });
      const prodPersisted = {
        ...twoStageState,
        scope: { stage: 'prod', region: 'cn-hangzhou' },
        stages: { prod: (twoStageState.stages as Record<string, unknown>).prod },
        orgId: 'org-1',
      };
      mockApiClient.get.mockResolvedValueOnce({
        id: 'st-2',
        serviceId: 'svc-1',
        stageId: 'stage-2',
        provider: 'aliyun',
        stage: 'prod',
        region: 'cn-hangzhou',
        scopeProtocol: 3,
        stateJson: prodPersisted,
        contentHash: hashSaasState(prodPersisted),
        versionNumber: 1,
        resourceCount: 1,
      });

      await migrate({ location: 'stack.yml', autoApprove: true });

      expect(mockApiClient.post).toHaveBeenCalledTimes(2);
      const [firstBody, secondBody] = mockApiClient.post.mock.calls.map(
        (call) => call[1] as Record<string, unknown>,
      );
      expect(firstBody.stage).toBe('dev');
      expect(
        Object.keys(
          (firstBody.stateJson as Record<string, unknown>).stages as Record<string, unknown>,
        ),
      ).toEqual(['dev']);
      expect(secondBody.stage).toBe('prod');
      expect(
        Object.keys(
          (secondBody.stateJson as Record<string, unknown>).stages as Record<string, unknown>,
        ),
      ).toEqual(['prod']);
      // Ownership marker written once, after every stage landed.
      expect(backend.patchPersisted).toHaveBeenCalledTimes(1);
      expect(backend.patchPersisted).toHaveBeenCalledWith({
        orgId: 'org-1',
        appId: 'app-1',
        serviceId: 'svc-1',
        managedBy: 'saas',
      });
    });

    it('refuses an explicit -s against a multi-stage source — the marker would strand the others', async () => {
      const backend = setupMigrationRun({
        state: legacyState({
          stages: { dev: { resources: { demo: {} } }, prod: { resources: { other: {} } } },
        }),
        planOnly: true,
      });
      await expect(
        migrate({ location: 'stack.yml', stage: 'dev', autoApprove: true }),
      ).rejects.toThrow('MIGRATE_SOURCE_MULTIPLE_SCOPES');
      expect(backend.patchPersisted).not.toHaveBeenCalled();
      expect(mockApiClient.post).not.toHaveBeenCalled();
    });

    it('dry-run lists every stage without uploading or marking', async () => {
      const backend = setupMigrationRun({
        state: legacyState({
          stages: {
            dev: { resources: { demo: {} } },
            prod: { resources: { other: {} } },
          },
        }),
        planOnly: true,
      });
      mockApiClient.get.mockResolvedValueOnce(targetsResponse); // targets(prod)

      await migrate({ location: 'stack.yml', dryRun: true, autoApprove: true });

      expect(mockApiClient.get).toHaveBeenCalledTimes(3); // capabilities + targets ×2
      expect(mockApiClient.post).not.toHaveBeenCalled();
      expect(backend.patchPersisted).not.toHaveBeenCalled();
    });

    it('plans a shared-only stage with resourceCount zero and auto-creates missing targets', async () => {
      const sharedOnly = legacyState({
        stages: { dev: { shared: { oss_bucket: { name: 'shared-bucket' } } } },
      }) as Record<string, unknown>;
      const backend = setupMigrationRun({ state: sharedOnly, planOnly: true });
      mockEchoMigrationApi();

      await migrate({ location: 'stack.yml', autoApprove: true });

      const body = mockApiClient.post.mock.calls[0]![1] as Record<string, unknown>;
      expect(body.resourceCount).toBe(0);
      expect(body.conflict).toBe('reject');
      expect(backend.patchPersisted).toHaveBeenCalledWith(
        expect.objectContaining({ appId: 'app-1', serviceId: 'svc-1', managedBy: 'saas' }),
      );
    });

    it('uploads with conflict=overwrite under --force and tolerates a deduped echo', async () => {
      const sharedOnly = legacyState({
        stages: { dev: { shared: { oss_bucket: { name: 'shared-bucket' } } } },
      }) as Record<string, unknown>;
      setupMigrationRun({ state: sharedOnly, planOnly: true });
      mockEchoMigrationApi();

      await migrate({ location: 'stack.yml', force: true, autoApprove: true });

      const body = mockApiClient.post.mock.calls[0]![1] as Record<string, unknown>;
      expect(body.conflict).toBe('overwrite');
    });

    it('uploads a shared-only stage snapshot whose verify echoes the computed hash', async () => {
      const sharedOnly = legacyState({
        stages: { dev: { shared: { oss_bucket: { name: 'shared-bucket' } } } },
      }) as Record<string, unknown>;
      setupMigrationRun({ state: sharedOnly, planOnly: true });
      mockEchoMigrationApi();

      const result = await migrate({ location: 'stack.yml', force: true, autoApprove: true });
      void result;
      // Echo verification passed: the read-back matched the computed hash.
      expect(mockApiClient.post).toHaveBeenCalledTimes(1);
    });

    it('does not implicitly activate an existing legacy destination', async () => {
      const backend = setupMigrationRun({
        targets: {
          ...targetsResponse,
          service: { ...targetsResponse.service, regionalScopeEnabled: false, scopeProtocol: 1 },
        },
        planOnly: true,
      });
      await expect(migrate({ location: 'stack.yml', autoApprove: true })).rejects.toThrow(
        'MIGRATE_TARGET_REGIONAL_REQUIRED',
      );
      expect(mockApiClient.post).not.toHaveBeenCalled();
      expect(backend.patchPersisted).not.toHaveBeenCalled();
    });

    it('rejects incompatible server capabilities before inspecting migration targets', async () => {
      setupMigrationRun();
      mockApiClient.get.mockReset().mockResolvedValueOnce({
        regionalScope: true,
        providerScope: true,
        scopeProtocol: 1,
        stateFormat: '4.0',
      });
      await expect(migrate({ location: 'stack.yml', autoApprove: true })).rejects.toThrow(
        'SAAS_REGIONAL_SCOPE_UNSUPPORTED',
      );
      expect(mockApiClient.get).toHaveBeenCalledTimes(1);
      expect(mockApiClient.post).not.toHaveBeenCalled();
    });

    it('keeps the source writable when read-back authority belongs to a different region', async () => {
      const backend = setupMigrationRun({
        verify: {
          id: 'st-1',
          serviceId: 'svc-1',
          stageId: 'stage-1',
          provider: 'aliyun',
          stage: 'dev',
          region: 'cn-beijing',
          scopeProtocol: 3,
          contentHash: expectedHash(legacyState()),
          versionNumber: 1,
          resourceCount: 1,
        },
      });
      await expect(migrate({ location: 'stack.yml', autoApprove: true })).rejects.toThrow(
        'MIGRATE_VERIFY_FAILED',
      );
      expect(backend.patchPersisted).not.toHaveBeenCalled();
    });

    it('uploads every non-empty stage, verifies read-back and writes the marker', async () => {
      const backend = setupMigrationRun();

      await migrate({ location: 'stack.yml', autoApprove: true });

      expect(mockApiClient.post).toHaveBeenCalledWith(
        '/api/v1/state/migrate',
        expect.objectContaining({
          appName: 'myapp',
          serviceName: 'myservice',
          provider: 'aliyun',
          stage: 'dev',
          region: 'cn-hangzhou',
          scopeProtocol: 3,
          baseContentHash: '',
          origin: 'bucket',
          conflict: 'reject',
          resourceCount: 1,
        }),
      );
      // The uploaded version carries the owning org id immediately (D-6 anchor)
      const body = mockApiClient.post.mock.calls[0][1] as Record<string, unknown>;
      expect((body.stateJson as Record<string, unknown>).orgId).toBe('org-1');
      expect(backend.patchPersisted).toHaveBeenCalledWith({
        orgId: 'org-1',
        appId: 'app-1',
        serviceId: 'svc-1',
        managedBy: 'saas',
      });
      expect(mockLoggerInfo).toHaveBeenCalledWith('MIGRATE_MARKER_WRITTEN');
      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('MIGRATE_CUTOVER_STEPS'));
    });

    it('shows the resolved targets with exists/create markers before confirming', async () => {
      setupMigrationRun();

      await migrate({ location: 'stack.yml', autoApprove: true });

      expect(mockLoggerInfo).toHaveBeenCalledWith(
        expect.stringContaining('MIGRATE_TARGETS_HEADER'),
      );
      expect(mockLoggerInfo).toHaveBeenCalledWith(
        expect.stringContaining('MIGRATE_TARGET_APP_EXISTS'),
      );
      expect(mockLoggerInfo).toHaveBeenCalledWith(
        expect.stringContaining('MIGRATE_TARGET_SERVICE_EXISTS'),
      );
      expect(mockLoggerInfo).toHaveBeenCalledWith(
        expect.stringContaining('MIGRATE_TARGET_STAGE_EMPTY'),
      );
      expect(mockLoggerInfo).toHaveBeenCalledWith('MIGRATE_TARGETS_HINT');
    });

    it('uploads with conflict=overwrite when --force is passed', async () => {
      setupMigrationRun({
        targets: {
          ...targetsResponse,
          stages: [
            {
              name: 'dev',
              registered: true,
              hasState: true,
              latestVersion: 3,
              contentHash: 'base-hash',
            },
          ],
        },
      });

      await migrate({ location: 'stack.yml', autoApprove: true, force: true });

      expect(mockApiClient.post).toHaveBeenCalledWith(
        '/api/v1/state/migrate',
        expect.objectContaining({ conflict: 'overwrite' }),
      );
      expect(mockLoggerInfo).toHaveBeenCalledWith(
        expect.stringContaining('MIGRATE_TARGET_STAGE_EXISTS'),
      );
    });

    it('stops at the plan in dry-run mode and writes nothing to either side', async () => {
      const backend = setupMigrationRun({ planOnly: true });

      await migrate({ location: 'stack.yml', autoApprove: true, dryRun: true });

      expect(mockApiClient.post).not.toHaveBeenCalled();
      expect(backend.patchPersisted).not.toHaveBeenCalled();
      expect(mockLoggerInfo).toHaveBeenCalledWith('MIGRATE_DRY_RUN_NOTICE');
    });

    it('skips stages without resources', async () => {
      setupMigrationRun({
        state: legacyState({
          stages: {
            dev: { resources: { 'functions.hello': { mode: 'managed' } } },
            prod: { resources: {} },
          },
        }),
      });

      await migrate({ location: 'stack.yml', autoApprove: true });

      const targetsUrl = mockApiClient.get.mock.calls[1][0] as string;
      expect(targetsUrl).toContain('stages=dev');
      expect(mockApiClient.post).toHaveBeenCalledTimes(1);
    });

    it.each([
      'Upgrade the deployment protocol before importing state.',
      'The destination changed. Refresh the migration plan and retry.',
      'The destination contains state. Use --force to import a new version.',
    ])('preserves the server conflict without writing a marker: %s', async (message) => {
      const error = new ApiError(message, 409);
      const backend = setupMigrationRun({ uploadError: error });

      await expect(migrate({ location: 'stack.yml', autoApprove: true })).rejects.toBe(error);
      expect(backend.patchPersisted).not.toHaveBeenCalled();
      expect(mockApiClient.get).toHaveBeenCalledTimes(2);
    });

    it('fails when the read-back does not match what was uploaded', async () => {
      const backend = setupMigrationRun({
        verify: { contentHash: 'tampered', versionNumber: 1, resourceCount: 1 },
      });

      await expect(migrate({ location: 'stack.yml', autoApprove: true })).rejects.toThrow(
        'MIGRATE_VERIFY_FAILED',
      );
      expect(backend.patchPersisted).not.toHaveBeenCalled();
    });

    it('rejects when the legacy state belongs to a different provider', async () => {
      setupMigrationRun({ state: legacyState({ provider: 'tencent' }), planOnly: true });

      await expect(migrate({ location: 'stack.yml', autoApprove: true })).rejects.toThrow(
        'State identity mismatch',
      );
    });

    it('rejects when an existing console service runs a different provider', async () => {
      setupMigrationRun({
        planOnly: true,
        targets: {
          ...targetsResponse,
          service: { name: 'myservice', exists: true, id: 'svc-1', provider: 'tencent' },
        },
      });

      await expect(migrate({ location: 'stack.yml', autoApprove: true })).rejects.toThrow(
        'MIGRATE_TARGET_REGIONAL_REQUIRED',
      );
    });

    it('reports nothing to migrate when no stage holds resources', async () => {
      setupMigrationRun({
        state: legacyState({ stages: { dev: { resources: {} } } }),
        planOnly: true,
      });

      await expect(migrate({ location: 'stack.yml', autoApprove: true })).rejects.toThrow(
        'MIGRATE_NOTHING_TO_MIGRATE',
      );
    });

    it('rejects an explicit stage that the legacy state does not know', async () => {
      setupMigrationRun({ planOnly: true });

      mockedGetContext.mockReturnValue({ ...mockContext, stage: 'staging' });
      await expect(
        migrate({ location: 'stack.yml', stage: 'staging', autoApprove: true }),
      ).rejects.toThrow('State identity mismatch');
    });

    it('skips the marker when --no-marker is passed', async () => {
      const backend = setupMigrationRun();

      await migrate({ location: 'stack.yml', autoApprove: true, noMarker: true });

      expect(backend.patchPersisted).not.toHaveBeenCalled();
      expect(mockLoggerWarn).toHaveBeenCalledWith('MIGRATE_MARKER_SKIPPED');
    });

    it('uploads origin=local for a LOCAL backend', async () => {
      mockedRevalYaml.mockReturnValue({ ...rawIac, backend: { type: 'LOCAL' } });
      setupMigrationRun();

      await migrate({ location: 'stack.yml', autoApprove: true });

      expect(mockApiClient.post).toHaveBeenCalledWith(
        '/api/v1/state/migrate',
        expect.objectContaining({ origin: 'local' }),
      );
    });

    it('renders create-plan lines for targets that do not exist yet', async () => {
      setupMigrationRun({
        targets: {
          app: { name: 'myapp', exists: false, id: null },
          service: { name: 'myservice', exists: false, id: null, provider: null },
          stages: [{ name: 'dev', registered: false, hasState: false, latestVersion: null }],
        },
      });

      await migrate({ location: 'stack.yml', autoApprove: true });

      expect(mockLoggerInfo).toHaveBeenCalledWith(
        expect.stringContaining('MIGRATE_TARGET_APP_CREATE'),
      );
      expect(mockLoggerInfo).toHaveBeenCalledWith(
        expect.stringContaining('MIGRATE_TARGET_SERVICE_CREATE'),
      );
      expect(mockLoggerInfo).toHaveBeenCalledWith(
        expect.stringContaining('MIGRATE_TARGET_STAGE_NEW'),
      );
    });

    it('keeps an already transferred source closed on an idempotent re-run)', async () => {
      const backend = setupMigrationRun({ state: legacyState({ managedBy: 'saas' }) });

      await migrate({ location: 'stack.yml', autoApprove: true });

      expect(mockLoggerWarn).toHaveBeenCalledWith('MIGRATE_ALREADY_MARKED');
      expect(backend.patchPersisted).not.toHaveBeenCalled();
      expect(mockApiClient.post).not.toHaveBeenCalled();
    });

    it('rethrows non-conflict upload errors untouched', async () => {
      setupMigrationRun({ uploadError: new ApiError('boom', 500) });

      await expect(migrate({ location: 'stack.yml', autoApprove: true })).rejects.toThrow('boom');
    });

    it('requires a patchable source backend to write the marker', async () => {
      setupMigrationRun({ patchable: false });

      await expect(migrate({ location: 'stack.yml', autoApprove: true })).rejects.toThrow(
        'MIGRATE_NO_BACKEND_SOURCE',
      );
    });
  });

  describe('interactive confirmation', () => {
    // isTTY is a read-only inherited getter when stdin is a TTY — shadow it
    // with a configurable own property and remove it afterwards.
    const setStdinTty = (value: boolean) => {
      Object.defineProperty(process.stdin, 'isTTY', { value, configurable: true });
    };

    afterEach(() => {
      try {
        delete (process.stdin as { isTTY?: boolean }).isTTY;
      } catch {
        // stdin without an own isTTY — nothing to clean up
      }
      mockReadlineAnswers.length = 0;
    });

    it('refuses to prompt when stdin is not a TTY', async () => {
      setStdinTty(false);
      setupMigrationRun();

      await expect(migrate({ location: 'stack.yml' })).rejects.toThrow(
        'CONFIRMATION_STDIN_NOT_TTY',
      );
    });

    it('proceeds when both confirmations are accepted', async () => {
      setStdinTty(true);
      mockReadlineAnswers.push('y', 'y');
      const backend = setupMigrationRun();

      await migrate({ location: 'stack.yml' });

      expect(mockApiClient.post).toHaveBeenCalled();
      expect(backend.patchPersisted).toHaveBeenCalledWith(
        expect.objectContaining({ managedBy: 'saas' }),
      );
    });

    it('aborts before the upload when the writer confirmation is declined', async () => {
      setStdinTty(true);
      mockReadlineAnswers.push('n');
      const backend = setupMigrationRun();

      await migrate({ location: 'stack.yml' });

      expect(mockApiClient.post).not.toHaveBeenCalled();
      expect(backend.patchPersisted).not.toHaveBeenCalled();
    });

    it('aborts before the upload when the plan confirmation is declined', async () => {
      setStdinTty(true);
      mockReadlineAnswers.push('y', 'nope');
      const backend = setupMigrationRun();

      await migrate({ location: 'stack.yml' });

      expect(mockApiClient.post).not.toHaveBeenCalled();
      expect(backend.patchPersisted).not.toHaveBeenCalled();
    });
  });
});
