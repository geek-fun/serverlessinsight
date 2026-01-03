import { Context, FunctionDomain, Plan, PlanItem, StateFile } from '../../types';
import { getScfFunction } from './scfProvider';
import { functionToScfConfig, extractScfAttributes } from './scfTypes';
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
            before: { arn: resourceState.arn, ...resourceState.attributes },
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
    const desiredAttributes = extractScfAttributes(config);
    const codePath = fn.code!.path;
    const desiredCodeHash = computeFileHash(codePath);

    if (!currentState) {
      // Resource doesn't exist in state - needs to be created
      items.push({
        logicalId,
        action: 'create',
        resourceType: 'SCF',
        changes: {
          after: {
            ...desiredAttributes,
            codeHash: desiredCodeHash,
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
              before: currentState.attributes,
              after: {
                ...desiredAttributes,
                codeHash: desiredCodeHash,
              },
            },
            drifted: true,
          });
        } else {
          // Compare all attributes and code hash for drift detection
          const currentAttributes = currentState.attributes || {};
          const currentCodeHash = currentState.codeHash;
          const attributesChanged = !attributesEqual(currentAttributes, desiredAttributes);
          const codeChanged = currentCodeHash !== desiredCodeHash;

          if (attributesChanged || codeChanged) {
            // Configuration or code has changed
            items.push({
              logicalId,
              action: 'update',
              resourceType: 'SCF',
              changes: {
                before: {
                  ...currentAttributes,
                  codeHash: currentCodeHash,
                },
                after: {
                  ...desiredAttributes,
                  codeHash: desiredCodeHash,
                },
              },
              drifted: attributesChanged || codeChanged,
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
            before: currentState.attributes,
            after: {
              ...desiredAttributes,
              codeHash: desiredCodeHash,
            },
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
          before: { arn: resourceState.arn, ...resourceState.attributes },
        },
      });
    }
  }

  return { items };
};
