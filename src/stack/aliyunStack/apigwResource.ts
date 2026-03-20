import { Context, EventDomain, ResourceInstance, ResourceState, StateFile } from '../../types';
import { createAliyunClient, ApigwCustomDomainConfig } from '../../common/aliyunClient';
import {
  ApigwGroupInfo,
  ApigwApiInfo,
  eventToApigwGroupConfig,
  triggerToApigwApiConfig,
  extractApigwGroupDefinition,
  generateApiKey,
  inferProtocolConfig,
} from './apigwTypes';
import { setResource, removeResource, getResource } from '../../common/stateManager';
import { buildSid } from '../../common';
import { readPemContent, warnInlinePem } from '../../common/certUtils';
import { logger } from '../../common/logger';
import { lang } from '../../lang';

const buildApigwGroupInstanceFromProvider = (
  info: ApigwGroupInfo,
  stage: string,
): ResourceInstance => {
  return {
    type: 'ALIYUN_APIGW_GROUP',
    sid: buildSid('aliyun', 'apigateway', stage, info.groupId ?? ''),
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
  stage: string,
  groupId: string,
): ResourceInstance => {
  return {
    type: 'ALIYUN_APIGW_API',
    sid: buildSid('aliyun', 'apigateway', stage, `${groupId}/${info.apiId}`),
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
  stage: string,
): ResourceInstance => {
  return {
    type: 'ALIYUN_APIGW_DEPLOYMENT',
    sid: buildSid('aliyun', 'apigateway', stage, `${groupId}/${apiId}/${stageName}`),
    id: `${groupId}/${apiId}/${stageName}`,
    groupId,
    apiId,
    stageName,
  };
};

const resolveDomainCertificate = async (
  domain: NonNullable<EventDomain['domain']>,
  serviceName: string,
  eventKey: string,
  stage: string,
  client: ReturnType<typeof createAliyunClient>,
): Promise<{
  certificateName?: string;
  certificateBody?: string;
  certificatePrivateKey?: string;
}> => {
  if (domain.certificate_id) {
    const certId = domain.certificate_id as string;
    const detail = await client.cas.getCertificate(certId);
    if (!detail || !detail.cert || !detail.key) {
      throw new Error(lang.__('CERT_REFERENCE_NOT_FOUND', { reference: certId }));
    }
    return {
      certificateName: `${serviceName}-${stage}-apigw-${eventKey}`,
      certificateBody: detail.cert,
      certificatePrivateKey: detail.key,
    };
  }

  if (domain.certificate_body && domain.certificate_private_key) {
    const body = readPemContent(domain.certificate_body as string);
    const key = readPemContent(domain.certificate_private_key as string);
    warnInlinePem(domain.certificate_private_key as string);
    return {
      certificateName: `${serviceName}-${stage}-apigw-${eventKey}`,
      certificateBody: body,
      certificatePrivateKey: key,
    };
  }

  return {};
};

const buildDomainBindingConfig = async (
  domain: NonNullable<EventDomain['domain']>,
  groupId: string,
  serviceName: string,
  eventKey: string,
  stage: string,
  client: ReturnType<typeof createAliyunClient>,
): Promise<ApigwCustomDomainConfig> => {
  const certConfig = await resolveDomainCertificate(domain, serviceName, eventKey, stage, client);
  const protocolConfig = inferProtocolConfig(domain.protocol as string | string[] | undefined);

  return {
    groupId,
    domainName: domain.domain_name as string,
    isHttpRedirectToHttps: protocolConfig.isHttpRedirectToHttps,
    ...certConfig,
  };
};

export const createApigwResource = async (
  context: Context,
  event: EventDomain,
  serviceName: string,
  roleArn: string | undefined,
  state: StateFile,
): Promise<StateFile> => {
  const logicalId = `events.${event.key}`;
  const client = createAliyunClient(context);

  const groupConfig = eventToApigwGroupConfig(event, serviceName, context.stage);
  let groupId: string;

  try {
    const existingGroup = await client.apigw.findApiGroupByName(groupConfig.groupName);
    if (existingGroup?.groupId) {
      logger.info(lang.__('APIGW_GROUP_FOUND_REUSING', { groupName: groupConfig.groupName }));
      groupId = existingGroup.groupId;
    } else {
      groupId = await client.apigw.createApiGroup(groupConfig);
    }
  } catch (error) {
    logger.debug(`Could not find existing group, creating new: ${error}`);
    groupId = await client.apigw.createApiGroup(groupConfig);
  }

  // Get group info for state
  const groupInfo = await client.apigw.getApiGroup(groupId);
  if (!groupInfo) {
    throw new Error(`Failed to get API group info after creation: ${groupId}`);
  }

  const instances: Array<ResourceInstance> = [
    buildApigwGroupInstanceFromProvider(groupInfo, context.stage),
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
      domain: event.domain
        ? {
            domainName: event.domain.domain_name,
            hasCertificate: !!(event.domain.certificate_body || event.domain.certificate_id),
          }
        : null,
    },
    instances,
    lastUpdated: new Date().toISOString(),
  };

  state = setResource(state, logicalId, partialResourceState);

  // Create APIs and deployments for each trigger
  for (const trigger of event.triggers) {
    const apiConfig = triggerToApigwApiConfig(
      event,
      trigger,
      groupId,
      serviceName,
      context.region,
      context.stage,
      roleArn,
    );

    const apiId = await client.apigw.createApi(apiConfig);

    // Get API info for state
    const apiInfo = await client.apigw.getApi(groupId, apiId);
    if (apiInfo) {
      instances.push(buildApigwApiInstanceFromProvider(apiInfo, context.stage, groupId));
    }

    // Deploy API to RELEASE stage
    const deploymentConfig = {
      groupId,
      apiId,
      stageName: 'RELEASE' as const,
      description: `${serviceName} API deployment for ${trigger.method} ${trigger.path}`,
    };

    await client.apigw.deployApi(deploymentConfig);
    instances.push(buildApigwDeploymentInstance(groupId, apiId, 'RELEASE', context.stage));

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
        domain: event.domain
          ? {
              domainName: event.domain.domain_name,
              hasCertificate: !!(event.domain.certificate_body || event.domain.certificate_id),
            }
          : null,
      },
      instances,
      lastUpdated: new Date().toISOString(),
    };
    state = setResource(state, logicalId, updatedResourceState);
  }

  if (event.domain) {
    try {
      const domainConfig = await buildDomainBindingConfig(
        event.domain,
        groupId,
        serviceName,
        event.key,
        context.stage,
        client,
      );
      state = await client.apigw.bindCustomDomain(domainConfig, state, logicalId);
    } catch (error) {
      logger.error(lang.__('APIGW_DOMAIN_BINDING_FAILED', { error: String(error) }));
      logger.info(lang.__('APIGW_GROUP_APIS_CREATED_DOMAIN_FAILED'));
      logger.info(lang.__('APIGW_STATE_SAVED_RETRY'));
      return state;
    }
  }

  // Update final state with all instances (group + APIs + deployments)
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
      domain: event.domain
        ? {
            domainName: event.domain.domain_name,
            hasCertificate: !!(event.domain.certificate_body || event.domain.certificate_id),
          }
        : null,
    },
    instances,
    lastUpdated: new Date().toISOString(),
  };

  return setResource(state, logicalId, finalResourceState);
};

