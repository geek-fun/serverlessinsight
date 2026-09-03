import { Context, EventDomain, Plan, PlanItem, StateFile } from '../../types';
import { createVolcengineClient } from '../../common/volcengineClient';
import { cachedRefreshRead } from '../../common/refreshCache';
import { PLAN_READ_CONCURRENCY, mapWithConcurrency } from '../../common/concurrency';
import { buildEventResourceDefinition, buildGatewayName } from './apigwTypes';
import { getAllResources, getResource } from '../../common/stateManager';
import { attributesEqual } from '../../common/hashUtils';
import { OWNERSHIP_TAG_KEY, isOwnedByStack } from '../ownershipTag';

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

  const eventItems = await mapWithConcurrency(
    events,
    PLAN_READ_CONCURRENCY,
    async (event): Promise<PlanItem> => {
      const logicalId = `events.${event.key}`;
      const currentState = getResource(state, logicalId);
      const client = createVolcengineClient(context);

      // Stored-first: an existing event keeps its recorded topic name so the
      // desired definition never phantom-drifts against legacy state.
      const storedTlsTopic = currentState?.instances?.find(
        (i) => (i as { type?: string }).type === 'VOLCENGINE_TLS_TOPIC',
      ) as { id?: string } | undefined;
      const storedTopicName = storedTlsTopic?.id?.split('/')[1];

      const desiredDefinition = buildEventResourceDefinition(event, storedTopicName);

      if (!currentState || currentState.status === 'tainted') {
        // No usable local state: probe the provider before planning create.
        // If a same-named gateway already exists WITHOUT our ownership tag it
        // may belong to another project — fail fast in the plan instead of
        // letting the executor discover it mid-deploy. The serverless gateway
        // is account-scoped, so only refuse when the NAMED one is foreign.
        const remoteGateway = await cachedRefreshRead(
          context,
          `apigw.findGatewayByName:${serviceName}:${context.stage}`,
          () => client.apigw.findGatewayByName(buildGatewayName(serviceName, context.stage)),
        );
        if (remoteGateway?.gatewayId && !isOwnedByStack(context, logicalId, remoteGateway.tags)) {
          throw new Error(
            `API Gateway ${buildGatewayName(serviceName, context.stage)} already exists in provider but is not owned by this stack (missing ${OWNERSHIP_TAG_KEY} tag). Refusing to create — resolve manually.`,
          );
        }

        return {
          logicalId,
          action: 'create',
          resourceType: 'VOLCENGINE_APIGW',
          changes: { after: desiredDefinition },
        };
      }

      const serviceInstance = currentState.instances.find(
        (i) => i.type === 'VOLCENGINE_APIGW_SERVICE',
      );

      if (serviceInstance) {
        // Keep the not-found swallow OUTSIDE the cached read: a cached rejection
        // evicts its key so the next plan pass retries against the provider.
        const remoteService = await cachedRefreshRead(
          context,
          `apigw.getService:${serviceInstance.id}`,
          () => client.apigw.getService(serviceInstance.id),
        ).catch(() => null);

        if (!remoteService) {
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
    },
  );

  const allStates = getAllResources(state);
  const deletionItems = Object.entries(allStates)
    .filter(([logicalId]) => {
      if (!logicalId.startsWith('events.')) {
        return false;
      }
      return !desiredLogicalIds.has(logicalId);
    })
    .map(([logicalId, resourceState]) => planEventDeletion(logicalId, resourceState.definition));

  return { items: [...eventItems, ...deletionItems] };
};
