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
  const fixturesDir = path.join(__dirname, '../fixtures');
  const stateFilePath = path.join(
    process.cwd(),
    '.serverlessinsight',
    'state-insight-poc-deploy-app-insight-poc-deploy.json',
  );
  let mockClient: MockAliyunClient;

  beforeEach(async () => {
    jest.clearAllMocks();

    mockClient = createMockAliyunClient();
    mockCreateAliyunClient.mockReturnValue(mockClient);

    await fs.rm(stateFilePath, { force: true }).catch(() => {});
  });

  afterEach(async () => {
    await fs.rm(stateFilePath, { force: true }).catch(() => {});
  });

  describe('Aliyun FC3 Deploy', () => {
    it('should deploy single FC3 function and save state', async () => {
      await deploy({
        location: path.join(fixturesDir, 'serverless-insight-deploy.yml'),
        stage: 'dev',
        autoApprove: true,
        region: 'cn-hangzhou',
        provider: 'aliyun',
      });

      expect(mockClient.fc3.createFunction).toHaveBeenCalled();
    });

    it('should deploy a bare function-name backend end to end (issue #227)', async () => {
      await deploy({
        location: path.join(fixturesDir, 'serverless-insight-deploy-bare-name.yml'),
        stage: 'dev',
        autoApprove: true,
        region: 'cn-hangzhou',
        provider: 'aliyun',
      });

      expect(mockClient.fc3.createFunction).toHaveBeenCalled();

      // The managed role must trust apigateway so the gateway can assume it.
      expect(mockClient.ram.createRole).toHaveBeenCalled();
      expect(mockClient.ram.createRole.mock.calls[0][1]).toEqual([
        'fc.aliyuncs.com',
        'apigateway.aliyuncs.com',
      ]);

      // The API must target the resolved function name with the managed role.
      expect(mockClient.apigw.createApi).toHaveBeenCalledWith(
        expect.objectContaining({
          serviceConfig: expect.objectContaining({
            functionComputeConfig: expect.objectContaining({
              functionName: 'insight-poc-fn',
              roleArn: expect.any(String),
            }),
          }),
        }),
      );
    });

    it('should handle deploy error when cloud SDK fails', async () => {
      mockClient.fc3.createFunction.mockRejectedValueOnce(new Error('FunctionAlreadyExists'));

      await expect(
        deploy({
          location: path.join(fixturesDir, 'serverless-insight-deploy.yml'),
          stage: 'dev',
          autoApprove: true,
          region: 'cn-hangzhou',
          provider: 'aliyun',
        }),
      ).rejects.toThrow();
    });
  });
});
