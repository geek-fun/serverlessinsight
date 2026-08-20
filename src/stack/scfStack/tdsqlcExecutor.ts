import {
  Context,
  DatabaseDomain,
  Plan,
  PlanItem,
  StateFile,
  SaveStateFn,
  ExecutionResult,
  PartialResourceError,
} from '../../types';
import {
  createDatabaseResource,
  deleteDatabaseResource,
  updateDatabaseResource,
} from './tdsqlcResource';
import { logger } from '../../common';
import { reportResourceEvent } from '../../common/reportResourceEvent';
import { getResource } from '../../common/stateManager';
import { lang } from '../../lang';

const executeCreateAction = async (
  context: Context,
  database: DatabaseDomain,
  currentState: StateFile,
): Promise<StateFile> => {
  logger.info(
    lang.__('CREATING_RESOURCE', { resourceType: 'TDSQL-C database', name: database.name }),
  );
  const newState = await createDatabaseResource(context, database, currentState);
  logger.info(
    lang.__('RESOURCE_CREATED', { resourceType: 'TDSQL-C database', name: database.name }),
  );
  return newState;
};

const executeUpdateAction = async (
  context: Context,
  database: DatabaseDomain,
  clusterId: string,
  currentState: StateFile,
): Promise<StateFile> => {
  logger.info(
    lang.__('UPDATING_RESOURCE', { resourceType: 'TDSQL-C database', name: database.name }),
  );
  const newState = await updateDatabaseResource(context, database, clusterId, currentState);
  logger.info(
    lang.__('RESOURCE_UPDATED', { resourceType: 'TDSQL-C database', name: database.name }),
  );
  return newState;
};

const executeDeleteAction = async (
  context: Context,
  clusterId: string,
  logicalId: string,
  currentState: StateFile,
): Promise<StateFile> => {
  logger.info(lang.__('DELETING_RESOURCE', { resourceType: 'TDSQL-C database', name: clusterId }));
  const newState = await deleteDatabaseResource(context, clusterId, logicalId, currentState);
  logger.info(lang.__('RESOURCE_DELETED', { resourceType: 'TDSQL-C database', name: clusterId }));
  return newState;
};

const executeSingleItem = async (
  context: Context,
  item: PlanItem,
  databasesMap: Map<string, DatabaseDomain>,
  currentState: StateFile,
): Promise<StateFile | null> => {
  if (item.resourceType !== 'TDSQL_C_SERVERLESS') {
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
      const clusterId =
        (state.metadata?.clusterId as string | undefined) || state.instances?.[0]?.id;
      if (!clusterId) {
        throw new Error(`Cluster ID not found in state for ${item.logicalId}`);
      }
      return executeUpdateAction(context, database, clusterId, currentState);
    }

    case 'delete': {
      const state = getResource(currentState, item.logicalId);
      if (!state) {
        logger.warn(lang.__('STATE_NOT_FOUND_SKIPPING', { logicalId: item.logicalId }));
        return null;
      }
      const clusterId =
        (state.metadata?.clusterId as string | undefined) || state.instances?.[0]?.id;
      if (!clusterId) {
        throw new Error(`Cluster ID not found in state for ${item.logicalId}`);
      }
      return executeDeleteAction(context, clusterId, item.logicalId, currentState);
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
    reportResourceEvent(context, {
      type: 'resource_pre',
      logicalId: item.logicalId,
      resourceType: item.resourceType,
      action: item.action,
      ...(item.drifted ? { message: 'resource drifted' } : {}),
    });
    const __siStartedAt = Date.now();
    try {
      const newState = await executeSingleItem(context, item, databasesMap, currentState);
      if (newState !== null) {
        currentState = newState;
        successfulItems.push(item);
        reportResourceEvent(context, {
          type: 'resource_complete',
          logicalId: item.logicalId,
          durationMs: Date.now() - __siStartedAt,
        });
        if (onStateChange) {
          await onStateChange(currentState);
          logger.debug(
            lang.__('STATE_PERSISTED_AFTER_OPERATION', {
              action: item.action,
              resourceId: item.logicalId,
            }),
          );
        }
      }
    } catch (error) {
      reportResourceEvent(context, {
        type: 'resource_failed',
        logicalId: item.logicalId,
        severity: 'error',
        durationMs: Date.now() - __siStartedAt,
        error: {
          message: error instanceof Error ? error.message : String(error),
        },
      });
      if (error instanceof PartialResourceError) {
        const updatedState = error.updatedState;
        if (onStateChange) {
          await onStateChange(updatedState);
        }
        return {
          state: updatedState,
          partialFailure: {
            failedItem: item,
            error: error.cause,
            successfulItems,
          },
        };
      }

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
