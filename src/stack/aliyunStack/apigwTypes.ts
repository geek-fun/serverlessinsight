import { EventDomain, ResourceAttributes } from '../../types';

// API Group types
export type ApigwGroupConfig = {
  groupName: string;
  description?: string;
  basePath?: string;
  instanceId?: string;
  tags?: Array<{ key: string; value: string }>;
};

export type ApigwGroupInfo = {
  groupId?: string;
  groupName?: string;
  description?: string;
  basePath?: string;
  subDomain?: string;
  instanceId?: string;
  instanceType?: string;
  regionId?: string;
  status?: string;
  createdTime?: string;
  modifiedTime?: string;
  billingStatus?: string;
  illegalStatus?: string;
  trafficLimit?: number;
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

export type ApigwApiInfo = {
  apiId?: string;
  apiName?: string;
  groupId?: string;
  groupName?: string;
  description?: string;
  visibility?: string;
  authType?: string;
  requestConfig?: {
    requestProtocol?: string;
    requestHttpMethod?: string;
    requestPath?: string;
    requestMode?: string;
    bodyFormat?: string;
  };
  serviceConfig?: {
    serviceProtocol?: string;
    serviceAddress?: string;
    serviceHttpMethod?: string;
    servicePath?: string;
    serviceTimeout?: number;
    functionComputeConfig?: {
      fcRegionId?: string;
      functionName?: string;
      roleArn?: string;
      fcVersion?: string;
      method?: string;
    };
    mockResult?: string;
  };
  resultType?: string;
  resultSample?: string;
  createdTime?: string;
  modifiedTime?: string;
  deployedInfos?: Array<{
    stageName?: string;
    deployedStatus?: string;
    effectiveVersion?: string;
  }>;
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
 */
export const eventToApigwGroupConfig = (
  event: EventDomain,
  serviceName: string,
): ApigwGroupConfig => {
  return {
    groupName: `${serviceName}-agw-group`.replace(/_/g, '-'),
    description: `API Gateway group for ${serviceName}`,
  };
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
 * Convert EventDomain trigger to API Gateway API config
 */
export const triggerToApigwApiConfig = (
  event: EventDomain,
  trigger: EventDomain['triggers'][0],
  groupId: string,
  serviceName: string,
  region: string,
  roleArn?: string,
): ApigwApiConfig => {
  const method = trigger.method as string;
  const path = trigger.path as string;
  const backend = trigger.backend as string;
  const apiKey = generateApiKey(method, path);

  return {
    groupId,
    apiName: `${event.name as string}-agw-api-${apiKey}`.replace(/_/g, '-'),
    visibility: 'PRIVATE',
    authType: 'ANONYMOUS',
    requestConfig: {
      requestProtocol: 'HTTP',
      requestHttpMethod: method,
      requestPath: path,
      requestMode: 'PASSTHROUGH',
    },
    serviceConfig: {
      serviceProtocol: 'FunctionCompute',
      functionComputeConfig: {
        fcRegionId: region,
        functionName: backend,
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
