import {
  createDatabaseResource,
  readDatabaseResource,
  updateDatabaseResource,
  deleteDatabaseResource,
} from '../../../src/stack/scfStack/tdsqlcResource';
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

describe('TdsqlcResource', () => {
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

  describe('createDatabaseResource', () => {
    it('should create database resource and update state', async () => {
      const clusterId = 'cynosdbmysql-test123';
      const mockResourceState: ResourceState = {
        type: 'TDSQL_C_SERVERLESS',
        physicalId: clusterId,
        region: 'ap-guangzhou',
        configHash: 'hash',
        lastUpdated: new Date().toISOString(),
      };
      const updatedState: StateFile = {
        ...mockState,
        resources: { 'databases.test_db': mockResourceState },
      };

      jest.spyOn(tdsqlcProvider, 'createTdsqlcCluster').mockResolvedValue(clusterId);
      jest.spyOn(stateManager, 'setResource').mockReturnValue(updatedState);

      const result = await createDatabaseResource(mockContext, mockDatabase, mockState);

      expect(tdsqlcProvider.createTdsqlcCluster).toHaveBeenCalledWith(
        mockContext,
        expect.objectContaining({
          ClusterName: 'test-tdsqlc',
          DbType: 'MYSQL',
          DbVersion: '8.0',
          MinCpu: 1,
          MaxCpu: 8,
        }),
      );

      expect(stateManager.setResource).toHaveBeenCalledWith(
        mockState,
        'databases.test_db',
        expect.objectContaining({
          type: 'TDSQL_C_SERVERLESS',
          physicalId: clusterId,
          region: 'ap-guangzhou',
          metadata: {
            clusterName: 'test-tdsqlc',
          },
        }),
      );

      expect(result).toBe(updatedState);
    });
  });

  describe('readDatabaseResource', () => {
    it('should read database resource information', async () => {
      const clusterId = 'cynosdbmysql-test123';
      const clusterInfo = {
        ClusterId: clusterId,
        ClusterName: 'test-tdsqlc',
        Status: 'running',
        Region: 'ap-guangzhou',
        DbType: 'MYSQL',
        DbVersion: '8.0',
      };

      jest.spyOn(tdsqlcProvider, 'getTdsqlcCluster').mockResolvedValue(clusterInfo);

      const result = await readDatabaseResource(mockContext, clusterId);

      expect(tdsqlcProvider.getTdsqlcCluster).toHaveBeenCalledWith(mockContext, clusterId);
      expect(result).toBe(clusterInfo);
    });
  });

  describe('updateDatabaseResource', () => {
    it('should update database resource and state', async () => {
      const clusterId = 'cynosdbmysql-test123';
      const mockResourceState: ResourceState = {
        type: 'TDSQL_C_SERVERLESS',
        physicalId: clusterId,
        region: 'ap-guangzhou',
        configHash: 'new-hash',
        lastUpdated: new Date().toISOString(),
      };
      const updatedState: StateFile = {
        ...mockState,
        resources: { 'databases.test_db': mockResourceState },
      };

      jest.spyOn(tdsqlcProvider, 'updateTdsqlcCluster').mockResolvedValue();
      jest.spyOn(stateManager, 'setResource').mockReturnValue(updatedState);

      const result = await updateDatabaseResource(mockContext, mockDatabase, clusterId, mockState);

      expect(tdsqlcProvider.updateTdsqlcCluster).toHaveBeenCalledWith(
        mockContext,
        clusterId,
        expect.objectContaining({
          ClusterName: 'test-tdsqlc',
          MinCpu: 1,
          MaxCpu: 8,
        }),
      );

      expect(stateManager.setResource).toHaveBeenCalledWith(
        mockState,
        'databases.test_db',
        expect.objectContaining({
          type: 'TDSQL_C_SERVERLESS',
          physicalId: clusterId,
        }),
      );

      expect(result).toBe(updatedState);
    });
  });

  describe('deleteDatabaseResource', () => {
    it('should delete database resource and remove from state', async () => {
      const clusterId = 'cynosdbmysql-test123';
      const logicalId = 'databases.test_db';
      const updatedState = { ...mockState, resources: {} };

      jest.spyOn(tdsqlcProvider, 'deleteTdsqlcCluster').mockResolvedValue();
      jest.spyOn(stateManager, 'removeResource').mockReturnValue(updatedState as StateFile);

      const result = await deleteDatabaseResource(mockContext, clusterId, logicalId, mockState);

      expect(tdsqlcProvider.deleteTdsqlcCluster).toHaveBeenCalledWith(mockContext, clusterId);
      expect(stateManager.removeResource).toHaveBeenCalledWith(mockState, logicalId);
      expect(result).toBe(updatedState);
    });
  });
});
