import {
  createTdsqlcCluster,
  getTdsqlcCluster,
  updateTdsqlcCluster,
  deleteTdsqlcCluster,
} from '../../../src/stack/scfStack/tdsqlcProvider';
import { ProviderEnum } from '../../../src/common';
import { Context } from '../../../src/types';
import * as tencentcloud from 'tencentcloud-sdk-nodejs-cynosdb';

// Mock the SDK
jest.mock('tencentcloud-sdk-nodejs-cynosdb');

describe('TdsqlcProvider', () => {
  const mockContext: Context = {
    stage: 'default',
    stackName: 'test-stack',
    provider: ProviderEnum.TENCENT,
    region: 'ap-guangzhou',
    accessKeyId: 'test-key',
    accessKeySecret: 'test-secret',
    iacLocation: 'test.yml',
    parameters: [],
    stages: {},
  };

  const mockConfig = {
    ClusterName: 'test-tdsqlc',
    DbType: 'MYSQL' as const,
    DbVersion: '8.0',
    DbMode: 'SERVERLESS' as const,
    MinCpu: 1,
    MaxCpu: 8,
    AutoPause: 'no' as const,
    AutoPauseDelay: 600,
    StoragePayMode: 0,
    AdminPassword: 'TestPass123!',
  };

  let mockCynosdbClient: {
    CreateClusters: jest.Mock;
    DescribeClusters: jest.Mock;
    ModifyServerlessStrategy: jest.Mock;
    OfflineCluster: jest.Mock;
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockCynosdbClient = {
      CreateClusters: jest.fn(),
      DescribeClusters: jest.fn(),
      ModifyServerlessStrategy: jest.fn(),
      OfflineCluster: jest.fn(),
    };

    const mockClient = jest.mocked(tencentcloud.cynosdb.v20190107.Client);
    mockClient.mockImplementation(
      () =>
        mockCynosdbClient as unknown as InstanceType<typeof tencentcloud.cynosdb.v20190107.Client>,
    );
  });

  describe('createTdsqlcCluster', () => {
    it('should create a TDSQL-C cluster successfully', async () => {
      const clusterId = 'cynosdbmysql-test123';

      mockCynosdbClient.CreateClusters.mockResolvedValue({
        ClusterIds: [clusterId],
        RequestId: 'test-request-id',
      });

      mockCynosdbClient.DescribeClusters.mockResolvedValue({
        ClusterSet: [
          {
            ClusterId: clusterId,
            ClusterName: 'test-tdsqlc',
            Status: 'running',
            DbType: 'MYSQL',
            DbVersion: '8.0',
          },
        ],
        RequestId: 'test-request-id',
      });

      const result = await createTdsqlcCluster(mockContext, mockConfig);

      expect(result).toBe(clusterId);
      expect(mockCynosdbClient.CreateClusters).toHaveBeenCalledWith(
        expect.objectContaining({
          ClusterName: 'test-tdsqlc',
          DbType: 'MYSQL',
          DbVersion: '8.0',
          DbMode: 'SERVERLESS',
          MinCpu: 1,
          MaxCpu: 8,
        }),
      );
    });

    it('should throw error if cluster ID is not returned', async () => {
      mockCynosdbClient.CreateClusters.mockResolvedValue({
        ClusterIds: [],
        RequestId: 'test-request-id',
      });

      await expect(createTdsqlcCluster(mockContext, mockConfig)).rejects.toThrow(
        'Failed to create TDSQL-C cluster: No cluster ID returned',
      );
    });

    it('should handle API errors during creation', async () => {
      mockCynosdbClient.CreateClusters.mockRejectedValue(new Error('API Error'));

      await expect(createTdsqlcCluster(mockContext, mockConfig)).rejects.toThrow('API Error');
    });
  });

  describe('getTdsqlcCluster', () => {
    it('should get cluster information successfully', async () => {
      const clusterId = 'cynosdbmysql-test123';

      mockCynosdbClient.DescribeClusters.mockResolvedValue({
        ClusterSet: [
          {
            ClusterId: clusterId,
            ClusterName: 'test-tdsqlc',
            Status: 'running',
            DbType: 'MYSQL',
            DbVersion: '8.0',
            VpcId: 'vpc-12345',
            SubnetId: 'subnet-67890',
            Vip: '10.0.0.1',
            Vport: 3306,
            CreateTime: '2024-01-01 00:00:00',
            UpdateTime: '2024-01-01 00:00:00',
          },
        ],
        RequestId: 'test-request-id',
      });

      const result = await getTdsqlcCluster(mockContext, clusterId);

      expect(result).toMatchObject({
        ClusterId: clusterId,
        ClusterName: 'test-tdsqlc',
        Status: 'running',
        DbType: 'MYSQL',
        DbVersion: '8.0',
        VpcId: 'vpc-12345',
        SubnetId: 'subnet-67890',
      });
    });

    it('should return null if cluster is not found', async () => {
      mockCynosdbClient.DescribeClusters.mockResolvedValue({
        ClusterSet: [],
        RequestId: 'test-request-id',
      });

      const result = await getTdsqlcCluster(mockContext, 'non-existent-cluster');

      expect(result).toBeNull();
    });

    it('should handle API errors gracefully', async () => {
      mockCynosdbClient.DescribeClusters.mockRejectedValue(new Error('API Error'));

      const result = await getTdsqlcCluster(mockContext, 'test-cluster');

      expect(result).toBeNull();
    });
  });

  describe('updateTdsqlcCluster', () => {
    it('should update cluster successfully', async () => {
      const clusterId = 'cynosdbmysql-test123';

      mockCynosdbClient.ModifyServerlessStrategy.mockResolvedValue({
        RequestId: 'test-request-id',
      });

      mockCynosdbClient.DescribeClusters.mockResolvedValue({
        ClusterSet: [
          {
            ClusterId: clusterId,
            Status: 'running',
          },
        ],
        RequestId: 'test-request-id',
      });

      await updateTdsqlcCluster(mockContext, clusterId, mockConfig);

      expect(mockCynosdbClient.ModifyServerlessStrategy).toHaveBeenCalledWith(
        expect.objectContaining({
          ClusterId: clusterId,
          MinCpu: 1,
          MaxCpu: 8,
          AutoPause: 'no',
          AutoPauseDelay: 600,
        }),
      );
    });

    it('should handle API errors during update', async () => {
      const clusterId = 'cynosdbmysql-test123';

      mockCynosdbClient.ModifyServerlessStrategy.mockRejectedValue(new Error('Update failed'));

      await expect(updateTdsqlcCluster(mockContext, clusterId, mockConfig)).rejects.toThrow(
        'Update failed',
      );
    });
  });

  describe('deleteTdsqlcCluster', () => {
    it('should delete cluster successfully', async () => {
      const clusterId = 'cynosdbmysql-test123';

      mockCynosdbClient.OfflineCluster.mockResolvedValue({
        RequestId: 'test-request-id',
      });

      // First call returns the cluster, second call returns null (deleted)
      mockCynosdbClient.DescribeClusters.mockResolvedValueOnce({
        ClusterSet: [
          {
            ClusterId: clusterId,
            Status: 'isolated',
          },
        ],
        RequestId: 'test-request-id',
      }).mockResolvedValueOnce({
        ClusterSet: [],
        RequestId: 'test-request-id',
      });

      await deleteTdsqlcCluster(mockContext, clusterId);

      expect(mockCynosdbClient.OfflineCluster).toHaveBeenCalledWith(
        expect.objectContaining({
          ClusterId: clusterId,
        }),
      );
    });

    it('should handle API errors during deletion', async () => {
      const clusterId = 'cynosdbmysql-test123';

      mockCynosdbClient.OfflineCluster.mockRejectedValue(new Error('Delete failed'));

      await expect(deleteTdsqlcCluster(mockContext, clusterId)).rejects.toThrow('Delete failed');
    });
  });
});
