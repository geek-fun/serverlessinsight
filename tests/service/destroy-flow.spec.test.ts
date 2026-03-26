import path from 'node:path';
import fs from 'node:fs/promises';
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

describe('Destroy Flow Service Test', () => {
  const tempStateDir = path.join(__dirname, '../fixtures/temp-state-destroy');
  const fixturesDir = path.join(__dirname, '../fixtures');
  let mockClient: MockAliyunClient;

  beforeEach(async () => {
    jest.clearAllMocks();

    mockClient = createMockAliyunClient();
    mockCreateAliyunClient.mockReturnValue(mockClient);

    await fs.mkdir(tempStateDir, { recursive: true }).catch(() => {});
  });

  afterEach(async () => {
    await fs.rm(tempStateDir, { recursive: true, force: true }).catch(() => {});
  });

  describe('Aliyun Destroy', () => {
    it('should destroy FC3 function and clean state', async () => {
      await destroyStack({
        location: fixturesDir,
        stage: 'dev',
        region: 'cn-hangzhou',
        provider: 'aliyun',
      });

      expect(mockClient.fc3.deleteFunction).toHaveBeenCalled();
    });

    it('should handle destroy when resource does not exist', async () => {
      mockClient.fc3.getFunction.mockRejectedValueOnce({ code: 'FunctionNotFound' });
      mockClient.fc3.deleteFunction.mockRejectedValueOnce({ code: 'FunctionNotFound' });

      await destroyStack({
        location: fixturesDir,
        stage: 'dev',
        region: 'cn-hangzhou',
        provider: 'aliyun',
      });
    });
  });

  describe('Error Handling', () => {
    it('should throw error when destroy fails with access denied', async () => {
      mockClient.fc3.deleteFunction.mockRejectedValueOnce(new Error('AccessDenied'));

      await expect(
        destroyStack({
          location: fixturesDir,
          stage: 'dev',
          region: 'cn-hangzhou',
          provider: 'aliyun',
        }),
      ).rejects.toThrow();
    });
  });
});
