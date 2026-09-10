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
    resourceType: 'ALIYUN_OSS_BUCKET',
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
    expect(item.changes?.before).toEqual({ name: 'test', memory: 128, codeHash: 'old-hash' });
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

  it('stringifies non-Error read failures in the degradation warning', async () => {
    const warnSpy = jest.spyOn(logger, 'warn').mockImplementation(() => {});
    const read = jest.fn().mockRejectedValue('raw provider failure');
    const item = await planRefreshedResource(args({ read }));

    expect(item).toMatchObject({ action: 'create', drifted: true });
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Failed to read live state for buckets.test'),
    );
    warnSpy.mockRestore();
  });

  it('degrades a failed live read to a drifted create with a warning', async () => {
    const warnSpy = jest.spyOn(logger, 'warn').mockImplementation(() => {});
    const read = jest.fn().mockRejectedValue(new Error('throttled'));
    const item = await planRefreshedResource(args({ read }));

    expect(item).toMatchObject({ action: 'create', drifted: true });
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
