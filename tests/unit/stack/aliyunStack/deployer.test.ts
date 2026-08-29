/* eslint-disable @typescript-eslint/no-require-imports */
import { ProviderEnum } from '../../../../src/common';
import { CURRENT_STATE_VERSION, StateFile, ServerlessIac } from '../../../../src/types';
import type { StateBackend } from '../../../../src/common/stateBackend/types';

const mockedLogger = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
};

const createMockStateBackend = (): StateBackend => ({
  loadState: jest.fn(),
  saveState: jest.fn(),
  acquireLock: jest.fn(),
  releaseLock: jest.fn(),
  forceUnlock: jest.fn(),
  readLock: jest.fn(),
  withLock: jest.fn(),
});

const mockedStateBackend = createMockStateBackend();

const mockedPlanner = {
  generateFunctionPlan: jest.fn(),
  generateBucketPlan: jest.fn(),
  generateDatabasePlan: jest.fn(),
  generateTablePlan: jest.fn(),
  generateApigwPlan: jest.fn(),
};

const mockedExecutor = {
  executeFunctionPlan: jest.fn(),
  executeBucketPlan: jest.fn(),
  executeDatabasePlan: jest.fn(),
  executeTablePlan: jest.fn(),
  executeApigwPlan: jest.fn(),
};

jest.mock('../../../../src/common/logger', () => ({
  logger: {
    info: (...args: unknown[]) => mockedLogger.info(...args),
    error: (...args: unknown[]) => mockedLogger.error(...args),
    warn: (...args: unknown[]) => mockedLogger.warn(...args),
    debug: (...args: unknown[]) => mockedLogger.debug(...args),
  },
}));

jest.mock('../../../../src/stack/aliyunStack/fc3Planner', () => ({
  generateFunctionPlan: (...args: unknown[]) => mockedPlanner.generateFunctionPlan(...args),
}));

jest.mock('../../../../src/stack/aliyunStack/ossPlanner', () => ({
  generateBucketPlan: (...args: unknown[]) => mockedPlanner.generateBucketPlan(...args),
}));

jest.mock('../../../../src/stack/aliyunStack/databasePlanner', () => ({
  generateDatabasePlan: (...args: unknown[]) => mockedPlanner.generateDatabasePlan(...args),
}));

jest.mock('../../../../src/stack/aliyunStack/tablestorePlanner', () => ({
  generateTablePlan: (...args: unknown[]) => mockedPlanner.generateTablePlan(...args),
}));

jest.mock('../../../../src/stack/aliyunStack/apigwPlanner', () => ({
  generateApigwPlan: (...args: unknown[]) => mockedPlanner.generateApigwPlan(...args),
}));

jest.mock('../../../../src/stack/aliyunStack/fc3Executor', () => ({
  executeFunctionPlan: (...args: unknown[]) => mockedExecutor.executeFunctionPlan(...args),
}));

jest.mock('../../../../src/stack/aliyunStack/ossExecutor', () => ({
  executeBucketPlan: (...args: unknown[]) => mockedExecutor.executeBucketPlan(...args),
}));

jest.mock('../../../../src/stack/aliyunStack/databaseExecutor', () => ({
  executeDatabasePlan: (...args: unknown[]) => mockedExecutor.executeDatabasePlan(...args),
}));

jest.mock('../../../../src/stack/aliyunStack/tablestoreExecutor', () => ({
  executeTablePlan: (...args: unknown[]) => mockedExecutor.executeTablePlan(...args),
}));

jest.mock('../../../../src/stack/aliyunStack/apigwExecutor', () => ({
  executeApigwPlan: (...args: unknown[]) => mockedExecutor.executeApigwPlan(...args),
}));

jest.mock('../../../../src/common/context', () => ({
  getContext: () => ({
    stage: 'dev',
    app: 'test-app',
    service: 'test-service',
    provider: ProviderEnum.ALIYUN,
    region: 'cn-hangzhou',
  }),
  setIac: jest.fn(),
  getRoleArnFromState: jest.fn(() => 'arn:aws:iam::123456789012:role/test-role'),
  getDependencyInfo: jest.fn(() => ({ cycleError: null, order: [], graph: {} })),
  toDotFormat: jest.fn(() => 'digraph { }'),
}));

jest.mock('../../../../src/lang', () => ({
  lang: {
    __: (key: string) => key,
  },
}));

const initialState: StateFile = {
  version: CURRENT_STATE_VERSION,
  provider: 'aliyun',
  app: 'test-app',
  service: 'test-service',
  stages: {},
  resources: {},
};

