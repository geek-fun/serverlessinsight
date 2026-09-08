import { planRefreshedResource } from '../../../src/common/refreshPlanner';
import type { PlanRefreshedResourceArgs } from '../../../src/common/refreshPlanner';
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

  it('flags create+drifted when the remote is gone', async () => {
    const read = jest.fn().mockResolvedValue(null);
    const item = await planRefreshedResource(args({ read }));

    expect(item).toMatchObject({ action: 'create', drifted: true });
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
