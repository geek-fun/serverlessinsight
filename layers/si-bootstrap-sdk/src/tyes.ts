export enum ResourceEnum {
  TABLE_STORE_C = 'TABLE_STORE_C',
  TABLE_STORE_H = 'TABLE_STORE_H',
}

export enum RequestTypeEnum {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export type ResourceProperties<T = unknown> = {
  tags?: { key: string; value: string }[];
} & T;
export type Credentials = {
  accessKeyId: string;
  accessKeySecret: string;
  securityToken?: string;
};

export type CustomResourceRequest = {
  stackId: string;
  stackName: string;
  resourceOwnerId: string;
  callerId: string;
  resourceProperties: ResourceProperties;
  eventType: string;
  requestType: RequestTypeEnum;
  resourceType: ResourceEnum;
  logicalResourceId: string;
  physicalResourceId?: string;
  regionId: string;
  requestId: string;
  credentials: Credentials;
};

export type TableStoreResourceProperties = {
  instanceName: string;
  tableName: string;
  primaryKey: Array<{ name: string; type: 'STRING' | 'INTEGER' | 'BINARY' }>;
  columns: Array<{
    name: string;
    type: 'STRING' | 'INTEGER' | 'DOUBLE' | 'BOOLEAN' | 'BINARY';
  }>;
  clusterType: string;
  network: {
    type: 'PRIVATE' | 'PUBLIC';
    vpcId?: string;
    ingressRules: Array<string>;
  };
  reservedThroughput: {
    read: number;
    write: number;
  };
};
