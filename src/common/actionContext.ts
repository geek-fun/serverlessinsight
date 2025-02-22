import { ActionContext, ServerlessIac } from '../types';
import path from 'node:path';
import { ProviderEnum } from './providerEnum';

export const getIacLocation = (location?: string): string => {
  const projectRoot = path.resolve(process.cwd());
  return location
    ? path.resolve(projectRoot, location)
    : path.resolve(projectRoot, 'serverlessinsight.yml') ||
        path.resolve(projectRoot, 'serverlessInsight.yml') ||
        path.resolve(projectRoot, 'ServerlessInsight.yml') ||
        path.resolve(projectRoot, 'serverless-insight.yml');
};

export const constructActionContext = (config: {
  stage?: string;
  stackName?: string;
  region?: string;
  provider?: string;
  accessKeyId?: string;
  accessKeySecret?: string;
  securityToken?: string;
  location?: string;
  parameters?: { [key: string]: string };
  iacProvider?: ServerlessIac['provider'];
}): ActionContext => {
  return {
    stage: config.stage ?? 'default',
    stackName: config.stackName ?? '',
    provider: (config.provider ?? config.iacProvider?.name ?? ProviderEnum.ALIYUN) as ProviderEnum,
    region:
      config.region ??
      config.iacProvider?.region ??
      process.env.ROS_REGION_ID ??
      process.env.ALIYUN_REGION ??
      'cn-hangzhou',
    accessKeyId: config.accessKeyId ?? (process.env.ALIYUN_ACCESS_KEY_ID as string),
    accessKeySecret: config.accessKeySecret ?? (process.env.ALIYUN_ACCESS_KEY_SECRET as string),
    securityToken: config.securityToken ?? process.env.ALIYUN_SECURITY_TOKEN,
    iacLocation: getIacLocation(config.location),
    parameters: Object.entries(config.parameters ?? {}).map(([key, value]) => ({ key, value })),
  };
};
