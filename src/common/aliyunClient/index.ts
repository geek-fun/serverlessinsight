import Fc3Client from '@alicloud/fc20230330';
import SlsClient from '@alicloud/sls20201230';
import RamClient from '@alicloud/ram20150501';
import EcsClient from '@alicloud/ecs20140526';
import NasClient from '@alicloud/nas20170626';
import CloudApiClient from '@alicloud/cloudapi20160714';
import * as $OpenApi from '@alicloud/openapi-client';
import OSS from 'ali-oss';
import { Context } from '../../types';
import { createFc3Operations } from './fc3Operations';
import { createSlsOperations } from './slsOperations';
import { createRamOperations } from './ramOperations';
import { createEcsOperations } from './ecsOperations';
import { createNasOperations } from './nasOperations';

// Re-export all types
export * from './types';

// Initialize SDK clients (internal)
const initializeSdkClients = (context: Context) => {
  const baseConfig = {
    accessKeyId: context.accessKeyId,
    accessKeySecret: context.accessKeySecret,
    regionId: context.region,
    securityToken: context.securityToken,
  };

  const fc3Config = new $OpenApi.Config(baseConfig);
  fc3Config.endpoint = `${context.accountId}.${context.region}.fc.aliyuncs.com`;
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

  return {
    fc3: fc3Client,
    sls: slsClient,
    ram: ramClient,
    ecs: ecsClient,
    nas: nasClient,
    oss: ossClient,
    apigw: apigwClient,
  };
};

export const createAliyunClient = (context: Context) => {
  const sdkClients = initializeSdkClients(context);

  return {
    fc3: createFc3Operations(sdkClients.fc3),
    sls: createSlsOperations(sdkClients.sls),
    ram: createRamOperations(sdkClients.ram),
    ecs: createEcsOperations(sdkClients.ecs, context),
    nas: createNasOperations(sdkClients.nas),
    oss: sdkClients.oss,
    apigw: sdkClients.apigw,
  };
};
