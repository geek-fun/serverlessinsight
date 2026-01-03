export enum ResourceTypeEnum {
  SCF_FUNCTION = 'SCF_FUNCTION',
  COS_BUCKET = 'COS_BUCKET',
  TDSQL_C_SERVERLESS = 'TDSQL_C_SERVERLESS',
}

/**
 * ResourceAttributes stores all known attributes for a resource.
 * This follows Terraform's approach of storing complete resource state.
 */
export type ResourceAttributes = Record<string, unknown>;

/**
 * Resource mode - whether the resource is managed by ServerlessInsight or imported.
 * Similar to Terraform's resource mode.
 */
export type ResourceMode = 'managed' | 'data';

/**
 * ResourceState represents the state of a single resource.
 * Following Terraform's design, we store all attributes individually
 * for precise drift detection and auditing.
 */
export type ResourceState = {
  /** Resource mode - 'managed' for resources managed by ServerlessInsight, 'data' for imported/referenced resources */
  mode: ResourceMode;
  /** ARN or unique identifier of the resource in the cloud provider */
  arn: string;
  region: string;
  /** All known attributes for this resource */
  attributes: ResourceAttributes;
  /** Hash of external artifacts (e.g., function code zip). Used for code drift detection. */
  codeHash?: string;
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
