import { getSharedResource, buildSid } from '../../common';
import type { Context, ResourceState, StateFile } from '../../types';
import { ResourceTypeEnum } from '../../types';
import { logger } from '../../common/logger';
import { lang } from '../../lang';
import { createClsOperations } from '../../common/tencentClient';
import {
  OWNERSHIP_TAG_KEY,
  buildOwnershipTagValue,
  buildSharedOwnershipTagValue,
  parseOwnershipTagValue,
} from '../ownershipTag';

type SharedLogsetClient = { cls: ReturnType<typeof createClsOperations> };

/**
 * Issue #214: one shared CLS logset per app×stage, tracked in the stage-level
 * `shared` slot under the provider-neutral key 'logs.project'. Per-resource
 * topics stay nested under their owning resource (function) so each owner tears
 * down only its own topic; the shared logset is released by the destroyer once
 * the provider reports zero remaining topics.
 */
export const SHARED_LOGSET_KEY = 'logs.project';

export const buildSharedLogsetName = (app: string, stage: string): string => `${app}-${stage}-cls`;

export const buildFunctionTopicName = (context: Context): string =>
  `${context.service}-${context.stage}-fn-logs`;

const resolveSharedLogsetName = (shared: ResourceState): string | undefined => {
  const instanceId = (shared.instances?.[0] as { id?: string } | undefined)?.id;
  return instanceId ?? (shared.definition as { logsetName?: string } | undefined)?.logsetName;
};

const resolveSharedLogsetId = (shared: ResourceState): string =>
  (shared.instances?.[0] as { logsetId?: string } | undefined)?.logsetId ??
  (shared.instances?.[0] as { attributes?: { logsetId?: string } } | undefined)?.attributes
    ?.logsetId ??
  '';

export const ensureSharedLogset = async (
  context: Context,
  client: SharedLogsetClient,
  state: StateFile | undefined,
): Promise<{ logsetName: string; logsetId: string }> => {
  const shared = state ? getSharedResource(state, context.stage, SHARED_LOGSET_KEY) : undefined;
  if (shared) {
    const logsetName = resolveSharedLogsetName(shared);
    if (logsetName) {
      return { logsetName, logsetId: resolveSharedLogsetId(shared) };
    }
  }

  const logsetName = buildSharedLogsetName(context.app, context.stage);
  logger.info(lang.__('CREATING_CLS_LOGSET', { logsetName }));
  const created = await client.cls.createLogset(logsetName, [
    { key: OWNERSHIP_TAG_KEY, value: buildSharedOwnershipTagValue(context.app, SHARED_LOGSET_KEY) },
  ]);

  return { logsetName, logsetId: created.logsetId };
};

export const buildSharedLogsetResourceState = (
  context: Context,
  result: { logsetName: string; logsetId: string },
): ResourceState => ({
  mode: 'managed',
  region: context.region,
  definition: {
    logsetName: result.logsetName,
    region: context.region,
    stage: context.stage,
  },
  instances: [
    {
      sid: buildSid('tencent', 'cls-logset', context.stage, result.logsetName),
      type: ResourceTypeEnum.TENCENT_CLS_LOGSET,
      id: result.logsetName,
      logsetId: result.logsetId,
    },
  ],
  lastUpdated: new Date().toISOString(),
});

export const releaseSharedLogsetIfUnused = async (
  context: Context,
  client: SharedLogsetClient,
  shared: ResourceState | undefined,
): Promise<'deleted' | 'retained' | 'absent'> => {
  if (!shared) {
    return 'absent';
  }
  const logsetName = resolveSharedLogsetName(shared);
  if (!logsetName) {
    return 'absent';
  }

  const logset = await client.cls.getLogsetByName(logsetName);
  if (!logset?.LogsetId) {
    return 'absent';
  }

  const topics = await client.cls.listTopicsByLogset(logset.LogsetId);
  if (topics.length > 0) {
    logger.info(
      lang.__('SHARED_CLS_LOGSET_IN_USE', {
        logsetName,
        count: String(topics.length),
      }),
    );
    return 'retained';
  }

  await client.cls.deleteLogset(logset.LogsetId);
  logger.info(lang.__('SHARED_CLS_LOGSET_DELETED', { logsetName }));
  return 'deleted';
};

/**
 * Adopt-or-create a topic inside the shared logset. Reuses a same-named topic
 * only when its ownership tag belongs to this app's stack; a foreign or
 * untagged topic is refused rather than silently taken over.
 */
export const ensureFunctionTopic = async (
  context: Context,
  client: SharedLogsetClient,
  params: { logsetId: string; logsetName: string; topicName: string; logicalId: string },
): Promise<{ topicName: string; topicId: string }> => {
  const { logsetId, topicName, logicalId } = params;

  const existing = await client.cls.getTopicByName(logsetId, topicName);
  if (existing) {
    const tag = (existing.Tags ?? []).find((t) => t.Key === OWNERSHIP_TAG_KEY);
    const parsed = parseOwnershipTagValue(tag?.Value);
    if (parsed?.stack === `${context.app}-${context.service}`) {
      return { topicName: existing.TopicName ?? topicName, topicId: existing.TopicId ?? '' };
    }
    throw new Error(lang.__('CLS_TOPIC_FOREIGN_OWNED', { topicName }));
  }

  logger.info(lang.__('CREATING_CLS_TOPIC', { topicName }));
  const topic = await client.cls.createTopic(logsetId, topicName, {
    period: 30,
    storageType: 'hot',
    tags: [{ key: OWNERSHIP_TAG_KEY, value: buildOwnershipTagValue(context, logicalId) }],
  });

  logger.info(lang.__('CREATING_CLS_INDEX', { topicName }));
  await client.cls.createFulltextIndex(topic.topicId);

  return { topicName, topicId: topic.topicId };
};
