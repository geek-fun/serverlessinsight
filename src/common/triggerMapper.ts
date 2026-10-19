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

/** Exact FC3 HTTP trigger write shape, also used for live comparison. */
export const buildAliyunHttpTriggerConfig = (trigger: {
  auth_type: AuthType;
  access?: AccessValue[];
}): { authType: string; methods: string[]; disableURLInternet?: boolean } => ({
  authType: mapAuthType(ProviderEnum.ALIYUN, trigger.auth_type),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH'],
  ...mapAliyunAccess(trigger.access),
});

export const buildTencentHttpTriggerDesc = (
  authType: string,
  netConfig: { enableIntranet?: boolean; enableExtranet?: boolean },
): string =>
  JSON.stringify({
    AuthType: authType,
    NetConfig: {
      EnableIntranet: netConfig.enableIntranet ?? false,
      EnableExtranet: netConfig.enableExtranet ?? true,
    },
  });
