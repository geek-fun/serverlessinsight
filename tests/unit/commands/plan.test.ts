import { plan } from '../../../src/commands/plan';
import { getIacLocation, setContext, setIac, ProviderEnum, getContext } from '../../../src/common';
import { parseYaml, revalYaml } from '../../../src/parser';
import { createStateBackend } from '../../../src/common/stateBackend';
import { generateTencentPlan, displayPlan } from '../../../src/stack/scfStack';
import { generateAliyunPlan } from '../../../src/stack/aliyunStack';
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

jest.mock('../../../src/stack/scfStack', () => ({
  generateTencentPlan: jest.fn(),
  displayPlan: jest.fn(),
}));

jest.mock('../../../src/stack/aliyunStack', () => ({
  generateAliyunPlan: jest.fn(),
}));

jest.mock('../../../src/lang', () => ({
  lang: {
    __: (key: string) => key,
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
      provider: { name: ProviderEnum.VOLCENGINE },
      stages: {},
    });
    (revalYaml as jest.Mock).mockReturnValue({
      app: 'test-app',
      service: 'test-service',
      provider: { name: ProviderEnum.VOLCENGINE, region: 'cn-beijing' },
      backend: { type: 'local' },
    });
    (getContext as jest.Mock).mockReturnValue({
      ...mockContext,
      provider: ProviderEnum.VOLCENGINE,
    });

    await expect(plan({ location: '/test/path' })).rejects.toThrow();
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
});
