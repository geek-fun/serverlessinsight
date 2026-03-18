import {
  Context,
  DatabaseDomain,
  Plan,
  PlanItem,
  StateFile,
  SaveStateFn,
  ExecutionResult,
} from '../../types';
import { createEsResource, deleteEsResource, updateEsResource } from './esServerlessResource';
import { logger } from '../../common';
import { getResource } from '../../common/stateManager';
import { lang } from '../../lang';

const executeCreateAction = async (
  context: Context,
  database: DatabaseDomain,
  currentState: StateFile,
): Promise<StateFile> => {
  logger.info(
    lang.__('CREATING_RESOURCE', {
      resourceType: 'Tencent ES serverless space',
      name: database.name,
    }),
  );
  const newState = await createEsResource(context, database, currentState);
  logger.info(
    lang.__('RESOURCE_CREATED', {
      resourceType: 'Tencent ES serverless space',
      name: database.name,
    }),
  );
  return newState;
};

const executeUpdateAction = async (
  context: Context,
  database: DatabaseDomain,
  spaceId: string,
  currentState: StateFile,
): Promise<StateFile> => {
  logger.info(
    lang.__('UPDATING_RESOURCE', {
      resourceType: 'Tencent ES serverless space',
      name: database.name,
    }),
  );
  const newState = await updateEsResource(context, database, spaceId, currentState);
  logger.info(
    lang.__('RESOURCE_UPDATED', {
      resourceType: 'Tencent ES serverless space',
      name: database.name,
    }),
  );
  return newState;
};

const executeDeleteAction = async (
  context: Context,
  spaceId: string,
  logicalId: string,
  currentState: StateFile,
): Promise<StateFile> => {
  logger.info(
    lang.__('DELETING_RESOURCE', { resourceType: 'Tencent ES serverless space', name: spaceId }),
  );
  const newState = await deleteEsResource(context, spaceId, logicalId, currentState);
  logger.info(
    lang.__('RESOURCE_DELETED', { resourceType: 'Tencent ES serverless space', name: spaceId }),
  );
  return newState;
};

const executeSingleItem = async (
  context: Context,
  item: PlanItem,
  databasesMap: Map<string, DatabaseDomain>,
  currentState: StateFile,
): Promise<StateFile | null> => {
  if (item.resourceType !== 'TENCENT_ES_SERVERLESS') {
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
      return executeCreateAction(context, database, currentState);
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
      const spaceId = (state.metadata?.spaceId as string | undefined) || state.instances?.[0]?.id;
      if (!spaceId) {
        throw new Error(`Space ID not found in state for ${item.logicalId}`);
      }
      return executeUpdateAction(context, database, spaceId, currentState);
    }

    case 'delete': {
      const state = getResource(currentState, item.logicalId);
      if (!state) {
        logger.warn(lang.__('STATE_NOT_FOUND_SKIPPING', { logicalId: item.logicalId }));
        return null;
      }
      const spaceId = (state.metadata?.spaceId as string | undefined) || state.instances?.[0]?.id;
      if (!spaceId) {
        throw new Error(`Space ID not found in state for ${item.logicalId}`);
      }
      return executeDeleteAction(context, spaceId, item.logicalId, currentState);
    }

    default:
      logger.warn(
        lang.__('UNKNOWN_ACTION_FOR_RESOURCE', { action: item.action, logicalId: item.logicalId }),
      );
      return null;
  }
};

export const executeEsPlan = async (
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
