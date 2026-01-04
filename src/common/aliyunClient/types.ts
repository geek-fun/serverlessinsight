import { Context, NasStorageClassEnum } from '../../types';


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
  logConfig?: {
    project?: string;
    logstore?: string;
    enableRequestMetrics?: boolean;
    enableInstanceMetrics?: boolean;
    logBeginRule?: string;
  };
  customContainerConfig?: {
    image?: string;
    entrypoint?: string[];
    command?: string[];
    port?: number;
    accelerationType?: string;
  };
  description?: string;
  internetAccess?: boolean;
  role?: string;
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
  logConfig?: {
    project?: string;
    logstore?: string;
    enableRequestMetrics?: boolean;
    enableInstanceMetrics?: boolean;
    logBeginRule?: string;
  };
  customContainerConfig?: {
    image?: string;
    entrypoint?: string[];
    command?: string[];
    port?: number;
    accelerationType?: string;
  };
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
};


export type SecurityGroupInfo = {
  securityGroupId: string;
  securityGroupName?: string;
  vpcId?: string;
  description?: string;
  createTime?: string;
};


export type NasFileSystemInfo = {
  fileSystemId: string;
  fileSystemType?: string;
  storageType?: string;
  protocolType?: string;
  status?: string;
  createTime?: string;
};

export type NasMountTargetInfo = {
  mountTargetDomain: string;
  fileSystemId: string;
  vpcId?: string;
  vSwitchId?: string;
  accessGroupName?: string;
  status?: string;
};

export type NasAccessGroupInfo = {
  accessGroupName: string;
  accessGroupType?: string;
  ruleCount?: number;
  createTime?: string;
};

