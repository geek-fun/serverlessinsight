export enum ResourceTypeEnum {
  SCF_FUNCTION = 'SCF_FUNCTION',
  COS_BUCKET = 'COS_BUCKET',
  TDSQL_C_SERVERLESS = 'TDSQL_C_SERVERLESS',
  ALIYUN_FC3_FUNCTION = 'ALIYUN_FC3_FUNCTION',
  ALIYUN_APIGW_GROUP = 'ALIYUN_APIGW_GROUP',
  ALIYUN_APIGW_API = 'ALIYUN_APIGW_API',
  ALIYUN_APIGW_DEPLOYMENT = 'ALIYUN_APIGW_DEPLOYMENT',
  ALIYUN_OSS_BUCKET = 'ALIYUN_OSS_BUCKET',
}

export type ResourceAttributes = Record<string, unknown>;

export type ResourceMode = 'managed' | 'data';

export type ResourceInstance = {
  arn: string;
  id: string;
  [key: string]: unknown;
};

export type ResourceState = {
  mode: ResourceMode;
  region: string;
  definition: ResourceAttributes;
  instances: Array<ResourceInstance>;
  lastUpdated: string;
  metadata?: Record<string, unknown>;
};

export const CURRENT_STATE_VERSION = '1.0';

export type StateFile = {
  version: string;
  provider: string;
  resources: Record<string, ResourceState>;
};

export type PlanAction = 'create' | 'update' | 'delete' | 'noop' | 'refresh';

export type PlanItem = {
  logicalId: string;
  action: PlanAction;
  resourceType: string;
  changes?: {
    before?: Record<string, unknown>;
    after?: Record<string, unknown>;
  };
  drifted?: boolean;
};

export type Plan = {
  items: Array<PlanItem>;
};
