import {
  createTablestoreOperations,
  TableStoreTableConfig,
} from '../../../../src/common/aliyunClient/tablestoreOperations';

const mockCreateTable = jest.fn();
const mockDescribeTable = jest.fn();
const mockUpdateTable = jest.fn();
const mockDeleteTable = jest.fn();

const mockTableStoreClient = {
  createTable: mockCreateTable,
  describeTable: mockDescribeTable,
  updateTable: mockUpdateTable,
  deleteTable: mockDeleteTable,
};

jest.mock('tablestore', () => ({
  Client: jest.fn(() => mockTableStoreClient),
}));

jest.mock('../../../../src/common/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

jest.mock('../../../../src/lang', () => ({
  lang: {
    __: (key: string) => key,
  },
}));

describe('tablestoreOperations', () => {
  let operations: ReturnType<typeof createTablestoreOperations>;
  const endpoint = 'https://test-instance.cn-hangzhou.ots.aliyuncs.com';
  const instanceName = 'test-instance';
  const context = {
    accessKeyId: 'test-key-id',
    accessKeySecret: 'test-key-secret',
    securityToken: 'test-token',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    operations = createTablestoreOperations(endpoint, instanceName, context);
  });

  describe('createTable', () => {
    const tableConfig: TableStoreTableConfig = {
      tableName: 'test-table',
      primaryKey: [
        { name: 'id', type: 'INTEGER' },
        { name: 'timestamp', type: 'STRING' },
      ],
      reservedThroughput: {
        capacityUnit: {
          read: 100,
          write: 50,
        },
      },
      tableOptions: {
        timeToLive: 86400,
        maxVersions: 3,
      },
    };

    it('should create table successfully', async () => {
      mockCreateTable.mockImplementation((_params, callback) => {
        callback(null);
      });

      await operations.createTable(tableConfig);

      expect(mockCreateTable).toHaveBeenCalledWith(
        expect.objectContaining({
          tableMeta: {
            tableName: 'test-table',
            primaryKey: [
              { name: 'id', type: 'INTEGER' },
              { name: 'timestamp', type: 'STRING' },
            ],
          },
          reservedThroughput: {
            capacityUnit: {
              read: 100,
              write: 50,
            },
          },
          tableOptions: {
            timeToLive: 86400,
            maxVersions: 3,
          },
        }),
        expect.any(Function),
      );
    });

    it('should use default values if not provided', async () => {
      mockCreateTable.mockImplementation((_params, callback) => {
        callback(null);
      });

      const minimalConfig: TableStoreTableConfig = {
        tableName: 'test-table',
        primaryKey: [{ name: 'id', type: 'INTEGER' }],
      };

      await operations.createTable(minimalConfig);

      expect(mockCreateTable).toHaveBeenCalledWith(
        expect.objectContaining({
          reservedThroughput: {
            capacityUnit: {
              read: 0,
              write: 0,
            },
          },
          tableOptions: {
            timeToLive: -1,
            maxVersions: 1,
          },
        }),
        expect.any(Function),
      );
    });

    it('should reject when create table fails', async () => {
      const error = new Error('OTSParameterInvalid');
      mockCreateTable.mockImplementation((_params, callback) => {
        callback(error);
      });

      await expect(operations.createTable(tableConfig)).rejects.toThrow('OTSParameterInvalid');
    });
  });

  describe('getTable', () => {
    it('should return table info when table exists', async () => {
      const mockTableData = {
        tableMeta: {
          tableName: 'test-table',
          primaryKey: [
            { name: 'id', type: 'INTEGER' },
            { name: 'timestamp', type: 'STRING' },
          ],
        },
        reservedThroughputDetails: {
          capacityUnit: { read: 100, write: 50 },
          lastIncreaseTime: '2024-01-01',
          lastDecreaseTime: '2024-01-02',
        },
        tableOptions: {
          timeToLive: 86400,
          maxVersions: 3,
          maxTimeDeviation: 86400,
          allowUpdate: true,
        },
        streamDetails: {
          enableStream: true,
          streamId: 'stream-123',
          expirationTime: 3600,
          lastEnableTime: '2024-01-01',
        },
      };

      mockDescribeTable.mockImplementation((_params, callback) => {
        callback(null, mockTableData);
      });

      const result = await operations.getTable('test-table');

      expect(result).toEqual({
        tableName: 'test-table',
        primaryKey: [
          { name: 'id', type: 'INTEGER' },
          { name: 'timestamp', type: 'STRING' },
        ],
        reservedThroughputDetails: {
          capacityUnit: { read: 100, write: 50 },
          lastIncreaseTime: '2024-01-01',
          lastDecreaseTime: '2024-01-02',
        },
        tableOptions: {
          timeToLive: 86400,
          maxVersions: 3,
          maxTimeDeviation: 86400,
          allowUpdate: true,
        },
        streamDetails: {
          enableStream: true,
          streamId: 'stream-123',
          expirationTime: 3600,
          lastEnableTime: '2024-01-01',
        },
      });
    });

    it('should return null when table does not exist (OTSObjectNotExist error)', async () => {
      const error = new Error('OTSObjectNotExist: Requested table does not exist');
      mockDescribeTable.mockImplementation((_params, callback) => {
        callback(error);
      });

      const result = await operations.getTable('non-existent-table');

      expect(result).toBeNull();
    });

    it('should return null when table does not exist (does not exist error)', async () => {
      const error = new Error('Table does not exist');
      mockDescribeTable.mockImplementation((_params, callback) => {
        callback(error);
      });

      const result = await operations.getTable('non-existent-table');

      expect(result).toBeNull();
    });

    it('should return null when tableMeta is missing', async () => {
      mockDescribeTable.mockImplementation((_params, callback) => {
        callback(null, {});
      });

      const result = await operations.getTable('test-table');

      expect(result).toBeNull();
    });

    it('should reject on other errors', async () => {
      const error = new Error('OTSInternalServerError');
      mockDescribeTable.mockImplementation((_params, callback) => {
        callback(error);
      });

      await expect(operations.getTable('test-table')).rejects.toThrow('OTSInternalServerError');
    });
  });

  describe('updateTable', () => {
    const updateConfig: TableStoreTableConfig = {
      tableName: 'test-table',
      primaryKey: [{ name: 'id', type: 'INTEGER' }],
      reservedThroughput: {
        capacityUnit: {
          read: 200,
          write: 100,
        },
      },
      tableOptions: {
        timeToLive: 172800,
        maxVersions: 5,
      },
    };

    it('should update table successfully', async () => {
      mockUpdateTable.mockImplementation((_params, callback) => {
        callback(null);
      });

      await operations.updateTable(updateConfig);

      expect(mockUpdateTable).toHaveBeenCalledWith(
        expect.objectContaining({
          tableName: 'test-table',
          reservedThroughput: {
            capacityUnit: {
              read: 200,
              write: 100,
            },
          },
          tableOptions: {
            timeToLive: 172800,
            maxVersions: 5,
          },
        }),
        expect.any(Function),
      );
    });

    it('should use default reserved throughput if not provided', async () => {
      mockUpdateTable.mockImplementation((_params, callback) => {
        callback(null);
      });

      const minimalConfig: TableStoreTableConfig = {
        tableName: 'test-table',
        primaryKey: [{ name: 'id', type: 'INTEGER' }],
      };

      await operations.updateTable(minimalConfig);

      expect(mockUpdateTable).toHaveBeenCalledWith(
        expect.objectContaining({
          reservedThroughput: {
            capacityUnit: {
              read: 0,
              write: 0,
            },
          },
        }),
        expect.any(Function),
      );
    });

    it('should reject when update fails', async () => {
      const error = new Error('OTSTableNotReady');
      mockUpdateTable.mockImplementation((_params, callback) => {
        callback(error);
      });

      await expect(operations.updateTable(updateConfig)).rejects.toThrow('OTSTableNotReady');
    });
  });

  describe('deleteTable', () => {
    it('should delete table successfully', async () => {
      mockDeleteTable.mockImplementation((_params, callback) => {
        callback(null);
      });

      await operations.deleteTable('test-table');

      expect(mockDeleteTable).toHaveBeenCalledWith(
        { tableName: 'test-table' },
        expect.any(Function),
      );
    });

    it('should succeed if table does not exist (OTSObjectNotExist error)', async () => {
      const error = new Error('OTSObjectNotExist: Requested table does not exist');
      mockDeleteTable.mockImplementation((_params, callback) => {
        callback(error);
      });

      await operations.deleteTable('non-existent-table');

      expect(mockDeleteTable).toHaveBeenCalled();
    });

    it('should succeed if table does not exist (does not exist error)', async () => {
      const error = new Error('Table does not exist');
      mockDeleteTable.mockImplementation((_params, callback) => {
        callback(error);
      });

      await operations.deleteTable('non-existent-table');

      expect(mockDeleteTable).toHaveBeenCalled();
    });

    it('should reject on other errors', async () => {
      const error = new Error('OTSInternalServerError');
      mockDeleteTable.mockImplementation((_params, callback) => {
        callback(error);
      });

      await expect(operations.deleteTable('test-table')).rejects.toThrow('OTSInternalServerError');
    });
  });

  describe('waitForTableReady', () => {
    it('should return when table becomes ready', async () => {
      mockDescribeTable.mockImplementation((_params, callback) => {
        callback(null, {
          tableMeta: {
            tableName: 'test-table',
            primaryKey: [{ name: 'id', type: 'INTEGER' }],
          },
        });
      });

      await operations.waitForTableReady('test-table');

      expect(mockDescribeTable).toHaveBeenCalledWith(
        { tableName: 'test-table' },
        expect.any(Function),
      );
    });
  });
});
