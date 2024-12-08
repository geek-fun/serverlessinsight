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
