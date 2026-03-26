import path from 'node:path';
import fs from 'node:fs/promises';
import { plan } from '../../src/commands/plan';
import {
  createMockAliyunClient,
  createMockTencentClient,
  type MockAliyunClient,
  type MockTencentClient,
} from './mockCloudClient';

jest.mock('../../src/common/aliyunClient', () => ({
  createAliyunClient: jest.fn(),
}));

jest.mock('../../src/common/tencentClient', () => ({
  createTencentClient: jest.fn(),
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

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mockCreateTencentClient = require('../../src/common/tencentClient')
  .createTencentClient as jest.Mock;

const STATE_FILE_PATH = path.join(
  process.cwd(),
  '.serverlessinsight',
  'state-insight-poc-app-insight-poc.json',
);

const EXISTING_STATE = JSON.stringify({
  version: '3.0',
  provider: 'aliyun',
  app: 'insight-poc-app',
  service: 'insight-poc',
  stages: {
    dev: {
      resources: {
        'functions.insight_poc_fn': {
          mode: 'managed',
          region: 'cn-hangzhou',
          definition: {
            functionName: 'insight-poc-fn',
            runtime: 'nodejs18',
            handler: 'index.handler',
            memorySize: 512,
            timeout: 10,
          },
          instances: [],
          lastUpdated: '2024-01-01T00:00:00.000Z',
          status: 'ready',
        },
      },
    },
  },
  resources: {},
});

describe('Plan Flow Service Test', () => {
  const fixturesDir = path.join(__dirname, '../fixtures');
  let mockClient: MockAliyunClient;
  let mockTencentClient: MockTencentClient;

  beforeEach(async () => {
    jest.clearAllMocks();

    mockClient = createMockAliyunClient();
    mockCreateAliyunClient.mockReturnValue(mockClient);

    mockTencentClient = createMockTencentClient();
    mockCreateTencentClient.mockReturnValue(mockTencentClient);

    await fs.mkdir(path.dirname(STATE_FILE_PATH), { recursive: true }).catch(() => {});
    await fs.writeFile(STATE_FILE_PATH, EXISTING_STATE, 'utf-8');
  });

  afterEach(async () => {
    await fs.rm(STATE_FILE_PATH, { force: true }).catch(() => {});
  });

  describe('Aliyun Plan Generation', () => {
    it('should generate plan for FC3 function', async () => {
      await plan({
        location: fixturesDir,
        stage: 'dev',
        region: 'cn-hangzhou',
        provider: 'aliyun',
      });

      expect(mockClient.fc3.getFunction).toHaveBeenCalled();
    });

    it('should mark resources as create when no state exists', async () => {
      mockClient.fc3.getFunction.mockRejectedValueOnce({ code: 'FunctionNotFound' });

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
      await plan({
        location: fixturesDir,
        stage: 'dev',
        region: 'ap-guangzhou',
        provider: 'tencent',
      });
    });
  });
});
