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
import { databaseToTencentEsConfig, extractTencentEsDefinition } from './esServerlessTypes';
import { getAllResources, getResource } from '../../common/stateManager';
import { attributesEqual } from '../../common/hashUtils';

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

  const databaseItems = await Promise.all(
    esDatabases.map(async (database): Promise<PlanItem> => {
      const logicalId = `databases.${database.key}`;
      const currentState = getResource(state, logicalId);
      const config = databaseToTencentEsConfig(database);
      const desiredDefinition = extractTencentEsDefinition(config);

      if (!currentState) {
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
        const remoteSpace = spaceId ? await client.es.getSpace(spaceId) : null;

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
    }),
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
