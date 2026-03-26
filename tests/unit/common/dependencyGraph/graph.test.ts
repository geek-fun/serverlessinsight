import { PlanItem } from '../../../../src/types';
import {
  buildDependencyGraph,
  detectCycle,
  validateGraph,
  topologicalSort,
  getExecutionOrder,
  getParallelExecutionPlan,
  getDependencyInfo,
  toDotFormat,
} from '../../../../src/common/dependencyGraph/graph';
import { DependencyGraph } from '../../../../src/common/dependencyGraph/types';

const makeItem = (
  logicalId: string,
  action: 'create' | 'update' | 'delete' | 'noop',
  resourceType: string,
  changes?: PlanItem['changes'],
): PlanItem => ({ logicalId, action, resourceType, changes });

describe('DependencyGraph', () => {
  describe('buildDependencyGraph', () => {
    it('should build empty graph for empty items', () => {
      const graph = buildDependencyGraph([]);
      expect(graph.nodes.size).toBe(0);
      expect(graph.edges).toEqual([]);
    });

    it('should build graph with single item', () => {
      const items = [makeItem('functions.hello', 'create', 'ALIYUN_FC3')];
      const graph = buildDependencyGraph(items);
      expect(graph.nodes.size).toBe(1);
      expect(graph.nodes.get('functions.hello')?.dependencies).toEqual([]);
    });

    it('should add implicit type-order dependencies', () => {
      const items = [
        makeItem('databases.db1', 'create', 'ALIYUN_RDS_SERVERLESS'),
        makeItem('functions.fn1', 'create', 'ALIYUN_FC3'),
        makeItem('events.api1', 'create', 'ALIYUN_APIGW'),
      ];
      const graph = buildDependencyGraph(items);

      const fnNode = graph.nodes.get('functions.fn1');
      expect(fnNode?.dependencies).toContain('databases.db1');

      const evtNode = graph.nodes.get('events.api1');
      expect(evtNode?.dependencies).toContain('databases.db1');
      expect(evtNode?.dependencies).toContain('functions.fn1');
    });

    it('should add explicit reference dependencies', () => {
      const items = [
        makeItem('functions.fn1', 'create', 'ALIYUN_FC3'),
        makeItem('events.api1', 'create', 'ALIYUN_APIGW', {
          after: { backend: '${functions.fn1}' },
        }),
      ];
      const graph = buildDependencyGraph(items);

      const evtNode = graph.nodes.get('events.api1');
      expect(evtNode?.dependencies).toContain('functions.fn1');
    });

    it('should use reverse dependencies for delete actions', () => {
      const items = [
        makeItem('databases.db1', 'delete', 'ALIYUN_RDS_SERVERLESS'),
        makeItem('functions.fn1', 'delete', 'ALIYUN_FC3'),
        makeItem('events.api1', 'delete', 'ALIYUN_APIGW'),
      ];
      const graph = buildDependencyGraph(items);

      const dbNode = graph.nodes.get('databases.db1');
      expect(dbNode?.dependencies).toContain('functions.fn1');
      expect(dbNode?.dependencies).toContain('events.api1');
    });

    it('should not add dependencies on delete or noop items for create actions', () => {
      const items = [
        makeItem('databases.db1', 'delete', 'ALIYUN_RDS_SERVERLESS'),
        makeItem('functions.fn1', 'create', 'ALIYUN_FC3'),
      ];
      const graph = buildDependencyGraph(items);

      const fnNode = graph.nodes.get('functions.fn1');
      expect(fnNode?.dependencies).not.toContain('databases.db1');
    });

    it('should not add dependencies on noop items for create actions', () => {
      const items = [
        makeItem('databases.db1', 'noop', 'ALIYUN_RDS_SERVERLESS'),
        makeItem('functions.fn1', 'create', 'ALIYUN_FC3'),
      ];
      const graph = buildDependencyGraph(items);

      const fnNode = graph.nodes.get('functions.fn1');
      expect(fnNode?.dependencies).not.toContain('databases.db1');
    });

    it('should handle unknown resource type prefix', () => {
      const items = [
        makeItem('unknown.res1', 'create', 'UNKNOWN_TYPE'),
        makeItem('functions.fn1', 'create', 'ALIYUN_FC3'),
      ];
      const graph = buildDependencyGraph(items);
      expect(graph.nodes.size).toBe(2);
    });

    it('should handle references in nested objects and arrays', () => {
      const items = [
        makeItem('functions.fn1', 'create', 'ALIYUN_FC3'),
        makeItem('events.api1', 'create', 'ALIYUN_APIGW', {
          after: {
            triggers: [{ backend: '${functions.fn1}' }],
            config: { ref: '${functions.fn1}' },
          },
        }),
      ];
      const graph = buildDependencyGraph(items);

      const evtNode = graph.nodes.get('events.api1');
      expect(evtNode?.dependencies).toContain('functions.fn1');
    });

    it('should filter out invalid resource references', () => {
      const items = [
        makeItem('functions.fn1', 'create', 'ALIYUN_FC3', {
          after: { ref: '${some.invalid.deep.ref}' },
        }),
      ];
      const graph = buildDependencyGraph(items);
      const fnNode = graph.nodes.get('functions.fn1');
      expect(fnNode?.dependencies).toEqual([]);
    });

    it('should handle changes with no after field', () => {
      const items = [
        makeItem('functions.fn1', 'create', 'ALIYUN_FC3', {
          before: { old: 'value' },
        }),
      ];
      const graph = buildDependencyGraph(items);
      expect(graph.nodes.size).toBe(1);
    });

    it('should handle undefined changes', () => {
      const items = [makeItem('functions.fn1', 'create', 'ALIYUN_FC3', undefined)];
      const graph = buildDependencyGraph(items);
      expect(graph.nodes.size).toBe(1);
    });

    it('should handle non-string, non-array, non-object values in changes', () => {
      const items = [
        makeItem('functions.fn1', 'create', 'ALIYUN_FC3', {
          after: { count: 42, enabled: true, nothing: null },
        }),
      ];
      const graph = buildDependencyGraph(items);
      expect(graph.nodes.size).toBe(1);
    });

    it('should handle references to non-existent items', () => {
      const items = [
        makeItem('events.api1', 'create', 'ALIYUN_APIGW', {
          after: { backend: '${functions.nonexistent}' },
        }),
      ];
      const graph = buildDependencyGraph(items);
      const evtNode = graph.nodes.get('events.api1');
      expect(evtNode?.dependencies).not.toContain('functions.nonexistent');
    });

    it('should handle SCF and COS resource types', () => {
      const items = [
        makeItem('buckets.b1', 'create', 'COS_BUCKET'),
        makeItem('functions.fn1', 'create', 'SCF'),
      ];
      const graph = buildDependencyGraph(items);

      const fnNode = graph.nodes.get('functions.fn1');
      expect(fnNode?.dependencies).toContain('buckets.b1');
    });

    it('should handle Tencent TDSQL-C resource type', () => {
      const items = [
        makeItem('databases.db1', 'create', 'TDSQL_C_SERVERLESS'),
        makeItem('functions.fn1', 'create', 'SCF'),
      ];
      const graph = buildDependencyGraph(items);

      const fnNode = graph.nodes.get('functions.fn1');
      expect(fnNode?.dependencies).toContain('databases.db1');
    });

    it('should handle tablestore resource type', () => {
      const items = [
        makeItem('functions.fn1', 'create', 'ALIYUN_FC3'),
        makeItem('tables.t1', 'create', 'ALIYUN_TABLESTORE_TABLE'),
      ];
      const graph = buildDependencyGraph(items);

      const tableNode = graph.nodes.get('tables.t1');
      expect(tableNode?.dependencies).toContain('functions.fn1');
    });

    it('should handle ES serverless resource type', () => {
      const items = [
        makeItem('databases.es1', 'create', 'ALIYUN_ES_SERVERLESS'),
        makeItem('functions.fn1', 'create', 'ALIYUN_FC3'),
      ];
      const graph = buildDependencyGraph(items);

      const fnNode = graph.nodes.get('functions.fn1');
      expect(fnNode?.dependencies).toContain('databases.es1');
    });

    it('should not include delete items as dependency targets for delete actions', () => {
      const items = [
        makeItem('databases.db1', 'delete', 'ALIYUN_RDS_SERVERLESS'),
        makeItem('functions.fn1', 'create', 'ALIYUN_FC3'),
      ];
      const graph = buildDependencyGraph(items);

      const dbNode = graph.nodes.get('databases.db1');
      expect(dbNode?.dependencies).not.toContain('functions.fn1');
    });
  });

  describe('detectCycle', () => {
    it('should return null for acyclic graph', () => {
      const items = [
        makeItem('databases.db1', 'create', 'ALIYUN_RDS_SERVERLESS'),
        makeItem('functions.fn1', 'create', 'ALIYUN_FC3'),
      ];
      const graph = buildDependencyGraph(items);
      expect(detectCycle(graph)).toBeNull();
    });

    it('should detect cycle in graph', () => {
      const graph = buildDependencyGraph([]);
      graph.nodes.set('a', {
        id: 'a',
        planItem: makeItem('a', 'create', 'X'),
        dependencies: [],
        dependents: ['b'],
      });
      graph.nodes.set('b', {
        id: 'b',
        planItem: makeItem('b', 'create', 'X'),
        dependencies: ['a'],
        dependents: ['a'],
      });

      const cycle = detectCycle(graph);
      expect(cycle).not.toBeNull();
      expect(cycle).toContain('a');
      expect(cycle).toContain('b');
    });
  });

  describe('validateGraph', () => {
    it('should return null for valid graph', () => {
      const items = [makeItem('functions.fn1', 'create', 'ALIYUN_FC3')];
      const graph = buildDependencyGraph(items);
      expect(validateGraph(graph)).toBeNull();
    });

    it('should return CycleError for cyclic graph', () => {
      const graph = buildDependencyGraph([]);
      graph.nodes.set('a', {
        id: 'a',
        planItem: makeItem('a', 'create', 'X'),
        dependencies: [],
        dependents: ['b'],
      });
      graph.nodes.set('b', {
        id: 'b',
        planItem: makeItem('b', 'create', 'X'),
        dependencies: ['a'],
        dependents: ['a'],
      });

      const err = validateGraph(graph);
      expect(err).not.toBeNull();
      expect(err?.message).toContain('Circular dependency');
      expect(err?.cycle).toBeDefined();
    });
  });

  describe('topologicalSort', () => {
    it('should sort items by dependency order', () => {
      const items = [
        makeItem('databases.db1', 'create', 'ALIYUN_RDS_SERVERLESS'),
        makeItem('functions.fn1', 'create', 'ALIYUN_FC3'),
        makeItem('events.api1', 'create', 'ALIYUN_APIGW'),
      ];
      const graph = buildDependencyGraph(items);
      const levels = topologicalSort(graph);

      expect(levels.length).toBeGreaterThanOrEqual(1);
      const allItems = levels.flatMap((l) => l.items);
      const dbIdx = allItems.findIndex((i) => i.logicalId === 'databases.db1');
      const fnIdx = allItems.findIndex((i) => i.logicalId === 'functions.fn1');
      const evtIdx = allItems.findIndex((i) => i.logicalId === 'events.api1');
      expect(dbIdx).toBeLessThan(fnIdx);
      expect(fnIdx).toBeLessThan(evtIdx);
    });

    it('should handle empty graph', () => {
      const graph = buildDependencyGraph([]);
      const levels = topologicalSort(graph);
      expect(levels).toEqual([]);
    });

    it('should break early when no zero-indegree nodes remain (cyclic graph)', () => {
      const itemA = makeItem('functions.a', 'create', 'ALIYUN_FC3');
      const itemB = makeItem('functions.b', 'create', 'ALIYUN_FC3');
      const graph: DependencyGraph = {
        nodes: new Map([
          [
            'functions.a',
            {
              id: 'functions.a',
              planItem: itemA,
              dependencies: ['functions.b'],
              dependents: ['functions.b'],
            },
          ],
          [
            'functions.b',
            {
              id: 'functions.b',
              planItem: itemB,
              dependencies: ['functions.a'],
              dependents: ['functions.a'],
            },
          ],
        ]),
        edges: [
          { from: 'functions.b', to: 'functions.a' },
          { from: 'functions.a', to: 'functions.b' },
        ],
      };
      const levels = topologicalSort(graph);
      expect(levels).toEqual([]);
    });

    it('should sort items within same level by resource type order', () => {
      const items = [
        makeItem('databases.db1', 'create', 'ALIYUN_RDS_SERVERLESS'),
        makeItem('databases.db2', 'create', 'ALIYUN_ES_SERVERLESS'),
      ];
      const graph = buildDependencyGraph(items);
      const levels = topologicalSort(graph);

      expect(levels.length).toBe(1);
      expect(levels[0].items.length).toBe(2);
      const ids = levels[0].items.map((i) => i.logicalId);
      expect(ids).toContain('databases.db1');
      expect(ids).toContain('databases.db2');
    });
  });

  describe('getExecutionOrder', () => {
    it('should return empty array for empty input', () => {
      expect(getExecutionOrder([])).toEqual([]);
    });

    it('should return items in correct order', () => {
      const items = [
        makeItem('functions.fn1', 'create', 'ALIYUN_FC3'),
        makeItem('databases.db1', 'create', 'ALIYUN_RDS_SERVERLESS'),
      ];
      const order = getExecutionOrder(items);

      expect(order[0].logicalId).toBe('databases.db1');
      expect(order[1].logicalId).toBe('functions.fn1');
    });

    it('should throw on cyclic dependency', () => {
      expect(() => {
        const cyclicItems = [
          makeItem('functions.a', 'create', 'ALIYUN_FC3', {
            after: { ref: '${events.b}' },
          }),
          makeItem('events.b', 'create', 'ALIYUN_APIGW', {
            after: { ref: '${functions.a}' },
          }),
        ];
        getExecutionOrder(cyclicItems);
      }).toThrow(/Circular dependency detected/);
    });
  });

  describe('getParallelExecutionPlan', () => {
    it('should return empty for empty input', () => {
      expect(getParallelExecutionPlan([])).toEqual([]);
    });

    it('should return levels for parallel execution', () => {
      const items = [
        makeItem('databases.db1', 'create', 'ALIYUN_RDS_SERVERLESS'),
        makeItem('functions.fn1', 'create', 'ALIYUN_FC3'),
      ];
      const levels = getParallelExecutionPlan(items);
      expect(levels.length).toBeGreaterThanOrEqual(1);
    });

    it('should throw on cyclic dependency', () => {
      const cyclicItems = [
        makeItem('functions.a', 'create', 'ALIYUN_FC3', {
          after: { ref: '${events.b}' },
        }),
        makeItem('events.b', 'create', 'ALIYUN_APIGW', {
          after: { ref: '${functions.a}' },
        }),
      ];
      expect(() => getParallelExecutionPlan(cyclicItems)).toThrow(/Circular dependency detected/);
    });
  });

  describe('getDependencyInfo', () => {
    it('should return full info for valid items', () => {
      const items = [
        makeItem('databases.db1', 'create', 'ALIYUN_RDS_SERVERLESS'),
        makeItem('functions.fn1', 'create', 'ALIYUN_FC3'),
      ];
      const info = getDependencyInfo(items);
      expect(info.cycleError).toBeNull();
      expect(info.order.length).toBe(2);
      expect(info.levels.length).toBeGreaterThanOrEqual(1);
      expect(info.graph.nodes.size).toBe(2);
    });

    it('should return cycle error for cyclic graph', () => {
      const cyclicItems = [
        makeItem('functions.a', 'create', 'ALIYUN_FC3', {
          after: { ref: '${events.b}' },
        }),
        makeItem('events.b', 'create', 'ALIYUN_APIGW', {
          after: { ref: '${functions.a}' },
        }),
      ];
      const info = getDependencyInfo(cyclicItems);

      expect(info.cycleError).not.toBeNull();
      expect(info.cycleError!.message).toContain('Circular dependency detected');
      expect(info.order).toEqual([]);
      expect(info.levels).toEqual([]);
    });
  });

  describe('toDotFormat', () => {
    it('should generate DOT format for graph with create action', () => {
      const items = [makeItem('functions.fn1', 'create', 'ALIYUN_FC3')];
      const graph = buildDependencyGraph(items);
      const dot = toDotFormat(graph);

      expect(dot).toContain('digraph DependencyGraph');
      expect(dot).toContain('functions.fn1');
      expect(dot).toContain('green');
    });

    it('should generate DOT format for graph with delete action', () => {
      const items = [makeItem('functions.fn1', 'delete', 'ALIYUN_FC3')];
      const graph = buildDependencyGraph(items);
      const dot = toDotFormat(graph);

      expect(dot).toContain('red');
    });

    it('should generate DOT format for graph with update action', () => {
      const items = [makeItem('functions.fn1', 'update', 'ALIYUN_FC3')];
      const graph = buildDependencyGraph(items);
      const dot = toDotFormat(graph);

      expect(dot).toContain('orange');
    });

    it('should generate DOT format for graph with noop action', () => {
      const items = [makeItem('functions.fn1', 'noop', 'ALIYUN_FC3')];
      const graph = buildDependencyGraph(items);
      const dot = toDotFormat(graph);

      expect(dot).toContain('gray');
    });

    it('should generate edges in DOT format', () => {
      const items = [
        makeItem('databases.db1', 'create', 'ALIYUN_RDS_SERVERLESS'),
        makeItem('functions.fn1', 'create', 'ALIYUN_FC3'),
      ];
      const graph = buildDependencyGraph(items);
      const dot = toDotFormat(graph);

      expect(dot).toContain('->');
    });

    it('should escape special characters in DOT format', () => {
      const items = [makeItem('functions.fn"special', 'create', 'ALIYUN_FC3')];
      const graph = buildDependencyGraph(items);
      const dot = toDotFormat(graph);

      expect(dot).toContain('\\"');
    });
  });
});
