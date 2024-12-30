export enum DatabaseEngineMode {
  SEARCH = 'SEARCH',
  TIMESERIES = 'TIMESERIES',
}
export const enum DatabaseEnum {
  ELASTICSEARCH_SERVERLESS = 'ELASTICSEARCH_SERVERLESS',
  RDS_MYSQL_SERVERLESS = 'RDS_MYSQL_SERVERLESS',
  RDS_POSTGRESQL_SERVERLESS = 'RDS_POSTGRESQL_SERVERLESS',
  RDS_SQLSERVER_SERVERLESS = 'RDS_SQLSERVER_SERVERLESS',
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
  version: string;
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
