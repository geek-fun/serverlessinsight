import { deployStack } from '../../../src/stack';
import { minimumIac, oneFcIac } from '../../fixtures/deploy-fixtures';
import { Context } from '../../../src/types';
import { ProviderEnum } from '../../../src/common';
import { StateBackend } from '../../../src/common/stateBackend/types';
import fs from 'node:fs';

const mockedGetContext = jest.fn();
const mockedDeployAliyunStack = jest.fn();
const mockedDeployTencentStack = jest.fn();
const mockedDeployVolcengineStack = jest.fn();

jest.mock('../../../src/common/context', () => ({
  ...jest.requireActual('../../../src/common/context'),
  getContext: () => mockedGetContext(),
}));

jest.mock('../../../src/common', () => ({
  ...jest.requireActual('../../../src/common'),
  getContext: () => mockedGetContext(),
  logger: { info: jest.fn(), debug: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

jest.mock('../../../src/stack/aliyunStack', () => ({
  deployAliyunStack: (...args: unknown[]) => mockedDeployAliyunStack(...args),
}));

jest.mock('../../../src/stack/scfStack', () => ({
  deployTencentStack: (...args: unknown[]) => mockedDeployTencentStack(...args),
}));

jest.mock('../../../src/stack/volcengineStack', () => ({
  deployVolcengineStack: (...args: unknown[]) => mockedDeployVolcengineStack(...args),
}));

const createMockContext = (stage = 'default', additionalFields?: Partial<Context>): Context => ({
  stage,
  app: 'test-app',
  service: 'test-service',
  provider: ProviderEnum.ALIYUN,
  region: 'cn-hangzhou',
  accessKeyId: 'test-access-key-id',
  accessKeySecret: 'test-access-key-secret',
  iacLocation: 'tests/fixtures/serverless-insight.yml',
  parameters: [],
  stages: {},
  ...additionalFields,
});

describe('Unit tests for Aliyun stack deployment', () => {
  const testDir = '/tmp/test-deploy';

  const mockBackend: StateBackend = {
    loadState: jest.fn(),
    saveState: jest.fn(),
    acquireLock: jest.fn(),
    releaseLock: jest.fn(),
    forceUnlock: jest.fn(),
    readLock: jest.fn(),
    withLock: jest.fn(),
  };

  beforeEach(() => {
    // Clean up
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    mockedDeployAliyunStack.mockResolvedValue(undefined);
    mockedDeployTencentStack.mockResolvedValue(undefined);
    mockedDeployVolcengineStack.mockResolvedValue(undefined);
    jest.clearAllMocks();
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('should deploy using state-based workflow for Aliyun', async () => {
    mockedGetContext.mockReturnValue(createMockContext());

    await deployStack(minimumIac, mockBackend);

    expect(mockedDeployAliyunStack).toHaveBeenCalledWith(minimumIac, mockBackend);
  });

  it('should generate and execute function plan for FC functions', async () => {
    mockedGetContext.mockReturnValue(createMockContext());

    await deployStack(oneFcIac, mockBackend);

    expect(mockedDeployAliyunStack).toHaveBeenCalledWith(oneFcIac, mockBackend);
  });

  it('should save state after execution', async () => {
    mockedGetContext.mockReturnValue(createMockContext());

    await deployStack(oneFcIac, mockBackend);

    expect(mockedDeployAliyunStack).toHaveBeenCalledWith(oneFcIac, mockBackend);
  });

  it('should dispatch Tencent deployments to the Tencent stack', async () => {
    const tencentIac = {
      ...minimumIac,
      provider: { ...minimumIac.provider, name: ProviderEnum.TENCENT },
    };

    await deployStack(tencentIac, mockBackend);

    expect(mockedDeployTencentStack).toHaveBeenCalledWith(tencentIac, mockBackend);
  });

  it('should report that Huawei deployment is not implemented', async () => {
    const huaweiIac = {
      ...minimumIac,
      provider: { ...minimumIac.provider, name: ProviderEnum.HUAWEI },
    };

    await expect(deployStack(huaweiIac, mockBackend)).rejects.toThrow(
      'Huawei deployment is not yet implemented',
    );
  });
});
