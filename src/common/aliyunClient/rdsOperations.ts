import RdsClient from '@alicloud/rds20140815';
import { Context } from '../../types';
import { logger } from '../logger';
import { lang } from '../../lang';
import { pollUntil, PollingTimeoutError } from '../polling';

export enum RdsInstanceStatus {
  RUNNING = 'Running',
  CREATING = 'Creating',
  DELETED = 'Deleted',
  DELETE_FAILED = 'DeleteFailed',
  RESTARTING = 'Restarting',
}

export type RdsConfig = {
  dbInstanceDescription: string;
  engine: string;
  engineVersion: string;
  dbInstanceClass: string;
  dbInstanceStorage: number;
  category: string;
  dbInstanceStorageType: string;
  burstingEnabled?: boolean;
  serverlessConfig?: {
    minCapacity: number;
    maxCapacity: number;
    autoPause: boolean;
    switchForce: boolean;
  };
  masterUsername?: string;
  masterUserPassword?: string;
  masterUserType?: string;
  multiAZ?: boolean;
  securityIPList?: string;
  connectionStringType?: string;
  dbInstanceNetType?: string;
  vpcId?: string;
  vSwitchId?: string;
  zoneId?: string;
  tags?: Array<{ key?: string; value?: string }>;
};

export type RdsInfo = {
  dbInstanceId?: string;
  dbInstanceDescription?: string;
  engine?: string;
  engineVersion?: string;
  dbInstanceClass?: string;
  dbInstanceStorage?: number;
  category?: string;
  dbInstanceStorageType?: string;
  serverlessConfig?: {
    minCapacity?: number;
    maxCapacity?: number;
    autoPause?: boolean;
    switchForce?: boolean;
  };
  masterUsername?: string;
  vpcId?: string;
  vSwitchId?: string;
  zoneId?: string;
  connectionString?: string;
  port?: string;
  dbInstanceStatus?: string;
  createTime?: string;
  regionId?: string;
  securityIPList?: string;
  multiAZ?: boolean;
  tags?: Array<{ key?: string; value?: string }>;
  // Maximum-detail fields — retained from DescribeDBInstanceAttribute so state
  // keeps the full cloud resource detail (spec CPU/memory, billing, expiry,
  // maintenance window, capacity limits, resource group, protection, topology).
  dbInstanceCpu?: string;
  dbInstanceMemory?: number;
  payType?: string;
  expireTime?: string;
  maintainTime?: string;
  maxConnections?: number;
  maxIOPS?: number;
  resourceGroupId?: string;
  deletionProtection?: boolean;
  lockMode?: string;
  lockReason?: string;
  connectionMode?: string;
  dbInstanceDiskUsed?: string;
  dbInstanceType?: string;
  instanceNetworkType?: string;
  timeZone?: string;
  currentKernelVersion?: string;
  latestKernelVersion?: string;
  masterZone?: string;
  masterInstanceId?: string;
  slaveZones?: Array<{ zoneId?: string }>;
  readOnlyDBInstanceIds?: string[];
  burstingEnabled?: boolean;
  computeBurstEnabled?: boolean;
};

const waitForRdsInstanceReady = async (
  getInstance: (instanceId: string) => Promise<RdsInfo | null>,
  instanceId: string,
): Promise<void> => {
  try {
    await pollUntil({
      description: `RDS instance ${instanceId} to be ready`,
      fetch: async () => {
        const instance = await getInstance(instanceId);
        if (!instance) {
          throw new Error(lang.__('RDS_INSTANCE_NOT_FOUND', { instanceId }));
        }
        if (
          instance.dbInstanceStatus === RdsInstanceStatus.DELETED ||
          instance.dbInstanceStatus === RdsInstanceStatus.DELETE_FAILED
        ) {
          throw new Error(
            lang.__('RDS_INSTANCE_ERROR_STATE', { status: instance.dbInstanceStatus }),
          );
        }
        return instance;
      },
      isDone: (instance) => instance?.dbInstanceStatus === RdsInstanceStatus.RUNNING,
      intervalMs: 10000,
      maxAttempts: 60,
      onProgress: (instance) => {
        if (instance) {
          logger.info(
            lang.__('RDS_INSTANCE_WAITING', {
              instanceId,
              status: instance.dbInstanceStatus ?? 'unknown',
            }),
          );
        }
      },
    });
    logger.info(lang.__('RDS_INSTANCE_READY', { instanceId }));
  } catch (e) {
    if (e instanceof PollingTimeoutError) {
      throw new Error(lang.__('RDS_INSTANCE_TIMEOUT_READY', { instanceId }), { cause: e });
    }
    throw e;
  }
};

