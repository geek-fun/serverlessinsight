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
