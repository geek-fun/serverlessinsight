import {
  buildDependencyGraph,
  detectCycle,
  validateGraph,
  topologicalSort,
  getExecutionOrder,
  getParallelExecutionPlan,
  getDependencyInfo,
  toDotFormat,
} from '../../../src/common/dependencyGraph';
import { PlanItem } from '../../../src/types';

describe('DependencyGraph', () => {
  describe('buildDependencyGraph', () => {
    it('should build an empty graph from empty items', () => {
      const items: Array<PlanItem> = [];
      const graph = buildDependencyGraph(items);

      expect(graph.nodes.size).toBe(0);
      expect(graph.edges.length).toBe(0);
    });

    it('should build graph with single item', () => {
      const items: Array<PlanItem> = [
        { logicalId: 'functions.fn1', action: 'create', resourceType: 'ALIYUN_FC3_FUNCTION' },
      ];
      const graph = buildDependencyGraph(items);

      expect(graph.nodes.size).toBe(1);
      expect(graph.nodes.get('functions.fn1')).toBeDefined();
      expect(graph.edges.length).toBe(0);
    });

    it('should infer dependencies based on resource type order', () => {
      const items: Array<PlanItem> = [
        { logicalId: 'functions.fn1', action: 'create', resourceType: 'ALIYUN_FC3_FUNCTION' },
        {
          logicalId: 'events.event1',
          action: 'create',
          resourceType: 'ALIYUN_APIGW',
          changes: { after: { backend: '${functions.fn1}' } },
        },
      ];
      const graph = buildDependencyGraph(items);

      expect(graph.nodes.size).toBe(2);
      const eventNode = graph.nodes.get('events.event1');
      expect(eventNode?.dependencies).toContain('functions.fn1');
    });

    it('should detect explicit references in changes', () => {
      const items: Array<PlanItem> = [
        { logicalId: 'functions.fn1', action: 'create', resourceType: 'ALIYUN_FC3_FUNCTION' },
        {
          logicalId: 'events.event1',
          action: 'create',
          resourceType: 'ALIYUN_APIGW',
          changes: {
            after: {
              triggers: [{ backend: '${functions.fn1}' }],
            },
          },
        },
      ];
      const graph = buildDependencyGraph(items);

      const eventNode = graph.nodes.get('events.event1');
      expect(eventNode?.dependencies).toContain('functions.fn1');
    });

    it('should handle delete action dependencies (reverse order)', () => {
      const items: Array<PlanItem> = [
        { logicalId: 'functions.fn1', action: 'delete', resourceType: 'ALIYUN_FC3_FUNCTION' },
        { logicalId: 'events.event1', action: 'delete', resourceType: 'ALIYUN_APIGW' },
      ];
      const graph = buildDependencyGraph(items);

      const fnNode = graph.nodes.get('functions.fn1');
      expect(fnNode?.dependencies).toContain('events.event1');
    });
  });

  describe('detectCycle', () => {
    it('should return null for acyclic graph', () => {
      const items: Array<PlanItem> = [
        { logicalId: 'functions.fn1', action: 'create', resourceType: 'ALIYUN_FC3_FUNCTION' },
        { logicalId: 'events.event1', action: 'create', resourceType: 'ALIYUN_APIGW' },
      ];
      const graph = buildDependencyGraph(items);
      const cycle = detectCycle(graph);

      expect(cycle).toBeNull();
    });

    it('should return null for empty graph', () => {
      const graph = buildDependencyGraph([]);
      const cycle = detectCycle(graph);

      expect(cycle).toBeNull();
    });
  });

  describe('validateGraph', () => {
    it('should return null for valid graph', () => {
      const items: Array<PlanItem> = [
        { logicalId: 'functions.fn1', action: 'create', resourceType: 'ALIYUN_FC3_FUNCTION' },
        { logicalId: 'buckets.bucket1', action: 'create', resourceType: 'ALIYUN_OSS_BUCKET' },
      ];
      const graph = buildDependencyGraph(items);
      const error = validateGraph(graph);

      expect(error).toBeNull();
    });
  });

  describe('topologicalSort', () => {
    it('should return empty levels for empty graph', () => {
      const graph = buildDependencyGraph([]);
      const levels = topologicalSort(graph);

      expect(levels).toEqual([]);
    });

    it('should sort items in dependency order', () => {
      const items: Array<PlanItem> = [
        { logicalId: 'events.event1', action: 'create', resourceType: 'ALIYUN_APIGW' },
        { logicalId: 'functions.fn1', action: 'create', resourceType: 'ALIYUN_FC3_FUNCTION' },
      ];
      const graph = buildDependencyGraph(items);
      const levels = topologicalSort(graph);

      expect(levels.length).toBeGreaterThan(0);
      const allItems = levels.flatMap((l) => l.items);
      const fnIndex = allItems.findIndex((i) => i.logicalId === 'functions.fn1');
      const eventIndex = allItems.findIndex((i) => i.logicalId === 'events.event1');
      expect(fnIndex).toBeLessThan(eventIndex);
    });

    it('should group independent items in same level', () => {
      const items: Array<PlanItem> = [
        { logicalId: 'functions.fn1', action: 'create', resourceType: 'ALIYUN_FC3_FUNCTION' },
        { logicalId: 'functions.fn2', action: 'create', resourceType: 'ALIYUN_FC3_FUNCTION' },
      ];
      const graph = buildDependencyGraph(items);
      const levels = topologicalSort(graph);

      expect(levels.length).toBe(1);
      expect(levels[0].items.length).toBe(2);
    });
  });

  describe('getExecutionOrder', () => {
    it('should return empty array for empty items', () => {
      const order = getExecutionOrder([]);
      expect(order).toEqual([]);
    });

    it('should return items in dependency order', () => {
      const items: Array<PlanItem> = [
        { logicalId: 'events.event1', action: 'create', resourceType: 'ALIYUN_APIGW' },
        { logicalId: 'functions.fn1', action: 'create', resourceType: 'ALIYUN_FC3_FUNCTION' },
        { logicalId: 'databases.db1', action: 'create', resourceType: 'ALIYUN_RDS_SERVERLESS' },
      ];
      const order = getExecutionOrder(items);

      const dbIndex = order.findIndex((i) => i.logicalId === 'databases.db1');
      const fnIndex = order.findIndex((i) => i.logicalId === 'functions.fn1');
      const eventIndex = order.findIndex((i) => i.logicalId === 'events.event1');

      expect(dbIndex).toBeLessThan(fnIndex);
      expect(fnIndex).toBeLessThan(eventIndex);
    });

    it('should handle mixed create and noop actions', () => {
      const items: Array<PlanItem> = [
        { logicalId: 'functions.fn1', action: 'noop', resourceType: 'ALIYUN_FC3_FUNCTION' },
        { logicalId: 'events.event1', action: 'create', resourceType: 'ALIYUN_APIGW' },
      ];
      const order = getExecutionOrder(items);

      expect(order.length).toBe(2);
    });

    it('should handle delete actions in reverse order', () => {
      const items: Array<PlanItem> = [
        { logicalId: 'functions.fn1', action: 'delete', resourceType: 'ALIYUN_FC3_FUNCTION' },
        { logicalId: 'events.event1', action: 'delete', resourceType: 'ALIYUN_APIGW' },
      ];
      const order = getExecutionOrder(items);

      const fnIndex = order.findIndex((i) => i.logicalId === 'functions.fn1');
      const eventIndex = order.findIndex((i) => i.logicalId === 'events.event1');

      expect(eventIndex).toBeLessThan(fnIndex);
    });
  });

  describe('getParallelExecutionPlan', () => {
    it('should return empty array for empty items', () => {
      const plan = getParallelExecutionPlan([]);
      expect(plan).toEqual([]);
    });

    it('should group parallel-executable items by level', () => {
      const items: Array<PlanItem> = [
        { logicalId: 'databases.db1', action: 'create', resourceType: 'ALIYUN_RDS_SERVERLESS' },
        { logicalId: 'buckets.bucket1', action: 'create', resourceType: 'ALIYUN_OSS_BUCKET' },
        { logicalId: 'functions.fn1', action: 'create', resourceType: 'ALIYUN_FC3_FUNCTION' },
        { logicalId: 'events.event1', action: 'create', resourceType: 'ALIYUN_APIGW' },
      ];
      const plan = getParallelExecutionPlan(items);

      expect(plan.length).toBeGreaterThan(1);
      expect(plan[0].level).toBe(0);
    });

    it('should allow parallel execution of independent resources', () => {
      const items: Array<PlanItem> = [
        { logicalId: 'databases.db1', action: 'create', resourceType: 'ALIYUN_RDS_SERVERLESS' },
        { logicalId: 'databases.db2', action: 'create', resourceType: 'ALIYUN_ES_SERVERLESS' },
        { logicalId: 'buckets.bucket1', action: 'create', resourceType: 'ALIYUN_OSS_BUCKET' },
      ];
      const plan = getParallelExecutionPlan(items);

      const firstLevel = plan[0].items;
      expect(firstLevel.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('getDependencyInfo', () => {
    it('should return complete dependency information', () => {
      const items: Array<PlanItem> = [
        { logicalId: 'functions.fn1', action: 'create', resourceType: 'ALIYUN_FC3_FUNCTION' },
        { logicalId: 'events.event1', action: 'create', resourceType: 'ALIYUN_APIGW' },
      ];
      const info = getDependencyInfo(items);

      expect(info.graph).toBeDefined();
      expect(info.order.length).toBe(2);
      expect(info.levels.length).toBeGreaterThan(0);
      expect(info.cycleError).toBeNull();
    });

    it('should handle empty items', () => {
      const info = getDependencyInfo([]);

      expect(info.graph.nodes.size).toBe(0);
      expect(info.order).toEqual([]);
      expect(info.levels).toEqual([]);
      expect(info.cycleError).toBeNull();
    });
  });

  describe('toDotFormat', () => {
    it('should generate valid DOT format', () => {
      const items: Array<PlanItem> = [
        { logicalId: 'functions.fn1', action: 'create', resourceType: 'ALIYUN_FC3_FUNCTION' },
        { logicalId: 'events.event1', action: 'update', resourceType: 'ALIYUN_APIGW' },
      ];
      const graph = buildDependencyGraph(items);
      const dot = toDotFormat(graph);

      expect(dot).toContain('digraph DependencyGraph');
      expect(dot).toContain('functions.fn1');
      expect(dot).toContain('events.event1');
      expect(dot).toContain('color="green"');
      expect(dot).toContain('color="orange"');
    });

    it('should include edges in DOT output', () => {
      const items: Array<PlanItem> = [
        { logicalId: 'functions.fn1', action: 'create', resourceType: 'ALIYUN_FC3_FUNCTION' },
        {
          logicalId: 'events.event1',
          action: 'create',
          resourceType: 'ALIYUN_APIGW',
          changes: { after: { backend: '${functions.fn1}' } },
        },
      ];
      const graph = buildDependencyGraph(items);
      const dot = toDotFormat(graph);

      expect(dot).toContain('->');
    });

    it('should use correct colors for different actions', () => {
      const items: Array<PlanItem> = [
        { logicalId: 'res1', action: 'create', resourceType: 'ALIYUN_FC3_FUNCTION' },
        { logicalId: 'res2', action: 'delete', resourceType: 'ALIYUN_OSS_BUCKET' },
        { logicalId: 'res3', action: 'update', resourceType: 'ALIYUN_APIGW' },
        { logicalId: 'res4', action: 'noop', resourceType: 'ALIYUN_RDS_SERVERLESS' },
      ];
      const graph = buildDependencyGraph(items);
      const dot = toDotFormat(graph);

      expect(dot).toMatch(/res1.*color="green"/);
      expect(dot).toMatch(/res2.*color="red"/);
      expect(dot).toMatch(/res3.*color="orange"/);
      expect(dot).toMatch(/res4.*color="gray"/);
    });
  });

  describe('resource type ordering', () => {
    it('should order databases before functions', () => {
      const items: Array<PlanItem> = [
        { logicalId: 'functions.fn1', action: 'create', resourceType: 'ALIYUN_FC3_FUNCTION' },
        { logicalId: 'databases.db1', action: 'create', resourceType: 'ALIYUN_RDS_SERVERLESS' },
      ];
      const order = getExecutionOrder(items);

      const dbIndex = order.findIndex((i) => i.logicalId === 'databases.db1');
      const fnIndex = order.findIndex((i) => i.logicalId === 'functions.fn1');

      expect(dbIndex).toBeLessThan(fnIndex);
    });

    it('should order buckets before functions', () => {
      const items: Array<PlanItem> = [
        { logicalId: 'functions.fn1', action: 'create', resourceType: 'ALIYUN_FC3_FUNCTION' },
        { logicalId: 'buckets.bucket1', action: 'create', resourceType: 'ALIYUN_OSS_BUCKET' },
      ];
      const order = getExecutionOrder(items);

      const bucketIndex = order.findIndex((i) => i.logicalId === 'buckets.bucket1');
      const fnIndex = order.findIndex((i) => i.logicalId === 'functions.fn1');

      expect(bucketIndex).toBeLessThan(fnIndex);
    });

    it('should order functions before events', () => {
      const items: Array<PlanItem> = [
        { logicalId: 'events.event1', action: 'create', resourceType: 'ALIYUN_APIGW' },
        { logicalId: 'functions.fn1', action: 'create', resourceType: 'ALIYUN_FC3_FUNCTION' },
      ];
      const order = getExecutionOrder(items);

      const fnIndex = order.findIndex((i) => i.logicalId === 'functions.fn1');
      const eventIndex = order.findIndex((i) => i.logicalId === 'events.event1');

      expect(fnIndex).toBeLessThan(eventIndex);
    });

    it('should order tables after functions', () => {
      const items: Array<PlanItem> = [
        { logicalId: 'tables.table1', action: 'create', resourceType: 'ALIYUN_TABLESTORE_TABLE' },
        { logicalId: 'functions.fn1', action: 'create', resourceType: 'ALIYUN_FC3_FUNCTION' },
      ];
      const order = getExecutionOrder(items);

      const fnIndex = order.findIndex((i) => i.logicalId === 'functions.fn1');
      const tableIndex = order.findIndex((i) => i.logicalId === 'tables.table1');

      expect(fnIndex).toBeLessThan(tableIndex);
    });
  });

  describe('Tencent provider resource ordering', () => {
    it('should order SCF functions before events', () => {
      const items: Array<PlanItem> = [
        { logicalId: 'events.event1', action: 'create', resourceType: 'ALIYUN_APIGW' },
        { logicalId: 'functions.fn1', action: 'create', resourceType: 'SCF_FUNCTION' },
      ];
      const order = getExecutionOrder(items);

      const fnIndex = order.findIndex((i) => i.logicalId === 'functions.fn1');
      const eventIndex = order.findIndex((i) => i.logicalId === 'events.event1');

      expect(fnIndex).toBeLessThan(eventIndex);
    });

    it('should order COS buckets before functions', () => {
      const items: Array<PlanItem> = [
        { logicalId: 'functions.fn1', action: 'create', resourceType: 'SCF_FUNCTION' },
        { logicalId: 'buckets.bucket1', action: 'create', resourceType: 'COS_BUCKET' },
      ];
      const order = getExecutionOrder(items);

      const bucketIndex = order.findIndex((i) => i.logicalId === 'buckets.bucket1');
      const fnIndex = order.findIndex((i) => i.logicalId === 'functions.fn1');

      expect(bucketIndex).toBeLessThan(fnIndex);
    });

    it('should order TDSQL-C databases before functions', () => {
      const items: Array<PlanItem> = [
        { logicalId: 'functions.fn1', action: 'create', resourceType: 'SCF_FUNCTION' },
        { logicalId: 'databases.db1', action: 'create', resourceType: 'TDSQL_C_SERVERLESS' },
      ];
      const order = getExecutionOrder(items);

      const dbIndex = order.findIndex((i) => i.logicalId === 'databases.db1');
      const fnIndex = order.findIndex((i) => i.logicalId === 'functions.fn1');

      expect(dbIndex).toBeLessThan(fnIndex);
    });
  });

  describe('complex dependency scenarios', () => {
    it('should handle full stack deployment order', () => {
      const items: Array<PlanItem> = [
        { logicalId: 'events.api', action: 'create', resourceType: 'ALIYUN_APIGW' },
        { logicalId: 'functions.handler', action: 'create', resourceType: 'ALIYUN_FC3_FUNCTION' },
        { logicalId: 'databases.mysql', action: 'create', resourceType: 'ALIYUN_RDS_SERVERLESS' },
        { logicalId: 'buckets.assets', action: 'create', resourceType: 'ALIYUN_OSS_BUCKET' },
        { logicalId: 'tables.users', action: 'create', resourceType: 'ALIYUN_TABLESTORE_TABLE' },
      ];
      const order = getExecutionOrder(items);

      const dbIndex = order.findIndex((i) => i.logicalId === 'databases.mysql');
      const bucketIndex = order.findIndex((i) => i.logicalId === 'buckets.assets');
      const fnIndex = order.findIndex((i) => i.logicalId === 'functions.handler');
      const tableIndex = order.findIndex((i) => i.logicalId === 'tables.users');
      const eventIndex = order.findIndex((i) => i.logicalId === 'events.api');

      expect(dbIndex).toBeLessThan(fnIndex);
      expect(bucketIndex).toBeLessThan(fnIndex);
      expect(fnIndex).toBeLessThan(tableIndex);
      expect(fnIndex).toBeLessThan(eventIndex);
    });

    it('should handle full stack destroy order (reverse)', () => {
      const items: Array<PlanItem> = [
        { logicalId: 'events.api', action: 'delete', resourceType: 'ALIYUN_APIGW' },
        { logicalId: 'functions.handler', action: 'delete', resourceType: 'ALIYUN_FC3_FUNCTION' },
        { logicalId: 'databases.mysql', action: 'delete', resourceType: 'ALIYUN_RDS_SERVERLESS' },
        { logicalId: 'buckets.assets', action: 'delete', resourceType: 'ALIYUN_OSS_BUCKET' },
        { logicalId: 'tables.users', action: 'delete', resourceType: 'ALIYUN_TABLESTORE_TABLE' },
      ];
      const order = getExecutionOrder(items);

      const eventIndex = order.findIndex((i) => i.logicalId === 'events.api');
      const tableIndex = order.findIndex((i) => i.logicalId === 'tables.users');
      const fnIndex = order.findIndex((i) => i.logicalId === 'functions.handler');
      const bucketIndex = order.findIndex((i) => i.logicalId === 'buckets.assets');
      const dbIndex = order.findIndex((i) => i.logicalId === 'databases.mysql');

      expect(eventIndex).toBeLessThan(fnIndex);
      expect(tableIndex).toBeLessThan(fnIndex);
      expect(fnIndex).toBeLessThan(bucketIndex);
      expect(fnIndex).toBeLessThan(dbIndex);
    });

    it('should handle mixed create/update/delete actions', () => {
      const items: Array<PlanItem> = [
        { logicalId: 'functions.fn1', action: 'update', resourceType: 'ALIYUN_FC3_FUNCTION' },
        { logicalId: 'functions.fn2', action: 'delete', resourceType: 'ALIYUN_FC3_FUNCTION' },
        { logicalId: 'buckets.bucket1', action: 'create', resourceType: 'ALIYUN_OSS_BUCKET' },
        { logicalId: 'events.event1', action: 'noop', resourceType: 'ALIYUN_APIGW' },
      ];
      const order = getExecutionOrder(items);

      expect(order.length).toBe(4);
    });
  });
});
