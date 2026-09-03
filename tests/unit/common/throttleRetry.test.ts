import { isThrottlingError, withThrottleRetry } from '../../../src/common/throttleRetry';

describe('isThrottlingError', () => {
  it('recognizes Aliyun throttling codes', () => {
    expect(isThrottlingError({ code: 'Throttling' })).toBe(true);
    expect(isThrottlingError({ code: 'Throttling.User' })).toBe(true);
    expect(isThrottlingError({ code: 'RequestLimitExceeded' })).toBe(true);
  });

  it('recognizes Tencent scoped frequency limits', () => {
    expect(isThrottlingError({ code: 'RequestLimitExceeded.UinLimitExceeded' })).toBe(true);
  });

  it('recognizes Volcengine flow-limit shapes', () => {
    expect(isThrottlingError({ code: 'FlowLimitExceeded' })).toBe(true);
    expect(isThrottlingError({ code: 100018 })).toBe(true);
    expect(
      isThrottlingError({ response: { data: { Error: { Code: 'FlowLimitExceeded' } } } }),
    ).toBe(true);
  });

  it('rejects non-throttling errors and non-error values', () => {
    expect(isThrottlingError({ code: 'EntityNotExist.Role' })).toBe(false);
    expect(isThrottlingError({ code: 'LimitExceeded' })).toBe(false);
    expect(isThrottlingError(undefined)).toBe(false);
    expect(isThrottlingError('Throttling')).toBe(false);
  });
});

describe('withThrottleRetry', () => {
  it('retries only on throttling errors and eventually succeeds', async () => {
    const load = jest
      .fn()
      .mockRejectedValueOnce({ code: 'Throttling' })
      .mockResolvedValueOnce('ok');

    await expect(withThrottleRetry(load, 3)).resolves.toBe('ok');
    expect(load).toHaveBeenCalledTimes(2);
  });

  it('gives up after maxAttempts when throttling persists', async () => {
    const load = jest.fn().mockRejectedValue({ code: 'RequestLimitExceeded' });

    await expect(withThrottleRetry(load, 2)).rejects.toEqual({ code: 'RequestLimitExceeded' });
    expect(load).toHaveBeenCalledTimes(2);
  });

  it('does not retry non-throttling failures', async () => {
    const load = jest.fn().mockRejectedValue(new Error('EntityNotExist'));

    await expect(withThrottleRetry(load, 3)).rejects.toThrow('EntityNotExist');
    expect(load).toHaveBeenCalledTimes(1);
  });
});
