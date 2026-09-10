import { Context, EventDomain, Plan, PlanItem, StateFile } from '../../types';
import { createVolcengineClient } from '../../common/volcengineClient';
import { cachedRefreshRead } from '../../common/refreshCache';
import { PLAN_READ_CONCURRENCY, mapWithConcurrency } from '../../common/concurrency';
import {
  buildDesiredTriggerMap,
  buildGatewayName,
  buildEventResourceDefinition,
  cloudTriggerDiffers,
} from './apigwTypes';
import { getAllResources, getResource } from '../../common/stateManager';
import { attributesEqual } from '../../common/hashUtils';
import { logger } from '../../common';
import { lang } from '../../lang';
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
            lang.__('RESOURCE_EXISTS_NOT_OWNED', {
              resourceType: 'API Gateway',
              resourceName: buildGatewayName(serviceName, context.stage),
              tagKey: OWNERSHIP_TAG_KEY,
            }),
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

      // --no-refresh: no live reads, no drift claims — intent-diff only.
      const refreshEnabled = context.refresh !== false;

      let cloudService: Awaited<ReturnType<typeof client.apigw.getService>> = null;
      if (refreshEnabled && serviceInstance) {
        // Keep the not-found swallow OUTSIDE the cached read: a cached rejection
        // evicts its key so the next plan pass retries against the provider.
        cloudService = await cachedRefreshRead(
          context,
          `apigw.getService:${serviceInstance.id}`,
          () => client.apigw.getService(serviceInstance.id),
        ).catch(() => null);

        if (!cloudService) {
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

      // Issue #234 phase 2: live trigger drift. The service record alone can be
      // untouched while console edits reroute a trigger (method/path/upstream).
      // Routes and upstreams are matched by the derived names the executor
      // writes; a probe failure stays noop (best-effort detection) instead of
      // fabricating drift from a transient read error.
      let triggersDiffer = false;
      if (refreshEnabled && !definitionChanged && serviceInstance && event.triggers.length > 0) {
        try {
          const desiredTriggers = buildDesiredTriggerMap(event, context.stage);
          const cloudRoutes = await cachedRefreshRead(
            context,
            `apigw.listRoutesByService:${serviceInstance.id}`,
            () => client.apigw.listRoutesByService(serviceInstance.id),
          );
          const matched = (cloudRoutes ?? []).filter(
            (route) => route.routeName && desiredTriggers.has(route.routeName),
          );
          const upstreamNameById = new Map<string, string | undefined>();
          for (const route of matched) {
            const upstreamId = route.upstreamIds?.[0];
            if (upstreamId && !upstreamNameById.has(upstreamId)) {
              const upstream = await cachedRefreshRead(
                context,
                `apigw.getUpstream:${upstreamId}`,
                () => client.apigw.getUpstream(upstreamId),
              );
              upstreamNameById.set(upstreamId, upstream?.upstreamName);
            }
          }
          triggersDiffer = cloudTriggerDiffers(matched, upstreamNameById, desiredTriggers);
        } catch (error: unknown) {
          logger.warn(
            lang.__('PLAN_EVENT_TRIGGER_PROBE_FAILED', {
              eventName: event.name,
              error: String(error),
            }),
          );
        }
      }

      // Issue #234 phase 3: declared custom-domain drift — the service read
      // already carries customDomains, so this costs no extra API call.
      const desiredDomainName = (desiredDefinition as { domain?: { domainName?: string } }).domain
        ?.domainName;
      let domainDiffers = false;
      if (refreshEnabled && desiredDomainName) {
        const cloudDomains = cloudService?.customDomains ?? [];
        domainDiffers = !cloudDomains.some((d) => d.domain === desiredDomainName);
      }

      if (definitionChanged || triggersDiffer || domainDiffers) {
        return {
          logicalId,
          action: 'update',
          resourceType: 'VOLCENGINE_APIGW',
          changes: { before: currentDefinition, after: desiredDefinition },
          drifted: true,
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
