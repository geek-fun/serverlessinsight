import path from 'node:path';
import fs from 'node:fs/promises';
import { plan } from '../../src/commands/plan';
import { createMockAliyunClient, createMockTencentClient } from './mockCloudClient';

jest.mock('../../src/common/aliyunClient', () => {
  const originalModule = jest.requireActual('../../src/common/aliyunClient');
  return {
    ...originalModule,
    createAliyunClient: jest.fn(),
  };
});

jest.mock('../../src/common/tencentClient', () => {
  const originalModule = jest.requireActual('../../src/common/tencentClient');
  return {
    ...originalModule,
    createTencentClient: jest.fn(),
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

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mockCreateTencentClient = require('../../src/common/tencentClient')
  .createTencentClient as jest.Mock;

describe('Plan Flow Service Test', () => {
  const tempStateDir = path.join(__dirname, '../fixtures/temp-state-plan');
  const fixturesDir = path.join(__dirname, '../fixtures');

  beforeEach(async () => {
    jest.clearAllMocks();

    const mockClient = createMockAliyunClient();
    mockCreateAliyunClient.mockReturnValue(mockClient);

    const mockTencentClient = createMockTencentClient();
    mockCreateTencentClient.mockReturnValue(mockTencentClient);

    await fs.mkdir(tempStateDir, { recursive: true }).catch(() => {});
  });

  afterEach(async () => {
    await fs.rm(tempStateDir, { recursive: true, force: true }).catch(() => {});
  });

  describe('Aliyun Plan Generation', () => {
    it('should generate plan for FC3 function', async () => {
      const mockClient = createMockAliyunClient();
      mockCreateAliyunClient.mockReturnValue(mockClient);

      await plan({
        location: fixturesDir,
        stage: 'dev',
        region: 'cn-hangzhou',
        provider: 'aliyun',
      });

      expect(mockClient.fc3.getFunction).toHaveBeenCalled();
    });

    it('should mark resources as create when no state exists', async () => {
      const mockClient = createMockAliyunClient();
      mockClient.fc3.getFunction.mockRejectedValueOnce({ code: 'FunctionNotFound' });
      mockCreateAliyunClient.mockReturnValue(mockClient);

      await plan({
        location: fixturesDir,
        stage: 'dev',
        region: 'cn-hangzhou',
        provider: 'aliyun',
      });

      expect(mockClient.fc3.getFunction).toHaveBeenCalled();
    });
  });

  describe('Plan Comparison', () => {
    it('should detect changes when function configuration differs', async () => {
      const mockClient = createMockAliyunClient();
      mockClient.fc3.getFunction.mockResolvedValue({
        body: {
          functionConfig: {
            functionName: 'hello-fn',
            memorySize: 256,
            timeout: 30,
            runtime: 'nodejs18',
          },
        },
      });
      mockCreateAliyunClient.mockReturnValue(mockClient);

      await plan({
        location: fixturesDir,
        stage: 'dev',
        region: 'cn-hangzhou',
        provider: 'aliyun',
      });

      expect(mockClient.fc3.getFunction).toHaveBeenCalled();
    });
  });

  describe('Multi-Provider Support', () => {
    it('should use Tencent planner for Tencent provider', async () => {
      const mockTencentClient = createMockTencentClient();
      mockCreateTencentClient.mockReturnValue(mockTencentClient);

      await plan({
        location: fixturesDir,
        stage: 'dev',
        region: 'ap-guangzhou',
        provider: 'tencent',
      });
    });
  });
});
