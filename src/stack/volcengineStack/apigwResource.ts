import {
  Context,
  EventDomain,
  ResourceInstance,
  ResourceState,
  StateFile,
  PartialResourceError,
} from '../../types';
import { createVolcengineClient } from '../../common/volcengineClient';
import { getContext } from '../../common';
import type {
  ApigwGatewayConfig,
  ApigwGatewayInfo,
  ApigwRouteInfo,
  ApigwServiceConfig,
  ApigwServiceInfo,
  ApigwUpstreamInfo,
} from '../../common/volcengineClient/types';
import {
  eventToApigwGatewayConfig,
  eventToApigwServiceConfig,
  triggerToApigwUpstreamConfig,
  triggerToApigwRouteConfig,
  buildEventResourceDefinition,
  buildUpstreamName,
  resolveFunctionKey,
} from './apigwTypes';
import {
  setResource,
  removeResource,
  getResource,
  setSharedResource,
  getSharedResource,
  removeSharedResource,
} from '../../common/stateManager';
import { buildSid } from '../../common';
import { logger } from '../../common/logger';
import { lang } from '../../lang';
import { OWNERSHIP_TAG_KEY, buildOwnershipTagValue, isOwnedByStack } from '../ownershipTag';
import { isResourceAlreadyExistsError } from '../alreadyExists';
import {
  ensureSharedLogProject,
  buildSharedProjectResourceState,
  ensureOwnedTopic,
  deleteTlsLogResources,
  buildSharedProjectName,
  buildApigwLogTopicName,
  releaseSharedLogProjectIfUnused,
  SHARED_LOG_PROJECT_KEY,
} from './sharedLogProject';

const buildGatewayInstance = (info: ApigwGatewayInfo, stage: string): ResourceInstance => ({
  type: 'VOLCENGINE_APIGW_GATEWAY',
  sid: buildSid('volcengine', 'apigw', stage, info.gatewayId ?? ''),
  id: info.gatewayId ?? '',
  gatewayId: info.gatewayId ?? null,
  gatewayName: info.gatewayName ?? null,
  status: info.status ?? null,
  gatewayType: info.type ?? null,
  createdTime: info.createdTime ?? null,
  description: info.description ?? null,
  message: info.message ?? null,
  tags: info.tags ?? null,
  region: info.region ?? null,
  version: info.version ?? null,
  projectName: info.projectName ?? null,
  networkSpec: info.networkSpec ?? null,
  backendSpec: info.backendSpec ?? null,
  monitorSpec: info.monitorSpec ?? null,
  logSpec: info.logSpec ?? null,
  resourceSpec: info.resourceSpec ?? null,
});

const resolveTlsTopicNameFromInstances = (
  instances: Array<ResourceInstance>,
): string | undefined => {
  const tlsTopic = instances.find((i) => i.type === 'VOLCENGINE_TLS_TOPIC') as
    { id?: string } | undefined;
  return tlsTopic?.id?.split('/')[1];
};

const ensureApigwLogResources = async (
  context: Context,
  existingInstances: Array<ResourceInstance>,
  state: StateFile,
  logicalId: string,
  eventKey: string,
): Promise<{
  projectId: string;
  topicId: string;
  instances: Array<ResourceInstance>;
  sharedInstance?: ResourceState;
}> => {
  const client = createVolcengineClient(context);

  const tlsProjectInstance = existingInstances.find((i) => i.type === 'VOLCENGINE_TLS_PROJECT');
  const tlsTopicInstance = existingInstances.find((i) => i.type === 'VOLCENGINE_TLS_TOPIC');

  if (tlsProjectInstance && tlsTopicInstance) {
    // Legacy own project+topic → reuse exactly as before.
    return {
      projectId: (tlsProjectInstance.projectId as string) ?? '',
      topicId: (tlsTopicInstance.topicId as string) ?? '',
      instances: existingInstances.filter((i) => (i.type as string).startsWith('VOLCENGINE_TLS_')),
    };
  }

  // Shared app-scoped TLS project (#214) with a per-event topic nested under it.
  const shared = await ensureSharedLogProject(context, client, state);
  const sharedInstance = buildSharedProjectResourceState(context, shared);
  const topicName = buildApigwLogTopicName(context.service, context.stage, eventKey);
  const topic = await ensureOwnedTopic(context, client, {
    projectName: shared.projectName,
    topicName,
    logicalId,
  });

  return {
    projectId: shared.projectId,
    topicId: topic.topicId,
    instances: [
      {
        type: 'VOLCENGINE_TLS_TOPIC',
        sid: buildSid(
          'volcengine',
          'tls',
          context.stage,
          `${shared.projectName}/${topic.topicName}`,
        ),
        id: `${shared.projectName}/${topic.topicName}`,
        projectId: shared.projectId,
        topicId: topic.topicId,
      },
      {
        type: 'VOLCENGINE_TLS_INDEX',
        sid: buildSid(
          'volcengine',
          'tls',
          context.stage,
          `${shared.projectName}/${topic.topicName}/index`,
        ),
        id: `${shared.projectName}/${topic.topicName}/index`,
      },
    ],
    sharedInstance,
  };
};

