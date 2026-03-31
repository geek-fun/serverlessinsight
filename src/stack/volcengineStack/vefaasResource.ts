import { createVolcengineClient } from '../../common/volcengineClient';
import {
  getResource,
  removeResource,
  setResource,
  computeFileHash,
  buildSid,
  attributesEqual,
} from '../../common';
import {
  Context,
  FunctionDomain,
  PartialResourceError,
  ResourceAttributes,
  ResourceState,
  StateFile,
} from '../../types';
import {
  extractVefaasDefinition,
  functionToVefaasConfig,
  getTrustedServicesForFunction,
  buildDefaultTrustPolicy,
  VefaasFunctionInfo,
} from './vefaasTypes';
import { logger } from '../../common/logger';
import { lang } from '../../lang';

type DependentInstance = {
  type: string;
  id: string;
  sid?: string;
  trn?: string;
  attributes: Record<string, unknown>;
};

const RECOVERY_GET_FUNCTION_DELAY_MS = 1500;
const IAM_ROLE_PROPAGATION_DELAY_MS = 3000;

const delay = async (ms: number): Promise<void> => {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
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

const buildVefaasInstanceFromProvider = (info: VefaasFunctionInfo, sid: string) => {
  return {
    type: 'VOLCENGINE_VEFAAS_FUNCTION',
    sid,
    id: info.functionName ?? '',
    functionName: info.functionName ?? null,
    functionId: info.functionId ?? null,
    runtime: info.runtime ?? null,
    handler: info.handler ?? null,
    memorySize: info.memoryMb ?? null,
    timeout: info.requestTimeout ?? null,
    environment: info.environmentVariables ?? {},
    description: info.description ?? null,
    status: info.status ?? null,
    createdTime: info.createdTime ?? null,
    lastUpdateTime: info.lastModifiedTime ?? null,
    vpcConfig: info.vpcConfig
      ? {
          vpcId: info.vpcConfig.vpcId ?? null,
          subnetIds: info.vpcConfig.subnetIds ?? [],
          securityGroupIds: info.vpcConfig.securityGroupIds ?? [],
        }
      : {},
  };
};

const createDependentResources = async (
  context: Context,
  fn: FunctionDomain,
  serviceName: string,
  existingInstances: Array<DependentInstance> = [],
): Promise<{
  logConfig?: { project: string; topic: string };
  role?: { roleName: string; trn: string };
  instances: Array<DependentInstance>;
}> => {
  const client = createVolcengineClient(context);
  const instances: Array<DependentInstance> = [];
  let logConfig: { project: string; topic: string } | undefined;

  const hasTlsProject = existingInstances.some((i) => i.type === 'VOLCENGINE_TLS_PROJECT');
  const hasIamRole = existingInstances.some((i) => i.type === 'VOLCENGINE_IAM_ROLE');

  if (fn.log) {
    if (hasTlsProject) {
      const tlsProjectInstance = existingInstances.find((i) => i.type === 'VOLCENGINE_TLS_PROJECT');
      const tlsTopicInstance = existingInstances.find((i) => i.type === 'VOLCENGINE_TLS_TOPIC');
      if (tlsProjectInstance && tlsTopicInstance) {
        const [projectName, topicName] = tlsTopicInstance.id.split('/');
        logConfig = { project: projectName, topic: topicName };
        instances.push(...existingInstances.filter((i) => i.type.startsWith('VOLCENGINE_TLS_')));
      }
    } else {
      const projectName = `${serviceName}-${context.stage}-tls`;
      const topicName = `${serviceName}-${context.stage}-logs`;

      logger.info(lang.__('CREATING_TLS_PROJECT', { projectName }));
      const project = await client.tls.createProject({
        projectName,
        description: `veFaaS logs for ${serviceName}`,
        region: context.region,
      });
      instances.push({
        type: 'VOLCENGINE_TLS_PROJECT',
        id: projectName,
        attributes: { ...project },
      });

      logger.info(lang.__('CREATING_TLS_TOPIC', { topicName }));
      const topic = await client.tls.createTopic({
        projectName,
        topicName,
        description: `Function logs for ${serviceName}`,
        ttl: 30,
      });
      instances.push({
        type: 'VOLCENGINE_TLS_TOPIC',
        id: `${projectName}/${topicName}`,
        attributes: { ...topic },
      });

      logger.info(lang.__('CREATING_TLS_INDEX', { topicName }));
      await client.tls.createIndex({
        projectName,
        topicName,
        fullTextIndex: {
          delimiter: ' ,.?;!\n\t',
          caseSensitive: false,
        },
      });
      instances.push({
        type: 'VOLCENGINE_TLS_INDEX',
        id: `${projectName}/${topicName}/index`,
        attributes: {},
      });

      logger.info(lang.__('WAITING_FOR_TLS_RESOURCES', { projectName, topicName }));
      await client.tls.waitForProject(projectName);
      await client.tls.waitForTopic(projectName, topicName);

      logConfig = { project: projectName, topic: topicName };
    }
  }

  const roleName = `${serviceName}-${context.stage}-role`;
  const trustedServices = getTrustedServicesForFunction(fn, context);

  if (hasIamRole) {
    const iamRoleInstance = existingInstances.find((i) => i.type === 'VOLCENGINE_IAM_ROLE');
    if (iamRoleInstance) {
      instances.push(iamRoleInstance);
      await client.iam.updateRoleTrustPolicy(roleName, buildDefaultTrustPolicy(trustedServices));
    }
  } else {
    logger.info(lang.__('CREATING_IAM_ROLE', { roleName }));
    const iamRole = await client.iam.createRole({
      roleName,
      displayName: roleName,
      description: `veFaaS execution role for ${serviceName}`,
      trustPolicy: buildDefaultTrustPolicy(trustedServices),
    });
    instances.push({
      type: 'VOLCENGINE_IAM_ROLE',
      id: roleName,
      trn: iamRole.trn,
      attributes: { ...iamRole },
    });
    await delay(IAM_ROLE_PROPAGATION_DELAY_MS);
  }

  const iamRoleInstance = instances.find((i) => i.type === 'VOLCENGINE_IAM_ROLE');

  if (!iamRoleInstance) {
    throw new Error(lang.__('IAM_ROLE_INSTANCE_NOT_FOUND', { roleName }));
  }

  const trn =
    iamRoleInstance.trn ??
    (context.accountId ? `trn:iam::${context.accountId}:role/${roleName}` : undefined);

  if (!trn) {
    throw new Error(lang.__('IAM_ROLE_TRN_MISSING', { roleName }));
  }

  const role = {
    roleName,
    trn,
  };

  return {
    logConfig,
    role,
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
  const client = createVolcengineClient(context);

  for (const instance of [...instances].reverse()) {
    try {
      switch (instance.type) {
        case 'VOLCENGINE_TLS_INDEX': {
          const [projectName, topicName] = instance.id.split('/');
          logger.info(lang.__('DELETING_TLS_INDEX', { id: instance.id }));
          await client.tls.deleteIndex(projectName, topicName);
          break;
        }
        case 'VOLCENGINE_TLS_TOPIC': {
          const [projectName, topicName] = instance.id.split('/');
          logger.info(lang.__('DELETING_TLS_TOPIC', { id: instance.id }));
          await client.tls.deleteTopic(projectName, topicName);
          break;
        }
        case 'VOLCENGINE_TLS_PROJECT':
          logger.info(lang.__('DELETING_TLS_PROJECT', { id: instance.id }));
          await client.tls.deleteProject(instance.id);
          break;
        case 'VOLCENGINE_IAM_ROLE':
          logger.info(lang.__('DELETING_IAM_ROLE', { id: instance.id }));
          await client.iam.deleteRole(instance.id);
          break;
        default:
          logger.warn(lang.__('UNKNOWN_RESOURCE_TYPE', { type: instance.type }));
      }
    } catch (err) {
      logger.error(
        lang.__('FAILED_TO_DELETE_RESOURCE', {
          type: instance.type,
          id: instance.id,
          error: String(err),
        }),
      );
    }
  }
};

export const createResource = async (
  context: Context,
  fn: FunctionDomain,
  state: StateFile,
): Promise<StateFile> => {
  const logicalId = `functions.${fn.key}`;
  const serviceName = `${context.app}-${context.service}`;

  const existingResourceState = getResource(state, logicalId);
  const existingDependentInstances = (existingResourceState?.instances ?? []).filter(
    (i) => (i as DependentInstance).type !== 'VOLCENGINE_VEFAAS_FUNCTION',
  ) as Array<DependentInstance>;

  const dependentResources = await createDependentResources(
    context,
    fn,
    serviceName,
    existingDependentInstances,
  );

  const config = functionToVefaasConfig(fn, {
    role: dependentResources.role?.trn,
    logConfig: dependentResources.logConfig,
    vpcConfig: fn.network
      ? {
          vpcId: fn.network.vpc_id,
          subnetIds: fn.network.subnet_ids,
          securityGroupIds: [],
        }
      : undefined,
    tosMountConfig: fn.storage?.nas?.[0]
      ? {
          bucketName: (fn.storage.nas[0] as unknown as { bucket_name?: string })?.bucket_name || '',
          mountPath: fn.storage.nas[0].mount_path,
        }
      : undefined,
  });

  const codePath = fn.code!.path;
  const codeHash = computeFileHash(codePath);
  const definition = extractVefaasDefinition(config, codeHash);

  const sid = buildSid('volcengine', context.service, context.stage, fn.name);

  const dependentInstances = dependentResources.instances.map((dep) => ({
    sid:
      dep.sid ??
      buildSid(
        'volcengine',
        dep.type.replace('VOLCENGINE_', '').toLowerCase(),
        context.stage,
        dep.id,
      ),
    id: dep.id,
    type: dep.type,
    ...(dep.trn ? { trn: dep.trn } : {}),
    ...dep.attributes,
  }));

  const taintedResourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [
      {
        type: 'VOLCENGINE_VEFAAS_FUNCTION',
        sid,
        id: fn.name,
        functionName: fn.name,
        attributes: {},
      },
      ...dependentInstances,
    ],
    status: 'tainted',
    lastUpdated: new Date().toISOString(),
  };

  const stateAfterDependents = setResource(state, logicalId, taintedResourceState);

  const client = createVolcengineClient(context);

  const isTainted = existingResourceState?.status === 'tainted';
  const existingFunctionOnRetry = isTainted ? await client.vefaas.getFunction(fn.name) : null;
  if (existingFunctionOnRetry) {
    logger.info(lang.__('VEFAAS_FUNCTION_EXISTS_RECOVERY', { functionName: fn.name }));
  }

  try {
    if (!existingFunctionOnRetry) {
      const codeContent = await import('node:fs').then((fs) => fs.readFileSync(codePath));
      const codeBase64 = codeContent.toString('base64');
      await client.vefaas.createFunction(config, codeBase64);
    }
  } catch (error) {
    if (isRecoverableCreateError(error)) {
      await delay(RECOVERY_GET_FUNCTION_DELAY_MS);
      const functionAfterError = await client.vefaas.getFunction(fn.name);
      if (!functionAfterError) {
        throw new PartialResourceError(stateAfterDependents, error as Error);
      }
    } else {
      throw new PartialResourceError(stateAfterDependents, error as Error);
    }
  }

  const functionInfo = await client.vefaas.getFunction(fn.name);
  if (!functionInfo) {
    throw new Error(
      lang.__('RESOURCE_NOT_FOUND_PROVIDER', { resourceType: 'Function', name: fn.name }),
    );
  }
  const vefaasInstance = buildVefaasInstanceFromProvider(functionInfo, sid);

  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [vefaasInstance, ...dependentInstances],
    status: 'ready',
    lastUpdated: new Date().toISOString(),
  };

  return setResource(stateAfterDependents, logicalId, resourceState);
};

