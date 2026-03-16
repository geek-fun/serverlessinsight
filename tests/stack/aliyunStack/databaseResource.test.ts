import { ProviderEnum } from '../../../src/common';
import { deleteDatabaseResource } from '../../../src/stack/aliyunStack/databaseResource';
import { Context, CURRENT_STATE_VERSION, StateFile } from '../../../src/types';

const mockEsOperations = {
  createApp: jest.fn(),
  getApp: jest.fn(),
  updateApp: jest.fn(),
  deleteApp: jest.fn(),
};

const mockRdsOperations = {
  createDatabase: jest.fn(),
  getDatabase: jest.fn(),
  updateDatabase: jest.fn(),
  deleteDatabase: jest.fn(),
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
};

jest.mock('../../../src/common/aliyunClient', () => ({
  createAliyunClient: () => ({
    es: mockEsOperations,
    rds: mockRdsOperations,
  }),
}));

jest.mock('../../../src/common/stateManager', () => ({
  ...jest.requireActual('../../../src/common/stateManager'),
  setResource: (...args: unknown[]) => mockedStateManager.setResource(...args),
  removeResource: (...args: unknown[]) => mockedStateManager.removeResource(...args),
}));

jest.mock('../../../src/common/logger', () => ({
  logger: {
    info: (...args: unknown[]) => mockedLogger.info(...args),
    error: (...args: unknown[]) => mockedLogger.error(...args),
    warn: (...args: unknown[]) => mockedLogger.warn(...args),
  },
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
        expect.stringContaining('Database resource es-app-test123 not found in provider'),
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
        expect.stringContaining('Database resource rds-db-test123 not found in provider'),
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        deleteDatabaseResource(mockContext, databaseId, 'UNKNOWN' as any, logicalId, initialState),
      ).rejects.toThrow('Unsupported resource type: UNKNOWN');
    });
  });
});