const buildServiceInstance = (
  serviceId: string,
  serviceName: string,
  gatewayId: string,
  stage: string,
  info?: ApigwServiceInfo,
): ResourceInstance => ({
  type: 'VOLCENGINE_APIGW_SERVICE',
  sid: buildSid('volcengine', 'apigw', stage, serviceId),
  id: serviceId,
  serviceId,
  serviceName,
  gatewayId,
  ...(info?.status && { status: info.status }),
  ...(info?.protocol && { protocol: info.protocol }),
  ...(info?.createdTime && { createdTime: info.createdTime }),
  ...(info?.gatewayName && { gatewayName: info.gatewayName }),
  ...(info?.message && { message: info.message }),
  ...(info?.comments && { comments: info.comments }),
  ...(info?.authSpec && { authSpec: info.authSpec }),
  ...(info?.domains && { domains: info.domains }),
  ...(info?.customDomains && { customDomains: info.customDomains }),
});

const buildUpstreamInstance = (
  upstreamId: string,
  upstreamName: string,
  gatewayId: string,
  functionId: string,
  stage: string,
  info?: ApigwUpstreamInfo,
): ResourceInstance => ({
  type: 'VOLCENGINE_APIGW_UPSTREAM',
  sid: buildSid('volcengine', 'apigw', stage, upstreamId),
  id: upstreamId,
  upstreamId,
  upstreamName,
  gatewayId,
  functionId,
  ...(info?.sourceType && { sourceType: info.sourceType }),
  ...(info?.protocol && { protocol: info.protocol }),
  ...(info?.status && { status: info.status }),
  ...(info?.createdTime && { createdTime: info.createdTime }),
  ...(info?.comments && { comments: info.comments }),
  ...(info?.resourceType && { resourceType: info.resourceType }),
  ...(info?.updateTime && { updateTime: info.updateTime }),
  ...(info?.backendTargetList && { backendTargetList: info.backendTargetList }),
});

const buildRouteInstance = (
  routeId: string,
  routeName: string,
  serviceId: string,
  stage: string,
  info?: ApigwRouteInfo,
): ResourceInstance => ({
  type: 'VOLCENGINE_APIGW_ROUTE',
  sid: buildSid('volcengine', 'apigw', stage, routeId),
  id: routeId,
  routeId,
  routeName,
  serviceId,
  ...(info?.method && { method: info.method }),
  ...(info?.path && { path: info.path }),
  ...(info?.upstreamIds && { upstreamIds: info.upstreamIds }),
  ...(info?.status && { status: info.status }),
  ...(info?.enable !== undefined && { enable: info.enable }),
  ...(info?.priority !== undefined && { priority: info.priority }),
  ...(info?.matchRule && { matchRule: info.matchRule }),
  ...(info?.upstreamList && { upstreamList: info.upstreamList }),
});

/**
 * Resolve the veFaaS function Id for a backend ref from state. Template refs
 * carry the key directly; bare values are the deployed function name and are
 * mapped to the template key first. The function resource must already be
 * deployed (functions deploy before events).
 */
const resolveFunctionIdFromState = (state: StateFile, backendRef: string): string => {
  const context = getContext();
  const refMatch = /^\$\{functions\.([\w.]+)\}$/.exec(String(backendRef ?? ''));
  const fnKey =
    refMatch?.[1] ?? context.iac?.functions?.find((f) => f.name === String(backendRef))?.key;
  const fnState = fnKey ? getResource(state, `functions.${fnKey}`) : undefined;
  const instance = fnState?.instances?.find((i) => i.type === 'VOLCENGINE_VEFAAS_FUNCTION');
  const functionId = (instance as { functionId?: string | null } | undefined)?.functionId;
  if (!functionId) {
    throw new Error(
      `Cannot resolve veFaaS function Id for backend ${backendRef}${
        fnKey ? ` (functions.${fnKey})` : ''
      } — no functionId in state. Deploy the function first. External functions (not defined in this template) are not supported for volcengine API Gateway backends.`,
    );
  }
  return functionId;
};

