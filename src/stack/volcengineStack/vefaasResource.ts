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
import { extractVefaasDefinition, functionToVefaasConfig, VefaasFunctionInfo } from './vefaasTypes';
import { logger } from '../../common/logger';
import { lang } from '../../lang';

const RECOVERY_GET_FUNCTION_DELAY_MS = 1500;

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
  };
};

export const createResource = async (
  context: Context,
  fn: FunctionDomain,
  state: StateFile,
): Promise<StateFile> => {
  const logicalId = `functions.${fn.key}`;
  const client = createVolcengineClient(context);
  const config = functionToVefaasConfig(fn);
  const codePath = fn.code!.path;
  const codeHash = computeFileHash(codePath);
  const definition = extractVefaasDefinition(config, codeHash);

  const sid = buildSid('volcengine', context.service, context.stage, fn.name);

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
    ],
    status: 'tainted',
    lastUpdated: new Date().toISOString(),
  };

  const stateAfterDependents = setResource(state, logicalId, taintedResourceState);

  try {
    const codeContent = await import('node:fs').then((fs) => fs.readFileSync(codePath));
    const codeBase64 = codeContent.toString('base64');
    await client.vefaas.createFunction(config, codeBase64);
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
    instances: [vefaasInstance],
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
  const logicalId = `functions.${fn.key}`;
  const client = createVolcengineClient(context);
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

  const config = functionToVefaasConfig(fn);
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
  };

  const desiredConfigOnly: ResourceAttributes = {
    runtime: desiredDefinition.runtime,
    handler: desiredDefinition.handler,
    memorySize: desiredDefinition.memorySize,
    timeout: desiredDefinition.timeout,
    environment: desiredDefinition.environment,
    description: desiredDefinition.description,
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

  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition: desiredDefinition,
    instances: [vefaasInstance],
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
  const client = createVolcengineClient(context);

  try {
    await client.vefaas.deleteFunction(functionName);
  } catch (error: unknown) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'FunctionNotFound'
    ) {
      logger.warn(
        lang.__('RESOURCE_NOT_FOUND_PROVIDER', { resourceType: 'Function', name: functionName }),
      );
    } else {
      throw error;
    }
  }

  return removeResource(state, logicalId);
};
