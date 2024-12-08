import * as ros from '@alicloud/ros-cdk-core';
import { replaceReference } from '../../common';
import { ActionContext, DatabaseDomain, DatabaseEngineMode, DatabaseEnum } from '../../types';
import { isEmpty } from 'lodash';
import * as esServerless from '@alicloud/ros-cdk-elasticsearchserverless';

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
            cu: db.cu,
            storage: db.storageSize,
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
  });
};
