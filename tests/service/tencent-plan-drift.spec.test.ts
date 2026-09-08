import path from 'node:path';
import fs from 'node:fs/promises';
import { deploy } from '../../src/commands/deploy';

jest.mock('../../src/common/tencentClient', () => ({
  createTencentClient: jest.fn(),
}));

jest.mock('../../src/common/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

jest.mock('../../src/lang', () => ({
  lang: {
    __: (key: string) => key,
  },
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mockCreateTencentClient = require('../../src/common/tencentClient')
  .createTencentClient as jest.Mock;

const mockScfOperations = {
  createFunction: jest.fn().mockResolvedValue(undefined),
  getFunction: jest.fn(),
  updateFunctionConfiguration: jest.fn().mockResolvedValue(undefined),
  updateFunctionCode: jest.fn().mockResolvedValue(undefined),
  deleteFunction: jest.fn().mockResolvedValue(undefined),
  createTrigger: jest.fn().mockResolvedValue(undefined),
  deleteTrigger: jest.fn().mockResolvedValue(undefined),
  createCustomDomain: jest.fn().mockResolvedValue(undefined),
  getCustomDomain: jest.fn().mockResolvedValue(null),
  deleteCustomDomain: jest.fn().mockResolvedValue(undefined),
};

const STATE_FILE_PATH = path.join(
  process.cwd(),
  '.serverlessinsight',
  'state-insight-poc-app-insight-poc-tencent.json',
);

const remoteFunction = (memorySize: number) => ({
  FunctionName: 'test-fn',
  Runtime: 'Nodejs18.15',
  Handler: 'index.handler',
  MemorySize: memorySize,
  Timeout: 10,
  Status: 'Active',
  Environment: { Variables: [] },
  Tags: [],
});

describe('Tencent SCF live-drift deploy flow (issue #234 phase 2)', () => {
  const fixtureFile = path.join(__dirname, '../fixtures/serverless-insight-tencent.yml');
  const deployOptions = {
    location: fixtureFile,
    stage: 'default',
    autoApprove: true,
    region: 'ap-guangzhou',
    provider: 'tencent',
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    mockCreateTencentClient.mockReturnValue({ scf: mockScfOperations });
    await fs.rm(STATE_FILE_PATH, { force: true }).catch(() => {});
  });

  afterEach(async () => {
    await fs.rm(STATE_FILE_PATH, { force: true }).catch(() => {});
  });

  it('deploys, reconciles a console edit on the second deploy, then stays noop', async () => {
    // First deploy: nothing remote yet → create. The planner probe reads null;
    // the executor's post-create state refresh reads the created function.
    mockScfOperations.getFunction
      .mockResolvedValueOnce(null)
      .mockResolvedValue(remoteFunction(512));
    await deploy(deployOptions);
    expect(mockScfOperations.createFunction).toHaveBeenCalledTimes(1);
    expect(mockScfOperations.updateFunctionConfiguration).not.toHaveBeenCalled();

    // Second deploy: the console dropped memory to 256 while state/config still
    // declare 512 — live drift must force the config re-push.
    mockScfOperations.getFunction.mockResolvedValue(remoteFunction(256));
    await deploy(deployOptions);
    expect(mockScfOperations.updateFunctionConfiguration).toHaveBeenCalledWith(
      expect.objectContaining({ MemorySize: 512 }),
    );

    // Third deploy: cloud matches config again → noop, no config re-push.
    const updateCalls = mockScfOperations.updateFunctionConfiguration.mock.calls.length;
    mockScfOperations.getFunction.mockResolvedValue(remoteFunction(512));
    await deploy(deployOptions);
    expect(mockScfOperations.updateFunctionConfiguration).toHaveBeenCalledTimes(updateCalls);
  });
});
