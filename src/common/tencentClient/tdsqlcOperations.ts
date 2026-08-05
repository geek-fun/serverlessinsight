import * as cynosdb from 'tencentcloud-sdk-nodejs-cynosdb';
import { Context } from '../../types';
import { TdsqlcClusterConfig, TdsqlcClusterInfo, TdsqlcClusterStatus } from './types';
import { mapClusterToInfo } from './tdsqlcClusterMapper';
import { logger } from '../logger';
import { lang } from '../../lang';
import { pollUntil, PollingTimeoutError } from '../polling';

type CynosdbClient = InstanceType<typeof cynosdb.cynosdb.v20190107.Client>;
type CynosdbSdkClient = CynosdbClient;

// TDSQL-C helper functions
const waitForClusterReady = async (
  getCluster: (clusterId: string) => Promise<TdsqlcClusterInfo | null>,
  clusterId: string,
): Promise<void> => {
  try {
    await pollUntil({
      description: `TDSQL-C cluster ${clusterId} to be ready`,
      fetch: async () => {
        const cluster = await getCluster(clusterId);

        if (!cluster) {
          throw new Error(lang.__('TDSQL_CLUSTER_NOT_FOUND', { clusterId }));
        }

        if (
          cluster.Status === TdsqlcClusterStatus.ISOLATED ||
          cluster.Status === TdsqlcClusterStatus.OFFLINE
        ) {
          throw new Error(lang.__('TDSQL_CLUSTER_ERROR_STATE', { status: cluster.Status }));
        }

        return cluster;
      },
      isDone: (cluster) => cluster?.Status === TdsqlcClusterStatus.RUNNING,
      intervalMs: 10000,
      maxAttempts: 60,
      onProgress: (cluster) => {
        if (cluster) {
          logger.info(lang.__('TDSQL_CLUSTER_WAITING', { clusterId, status: cluster.Status }));
        }
      },
    });
    logger.info(lang.__('TDSQL_CLUSTER_READY', { clusterId }));
  } catch (e) {
    if (e instanceof PollingTimeoutError) {
      throw new Error(lang.__('TDSQL_CLUSTER_TIMEOUT_READY', { clusterId }), { cause: e });
    }
    throw e;
  }
};

const waitForClusterDeleted = async (
  getCluster: (clusterId: string) => Promise<TdsqlcClusterInfo | null>,
  clusterId: string,
): Promise<void> => {
  try {
    await pollUntil({
      description: `TDSQL-C cluster ${clusterId} to be deleted`,
      fetch: () => getCluster(clusterId),
      isDone: (cluster) => cluster === null,
      intervalMs: 10000,
      maxAttempts: 60,
      onProgress: (cluster) => {
        if (cluster) {
          if (
            cluster.Status === TdsqlcClusterStatus.ISOLATED ||
            cluster.Status === TdsqlcClusterStatus.OFFLINE
          ) {
            logger.info(lang.__('TDSQL_CLUSTER_BEING_DELETED', { clusterId }));
          } else {
            logger.info(
              lang.__('TDSQL_CLUSTER_WAITING_DELETE', { clusterId, status: cluster.Status }),
            );
          }
        }
      },
    });
    logger.info(lang.__('TDSQL_CLUSTER_DELETED', { clusterId }));
  } catch (e) {
    if (e instanceof PollingTimeoutError) {
      throw new Error(lang.__('TDSQL_CLUSTER_TIMEOUT_DELETE', { clusterId }), { cause: e });
    }
    throw e;
  }
};

