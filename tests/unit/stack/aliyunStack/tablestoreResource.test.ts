import { ProviderEnum } from '../../../../src/common';
import {
  createTableResource,
  updateTableResource,
  readTableResource,
  deleteTableResource,
} from '../../../../src/stack/aliyunStack/tablestoreResource';
import {
  Context,
  CURRENT_STATE_VERSION,
  StateFile,
  TableDomain,
  TableEnum,
  KeyTypeEnum,
  AttributeTypeEnum,
} from '../../../../src/types';

const mockTablestoreClient = {
  createTable: jest.fn(),
  getTable: jest.fn(),
  waitForTableReady: jest.fn(),
  updateTable: jest.fn(),
  deleteTable: jest.fn(),
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

jest.mock('../../../../src/common/aliyunClient', () => ({
  createAliyunClient: () => ({
    tablestore: jest.fn().mockReturnValue(mockTablestoreClient),
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
  },
}));

describe('TablestoreResource', () => {
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

  const createTestTable = (key: string = 'test_table'): TableDomain => ({
    key,
    collection: 'test-instance',
    name: 'test-table',
    type: TableEnum.TABLE_STORE_H,
    network: {
      type: 'PUBLIC',
      ingressRules: [],
    },
    keySchema: [
      {
        name: 'id',
        type: KeyTypeEnum.HASH,
      },
    ],
    attributes: [
      {
        name: 'id',
        type: AttributeTypeEnum.STRING,
      },
    ],
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('deleteTableResource', () => {
    it('should delete table and remove from state', async () => {
      const instanceName = 'test-instance';
      const tableName = 'test-table';
      const logicalId = 'tables.test_table';
      const stateWithTable: StateFile = {
        ...initialState,
        resources: {
          [logicalId]: {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: {},
            instances: [],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      mockTablestoreClient.deleteTable.mockResolvedValue(undefined);
      mockedStateManager.removeResource.mockReturnValue(initialState);

      const result = await deleteTableResource(
        mockContext,
        instanceName,
        tableName,
        logicalId,
        stateWithTable,
      );

      expect(mockTablestoreClient.deleteTable).toHaveBeenCalledWith(tableName);
      expect(mockedStateManager.removeResource).toHaveBeenCalledWith(stateWithTable, logicalId);
      expect(result).toEqual(initialState);
    });

    it('should handle OTSObjectNotExist gracefully and remove state', async () => {
      const instanceName = 'test-instance';
      const tableName = 'test-table';
      const logicalId = 'tables.test_table';
      const stateWithTable: StateFile = {
        ...initialState,
        resources: {
          [logicalId]: {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: {},
            instances: [],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      const notFoundError = new Error('OTSObjectNotExist: table not exist');
      mockTablestoreClient.deleteTable.mockRejectedValue(notFoundError);
      mockedStateManager.removeResource.mockReturnValue(initialState);

      const result = await deleteTableResource(
        mockContext,
        instanceName,
        tableName,
        logicalId,
        stateWithTable,
      );

      expect(mockTablestoreClient.deleteTable).toHaveBeenCalledWith(tableName);
      expect(mockedLogger.warn).toHaveBeenCalledWith(
        expect.stringContaining('Table test-table in instance test-instance not found in provider'),
      );
      expect(mockedStateManager.removeResource).toHaveBeenCalledWith(stateWithTable, logicalId);
      expect(result).toEqual(initialState);
    });

    it('should handle "does not exist" message gracefully', async () => {
      const instanceName = 'test-instance';
      const tableName = 'test-table';
      const logicalId = 'tables.test_table';
      const stateWithTable: StateFile = {
        ...initialState,
        resources: {
          [logicalId]: {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: {},
            instances: [],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      const notFoundError = new Error('Table does not exist');
      mockTablestoreClient.deleteTable.mockRejectedValue(notFoundError);
      mockedStateManager.removeResource.mockReturnValue(initialState);

      const result = await deleteTableResource(
        mockContext,
        instanceName,
        tableName,
        logicalId,
        stateWithTable,
      );

      expect(mockTablestoreClient.deleteTable).toHaveBeenCalledWith(tableName);
      expect(mockedLogger.warn).toHaveBeenCalledWith(
        expect.stringContaining('Table test-table in instance test-instance not found in provider'),
      );
      expect(mockedStateManager.removeResource).toHaveBeenCalledWith(stateWithTable, logicalId);
      expect(result).toEqual(initialState);
    });

    it('should rethrow unexpected errors from deleteTable', async () => {
      const instanceName = 'test-instance';
      const tableName = 'test-table';
      const logicalId = 'tables.test_table';
      const error = new Error('Delete failed');

      mockTablestoreClient.deleteTable.mockRejectedValue(error);

      await expect(
        deleteTableResource(mockContext, instanceName, tableName, logicalId, initialState),
      ).rejects.toThrow('Delete failed');
    });

    it('should handle error without message gracefully', async () => {
      const instanceName = 'test-instance';
      const tableName = 'test-table';
      const logicalId = 'tables.test_table';
      const errorWithoutMessage = {} as unknown as Error;

      mockTablestoreClient.deleteTable.mockRejectedValue(errorWithoutMessage);

      await expect(
        deleteTableResource(mockContext, instanceName, tableName, logicalId, initialState),
      ).rejects.toEqual(errorWithoutMessage);
    });
  });

  describe('createTableResource', () => {
    it('should create table and set resource in state', async () => {
      const table = createTestTable('test_table');
      const tableInfo = {
        tableName: 'test-table',
        primaryKey: [{ name: 'id', type: 'STRING' }],
        reservedThroughputDetails: {
          capacityUnit: { read: 0, write: 0 },
          lastIncreaseTime: null,
          lastDecreaseTime: null,
        },
        tableOptions: {
          timeToLive: -1,
          maxVersions: 1,
          maxTimeDeviation: null,
          allowUpdate: null,
        },
        streamDetails: null,
      };

      const expectedState = {
        ...initialState,
        resources: {
          'tables.test_table': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: {},
            instances: [],
            lastUpdated: expect.any(String),
          },
        },
      };

      mockTablestoreClient.createTable.mockResolvedValue(undefined);
      mockTablestoreClient.waitForTableReady.mockResolvedValue(undefined);
      mockTablestoreClient.getTable.mockResolvedValue(tableInfo);
      mockedStateManager.setResource.mockReturnValue(expectedState);

      const result = await createTableResource(mockContext, table, initialState);

      expect(mockTablestoreClient.createTable).toHaveBeenCalledWith(
        expect.objectContaining({
          tableName: 'test-table',
          primaryKey: expect.any(Array),
        }),
      );
      expect(mockTablestoreClient.waitForTableReady).toHaveBeenCalledWith('test-table');
      expect(mockTablestoreClient.getTable).toHaveBeenCalledWith('test-table');
      expect(mockedStateManager.setResource).toHaveBeenCalledWith(
        initialState,
        'tables.test_table',
        expect.objectContaining({
          mode: 'managed',
          region: 'cn-hangzhou',
        }),
      );
      expect(result).toEqual(expectedState);
    });

    it('should throw error when getTable returns null after create', async () => {
      const table = createTestTable('test_table');

      mockTablestoreClient.createTable.mockResolvedValue(undefined);
      mockTablestoreClient.waitForTableReady.mockResolvedValue(undefined);
      mockTablestoreClient.getTable.mockResolvedValue(null);

      await expect(createTableResource(mockContext, table, initialState)).rejects.toThrow(
        'Failed to refresh state for table: test-table',
      );
    });

    it('should handle table with null/undefined optional fields', async () => {
      const table = createTestTable('test_table');
      const tableInfo = {
        tableName: 'test-table',
        primaryKey: null,
        reservedThroughputDetails: {
          capacityUnit: { read: 0, write: 0 },
          lastIncreaseTime: undefined,
          lastDecreaseTime: null,
        },
        tableOptions: {
          timeToLive: null,
          maxVersions: undefined,
          maxTimeDeviation: null,
          allowUpdate: undefined,
        },
        streamDetails: {
          enableStream: null,
          streamId: undefined,
          expirationTime: null,
          lastEnableTime: undefined,
        },
      };

      const expectedState = { ...initialState, updated: true };
      mockTablestoreClient.createTable.mockResolvedValue(undefined);
      mockTablestoreClient.waitForTableReady.mockResolvedValue(undefined);
      mockTablestoreClient.getTable.mockResolvedValue(tableInfo);
      mockedStateManager.setResource.mockReturnValue(expectedState);

      const result = await createTableResource(mockContext, table, initialState);

      expect(result).toEqual(expectedState);
    });

    it('should handle table with undefined reservedThroughputDetails', async () => {
      const table = createTestTable('test_table');
      const tableInfo = {
        tableName: 'test-table',
        primaryKey: [{ name: 'id', type: 'STRING' }],
        reservedThroughputDetails: undefined,
        tableOptions: undefined,
        streamDetails: undefined,
      };

      const expectedState = { ...initialState, updated: true };
      mockTablestoreClient.createTable.mockResolvedValue(undefined);
      mockTablestoreClient.waitForTableReady.mockResolvedValue(undefined);
      mockTablestoreClient.getTable.mockResolvedValue(tableInfo);
      mockedStateManager.setResource.mockReturnValue(expectedState);

      const result = await createTableResource(mockContext, table, initialState);

      expect(result).toEqual(expectedState);
    });
  });

  describe('updateTableResource', () => {
    it('should update table and refresh state', async () => {
      const table = createTestTable('test_table');
      const tableInfo = {
        tableName: 'test-table',
        primaryKey: [{ name: 'id', type: 'STRING' }],
        reservedThroughputDetails: {
          capacityUnit: { read: 0, write: 0 },
          lastIncreaseTime: null,
          lastDecreaseTime: null,
        },
        tableOptions: {
          timeToLive: -1,
          maxVersions: 1,
          maxTimeDeviation: null,
          allowUpdate: null,
        },
        streamDetails: null,
      };

      const expectedState = {
        ...initialState,
        resources: {
          'tables.test_table': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: {},
            instances: [],
            lastUpdated: expect.any(String),
          },
        },
      };

      mockTablestoreClient.updateTable.mockResolvedValue(undefined);
      mockTablestoreClient.waitForTableReady.mockResolvedValue(undefined);
      mockTablestoreClient.getTable.mockResolvedValue(tableInfo);
      mockedStateManager.setResource.mockReturnValue(expectedState);

      const result = await updateTableResource(mockContext, table, initialState);

      expect(mockTablestoreClient.updateTable).toHaveBeenCalledWith(
        expect.objectContaining({
          tableName: 'test-table',
          primaryKey: expect.any(Array),
        }),
      );
      expect(mockTablestoreClient.waitForTableReady).toHaveBeenCalledWith('test-table');
      expect(mockTablestoreClient.getTable).toHaveBeenCalledWith('test-table');
      expect(mockedStateManager.setResource).toHaveBeenCalledWith(
        initialState,
        'tables.test_table',
        expect.objectContaining({
          mode: 'managed',
          region: 'cn-hangzhou',
        }),
      );
      expect(result).toEqual(expectedState);
    });

    it('should throw error when getTable returns null after update', async () => {
      const table = createTestTable('test_table');

      mockTablestoreClient.updateTable.mockResolvedValue(undefined);
      mockTablestoreClient.waitForTableReady.mockResolvedValue(undefined);
      mockTablestoreClient.getTable.mockResolvedValue(null);

      await expect(updateTableResource(mockContext, table, initialState)).rejects.toThrow(
        'Failed to refresh state for table: test-table',
      );
    });
  });

  describe('readTableResource', () => {
    it('should call getTable and return result', async () => {
      const instanceName = 'test-instance';
      const tableName = 'test-table';
      const tableInfo = {
        tableName: 'test-table',
        primaryKey: [{ name: 'id', type: 'STRING' }],
        reservedThroughputDetails: {
          capacityUnit: { read: 0, write: 0 },
        },
      };

      mockTablestoreClient.getTable.mockResolvedValue(tableInfo);

      const result = await readTableResource(mockContext, instanceName, tableName);

      expect(mockTablestoreClient.getTable).toHaveBeenCalledWith(tableName);
      expect(result).toEqual(tableInfo);
    });
  });
});
