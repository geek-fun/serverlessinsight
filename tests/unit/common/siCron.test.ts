import { parseSiCron, translateSiCron, validateSiCron } from '../../../src/common/siCron';

jest.mock('../../../src/lang', () => ({
  lang: {
    __: jest.fn(
      (key: string, params?: Record<string, unknown>) => `${key}:${JSON.stringify(params ?? {})}`,
    ),
  },
}));

describe('parseSiCron', () => {
  it('parses a 5-field expression without seconds', () => {
    const parsed = parseSiCron('23 3 * * *');
    expect(parsed.kind).toBe('cron');
    if (parsed.kind === 'cron') {
      expect(parsed.hasSeconds).toBe(false);
      expect(parsed.fields.minute.values).toEqual([23]);
      expect(parsed.fields.hour.values).toEqual([3]);
      expect(parsed.fields.second.values).toEqual([0]);
    }
  });

  it('parses a 6-field expression with a seconds prefix', () => {
    const parsed = parseSiCron('0 23 3 * * *');
    expect(parsed.kind).toBe('cron');
    if (parsed.kind === 'cron') {
      expect(parsed.hasSeconds).toBe(true);
      expect(parsed.fields.second.values).toEqual([0]);
    }
  });

  it('expands steps, ranges, lists and names', () => {
    const parsed = parseSiCron('*/15 0-4 * JAN-MAR MON,FRI');
    expect(parsed.kind).toBe('cron');
    if (parsed.kind === 'cron') {
      expect(parsed.fields.minute.values).toEqual([0, 15, 30, 45]);
      expect(parsed.fields.hour.values).toEqual([0, 1, 2, 3, 4]);
      expect(parsed.fields.month.values).toEqual([1, 2, 3]);
      expect(parsed.fields.dayOfWeek.values).toEqual([1, 5]);
    }
  });

  it('stops stepped ranges at their end without wrapping (vixie semantics)', () => {
    // regression: 5-20/4 must be {5,9,13,17} — the wrap walk used to collect
    // every step around the whole domain
    const parsed = parseSiCron('5-20/4 0 * * *');
    if (parsed.kind === 'cron') {
      expect(parsed.fields.minute.values).toEqual([5, 9, 13, 17]);
    }
  });

  it('wraps cyclic ranges (FRI-MON) and normalizes Sunday aliases', () => {
    const parsed = parseSiCron('0 0 * * FRI-MON');
    if (parsed.kind === 'cron') {
      expect(parsed.fields.dayOfWeek.values).toEqual([0, 1, 5, 6]);
    }
    const sundayAlias = parseSiCron('0 0 * * 7');
    if (sundayAlias.kind === 'cron') {
      expect(sundayAlias.fields.dayOfWeek.values).toEqual([0]);
    }
  });

  it('parses @every durations with compound sums', () => {
    expect(parseSiCron('@every 30m')).toEqual({ kind: 'every', totalSeconds: 1800 });
    expect(parseSiCron('@every 1h30m')).toEqual({ kind: 'every', totalSeconds: 5400 });
  });

  it('rejects wrong field counts and junk fields', () => {
    expect(() => parseSiCron('* * * *')).toThrow('SI_CRON_WRONG_FIELD_COUNT');
    expect(() => parseSiCron('* * * * * * *')).toThrow('SI_CRON_WRONG_FIELD_COUNT');
    expect(() => parseSiCron('a b c d e')).toThrow('SI_CRON_FIELD_INVALID');
    expect(() => parseSiCron('60 * * * *')).toThrow('SI_CRON_FIELD_RANGE');
    expect(() => parseSiCron('* 24 * * *')).toThrow('SI_CRON_FIELD_RANGE');
    expect(() => parseSiCron('10-5 * * * *')).toThrow('SI_CRON_RANGE_DESCENDING');
    expect(() => parseSiCron('*/0 * * * *')).toThrow('SI_CRON_STEP_INVALID');
    expect(() => parseSiCron('')).toThrow('SI_CRON_EMPTY');
    expect(() => parseSiCron('@every 0h')).toThrow('SI_CRON_EVERY_INVALID');
    expect(() => parseSiCron('@every soon')).toThrow('SI_CRON_EVERY_INVALID');
  });

  it('validates without returning a value', () => {
    expect(() => validateSiCron('0 23 3 * * *')).not.toThrow();
    expect(() => validateSiCron('nope')).toThrow();
  });
});

