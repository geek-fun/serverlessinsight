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
import {
  ALIYUN_FC3_CONNECT_TIMEOUT_MS,
  ALIYUN_FC3_READ_TIMEOUT_MS,
  ALIYUN_QUERY_CONNECT_TIMEOUT_MS,
  ALIYUN_QUERY_READ_TIMEOUT_MS,
} from '../constants';
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

// Non-fc3 aliyun clients are synchronous management-plane RPCs — they share
// the short query-tier timeout budget (issue #234: sls ran on the SDK default
// 3s read timeout and a cold read aborted whole deploys; the deploy-tier
// budget would instead let a hung call stall a deploy for minutes).
const applyAliyunQueryTimeouts = (config: $OpenApi.Config): $OpenApi.Config => {
  config.connectTimeout = ALIYUN_QUERY_CONNECT_TIMEOUT_MS;
  config.readTimeout = ALIYUN_QUERY_READ_TIMEOUT_MS;
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
    Object.assign(new $OpenApi.Config(baseConfig), {
      endpoint: `${context.accountId}.${context.region}.fc.aliyuncs.com`,
      connectTimeout: ALIYUN_FC3_CONNECT_TIMEOUT_MS,
      readTimeout: ALIYUN_FC3_READ_TIMEOUT_MS,
    }),
  );

  const slsClient = new SlsClient(
    applyAliyunQueryTimeouts(
      Object.assign(new $OpenApi.Config(baseConfig), {
        endpoint: `${context.region}.log.aliyuncs.com`,
      }),
    ),
  );

  const ramClient = new RamClient(
    applyAliyunQueryTimeouts(
      Object.assign(new $OpenApi.Config(baseConfig), {
        endpoint: 'ram.aliyuncs.com',
      }),
    ),
  );

  const ecsClient = new EcsClient(
    applyAliyunQueryTimeouts(
      Object.assign(new $OpenApi.Config(baseConfig), {
        endpoint: `ecs.${context.region}.aliyuncs.com`,
      }),
    ),
  );

  const nasClient = new NasClient(
    applyAliyunQueryTimeouts(
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
    applyAliyunQueryTimeouts(
      Object.assign(new $OpenApi.Config(baseConfig), {
        endpoint: `apigateway.${context.region}.aliyuncs.com`,
      }),
    ),
  );

  const rdsClient = new RdsClient(
    applyAliyunQueryTimeouts(
      Object.assign(new $OpenApi.Config(baseConfig), {
        endpoint: `rds.aliyuncs.com`,
      }),
    ),
  );

  const esClient = new EsServerlessClient(
    applyAliyunQueryTimeouts(
      Object.assign(new $OpenApi.Config(baseConfig), {
        endpoint: `elasticsearch-serverless.${context.region}.aliyuncs.com`,
      }),
    ),
  );

  const dnsClient = new DnsClient(
    applyAliyunQueryTimeouts(
      Object.assign(new $OpenApi.Config(baseConfig), {
        endpoint: `alidns.aliyuncs.com`,
      }),
    ),
  );

  const casClient = new CasClient(
    applyAliyunQueryTimeouts(
      Object.assign(new $OpenApi.Config(baseConfig), {
        endpoint: `cas.aliyuncs.com`,
      }),
    ),
  );

  const cdnClient = new CdnClient(
    applyAliyunQueryTimeouts(
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
