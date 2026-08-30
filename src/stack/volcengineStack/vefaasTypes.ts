import { Context, FunctionDomain } from '../../types';
import type { VefaasFunctionConfig, VefaasRuntime } from '../../common/volcengineClient/types';
import type { IamStatement } from '../../common/iamStatements';

const TEMPLATE_REF_PATTERN = /^\$\{[^}]+\}$/;

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
 * Backend semantics (issue #227): `${functions.<key>}` references a template function
 * by key; a bare value is the function's *deployed name* — either a template function
 * referenced by name or an external function defined outside this template. External
 * backends still need apigateway trust: the gateway assumes this managed role as its
 * invocation identity.
 */
const getTrustedServicesForFunction = (
  fn: FunctionDomain,
  context: {
    iac?: {
      events?: Array<{ triggers?: Array<{ backend?: string }> }>;
      functions?: Array<{ key: string; name?: string }>;
    };
  },
): string[] => {
  const templateFunctions = context.iac?.functions ?? [];
  const templateKeys = new Set(templateFunctions.map((templateFn) => templateFn.key));
  const templateNames = new Set(
    templateFunctions
      .map((templateFn) => templateFn.name)
      .filter((name): name is string => name !== undefined),
  );
  const expectedBackendRef = `\${functions.${fn.key}}`;
  const hasApiGateway = context.iac?.events?.some((event) =>
    event.triggers?.some((trigger) => {
      const backend = String(trigger.backend);
      if (backend === expectedBackendRef || backend === fn.name) {
        return true;
      }
      return (
        !TEMPLATE_REF_PATTERN.test(backend) &&
        !templateKeys.has(backend) &&
        !templateNames.has(backend)
      );
    }),
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

/**
 * Derive the least-privilege execution policy statements for a veFaaS function.
 *
 * Verified model (volcengine docs "通过 IAM 角色授予实例访问云服务的权限",
 * 2025-10 + the ServiceRoleForVeFaaS policy, user-provided 2026-08): the
 * function role is an STS credential source for USER CODE — the platform
 * injects AK/SK/SessionToken into the request, and no vefaas:* action is
 * required for the platform to run the function (vefaas management actions
 * like CreateFunction/Release/Sandbox belong to the service-linked role).
 * The baseline is therefore the function-logging (tls) convenience grant;
 * VPC-describe statements are only added when the function configures a
 * network, and TOS-object statements only when it mounts TOS storage.
 * Conditions mirror the truthiness used when mapping the function into a
 * VefaasFunctionConfig (see vefaasResource).
 */
export const deriveVefaasExecutionStatements = (
  fn: FunctionDomain,
  _context: Context,
): IamStatement[] => {
  const vefaasBaseline: IamStatement[] = [
    {
      effect: 'Allow',
      action: ['tls:CreateProject', 'tls:CreateTopic', 'tls:PutLogs'],
      resource: ['*'],
    },
  ];
  const vpcStatement: IamStatement = {
    effect: 'Allow',
    action: ['vpc:DescribeVpcs', 'vpc:DescribeSubnets', 'vpc:DescribeSecurityGroups'],
    resource: ['*'],
  };
  const tosStatement: IamStatement = {
    effect: 'Allow',
    action: ['tos:GetObject', 'tos:PutObject', 'tos:DeleteObject', 'tos:ListBucket'],
    resource: ['*'],
  };
  return [
    ...vefaasBaseline,
    ...(fn.network ? [vpcStatement] : []),
    ...(fn.storage?.nas?.[0] ? [tosStatement] : []),
  ];
};

export { getTrustedServicesForFunction };
