import * as tencentcloud from 'tencentcloud-sdk-nodejs-scf';
import * as cynosdb from 'tencentcloud-sdk-nodejs-cynosdb';
import * as tencentCam from 'tencentcloud-sdk-nodejs-cam';
import * as tencentEs from 'tencentcloud-sdk-nodejs-es';
import * as tencentSsl from 'tencentcloud-sdk-nodejs-ssl';
import * as tencentTag from 'tencentcloud-sdk-nodejs-tag';
import COS from 'cos-nodejs-sdk-v5';
import { Context } from '../../types';
import { createScfOperations } from './scfOperations';
import { createCosOperations } from './cosOperations';
import { createCamOperations } from './camOperations';
import { createTdsqlcOperations } from './tdsqlcOperations';
import { createTencentEsOperations } from './esOperations';
import { createDnsOperations, createDnsClient } from './dnspodOperations';
import { createSslOperations } from './sslOperations';

export * from './types';

const ScfClient = tencentcloud.scf.v20180416.Client;
const CynosdbClient = cynosdb.cynosdb.v20190107.Client;
const CamClient = tencentCam.cam.v20190116.Client;
const EsClient = tencentEs.es.v20180416.Client;
const SslClient = tencentSsl.ssl.v20191205.Client;
const TagClient = tencentTag.tag.v20180813.Client;

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

  const esClientConfig = {
    credential: {
      secretId: context.accessKeyId,
      secretKey: context.accessKeySecret,
    },
    region: context.region,
    profile: {
      httpProfile: {
        endpoint: 'es.tencentcloudapi.com',
      },
    },
  };

  const esClient = new EsClient(esClientConfig);

  const sslClientConfig = {
    credential: {
      secretId: context.accessKeyId,
      secretKey: context.accessKeySecret,
    },
    region: context.region,
    profile: {
      httpProfile: {
        endpoint: 'ssl.tencentcloudapi.com',
      },
    },
  };

  const sslClient = new SslClient(sslClientConfig);

  const camClientConfig = {
    credential: {
      secretId: context.accessKeyId,
      secretKey: context.accessKeySecret,
    },
    region: context.region,
    profile: {
      httpProfile: {
        endpoint: 'cam.tencentcloudapi.com',
      },
    },
  };

  const camClient = new CamClient(camClientConfig);

  const tagClientConfig = {
    credential: {
      secretId: context.accessKeyId,
      secretKey: context.accessKeySecret,
    },
    region: context.region,
    profile: {
      httpProfile: {
        endpoint: 'tag.tencentcloudapi.com',
      },
    },
  };

  const tagClient = new TagClient(tagClientConfig);

  return {
    scf: scfClient,
    cos: cosClient,
    cynosdb: cynosdbClient,
    es: esClient,
    ssl: sslClient,
    dns: createDnsClient(context),
    cam: camClient,
    tag: tagClient,
  };
};

export const createTencentClient = (context: Context) => {
  const sdkClients = initializeSdkClients(context);
  const dnsOps = createDnsOperations(sdkClients.dns);

  return {
    scf: createScfOperations(sdkClients.scf, {
      tag: sdkClients.tag,
      cam: sdkClients.cam,
      region: context.region,
      namespace: context.parameters?.find((p) => p.key === 'namespace')?.value ?? 'default',
    }),
    cos: createCosOperations(sdkClients.cos, context.region, dnsOps),
    cam: createCamOperations(sdkClients.cam),
    tdsqlc: createTdsqlcOperations(sdkClients.cynosdb, context),
    es: createTencentEsOperations(sdkClients.es, context),
    ssl: createSslOperations(sdkClients.ssl),
    dns: dnsOps,
  };
};
