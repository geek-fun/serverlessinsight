export enum DatabaseEngineMode {
  SEARCH = 'SEARCH',
  TIMESERIES = 'TIMESERIES',
}

export const enum DatabaseEnum {
  ELASTICSEARCH_SERVERLESS = 'ELASTICSEARCH_SERVERLESS',
  RDS_MYSQL_SERVERLESS = 'RDS_MYSQL_SERVERLESS',
  RDS_PGSQL_SERVERLESS = 'RDS_PGSQL_SERVERLESS',
  RDS_MSSQL_SERVERLESS = 'RDS_MSSQL_SERVERLESS',
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
}

export type DatabaseRaw = {
  name: string;
  type: DatabaseEnum;
  version: string;
  engine_mode: DatabaseEngineMode;
  security: {
    basic_auth: {
      password: string;
    };
  };
  network?: {
    public: boolean;
  };
  cu?: {
    min?: number;
    max?: number;
  };
  storage?: {
    min: number;
  };
};

export type DatabaseDomain = {
  key: string;
  name: string;
  type: DatabaseEnum;
  version: DatabaseVersionEnum;
  engineMode: string;
  security: {
    basicAuth: {
      password: string;
    };
  };
  network?: {
    public: boolean;
  };
  cu: {
    min: number;
    max: number;
  };
  storage: {
    min: number;
  };
};
