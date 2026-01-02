import { ProviderEnum } from './providerEnum';

export type Credentials = {
  accessKeyId?: string;
  accessKeySecret?: string;
  securityToken?: string;
};

export const getCredentials = (
  config?: {
    accessKeyId?: string;
    accessKeySecret?: string;
    securityToken?: string;
  },
  provider?: string,
): Credentials => {
  if (config?.accessKeyId && config?.accessKeySecret) {
    return {
      accessKeyId: config.accessKeyId,
      accessKeySecret: config.accessKeySecret,
      securityToken: config.securityToken,
    };
  }

  switch (provider) {
    case ProviderEnum.TENCENT:
      return {
        accessKeyId: config?.accessKeyId ?? process.env.TENCENTCLOUD_SECRET_ID,
        accessKeySecret: config?.accessKeySecret ?? process.env.TENCENTCLOUD_SECRET_KEY,
        securityToken: config?.securityToken ?? process.env.TENCENTCLOUD_SECURITY_TOKEN,
      };
    case ProviderEnum.HUAWEI:
      return {
        accessKeyId: config?.accessKeyId ?? process.env.HUAWEICLOUD_ACCESS_KEY,
        accessKeySecret: config?.accessKeySecret ?? process.env.HUAWEICLOUD_SECRET_KEY,
        securityToken: config?.securityToken,
      };
    case ProviderEnum.ALIYUN:
    default:
      return {
        accessKeyId: config?.accessKeyId ?? process.env.ALIYUN_ACCESS_KEY_ID,
        accessKeySecret: config?.accessKeySecret ?? process.env.ALIYUN_ACCESS_KEY_SECRET,
        securityToken: config?.securityToken ?? process.env.ALIYUN_SECURITY_TOKEN,
      };
  }
};

export const hasCredentials = (credentials: Credentials): boolean => {
  return !!credentials.accessKeyId && !!credentials.accessKeySecret;
};
