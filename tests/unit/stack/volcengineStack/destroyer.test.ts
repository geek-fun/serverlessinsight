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

jest.mock('../../../../src/stack/volcengineStack/tosResource', () => ({
  deleteResource: jest.fn(),
}));

jest.mock('../../../../src/stack/volcengineStack/vefaasResource', () => ({
  deleteResource: jest.fn(),
}));

jest.mock('../../../../src/stack/volcengineStack/apigwResource', () => ({
  deleteApigwResource: jest.fn(),
}));

jest.mock('../../../../src/common/stateManager', () => ({
  getAllResources: jest.fn(),
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
      const { getAllResources } = jest.requireMock('../../../../src/common/stateManager');
      getAllResources.mockReturnValue({});

      await destroyVolcengineStack(mockBackend);

      expect(mockBackend.loadState).toHaveBeenCalled();
      expect(mockBackend.saveState).toHaveBeenCalled();
    });

    it('should load state with correct parameters', async () => {
      const { getAllResources } = jest.requireMock('../../../../src/common/stateManager');
      getAllResources.mockReturnValue({});

      await destroyVolcengineStack(mockBackend);

      expect(mockBackend.loadState).toHaveBeenCalledWith(
        'volcengine',
        'test-app',
        'test-service',
        'dev',
      );
    });

    it('should save state after destruction', async () => {
      const { getAllResources } = jest.requireMock('../../../../src/common/stateManager');
      getAllResources.mockReturnValue({});

      await destroyVolcengineStack(mockBackend);

      expect(mockBackend.saveState).toHaveBeenCalledWith(
        mockState,
        'test-app',
        'test-service',
        'dev',
      );
    });

    it('should delete buckets in state', async () => {
      const stateWithBucket: StateFile = {
        ...mockState,
        resources: {
          'buckets.static_site': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { bucketName: 'test-bucket' },
            instances: [{ sid: 'test-sid', id: 'test-bucket', type: 'VOLCENGINE_TOS_BUCKET' }],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      mockBackend.loadState = jest.fn().mockResolvedValue(stateWithBucket);
      const { getAllResources } = jest.requireMock('../../../../src/common/stateManager');
      const { deleteResource } = jest.requireMock(
        '../../../../src/stack/volcengineStack/tosResource',
      );
      getAllResources.mockReturnValue(stateWithBucket.resources);
      deleteResource.mockResolvedValueOnce(mockState);

      await destroyVolcengineStack(mockBackend);

      expect(deleteResource).toHaveBeenCalledWith(
        mockContext,
        'test-bucket',
        'buckets.static_site',
        stateWithBucket,
      );
    });

    it('should delete functions in state', async () => {
      const stateWithFunction: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { functionName: 'test-function' },
            instances: [
              { sid: 'test-sid', id: 'test-function', type: 'VOLCENGINE_VEFAAS_FUNCTION' },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      mockBackend.loadState = jest.fn().mockResolvedValue(stateWithFunction);
      const { getAllResources } = jest.requireMock('../../../../src/common/stateManager');
      const { deleteResource } = jest.requireMock(
        '../../../../src/stack/volcengineStack/vefaasResource',
      );
      getAllResources.mockReturnValue(stateWithFunction.resources);
      deleteResource.mockResolvedValueOnce(mockState);

      await destroyVolcengineStack(mockBackend);

      expect(deleteResource).toHaveBeenCalledWith(
        mockContext,
        'test-function',
        'functions.test_fn',
        stateWithFunction,
      );
    });

    it('should handle bucket deletion error', async () => {
      const stateWithBucket: StateFile = {
        ...mockState,
        resources: {
          'buckets.static_site': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { bucketName: 'test-bucket' },
            instances: [{ sid: 'test-sid', id: 'test-bucket', type: 'VOLCENGINE_TOS_BUCKET' }],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      mockBackend.loadState = jest.fn().mockResolvedValue(stateWithBucket);
      const { getAllResources } = jest.requireMock('../../../../src/common/stateManager');
      const { deleteResource } = jest.requireMock(
        '../../../../src/stack/volcengineStack/tosResource',
      );
      getAllResources.mockReturnValue(stateWithBucket.resources);
      deleteResource.mockRejectedValueOnce(new Error('Deletion failed'));

      await destroyVolcengineStack(mockBackend);

      expect(mockBackend.saveState).toHaveBeenCalled();
    });

    it('should handle bucket deletion error with non-Error object', async () => {
      const stateWithBucket: StateFile = {
        ...mockState,
        resources: {
          'buckets.static_site': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { bucketName: 'test-bucket' },
            instances: [{ sid: 'test-sid', id: 'test-bucket', type: 'VOLCENGINE_TOS_BUCKET' }],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      mockBackend.loadState = jest.fn().mockResolvedValue(stateWithBucket);
      const { getAllResources } = jest.requireMock('../../../../src/common/stateManager');
      const { deleteResource } = jest.requireMock(
        '../../../../src/stack/volcengineStack/tosResource',
      );
      getAllResources.mockReturnValue(stateWithBucket.resources);
      deleteResource.mockRejectedValueOnce('String error');

      await destroyVolcengineStack(mockBackend);

      expect(mockBackend.saveState).toHaveBeenCalled();
    });

    it('should handle function deletion error', async () => {
      const stateWithFunction: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { functionName: 'test-function' },
            instances: [
              { sid: 'test-sid', id: 'test-function', type: 'VOLCENGINE_VEFAAS_FUNCTION' },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      mockBackend.loadState = jest.fn().mockResolvedValue(stateWithFunction);
      const { getAllResources } = jest.requireMock('../../../../src/common/stateManager');
      const { deleteResource } = jest.requireMock(
        '../../../../src/stack/volcengineStack/vefaasResource',
      );
      getAllResources.mockReturnValue(stateWithFunction.resources);
      deleteResource.mockRejectedValueOnce(new Error('Deletion failed'));

      await destroyVolcengineStack(mockBackend);

      expect(mockBackend.saveState).toHaveBeenCalled();
    });

    it('should handle function deletion error with non-Error object', async () => {
      const stateWithFunction: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { functionName: 'test-function' },
            instances: [
              { sid: 'test-sid', id: 'test-function', type: 'VOLCENGINE_VEFAAS_FUNCTION' },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      mockBackend.loadState = jest.fn().mockResolvedValue(stateWithFunction);
      const { getAllResources } = jest.requireMock('../../../../src/common/stateManager');
      const { deleteResource } = jest.requireMock(
        '../../../../src/stack/volcengineStack/vefaasResource',
      );
      getAllResources.mockReturnValue(stateWithFunction.resources);
      deleteResource.mockRejectedValueOnce({ code: 'SomeError' });

      await destroyVolcengineStack(mockBackend);

      expect(mockBackend.saveState).toHaveBeenCalled();
    });

    it('should skip bucket with missing bucketName', async () => {
      const stateWithBucket: StateFile = {
        ...mockState,
        resources: {
          'buckets.static_site': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {},
            instances: [{ sid: 'test-sid', id: 'test-bucket', type: 'VOLCENGINE_TOS_BUCKET' }],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      const { getAllResources } = jest.requireMock('../../../../src/common/stateManager');
      const { deleteResource } = jest.requireMock(
        '../../../../src/stack/volcengineStack/tosResource',
      );
      getAllResources.mockReturnValue(stateWithBucket.resources);

      await destroyVolcengineStack(mockBackend);

      expect(deleteResource).not.toHaveBeenCalled();
    });

    it('should skip function with missing functionName', async () => {
      const stateWithFunction: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {},
            instances: [
              { sid: 'test-sid', id: 'test-function', type: 'VOLCENGINE_VEFAAS_FUNCTION' },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      const { getAllResources } = jest.requireMock('../../../../src/common/stateManager');
      const { deleteResource } = jest.requireMock(
        '../../../../src/stack/volcengineStack/vefaasResource',
      );
      getAllResources.mockReturnValue(stateWithFunction.resources);

      await destroyVolcengineStack(mockBackend);

      expect(deleteResource).not.toHaveBeenCalled();
    });

    it('should skip resources without matching instance type', async () => {
      const stateWithOther: StateFile = {
        ...mockState,
        resources: {
          'buckets.static_site': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { bucketName: 'test-bucket' },
            instances: [{ sid: 'test-sid', id: 'test-bucket', type: 'OTHER_TYPE' }],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      const { getAllResources } = jest.requireMock('../../../../src/common/stateManager');
      const { deleteResource } = jest.requireMock(
        '../../../../src/stack/volcengineStack/tosResource',
      );
      getAllResources.mockReturnValue(stateWithOther.resources);

      await destroyVolcengineStack(mockBackend);

      expect(deleteResource).not.toHaveBeenCalled();
    });

    it('should skip resources without instances', async () => {
      const stateWithoutInstances: StateFile = {
        ...mockState,
        resources: {
          'buckets.static_site': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { bucketName: 'test-bucket' },
            instances: [],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      const { getAllResources } = jest.requireMock('../../../../src/common/stateManager');
      const { deleteResource } = jest.requireMock(
        '../../../../src/stack/volcengineStack/tosResource',
      );
      getAllResources.mockReturnValue(stateWithoutInstances.resources);

      await destroyVolcengineStack(mockBackend);

      expect(deleteResource).not.toHaveBeenCalled();
    });

    it('should delete API Gateway in state', async () => {
      const stateWithApigw: StateFile = {
        ...mockState,
        resources: {
          'events.api_gateway': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { groupName: 'test-gateway' },
            instances: [{ sid: 'test-sid', id: 'gateway-123', type: 'VOLCENGINE_APIGW_GROUP' }],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      mockBackend.loadState = jest.fn().mockResolvedValue(stateWithApigw);
      const { getAllResources } = jest.requireMock('../../../../src/common/stateManager');
      const { deleteApigwResource } = jest.requireMock(
        '../../../../src/stack/volcengineStack/apigwResource',
      );
      getAllResources.mockReturnValue(stateWithApigw.resources);
      deleteApigwResource.mockResolvedValueOnce(mockState);

      await destroyVolcengineStack(mockBackend);

      expect(deleteApigwResource).toHaveBeenCalledWith(
        mockContext,
        'events.api_gateway',
        stateWithApigw,
      );
    });

    it('should delete API Gateway API in state', async () => {
      const stateWithApigwApi: StateFile = {
        ...mockState,
        resources: {
          'events.api_gateway': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { groupName: 'test-gateway' },
            instances: [{ sid: 'test-sid', id: 'api-123', type: 'VOLCENGINE_APIGW_API' }],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      mockBackend.loadState = jest.fn().mockResolvedValue(stateWithApigwApi);
      const { getAllResources } = jest.requireMock('../../../../src/common/stateManager');
      const { deleteApigwResource } = jest.requireMock(
        '../../../../src/stack/volcengineStack/apigwResource',
      );
      getAllResources.mockReturnValue(stateWithApigwApi.resources);
      deleteApigwResource.mockResolvedValueOnce(mockState);

      await destroyVolcengineStack(mockBackend);

      expect(deleteApigwResource).toHaveBeenCalledWith(
        mockContext,
        'events.api_gateway',
        stateWithApigwApi,
      );
    });

    it('should handle API Gateway deletion error', async () => {
      const stateWithApigw: StateFile = {
        ...mockState,
        resources: {
          'events.api_gateway': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { groupName: 'test-gateway' },
            instances: [{ sid: 'test-sid', id: 'gateway-123', type: 'VOLCENGINE_APIGW_GROUP' }],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      mockBackend.loadState = jest.fn().mockResolvedValue(stateWithApigw);
      const { getAllResources } = jest.requireMock('../../../../src/common/stateManager');
      const { deleteApigwResource } = jest.requireMock(
        '../../../../src/stack/volcengineStack/apigwResource',
      );
      getAllResources.mockReturnValue(stateWithApigw.resources);
      deleteApigwResource.mockRejectedValueOnce(new Error('Deletion failed'));

      await destroyVolcengineStack(mockBackend);

      expect(mockBackend.saveState).toHaveBeenCalled();
    });

    it('should handle API Gateway deletion error with non-Error object', async () => {
      const stateWithApigw: StateFile = {
        ...mockState,
        resources: {
          'events.api_gateway': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { groupName: 'test-gateway' },
            instances: [{ sid: 'test-sid', id: 'gateway-123', type: 'VOLCENGINE_APIGW_GROUP' }],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      mockBackend.loadState = jest.fn().mockResolvedValue(stateWithApigw);
      const { getAllResources } = jest.requireMock('../../../../src/common/stateManager');
      const { deleteApigwResource } = jest.requireMock(
        '../../../../src/stack/volcengineStack/apigwResource',
      );
      getAllResources.mockReturnValue(stateWithApigw.resources);
      deleteApigwResource.mockRejectedValueOnce('String error');

      await destroyVolcengineStack(mockBackend);

      expect(mockBackend.saveState).toHaveBeenCalled();
    });
  });
});
