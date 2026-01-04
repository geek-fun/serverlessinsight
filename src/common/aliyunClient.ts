import Fc3Client from '@alicloud/fc20230330';
import SlsClient from '@alicloud/sls20201230';
import RamClient from '@alicloud/ram20150501';
import EcsClient from '@alicloud/ecs20140526';
import NasClient from '@alicloud/nas20170626';
import CloudApiClient from '@alicloud/cloudapi20160714';
import * as $OpenApi from '@alicloud/openapi-client';
import OSS from 'ali-oss';
import * as fc from '@alicloud/fc20230330';
import * as sls from '@alicloud/sls20201230';
import * as ram from '@alicloud/ram20150501';
import * as ecs from '@alicloud/ecs20140526';
import * as nas from '@alicloud/nas20170626';
import { Context, NasStorageClassEnum } from '../types';
import { logger } from './logger';

// Internal SDK client types
type Fc3SdkClient = Fc3Client;
type SlsSdkClient = SlsClient;
type RamSdkClient = RamClient;
type EcsSdkClient = EcsClient;
type NasSdkClient = NasClient;
type OssSdkClient = OSS;
type ApigwSdkClient = CloudApiClient;

// FC3 Operation Types
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

// SLS Operation Types
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

// RAM Operation Types
export type RamRoleInfo = {
  roleName: string;
  roleId?: string;
  arn?: string;
  description?: string;
  createDate?: string;
};

// ECS Operation Types
export type SecurityGroupInfo = {
  securityGroupId: string;
  securityGroupName?: string;
  vpcId?: string;
  description?: string;
  createTime?: string;
};

// NAS Operation Types
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

// Functional client with operation functions
export type AliyunClient = {
  fc3: {
    createFunction: (config: Fc3FunctionConfig, codeBase64: string) => Promise<void>;
    getFunction: (functionName: string) => Promise<Fc3FunctionInfo | null>;
    updateFunctionConfiguration: (config: Fc3FunctionConfig) => Promise<void>;
    updateFunctionCode: (functionName: string, codeBase64: string) => Promise<void>;
    deleteFunction: (functionName: string) => Promise<void>;
  };
  sls: {
    createProject: (projectName: string, description?: string) => Promise<SlsProjectInfo>;
    getProject: (projectName: string) => Promise<SlsProjectInfo | null>;
    deleteProject: (projectName: string) => Promise<void>;
    createLogstore: (
      projectName: string,
      logstoreName: string,
      ttl?: number,
    ) => Promise<SlsLogstoreInfo>;
    getLogstore: (projectName: string, logstoreName: string) => Promise<SlsLogstoreInfo | null>;
    deleteLogstore: (projectName: string, logstoreName: string) => Promise<void>;
    createIndex: (projectName: string, logstoreName: string) => Promise<SlsIndexInfo>;
    getIndex: (projectName: string, logstoreName: string) => Promise<SlsIndexInfo | null>;
    deleteIndex: (projectName: string, logstoreName: string) => Promise<void>;
  };
  ram: {
    createRole: (roleName: string, description?: string) => Promise<RamRoleInfo>;
    getRole: (roleName: string) => Promise<RamRoleInfo | null>;
    deleteRole: (roleName: string) => Promise<void>;
  };
  ecs: {
    createSecurityGroup: (
      securityGroupName: string,
      vpcId: string,
      ingressRules: string[],
      egressRules: string[],
      description?: string,
    ) => Promise<SecurityGroupInfo>;
    getSecurityGroup: (securityGroupId: string) => Promise<SecurityGroupInfo | null>;
    deleteSecurityGroup: (securityGroupId: string) => Promise<void>;
  };
  nas: {
    createAccessGroup: (
      accessGroupName: string,
      accessGroupType?: string,
    ) => Promise<NasAccessGroupInfo>;
    getAccessGroup: (accessGroupName: string) => Promise<NasAccessGroupInfo | null>;
    deleteAccessGroup: (accessGroupName: string) => Promise<void>;
    createAccessRule: (accessGroupName: string, sourceCidrIp: string) => Promise<void>;
    createFileSystem: (
      storageClass: NasStorageClassEnum,
      functionName: string,
    ) => Promise<NasFileSystemInfo>;
    getFileSystem: (fileSystemId: string) => Promise<NasFileSystemInfo | null>;
    deleteFileSystem: (fileSystemId: string) => Promise<void>;
    createMountTarget: (
      fileSystemId: string,
      accessGroupName: string,
      vpcId: string,
      vSwitchId: string,
    ) => Promise<NasMountTargetInfo>;
    getMountTarget: (
      fileSystemId: string,
      mountTargetDomain: string,
    ) => Promise<NasMountTargetInfo | null>;
    deleteMountTarget: (fileSystemId: string, mountTargetDomain: string) => Promise<void>;
  };
  oss: OssSdkClient;
  apigw: ApigwSdkClient;
};

