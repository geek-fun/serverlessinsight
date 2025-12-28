import { Context, FunctionDomain, ResourceState, StateFile } from '../../types';
import {
  createScfFunction,
  deleteScfFunction,
  getScfFunction,
  updateScfFunctionCode,
  updateScfFunctionConfiguration,
} from './scfProvider';
import { computeConfigHash, functionToScfConfig } from './scfTypes';
import { setResource, removeResource } from '../../common/stateManager';

export const createResource = async (
  context: Context,
  fn: FunctionDomain,
  state: StateFile,
): Promise<StateFile> => {
  const config = functionToScfConfig(fn);
  const codePath = fn.code!.path;

  await createScfFunction(context, config, codePath);

  const configHash = computeConfigHash(config);
  const resourceState: ResourceState = {
    type: 'SCF',
    physicalId: fn.name,
    region: context.region,
    configHash,
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

  const configHash = computeConfigHash(config);
  const resourceState: ResourceState = {
    type: 'SCF',
    physicalId: fn.name,
    region: context.region,
    configHash,
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
