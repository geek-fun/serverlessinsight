import {
  Context,
  FunctionDomain,
  Plan,
  PlanItem,
  StateFile,
  SaveStateFn,
  ExecutionResult,
} from '../../types';
import { createResource, deleteResource, updateResource } from './fc3Resource';
import { logger } from '../../common';
import { getResource } from '../../common/stateManager';
import { lang } from '../../lang';

const executeCreateAction = async (
  context: Context,
  fn: FunctionDomain,
  currentState: StateFile,
): Promise<StateFile> => {
  logger.info(`Creating function: ${fn.name}`);
  const newState = await createResource(context, fn, currentState);
  logger.info(`Successfully created function: ${fn.name}`);
  return newState;
};

const executeUpdateAction = async (
  context: Context,
  fn: FunctionDomain,
  currentState: StateFile,
): Promise<StateFile> => {
  logger.info(`Updating function: ${fn.name}`);
  const newState = await updateResource(context, fn, currentState);
  logger.info(`Successfully updated function: ${fn.name}`);
  return newState;
};

const executeDeleteAction = async (
  context: Context,
  functionName: string,
  logicalId: string,
  currentState: StateFile,
): Promise<StateFile> => {
  logger.info(`Deleting function: ${functionName}`);
  const newState = await deleteResource(context, functionName, logicalId, currentState);
  logger.info(`Successfully deleted function: ${functionName}`);
  return newState;
};

const executeSingleItem = async (
  context: Context,
  item: PlanItem,
  functionsMap: Map<string, FunctionDomain>,
  currentState: StateFile,
): Promise<StateFile | null> => {
  switch (item.action) {
    case 'noop':
      logger.info(`No changes for ${item.logicalId}`);
      return null;

    case 'create': {
      const fn = functionsMap.get(item.logicalId);
      if (!fn) {
        throw new Error(`Function not found for logical ID: ${item.logicalId}`);
      }
      return executeCreateAction(context, fn, currentState);
    }

    case 'update': {
      const fn = functionsMap.get(item.logicalId);
      if (!fn) {
        throw new Error(`Function not found for logical ID: ${item.logicalId}`);
      }
      return executeUpdateAction(context, fn, currentState);
    }

    case 'delete': {
      const state = getResource(currentState, item.logicalId);
      if (!state) {
        logger.warn(`State not found for ${item.logicalId}, skipping deletion`);
        return null;
      }
      const functionName = state.definition.functionName as string;
      return executeDeleteAction(context, functionName, item.logicalId, currentState);
    }

    default:
      logger.warn(`Unknown action: ${item.action} for ${item.logicalId}`);
      return null;
  }
};

export const executeFunctionPlan = async (
  context: Context,
  plan: Plan,
  functions: Array<FunctionDomain> | undefined,
  initialState: StateFile,
  onStateChange?: SaveStateFn,
): Promise<ExecutionResult> => {
  const functionsMap = new Map<string, FunctionDomain>(
    functions?.map((fn) => [`functions.${fn.key}`, fn]) ?? [],
  );

  const successfulItems: Array<PlanItem> = [];
  let currentState = initialState;

  for (const item of plan.items) {
    try {
      const newState = await executeSingleItem(context, item, functionsMap, currentState);
      if (newState !== null) {
        currentState = newState;
        successfulItems.push(item);
        if (onStateChange) {
          onStateChange(currentState);
          logger.debug(
            lang.__('STATE_PERSISTED_AFTER_OPERATION', {
              action: item.action,
              resourceId: item.logicalId,
            }),
          );
        }
      }
    } catch (error) {
      logger.error(`Failed to execute ${item.action} for ${item.logicalId}: ${error}`);
      return {
        state: currentState,
        partialFailure: {
          failedItem: item,
          error: error instanceof Error ? error : new Error(String(error)),
          successfulItems,
          currentState,
        },
      };
    }
  }

  return { state: currentState };
};
