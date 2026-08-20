import { createAliyunClient } from '../../common/aliyunClient';
import { TableStoreTableInfo } from '../../common/aliyunClient/tablestoreOperations';
import { setResource, removeResource, buildSid } from '../../common';
import { Context, TableDomain, PartialResourceError, ResourceState, StateFile } from '../../types';
import { tableToTableStoreConfig, extractTableStoreDefinition } from './tablestoreTypes';
import { isResourceAlreadyExistsError } from '../alreadyExists';
import { logger } from '../../common/logger';

export type TableStoreTableInstance = {
  type: 'ALIYUN_TABLESTORE_TABLE';
  sid: string;
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
    bloomFilterType?: string | null;
    blockSize?: number | null;
  };
  streamDetails?: {
    enableStream?: boolean | null;
    streamId?: string | null;
    expirationTime?: number | null;
    lastEnableTime?: string | null;
  };
  tableStatus?: string | null;
  definedColumn?: Array<{
    name: string;
    type: string;
  }>;
  indexMetas?: Array<{
    name?: string;
    primaryKey?: string[];
    definedColumn?: string[];
    indexUpdateMode?: string;
    indexType?: string;
    indexSyncPhase?: string;
  }>;
  shardSplits?: string[];
};

const buildTableStoreInstanceFromProvider = (
  info: TableStoreTableInfo,
  sid: string,
  instanceName: string,
  clusterType: string,
): TableStoreTableInstance => {
  return {
    type: 'ALIYUN_TABLESTORE_TABLE',
    sid,
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
          bloomFilterType: info.tableOptions.bloomFilterType ?? null,
          blockSize: info.tableOptions.blockSize ?? null,
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
    tableStatus: info.tableStatus ?? null,
    definedColumn: info.definedColumn ?? [],
    indexMetas: info.indexMetas ?? [],
    shardSplits: info.shardSplits ?? [],
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

  const logicalId = `tables.${table.key}`;
  const definition = extractTableStoreDefinition(config);
  const sid = buildSid(
    'aliyun',
    'ots',
    context.stage,
    `${config.instanceName}/${config.tableName}`,
  );

  const taintedResourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [],
    lastUpdated: new Date().toISOString(),
    status: 'tainted',
  };

  const stateAfterDependents = setResource(state, logicalId, taintedResourceState);

  try {
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

    const resourceState: ResourceState = {
      mode: 'managed',
      region: context.region,
      definition,
      instances: [
        buildTableStoreInstanceFromProvider(
          tableInfo,
          sid,
          config.instanceName,
          config.clusterType,
        ),
      ],
      lastUpdated: new Date().toISOString(),
    };

    return setResource(stateAfterDependents, logicalId, resourceState);
  } catch (error) {
    // Aliyun Tablestore (OTS) does NOT support table-level tags — only
    // instance-level. Without a tag, ownership of a pre-existing table cannot
    // be verified, so tag-based idempotent adoption is IMPOSSIBLE. On a create
    // collision we therefore ALWAYS refuse to adopt (never take over a table
    // that may belong to another project): persist the tainted state and let
    // the user resolve manually.
    if (isResourceAlreadyExistsError(error, ['OTSObjectAlreadyExist', 'OTSInstanceAlreadyExist'])) {
      const existingTable = await tablestoreClient.getTable(config.tableName);
      if (existingTable) {
        throw new PartialResourceError(
          stateAfterDependents,
          new Error(
            `Table ${config.tableName} already exists in provider but ownership cannot be verified (Tablestore does not support table-level tags). Refusing to adopt — resolve manually.`,
          ),
        );
      }
    }
    throw new PartialResourceError(
      stateAfterDependents,
      error instanceof Error ? error : new Error(String(error)),
    );
  }
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
  const sid = buildSid(
    'aliyun',
    'ots',
    context.stage,
    `${config.instanceName}/${config.tableName}`,
  );
  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [
      buildTableStoreInstanceFromProvider(tableInfo, sid, config.instanceName, config.clusterType),
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
  try {
    await tablestoreClient.deleteTable(tableName);
  } catch (err) {
    const errorMessage = (err as { message?: string })?.message ?? '';
    if (errorMessage.includes('OTSObjectNotExist') || errorMessage.includes('does not exist')) {
      logger.warn(
        `Table ${tableName} in instance ${instanceName} not found in provider, skipping deletion`,
      );
    } else {
      throw err;
    }
  }
  return removeResource(state, logicalId);
};
