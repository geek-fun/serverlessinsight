import { generateVolcenginePlan } from '../../../../src/stack/volcengineStack/planner';
import { getContext, ProviderEnum } from '../../../../src/common';
import type { ServerlessIac, StateFile } from '../../../../src/types';
import type { StateBackend } from '../../../../src/common/stateBackend';

jest.mock('../../../../src/common', () => ({
  getContext: jest.fn(),
  getDependencyInfo: jest.fn((items) => ({
    order: items,
    levels: [],
    graph: new Map(),
    cycleError: null,
  })),
  toDotFormat: jest.fn(() => 'digraph {}'),
  ProviderEnum: {
    HUAWEI: 'huawei',
    ALIYUN: 'aliyun',
    TENCENT: 'tencent',
    AWS: 'aws',
    VOLCENGINE: 'volcengine',
  },
}));

jest.mock('../../../../src/common/stateBackend', () => ({
  StateBackend: jest.fn(),
}));

jest.mock('../../../../src/lang', () => ({
  lang: {
    __: (key: string) => key,
  },
}));

describe('volcengineStack planner', () => {
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

  const mockIac: ServerlessIac = {
    version: '1.0',
    app: 'test-app',
    service: 'test-service',
    provider: {
      name: ProviderEnum.VOLCENGINE,
      region: 'cn-beijing',
    },
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

  describe('generateVolcenginePlan', () => {
    it('should generate an empty plan for empty IAC', async () => {
      const result = await generateVolcenginePlan(mockIac, mockBackend);

      expect(result).toHaveProperty('items');
      expect(result).toHaveProperty('levels');
      expect(result).toHaveProperty('graph');
      expect(result).toHaveProperty('dotGraph');
      expect(result.items).toEqual([]);
    });

    it('should load state with correct parameters', async () => {
      await generateVolcenginePlan(mockIac, mockBackend);

      expect(mockBackend.loadState).toHaveBeenCalledWith(
        'volcengine',
        'test-app',
        'test-service',
        'dev',
      );
    });

    it('should throw error when cycle is detected', async () => {
      const { getDependencyInfo } = jest.requireMock('../../../../src/common');
      getDependencyInfo.mockReturnValueOnce({
        order: [],
        levels: [],
        graph: new Map(),
        cycleError: { cycle: ['a', 'b', 'a'] },
      });

      await expect(generateVolcenginePlan(mockIac, mockBackend)).rejects.toThrow('CYCLE_DETECTED');
    });
  });
});
