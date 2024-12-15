import { ActionContext } from '../types';
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

export const constructActionContext = (config?: {
  region?: string;
  provider?: string;
  account?: string;
  accessKeyId?: string;
  accessKeySecret?: string;
  securityToken?: string;
  location?: string;
  parameters?: { [key: string]: string };
  stage?: string;
  stackName?: string;
}): ActionContext => {
  return {
    stage: config?.stage ?? 'default',
    stackName: config?.stackName ?? '',
    region:
      config?.region ?? process.env.ROS_REGION_ID ?? process.env.ALIYUN_REGION ?? 'cn-hangzhou',
    accessKeyId: config?.accessKeyId ?? (process.env.ALIYUN_ACCESS_KEY_ID as string),
    accessKeySecret: config?.accessKeySecret ?? (process.env.ALIYUN_ACCESS_KEY_SECRET as string),
    securityToken: config?.securityToken ?? process.env.ALIYUN_SECURITY_TOKEN,
    iacLocation: getIacLocation(config?.location),
    parameters: Object.entries(config?.parameters ?? {}).map(([key, value]) => ({ key, value })),
    provider: config?.provider as ProviderEnum,
  };
};
