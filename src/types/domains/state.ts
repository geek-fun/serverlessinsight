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
 * ResourceState represents the state of a single resource.
 * Following Terraform's design, we store all attributes individually
 * for precise drift detection and auditing.
 */
export type ResourceState = {
  type: string;
  physicalId: string;
  region: string;
  /** @deprecated Use attributes instead. Kept for backward compatibility with v0.1 state files. */
  configHash?: string;
  /** All known attributes for this resource */
  attributes: ResourceAttributes;
  /** Hash of external artifacts (e.g., function code zip). Used for code drift detection. */
  codeHash?: string;
  lastUpdated: string;
  metadata?: Record<string, unknown>;
};

export const STATE_VERSION_V1 = '0.1';
export const STATE_VERSION_V2 = '0.2';
export const CURRENT_STATE_VERSION = STATE_VERSION_V2;

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
