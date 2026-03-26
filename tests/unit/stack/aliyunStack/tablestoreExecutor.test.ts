import { ProviderEnum } from '../../../../src/common';
import { executeTablePlan } from '../../../../src/stack/aliyunStack/tablestoreExecutor';
import {
  Context,
  CURRENT_STATE_VERSION,
  StateFile,
  TableDomain,
  TableEnum,
  KeyTypeEnum,
  AttributeTypeEnum,
  Plan,
  PlanAction,
} from '../../../../src/types';

const mockedLogger = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
};

const mockedTableResource = {
  createTableResource: jest.fn(),
  updateTableResource: jest.fn(),
  deleteTableResource: jest.fn(),
};

const mockedStateManager = {
  getResource: jest.fn(),
};

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
    __: (key: string) => key,
  },
}));

jest.mock('../../../../src/stack/aliyunStack/tablestoreResource', () => ({
  createTableResource: (...args: unknown[]) => mockedTableResource.createTableResource(...args),
  updateTableResource: (...args: unknown[]) => mockedTableResource.updateTableResource(...args),
  deleteTableResource: (...args: unknown[]) => mockedTableResource.deleteTableResource(...args),
}));

jest.mock('../../../../src/common/stateManager', () => ({
  getResource: (...args: unknown[]) => mockedStateManager.getResource(...args),
}));

const initialState: StateFile = {
  version: CURRENT_STATE_VERSION,
  provider: 'aliyun',
  app: 'test-app',
  service: 'test-service',
  stages: {},
  resources: {},
};

