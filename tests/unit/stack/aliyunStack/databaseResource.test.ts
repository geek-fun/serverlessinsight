import { ProviderEnum } from '../../../../src/common';
import {
  createDatabaseResource,
  readDatabaseResource,
  updateDatabaseResource,
  deleteDatabaseResource,
} from '../../../../src/stack/aliyunStack/databaseResource';
import {
  Context,
  CURRENT_STATE_VERSION,
  StateFile,
  DatabaseEnum,
  DatabaseDomain,
} from '../../../../src/types';

const mockEsOperations = {
  createApp: jest.fn(),
  getApp: jest.fn(),
  updateApp: jest.fn(),
  deleteApp: jest.fn(),
};

const mockRdsOperations = {
  createInstance: jest.fn(),
  getInstance: jest.fn(),
  updateInstance: jest.fn(),
  deleteInstance: jest.fn(),
};

const mockedStateManager = {
  setResource: jest.fn(),
  removeResource: jest.fn(),
};

const mockedLogger = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
};

jest.mock('../../../../src/common/aliyunClient', () => ({
  createAliyunClient: () => ({
    es: mockEsOperations,
    rds: mockRdsOperations,
  }),
}));

jest.mock('../../../../src/common/stateManager', () => ({
  ...jest.requireActual('../../../../src/common/stateManager'),
  setResource: (...args: unknown[]) => mockedStateManager.setResource(...args),
  removeResource: (...args: unknown[]) => mockedStateManager.removeResource(...args),
}));

jest.mock('../../../../src/common/logger', () => ({
  logger: {
    info: (...args: unknown[]) => mockedLogger.info(...args),
    error: (...args: unknown[]) => mockedLogger.error(...args),
    warn: (...args: unknown[]) => mockedLogger.warn(...args),
    debug: (...args: unknown[]) => mockedLogger.debug(...args),
  },
}));

jest.mock('../../../../src/lang', () => ({
  lang: {
    __: (key: string, params?: Record<string, string>) => {
      if (params) {
        return `${key} ${JSON.stringify(params)}`;
      }
      return key;
    },
  },
}));

jest.mock('../../../../src/stack/aliyunStack/rdsTypes', () => ({
  databaseToRdsConfig: jest.fn(() => ({
    dbInstanceDescription: 'test-rds',
    engine: 'MySQL',
    engineVersion: '8.0',
    dbInstanceClass: 'mysql.n2.serverless.1c',
    dbInstanceStorage: 20,
    category: 'serverless_basic',
  })),
  extractRdsDefinition: jest.fn(() => ({ engine: 'MySQL' })),
}));

jest.mock('../../../../src/stack/aliyunStack/esServerlessTypes', () => ({
  databaseToEsConfig: jest.fn(() => ({
    appName: 'test-es',
    appVersion: 'test_version',
    chargeType: 'PostPaid',
  })),
  extractEsDefinition: jest.fn(() => ({ appName: 'test-es' })),
}));

