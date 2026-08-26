import { getSharedResource, buildSid } from '../../common';
import type { Context, ResourceState, StateFile } from '../../types';
import type { VolcengineClient } from '../../common/volcengineClient/types';
import { logger } from '../../common/logger';
import { lang } from '../../lang';
import {
  OWNERSHIP_TAG_KEY,
  buildOwnershipTagValue,
  buildSharedOwnershipTagValue,
  parseOwnershipTagValue,
} from '../ownershipTag';

/**
 * Issue #214: one shared TLS project per app×stage, tracked in the stage-level
 * `shared` slot under the provider-neutral key 'logs.project'. Per-resource
 * topics stay nested under their owning resource (function/event) so each
 * owner tears down only its own topic; the shared project is released by the
 * destroyer once the provider reports zero remaining topics.
 */
export const SHARED_LOG_PROJECT_KEY = 'logs.project';

export const buildSharedProjectName = (app: string, stage: string): string => `${app}-${stage}-tls`;

const resolveSharedProjectName = (shared: ResourceState): string | undefined => {
  const instanceId = (shared.instances?.[0] as { id?: string } | undefined)?.id;
  return instanceId ?? (shared.definition as { projectName?: string } | undefined)?.projectName;
};

const resolveSharedProjectId = (shared: ResourceState): string =>
  (shared.instances?.[0] as { projectId?: string } | undefined)?.projectId ??
  (shared.instances?.[0] as { attributes?: { projectId?: string } } | undefined)?.attributes
    ?.projectId ??
  '';

export const ensureSharedLogProject = async (
  context: Context,
  client: VolcengineClient,
  state: StateFile | undefined,
): Promise<{ projectName: string; projectId: string }> => {
  const shared = state
    ? getSharedResource(state, context.stage, SHARED_LOG_PROJECT_KEY)
    : undefined;
  if (shared) {
    const projectName = resolveSharedProjectName(shared);
    if (projectName) {
      return { projectName, projectId: resolveSharedProjectId(shared) };
    }
  }

  const projectName = buildSharedProjectName(context.app, context.stage);
  logger.info(lang.__('CREATING_TLS_PROJECT', { projectName }));
  const project = await client.tls.createProject({
    projectName,
    description: `Shared TLS logs for ${context.app}`,
    region: context.region,
  });
  await client.tls.waitForProject(projectName);

  if (project.projectId) {
    await client.tls.addTags({
      resourceType: 'project',
      resourcesList: [project.projectId],
      tags: [
        {
          key: OWNERSHIP_TAG_KEY,
          value: buildSharedOwnershipTagValue(context.app, SHARED_LOG_PROJECT_KEY),
        },
      ],
    });
  }

  return { projectName, projectId: project.projectId ?? '' };
};

export const buildSharedProjectResourceState = (
  context: Context,
  result: { projectName: string; projectId: string },
): ResourceState => ({
  mode: 'managed',
  region: context.region,
  definition: {
    projectName: result.projectName,
    region: context.region,
    stage: context.stage,
  },
  instances: [
    {
      sid: buildSid('volcengine', 'tls', context.stage, result.projectName),
      type: 'VOLCENGINE_TLS_PROJECT',
      id: result.projectName,
      projectId: result.projectId,
    },
  ],
  lastUpdated: new Date().toISOString(),
});

export const releaseSharedLogProjectIfUnused = async (
  context: Context,
  client: VolcengineClient,
  shared: ResourceState | undefined,
): Promise<'deleted' | 'retained' | 'absent'> => {
  if (!shared) {
    return 'absent';
  }
  const projectName = resolveSharedProjectName(shared);
  if (!projectName) {
    return 'absent';
  }

  const project = await client.tls.getProject(projectName);
  if (!project?.projectId) {
    return 'absent';
  }

  const topics = await client.tls.listTopics(projectName);
  if (topics.length > 0) {
    logger.info(
      lang.__('SHARED_TLS_PROJECT_IN_USE', {
        projectName,
        count: String(topics.length),
      }),
    );
    return 'retained';
  }

  await client.tls.deleteProject(projectName);
  logger.info(lang.__('SHARED_TLS_PROJECT_DELETED', { projectName }));
  return 'deleted';
};

/**
 * Adopt-or-create a topic inside a (shared) project. Reuses a same-named topic
 * only when its ownership tag belongs to this app's stack; a foreign or
 * untagged topic is refused rather than silently taken over.
 */
export const ensureOwnedTopic = async (
  context: Context,
  client: VolcengineClient,
  params: { projectName: string; topicName: string; logicalId: string },
): Promise<{ topicName: string; topicId: string }> => {
  const { projectName, topicName, logicalId } = params;

  const existing = await client.tls.getTopic(projectName, topicName);
  if (existing) {
    const tag = (existing.tags ?? []).find((t) => t.Key === OWNERSHIP_TAG_KEY);
    const parsed = parseOwnershipTagValue(tag?.Value);
    if (parsed?.stack === `${context.app}-${context.service}`) {
      return { topicName: existing.topicName ?? topicName, topicId: existing.topicId ?? '' };
    }
    throw new Error(lang.__('TLS_TOPIC_FOREIGN_OWNED', { topicName }));
  }

  logger.info(lang.__('CREATING_TLS_TOPIC', { topicName }));
  const topic = await client.tls.createTopic({ projectName, topicName, ttl: 30 });

  if (topic.topicId) {
    await client.tls.addTags({
      resourceType: 'topic',
      resourcesList: [topic.topicId],
      tags: [{ key: OWNERSHIP_TAG_KEY, value: buildOwnershipTagValue(context, logicalId) }],
    });
  }

  logger.info(lang.__('CREATING_TLS_INDEX', { topicName }));
  await client.tls.createIndex({
    projectName,
    topicName,
    fullTextIndex: {
      delimiter: ' ,.?;!\n\t',
      caseSensitive: false,
    },
  });

  logger.info(lang.__('WAITING_FOR_TLS_RESOURCES', { projectName, topicName }));
  await client.tls.waitForProject(projectName);
  await client.tls.waitForTopic(projectName, topicName);

  return { topicName, topicId: topic.topicId ?? '' };
};
