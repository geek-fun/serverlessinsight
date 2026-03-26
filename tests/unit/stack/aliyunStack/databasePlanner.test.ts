import { ProviderEnum } from '../../../../src/common';
import { generateDatabasePlan } from '../../../../src/stack/aliyunStack/databasePlanner';
import {
  Context,
  CURRENT_STATE_VERSION,
  StateFile,
  DatabaseDomain,
  DatabaseEnum,
  DatabaseVersionEnum,
} from '../../../../src/types';

const mockedRdsOperations = {
  getInstance: jest.fn(),
};

const mockedEsOperations = {
  getApp: jest.fn(),
};

const mockedRdsTypes = {
  databaseToRdsConfig: jest.fn(),
  extractRdsDefinition: jest.fn(),
};

const mockedEsTypes = {
  databaseToEsConfig: jest.fn(),
  extractEsDefinition: jest.fn(),
};

const mockedStateManager = {
  getAllResources: jest.fn(),
  getResource: jest.fn(),
};

const mockedHashUtils = {
  attributesEqual: jest.fn(),
};

jest.mock('../../../../src/common/aliyunClient', () => ({
  createAliyunClient: () => ({
    rds: mockedRdsOperations,
    es: mockedEsOperations,
  }),
}));

jest.mock('../../../../src/stack/aliyunStack/rdsTypes', () => ({
  databaseToRdsConfig: (...args: unknown[]) => mockedRdsTypes.databaseToRdsConfig(...args),
  extractRdsDefinition: (...args: unknown[]) => mockedRdsTypes.extractRdsDefinition(...args),
}));

jest.mock('../../../../src/stack/aliyunStack/esServerlessTypes', () => ({
  databaseToEsConfig: (...args: unknown[]) => mockedEsTypes.databaseToEsConfig(...args),
  extractEsDefinition: (...args: unknown[]) => mockedEsTypes.extractEsDefinition(...args),
}));

jest.mock('../../../../src/common/stateManager', () => ({
  getAllResources: (...args: unknown[]) => mockedStateManager.getAllResources(...args),
  getResource: (...args: unknown[]) => mockedStateManager.getResource(...args),
}));

jest.mock('../../../../src/common/hashUtils', () => ({
  attributesEqual: (...args: unknown[]) => mockedHashUtils.attributesEqual(...args),
}));

const initialState: StateFile = {
  version: CURRENT_STATE_VERSION,
  provider: 'aliyun',
  app: 'test-app',
  service: 'test-service',
  stages: {},
  resources: {},
};

