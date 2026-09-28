import {
  buildPlanChange,
  buildPlanJson,
  buildPlanSummary,
  isJsonMode,
  setJsonMode,
  writeJson,
} from '../../../src/common/jsonOutput';
import { PlanItem } from '../../../src/types';

jest.mock('../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

jest.mock('../../../src/lang', () => ({
  lang: { __: (key: string) => key },
}));

const makeItem = (overrides: Partial<PlanItem>): PlanItem => ({
  logicalId: 'functions.hello',
  action: 'create',
  resourceType: 'ALIYUN_FC3_FUNCTION',
  ...overrides,
});

describe('jsonOutput', () => {
  describe('json mode flag', () => {
    it('defaults to off and toggles via setJsonMode', () => {
      expect(isJsonMode()).toBe(false);
      setJsonMode(true);
      expect(isJsonMode()).toBe(true);
      setJsonMode(false);
      expect(isJsonMode()).toBe(false);
    });
  });

  describe('writeJson', () => {
    it('writes a pretty JSON document followed by a newline to stdout', () => {
      const stdoutSpy = jest.spyOn(process.stdout, 'write').mockImplementation(() => true);

      writeJson({ hello: 'world' });

      expect(stdoutSpy).toHaveBeenCalledWith('{\n  "hello": "world"\n}\n');
      stdoutSpy.mockRestore();
    });
  });

  describe('buildPlanSummary', () => {
    it('counts each action kind with recreate split out of create', () => {
      const summary = buildPlanSummary([
        makeItem({ logicalId: 'a', action: 'create' }),
        makeItem({ logicalId: 'b', action: 'create', changes: { before: { memory: 128 } } }),
        makeItem({ logicalId: 'c', action: 'update' }),
        makeItem({ logicalId: 'd', action: 'delete' }),
        makeItem({ logicalId: 'e', action: 'noop' }),
        makeItem({ logicalId: 'f', action: 'noop' }),
      ]);

      expect(summary).toEqual({ create: 1, update: 1, destroy: 1, recreate: 1, unchanged: 2 });
    });

    it('returns all zeros for an empty plan', () => {
      expect(buildPlanSummary([])).toEqual({
        create: 0,
        update: 0,
        destroy: 0,
        recreate: 0,
        unchanged: 0,
      });
    });
  });

  describe('buildPlanChange', () => {
    it('maps delete to the destroy action and computes attribute diffs', () => {
      const change = buildPlanChange(
        makeItem({
          action: 'delete',
          changes: { before: { memory: 128 }, after: undefined },
        }),
      );

      expect(change.action).toBe('destroy');
      expect(change.attributes).toEqual([
        expect.objectContaining({ key: 'memory', action: 'remove', before: 128 }),
      ]);
    });

    it('maps a create with recorded before state to recreate', () => {
      const change = buildPlanChange(
        makeItem({
          action: 'create',
          changes: { before: { memory: 128 }, after: { memory: 256 } },
        }),
      );

      expect(change.action).toBe('recreate');
    });

    it('keeps drifted flag and drift reasons when present', () => {
      const change = buildPlanChange(
        makeItem({ action: 'update', drifted: true, driftReasons: ['PLAN_DRIFT_REASON_X'] }),
      );

      expect(change.drifted).toBe(true);
      expect(change.driftReasons).toEqual(['PLAN_DRIFT_REASON_X']);
    });

    it('omits drifted and driftReasons when absent and yields empty attributes without changes', () => {
      const change = buildPlanChange(makeItem({ action: 'update' }));

      expect(change.drifted).toBeUndefined();
      expect(change.driftReasons).toBeUndefined();
      expect(change.attributes).toEqual([]);
    });
  });

  describe('buildPlanJson', () => {
    it('builds the versioned envelope with identity, changes and summary', () => {
      const payload = buildPlanJson(
        {
          items: [
            makeItem({ logicalId: 'functions.hello', action: 'create' }),
            makeItem({ logicalId: 'functions.unchanged', action: 'noop' }),
          ],
        },
        { provider: 'aliyun', app: 'my-app', service: 'my-service', stage: 'dev' },
      );

      expect(payload.planVersion).toBe(1);
      expect(payload.provider).toBe('aliyun');
      expect(payload.app).toBe('my-app');
      expect(payload.service).toBe('my-service');
      expect(payload.stage).toBe('dev');
      expect(payload.changes).toHaveLength(1);
      expect(payload.changes[0]).toMatchObject({
        logicalId: 'functions.hello',
        type: 'ALIYUN_FC3_FUNCTION',
        action: 'create',
      });
      expect(payload.summary).toEqual({
        create: 1,
        update: 0,
        destroy: 0,
        recreate: 0,
        unchanged: 1,
      });
    });

    it('excludes noop items from changes but keeps them in the summary', () => {
      const payload = buildPlanJson(
        { items: [makeItem({ action: 'noop' }), makeItem({ action: 'noop' })] },
        { provider: 'tencent', app: 'a', service: 's', stage: 'dev' },
      );

      expect(payload.changes).toEqual([]);
      expect(payload.summary.unchanged).toBe(2);
    });
  });
});
