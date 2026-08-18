import { createAliyunClient } from '../../common/aliyunClient';
import { OssCodeLocation } from '../../common/aliyunClient/fc3Operations';
import fs from 'node:fs';
import path from 'node:path';

import {
  getResource,
  removeResource,
  setResource,
  computeZipContentHash,
  getContext,
  buildSid,
  attributesEqual,
  mapAuthType,
  mapAliyunAccess,
  ProviderEnum,
} from '../../common';
import {
  FC3_CODE_INLINE_SIZE_LIMIT,
  RAM_ROLE_PROPAGATION_DELAY_MS,
  SI_BOOTSTRAP_BUCKET_PREFIX,
} from '../../common/constants';
import {
  Context,
  FunctionDomain,
  HttpTrigger,
  PartialResourceError,
  ResourceAttributes,
  ResourceState,
  StateFile,
} from '../../types';
import { extractFc3Definition, Fc3FunctionInfo, functionToFc3Config } from './fc3Types';
import { logger } from '../../common/logger';
import type { IamStatement } from '../../common/iamStatements';
import { lang } from '../../lang';
import { OWNERSHIP_TAG_KEY, buildOwnershipTagValue, isOwnedByStack } from '../ownershipTag';
import { isResourceAlreadyExistsError } from '../alreadyExists';

type DependentInstance = {
  type: string;
  id: string;
  sid?: string;
  roleArn?: string;
  external?: boolean;
  attributes: Record<string, unknown>;
};

const RECOVERY_GET_FUNCTION_DELAY_MS = 1500;

