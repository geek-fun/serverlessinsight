import { CdnConfig, Context, EventDomain, ResourceAttributes } from '../../types';
import { getIacDefinition, isFunctionDomain, getContext, logger } from '../../common';
import { lang } from '../../lang';
import { OWNERSHIP_TAG_KEY, buildOwnershipTagValue } from '../ownershipTag';
// Re-export the info types from the shared client layer so there is a single
// source of truth — the operations layer owns the cloud-returned field shape
// and the stack layer consumes it (previous duplicated copies could drift).
export type {
  ApigwGroupInfo,
  ApigwApiInfo,
  ApigwCustomDomainItem,
  ApigwRequestParameter,
} from '../../common/aliyunClient/apigwOperations';

// API Group types
export type ApigwGroupConfig = {
  groupName: string;
  description?: string;
  basePath?: string;
  instanceId?: string;
  tags?: Array<{ key: string; value: string }>;
};

// API types
export type ApigwApiConfig = {
  groupId: string;
  apiName: string;
  description?: string;
  visibility: 'PUBLIC' | 'PRIVATE';
  authType: 'APP' | 'ANONYMOUS' | 'APPOPENID' | 'OPENID';
  requestConfig: {
    requestProtocol: 'HTTP' | 'HTTPS' | 'HTTP,HTTPS';
    requestHttpMethod: string;
    requestPath: string;
    requestMode: 'MAPPING' | 'PASSTHROUGH';
    bodyFormat?: 'FORM' | 'STREAM';
  };
  serviceConfig: {
    serviceProtocol: 'HTTP' | 'HTTPS' | 'FunctionCompute' | 'MOCK' | 'VPC';
    serviceAddress?: string;
    serviceHttpMethod?: string;
    servicePath?: string;
    serviceTimeout?: number;
    functionComputeConfig?: {
      fcRegionId: string;
      functionName: string;
      roleArn?: string;
      fcVersion?: string;
      method?: string;
    };
    mockResult?: string;
    vpcConfig?: {
      vpcId: string;
      instanceId: string;
      port: number;
    };
  };
  resultType?: 'JSON' | 'TEXT' | 'BINARY' | 'XML' | 'HTML' | 'PASSTHROUGH';
  resultSample?: string;
  failResultSample?: string;
  tags?: Array<{ key: string; value: string }>;
};

// Deployment types
export type ApigwDeploymentConfig = {
  groupId: string;
  apiId: string;
  stageName: 'RELEASE' | 'PRE' | 'TEST';
  description?: string;
};

// Custom domain types
export type ApigwCustomDomainConfig = {
  groupId: string;
  domainName: string;
  certificateName?: string;
  certificateBody?: string;
  certificatePrivateKey?: string;
  bindStageName?: string;
  customDomainType?: 'INTERNET' | 'INTRANET';
  isHttpRedirectToHttps?: boolean;
};

/**
 * Convert EventDomain to API Gateway group config
 *
 * When a context + logicalId are supplied, the config carries the ownership
 * tag that lets a later run idempotently adopt the group created here (state
 * reset or mid-run failure) without risking takeover of a same-named group
 * that belongs to another project.
 */
export const eventToApigwGroupConfig = (
  event: EventDomain,
  serviceName: string,
  stage: string,
  context?: Pick<Context, 'app' | 'service'>,
  logicalId?: string,
): ApigwGroupConfig => {
  const groupConfig: ApigwGroupConfig = {
    groupName: `${serviceName}-${stage}-agw-group`.replace(/_/g, '-'),
    description: `API Gateway group for ${serviceName}`,
  };
  if (context && logicalId) {
    groupConfig.tags = [
      { key: OWNERSHIP_TAG_KEY, value: buildOwnershipTagValue(context, logicalId) },
    ];
  }
  return groupConfig;
};

/**
 * Generate a unique API key from method and path
 * Uses URL encoding to preserve path structure and avoid collisions
 */
