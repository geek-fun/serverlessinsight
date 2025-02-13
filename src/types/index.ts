import { Stages, Vars } from './domains/vars';
import { Tags } from './domains/tag';
import { EventDomain, EventRaw } from './domains/event';
import { DatabaseDomain, DatabaseRaw } from './domains/database';
import { FunctionDomain, FunctionRaw } from './domains/function';
import { Provider } from './domains/provider';
import { BucketDomain, BucketRaw } from './domains/bucket';

export * from './domains/database';
export * from './domains/event';
export * from './domains/function';
export * from './domains/tag';
export * from './domains/vars';
export * from './domains/context';
export * from './domains/bucket';
export * from './assets';

export type ServerlessIacRaw = {
  version: string;
  provider: Provider;
  vars: Vars;
  stages: Stages;
  service: string;
  tags: Tags;
  functions: { [key: string]: FunctionRaw };
  events: { [key: string]: EventRaw };
  databases: { [key: string]: DatabaseRaw };
  buckets: { [key: string]: BucketRaw };
};

export type ServerlessIac = {
  version: string;
  provider: Provider;
  service: string;
  vars?: Vars;
  stages?: Stages;
  tags?: Array<{ key: string; value: string }>;
  functions?: Array<FunctionDomain>;
  events?: Array<EventDomain>;
  databases?: Array<DatabaseDomain>;
  buckets?: Array<BucketDomain>;
};
