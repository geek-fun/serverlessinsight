import {
  tableToTableStoreConfig,
  extractTableStoreDefinition,
} from '../../../src/stack/aliyunStack/tablestoreTypes';
import { TableDomain, TableEnum, AttributeTypeEnum, KeyTypeEnum } from '../../../src/types';

describe('TableStoreTypes', () => {
  describe('tableToTableStoreConfig', () => {
    it('should convert table domain to TableStore config with HYBRID cluster type', () => {
      const table: TableDomain = {
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
      };

      const result = tableToTableStoreConfig(table);

      expect(result.instanceName).toBe('test-instance');
      expect(result.tableName).toBe('test-table');
      expect(result.clusterType).toBe('HYBRID');
      expect(result.primaryKey).toEqual([{ name: 'id', type: 'INTEGER' }]);
    });

    it('should convert table domain to TableStore config with SSD cluster type', () => {
      const table: TableDomain = {
        key: 'test_table',
        collection: 'test-instance',
        name: 'test-table',
        type: TableEnum.TABLE_STORE_H,
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
            type: AttributeTypeEnum.STRING,
          },
        ],
      };

      const result = tableToTableStoreConfig(table);

      expect(result.clusterType).toBe('SSD');
      expect(result.primaryKey).toEqual([{ name: 'id', type: 'STRING' }]);
    });

    it('should map attribute types correctly for primary keys', () => {
      const testCases = [
        { attributeType: AttributeTypeEnum.INTEGER, expected: 'INTEGER' },
        { attributeType: AttributeTypeEnum.STRING, expected: 'STRING' },
        { attributeType: AttributeTypeEnum.BINARY, expected: 'BINARY' },
        // DOUBLE and BOOLEAN are not supported as primary keys, fallback to STRING
        { attributeType: AttributeTypeEnum.DOUBLE, expected: 'STRING' },
        { attributeType: AttributeTypeEnum.BOOLEAN, expected: 'STRING' },
      ];

      testCases.forEach(({ attributeType, expected }) => {
        const table: TableDomain = {
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
              type: attributeType,
            },
          ],
        };

        const result = tableToTableStoreConfig(table);

        expect(result.primaryKey[0].type).toBe(expected);
      });
    });

    it('should include reserved throughput when defined', () => {
      const table: TableDomain = {
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

      const result = tableToTableStoreConfig(table);

      expect(result.reservedThroughput).toEqual({
        capacityUnit: {
          read: 10,
          write: 5,
        },
      });
    });

    it('should handle composite primary keys', () => {
      const table: TableDomain = {
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
            name: 'partitionKey',
            type: KeyTypeEnum.HASH,
          },
          {
            name: 'sortKey',
            type: KeyTypeEnum.RANGE,
          },
        ],
        attributes: [
          {
            name: 'partitionKey',
            type: AttributeTypeEnum.STRING,
          },
          {
            name: 'sortKey',
            type: AttributeTypeEnum.INTEGER,
          },
        ],
      };

      const result = tableToTableStoreConfig(table);

      expect(result.primaryKey).toEqual([
        { name: 'partitionKey', type: 'STRING' },
        { name: 'sortKey', type: 'INTEGER' },
      ]);
    });

    it('should include default table options', () => {
      const table: TableDomain = {
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
      };

      const result = tableToTableStoreConfig(table);

      expect(result.tableOptions).toEqual({
        timeToLive: -1,
        maxVersions: 1,
      });
    });

    it('should throw error for unsupported table type', () => {
      const table = {
        key: 'test_table',
        collection: 'test-instance',
        name: 'test-table',
        type: 'UNSUPPORTED_TYPE' as TableEnum,
        network: {
          type: 'PUBLIC' as const,
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
      };

      expect(() => tableToTableStoreConfig(table)).toThrow('Unsupported table type');
    });
  });

  describe('extractTableStoreDefinition', () => {
    it('should extract all attributes', () => {
      const config = {
        instanceName: 'test-instance',
        tableName: 'test-table',
        clusterType: 'HYBRID' as const,
        primaryKey: [{ name: 'id', type: 'INTEGER' as const }],
      };

      const definition = extractTableStoreDefinition(config);

      expect(definition).toEqual({
        instanceName: 'test-instance',
        tableName: 'test-table',
        clusterType: 'HYBRID',
        primaryKey: [{ name: 'id', type: 'INTEGER' }],
        reservedThroughput: null,
        tableOptions: null,
        network: null,
      });
    });

    it('should extract reserved throughput when defined', () => {
      const config = {
        instanceName: 'test-instance',
        tableName: 'test-table',
        clusterType: 'HYBRID' as const,
        primaryKey: [{ name: 'id', type: 'INTEGER' as const }],
        reservedThroughput: {
          capacityUnit: {
            read: 10,
            write: 5,
          },
        },
      };

      const definition = extractTableStoreDefinition(config);

      expect(definition.reservedThroughput).toEqual({
        capacityUnit: {
          read: 10,
          write: 5,
        },
      });
    });

    it('should extract table options when defined', () => {
      const config = {
        instanceName: 'test-instance',
        tableName: 'test-table',
        clusterType: 'SSD' as const,
        primaryKey: [{ name: 'id', type: 'STRING' as const }],
        tableOptions: {
          timeToLive: 86400,
          maxVersions: 3,
        },
      };

      const definition = extractTableStoreDefinition(config);

      expect(definition.tableOptions).toEqual({
        timeToLive: 86400,
        maxVersions: 3,
      });
    });

    it('should extract network configuration when defined', () => {
      const config = {
        instanceName: 'test-instance',
        tableName: 'test-table',
        clusterType: 'HYBRID' as const,
        primaryKey: [{ name: 'id', type: 'INTEGER' as const }],
        network: {
          type: 'PRIVATE' as const,
          ingressRules: ['10.0.0.0/8'],
        },
      };

      const definition = extractTableStoreDefinition(config);

      expect(definition.network).toEqual({
        type: 'PRIVATE',
        ingressRules: ['10.0.0.0/8'],
      });
    });
  });
});
