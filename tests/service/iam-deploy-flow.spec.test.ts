import path from 'node:path';
import fs from 'node:fs/promises';
import { deploy } from '../../src/commands/deploy';
import { destroyStack } from '../../src/commands/destroy';
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

describe('IAM Policy Deploy Flow Service Test', () => {
  const iamFixturesDir = path.join(__dirname, '../fixtures/iam-fixtures');
  const stateFilePath = path.join(
    process.cwd(),
    '.serverlessinsight',
    'state-iam-test-app-iam-test-service.json',
  );
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

  it('should deploy function with custom IAM statements attached to role', async () => {
    await deploy({
      location: iamFixturesDir,
      stage: 'dev',
      autoApprove: true,
      region: 'cn-hangzhou',
      provider: 'aliyun',
    });

    expect(mockClient.fc3.createFunction).toHaveBeenCalled();
    expect(mockClient.ram.createRole).toHaveBeenCalled();
  });

  it('should not call updateRolePolicy when redeployed with same iam config', async () => {
    await deploy({
      location: iamFixturesDir,
      stage: 'dev',
      autoApprove: true,
      region: 'cn-hangzhou',
      provider: 'aliyun',
    });

    mockClient.ram.updateRolePolicy.mockClear();

    await deploy({
      location: iamFixturesDir,
      stage: 'dev',
      autoApprove: true,
      region: 'cn-hangzhou',
      provider: 'aliyun',
    });

    expect(mockClient.ram.updateRolePolicy).not.toHaveBeenCalled();
  });

  it('should call updateRolePolicy when iam statements changed', async () => {
    await deploy({
      location: iamFixturesDir,
      stage: 'dev',
      autoApprove: true,
      region: 'cn-hangzhou',
      provider: 'aliyun',
    });

    const destPath = path.join(iamFixturesDir, 'serverless-insight.yml');
    const changedPath = path.join(iamFixturesDir, 'serverless-insight-changed.yml');
    const originalContent = await fs.readFile(destPath, 'utf-8');

    try {
      await fs.copyFile(changedPath, destPath);

      await deploy({
        location: iamFixturesDir,
        stage: 'dev',
        autoApprove: true,
        region: 'cn-hangzhou',
        provider: 'aliyun',
      });

      expect(mockClient.ram.updateRolePolicy).toHaveBeenCalled();
    } finally {
      await fs.writeFile(destPath, originalContent);
    }
  });

  it('should call updateRolePolicy when iam is removed from config', async () => {
    await deploy({
      location: iamFixturesDir,
      stage: 'dev',
      autoApprove: true,
      region: 'cn-hangzhou',
      provider: 'aliyun',
    });

    mockClient.ram.updateRolePolicy.mockClear();

    const destPath = path.join(iamFixturesDir, 'serverless-insight.yml');
    const noIamPath = path.join(iamFixturesDir, 'serverless-insight-noiam.yml');
    const originalContent = await fs.readFile(destPath, 'utf-8');

    try {
      await fs.copyFile(noIamPath, destPath);

      await deploy({
        location: iamFixturesDir,
        stage: 'dev',
        autoApprove: true,
        region: 'cn-hangzhou',
        provider: 'aliyun',
      });

      expect(mockClient.ram.updateRolePolicy).toHaveBeenCalled();
    } finally {
      await fs.writeFile(destPath, originalContent);
    }
  });

  it('should detach policy and delete role on destroy', async () => {
    await deploy({
      location: iamFixturesDir,
      stage: 'dev',
      autoApprove: true,
      region: 'cn-hangzhou',
      provider: 'aliyun',
    });

    await destroyStack({
      location: iamFixturesDir,
      stage: 'dev',
      region: 'cn-hangzhou',
      provider: 'aliyun',
    });

    expect(mockClient.ram.deleteRole).toHaveBeenCalled();
    expect(mockClient.fc3.deleteFunction).toHaveBeenCalled();
  });
});
