import { deployVolcengineStack } from '../../../../src/stack/volcengineStack/deployer';
import { getContext, ProviderEnum } from '../../../../src/common';
import type { ServerlessIac, StateFile } from '../../../../src/types';
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
    __: (key: string) => key,
  },
}));

jest.mock('../../../../src/stack/volcengineStack/vefaasPlanner', () => ({
  generateFunctionPlan: jest.fn().mockResolvedValue({ items: [] }),
}));

jest.mock('../../../../src/stack/volcengineStack/vefaasExecutor', () => ({
  executeFunctionPlan: jest
    .fn()
    .mockImplementation((context, plan, functions, state) => Promise.resolve({ state })),
}));

jest.mock('../../../../src/stack/volcengineStack/tosPlanner', () => ({
  generateBucketPlan: jest.fn().mockResolvedValue({ items: [] }),
}));

jest.mock('../../../../src/stack/volcengineStack/tosExecutor', () => ({
  executeBucketPlan: jest
    .fn()
    .mockImplementation((context, plan, buckets, state) => Promise.resolve({ state })),
}));

jest.mock('../../../../src/stack/volcengineStack/apigwPlanner', () => ({
  generateApigwPlan: jest.fn().mockResolvedValue({ items: [] }),
}));

jest.mock('../../../../src/stack/volcengineStack/apigwExecutor', () => ({
  executeApigwPlan: jest
    .fn()
    .mockImplementation((context, plan, events, service, state) => Promise.resolve({ state })),
}));

describe('volcengineStack deployer', () => {
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

  describe('deployVolcengineStack', () => {
    it('should deploy stack successfully', async () => {
      await deployVolcengineStack(mockIac, mockBackend);

      expect(mockBackend.loadState).toHaveBeenCalled();
      expect(mockBackend.saveState).toHaveBeenCalled();
    });

    it('should load state with correct parameters', async () => {
      await deployVolcengineStack(mockIac, mockBackend);

      expect(mockBackend.loadState).toHaveBeenCalledWith(
        'volcengine',
        'test-app',
        'test-service',
        'dev',
      );
    });

    it('should save state after deployment', async () => {
      await deployVolcengineStack(mockIac, mockBackend);

      expect(mockBackend.saveState).toHaveBeenCalledWith(
        mockState,
        'test-app',
        'test-service',
        'dev',
      );
    });

    it('should throw on bucket partial failure', async () => {
      const { executeBucketPlan } = jest.requireMock(
        '../../../../src/stack/volcengineStack/tosExecutor',
      );
      executeBucketPlan.mockResolvedValueOnce({
        state: mockState,
        partialFailure: {
          failedItem: {
            logicalId: 'buckets.test',
            action: 'create',
            resourceType: 'VOLCENGINE_TOS_BUCKET',
          },
          error: new Error('Bucket creation failed'),
          successfulItems: [],
        },
      });

      await expect(deployVolcengineStack(mockIac, mockBackend)).rejects.toThrow(
        'Bucket creation failed',
      );
    });

    it('should throw on function partial failure', async () => {
      const { executeFunctionPlan } = jest.requireMock(
        '../../../../src/stack/volcengineStack/vefaasExecutor',
      );
      executeFunctionPlan.mockResolvedValueOnce({
        state: mockState,
        partialFailure: {
          failedItem: {
            logicalId: 'functions.test',
            action: 'create',
            resourceType: 'VOLCENGINE_VEFAAS_FUNCTION',
          },
          error: new Error('Function creation failed'),
          successfulItems: [],
        },
      });

      await expect(deployVolcengineStack(mockIac, mockBackend)).rejects.toThrow(
        'Function creation failed',
      );
    });

    it('should throw on apigw partial failure', async () => {
      const { executeApigwPlan } = jest.requireMock(
        '../../../../src/stack/volcengineStack/apigwExecutor',
      );
      executeApigwPlan.mockResolvedValueOnce({
        state: mockState,
        partialFailure: {
          failedItem: {
            logicalId: 'events.test',
            action: 'create',
            resourceType: 'VOLCENGINE_APIGW',
          },
          error: new Error('API Gateway creation failed'),
          successfulItems: [],
        },
      });

      await expect(deployVolcengineStack(mockIac, mockBackend)).rejects.toThrow(
        'API Gateway creation failed',
      );
    });
  });
});
