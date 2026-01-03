import { Context, FunctionDomain, ResourceState, StateFile } from '../../types';
import {
  createScfFunction,
  deleteScfFunction,
  getScfFunction,
  updateScfFunctionCode,
  updateScfFunctionConfiguration,
} from './scfProvider';
import { functionToScfConfig, extractScfDefinition, ScfFunctionInfo } from './scfTypes';
import { setResource, removeResource } from '../../common/stateManager';
import { computeFileHash } from '../../common/hashUtils';

const buildScfInstanceFromProvider = (info: ScfFunctionInfo, arn: string) => {
  const envMap: Record<string, string> = {};
  if (info.Environment?.Variables) {
    for (const v of info.Environment.Variables) {
      envMap[v.Key] = v.Value;
    }
  }

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
    arn,
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

export const createResource = async (
  context: Context,
  fn: FunctionDomain,
  state: StateFile,
): Promise<StateFile> => {
  const config = functionToScfConfig(fn);
  const codePath = fn.code!.path;

  await createScfFunction(context, config, codePath);

  // Refresh state from provider to get all attributes
  const functionInfo = await getScfFunction(context, fn.name);
  if (!functionInfo) {
    throw new Error(`Failed to refresh state for function: ${fn.name}`);
  }

  const codeHash = computeFileHash(codePath);
  const definition = extractScfDefinition(config, codeHash);
  const arn = `arn:tencent:scf:${context.region}::function:${fn.name}`;
  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [buildScfInstanceFromProvider(functionInfo, arn)],
    lastUpdated: new Date().toISOString(),
  };

  const logicalId = `functions.${fn.key}`;
  return setResource(state, logicalId, resourceState);
};

export const readResource = async (context: Context, functionName: string) => {
  return await getScfFunction(context, functionName);
};

export const updateResource = async (
  context: Context,
  fn: FunctionDomain,
  state: StateFile,
): Promise<StateFile> => {
  const config = functionToScfConfig(fn);
  const codePath = fn.code!.path;

  // Update configuration
  await updateScfFunctionConfiguration(context, config);

  // Update code
  await updateScfFunctionCode(context, fn.name, codePath);

  // Refresh state from provider to get all attributes
  const functionInfo = await getScfFunction(context, fn.name);
  if (!functionInfo) {
    throw new Error(`Failed to refresh state for function: ${fn.name}`);
  }

  const codeHash = computeFileHash(codePath);
  const definition = extractScfDefinition(config, codeHash);
  const arn = `arn:tencent:scf:${context.region}::function:${fn.name}`;
  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [buildScfInstanceFromProvider(functionInfo, arn)],
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
  await deleteScfFunction(context, functionName);
  return removeResource(state, logicalId);
};
