import {
  Context,
  DatabaseDomain,
  DatabaseEnum,
  Plan,
  PlanItem,
  StateFile,
  ResourceAttributes,
} from '../../types';
import { getTdsqlcCluster } from './tdsqlcProvider';
import { databaseToTdsqlcConfig, extractTdsqlcDefinition } from './tdsqlcTypes';
import { getAllResources, getResource } from '../../common/stateManager';
import { attributesEqual } from '../../common/hashUtils';

const planDatabaseDeletion = (logicalId: string, definition: ResourceAttributes): PlanItem => ({
  logicalId,
  action: 'delete',
  resourceType: 'TDSQL_C_SERVERLESS',
  changes: { before: definition },
});

export const generateDatabasePlan = async (
  context: Context,
  state: StateFile,
  databases: Array<DatabaseDomain> | undefined,
): Promise<Plan> => {
  const tdsqlcDatabases = databases?.filter((db) => db.type === DatabaseEnum.TDSQL_C_SERVERLESS);

  if (!tdsqlcDatabases || tdsqlcDatabases.length === 0) {
    const allStates = getAllResources(state);
    const items = Object.entries(allStates)
      .filter(([logicalId]) => logicalId.startsWith('databases.'))
      .map(([logicalId, resourceState]) =>
        planDatabaseDeletion(logicalId, resourceState.definition),
      );
    return { items };
  }

  const desiredLogicalIds = new Set(tdsqlcDatabases.map((db) => `databases.${db.key}`));

  const databaseItems = await Promise.all(
    tdsqlcDatabases.map(async (database): Promise<PlanItem> => {
      const logicalId = `databases.${database.key}`;
      const currentState = getResource(state, logicalId);
      const config = databaseToTdsqlcConfig(database);
      const desiredDefinition = extractTdsqlcDefinition(config);

      if (!currentState) {
        return {
          logicalId,
          action: 'create',
          resourceType: 'TDSQL_C_SERVERLESS',
          changes: { after: desiredDefinition },
        };
      }

      const clusterId =
        (currentState.metadata?.clusterId as string | undefined) || currentState.instances?.[0]?.id;

      try {
        const remoteCluster = clusterId ? await getTdsqlcCluster(context, clusterId) : null;

        if (!remoteCluster) {
          return {
            logicalId,
            action: 'create',
            resourceType: 'TDSQL_C_SERVERLESS',
            changes: { before: currentState.definition, after: desiredDefinition },
            drifted: true,
          };
        }

        const currentDefinition = currentState.definition || {};
        const definitionChanged = !attributesEqual(currentDefinition, desiredDefinition);

        if (definitionChanged) {
          return {
            logicalId,
            action: 'update',
            resourceType: 'TDSQL_C_SERVERLESS',
            changes: { before: currentDefinition, after: desiredDefinition },
            drifted: true,
          };
        }

        return { logicalId, action: 'noop', resourceType: 'TDSQL_C_SERVERLESS' };
      } catch {
        return {
          logicalId,
          action: 'create',
          resourceType: 'TDSQL_C_SERVERLESS',
          changes: { before: currentState.definition, after: desiredDefinition },
        };
      }
    }),
  );

  const allStates = getAllResources(state);
  const deletionItems = Object.entries(allStates)
    .filter(
      ([logicalId]) => logicalId.startsWith('databases.') && !desiredLogicalIds.has(logicalId),
    )
    .map(([logicalId, resourceState]) => planDatabaseDeletion(logicalId, resourceState.definition));

  return { items: [...databaseItems, ...deletionItems] };
};
