import { Context, DatabaseDomain, ResourceState, StateFile, ResourceTypeEnum } from '../../types';
import {
  createTdsqlcCluster,
  deleteTdsqlcCluster,
  getTdsqlcCluster,
  updateTdsqlcCluster,
} from './tdsqlcProvider';
import { computeDatabaseConfigHash, databaseToTdsqlcConfig } from './tdsqlcTypes';
import { setResource, removeResource } from '../../common/stateManager';

export const createDatabaseResource = async (
  context: Context,
  database: DatabaseDomain,
  state: StateFile,
): Promise<StateFile> => {
  const config = databaseToTdsqlcConfig(database);

  const clusterId = await createTdsqlcCluster(context, config);

  const configHash = computeDatabaseConfigHash(config);
  const resourceState: ResourceState = {
    type: 'TDSQL_C_SERVERLESS',
    physicalId: clusterId,
    region: context.region,
    configHash,
    lastUpdated: new Date().toISOString(),
    metadata: {
      clusterName: database.name,
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

  const configHash = computeDatabaseConfigHash(config);
  const resourceState: ResourceState = {
    type: ResourceTypeEnum.TDSQL_C_SERVERLESS,
    physicalId: clusterId,
    region: context.region,
    configHash,
    lastUpdated: new Date().toISOString(),
    metadata: {
      clusterName: database.name,
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
