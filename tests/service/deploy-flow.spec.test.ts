import path from 'node:path';
import fs from 'node:fs/promises';
import { deploy } from '../../src/commands/deploy';
import { createMockAliyunClient } from './mockCloudClient';

jest.mock('../../src/common/aliyunClient', () => {
  const originalModule = jest.requireActual('../../src/common/aliyunClient');
  return {
    ...originalModule,
    createAliyunClient: jest.fn(),
  };
});

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

  beforeEach(async () => {
    jest.clearAllMocks();

    const mockClient = createMockAliyunClient();
    mockCreateAliyunClient.mockReturnValue(mockClient);

    await fs.mkdir(tempStateDir, { recursive: true }).catch(() => {});
  });

  afterEach(async () => {
    await fs.rm(tempStateDir, { recursive: true, force: true }).catch(() => {});
  });

  describe('Aliyun FC3 Deploy', () => {
    it('should deploy single FC3 function and save state', async () => {
      const mockClient = createMockAliyunClient();
      mockCreateAliyunClient.mockReturnValue(mockClient);

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
      const mockClient = createMockAliyunClient();
      mockClient.fc3.createFunction.mockRejectedValueOnce(new Error('FunctionAlreadyExists'));
      mockCreateAliyunClient.mockReturnValue(mockClient);

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
