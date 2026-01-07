import { Context, TableDomain, Plan, StateFile } from '../../types';
import {
  createTableResource,
  deleteTableResource,
  updateTableResource,
} from './tablestoreResource';
import { logger } from '../../common';
import { getResource } from '../../common/stateManager';

export const executeTablePlan = async (
  context: Context,
  plan: Plan,
  tables: Array<TableDomain> | undefined,
  initialState: StateFile,
): Promise<StateFile> => {
  const tablesMap = new Map<string, TableDomain>(
    tables?.map((table) => [`tables.${table.key}`, table]) ?? [],
  );
  let currentState = initialState;

  for (const item of plan.items) {
    if (item.action === 'noop') {
      logger.info(`No changes for ${item.logicalId}`);
      continue;
    }

    try {
      switch (item.action) {
        case 'create': {
          const table = tablesMap.get(item.logicalId);
          if (!table) {
            throw new Error(`Table not found for logical ID: ${item.logicalId}`);
          }
          logger.info(`Creating table: ${table.collection}/${table.name}`);
          currentState = await createTableResource(context, table, currentState);
          logger.info(`Successfully created table: ${table.collection}/${table.name}`);
          break;
        }

        case 'update': {
          const table = tablesMap.get(item.logicalId);
          if (!table) {
            throw new Error(`Table not found for logical ID: ${item.logicalId}`);
          }
          logger.info(`Updating table: ${table.collection}/${table.name}`);
          currentState = await updateTableResource(context, table, currentState);
          logger.info(`Successfully updated table: ${table.collection}/${table.name}`);
          break;
        }

        case 'delete': {
          const state = getResource(currentState, item.logicalId);
          if (!state) {
            logger.warn(`State not found for ${item.logicalId}, skipping deletion`);
            continue;
          }
          // Extract instance name and table name from definition
          const instanceName = state.definition.instanceName as string;
          const tableName = state.definition.tableName as string;
          logger.info(`Deleting table: ${instanceName}/${tableName}`);
          currentState = await deleteTableResource(
            context,
            instanceName,
            tableName,
            item.logicalId,
            currentState,
          );
          logger.info(`Successfully deleted table: ${instanceName}/${tableName}`);
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
