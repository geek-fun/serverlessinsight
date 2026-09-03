import { cachedRefreshRead, createRefreshCache } from '../../../src/common/refreshCache';

jest.mock('../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

jest.mock('../../../src/lang', () => ({
  lang: { __: (key: string) => key },
}));

describe('refreshCache', () => {
  describe('createRefreshCache', () => {
    it('should load once and serve subsequent reads from cache', async () => {
      const cache = createRefreshCache();
      const loader = jest.fn().mockResolvedValue({ id: 'fn-1' });

      const first = await cache.read('fc3.getFunction:test', loader);
      const second = await cache.read('fc3.getFunction:test', loader);

      expect(first).toEqual({ id: 'fn-1' });
      expect(second).toEqual({ id: 'fn-1' });
      expect(loader).toHaveBeenCalledTimes(1);
    });

    it('should share a single in-flight promise for concurrent reads of the same key', async () => {
      const cache = createRefreshCache();
      const loader = jest.fn().mockImplementation(
        () =>
          new Promise((resolve) => {
            setTimeout(() => resolve({ id: 'sg-1' }), 10);
          }),
      );

      const [a, b, c] = await Promise.all([
        cache.read('ecs.getSecurityGroupByName:app-sg', loader),
        cache.read('ecs.getSecurityGroupByName:app-sg', loader),
        cache.read('ecs.getSecurityGroupByName:app-sg', loader),
      ]);

      expect(a).toEqual({ id: 'sg-1' });
      expect(b).toEqual({ id: 'sg-1' });
      expect(c).toEqual({ id: 'sg-1' });
      expect(loader).toHaveBeenCalledTimes(1);
    });

    it('should not cache failures so later callers retry against the provider', async () => {
      const cache = createRefreshCache();
      const loader = jest
        .fn()
        .mockRejectedValueOnce(new Error('throttled'))
        .mockResolvedValueOnce({ id: 'fn-1' });

      await expect(cache.read('fc3.getFunction:test', loader)).rejects.toThrow('throttled');
      await expect(cache.read('fc3.getFunction:test', loader)).resolves.toEqual({ id: 'fn-1' });
      expect(loader).toHaveBeenCalledTimes(2);
    });

    it('should isolate keys and cache instances from each other', async () => {
      const cache = createRefreshCache();
      const loaderA = jest.fn().mockResolvedValue('a');
      const loaderB = jest.fn().mockResolvedValue('b');
      const otherCache = createRefreshCache();
      const loaderOther = jest.fn().mockResolvedValue('other');

      await expect(cache.read('key:a', loaderA)).resolves.toBe('a');
      await expect(cache.read('key:b', loaderB)).resolves.toBe('b');
      await expect(otherCache.read('key:a', loaderOther)).resolves.toBe('other');

      expect(loaderA).toHaveBeenCalledTimes(1);
      expect(loaderB).toHaveBeenCalledTimes(1);
      expect(loaderOther).toHaveBeenCalledTimes(1);
    });
  });

  describe('cachedRefreshRead', () => {
    it('should route through the context cache when present', async () => {
      const context = { refreshCache: createRefreshCache() };
      const loader = jest.fn().mockResolvedValue({ id: 'fn-1' });

      await cachedRefreshRead(context, 'fc3.getFunction:test', loader);
      await cachedRefreshRead(context, 'fc3.getFunction:test', loader);

      expect(loader).toHaveBeenCalledTimes(1);
    });

    it('should load directly when the context carries no cache', async () => {
      const context = {};
      const loader = jest.fn().mockResolvedValue({ id: 'fn-1' });

      await cachedRefreshRead(context, 'fc3.getFunction:test', loader);
      await cachedRefreshRead(context, 'fc3.getFunction:test', loader);

      expect(loader).toHaveBeenCalledTimes(2);
    });
  });
});
