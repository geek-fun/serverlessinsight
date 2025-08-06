import Tablestore20201209, * as ots from '@alicloud/tablestore20201209';
import { Config } from '@alicloud/credentials';
import TableStore, { DefinedColumnType } from 'tablestore';
import * as teaUtil from '@alicloud/tea-util';
import { Credentials } from '../tyes';

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
    endpoint: `tablestore.${regionId}.aliyuncs.com`,
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
        networkSourceACL: ['TRUST_PROXY', ...(network?.ingressRules ?? [])],
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
        if (!response?.body?.instanceName) {
          throw new Error('Failed to create instance, response body is empty');
        }

        return {
          instanceName: response.body.instanceName,
          clusterType: response.body.clusterType,
          instanceStatus: response.body.instanceStatus,
          networkTypeACL: response.body.networkTypeACL,
          networkSourceACL: response.body.networkSourceACL,
          policy: response.body.policy,
        };
      } catch (error) {
        console.log(error);
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
      tableName,
      primaryKey,
      columns,
      reservedThroughput,
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
      const result = await client.createTable({
        tableOptions: {
          timeToLive: -1, // 永不过期
          maxVersions: 1, // 只保留最新版本
        },
        tableMeta: {
          tableName: tableName,
          primaryKey: primaryKey,
          definedColumn: columns.map((col) => ({
            name: col.name,
            type: `DCT_${col.type}` as keyof typeof DefinedColumnType,
          })),
        },
        reservedThroughput: {
          capacityUnit: reservedThroughput,
        },
      });

      console.log('create table result:', result);

      return result;
    },
    updateTable: async ({
      instanceName,
      tableName,
      reservedThroughput,
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
      const result = await client.updateTable({
        tableName: tableName,
        tableOptions: {
          timeToLive: -1, // 永不过期
          maxVersions: 1, // 只保留最新版本
        },
        reservedThroughput: {
          capacityUnit: reservedThroughput,
        },
      });

      console.log('update table result:', result);

      return result;
    },

    deleteTable: async ({
      instanceName,
      tableName,
    }: {
      instanceName: string;
      tableName: string;
    }) => {
      const client = loadTableStore(instanceName, regionId, credentials);
      const result = await client.deleteTable({
        tableName: tableName,
      });

      console.log('delete table result:', result);

      return {
        physicalResourceId: tableName,
        data: {
          instanceName: instanceName,
          tableName: tableName,
        },
      };
    },
  };
};
