import {
  createRdsOperations,
  RdsInstanceStatus,
} from '../../../../src/common/aliyunClient/rdsOperations';
import type { Context } from '../../../../src/types';
import { ProviderEnum } from '../../../../src/common/providerEnum';
import type RdsClient from '@alicloud/rds20140815';

const mockCreateDBInstance = jest.fn();
const mockDescribeDBInstanceAttribute = jest.fn();
const mockModifyDBInstanceSpec = jest.fn();
const mockModifySecurityIps = jest.fn();
const mockDeleteDBInstance = jest.fn();
const mockListTagResources = jest.fn();
const mockDescribeDBInstances = jest.fn();

const mockRdsClient = {
  createDBInstance: mockCreateDBInstance,
  describeDBInstanceAttribute: mockDescribeDBInstanceAttribute,
  modifyDBInstanceSpec: mockModifyDBInstanceSpec,
  modifySecurityIps: mockModifySecurityIps,
  deleteDBInstance: mockDeleteDBInstance,
  listTagResources: mockListTagResources,
  describeDBInstances: mockDescribeDBInstances,
} as unknown as RdsClient;

jest.mock('../../../../src/common/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
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

describe('rdsOperations', () => {
  let operations: ReturnType<typeof createRdsOperations>;
  const mockContext: Partial<Context> = {
    region: 'cn-hangzhou',
    provider: ProviderEnum.ALIYUN,
    app: 'test-app',
    service: 'test-service',
    stage: 'dev',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    operations = createRdsOperations(mockRdsClient, mockContext as Context);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('createInstance', () => {
    it('should create RDS instance and wait for ready status', async () => {
      mockCreateDBInstance.mockResolvedValue({
        body: {
          DBInstanceId: 'rds-instance-123',
        },
      });

      mockDescribeDBInstanceAttribute.mockResolvedValue({
        body: {
          Items: {
            DBInstanceAttribute: [
              {
                DBInstanceId: 'rds-instance-123',
                DBInstanceStatus: RdsInstanceStatus.RUNNING,
                DBInstanceDescription: 'Test RDS',
                Engine: 'MySQL',
                EngineVersion: '5.7',
                DBInstanceClass: 'mysql.n2.medium.1',
                DBInstanceStorage: 20,
                Category: 'HighAvailability',
                DBInstanceStorageType: 'cloud_ssd',
              },
            ],
          },
        },
      });

      const config = {
        dbInstanceDescription: 'Test RDS',
        engine: 'MySQL',
        engineVersion: '5.7',
        dbInstanceClass: 'mysql.n2.medium.1',
        dbInstanceStorage: 20,
        category: 'HighAvailability',
        dbInstanceStorageType: 'cloud_ssd',
      };

      const result = await operations.createInstance(config);

      expect(result).toBe('rds-instance-123');
      expect(mockCreateDBInstance).toHaveBeenCalled();
      expect(mockDescribeDBInstanceAttribute).toHaveBeenCalled();
    });

    it('should throw if no instance ID returned', async () => {
      mockCreateDBInstance.mockResolvedValue({ body: {} });

      const config = {
        dbInstanceDescription: 'Test RDS',
        engine: 'MySQL',
        engineVersion: '5.7',
        dbInstanceClass: 'mysql.n2.medium.1',
        dbInstanceStorage: 20,
        category: 'HighAvailability',
        dbInstanceStorageType: 'cloud_ssd',
      };

      await expect(operations.createInstance(config)).rejects.toThrow(
        'RDS_INSTANCE_NO_ID_RETURNED',
      );
    });

    it('should throw on creation failure', async () => {
      mockCreateDBInstance.mockRejectedValue(new Error('QuotaExceeded'));

      const config = {
        dbInstanceDescription: 'Test RDS',
        engine: 'MySQL',
        engineVersion: '5.7',
        dbInstanceClass: 'mysql.n2.medium.1',
        dbInstanceStorage: 20,
        category: 'HighAvailability',
        dbInstanceStorageType: 'cloud_ssd',
      };

      await expect(operations.createInstance(config)).rejects.toThrow('QuotaExceeded');
    });

    it('should handle instance status polling', async () => {
      mockCreateDBInstance.mockResolvedValue({
        body: {
          DBInstanceId: 'rds-instance-123',
        },
      });

      mockDescribeDBInstanceAttribute.mockResolvedValue({
        body: {
          Items: {
            DBInstanceAttribute: [
              {
                DBInstanceId: 'rds-instance-123',
                DBInstanceStatus: RdsInstanceStatus.RUNNING,
              },
            ],
          },
        },
      });

      const config = {
        dbInstanceDescription: 'Test RDS',
        engine: 'MySQL',
        engineVersion: '5.7',
        dbInstanceClass: 'mysql.n2.medium.1',
        dbInstanceStorage: 20,
        category: 'HighAvailability',
        dbInstanceStorageType: 'cloud_ssd',
      };

      const result = await operations.createInstance(config);
      expect(result).toBe('rds-instance-123');
    });

    it('should fail when the instance disappears while waiting', async () => {
      mockCreateDBInstance.mockResolvedValue({ body: { DBInstanceId: 'rds-instance-123' } });
      mockDescribeDBInstanceAttribute.mockResolvedValue({
        body: { Items: { DBInstanceAttribute: [] } },
      });

      await expect(
        operations.createInstance({
          dbInstanceDescription: 'Test RDS',
          engine: 'MySQL',
          engineVersion: '5.7',
          dbInstanceClass: 'mysql.n2.medium.1',
          dbInstanceStorage: 20,
          category: 'HighAvailability',
          dbInstanceStorageType: 'cloud_ssd',
        }),
      ).rejects.toThrow('RDS_INSTANCE_NOT_FOUND');
    });

    it('should fail when the instance reaches a deleted state while waiting', async () => {
      mockCreateDBInstance.mockResolvedValue({ body: { DBInstanceId: 'rds-instance-123' } });
      mockDescribeDBInstanceAttribute.mockResolvedValue({
        body: {
          Items: { DBInstanceAttribute: [{ DBInstanceStatus: RdsInstanceStatus.DELETED }] },
        },
      });

      await expect(
        operations.createInstance({
          dbInstanceDescription: 'Test RDS',
          engine: 'MySQL',
          engineVersion: '5.7',
          dbInstanceClass: 'mysql.n2.medium.1',
          dbInstanceStorage: 20,
          category: 'HighAvailability',
          dbInstanceStorageType: 'cloud_ssd',
        }),
      ).rejects.toThrow('RDS_INSTANCE_ERROR_STATE');
    });
  });

  describe('getInstance', () => {
    it('should get instance details', async () => {
      mockDescribeDBInstanceAttribute.mockResolvedValue({
        body: {
          Items: {
            DBInstanceAttribute: [
              {
                DBInstanceId: 'rds-instance-123',
                DBInstanceDescription: 'Test RDS',
                Engine: 'MySQL',
                EngineVersion: '5.7',
                DBInstanceClass: 'mysql.n2.medium.1',
                DBInstanceStorage: 20,
                Category: 'HighAvailability',
                DBInstanceStorageType: 'cloud_ssd',
                DBInstanceStatus: RdsInstanceStatus.RUNNING,
                ConnectionString: 'rds-instance-123.mysql.rds.aliyuncs.com',
                Port: '3306',
                MasterUsername: 'admin',
              },
            ],
          },
        },
      });

      const result = await operations.getInstance('rds-instance-123');

      expect(result).toBeDefined();
      expect(result?.dbInstanceId).toBe('rds-instance-123');
      expect(result?.engine).toBe('MySQL');
      expect(result?.connectionString).toBe('rds-instance-123.mysql.rds.aliyuncs.com');
    });

    it('should return null when instance not found', async () => {
      mockDescribeDBInstanceAttribute.mockResolvedValue({
        body: {
          Items: {
            DBInstanceAttribute: [],
          },
        },
      });

      const result = await operations.getInstance('non-existent');

      expect(result).toBeNull();
    });

    it('should return null on error', async () => {
      mockDescribeDBInstanceAttribute.mockRejectedValue(new Error('InvalidDBInstanceId.NotFound'));

      const result = await operations.getInstance('invalid-id');

      expect(result).toBeNull();
    });

    it('should parse serverless config when present', async () => {
      mockDescribeDBInstanceAttribute.mockResolvedValue({
        body: {
          Items: {
            DBInstanceAttribute: [
              {
                DBInstanceId: 'rds-instance-123',
                Engine: 'MySQL',
                serverlessConfig: {
                  scaleMin: 0.5,
                  scaleMax: 1,
                  autoPause: true,
                  switchForce: false,
                },
              },
            ],
          },
        },
      });

      const result = await operations.getInstance('rds-instance-123');

      expect(result?.serverlessConfig).toBeDefined();
      expect(result?.serverlessConfig?.minCapacity).toBe(0.5);
      expect(result?.serverlessConfig?.maxCapacity).toBe(1);
    });

    it('should retain the full DBInstanceAttribute detail set (max-detail state)', async () => {
      mockDescribeDBInstanceAttribute.mockResolvedValue({
        body: {
          Items: {
            DBInstanceAttribute: [
              {
                DBInstanceId: 'rm-999',
                DBInstanceDescription: 'max-detail-rds',
                Engine: 'MySQL',
                EngineVersion: '8.0',
                DBInstanceClass: 'mysql.n2.serverless.1c',
                DBInstanceStorage: 20,
                Category: 'Serverless',
                DBInstanceStorageType: 'cloud_essd',
                DBInstanceCPU: '1',
                DBInstanceMemory: 2,
                PayType: 'Serverless',
                ExpireTime: '2026-12-31T00:00:00Z',
                MaintainTime: '02:00Z-03:00Z',
                MaxConnections: 200,
                MaxIOPS: 2000,
                ResourceGroupId: 'rg-123',
                DeletionProtection: true,
                LockMode: 'None',
                LockReason: '',
                ConnectionMode: 'Standard',
                DBInstanceDiskUsed: '2.5',
                DBInstanceType: 'Primary',
                InstanceNetworkType: 'VPC',
                TimeZone: 'Asia/Shanghai',
                CurrentKernelVersion: '20240101',
                LatestKernelVersion: '20241201',
                MasterZone: 'cn-hangzhou-b',
                MasterInstanceId: 'rm-999',
                SlaveZones: { slaveZone: [{ zoneId: 'cn-hangzhou-c' }] },
                ReadOnlyDBInstanceIds: {
                  readOnlyDBInstanceId: [{ DBInstanceId: 'rm-ro-1' }],
                },
                BurstingEnabled: true,
                ComputeBurstEnabled: false,
                DBInstanceStatus: 'Running',
                ConnectionString: 'rm-999.mysql.rds.aliyuncs.com',
                Port: '3306',
                MasterUsername: 'admin',
              },
            ],
          },
        },
      });
      mockListTagResources.mockResolvedValue({
        body: {
          tagResources: {
            tagResource: [
              { tagKey: 'si-owned-by', tagValue: 'test-app-test-service:databases.my_rds' },
            ],
          },
        },
      });

      const result = await operations.getInstance('rm-999');

      expect(result).toEqual(
        expect.objectContaining({
          dbInstanceId: 'rm-999',
          dbInstanceCpu: '1',
          dbInstanceMemory: 2,
          payType: 'Serverless',
          expireTime: '2026-12-31T00:00:00Z',
          maintainTime: '02:00Z-03:00Z',
          maxConnections: 200,
          maxIOPS: 2000,
          resourceGroupId: 'rg-123',
          deletionProtection: true,
          lockMode: 'None',
          connectionMode: 'Standard',
          dbInstanceDiskUsed: '2.5',
          dbInstanceType: 'Primary',
          instanceNetworkType: 'VPC',
          timeZone: 'Asia/Shanghai',
          currentKernelVersion: '20240101',
          latestKernelVersion: '20241201',
          masterZone: 'cn-hangzhou-b',
          masterInstanceId: 'rm-999',
          slaveZones: [{ zoneId: 'cn-hangzhou-c' }],
          readOnlyDBInstanceIds: ['rm-ro-1'],
          burstingEnabled: true,
          computeBurstEnabled: false,
          tags: [{ key: 'si-owned-by', value: 'test-app-test-service:databases.my_rds' }],
        }),
      );
    });
  });

  describe('updateInstance', () => {
    it('should update serverless configuration', async () => {
      mockModifyDBInstanceSpec.mockResolvedValue({});
      mockDescribeDBInstanceAttribute.mockResolvedValue({
        body: {
          Items: {
            DBInstanceAttribute: [
              {
                DBInstanceId: 'rds-instance-123',
                DBInstanceStatus: RdsInstanceStatus.RUNNING,
              },
            ],
          },
        },
      });

      const config = {
        dbInstanceDescription: 'Updated RDS',
        engine: 'MySQL',
        engineVersion: '5.7',
        dbInstanceClass: 'mysql.n2.medium.1',
        dbInstanceStorage: 20,
        category: 'HighAvailability',
        dbInstanceStorageType: 'cloud_ssd',
        serverlessConfig: {
          minCapacity: 0.5,
          maxCapacity: 2,
          autoPause: true,
          switchForce: false,
        },
      };

      await operations.updateInstance('rds-instance-123', config);

      expect(mockModifyDBInstanceSpec).toHaveBeenCalled();
      const callArgs = mockModifyDBInstanceSpec.mock.calls[0][0];
      expect(callArgs.ServerlessConfig.MinCapacity).toBe(0.5);
      expect(callArgs.ServerlessConfig.MaxCapacity).toBe(2);
    });

    it('should update security IP list', async () => {
      mockModifySecurityIps.mockResolvedValue({});
      mockDescribeDBInstanceAttribute.mockResolvedValue({
        body: {
          Items: {
            DBInstanceAttribute: [
              {
                DBInstanceId: 'rds-instance-123',
                DBInstanceStatus: RdsInstanceStatus.RUNNING,
              },
            ],
          },
        },
      });

      const config = {
        dbInstanceDescription: 'Updated RDS',
        engine: 'MySQL',
        engineVersion: '5.7',
        dbInstanceClass: 'mysql.n2.medium.1',
        dbInstanceStorage: 20,
        category: 'HighAvailability',
        dbInstanceStorageType: 'cloud_ssd',
        securityIPList: '192.168.1.0/24',
      };

      await operations.updateInstance('rds-instance-123', config);

      expect(mockModifySecurityIps).toHaveBeenCalled();
      const callArgs = mockModifySecurityIps.mock.calls[0][0];
      expect(callArgs.SecurityIPList).toBe('192.168.1.0/24');
    });

    it('should throw on update failure', async () => {
      mockModifyDBInstanceSpec.mockRejectedValue(new Error('InvalidDBInstanceState'));

      const config = {
        dbInstanceDescription: 'Updated RDS',
        engine: 'MySQL',
        engineVersion: '5.7',
        dbInstanceClass: 'mysql.n2.medium.1',
        dbInstanceStorage: 20,
        category: 'HighAvailability',
        dbInstanceStorageType: 'cloud_ssd',
        serverlessConfig: {
          minCapacity: 0.5,
          maxCapacity: 2,
          autoPause: true,
          switchForce: false,
        },
      };

      await expect(operations.updateInstance('rds-instance-123', config)).rejects.toThrow(
        'InvalidDBInstanceState',
      );
    });

    it('should translate a readiness polling timeout', async () => {
      mockDescribeDBInstanceAttribute.mockResolvedValue({
        body: {
          Items: { DBInstanceAttribute: [{ DBInstanceStatus: RdsInstanceStatus.CREATING }] },
        },
      });

      const updatePromise = operations.updateInstance('rds-instance-123', {
        dbInstanceDescription: 'Updated RDS',
        engine: 'MySQL',
        engineVersion: '5.7',
        dbInstanceClass: 'mysql.n2.medium.1',
        dbInstanceStorage: 20,
        category: 'HighAvailability',
        dbInstanceStorageType: 'cloud_ssd',
      });
      const rejection = expect(updatePromise).rejects.toThrow('RDS_INSTANCE_TIMEOUT_READY');
      await jest.runAllTimersAsync();

      await rejection;
    });
  });

  describe('getInstanceByName', () => {
    it('should return the exact description match with tags', async () => {
      mockDescribeDBInstances.mockResolvedValue({
        body: {
          items: {
            DBInstance: [
              { DBInstanceId: 'wrong', DBInstanceDescription: 'other-name' },
              { DBInstanceId: 'matching', DBInstanceDescription: 'target-name' },
            ],
          },
        },
      });
      mockDescribeDBInstanceAttribute.mockResolvedValue({
        body: {
          Items: {
            DBInstanceAttribute: [{ DBInstanceId: 'matching', DBInstanceStatus: 'Running' }],
          },
        },
      });
      mockListTagResources.mockResolvedValue({
        body: { tagResources: { tagResource: [{ tagKey: 'owner', tagValue: 'stack' }] } },
      });

      await expect(operations.getInstanceByName('target-name')).resolves.toEqual(
        expect.objectContaining({
          dbInstanceId: 'matching',
          tags: [{ key: 'owner', value: 'stack' }],
        }),
      );
    });

    it('should return null when no exact description match exists', async () => {
      mockDescribeDBInstances.mockResolvedValue({
        body: {
          items: { DBInstance: [{ DBInstanceId: 'wrong', DBInstanceDescription: 'other-name' }] },
        },
      });

      await expect(operations.getInstanceByName('target-name')).resolves.toBeNull();
    });

    it('should return null when listing instances fails', async () => {
      mockDescribeDBInstances.mockRejectedValue(new Error('describe failed'));

      await expect(operations.getInstanceByName('target-name')).resolves.toBeNull();
    });
  });

  describe('deleteInstance', () => {
    it('should delete instance successfully', async () => {
      mockDeleteDBInstance.mockResolvedValue({});
      mockDescribeDBInstanceAttribute.mockResolvedValue({
        body: { Items: { DBInstanceAttribute: [] } },
      });

      await operations.deleteInstance('rds-instance-123');

      expect(mockDeleteDBInstance).toHaveBeenCalled();
    });

    it('should handle instance already deleted', async () => {
      const error = new Error('InvalidDBInstanceId.NotFound');
      Object.assign(error, { code: 'InvalidDBInstanceId.NotFound' });
      mockDeleteDBInstance.mockRejectedValue(error);

      await operations.deleteInstance('rds-instance-123');

      expect(mockDeleteDBInstance).toHaveBeenCalled();
    });

    it('should throw on delete failure', async () => {
      mockDeleteDBInstance.mockRejectedValue(new Error('AccessDenied'));

      await expect(operations.deleteInstance('rds-instance-123')).rejects.toThrow('AccessDenied');
    });

    it('should translate a deletion polling timeout', async () => {
      mockDeleteDBInstance.mockResolvedValue({});
      mockDescribeDBInstanceAttribute.mockResolvedValue({
        body: { Items: { DBInstanceAttribute: [{ DBInstanceStatus: RdsInstanceStatus.RUNNING }] } },
      });

      const deletePromise = operations.deleteInstance('rds-instance-123');
      const rejection = expect(deletePromise).rejects.toThrow('RDS_INSTANCE_TIMEOUT_DELETE');
      await jest.runAllTimersAsync();

      await rejection;
    });
  });
});