describe('Deployer Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (mockedStateBackend.loadState as jest.Mock).mockResolvedValue(initialState);
    (mockedStateBackend.saveState as jest.Mock).mockResolvedValue(undefined);
    mockedPlanner.generateFunctionPlan.mockResolvedValue({ items: [] });
    mockedPlanner.generateBucketPlan.mockResolvedValue({ items: [] });
    mockedPlanner.generateDatabasePlan.mockResolvedValue({ items: [] });
    mockedPlanner.generateTablePlan.mockResolvedValue({ items: [] });
    mockedPlanner.generateApigwPlan.mockResolvedValue({ items: [] });
    mockedExecutor.executeFunctionPlan.mockResolvedValue({ state: initialState });
    mockedExecutor.executeBucketPlan.mockResolvedValue({ state: initialState });
    mockedExecutor.executeDatabasePlan.mockResolvedValue({ state: initialState });
    mockedExecutor.executeTablePlan.mockResolvedValue({ state: initialState });
    mockedExecutor.executeApigwPlan.mockResolvedValue({ state: initialState });
  });

  describe('Plan Generation and Validation', () => {
    it('should call all planners during deployment planning', async () => {
      const { deployAliyunStack } = require('../../../../src/stack/aliyunStack/deployer');
      const iac: ServerlessIac = {
        version: '1.0',
        app: 'test-app',
        service: 'test-service',
        provider: { name: ProviderEnum.ALIYUN, region: 'cn-hangzhou' },
      };

      try {
        await deployAliyunStack(iac, mockedStateBackend);
      } catch {
        // Test may fail on cycle detection or other validation, but we're testing planner calls
      }

      expect(mockedPlanner.generateFunctionPlan).toHaveBeenCalled();
      expect(mockedPlanner.generateBucketPlan).toHaveBeenCalled();
      expect(mockedPlanner.generateDatabasePlan).toHaveBeenCalled();
      expect(mockedPlanner.generateTablePlan).toHaveBeenCalled();
      expect(mockedPlanner.generateApigwPlan).toHaveBeenCalled();
    });

    it('should report bucket partial failures with prior successful items', async () => {
      const { deployAliyunStack } = require('../../../../src/stack/aliyunStack/deployer');
      const iac: ServerlessIac = {
        version: '1.0',
        app: 'test-app',
        service: 'test-service',
        provider: { name: ProviderEnum.ALIYUN, region: 'cn-hangzhou' },
      };
      const failure = {
        error: new Error('bucket failed'),
        failedItem: { action: 'create', logicalId: 'buckets.assets', resourceType: 'ALIYUN_OSS' },
        successfulItems: [],
      };
      (mockedStateBackend.withLock as jest.Mock).mockImplementation(
        async (_name: string, callback: () => Promise<unknown>) => callback(),
      );
      mockedExecutor.executeBucketPlan.mockResolvedValue({
        state: initialState,
        partialFailure: failure,
      });

      await expect(deployAliyunStack(iac, mockedStateBackend)).rejects.toMatchObject({
        message: 'bucket failed',
        isPartialFailure: true,
      });
      expect(mockedLogger.error).toHaveBeenCalled();
    });

    it('should report database partial failures with prior successful items', async () => {
      const { deployAliyunStack } = require('../../../../src/stack/aliyunStack/deployer');
      const iac: ServerlessIac = {
        version: '1.0',
        app: 'test-app',
        service: 'test-service',
        provider: { name: ProviderEnum.ALIYUN, region: 'cn-hangzhou' },
      };
      const failure = {
        error: new Error('database failed'),
        failedItem: { action: 'update', logicalId: 'databases.main', resourceType: 'ALIYUN_RDS' },
        successfulItems: [],
      };
      (mockedStateBackend.withLock as jest.Mock).mockImplementation(
        async (_name: string, callback: () => Promise<unknown>) => callback(),
      );
      mockedExecutor.executeDatabasePlan.mockResolvedValue({
        state: initialState,
        partialFailure: failure,
      });

      await expect(deployAliyunStack(iac, mockedStateBackend)).rejects.toMatchObject({
        message: 'database failed',
        isPartialFailure: true,
      });
    });

    it('should report table partial failures with prior successful items', async () => {
      const { deployAliyunStack } = require('../../../../src/stack/aliyunStack/deployer');
      const iac: ServerlessIac = {
        version: '1.0',
        app: 'test-app',
        service: 'test-service',
        provider: { name: ProviderEnum.ALIYUN, region: 'cn-hangzhou' },
      };
      const failure = {
        error: new Error('table failed'),
        failedItem: {
          action: 'delete',
          logicalId: 'tables.audit',
          resourceType: 'ALIYUN_TABLESTORE',
        },
        successfulItems: [],
      };
      (mockedStateBackend.withLock as jest.Mock).mockImplementation(
        async (_name: string, callback: () => Promise<unknown>) => callback(),
      );
      mockedExecutor.executeTablePlan.mockResolvedValue({
        state: initialState,
        partialFailure: failure,
      });

      await expect(deployAliyunStack(iac, mockedStateBackend)).rejects.toMatchObject({
        message: 'table failed',
        isPartialFailure: true,
      });
    });

    it('should report API Gateway partial failures with prior successful items', async () => {
      const { deployAliyunStack } = require('../../../../src/stack/aliyunStack/deployer');
      const iac: ServerlessIac = {
        version: '1.0',
        app: 'test-app',
        service: 'test-service',
        provider: { name: ProviderEnum.ALIYUN, region: 'cn-hangzhou' },
      };
      const failure = {
        error: new Error('api gateway failed'),
        failedItem: { action: 'create', logicalId: 'events.api', resourceType: 'ALIYUN_APIGW' },
        successfulItems: [],
      };
      (mockedStateBackend.withLock as jest.Mock).mockImplementation(
        async (_name: string, callback: () => Promise<unknown>) => callback(),
      );
      mockedExecutor.executeApigwPlan.mockResolvedValue({
        state: initialState,
        partialFailure: failure,
      });

      await expect(deployAliyunStack(iac, mockedStateBackend)).rejects.toMatchObject({
        message: 'api gateway failed',
        isPartialFailure: true,
      });
    });
  });

  describe('buildRoleArnResolver', () => {
    const fnA = { key: 'fn_a', name: 'fn-a-name', storage: {} };
    const fnB = { key: 'fn_b', name: 'fn-b-name', storage: {} };

    const stateWithRoles: StateFile = {
      ...initialState,
      resources: {
        'functions.fn_a': {
          mode: 'managed',
          region: 'cn-hangzhou',
          definition: {},
          instances: [
            { sid: 's', id: 'role-fn-a', type: 'ALIYUN_RAM_ROLE', roleArn: 'arn:role-fn-a' },
          ],
          lastUpdated: '',
        },
        'functions.fn_b': {
          mode: 'managed',
          region: 'cn-hangzhou',
          definition: {},
          instances: [
            { sid: 's', id: 'role-fn-b', type: 'ALIYUN_RAM_ROLE', roleArn: 'arn:role-fn-b' },
          ],
          lastUpdated: '',
        },
      },
    };

    it('resolves a template reference backend to that function role', () => {
      const { buildRoleArnResolver } = require('../../../../src/stack/aliyunStack/deployer');
      const resolver = buildRoleArnResolver(stateWithRoles, [fnA, fnB]);

      expect(resolver('${functions.fn_a}')).toBe('arn:role-fn-a');
      expect(resolver('${functions.fn_b}')).toBe('arn:role-fn-b');
    });

    it('resolves a bare backend matching a template function name to that function role', () => {
      const { buildRoleArnResolver } = require('../../../../src/stack/aliyunStack/deployer');
      const resolver = buildRoleArnResolver(stateWithRoles, [fnA, fnB]);

      expect(resolver('fn-b-name')).toBe('arn:role-fn-b');
    });

    it('falls back to the first managed role for an external backend', () => {
      const { buildRoleArnResolver } = require('../../../../src/stack/aliyunStack/deployer');
      const resolver = buildRoleArnResolver(stateWithRoles, [fnA, fnB]);

      expect(resolver('external-deployed-fn')).toBe('arn:role-fn-a');
    });

    it('falls back to the first managed role when the referenced function has no role', () => {
      const { buildRoleArnResolver } = require('../../../../src/stack/aliyunStack/deployer');
      const stateWithRolelessFn: StateFile = {
        ...initialState,
        resources: {
          'functions.fn_a': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: {},
            instances: [],
            lastUpdated: '',
          },
          'functions.fn_b': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: {},
            instances: [
              { sid: 's', id: 'role-fn-b', type: 'ALIYUN_RAM_ROLE', roleArn: 'arn:role-fn-b' },
            ],
            lastUpdated: '',
          },
        },
      };
      const resolver = buildRoleArnResolver(stateWithRolelessFn, [fnA, fnB]);

      expect(resolver('${functions.fn_a}')).toBe('arn:role-fn-b');
    });
  });
});
