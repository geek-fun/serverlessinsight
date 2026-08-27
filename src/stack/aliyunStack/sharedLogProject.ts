import { createAliyunClient } from '../../common/aliyunClient';
import { getSharedResource, buildSid } from '../../common';
import type { Context, ResourceState, StateFile } from '../../types';
import { logger } from '../../common/logger';
import { lang } from '../../lang';
import { OWNERSHIP_TAG_KEY, buildSharedOwnershipTagValue, isOwnedByApp } from '../ownershipTag';

type AliyunClient = ReturnType<typeof createAliyunClient>;

/**
 * Issue #214: one shared SLS project per app×stage, tracked in the stage-level
 * `shared` slot under the provider-neutral key 'logs.project'. Function and
 * gateway logstores stay nested under their owning resource inside the shared
 * project; the shared project is released by the destroyer once the provider
 * reports zero remaining logstores.
 */
export const SHARED_LOG_PROJECT_KEY = 'logs.project';

export const buildSharedProjectName = (app: string, stage: string): string => `${app}-${stage}-sls`;

export const resolveSharedProjectName = (shared: ResourceState): string | undefined => {
  const instanceId = (shared.instances?.[0] as { id?: string } | undefined)?.id;
  return instanceId ?? (shared.definition as { projectName?: string } | undefined)?.projectName;
};

export const ensureSharedSlsProject = async (
  context: Context,
  client: AliyunClient,
  state: StateFile | undefined,
): Promise<{ projectName: string }> => {
  const shared = state
    ? getSharedResource(state, context.stage, SHARED_LOG_PROJECT_KEY)
    : undefined;
  const existingName = shared ? resolveSharedProjectName(shared) : undefined;
  const projectName = existingName ?? buildSharedProjectName(context.app, context.stage);

  // A local shared-state entry is never trusted blindly: the provider must
  // confirm the project exists and carries this app's shared ownership tag
  // before it is reused. A foreign or untagged project is refused; a stale
  // entry (project gone from provider) falls through to creation.
  const existingProject = await client.sls.getProject(projectName);
  if (existingProject) {
    if (await isSharedProjectOwnedByApp(context, client, projectName)) {
      if (!existingName) {
        logger.info(lang.__('SHARED_SLS_PROJECT_ADOPTED', { projectName }));
      }
      return { projectName };
    }
    throw new Error(lang.__('SLS_PROJECT_FOREIGN_OWNED', { projectName }));
  }

  logger.info(lang.__('CREATING_SLS_PROJECT', { projectName }));
  await client.sls.createProject(projectName);
  await client.sls.addTags({
    resourceType: 'project',
    resourceId: projectName,
    tags: [
      {
        key: OWNERSHIP_TAG_KEY,
        value: buildSharedOwnershipTagValue(context.app, SHARED_LOG_PROJECT_KEY),
      },
    ],
  });

  return { projectName };
};

export const buildSharedProjectResourceState = (
  context: Context,
  result: { projectName: string },
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
      sid: buildSid('aliyun', 'sls_project', context.stage, result.projectName),
      type: 'ALIYUN_SLS_PROJECT',
      id: result.projectName,
    },
  ],
  lastUpdated: new Date().toISOString(),
});

export const adoptSharedSlsProjectState = (context: Context, projectName: string): ResourceState =>
  buildSharedProjectResourceState(context, { projectName });

/**
 * Exact app-scope ownership check for an SLS project. The caller must verify
 * the project exists (getProject) before reading its tags; a foreign or
 * untagged project is never adopted (issue #214).
 */
export const isSharedProjectOwnedByApp = async (
  context: Context,
  client: AliyunClient,
  projectName: string,
): Promise<boolean> => {
  const tags = await client.sls.getProjectTags(projectName);
  return isOwnedByApp(
    context.app,
    SHARED_LOG_PROJECT_KEY,
    tags.map((t) => ({ Key: t.key, Value: t.value })),
  );
};

export const releaseSharedSlsProjectIfUnused = async (
  context: Context,
  client: AliyunClient,
  shared: ResourceState | undefined,
): Promise<'deleted' | 'retained' | 'absent'> => {
  if (!shared) {
    return 'absent';
  }
  const projectName = resolveSharedProjectName(shared);
  if (!projectName) {
    return 'absent';
  }

  const project = await client.sls.getProject(projectName);
  if (!project) {
    return 'absent';
  }

  // Only ever delete a project we own. A foreign or untagged project is
  // retained — the tracked entry may be stale and must not be torn down.
  if (!(await isSharedProjectOwnedByApp(context, client, projectName))) {
    return 'retained';
  }

  const logstores = await client.sls.listLogStores(projectName);
  if (logstores.length > 0) {
    logger.info(
      lang.__('SHARED_SLS_PROJECT_IN_USE', {
        projectName,
        count: String(logstores.length),
      }),
    );
    return 'retained';
  }

  await client.sls.deleteProject(projectName);
  return 'deleted';
};

const ensureLogstoreInSharedProject = async (
  context: Context,
  client: AliyunClient,
  projectName: string,
  logstoreName: string,
): Promise<{ logstoreName: string }> => {
  const existing = await client.sls.getLogstore(projectName, logstoreName);
  if (existing) {
    return { logstoreName };
  }

  logger.info(lang.__('CREATING_SLS_LOGSTORE', { logstoreName }));
  await client.sls.createLogstore(projectName, logstoreName);
  logger.info(lang.__('CREATING_SLS_INDEX', { logstoreName }));
  await client.sls.createIndex(projectName, logstoreName);
  logger.info(lang.__('SLS_LOGSTORE_WAITING', { project: projectName, logstore: logstoreName }));
  await client.sls.waitForLogstore(projectName, logstoreName);

  return { logstoreName };
};

export const ensureFunctionLogstore = async (
  context: Context,
  client: AliyunClient,
  projectName: string,
): Promise<{ logstoreName: string }> => {
  return ensureLogstoreInSharedProject(
    context,
    client,
    projectName,
    `${context.service}-${context.stage}-fn-logs`,
  );
};

export const ensureGatewayLogstore = async (
  context: Context,
  client: AliyunClient,
  projectName: string,
): Promise<{ logstoreName: string }> => {
  return ensureLogstoreInSharedProject(
    context,
    client,
    projectName,
    `${context.service}-${context.stage}-apigw-logs`,
  );
};
