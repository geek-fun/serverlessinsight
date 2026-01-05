import { Context, DatabaseDomain, Plan, StateFile } from '../../types';
import {
  createDatabaseResource,
  deleteDatabaseResource,
  updateDatabaseResource,
} from './databaseResource';
import { logger } from '../../common';
import { getResource } from '../../common/stateManager';

export const executeDatabasePlan = async (
  context: Context,
  plan: Plan,
  databases: Array<DatabaseDomain> | undefined,
  initialState: StateFile,
): Promise<StateFile> => {
  const databasesMap = new Map<string, DatabaseDomain>(
    databases?.map((database) => [`databases.${database.key}`, database]) ?? [],
  );
  let currentState = initialState;

  for (const item of plan.items) {
    if (item.resourceType !== 'ALIYUN_RDS_SERVERLESS' && item.resourceType !== 'ALIYUN_ES_SERVERLESS') {
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
          const resourceTypeName =
            item.resourceType === 'ALIYUN_ES_SERVERLESS' ? 'Elasticsearch Serverless' : 'RDS Serverless';
          logger.info(`Creating ${resourceTypeName} database: ${database.name}`);
          currentState = await createDatabaseResource(context, database, currentState);
          logger.info(`Successfully created ${resourceTypeName} database: ${database.name}`);
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
          // Extract instanceId from metadata or instances
          const instanceId =
            (state.metadata?.instanceId as string | undefined) || state.instances?.[0]?.id;
          const resourceType = (state.metadata?.resourceType as string) || item.resourceType;
          if (!instanceId) {
            throw new Error(`Instance ID not found in state for ${item.logicalId}`);
          }
          const resourceTypeName =
            resourceType === 'ALIYUN_ES_SERVERLESS' ? 'Elasticsearch Serverless' : 'RDS Serverless';
          logger.info(`Updating ${resourceTypeName} database: ${database.name}`);
          currentState = await updateDatabaseResource(
            context,
            database,
            instanceId,
            resourceType,
            currentState,
          );
          logger.info(`Successfully updated ${resourceTypeName} database: ${database.name}`);
          break;
        }

        case 'delete': {
          const state = getResource(currentState, item.logicalId);
          if (!state) {
            logger.warn(`State not found for ${item.logicalId}, skipping deletion`);
            continue;
          }
          // Extract instanceId from metadata or instances
          const instanceId =
            (state.metadata?.instanceId as string | undefined) || state.instances?.[0]?.id;
          const resourceType = (state.metadata?.resourceType as string) || item.resourceType;
          if (!instanceId) {
            throw new Error(`Instance ID not found in state for ${item.logicalId}`);
          }
          const resourceTypeName =
            resourceType === 'ALIYUN_ES_SERVERLESS' ? 'Elasticsearch Serverless' : 'RDS Serverless';
          logger.info(`Deleting ${resourceTypeName} database: ${instanceId}`);
          currentState = await deleteDatabaseResource(
            context,
            instanceId,
            resourceType,
            item.logicalId,
            currentState,
          );
          logger.info(`Successfully deleted ${resourceTypeName} database: ${instanceId}`);
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
