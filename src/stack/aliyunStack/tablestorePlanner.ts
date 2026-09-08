import { Context, TableDomain, Plan, PlanItem, StateFile, ResourceAttributes } from '../../types';
import { createAliyunClient } from '../../common/aliyunClient';
import { cachedRefreshRead } from '../../common/refreshCache';
import { PLAN_READ_CONCURRENCY, mapWithConcurrency } from '../../common/concurrency';
import {
  tableToTableStoreConfig,
  extractTableStoreDefinition,
  cloudTableStoreToDefinition,
} from './tablestoreTypes';
import { planRefreshedResource } from '../../common/refreshPlanner';
import { getAllResources, getResource } from '../../common/stateManager';

const planTableDeletion = (logicalId: string, definition: ResourceAttributes): PlanItem => ({
  logicalId,
  action: 'delete',
  resourceType: 'ALIYUN_TABLESTORE_TABLE',
  changes: { before: definition },
});

export const generateTablePlan = async (
  context: Context,
  state: StateFile,
  tables: Array<TableDomain> | undefined,
): Promise<Plan> => {
  if (!tables || tables.length === 0) {
    const allStates = getAllResources(state);
    const items = Object.entries(allStates)
      .filter(([logicalId]) => logicalId.startsWith('tables.'))
      .map(([logicalId, resourceState]) => planTableDeletion(logicalId, resourceState.definition));
    return { items };
  }

  const desiredLogicalIds = new Set(tables.map((table) => `tables.${table.key}`));

  const tableItems = await mapWithConcurrency(
    tables,
    PLAN_READ_CONCURRENCY,
    async (table): Promise<PlanItem> => {
      const logicalId = `tables.${table.key}`;
      const currentState = getResource(state, logicalId);
      const config = tableToTableStoreConfig(table);
      const desiredDefinition = extractTableStoreDefinition(config);

      const client = createAliyunClient(context);
      const tablestoreClient = client.tablestore(config.instanceName);

      return planRefreshedResource({
        logicalId,
        resourceType: 'ALIYUN_TABLESTORE_TABLE',
        currentState,
        desiredDefinition,
        read: () =>
          cachedRefreshRead(
            context,
            `tablestore.getTable:${config.instanceName}:${config.tableName}`,
            () => tablestoreClient.getTable(config.tableName),
          ),
        // TableStore has no table-level tags: an existing same-named table can
        // never be verified as ours, so it is always refused on the probe path.
        isOwned: () => false,
        foreignError: () =>
          new Error(
            `Table ${config.tableName} already exists in provider but ownership cannot be verified (no table-level tags). Refusing to adopt — resolve manually.`,
          ),
        cloudToDefinition: cloudTableStoreToDefinition,
      });
    },
  );

  const allStates = getAllResources(state);
  const deletionItems = Object.entries(allStates)
    .filter(([logicalId]) => logicalId.startsWith('tables.') && !desiredLogicalIds.has(logicalId))
    .map(([logicalId, resourceState]) => planTableDeletion(logicalId, resourceState.definition));

  return { items: [...tableItems, ...deletionItems] };
};
