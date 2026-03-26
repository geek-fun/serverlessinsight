import { createTencentEsOperations } from '../../../../src/common/tencentClient/esOperations';
import { TencentEsSpaceStatus } from '../../../../src/common/tencentClient/types';

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

    it('should throw error when no SpaceId returned', async () => {
      mockEsClient.CreateServerlessSpaceV2.mockResolvedValue({});

      const config = {
        SpaceName: 'test-space',
      };

      await expect(operations.createSpace(config)).rejects.toThrow(
        'TENCENT_ES_SPACE_NO_ID_RETURNED',
      );
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

    it('should return null on error', async () => {
      const error = new Error('API error');
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
  });
});
