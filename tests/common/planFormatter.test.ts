import { computeAttributeDiffs, formatPlanItem, formatPlan } from '../../src/common/planFormatter';
import type { PlanItem } from '../../src/types';

describe('planFormatter', () => {
  describe('computeAttributeDiffs', () => {
    it('should return empty diffs for both undefined', () => {
      const result = computeAttributeDiffs(undefined, undefined);
      expect(result.diffs).toEqual([]);
      expect(result.unchangedCount).toBe(0);
    });

    it('should mark all as added when before is undefined', () => {
      const after = { name: 'test', memory: 512 };
      const result = computeAttributeDiffs(undefined, after);

      expect(result.diffs).toHaveLength(2);
      expect(result.diffs.every((d) => d.action === 'add')).toBe(true);
      expect(result.unchangedCount).toBe(0);
    });

    it('should mark all as removed when after is undefined', () => {
      const before = { name: 'test', memory: 512 };
      const result = computeAttributeDiffs(before, undefined);

      expect(result.diffs).toHaveLength(2);
      expect(result.diffs.every((d) => d.action === 'remove')).toBe(true);
      expect(result.unchangedCount).toBe(0);
    });

    it('should compute changes between two objects', () => {
      const before = { name: 'test', memory: 256, timeout: 10 };
      const after = { name: 'test', memory: 512, timeout: 10 };
      const result = computeAttributeDiffs(before, after);

      expect(result.diffs).toHaveLength(1);
      expect(result.diffs[0]).toEqual({
        key: 'memory',
        before: 256,
        after: 512,
        action: 'change',
        children: undefined,
      });
      expect(result.unchangedCount).toBe(2);
    });

    it('should detect added and removed keys', () => {
      const before = { name: 'test', old: 'value' };
      const after = { name: 'test', new: 'value' };
      const result = computeAttributeDiffs(before, after);

      const added = result.diffs.find((d) => d.key === 'new');
      const removed = result.diffs.find((d) => d.key === 'old');

      expect(added?.action).toBe('add');
      expect(removed?.action).toBe('remove');
      expect(result.unchangedCount).toBe(1);
    });

    it('should mark computed attributes', () => {
      const after = { name: 'test', codeHash: 'abc123', functionId: 'xyz' };
      const result = computeAttributeDiffs(undefined, after);

      const codeHash = result.diffs.find((d) => d.key === 'codeHash');
      const functionId = result.diffs.find((d) => d.key === 'functionId');
      const name = result.diffs.find((d) => d.key === 'name');

      expect(codeHash?.isComputed).toBe(true);
      expect(functionId?.isComputed).toBe(true);
      expect(name?.isComputed).toBe(false);
    });

    it('should handle nested objects', () => {
      const before = {
        environment: { NODE_ENV: 'dev', DEBUG: 'true' },
      };
      const after = {
        environment: { NODE_ENV: 'prod', LOG_LEVEL: 'info' },
      };
      const result = computeAttributeDiffs(before, after);

      expect(result.diffs).toHaveLength(1);
      expect(result.diffs[0].key).toBe('environment');
      expect(result.diffs[0].action).toBe('change');
    });
  });

  describe('formatPlanItem', () => {
    const config = {
      colorize: false,
      indentSize: 4,
      keyAlignWidth: 12,
      showUnchangedAttributes: false,
      maxUnchangedHidden: 5,
    };

    it('should format create action', () => {
      const item: PlanItem = {
        logicalId: 'functions.hello',
        action: 'create',
        resourceType: 'ALIYUN_FC3_FUNCTION',
        changes: {
          after: { name: 'hello-fn', memory: 512, timeout: 10 },
        },
      };

      const output = formatPlanItem(item, config);

      expect(output).toContain('# functions.hello will be created');
      expect(output).toContain('+ functions.hello:');
      expect(output).toContain('memory:');
      expect(output).toContain('512');
    });

    it('should format update action with before/after values', () => {
      const item: PlanItem = {
        logicalId: 'functions.api',
        action: 'update',
        resourceType: 'ALIYUN_FC3_FUNCTION',
        changes: {
          before: { name: 'api-fn', memory: 256, timeout: 5 },
          after: { name: 'api-fn', memory: 512, timeout: 10 },
        },
      };

      const output = formatPlanItem(item, config);

      expect(output).toContain('# functions.api will be updated in-place');
      expect(output).toContain('~ functions.api:');
      expect(output).toContain('memory:');
      expect(output).toContain('256 -> 512');
    });

    it('should expand nested objects for change action', () => {
      const item: PlanItem = {
        logicalId: 'functions.api',
        action: 'update',
        resourceType: 'ALIYUN_FC3_FUNCTION',
        changes: {
          before: {
            environment: { NODE_ENV: 'dev', DEBUG: 'true' },
            domain: { domainName: 'old.example.com' },
          },
          after: {
            environment: { NODE_ENV: 'prod', DEBUG: 'true' },
            domain: { domainName: 'new.example.com', certificateName: null },
          },
        },
      };

      const output = formatPlanItem(item, config);

      expect(output).toContain('environment:');
      expect(output).toContain('NODE_ENV:');
      expect(output).toContain('"dev" -> "prod"');
      expect(output).not.toContain('{ NODE_ENV:');

      expect(output).toContain('domain:');
      expect(output).toContain('domainName:');
      expect(output).toContain('"old.example.com" -> "new.example.com"');
    });

    it('should format delete action', () => {
      const item: PlanItem = {
        logicalId: 'functions.old',
        action: 'delete',
        resourceType: 'ALIYUN_FC3_FUNCTION',
        changes: {
          before: { name: 'old-fn', memory: 128 },
        },
      };

      const output = formatPlanItem(item, config);

      expect(output).toContain('# functions.old will be destroyed');
      expect(output).toContain('- functions.old:');
    });

    it('should format noop action', () => {
      const item: PlanItem = {
        logicalId: 'functions.unchanged',
        action: 'noop',
        resourceType: 'ALIYUN_FC3_FUNCTION',
      };

      const output = formatPlanItem(item, config);

      expect(output).toContain('# functions.unchanged no changes');
      expect(output).not.toContain('functions.unchanged:');
    });

    it('should show unchanged count', () => {
      const item: PlanItem = {
        logicalId: 'functions.test',
        action: 'update',
        resourceType: 'ALIYUN_FC3_FUNCTION',
        changes: {
          before: { name: 'test', a: 1, b: 2, c: 3, d: 4 },
          after: { name: 'test', a: 1, b: 2, c: 3, d: 5 },
        },
      };

      const output = formatPlanItem(item, config);

      expect(output).toContain('(4 unchanged attributes hidden)');
    });
  });

  describe('formatPlan', () => {
    const config = {
      colorize: false,
      indentSize: 4,
      keyAlignWidth: 12,
      showUnchangedAttributes: false,
      maxUnchangedHidden: 5,
    };

    it('should return no changes message for empty items', () => {
      const output = formatPlan([], config);
      expect(output).toBe('No changes. Infrastructure is up to date.');
    });

    it('should format multiple items with summary', () => {
      const items: PlanItem[] = [
        {
          logicalId: 'functions.hello',
          action: 'create',
          resourceType: 'ALIYUN_FC3_FUNCTION',
          changes: { after: { name: 'hello-fn' } },
        },
        {
          logicalId: 'functions.api',
          action: 'update',
          resourceType: 'ALIYUN_FC3_FUNCTION',
          changes: { before: { memory: 256 }, after: { memory: 512 } },
        },
        {
          logicalId: 'functions.old',
          action: 'delete',
          resourceType: 'ALIYUN_FC3_FUNCTION',
          changes: { before: { name: 'old-fn' } },
        },
      ];

      const output = formatPlan(items, config);

      expect(output).toContain('ServerlessInsight will perform the following actions');
      expect(output).toContain('+ create');
      expect(output).toContain('~ update in-place');
      expect(output).toContain('- destroy');
      expect(output).toContain('Plan: 1 to add, 1 to change, 1 to destroy.');
    });

    it('should group items by action type', () => {
      const items: PlanItem[] = [
        {
          logicalId: 'functions.b',
          action: 'create',
          resourceType: 'ALIYUN_FC3_FUNCTION',
          changes: { after: { name: 'b' } },
        },
        {
          logicalId: 'functions.a',
          action: 'create',
          resourceType: 'ALIYUN_FC3_FUNCTION',
          changes: { after: { name: 'a' } },
        },
      ];

      const output = formatPlan(items, config);

      const aIndex = output.indexOf('functions.a');
      const bIndex = output.indexOf('functions.b');
      expect(aIndex).toBeGreaterThan(-1);
      expect(bIndex).toBeGreaterThan(-1);
    });
  });
});
