import { generateDatabasePlan } from '../../../src/stack/scfStack/tdsqlcPlanner';
import * as tdsqlcProvider from '../../../src/stack/scfStack/tdsqlcProvider';
import * as stateManager from '../../../src/common/stateManager';
import {
  Context,
  DatabaseDomain,
  DatabaseEnum,
  DatabaseVersionEnum,
  StateFile,
  ResourceState,
} from '../../../src/types';
import { ProviderEnum } from '../../../src/common';

jest.mock('../../../src/stack/scfStack/tdsqlcProvider');
jest.mock('../../../src/common/stateManager');

describe('TdsqlcPlanner', () => {
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

  const mockDatabase: DatabaseDomain = {
    key: 'test_db',
    name: 'test-tdsqlc',
    type: DatabaseEnum.TDSQL_C_SERVERLESS,
    version: DatabaseVersionEnum['MYSQL_8.0'],
    security: {
      basicAuth: {
        password: 'TestPass123!',
      },
    },
    network: {
      type: 'PRIVATE',
      ingressRules: ['0.0.0.0/0'],
      vpcId: 'vpc-12345',
      subnetId: 'subnet-67890',
    },
    cu: {
      min: 1,
      max: 8,
    },
    storage: {
      min: 10,
      max: 1000,
    },
  };

  const mockState: StateFile = {
    version: '1.0',
    provider: 'tencent',
    resources: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateDatabasePlan', () => {
    it('should generate create plan for new database', async () => {
      jest.spyOn(stateManager, 'getResource').mockReturnValue(undefined);
      jest.spyOn(stateManager, 'getAllResources').mockReturnValue({});

      const result = await generateDatabasePlan(mockContext, mockState, [mockDatabase]);

      expect(result.items).toHaveLength(1);
      expect(result.items[0]).toMatchObject({
        logicalId: 'databases.test_db',
        action: 'create',
        resourceType: 'TDSQL_C_SERVERLESS',
        changes: {
          after: {
            name: 'test-tdsqlc',
            version: DatabaseVersionEnum['MYSQL_8.0'],
            minCpu: 1,
            maxCpu: 8,
            minStorage: 10,
            maxStorage: 1000,
          },
        },
      });
    });

    it('should generate update plan when config hash changes', async () => {
      const existingState: ResourceState = {
        type: 'TDSQL_C_SERVERLESS',
        physicalId: 'cynosdbmysql-test123',
        region: 'ap-guangzhou',
        configHash: 'old-hash',
        lastUpdated: '2024-01-01T00:00:00Z',
      };

      jest.spyOn(stateManager, 'getResource').mockReturnValue(existingState);
      jest.spyOn(stateManager, 'getAllResources').mockReturnValue({});
      jest.spyOn(tdsqlcProvider, 'getTdsqlcCluster').mockResolvedValue({
        ClusterId: 'cynosdbmysql-test123',
        ClusterName: 'test-tdsqlc',
        Status: 'running',
        Region: 'ap-guangzhou',
        DbType: 'MYSQL' as const,
        DbVersion: '8.0',
      });

      const result = await generateDatabasePlan(mockContext, mockState, [mockDatabase]);

      expect(result.items).toHaveLength(1);
      expect(result.items[0]).toMatchObject({
        logicalId: 'databases.test_db',
        action: 'update',
        resourceType: 'TDSQL_C_SERVERLESS',
      });
    });

    it('should generate noop plan when no changes needed', async () => {
      const mockDb = { ...mockDatabase };
      const config = {
        ClusterName: 'test-tdsqlc',
        DbType: 'MYSQL' as const,
        DbVersion: '8.0',
        DbMode: 'SERVERLESS' as const,
        MinCpu: 1,
        MaxCpu: 8,
        AutoPause: false,
        AutoPauseDelay: 600,
        StoragePayMode: 0,
        AdminPassword: 'TestPass123!',
        VpcId: 'vpc-12345',
        SubnetId: 'subnet-67890',
        MinStorageSize: 10,
        MaxStorageSize: 1000,
      };

      // Calculate the actual hash
      const crypto = await import('crypto');
      const hashContent = JSON.stringify({
        ClusterName: config.ClusterName,
        DbVersion: config.DbVersion,
        MinCpu: config.MinCpu,
        MaxCpu: config.MaxCpu,
        MinStorageSize: config.MinStorageSize,
        MaxStorageSize: config.MaxStorageSize,
        AutoPause: config.AutoPause,
        VpcId: config.VpcId,
        SubnetId: config.SubnetId,
      });
      const correctHash = crypto
        .createHash('sha256')
        .update(hashContent)
        .digest('hex')
        .substring(0, 16);

      const existingState: ResourceState = {
        type: 'TDSQL_C_SERVERLESS',
        physicalId: 'cynosdbmysql-test123',
        region: 'ap-guangzhou',
        configHash: correctHash,
        lastUpdated: '2024-01-01T00:00:00Z',
      };

      jest.spyOn(stateManager, 'getResource').mockReturnValue(existingState);
      jest.spyOn(stateManager, 'getAllResources').mockReturnValue({});
      jest.spyOn(tdsqlcProvider, 'getTdsqlcCluster').mockResolvedValue({
        ClusterId: 'cynosdbmysql-test123',
        ClusterName: 'test-tdsqlc',
        Status: 'running',
        Region: 'ap-guangzhou',
        DbType: 'MYSQL' as const,
        DbVersion: '8.0',
      });

      const result = await generateDatabasePlan(mockContext, mockState, [mockDb]);

      expect(result.items).toHaveLength(1);
      expect(result.items[0]).toMatchObject({
        logicalId: 'databases.test_db',
        action: 'noop',
        resourceType: 'TDSQL_C_SERVERLESS',
      });
    });

    it('should generate delete plan for removed databases', async () => {
      const existingResources = {
        'databases.test_db': {
          type: 'TDSQL_C_SERVERLESS',
          physicalId: 'cynosdbmysql-test123',
          region: 'ap-guangzhou',
          configHash: 'some-hash',
          lastUpdated: '2024-01-01T00:00:00Z',
        },
      };

      jest.spyOn(stateManager, 'getAllResources').mockReturnValue(existingResources);

      const result = await generateDatabasePlan(mockContext, mockState, []);

      expect(result.items).toHaveLength(1);
      expect(result.items[0]).toMatchObject({
        logicalId: 'databases.test_db',
        action: 'delete',
        resourceType: 'TDSQL_C_SERVERLESS',
        changes: {
          before: { physicalId: 'cynosdbmysql-test123' },
        },
      });
    });

    it('should generate create plan when remote resource not found', async () => {
      const existingState: ResourceState = {
        type: 'TDSQL_C_SERVERLESS',
        physicalId: 'cynosdbmysql-test123',
        region: 'ap-guangzhou',
        configHash: 'some-hash',
        lastUpdated: '2024-01-01T00:00:00Z',
      };

      jest.spyOn(stateManager, 'getResource').mockReturnValue(existingState);
      jest.spyOn(tdsqlcProvider, 'getTdsqlcCluster').mockResolvedValue(null);

      const result = await generateDatabasePlan(mockContext, mockState, [mockDatabase]);

      expect(result.items).toHaveLength(1);
      expect(result.items[0]).toMatchObject({
        logicalId: 'databases.test_db',
        action: 'create',
        resourceType: 'TDSQL_C_SERVERLESS',
      });
    });

    it('should generate create plan when getTdsqlcCluster throws error', async () => {
      const existingState: ResourceState = {
        type: 'TDSQL_C_SERVERLESS',
        physicalId: 'cynosdbmysql-test123',
        region: 'ap-guangzhou',
        configHash: 'some-hash',
        lastUpdated: '2024-01-01T00:00:00Z',
      };

      jest.spyOn(stateManager, 'getResource').mockReturnValue(existingState);
      jest.spyOn(tdsqlcProvider, 'getTdsqlcCluster').mockRejectedValue(new Error('API error'));

      const result = await generateDatabasePlan(mockContext, mockState, [mockDatabase]);

      expect(result.items).toHaveLength(1);
      expect(result.items[0]).toMatchObject({
        logicalId: 'databases.test_db',
        action: 'create',
        resourceType: 'TDSQL_C_SERVERLESS',
      });
    });

    it('should filter non-TDSQL-C databases', async () => {
      const nonTdsqlcDatabase: DatabaseDomain = {
        ...mockDatabase,
        type: DatabaseEnum.RDS_MYSQL_SERVERLESS,
      };

      jest.spyOn(stateManager, 'getAllResources').mockReturnValue({});

      const result = await generateDatabasePlan(mockContext, mockState, [nonTdsqlcDatabase]);

      expect(result.items).toHaveLength(0);
    });

    it('should handle empty databases array', async () => {
      jest.spyOn(stateManager, 'getAllResources').mockReturnValue({});

      const result = await generateDatabasePlan(mockContext, mockState, []);

      expect(result.items).toHaveLength(0);
    });

    it('should handle undefined databases', async () => {
      jest.spyOn(stateManager, 'getAllResources').mockReturnValue({});

      const result = await generateDatabasePlan(mockContext, mockState, undefined);

      expect(result.items).toHaveLength(0);
    });

    it('should not delete non-TDSQL-C resources', async () => {
      const existingResources = {
        'databases.test_db': {
          type: 'TDSQL_C_SERVERLESS',
          physicalId: 'cynosdbmysql-test123',
          region: 'ap-guangzhou',
          configHash: 'some-hash',
          lastUpdated: '2024-01-01T00:00:00Z',
        },
        'functions.test_func': {
          type: 'SCF_FUNCTION',
          physicalId: 'scf-test123',
          region: 'ap-guangzhou',
          configHash: 'some-hash',
          lastUpdated: '2024-01-01T00:00:00Z',
        },
      };

      jest.spyOn(stateManager, 'getAllResources').mockReturnValue(existingResources);

      const result = await generateDatabasePlan(mockContext, mockState, []);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].logicalId).toBe('databases.test_db');
    });
  });
});
