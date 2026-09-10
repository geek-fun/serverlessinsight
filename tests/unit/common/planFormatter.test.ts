import {
  computeAttributeDiffs,
  formatPlanItem,
  formatPlan,
} from '../../../src/common/planFormatter';
import type { PlanItem } from '../../../src/types';

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

    it('renders unchanged resources as empty (count-only summary)', () => {
      const item: PlanItem = {
        logicalId: 'functions.unchanged',
        action: 'noop',
        resourceType: 'ALIYUN_FC3_FUNCTION',
      };

      expect(formatPlanItem(item, config)).toBe('');
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

    it('renders a mixed Modify block with field-level add/change/remove markers', () => {
      const item: PlanItem = {
        logicalId: 'functions.order',
        action: 'update',
        resourceType: 'ALIYUN_FC3',
        changes: {
          before: { memory: 512, description: 'legacy order service' },
          after: { memory: 2048, tags: { team: 'pay' } },
        },
      };

      const output = formatPlanItem(item, config);

      expect(output).toContain('~ functions.order:');
      expect(output).toContain('memory:      512 -> 2048');
      expect(output).toContain('tags:');
      expect(output).toContain('description:');
    });

    it('annotates revert fields with the cloud-changed marker', () => {
      const item: PlanItem = {
        logicalId: 'functions.notify',
        action: 'update',
        resourceType: 'ALIYUN_FC3',
        drifted: true,
        revertKeys: ['logTtl'],
        changes: {
          before: { logTtl: 7 },
          after: { logTtl: 30 },
        },
      };

      const output = formatPlanItem(item, config);

      expect(output).toContain('logTtl:      7 -> 30');
      expect(output).toContain('(changed in the cloud, will be restored to config)');
    });

    it('annotates revert fields that surface as added keys (cloud deleted them)', () => {
      const item: PlanItem = {
        logicalId: 'functions.notify',
        action: 'update',
        resourceType: 'ALIYUN_FC3',
        drifted: true,
        revertKeys: ['logConfig'],
        changes: {
          before: { memory: 512 },
          after: { memory: 512, logConfig: { enabled: true } },
        },
      };

      const output = formatPlanItem(item, config);

      expect(output).toContain('logConfig:');
      expect(output).toContain('(changed in the cloud, will be restored to config)');
    });

    it('renders a recreate (create with recorded before) as a single -/+ block', () => {
      const item: PlanItem = {
        logicalId: 'databases.order-db',
        action: 'create',
        resourceType: 'ALIYUN_RDS_SERVERLESS',
        drifted: true,
        changes: {
          before: { instanceName: 'old-name' },
          after: { instanceName: 'new-name' },
        },
      };

      const output = formatPlanItem(item, config);

      expect(output).toContain('# databases.order-db will be recreated');
      expect(output).toContain('-/+ databases.order-db:');
      expect(output).toContain('instanceName: "old-name" -> "new-name"');
    });

    it('renders pure adds (no before) with the plain + symbol', () => {
      const item: PlanItem = {
        logicalId: 'functions.pay',
        action: 'create',
        resourceType: 'ALIYUN_FC3',
        changes: {
          after: { runtime: 'nodejs20', codeHash: 'abc' },
        },
      };

      const output = formatPlanItem(item, config);

      expect(output).toContain('+ functions.pay:');
      expect(output).not.toContain('-/+');
      expect(output).toContain('(known after deploy)');
    });

    it('renders drift reasons as explanatory lines', () => {
      const item: PlanItem = {
        logicalId: 'functions.notify',
        action: 'update',
        resourceType: 'ALIYUN_FC3',
        drifted: true,
        driftReasons: ['PLAN_DRIFT_ROLE_POLICY'],
        changes: {
          before: { memory: 512 },
          after: { memory: 512 },
        },
      };

      const output = formatPlanItem(item, config);

      expect(output).toContain('# IAM role policy changed in the cloud');
      expect(output).not.toContain('cloud changed outside of this config');
    });

    it('falls back to the generic drift marker when a drifted item has no other explanation', () => {
      const item: PlanItem = {
        logicalId: 'functions.mystery',
        action: 'update',
        resourceType: 'ALIYUN_FC3',
        drifted: true,
        changes: { before: { memory: 512 }, after: { memory: 512 } },
      };

      const output = formatPlanItem(item, config);

      expect(output).toContain('cloud changed outside of this config');
    });

    it('does not mark undrifted updates with the drift marker', () => {
      const item: PlanItem = {
        logicalId: 'functions.a',
        action: 'update',
        resourceType: 'ALIYUN_FC3',
        changes: { before: { memory: 128 }, after: { memory: 256 } },
      };

      const output = formatPlanItem(item, config);

      expect(output).not.toContain('cloud changed outside of this config');
    });
  });

  describe('formatPlan', () => {
    const config = {
      colorize: false,
      indentSize: 4,
      keyAlignWidth: 12,
    };

    it('should return no changes message for empty items', () => {
      const output = formatPlan([], config);
      expect(output).toBe('No changes. Infrastructure is up to date.');
    });

    it('should format multiple items with a full summary', () => {
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
      expect(output).toContain('+ functions.hello:');
      expect(output).toContain('~ functions.api:');
      expect(output).toContain('- functions.old:');
      expect(output).toContain('Plan: 1 add, 1 modify, 1 remove, 0 recreate, 0 unchanged.');
    });

    it('preserves the given (domain) order instead of regrouping by action', () => {
      const items: PlanItem[] = [
        {
          logicalId: 'buckets.assets',
          action: 'delete',
          resourceType: 'ALIYUN_OSS_BUCKET',
          changes: { before: { bucketName: 'assets' } },
        },
        {
          logicalId: 'functions.a',
          action: 'create',
          resourceType: 'ALIYUN_FC3',
          changes: { after: { name: 'a' } },
        },
      ];

      const output = formatPlan(items, config);

      expect(output.indexOf('buckets.assets')).toBeLessThan(output.indexOf('functions.a'));
    });

    it('counts unchanged and recreate resources in the summary', () => {
      const items: PlanItem[] = [
        {
          logicalId: 'functions.api',
          action: 'noop',
          resourceType: 'ALIYUN_FC3',
        },
        {
          logicalId: 'buckets.static',
          action: 'noop',
          resourceType: 'ALIYUN_OSS_BUCKET',
        },
        {
          logicalId: 'databases.order-db',
          action: 'create',
          resourceType: 'ALIYUN_RDS_SERVERLESS',
          drifted: true,
          changes: { before: { instanceName: 'old' }, after: { instanceName: 'new' } },
        },
      ];

      const output = formatPlan(items, config);

      expect(output).not.toContain('functions.api:');
      expect(output).toContain('Plan: 0 add, 0 modify, 0 remove, 1 recreate, 2 unchanged.');
    });

    it('summarizes drifted resources without a separate drift section', () => {
      const items: PlanItem[] = [
        {
          logicalId: 'functions.a',
          action: 'update',
          resourceType: 'ALIYUN_FC3',
          drifted: true,
          changes: { before: { memory: 128 }, after: { memory: 256 } },
        },
        {
          logicalId: 'functions.b',
          action: 'create',
          resourceType: 'ALIYUN_FC3',
          changes: { after: { name: 'b' } },
        },
      ];

      const output = formatPlan(items, config);

      expect(output).not.toContain('Drift:');
      expect(output).toContain('~ functions.a:');
    });

    // Issue #246 invariant: every non-unchanged plan item must render at
    // least one attribute line or one explanation line under its resource
    // header — an action block with nothing under it is the empty-drift-diff
    // regression this issue fixes.
    it('renders at least one field or explanation line for every non-noop item', () => {
      const items: PlanItem[] = [
        {
          logicalId: 'functions.create',
          action: 'create',
          resourceType: 'ALIYUN_FC3',
          changes: { after: { name: 'n' } },
        },
        {
          logicalId: 'functions.recreate',
          action: 'create',
          resourceType: 'ALIYUN_FC3',
          drifted: true,
          changes: { before: { name: 'old' }, after: { name: 'new' } },
        },
        {
          logicalId: 'functions.update',
          action: 'update',
          resourceType: 'ALIYUN_FC3',
          drifted: true,
          changes: { before: { memory: 1 }, after: { memory: 2 } },
        },
        {
          logicalId: 'functions.reason-only',
          action: 'update',
          resourceType: 'ALIYUN_FC3',
          drifted: true,
          driftReasons: ['PLAN_DRIFT_LOGSTORE'],
          changes: { before: { memory: 1 }, after: { memory: 1 } },
        },
        {
          logicalId: 'functions.marker-fallback',
          action: 'update',
          resourceType: 'ALIYUN_FC3',
          drifted: true,
          changes: { before: { memory: 1 }, after: { memory: 1 } },
        },
        {
          logicalId: 'buckets.gone',
          action: 'delete',
          resourceType: 'ALIYUN_OSS_BUCKET',
          changes: { before: { bucketName: 'gone' } },
        },
        {
          logicalId: 'functions.no-changes-payload',
          action: 'update',
          resourceType: 'ALIYUN_FC3',
          drifted: true,
        },
      ];

      for (const item of items) {
        const lines = formatPlanItem(item, config)
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean);
        // lines[0] = `# logicalId ...`, lines[1] = `<symbol> logicalId:`
        const bodyLines = lines.slice(2);
        expect(bodyLines.length).toBeGreaterThan(0);
      }
    });
  });
});
