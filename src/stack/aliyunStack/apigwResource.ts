import {
  Context,
  EventDomain,
  ResourceInstance,
  ResourceState,
  ResourceTypeEnum,
  StateFile,
  CdnConfig,
} from '../../types';
import { createAliyunClient, ApigwCustomDomainConfig } from '../../common/aliyunClient';
import {
  ApigwGroupInfo,
  ApigwApiInfo,
  eventToApigwGroupConfig,
  triggerToApigwApiConfig,
  extractApigwGroupDefinition,
  extractEventDomainDefinition,
  generateApiKey,
  inferProtocolConfig,
} from './apigwTypes';
import { setResource, removeResource, getResource } from '../../common/stateManager';
import { buildSid } from '../../common';
import { readPemContent, warnInlinePem } from '../../common/certUtils';
import { logger } from '../../common/logger';
import { lang } from '../../lang';
import { deriveWwwDomain, extractHostRecord, extractMainDomain } from '../../common/domainUtils';

type ApigwCdnInstance = ResourceInstance & {
  type: 'ALIYUN_CDN_DISTRIBUTION';
  domainName: string;
  cname?: string;
  isWwwVariant?: boolean;
};

type ApigwCdnDnsInstance = ResourceInstance & {
  type: 'ALIYUN_CDN_DNS_CNAME';
  domain: string;
  cname: string;
  dnsRecordId?: string;
  isWwwVariant?: boolean;
};

const getCdnConfig = (event: EventDomain): CdnConfig | undefined => {
  const domainCdn = event.domain?.cdn;
  if (domainCdn == null) {
    return undefined;
  }

  if (typeof domainCdn === 'boolean') {
    return domainCdn ? { enabled: true } : undefined;
  }

  if (typeof domainCdn === 'string') {
    return undefined;
  }

  return {
    enabled: domainCdn.enabled == null ? true : String(domainCdn.enabled) === 'true',
    ...(domainCdn.cdn_type != null
      ? { cdn_type: String(domainCdn.cdn_type) as CdnConfig['cdn_type'] }
      : {}),
    ...(domainCdn.scope != null ? { scope: String(domainCdn.scope) as CdnConfig['scope'] } : {}),
    ...(domainCdn.cache_ttl != null ? { cache_ttl: Number(domainCdn.cache_ttl) } : {}),
    ...(domainCdn.ignore_query_string != null
      ? { ignore_query_string: String(domainCdn.ignore_query_string) === 'true' }
      : {}),
    ...(domainCdn.origin_protocol != null
      ? {
          origin_protocol: String(domainCdn.origin_protocol) as CdnConfig['origin_protocol'],
        }
      : {}),
    ...(domainCdn.compression != null
      ? { compression: String(domainCdn.compression) === 'true' }
      : {}),
    ...(domainCdn.force_redirect_https != null
      ? { force_redirect_https: String(domainCdn.force_redirect_https) === 'true' }
      : {}),
  };
};

const getIsCdnEnabled = (event: EventDomain): boolean => {
  return getCdnConfig(event)?.enabled === true;
};

const applyCdnSettings = async (
  client: ReturnType<typeof createAliyunClient>,
  domainName: string,
  event: EventDomain,
): Promise<void> => {
  const cdnConfig = getCdnConfig(event);
  if (!cdnConfig) {
    return;
  }

  if (cdnConfig.cache_ttl != null || cdnConfig.ignore_query_string != null) {
    await client.cdn.applyCacheConfig(
      domainName,
      cdnConfig.cache_ttl,
      cdnConfig.ignore_query_string,
    );
  }

  if (cdnConfig.origin_protocol) {
    await client.cdn.applyProtocolConfig(domainName, cdnConfig.origin_protocol);
  }

  if (cdnConfig.compression != null) {
    await client.cdn.applyCompression(domainName, cdnConfig.compression);
  }

  if (cdnConfig.force_redirect_https != null) {
    await client.cdn.applyHttpsRedirect(domainName, cdnConfig.force_redirect_https);
  }
};

