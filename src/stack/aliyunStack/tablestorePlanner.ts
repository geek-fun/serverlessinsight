import { Context, TableDomain, Plan, PlanItem, StateFile, ResourceAttributes } from '../../types';
import { createAliyunClient } from '../../common/aliyunClient';
import { cachedRefreshRead } from '../../common/refreshCache';
import { PLAN_READ_CONCURRENCY, mapWithConcurrency } from '../../common/concurrency';
import {
  tableToTableStoreConfig,
  extractTableStoreDefinition,
  cloudTableStoreToDefinition,
} from './tablestoreTypes';
import { remoteDiffersFromDesired } from '../../common/planCompare';
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

  const tableItems = await mapWithConcurrency(
    tables,
    PLAN_READ_CONCURRENCY,
    async (table): Promise<PlanItem> => {
      const logicalId = `tables.${table.key}`;
      const currentState = getResource(state, logicalId);
      const config = tableToTableStoreConfig(table);
      const desiredDefinition = extractTableStoreDefinition(config);

      if (!currentState || currentState.status === 'tainted') {
        // No usable local state: probe the provider before planning create.
        // Aliyun Tablestore (OTS) supports only instance-level tags — table
        // ownership cannot be verified, so tag-based adoption is IMPOSSIBLE.
        // If a same-named table already exists it may belong to another
        // project: fail fast in the plan instead of letting the executor
        // discover the collision mid-deploy.
        const client = createAliyunClient(context);
        const tablestoreClient = client.tablestore(config.instanceName);
        const remoteTable = await cachedRefreshRead(
          context,
          `tablestore.getTable:${config.instanceName}:${config.tableName}`,
          () => tablestoreClient.getTable(config.tableName),
        );
        if (remoteTable) {
          throw new Error(
            `Table ${config.tableName} already exists in provider but ownership cannot be verified (no table-level tags). Refusing to adopt — resolve manually.`,
          );
        }

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
        const remoteTable = await cachedRefreshRead(
          context,
          `tablestore.getTable:${config.instanceName}:${config.tableName}`,
          () => tablestoreClient.getTable(config.tableName),
        );

        if (!remoteTable) {
          return {
            logicalId,
            action: 'create',
            resourceType: 'ALIYUN_TABLESTORE_TABLE',
            changes: { before: currentState.definition, after: desiredDefinition },
            drifted: true,
          };
        }

        const remoteAttributes = cloudTableStoreToDefinition(remoteTable);
        const remoteDiffers = remoteDiffersFromDesired(remoteAttributes, desiredDefinition);

        const currentDefinition = currentState.definition || {};
        const definitionChanged = !attributesEqual(currentDefinition, desiredDefinition);

        if (definitionChanged || remoteDiffers) {
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
    },
  );

  const allStates = getAllResources(state);
  const deletionItems = Object.entries(allStates)
    .filter(([logicalId]) => logicalId.startsWith('tables.') && !desiredLogicalIds.has(logicalId))
    .map(([logicalId, resourceState]) => planTableDeletion(logicalId, resourceState.definition));

  return { items: [...tableItems, ...deletionItems] };
};