export const createApigwResource = async (
  context: Context,
  event: EventDomain,
  serviceName: string,
  state: StateFile,
): Promise<StateFile> => {
  const logicalId = `events.${event.key}`;
  const client = createVolcengineClient(context);

  const gatewayConfig: ApigwGatewayConfig = eventToApigwGatewayConfig(
    event,
    serviceName,
    context.stage,
    buildOwnershipTagValue(context, logicalId),
  );

  // The serverless gateway is account-scoped (one per account per region) —
  // reuse an existing one (ours or already present) instead of creating another.
  let gatewayInfo: ApigwGatewayInfo | null = await client.apigw.findServerlessGateway();
  if (!gatewayInfo?.gatewayId) {
    const existingByName = await client.apigw.findGatewayByName(gatewayConfig.gatewayName);
    if (existingByName?.gatewayId && isOwnedByStack(context, logicalId, existingByName.tags)) {
      gatewayInfo = existingByName;
    }
  }

  if (!gatewayInfo?.gatewayId) {
    // NetworkSpec (vpc_id + subnet_ids) is required by CreateGateway for all
    // types — verified live: omitting it returns "missing NetworkSpec".
    if (!gatewayConfig.network) {
      throw new Error(
        `events.${event.key}: network (vpc_id + subnet_ids) is required to create the API Gateway instance — add it to the event config`,
      );
    }
    try {
      gatewayInfo = await client.apigw.createGateway(gatewayConfig);
    } catch (error) {
      if (isResourceAlreadyExistsError(error)) {
        const probe =
          (await client.apigw.findGatewayByName(gatewayConfig.gatewayName)) ??
          (await client.apigw.findServerlessGateway());
        if (probe?.gatewayId && isOwnedByStack(context, logicalId, probe.tags)) {
          gatewayInfo = probe;
        } else {
          throw new PartialResourceError(
            state,
            new Error(
              `API Gateway ${gatewayConfig.gatewayName} already exists but is not owned by this stack (missing ${OWNERSHIP_TAG_KEY} tag). Refusing to adopt — resolve manually.`,
            ),
          );
        }
      } else {
        throw error;
      }
    }
  }

  if (!gatewayInfo?.gatewayId) {
    throw new Error('Failed to create or reuse an API Gateway instance');
  }
  const gatewayId = gatewayInfo.gatewayId;

  // Gateway creation is async — service/upstream/route calls are rejected
  // until the instance reaches Running.
  gatewayInfo = await client.apigw.waitForGatewayRunning(gatewayId);

  const instances: Array<ResourceInstance> = [buildGatewayInstance(gatewayInfo, context.stage)];

  if (event.log) {
    const existingEventState = getResource(state, logicalId);
    const existingInstances = existingEventState?.instances ?? [];
    const logResources = await ensureApigwLogResources(
      context,
      existingInstances,
      state,
      logicalId,
      event.key,
    );
    if (logResources.sharedInstance) {
      state = setSharedResource(state, context.stage, 'logs.project', logResources.sharedInstance);
    }
    await client.apigw.updateGatewayLog(gatewayId, {
      enable: true,
      projectId: logResources.projectId,
      topicId: logResources.topicId,
    });
    instances.push(...logResources.instances);
  }

  const serviceConfig: ApigwServiceConfig = eventToApigwServiceConfig(
    event,
    serviceName,
    context.stage,
    gatewayId,
  );

  let serviceId: string;
  const existingService = await client.apigw.findServiceByName(
    gatewayId,
    serviceConfig.serviceName,
  );
  if (existingService?.serviceId) {
    serviceId = existingService.serviceId;
  } else {
    serviceId = await client.apigw.createService(serviceConfig);
  }
  // Refresh the full service record — the create response carries only the Id
  // and findServiceByName may return a partial read; getService returns the
  // complete provider detail (status/protocol/createdTime/…).
  const serviceInfo =
    (await client.apigw.getService(serviceId).catch(() => null)) ?? existingService ?? null;
  instances.push(
    buildServiceInstance(
      serviceId,
      serviceConfig.serviceName,
      gatewayId,
      context.stage,
      serviceInfo ?? undefined,
    ),
  );

  const partialResourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition: buildEventResourceDefinition(event, resolveTlsTopicNameFromInstances(instances)),
    instances,
    status: 'tainted',
    lastUpdated: new Date().toISOString(),
  };

  const stateAfterDependents = setResource(state, logicalId, partialResourceState);

  try {
    // One upstream per backend function (triggers sharing a function reuse it).
    const upstreamByFunction = new Map<string, string>();
    for (const trigger of event.triggers) {
      const backendRef = String(trigger.backend);
      const fnKey = resolveFunctionKey(backendRef);

      let upstreamId = upstreamByFunction.get(fnKey);
      if (!upstreamId) {
        const functionId = resolveFunctionIdFromState(state, backendRef);
        const upstreamName = buildUpstreamName(event, backendRef, context.stage);
        const existingUpstream = await client.apigw.findUpstreamByName(gatewayId, upstreamName);
        if (existingUpstream?.upstreamId) {
          upstreamId = existingUpstream.upstreamId;
        } else {
          const upstreamConfig = triggerToApigwUpstreamConfig(
            event,
            trigger,
            serviceName,
            context.stage,
            gatewayId,
            functionId,
          );
          upstreamId = await client.apigw.createUpstream(upstreamConfig);
        }
        upstreamByFunction.set(fnKey, upstreamId);
        // Refresh the full upstream record — the create response carries only
        // the Id; getUpstream returns status/sourceType/protocol/createdTime/…
        // for both the create and adopt paths.
        const upstreamInfo =
          (await client.apigw.getUpstream(upstreamId).catch(() => null)) ??
          existingUpstream ??
          null;
        instances.push(
          buildUpstreamInstance(
            upstreamId,
            upstreamName,
            gatewayId,
            functionId,
            context.stage,
            upstreamInfo ?? undefined,
          ),
        );
      }

      const routeConfig = triggerToApigwRouteConfig(event, trigger, serviceId, upstreamId);
      const routeId = await client.apigw.createRoute(routeConfig);
      const routeInfo: ApigwRouteInfo = {
        routeId,
        routeName: routeConfig.routeName,
        serviceId,
        method: routeConfig.method,
        path: routeConfig.path,
        upstreamIds: [routeConfig.upstreamId],
      };
      instances.push(
        buildRouteInstance(routeId, routeConfig.routeName, serviceId, context.stage, routeInfo),
      );
    }

    if (event.domain) {
      const domainName = event.domain.domain_name as string;
      const domainId = await client.apigw.createCustomDomain({
        serviceId,
        domainName,
        certificateId: event.domain.certificate_id as string | undefined,
      });
      instances.push({
        type: 'VOLCENGINE_APIGW_DOMAIN',
        sid: buildSid('volcengine', 'apigw', context.stage, domainId || domainName),
        id: domainId || domainName,
        domainName,
        serviceId,
      });
    }
  } catch (error) {
    if (error instanceof PartialResourceError) {
      throw error;
    }
    throw new PartialResourceError(
      stateAfterDependents,
      error instanceof Error ? error : new Error(String(error)),
    );
  }

  const finalResourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition: buildEventResourceDefinition(event, resolveTlsTopicNameFromInstances(instances)),
    instances,
    status: 'ready',
    lastUpdated: new Date().toISOString(),
  };

  return setResource(stateAfterDependents, logicalId, finalResourceState);
};