// Initialize SDK clients (internal)
const initializeSdkClients = (context: Context) => {
  const baseConfig = {
    accessKeyId: context.accessKeyId,
    accessKeySecret: context.accessKeySecret,
    regionId: context.region,
    securityToken: context.securityToken,
  };

  const fc3Config = new $OpenApi.Config(baseConfig);
  fc3Config.endpoint = `${context.accountId}.${context.region}.fc.aliyuncs.com`;
  const fc3Client = new Fc3Client(fc3Config);

  const slsConfig = new $OpenApi.Config(baseConfig);
  slsConfig.endpoint = `${context.region}.log.aliyuncs.com`;
  const slsClient = new SlsClient(slsConfig);

  const ramConfig = new $OpenApi.Config(baseConfig);
  ramConfig.endpoint = 'ram.aliyuncs.com';
  const ramClient = new RamClient(ramConfig);

  const ecsConfig = new $OpenApi.Config(baseConfig);
  ecsConfig.endpoint = `ecs.${context.region}.aliyuncs.com`;
  const ecsClient = new EcsClient(ecsConfig);

  const nasConfig = new $OpenApi.Config(baseConfig);
  nasConfig.endpoint = `nas.${context.region}.aliyuncs.com`;
  const nasClient = new NasClient(nasConfig);

  const ossClient = new OSS({
    accessKeyId: context.accessKeyId,
    accessKeySecret: context.accessKeySecret,
    region: `oss-${context.region}`,
    stsToken: context.securityToken,
  });

  const apigwConfig = new $OpenApi.Config(baseConfig);
  apigwConfig.endpoint = `apigateway.${context.region}.aliyuncs.com`;
  const apigwClient = new CloudApiClient(apigwConfig);

  return {
    fc3: fc3Client,
    sls: slsClient,
    ram: ramClient,
    ecs: ecsClient,
    nas: nasClient,
    oss: ossClient,
    apigw: apigwClient,
  };
};

