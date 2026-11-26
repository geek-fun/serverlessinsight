import { deploy } from '../../../src/commands/deploy';
import * as readline from 'node:readline';

const mockedIamInfo = jest.fn();
const mockedDeployStack = jest.fn();
const mockedGenerateAliyunPlan = jest.fn();
const mockedGenerateTencentPlan = jest.fn();
const mockedDisplayPlan = jest.fn();
const mockedParseYaml = jest.fn();
const mockedRevalYaml = jest.fn();
const mockedGetIacLocation = jest.fn();
const mockedSetContext = jest.fn();
const mockedGetContext = jest.fn();
const mockedSetIac = jest.fn();
const mockedCreateStateBackend = jest.fn();

jest.mock('../../../src/common/imsClient', () => ({
  ...jest.requireActual('../../../src/common/imsClient'),
  getIamInfo: (...args: unknown[]) => mockedIamInfo(...args),
}));

jest.mock('../../../src/stack', () => ({
  ...jest.requireActual('../../../src/stack'),
  deployStack: (...args: unknown[]) => mockedDeployStack(...args),
}));

jest.mock('../../../src/stack/aliyunStack', () => ({
  ...jest.requireActual('../../../src/stack/aliyunStack'),
  generateAliyunPlan: (...args: unknown[]) => mockedGenerateAliyunPlan(...args),
}));

jest.mock('../../../src/stack/scfStack', () => ({
  ...jest.requireActual('../../../src/stack/scfStack'),
  generateTencentPlan: (...args: unknown[]) => mockedGenerateTencentPlan(...args),
  displayPlan: (...args: unknown[]) => mockedDisplayPlan(...args),
}));

jest.mock('../../../src/parser', () => ({
  ...jest.requireActual('../../../src/parser'),
  parseYaml: (...args: unknown[]) => mockedParseYaml(...args),
  revalYaml: (...args: unknown[]) => mockedRevalYaml(...args),
}));

