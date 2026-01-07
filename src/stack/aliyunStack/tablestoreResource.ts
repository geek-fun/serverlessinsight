import { createAliyunClient } from '../../common/aliyunClient';
import { TableStoreTableInfo } from '../../common/aliyunClient/tablestoreOperations';
import { setResource, removeResource } from '../../common';
import { Context, TableDomain, ResourceState, StateFile } from '../../types';
import { tableToTableStoreConfig, extractTableStoreDefinition } from './tablestoreTypes';

export type TableStoreTableInstance = {
  type: 'ALIYUN_TABLESTORE_TABLE';
  arn: string;
  id: string;
  instanceName: string;
  tableName: string;
  clusterType: string;
  primaryKey: Array<{
    name: string;
    type: string;
  }>;
  reservedThroughput?: {
    capacityUnit?: {
      read?: number;
      write?: number;
    };
    lastIncreaseTime?: string | null;
    lastDecreaseTime?: string | null;
  };
  tableOptions?: {
    timeToLive?: number | null;
    maxVersions?: number | null;
    maxTimeDeviation?: number | null;
    allowUpdate?: boolean | null;
  };
  streamDetails?: {
    enableStream?: boolean | null;
    streamId?: string | null;
    expirationTime?: number | null;
    lastEnableTime?: string | null;
  };
};

const buildTableStoreInstanceFromProvider = (
  info: TableStoreTableInfo,
  arn: string,
  instanceName: string,
  clusterType: string,
): TableStoreTableInstance => {
  return {
    type: 'ALIYUN_TABLESTORE_TABLE',
    arn,
    id: `${instanceName}/${info.tableName}`,
    instanceName,
    tableName: info.tableName,
    clusterType,
    primaryKey: info.primaryKey || [],
    reservedThroughput: info.reservedThroughputDetails
      ? {
          capacityUnit: info.reservedThroughputDetails.capacityUnit,
          lastIncreaseTime: info.reservedThroughputDetails.lastIncreaseTime ?? null,
          lastDecreaseTime: info.reservedThroughputDetails.lastDecreaseTime ?? null,
        }
      : undefined,
    tableOptions: info.tableOptions
      ? {
          timeToLive: info.tableOptions.timeToLive ?? null,
          maxVersions: info.tableOptions.maxVersions ?? null,
          maxTimeDeviation: info.tableOptions.maxTimeDeviation ?? null,
          allowUpdate: info.tableOptions.allowUpdate ?? null,
        }
      : undefined,
    streamDetails: info.streamDetails
      ? {
          enableStream: info.streamDetails.enableStream ?? null,
          streamId: info.streamDetails.streamId ?? null,
          expirationTime: info.streamDetails.expirationTime ?? null,
          lastEnableTime: info.streamDetails.lastEnableTime ?? null,
        }
      : undefined,
  };
};

export const createTableResource = async (
  context: Context,
  table: TableDomain,
  state: StateFile,
): Promise<StateFile> => {
  const config = tableToTableStoreConfig(table);
  const client = createAliyunClient(context);
  const tablestoreClient = client.tablestore(config.instanceName);

  // Create table
  await tablestoreClient.createTable({
    tableName: config.tableName,
    primaryKey: config.primaryKey,
    reservedThroughput: config.reservedThroughput,
    tableOptions: config.tableOptions,
  });

  // Wait for table to be ready
  await tablestoreClient.waitForTableReady(config.tableName);

  // Refresh state from provider to get all attributes
  const tableInfo = await tablestoreClient.getTable(config.tableName);
  if (!tableInfo) {
    throw new Error(`Failed to refresh state for table: ${config.tableName}`);
  }

  const definition = extractTableStoreDefinition(config);
  const arn = `arn:acs:ots:${context.region}:${context.accountId}:instance/${config.instanceName}/table/${config.tableName}`;
  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [
      buildTableStoreInstanceFromProvider(tableInfo, arn, config.instanceName, config.clusterType),
    ],
    lastUpdated: new Date().toISOString(),
  };

  const logicalId = `tables.${table.key}`;
  return setResource(state, logicalId, resourceState);
};

export const readTableResource = async (
  context: Context,
  instanceName: string,
  tableName: string,
) => {
  const client = createAliyunClient(context);
  const tablestoreClient = client.tablestore(instanceName);
  return await tablestoreClient.getTable(tableName);
};

export const updateTableResource = async (
  context: Context,
  table: TableDomain,
  state: StateFile,
): Promise<StateFile> => {
  const config = tableToTableStoreConfig(table);
  const client = createAliyunClient(context);
  const tablestoreClient = client.tablestore(config.instanceName);

  // Update table (only reserved throughput and table options can be updated)
  // Note: Primary keys cannot be changed in TableStore
  await tablestoreClient.updateTable({
    tableName: config.tableName,
    primaryKey: config.primaryKey, // Required by SDK but not used for updates
    reservedThroughput: config.reservedThroughput,
    tableOptions: config.tableOptions,
  });

  // Wait for table to be ready
  await tablestoreClient.waitForTableReady(config.tableName);

  // Refresh state from provider to get all attributes
  const tableInfo = await tablestoreClient.getTable(config.tableName);
  if (!tableInfo) {
    throw new Error(`Failed to refresh state for table: ${config.tableName}`);
  }

  const definition = extractTableStoreDefinition(config);
  const arn = `arn:acs:ots:${context.region}:${context.accountId}:instance/${config.instanceName}/table/${config.tableName}`;
  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [
      buildTableStoreInstanceFromProvider(tableInfo, arn, config.instanceName, config.clusterType),
    ],
    lastUpdated: new Date().toISOString(),
  };

  const logicalId = `tables.${table.key}`;
  return setResource(state, logicalId, resourceState);
};

export const deleteTableResource = async (
  context: Context,
  instanceName: string,
  tableName: string,
  logicalId: string,
  state: StateFile,
): Promise<StateFile> => {
  const client = createAliyunClient(context);
  const tablestoreClient = client.tablestore(instanceName);
  await tablestoreClient.deleteTable(tableName);
  return removeResource(state, logicalId);
};