// FC3 operations
const createFc3Operations = (fc3Client: Fc3SdkClient) => ({
  createFunction: async (config: Fc3FunctionConfig, codeBase64: string): Promise<void> => {
    const createFunctionInput = new fc.CreateFunctionInput({
      functionName: config.functionName,
      runtime: config.runtime,
      handler: config.handler,
      memorySize: config.memorySize,
      timeout: config.timeout,
      code: new fc.InputCodeLocation({
        zipFile: codeBase64,
      }),
      ...(config.diskSize && { diskSize: config.diskSize }),
      ...(config.environmentVariables && { environmentVariables: config.environmentVariables }),
      ...(config.gpuConfig && {
        gpuConfig: new fc.GPUConfig({
          gpuMemorySize: config.gpuConfig.gpuMemorySize,
          gpuType: config.gpuConfig.gpuType,
        }),
      }),
      ...(config.vpcConfig && {
        vpcConfig: new fc.VPCConfig({
          vpcId: config.vpcConfig.vpcId,
          vSwitchIds: config.vpcConfig.vSwitchIds,
          securityGroupId: config.vpcConfig.securityGroupId,
        }),
      }),
      ...(config.nasConfig && {
        nasConfig: new fc.NASConfig({
          userId: config.nasConfig.userId,
          groupId: config.nasConfig.groupId,
          mountPoints: config.nasConfig.mountPoints?.map(
            (mp) =>
              new fc.NASMountConfig({
                serverAddr: mp.serverAddr,
                mountDir: mp.mountDir,
                enableTLS: mp.enableTls,
              }),
          ),
        }),
      }),
      ...(config.logConfig && {
        logConfig: new fc.LogConfig({
          project: config.logConfig.project,
          logstore: config.logConfig.logstore,
          enableRequestMetrics: config.logConfig.enableRequestMetrics,
          enableInstanceMetrics: config.logConfig.enableInstanceMetrics,
          logBeginRule: config.logConfig.logBeginRule,
        }),
      }),
      ...(config.customContainerConfig && {
        customContainerConfig: new fc.CustomContainerConfig({
          image: config.customContainerConfig.image,
          entrypoint: config.customContainerConfig.entrypoint,
          command: config.customContainerConfig.command,
          port: config.customContainerConfig.port,
          accelerationType: config.customContainerConfig.accelerationType,
        }),
      }),
      ...(config.description && { description: config.description }),
      ...(config.internetAccess !== undefined && { internetAccess: config.internetAccess }),
      ...(config.role && { role: config.role }),
    });

    const request = new fc.CreateFunctionRequest({
      body: createFunctionInput,
    });

    await fc3Client.createFunction(request);
  },

  getFunction: async (functionName: string): Promise<Fc3FunctionInfo | null> => {
    try {
      const request = new fc.GetFunctionRequest({});
      const response = await fc3Client.getFunction(functionName, request);

      if (!response || !response.body) {
        return null;
      }

      const body = response.body;

      return {
        functionName: body.functionName,
        functionArn: body.functionArn,
        functionId: body.functionId,
        runtime: body.runtime,
        handler: body.handler,
        memorySize: body.memorySize,
        timeout: body.timeout,
        diskSize: body.diskSize,
        cpu: body.cpu,
        environmentVariables: body.environmentVariables,
        vpcConfig: body.vpcConfig
          ? {
              vpcId: body.vpcConfig.vpcId,
              vSwitchIds: body.vpcConfig.vSwitchIds,
              securityGroupId: body.vpcConfig.securityGroupId,
            }
          : undefined,
        gpuConfig: body.gpuConfig
          ? {
              gpuMemorySize: body.gpuConfig.gpuMemorySize,
              gpuType: body.gpuConfig.gpuType,
            }
          : undefined,
        nasConfig: body.nasConfig
          ? {
              userId: body.nasConfig.userId,
              groupId: body.nasConfig.groupId,
              mountPoints: body.nasConfig.mountPoints?.map((mp) => ({
                serverAddr: mp.serverAddr,
                mountDir: mp.mountDir,
                enableTls: mp.enableTLS,
              })),
            }
          : undefined,
        logConfig: body.logConfig
          ? {
              project: body.logConfig.project,
              logstore: body.logConfig.logstore,
              enableRequestMetrics: body.logConfig.enableRequestMetrics,
              enableInstanceMetrics: body.logConfig.enableInstanceMetrics,
              logBeginRule: body.logConfig.logBeginRule,
            }
          : undefined,
        customContainerConfig: body.customContainerConfig
          ? {
              image: body.customContainerConfig.image,
              entrypoint: body.customContainerConfig.entrypoint,
              command: body.customContainerConfig.command,
              port: body.customContainerConfig.port,
              accelerationType: body.customContainerConfig.accelerationType,
            }
          : undefined,
        description: body.description,
        internetAccess: body.internetAccess,
        role: body.role,
        codeChecksum: body.codeChecksum,
        codeSize: body.codeSize,
        createdTime: body.createdTime,
        lastModifiedTime: body.lastModifiedTime,
        state: body.state,
        stateReason: body.stateReason,
        stateReasonCode: body.stateReasonCode,
        lastUpdateStatus: body.lastUpdateStatus,
        lastUpdateStatusReason: body.lastUpdateStatusReason,
        lastUpdateStatusReasonCode: body.lastUpdateStatusReasonCode,
      };
    } catch (error: unknown) {
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        error.code === 'FunctionNotFound'
      ) {
        return null;
      }
      throw error;
    }
  },

  updateFunctionConfiguration: async (config: Fc3FunctionConfig): Promise<void> => {
    const updateFunctionInput = new fc.UpdateFunctionInput({
      runtime: config.runtime,
      handler: config.handler,
      memorySize: config.memorySize,
      timeout: config.timeout,
      ...(config.diskSize && { diskSize: config.diskSize }),
      ...(config.environmentVariables && { environmentVariables: config.environmentVariables }),
      ...(config.gpuConfig && {
        gpuConfig: new fc.GPUConfig({
          gpuMemorySize: config.gpuConfig.gpuMemorySize,
          gpuType: config.gpuConfig.gpuType,
        }),
      }),
      ...(config.vpcConfig && {
        vpcConfig: new fc.VPCConfig({
          vpcId: config.vpcConfig.vpcId,
          vSwitchIds: config.vpcConfig.vSwitchIds,
          securityGroupId: config.vpcConfig.securityGroupId,
        }),
      }),
      ...(config.nasConfig && {
        nasConfig: new fc.NASConfig({
          userId: config.nasConfig.userId,
          groupId: config.nasConfig.groupId,
          mountPoints: config.nasConfig.mountPoints?.map(
            (mp) =>
              new fc.NASMountConfig({
                serverAddr: mp.serverAddr,
                mountDir: mp.mountDir,
                enableTLS: mp.enableTls,
              }),
          ),
        }),
      }),
      ...(config.logConfig && {
        logConfig: new fc.LogConfig({
          project: config.logConfig.project,
          logstore: config.logConfig.logstore,
          enableRequestMetrics: config.logConfig.enableRequestMetrics,
          enableInstanceMetrics: config.logConfig.enableInstanceMetrics,
          logBeginRule: config.logConfig.logBeginRule,
        }),
      }),
      ...(config.customContainerConfig && {
        customContainerConfig: new fc.CustomContainerConfig({
          image: config.customContainerConfig.image,
          entrypoint: config.customContainerConfig.entrypoint,
          command: config.customContainerConfig.command,
          port: config.customContainerConfig.port,
          accelerationType: config.customContainerConfig.accelerationType,
        }),
      }),
      ...(config.description && { description: config.description }),
      ...(config.internetAccess !== undefined && { internetAccess: config.internetAccess }),
      ...(config.role && { role: config.role }),
    });

    const request = new fc.UpdateFunctionRequest({
      body: updateFunctionInput,
    });

    await fc3Client.updateFunction(config.functionName, request);
  },

  updateFunctionCode: async (functionName: string, codeBase64: string): Promise<void> => {
    const updateFunctionInput = new fc.UpdateFunctionInput({
      code: new fc.InputCodeLocation({
        zipFile: codeBase64,
      }),
    });

    const request = new fc.UpdateFunctionRequest({
      body: updateFunctionInput,
    });

    await fc3Client.updateFunction(functionName, request);
  },

  deleteFunction: async (functionName: string): Promise<void> => {
    await fc3Client.deleteFunction(functionName);
  },
});

