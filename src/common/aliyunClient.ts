import Fc3Client from '@alicloud/fc20230330';
import * as $OpenApi from '@alicloud/openapi-client';
import OSS from 'ali-oss';
import { Context } from '../types';

type AliyunFc3Client = Fc3Client;
type AliyunOssClient = OSS;

export interface AliyunClient {
  fc3: AliyunFc3Client;
  oss: AliyunOssClient;
}

export const createAliyunClient = (context: Context): AliyunClient => {
  const fc3Config = new $OpenApi.Config({
    accessKeyId: context.accessKeyId,
    accessKeySecret: context.accessKeySecret,
    regionId: context.region,
    securityToken: context.securityToken,
  });

  fc3Config.endpoint = `${context.accountId}.${context.region}.fc.aliyuncs.com`;

  const fc3Client = new Fc3Client(fc3Config);

  const ossClient = new OSS({
    accessKeyId: context.accessKeyId,
    accessKeySecret: context.accessKeySecret,
    region: `oss-${context.region}`,
    stsToken: context.securityToken,
  });

  return {
    fc3: fc3Client,
    oss: ossClient,
  };
};
