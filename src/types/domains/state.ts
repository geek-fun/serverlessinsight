export type ResourceState = {
  type: string;
  physicalId: string;
  region: string;
  configHash: string;
  lastUpdated: string;
  metadata?: Record<string, unknown>;
};

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