// Helper for SLS operations
const waitForSlsProject = async (
  getProject: (projectName: string) => Promise<SlsProjectInfo | null>,
  projectName: string,
): Promise<SlsProjectInfo> => {
  let retries = 0;
  while (retries < 10) {
    try {
      const project = await getProject(projectName);
      if (project) {
        return project;
      }
    } catch {
      // Project not ready yet
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
    retries++;
  }
  return { projectName };
};

const waitForSlsLogstore = async (
  getLogstore: (projectName: string, logstoreName: string) => Promise<SlsLogstoreInfo | null>,
  projectName: string,
  logstoreName: string,
  ttl: number,
): Promise<SlsLogstoreInfo> => {
  let retries = 0;
  while (retries < 10) {
    try {
      const logstore = await getLogstore(projectName, logstoreName);
      if (logstore) {
        return logstore;
      }
    } catch {
      // Logstore not ready yet
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
    retries++;
  }
  return { logstoreName, projectName, ttl };
};

// SLS operations
const createSlsOperations = (slsClient: SlsSdkClient) => {
  const operations = {
    createProject: async (projectName: string, description?: string): Promise<SlsProjectInfo> => {
      const request = new sls.CreateProjectRequest({
        projectName,
        description: description ?? `ServerlessInsight log project for ${projectName}`,
      });

      await slsClient.createProject(request);

      // Wait for project to be ready
      return await waitForSlsProject(operations.getProject, projectName);
    },

    getProject: async (projectName: string): Promise<SlsProjectInfo | null> => {
      try {
        const response = await slsClient.getProject(projectName);

        if (!response || !response.body) {
          return null;
        }

        return {
          projectName: response.body.name ?? projectName,
          description: response.body.description,
          status: response.body.status,
          createTime: response.body.createTime,
          lastModifyTime: response.body.lastModifyTime,
        };
      } catch (error: unknown) {
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          error.code === 'ProjectNotExist'
        ) {
          return null;
        }
        throw error;
      }
    },

    deleteProject: async (projectName: string): Promise<void> => {
      const request = new sls.DeleteProjectRequest({});
      await slsClient.deleteProject(projectName, request);
    },

    createLogstore: async (
      projectName: string,
      logstoreName: string,
      ttl: number = 7,
    ): Promise<SlsLogstoreInfo> => {
      const request = new sls.CreateLogStoreRequest({
        logstoreName,
        ttl,
        shardCount: 2,
      });

      await slsClient.createLogStore(projectName, request);

      // Wait for logstore to be ready
      return await waitForSlsLogstore(operations.getLogstore, projectName, logstoreName, ttl);
    },

    getLogstore: async (
      projectName: string,
      logstoreName: string,
    ): Promise<SlsLogstoreInfo | null> => {
      try {
        const response = await slsClient.getLogStore(projectName, logstoreName);

        if (!response || !response.body) {
          return null;
        }

        return {
          logstoreName: response.body.logstoreName ?? logstoreName,
          projectName,
          ttl: response.body.ttl,
          shardCount: response.body.shardCount,
          createTime: response.body.createTime,
          lastModifyTime: response.body.lastModifyTime,
        };
      } catch (error: unknown) {
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          error.code === 'LogStoreNotExist'
        ) {
          return null;
        }
        throw error;
      }
    },

    deleteLogstore: async (projectName: string, logstoreName: string): Promise<void> => {
      await slsClient.deleteLogStore(projectName, logstoreName);
    },

    createIndex: async (projectName: string, logstoreName: string): Promise<SlsIndexInfo> => {
      const request = new sls.CreateIndexRequest({
        body: new sls.Index({
          line: new sls.IndexLine({
            token: [
              ',',
              ' ',
              "'",
              '"',
              ';',
              '=',
              '(',
              ')',
              '[',
              ']',
              '{',
              '}',
              '?',
              '@',
              '&',
              '<',
              '>',
              '/',
              ':',
              '\n',
              '\t',
              '\r',
            ],
          }),
        }),
      });

      await slsClient.createIndex(projectName, logstoreName, request);

      return { projectName, logstoreName };
    },

    getIndex: async (projectName: string, logstoreName: string): Promise<SlsIndexInfo | null> => {
      try {
        const response = await slsClient.getIndex(projectName, logstoreName);

        if (!response || !response.body) {
          return null;
        }

        return {
          projectName,
          logstoreName,
          indexMode: response.body.indexMode,
          lastModifyTime: response.body.lastModifyTime,
        };
      } catch (error: unknown) {
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          error.code === 'IndexConfigNotExist'
        ) {
          return null;
        }
        throw error;
      }
    },

    deleteIndex: async (projectName: string, logstoreName: string): Promise<void> => {
      await slsClient.deleteIndex(projectName, logstoreName);
    },
  };

  return operations;
};

