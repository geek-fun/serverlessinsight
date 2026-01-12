import {
  Context,
  EventDomain,
  Plan,
  StateFile,
  SaveStateFn,
  ExecutionResult,
  PlanItem,
} from '../../types';
import { createApigwResource, deleteApigwResource, updateApigwResource } from './apigwResource';
import { logger } from '../../common';
import { getResource } from '../../common/stateManager';
import { lang } from '../../lang';

const executeSingleItem = async (
  context: Context,
  item: PlanItem,
  eventsMap: Map<string, EventDomain>,
  serviceName: string,
  roleArn: string | undefined,
  currentState: StateFile,
): Promise<StateFile | null> => {
  switch (item.action) {
    case 'noop':
      logger.info(`No changes for ${item.logicalId}`);
      return null;

    case 'create': {
      const event = eventsMap.get(item.logicalId);
      if (!event) {
        throw new Error(`Event not found for logical ID: ${item.logicalId}`);
      }
      logger.info(`Creating API Gateway resources for: ${event.name}`);
      const newState = await createApigwResource(
        context,
        event,
        serviceName,
        roleArn,
        currentState,
      );
      logger.info(`Successfully created API Gateway resources for: ${event.name}`);
      return newState;
    }

    case 'update': {
      const event = eventsMap.get(item.logicalId);
      if (!event) {
        throw new Error(`Event not found for logical ID: ${item.logicalId}`);
      }
      logger.info(`Updating API Gateway resources for: ${event.name}`);
      const newState = await updateApigwResource(
        context,
        event,
        serviceName,
        roleArn,
        currentState,
      );
      logger.info(`Successfully updated API Gateway resources for: ${event.name}`);
      return newState;
    }

    case 'delete': {
      const state = getResource(currentState, item.logicalId);
      if (!state) {
        logger.warn(`State not found for ${item.logicalId}, skipping deletion`);
        return null;
      }
      logger.info(`Deleting API Gateway resources for: ${item.logicalId}`);
      const newState = await deleteApigwResource(context, item.logicalId, currentState);
      logger.info(`Successfully deleted API Gateway resources for: ${item.logicalId}`);
      return newState;
    }

    default:
      logger.warn(`Unknown action: ${item.action} for ${item.logicalId}`);
      return null;
  }
};

/**
 * Execute API Gateway plan with partial failure support
 */
export const executeApigwPlan = async (
  context: Context,
  plan: Plan,
  events: Array<EventDomain> | undefined,
  serviceName: string,
  roleArn: string | undefined,
  initialState: StateFile,
  onStateChange?: SaveStateFn,
): Promise<ExecutionResult> => {
  const eventsMap = new Map<string, EventDomain>(events?.map((e) => [`events.${e.key}`, e]) ?? []);

  const successfulItems: Array<PlanItem> = [];
  let currentState = initialState;

  for (const item of plan.items) {
    try {
      const newState = await executeSingleItem(
        context,
        item,
        eventsMap,
        serviceName,
        roleArn,
        currentState,
      );
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
        },
      };
    }
  }

  return { state: currentState };
};
