import { destroyStack } from '../../../src/commands/destroy';
import { getContext, getIacLocation, setContext, setIac, ProviderEnum } from '../../../src/common';
import { parseYaml, revalYaml } from '../../../src/parser';
import { createStateBackend } from '../../../src/common/stateBackend';

jest.mock('../../../src/common', () => ({
  getContext: jest.fn(),
  getIacLocation: jest.fn(),
  setContext: jest.fn(),
  setIac: jest.fn(),
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
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

jest.mock('../../../src/stack/aliyunStack', () => ({
  destroyAliyunStack: jest.fn(),
}));

jest.mock('../../../src/stack/scfStack', () => ({
  destroyTencentStack: jest.fn(),
}));

jest.mock('../../../src/stack/volcengineStack', () => ({
  destroyVolcengineStack: jest.fn(),
}));

jest.mock('../../../src/lang', () => ({
  lang: {
    __: (key: string) => key,
  },
}));

describe('destroy command', () => {
  const mockBackend = {
    withLock: jest.fn((_: string, fn: () => Promise<void>) => fn()),
  };

  const mockContext = {
    app: 'test-app',
    service: 'test-service',
    stage: 'dev',
    region: 'cn-beijing',
    provider: ProviderEnum.ALIYUN,
  };

  const mockIac = {
    app: 'test-app',
    service: 'test-service',
    provider: { name: ProviderEnum.ALIYUN, region: 'cn-beijing' },
    backend: { type: 'local' },
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
    (revalYaml as jest.Mock).mockReturnValue(mockIac);
    (getContext as jest.Mock).mockReturnValue(mockContext);
    (createStateBackend as jest.Mock).mockReturnValue(mockBackend);
  });

  it('should destroy Aliyun stack', async () => {
    await destroyStack({ location: '/test/path' });

    expect(setContext).toHaveBeenCalled();
    expect(setIac).toHaveBeenCalledWith(mockIac);
    expect(
      jest.requireMock('../../../src/stack/aliyunStack').destroyAliyunStack,
    ).toHaveBeenCalledWith(mockBackend);
  });

  it('should destroy Tencent stack', async () => {
    (parseYaml as jest.Mock).mockReturnValue({
      app: 'test-app',
      service: 'test-service',
      provider: { name: ProviderEnum.TENCENT },
      stages: {},
    });
    (revalYaml as jest.Mock).mockReturnValue({
      ...mockIac,
      provider: { name: ProviderEnum.TENCENT, region: 'ap-guangzhou' },
    });
    (getContext as jest.Mock).mockReturnValue({
      ...mockContext,
      provider: ProviderEnum.TENCENT,
    });

    await destroyStack({ location: '/test/path' });

    expect(
      jest.requireMock('../../../src/stack/scfStack').destroyTencentStack,
    ).toHaveBeenCalledWith(mockBackend);
  });

  it('should destroy Volcengine stack', async () => {
    (parseYaml as jest.Mock).mockReturnValue({
      app: 'test-app',
      service: 'test-service',
      provider: { name: ProviderEnum.VOLCENGINE },
      stages: {},
    });
    (revalYaml as jest.Mock).mockReturnValue({
      ...mockIac,
      provider: { name: ProviderEnum.VOLCENGINE, region: 'cn-beijing' },
    });
    (getContext as jest.Mock).mockReturnValue({
      ...mockContext,
      provider: ProviderEnum.VOLCENGINE,
    });

    await destroyStack({ location: '/test/path' });

    expect(
      jest.requireMock('../../../src/stack/volcengineStack').destroyVolcengineStack,
    ).toHaveBeenCalledWith(mockBackend);
  });

  it('should throw error for unsupported provider', async () => {
    (parseYaml as jest.Mock).mockReturnValue({
      app: 'test-app',
      service: 'test-service',
      provider: { name: 'unsupported' },
      stages: {},
    });
    (revalYaml as jest.Mock).mockReturnValue({
      ...mockIac,
      provider: { name: 'unsupported', region: 'unknown' },
    });
    (getContext as jest.Mock).mockReturnValue({
      ...mockContext,
      provider: 'unsupported',
    });

    await expect(destroyStack({ location: '/test/path' })).rejects.toThrow(
      'Unsupported provider: unsupported',
    );
  });

  it('should pass options to setContext', async () => {
    await destroyStack({
      location: '/test/path',
      region: 'cn-shanghai',
      stage: 'prod',
      accessKeyId: 'test-ak',
      accessKeySecret: 'test-sk',
    });

    expect(setContext).toHaveBeenCalledWith(
      expect.objectContaining({
        region: 'cn-shanghai',
        stage: 'prod',
        accessKeyId: 'test-ak',
        accessKeySecret: 'test-sk',
      }),
      true,
    );
  });
});