describe('translateSiCron → aliyun (6-field, UTC+8)', () => {
  it('prepends a 0 second to 5-field expressions and shifts hours', () => {
    // 23:03 UTC === 07:03 UTC+8 next day
    expect(translateSiCron('3 23 * * *', 'aliyun')).toBe('0 3 7 * * *');
    // 02:00 UTC === 10:00 UTC+8 same day
    expect(translateSiCron('0 2 * * *', 'aliyun')).toBe('0 0 10 * * *');
  });

  it('passes 6-field expressions through with the hour shift', () => {
    expect(translateSiCron('30 0 12 * * *', 'aliyun')).toBe('30 0 20 * * *');
  });

  it('keeps wildcard hours and daily schedules unshifted', () => {
    expect(translateSiCron('0 * * * *', 'aliyun')).toBe('0 0 * * * *');
    expect(translateSiCron('0 * 5 3 *', 'aliyun')).toBe('0 0 * 5 3 *');
  });

  it('shifts day-of-week when the hour crosses midnight', () => {
    // Monday 23:00 UTC === Tuesday 07:00 UTC+8
    expect(translateSiCron('0 23 * * MON', 'aliyun')).toBe('0 0 7 * * 2');
    // Monday 20:00 UTC === Tuesday 04:00 UTC+8
    expect(translateSiCron('0 20 * * 1', 'aliyun')).toBe('0 0 4 * * 2');
  });

  it('shifts day-of-month when the hour crosses midnight', () => {
    // 1st 20:00 UTC === 2nd 04:00 UTC+8 (every month has a 2nd)
    expect(translateSiCron('0 20 1 * *', 'aliyun')).toBe('0 0 4 2 * *');
  });

  it('rolls month-end schedules into the next month', () => {
    expect(translateSiCron('0 20 31 1 *', 'aliyun')).toBe('0 0 4 1 2 *');
    expect(translateSiCron('0 20 28 2 *', 'aliyun')).toBe('0 0 4 1 3 *');
  });

  it('rejects crossings that would silently change firing dates', () => {
    // day 31 with a wildcard month cannot shift losslessly
    expect(() => translateSiCron('0 20 31 * *', 'aliyun')).toThrow('SI_CRON_SHIFT_UNSUPPORTED');
    // both day fields restricted + crossing is inexpressible
    expect(() => translateSiCron('0 20 15 * MON', 'aliyun')).toThrow('SI_CRON_SHIFT_UNSUPPORTED');
  });

  it('does not invent extra firing hours for stepped ranges that cross midnight', () => {
    // regression: 10-20/8 = {10,18} UTC → {18,2} UTC+8 — the wrap bug used to
    // add a phantom 10:00 UTC+8 firing hour
    expect(translateSiCron('0 10-20/8 * * *', 'aliyun')).toBe('0 0 2,18 * * *');
  });

  it('compresses shifted hour lists into runs', () => {
    // 20,22 UTC → 4,6 UTC+8
    expect(translateSiCron('0 20,22 * * *', 'aliyun')).toBe('0 0 4,6 * * *');
    // 16-23 UTC → 0-7 UTC+8
    expect(translateSiCron('0 16-23 * * *', 'aliyun')).toBe('0 0 0-7 * * *');
  });
});

describe('translateSiCron → tencent (7-field, UTC+8)', () => {
  it('appends a wildcard year and prepends seconds', () => {
    expect(translateSiCron('0 2 * * *', 'tencent')).toBe('0 0 10 * * * *');
    expect(translateSiCron('30 0 12 * * *', 'tencent')).toBe('30 0 20 * * * *');
  });
});

describe('translateSiCron → volcengine (5-field crontab, UTC+8)', () => {
  it('drops the zero seconds field', () => {
    expect(translateSiCron('0 2 * * *', 'volcengine')).toBe('0 10 * * *');
    expect(translateSiCron('0 23 3 * * *', 'volcengine')).toBe('23 11 * * *');
  });

  it('rejects non-zero seconds', () => {
    expect(() => translateSiCron('30 0 12 * * *', 'volcengine')).toThrow(
      'SI_CRON_SECONDS_UNSUPPORTED',
    );
  });

  it('normalizes the Sunday alias 7 to 0', () => {
    expect(translateSiCron('0 0 * * 7', 'volcengine')).toBe('0 8 * * 0');
  });
});

describe('translateSiCron @every durations', () => {
  it('translates even-dividing durations per dialect', () => {
    expect(translateSiCron('@every 30s', 'aliyun')).toBe('*/30 * * * * *');
    expect(translateSiCron('@every 5m', 'aliyun')).toBe('0 */5 * * * *');
    expect(translateSiCron('@every 1m', 'tencent')).toBe('0 * * * * * *');
    expect(translateSiCron('@every 1h', 'aliyun')).toBe('0 0 * * * *');
    expect(translateSiCron('@every 12h', 'volcengine')).toBe('0 */12 * * *');
    expect(translateSiCron('@every 1d', 'aliyun')).toBe('0 0 0 * * *');
    expect(translateSiCron('@every 1d', 'volcengine')).toBe('0 0 * * *');
    expect(translateSiCron('@every 1w', 'volcengine')).toBe('0 0 * * 1');
    expect(translateSiCron('@every 1w', 'tencent')).toBe('0 0 0 * * 1 *');
  });

  it('rejects durations the dialect cannot express', () => {
    expect(() => translateSiCron('@every 45s', 'aliyun')).toThrow('SI_CRON_EVERY_NOT_EXPRESSIBLE');
    expect(() => translateSiCron('@every 30s', 'volcengine')).toThrow(
      'SI_CRON_EVERY_NOT_EXPRESSIBLE',
    );
    expect(() => translateSiCron('@every 90m', 'aliyun')).toThrow('SI_CRON_EVERY_NOT_EXPRESSIBLE');
    expect(() => translateSiCron('@every 5h', 'aliyun')).toThrow('SI_CRON_EVERY_NOT_EXPRESSIBLE');
    expect(() => translateSiCron('@every 1h30m', 'aliyun')).toThrow(
      'SI_CRON_EVERY_NOT_EXPRESSIBLE',
    );
  });
});
