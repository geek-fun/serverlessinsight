import { destroyVolcengineStack } from '../../../../src/stack/volcengineStack/destroyer';
import { getContext, ProviderEnum } from '../../../../src/common';
import type { StateFile } from '../../../../src/types';
import type { StateBackend } from '../../../../src/common/stateBackend';

jest.mock('../../../../src/common', () => ({
  getContext: jest.fn(),
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

jest.mock('../../../../src/lang', () => ({
  lang: {
    __: (key: string, params?: Record<string, string>) => {
      if (params) return `${key}:${JSON.stringify(params)}`;
      return key;
    },
  },
}));

describe('volcengineStack destroyer', () => {
  const mockContext = {
    app: 'test-app',
    service: 'test-service',
    stage: 'dev',
    region: 'cn-beijing',
    provider: ProviderEnum.VOLCENGINE,
    accessKeyId: 'test-ak',
    accessKeySecret: 'test-sk',
    iacLocation: '/test/path',
  };

  const mockState: StateFile = {
    version: '1.0',
    provider: 'volcengine',
    app: 'test-app',
    service: 'test-service',
    stages: {},
    resources: {},
  };

  const mockBackend = {
    loadState: jest.fn().mockResolvedValue(mockState),
    saveState: jest.fn(),
    withLock: jest.fn(),
    acquireLock: jest.fn(),
    releaseLock: jest.fn(),
    forceUnlock: jest.fn(),
    readLock: jest.fn(),
  } as unknown as StateBackend;

  beforeEach(() => {
    jest.clearAllMocks();
    (getContext as jest.Mock).mockReturnValue(mockContext);
  });

  describe('destroyVolcengineStack', () => {
    it('should destroy stack successfully', async () => {
      await destroyVolcengineStack(mockBackend);

      expect(mockBackend.loadState).toHaveBeenCalled();
      expect(mockBackend.saveState).toHaveBeenCalled();
    });

    it('should load state with correct parameters', async () => {
      await destroyVolcengineStack(mockBackend);

      expect(mockBackend.loadState).toHaveBeenCalledWith(
        'volcengine',
        'test-app',
        'test-service',
        'dev',
      );
    });

    it('should save state after destruction', async () => {
      await destroyVolcengineStack(mockBackend);

      expect(mockBackend.saveState).toHaveBeenCalledWith(
        mockState,
        'test-app',
        'test-service',
        'dev',
      );
    });
  });
});
