import {
  Context,
  FunctionDomain,
  Plan,
  PlanItem,
  StateFile,
  ResourceAttributes,
} from '../../types';
import { createTencentClient } from '../../common/tencentClient';
import { functionToScfConfig, extractScfDefinition } from './scfTypes';
import { getAllResources, getResource } from '../../common/stateManager';
import { attributesEqual, computeFileHash } from '../../common/hashUtils';

const planFunctionDeletion = (logicalId: string, definition: ResourceAttributes): PlanItem => ({
  logicalId,
  action: 'delete',
  resourceType: 'SCF',
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
      const config = functionToScfConfig(fn);
      const codePath = fn.code!.path;
      const desiredCodeHash = computeFileHash(codePath);
      const desiredDefinition = extractScfDefinition(config, desiredCodeHash);

      if (!currentState) {
        return {
          logicalId,
          action: 'create',
          resourceType: 'SCF',
          changes: { after: desiredDefinition },
        };
      }

      try {
        const client = createTencentClient(context);
        const remoteFunction = await client.scf.getFunction(fn.name);

        if (!remoteFunction) {
          return {
            logicalId,
            action: 'create',
            resourceType: 'SCF',
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
            resourceType: 'SCF',
            changes: { before: currentDefinition, after: desiredDefinition },
            drifted: true,
          };
        }

        return { logicalId, action: 'noop', resourceType: 'SCF' };
      } catch {
        return {
          logicalId,
          action: 'create',
          resourceType: 'SCF',
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
