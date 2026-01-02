import {
  Context,
  DatabaseDomain,
  DatabaseEnum,
  Plan,
  PlanItem,
  StateFile,
  ResourceTypeEnum,
} from '../../types';
import { getTdsqlcCluster } from './tdsqlcProvider';
import { databaseToTdsqlcConfig, extractTdsqlcAttributes } from './tdsqlcTypes';
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
      if (resourceState.type === ResourceTypeEnum.TDSQL_C_SERVERLESS) {
        items.push({
          logicalId,
          action: 'delete',
          resourceType: ResourceTypeEnum.TDSQL_C_SERVERLESS,
          changes: {
            before: { physicalId: resourceState.physicalId, ...resourceState.attributes },
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
    const desiredAttributes = extractTdsqlcAttributes(config);

    if (!currentState) {
      // Resource doesn't exist in state - needs to be created
      items.push({
        logicalId,
        action: 'create',
        resourceType: ResourceTypeEnum.TDSQL_C_SERVERLESS,
        changes: {
          after: desiredAttributes,
        },
      });
    } else {
      // Resource exists - check if it needs updating
      try {
        const remoteCluster = await getTdsqlcCluster(context, currentState.physicalId);

        if (!remoteCluster) {
          // Resource in state but not in cloud - needs recreation
          items.push({
            logicalId,
            action: 'create',
            resourceType: ResourceTypeEnum.TDSQL_C_SERVERLESS,
            changes: {
              before: currentState.attributes,
              after: desiredAttributes,
            },
            drifted: true,
          });
        } else {
          // Compare all attributes for drift detection
          const currentAttributes = currentState.attributes || {};
          const attributesChanged = !attributesEqual(currentAttributes, desiredAttributes);

          if (attributesChanged) {
            // Configuration has changed
            items.push({
              logicalId,
              action: 'update',
              resourceType: ResourceTypeEnum.TDSQL_C_SERVERLESS,
              changes: {
                before: currentAttributes,
                after: desiredAttributes,
              },
              drifted: true,
            });
          } else {
            // No changes needed
            items.push({
              logicalId,
              action: 'noop',
              resourceType: ResourceTypeEnum.TDSQL_C_SERVERLESS,
            });
          }
        }
      } catch {
        // If we can't read the remote resource, plan for recreation
        items.push({
          logicalId,
          action: 'create',
          resourceType: ResourceTypeEnum.TDSQL_C_SERVERLESS,
          changes: {
            before: currentState.attributes,
            after: desiredAttributes,
          },
        });
      }
    }
  }

  // Check for resources in state that are not in desired state (need deletion)
  const allStates = getAllResources(state);
  for (const [logicalId, resourceState] of Object.entries(allStates)) {
    if (
      resourceState.type === ResourceTypeEnum.TDSQL_C_SERVERLESS &&
      !desiredLogicalIds.has(logicalId)
    ) {
      items.push({
        logicalId,
        action: 'delete',
        resourceType: ResourceTypeEnum.TDSQL_C_SERVERLESS,
        changes: {
          before: { physicalId: resourceState.physicalId, ...resourceState.attributes },
        },
      });
    }
  }

  return { items };
};
