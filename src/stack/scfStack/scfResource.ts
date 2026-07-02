import { Context, FunctionDomain, ResourceState, StateFile, ResourceTypeEnum } from '../../types';
import { createTencentClient } from '../../common/tencentClient';
import { readFileAsBase64 } from '../../common/fileUtils';
import { functionToScfConfig, extractScfDefinition, ScfFunctionInfo } from './scfTypes';
import { getResource, setResource, removeResource } from '../../common/stateManager';
import { buildSid, attributesEqual } from '../../common';
import { RAM_ROLE_PROPAGATION_DELAY_MS } from '../../common/constants';
import { computeFileHash } from '../../common/hashUtils';
import { logger } from '../../common/logger';
import { lang } from '../../lang';
import type { IamStatement } from '../../common/iamStatements';

type ScfDependentInstance = {
  type: string;
  id: string;
  sid: string;
  roleArn?: string;
  external?: boolean;
};

const delay = async (ms: number): Promise<void> => {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
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
        }
      : {},
  };
};

const createDependentResources = async (
  context: Context,
  fn: FunctionDomain,
  existingInstances: Array<Record<string, unknown>> = [],
): Promise<{ role?: { roleName?: string; arn?: string } }> => {
  const client = createTencentClient(context);
  const iamConfig = fn.iam?.role;

  // No IAM role configured - skip
  if (!iamConfig) {
    return {};
  }

  const statements = iamConfig && typeof iamConfig !== 'string' ? iamConfig.statements : undefined;
  const managedPolicies =
    iamConfig && typeof iamConfig !== 'string' ? iamConfig.managed_policies : undefined;
  const customRoleName = iamConfig && typeof iamConfig !== 'string' ? iamConfig.name : undefined;

  // External role (string) - skip creation, use ARN directly
  if (typeof iamConfig === 'string') {
    return { role: { roleName: '', arn: iamConfig } };
  }

  const hasCamRole = existingInstances.some((i) => i.type === 'TENCENT_SCF_ROLE');
  const serviceName = `${context.app}-${context.service}`;
  const defaultRoleName = `${serviceName}-${context.stage}-scf-role`;
  const roleName = customRoleName ?? defaultRoleName;

  if (hasCamRole) {
    // Role already exists - reuse it
    return { role: { roleName, arn: roleName } };
  }

  // Create new CAM role
  const trustedServices = ['scf.tencentcloudapi.com'];
  logger.info(lang.__('CREATING_RAM_ROLE', { roleName }));
  const camRole = await client.cam.createRole(
    roleName,
    trustedServices,
    `ServerlessInsight SCF execution role for ${serviceName}`,
    statements as IamStatement[] | undefined,
    managedPolicies,
  );

  await delay(RAM_ROLE_PROPAGATION_DELAY_MS);

  return { role: { roleName: camRole.roleName, arn: camRole.roleArn ?? roleName } };
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

  const existingResourceState = getResource(state, logicalId);
  const existingDependentInstances = (existingResourceState?.instances ?? []).filter(
    (i) => (i as ScfDependentInstance).type !== undefined,
  ) as Array<Record<string, unknown>>;

  const dependentResources = await createDependentResources(
    context,
    fn,
    existingDependentInstances,
  );

  let config = functionToScfConfig(fn);

  if (dependentResources.role) {
    config = {
      ...config,
      Role: dependentResources.role.arn,
    };
  }

  const codePath = fn.code!.path;
  const codeBase64 = readFileAsBase64(codePath);
  const codeHash = computeFileHash(codePath);
  const definition = extractScfDefinition(config, codeHash, fn.iam);

  const dependentInstances: Array<ScfDependentInstance> = [];
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

  const stateAfterDependents = setResource(state, logicalId, taintedResourceState);

  const client = createTencentClient(context);

  await client.scf.createFunction(config, codeBase64);

  // Refresh state from provider to get all attributes
  const functionInfo = await client.scf.getFunction(fn.name);
  if (!functionInfo) {
    throw new Error(`Failed to refresh state for function: ${fn.name}`);
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

  const codePath = fn.code!.path;
  const codeBase64 = readFileAsBase64(codePath);
  const codeHash = computeFileHash(codePath);

  // Update configuration
  await client.scf.updateFunctionConfiguration(config);

  // Update code
  await client.scf.updateFunctionCode(fn.name, codeBase64);

  // Refresh state from provider to get all attributes
  const functionInfo = await client.scf.getFunction(fn.name);
  if (!functionInfo) {
    throw new Error(`Failed to refresh state for function: ${fn.name}`);
  }

  const definition = extractScfDefinition(config, codeHash, fn.iam);
  const sid = buildSid('tencent', 'scf', context.stage, fn.name);

  // Rebuild dependent instances list
  const existingDependentInstances = existingInstances
    .filter((i) => (i as ScfDependentInstance).type !== undefined)
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

  return setResource(state, logicalId, resourceState);
};

export const deleteResource = async (
  context: Context,
  functionName: string,
  logicalId: string,
  state: StateFile,
): Promise<StateFile> => {
  const existingState = getResource(state, logicalId);
  const existingInstances = (existingState?.instances ?? []) as Array<Record<string, unknown>>;

  const hasFunction = existingInstances.some((i) => (i as ScfDependentInstance).type === undefined);

  const client = createTencentClient(context);
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
    (i) => (i as ScfDependentInstance).type !== undefined,
  ) as Array<{ type: string; id: string; external?: boolean }>;
  if (dependentInstances.length > 0) {
    await deleteDependentResources(context, dependentInstances);
  }

  return removeResource(state, logicalId);
};
