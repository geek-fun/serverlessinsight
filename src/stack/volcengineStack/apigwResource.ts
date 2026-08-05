import {
  Context,
  EventDomain,
  ResourceInstance,
  ResourceState,
  StateFile,
  PartialResourceError,
} from '../../types';
import { createVolcengineClient } from '../../common/volcengineClient';
import type {
  ApigwGroupConfig,
  ApigwGroupInfo,
  ApigwApiInfo,
  ApigwDomainConfig,
} from '../../common/volcengineClient/types';
import {
  eventToApigwGroupConfig,
  triggerToApigwApiConfig,
  extractApigwGroupDefinition,
  extractEventDomainDefinition,
  generateApiKey,
} from './apigwTypes';
import { setResource, removeResource, getResource } from '../../common/stateManager';
import { buildSid } from '../../common';
import { logger } from '../../common/logger';
import { lang } from '../../lang';
import { OWNERSHIP_TAG_KEY, buildOwnershipTagValue, isOwnedByStack } from '../ownershipTag';
import { isResourceAlreadyExistsError } from '../alreadyExists';

const buildApigwGroupInstanceFromProvider = (
  info: ApigwGroupInfo,
  stage: string,
): ResourceInstance => {
  return {
    type: 'VOLCENGINE_APIGW_GROUP',
    sid: buildSid('volcengine', 'apigw', stage, info.gatewayId ?? ''),
    id: info.gatewayId ?? '',
    gatewayId: info.gatewayId ?? null,
    gatewayName: info.gatewayName ?? null,
    description: info.description ?? null,
    protocol: info.protocol ?? null,
    status: info.status ?? null,
    createdTime: info.createdTime ?? null,
    subDomain: info.subDomain ?? null,
  };
};

const buildApigwApiInstanceFromProvider = (
  info: ApigwApiInfo,
  stage: string,
  gatewayId: string,
): ResourceInstance => {
  return {
    type: 'VOLCENGINE_APIGW_API',
    sid: buildSid('volcengine', 'apigw', stage, `${gatewayId}/${info.apiId}`),
    id: info.apiId ?? '',
    apiId: info.apiId ?? null,
    apiName: info.apiName ?? null,
    gatewayId: info.gatewayId ?? null,
    method: info.method ?? null,
    path: info.path ?? null,
    description: info.description ?? null,
    backendType: info.backendType ?? null,
    backendFunctionName: info.backendFunctionName ?? null,
    status: info.status ?? null,
    createdTime: info.createdTime ?? null,
  };
};

const buildApigwDeploymentInstance = (
  gatewayId: string,
  apiId: string,
  stageName: string,
  stage: string,
): ResourceInstance => {
  return {
    type: 'VOLCENGINE_APIGW_DEPLOYMENT',
    sid: buildSid('volcengine', 'apigw', stage, `${gatewayId}/${apiId}/${stageName}`),
    id: `${gatewayId}/${apiId}/${stageName}`,
    gatewayId,
    apiId,
    stageName,
  };
};

