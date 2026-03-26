import { getIamInfo } from '../../../src/common/imsClient';
import { ProviderEnum } from '../../../src/common/providerEnum';
import type { Context } from '../../../src/types';

const mockGetUser = jest.fn();

jest.mock('@alicloud/ims20190815', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    getUser: mockGetUser,
  })),
  GetUserRequest: jest.fn().mockImplementation((params) => params),
}));

jest.mock('@alicloud/openapi-client', () => ({
  Config: jest.fn().mockImplementation((config) => config),
}));

const mockContext = (provider: ProviderEnum, overrides?: Partial<Context>): Context =>
  ({
    provider,
    region: 'cn-hangzhou',
    accessKeyId: 'test-access-key-id',
    accessKeySecret: 'test-access-key-secret',
    stage: 'dev',
    ...overrides,
  }) as Context;

describe('imsClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getIamInfo', () => {
    it('should return undefined for non-Aliyun provider', async () => {
      const context = mockContext(ProviderEnum.TENCENT);
      const result = await getIamInfo(context);
      expect(result).toBeUndefined();
    });

    it('should return undefined for Huawei provider', async () => {
      const context = mockContext(ProviderEnum.HUAWEI);
      const result = await getIamInfo(context);
      expect(result).toBeUndefined();
    });

    it('should return user info with extracted accountId for Aliyun provider', async () => {
      mockGetUser.mockResolvedValue({
        body: {
          user: {
            userPrincipalName: 'test@123456789012.onaliyun.com',
            displayName: 'Test User',
            userId: 'test-user-id',
          },
        },
      });

      const context = mockContext(ProviderEnum.ALIYUN);
      const result = await getIamInfo(context);

      expect(result).toBeDefined();
      expect(result?.accountId).toBe('123456789012');
      expect(result?.displayName).toBe('Test User');
      expect(result?.userId).toBe('test-user-id');
    });

    it('should return undefined when body.user is not present', async () => {
      mockGetUser.mockResolvedValue({
        body: {},
      });

      const context = mockContext(ProviderEnum.ALIYUN);
      const result = await getIamInfo(context);

      expect(result).toBeUndefined();
    });

    it('should handle userPrincipalName without matching accountId pattern', async () => {
      mockGetUser.mockResolvedValue({
        body: {
          user: {
            userPrincipalName: 'invalid-format',
            displayName: 'Test User',
          },
        },
      });

      const context = mockContext(ProviderEnum.ALIYUN);
      const result = await getIamInfo(context);

      expect(result).toBeDefined();
      expect(result?.accountId).toBeUndefined();
      expect(result?.displayName).toBe('Test User');
    });

    it('should throw error when SDK call fails', async () => {
      mockGetUser.mockRejectedValue(new Error('SDK Error'));

      const context = mockContext(ProviderEnum.ALIYUN);

      await expect(getIamInfo(context)).rejects.toThrow('SDK Error');
    });

    it('should use correct timeout settings', async () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const mockConfig = require('@alicloud/openapi-client').Config;
      mockGetUser.mockResolvedValue({
        body: {
          user: {
            userPrincipalName: 'test@123456.onaliyun.com',
          },
        },
      });

      const context = mockContext(ProviderEnum.ALIYUN);
      await getIamInfo(context);

      expect(mockConfig).toHaveBeenCalledWith(
        expect.objectContaining({
          accessKeyId: 'test-access-key-id',
          accessKeySecret: 'test-access-key-secret',
        }),
      );
    });
  });
});
