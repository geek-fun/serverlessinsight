import { Context, DatabaseDomain, ResourceState, StateFile } from '../../types';
import {
  createTdsqlcCluster,
  deleteTdsqlcCluster,
  getTdsqlcCluster,
  updateTdsqlcCluster,
} from './tdsqlcProvider';
import { databaseToTdsqlcConfig, extractTdsqlcDefinition, TdsqlcClusterInfo } from './tdsqlcTypes';
import { setResource, removeResource } from '../../common/stateManager';

const buildTdsqlcInstanceFromProvider = (info: TdsqlcClusterInfo, arn: string) => {
  return {
    arn,
    id: info.ClusterId,
    clusterId: info.ClusterId,
    clusterName: info.ClusterName,
    region: info.Region,
    dbType: info.DbType,
    dbVersion: info.DbVersion,
    status: info.Status,
    vpcId: info.VpcId ?? null,
    subnetId: info.SubnetId ?? null,
    vip: info.Vip ?? null,
    vport: info.Vport ?? null,
    minCpu: info.MinCpu ?? null,
    maxCpu: info.MaxCpu ?? null,
    minStorageSize: info.MinStorageSize ?? null,
    maxStorageSize: info.MaxStorageSize ?? null,
    autoPause: info.AutoPause ?? null,
    createTime: info.CreateTime ?? null,
    updateTime: info.UpdateTime ?? null,
  };
};

export const createDatabaseResource = async (
  context: Context,
  database: DatabaseDomain,
  state: StateFile,
): Promise<StateFile> => {
  const config = databaseToTdsqlcConfig(database);

  const clusterId = await createTdsqlcCluster(context, config);

  // Refresh state from provider to get all attributes
  const clusterInfo = await getTdsqlcCluster(context, clusterId);
  if (!clusterInfo) {
    throw new Error(`Failed to refresh state for cluster: ${clusterId}`);
  }

  const definition = extractTdsqlcDefinition(config);
  const arn = `arn:tencent:cynosdb:${context.region}::cluster:${clusterId}`;
  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [buildTdsqlcInstanceFromProvider(clusterInfo, arn)],
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
  return await getTdsqlcCluster(context, clusterId);
};

export const updateDatabaseResource = async (
  context: Context,
  database: DatabaseDomain,
  clusterId: string,
  state: StateFile,
): Promise<StateFile> => {
  const config = databaseToTdsqlcConfig(database);

  await updateTdsqlcCluster(context, clusterId, config);

  // Refresh state from provider to get all attributes
  const clusterInfo = await getTdsqlcCluster(context, clusterId);
  if (!clusterInfo) {
    throw new Error(`Failed to refresh state for cluster: ${clusterId}`);
  }

  const definition = extractTdsqlcDefinition(config);
  const arn = `arn:tencent:cynosdb:${context.region}::cluster:${clusterId}`;
  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [buildTdsqlcInstanceFromProvider(clusterInfo, arn)],
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
  await deleteTdsqlcCluster(context, clusterId);
  return removeResource(state, logicalId);
};
