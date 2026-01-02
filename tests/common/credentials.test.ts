import { getCredentials, hasCredentials } from '../../src/common/credentials';
import { ProviderEnum } from '../../src/common/providerEnum';

describe('credentials', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('getCredentials', () => {
    it('should return provided credentials when explicitly passed', () => {
      const config = {
        accessKeyId: 'explicit-key-id',
        accessKeySecret: 'explicit-secret',
        securityToken: 'explicit-token',
      };
      const result = getCredentials(config, ProviderEnum.ALIYUN);

      expect(result).toEqual(config);
    });

    it('should read Aliyun credentials from environment variables', () => {
      process.env.ALIYUN_ACCESS_KEY_ID = 'aliyun-key-id';
      process.env.ALIYUN_ACCESS_KEY_SECRET = 'aliyun-secret';
      process.env.ALIYUN_SECURITY_TOKEN = 'aliyun-token';

      const result = getCredentials(undefined, ProviderEnum.ALIYUN);

      expect(result).toEqual({
        accessKeyId: 'aliyun-key-id',
        accessKeySecret: 'aliyun-secret',
        securityToken: 'aliyun-token',
      });
    });

    it('should read Tencent credentials from environment variables', () => {
      process.env.TENCENTCLOUD_SECRET_ID = 'tencent-key-id';
      process.env.TENCENTCLOUD_SECRET_KEY = 'tencent-secret';
      process.env.TENCENTCLOUD_SECURITY_TOKEN = 'tencent-token';

      const result = getCredentials(undefined, ProviderEnum.TENCENT);

      expect(result).toEqual({
        accessKeyId: 'tencent-key-id',
        accessKeySecret: 'tencent-secret',
        securityToken: 'tencent-token',
      });
    });

    it('should read Huawei credentials from environment variables', () => {
      process.env.HUAWEICLOUD_ACCESS_KEY = 'huawei-key-id';
      process.env.HUAWEICLOUD_SECRET_KEY = 'huawei-secret';

      const result = getCredentials(undefined, ProviderEnum.HUAWEI);

      expect(result).toEqual({
        accessKeyId: 'huawei-key-id',
        accessKeySecret: 'huawei-secret',
        securityToken: undefined,
      });
    });

    it('should default to Aliyun when no provider is specified', () => {
      // Clear all credentials first
      delete process.env.ALIYUN_ACCESS_KEY_ID;
      delete process.env.ALIYUN_ACCESS_KEY_SECRET;
      delete process.env.ALIYUN_SECURITY_TOKEN;

      process.env.ALIYUN_ACCESS_KEY_ID = 'aliyun-key-id';
      process.env.ALIYUN_ACCESS_KEY_SECRET = 'aliyun-secret';

      const result = getCredentials();

      expect(result.accessKeyId).toBe('aliyun-key-id');
      expect(result.accessKeySecret).toBe('aliyun-secret');
    });

    it('should not mix credentials from different providers', () => {
      // Set credentials for all providers
      process.env.ALIYUN_ACCESS_KEY_ID = 'aliyun-key-id';
      process.env.ALIYUN_ACCESS_KEY_SECRET = 'aliyun-secret';
      process.env.TENCENTCLOUD_SECRET_ID = 'tencent-key-id';
      process.env.TENCENTCLOUD_SECRET_KEY = 'tencent-secret';
      process.env.HUAWEICLOUD_ACCESS_KEY = 'huawei-key-id';
      process.env.HUAWEICLOUD_SECRET_KEY = 'huawei-secret';

      // Each provider should only use its own credentials
      const aliyunResult = getCredentials(undefined, ProviderEnum.ALIYUN);
      expect(aliyunResult.accessKeyId).toBe('aliyun-key-id');
      expect(aliyunResult.accessKeySecret).toBe('aliyun-secret');

      const tencentResult = getCredentials(undefined, ProviderEnum.TENCENT);
      expect(tencentResult.accessKeyId).toBe('tencent-key-id');
      expect(tencentResult.accessKeySecret).toBe('tencent-secret');

      const huaweiResult = getCredentials(undefined, ProviderEnum.HUAWEI);
      expect(huaweiResult.accessKeyId).toBe('huawei-key-id');
      expect(huaweiResult.accessKeySecret).toBe('huawei-secret');
    });

    it('should prefer explicit config over environment variables', () => {
      process.env.ALIYUN_ACCESS_KEY_ID = 'env-key-id';
      process.env.ALIYUN_ACCESS_KEY_SECRET = 'env-secret';

      const config = {
        accessKeyId: 'explicit-key-id',
        accessKeySecret: 'explicit-secret',
      };
      const result = getCredentials(config, ProviderEnum.ALIYUN);

      expect(result.accessKeyId).toBe('explicit-key-id');
      expect(result.accessKeySecret).toBe('explicit-secret');
    });
  });

  describe('hasCredentials', () => {
    it('should return true when both accessKeyId and accessKeySecret are present', () => {
      const credentials = {
        accessKeyId: 'key-id',
        accessKeySecret: 'secret',
      };
      expect(hasCredentials(credentials)).toBe(true);
    });

    it('should return false when accessKeyId is missing', () => {
      const credentials = {
        accessKeySecret: 'secret',
      };
      expect(hasCredentials(credentials)).toBe(false);
    });

    it('should return false when accessKeySecret is missing', () => {
      const credentials = {
        accessKeyId: 'key-id',
      };
      expect(hasCredentials(credentials)).toBe(false);
    });

    it('should return false when both are missing', () => {
      const credentials = {};
      expect(hasCredentials(credentials)).toBe(false);
    });

    it('should return false when credentials are undefined', () => {
      const credentials = {
        accessKeyId: undefined,
        accessKeySecret: undefined,
      };
      expect(hasCredentials(credentials)).toBe(false);
    });
  });
});
