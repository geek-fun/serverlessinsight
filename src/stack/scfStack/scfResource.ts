import {
  Context,
  FunctionDomain,
  PartialResourceError,
  ResourceState,
  StateFile,
  ResourceTypeEnum,
} from '../../types';
import { createTencentClient } from '../../common/tencentClient';
import { readFileAsBase64 } from '../../common/fileUtils';
import { functionToScfConfig, extractScfDefinition, ScfFunctionInfo } from './scfTypes';
import {
  getResource,
  setResource,
  removeResource,
  getSharedResource,
  setSharedResource,
  removeSharedResource,
} from '../../common/stateManager';
import {
  buildSid,
  attributesEqual,
  ProviderEnum,
  mapAuthType,
  mapAccess,
  buildFunctionRoleName,
} from '../../common';
import { RAM_ROLE_PROPAGATION_DELAY_MS } from '../../common/constants';
import { computeZipContentHash } from '../../common/hashUtils';
import { logger } from '../../common/logger';
import { lang } from '../../lang';
import type { IamStatement } from '../../common/iamStatements';
import { OWNERSHIP_TAG_KEY, buildOwnershipTagValue, isOwnedByStack } from '../ownershipTag';
import { isResourceAlreadyExistsError } from '../alreadyExists';
import {
  SHARED_LOGSET_KEY,
  buildSharedLogsetName,
  buildFunctionTopicName,
  ensureSharedLogset,
  buildSharedLogsetResourceState,
  ensureFunctionTopic,
  releaseSharedLogsetIfUnused,
} from './sharedLogset';

/**
 * Build the Function URL trigger description for Tencent CreateTrigger
 * (Type: 'http'). Format per official docs (创建函数 URL / Creating a Function
 * URL): { AuthType, NetConfig: { EnableIntranet, EnableExtranet } }.
 * AuthType is the mapAuthType result ('NONE' = no auth, 'CAM' = CAM auth);
 * the API Gateway trigger format ({ api/service/release }) is obsolete —
 * Tencent shut down new API Gateway triggers on 2024-07-01.
 */
const buildTencentTriggerDesc = (
  authType: string,
  netConfig: { enableIntranet?: boolean; enableExtranet?: boolean },
): string =>
  JSON.stringify({
    AuthType: authType,
    NetConfig: {
      EnableIntranet: netConfig.enableIntranet ?? false,
      EnableExtranet: netConfig.enableExtranet ?? true,
    },
  });

// Tencent names Function URL triggers with a random id (e.g. "5obtzwwxw1"), not
// our ${fn.key}-http-trigger, so name-based matching never finds them. A
// Function URL trigger is identified by Type 'http' + a TriggerDesc carrying
// the NetConfig field (the API Gateway flavor uses api/service/release instead).
const isFunctionUrlTrigger = (t: { TriggerName?: string; Type?: string; TriggerDesc?: string }) =>
  t.Type === 'http' && typeof t.TriggerDesc === 'string' && t.TriggerDesc.includes('NetConfig');

type ScfDependentInstance = {
  type: string;
  id: string;
  sid: string;
  roleArn?: string;
  external?: boolean;
  protocol?: string;
  logsetId?: string;
  topicName?: string;
};

/**
 * Best-effort extraction of a cloud-SDK error's useful details. Tencent SDK
 * errors carry `code`/`message`/`requestId` (and may throw with an empty
 * `message`), so we compose them into a non-empty, diagnosable string —
 * otherwise a PartialResourceError surfaces as a blank failure line.
 */
const toErrorMessage = (error: unknown): string => {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  if (error && typeof error === 'object') {
    const parts: string[] = [];
    const rec = error as Record<string, unknown>;
    if (typeof rec.code === 'string' && rec.code) parts.push(rec.code);
    if (typeof rec.message === 'string' && rec.message) parts.push(rec.message);
    if (typeof rec.requestId === 'string' && rec.requestId)
      parts.push(`requestId=${rec.requestId}`);
    if (parts.length > 0) return parts.join(' · ');
  }
  return String(error) || 'unknown error';
};

// Minimal provider shape needed for trigger-duplication checks on adoption —
// the full provider info type (common/tencentClient/types) differs from the
// state-builder ScfFunctionInfo type below.
type AdoptedProviderInfo = {
  Triggers?: Array<{ TriggerName: string; Type: string }>;
};

