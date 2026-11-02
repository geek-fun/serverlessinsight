jest.mock('../../../src/lang', () => ({ lang: { __: (key: string) => key } }));
jest.mock('../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

import {
  consolidatePreviewState,
  rollbackPreviewConsolidation,
} from '../../../src/common/previewMigration';
import { createAggregateStore } from '../../../src/common/aggregateStore';
import { AGGREGATE_MIGRATION_SUFFIX } from '../../../src/common/constants';
import {
  emptyDeploymentState,
  mergeAggregateScope,
  type AggregateStateFile,
} from '../../../src/common/aggregateState';
import type { KeyValueIO, RegionalMigrationPaths } from '../../../src/common/regionalMigration';
import type { PersistedStateFile } from '../../../src/types';

const options = { app: 'shop', service: 'api', provider: 'aliyun' };
const scope = { ...options, stage: 'prod', region: 'cn-hangzhou' };
const paths: RegionalMigrationPaths = {
  legacyKey: 'infra/state.json',
  previewPrefix: 'infra/state.json.scopes/shop/',
  scopedPrefixBuilder: (stage, region) =>
    `infra/state.json.scopes/shop/api_${stage}_${region}_state.json`,
  serviceBindingKey: 'infra/state.json.scopes/shop/api_provider.json',
  reportKey: (id) => `reports/${id}`,
  backupKey: (id) => `backups/${id}`,
};
const key = paths.scopedPrefixBuilder('prod', 'cn-hangzhou');
const otherKey = paths.scopedPrefixBuilder('prod', 'cn-beijing');
const primary = {
  version: '4.0',
  app: 'shop',
  service: 'api',
  provider: 'aliyun',
  managedBy: 'regional',
  stages: {},
};
const state = (region = 'cn-hangzhou'): PersistedStateFile => ({
  version: '4.0',
  app: 'shop',
  service: 'api',
  provider: 'aliyun',
  lineage: `lineage-${region}`,
  serial: 8,
  scope: { stage: 'prod', region },
  stages: {
    prod: {
      resources: {
        'functions.handler': {
          mode: 'managed',
          region,
          definition: {},
          lastUpdated: '2026-01-01',
          instances: [{ sid: `native-sid-${region}`, id: `native-id-${region}` }],
        },
      },
      shared: {},
    },
  },
});
const fixture = () => {
  const objects = new Map<string, unknown>([
    [paths.legacyKey, primary],
    [key, state()],
    [otherKey, state('cn-beijing')],
    [
      paths.legacyKey + '.regional-migration.json',
      {
        phase: 'complete',
        targets: [
          { stage: 'prod', region: 'cn-hangzhou', state: state() },
          { stage: 'prod', region: 'cn-beijing', state: state('cn-beijing') },
        ],
      },
    ],
  ]);
  const writes: string[] = [];
  const io: KeyValueIO = {
    read: async <T>(name: string): Promise<T | null> =>
      objects.has(name) ? (structuredClone(objects.get(name)) as T) : null,
    list: async (prefix) => [...objects.keys()].filter((name) => name.startsWith(prefix)),
    write: async (name, value) => {
      writes.push(name);
      objects.set(name, structuredClone(value));
    },
    delete: async (name) => {
      objects.delete(name);
    },
    putIfAbsent: async (name, value) => {
      if (objects.has(name)) return false;
      objects.set(name, value);
      return true;
    },
  };
  const migrate = (dryRun = false) =>
    consolidatePreviewState(io, paths, options, { dryRun, confirm: async () => true });
  const journal = () =>
    objects.get(paths.legacyKey + AGGREGATE_MIGRATION_SUFFIX) as { opId: string; phase: string };
  const aggregate = () => objects.get(paths.legacyKey) as AggregateStateFile;
  return { io, objects, writes, migrate, journal, aggregate };
};

describe('preview state consolidation', () => {
  it('refuses consolidation when a completed split is missing a scope', async () => {
    const { objects, migrate, writes } = fixture();
    objects.delete(otherKey);
    await expect(migrate()).rejects.toThrow('STATE_PREVIEW_CONFLICT');
    expect(writes).toEqual([]);
  });

  it('keeps serials, lineages, cloud IDs and per-partition SaaS ownership at the original key', async () => {
    const { objects, migrate, aggregate, journal } = fixture();
    objects.set(key, { ...state(), managedBy: 'saas', orgId: 'org-id' });
    expect(await migrate()).toBe(true);
    const first = aggregate().stages.prod.providers.aliyun.regions['cn-hangzhou'];
    expect(first).toMatchObject({
      lineage: 'lineage-cn-hangzhou',
      serial: 8,
      managedBy: 'saas',
      orgId: 'org-id',
    });
    expect(first.resources).toEqual(state().stages.prod.resources);
    expect(
      aggregate().stages.prod.providers.aliyun.regions['cn-beijing'].managedBy,
    ).toBeUndefined();
    expect(objects.get(key)).toMatchObject({ version: '5.0', managedBy: 'aggregate' });
    expect(journal().phase).toBe('complete');
    expect(objects.get(paths.backupKey(journal().opId))).toMatchObject({
      primary,
      sources: expect.any(Array),
    });
  });

  it('supports nested preview files and a single V4 document already at the configured key', async () => {
    const { objects, migrate, aggregate } = fixture();
    objects.delete(key);
    objects.set('infra/state.json.scopes/shop/api/prod/cn-hangzhou/state.json', state());
    await migrate();
    expect(Object.keys(aggregate().stages.prod.providers.aliyun.regions)).toHaveLength(2);
    const single = fixture();
    single.objects.delete(key);
    single.objects.delete(otherKey);
    single.objects.set(paths.legacyKey, state());
    await single.migrate();
    expect(single.aggregate().stages.prod.providers.aliyun.regions['cn-hangzhou'].serial).toBe(8);
  });

  it('reviews a dry run and a declined migration without persisting anything', async () => {
    const { io, writes, migrate } = fixture();
    await migrate(true);
    expect(writes).toEqual([]);
    await consolidatePreviewState(io, paths, options, { confirm: async () => false });
    expect(writes).toEqual([]);
  });

  it('requires complete listing and refuses duplicate scope, unfinished writes and orphan backups', async () => {
    const unavailable = fixture();
    delete unavailable.io.list;
    await expect(unavailable.migrate()).rejects.toThrow('STATE_PREVIEW_INVENTORY_REQUIRED');
    const duplicate = fixture();
    duplicate.objects.set('infra/state.json.scopes/shop/api/prod/cn-hangzhou/state.json', state());
    await expect(duplicate.migrate()).rejects.toThrow('STATE_PREVIEW_CONFLICT');
    const unfinished = fixture();
    unfinished.objects.set(key + '.tmp', state());
    await expect(unfinished.migrate()).rejects.toThrow('STATE_PREVIEW_CONFLICT');
    const orphan = fixture();
    orphan.objects.delete(key);
    orphan.objects.set(key + '.backup', state());
    await expect(orphan.migrate()).rejects.toThrow('STATE_PREVIEW_CONFLICT');
  });

  it('rejects foreign identities or resource regions before writing', async () => {
    const foreign = fixture();
    foreign.objects.set(key, { ...state(), service: 'another' });
    await expect(foreign.migrate()).rejects.toThrow(/State identity mismatch/);
    expect(foreign.writes).toEqual([]);
    const mixed = fixture();
    mixed.objects.set(key, { ...state(), scope: { stage: 'prod', region: 'cn-shanghai' } });
    await expect(mixed.migrate()).rejects.toThrow('STATE_PREVIEW_CONFLICT');
    expect(mixed.writes).toEqual([]);
  });

  it('revalidates source content and inventory after acquiring preview locks', async () => {
    const { io, objects, writes, migrate } = fixture();
    const reserve = io.putIfAbsent!;
    io.putIfAbsent = async (name, value) => {
      if (name === key + '.si-lock') objects.set(key, { ...state(), serial: 9 });
      return reserve(name, value);
    };
    await expect(migrate()).rejects.toThrow('STATE_PREVIEW_CONFLICT');
    expect(writes).toEqual([]);
    const added = fixture();
    const reserveOther = added.io.putIfAbsent!;
    added.io.putIfAbsent = async (name, value) => {
      if (name === key + '.si-lock')
        added.objects.set(paths.scopedPrefixBuilder('prod', 'cn-shanghai'), state('cn-shanghai'));
      return reserveOther(name, value);
    };
    await expect(added.migrate()).rejects.toThrow('STATE_PREVIEW_CONFLICT');
    expect(added.writes).toEqual([]);
  });

  it.each(['primary', 'barrier', 'completion'])(
    'resumes an interrupted %s write while blocking normal aggregate writers',
    async (phase) => {
      const { io, objects, migrate, journal, aggregate } = fixture();
      const write = io.write;
      io.write = async (name, value) => {
        if (
          (phase === 'primary' && name === paths.legacyKey) ||
          (phase === 'barrier' && name === key) ||
          (phase === 'completion' &&
            name.endsWith(AGGREGATE_MIGRATION_SUFFIX) &&
            (value as { phase: string }).phase === 'complete')
        )
          throw new Error('interrupted');
        return write(name, value);
      };
      await expect(migrate()).rejects.toThrow('interrupted');
      const id = journal().opId;
      const store = createAggregateStore(io, scope, { key: paths.legacyKey, markerAction: 'off' });
      await expect(store.loadState()).rejects.toThrow('STATE_PREVIEW_MIGRATION_PENDING');
      io.write = write;
      await migrate();
      expect(journal()).toMatchObject({ opId: id, phase: 'complete' });
      expect(aggregate().stages.prod.providers.aliyun.regions['cn-hangzhou'].serial).toBe(8);
      expect(objects.get(key)).toHaveProperty('version', '5.0');
    },
  );

  it('restores preview originals and the primary tombstone on rollback, retaining the backup', async () => {
    const { io, objects, migrate, journal } = fixture();
    await migrate();
    const id = journal().opId;
    expect(await rollbackPreviewConsolidation(io, paths, id)).toBe(true);
    expect(objects.get(paths.legacyKey)).toEqual(primary);
    expect(objects.get(key)).toEqual(state());
    expect(objects.get(otherKey)).toEqual(state('cn-beijing'));
    expect(objects.has(paths.backupKey(id))).toBe(true);
  });

  it('blocks rollback after any independent deployment write', async () => {
    const { io, objects, migrate, journal, aggregate } = fixture();
    await migrate();
    const id = journal().opId;
    const sibling = { ...scope, provider: 'tencent', region: 'ap-shanghai' };
    const updated = mergeAggregateScope(aggregate(), sibling, emptyDeploymentState(sibling));
    objects.set(paths.legacyKey, updated);
    await expect(rollbackPreviewConsolidation(io, paths, id)).rejects.toThrow(
      'REGIONAL_MIGRATION_ROLLBACK_BLOCKED',
    );
    expect(objects.get(paths.legacyKey)).toEqual(updated);
    expect(journal().phase).toBe('complete');
  });
});
