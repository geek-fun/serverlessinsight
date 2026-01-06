import TableStore from 'tablestore';
import { logger } from '../logger';

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
  };
  streamDetails?: {
    enableStream?: boolean;
    streamId?: string;
    expirationTime?: number;
    lastEnableTime?: string;
  };
};

const waitForTableReady = async (
  describeTable: (tableName: string) => Promise<TableStoreTableInfo | null>,
  tableName: string,
): Promise<void> => {
  const maxAttempts = 60;
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      const table = await describeTable(tableName);

      if (table) {
        logger.info(`Table ${tableName} is ready`);
        return;
      }
    } catch (error: unknown) {
      // Table might not exist yet during creation
      if (attempts < maxAttempts - 1) {
        logger.info(
          `Waiting for table ${tableName} to be ready... (attempt ${attempts + 1}/${maxAttempts})`,
        );
        await new Promise((resolve) => setTimeout(resolve, 5000));
        attempts++;
        continue;
      }
      throw error;
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));
    attempts++;
  }

  throw new Error(`Timeout waiting for table ${tableName} to be ready`);
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
            logger.error(`Failed to create table ${config.tableName}: ${err.message}`);
            reject(err);
          } else {
            logger.info(`Successfully created table ${config.tableName}`);
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
              logger.error(`Failed to describe table ${tableName}: ${errorMessage}`);
              reject(err);
            }
          } else {
            const result = data as {
              tableMeta?: {
                tableName?: string;
                primaryKey?: Array<{ name: string; type: string }>;
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
              };
              streamDetails?: {
                enableStream?: boolean;
                streamId?: string;
                expirationTime?: number;
                lastEnableTime?: string;
              };
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
            logger.error(`Failed to update table ${config.tableName}: ${err.message}`);
            reject(err);
          } else {
            logger.info(`Successfully updated table ${config.tableName}`);
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
              logger.info(`Table ${tableName} already deleted or does not exist`);
              resolve();
            } else {
              logger.error(`Failed to delete table ${tableName}: ${errorMessage}`);
              reject(err);
            }
          } else {
            logger.info(`Successfully deleted table ${tableName}`);
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
