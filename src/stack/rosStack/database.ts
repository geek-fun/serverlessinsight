import * as ros from '@alicloud/ros-cdk-core';
import * as rds from '@alicloud/ros-cdk-rds';
import { calcRefs } from '../../common';
import { Context, DatabaseDomain, DatabaseEnum, DatabaseVersionEnum } from '../../types';
import { isEmpty } from 'lodash';
import * as esServerless from '@alicloud/ros-cdk-elasticsearchserverless';

const rdsEngineMap = new Map<
  string,
  {
    engine: string;
    version: string;
    category: string;
    dbInstanceClass: string;
    quota: { minCapacity: number; maxCapacity: number; ha: boolean };
    scenario?: string;
    storage: {
      type: 'general_essd' | 'cloud_essd';
      // io 突发
      bursting: boolean;
      // io加速 -serverless暂不支持配置
      ioAcceleration?: '1' | '0';
      // OptimizedWrites 写优化 - cdk暂无配置项
      optimizedWrites?: boolean;
      // 云盘加密
      encryption?: boolean;
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
      storage: { type: 'general_essd', bursting: true, optimizedWrites: true, encryption: false },
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
      storage: { type: 'general_essd', bursting: true, optimizedWrites: true, encryption: false },
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
      storage: { type: 'general_essd', bursting: true, optimizedWrites: true, encryption: true },
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
      storage: { type: 'general_essd', bursting: true, optimizedWrites: true, encryption: true },
    },
  ],
  [
    `${DatabaseEnum.RDS_PGSQL_SERVERLESS}-${DatabaseVersionEnum['PGSQL_14']}`,
    {
      engine: 'PostgreSQL',
      version: '14.0',
      category: 'serverless_basic',
      dbInstanceClass: 'pg.n2.serverless.1c',
      quota: { minCapacity: 0.5, maxCapacity: 14, ha: false },
      storage: { type: 'general_essd', bursting: true, optimizedWrites: false, encryption: false },
    },
  ],
  [
    `${DatabaseEnum.RDS_PGSQL_SERVERLESS}-${DatabaseVersionEnum['PGSQL_15']}`,
    {
      engine: 'PostgreSQL',
      version: '15.0',
      category: 'serverless_basic',
      dbInstanceClass: 'pg.n2.serverless.1c',
      quota: { minCapacity: 0.5, maxCapacity: 14, ha: false },
      storage: { type: 'general_essd', bursting: true, optimizedWrites: false, encryption: false },
    },
  ],
  [
    `${DatabaseEnum.RDS_PGSQL_SERVERLESS}-${DatabaseVersionEnum['PGSQL_16']}`,
    {
      engine: 'PostgreSQL',
      version: '16.0',
      category: 'serverless_basic',
      dbInstanceClass: 'pg.n2.serverless.1c',
      quota: { minCapacity: 0.5, maxCapacity: 14, ha: false },
      storage: { type: 'general_essd', bursting: true, optimizedWrites: false, encryption: false },
    },
  ],
  [
    `${DatabaseEnum.RDS_PGSQL_SERVERLESS}-${DatabaseVersionEnum['PGSQL_HA_14']}`,
    {
      engine: 'PostgreSQL',
      version: '14.0',
      category: 'serverless_standard',
      dbInstanceClass: 'pg.n2.serverless.2c',
      quota: { minCapacity: 0.5, maxCapacity: 14, ha: true },
      storage: { type: 'general_essd', bursting: true, optimizedWrites: false, encryption: false },
    },
  ],
  [
    `${DatabaseEnum.RDS_PGSQL_SERVERLESS}-${DatabaseVersionEnum['PGSQL_HA_15']}`,
    {
      engine: 'PostgreSQL',
      version: '15.0',
      category: 'serverless_standard',
      dbInstanceClass: 'pg.n2.serverless.2c',
      quota: { minCapacity: 0.5, maxCapacity: 14, ha: true },
      storage: { type: 'general_essd', bursting: true, optimizedWrites: false, encryption: false },
    },
  ],
  [
    `${DatabaseEnum.RDS_PGSQL_SERVERLESS}-${DatabaseVersionEnum['PGSQL_HA_16']}`,
    {
      engine: 'PostgreSQL',
      version: '16.0',
      category: 'serverless_standard',
      dbInstanceClass: 'pg.n2.serverless.2c',
      quota: { minCapacity: 0.5, maxCapacity: 14, ha: true },
      storage: { type: 'general_essd', bursting: true, optimizedWrites: false, encryption: false },
    },
  ],
  [
    `${DatabaseEnum.RDS_MSSQL_SERVERLESS}-${DatabaseVersionEnum['MSSQL_HA_2016']}`,
    {
      engine: 'SQLServer',
      version: '2016_std_sl',
      category: 'serverless_ha',
      dbInstanceClass: 'mssql.mem2.serverless.s2',
      quota: { minCapacity: 2, maxCapacity: 8, ha: true },
      storage: { type: 'cloud_essd', bursting: false, optimizedWrites: false, encryption: false },
    },
  ],
  [
    `${DatabaseEnum.RDS_MSSQL_SERVERLESS}-${DatabaseVersionEnum['MSSQL_HA_2017']}`,
    {
      engine: 'SQLServer',
      version: '2017_std_sl',
      category: 'serverless_ha',
      dbInstanceClass: 'mssql.mem2.serverless.s2',
      quota: { minCapacity: 2, maxCapacity: 8, ha: true },
      storage: { type: 'cloud_essd', bursting: false, optimizedWrites: false, encryption: false },
    },
  ],
  [
    `${DatabaseEnum.RDS_MSSQL_SERVERLESS}-${DatabaseVersionEnum['MSSQL_HA_2019']}`,
    {
      engine: 'SQLServer',
      version: '2019_std_sl',
      category: 'serverless_ha',
      dbInstanceClass: 'mssql.mem2.serverless.s2',
      quota: { minCapacity: 2, maxCapacity: 8, ha: true },
      storage: { type: 'cloud_essd', bursting: false, optimizedWrites: false, encryption: false },
    },
  ],
  [
    `${DatabaseEnum.ELASTICSEARCH_SERVERLESS}-${DatabaseVersionEnum['ES_SEARCH_8.17']}`,
    {
      engine: 'Elasticsearch',
      version: '8.17',
      category: 'STANDARD',
      dbInstanceClass: '',
      quota: { minCapacity: 2, maxCapacity: 8, ha: false },
      scenario: 'SEARCH',
      storage: { type: 'cloud_essd', bursting: false, optimizedWrites: false, encryption: false },
    },
  ],
  [
    `${DatabaseEnum.ELASTICSEARCH_SERVERLESS}-${DatabaseVersionEnum['ES_TIME_SERIES_7.10']}`,
    {
      engine: 'Elasticsearch',
      version: '7.10',
      category: 'TRIAL',
      dbInstanceClass: '',
      quota: { minCapacity: 2, maxCapacity: 8, ha: false },
      scenario: 'LOG',
      storage: { type: 'cloud_essd', bursting: false, optimizedWrites: false, encryption: false },
    },
  ],
]);