export const readResource = async (context: Context, functionName: string) => {
  const client = createVolcengineClient(context);
  return await client.vefaas.getFunction(functionName);
};

export const updateResource = async (
  context: Context,
  fn: FunctionDomain,
  state: StateFile,
): Promise<StateFile> => {
  const serviceName = `${context.app}-${context.service}`;
  const logicalId = `functions.${fn.key}`;

  const currentState = getResource(state, logicalId);

  if (!currentState) {
    throw new Error(lang.__('RESOURCE_STATE_NOT_FOUND', { logicalId }));
  }

  const currentInstance = currentState.instances.find(
    (i) => i.type === 'VOLCENGINE_VEFAAS_FUNCTION',
  );

  if (!currentInstance) {
    throw new Error(lang.__('RESOURCE_INSTANCE_NOT_FOUND', { logicalId }));
  }

  const existingInstances = (currentState.instances ?? []) as Array<DependentInstance>;

  const hasTlsResources = existingInstances.some((i) => i.type === 'VOLCENGINE_TLS_PROJECT');
  const hasIamRole = existingInstances.some((i) => i.type === 'VOLCENGINE_IAM_ROLE');

  const client = createVolcengineClient(context);
  const newDependentInstances: Array<DependentInstance> = [];
  let logConfig: { project: string; topic: string } | undefined;
  let role: { roleName: string; trn: string } | undefined;

  if (fn.log && !hasTlsResources) {
    const deps = await createDependentResources(
      context,
      { ...fn, network: undefined, storage: { disk: undefined, nas: undefined } },
      serviceName,
    );
    logConfig = deps.logConfig;
    newDependentInstances.push(
      ...deps.instances.filter((i) => i.type.startsWith('VOLCENGINE_TLS_')),
    );
  } else if (hasTlsResources) {
    const tlsProjectInstance = existingInstances.find((i) => i.type === 'VOLCENGINE_TLS_PROJECT');
    const tlsTopicInstance = existingInstances.find((i) => i.type === 'VOLCENGINE_TLS_TOPIC');
    if (tlsProjectInstance && tlsTopicInstance) {
      const [projectName, topicName] = tlsTopicInstance.id.split('/');
      logConfig = { project: projectName, topic: topicName };
    }
  }

  if (!hasIamRole) {
    const deps = await createDependentResources(
      context,
      { ...fn, log: false, network: undefined, storage: { disk: undefined, nas: undefined } },
      serviceName,
    );
    role = deps.role;
    newDependentInstances.push(...deps.instances.filter((i) => i.type === 'VOLCENGINE_IAM_ROLE'));
  } else {
    const iamRoleInstance = existingInstances.find((i) => i.type === 'VOLCENGINE_IAM_ROLE');
    if (iamRoleInstance) {
      const trn =
        iamRoleInstance.trn ??
        (context.accountId
          ? `trn:iam::${context.accountId}:role/${iamRoleInstance.id}`
          : undefined);

      if (!trn) {
        throw new Error(lang.__('IAM_ROLE_TRN_MISSING', { roleName: iamRoleInstance.id }));
      }

      role = {
        roleName: iamRoleInstance.id,
        trn,
      };

      const trustedServices = getTrustedServicesForFunction(fn, context);
      await client.iam.updateRoleTrustPolicy(
        iamRoleInstance.id,
        buildDefaultTrustPolicy(trustedServices),
      );
    }
  }

  const config = functionToVefaasConfig(fn, {
    role: role?.trn,
    logConfig,
    vpcConfig: fn.network
      ? {
          vpcId: fn.network.vpc_id,
          subnetIds: fn.network.subnet_ids,
          securityGroupIds: [],
        }
      : undefined,
    tosMountConfig: fn.storage?.nas?.[0]
      ? {
          bucketName: (fn.storage.nas[0] as unknown as { bucket_name?: string })?.bucket_name || '',
          mountPath: fn.storage.nas[0].mount_path,
        }
      : undefined,
  });

  const codePath = fn.code!.path;
  const desiredCodeHash = computeFileHash(codePath);
  const desiredDefinition = extractVefaasDefinition(config, desiredCodeHash);

  const currentDefinition = currentState.definition || {};
  const currentCodeHash = currentDefinition.codeHash as string | undefined;
  const codeChanged = currentCodeHash !== desiredCodeHash;

  const existingConfigOnly: ResourceAttributes = {
    runtime: currentDefinition.runtime,
    handler: currentDefinition.handler,
    memorySize: currentDefinition.memorySize,
    timeout: currentDefinition.timeout,
    environment: currentDefinition.environment,
    description: currentDefinition.description,
    role: currentDefinition.role,
    vpcConfig: currentDefinition.vpcConfig,
    tosMountConfig: currentDefinition.tosMountConfig,
    logConfig: currentDefinition.logConfig,
  };

  const desiredConfigOnly: ResourceAttributes = {
    runtime: desiredDefinition.runtime,
    handler: desiredDefinition.handler,
    memorySize: desiredDefinition.memorySize,
    timeout: desiredDefinition.timeout,
    environment: desiredDefinition.environment,
    description: desiredDefinition.description,
    role: desiredDefinition.role,
    vpcConfig: desiredDefinition.vpcConfig,
    tosMountConfig: desiredDefinition.tosMountConfig,
    logConfig: desiredDefinition.logConfig,
  };

  const configChanged = !attributesEqual(existingConfigOnly, desiredConfigOnly);

  if (configChanged) {
    await client.vefaas.updateFunctionConfiguration(config);
  }

  if (codeChanged) {
    const codeContent = await import('node:fs').then((fs) => fs.readFileSync(codePath));
    const codeBase64 = codeContent.toString('base64');
    await client.vefaas.updateFunctionCode(fn.name, codeBase64);
  }

  const functionInfo = await client.vefaas.getFunction(fn.name);
  if (!functionInfo) {
    throw new Error(
      lang.__('RESOURCE_NOT_FOUND_PROVIDER', { resourceType: 'Function', name: fn.name }),
    );
  }
  const sid =
    currentInstance.sid ?? buildSid('volcengine', context.service, context.stage, fn.name);
  const vefaasInstance = buildVefaasInstanceFromProvider(functionInfo, sid);

  const existingDependentInstances = existingInstances
    .filter((i) => i.type !== 'VOLCENGINE_VEFAAS_FUNCTION')
    .map((i) => {
      const { sid: existingSid, id: existingId, ...rest } = i;
      return {
        sid:
          existingSid ??
          buildSid(
            'volcengine',
            i.type?.toString().replace('VOLCENGINE_', '').toLowerCase() ?? '',
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
      buildSid(
        'volcengine',
        dep.type.replace('VOLCENGINE_', '').toLowerCase(),
        context.stage,
        dep.id,
      ),
    id: dep.id,
    type: dep.type,
    ...(dep.trn ? { trn: dep.trn } : {}),
    ...dep.attributes,
  }));

  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition: desiredDefinition,
    instances: [vefaasInstance, ...existingDependentInstances, ...newDependentInstancesMapped],
    status: 'ready',
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

  const hasVefaasFunction = existingInstances.some((i) => i.type === 'VOLCENGINE_VEFAAS_FUNCTION');

  const client = createVolcengineClient(context);
  if (hasVefaasFunction) {
    try {
      await client.vefaas.deleteFunction(functionName);
    } catch (err) {
      const errorCode = (err as { code?: string })?.code;
      if (errorCode === 'FunctionNotFound' || errorCode === 'ResourceNotFound') {
        logger.warn(
          lang.__('RESOURCE_NOT_FOUND_PROVIDER', { resourceType: 'Function', name: functionName }),
        );
      } else {
        throw err;
      }
    }
  }

  const dependentInstances = existingInstances.filter(
    (i) => i.type !== 'VOLCENGINE_VEFAAS_FUNCTION' && !i.type.includes('undefined'),
  );
  if (dependentInstances.length > 0) {
    await deleteDependentResources(context, dependentInstances);
  }

  return removeResource(state, logicalId);
};