const buildApigwCdnDistributionConfig = (
  event: EventDomain,
  domainName: string,
  originDomain: string,
) => {
  const cdnConfig = getCdnConfig(event);

  return {
    domainName,
    cdnType: cdnConfig?.cdn_type ?? 'web',
    sources: [
      {
        type: 'domain',
        content: originDomain,
        ...(cdnConfig?.origin_protocol === 'https' ? { port: 443 } : {}),
      },
    ],
    scope: cdnConfig?.scope ?? 'global',
  };
};

const createApigwCdnDistribution = async (
  context: Context,
  client: ReturnType<typeof createAliyunClient>,
  event: EventDomain,
  domainName: string,
  originDomain: string,
  instances: Array<ResourceInstance>,
  certificate?: {
    certificateBody?: string;
    certificatePrivateKey?: string;
  },
): Promise<void> => {
  logger.info(
    lang.__('CREATING_CDN_DISTRIBUTION', {
      domain: domainName,
      origin: originDomain,
    }),
  );

  await client.cdn.addCdnDomain(buildApigwCdnDistributionConfig(event, domainName, originDomain));

  await applyCdnSettings(client, domainName, event);

  if (certificate?.certificateBody && certificate.certificatePrivateKey) {
    await client.cdn.setDomainServerCertificate(domainName, {
      serverCertificate: certificate.certificateBody,
      privateKey: certificate.certificatePrivateKey,
      serverCertificateStatus: 'on',
    });
  }

  const cdnDomainInfo = await client.cdn.describeCdnDomainDetail(domainName);
  const cdnCname = cdnDomainInfo?.cname;

  if (!cdnCname) {
    return;
  }

  const mainDomain = extractMainDomain(domainName);
  const hostRecord = extractHostRecord(domainName, mainDomain);
  const dnsRecordId = await client.dns.addDomainRecord({
    domainName: mainDomain,
    rr: hostRecord,
    type: 'CNAME',
    value: cdnCname,
    ttl: 600,
  });

  const isWwwVariant = domainName.startsWith('www.');

  const cdnInstance: ApigwCdnInstance = {
    sid: buildSid('aliyun', 'cdn', context.stage, domainName),
    id: domainName,
    type: ResourceTypeEnum.ALIYUN_CDN_DISTRIBUTION,
    domainName,
    cname: cdnCname,
    ...(isWwwVariant ? { isWwwVariant: true } : {}),
  };
  instances.push(cdnInstance);

  const dnsInstance: ApigwCdnDnsInstance = {
    sid: buildSid('aliyun', 'alidns', context.stage, dnsRecordId || domainName),
    id: dnsRecordId || domainName,
    type: ResourceTypeEnum.ALIYUN_CDN_DNS_CNAME,
    domain: domainName,
    cname: cdnCname,
    dnsRecordId: dnsRecordId || undefined,
    ...(isWwwVariant ? { isWwwVariant: true } : {}),
  };
  instances.push(dnsInstance);
};

const getApigwTrackedDomains = (
  domainName?: string | null,
  wwwBindApex?: boolean,
): Array<string> => {
  if (!domainName) {
    return [];
  }

  return [domainName, ...(wwwBindApex ? [deriveWwwDomain(domainName)] : [])].filter(
    (domain): domain is string => Boolean(domain),
  );
};

