import { ProviderEnum } from '../../../../src/common';
import { deleteTableResource } from '../../../../src/stack/aliyunStack/tablestoreResource';
import { Context, CURRENT_STATE_VERSION, StateFile } from '../../../../src/types';

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
  });
});
