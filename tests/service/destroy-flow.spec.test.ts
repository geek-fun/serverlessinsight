import path from 'node:path';
import fs from 'node:fs/promises';

import { cleanScopedState } from './scopedState';
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

// Issue #280: destroy reads the scoped V4 document for its Stage/Region scope.
const STATE_FILE_PATH = path.join(
  process.cwd(),
  '.serverlessinsight',
  'states',
  'insight-poc-destroy-app',
  'insight-poc-destroy_dev_cn-hangzhou_state.json',
);

const EXISTING_STATE = JSON.stringify({
  version: '4.0',
  scope: { stage: 'dev', region: 'cn-hangzhou' },
  lineage: 'destroy-flow-lineage',
  serial: 1,
  provider: 'aliyun',
  app: 'insight-poc-destroy-app',
  service: 'insight-poc-destroy',
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
          instances: [{ sid: 'insight-poc-fn', id: 'insight-poc-fn', type: 'ALIYUN_FC3_FUNCTION' }],
          lastUpdated: '2024-01-01T00:00:00.000Z',
          status: 'ready',
        },
      },
    },
  },
  resources: {},
});

describe('Destroy Flow Service Test', () => {
  const fixturesDir = path.join(__dirname, '../fixtures');
  let mockClient: MockAliyunClient;

  beforeEach(async () => {
    jest.clearAllMocks();

    mockClient = createMockAliyunClient();
    mockCreateAliyunClient.mockReturnValue(mockClient);

    await cleanScopedState('insight-poc-destroy-app', 'insight-poc-destroy');
    await fs.mkdir(path.dirname(STATE_FILE_PATH), { recursive: true }).catch(() => {});
    await fs.writeFile(STATE_FILE_PATH, EXISTING_STATE, 'utf-8');
  });

  afterEach(async () => {
    await cleanScopedState('insight-poc-destroy-app', 'insight-poc-destroy');
  });

  describe('Aliyun Destroy', () => {
    it('should destroy FC3 function and clean state', async () => {
      await destroyStack({
        location: path.join(fixturesDir, 'serverless-insight-destroy.yml'),
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
        location: path.join(fixturesDir, 'serverless-insight-destroy.yml'),
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
          location: path.join(fixturesDir, 'serverless-insight-destroy.yml'),
          stage: 'dev',
          region: 'cn-hangzhou',
          provider: 'aliyun',
        }),
      ).rejects.toThrow();
    });
  });
});
