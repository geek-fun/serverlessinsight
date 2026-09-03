import { sleep } from './retryUtils';

/**
 * Provider management-API throttling recognition (issue #234). Error shapes
 * differ across SDKs: Alibaba/Volcengine/Tencent expose `code`, Volcengine TLS
 * nests it under `response.data.Error.Code`, and Tencent scopes the frequency
 * limit as `RequestLimitExceeded.UinLimitExceeded` etc. All three families map
 * onto one recognizer because none of the SDKs retry throttling by default.
 */
const isThrottlingCode = (code: unknown): boolean => {
  if (typeof code === 'string') {
    return (
      code.startsWith('Throttling') ||
      code.startsWith('RequestLimitExceeded') ||
      code === 'FlowLimitExceeded' ||
      code === 'SlowDown' ||
      code === 'TooManyRequests'
    );
  }
  return code === 100018; // Volcengine FlowLimitExceeded numeric code
};

export const isThrottlingError = (error: unknown): boolean => {
  if (!error || typeof error !== 'object') {
    return false;
  }
  const candidate = error as {
    code?: unknown;
    response?: { data?: { Error?: { Code?: unknown } } };
  };
  if (isThrottlingCode(candidate.code)) {
    return true;
  }
  return isThrottlingCode(candidate.response?.data?.Error?.Code);
};

const RETRY_DELAY_BASE_MS = 250;
const RETRY_JITTER_MAX_MS = 150;

const jitteredBackoff = (attempt: number): number =>
  RETRY_DELAY_BASE_MS * 2 ** attempt + Math.floor(Math.random() * RETRY_JITTER_MAX_MS);

/**
 * Retries a load only on recognized throttling errors with exponential backoff
 * + jitter. Used on the refresh/plan read path; write operations must not be
 * auto-retried through this helper (idempotency is their caller's concern).
 */
export const withThrottleRetry = async <T>(load: () => Promise<T>, maxAttempts = 3): Promise<T> => {
  let attempt = 0;
  for (;;) {
    try {
      return await load();
    } catch (error: unknown) {
      attempt += 1;
      if (!isThrottlingError(error) || attempt >= maxAttempts) {
        throw error;
      }
      await sleep(jitteredBackoff(attempt - 1));
    }
  }
};
