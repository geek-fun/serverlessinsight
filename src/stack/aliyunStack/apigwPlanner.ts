import { Context, EventDomain, Plan, PlanItem, StateFile } from '../../types';
import { createAliyunClient } from '../../common/aliyunClient';
import { eventToApigwGroupConfig, extractApigwGroupDefinition } from './apigwTypes';
import { getAllResources, getResource } from '../../common/stateManager';
import { attributesEqual } from '../../common/hashUtils';

const planEventDeletion = (logicalId: string, definition: Record<string, unknown>): PlanItem => ({
  logicalId,
  action: 'delete',
  resourceType: 'ALIYUN_APIGW',
  changes: { before: definition },
});

/**
 * Generate plan for API Gateway events
 */
export const generateApigwPlan = async (
  context: Context,
  state: StateFile,
  events: Array<EventDomain> | undefined,
  serviceName: string,
): Promise<Plan> => {
  // If no events, check if we need to delete existing ones
  if (!events || events.length === 0) {
    const allStates = getAllResources(state);
    const items = Object.entries(allStates)
      .filter(([logicalId]) => logicalId.startsWith('events.'))
      .map(([logicalId, resourceState]) => planEventDeletion(logicalId, resourceState.definition));
    return { items };
  }

  const desiredLogicalIds = new Set(events.map((e) => `events.${e.key}`));

  const eventItems = await Promise.all(
    events.map(async (event): Promise<PlanItem> => {
      const logicalId = `events.${event.key}`;
      const currentState = getResource(state, logicalId);
      const groupConfig = eventToApigwGroupConfig(event, serviceName);
      const groupDefinition = extractApigwGroupDefinition(groupConfig);
      const client = createAliyunClient(context);

      // Build desired definition including triggers
      const desiredDefinition = {
        ...groupDefinition,
        triggers: event.triggers.map((t) => ({
          method: t.method,
          path: t.path,
          backend: t.backend,
        })),
        domain: event.domain
          ? {
              domainName: event.domain.domain_name,
              certificateName: event.domain.certificate_name,
            }
          : null,
      };

      if (!currentState) {
        // No state exists, check if resource exists remotely
        try {
          const remoteGroup = await client.apigw.findApiGroupByName(groupConfig.groupName);
          if (remoteGroup) {
            // Resource exists remotely but not in state - needs import or recreate
            return {
              logicalId,
              action: 'create',
              resourceType: 'ALIYUN_APIGW',
              changes: { after: desiredDefinition },
              drifted: true,
            };
          }
        } catch {
          // Ignore errors when checking remote
        }

        return {
          logicalId,
          action: 'create',
          resourceType: 'ALIYUN_APIGW',
          changes: { after: desiredDefinition },
        };
      }

      // State exists, check for changes
      try {
        const groupInstance = currentState.instances.find((i) => i.type === 'ALIYUN_APIGW_GROUP');

        if (groupInstance) {
          const remoteGroup = await client.apigw.getApiGroup(groupInstance.id);

          if (!remoteGroup) {
            // Resource in state but not remotely - needs recreate
            return {
              logicalId,
              action: 'create',
              resourceType: 'ALIYUN_APIGW',
              changes: { before: currentState.definition, after: desiredDefinition },
              drifted: true,
            };
          }
        }

        const currentDefinition = currentState.definition || {};
        const definitionChanged = !attributesEqual(currentDefinition, desiredDefinition);

        if (definitionChanged) {
          return {
            logicalId,
            action: 'update',
            resourceType: 'ALIYUN_APIGW',
            changes: { before: currentDefinition, after: desiredDefinition },
          };
        }

        return { logicalId, action: 'noop', resourceType: 'ALIYUN_APIGW' };
      } catch {
        return {
          logicalId,
          action: 'create',
          resourceType: 'ALIYUN_APIGW',
          changes: { before: currentState.definition, after: desiredDefinition },
        };
      }
    }),
  );

  // Find resources in state that are no longer in config
  const allStates = getAllResources(state);
  const deletionItems = Object.entries(allStates)
    .filter(([logicalId]) => logicalId.startsWith('events.') && !desiredLogicalIds.has(logicalId))
    .map(([logicalId, resourceState]) => planEventDeletion(logicalId, resourceState.definition));

  return { items: [...eventItems, ...deletionItems] };
};
