import EsServerlessClient, * as EsModels from '@alicloud/es-serverless20230627';
import { Context } from '../../types';
import { logger } from '../logger';
import { lang } from '../../lang';

export enum EsAppStatus {
  ACTIVE = 'ACTIVE',
  CREATING = 'CREATING',
  DELETING = 'DELETING',
  DELETED = 'DELETED',
  FAILED = 'FAILED',
}

export type EsConfig = {
  appName: string;
  appVersion: string;
  authentication?: {
    basicAuth?: Array<{
      username?: string;
      password: string;
    }>;
  };
  quotaInfo?: {
    appType?: string;
    cu?: number;
    storage?: number;
  };
  description?: string;
  network?: Array<{
    type?: string;
    enabled?: boolean;
    domain?: string;
    port?: number;
    whiteIpGroup?: Array<{
      groupName?: string;
      ips?: string[];
    }>;
  }>;
  privateNetwork?: Array<{
    type?: string;
    enabled?: boolean;
    vpcId?: string;
    pvlEndpointId?: string;
    whiteIpGroup?: Array<{
      groupName?: string;
      ips?: string[];
    }>;
  }>;
  chargeType?: string;
  regionId?: string;
  scenario?: string;
  tags?: Array<{
    key?: string;
    value?: string;
  }>;
};

export type EsInfo = {
  appId?: string;
  appName?: string;
  appType?: string;
  status?: string;
  description?: string;
  createTime?: string;
  modifiedTime?: string;
  regionId?: string;
  version?: string;
  ownerId?: string;
  instanceId?: string;
  chargeType?: string;
  scenario?: string;
  network?: Array<{
    type?: string;
    enabled?: boolean;
    domain?: string;
    port?: number;
    whiteIpGroup?: Array<{
      groupName?: string;
      ips?: string[];
    }>;
  }>;
  privateNetwork?: Array<{
    type?: string;
    enabled?: boolean;
    domain?: string;
    port?: number;
    vpcId?: string;
    pvlEndpointId?: string;
    whiteIpGroup?: Array<{
      groupName?: string;
      ips?: string[];
    }>;
  }>;
  tags?: Array<{
    key?: string;
    value?: string;
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
      throw new Error(lang.__('ES_APP_NOT_FOUND', { appId }));
    }

    if (app.status === EsAppStatus.ACTIVE) {
      logger.info(lang.__('ES_APP_READY', { appId }));
      return;
    }

    if (app.status === EsAppStatus.DELETED || app.status === EsAppStatus.FAILED) {
      throw new Error(lang.__('ES_APP_ERROR_STATE', { status: app.status }));
    }

    logger.info(lang.__('ES_APP_WAITING', { appId, status: app.status ?? 'unknown' }));
    await new Promise((resolve) => setTimeout(resolve, 10000));
    attempts++;
  }

  throw new Error(lang.__('ES_APP_TIMEOUT_READY', { appId }));
};

export const createEsOperations = (esClient: EsServerlessClient, context: Context) => {
  const operations = {
    createApp: async (config: EsConfig): Promise<string> => {
      const params = new EsModels.CreateAppRequest({
        appName: config.appName,
        version: config.appVersion,
        authentication: config.authentication,
        quotaInfo: config.quotaInfo,
        description: config.description,
        network: config.network,
        privateNetwork: config.privateNetwork,
        chargeType: config.chargeType || 'POSTPAY',
        regionId: config.regionId || context.region,
        scenario: config.scenario,
        tags: config.tags,
      });

      try {
        const response = await esClient.createApp(params);
        logger.info(lang.__('ES_APP_CREATION_INITIATED'));

        if (!response.body?.result?.appId) {
          throw new Error(lang.__('ES_APP_NO_ID_RETURNED'));
        }

        const appId = response.body.result.appId;

        // Wait for app to be ready
        await waitForEsAppReady(operations.getApp, appId);

        return appId;
      } catch (error) {
        logger.error(lang.__('ES_APP_CREATION_FAILED', { error: String(error) }));
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
          appId: app.appId,
          appName: app.appName,
          appType: app.appType,
          status: app.status,
          description: app.description,
          createTime: app.createTime,
          modifiedTime: app.modifiedTime,
          regionId: app.regionId,
          version: app.version,
          ownerId: app.ownerId,
          instanceId: app.instanceId,
          chargeType: app.chargeType,
          scenario: app.scenario,
          network: app.network
            ? app.network.map((n) => ({
                type: n.type,
                enabled: n.enabled,
                domain: n.domain,
                port: n.port,
                whiteIpGroup: n.whiteIpGroup
                  ? n.whiteIpGroup.map((w) => ({
                      groupName: w.groupName,
                      ips: w.ips,
                    }))
                  : undefined,
              }))
            : undefined,
          privateNetwork: app.privateNetwork
            ? app.privateNetwork.map((n) => ({
                type: n.type,
                enabled: n.enabled,
                domain: n.domain,
                port: n.port,
                vpcId: n.vpcId,
                pvlEndpointId: n.pvlEndpointId,
                whiteIpGroup: n.whiteIpGroup
                  ? n.whiteIpGroup.map((w) => ({
                      groupName: w.groupName,
                      ips: w.ips,
                    }))
                  : undefined,
              }))
            : undefined,
          tags: app.tags
            ? app.tags.map((t) => ({
                key: t.key,
                value: t.value,
              }))
            : undefined,
        };
      } catch (error) {
        logger.error(lang.__('ES_APP_GET_FAILED', { error: String(error) }));
        return null;
      }
    },

    updateApp: async (appName: string, config: EsConfig): Promise<void> => {
      const params = new EsModels.UpdateAppRequest({
        description: config.description,
        authentication: config.authentication,
      });

      try {
        await esClient.updateApp(appName, params);
        logger.info(lang.__('ES_APP_UPDATED', { appName }));

        // Wait for app to be ready
        await waitForEsAppReady(operations.getApp, appName);
      } catch (error) {
        logger.error(lang.__('ES_APP_UPDATE_FAILED', { error: String(error) }));
        throw error;
      }
    },

    deleteApp: async (appName: string): Promise<void> => {
      try {
        await esClient.deleteApp(appName);
        logger.info(lang.__('ES_APP_DELETION_INITIATED', { appName }));

        // Wait for app to be deleted
        const maxAttempts = 60;
        let attempts = 0;

        while (attempts < maxAttempts) {
          const app = await operations.getApp(appName);

          if (!app) {
            logger.info(lang.__('ES_APP_DELETED', { appName }));
            return;
          }

          logger.info(lang.__('ES_APP_WAITING_DELETE', { appName }));
          await new Promise((resolve) => setTimeout(resolve, 10000));
          attempts++;
        }

        throw new Error(lang.__('ES_APP_TIMEOUT_DELETE', { appName }));
      } catch (error) {
        // If app is not found, consider it deleted
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          (error.code === 'AppNotFound' || error.code === 'NotFound')
        ) {
          logger.info(lang.__('ES_APP_DELETED', { appName }));
          return;
        }
        logger.error(lang.__('ES_APP_DELETE_FAILED', { error: String(error) }));
        throw error;
      }
    },
  };

  return operations;
};
