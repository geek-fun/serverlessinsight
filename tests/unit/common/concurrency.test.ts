import { PLAN_READ_CONCURRENCY, mapWithConcurrency } from '../../../src/common/concurrency';

describe('mapWithConcurrency', () => {
  it('maps all items preserving order', async () => {
    const result = await mapWithConcurrency([1, 2, 3, 4, 5], 2, async (n) => n * 2);

    expect(result).toEqual([2, 4, 6, 8, 10]);
  });

  it('never runs more than limit items concurrently', async () => {
    let inflight = 0;
    let peak = 0;
    const result = await mapWithConcurrency(
      Array.from({ length: 25 }, (_, i) => i),
      5,
      async (n) => {
        inflight += 1;
        peak = Math.max(peak, inflight);
        await new Promise((resolve) => setTimeout(resolve, 5));
        inflight -= 1;
        return n;
      },
    );

    expect(result).toHaveLength(25);
    expect(peak).toBeLessThanOrEqual(5);
  });

  it('handles an empty input array', async () => {
    const result = await mapWithConcurrency([], PLAN_READ_CONCURRENCY, async () => 1);

    expect(result).toEqual([]);
  });

  it('propagates worker rejections', async () => {
    await expect(
      mapWithConcurrency([1, 2], 2, async (n) => {
        if (n === 2) {
          throw new Error('boom');
        }
        return n;
      }),
    ).rejects.toThrow('boom');
  });
});
