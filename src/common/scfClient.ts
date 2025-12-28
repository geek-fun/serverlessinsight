import * as tencentcloud from 'tencentcloud-sdk-nodejs-scf';
import COS from 'cos-nodejs-sdk-v5';
import { Context } from '../types';

const ScfClient = tencentcloud.scf.v20180416.Client;

export type TencentCloudClient = InstanceType<typeof ScfClient>;
export type TencentCosClient = COS;

export const createScfClient = (context: Context): TencentCloudClient => {
  const clientConfig = {
    credential: {
      secretId: context.accessKeyId,
      secretKey: context.accessKeySecret,
    },
    region: context.region,
    profile: {
      httpProfile: {
        endpoint: 'scf.tencentcloudapi.com',
      },
    },
  };
  return new ScfClient(clientConfig);
};

export const createCosClient = (context: Context): TencentCosClient => {
  const cosClient = new COS({
    SecretId: context.accessKeyId,
    SecretKey: context.accessKeySecret,
  });

  return cosClient;
};