describe('DatabaseResource', () => {
  const mockContext: Context = {
    stage: 'default',
    app: 'test-app',
    service: 'test-service',
    provider: ProviderEnum.ALIYUN,
    region: 'cn-hangzhou',
    accessKeyId: 'test-key',
    accessKeySecret: 'test-secret',
    iacLocation: 'test.yml',
    parameters: [],
    stages: {},
  };

  const initialState: StateFile = {
    version: CURRENT_STATE_VERSION,
    provider: 'aliyun',
    app: 'test-app',
    service: 'test-service',
    stages: {},
    resources: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createDatabaseResource', () => {
    it('should create ES Serverless database', async () => {
      const esDatabase = {
        key: 'my_es',
        name: 'my-es-app',
        type: DatabaseEnum.ELASTICSEARCH_SERVERLESS,
        esServerless: {
          appName: 'my-es-app',
          description: 'Test ES app',
          appVersion: 'test_version',
          chargeType: 'PostPaid',
          authentication: { basicAuth: [] },
          network: [],
          privateNetwork: [],
        },
      } as unknown as DatabaseDomain;

      const esAppId = 'es-app-12345';
      mockEsOperations.createApp.mockResolvedValue(esAppId);
      mockEsOperations.getApp.mockResolvedValue({
        appId: esAppId,
        appName: 'my-es-app',
        description: 'Test ES app',
        status: 'active',
        regionId: 'cn-hangzhou',
      });

      const expectedState = { ...initialState, updated: true };
      mockedStateManager.setResource.mockReturnValue(expectedState);

      const result = await createDatabaseResource(mockContext, esDatabase, initialState);

      expect(mockEsOperations.createApp).toHaveBeenCalled();
      expect(mockEsOperations.getApp).toHaveBeenCalledWith(esAppId);
      expect(mockedStateManager.setResource).toHaveBeenCalled();
      expect(result).toEqual(expectedState);
    });

    it('should create RDS MySQL Serverless database', async () => {
      const rdsDatabase = {
        key: 'my_rds',
        name: 'my-rds-mysql',
        type: DatabaseEnum.RDS_MYSQL_SERVERLESS,
        rds: {
          engine: 'MySQL',
          engineVersion: '8.0',
          dbInstanceClass: 'mysql.n2.serverless.1c',
          dbInstanceStorage: 20,
          dbInstanceStorageType: 'cloud_essd',
          category: 'serverless_basic',
          vpcId: 'vpc-12345',
          vSwitchId: 'vsw-12345',
          zoneId: 'cn-hangzhou-h',
        },
      } as unknown as DatabaseDomain;

      const rdsInstanceId = 'rm-12345';
      mockRdsOperations.createInstance.mockResolvedValue(rdsInstanceId);
      mockRdsOperations.getInstance.mockResolvedValue({
        dbInstanceId: rdsInstanceId,
        engine: 'MySQL',
        engineVersion: '8.0',
        dbInstanceStatus: 'Running',
        regionId: 'cn-hangzhou',
      });

      const expectedState = { ...initialState, updated: true };
      mockedStateManager.setResource.mockReturnValue(expectedState);

      const result = await createDatabaseResource(mockContext, rdsDatabase, initialState);

      expect(mockRdsOperations.createInstance).toHaveBeenCalled();
      expect(mockRdsOperations.getInstance).toHaveBeenCalledWith(rdsInstanceId);
      expect(mockedStateManager.setResource).toHaveBeenCalled();
      expect(result).toEqual(expectedState);
    });

    it('should create RDS PostgreSQL Serverless database', async () => {
      const rdsDatabase = {
        key: 'my_rds_pg',
        name: 'my-rds-pgsql',
        type: DatabaseEnum.RDS_PGSQL_SERVERLESS,
        rds: {
          engine: 'PostgreSQL',
          engineVersion: '14.0',
          dbInstanceClass: 'pg.n2.serverless.1c',
        },
      } as unknown as DatabaseDomain;

      const rdsInstanceId = 'rm-67890';
      mockRdsOperations.createInstance.mockResolvedValue(rdsInstanceId);
      mockRdsOperations.getInstance.mockResolvedValue({
        dbInstanceId: rdsInstanceId,
        engine: 'PostgreSQL',
        engineVersion: '14.0',
      });

      const expectedState = { ...initialState, updated: true };
      mockedStateManager.setResource.mockReturnValue(expectedState);

      const result = await createDatabaseResource(mockContext, rdsDatabase, initialState);

      expect(mockRdsOperations.createInstance).toHaveBeenCalled();
      expect(mockRdsOperations.getInstance).toHaveBeenCalledWith(rdsInstanceId);
      expect(result).toEqual(expectedState);
    });

    it('should create RDS SQL Server Serverless database', async () => {
      const rdsDatabase = {
        key: 'my_rds_mssql',
        name: 'my-rds-mssql',
        type: DatabaseEnum.RDS_MSSQL_SERVERLESS,
        rds: {
          engine: 'SQLServer',
          engineVersion: '2019',
          dbInstanceClass: 'mssql.n2.serverless.1c',
        },
      } as unknown as DatabaseDomain;

      const rdsInstanceId = 'rm-mssql-123';
      mockRdsOperations.createInstance.mockResolvedValue(rdsInstanceId);
      mockRdsOperations.getInstance.mockResolvedValue({
        dbInstanceId: rdsInstanceId,
        engine: 'SQLServer',
        engineVersion: '2019',
      });

      const expectedState = { ...initialState, updated: true };
      mockedStateManager.setResource.mockReturnValue(expectedState);

      const result = await createDatabaseResource(mockContext, rdsDatabase, initialState);

      expect(mockRdsOperations.createInstance).toHaveBeenCalled();
      expect(result).toEqual(expectedState);
    });

    it('should handle RDS with serverlessConfig', async () => {
      const rdsDatabase = {
        key: 'my_rds',
        name: 'my-rds-mysql',
        type: DatabaseEnum.RDS_MYSQL_SERVERLESS,
        rds: {
          engine: 'MySQL',
          engineVersion: '8.0',
          dbInstanceClass: 'mysql.n2.serverless.1c',
        },
      } as unknown as DatabaseDomain;

      const rdsInstanceId = 'rm-12345';
      mockRdsOperations.createInstance.mockResolvedValue(rdsInstanceId);
      mockRdsOperations.getInstance.mockResolvedValue({
        dbInstanceId: rdsInstanceId,
        engine: 'MySQL',
        serverlessConfig: {
          minCapacity: 0.5,
          maxCapacity: 8,
          autoPause: true,
          switchForce: false,
        },
      });

      const expectedState = { ...initialState, updated: true };
      mockedStateManager.setResource.mockReturnValue(expectedState);

      const result = await createDatabaseResource(mockContext, rdsDatabase, initialState);

      expect(result).toEqual(expectedState);
    });

    it('should handle ES with network configuration', async () => {
      const esDatabase = {
        key: 'my_es',
        name: 'my-es-app',
        type: DatabaseEnum.ELASTICSEARCH_SERVERLESS,
        esServerless: {
          appName: 'my-es-app',
          appVersion: 'test_version',
          chargeType: 'PostPaid',
          authentication: { basicAuth: [] },
          network: [],
          privateNetwork: [],
        },
      } as unknown as DatabaseDomain;

      const esAppId = 'es-app-12345';
      mockEsOperations.createApp.mockResolvedValue(esAppId);
      mockEsOperations.getApp.mockResolvedValue({
        appId: esAppId,
        appName: 'my-es-app',
        network: [
          {
            type: 'public',
            enabled: true,
            domain: 'example.com',
            port: 9200,
            whiteIpGroup: [{ groupName: 'default', ips: ['0.0.0.0/0'] }],
          },
        ],
      });

      const expectedState = { ...initialState, updated: true };
      mockedStateManager.setResource.mockReturnValue(expectedState);

      const result = await createDatabaseResource(mockContext, esDatabase, initialState);

      expect(result).toEqual(expectedState);
    });

    it('should handle ES with privateNetwork configuration', async () => {
      const esDatabase = {
        key: 'my_es',
        name: 'my-es-app',
        type: DatabaseEnum.ELASTICSEARCH_SERVERLESS,
        esServerless: {
          appName: 'my-es-app',
          appVersion: 'test_version',
          chargeType: 'PostPaid',
          authentication: { basicAuth: [] },
          network: [],
          privateNetwork: [],
        },
      } as unknown as DatabaseDomain;

      const esAppId = 'es-app-12345';
      mockEsOperations.createApp.mockResolvedValue(esAppId);
      mockEsOperations.getApp.mockResolvedValue({
        appId: esAppId,
        appName: 'my-es-app',
        privateNetwork: [
          {
            type: 'private',
            enabled: true,
            vpcId: 'vpc-123',
            pvlEndpointId: 'ep-123',
            whiteIpGroup: [{ groupName: 'vpc', ips: ['192.168.0.0/16'] }],
          },
        ],
      });

      const expectedState = { ...initialState, updated: true };
      mockedStateManager.setResource.mockReturnValue(expectedState);

      const result = await createDatabaseResource(mockContext, esDatabase, initialState);

      expect(result).toEqual(expectedState);
    });

    it('should handle ES with null whiteIpGroup arrays', async () => {
      const esDatabase = {
        key: 'my_es',
        name: 'my-es-app',
        type: DatabaseEnum.ELASTICSEARCH_SERVERLESS,
        esServerless: {
          appName: 'my-es-app',
          appVersion: 'test_version',
          chargeType: 'PostPaid',
          authentication: { basicAuth: [] },
          network: [],
          privateNetwork: [],
        },
      } as unknown as DatabaseDomain;

      const esAppId = 'es-app-12345';
      mockEsOperations.createApp.mockResolvedValue(esAppId);
      mockEsOperations.getApp.mockResolvedValue({
        appId: esAppId,
        appName: 'my-es-app',
        network: [
          {
            type: 'public',
            enabled: true,
            domain: 'example.com',
            port: 9200,
            whiteIpGroup: null,
          },
        ],
        privateNetwork: [
          {
            type: 'private',
            enabled: true,
            vpcId: 'vpc-123',
            whiteIpGroup: null,
          },
        ],
      });

      const expectedState = { ...initialState, updated: true };
      mockedStateManager.setResource.mockReturnValue(expectedState);

      const result = await createDatabaseResource(mockContext, esDatabase, initialState);

      expect(result).toEqual(expectedState);
    });

    it('should handle ES with tags', async () => {
      const esDatabase = {
        key: 'my_es',
        name: 'my-es-app',
        type: DatabaseEnum.ELASTICSEARCH_SERVERLESS,
        esServerless: {
          appName: 'my-es-app',
          appVersion: 'test_version',
          chargeType: 'PostPaid',
          authentication: { basicAuth: [] },
          network: [],
          privateNetwork: [],
        },
      } as unknown as DatabaseDomain;

      const esAppId = 'es-app-12345';
      mockEsOperations.createApp.mockResolvedValue(esAppId);
      mockEsOperations.getApp.mockResolvedValue({
        appId: esAppId,
        appName: 'my-es-app',
        tags: [
          { key: 'env', value: 'prod' },
          { key: 'team', value: 'backend' },
        ],
      });

      const expectedState = { ...initialState, updated: true };
      mockedStateManager.setResource.mockReturnValue(expectedState);

      const result = await createDatabaseResource(mockContext, esDatabase, initialState);

      expect(result).toEqual(expectedState);
    });

    it('should handle RDS with null/undefined fields', async () => {
      const rdsDatabase = {
        key: 'my_rds',
        name: 'my-rds-mysql',
        type: DatabaseEnum.RDS_MYSQL_SERVERLESS,
        rds: {
          engine: 'MySQL',
          engineVersion: '8.0',
        },
      } as unknown as DatabaseDomain;

      const rdsInstanceId = 'rm-12345';
      mockRdsOperations.createInstance.mockResolvedValue(rdsInstanceId);
      mockRdsOperations.getInstance.mockResolvedValue({
        dbInstanceId: null,
        dbInstanceDescription: undefined,
        engine: null,
        engineVersion: undefined,
        dbInstanceClass: null,
        dbInstanceStorage: undefined,
        category: null,
        dbInstanceStorageType: undefined,
        serverlessConfig: {
          minCapacity: undefined,
          maxCapacity: null,
          autoPause: undefined,
          switchForce: null,
        },
        masterUsername: null,
        vpcId: undefined,
        vSwitchId: null,
        zoneId: undefined,
        connectionString: null,
        port: undefined,
        dbInstanceStatus: null,
        createTime: undefined,
        regionId: null,
        securityIPList: undefined,
        multiAZ: null,
      });

      const expectedState = { ...initialState, updated: true };
      mockedStateManager.setResource.mockReturnValue(expectedState);

      const result = await createDatabaseResource(mockContext, rdsDatabase, initialState);

      expect(result).toEqual(expectedState);
    });

    it('should handle ES with null/undefined fields', async () => {
      const esDatabase = {
        key: 'my_es',
        name: 'my-es-app',
        type: DatabaseEnum.ELASTICSEARCH_SERVERLESS,
        esServerless: {
          appName: 'my-es-app',
          appVersion: 'test_version',
          chargeType: 'PostPaid',
          authentication: { basicAuth: [] },
          network: [],
          privateNetwork: [],
        },
      } as unknown as DatabaseDomain;

      const esAppId = 'es-app-12345';
      mockEsOperations.createApp.mockResolvedValue(esAppId);
      mockEsOperations.getApp.mockResolvedValue({
        appId: null,
        appName: undefined,
        appType: null,
        status: undefined,
        description: null,
        createTime: undefined,
        modifiedTime: null,
        regionId: undefined,
        version: null,
        ownerId: undefined,
        instanceId: null,
        chargeType: undefined,
        scenario: null,
        network: [
          {
            type: null,
            enabled: undefined,
            domain: null,
            port: undefined,
            whiteIpGroup: [
              {
                groupName: null,
                ips: undefined,
              },
            ],
          },
        ],
        privateNetwork: [
          {
            type: null,
            enabled: undefined,
            domain: null,
            port: undefined,
            vpcId: null,
            pvlEndpointId: undefined,
            whiteIpGroup: [
              {
                groupName: null,
                ips: undefined,
              },
            ],
          },
        ],
        tags: [
          {
            key: null,
            value: undefined,
          },
        ],
      });

      const expectedState = { ...initialState, updated: true };
      mockedStateManager.setResource.mockReturnValue(expectedState);

      const result = await createDatabaseResource(mockContext, esDatabase, initialState);

      expect(result).toEqual(expectedState);
    });

    it('should throw if ES app refresh fails', async () => {
      const esDatabase = {
        key: 'my_es',
        name: 'my-es-app',
        type: DatabaseEnum.ELASTICSEARCH_SERVERLESS,
        version: '7.10',
        esServerless: {
          appName: 'my-es-app',
          appVersion: 'test_version',
          chargeType: 'PostPaid',
          authentication: { basicAuth: [] },
          network: [],
          privateNetwork: [],
        },
      } as unknown as DatabaseDomain;

      const esAppId = 'es-app-12345';
      mockEsOperations.createApp.mockResolvedValue(esAppId);
      mockEsOperations.getApp.mockResolvedValue(null);

      await expect(createDatabaseResource(mockContext, esDatabase, initialState)).rejects.toThrow(
        `Failed to refresh state for ES app: ${esAppId}`,
      );
    });

    it('should throw if RDS instance refresh fails', async () => {
      const rdsDatabase = {
        key: 'my_rds',
        name: 'my-rds-mysql',
        type: DatabaseEnum.RDS_MYSQL_SERVERLESS,
        version: '8.0',
        rds: {
          engine: 'MySQL',
          engineVersion: '8.0',
          dbInstanceClass: 'mysql.n2.serverless.1c',
        },
      } as unknown as DatabaseDomain;

      const rdsInstanceId = 'rm-12345';
      mockRdsOperations.createInstance.mockResolvedValue(rdsInstanceId);
      mockRdsOperations.getInstance.mockResolvedValue(null);

      await expect(createDatabaseResource(mockContext, rdsDatabase, initialState)).rejects.toThrow(
        `Failed to refresh state for RDS instance: ${rdsInstanceId}`,
      );
    });

    it('should throw for unsupported database type', async () => {
      const unsupportedDatabase = {
        key: 'unknown',
        name: 'unknown-db',
        type: 'UNSUPPORTED_DB',
      } as unknown as DatabaseDomain;

      await expect(
        createDatabaseResource(mockContext, unsupportedDatabase, initialState),
      ).rejects.toThrow('Unsupported database type: UNSUPPORTED_DB');
    });
  });

  describe('readDatabaseResource', () => {
    it('should read ES Serverless app', async () => {
      const instanceId = 'es-app-12345';
      const esInfo = {
        appId: instanceId,
        appName: 'my-es-app',
        status: 'active',
      };

      mockEsOperations.getApp.mockResolvedValue(esInfo);

      const result = await readDatabaseResource(mockContext, instanceId, 'ALIYUN_ES_SERVERLESS');

      expect(mockEsOperations.getApp).toHaveBeenCalledWith(instanceId);
      expect(result).toEqual(esInfo);
    });

    it('should read RDS instance', async () => {
      const instanceId = 'rm-12345';
      const rdsInfo = {
        dbInstanceId: instanceId,
        engine: 'MySQL',
        dbInstanceStatus: 'Running',
      };

      mockRdsOperations.getInstance.mockResolvedValue(rdsInfo);

      const result = await readDatabaseResource(mockContext, instanceId, 'ALIYUN_RDS_SERVERLESS');

      expect(mockRdsOperations.getInstance).toHaveBeenCalledWith(instanceId);
      expect(result).toEqual(rdsInfo);
    });

    it('should throw for unsupported resource type', async () => {
      const instanceId = 'unknown-12345';

      await expect(
        readDatabaseResource(mockContext, instanceId, 'UNSUPPORTED_TYPE'),
      ).rejects.toThrow('Unsupported resource type: UNSUPPORTED_TYPE');
    });
  });

  describe('updateDatabaseResource', () => {
    it('should update ES Serverless database', async () => {
      const esDatabase = {
        key: 'my_es',
        name: 'my-es-app',
        type: DatabaseEnum.ELASTICSEARCH_SERVERLESS,
        esServerless: {
          appName: 'my-es-app-updated',
          description: 'Updated ES app',
          appVersion: 'test_version',
          chargeType: 'PostPaid',
          authentication: { basicAuth: [] },
          network: [],
          privateNetwork: [],
        },
      } as unknown as DatabaseDomain;

      const instanceId = 'es-app-12345';
      mockEsOperations.updateApp.mockResolvedValue(undefined);
      mockEsOperations.getApp.mockResolvedValue({
        appId: instanceId,
        appName: 'my-es-app-updated',
        description: 'Updated ES app',
      });

      const expectedState = { ...initialState, updated: true };
      mockedStateManager.setResource.mockReturnValue(expectedState);

      const result = await updateDatabaseResource(
        mockContext,
        esDatabase,
        instanceId,
        'ALIYUN_ES_SERVERLESS',
        initialState,
      );

      expect(mockEsOperations.updateApp).toHaveBeenCalled();
      expect(mockEsOperations.getApp).toHaveBeenCalledWith(instanceId);
      expect(result).toEqual(expectedState);
    });

    it('should update RDS instance', async () => {
      const rdsDatabase = {
        key: 'my_rds',
        name: 'my-rds-mysql',
        type: DatabaseEnum.RDS_MYSQL_SERVERLESS,
        rds: {
          engine: 'MySQL',
          engineVersion: '8.0',
          dbInstanceClass: 'mysql.n2.serverless.2c',
        },
      } as unknown as DatabaseDomain;

      const instanceId = 'rm-12345';
      mockRdsOperations.updateInstance.mockResolvedValue(undefined);
      mockRdsOperations.getInstance.mockResolvedValue({
        dbInstanceId: instanceId,
        engine: 'MySQL',
        dbInstanceClass: 'mysql.n2.serverless.2c',
      });

      const expectedState = { ...initialState, updated: true };
      mockedStateManager.setResource.mockReturnValue(expectedState);

      const result = await updateDatabaseResource(
        mockContext,
        rdsDatabase,
        instanceId,
        'ALIYUN_RDS_SERVERLESS',
        initialState,
      );

      expect(mockRdsOperations.updateInstance).toHaveBeenCalled();
      expect(mockRdsOperations.getInstance).toHaveBeenCalledWith(instanceId);
      expect(result).toEqual(expectedState);
    });

    it('should throw if ES app refresh fails during update', async () => {
      const esDatabase = {
        key: 'my_es',
        name: 'my-es-app',
        type: DatabaseEnum.ELASTICSEARCH_SERVERLESS,
        esServerless: {
          appName: 'my-es-app',
          appVersion: 'test_version',
          chargeType: 'PostPaid',
          authentication: { basicAuth: [] },
          network: [],
          privateNetwork: [],
        },
      } as unknown as DatabaseDomain;

      const instanceId = 'es-app-12345';
      mockEsOperations.updateApp.mockResolvedValue(undefined);
      mockEsOperations.getApp.mockResolvedValue(null);

      await expect(
        updateDatabaseResource(
          mockContext,
          esDatabase,
          instanceId,
          'ALIYUN_ES_SERVERLESS',
          initialState,
        ),
      ).rejects.toThrow(`Failed to refresh state for ES app: ${instanceId}`);
    });

    it('should throw if RDS instance refresh fails during update', async () => {
      const rdsDatabase = {
        key: 'my_rds',
        name: 'my-rds-mysql',
        type: DatabaseEnum.RDS_MYSQL_SERVERLESS,
        rds: {
          engine: 'MySQL',
          engineVersion: '8.0',
          dbInstanceClass: 'mysql.n2.serverless.1c',
        },
      } as unknown as DatabaseDomain;

      const instanceId = 'rm-12345';
      mockRdsOperations.updateInstance.mockResolvedValue(undefined);
      mockRdsOperations.getInstance.mockResolvedValue(null);

      await expect(
        updateDatabaseResource(
          mockContext,
          rdsDatabase,
          instanceId,
          'ALIYUN_RDS_SERVERLESS',
          initialState,
        ),
      ).rejects.toThrow(`Failed to refresh state for RDS instance: ${instanceId}`);
    });

    it('should throw for unsupported resource type in update', async () => {
      const database = {
        key: 'unknown',
        name: 'unknown-db',
        type: 'UNSUPPORTED_DB',
      } as unknown as DatabaseDomain;

      await expect(
        updateDatabaseResource(mockContext, database, 'id-123', 'UNSUPPORTED_TYPE', initialState),
      ).rejects.toThrow('Unsupported resource type: UNSUPPORTED_TYPE');
    });
  });

  describe('deleteDatabaseResource', () => {
    it('should delete ES database and remove from state', async () => {
      const databaseId = 'es-app-test123';
      const logicalId = 'databases.test_es';
      const stateWithDb: StateFile = {
        ...initialState,
        resources: {
          [logicalId]: {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: { resourceType: 'ALIYUN_ES_SERVERLESS' },
            instances: [],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      mockEsOperations.deleteApp.mockResolvedValue(undefined);
      mockedStateManager.removeResource.mockReturnValue(initialState);

      const result = await deleteDatabaseResource(
        mockContext,
        databaseId,
        'ALIYUN_ES_SERVERLESS',
        logicalId,
        stateWithDb,
      );

      expect(mockEsOperations.deleteApp).toHaveBeenCalledWith(databaseId);
      expect(mockedStateManager.removeResource).toHaveBeenCalledWith(stateWithDb, logicalId);
      expect(result).toEqual(initialState);
    });

    it('should delete RDS database and remove from state', async () => {
      const databaseId = 'rds-db-test123';
      const logicalId = 'databases.test_rds';
      const stateWithDb: StateFile = {
        ...initialState,
        resources: {
          [logicalId]: {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: { resourceType: 'ALIYUN_RDS_SERVERLESS' },
            instances: [],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      mockRdsOperations.deleteInstance.mockResolvedValue(undefined);
      mockedStateManager.removeResource.mockReturnValue(initialState);

      const result = await deleteDatabaseResource(
        mockContext,
        databaseId,
        'ALIYUN_RDS_SERVERLESS',
        logicalId,
        stateWithDb,
      );

      expect(mockRdsOperations.deleteInstance).toHaveBeenCalledWith(databaseId);
      expect(mockedStateManager.removeResource).toHaveBeenCalledWith(stateWithDb, logicalId);
      expect(result).toEqual(initialState);
    });

    it('should handle AppNotFound gracefully for ES', async () => {
      const databaseId = 'es-app-test123';
      const logicalId = 'databases.test_es';
      const stateWithDb: StateFile = {
        ...initialState,
        resources: {
          [logicalId]: {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: { resourceType: 'ALIYUN_ES_SERVERLESS' },
            instances: [],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      const notFoundError = Object.assign(new Error('not found'), {
        code: 'AppNotFound',
      });
      mockEsOperations.deleteApp.mockRejectedValue(notFoundError);
      mockedStateManager.removeResource.mockReturnValue(initialState);

      const result = await deleteDatabaseResource(
        mockContext,
        databaseId,
        'ALIYUN_ES_SERVERLESS',
        logicalId,
        stateWithDb,
      );

      expect(mockEsOperations.deleteApp).toHaveBeenCalledWith(databaseId);
      expect(mockedLogger.warn).toHaveBeenCalledWith(
        expect.stringContaining('RESOURCE_NOT_FOUND_PROVIDER'),
      );
      expect(mockedStateManager.removeResource).toHaveBeenCalledWith(stateWithDb, logicalId);
      expect(result).toEqual(initialState);
    });

    it('should handle InvalidDBInstanceId.NotFound gracefully for RDS', async () => {
      const databaseId = 'rds-db-test123';
      const logicalId = 'databases.test_rds';
      const stateWithDb: StateFile = {
        ...initialState,
        resources: {
          [logicalId]: {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: { resourceType: 'ALIYUN_RDS_SERVERLESS' },
            instances: [],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      const notFoundError = Object.assign(new Error('not found'), {
        code: 'InvalidDBInstanceId.NotFound',
      });
      mockRdsOperations.deleteInstance.mockRejectedValue(notFoundError);
      mockedStateManager.removeResource.mockReturnValue(initialState);

      const result = await deleteDatabaseResource(
        mockContext,
        databaseId,
        'ALIYUN_RDS_SERVERLESS',
        logicalId,
        stateWithDb,
      );

      expect(mockRdsOperations.deleteInstance).toHaveBeenCalledWith(databaseId);
      expect(mockedLogger.warn).toHaveBeenCalledWith(
        expect.stringContaining('RESOURCE_NOT_FOUND_PROVIDER'),
      );
      expect(mockedStateManager.removeResource).toHaveBeenCalledWith(stateWithDb, logicalId);
      expect(result).toEqual(initialState);
    });

    it('should rethrow unexpected errors', async () => {
      const databaseId = 'es-app-test123';
      const logicalId = 'databases.test_es';
      const error = new Error('Delete failed');

      mockEsOperations.deleteApp.mockRejectedValue(error);

      await expect(
        deleteDatabaseResource(
          mockContext,
          databaseId,
          'ALIYUN_ES_SERVERLESS',
          logicalId,
          initialState,
        ),
      ).rejects.toThrow('Delete failed');
    });

    it('should throw for unsupported resource type', async () => {
      const databaseId = 'unknown-db-123';
      const logicalId = 'databases.test_unknown';

      await expect(
        deleteDatabaseResource(
          mockContext,
          databaseId,
          'UNKNOWN' as unknown as DatabaseEnum,
          logicalId,
          initialState,
        ),
      ).rejects.toThrow('Unsupported resource type: UNKNOWN');
    });

    it('should handle NotFound error code gracefully', async () => {
      const databaseId = 'es-app-test123';
      const logicalId = 'databases.test_es';

      const notFoundError = Object.assign(new Error('Resource not found'), {
        code: 'NotFound',
      });
      mockEsOperations.deleteApp.mockRejectedValue(notFoundError);
      mockedStateManager.removeResource.mockReturnValue(initialState);

      const result = await deleteDatabaseResource(
        mockContext,
        databaseId,
        'ALIYUN_ES_SERVERLESS',
        logicalId,
        initialState,
      );

      expect(mockedLogger.warn).toHaveBeenCalled();
      expect(result).toEqual(initialState);
    });

    it('should handle error message containing "not found" gracefully', async () => {
      const databaseId = 'rds-db-test123';
      const logicalId = 'databases.test_rds';

      const notFoundError = new Error('Database instance not found in region');
      mockRdsOperations.deleteInstance.mockRejectedValue(notFoundError);
      mockedStateManager.removeResource.mockReturnValue(initialState);

      const result = await deleteDatabaseResource(
        mockContext,
        databaseId,
        'ALIYUN_RDS_SERVERLESS',
        logicalId,
        initialState,
      );

      expect(mockedLogger.warn).toHaveBeenCalled();
      expect(result).toEqual(initialState);
    });

    it('should handle error message containing "NotFound" gracefully', async () => {
      const databaseId = 'es-app-test123';
      const logicalId = 'databases.test_es';

      const notFoundError = new Error('AppNotFound: the app does not exist');
      mockEsOperations.deleteApp.mockRejectedValue(notFoundError);
      mockedStateManager.removeResource.mockReturnValue(initialState);

      const result = await deleteDatabaseResource(
        mockContext,
        databaseId,
        'ALIYUN_ES_SERVERLESS',
        logicalId,
        initialState,
      );

      expect(mockedLogger.warn).toHaveBeenCalled();
      expect(result).toEqual(initialState);
    });

    it('should handle error without code or message gracefully', async () => {
      const databaseId = 'es-app-test123';
      const logicalId = 'databases.test_es';

      const errorWithoutMessage = {} as unknown as DatabaseDomain;
      mockEsOperations.deleteApp.mockRejectedValue(errorWithoutMessage);

      await expect(
        deleteDatabaseResource(
          mockContext,
          databaseId,
          'ALIYUN_ES_SERVERLESS',
          logicalId,
          initialState,
        ),
      ).rejects.toEqual(errorWithoutMessage);
    });
  });
});
