import path from 'node:path';
import fs from 'node:fs/promises';
import { deploy } from '../../src/commands/deploy';
import { createMockAliyunClient, type MockAliyunClient } from './mockCloudClient';

jest.mock('../../src/common/aliyunClient', () => ({
  createAliyunClient: jest.fn(),
}));

jest.mock('../../src/common/imsClient', () => ({
  getIamInfo: jest.fn().mockResolvedValue({
    accountId: '123456789012',
    displayName: 'Test User',
    userId: 'test-user-id',
  }),
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
const mockCreateAliyunClient = require('../../src/common/aliyunClient')
  .createAliyunClient as jest.Mock;

const deployOptions = {
  location: path.join(__dirname, '../fixtures/role-reconcile-fixtures'),
  stage: 'dev',
  autoApprove: true,
  region: 'cn-hangzhou',
  provider: 'aliyun',
};

const stateFilePath = path.join(
  process.cwd(),
  '.serverlessinsight',
  'state-role-reconcile-test-app-role-reconcile-test-service.json',
);

const loadState = async (): Promise<{
  stages: Record<
    string,
    {
      resources: Record<
        string,
        {
          definition?: { iam?: unknown };
          instances?: Array<{ id?: string; type?: string; roleArn?: string }>;
        }
      >;
    }
  >;
}> => JSON.parse(await fs.readFile(stateFilePath, 'utf-8'));

const fnResourceOf = async (): Promise<{
  definition?: { iam?: unknown };
  instances?: Array<{ id?: string; type?: string; roleArn?: string }>;
}> => {
  const state = await loadState();
  return state.stages.dev.resources['functions.role_reconcile_fn'];
};

describe('Role Reconciliation Deploy Flow (issue #234)', () => {
  let mockClient: MockAliyunClient;

  beforeEach(async () => {
    jest.clearAllMocks();
    mockClient = createMockAliyunClient();
    mockCreateAliyunClient.mockReturnValue(mockClient);
    await fs.rm(stateFilePath, { force: true }).catch(() => {});
  });

  afterEach(async () => {
    await fs.rm(stateFilePath, { force: true }).catch(() => {});
  });

  it('plans update and rebinds when the recorded RAM role is gone from the provider', async () => {
    await deploy(deployOptions);

    const fnResource = await fnResourceOf();
    const roleInstance = fnResource?.instances?.find((i) => i.type === 'ALIYUN_RAM_ROLE');
    expect(roleInstance?.id).toBeTruthy();
    expect(mockClient.ram.createRole).toHaveBeenCalled();

    // Cloud drift: the role is deleted out-of-band while state still records it.
    mockClient.ram.getRole.mockResolvedValue(null);
    mockClient.ram.createRole.mockResolvedValue({
      roleName: roleInstance?.id,
      arn: `acs:ram::123456789012:role/${roleInstance?.id}`,
    });
    mockClient.ram.createRole.mockClear();
    mockClient.fc3.updateFunctionConfiguration.mockClear();

    await deploy(deployOptions);

    expect(mockClient.ram.createRole).toHaveBeenCalledWith(
      roleInstance?.id,
      ['fc.aliyuncs.com'],
      undefined,
      expect.any(Array),
      undefined,
      expect.any(Array),
    );
    // Binding must be pushed even though the function config definition is unchanged.
    expect(mockClient.fc3.updateFunctionConfiguration).toHaveBeenCalledWith(
      expect.objectContaining({ role: `acs:ram::123456789012:role/${roleInstance?.id}` }),
    );
    const healedResource = await fnResourceOf();
    const healedRoles = (healedResource?.instances ?? []).filter(
      (i) => i.type === 'ALIYUN_RAM_ROLE',
    );
    expect(healedRoles).toHaveLength(1);
  });

  it('stays noop on redeploy when the role still exists in the provider', async () => {
    await deploy(deployOptions);
    mockClient.ram.createRole.mockClear();
    mockClient.fc3.updateFunctionConfiguration.mockClear();

    await deploy(deployOptions);

    expect(mockClient.ram.createRole).not.toHaveBeenCalled();
    expect(mockClient.fc3.updateFunctionConfiguration).not.toHaveBeenCalled();
  });
});
