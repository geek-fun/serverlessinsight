import { EventDomain, ResourceAttributes } from '../../types';
import { getIacDefinition, isFunctionDomain, getContext, logger } from '../../common';
import { lang } from '../../lang';
import type { ApigwHttpMethod } from '../../common/volcengineClient/types';

export type ApigwGroupConfig = {
  groupName: string;
  description?: string;
  protocol?: 'HTTP' | 'HTTPS' | 'HTTP&HTTPS';
};

export type ApigwGroupInfo = {
  gatewayId?: string;
  gatewayName?: string;
  protocol?: string;
  status?: string;
  createdTime?: string;
  description?: string;
  subDomain?: string;
};

export type ApigwApiConfig = {
  gatewayId: string;
  apiName: string;
  method: ApigwHttpMethod;
  path: string;
  description?: string;
  backendFunctionName: string;
  backendType: 'veFaaS';
  requestTimeout?: number;
};

export type ApigwApiInfo = {
  apiId?: string;
  apiName?: string;
  gatewayId?: string;
  method?: string;
  path?: string;
  description?: string;
  backendType?: string;
  backendId?: string;
  backendFunctionName?: string;
  status?: string;
  createdTime?: string;
};

export type ApigwDomainConfig = {
  gatewayId: string;
  domainName: string;
  certificateId?: string;
  certificateBody?: string;
  certificatePrivateKey?: string;
};

export type ApigwDomainInfo = {
  domainName?: string;
  gatewayId?: string;
  status?: string;
  certificateId?: string;
};

/**
 * Convert EventDomain to API Gateway group config
 */
export const eventToApigwGroupConfig = (
  event: EventDomain,
  serviceName: string,
  stage: string,
): ApigwGroupConfig => {
  return {
    groupName: `${serviceName}-${stage}-apigw`.replace(/_/g, '-'),
    description: `API Gateway for ${serviceName}`,
    protocol: (event.domain?.protocol as ApigwGroupConfig['protocol']) ?? 'HTTP',
  };
};

/**
 * Generate a unique API key from method and path
 * Uses URL encoding to preserve path structure and avoid collisions
 */
export const generateApiKey = (method: string, path: string): string => {
  const sanitizedPath = path
    .replace(/\//g, '__')
    .replace(/[^a-zA-Z0-9_]/g, '_')
    .replace(/^__/, '')
    .replace(/__$/, '');
  return `${method}_${sanitizedPath}`;
};

/**
 * Resolves a function reference like ${functions.xxx} to the actual function name
 */
const resolveFunctionReference = (backendRef: string): string => {
  const context = getContext();
  if (!context.iac) {
    logger.warn(lang.__('CANNOT_RESOLVE_FUNCTION_REF', { backendRef }));
    return backendRef;
  }

  const functionDef = getIacDefinition(context.iac, backendRef);

  if (!functionDef || !isFunctionDomain(functionDef)) {
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
  gatewayId: string,
  _serviceName: string,
  _region: string,
  stage: string,
): ApigwApiConfig => {
  const method = trigger.method as ApigwHttpMethod;
  const path = trigger.path as string;
  const backend = trigger.backend as string;
  const resolvedFunctionName = resolveFunctionReference(backend);
  const apiKey = generateApiKey(method, path);

  return {
    gatewayId,
    apiName: `${event.name as string}-${stage}-api-${apiKey}`.replace(/_/g, '-'),
    method,
    path,
    backendFunctionName: resolvedFunctionName,
    backendType: 'veFaaS',
    requestTimeout: 60,
  };
};

/**
 * Extract definition from API Gateway group config for state comparison
 */
export const extractApigwGroupDefinition = (config: ApigwGroupConfig): ResourceAttributes => {
  return {
    groupName: config.groupName,
    description: config.description ?? null,
    protocol: config.protocol ?? null,
  };
};

/**
 * Extract definition from API Gateway API config for state comparison
 */
export const extractApigwApiDefinition = (config: ApigwApiConfig): ResourceAttributes => {
  return {
    apiName: config.apiName,
    gatewayId: config.gatewayId,
    method: config.method,
    path: config.path,
    backendFunctionName: config.backendFunctionName,
    backendType: config.backendType,
  };
};

export type EventDomainDefinition = {
  domainName: string;
  wwwBindApex: boolean;
  certificateId: string | null;
  certificateBody: string | null;
  certificatePrivateKey: string | null;
  protocol: string | string[] | null;
};

export const extractEventDomainDefinition = (
  domain: EventDomain['domain'],
): EventDomainDefinition | null => {
  if (!domain) {
    return null;
  }
  return {
    domainName: domain.domain_name as string,
    wwwBindApex: domain.www_bind_apex === true,
    certificateId: (domain.certificate_id as string) ?? null,
    certificateBody: (domain.certificate_body as string) ?? null,
    certificatePrivateKey: domain.certificate_private_key ? '(managed)' : null,
    protocol: (domain.protocol as string | string[] | null) ?? null,
  };
};
