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
import { databaseToTencentEsConfig, extractTencentEsDefinition } from './esServerlessTypes';
import { getAllResources, getResource } from '../../common/stateManager';
import { attributesEqual } from '../../common/hashUtils';
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

      if (!currentState || currentState.status === 'tainted') {
        // No usable local state: probe the provider before planning create.
        // If a same-named space already exists WITHOUT our ownership tag it may
        // belong to another project — fail fast in the plan instead of letting
        // the executor discover it mid-deploy.
        const client = createTencentClient(context);
        const remoteSpace = await cachedRefreshRead(
          context,
          `es.getSpaceByName:${config.SpaceName}`,
          () => client.es.getSpaceByName(config.SpaceName),
        );
        if (remoteSpace && !isOwnedByStack(context, logicalId, remoteSpace.Tags)) {
          throw new Error(
            `ES space ${config.SpaceName} already exists in provider but is not owned by this stack (missing ${OWNERSHIP_TAG_KEY} tag). Refusing to create — resolve manually.`,
          );
        }

        return {
          logicalId,
          action: 'create',
          resourceType: 'TENCENT_ES_SERVERLESS',
          changes: { after: desiredDefinition },
        };
      }

      const spaceId =
        (currentState.metadata?.spaceId as string | undefined) || currentState.instances?.[0]?.id;

      try {
        const client = createTencentClient(context);
        const remoteSpace = spaceId
          ? await cachedRefreshRead(context, `es.getSpace:${spaceId}`, () =>
              client.es.getSpace(spaceId),
            )
          : null;

        if (!remoteSpace) {
          return {
            logicalId,
            action: 'create',
            resourceType: 'TENCENT_ES_SERVERLESS',
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
            resourceType: 'TENCENT_ES_SERVERLESS',
            changes: { before: currentDefinition, after: desiredDefinition },
            drifted: true,
          };
        }

        return { logicalId, action: 'noop', resourceType: 'TENCENT_ES_SERVERLESS' };
      } catch {
        return {
          logicalId,
          action: 'create',
          resourceType: 'TENCENT_ES_SERVERLESS',
          changes: { before: currentState.definition, after: desiredDefinition },
        };
      }
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