jest.mock('../../../src/common', () => ({
  ...jest.requireActual('../../../src/common'),
  getIacLocation: (...args: unknown[]) => mockedGetIacLocation(...args),
  setContext: (...args: unknown[]) => mockedSetContext(...args),
  getContext: (...args: unknown[]) => mockedGetContext(...args),
  setIac: (...args: unknown[]) => mockedSetIac(...args),
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

jest.mock('../../../src/common/stateBackend', () => ({
  ...jest.requireActual('../../../src/common/stateBackend'),
  createStateBackend: (...args: unknown[]) => mockedCreateStateBackend(...args),
}));

jest.mock('../../../src/lang', () => ({
  lang: { __: (key: string) => key },
}));

// Default: NO config refs — the pre-#53 baseline behaviour for every test in
// this file. Config-path tests override with mockReturnValueOnce.
const mockedCollectConfigRefs = jest.fn<string[], []>(() => []);
const mockedBeginConfigSession = jest.fn();
const mockedApplyConfigResolution = jest.fn();
const mockedEndConfigSession = jest.fn();
const mockedSetAppliedConfigMeta = jest.fn();
const mockedRegisterRuntimeSecret = jest.fn();
const mockedResolveConfigRefsViaSaas = jest.fn();

jest.mock('../../../src/common/configSession', () => ({
  collectConfigRefs: () => mockedCollectConfigRefs(),
  beginConfigSession: (...args: unknown[]) => mockedBeginConfigSession(...args),
  applyConfigResolution: (...args: unknown[]) => mockedApplyConfigResolution(...args),
  endConfigSession: (...args: unknown[]) => mockedEndConfigSession(...args),
  setAppliedConfigMeta: (...args: unknown[]) => mockedSetAppliedConfigMeta(...args),
  registerRuntimeSecret: (...args: unknown[]) => mockedRegisterRuntimeSecret(...args),
  // Other modules (iacHelper, envRedaction, planRedaction) import these.
  activeConfigSession: jest.fn(),
  getAppliedConfigMeta: jest.fn(),
  configRefMarker: jest.fn(),
  parseConfigRefMarker: jest.fn(),
  isConfigRefMarker: jest.fn((): boolean => false),
  PLACEHOLDER_PATTERN: /⟦si-cfg:(\d+)⟧/g,
  CONFIG_REF_TEMPLATE: /\$\{config_sets\.([^}]+)\}/g,
}));

jest.mock('../../../src/common/configClient', () => ({
  resolveConfigRefsViaSaas: (...args: unknown[]) => mockedResolveConfigRefsViaSaas(...args),
}));

jest.mock('node:readline');

const aliyunRawIac = {
  app: 'test-app',
  service: 'test-svc',
  provider: { name: 'aliyun' },
  stages: {},
};
const tencentRawIac = {
  app: 'test-app',
  service: 'test-svc',
  provider: { name: 'tencent' },
  stages: {},
};
const unsupportedRawIac = {
  app: 'test-app',
  service: 'test-svc',
  provider: { name: 'gcp' },
  stages: {},
};

const aliyunIac = { ...aliyunRawIac, backend: undefined };
const tencentIac = { ...tencentRawIac, backend: undefined };
const unsupportedIac = { ...unsupportedRawIac, backend: undefined };

const planWithChanges = { items: [{ action: 'create', resource: 'test' }] };
const planAllNoop = { items: [{ action: 'noop', resource: 'test' }] };

const mockBackend = {
  withLock: jest.fn((_: string, fn: () => Promise<void>) => fn()),
  getState: jest.fn(),
  loadState: jest.fn().mockResolvedValue({
    version: '1',
    provider: 'tencent',
    app: 'test',
    service: 'test',
    stages: {},
    resources: {},
  }),
  setState: jest.fn(),
  readStateSource: jest.fn().mockReturnValue('scoped'),
  probeWriteReadiness: jest.fn().mockResolvedValue({ ready: true, source: 'scoped' }),
};

const baseOptions = {
  location: 'tests/fixtures/serverless-insight.yml',
  parameters: {},
  stage: undefined,
  autoApprove: true,
};

const setupAliyunMocks = () => {
  mockedGetIacLocation.mockReturnValue('resolved-location');
  mockedParseYaml.mockReturnValue(aliyunRawIac);
  mockedSetContext.mockResolvedValue(undefined);
  mockedGetContext.mockReturnValue({ provider: 'aliyun', region: 'cn-hangzhou' });
  mockedRevalYaml.mockReturnValue(aliyunIac);
  mockedCreateStateBackend.mockReturnValue(mockBackend);
  mockedGenerateAliyunPlan.mockResolvedValue(planWithChanges);
  mockedDeployStack.mockResolvedValue(undefined);
};

describe('unit test for deploy command', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('resolves config refs with scope and issues runtime token post-approval inside withLock (epic #53)', async () => {
    setupAliyunMocks();

    const session = {
      resolved: new Map<
        string,
        { value: string; versionNumber: number; secret: boolean; scope: string; configSet: string }
      >([
        [
          'db.host',
          {
            value: 'db.prod.internal',
            versionNumber: 5,
            secret: false,
            scope: 'stage',
            configSet: 'db',
          },
        ],
      ]),
      records: new Map(),
      placeholderOf: jest.fn(),
    };
    const withRefs = {
      ...aliyunRawIac,
      org: 'my-org',
      backend: { type: 'SAAS' },
    };

    mockedParseYaml.mockReturnValueOnce(withRefs);
    const revalIac = {
      ...aliyunIac,
      functions: [{ key: 'insight_poc_fn', environment: { DB_HOST: '⟦si-cfg:0⟧' } }],
    };
    mockedRevalYaml.mockReturnValueOnce(revalIac);
    mockedCollectConfigRefs.mockReturnValueOnce(['db.host']);
    mockedBeginConfigSession.mockReturnValueOnce(session);
    mockedResolveConfigRefsViaSaas.mockResolvedValueOnce(session.resolved);
    mockedApplyConfigResolution.mockImplementationOnce(
      (iac: { functions: Array<{ environment: Record<string, string> }> }) => {
        iac.functions[0]!.environment.DB_HOST = 'db.prod.internal';
        return {
          functionEnvRefs: new Map(),
          databasePasswordRefs: new Map(),
          secretValues: new Set(),
          refByValue: new Map(),
        };
      },
    );
    const saasBackend = {
      ...mockBackend,
      consoleUrl: 'https://console.example.test',
      issueRuntimeConfigToken: jest.fn().mockResolvedValue({
        token: 'sirt_com_x',
        consoleUrl: 'https://console.example.test',
      }),
    };
    mockedCreateStateBackend.mockReturnValueOnce(saasBackend);
    // Snapshot the token seen during planning BEFORE withLock mutates it.
    let tokenDuringPlan: string | undefined;
    mockedGenerateAliyunPlan.mockImplementationOnce(async (iac) => {
      tokenDuringPlan = iac.functions[0]?.environment?.SI_CONFIG_TOKEN;
      expect(saasBackend.issueRuntimeConfigToken).not.toHaveBeenCalled();
      return {
        items: [
          { logicalId: 'functions.insight_poc_fn', action: 'create', resourceType: 'ALIYUN_FC3' },
        ],
      };
    });

    await deploy(baseOptions);

    expect(mockedResolveConfigRefsViaSaas).toHaveBeenCalledWith(['db.host'], {
      stage: undefined,
      app: 'test-app',
      service: 'test-svc',
      provider: 'aliyun',
      region: 'cn-hangzhou',
      siApiKey: undefined,
      declaredOrg: 'my-org',
      org: undefined,
      line: undefined,
    });
    expect(mockedApplyConfigResolution).toHaveBeenCalled();
    expect(tokenDuringPlan).toBe('⟦si-runtime-token⟧');
    expect(saasBackend.issueRuntimeConfigToken).toHaveBeenCalledTimes(1);
    expect(mockedRegisterRuntimeSecret).toHaveBeenCalledWith('sirt_com_x');
    expect(mockedDeployStack).toHaveBeenCalledWith(
      expect.objectContaining({
        functions: [
          expect.objectContaining({
            environment: expect.objectContaining({
              DB_HOST: 'db.prod.internal',
              SI_CONFIG_TOKEN: 'sirt_com_x',
              SI_CONSOLE_URL: 'https://console.example.test',
            }),
          }),
        ],
      }),
      saasBackend,
      expect.anything(),
    );
    expect(mockedSetAppliedConfigMeta).toHaveBeenLastCalledWith(null);
  });

  it('does NOT rotate the runtime token when deploy confirmation is declined or plan is noop', async () => {
    setupAliyunMocks();
    const session = { resolved: new Map(), records: new Map(), placeholderOf: jest.fn() };
    const withRefs = { ...aliyunRawIac, org: 'my-org', backend: { type: 'SAAS' } };

    // Case 1: declined confirmation
    mockedParseYaml.mockReturnValueOnce(withRefs);
    mockedRevalYaml.mockReturnValueOnce({
      ...aliyunIac,
      functions: [{ key: 'insight_poc_fn', environment: { DB_HOST: 'db.prod' } }],
    });
    mockedCollectConfigRefs.mockReturnValueOnce(['db.host']);
    mockedBeginConfigSession.mockReturnValueOnce(session);
    mockedResolveConfigRefsViaSaas.mockResolvedValueOnce(new Map());
    const saasBackend = {
      ...mockBackend,
      consoleUrl: 'https://console.example.test',
      issueRuntimeConfigToken: jest.fn(),
    };
    mockedCreateStateBackend.mockReturnValueOnce(saasBackend);
    mockedGenerateAliyunPlan.mockResolvedValueOnce({
      items: [
        { logicalId: 'functions.insight_poc_fn', action: 'update', resourceType: 'ALIYUN_FC3' },
      ],
    });
    const originalIsTTY = Object.getOwnPropertyDescriptor(process.stdin, 'isTTY');
    Object.defineProperty(process.stdin, 'isTTY', { value: true, configurable: true });
    (readline.createInterface as jest.Mock).mockReturnValueOnce({
      question: (_q: string, cb: (ans: string) => void) => cb('no'),
      close: jest.fn(),
    });
    try {
      await deploy({ ...baseOptions, autoApprove: false });
    } finally {
      if (originalIsTTY) Object.defineProperty(process.stdin, 'isTTY', originalIsTTY);
    }
    expect(saasBackend.issueRuntimeConfigToken).not.toHaveBeenCalled();
    expect(mockedDeployStack).not.toHaveBeenCalled();

    // Case 2: noop redeploy
    mockedParseYaml.mockReturnValueOnce(withRefs);
    mockedRevalYaml.mockReturnValueOnce({
      ...aliyunIac,
      functions: [{ key: 'insight_poc_fn', environment: { DB_HOST: 'db.prod' } }],
    });
    mockedCollectConfigRefs.mockReturnValueOnce(['db.host']);
    mockedBeginConfigSession.mockReturnValueOnce(session);
    mockedResolveConfigRefsViaSaas.mockResolvedValueOnce(new Map());
    mockedCreateStateBackend.mockReturnValueOnce(saasBackend);
    mockedGenerateAliyunPlan.mockResolvedValueOnce(planAllNoop);
    await deploy(baseOptions);
    expect(saasBackend.issueRuntimeConfigToken).not.toHaveBeenCalled();
  });

  it('preserves existing live SI_CONFIG_TOKEN on update without rotating, and promotes sibling noop functions on rotation', async () => {
    setupAliyunMocks();
    const session = { resolved: new Map(), records: new Map(), placeholderOf: jest.fn() };
    const withRefs = { ...aliyunRawIac, org: 'my-org', backend: { type: 'SAAS' } };

    // Case 1: update with live token present -> preserved, no rotation
    mockedParseYaml.mockReturnValueOnce(withRefs);
    mockedRevalYaml.mockReturnValueOnce({
      ...aliyunIac,
      functions: [{ key: 'fn_a', environment: { DB_HOST: 'new-host' } }],
    });
    mockedCollectConfigRefs.mockReturnValueOnce(['db.host']);
    mockedBeginConfigSession.mockReturnValueOnce(session);
    mockedResolveConfigRefsViaSaas.mockResolvedValueOnce(new Map());
    const saasBackend = {
      ...mockBackend,
      consoleUrl: 'https://console.example.test',
      issueRuntimeConfigToken: jest.fn().mockResolvedValue({
        token: 'sirt_com_rotated',
        consoleUrl: 'https://console.example.test',
      }),
    };
    mockedCreateStateBackend.mockReturnValueOnce(saasBackend);
    mockedGenerateAliyunPlan.mockResolvedValueOnce({
      items: [
        {
          logicalId: 'functions.fn_a',
          action: 'update',
          resourceType: 'ALIYUN_FC3',
          changes: {
            before: { environment: { DB_HOST: 'old-host', SI_CONFIG_TOKEN: 'sirt_com_live_old' } },
            after: { environment: { DB_HOST: 'new-host', SI_CONFIG_TOKEN: 'sirt_com_live_old' } },
          },
        },
      ],
    });
    await deploy(baseOptions);
    expect(saasBackend.issueRuntimeConfigToken).not.toHaveBeenCalled();
    expect(mockedRegisterRuntimeSecret).toHaveBeenCalledWith('sirt_com_live_old');
    expect(mockedDeployStack).toHaveBeenLastCalledWith(
      expect.objectContaining({
        functions: [
          expect.objectContaining({
            environment: expect.objectContaining({ SI_CONFIG_TOKEN: 'sirt_com_live_old' }),
          }),
        ],
      }),
      saasBackend,
      expect.anything(),
    );

    // Case 2: new sibling fn_b triggers rotation -> unchanged noop fn_a promoted to update
    mockedParseYaml.mockReturnValueOnce(withRefs);
    mockedRevalYaml.mockReturnValueOnce({
      ...aliyunIac,
      functions: [
        { key: 'fn_a', environment: { DB_HOST: 'host' } },
        { key: 'fn_b', environment: { DB_HOST: 'host' } },
      ],
    });
    mockedCollectConfigRefs.mockReturnValueOnce(['db.host']);
    mockedBeginConfigSession.mockReturnValueOnce(session);
    mockedResolveConfigRefsViaSaas.mockResolvedValueOnce(new Map());
    mockedCreateStateBackend.mockReturnValueOnce(saasBackend);
    mockedGenerateAliyunPlan.mockResolvedValueOnce({
      items: [
        { logicalId: 'functions.fn_a', action: 'noop', resourceType: 'ALIYUN_FC3' },
        { logicalId: 'functions.fn_b', action: 'create', resourceType: 'ALIYUN_FC3' },
      ],
    });
    await deploy(baseOptions);
    expect(saasBackend.issueRuntimeConfigToken).toHaveBeenCalledTimes(1);
    expect(mockedDeployStack).toHaveBeenLastCalledWith(
      expect.objectContaining({
        functions: [
          expect.objectContaining({
            key: 'fn_a',
            environment: expect.objectContaining({ SI_CONFIG_TOKEN: 'sirt_com_rotated' }),
          }),
          expect.objectContaining({
            key: 'fn_b',
            environment: expect.objectContaining({ SI_CONFIG_TOKEN: 'sirt_com_rotated' }),
          }),
        ],
      }),
      saasBackend,
      {
        items: [
          { logicalId: 'functions.fn_a', action: 'update', resourceType: 'ALIYUN_FC3' },
          { logicalId: 'functions.fn_b', action: 'create', resourceType: 'ALIYUN_FC3' },
        ],
      },
    );
  });

  it('closes config session in finally when resolveConfigRefsViaSaas fails', async () => {
    setupAliyunMocks();
    const withRefs = { ...aliyunRawIac, backend: { type: 'SAAS' } };
    mockedParseYaml.mockReturnValueOnce(withRefs);
    mockedCollectConfigRefs.mockReturnValueOnce(['db.host']);
    mockedBeginConfigSession.mockReturnValueOnce({
      resolved: new Map(),
      records: new Map(),
      placeholderOf: jest.fn(),
    });
    mockedResolveConfigRefsViaSaas.mockRejectedValueOnce(new Error('network down'));
    await expect(deploy(baseOptions)).rejects.toThrow('network down');
    expect(mockedEndConfigSession).toHaveBeenCalled();
  });

  it('fails closed on config refs without a SaaS backend (epic #53)', async () => {
    setupAliyunMocks();
    const withRefs = {
      ...aliyunRawIac,
      backend: { type: 'LOCAL' },
    };
    mockedCollectConfigRefs.mockReturnValueOnce(['db.host']);
    mockedParseYaml.mockReturnValueOnce(withRefs);
    // The session must NOT stay active after the failure.
    await expect(deploy(baseOptions)).rejects.toThrow(/CONFIG_RESOLVE_REQUIRES_SAAS/);
    expect(mockedResolveConfigRefsViaSaas).not.toHaveBeenCalled();
    expect(mockedEndConfigSession).toHaveBeenCalled();
    expect(mockedDeployStack).not.toHaveBeenCalled();
  });

  it('should deploy with aliyun provider and autoApprove', async () => {
    setupAliyunMocks();

    await deploy(baseOptions);

    expect(mockedCreateStateBackend).toHaveBeenCalledTimes(1);
    expect(mockBackend.probeWriteReadiness).toHaveBeenCalledTimes(1);
    expect(mockedGenerateAliyunPlan).toHaveBeenCalledTimes(1);
    expect(mockedDisplayPlan).toHaveBeenCalledWith(planWithChanges);
    expect(mockedDeployStack).toHaveBeenCalledTimes(1);
  });

  it.each([false, true])('redacts deployment records when failure is %s', async (fails) => {
    setupAliyunMocks();
    const plan = {
      items: [
        {
          logicalId: 'functions.hello',
          action: 'create',
          resourceType: 'ALIYUN_FC3_FUNCTION',
          changes: { after: { environment: { DB_PASSWORD: 'plain-plan-value' } } },
        },
      ],
    };
    const resource = {
      definition: { environment: { DB_PASSWORD: 'plain-state-value' } },
      instances: [],
    };
    const recordedResources = { 'functions.hello': resource };
    const backend = {
      ...mockBackend,
      loadState: jest.fn().mockResolvedValue({
        resources: recordedResources,
        stages: { dev: { resources: recordedResources } },
      }),
    };
    mockedCreateStateBackend.mockReturnValue(backend);
    mockedGenerateAliyunPlan.mockResolvedValue(plan);

    const failure = new Error('provider failed');
    if (fails) {
      mockedDeployStack.mockRejectedValueOnce(failure);
      await expect(deploy(baseOptions)).rejects.toBe(failure);
    } else {
      await deploy(baseOptions);
    }

    expect(mockedDeployStack).toHaveBeenCalledWith(aliyunIac, backend, plan);
    const record = fails ? failure : await backend.withLock.mock.results[0].value;
    expect(record).toMatchObject({
      plan: {
        items: [{ changes: { after: { environment: { DB_PASSWORD: '[REDACTED]' } } } }],
      },
      stateJson: {
        stages: {
          dev: {
            resources: {
              'functions.hello': { definition: { environment: { DB_PASSWORD: '[REDACTED]' } } },
            },
          },
        },
      },
    });
    expect(JSON.stringify(record)).not.toMatch(/plain-plan-value|plain-state-value/);
  });

  it('should abort before planning when the write-readiness probe is not ready', async () => {
    setupAliyunMocks();
    mockedCreateStateBackend.mockReturnValue({
      ...mockBackend,
      probeWriteReadiness: jest
        .fn()
        .mockResolvedValue({ ready: false, source: 'legacy', reason: 'blocked' }),
    });

    await expect(deploy(baseOptions)).rejects.toThrow('blocked');

    expect(mockBackend.probeWriteReadiness).not.toHaveBeenCalled();
    expect(mockedGenerateAliyunPlan).not.toHaveBeenCalled();
    expect(mockedDeployStack).not.toHaveBeenCalled();
  });

  it('prepares legacy state before planning and forwards the reviewed region binding', async () => {
    setupAliyunMocks();
    const upgradeLegacyState = jest.fn(async () => {
      expect(mockBackend.probeWriteReadiness).not.toHaveBeenCalled();
      expect(mockedGenerateAliyunPlan).not.toHaveBeenCalled();
    });
    mockedCreateStateBackend.mockReturnValue({ ...mockBackend, upgradeLegacyState });

    await deploy({ ...baseOptions, bindUnknownRegion: 'cn-hangzhou' });

    expect(upgradeLegacyState).toHaveBeenCalledWith({ bindUnknownRegion: 'cn-hangzhou' });
    expect(mockedDeployStack).toHaveBeenCalledTimes(1);
  });

  it('does not plan or execute cloud changes when automatic preparation fails', async () => {
    setupAliyunMocks();
    mockedCreateStateBackend.mockReturnValue({
      ...mockBackend,
      upgradeLegacyState: jest.fn().mockRejectedValue(new Error('upgrade interrupted')),
    });

    await expect(deploy(baseOptions)).rejects.toThrow('upgrade interrupted');

    expect(mockBackend.probeWriteReadiness).not.toHaveBeenCalled();
    expect(mockedGenerateAliyunPlan).not.toHaveBeenCalled();
    expect(mockedDeployStack).not.toHaveBeenCalled();
  });

  it('should deploy with tencent provider', async () => {
    mockedGetIacLocation.mockReturnValue('resolved-location');
    mockedParseYaml.mockReturnValue(tencentRawIac);
    mockedSetContext.mockResolvedValue(undefined);
    mockedGetContext.mockReturnValue({ provider: 'tencent', region: 'ap-guangzhou' });
    mockedRevalYaml.mockReturnValue(tencentIac);
    mockedCreateStateBackend.mockReturnValue(mockBackend);
    mockedGenerateTencentPlan.mockResolvedValue(planWithChanges);
    mockedDeployStack.mockResolvedValue(undefined);

    await deploy(baseOptions);

    expect(mockedGenerateTencentPlan).toHaveBeenCalledTimes(1);
    expect(mockedGenerateAliyunPlan).not.toHaveBeenCalled();
    expect(mockedDeployStack).toHaveBeenCalledTimes(1);
  });

  it('should throw for unsupported provider', async () => {
    mockedGetIacLocation.mockReturnValue('resolved-location');
    mockedParseYaml.mockReturnValue(unsupportedRawIac);
    mockedSetContext.mockResolvedValue(undefined);
    mockedGetContext.mockReturnValue({ provider: 'gcp', region: 'us-east-1' });
    mockedRevalYaml.mockReturnValue(unsupportedIac);
    mockedCreateStateBackend.mockReturnValue(mockBackend);

    await expect(deploy(baseOptions)).rejects.toThrow('PLAN_COMMAND_NOT_SUPPORTED');
  });

  it('should skip confirmation when all plan items are noop', async () => {
    setupAliyunMocks();
    mockedGenerateAliyunPlan.mockResolvedValue(planAllNoop);

    await deploy({ ...baseOptions, autoApprove: false });

    expect(readline.createInterface).not.toHaveBeenCalled();
    expect(mockedDeployStack).toHaveBeenCalledTimes(1);
  });

  it('should throw when stdin is not TTY and autoApprove is false with changes', async () => {
    setupAliyunMocks();
    const originalIsTTY = process.stdin.isTTY;
    Object.defineProperty(process.stdin, 'isTTY', { value: false, configurable: true });

    await expect(deploy({ ...baseOptions, autoApprove: false })).rejects.toThrow(
      'CONFIRMATION_STDIN_NOT_TTY',
    );

    Object.defineProperty(process.stdin, 'isTTY', { value: originalIsTTY, configurable: true });
  });

  it('should proceed with deploy when user confirms with yes', async () => {
    setupAliyunMocks();
    const originalIsTTY = process.stdin.isTTY;
    Object.defineProperty(process.stdin, 'isTTY', { value: true, configurable: true });

    const mockClose = jest.fn();
    const mockQuestion = jest.fn((_prompt: string, callback: (answer: string) => void) => {
      callback('yes');
    });
    (readline.createInterface as jest.Mock).mockReturnValue({
      question: mockQuestion,
      close: mockClose,
    });

    await deploy({ ...baseOptions, autoApprove: false });

    expect(mockedDeployStack).toHaveBeenCalledTimes(1);
    expect(mockClose).toHaveBeenCalled();

    Object.defineProperty(process.stdin, 'isTTY', { value: originalIsTTY, configurable: true });
  });

  it('should cancel deploy when user answers no', async () => {
    setupAliyunMocks();
    const originalIsTTY = process.stdin.isTTY;
    Object.defineProperty(process.stdin, 'isTTY', { value: true, configurable: true });

    const mockClose = jest.fn();
    const mockQuestion = jest.fn((_prompt: string, callback: (answer: string) => void) => {
      callback('no');
    });
    (readline.createInterface as jest.Mock).mockReturnValue({
      question: mockQuestion,
      close: mockClose,
    });

    await deploy({ ...baseOptions, autoApprove: false });

    expect(mockedDeployStack).not.toHaveBeenCalled();
    expect(mockClose).toHaveBeenCalled();

    Object.defineProperty(process.stdin, 'isTTY', { value: originalIsTTY, configurable: true });
  });

  it('should accept y as confirmation', async () => {
    setupAliyunMocks();
    const originalIsTTY = process.stdin.isTTY;
    Object.defineProperty(process.stdin, 'isTTY', { value: true, configurable: true });

    const mockClose = jest.fn();
    const mockQuestion = jest.fn((_prompt: string, callback: (answer: string) => void) => {
      callback('y');
    });
    (readline.createInterface as jest.Mock).mockReturnValue({
      question: mockQuestion,
      close: mockClose,
    });

    await deploy({ ...baseOptions, autoApprove: false });

    expect(mockedDeployStack).toHaveBeenCalledTimes(1);

    Object.defineProperty(process.stdin, 'isTTY', { value: originalIsTTY, configurable: true });
  });

  it('should not ask confirmation when autoApprove is true even with changes', async () => {
    setupAliyunMocks();

    await deploy({ ...baseOptions, autoApprove: true });

    expect(readline.createInterface).not.toHaveBeenCalled();
    expect(mockedDeployStack).toHaveBeenCalledTimes(1);
  });

  describe('signal-aware lock release', () => {
    it('should release the active lock and exit(130) when SIGINT is received', async () => {
      setupAliyunMocks();
      const releaseLock = jest.fn().mockResolvedValue(undefined);
      mockedCreateStateBackend.mockReturnValue({
        withLock: jest.fn(
          (
            _op: string,
            fn: () => Promise<unknown>,
            _options?: unknown,
            onLockAcquired?: (id: string) => void,
          ) => {
            onLockAcquired?.('deploy-lock-id');
            return fn();
          },
        ),
        releaseLock,
        getState: jest.fn(),
        loadState: jest.fn().mockResolvedValue({
          version: '1',
          provider: 'tencent',
          app: 'test',
          service: 'test',
          stages: {},
          resources: {},
        }),
        setState: jest.fn(),
        readStateSource: jest.fn().mockReturnValue('scoped'),
        probeWriteReadiness: jest.fn().mockResolvedValue({ ready: true, source: 'scoped' }),
      });

      const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
        return undefined as never;
      });

      let releaseDeploy: (() => void) | undefined;
      mockedDeployStack.mockImplementation(
        () =>
          new Promise<void>((resolve) => {
            releaseDeploy = resolve;
          }),
      );

      const baselineSigint = process.listenerCount('SIGINT');
      const baselineSigterm = process.listenerCount('SIGTERM');

      const deployPromise = deploy(baseOptions);

      await new Promise<void>((resolve) => {
        const timer = setInterval(() => {
          if (releaseDeploy) {
            clearInterval(timer);
            resolve();
          }
        }, 5);
      });

      process.emit('SIGINT');

      expect(releaseLock).toHaveBeenCalledWith('deploy-lock-id');
      expect(exitSpy).toHaveBeenCalledWith(130);

      releaseDeploy?.();
      await deployPromise;

      expect(process.listenerCount('SIGINT')).toBe(baselineSigint);
      expect(process.listenerCount('SIGTERM')).toBe(baselineSigterm);

      exitSpy.mockRestore();
    });

    it('should exit(130) without releasing when no lock is acquired yet', async () => {
      setupAliyunMocks();

      const releaseLock = jest.fn();
      mockedCreateStateBackend.mockReturnValue({
        // onLockAcquired is intentionally never invoked: simulates a signal
        // arriving before the lock has been acquired.
        withLock: jest.fn((_op: string, fn: () => Promise<unknown>) => fn()),
        releaseLock,
        getState: jest.fn(),
        loadState: jest.fn().mockResolvedValue({
          version: '1',
          provider: 'tencent',
          app: 'test',
          service: 'test',
          stages: {},
          resources: {},
        }),
        setState: jest.fn(),
        readStateSource: jest.fn().mockReturnValue('scoped'),
        probeWriteReadiness: jest.fn().mockResolvedValue({ ready: true, source: 'scoped' }),
      });

      const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
        return undefined as never;
      });

      let releaseDeploy: (() => void) | undefined;
      mockedDeployStack.mockImplementation(
        () =>
          new Promise<void>((resolve) => {
            releaseDeploy = resolve;
          }),
      );

      const deployPromise = deploy(baseOptions);

      await new Promise<void>((resolve) => {
        const timer = setInterval(() => {
          if (releaseDeploy) {
            clearInterval(timer);
            resolve();
          }
        }, 5);
      });

      process.emit('SIGINT');

      expect(releaseLock).not.toHaveBeenCalled();
      expect(exitSpy).toHaveBeenCalledWith(130);

      releaseDeploy?.();
      await deployPromise;

      exitSpy.mockRestore();
    });

    it('should remove signal handlers after a normal deploy completes', async () => {
      setupAliyunMocks();
      const baselineSigint = process.listenerCount('SIGINT');
      const baselineSigterm = process.listenerCount('SIGTERM');

      await deploy(baseOptions);

      expect(process.listenerCount('SIGINT')).toBe(baselineSigint);
      expect(process.listenerCount('SIGTERM')).toBe(baselineSigterm);
    });

    it('should wire the backend event reporter into context', async () => {
      setupAliyunMocks();
      const context = { provider: 'aliyun', region: 'cn-hangzhou' };
      const reportEvent = jest.fn();
      mockedGetContext.mockReturnValue(context);
      mockedCreateStateBackend.mockReturnValue({
        ...mockBackend,
        reportEvent,
        replayOrphanedEvents: jest.fn().mockResolvedValue(undefined),
      });

      await deploy(baseOptions);

      expect(context).toHaveProperty('reportEvent', reportEvent);
    });

    it('should flush buffered events before exiting after a signal', async () => {
      setupAliyunMocks();
      const releaseLock = jest.fn().mockResolvedValue(undefined);
      const flushEvents = jest.fn().mockResolvedValue(undefined);
      mockedCreateStateBackend.mockReturnValue({
        withLock: jest.fn(
          (
            _op: string,
            fn: () => Promise<unknown>,
            _options?: unknown,
            onLockAcquired?: (id: string) => void,
          ) => {
            onLockAcquired?.('deploy-lock-id');
            return fn();
          },
        ),
        releaseLock,
        flushEvents,
        loadState: jest.fn().mockResolvedValue({ resources: {} }),
        replayOrphanedEvents: jest.fn().mockResolvedValue(undefined),
        readStateSource: jest.fn().mockReturnValue('scoped'),
        probeWriteReadiness: jest.fn().mockResolvedValue({ ready: true, source: 'scoped' }),
      });
      const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => undefined as never);
      let releaseDeploy: (() => void) | undefined;
      mockedDeployStack.mockImplementation(
        () =>
          new Promise<void>((resolve) => {
            releaseDeploy = resolve;
          }),
      );

      const deployPromise = deploy(baseOptions);
      await new Promise<void>((resolve) => {
        const timer = setInterval(() => {
          if (releaseDeploy) {
            clearInterval(timer);
            resolve();
          }
        }, 5);
      });

      process.emit('SIGTERM');
      await Promise.resolve();
      expect(flushEvents).toHaveBeenCalled();
      expect(exitSpy).toHaveBeenCalledWith(130);

      releaseDeploy?.();
      await deployPromise;
      exitSpy.mockRestore();
    });
  });
});
