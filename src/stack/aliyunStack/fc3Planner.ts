import { attributesEqual, computeFileHash, getAllResources, getResource } from '../../common';
import { createAliyunClient } from '../../common/aliyunClient';
import {
  Context,
  FunctionDomain,
  Plan,
  PlanItem,
  ResourceAttributes,
  StateFile,
} from '../../types';
import { extractFc3Definition, Fc3FunctionConfig, functionToFc3Config } from './fc3Types';
import { lang } from '../../lang';

const isSecurityGroupId = (value: string): boolean => value.startsWith('sg-');

const resolveSecurityGroupId = async (
  context: Context,
  securityGroupName: string,
  vpcId?: string,
): Promise<string> => {
  if (isSecurityGroupId(securityGroupName)) {
    return securityGroupName;
  }

  const client = createAliyunClient(context);
  const sg = await client.ecs.getSecurityGroupByName(securityGroupName, vpcId);
  if (!sg) {
    throw new Error(
      lang.__('SECURITY_GROUP_NOT_FOUND', { sgName: securityGroupName, vpcId: vpcId ?? 'default' }),
    );
  }
  return sg.securityGroupId;
};

const resolveVpcConfigSecurityGroup = async (
  context: Context,
  config: Fc3FunctionConfig,
): Promise<Fc3FunctionConfig> => {
  if (!config.vpcConfig?.securityGroupId) {
    return config;
  }

  const securityGroupId = await resolveSecurityGroupId(
    context,
    config.vpcConfig.securityGroupId,
    config.vpcConfig.vpcId,
  );

  return {
    ...config,
    vpcConfig: {
      ...config.vpcConfig,
      securityGroupId,
    },
  };
};

const planFunctionDeletion = (logicalId: string, definition: ResourceAttributes): PlanItem => ({
  logicalId,
  action: 'delete',
  resourceType: 'ALIYUN_FC3',
  changes: { before: definition },
});

export const generateFunctionPlan = async (
  context: Context,
  state: StateFile,
  functions: Array<FunctionDomain> | undefined,
): Promise<Plan> => {
  if (!functions || functions.length === 0) {
    const allStates = getAllResources(state);
    const items = Object.entries(allStates)
      .filter(([logicalId]) => logicalId.startsWith('functions.'))
      .map(([logicalId, resourceState]) =>
        planFunctionDeletion(logicalId, resourceState.definition),
      );
    return { items };
  }

  const desiredLogicalIds = new Set(functions.map((fn) => `functions.${fn.key}`));

  const functionItems = await Promise.all(
    functions.map(async (fn): Promise<PlanItem> => {
      const logicalId = `functions.${fn.key}`;
      const currentState = getResource(state, logicalId);
      const rawConfig = functionToFc3Config(fn);
      const config = await resolveVpcConfigSecurityGroup(context, rawConfig);
      const codePath = fn.code!.path;
      const desiredCodeHash = computeFileHash(codePath);
      const desiredDefinition = extractFc3Definition(config, desiredCodeHash);

      if (!currentState || currentState.status === 'tainted') {
        return {
          logicalId,
          action: 'create',
          resourceType: 'ALIYUN_FC3',
          changes: { after: desiredDefinition },
        };
      }

      try {
        const client = createAliyunClient(context);
        const remoteFunction = await client.fc3.getFunction(fn.name);

        if (!remoteFunction) {
          return {
            logicalId,
            action: 'create',
            resourceType: 'ALIYUN_FC3',
            changes: { before: currentState.definition, after: desiredDefinition },
            drifted: true,
          };
        }

        const currentDefinition = currentState.definition || {};
        const definitionChanged = !attributesEqual(currentDefinition, desiredDefinition);

        if (definitionChanged) {
          return {
            logicalId,
            action: 'update',
            resourceType: 'ALIYUN_FC3',
            changes: { before: currentDefinition, after: desiredDefinition },
            drifted: true,
          };
        }

        return { logicalId, action: 'noop', resourceType: 'ALIYUN_FC3' };
      } catch {
        return {
          logicalId,
          action: 'create',
          resourceType: 'ALIYUN_FC3',
          changes: { before: currentState.definition, after: desiredDefinition },
        };
      }
    }),
  );

  const allStates = getAllResources(state);
  const deletionItems = Object.entries(allStates)
    .filter(
      ([logicalId]) => logicalId.startsWith('functions.') && !desiredLogicalIds.has(logicalId),
    )
    .map(([logicalId, resourceState]) => planFunctionDeletion(logicalId, resourceState.definition));

  return { items: [...functionItems, ...deletionItems] };
};
