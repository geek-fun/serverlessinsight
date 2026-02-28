import { PlanItem } from '../../types';
import {
  DependencyEdge,
  DependencyGraph,
  DependencyNode,
  ExecutionLevel,
  CycleError,
} from './types';

const RESOURCE_TYPE_PREFIX_MAP: Record<string, string> = {
  // Aliyun resource types (as emitted by planners)
  ALIYUN_FC3: 'functions',
  ALIYUN_OSS_BUCKET: 'buckets',
  ALIYUN_APIGW: 'events',
  ALIYUN_APIGW_GROUP: 'events',
  ALIYUN_APIGW_API: 'events',
  ALIYUN_APIGW_DEPLOYMENT: 'events',
  ALIYUN_RDS_SERVERLESS: 'databases',
  ALIYUN_ES_SERVERLESS: 'databases',
  ALIYUN_TABLESTORE_TABLE: 'tables',
  // Tencent resource types (as emitted by planners)
  SCF: 'functions',
  COS_BUCKET: 'buckets',
  TDSQL_C_SERVERLESS: 'databases',
};

const RESOURCE_DEPENDENCY_ORDER: Record<string, number> = {
  databases: 0,
  buckets: 1,
  functions: 2,
  tables: 3,
  events: 4,
};

const getResourcePrefix = (logicalId: string): string => logicalId.split('.')[0];

const getResourceTypeOrder = (resourceType: string): number => {
  const prefix = RESOURCE_TYPE_PREFIX_MAP[resourceType] || 'unknown';
  return RESOURCE_DEPENDENCY_ORDER[prefix] ?? 99;
};

const getPrefixOrder = (prefix: string): number => RESOURCE_DEPENDENCY_ORDER[prefix] ?? 99;

const extractReferencedResources = (changes?: {
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
}): Array<string> => {
  if (!changes) return [];

  const isValidResourceReference = (ref: string): boolean => {
    const validPrefixes = ['functions', 'events', 'databases', 'buckets', 'tables'];
    const prefix = ref.split('.')[0];
    return validPrefixes.includes(prefix);
  };

  const findReferences = (obj: unknown): Array<string> => {
    if (typeof obj === 'string') {
      const matches = obj.match(/\$\{([^}]+)\}/g) || [];
      return matches.map((m) => m.replace(/\$\{|\}/g, '')).filter(isValidResourceReference);
    }
    if (Array.isArray(obj)) {
      return obj.flatMap(findReferences);
    }
    if (typeof obj === 'object' && obj !== null) {
      return Object.values(obj).flatMap(findReferences);
    }
    return [];
  };

  const afterRefs = findReferences(changes.after);
  return [...new Set(afterRefs)];
};

const inferDependenciesFromType = (item: PlanItem, allItems: Array<PlanItem>): Array<string> => {
  const sourcePrefix = getResourcePrefix(item.logicalId);
  const sourceOrder = getPrefixOrder(sourcePrefix);

  return allItems
    .filter((other) => {
      if (other.logicalId === item.logicalId) return false;
      const targetPrefix = getResourcePrefix(other.logicalId);
      const targetOrder = getPrefixOrder(targetPrefix);
      return targetOrder < sourceOrder && other.action !== 'delete' && other.action !== 'noop';
    })
    .map((dep) => dep.logicalId);
};

const findDependencies = (item: PlanItem, allItems: Array<PlanItem>): Array<string> => {
  const itemsByLogicalId = new Map(allItems.map((i) => [i.logicalId, i]));

  const explicitRefs = extractReferencedResources(item.changes);
  const explicitDeps = explicitRefs
    .filter((ref) => itemsByLogicalId.has(ref))
    .filter((ref) => {
      const depItem = itemsByLogicalId.get(ref);
      return depItem && depItem.action !== 'delete' && depItem.action !== 'noop';
    });

  const implicitDeps = item.action !== 'delete' ? inferDependenciesFromType(item, allItems) : [];

  return [...new Set([...explicitDeps, ...implicitDeps])];
};

const findDestroyDependencies = (item: PlanItem, allItems: Array<PlanItem>): Array<string> => {
  const sourcePrefix = getResourcePrefix(item.logicalId);
  const sourceOrder = getPrefixOrder(sourcePrefix);

  return allItems
    .filter((other) => {
      if (other.logicalId === item.logicalId) return false;
      if (other.action !== 'delete') return false;
      const targetPrefix = getResourcePrefix(other.logicalId);
      const targetOrder = getPrefixOrder(targetPrefix);
      return targetOrder > sourceOrder;
    })
    .map((dep) => dep.logicalId);
};

export const buildDependencyGraph = (items: Array<PlanItem>): DependencyGraph => {
  const nodes = new Map<string, DependencyNode>();
  const edges: Array<DependencyEdge> = [];

  items.forEach((item) => {
    nodes.set(item.logicalId, {
      id: item.logicalId,
      planItem: item,
      dependencies: [],
      dependents: [],
    });
  });

  items.forEach((item) => {
    const deps =
      item.action === 'delete'
        ? findDestroyDependencies(item, items)
        : findDependencies(item, items);

    deps.forEach((depId) => {
      const node = nodes.get(item.logicalId);
      const depNode = nodes.get(depId);
      if (node && depNode) {
        node.dependencies.push(depId);
        depNode.dependents.push(item.logicalId);
        edges.push({ from: depId, to: item.logicalId });
      }
    });
  });

  return { nodes, edges };
};

