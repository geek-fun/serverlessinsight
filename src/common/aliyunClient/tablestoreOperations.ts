import TableStore from 'tablestore';
import { logger } from '../logger';
import { pollUntil, PollingTimeoutError } from '../polling';
import { lang } from '../../lang';

export enum TableStoreInstanceStatus {
  RUNNING = 'RUNNING',
  CREATING = 'CREATING',
  DELETED = 'DELETED',
  DISABLED = 'DISABLED',
}

export type TableStoreInstanceConfig = {
  instanceName: string;
  clusterType: 'HYBRID' | 'SSD';
  description?: string;
};

export type TableStoreTableConfig = {
  tableName: string;
  primaryKey: Array<{
    name: string;
    type: 'INTEGER' | 'STRING' | 'BINARY';
  }>;
  reservedThroughput?: {
    capacityUnit: {
      read: number;
      write: number;
    };
  };
  tableOptions?: {
    timeToLive?: number;
    maxVersions?: number;
  };
};

export type TableStoreInstanceInfo = {
  instanceName: string;
  status?: string;
  clusterType?: string;
  description?: string;
  createTime?: string;
  network?: string;
  quota?: {
    entityQuota?: number;
  };
};

export type TableStoreTableInfo = {
  tableName: string;
  primaryKey?: Array<{
    name: string;
    type: string;
  }>;
  reservedThroughputDetails?: {
    capacityUnit?: {
      read?: number;
      write?: number;
    };
    lastIncreaseTime?: string;
    lastDecreaseTime?: string;
  };
  tableOptions?: {
    timeToLive?: number;
    maxVersions?: number;
    maxTimeDeviation?: number;
    allowUpdate?: boolean;
    bloomFilterType?: string;
    blockSize?: number;
  };
  streamDetails?: {
    enableStream?: boolean;
    streamId?: string;
    expirationTime?: number;
    lastEnableTime?: string;
  };
  // Maximum-detail fields — retained from DescribeTable so state keeps the
  // full cloud resource detail (status, defined columns, secondary indexes,
  // shard splits).
  tableStatus?: string;
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

const waitForTableReady = async (
  describeTable: (tableName: string) => Promise<TableStoreTableInfo | null>,
  tableName: string,
): Promise<void> => {
  try {
    await pollUntil({
      description: `table ${tableName} to be ready`,
      fetch: () => describeTable(tableName),
      isDone: (table) => table !== null,
      intervalMs: 5000,
      maxAttempts: 60,
      onProgress: (table, attempt, maxAttempts) => {
        if (!table) {
          logger.info(
            lang.__('OTS_WAITING_TABLE', {
              tableName,
              attempt: String(attempt),
              maxAttempts: String(maxAttempts),
            }),
          );
        }
      },
    });
    logger.info(lang.__('OTS_TABLE_READY', { tableName }));
  } catch (e) {
    if (e instanceof PollingTimeoutError) {
      throw new Error(lang.__('OTS_TABLE_TIMEOUT', { tableName }), { cause: e });
    }
    throw e;
  }
};

export const createTablestoreOperations = (
  endpoint: string,
  instanceName: string,
  context: { accessKeyId: string; accessKeySecret: string; securityToken?: string },
) => {
  const client = new TableStore.Client({
    accessKeyId: context.accessKeyId,
    secretAccessKey: context.accessKeySecret,
    stsToken: context.securityToken,
    endpoint,
    instancename: instanceName,
  });

  return {
    createTable: async (config: TableStoreTableConfig): Promise<void> => {
      const params = {
        tableMeta: {
          tableName: config.tableName,
          primaryKey: config.primaryKey.map((pk) => ({
            name: pk.name,
            type: pk.type,
          })),
        },
        reservedThroughput: config.reservedThroughput || {
          capacityUnit: {
            read: 0,
            write: 0,
          },
        },
        tableOptions: config.tableOptions || {
          timeToLive: -1,
          maxVersions: 1,
        },
      };

      return new Promise((resolve, reject) => {
        client.createTable(params, (err: Error | null) => {
          if (err) {
            logger.error(
              lang.__('OTS_CREATE_TABLE_FAILED', {
                tableName: config.tableName,
                error: err.message,
              }),
            );
            reject(err);
          } else {
            logger.info(lang.__('OTS_TABLE_CREATED', { tableName: config.tableName }));
            resolve();
          }
        });
      });
    },

    getTable: async (tableName: string): Promise<TableStoreTableInfo | null> => {
      const params = {
        tableName,
      };

      return new Promise((resolve, reject) => {
        client.describeTable(params, (err: Error | null, data: unknown) => {
          if (err) {
            const errorMessage = (err as { message?: string }).message || String(err);
            if (
              errorMessage.includes('OTSObjectNotExist') ||
              errorMessage.includes('does not exist')
            ) {
              resolve(null);
            } else {
              logger.error(
                lang.__('OTS_DESCRIBE_TABLE_FAILED', { tableName, error: errorMessage }),
              );
              reject(err);
            }
          } else {
            const result = data as {
              tableMeta?: {
                tableName?: string;
                primaryKey?: Array<{ name: string; type: string }>;
                definedColumn?: Array<{ name: string; type: string }>;
                indexMeta?: Array<{
                  name?: string;
                  primaryKey?: string[];
                  definedColumn?: string[];
                  indexUpdateMode?: string;
                  indexType?: string;
                  indexSyncPhase?: string;
                }>;
              };
              reservedThroughputDetails?: {
                capacityUnit?: { read?: number; write?: number };
                lastIncreaseTime?: string;
                lastDecreaseTime?: string;
              };
              tableOptions?: {
                timeToLive?: number;
                maxVersions?: number;
                maxTimeDeviation?: number;
                allowUpdate?: boolean;
                bloomFilterType?: string;
                blockSize?: number;
              };
              streamDetails?: {
                enableStream?: boolean;
                streamId?: string;
                expirationTime?: number;
                lastEnableTime?: string;
              };
              tableStatus?: string;
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

            if (!result.tableMeta) {
              resolve(null);
            } else {
              resolve({
                tableName: result.tableMeta.tableName || tableName,
                primaryKey: result.tableMeta.primaryKey,
                reservedThroughputDetails: result.reservedThroughputDetails,
                tableOptions: result.tableOptions,
                streamDetails: result.streamDetails,
                // Maximum-detail fields — retain everything DescribeTable returns.
                tableStatus: result.tableStatus,
                definedColumn: result.tableMeta.definedColumn,
                indexMetas: result.indexMetas ?? result.tableMeta.indexMeta,
                shardSplits: result.shardSplits,
              });
            }
          }
        });
      });
    },

    updateTable: async (config: TableStoreTableConfig): Promise<void> => {
      const params = {
        tableName: config.tableName,
        reservedThroughput: config.reservedThroughput || {
          capacityUnit: {
            read: 0,
            write: 0,
          },
        },
        tableOptions: config.tableOptions,
      };

      return new Promise((resolve, reject) => {
        client.updateTable(params, (err: Error | null) => {
          if (err) {
            logger.error(
              lang.__('OTS_UPDATE_TABLE_FAILED', {
                tableName: config.tableName,
                error: err.message,
              }),
            );
            reject(err);
          } else {
            logger.info(lang.__('OTS_TABLE_UPDATED', { tableName: config.tableName }));
            resolve();
          }
        });
      });
    },

    deleteTable: async (tableName: string): Promise<void> => {
      const params = {
        tableName,
      };

      return new Promise((resolve, reject) => {
        client.deleteTable(params, (err: Error | null) => {
          if (err) {
            const errorMessage = (err as { message?: string }).message || String(err);
            // If table doesn't exist, consider deletion successful
            if (
              errorMessage.includes('OTSObjectNotExist') ||
              errorMessage.includes('does not exist')
            ) {
              logger.info(lang.__('OTS_TABLE_ALREADY_DELETED', { tableName }));
              resolve();
            } else {
              logger.error(lang.__('OTS_DELETE_TABLE_FAILED', { tableName, error: errorMessage }));
              reject(err);
            }
          } else {
            logger.info(lang.__('OTS_TABLE_DELETED', { tableName }));
            resolve();
          }
        });
      });
    },

    waitForTableReady: async (tableName: string): Promise<void> => {
      return waitForTableReady(async (name) => {
        try {
          return await new Promise((resolve, reject) => {
            client.describeTable({ tableName: name }, (err: Error | null, data: unknown) => {
              if (err) {
                reject(err);
              } else {
                const result = data as {
                  tableMeta?: {
                    tableName?: string;
                    primaryKey?: Array<{ name: string; type: string }>;
                  };
                };
                if (!result.tableMeta) {
                  resolve(null);
                } else {
                  resolve({
                    tableName: result.tableMeta.tableName || name,
                    primaryKey: result.tableMeta.primaryKey,
                  });
                }
              }
            });
          });
        } catch {
          return null;
        }
      }, tableName);
    },
  };
};
