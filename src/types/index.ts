import { Stages, Vars } from './domains/vars';
import { Tags } from './domains/tag';
import { EventDomain, EventRaw } from './domains/event';
import { DatabaseDomain, DatabaseRaw } from './domains/database';
import { FunctionDomain, FunctionRaw } from './domains/function';
import { Provider } from './domains/provider';
import { BucketDomain, BucketRaw } from './domains/bucket';
import { TableDomain, TableRaw } from './domains/table';
import { BackendConfig, BackendConfigRaw } from './domains/backend';
import { CertificateRaw, CertificateDomain } from './domains/certificate';

export * from './domains/resolvable';
export * from './domains/database';
export * from './domains/event';
export * from './domains/function';
export * from './domains/tag';
export * from './domains/vars';
export * from './domains/context';
export * from './domains/bucket';
export * from './domains/table';
export * from './domains/state';
export * from './domains/lock';
export * from './domains/backend';
export * from './domains/certificate';
export * from './assets';

export type ServerlessIacRaw = {
  version: string;
  app: string;
  provider: Provider;
  vars: Vars;
  stages: Stages;
  service: string;
  tags: Tags;
  backend?: BackendConfigRaw;
  functions: { [key: string]: FunctionRaw };
  events: { [key: string]: EventRaw };
  databases: { [key: string]: DatabaseRaw };
  tables: { [key: string]: TableRaw };
  buckets: { [key: string]: BucketRaw };
  certificates?: { [key: string]: CertificateRaw };
};

export type ServerlessIac = {
  version: string;
  app: string;
  provider: Provider;
  service: string;
  vars?: Vars;
  stages?: Stages;
  tags?: Array<{ key: string; value: string }>;
  backend?: BackendConfig;
  functions?: Array<FunctionDomain>;
  events?: Array<EventDomain>;
  databases?: Array<DatabaseDomain>;
  tables?: Array<TableDomain>;
  buckets?: Array<BucketDomain>;
  certificates?: Array<CertificateDomain>;
};