// RAM policy constants
const FC_ASSUME_ROLE_POLICY = JSON.stringify({
  Version: '1',
  Statement: [
    {
      Action: 'sts:AssumeRole',
      Effect: 'Allow',
      Principal: {
        Service: ['fc.aliyuncs.com'],
      },
    },
  ],
});

const FC_EXECUTION_POLICY = JSON.stringify({
  Version: '1',
  Statement: [
    {
      Effect: 'Allow',
      Action: [
        'log:PostLogStoreLogs',
        'log:CreateLogStore',
        'log:GetLogStore',
        'log:ListShards',
        'log:GetCursorOrData',
      ],
      Resource: '*',
    },
    {
      Effect: 'Allow',
      Action: ['nas:*'],
      Resource: '*',
    },
    {
      Effect: 'Allow',
      Action: [
        'ecs:CreateNetworkInterface',
        'ecs:DeleteNetworkInterface',
        'ecs:DescribeNetworkInterfaces',
        'ecs:CreateNetworkInterfacePermission',
        'ecs:DescribeNetworkInterfacePermissions',
        'ecs:DeleteNetworkInterfacePermission',
      ],
      Resource: '*',
    },
    {
      Effect: 'Allow',
      Action: ['vpc:DescribeVSwitchAttributes'],
      Resource: '*',
    },
  ],
});

