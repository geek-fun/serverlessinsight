import { attributesEqual, computeFileHash, getResource } from '../../common';
import { getAllResources } from '../../common/stateManager';
import { createVolcengineClient } from '../../common/volcengineClient';
import {
  Context,
  FunctionDomain,
  Plan,
  PlanItem,
  ResourceAttributes,
  StateFile,
} from '../../types';
import { extractVefaasDefinition, functionToVefaasConfig } from './vefaasTypes';
import { OWNERSHIP_TAG_KEY, isOwnedByStack } from '../ownershipTag';

const planFunctionDeletion = (logicalId: string, definition: ResourceAttributes): PlanItem => ({
  logicalId,
  action: 'delete',
  resourceType: 'VOLCENGINE_VEFAAS',
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
      const config = functionToVefaasConfig(fn);
      const codePath = fn.code!.path;
      const desiredCodeHash = computeFileHash(codePath);
      const baseDefinition = extractVefaasDefinition(config, desiredCodeHash);
      const desiredDefinition = fn.iam ? { ...baseDefinition, iam: fn.iam } : baseDefinition;

      if (!currentState || currentState.status === 'tainted') {
        // No usable local state: probe the provider before planning create.
        // If a same-named function already exists WITHOUT our ownership tag it
        // may belong to another project — fail fast in the plan instead of
        // letting the executor discover it mid-deploy.
        const client = createVolcengineClient(context);
        const remoteFunction = await client.vefaas.getFunction(fn.name);
        if (remoteFunction && !isOwnedByStack(context, logicalId, remoteFunction.Tags)) {
          throw new Error(
            `Function ${fn.name} already exists in provider but is not owned by this stack (missing ${OWNERSHIP_TAG_KEY} tag). Refusing to create — resolve manually.`,
          );
        }

        return {
          logicalId,
          action: 'create',
          resourceType: 'VOLCENGINE_VEFAAS',
          changes: { after: desiredDefinition },
        };
      }

      try {
        const client = createVolcengineClient(context);
        const remoteFunction = await client.vefaas.getFunction(fn.name);

        if (!remoteFunction) {
          return {
            logicalId,
            action: 'create',
            resourceType: 'VOLCENGINE_VEFAAS',
            changes: {
              before: currentState.definition,
              after: desiredDefinition,
            },
            drifted: true,
          };
        }

        const currentDefinition = currentState.definition || {};
        const definitionChanged = !attributesEqual(currentDefinition, desiredDefinition);

        if (definitionChanged) {
          return {
            logicalId,
            action: 'update',
            resourceType: 'VOLCENGINE_VEFAAS',
            changes: { before: currentDefinition, after: desiredDefinition },
            drifted: true,
          };
        }

        return { logicalId, action: 'noop', resourceType: 'VOLCENGINE_VEFAAS' };
      } catch {
        return {
          logicalId,
          action: 'create',
          resourceType: 'VOLCENGINE_VEFAAS',
          changes: {
            before: currentState.definition,
            after: desiredDefinition,
          },
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
