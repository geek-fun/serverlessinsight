import { Context, DatabaseDomain, ResourceState, StateFile } from '../../types';
import {
  createTdsqlcCluster,
  deleteTdsqlcCluster,
  getTdsqlcCluster,
  updateTdsqlcCluster,
} from './tdsqlcProvider';
import { databaseToTdsqlcConfig, extractTdsqlcAttributes } from './tdsqlcTypes';
import { setResource, removeResource } from '../../common/stateManager';

export const createDatabaseResource = async (
  context: Context,
  database: DatabaseDomain,
  state: StateFile,
): Promise<StateFile> => {
  const config = databaseToTdsqlcConfig(database);

  const clusterId = await createTdsqlcCluster(context, config);

  const attributes = extractTdsqlcAttributes(config);
  const resourceState: ResourceState = {
    mode: 'managed',
    arn: `arn:tencent:cynosdb:${context.region}::cluster:${clusterId}`,
    region: context.region,
    attributes,
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

  const attributes = extractTdsqlcAttributes(config);
  const resourceState: ResourceState = {
    mode: 'managed',
    arn: `arn:tencent:cynosdb:${context.region}::cluster:${clusterId}`,
    region: context.region,
    attributes,
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
