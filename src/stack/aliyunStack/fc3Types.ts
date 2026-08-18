import { FunctionDomain, FunctionGpuEnum, ResourceAttributes } from '../../types';
import { mapRuntime, ProviderEnum } from '../../common';

export type Fc3VpcConfig = {
  vpcId?: string;
  vSwitchIds?: string[];
  securityGroupId?: string;
  role?: string;
};

export type Fc3GpuConfig = {
  gpuMemorySize?: number;
  gpuType?: string;
};

export type Fc3NasMountConfig = {
  serverAddr?: string;
  mountDir?: string;
  enableTls?: boolean;
};

export type Fc3NasConfig = {
  userId?: number;
  groupId?: number;
  mountPoints?: Fc3NasMountConfig[];
};

export type Fc3LogConfig = {
  project?: string;
  logstore?: string;
  enableRequestMetrics?: boolean;
  enableInstanceMetrics?: boolean;
  enableLlmMetrics?: boolean;
  logBeginRule?: string;
};

export type Fc3CustomHealthCheckConfig = {
  failureThreshold?: number;
  httpGetUrl?: string;
  initialDelaySeconds?: number;
  periodSeconds?: number;
  successThreshold?: number;
  timeoutSeconds?: number;
};

export type Fc3CustomContainerConfig = {
  image?: string;
  entrypoint?: string[];
  command?: string[];
  port?: number;
  accelerationType?: string;
  accelerationInfo?: { status?: string };
  acrInstanceId?: string;
  healthCheckConfig?: Fc3CustomHealthCheckConfig;
  registryConfig?: {
    authConfig?: { password?: string; userName?: string };
  };
  resolvedImageUri?: string;
};

export type Fc3CustomDNS = {
  nameServers?: string[];
  searches?: string[];
  dnsOptions?: Array<{ name?: string; value?: string }>;
};

export type Fc3CustomRuntimeConfig = {
  args?: string[];
  command?: string[];
  port?: number;
  healthCheckConfig?: Fc3CustomHealthCheckConfig;
};

export type Fc3InstanceLifecycleConfig = {
  initializer?: { handler?: string; timeout?: number; command?: string[] };
  preStop?: { handler?: string; timeout?: number; command?: string[] };
};

export type Fc3FunctionLayer = {
  arn?: string;
  size?: number;
};

export type Fc3LockInfo = {
  lockedAt?: string;
  lockedBy?: string;
  lockedResources?: string[];
};

export type Fc3MicroSandboxConfig = {
  osType?: string;
  readyCommand?: string;
  startCommand?: string;
};

export type Fc3OssMountConfig = {
  mountPoints?: Array<{
    bucketName?: string;
    bucketPath?: string;
    endpoint?: string;
    mountDir?: string;
    readOnly?: boolean;
  }>;
};

export type Fc3PolarFsConfig = {
  groupId?: number;
  userId?: number;
  mountPoints?: Array<{
    instanceId?: string;
    mountDir?: string;
    readOnly?: boolean;
    remoteDir?: string;
  }>;
};

export type Fc3TracingConfig = {
  type?: string;
  params?: Record<string, string>;
};

export type Fc3FunctionConfig = {
  functionName: string;
  runtime: string;
  handler: string;
  memorySize: number;
  timeout: number;
  diskSize?: number;
  environmentVariables?: Record<string, string>;
  vpcConfig?: Fc3VpcConfig;
  gpuConfig?: Fc3GpuConfig;
  nasConfig?: Fc3NasConfig;
  logConfig?: Fc3LogConfig;
  customContainerConfig?: Fc3CustomContainerConfig;
  description?: string;
  internetAccess?: boolean;
  role?: string;
  tags?: Array<{ key: string; value: string }>;
};

export type Fc3FunctionInfo = {
  functionName?: string;
  functionArn?: string;
  functionId?: string;
  runtime?: string;
  handler?: string;
  memorySize?: number;
  timeout?: number;
  diskSize?: number;
  cpu?: number;
  environmentVariables?: Record<string, string>;
  vpcConfig?: Fc3VpcConfig;
  gpuConfig?: Fc3GpuConfig;
  nasConfig?: Fc3NasConfig;
  logConfig?: Fc3LogConfig;
  customContainerConfig?: Fc3CustomContainerConfig;
  description?: string;
  internetAccess?: boolean;
  role?: string;
  codeChecksum?: string;
  codeSize?: number;
  createdTime?: string;
  lastModifiedTime?: string;
  state?: string;
  stateReason?: string;
  stateReasonCode?: string;
  lastUpdateStatus?: string;
  lastUpdateStatusReason?: string;
  lastUpdateStatusReasonCode?: string;
  tags?: Array<{ Key?: string; Value?: string }>;
  // Maximum-detail fields — retained from GetFunction so state keeps the full
  // cloud resource detail (runtime config, concurrency, lifecycle hooks,
  // storage mounts, network/DNS, tracing, layers, resource group, tags).
  customDNS?: Fc3CustomDNS;
  customRuntimeConfig?: Fc3CustomRuntimeConfig;
  disableInjectCredentials?: string;
  disableOndemand?: boolean;
  enableLongLiving?: boolean;
  idleTimeout?: number;
  instanceConcurrency?: number;
  instanceIsolationMode?: string;
  instanceLifecycleConfig?: Fc3InstanceLifecycleConfig;
  invocationRestriction?: { disable?: boolean; lastModifiedTime?: string; reason?: string };
  juiceFsConfig?: {
    envs?: Record<string, string>;
    mountPoints?: Array<{
      args?: string[];
      mountDir?: string;
      remoteDir?: string;
      token?: string;
      volumeName?: string;
    }>;
  };
  layers?: Fc3FunctionLayer[];
  lockInfo?: Fc3LockInfo;
  microSandboxConfig?: Fc3MicroSandboxConfig;
  ossMountConfig?: Fc3OssMountConfig;
  polarFsConfig?: Fc3PolarFsConfig;
  resourceGroupId?: string;
  sessionAffinity?: string;
  sessionAffinityConfig?: string;
  tracingConfig?: Fc3TracingConfig;
};

