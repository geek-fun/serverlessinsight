import { createTencentEsOperations } from '../../../../src/common/tencentClient/esOperations';
import { TencentEsSpaceStatus } from '../../../../src/common/tencentClient/types';
import * as polling from '../../../../src/common/polling';

jest.mock('../../../../src/common/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('../../../../src/lang', () => ({
  lang: {
    __: (key: string, params?: Record<string, unknown>) => {
      if (params) return `${key}:${JSON.stringify(params)}`;
      return key;
    },
  },
}));

const mockEsClient = {
  CreateServerlessSpaceV2: jest.fn(),
  DescribeServerlessSpaces: jest.fn(),
  UpdateServerlessSpace: jest.fn(),
  DescribeServerlessInstances: jest.fn(),
  DeleteServerlessInstance: jest.fn(),
};

const mockContext = {
  region: 'ap-guangzhou',
};

describe('esOperations', () => {
  let operations: ReturnType<typeof createTencentEsOperations>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    operations = createTencentEsOperations(mockEsClient as any, mockContext as any);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('createSpace', () => {
    it('should create space successfully and wait for ready state', async () => {
      mockEsClient.CreateServerlessSpaceV2.mockResolvedValue({
        SpaceId: 'space-123',
      });

      mockEsClient.DescribeServerlessSpaces.mockResolvedValue({
        ServerlessSpaces: [
          {
            SpaceId: 'space-123',
            SpaceName: 'test-space',
            Status: TencentEsSpaceStatus.NORMAL,
            CreateTime: '2024-01-01T00:00:00Z',
          },
        ],
      });

      const config = {
        SpaceName: 'test-space',
      };

      const spaceId = await operations.createSpace(config);

      expect(spaceId).toBe('space-123');
      expect(mockEsClient.CreateServerlessSpaceV2).toHaveBeenCalledWith(
        expect.objectContaining({
          SpaceName: 'test-space',
        }),
      );
    });

    it('should include VpcInfo when provided', async () => {
      mockEsClient.CreateServerlessSpaceV2.mockResolvedValue({
        SpaceId: 'space-456',
      });

      mockEsClient.DescribeServerlessSpaces.mockResolvedValue({
        ServerlessSpaces: [
          {
            SpaceId: 'space-456',
            SpaceName: 'test-space-vpc',
            Status: TencentEsSpaceStatus.NORMAL,
          },
        ],
      });

      const config = {
        SpaceName: 'test-space-vpc',
        VpcInfo: [
          {
            VpcId: 'vpc-123',
            SubnetId: 'subnet-456',
          },
        ],
      };

      await operations.createSpace(config);

      expect(mockEsClient.CreateServerlessSpaceV2).toHaveBeenCalledWith(
        expect.objectContaining({
          VpcInfo: config.VpcInfo,
        }),
      );
    });

    it('should include Zone when provided', async () => {
      mockEsClient.CreateServerlessSpaceV2.mockResolvedValue({
        SpaceId: 'space-789',
      });

      mockEsClient.DescribeServerlessSpaces.mockResolvedValue({
        ServerlessSpaces: [
          {
            SpaceId: 'space-789',
            SpaceName: 'test-space-zone',
            Status: TencentEsSpaceStatus.NORMAL,
          },
        ],
      });

      const config = {
        SpaceName: 'test-space-zone',
        Zone: 'ap-guangzhou-3',
      };

      await operations.createSpace(config);

      expect(mockEsClient.CreateServerlessSpaceV2).toHaveBeenCalledWith(
        expect.objectContaining({
          Zone: 'ap-guangzhou-3',
        }),
      );
    });

    it('should include white-listed IPs and tags when provided', async () => {
      mockEsClient.CreateServerlessSpaceV2.mockResolvedValue({ SpaceId: 'space-tags' });
      mockEsClient.DescribeServerlessSpaces.mockResolvedValue({
        ServerlessSpaces: [{ SpaceId: 'space-tags', Status: TencentEsSpaceStatus.NORMAL }],
      });

      await operations.createSpace({
        SpaceName: 'tagged-space',
        KibanaWhiteIpList: ['1.2.3.4'],
        Tags: [{ Key: 'env', Value: 'test' }],
      });

      expect(mockEsClient.CreateServerlessSpaceV2).toHaveBeenCalledWith(
        expect.objectContaining({
          KibanaWhiteIpList: ['1.2.3.4'],
          TagList: [{ TagKey: 'env', TagValue: 'test' }],
        }),
      );
    });

    it('should throw error when no SpaceId returned', async () => {
      mockEsClient.CreateServerlessSpaceV2.mockResolvedValue({});

      const config = {
        SpaceName: 'test-space',
      };

      await expect(operations.createSpace(config)).rejects.toThrow(
        'TENCENT_ES_SPACE_NO_ID_RETURNED',
      );
    });

    it('should reject when the space reaches a deleted state while creating', async () => {
      mockEsClient.CreateServerlessSpaceV2.mockResolvedValue({ SpaceId: 'space-123' });
      mockEsClient.DescribeServerlessSpaces.mockResolvedValue({
        ServerlessSpaces: [{ SpaceId: 'space-123', Status: TencentEsSpaceStatus.DELETED }],
      });

      await expect(operations.createSpace({ SpaceName: 'test-space' })).rejects.toThrow(
        'TENCENT_ES_SPACE_ERROR_STATE',
      );
    });

    it('should translate a readiness polling timeout', async () => {
      mockEsClient.CreateServerlessSpaceV2.mockResolvedValue({ SpaceId: 'space-123' });
      const pollSpy = jest.spyOn(polling, 'pollUntil').mockRejectedValueOnce(
        new polling.PollingTimeoutError({
          description: 'ready',
          lastValue: null,
          attempts: 60,
          maxAttempts: 60,
          intervalMs: 10000,
        }),
      );

      await expect(operations.createSpace({ SpaceName: 'test-space' })).rejects.toThrow(
        'TENCENT_ES_SPACE_TIMEOUT_READY',
      );

      pollSpy.mockRestore();
    });

    it('should handle creation errors', async () => {
      const error = new Error('creation failed');
      mockEsClient.CreateServerlessSpaceV2.mockRejectedValue(error);

      const config = {
        SpaceName: 'test-space',
      };

      await expect(operations.createSpace(config)).rejects.toThrow();
    });
  });

  describe('getSpace', () => {
    it('should return space info on success', async () => {
      mockEsClient.DescribeServerlessSpaces.mockResolvedValue({
        ServerlessSpaces: [
          {
            SpaceId: 'space-123',
            SpaceName: 'test-space',
            Status: TencentEsSpaceStatus.NORMAL,
            CreateTime: '2024-01-01T00:00:00Z',
            IndexCount: 5,
            KibanaUrl: 'https://kibana.example.com',
            KibanaPrivateUrl: 'https://kibana-private.example.com',
          },
        ],
      });

      const result = await operations.getSpace('space-123');

      expect(result).toEqual(
        expect.objectContaining({
          SpaceId: 'space-123',
          SpaceName: 'test-space',
          Status: TencentEsSpaceStatus.NORMAL,
        }),
      );
    });

    it('should return null when space is not found', async () => {
      mockEsClient.DescribeServerlessSpaces.mockResolvedValue({
        ServerlessSpaces: [],
      });

      const result = await operations.getSpace('nonexistent');

      expect(result).toBeNull();
    });

    it('should rethrow non-not-found errors', async () => {
      const error = new Error('API error');
      mockEsClient.DescribeServerlessSpaces.mockRejectedValue(error);

      await expect(operations.getSpace('space-123')).rejects.toThrow('API error');
    });

    it('should return null on ResourceNotFound', async () => {
      const error = new Error('not found') as Error & { code: string };
      error.code = 'ResourceNotFound.ServerlessSpaceNotFound';
      mockEsClient.DescribeServerlessSpaces.mockRejectedValue(error);

      const result = await operations.getSpace('space-123');

      expect(result).toBeNull();
    });

    it('should use default status when Status is not provided', async () => {
      mockEsClient.DescribeServerlessSpaces.mockResolvedValue({
        ServerlessSpaces: [
          {
            SpaceId: 'space-123',
            SpaceName: 'test-space',
          },
        ],
      });

      const result = await operations.getSpace('space-123');

      expect(result?.Status).toBe(TencentEsSpaceStatus.CREATING);
    });

    it('should return null when the API reports an invalid parameter', async () => {
      mockEsClient.DescribeServerlessSpaces.mockRejectedValue({ code: 'InvalidParameterValue' });

      await expect(operations.getSpace('space-123')).resolves.toBeNull();
    });

    it('should retain the full detail set (max-detail state)', async () => {
      mockEsClient.DescribeServerlessSpaces.mockResolvedValue({
        ServerlessSpaces: [
          {
            SpaceId: 'space-123',
            SpaceName: 'test-space',
            Status: TencentEsSpaceStatus.NORMAL,
            CreateTime: '2024-01-01T00:00:00Z',
            IndexCount: 5,
            KibanaUrl: 'https://kibana.example.com',
            KibanaPrivateUrl: 'https://kibana-private.example.com',
            IndexAccessUrl: 'https://index-access.example.com',
            KibanaPublicAcl: {
              BlackIpList: ['203.0.113.1'],
              WhiteIpList: ['198.51.100.1'],
            },
            KibanaEmbedUrl: 'https://embed.example.com',
            DiDataList: [
              {
                DiId: 'di-1',
                CreateTime: '2024-01-01T00:00:00Z',
                Status: 1,
                DiDataSourceType: 'CVM',
              },
            ],
            VpcInfo: [
              {
                VpcId: 'vpc-123',
                SubnetId: 'subnet-456',
                VpcUid: 1000,
                SubnetUid: 2000,
                AvailableIpAddressCount: 10,
              },
            ],
            Region: 'ap-guangzhou',
            Zone: 'ap-guangzhou-3',
            EnableKibanaPublicAccess: 1,
            EnableKibanaPrivateAccess: 0,
            AppId: 1250000000,
            KibanaLanguage: 'zh-CN',
            ClusterType: 0,
            EnableMcpAccess: 1,
            McpAccess: 'https://mcp.example.com',
            TagList: [{ TagKey: 'env', TagValue: 'prod' }],
          },
        ],
      });

      const result = await operations.getSpace('space-123');

      expect(result).toEqual(
        expect.objectContaining({
          IndexAccessUrl: 'https://index-access.example.com',
          KibanaPublicAcl: {
            BlackIpList: ['203.0.113.1'],
            WhiteIpList: ['198.51.100.1'],
          },
          KibanaEmbedUrl: 'https://embed.example.com',
          DiDataList: [
            {
              DiId: 'di-1',
              CreateTime: '2024-01-01T00:00:00Z',
              Status: 1,
              DiDataSourceType: 'CVM',
            },
          ],
          VpcInfo: [
            {
              VpcId: 'vpc-123',
              SubnetId: 'subnet-456',
              VpcUid: 1000,
              SubnetUid: 2000,
              AvailableIpAddressCount: 10,
            },
          ],
          Region: 'ap-guangzhou',
          Zone: 'ap-guangzhou-3',
          EnableKibanaPublicAccess: 1,
          EnableKibanaPrivateAccess: 0,
          AppId: 1250000000,
          KibanaLanguage: 'zh-CN',
          ClusterType: 0,
          EnableMcpAccess: 1,
          McpAccess: 'https://mcp.example.com',
          Tags: [{ Key: 'env', Value: 'prod' }],
        }),
      );
    });
  });

  describe('updateSpace', () => {
    it('should update space and wait for ready state', async () => {
      mockEsClient.UpdateServerlessSpace.mockResolvedValue({});

      mockEsClient.DescribeServerlessSpaces.mockResolvedValue({
        ServerlessSpaces: [
          {
            SpaceId: 'space-123',
            SpaceName: 'updated-space',
            Status: TencentEsSpaceStatus.NORMAL,
          },
        ],
      });

      const config = {
        SpaceName: 'updated-space',
      };

      await operations.updateSpace('space-123', config);

      expect(mockEsClient.UpdateServerlessSpace).toHaveBeenCalledWith(
        expect.objectContaining({
          SpaceId: 'space-123',
          SpaceName: 'updated-space',
        }),
      );
    });

    it('should include KibanaWhiteIpList when provided', async () => {
      mockEsClient.UpdateServerlessSpace.mockResolvedValue({});

      mockEsClient.DescribeServerlessSpaces.mockResolvedValue({
        ServerlessSpaces: [
          {
            SpaceId: 'space-123',
            SpaceName: 'test-space',
            Status: TencentEsSpaceStatus.NORMAL,
          },
        ],
      });

      const config = {
        SpaceName: 'test-space',
        KibanaWhiteIpList: ['1.2.3.4', '5.6.7.8'],
      };

      await operations.updateSpace('space-123', config);

      expect(mockEsClient.UpdateServerlessSpace).toHaveBeenCalledWith(
        expect.objectContaining({
          KibanaWhiteIpList: ['1.2.3.4', '5.6.7.8'],
        }),
      );
    });

    it('should handle update errors', async () => {
      const error = new Error('update failed');
      mockEsClient.UpdateServerlessSpace.mockRejectedValue(error);

      const config = {
        SpaceName: 'test-space',
      };

      await expect(operations.updateSpace('space-123', config)).rejects.toThrow();
    });
  });

  describe('getSpaceByName', () => {
    it('should return the matching space and map its tags', async () => {
      mockEsClient.DescribeServerlessSpaces.mockResolvedValue({
        ServerlessSpaces: [
          { SpaceName: 'other' },
          {
            SpaceId: 'space-123',
            SpaceName: 'target',
            TagList: [{ TagKey: 'team', TagValue: 'core' }],
          },
        ],
      });

      await expect(operations.getSpaceByName('target')).resolves.toEqual(
        expect.objectContaining({ SpaceId: 'space-123', Tags: [{ Key: 'team', Value: 'core' }] }),
      );
    });

    it('should return null when no space matches by name', async () => {
      mockEsClient.DescribeServerlessSpaces.mockResolvedValue({
        ServerlessSpaces: [{ SpaceName: 'other' }],
      });

      await expect(operations.getSpaceByName('target')).resolves.toBeNull();
    });

    it('should return null for a not-found name lookup error', async () => {
      mockEsClient.DescribeServerlessSpaces.mockRejectedValue({ code: 'InvalidParameterValue' });

      await expect(operations.getSpaceByName('target')).resolves.toBeNull();
    });

    it('should rethrow unexpected name lookup errors', async () => {
      mockEsClient.DescribeServerlessSpaces.mockRejectedValue(new Error('permission denied'));

      await expect(operations.getSpaceByName('target')).rejects.toThrow('permission denied');
    });
  });

  describe('deleteSpace', () => {
    it('should delete space and all instances', async () => {
      mockEsClient.DescribeServerlessInstances.mockResolvedValue({
        Instances: [{ InstanceId: 'instance-1' }, { InstanceId: 'instance-2' }],
      });

      mockEsClient.DeleteServerlessInstance.mockResolvedValue({});
      mockEsClient.DescribeServerlessSpaces.mockResolvedValue({ ServerlessSpaces: [] });

      await operations.deleteSpace('space-123');

      expect(mockEsClient.DeleteServerlessInstance).toHaveBeenCalledWith({
        InstanceId: 'instance-1',
      });
      expect(mockEsClient.DeleteServerlessInstance).toHaveBeenCalledWith({
        InstanceId: 'instance-2',
      });
    });

    it('should handle empty instances gracefully', async () => {
      mockEsClient.DescribeServerlessInstances.mockResolvedValue({
        Instances: [],
      });

      mockEsClient.DescribeServerlessSpaces.mockResolvedValue({
        ServerlessSpaces: [],
      });

      await operations.deleteSpace('space-123');

      expect(mockEsClient.DeleteServerlessInstance).not.toHaveBeenCalled();
    });

    it('should handle ResourceNotFound error silently', async () => {
      const error = Object.assign(new Error('not found'), {
        code: 'ResourceNotFound',
      });
      mockEsClient.DescribeServerlessInstances.mockRejectedValue(error);

      await expect(operations.deleteSpace('space-123')).resolves.toBeUndefined();
    });

    it('should handle InvalidParameterValue error silently', async () => {
      const error = Object.assign(new Error('invalid'), {
        code: 'InvalidParameterValue',
      });
      mockEsClient.DescribeServerlessInstances.mockRejectedValue(error);

      await expect(operations.deleteSpace('space-123')).resolves.toBeUndefined();
    });

    it('should rethrow unexpected errors', async () => {
      const error = new Error('permission denied');
      mockEsClient.DescribeServerlessInstances.mockRejectedValue(error);

      await expect(operations.deleteSpace('space-123')).rejects.toThrow('permission denied');
    });

    it('should skip instances without InstanceId', async () => {
      mockEsClient.DescribeServerlessInstances.mockResolvedValue({
        Instances: [{ InstanceId: 'instance-1' }, {}, { InstanceId: 'instance-2' }],
      });

      mockEsClient.DeleteServerlessInstance.mockResolvedValue({});

      mockEsClient.DescribeServerlessSpaces.mockResolvedValue({
        ServerlessSpaces: [],
      });

      await operations.deleteSpace('space-123');

      expect(mockEsClient.DeleteServerlessInstance).toHaveBeenCalledTimes(2);
    });

    it('should finish deletion when the space is observed in deleted state', async () => {
      mockEsClient.DescribeServerlessInstances.mockResolvedValue({ Instances: [] });
      mockEsClient.DescribeServerlessSpaces.mockResolvedValue({
        ServerlessSpaces: [{ SpaceId: 'space-123', Status: TencentEsSpaceStatus.DELETED }],
      });

      await operations.deleteSpace('space-123');

      expect(mockEsClient.DescribeServerlessSpaces).toHaveBeenCalledWith({
        SpaceIds: ['space-123'],
      });
    });

    it('should translate a deletion polling timeout', async () => {
      mockEsClient.DescribeServerlessInstances.mockResolvedValue({ Instances: [] });
      const pollSpy = jest.spyOn(polling, 'pollUntil').mockRejectedValueOnce(
        new polling.PollingTimeoutError({
          description: 'deleted',
          lastValue: null,
          attempts: 60,
          maxAttempts: 60,
          intervalMs: 10000,
        }),
      );

      await expect(operations.deleteSpace('space-123')).rejects.toThrow(
        'TENCENT_ES_SPACE_TIMEOUT_DELETE',
      );

      pollSpy.mockRestore();
    });
  });
});
