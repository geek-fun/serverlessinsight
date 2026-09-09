import Fc3Client from '@alicloud/fc20230330';
import SlsClient from '@alicloud/sls20201230';
import RamClient from '@alicloud/ram20150501';
import EcsClient from '@alicloud/ecs20140526';
import NasClient from '@alicloud/nas20170626';
import CloudApiClient from '@alicloud/cloudapi20160714';
import RdsClient from '@alicloud/rds20140815';
import EsServerlessClient from '@alicloud/es-serverless20230627';
import DnsClient from '@alicloud/alidns20150109';
import CasClient from '@alicloud/cas20200407';
import CdnClient from '@alicloud/cdn20180510';
import * as $OpenApi from '@alicloud/openapi-client';
import OSS from 'ali-oss';
import { Context } from '../../types';
import { ALIYUN_FC3_CONNECT_TIMEOUT_MS, ALIYUN_FC3_READ_TIMEOUT_MS } from '../constants';
import { createFc3Operations } from './fc3Operations';
import { createSlsOperations } from './slsOperations';
import { createRamOperations } from './ramOperations';
import { createEcsOperations } from './ecsOperations';
import { createNasOperations } from './nasOperations';
import { createApigwOperations } from './apigwOperations';
import { createOssOperations } from './ossOperations';
import { createRdsOperations } from './rdsOperations';
import { createEsOperations } from './esOperations';
import { createTablestoreOperations } from './tablestoreOperations';
import { createDnsOperations } from './dnsOperations';
import { createCasOperations } from './casOperations';
import { createCdnOperations } from './cdnOperations';

export * from './types';
export * from './apigwOperations';
export * from './ossOperations';
export * from './rdsOperations';
export * from './esOperations';
export * from './tablestoreOperations';
export * from './dnsOperations';
export * from './casOperations';
export * from './cdnOperations';

// All aliyun management-plane clients share the same timeout budget (issue
// #234: the SLS client ran on the SDK default 3s read timeout while fc3/ims
// used the shared constants — a cold SLS read then aborted whole deploys).
// Reuses ALIYUN_FC3_* constants — semantically the aliyun management-plane
// timeout budget (imsClient already reuses them the same way).
const applyAliyunTimeouts = (config: $OpenApi.Config): $OpenApi.Config => {
  config.connectTimeout = ALIYUN_FC3_CONNECT_TIMEOUT_MS;
  config.readTimeout = ALIYUN_FC3_READ_TIMEOUT_MS;
  return config;
};

const initializeSdkClients = (context: Context) => {
  const baseConfig = {
    accessKeyId: context.accessKeyId,
    accessKeySecret: context.accessKeySecret,
    regionId: context.region,
    securityToken: context.securityToken,
  };

  const fc3Client = new Fc3Client(
    applyAliyunTimeouts(
      Object.assign(new $OpenApi.Config(baseConfig), {
        endpoint: `${context.accountId}.${context.region}.fc.aliyuncs.com`,
      }),
    ),
  );

  const slsClient = new SlsClient(
    applyAliyunTimeouts(
      Object.assign(new $OpenApi.Config(baseConfig), {
        endpoint: `${context.region}.log.aliyuncs.com`,
      }),
    ),
  );

  const ramClient = new RamClient(
    applyAliyunTimeouts(
      Object.assign(new $OpenApi.Config(baseConfig), {
        endpoint: 'ram.aliyuncs.com',
      }),
    ),
  );

  const ecsClient = new EcsClient(
    applyAliyunTimeouts(
      Object.assign(new $OpenApi.Config(baseConfig), {
        endpoint: `ecs.${context.region}.aliyuncs.com`,
      }),
    ),
  );

  const nasClient = new NasClient(
    applyAliyunTimeouts(
      Object.assign(new $OpenApi.Config(baseConfig), {
        endpoint: `nas.${context.region}.aliyuncs.com`,
      }),
    ),
  );

  const ossClient = new OSS({
    accessKeyId: context.accessKeyId,
    accessKeySecret: context.accessKeySecret,
    region: `oss-${context.region}`,
    stsToken: context.securityToken,
  });

  const apigwClient = new CloudApiClient(
    applyAliyunTimeouts(
      Object.assign(new $OpenApi.Config(baseConfig), {
        endpoint: `apigateway.${context.region}.aliyuncs.com`,
      }),
    ),
  );

  const rdsClient = new RdsClient(
    applyAliyunTimeouts(
      Object.assign(new $OpenApi.Config(baseConfig), {
        endpoint: `rds.aliyuncs.com`,
      }),
    ),
  );

  const esClient = new EsServerlessClient(
    applyAliyunTimeouts(
      Object.assign(new $OpenApi.Config(baseConfig), {
        endpoint: `elasticsearch-serverless.${context.region}.aliyuncs.com`,
      }),
    ),
  );

  const dnsClient = new DnsClient(
    applyAliyunTimeouts(
      Object.assign(new $OpenApi.Config(baseConfig), {
        endpoint: `alidns.aliyuncs.com`,
      }),
    ),
  );

  const casClient = new CasClient(
    applyAliyunTimeouts(
      Object.assign(new $OpenApi.Config(baseConfig), {
        endpoint: `cas.aliyuncs.com`,
      }),
    ),
  );

  const cdnClient = new CdnClient(
    applyAliyunTimeouts(
      Object.assign(new $OpenApi.Config(baseConfig), {
        endpoint: `cdn.aliyuncs.com`,
      }),
    ),
  );

  return {
    fc3: fc3Client,
    sls: slsClient,
    ram: ramClient,
    ecs: ecsClient,
    nas: nasClient,
    oss: ossClient,
    apigw: apigwClient,
    rds: rdsClient,
    es: esClient,
    dns: dnsClient,
    cas: casClient,
    cdn: cdnClient,
  };
};

export const createAliyunClient = (context: Context) => {
  const sdkClients = initializeSdkClients(context);
  const dnsOps = createDnsOperations(sdkClients.dns);

  return {
    fc3: createFc3Operations(sdkClients.fc3),
    sls: createSlsOperations(sdkClients.sls),
    ram: createRamOperations(sdkClients.ram),
    ecs: createEcsOperations(sdkClients.ecs, context),
    nas: createNasOperations(sdkClients.nas),
    oss: createOssOperations(sdkClients.oss, context.region, dnsOps),
    apigw: createApigwOperations(sdkClients.apigw, sdkClients.dns, context),
    rds: createRdsOperations(sdkClients.rds, context),
    es: createEsOperations(sdkClients.es, context),
    cas: createCasOperations(sdkClients.cas),
    dns: dnsOps,
    cdn: createCdnOperations(sdkClients.cdn),
    tablestore: (instanceName: string) =>
      createTablestoreOperations(
        `https://${instanceName}.${context.region}.ots.aliyuncs.com`,
        instanceName,
        context,
      ),
  };
};
