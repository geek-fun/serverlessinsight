import { plan, isPlanAliasInvocation, runPlanDiffCommand } from '../../../src/commands/plan';
import {
  getIacLocation,
  setContext,
  setIac,
  ProviderEnum,
  getContext,
  logger,
} from '../../../src/common';
import { parseYaml, revalYaml } from '../../../src/parser';
import { createStateBackend } from '../../../src/common/stateBackend';
import { generateTencentPlan, displayPlan } from '../../../src/stack/scfStack';
import { generateAliyunPlan } from '../../../src/stack/aliyunStack';
import { generateVolcenginePlan } from '../../../src/stack/volcengineStack';
import { lang } from '../../../src/lang';
import { setJsonMode } from '../../../src/common/jsonOutput';

jest.mock('../../../src/common', () => ({
  getIacLocation: jest.fn(),
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
  setContext: jest.fn(),
  setIac: jest.fn(),
  getContext: jest.fn(),
  ProviderEnum: {
    HUAWEI: 'huawei',
    ALIYUN: 'aliyun',
    TENCENT: 'tencent',
    AWS: 'aws',
    VOLCENGINE: 'volcengine',
  },
}));

jest.mock('../../../src/parser', () => ({
  parseYaml: jest.fn(),
  revalYaml: jest.fn(),
}));

jest.mock('../../../src/common/stateBackend', () => ({
  createStateBackend: jest.fn(),
}));

jest.mock('../../../src/common/noColor', () => ({
  isNoColorEnabled: jest.fn().mockReturnValue(false),
}));

jest.mock('../../../src/stack/scfStack', () => ({
  generateTencentPlan: jest.fn(),
  displayPlan: jest.fn(),
}));

jest.mock('../../../src/stack/aliyunStack', () => ({
  generateAliyunPlan: jest.fn(),
}));

jest.mock('../../../src/stack/volcengineStack', () => ({
  generateVolcenginePlan: jest.fn(),
}));

jest.mock('../../../src/lang', () => ({
  lang: {
    __: jest.fn((key: string) => key),
  },
}));

