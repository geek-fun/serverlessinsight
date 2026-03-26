/* eslint-disable @typescript-eslint/no-require-imports */
import { ProviderEnum } from '../../../../src/common';
import { CURRENT_STATE_VERSION, StateFile, ServerlessIac } from '../../../../src/types';
import type { StateBackend } from '../../../../src/common/stateBackend/types';

const mockedLogger = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
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
  getDependencyInfo: jest.fn(() => ({ cycleError: null })),
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
  });
});
