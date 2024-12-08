export enum DatabaseEngineMode {
  SEARCH = 'SEARCH',
  TIMESERIES = 'TIMESERIES',
}
export enum DatabaseEnum {
  ELASTICSEARCH_SERVERLESS = 'ELASTICSEARCH_SERVERLESS',
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
  cu: number;
  storage_size: number;
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
  cu: number;
  storageSize: number;
};
