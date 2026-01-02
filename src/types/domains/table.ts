import { Resolvable } from './resolvable';

export const enum TableEnum {
  TABLE_STORE_C = 'TABLE_STORE_C',
  TABLE_STORE_H = 'TABLE_STORE_H',
}

export type TableRaw = {
  collection: Resolvable<string>;
  name: Resolvable<string>;
  type: Resolvable<TableEnum | string>;
  desc?: Resolvable<string>;
  network?: {
    type: Resolvable<'PUBLIC' | 'PRIVATE' | string>;
    ingress_rules?: Array<Resolvable<string>>;
  };
  throughput?: {
    reserved?: {
      read?: Resolvable<string>;
      write?: Resolvable<string>;
    };
    on_demand?: {
      read?: Resolvable<string>;
      write?: Resolvable<string>;
    };
  };
  key_schema: Array<{
    name: Resolvable<string>;
    type: Resolvable<string>;
  }>;
  attributes: Array<{
    name: Resolvable<string>;
    type: Resolvable<string>;
  }>;
};

export enum AttributeTypeEnum {
  STRING = 'STRING', // UTF-8, nullable string
  INTEGER = 'INTEGER', // 64 bit signed integer, 8 bytes
  DOUBLE = 'DOUBLE', // 64 bit double, 8 bytes
  BOOLEAN = 'BOOLEAN', // true/false, 1 byte
  BINARY = 'BINARY', // binary type
}

export enum KeyTypeEnum {
  HASH = 'HASH', // Primary key type, used for partitioning data
  RANGE = 'RANGE', // Sort key type, used for sorting data within a partition
}

export type TableDomain = {
  key: string;
  collection: string;
  name: string;
  type: TableEnum;
  desc?: string;
  network: {
    type: 'PUBLIC' | 'PRIVATE';
    ingressRules: Array<string>;
  };
  throughput?: {
    reserved?: {
      read: number;
      write: number;
    };
    onDemand?: {
      read: number;
      write: number;
    };
  };
  keySchema: Array<{
    name: string;
    type: KeyTypeEnum;
  }>;
  attributes: Array<{
    name: string;
    type: AttributeTypeEnum;
  }>;
};
