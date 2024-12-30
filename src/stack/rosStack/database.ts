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
          engineVersion: replaceReference(db.version, context),
          category: 'Basic',
          dbInstanceClass: 'pg.n1e.1c.1m',
          dbInstanceStorage: replaceReference(db.storage.min, context),
          securityIpList: '0.0.0.0/0',
          dbInstanceStorageType: 'cloud_essd',
          payType: 'Postpaid',
          serverlessConfig: {
            minCapacity: replaceReference(db.cu.min, context),
            maxCapacity: replaceReference(db.cu.max, context),
            autoPause: true,
          },
        },
        true,
      );
    }
  });
};
