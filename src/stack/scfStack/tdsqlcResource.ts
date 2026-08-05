import {
  Context,
  DatabaseDomain,
  PartialResourceError,
  ResourceState,
  StateFile,
} from '../../types';
import { createTencentClient } from '../../common/tencentClient';
import {
  databaseToTdsqlcConfig,
  extractTdsqlcDefinition,
  tdsqlcTagsToOwnershipTags,
  TdsqlcClusterInfo,
} from './tdsqlcTypes';
import { setResource, removeResource } from '../../common/stateManager';
import { buildSid } from '../../common';
import { logger } from '../../common/logger';
import { lang } from '../../lang';
import { OWNERSHIP_TAG_KEY, buildOwnershipTagValue, isOwnedByStack } from '../ownershipTag';
import { isResourceAlreadyExistsError } from '../alreadyExists';

const buildTdsqlcInstanceFromProvider = (info: TdsqlcClusterInfo, sid: string) => {
  return {
    sid,
    id: info.ClusterId,
    clusterId: info.ClusterId,
    clusterName: info.ClusterName,
    region: info.Region,
    zone: info.Zone ?? null,
    physicalZone: info.PhysicalZone ?? null,
    dbType: info.DbType,
    dbVersion: info.DbVersion,
    dbMode: info.DbMode ?? null,
    status: info.Status,
    statusDesc: info.StatusDesc ?? null,
    serverlessStatus: info.ServerlessStatus ?? null,
    vpcId: info.VpcId ?? null,
    vpcName: info.VpcName ?? null,
    subnetId: info.SubnetId ?? null,
    subnetName: info.SubnetName ?? null,
    charset: info.Charset ?? null,
    vip: info.Vip ?? null,
    vport: info.Vport ?? null,
    wanDomain: info.WanDomain ?? null,
    wanIP: info.WanIP ?? null,
    wanPort: info.WanPort ?? null,
    wanStatus: info.WanStatus ?? null,
    minCpu: info.MinCpu ?? null,
    maxCpu: info.MaxCpu ?? null,
    minStorageSize: info.MinStorageSize ?? null,
    maxStorageSize: info.MaxStorageSize ?? null,
    storageId: info.StorageId ?? null,
    storage: info.Storage ?? null,
    storageLimit: info.StorageLimit ?? null,
    storagePayMode: info.StoragePayMode ?? null,
    autoPause: info.AutoPause ?? null,
    autoPauseDelay: info.AutoPauseDelay ?? null,
    createTime: info.CreateTime ?? null,
    updateTime: info.UpdateTime ?? null,
    projectId: info.ProjectId ?? null,
    payMode: info.PayMode ?? null,
    periodEndTime: info.PeriodEndTime ?? null,
    autoRenewFlag: info.AutoRenewFlag ?? null,
    instanceCount: info.InstanceCount ?? null,
    processingTask: info.ProcessingTask ?? null,
    supportedFeatures: info.SupportedFeatures ?? [],
    rollbackSupport: info.RollbackSupport ?? null,
    networkType: info.NetworkType ?? null,
    resourcePackageId: info.ResourcePackageId ?? null,
    resourcePackageType: info.ResourcePackageType ?? null,
    resourcePackageState: info.ResourcePackageState ?? null,
    physicalRegion: info.PhysicalRegion ?? null,
    proxyStatus: info.ProxyStatus ?? null,
    rwGroupId: info.RwGroupId ?? null,
    masterZone: info.MasterZone ?? null,
    slaveZones: info.SlaveZones ?? [],
    businessType: info.BusinessType ?? null,
    isFreeze: info.IsFreeze ?? null,
    orderSource: info.OrderSource ?? null,
    ability: info.Ability
      ? {
          isSupportSlaveZone: info.Ability.IsSupportSlaveZone ?? null,
          nonsupportSlaveZoneReason: info.Ability.NonsupportSlaveZoneReason ?? null,
          isSupportRo: info.Ability.IsSupportRo ?? null,
          nonsupportRoReason: info.Ability.NonsupportRoReason ?? null,
        }
      : {},
    resourceTags:
      info.ResourceTags?.map((t) => ({
        tagKey: t.TagKey ?? null,
        tagValue: t.TagValue ?? null,
      })) ?? [],
    cynosVersion: info.CynosVersion ?? null,
    cynosVersionStatus: info.CynosVersionStatus ?? null,
    isLatestVersion: info.IsLatestVersion ?? null,
  };
};

