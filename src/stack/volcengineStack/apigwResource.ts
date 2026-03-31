import { Context, EventDomain, ResourceInstance, ResourceState, StateFile } from '../../types';
import { createVolcengineClient } from '../../common/volcengineClient';
import type {
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

  const groupConfig = eventToApigwGroupConfig(event, serviceName, context.stage);
  let gatewayId: string;

  try {
    const existingGateway = await client.apigw.findGatewayByName(groupConfig.groupName);
    if (existingGateway?.gatewayId) {
      logger.info(lang.__('APIGW_GROUP_FOUND_REUSING', { groupName: groupConfig.groupName }));
      gatewayId = existingGateway.gatewayId;
    } else {
      const gatewayInfo = await client.apigw.createGateway(groupConfig);
      gatewayId = gatewayInfo.gatewayId!;
    }
  } catch (error) {
    logger.debug(`Could not find existing gateway, creating new: ${error}`);
    const gatewayInfo = await client.apigw.createGateway(groupConfig);
    gatewayId = gatewayInfo.gatewayId!;
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
    lastUpdated: new Date().toISOString(),
  };

  state = setResource(state, logicalId, partialResourceState);

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

    const updatedResourceState: ResourceState = {
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
    state = setResource(state, logicalId, updatedResourceState);
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
      return state;
    }
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
    lastUpdated: new Date().toISOString(),
  };

  return setResource(state, logicalId, finalResourceState);
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
      | Record<string, unknown>
      | null
      | undefined;
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
    | Record<string, unknown>
    | null
    | undefined;
  if (existingDomain?.domainName) {
    const primaryDomain = existingDomain.domainName as string;
    try {
      await client.apigw.unbindDomain(gatewayId, primaryDomain);
    } catch (error) {
      logger.warn(
        lang.__('APIGW_DOMAIN_UNBIND_FAILED', { domain: primaryDomain, error: String(error) }),
      );
    }
  }

  const apis = existingInstances.filter((i) => i.type === 'VOLCENGINE_APIGW_API');
  for (const api of apis) {
    try {
      await client.apigw.deleteApi(gatewayId, api.id);
    } catch {
      // API might already be deleted
    }
  }

  try {
    await client.apigw.deleteGateway(gatewayId);
  } catch {
    // Gateway might already be deleted
  }

  return removeResource(state, logicalId);
};
