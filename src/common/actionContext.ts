import { ActionContext } from '../types';
import path from 'node:path';

export const constructActionContext = (config?: {
  region?: string;
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
    iacLocation: (() => {
      const projectRoot = path.resolve(process.cwd());
      return config?.location
        ? path.resolve(projectRoot, config?.location)
        : path.resolve(projectRoot, 'serverless-insight.yml');
    })(),
    parameters: Object.entries(config?.parameters ?? {}).map(([key, value]) => ({ key, value })),
  };
};
