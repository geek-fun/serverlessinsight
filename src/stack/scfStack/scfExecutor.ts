import { Context, FunctionDomain, Plan } from '../../types';
import { StateManager } from '../../common/stateManager';
import { ScfResource } from './scfResource';
import { logger } from '../../common';

export class ScfExecutor {
  private resource: ScfResource;
  private stateManager: StateManager;

  constructor(
    private readonly context: Context,
    stateManager: StateManager,
  ) {
    this.resource = new ScfResource(context, stateManager);
    this.stateManager = stateManager;
  }

  async executePlan(plan: Plan, functions: Array<FunctionDomain> | undefined): Promise<void> {
    const functionsMap = new Map<string, FunctionDomain>();

    if (functions) {
      for (const fn of functions) {
        functionsMap.set(`functions.${fn.key}`, fn);
      }
    }

    for (const item of plan.items) {
      if (item.action === 'noop') {
        logger.info(`No changes for ${item.logicalId}`);
        continue;
      }

      try {
        switch (item.action) {
          case 'create': {
            const fn = functionsMap.get(item.logicalId);
            if (!fn) {
              throw new Error(`Function not found for logical ID: ${item.logicalId}`);
            }
            logger.info(`Creating function: ${fn.name}`);
            await this.resource.create(fn);
            logger.info(`Successfully created function: ${fn.name}`);
            break;
          }

          case 'update': {
            const fn = functionsMap.get(item.logicalId);
            if (!fn) {
              throw new Error(`Function not found for logical ID: ${item.logicalId}`);
            }
            logger.info(`Updating function: ${fn.name}`);
            await this.resource.update(fn);
            logger.info(`Successfully updated function: ${fn.name}`);
            break;
          }

          case 'delete': {
            const state = this.stateManager.get(item.logicalId);
            if (!state) {
              logger.warn(`State not found for ${item.logicalId}, skipping deletion`);
              continue;
            }
            logger.info(`Deleting function: ${state.physicalId}`);
            await this.resource.delete(state.physicalId, item.logicalId);
            logger.info(`Successfully deleted function: ${state.physicalId}`);
            break;
          }

          default:
            logger.warn(`Unknown action: ${item.action} for ${item.logicalId}`);
        }
      } catch (error) {
        logger.error(`Failed to execute ${item.action} for ${item.logicalId}: ${error}`);
        throw error;
      }
    }

    // Save state after all operations
    this.stateManager.save();
  }
}
