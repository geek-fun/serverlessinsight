import {
  Context,
  DatabaseDomain,
  Plan,
  PlanItem,
  StateFile,
  SaveStateFn,
  ExecutionResult,
} from '../../types';
import {
  createDatabaseResource,
  deleteDatabaseResource,
  updateDatabaseResource,
} from './databaseResource';
import { logger } from '../../common';
import { getResource } from '../../common/stateManager';
import { lang } from '../../lang';

const getResourceTypeName = (resourceType: string): string =>
  resourceType === 'ALIYUN_ES_SERVERLESS' ? 'Elasticsearch Serverless' : 'RDS Serverless';

const executeCreateAction = async (
  context: Context,
  database: DatabaseDomain,
  resourceType: string,
  currentState: StateFile,
): Promise<StateFile> => {
  const resourceTypeName = getResourceTypeName(resourceType);
  logger.info(
    lang.__('CREATING_RESOURCE', {
      resourceType: `${resourceTypeName} database`,
      name: database.name,
    }),
  );
  const newState = await createDatabaseResource(context, database, currentState);
  logger.info(
    lang.__('RESOURCE_CREATED', {
      resourceType: `${resourceTypeName} database`,
      name: database.name,
    }),
  );
  return newState;
};

const executeUpdateAction = async (
  context: Context,
  database: DatabaseDomain,
  instanceId: string,
  resourceType: string,
  currentState: StateFile,
): Promise<StateFile> => {
  const resourceTypeName = getResourceTypeName(resourceType);
  logger.info(
    lang.__('UPDATING_RESOURCE', {
      resourceType: `${resourceTypeName} database`,
      name: database.name,
    }),
  );
  const newState = await updateDatabaseResource(
    context,
    database,
    instanceId,
    resourceType,
    currentState,
  );
  logger.info(
    lang.__('RESOURCE_UPDATED', {
      resourceType: `${resourceTypeName} database`,
      name: database.name,
    }),
  );
  return newState;
};

const executeDeleteAction = async (
  context: Context,
  instanceId: string,
  resourceType: string,
  logicalId: string,
  currentState: StateFile,
): Promise<StateFile> => {
  const resourceTypeName = getResourceTypeName(resourceType);
  logger.info(
    lang.__('DELETING_RESOURCE', {
      resourceType: `${resourceTypeName} database`,
      name: instanceId,
    }),
  );
  const newState = await deleteDatabaseResource(
    context,
    instanceId,
    resourceType,
    logicalId,
    currentState,
  );
  logger.info(
    lang.__('RESOURCE_DELETED', { resourceType: `${resourceTypeName} database`, name: instanceId }),
  );
  return newState;
};

const executeSingleItem = async (
  context: Context,
  item: PlanItem,
  databasesMap: Map<string, DatabaseDomain>,
  currentState: StateFile,
): Promise<StateFile | null> => {
  if (
    item.resourceType !== 'ALIYUN_RDS_SERVERLESS' &&
    item.resourceType !== 'ALIYUN_ES_SERVERLESS'
  ) {
    return null;
  }

  switch (item.action) {
    case 'noop':
      logger.info(lang.__('NO_CHANGESForResource', { logicalId: item.logicalId }));
      return null;

    case 'create': {
      const database = databasesMap.get(item.logicalId);
      if (!database) {
        throw new Error(`Database not found for logical ID: ${item.logicalId}`);
      }
      return executeCreateAction(context, database, item.resourceType, currentState);
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
      const instanceId =
        (state.metadata?.instanceId as string | undefined) || state.instances?.[0]?.id;
      const resourceType = (state.metadata?.resourceType as string) || item.resourceType;
      if (!instanceId) {
        throw new Error(`Instance ID not found in state for ${item.logicalId}`);
      }
      return executeUpdateAction(context, database, instanceId, resourceType, currentState);
    }

    case 'delete': {
      const state = getResource(currentState, item.logicalId);
      if (!state) {
        logger.warn(lang.__('STATE_NOT_FOUND_SKIPPING', { logicalId: item.logicalId }));
        return null;
      }
      const instanceId =
        (state.metadata?.instanceId as string | undefined) || state.instances?.[0]?.id;
      const resourceType = (state.metadata?.resourceType as string) || item.resourceType;
      if (!instanceId) {
        throw new Error(`Instance ID not found in state for ${item.logicalId}`);
      }
      return executeDeleteAction(context, instanceId, resourceType, item.logicalId, currentState);
    }

    default:
      logger.warn(
        lang.__('UNKNOWN_ACTION_FOR_RESOURCE', { action: item.action, logicalId: item.logicalId }),
      );
      return null;
  }
};

export const executeDatabasePlan = async (
  context: Context,
  plan: Plan,
  databases: Array<DatabaseDomain> | undefined,
  initialState: StateFile,
  onStateChange?: SaveStateFn,
): Promise<ExecutionResult> => {
  const databasesMap = new Map<string, DatabaseDomain>(
    databases?.map((database) => [`databases.${database.key}`, database]) ?? [],
  );

  const successfulItems: Array<PlanItem> = [];
  let currentState = initialState;

  for (const item of plan.items) {
    try {
      const newState = await executeSingleItem(context, item, databasesMap, currentState);
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
