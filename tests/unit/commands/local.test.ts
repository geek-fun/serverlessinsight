import { runLocal } from '../../../src/commands/local';
import { getContext, getIacLocation, setContext, setIac } from '../../../src/common';
import { parseYaml, revalYaml } from '../../../src/parser';
import { startLocalStack } from '../../../src/stack/localStack';
import { ProviderEnum } from '../../../src/common/providerEnum';
import { Context, ServerlessIac } from '../../../src/types';

const mockLoggerInfo = jest.fn();
jest.mock('../../../src/common', () => ({
  getIacLocation: jest.fn(),
  setContext: jest.fn(),
  getContext: jest.fn(),
  setIac: jest.fn(),
  logger: {
    info: (...args: unknown[]) => mockLoggerInfo(...args),
    warn: (...args: unknown[]) => mockLoggerInfo(...args),
  },
}));
jest.mock('../../../src/parser', () => ({ parseYaml: jest.fn(), revalYaml: jest.fn() }));
jest.mock('../../../src/stack/localStack', () => ({ startLocalStack: jest.fn() }));

const mockedCollectConfigRefs = jest.fn((): string[] => []);
const mockedBeginConfigSession = jest.fn();
const mockedApplyConfigResolution = jest.fn();
const mockedEndConfigSession = jest.fn();
const mockedResolveConfigRefsViaSaas = jest.fn();
const mockedWriteLocalConfigSnapshot = jest.fn();

jest.mock('../../../src/common/configSession', () => ({
  collectConfigRefs: () => mockedCollectConfigRefs(),
  beginConfigSession: () => mockedBeginConfigSession(),
  applyConfigResolution: () => mockedApplyConfigResolution(),
  endConfigSession: () => mockedEndConfigSession(),
}));

jest.mock('../../../src/common/configClient', () => ({
  resolveConfigRefsViaSaas: (refs: string[], options: { stage: string; declaredOrg?: string }) =>
    mockedResolveConfigRefsViaSaas(refs, options),
}));

jest.mock('../../../src/commands/config', () => ({
  writeLocalConfigSnapshot: (snapshot: {
    stage: string;
    snapshotVersion: number;
    entries: unknown[];
  }) => mockedWriteLocalConfigSnapshot(snapshot),
}));

it('forwards YAML provider, region and stages and uses effective CLI overrides for local invocation', async () => {
  const iac = {
    app: 'local-app',
    service: 'local-service',
    provider: { name: ProviderEnum.VOLCENGINE, region: 'cn-beijing' },
    stages: { preview: { MODE: 'preview' } },
  } as unknown as ServerlessIac;
  const ctx = {
    stage: 'preview',
    provider: ProviderEnum.VOLCENGINE,
    region: 'cn-shanghai',
  } as Context;
  jest.mocked(getIacLocation).mockReturnValue('/tmp/app/serverlessinsight.yml');
  jest.mocked(parseYaml).mockReturnValue(iac);
  jest.mocked(getContext).mockReturnValue(ctx);
  jest.mocked(revalYaml).mockReturnValue(iac);

  await runLocal({
    stage: 'preview',
    debug: false,
    watch: false,
    location: '/tmp/app',
    provider: 'volcengine',
    region: 'cn-shanghai',
  });

  expect(setContext).toHaveBeenCalledWith({
    stage: 'preview',
    app: 'local-app',
    service: 'local-service',
    location: '/tmp/app',
    provider: 'volcengine',
    region: 'cn-shanghai',
    iacProvider: iac.provider,
    stages: iac.stages,
  });
  expect(revalYaml).toHaveBeenCalledWith('/tmp/app/serverlessinsight.yml', ctx);
  const effective = { ...iac, provider: { name: ProviderEnum.VOLCENGINE, region: 'cn-shanghai' } };
  expect(setIac).toHaveBeenCalledWith(effective);
  expect(startLocalStack).toHaveBeenCalledWith(effective, {
    strictPrefix: false,
    stage: 'preview',
  });
});

it('forwards strict-prefix mode into the local stack options', async () => {
  const iac = {
    app: 'local-app',
    service: 'local-service',
    provider: { name: ProviderEnum.ALIYUN, region: 'cn-hangzhou' },
  } as unknown as ServerlessIac;
  jest.mocked(getIacLocation).mockReturnValue('/tmp/app/serverlessinsight.yml');
  jest.mocked(parseYaml).mockReturnValue(iac);
  jest.mocked(getContext).mockReturnValue({
    stage: 'default',
    provider: ProviderEnum.ALIYUN,
    region: 'cn-hangzhou',
  } as Context);
  jest.mocked(revalYaml).mockReturnValue(iac);

  await runLocal({
    stage: 'default',
    debug: false,
    watch: false,
    location: '/tmp/app',
    provider: 'aliyun',
    strictPrefix: true,
  });

  expect(startLocalStack).toHaveBeenLastCalledWith(
    { ...iac, provider: { name: ProviderEnum.ALIYUN, region: 'cn-hangzhou' } },
    { strictPrefix: true, stage: 'default' },
  );
});