const updateApigwCdnDistribution = async (
  context: Context,
  client: ReturnType<typeof createAliyunClient>,
  event: EventDomain,
  domainName: string,
  originDomain: string,
  existingInstances: Array<ResourceInstance>,
  instances: Array<ResourceInstance>,
  certificate?: {
    certificateBody?: string;
    certificatePrivateKey?: string;
  },
): Promise<void> => {
  const trackedInstances = getTrackedApigwCdnInstances(existingInstances, [domainName]);
  const hasTrackedDistribution = trackedInstances.some(
    (instance) => instance.type === ResourceTypeEnum.ALIYUN_CDN_DISTRIBUTION,
  );

  if (!hasTrackedDistribution) {
    await createApigwCdnDistribution(
      context,
      client,
      event,
      domainName,
      originDomain,
      instances,
      certificate,
    );
    return;
  }

  await client.cdn.modifyCdnDomain(
    buildApigwCdnDistributionConfig(event, domainName, originDomain),
  );
  await applyCdnSettings(client, domainName, event);

  if (certificate?.certificateBody && certificate.certificatePrivateKey) {
    await client.cdn.setDomainServerCertificate(domainName, {
      serverCertificate: certificate.certificateBody,
      privateKey: certificate.certificatePrivateKey,
      serverCertificateStatus: 'on',
    });
  }

  const cdnDomainInfo = await client.cdn.describeCdnDomainDetail(domainName);
  const cdnCname = cdnDomainInfo?.cname;

  instances.push(
    ...trackedInstances.map((instance) => ({
      ...instance,
      ...(cdnCname ? { cname: cdnCname } : {}),
    })),
  );
};

const getApigwCdnResourceDomain = (instance: ApigwCdnInstance | ApigwCdnDnsInstance): string => {
  return instance.type === ResourceTypeEnum.ALIYUN_CDN_DISTRIBUTION
    ? instance.domainName
    : instance.domain;
};

const getTrackedApigwCdnInstances = (
  instances: Array<ResourceInstance>,
  domains: Array<string>,
): Array<ApigwCdnInstance | ApigwCdnDnsInstance> => {
  return instances.filter((instance) => {
    if (
      instance.type !== ResourceTypeEnum.ALIYUN_CDN_DISTRIBUTION &&
      instance.type !== ResourceTypeEnum.ALIYUN_CDN_DNS_CNAME
    ) {
      return false;
    }

    return domains.includes(
      getApigwCdnResourceDomain(instance as ApigwCdnInstance | ApigwCdnDnsInstance),
    );
  }) as Array<ApigwCdnInstance | ApigwCdnDnsInstance>;
};

