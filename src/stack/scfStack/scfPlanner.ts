import {
  Context,
  FunctionDomain,
  Plan,
  PlanItem,
  StateFile,
  ResourceAttributes,
} from '../../types';
import { createTencentClient } from '../../common/tencentClient';
import { logger } from '../../common/logger';
import { lang } from '../../lang';
import { cachedRefreshRead } from '../../common/refreshCache';
import { CLS_TOPIC_PERIOD, CLS_TOPIC_STORAGE_TYPE } from '../../common/tencentClient/clsOperations';
import { PLAN_READ_CONCURRENCY, mapWithConcurrency } from '../../common/concurrency';
import { functionToScfConfig, extractScfDefinition, cloudScfToDefinition } from './scfTypes';
import { getAllResources, getResource } from '../../common/stateManager';
import { computeZipContentHash } from '../../common/hashUtils';
import { planRefreshedResource } from '../../common/refreshPlanner';
import { OWNERSHIP_TAG_KEY, isOwnedByStack } from '../ownershipTag';
import { buildSharedLogsetName, buildFunctionTopicName } from './sharedLogset';

const planFunctionDeletion = (logicalId: string, definition: ResourceAttributes): PlanItem => ({
  logicalId,
  action: 'delete',
  resourceType: 'SCF',
  changes: { before: definition },
});

export const generateFunctionPlan = async (
  context: Context,
  state: StateFile,
  functions: Array<FunctionDomain> | undefined,
): Promise<Plan> => {
  if (!functions || functions.length === 0) {
    const allStates = getAllResources(state);
    const items = Object.entries(allStates)
      .filter(([logicalId]) => logicalId.startsWith('functions.'))
      .map(([logicalId, resourceState]) =>
        planFunctionDeletion(logicalId, resourceState.definition),
      );
    return { items };
  }

  const desiredLogicalIds = new Set(functions.map((fn) => `functions.${fn.key}`));

  const functionItems = await mapWithConcurrency(
    functions,
    PLAN_READ_CONCURRENCY,
    async (fn): Promise<PlanItem> => {
      const logicalId = `functions.${fn.key}`;
      const currentState = getResource(state, logicalId);
      let config = functionToScfConfig(fn);
      if (fn.log) {
        config = {
          ...config,
          ClsLogsetName: buildSharedLogsetName(context.app, context.stage),
          ClsTopicName: buildFunctionTopicName(context, fn.key),
        };
      }
      const codePath = fn.code!.path;
      const desiredCodeHash = await computeZipContentHash(codePath);
      const desiredDefinition = extractScfDefinition(config, desiredCodeHash, fn.iam);

      const client = createTencentClient(context);

      // Issue #234 M3: nested topic drift — probed only when logging is
      // declared; unresolvable/unreadable topics are not drift.
      if (
        currentState &&
        currentState.status !== 'tainted' &&
        fn.log &&
        context.refresh !== false
      ) {
        const topicInstance = currentState.instances?.find(
          (i) => (i as { type?: string }).type === 'TENCENT_CLS_TOPIC',
        ) as { id?: string } | undefined;
        if (topicInstance?.id) {
          const topicId = topicInstance.id;
          try {
            const liveTopic = await cachedRefreshRead(context, `cls.getTopicById:${topicId}`, () =>
              client.cls.getTopicById(topicId),
            );
            const topicDrifted =
              !liveTopic ||
              liveTopic.StorageType !== CLS_TOPIC_STORAGE_TYPE ||
              liveTopic.Period !== CLS_TOPIC_PERIOD;
            if (topicDrifted) {
              return {
                logicalId,
                action: 'update',
                resourceType: 'SCF',
                changes: { before: currentState.definition || {}, after: desiredDefinition },
                drifted: true,
              };
            }
          } catch (error: unknown) {
            logger.warn(
              lang.__('PLAN_FUNCTION_NESTED_PROBE_FAILED', {
                functionName: fn.name,
                error: String(error),
              }),
            );
          }
        }
      }

      return planRefreshedResource({
        logicalId,
        resourceType: 'SCF',
        currentState,
        desiredDefinition,
        read: () =>
          cachedRefreshRead(context, `scf.getFunction:${fn.name}`, () =>
            client.scf.getFunction(fn.name),
          ),
        isOwned: (remote) => isOwnedByStack(context, logicalId, remote.Tags),
        foreignError: () =>
          new Error(
            `Function ${fn.name} already exists in provider but is not owned by this stack (missing ${OWNERSHIP_TAG_KEY} tag). Refusing to create — resolve manually.`,
          ),
        cloudToDefinition: cloudScfToDefinition,
        enrichRemoteAttributes: async (remote, attributes) => {
          // Resolve cloud CLS ids back to the stable names the desired
          // definition uses; unresolvable ids are skipped, not fabricated into
          // drift.
          const desiredLog = desiredDefinition.logConfig as
            { logset: string; topic: string } | undefined;
          if (!desiredLog || !remote.ClsLogsetId || !remote.ClsTopicId) {
            return attributes;
          }
          try {
            const logsetName = await cachedRefreshRead(
              context,
              `cls.getLogsetNameById:${remote.ClsLogsetId}`,
              () => client.cls.getLogsetNameById(remote.ClsLogsetId as string),
            );
            const topics = await cachedRefreshRead(
              context,
              `cls.listTopicsByLogset:${remote.ClsLogsetId}`,
              () => client.cls.listTopicsByLogset(remote.ClsLogsetId as string),
            );
            const topicName = topics?.find((t) => t.TopicId === remote.ClsTopicId)?.TopicName;
            if (!logsetName || !topicName) {
              return attributes;
            }
            return { ...attributes, logConfig: { logset: logsetName, topic: topicName } };
          } catch {
            return attributes;
          }
        },
        refresh: context.refresh,
      });
    },
  );

  const allStates = getAllResources(state);
  const deletionItems = Object.entries(allStates)
    .filter(
      ([logicalId]) => logicalId.startsWith('functions.') && !desiredLogicalIds.has(logicalId),
    )
    .map(([logicalId, resourceState]) => planFunctionDeletion(logicalId, resourceState.definition));

  return { items: [...functionItems, ...deletionItems] };
};
