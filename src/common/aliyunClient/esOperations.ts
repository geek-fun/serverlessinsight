import EsServerlessClient, * as EsModels from '@alicloud/es-serverless20230627';
import { Context } from '../../types';
import { logger } from '../logger';

export type EsConfig = {
  AppName: string;
  AppVersion: string;
  Authentication?: {
    BasicAuth?: Array<{
      Username?: string;
      Password: string;
    }>;
  };
  QuotaInfo?: {
    AppType?: string;
    Cu?: number;
    Storage?: number;
  };
  Description?: string;
  Network?: Array<{
    Type?: string;
    Enabled?: boolean;
    Domain?: string;
    Port?: number;
    WhiteIpGroup?: Array<{
      GroupName?: string;
      Ips?: string[];
    }>;
  }>;
  PrivateNetwork?: Array<{
    Type?: string;
    Enabled?: boolean;
    VpcId?: string;
    PvlEndpointId?: string;
    WhiteIpGroup?: Array<{
      GroupName?: string;
      Ips?: string[];
    }>;
  }>;
  ChargeType?: string;
  RegionId?: string;
  Scenario?: string;
  Tags?: Array<{
    Key?: string;
    Value?: string;
  }>;
};

export type EsInfo = {
  AppId?: string;
  AppName?: string;
  AppType?: string;
  Status?: string;
  Description?: string;
  CreateTime?: string;
  ModifiedTime?: string;
  RegionId?: string;
  Version?: string;
  OwnerId?: string;
  InstanceId?: string;
  ChargeType?: string;
  Scenario?: string;
  Network?: Array<{
    Type?: string;
    Enabled?: boolean;
    Domain?: string;
    Port?: number;
    WhiteIpGroup?: Array<{
      GroupName?: string;
      Ips?: string[];
    }>;
  }>;
  PrivateNetwork?: Array<{
    Type?: string;
    Enabled?: boolean;
    Domain?: string;
    Port?: number;
    VpcId?: string;
    PvlEndpointId?: string;
    WhiteIpGroup?: Array<{
      GroupName?: string;
      Ips?: string[];
    }>;
  }>;
  Tags?: Array<{
    Key?: string;
    Value?: string;
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

    if (app.Status === 'ACTIVE') {
      logger.info(`Elasticsearch serverless app ready: ${appId}`);
      return;
    }

    if (app.Status === 'DELETED' || app.Status === 'FAILED') {
      throw new Error(`Elasticsearch serverless app in error state: ${app.Status}`);
    }

    logger.info(`Waiting for ES app ${appId}, status: ${app.Status}`);
    await new Promise((resolve) => setTimeout(resolve, 10000));
    attempts++;
  }

  throw new Error(`Timeout waiting for ES app to be ready: ${appId}`);
};

export const createEsOperations = (esClient: EsServerlessClient, context: Context) => {
  const operations = {
    createApp: async (config: EsConfig): Promise<string> => {
      const params = new EsModels.CreateAppRequest({
        appName: config.AppName,
        version: config.AppVersion,
        authentication: config.Authentication,
        quotaInfo: config.QuotaInfo,
        description: config.Description,
        network: config.Network,
        privateNetwork: config.PrivateNetwork,
        chargeType: config.ChargeType || 'POSTPAY',
        regionId: config.RegionId || context.region,
        scenario: config.Scenario,
        tags: config.Tags,
      });

      try {
        const response = await esClient.createApp(params);
        logger.info('Elasticsearch serverless app creation initiated');

        if (!response.body?.result?.appId) {
          throw new Error('No ES app ID returned');
        }

        const appId = response.body.result.appId;

        // Wait for app to be ready
        await waitForEsAppReady(operations.getApp, appId);

        return appId;
      } catch (error) {
        logger.error(`ES app creation failed: ${error}`);
        throw error;
      }
    },

    getApp: async (appName: string): Promise<EsInfo | null> => {
      const params = new EsModels.GetAppRequest({
        detailed: true,
      });

      try {
        const response = await esClient.getApp(appName, params);

        if (!response.body?.result) {
          return null;
        }

        const app = response.body.result;

        return {
          AppId: app.appId,
          AppName: app.appName,
          AppType: app.appType,
          Status: app.status,
          Description: app.description,
          CreateTime: app.createTime,
          ModifiedTime: app.modifiedTime,
          RegionId: app.regionId,
          Version: app.version,
          OwnerId: app.ownerId,
          InstanceId: app.instanceId,
          ChargeType: app.chargeType,
          Scenario: app.scenario,
          Network: app.network
            ? app.network.map((n) => ({
                Type: n.type,
                Enabled: n.enabled,
                Domain: n.domain,
                Port: n.port,
                WhiteIpGroup: n.whiteIpGroup
                  ? n.whiteIpGroup.map((w) => ({
                      GroupName: w.groupName,
                      Ips: w.ips,
                    }))
                  : undefined,
              }))
            : undefined,
          PrivateNetwork: app.privateNetwork
            ? app.privateNetwork.map((n) => ({
                Type: n.type,
                Enabled: n.enabled,
                Domain: n.domain,
                Port: n.port,
                VpcId: n.vpcId,
                PvlEndpointId: n.pvlEndpointId,
                WhiteIpGroup: n.whiteIpGroup
                  ? n.whiteIpGroup.map((w) => ({
                      GroupName: w.groupName,
                      Ips: w.ips,
                    }))
                  : undefined,
              }))
            : undefined,
          Tags: app.tags
            ? app.tags.map((t) => ({
                Key: t.key,
                Value: t.value,
              }))
            : undefined,
        };
      } catch (error) {
        logger.error(`Failed to get ES app: ${error}`);
        return null;
      }
    },

    updateApp: async (appName: string, config: EsConfig): Promise<void> => {
      const params = new EsModels.UpdateAppRequest({
        description: config.Description,
        authentication: config.Authentication,
      });

      try {
        await esClient.updateApp(appName, params);
        logger.info(`ES app updated: ${appName}`);

        // Wait for app to be ready
        await waitForEsAppReady(operations.getApp, appName);
      } catch (error) {
        logger.error(`ES app update failed: ${error}`);
        throw error;
      }
    },

    deleteApp: async (appName: string): Promise<void> => {
      try {
        await esClient.deleteApp(appName);
        logger.info(`ES app deletion initiated: ${appName}`);

        // Wait for app to be deleted
        const maxAttempts = 60;
        let attempts = 0;

        while (attempts < maxAttempts) {
          const app = await operations.getApp(appName);

          if (!app) {
            logger.info(`ES app deleted: ${appName}`);
            return;
          }

          logger.info(`Waiting for ES app deletion: ${appName}`);
          await new Promise((resolve) => setTimeout(resolve, 10000));
          attempts++;
        }

        throw new Error(`Timeout waiting for ES app deletion: ${appName}`);
      } catch (error) {
        // If app is not found, consider it deleted
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          (error.code === 'AppNotFound' || error.code === 'NotFound')
        ) {
          logger.info(`ES app already deleted: ${appName}`);
          return;
        }
        logger.error(`ES app deletion failed: ${error}`);
        throw error;
      }
    },
  };

  return operations;
};
