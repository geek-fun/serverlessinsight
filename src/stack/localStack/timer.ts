import { ServerlessIac } from '../../types';
import { FunctionOptions } from '../../types/localStack';
import { parseSiCron, ParsedCronField, SiCronCron } from '../../common/siCron';
import { generateRequestId, createAliyunContextSerializable } from './aliyunFc';
import { resolveCodeDir } from './utils';
import { invokeFunction } from './functionRunner';
import { logger, ProviderEnum } from '../../common';
import fs from 'node:fs';
import { lang } from '../../lang';

/**
 * Local timer simulation for `si local` (issue #258): fires functions with
 * `triggers.timer` on schedule, mirroring the cloud trigger contract.
 *
 * - si-cron schedules are evaluated against **UTC** wall-clock (the si-cron
 *   semantics), via a 1s poller with per-second dedup keys.
 * - `@every` schedules are interval-based from server start (cron cannot
 *   anchor intervals, so the first fire is one interval after startup).
 * - The event shapes mirror the providers: Aliyun FC's timer event
 *   `{triggerName, triggerTime, payload}` (Buffer), otherwise Tencent SCF's
 *   `{Type: 'Timer', TriggerName, Time, Message}`.
 */

type TimerSchedule =
  | { kind: 'cron'; fields: SiCronCron['fields']; hasSeconds: boolean }
  | { kind: 'every'; intervalMs: number };

type TimerFunction = NonNullable<ServerlessIac['functions']>[number];

type LocalTimerState = {
  /** dedup key of the last fired tick (minute or second precision) */
  lastTickKey: string;
  /** last fire timestamp for @every interval arithmetic */
  lastFiredAt: number;
  /** guards against overlapping async invocations */
  running: boolean;
};

const timers: Array<NodeJS.Timeout> = [];

const toSchedule = (cron: string): TimerSchedule | undefined => {
  try {
    const parsed = parseSiCron(cron);
    return parsed.kind === 'every'
      ? { kind: 'every', intervalMs: parsed.totalSeconds * 1000 }
      : { kind: 'cron', fields: parsed.fields, hasSeconds: parsed.hasSeconds };
  } catch {
    return undefined;
  }
};

const matchesField = (field: ParsedCronField, value: number): boolean =>
  field.wildcard || field.values.includes(value);

/** Pure UTC wall-clock match of a cron schedule against a point in time. */
export const matchesNow = (schedule: TimerSchedule, now: Date): boolean => {
  if (schedule.kind !== 'cron') {
    return false; // @every is interval-driven, not wall-clock driven
  }
  const fields = schedule.fields;
  if (!matchesField(fields.minute, now.getUTCMinutes())) {
    return false;
  }
  if (!matchesField(fields.hour, now.getUTCHours())) {
    return false;
  }
  if (!matchesField(fields.month, now.getUTCMonth() + 1)) {
    return false;
  }
  // standard cron day semantics: both day fields restricted → OR (either may
  // fire); at least one wildcard → the restricted side must match
  const domRestricted = !fields.dayOfMonth.wildcard;
  const dowRestricted = !fields.dayOfWeek.wildcard;
  if (domRestricted && dowRestricted) {
    const domHit = fields.dayOfMonth.values.includes(now.getUTCDate());
    const dowHit = fields.dayOfWeek.values.includes(now.getUTCDay());
    if (!domHit && !dowHit) {
      return false;
    }
  } else {
    if (domRestricted && !fields.dayOfMonth.values.includes(now.getUTCDate())) {
      return false;
    }
    if (dowRestricted && !fields.dayOfWeek.values.includes(now.getUTCDay())) {
      return false;
    }
  }
  if (schedule.hasSeconds && !matchesField(fields.second, now.getUTCSeconds())) {
    return false;
  }
  return true;
};

