import { generateDatabasePlan } from '../../../../src/stack/scfStack/tdsqlcPlanner';
import * as stateManager from '../../../../src/common/stateManager';
import {
  Context,
  DatabaseDomain,
  DatabaseEnum,
  DatabaseVersionEnum,
  StateFile,
  ResourceState,
  CURRENT_STATE_VERSION,
} from '../../../../src/types';
import { ProviderEnum } from '../../../../src/common';

const mockTdsqlcOperations = {
  createCluster: jest.fn(),
  getCluster: jest.fn(),
  getClusterByName: jest.fn(),
  updateCluster: jest.fn(),
  deleteCluster: jest.fn(),
};

jest.mock('../../../../src/common/tencentClient', () => ({
  createTencentClient: () => ({
    scf: {},
    cos: {},
    tdsqlc: mockTdsqlcOperations,
  }),
}));

describe('TdsqlcPlanner', () => {
  const mockContext: Context = {
    stage: 'default',
    app: 'test-app',
    service: 'test-service',
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
    app: 'test-app',
    service: 'test-service',
    stages: {},
    resources: {},
  };

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

    it('should generate create plan when state status is tainted', async () => {
      const taintedState: ResourceState = {
        mode: 'managed',
        region: 'ap-guangzhou',
        status: 'tainted',
        definition: expectedDefinition,
        instances: [],
        lastUpdated: '2024-01-01T00:00:00Z',
        metadata: { clusterId: 'cynosdbmysql-test123' },
      };
      jest.spyOn(stateManager, 'getResource').mockReturnValue(taintedState);
      jest.spyOn(stateManager, 'getAllResources').mockReturnValue({});

      const result = await generateDatabasePlan(mockContext, mockState, [mockDatabase]);

      expect(result.items).toHaveLength(1);
      expect(result.items[0]).toMatchObject({
        logicalId: 'databases.test_db',
        action: 'create',
        resourceType: 'TDSQL_C_SERVERLESS',
      });
      expect(result.items[0].changes?.after).toBeDefined();
      expect(result.items[0].changes?.before).toBeUndefined();
    });

    it('should fail fast when state is empty but remote cluster exists untagged', async () => {
      jest.spyOn(stateManager, 'getResource').mockReturnValue(undefined);
      jest.spyOn(stateManager, 'getAllResources').mockReturnValue({});
      mockTdsqlcOperations.getClusterByName.mockResolvedValue({
        ClusterId: 'cynosdbmysql-test123',
        ClusterName: 'test-tdsqlc',
        Status: 'running',
        Region: 'ap-guangzhou',
        DbType: 'MYSQL',
        DbVersion: '8.0',
        ResourceTags: [{ TagKey: 'env', TagValue: 'prod' }],
      });

      await expect(generateDatabasePlan(mockContext, mockState, [mockDatabase])).rejects.toThrow(
        'not owned by this stack',
      );
    });

    it('should plan create when state is empty but remote cluster exists with our tag', async () => {
      jest.spyOn(stateManager, 'getResource').mockReturnValue(undefined);
      jest.spyOn(stateManager, 'getAllResources').mockReturnValue({});
      mockTdsqlcOperations.getClusterByName.mockResolvedValue({
        ClusterId: 'cynosdbmysql-test123',
        ClusterName: 'test-tdsqlc',
        Status: 'running',
        Region: 'ap-guangzhou',
        DbType: 'MYSQL',
        DbVersion: '8.0',
        ResourceTags: [
          { TagKey: 'si-owned-by', TagValue: 'test-app-test-service:databases.test_db' },
        ],
      });

      const result = await generateDatabasePlan(mockContext, mockState, [mockDatabase]);

      expect(result.items).toHaveLength(1);
      expect(result.items[0]).toMatchObject({
        logicalId: 'databases.test_db',
        action: 'create',
        resourceType: 'TDSQL_C_SERVERLESS',
      });
    });

    it('should plan create when state is empty and remote cluster is absent', async () => {
      jest.spyOn(stateManager, 'getResource').mockReturnValue(undefined);
      jest.spyOn(stateManager, 'getAllResources').mockReturnValue({});
      mockTdsqlcOperations.getClusterByName.mockResolvedValue(null);

      const result = await generateDatabasePlan(mockContext, mockState, [mockDatabase]);

      expect(result.items).toHaveLength(1);
      expect(result.items[0]).toMatchObject({
        logicalId: 'databases.test_db',
        action: 'create',
        resourceType: 'TDSQL_C_SERVERLESS',
      });
    });

    it('should fail fast when state is tainted and remote cluster exists untagged', async () => {
      const taintedState: ResourceState = {
        mode: 'managed',
        region: 'ap-guangzhou',
        status: 'tainted',
        definition: expectedDefinition,
        instances: [],
        lastUpdated: '2024-01-01T00:00:00Z',
        metadata: { clusterId: 'cynosdbmysql-test123' },
      };
      jest.spyOn(stateManager, 'getResource').mockReturnValue(taintedState);
      jest.spyOn(stateManager, 'getAllResources').mockReturnValue({});
      mockTdsqlcOperations.getClusterByName.mockResolvedValue({
        ClusterId: 'cynosdbmysql-test123',
        ClusterName: 'test-tdsqlc',
        Status: 'running',
        Region: 'ap-guangzhou',
        DbType: 'MYSQL',
        DbVersion: '8.0',
        ResourceTags: [],
      });

      await expect(generateDatabasePlan(mockContext, mockState, [mockDatabase])).rejects.toThrow(
        'not owned by this stack',
      );
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
            sid: 'si:tencent:cynosdb:default:cynosdbmysql-test123',
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
            sid: 'si:tencent:cynosdb:default:cynosdbmysql-test123',
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

    it('should generate a drifted create plan when the stored cluster is missing remotely', async () => {
      const existingState: ResourceState = {
        mode: 'managed',
        region: 'ap-guangzhou',
        definition: expectedDefinition,
        instances: [{ sid: 'sid', id: 'cynosdbmysql-test123', clusterName: 'test-tdsqlc' }],
        lastUpdated: '2024-01-01T00:00:00Z',
        metadata: { clusterId: 'cynosdbmysql-test123' },
      };
      jest.spyOn(stateManager, 'getResource').mockReturnValue(existingState);
      jest.spyOn(stateManager, 'getAllResources').mockReturnValue({});
      mockTdsqlcOperations.getCluster.mockResolvedValue(null);

      const result = await generateDatabasePlan(mockContext, mockState, [mockDatabase]);

      expect(result.items[0]).toMatchObject({ action: 'create', drifted: true });
      expect(result.items[0].changes?.before).toEqual(expectedDefinition);
    });

    it('should fall back to create when the remote cluster probe fails', async () => {
      const existingState: ResourceState = {
        mode: 'managed',
        region: 'ap-guangzhou',
        definition: expectedDefinition,
        instances: [{ sid: 'sid', id: 'cynosdbmysql-test123', clusterName: 'test-tdsqlc' }],
        lastUpdated: '2024-01-01T00:00:00Z',
        metadata: { clusterId: 'cynosdbmysql-test123' },
      };
      jest.spyOn(stateManager, 'getResource').mockReturnValue(existingState);
      jest.spyOn(stateManager, 'getAllResources').mockReturnValue({});
      mockTdsqlcOperations.getCluster.mockRejectedValue(new Error('probe failed'));

      const result = await generateDatabasePlan(mockContext, mockState, [mockDatabase]);

      expect(result.items[0]).toMatchObject({ action: 'create' });
      expect(result.items[0]).not.toHaveProperty('drifted');
      expect(result.items[0].changes?.before).toEqual(expectedDefinition);
    });

    it('should generate delete plan for removed databases', async () => {
      const existingResources: Record<string, ResourceState> = {
        'databases.test_db': {
          mode: 'managed',
          region: 'ap-guangzhou',
          definition: expectedDefinition,
          instances: [
            {
              sid: 'si:tencent:cynosdb:default:cynosdbmysql-test123',
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

    it('should delete legacy and typed stale database states while ignoring unrelated states', async () => {
      const existingResources: Record<string, ResourceState> = {
        'databases.legacy': {
          mode: 'managed',
          region: 'ap-guangzhou',
          definition: expectedDefinition,
          instances: [],
          lastUpdated: '2024-01-01T00:00:00Z',
          metadata: {},
        },
        'databases.typed': {
          mode: 'managed',
          region: 'ap-guangzhou',
          definition: expectedDefinition,
          instances: [],
          lastUpdated: '2024-01-01T00:00:00Z',
          metadata: { resourceType: 'TDSQL_C_SERVERLESS' },
        },
        'databases.other': {
          mode: 'managed',
          region: 'ap-guangzhou',
          definition: expectedDefinition,
          instances: [],
          lastUpdated: '2024-01-01T00:00:00Z',
          metadata: { resourceType: 'OTHER' },
        },
        'functions.keep': {
          mode: 'managed',
          region: 'ap-guangzhou',
          definition: expectedDefinition,
          instances: [],
          lastUpdated: '2024-01-01T00:00:00Z',
          metadata: {},
        },
      };
      jest.spyOn(stateManager, 'getAllResources').mockReturnValue(existingResources);

      const result = await generateDatabasePlan(mockContext, mockState, [mockDatabase]);

      expect(result.items.map((item) => item.logicalId)).toEqual(
        expect.arrayContaining(['databases.legacy', 'databases.typed']),
      );
      expect(result.items).toHaveLength(3);
    });

    it('should handle undefined databases', async () => {
      jest.spyOn(stateManager, 'getAllResources').mockReturnValue({});

      const result = await generateDatabasePlan(mockContext, mockState, undefined);

      expect(result.items).toHaveLength(0);
    });
  });
});
