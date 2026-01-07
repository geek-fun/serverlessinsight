import { TableDomain, TableEnum, AttributeTypeEnum, ResourceAttributes } from '../../types';

export type TableStoreConfig = {
  instanceName: string;
  tableName: string;
  clusterType: 'HYBRID' | 'SSD';
  primaryKey: Array<{
    name: string;
    type: 'INTEGER' | 'STRING' | 'BINARY';
  }>;
  reservedThroughput?: {
    capacityUnit: {
      read: number;
      write: number;
    };
  };
  tableOptions?: {
    timeToLive?: number;
    maxVersions?: number;
  };
  network?: {
    type: 'PUBLIC' | 'PRIVATE';
    ingressRules?: Array<string>;
  };
};

// Map from TableStore cluster type to TableEnum
const clusterTypeMap = new Map<TableEnum, 'HYBRID' | 'SSD'>([
  [TableEnum.TABLE_STORE_C, 'HYBRID'],
  [TableEnum.TABLE_STORE_H, 'SSD'],
]);

// Map from domain attribute type to TableStore primary key type
const attributeTypeToTableStoreType = (
  type: AttributeTypeEnum,
): 'INTEGER' | 'STRING' | 'BINARY' => {
  switch (type) {
    case AttributeTypeEnum.INTEGER:
      return 'INTEGER';
    case AttributeTypeEnum.STRING:
      return 'STRING';
    case AttributeTypeEnum.BINARY:
      return 'BINARY';
    // For types not directly supported as primary keys, default to STRING
    case AttributeTypeEnum.DOUBLE:
    case AttributeTypeEnum.BOOLEAN:
    default:
      return 'STRING';
  }
};

export const tableToTableStoreConfig = (table: TableDomain): TableStoreConfig => {
  const clusterType = clusterTypeMap.get(table.type);
  if (!clusterType) {
    throw new Error(`Unsupported table type: ${table.type}`);
  }

  // Extract primary keys from keySchema
  const primaryKey = table.keySchema.map((key) => {
    const attribute = table.attributes.find((attr) => attr.name === key.name);
    if (!attribute) {
      throw new Error(`Attribute not found for key: ${key.name}`);
    }

    return {
      name: key.name,
      type: attributeTypeToTableStoreType(attribute.type),
    };
  });

  const config: TableStoreConfig = {
    instanceName: table.collection,
    tableName: table.name,
    clusterType,
    primaryKey,
    network: table.network,
  };

  // Add reserved throughput if specified
  if (table.throughput?.reserved) {
    config.reservedThroughput = {
      capacityUnit: {
        read: table.throughput.reserved.read,
        write: table.throughput.reserved.write,
      },
    };
  }

  // Default table options
  config.tableOptions = {
    timeToLive: -1, // -1 means never expire
    maxVersions: 1, // Keep only the latest version
  };

  return config;
};

export const extractTableStoreDefinition = (config: TableStoreConfig): ResourceAttributes => {
  return {
    instanceName: config.instanceName,
    tableName: config.tableName,
    clusterType: config.clusterType,
    primaryKey: config.primaryKey,
    reservedThroughput: config.reservedThroughput ?? null,
    tableOptions: config.tableOptions ?? null,
    network: config.network ?? null,
  };
};
