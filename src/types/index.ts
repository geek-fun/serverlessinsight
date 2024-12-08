import { Stages, Vars } from './vars';
import { Tags } from './tag';
import { EventDomain, EventRaw } from './event';
import { DatabaseDomain, DatabaseRaw } from './database';
import { FunctionDomain, FunctionRaw } from './function';

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

export * from './database';
export * from './event';
export * from './function';
export * from './tag';
export * from './vars';
export * from './context';
