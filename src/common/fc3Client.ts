import Client from '@alicloud/fc20230330';
import * as $OpenApi from '@alicloud/openapi-client';
import { Context } from '../types';

export type AliyunFc3Client = Client;

export const createAliyunFc3Client = (context: Context): AliyunFc3Client => {
  const config = new $OpenApi.Config({
    accessKeyId: context.accessKeyId,
    accessKeySecret: context.accessKeySecret,
    regionId: context.region,
    securityToken: context.securityToken,
  });

  config.endpoint = `${context.accountId}.${context.region}.fc.aliyuncs.com`;

  return new Client(config);
};
