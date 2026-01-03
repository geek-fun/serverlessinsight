import { Context, FunctionDomain, ResourceState, StateFile } from '../../types';
import {
  createFc3Function,
  deleteFc3Function,
  getFc3Function,
  updateFc3FunctionCode,
  updateFc3FunctionConfiguration,
} from './fc3Provider';
import { functionToFc3Config, extractFc3Definition, Fc3FunctionInfo } from './fc3Types';
import { setResource, removeResource } from '../../common/stateManager';
import { computeFileHash } from '../../common/hashUtils';

const buildFc3InstanceFromProvider = (info: Fc3FunctionInfo, arn: string) => {
  return {
    arn,
    id: info.functionName ?? '',
    functionName: info.functionName ?? null,
    functionId: info.functionId ?? null,
    runtime: info.runtime ?? null,
    handler: info.handler ?? null,
    memorySize: info.memorySize ?? null,
    timeout: info.timeout ?? null,
    diskSize: info.diskSize ?? null,
    cpu: info.cpu ?? null,
    environment: info.environmentVariables ?? {},
    vpcConfig: info.vpcConfig
      ? {
          vpcId: info.vpcConfig.vpcId ?? null,
          vSwitchIds: info.vpcConfig.vSwitchIds ?? [],
          securityGroupId: info.vpcConfig.securityGroupId ?? null,
        }
      : {},
    gpuConfig: info.gpuConfig
      ? {
          gpuMemorySize: info.gpuConfig.gpuMemorySize ?? null,
          gpuType: info.gpuConfig.gpuType ?? null,
        }
      : {},
    nasConfig: info.nasConfig
      ? {
          userId: info.nasConfig.userId ?? null,
          groupId: info.nasConfig.groupId ?? null,
          mountPoints:
            info.nasConfig.mountPoints?.map((mp) => ({
              serverAddr: mp.serverAddr ?? null,
              mountDir: mp.mountDir ?? null,
              enableTls: mp.enableTls ?? null,
            })) ?? [],
        }
      : {},
    logConfig: info.logConfig
      ? {
          project: info.logConfig.project ?? null,
          logstore: info.logConfig.logstore ?? null,
          enableRequestMetrics: info.logConfig.enableRequestMetrics ?? null,
          enableInstanceMetrics: info.logConfig.enableInstanceMetrics ?? null,
          logBeginRule: info.logConfig.logBeginRule ?? null,
        }
      : {},
    customContainerConfig: info.customContainerConfig
      ? {
          image: info.customContainerConfig.image ?? null,
          entrypoint: info.customContainerConfig.entrypoint ?? [],
          command: info.customContainerConfig.command ?? [],
          port: info.customContainerConfig.port ?? null,
          accelerationType: info.customContainerConfig.accelerationType ?? null,
        }
      : {},
    description: info.description ?? null,
    internetAccess: info.internetAccess ?? null,
    role: info.role ?? null,
    codeChecksum: info.codeChecksum ?? null,
    codeSize: info.codeSize ?? null,
    createdTime: info.createdTime ?? null,
    lastModifiedTime: info.lastModifiedTime ?? null,
    state: info.state ?? null,
    stateReason: info.stateReason ?? null,
    stateReasonCode: info.stateReasonCode ?? null,
    lastUpdateStatus: info.lastUpdateStatus ?? null,
    lastUpdateStatusReason: info.lastUpdateStatusReason ?? null,
    lastUpdateStatusReasonCode: info.lastUpdateStatusReasonCode ?? null,
  };
};

export const createResource = async (
  context: Context,
  fn: FunctionDomain,
  state: StateFile,
): Promise<StateFile> => {
  const config = functionToFc3Config(fn);
  const codePath = fn.code!.path;

  await createFc3Function(context, config, codePath);

  // Refresh state from provider to get all attributes
  const functionInfo = await getFc3Function(context, fn.name);
  if (!functionInfo) {
    throw new Error(`Failed to refresh state for function: ${fn.name}`);
  }

  const codeHash = computeFileHash(codePath);
  const definition = extractFc3Definition(config, codeHash);
  const arn =
    functionInfo.functionArn ??
    `arn:acs:fc:${context.region}:${context.accountId}:function/${fn.name}`;
  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [buildFc3InstanceFromProvider(functionInfo, arn)],
    lastUpdated: new Date().toISOString(),
  };

  const logicalId = `functions.${fn.key}`;
  return setResource(state, logicalId, resourceState);
};

export const readResource = async (context: Context, functionName: string) => {
  return await getFc3Function(context, functionName);
};

export const updateResource = async (
  context: Context,
  fn: FunctionDomain,
  state: StateFile,
): Promise<StateFile> => {
  const config = functionToFc3Config(fn);
  const codePath = fn.code!.path;

  // Update configuration
  await updateFc3FunctionConfiguration(context, config);

  // Update code
  await updateFc3FunctionCode(context, fn.name, codePath);

  // Refresh state from provider to get all attributes
  const functionInfo = await getFc3Function(context, fn.name);
  if (!functionInfo) {
    throw new Error(`Failed to refresh state for function: ${fn.name}`);
  }

  const codeHash = computeFileHash(codePath);
  const definition = extractFc3Definition(config, codeHash);
  const arn =
    functionInfo.functionArn ??
    `arn:acs:fc:${context.region}:${context.accountId}:function/${fn.name}`;
  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [buildFc3InstanceFromProvider(functionInfo, arn)],
    lastUpdated: new Date().toISOString(),
  };

  const logicalId = `functions.${fn.key}`;
  return setResource(state, logicalId, resourceState);
};

export const deleteResource = async (
  context: Context,
  functionName: string,
  logicalId: string,
  state: StateFile,
): Promise<StateFile> => {
  await deleteFc3Function(context, functionName);
  return removeResource(state, logicalId);
};
