import Tablestore20201209, * as ots from '@alicloud/tablestore20201209';
import { Config } from '@alicloud/credentials';
import TableStore from 'tablestore';
import * as teaUtil from '@alicloud/tea-util';
import { Credentials } from '../tyes';
import { formatOtsTableParam, logger } from '../common';

const loadAlicloudTableStoreClient = (
  region: string,
  credentials: Credentials,
): Tablestore20201209 => {
  const credentialsConfig = new Config({ ...credentials, type: 'access_key' });
  credentialsConfig.endpoint = `tablestore.${region}.aliyuncs.com`;

  return new Tablestore20201209(credentialsConfig);
};

const loadTableStore = (
  instanceName: string,
  regionId: string,
  credentials: Credentials,
): TableStore.Client =>
  new TableStore.Client({
    ...credentials,
    endpoint: `https://${instanceName}.${regionId}.ots.aliyuncs.com`,
    instancename: instanceName,
  });

export const loadTableStoreClient = (regionId: string, credentials: Credentials) => {
  const alicloudTableStoreClient = loadAlicloudTableStoreClient(regionId, credentials);

  return {
    createInstance: async ({
      instanceName,
      clusterType,
      network,
      tags: rawTags,
    }: {
      instanceName: string;
      clusterType: string;
      network: {
        type: 'PRIVATE' | 'PUBLIC';
        vpcId?: string;
        ingressRules: Array<string>;
      };
      tags?: Array<{ key: string; value: string }>;
    }) => {
      const tags = rawTags?.map(
        (tag) => new ots.CreateInstanceRequestTags({ key: tag.key, value: tag.value }),
      );
      const networkTypeACL =
        network.type === 'PRIVATE' ? ['VPC'] : network.type === 'PUBLIC' ? ['PUBLIC'] : [];

      const createInstanceRequest = new ots.CreateInstanceRequest({
        instanceName: instanceName,
        clusterType: clusterType,
        networkTypeACL,
        networkSourceACL: ['TRUST_PROXY', ...(network?.ingressRules ?? [])].filter(Boolean),
        policy: '',
        tags,
      });

      const runtime = new teaUtil.RuntimeOptions({});
      const headers: { [key: string]: string } = {};

      try {
        const response = await alicloudTableStoreClient.createInstanceWithOptions(
          createInstanceRequest,
          headers,
          runtime,
        );
        logger.info({ response, instanceName }, `Instance ${instanceName} created successfully`);

        if (!response?.body?.instanceName) {
          throw new Error('Failed to create instance, response body is empty');
        }

        return {
          instanceName: instanceName,
          clusterType: response.body.clusterType,
          instanceStatus: response.body.instanceStatus,
          networkTypeACL: response.body.networkTypeACL,
          networkSourceACL: response.body.networkSourceACL,
          policy: response.body.policy,
        };
      } catch (error) {
        logger.error(error, 'Failed to create instance');
        throw error;
      }
    },

    getInstance: async (instanceName: string) => {
      const runtime = new teaUtil.RuntimeOptions({});
      const headers: { [key: string]: string } = {};
      const response = await alicloudTableStoreClient.getInstanceWithOptions(
        new ots.GetInstanceRequest({ instanceName }),
        headers,
        runtime,
      );
      if (!response?.body?.instanceName) {
        return undefined;
      } else {
        return {
          instanceName: response.body.instanceName,
          clusterType: response.body.clusterType,
          networkTypeACL: response.body.networkTypeACL,
          networkSourceACL: response.body.networkSourceACL,
          policy: response.body.policy,
          instanceStatus: response.body.instanceStatus,
        };
      }
    },

    createTable: async ({
      instanceName,
      ...params
    }: {
      instanceName: string;
      tableName: string;
      primaryKey: Array<{ name: string; type: 'STRING' | 'INTEGER' | 'BINARY' }>;
      columns: Array<{
        name: string;
        type: 'STRING' | 'INTEGER' | 'DOUBLE' | 'BOOLEAN' | 'BINARY';
      }>;
      reservedThroughput: {
        read: number;
        write: number;
      };
    }) => {
      const client = loadTableStore(instanceName, regionId, credentials);
      const tableParam = formatOtsTableParam(params);

      await client.createTable(tableParam);

      return {
        instanceName,
        tableName: tableParam.tableMeta.tableName,
        primaryKey: tableParam.tableMeta.primaryKey,
        columns: tableParam.tableMeta.definedColumn,
        reservedThroughput: tableParam.reservedThroughput,
      };
    },

    updateTable: async ({
      instanceName,
      tableName,
      reservedThroughput,
    }: {
      instanceName: string;
      tableName: string;
      reservedThroughput: {
        read: number;
        write: number;
      };
    }) => {
      const client = loadTableStore(instanceName, regionId, credentials);

      const result = await client.updateTable({
        tableName: tableName,
        tableOptions: {
          timeToLive: -1, // 永不过期
          maxVersions: 1, // 只保留最新版本
        },
        reservedThroughput: { capacityUnit: reservedThroughput },
      });

      logger.info(result, `Table updated successfully`);

      return {
        instanceName: instanceName,
        tableName: tableName,
        reservedThroughput: reservedThroughput,
      };
    },

    deleteTable: async ({
      instanceName,
      tableName,
    }: {
      instanceName: string;
      tableName: string;
    }) => {
      const client = loadTableStore(instanceName, regionId, credentials);
      const result = (await client.deleteTable({ tableName })) as { RequestId: string };

      return { instanceName, tableName, requestId: result?.RequestId };
    },
  };
};
