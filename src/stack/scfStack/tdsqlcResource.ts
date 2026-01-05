import { Context, DatabaseDomain, ResourceState, StateFile } from '../../types';
import { createTencentClient } from '../../common/tencentClient';
import { databaseToTdsqlcConfig, extractTdsqlcDefinition, TdsqlcClusterInfo } from './tdsqlcTypes';
import { setResource, removeResource } from '../../common/stateManager';

const buildTdsqlcInstanceFromProvider = (info: TdsqlcClusterInfo, arn: string) => {
  return {
    arn,
    id: info.ClusterId,
    clusterId: info.ClusterId,
    clusterName: info.ClusterName,
    region: info.Region,
    zone: info.Zone ?? null,
    physicalZone: info.PhysicalZone ?? null,
    dbType: info.DbType,
    dbVersion: info.DbVersion,
    dbMode: info.DbMode ?? null,
    status: info.Status,
    statusDesc: info.StatusDesc ?? null,
    serverlessStatus: info.ServerlessStatus ?? null,
    vpcId: info.VpcId ?? null,
    vpcName: info.VpcName ?? null,
    subnetId: info.SubnetId ?? null,
    subnetName: info.SubnetName ?? null,
    charset: info.Charset ?? null,
    vip: info.Vip ?? null,
    vport: info.Vport ?? null,
    wanDomain: info.WanDomain ?? null,
    wanIP: info.WanIP ?? null,
    wanPort: info.WanPort ?? null,
    wanStatus: info.WanStatus ?? null,
    minCpu: info.MinCpu ?? null,
    maxCpu: info.MaxCpu ?? null,
    minStorageSize: info.MinStorageSize ?? null,
    maxStorageSize: info.MaxStorageSize ?? null,
    storageId: info.StorageId ?? null,
    storage: info.Storage ?? null,
    storageLimit: info.StorageLimit ?? null,
    storagePayMode: info.StoragePayMode ?? null,
    autoPause: info.AutoPause ?? null,
    autoPauseDelay: info.AutoPauseDelay ?? null,
    createTime: info.CreateTime ?? null,
    updateTime: info.UpdateTime ?? null,
    projectId: info.ProjectId ?? null,
    payMode: info.PayMode ?? null,
    periodEndTime: info.PeriodEndTime ?? null,
    autoRenewFlag: info.AutoRenewFlag ?? null,
    instanceCount: info.InstanceCount ?? null,
    processingTask: info.ProcessingTask ?? null,
    supportedFeatures: info.SupportedFeatures ?? [],
    rollbackSupport: info.RollbackSupport ?? null,
    networkType: info.NetworkType ?? null,
    resourcePackageId: info.ResourcePackageId ?? null,
    resourcePackageType: info.ResourcePackageType ?? null,
    resourcePackageState: info.ResourcePackageState ?? null,
    physicalRegion: info.PhysicalRegion ?? null,
    proxyStatus: info.ProxyStatus ?? null,
    rwGroupId: info.RwGroupId ?? null,
    masterZone: info.MasterZone ?? null,
    slaveZones: info.SlaveZones ?? [],
    businessType: info.BusinessType ?? null,
    isFreeze: info.IsFreeze ?? null,
    orderSource: info.OrderSource ?? null,
    ability: info.Ability
      ? {
          isSupportSlaveZone: info.Ability.IsSupportSlaveZone ?? null,
          nonsupportSlaveZoneReason: info.Ability.NonsupportSlaveZoneReason ?? null,
          isSupportRo: info.Ability.IsSupportRo ?? null,
          nonsupportRoReason: info.Ability.NonsupportRoReason ?? null,
        }
      : {},
    resourceTags:
      info.ResourceTags?.map((t) => ({
        tagKey: t.TagKey ?? null,
        tagValue: t.TagValue ?? null,
      })) ?? [],
    cynosVersion: info.CynosVersion ?? null,
    cynosVersionStatus: info.CynosVersionStatus ?? null,
    isLatestVersion: info.IsLatestVersion ?? null,
  };
};

export const createDatabaseResource = async (
  context: Context,
  database: DatabaseDomain,
  state: StateFile,
): Promise<StateFile> => {
  const config = databaseToTdsqlcConfig(database);

  const client = createTencentClient(context);
  const clusterId = await client.tdsqlc.createCluster(config);

  // Refresh state from provider to get all attributes
  const clusterInfo = await client.tdsqlc.getCluster(clusterId);
  if (!clusterInfo) {
    throw new Error(`Failed to refresh state for cluster: ${clusterId}`);
  }

  const definition = extractTdsqlcDefinition(config);
  const arn = `arn:tencent:cynosdb:${context.region}::cluster:${clusterId}`;
  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [buildTdsqlcInstanceFromProvider(clusterInfo as TdsqlcClusterInfo, arn)],
    lastUpdated: new Date().toISOString(),
    metadata: {
      clusterName: database.name,
      clusterId,
    },
  };

  const logicalId = `databases.${database.key}`;
  return setResource(state, logicalId, resourceState);
};

export const readDatabaseResource = async (context: Context, clusterId: string) => {
  const client = createTencentClient(context);
  return await client.tdsqlc.getCluster(clusterId);
};

export const updateDatabaseResource = async (
  context: Context,
  database: DatabaseDomain,
  clusterId: string,
  state: StateFile,
): Promise<StateFile> => {
  const config = databaseToTdsqlcConfig(database);

  const client = createTencentClient(context);
  await client.tdsqlc.updateCluster(clusterId, config);

  // Refresh state from provider to get all attributes
  const clusterInfo = await client.tdsqlc.getCluster(clusterId);
  if (!clusterInfo) {
    throw new Error(`Failed to refresh state for cluster: ${clusterId}`);
  }

  const definition = extractTdsqlcDefinition(config);
  const arn = `arn:tencent:cynosdb:${context.region}::cluster:${clusterId}`;
  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [buildTdsqlcInstanceFromProvider(clusterInfo as TdsqlcClusterInfo, arn)],
    lastUpdated: new Date().toISOString(),
    metadata: {
      clusterName: database.name,
      clusterId,
    },
  };

  const logicalId = `databases.${database.key}`;
  return setResource(state, logicalId, resourceState);
};

export const deleteDatabaseResource = async (
  context: Context,
  clusterId: string,
  logicalId: string,
  state: StateFile,
): Promise<StateFile> => {
  const client = createTencentClient(context);
  await client.tdsqlc.deleteCluster(clusterId);
  return removeResource(state, logicalId);
};
