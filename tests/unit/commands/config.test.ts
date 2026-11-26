jest.mock('../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

jest.mock('../../../src/lang', () => ({
  lang: {
    __: (key: string, vars?: Record<string, string>) =>
      vars ? `${key}:${JSON.stringify(vars)}` : key,
  },
}));

jest.mock('../../../src/common/lineContext', () => ({
  resolveLineContext: jest.fn(async () => ({
    line: 'com',
    consoleUrl: 'https://console.example.test',
    apiKey: 'si_com_abc_secret',
    orgId: 'org-1',
    orgSlug: 'my-org',
  })),
}));

jest.mock('../../../src/common/apiClient', () => ({
  validateApiKey: jest.fn(async () => ({ orgId: 'org-1', orgSlug: 'my-org', region: 'com' })),
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

jest.mock('../../../src/common/configClient', () => ({
  createConfigClient: jest.fn(async () => ({
    client: mockClient,
    consoleUrl: 'https://console.example.test',
    orgId: 'org-1',
  })),
  resolveTargetIds: jest.fn(async () => ({ appId: 'app-1', serviceId: 'svc-1' })),
  resolveConfigRefsViaSaas: jest.fn(async () => new Map()),
}));

const mockReadlineAnswers: string[] = [];
jest.mock('node:readline', () => ({
  createInterface: jest.fn(() => ({
    question: jest.fn((_query: string, callback: (answer: string) => void) => {
      callback(mockReadlineAnswers.length > 0 ? mockReadlineAnswers.shift()! : '');
    }),
    close: jest.fn(),
    output: { write: jest.fn() },
  })),
}));

jest.mock('../../../src/parser', () => ({
  parseYaml: jest.fn(() => ({
    app: 'demo-app',
    service: 'demo-service',
    org: 'my-org',
    provider: { name: 'aliyun', region: 'cn-hangzhou' },
    stages: {},
    backend: { type: 'SAAS' },
  })),
}));

jest.mock('../../../src/common/context', () => ({
  getContext: jest.fn(() => ({ stage: 'prod', provider: 'aliyun', region: 'cn-hangzhou' })),
  setContext: jest.fn(async () => undefined),
  getIacLocation: jest.fn((location?: string) => location ?? '/tmp/serverlessinsight.yml'),
}));

import { PassThrough } from 'node:stream';
import { logger } from '../../../src/common/logger';
import {
  configList,
  configSet,
  configVersions,
  configRelease,
  configTag,
  configDelete,
  writeLocalConfigSnapshot,
} from '../../../src/commands/config';

const mockClientObject = mockClient as jest.Mocked<typeof mockClient>;

const baseOptions = {
  location: '/tmp/serverlessinsight.yml',
  stage: 'prod',
  siApiKey: 'si_com_abc_secret',
};

describe('si config command group (epic #53 P1)', () => {
  const originalIsTTY = Object.getOwnPropertyDescriptor(process.stdin, 'isTTY');
  let stderrWriteSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    mockReadlineAnswers.length = 0;
    Object.defineProperty(process.stdin, 'isTTY', { value: true, configurable: true });
    stderrWriteSpy = jest.spyOn(process.stderr, 'write').mockImplementation(() => true);
  });

  afterEach(() => {
    stderrWriteSpy.mockRestore();
    if (originalIsTTY) {
      Object.defineProperty(process.stdin, 'isTTY', originalIsTTY);
    }
  });

  describe('configList', () => {
    it('lists config sets of the yaml app', async () => {
      mockClientObject.get.mockResolvedValueOnce([
        {
          id: 'cs-1',
          name: 'db',
          scope: 'stage',
          stage: 'prod',
          updatedAt: '2026-11-19T00:00:00Z',
        },
        {
          id: 'cs-2',
          name: 'shared',
          scope: 'org',
          stage: null,
          updatedAt: '2026-11-18T00:00:00Z',
        },
      ]);
      await configList(baseOptions);
      expect(mockClientObject.get).toHaveBeenCalledWith('/api/v1/config-sets?appId=app-1');
      expect(logger.info).toHaveBeenCalledWith(expect.stringContaining('db'));
      expect(logger.info).toHaveBeenCalledWith(expect.stringContaining('shared'));
    });

    it('says so when the app does not exist yet', async () => {
      const { resolveTargetIds } = await import('../../../src/common/configClient');
      (resolveTargetIds as jest.Mock).mockResolvedValueOnce({ appId: null, serviceId: null });
      await configList(baseOptions);
      expect(logger.info).toHaveBeenCalledWith(expect.stringContaining('CONFIG_LIST_NO_APP'));
    });
  });

  describe('configSet', () => {
    it('creates a fresh stage-scoped set when the set does not exist', async () => {
      mockReadlineAnswers.push('sup3r-s3cret');
      mockClientObject.get.mockResolvedValueOnce([]); // no existing sets
      mockClientObject.post.mockResolvedValueOnce({ id: 'cs-new', name: 'db' });
      await configSet('db.password', { ...baseOptions, stage: 'prod', type: 'secret' });
      expect(mockClientObject.post).toHaveBeenCalledWith(
        '/api/v1/config-sets',
        expect.objectContaining({
          name: 'db',
          scope: 'stage',
          appId: 'app-1',
          serviceId: 'svc-1',
          stage: 'prod',
          items: [{ key: 'password', value: 'sup3r-s3cret', type: 'secret' }],
        }),
      );
      expect(logger.info).toHaveBeenCalledWith(expect.stringContaining('CONFIG_SET_CREATED'));
    });

    it('merges into the matching scope/stage set and forwards description', async () => {
      mockReadlineAnswers.push('db.prod.internal');
      mockClientObject.get.mockResolvedValueOnce([
        { id: 'cs-org', name: 'db', scope: 'org', stage: null },
        { id: 'cs-dev', name: 'db', scope: 'stage', serviceId: 'svc-1', stage: 'dev' },
        { id: 'cs-prod', name: 'db', scope: 'stage', serviceId: 'svc-1', stage: 'prod' },
      ]);
      mockClientObject.put.mockResolvedValueOnce({ id: 'cs-prod' });
      await configSet('db.host', { ...baseOptions, stage: 'prod', description: 'prod DB host' });
      expect(mockClientObject.put).toHaveBeenCalledWith(
        '/api/v1/config-sets/cs-prod',
        expect.objectContaining({
          items: [
            {
              key: 'host',
              value: 'db.prod.internal',
              type: 'string',
              description: 'prod DB host',
            },
          ],
          mergeWithLatest: true,
        }),
      );
    });

    it('creates a stage-scoped set instead of hijacking an existing service-scoped set of the same name', async () => {
      mockReadlineAnswers.push('prod-secret');
      mockClientObject.get.mockResolvedValueOnce([
        { id: 'cs-svc', name: 'db', scope: 'service', serviceId: 'svc-1', stage: null },
      ]);
      mockClientObject.post.mockResolvedValueOnce({ id: 'cs-prod', name: 'db' });
      await configSet('db.password', { ...baseOptions, stage: 'prod', type: 'secret' });
      expect(mockClientObject.put).not.toHaveBeenCalled();
      expect(mockClientObject.post).toHaveBeenCalledWith(
        '/api/v1/config-sets',
        expect.objectContaining({
          name: 'db',
          scope: 'stage',
          stage: 'prod',
          serviceId: 'svc-1',
        }),
      );
    });

    it('reads the value from stdin with --stdin', async () => {
      const originalStdin = process.stdin;
      const fakeStdin = new PassThrough();
      Object.defineProperty(process, 'stdin', { value: fakeStdin, configurable: true });
      try {
        fakeStdin.write('stdin-secret\n');
        fakeStdin.end();
        mockClientObject.get.mockResolvedValueOnce([]);
        mockClientObject.post.mockResolvedValueOnce({ id: 'cs-stdin', name: 'tokens' });
        await configSet('tokens.api_key', { ...baseOptions, stdin: true, type: 'secret' });
        expect(mockClientObject.post).toHaveBeenCalledWith(
          '/api/v1/config-sets',
          expect.objectContaining({
            items: [{ key: 'api_key', value: 'stdin-secret', type: 'secret' }],
          }),
        );
      } finally {
        Object.defineProperty(process, 'stdin', { value: originalStdin, configurable: true });
      }
    });

    it('rejects malformed refs, invalid types, invalid scopes, and non-TTY prompts', async () => {
      await expect(configSet('noref', baseOptions)).rejects.toThrow(/CONFIG_SET_REF_INVALID/);
      await expect(configSet('a.b.c', baseOptions)).rejects.toThrow(/CONFIG_SET_REF_INVALID/);
      await expect(configSet('db.host', { ...baseOptions, type: 'bogus' })).rejects.toThrow(
        /CONFIG_SET_INVALID_TYPE/,
      );
      await expect(configSet('db.host', { ...baseOptions, scope: 'global' })).rejects.toThrow(
        /CONFIG_SET_INVALID_SCOPE/,
      );
      Object.defineProperty(process.stdin, 'isTTY', { value: false, configurable: true });
      await expect(configSet('db.host', baseOptions)).rejects.toThrow(/CONFIG_SET_STDIN_NOT_TTY/);
    });
  });

  describe('configVersions', () => {
    it('prints version rows with tags', async () => {
      mockClientObject.get
        .mockResolvedValueOnce([
          { id: 'cs-1', name: 'db', scope: 'stage', serviceId: 'svc-1', stage: 'prod' },
        ])
        .mockResolvedValueOnce({
          configSet: { id: 'cs-1', name: 'db', scope: 'stage', stage: 'prod', updatedAt: '' },
          versions: [
            {
              versionNumber: 2,
              tags: ['latest'],
              items: [{ key: 'a', value: 'b', type: 'string' }],
            },
            { versionNumber: 1, tags: [], items: [{ key: 'a', value: 'old', type: 'string' }] },
          ],
        });
      await configVersions('db', baseOptions);
      expect(logger.info).toHaveBeenCalledWith(expect.stringContaining('CONFIG_VERSIONS_ROW'));
      expect(logger.info).toHaveBeenCalledTimes(2);
    });

    it('fails with CONFIG_SET_AMBIGUOUS when multiple sets match without --stage or --scope', async () => {
      mockClientObject.get.mockResolvedValueOnce([
        { id: 'cs-dev', name: 'db', scope: 'stage', serviceId: 'svc-1', stage: 'dev' },
        { id: 'cs-prod', name: 'db', scope: 'stage', serviceId: 'svc-1', stage: 'prod' },
      ]);
      await expect(
        configVersions('db', { location: baseOptions.location, siApiKey: baseOptions.siApiKey }),
      ).rejects.toThrow(/CONFIG_SET_AMBIGUOUS/);
    });

    it('fails when the set does not exist', async () => {
      mockClientObject.get.mockResolvedValueOnce([]);
      await expect(configVersions('nope', baseOptions)).rejects.toThrow(/CONFIG_SET_NOT_FOUND/);
    });
  });

  describe('configRelease', () => {
    it('moves the latest tag to the requested version (rollback = lower version)', async () => {
      mockClientObject.get
        .mockResolvedValueOnce([
          { id: 'cs-1', name: 'db', scope: 'stage', serviceId: 'svc-1', stage: 'prod' },
        ])
        .mockResolvedValueOnce({
          configSet: { id: 'cs-1', name: 'db', scope: 'stage', stage: 'prod', updatedAt: '' },
          versions: [
            { versionNumber: 2, tags: ['latest'], items: [] },
            { versionNumber: 1, tags: [], items: [] },
          ],
        });
      await configRelease('db', { ...baseOptions, version: 1 });
      expect(mockClientObject.post).toHaveBeenCalledWith('/api/v1/config-sets/cs-1/tag', {
        versionNumber: 1,
        tag: 'latest',
      });
      expect(logger.info).toHaveBeenCalledWith(expect.stringContaining('CONFIG_RELEASED'));
    });

    it('rejects non-positive or NaN versions before making API calls', async () => {
      await expect(configRelease('db', { ...baseOptions, version: Number.NaN })).rejects.toThrow(
        /CONFIG_VERSION_INVALID/,
      );
      await expect(configRelease('db', { ...baseOptions, version: 0 })).rejects.toThrow(
        /CONFIG_VERSION_INVALID/,
      );
      expect(mockClientObject.get).not.toHaveBeenCalled();
    });

    it('warns without --version when already latest', async () => {
      mockClientObject.get
        .mockResolvedValueOnce([
          { id: 'cs-1', name: 'db', scope: 'stage', serviceId: 'svc-1', stage: 'prod' },
        ])
        .mockResolvedValueOnce({
          configSet: { id: 'cs-1', name: 'db', scope: 'stage', stage: 'prod', updatedAt: '' },
          versions: [{ versionNumber: 2, tags: ['latest'], items: [] }],
        });
      await configRelease('db', baseOptions);
      expect(logger.warn).toHaveBeenCalledWith(
        expect.stringContaining('CONFIG_RELEASE_ALREADY_LATEST'),
      );
      expect(mockClientObject.post).not.toHaveBeenCalled();
    });
  });

  describe('configTag', () => {
    it('attaches a named tag to a version scoped by --scope', async () => {
      mockClientObject.get.mockResolvedValueOnce([
        { id: 'cs-org', name: 'db', scope: 'org', stage: null },
        { id: 'cs-svc', name: 'db', scope: 'service', serviceId: 'svc-1', stage: null },
      ]);
      await configTag('db', {
        location: baseOptions.location,
        siApiKey: baseOptions.siApiKey,
        scope: 'org',
        version: 2,
        tag: 'production',
      });
      expect(mockClientObject.post).toHaveBeenCalledWith('/api/v1/config-sets/cs-org/tag', {
        versionNumber: 2,
        tag: 'production',
      });
    });
  });

  describe('configDelete', () => {
    it('removes the key through a server-side merge targeting the exact stage set', async () => {
      mockClientObject.get.mockResolvedValueOnce([
        { id: 'cs-dev', name: 'db', scope: 'stage', serviceId: 'svc-1', stage: 'dev' },
        { id: 'cs-prod', name: 'db', scope: 'stage', serviceId: 'svc-1', stage: 'prod' },
      ]);
      await configDelete('db.host', { ...baseOptions, stage: 'prod' });
      expect(mockClientObject.put).toHaveBeenCalledWith(
        '/api/v1/config-sets/cs-prod',
        expect.objectContaining({ items: [], mergeWithLatest: true, removeKeys: ['host'] }),
      );
    });
  });

  describe('coverage-completion branches', () => {
    it('configList handles an empty set list', async () => {
      mockClientObject.get.mockResolvedValueOnce([]);
      await configList(baseOptions);
      expect(logger.info).toHaveBeenCalledWith(expect.stringContaining('CONFIG_LIST_EMPTY'));
    });

    it('configSet rejects when the service context is missing for a fresh set', async () => {
      const { resolveTargetIds } = await import('../../../src/common/configClient');
      (resolveTargetIds as jest.Mock).mockResolvedValueOnce({ appId: 'app-1', serviceId: null });
      mockReadlineAnswers.push('v');
      mockClientObject.get.mockResolvedValueOnce([]);
      await expect(configSet('db.host', baseOptions)).rejects.toThrow(/CONFIG_SET_NO_SERVICE/);
    });

    it('promptHiddenValue displays prompt to stderr before suppressing echoed characters', async () => {
      mockReadlineAnswers.push('typed-secret');
      mockClientObject.get.mockResolvedValueOnce([
        { id: 'cs-1', name: 'db', scope: 'stage', serviceId: 'svc-1', stage: 'prod' },
      ]);
      mockClientObject.put.mockResolvedValueOnce({ id: 'cs-1' });
      await configSet('db.host', baseOptions);
      expect(stderrWriteSpy).toHaveBeenCalledWith('CONFIG_SET_VALUE_PROMPT');
      const { createInterface } = await import('node:readline');
      const stub = (createInterface as jest.Mock).mock.results.at(-1)!.value;
      // The suppression hook must forward only line terminations.
      stub._writeToOutput('typed'); // no newline — swallowed
      expect(stub.output.write).not.toHaveBeenCalledWith('typed');
      stub._writeToOutput('\n'); // completion — flushed
      expect(stub.output.write).toHaveBeenCalledWith('\n');
    });

    it('configDelete rejects malformed and dotted refs consistently with configSet', async () => {
      await expect(configDelete('noref', baseOptions)).rejects.toThrow(/CONFIG_SET_REF_INVALID/);
      await expect(configDelete('a.b.c', baseOptions)).rejects.toThrow(/CONFIG_SET_REF_INVALID/);
    });
  });

  describe('yamlScope option branches', () => {
    it('handles a call without any optional options (undefined paths in setContext)', async () => {
      mockClientObject.get.mockResolvedValueOnce([]);
      await configList({ location: '/tmp/serverlessinsight.yml' });
      const { setContext } = await import('../../../src/common/context');
      // undefined option keys are simply absent from the spread — assert the
      // resolved shape rather than literal undefined keys.
      expect(setContext).toHaveBeenCalledWith(expect.not.objectContaining({ stage: 'prod' }));
      expect(setContext).toHaveBeenCalledTimes(1);
    });

    it('forwards --org and --line flags into the SaaS client', async () => {
      const { createConfigClient } = await import('../../../src/common/configClient');
      mockClientObject.get.mockResolvedValueOnce([]);
      await configList({ ...baseOptions, org: 'flag-org', line: 'china' });
      expect(createConfigClient).toHaveBeenCalledWith(
        expect.objectContaining({ org: 'flag-org', line: 'china', declaredOrg: 'my-org' }),
      );
    });
  });

  describe('writeLocalConfigSnapshot', () => {
    it('writes the snapshot the runtime SDK reads in local mode', async () => {
      const fs = await import('node:fs');
      const path = await import('node:path');
      const os = await import('node:os');
      const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'si-local-config-'));
      const file = await writeLocalConfigSnapshot(
        {
          stage: 'prod',
          snapshotVersion: 5,
          entries: [{ key: 'db.host', value: 'localhost', secret: false }],
        },
        tmpDir,
      );
      expect(file).toBe(path.join(tmpDir, '.serverlessinsight', 'local-config.json'));
      const content = JSON.parse(fs.readFileSync(file, 'utf-8')) as {
        snapshotVersion: number;
        entries: Array<{ key: string }>;
      };
      expect(content.snapshotVersion).toBe(5);
      expect(content.entries[0]!.key).toBe('db.host');
      if (process.platform !== 'win32') {
        expect(fs.statSync(file).mode & 0o777).toBe(0o600);
      }
      fs.rmSync(tmpDir, { recursive: true, force: true });
    });
  });
});