describe('plan command', () => {
  const mockBackend = {};

  const mockContext = {
    app: 'test-app',
    service: 'test-service',
    stage: 'dev',
    region: 'cn-beijing',
    provider: ProviderEnum.ALIYUN,
  };

  const mockPlanResult = {
    items: [],
    levels: [],
    graph: new Map(),
    dotGraph: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getIacLocation as jest.Mock).mockReturnValue('/test/path');
    (parseYaml as jest.Mock).mockReturnValue({
      app: 'test-app',
      service: 'test-service',
      provider: { name: ProviderEnum.ALIYUN },
      stages: {},
    });
    (revalYaml as jest.Mock).mockReturnValue({
      app: 'test-app',
      service: 'test-service',
      provider: { name: ProviderEnum.ALIYUN, region: 'cn-beijing' },
      backend: { type: 'local' },
    });
    (getContext as jest.Mock).mockReturnValue(mockContext);
    (createStateBackend as jest.Mock).mockReturnValue(mockBackend);
    (generateAliyunPlan as jest.Mock).mockResolvedValue(mockPlanResult);
    (generateTencentPlan as jest.Mock).mockResolvedValue(mockPlanResult);
    (generateVolcenginePlan as jest.Mock).mockResolvedValue(mockPlanResult);
  });

  it('should generate plan for Aliyun provider', async () => {
    await plan({ location: '/test/path' });

    expect(setContext).toHaveBeenCalled();
    expect(setIac).toHaveBeenCalled();
    expect(generateAliyunPlan).toHaveBeenCalled();
    expect(displayPlan).toHaveBeenCalledWith(
      mockPlanResult,
      expect.objectContaining({ colorize: true }),
    );
  });

  it('should generate plan for Tencent provider', async () => {
    (parseYaml as jest.Mock).mockReturnValue({
      app: 'test-app',
      service: 'test-service',
      provider: { name: ProviderEnum.TENCENT },
      stages: {},
    });
    (revalYaml as jest.Mock).mockReturnValue({
      app: 'test-app',
      service: 'test-service',
      provider: { name: ProviderEnum.TENCENT, region: 'ap-guangzhou' },
      backend: { type: 'local' },
    });
    (getContext as jest.Mock).mockReturnValue({
      ...mockContext,
      provider: ProviderEnum.TENCENT,
    });

    await plan({ location: '/test/path' });

    expect(generateTencentPlan).toHaveBeenCalled();
    expect(displayPlan).toHaveBeenCalledWith(mockPlanResult, expect.anything());
  });

  it('should throw error for unsupported provider', async () => {
    (parseYaml as jest.Mock).mockReturnValue({
      app: 'test-app',
      service: 'test-service',
      provider: { name: ProviderEnum.HUAWEI },
      stages: {},
    });
    (revalYaml as jest.Mock).mockReturnValue({
      app: 'test-app',
      service: 'test-service',
      provider: { name: ProviderEnum.HUAWEI, region: 'cn-beijing' },
      backend: { type: 'local' },
    });
    (getContext as jest.Mock).mockReturnValue({
      ...mockContext,
      provider: ProviderEnum.HUAWEI,
    });

    await expect(plan({ location: '/test/path' })).rejects.toThrow('PLAN_COMMAND_NOT_SUPPORTED');
  });

  it('should pass options to setContext', async () => {
    await plan({
      location: '/test/path',
      region: 'cn-shanghai',
      stage: 'prod',
      accessKeyId: 'test-ak',
      accessKeySecret: 'test-sk',
      parameters: { key: 'value' },
    });

    expect(setContext).toHaveBeenCalledWith(
      expect.objectContaining({
        region: 'cn-shanghai',
        stage: 'prod',
        accessKeyId: 'test-ak',
        accessKeySecret: 'test-sk',
        parameters: { key: 'value' },
      }),
      true,
    );
  });

  describe('Volcengine planning', () => {
    const iac = {
      app: 'test-app',
      service: 'test-service',
      org: 'test-org',
      provider: { name: ProviderEnum.VOLCENGINE, region: 'cn-beijing' },
    };

    beforeEach(() => {
      (parseYaml as jest.Mock).mockReturnValue({ ...iac, stages: {} });
      (revalYaml as jest.Mock).mockReturnValue(iac);
      (getContext as jest.Mock).mockReturnValue({
        ...mockContext,
        provider: ProviderEnum.VOLCENGINE,
      });
    });

    it('uses the existing planner and renders its ordered result with the Volcengine name', async () => {
      const orderedPlan = {
        ...mockPlanResult,
        items: [
          { logicalId: 'functions.hello', action: 'create', resourceType: 'VOLCENGINE_VEFAAS' },
          { logicalId: 'events.http', action: 'create', resourceType: 'VOLCENGINE_APIGW' },
        ],
        levels: [['functions.hello'], ['events.http']],
      };
      (generateVolcenginePlan as jest.Mock).mockResolvedValue(orderedPlan);

      await expect(plan({ location: '/test/path' })).resolves.toEqual({ hasChanges: true });

      expect(generateVolcenginePlan).toHaveBeenCalledWith(iac, mockBackend);
      expect(generateAliyunPlan).not.toHaveBeenCalled();
      expect(generateTencentPlan).not.toHaveBeenCalled();
      expect(lang.__).toHaveBeenCalledWith('GENERATING_PLAN_FOR_PROVIDER', {
        provider: 'PROVIDER_VOLCENGINE',
      });
      expect(displayPlan).toHaveBeenCalledWith(orderedPlan, expect.anything());
    });

    it.each([
      undefined,
      { type: 'LOCAL' },
      { type: 'SAAS' },
      {
        type: 'BUCKET_STORE',
        bucket: 'state-bucket',
        key: 'state.json',
      },
    ])('preserves backend selection and migration warnings for %j', async (backend) => {
      (revalYaml as jest.Mock).mockReturnValue({ ...iac, backend });

      await plan({ location: '/test/path' });

      expect(createStateBackend).toHaveBeenCalledWith(
        backend,
        expect.objectContaining({
          provider: ProviderEnum.VOLCENGINE,
          declaredOrg: 'test-org',
          migrationMarker: 'warn',
        }),
      );
      expect(generateVolcenginePlan).toHaveBeenCalledWith({ ...iac, backend }, mockBackend);
    });

    it.each([true, false])(
      'preserves refresh=%s and parameter, stage and region overrides',
      async (refresh) => {
        await plan({
          location: '/test/path',
          stage: 'prod',
          region: 'cn-shanghai',
          parameters: { memory: '1024' },
          refresh,
        });

        expect(setContext).toHaveBeenCalledWith(
          expect.objectContaining({
            stage: 'prod',
            region: 'cn-shanghai',
            parameters: { memory: '1024' },
            refresh,
          }),
          true,
        );
      },
    );

    it.each([
      [[]],
      [
        [
          { logicalId: 'functions.hello', action: 'create', resourceType: 'VOLCENGINE_VEFAAS' },
          { logicalId: 'buckets.old', action: 'delete', resourceType: 'VOLCENGINE_TOS_BUCKET' },
          { logicalId: 'events.http', action: 'update', resourceType: 'VOLCENGINE_APIGW' },
          { logicalId: 'buckets.idle', action: 'noop', resourceType: 'VOLCENGINE_TOS_BUCKET' },
        ],
      ],
    ])('keeps the versioned JSON envelope and summary for %j', async (items) => {
      (generateVolcenginePlan as jest.Mock).mockResolvedValue({ ...mockPlanResult, items });
      const stdout = jest.spyOn(process.stdout, 'write').mockImplementation(() => true);
      try {
        const result = await plan({ location: '/test/path', json: true });
        const payload = JSON.parse(stdout.mock.calls[0][0] as string);
        expect(payload).toMatchObject({
          planVersion: 1,
          provider: 'volcengine',
          app: 'test-app',
          service: 'test-service',
          stage: 'dev',
          summary: items.length
            ? { create: 1, update: 1, destroy: 1, recreate: 0, unchanged: 1 }
            : { create: 0, update: 0, destroy: 0, recreate: 0, unchanged: 0 },
        });
        expect(payload.changes.map((change: { action: string }) => change.action)).toEqual(
          items.length ? ['create', 'destroy', 'update'] : [],
        );
        expect(result).toEqual({ hasChanges: items.length > 0 });
        expect(displayPlan).not.toHaveBeenCalled();
      } finally {
        stdout.mockRestore();
      }
    });

    it('propagates planner failures without rendering a successful plan', async () => {
      const error = new Error('cloud read failed');
      (generateVolcenginePlan as jest.Mock).mockRejectedValueOnce(error);
      const stdout = jest.spyOn(process.stdout, 'write').mockImplementation(() => true);
      try {
        await expect(plan({ location: '/test/path', json: true })).rejects.toBe(error);
        expect(stdout).not.toHaveBeenCalled();
        expect(displayPlan).not.toHaveBeenCalled();
      } finally {
        stdout.mockRestore();
      }
    });
  });

  describe('--json output (issue #250)', () => {
    const stdoutSpy = () => jest.spyOn(process.stdout, 'write').mockImplementation(() => true);

    afterEach(() => {
      setJsonMode(false);
    });

    it('writes the versioned plan envelope to stdout and skips human rendering', async () => {
      const spy = stdoutSpy();

      const result = await plan({ location: '/test/path', json: true });

      expect(displayPlan).not.toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      const payload = JSON.parse(spy.mock.calls[0][0] as string);
      expect(payload.planVersion).toBe(1);
      expect(payload.provider).toBe('aliyun');
      expect(payload.app).toBe('test-app');
      expect(payload.service).toBe('test-service');
      expect(payload.stage).toBe('dev');
      expect(payload.changes).toEqual([]);
      expect(payload.summary).toEqual({
        create: 0,
        update: 0,
        destroy: 0,
        recreate: 0,
        unchanged: 0,
      });
      expect(result).toEqual({ hasChanges: false });
      spy.mockRestore();
    });

    it('reports hasChanges for a plan containing change items', async () => {
      (generateAliyunPlan as jest.Mock).mockResolvedValue({
        items: [
          { logicalId: 'functions.hello', action: 'create', resourceType: 'ALIYUN_FC3_FUNCTION' },
          { logicalId: 'functions.idle', action: 'noop', resourceType: 'ALIYUN_FC3_FUNCTION' },
        ],
      });
      const spy = stdoutSpy();

      const result = await plan({ location: '/test/path', json: true });

      const payload = JSON.parse(spy.mock.calls[0][0] as string);
      expect(payload.changes).toHaveLength(1);
      expect(payload.changes[0].logicalId).toBe('functions.hello');
      expect(payload.summary).toEqual({
        create: 1,
        update: 0,
        destroy: 0,
        recreate: 0,
        unchanged: 1,
      });
      expect(result).toEqual({ hasChanges: true });
      spy.mockRestore();
    });

    it('renders the human plan when --json is absent', async () => {
      await plan({ location: '/test/path' });

      expect(displayPlan).toHaveBeenCalled();
    });
  });

  describe('--no-color (issue #250)', () => {
    it('disables colorize for the human plan', async () => {
      await plan({ location: '/test/path', noColor: true });

      expect(displayPlan).toHaveBeenCalledWith(
        mockPlanResult,
        expect.objectContaining({ colorize: false }),
      );
    });

    it('keeps colorize enabled by default', async () => {
      await plan({ location: '/test/path' });

      expect(displayPlan).toHaveBeenCalledWith(
        mockPlanResult,
        expect.objectContaining({ colorize: true }),
      );
    });
  });

  describe('plan/diff single registration (issue #271)', () => {
    const stdoutSpy = () => jest.spyOn(process.stdout, 'write').mockImplementation(() => true);

    // The deprecation warning is keyed off the raw CLI argv, so each test pins
    // the verb the bin would have received.
    const withArgv = async (verb: string, run: () => Promise<void>) => {
      const originalArgv = process.argv;
      process.argv = [originalArgv[0], originalArgv[1], verb];
      try {
        await run();
      } finally {
        process.argv = originalArgv;
      }
    };

    afterEach(() => {
      setJsonMode(false);
    });

    it('detects only the leading legacy plan verb', () => {
      expect(isPlanAliasInvocation(['plan', '--json'])).toBe(true);
      expect(isPlanAliasInvocation(['diff', '--json'])).toBe(false);
      expect(isPlanAliasInvocation([])).toBe(false);
    });

    it('warns through the logger (stderr) when invoked via the plan alias', async () => {
      const stdout = stdoutSpy();
      try {
        await withArgv('plan', async () => {
          await runPlanDiffCommand({ file: '/test/path', json: true });
        });
      } finally {
        stdout.mockRestore();
      }

      expect(logger.warn).toHaveBeenCalledWith('CMD_PLAN_DEPRECATED');
    });

    it('does not warn when invoked via diff', async () => {
      const stdout = stdoutSpy();
      try {
        await withArgv('diff', async () => {
          await runPlanDiffCommand({ file: '/test/path', json: true });
        });
      } finally {
        stdout.mockRestore();
      }

      expect(logger.warn).not.toHaveBeenCalledWith('CMD_PLAN_DEPRECATED');
    });

    it('maps the commander option shape identically onto the plan flow for both verbs', async () => {
      const cliOptions = {
        stage: 'prod',
        parameter: { memory: '1024' },
        file: '/test/path',
        region: 'cn-shanghai',
        provider: 'aliyun',
        accessKeyId: 'test-ak',
        accessKeySecret: 'test-sk',
        securityToken: 'test-token',
        refresh: false,
        color: false,
      };

      const capturedContexts: unknown[] = [];
      await withArgv('plan', async () => {
        await runPlanDiffCommand(cliOptions);
      });
      capturedContexts.push((setContext as jest.Mock).mock.calls[0][0]);
      (setContext as jest.Mock).mockClear();
      (displayPlan as jest.Mock).mockClear();

      await withArgv('diff', async () => {
        await runPlanDiffCommand(cliOptions);
      });
      capturedContexts.push((setContext as jest.Mock).mock.calls[0][0]);

      expect(capturedContexts[1]).toEqual(capturedContexts[0]);
      expect(capturedContexts[0]).toEqual(
        expect.objectContaining({
          stage: 'prod',
          region: 'cn-shanghai',
          accessKeyId: 'test-ak',
          accessKeySecret: 'test-sk',
          securityToken: 'test-token',
          parameters: { memory: '1024' },
          refresh: false,
        }),
      );
      expect(displayPlan).toHaveBeenCalledWith(
        mockPlanResult,
        expect.objectContaining({ colorize: false }),
      );
    });

    it('keeps colorize enabled when --no-color is absent', async () => {
      await withArgv('diff', async () => {
        await runPlanDiffCommand({ file: '/test/path' });
      });

      expect(displayPlan).toHaveBeenCalledWith(
        mockPlanResult,
        expect.objectContaining({ colorize: true }),
      );
    });

    it('sets exit code 2 when the plan has changes and leaves 0 when not', async () => {
      const originalExitCode = process.exitCode;
      const stdout = stdoutSpy();
      try {
        (generateAliyunPlan as jest.Mock).mockResolvedValue({
          ...mockPlanResult,
          items: [
            { logicalId: 'functions.hello', action: 'create', resourceType: 'ALIYUN_FC3_FUNCTION' },
          ],
        });
        await withArgv('plan', async () => {
          await runPlanDiffCommand({ file: '/test/path', json: true });
        });
        expect(process.exitCode).toBe(2);

        process.exitCode = 0;
        (generateAliyunPlan as jest.Mock).mockResolvedValue(mockPlanResult);
        await withArgv('diff', async () => {
          await runPlanDiffCommand({ file: '/test/path', json: true });
        });
        expect(process.exitCode).toBe(0);
      } finally {
        process.exitCode = originalExitCode;
        stdout.mockRestore();
      }
    });
  });
});
