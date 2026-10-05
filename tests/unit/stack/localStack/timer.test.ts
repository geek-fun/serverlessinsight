import {
  matchesNow,
  startLocalTimers,
  stopLocalTimers,
} from '../../../../src/stack/localStack/timer';
import { invokeFunction } from '../../../../src/stack/localStack/functionRunner';
import { parseSiCron } from '../../../../src/common/siCron';
import { ServerlessIac } from '../../../../src/types';

jest.mock('../../../../src/stack/localStack/functionRunner', () => ({
  invokeFunction: jest.fn().mockResolvedValue({ ok: true }),
}));

jest.mock('../../../../src/common', () => ({
  ...jest.requireActual('../../../../src/common'),
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

jest.mock('../../../../src/lang', () => ({
  lang: { __: (key: string) => key },
}));

jest.mock('../../../../src/stack/localStack/aliyunFc', () => ({
  generateRequestId: () => 'req-1',
  createAliyunContextSerializable: () => ({ requestId: 'req-1' }),
}));

jest.mock('../../../../src/stack/localStack/utils', () => ({
  resolveCodeDir: jest.fn().mockResolvedValue({ codeDir: '/tmp/code', tempDir: null }),
}));

const mockedInvokeFunction = invokeFunction as jest.Mock;

const schedule = (cron: string) => {
  const parsed = parseSiCron(cron);
  return parsed.kind === 'every'
    ? { kind: 'every' as const, intervalMs: parsed.totalSeconds * 1000 }
    : { kind: 'cron' as const, fields: parsed.fields, hasSeconds: parsed.hasSeconds };
};

describe('localStack timer simulation (issue #258)', () => {
  describe('matchesNow', () => {
    it('matches UTC minute/hour with wildcard day fields', () => {
      const s = schedule('7 11 * * *'); // 11:07 UTC daily
      expect(matchesNow(s, new Date(Date.UTC(2026, 9, 5, 11, 7, 30)))).toBe(true);
      expect(matchesNow(s, new Date(Date.UTC(2026, 9, 5, 11, 8, 0)))).toBe(false);
      expect(matchesNow(s, new Date(Date.UTC(2026, 9, 5, 12, 7, 0)))).toBe(false);
    });

    it('supports the seconds field for 6-field schedules', () => {
      const s = schedule('30 7 11 * * *');
      expect(matchesNow(s, new Date(Date.UTC(2026, 9, 5, 11, 7, 30)))).toBe(true);
      expect(matchesNow(s, new Date(Date.UTC(2026, 9, 5, 11, 7, 31)))).toBe(false);
    });

    it('applies standard OR semantics when both day fields are restricted', () => {
      // Oct 5 2026 is a Monday (dow 1); the 5th is day-of-month 5
      const s = schedule('0 0 10 * MON');
      // Monday the 5th: dow hits although dom misses
      expect(matchesNow(s, new Date(Date.UTC(2026, 9, 5, 0, 0, 0)))).toBe(true);
      // the 10th is a Saturday: dom hits although dow misses
      expect(matchesNow(s, new Date(Date.UTC(2026, 9, 10, 0, 0, 0)))).toBe(true);
      // neither hits
      expect(matchesNow(s, new Date(Date.UTC(2026, 9, 7, 0, 0, 0)))).toBe(false);
    });

    it('requires the restricted day field when the other is a wildcard', () => {
      const s = schedule('0 0 10 * *');
      expect(matchesNow(s, new Date(Date.UTC(2026, 9, 10, 0, 0, 0)))).toBe(true);
      expect(matchesNow(s, new Date(Date.UTC(2026, 9, 5, 0, 0, 0)))).toBe(false);
    });

    it('filters by month', () => {
      const s = schedule('0 0 1 3 *'); // March 1st
      expect(matchesNow(s, new Date(Date.UTC(2026, 2, 1, 0, 0, 0)))).toBe(true);
      expect(matchesNow(s, new Date(Date.UTC(2026, 3, 1, 0, 0, 0)))).toBe(false);
    });

    it('never matches @every schedules (interval-driven)', () => {
      const s = schedule('@every 1h');
      expect(matchesNow(s, new Date(Date.UTC(2026, 9, 5, 11, 7, 0)))).toBe(false);
    });
  });

  describe('startLocalTimers / stopLocalTimers', () => {
    const buildIac = (timers: Array<Record<string, unknown>>): ServerlessIac =>
      ({
        version: '0.0.1',
        provider: { name: 'aliyun', region: 'cn-hangzhou' },
        app: 'app',
        service: 'svc',
        functions: [
          {
            key: 'fn',
            name: 'fn-name',
            code: { runtime: 'nodejs18', handler: 'index.handler', path: '/code/dir' },
            environment: { FOO: 'bar' },
            timeout: 3,
            triggers: { timer: timers } as never,
          },
        ],
      }) as unknown as ServerlessIac;

    beforeEach(() => {
      jest.useFakeTimers();
      mockedInvokeFunction.mockClear();
      mockedInvokeFunction.mockResolvedValue({ ok: true });
      stopLocalTimers();
    });

    afterEach(() => {
      stopLocalTimers();
      jest.useRealTimers();
    });

    it('fires an @every timer after one interval from startup', async () => {
      startLocalTimers(buildIac([{ name: 'tick', cron: '@every 5s', payload: 'hi' }]));

      await jest.advanceTimersByTimeAsync(4500);
      expect(mockedInvokeFunction).not.toHaveBeenCalled();

      await jest.advanceTimersByTimeAsync(1000);
      expect(mockedInvokeFunction).toHaveBeenCalledTimes(1);

      const [funOptions, env, event, context] = mockedInvokeFunction.mock.calls[0];
      expect(funOptions).toMatchObject({ functionKey: 'fn', handler: 'index.handler' });
      expect(env).toEqual({ FOO: 'bar' });
      // aliyun provider → Buffer timer event with the FC timer shape
      expect(Buffer.isBuffer(event)).toBe(true);
      expect(JSON.parse((event as Buffer).toString())).toEqual({
        triggerName: 'tick',
        triggerTime: expect.any(String),
        payload: 'hi',
      });
      expect(context).toEqual({ requestId: 'req-1' });
    });

    it('skips disabled timers', async () => {
      startLocalTimers(buildIac([{ name: 'off', cron: '@every 1s', enable: false }]));

      await jest.advanceTimersByTimeAsync(3000);

      expect(mockedInvokeFunction).not.toHaveBeenCalled();
    });

    it('stops firing after stopLocalTimers', async () => {
      startLocalTimers(buildIac([{ name: 'tick', cron: '@every 1s' }]));
      stopLocalTimers();

      await jest.advanceTimersByTimeAsync(3000);

      expect(mockedInvokeFunction).not.toHaveBeenCalled();
    });

    it('replaces previous schedules on restart', async () => {
      startLocalTimers(buildIac([{ name: 'a', cron: '@every 1s' }]));
      startLocalTimers(buildIac([{ name: 'b', cron: '@every 1s' }]));

      await jest.advanceTimersByTimeAsync(2500);

      const triggerNames = mockedInvokeFunction.mock.calls.map((call) =>
        JSON.parse((call[2] as Buffer).toString()),
      );
      expect(triggerNames.every((event) => event.triggerName === 'b')).toBe(true);
    });
  });
});
