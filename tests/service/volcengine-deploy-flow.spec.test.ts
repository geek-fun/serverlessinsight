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
    'state-insight-volc-app-insight-volc.json',
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
      // The planner probes the provider on a fresh deploy and only proceeds
      // when a same-named remote function carries our ownership tag.
      mockClient.vefaas.getFunction.mockResolvedValue({
        functionId: 'func-123',
        functionName: 'insight-poc-fn',
        runtime: 'node20/v1',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
        status: 'Active',
        Tags: [
          { Key: 'si-owned-by', Value: 'insight-volc-app-insight-volc:functions.insight_poc_fn' },
        ],
      });

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

  describe('Volcengine Shared TLS Log Deploy', () => {
    const logFixtureFile = path.join(
      __dirname,
      '../fixtures/serverless-insight-volcengine-log.yml',
    );

    it('creates a shared app-scoped TLS project and a nested function topic', async () => {
      // Fresh probe: no remote function and no remote topic yet.
      mockClient.vefaas.getFunction.mockResolvedValue(null);
      mockClient.tls.getTopic.mockResolvedValue(null);

      await deploy({
        location: logFixtureFile,
        stage: 'dev',
        autoApprove: true,
        region: 'cn-beijing',
        provider: 'volcengine',
      });

      expect(mockClient.tls.createProject).toHaveBeenCalledWith(
        expect.objectContaining({ projectName: 'insight-volc-app-dev-tls' }),
      );
      expect(mockClient.tls.createTopic).toHaveBeenCalledWith(
        expect.objectContaining({
          projectName: 'insight-volc-app-dev-tls',
          topicName: 'insight-volc-dev-insight_poc_fn-fn-logs',
        }),
      );
      expect(mockClient.tls.addTags).toHaveBeenCalledWith(
        expect.objectContaining({
          resourceType: 'project',
          resourcesList: ['proj-123'],
          tags: [{ key: 'si-owned-by', value: 'insight-volc-app:shared:logs.project' }],
        }),
      );

      const saved = JSON.parse(await fs.readFile(stateFilePath, 'utf-8'));
      expect(saved.stages.dev.shared['logs.project']).toMatchObject({
        definition: { projectName: 'insight-volc-app-dev-tls' },
        instances: [
          expect.objectContaining({
            type: 'VOLCENGINE_TLS_PROJECT',
            id: 'insight-volc-app-dev-tls',
            projectId: 'proj-123',
          }),
        ],
      });
    });
  });
});
