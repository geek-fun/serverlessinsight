declare module 'tablestore' {
  export interface ClientConfig {
    accessKeyId: string;
    secretAccessKey: string;
    stsToken?: string;
    endpoint: string;
    instancename: string;
  }

  export interface PrimaryKeySchema {
    name: string;
    type: 'INTEGER' | 'STRING' | 'BINARY';
  }

  export interface CapacityUnit {
    read: number;
    write: number;
  }

  export interface TableMeta {
    tableName: string;
    primaryKey: PrimaryKeySchema[];
  }

  export interface TableOptions {
    timeToLive?: number;
    maxVersions?: number;
  }

  export interface CreateTableParams {
    tableMeta: TableMeta;
    reservedThroughput: {
      capacityUnit: CapacityUnit;
    };
    tableOptions?: TableOptions;
  }

  export interface DescribeTableParams {
    tableName: string;
  }

  export interface UpdateTableParams {
    tableName: string;
    reservedThroughput?: {
      capacityUnit: CapacityUnit;
    };
    tableOptions?: TableOptions;
  }

  export interface DeleteTableParams {
    tableName: string;
  }

  export class Client {
    constructor(config: ClientConfig);
    createTable(
      params: CreateTableParams,
      callback: (err: Error | null, data?: unknown) => void,
    ): void;
    describeTable(
      params: DescribeTableParams,
      callback: (err: Error | null, data?: unknown) => void,
    ): void;
    updateTable(
      params: UpdateTableParams,
      callback: (err: Error | null, data?: unknown) => void,
    ): void;
    deleteTable(
      params: DeleteTableParams,
      callback: (err: Error | null, data?: unknown) => void,
    ): void;
  }

  const TableStore: {
    Client: typeof Client;
  };

  export default TableStore;
}
