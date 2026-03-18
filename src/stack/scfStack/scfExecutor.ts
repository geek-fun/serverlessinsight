import {
  Context,
  FunctionDomain,
  Plan,
  PlanItem,
  StateFile,
  SaveStateFn,
  ExecutionResult,
} from '../../types';
import { createResource, deleteResource, updateResource } from './scfResource';
import { logger } from '../../common';
import { getResource } from '../../common/stateManager';
import { lang } from '../../lang';

const executeCreateAction = async (
  context: Context,
  fn: FunctionDomain,
  currentState: StateFile,
): Promise<StateFile> => {
  logger.info(lang.__('CREATING_RESOURCE', { resourceType: 'function', name: fn.name }));
  const newState = await createResource(context, fn, currentState);
  logger.info(lang.__('RESOURCE_CREATED', { resourceType: 'function', name: fn.name }));
  return newState;
};

const executeUpdateAction = async (
  context: Context,
  fn: FunctionDomain,
  currentState: StateFile,
): Promise<StateFile> => {
  logger.info(lang.__('UPDATING_RESOURCE', { resourceType: 'function', name: fn.name }));
  const newState = await updateResource(context, fn, currentState);
  logger.info(lang.__('RESOURCE_UPDATED', { resourceType: 'function', name: fn.name }));
  return newState;
};

const executeDeleteAction = async (
  context: Context,
  functionName: string,
  logicalId: string,
  currentState: StateFile,
): Promise<StateFile> => {
  logger.info(lang.__('DELETING_RESOURCE', { resourceType: 'function', name: functionName }));
  const newState = await deleteResource(context, functionName, logicalId, currentState);
  logger.info(lang.__('RESOURCE_DELETED', { resourceType: 'function', name: functionName }));
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
      logger.info(lang.__('NO_CHANGESForResource', { logicalId: item.logicalId }));
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
        logger.warn(lang.__('STATE_NOT_FOUND_SKIPPING', { logicalId: item.logicalId }));
        return null;
      }
      const functionName = state.definition.functionName as string;
      return executeDeleteAction(context, functionName, item.logicalId, currentState);
    }

    default:
      logger.warn(
        lang.__('UNKNOWN_ACTION_FOR_RESOURCE', { action: item.action, logicalId: item.logicalId }),
      );
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
      return {
        state: currentState,
        partialFailure: {
          failedItem: item,
          error: error instanceof Error ? error : new Error(String(error)),
          successfulItems,
        },
      };
    }
  }

  return { state: currentState };
};
