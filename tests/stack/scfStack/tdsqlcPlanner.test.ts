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
  CURRENT_STATE_VERSION,
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
    version: CURRENT_STATE_VERSION,
    provider: 'tencent',
    resources: {},
  };

  // Expected attributes for the mock database config
  const expectedAttributes = {
    clusterName: 'test-tdsqlc',
    dbType: 'MYSQL',
    dbVersion: '8.0',
    dbMode: 'SERVERLESS',
    minCpu: 1,
    maxCpu: 8,
    autoPause: false,
    autoPauseDelay: 600,
    storagePayMode: 0,
    vpcId: 'vpc-12345',
    subnetId: 'subnet-67890',
    minStorageSize: 10,
    maxStorageSize: 1000,
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
          after: expectedAttributes,
        },
      });
    });

    it('should generate update plan when attributes change', async () => {
      const existingState: ResourceState = {
        type: 'TDSQL_C_SERVERLESS',
        physicalId: 'cynosdbmysql-test123',
        region: 'ap-guangzhou',
        attributes: {
          ...expectedAttributes,
          minCpu: 2, // Different from mockDatabase
        },
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
      const existingState: ResourceState = {
        type: 'TDSQL_C_SERVERLESS',
        physicalId: 'cynosdbmysql-test123',
        region: 'ap-guangzhou',
        attributes: expectedAttributes,
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
        action: 'noop',
        resourceType: 'TDSQL_C_SERVERLESS',
      });
    });

    it('should generate delete plan for removed databases', async () => {
      const existingResources: Record<string, ResourceState> = {
        'databases.test_db': {
          type: 'TDSQL_C_SERVERLESS',
          physicalId: 'cynosdbmysql-test123',
          region: 'ap-guangzhou',
          attributes: expectedAttributes,
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
      });
      expect(result.items[0].changes?.before).toMatchObject({
        physicalId: 'cynosdbmysql-test123',
      });
    });

    it('should generate create plan when remote resource not found', async () => {
      const existingState: ResourceState = {
        type: 'TDSQL_C_SERVERLESS',
        physicalId: 'cynosdbmysql-test123',
        region: 'ap-guangzhou',
        attributes: expectedAttributes,
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
        drifted: true,
      });
    });

    it('should generate create plan when getTdsqlcCluster throws error', async () => {
      const existingState: ResourceState = {
        type: 'TDSQL_C_SERVERLESS',
        physicalId: 'cynosdbmysql-test123',
        region: 'ap-guangzhou',
        attributes: expectedAttributes,
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
      const existingResources: Record<string, ResourceState> = {
        'databases.test_db': {
          type: 'TDSQL_C_SERVERLESS',
          physicalId: 'cynosdbmysql-test123',
          region: 'ap-guangzhou',
          attributes: expectedAttributes,
          lastUpdated: '2024-01-01T00:00:00Z',
        },
        'functions.test_func': {
          type: 'SCF_FUNCTION',
          physicalId: 'scf-test123',
          region: 'ap-guangzhou',
          attributes: {},
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
