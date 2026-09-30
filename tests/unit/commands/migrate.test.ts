import crypto from 'node:crypto';
import { migrate } from '../../../src/commands/migrate';
import { createStateBackend } from '../../../src/common/stateBackend';
import { loadCredentials, getConsoleUrl } from '../../../src/common/credentialStore';
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
  createStateBackend: jest.fn(),
}));

jest.mock('../../../src/common/credentialStore', () => ({
  loadCredentials: jest.fn(),
  getConsoleUrl: jest.fn(),
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
const mockedLoadCredentials = loadCredentials as jest.Mock;
const mockedGetConsoleUrl = getConsoleUrl as jest.Mock;
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
  version: '3.0',
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
  service: { name: 'myservice', exists: true, id: 'svc-1', provider: 'aliyun' },
  stages: [{ name: 'dev', registered: true, hasState: false, latestVersion: null }],
};

const uploadResponse = {
  stateId: 'st-1',
  versionNumber: 1,
  appId: 'app-1',
  serviceId: 'svc-1',
  deduped: false,
};

const MIGRATE_TEST_CREDENTIALS = {
  apiKey: 'si_test_testkey123456789012345678901234',
  consoleUrl: 'https://api.test.com',
  orgId: 'org-1',
};

const MIGRATE_TEST_IDENTITY = {
  orgId: 'org-1',
  orgName: 'Wentsen',
  orgSlug: 'wentsen',
};

/** Mirror of the command's hash: sha256(JSON.stringify({...state, orgId})) with the mocked toPersistedState. */
const expectedHash = (state: Record<string, unknown>): string =>
  crypto
    .createHash('sha256')
    .update(JSON.stringify({ ...state, orgId: 'org-1' }))
    .digest('hex');

const makeSourceBackend = (state: Record<string, unknown> | Error) => ({
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
  mockedLoadCredentials.mockReturnValue(MIGRATE_TEST_CREDENTIALS);
  mockedValidateApiKey.mockResolvedValue(MIGRATE_TEST_IDENTITY);
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
    mockedGetConsoleUrl.mockReturnValue('https://api.test.com');
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
      mockedLoadCredentials.mockReturnValue(null);
      mockedCreateStateBackend.mockReturnValue(makeSourceBackend(legacyState()));

      await expect(migrate({ location: 'stack.yml' })).rejects.toThrow('MIGRATE_NEED_CREDENTIALS');
    });

    it('preflights without cloud credentials (setContext probes nothing)', async () => {
      mockedLoadCredentials.mockReturnValue(null);
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
          stages: [{ name: 'dev', registered: true, hasState: true, latestVersion: 3 }],
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

      const targetsUrl = mockApiClient.get.mock.calls[0][0] as string;
      expect(targetsUrl).toContain('stages=dev');
      expect(mockApiClient.post).toHaveBeenCalledTimes(1);
    });

    it('survives a 409 conflict with a dedicated message and no marker', async () => {
      const backend = setupMigrationRun({ uploadError: new ApiError('conflict', 409) });

      await expect(migrate({ location: 'stack.yml', autoApprove: true })).rejects.toThrow(
        'MIGRATE_CONFLICT',
      );
      expect(backend.patchPersisted).not.toHaveBeenCalled();
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
        'MIGRATE_PROVIDER_MISMATCH',
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
        'MIGRATE_PROVIDER_MISMATCH_TARGET',
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

      await expect(
        migrate({ location: 'stack.yml', stage: 'staging', autoApprove: true }),
      ).rejects.toThrow('MIGRATE_STAGE_NOT_FOUND');
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

    it('warns but continues when the legacy state is already marked (idempotent re-run)', async () => {
      const backend = setupMigrationRun({ state: legacyState({ managedBy: 'saas' }) });

      await migrate({ location: 'stack.yml', autoApprove: true });

      expect(mockLoggerWarn).toHaveBeenCalledWith('MIGRATE_ALREADY_MARKED');
      expect(backend.patchPersisted).toHaveBeenCalled();
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
