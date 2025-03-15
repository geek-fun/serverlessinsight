import { ProviderEnum } from '../../common';

export type Context = {
  region: string;
  provider: ProviderEnum;
  stackName: string;
  stage: string;
  accessKeyId: string;
  accessKeySecret: string;
  securityToken?: string;
  iacLocation: string;
  parameters?: Array<{ key: string; value: string }>;
  stages?: {
    [stage: string]: Array<{ key: string; value: string }>;
  };
  tags?: Array<{ key: string; value: string }>;
};

export enum TemplateFormat {
  YAML = 'YAML',
  JSON = 'JSON',
}
