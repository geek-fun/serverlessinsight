import { Context, DatabaseDomain, Plan, StateFile } from '../../types';
import {
  createDatabaseResource,
  deleteDatabaseResource,
  updateDatabaseResource,
} from './tdsqlcResource';
import { logger } from '../../common';
import { getResource } from '../../common/stateManager';

export const executeDatabasePlan = async (
  context: Context,
  plan: Plan,
  databases: Array<DatabaseDomain> | undefined,
  initialState: StateFile,
): Promise<StateFile> => {
  const databasesMap = new Map<string, DatabaseDomain>();
  let currentState = initialState;

  if (databases) {
    for (const database of databases) {
      databasesMap.set(`databases.${database.key}`, database);
    }
  }

  for (const item of plan.items) {
    if (item.resourceType !== 'TDSQL_C_SERVERLESS') {
      continue;
    }

    if (item.action === 'noop') {
      logger.info(`No changes for ${item.logicalId}`);
      continue;
    }

    try {
      switch (item.action) {
        case 'create': {
          const database = databasesMap.get(item.logicalId);
          if (!database) {
            throw new Error(`Database not found for logical ID: ${item.logicalId}`);
          }
          logger.info(`Creating TDSQL-C database: ${database.name}`);
          currentState = await createDatabaseResource(context, database, currentState);
          logger.info(`Successfully created TDSQL-C database: ${database.name}`);
          break;
        }

        case 'update': {
          const database = databasesMap.get(item.logicalId);
          if (!database) {
            throw new Error(`Database not found for logical ID: ${item.logicalId}`);
          }
          const state = getResource(currentState, item.logicalId);
          if (!state) {
            throw new Error(`State not found for ${item.logicalId}`);
          }
          // Extract clusterId from metadata or instances
          const clusterId =
            (state.metadata?.clusterId as string | undefined) || state.instances?.[0]?.id;
          if (!clusterId) {
            throw new Error(`Cluster ID not found in state for ${item.logicalId}`);
          }
          logger.info(`Updating TDSQL-C database: ${database.name}`);
          currentState = await updateDatabaseResource(context, database, clusterId, currentState);
          logger.info(`Successfully updated TDSQL-C database: ${database.name}`);
          break;
        }

        case 'delete': {
          const state = getResource(currentState, item.logicalId);
          if (!state) {
            logger.warn(`State not found for ${item.logicalId}, skipping deletion`);
            continue;
          }
          // Extract clusterId from metadata or instances
          const clusterId =
            (state.metadata?.clusterId as string | undefined) || state.instances?.[0]?.id;
          if (!clusterId) {
            throw new Error(`Cluster ID not found in state for ${item.logicalId}`);
          }
          logger.info(`Deleting TDSQL-C database: ${clusterId}`);
          currentState = await deleteDatabaseResource(
            context,
            clusterId,
            item.logicalId,
            currentState,
          );
          logger.info(`Successfully deleted TDSQL-C database: ${clusterId}`);
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