const buildTimerEvent = (provider: string, triggerName: string, payload: string): unknown => {
  const triggerTime = new Date().toISOString();
  if (provider === ProviderEnum.ALIYUN) {
    // Aliyun FC timer event — the handler receives a Buffer of this JSON
    return Buffer.from(JSON.stringify({ triggerName, triggerTime, payload }));
  }
  // Tencent SCF timer event shape (default for other providers)
  return { Type: 'Timer', TriggerName: triggerName, Time: triggerTime, Message: payload };
};

const fireTimer = async (
  iac: ServerlessIac,
  fn: TimerFunction,
  triggerName: string,
  payload: string,
): Promise<void> => {
  if (!fn.code) {
    return;
  }
  let tempDir: string | null = null;
  try {
    const resolved = await resolveCodeDir(fn.code.path);
    tempDir = resolved.tempDir;

    const funOptions: FunctionOptions = {
      codeDir: resolved.codeDir,
      functionKey: fn.key,
      handler: fn.code.handler,
      servicePath: '',
      timeout: (fn.timeout ?? 3) * 1000,
    };

    const event = buildTimerEvent(iac.provider.name, triggerName, payload);
    const context = createAliyunContextSerializable(
      iac,
      fn.name,
      fn.code.handler,
      fn.memory ?? 128,
      fn.timeout ?? 3,
      generateRequestId(),
    );

    logger.info(lang.__('LOCAL_TIMER_FIRED', { triggerName, functionName: fn.name }));
    const result = await invokeFunction(funOptions, { ...fn.environment }, event, context);
    logger.info(lang.__('FUNCTION_EXECUTION_RESULT', { result: JSON.stringify(result) }));
  } catch (error) {
    logger.error(lang.__('FUNCTION_EXECUTION_ERROR', { error: String(error) }));
  } finally {
    if (tempDir && fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  }
};

const evaluateTimer = (
  iac: ServerlessIac,
  fn: TimerFunction,
  triggerName: string,
  payload: string,
  schedule: TimerSchedule,
  state: LocalTimerState,
): void => {
  const now = new Date();
  if (schedule.kind === 'every') {
    if (Date.now() - state.lastFiredAt < schedule.intervalMs) {
      return;
    }
    state.lastFiredAt = Date.now();
  } else {
    // dedup to once per matching second (minute precision without seconds)
    const tickKey = now.toISOString().slice(0, schedule.hasSeconds ? 19 : 16);
    if (tickKey === state.lastTickKey || !matchesNow(schedule, now)) {
      return;
    }
    state.lastTickKey = tickKey;
  }
  if (state.running) {
    return; // previous invocation still running — skip this tick
  }
  state.running = true;
  void fireTimer(iac, fn, triggerName, payload).finally(() => {
    state.running = false;
  });
};

export const startLocalTimers = (iac: ServerlessIac): void => {
  stopLocalTimers();

  iac.functions?.forEach((fn) => {
    fn.triggers?.timer?.forEach((timer) => {
      if (timer.enable === false) {
        logger.info(
          lang.__('LOCAL_TIMER_DISABLED', { triggerName: timer.name, functionName: fn.name }),
        );
        return;
      }
      const schedule = toSchedule(timer.cron);
      if (!schedule) {
        // unreachable for validated configs — the parser rejects bad si-cron
        logger.warn(
          lang.__('LOCAL_TIMER_INVALID_CRON', { triggerName: timer.name, cron: timer.cron }),
        );
        return;
      }

      logger.info(
        lang.__('LOCAL_TIMER_SCHEDULED', {
          triggerName: timer.name,
          cron: timer.cron,
          functionName: fn.name,
        }),
      );

      const state: LocalTimerState = { lastTickKey: '', lastFiredAt: Date.now(), running: false };
      const tick = setInterval(() => {
        evaluateTimer(iac, fn, timer.name, timer.payload ?? '', schedule, state);
      }, 1000);
      timers.push(tick);
    });
  });
};

export const stopLocalTimers = (): void => {
  timers.forEach((tick) => clearInterval(tick));
  timers.length = 0;
};
