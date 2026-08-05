import Fc3Client from '@alicloud/fc20230330';
import * as fc from '@alicloud/fc20230330';
import fs from 'node:fs';
import { Fc3FunctionConfig, Fc3FunctionInfo } from './types';
import { pollUntil, PollingTimeoutError } from '../polling';
import { SCF_STATUS_POLL_INTERVAL_MS, SCF_STATUS_POLL_MAX_ATTEMPTS } from '../constants';

type Fc3SdkClient = Fc3Client;

/* istanbul ignore next */ export type OssCodeLocation = {
  ossBucketName: string;
  ossObjectName: string;
};

const buildCodeLocation = (codePath: string, ossCode?: OssCodeLocation): fc.InputCodeLocation => {
  if (ossCode) {
    return new fc.InputCodeLocation({
      ossBucketName: ossCode.ossBucketName,
      ossObjectName: ossCode.ossObjectName,
    });
  }
  const codeBuffer = fs.readFileSync(codePath);
  const codeBase64 = codeBuffer.toString('base64');
  return new fc.InputCodeLocation({ zipFile: codeBase64 });
};

/* istanbul ignore next */ export const createFc3Operations = (fc3Client: Fc3SdkClient) => {
  const operations = {
    waitForFunctionActive: async (functionName: string): Promise<Fc3FunctionInfo | null> => {
      try {
        return await pollUntil({
          description: `FC3 function ${functionName} to become Active`,
          fetch: () => operations.getFunction(functionName),
          isDone: (info) => {
            if (info?.state === 'Failed') {
              throw new Error(
                `FC3 function ${functionName} is in Failed state (reason: ${
                  info.stateReason ?? 'unknown'
                })`,
              );
            }
            return info?.state === 'Active';
          },
          intervalMs: SCF_STATUS_POLL_INTERVAL_MS,
          maxAttempts: SCF_STATUS_POLL_MAX_ATTEMPTS,
        });
      } catch (e) {
        if (e instanceof PollingTimeoutError) {
          throw new Error(`Timed out waiting for FC3 function ${functionName} to become Active`, {
            cause: e,
          });
        }
        throw e;
      }
    },

    waitForFunctionDeleted: async (functionName: string): Promise<void> => {
      try {
        await pollUntil({
          description: `FC3 function ${functionName} to be deleted`,
          fetch: () => operations.getFunction(functionName),
          isDone: (info) => info === null,
          intervalMs: SCF_STATUS_POLL_INTERVAL_MS,
          maxAttempts: SCF_STATUS_POLL_MAX_ATTEMPTS,
        });
      } catch (e) {
        if (e instanceof PollingTimeoutError) {
          throw new Error(`Timed out waiting for FC3 function ${functionName} to be deleted`, {
            cause: e,
          });
        }
        throw e;
      }
    },

    createFunction: async (
      config: Fc3FunctionConfig,
      codePath: string,
      ossCode?: OssCodeLocation,
    ): Promise<void> => {
      const createFunctionInput = new fc.CreateFunctionInput({
        functionName: config.functionName,
        runtime: config.runtime,
        handler: config.handler,
        memorySize: config.memorySize,
        timeout: config.timeout,
        code: buildCodeLocation(codePath, ossCode),
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
        ...(config.tags && {
          tags: config.tags.map((t) => new fc.Tag({ key: t.key, value: t.value })),
        }),
      });

      const request = new fc.CreateFunctionRequest({
        body: createFunctionInput,
      });

      await fc3Client.createFunction(request);

      // CreateFunction is async on Aliyun FC3 — the function stays in 'Creating'
      // until the platform finishes provisioning. Follow-up calls (e.g.
      // createTrigger) fail if issued too early, so poll until Active before
      // returning.
      await operations.waitForFunctionActive(config.functionName);
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
          tags: body.tags?.map((t) => ({ Key: t.key, Value: t.value })),
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

      // Wait for Active before issuing the update — updating a function that is
      // still provisioning (e.g. right after create) races the platform.
      await operations.waitForFunctionActive(config.functionName);
      await fc3Client.updateFunction(config.functionName, request);
    },

    updateFunctionCode: async (
      functionName: string,
      codePath: string,
      ossCode?: OssCodeLocation,
    ): Promise<void> => {
      const updateFunctionInput = new fc.UpdateFunctionInput({
        code: buildCodeLocation(codePath, ossCode),
      });

      const request = new fc.UpdateFunctionRequest({
        body: updateFunctionInput,
      });

      await operations.waitForFunctionActive(functionName);
      await fc3Client.updateFunction(functionName, request);
    },

    deleteFunction: async (functionName: string): Promise<void> => {
      await fc3Client.deleteFunction(functionName);

      // DeleteFunction returns immediately — wait for the function to be gone so
      // a subsequent create (retry) does not collide with a still-deleting function.
      await operations.waitForFunctionDeleted(functionName);
    },

    createTrigger: async (
      functionName: string,
      triggerName: string,
      triggerType: string,
      triggerConfig: Record<string, unknown>,
      qualifier?: string,
    ): Promise<void> => {
      const createTriggerInput = new fc.CreateTriggerInput({
        triggerName,
        triggerType,
        triggerConfig: JSON.stringify(triggerConfig),
        ...(qualifier ? { qualifier } : {}),
      });
      const request = new fc.CreateTriggerRequest({
        body: createTriggerInput,
      });
      await fc3Client.createTrigger(functionName, request);
    },

    deleteTrigger: async (functionName: string, triggerName: string): Promise<void> => {
      await fc3Client.deleteTrigger(functionName, triggerName);
    },

    createCustomDomain: async (
      domainName: string,
      protocol: string,
      fnName: string,
      certConfig?: { certName: string; certificate: string; privateKey: string },
    ): Promise<void> => {
      const createCustomDomainInput = new fc.CreateCustomDomainInput({
        domainName,
        protocol,
        ...(certConfig ? { certConfig: new fc.CertConfig(certConfig) } : {}),
        routeConfig: new fc.RouteConfig({
          routes: [
            new fc.PathConfig({
              path: '/*',
              functionName: fnName,
            }),
          ],
        }),
      });
      const request = new fc.CreateCustomDomainRequest({
        body: createCustomDomainInput,
      });
      await fc3Client.createCustomDomain(request);
    },

    getCustomDomain: async (
      domainName: string,
    ): Promise<{
      domainName?: string;
      protocol?: string;
      certConfig?: { certName?: string; certificateId?: string };
    } | null> => {
      try {
        const response = await fc3Client.getCustomDomain(domainName);
        if (!response || !response.body) return null;
        return {
          domainName: response.body.domainName,
          protocol: response.body.protocol,
          certConfig: response.body.certConfig
            ? {
                certName: response.body.certConfig.certName,
                certificateId: response.body.certConfig.certificateId,
              }
            : undefined,
        };
      } catch (error: unknown) {
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          error.code === 'CustomDomainNotFound'
        ) {
          return null;
        }
        throw error;
      }
    },

    deleteCustomDomain: async (domainName: string): Promise<void> => {
      await fc3Client.deleteCustomDomain(domainName);
    },
  };

  return operations;
};
