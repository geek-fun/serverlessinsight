import { executeDatabasePlan } from '../../../src/stack/scfStack/tdsqlcExecutor';
import * as tdsqlcResource from '../../../src/stack/scfStack/tdsqlcResource';
import * as stateManager from '../../../src/common/stateManager';
import {
  Context,
  DatabaseDomain,
  DatabaseEnum,
  DatabaseVersionEnum,
  StateFile,
  Plan,
  ResourceState,
  PlanAction,
} from '../../../src/types';
import { ProviderEnum } from '../../../src/common';

jest.mock('../../../src/stack/scfStack/tdsqlcResource');
jest.mock('../../../src/common/stateManager');

describe('TdsqlcExecutor', () => {
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

  describe('executeDatabasePlan', () => {
    it('should execute create action', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.test_db',
            action: 'create',
            resourceType: 'TDSQL_C_SERVERLESS',
            changes: {
              after: { name: 'test-tdsqlc' },
            },
          },
        ],
      };

      const mockResourceState: ResourceState = {
        type: 'TDSQL_C_SERVERLESS',
        physicalId: 'cynosdbmysql-test123',
        region: 'ap-guangzhou',
        configHash: 'hash',
        lastUpdated: new Date().toISOString(),
      };
      const updatedState: StateFile = {
        ...mockState,
        resources: { 'databases.test_db': mockResourceState },
      };
      jest.spyOn(tdsqlcResource, 'createDatabaseResource').mockResolvedValue(updatedState);

      const result = await executeDatabasePlan(mockContext, plan, [mockDatabase], mockState);

      expect(tdsqlcResource.createDatabaseResource).toHaveBeenCalledWith(
        mockContext,
        mockDatabase,
        mockState,
      );
      expect(result).toBe(updatedState);
    });

    it('should execute update action', async () => {
      const resourceState: ResourceState = {
        type: 'TDSQL_C_SERVERLESS',
        physicalId: 'cynosdbmysql-test123',
        region: 'ap-guangzhou',
        configHash: 'some-hash',
        lastUpdated: '2024-01-01T00:00:00Z',
      };

      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.test_db',
            action: 'update',
            resourceType: 'TDSQL_C_SERVERLESS',
            changes: {
              before: { configHash: 'old-hash' },
              after: { configHash: 'new-hash' },
            },
          },
        ],
      };

      const mockResourceState: ResourceState = {
        type: 'TDSQL_C_SERVERLESS',
        physicalId: 'cynosdbmysql-test123',
        region: 'ap-guangzhou',
        configHash: 'new-hash',
        lastUpdated: new Date().toISOString(),
      };
      const updatedState: StateFile = {
        ...mockState,
        resources: { 'databases.test_db': mockResourceState },
      };
      jest.spyOn(stateManager, 'getResource').mockReturnValue(resourceState);
      jest.spyOn(tdsqlcResource, 'updateDatabaseResource').mockResolvedValue(updatedState);

      const result = await executeDatabasePlan(mockContext, plan, [mockDatabase], mockState);

      expect(tdsqlcResource.updateDatabaseResource).toHaveBeenCalledWith(
        mockContext,
        mockDatabase,
        'cynosdbmysql-test123',
        mockState,
      );
      expect(result).toBe(updatedState);
    });

    it('should execute delete action', async () => {
      const resourceState: ResourceState = {
        type: 'TDSQL_C_SERVERLESS',
        physicalId: 'cynosdbmysql-test123',
        region: 'ap-guangzhou',
        configHash: 'some-hash',
        lastUpdated: '2024-01-01T00:00:00Z',
      };

      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.test_db',
            action: 'delete',
            resourceType: 'TDSQL_C_SERVERLESS',
            changes: {
              before: { physicalId: 'cynosdbmysql-test123' },
            },
          },
        ],
      };

      const updatedState = { ...mockState, resources: {} };
      jest.spyOn(stateManager, 'getResource').mockReturnValue(resourceState);
      jest
        .spyOn(tdsqlcResource, 'deleteDatabaseResource')
        .mockResolvedValue(updatedState as StateFile);

      const result = await executeDatabasePlan(mockContext, plan, [], mockState);

      expect(tdsqlcResource.deleteDatabaseResource).toHaveBeenCalledWith(
        mockContext,
        'cynosdbmysql-test123',
        'databases.test_db',
        mockState,
      );
      expect(result).toBe(updatedState);
    });

    it('should skip noop actions', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.test_db',
            action: 'noop',
            resourceType: 'TDSQL_C_SERVERLESS',
          },
        ],
      };

      const result = await executeDatabasePlan(mockContext, plan, [mockDatabase], mockState);

      expect(tdsqlcResource.createDatabaseResource).not.toHaveBeenCalled();
      expect(tdsqlcResource.updateDatabaseResource).not.toHaveBeenCalled();
      expect(tdsqlcResource.deleteDatabaseResource).not.toHaveBeenCalled();
      expect(result).toBe(mockState);
    });

    it('should skip non-TDSQL-C resource types', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'functions.test_func',
            action: 'create',
            resourceType: 'SCF_FUNCTION',
            changes: {
              after: { name: 'test-func' },
            },
          },
        ],
      };

      const result = await executeDatabasePlan(mockContext, plan, [mockDatabase], mockState);

      expect(tdsqlcResource.createDatabaseResource).not.toHaveBeenCalled();
      expect(result).toBe(mockState);
    });

    it('should throw error if database not found for create action', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.non_existent',
            action: 'create',
            resourceType: 'TDSQL_C_SERVERLESS',
            changes: {
              after: { name: 'non-existent' },
            },
          },
        ],
      };

      await expect(
        executeDatabasePlan(mockContext, plan, [mockDatabase], mockState),
      ).rejects.toThrow('Database not found for logical ID: databases.non_existent');
    });

    it('should throw error if database not found for update action', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.non_existent',
            action: 'update',
            resourceType: 'TDSQL_C_SERVERLESS',
            changes: {
              before: { configHash: 'old' },
              after: { configHash: 'new' },
            },
          },
        ],
      };

      await expect(
        executeDatabasePlan(mockContext, plan, [mockDatabase], mockState),
      ).rejects.toThrow('Database not found for logical ID: databases.non_existent');
    });

    it('should throw error if state not found for update action', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.test_db',
            action: 'update',
            resourceType: 'TDSQL_C_SERVERLESS',
            changes: {
              before: { configHash: 'old' },
              after: { configHash: 'new' },
            },
          },
        ],
      };

      jest.spyOn(stateManager, 'getResource').mockReturnValue(undefined);

      await expect(
        executeDatabasePlan(mockContext, plan, [mockDatabase], mockState),
      ).rejects.toThrow('State not found for databases.test_db');
    });

    it('should skip delete if state not found', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.test_db',
            action: 'delete',
            resourceType: 'TDSQL_C_SERVERLESS',
            changes: {
              before: { physicalId: 'cynosdbmysql-test123' },
            },
          },
        ],
      };

      jest.spyOn(stateManager, 'getResource').mockReturnValue(undefined);

      const result = await executeDatabasePlan(mockContext, plan, [], mockState);

      expect(tdsqlcResource.deleteDatabaseResource).not.toHaveBeenCalled();
      expect(result).toBe(mockState);
    });

    it('should handle unknown actions', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.test_db',
            action: 'unknown' as PlanAction,
            resourceType: 'TDSQL_C_SERVERLESS',
          },
        ],
      };

      const result = await executeDatabasePlan(mockContext, plan, [mockDatabase], mockState);

      expect(result).toBe(mockState);
    });

    it('should propagate errors from resource operations', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.test_db',
            action: 'create',
            resourceType: 'TDSQL_C_SERVERLESS',
            changes: {
              after: { name: 'test-tdsqlc' },
            },
          },
        ],
      };

      jest
        .spyOn(tdsqlcResource, 'createDatabaseResource')
        .mockRejectedValue(new Error('API error'));

      await expect(
        executeDatabasePlan(mockContext, plan, [mockDatabase], mockState),
      ).rejects.toThrow('API error');
    });

    it('should execute multiple actions in sequence', async () => {
      const database2: DatabaseDomain = {
        ...mockDatabase,
        key: 'test_db2',
        name: 'test-tdsqlc-2',
      };

      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.test_db',
            action: 'create',
            resourceType: 'TDSQL_C_SERVERLESS',
            changes: { after: { name: 'test-tdsqlc' } },
          },
          {
            logicalId: 'databases.test_db2',
            action: 'create',
            resourceType: 'TDSQL_C_SERVERLESS',
            changes: { after: { name: 'test-tdsqlc-2' } },
          },
        ],
      };

      const mockResourceState1: ResourceState = {
        type: 'TDSQL_C_SERVERLESS',
        physicalId: 'cynosdbmysql-test1',
        region: 'ap-guangzhou',
        configHash: 'hash1',
        lastUpdated: new Date().toISOString(),
      };
      const mockResourceState2: ResourceState = {
        type: 'TDSQL_C_SERVERLESS',
        physicalId: 'cynosdbmysql-test2',
        region: 'ap-guangzhou',
        configHash: 'hash2',
        lastUpdated: new Date().toISOString(),
      };
      const state1: StateFile = {
        ...mockState,
        resources: { 'databases.test_db': mockResourceState1 },
      };
      const state2: StateFile = {
        ...state1,
        resources: { ...state1.resources, 'databases.test_db2': mockResourceState2 },
      };

      jest
        .spyOn(tdsqlcResource, 'createDatabaseResource')
        .mockResolvedValueOnce(state1)
        .mockResolvedValueOnce(state2);

      const result = await executeDatabasePlan(
        mockContext,
        plan,
        [mockDatabase, database2],
        mockState,
      );

      expect(tdsqlcResource.createDatabaseResource).toHaveBeenCalledTimes(2);
      expect(result).toBe(state2);
    });
  });
});
