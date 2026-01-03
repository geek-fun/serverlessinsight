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
 * ResourceInstance represents a single cloud resource instance created for a resource definition.
 * A single resource definition in the IaC template may create multiple cloud resources.
 * For example, a function definition may create: SCF function, triggers, log services, etc.
 */
export type ResourceInstance = {
  /** ARN of the resource instance in the cloud provider */
  arn: string;
  /** Provider-specific ID of the resource instance */
  id: string;
  /** All known attributes of this resource instance from the provider */
  attributes: ResourceAttributes;
};

/**
 * ResourceState represents the state of a single resource definition.
 * Following Terraform's design, we store all attributes individually
 * for precise drift detection and auditing.
 */
export type ResourceState = {
  /** Resource mode - 'managed' for resources managed by ServerlessInsight, 'data' for imported/referenced resources */
  mode: ResourceMode;
  /** Region where the resource is deployed */
  region: string;
  /**
   * Definition of the resource as specified in the IaC template.
   * This should match the IaC template used to deploy the resource.
   * The plan should print out the definition difference if any.
   */
  definition: ResourceAttributes;
  /**
   * List of resource instances created for this resource definition.
   * A single resource definition may create multiple cloud resources.
   * For example, a function may also create buckets, triggers, log services behind the scene.
   * Each instance is recorded to exactly match provider's real resources.
   */
  instances: Array<ResourceInstance>;
  /** Timestamp of the last update to this resource state */
  lastUpdated: string;
  /** Optional provider-specific metadata */
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
