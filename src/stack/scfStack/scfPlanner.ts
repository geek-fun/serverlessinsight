import { definitionsDiffer, remoteDiffersFromDesired } from '../../common/planCompare';
import { buildTencentHttpTriggerDesc, mapAuthType, mapAccess } from '../../common/triggerMapper';
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
import { translateSiCron } from '../../common/siCron';
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
      const desiredDefinition = extractScfDefinition(config, desiredCodeHash, fn.iam, fn);

      const client = createTencentClient(context);

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
            lang.__('RESOURCE_EXISTS_NOT_OWNED', {
              resourceType: 'Function',
              resourceName: fn.name,
              tagKey: OWNERSHIP_TAG_KEY,
            }),
          ),
        extraUpdate: async () => {
          if (fn.triggers?.http) {
            const live = await cachedRefreshRead(context, `scf.getFunction:${fn.name}`, () =>
              client.scf.getFunction(fn.name),
            );
            const trigger = (live?.Triggers ?? []).find(
              (entry) => entry.Type === 'http' && entry.TriggerDesc?.includes('NetConfig'),
            );
            const desired = JSON.parse(
              buildTencentHttpTriggerDesc(
                mapAuthType(context.provider, fn.triggers.http.auth_type),
                mapAccess(fn.triggers.http.access),
              ),
            ) as Record<string, unknown>;
            let actual: Record<string, unknown> | null = null;
            if (trigger?.TriggerDesc) {
              try {
                actual = JSON.parse(trigger.TriggerDesc) as Record<string, unknown>;
              } catch {
                actual = null;
              }
            }
            if (!actual || remoteDiffersFromDesired({ http: actual }, { http: desired }))
              return {
                update: true,
                drifted: !definitionsDiffer(currentState?.definition ?? {}, {
                  http: desiredDefinition.http,
                }),
                reason: 'PLAN_DRIFT_HTTP_TRIGGER',
              };
          }
          if (fn.domain) {
            const domain = await cachedRefreshRead(
              context,
              `scf.getCustomDomain:${fn.domain.domain_name}`,
              () => client.scf.getCustomDomain(fn.domain!.domain_name),
            );
            if (
              !domain ||
              (domain.Protocol !== undefined && domain.Protocol !== fn.domain.protocol)
            )
              return {
                update: true,
                drifted: !definitionsDiffer(currentState?.definition ?? {}, {
                  domain: desiredDefinition.domain,
                }),
                reason: 'PLAN_DRIFT_FUNCTION_DOMAIN',
              };
          }
          // Issue #234 M3: nested topic drift — probed only when logging is
          // declared; unresolvable/unreadable topics are not drift. Runs via
          // the skeleton's extraUpdate hook (issue #246) so a topic-only
          // drift gets the live→desired diff baseline too.
          const topicInstance = currentState?.instances?.find(
            (i) => (i as { type?: string }).type === 'TENCENT_CLS_TOPIC',
          ) as { id?: string } | undefined;
          if (fn.log && topicInstance?.id) {
            const topicId = topicInstance.id;
            try {
              const liveTopic = await cachedRefreshRead(
                context,
                `cls.getTopicById:${topicId}`,
                () => client.cls.getTopicById(topicId),
              );
              const topicDrifted =
                !liveTopic ||
                liveTopic.StorageType !== CLS_TOPIC_STORAGE_TYPE ||
                liveTopic.Period !== CLS_TOPIC_PERIOD;
              if (topicDrifted) {
                return { update: true, drifted: true, reason: 'PLAN_DRIFT_CLS_TOPIC' };
              }
            } catch (error: unknown) {
              logger.warn(
                lang.__('PLAN_FUNCTION_NESTED_PROBE_FAILED', {
                  functionName: fn.name,
                  error: String(error),
                }),
              );
              throw error;
            }
          }

          // Issue #258: timer trigger drift — the live GetFunction trigger
          // list is compared against the desired timers (name-keyed). The
          // read is refresh-cached, so this reuses the fetch the skeleton
          // already made. Manual deletes, console cron edits and extra
          // triggers all mark the function drifted.
          const desiredTimers = fn.triggers?.timer ?? [];
          if (fn.triggers?.timer !== undefined) {
            try {
              const live = await cachedRefreshRead(context, `scf.getFunction:${fn.name}`, () =>
                client.scf.getFunction(fn.name),
              );
              const liveTimers = (live?.Triggers ?? []).filter(
                (trigger) => trigger.Type === 'timer' && trigger.TriggerName,
              );
              const desiredNames = new Set(desiredTimers.map((timer) => timer.name));
              const extraTimer = liveTimers.some(
                (trigger) => !desiredNames.has(trigger.TriggerName),
              );
              const desiredChanged = desiredTimers.some((timer) => {
                const liveTimer = liveTimers.find((trigger) => trigger.TriggerName === timer.name);
                if (!liveTimer) {
                  return true;
                }
                // GetFunction reports Enable as 1/0
                return (
                  liveTimer.TriggerDesc !== translateSiCron(timer.cron, 'tencent') ||
                  (liveTimer.CustomArgument ?? undefined) !== timer.payload ||
                  (liveTimer.Description ?? undefined) !== timer.description ||
                  (liveTimer.Enable === 1) !== timer.enable
                );
              });
              if (extraTimer || desiredChanged) {
                return {
                  update: true,
                  drifted: !definitionsDiffer(currentState?.definition ?? {}, {
                    timers: desiredDefinition.timers,
                  }),
                  reason: 'PLAN_DRIFT_TIMER_TRIGGER',
                };
              }
            } catch (error: unknown) {
              logger.warn(
                lang.__('PLAN_TIMER_TRIGGER_PROBE_FAILED', {
                  functionName: fn.name,
                  error: String(error),
                }),
              );
              throw error;
            }
          }

          return { update: false, drifted: false };
        },
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