export const createApigwResource = async (
  context: Context,
  event: EventDomain,
  serviceName: string,
  state: StateFile,
): Promise<StateFile> => {
  const logicalId = `events.${event.key}`;
  const client = createVolcengineClient(context);

  const groupConfig: ApigwGroupConfig = {
    ...eventToApigwGroupConfig(event, serviceName, context.stage),
    Tags: [{ Key: OWNERSHIP_TAG_KEY, Value: buildOwnershipTagValue(context, logicalId) }],
  };
  let gatewayId: string;

  // Probe the provider BEFORE creating so an unrelated same-named gateway is
  // never taken over: reuse only when it carries our ownership tag, refuse
  // otherwise. A probe error must propagate — it is not proof the gateway is
  // absent, so falling back to a blind create could silently adopt another
  // project's resource.
  const existingGateway = await client.apigw.findGatewayByName(groupConfig.groupName);
  if (existingGateway?.gatewayId) {
    if (isOwnedByStack(context, logicalId, existingGateway.tags)) {
      logger.info(lang.__('APIGW_GROUP_FOUND_REUSING', { groupName: groupConfig.groupName }));
      gatewayId = existingGateway.gatewayId;
    } else {
      throw new PartialResourceError(
        state,
        new Error(
          `API Gateway group ${groupConfig.groupName} already exists in provider but is not owned by this stack (missing ${OWNERSHIP_TAG_KEY} tag). Refusing to adopt — resolve manually.`,
        ),
      );
    }
  } else {
    // Not found — create. A collision (gateway appeared between probe and
    // create) re-probes and adopts only if the gateway carries our tag.
    try {
      const gatewayInfo = await client.apigw.createGateway(groupConfig);
      gatewayId = gatewayInfo.gatewayId!;
    } catch (error) {
      if (isResourceAlreadyExistsError(error)) {
        const probe = await client.apigw.findGatewayByName(groupConfig.groupName);
        if (probe?.gatewayId && isOwnedByStack(context, logicalId, probe.tags)) {
          logger.info(
            `API Gateway group ${groupConfig.groupName} exists and carries ownership tag (${OWNERSHIP_TAG_KEY}), adopting idempotently`,
          );
          gatewayId = probe.gatewayId;
        } else {
          throw new PartialResourceError(
            state,
            new Error(
              `API Gateway group ${groupConfig.groupName} already exists in provider but is not owned by this stack (missing ${OWNERSHIP_TAG_KEY} tag). Refusing to adopt — resolve manually.`,
            ),
          );
        }
      } else {
        throw error;
      }
    }
  }

  const gatewayInfo = await client.apigw.getGateway(gatewayId);
  if (!gatewayInfo) {
    throw new Error(`Failed to get API Gateway info after creation: ${gatewayId}`);
  }

  const instances: Array<ResourceInstance> = [
    buildApigwGroupInstanceFromProvider(gatewayInfo, context.stage),
  ];

  const groupDefinition = extractApigwGroupDefinition(groupConfig);
  const partialResourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition: {
      ...groupDefinition,
      triggers: event.triggers.map((t) => ({
        method: t.method,
        path: t.path,
        backend: t.backend,
      })),
      domain: extractEventDomainDefinition(event.domain),
    },
    instances,
    status: 'tainted',
    lastUpdated: new Date().toISOString(),
  };

  const stateAfterDependents = setResource(state, logicalId, partialResourceState);

  try {
    for (const trigger of event.triggers) {
      const apiConfig = triggerToApigwApiConfig(
        event,
        trigger,
        gatewayId,
        serviceName,
        context.region,
        context.stage,
      );

      const apiId = await client.apigw.createApi(apiConfig);

      const apiInfo = await client.apigw.getApi(gatewayId, apiId);
      if (apiInfo) {
        instances.push(buildApigwApiInstanceFromProvider(apiInfo, context.stage, gatewayId));
      }

      await client.apigw.deployApi(gatewayId, apiId);
      instances.push(buildApigwDeploymentInstance(gatewayId, apiId, 'RELEASE', context.stage));
    }

    if (event.domain) {
      try {
        const domainConfig: ApigwDomainConfig = {
          gatewayId,
          domainName: event.domain.domain_name as string,
          certificateId: event.domain.certificate_id as string | undefined,
        };
        await client.apigw.bindDomain(domainConfig);
      } catch (error) {
        logger.error(lang.__('APIGW_DOMAIN_BINDING_FAILED', { error: String(error) }));
        logger.info(lang.__('APIGW_GROUP_APIS_CREATED_DOMAIN_FAILED'));
        logger.info(lang.__('APIGW_STATE_SAVED_RETRY'));
        throw new PartialResourceError(
          stateAfterDependents,
          error instanceof Error ? error : new Error(String(error)),
        );
      }
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
    definition: {
      ...groupDefinition,
      triggers: event.triggers.map((t) => ({
        method: t.method,
        path: t.path,
        backend: t.backend,
      })),
      domain: extractEventDomainDefinition(event.domain),
    },
    instances,
    status: 'ready',
    lastUpdated: new Date().toISOString(),
  };

  return setResource(stateAfterDependents, logicalId, finalResourceState);
};

export const readApigwResource = async (context: Context, gatewayId: string) => {
  const client = createVolcengineClient(context);
  return await client.apigw.getGateway(gatewayId);
};

export const readApigwResourceByName = async (context: Context, gatewayName: string) => {
  const client = createVolcengineClient(context);
  return await client.apigw.findGatewayByName(gatewayName);
};

