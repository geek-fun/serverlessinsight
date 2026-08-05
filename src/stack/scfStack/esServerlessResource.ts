import {
  Context,
  DatabaseDomain,
  PartialResourceError,
  ResourceState,
  StateFile,
} from '../../types';
import { createTencentClient } from '../../common/tencentClient';
import {
  databaseToTencentEsConfig,
  extractTencentEsDefinition,
  TencentEsSpaceInfo,
} from './esServerlessTypes';
import { setResource, removeResource } from '../../common/stateManager';
import { buildSid } from '../../common';
import { logger } from '../../common/logger';
import { lang } from '../../lang';
import { OWNERSHIP_TAG_KEY, buildOwnershipTagValue, isOwnedByStack } from '../ownershipTag';
import { isResourceAlreadyExistsError } from '../alreadyExists';

// CreateServerlessSpaceV2 reports a duplicate space name with this error code
// (腾讯云官方文档: 空间名已存在).
const ES_SPACE_NAME_EXISTS_CODE = 'InvalidParameter.SpaceNameExist';

const buildEsSpaceFromProvider = (info: TencentEsSpaceInfo, sid: string) => {
  return {
    sid,
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

  const definition = extractTencentEsDefinition(config);
  const logicalId = `databases.${database.key}`;

  const taintedResourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [],
    lastUpdated: new Date().toISOString(),
    status: 'tainted',
  };

  const stateAfterDependents = setResource(state, logicalId, taintedResourceState);

  const buildResourceState = (info: TencentEsSpaceInfo): ResourceState => {
    const sid = buildSid('tencent', 'es', context.stage, info.SpaceId);
    return {
      mode: 'managed',
      region: context.region,
      definition,
      instances: [buildEsSpaceFromProvider(info, sid)],
      lastUpdated: new Date().toISOString(),
      metadata: {
        spaceName: database.name,
        spaceId: info.SpaceId,
        resourceType: 'TENCENT_ES_SERVERLESS',
      },
    };
  };

  try {
    const spaceId = await client.es.createSpace({
      SpaceName: config.SpaceName,
      VpcInfo:
        config.VpcId && config.SubnetId
          ? [{ VpcId: config.VpcId, SubnetId: config.SubnetId }]
          : undefined,
      Zone: config.Zone,
      KibanaWhiteIpList: config.KibanaWhiteIpList,
      Tags: [{ Key: OWNERSHIP_TAG_KEY, Value: buildOwnershipTagValue(context, logicalId) }],
    });

    // Refresh state from provider to get all attributes
    const spaceInfo = await client.es.getSpace(spaceId);
    if (!spaceInfo) {
      throw new Error(`Failed to refresh state for ES space: ${spaceId}`);
    }

    return setResource(state, logicalId, buildResourceState(spaceInfo));
  } catch (error) {
    if (isResourceAlreadyExistsError(error, [ES_SPACE_NAME_EXISTS_CODE])) {
      // Idempotent adoption: a space with this name already exists in the
      // provider. Adopt it ONLY if it carries our ownership tag (proves a
      // previous run of THIS stack created it — e.g. state was reset). An
      // untagged same-named space may belong to another project, so it must
      // fail loudly rather than silently taking it over.
      const probe = await client.es.getSpaceByName(config.SpaceName);
      if (probe && isOwnedByStack(context, logicalId, probe.Tags)) {
        logger.info(
          `ES space ${config.SpaceName} exists and carries ownership tag (${OWNERSHIP_TAG_KEY}), adopting idempotently`,
        );
        return setResource(state, logicalId, buildResourceState(probe));
      }
      throw new PartialResourceError(
        stateAfterDependents,
        new Error(
          `ES space ${config.SpaceName} already exists in provider but is not owned by this stack (missing ${OWNERSHIP_TAG_KEY} tag). Refusing to adopt — resolve manually.`,
        ),
      );
    }
    throw new PartialResourceError(
      stateAfterDependents,
      error instanceof Error ? error : new Error(String(error)),
    );
  }
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
  const sid = buildSid('tencent', 'es', context.stage, spaceId);
  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [buildEsSpaceFromProvider(spaceInfo as TencentEsSpaceInfo, sid)],
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
      logger.warn(
        lang.__('RESOURCE_NOT_FOUND_PROVIDER', { resourceType: 'ES space', name: spaceId }),
      );
    } else {
      throw err;
    }
  }
  return removeResource(state, logicalId);
};
