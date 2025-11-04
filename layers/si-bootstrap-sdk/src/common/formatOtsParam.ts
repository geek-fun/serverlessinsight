import { DefinedColumnType } from 'tablestore';

const columnTypeMap = new Map([
  ['STRING', DefinedColumnType.DCT_STRING],
  ['INTEGER', DefinedColumnType.DCT_INTEGER],
  ['DOUBLE', DefinedColumnType.DCT_DOUBLE],
  ['BOOLEAN', DefinedColumnType.DCT_BOOLEAN],
]);

export const formatOtsTableParam = ({
  tableName,
  primaryKey,
  columns,
  reservedThroughput,
}: {
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
}) => ({
  tableOptions: {
    timeToLive: -1, // 永不过期
    maxVersions: 1, // 只保留最新版本
  },
  tableMeta: {
    tableName: tableName,
    primaryKey: primaryKey,
    definedColumn: columns.map((col) => ({
      name: col.name,
      type: columnTypeMap.get(col.type) as typeof DefinedColumnType.DCT_BOOLEAN,
    })),
  },
  reservedThroughput: {
    capacityUnit: reservedThroughput,
  },
});
