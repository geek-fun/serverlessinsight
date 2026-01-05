import { Context, EventDomain, ResourceInstance, ResourceState, StateFile } from '../../types';
import { createAliyunClient } from '../../common/aliyunClient';
import {
  ApigwGroupInfo,
  ApigwApiInfo,
  eventToApigwGroupConfig,
  triggerToApigwApiConfig,
  extractApigwGroupDefinition,
  generateApiKey,
} from './apigwTypes';
import { setResource, removeResource, getResource } from '../../common/stateManager';

const buildApigwGroupInstanceFromProvider = (
  info: ApigwGroupInfo,
  region: string,
): ResourceInstance => {
  return {
    type: 'ALIYUN_APIGW_GROUP',
    arn: `arn:acs:apigateway:${region}:group/${info.groupId}`,
    id: info.groupId ?? '',
    groupId: info.groupId ?? null,
    groupName: info.groupName ?? null,
    description: info.description ?? null,
    basePath: info.basePath ?? null,
    subDomain: info.subDomain ?? null,
    instanceId: info.instanceId ?? null,
    instanceType: info.instanceType ?? null,
    status: info.status ?? null,
    createdTime: info.createdTime ?? null,
    modifiedTime: info.modifiedTime ?? null,
    billingStatus: info.billingStatus ?? null,
    illegalStatus: info.illegalStatus ?? null,
    trafficLimit: info.trafficLimit ?? null,
  };
};

const buildApigwApiInstanceFromProvider = (
  info: ApigwApiInfo,
  region: string,
  groupId: string,
): ResourceInstance => {
  return {
    type: 'ALIYUN_APIGW_API',
    arn: `arn:acs:apigateway:${region}:group/${groupId}/api/${info.apiId}`,
    id: info.apiId ?? '',
    apiId: info.apiId ?? null,
    apiName: info.apiName ?? null,
    groupId: info.groupId ?? null,
    groupName: info.groupName ?? null,
    description: info.description ?? null,
    visibility: info.visibility ?? null,
    authType: info.authType ?? null,
    requestConfig: info.requestConfig ?? null,
    serviceConfig: info.serviceConfig ?? null,
    resultType: info.resultType ?? null,
    createdTime: info.createdTime ?? null,
    modifiedTime: info.modifiedTime ?? null,
  };
};

const buildApigwDeploymentInstance = (
  groupId: string,
  apiId: string,
  stageName: string,
  region: string,
): ResourceInstance => {
  return {
    type: 'ALIYUN_APIGW_DEPLOYMENT',
    arn: `arn:acs:apigateway:${region}:group/${groupId}/api/${apiId}/deployment/${stageName}`,
    id: `${groupId}/${apiId}/${stageName}`,
    groupId,
    apiId,
    stageName,
  };
};

/**
 * Create API Gateway resources for an event
 */
export const createApigwResource = async (
  context: Context,
  event: EventDomain,
  serviceName: string,
  roleArn: string | undefined,
  state: StateFile,
): Promise<StateFile> => {
  const logicalId = `events.${event.key}`;
  const client = createAliyunClient(context);

  // Create API group
  const groupConfig = eventToApigwGroupConfig(event, serviceName);
  const groupId = await client.apigw.createApiGroup(groupConfig);

  // Get group info for state
  const groupInfo = await client.apigw.getApiGroup(groupId);
  if (!groupInfo) {
    throw new Error(`Failed to get API group info after creation: ${groupId}`);
  }

  const instances: Array<ResourceInstance> = [
    buildApigwGroupInstanceFromProvider(groupInfo, context.region),
  ];

  // Create APIs and deployments for each trigger
  for (const trigger of event.triggers) {
    const apiConfig = triggerToApigwApiConfig(
      event,
      trigger,
      groupId,
      serviceName,
      context.region,
      roleArn,
    );

    const apiId = await client.apigw.createApi(apiConfig);

    // Get API info for state
    const apiInfo = await client.apigw.getApi(groupId, apiId);
    if (apiInfo) {
      instances.push(buildApigwApiInstanceFromProvider(apiInfo, context.region, groupId));
    }

    // Deploy API to RELEASE stage
    const deploymentConfig = {
      groupId,
      apiId,
      stageName: 'RELEASE' as const,
      description: `${serviceName} API deployment for ${trigger.method} ${trigger.path}`,
    };

    await client.apigw.deployApi(deploymentConfig);
    instances.push(buildApigwDeploymentInstance(groupId, apiId, 'RELEASE', context.region));
  }

  // Handle custom domain if specified
  if (event.domain) {
    await client.apigw.bindCustomDomain({
      groupId,
      domainName: event.domain.domain_name as string,
      certificateName: event.domain.certificate_name as string | undefined,
      certificateBody: event.domain.certificate_body as string | undefined,
      certificatePrivateKey: event.domain.certificate_private_key as string | undefined,
    });
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
      domain: event.domain
        ? {
            domainName: event.domain.domain_name,
            certificateName: event.domain.certificate_name,
          }
        : null,
    },
    instances,
    lastUpdated: new Date().toISOString(),
  };

  return setResource(state, logicalId, resourceState);
};

/**
 * Read API Gateway resource
 */
export const readApigwResource = async (context: Context, groupId: string) => {
  const client = createAliyunClient(context);
  return await client.apigw.getApiGroup(groupId);
};

/**
 * Read API Gateway resource by name
 */
export const readApigwResourceByName = async (context: Context, groupName: string) => {
  const client = createAliyunClient(context);
  return await client.apigw.findApiGroupByName(groupName);
};

/**
 * Update API Gateway resources for an event
 */
