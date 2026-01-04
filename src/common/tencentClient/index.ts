import * as tencentcloud from 'tencentcloud-sdk-nodejs-scf';
import * as cynosdb from 'tencentcloud-sdk-nodejs-cynosdb';
import COS from 'cos-nodejs-sdk-v5';
import { Context } from '../../types';
import { createScfOperations } from './scfOperations';
import { createCosOperations } from './cosOperations';
import { createTdsqlcOperations } from './tdsqlcOperations';

// Re-export all types
export * from './types';

const ScfClient = tencentcloud.scf.v20180416.Client;
const CynosdbClient = cynosdb.cynosdb.v20190107.Client;

// Initialize SDK clients (internal)
const initializeSdkClients = (context: Context) => {
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

  const cynosdbClientConfig = {
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

  const cynosdbClient = new CynosdbClient(cynosdbClientConfig);

  return {
    scf: scfClient,
    cos: cosClient,
    cynosdb: cynosdbClient,
  };
};

export const createTencentClient = (context: Context) => {
  const sdkClients = initializeSdkClients(context);

  return {
    scf: createScfOperations(sdkClients.scf),
    cos: createCosOperations(sdkClients.cos),
    tdsqlc: createTdsqlcOperations(sdkClients.cynosdb, context),
  };
};
