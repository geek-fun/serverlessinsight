export const enum TableEnum {
  TABLE_STORE = 'TABLE_STORE',
  TABLE_STORE_H = 'TABLE_STORE_H',
}

export type TableRaw = {
  name: string;
  type: TableEnum;
  version: string;
  security: {
    basic_auth: {
      master_user: string;
      password: string;
    };
  };
  network?: {
    type: 'PUBLIC' | 'PRIVATE';
    ingress_rules?: Array<string>;
  };
  cu?: {
    min?: number;
    max?: number;
  };
  storage?: {
    min: number;
  };
};

export type TableDomain = {
  key: string;
  name: string;
  type: TableEnum;
  desc?: string;
  security: {
    basicAuth: {
      username: string;
      password: string;
    };
  };
  network: {
    type: 'PUBLIC' | 'PRIVATE';
    ingressRules: Array<string>;
  };
  cu: {
    min: number;
    max: number;
  };
  storage: {
    min: number;
  };
};
