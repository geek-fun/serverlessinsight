import Fc3Client from '@alicloud/fc20230330';
import * as fc from '@alicloud/fc20230330';
import { Fc3FunctionConfig, Fc3FunctionInfo } from './types';

type Fc3SdkClient = Fc3Client;

export // FC3 operations
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