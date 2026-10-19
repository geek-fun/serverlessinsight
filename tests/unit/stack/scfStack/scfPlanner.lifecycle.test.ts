import { ProviderEnum, setResource } from '../../../../src/common';
import { generateFunctionPlan } from '../../../../src/stack/scfStack/scfPlanner';
import { extractScfDefinition, functionToScfConfig } from '../../../../src/stack/scfStack/scfTypes';
import type { Context, FunctionDomain, ResourceAttributes, StateFile } from '../../../../src/types';

const mockScf = { getFunction: jest.fn(), getCustomDomain: jest.fn() };

jest.mock('../../../../src/common/tencentClient', () => ({
  createTencentClient: () => ({ scf: mockScf }),
}));
jest.mock('../../../../src/common/hashUtils', () => ({
  ...jest.requireActual('../../../../src/common/hashUtils'),
  computeZipContentHash: jest.fn().mockResolvedValue('code-hash'),
}));

describe('SCF lifecycle planning', () => {
  const context: Context = {
    app: 'sample',
    service: 'api',
    stage: 'dev',
    region: 'ap-guangzhou',
    provider: ProviderEnum.TENCENT,
    accessKeyId: 'test-key',
    accessKeySecret: 'test-secret',
    iacLocation: 'test.yml',
  };
  const fn: FunctionDomain = {
    key: 'handler',
    name: 'sample-handler',
    code: { runtime: 'nodejs18', handler: 'index.handler', path: 'code.zip' },
    memory: 512,
    timeout: 10,
    storage: {},
  };
  const httpFn: FunctionDomain = {
    ...fn,
    triggers: { http: { auth_type: 'public', access: ['public'] } },
  };
  const domainFn: FunctionDomain = {
    ...fn,
    domain: { domain_name: 'api.example.com', protocol: 'HTTPS', certificate_id: 'cert-1' },
  };
  const matchingHttp = {
    AuthType: 'NONE',
    NetConfig: { EnableIntranet: false, EnableExtranet: true },
  };
  const live = {
    FunctionName: 'sample-handler',
    Runtime: 'Nodejs18.15',
    Handler: 'index.handler',
    MemorySize: 512,
    Timeout: 10,
  };
  const stateFor = (savedFn: FunctionDomain, overrides: ResourceAttributes = {}): StateFile =>
    setResource(
      {
        version: '1.0',
        provider: 'tencent',
        app: 'sample',
        service: 'api',
        stages: {},
        resources: {},
      },
      'functions.handler',
      {
        mode: 'managed',
        region: context.region,
        definition: {
          ...extractScfDefinition(functionToScfConfig(savedFn), 'code-hash', savedFn.iam, savedFn),
          ...overrides,
        },
        instances: [],
        lastUpdated: '2026-01-01T00:00:00Z',
      },
    );
  const trigger = (desc: unknown) => ({
    Type: 'http',
    TriggerName: 'http-trigger',
    TriggerDesc: typeof desc === 'string' ? desc : JSON.stringify(desc),
  });

  beforeEach(() => {
    jest.resetAllMocks();
    const { computeZipContentHash } = jest.requireMock('../../../../src/common/hashUtils');
    computeZipContentHash.mockResolvedValue('code-hash');
    mockScf.getFunction.mockResolvedValue(live);
    mockScf.getCustomDomain.mockResolvedValue({ Protocol: 'HTTPS' });
  });

  it.each([
    undefined,
    [],
    [{ Type: 'timer', TriggerDesc: 'NetConfig' }],
    [{ Type: 'http', TriggerDesc: '{}' }],
    [trigger('{"NetConfig":invalid')],
    [trigger({ ...matchingHttp, AuthType: 'CAM' })],
    [trigger({ ...matchingHttp, NetConfig: { EnableIntranet: true, EnableExtranet: false } })],
  ])('repairs missing, invalid or drifted HTTP configuration: %j', async (Triggers) => {
    mockScf.getFunction.mockResolvedValue({ ...live, Triggers });

    const plan = await generateFunctionPlan(context, stateFor(httpFn), [httpFn]);

    expect(plan.items[0]).toMatchObject({
      action: 'update',
      drifted: true,
      driftReasons: ['PLAN_DRIFT_HTTP_TRIGGER'],
    });
  });

  it('accepts a matching HTTP trigger with provider-only defaults', async () => {
    mockScf.getFunction.mockResolvedValue({
      ...live,
      Triggers: [trigger({ ...matchingHttp, ProviderDefault: true })],
    });

    const plan = await generateFunctionPlan(context, stateFor(httpFn), [httpFn]);

    expect(plan.items[0]).toMatchObject({ action: 'noop' });
  });

  it('labels an HTTP auth edit as intent rather than cloud drift', async () => {
    const desired: FunctionDomain = {
      ...httpFn,
      triggers: { http: { auth_type: 'iam', access: ['public'] } },
    };
    mockScf.getFunction.mockResolvedValue({ ...live, Triggers: [trigger(matchingHttp)] });

    const plan = await generateFunctionPlan(context, stateFor(httpFn), [desired]);

    expect(plan.items[0]).toMatchObject({
      action: 'update',
      driftReasons: ['PLAN_DRIFT_HTTP_TRIGGER'],
    });
    expect(plan.items[0].drifted).toBeUndefined();
  });

  it.each([null, { Protocol: 'HTTP' }])(
    'repairs missing or drifted custom domains: %j',
    async (domain) => {
      mockScf.getCustomDomain.mockResolvedValue(domain);

      const plan = await generateFunctionPlan(context, stateFor(domainFn), [domainFn]);

      expect(mockScf.getCustomDomain).toHaveBeenCalledWith('api.example.com');
      expect(plan.items[0]).toMatchObject({
        action: 'update',
        drifted: true,
        driftReasons: ['PLAN_DRIFT_FUNCTION_DOMAIN'],
      });
    },
  );

  it.each([{ Protocol: 'HTTPS' }, {}])(
    'does not invent domain drift from matching or unreadable protocol: %j',
    async (domain) => {
      mockScf.getCustomDomain.mockResolvedValue(domain);

      const plan = await generateFunctionPlan(context, stateFor(domainFn), [domainFn]);

      expect(plan.items[0]).toMatchObject({ action: 'noop' });
    },
  );

  it('labels a domain protocol edit as intent rather than cloud drift', async () => {
    const desired = { ...domainFn, domain: { ...domainFn.domain!, protocol: 'HTTP' } };

    const plan = await generateFunctionPlan(context, stateFor(domainFn), [desired]);

    expect(plan.items[0]).toMatchObject({ action: 'update' });
    expect(plan.items[0].drifted).toBeUndefined();
  });

  it('propagates domain permission errors', async () => {
    const error = new Error('AccessDenied');
    mockScf.getCustomDomain.mockRejectedValue(error);

    await expect(generateFunctionPlan(context, stateFor(domainFn), [domainFn])).rejects.toBe(error);
  });

  it('propagates a failed timer probe after the function read succeeds', async () => {
    const desired: FunctionDomain = { ...fn, triggers: { timer: [] } };
    const error = new Error('timer read failed');
    mockScf.getFunction.mockResolvedValueOnce(live).mockRejectedValueOnce(error);

    await expect(generateFunctionPlan(context, stateFor(desired), [desired])).rejects.toBe(error);
  });

  it('skips all lifecycle probes with refresh disabled', async () => {
    const plan = await generateFunctionPlan({ ...context, refresh: false }, stateFor(httpFn), [
      httpFn,
    ]);

    expect(plan.items[0]).toMatchObject({ action: 'noop' });
    expect(mockScf.getFunction).not.toHaveBeenCalled();
    expect(mockScf.getCustomDomain).not.toHaveBeenCalled();
  });

  it('repairs timer descriptions and preserves the provenance of a YAML edit', async () => {
    const saved: FunctionDomain = {
      ...fn,
      triggers: {
        timer: [{ name: 'daily', cron: '0 0 0 * * *', enable: true, description: 'old' }],
      },
    };
    const desired: FunctionDomain = {
      ...saved,
      triggers: { timer: [{ ...saved.triggers!.timer![0], description: 'new' }] },
    };
    mockScf.getFunction.mockResolvedValue({
      ...live,
      Triggers: [
        {
          Type: 'timer',
          TriggerName: 'daily',
          TriggerDesc: '0 0 8 * * * *',
          Enable: 1,
          Description: 'old',
        },
      ],
    });

    const plan = await generateFunctionPlan(context, stateFor(saved), [desired]);

    expect(plan.items[0]).toMatchObject({
      action: 'update',
      driftReasons: ['PLAN_DRIFT_TIMER_TRIGGER'],
    });
    expect(plan.items[0].drifted).toBeUndefined();
  });
});
