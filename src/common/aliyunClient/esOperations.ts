import EsClient from '@alicloud/elasticsearch20170613';
import { Context } from '../../types';
import { logger } from '../logger';

export type EsConfig = {
  AppName: string;
  AppVersion: string;
  Authentication?: {
    BasicAuth?: Array<{
      Password: string;
    }>;
  };
  QuotaInfo: {
    AppType: string;
    MinCu: number;
  };
  Description?: string;
  Network?: Array<{
    Type: string;
    Enabled: boolean;
    WhiteIpGroup?: Array<{
      GroupName: string;
      Ips: string[];
    }>;
  }>;
  ChargeType?: string;
  RegionId?: string;
};

export type EsInfo = {
  AppId?: string;
  AppName?: string;
  AppVersion?: string;
  Status?: string;
  Description?: string;
  CreateTime?: number;
  ModifiedTime?: number;
  RegionId?: string;
  QuotaInfo?: {
    AppType?: string;
    MinCu?: number;
  };
  Network?: Array<{
    Type?: string;
    Enabled?: boolean;
    WhiteIpGroup?: Array<{
      GroupName?: string;
      Ips?: string[];
    }>;
    Endpoint?: string;
  }>;
};

const waitForEsAppReady = async (
  getApp: (appId: string) => Promise<EsInfo | null>,
  appId: string,
): Promise<void> => {
  const maxAttempts = 60;
  let attempts = 0;

  while (attempts < maxAttempts) {
    const app = await getApp(appId);

    if (!app) {
      throw new Error(`Elasticsearch serverless app not found: ${appId}`);
    }

    if (app.Status === 'active' || app.Status === 'ACTIVE') {
      logger.info(`Elasticsearch serverless app ready: ${appId}`);
      return;
    }

    if (app.Status === 'inactive' || app.Status === 'INACTIVE') {
      throw new Error(`Elasticsearch serverless app in error state: ${app.Status}`);
    }

    logger.info(`Waiting for ES app ${appId}, status: ${app.Status}`);
    await new Promise((resolve) => setTimeout(resolve, 10000));
    attempts++;
  }

  throw new Error(`Timeout waiting for ES app to be ready: ${appId}`);
};

export const createEsOperations = (esClient: EsClient, context: Context) => {
  const operations = {
    createApp: async (config: EsConfig): Promise<string> => {
      const params = {
        body: JSON.stringify({
          appName: config.AppName,
          appVersion: config.AppVersion,
          authentication: config.Authentication,
          quotaInfo: config.QuotaInfo,
          description: config.Description,
          network: config.Network,
          chargeType: config.ChargeType || 'POSTPAY',
        }),
        regionId: config.RegionId || context.region,
      };

      try {
        const response = await esClient.createServerlessApp(params as any);
        logger.info('Elasticsearch serverless app creation initiated');

        if (!response.body?.Result?.appId) {
          throw new Error('No ES app ID returned');
        }

        const appId = response.body.Result.appId;

        // Wait for app to be ready
        await waitForEsAppReady(operations.getApp, appId);

        return appId;
      } catch (error) {
        logger.error(`ES app creation failed: ${error}`);
        throw error;
      }
    },

    getApp: async (appId: string): Promise<EsInfo | null> => {
      const params = {
        appId,
      };

      try {
        const response = await esClient.getServerlessApp(params as any);

        if (!response.body?.Result) {
          return null;
        }

        const app = response.body.Result;

        return {
          AppId: app.appId,
          AppName: app.appName,
          AppVersion: app.appVersion,
          Status: app.status,
          Description: app.description,
          CreateTime: app.createTime,
          ModifiedTime: app.modifiedTime,
          RegionId: app.regionId,
          QuotaInfo: app.quotaInfo
            ? {
                AppType: app.quotaInfo.appType,
                MinCu: app.quotaInfo.minCu,
              }
            : undefined,
          Network: app.network
            ? app.network.map((n: any) => ({
                Type: n.type,
                Enabled: n.enabled,
                WhiteIpGroup: n.whiteIpGroup
                  ? n.whiteIpGroup.map((w: any) => ({
                      GroupName: w.groupName,
                      Ips: w.ips,
                    }))
                  : undefined,
                Endpoint: n.endpoint,
              }))
            : undefined,
        };
      } catch (error) {
        logger.error(`Failed to get ES app: ${error}`);
        return null;
      }
    },

    updateApp: async (appId: string, config: EsConfig): Promise<void> => {
      const params = {
        appId,
        body: JSON.stringify({
          appName: config.AppName,
          description: config.Description,
          quotaInfo: config.QuotaInfo,
          authentication: config.Authentication,
          network: config.Network,
        }),
      };

      try {
        await esClient.updateServerlessApp(params as any);
        logger.info(`ES app updated: ${appId}`);

        // Wait for app to be ready
        await waitForEsAppReady(operations.getApp, appId);
      } catch (error) {
        logger.error(`ES app update failed: ${error}`);
        throw error;
      }
    },

    deleteApp: async (appId: string): Promise<void> => {
      const params = {
        appId,
      };

      try {
        await esClient.deleteServerlessApp(params as any);
        logger.info(`ES app deletion initiated: ${appId}`);

        // Wait for app to be deleted
        const maxAttempts = 60;
        let attempts = 0;

        while (attempts < maxAttempts) {
          const app = await operations.getApp(appId);

          if (!app) {
            logger.info(`ES app deleted: ${appId}`);
            return;
          }

          logger.info(`Waiting for ES app deletion: ${appId}`);
          await new Promise((resolve) => setTimeout(resolve, 10000));
          attempts++;
        }

        throw new Error(`Timeout waiting for ES app deletion: ${appId}`);
      } catch (error) {
        // If app is not found, consider it deleted
        if (error && typeof error === 'object' && 'code' in error && error.code === 'InstanceNotFound') {
          logger.info(`ES app already deleted: ${appId}`);
          return;
        }
        logger.error(`ES app deletion failed: ${error}`);
        throw error;
      }
    },
  };

  return operations;
};
