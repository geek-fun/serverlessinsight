import { Stages, Vars } from './domains/vars';
import { Tags } from './domains/tag';
import { EventDomain, EventRaw } from './domains/event';
import { DatabaseDomain, DatabaseRaw } from './domains/database';
import { FunctionDomain, FunctionRaw } from './domains/function';

export type ServerlessIacRaw = {
  version: string;
  provider: string;
  vars: Vars;
  stages: Stages;
  service: string;
  tags: Tags;
  functions: { [key: string]: FunctionRaw };
  events: { [key: string]: EventRaw };
  databases: { [key: string]: DatabaseRaw };
};

export type ServerlessIac = {
  version: string;
  provider: string;
  service: string;
  vars?: Vars;
  stages?: Stages;
  tags?: Array<{ key: string; value: string }>;
  functions?: Array<FunctionDomain>;
  events?: Array<EventDomain>;
  databases?: Array<DatabaseDomain>;
};

export * from './domains/database';
export * from './domains/event';
export * from './domains/function';
export * from './domains/tag';
export * from './domains/vars';
export * from './domains/context';
