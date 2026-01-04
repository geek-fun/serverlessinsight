import { Context, EventDomain, Plan, StateFile } from '../../types';
import { createApigwResource, deleteApigwResource, updateApigwResource } from './apigwResource';
import { logger } from '../../common';
import { getResource } from '../../common/stateManager';

/**
 * Execute API Gateway plan
 */
export const executeApigwPlan = async (
  context: Context,
  plan: Plan,
  events: Array<EventDomain> | undefined,
  serviceName: string,
  roleArn: string | undefined,
  initialState: StateFile,
): Promise<StateFile> => {
  const eventsMap = new Map<string, EventDomain>(events?.map((e) => [`events.${e.key}`, e]) ?? []);
  let currentState = initialState;

  for (const item of plan.items) {
    if (item.action === 'noop') {
      logger.info(`No changes for ${item.logicalId}`);
      continue;
    }

    try {
      switch (item.action) {
        case 'create': {
          const event = eventsMap.get(item.logicalId);
          if (!event) {
            throw new Error(`Event not found for logical ID: ${item.logicalId}`);
          }
          logger.info(`Creating API Gateway resources for: ${event.name}`);
          currentState = await createApigwResource(
            context,
            event,
            serviceName,
            roleArn,
            currentState,
          );
          logger.info(`Successfully created API Gateway resources for: ${event.name}`);
          break;
        }

        case 'update': {
          const event = eventsMap.get(item.logicalId);
          if (!event) {
            throw new Error(`Event not found for logical ID: ${item.logicalId}`);
          }
          logger.info(`Updating API Gateway resources for: ${event.name}`);
          currentState = await updateApigwResource(
            context,
            event,
            serviceName,
            roleArn,
            currentState,
          );
          logger.info(`Successfully updated API Gateway resources for: ${event.name}`);
          break;
        }

        case 'delete': {
          const state = getResource(currentState, item.logicalId);
          if (!state) {
            logger.warn(`State not found for ${item.logicalId}, skipping deletion`);
            continue;
          }
          logger.info(`Deleting API Gateway resources for: ${item.logicalId}`);
          currentState = await deleteApigwResource(context, item.logicalId, currentState);
          logger.info(`Successfully deleted API Gateway resources for: ${item.logicalId}`);
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
