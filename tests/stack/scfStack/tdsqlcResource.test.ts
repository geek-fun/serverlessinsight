import {
  createDatabaseResource,
  readDatabaseResource,
  updateDatabaseResource,
  deleteDatabaseResource,
} from '../../../src/stack/scfStack/tdsqlcResource';
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
import { createTencentClient } from '../../../src/common/tencentClient';

jest.mock('../../../src/common/tencentClient', () => ({
  createTencentClient: jest.fn().mockReturnValue({
    scf: {},
    cos: {},
    tdsqlc: {
      createCluster: jest.fn(),
      getCluster: jest.fn(),
      updateCluster: jest.fn(),
      deleteCluster: jest.fn(),
    },
  }),
}));

jest.mock('../../../src/common/stateManager');

describe('TdsqlcResource', () => {
  const mockTencentClient = (createTencentClient as jest.Mock).mock.results[0]?.value;
  const mockTdsqlcOperations = mockTencentClient?.tdsqlc;

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
    },
    cu: {
      min: 1,
      max: 8,
    },
    storage: {
      min: 10,
    },
  };

  const mockState: StateFile = {
    version: CURRENT_STATE_VERSION,
    provider: 'tencent',
    resources: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockClusterInfo = {
    ClusterId: 'cynosdbmysql-test123',
    ClusterName: 'test-tdsqlc',
    Region: 'ap-guangzhou',
    DbType: 'MYSQL',
    DbVersion: '8.0',
    Status: 'running',
    VpcId: undefined,
    SubnetId: undefined,
    Vip: '10.0.0.1',
    Vport: 3306,
    MinCpu: undefined,
    MaxCpu: undefined,
    MinStorageSize: undefined,
    MaxStorageSize: undefined,
    AutoPause: 'yes',
    CreateTime: '2025-01-01T00:00:00Z',
    UpdateTime: '2025-01-01T00:00:00Z',
  };

  describe('createDatabaseResource', () => {
    it('should create database resource and refresh state from provider', async () => {
      const clusterId = 'cynosdbmysql-test123';
      const mockResourceState: ResourceState = {
        mode: 'managed',
        region: 'ap-guangzhou',
        definition: {
          clusterName: 'test-tdsqlc',
          dbType: 'MYSQL',
          dbVersion: '8.0',
        },
        instances: [
          {
            arn: 'arn:tencent:cynosdb:ap-guangzhou::cluster:cynosdbmysql-test123',
            id: clusterId,
            clusterName: 'test-tdsqlc',
          },
        ],
        lastUpdated: new Date().toISOString(),
      };
      const updatedState: StateFile = {
        ...mockState,
        resources: { 'databases.test_db': mockResourceState },
      };

      jest.spyOn(mockTdsqlcOperations, 'createCluster').mockResolvedValue(clusterId);
      jest.spyOn(mockTdsqlcOperations, 'getCluster').mockResolvedValue(mockClusterInfo);
      jest.spyOn(stateManager, 'setResource').mockReturnValue(updatedState);

      const result = await createDatabaseResource(mockContext, mockDatabase, mockState);

      expect(mockTdsqlcOperations.createCluster).toHaveBeenCalledWith(
        mockContext,
        expect.objectContaining({
          ClusterName: 'test-tdsqlc',
          DbType: 'MYSQL',
          DbVersion: '8.0',
          DbMode: 'SERVERLESS',
          MinCpu: 1,
          MaxCpu: 8,
        }),
      );

      expect(mockTdsqlcOperations.getCluster).toHaveBeenCalledWith(mockContext, clusterId);

      expect(stateManager.setResource).toHaveBeenCalledWith(
        mockState,
        'databases.test_db',
        expect.objectContaining({
          mode: 'managed',
          region: 'ap-guangzhou',
          definition: expect.objectContaining({
            clusterName: 'test-tdsqlc',
          }),
          instances: expect.arrayContaining([
            expect.objectContaining({
              arn: expect.stringContaining('arn:tencent:cynosdb'),
              id: clusterId,
              status: 'running',
              vip: '10.0.0.1',
              vport: 3306,
            }),
          ]),
        }),
      );

      expect(result).toEqual(updatedState);
    });

    it('should throw error when refresh state fails', async () => {
      const clusterId = 'cynosdbmysql-test123';
      jest.spyOn(mockTdsqlcOperations, 'createCluster').mockResolvedValue(clusterId);
      jest.spyOn(mockTdsqlcOperations, 'getCluster').mockResolvedValue(null);

      await expect(createDatabaseResource(mockContext, mockDatabase, mockState)).rejects.toThrow(
        `Failed to refresh state for cluster: ${clusterId}`,
      );
    });
  });

  describe('readDatabaseResource', () => {
    it('should read database resource from provider', async () => {
      const clusterId = 'cynosdbmysql-test123';
      const clusterInfo = {
        ClusterId: clusterId,
        ClusterName: 'test-tdsqlc',
        Status: 'running',
        Region: 'ap-guangzhou',
        DbType: 'MYSQL' as const,
        DbVersion: '8.0',
      };

      jest.spyOn(mockTdsqlcOperations, 'getCluster').mockResolvedValue(clusterInfo);

      const result = await readDatabaseResource(mockContext, clusterId);

      expect(mockTdsqlcOperations.getCluster).toHaveBeenCalledWith(mockContext, clusterId);
      expect(result).toBe(clusterInfo);
    });
  });

  describe('updateDatabaseResource', () => {
    it('should update database resource and refresh state from provider', async () => {
      const clusterId = 'cynosdbmysql-test123';
      const mockResourceState: ResourceState = {
        mode: 'managed',
        region: 'ap-guangzhou',
        definition: {
          clusterName: 'test-tdsqlc',
          dbType: 'MYSQL',
          dbVersion: '8.0',
        },
        instances: [
          {
            arn: 'arn:tencent:cynosdb:ap-guangzhou::cluster:cynosdbmysql-test123',
            id: clusterId,
            clusterName: 'test-tdsqlc',
          },
        ],
        lastUpdated: new Date().toISOString(),
      };
      const updatedState: StateFile = {
        ...mockState,
        resources: { 'databases.test_db': mockResourceState },
      };

      jest.spyOn(mockTdsqlcOperations, 'updateCluster').mockResolvedValue(undefined);
      jest.spyOn(mockTdsqlcOperations, 'getCluster').mockResolvedValue(mockClusterInfo);
      jest.spyOn(stateManager, 'setResource').mockReturnValue(updatedState);

      const result = await updateDatabaseResource(mockContext, mockDatabase, clusterId, mockState);

      expect(mockTdsqlcOperations.updateCluster).toHaveBeenCalledWith(
        mockContext,
        clusterId,
        expect.objectContaining({
          ClusterName: 'test-tdsqlc',
          MinCpu: 1,
          MaxCpu: 8,
        }),
      );

      expect(mockTdsqlcOperations.getCluster).toHaveBeenCalledWith(mockContext, clusterId);

      expect(result).toEqual(updatedState);
    });

    it('should throw error when refresh state fails', async () => {
      const clusterId = 'cynosdbmysql-test123';
      jest.spyOn(mockTdsqlcOperations, 'updateCluster').mockResolvedValue(undefined);
      jest.spyOn(mockTdsqlcOperations, 'getCluster').mockResolvedValue(null);

      await expect(
        updateDatabaseResource(mockContext, mockDatabase, clusterId, mockState),
      ).rejects.toThrow(`Failed to refresh state for cluster: ${clusterId}`);
    });
  });

  describe('deleteDatabaseResource', () => {
    it('should delete database resource and update state', async () => {
      const clusterId = 'cynosdbmysql-test123';
      const logicalId = 'databases.test_db';
      const stateWithDb: StateFile = {
        ...mockState,
        resources: {
          [logicalId]: {
            mode: 'managed',
            region: 'ap-guangzhou',
            definition: {},
            instances: [],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      jest.spyOn(mockTdsqlcOperations, 'deleteCluster').mockResolvedValue(undefined);
      jest.spyOn(stateManager, 'removeResource').mockReturnValue(mockState);

      const result = await deleteDatabaseResource(mockContext, clusterId, logicalId, stateWithDb);

      expect(mockTdsqlcOperations.deleteCluster).toHaveBeenCalledWith(clusterId);
      expect(stateManager.removeResource).toHaveBeenCalledWith(stateWithDb, logicalId);
      expect(result).toEqual(mockState);
    });
  });
});
