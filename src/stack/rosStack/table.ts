import * as ros from '@alicloud/ros-cdk-core';
import * as rosRos from '@alicloud/ros-cdk-ros';

import { Context, ServerlessIac } from '../../types';
import { isEmpty } from 'lodash';
import { TableDomain, TableEnum } from '../../types/domains/table';
import { calcRefs, SI_BOOTSTRAP_FC_PREFIX } from '../../common';

const tableEngineMap = new Map<TableEnum, { clusterType: string }>([
  [
    TableEnum.TABLE_STORE_C,
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
    const { collection, throughput, attributes, keySchema, network } = tableDomain;

    const columns =
      attributes?.map((attribute) => ({
        name: calcRefs(attribute.name, context),
        type: calcRefs(attribute.type, context),
      })) || [];

    const primaryKey = keySchema.map((key) => ({
      name: calcRefs(key.name, context),
      type: columns.find(({ name }) => calcRefs(name, context) === key.name)?.type || 'STRING',
    }));
    const clusterType = tableEngineMap.get(calcRefs(tableDomain.type, context))?.clusterType;

    new rosRos.RosCustomResource(
      scope,
      tableDomain.key,
      {
        serviceToken: `acs:fc:${context.region}:${context.accountId}:functions/${SI_BOOTSTRAP_FC_PREFIX}-${context.accountId}-${context.region}`,
        timeout: 600,
        parameters: {
          resource: calcRefs(tableDomain.type, context),
          instanceName: calcRefs(collection, context),
          tableName: calcRefs(tableDomain.name, context),
          primaryKey,
          columns,
          clusterType,
          network,
          reservedThroughput: calcRefs(throughput?.reserved, context),
          tags,
        },
      },
      true,
    );
  });
};
