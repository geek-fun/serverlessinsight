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

const mockRdsClient = {
  createDBInstance: mockCreateDBInstance,
  describeDBInstanceAttribute: mockDescribeDBInstanceAttribute,
  modifyDBInstanceSpec: mockModifyDBInstanceSpec,
  modifySecurityIps: mockModifySecurityIps,
  deleteDBInstance: mockDeleteDBInstance,
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
                ServerlessConfig: {
                  MinCapacity: 0.5,
                  MaxCapacity: 1,
                  AutoPause: true,
                  SwitchForce: false,
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
  });
});
