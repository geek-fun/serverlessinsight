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

    const primaryKey = keySchema.map((key) => {
      const name = calcRefs(key.name, context);
      const type =
        attributes.find((attribute) => calcRefs(attribute.name, context) === name)?.type ||
        'STRING';

      return { name, type: calcRefs(type, context) };
    });

    const columns =
      attributes
        ?.filter(({ name }) => !primaryKey.find((pk) => pk.name === calcRefs(name, context)))
        .map((attribute) => ({
          name: calcRefs(attribute.name, context),
          type: calcRefs(attribute.type, context),
        })) || [];

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
          credentials: {
            accessKeyId: context.accessKeyId,
            accessKeySecret: context.accessKeySecret,
            securityToken: context.securityToken,
          },
        },
      },
      true,
    );
  });
};
