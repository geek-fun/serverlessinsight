import * as tencentcloud from 'tencentcloud-sdk-nodejs-scf';
import { Context } from '../types';

const ScfClient = tencentcloud.scf.v20180416.Client;

export type TencentCloudClient = InstanceType<typeof ScfClient>;

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
