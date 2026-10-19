import { planRefreshedResource } from '../../../src/common/refreshPlanner';
import type { PlanRefreshedResourceArgs } from '../../../src/common/refreshPlanner';
import { logger } from '../../../src/common/logger';
import type { ResourceState } from '../../../src/types';

type Remote = { name: string; memory: number };

describe('planRefreshedResource', () => {
  const currentState: ResourceState = {
    mode: 'managed',
    region: 'cn-hangzhou',
    definition: { name: 'test', memory: 128 },
    instances: [{ sid: 's', id: 'test' }],
    lastUpdated: '2024-01-01T00:00:00Z',
  };

  const args = (
    overrides?: Partial<PlanRefreshedResourceArgs<Remote>>,
  ): PlanRefreshedResourceArgs<Remote> => ({
    logicalId: 'buckets.test',
    resourceType: 'TEST_RESOURCE',
    currentState,
    desiredDefinition: { name: 'test', memory: 128 },
    read: jest.fn().mockResolvedValue({ name: 'test', memory: 128 }),
    isOwned: () => true,
    foreignError: () => new Error('foreign'),
    cloudToDefinition: (remote) => ({ ...remote }),
    ...overrides,
  });

  it('returns noop when the live cloud matches the intent', async () => {
    const overrides = args();
    const item = await planRefreshedResource(overrides);

    expect(item).toMatchObject({ action: 'noop' });
    expect(overrides.read).toHaveBeenCalledTimes(1);
  });

  it('rejects a changed resource type before making a provider read', async () => {
    const read = jest.fn();

    await expect(
      planRefreshedResource(
        args({
          currentState: { ...currentState, metadata: { resourceType: 'PREVIOUS_RESOURCE' } },
          read,
        }),
      ),
    ).rejects.toThrow('replacement');
    expect(read).not.toHaveBeenCalled();
  });

  it('accepts matching resource-type metadata', async () => {
    const item = await planRefreshedResource(
      args({
        currentState: { ...currentState, metadata: { resourceType: 'TEST_RESOURCE' } },
      }),
    );

    expect(item.action).toBe('noop');
  });

  it('flags update+drifted when the live attributes drifted', async () => {
    const read = jest.fn().mockResolvedValue({ name: 'test', memory: 64 });
    const item = await planRefreshedResource(args({ read }));

    expect(item).toMatchObject({ action: 'update', drifted: true });
  });

  // Issue #246: the diff baseline for a drift update is cloud reality.
  it('uses the live attributes as changes.before and marks revert keys', async () => {
    const read = jest.fn().mockResolvedValue({ name: 'test', memory: 64 });
    const item = await planRefreshedResource(args({ read }));

    expect(item.changes?.before).toEqual({ name: 'test', memory: 64 });
    expect(item.changes?.after).toEqual({ name: 'test', memory: 128 });
    expect(item.revertKeys).toEqual(['memory']);
  });

  it('does not mark revert keys when the config itself changed the field', async () => {
    const read = jest.fn().mockResolvedValue({ name: 'test', memory: 64 });
    const item = await planRefreshedResource(
      args({ read, desiredDefinition: { name: 'test', memory: 256 } }),
    );

    expect(item.changes?.before).toEqual({ name: 'test', memory: 64 });
    expect(item.revertKeys).toBeUndefined();
  });

  it('carries stored keys the cloud mapper never emits into the diff baseline', async () => {
    const storedWithHash: ResourceState = {
      ...currentState,
      definition: { name: 'test', memory: 128, codeHash: 'old-hash' },
    };
    const read = jest.fn().mockResolvedValue({ name: 'test', memory: 128 });
    const item = await planRefreshedResource(
      args({
        currentState: storedWithHash,
        read,
        desiredDefinition: { name: 'test', memory: 256 },
      }),
    );

    // live memory (128) wins over stored memory for the diff baseline, while
    // the stored codeHash fills the dimension the cloud mapper never emits.
    expect(item.changes?.before).toEqual({ name: 'test', memory: 128 });
  });

  it('surfaces probe-level drift reasons from extraUpdate', async () => {
    const item = await planRefreshedResource(
      args({
        extraUpdate: () => Promise.resolve({ update: true, drifted: true, reason: 'PLAN_DRIFT_X' }),
      }),
    );

    expect(item).toMatchObject({ action: 'update', drifted: true, driftReasons: ['PLAN_DRIFT_X'] });
  });

  it('flags create+drifted when the remote is gone', async () => {
    const read = jest.fn().mockResolvedValue(null);
    const item = await planRefreshedResource(args({ read }));

    expect(item).toMatchObject({ action: 'create', drifted: true });
  });

  it('propagates non-Error read failures without inventing a create', async () => {
    const warnSpy = jest.spyOn(logger, 'warn').mockImplementation(() => {});
    const read = jest.fn().mockRejectedValue('raw provider failure');
    await expect(planRefreshedResource(args({ read }))).rejects.toBe('raw provider failure');

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Failed to read live state for buckets.test'),
    );
    warnSpy.mockRestore();
  });

  it('propagates a failed live read instead of planning recreation', async () => {
    const warnSpy = jest.spyOn(logger, 'warn').mockImplementation(() => {});
    const read = jest.fn().mockRejectedValue(new Error('throttled'));
    await expect(planRefreshedResource(args({ read }))).rejects.toThrow('throttled');

    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('throws on the probe path when a foreign same-named remote exists', async () => {
    await expect(
      planRefreshedResource(
        args({
          currentState: undefined,
          read: jest.fn().mockResolvedValue({ name: 'test' }),
          isOwned: () => false,
        }),
      ),
    ).rejects.toThrow('foreign');
  });

  describe('--no-refresh', () => {
    it('skips the live read and diffs intent only (no drifted claims)', async () => {
      const read = jest.fn().mockResolvedValue({ name: 'test', memory: 64 });
      const item = await planRefreshedResource(args({ read, refresh: false }));

      expect(read).not.toHaveBeenCalled();
      expect(item).toMatchObject({ action: 'noop' });
    });

    it('plans update without the drifted flag on intent changes', async () => {
      const read = jest.fn().mockResolvedValue({ name: 'test', memory: 128 });
      const item = await planRefreshedResource(
        args({
          read,
          refresh: false,
          desiredDefinition: { name: 'test', memory: 256 },
        }),
      );

      expect(read).not.toHaveBeenCalled();
      expect(item).toMatchObject({ action: 'update' });
      expect(item).not.toHaveProperty('drifted');
    });
  });
});

describe('refresh safety and intent adoption (issue #264)', () => {
  const resource: ResourceState = {
    mode: 'managed',
    region: 'test',
    definition: { memory: 128 },
    instances: [],
    lastUpdated: 'now',
  };
  const base = {
    logicalId: 'functions.test',
    resourceType: 'TEST',
    currentState: resource,
    desiredDefinition: { memory: 256 },
    read: async () => ({ memory: 128 }),
    cloudToDefinition: (value: { memory: number }) => value,
    isOwned: () => true,
    foreignError: () => new Error('foreign'),
  };

  it('does not mark an ordinary configuration change as cloud drift', async () => {
    const result = await planRefreshedResource(base);
    expect(result.action).toBe('update');
    expect(result.drifted).toBeUndefined();
  });

  it('adopts verified intent with no cloud mutation when cloud already matches', async () => {
    const result = await planRefreshedResource({ ...base, read: async () => ({ memory: 256 }) });
    expect(result).toMatchObject({ action: 'noop', stateUpdate: { memory: 256 } });
    expect(result.changes).toBeUndefined();
    expect(result.drifted).toBeUndefined();
  });

  it('runs nested repair probes even when intent changed', async () => {
    const extraUpdate = jest
      .fn()
      .mockResolvedValue({ update: true, drifted: true, reason: 'NESTED' });
    const result = await planRefreshedResource({ ...base, extraUpdate });
    expect(extraUpdate).toHaveBeenCalledTimes(1);
    expect(result).toMatchObject({ action: 'update', drifted: true, driftReasons: ['NESTED'] });
  });

  it('propagates enrichment and auxiliary read failures rather than creating', async () => {
    await expect(
      planRefreshedResource({
        ...base,
        enrichRemoteAttributes: async () => {
          throw new Error('denied');
        },
      }),
    ).rejects.toThrow('denied');
    await expect(
      planRefreshedResource({
        ...base,
        extraUpdate: async () => {
          throw new Error('timeout');
        },
      }),
    ).rejects.toThrow('timeout');
  });

  it('rejects physical renames before looking up the proposed new resource', async () => {
    const read = jest.fn();
    await expect(
      planRefreshedResource({
        ...base,
        resourceType: 'ALIYUN_OSS_BUCKET',
        currentState: { ...resource, definition: { bucketName: 'old' } },
        desiredDefinition: { bucketName: 'new' },
        read,
      }),
    ).rejects.toThrow('replacement');
    expect(read).not.toHaveBeenCalled();
  });
});
