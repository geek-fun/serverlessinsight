import RdsClient from '@alicloud/rds20140815';
import { Context } from '../../types';
import { logger } from '../logger';

export type RdsConfig = {
  DBInstanceDescription: string;
  Engine: string;
  EngineVersion: string;
  DBInstanceClass: string;
  DBInstanceStorage: number;
  Category: string;
  DBInstanceStorageType: string;
  BurstingEnabled?: boolean;
  ServerlessConfig?: {
    MinCapacity: number;
    MaxCapacity: number;
    AutoPause: boolean;
    SwitchForce: boolean;
  };
  MasterUsername?: string;
  MasterUserPassword?: string;
  MasterUserType?: string;
  MultiAZ?: boolean;
  SecurityIPList?: string;
  ConnectionStringType?: string;
  DBInstanceNetType?: string;
  VpcId?: string;
  VSwitchId?: string;
  ZoneId?: string;
};

export type RdsInfo = {
  DBInstanceId?: string;
  DBInstanceDescription?: string;
  Engine?: string;
  EngineVersion?: string;
  DBInstanceClass?: string;
  DBInstanceStorage?: number;
  Category?: string;
  DBInstanceStorageType?: string;
  ServerlessConfig?: {
    MinCapacity?: number;
    MaxCapacity?: number;
    AutoPause?: boolean;
    SwitchForce?: boolean;
  };
  MasterUsername?: string;
  VpcId?: string;
  VSwitchId?: string;
  ZoneId?: string;
  ConnectionString?: string;
  Port?: string;
  DBInstanceStatus?: string;
  CreateTime?: string;
  RegionId?: string;
  SecurityIPList?: string;
  MultiAZ?: boolean;
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
      throw new Error(`RDS instance not found: ${instanceId}`);
    }

    if (instance.DBInstanceStatus === 'Running') {
      logger.info(`RDS instance ready: ${instanceId}`);
      return;
    }

    if (instance.DBInstanceStatus === 'Deleted' || instance.DBInstanceStatus === 'DeleteFailed') {
      throw new Error(`RDS instance in error state: ${instance.DBInstanceStatus}`);
    }

    logger.info(`Waiting for RDS instance ${instanceId}, status: ${instance.DBInstanceStatus}`);
    await new Promise((resolve) => setTimeout(resolve, 10000));
    attempts++;
  }

  throw new Error(`Timeout waiting for RDS instance to be ready: ${instanceId}`);
};