describe('DatabasePlanner', () => {
  const mockContext: Context = {
    stage: 'dev',
    app: 'test-app',
    service: 'test-service',
    provider: ProviderEnum.ALIYUN,
    region: 'cn-hangzhou',
    accountId: '123456789012',
    accessKeyId: 'test-key',
    accessKeySecret: 'test-secret',
    iacLocation: 'test.yml',
    parameters: [],
    stages: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedStateManager.getAllResources.mockReturnValue({});
    mockedStateManager.getResource.mockReturnValue(null);
  });

  const createTestDatabase = (
    type: DatabaseEnum = DatabaseEnum.RDS_MYSQL_SERVERLESS,
    key: string = 'test_db',
  ): DatabaseDomain => ({
    key,
    name: `${key}-name`,
    type,
    version: 'MYSQL_8.0' as DatabaseVersionEnum,
    security: {
      basicAuth: {
        password: 'test-password',
      },
    },
    network: {
      type: 'PUBLIC',
      ingressRules: [],
    },
    cu: { min: 0, max: 1 },
    storage: { min: 100 },
  });

  describe('generateDatabasePlan', () => {
    it('should plan creation of new RDS database', async () => {
      const database = createTestDatabase(DatabaseEnum.RDS_MYSQL_SERVERLESS, 'test_db');

      mockedStateManager.getResource.mockReturnValue(null);
      mockedRdsTypes.databaseToRdsConfig.mockReturnValue({
        dbInstanceClass: 'serverless',
      });
      mockedRdsTypes.extractRdsDefinition.mockReturnValue({
        engine: 'mysql',
      });

      const plan = await generateDatabasePlan(mockContext, initialState, [database]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toEqual(
        expect.objectContaining({
          logicalId: 'databases.test_db',
          action: 'create',
          resourceType: 'ALIYUN_RDS_SERVERLESS',
        }),
      );
    });

    it('should plan creation of new Elasticsearch database', async () => {
      const database = createTestDatabase(DatabaseEnum.ELASTICSEARCH_SERVERLESS, 'test_es');

      mockedStateManager.getResource.mockReturnValue(null);
      mockedEsTypes.databaseToEsConfig.mockReturnValue({
        appName: 'test-es-app',
      });
      mockedEsTypes.extractEsDefinition.mockReturnValue({
        appName: 'test-es-app',
      });

      const plan = await generateDatabasePlan(mockContext, initialState, [database]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toEqual(
        expect.objectContaining({
          logicalId: 'databases.test_es',
          action: 'create',
          resourceType: 'ALIYUN_ES_SERVERLESS',
        }),
      );
    });

    it('should plan update when definition changes', async () => {
      const database = createTestDatabase(DatabaseEnum.RDS_MYSQL_SERVERLESS, 'test_db');

      const existingState = {
        metadata: { instanceId: 'db-instance-123', resourceType: 'ALIYUN_RDS_SERVERLESS' },
        instances: [{ id: 'db-instance-123' }],
        definition: { engine: 'mysql', oldValue: 'old' },
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedRdsOperations.getInstance.mockResolvedValue({
        dbInstanceId: 'db-instance-123',
        engine: 'mysql',
      });
      mockedRdsTypes.databaseToRdsConfig.mockReturnValue({
        dbInstanceClass: 'serverless',
      });
      mockedRdsTypes.extractRdsDefinition.mockReturnValue({
        engine: 'mysql',
        newValue: 'new',
      });
      mockedHashUtils.attributesEqual.mockReturnValue(false);

      const plan = await generateDatabasePlan(mockContext, initialState, [database]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toEqual(
        expect.objectContaining({
          logicalId: 'databases.test_db',
          action: 'update',
          resourceType: 'ALIYUN_RDS_SERVERLESS',
          drifted: true,
        }),
      );
    });

    it('should plan no-op when definition is unchanged', async () => {
      const database = createTestDatabase(DatabaseEnum.RDS_MYSQL_SERVERLESS, 'test_db');

      const existingState = {
        metadata: { instanceId: 'db-instance-123', resourceType: 'ALIYUN_RDS_SERVERLESS' },
        instances: [{ id: 'db-instance-123' }],
        definition: { engine: 'mysql' },
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedRdsOperations.getInstance.mockResolvedValue({
        dbInstanceId: 'db-instance-123',
        engine: 'mysql',
      });
      mockedRdsTypes.databaseToRdsConfig.mockReturnValue({
        dbInstanceClass: 'serverless',
      });
      mockedRdsTypes.extractRdsDefinition.mockReturnValue({
        engine: 'mysql',
      });
      mockedHashUtils.attributesEqual.mockReturnValue(true);

      const plan = await generateDatabasePlan(mockContext, initialState, [database]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toEqual(
        expect.objectContaining({
          logicalId: 'databases.test_db',
          action: 'noop',
          resourceType: 'ALIYUN_RDS_SERVERLESS',
        }),
      );
    });

    it('should plan deletion of unused database', async () => {
      mockedStateManager.getAllResources.mockReturnValue({
        'databases.test_db': {
          metadata: { resourceType: 'ALIYUN_RDS_SERVERLESS' },
          definition: { engine: 'mysql' },
        },
      });

      const plan = await generateDatabasePlan(mockContext, initialState, undefined);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toEqual(
        expect.objectContaining({
          logicalId: 'databases.test_db',
          action: 'delete',
          resourceType: 'ALIYUN_RDS_SERVERLESS',
        }),
      );
    });

    it('should plan deletion when database is removed from config', async () => {
      mockedStateManager.getAllResources.mockReturnValue({
        'databases.test_db': {
          metadata: { resourceType: 'ALIYUN_RDS_SERVERLESS' },
          definition: { engine: 'mysql' },
        },
      });

      const databases: DatabaseDomain[] = [];
      const plan = await generateDatabasePlan(mockContext, initialState, databases);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toEqual(
        expect.objectContaining({
          logicalId: 'databases.test_db',
          action: 'delete',
        }),
      );
    });

    it('should plan drift when remote instance is missing', async () => {
      const database = createTestDatabase(DatabaseEnum.RDS_MYSQL_SERVERLESS, 'test_db');

      const existingState = {
        metadata: { instanceId: 'db-instance-123', resourceType: 'ALIYUN_RDS_SERVERLESS' },
        instances: [{ id: 'db-instance-123' }],
        definition: { engine: 'mysql' },
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedRdsOperations.getInstance.mockResolvedValue(null);
      mockedRdsTypes.databaseToRdsConfig.mockReturnValue({
        dbInstanceClass: 'serverless',
      });
      mockedRdsTypes.extractRdsDefinition.mockReturnValue({
        engine: 'mysql',
      });

      const plan = await generateDatabasePlan(mockContext, initialState, [database]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toEqual(
        expect.objectContaining({
          logicalId: 'databases.test_db',
          action: 'create',
          drifted: true,
        }),
      );
    });

    it('should handle provider error gracefully by planning recreation', async () => {
      const database = createTestDatabase(DatabaseEnum.RDS_MYSQL_SERVERLESS, 'test_db');

      const existingState = {
        metadata: { instanceId: 'db-instance-123', resourceType: 'ALIYUN_RDS_SERVERLESS' },
        instances: [{ id: 'db-instance-123' }],
        definition: { engine: 'mysql' },
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedRdsOperations.getInstance.mockRejectedValue(new Error('Provider error'));
      mockedRdsTypes.databaseToRdsConfig.mockReturnValue({
        dbInstanceClass: 'serverless',
      });
      mockedRdsTypes.extractRdsDefinition.mockReturnValue({
        engine: 'mysql',
      });

      const plan = await generateDatabasePlan(mockContext, initialState, [database]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toEqual(
        expect.objectContaining({
          logicalId: 'databases.test_db',
          action: 'create',
        }),
      );
    });

    it('should handle multiple databases', async () => {
      const databases: DatabaseDomain[] = [
        createTestDatabase(DatabaseEnum.RDS_MYSQL_SERVERLESS, 'test_db1'),
        createTestDatabase(DatabaseEnum.ELASTICSEARCH_SERVERLESS, 'test_es'),
      ];

      mockedStateManager.getResource.mockReturnValue(null);
      mockedRdsTypes.databaseToRdsConfig.mockReturnValue({});
      mockedRdsTypes.extractRdsDefinition.mockReturnValue({});
      mockedEsTypes.databaseToEsConfig.mockReturnValue({});
      mockedEsTypes.extractEsDefinition.mockReturnValue({});

      const plan = await generateDatabasePlan(mockContext, initialState, databases);

      expect(plan.items).toHaveLength(2);
      expect(plan.items).toContainEqual(
        expect.objectContaining({
          logicalId: 'databases.test_db1',
          action: 'create',
        }),
      );
      expect(plan.items).toContainEqual(
        expect.objectContaining({
          logicalId: 'databases.test_es',
          action: 'create',
        }),
      );
    });

    it('should filter out non-Aliyun database types', async () => {
      const databases = [
        {
          key: 'test_db',
          name: 'test-db',
          type: 'OTHER_DB',
        } as unknown as DatabaseDomain,
      ];

      const plan = await generateDatabasePlan(mockContext, initialState, databases);

      expect(plan.items).toHaveLength(0);
    });

    it('should plan update for Elasticsearch when definition changes', async () => {
      const database = createTestDatabase(DatabaseEnum.ELASTICSEARCH_SERVERLESS, 'test_es');

      const existingState = {
        metadata: { instanceId: 'es-app-123', resourceType: 'ALIYUN_ES_SERVERLESS' },
        instances: [{ id: 'es-app-123' }],
        definition: { appName: 'old-es-app' },
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedEsOperations.getApp.mockResolvedValue({
        appId: 'es-app-123',
        appName: 'test-es-app',
      });
      mockedEsTypes.databaseToEsConfig.mockReturnValue({
        appName: 'test-es-app',
      });
      mockedEsTypes.extractEsDefinition.mockReturnValue({
        appName: 'test-es-app',
        newValue: 'new',
      });
      mockedHashUtils.attributesEqual.mockReturnValue(false);

      const plan = await generateDatabasePlan(mockContext, initialState, [database]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toEqual(
        expect.objectContaining({
          logicalId: 'databases.test_es',
          action: 'update',
          resourceType: 'ALIYUN_ES_SERVERLESS',
          drifted: true,
        }),
      );
      expect(mockedEsOperations.getApp).toHaveBeenCalledWith('es-app-123');
    });

    it('should plan drift recreation for Elasticsearch when remote instance missing', async () => {
      const database = createTestDatabase(DatabaseEnum.ELASTICSEARCH_SERVERLESS, 'test_es');

      const existingState = {
        metadata: { instanceId: 'es-app-123', resourceType: 'ALIYUN_ES_SERVERLESS' },
        instances: [{ id: 'es-app-123' }],
        definition: { appName: 'old-es-app' },
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedEsOperations.getApp.mockResolvedValue(null);
      mockedEsTypes.databaseToEsConfig.mockReturnValue({
        appName: 'test-es-app',
      });
      mockedEsTypes.extractEsDefinition.mockReturnValue({
        appName: 'test-es-app',
      });

      const plan = await generateDatabasePlan(mockContext, initialState, [database]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toEqual(
        expect.objectContaining({
          logicalId: 'databases.test_es',
          action: 'create',
          drifted: true,
        }),
      );
    });

    it('should use instance id from instances array when metadata.instanceId is absent', async () => {
      const database = createTestDatabase(DatabaseEnum.RDS_MYSQL_SERVERLESS, 'test_db');

      const existingState = {
        metadata: { resourceType: 'ALIYUN_RDS_SERVERLESS' },
        instances: [{ id: 'db-fallback-456' }],
        definition: { engine: 'mysql' },
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedRdsOperations.getInstance.mockResolvedValue({
        dbInstanceId: 'db-fallback-456',
        engine: 'mysql',
      });
      mockedRdsTypes.databaseToRdsConfig.mockReturnValue({
        dbInstanceClass: 'serverless',
      });
      mockedRdsTypes.extractRdsDefinition.mockReturnValue({
        engine: 'mysql',
      });
      mockedHashUtils.attributesEqual.mockReturnValue(true);

      const plan = await generateDatabasePlan(mockContext, initialState, [database]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toEqual(
        expect.objectContaining({
          action: 'noop',
        }),
      );
      expect(mockedRdsOperations.getInstance).toHaveBeenCalledWith('db-fallback-456');
    });

    it('should plan deletion when database removed from desired config (with remaining desired)', async () => {
      const database = createTestDatabase(DatabaseEnum.RDS_MYSQL_SERVERLESS, 'test_db1');

      mockedStateManager.getResource.mockReturnValue(null);
      mockedRdsTypes.databaseToRdsConfig.mockReturnValue({});
      mockedRdsTypes.extractRdsDefinition.mockReturnValue({});

      mockedStateManager.getAllResources.mockReturnValue({
        'databases.test_db1': {
          metadata: { resourceType: 'ALIYUN_RDS_SERVERLESS' },
          definition: { engine: 'mysql' },
        },
        'databases.deleted_db': {
          metadata: { resourceType: 'ALIYUN_RDS_SERVERLESS' },
          definition: { engine: 'mysql' },
        },
      });

      const plan = await generateDatabasePlan(mockContext, initialState, [database]);

      const deleteItems = plan.items.filter((item) => item.action === 'delete');
      expect(deleteItems).toHaveLength(1);
      expect(deleteItems[0].logicalId).toBe('databases.deleted_db');
    });

    it('should plan deletion of ES Serverless resources that are no longer desired', async () => {
      mockedStateManager.getAllResources.mockReturnValue({
        'databases.old_es': {
          metadata: { resourceType: 'ALIYUN_ES_SERVERLESS' },
          definition: { appName: 'old-es' },
        },
      });

      const plan = await generateDatabasePlan(mockContext, initialState, undefined);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toEqual(
        expect.objectContaining({
          logicalId: 'databases.old_es',
          action: 'delete',
          resourceType: 'ALIYUN_ES_SERVERLESS',
        }),
      );
    });

    it('should use default resourceType when metadata.resourceType is missing in deletion', async () => {
      mockedStateManager.getAllResources.mockReturnValue({
        'databases.legacy_db': {
          metadata: {},
          definition: { engine: 'mysql' },
        },
      });

      const plan = await generateDatabasePlan(mockContext, initialState, undefined);

      expect(plan.items).toHaveLength(0);
    });

    it('should ignore non-database resources in state during deletion', async () => {
      mockedStateManager.getAllResources.mockReturnValue({
        'functions.my_func': {
          metadata: { resourceType: 'ALIYUN_FC3_FUNCTION' },
          definition: {},
        },
        'databases.test_rds': {
          metadata: { resourceType: 'ALIYUN_RDS_SERVERLESS' },
          definition: { engine: 'mysql' },
        },
      });

      const plan = await generateDatabasePlan(mockContext, initialState, undefined);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0].logicalId).toBe('databases.test_rds');
    });

    it('should plan deletion of ES resources when databases config has only RDS entries', async () => {
      const database = createTestDatabase(DatabaseEnum.RDS_MYSQL_SERVERLESS, 'test_db');

      mockedStateManager.getResource.mockReturnValue(null);
      mockedRdsTypes.databaseToRdsConfig.mockReturnValue({});
      mockedRdsTypes.extractRdsDefinition.mockReturnValue({});

      mockedStateManager.getAllResources.mockReturnValue({
        'databases.test_db': {
          metadata: { resourceType: 'ALIYUN_RDS_SERVERLESS' },
          definition: { engine: 'mysql' },
        },
        'databases.old_es': {
          metadata: { resourceType: 'ALIYUN_ES_SERVERLESS' },
          definition: { appName: 'old-es' },
        },
      });

      const plan = await generateDatabasePlan(mockContext, initialState, [database]);

      const deleteItems = plan.items.filter((item) => item.action === 'delete');
      expect(deleteItems).toHaveLength(1);
      expect(deleteItems[0].logicalId).toBe('databases.old_es');
      expect(deleteItems[0].resourceType).toBe('ALIYUN_ES_SERVERLESS');
    });

    it('should handle RDS_PGSQL_SERVERLESS type', async () => {
      const database = createTestDatabase(DatabaseEnum.RDS_PGSQL_SERVERLESS, 'test_pg');

      mockedStateManager.getResource.mockReturnValue(null);
      mockedRdsTypes.databaseToRdsConfig.mockReturnValue({
        dbInstanceClass: 'serverless',
      });
      mockedRdsTypes.extractRdsDefinition.mockReturnValue({
        engine: 'postgresql',
      });

      const plan = await generateDatabasePlan(mockContext, initialState, [database]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toEqual(
        expect.objectContaining({
          logicalId: 'databases.test_pg',
          action: 'create',
          resourceType: 'ALIYUN_RDS_SERVERLESS',
        }),
      );
    });

    it('should handle RDS_MSSQL_SERVERLESS type', async () => {
      const database = createTestDatabase(DatabaseEnum.RDS_MSSQL_SERVERLESS, 'test_mssql');

      mockedStateManager.getResource.mockReturnValue(null);
      mockedRdsTypes.databaseToRdsConfig.mockReturnValue({
        dbInstanceClass: 'serverless',
      });
      mockedRdsTypes.extractRdsDefinition.mockReturnValue({
        engine: 'mssql',
      });

      const plan = await generateDatabasePlan(mockContext, initialState, [database]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toEqual(
        expect.objectContaining({
          logicalId: 'databases.test_mssql',
          action: 'create',
          resourceType: 'ALIYUN_RDS_SERVERLESS',
        }),
      );
    });

    it('should skip remote check when instanceId is undefined', async () => {
      const database = createTestDatabase(DatabaseEnum.RDS_MYSQL_SERVERLESS, 'test_db');

      const existingState = {
        metadata: { resourceType: 'ALIYUN_RDS_SERVERLESS' },
        instances: [],
        definition: { engine: 'mysql' },
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedRdsTypes.databaseToRdsConfig.mockReturnValue({});
      mockedRdsTypes.extractRdsDefinition.mockReturnValue({
        engine: 'mysql',
      });

      const plan = await generateDatabasePlan(mockContext, initialState, [database]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toEqual(
        expect.objectContaining({
          action: 'create',
          drifted: true,
        }),
      );
      expect(mockedRdsOperations.getInstance).not.toHaveBeenCalled();
    });

    it('should handle current definition being undefined', async () => {
      const database = createTestDatabase(DatabaseEnum.RDS_MYSQL_SERVERLESS, 'test_db');

      const existingState = {
        metadata: { instanceId: 'db-instance-123', resourceType: 'ALIYUN_RDS_SERVERLESS' },
        instances: [{ id: 'db-instance-123' }],
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedRdsOperations.getInstance.mockResolvedValue({
        dbInstanceId: 'db-instance-123',
        engine: 'mysql',
      });
      mockedRdsTypes.databaseToRdsConfig.mockReturnValue({});
      mockedRdsTypes.extractRdsDefinition.mockReturnValue({
        engine: 'mysql',
      });
      mockedHashUtils.attributesEqual.mockReturnValue(false);

      const plan = await generateDatabasePlan(mockContext, initialState, [database]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toEqual(
        expect.objectContaining({
          action: 'update',
          drifted: true,
        }),
      );
    });
  });
});
