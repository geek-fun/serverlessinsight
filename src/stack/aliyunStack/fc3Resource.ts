import { createAliyunClient } from '../../common/aliyunClient';

import {
  getResource,
  removeResource,
  setResource,
  computeFileHash,
  getContext,
} from '../../common';
import { Context, FunctionDomain, ResourceState, StateFile } from '../../types';
import { createDependentResources, deleteDependentResources } from './dependentResourceProvider';
import { extractFc3Definition, Fc3FunctionInfo, functionToFc3Config } from './fc3Types';

const buildFc3InstanceFromProvider = (info: Fc3FunctionInfo, arn: string) => {
  return {
    type: 'ALIYUN_FC3_FUNCTION',
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
  const ctx = getContext();
  const serviceName = ctx.stackName ?? fn.name;

  // Create dependent resources (SLS, RAM, ECS SecurityGroup, NAS)
  const dependentResources = await createDependentResources(context, fn, serviceName);

  // Build FC3 config with dependent resources
  let config = functionToFc3Config(fn);

  // Update config with dependent resources
  if (dependentResources.logConfig) {
    config = {
      ...config,
      logConfig: {
        project: dependentResources.logConfig.project,
        logstore: dependentResources.logConfig.logstore,
        enableRequestMetrics: true,
      },
    };
  }

  if (dependentResources.role) {
    config = {
      ...config,
      role: dependentResources.role.arn,
    };
  }

  if (dependentResources.securityGroup && fn.network) {
    config = {
      ...config,
      vpcConfig: {
        vpcId: fn.network.vpc_id,
        vSwitchIds: fn.network.subnet_ids,
        securityGroupId: dependentResources.securityGroup.securityGroupId,
      },
    };
  }

  if (dependentResources.nasConfig) {
    config = {
      ...config,
      nasConfig: {
        userId: -1,
        groupId: -1,
        mountPoints: dependentResources.nasConfig.mountPoints.map((mp) => ({
          serverAddr: mp.serverAddr,
          mountDir: mp.mountDir,
        })),
      },
    };
  }

  const codePath = fn.code!.path;
  const client = createAliyunClient(context);
  await client.fc3.createFunction(config, codePath);

  // Refresh state from provider to get all attributes
  const functionInfo = await client.fc3.getFunction(fn.name);
  if (!functionInfo) {
    throw new Error(`Failed to refresh state for function: ${fn.name}`);
  }

  const codeHash = computeFileHash(codePath);
  const definition = extractFc3Definition(config, codeHash);
  const arn =
    functionInfo.functionArn ??
    `arn:acs:fc:${context.region}:${context.accountId}:function/${fn.name}`;

  // Build instances array with FC function as first item, followed by dependent resources
  const fcInstance = buildFc3InstanceFromProvider(functionInfo, arn);
  const dependentInstances = dependentResources.instances.map((dep) => ({
    arn:
      dep.arn ??
      `arn:acs:${dep.type.toLowerCase()}:${context.region}:${context.accountId}:${dep.id}`,
    id: dep.id,
    type: dep.type,
    ...dep.attributes,
  }));

  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [fcInstance, ...dependentInstances],
    lastUpdated: new Date().toISOString(),
  };

  const logicalId = `functions.${fn.key}`;
  return setResource(state, logicalId, resourceState);
};

export const readResource = async (context: Context, functionName: string) => {
  const client = createAliyunClient(context);
  return await client.fc3.getFunction(functionName);
};

