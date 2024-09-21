type Vars = {
  [key: string]: unknown;
};

type Stage = {
  [key: string]: string;
};

type Stages = {
  [key: string]: Stage;
};

export type IacFunction = {
  name: string;
  runtime: string;
  handler: string;
  zip: string;
  memory: number;
  timeout: number;
  environment: {
    [key: string]: string;
  };
};

type Functions = {
  [key: string]: IacFunction;
};

export type Event = {
  type: string;
  source: string;
  function: string;
  batch_size?: number;
  enabled?: boolean;
  target: string;
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
  functions: Functions;
  events: Events;
};

export type ServerlessIac = {
  version: string;
  provider: string;
  vars: Vars;
  stages: Stages;
  service: string;
  tags: Array<string>;
  functions: Array<IacFunction>;
  events: Array<Event>;
};

export type ActionContext = {
  region: string;
  accessKeyId: string;
  accessKeySecret: string;
  securityToken?: string;
  iacLocation: string;
  parameters?: Array<{ key: string; value: string }>;
  tags?: Array<{ key: string; value: string }>;
};
