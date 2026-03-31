import { Context, EventDomain, Plan, PlanItem, StateFile } from '../../types';
import { createVolcengineClient } from '../../common/volcengineClient';
import {
  eventToApigwGroupConfig,
  extractApigwGroupDefinition,
  extractEventDomainDefinition,
} from './apigwTypes';
import { getAllResources, getResource } from '../../common/stateManager';
import { attributesEqual } from '../../common/hashUtils';

const planEventDeletion = (logicalId: string, definition: Record<string, unknown>): PlanItem => ({
  logicalId,
  action: 'delete',
  resourceType: 'VOLCENGINE_APIGW',
  changes: { before: definition },
});

export const generateApigwPlan = async (
  context: Context,
  state: StateFile,
  events: Array<EventDomain> | undefined,
  serviceName: string,
): Promise<Plan> => {
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
      const groupConfig = eventToApigwGroupConfig(event, serviceName, context.stage);
      const groupDefinition = extractApigwGroupDefinition(groupConfig);
      const client = createVolcengineClient(context);

      const desiredDefinition = {
        ...groupDefinition,
        triggers: event.triggers.map((t) => ({
          method: t.method,
          path: t.path,
          backend: t.backend,
        })),
        domain: extractEventDomainDefinition(event.domain),
      };

      if (!currentState) {
        try {
          const remoteGateway = await client.apigw.findGatewayByName(groupConfig.groupName);
          if (remoteGateway) {
            return {
              logicalId,
              action: 'update',
              resourceType: 'VOLCENGINE_APIGW',
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
          resourceType: 'VOLCENGINE_APIGW',
          changes: { after: desiredDefinition },
        };
      }

      try {
        const groupInstance = currentState.instances.find(
          (i) => i.type === 'VOLCENGINE_APIGW_GROUP',
        );

        if (groupInstance) {
          const remoteGateway = await client.apigw.getGateway(groupInstance.id);

          if (!remoteGateway) {
            return {
              logicalId,
              action: 'create',
              resourceType: 'VOLCENGINE_APIGW',
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
            resourceType: 'VOLCENGINE_APIGW',
            changes: { before: currentDefinition, after: desiredDefinition },
          };
        }

        return { logicalId, action: 'noop', resourceType: 'VOLCENGINE_APIGW' };
      } catch {
        return {
          logicalId,
          action: 'create',
          resourceType: 'VOLCENGINE_APIGW',
          changes: { before: currentState.definition, after: desiredDefinition },
        };
      }
    }),
  );

  const allStates = getAllResources(state);
  const deletionItems = Object.entries(allStates)
    .filter(([logicalId]) => {
      if (!logicalId.startsWith('events.')) {
        return false;
      }
      if (desiredLogicalIds.has(logicalId)) {
        return false;
      }
      return true;
    })
    .map(([logicalId, resourceState]) => planEventDeletion(logicalId, resourceState.definition));

  return { items: [...eventItems, ...deletionItems] };
};
