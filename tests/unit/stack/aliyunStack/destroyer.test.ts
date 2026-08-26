import { destroyAliyunStack } from '../../../../src/stack/aliyunStack/destroyer';
import { getContext } from '../../../../src/common';
import { createAliyunClient } from '../../../../src/common/aliyunClient';
import type { StateFile } from '../../../../src/types';
import type { StateBackend } from '../../../../src/common/stateBackend';

jest.mock('../../../../src/common', () => ({
  getContext: jest.fn(),
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
  ProviderEnum: {
    HUAWEI: 'huawei',
    ALIYUN: 'aliyun',
    TENCENT: 'tencent',
    AWS: 'aws',
    VOLCENGINE: 'volcengine',
  },
  getRoleArnFromState: jest.fn(() => 'role-arn'),
  setIac: jest.fn(),
}));

jest.mock('../../../../src/lang', () => ({
  lang: {
    __: (key: string, params?: Record<string, string>) => {
      if (params) return `${key}:${JSON.stringify(params)}`;
      return key;
    },
  },
}));

jest.mock('../../../../src/common/aliyunClient', () => ({
  createAliyunClient: jest.fn(),
}));

jest.mock('../../../../src/common/stateManager', () => ({
  getSharedResource: jest.fn(() => undefined),
  removeSharedResource: jest.fn((state: StateFile) => state),
  getAllResources: jest.fn(() => ({})),
}));

jest.mock('../../../../src/stack/aliyunStack/fc3Planner', () => ({
  generateFunctionPlan: jest.fn(async () => ({ items: [] })),
}));
jest.mock('../../../../src/stack/aliyunStack/ossPlanner', () => ({
  generateBucketPlan: jest.fn(async () => ({ items: [] })),
}));
jest.mock('../../../../src/stack/aliyunStack/databasePlanner', () => ({
  generateDatabasePlan: jest.fn(async () => ({ items: [] })),
}));
jest.mock('../../../../src/stack/aliyunStack/tablestorePlanner', () => ({
  generateTablePlan: jest.fn(async () => ({ items: [] })),
}));
jest.mock('../../../../src/stack/aliyunStack/apigwPlanner', () => ({
  generateApigwPlan: jest.fn(async () => ({ items: [] })),
}));

jest.mock('../../../../src/stack/aliyunStack/fc3Executor', () => ({
  executeFunctionPlan: jest.fn(),
}));
jest.mock('../../../../src/stack/aliyunStack/ossExecutor', () => ({
  executeBucketPlan: jest.fn(),
}));
jest.mock('../../../../src/stack/aliyunStack/databaseExecutor', () => ({
  executeDatabasePlan: jest.fn(),
}));
jest.mock('../../../../src/stack/aliyunStack/tablestoreExecutor', () => ({
  executeTablePlan: jest.fn(),
}));
jest.mock('../../../../src/stack/aliyunStack/apigwExecutor', () => ({
  executeApigwPlan: jest.fn(),
}));

jest.mock('../../../../src/stack/aliyunStack/sharedLogProject', () => ({
  SHARED_LOG_PROJECT_KEY: 'logs.project',
  releaseSharedSlsProjectIfUnused: jest.fn(),
  resolveSharedProjectName: jest.fn(() => 'test-app-dev-sls'),
}));

