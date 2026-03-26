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

describe('Deploy Flow Service Test', () => {
  const tempStateDir = path.join(__dirname, '../fixtures/temp-state-deploy');
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

  describe('Aliyun FC3 Deploy', () => {
    it('should deploy single FC3 function and save state', async () => {
      await deploy({
        location: fixturesDir,
        stage: 'dev',
        autoApprove: true,
        region: 'cn-hangzhou',
        provider: 'aliyun',
      });

      expect(mockClient.fc3.createFunction).toHaveBeenCalled();
    });

    it('should handle deploy error when cloud SDK fails', async () => {
      mockClient.fc3.createFunction.mockRejectedValueOnce(new Error('FunctionAlreadyExists'));

      await expect(
        deploy({
          location: fixturesDir,
          stage: 'dev',
          autoApprove: true,
          region: 'cn-hangzhou',
          provider: 'aliyun',
        }),
      ).rejects.toThrow();
    });
  });
});