// RAM operations
const createRamOperations = (ramClient: RamSdkClient) => {
  const attachRolePolicyForFc = async (roleName: string): Promise<void> => {
    const policyName = `${roleName}-policy`;

    // Create policy
    try {
      const createPolicyRequest = new ram.CreatePolicyRequest({
        policyName,
        policyDocument: FC_EXECUTION_POLICY,
        description: `FC execution policy for ${roleName}`,
      });
      await ramClient.createPolicy(createPolicyRequest);
    } catch (error: unknown) {
      // Policy may already exist
      if (
        !(
          error &&
          typeof error === 'object' &&
          'code' in error &&
          error.code === 'EntityAlreadyExists.Policy'
        )
      ) {
        throw error;
      }
    }

    // Attach policy to role
    try {
      const attachRequest = new ram.AttachPolicyToRoleRequest({
        policyType: 'Custom',
        policyName,
        roleName,
      });
      await ramClient.attachPolicyToRole(attachRequest);
    } catch (error: unknown) {
      // Policy may already be attached
      if (
        !(
          error &&
          typeof error === 'object' &&
          'code' in error &&
          error.code === 'EntityAlreadyExists.Role.Policy'
        )
      ) {
        throw error;
      }
    }
  };

  return {
    createRole: async (roleName: string, description?: string): Promise<RamRoleInfo> => {
      const request = new ram.CreateRoleRequest({
        roleName,
        assumeRolePolicyDocument: FC_ASSUME_ROLE_POLICY,
        description: description ?? `ServerlessInsight FC execution role for ${roleName}`,
      });

      const response = await ramClient.createRole(request);

      // Attach policy to role
      await attachRolePolicyForFc(roleName);

      return {
        roleName,
        roleId: response.body?.role?.roleId,
        arn: response.body?.role?.arn,
        description: response.body?.role?.description,
        createDate: response.body?.role?.createDate,
      };
    },

    getRole: async (roleName: string): Promise<RamRoleInfo | null> => {
      try {
        const request = new ram.GetRoleRequest({
          roleName,
        });
        const response = await ramClient.getRole(request);

        if (!response || !response.body || !response.body.role) {
          return null;
        }

        return {
          roleName: response.body.role.roleName ?? roleName,
          roleId: response.body.role.roleId,
          arn: response.body.role.arn,
          description: response.body.role.description,
          createDate: response.body.role.createDate,
        };
      } catch (error: unknown) {
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          error.code === 'EntityNotExist.Role'
        ) {
          return null;
        }
        throw error;
      }
    },

    deleteRole: async (roleName: string): Promise<void> => {
      const policyName = `${roleName}-policy`;

      // Detach policy from role
      try {
        const detachRequest = new ram.DetachPolicyFromRoleRequest({
          policyType: 'Custom',
          policyName,
          roleName,
        });
        await ramClient.detachPolicyFromRole(detachRequest);
      } catch {
        // Ignore if policy is not attached
      }

      // Delete policy
      try {
        const deletePolicyRequest = new ram.DeletePolicyRequest({
          policyName,
        });
        await ramClient.deletePolicy(deletePolicyRequest);
      } catch {
        // Ignore if policy doesn't exist
      }

      // Delete role
      const request = new ram.DeleteRoleRequest({
        roleName,
      });
      await ramClient.deleteRole(request);
    },
  };
};

// ECS security group helpers
const securityGroupRangeMap: Record<string, string> = {
  TCP: '1/65535',
  UDP: '1/65535',
  ICMP: '-1/-1',
  GRE: '-1/-1',
  ALL: '-1/-1',
};

const transformPortRange = (protocol: string, portRange: string): string => {
  if (portRange.toUpperCase() === 'ALL') {
    return securityGroupRangeMap[protocol.toUpperCase()];
  }
  return portRange.includes('/') ? portRange : `${portRange}/${portRange}`;
};

