import { Credentials, ResourceProperties, TableStoreResourceProperties } from '../tyes';
import { loadTableStoreClient } from '../clients';

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
    console.log('Instance does not exist, creating a new instance...');

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
      console.log(error);
      throw error;
    }
  }

  if (instance?.instanceStatus !== 'normal') {
    throw new Error(
      `Instance ${instanceName} is not in normal status, current status: ${instance?.instanceStatus}`,
    );
  }
  try {
    const tableStore = (await tableStoreClient.createTable({
      instanceName,
      tableName,
      primaryKey,
      columns,
      reservedThroughput,
    })) as {
      tableName: string;
      primaryKey: Array<{ name: string; type: string }>;
      columns: Array<{ name: string; type: string }>;
      reservedThroughput: { read: number; write: number };
    };
    console.log(`Table ${tableName} created successfully in instance ${instanceName}.`);
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
    console.error(`Failed to create table ${tableName} in instance ${instanceName}:`, error);
    throw error;
  }
};

const updateTableStore = async (
  properties: ResourceProperties<TableStoreResourceProperties>,
  credentials: Credentials,
  regionId: string,
) => {
  const tableStoreClient = loadTableStoreClient(regionId, credentials);

  const { instanceName, tableName, primaryKey, columns, reservedThroughput } = properties;

  // Check if the instance exists
  const instance = await tableStoreClient.getInstance(instanceName);
  if (!instance) {
    throw new Error(`Instance ${instanceName} does not exist.`);
  }

  // Update the table
  try {
    const updatedTable = (await tableStoreClient.updateTable({
      instanceName,
      tableName,
      primaryKey,
      columns,
      reservedThroughput,
    })) as {
      tableName: string;
      primaryKey: Array<{ name: string; type: string }>;
      columns: Array<{ name: string; type: string }>;
      reservedThroughput: { read: number; write: number };
    };
    console.log(`Table ${tableName} updated successfully in instance ${instanceName}.`);
    return {
      physicalResourceId: updatedTable.tableName,
      data: {
        instanceName: instance.instanceName,
        tableName: updatedTable.tableName,
        primaryKey: updatedTable.primaryKey,
        columns: updatedTable.columns,
        reservedThroughput: updatedTable.reservedThroughput,
      },
    };
  } catch (error) {
    console.error(`Failed to update table ${tableName} in instance ${instanceName}:`, error);
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

  // Check if the instance exists
  const instance = await tableStoreClient.getInstance(instanceName);
  if (!instance) {
    throw new Error(`Instance ${instanceName} does not exist.`);
  }

  // Delete the table
  try {
    await tableStoreClient.deleteTable({
      instanceName,
      tableName,
    });
    console.log(`Table ${tableName} deleted successfully from instance ${instanceName}.`);
    return {
      physicalResourceId: tableName,
      data: {},
    };
  } catch (error) {
    console.error(`Failed to delete table ${tableName} from instance ${instanceName}:`, error);
    throw error;
  }
};

export const tableStore = {
  create: createTableStore,
  update: updateTableStore,
  delete: deleteTableStore,
};
