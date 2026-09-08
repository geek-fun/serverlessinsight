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
  databaseToTencentEsConfig,
  extractTencentEsDefinition,
  cloudTencentEsToDefinition,
} from './esServerlessTypes';
import { getAllResources, getResource } from '../../common/stateManager';
import { planRefreshedResource } from '../../common/refreshPlanner';
import { OWNERSHIP_TAG_KEY, isOwnedByStack } from '../ownershipTag';

const planEsDeletion = (logicalId: string, definition: ResourceAttributes): PlanItem => ({
  logicalId,
  action: 'delete',
  resourceType: 'TENCENT_ES_SERVERLESS',
  changes: { before: definition },
});

export const generateEsPlan = async (
  context: Context,
  state: StateFile,
  databases: Array<DatabaseDomain> | undefined,
): Promise<Plan> => {
  const esDatabases = databases?.filter((db) => db.type === DatabaseEnum.ELASTICSEARCH_SERVERLESS);

  if (!esDatabases || esDatabases.length === 0) {
    const allStates = getAllResources(state);
    const items = Object.entries(allStates)
      .filter(([logicalId, resourceState]) => {
        const resourceType = resourceState.metadata?.resourceType as string | undefined;
        return logicalId.startsWith('databases.') && resourceType === 'TENCENT_ES_SERVERLESS';
      })
      .map(([logicalId, resourceState]) => planEsDeletion(logicalId, resourceState.definition));
    return { items };
  }

  const desiredLogicalIds = new Set(esDatabases.map((db) => `databases.${db.key}`));

  const databaseItems = await mapWithConcurrency(
    esDatabases,
    PLAN_READ_CONCURRENCY,
    async (database): Promise<PlanItem> => {
      const logicalId = `databases.${database.key}`;
      const currentState = getResource(state, logicalId);
      const config = databaseToTencentEsConfig(database);
      const desiredDefinition = extractTencentEsDefinition(config);

      const client = createTencentClient(context);
      const spaceId =
        (currentState?.metadata?.spaceId as string | undefined) || currentState?.instances?.[0]?.id;

      return planRefreshedResource({
        logicalId,
        resourceType: 'TENCENT_ES_SERVERLESS',
        currentState,
        desiredDefinition,
        probeRead: () =>
          cachedRefreshRead(context, `es.getSpaceByName:${config.SpaceName}`, () =>
            client.es.getSpaceByName(config.SpaceName),
          ),
        read: () =>
          spaceId
            ? cachedRefreshRead(context, `es.getSpace:${spaceId}`, () =>
                client.es.getSpace(spaceId),
              )
            : Promise.resolve(null),
        isOwned: (remote) => isOwnedByStack(context, logicalId, remote.Tags),
        foreignError: () =>
          new Error(
            `ES space ${config.SpaceName} already exists in provider but is not owned by this stack (missing ${OWNERSHIP_TAG_KEY} tag). Refusing to create — resolve manually.`,
          ),
        cloudToDefinition: cloudTencentEsToDefinition,
      });
    },
  );

  const allStates = getAllResources(state);
  const deletionItems = Object.entries(allStates)
    .filter(([logicalId, resourceState]) => {
      const resourceType = resourceState.metadata?.resourceType as string | undefined;
      return (
        logicalId.startsWith('databases.') &&
        !desiredLogicalIds.has(logicalId) &&
        resourceType === 'TENCENT_ES_SERVERLESS'
      );
    })
    .map(([logicalId, resourceState]) => planEsDeletion(logicalId, resourceState.definition));

  return { items: [...databaseItems, ...deletionItems] };
};