// TDSQL-C operations
export const createTdsqlcOperations = (cynosdbClient: CynosdbSdkClient, context: Context) => {
  const operations = {
    createCluster: async (config: TdsqlcClusterConfig): Promise<string> => {
      const params = {
        Zone: `${context.region}-1`,
        VpcId: config.VpcId || '',
        SubnetId: config.SubnetId || '',
        DbType: config.DbType,
        DbVersion: config.DbVersion,
        DbMode: config.DbMode,
        ProjectId: config.ProjectId || 0,
        ClusterName: config.ClusterName,
        AdminPassword: config.AdminPassword,
        Port: config.Port || 3306,
        PayMode: 0,
        MinCpu: config.MinCpu,
        MaxCpu: config.MaxCpu,
        AutoPause: config.AutoPause ? 'yes' : 'no',
        AutoPauseDelay: config.AutoPauseDelay,
        StoragePayMode: config.StoragePayMode,
        StorageLimit: config.MaxStorageSize,
        ...(config.ResourceTags ? { ResourceTags: config.ResourceTags } : {}),
      };

      try {
        const response = await cynosdbClient.CreateClusters(params);
        logger.info(lang.__('TDSQL_CLUSTER_CREATION_INITIATED'));

        if (!response.ClusterIds || response.ClusterIds.length === 0) {
          throw new Error(lang.__('TDSQL_CLUSTER_NO_ID_RETURNED'));
        }

        const clusterId = response.ClusterIds[0];

        // Wait for cluster to be ready
        await waitForClusterReady(operations.getCluster, clusterId);

        return clusterId;
      } catch (error) {
        logger.error(`${lang.__('TDSQL_CLUSTER_CREATION_FAILED')}: ${error}`);
        throw error;
      }
    },

    getCluster: async (clusterId: string): Promise<TdsqlcClusterInfo | null> => {
      const params = {
        Filters: [
          {
            Names: ['ClusterId'],
            Values: [clusterId],
            ExactMatch: true,
          },
        ],
      };

      try {
        const response = await cynosdbClient.DescribeClusters(params);

        if (!response.ClusterSet || response.ClusterSet.length === 0) {
          return null;
        }

        return mapClusterToInfo(response.ClusterSet[0], context.region);
      } catch (error) {
        logger.error(`${lang.__('TDSQL_CLUSTER_GET_FAILED')}: ${error}`);
        return null;
      }
    },

    // DescribeClusters filters only support ClusterId/InstanceId/InstanceName
    // (SDK QueryFilter docs), so a name probe lists clusters and matches by
    // ClusterName client-side. Pages up to 500 clusters (5 requests).
    getClusterByName: async (clusterName: string): Promise<TdsqlcClusterInfo | null> => {
      try {
        for (let offset = 0; offset < 500; offset += 100) {
          const response = await cynosdbClient.DescribeClusters({ Limit: 100, Offset: offset });
          const cluster = (response.ClusterSet ?? []).find((c) => c.ClusterName === clusterName);
          if (cluster) {
            return mapClusterToInfo(cluster, context.region);
          }
          if (!response.ClusterSet || response.ClusterSet.length < 100) {
            break;
          }
        }
        return null;
      } catch (error) {
        logger.error(`${lang.__('TDSQL_CLUSTER_GET_FAILED')}: ${error}`);
        return null;
      }
    },

    updateCluster: async (clusterId: string, config: TdsqlcClusterConfig): Promise<void> => {
      const params = {
        ClusterId: clusterId,
        MinCpu: config.MinCpu,
        MaxCpu: config.MaxCpu,
        AutoPause: config.AutoPause ? 'yes' : 'no',
        AutoPauseDelay: config.AutoPauseDelay,
      };

      try {
        await cynosdbClient.ModifyServerlessStrategy(params);
        logger.info(lang.__('TDSQL_CLUSTER_UPDATED', { clusterId }));

        // Wait for update to complete
        await waitForClusterReady(operations.getCluster, clusterId);
      } catch (error) {
        logger.error(`${lang.__('TDSQL_CLUSTER_UPDATE_FAILED')}: ${error}`);
        throw error;
      }
    },

    deleteCluster: async (clusterId: string): Promise<void> => {
      const params = {
        ClusterId: clusterId,
      };

      try {
        await cynosdbClient.OfflineCluster(params);
        logger.info(lang.__('TDSQL_CLUSTER_DELETION_INITIATED', { clusterId }));

        // Wait for cluster to be deleted
        await waitForClusterDeleted(operations.getCluster, clusterId);
      } catch (error) {
        logger.error(`${lang.__('TDSQL_CLUSTER_DELETE_FAILED')}: ${error}`);
        throw error;
      }
    },
  };

  return operations;
};
