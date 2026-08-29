import { createVolcengineClient } from '../../common/volcengineClient';
import {
  getResource,
  removeResource,
  setResource,
  setSharedResource,
  getSharedResource,
  removeSharedResource,
  computeZipContentHash,
  buildSid,
  attributesEqual,
  buildFunctionRoleName,
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
  deriveVefaasExecutionStatements,
  VefaasFunctionInfo,
} from './vefaasTypes';
import type { IamStatement } from '../../common/iamStatements';
import { logger } from '../../common/logger';
import { lang } from '../../lang';
import { OWNERSHIP_TAG_KEY, buildOwnershipTagValue, isOwnedByStack } from '../ownershipTag';
import { isResourceAlreadyExistsError } from '../alreadyExists';
import {
  ensureSharedLogProject,
  buildSharedProjectResourceState,
  ensureOwnedTopic,
  deleteTlsLogResources,
  releaseSharedLogProjectIfUnused,
  SHARED_LOG_PROJECT_KEY,
  buildFunctionLogTopicName,
} from './sharedLogProject';

type DependentInstance = {
  type: string;
  id: string;
  sid?: string;
  trn?: string;
  attributes: Record<string, unknown>;
};

const RECOVERY_GET_FUNCTION_DELAY_MS = 1500;

// volcengine role TRN format: trn:iam::{accountId}:role/{roleName}. Prefer the
// stored TRN; else construct from the known accountId, else fetch it via STS.
const resolveRoleTrn = async (
  client: ReturnType<typeof createVolcengineClient>,
  context: Context,
  roleName: string,
  storedTrn?: string | null,
): Promise<string | undefined> => {
  if (storedTrn) return storedTrn;
  if (context.accountId) return `trn:iam::${context.accountId}:role/${roleName}`;
  const accountId = await client.sts.getAccountId();
  return accountId ? `trn:iam::${accountId}:role/${roleName}` : undefined;
};

const IAM_ROLE_PROPAGATION_DELAY_MS = 3000;

// Volcengine SDK surfaces "resource already exists" collisions with code
// `Conflict` (the shared isResourceAlreadyExistsError also matches the message
// "already exists" / "已存在" for the veFaaS flavor of the error).
const VEFAAS_ALREADY_EXISTS_CODES = ['Conflict'];

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

const buildVefaasInstanceFromProvider = (
  info: VefaasFunctionInfo,
  sid: string,
): {
  type: string;
  sid: string;
  id: string;
  functionName: string | null;
  functionId: string | null;
  runtime: string | null;
  handler: string | null;
  memorySize: number | null;
  timeout: number | null;
  environment: Record<string, string>;
  description: string | null | undefined;
  status: string | null;
  createdTime: string | null;
  lastUpdateTime: string | null;
  role: string | null | undefined;
  vpcConfig: Record<string, unknown> | undefined;
  logConfig:
    | {
        project: string | null | undefined;
        topic: string | null | undefined;
        enableLog: boolean | undefined;
      }
    | null
    | undefined;
  releaseRecordId?: string;
  Tags?: Array<{ Key?: string; Value?: string }>;
  exclusiveMode?: boolean;
  maxConcurrency?: number;
  codeSize?: number;
  codeSizeLimit?: number;
  sourceLocation?: string;
  sourceType?: string;
  owner?: string;
  triggersCount?: number;
  instanceType?: string;
  initializerSec?: number;
  command?: string;
  port?: number;
  cpuStrategy?: string;
  projectName?: string;
  functionType?: string;
  cell?: string;
  enableApmplus?: boolean;
  nasStorage?: Record<string, unknown>;
  tosMountConfig?: Record<string, unknown>;
  asyncTaskConfig?: Record<string, unknown>;
} => {
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
    description: info.description ?? undefined,
    status: info.status ?? null,
    createdTime: info.createdTime ?? null,
    lastUpdateTime: info.lastModifiedTime ?? null,
    role: info.role ?? undefined,
    vpcConfig: info.vpcConfig
      ? {
          vpcId: info.vpcConfig.vpcId ?? undefined,
          subnetIds: info.vpcConfig.subnetIds ?? [],
          securityGroupIds: info.vpcConfig.securityGroupIds ?? [],
          enableVpc: info.vpcConfig.enableVpc ?? undefined,
          enableSharedInternetAccess: info.vpcConfig.enableSharedInternetAccess ?? undefined,
        }
      : undefined,
    logConfig: info.logConfig
      ? {
          project: info.logConfig.project ?? undefined,
          topic: info.logConfig.topic ?? undefined,
          enableLog: info.logConfig.enableLog ?? undefined,
        }
      : undefined,
    Tags: info.Tags,
    exclusiveMode: info.exclusiveMode,
    maxConcurrency: info.maxConcurrency,
    codeSize: info.codeSize,
    codeSizeLimit: info.codeSizeLimit,
    sourceLocation: info.sourceLocation,
    sourceType: info.sourceType,
    owner: info.owner,
    triggersCount: info.triggersCount,
    instanceType: info.instanceType,
    initializerSec: info.initializerSec,
    command: info.command,
    port: info.port,
    cpuStrategy: info.cpuStrategy,
    projectName: info.projectName,
    functionType: info.functionType,
    cell: info.cell,
    enableApmplus: info.enableApmplus,
    nasStorage: info.nasStorage,
    tosMountConfig: info.tosMountConfig,
    asyncTaskConfig: info.asyncTaskConfig,
  };
};

