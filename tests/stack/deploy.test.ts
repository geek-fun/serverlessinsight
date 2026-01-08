import { deployStack } from '../../src/stack';
import { minimumIac, oneFcIac } from '../fixtures/deploy-fixtures';
import { Context } from '../../src/types';
import { ProviderEnum } from '../../src/common';
import fs from 'node:fs';

const mockedGetContext = jest.fn();
const mockedDeployAliyunStack = jest.fn();

jest.mock('../../src/common/context', () => ({
  ...jest.requireActual('../../src/common/context'),
  getContext: () => mockedGetContext(),
}));

jest.mock('../../src/common', () => ({
  ...jest.requireActual('../../src/common'),
  getContext: () => mockedGetContext(),
  logger: { info: jest.fn(), debug: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

jest.mock('../../src/stack/aliyunStack', () => ({
  deployAliyunStack: (...args: unknown[]) => mockedDeployAliyunStack(...args),
}));

const createMockContext = (
  stackName: string,
  stage = 'default',
  additionalFields?: Partial<Context>,
): Context => ({
  stage,
  stackName,
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

  beforeEach(() => {
    // Clean up
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    mockedDeployAliyunStack.mockResolvedValue(undefined);
    jest.clearAllMocks();
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('should deploy using state-based workflow for Aliyun', async () => {
    const stackName = 'my-demo-minimum-stack';
    mockedGetContext.mockReturnValue(createMockContext(stackName));

    await deployStack(stackName, minimumIac);

    expect(mockedDeployAliyunStack).toHaveBeenCalledWith(minimumIac);
  });

  it('should generate and execute function plan for FC functions', async () => {
    const stackName = 'my-demo-stack-fc-only';
    mockedGetContext.mockReturnValue(createMockContext(stackName));

    await deployStack(stackName, oneFcIac);

    expect(mockedDeployAliyunStack).toHaveBeenCalledWith(oneFcIac);
  });

  it('should save state after execution', async () => {
    const stackName = 'my-demo-stack-save-state';
    mockedGetContext.mockReturnValue(createMockContext(stackName));

    await deployStack(stackName, oneFcIac);

    expect(mockedDeployAliyunStack).toHaveBeenCalledWith(oneFcIac);
  });
});
