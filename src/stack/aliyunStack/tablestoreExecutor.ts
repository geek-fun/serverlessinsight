import {
  Context,
  TableDomain,
  Plan,
  PlanItem,
  StateFile,
  SaveStateFn,
  ExecutionResult,
} from '../../types';
import {
  createTableResource,
  deleteTableResource,
  updateTableResource,
} from './tablestoreResource';
import { logger } from '../../common';
import { getResource } from '../../common/stateManager';
import { lang } from '../../lang';

const executeCreateAction = async (
  context: Context,
  table: TableDomain,
  currentState: StateFile,
): Promise<StateFile> => {
  logger.info(
    lang.__('CREATING_RESOURCE', {
      resourceType: 'table',
      name: `${table.collection}/${table.name}`,
    }),
  );
  const newState = await createTableResource(context, table, currentState);
  logger.info(
    lang.__('RESOURCE_CREATED', {
      resourceType: 'table',
      name: `${table.collection}/${table.name}`,
    }),
  );
  return newState;
};

const executeUpdateAction = async (
  context: Context,
  table: TableDomain,
  currentState: StateFile,
): Promise<StateFile> => {
  logger.info(
    lang.__('UPDATING_RESOURCE', {
      resourceType: 'table',
      name: `${table.collection}/${table.name}`,
    }),
  );
  const newState = await updateTableResource(context, table, currentState);
  logger.info(
    lang.__('RESOURCE_UPDATED', {
      resourceType: 'table',
      name: `${table.collection}/${table.name}`,
    }),
  );
  return newState;
};

const executeDeleteAction = async (
  context: Context,
  instanceName: string,
  tableName: string,
  logicalId: string,
  currentState: StateFile,
): Promise<StateFile> => {
  logger.info(
    lang.__('DELETING_RESOURCE', { resourceType: 'table', name: `${instanceName}/${tableName}` }),
  );
  const newState = await deleteTableResource(
    context,
    instanceName,
    tableName,
    logicalId,
    currentState,
  );
  logger.info(
    lang.__('RESOURCE_DELETED', { resourceType: 'table', name: `${instanceName}/${tableName}` }),
  );
  return newState;
};

const executeSingleItem = async (
  context: Context,
  item: PlanItem,
  tablesMap: Map<string, TableDomain>,
  currentState: StateFile,
): Promise<StateFile | null> => {
  switch (item.action) {
    case 'noop':
      logger.info(lang.__('NO_CHANGESForResource', { logicalId: item.logicalId }));
      return null;

    case 'create': {
      const table = tablesMap.get(item.logicalId);
      if (!table) {
        throw new Error(`Table not found for logical ID: ${item.logicalId}`);
      }
      return executeCreateAction(context, table, currentState);
    }

    case 'update': {
      const table = tablesMap.get(item.logicalId);
      if (!table) {
        throw new Error(`Table not found for logical ID: ${item.logicalId}`);
      }
      return executeUpdateAction(context, table, currentState);
    }

    case 'delete': {
      const state = getResource(currentState, item.logicalId);
      if (!state) {
        logger.warn(lang.__('STATE_NOT_FOUND_SKIPPING', { logicalId: item.logicalId }));
        return null;
      }
      const instanceName = state.definition.instanceName as string;
      const tableName = state.definition.tableName as string;
      return executeDeleteAction(context, instanceName, tableName, item.logicalId, currentState);
    }

    default:
      logger.warn(
        lang.__('UNKNOWN_ACTION_FOR_RESOURCE', { action: item.action, logicalId: item.logicalId }),
      );
      return null;
  }
};

export const executeTablePlan = async (
  context: Context,
  plan: Plan,
  tables: Array<TableDomain> | undefined,
  initialState: StateFile,
  onStateChange?: SaveStateFn,
): Promise<ExecutionResult> => {
  const tablesMap = new Map<string, TableDomain>(
    tables?.map((table) => [`tables.${table.key}`, table]) ?? [],
  );

  const successfulItems: Array<PlanItem> = [];
  let currentState = initialState;

  for (const item of plan.items) {
    try {
      const newState = await executeSingleItem(context, item, tablesMap, currentState);
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