const createDependentResources = async (
  context: Context,
  fn: FunctionDomain,
  serviceName: string,
  existingInstances: Array<DependentInstance> = [],
  state?: StateFile,
): Promise<{
  logConfig?: { project: string; topic: string };
  role?: { roleName: string; trn: string };
  instances: Array<DependentInstance>;
  sharedInstance?: ResourceState;
}> => {
  const client = createVolcengineClient(context);
  const instances: Array<DependentInstance> = [];
  let logConfig: { project: string; topic: string } | undefined;
  let sharedInstance: ResourceState | undefined;

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
      // Shared app-scoped TLS project (#214): the project is tracked in the
      // stage shared slot, the function's topic stays nested under the function.
      const shared = await ensureSharedLogProject(context, client, state);
      sharedInstance = buildSharedProjectResourceState(context, shared);

      const topicName = buildFunctionLogTopicName(context.service, context.stage, fn.key);
      const topic = await ensureOwnedTopic(context, client, {
        projectName: shared.projectName,
        topicName,
        logicalId: `functions.${fn.key}`,
      });
      instances.push({
        type: 'VOLCENGINE_TLS_TOPIC',
        id: `${shared.projectName}/${topic.topicName}`,
        attributes: { ...topic },
      });
      instances.push({
        type: 'VOLCENGINE_TLS_INDEX',
        id: `${shared.projectName}/${topic.topicName}/index`,
        attributes: {},
      });

      logConfig = { project: shared.projectName, topic: topic.topicName };
    }
  }

  const iamConfig = fn.iam?.role;
  const statements = iamConfig && typeof iamConfig !== 'string' ? iamConfig.statements : undefined;
  const managedPolicies =
    iamConfig && typeof iamConfig !== 'string' ? iamConfig.managed_policies : undefined;
  const customRoleName = iamConfig && typeof iamConfig !== 'string' ? iamConfig.name : undefined;

  if (iamConfig && typeof iamConfig === 'string') {
    const role = { roleName: iamConfig, trn: iamConfig };
    // External role: never create/manage it, but keep TLS instances and the
    // sharedInstance so log resources are tracked and torn down correctly.
    return { logConfig, role, instances, sharedInstance };
  }

  const roleName = customRoleName ?? buildFunctionRoleName(serviceName, context.stage, fn.key);
  const trustedServices = getTrustedServicesForFunction(fn, context);
  const executionStatements = deriveVefaasExecutionStatements(fn, context);

  if (hasIamRole) {
    const iamRoleInstance = existingInstances.find((i) => i.type === 'VOLCENGINE_IAM_ROLE');
    if (iamRoleInstance) {
      instances.push(iamRoleInstance);
      await client.iam.updateRoleTrustPolicy(
        iamRoleInstance.id,
        buildDefaultTrustPolicy(trustedServices),
      );
    }
  } else {
    logger.info(lang.__('CREATING_IAM_ROLE', { roleName }));
    const iamRole = await client.iam.createRole({
      roleName,
      displayName: roleName,
      description: `veFaaS execution role for ${serviceName}`,
      trustPolicy: buildDefaultTrustPolicy(trustedServices),
      executionStatements,
      customStatements: statements as IamStatement[] | undefined,
      managedPolicies,
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

  const trn = await resolveRoleTrn(client, context, iamRoleInstance.id, iamRoleInstance.trn);

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
    sharedInstance,
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

  // TLS children (index → topic) then any legacy per-resource own-project are
  // deleted in dependency order; the stage-shared project is never touched.
  await deleteTlsLogResources(context, client, instances);

  for (const instance of instances) {
    switch (instance.type) {
      case 'VOLCENGINE_TLS_INDEX':
      case 'VOLCENGINE_TLS_TOPIC':
      case 'VOLCENGINE_TLS_PROJECT':
        break;
      case 'VOLCENGINE_IAM_ROLE': {
        const attrs = instance.attributes as Record<string, unknown> | undefined;
        if (attrs?.external === true) {
          logger.info(
            `Skipping deletion of external IAM role: ${instance.id} (managed externally)`,
          );
          break;
        }
        logger.info(lang.__('DELETING_IAM_ROLE', { id: instance.id }));
        await client.iam.deleteRole(instance.id);
        break;
      }
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
    state,
  );

  const config = functionToVefaasConfig(fn, {
    role: dependentResources.role?.trn,
    logConfig: dependentResources.logConfig,
    vpcConfig: fn.network
      ? {
          vpcId: fn.network.vpc_id,
          subnetIds: fn.network.subnet_ids,
          securityGroupIds: fn.network.security_group?.name ? [fn.network.security_group.name] : [],
        }
      : undefined,
    tosMountConfig: fn.storage?.nas?.[0]
      ? {
          bucketName: (fn.storage.nas[0] as unknown as { bucket_name?: string })?.bucket_name || '',
          mountPath: fn.storage.nas[0].mount_path,
        }
      : undefined,
  });
  config.Tags = [{ Key: OWNERSHIP_TAG_KEY, Value: buildOwnershipTagValue(context, logicalId) }];

  const codePath = fn.code!.path;
  const codeHash = await computeZipContentHash(codePath);
  const resourceAttributes = extractVefaasDefinition(config, codeHash);
  const definition = fn.iam ? { ...resourceAttributes, iam: fn.iam } : resourceAttributes;

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

  const stateWithShared = dependentResources.sharedInstance
    ? setSharedResource(state, context.stage, 'logs.project', dependentResources.sharedInstance)
    : state;
  const stateAfterDependents = setResource(stateWithShared, logicalId, taintedResourceState);

  const client = createVolcengineClient(context);

  const isTainted = existingResourceState?.status === 'tainted';
  const existingFunctionOnRetry = isTainted ? await client.vefaas.getFunction(fn.name) : null;
  if (existingFunctionOnRetry) {
    logger.info(lang.__('VEFAAS_FUNCTION_EXISTS_RECOVERY', { functionName: fn.name }));
  }

  let createdFunctionId: string | undefined;
  let releaseRecordId: string | undefined;
  try {
    if (!existingFunctionOnRetry) {
      // createFunction validates + base64-encodes the zip at codePath itself.
      const created = await client.vefaas.createFunction(config, codePath);
      createdFunctionId = created.functionId;
      releaseRecordId = created.releaseRecordId;
    }
  } catch (error) {
    if (isRecoverableCreateError(error)) {
      await delay(RECOVERY_GET_FUNCTION_DELAY_MS);
      const functionAfterError = await client.vefaas.getFunction(fn.name);
      if (!functionAfterError) {
        throw new PartialResourceError(stateAfterDependents, error as Error);
      }
    } else if (isResourceAlreadyExistsError(error, VEFAAS_ALREADY_EXISTS_CODES)) {
      // Idempotent adoption: the function already exists in the provider.
      // Adopt it ONLY if it carries our ownership tag (proves a previous run
      // of THIS stack created it — e.g. state was reset). An untagged
      // same-named function may belong to another project, so it must fail
      // loudly rather than silently taking it over (destroy would then remove
      // a resource that was never ours).
      const probe = await client.vefaas.getFunction(fn.name);
      if (probe && isOwnedByStack(context, logicalId, probe.Tags)) {
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
      throw new PartialResourceError(stateAfterDependents, error as Error);
    }
  }

  const functionInfo = createdFunctionId
    ? await client.vefaas.getFunctionById(createdFunctionId)
    : await client.vefaas.getFunction(fn.name);
  if (!functionInfo) {
    throw new Error(
      lang.__('RESOURCE_NOT_FOUND_PROVIDER', { resourceType: 'Function', name: fn.name }),
    );
  }
  const vefaasInstance = buildVefaasInstanceFromProvider(functionInfo, sid);
  if (releaseRecordId) {
    vefaasInstance.releaseRecordId = releaseRecordId;
  }

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
  const isTainted = currentState.status === 'tainted';

  const hasIamRole = existingInstances.some((i) => i.type === 'VOLCENGINE_IAM_ROLE');

  const client = createVolcengineClient(context);
  const newDependentInstances: Array<DependentInstance> = [];
  let logConfig: { project: string; topic: string } | undefined;
  let role: { roleName: string; trn: string } | undefined;
  let logState: StateFile | undefined;

  if (fn.log) {
    const tlsTopicInstance = existingInstances.find((i) => i.type === 'VOLCENGINE_TLS_TOPIC');

    if (tlsTopicInstance) {
      // Reuse the tracked topic — legacy own-project/topic instances behave
      // exactly as before; shared-scheme topics live under the shared project.
      const [projectName, topicName] = tlsTopicInstance.id.split('/');
      logConfig = { project: projectName, topic: topicName };
    } else if (!isTainted) {
      // Persist a tainted state BEFORE creating dependent TLS resources so a
      // partial failure (e.g. project created but topic creation fails) leaves a
      // tainted marker for the executor instead of orphaning cloud resources
      // untracked. A retry then resumes with the tainted state.
      const tainted = setResource(state, logicalId, {
        ...currentState,
        status: 'tainted',
      });
      try {
        const deps = await createDependentResources(
          context,
          { ...fn, network: undefined, storage: { disk: undefined, nas: undefined } },
          serviceName,
          [],
          tainted,
        );
        logState = deps.sharedInstance
          ? setSharedResource(tainted, context.stage, 'logs.project', deps.sharedInstance)
          : tainted;
        logConfig = deps.logConfig;
        newDependentInstances.push(
          ...deps.instances.filter((i) => i.type.startsWith('VOLCENGINE_TLS_')),
        );
      } catch (error) {
        throw new PartialResourceError(
          logState ?? tainted,
          error instanceof Error ? error : new Error(String(error)),
        );
      }
    }
  } else {
    const tlsToRemove = existingInstances.filter((i) => i.type.startsWith('VOLCENGINE_TLS_'));
    if (tlsToRemove.length > 0) {
      try {
        await deleteTlsLogResources(context, client, tlsToRemove);
        // Release the shared project when this was its last topic; keep the
        // stage slot when other topics still reference it.
        const shared = getSharedResource(state, context.stage, SHARED_LOG_PROJECT_KEY);
        const releaseResult = await releaseSharedLogProjectIfUnused(context, client, shared);
        if (releaseResult === 'deleted') {
          logState = removeSharedResource(state, context.stage, SHARED_LOG_PROJECT_KEY);
        }
      } catch (error) {
        throw new PartialResourceError(
          state,
          error instanceof Error ? error : new Error(String(error)),
        );
      }
    }
  }

  // Determine if the current role is external (string TRN)
  const currentIam = (currentState.definition as Record<string, unknown>)?.iam as
    | {
        role?: string | { name?: string; managed_policies?: string[]; statements?: IamStatement[] };
      }
    | undefined;
  const isExternalRole = currentIam?.role && typeof currentIam.role === 'string';

  if (isExternalRole) {
    // External role - skip role management, use TRN directly
    role = { roleName: currentIam.role as string, trn: currentIam.role as string };
  } else if (!hasIamRole && !isTainted) {
    // Role creation only: skip TLS so existing log resources are untouched,
    // but keep network/storage so the derived execution baseline matches the
    // function's actual VPC/TOS usage.
    const deps = await createDependentResources(context, { ...fn, log: false }, serviceName);
    role = deps.role;
    newDependentInstances.push(...deps.instances.filter((i) => i.type === 'VOLCENGINE_IAM_ROLE'));
  } else {
    const iamRoleInstance = existingInstances.find((i) => i.type === 'VOLCENGINE_IAM_ROLE');
    if (iamRoleInstance) {
      const trn = await resolveRoleTrn(client, context, iamRoleInstance.id, iamRoleInstance.trn);

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

    // Check statement changes
    const currentRoleConfig =
      currentIam?.role && typeof currentIam.role !== 'string' ? currentIam.role : undefined;
    const desiredRoleConfig =
      fn.iam?.role && typeof fn.iam.role !== 'string' ? fn.iam.role : undefined;

    const desiredIamStatements = desiredRoleConfig?.statements as IamStatement[] | undefined;
    const currentStatementList = currentRoleConfig?.statements as IamStatement[] | undefined;
    const customStatementsChanged =
      JSON.stringify(currentStatementList) !== JSON.stringify(desiredIamStatements);

    // The derived execution baseline depends only on whether the function
    // configures a network / TOS mount. The last deployed state records those
    // as vpcConfig / tosMountConfig, so presence comparison detects drift.
    const existingDefinition = currentState.definition ?? {};
    const derivedBaselineChanged =
      Boolean(fn.network) !== Boolean(existingDefinition.vpcConfig) ||
      Boolean(fn.storage?.nas?.[0]) !== Boolean(existingDefinition.tosMountConfig);

    if ((derivedBaselineChanged || customStatementsChanged) && iamRoleInstance) {
      const baseline = deriveVefaasExecutionStatements(fn, context);
      await client.iam.updateRolePolicy(iamRoleInstance.id, baseline, desiredIamStatements);
    }

    // Check managed policy changes
    const desiredManagedPolicies = desiredRoleConfig?.managed_policies;
    const currentManagedPoliciesList = currentRoleConfig?.managed_policies;
    const managedPoliciesChanged =
      JSON.stringify(currentManagedPoliciesList) !== JSON.stringify(desiredManagedPolicies);
    if (managedPoliciesChanged && iamRoleInstance) {
      await client.iam.updateManagedPolicies(iamRoleInstance.id, desiredManagedPolicies ?? []);
    }
  }

  const config = functionToVefaasConfig(fn, {
    role: role?.trn,
    logConfig,
    vpcConfig: fn.network
      ? {
          vpcId: fn.network.vpc_id,
          subnetIds: fn.network.subnet_ids,
          securityGroupIds: fn.network.security_group?.name ? [fn.network.security_group.name] : [],
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
  const desiredCodeHash = await computeZipContentHash(codePath);
  const baseDefinition = extractVefaasDefinition(config, desiredCodeHash);
  const desiredDefinition = fn.iam ? { ...baseDefinition, iam: fn.iam } : baseDefinition;

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

  // The instance in state carries the provider function Id — use it directly
  // for all follow-up calls instead of re-resolving the name every time.
  const currentFunctionId = (currentInstance as { functionId?: string | null }).functionId;

  let lastReleaseRecordId: string | undefined;

  if (configChanged) {
    const released = await client.vefaas.updateFunctionConfiguration(
      currentFunctionId ?? fn.name,
      config,
    );
    if (released) lastReleaseRecordId = released;
  }

  if (codeChanged) {
    const updated = await client.vefaas.updateFunctionCode(currentFunctionId ?? fn.name, codePath);
    lastReleaseRecordId = updated.releaseRecordId;
  }

  const functionInfo = currentFunctionId
    ? await client.vefaas.getFunctionById(currentFunctionId)
    : await client.vefaas.getFunction(fn.name);
  if (!functionInfo) {
    throw new Error(
      lang.__('RESOURCE_NOT_FOUND_PROVIDER', { resourceType: 'Function', name: fn.name }),
    );
  }
  const sid =
    currentInstance.sid ?? buildSid('volcengine', context.service, context.stage, fn.name);
  const vefaasInstance = buildVefaasInstanceFromProvider(functionInfo, sid);
  if (lastReleaseRecordId) {
    vefaasInstance.releaseRecordId = lastReleaseRecordId;
  } else if (!codeChanged && !configChanged) {
    // Preserve the previously recorded release id when nothing changed.
    const previousRelease = (currentInstance as { releaseRecordId?: string | null })
      .releaseRecordId;
    if (previousRelease) {
      vefaasInstance.releaseRecordId = previousRelease;
    }
  }

  const existingDependentInstances = existingInstances
    .filter(
      (i) =>
        i.type !== 'VOLCENGINE_VEFAAS_FUNCTION' &&
        (!!fn.log || !i.type.startsWith('VOLCENGINE_TLS_')),
    )
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

  return setResource(logState ?? state, logicalId, resourceState);
};

export const deleteResource = async (
  context: Context,
  functionName: string,
  logicalId: string,
  state: StateFile,
): Promise<StateFile> => {
  const existingState = getResource(state, logicalId);
  const existingInstances = (existingState?.instances ?? []) as Array<DependentInstance>;

  const vefaasInstance = existingInstances.find((i) => i.type === 'VOLCENGINE_VEFAAS_FUNCTION');
  const functionId = (vefaasInstance as { functionId?: string | null } | undefined)?.functionId;

  const client = createVolcengineClient(context);
  if (functionId) {
    try {
      await client.vefaas.deleteFunction(functionId);
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