export const generateApiKey = (method: string, path: string): string => {
  // Replace slashes with double underscores to preserve path structure
  // Replace other non-alphanumeric chars with single underscore
  const sanitizedPath = path
    .replace(/\//g, '__')
    .replace(/[^a-zA-Z0-9_]/g, '_')
    .replace(/^__/, '') // Remove leading double underscore
    .replace(/__$/, ''); // Remove trailing double underscore
  return `${method}_${sanitizedPath}`;
};

/**
 * Resolves a function reference like ${functions.xxx} to the actual function name
 */
const resolveFunctionReference = (backendRef: string): string => {
  // Get IAC from context
  const context = getContext();
  if (!context.iac) {
    logger.warn(lang.__('CANNOT_RESOLVE_FUNCTION_REF', { backendRef }));
    return backendRef;
  }

  // Use getIacDefinition to resolve function references
  const functionDef = getIacDefinition(context.iac, backendRef);

  if (!functionDef || !isFunctionDomain(functionDef)) {
    // Not a function reference or function not found, return as is
    logger.warn(lang.__('FUNCTION_REF_NOT_RESOLVED', { backendRef }));
    return backendRef;
  }

  const functionName = functionDef.name;
  logger.info(lang.__('RESOLVED_FUNCTION_REF', { backendRef, functionName }));
  return functionName;
};

/**
 * Convert EventDomain trigger to API Gateway API config
 */
export const triggerToApigwApiConfig = (
  event: EventDomain,
  trigger: EventDomain['triggers'][0],
  groupId: string,
  serviceName: string,
  region: string,
  stage: string,
  roleArn?: string,
): ApigwApiConfig => {
  const method = trigger.method as string;
  const path = trigger.path as string;
  const backend = trigger.backend as string;
  const resolvedFunctionName = resolveFunctionReference(backend);
  const apiKey = generateApiKey(method, path);
  const protocolConfig = inferProtocolConfig(
    event.domain?.protocol as string | string[] | undefined,
  );

  return {
    groupId,
    // Aliyun CreateApi requires 4-50 chars of [A-Za-z0-9_] — no hyphens.
    apiName: `${(event.name as string).replace(/-/g, '_')}_${stage}_agw_api_${apiKey}`.slice(0, 50),
    visibility: 'PRIVATE',
    authType: 'ANONYMOUS',
    requestConfig: {
      requestProtocol: protocolConfig.requestProtocol as 'HTTP' | 'HTTPS' | 'HTTP,HTTPS',
      requestHttpMethod: method,
      requestPath: path,
      requestMode: 'PASSTHROUGH',
    },
    serviceConfig: {
      serviceProtocol: 'FunctionCompute',
      functionComputeConfig: {
        fcRegionId: region,
        functionName: resolvedFunctionName,
        roleArn,
        fcVersion: '3.0',
        method,
      },
    },
    resultType: 'PASSTHROUGH',
    resultSample: 'ServerlessInsight resultSample',
  };
};

/**
 * Extract definition from API Gateway group config for state comparison
 */
export const extractApigwGroupDefinition = (config: ApigwGroupConfig): ResourceAttributes => {
  return {
    groupName: config.groupName,
    description: config.description ?? null,
    basePath: config.basePath ?? null,
  };
};

/**
 * Extract definition from API Gateway API config for state comparison
 */
export const extractApigwApiDefinition = (config: ApigwApiConfig): ResourceAttributes => {
  return {
    apiName: config.apiName,
    groupId: config.groupId,
    visibility: config.visibility,
    authType: config.authType,
    requestConfig: config.requestConfig,
    serviceConfig: {
      serviceProtocol: config.serviceConfig.serviceProtocol,
      functionComputeConfig: config.serviceConfig.functionComputeConfig ?? null,
    },
    resultType: config.resultType ?? null,
  };
};

/**
 * Extract definition from deployment config for state comparison
 */
export const extractApigwDeploymentDefinition = (
  config: ApigwDeploymentConfig,
): ResourceAttributes => {
  return {
    groupId: config.groupId,
    apiId: config.apiId,
    stageName: config.stageName,
  };
};

export type ProtocolConfig = {
  requestProtocol: string;
  isHttpRedirectToHttps?: boolean;
};

/**
 * Infer protocol and HTTP→HTTPS redirect from event domain protocol value.
 *
 * | Value               | requestProtocol | isHttpRedirectToHttps |
 * |---------------------|-----------------|-----------------------|
 * | "HTTP"              | "HTTP"          | undefined             |
 * | "HTTPS"             | "HTTPS"         | true                  |
 * | ["HTTP", "HTTPS"]   | "HTTP,HTTPS"    | false                 |
 * | undefined (default) | "HTTP"          | undefined             |
 */
export const inferProtocolConfig = (protocol?: string | string[]): ProtocolConfig => {
  if (!protocol) {
    return { requestProtocol: 'HTTP' };
  }

  if (Array.isArray(protocol)) {
    return {
      requestProtocol: protocol.join(','),
      isHttpRedirectToHttps: false,
    };
  }

  if (protocol === 'HTTPS') {
    logger.info(lang.__('PROTOCOL_INFERRED_REDIRECT', { protocol: 'HTTPS', redirect: 'true' }));
    return {
      requestProtocol: 'HTTPS',
      isHttpRedirectToHttps: true,
    };
  }

  return { requestProtocol: protocol };
};

const getDomainCdnConfig = (domain: EventDomain['domain']): CdnConfig | undefined => {
  const domainCdn = domain?.cdn;
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

export type EventDomainDefinition = {
  domainName: string;
  wwwBindApex: boolean;
  certificateId: string | null;
  certificateBody: string | null;
  certificatePrivateKey: string | null;
  protocol: string | string[] | null;
  cdnEnabled?: boolean;
  cdnType?: string;
  cdnScope?: string;
  cdnCacheTtl?: number;
  cdnIgnoreQueryString?: boolean;
  cdnOriginProtocol?: string;
  cdnCompression?: boolean;
  cdnForceRedirectHttps?: boolean;
};

export type EventLogSnapshot = {
  logEnabled: boolean;
  logConfig: { project: string; logstore: string };
};

/**
 * Snapshot of the event-level access-log wiring (issue #214): the app-scoped
 * shared SLS project plus the service-scoped gateway logstore. Omitted when the
 * event does not opt into logging so existing state definitions stay identical.
 */
export const buildEventLogSnapshot = (
  event: EventDomain,
  context: Pick<Context, 'app' | 'service' | 'stage'>,
): EventLogSnapshot | undefined => {
  if (!event.log) {
    return undefined;
  }
  return {
    logEnabled: event.log === true || event.log === 'true',
    logConfig: {
      project: `${context.app}-${context.stage}-sls`,
      logstore: `${context.service}-${context.stage}-apigw-logs`,
    },
  };
};

export const extractEventDomainDefinition = (
  domain: EventDomain['domain'],
): EventDomainDefinition | null => {
  if (!domain) {
    return null;
  }

  const definition: EventDomainDefinition = {
    domainName: domain.domain_name as string,
    wwwBindApex: domain.www_bind_apex === true,
    certificateId: (domain.certificate_id as string) ?? null,
    certificateBody: (domain.certificate_body as string) ?? null,
    certificatePrivateKey: domain.certificate_private_key ? '(managed)' : null,
    protocol: (domain.protocol as string | string[] | null) ?? null,
  };

  const cdnConfig = getDomainCdnConfig(domain);
  if (cdnConfig?.enabled === true) {
    definition.cdnEnabled = true;
    if (cdnConfig.cdn_type != null) {
      definition.cdnType = cdnConfig.cdn_type as string;
    }
    if (cdnConfig.scope != null) {
      definition.cdnScope = cdnConfig.scope as string;
    }
    if (cdnConfig.cache_ttl != null) {
      definition.cdnCacheTtl = cdnConfig.cache_ttl as number;
    }
    if (cdnConfig.ignore_query_string != null) {
      definition.cdnIgnoreQueryString = cdnConfig.ignore_query_string as boolean;
    }
    if (cdnConfig.origin_protocol != null) {
      definition.cdnOriginProtocol = cdnConfig.origin_protocol as string;
    }
    if (cdnConfig.compression != null) {
      definition.cdnCompression = cdnConfig.compression as boolean;
    }
    if (cdnConfig.force_redirect_https != null) {
      definition.cdnForceRedirectHttps = cdnConfig.force_redirect_https as boolean;
    }
  }

  return definition;
};