const cleanupApigwCdnResources = async (
  client: ReturnType<typeof createAliyunClient>,
  instances: Array<ResourceInstance>,
  domains?: Array<string>,
): Promise<void> => {
  const matchedInstances =
    domains && domains.length > 0 ? getTrackedApigwCdnInstances(instances, domains) : [];
  const resourcesToCleanup = domains && domains.length > 0 ? matchedInstances : instances;

  const cdnInstances = resourcesToCleanup.filter(
    (instance) => instance.type === ResourceTypeEnum.ALIYUN_CDN_DISTRIBUTION,
  ) as ApigwCdnInstance[];

  for (const cdnInstance of cdnInstances) {
    try {
      await client.cdn.deleteCdnDomain(cdnInstance.domainName);
      logger.info(lang.__('CDN_DOMAIN_DELETED', { domain: cdnInstance.domainName }));
    } catch (error) {
      logger.warn(
        lang.__('CDN_DOMAIN_DELETE_FAILED', {
          domain: cdnInstance.domainName,
          error: String(error),
        }),
      );
    }
  }

  const cdnDnsInstances = resourcesToCleanup.filter(
    (instance) => instance.type === ResourceTypeEnum.ALIYUN_CDN_DNS_CNAME,
  ) as ApigwCdnDnsInstance[];

  for (const dnsInstance of cdnDnsInstances) {
    if (!dnsInstance.dnsRecordId) {
      continue;
    }

    try {
      await client.dns.deleteDomainRecord(dnsInstance.dnsRecordId);
    } catch {
      // Best effort cleanup
    }
  }
};

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
      domain: extractEventDomainDefinition(event.domain),
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
        domain: extractEventDomainDefinition(event.domain),
      },
      instances,
      lastUpdated: new Date().toISOString(),
    };
    state = setResource(state, logicalId, updatedResourceState);
  }

  if (event.domain) {
    try {
      const primaryDomain = event.domain.domain_name as string;
      const wwwBindApex = event.domain.www_bind_apex === true;
      const isCdnEnabled = getIsCdnEnabled(event);
      const originDomain = groupInfo.subDomain;

      if (!originDomain) {
        throw new Error(`API Gateway group ${groupId} has no subDomain for CDN origin`);
      }

      const domainConfig = await buildDomainBindingConfig(
        event.domain,
        groupId,
        serviceName,
        event.key,
        context.stage,
        client,
      );

      if (isCdnEnabled) {
        await createApigwCdnDistribution(
          context,
          client,
          event,
          primaryDomain,
          originDomain,
          instances,
          {
            certificateBody: domainConfig.certificateBody,
            certificatePrivateKey: domainConfig.certificatePrivateKey,
          },
        );
      } else {
        state = await client.apigw.bindCustomDomain(domainConfig, state, logicalId);
      }

      const wwwDomain = wwwBindApex ? deriveWwwDomain(primaryDomain) : null;
      if (wwwDomain) {
        logger.info(lang.__('APIGW_BINDING_DOMAIN', { domain: wwwDomain }));

        const wwwDomainConfig: ApigwCustomDomainConfig = {
          ...domainConfig,
          domainName: wwwDomain,
          certificateName: domainConfig.certificateName
            ? `${domainConfig.certificateName}-www`
            : undefined,
        };

        if (isCdnEnabled) {
          await createApigwCdnDistribution(
            context,
            client,
            event,
            wwwDomain,
            originDomain,
            instances,
            {
              certificateBody: wwwDomainConfig.certificateBody,
              certificatePrivateKey: wwwDomainConfig.certificatePrivateKey,
            },
          );
        } else {
          state = await client.apigw.bindCustomDomain(wwwDomainConfig, state, logicalId);
        }
      }
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
      domain: extractEventDomainDefinition(event.domain),
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
    const primaryDomain = event.domain.domain_name as string;
    const wwwBindApex = event.domain.www_bind_apex === true;
    const wwwDomain = wwwBindApex ? deriveWwwDomain(primaryDomain) : null;
    const isCdnEnabled = getIsCdnEnabled(event);
    const existingDomain = existingState.definition?.domain as
      Record<string, unknown> | null | undefined;
    const previousWwwBindApex = existingDomain?.wwwBindApex === true;
    const previousDomainName = existingDomain?.domainName as string | null | undefined;
    const previousCdnEnabled = existingDomain?.cdnEnabled === true;
    const previousTrackedDomains = getApigwTrackedDomains(previousDomainName, previousWwwBindApex);
    const originDomain = groupInfo.subDomain;

    if (isCdnEnabled && !originDomain) {
      throw new Error(`API Gateway group ${groupId} has no subDomain for CDN origin`);
    }

    const domainConfig = await buildDomainBindingConfig(
      event.domain,
      groupId,
      serviceName,
      event.key,
      context.stage,
      client,
    );

    if (isCdnEnabled) {
      const desiredDomains = [primaryDomain, ...(wwwDomain ? [wwwDomain] : [])];
      const cdnDomainsToCleanup = previousCdnEnabled
        ? previousTrackedDomains.filter((domain) => !desiredDomains.includes(domain))
        : [];

      if (cdnDomainsToCleanup.length > 0) {
        await cleanupApigwCdnResources(client, existingInstances, cdnDomainsToCleanup);
      }

      await updateApigwCdnDistribution(
        context,
        client,
        event,
        primaryDomain,
        originDomain as string,
        existingInstances,
        instances,
        {
          certificateBody: domainConfig.certificateBody,
          certificatePrivateKey: domainConfig.certificatePrivateKey,
        },
      );

      if (wwwDomain) {
        logger.info(lang.__('APIGW_BINDING_DOMAIN', { domain: wwwDomain }));

        const wwwDomainConfig: ApigwCustomDomainConfig = {
          ...domainConfig,
          domainName: wwwDomain,
          certificateName: domainConfig.certificateName
            ? `${domainConfig.certificateName}-www`
            : undefined,
        };

        await updateApigwCdnDistribution(
          context,
          client,
          event,
          wwwDomain,
          originDomain as string,
          existingInstances,
          instances,
          {
            certificateBody: wwwDomainConfig.certificateBody,
            certificatePrivateKey: wwwDomainConfig.certificatePrivateKey,
          },
        );
      }
    } else {
      if (previousCdnEnabled && previousTrackedDomains.length > 0) {
        await cleanupApigwCdnResources(client, existingInstances, previousTrackedDomains);
      }

      state = await client.apigw.bindCustomDomain(domainConfig, state, logicalId);

      if (wwwDomain) {
        logger.info(lang.__('APIGW_BINDING_DOMAIN', { domain: wwwDomain }));

        const wwwDomainConfig: ApigwCustomDomainConfig = {
          ...domainConfig,
          domainName: wwwDomain,
          certificateName: domainConfig.certificateName
            ? `${domainConfig.certificateName}-www`
            : undefined,
        };

        state = await client.apigw.bindCustomDomain(wwwDomainConfig, state, logicalId);
      }
    }

    if (previousWwwBindApex && previousDomainName) {
      const previousWwwDomain = deriveWwwDomain(previousDomainName);
      if (previousWwwDomain && previousWwwDomain !== wwwDomain && !previousCdnEnabled) {
        try {
          await client.apigw.unbindCustomDomain(groupId, previousWwwDomain);
        } catch (error) {
          logger.warn(
            lang.__('APIGW_WWW_DOMAIN_UNBIND_FAILED', {
              domain: previousWwwDomain,
              error: String(error),
            }),
          );
        }
      }
    }
  } else {
    const existingDomain = existingState.definition?.domain as
      Record<string, unknown> | null | undefined;
    if (existingDomain?.domainName) {
      const previousDomain = existingDomain.domainName as string;
      const previousCdnEnabled = existingDomain.cdnEnabled === true;
      if (previousCdnEnabled) {
        await cleanupApigwCdnResources(client, existingInstances);
      } else {
        try {
          await client.apigw.unbindCustomDomain(groupId, previousDomain);
        } catch (error) {
          logger.warn(
            lang.__('APIGW_DOMAIN_UNBIND_FAILED', { domain: previousDomain, error: String(error) }),
          );
        }

        if (existingDomain.wwwBindApex === true) {
          const previousWwwDomain = deriveWwwDomain(previousDomain);
          if (previousWwwDomain) {
            try {
              await client.apigw.unbindCustomDomain(groupId, previousWwwDomain);
            } catch (error) {
              logger.warn(
                lang.__('APIGW_WWW_DOMAIN_UNBIND_FAILED', {
                  domain: previousWwwDomain,
                  error: String(error),
                }),
              );
            }
          }
        }
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

  const existingDomain = existingState.definition?.domain as
    Record<string, unknown> | null | undefined;
  if (existingDomain?.domainName) {
    const primaryDomain = existingDomain.domainName as string;
    if (existingDomain.cdnEnabled === true) {
      await cleanupApigwCdnResources(client, existingInstances);
    } else {
      try {
        await client.apigw.unbindCustomDomain(groupId, primaryDomain);
      } catch (error) {
        logger.warn(
          lang.__('APIGW_DOMAIN_UNBIND_FAILED', { domain: primaryDomain, error: String(error) }),
        );
      }

      if (existingDomain.wwwBindApex === true) {
        const wwwDomain = deriveWwwDomain(primaryDomain);
        if (wwwDomain) {
          try {
            await client.apigw.unbindCustomDomain(groupId, wwwDomain);
          } catch (error) {
            logger.warn(
              lang.__('APIGW_WWW_DOMAIN_UNBIND_FAILED', {
                domain: wwwDomain,
                error: String(error),
              }),
            );
          }
        }
      }
    }
  }

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
