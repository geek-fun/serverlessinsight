import {
  Context,
  DatabaseDomain,
  DatabaseEnum,
  Plan,
  PlanItem,
  StateFile,
  ResourceAttributes,
} from '../../types';
import { createTencentClient } from '../../common/tencentClient';
import { cachedRefreshRead } from '../../common/refreshCache';
import { PLAN_READ_CONCURRENCY, mapWithConcurrency } from '../../common/concurrency';
import {
  databaseToTdsqlcConfig,
  extractTdsqlcDefinition,
  tdsqlcTagsToOwnershipTags,
  cloudTdsqlcToDefinition,
} from './tdsqlcTypes';
import { getAllResources, getResource } from '../../common/stateManager';
import { planRefreshedResource } from '../../common/refreshPlanner';
import { OWNERSHIP_TAG_KEY, isOwnedByStack } from '../ownershipTag';

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
      .filter(([logicalId, resourceState]) => {
        if (!logicalId.startsWith('databases.')) return false;
        const resourceType = resourceState.metadata?.resourceType as string | undefined;
        // Only plan deletion for TDSQL-C resources (or legacy resources without resourceType
        // that have clusterId metadata, indicating they are TDSQL-C)
        return !resourceType || resourceType === 'TDSQL_C_SERVERLESS';
      })
      .map(([logicalId, resourceState]) =>
        planDatabaseDeletion(logicalId, resourceState.definition),
      );
    return { items };
  }

  const desiredLogicalIds = new Set(tdsqlcDatabases.map((db) => `databases.${db.key}`));

  const databaseItems = await mapWithConcurrency(
    tdsqlcDatabases,
    PLAN_READ_CONCURRENCY,
    async (database): Promise<PlanItem> => {
      const logicalId = `databases.${database.key}`;
      const currentState = getResource(state, logicalId);
      const config = databaseToTdsqlcConfig(database);
      const desiredDefinition = extractTdsqlcDefinition(config);

      const client = createTencentClient(context);
      const clusterId =
        (currentState?.metadata?.clusterId as string | undefined) ||
        currentState?.instances?.[0]?.id;

      return planRefreshedResource({
        logicalId,
        resourceType: 'TDSQL_C_SERVERLESS',
        currentState,
        desiredDefinition,
        probeRead: () =>
          cachedRefreshRead(context, `tdsqlc.getClusterByName:${database.name}`, () =>
            client.tdsqlc.getClusterByName(database.name),
          ),
        read: () =>
          clusterId
            ? cachedRefreshRead(context, `tdsqlc.getCluster:${clusterId}`, () =>
                client.tdsqlc.getCluster(clusterId),
              )
            : Promise.resolve(null),
        isOwned: (remote) =>
          isOwnedByStack(context, logicalId, tdsqlcTagsToOwnershipTags(remote.ResourceTags)),
        foreignError: () =>
          new Error(
            `Cluster ${database.name} already exists in provider but is not owned by this stack (missing ${OWNERSHIP_TAG_KEY} tag). Refusing to create — resolve manually.`,
          ),
        cloudToDefinition: cloudTdsqlcToDefinition,
        refresh: context.refresh,
      });
    },
  );

  const allStates = getAllResources(state);
  const deletionItems = Object.entries(allStates)
    .filter(([logicalId, resourceState]) => {
      if (!logicalId.startsWith('databases.') || desiredLogicalIds.has(logicalId)) return false;
      const resourceType = resourceState.metadata?.resourceType as string | undefined;
      return !resourceType || resourceType === 'TDSQL_C_SERVERLESS';
    })
    .map(([logicalId, resourceState]) => planDatabaseDeletion(logicalId, resourceState.definition));

  return { items: [...databaseItems, ...deletionItems] };
};
