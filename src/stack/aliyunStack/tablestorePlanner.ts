import { Context, TableDomain, Plan, PlanItem, StateFile, ResourceAttributes } from '../../types';
import { createAliyunClient } from '../../common/aliyunClient';
import { tableToTableStoreConfig, extractTableStoreDefinition } from './tablestoreTypes';
import { getAllResources, getResource } from '../../common/stateManager';
import { attributesEqual } from '../../common/hashUtils';

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

  const tableItems = await Promise.all(
    tables.map(async (table): Promise<PlanItem> => {
      const logicalId = `tables.${table.key}`;
      const currentState = getResource(state, logicalId);
      const config = tableToTableStoreConfig(table);
      const desiredDefinition = extractTableStoreDefinition(config);

      if (!currentState) {
        return {
          logicalId,
          action: 'create',
          resourceType: 'ALIYUN_TABLESTORE_TABLE',
          changes: { after: desiredDefinition },
        };
      }

      try {
        const client = createAliyunClient(context);
        const tablestoreClient = client.tablestore(config.instanceName);
        const remoteTable = await tablestoreClient.getTable(config.tableName);

        if (!remoteTable) {
          return {
            logicalId,
            action: 'create',
            resourceType: 'ALIYUN_TABLESTORE_TABLE',
            changes: { before: currentState.definition, after: desiredDefinition },
            drifted: true,
          };
        }

        const currentDefinition = currentState.definition || {};
        const definitionChanged = !attributesEqual(currentDefinition, desiredDefinition);

        if (definitionChanged) {
          // Check if primary keys changed (not updatable in TableStore)
          const currentPrimaryKey = JSON.stringify(currentDefinition.primaryKey || []);
          const desiredPrimaryKey = JSON.stringify(desiredDefinition.primaryKey || []);

          if (currentPrimaryKey !== desiredPrimaryKey) {
            // Primary key changes require table recreation (delete + create)
            // For now, we plan it as an update action with drift detection
            // The user should manually recreate the table if primary keys need to change
            return {
              logicalId,
              action: 'update',
              resourceType: 'ALIYUN_TABLESTORE_TABLE',
              changes: { before: currentDefinition, after: desiredDefinition },
              drifted: true,
            };
          }

          // Only throughput and table options changes can be applied via update
          return {
            logicalId,
            action: 'update',
            resourceType: 'ALIYUN_TABLESTORE_TABLE',
            changes: { before: currentDefinition, after: desiredDefinition },
            drifted: true,
          };
        }

        return { logicalId, action: 'noop', resourceType: 'ALIYUN_TABLESTORE_TABLE' };
      } catch {
        // If we can't check remote state, assume we need to create
        return {
          logicalId,
          action: 'create',
          resourceType: 'ALIYUN_TABLESTORE_TABLE',
          changes: { before: currentState.definition, after: desiredDefinition },
        };
      }
    }),
  );

  const allStates = getAllResources(state);
  const deletionItems = Object.entries(allStates)
    .filter(([logicalId]) => logicalId.startsWith('tables.') && !desiredLogicalIds.has(logicalId))
    .map(([logicalId, resourceState]) => planTableDeletion(logicalId, resourceState.definition));

  return { items: [...tableItems, ...deletionItems] };
};
