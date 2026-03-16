import { Context, DatabaseDomain, ResourceState, StateFile } from '../../types';
import { createTencentClient } from '../../common/tencentClient';
import {
  databaseToTencentEsConfig,
  extractTencentEsDefinition,
  TencentEsSpaceInfo,
} from './esServerlessTypes';
import { setResource, removeResource } from '../../common/stateManager';
import { logger } from '../../common/logger';

const buildEsSpaceFromProvider = (info: TencentEsSpaceInfo, arn: string) => {
  return {
    arn,
    id: info.SpaceId,
    spaceId: info.SpaceId,
    spaceName: info.SpaceName,
    status: info.Status,
    createTime: info.CreateTime ?? null,
    indexCount: info.IndexCount ?? null,
    kibanaUrl: info.KibanaUrl ?? null,
    kibanaPrivateUrl: info.KibanaPrivateUrl ?? null,
  };
};

export const createEsResource = async (
  context: Context,
  database: DatabaseDomain,
  state: StateFile,
): Promise<StateFile> => {
  const config = databaseToTencentEsConfig(database);

  const client = createTencentClient(context);
  const spaceId = await client.es.createSpace({
    SpaceName: config.SpaceName,
    VpcInfo:
      config.VpcId && config.SubnetId
        ? [{ VpcId: config.VpcId, SubnetId: config.SubnetId }]
        : undefined,
    Zone: config.Zone,
    KibanaWhiteIpList: config.KibanaWhiteIpList,
  });

  // Refresh state from provider to get all attributes
  const spaceInfo = await client.es.getSpace(spaceId);
  if (!spaceInfo) {
    throw new Error(`Failed to refresh state for ES space: ${spaceId}`);
  }

  const definition = extractTencentEsDefinition(config);
  const arn = `arn:tencent:es:${context.region}::space:${spaceId}`;
  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [buildEsSpaceFromProvider(spaceInfo as TencentEsSpaceInfo, arn)],
    lastUpdated: new Date().toISOString(),
    metadata: {
      spaceName: database.name,
      spaceId,
      resourceType: 'TENCENT_ES_SERVERLESS',
    },
  };

  const logicalId = `databases.${database.key}`;
  return setResource(state, logicalId, resourceState);
};

export const readEsResource = async (context: Context, spaceId: string) => {
  const client = createTencentClient(context);
  return await client.es.getSpace(spaceId);
};

export const updateEsResource = async (
  context: Context,
  database: DatabaseDomain,
  spaceId: string,
  state: StateFile,
): Promise<StateFile> => {
  const config = databaseToTencentEsConfig(database);

  const client = createTencentClient(context);
  await client.es.updateSpace(spaceId, {
    SpaceName: config.SpaceName,
    KibanaWhiteIpList: config.KibanaWhiteIpList,
  });

  // Refresh state from provider to get all attributes
  const spaceInfo = await client.es.getSpace(spaceId);
  if (!spaceInfo) {
    throw new Error(`Failed to refresh state for ES space: ${spaceId}`);
  }

  const definition = extractTencentEsDefinition(config);
  const arn = `arn:tencent:es:${context.region}::space:${spaceId}`;
  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [buildEsSpaceFromProvider(spaceInfo as TencentEsSpaceInfo, arn)],
    lastUpdated: new Date().toISOString(),
    metadata: {
      spaceName: database.name,
      spaceId,
      resourceType: 'TENCENT_ES_SERVERLESS',
    },
  };

  const logicalId = `databases.${database.key}`;
  return setResource(state, logicalId, resourceState);
};

export const deleteEsResource = async (
  context: Context,
  spaceId: string,
  logicalId: string,
  state: StateFile,
): Promise<StateFile> => {
  const client = createTencentClient(context);
  try {
    await client.es.deleteSpace(spaceId);
  } catch (err) {
    const errorCode = (err as { code?: string })?.code;
    if (errorCode === 'ResourceNotFound' || errorCode === 'InvalidParameterValue') {
      logger.warn(`ES space ${spaceId} not found in provider, skipping deletion`);
    } else {
      throw err;
    }
  }
  return removeResource(state, logicalId);
};