describe('TablestoreExecutor', () => {
  const mockContext: Context = {
    stage: 'dev',
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
    mockedStateManager.getResource.mockReturnValue(null);
    mockedTableResource.createTableResource.mockImplementation((ctx, table, state) => state);
    mockedTableResource.updateTableResource.mockImplementation((ctx, table, state) => state);
    mockedTableResource.deleteTableResource.mockImplementation(
      (ctx, instance, table, lid, state) => state,
    );
  });

  describe('executeTablePlan', () => {
    it('should handle noop action and return unchanged state', async () => {
      const table = createTestTable('table1');
      const plan: Plan = {
        items: [
          {
            logicalId: 'tables.table1',
            action: 'noop',
            resourceType: 'table',
          },
        ],
      };

      const result = await executeTablePlan(mockContext, plan, [table], initialState);

      expect(mockedLogger.info).toHaveBeenCalledWith(
        expect.stringContaining('NO_CHANGESForResource'),
      );
      expect(result.state).toEqual(initialState);
      expect(result.partialFailure).toBeUndefined();
    });

    it('should execute create action successfully', async () => {
      const table = createTestTable('table1');
      const plan: Plan = {
        items: [
          {
            logicalId: 'tables.table1',
            action: 'create',
            resourceType: 'table',
          },
        ],
      };

      const newState = { ...initialState, resources: { 'tables.table1': {} } };
      mockedTableResource.createTableResource.mockResolvedValue(newState);

      const result = await executeTablePlan(mockContext, plan, [table], initialState);

      expect(mockedTableResource.createTableResource).toHaveBeenCalledWith(
        mockContext,
        table,
        initialState,
      );
      expect(result.state).toEqual(newState);
      expect(result.partialFailure).toBeUndefined();
    });

    it('should execute update action successfully', async () => {
      const table = createTestTable('table1');
      const plan: Plan = {
        items: [
          {
            logicalId: 'tables.table1',
            action: 'update',
            resourceType: 'table',
          },
        ],
      };

      const newState = { ...initialState, resources: { 'tables.table1': {} } };
      mockedTableResource.updateTableResource.mockResolvedValue(newState);

      const result = await executeTablePlan(mockContext, plan, [table], initialState);

      expect(mockedTableResource.updateTableResource).toHaveBeenCalledWith(
        mockContext,
        table,
        initialState,
      );
      expect(result.state).toEqual(newState);
      expect(result.partialFailure).toBeUndefined();
    });

    it('should execute delete action successfully', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'tables.table1',
            action: 'delete',
            resourceType: 'table',
          },
        ],
      };

      const existingState = {
        definition: {
          instanceName: 'test-instance',
          tableName: 'test-table',
        },
        instances: [{ id: 'test-instance/test-table' }],
      };

      const newState = { ...initialState };
      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedTableResource.deleteTableResource.mockResolvedValue(newState);

      const result = await executeTablePlan(mockContext, plan, undefined, initialState);

      expect(mockedTableResource.deleteTableResource).toHaveBeenCalledWith(
        mockContext,
        'test-instance',
        'test-table',
        'tables.table1',
        initialState,
      );
      expect(result.state).toEqual(newState);
      expect(result.partialFailure).toBeUndefined();
    });

    it('should skip delete action when state not found', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'tables.table1',
            action: 'delete',
            resourceType: 'table',
          },
        ],
      };

      mockedStateManager.getResource.mockReturnValue(null);

      const result = await executeTablePlan(mockContext, plan, undefined, initialState);

      expect(mockedLogger.warn).toHaveBeenCalledWith(
        expect.stringContaining('STATE_NOT_FOUND_SKIPPING'),
      );
      expect(mockedTableResource.deleteTableResource).not.toHaveBeenCalled();
      expect(result.state).toEqual(initialState);
      expect(result.partialFailure).toBeUndefined();
    });

    it('should throw error when table not found in map for create action', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'tables.missing_table',
            action: 'create',
            resourceType: 'table',
          },
        ],
      };

      const result = await executeTablePlan(mockContext, plan, [], initialState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error.message).toContain('Table not found for logical ID');
      expect(result.partialFailure?.failedItem.logicalId).toBe('tables.missing_table');
    });

    it('should throw error when table not found in map for update action', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'tables.missing_table',
            action: 'update',
            resourceType: 'table',
          },
        ],
      };

      const result = await executeTablePlan(mockContext, plan, [], initialState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error.message).toContain('Table not found for logical ID');
      expect(result.partialFailure?.failedItem.logicalId).toBe('tables.missing_table');
    });

    it('should handle unknown action with warning', async () => {
      const table = createTestTable('table1');
      const plan: Plan = {
        items: [
          {
            logicalId: 'tables.table1',
            action: 'unknown' as unknown as PlanAction,
            resourceType: 'table',
          },
        ],
      };

      const result = await executeTablePlan(mockContext, plan, [table], initialState);

      expect(mockedLogger.warn).toHaveBeenCalledWith(
        expect.stringContaining('UNKNOWN_ACTION_FOR_RESOURCE'),
      );
      expect(result.state).toEqual(initialState);
      expect(result.partialFailure).toBeUndefined();
    });

    it('should return partial failure when create action fails', async () => {
      const table = createTestTable('table1');
      const plan: Plan = {
        items: [
          {
            logicalId: 'tables.table1',
            action: 'create',
            resourceType: 'table',
          },
        ],
      };

      const error = new Error('Create table failed');
      mockedTableResource.createTableResource.mockRejectedValue(error);

      const result = await executeTablePlan(mockContext, plan, [table], initialState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error).toBe(error);
      expect(result.partialFailure?.failedItem.logicalId).toBe('tables.table1');
      expect(result.partialFailure?.successfulItems).toEqual([]);
    });

    it('should return partial failure when update action fails', async () => {
      const table = createTestTable('table1');
      const plan: Plan = {
        items: [
          {
            logicalId: 'tables.table1',
            action: 'update',
            resourceType: 'table',
          },
        ],
      };

      const error = new Error('Update table failed');
      mockedTableResource.updateTableResource.mockRejectedValue(error);

      const result = await executeTablePlan(mockContext, plan, [table], initialState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error).toBe(error);
      expect(result.partialFailure?.failedItem.logicalId).toBe('tables.table1');
    });

    it('should return partial failure when delete action fails', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'tables.table1',
            action: 'delete',
            resourceType: 'table',
          },
        ],
      };

      const existingState = {
        definition: {
          instanceName: 'test-instance',
          tableName: 'test-table',
        },
        instances: [{ id: 'test-instance/test-table' }],
      };

      const error = new Error('Delete table failed');
      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedTableResource.deleteTableResource.mockRejectedValue(error);

      const result = await executeTablePlan(mockContext, plan, undefined, initialState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error).toBe(error);
      expect(result.partialFailure?.failedItem.logicalId).toBe('tables.table1');
    });

    it('should call onStateChange callback after successful action', async () => {
      const table = createTestTable('table1');
      const plan: Plan = {
        items: [
          {
            logicalId: 'tables.table1',
            action: 'create',
            resourceType: 'table',
          },
        ],
      };

      const onStateChange = jest.fn();
      const newState = { ...initialState, resources: { 'tables.table1': {} } };
      mockedTableResource.createTableResource.mockResolvedValue(newState);

      await executeTablePlan(mockContext, plan, [table], initialState, onStateChange);

      expect(onStateChange).toHaveBeenCalledWith(newState);
      expect(mockedLogger.debug).toHaveBeenCalledWith(
        expect.stringContaining('STATE_PERSISTED_AFTER_OPERATION'),
      );
    });

    it('should handle multiple tables in plan', async () => {
      const table1 = createTestTable('table1');
      const table2 = createTestTable('table2');

      const plan: Plan = {
        items: [
          {
            logicalId: 'tables.table1',
            action: 'create',
            resourceType: 'table',
          },
          {
            logicalId: 'tables.table2',
            action: 'create',
            resourceType: 'table',
          },
        ],
      };

      const result = await executeTablePlan(mockContext, plan, [table1, table2], initialState);

      expect(mockedTableResource.createTableResource).toHaveBeenCalledTimes(2);
      expect(result.partialFailure).toBeUndefined();
    });

    it('should stop execution on first failure in multi-item plan', async () => {
      const table1 = createTestTable('table1');
      const table2 = createTestTable('table2');

      const plan: Plan = {
        items: [
          {
            logicalId: 'tables.table1',
            action: 'create',
            resourceType: 'table',
          },
          {
            logicalId: 'tables.table2',
            action: 'create',
            resourceType: 'table',
          },
        ],
      };

      mockedTableResource.createTableResource.mockImplementation((ctx, table, state) => {
        if (table.key === 'table1') {
          throw new Error('Table1 creation failed');
        }
        return state;
      });

      const result = await executeTablePlan(mockContext, plan, [table1, table2], initialState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.failedItem.logicalId).toBe('tables.table1');
      expect(mockedTableResource.createTableResource).toHaveBeenCalledTimes(1);
    });

    it('should handle non-Error thrown values as errors', async () => {
      const table = createTestTable('table1');
      const plan: Plan = {
        items: [
          {
            logicalId: 'tables.table1',
            action: 'create',
            resourceType: 'table',
          },
        ],
      };

      mockedTableResource.createTableResource.mockRejectedValue('String error');

      const result = await executeTablePlan(mockContext, plan, [table], initialState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error).toBeInstanceOf(Error);
      expect(result.partialFailure?.error.message).toBe('String error');
    });
  });
});
