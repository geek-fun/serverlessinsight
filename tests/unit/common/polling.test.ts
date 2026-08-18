import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { pollUntil, PollingTimeoutError } from '../../../src/common/polling';

jest.mock('../../../src/common/retryUtils', () => ({
  sleep: jest.fn().mockImplementation(() => Promise.resolve()),
}));

import { sleep } from '../../../src/common/retryUtils';
const mockSleep = sleep as jest.Mock;

type State = { status: string };
const makeFetch = () =>
  jest.fn<() => Promise<State | null>>().mockResolvedValue({ status: 'Creating' });

describe('pollUntil', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const readyValue = { status: 'Active' };

  it('resolves immediately when isDone is true on first fetch', async () => {
    const fetch = makeFetch().mockResolvedValue(readyValue);
    const result = await pollUntil({
      description: 'test resource ready',
      fetch,
      isDone: (v) => v?.status === 'Active',
      intervalMs: 3000,
      maxAttempts: 20,
    });

    expect(result).toEqual(readyValue);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(mockSleep).not.toHaveBeenCalled();
  });

  it('polls until done, sleeping between attempts', async () => {
    const fetch = makeFetch()
      .mockResolvedValueOnce({ status: 'Creating' })
      .mockResolvedValueOnce({ status: 'Creating' })
      .mockResolvedValueOnce(readyValue);

    const result = await pollUntil({
      description: 'test resource ready',
      fetch,
      isDone: (v) => v?.status === 'Active',
      intervalMs: 3000,
      maxAttempts: 20,
    });

    expect(result).toEqual(readyValue);
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(mockSleep).toHaveBeenCalledTimes(2);
    expect(mockSleep).toHaveBeenCalledWith(3000);
  });

  it('throws PollingTimeoutError after maxAttempts when never done', async () => {
    const fetch = makeFetch();

    const promise = pollUntil({
      description: 'test resource ready',
      fetch,
      isDone: (v) => v?.status === 'Active',
      intervalMs: 1000,
      maxAttempts: 3,
    });

    await expect(promise).rejects.toBeInstanceOf(PollingTimeoutError);
    await expect(promise).rejects.toThrow(/Polling timed out: test resource ready/);
    await expect(promise).rejects.toMatchObject({
      ctx: {
        description: 'test resource ready',
        attempts: 3,
        maxAttempts: 3,
        intervalMs: 1000,
      },
    });
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(mockSleep).toHaveBeenCalledTimes(2);
  });

  it('propagates fetch errors (does not swallow)', async () => {
    const boom = new Error('status check failed');
    const fetch = makeFetch().mockRejectedValue(boom);

    const promise = pollUntil({
      description: 'test resource ready',
      fetch,
      isDone: (v) => v?.status === 'Active',
      intervalMs: 1000,
      maxAttempts: 3,
    });

    await expect(promise).rejects.toThrow('status check failed');
  });

  it('supports null fetch results (caller decides via isDone)', async () => {
    const fetch = makeFetch().mockResolvedValueOnce(null).mockResolvedValueOnce(readyValue);

    const result = await pollUntil({
      description: 'resource appears',
      fetch,
      isDone: (v) => v !== null && v.status === 'Active',
      intervalMs: 1000,
      maxAttempts: 5,
    });

    expect(result).toEqual(readyValue);
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('invokes onProgress once per attempt with attempt index', async () => {
    const fetch = makeFetch()
      .mockResolvedValueOnce({ status: 'Creating' })
      .mockResolvedValueOnce(readyValue);
    const onProgress = jest.fn();

    await pollUntil({
      description: 'test resource ready',
      fetch,
      isDone: (v) => v?.status === 'Active',
      intervalMs: 1000,
      maxAttempts: 5,
      onProgress,
    });

    expect(onProgress).toHaveBeenCalledTimes(2);
    expect(onProgress).toHaveBeenNthCalledWith(1, { status: 'Creating' }, 1, 5);
    expect(onProgress).toHaveBeenNthCalledWith(2, readyValue, 2, 5);
  });

  it('works without onProgress (optional)', async () => {
    const fetch = makeFetch().mockResolvedValue(readyValue);

    const result = await pollUntil({
      description: 'test resource ready',
      fetch,
      isDone: (v) => v?.status === 'Active',
      intervalMs: 1000,
      maxAttempts: 5,
    });

    expect(result).toEqual(readyValue);
  });

  it('maxAttempts=1 performs a single fetch and throws if not done', async () => {
    const fetch = makeFetch();

    const promise = pollUntil({
      description: 'single attempt',
      fetch,
      isDone: (v) => v?.status === 'Active',
      intervalMs: 1000,
      maxAttempts: 1,
    });

    await expect(promise).rejects.toBeInstanceOf(PollingTimeoutError);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(mockSleep).not.toHaveBeenCalled();
  });

  it('returns last fetched value on success (not a wrapper)', async () => {
    const fetch = makeFetch().mockResolvedValue(readyValue);

    const result = await pollUntil({
      description: 'test',
      fetch,
      isDone: (v) => v?.status === 'Active',
      intervalMs: 1000,
      maxAttempts: 5,
    });

    expect(result).toBe(readyValue);
  });
});

describe('pollUntil requiredConsecutiveHits', () => {
  const readyValue = { status: 'Active' };

  it('requires the done state to be observed N consecutive times', async () => {
    const fetch = makeFetch()
      .mockResolvedValueOnce(readyValue) // hit 1
      .mockResolvedValueOnce({ status: 'Creating' }) // breaks the streak
      .mockResolvedValueOnce(readyValue) // hit 1 again
      .mockResolvedValueOnce(readyValue) // hit 2 -> done
      .mockResolvedValue(readyValue);

    const result = await pollUntil({
      description: 'consecutive test',
      fetch,
      isDone: (v) => v?.status === 'Active',
      intervalMs: 1000,
      maxAttempts: 10,
      requiredConsecutiveHits: 2,
    });

    expect(result).toEqual(readyValue);
    expect(fetch).toHaveBeenCalledTimes(4);
  });

  it('defaults to 1 consecutive hit when option omitted', async () => {
    const fetch = makeFetch().mockResolvedValue(readyValue);

    const result = await pollUntil({
      description: 'default hits',
      fetch,
      isDone: (v) => v?.status === 'Active',
      intervalMs: 1000,
      maxAttempts: 5,
    });

    expect(result).toEqual(readyValue);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('throws timeout if consecutive hits never reach the required count', async () => {
    // Alternating done/not-done prevents the streak from ever reaching 2
    const fetch = makeFetch()
      .mockResolvedValueOnce(readyValue)
      .mockResolvedValueOnce({ status: 'Creating' })
      .mockResolvedValueOnce(readyValue);

    const promise = pollUntil({
      description: 'never enough consecutive',
      fetch,
      isDone: (v) => v?.status === 'Active',
      intervalMs: 1000,
      maxAttempts: 3,
      requiredConsecutiveHits: 2,
    });

    await expect(promise).rejects.toBeInstanceOf(PollingTimeoutError);
    expect(fetch).toHaveBeenCalledTimes(3);
  });
});