export const resolveDatabases = (
  scope: ros.Construct,
  databases: Array<DatabaseDomain> | undefined,
  context: Context,
) => {
  if (isEmpty(databases)) {
    return undefined;
  }
  databases!.forEach((db) => {
    const { engine, version, category, dbInstanceClass, quota, storage, scenario } =
      rdsEngineMap.get(`${db.type}-${db.version}`) ?? {};

    if ([DatabaseEnum.ELASTICSEARCH_SERVERLESS].includes(db.type)) {
      new esServerless.App(
        scope,
        db.key,
        {
          appName: calcRefs(db.name, context),
          appVersion: version,
          authentication: {
            basicAuth: [
              {
                password: calcRefs(db.security.basicAuth.password, context),
              },
            ],
          },
          quotaInfo: {
            minCu: db.cu.min,
            appType: category as string,
          },
          scenario: scenario,
          // network: [
          //   {
          //     type: 'PUBLIC_KIBANA',
          //     enabled: true,
          //     whiteIpGroup: [{ groupName: 'default', ips: ['0.0.0.0/24'] }],
          //   },
          //   {
          //     type: 'PUBLIC_ES',
          //     enabled: true,
          //     whiteIpGroup: [{ groupName: 'default', ips: ['0.0.0.0/24'] }],
          //   },
          // ],
        },
        true,
      );
    }
    if (
      [
        DatabaseEnum.RDS_MYSQL_SERVERLESS,
        DatabaseEnum.RDS_PGSQL_SERVERLESS,
        DatabaseEnum.RDS_MSSQL_SERVERLESS,
      ].includes(db.type)
    ) {
      new rds.DBInstance(
        scope,
        db.key,
        {
          engine: engine as string,
          /**
           * Serverless 实例
           *    MySQL：5.7、8.0  - MYSQL_HA_5.7, MYSQL_5.7, MYSQL_HA_8.0, MYSQL_8.0
           *    SQL Server：2016_std_sl、2017_std_sl、2019_std_sl  - MSSQL_HA_2016, MSSQL_HA_2017, MSSQL_HA_2019
           *    PostgreSQL：14.0、15.0、16.0 - PGSQL_HA_14, PGSQL_14 PGSQL_HA_15, PGSQL_15, PGSQL_HA_16,PGSQL_16
           */
          engineVersion: version as string,
          dbInstanceStorage: calcRefs(db.storage.min, context),
          /** Serverless 实例
           *     serverless_basic：Serverless 基础系列。（仅适用 MySQL 和 PostgreSQL）
           *     serverless_standard：Serverless 高可用系列。（仅适用 MySQL 和 PostgreSQL）
           *     serverless_ha：SQL Server Serverless 高可用系列。
           */
          category,
          /**
           * MySQL:
           *    MySQL 基础系列：mysql.n2.serverless.1c
           *    MySQL 高可用系列：mysql.n2.serverless.2c
           * SQL Server：
           *    mssql.mem2.serverless.s2
           * PostgreSQL
           *    基础系列：pg.n2.serverless.1c
           *    高可用系列：pg.n2.serverless.2c
           */
          dbInstanceClass: dbInstanceClass as string,
          /**
           * 实例存储类型，取值：
           *  cloud_essd：ESSD PL1 云盘。
           *  general_essd：通用云盘（推荐）。
           */
          dbInstanceStorageType: storage!.type,
          burstingEnabled: storage!.bursting,
          payType: 'Serverless',
          /**
           * MaxCapacity:
           *    MySQL：1~32
           *    SQL Server：2~8
           *    PostgreSQL：1~14
           * MinCapacity:
           *    MySQL：0.5~32
           *    SQL Server：2~8（仅支持整数）
           *    PostgreSQL：0.5~14
           */
          serverlessConfig: {
            // @TODO db.cu.min should get parameter value when it refer to a parameter
            minCapacity: calcRefs(
              db.cu.min === 0 ? quota!.minCapacity : db.cu.min + quota!.minCapacity,
              context,
            ),
            maxCapacity: calcRefs(
              db.cu.max + quota!.minCapacity <= quota!.maxCapacity
                ? db.cu.max + quota!.minCapacity
                : quota!.maxCapacity,
              context,
            ),
            autoPause: db.cu.min === 0,
            switchForce: false,
          },
          masterUsername: calcRefs(db.security.basicAuth.username, context),
          masterUserPassword: calcRefs(db.security.basicAuth.password, context),
          masterUserType: 'Super',
          multiAz: quota!.ha,
          securityIpList: calcRefs(db.network.ingressRules.join(','), context),
          connectionStringType: db.network.type === 'PRIVATE' ? 'Inner' : 'Public',
          dbInstanceNetType: db.network.type === 'PRIVATE' ? 'Intranet' : 'Internet',
        },
        true,
      );
    }
  });
};