const delay = async (ms: number): Promise<void> => {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

// Delay before probing the provider after a recoverable create error — the
// platform may still be propagating a just-created function.
const RECOVERY_GET_FUNCTION_DELAY_MS = 1500;

// Create errors recoverable by reconciling with provider state. Deliberately
// limited to timeout/network conditions. A create-time "already exists" (Tencent
// reports ResourceInUse with a localized message "指定的Function已存在，请勿重复创建")
// is NOT recoverable on the non-tainted path: the cloud resource may not be owned
// by this stack, so it must propagate as PartialResourceError (persisting tainted
// state) for the user to resolve manually — no auto-adopt (product decision D1).
// Only the tainted pre-flight path may adopt a pre-existing function.
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

// CLS destination drift is only meaningful when the desired config carries one —
// a log-enabled function whose stable destination names differ from state must
// re-push configuration so UpdateFunctionConfiguration rebinds the function.
const isLogConfigChanged = (
  desiredDefinition: Record<string, unknown>,
  existingDefinition: Record<string, unknown>,
): boolean => {
  const desiredLogConfig = desiredDefinition.logConfig as Record<string, unknown> | undefined;
  if (!desiredLogConfig) {
    return false;
  }
  return !attributesEqual(
    desiredLogConfig,
    (existingDefinition.logConfig as Record<string, unknown> | undefined) ?? {},
  );
};

const buildScfInstanceFromProvider = (info: ScfFunctionInfo, sid: string) => {
  const envMap: Record<string, string> =
    info.Environment?.Variables?.reduce(
      (acc, v) => ({ ...acc, [v.Key]: v.Value }),
      {} as Record<string, string>,
    ) ?? {};

  const triggersArray = info.Triggers?.map((t) => ({
    modTime: t.ModTime,
    type: t.Type,
    triggerDesc: t.TriggerDesc,
    triggerName: t.TriggerName,
    addTime: t.AddTime,
    enable: t.Enable,
    customArgument: t.CustomArgument ?? null,
    availableStatus: t.AvailableStatus ?? null,
    resourceId: t.ResourceId ?? null,
    bindStatus: t.BindStatus ?? null,
    triggerAttribute: t.TriggerAttribute ?? null,
    qualifier: t.Qualifier ?? null,
    description: t.Description ?? null,
  }));

  const tagsArray = info.Tags?.map((t) => ({
    key: t.Key,
    value: t.Value,
  }));

  const layersArray = info.Layers?.map((l) => ({
    layerName: l.LayerName ?? null,
    layerVersion: l.LayerVersion ?? null,
    compatibleRuntimes: l.CompatibleRuntimes ?? [],
    addTime: l.AddTime ?? null,
    description: l.Description ?? null,
    licenseInfo: l.LicenseInfo ?? null,
    status: l.Status ?? null,
    stamp: l.Stamp ?? null,
    tags:
      l.Tags?.map((t) => ({
        key: t.Key,
        value: t.Value,
      })) ?? [],
  }));

  return {
    sid,
    id: info.FunctionName,
    functionName: info.FunctionName,
    runtime: info.Runtime,
    handler: info.Handler,
    memorySize: info.MemorySize,
    timeout: info.Timeout,
    environment: envMap,
    modTime: info.ModTime ?? null,
    codeSha256: info.CodeSha256 ?? null,
    codeInfo: info.CodeInfo ?? null,
    description: info.Description ?? null,
    triggers: triggersArray ?? [],
    codeSize: info.CodeSize ?? null,
    functionVersion: info.FunctionVersion ?? null,
    vpcConfig: info.VpcConfig
      ? {
          vpcId: info.VpcConfig.VpcId ?? null,
          subnetId: info.VpcConfig.SubnetId ?? null,
        }
      : {},
    useGpu: info.UseGpu ?? null,
    codeResult: info.CodeResult ?? null,
    codeError: info.CodeError ?? null,
    errNo: info.ErrNo ?? null,
    namespace: info.Namespace ?? null,
    role: info.Role ?? null,
    installDependency: info.InstallDependency ?? null,
    status: info.Status ?? null,
    statusDesc: info.StatusDesc ?? null,
    clsLogsetId: info.ClsLogsetId ?? null,
    clsTopicId: info.ClsTopicId ?? null,
    functionId: info.FunctionId ?? null,
    tags: tagsArray ?? [],
    eipConfig: info.EipConfig
      ? {
          eipFixed: info.EipConfig.EipFixed ?? null,
          eips: info.EipConfig.Eips ?? [],
        }
      : {},
    accessInfo: info.AccessInfo
      ? {
          host: info.AccessInfo.Host ?? null,
          vip: info.AccessInfo.Vip ?? null,
        }
      : {},
    type: info.Type ?? null,
    l5Enable: info.L5Enable ?? null,
    layers: layersArray ?? [],
    deadLetterConfig: info.DeadLetterConfig
      ? {
          type: info.DeadLetterConfig.Type ?? null,
          name: info.DeadLetterConfig.Name ?? null,
          filterType: info.DeadLetterConfig.FilterType ?? null,
        }
      : {},
    addTime: info.AddTime ?? null,
    publicNetConfig: info.PublicNetConfig
      ? {
          publicNetStatus: info.PublicNetConfig.PublicNetStatus ?? null,
          eipConfig: info.PublicNetConfig.EipConfig
            ? {
                eipStatus: info.PublicNetConfig.EipConfig.EipStatus ?? null,
                eipAddress: info.PublicNetConfig.EipConfig.EipAddress ?? [],
              }
            : {},
        }
      : {},
    onsEnable: info.OnsEnable ?? null,
    cfsConfig: info.CfsConfig
      ? {
          cfsInsList:
            info.CfsConfig.CfsInsList?.map((c) => ({
              userId: c.UserId ?? null,
              userGroupId: c.UserGroupId ?? null,
              cfsId: c.CfsId ?? null,
              mountInsId: c.MountInsId ?? null,
              localMountDir: c.LocalMountDir ?? null,
              remoteMountDir: c.RemoteMountDir ?? null,
              ipAddress: c.IpAddress ?? null,
              mountVpcId: c.MountVpcId ?? null,
              mountSubnetId: c.MountSubnetId ?? null,
            })) ?? [],
        }
      : {},
    availableStatus: info.AvailableStatus ?? null,
    qualifier: info.Qualifier ?? null,
    initTimeout: info.InitTimeout ?? null,
    statusReasons:
      info.StatusReasons?.map((s) => ({
        errorCode: s.ErrorCode ?? null,
        errorMessage: s.ErrorMessage ?? null,
      })) ?? [],
    asyncRunEnable: info.AsyncRunEnable ?? null,
    traceEnable: info.TraceEnable ?? null,
    imageConfig: info.ImageConfig
      ? {
          imageType: info.ImageConfig.ImageType ?? null,
          imageUri: info.ImageConfig.ImageUri ?? null,
          registryId: info.ImageConfig.RegistryId ?? null,
          entryPoint: info.ImageConfig.EntryPoint ?? null,
          command: info.ImageConfig.Command ?? null,
          args: info.ImageConfig.Args ?? null,
          containerImageAccelerate: info.ImageConfig.ContainerImageAccelerate ?? null,
          imagePort: info.ImageConfig.ImagePort ?? null,
        }
      : {},
    protocolType: info.ProtocolType ?? null,
    protocolParams: info.ProtocolParams
      ? {
          wsParams: info.ProtocolParams.WSParams
            ? {
                idleTimeOut: info.ProtocolParams.WSParams.IdleTimeOut ?? null,
              }
            : {},
        }
      : {},
    dnsCache: info.DnsCache ?? null,
    intranetConfig: info.IntranetConfig
      ? {
          ipFixed: info.IntranetConfig.IpFixed ?? null,
          ipAddress: info.IntranetConfig.IpAddress ?? [],
        }
      : {},
    instanceConcurrencyConfig: info.InstanceConcurrencyConfig
      ? {
          dynamicEnabled: info.InstanceConcurrencyConfig.DynamicEnabled ?? null,
          maxConcurrency: info.InstanceConcurrencyConfig.MaxConcurrency ?? null,
          instanceIsolationEnabled: info.InstanceConcurrencyConfig.InstanceIsolationEnabled ?? null,
          type: info.InstanceConcurrencyConfig.Type ?? null,
          mixNodeConfig: info.InstanceConcurrencyConfig.MixNodeConfig ?? [],
          sessionConfig: info.InstanceConcurrencyConfig.SessionConfig ?? {},
        }
      : {},
  };
};

/**
 * Least-privilege SCF execution statements for a function's CAM role.
 *
 * Tencent SCF resolves its code package from COS, writes function logs to CLS,
 * and invokes other functions via the role, so the scf/CLS/COS-GetObject
 * actions are unconditional. The tencent FunctionDomain.storage shape carries
 * only disk/nas — no function-level signal proves COS runtime usage — so the
 * remaining COS actions stay alongside GetObject rather than being gated (no
 * invented signals). The fn/context parameters are reserved for per-function
 * derivation (e.g. COS gating) once such a signal exists.
 */
export const deriveScfExecutionStatements = (
  fn: FunctionDomain,
  context: Context,
): IamStatement[] => {
  void fn;
  void context;
  return [
    { effect: 'Allow', action: ['scf:InvokeFunction'], resource: ['*'] },
    {
      effect: 'Allow',
      action: ['cls:logset:putlog', 'cls:logset:create*', 'cls:logset:get*'],
      resource: ['*'],
    },
    {
      effect: 'Allow',
      action: ['cos:GetObject', 'cos:PutObject', 'cos:DeleteObject', 'cos:ListBucket'],
      resource: ['*'],
    },
  ];
};

const createDependentResources = async (
  context: Context,
  fn: FunctionDomain,
  existingInstances: Array<Record<string, unknown>> = [],
  state?: StateFile,
  existingDefinition?: Record<string, unknown>,
): Promise<{
  role?: { roleName?: string; arn?: string };
  clsConfig?: { logsetId: string; logsetName: string; topicId: string; topicName: string };
  clsInstances: Array<ScfDependentInstance>;
  sharedInstance?: ResourceState;
}> => {
  const client = createTencentClient(context);
  const clsInstances: Array<ScfDependentInstance> = [];
  let clsConfig:
    { logsetId: string; logsetName: string; topicId: string; topicName: string } | undefined;
  let sharedInstance: ResourceState | undefined;

  if (fn.log) {
    const topicInstance = existingInstances.find(
      (i) => (i as ScfDependentInstance).type === ResourceTypeEnum.TENCENT_CLS_TOPIC,
    ) as ScfDependentInstance | undefined;
    const logsetInstance = existingInstances.find(
      (i) => (i as ScfDependentInstance).type === ResourceTypeEnum.TENCENT_CLS_LOGSET,
    ) as ScfDependentInstance | undefined;

    if (topicInstance && logsetInstance) {
      clsConfig = {
        logsetId: (logsetInstance as { logsetId?: string }).logsetId ?? '',
        logsetName: logsetInstance.id,
        topicId: topicInstance.id,
        topicName: (topicInstance as { topicName?: string }).topicName ?? topicInstance.id,
      };
      clsInstances.push(logsetInstance, topicInstance);
    } else {
      const legacyFn = existingInstances.find(
        (i) => (i as ScfDependentInstance).type === undefined,
      ) as { clsLogsetId?: string; clsTopicId?: string } | undefined;
      if (legacyFn?.clsLogsetId && legacyFn?.clsTopicId) {
        clsConfig = {
          logsetId: legacyFn.clsLogsetId,
          logsetName: buildSharedLogsetName(context.app, context.stage),
          topicId: legacyFn.clsTopicId,
          topicName: buildFunctionTopicName(context),
        };
      } else {
        const shared = await ensureSharedLogset(context, client, state);
        sharedInstance = buildSharedLogsetResourceState(context, shared);
        const topic = await ensureFunctionTopic(context, client, {
          logsetId: shared.logsetId,
          logsetName: shared.logsetName,
          topicName: buildFunctionTopicName(context, fn.key),
          logicalId: `functions.${fn.key}`,
        });
        clsInstances.push(
          {
            sid: buildSid('tencent', 'cls-logset', context.stage, shared.logsetName),
            type: ResourceTypeEnum.TENCENT_CLS_LOGSET,
            id: shared.logsetName,
            logsetId: shared.logsetId,
          },
          {
            sid: buildSid('tencent', 'cls-topic', context.stage, topic.topicName),
            type: ResourceTypeEnum.TENCENT_CLS_TOPIC,
            id: topic.topicId,
            topicName: topic.topicName,
          },
        );
        clsConfig = {
          logsetId: shared.logsetId,
          logsetName: shared.logsetName,
          topicId: topic.topicId,
          topicName: topic.topicName,
        };
      }
    }
  }

  const iamConfig = fn.iam?.role;

  // No IAM role configured - skip
  if (!iamConfig) {
    return { clsConfig, clsInstances, sharedInstance };
  }

  const statements = iamConfig && typeof iamConfig !== 'string' ? iamConfig.statements : undefined;
  const managedPolicies =
    iamConfig && typeof iamConfig !== 'string' ? iamConfig.managed_policies : undefined;
  const customRoleName = iamConfig && typeof iamConfig !== 'string' ? iamConfig.name : undefined;

  // External role (string) - skip creation, use ARN directly
  if (typeof iamConfig === 'string') {
    return { role: { roleName: '', arn: iamConfig }, clsConfig, clsInstances, sharedInstance };
  }

  const hasCamRole = existingInstances.some((i) => i.type === 'TENCENT_SCF_ROLE');
  const serviceName = `${context.app}-${context.service}`;
  const defaultRoleName = buildFunctionRoleName(serviceName, context.stage, fn.key);
  const roleName = customRoleName ?? defaultRoleName;
  const executionStatements = deriveScfExecutionStatements(fn, context);

  if (hasCamRole) {
    // Role already exists - reuse it. Keyed on the TENCENT_SCF_ROLE instance
    // type (not the desired name), so pre-existing deployments keep the role
    // they were created with even though the default name now includes fn.key.
    const existingRoleInstance = existingInstances.find(
      (i) => i.type === ResourceTypeEnum.TENCENT_SCF_ROLE && !(i as ScfDependentInstance).external,
    ) as ScfDependentInstance | undefined;
    const reusedRoleName = existingRoleInstance?.id ?? roleName;

    // Propagate the inline policy (derived baseline + custom statements) only
    // when the custom statements drifted from the last stored definition.
    const desiredStatements = statements as IamStatement[] | undefined;
    const existingRole = existingDefinition?.iam as Record<string, unknown> | undefined;
    const existingStatements =
      existingRole && existingRole.role && typeof existingRole.role !== 'string'
        ? (existingRole.role as Record<string, unknown>).statements
        : undefined;
    if (
      !attributesEqual(
        (existingStatements ?? []) as unknown as Record<string, unknown>,
        (desiredStatements ?? []) as unknown as Record<string, unknown>,
      )
    ) {
      await client.cam.updateRolePolicy(reusedRoleName, desiredStatements, executionStatements);
    }

    return {
      role: { roleName: reusedRoleName, arn: reusedRoleName },
      clsConfig,
      clsInstances,
      sharedInstance,
    };
  }

  // Create new CAM role
  const trustedServices = ['scf.qcloud.com'];
  logger.info(lang.__('CREATING_RAM_ROLE', { roleName }));
  const camRole = await client.cam.createRole(
    roleName,
    trustedServices,
    `ServerlessInsight SCF execution role for ${serviceName}`,
    statements as IamStatement[] | undefined,
    managedPolicies,
    executionStatements,
  );

  await delay(RAM_ROLE_PROPAGATION_DELAY_MS);

  return {
    role: { roleName: camRole.roleName, arn: camRole.roleArn ?? roleName },
    clsConfig,
    clsInstances,
    sharedInstance,
  };
};

const deleteDependentResources = async (
  context: Context,
  instances: Array<{ type: string; id: string; external?: boolean }>,
): Promise<void> => {
  const client = createTencentClient(context);
  for (const instance of instances) {
    switch (instance.type) {
      case ResourceTypeEnum.TENCENT_SCF_ROLE: {
        if (instance.external) break; // Skip external roles
        logger.info(lang.__('DELETING_RAM_ROLE', { id: instance.id }));
        await client.cam.deleteRole(instance.id);
        break;
      }
      case ResourceTypeEnum.TENCENT_CLS_TOPIC: {
        logger.info(lang.__('DELETING_CLS_TOPIC', { id: instance.id }));
        await client.cls.deleteTopic(instance.id);
        break;
      }
      case ResourceTypeEnum.TENCENT_CLS_LOGSET: {
        // The shared CLS logset is released by the destroyer once no topics remain.
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

  // Fail config validation BEFORE any cloud operation or tainted-state write,
  // so an invalid trigger config can never strand a partially-created resource.
  if (fn.triggers?.http && !fn.triggers.http.auth_type) {
    throw new Error(lang.__('HTTP_TRIGGER_AUTH_TYPE_REQUIRED', { functionName: fn.name }));
  }

  const existingResourceState = getResource(state, logicalId);

  const dependentResources = await createDependentResources(
    context,
    fn,
    existingResourceState?.instances ?? [],
    state,
    existingResourceState?.definition as Record<string, unknown> | undefined,
  );

  let config = functionToScfConfig(fn);
  config.Tags = [{ Key: OWNERSHIP_TAG_KEY, Value: buildOwnershipTagValue(context, logicalId) }];

  if (dependentResources.role) {
    config = {
      ...config,
      Role: dependentResources.role.arn,
    };
  }

  if (dependentResources.clsConfig) {
    config = {
      ...config,
      ClsLogsetId: dependentResources.clsConfig.logsetId,
      ClsTopicId: dependentResources.clsConfig.topicId,
      ClsLogsetName: dependentResources.clsConfig.logsetName,
      ClsTopicName: dependentResources.clsConfig.topicName,
    };
  }

  const codePath = fn.code!.path;
  const codeBase64 = readFileAsBase64(codePath);
  const codeHash = await computeZipContentHash(codePath);
  const definition = extractScfDefinition(config, codeHash, fn.iam);

  const dependentInstances: Array<ScfDependentInstance> = [...dependentResources.clsInstances];
  if (dependentResources.role) {
    const iamConfig = fn.iam?.role;
    const isExternalRole = typeof iamConfig === 'string';
    const roleSid = buildSid(
      'tencent',
      'scf-role',
      context.stage,
      dependentResources.role.roleName ?? '',
    );
    dependentInstances.push({
      sid: roleSid,
      type: ResourceTypeEnum.TENCENT_SCF_ROLE,
      id: dependentResources.role.roleName ?? '',
      ...(dependentResources.role.arn ? { roleArn: dependentResources.role.arn } : {}),
      ...(isExternalRole ? { external: true } : {}),
    });
  }

  const taintedResourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: dependentInstances,
    lastUpdated: new Date().toISOString(),
    status: 'tainted',
  };

  const stateWithShared = dependentResources.sharedInstance
    ? setSharedResource(state, context.stage, SHARED_LOGSET_KEY, dependentResources.sharedInstance)
    : state;
  const stateAfterDependents = setResource(stateWithShared, logicalId, taintedResourceState);

  const client = createTencentClient(context);

  const isTainted = existingResourceState?.status === 'tainted';
  const existingFunctionOnRetry = isTainted ? await client.scf.getFunction(fn.name) : null;

  // Provider info of a function adopted from a previous partial run (tainted
  // retry or reconciled after a create error) — used to skip already-attached
  // triggers below.
  let adoptedInfo: AdoptedProviderInfo | null = existingFunctionOnRetry;

  if (existingFunctionOnRetry) {
    logger.info(
      `Function ${fn.name} already exists in provider (tainted recovery), skipping create and refreshing state`,
    );
  }

  try {
    if (!existingFunctionOnRetry) {
      // createFunction internally polls until the function is Active (see
      // scfOperations) — triggers/domains below are safe to attach immediately.
      await client.scf.createFunction(config, codeBase64);
    }
  } catch (error) {
    if (isRecoverableCreateError(error)) {
      logger.warn(
        `Create function returned recoverable error for ${fn.name}, reconciling with provider state: ${String(error)}`,
      );

      await delay(RECOVERY_GET_FUNCTION_DELAY_MS);
      const afterError = await client.scf.getFunction(fn.name);
      if (afterError) {
        adoptedInfo = afterError;
        logger.info(
          `Function ${fn.name} found after create error reconciliation, continuing deployment flow`,
        );
      } else {
        throw new PartialResourceError(stateAfterDependents, new Error(toErrorMessage(error)));
      }
    } else if (isResourceAlreadyExistsError(error)) {
      // Idempotent adoption: the function already exists in the provider.
      // Adopt it ONLY if it carries our ownership tag (proves a previous run
      // of THIS stack created it — e.g. state was reset). An untagged
      // same-named function may belong to another project, so it must fail
      // loudly rather than silently taking it over (destroy would then remove
      // a resource that was never ours).
      const probe = await client.scf.getFunction(fn.name);
      if (probe && isOwnedByStack(context, logicalId, probe.Tags)) {
        adoptedInfo = probe;
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
      throw new PartialResourceError(stateAfterDependents, new Error(toErrorMessage(error)));
    }
  }

  // Create HTTP trigger if configured
  if (fn.triggers?.http) {
    const authType = mapAuthType(ProviderEnum.TENCENT, fn.triggers.http.auth_type);
    const access = mapAccess(fn.triggers.http.access);
    const triggerName = `${fn.key}-http-trigger`;

    const triggerDesc = buildTencentTriggerDesc(authType, access);

    // Probe the provider for an already-attached trigger BEFORE attempting to
    // create it. A leftover trigger from a previous partial run (function exists
    // in cloud, state blank) would otherwise collide with CreateTrigger and
    // surface as a confusing empty error. Applies to both fresh creates (function
    // just created — Triggers from the createFunction flow) and tainted retries.
    let providerTriggers: Array<{ TriggerName: string; Type: string }> =
      adoptedInfo?.Triggers ?? [];
    if (providerTriggers.length === 0) {
      const probe = await client.scf.getFunction(fn.name);
      if (probe) {
        providerTriggers = probe.Triggers ?? [];
      }
    }

    const triggerAlreadyAttached = providerTriggers.some(isFunctionUrlTrigger);

    if (triggerAlreadyAttached) {
      logger.info(`HTTP trigger ${triggerName} already attached to ${fn.name}, skipping creation`);
    } else {
      logger.info(lang.__('CREATING_HTTP_TRIGGER', { triggerName, functionName: fn.name }));

      try {
        await client.scf.createTrigger({
          FunctionName: fn.name,
          TriggerName: triggerName,
          Type: 'http',
          TriggerDesc: triggerDesc,
          Qualifier: '$DEFAULT',
          Enable: 'OPEN',
        });

        logger.info(lang.__('HTTP_TRIGGER_CREATED', { triggerName, functionName: fn.name }));
      } catch (error) {
        if (isResourceAlreadyExistsError(error)) {
          logger.warn(
            `HTTP trigger ${triggerName} already exists on ${fn.name}, continuing: ${String(error)}`,
          );
        } else {
          // The function exists in the cloud but the trigger failed to attach —
          // persist the tainted state so a re-run reconciles instead of losing it.
          throw new PartialResourceError(stateAfterDependents, new Error(toErrorMessage(error)));
        }
      }
    }
  }

  // Create custom domain if configured
  if (fn.domain) {
    logger.info(lang.__('CREATING_CUSTOM_DOMAIN', { domainName: fn.domain.domain_name }));
    try {
      await client.scf.createCustomDomain({
        Domain: fn.domain.domain_name,
        Protocol: fn.domain.protocol,
        EndpointsConfig: [
          {
            Namespace: 'default',
            FunctionName: fn.name,
            Qualifier: '$DEFAULT',
            PathMatch: '/*',
          },
        ],
        ...(fn.domain.certificate_id
          ? { CertConfig: { CertificateId: fn.domain.certificate_id } }
          : {}),
      });
    } catch (error) {
      throw new PartialResourceError(stateAfterDependents, new Error(toErrorMessage(error)));
    }
    logger.info(lang.__('CUSTOM_DOMAIN_CREATED', { domainName: fn.domain.domain_name }));

    const domainSid = buildSid(
      'tencent',
      'scf-custom-domain',
      context.stage,
      fn.domain.domain_name,
    );
    dependentInstances.push({
      sid: domainSid,
      type: 'TENCENT_SCF_CUSTOM_DOMAIN',
      id: fn.domain.domain_name,
      protocol: fn.domain.protocol,
    });
  }

  // Refresh state from provider to get all attributes (including triggers)
  let functionInfo;
  try {
    functionInfo = await client.scf.getFunction(fn.name);
  } catch (error) {
    throw new PartialResourceError(stateAfterDependents, new Error(toErrorMessage(error)));
  }
  if (!functionInfo) {
    throw new PartialResourceError(
      stateAfterDependents,
      new Error(`Failed to refresh state for function: ${fn.name}`),
    );
  }

  const sid = buildSid('tencent', 'scf', context.stage, fn.name);
  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [
      buildScfInstanceFromProvider(functionInfo as ScfFunctionInfo, sid),
      ...dependentInstances,
    ],
    lastUpdated: new Date().toISOString(),
    status: 'ready',
  };

  return setResource(stateAfterDependents, logicalId, resourceState);
};

export const readResource = async (context: Context, functionName: string) => {
  const client = createTencentClient(context);
  return await client.scf.getFunction(functionName);
};

export const updateResource = async (
  context: Context,
  fn: FunctionDomain,
  state: StateFile,
): Promise<StateFile> => {
  const logicalId = `functions.${fn.key}`;

  const existingState = getResource(state, logicalId);
  const existingInstances = (existingState?.instances ?? []) as Array<Record<string, unknown>>;

  const existingFnInstance = existingInstances.find(
    (i) => (i as ScfDependentInstance).type === undefined,
  ) as Record<string, unknown> | undefined;

  const existingClsTopicInstance = existingInstances.find(
    (i) => (i as ScfDependentInstance).type === ResourceTypeEnum.TENCENT_CLS_TOPIC,
  ) as ScfDependentInstance | undefined;

  const existingDefinition = (existingState?.definition ?? {}) as Record<string, unknown>;
  const legacyLogsetId = existingFnInstance?.clsLogsetId as string | undefined;
  const legacyTopicId = existingFnInstance?.clsTopicId as string | undefined;
  // Log is bound via the unified flow (definition.logConfig) or legacy CLS ids
  // stored directly on the function instance.
  const wasLogEnabled = Boolean(
    (existingDefinition.logConfig as Record<string, unknown> | undefined)?.logset ||
    (legacyLogsetId && legacyTopicId),
  );
  const hasCamRole = existingInstances.some((i) => i.type === ResourceTypeEnum.TENCENT_SCF_ROLE);
  const client = createTencentClient(context);

  const newIamRole = fn.iam?.role;
  let role: { roleName?: string; arn?: string } | undefined;

  if (typeof newIamRole === 'string') {
    // External role - use ARN directly, skip management
    role = { roleName: '', arn: newIamRole };
  } else if (!hasCamRole) {
    // No existing role - create one
    const deps = await createDependentResources(context, fn);
    role = deps.role;
  } else {
    // Role exists - update trust/managed policies if iam changed
    const ramRoleInstance = existingInstances.find(
      (i) => i.type === ResourceTypeEnum.TENCENT_SCF_ROLE && !(i as ScfDependentInstance).external,
    ) as ScfDependentInstance | undefined;

    if (ramRoleInstance) {
      role = {
        roleName: ramRoleInstance.id,
        arn: ramRoleInstance.roleArn ?? ramRoleInstance.id,
      };

      const existingIam = existingState?.definition?.iam as Record<string, unknown> | undefined;
      const desiredIam = fn.iam;
      const iamChanged = !attributesEqual(existingIam ?? {}, desiredIam ?? {});
      if (iamChanged) {
        // Check for statement changes
        const desiredStatements = newIamRole ? newIamRole.statements : undefined;
        const existingRole = existingIam?.role as Record<string, unknown> | undefined;
        const existingStatements =
          existingRole && typeof existingRole !== 'string' ? existingRole.statements : undefined;
        if (
          !attributesEqual(
            (existingStatements ?? []) as unknown as Record<string, unknown>,
            (desiredStatements ?? []) as unknown as Record<string, unknown>,
          )
        ) {
          await client.cam.updateRolePolicy(
            ramRoleInstance.id,
            desiredStatements as IamStatement[] | undefined,
            deriveScfExecutionStatements(fn, context),
          );
        }

        // Check for managed policy changes
        const desiredManagedPolicies = newIamRole ? newIamRole.managed_policies : undefined;
        const existingManagedPolicies =
          existingRole && typeof existingRole !== 'string'
            ? existingRole.managed_policies
            : undefined;
        if (
          !attributesEqual(
            (existingManagedPolicies ?? []) as unknown as Record<string, unknown>,
            (desiredManagedPolicies ?? []) as unknown as Record<string, unknown>,
          )
        ) {
          await client.cam.updateManagedPolicies(
            ramRoleInstance.id,
            (desiredManagedPolicies as string[]) ?? [],
          );
        }
      }
    }
  }

  let config = functionToScfConfig(fn);

  if (role) {
    config = {
      ...config,
      Role: role.arn,
    };
  }

  let clsConfig:
    { logsetId: string; logsetName: string; topicId: string; topicName: string } | undefined;
  let clsTopicInstance: ScfDependentInstance | undefined;
  let clsSharedInstance: ResourceState | undefined;
  const disableLog = !fn.log && wasLogEnabled;
  let topicToDelete: string | undefined;
  let topicNameToDelete: string | undefined;
  let sharedLogsetReleased = false;

  if (fn.log) {
    if (legacyLogsetId && legacyTopicId) {
      clsConfig = {
        logsetId: legacyLogsetId,
        logsetName: buildSharedLogsetName(context.app, context.stage),
        topicId: legacyTopicId,
        topicName: buildFunctionTopicName(context),
      };
    } else {
      const sharedBefore = getSharedResource(state, context.stage, SHARED_LOGSET_KEY);
      const logset = await ensureSharedLogset(context, client, state);
      if (!sharedBefore) {
        clsSharedInstance = buildSharedLogsetResourceState(context, logset);
      }
      const topic = await ensureFunctionTopic(context, client, {
        logsetId: logset.logsetId,
        logsetName: logset.logsetName,
        topicName: buildFunctionTopicName(context, fn.key),
        logicalId,
      });
      clsConfig = {
        logsetId: logset.logsetId,
        logsetName: logset.logsetName,
        topicId: topic.topicId,
        topicName: topic.topicName,
      };
      clsTopicInstance = {
        sid: buildSid('tencent', 'cls-topic', context.stage, topic.topicName),
        type: ResourceTypeEnum.TENCENT_CLS_TOPIC,
        id: topic.topicId,
        topicName: topic.topicName,
      };
    }
  } else if (disableLog) {
    // Log was enabled and is now disabled: clear the CLS binding so
    // UpdateFunctionConfiguration unbinds the function, and tear down the
    // function's CLS topic (index first, then topic) below.
    config = {
      ...config,
      ClsLogsetId: '',
      ClsTopicId: '',
    };
    topicToDelete = existingClsTopicInstance?.id ?? legacyTopicId;
    topicNameToDelete = existingClsTopicInstance?.topicName ?? buildFunctionTopicName(context);
  }

  if (clsConfig) {
    config = {
      ...config,
      ClsLogsetId: clsConfig.logsetId,
      ClsTopicId: clsConfig.topicId,
      ClsLogsetName: clsConfig.logsetName,
      ClsTopicName: clsConfig.topicName,
    };
  }

  const codePath = fn.code!.path;
  const codeBase64 = readFileAsBase64(codePath);
  const codeHash = await computeZipContentHash(codePath);

  // Only push configuration when the mutable config fields actually changed —
  // Tencent's UpdateFunctionConfiguration rejects Handler/Runtime (immutable at
  // creation) and we don't want to re-send unchanged values. Handler/Runtime
  // changes are a hard error: the platform cannot apply them on update.
  const desiredDefinition = extractScfDefinition(config, codeHash, fn.iam);
  const CONFIG_DIFF_KEYS = ['runtime', 'handler', 'memorySize', 'timeout', 'environment', 'role'];
  const mutableKeys = CONFIG_DIFF_KEYS.filter((k) => k !== 'runtime' && k !== 'handler');

  if (
    desiredDefinition.handler &&
    existingDefinition.handler &&
    desiredDefinition.handler !== existingDefinition.handler
  ) {
    throw new Error(
      `Handler is immutable in Tencent SCF and cannot be changed on update (${String(
        existingDefinition.handler,
      )} -> ${String(desiredDefinition.handler)}). Delete and recreate the function instead.`,
    );
  }
  if (
    desiredDefinition.runtime &&
    existingDefinition.runtime &&
    desiredDefinition.runtime !== existingDefinition.runtime
  ) {
    throw new Error(
      `Runtime is immutable in Tencent SCF and cannot be changed on update (${String(
        existingDefinition.runtime,
      )} -> ${String(desiredDefinition.runtime)}). Delete and recreate the function instead.`,
    );
  }

  const configChanged =
    mutableKeys.some(
      (k) => desiredDefinition[k as keyof typeof desiredDefinition] !== existingDefinition[k],
    ) ||
    isLogConfigChanged(desiredDefinition, existingDefinition) ||
    // Disabling log always re-pushes config so the empty Cls ids reach the
    // UpdateFunctionConfiguration unbind contract.
    disableLog;
  if (configChanged) {
    await client.scf.updateFunctionConfiguration(config);
  }

  if (disableLog) {
    // Unbind (above), then delete index before topic so the logset releases.
    if (topicToDelete) {
      logger.info(lang.__('DELETING_CLS_INDEX', { topicName: topicNameToDelete ?? topicToDelete }));
      await client.cls.deleteIndex(topicToDelete);
      logger.info(lang.__('DELETING_CLS_TOPIC', { id: topicToDelete }));
      await client.cls.deleteTopic(topicToDelete);
    }

    const sharedBefore = getSharedResource(state, context.stage, SHARED_LOGSET_KEY);
    if (sharedBefore) {
      const release = await releaseSharedLogsetIfUnused(context, client, sharedBefore);
      if (release === 'deleted') {
        sharedLogsetReleased = true;
      }
    }
    logger.info(lang.__('CLS_LOG_DISABLED', { functionName: fn.name }));
  }

  // Update code
  await client.scf.updateFunctionCode(fn.name, codeBase64);

  const existingHttpTrigger = (
    existingFnInstance?.triggers as Array<Record<string, unknown>> | undefined
  )?.find((t) => t.type === 'http');

  const desiredHttpConfig = fn.triggers?.http;

  if (desiredHttpConfig) {
    if (!desiredHttpConfig.auth_type) {
      throw new Error(lang.__('HTTP_TRIGGER_AUTH_TYPE_REQUIRED', { functionName: fn.name }));
    }

    const authType = mapAuthType(ProviderEnum.TENCENT, desiredHttpConfig.auth_type);
    const access = mapAccess(desiredHttpConfig.access);
    const triggerName = `${fn.key}-http-trigger`;
    const desiredTriggerDesc = buildTencentTriggerDesc(authType, access);

    if (existingHttpTrigger) {
      if (existingHttpTrigger.triggerDesc !== desiredTriggerDesc) {
        logger.info(lang.__('UPDATING_HTTP_TRIGGER', { functionName: fn.name }));
        try {
          await client.scf.deleteTrigger({
            FunctionName: fn.name,
            TriggerName: existingHttpTrigger.triggerName as string,
            Type: 'http',
          });
        } catch (err) {
          const errorCode = (err as { code?: string })?.code;
          if (errorCode !== 'ResourceNotFound.TriggerName' && errorCode !== 'ResourceNotFound') {
            throw err;
          }
        }
        await client.scf.createTrigger({
          FunctionName: fn.name,
          TriggerName: triggerName,
          Type: 'http',
          TriggerDesc: desiredTriggerDesc,
          Qualifier: '$DEFAULT',
          Enable: 'OPEN',
        });
      }
    } else {
      // No trigger recorded in state — but a leftover trigger may still exist
      // in the provider (e.g. adopted function whose state lacked trigger
      // records). Probe before creating to stay idempotent.
      const probe = await client.scf.getFunction(fn.name);
      const providerTriggerAttached = (probe?.Triggers ?? []).some(isFunctionUrlTrigger);

      if (providerTriggerAttached) {
        logger.info(
          `HTTP trigger ${triggerName} already attached to ${fn.name}, skipping creation`,
        );
      } else {
        logger.info(lang.__('CREATING_HTTP_TRIGGER', { triggerName, functionName: fn.name }));
        try {
          await client.scf.createTrigger({
            FunctionName: fn.name,
            TriggerName: triggerName,
            Type: 'http',
            TriggerDesc: desiredTriggerDesc,
            Qualifier: '$DEFAULT',
            Enable: 'OPEN',
          });
          logger.info(lang.__('HTTP_TRIGGER_CREATED', { triggerName, functionName: fn.name }));
        } catch (error) {
          if (isResourceAlreadyExistsError(error)) {
            logger.warn(
              `HTTP trigger ${triggerName} already exists on ${fn.name}, continuing: ${String(error)}`,
            );
          } else {
            throw error;
          }
        }
      }
    }
  } else if (existingHttpTrigger) {
    const tName = existingHttpTrigger.triggerName as string;
    logger.info(lang.__('DELETING_HTTP_TRIGGER', { triggerName: tName, functionName: fn.name }));
    try {
      await client.scf.deleteTrigger({
        FunctionName: fn.name,
        TriggerName: tName,
        Type: 'http',
      });
      logger.info(lang.__('HTTP_TRIGGER_DELETED', { triggerName: tName }));
    } catch (err) {
      const errorCode = (err as { code?: string })?.code;
      if (errorCode === 'ResourceNotFound.TriggerName' || errorCode === 'ResourceNotFound') {
        logger.warn(lang.__('HTTP_TRIGGER_NOT_FOUND', { triggerName: tName }));
      } else {
        throw err;
      }
    }
  }

  // Reconcile custom domain
  const existingCustomDomain = existingInstances.find(
    (i) => (i as ScfDependentInstance).type === 'TENCENT_SCF_CUSTOM_DOMAIN',
  ) as ScfDependentInstance | undefined;

  if (fn.domain && !existingCustomDomain) {
    logger.info(lang.__('CREATING_CUSTOM_DOMAIN', { domainName: fn.domain.domain_name }));
    await client.scf.createCustomDomain({
      Domain: fn.domain.domain_name,
      Protocol: fn.domain.protocol,
      EndpointsConfig: [
        {
          Namespace: 'default',
          FunctionName: fn.name,
          Qualifier: '$DEFAULT',
          PathMatch: '/*',
        },
      ],
      ...(fn.domain.certificate_id
        ? { CertConfig: { CertificateId: fn.domain.certificate_id } }
        : {}),
    });
    logger.info(lang.__('CUSTOM_DOMAIN_CREATED', { domainName: fn.domain.domain_name }));
  } else if (!fn.domain && existingCustomDomain) {
    logger.info(lang.__('DELETING_CUSTOM_DOMAIN', { domainName: existingCustomDomain.id }));
    try {
      await client.scf.deleteCustomDomain(existingCustomDomain.id);
      logger.info(lang.__('CUSTOM_DOMAIN_DELETED', { domainName: existingCustomDomain.id }));
    } catch (err) {
      const errorCode = (err as { code?: string })?.code;
      if (errorCode === 'ResourceNotFound') {
        logger.warn(
          lang.__('RESOURCE_NOT_FOUND_PROVIDER', {
            resourceType: 'Custom Domain',
            name: existingCustomDomain.id,
          }),
        );
      } else {
        throw err;
      }
    }
  } else if (fn.domain && existingCustomDomain) {
    const domainChanged =
      fn.domain.domain_name !== existingCustomDomain.id ||
      fn.domain.protocol !== existingCustomDomain.protocol;
    if (domainChanged) {
      logger.info(lang.__('DELETING_CUSTOM_DOMAIN', { domainName: existingCustomDomain.id }));
      await client.scf.deleteCustomDomain(existingCustomDomain.id);
      logger.info(lang.__('CREATING_CUSTOM_DOMAIN', { domainName: fn.domain.domain_name }));
      await client.scf.createCustomDomain({
        Domain: fn.domain.domain_name,
        Protocol: fn.domain.protocol,
        EndpointsConfig: [
          {
            Namespace: 'default',
            FunctionName: fn.name,
            Qualifier: '$DEFAULT',
            PathMatch: '/*',
          },
        ],
        ...(fn.domain.certificate_id
          ? { CertConfig: { CertificateId: fn.domain.certificate_id } }
          : {}),
      });
      logger.info(lang.__('CUSTOM_DOMAIN_CREATED', { domainName: fn.domain.domain_name }));
    }
  }

  // Refresh state from provider to get all attributes (including triggers)
  const functionInfo = await client.scf.getFunction(fn.name);
  if (!functionInfo) {
    throw new Error(`Failed to refresh state for function: ${fn.name}`);
  }

  const definition = extractScfDefinition(config, codeHash, fn.iam);
  const sid = buildSid('tencent', 'scf', context.stage, fn.name);

  const existingDependentInstances = existingInstances
    .filter(
      (i) =>
        (i as ScfDependentInstance).type !== undefined &&
        (i as ScfDependentInstance).type !== 'TENCENT_SCF_CUSTOM_DOMAIN' &&
        !(
          (clsTopicInstance || disableLog) &&
          ((i as ScfDependentInstance).type === ResourceTypeEnum.TENCENT_CLS_TOPIC ||
            (i as ScfDependentInstance).type === ResourceTypeEnum.TENCENT_CLS_LOGSET)
        ),
    )
    .map((i) => {
      const { type, id, sid, roleArn, external } = i as ScfDependentInstance;
      return {
        sid: sid ?? buildSid('tencent', 'scf-role', context.stage, id),
        type,
        id,
        ...(roleArn ? { roleArn } : {}),
        ...(external ? { external } : {}),
      } as ScfDependentInstance;
    });

  const newDependentInstances: Array<ScfDependentInstance> = [];
  if (role && !hasCamRole && typeof newIamRole !== 'string') {
    const newRoleSid = buildSid('tencent', 'scf-role', context.stage, role.roleName ?? '');
    newDependentInstances.push({
      sid: newRoleSid,
      type: ResourceTypeEnum.TENCENT_SCF_ROLE,
      id: role.roleName ?? '',
      ...(role.arn ? { roleArn: role.arn } : {}),
    });
  }

  if (fn.domain) {
    const domainSid = buildSid(
      'tencent',
      'scf-custom-domain',
      context.stage,
      fn.domain.domain_name,
    );
    newDependentInstances.push({
      sid: domainSid,
      type: 'TENCENT_SCF_CUSTOM_DOMAIN' as ResourceTypeEnum,
      id: fn.domain.domain_name,
      protocol: fn.domain.protocol,
    });
  }

  if (clsTopicInstance) {
    newDependentInstances.push(clsTopicInstance);
  }

  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [
      buildScfInstanceFromProvider(functionInfo as ScfFunctionInfo, sid),
      ...existingDependentInstances,
      ...newDependentInstances,
    ],
    lastUpdated: new Date().toISOString(),
  };

  const stateWithShared = clsSharedInstance
    ? setSharedResource(state, context.stage, SHARED_LOGSET_KEY, clsSharedInstance)
    : sharedLogsetReleased
      ? removeSharedResource(state, context.stage, SHARED_LOGSET_KEY)
      : state;

  return setResource(stateWithShared, logicalId, resourceState);
};

export const deleteResource = async (
  context: Context,
  functionName: string,
  logicalId: string,
  state: StateFile,
): Promise<StateFile> => {
  const existingState = getResource(state, logicalId);
  const existingInstances = (existingState?.instances ?? []) as Array<Record<string, unknown>>;

  const client = createTencentClient(context);

  // Delete HTTP trigger before deleting function
  const fnInstance = existingInstances.find(
    (i) => (i as ScfDependentInstance).type === undefined,
  ) as Record<string, unknown> | undefined;
  const httpTrigger = (fnInstance?.triggers as Array<Record<string, unknown>> | undefined)?.find(
    (t) => t.type === 'http',
  );
  if (httpTrigger) {
    try {
      const triggerName = httpTrigger.triggerName as string;
      logger.info(lang.__('DELETING_HTTP_TRIGGER', { triggerName, functionName }));
      await client.scf.deleteTrigger({
        FunctionName: functionName,
        TriggerName: triggerName,
        Type: 'http',
      });
      logger.info(lang.__('HTTP_TRIGGER_DELETED', { triggerName }));
    } catch (err) {
      const errorCode = (err as { code?: string })?.code;
      if (errorCode === 'ResourceNotFound.TriggerName' || errorCode === 'ResourceNotFound') {
        logger.warn(
          lang.__('HTTP_TRIGGER_NOT_FOUND', {
            triggerName: httpTrigger.triggerName as string,
          }),
        );
      } else {
        throw err;
      }
    }
  }

  // Delete custom domain before deleting function
  const existingCustomDomain = existingInstances.find(
    (i) => (i as ScfDependentInstance).type === 'TENCENT_SCF_CUSTOM_DOMAIN',
  ) as ScfDependentInstance | undefined;
  if (existingCustomDomain) {
    try {
      logger.info(lang.__('DELETING_CUSTOM_DOMAIN', { domainName: existingCustomDomain.id }));
      await client.scf.deleteCustomDomain(existingCustomDomain.id);
      logger.info(lang.__('CUSTOM_DOMAIN_DELETED', { domainName: existingCustomDomain.id }));
    } catch (err) {
      const errorCode = (err as { code?: string })?.code;
      if (errorCode === 'ResourceNotFound') {
        logger.warn(
          lang.__('RESOURCE_NOT_FOUND_PROVIDER', {
            resourceType: 'Custom Domain',
            name: existingCustomDomain.id,
          }),
        );
      } else {
        throw err;
      }
    }
  }

  const hasFunction = existingInstances.some((i) => (i as ScfDependentInstance).type === undefined);

  if (hasFunction) {
    try {
      await client.scf.deleteFunction(functionName);
    } catch (err) {
      const errorCode = (err as { code?: string })?.code;
      if (errorCode === 'ResourceNotFound.FunctionName') {
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
      (i as ScfDependentInstance).type !== undefined &&
      (i as ScfDependentInstance).type !== 'TENCENT_SCF_CUSTOM_DOMAIN',
  ) as Array<{ type: string; id: string; external?: boolean }>;
  if (dependentInstances.length > 0) {
    await deleteDependentResources(context, dependentInstances);
  }

  return removeResource(state, logicalId);
};
