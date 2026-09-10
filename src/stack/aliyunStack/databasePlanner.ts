import {
  Context,
  DatabaseDomain,
  DatabaseEnum,
  Plan,
  PlanItem,
  StateFile,
  ResourceAttributes,
} from '../../types';
import { lang } from '../../lang';
import { createAliyunClient } from '../../common/aliyunClient';
import { cachedRefreshRead } from '../../common/refreshCache';
import { PLAN_READ_CONCURRENCY, mapWithConcurrency } from '../../common/concurrency';
import { databaseToRdsConfig, extractRdsDefinition, cloudRdsToDefinition } from './rdsTypes';
import { databaseToEsConfig, extractEsDefinition, cloudEsToDefinition } from './esServerlessTypes';
import { getAllResources, getResource } from '../../common/stateManager';
import { planRefreshedResource } from '../../common/refreshPlanner';
import { OWNERSHIP_TAG_KEY, isOwnedByStack } from '../ownershipTag';

const toOwnershipTagShape = (
  tags: Array<{ key?: string; value?: string }> | undefined,
): Array<{ Key?: string; Value?: string }> | undefined =>
  tags?.map((t) => ({ Key: t.key, Value: t.value }));

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

  const databaseItems = await mapWithConcurrency(
    aliyunDatabases,
    PLAN_READ_CONCURRENCY,
    async (database): Promise<PlanItem> => {
      const logicalId = `databases.${database.key}`;
      const currentState = getResource(state, logicalId);
      const resourceType = getResourceType(database);
      const desiredDefinition = getDesiredDefinition(database);

      const instanceId =
        (currentState?.metadata?.instanceId as string | undefined) ||
        currentState?.instances?.[0]?.id;
      const isEs = resourceType === 'ALIYUN_ES_SERVERLESS';

      return planRefreshedResource({
        logicalId,
        resourceType,
        currentState,
        desiredDefinition,
        probeRead: () =>
          isEs
            ? cachedRefreshRead(context, `es.getApp:${database.name}`, () =>
                client.es.getApp(database.name),
              )
            : cachedRefreshRead(context, `rds.getInstanceByName:${database.name}`, () =>
                client.rds.getInstanceByName(database.name),
              ),
        read: () =>
          !instanceId
            ? Promise.resolve(null)
            : isEs
              ? cachedRefreshRead(context, `es.getApp:${instanceId}`, () =>
                  client.es.getApp(instanceId),
                )
              : cachedRefreshRead(context, `rds.getInstance:${instanceId}`, () =>
                  client.rds.getInstance(instanceId),
                ),
        isOwned: (remote) => isOwnedByStack(context, logicalId, toOwnershipTagShape(remote.tags)),
        foreignError: () =>
          new Error(
            lang.__('RESOURCE_EXISTS_NOT_OWNED', {
              resourceType,
              resourceName: database.name,
              tagKey: OWNERSHIP_TAG_KEY,
            }),
          ),
        cloudToDefinition: (remote) =>
          isEs ? cloudEsToDefinition(remote) : cloudRdsToDefinition(remote),
        refresh: context.refresh,
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