const delay = async (ms: number): Promise<void> => {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const getTrustedServicesForFunction = (context: Context, fnKey: string): string[] => {
  const fnHasApiGateway = context.iac?.events?.some((event) =>
    event.triggers?.some((trigger) => String(trigger.backend) === `\${functions.${fnKey}}`),
  );
  return fnHasApiGateway ? ['fc.aliyuncs.com', 'apigateway.aliyuncs.com'] : ['fc.aliyuncs.com'];
};

const isRecoverableCreateError = (error: unknown): boolean => {
  const code =
    error && typeof error === 'object' && 'code' in error && typeof error.code === 'string'
      ? error.code.toLowerCase()
      : '';

  const message =
    error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();

  return (
    code === 'readtimeout' ||
    code === 'timeout' ||
    code === 'requesttimeout' ||
    code === 'econnreset' ||
    code === 'etimedout' ||
    message.includes('readtimeout') ||
    message.includes('timeout') ||
    message.includes('socket hang up') ||
    message.includes('econnreset') ||
    message.includes('etimedout')
  );
};

const ensureOssCodeUpload = async (
  client: ReturnType<typeof createAliyunClient>,
  codePath: string,
  region: string,
  functionName: string,
): Promise<OssCodeLocation | undefined> => {
  const fileSize = fs.statSync(codePath).size;
  if (fileSize <= FC3_CODE_INLINE_SIZE_LIMIT) {
    return undefined;
  }

  const bucketName = `${SI_BOOTSTRAP_BUCKET_PREFIX}-${region}`;
  logger.info(
    `Code package ${path.basename(codePath)} is ${(fileSize / (1024 * 1024)).toFixed(1)}MB, uploading to OSS bucket ${bucketName}`,
  );

  const existingBucket = await client.oss.getBucket(bucketName);
  if (!existingBucket) {
    logger.info(lang.__('CREATING_BOOTSTRAP_BUCKET', { bucketName }));
    await client.oss.createBucket({ bucketName });
  }

  const codeHash = await computeZipContentHash(codePath);
  const ossObjectName = `fc3-code/${functionName}/${codeHash}.zip`;

  await client.oss.putFile(bucketName, ossObjectName, codePath);
  logger.info(lang.__('UPLOADED_CODE_TO_OSS', { bucketName, objectName: ossObjectName }));

  return { ossBucketName: bucketName, ossObjectName };
};

const buildFc3InstanceFromProvider = (info: Fc3FunctionInfo, sid: string) => {
  return {
    type: 'ALIYUN_FC3_FUNCTION',
    sid,
    id: info.functionName ?? '',
    functionName: info.functionName ?? null,
    functionArn: info.functionArn ?? null,
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
    tags: info.tags?.map((tag) => ({
      key: tag.Key ?? null,
      value: tag.Value ?? null,
    })),
  };
};

const buildHttpTriggerConfig = (
  trigger: HttpTrigger,
): { authType: string; methods: string[]; disableURLInternet?: boolean } => {
  const authType = mapAuthType(ProviderEnum.ALIYUN, trigger.auth_type);
  const { disableURLInternet } = mapAliyunAccess(trigger.access);
  return {
    authType,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH'],
    ...(disableURLInternet !== undefined ? { disableURLInternet } : {}),
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
      const projectName = `${serviceName}-${context.stage}-sls`;
      const logstoreName = `${serviceName}-${context.stage}-sls-logstore`;

      logger.info(lang.__('CREATING_SLS_PROJECT', { projectName }));
      const project = await client.sls.createProject(projectName);
      instances.push({ type: 'ALIYUN_SLS_PROJECT', id: projectName, attributes: { ...project } });

      logger.info(lang.__('CREATING_SLS_LOGSTORE', { logstoreName }));
      const logstore = await client.sls.createLogstore(projectName, logstoreName);
      instances.push({
        type: 'ALIYUN_SLS_LOGSTORE',
        id: `${projectName}/${logstoreName}`,
        attributes: { ...logstore },
      });

      logger.info(lang.__('CREATING_SLS_INDEX', { logstoreName }));
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

  const iamConfig = fn.iam?.role;
  const statements = iamConfig && typeof iamConfig !== 'string' ? iamConfig.statements : undefined;
  const managedPolicies =
    iamConfig && typeof iamConfig !== 'string' ? iamConfig.managed_policies : undefined;
  const customRoleName = iamConfig && typeof iamConfig !== 'string' ? iamConfig.name : undefined;
  const defaultRoleName = `${serviceName}-${context.stage}-fc-role`;

  const trustedServices = getTrustedServicesForFunction(context, fn.key);

  const isExternalRole = typeof iamConfig === 'string';

  if (isExternalRole) {
    // External role - use ARN directly, skip creation and management
    instances.push({
      type: 'ALIYUN_RAM_ROLE',
      id: iamConfig,
      roleArn: iamConfig,
      external: true,
      attributes: {} as Record<string, unknown>,
    });
  } else if (hasRamRole) {
    const ramRoleInstance = existingInstances.find((i) => i.type === 'ALIYUN_RAM_ROLE');
    if (ramRoleInstance) {
      instances.push(ramRoleInstance);
      await client.ram.updateRoleTrustPolicy(ramRoleInstance.id, trustedServices);
    }
  } else {
    const roleName = customRoleName ?? defaultRoleName;
    logger.info(lang.__('CREATING_RAM_ROLE', { roleName }));
    const ramRole = await client.ram.createRole(
      roleName,
      trustedServices,
      undefined,
      statements,
      managedPolicies,
    );
    instances.push({
      type: 'ALIYUN_RAM_ROLE',
      id: roleName,
      roleArn: ramRole.arn,
      attributes: { ...ramRole },
    });
    await delay(RAM_ROLE_PROPAGATION_DELAY_MS);
  }

  const ramRoleInstance = instances.find((i) => i.type === 'ALIYUN_RAM_ROLE');
  const role = isExternalRole
    ? { roleName: '', arn: iamConfig }
    : {
        roleName: customRoleName ?? defaultRoleName,
        arn:
          ramRoleInstance?.roleArn ??
          `acs:ram::${context.accountId}:role/${customRoleName ?? defaultRoleName}`,
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
      logger.info(lang.__('CREATING_SECURITY_GROUP', { sgName }));
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
        const accessGroupName = `${fn.name}-${context.stage}-nas-access-${mountPath}`;

        logger.info(lang.__('CREATING_NAS_ACCESS_GROUP', { accessGroupName }));
        const accessGroup = await client.nas.createAccessGroup(accessGroupName);

        logger.info(lang.__('CREATING_NAS_ACCESS_RULE', { accessGroupName }));
        const accessRule = await client.nas.createAccessRule(accessGroupName, '10.0.0.0/8');

        instances.push({
          type: 'ALIYUN_NAS_ACCESS_GROUP',
          id: accessGroupName,
          attributes: { ...accessGroup, accessRules: [accessRule] },
        });

        logger.info(lang.__('CREATING_NAS_FILE_SYSTEM', { name: fn.name }));
        const fileSystem = await client.nas.createFileSystem(nasItem.storage_class, fn.name);
        instances.push({
          type: 'ALIYUN_NAS_FILE_SYSTEM',
          id: fileSystem.fileSystemId,
          attributes: { ...fileSystem },
        });

        logger.info(
          lang.__('CREATING_NAS_MOUNT_TARGET', { fileSystemId: fileSystem.fileSystemId }),
        );
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
    switch (instance.type) {
      case 'ALIYUN_NAS_MOUNT_TARGET': {
        const [fileSystemId, mountTargetDomain] = instance.id.split('/');
        logger.info(lang.__('DELETING_NAS_MOUNT_TARGET', { id: instance.id }));
        await client.nas.deleteMountTarget(fileSystemId, mountTargetDomain);
        break;
      }
      case 'ALIYUN_NAS_FILE_SYSTEM':
        logger.info(lang.__('DELETING_NAS_FILE_SYSTEM', { id: instance.id }));
        await client.nas.deleteFileSystem(instance.id);
        break;
      case 'ALIYUN_NAS_ACCESS_GROUP':
        logger.info(lang.__('DELETING_NAS_ACCESS_GROUP', { id: instance.id }));
        await client.nas.deleteAccessGroup(instance.id);
        break;
      case 'ALIYUN_ECS_SECURITY_GROUP':
        logger.info(lang.__('DELETING_SECURITY_GROUP', { id: instance.id }));
        await client.ecs.deleteSecurityGroup(instance.id);
        break;
      case 'ALIYUN_RAM_ROLE': {
        const ramInstance = instance as unknown as {
          external?: boolean;
          managedPolicies?: string[];
        };
        if (ramInstance.external) break; // Skip external roles
        const managedPolicies = ramInstance.managedPolicies;
        logger.info(lang.__('DELETING_RAM_ROLE', { id: instance.id }));
        await client.ram.deleteRole(instance.id, managedPolicies);
        break;
      }
      case 'ALIYUN_SLS_INDEX': {
        const [projectName, logstoreName] = instance.id.split('/');
        logger.info(lang.__('DELETING_SLS_INDEX', { id: instance.id }));
        await client.sls.deleteIndex(projectName, logstoreName);
        break;
      }
      case 'ALIYUN_SLS_LOGSTORE': {
        const [projectName, logstoreName] = instance.id.split('/');
        logger.info(lang.__('DELETING_SLS_LOGSTORE', { id: instance.id }));
        await client.sls.deleteLogstore(projectName, logstoreName);
        break;
      }
      case 'ALIYUN_SLS_PROJECT':
        logger.info(lang.__('DELETING_SLS_PROJECT', { id: instance.id }));
        await client.sls.deleteProject(instance.id);
        break;
      case 'ALIYUN_FC3_HTTP_TRIGGER':
        // HTTP trigger deletion requires functionName which is not available here.
        // It is handled directly in deleteResource before calling this function.
        logger.warn(
          `HTTP trigger '${instance.id}' should be deleted before reaching dependent resource cleanup`,
        );
        break;
      case 'ALIYUN_FC3_CUSTOM_DOMAIN':
        logger.info(lang.__('DELETING_CUSTOM_DOMAIN', { domainName: instance.id }));
        await client.fc3.deleteCustomDomain(instance.id);
        break;
      default:
        logger.warn(lang.__('UNKNOWN_RESOURCE_TYPE', { type: instance.type }));
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
  config = {
    ...config,
    tags: [{ key: OWNERSHIP_TAG_KEY, value: buildOwnershipTagValue(context, logicalId) }],
  };

  if (dependentResources.logConfig) {
    config = {
      ...config,
      logConfig: {
        project: dependentResources.logConfig.project,
        logstore: dependentResources.logConfig.logstore,
        enableRequestMetrics: true,
        enableInstanceMetrics: true,
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
  const codeHash = await computeZipContentHash(codePath);
  const baseDefinition = extractFc3Definition(config, codeHash);
  const definition = fn.iam ? { ...baseDefinition, iam: fn.iam } : baseDefinition;

  const dependentInstances = dependentResources.instances.map((dep) => ({
    sid:
      dep.sid ??
      buildSid('aliyun', dep.type.replace('ALIYUN_', '').toLowerCase(), context.stage, dep.id),
    id: dep.id,
    type: dep.type,
    ...(dep.roleArn ? { roleArn: dep.roleArn } : {}),
    ...(dep.external ? { external: dep.external } : {}),
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

  const isTainted = existingResourceState?.status === 'tainted';
  const existingFunctionOnRetry = isTainted ? await client.fc3.getFunction(fn.name) : null;
  if (existingFunctionOnRetry) {
    logger.info(
      `Function ${fn.name} already exists in provider (tainted recovery), skipping create and refreshing state`,
    );
  }

  try {
    if (!existingFunctionOnRetry) {
      const ossCode = await ensureOssCodeUpload(client, codePath, context.region, fn.name);
      await client.fc3.createFunction(config, codePath, ossCode);
    }
  } catch (error) {
    if (isRecoverableCreateError(error)) {
      logger.warn(
        `Create function returned recoverable error for ${fn.name}, reconciling with provider state: ${String(error)}`,
      );

      const functionAfterError = await client.fc3.getFunction(fn.name);
      if (functionAfterError) {
        if (functionAfterError.state === 'Failed') {
          throw new PartialResourceError(
            stateAfterDependents,
            new Error(
              `FC3 function ${fn.name} is in Failed state after create (reason: ${functionAfterError.stateReason ?? 'unknown'})`,
            ),
          );
        }
        logger.info(
          `Function ${fn.name} found after create error reconciliation, continuing deployment flow`,
        );
      } else {
        await delay(RECOVERY_GET_FUNCTION_DELAY_MS);
        const functionAfterDelay = await client.fc3.getFunction(fn.name);
        if (functionAfterDelay) {
          if (functionAfterDelay.state === 'Failed') {
            throw new PartialResourceError(
              stateAfterDependents,
              new Error(
                `FC3 function ${fn.name} is in Failed state after create (reason: ${functionAfterDelay.stateReason ?? 'unknown'})`,
              ),
            );
          }
          logger.info(
            `Function ${fn.name} found after delayed reconciliation, continuing deployment flow`,
          );
        } else {
          throw new PartialResourceError(
            stateAfterDependents,
            error instanceof Error ? error : new Error(String(error)),
          );
        }
      }
    } else if (isResourceAlreadyExistsError(error, ['FunctionAlreadyExists'])) {
      // Idempotent adoption: the function already exists in the provider.
      // Adopt it ONLY if it carries our ownership tag (proves a previous run
      // of THIS stack created it — e.g. state was reset). An untagged
      // same-named function may belong to another project, so it must fail
      // loudly rather than silently taking it over (destroy would then remove
      // a resource that was never ours).
      const probe = await client.fc3.getFunction(fn.name);
      if (probe && isOwnedByStack(context, logicalId, probe.tags)) {
        logger.info(
          `Function ${fn.name} exists and carries ownership tag (${OWNERSHIP_TAG_KEY}), adopting idempotently`,
        );
      } else {
        throw new PartialResourceError(
          stateAfterDependents,
          new Error(
            `Function ${fn.name} already exists in provider but is not owned by this stack (missing ${OWNERSHIP_TAG_KEY} tag). Refusing to adopt — resolve manually.`,
          ),
        );
      }
    } else {
      throw new PartialResourceError(
        stateAfterDependents,
        error instanceof Error ? error : new Error(String(error)),
      );
    }
  }

  let functionInfo: Fc3FunctionInfo | null;
  try {
    functionInfo = await client.fc3.getFunction(fn.name);
  } catch (error) {
    throw new PartialResourceError(
      stateAfterDependents,
      error instanceof Error ? error : new Error(String(error)),
    );
  }
  if (!functionInfo) {
    throw new PartialResourceError(
      stateAfterDependents,
      new Error(`Failed to refresh state for function: ${fn.name}`),
    );
  }
  if (functionInfo.state === 'Failed') {
    throw new PartialResourceError(
      stateAfterDependents,
      new Error(
        `FC3 function ${fn.name} is in Failed state (reason: ${functionInfo.stateReason ?? 'unknown'})`,
      ),
    );
  }

  const sid = buildSid('aliyun', 'fc3', context.stage, fn.name);

  const fcInstance = buildFc3InstanceFromProvider(functionInfo, sid);

  const lifecycleInstances = [];
  try {
    if (fn.triggers?.http) {
      const triggerConfig = buildHttpTriggerConfig(fn.triggers.http);

      logger.info(
        lang.__('CREATING_HTTP_TRIGGER', { triggerName: 'http-trigger', functionName: fn.name }),
      );
      await client.fc3.createTrigger(fn.name, 'http-trigger', 'http', triggerConfig);
      logger.info(
        lang.__('HTTP_TRIGGER_CREATED', { triggerName: 'http-trigger', functionName: fn.name }),
      );

      lifecycleInstances.push({
        type: 'ALIYUN_FC3_HTTP_TRIGGER',
        id: 'http-trigger',
        sid: buildSid('aliyun', 'fc3-http-trigger', context.stage, fn.name),
        attributes: { ...triggerConfig } as unknown as Record<string, unknown>,
      });
    }

    if (fn.domain) {
      logger.info(lang.__('CREATING_CUSTOM_DOMAIN', { domainName: fn.domain.domain_name }));

      let certConfig: { certName: string; certificate: string; privateKey: string } | undefined;
      if (fn.domain.certificate_id) {
        const certId = fn.domain.certificate_id;
        const detail = await client.cas.getCertificate(certId);
        if (!detail || !detail.cert || !detail.key) {
          throw new Error(lang.__('CERT_REFERENCE_NOT_FOUND', { reference: certId }));
        }
        certConfig = {
          certName: `${context.service}-${context.stage}-fc3-domain`,
          certificate: detail.cert,
          privateKey: detail.key,
        };
      }

      await client.fc3.createCustomDomain(
        fn.domain.domain_name,
        fn.domain.protocol,
        fn.name,
        certConfig,
      );
      logger.info(lang.__('CUSTOM_DOMAIN_CREATED', { domainName: fn.domain.domain_name }));

      lifecycleInstances.push({
        type: 'ALIYUN_FC3_CUSTOM_DOMAIN',
        id: fn.domain.domain_name,
        sid: buildSid('aliyun', 'fc3-custom-domain', context.stage, fn.domain.domain_name),
        attributes: { protocol: fn.domain.protocol, certificate_id: fn.domain.certificate_id },
      });
    }
  } catch (error) {
    throw new PartialResourceError(
      stateAfterDependents,
      error instanceof Error ? error : new Error(String(error)),
    );
  }

  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [fcInstance, ...lifecycleInstances, ...dependentInstances],
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

  const client = createAliyunClient(context);
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

  const newIamRole = fn.iam?.role;

  if (typeof newIamRole === 'string') {
    // External role - use ARN directly, skip management
    role = { roleName: '', arn: newIamRole };
  } else if (!hasRamRole) {
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

      const trustedServices = getTrustedServicesForFunction(context, fn.key);
      await client.ram.updateRoleTrustPolicy(ramRoleInstance.id, trustedServices);

      const existingIam = existingState?.definition?.iam as Record<string, unknown> | undefined;
      const desiredIam = fn.iam;
      const iamChanged = !attributesEqual(existingIam ?? {}, desiredIam ?? {});
      if (iamChanged) {
        // Check for statement changes
        const desiredStatements = newIamRole ? newIamRole.statements : undefined;
        const existingRole = existingIam?.role as Record<string, unknown> | undefined;
        const existingStatements =
          existingRole && typeof existingRole !== 'string' ? existingRole.statements : undefined;
        const desiredStatementsVal = (desiredStatements ?? []) as unknown as Record<
          string,
          unknown
        >;
        const existingStatementsVal = (existingStatements ?? []) as unknown as Record<
          string,
          unknown
        >;
        if (!attributesEqual(existingStatementsVal, desiredStatementsVal)) {
          await client.ram.updateRolePolicy(
            ramRoleInstance.id,
            desiredStatements as IamStatement[] | undefined,
          );
        }

        // Check for managed policy changes
        const desiredManagedPolicies = newIamRole ? newIamRole.managed_policies : undefined;
        const existingManagedPolicies =
          existingRole && typeof existingRole !== 'string'
            ? existingRole.managed_policies
            : undefined;
        const desiredManagedPoliciesVal = (desiredManagedPolicies ?? []) as unknown as Record<
          string,
          unknown
        >;
        const existingManagedPoliciesVal = (existingManagedPolicies ?? []) as unknown as Record<
          string,
          unknown
        >;
        if (!attributesEqual(existingManagedPoliciesVal, desiredManagedPoliciesVal)) {
          await client.ram.updateManagedPolicies(
            ramRoleInstance.id,
            (desiredManagedPolicies as string[]) ?? [],
          );
        }
      }
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
        enableInstanceMetrics: true,
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
  const currentCodeHash = existingState?.definition?.codeHash as string | undefined;
  const desiredCodeHash = await computeZipContentHash(codePath);
  const codeChanged = currentCodeHash !== desiredCodeHash;

  const existingConfig = existingState?.definition as ResourceAttributes | undefined;
  const desiredDefinition = extractFc3Definition(config, desiredCodeHash);

  const {
    codeHash: _existingCodeHash,
    iam: _existingIam,
    ...existingConfigOnly
  } = existingConfig || {};
  const { codeHash: _desiredCodeHash, ...desiredConfigOnly } = desiredDefinition;
  const configChanged = !attributesEqual(existingConfigOnly, desiredConfigOnly);

  if (configChanged) {
    await client.fc3.updateFunctionConfiguration(config);
  }

  if (codeChanged) {
    const ossCode = await ensureOssCodeUpload(client, codePath, context.region, fn.name);
    await client.fc3.updateFunctionCode(fn.name, codePath, ossCode);
  }

  if (!configChanged && !codeChanged) {
    logger.warn(
      lang.__('UPDATING_RESOURCE_WITH_NO_CHANGES', { resourceType: 'function', name: fn.name }),
    );
  }

  const existingHttpTrigger = existingInstances.find(
    (i) => i.type === 'ALIYUN_FC3_HTTP_TRIGGER',
  ) as DependentInstance | undefined;
  const desiredHttpTrigger = fn.triggers?.http;

  if (desiredHttpTrigger && !existingHttpTrigger) {
    const triggerConfig = buildHttpTriggerConfig(desiredHttpTrigger);
    logger.info(
      lang.__('CREATING_HTTP_TRIGGER', { triggerName: 'http-trigger', functionName: fn.name }),
    );
    await client.fc3.createTrigger(fn.name, 'http-trigger', 'http', triggerConfig);
    logger.info(
      lang.__('HTTP_TRIGGER_CREATED', { triggerName: 'http-trigger', functionName: fn.name }),
    );
  } else if (!desiredHttpTrigger && existingHttpTrigger) {
    logger.info(
      lang.__('DELETING_HTTP_TRIGGER', { triggerName: 'http-trigger', functionName: fn.name }),
    );
    try {
      await client.fc3.deleteTrigger(fn.name, 'http-trigger');
      logger.info(lang.__('HTTP_TRIGGER_DELETED', { triggerName: 'http-trigger' }));
    } catch (err) {
      const errorCode = (err as { code?: string })?.code;
      if (errorCode !== 'TriggerNotFound') throw err;
      logger.warn(lang.__('HTTP_TRIGGER_NOT_FOUND', { triggerName: 'http-trigger' }));
    }
  } else if (desiredHttpTrigger && existingHttpTrigger) {
    const desiredTriggerConfig = buildHttpTriggerConfig(desiredHttpTrigger);
    const existingAttrs = existingHttpTrigger.attributes ?? {};
    if (!attributesEqual(desiredTriggerConfig, existingAttrs)) {
      logger.info(lang.__('UPDATING_HTTP_TRIGGER', { functionName: fn.name }));
      try {
        await client.fc3.deleteTrigger(fn.name, 'http-trigger');
      } catch (err) {
        const errorCode = (err as { code?: string })?.code;
        if (errorCode !== 'TriggerNotFound') throw err;
      }
      await client.fc3.createTrigger(fn.name, 'http-trigger', 'http', desiredTriggerConfig);
      logger.info(
        lang.__('HTTP_TRIGGER_CREATED', { triggerName: 'http-trigger', functionName: fn.name }),
      );
    }
  }

  const existingCustomDomain = existingInstances.find(
    (i) => i.type === 'ALIYUN_FC3_CUSTOM_DOMAIN',
  ) as DependentInstance | undefined;
  const desiredDomain = fn.domain;

  if (desiredDomain && !existingCustomDomain) {
    logger.info(lang.__('CREATING_CUSTOM_DOMAIN', { domainName: desiredDomain.domain_name }));

    let certConfig: { certName: string; certificate: string; privateKey: string } | undefined;
    if (desiredDomain.certificate_id) {
      const certId = desiredDomain.certificate_id;
      const detail = await client.cas.getCertificate(certId);
      if (!detail || !detail.cert || !detail.key) {
        throw new Error(lang.__('CERT_REFERENCE_NOT_FOUND', { reference: certId }));
      }
      certConfig = {
        certName: `${context.service}-${context.stage}-fc3-domain`,
        certificate: detail.cert,
        privateKey: detail.key,
      };
    }

    await client.fc3.createCustomDomain(
      desiredDomain.domain_name,
      desiredDomain.protocol,
      fn.name,
      certConfig,
    );
    logger.info(lang.__('CUSTOM_DOMAIN_CREATED', { domainName: desiredDomain.domain_name }));
  } else if (!desiredDomain && existingCustomDomain) {
    logger.info(lang.__('DELETING_CUSTOM_DOMAIN', { domainName: existingCustomDomain.id }));
    try {
      await client.fc3.deleteCustomDomain(existingCustomDomain.id);
      logger.info(lang.__('CUSTOM_DOMAIN_DELETED', { domainName: existingCustomDomain.id }));
    } catch (err) {
      const errorCode = (err as { code?: string })?.code;
      if (errorCode !== 'CustomDomainNotFound') throw err;
      logger.warn(
        lang.__('RESOURCE_NOT_FOUND_PROVIDER', {
          resourceType: 'Custom Domain',
          name: existingCustomDomain.id,
        }),
      );
    }
  } else if (desiredDomain && existingCustomDomain) {
    const existingProtocol = existingCustomDomain.attributes?.protocol as string | undefined;
    const domainChanged =
      desiredDomain.domain_name !== existingCustomDomain.id ||
      desiredDomain.protocol !== existingProtocol;
    if (domainChanged) {
      logger.info(lang.__('UPDATING_CUSTOM_DOMAIN', { domainName: desiredDomain.domain_name }));

      let certConfig: { certName: string; certificate: string; privateKey: string } | undefined;
      if (desiredDomain.certificate_id) {
        const certId = desiredDomain.certificate_id;
        const detail = await client.cas.getCertificate(certId);
        if (!detail || !detail.cert || !detail.key) {
          throw new Error(lang.__('CERT_REFERENCE_NOT_FOUND', { reference: certId }));
        }
        certConfig = {
          certName: `${context.service}-${context.stage}-fc3-domain`,
          certificate: detail.cert,
          privateKey: detail.key,
        };
      }

      try {
        await client.fc3.deleteCustomDomain(existingCustomDomain.id);
      } catch (err) {
        const errorCode = (err as { code?: string })?.code;
        if (errorCode !== 'CustomDomainNotFound') throw err;
      }
      await client.fc3.createCustomDomain(
        desiredDomain.domain_name,
        desiredDomain.protocol,
        fn.name,
        certConfig,
      );
      logger.info(lang.__('CUSTOM_DOMAIN_CREATED', { domainName: desiredDomain.domain_name }));
    }
  }

  const functionInfo = await client.fc3.getFunction(fn.name);
  if (!functionInfo) {
    throw new Error(`Failed to refresh state for function: ${fn.name}`);
  }

  const codeHash = await computeZipContentHash(codePath);
  const baseDefinition = extractFc3Definition(config, codeHash);
  const definition = fn.iam ? { ...baseDefinition, iam: fn.iam } : baseDefinition;
  const sid = buildSid('aliyun', 'fc3', context.stage, fn.name);

  const fcInstance = buildFc3InstanceFromProvider(functionInfo, sid);

  const lifecycleInstances = [];
  if (fn.triggers?.http) {
    const triggerConfig = buildHttpTriggerConfig(fn.triggers.http);
    lifecycleInstances.push({
      type: 'ALIYUN_FC3_HTTP_TRIGGER',
      id: 'http-trigger',
      sid: buildSid('aliyun', 'fc3-http-trigger', context.stage, fn.name),
      attributes: { ...triggerConfig } as unknown as Record<string, unknown>,
    });
  }
  if (fn.domain) {
    lifecycleInstances.push({
      type: 'ALIYUN_FC3_CUSTOM_DOMAIN',
      id: fn.domain.domain_name,
      sid: buildSid('aliyun', 'fc3-custom-domain', context.stage, fn.domain.domain_name),
      attributes: { protocol: fn.domain.protocol },
    });
  }

  const existingDependentInstances = existingInstances
    .filter((i) => i.type !== 'ALIYUN_FC3_FUNCTION')
    .filter((i) => i.type !== 'ALIYUN_FC3_HTTP_TRIGGER')
    .filter((i) => i.type !== 'ALIYUN_FC3_CUSTOM_DOMAIN')
    .filter((i) => !(typeof fn.iam?.role === 'string' && i.type === 'ALIYUN_RAM_ROLE'))
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
    ...(dep.external ? { external: dep.external } : {}),
    ...dep.attributes,
  }));

  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [
      fcInstance,
      ...lifecycleInstances,
      ...existingDependentInstances,
      ...newDependentInstancesMapped,
    ],
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

  const client = createAliyunClient(context);

  // Delete HTTP trigger and custom domain before function (they depend on it)
  const httpTriggerInstance = existingInstances.find((i) => i.type === 'ALIYUN_FC3_HTTP_TRIGGER');
  if (httpTriggerInstance) {
    logger.info(
      lang.__('DELETING_HTTP_TRIGGER', { triggerName: httpTriggerInstance.id, functionName }),
    );
    try {
      await client.fc3.deleteTrigger(functionName, httpTriggerInstance.id);
      logger.info(lang.__('HTTP_TRIGGER_DELETED', { triggerName: httpTriggerInstance.id }));
    } catch (err) {
      const errorCode = (err as { code?: string })?.code;
      if (errorCode === 'TriggerNotFound') {
        logger.warn(lang.__('HTTP_TRIGGER_NOT_FOUND', { triggerName: httpTriggerInstance.id }));
      } else {
        throw err;
      }
    }
  }

  const customDomainInstance = existingInstances.find((i) => i.type === 'ALIYUN_FC3_CUSTOM_DOMAIN');
  if (customDomainInstance) {
    logger.info(lang.__('DELETING_CUSTOM_DOMAIN', { domainName: customDomainInstance.id }));
    try {
      await client.fc3.deleteCustomDomain(customDomainInstance.id);
      logger.info(lang.__('CUSTOM_DOMAIN_DELETED', { domainName: customDomainInstance.id }));
    } catch (err) {
      const errorCode = (err as { code?: string })?.code;
      if (errorCode === 'CustomDomainNotFound') {
        logger.warn(
          lang.__('RESOURCE_NOT_FOUND_PROVIDER', {
            resourceType: 'Custom Domain',
            name: customDomainInstance.id,
          }),
        );
      } else {
        throw err;
      }
    }
  }

  const hasFcFunction = existingInstances.some((i) => i.type === 'ALIYUN_FC3_FUNCTION');
  if (hasFcFunction) {
    try {
      await client.fc3.deleteFunction(functionName);
    } catch (err) {
      const errorCode = (err as { code?: string })?.code;
      if (errorCode === 'FunctionNotFound') {
        logger.warn(
          lang.__('RESOURCE_NOT_FOUND_PROVIDER', { resourceType: 'Function', name: functionName }),
        );
      } else {
        throw err;
      }
    }
  }

  const dependentInstances = existingInstances.filter(
    (i) =>
      i.type !== 'ALIYUN_FC3_FUNCTION' &&
      i.type !== 'ALIYUN_FC3_HTTP_TRIGGER' &&
      i.type !== 'ALIYUN_FC3_CUSTOM_DOMAIN' &&
      !i.type.includes('undefined'),
  );
  if (dependentInstances.length > 0) {
    await deleteDependentResources(context, dependentInstances);
  }

  return removeResource(state, logicalId);
};