export const updateApigwResource = async (
  context: Context,
  event: EventDomain,
  serviceName: string,
  state: StateFile,
): Promise<StateFile> => {
  const existingState = getResource(state, `events.${event.key}`);
  if (!existingState) {
    return createApigwResource(context, event, serviceName, state);
  }

  const client = createVolcengineClient(context);
  const serviceInstance = existingState.instances.find(
    (i) => i.type === 'VOLCENGINE_APIGW_SERVICE',
  );
  if (!serviceInstance) {
    return createApigwResource(context, event, serviceName, state);
  }
  const serviceId = serviceInstance.id;

  const existingRoutes = existingState.instances.filter((i) => i.type === 'VOLCENGINE_APIGW_ROUTE');
  const existingUpstreams = existingState.instances.filter(
    (i) => i.type === 'VOLCENGINE_APIGW_UPSTREAM',
  );

  const neededRouteIds = new Set<string>();
  const instances: Array<ResourceInstance> = existingState.instances.filter(
    (i) =>
      i.type === 'VOLCENGINE_APIGW_GATEWAY' ||
      i.type === 'VOLCENGINE_APIGW_SERVICE' ||
      i.type === 'VOLCENGINE_APIGW_UPSTREAM',
  );

  try {
    if (event.log) {
      const logResources = await ensureApigwLogResources(
        context,
        existingState.instances,
        state,
        `events.${event.key}`,
        event.key,
      );
      if (logResources.sharedInstance) {
        state = setSharedResource(
          state,
          context.stage,
          'logs.project',
          logResources.sharedInstance,
        );
      }
      await client.apigw.updateGatewayLog(serviceInstance.gatewayId as string, {
        enable: true,
        projectId: logResources.projectId,
        topicId: logResources.topicId,
      });
      instances.push(...logResources.instances);
    } else {
      const existingLogResources = existingState.instances.filter((i) =>
        (i.type as string).startsWith('VOLCENGINE_TLS_'),
      );
      if (existingLogResources.length > 0) {
        await client.apigw.updateGatewayLog(serviceInstance.gatewayId as string, {
          enable: false,
          projectId: '',
          topicId: '',
        });
        await deleteTlsLogResources(context, client, existingLogResources);
        // Release the shared project when this was its last topic; keep the
        // stage slot when other topics still reference it.
        const shared = getSharedResource(state, context.stage, SHARED_LOG_PROJECT_KEY);
        const releaseResult = await releaseSharedLogProjectIfUnused(context, client, shared);
        if (releaseResult === 'deleted') {
          state = removeSharedResource(state, context.stage, SHARED_LOG_PROJECT_KEY);
        }
      }
    }

    const upstreamByFunction = new Map<string, string>();
    for (const upstream of existingUpstreams) {
      const fnKey = (upstream as { functionId?: string }).functionId
        ? String((upstream as { functionId?: string | null }).functionId)
        : '';
      if (fnKey) upstreamByFunction.set(fnKey, upstream.id);
    }

    for (const trigger of event.triggers) {
      const backendRef = String(trigger.backend);
      const functionId = resolveFunctionIdFromState(state, backendRef);

      let upstreamId = upstreamByFunction.get(functionId);
      if (!upstreamId) {
        const upstreamName = buildUpstreamName(event, backendRef, context.stage);
        const existing = await client.apigw.findUpstreamByName(
          serviceInstance.gatewayId as string,
          upstreamName,
        );
        if (existing?.upstreamId) {
          upstreamId = existing.upstreamId;
        } else {
          const upstreamConfig = triggerToApigwUpstreamConfig(
            event,
            trigger,
            serviceName,
            context.stage,
            serviceInstance.gatewayId as string,
            functionId,
          );
          upstreamId = await client.apigw.createUpstream(upstreamConfig);
        }
        upstreamByFunction.set(functionId, upstreamId);
      }

      const routeConfig = triggerToApigwRouteConfig(event, trigger, serviceId, upstreamId);
      // Routes are not idempotent on the provider: CreateRoute with an
      // existing Name fails with DuplicatedResource.Route. Mirror the upstream
      // adopt-or-create pattern — reuse a same-named remote route when present
      // so re-running a deploy (or resuming after a partial failure) converges.
      const existing = await client.apigw.findRouteByName(serviceId, routeConfig.routeName);
      const routeId = existing?.routeId ?? (await client.apigw.createRoute(routeConfig));
      neededRouteIds.add(routeId);
      const routeInfo: ApigwRouteInfo = existing ?? {
        routeId,
        routeName: routeConfig.routeName,
        serviceId,
        method: routeConfig.method,
        path: routeConfig.path,
        upstreamIds: [routeConfig.upstreamId],
      };
      instances.push(
        buildRouteInstance(routeId, routeConfig.routeName, serviceId, context.stage, routeInfo),
      );
    }

    // Remove routes no longer in the desired set.
    for (const existingRoute of existingRoutes) {
      if (!neededRouteIds.has(existingRoute.id)) {
        await client.apigw.deleteRoute(existingRoute.id);
      }
    }
  } catch (error) {
    throw new PartialResourceError(
      state,
      error instanceof Error ? error : new Error(String(error)),
    );
  }

  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition: buildEventResourceDefinition(event, resolveTlsTopicNameFromInstances(instances)),
    instances,
    lastUpdated: new Date().toISOString(),
  };

  return setResource(state, `events.${event.key}`, resourceState);
};

