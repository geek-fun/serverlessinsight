import { sleep } from './retryUtils';

export class PollingTimeoutError extends Error {
  constructor(
    public readonly ctx: {
      description: string;
      lastValue: unknown;
      attempts: number;
      maxAttempts: number;
      intervalMs: number;
    },
  ) {
    super(
      `Polling timed out: ${ctx.description} after ${ctx.attempts} attempts ` +
        `× ${ctx.intervalMs}ms (last value: ${
          ctx.lastValue === undefined ? 'undefined' : JSON.stringify(ctx.lastValue)
        })`,
    );
    this.name = 'PollingTimeoutError';
  }
}

export type PollUntilOptions<T> = {
  /** Human-readable description of what is being waited for (used in errors/logs). */
  description: string;
  /** Fetches the current state; may throw — the error is propagated (not swallowed). */
  fetch: () => Promise<T | null>;
  /** Returns true when the desired state has been reached. */
  isDone: (value: T | null) => boolean;
  /** Delay between polls. */
  intervalMs: number;
  /** Maximum number of fetch attempts before timing out. */
  maxAttempts: number;
  /** Optional per-attempt callback: (value, attempt, maxAttempts). */
  onProgress?: (value: T | null, attempt: number, maxAttempts: number) => void;
  /** Require the done state to be observed this many consecutive times (anti stale-read). Default 1. */
  requiredConsecutiveHits?: number;
};

/**
 * Generic polling primitive — the single wait implementation for async cloud
 * resource creation (mirrors Terraform's StateChangeConf / Tencent Cloud's
 * waitScfFunctionReady pattern).
 *
 * - fetch errors propagate immediately (callers detect error states by throwing
 *   from their fetch wrapper)
 * - on timeout, throws PollingTimeoutError carrying the last observed value
 * - requiredConsecutiveHits guards against eventually-consistent APIs returning
 *   stale state (the done state must be observed N times in a row)
 */
export const pollUntil = async <T>(options: PollUntilOptions<T>): Promise<T | null> => {
  const {
    description,
    fetch,
    isDone,
    intervalMs,
    maxAttempts,
    onProgress,
    requiredConsecutiveHits = 1,
  } = options;

  let consecutiveHits = 0;
  let lastValue: T | null = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    lastValue = await fetch();
    onProgress?.(lastValue, attempt, maxAttempts);

    if (isDone(lastValue)) {
      consecutiveHits++;
      if (consecutiveHits >= requiredConsecutiveHits) {
        return lastValue;
      }
    } else {
      consecutiveHits = 0;
    }

    if (attempt < maxAttempts) {
      await sleep(intervalMs);
    }
  }

  throw new PollingTimeoutError({
    description,
    lastValue,
    attempts: maxAttempts,
    maxAttempts,
    intervalMs,
  });
};
