import * as tencentcloud from 'tencentcloud-sdk-nodejs-cynosdb';
import { Context } from '../../types';
import { TdsqlcClusterConfig, TdsqlcClusterInfo } from './tdsqlcTypes';
import { logger } from '../../common';

const CynosdbClient = tencentcloud.cynosdb.v20190107.Client;

type CynosdbClientInstance = InstanceType<typeof CynosdbClient>;

const createTdsqlcClient = (context: Context): CynosdbClientInstance => {
  const clientConfig = {
    credential: {
      secretId: context.accessKeyId,
      secretKey: context.accessKeySecret,
    },
    region: context.region,
    profile: {
      httpProfile: {
        endpoint: 'cynosdb.tencentcloudapi.com',
      },
    },
  };

  return new CynosdbClient(clientConfig);
};

export const createTdsqlcCluster = async (
  context: Context,
  config: TdsqlcClusterConfig,
): Promise<string> => {
  const client = createTdsqlcClient(context);

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
    AutoPause: config.AutoPause,
    AutoPauseDelay: config.AutoPauseDelay,
    StoragePayMode: config.StoragePayMode,
    StorageLimit: config.MaxStorageSize,
  };

  try {
    const response = await client.CreateClusters(params);
    logger.info(`TDSQL-C cluster creation initiated: ${JSON.stringify(response)}`);

    if (!response.ClusterIds || response.ClusterIds.length === 0) {
      throw new Error('Failed to create TDSQL-C cluster: No cluster ID returned');
    }

    const clusterId = response.ClusterIds[0];

    // Wait for cluster to be ready
    await waitForClusterReady(context, clusterId);

    return clusterId;
  } catch (error) {
    logger.error(`Failed to create TDSQL-C cluster: ${error}`);
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
    logger.error(`Failed to get TDSQL-C cluster: ${error}`);
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
    AutoPause: config.AutoPause,
    AutoPauseDelay: config.AutoPauseDelay,
  };

  try {
    await client.ModifyServerlessStrategy(params);
    logger.info(`TDSQL-C cluster updated: ${clusterId}`);

    // Wait for update to complete
    await waitForClusterReady(context, clusterId);
  } catch (error) {
    logger.error(`Failed to update TDSQL-C cluster: ${error}`);
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
    logger.info(`TDSQL-C cluster deletion initiated: ${clusterId}`);

    // Wait for cluster to be deleted
    await waitForClusterDeleted(context, clusterId);
  } catch (error) {
    logger.error(`Failed to delete TDSQL-C cluster: ${error}`);
    throw error;
  }
};

const waitForClusterReady = async (context: Context, clusterId: string): Promise<void> => {
  const maxAttempts = 60; // 10 minutes (60 * 10 seconds)
  let attempts = 0;

  while (attempts < maxAttempts) {
    const cluster = await getTdsqlcCluster(context, clusterId);

    if (!cluster) {
      throw new Error(`TDSQL-C cluster not found: ${clusterId}`);
    }

    if (cluster.Status === 'running') {
      logger.info(`TDSQL-C cluster is ready: ${clusterId}`);
      return;
    }

    if (cluster.Status === 'isolated' || cluster.Status === 'offline') {
      throw new Error(`TDSQL-C cluster is in error state: ${cluster.Status}`);
    }

    logger.info(
      `Waiting for TDSQL-C cluster to be ready: ${clusterId} (status: ${cluster.Status})`,
    );
    await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait 10 seconds
    attempts++;
  }

  throw new Error(`Timeout waiting for TDSQL-C cluster to be ready: ${clusterId}`);
};

const waitForClusterDeleted = async (context: Context, clusterId: string): Promise<void> => {
  const maxAttempts = 60; // 10 minutes
  let attempts = 0;

  while (attempts < maxAttempts) {
    const cluster = await getTdsqlcCluster(context, clusterId);

    if (!cluster) {
      logger.info(`TDSQL-C cluster deleted: ${clusterId}`);
      return;
    }

    if (cluster.Status === 'isolated' || cluster.Status === 'offline') {
      logger.info(`TDSQL-C cluster is being deleted: ${clusterId}`);
      await new Promise((resolve) => setTimeout(resolve, 10000));
      attempts++;
      continue;
    }

    logger.info(
      `Waiting for TDSQL-C cluster to be deleted: ${clusterId} (status: ${cluster.Status})`,
    );
    await new Promise((resolve) => setTimeout(resolve, 10000));
    attempts++;
  }

  throw new Error(`Timeout waiting for TDSQL-C cluster to be deleted: ${clusterId}`);
};