const gpuConfigMap: Record<FunctionGpuEnum, { gpuMemorySize: number; gpuType: string }> = {
  [FunctionGpuEnum.TESLA_8]: { gpuMemorySize: 8192, gpuType: 'fc.gpu.tesla.1' },
  [FunctionGpuEnum.TESLA_12]: { gpuMemorySize: 12288, gpuType: 'fc.gpu.tesla.1' },
  [FunctionGpuEnum.TESLA_16]: { gpuMemorySize: 16384, gpuType: 'fc.gpu.tesla.1' },
  [FunctionGpuEnum.AMPERE_8]: { gpuMemorySize: 8192, gpuType: 'fc.gpu.ampere.1' },
  [FunctionGpuEnum.AMPERE_12]: { gpuMemorySize: 12288, gpuType: 'fc.gpu.ampere.1' },
  [FunctionGpuEnum.AMPERE_16]: { gpuMemorySize: 16384, gpuType: 'fc.gpu.ampere.1' },
  [FunctionGpuEnum.AMPERE_24]: { gpuMemorySize: 24576, gpuType: 'fc.gpu.ampere.1' },
  [FunctionGpuEnum.ADA_48]: { gpuMemorySize: 49152, gpuType: 'fc.gpu.ada.1' },
};

const transformGpuConfig = (gpu: FunctionDomain['gpu']): Fc3GpuConfig | undefined => {
  if (!gpu) {
    return undefined;
  }
  return gpuConfigMap[gpu];
};

export const functionToFc3Config = (fn: FunctionDomain): Fc3FunctionConfig => {
  const config: Fc3FunctionConfig = {
    functionName: fn.name,
    runtime: fn.container ? 'custom-container' : mapRuntime(fn.code!.runtime, ProviderEnum.ALIYUN),
    handler: fn.container ? 'index.handler' : fn.code!.handler,
    memorySize: fn.memory ?? 128,
    timeout: fn.timeout ?? 60,
  };

  if (fn.storage?.disk) {
    config.diskSize = fn.storage.disk;
  }

  if (fn.environment && Object.keys(fn.environment).length > 0) {
    config.environmentVariables = fn.environment;
  }

  if (fn.gpu) {
    config.gpuConfig = transformGpuConfig(fn.gpu);
  }

  if (fn.container) {
    config.customContainerConfig = {
      image: fn.container.image,
      port: fn.container.port,
      ...(fn.container.cmd && { command: fn.container.cmd.split(' ') }),
    };
  }

  if (fn.network) {
    config.vpcConfig = {
      vpcId: fn.network.vpc_id,
      vSwitchIds: fn.network.subnet_ids,
      securityGroupId: fn.network.security_group.name,
    };
  }

  if (fn.storage?.nas && fn.storage.nas.length > 0) {
    config.nasConfig = {
      userId: 10003,
      groupId: 10003,
      mountPoints: fn.storage.nas.map((nas) => ({
        serverAddr: nas.storage_class,
        mountDir: nas.mount_path,
        enableTls: false,
      })),
    };
  }

  if (fn.log !== undefined) {
    config.logConfig = {
      enableRequestMetrics: fn.log,
      enableInstanceMetrics: fn.log,
    };
  }

  return config;
};

export const extractFc3Definition = (
  config: Fc3FunctionConfig,
  codeHash: string,
): ResourceAttributes => {
  return {
    functionName: config.functionName,
    runtime: config.runtime,
    handler: config.handler,
    memorySize: config.memorySize,
    timeout: config.timeout,
    diskSize: config.diskSize ?? null,
    environment: config.environmentVariables ?? {},
    vpcConfig: config.vpcConfig ?? null,
    gpuConfig: config.gpuConfig ?? null,
    customContainerConfig: config.customContainerConfig ?? null,
    nasConfig: config.nasConfig ?? null,
    logConfig: config.logConfig ?? null,
    codeHash,
  };
};

export const extractFunctionDomainDefinition = (
  fn: FunctionDomain,
  codeHash: string,
): ResourceAttributes => {
  const config = functionToFc3Config(fn);
  return extractFc3Definition(config, codeHash);
};
