import { deployStack } from '../../src/stack';
import { minimumIac, oneFcIac } from '../fixtures/deploy-fixtures';
import { Context, StateFile, CURRENT_STATE_VERSION } from '../../src/types';
import { ProviderEnum } from '../../src/common';
import fs from 'node:fs';

const mockedGetContext = jest.fn();
const mockedGenerateFunctionPlan = jest.fn();
const mockedExecuteFunctionPlan = jest.fn();
const mockedLoadState = jest.fn();
const mockedSaveState = jest.fn();

jest.mock('../../src/common/context', () => ({
  ...jest.requireActual('../../src/common/context'),
  getContext: () => mockedGetContext(),
}));

jest.mock('../../src/common', () => ({
  ...jest.requireActual('../../src/common'),
  getContext: () => mockedGetContext(),
  logger: { info: jest.fn(), debug: jest.fn(), warn: jest.fn(), error: jest.fn() },
  loadState: (...args: unknown[]) => mockedLoadState(...args),
  saveState: (...args: unknown[]) => mockedSaveState(...args),
}));

jest.mock('../../src/stack/aliyunStack', () => ({
  generateFunctionPlan: (...args: unknown[]) => mockedGenerateFunctionPlan(...args),
  executeFunctionPlan: (...args: unknown[]) => mockedExecuteFunctionPlan(...args),
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
  const initialState: StateFile = {
    version: CURRENT_STATE_VERSION,
    provider: 'aliyun',
    resources: {},
  };

  beforeEach(() => {
    // Clean up
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    mockedLoadState.mockReturnValue(initialState);
    mockedExecuteFunctionPlan.mockResolvedValue(initialState);
    mockedGenerateFunctionPlan.mockResolvedValue({ items: [] });
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

    expect(mockedLoadState).toHaveBeenCalledWith('aliyun', process.cwd());
    expect(mockedGenerateFunctionPlan).toHaveBeenCalled();
    expect(mockedExecuteFunctionPlan).toHaveBeenCalled();
    expect(mockedSaveState).toHaveBeenCalled();
  });

  it('should generate and execute function plan for FC functions', async () => {
    const stackName = 'my-demo-stack-fc-only';
    mockedGetContext.mockReturnValue(createMockContext(stackName));

    const mockPlan = {
      items: [
        {
          logicalId: 'functions.hello_fn',
          action: 'create',
          resourceType: 'ALIYUN_FC3',
          changes: { after: { functionName: 'hello-function' } },
        },
      ],
    };
    mockedGenerateFunctionPlan.mockResolvedValue(mockPlan);

    await deployStack(stackName, oneFcIac);

    expect(mockedGenerateFunctionPlan).toHaveBeenCalled();
    expect(mockedExecuteFunctionPlan).toHaveBeenCalledWith(
      expect.objectContaining({ provider: ProviderEnum.ALIYUN }),
      mockPlan,
      oneFcIac.functions,
      initialState,
    );
  });

  it('should save state after execution', async () => {
    const stackName = 'my-demo-stack-save-state';
    mockedGetContext.mockReturnValue(createMockContext(stackName));

    const newState = {
      ...initialState,
      resources: {
        'functions.hello_fn': {
          mode: 'managed' as const,
          region: 'cn-hangzhou',
          definition: { functionName: 'hello-function' },
          instances: [{ arn: 'arn:test', id: 'test-id' }],
          lastUpdated: new Date().toISOString(),
        },
      },
    };
    mockedExecuteFunctionPlan.mockResolvedValue(newState);

    await deployStack(stackName, oneFcIac);

    expect(mockedSaveState).toHaveBeenCalledWith(newState, process.cwd());
  });
});
