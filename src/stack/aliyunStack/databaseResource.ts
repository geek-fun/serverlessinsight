import { Context, DatabaseDomain, DatabaseEnum, ResourceState, StateFile } from '../../types';
import { createAliyunClient } from '../../common/aliyunClient';
import { databaseToRdsConfig, extractRdsDefinition, RdsInfo } from './rdsTypes';
import { databaseToEsConfig, extractEsDefinition, EsInfo } from './esServerlessTypes';
import { setResource, removeResource } from '../../common/stateManager';
import { buildSid } from '../../common';
import { logger } from '../../common/logger';
import { lang } from '../../lang';

const buildRdsInstanceFromProvider = (info: RdsInfo, sid: string) => {
  return {
    sid,
    id: info.dbInstanceId ?? '',
    dbInstanceId: info.dbInstanceId ?? null,
    dbInstanceDescription: info.dbInstanceDescription ?? null,
    engine: info.engine ?? null,
    engineVersion: info.engineVersion ?? null,
    dbInstanceClass: info.dbInstanceClass ?? null,
    dbInstanceStorage: info.dbInstanceStorage ?? null,
    category: info.category ?? null,
    dbInstanceStorageType: info.dbInstanceStorageType ?? null,
    serverlessConfig: info.serverlessConfig
      ? {
          minCapacity: info.serverlessConfig.minCapacity ?? null,
          maxCapacity: info.serverlessConfig.maxCapacity ?? null,
          autoPause: info.serverlessConfig.autoPause ?? null,
          switchForce: info.serverlessConfig.switchForce ?? null,
        }
      : {},
    masterUsername: info.masterUsername ?? null,
    vpcId: info.vpcId ?? null,
    vSwitchId: info.vSwitchId ?? null,
    zoneId: info.zoneId ?? null,
    connectionString: info.connectionString ?? null,
    port: info.port ?? null,
    dbInstanceStatus: info.dbInstanceStatus ?? null,
    createTime: info.createTime ?? null,
    regionId: info.regionId ?? null,
    securityIPList: info.securityIPList ?? null,
    multiAZ: info.multiAZ ?? null,
  };
};

const buildEsInstanceFromProvider = (info: EsInfo, sid: string) => {
  return {
    sid,
    id: info.appId ?? '',
    appId: info.appId ?? null,
    appName: info.appName ?? null,
    appType: info.appType ?? null,
    status: info.status ?? null,
    description: info.description ?? null,
    createTime: info.createTime ?? null,
    modifiedTime: info.modifiedTime ?? null,
    regionId: info.regionId ?? null,
    version: info.version ?? null,
    ownerId: info.ownerId ?? null,
    instanceId: info.instanceId ?? null,
    chargeType: info.chargeType ?? null,
    scenario: info.scenario ?? null,
    network: info.network
      ? info.network.map((n) => ({
          type: n.type ?? null,
          enabled: n.enabled ?? null,
          domain: n.domain ?? null,
          port: n.port ?? null,
          whiteIpGroup: n.whiteIpGroup
            ? n.whiteIpGroup.map((w) => ({
                groupName: w.groupName ?? null,
                ips: w.ips ?? [],
              }))
            : [],
        }))
      : [],
    privateNetwork: info.privateNetwork
      ? info.privateNetwork.map((n) => ({
          type: n.type ?? null,
          enabled: n.enabled ?? null,
          domain: n.domain ?? null,
          port: n.port ?? null,
          vpcId: n.vpcId ?? null,
          pvlEndpointId: n.pvlEndpointId ?? null,
          whiteIpGroup: n.whiteIpGroup
            ? n.whiteIpGroup.map((w) => ({
                groupName: w.groupName ?? null,
                ips: w.ips ?? [],
              }))
            : [],
        }))
      : [],
    tags: info.tags
      ? info.tags.map((t) => ({
          key: t.key ?? null,
          value: t.value ?? null,
        }))
      : [],
  };
};

