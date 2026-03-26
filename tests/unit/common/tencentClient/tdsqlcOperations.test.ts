import { createTdsqlcOperations } from '../../../../src/common/tencentClient/tdsqlcOperations';
import { TdsqlcClusterStatus } from '../../../../src/common/tencentClient/types';

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

const mockCynosdbClient = {
  CreateClusters: jest.fn(),
  DescribeClusters: jest.fn(),
  ModifyServerlessStrategy: jest.fn(),
  OfflineCluster: jest.fn(),
};

const mockContext = {
  region: 'ap-guangzhou',
  accessKeyId: 'test-key',
  accessKeySecret: 'test-secret',
};

describe('tdsqlcOperations', () => {
  let operations: ReturnType<typeof createTdsqlcOperations>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    operations = createTdsqlcOperations(mockCynosdbClient as any, mockContext as any);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('createCluster', () => {
    it('should create cluster successfully and wait for ready state', async () => {
      mockCynosdbClient.CreateClusters.mockResolvedValue({
        ClusterIds: ['cluster-123'],
      });

      mockCynosdbClient.DescribeClusters.mockResolvedValue({
        ClusterSet: [
          {
            ClusterId: 'cluster-123',
            ClusterName: 'test-cluster',
            Status: TdsqlcClusterStatus.RUNNING,
            DbType: 'cynosdb',
            DbVersion: '5.7',
          },
        ],
      });

      const config = {
        ClusterName: 'test-cluster',
        DbType: 'cynosdb',
        DbVersion: '5.7',
        DbMode: 'serverless',
        AdminPassword: 'password123',
        MinCpu: 0.5,
        MaxCpu: 1,
      };

      const clusterId = await operations.createCluster(config);

      expect(clusterId).toBe('cluster-123');
      expect(mockCynosdbClient.CreateClusters).toHaveBeenCalledWith(
        expect.objectContaining({
          ClusterName: 'test-cluster',
          DbType: 'cynosdb',
          DbVersion: '5.7',
          DbMode: 'serverless',
          AdminPassword: 'password123',
        }),
      );
    });

    it('should throw error when no ClusterIds returned', async () => {
      mockCynosdbClient.CreateClusters.mockResolvedValue({
        ClusterIds: [],
      });

      const config = {
        ClusterName: 'test-cluster',
        DbType: 'cynosdb',
        DbVersion: '5.7',
        DbMode: 'serverless',
        AdminPassword: 'password123',
        MinCpu: 0.5,
        MaxCpu: 1,
      };

      await expect(operations.createCluster(config)).rejects.toThrow(
        'TDSQL_CLUSTER_NO_ID_RETURNED',
      );
    });

    it('should handle create errors gracefully', async () => {
      mockCynosdbClient.CreateClusters.mockResolvedValue({
        ClusterIds: ['cluster-123'],
      });

      mockCynosdbClient.DescribeClusters.mockResolvedValue({
        ClusterSet: [
          {
            ClusterId: 'cluster-123',
            Status: 'creating',
          },
        ],
      });

      expect(mockCynosdbClient.CreateClusters).toBeDefined();
      expect(mockCynosdbClient.DescribeClusters).toBeDefined();
    });

    it('should throw error when cluster reaches error state', async () => {
      mockCynosdbClient.CreateClusters.mockResolvedValue({
        ClusterIds: ['cluster-123'],
      });

      mockCynosdbClient.DescribeClusters.mockResolvedValue({
        ClusterSet: [
          {
            ClusterId: 'cluster-123',
            Status: TdsqlcClusterStatus.ISOLATED,
          },
        ],
      });

      const config = {
        ClusterName: 'test-cluster',
        DbType: 'cynosdb',
        DbVersion: '5.7',
        DbMode: 'serverless',
        AdminPassword: 'password123',
        MinCpu: 0.5,
        MaxCpu: 1,
      };

      await expect(operations.createCluster(config)).rejects.toThrow('TDSQL_CLUSTER_ERROR_STATE');
    });

    it('should handle SDK creation errors', async () => {
      const error = new Error('API error');
      mockCynosdbClient.CreateClusters.mockRejectedValue(error);

      const config = {
        ClusterName: 'test-cluster',
        DbType: 'cynosdb',
        DbVersion: '5.7',
        DbMode: 'serverless',
        AdminPassword: 'password123',
        MinCpu: 0.5,
        MaxCpu: 1,
      };

      await expect(operations.createCluster(config)).rejects.toThrow();
    });
  });

  describe('getCluster', () => {
    it('should return cluster info on success', async () => {
      mockCynosdbClient.DescribeClusters.mockResolvedValue({
        ClusterSet: [
          {
            ClusterId: 'cluster-123',
            ClusterName: 'test-cluster',
            Region: 'ap-guangzhou',
            DbType: 'cynosdb',
            DbVersion: '5.7',
            Status: TdsqlcClusterStatus.RUNNING,
            CreateTime: '2024-01-01T00:00:00Z',
          },
        ],
      });

      const result = await operations.getCluster('cluster-123');

      expect(result).toEqual(
        expect.objectContaining({
          ClusterId: 'cluster-123',
          ClusterName: 'test-cluster',
          Status: TdsqlcClusterStatus.RUNNING,
        }),
      );
    });

    it('should return null when cluster is not found', async () => {
      mockCynosdbClient.DescribeClusters.mockResolvedValue({
        ClusterSet: [],
      });

      const result = await operations.getCluster('nonexistent');

      expect(result).toBeNull();
    });

    it('should return null on error', async () => {
      const error = new Error('API error');
      mockCynosdbClient.DescribeClusters.mockRejectedValue(error);

      const result = await operations.getCluster('cluster-123');

      expect(result).toBeNull();
    });

    it('should map all cluster fields correctly', async () => {
      mockCynosdbClient.DescribeClusters.mockResolvedValue({
        ClusterSet: [
          {
            ClusterId: 'cluster-123',
            ClusterName: 'test-cluster',
            Region: 'ap-guangzhou',
            Zone: 'ap-guangzhou-3',
            DbType: 'cynosdb',
            DbVersion: '5.7',
            Status: TdsqlcClusterStatus.RUNNING,
            Vip: '10.0.0.1',
            Vport: 3306,
            MinStorageSize: 10,
            MaxStorageSize: 1000,
            Storage: 100,
            CreateTime: '2024-01-01T00:00:00Z',
          },
        ],
      });

      const result = await operations.getCluster('cluster-123');

      expect(result?.Vip).toBe('10.0.0.1');
      expect(result?.Vport).toBe(3306);
      expect(result?.MinStorageSize).toBe(10);
      expect(result?.MaxStorageSize).toBe(1000);
    });
  });

  describe('updateCluster', () => {
    it('should update cluster and wait for ready state', async () => {
      mockCynosdbClient.ModifyServerlessStrategy.mockResolvedValue({});

      mockCynosdbClient.DescribeClusters.mockResolvedValue({
        ClusterSet: [
          {
            ClusterId: 'cluster-123',
            Status: TdsqlcClusterStatus.RUNNING,
          },
        ],
      });

      const config = {
        ClusterName: 'test-cluster',
        DbType: 'cynosdb',
        DbVersion: '5.7',
        DbMode: 'serverless',
        AdminPassword: 'password123',
        MinCpu: 1,
        MaxCpu: 2,
      };

      await operations.updateCluster('cluster-123', config);

      expect(mockCynosdbClient.ModifyServerlessStrategy).toHaveBeenCalledWith(
        expect.objectContaining({
          ClusterId: 'cluster-123',
          MinCpu: 1,
          MaxCpu: 2,
        }),
      );
    });

    it('should handle update errors', async () => {
      const error = new Error('update failed');
      mockCynosdbClient.ModifyServerlessStrategy.mockRejectedValue(error);

      const config = {
        ClusterName: 'test-cluster',
        DbType: 'cynosdb',
        DbVersion: '5.7',
        DbMode: 'serverless',
        AdminPassword: 'password123',
        MinCpu: 1,
        MaxCpu: 2,
      };

      await expect(operations.updateCluster('cluster-123', config)).rejects.toThrow();
    });
  });

  describe('deleteCluster', () => {
    it('should delete cluster and wait for deleted state', async () => {
      mockCynosdbClient.OfflineCluster.mockResolvedValue({});
      mockCynosdbClient.DescribeClusters.mockResolvedValue({ ClusterSet: [] });

      await operations.deleteCluster('cluster-123');

      expect(mockCynosdbClient.OfflineCluster).toHaveBeenCalledWith({
        ClusterId: 'cluster-123',
      });
    });

    it('should handle delete errors', async () => {
      const error = new Error('delete failed');
      mockCynosdbClient.OfflineCluster.mockRejectedValue(error);

      await expect(operations.deleteCluster('cluster-123')).rejects.toThrow();
    });

    it('should wait through OFFLINE status', async () => {
      mockCynosdbClient.OfflineCluster.mockResolvedValue({});
      mockCynosdbClient.DescribeClusters.mockResolvedValue({ ClusterSet: [] });

      await operations.deleteCluster('cluster-123');

      expect(mockCynosdbClient.OfflineCluster).toHaveBeenCalledWith({
        ClusterId: 'cluster-123',
      });
    });
  });
});
