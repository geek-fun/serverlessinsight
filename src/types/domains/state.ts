export enum ResourceTypeEnum {
  SCF_FUNCTION = 'SCF_FUNCTION',
  COS_BUCKET = 'COS_BUCKET',
  TDSQL_C_SERVERLESS = 'TDSQL_C_SERVERLESS',
  ALIYUN_FC3_FUNCTION = 'ALIYUN_FC3_FUNCTION',
  ALIYUN_APIGW_GROUP = 'ALIYUN_APIGW_GROUP',
  ALIYUN_APIGW_API = 'ALIYUN_APIGW_API',
  ALIYUN_APIGW_DEPLOYMENT = 'ALIYUN_APIGW_DEPLOYMENT',
  ALIYUN_APIGW_DNS_VERIFICATION = 'ALIYUN_APIGW_DNS_VERIFICATION',
  ALIYUN_OSS_BUCKET = 'ALIYUN_OSS_BUCKET',
  ALIYUN_RDS_SERVERLESS = 'ALIYUN_RDS_SERVERLESS',
  ALIYUN_ES_SERVERLESS = 'ALIYUN_ES_SERVERLESS',
  ALIYUN_TABLESTORE_TABLE = 'ALIYUN_TABLESTORE_TABLE',
}

export type ResourceAttributes = Record<string, unknown>;

export type ResourceMode = 'managed' | 'data';

export type ResourceStatus = 'ready' | 'tainted';

export type ResourceInstance = {
  sid: string;
  id: string;
  [key: string]: unknown;
};

export type ResourceState = {
  mode: ResourceMode;
  region: string;
  definition: ResourceAttributes;
  instances: Array<ResourceInstance>;
  lastUpdated: string;
  status?: ResourceStatus;
  metadata?: Record<string, unknown>;
};

export const CURRENT_STATE_VERSION = '3.0';

export type StageState = {
  resources: Record<string, ResourceState>;
};

export type StateFile = {
  version: string;
  provider: string;
  app: string;
  service: string;
  stages: Record<string, StageState>;
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

export type SaveStateFn = (state: StateFile) => void;

export type PartialFailureError = {
  failedItem: PlanItem;
  error: Error;
  successfulItems: Array<PlanItem>;
};

export type ExecutionResult = {
  state: StateFile;
  partialFailure?: PartialFailureError;
};

export class PartialResourceError extends Error {
  readonly updatedState: StateFile;
  readonly cause: Error;

  constructor(updatedState: StateFile, cause: Error) {
    super(`Partial resource creation failed: ${cause.message}`);
    this.name = 'PartialResourceError';
    this.updatedState = updatedState;
    this.cause = cause;
  }
}
