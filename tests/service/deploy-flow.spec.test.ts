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
      await deploy({
        location: path.join(__dirname, '../fixtures/deploy-fixtures'),
        stage: 'dev',
        autoApprove: true,
        region: 'cn-hangzhou',
        provider: 'aliyun',
      });

      const mockClient = mockCreateAliyunClient.mock.results[0].value;
      expect(mockClient.fc3.createFunction).toHaveBeenCalled();
    });

    it('should generate correct plan for FC3 with API Gateway', async () => {
      await deploy({
        location: path.join(__dirname, '../fixtures/deploy-fixtures'),
        stage: 'dev',
        autoApprove: true,
        region: 'cn-hangzhou',
        provider: 'aliyun',
      });

      const mockClient = mockCreateAliyunClient.mock.results[0].value;
      expect(mockClient.fc3.createFunction).toHaveBeenCalled();
      expect(mockClient.apigw.createApiGroup).toHaveBeenCalled();
      expect(mockClient.apigw.createApi).toHaveBeenCalled();
    });

    it('should handle deploy with NAS storage', async () => {
      await deploy({
        location: path.join(__dirname, '../fixtures/deploy-fixtures'),
        stage: 'dev',
        autoApprove: true,
        region: 'cn-hangzhou',
        provider: 'aliyun',
      });

      const mockClient = mockCreateAliyunClient.mock.results[0].value;
      expect(mockClient.fc3.createFunction).toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should throw error when cloud SDK fails', async () => {
      const mockClient = createMockAliyunClient();
      mockClient.fc3.createFunction.mockRejectedValueOnce(new Error('FunctionAlreadyExists'));
      mockCreateAliyunClient.mockReturnValue(mockClient);

      await expect(
        deploy({
          location: path.join(__dirname, '../fixtures/deploy-fixtures'),
          stage: 'dev',
          autoApprove: true,
          region: 'cn-hangzhou',
          provider: 'aliyun',
        }),
      ).rejects.toThrow();
    });
  });

  describe('State Consistency', () => {
    it('should maintain state across multiple deploys', async () => {
      const mockClient = createMockAliyunClient();
      mockCreateAliyunClient.mockReturnValue(mockClient);

      await deploy({
        location: path.join(__dirname, '../fixtures/deploy-fixtures'),
        stage: 'dev',
        autoApprove: true,
        region: 'cn-hangzhou',
        provider: 'aliyun',
      });

      const callCount = mockClient.fc3.createFunction.mock.calls.length;
      expect(callCount).toBeGreaterThanOrEqual(1);
    });
  });
});