export const createDatabaseResource = async (
  context: Context,
  database: DatabaseDomain,
  state: StateFile,
): Promise<StateFile> => {
  const client = createAliyunClient(context);

  let instanceId: string;
  let definition: Record<string, unknown>;
  let instance: unknown;
  let resourceType: string;

  if (database.type === DatabaseEnum.ELASTICSEARCH_SERVERLESS) {
    // Create Elasticsearch Serverless app
    const config = databaseToEsConfig(database);
    instanceId = await client.es.createApp(config);

    // Refresh state from provider to get all attributes
    const appInfo = await client.es.getApp(instanceId);
    if (!appInfo) {
      throw new Error(`Failed to refresh state for ES app: ${instanceId}`);
    }

    definition = extractEsDefinition(config);
    const sid = buildSid('aliyun', 'es', context.stage, instanceId);
    instance = buildEsInstanceFromProvider(appInfo, sid);
    resourceType = 'ALIYUN_ES_SERVERLESS';
  } else if (
    [
      DatabaseEnum.RDS_MYSQL_SERVERLESS,
      DatabaseEnum.RDS_PGSQL_SERVERLESS,
      DatabaseEnum.RDS_MSSQL_SERVERLESS,
    ].includes(database.type)
  ) {
    // Create RDS Serverless instance
    const config = databaseToRdsConfig(database);
    instanceId = await client.rds.createInstance(config);

    // Refresh state from provider to get all attributes
    const rdsInfo = await client.rds.getInstance(instanceId);
    if (!rdsInfo) {
      throw new Error(`Failed to refresh state for RDS instance: ${instanceId}`);
    }

    definition = extractRdsDefinition(config);
    const sid = buildSid('aliyun', 'rds', context.stage, instanceId);
    instance = buildRdsInstanceFromProvider(rdsInfo, sid);
    resourceType = 'ALIYUN_RDS_SERVERLESS';
  } else {
    throw new Error(`Unsupported database type: ${database.type}`);
  }

  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    instances: [instance as any],
    lastUpdated: new Date().toISOString(),
    metadata: {
      databaseName: database.name,
      instanceId,
      resourceType,
    },
  };

  const logicalId = `databases.${database.key}`;
  return setResource(state, logicalId, resourceState);
};

export const readDatabaseResource = async (
  context: Context,
  instanceId: string,
  resourceType: string,
) => {
  const client = createAliyunClient(context);

  if (resourceType === 'ALIYUN_ES_SERVERLESS') {
    return await client.es.getApp(instanceId);
  } else if (resourceType === 'ALIYUN_RDS_SERVERLESS') {
    return await client.rds.getInstance(instanceId);
  }

  throw new Error(`Unsupported resource type: ${resourceType}`);
};

export const updateDatabaseResource = async (
  context: Context,
  database: DatabaseDomain,
  instanceId: string,
  resourceType: string,
  state: StateFile,
): Promise<StateFile> => {
  const client = createAliyunClient(context);

  let definition: Record<string, unknown>;
  let instance: unknown;

  if (resourceType === 'ALIYUN_ES_SERVERLESS') {
    const config = databaseToEsConfig(database);
    await client.es.updateApp(instanceId, config);

    // Refresh state from provider to get all attributes
    const appInfo = await client.es.getApp(instanceId);
    if (!appInfo) {
      throw new Error(`Failed to refresh state for ES app: ${instanceId}`);
    }

    definition = extractEsDefinition(config);
    const sid = buildSid('aliyun', 'es', context.stage, instanceId);
    instance = buildEsInstanceFromProvider(appInfo, sid);
  } else if (resourceType === 'ALIYUN_RDS_SERVERLESS') {
    const config = databaseToRdsConfig(database);
    await client.rds.updateInstance(instanceId, config);

    // Refresh state from provider to get all attributes
    const rdsInfo = await client.rds.getInstance(instanceId);
    if (!rdsInfo) {
      throw new Error(`Failed to refresh state for RDS instance: ${instanceId}`);
    }

    definition = extractRdsDefinition(config);
    const sid = buildSid('aliyun', 'rds', context.stage, instanceId);
    instance = buildRdsInstanceFromProvider(rdsInfo, sid);
  } else {
    throw new Error(`Unsupported resource type: ${resourceType}`);
  }

  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    instances: [instance as any],
    lastUpdated: new Date().toISOString(),
    metadata: {
      databaseName: database.name,
      instanceId,
      resourceType,
    },
  };

  const logicalId = `databases.${database.key}`;
  return setResource(state, logicalId, resourceState);
};

export const deleteDatabaseResource = async (
  context: Context,
  instanceId: string,
  resourceType: string,
  logicalId: string,
  state: StateFile,
): Promise<StateFile> => {
  const client = createAliyunClient(context);

  try {
    if (resourceType === 'ALIYUN_ES_SERVERLESS') {
      await client.es.deleteApp(instanceId);
    } else if (resourceType === 'ALIYUN_RDS_SERVERLESS') {
      await client.rds.deleteInstance(instanceId);
    } else {
      throw new Error(`Unsupported resource type: ${resourceType}`);
    }
  } catch (err) {
    const errorCode = (err as { code?: string })?.code;
    const errorMessage = (err as { message?: string })?.message ?? '';
    if (
      errorCode === 'InvalidDBInstanceId.NotFound' ||
      errorCode === 'AppNotFound' ||
      errorCode === 'NotFound' ||
      errorMessage.includes('not found') ||
      errorMessage.includes('NotFound')
    ) {
      logger.warn(
        lang.__('RESOURCE_NOT_FOUND_PROVIDER', {
          resourceType: 'Database resource',
          name: instanceId,
        }),
      );
    } else {
      throw err;
    }
  }

  return removeResource(state, logicalId);
};
