import { PlanItem } from '../../types';

export type DependencyEdge = {
  from: string;
  to: string;
};

export type DependencyNode = {
  id: string;
  planItem: PlanItem;
  dependencies: Array<string>;
  dependents: Array<string>;
};

export type DependencyGraph = {
  nodes: Map<string, DependencyNode>;
  edges: Array<DependencyEdge>;
};

export type ExecutionLevel = {
  level: number;
  items: Array<PlanItem>;
};

export type ExecutionPlan = {
  levels: Array<ExecutionLevel>;
  hasCycle: boolean;
  cycleNodes?: Array<string>;
};

export type CycleError = {
  message: string;
  cycle: Array<string>;
};
