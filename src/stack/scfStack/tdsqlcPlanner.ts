import { Context, DatabaseDomain, DatabaseEnum, Plan, PlanItem, StateFile } from '../../types';
import { getTdsqlcCluster } from './tdsqlcProvider';
import { computeDatabaseConfigHash, databaseToTdsqlcConfig } from './tdsqlcTypes';
import { getAllResources, getResource } from '../../common/stateManager';

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
      if (resourceState.type === 'TDSQL_C_SERVERLESS') {
        items.push({
          logicalId,
          action: 'delete',
          resourceType: 'TDSQL_C_SERVERLESS',
          changes: {
            before: { physicalId: resourceState.physicalId },
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
    const desiredConfigHash = computeDatabaseConfigHash(config);

    if (!currentState) {
      // Resource doesn't exist in state - needs to be created
      items.push({
        logicalId,
        action: 'create',
        resourceType: 'TDSQL_C_SERVERLESS',
        changes: {
          after: {
            name: database.name,
            version: database.version,
            minCpu: database.cu.min,
            maxCpu: database.cu.max,
            minStorage: database.storage.min,
            maxStorage: database.storage.max,
            vpcId: database.network.vpcId,
            subnetId: database.network.subnetId,
          },
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
            resourceType: 'TDSQL_C_SERVERLESS',
            changes: {
              after: {
                name: database.name,
                version: database.version,
                minCpu: database.cu.min,
                maxCpu: database.cu.max,
                minStorage: database.storage.min,
                maxStorage: database.storage.max,
                vpcId: database.network.vpcId,
                subnetId: database.network.subnetId,
              },
            },
          });
        } else if (currentState.configHash !== desiredConfigHash) {
          // Configuration has changed
          items.push({
            logicalId,
            action: 'update',
            resourceType: 'TDSQL_C_SERVERLESS',
            changes: {
              before: {
                configHash: currentState.configHash,
              },
              after: {
                name: database.name,
                version: database.version,
                minCpu: database.cu.min,
                maxCpu: database.cu.max,
                minStorage: database.storage.min,
                maxStorage: database.storage.max,
                vpcId: database.network.vpcId,
                subnetId: database.network.subnetId,
                configHash: desiredConfigHash,
              },
            },
          });
        } else {
          // No changes needed
          items.push({
            logicalId,
            action: 'noop',
            resourceType: 'TDSQL_C_SERVERLESS',
          });
        }
      } catch {
        // If we can't read the remote resource, plan for recreation
        items.push({
          logicalId,
          action: 'create',
          resourceType: 'TDSQL_C_SERVERLESS',
          changes: {
            after: {
              name: database.name,
              version: database.version,
              minCpu: database.cu.min,
              maxCpu: database.cu.max,
              minStorage: database.storage.min,
              maxStorage: database.storage.max,
              vpcId: database.network.vpcId,
              subnetId: database.network.subnetId,
            },
          },
        });
      }
    }
  }

  // Check for resources in state that are not in desired state (need deletion)
  const allStates = getAllResources(state);
  for (const [logicalId, resourceState] of Object.entries(allStates)) {
    if (resourceState.type === 'TDSQL_C_SERVERLESS' && !desiredLogicalIds.has(logicalId)) {
      items.push({
        logicalId,
        action: 'delete',
        resourceType: 'TDSQL_C_SERVERLESS',
        changes: {
          before: { physicalId: resourceState.physicalId },
        },
      });
    }
  }

  return { items };
};
