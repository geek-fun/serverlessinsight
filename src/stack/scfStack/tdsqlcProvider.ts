import { Context } from '../../types';
import { TdsqlcClusterConfig, TdsqlcClusterInfo } from './tdsqlcTypes';
import { logger } from '../../common';
import { createTdsqlcClient } from '../../common/scfClient';
import { lang } from '../../lang';

export const createTdsqlcCluster = async (
  context: Context,
  config: TdsqlcClusterConfig,
): Promise<string> => {
  const client = createTdsqlcClient(context);

  // Note: Zone is hardcoded to use the first availability zone in the region.
  // For production use, this should be made configurable or use proper zone lookup.
  const params = {
    Zone: `${context.region}-1`, // Default zone
    VpcId: config.VpcId || '',
    SubnetId: config.SubnetId || '',
    DbType: config.DbType,
    DbVersion: config.DbVersion,
    DbMode: config.DbMode,
    ProjectId: config.ProjectId || 0,
    ClusterName: config.ClusterName,
    AdminPassword: config.AdminPassword,
    Port: config.Port || 3306,
    PayMode: 0, // Pay-per-use
    MinCpu: config.MinCpu,
    MaxCpu: config.MaxCpu,
    AutoPause: config.AutoPause ? 'yes' : 'no',
    AutoPauseDelay: config.AutoPauseDelay,
    StoragePayMode: config.StoragePayMode,
    StorageLimit: config.MaxStorageSize,
  };

  try {
    const response = await client.CreateClusters(params);
    logger.info(lang.__('TDSQL_CLUSTER_CREATION_INITIATED'));

    if (!response.ClusterIds || response.ClusterIds.length === 0) {
      throw new Error(lang.__('TDSQL_CLUSTER_NO_ID_RETURNED'));
    }

    const clusterId = response.ClusterIds[0];

    // Wait for cluster to be ready
    await waitForClusterReady(context, clusterId);

    return clusterId;
  } catch (error) {
    logger.error(`${lang.__('TDSQL_CLUSTER_CREATION_FAILED')}: ${error}`);
    throw error;
  }
};

export const getTdsqlcCluster = async (
  context: Context,
  clusterId: string,
): Promise<TdsqlcClusterInfo | null> => {
  const client = createTdsqlcClient(context);

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
    const response = await client.DescribeClusters(params);

    if (!response.ClusterSet || response.ClusterSet.length === 0) {
      return null;
    }

    const cluster = response.ClusterSet[0];

    // Note: MinCpu, MaxCpu, MinStorageSize, MaxStorageSize are not available
    // in the DescribeClusters response. These fields cannot be used for drift detection.
    // For complete drift detection, a separate API call would be needed.
    return {
      ClusterId: cluster.ClusterId || '',
      ClusterName: cluster.ClusterName || '',
      Region: context.region,
      DbType: cluster.DbType || '',
      DbVersion: cluster.DbVersion || '',
      Status: cluster.Status || '',
      VpcId: cluster.VpcId,
      SubnetId: cluster.SubnetId,
      Vip: cluster.Vip,
      Vport: cluster.Vport,
      MinCpu: undefined, // Not available in DescribeClusters response
      MaxCpu: undefined, // Not available in DescribeClusters response
      MinStorageSize: undefined,
      MaxStorageSize: undefined,
      AutoPause: cluster.ServerlessStatus,
      CreateTime: cluster.CreateTime,
      UpdateTime: cluster.UpdateTime,
    };
  } catch (error) {
    logger.error(`${lang.__('TDSQL_CLUSTER_GET_FAILED')}: ${error}`);
    return null;
  }
};

export const updateTdsqlcCluster = async (
  context: Context,
  clusterId: string,
  config: TdsqlcClusterConfig,
): Promise<void> => {
  const client = createTdsqlcClient(context);

  // Update serverless strategy (CPU, auto-pause settings)
  const params = {
    ClusterId: clusterId,
    MinCpu: config.MinCpu,
    MaxCpu: config.MaxCpu,
    AutoPause: config.AutoPause ? 'yes' : 'no',
    AutoPauseDelay: config.AutoPauseDelay,
  };

  try {
    await client.ModifyServerlessStrategy(params);
    logger.info(lang.__('TDSQL_CLUSTER_UPDATED', { clusterId }));

    // Wait for update to complete
    await waitForClusterReady(context, clusterId);
  } catch (error) {
    logger.error(`${lang.__('TDSQL_CLUSTER_UPDATE_FAILED')}: ${error}`);
    throw error;
  }
};

export const deleteTdsqlcCluster = async (context: Context, clusterId: string): Promise<void> => {
  const client = createTdsqlcClient(context);

  const params = {
    ClusterId: clusterId,
  };

  try {
    await client.OfflineCluster(params);
    logger.info(lang.__('TDSQL_CLUSTER_DELETION_INITIATED', { clusterId }));

    // Wait for cluster to be deleted
    await waitForClusterDeleted(context, clusterId);
  } catch (error) {
    logger.error(`${lang.__('TDSQL_CLUSTER_DELETE_FAILED')}: ${error}`);
    throw error;
  }
};

const waitForClusterReady = async (context: Context, clusterId: string): Promise<void> => {
  const maxAttempts = 60; // 10 minutes (60 * 10 seconds)
  let attempts = 0;

  while (attempts < maxAttempts) {
    const cluster = await getTdsqlcCluster(context, clusterId);

    if (!cluster) {
      throw new Error(lang.__('TDSQL_CLUSTER_NOT_FOUND', { clusterId }));
    }

    if (cluster.Status === 'running') {
      logger.info(lang.__('TDSQL_CLUSTER_READY', { clusterId }));
      return;
    }

    if (cluster.Status === 'isolated' || cluster.Status === 'offline') {
      throw new Error(lang.__('TDSQL_CLUSTER_ERROR_STATE', { status: cluster.Status }));
    }

    logger.info(lang.__('TDSQL_CLUSTER_WAITING', { clusterId, status: cluster.Status }));
    await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait 10 seconds
    attempts++;
  }

  throw new Error(lang.__('TDSQL_CLUSTER_TIMEOUT_READY', { clusterId }));
};

const waitForClusterDeleted = async (context: Context, clusterId: string): Promise<void> => {
  const maxAttempts = 60; // 10 minutes
  let attempts = 0;

  while (attempts < maxAttempts) {
    const cluster = await getTdsqlcCluster(context, clusterId);

    if (!cluster) {
      logger.info(lang.__('TDSQL_CLUSTER_DELETED', { clusterId }));
      return;
    }

    if (cluster.Status === 'isolated' || cluster.Status === 'offline') {
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