export const updateApigwResource = async (
  context: Context,
  event: EventDomain,
  serviceName: string,
  state: StateFile,
): Promise<StateFile> => {
  const logicalId = `events.${event.key}`;
  const existingState = getResource(state, logicalId);
  const client = createVolcengineClient(context);

  if (!existingState) {
    return createApigwResource(context, event, serviceName, state);
  }

  const existingInstances = existingState.instances;

  const groupInstance = existingInstances.find((i) => i.type === 'VOLCENGINE_APIGW_GROUP');
  if (!groupInstance) {
    return createApigwResource(context, event, serviceName, state);
  }

  const gatewayId = groupInstance.id;

  const groupConfig = eventToApigwGroupConfig(event, serviceName, context.stage);
  await client.apigw.updateGateway(gatewayId, groupConfig);

  const gatewayInfo = await client.apigw.getGateway(gatewayId);
  if (!gatewayInfo) {
    throw new Error(`Failed to get API Gateway info after update: ${gatewayId}`);
  }

  const instances: Array<ResourceInstance> = [
    buildApigwGroupInstanceFromProvider(gatewayInfo, context.stage),
  ];

  const existingApis = existingInstances.filter((i) => i.type === 'VOLCENGINE_APIGW_API');

  const neededApiKeys = new Set<string>();

  for (const trigger of event.triggers) {
    const apiConfig = triggerToApigwApiConfig(
      event,
      trigger,
      gatewayId,
      serviceName,
      context.region,
      context.stage,
    );

    const apiKey = generateApiKey(trigger.method as string, trigger.path as string);
    neededApiKeys.add(apiKey);

    const existingApi = existingApis.find((a) => {
      return a.id && a.apiName === apiConfig.apiName;
    });

    let apiId: string;

    if (existingApi) {
      apiId = existingApi.id;
      await client.apigw.updateApi(apiId, apiConfig);
    } else {
      apiId = await client.apigw.createApi(apiConfig);
    }

    const apiInfo = await client.apigw.getApi(gatewayId, apiId);
    if (apiInfo) {
      instances.push(buildApigwApiInstanceFromProvider(apiInfo, context.stage, gatewayId));
    }

    await client.apigw.deployApi(gatewayId, apiId);
    instances.push(buildApigwDeploymentInstance(gatewayId, apiId, 'RELEASE', context.stage));
  }

  for (const existingApi of existingApis) {
    const apiInfo = await client.apigw.getApi(gatewayId, existingApi.id);
    if (apiInfo) {
      const isNeeded = event.triggers.some((t) => {
        const expectedName = triggerToApigwApiConfig(
          event,
          t,
          gatewayId,
          serviceName,
          context.region,
          context.stage,
        ).apiName;
        return apiInfo.apiName === expectedName;
      });

      if (!isNeeded) {
        await client.apigw.deleteApi(gatewayId, existingApi.id);
      }
    }
  }

  if (event.domain) {
    const domainConfig: ApigwDomainConfig = {
      gatewayId,
      domainName: event.domain.domain_name as string,
      certificateId: event.domain.certificate_id as string | undefined,
    };
    await client.apigw.bindDomain(domainConfig);
  } else {
    const existingDomain = existingState.definition?.domain as
      Record<string, unknown> | null | undefined;
    if (existingDomain?.domainName) {
      const previousDomain = existingDomain.domainName as string;
      try {
        await client.apigw.unbindDomain(gatewayId, previousDomain);
      } catch (error) {
        logger.warn(
          lang.__('APIGW_DOMAIN_UNBIND_FAILED', { domain: previousDomain, error: String(error) }),
        );
      }
    }
  }

  const groupDefinition = extractApigwGroupDefinition(groupConfig);
  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition: {
      ...groupDefinition,
      triggers: event.triggers.map((t) => ({
        method: t.method,
        path: t.path,
        backend: t.backend,
      })),
      domain: extractEventDomainDefinition(event.domain),
    },
    instances,
    lastUpdated: new Date().toISOString(),
  };

  return setResource(state, logicalId, resourceState);
};

export const deleteApigwResource = async (
  context: Context,
  logicalId: string,
  state: StateFile,
): Promise<StateFile> => {
  const existingState = getResource(state, logicalId);
  const client = createVolcengineClient(context);

  if (!existingState) {
    return state;
  }

  const existingInstances = existingState.instances;

  const groupInstance = existingInstances.find((i) => i.type === 'VOLCENGINE_APIGW_GROUP');
  if (!groupInstance) {
    return removeResource(state, logicalId);
  }

  const gatewayId = groupInstance.id;

  const existingDomain = existingState.definition?.domain as
    Record<string, unknown> | null | undefined;
  if (existingDomain?.domainName) {
    const primaryDomain = existingDomain.domainName as string;
    await client.apigw.unbindDomain(gatewayId, primaryDomain);
  }

  const apis = existingInstances.filter((i) => i.type === 'VOLCENGINE_APIGW_API');
  for (const api of apis) {
    await client.apigw.deleteApi(gatewayId, api.id);
  }

  await client.apigw.deleteGateway(gatewayId);

  return removeResource(state, logicalId);
};