describe('aliyunStack destroyer', () => {
  const mockContext = {
    app: 'test-app',
    service: 'test-service',
    stage: 'dev',
    region: 'cn-hangzhou',
    provider: 'aliyun',
    accessKeyId: 'test-ak',
    accessKeySecret: 'test-sk',
    iacLocation: '/test/path',
  };

  const mockState: StateFile = {
    version: '1.0',
    provider: 'aliyun',
    app: 'test-app',
    service: 'test-service',
    stages: {
      dev: {
        resources: {},
        shared: {
          'logs.project': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: { projectName: 'test-app-dev-sls', region: 'cn-hangzhou', stage: 'dev' },
            instances: [
              {
                sid: 'si:aliyun:sls_project:dev:test-app-dev-sls',
                type: 'ALIYUN_SLS_PROJECT',
                id: 'test-app-dev-sls',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      },
    },
    resources: {},
  };

  const mockBackend = {
    loadState: jest.fn().mockResolvedValue(mockState),
    saveState: jest.fn(),
    withLock: jest.fn(),
    acquireLock: jest.fn(),
    releaseLock: jest.fn(),
    forceUnlock: jest.fn(),
    readLock: jest.fn(),
  } as unknown as StateBackend;

  const mockClient = {
    apigw: {
      describeGatewayLogConfig: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getContext as jest.Mock).mockReturnValue(mockContext);
    (createAliyunClient as jest.Mock).mockReturnValue(mockClient);
    mockClient.apigw.describeGatewayLogConfig.mockResolvedValue(null);
    // Executors thread the incoming state through unchanged (empty plans)
    const { executeApigwPlan } = jest.requireMock(
      '../../../../src/stack/aliyunStack/apigwExecutor',
    );
    const { executeFunctionPlan } = jest.requireMock(
      '../../../../src/stack/aliyunStack/fc3Executor',
    );
    const { executeBucketPlan } = jest.requireMock('../../../../src/stack/aliyunStack/ossExecutor');
    const { executeDatabasePlan } = jest.requireMock(
      '../../../../src/stack/aliyunStack/databaseExecutor',
    );
    const { executeTablePlan } = jest.requireMock(
      '../../../../src/stack/aliyunStack/tablestoreExecutor',
    );
    executeApigwPlan.mockImplementation(
      async (
        _c: unknown,
        _p: unknown,
        _e: unknown,
        _s: unknown,
        _r: unknown,
        state: StateFile,
      ) => ({ state }),
    );
    executeFunctionPlan.mockImplementation(
      async (_c: unknown, _p: unknown, _e: unknown, state: StateFile) => ({ state }),
    );
    executeBucketPlan.mockImplementation(
      async (_c: unknown, _p: unknown, _e: unknown, state: StateFile) => ({ state }),
    );
    executeDatabasePlan.mockImplementation(
      async (_c: unknown, _p: unknown, _e: unknown, state: StateFile) => ({ state }),
    );
    executeTablePlan.mockImplementation(
      async (_c: unknown, _p: unknown, _e: unknown, state: StateFile) => ({ state }),
    );
  });

  it('retains SLS project referenced by gateway singleton during destroy', async () => {
    mockClient.apigw.describeGatewayLogConfig.mockResolvedValue({
      slsProject: 'test-app-dev-sls',
      slsLogStore: 'test-service-dev-apigw-logs',
    });
    const { getSharedResource } = jest.requireMock('../../../../src/common/stateManager');
    getSharedResource.mockReturnValue(mockState.stages?.dev?.shared?.['logs.project']);
    const { releaseSharedSlsProjectIfUnused } = jest.requireMock(
      '../../../../src/stack/aliyunStack/sharedLogProject',
    );
    const { removeSharedResource } = jest.requireMock('../../../../src/common/stateManager');

    await destroyAliyunStack(mockBackend);

    expect(releaseSharedSlsProjectIfUnused).not.toHaveBeenCalled();
    expect(removeSharedResource).not.toHaveBeenCalled();
    expect(mockBackend.saveState).toHaveBeenCalled();
  });

  it('releases shared SLS project when no gateway singleton references it', async () => {
    const { getSharedResource } = jest.requireMock('../../../../src/common/stateManager');
    getSharedResource.mockReturnValue(mockState.stages?.dev?.shared?.['logs.project']);
    const { releaseSharedSlsProjectIfUnused } = jest.requireMock(
      '../../../../src/stack/aliyunStack/sharedLogProject',
    );
    const { removeSharedResource } = jest.requireMock('../../../../src/common/stateManager');
    releaseSharedSlsProjectIfUnused.mockResolvedValue('deleted');

    await destroyAliyunStack(mockBackend);

    expect(releaseSharedSlsProjectIfUnused).toHaveBeenCalled();
    expect(removeSharedResource).toHaveBeenCalled();
  });
});
