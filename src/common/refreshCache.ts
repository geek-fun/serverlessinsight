import { logger } from './logger';
import { lang } from '../lang';
import { withThrottleRetry } from './throttleRetry';

/**
 * Command-lifecycle scoped read-through cache for provider state reads issued
 * by planning/refresh (issue #234 rate-limit mitigation). `si deploy` computes
 * the plan twice (display pass in commands/deploy.ts + executor pass in each
 * provider deployer), and planners probe the same resources in both passes.
 * Reads issued through this cache execute at most once per command run.
 *
 * Scope rules:
 * - Planning/refresh reads ONLY. Executor reads (post-mutation or
 *   mutation-time freshness checks) must never go through this cache.
 * - Single-flight: concurrent callers asking for the same key share one
 *   in-flight promise.
 * - Failures are not cached: a rejected read evicts its key so later callers
 *   retry against the provider.
 * - One instance per Context: `setContext` creates it, so every command
 *   lifecycle starts empty and caches never leak across commands or tests.
 */
export type RefreshCache = {
  read: <T>(key: string, load: () => Promise<T>) => Promise<T>;
};

export const createRefreshCache = (): RefreshCache => {
  const inflight = new Map<string, Promise<unknown>>();

  return {
    read: <T>(key: string, load: () => Promise<T>): Promise<T> => {
      const existing = inflight.get(key);
      if (existing) {
        logger.debug(lang.__('REFRESH_CACHE_HIT', { key }));
        return existing as Promise<T>;
      }
      const promise = withThrottleRetry(load).catch((error: unknown) => {
        inflight.delete(key);
        throw error;
      });
      inflight.set(key, promise);
      return promise;
    },
  };
};

/**
 * Read-through helper for planner call sites: uses the context-scoped cache
 * when present, otherwise loads directly. Planners receive the context as a
 * parameter, so tests can decide whether caching applies.
 */
export const cachedRefreshRead = <T>(
  context: { refreshCache?: RefreshCache },
  key: string,
  load: () => Promise<T>,
): Promise<T> => (context.refreshCache ? context.refreshCache.read(key, load) : load());
