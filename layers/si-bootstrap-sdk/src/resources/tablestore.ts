import { Credentials, ResourceProperties, TableStoreResourceProperties } from '../tyes';
import { loadTableStoreClient } from '../clients';
import { logger } from '../common';

const createTableStore = async (
  {
    instanceName,
    tableName,
    primaryKey,
    columns,
    clusterType,
    tags,
    network,
    reservedThroughput,
  }: ResourceProperties<TableStoreResourceProperties>,
  credentials: Credentials,
  regionId: string,
) => {
  const tableStoreClient = loadTableStoreClient(regionId, credentials);

  let instance = await tableStoreClient.getInstance(instanceName);

  if (!instance) {
    logger.info({ instanceName }, 'Instance does not exist, creating a new instance');

    try {
      instance = await tableStoreClient.createInstance({
        instanceName,
        clusterType,
        network: {
          type: network.type,
          vpcId: network.vpcId,
          ingressRules: network.ingressRules,
        },
        tags,
      });
    } catch (error) {
      logger.error(error, 'Failed to create instance');
      throw error;
    }
  }

  if (instance?.instanceStatus !== 'normal') {
    throw new Error(
      `Instance ${instanceName} is not in normal status, current status: ${instance?.instanceStatus}`,
    );
  }
  try {
    const tableStore = await tableStoreClient.createTable({
      instanceName,
      tableName,
      primaryKey,
      columns,
      reservedThroughput,
    });
    return {
      physicalResourceId: tableStore?.tableName,
      data: {
        instanceName: instance.instanceName,
        tableName: tableStore?.tableName,
        primaryKey: tableStore?.primaryKey,
        columns: tableStore?.columns,
        reservedThroughput: tableStore?.reservedThroughput,
      },
    };
  } catch (error) {
    logger.error({ instanceName, tableName, error }, 'Failed to create table');
    throw error;
  }
};

const updateTableStore = async (
  properties: ResourceProperties<TableStoreResourceProperties>,
  credentials: Credentials,
  regionId: string,
) => {
  const tableStoreClient = loadTableStoreClient(regionId, credentials);

  const { instanceName, tableName } = properties;

  const instance = await tableStoreClient.getInstance(instanceName);
  if (!instance) {
    throw new Error(`Instance ${instanceName} does not exist.`);
  }

  try {
    const updatedTable = await tableStoreClient.updateTable(properties);

    return {
      physicalResourceId: updatedTable.tableName,
      data: {
        instanceName: instance.instanceName,
        tableName: updatedTable.tableName,
        reservedThroughput: updatedTable.reservedThroughput,
      },
    };
  } catch (error) {
    logger.error({ instanceName, tableName, error }, 'Failed to update table');
    throw error;
  }
};

const deleteTableStore = async (
  properties: ResourceProperties<TableStoreResourceProperties>,
  credentials: Credentials,
  regionId: string,
) => {
  const tableStoreClient = loadTableStoreClient(regionId, credentials);

  const { instanceName, tableName } = properties;

  const instance = await tableStoreClient.getInstance(instanceName);
  if (!instance) {
    throw new Error(`Instance ${instanceName} does not exist.`);
  }

  try {
    const result = await tableStoreClient.deleteTable({
      instanceName,
      tableName,
    });

    await tableStoreClient.deleteInstance(instanceName);

    return { physicalResourceId: tableName, data: result };
  } catch (error) {
    logger.error({ instanceName, tableName, error }, 'Failed to delete table');
    throw error;
  }
};

export const tableStore = {
  create: createTableStore,
  update: updateTableStore,
  delete: deleteTableStore,
};
