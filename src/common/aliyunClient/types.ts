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
  memorySize?: number;
  timeout?: number;
  diskSize?: number;
  environmentVariables?: Record<string, string>;
  gpuConfig?: {
    gpuMemorySize?: number;
    gpuType?: string;
  };
  vpcConfig?: {
    vpcId?: string;
    vSwitchIds?: string[];
    securityGroupId?: string;
    role?: string;
  };
  nasConfig?: {
    userId?: number;
    groupId?: number;
    mountPoints?: Array<{
      serverAddr?: string;
      mountDir?: string;
      enableTls?: boolean;
    }>;
  };
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
  vpcConfig?: {
    vpcId?: string;
    vSwitchIds?: string[];
    securityGroupId?: string;
    role?: string;
  };
  gpuConfig?: {
    gpuMemorySize?: number;
    gpuType?: string;
  };
  nasConfig?: {
    userId?: number;
    groupId?: number;
    mountPoints?: Array<{
      serverAddr?: string;
      mountDir?: string;
      enableTls?: boolean;
    }>;
  };
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
  layers?: Array<{ arn?: string; size?: number }>;
  lockInfo?: { lockedAt?: string; lockedBy?: string; lockedResources?: string[] };
  microSandboxConfig?: { osType?: string; readyCommand?: string; startCommand?: string };
  ossMountConfig?: Fc3OssMountConfig;
  polarFsConfig?: Fc3PolarFsConfig;
  resourceGroupId?: string;
  sessionAffinity?: string;
  sessionAffinityConfig?: string;
  tracingConfig?: Fc3TracingConfig;
};

export type SlsProjectInfo = {
  projectName: string;
  description?: string;
  status?: string;
  createTime?: string;
  lastModifyTime?: string;
};

export type SlsLogstoreInfo = {
  logstoreName: string;
  projectName: string;
  ttl?: number;
  shardCount?: number;
  createTime?: number;
  lastModifyTime?: number;
};

export type ApigwLogConfigInfo = {
  logType?: string;
  regionId?: string;
  slsProject?: string;
  slsLogStore?: string;
};

export type SlsIndexInfo = {
  projectName: string;
  logstoreName: string;
  indexMode?: string;
  lastModifyTime?: number;
};

export type RamRoleInfo = {
  roleName: string;
  roleId?: string;
  arn?: string;
  description?: string;
  createDate?: string;
  updateDate?: string;
  maxSessionDuration?: number;
  assumeRolePolicyDocument?: string;
  policyName?: string;
  managedPolicies?: string[];
};

export type SecurityGroupRule = {
  direction: 'ingress' | 'egress';
  ipProtocol: string;
  portRange: string;
  sourceCidrIp?: string;
  destCidrIp?: string;
  priority?: string;
  policy?: string;
  description?: string;
  ruleId?: string;
};

export type SecurityGroupInfo = {
  securityGroupId: string;
  securityGroupName?: string;
  vpcId?: string;
  description?: string;
  createTime?: string;
  ingressRules?: SecurityGroupRule[];
  egressRules?: SecurityGroupRule[];
};

export type NasFileSystemInfo = {
  fileSystemId: string;
  fileSystemType?: string;
  storageType?: string;
  protocolType?: string;
  status?: string;
  createTime?: string;
  description?: string;
  zoneId?: string;
  capacity?: number;
  encrypted?: boolean;
  mountTargetCount?: number;
};

export type NasMountTargetInfo = {
  mountTargetDomain: string;
  fileSystemId: string;
  vpcId?: string;
  vSwitchId?: string;
  accessGroupName?: string;
  status?: string;
};

export type NasAccessRuleInfo = {
  accessGroupName: string;
  sourceCidrIp: string;
  rwAccessType?: string;
  userAccessType?: string;
  priority?: number;
};

export type NasAccessGroupInfo = {
  accessGroupName: string;
  accessGroupType?: string;
  ruleCount?: number;
  createTime?: string;
  accessRules?: NasAccessRuleInfo[];
};

export type CasCertificateInfo = {
  certificateId: number;
  name?: string;
  cert?: string;
  key?: string;
  endDate?: string;
  expired?: boolean;
};
