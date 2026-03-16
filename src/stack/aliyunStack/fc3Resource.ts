import { createAliyunClient } from '../../common/aliyunClient';

import {
  getResource,
  removeResource,
  setResource,
  computeFileHash,
  getContext,
  buildSid,
} from '../../common';
import {
  Context,
  FunctionDomain,
  PartialResourceError,
  ResourceState,
  StateFile,
} from '../../types';
import { extractFc3Definition, Fc3FunctionInfo, functionToFc3Config } from './fc3Types';
import { logger } from '../../common/logger';

type DependentInstance = {
  type: string;
  id: string;
  sid?: string;
  roleArn?: string;
  attributes: Record<string, unknown>;
};

const buildFc3InstanceFromProvider = (info: Fc3FunctionInfo, sid: string) => {
  return {
    type: 'ALIYUN_FC3_FUNCTION',
    sid,
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

const createDependentResources = async (
  context: Context,
  fn: FunctionDomain,
  serviceName: string,
  existingInstances: Array<DependentInstance> = [],
): Promise<{
  logConfig?: { project: string; logstore: string };
  role?: { roleName: string; arn: string };
  securityGroup?: { securityGroupId: string };
  nasConfig?: {
    mountPoints: Array<{
      serverAddr: string;
      mountDir: string;
      fileSystemId: string;
      mountTargetDomain: string;
      accessGroupName: string;
    }>;
  };
  instances: Array<DependentInstance>;
}> => {
  const client = createAliyunClient(context);
  const instances: Array<DependentInstance> = [];
  let logConfig: { project: string; logstore: string } | undefined;
  let securityGroup: { securityGroupId: string } | undefined;
  let nasConfig:
    | {
        mountPoints: Array<{
          serverAddr: string;
          mountDir: string;
          fileSystemId: string;
          mountTargetDomain: string;
          accessGroupName: string;
        }>;
      }
    | undefined;

  const hasSlsProject = existingInstances.some((i) => i.type === 'ALIYUN_SLS_PROJECT');
  const hasRamRole = existingInstances.some((i) => i.type === 'ALIYUN_RAM_ROLE');
  const hasSecurityGroup = existingInstances.some((i) => i.type === 'ALIYUN_ECS_SECURITY_GROUP');
  const hasNasResources = existingInstances.some((i) => i.type === 'ALIYUN_NAS_FILE_SYSTEM');

  if (fn.log) {
    if (hasSlsProject) {
      const slsProjectInstance = existingInstances.find((i) => i.type === 'ALIYUN_SLS_PROJECT');
      const slsLogstoreInstance = existingInstances.find((i) => i.type === 'ALIYUN_SLS_LOGSTORE');
      if (slsProjectInstance && slsLogstoreInstance) {
        const [projectName, logstoreName] = slsLogstoreInstance.id.split('/');
        logConfig = { project: projectName, logstore: logstoreName };
        instances.push(...existingInstances.filter((i) => i.type.startsWith('ALIYUN_SLS_')));
      }
    } else {
      const projectName = `${serviceName}-sls`;
      const logstoreName = `${serviceName}-sls-logstore`;

      logger.info(`Creating SLS project: ${projectName}`);
      const project = await client.sls.createProject(projectName);
      instances.push({ type: 'ALIYUN_SLS_PROJECT', id: projectName, attributes: { ...project } });

      logger.info(`Creating SLS logstore: ${logstoreName}`);
      const logstore = await client.sls.createLogstore(projectName, logstoreName);
      instances.push({
        type: 'ALIYUN_SLS_LOGSTORE',
        id: `${projectName}/${logstoreName}`,
        attributes: { ...logstore },
      });

      logger.info(`Creating SLS index for: ${logstoreName}`);
      const index = await client.sls.createIndex(projectName, logstoreName);
      instances.push({
        type: 'ALIYUN_SLS_INDEX',
        id: `${projectName}/${logstoreName}/index`,
        attributes: { ...index },
      });

      logger.info(
        `Waiting for SLS project and logstore to be ready: ${projectName}/${logstoreName}`,
      );
      await client.sls.waitForProject(projectName);
      await client.sls.waitForLogstore(projectName, logstoreName);

      logConfig = { project: projectName, logstore: logstoreName };
    }
  }

  const roleName = `${serviceName}-fc-role`;
  if (hasRamRole) {
    const ramRoleInstance = existingInstances.find((i) => i.type === 'ALIYUN_RAM_ROLE');
    if (ramRoleInstance) {
      instances.push(ramRoleInstance);
    }
  } else {
    logger.info(`Creating RAM role: ${roleName}`);
    const ramRole = await client.ram.createRole(roleName);
    instances.push({
      type: 'ALIYUN_RAM_ROLE',
      id: roleName,
      roleArn: ramRole.arn,
      attributes: { ...ramRole },
    });
  }

  const ramRoleInstance = instances.find((i) => i.type === 'ALIYUN_RAM_ROLE');
  const role = {
    roleName,
    arn: ramRoleInstance?.roleArn ?? `acs:ram::${context.accountId}:role/${roleName}`,
  };

  if (fn.network) {
    if (hasSecurityGroup) {
      const sgInstance = existingInstances.find((i) => i.type === 'ALIYUN_ECS_SECURITY_GROUP');
      if (sgInstance) {
        instances.push(sgInstance);
        securityGroup = { securityGroupId: sgInstance.id };
      }
    } else {
      const sgName = fn.network.security_group.name;
      logger.info(`Creating security group: ${sgName}`);
      const sg = await client.ecs.createSecurityGroup(
        sgName,
        fn.network.vpc_id,
        fn.network.security_group.ingress,
        fn.network.security_group.egress,
      );
      instances.push({
        type: 'ALIYUN_ECS_SECURITY_GROUP',
        id: sg.securityGroupId,
        attributes: { ...sg },
      });
      securityGroup = { securityGroupId: sg.securityGroupId };
    }
  }

  if (fn.storage?.nas && fn.storage.nas.length > 0 && fn.network) {
    if (hasNasResources) {
      const nasInstances = existingInstances.filter((i) => i.type.startsWith('ALIYUN_NAS_'));
      instances.push(...nasInstances);
      const mountTargetInstances = nasInstances.filter((i) => i.type === 'ALIYUN_NAS_MOUNT_TARGET');
      const nasStorageItems = fn.storage.nas;
      if (mountTargetInstances.length > 0) {
        nasConfig = {
          mountPoints: mountTargetInstances.map((mt, idx) => {
            const [fileSystemId, mountTargetDomain] = mt.id.split('/');
            return {
              serverAddr: `${mountTargetDomain}:/`,
              mountDir: nasStorageItems[idx]?.mount_path ?? '/mnt/nas',
              fileSystemId,
              mountTargetDomain,
              accessGroupName: (mt.attributes?.accessGroupName as string) ?? '',
            };
          }),
        };
      }
    } else {
      const mountPoints: Array<{
        serverAddr: string;
        mountDir: string;
        fileSystemId: string;
        mountTargetDomain: string;
        accessGroupName: string;
      }> = [];

      for (const nasItem of fn.storage.nas) {
        const mountPath = nasItem.mount_path.replace(/\//g, '-').replace(/^-/, '');
        const accessGroupName = `${fn.name}-nas-access-${mountPath}`;

        logger.info(`Creating NAS access group: ${accessGroupName}`);
        const accessGroup = await client.nas.createAccessGroup(accessGroupName);
        instances.push({
          type: 'ALIYUN_NAS_ACCESS_GROUP',
          id: accessGroupName,
          attributes: { ...accessGroup },
        });

        logger.info(`Creating NAS access rule for: ${accessGroupName}`);
        await client.nas.createAccessRule(accessGroupName, '10.0.0.0/8');

        logger.info(`Creating NAS file system for: ${fn.name}`);
        const fileSystem = await client.nas.createFileSystem(nasItem.storage_class, fn.name);
        instances.push({
          type: 'ALIYUN_NAS_FILE_SYSTEM',
          id: fileSystem.fileSystemId,
          attributes: { ...fileSystem },
        });

        logger.info(`Creating NAS mount target for: ${fileSystem.fileSystemId}`);
        const mountTarget = await client.nas.createMountTarget(
          fileSystem.fileSystemId,
          accessGroupName,
          fn.network.vpc_id,
          fn.network.subnet_ids[0],
        );
        instances.push({
          type: 'ALIYUN_NAS_MOUNT_TARGET',
          id: `${fileSystem.fileSystemId}/${mountTarget.mountTargetDomain}`,
          attributes: { ...mountTarget, accessGroupName },
        });

        mountPoints.push({
          serverAddr: `${mountTarget.mountTargetDomain}:/`,
          mountDir: nasItem.mount_path,
          fileSystemId: fileSystem.fileSystemId,
          mountTargetDomain: mountTarget.mountTargetDomain,
          accessGroupName,
        });
      }

      nasConfig = { mountPoints };
    }
  }

  return {
    logConfig,
    role,
    securityGroup,
    nasConfig,
    instances,
  };
};

const deleteDependentResources = async (
  context: Context,
  instances: Array<{
    type: string;
    id: string;
    attributes: Record<string, unknown>;
  }>,
): Promise<void> => {
  const client = createAliyunClient(context);

  for (const instance of [...instances].reverse()) {
    try {
      switch (instance.type) {
        case 'ALIYUN_NAS_MOUNT_TARGET': {
          const [fileSystemId, mountTargetDomain] = instance.id.split('/');
          logger.info(`Deleting NAS mount target: ${instance.id}`);
          await client.nas.deleteMountTarget(fileSystemId, mountTargetDomain);
          break;
        }
        case 'ALIYUN_NAS_FILE_SYSTEM':
          logger.info(`Deleting NAS file system: ${instance.id}`);
          await client.nas.deleteFileSystem(instance.id);
          break;
        case 'ALIYUN_NAS_ACCESS_GROUP':
          logger.info(`Deleting NAS access group: ${instance.id}`);
          await client.nas.deleteAccessGroup(instance.id);
          break;
        case 'ALIYUN_ECS_SECURITY_GROUP':
          logger.info(`Deleting security group: ${instance.id}`);
          await client.ecs.deleteSecurityGroup(instance.id);
          break;
        case 'ALIYUN_RAM_ROLE':
          logger.info(`Deleting RAM role: ${instance.id}`);
          await client.ram.deleteRole(instance.id);
          break;
        case 'ALIYUN_SLS_INDEX': {
          const [projectName, logstoreName] = instance.id.split('/');
          logger.info(`Deleting SLS index: ${instance.id}`);
          await client.sls.deleteIndex(projectName, logstoreName);
          break;
        }
        case 'ALIYUN_SLS_LOGSTORE': {
          const [projectName, logstoreName] = instance.id.split('/');
          logger.info(`Deleting SLS logstore: ${instance.id}`);
          await client.sls.deleteLogstore(projectName, logstoreName);
          break;
        }
        case 'ALIYUN_SLS_PROJECT':
          logger.info(`Deleting SLS project: ${instance.id}`);
          await client.sls.deleteProject(instance.id);
          break;
        default:
          logger.warn(`Unknown resource type: ${instance.type}`);
      }
    } catch (err) {
      logger.error(`Failed to delete resource ${instance.type}:${instance.id}: ${err}`);
    }
  }
};

export const createResource = async (
  context: Context,
  fn: FunctionDomain,
  state: StateFile,
): Promise<StateFile> => {
  const ctx = getContext();
  const serviceName = `${ctx.app}-${ctx.service}`;
  const logicalId = `functions.${fn.key}`;

  const existingResourceState = getResource(state, logicalId);
  const existingDependentInstances = (existingResourceState?.instances ?? []).filter(
    (i) => (i as DependentInstance).type !== 'ALIYUN_FC3_FUNCTION',
  ) as Array<DependentInstance>;

  const dependentResources = await createDependentResources(
    context,
    fn,
    serviceName,
    existingDependentInstances,
  );

  let config = functionToFc3Config(fn);

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
  const codeHash = computeFileHash(codePath);
  const definition = extractFc3Definition(config, codeHash);

  const dependentInstances = dependentResources.instances.map((dep) => ({
    sid:
      dep.sid ??
      buildSid('aliyun', dep.type.replace('ALIYUN_', '').toLowerCase(), context.stage, dep.id),
    id: dep.id,
    type: dep.type,
    ...(dep.roleArn ? { roleArn: dep.roleArn } : {}),
    ...dep.attributes,
  }));

  const taintedResourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: dependentInstances,
    lastUpdated: new Date().toISOString(),
    status: 'tainted',
  };

  const stateAfterDependents = setResource(state, logicalId, taintedResourceState);

  const client = createAliyunClient(context);
  try {
    await client.fc3.createFunction(config, codePath);
  } catch (error) {
    throw new PartialResourceError(
      stateAfterDependents,
      error instanceof Error ? error : new Error(String(error)),
    );
  }

  const functionInfo = await client.fc3.getFunction(fn.name);
  if (!functionInfo) {
    throw new Error(`Failed to refresh state for function: ${fn.name}`);
  }

  const sid = buildSid('aliyun', 'fc3', context.stage, fn.name);

  const fcInstance = buildFc3InstanceFromProvider(functionInfo, sid);

  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [fcInstance, ...dependentInstances],
    lastUpdated: new Date().toISOString(),
    status: 'ready',
  };

  return setResource(stateAfterDependents, logicalId, resourceState);
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
  const serviceName = `${ctx.app}-${ctx.service}`;
  const logicalId = `functions.${fn.key}`;

  const existingState = getResource(state, logicalId);
  const existingInstances = (existingState?.instances ?? []) as Array<DependentInstance>;

  const hasSlsResources = existingInstances.some((i) => i.type === 'ALIYUN_SLS_PROJECT');
  const hasRamRole = existingInstances.some((i) => i.type === 'ALIYUN_RAM_ROLE');
  const hasSecurityGroup = existingInstances.some((i) => i.type === 'ALIYUN_ECS_SECURITY_GROUP');
  const hasNasResources = existingInstances.some((i) => i.type === 'ALIYUN_NAS_FILE_SYSTEM');

  const newDependentInstances: Array<DependentInstance> = [];
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
        arn: ramRoleInstance.roleArn ?? `acs:ram::${context.accountId}:role/${ramRoleInstance.id}`,
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
  const sid = buildSid('aliyun', 'fc3', context.stage, fn.name);

  const fcInstance = buildFc3InstanceFromProvider(functionInfo, sid);
  const existingDependentInstances = existingInstances
    .filter((i) => i.type !== 'ALIYUN_FC3_FUNCTION')
    .map((i) => {
      const { sid: existingSid, id: existingId, ...rest } = i;
      return {
        sid:
          existingSid ??
          buildSid(
            'aliyun',
            i.type?.toString().replace('ALIYUN_', '').toLowerCase() ?? '',
            context.stage,
            existingId?.toString() ?? '',
          ),
        id: existingId?.toString() ?? '',
        ...rest,
      };
    });
  const newDependentInstancesMapped = newDependentInstances.map((dep) => ({
    sid:
      dep.sid ??
      buildSid('aliyun', dep.type.replace('ALIYUN_', '').toLowerCase(), context.stage, dep.id),
    id: dep.id,
    type: dep.type,
    ...(dep.roleArn ? { roleArn: dep.roleArn } : {}),
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
  const existingState = getResource(state, logicalId);
  const existingInstances = (existingState?.instances ?? []) as Array<DependentInstance>;

  const hasFcFunction = existingInstances.some((i) => i.type === 'ALIYUN_FC3_FUNCTION');

  const client = createAliyunClient(context);
  if (hasFcFunction) {
    try {
      await client.fc3.deleteFunction(functionName);
    } catch (err) {
      const errorCode = (err as { code?: string })?.code;
      if (errorCode === 'FunctionNotFound') {
        logger.warn(`Function ${functionName} not found in provider, skipping deletion`);
      } else {
        throw err;
      }
    }
  }

  const dependentInstances = existingInstances.filter(
    (i) => i.type !== 'ALIYUN_FC3_FUNCTION' && !i.type.includes('undefined'),
  );
  if (dependentInstances.length > 0) {
    await deleteDependentResources(context, dependentInstances);
  }

  return removeResource(state, logicalId);
};
