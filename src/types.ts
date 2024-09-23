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
};

export type ServerlessIac = {
  version: string;
  provider: string;
  vars: Vars;
  stages: Stages;
  service: string;
  tags: Array<{ key: string; value: string }>;
  functions: Array<IacFunction>;
  events: Array<Event>;
};

export type ActionContext = {
  stage: string;
  region: string;
  accessKeyId: string;
  accessKeySecret: string;
  securityToken?: string;
  iacLocation: string;
  parameters?: Array<{ key: string; value: string }>;
  tags?: Array<{ key: string; value: string }>;
};
