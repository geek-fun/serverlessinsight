import { DatabaseDomain, DatabaseEnum, DatabaseVersionEnum, ResourceAttributes } from '../../types';
import { RdsConfig, RdsInfo } from '../../common/aliyunClient/rdsOperations';

// Map database versions to RDS engine versions
const rdsEngineMap = new Map<
  string,
  {
    engine: string;
    version: string;
    category: string;
    dbInstanceClass: string;
    quota: { minCapacity: number; maxCapacity: number; ha: boolean };
    storage: {
      type: 'general_essd' | 'cloud_essd';
      bursting: boolean;
    };
  }
>([
  [
    `${DatabaseEnum.RDS_MYSQL_SERVERLESS}-${DatabaseVersionEnum['MYSQL_5.7']}`,
    {
      engine: 'MySQL',
      version: '5.7',
      category: 'serverless_basic',
      dbInstanceClass: 'mysql.n2.serverless.1c',
      quota: { minCapacity: 0.5, maxCapacity: 32, ha: false },
      storage: { type: 'general_essd', bursting: true },
    },
  ],
  [
    `${DatabaseEnum.RDS_MYSQL_SERVERLESS}-${DatabaseVersionEnum['MYSQL_8.0']}`,
    {
      engine: 'MySQL',
      version: '8.0',
      category: 'serverless_basic',
      dbInstanceClass: 'mysql.n2.serverless.1c',
      quota: { minCapacity: 0.5, maxCapacity: 32, ha: false },
      storage: { type: 'general_essd', bursting: true },
    },
  ],
  [
    `${DatabaseEnum.RDS_MYSQL_SERVERLESS}-${DatabaseVersionEnum['MYSQL_HA_5.7']}`,
    {
      engine: 'MySQL',
      version: '5.7',
      category: 'serverless_standard',
      dbInstanceClass: 'mysql.n2.serverless.2c',
      quota: { minCapacity: 0.5, maxCapacity: 32, ha: true },
      storage: { type: 'general_essd', bursting: true },
    },
  ],
  [
    `${DatabaseEnum.RDS_MYSQL_SERVERLESS}-${DatabaseVersionEnum['MYSQL_HA_8.0']}`,
    {
      engine: 'MySQL',
      version: '8.0',
      category: 'serverless_standard',
      dbInstanceClass: 'mysql.n2.serverless.2c',
      quota: { minCapacity: 0.5, maxCapacity: 32, ha: true },
      storage: { type: 'general_essd', bursting: true },
    },
  ],
  [
    `${DatabaseEnum.RDS_PGSQL_SERVERLESS}-${DatabaseVersionEnum.PGSQL_14}`,
    {
      engine: 'PostgreSQL',
      version: '14.0',
      category: 'serverless_basic',
      dbInstanceClass: 'pg.n2.serverless.1c',
      quota: { minCapacity: 0.5, maxCapacity: 14, ha: false },
      storage: { type: 'general_essd', bursting: true },
    },
  ],
  [
    `${DatabaseEnum.RDS_PGSQL_SERVERLESS}-${DatabaseVersionEnum.PGSQL_15}`,
    {
      engine: 'PostgreSQL',
      version: '15.0',
      category: 'serverless_basic',
      dbInstanceClass: 'pg.n2.serverless.1c',
      quota: { minCapacity: 0.5, maxCapacity: 14, ha: false },
      storage: { type: 'general_essd', bursting: true },
    },
  ],
  [
    `${DatabaseEnum.RDS_PGSQL_SERVERLESS}-${DatabaseVersionEnum.PGSQL_16}`,
    {
      engine: 'PostgreSQL',
      version: '16.0',
      category: 'serverless_basic',
      dbInstanceClass: 'pg.n2.serverless.1c',
      quota: { minCapacity: 0.5, maxCapacity: 14, ha: false },
      storage: { type: 'general_essd', bursting: true },
    },
  ],
  [
    `${DatabaseEnum.RDS_PGSQL_SERVERLESS}-${DatabaseVersionEnum.PGSQL_HA_14}`,
    {
      engine: 'PostgreSQL',
      version: '14.0',
      category: 'serverless_standard',
      dbInstanceClass: 'pg.n2.serverless.2c',
      quota: { minCapacity: 0.5, maxCapacity: 14, ha: true },
      storage: { type: 'general_essd', bursting: true },
    },
  ],
  [
    `${DatabaseEnum.RDS_PGSQL_SERVERLESS}-${DatabaseVersionEnum.PGSQL_HA_15}`,
    {
      engine: 'PostgreSQL',
      version: '15.0',
      category: 'serverless_standard',
      dbInstanceClass: 'pg.n2.serverless.2c',
      quota: { minCapacity: 0.5, maxCapacity: 14, ha: true },
      storage: { type: 'general_essd', bursting: true },
    },
  ],
  [
    `${DatabaseEnum.RDS_PGSQL_SERVERLESS}-${DatabaseVersionEnum.PGSQL_HA_16}`,
    {
      engine: 'PostgreSQL',
      version: '16.0',
      category: 'serverless_standard',
      dbInstanceClass: 'pg.n2.serverless.2c',
      quota: { minCapacity: 0.5, maxCapacity: 14, ha: true },
      storage: { type: 'general_essd', bursting: true },
    },
  ],
  [
    `${DatabaseEnum.RDS_MSSQL_SERVERLESS}-${DatabaseVersionEnum.MSSQL_HA_2016}`,
    {
      engine: 'SQLServer',
      version: '2016_std_sl',
      category: 'serverless_ha',
      dbInstanceClass: 'mssql.mem2.serverless.s2',
      quota: { minCapacity: 2, maxCapacity: 8, ha: true },
      storage: { type: 'cloud_essd', bursting: false },
    },
  ],
  [
    `${DatabaseEnum.RDS_MSSQL_SERVERLESS}-${DatabaseVersionEnum.MSSQL_HA_2017}`,
    {
      engine: 'SQLServer',
      version: '2017_std_sl',
      category: 'serverless_ha',
      dbInstanceClass: 'mssql.mem2.serverless.s2',
      quota: { minCapacity: 2, maxCapacity: 8, ha: true },
      storage: { type: 'cloud_essd', bursting: false },
    },
  ],
  [
    `${DatabaseEnum.RDS_MSSQL_SERVERLESS}-${DatabaseVersionEnum.MSSQL_HA_2019}`,
    {
      engine: 'SQLServer',
      version: '2019_std_sl',
      category: 'serverless_ha',
      dbInstanceClass: 'mssql.mem2.serverless.s2',
      quota: { minCapacity: 2, maxCapacity: 8, ha: true },
      storage: { type: 'cloud_essd', bursting: false },
    },
  ],
]);