describe('si local config-set resolution (epic #53 P1/P2)', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('resolves refs, substitutes them and writes the local snapshot when SaaS credentials exist', async () => {
    const iac = {
      app: 'local-app',
      service: 'local-service',
      org: 'my-org',
      provider: { name: ProviderEnum.ALIYUN, region: 'cn-hangzhou' },
      stages: {},
      backend: { type: 'SAAS' },
      functions: [{ key: 'fn', environment: { DB_HOST: '⟦si-cfg:0⟧' } }],
    } as unknown as ServerlessIac;
    jest.mocked(getIacLocation).mockReturnValue('/tmp/app/serverlessinsight.yml');
    jest.mocked(parseYaml).mockReturnValue(iac);
    jest.mocked(getContext).mockReturnValue({
      stage: 'prod',
      provider: ProviderEnum.ALIYUN,
      region: 'cn-hangzhou',
    } as Context);
    jest.mocked(revalYaml).mockReturnValue(iac);

    const resolved = new Map<
      string,
      { value: string; versionNumber: number; secret: boolean; scope: string; configSet: string }
    >([
      [
        'db.host',
        { value: 'localhost', versionNumber: 3, secret: false, scope: 'stage', configSet: 'db' },
      ],
    ]);
    mockedCollectConfigRefs.mockReturnValueOnce(['db.host']);
    mockedResolveConfigRefsViaSaas.mockResolvedValueOnce(resolved);
    mockedBeginConfigSession.mockReturnValueOnce({
      resolved,
      records: new Map(),
      placeholderOf: jest.fn(),
    });
    mockedApplyConfigResolution.mockImplementationOnce(() => ({
      functionEnvRefs: new Map(),
      databasePasswordRefs: new Map(),
      secretValues: new Set(),
      refByValue: new Map(),
    }));
    mockedWriteLocalConfigSnapshot.mockResolvedValueOnce(
      '/tmp/app/.serverlessinsight/local-config.json',
    );

    await runLocal({ stage: 'prod', debug: false, watch: false, location: '/tmp/app' });

    expect(mockedResolveConfigRefsViaSaas).toHaveBeenCalledWith(['db.host'], {
      stage: 'prod',
      declaredOrg: 'my-org',
    });
    expect(mockedWriteLocalConfigSnapshot).toHaveBeenCalledWith(
      expect.objectContaining({
        stage: 'prod',
        snapshotVersion: 3,
        entries: [expect.objectContaining({ key: 'db.host', value: 'localhost', secret: false })],
      }),
    );
    expect(mockLoggerInfo).toHaveBeenCalledWith(
      expect.stringContaining('Local config snapshot written'),
    );
  });

  it('keeps templates and skips the snapshot when resolution fails (offline-capable)', async () => {
    const iac = {
      app: 'local-app',
      service: 'local-service',
      provider: { name: ProviderEnum.ALIYUN, region: 'cn-hangzhou' },
      stages: {},
      backend: { type: 'SAAS' },
      functions: [{ key: 'fn', environment: { DB_HOST: '${config_sets.db.host}' } }],
    } as unknown as ServerlessIac;
    jest.mocked(getIacLocation).mockReturnValue('/tmp/app/serverlessinsight.yml');
    jest.mocked(parseYaml).mockReturnValue(iac);
    jest.mocked(getContext).mockReturnValue({
      stage: 'prod',
      provider: ProviderEnum.ALIYUN,
      region: 'cn-hangzhou',
    } as Context);
    jest.mocked(revalYaml).mockReturnValue(iac);

    mockedCollectConfigRefs.mockReturnValueOnce(['db.host']);
    mockedResolveConfigRefsViaSaas.mockRejectedValueOnce(new Error('SaaS unreachable'));

    await runLocal({ stage: 'prod', debug: false, watch: false, location: '/tmp/app' });

    // lang is NOT mocked here — assert the real translated message body.
    expect(mockLoggerInfo).toHaveBeenCalledWith(
      expect.stringContaining('snapshot file was not written'),
    );
    expect(mockedWriteLocalConfigSnapshot).not.toHaveBeenCalled();
    expect(startLocalStack).toHaveBeenCalled();
  });
});
