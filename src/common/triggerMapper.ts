import { ProviderEnum } from './providerEnum';

type AuthType = 'public' | 'iam';

type AccessValue = 'public' | 'internal';

export const mapAuthType = (provider: ProviderEnum, authType: AuthType): string => {
  switch (provider) {
    case ProviderEnum.TENCENT:
      return authType === 'public' ? 'NONE' : 'CAM';
    case ProviderEnum.ALIYUN:
      return authType === 'public' ? 'anonymous' : 'function';
    case ProviderEnum.AWS:
      return authType === 'public' ? 'NONE' : 'AWS_IAM';
    default:
      return authType === 'public' ? 'NONE' : 'CAM';
  }
};

export const mapAccess = (
  access?: Array<AccessValue>,
): { enableExtranet?: boolean; enableIntranet?: boolean } => {
  if (!access || access.length === 0) {
    return {};
  }
  return {
    enableExtranet: access.includes('public'),
    enableIntranet: access.includes('internal'),
  };
};

export const mapAliyunAccess = (access?: Array<AccessValue>): { disableURLInternet?: boolean } => {
  if (!access || access.length === 0) {
    return {};
  }
  return {
    disableURLInternet: !access.includes('public') && access.includes('internal'),
  };
};
