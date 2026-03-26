import { createEsOperations, EsAppStatus } from '../../../../src/common/aliyunClient/esOperations';
import type { Context } from '../../../../src/types';

const mockCreateApp = jest.fn();
const mockGetApp = jest.fn();
const mockUpdateApp = jest.fn();
const mockDeleteApp = jest.fn();

const mockEsClient = {
  createApp: mockCreateApp,
  getApp: mockGetApp,
  updateApp: mockUpdateApp,
  deleteApp: mockDeleteApp,
} as unknown as Context;

jest.mock('../../../../src/common/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

jest.mock('../../../../src/lang', () => ({
  lang: {
    __: (key: string, params?: Record<string, string>) => {
      if (params) return `${key}:${JSON.stringify(params)}`;
      return key;
    },
  },
}));

const mockContext: Context = {
  app: 'test-app',
  stage: 'dev',
  region: 'cn-hangzhou',
  provider: {
    name: 'aliyun',
    accessKeyId: 'test-key',
    accessKeySecret: 'test-secret',
  },
} as unknown as Context;

describe('esOperations', () => {
  let operations: ReturnType<typeof createEsOperations>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    operations = createEsOperations(mockEsClient, mockContext);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('createApp', () => {
    it('should create ES app successfully', async () => {
      const appId = 'app-12345';
      mockCreateApp.mockResolvedValue({
        body: {
          result: {
            appId,
            appName: 'test-app',
            version: '7.10',
            status: EsAppStatus.ACTIVE,
          },
        },
      });

      mockGetApp.mockResolvedValue({
        body: {
          result: {
            appId,
            appName: 'test-app',
            version: '7.10',
            status: EsAppStatus.ACTIVE,
            regionId: 'cn-hangzhou',
          },
        },
      });

      const result = await operations.createApp({
        appName: 'test-app',
        appVersion: '7.10',
        description: 'Test app',
        regionId: 'cn-hangzhou',
      });

      expect(result).toBe(appId);
      expect(mockCreateApp).toHaveBeenCalled();
    });

    it('should create app with default region from context', async () => {
      mockCreateApp.mockResolvedValue({
        body: {
          result: {
            appId: 'app-123',
            appName: 'test-app',
            version: '7.10',
            status: EsAppStatus.ACTIVE,
          },
        },
      });

      mockGetApp.mockResolvedValue({
        body: {
          result: {
            appId: 'app-123',
            status: EsAppStatus.ACTIVE,
          },
        },
      });

      await operations.createApp({
        appName: 'test-app',
        appVersion: '7.10',
      });

      const callArgs = mockCreateApp.mock.calls[0][0];
      expect(callArgs.regionId).toBe('cn-hangzhou');
    });

    it('should throw error when no appId returned from creation', async () => {
      mockCreateApp.mockResolvedValue({
        body: {
          result: {
            // missing appId
            appName: 'test-app',
          },
        },
      });

      await expect(
        operations.createApp({
          appName: 'test-app',
          appVersion: '7.10',
        }),
      ).rejects.toThrow('ES_APP_NO_ID_RETURNED');
    });

    it('should wait for app to become ACTIVE', async () => {
      const appId = 'app-123';
      mockCreateApp.mockResolvedValue({
        body: {
          result: {
            appId,
            appName: 'test-app',
            version: '7.10',
            status: EsAppStatus.CREATING,
          },
        },
      });

      // First call returns CREATING, second returns ACTIVE
      mockGetApp
        .mockResolvedValueOnce({
          body: {
            result: {
              appId,
              status: EsAppStatus.CREATING,
            },
          },
        })
        .mockResolvedValueOnce({
          body: {
            result: {
              appId,
              status: EsAppStatus.ACTIVE,
            },
          },
        });

      const resultPromise = operations.createApp({
        appName: 'test-app',
        appVersion: '7.10',
      });

      jest.advanceTimersByTime(10000);

      const result = await resultPromise;
      expect(result).toBe(appId);
    });

    it('should throw error when app enters FAILED status', async () => {
      mockCreateApp.mockResolvedValue({
        body: {
          result: {
            appId: 'app-123',
            status: EsAppStatus.FAILED,
          },
        },
      });

      mockGetApp.mockResolvedValue({
        body: {
          result: {
            appId: 'app-123',
            status: EsAppStatus.FAILED,
          },
        },
      });

      await expect(
        operations.createApp({
          appName: 'test-app',
          appVersion: '7.10',
        }),
      ).rejects.toThrow('ES_APP_ERROR_STATE');
    });

    it('should throw error when creation times out (max attempts exceeded)', async () => {
      mockCreateApp.mockResolvedValue({
        body: {
          result: {
            appId: 'app-123',
            status: EsAppStatus.CREATING,
          },
        },
      });

      mockGetApp.mockResolvedValue({
        body: {
          result: {
            appId: 'app-123',
            status: EsAppStatus.CREATING,
          },
        },
      });

      const resultPromise = operations.createApp({
        appName: 'test-app',
        appVersion: '7.10',
      });

      // Advance time past all 60 attempts (60 * 10000ms)
      jest.advanceTimersByTime(610000);

      await expect(resultPromise).rejects.toThrow('ES_APP_TIMEOUT_READY');
    });

    it('should throw error with creation failure details', async () => {
      mockCreateApp.mockRejectedValue(new Error('Insufficient quota'));

      await expect(
        operations.createApp({
          appName: 'test-app',
          appVersion: '7.10',
        }),
      ).rejects.toThrow('Insufficient quota');
    });

    it('should create app with all optional config', async () => {
      mockCreateApp.mockResolvedValue({
        body: {
          result: {
            appId: 'app-123',
            status: EsAppStatus.ACTIVE,
          },
        },
      });

      mockGetApp.mockResolvedValue({
        body: {
          result: {
            appId: 'app-123',
            status: EsAppStatus.ACTIVE,
          },
        },
      });

      await operations.createApp({
        appName: 'test-app',
        appVersion: '7.10',
        description: 'Test ES cluster',
        chargeType: 'POSTPAY',
        scenario: 'log',
        authentication: {
          basicAuth: [
            {
              username: 'admin',
              password: 'secret',
            },
          ],
        },
        quotaInfo: {
          appType: 'elasticsearch',
          cu: 10,
          storage: 100,
        },
        tags: [
          {
            key: 'env',
            value: 'dev',
          },
        ],
      });

      const callArgs = mockCreateApp.mock.calls[0][0];
      expect(callArgs.description).toBe('Test ES cluster');
      expect(callArgs.chargeType).toBe('POSTPAY');
      expect(callArgs.scenario).toBe('log');
      expect(callArgs.authentication).toBeDefined();
    });
  });

  describe('getApp', () => {
    it('should get app by name', async () => {
      mockGetApp.mockResolvedValue({
        body: {
          result: {
            appId: 'app-123',
            appName: 'test-app',
            appType: 'elasticsearch',
            status: EsAppStatus.ACTIVE,
            version: '7.10',
            regionId: 'cn-hangzhou',
            ownerId: '123456789',
            chargeType: 'POSTPAY',
            description: 'Test app',
            createTime: '2023-01-01T00:00:00Z',
            modifiedTime: '2023-01-02T00:00:00Z',
            scenario: 'log',
          },
        },
      });

      const result = await operations.getApp('test-app');

      expect(result).toBeDefined();
      expect(result?.appId).toBe('app-123');
      expect(result?.appName).toBe('test-app');
      expect(result?.status).toBe(EsAppStatus.ACTIVE);
      expect(mockGetApp).toHaveBeenCalledWith('test-app', expect.anything());
    });

    it('should return null when app not found', async () => {
      mockGetApp.mockResolvedValue({
        body: {
          result: null,
        },
      });

      const result = await operations.getApp('non-existent');

      expect(result).toBeNull();
    });

    it('should return null when response body is missing', async () => {
      mockGetApp.mockResolvedValue({
        body: null,
      });

      const result = await operations.getApp('test-app');

      expect(result).toBeNull();
    });

    it('should get app with network configuration', async () => {
      mockGetApp.mockResolvedValue({
        body: {
          result: {
            appId: 'app-123',
            appName: 'test-app',
            status: EsAppStatus.ACTIVE,
            network: [
              {
                type: 'INTERNET',
                enabled: true,
                domain: 'test-app.elasticsearch.cn-hangzhou.aliyuncs.com',
                port: 9200,
                whiteIpGroup: [
                  {
                    groupName: 'default',
                    ips: ['192.168.1.0/24'],
                  },
                ],
              },
            ],
          },
        },
      });

      const result = await operations.getApp('test-app');

      expect(result?.network).toBeDefined();
      expect(result?.network?.[0].domain).toBe('test-app.elasticsearch.cn-hangzhou.aliyuncs.com');
      expect(result?.network?.[0].whiteIpGroup?.[0].ips).toContain('192.168.1.0/24');
    });

    it('should get app with private network configuration', async () => {
      mockGetApp.mockResolvedValue({
        body: {
          result: {
            appId: 'app-123',
            appName: 'test-app',
            status: EsAppStatus.ACTIVE,
            privateNetwork: [
              {
                type: 'VPC',
                enabled: true,
                vpcId: 'vpc-123',
                pvlEndpointId: 'ep-123',
                domain: 'test-app-vpc.elasticsearch.cn-hangzhou.aliyuncs.com',
                port: 9200,
              },
            ],
          },
        },
      });

      const result = await operations.getApp('test-app');

      expect(result?.privateNetwork).toBeDefined();
      expect(result?.privateNetwork?.[0].vpcId).toBe('vpc-123');
      expect(result?.privateNetwork?.[0].pvlEndpointId).toBe('ep-123');
    });

    it('should get app with tags', async () => {
      mockGetApp.mockResolvedValue({
        body: {
          result: {
            appId: 'app-123',
            appName: 'test-app',
            status: EsAppStatus.ACTIVE,
            tags: [
              {
                key: 'env',
                value: 'production',
              },
              {
                key: 'team',
                value: 'platform',
              },
            ],
          },
        },
      });

      const result = await operations.getApp('test-app');

      expect(result?.tags).toBeDefined();
      expect(result?.tags).toHaveLength(2);
      expect(result?.tags?.[0].key).toBe('env');
      expect(result?.tags?.[1].value).toBe('platform');
    });

    it('should handle error and log warning', async () => {
      mockGetApp.mockRejectedValue(new Error('Network error'));

      const result = await operations.getApp('test-app');

      expect(result).toBeNull();
    });
  });

  describe('updateApp', () => {
    it('should update app successfully', async () => {
      mockUpdateApp.mockResolvedValue({});
      mockGetApp.mockResolvedValue({
        body: {
          result: {
            appId: 'app-123',
            status: EsAppStatus.ACTIVE,
          },
        },
      });

      await operations.updateApp('test-app', {
        appName: 'test-app',
        appVersion: '7.10',
        description: 'Updated description',
      });

      expect(mockUpdateApp).toHaveBeenCalledWith('test-app', expect.anything());
    });

    it('should update app with authentication config', async () => {
      mockUpdateApp.mockResolvedValue({});
      mockGetApp.mockResolvedValue({
        body: {
          result: {
            appId: 'app-123',
            status: EsAppStatus.ACTIVE,
          },
        },
      });

      await operations.updateApp('test-app', {
        appName: 'test-app',
        appVersion: '7.10',
        authentication: {
          basicAuth: [
            {
              username: 'admin',
              password: 'newpassword',
            },
          ],
        },
      });

      const callArgs = mockUpdateApp.mock.calls[0][0];
      expect(callArgs.authentication).toBeDefined();
    });

    it('should wait for app to be ACTIVE after update', async () => {
      mockUpdateApp.mockResolvedValue({});

      mockGetApp
        .mockResolvedValueOnce({
          body: {
            result: {
              appId: 'app-123',
              status: EsAppStatus.CREATING,
            },
          },
        })
        .mockResolvedValueOnce({
          body: {
            result: {
              appId: 'app-123',
              status: EsAppStatus.ACTIVE,
            },
          },
        });

      const resultPromise = operations.updateApp('test-app', {
        appName: 'test-app',
        appVersion: '7.10',
        description: 'Updated',
      });

      jest.advanceTimersByTime(10000);

      await resultPromise;

      expect(mockGetApp).toHaveBeenCalled();
    });

    it('should throw error when update fails', async () => {
      mockUpdateApp.mockRejectedValue(new Error('Update failed'));

      await expect(
        operations.updateApp('test-app', {
          appName: 'test-app',
          appVersion: '7.10',
        }),
      ).rejects.toThrow('Update failed');
    });

    it('should throw timeout error when app not ready', async () => {
      mockUpdateApp.mockResolvedValue({});
      mockGetApp.mockResolvedValue({
        body: {
          result: {
            appId: 'app-123',
            status: EsAppStatus.CREATING,
          },
        },
      });

      const resultPromise = operations.updateApp('test-app', {
        appName: 'test-app',
        appVersion: '7.10',
      });

      jest.advanceTimersByTime(610000);

      await expect(resultPromise).rejects.toThrow();
    });
  });

  describe('deleteApp', () => {
    it('should delete app successfully', async () => {
      mockDeleteApp.mockResolvedValue({});
      mockGetApp.mockResolvedValue(null);

      await operations.deleteApp('test-app');

      expect(mockDeleteApp).toHaveBeenCalledWith('test-app');
    });

    it('should wait for app to be deleted', async () => {
      mockDeleteApp.mockResolvedValue({});

      mockGetApp
        .mockResolvedValueOnce({
          body: {
            result: {
              appId: 'app-123',
              status: EsAppStatus.DELETING,
            },
          },
        })
        .mockResolvedValueOnce(null);

      const resultPromise = operations.deleteApp('test-app');

      jest.advanceTimersByTime(10000);

      await resultPromise;

      expect(mockGetApp).toHaveBeenCalled();
    });

    it('should handle error when app not found during deletion', async () => {
      mockDeleteApp.mockRejectedValue(
        Object.assign(new Error('AppNotFound'), { code: 'AppNotFound' }),
      );

      // Should not throw when app is already deleted
      await operations.deleteApp('test-app');
    });

    it('should handle NotFound error code', async () => {
      mockDeleteApp.mockRejectedValue(Object.assign(new Error('NotFound'), { code: 'NotFound' }));

      await operations.deleteApp('test-app');
    });

    it('should throw error when deletion fails', async () => {
      mockDeleteApp.mockRejectedValue(new Error('Permission denied'));

      await expect(operations.deleteApp('test-app')).rejects.toThrow('Permission denied');
    });

    it('should throw timeout error when deletion takes too long', async () => {
      mockDeleteApp.mockResolvedValue({});

      mockGetApp.mockResolvedValue({
        body: {
          result: {
            appId: 'app-123',
            status: EsAppStatus.DELETING,
          },
        },
      });

      const resultPromise = operations.deleteApp('test-app');

      jest.advanceTimersByTime(610000);

      await expect(resultPromise).rejects.toThrow('ES_APP_TIMEOUT_DELETE');
    });
  });

  describe('deleteApp edge cases', () => {
    it('should handle case when getApp returns undefined result', async () => {
      mockDeleteApp.mockResolvedValue({});
      mockGetApp.mockResolvedValue({
        body: {
          result: undefined,
        },
      });

      await operations.deleteApp('test-app');
    });

    it('should continue polling when status is not DELETING', async () => {
      mockDeleteApp.mockResolvedValue({});

      mockGetApp
        .mockResolvedValueOnce({
          body: {
            result: {
              appId: 'app-123',
              status: EsAppStatus.ACTIVE,
            },
          },
        })
        .mockResolvedValueOnce({
          body: {
            result: {
              appId: 'app-123',
              status: EsAppStatus.DELETING,
            },
          },
        })
        .mockResolvedValueOnce(null);

      const resultPromise = operations.deleteApp('test-app');

      jest.advanceTimersByTime(20000);

      await resultPromise;
    });
  });
});