export const createRdsOperations = (rdsClient: RdsClient, context: Context) => {
  const operations = {
    createInstance: async (config: RdsConfig): Promise<string> => {
      const params = {
        RegionId: context.region,
        Engine: config.engine,
        EngineVersion: config.engineVersion,
        DBInstanceClass: config.dbInstanceClass,
        DBInstanceStorage: config.dbInstanceStorage,
        Category: config.category,
        DBInstanceStorageType: config.dbInstanceStorageType,
        DBInstanceDescription: config.dbInstanceDescription,
        PayType: 'Serverless',
        SecurityIPList: config.securityIPList || '0.0.0.0/0',
        VpcId: config.vpcId,
        VSwitchId: config.vSwitchId,
        ZoneId: config.zoneId,
        MasterUsername: config.masterUsername,
        MasterUserPassword: config.masterUserPassword,
        MasterUserType: config.masterUserType || 'Super',
        ServerlessConfig: config.serverlessConfig
          ? {
              MinCapacity: config.serverlessConfig.minCapacity,
              MaxCapacity: config.serverlessConfig.maxCapacity,
              AutoPause: config.serverlessConfig.autoPause,
              SwitchForce: config.serverlessConfig.switchForce,
            }
          : undefined,
        BurstingEnabled: config.burstingEnabled,
        // SDK serializes Tag as Tag.1.Key / Tag.1.Value (ownership tag for idempotent adoption)
        Tag: config.tags,
      };

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await rdsClient.createDBInstance(params as any);
        logger.info(lang.__('RDS_INSTANCE_CREATION_INITIATED'));

        if (!response.body?.DBInstanceId) {
          throw new Error(lang.__('RDS_INSTANCE_NO_ID_RETURNED'));
        }

        const instanceId = response.body.DBInstanceId;

        // Wait for instance to be ready
        await waitForRdsInstanceReady(operations.getInstance, instanceId);

        return instanceId;
      } catch (error) {
        logger.error(lang.__('RDS_INSTANCE_CREATION_FAILED', { error: String(error) }));
        throw error;
      }
    },

    getInstance: async (instanceId: string): Promise<RdsInfo | null> => {
      const params = {
        DBInstanceId: instanceId,
      };

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await rdsClient.describeDBInstanceAttribute(params as any);

        if (
          !response.body?.Items?.DBInstanceAttribute ||
          response.body.Items.DBInstanceAttribute.length === 0
        ) {
          return null;
        }

        const instance = response.body.Items.DBInstanceAttribute[0];

        const info: RdsInfo = {
          dbInstanceId: instance.DBInstanceId,
          dbInstanceDescription: instance.DBInstanceDescription,
          engine: instance.Engine,
          engineVersion: instance.EngineVersion,
          dbInstanceClass: instance.DBInstanceClass,
          dbInstanceStorage: instance.DBInstanceStorage,
          category: instance.Category,
          dbInstanceStorageType: instance.DBInstanceStorageType,
          serverlessConfig: instance.serverlessConfig
            ? {
                // DescribeDBInstanceAttribute returns scaleMin/scaleMax (not
                // MinCapacity/MaxCapacity) — map the actual cloud field names.
                minCapacity: instance.serverlessConfig.scaleMin,
                maxCapacity: instance.serverlessConfig.scaleMax,
                autoPause: instance.serverlessConfig.autoPause,
                switchForce: instance.serverlessConfig.switchForce,
              }
            : undefined,
          masterUsername: instance.MasterUsername,
          vpcId: instance.VpcId,
          vSwitchId: instance.VSwitchId,
          zoneId: instance.ZoneId,
          connectionString: instance.ConnectionString,
          port: instance.Port,
          dbInstanceStatus: instance.DBInstanceStatus,
          createTime: instance.CreateTime ?? instance.CreationTime,
          regionId: instance.RegionId,
          securityIPList: instance.SecurityIPList,
          multiAZ: instance.MultiAZ === 'true',
          // Maximum-detail fields — retain everything DescribeDBInstanceAttribute
          // returns so state keeps the full cloud resource detail.
          dbInstanceCpu: instance.DBInstanceCPU,
          dbInstanceMemory: instance.DBInstanceMemory,
          payType: instance.PayType,
          expireTime: instance.ExpireTime,
          maintainTime: instance.MaintainTime,
          maxConnections: instance.MaxConnections,
          maxIOPS: instance.MaxIOPS,
          resourceGroupId: instance.ResourceGroupId,
          deletionProtection: instance.DeletionProtection,
          lockMode: instance.LockMode,
          lockReason: instance.LockReason,
          connectionMode: instance.ConnectionMode,
          dbInstanceDiskUsed: instance.DBInstanceDiskUsed,
          dbInstanceType: instance.DBInstanceType,
          instanceNetworkType: instance.InstanceNetworkType,
          timeZone: instance.TimeZone,
          currentKernelVersion: instance.CurrentKernelVersion,
          latestKernelVersion: instance.LatestKernelVersion,
          masterZone: instance.MasterZone,
          masterInstanceId: instance.MasterInstanceId,
          slaveZones: (
            instance.SlaveZones?.slaveZone as Array<{ zoneId?: string }> | undefined
          )?.map((z) => ({ zoneId: z.zoneId })),
          readOnlyDBInstanceIds: (
            instance.ReadOnlyDBInstanceIds?.readOnlyDBInstanceId as
              Array<{ DBInstanceId?: string }> | undefined
          )
            ?.map((r) => r.DBInstanceId)
            .filter((id): id is string => !!id),
          burstingEnabled: instance.BurstingEnabled,
          computeBurstEnabled: instance.ComputeBurstEnabled,
        };

        try {
          const tags = await operations.getInstanceTags(instanceId);
          if (tags.length > 0) {
            info.tags = tags;
          }
        } catch {
          // Tags are best-effort; instance detail is still returned without them.
        }

        return info;
      } catch (error) {
        logger.error(lang.__('RDS_INSTANCE_GET_FAILED', { error: String(error) }));
        return null;
      }
    },

    getInstanceTags: async (
      instanceId: string,
    ): Promise<Array<{ key?: string; value?: string }>> => {
      const params = {
        RegionId: context.region,
        ResourceType: 'INSTANCE',
        ResourceId: [instanceId],
      };

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await rdsClient.listTagResources(params as any);
        return (response.body?.tagResources?.tagResource ?? []).map((t) => ({
          key: t.tagKey,
          value: t.tagValue,
        }));
      } catch (error) {
        logger.error(lang.__('RDS_INSTANCE_GET_FAILED', { error: String(error) }));
        return [];
      }
    },

    getInstanceByName: async (name: string): Promise<RdsInfo | null> => {
      const params = {
        RegionId: context.region,
        SearchKey: name,
        PageSize: 100,
      };

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await rdsClient.describeDBInstances(params as any);
        // SearchKey fuzzy-matches DBInstanceId OR DBInstanceDescription, so filter
        // to an exact description match to avoid adopting an unrelated instance.
        const match = (response.body?.items?.DBInstance ?? []).find(
          (i) => i.DBInstanceDescription === name,
        );
        if (!match?.DBInstanceId) {
          return null;
        }

        const instance = await operations.getInstance(match.DBInstanceId);
        if (!instance) {
          return null;
        }

        const tags = await operations.getInstanceTags(match.DBInstanceId);
        return { ...instance, tags };
      } catch (error) {
        logger.error(lang.__('RDS_INSTANCE_GET_FAILED', { error: String(error) }));
        return null;
      }
    },

    updateInstance: async (instanceId: string, config: RdsConfig): Promise<void> => {
      try {
        // Update serverless configuration
        if (config.serverlessConfig) {
          const serverlessParams = {
            DBInstanceId: instanceId,
            ServerlessConfig: {
              MinCapacity: config.serverlessConfig.minCapacity,
              MaxCapacity: config.serverlessConfig.maxCapacity,
              AutoPause: config.serverlessConfig.autoPause,
              SwitchForce: config.serverlessConfig.switchForce,
            },
          };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await rdsClient.modifyDBInstanceSpec(serverlessParams as any);
        }

        // Update security IP list if provided
        if (config.securityIPList) {
          const securityParams = {
            DBInstanceId: instanceId,
            SecurityIPList: config.securityIPList,
          };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await rdsClient.modifySecurityIps(securityParams as any);
        }

        logger.info(lang.__('RDS_INSTANCE_UPDATED', { instanceId }));

        // Wait for instance to be ready
        await waitForRdsInstanceReady(operations.getInstance, instanceId);
      } catch (error) {
        logger.error(lang.__('RDS_INSTANCE_UPDATE_FAILED', { error: String(error) }));
        throw error;
      }
    },

    deleteInstance: async (instanceId: string): Promise<void> => {
      const params = {
        DBInstanceId: instanceId,
      };

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await rdsClient.deleteDBInstance(params as any);
        logger.info(lang.__('RDS_INSTANCE_DELETION_INITIATED', { instanceId }));

        // Wait for instance to be deleted
        try {
          await pollUntil({
            description: `RDS instance ${instanceId} to be deleted`,
            fetch: () => operations.getInstance(instanceId),
            isDone: (instance) => instance === null,
            intervalMs: 10000,
            maxAttempts: 60,
            onProgress: () => logger.info(lang.__('RDS_INSTANCE_WAITING_DELETE', { instanceId })),
          });
        } catch (e) {
          if (e instanceof PollingTimeoutError) {
            throw new Error(lang.__('RDS_INSTANCE_TIMEOUT_DELETE', { instanceId }), { cause: e });
          }
          throw e;
        }
        logger.info(lang.__('RDS_INSTANCE_DELETED', { instanceId }));
      } catch (error) {
        // If instance is not found, consider it deleted
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          error.code === 'InvalidDBInstanceId.NotFound'
        ) {
          logger.info(lang.__('RDS_INSTANCE_DELETED', { instanceId }));
          return;
        }
        logger.error(lang.__('RDS_INSTANCE_DELETE_FAILED', { error: String(error) }));
        throw error;
      }
    },
  };

  return operations;
};
