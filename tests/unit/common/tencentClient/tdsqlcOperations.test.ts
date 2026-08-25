import { createTdsqlcOperations } from '../../../../src/common/tencentClient/tdsqlcOperations';
import { TdsqlcClusterStatus } from '../../../../src/common/tencentClient/types';
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

    it('should rethrow non-not-found errors', async () => {
      const error = new Error('API error');
      mockCynosdbClient.DescribeClusters.mockRejectedValue(error);

      await expect(operations.getCluster('cluster-123')).rejects.toThrow('API error');
    });

    it('should return null on ResourceNotFound', async () => {
      const error = new Error('not found') as Error & { code: string };
      error.code = 'ResourceNotFound.ClusterNotFoundError';
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
            Uin: '100000000001',
            AppId: 1250000000,
            Zone: 'ap-guangzhou-3',
            DbType: 'cynosdb',
            DbVersion: '5.7',
            Status: TdsqlcClusterStatus.RUNNING,
            ServerlessStatus: 'resume',
            Vip: '10.0.0.1',
            Vport: 3306,
            MinStorageSize: 10,
            MaxStorageSize: 1000,
            Storage: 100,
            CreateTime: '2024-01-01T00:00:00Z',
            CynosVersion: '5.7.1',
            CynosVersionTag: 'stable',
            Tasks: [
              {
                TaskId: 1,
                TaskType: 'create',
                TaskStatus: 'success',
                ObjectId: 'cluster-123',
                ObjectType: 'cluster',
              },
            ],
            NetAddrs: [
              {
                Vip: '10.0.0.1',
                Vport: 3306,
                NetType: 'rw',
                UniqSubnetId: 'subnet-456',
                UniqVpcId: 'vpc-123',
              },
            ],
            HasSlaveZone: '0',
            ResourcePackages: [
              {
                PackageId: 'package-1',
                PackageType: 'DISK',
                DeductionPriority: 1,
              },
            ],
            GdnId: 'gdn-123',
            GdnRole: 'primary',
          },
        ],
      });

      const result = await operations.getCluster('cluster-123');

      expect(result?.Vip).toBe('10.0.0.1');
      expect(result?.Vport).toBe(3306);
      expect(result?.MinStorageSize).toBe(10);
      expect(result?.MaxStorageSize).toBe(1000);
      expect(result?.Uin).toBe('100000000001');
      expect(result?.AppId).toBe(1250000000);
      expect(result?.ServerlessStatus).toBe('resume');
      expect(result?.Tasks).toEqual([
        {
          TaskId: 1,
          TaskType: 'create',
          TaskStatus: 'success',
          ObjectId: 'cluster-123',
          ObjectType: 'cluster',
        },
      ]);
      expect(result?.NetAddrs).toEqual([
        {
          Vip: '10.0.0.1',
          Vport: 3306,
          NetType: 'rw',
          UniqSubnetId: 'subnet-456',
          UniqVpcId: 'vpc-123',
        },
      ]);
      expect(result?.HasSlaveZone).toBe('0');
      expect(result?.ResourcePackages).toEqual([
        {
          PackageId: 'package-1',
          PackageType: 'DISK',
          DeductionPriority: 1,
        },
      ]);
      expect(result?.GdnId).toBe('gdn-123');
      expect(result?.GdnRole).toBe('primary');
      expect(result?.CynosVersionTag).toBe('stable');
      // AutoPause is NOT derived from ServerlessStatus (resume/pause) — that
      // is the cluster running state, not the idle-stall switch.
      expect(result?.AutoPause).toBeUndefined();
    });

    it('should reject creation when the created cluster cannot be found', async () => {
      mockCynosdbClient.CreateClusters.mockResolvedValue({ ClusterIds: ['cluster-123'] });
      mockCynosdbClient.DescribeClusters.mockResolvedValue({ ClusterSet: [] });

      await expect(
        operations.createCluster({
          ClusterName: 'test-cluster',
          DbType: 'cynosdb',
          DbVersion: '5.7',
          DbMode: 'serverless',
          AdminPassword: 'password123',
          MinCpu: 0.5,
          MaxCpu: 1,
        }),
      ).rejects.toThrow('TDSQL_CLUSTER_NOT_FOUND');
    });

    it('should translate a readiness polling timeout', async () => {
      mockCynosdbClient.CreateClusters.mockResolvedValue({ ClusterIds: ['cluster-123'] });
      const pollSpy = jest.spyOn(polling, 'pollUntil').mockRejectedValueOnce(
        new polling.PollingTimeoutError({
          description: 'ready',
          lastValue: null,
          attempts: 60,
          maxAttempts: 60,
          intervalMs: 10000,
        }),
      );

      await expect(
        operations.createCluster({
          ClusterName: 'test-cluster',
          DbType: 'cynosdb',
          DbVersion: '5.7',
          DbMode: 'serverless',
          AdminPassword: 'password123',
          MinCpu: 0.5,
          MaxCpu: 1,
        }),
      ).rejects.toThrow('TDSQL_CLUSTER_TIMEOUT_READY');

      pollSpy.mockRestore();
    });

    it('should find a cluster by name on a later full page', async () => {
      mockCynosdbClient.DescribeClusters.mockResolvedValueOnce({
        ClusterSet: Array.from({ length: 100 }, () => ({ ClusterName: 'other' })),
      }).mockResolvedValueOnce({
        ClusterSet: [{ ClusterId: 'cluster-123', ClusterName: 'target', Status: 'running' }],
      });

      const result = await operations.getClusterByName('target');

      expect(result).toEqual(
        expect.objectContaining({ ClusterId: 'cluster-123', ClusterName: 'target' }),
      );
      expect(mockCynosdbClient.DescribeClusters).toHaveBeenNthCalledWith(2, {
        Limit: 100,
        Offset: 100,
      });
    });

    it('should stop a name probe at a short page when no cluster matches', async () => {
      mockCynosdbClient.DescribeClusters.mockResolvedValue({
        ClusterSet: [{ ClusterName: 'other' }],
      });

      await expect(operations.getClusterByName('target')).resolves.toBeNull();
      expect(mockCynosdbClient.DescribeClusters).toHaveBeenCalledTimes(1);
    });

    it('should return null when a name probe reports ResourceNotFound', async () => {
      mockCynosdbClient.DescribeClusters.mockRejectedValue({ code: 'ResourceNotFound.Cluster' });

      await expect(operations.getClusterByName('target')).resolves.toBeNull();
    });

    it('should rethrow unexpected name probe errors', async () => {
      mockCynosdbClient.DescribeClusters.mockRejectedValue(new Error('permission denied'));

      await expect(operations.getClusterByName('target')).rejects.toThrow('permission denied');
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
      mockCynosdbClient.DescribeClusters.mockResolvedValueOnce({
        ClusterSet: [{ Status: TdsqlcClusterStatus.OFFLINE }],
      }).mockResolvedValueOnce({ ClusterSet: [] });

      const deletion = operations.deleteCluster('cluster-123');
      await jest.advanceTimersByTimeAsync(10000);
      await deletion;

      expect(mockCynosdbClient.OfflineCluster).toHaveBeenCalledWith({
        ClusterId: 'cluster-123',
      });
    });

    it('should wait through a non-terminal cluster status during deletion', async () => {
      mockCynosdbClient.OfflineCluster.mockResolvedValue({});
      mockCynosdbClient.DescribeClusters.mockResolvedValueOnce({
        ClusterSet: [{ Status: TdsqlcClusterStatus.RUNNING }],
      }).mockResolvedValueOnce({ ClusterSet: [] });

      const deletion = operations.deleteCluster('cluster-123');
      await jest.advanceTimersByTimeAsync(10000);
      await deletion;

      expect(mockCynosdbClient.DescribeClusters).toHaveBeenCalledTimes(2);
    });

    it('should translate a deletion polling timeout', async () => {
      mockCynosdbClient.OfflineCluster.mockResolvedValue({});
      const pollSpy = jest.spyOn(polling, 'pollUntil').mockRejectedValueOnce(
        new polling.PollingTimeoutError({
          description: 'deleted',
          lastValue: null,
          attempts: 60,
          maxAttempts: 60,
          intervalMs: 10000,
        }),
      );

      await expect(operations.deleteCluster('cluster-123')).rejects.toThrow(
        'TDSQL_CLUSTER_TIMEOUT_DELETE',
      );

      pollSpy.mockRestore();
    });
  });
});
