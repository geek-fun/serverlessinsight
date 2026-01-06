import RdsClient from '@alicloud/rds20140815';
import { Context } from '../../types';
import { logger } from '../logger';
import { lang } from '../../lang';

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
};

const waitForRdsInstanceReady = async (
  getInstance: (instanceId: string) => Promise<RdsInfo | null>,
  instanceId: string,
): Promise<void> => {
  const maxAttempts = 60;
  let attempts = 0;

  while (attempts < maxAttempts) {
    const instance = await getInstance(instanceId);

    if (!instance) {
      throw new Error(lang.__('RDS_INSTANCE_NOT_FOUND', { instanceId }));
    }

    if (instance.dbInstanceStatus === RdsInstanceStatus.RUNNING) {
      logger.info(lang.__('RDS_INSTANCE_READY', { instanceId }));
      return;
    }

    if (
      instance.dbInstanceStatus === RdsInstanceStatus.DELETED ||
      instance.dbInstanceStatus === RdsInstanceStatus.DELETE_FAILED
    ) {
      throw new Error(lang.__('RDS_INSTANCE_ERROR_STATE', { status: instance.dbInstanceStatus }));
    }

    logger.info(
      lang.__('RDS_INSTANCE_WAITING', {
        instanceId,
        status: instance.dbInstanceStatus ?? 'unknown',
      }),
    );
    await new Promise((resolve) => setTimeout(resolve, 10000));
    attempts++;
  }

  throw new Error(lang.__('RDS_INSTANCE_TIMEOUT_READY', { instanceId }));
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

        return {
          dbInstanceId: instance.DBInstanceId,
          dbInstanceDescription: instance.DBInstanceDescription,
          engine: instance.Engine,
          engineVersion: instance.EngineVersion,
          dbInstanceClass: instance.DBInstanceClass,
          dbInstanceStorage: instance.DBInstanceStorage,
          category: instance.Category,
          dbInstanceStorageType: instance.DBInstanceStorageType,
          serverlessConfig: instance.ServerlessConfig
            ? {
                minCapacity: instance.ServerlessConfig.MinCapacity,
                maxCapacity: instance.ServerlessConfig.MaxCapacity,
                autoPause: instance.ServerlessConfig.AutoPause,
                switchForce: instance.ServerlessConfig.SwitchForce,
              }
            : undefined,
          masterUsername: instance.MasterUsername,
          vpcId: instance.VpcId,
          vSwitchId: instance.VSwitchId,
          zoneId: instance.ZoneId,
          connectionString: instance.ConnectionString,
          port: instance.Port,
          dbInstanceStatus: instance.DBInstanceStatus,
          createTime: instance.CreateTime,
          regionId: instance.RegionId,
          securityIPList: instance.SecurityIPList,
          multiAZ: instance.MultiAZ === 'true',
        };
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
        const maxAttempts = 60;
        let attempts = 0;

        while (attempts < maxAttempts) {
          const instance = await operations.getInstance(instanceId);

          if (!instance) {
            logger.info(lang.__('RDS_INSTANCE_DELETED', { instanceId }));
            return;
          }

          logger.info(lang.__('RDS_INSTANCE_WAITING_DELETE', { instanceId }));
          await new Promise((resolve) => setTimeout(resolve, 10000));
          attempts++;
        }

        throw new Error(lang.__('RDS_INSTANCE_TIMEOUT_DELETE', { instanceId }));
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