// ECS operations
const createEcsOperations = (ecsClient: EcsSdkClient, context: Context) => ({
  createSecurityGroup: async (
    securityGroupName: string,
    vpcId: string,
    ingressRules: string[],
    egressRules: string[],
    description?: string,
  ): Promise<SecurityGroupInfo> => {
    const createRequest = new ecs.CreateSecurityGroupRequest({
      regionId: context.region,
      securityGroupName,
      vpcId,
      description: description ?? `ServerlessInsight security group for ${securityGroupName}`,
    });

    const response = await ecsClient.createSecurityGroup(createRequest);
    const securityGroupId = response.body?.securityGroupId;

    if (!securityGroupId) {
      throw new Error('Failed to create security group');
    }

    // Add ingress rules
    for (const rule of ingressRules) {
      const [protocol, cidrIp, portRange] = rule.split(':');
      const ingressRequest = new ecs.AuthorizeSecurityGroupRequest({
        regionId: context.region,
        securityGroupId,
        ipProtocol: protocol.toLowerCase(),
        sourceCidrIp: cidrIp,
        portRange: transformPortRange(protocol, portRange),
      });
      try {
        await ecsClient.authorizeSecurityGroup(ingressRequest);
      } catch {
        logger.warn(`Failed to add ingress rule: ${rule}`);
      }
    }

    // Add egress rules
    for (const rule of egressRules) {
      const [protocol, cidrIp, portRange] = rule.split(':');
      const egressRequest = new ecs.AuthorizeSecurityGroupEgressRequest({
        regionId: context.region,
        securityGroupId,
        ipProtocol: protocol.toLowerCase(),
        destCidrIp: cidrIp,
        portRange: transformPortRange(protocol, portRange),
      });
      try {
        await ecsClient.authorizeSecurityGroupEgress(egressRequest);
      } catch {
        logger.warn(`Failed to add egress rule: ${rule}`);
      }
    }

    return {
      securityGroupId,
      securityGroupName,
      vpcId,
      description,
    };
  },

  getSecurityGroup: async (securityGroupId: string): Promise<SecurityGroupInfo | null> => {
    try {
      const request = new ecs.DescribeSecurityGroupsRequest({
        regionId: context.region,
        securityGroupId,
      });
      const response = await ecsClient.describeSecurityGroups(request);

      if (
        !response ||
        !response.body ||
        !response.body.securityGroups ||
        !response.body.securityGroups.securityGroup ||
        response.body.securityGroups.securityGroup.length === 0
      ) {
        return null;
      }

      const sg = response.body.securityGroups.securityGroup[0];
      return {
        securityGroupId: sg.securityGroupId ?? securityGroupId,
        securityGroupName: sg.securityGroupName,
        vpcId: sg.vpcId,
        description: sg.description,
        createTime: sg.creationTime,
      };
    } catch {
      return null;
    }
  },

  deleteSecurityGroup: async (securityGroupId: string): Promise<void> => {
    const request = new ecs.DeleteSecurityGroupRequest({
      regionId: context.region,
      securityGroupId,
    });

    await ecsClient.deleteSecurityGroup(request);
  },
});

// NAS storage class mapping
const storageClassMap: Record<
  NasStorageClassEnum,
  { fileSystemType: string; storageType: string }
> = {
  [NasStorageClassEnum.STANDARD_CAPACITY]: { fileSystemType: 'standard', storageType: 'Capacity' },
  [NasStorageClassEnum.STANDARD_PERFORMANCE]: {
    fileSystemType: 'standard',
    storageType: 'Performance',
  },
  [NasStorageClassEnum.EXTREME_STANDARD]: { fileSystemType: 'extreme', storageType: 'standard' },
  [NasStorageClassEnum.EXTREME_ADVANCE]: { fileSystemType: 'extreme', storageType: 'advance' },
};