export const detectCycle = (graph: DependencyGraph): Array<string> | null => {
  const visited = new Set<string>();
  const recursionStack = new Set<string>();
  const path: Array<string> = [];

  const dfs = (nodeId: string): Array<string> | null => {
    visited.add(nodeId);
    recursionStack.add(nodeId);
    path.push(nodeId);

    const node = graph.nodes.get(nodeId);
    if (node) {
      for (const depId of node.dependents) {
        if (!visited.has(depId)) {
          const cycle = dfs(depId);
          if (cycle) return cycle;
        } else if (recursionStack.has(depId)) {
          const cycleStart = path.indexOf(depId);
          return [...path.slice(cycleStart), depId];
        }
      }
    }

    path.pop();
    recursionStack.delete(nodeId);
    return null;
  };

  for (const nodeId of graph.nodes.keys()) {
    if (!visited.has(nodeId)) {
      const cycle = dfs(nodeId);
      if (cycle) return cycle;
    }
  }

  return null;
};

export const validateGraph = (graph: DependencyGraph): CycleError | null => {
  const cycle = detectCycle(graph);
  if (cycle) {
    return {
      message: `Circular dependency detected: ${cycle.join(' -> ')}`,
      cycle,
    };
  }
  return null;
};

export const topologicalSort = (graph: DependencyGraph): Array<ExecutionLevel> => {
  const inDegree = new Map<string, number>();
  const remaining = new Set<string>();

  graph.nodes.forEach((node, id) => {
    inDegree.set(id, node.dependencies.length);
    remaining.add(id);
  });

  const levels: Array<ExecutionLevel> = [];
  let level = 0;

  while (remaining.size > 0) {
    const currentLevel: Array<PlanItem> = [];

    remaining.forEach((id) => {
      if (inDegree.get(id) === 0) {
        const node = graph.nodes.get(id);
        if (node) {
          currentLevel.push(node.planItem);
        }
      }
    });

    if (currentLevel.length === 0) {
      break;
    }

    currentLevel.sort(
      (a, b) => getResourceTypeOrder(a.resourceType) - getResourceTypeOrder(b.resourceType),
    );

    levels.push({ level, items: currentLevel });

    currentLevel.forEach((item) => {
      remaining.delete(item.logicalId);
      const node = graph.nodes.get(item.logicalId);
      if (node) {
        node.dependents.forEach((depId) => {
          const deg = inDegree.get(depId) ?? 0;
          inDegree.set(depId, deg - 1);
        });
      }
    });

    level++;
  }

  return levels;
};

export const getExecutionOrder = (items: Array<PlanItem>): Array<PlanItem> => {
  if (items.length === 0) return [];

  const graph = buildDependencyGraph(items);
  const cycleError = validateGraph(graph);

  if (cycleError) {
    throw new Error(cycleError.message);
  }

  const levels = topologicalSort(graph);
  return levels.flatMap((level) => level.items);
};

export const getParallelExecutionPlan = (items: Array<PlanItem>): Array<ExecutionLevel> => {
  if (items.length === 0) return [];

  const graph = buildDependencyGraph(items);
  const cycleError = validateGraph(graph);

  if (cycleError) {
    throw new Error(cycleError.message);
  }

  return topologicalSort(graph);
};

export const getDependencyInfo = (
  items: Array<PlanItem>,
): {
  graph: DependencyGraph;
  order: Array<PlanItem>;
  levels: Array<ExecutionLevel>;
  cycleError: CycleError | null;
} => {
  const graph = buildDependencyGraph(items);
  const cycleError = validateGraph(graph);

  if (cycleError) {
    return {
      graph,
      order: [],
      levels: [],
      cycleError,
    };
  }

  const levels = topologicalSort(graph);
  const order = levels.flatMap((level) => level.items);

  return {
    graph,
    order,
    levels,
    cycleError: null,
  };
};

const escapeDotString = (str: string): string =>
  str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');

export const toDotFormat = (graph: DependencyGraph): string => {
  const lines = ['digraph DependencyGraph {', '  rankdir=TB;', '  node [shape=box];', ''];

  graph.nodes.forEach((node) => {
    const escapedId = escapeDotString(node.id);
    const escapedLogicalId = escapeDotString(node.planItem.logicalId);
    const label = `${escapedLogicalId}\\n[${node.planItem.action}]`;
    const color =
      node.planItem.action === 'create'
        ? 'green'
        : node.planItem.action === 'delete'
          ? 'red'
          : node.planItem.action === 'update'
            ? 'orange'
            : 'gray';
    lines.push(`  "${escapedId}" [label="${label}", color="${color}"];`);
  });

  lines.push('');

  graph.edges.forEach((edge) => {
    const escapedFrom = escapeDotString(edge.from);
    const escapedTo = escapeDotString(edge.to);
    lines.push(`  "${escapedFrom}" -> "${escapedTo}";`);
  });

  lines.push('}');
  return lines.join('\n');
};
