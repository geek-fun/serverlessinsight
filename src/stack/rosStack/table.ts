import * as ros from '@alicloud/ros-cdk-core';
import * as ots from '@alicloud/ros-cdk-ots';

import { Context, ServerlessIac } from '../../types';
import { isEmpty } from 'lodash';
import { TableDomain, TableEnum } from '../../types/domains/table';
import { calcRefs } from '../../common';

const tableEngineMap = new Map<TableEnum, { clusterType: string }>([
  [
    TableEnum.TABLE_STORE,
    {
      clusterType: 'HYBRID',
    },
  ],
  [
    TableEnum.TABLE_STORE_H,
    {
      clusterType: 'SSD',
    },
  ],
]);

export const resolveTables = (
  scope: ros.Construct,
  tables: Array<TableDomain> | undefined,
  tags: ServerlessIac['tags'] | undefined,
  context: Context,
) => {
  if (isEmpty(tables)) {
    return undefined;
  }

  tables!.forEach((tableDomain) => {
    const { clusterType } = tableEngineMap.get(tableDomain.type) || {};

    const tableInstance = new ots.Instance(
      scope,
      tableDomain.key,
      {
        instanceName: calcRefs(tableDomain.name, context),
        clusterType: clusterType,
        description: tableDomain.desc,
        network: tableDomain.network.type === 'PRIVATE' ? 'VPC' : 'PUBLIC',
        tags: calcRefs(tags, context),
      },
      true,
    );

    new ots.Table(
      scope,
      tableDomain.key + 'Table',
      {
        instanceName: tableInstance.attrInstanceName,
        tableName: calcRefs(tableDomain.name, context),
        primaryKey: [
          {
            name: 'pk',
            type: 'STRING',
          },
        ],
        columns: [],
        reservedThroughput: {
          read: tableDomain.cu.min,
          write: tableDomain.cu.min,
        },
        timeToLive: -1,
        maxVersions: 1,
      },
      true,
    );
  });
};
