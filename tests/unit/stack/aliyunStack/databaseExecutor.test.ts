import { ProviderEnum } from '../../../../src/common';
import { executeDatabasePlan } from '../../../../src/stack/aliyunStack/databaseExecutor';
import {
  Context,
  CURRENT_STATE_VERSION,
  StateFile,
  DatabaseDomain,
  DatabaseEnum,
  DatabaseVersionEnum,
  Plan,
} from '../../../../src/types';

const mockedLogger = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};

const _mockedLang = {
  __: jest.fn((key: string) => key),
};

const mockedDatabaseResource = {
  createDatabaseResource: jest.fn(),
  updateDatabaseResource: jest.fn(),
  deleteDatabaseResource: jest.fn(),
};

const mockedStateManager = {
  getResource: jest.fn(),
};

jest.mock('../../../../src/common/logger', () => ({
  logger: {
    info: (...args: unknown[]) => mockedLogger.info(...args),
    error: (...args: unknown[]) => mockedLogger.error(...args),
    warn: (...args: unknown[]) => mockedLogger.warn(...args),
  },
}));

jest.mock('../../../../src/lang', () => ({
  lang: {
    __: (key: string) => key,
  },
}));

jest.mock('../../../../src/stack/aliyunStack/databaseResource', () => ({
  createDatabaseResource: (...args: unknown[]) =>
    mockedDatabaseResource.createDatabaseResource(...args),
  updateDatabaseResource: (...args: unknown[]) =>
    mockedDatabaseResource.updateDatabaseResource(...args),
  deleteDatabaseResource: (...args: unknown[]) =>
    mockedDatabaseResource.deleteDatabaseResource(...args),
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

describe('DatabaseExecutor', () => {
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

  const createTestDatabase = (
    key: string = 'test_db',
    type: DatabaseEnum = DatabaseEnum.RDS_MYSQL_SERVERLESS,
  ): DatabaseDomain => ({
    key,
    name: `${key}-name`,
    type,
    version: 'MYSQL_8.0' as DatabaseVersionEnum,
    security: { basicAuth: { password: 'test-pass' } },
    network: { type: 'PUBLIC', ingressRules: [] },
    cu: { min: 0, max: 1 },
    storage: { min: 100 },
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockedStateManager.getResource.mockReturnValue(null);
    mockedDatabaseResource.createDatabaseResource.mockImplementation((ctx, db, state) => state);
    mockedDatabaseResource.updateDatabaseResource.mockImplementation(
      (ctx, db, id, type, state) => state,
    );
    mockedDatabaseResource.deleteDatabaseResource.mockImplementation(
      (ctx, id, type, lid, state) => state,
    );
  });

  describe('executeDatabasePlan', () => {
    it('should execute create action', async () => {
      const database = createTestDatabase('db1');
      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.db1',
            action: 'create',
            resourceType: 'ALIYUN_RDS_SERVERLESS',
          },
        ],
      };

      const result = await executeDatabasePlan(mockContext, plan, [database], initialState);

      expect(mockedDatabaseResource.createDatabaseResource).toHaveBeenCalledWith(
        mockContext,
        database,
        initialState,
      );
      expect(result.state).toBeDefined();
      expect(result.partialFailure).toBeUndefined();
    });

    it('should execute update action', async () => {
      const database = createTestDatabase('db1');
      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.db1',
            action: 'update',
            resourceType: 'ALIYUN_RDS_SERVERLESS',
          },
        ],
      };

      const existingState = {
        metadata: { instanceId: 'db-123', resourceType: 'ALIYUN_RDS_SERVERLESS' },
        instances: [{ id: 'db-123' }],
      };

      mockedStateManager.getResource.mockReturnValue(existingState);

      const result = await executeDatabasePlan(mockContext, plan, [database], initialState);

      expect(mockedDatabaseResource.updateDatabaseResource).toHaveBeenCalled();
      expect(result.partialFailure).toBeUndefined();
    });

    it('should execute delete action', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.db1',
            action: 'delete',
            resourceType: 'ALIYUN_RDS_SERVERLESS',
          },
        ],
      };

      const existingState = {
        metadata: { instanceId: 'db-123', resourceType: 'ALIYUN_RDS_SERVERLESS' },
        instances: [{ id: 'db-123' }],
      };

      mockedStateManager.getResource.mockReturnValue(existingState);

      const result = await executeDatabasePlan(mockContext, plan, undefined, initialState);

      expect(mockedDatabaseResource.deleteDatabaseResource).toHaveBeenCalled();
      expect(result.partialFailure).toBeUndefined();
    });

    it('should skip noop action', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.db1',
            action: 'noop',
            resourceType: 'ALIYUN_RDS_SERVERLESS',
          },
        ],
      };

      const result = await executeDatabasePlan(mockContext, plan, undefined, initialState);

      expect(mockedLogger.info).toHaveBeenCalledWith(
        expect.stringContaining('NO_CHANGESForResource'),
      );
      expect(result.partialFailure).toBeUndefined();
    });

    it('should handle create action failure with partial failure result', async () => {
      const database = createTestDatabase('db1');
      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.db1',
            action: 'create',
            resourceType: 'ALIYUN_RDS_SERVERLESS',
          },
        ],
      };

      const error = new Error('Create failed');
      mockedDatabaseResource.createDatabaseResource.mockRejectedValue(error);

      const result = await executeDatabasePlan(mockContext, plan, [database], initialState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error).toBe(error);
      expect(result.partialFailure?.failedItem.logicalId).toBe('databases.db1');
    });

    it('should handle update action failure with partial failure result', async () => {
      const database = createTestDatabase('db1');
      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.db1',
            action: 'update',
            resourceType: 'ALIYUN_RDS_SERVERLESS',
          },
        ],
      };

      const existingState = {
        metadata: { instanceId: 'db-123', resourceType: 'ALIYUN_RDS_SERVERLESS' },
        instances: [{ id: 'db-123' }],
      };

      const error = new Error('Update failed');
      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedDatabaseResource.updateDatabaseResource.mockRejectedValue(error);

      const result = await executeDatabasePlan(mockContext, plan, [database], initialState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error).toBe(error);
    });

    it('should handle delete action failure with partial failure result', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.db1',
            action: 'delete',
            resourceType: 'ALIYUN_RDS_SERVERLESS',
          },
        ],
      };

      const existingState = {
        metadata: { instanceId: 'db-123', resourceType: 'ALIYUN_RDS_SERVERLESS' },
        instances: [{ id: 'db-123' }],
      };

      const error = new Error('Delete failed');
      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedDatabaseResource.deleteDatabaseResource.mockRejectedValue(error);

      const result = await executeDatabasePlan(mockContext, plan, undefined, initialState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error).toBe(error);
    });

    it('should handle missing database in map for create', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.missing_db',
            action: 'create',
            resourceType: 'ALIYUN_RDS_SERVERLESS',
          },
        ],
      };

      const result = await executeDatabasePlan(mockContext, plan, [], initialState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error.message).toContain('Database not found');
    });

    it('should handle missing state for update', async () => {
      const database = createTestDatabase('db1');
      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.db1',
            action: 'update',
            resourceType: 'ALIYUN_RDS_SERVERLESS',
          },
        ],
      };

      mockedStateManager.getResource.mockReturnValue(null);

      const result = await executeDatabasePlan(mockContext, plan, [database], initialState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error.message).toContain('State not found');
    });

    it('should handle missing state for delete', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.db1',
            action: 'delete',
            resourceType: 'ALIYUN_RDS_SERVERLESS',
          },
        ],
      };

      mockedStateManager.getResource.mockReturnValue(null);

      const result = await executeDatabasePlan(mockContext, plan, undefined, initialState);

      expect(mockedLogger.warn).toHaveBeenCalledWith(
        expect.stringContaining('STATE_NOT_FOUND_SKIPPING'),
      );
      expect(result.partialFailure).toBeUndefined();
    });

    it('should call onStateChange callback', async () => {
      const database = createTestDatabase('db1');
      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.db1',
            action: 'create',
            resourceType: 'ALIYUN_RDS_SERVERLESS',
          },
        ],
      };

      const onStateChange = jest.fn();
      const newState = { ...initialState, resources: { 'databases.db1': {} } };
      mockedDatabaseResource.createDatabaseResource.mockResolvedValue(newState);

      await executeDatabasePlan(mockContext, plan, [database], initialState, onStateChange);

      expect(onStateChange).toHaveBeenCalledWith(newState);
    });

    it('should handle multiple databases in plan', async () => {
      const db1 = createTestDatabase('db1', DatabaseEnum.RDS_MYSQL_SERVERLESS);
      const db2 = createTestDatabase('db2', DatabaseEnum.ELASTICSEARCH_SERVERLESS);

      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.db1',
            action: 'create',
            resourceType: 'ALIYUN_RDS_SERVERLESS',
          },
          {
            logicalId: 'databases.db2',
            action: 'create',
            resourceType: 'ALIYUN_ES_SERVERLESS',
          },
        ],
      };

      const result = await executeDatabasePlan(mockContext, plan, [db1, db2], initialState);

      expect(mockedDatabaseResource.createDatabaseResource).toHaveBeenCalledTimes(2);
      expect(result.partialFailure).toBeUndefined();
    });

    it('should stop execution on first failure in multi-item plan', async () => {
      const db1 = createTestDatabase('db1');
      const db2 = createTestDatabase('db2');

      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.db1',
            action: 'create',
            resourceType: 'ALIYUN_RDS_SERVERLESS',
          },
          {
            logicalId: 'databases.db2',
            action: 'create',
            resourceType: 'ALIYUN_RDS_SERVERLESS',
          },
        ],
      };

      mockedDatabaseResource.createDatabaseResource.mockImplementation((ctx, db, state) => {
        if (db.key === 'db1') {
          throw new Error('DB1 creation failed');
        }
        return state;
      });

      const result = await executeDatabasePlan(mockContext, plan, [db1, db2], initialState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.failedItem.logicalId).toBe('databases.db1');
      expect(mockedDatabaseResource.createDatabaseResource).toHaveBeenCalledTimes(1);
    });
  });
});
