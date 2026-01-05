import {
  Context,
  DatabaseDomain,
  DatabaseEnum,
  Plan,
  PlanItem,
  StateFile,
  ResourceAttributes,
} from '../../types';
import { createAliyunClient } from '../../common/aliyunClient';
import { databaseToRdsConfig, extractRdsDefinition } from './rdsTypes';
import { databaseToEsConfig, extractEsDefinition } from './esServerlessTypes';
import { getAllResources, getResource } from '../../common/stateManager';
import { attributesEqual } from '../../common/hashUtils';

const planDatabaseDeletion = (
  logicalId: string,
  definition: ResourceAttributes,
  resourceType: string,
): PlanItem => ({
  logicalId,
  action: 'delete',
  resourceType,
  changes: { before: definition },
});

const getResourceType = (database: DatabaseDomain): string => {
  if (database.type === DatabaseEnum.ELASTICSEARCH_SERVERLESS) {
    return 'ALIYUN_ES_SERVERLESS';
  } else if (
    [
      DatabaseEnum.RDS_MYSQL_SERVERLESS,
      DatabaseEnum.RDS_PGSQL_SERVERLESS,
      DatabaseEnum.RDS_MSSQL_SERVERLESS,
    ].includes(database.type)
  ) {
    return 'ALIYUN_RDS_SERVERLESS';
  }
  throw new Error(`Unsupported database type: ${database.type}`);
};

const getDesiredDefinition = (database: DatabaseDomain): ResourceAttributes => {
  if (database.type === DatabaseEnum.ELASTICSEARCH_SERVERLESS) {
    const config = databaseToEsConfig(database);
    return extractEsDefinition(config);
  } else if (
    [
      DatabaseEnum.RDS_MYSQL_SERVERLESS,
      DatabaseEnum.RDS_PGSQL_SERVERLESS,
      DatabaseEnum.RDS_MSSQL_SERVERLESS,
    ].includes(database.type)
  ) {
    const config = databaseToRdsConfig(database);
    return extractRdsDefinition(config);
  }
  throw new Error(`Unsupported database type: ${database.type}`);
};

export const generateDatabasePlan = async (
  context: Context,
  state: StateFile,
  databases: Array<DatabaseDomain> | undefined,
): Promise<Plan> => {
  // Filter databases for Aliyun RDS and ES Serverless
  const aliyunDatabases = databases?.filter(
    (db) =>
      db.type === DatabaseEnum.ELASTICSEARCH_SERVERLESS ||
      db.type === DatabaseEnum.RDS_MYSQL_SERVERLESS ||
      db.type === DatabaseEnum.RDS_PGSQL_SERVERLESS ||
      db.type === DatabaseEnum.RDS_MSSQL_SERVERLESS,
  );

  if (!aliyunDatabases || aliyunDatabases.length === 0) {
    const allStates = getAllResources(state);
    const items = Object.entries(allStates)
      .filter(([logicalId, resourceState]) => {
        const resourceType = resourceState.metadata?.resourceType as string | undefined;
        return (
          logicalId.startsWith('databases.') &&
          (resourceType === 'ALIYUN_RDS_SERVERLESS' || resourceType === 'ALIYUN_ES_SERVERLESS')
        );
      })
      .map(([logicalId, resourceState]) =>
        planDatabaseDeletion(
          logicalId,
          resourceState.definition,
          (resourceState.metadata?.resourceType as string) || 'ALIYUN_RDS_SERVERLESS',
        ),
      );
    return { items };
  }

  const desiredLogicalIds = new Set(aliyunDatabases.map((db) => `databases.${db.key}`));

  const client = createAliyunClient(context);

  const databaseItems = await Promise.all(
    aliyunDatabases.map(async (database): Promise<PlanItem> => {
      const logicalId = `databases.${database.key}`;
      const currentState = getResource(state, logicalId);
      const resourceType = getResourceType(database);
      const desiredDefinition = getDesiredDefinition(database);

      if (!currentState) {
        return {
          logicalId,
          action: 'create',
          resourceType,
          changes: { after: desiredDefinition },
        };
      }

      const instanceId =
        (currentState.metadata?.instanceId as string | undefined) || currentState.instances?.[0]?.id;

      try {
        let remoteInstance: any = null;

        if (resourceType === 'ALIYUN_ES_SERVERLESS') {
          remoteInstance = instanceId ? await client.es.getApp(instanceId) : null;
        } else if (resourceType === 'ALIYUN_RDS_SERVERLESS') {
          remoteInstance = instanceId ? await client.rds.getInstance(instanceId) : null;
        }

        if (!remoteInstance) {
          return {
            logicalId,
            action: 'create',
            resourceType,
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
            resourceType,
            changes: { before: currentDefinition, after: desiredDefinition },
            drifted: true,
          };
        }

        return { logicalId, action: 'noop', resourceType };
      } catch {
        return {
          logicalId,
          action: 'create',
          resourceType,
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
        (resourceType === 'ALIYUN_RDS_SERVERLESS' || resourceType === 'ALIYUN_ES_SERVERLESS')
      );
    })
    .map(([logicalId, resourceState]) =>
      planDatabaseDeletion(
        logicalId,
        resourceState.definition,
        (resourceState.metadata?.resourceType as string) || 'ALIYUN_RDS_SERVERLESS',
      ),
    );

  return { items: [...databaseItems, ...deletionItems] };
};
