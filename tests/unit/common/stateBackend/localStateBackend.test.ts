jest.mock('node:fs', () =>
  jest.requireActual('../../../autils/memoryFileSystem').createMemoryFileSystem(),
);
jest.mock('node:child_process', () => ({ execSync: jest.fn(() => 'test@example.com') }));
jest.mock('../../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

import fs from 'node:fs';
import path from 'node:path';

import { createLocalStateBackend } from '../../../../src/common/stateBackend/localStateBackend';
import {
  emptyDeploymentState,
  aggregatePartition,
  type AggregateStateFile,
} from '../../../../src/common/aggregateState';
import {
  StateCorruptError,
  StateScopeMismatchError,
  StateVersionError,
} from '../../../../src/types';

const scope = {
  app: 'shop',
  service: 'api',
  provider: 'aliyun',
  stage: 'prod',
  region: 'cn-hangzhou',
};
const sibling = { ...scope, provider: 'tencent', region: 'ap-shanghai' };

describe('Local aggregate state backend', () => {
  let baseDir: string;
  const file = () => path.join(baseDir, '.serverlessinsight', 'state-shop-api.json');
  const backend = (selected = scope) => createLocalStateBackend(selected, { baseDir });
  const document = () => JSON.parse(fs.readFileSync(file(), 'utf-8')) as AggregateStateFile;
  const write = (value: unknown) => {
    fs.mkdirSync(path.dirname(file()), { recursive: true });
    fs.writeFileSync(file(), JSON.stringify(value));
  };

  beforeEach(() => {
    baseDir = fs.mkdtempSync('/si-local-aggregate-');
  });
  afterEach(() => {
    jest.restoreAllMocks();
    fs.rmSync(baseDir, { recursive: true, force: true });
  });

  it('normalizes scope and performs side-effect-free empty reads and readiness checks', async () => {
    const selected = backend({ ...scope, region: 'CN-Hangzhou' });
    expect(selected.scope).toEqual(scope);
    expect(selected.capabilities).toEqual({ conditionalCreate: true });
    expect(await selected.loadState()).toEqual(emptyDeploymentState(scope));
    expect(await selected.probeWriteReadiness()).toEqual({ ready: true, source: 'empty' });
    expect(selected.readStateSource()).toBe('empty');
    expect(fs.existsSync(file())).toBe(false);
    expect(await selected.readLock()).toBeNull();
  });

  it('merges stage, provider and region partitions at the original path', async () => {
    const first = backend();
    await first.saveState(emptyDeploymentState(scope));
    const original = JSON.stringify(aggregatePartition(document(), scope));
    await backend(sibling).saveState(emptyDeploymentState(sibling));
    const otherStage = { ...scope, stage: 'test' };
    await backend(otherStage).saveState(emptyDeploymentState(otherStage));
    expect(JSON.stringify(aggregatePartition(document(), scope))).toBe(original);
    expect(aggregatePartition(document(), sibling)?.serial).toBe(1);
    expect(aggregatePartition(document(), otherStage)?.serial).toBe(1);
    expect((await first.loadState()).provider).toBe('aliyun');
    expect(first.readStateSource()).toBe('scoped');
    expect(fs.existsSync(path.join(baseDir, '.serverlessinsight', 'states'))).toBe(false);
  });

  it('backs up only validated previous contents and recovers missing or corrupt primaries', async () => {
    await backend().saveState(emptyDeploymentState(scope));
    await backend().saveState(emptyDeploymentState(scope));
    expect(
      aggregatePartition(JSON.parse(fs.readFileSync(file() + '.backup', 'utf-8')), scope)?.serial,
    ).toBe(1);
    fs.writeFileSync(file(), '{broken');
    expect((await backend().loadState()).serial).toBe(1);
    await backend(sibling).saveState(emptyDeploymentState(sibling));
    const saved = document();
    expect(aggregatePartition(saved, sibling)?.serial).toBe(1);
    fs.rmSync(file());
    expect((await backend().loadState()).serial).toBe(1);
  });

  it.each([
    { version: '5.0', app: 'foreign', service: 'api', stages: {} },
    { version: '8.0', app: 'shop', service: 'api', stages: {} },
    { version: '5.0', app: 'shop', service: 'api', stages: [] },
  ])('refuses foreign, newer or malformed state instead of replacing it: %j', async (raw) => {
    write(raw);
    const expected =
      raw.app === 'foreign'
        ? StateScopeMismatchError
        : raw.version === '8.0'
          ? StateVersionError
          : StateCorruptError;
    await expect(backend().loadState()).rejects.toBeInstanceOf(expected);
    await expect(backend().saveState(emptyDeploymentState(scope))).rejects.toBeInstanceOf(expected);
    expect(document()).toEqual(raw);
    expect(await backend().readLock()).toBeNull();
  });

  it('refuses malformed primary and backup data without creating empty state', async () => {
    fs.mkdirSync(path.dirname(file()), { recursive: true });
    fs.writeFileSync(file(), '{broken');
    await expect(backend().loadState()).rejects.toBeInstanceOf(StateCorruptError);
    fs.writeFileSync(file() + '.backup', '{broken too');
    await expect(backend().saveState(emptyDeploymentState(scope))).rejects.toThrow();
    expect(fs.readFileSync(file(), 'utf-8')).toBe('{broken');
  });

  it('reviews V3 state read-only and requires in-place migration even for empty legacy stages', async () => {
    const legacy = {
      version: '3.0',
      app: 'shop',
      service: 'api',
      provider: 'aliyun',
      stages: { prod: { resources: {} } },
    };
    write(legacy);
    expect((await backend().loadState()).version).toBe('3.0');
    expect((await backend().probeWriteReadiness()).ready).toBe(false);
    await expect(backend().saveState(emptyDeploymentState(scope))).rejects.toThrow(/upgrade/);
    expect(document()).toEqual(legacy);
  });

  it('requires consolidation of preview files and stale regional tombstones', async () => {
    write({
      version: '4.0',
      app: 'shop',
      service: 'api',
      provider: 'aliyun',
      managedBy: 'regional',
      stages: {},
    });
    await expect(backend().loadState()).rejects.toThrow(/preview state/i);
    fs.rmSync(file());
    const previous = path.join(
      baseDir,
      '.serverlessinsight',
      'states',
      'shop',
      'api_prod_cn-hangzhou_state.json',
    );
    fs.mkdirSync(path.dirname(previous), { recursive: true });
    fs.writeFileSync(previous, '{}');
    await expect(backend().loadState()).rejects.toThrow(/preview state/i);
    expect(fs.existsSync(file())).toBe(false);
  });

  it('changes only selected ownership metadata and supports explicit marker rollback', async () => {
    await backend().saveState(emptyDeploymentState(scope));
    await backend(sibling).saveState(emptyDeploymentState(sibling));
    await backend().patchPersisted!({ orgId: 'org-id', managedBy: 'saas' });
    expect(aggregatePartition(document(), scope)?.managedBy).toBe('saas');
    expect(aggregatePartition(document(), sibling)?.managedBy).toBeUndefined();
    await expect(
      createLocalStateBackend(scope, { baseDir, markerAction: 'refuse' }).loadState(),
    ).rejects.toThrow();
    await backend().patchPersisted!({ managedBy: undefined });
    expect((await backend().loadState()).managedBy).toBeUndefined();
    expect(aggregatePartition(document(), scope)?.orgId).toBe('org-id');
  });

  it('uses a shared lock across providers and releases it on errors', async () => {
    const first = backend();
    const id = await first.acquireLock('deploy');
    expect((await backend(sibling).readLock())?.id).toBe(id);
    await expect(
      backend(sibling).acquireLock('deploy', { timeout: 0, maxRetries: 0 }),
    ).rejects.toThrow();
    await expect(backend().forceUnlock('foreign-id')).rejects.toThrow();
    await first.releaseLock(id);
    const callback = jest.fn();
    await first.withLock(
      'deploy',
      async () => {
        callback();
      },
      undefined,
      callback,
    );
    expect(callback).toHaveBeenCalledTimes(2);
    await expect(
      first.withLock('deploy', async () => {
        throw new Error('cloud failure');
      }),
    ).rejects.toThrow('cloud failure');
    expect(await first.readLock()).toBeNull();
    const nextId = await first.acquireLock('deploy');
    expect(await first.forceUnlock(nextId)).toBe(true);
    expect(await first.forceUnlock(nextId)).toBe(false);
  });
});
