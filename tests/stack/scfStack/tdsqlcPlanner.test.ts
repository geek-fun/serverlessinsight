import { generateDatabasePlan } from '../../../src/stack/scfStack/tdsqlcPlanner';
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

// Create mock operations
const mockTdsqlcOperations = {
  createCluster: jest.fn(),
  getCluster: jest.fn(),
  updateCluster: jest.fn(),
  deleteCluster: jest.fn(),
};

// Mock the tencentClient module
jest.mock('../../../src/common/tencentClient');

// Import the mocked module
import { createTencentClient } from '../../../src/common/tencentClient';

// Configure the mock
(createTencentClient as jest.Mock).mockReturnValue({
  scf: {},
  cos: {},
  tdsqlc: mockTdsqlcOperations,
});

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

  // Expected definition for the mock database config
  const expectedDefinition = {
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
    port: null,
    projectId: null,
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
      });
    });

    it('should generate update plan when definition changes', async () => {
      const existingState: ResourceState = {
        mode: 'managed',
        region: 'ap-guangzhou',
        definition: {
          ...expectedDefinition,
          minCpu: 2,
        },
        instances: [
          {
            arn: 'arn:tencent:cynosdb:ap-guangzhou::cluster:cynosdbmysql-test123',
            id: 'cynosdbmysql-test123',
            clusterName: 'test-tdsqlc',
          },
        ],
        lastUpdated: '2024-01-01T00:00:00Z',
        metadata: { clusterId: 'cynosdbmysql-test123' },
      };

      jest.spyOn(stateManager, 'getResource').mockReturnValue(existingState);
      jest.spyOn(stateManager, 'getAllResources').mockReturnValue({});
      jest.spyOn(mockTdsqlcOperations, 'getCluster').mockResolvedValue({
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
        mode: 'managed',
        region: 'ap-guangzhou',
        definition: expectedDefinition,
        instances: [
          {
            arn: 'arn:tencent:cynosdb:ap-guangzhou::cluster:cynosdbmysql-test123',
            id: 'cynosdbmysql-test123',
            clusterName: 'test-tdsqlc',
          },
        ],
        lastUpdated: '2024-01-01T00:00:00Z',
        metadata: { clusterId: 'cynosdbmysql-test123' },
      };

      jest.spyOn(stateManager, 'getResource').mockReturnValue(existingState);
      jest.spyOn(stateManager, 'getAllResources').mockReturnValue({});
      jest.spyOn(mockTdsqlcOperations, 'getCluster').mockResolvedValue({
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
          mode: 'managed',
          region: 'ap-guangzhou',
          definition: expectedDefinition,
          instances: [
            {
              arn: 'arn:tencent:cynosdb:ap-guangzhou::cluster:cynosdbmysql-test123',
              id: 'cynosdbmysql-test123',
              clusterName: 'test-tdsqlc',
            },
          ],
          lastUpdated: '2024-01-01T00:00:00Z',
          metadata: { clusterId: 'cynosdbmysql-test123' },
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
    });

    it('should handle undefined databases', async () => {
      jest.spyOn(stateManager, 'getAllResources').mockReturnValue({});

      const result = await generateDatabasePlan(mockContext, mockState, undefined);

      expect(result.items).toHaveLength(0);
    });
  });
});
