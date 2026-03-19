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

export * from './types';
export * from './apigwOperations';
export * from './ossOperations';
export * from './rdsOperations';
export * from './esOperations';
export * from './tablestoreOperations';
export * from './dnsOperations';
export * from './casOperations';

const initializeSdkClients = (context: Context) => {
  const baseConfig = {
    accessKeyId: context.accessKeyId,
    accessKeySecret: context.accessKeySecret,
    regionId: context.region,
    securityToken: context.securityToken,
  };

  const fc3Config = new $OpenApi.Config(baseConfig);
  fc3Config.endpoint = `${context.accountId}.${context.region}.fc.aliyuncs.com`;
  fc3Config.connectTimeout = ALIYUN_FC3_CONNECT_TIMEOUT_MS;
  fc3Config.readTimeout = ALIYUN_FC3_READ_TIMEOUT_MS;
  const fc3Client = new Fc3Client(fc3Config);

  const slsConfig = new $OpenApi.Config(baseConfig);
  slsConfig.endpoint = `${context.region}.log.aliyuncs.com`;
  const slsClient = new SlsClient(slsConfig);

  const ramConfig = new $OpenApi.Config(baseConfig);
  ramConfig.endpoint = 'ram.aliyuncs.com';
  const ramClient = new RamClient(ramConfig);

  const ecsConfig = new $OpenApi.Config(baseConfig);
  ecsConfig.endpoint = `ecs.${context.region}.aliyuncs.com`;
  const ecsClient = new EcsClient(ecsConfig);

  const nasConfig = new $OpenApi.Config(baseConfig);
  nasConfig.endpoint = `nas.${context.region}.aliyuncs.com`;
  const nasClient = new NasClient(nasConfig);

  const ossClient = new OSS({
    accessKeyId: context.accessKeyId,
    accessKeySecret: context.accessKeySecret,
    region: `oss-${context.region}`,
    stsToken: context.securityToken,
  });

  const apigwConfig = new $OpenApi.Config(baseConfig);
  apigwConfig.endpoint = `apigateway.${context.region}.aliyuncs.com`;
  const apigwClient = new CloudApiClient(apigwConfig);

  const rdsConfig = new $OpenApi.Config(baseConfig);
  rdsConfig.endpoint = `rds.aliyuncs.com`;
  const rdsClient = new RdsClient(rdsConfig);

  const esConfig = new $OpenApi.Config(baseConfig);
  esConfig.endpoint = `elasticsearch-serverless.${context.region}.aliyuncs.com`;
  const esClient = new EsServerlessClient(esConfig);

  const dnsConfig = new $OpenApi.Config(baseConfig);
  dnsConfig.endpoint = `alidns.aliyuncs.com`;
  const dnsClient = new DnsClient(dnsConfig);

  const casConfig = new $OpenApi.Config(baseConfig);
  casConfig.endpoint = `cas.aliyuncs.com`;
  const casClient = new CasClient(casConfig);

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
    tablestore: (instanceName: string) =>
      createTablestoreOperations(
        `https://${instanceName}.${context.region}.ots.aliyuncs.com`,
        instanceName,
        context,
      ),
  };
};