export const createRdsOperations = (rdsClient: RdsClient, context: Context) => {
  const operations = {
    createInstance: async (config: RdsConfig): Promise<string> => {
      const params = {
        RegionId: context.region,
        Engine: config.Engine,
        EngineVersion: config.EngineVersion,
        DBInstanceClass: config.DBInstanceClass,
        DBInstanceStorage: config.DBInstanceStorage,
        Category: config.Category,
        DBInstanceStorageType: config.DBInstanceStorageType,
        DBInstanceDescription: config.DBInstanceDescription,
        PayType: 'Serverless',
        SecurityIPList: config.SecurityIPList || '0.0.0.0/0',
        VpcId: config.VpcId,
        VSwitchId: config.VSwitchId,
        ZoneId: config.ZoneId,
        MasterUsername: config.MasterUsername,
        MasterUserPassword: config.MasterUserPassword,
        MasterUserType: config.MasterUserType || 'Super',
        ServerlessConfig: config.ServerlessConfig
          ? {
              MinCapacity: config.ServerlessConfig.MinCapacity,
              MaxCapacity: config.ServerlessConfig.MaxCapacity,
              AutoPause: config.ServerlessConfig.AutoPause,
              SwitchForce: config.ServerlessConfig.SwitchForce,
            }
          : undefined,
        BurstingEnabled: config.BurstingEnabled,
      };

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await rdsClient.createDBInstance(params as any);
        logger.info('RDS instance creation initiated');

        if (!response.body?.DBInstanceId) {
          throw new Error('No RDS instance ID returned');
        }

        const instanceId = response.body.DBInstanceId;

        // Wait for instance to be ready
        await waitForRdsInstanceReady(operations.getInstance, instanceId);

        return instanceId;
      } catch (error) {
        logger.error(`RDS instance creation failed: ${error}`);
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
          DBInstanceId: instance.DBInstanceId,
          DBInstanceDescription: instance.DBInstanceDescription,
          Engine: instance.Engine,
          EngineVersion: instance.EngineVersion,
          DBInstanceClass: instance.DBInstanceClass,
          DBInstanceStorage: instance.DBInstanceStorage,
          Category: instance.Category,
          DBInstanceStorageType: instance.DBInstanceStorageType,
          ServerlessConfig: instance.ServerlessConfig
            ? {
                MinCapacity: instance.ServerlessConfig.MinCapacity,
                MaxCapacity: instance.ServerlessConfig.MaxCapacity,
                AutoPause: instance.ServerlessConfig.AutoPause,
                SwitchForce: instance.ServerlessConfig.SwitchForce,
              }
            : undefined,
          MasterUsername: instance.MasterUsername,
          VpcId: instance.VpcId,
          VSwitchId: instance.VSwitchId,
          ZoneId: instance.ZoneId,
          ConnectionString: instance.ConnectionString,
          Port: instance.Port,
          DBInstanceStatus: instance.DBInstanceStatus,
          CreateTime: instance.CreateTime,
          RegionId: instance.RegionId,
          SecurityIPList: instance.SecurityIPList,
          MultiAZ: instance.MultiAZ === 'true',
        };
      } catch (error) {
        logger.error(`Failed to get RDS instance: ${error}`);
        return null;
      }
    },

    updateInstance: async (instanceId: string, config: RdsConfig): Promise<void> => {
      try {
        // Update serverless configuration
        if (config.ServerlessConfig) {
          const serverlessParams = {
            DBInstanceId: instanceId,
            ServerlessConfig: {
              MinCapacity: config.ServerlessConfig.MinCapacity,
              MaxCapacity: config.ServerlessConfig.MaxCapacity,
              AutoPause: config.ServerlessConfig.AutoPause,
              SwitchForce: config.ServerlessConfig.SwitchForce,
            },
          };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await rdsClient.modifyDBInstanceSpec(serverlessParams as any);
        }

        // Update security IP list if provided
        if (config.SecurityIPList) {
          const securityParams = {
            DBInstanceId: instanceId,
            SecurityIPList: config.SecurityIPList,
          };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await rdsClient.modifySecurityIps(securityParams as any);
        }

        logger.info(`RDS instance updated: ${instanceId}`);

        // Wait for instance to be ready
        await waitForRdsInstanceReady(operations.getInstance, instanceId);
      } catch (error) {
        logger.error(`RDS instance update failed: ${error}`);
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
        logger.info(`RDS instance deletion initiated: ${instanceId}`);

        // Wait for instance to be deleted
        const maxAttempts = 60;
        let attempts = 0;

        while (attempts < maxAttempts) {
          const instance = await operations.getInstance(instanceId);

          if (!instance) {
            logger.info(`RDS instance deleted: ${instanceId}`);
            return;
          }

          logger.info(`Waiting for RDS instance deletion: ${instanceId}`);
          await new Promise((resolve) => setTimeout(resolve, 10000));
          attempts++;
        }

        throw new Error(`Timeout waiting for RDS instance deletion: ${instanceId}`);
      } catch (error) {
        // If instance is not found, consider it deleted
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          error.code === 'InvalidDBInstanceId.NotFound'
        ) {
          logger.info(`RDS instance already deleted: ${instanceId}`);
          return;
        }
        logger.error(`RDS instance deletion failed: ${error}`);
        throw error;
      }
    },
  };

  return operations;
};
