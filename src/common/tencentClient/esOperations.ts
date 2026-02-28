import { Context } from '../../types';
import { TencentEsSpaceConfig, TencentEsSpaceInfo, TencentEsSpaceStatus } from './types';
import { logger } from '../logger';
import { lang } from '../../lang';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EsClient = any;

const waitForSpaceReady = async (
  getSpace: (spaceId: string) => Promise<TencentEsSpaceInfo | null>,
  spaceId: string,
): Promise<void> => {
  const maxAttempts = 60;
  let attempts = 0;

  while (attempts < maxAttempts) {
    const space = await getSpace(spaceId);

    if (!space) {
      throw new Error(lang.__('TENCENT_ES_SPACE_NOT_FOUND', { spaceId }));
    }

    if (space.Status === TencentEsSpaceStatus.NORMAL) {
      logger.info(lang.__('TENCENT_ES_SPACE_READY', { spaceId }));
      return;
    }

    if (
      space.Status === TencentEsSpaceStatus.DELETED ||
      space.Status === TencentEsSpaceStatus.DELETING
    ) {
      throw new Error(lang.__('TENCENT_ES_SPACE_ERROR_STATE', { status: String(space.Status) }));
    }

    logger.info(lang.__('TENCENT_ES_SPACE_WAITING', { spaceId, status: String(space.Status) }));
    await new Promise((resolve) => setTimeout(resolve, 10000));
    attempts++;
  }

  throw new Error(lang.__('TENCENT_ES_SPACE_TIMEOUT_READY', { spaceId }));
};

const waitForSpaceDeleted = async (
  getSpace: (spaceId: string) => Promise<TencentEsSpaceInfo | null>,
  spaceId: string,
): Promise<void> => {
  const maxAttempts = 60;
  let attempts = 0;

  while (attempts < maxAttempts) {
    const space = await getSpace(spaceId);

    if (!space) {
      logger.info(lang.__('TENCENT_ES_SPACE_DELETED', { spaceId }));
      return;
    }

    if (space.Status === TencentEsSpaceStatus.DELETED) {
      logger.info(lang.__('TENCENT_ES_SPACE_DELETED', { spaceId }));
      return;
    }

    logger.info(lang.__('TENCENT_ES_SPACE_WAITING_DELETE', { spaceId }));
    await new Promise((resolve) => setTimeout(resolve, 10000));
    attempts++;
  }

  throw new Error(lang.__('TENCENT_ES_SPACE_TIMEOUT_DELETE', { spaceId }));
};

export const createTencentEsOperations = (esClient: EsClient, _context: Context) => {
  const operations = {
    createSpace: async (config: TencentEsSpaceConfig): Promise<string> => {
      const params: Record<string, unknown> = {
        SpaceName: config.SpaceName,
      };

      if (config.VpcInfo && config.VpcInfo.length > 0) {
        params.VpcInfo = config.VpcInfo;
      }

      if (config.Zone) {
        params.Zone = config.Zone;
      }

      if (config.KibanaWhiteIpList && config.KibanaWhiteIpList.length > 0) {
        params.KibanaWhiteIpList = config.KibanaWhiteIpList;
      }

      try {
        const response = await esClient.CreateServerlessSpaceV2(params);
        logger.info(lang.__('TENCENT_ES_SPACE_CREATION_INITIATED'));

        if (!response.SpaceId) {
          throw new Error(lang.__('TENCENT_ES_SPACE_NO_ID_RETURNED'));
        }

        const spaceId = response.SpaceId;

        await waitForSpaceReady(operations.getSpace, spaceId);

        return spaceId;
      } catch (error) {
        logger.error(lang.__('TENCENT_ES_SPACE_CREATION_FAILED', { error: String(error) }));
        throw error;
      }
    },

    getSpace: async (spaceId: string): Promise<TencentEsSpaceInfo | null> => {
      const params = {
        SpaceIds: [spaceId],
      };

      try {
        const response = await esClient.DescribeServerlessSpaces(params);

        if (!response.ServerlessSpaces || response.ServerlessSpaces.length === 0) {
          return null;
        }

        const space = response.ServerlessSpaces[0];

        return {
          SpaceId: space.SpaceId || '',
          SpaceName: space.SpaceName || '',
          Status: space.Status ?? TencentEsSpaceStatus.CREATING,
          CreateTime: space.CreateTime,
          IndexCount: space.IndexCount,
          KibanaUrl: space.KibanaUrl,
          KibanaPrivateUrl: space.KibanaPrivateUrl,
        };
      } catch (error) {
        logger.error(lang.__('TENCENT_ES_SPACE_GET_FAILED', { error: String(error) }));
        return null;
      }
    },

    updateSpace: async (spaceId: string, config: TencentEsSpaceConfig): Promise<void> => {
      const params: Record<string, unknown> = {
        SpaceId: spaceId,
        SpaceName: config.SpaceName,
      };

      if (config.KibanaWhiteIpList && config.KibanaWhiteIpList.length > 0) {
        params.KibanaWhiteIpList = config.KibanaWhiteIpList;
      }

      try {
        await esClient.UpdateServerlessSpace(params);
        logger.info(lang.__('TENCENT_ES_SPACE_UPDATED', { spaceId }));

        await waitForSpaceReady(operations.getSpace, spaceId);
      } catch (error) {
        logger.error(lang.__('TENCENT_ES_SPACE_UPDATE_FAILED', { error: String(error) }));
        throw error;
      }
    },

    deleteSpace: async (spaceId: string): Promise<void> => {
      try {
        // Delete all instances in the space first.
        // Note: The Tencent Cloud ES SDK does not provide a DeleteServerlessSpace API.
        // Deleting all instances within the space effectively decommissions it.
        const instancesResponse = await esClient.DescribeServerlessInstances({
          SpaceIds: [spaceId],
        });

        if (instancesResponse.Instances && instancesResponse.Instances.length > 0) {
          for (const instance of instancesResponse.Instances) {
            if (instance.InstanceId) {
              await esClient.DeleteServerlessInstance({
                InstanceId: instance.InstanceId,
              });
            }
          }
        }

        logger.info(lang.__('TENCENT_ES_SPACE_DELETION_INITIATED', { spaceId }));

        await waitForSpaceDeleted(operations.getSpace, spaceId);
      } catch (error) {
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          (error.code === 'ResourceNotFound' || error.code === 'InvalidParameterValue')
        ) {
          logger.info(lang.__('TENCENT_ES_SPACE_DELETED', { spaceId }));
          return;
        }
        logger.error(lang.__('TENCENT_ES_SPACE_DELETE_FAILED', { error: String(error) }));
        throw error;
      }
    },
  };

  return operations;
};
