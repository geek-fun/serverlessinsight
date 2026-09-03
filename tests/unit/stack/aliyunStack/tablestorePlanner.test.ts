import { ProviderEnum, setResource } from '../../../../src/common';
import { generateTablePlan } from '../../../../src/stack/aliyunStack/tablestorePlanner';
import {
  TableDomain,
  TableEnum,
  AttributeTypeEnum,
  KeyTypeEnum,
  Context,
  CURRENT_STATE_VERSION,
} from '../../../../src/types';

const initialState = {
  version: CURRENT_STATE_VERSION,
  provider: 'aliyun',
  app: 'test-app',
  service: 'test-service',
  stages: {},
  resources: {},
};

const mockTablestoreOperations = {
  createTable: jest.fn(),
  getTable: jest.fn(),
  updateTable: jest.fn(),
  deleteTable: jest.fn(),
  waitForTableReady: jest.fn(),
};

jest.mock('../../../../src/common/aliyunClient', () => ({
  createAliyunClient: () => ({
    tablestore: () => mockTablestoreOperations,
  }),
}));

describe('TableStore Planner', () => {
  const mockContext: Context = {
    stage: 'default',
    app: 'test-app',
    service: 'test-service',
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

    it('should plan to create when existing state is tainted', async () => {
      mockTablestoreOperations.getTable.mockResolvedValue(null);

      const state = setResource(initialState, 'tables.test_table', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          instanceName: 'test-instance',
          tableName: 'test-table',
          clusterType: 'HYBRID',
          description: null,
          primaryKey: [{ name: 'id', type: 'INTEGER' }],
          attributes: [{ name: 'id', type: 'INTEGER' }],
          reservedThroughput: null,
          onDemandThroughput: null,
          tableOptions: null,
          network: { type: 'PUBLIC', ingressRules: [] },
        },
        instances: [],
        lastUpdated: new Date().toISOString(),
        status: 'tainted',
      });

      const plan = await generateTablePlan(mockContext, state, [testTable]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'tables.test_table',
        action: 'create',
        resourceType: 'ALIYUN_TABLESTORE_TABLE',
      });
      expect(mockTablestoreOperations.getTable).toHaveBeenCalledWith('test-table');
    });

    it('should fail fast when state is empty but remote table already exists (no table-level tags)', async () => {
      mockTablestoreOperations.getTable.mockResolvedValue({
        tableName: 'test-table',
        primaryKey: [{ name: 'id', type: 'INTEGER' }],
      });

      await expect(generateTablePlan(mockContext, initialState, [testTable])).rejects.toThrow(
        'Refusing to adopt',
      );
    });

    it('should fail fast when state is tainted and remote table already exists', async () => {
      mockTablestoreOperations.getTable.mockResolvedValue({
        tableName: 'test-table',
        primaryKey: [{ name: 'id', type: 'INTEGER' }],
      });

      const state = setResource(initialState, 'tables.test_table', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          instanceName: 'test-instance',
          tableName: 'test-table',
          clusterType: 'HYBRID',
          description: null,
          primaryKey: [{ name: 'id', type: 'INTEGER' }],
          attributes: [{ name: 'id', type: 'INTEGER' }],
          reservedThroughput: null,
          onDemandThroughput: null,
          tableOptions: null,
          network: { type: 'PUBLIC', ingressRules: [] },
        },
        instances: [],
        lastUpdated: new Date().toISOString(),
        status: 'tainted',
      });

      await expect(generateTablePlan(mockContext, state, [testTable])).rejects.toThrow(
        'Refusing to adopt',
      );
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
        tableOptions: {
          timeToLive: -1,
          maxVersions: 1,
          maxTimeDeviation: 86400,
          allowUpdate: true,
        },
        streamDetails: {
          enableStream: true,
          streamId: 'stream-id',
          expirationTime: 1234567890,
        },
        definedColumn: [{ name: 'id', type: 'INTEGER' }],
      });

      const state = setResource(initialState, 'tables.test_table', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          instanceName: 'test-instance',
          tableName: 'test-table',
          clusterType: 'HYBRID',
          description: null,
          primaryKey: [{ name: 'id', type: 'INTEGER' }],
          attributes: [{ name: 'id', type: 'INTEGER' }],
          reservedThroughput: {
            capacityUnit: {
              read: 10,
              write: 5,
            },
          },
          onDemandThroughput: null,
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
            sid: 'si:aliyun:ots:default:test-instance/test-table',
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

    it('should plan update with drifted when the live cloud table differs from desired', async () => {
      mockTablestoreOperations.getTable.mockResolvedValue({
        tableName: 'test-table',
        primaryKey: [{ name: 'id', type: 'INTEGER' }],
        reservedThroughputDetails: {
          capacityUnit: {
            read: 20,
            write: 10,
          },
        },
        tableOptions: {
          timeToLive: -1,
          maxVersions: 1,
        },
      });

      const state = setResource(initialState, 'tables.test_table', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          instanceName: 'test-instance',
          tableName: 'test-table',
          clusterType: 'HYBRID',
          description: null,
          primaryKey: [{ name: 'id', type: 'INTEGER' }],
          attributes: [{ name: 'id', type: 'INTEGER' }],
          reservedThroughput: {
            capacityUnit: {
              read: 10,
              write: 5,
            },
          },
          onDemandThroughput: null,
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
            sid: 'si:aliyun:ots:default:test-instance/test-table',
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

      expect(plan.items[0]).toMatchObject({
        logicalId: 'tables.test_table',
        action: 'update',
        resourceType: 'ALIYUN_TABLESTORE_TABLE',
        drifted: true,
      });
    });

    it('should plan noop when the live cloud table matches desired', async () => {
      mockTablestoreOperations.getTable.mockResolvedValue({
        tableName: 'test-table',
        primaryKey: [{ name: 'id', type: 'INTEGER' }],
        reservedThroughputDetails: {
          capacityUnit: {
            read: 10,
            write: 5,
          },
        },
        tableOptions: {
          timeToLive: -1,
          maxVersions: 1,
          maxTimeDeviation: 86400,
          allowUpdate: true,
        },
        streamDetails: {
          enableStream: true,
          streamId: 'stream-id',
          expirationTime: 1234567890,
        },
        definedColumn: [{ name: 'id', type: 'INTEGER' }],
      });

      const state = setResource(initialState, 'tables.test_table', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          instanceName: 'test-instance',
          tableName: 'test-table',
          clusterType: 'HYBRID',
          description: null,
          primaryKey: [{ name: 'id', type: 'INTEGER' }],
          attributes: [{ name: 'id', type: 'INTEGER' }],
          reservedThroughput: {
            capacityUnit: {
              read: 10,
              write: 5,
            },
          },
          onDemandThroughput: null,
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
            sid: 'si:aliyun:ots:default:test-instance/test-table',
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

      expect(plan.items[0]).toMatchObject({
        logicalId: 'tables.test_table',
        action: 'noop',
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
          description: null,
          primaryKey: [{ name: 'id', type: 'INTEGER' }],
          attributes: [{ name: 'id', type: 'INTEGER' }],
          reservedThroughput: {
            capacityUnit: {
              read: 5,
              write: 3,
            },
          },
          onDemandThroughput: null,
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
            sid: 'si:aliyun:ots:default:test-instance/test-table',
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

    it('should plan to update when live reserved throughput drifts from desired', async () => {
      mockTablestoreOperations.getTable.mockResolvedValue({
        tableName: 'test-table',
        primaryKey: [{ name: 'id', type: 'INTEGER' }],
        reservedThroughputDetails: {
          capacityUnit: {
            read: 20,
            write: 8,
          },
        },
        tableOptions: { timeToLive: -1, maxVersions: 1 },
      });

      const state = setResource(initialState, 'tables.test_table', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          instanceName: 'test-instance',
          tableName: 'test-table',
          clusterType: 'HYBRID',
          description: null,
          primaryKey: [{ name: 'id', type: 'INTEGER' }],
          attributes: [{ name: 'id', type: 'INTEGER' }],
          reservedThroughput: { capacityUnit: { read: 10, write: 5 } },
          onDemandThroughput: null,
          tableOptions: { timeToLive: -1, maxVersions: 1 },
          network: null,
        },
        instances: [],
        lastUpdated: new Date().toISOString(),
      });

      const plan = await generateTablePlan(mockContext, state, [testTable]);

      expect(plan.items[0]).toMatchObject({
        action: 'update',
        drifted: true,
      });
    });

    it('should plan to update when live table options drift from desired', async () => {
      mockTablestoreOperations.getTable.mockResolvedValue({
        tableName: 'test-table',
        primaryKey: [{ name: 'id', type: 'INTEGER' }],
        reservedThroughputDetails: {
          capacityUnit: {
            read: 10,
            write: 5,
          },
        },
        tableOptions: { timeToLive: 3600, maxVersions: 3 },
      });

      const state = setResource(initialState, 'tables.test_table', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          instanceName: 'test-instance',
          tableName: 'test-table',
          clusterType: 'HYBRID',
          description: null,
          primaryKey: [{ name: 'id', type: 'INTEGER' }],
          attributes: [{ name: 'id', type: 'INTEGER' }],
          reservedThroughput: { capacityUnit: { read: 10, write: 5 } },
          onDemandThroughput: null,
          tableOptions: { timeToLive: -1, maxVersions: 1 },
          network: null,
        },
        instances: [],
        lastUpdated: new Date().toISOString(),
      });

      const plan = await generateTablePlan(mockContext, state, [testTable]);

      expect(plan.items[0]).toMatchObject({
        action: 'update',
        drifted: true,
      });
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
          description: null,
          primaryKey: [{ name: 'id', type: 'INTEGER' }],
          attributes: [{ name: 'id', type: 'INTEGER' }],
          reservedThroughput: null,
          onDemandThroughput: null,
          tableOptions: null,
          network: null,
        },
        instances: [
          {
            type: 'ALIYUN_TABLESTORE_TABLE',
            sid: 'si:aliyun:ots:default:test-instance/test-table',
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
          description: null,
          primaryKey: [{ name: 'id', type: 'INTEGER' }],
          attributes: [{ name: 'id', type: 'INTEGER' }],
          reservedThroughput: null,
          onDemandThroughput: null,
          tableOptions: null,
          network: null,
        },
        instances: [
          {
            type: 'ALIYUN_TABLESTORE_TABLE',
            sid: 'si:aliyun:ots:default:test-instance/old-table',
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
          description: null,
          primaryKey: [{ name: 'id', type: 'INTEGER' }],
          attributes: [{ name: 'id', type: 'INTEGER' }],
          reservedThroughput: null,
          onDemandThroughput: null,
          tableOptions: null,
          network: null,
        },
        instances: [
          {
            type: 'ALIYUN_TABLESTORE_TABLE',
            sid: 'si:aliyun:ots:default:test-instance/test-table',
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
          description: null,
          primaryKey: [{ name: 'id', type: 'INTEGER' }],
          attributes: [{ name: 'id', type: 'INTEGER' }],
          reservedThroughput: null,
          onDemandThroughput: null,
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

    it('should plan update with drift when primary key changes', async () => {
      mockTablestoreOperations.getTable.mockResolvedValue({
        tableName: 'test-table',
        primaryKey: [{ name: 'old_id', type: 'INTEGER' }],
      });

      const state = setResource(initialState, 'tables.test_table', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          instanceName: 'test-instance',
          tableName: 'test-table',
          clusterType: 'HYBRID',
          description: null,
          primaryKey: [{ name: 'old_id', type: 'INTEGER' }],
          attributes: [{ name: 'id', type: 'INTEGER' }],
          reservedThroughput: { capacityUnit: { read: 10, write: 5 } },
          onDemandThroughput: null,
          tableOptions: { timeToLive: -1, maxVersions: 1 },
          network: { type: 'PUBLIC', ingressRules: [] },
        },
        instances: [
          {
            type: 'ALIYUN_TABLESTORE_TABLE',
            sid: 'si:aliyun:ots:default:test-instance/test-table',
            id: 'test-instance/test-table',
            instanceName: 'test-instance',
            tableName: 'test-table',
            clusterType: 'HYBRID',
            primaryKey: [{ name: 'old_id', type: 'INTEGER' }],
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
        drifted: true,
      });
    });

    it('should use empty object fallback when currentState.definition is null', async () => {
      mockTablestoreOperations.getTable.mockResolvedValue({
        tableName: 'test-table',
        primaryKey: [{ name: 'id', type: 'INTEGER' }],
      });

      const state = setResource(initialState, 'tables.test_table', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: null as unknown as Record<string, unknown>,
        instances: [
          {
            type: 'ALIYUN_TABLESTORE_TABLE',
            sid: 'si:aliyun:ots:default:test-instance/test-table',
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
    });
  });
});
