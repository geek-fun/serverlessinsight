import * as cynosdb from 'tencentcloud-sdk-nodejs-cynosdb';
import { Context } from '../../types';
import { TdsqlcClusterConfig, TdsqlcClusterInfo, TdsqlcClusterStatus } from './types';
import { logger } from '../logger';
import { lang } from '../../lang';

type CynosdbClient = InstanceType<typeof cynosdb.cynosdb.v20190107.Client>;
type CynosdbSdkClient = CynosdbClient;

// TDSQL-C helper functions
const waitForClusterReady = async (
  getCluster: (clusterId: string) => Promise<TdsqlcClusterInfo | null>,
  clusterId: string,
): Promise<void> => {
  const maxAttempts = 60;
  let attempts = 0;

  while (attempts < maxAttempts) {
    const cluster = await getCluster(clusterId);

    if (!cluster) {
      throw new Error(lang.__('TDSQL_CLUSTER_NOT_FOUND', { clusterId }));
    }

    if (cluster.Status === TdsqlcClusterStatus.RUNNING) {
      logger.info(lang.__('TDSQL_CLUSTER_READY', { clusterId }));
      return;
    }

    if (
      cluster.Status === TdsqlcClusterStatus.ISOLATED ||
      cluster.Status === TdsqlcClusterStatus.OFFLINE
    ) {
      throw new Error(lang.__('TDSQL_CLUSTER_ERROR_STATE', { status: cluster.Status }));
    }

    logger.info(lang.__('TDSQL_CLUSTER_WAITING', { clusterId, status: cluster.Status }));
    await new Promise((resolve) => setTimeout(resolve, 10000));
    attempts++;
  }

  throw new Error(lang.__('TDSQL_CLUSTER_TIMEOUT_READY', { clusterId }));
};

const waitForClusterDeleted = async (
  getCluster: (clusterId: string) => Promise<TdsqlcClusterInfo | null>,
  clusterId: string,
): Promise<void> => {
  const maxAttempts = 60;
  let attempts = 0;

  while (attempts < maxAttempts) {
    const cluster = await getCluster(clusterId);

    if (!cluster) {
      logger.info(lang.__('TDSQL_CLUSTER_DELETED', { clusterId }));
      return;
    }

    if (
      cluster.Status === TdsqlcClusterStatus.ISOLATED ||
      cluster.Status === TdsqlcClusterStatus.OFFLINE
    ) {
      logger.info(lang.__('TDSQL_CLUSTER_BEING_DELETED', { clusterId }));
      await new Promise((resolve) => setTimeout(resolve, 10000));
      attempts++;
      continue;
    }

    logger.info(lang.__('TDSQL_CLUSTER_WAITING_DELETE', { clusterId, status: cluster.Status }));
    await new Promise((resolve) => setTimeout(resolve, 10000));
    attempts++;
  }

  throw new Error(lang.__('TDSQL_CLUSTER_TIMEOUT_DELETE', { clusterId }));
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

        const cluster = response.ClusterSet[0];

        return {
          ClusterId: cluster.ClusterId || '',
          ClusterName: cluster.ClusterName || '',
          Region: cluster.Region || context.region,
          Zone: cluster.Zone,
          PhysicalZone: cluster.PhysicalZone,
          DbType: cluster.DbType || '',
          DbVersion: cluster.DbVersion || '',
          DbMode: cluster.DbMode,
          Status: cluster.Status || '',
          StatusDesc: cluster.StatusDesc,
          ServerlessStatus: cluster.ServerlessStatus,
          VpcId: cluster.VpcId,
          VpcName: undefined,
          SubnetId: cluster.SubnetId,
          SubnetName: undefined,
          Charset: undefined,
          Vip: cluster.Vip,
          Vport: cluster.Vport,
          WanDomain: undefined,
          WanIP: undefined,
          WanPort: undefined,
          WanStatus: undefined,
          MinCpu: undefined,
          MaxCpu: undefined,
          MinStorageSize: cluster.MinStorageSize,
          MaxStorageSize: cluster.MaxStorageSize,
          StorageId: cluster.StorageId,
          Storage: cluster.Storage,
          StorageLimit: cluster.StorageLimit,
          StoragePayMode: cluster.StoragePayMode,
          AutoPause: cluster.ServerlessStatus,
          AutoPauseDelay: undefined,
          CreateTime: cluster.CreateTime,
          UpdateTime: cluster.UpdateTime,
          ProjectId: cluster.ProjectID,
          PayMode: cluster.PayMode,
          PeriodEndTime: cluster.PeriodEndTime,
          AutoRenewFlag: cluster.RenewFlag,
          InstanceCount: cluster.InstanceNum,
          ProcessingTask: cluster.ProcessingTask,
          SupportedFeatures: undefined,
          RollbackSupport: undefined,
          NetworkType: undefined,
          ResourcePackageId: undefined,
          ResourcePackageType: undefined,
          ResourcePackageState: undefined,
          PhysicalRegion: undefined,
          ProxyStatus: undefined,
          RwGroupId: undefined,
          MasterZone: cluster.MasterZone,
          SlaveZones: cluster.SlaveZones,
          BusinessType: cluster.BusinessType,
          IsFreeze: cluster.IsFreeze,
          OrderSource: cluster.OrderSource,
          Ability: cluster.Ability,
          ResourceTags: cluster.ResourceTags,
          CynosVersion: cluster.CynosVersion,
          CynosVersionStatus: undefined,
          IsLatestVersion: undefined,
        };
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
