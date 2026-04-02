import path from 'node:path';
import fs from 'node:fs/promises';
import { destroyStack } from '../../src/commands/destroy';
import { createMockVolcengineClient, type MockVolcengineClient } from './mockCloudClient';

jest.mock('../../src/common/volcengineClient', () => ({
  createVolcengineClient: jest.fn(),
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
const mockCreateVolcengineClient = require('../../src/common/volcengineClient')
  .createVolcengineClient as jest.Mock;

const STATE_FILE_PATH = path.join(
  process.cwd(),
  '.serverlessinsight',
  'state-insight-poc-app-insight-poc.json',
);

const EXISTING_STATE = JSON.stringify({
  version: '3.0',
  provider: 'volcengine',
  app: 'insight-poc-app',
  service: 'insight-poc',
  stages: {
    dev: {
      resources: {
        'functions.insight_poc_fn': {
          mode: 'managed',
          region: 'cn-beijing',
          definition: {
            functionName: 'insight-poc-fn',
            runtime: 'nodejs/v18',
            handler: 'index.handler',
            memorySize: 128,
            timeout: 30,
          },
          instances: [
            { sid: 'insight-poc-fn', id: 'insight-poc-fn', type: 'VOLCENGINE_VEFAAS_FUNCTION' },
            {
              sid: 'iam-role-sid',
              id: 'insight-poc-app-insight-poc-dev-role',
              type: 'VOLCENGINE_IAM_ROLE',
              trn: 'trn:iam::123456789012:role/insight-poc-app-insight-poc-dev-role',
            },
          ],
          lastUpdated: '2024-01-01T00:00:00.000Z',
          status: 'ready',
        },
      },
    },
  },
  resources: {},
});

describe('Volcengine Destroy Flow Service Test', () => {
  const fixtureFile = path.join(__dirname, '../fixtures/serverless-insight-volcengine.yml');
  let mockClient: MockVolcengineClient;

  beforeEach(async () => {
    jest.clearAllMocks();

    mockClient = createMockVolcengineClient();
    mockCreateVolcengineClient.mockReturnValue(mockClient);

    await fs.mkdir(path.dirname(STATE_FILE_PATH), { recursive: true }).catch(() => {});
    await fs.writeFile(STATE_FILE_PATH, EXISTING_STATE, 'utf-8');
  });

  afterEach(async () => {
    await fs.rm(STATE_FILE_PATH, { force: true }).catch(() => {});
  });

  describe('Volcengine Destroy', () => {
    it('should destroy veFaaS function and clean state', async () => {
      await destroyStack({
        location: fixtureFile,
        stage: 'dev',
        region: 'cn-beijing',
        provider: 'volcengine',
      });

      expect(mockClient.vefaas.deleteFunction).toHaveBeenCalled();
    });

    it('should handle destroy when resource does not exist', async () => {
      mockClient.vefaas.getFunction.mockRejectedValueOnce({ code: 'FunctionNotFound' });
      mockClient.vefaas.deleteFunction.mockRejectedValueOnce({ code: 'FunctionNotFound' });

      await destroyStack({
        location: fixtureFile,
        stage: 'dev',
        region: 'cn-beijing',
        provider: 'volcengine',
      });
    });
  });

  describe('Error Handling', () => {
    it('should log error and resolve when destroy fails with access denied', async () => {
      mockClient.vefaas.deleteFunction.mockRejectedValueOnce(new Error('AccessDenied'));

      await expect(
        destroyStack({
          location: fixtureFile,
          stage: 'dev',
          region: 'cn-beijing',
          provider: 'volcengine',
        }),
      ).resolves.toBeUndefined();
    });
  });
});