export const deleteApigwResource = async (
  context: Context,
  logicalId: string,
  state: StateFile,
): Promise<StateFile> => {
  const existingState = getResource(state, logicalId);
  if (!existingState) {
    return state;
  }
  const client = createVolcengineClient(context);

  const serviceInstance = existingState.instances.find(
    (i) => i.type === 'VOLCENGINE_APIGW_SERVICE',
  );

  const tlsInstances = existingState.instances.filter((i) =>
    (i.type as string).startsWith('VOLCENGINE_TLS_'),
  );
  if (tlsInstances.length > 0 && serviceInstance?.gatewayId) {
    try {
      await client.apigw.updateGatewayLog(serviceInstance.gatewayId as string, {
        enable: false,
        projectId: '',
        topicId: '',
      });
    } catch (error) {
      logger.warn(
        lang.__('APIGW_LOG_DISABLE_FAILED', {
          gatewayId: String(serviceInstance.gatewayId),
          error: String(error),
        }),
      );
    }

    for (const instance of [...tlsInstances].reverse()) {
      try {
        if (instance.type === 'VOLCENGINE_TLS_INDEX') {
          const [projectName, topicName] = instance.id.split('/');
          logger.info(lang.__('DELETING_TLS_INDEX', { id: instance.id }));
          await client.tls.deleteIndex(projectName, topicName);
        } else if (instance.type === 'VOLCENGINE_TLS_TOPIC') {
          const [projectName, topicName] = instance.id.split('/');
          logger.info(lang.__('DELETING_TLS_TOPIC', { id: instance.id }));
          await client.tls.deleteTopic(projectName, topicName);
        }
      } catch (error) {
        logger.warn(
          lang.__('FAILED_TO_DELETE_RESOURCE', {
            type: String(instance.type),
            id: instance.id,
            error: String(error),
          }),
        );
      }
    }

    // Legacy per-resource own-projects (pre-#214 scheme) are deleted after
    // their children; the stage-shared project is destroyer-owned and never
    // deleted at resource level.
    const sharedProjectName = buildSharedProjectName(context.app, context.stage);
    const legacyProject = tlsInstances.find(
      (i) => i.type === 'VOLCENGINE_TLS_PROJECT' && i.id !== sharedProjectName,
    );
    if (legacyProject) {
      try {
        logger.info(lang.__('DELETING_TLS_PROJECT', { id: legacyProject.id }));
        await client.tls.deleteProject(legacyProject.id);
      } catch (error) {
        logger.warn(
          lang.__('FAILED_TO_DELETE_RESOURCE', {
            type: String(legacyProject.type),
            id: legacyProject.id,
            error: String(error),
          }),
        );
      }
    }
  }

  if (serviceInstance) {
    const routes = existingState.instances.filter((i) => i.type === 'VOLCENGINE_APIGW_ROUTE');
    for (const route of routes) {
      try {
        await client.apigw.deleteRoute(route.id);
      } catch (error) {
        const err = error as { code?: string };
        if (err.code !== 'NotFound' && err.code !== 'RouteNotFound') throw error;
      }
    }

    const upstreams = existingState.instances.filter((i) => i.type === 'VOLCENGINE_APIGW_UPSTREAM');
    for (const upstream of upstreams) {
      try {
        await client.apigw.deleteUpstream(upstream.id);
      } catch (error) {
        const err = error as { code?: string };
        if (err.code !== 'NotFound' && err.code !== 'UpstreamNotFound') throw error;
      }
    }

    try {
      await client.apigw.deleteService(serviceInstance.id);
    } catch (error) {
      const err = error as { code?: string };
      if (err.code !== 'NotFound' && err.code !== 'ServiceNotFound') throw error;
    }
  }

  const domainInstance = existingState.instances.find((i) => i.type === 'VOLCENGINE_APIGW_DOMAIN');
  if (domainInstance?.id) {
    try {
      await client.apigw.deleteCustomDomain(domainInstance.id);
    } catch (error) {
      const err = error as { code?: string };
      if (err.code !== 'NotFound' && err.code !== 'DomainNotFound') throw error;
    }
  }

  // The serverless gateway is account-scoped (one per region) — leave it in place.
  return removeResource(state, logicalId);
};
