import { Context, FunctionDomain, Plan, StateFile } from '../../types';
import { createResource, deleteResource, updateResource } from './scfResource';
import { logger } from '../../common';
import { getResource } from '../../common/stateManager';

export const executeFunctionPlan = async (
  context: Context,
  plan: Plan,
  functions: Array<FunctionDomain> | undefined,
  initialState: StateFile,
): Promise<StateFile> => {
  const functionsMap = new Map<string, FunctionDomain>(
    functions?.map((fn) => [`functions.${fn.key}`, fn]) ?? [],
  );
  let currentState = initialState;

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
          currentState = await createResource(context, fn, currentState);
          logger.info(`Successfully created function: ${fn.name}`);
          break;
        }

        case 'update': {
          const fn = functionsMap.get(item.logicalId);
          if (!fn) {
            throw new Error(`Function not found for logical ID: ${item.logicalId}`);
          }
          logger.info(`Updating function: ${fn.name}`);
          currentState = await updateResource(context, fn, currentState);
          logger.info(`Successfully updated function: ${fn.name}`);
          break;
        }

        case 'delete': {
          const state = getResource(currentState, item.logicalId);
          if (!state) {
            logger.warn(`State not found for ${item.logicalId}, skipping deletion`);
            continue;
          }
          // Extract function name from definition
          const functionName = state.definition.functionName as string;
          logger.info(`Deleting function: ${functionName}`);
          currentState = await deleteResource(context, functionName, item.logicalId, currentState);
          logger.info(`Successfully deleted function: ${functionName}`);
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

  return currentState;
};