export const updateResource = async (
  context: Context,
  fn: FunctionDomain,
  state: StateFile,
): Promise<StateFile> => {
  const ctx = getContext();
  const serviceName = ctx.stackName ?? fn.name;
  const logicalId = `functions.${fn.key}`;

  // Get existing resource state to check if dependent resources exist
  const existingState = getResource(state, logicalId);
  const existingInstances = (existingState?.instances ?? []) as Array<{
    type: string;
    id: string;
    arn?: string;
    attributes: Record<string, unknown>;
  }>;

  // Check if we need to create new dependent resources
  const hasSlsResources = existingInstances.some((i) => i.type === 'ALIYUN_SLS_PROJECT');
  const hasRamRole = existingInstances.some((i) => i.type === 'ALIYUN_RAM_ROLE');
  const hasSecurityGroup = existingInstances.some((i) => i.type === 'ALIYUN_ECS_SECURITY_GROUP');
  const hasNasResources = existingInstances.some((i) => i.type === 'ALIYUN_NAS_FILE_SYSTEM');

  const newDependentInstances: Array<{
    type: string;
    id: string;
    arn?: string;
    attributes: Record<string, unknown>;
  }> = [];
  let logConfig: { project: string; logstore: string } | undefined;
  let role: { roleName: string; arn: string } | undefined;
  let securityGroup: { securityGroupId: string } | undefined;
  let nasConfig:
    | {
        mountPoints: Array<{
          serverAddr: string;
          mountDir: string;
        }>;
      }
    | undefined;

  // Create new dependent resources if they don't exist
  if (fn.log && !hasSlsResources) {
    const deps = await createDependentResources(
      context,
      { ...fn, network: undefined, storage: { ...fn.storage, nas: undefined } },
      serviceName,
    );
    logConfig = deps.logConfig;
    newDependentInstances.push(...deps.instances.filter((i) => i.type.startsWith('ALIYUN_SLS_')));
  } else if (hasSlsResources) {
    const slsProjectInstance = existingInstances.find((i) => i.type === 'ALIYUN_SLS_PROJECT');
    const slsLogstoreInstance = existingInstances.find((i) => i.type === 'ALIYUN_SLS_LOGSTORE');
    if (slsProjectInstance && slsLogstoreInstance) {
      const [projectName, logstoreName] = slsLogstoreInstance.id.split('/');
      logConfig = { project: projectName, logstore: logstoreName };
    }
  }

  if (!hasRamRole) {
    const deps = await createDependentResources(
      context,
      { ...fn, log: false, network: undefined, storage: { ...fn.storage, nas: undefined } },
      serviceName,
    );
    role = deps.role;
    newDependentInstances.push(...deps.instances.filter((i) => i.type === 'ALIYUN_RAM_ROLE'));
  } else {
    const ramRoleInstance = existingInstances.find((i) => i.type === 'ALIYUN_RAM_ROLE');
    if (ramRoleInstance) {
      role = {
        roleName: ramRoleInstance.id,
        arn: ramRoleInstance.arn ?? `acs:ram::${context.accountId}:role/${ramRoleInstance.id}`,
      };
    }
  }

  if (fn.network && !hasSecurityGroup) {
    const deps = await createDependentResources(
      context,
      { ...fn, log: false, storage: { ...fn.storage, nas: undefined } },
      serviceName,
    );
    securityGroup = deps.securityGroup;
    newDependentInstances.push(
      ...deps.instances.filter((i) => i.type === 'ALIYUN_ECS_SECURITY_GROUP'),
    );
  } else if (hasSecurityGroup) {
    const sgInstance = existingInstances.find((i) => i.type === 'ALIYUN_ECS_SECURITY_GROUP');
    if (sgInstance) {
      securityGroup = { securityGroupId: sgInstance.id };
    }
  }

  if (fn.storage?.nas && fn.storage.nas.length > 0 && fn.network && !hasNasResources) {
    const deps = await createDependentResources(context, { ...fn, log: false }, serviceName);
    nasConfig = deps.nasConfig;
    newDependentInstances.push(...deps.instances.filter((i) => i.type.startsWith('ALIYUN_NAS_')));
  } else if (hasNasResources) {
    const mountTargetInstances = existingInstances.filter(
      (i) => i.type === 'ALIYUN_NAS_MOUNT_TARGET',
    );
    const nasStorageItems = fn.storage?.nas ?? [];
    if (mountTargetInstances.length > 0 && nasStorageItems.length > 0) {
      nasConfig = {
        mountPoints: mountTargetInstances.map((mt, idx) => ({
          serverAddr: `${mt.id.split('/')[1]}:/`,
          mountDir: nasStorageItems[idx]?.mount_path ?? '/mnt/nas',
        })),
      };
    }
  }

  // Build FC3 config with dependent resources
  let config = functionToFc3Config(fn);

  if (logConfig) {
    config = {
      ...config,
      logConfig: {
        project: logConfig.project,
        logstore: logConfig.logstore,
        enableRequestMetrics: true,
      },
    };
  }

  if (role) {
    config = {
      ...config,
      role: role.arn,
    };
  }

  if (securityGroup && fn.network) {
    config = {
      ...config,
      vpcConfig: {
        vpcId: fn.network.vpc_id,
        vSwitchIds: fn.network.subnet_ids,
        securityGroupId: securityGroup.securityGroupId,
      },
    };
  }

  if (nasConfig) {
    config = {
      ...config,
      nasConfig: {
        userId: -1,
        groupId: -1,
        mountPoints: nasConfig.mountPoints,
      },
    };
  }

  const codePath = fn.code!.path;
  const client = createAliyunClient(context);

  await client.fc3.updateFunctionConfiguration(config);
  await client.fc3.updateFunctionCode(fn.name, codePath);

  const functionInfo = await client.fc3.getFunction(fn.name);
  if (!functionInfo) {
    throw new Error(`Failed to refresh state for function: ${fn.name}`);
  }

  const codeHash = computeFileHash(codePath);
  const definition = extractFc3Definition(config, codeHash);
  const arn =
    functionInfo.functionArn ??
    `arn:acs:fc:${context.region}:${context.accountId}:function/${fn.name}`;

  // Build instances array: FC function + existing dependent resources + new dependent resources
  const fcInstance = buildFc3InstanceFromProvider(functionInfo, arn);
  const existingDependentInstances = existingInstances
    .filter((i) => i.type !== 'ALIYUN_FC3_FUNCTION')
    .map((i) => {
      const { arn: existingArn, id: existingId, ...rest } = i;
      return {
        arn:
          existingArn ??
          `arn:acs:${i.type?.toString().toLowerCase()}:${context.region}:${context.accountId}:${existingId}`,
        id: existingId?.toString() ?? '',
        ...rest,
      };
    });
  const newDependentInstancesMapped = newDependentInstances.map((dep) => ({
    arn:
      dep.arn ??
      `arn:acs:${dep.type.toLowerCase()}:${context.region}:${context.accountId}:${dep.id}`,
    id: dep.id,
    type: dep.type,
    ...dep.attributes,
  }));

  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [fcInstance, ...existingDependentInstances, ...newDependentInstancesMapped],
    lastUpdated: new Date().toISOString(),
  };

  return setResource(state, logicalId, resourceState);
};

export const deleteResource = async (
  context: Context,
  functionName: string,
  logicalId: string,
  state: StateFile,
): Promise<StateFile> => {
  // Get existing resource state to find dependent resources
  const existingState = getResource(state, logicalId);
  const existingInstances = (existingState?.instances ?? []) as Array<{
    type: string;
    id: string;
    arn?: string;
    attributes: Record<string, unknown>;
  }>;

  // Delete FC function first
  const client = createAliyunClient(context);
  await client.fc3.deleteFunction(functionName);

  // Delete dependent resources
  const dependentInstances = existingInstances.filter(
    (i) => i.type !== 'ALIYUN_FC3_FUNCTION' && !i.type.includes('undefined'),
  );
  if (dependentInstances.length > 0) {
    await deleteDependentResources(context, dependentInstances);
  }

  return removeResource(state, logicalId);
};
