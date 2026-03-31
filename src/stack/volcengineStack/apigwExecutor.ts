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
  currentState: StateFile,
): Promise<StateFile | null> => {
  switch (item.action) {
    case 'noop':
      logger.info(lang.__('NO_CHANGESForResource', { logicalId: item.logicalId }));
      return null;

    case 'create': {
      const event = eventsMap.get(item.logicalId);
      if (!event) {
        throw new Error(`Event not found for logical ID: ${item.logicalId}`);
      }
      logger.info(
        lang.__('CREATING_RESOURCE', { resourceType: 'API Gateway resources', name: event.name }),
      );
      const newState = await createApigwResource(context, event, serviceName, currentState);
      logger.info(
        lang.__('RESOURCE_CREATED', { resourceType: 'API Gateway resources', name: event.name }),
      );
      return newState;
    }

    case 'update': {
      const event = eventsMap.get(item.logicalId);
      if (!event) {
        throw new Error(`Event not found for logical ID: ${item.logicalId}`);
      }
      logger.info(
        lang.__('UPDATING_RESOURCE', { resourceType: 'API Gateway resources', name: event.name }),
      );
      const newState = await updateApigwResource(context, event, serviceName, currentState);
      logger.info(
        lang.__('RESOURCE_UPDATED', { resourceType: 'API Gateway resources', name: event.name }),
      );
      return newState;
    }

    case 'delete': {
      const state = getResource(currentState, item.logicalId);
      if (!state) {
        logger.warn(lang.__('STATE_NOT_FOUND_SKIPPING', { logicalId: item.logicalId }));
        return null;
      }
      logger.info(
        lang.__('DELETING_RESOURCE', {
          resourceType: 'API Gateway resources',
          name: item.logicalId,
        }),
      );
      const newState = await deleteApigwResource(context, item.logicalId, currentState);
      logger.info(
        lang.__('RESOURCE_DELETED', {
          resourceType: 'API Gateway resources',
          name: item.logicalId,
        }),
      );
      return newState;
    }

    default:
      logger.warn(
        lang.__('UNKNOWN_ACTION_FOR_RESOURCE', { action: item.action, logicalId: item.logicalId }),
      );
      return null;
  }
};

export const executeApigwPlan = async (
  context: Context,
  plan: Plan,
  events: Array<EventDomain> | undefined,
  serviceName: string,
  initialState: StateFile,
  onStateChange?: SaveStateFn,
): Promise<ExecutionResult> => {
  const eventsMap = new Map<string, EventDomain>(events?.map((e) => [`events.${e.key}`, e]) ?? []);

  const successfulItems: Array<PlanItem> = [];
  let currentState = initialState;

  for (const item of plan.items) {
    try {
      const newState = await executeSingleItem(context, item, eventsMap, serviceName, currentState);
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