export const updateApigwResource = async (
  context: Context,
  event: EventDomain,
  serviceName: string,
  roleArn: string | undefined,
  state: StateFile,
): Promise<StateFile> => {
  const logicalId = `events.${event.key}`;
  const existingState = getResource(state, logicalId);
  const client = createAliyunClient(context);

  if (!existingState) {
    // If no existing state, create new
    return createApigwResource(context, event, serviceName, roleArn, state);
  }

  const existingInstances = existingState.instances;

  // Find existing group
  const groupInstance = existingInstances.find((i) => i.type === 'ALIYUN_APIGW_GROUP');
  if (!groupInstance) {
    // No existing group, create new
    return createApigwResource(context, event, serviceName, roleArn, state);
  }

  const groupId = groupInstance.id;

  // Update group config
  const groupConfig = eventToApigwGroupConfig(event, serviceName);
  await client.apigw.updateApiGroup(groupId, groupConfig);

  // Get updated group info
  const groupInfo = await client.apigw.getApiGroup(groupId);
  if (!groupInfo) {
    throw new Error(`Failed to get API group info after update: ${groupId}`);
  }

  const instances: Array<ResourceInstance> = [
    buildApigwGroupInstanceFromProvider(groupInfo, context.region),
  ];

  // Get existing APIs
  const existingApis = existingInstances.filter((i) => i.type === 'ALIYUN_APIGW_API');

  // Track which APIs we need
  const neededApiKeys = new Set<string>();

  // Update or create APIs for each trigger
  for (const trigger of event.triggers) {
    const apiConfig = triggerToApigwApiConfig(
      event,
      trigger,
      groupId,
      serviceName,
      context.region,
      roleArn,
    );

    const apiKey = generateApiKey(trigger.method as string, trigger.path as string);
    neededApiKeys.add(apiKey);

    // Check if API exists - match by API name
    const existingApi = existingApis.find((a) => {
      return a.id && a.apiName === apiConfig.apiName;
    });

    let apiId: string;

    if (existingApi) {
      // Update existing API
      apiId = existingApi.id;
      await client.apigw.updateApi(apiId, apiConfig);
    } else {
      // Create new API
      apiId = await client.apigw.createApi(apiConfig);
    }

    // Get API info for state
    const apiInfo = await client.apigw.getApi(groupId, apiId);
    if (apiInfo) {
      instances.push(buildApigwApiInstanceFromProvider(apiInfo, context.region, groupId));
    }

    // Deploy API
    const deploymentConfig = {
      groupId,
      apiId,
      stageName: 'RELEASE' as const,
      description: `${serviceName} API deployment for ${trigger.method} ${trigger.path}`,
    };

    await client.apigw.deployApi(deploymentConfig);
    instances.push(buildApigwDeploymentInstance(groupId, apiId, 'RELEASE', context.region));
  }

  // Delete APIs that are no longer needed
  for (const existingApi of existingApis) {
    const apiInfo = await client.apigw.getApi(groupId, existingApi.id);
    if (apiInfo) {
      // Check if this API is still needed
      const isNeeded = event.triggers.some((t) => {
        const expectedName = triggerToApigwApiConfig(
          event,
          t,
          groupId,
          serviceName,
          context.region,
          roleArn,
        ).apiName;
        return apiInfo.apiName === expectedName;
      });

      if (!isNeeded) {
        // Abolish and delete
        try {
          await client.apigw.abolishApi(groupId, existingApi.id, 'RELEASE');
        } catch {
          // API might not be deployed
        }
        await client.apigw.deleteApi(groupId, existingApi.id);
      }
    }
  }

  // Handle custom domain
  if (event.domain) {
    await client.apigw.bindCustomDomain({
      groupId,
      domainName: event.domain.domain_name as string,
      certificateName: event.domain.certificate_name as string | undefined,
      certificateBody: event.domain.certificate_body as string | undefined,
      certificatePrivateKey: event.domain.certificate_private_key as string | undefined,
    });
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
      domain: event.domain
        ? {
            domainName: event.domain.domain_name,
            certificateName: event.domain.certificate_name,
          }
        : null,
    },
    instances,
    lastUpdated: new Date().toISOString(),
  };

  return setResource(state, logicalId, resourceState);
};

/**
 * Delete API Gateway resources
 */
export const deleteApigwResource = async (
  context: Context,
  logicalId: string,
  state: StateFile,
): Promise<StateFile> => {
  const existingState = getResource(state, logicalId);
  const client = createAliyunClient(context);

  if (!existingState) {
    return state;
  }

  const existingInstances = existingState.instances;

  // Find group
  const groupInstance = existingInstances.find((i) => i.type === 'ALIYUN_APIGW_GROUP');
  if (!groupInstance) {
    return removeResource(state, logicalId);
  }

  const groupId = groupInstance.id;

  // Abolish all deployments first
  const deployments = existingInstances.filter((i) => i.type === 'ALIYUN_APIGW_DEPLOYMENT');
  for (const deployment of deployments) {
    try {
      await client.apigw.abolishApi(
        (deployment.groupId as string) || groupId,
        deployment.apiId as string,
        (deployment.stageName as string) || 'RELEASE',
      );
    } catch {
      // Deployment might already be abolished
    }
  }

  // Delete all APIs
  const apis = existingInstances.filter((i) => i.type === 'ALIYUN_APIGW_API');
  for (const api of apis) {
    try {
      await client.apigw.deleteApi(groupId, api.id);
    } catch {
      // API might already be deleted
    }
  }

  // Delete group
  try {
    await client.apigw.deleteApiGroup(groupId);
  } catch {
    // Group might already be deleted
  }

  return removeResource(state, logicalId);
};
