import { Context, DatabaseDomain, DatabaseEnum, Plan, PlanItem, StateFile } from '../../types';
import { getTdsqlcCluster } from './tdsqlcProvider';
import { databaseToTdsqlcConfig, extractTdsqlcDefinition } from './tdsqlcTypes';
import { getAllResources, getResource } from '../../common/stateManager';
import { attributesEqual } from '../../common/hashUtils';

export const generateDatabasePlan = async (
  context: Context,
  state: StateFile,
  databases: Array<DatabaseDomain> | undefined,
): Promise<Plan> => {
  const items: Array<PlanItem> = [];

  // Filter only TDSQL-C databases
  const tdsqlcDatabases = databases?.filter((db) => db.type === DatabaseEnum.TDSQL_C_SERVERLESS);

  if (!tdsqlcDatabases || tdsqlcDatabases.length === 0) {
    // Handle deletions for databases removed from YAML
    const allStates = getAllResources(state);
    for (const [logicalId, resourceState] of Object.entries(allStates)) {
      if (logicalId.startsWith('databases.')) {
        items.push({
          logicalId,
          action: 'delete',
          resourceType: 'TDSQL_C_SERVERLESS',
          changes: {
            before: resourceState.definition,
          },
        });
      }
    }
    return { items };
  }

  // Track which logical IDs are in the desired state
  const desiredLogicalIds = new Set<string>();

  for (const database of tdsqlcDatabases) {
    const logicalId = `databases.${database.key}`;
    desiredLogicalIds.add(logicalId);

    const currentState = getResource(state, logicalId);
    const config = databaseToTdsqlcConfig(database);
    const desiredDefinition = extractTdsqlcDefinition(config);

    if (!currentState) {
      // Resource doesn't exist in state - needs to be created
      items.push({
        logicalId,
        action: 'create',
        resourceType: 'TDSQL_C_SERVERLESS',
        changes: {
          after: desiredDefinition,
        },
      });
    } else {
      // Resource exists - check if it needs updating
      // Extract clusterId from metadata or instances
      const clusterId =
        (currentState.metadata?.clusterId as string | undefined) || currentState.instances?.[0]?.id;
      try {
        const remoteCluster = clusterId ? await getTdsqlcCluster(context, clusterId) : null;

        if (!remoteCluster) {
          // Resource in state but not in cloud - needs recreation
          items.push({
            logicalId,
            action: 'create',
            resourceType: 'TDSQL_C_SERVERLESS',
            changes: {
              before: currentState.definition,
              after: desiredDefinition,
            },
            drifted: true,
          });
        } else {
          // Compare definition for drift detection
          const currentDefinition = currentState.definition || {};
          const definitionChanged = !attributesEqual(currentDefinition, desiredDefinition);

          if (definitionChanged) {
            // Configuration has changed
            items.push({
              logicalId,
              action: 'update',
              resourceType: 'TDSQL_C_SERVERLESS',
              changes: {
                before: currentDefinition,
                after: desiredDefinition,
              },
              drifted: true,
            });
          } else {
            // No changes needed
            items.push({
              logicalId,
              action: 'noop',
              resourceType: 'TDSQL_C_SERVERLESS',
            });
          }
        }
      } catch {
        // If we can't read the remote resource, plan for recreation
        items.push({
          logicalId,
          action: 'create',
          resourceType: 'TDSQL_C_SERVERLESS',
          changes: {
            before: currentState.definition,
            after: desiredDefinition,
          },
        });
      }
    }
  }

  // Check for resources in state that are not in desired state (need deletion)
  const allStates = getAllResources(state);
  for (const [logicalId, resourceState] of Object.entries(allStates)) {
    if (logicalId.startsWith('databases.') && !desiredLogicalIds.has(logicalId)) {
      items.push({
        logicalId,
        action: 'delete',
        resourceType: 'TDSQL_C_SERVERLESS',
        changes: {
          before: resourceState.definition,
        },
      });
    }
  }

  return { items };
};