export const databaseToRdsConfig = (database: DatabaseDomain): RdsConfig => {
  const engineConfig = rdsEngineMap.get(`${database.type}-${database.version}`);

  if (!engineConfig) {
    throw new Error(`Unsupported RDS database type/version: ${database.type}-${database.version}`);
  }

  const { engine, version, category, dbInstanceClass, quota, storage } = engineConfig;

  const config: RdsConfig = {
    DBInstanceDescription: database.name,
    Engine: engine,
    EngineVersion: version,
    DBInstanceClass: dbInstanceClass,
    DBInstanceStorage: database.storage.min,
    Category: category,
    DBInstanceStorageType: storage.type,
    BurstingEnabled: storage.bursting,
    ServerlessConfig: {
      MinCapacity: database.cu.min === 0 ? quota.minCapacity : database.cu.min + quota.minCapacity,
      MaxCapacity:
        database.cu.max + quota.minCapacity <= quota.maxCapacity
          ? database.cu.max + quota.minCapacity
          : quota.maxCapacity,
      AutoPause: database.cu.min === 0,
      SwitchForce: false,
    },
    MasterUsername: database.security.basicAuth.username,
    MasterUserPassword: database.security.basicAuth.password,
    MasterUserType: 'Super',
    MultiAZ: quota.ha,
    SecurityIPList: database.network.ingressRules.join(','),
    ConnectionStringType: database.network.type === 'PRIVATE' ? 'Inner' : 'Public',
    DBInstanceNetType: database.network.type === 'PRIVATE' ? 'Intranet' : 'Internet',
  };

  // Add VPC configuration if provided
  if (database.network.vpcId) {
    config.VpcId = database.network.vpcId;
  }

  if (database.network.subnetId) {
    config.VSwitchId = database.network.subnetId;
  }

  return config;
};

export const extractRdsDefinition = (config: RdsConfig): ResourceAttributes => {
  return {
    dbInstanceDescription: config.DBInstanceDescription,
    engine: config.Engine,
    engineVersion: config.EngineVersion,
    dbInstanceClass: config.DBInstanceClass,
    dbInstanceStorage: config.DBInstanceStorage,
    category: config.Category,
    dbInstanceStorageType: config.DBInstanceStorageType,
    burstingEnabled: config.BurstingEnabled ?? null,
    serverlessConfig: config.ServerlessConfig
      ? {
          minCapacity: config.ServerlessConfig.MinCapacity,
          maxCapacity: config.ServerlessConfig.MaxCapacity,
          autoPause: config.ServerlessConfig.AutoPause,
          switchForce: config.ServerlessConfig.SwitchForce,
        }
      : null,
    multiAZ: config.MultiAZ ?? null,
    securityIPList: config.SecurityIPList ?? null,
    connectionStringType: config.ConnectionStringType ?? null,
    dbInstanceNetType: config.DBInstanceNetType ?? null,
    vpcId: config.VpcId ?? null,
    vSwitchId: config.VSwitchId ?? null,
  };
};

export { RdsConfig, RdsInfo };
