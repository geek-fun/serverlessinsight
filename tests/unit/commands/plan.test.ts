import { plan } from '../../../src/commands/plan';
import { getIacLocation, setContext, setIac, ProviderEnum, getContext } from '../../../src/common';
import { parseYaml, revalYaml } from '../../../src/parser';
import { createStateBackend } from '../../../src/common/stateBackend';
import { generateTencentPlan, displayPlan } from '../../../src/stack/scfStack';
import { generateAliyunPlan } from '../../../src/stack/aliyunStack';

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
    expect(displayPlan).toHaveBeenCalledWith(mockPlanResult);
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
    expect(displayPlan).toHaveBeenCalledWith(mockPlanResult);
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
});