export const createDatabaseResource = async (
  context: Context,
  database: DatabaseDomain,
  state: StateFile,
): Promise<StateFile> => {
  const logicalId = `databases.${database.key}`;
  const config = databaseToTdsqlcConfig(database);
  config.ResourceTags = [
    { TagKey: OWNERSHIP_TAG_KEY, TagValue: buildOwnershipTagValue(context, logicalId) },
  ];

  const client = createTencentClient(context);

  const definition = extractTdsqlcDefinition(config);

  const taintedResourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [],
    lastUpdated: new Date().toISOString(),
    status: 'tainted',
  };

  const stateAfterDependents = setResource(state, logicalId, taintedResourceState);

  try {
    let clusterId: string;
    let clusterInfo: TdsqlcClusterInfo | null = null;

    try {
      clusterId = await client.tdsqlc.createCluster(config);
    } catch (error) {
      if (isResourceAlreadyExistsError(error, ['ResourceInUse'])) {
        // Idempotent adoption: a cluster with this name already exists in the
        // provider. Adopt it ONLY if it carries our ownership tag (proves a
        // previous run of THIS stack created it — e.g. state was reset). An
        // untagged same-named cluster may belong to another project, so it must
        // fail loudly rather than silently taking it over (destroy would then
        // remove a resource that was never ours).
        const probe = await client.tdsqlc.getClusterByName(database.name);
        if (
          probe &&
          isOwnedByStack(context, logicalId, tdsqlcTagsToOwnershipTags(probe.ResourceTags))
        ) {
          logger.info(
            `Cluster ${database.name} exists and carries ownership tag (${OWNERSHIP_TAG_KEY}), adopting idempotently`,
          );
          clusterId = probe.ClusterId;
          clusterInfo = probe;
        } else {
          throw new PartialResourceError(
            stateAfterDependents,
            new Error(
              `Cluster ${database.name} already exists in provider but is not owned by this stack (missing ${OWNERSHIP_TAG_KEY} tag). Refusing to adopt — resolve manually.`,
            ),
          );
        }
      } else {
        throw error;
      }
    }

    // Adopt path already has the probe info; fresh creates refresh via getCluster.
    if (!clusterInfo) {
      clusterInfo = await client.tdsqlc.getCluster(clusterId);
      if (!clusterInfo) {
        throw new Error(`Failed to refresh state for cluster: ${clusterId}`);
      }
    }

    const sid = buildSid('tencent', 'cynosdb', context.stage, clusterId);
    const resourceState: ResourceState = {
      mode: 'managed',
      region: context.region,
      definition,
      instances: [buildTdsqlcInstanceFromProvider(clusterInfo, sid)],
      lastUpdated: new Date().toISOString(),
      metadata: {
        clusterName: database.name,
        clusterId,
        resourceType: 'TDSQL_C_SERVERLESS',
      },
    };

    return setResource(state, logicalId, resourceState);
  } catch (error) {
    if (error instanceof PartialResourceError) {
      throw error;
    }
    throw new PartialResourceError(
      stateAfterDependents,
      error instanceof Error ? error : new Error(String(error)),
    );
  }
};

export const readDatabaseResource = async (context: Context, clusterId: string) => {
  const client = createTencentClient(context);
  return await client.tdsqlc.getCluster(clusterId);
};

export const updateDatabaseResource = async (
  context: Context,
  database: DatabaseDomain,
  clusterId: string,
  state: StateFile,
): Promise<StateFile> => {
  const config = databaseToTdsqlcConfig(database);

  const client = createTencentClient(context);
  await client.tdsqlc.updateCluster(clusterId, config);

  // Refresh state from provider to get all attributes
  const clusterInfo = await client.tdsqlc.getCluster(clusterId);
  if (!clusterInfo) {
    throw new Error(`Failed to refresh state for cluster: ${clusterId}`);
  }

  const definition = extractTdsqlcDefinition(config);
  const sid = buildSid('tencent', 'cynosdb', context.stage, clusterId);
  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [buildTdsqlcInstanceFromProvider(clusterInfo as TdsqlcClusterInfo, sid)],
    lastUpdated: new Date().toISOString(),
    metadata: {
      clusterName: database.name,
      clusterId,
      resourceType: 'TDSQL_C_SERVERLESS',
    },
  };

  const logicalId = `databases.${database.key}`;
  return setResource(state, logicalId, resourceState);
};

export const deleteDatabaseResource = async (
  context: Context,
  clusterId: string,
  logicalId: string,
  state: StateFile,
): Promise<StateFile> => {
  const client = createTencentClient(context);
  try {
    await client.tdsqlc.deleteCluster(clusterId);
  } catch (err) {
    const errorCode = (err as { code?: string })?.code;
    const errorMessage = (err as { message?: string })?.message ?? '';
    if (
      errorCode === 'ResourceNotFound.ClusterNotFound' ||
      errorCode === 'ResourceNotFound' ||
      errorMessage.includes('not found') ||
      errorMessage.includes('NotFound')
    ) {
      logger.warn(
        lang.__('RESOURCE_NOT_FOUND_PROVIDER', {
          resourceType: 'TDSQL-C cluster',
          name: clusterId,
        }),
      );
    } else {
      throw err;
    }
  }
  return removeResource(state, logicalId);
};
