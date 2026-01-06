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
    dbInstanceDescription: database.name,
    engine: engine,
    engineVersion: version,
    dbInstanceClass: dbInstanceClass,
    dbInstanceStorage: database.storage.min,
    category: category,
    dbInstanceStorageType: storage.type,
    burstingEnabled: storage.bursting,
    serverlessConfig: {
      minCapacity: database.cu.min === 0 ? quota.minCapacity : database.cu.min + quota.minCapacity,
      maxCapacity:
        database.cu.max + quota.minCapacity <= quota.maxCapacity
          ? database.cu.max + quota.minCapacity
          : quota.maxCapacity,
      autoPause: database.cu.min === 0,
      switchForce: false,
    },
    masterUsername: database.security.basicAuth.username,
    masterUserPassword: database.security.basicAuth.password,
    masterUserType: 'Super',
    multiAZ: quota.ha,
    securityIPList: database.network.ingressRules.join(','),
    connectionStringType: database.network.type === 'PRIVATE' ? 'Inner' : 'Public',
    dbInstanceNetType: database.network.type === 'PRIVATE' ? 'Intranet' : 'Internet',
  };

  // Add VPC configuration if provided
  if (database.network.vpcId) {
    config.vpcId = database.network.vpcId;
  }

  if (database.network.subnetId) {
    config.vSwitchId = database.network.subnetId;
  }

  return config;
};

export const extractRdsDefinition = (config: RdsConfig): ResourceAttributes => {
  return {
    dbInstanceDescription: config.dbInstanceDescription,
    engine: config.engine,
    engineVersion: config.engineVersion,
    dbInstanceClass: config.dbInstanceClass,
    dbInstanceStorage: config.dbInstanceStorage,
    category: config.category,
    dbInstanceStorageType: config.dbInstanceStorageType,
    burstingEnabled: config.burstingEnabled ?? null,
    serverlessConfig: config.serverlessConfig
      ? {
          minCapacity: config.serverlessConfig.minCapacity,
          maxCapacity: config.serverlessConfig.maxCapacity,
          autoPause: config.serverlessConfig.autoPause,
          switchForce: config.serverlessConfig.switchForce,
        }
      : null,
    multiAZ: config.multiAZ ?? null,
    securityIPList: config.securityIPList ?? null,
    connectionStringType: config.connectionStringType ?? null,
    dbInstanceNetType: config.dbInstanceNetType ?? null,
    vpcId: config.vpcId ?? null,
    vSwitchId: config.vSwitchId ?? null,
  };
};

export { RdsConfig, RdsInfo };
