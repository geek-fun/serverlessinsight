import { Context, DatabaseDomain, DatabaseEnum, ResourceState, StateFile } from '../../types';
import { createAliyunClient } from '../../common/aliyunClient';
import { databaseToRdsConfig, extractRdsDefinition, RdsInfo } from './rdsTypes';
import { databaseToEsConfig, extractEsDefinition, EsInfo } from './esServerlessTypes';
import { setResource, removeResource } from '../../common/stateManager';

const buildRdsInstanceFromProvider = (info: RdsInfo, arn: string) => {
  return {
    arn,
    id: info.DBInstanceId ?? '',
    dbInstanceId: info.DBInstanceId ?? null,
    dbInstanceDescription: info.DBInstanceDescription ?? null,
    engine: info.Engine ?? null,
    engineVersion: info.EngineVersion ?? null,
    dbInstanceClass: info.DBInstanceClass ?? null,
    dbInstanceStorage: info.DBInstanceStorage ?? null,
    category: info.Category ?? null,
    dbInstanceStorageType: info.DBInstanceStorageType ?? null,
    serverlessConfig: info.ServerlessConfig
      ? {
          minCapacity: info.ServerlessConfig.MinCapacity ?? null,
          maxCapacity: info.ServerlessConfig.MaxCapacity ?? null,
          autoPause: info.ServerlessConfig.AutoPause ?? null,
          switchForce: info.ServerlessConfig.SwitchForce ?? null,
        }
      : {},
    masterUsername: info.MasterUsername ?? null,
    vpcId: info.VpcId ?? null,
    vSwitchId: info.VSwitchId ?? null,
    zoneId: info.ZoneId ?? null,
    connectionString: info.ConnectionString ?? null,
    port: info.Port ?? null,
    dbInstanceStatus: info.DBInstanceStatus ?? null,
    createTime: info.CreateTime ?? null,
    regionId: info.RegionId ?? null,
    securityIPList: info.SecurityIPList ?? null,
    multiAZ: info.MultiAZ ?? null,
  };
};

const buildEsInstanceFromProvider = (info: EsInfo, arn: string) => {
  return {
    arn,
    id: info.AppId ?? '',
    appId: info.AppId ?? null,
    appName: info.AppName ?? null,
    appVersion: info.AppVersion ?? null,
    status: info.Status ?? null,
    description: info.Description ?? null,
    createTime: info.CreateTime ?? null,
    modifiedTime: info.ModifiedTime ?? null,
    regionId: info.RegionId ?? null,
    quotaInfo: info.QuotaInfo
      ? {
          appType: info.QuotaInfo.AppType ?? null,
          minCu: info.QuotaInfo.MinCu ?? null,
        }
      : {},
    network: info.Network
      ? info.Network.map((n) => ({
          type: n.Type ?? null,
          enabled: n.Enabled ?? null,
          whiteIpGroup: n.WhiteIpGroup
            ? n.WhiteIpGroup.map((w) => ({
                groupName: w.GroupName ?? null,
                ips: w.Ips ?? [],
              }))
            : [],
          endpoint: n.Endpoint ?? null,
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
  let arn: string;
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
    arn = `arn:acs:elasticsearch:${context.region}:${context.accountId}:serverless:${instanceId}`;
    instance = buildEsInstanceFromProvider(appInfo, arn);
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
    arn = `arn:acs:rds:${context.region}:${context.accountId}:dbinstance:${instanceId}`;
    instance = buildRdsInstanceFromProvider(rdsInfo, arn);
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
  let arn: string;

  if (resourceType === 'ALIYUN_ES_SERVERLESS') {
    const config = databaseToEsConfig(database);
    await client.es.updateApp(instanceId, config);

    // Refresh state from provider to get all attributes
    const appInfo = await client.es.getApp(instanceId);
    if (!appInfo) {
      throw new Error(`Failed to refresh state for ES app: ${instanceId}`);
    }

    definition = extractEsDefinition(config);
    arn = `arn:acs:elasticsearch:${context.region}:${context.accountId}:serverless:${instanceId}`;
    instance = buildEsInstanceFromProvider(appInfo, arn);
  } else if (resourceType === 'ALIYUN_RDS_SERVERLESS') {
    const config = databaseToRdsConfig(database);
    await client.rds.updateInstance(instanceId, config);

    // Refresh state from provider to get all attributes
    const rdsInfo = await client.rds.getInstance(instanceId);
    if (!rdsInfo) {
      throw new Error(`Failed to refresh state for RDS instance: ${instanceId}`);
    }

    definition = extractRdsDefinition(config);
    arn = `arn:acs:rds:${context.region}:${context.accountId}:dbinstance:${instanceId}`;
    instance = buildRdsInstanceFromProvider(rdsInfo, arn);
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

  if (resourceType === 'ALIYUN_ES_SERVERLESS') {
    await client.es.deleteApp(instanceId);
  } else if (resourceType === 'ALIYUN_RDS_SERVERLESS') {
    await client.rds.deleteInstance(instanceId);
  } else {
    throw new Error(`Unsupported resource type: ${resourceType}`);
  }

  return removeResource(state, logicalId);
};
