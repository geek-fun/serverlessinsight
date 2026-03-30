export enum ResourceTypeEnum {
  // Tencent Cloud
  SCF_FUNCTION = 'SCF_FUNCTION',
  COS_BUCKET = 'COS_BUCKET',
  COS_DNS_CNAME = 'TENCENT_COS_DNS_CNAME',
  TDSQL_C_SERVERLESS = 'TDSQL_C_SERVERLESS',

  // Aliyun - Primary Resources
  ALIYUN_FC3_FUNCTION = 'ALIYUN_FC3_FUNCTION',
  ALIYUN_APIGW_GROUP = 'ALIYUN_APIGW_GROUP',
  ALIYUN_APIGW_API = 'ALIYUN_APIGW_API',
  ALIYUN_APIGW_DEPLOYMENT = 'ALIYUN_APIGW_DEPLOYMENT',
  ALIYUN_APIGW_DNS_VERIFICATION = 'ALIYUN_APIGW_DNS_VERIFICATION',
  ALIYUN_OSS_BUCKET = 'ALIYUN_OSS_BUCKET',
  ALIYUN_OSS_DNS_CNAME = 'ALIYUN_OSS_DNS_CNAME',
  ALIYUN_RDS_SERVERLESS = 'ALIYUN_RDS_SERVERLESS',
  ALIYUN_ES_SERVERLESS = 'ALIYUN_ES_SERVERLESS',
  ALIYUN_TABLESTORE_TABLE = 'ALIYUN_TABLESTORE_TABLE',

  // Aliyun - FC3 Dependent Resources
  ALIYUN_SLS_PROJECT = 'ALIYUN_SLS_PROJECT',
  ALIYUN_SLS_LOGSTORE = 'ALIYUN_SLS_LOGSTORE',
  ALIYUN_SLS_INDEX = 'ALIYUN_SLS_INDEX',
  ALIYUN_RAM_ROLE = 'ALIYUN_RAM_ROLE',
  ALIYUN_ECS_SECURITY_GROUP = 'ALIYUN_ECS_SECURITY_GROUP',
  ALIYUN_NAS_ACCESS_GROUP = 'ALIYUN_NAS_ACCESS_GROUP',
  ALIYUN_NAS_FILE_SYSTEM = 'ALIYUN_NAS_FILE_SYSTEM',
  ALIYUN_NAS_MOUNT_TARGET = 'ALIYUN_NAS_MOUNT_TARGET',

  // Volcengine - Primary Resources
  VOLCENGINE_VEFAAS_FUNCTION = 'VOLCENGINE_VEFAAS_FUNCTION',
  VOLCENGINE_TOS_BUCKET = 'VOLCENGINE_TOS_BUCKET',
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

export type AttributeDiff = {
  key: string;
  before?: unknown;
  after?: unknown;
  action: 'add' | 'change' | 'remove';
  isComputed?: boolean;
  children?: AttributeDiff[];
};

export type PlanDisplayConfig = {
  colorize: boolean;
  indentSize: number;
  keyAlignWidth: number;
  showUnchangedAttributes: boolean;
  maxUnchangedHidden: number;
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
