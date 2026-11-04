jest.mock('node:fs', () =>
  jest.requireActual('../../../autils/memoryFileSystem').createMemoryFileSystem(),
);
jest.mock('node:child_process', () => ({ execSync: jest.fn(() => 'test@example.com') }));
jest.mock('../../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));
jest.mock('../../../../src/lang', () => ({ lang: { __: (key: string) => key } }));

import fs from 'node:fs';
import path from 'node:path';

import { createLocalStateBackend } from '../../../../src/common/stateBackend/localStateBackend';
import { createRemoteStateBackend } from '../../../../src/common/stateBackend/remoteStateBackend';
import {
  aggregatePartition,
  emptyDeploymentState,
  type AggregateStateFile,
} from '../../../../src/common/aggregateState';
import type { DeploymentScope } from '../../../../src/common/stateScope';
import type { StorageAdapter } from '../../../../src/common/stateBackend/types';

const scope: DeploymentScope = {
  app: 'shop',
  service: 'api',
  provider: 'aliyun',
  stage: 'prod',
  region: 'cn-hangzhou',
};
const sibling = { ...scope, provider: 'volcengine', region: 'cn-shanghai' };

const fixture = (kind: string) => {
  const baseDir = fs.mkdtempSync('/aggregate-backend-');
  const key =
    kind === 'local'
      ? path.join(baseDir, '.serverlessinsight', 'state-shop-api.json')
      : 'infra/state.json';
  const objects = new Map<string, unknown>();
  const adapter: StorageAdapter = {
    read: async <T>(name: string): Promise<T | null> =>
      objects.has(name) ? (objects.get(name) as T) : null,
    write: jest.fn(async (name, value) => {
      objects.set(name, JSON.parse(JSON.stringify(value)));
    }),
    putIfAbsent: jest.fn(async (name, value) => {
      if (objects.has(name)) return false;
      objects.set(name, value);
      return true;
    }),
    delete: jest.fn(async (name) => {
      objects.delete(name);
    }),
    lockPath: `oss://synthetic-state/${key}`,
  };
  const open = (selected = scope) =>
    kind === 'local'
      ? createLocalStateBackend(selected, { baseDir })
      : createRemoteStateBackend(adapter, {
          scope: selected,
          key: key,
        });
  const read = () =>
    kind === 'local'
      ? (JSON.parse(fs.readFileSync(key, 'utf-8')) as AggregateStateFile)
      : (objects.get(key) as AggregateStateFile);
  const write = (value: unknown) => {
    if (kind === 'local') {
      fs.mkdirSync(path.dirname(key), { recursive: true });
      fs.writeFileSync(key, JSON.stringify(value));
    } else objects.set(key, value);
  };
  return { open, read, write, key, adapter };
};

describe.each(['local', 'bucket'])('%s aggregate state backend', (kind) => {
  it('stores multiple providers in the original file or exact Bucket key', async () => {
    const { open, read, key } = fixture(kind);
    const first = open();
    expect(await first.probeWriteReadiness()).toEqual({ ready: true, source: 'empty' });
    expect((await first.loadState()).resources).toEqual({});
    await first.saveState(emptyDeploymentState(scope));
    const before = JSON.stringify(aggregatePartition(read(), scope));
    await open(sibling).saveState(emptyDeploymentState(sibling));
    expect(read().version).toBe('4.0');
    expect(JSON.stringify(aggregatePartition(read(), scope))).toBe(before);
    expect(aggregatePartition(read(), sibling)?.serial).toBe(1);
    expect(read()).not.toHaveProperty('provider');
    expect((await open(sibling).loadState()).provider).toBe('volcengine');
    expect(key).not.toContain('.scopes');
  });

  it('uses one deployment lock across providers and regions', async () => {
    const { open } = fixture(kind);
    const first = open();
    const other = open(sibling);
    const callback = jest.fn();
    await first.withLock('deploy', async () => {
      const lock = await other.readLock();
      expect(lock?.operation).toBe('deploy');
      await expect(
        other.withLock('deploy', callback, { timeout: 0, maxRetries: 0, retryDelay: 1 }),
      ).rejects.toThrow();
      await first.saveState(emptyDeploymentState(scope));
    });
    expect(callback).not.toHaveBeenCalled();
    expect(await other.readLock()).toBeNull();
  });

  it('refuses stale plans before cloud callbacks but accepts sibling state commits', async () => {
    const { open } = fixture(kind);
    await open().saveState(emptyDeploymentState(scope));
    const planned = open();
    await planned.loadState();
    await open().saveState(emptyDeploymentState(scope));
    const callback = jest.fn();
    await expect(planned.withLock('deploy', callback)).rejects.toThrow('STATE_PLAN_BASE_CHANGED');
    expect(callback).not.toHaveBeenCalled();
    expect(await planned.readLock()).toBeNull();
    await planned.loadState();
    await open(sibling).saveState(emptyDeploymentState(sibling));
    await planned.withLock('deploy', callback);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('keeps partial target state and sibling metadata when a callback fails', async () => {
    const { open, read } = fixture(kind);
    await open(sibling).saveState(emptyDeploymentState(sibling));
    const before = JSON.stringify(aggregatePartition(read(), sibling));
    const backend = open();
    const failure = new Error('cloud operation failed');
    await expect(
      backend.withLock('deploy', async () => {
        await backend.saveState(emptyDeploymentState(scope));
        throw failure;
      }),
    ).rejects.toBe(failure);
    expect(aggregatePartition(read(), scope)?.serial).toBe(1);
    expect(JSON.stringify(aggregatePartition(read(), sibling))).toBe(before);
    expect(await backend.readLock()).toBeNull();
  });

  it('patches only one partition under the shared lock', async () => {
    const { open, read } = fixture(kind);
    await open().saveState(emptyDeploymentState(scope));
    await open(sibling).saveState(emptyDeploymentState(sibling));
    const backend = open();
    await backend.withLock(
      'migrate',
      async () => {
        await backend.patchPersisted!({ managedBy: 'saas' });
      },
      { timeout: 0, maxRetries: 0 },
    );
    expect(aggregatePartition(read(), scope)?.managedBy).toBe('saas');
    expect(aggregatePartition(read(), sibling)?.managedBy).toBeUndefined();
  });

  it('preserves an unprepared legacy source without executing write callbacks', async () => {
    const { open, write, read } = fixture(kind);
    const previous = {
      version: '3.0',
      app: 'shop',
      service: 'api',
      provider: 'aliyun',
      stages: { prod: { resources: {} } },
    };
    write(previous);
    const callback = jest.fn();
    const backend = open();
    expect((await backend.loadState()).version).toBe('4.0');
    expect((await backend.probeWriteReadiness()).ready).toBe(false);
    await expect(backend.withLock('deploy', callback)).rejects.toThrow(
      'STATE_STORE_UPGRADE_REQUIRED',
    );
    expect(callback).not.toHaveBeenCalled();
    expect(read()).toEqual(previous);
    expect(await backend.readLock()).toBeNull();
  });

  it('supports explicit lock lifecycle and rejects an unrelated force-unlock ID', async () => {
    const { open } = fixture(kind);
    const backend = open();
    const other = open(sibling);
    const id = await backend.acquireLock('deploy');
    expect((await other.readLock())?.id).toBe(id);
    await expect(other.forceUnlock('wrong-id')).rejects.toThrow();
    await backend.saveState(emptyDeploymentState(scope));
    await backend.releaseLock(id);
    expect(await other.readLock()).toBeNull();
    const nextId = await backend.acquireLock('deploy');
    expect(await backend.forceUnlock(nextId)).toBe(true);
    expect(await backend.forceUnlock(nextId)).toBe(false);
    await backend.saveState(emptyDeploymentState(scope));
    expect(await backend.readLock()).toBeNull();
  });
});

it('refuses Bucket mutation without exclusive creation support', async () => {
  const { adapter, open } = fixture('bucket');
  delete adapter.putIfAbsent;
  const callback = jest.fn();
  await expect(open().withLock('deploy', callback)).rejects.toThrow('STATE_ATOMIC_CREATE_REQUIRED');
  expect(callback).not.toHaveBeenCalled();
  expect(adapter.write).not.toHaveBeenCalled();
});

it('preserves a verified Local backup when recovering and replacing a corrupt primary', async () => {
  const { open, read, key } = fixture('local');
  await open().saveState(emptyDeploymentState(scope));
  const verified = JSON.stringify(read());
  fs.writeFileSync(`${key}.backup`, verified);
  fs.writeFileSync(key, '{broken JSON');
  const backend = open(sibling);
  expect((await backend.loadState()).resources).toEqual({});
  await backend.saveState(emptyDeploymentState(sibling));
  expect(JSON.parse(fs.readFileSync(`${key}.backup`, 'utf-8'))).toEqual(JSON.parse(verified));
  expect(aggregatePartition(read(), scope)?.serial).toBe(1);
  expect(aggregatePartition(read(), sibling)?.serial).toBe(1);
});
