import { ProviderEnum, setResource } from '../../../src/common';
import { generateTablePlan } from '../../../src/stack/aliyunStack/tablestorePlanner';
import {
  TableDomain,
  TableEnum,
  AttributeTypeEnum,
  KeyTypeEnum,
  Context,
  CURRENT_STATE_VERSION,
} from '../../../src/types';

const initialState = { version: CURRENT_STATE_VERSION, provider: 'aliyun', resources: {} };

const mockTablestoreOperations = {
  createTable: jest.fn(),
  getTable: jest.fn(),
  updateTable: jest.fn(),
  deleteTable: jest.fn(),
  waitForTableReady: jest.fn(),
};

jest.mock('../../../src/common/aliyunClient', () => ({
  createAliyunClient: () => ({
    tablestore: () => mockTablestoreOperations,
  }),
}));

describe('TableStore Planner', () => {
  const mockContext: Context = {
    stage: 'default',
    stackName: 'test-stack',
    provider: ProviderEnum.ALIYUN,
    region: 'cn-hangzhou',
    accountId: '123456789012',
    accessKeyId: 'test-key',
    accessKeySecret: 'test-secret',
    iacLocation: 'test.yml',
    parameters: [],
    stages: {},
  };

  const testTable: TableDomain = {
    key: 'test_table',
    collection: 'test-instance',
    name: 'test-table',
    type: TableEnum.TABLE_STORE_C,
    network: {
      type: 'PUBLIC',
      ingressRules: [],
    },
    keySchema: [
      {
        name: 'id',
        type: KeyTypeEnum.HASH,
      },
    ],
    attributes: [
      {
        name: 'id',
        type: AttributeTypeEnum.INTEGER,
      },
    ],
    throughput: {
      reserved: {
        read: 10,
        write: 5,
      },
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('generateTablePlan', () => {
    it('should plan to create a new table when state is empty', async () => {
      mockTablestoreOperations.getTable.mockResolvedValue(null);

      const state = initialState;

      const plan = await generateTablePlan(mockContext, state, [testTable]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'tables.test_table',
        action: 'create',
        resourceType: 'ALIYUN_TABLESTORE_TABLE',
      });
      expect(plan.items[0].changes?.after).toBeDefined();
      expect(plan.items[0].changes?.after?.instanceName).toBe('test-instance');
      expect(plan.items[0].changes?.after?.tableName).toBe('test-table');
    });

    it('should plan no changes when table exists and matches state', async () => {
      mockTablestoreOperations.getTable.mockResolvedValue({
        tableName: 'test-table',
        primaryKey: [{ name: 'id', type: 'INTEGER' }],
        reservedThroughputDetails: {
          capacityUnit: {
            read: 10,
            write: 5,
          },
        },
      });

      const state = setResource(initialState, 'tables.test_table', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          instanceName: 'test-instance',
          tableName: 'test-table',
          clusterType: 'HYBRID',
          primaryKey: [{ name: 'id', type: 'INTEGER' }],
          reservedThroughput: {
            capacityUnit: {
              read: 10,
              write: 5,
            },
          },
          tableOptions: {
            timeToLive: -1,
            maxVersions: 1,
          },
          network: {
            type: 'PUBLIC',
            ingressRules: [],
          },
        },
        instances: [
          {
            type: 'ALIYUN_TABLESTORE_TABLE',
            arn: 'arn:acs:ots:cn-hangzhou:123456789012:instance/test-instance/table/test-table',
            id: 'test-instance/test-table',
            instanceName: 'test-instance',
            tableName: 'test-table',
            clusterType: 'HYBRID',
            primaryKey: [{ name: 'id', type: 'INTEGER' }],
          },
        ],
        lastUpdated: new Date().toISOString(),
      });

      const plan = await generateTablePlan(mockContext, state, [testTable]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'tables.test_table',
        action: 'noop',
        resourceType: 'ALIYUN_TABLESTORE_TABLE',
      });
    });

    it('should plan to update when reserved throughput changes', async () => {
      mockTablestoreOperations.getTable.mockResolvedValue({
        tableName: 'test-table',
        primaryKey: [{ name: 'id', type: 'INTEGER' }],
        reservedThroughputDetails: {
          capacityUnit: {
            read: 5,
            write: 3,
          },
        },
      });

      const state = setResource(initialState, 'tables.test_table', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          instanceName: 'test-instance',
          tableName: 'test-table',
          clusterType: 'HYBRID',
          primaryKey: [{ name: 'id', type: 'INTEGER' }],
          reservedThroughput: {
            capacityUnit: {
              read: 5,
              write: 3,
            },
          },
          tableOptions: {
            timeToLive: -1,
            maxVersions: 1,
          },
          network: {
            type: 'PUBLIC',
            ingressRules: [],
          },
        },
        instances: [
          {
            type: 'ALIYUN_TABLESTORE_TABLE',
            arn: 'arn:acs:ots:cn-hangzhou:123456789012:instance/test-instance/table/test-table',
            id: 'test-instance/test-table',
            instanceName: 'test-instance',
            tableName: 'test-table',
            clusterType: 'HYBRID',
            primaryKey: [{ name: 'id', type: 'INTEGER' }],
          },
        ],
        lastUpdated: new Date().toISOString(),
      });

      const plan = await generateTablePlan(mockContext, state, [testTable]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'tables.test_table',
        action: 'update',
        resourceType: 'ALIYUN_TABLESTORE_TABLE',
      });
      expect(plan.items[0].changes?.before).toBeDefined();
      expect(plan.items[0].changes?.after).toBeDefined();
    });

    it('should plan to create when remote table does not exist', async () => {
      mockTablestoreOperations.getTable.mockResolvedValue(null);

      const state = setResource(initialState, 'tables.test_table', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          instanceName: 'test-instance',
          tableName: 'test-table',
          clusterType: 'HYBRID',
          primaryKey: [{ name: 'id', type: 'INTEGER' }],
          reservedThroughput: null,
          tableOptions: null,
          network: null,
        },
        instances: [
          {
            type: 'ALIYUN_TABLESTORE_TABLE',
            arn: 'arn:acs:ots:cn-hangzhou:123456789012:instance/test-instance/table/test-table',
            id: 'test-instance/test-table',
            instanceName: 'test-instance',
            tableName: 'test-table',
            clusterType: 'HYBRID',
            primaryKey: [{ name: 'id', type: 'INTEGER' }],
          },
        ],
        lastUpdated: new Date().toISOString(),
      });

      const plan = await generateTablePlan(mockContext, state, [testTable]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'tables.test_table',
        action: 'create',
        resourceType: 'ALIYUN_TABLESTORE_TABLE',
        drifted: true,
      });
    });

    it('should plan to delete tables not in desired state', async () => {
      const state = setResource(initialState, 'tables.old_table', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          instanceName: 'test-instance',
          tableName: 'old-table',
          clusterType: 'HYBRID',
          primaryKey: [{ name: 'id', type: 'INTEGER' }],
          reservedThroughput: null,
          tableOptions: null,
          network: null,
        },
        instances: [
          {
            type: 'ALIYUN_TABLESTORE_TABLE',
            arn: 'arn:acs:ots:cn-hangzhou:123456789012:instance/test-instance/table/old-table',
            id: 'test-instance/old-table',
            instanceName: 'test-instance',
            tableName: 'old-table',
            clusterType: 'HYBRID',
            primaryKey: [{ name: 'id', type: 'INTEGER' }],
          },
        ],
        lastUpdated: new Date().toISOString(),
      });

      mockTablestoreOperations.getTable.mockResolvedValue(null);

      const plan = await generateTablePlan(mockContext, state, [testTable]);

      expect(plan.items).toHaveLength(2);

      const createAction = plan.items.find((item) => item.action === 'create');
      const deleteAction = plan.items.find((item) => item.action === 'delete');

      expect(createAction).toMatchObject({
        logicalId: 'tables.test_table',
        action: 'create',
      });

      expect(deleteAction).toMatchObject({
        logicalId: 'tables.old_table',
        action: 'delete',
      });
    });

    it('should plan to delete all tables when no tables are desired', async () => {
      const state = setResource(initialState, 'tables.test_table', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          instanceName: 'test-instance',
          tableName: 'test-table',
          clusterType: 'HYBRID',
          primaryKey: [{ name: 'id', type: 'INTEGER' }],
          reservedThroughput: null,
          tableOptions: null,
          network: null,
        },
        instances: [
          {
            type: 'ALIYUN_TABLESTORE_TABLE',
            arn: 'arn:acs:ots:cn-hangzhou:123456789012:instance/test-instance/table/test-table',
            id: 'test-instance/test-table',
            instanceName: 'test-instance',
            tableName: 'test-table',
            clusterType: 'HYBRID',
            primaryKey: [{ name: 'id', type: 'INTEGER' }],
          },
        ],
        lastUpdated: new Date().toISOString(),
      });

      const plan = await generateTablePlan(mockContext, state, []);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'tables.test_table',
        action: 'delete',
      });
    });

    it('should handle errors when checking remote state gracefully', async () => {
      mockTablestoreOperations.getTable.mockRejectedValue(new Error('Network error'));

      const state = setResource(initialState, 'tables.test_table', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          instanceName: 'test-instance',
          tableName: 'test-table',
          clusterType: 'HYBRID',
          primaryKey: [{ name: 'id', type: 'INTEGER' }],
          reservedThroughput: null,
          tableOptions: null,
          network: null,
        },
        instances: [],
        lastUpdated: new Date().toISOString(),
      });

      const plan = await generateTablePlan(mockContext, state, [testTable]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'tables.test_table',
        action: 'create',
        resourceType: 'ALIYUN_TABLESTORE_TABLE',
      });
    });
  });
});
