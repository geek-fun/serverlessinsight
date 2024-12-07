type Vars = {
  [key: string]: unknown;
};

type Stage = {
  [key: string]: string;
};

type Stages = {
  [key: string]: Stage;
};

export enum EventTypes {
  API_GATEWAY = 'API_GATEWAY',
}

export type IacFunction = {
  name: string;
  key: string;
  runtime: string;
  handler: string;
  code: string;
  memory: number;
  timeout: number;
  environment: {
    [key: string]: string;
  };
};

export type Event = {
  key: string;
  name: string;
  type: EventTypes;
  triggers: Array<{
    method: string;
    path: string;
    backend: string;
  }>;
};

type Events = {
  [key: string]: Event;
};

type Tags = {
  [key: string]: string;
};

export type RawServerlessIac = {
  version: string;
  provider: string;
  vars: Vars;
  stages: Stages;
  service: string;
  tags: Tags;
  functions: { [key: string]: IacFunction };
  events: Events;
  databases: { [key: string]: IacDatabase };
};

export enum DatabaseEnum {
  ELASTICSEARCH_SERVERLESS = 'ELASTICSEARCH_SERVERLESS',
}

export enum DatabaseEngineMode {
  SEARCH = 'SEARCH',
  TIMESERIES = 'TIMESERIES',
}

export type IacDatabase = {
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
  cu: number;
  storageSize: number;
};

export type ServerlessIac = {
  version: string;
  provider: string;
  service: string;
  vars?: Vars;
  stages?: Stages;
  tags?: Array<{ key: string; value: string }>;
  functions?: Array<IacFunction>;
  events?: Array<Event>;
  databases?: Array<IacDatabase>;
};

export type ActionContext = {
  stage: string;
  stackName: string;
  region: string;
  accessKeyId: string;
  accessKeySecret: string;
  securityToken?: string;
  iacLocation: string;
  parameters?: Array<{ key: string; value: string }>;
  tags?: Array<{ key: string; value: string }>;
};

export enum TemplateFormat {
  YAML = 'YAML',
  JSON = 'JSON',
}
