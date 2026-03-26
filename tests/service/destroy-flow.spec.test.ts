import path from 'node:path';
import fs from 'node:fs/promises';
import { destroyStack } from '../../src/commands/destroy';
import { createMockAliyunClient } from './mockCloudClient';
import { ProviderEnum } from '../../src/common/providerEnum';
import type { Context } from '../../src/types';

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

const _createMockContext = (overrides?: Partial<Context>): Context =>
  ({
    provider: ProviderEnum.ALIYUN,
    region: 'cn-hangzhou',
    accessKeyId: 'test-access-key-id',
    accessKeySecret: 'test-access-key-secret',
    stage: 'dev',
    app: 'test-app',
    service: 'test-service',
    ...overrides,
  }) as Context;

describe('Destroy Flow Service Test', () => {
  const tempStateDir = path.join(__dirname, '../fixtures/temp-state-destroy');

  beforeEach(async () => {
    jest.clearAllMocks();

    const mockClient = createMockAliyunClient();
    mockCreateAliyunClient.mockReturnValue(mockClient);

    await fs.mkdir(tempStateDir, { recursive: true }).catch(() => {});
  });

  afterEach(async () => {
    await fs.rm(tempStateDir, { recursive: true, force: true }).catch(() => {});
  });

  describe('Aliyun Destroy', () => {
    it('should destroy FC3 function and clean state', async () => {
      const mockClient = createMockAliyunClient();
      mockCreateAliyunClient.mockReturnValue(mockClient);

      await destroyStack({
        location: path.join(__dirname, '../fixtures/deploy-fixtures'),
        stage: 'dev',
        region: 'cn-hangzhou',
        provider: 'aliyun',
      });

      expect(mockClient.fc3.deleteFunction).toHaveBeenCalled();
    });

    it('should handle destroy when resource does not exist', async () => {
      const mockClient = createMockAliyunClient();
      mockClient.fc3.getFunction.mockRejectedValueOnce({ code: 'FunctionNotFound' });
      mockClient.fc3.deleteFunction.mockRejectedValueOnce({ code: 'FunctionNotFound' });
      mockCreateAliyunClient.mockReturnValue(mockClient);

      await destroyStack({
        location: path.join(__dirname, '../fixtures/deploy-fixtures'),
        stage: 'dev',
        region: 'cn-hangzhou',
        provider: 'aliyun',
      });
    });
  });

  describe('Error Handling', () => {
    it('should throw error when destroy fails with access denied', async () => {
      const mockClient = createMockAliyunClient();
      mockClient.fc3.deleteFunction.mockRejectedValueOnce(new Error('AccessDenied'));
      mockCreateAliyunClient.mockReturnValue(mockClient);

      await expect(
        destroyStack({
          location: path.join(__dirname, '../fixtures/deploy-fixtures'),
          stage: 'dev',
          region: 'cn-hangzhou',
          provider: 'aliyun',
        }),
      ).rejects.toThrow();
    });
  });
});
