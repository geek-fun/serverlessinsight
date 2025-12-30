import * as tencentcloud from 'tencentcloud-sdk-nodejs-scf';
import * as cynosdb from 'tencentcloud-sdk-nodejs-cynosdb';
import COS from 'cos-nodejs-sdk-v5';
import { Context } from '../types';

const ScfClient = tencentcloud.scf.v20180416.Client;
const CynosdbClient = cynosdb.cynosdb.v20190107.Client;

type TencentCloudScfClient = InstanceType<typeof ScfClient>;
type TencentCosClient = COS;
type TencentCynosdbClient = InstanceType<typeof CynosdbClient>;

export interface TencentCloudClient {
  scf: TencentCloudScfClient;
  cos: TencentCosClient;
}

export const createTencentCloudClient = (context: Context): TencentCloudClient => {
  const scfClientConfig = {
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

  const scfClient = new ScfClient(scfClientConfig);

  const cosClient = new COS({
    SecretId: context.accessKeyId,
    SecretKey: context.accessKeySecret,
  });

  return {
    scf: scfClient,
    cos: cosClient,
  };
};

export const createTdsqlcClient = (context: Context): TencentCynosdbClient => {
  const clientConfig = {
    credential: {
      secretId: context.accessKeyId,
      secretKey: context.accessKeySecret,
    },
    region: context.region,
    profile: {
      httpProfile: {
        endpoint: 'cynosdb.tencentcloudapi.com',
      },
    },
  };

  return new CynosdbClient(clientConfig);
};
