import { Resolvable } from './resolvable';

export const enum DatabaseEnum {
  ELASTICSEARCH_SERVERLESS = 'ELASTICSEARCH_SERVERLESS',
  RDS_MYSQL_SERVERLESS = 'RDS_MYSQL_SERVERLESS',
  RDS_PGSQL_SERVERLESS = 'RDS_PGSQL_SERVERLESS',
  RDS_MSSQL_SERVERLESS = 'RDS_MSSQL_SERVERLESS',
  TDSQL_C_SERVERLESS = 'TDSQL_C_SERVERLESS',
}

export const enum DatabaseVersionEnum {
  'MYSQL_5.7' = 'MYSQL_5.7',
  'MYSQL_8.0' = 'MYSQL_8.0',
  'MYSQL_HA_5.7' = 'MYSQL_HA_5.7',
  'MYSQL_HA_8.0' = 'MYSQL_HA_8.0',
  PGSQL_14 = 'PGSQL_14',
  PGSQL_15 = 'PGSQL_15',
  PGSQL_16 = 'PGSQL_16',
  PGSQL_HA_14 = 'PGSQL_HA_14',
  PGSQL_HA_15 = 'PGSQL_HA_15',
  PGSQL_HA_16 = 'PGSQL_HA_16',
  MSSQL_HA_2016 = 'MSSQL_HA_2016',
  MSSQL_HA_2017 = 'MSSQL_HA_2017',
  MSSQL_HA_2019 = 'MSSQL_HA_2019',
  'ES_SEARCH_7.10' = 'ES_SEARCH_7.10',
  'ES_TIME_SERIES_7.10' = 'ES_TIME_SERIES_7.10',
}

export type DatabaseRaw = {
  name: Resolvable<string>;
  type: Resolvable<DatabaseEnum | string>;
  version: Resolvable<string>;
  security: {
    basic_auth: {
      master_user?: Resolvable<string>;
      password: Resolvable<string>;
    };
  };
  network?: {
    type: Resolvable<'PUBLIC' | 'PRIVATE' | string>;
    ingress_rules?: Array<Resolvable<string>>;
    vpc_id?: Resolvable<string>;
    subnet_id?: Resolvable<string>;
  };
  cu?: {
    min?: Resolvable<number>;
    max?: Resolvable<number>;
  };
  storage?: {
    min?: Resolvable<number>;
    max?: Resolvable<number>;
  };
};

export type DatabaseDomain = {
  key: string;
  name: string;
  type: DatabaseEnum;
  version: DatabaseVersionEnum;
  security: {
    basicAuth: {
      username?: string;
      password: string;
    };
  };
  network: {
    type: 'PUBLIC' | 'PRIVATE';
    ingressRules: Array<string>;
    vpcId?: string;
    subnetId?: string;
  };
  cu: {
    min: number;
    max: number;
  };
  storage: {
    min: number;
    max?: number;
  };
};
