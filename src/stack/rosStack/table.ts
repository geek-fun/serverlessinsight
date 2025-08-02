import * as ros from '@alicloud/ros-cdk-core';
import * as ots from '@alicloud/ros-cdk-ots';

import { Context, ServerlessIac } from '../../types';
import { isEmpty } from 'lodash';
import { TableDomain } from '../../types/domains/table';
import { calcRefs } from '../../common';

// const tableEngineMap = new Map<TableEnum, { clusterType: string }>([
//   [
//     TableEnum.TABLE_STORE_C,
//     {
//       clusterType: 'HYBRID',
//     },
//   ],
//   [
//     TableEnum.TABLE_STORE_H,
//     {
//       clusterType: 'SSD',
//     },
//   ],
// ]);

export const resolveTables = (
  scope: ros.Construct,
  tables: Array<TableDomain> | undefined,
  tags: ServerlessIac['tags'] | undefined,
  context: Context,
) => {
  if (isEmpty(tables)) {
    return undefined;
  }
  // const collections = Array.from(
  //   new Map(
  //     tables!
  //       .filter((tableDomain) => tableDomain.collection)
  //       .map((tableDomain) => [tableDomain.collection.id, tableDomain]),
  //   ).values(),
  // )
  //   .filter((tableDomain) => tableDomain.collection)
  //   .map((collection) => {
  //     const ds = new ots.datasource.Instances(scope, collection.key + 'Collection', {
  //       instanceName: calcRefs(collection.collection.name, context),
  //     }).attrInstances.toString();
  //     if (!ds) {
  //       const instance = new ots.Instance(
  //         scope,
  //         tableDomain.key,
  //         {
  //           instanceName: calcRefs(collection.name, context),
  //           clusterType: clusterType,
  //           description: tableDomain.desc,
  //           network: tableDomain.network.type === 'PRIVATE' ? 'VPC' : 'PUBLIC',
  //           tags: calcRefs(tags, context),
  //         },
  //         true,
  //       );
  //     }
  //     return ds;
  //   });

  tables!.forEach((tableDomain) => {
    const { collection, throughput, attributes, keySchema } = tableDomain;
    // const { clusterType } = tableEngineMap.get(tableDomain.type) || {};

    // let tableInstance: ots.Instance | ros.IResolvable | undefined;

    // if (collection.name) {
    //   tableInstance = new ots.Instance(
    //     scope,
    //     tableDomain.key,
    //     {
    //       instanceName: calcRefs(collection.name, context),
    //       clusterType: clusterType,
    //       description: tableDomain.desc,
    //       network: tableDomain.network.type === 'PRIVATE' ? 'VPC' : 'PUBLIC',
    //       tags: calcRefs(tags, context),
    //     },
    //     true,
    //   );
    // } else {
    //   tableInstance = new ots.datasource.Instances(scope, tableDomain.key + 'Instance', {
    //     instanceName: calcRefs(collection.id, context),
    //   }).attrInstances as ros.IResolvable;
    // }

    const columns =
      attributes?.map((attribute) => ({
        name: attribute.name,
        type: attribute.type,
      })) || [];

    const primaryKey = keySchema.map((key) => ({
      name: key.name,
      type: columns.find(({ name }) => name === key.name)?.type || 'string',
    }));

    new ots.Table(
      scope,
      tableDomain.key,
      {
        instanceName: collection,
        tableName: calcRefs(tableDomain.name, context),
        primaryKey,
        columns,
        reservedThroughput: throughput?.reserved,
        timeToLive: -1,
        maxVersions: 1,
      },
      true,
    );
  });
};
