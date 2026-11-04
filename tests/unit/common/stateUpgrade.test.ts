import fs from 'node:fs';
import { createLocalStateBackend } from '../../../src/common/stateBackend/localStateBackend';
import { createRemoteStateBackend } from '../../../src/common/stateBackend/remoteStateBackend';
import { getStatePath } from '../../../src/common/stateManager';
import { REGIONAL_MIGRATION_SUFFIX } from '../../../src/common/constants';
import type { AggregateStateFile } from '../../../src/common/aggregateState';
import type { DeploymentScope } from '../../../src/common/stateScope';
import type { StorageAdapter } from '../../../src/common/stateBackend/types';

jest.mock('node:fs', () =>
  jest.requireActual('../../autils/memoryFileSystem').createMemoryFileSystem(),
);
jest.mock('../../../src/lang', () => ({ lang: { __: (key: string) => key } }));
jest.mock('../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

const scope: DeploymentScope = {
  app: 'shop',
  service: 'api',
  provider: 'aliyun',
  stage: 'prod',
  region: 'cn-hangzhou',
};
const resource = (region: string, id: string) => ({
  mode: 'managed',
  region,
  definition: {},
  instances: [{ id, sid: `sid-${id}` }],
  lastUpdated: '',
});
const legacy = () => ({
  version: '3.0',
  app: scope.app,
  service: scope.service,
  provider: scope.provider,
  lineage: 'original-lineage',
  serial: 12,
  stages: {
    prod: {
      resources: {
        first: resource('cn-hangzhou', 'first'),
        second: resource('ap-southeast-1', 'second'),
      },
    },
    test: { resources: { third: resource('cn-hangzhou', 'third') } },
  },
});

const fixture = (
  kind: 'local' | 'bucket',
  initial: unknown = legacy(),
  marker: 'off' | 'refuse' = 'refuse',
) => {
  const baseDir = '/state-upgrade-tests';
  const key =
    kind === 'local' ? getStatePath(scope.app, scope.service, baseDir) : 'infra/state.json';
  const data = new Map<string, unknown>([[key, structuredClone(initial)]]);
  const adapter: StorageAdapter = {
    lockPath: `oss://test/${key}`,
    read: jest.fn(async <T>(location: string): Promise<T | null> =>
      data.has(location) ? (structuredClone(data.get(location)) as T) : null,
    ) as StorageAdapter['read'],
    write: jest.fn(async (location, value) => {
      data.set(location, structuredClone(value));
    }),
    putIfAbsent: jest.fn(async (location, value) => {
      if (data.has(location)) return false;
      data.set(location, structuredClone(value));
      return true;
    }),
    delete: jest.fn(async (location) => {
      data.delete(location);
    }),
  };
  if (kind === 'local') {
    fs.mkdirSync(`${baseDir}/.serverlessinsight`, { recursive: true });
    fs.writeFileSync(key, JSON.stringify(initial));
  }
  const open = (selected = scope, action = marker) =>
    kind === 'local'
      ? createLocalStateBackend(selected, { baseDir, markerAction: action })
      : createRemoteStateBackend(adapter, { scope: selected, key, markerAction: action });
  const read = <T = AggregateStateFile>(location = key): T =>
    kind === 'local'
      ? JSON.parse(fs.readFileSync(location, 'utf-8'))
      : (structuredClone(data.get(location)) as T);
  const journal = () =>
    read<{ plan: { opId: string }; phase: string }>(key + REGIONAL_MIGRATION_SUFFIX);
  return { key, open, read, journal, data, adapter };
};

beforeEach(() => {
  jest.clearAllMocks();
  fs.rmSync('/state-upgrade-tests', { recursive: true, force: true });
});

describe.each(['local', 'bucket'] as const)('%s automatic state upgrade', (kind) => {
  it('projects the selected legacy scope without modifying storage', async () => {
    const { open, read } = fixture(kind);
    expect((await open().loadState()).resources).toEqual({
      first: legacy().stages.prod.resources.first,
    });
    expect((await open({ ...scope, provider: 'tencent' }).loadState()).resources).toEqual({});
    expect(read()).toEqual(legacy());
  });

  it('upgrades the whole original file once while preserving native identities and backups', async () => {
    const { key, open, read, journal } = fixture(kind);
    const backend = open();
    await backend.upgradeLegacyState!();
    const aggregate = read();
    expect(aggregate.version).toBe('4.0');
    const regions = aggregate.stages.prod.providers.aliyun.regions;
    expect(regions['cn-hangzhou'].resources.first.instances[0]).toEqual({
      id: 'first',
      sid: 'sid-first',
    });
    expect(regions['ap-southeast-1'].resources.second.instances[0].id).toBe('second');
    expect(
      aggregate.stages.test.providers.aliyun.regions['cn-hangzhou'].resources.third.instances[0].id,
    ).toBe('third');
    expect(regions['cn-hangzhou'].lineage).not.toBe(regions['ap-southeast-1'].lineage);
    const opId = journal().plan.opId;
    expect(read(`${key}.pre-upgrade-${opId}.json`)).toEqual(legacy());
    await backend.upgradeLegacyState!();
    expect(read()).toEqual(aggregate);
    expect(journal().plan.opId).toBe(opId);
    expect(journal().phase).toBe('complete');
    expect(await backend.readLock()).toBeNull();
  });

  it('does not recreate an empty state when a completed upgrade loses its authoritative file', async () => {
    const { key, open, data } = fixture(kind);
    await open().upgradeLegacyState!();
    if (kind === 'local') fs.rmSync(key);
    else data.delete(key);

    await expect(open().upgradeLegacyState!()).rejects.toThrow('REGIONAL_MIGRATION_SOURCE_CHANGED');
    await expect(open().loadState()).rejects.toThrow();
    if (kind === 'local') expect(fs.existsSync(key)).toBe(false);
    else expect(data.has(key)).toBe(false);
  });

  it('does not treat a workload override as historical region evidence', async () => {
    const source = legacy();
    source.stages.prod.resources.first.region = '';
    const { key, open, read, journal } = fixture(kind, source);
    const backend = open({ ...scope, region: 'cn-beijing', provider: 'tencent' });
    await expect(backend.upgradeLegacyState!()).rejects.toThrow(
      'REGIONAL_MIGRATION_UNKNOWN_REGION_REQUIRED',
    );
    expect(read()).toEqual(source);
    await backend.upgradeLegacyState!({ bindUnknownRegion: 'CN-HANGZHOU' });
    expect(
      read().stages.prod.providers.aliyun.regions['cn-hangzhou'].resources.first.instances[0].id,
    ).toBe('first');
    expect((await backend.loadState()).resources).toEqual({});
    expect(read(`${key}.pre-upgrade-${journal().plan.opId}.json`)).toEqual(source);
  });

  it('previews an explicitly bound source without upgrading or acquiring ownership', async () => {
    const source = legacy();
    source.stages.prod.resources.first.region = '';
    const { open, read } = fixture(kind, source);
    const backend = open();
    await backend.upgradeLegacyState!({ dryRun: true, bindUnknownRegion: scope.region });
    expect((await backend.loadState()).resources.first.instances[0].id).toBe('first');
    expect(read()).toEqual(source);
    expect(backend.readStateSource()).toBe('legacy');
  });

  it('keeps an already transferred V3 source closed until explicit ownership rollback', async () => {
    const source = { ...legacy(), managedBy: 'saas' };
    const { open, read } = fixture(kind, source);
    await expect(open().upgradeLegacyState!()).rejects.toThrow('MIGRATION_MARKER_REFUSED');
    expect(read()).toEqual(source);
    const migration = open(scope, 'off');
    await migration.upgradeLegacyState!();
    expect(read()).toEqual(source);
    await migration.patchPersisted!({ managedBy: undefined });
    expect(read().version).toBe('3.0');
    expect(read()).not.toHaveProperty('managedBy');
    await open().upgradeLegacyState!();
    expect(read().version).toBe('4.0');
  });

  it.each([
    { ...legacy(), app: 'foreign' },
    { ...legacy(), service: 'foreign' },
    { ...legacy(), version: '9.0' },
  ])('rejects foreign or unsupported state before replacing it', async (source) => {
    const { open, read } = fixture(kind, source);
    await expect(open().upgradeLegacyState!()).rejects.toThrow();
    expect(read()).toEqual(source);
    expect(await open().readLock()).toBeNull();
  });
});

it('resumes a failed bucket finalization from another selected region without rewriting the aggregate', async () => {
  const { adapter, key, open, read, journal } = fixture('bucket');
  const write = (adapter.write as jest.Mock).getMockImplementation()!;
  (adapter.write as jest.Mock).mockImplementation(async (location, value) => {
    if (location.includes('.upgrade-report-')) throw new Error('report unavailable');
    return write(location, value);
  });
  await expect(open().upgradeLegacyState!()).rejects.toThrow('report unavailable');
  const aggregate = read();
  const opId = journal().plan.opId;
  expect(journal().phase).toBe('applying');
  await expect(open().loadState()).rejects.toThrow('REGIONAL_MIGRATION_PENDING');
  (adapter.write as jest.Mock).mockImplementation(write);
  const other = open({ ...scope, provider: 'tencent', region: 'ap-shanghai' });
  await other.upgradeLegacyState!();
  expect(read()).toEqual(aggregate);
  expect(journal().phase).toBe('complete');
  expect(journal().plan.opId).toBe(opId);
  expect(read(`${key}.pre-upgrade-${opId}.json`)).toEqual(legacy());
  expect(await other.readLock()).toBeNull();
});
