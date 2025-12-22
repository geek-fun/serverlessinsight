export type Credentials = {
  accessKeyId?: string;
  accessKeySecret?: string;
  securityToken?: string;
};

export const getCredentials = (config?: {
  accessKeyId?: string;
  accessKeySecret?: string;
  securityToken?: string;
}): Credentials => {
  return {
    accessKeyId: config?.accessKeyId ?? process.env.ALIYUN_ACCESS_KEY_ID,
    accessKeySecret: config?.accessKeySecret ?? process.env.ALIYUN_ACCESS_KEY_SECRET,
    securityToken: config?.securityToken ?? process.env.ALIYUN_SECURITY_TOKEN,
  };
};

export const hasCredentials = (credentials: Credentials): boolean => {
  return !!credentials.accessKeyId && !!credentials.accessKeySecret;
};
