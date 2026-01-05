import {
  createApiGroup,
  getApiGroup,
  findApiGroupByName,
  updateApiGroup,
  deleteApiGroup,
  createApi,
  getApi,
  updateApi,
  deleteApi,
  deployApi,
  abolishApi,
  bindCustomDomain,
  unbindCustomDomain,
} from '../../../src/stack/aliyunStack/apigwProvider';
import { createAliyunClient } from '../../../src/common/aliyunClient';
import { ProviderEnum } from '../../../src/common';
import { Context } from '../../../src/types';

// Mock dependencies
jest.mock('../../../src/common/aliyunClient');

describe('ApigwProvider', () => {
  const mockContext: Context = {
    stage: 'default',
    stackName: 'test-stack',
    provider: ProviderEnum.ALIYUN,
    region: 'cn-hangzhou',
    accountId: '123456789012',
    accessKeyId: 'test-key',
    accessKeySecret: 'test-secret',
    iacLocation: 'test.yml',
    parameters: [],
    stages: {},
  };

  const mockGroupConfig = {
    groupName: 'test-api-group',
    description: 'Test API group',
  };

  const mockApiConfig = {
    groupId: 'group-123',
    apiName: 'test-api',
    visibility: 'PRIVATE' as const,
    authType: 'ANONYMOUS' as const,
    requestConfig: {
      requestProtocol: 'HTTP' as const,
      requestHttpMethod: 'GET',
      requestPath: '/users',
      requestMode: 'PASSTHROUGH' as const,
    },
    serviceConfig: {
      serviceProtocol: 'FunctionCompute' as const,
      functionComputeConfig: {
        fcRegionId: 'cn-hangzhou',
        functionName: 'userFunction',
      },
    },
    resultType: 'PASSTHROUGH' as const,
    resultSample: 'test result',
  };

  let mockApigwClient: {
    createApiGroup: jest.Mock;
    getApiGroup: jest.Mock;
    findApiGroupByName: jest.Mock;
    updateApiGroup: jest.Mock;
    deleteApiGroup: jest.Mock;
    createApi: jest.Mock;
    getApi: jest.Mock;
    updateApi: jest.Mock;
    deleteApi: jest.Mock;
    deployApi: jest.Mock;
    abolishApi: jest.Mock;
    bindCustomDomain: jest.Mock;
    unbindCustomDomain: jest.Mock;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockApigwClient = {
      createApiGroup: jest.fn().mockResolvedValue('group-123'),
      getApiGroup: jest.fn().mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-api-group',
        subDomain: 'test.alicloudapi.com',
      }),
      findApiGroupByName: jest.fn().mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-api-group',
      }),
      updateApiGroup: jest.fn().mockResolvedValue(undefined),
      deleteApiGroup: jest.fn().mockResolvedValue(undefined),
      createApi: jest.fn().mockResolvedValue('api-456'),
      getApi: jest.fn().mockResolvedValue({
        apiId: 'api-456',
        apiName: 'test-api',
        groupId: 'group-123',
      }),
      updateApi: jest.fn().mockResolvedValue(undefined),
      deleteApi: jest.fn().mockResolvedValue(undefined),
      deployApi: jest.fn().mockResolvedValue(undefined),
      abolishApi: jest.fn().mockResolvedValue(undefined),
      bindCustomDomain: jest.fn().mockResolvedValue(undefined),
      unbindCustomDomain: jest.fn().mockResolvedValue(undefined),
    };
    (createAliyunClient as jest.Mock).mockReturnValue({ apigw: mockApigwClient });
  });

  describe('createApiGroup', () => {
    it('should create API group successfully', async () => {
      const groupId = await createApiGroup(mockContext, mockGroupConfig);

      expect(createAliyunClient).toHaveBeenCalledWith(mockContext);
      expect(mockApigwClient.createApiGroup).toHaveBeenCalledWith(
        expect.objectContaining({
          groupName: 'test-api-group',
          description: 'Test API group',
        }),
      );
      expect(groupId).toBe('group-123');
    });

    it('should throw error if no groupId returned', async () => {
      mockApigwClient.createApiGroup.mockRejectedValue(
        new Error('Failed to create API Gateway group: no groupId returned'),
      );

      await expect(createApiGroup(mockContext, mockGroupConfig)).rejects.toThrow(
        'Failed to create API Gateway group: no groupId returned',
      );
    });
  });

  describe('getApiGroup', () => {
    it('should get API group by ID', async () => {
      const result = await getApiGroup(mockContext, 'group-123');

      expect(mockApigwClient.getApiGroup).toHaveBeenCalledWith('group-123');
      expect(result).toMatchObject({
        groupId: 'group-123',
        groupName: 'test-api-group',
      });
    });

    it('should return null for NotFoundApiGroup error', async () => {
      mockApigwClient.getApiGroup.mockResolvedValue(null);

      const result = await getApiGroup(mockContext, 'nonexistent');

      expect(result).toBeNull();
    });

    it('should return null for InvalidGroupId.NotFound error', async () => {
      mockApigwClient.getApiGroup.mockResolvedValue(null);

      const result = await getApiGroup(mockContext, 'nonexistent');

      expect(result).toBeNull();
    });

    it('should propagate other errors', async () => {
      const error = new Error('Network error');
      mockApigwClient.getApiGroup.mockRejectedValue(error);

      await expect(getApiGroup(mockContext, 'group-123')).rejects.toThrow('Network error');
    });
  });

  describe('findApiGroupByName', () => {
    it('should find API group by name', async () => {
      const result = await findApiGroupByName(mockContext, 'test-api-group');

      expect(mockApigwClient.findApiGroupByName).toHaveBeenCalledWith('test-api-group');
      expect(result?.groupId).toBe('group-123');
    });

    it('should return null if group not found', async () => {
      mockApigwClient.findApiGroupByName.mockResolvedValue(null);

      const result = await findApiGroupByName(mockContext, 'nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('updateApiGroup', () => {
    it('should update API group', async () => {
      await updateApiGroup(mockContext, 'group-123', { description: 'Updated description' });

      expect(mockApigwClient.updateApiGroup).toHaveBeenCalledWith('group-123', {
        description: 'Updated description',
      });
    });
  });

  describe('deleteApiGroup', () => {
    it('should delete API group', async () => {
      await deleteApiGroup(mockContext, 'group-123');

      expect(mockApigwClient.deleteApiGroup).toHaveBeenCalledWith('group-123');
    });
  });

  describe('createApi', () => {
    it('should create API successfully', async () => {
      const apiId = await createApi(mockContext, mockApiConfig);

      expect(mockApigwClient.createApi).toHaveBeenCalled();
      expect(apiId).toBe('api-456');
    });

    it('should throw error if no apiId returned', async () => {
      mockApigwClient.createApi.mockRejectedValue(
        new Error('Failed to create API: no apiId returned'),
      );

      await expect(createApi(mockContext, mockApiConfig)).rejects.toThrow(
        'Failed to create API: no apiId returned',
      );
    });
  });

  describe('getApi', () => {
    it('should get API by ID', async () => {
      const result = await getApi(mockContext, 'group-123', 'api-456');

      expect(mockApigwClient.getApi).toHaveBeenCalledWith('group-123', 'api-456');
      expect(result?.apiId).toBe('api-456');
    });

    it('should return null for NotFoundApi error', async () => {
      mockApigwClient.getApi.mockResolvedValue(null);

      const result = await getApi(mockContext, 'group-123', 'nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('updateApi', () => {
    it('should update API', async () => {
      await updateApi(mockContext, 'api-456', mockApiConfig);

      expect(mockApigwClient.updateApi).toHaveBeenCalledWith('api-456', mockApiConfig);
    });
  });

  describe('deleteApi', () => {
    it('should delete API', async () => {
      await deleteApi(mockContext, 'group-123', 'api-456');

      expect(mockApigwClient.deleteApi).toHaveBeenCalledWith('group-123', 'api-456');
    });
  });

  describe('deployApi', () => {
    it('should deploy API to stage', async () => {
      const deployConfig = {
        groupId: 'group-123',
        apiId: 'api-456',
        stageName: 'RELEASE' as const,
        description: 'Deploy to production',
      };
      await deployApi(mockContext, deployConfig);

      expect(mockApigwClient.deployApi).toHaveBeenCalledWith(deployConfig);
    });
  });

  describe('abolishApi', () => {
    it('should abolish API from stage', async () => {
      await abolishApi(mockContext, 'group-123', 'api-456', 'RELEASE');

      expect(mockApigwClient.abolishApi).toHaveBeenCalledWith('group-123', 'api-456', 'RELEASE');
    });
  });

  describe('bindCustomDomain', () => {
    it('should bind custom domain', async () => {
      const domainConfig = {
        groupId: 'group-123',
        domainName: 'api.example.com',
      };
      await bindCustomDomain(mockContext, domainConfig);

      expect(mockApigwClient.bindCustomDomain).toHaveBeenCalledWith(domainConfig);
    });

    it('should set certificate if provided', async () => {
      const domainConfig = {
        groupId: 'group-123',
        domainName: 'api.example.com',
        certificateName: 'test-cert',
        certificateBody: '-----BEGIN CERTIFICATE-----',
        certificatePrivateKey: '-----BEGIN PRIVATE KEY-----',
      };
      await bindCustomDomain(mockContext, domainConfig);

      expect(mockApigwClient.bindCustomDomain).toHaveBeenCalledWith(domainConfig);
    });
  });

  describe('unbindCustomDomain', () => {
    it('should unbind custom domain', async () => {
      await unbindCustomDomain(mockContext, 'group-123', 'api.example.com');

      expect(mockApigwClient.unbindCustomDomain).toHaveBeenCalledWith(
        'group-123',
        'api.example.com',
      );
    });
  });
});
