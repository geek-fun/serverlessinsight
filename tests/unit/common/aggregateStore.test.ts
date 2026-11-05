import type { KeyValueIO } from '../../../src/common/regionalMigration';
import { createAggregateStore } from '../../../src/common/aggregateStore';
import {
  aggregatePartition,
  emptyDeploymentState,
  mergeAggregateScope,
  type AggregateStateFile,
} from '../../../src/common/aggregateState';
import { StateCorruptError, StateScopeMismatchError, StateVersionError } from '../../../src/types';

jest.mock('../../../src/lang', () => ({ lang: { __: (key: string) => key } }));
jest.mock('../../../src/common/logger', () => ({
  logger: { debug: jest.fn(), info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

const scope = {
  app: 'shop',
  service: 'api',
  provider: 'aliyun',
  stage: 'prod',
  region: 'cn-hangzhou',
};
const key = 'infra/state.json';
const legacy = {
  version: '3.0',
  app: scope.app,
  service: scope.service,
  provider: scope.provider,
  stages: { prod: { resources: {} } },
};

const fixture = (initial: Record<string, unknown> = {}) => {
  const data = new Map(Object.entries(initial));
  const io = {
    read: jest.fn(async <T>(location: string): Promise<T | null> =>
      data.has(location) ? (data.get(location) as T) : null,
    ),
    write: jest.fn(async (location: string, value: unknown): Promise<void> => {
      data.set(location, value);
    }),
  };
  const open = (target = scope, markerAction: 'off' | 'warn' | 'refuse' = 'off') =>
    createAggregateStore(io as KeyValueIO, target, {
      key,
      markerAction,
      backupWrites: true,
    });
  return { data, io, open };
};

describe('aggregate store IO', () => {
  it.each(['.state-upgrade.json'])(
    'blocks all partitions during an unfinished %s operation',
    async (suffix) => {
      const document = mergeAggregateScope(null, scope, emptyDeploymentState(scope));
      const { io, open } = fixture({
        [key]: document,
        [key + suffix]: { phase: 'applying', opId: 'pending' },
      });
      await expect(open().loadState()).rejects.toThrow('REGIONAL_MIGRATION_PENDING');
      await expect(
        open({ ...scope, provider: 'tencent' }).patchPersisted({ managedBy: 'saas' }),
      ).rejects.toThrow('REGIONAL_MIGRATION_PENDING');
      expect(io.write).not.toHaveBeenCalled();
    },
  );

  it('keeps reads and readiness side-effect free for a fresh target', async () => {
    const { io, open } = fixture();
    const store = open();
    expect(await store.probeWriteReadiness()).toEqual({ ready: true, source: 'empty' });
    expect(await store.loadState()).toEqual(emptyDeploymentState(scope));
    await store.verifyPlanBase();
    expect(store.readStateSource()).toBe('empty');
    expect(io.write).not.toHaveBeenCalled();
  });

  it('writes the exact key and preserves other providers, regions and stage revisions', async () => {
    const { data, open } = fixture();
    const first = open();
    await first.saveState(emptyDeploymentState(scope));
    const original = data.get(key) as AggregateStateFile;
    expect(first.readStateSource()).toBe('scoped');
    const other = { ...scope, provider: 'tencent' };
    await open(other).saveState(emptyDeploymentState(other));
    const both = data.get(key) as AggregateStateFile;
    expect(aggregatePartition(both, scope)).toBe(aggregatePartition(original, scope));
    expect(aggregatePartition(both, other)?.serial).toBe(1);
    expect(data.get(`${key}.backup`)).toBe(original);
    expect((await open().loadState()).provider).toBe('aliyun');
    expect((await open(other).loadState()).provider).toBe('tencent');
    expect(await open().probeWriteReadiness()).toEqual({ ready: true, source: 'scoped' });
    expect(await open({ ...scope, region: 'ap-southeast-1' }).probeWriteReadiness()).toEqual({
      ready: true,
      source: 'empty',
    });
    expect([...data.keys()]).toEqual([key, `${key}.backup`]);
  });

  it('rejects a stale approved target base while accepting unrelated commits', async () => {
    const { data, open } = fixture();
    const planned = open();
    await planned.loadState();
    const sibling = { ...scope, provider: 'volcengine' };
    await open(sibling).saveState(emptyDeploymentState(sibling));
    await expect(planned.verifyPlanBase()).resolves.toBeUndefined();
    await open().saveState(emptyDeploymentState(scope));
    await expect(planned.verifyPlanBase()).rejects.toThrow('STATE_PLAN_BASE_CHANGED');
    planned.clearPlanBase();
    await expect(planned.verifyPlanBase()).resolves.toBeUndefined();
    await planned.loadState(false);
    const doc = data.get(key) as AggregateStateFile;
    data.set(key, mergeAggregateScope(doc, scope, emptyDeploymentState(scope)));
    await expect(planned.verifyPlanBase()).resolves.toBeUndefined();
  });

  it('exports and closes only the chosen source partition', async () => {
    const { data, open } = fixture();
    const other = { ...scope, region: 'ap-southeast-1' };
    await open(other).saveState(emptyDeploymentState(other));
    const sibling = aggregatePartition(data.get(key) as AggregateStateFile, other);
    const target = open();
    await target.patchPersisted({ managedBy: 'saas', orgId: 'org-a', serviceId: 'service-a' });
    expect(aggregatePartition(data.get(key) as AggregateStateFile, scope)?.serial).toBe(1);
    expect(aggregatePartition(data.get(key) as AggregateStateFile, other)).toBe(sibling);
    await expect(open(scope, 'refuse').loadState()).rejects.toThrow('MIGRATION_MARKER_REFUSED');
    await expect(open(scope, 'refuse').saveState(emptyDeploymentState(scope))).rejects.toThrow(
      'MIGRATION_MARKER_REFUSED',
    );
    await expect(open(scope, 'refuse').probeWriteReadiness()).rejects.toThrow(
      'MIGRATION_MARKER_REFUSED',
    );
    expect((await open().loadState()).orgId).toBe('org-a');
    await target.patchPersisted({ managedBy: undefined });
    expect((await open(scope, 'refuse').loadState()).managedBy).toBeUndefined();
  });

  it('requires legacy format migration before any write', async () => {
    const { io, open } = fixture({ [key]: legacy });
    const store = open();
    expect((await store.loadState()).version).toBe('4.0');
    expect(store.readStateSource()).toBe('legacy');
    expect(await store.probeWriteReadiness()).toEqual({
      ready: false,
      source: 'legacy',
      reason: 'STATE_STORE_UPGRADE_REQUIRED',
    });
    await expect(store.verifyPlanBase()).rejects.toThrow('STATE_STORE_UPGRADE_REQUIRED');
    await expect(store.saveState(emptyDeploymentState(scope))).rejects.toThrow(
      'STATE_STORE_UPGRADE_REQUIRED',
    );
    await expect(store.patchPersisted({ managedBy: 'saas' })).rejects.toThrow(
      'STATE_STORE_UPGRADE_REQUIRED',
    );
    expect((await open({ ...scope, provider: 'tencent' }).loadState()).resources).toEqual({});
    expect(io.write).not.toHaveBeenCalled();
  });

  it('rejects single-deployment V4 documents at the aggregate key without writing', async () => {
    const { io, open } = fixture({
      [key]: { ...legacy, version: '4.0', scope: { stage: scope.stage, region: scope.region } },
    });
    await expect(open().loadState()).rejects.toBeInstanceOf(StateCorruptError);
    await expect(open().probeWriteReadiness()).rejects.toBeInstanceOf(StateCorruptError);
    await expect(open().saveState(emptyDeploymentState(scope))).rejects.toBeInstanceOf(
      StateCorruptError,
    );
    expect(io.write).not.toHaveBeenCalled();
  });

  it('recovers a verified backup when the primary is missing or contains broken JSON', async () => {
    const backup = mergeAggregateScope(null, scope, emptyDeploymentState(scope));
    const { io, open } = fixture({ [`${key}.backup`]: backup });
    expect((await open().loadState()).lineage).toBe(aggregatePartition(backup, scope)?.lineage);
    io.read.mockImplementation(async <T>(location: string): Promise<T | null> => {
      if (location === key) throw new SyntaxError('broken JSON');
      return location === `${key}.backup` ? (backup as T) : null;
    });
    expect((await open().loadState()).serial).toBe(1);
    expect(io.write).not.toHaveBeenCalled();
  });

  it('never hides storage failures or substitutes another service backup', async () => {
    const { io, open } = fixture();
    const denied = new Error('AccessDenied');
    io.read.mockRejectedValue(denied);
    await expect(open().loadState()).rejects.toBe(denied);
    io.read.mockImplementation(async <T>(location: string): Promise<T | null> => {
      if (location === key) throw new SyntaxError('broken JSON');
      return null;
    });
    await expect(open().loadState()).rejects.toBeInstanceOf(StateCorruptError);
    io.read.mockImplementation(async <T>(location: string): Promise<T | null> => {
      if (location === key) throw new SyntaxError('broken JSON');
      return location === `${key}.backup` ? ({ ...legacy, app: 'foreign' } as T) : null;
    });
    await expect(open().loadState()).rejects.toBeInstanceOf(StateScopeMismatchError);
    expect(io.write).not.toHaveBeenCalled();
  });

  it.each([
    null,
    [],
    { ...legacy, app: 'foreign' },
    { ...legacy, version: '9.0' },
    { ...legacy, stages: [] },
    { ...legacy, provider: undefined },
    { ...legacy, version: '5.0' },
  ])('refuses malformed or foreign state: %j', async (value) => {
    const { data, io, open } = fixture();
    // A stored JSON null is corrupt, whereas read(null) is the adapter absence contract.
    if (value === null) io.read.mockResolvedValueOnce([]);
    else data.set(key, value);
    await expect(open().loadState()).rejects.toThrow();
    expect(io.write).not.toHaveBeenCalled();
  });

  it('rejects unsupported aggregate versions before saving or patching', async () => {
    const { open } = fixture({ [key]: { ...legacy, version: '9.0' } });
    await expect(open().saveState(emptyDeploymentState(scope))).rejects.toBeInstanceOf(
      StateVersionError,
    );
  });
});
