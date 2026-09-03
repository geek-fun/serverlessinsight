import { ProviderEnum } from '../../common';
import { ServerlessIac } from '../index';
import type { DeploymentEventRecord } from '../../common/eventQueue';
import type { RefreshCache } from '../../common/refreshCache';

export type Context = {
  region: string;
  accountId?: string;
  provider: ProviderEnum;
  app: string;
  service: string;
  stage: string;
  accessKeyId: string;
  accessKeySecret: string;
  securityToken?: string;
  iacLocation: string;
  parameters?: Array<{ key: string; value: string }>;
  stages?: {
    [stage: string]: Array<{ key: string; value: string }> | Record<string, string>;
  };
  tags?: Array<{ key: string; value: string }>;
  iac?: ServerlessIac;
  /** ADR-005: emit a typed deployment event (executors call this per resource op). */
  reportEvent?: (event: DeploymentEventRecord) => void;
  /** Command-lifecycle cache for planning/refresh reads (created by setContext); executor reads must not use it. */
  refreshCache?: RefreshCache;
};

export enum TemplateFormat {
  YAML = 'YAML',
  JSON = 'JSON',
}
