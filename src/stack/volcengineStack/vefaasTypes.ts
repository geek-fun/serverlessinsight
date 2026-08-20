import { FunctionDomain } from '../../types';
import type { VefaasFunctionConfig, VefaasRuntime } from '../../common/volcengineClient/types';

export type VefaasFunctionDefinition = {
  functionName: string;
  runtime: VefaasRuntime;
  handler: string;
  memorySize: number;
  timeout: number;
  environment: Record<string, string>;
  codeHash: string;
  description?: string;
  role?: string;
  vpcConfig?: {
    vpcId: string;
    subnetIds: string[];
    securityGroupIds: string[];
  };
  tosMountConfig?: {
    bucketName: string;
    mountPath: string;
  };
  logConfig?: {
    project: string;
    topic: string;
  };
};

export type VefaasFunctionInfo = {
  functionId?: string;
  functionName?: string;
  runtime?: string;
  handler?: string;
  memoryMb?: number;
  requestTimeout?: number;
  environmentVariables?: Record<string, string>;
  description?: string;
  status?: string;
  createdTime?: string;
  lastModifiedTime?: string;
  role?: string;
  vpcConfig?: {
    vpcId?: string;
    subnetIds?: string[];
    securityGroupIds?: string[];
    enableVpc?: boolean;
    enableSharedInternetAccess?: boolean;
  };
  logConfig?: {
    project?: string;
    topic?: string;
    enableLog?: boolean;
  };
  Tags?: Array<{ Key?: string; Value?: string }>;
  exclusiveMode?: boolean;
  maxConcurrency?: number;
  codeSize?: number;
  codeSizeLimit?: number;
  sourceLocation?: string;
  sourceType?: string;
  owner?: string;
  triggersCount?: number;
  instanceType?: string;
  initializerSec?: number;
  command?: string;
  port?: number;
  cpuStrategy?: string;
  projectName?: string;
  functionType?: string;
  cell?: string;
  enableApmplus?: boolean;
  nasStorage?: {
    enableNas?: boolean;
    nasConfigs?: Array<{
      gid?: number;
      uid?: number;
      remotePath?: string;
      fileSystemId?: string;
      mountPointId?: string;
      localMountPath?: string;
    }>;
  };
  tosMountConfig?: {
    enableTos?: boolean;
    mountPoints?: Array<{
      endpoint?: string;
      readOnly?: boolean;
      bucketName?: string;
      bucketPath?: string;
      localMountPath?: string;
    }>;
  };
  asyncTaskConfig?: {
    enableAsyncTask?: boolean;
    maxRetry?: number;
    destinationConfig?: {
      onSuccess?: { destination?: string };
      onFailure?: { destination?: string };
    };
  };
};

/**
 * Determines which Volcengine services should be trusted to assume the function's IAM role.
 *
 * IMPORTANT: `trigger.backend` is expected to be an *unresolved* YAML reference string in the
 * form `${functions.<functionKey>}` (e.g. `${functions.my_fn}`). This function compares against
 * that raw string — NOT against a resolved function name or ARN. If the backend value has already
 * been resolved to a function name, this check will silently return false and `apigateway` will
 * NOT be added to the trust policy, breaking API Gateway invocation.
 */
const getTrustedServicesForFunction = (
  fn: FunctionDomain,
  context: { iac?: { events?: Array<{ triggers?: Array<{ backend?: string }> }> } },
): string[] => {
  const expectedBackendRef = `\${functions.${fn.key}}`;
  const hasApiGateway = context.iac?.events?.some((event) =>
    event.triggers?.some((trigger) => String(trigger.backend) === expectedBackendRef),
  );
  return hasApiGateway ? ['vefaas', 'apigateway'] : ['vefaas'];
};

export const functionToVefaasConfig = (
  fn: FunctionDomain,
  options?: {
    role?: string;
    vpcConfig?: VefaasFunctionConfig['vpcConfig'];
    tosMountConfig?: VefaasFunctionConfig['tosMountConfig'];
    logConfig?: VefaasFunctionConfig['logConfig'];
  },
): VefaasFunctionConfig => {
  const config: VefaasFunctionConfig = {
    functionName: fn.name,
    runtime: fn.code!.runtime as VefaasRuntime,
    handler: fn.code!.handler,
    memoryMb: fn.memory ?? 512,
    requestTimeout: fn.timeout ?? 60,
    environmentVariables: fn.environment,
  };

  if (options?.role) {
    config.role = options.role;
  }

  if (options?.vpcConfig) {
    config.vpcConfig = options.vpcConfig;
  }

  if (options?.tosMountConfig) {
    config.tosMountConfig = options.tosMountConfig;
  }

  if (options?.logConfig) {
    config.logConfig = options.logConfig;
  }

  return config;
};

export const extractVefaasDefinition = (
  config: VefaasFunctionConfig,
  codeHash: string,
): VefaasFunctionDefinition => {
  return {
    functionName: config.functionName,
    runtime: config.runtime,
    handler: config.handler,
    memorySize: config.memoryMb,
    timeout: config.requestTimeout,
    environment: config.environmentVariables || {},
    codeHash,
    description: config.description,
    role: config.role,
    vpcConfig: config.vpcConfig,
    tosMountConfig: config.tosMountConfig,
    logConfig: config.logConfig,
  };
};

export const buildDefaultTrustPolicy = (
  trustedServices: string[],
): {
  Statement: Array<{
    Effect: 'Allow' | 'Deny';
    Action: string[];
    Principal: { Service: string[] };
  }>;
} => {
  return {
    Statement: [
      {
        Effect: 'Allow',
        Action: ['sts:AssumeRole'],
        Principal: {
          Service: trustedServices,
        },
      },
    ],
  };
};

export { getTrustedServicesForFunction };
