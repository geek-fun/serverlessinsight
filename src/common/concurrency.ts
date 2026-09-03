/**
 * Bounded-concurrency map for planner read fan-outs (issue #234 rate-limit
 * mitigation): each planner probes resources concurrently, and a naive
 * Promise.all burst can exceed provider management-API QPS (e.g. Tencent CAM
 * GetRole at 20/s). The limit is deliberately provider-neutral and coarse —
 * ~10 in-flight reads per planner group — since provider quota tables are
 * partially unpublished (Volcengine, Aliyun OSS management plane).
 */
export const PLAN_READ_CONCURRENCY = 10;

export const mapWithConcurrency = async <T, R>(
  items: Array<T>,
  limit: number,
  fn: (item: T, index: number) => Promise<R>,
): Promise<Array<R>> => {
  const results = new Array<R>(items.length);
  let nextIndex = 0;
  const workerCount = Math.min(limit, items.length);
  const workers = Array.from({ length: workerCount }, async () => {
    while (true) {
      const index = nextIndex;
      nextIndex += 1;
      if (index >= items.length) {
        return;
      }
      results[index] = await fn(items[index], index);
    }
  });
  await Promise.all(workers);
  return results;
};
