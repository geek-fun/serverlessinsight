import { Context } from '../../types';
import { TencentEsSpaceConfig, TencentEsSpaceInfo, TencentEsSpaceStatus } from './types';
import { logger } from '../logger';
import { lang } from '../../lang';
import { pollUntil, PollingTimeoutError } from '../polling';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EsClient = any;

const waitForSpaceReady = async (
  getSpace: (spaceId: string) => Promise<TencentEsSpaceInfo | null>,
  spaceId: string,
): Promise<void> => {
  try {
    await pollUntil({
      description: `Tencent ES space ${spaceId} to be ready`,
      fetch: async () => {
        const space = await getSpace(spaceId);
        if (!space) {
          throw new Error(lang.__('TENCENT_ES_SPACE_NOT_FOUND', { spaceId }));
        }
        if (
          space.Status === TencentEsSpaceStatus.DELETED ||
          space.Status === TencentEsSpaceStatus.DELETING
        ) {
          throw new Error(
            lang.__('TENCENT_ES_SPACE_ERROR_STATE', { status: String(space.Status) }),
          );
        }
        return space;
      },
      isDone: (space) => space?.Status === TencentEsSpaceStatus.NORMAL,
      intervalMs: 10000,
      maxAttempts: 60,
      onProgress: (space) => {
        if (space) {
          logger.info(
            lang.__('TENCENT_ES_SPACE_WAITING', { spaceId, status: String(space.Status) }),
          );
        }
      },
    });
    logger.info(lang.__('TENCENT_ES_SPACE_READY', { spaceId }));
  } catch (e) {
    if (e instanceof PollingTimeoutError) {
      throw new Error(lang.__('TENCENT_ES_SPACE_TIMEOUT_READY', { spaceId }), { cause: e });
    }
    throw e;
  }
};

// Maps a DescribeServerlessSpaces entry (SDK ServerlessSpace) to the internal
// space info. The ES SDK reports tags as TagList of { TagKey, TagValue } while
// the ownership check (isOwnedByStack) consumes { Key, Value } — normalized here
// at the boundary so callers never see the provider shape.
const toSpaceInfo = (space: {
  SpaceId?: string;
  SpaceName?: string;
  Status?: number;
  CreateTime?: string;
  IndexCount?: number;
  KibanaUrl?: string;
  KibanaPrivateUrl?: string;
  IndexAccessUrl?: string;
  KibanaPublicAcl?: { BlackIpList?: string[]; WhiteIpList?: string[] };
  KibanaEmbedUrl?: string;
  DiDataList?: Array<Record<string, unknown>>;
  VpcInfo?: Array<{
    VpcId?: string;
    SubnetId?: string;
    VpcUid?: number;
    SubnetUid?: number;
    AvailableIpAddressCount?: number;
  }>;
  Region?: string;
  Zone?: string;
  EnableKibanaPublicAccess?: number;
  EnableKibanaPrivateAccess?: number;
  AppId?: number;
  KibanaLanguage?: string;
  ClusterType?: number;
  EnableMcpAccess?: number;
  McpAccess?: string;
  TagList?: Array<{ TagKey: string; TagValue: string }>;
}): TencentEsSpaceInfo => ({
  SpaceId: space.SpaceId || '',
  SpaceName: space.SpaceName || '',
  Status: space.Status ?? TencentEsSpaceStatus.CREATING,
  CreateTime: space.CreateTime,
  IndexCount: space.IndexCount,
  KibanaUrl: space.KibanaUrl,
  KibanaPrivateUrl: space.KibanaPrivateUrl,
  IndexAccessUrl: space.IndexAccessUrl,
  KibanaPublicAcl: space.KibanaPublicAcl,
  KibanaEmbedUrl: space.KibanaEmbedUrl,
  DiDataList: space.DiDataList,
  VpcInfo: space.VpcInfo,
  Region: space.Region,
  Zone: space.Zone,
  EnableKibanaPublicAccess: space.EnableKibanaPublicAccess,
  EnableKibanaPrivateAccess: space.EnableKibanaPrivateAccess,
  AppId: space.AppId,
  KibanaLanguage: space.KibanaLanguage,
  ClusterType: space.ClusterType,
  EnableMcpAccess: space.EnableMcpAccess,
  McpAccess: space.McpAccess,
  Tags: (space.TagList ?? []).map((t) => ({ Key: t.TagKey, Value: t.TagValue })),
});

const waitForSpaceDeleted = async (
  getSpace: (spaceId: string) => Promise<TencentEsSpaceInfo | null>,
  spaceId: string,
): Promise<void> => {
  try {
    await pollUntil({
      description: `Tencent ES space ${spaceId} to be deleted`,
      fetch: () => getSpace(spaceId),
      isDone: (space) => space === null || space?.Status === TencentEsSpaceStatus.DELETED,
      intervalMs: 10000,
      maxAttempts: 60,
      onProgress: () => logger.info(lang.__('TENCENT_ES_SPACE_WAITING_DELETE', { spaceId })),
    });
    logger.info(lang.__('TENCENT_ES_SPACE_DELETED', { spaceId }));
  } catch (e) {
    if (e instanceof PollingTimeoutError) {
      throw new Error(lang.__('TENCENT_ES_SPACE_TIMEOUT_DELETE', { spaceId }), { cause: e });
    }
    throw e;
  }
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

      if (config.Tags && config.Tags.length > 0) {
        params.TagList = config.Tags.map((t) => ({ TagKey: t.Key, TagValue: t.Value }));
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

        const space = response.ServerlessSpaces?.[0];

        return space ? toSpaceInfo(space) : null;
      } catch (error) {
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          typeof error.code === 'string' &&
          (error.code.startsWith('ResourceNotFound') ||
            error.code === 'InvalidParameterValue' ||
            error.code === 'ResourceNotFound.ServerlessSpaceNotFound')
        ) {
          return null;
        }
        throw error;
      }
    },

    getSpaceByName: async (spaceName: string): Promise<TencentEsSpaceInfo | null> => {
      const params = {
        SpaceNames: [spaceName],
      };

      try {
        const response = await esClient.DescribeServerlessSpaces(params);

        const space = (response.ServerlessSpaces ?? []).find((s: { SpaceName?: string }) => {
          return s.SpaceName === spaceName;
        });

        return space ? toSpaceInfo(space) : null;
      } catch (error) {
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          typeof error.code === 'string' &&
          (error.code.startsWith('ResourceNotFound') ||
            error.code === 'InvalidParameterValue' ||
            error.code === 'ResourceNotFound.ServerlessSpaceNotFound')
        ) {
          return null;
        }
        throw error;
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