// NAS operations
const createNasOperations = (nasClient: NasSdkClient) => {
  const operations = {
    createAccessGroup: async (
      accessGroupName: string,
      accessGroupType: string = 'Vpc',
    ): Promise<NasAccessGroupInfo> => {
      const request = new nas.CreateAccessGroupRequest({
        accessGroupName,
        accessGroupType,
      });

      await nasClient.createAccessGroup(request);

      return {
        accessGroupName,
        accessGroupType,
      };
    },

    getAccessGroup: async (accessGroupName: string): Promise<NasAccessGroupInfo | null> => {
      try {
        const request = new nas.DescribeAccessGroupsRequest({
          accessGroupName,
        });
        const response = await nasClient.describeAccessGroups(request);

        if (
          !response ||
          !response.body ||
          !response.body.accessGroups ||
          !response.body.accessGroups.accessGroup ||
          response.body.accessGroups.accessGroup.length === 0
        ) {
          return null;
        }

        const ag = response.body.accessGroups.accessGroup[0];
        return {
          accessGroupName: ag.accessGroupName ?? accessGroupName,
          accessGroupType: ag.accessGroupType,
          ruleCount: ag.ruleCount,
        };
      } catch {
        return null;
      }
    },

    deleteAccessGroup: async (accessGroupName: string): Promise<void> => {
      const request = new nas.DeleteAccessGroupRequest({
        accessGroupName,
      });

      await nasClient.deleteAccessGroup(request);
    },

    createAccessRule: async (accessGroupName: string, sourceCidrIp: string): Promise<void> => {
      const request = new nas.CreateAccessRuleRequest({
        accessGroupName,
        sourceCidrIp,
        RWAccessType: 'RDWR',
        userAccessType: 'no_squash',
        priority: 1,
      });

      await nasClient.createAccessRule(request);
    },

    createFileSystem: async (
      storageClass: NasStorageClassEnum,
      functionName: string,
    ): Promise<NasFileSystemInfo> => {
      const { fileSystemType, storageType } = storageClassMap[storageClass];

      const request = new nas.CreateFileSystemRequest({
        fileSystemType,
        storageType,
        protocolType: 'NFS',
        description: `ServerlessInsight NAS for ${functionName}`,
      });

      const response = await nasClient.createFileSystem(request);
      const fileSystemId = response.body?.fileSystemId;

      if (!fileSystemId) {
        throw new Error('Failed to create NAS file system');
      }

      // Wait for file system to be ready
      let retries = 0;
      while (retries < 30) {
        const fs = await operations.getFileSystem(fileSystemId);
        if (fs && fs.status === 'Running') {
          return fs;
        }
        await new Promise((resolve) => setTimeout(resolve, 5000));
        retries++;
      }

      return {
        fileSystemId,
        fileSystemType,
        storageType,
        protocolType: 'NFS',
      };
    },

    getFileSystem: async (fileSystemId: string): Promise<NasFileSystemInfo | null> => {
      try {
        const request = new nas.DescribeFileSystemsRequest({
          fileSystemId,
        });
        const response = await nasClient.describeFileSystems(request);

        if (
          !response ||
          !response.body ||
          !response.body.fileSystems ||
          !response.body.fileSystems.fileSystem ||
          response.body.fileSystems.fileSystem.length === 0
        ) {
          return null;
        }

        const fs = response.body.fileSystems.fileSystem[0];
        return {
          fileSystemId: fs.fileSystemId ?? fileSystemId,
          fileSystemType: fs.fileSystemType,
          storageType: fs.storageType,
          protocolType: fs.protocolType,
          status: fs.status,
          createTime: fs.createTime,
        };
      } catch {
        return null;
      }
    },

    deleteFileSystem: async (fileSystemId: string): Promise<void> => {
      const request = new nas.DeleteFileSystemRequest({
        fileSystemId,
      });

      await nasClient.deleteFileSystem(request);
    },

    createMountTarget: async (
      fileSystemId: string,
      accessGroupName: string,
      vpcId: string,
      vSwitchId: string,
    ): Promise<NasMountTargetInfo> => {
      const request = new nas.CreateMountTargetRequest({
        fileSystemId,
        accessGroupName,
        networkType: 'Vpc',
        vpcId,
        vSwitchId,
      });

      const response = await nasClient.createMountTarget(request);
      const mountTargetDomain = response.body?.mountTargetDomain;

      if (!mountTargetDomain) {
        throw new Error('Failed to create NAS mount target');
      }

      // Wait for mount target to be ready
      let retries = 0;
      while (retries < 30) {
        const mt = await operations.getMountTarget(fileSystemId, mountTargetDomain);
        if (mt && mt.status === 'Active') {
          return mt;
        }
        await new Promise((resolve) => setTimeout(resolve, 5000));
        retries++;
      }

      return {
        mountTargetDomain,
        fileSystemId,
        vpcId,
        vSwitchId,
        accessGroupName,
      };
    },

    getMountTarget: async (
      fileSystemId: string,
      mountTargetDomain: string,
    ): Promise<NasMountTargetInfo | null> => {
      try {
        const request = new nas.DescribeMountTargetsRequest({
          fileSystemId,
          mountTargetDomain,
        });
        const response = await nasClient.describeMountTargets(request);

        if (
          !response ||
          !response.body ||
          !response.body.mountTargets ||
          !response.body.mountTargets.mountTarget ||
          response.body.mountTargets.mountTarget.length === 0
        ) {
          return null;
        }

        const mt = response.body.mountTargets.mountTarget[0];
        return {
          mountTargetDomain: mt.mountTargetDomain ?? mountTargetDomain,
          fileSystemId,
          vpcId: mt.vpcId,
          vSwitchId: mt.vswId,
          accessGroupName: mt.accessGroup,
          status: mt.status,
        };
      } catch {
        return null;
      }
    },

    deleteMountTarget: async (fileSystemId: string, mountTargetDomain: string): Promise<void> => {
      const request = new nas.DeleteMountTargetRequest({
        fileSystemId,
        mountTargetDomain,
      });

      await nasClient.deleteMountTarget(request);
    },
  };

  return operations;
};

export const createAliyunClient = (context: Context): AliyunClient => {
  const sdkClients = initializeSdkClients(context);

  return {
    fc3: createFc3Operations(sdkClients.fc3),
    sls: createSlsOperations(sdkClients.sls),
    ram: createRamOperations(sdkClients.ram),
    ecs: createEcsOperations(sdkClients.ecs, context),
    nas: createNasOperations(sdkClients.nas),
    oss: sdkClients.oss,
    apigw: sdkClients.apigw,
  };
};
