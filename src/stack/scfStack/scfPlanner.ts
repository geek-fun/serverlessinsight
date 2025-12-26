import { Context, FunctionDomain, Plan, PlanItem } from '../../types';
import { StateManager } from '../../common/stateManager';
import { ScfProvider } from './scfProvider';
import { computeConfigHash, functionToScfConfig } from './scfTypes';

export class ScfPlanner {
  private provider: ScfProvider;
  private stateManager: StateManager;

  constructor(
    private readonly context: Context,
    stateManager: StateManager,
  ) {
    this.provider = new ScfProvider(context);
    this.stateManager = stateManager;
  }

  async generatePlan(functions: Array<FunctionDomain> | undefined): Promise<Plan> {
    const items: Array<PlanItem> = [];

    if (!functions || functions.length === 0) {
      // Handle deletions for functions removed from YAML
      const allStates = this.stateManager.getAll();
      for (const [logicalId, state] of Object.entries(allStates)) {
        if (state.type === 'SCF') {
          items.push({
            logicalId,
            action: 'delete',
            resourceType: 'SCF',
            changes: {
              before: { physicalId: state.physicalId },
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

      const currentState = this.stateManager.get(logicalId);
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
          const remoteFunction = await this.provider.getFunction(fn.name);

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
    const allStates = this.stateManager.getAll();
    for (const [logicalId, state] of Object.entries(allStates)) {
      if (state.type === 'SCF' && !desiredLogicalIds.has(logicalId)) {
        items.push({
          logicalId,
          action: 'delete',
          resourceType: 'SCF',
          changes: {
            before: { physicalId: state.physicalId },
          },
        });
      }
    }

    return { items };
  }
}