export const readApigwResource = async (context: Context, groupId: string) => {
  const client = createAliyunClient(context);
  return await client.apigw.getApiGroup(groupId);
};

export const readApigwResourceByName = async (context: Context, groupName: string) => {
  const client = createAliyunClient(context);
  return await client.apigw.findApiGroupByName(groupName);
};

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
    return createApigwResource(context, event, serviceName, roleArn, state);
  }

  const existingInstances = existingState.instances;

  const groupInstance = existingInstances.find((i) => i.type === 'ALIYUN_APIGW_GROUP');
  if (!groupInstance) {
    return createApigwResource(context, event, serviceName, roleArn, state);
  }

  const groupId = groupInstance.id;

  const groupConfig = eventToApigwGroupConfig(event, serviceName, context.stage);
  await client.apigw.updateApiGroup(groupId, groupConfig);

  const groupInfo = await client.apigw.getApiGroup(groupId);
  if (!groupInfo) {
    throw new Error(`Failed to get API group info after update: ${groupId}`);
  }

  const instances: Array<ResourceInstance> = [
    buildApigwGroupInstanceFromProvider(groupInfo, context.stage),
  ];

  const existingApis = existingInstances.filter((i) => i.type === 'ALIYUN_APIGW_API');

  const neededApiKeys = new Set<string>();

  for (const trigger of event.triggers) {
    const apiConfig = triggerToApigwApiConfig(
      event,
      trigger,
      groupId,
      serviceName,
      context.region,
      context.stage,
      roleArn,
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

    const apiInfo = await client.apigw.getApi(groupId, apiId);
    if (apiInfo) {
      instances.push(buildApigwApiInstanceFromProvider(apiInfo, context.stage, groupId));
    }

    const deploymentConfig = {
      groupId,
      apiId,
      stageName: 'RELEASE' as const,
      description: `${serviceName} API deployment for ${trigger.method} ${trigger.path}`,
    };

    await client.apigw.deployApi(deploymentConfig);
    instances.push(buildApigwDeploymentInstance(groupId, apiId, 'RELEASE', context.stage));
  }

  for (const existingApi of existingApis) {
    const apiInfo = await client.apigw.getApi(groupId, existingApi.id);
    if (apiInfo) {
      const isNeeded = event.triggers.some((t) => {
        const expectedName = triggerToApigwApiConfig(
          event,
          t,
          groupId,
          serviceName,
          context.region,
          context.stage,
          roleArn,
        ).apiName;
        return apiInfo.apiName === expectedName;
      });

      if (!isNeeded) {
        try {
          await client.apigw.abolishApi(groupId, existingApi.id, 'RELEASE');
        } catch {
          // API might not be deployed
        }
        await client.apigw.deleteApi(groupId, existingApi.id);
      }
    }
  }

  if (event.domain) {
    const domainConfig = await buildDomainBindingConfig(
      event.domain,
      groupId,
      serviceName,
      event.key,
      context.stage,
      client,
    );
    state = await client.apigw.bindCustomDomain(domainConfig, state, logicalId);
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
            hasCertificate: !!(event.domain.certificate_body || event.domain.certificate_id),
          }
        : null,
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
  const client = createAliyunClient(context);

  if (!existingState) {
    return state;
  }

  const existingInstances = existingState.instances;

  const groupInstance = existingInstances.find((i) => i.type === 'ALIYUN_APIGW_GROUP');
  if (!groupInstance) {
    // Still clean up DNS resources even if group instance is missing
    state = await cleanupDnsRecords(context, logicalId, state);
    return removeResource(state, logicalId);
  }

  const groupId = groupInstance.id;

  state = await cleanupDnsRecords(context, logicalId, state);

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

  const apis = existingInstances.filter((i) => i.type === 'ALIYUN_APIGW_API');
  for (const api of apis) {
    try {
      await client.apigw.deleteApi(groupId, api.id);
    } catch {
      // API might already be deleted
    }
  }

  try {
    await client.apigw.deleteApiGroup(groupId);
  } catch {
    // Group might already be deleted
  }

  return removeResource(state, logicalId);
};

/**
 * Clean up DNS verification records for an API Gateway event
 */
const cleanupDnsRecords = async (
  context: Context,
  eventLogicalId: string,
  state: StateFile,
): Promise<StateFile> => {
  const client = createAliyunClient(context);
  const dnsResourceIds = [
    `${eventLogicalId}.dns_verification`,
    `${eventLogicalId}.dns_txt_verification`,
  ];

  for (const dnsResourceId of dnsResourceIds) {
    const dnsState = getResource(state, dnsResourceId);
    if (!dnsState) {
      continue;
    }

    const dnsInstance = dnsState.instances[0];
    const recordId = dnsInstance?.id as string;

    // Only delete if recordId is not 'existing' (which means we didn't create it)
    if (recordId && recordId !== 'existing') {
      try {
        logger.info(lang.__('DELETING_DNS_RECORD', { recordId }));
        await client.dns.deleteDomainRecord(recordId);
        logger.info(lang.__('DNS_RECORD_DELETED', { recordId }));
      } catch (error) {
        // DNS record might already be deleted or not accessible
        logger.warn(lang.__('FAILED_TO_DELETE_DNS_RECORD', { recordId, error: String(error) }));
      }
    }

    state = removeResource(state, dnsResourceId);
  }

  return state;
};
