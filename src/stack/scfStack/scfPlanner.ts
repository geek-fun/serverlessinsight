import { Context, FunctionDomain, Plan, PlanItem, StateFile } from '../../types';
import { getScfFunction } from './scfProvider';
import { computeConfigHash, functionToScfConfig } from './scfTypes';
import { getAllResources, getResource } from '../../common/stateManager';

export const generateFunctionPlan = async (
  context: Context,
  state: StateFile,
  functions: Array<FunctionDomain> | undefined,
): Promise<Plan> => {
  const items: Array<PlanItem> = [];

  if (!functions || functions.length === 0) {
    // Handle deletions for functions removed from YAML
    const allStates = getAllResources(state);
    for (const [logicalId, resourceState] of Object.entries(allStates)) {
      if (resourceState.type === 'SCF') {
        items.push({
          logicalId,
          action: 'delete',
          resourceType: 'SCF',
          changes: {
            before: { physicalId: resourceState.physicalId },
          },
        });
      }
    }
    return { items };
  }

  // Track which logical IDs are in the desired state
  const desiredLogicalIds = new Set<string>();

  for (const fn of functions) {
    const logicalId = `functions.${fn.key}`;
    desiredLogicalIds.add(logicalId);

    const currentState = getResource(state, logicalId);
    const config = functionToScfConfig(fn);
    const desiredConfigHash = computeConfigHash(config);

    if (!currentState) {
      // Resource doesn't exist in state - needs to be created
      items.push({
        logicalId,
        action: 'create',
        resourceType: 'SCF',
        changes: {
          after: {
            name: fn.name,
            runtime: fn.code!.runtime,
            handler: fn.code!.handler,
            memory: fn.memory,
            timeout: fn.timeout,
          },
        },
      });
    } else {
      // Resource exists - check if it needs updating
      try {
        const remoteFunction = await getScfFunction(context, fn.name);

        if (!remoteFunction) {
          // Resource in state but not in cloud - needs recreation
          items.push({
            logicalId,
            action: 'create',
            resourceType: 'SCF',
            changes: {
              after: {
                name: fn.name,
                runtime: fn.code!.runtime,
                handler: fn.code!.handler,
                memory: fn.memory,
                timeout: fn.timeout,
              },
            },
          });
        } else if (currentState.configHash !== desiredConfigHash) {
          // Configuration has changed
          items.push({
            logicalId,
            action: 'update',
            resourceType: 'SCF',
            changes: {
              before: {
                configHash: currentState.configHash,
              },
              after: {
                name: fn.name,
                runtime: fn.code!.runtime,
                handler: fn.code!.handler,
                memory: fn.memory,
                timeout: fn.timeout,
                configHash: desiredConfigHash,
              },
            },
          });
        } else {
          // No changes needed
          items.push({
            logicalId,
            action: 'noop',
            resourceType: 'SCF',
          });
        }
      } catch {
        // If we can't read the remote resource, plan for recreation
        items.push({
          logicalId,
          action: 'create',
          resourceType: 'SCF',
          changes: {
            after: {
              name: fn.name,
              runtime: fn.code!.runtime,
              handler: fn.code!.handler,
              memory: fn.memory,
              timeout: fn.timeout,
            },
          },
        });
      }
    }
  }

  // Check for resources in state that are not in desired state (need deletion)
  const allStates = getAllResources(state);
  for (const [logicalId, resourceState] of Object.entries(allStates)) {
    if (resourceState.type === 'SCF' && !desiredLogicalIds.has(logicalId)) {
      items.push({
        logicalId,
        action: 'delete',
        resourceType: 'SCF',
        changes: {
          before: { physicalId: resourceState.physicalId },
        },
      });
    }
  }

  return { items };
};
