import * as ros from '@alicloud/ros-cdk-core';
import * as rds from '@alicloud/ros-cdk-rds';
import { replaceReference } from '../../common';
import { ActionContext, DatabaseDomain, DatabaseEngineMode, DatabaseEnum } from '../../types';
import { isEmpty } from 'lodash';
import * as esServerless from '@alicloud/ros-cdk-elasticsearchserverless';

const rdsEngineMap = new Map([
  [DatabaseEnum.RDS_MYSQL_SERVERLESS, 'MySQL'],
  [DatabaseEnum.RDS_POSTGRESQL_SERVERLESS, 'PostgreSQL'],
  [DatabaseEnum.RDS_SQLSERVER_SERVERLESS, 'SQLServer'],
]);

export const resolveDatabases = (
  scope: ros.Construct,
  databases: Array<DatabaseDomain> | undefined,
  context: ActionContext,
) => {
  if (isEmpty(databases)) {
    return undefined;
  }
  databases!.forEach((db) => {
    if ([DatabaseEnum.ELASTICSEARCH_SERVERLESS].includes(db.type)) {
      new esServerless.App(
        scope,
        replaceReference(db.key, context),
        {
          appName: replaceReference(db.name, context),
          appVersion: db.version,
          authentication: {
            basicAuth: [
              {
                password: replaceReference(db.security.basicAuth.password, context),
              },
            ],
          },
          quotaInfo: {
            cu: db.cu.min,
            storage: db.storage.min,
            appType: db.engineMode === DatabaseEngineMode.TIMESERIES ? 'TRIAL' : 'STANDARD',
          },
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
        DatabaseEnum.RDS_POSTGRESQL_SERVERLESS,
        DatabaseEnum.RDS_SQLSERVER_SERVERLESS,
      ].includes(db.type)
    ) {
      new rds.DBInstance(
        scope,
        replaceReference(db.key, context),
        {
          engine: rdsEngineMap.get(db.type) as string,
          /**
           * Serverless 实例
           * MySQL：5.7、8.0
           * SQL Server：2016_std_sl、2017_std_sl、2019_std_sl
           * PostgreSQL：14.0、15.0、16.0
           */
          engineVersion: replaceReference(db.version, context),
          dbInstanceStorage: replaceReference(db.storage.min, context),
          securityIpList: '0.0.0.0/0',
          /** Serverless 实例
           *     serverless_basic：Serverless 基础系列。（仅适用 MySQL 和 PostgreSQL）
           *     serverless_standard：Serverless 高可用系列。（仅适用 MySQL 和 PostgreSQL）
           *     serverless_ha：SQL Server Serverless 高可用系列。
           */
          category: 'serverless_basic',
          dbInstanceClass: 'pg.n2.serverless.1c',
          dbInstanceStorageType: 'cloud_essd',
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
            minCapacity: replaceReference(db.cu.min, context),
            maxCapacity: replaceReference(db.cu.max, context),
            autoPause: true,
            switchForce: false,
          },
        },
        true,
      );
    }
  });
};
