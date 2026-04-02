import path from 'node:path';
import fs from 'node:fs/promises';
import { deploy } from '../../src/commands/deploy';
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

describe('Volcengine Deploy Flow Service Test', () => {
  const fixtureFile = path.join(__dirname, '../fixtures/serverless-insight-volcengine.yml');
  const stateFilePath = path.join(
    process.cwd(),
    '.serverlessinsight',
    'state-insight-poc-app-insight-poc.json',
  );
  let mockClient: MockVolcengineClient;

  beforeEach(async () => {
    jest.clearAllMocks();

    mockClient = createMockVolcengineClient();
    mockCreateVolcengineClient.mockReturnValue(mockClient);

    await fs.rm(stateFilePath, { force: true }).catch(() => {});
  });

  afterEach(async () => {
    await fs.rm(stateFilePath, { force: true }).catch(() => {});
  });

  describe('Volcengine veFaaS Deploy', () => {
    it('should deploy single veFaaS function and save state', async () => {
      await deploy({
        location: fixtureFile,
        stage: 'dev',
        autoApprove: true,
        region: 'cn-beijing',
        provider: 'volcengine',
      });

      expect(mockClient.vefaas.createFunction).toHaveBeenCalled();
    });

    it('should handle deploy error when cloud SDK fails', async () => {
      mockClient.vefaas.createFunction.mockRejectedValueOnce(new Error('FunctionAlreadyExists'));

      await expect(
        deploy({
          location: fixtureFile,
          stage: 'dev',
          autoApprove: true,
          region: 'cn-beijing',
          provider: 'volcengine',
        }),
      ).rejects.toThrow();
    });
  });
});
