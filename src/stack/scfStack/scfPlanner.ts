import { Context, FunctionDomain, Plan, PlanItem, StateFile } from '../../types';
import { getScfFunction } from './scfProvider';
import { functionToScfConfig, extractScfDefinition } from './scfTypes';
import { getAllResources, getResource } from '../../common/stateManager';
import { attributesEqual, computeFileHash } from '../../common/hashUtils';

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
      if (logicalId.startsWith('functions.')) {
        items.push({
          logicalId,
          action: 'delete',
          resourceType: 'SCF',
          changes: {
            before: resourceState.definition,
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
    const codePath = fn.code!.path;
    const desiredCodeHash = computeFileHash(codePath);
    const desiredDefinition = extractScfDefinition(config, desiredCodeHash);

    if (!currentState) {
      // Resource doesn't exist in state - needs to be created
      items.push({
        logicalId,
        action: 'create',
        resourceType: 'SCF',
        changes: {
          after: desiredDefinition,
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
              before: currentState.definition,
              after: desiredDefinition,
            },
            drifted: true,
          });
        } else {
          // Compare definition for drift detection (includes codeHash)
          const currentDefinition = currentState.definition || {};
          const definitionChanged = !attributesEqual(currentDefinition, desiredDefinition);

          if (definitionChanged) {
            // Configuration or code has changed
            items.push({
              logicalId,
              action: 'update',
              resourceType: 'SCF',
              changes: {
                before: currentDefinition,
                after: desiredDefinition,
              },
              drifted: true,
            });
          } else {
            // No changes needed
            items.push({
              logicalId,
              action: 'noop',
              resourceType: 'SCF',
            });
          }
        }
      } catch {
        // If we can't read the remote resource, plan for recreation
        items.push({
          logicalId,
          action: 'create',
          resourceType: 'SCF',
          changes: {
            before: currentState.definition,
            after: desiredDefinition,
          },
        });
      }
    }
  }

  // Check for resources in state that are not in desired state (need deletion)
  const allStates = getAllResources(state);
  for (const [logicalId, resourceState] of Object.entries(allStates)) {
    if (logicalId.startsWith('functions.') && !desiredLogicalIds.has(logicalId)) {
      items.push({
        logicalId,
        action: 'delete',
        resourceType: 'SCF',
        changes: {
          before: resourceState.definition,
        },
      });
    }
  }

  return { items };
};
