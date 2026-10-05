/**
 * si-cron — provider-agnostic cron syntax (issue #258).
 *
 * Grammar (decision D3; ALL fields are interpreted in UTC, decision D7):
 *   5-field:  minute hour day-of-month month day-of-week
 *   6-field:  second minute hour day-of-month month day-of-week
 *   '@every <duration>' — units s/m/h/d, compound sums allowed ('@every 90m')
 *
 * Dialects (synthesis layer; the schema-level `cron` field NEVER stores one):
 *   aliyun      6-field (second minute hour dom month dow)
 *   tencent     7-field (second minute hour dom month dow year)
 *   volcengine  unix crontab 5-field (minute hour dom month dow)
 *
 * Aliyun/Tencent/Volcengine interpret cron expressions in UTC+8 (no DST), so
 * translation applies a deterministic +8h field shift. Day-of-month and
 * day-of-week only shift when an hour value crosses midnight (>= 16 UTC);
 * crossings that cannot be shifted without changing which dates fire (month
 * boundaries) throw instead of silently drifting the schedule.
 */
import { lang } from '../lang';

export type CronDialect = 'aliyun' | 'tencent' | 'volcengine';

export type ParsedCronField = {
  /** field is literally '*' (full range — absorbs day shifts) */
  wildcard: boolean;
  /** expanded concrete values, sorted, deduplicated (empty when wildcard) */
  values: Array<number>;
  /** original field text, kept verbatim for passthrough rendering */
  text: string;
};

export type SiCronCron = {
  kind: 'cron';
  /** expression supplied the optional seconds prefix */
  hasSeconds: boolean;
  fields: {
    second: ParsedCronField;
    minute: ParsedCronField;
    hour: ParsedCronField;
    dayOfMonth: ParsedCronField;
    month: ParsedCronField;
    dayOfWeek: ParsedCronField;
  };
};

export type SiCronEvery = {
  kind: 'every';
  totalSeconds: number;
};

export type SiCronExpression = SiCronCron | SiCronEvery;

type FieldName = keyof SiCronCron['fields'];

type FieldSpec = {
  min: number;
  /** highest accepted input value (dow accepts 7 as an alias of Sunday) */
  max: number;
  /** highest value of the value domain (dow's domain is 0-6) */
  domainMax: number;
  /** cyclic fields wrap their ranges (dow FRI-MON, month NOV-FEB) */
  cyclic?: boolean;
  names?: Record<string, number>;
};

const MONTH_NAMES: Record<string, number> = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
};

const DOW_NAMES: Record<string, number> = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
};

const FIELD_SPECS: Record<FieldName, FieldSpec> = {
  second: { min: 0, max: 59, domainMax: 59 },
  minute: { min: 0, max: 59, domainMax: 59 },
  hour: { min: 0, max: 23, domainMax: 23 },
  dayOfMonth: { min: 1, max: 31, domainMax: 31 },
  month: { min: 1, max: 12, domainMax: 12, cyclic: true, names: MONTH_NAMES },
  dayOfWeek: { min: 0, max: 7, domainMax: 6, cyclic: true, names: DOW_NAMES },
};

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/** si-cron is UTC-based; these providers interpret cron in UTC+8 (no DST). */
const UTC_PLUS_8 = 8;

const DURATION_UNIT_SECONDS: Record<string, number> = {
  s: 1,
  m: 60,
  h: 3600,
  d: 86400,
  w: 604800,
};

const fieldError = (name: FieldName, value: string): Error =>
  new Error(lang.__('SI_CRON_FIELD_INVALID', { field: name, value }));

/** Normalize one input value into the field's value domain (dow 7 -> 0). */
const parseValue = (token: string, name: FieldName): number => {
  const spec = FIELD_SPECS[name];
  const normalized = token.trim().toLowerCase();
  const named = spec.names?.[normalized];
  const value = named ?? Number(normalized);
  if (!Number.isInteger(value) || normalized.length === 0) {
    throw fieldError(name, token);
  }
  const canonical = name === 'dayOfWeek' && value === 7 ? 0 : value;
  if (canonical < spec.min || canonical > spec.max) {
    throw new Error(
      lang.__('SI_CRON_FIELD_RANGE', {
        field: name,
        value: token,
        min: String(spec.min),
        max: String(spec.max),
      }),
    );
  }
  return canonical;
};

const parseStep = (token: string, name: FieldName): number => {
  const step = Number(token);
  const spec = FIELD_SPECS[name];
  if (!Number.isInteger(step) || step < 1 || step > spec.domainMax - spec.min) {
    throw new Error(lang.__('SI_CRON_STEP_INVALID', { field: name, step: token }));
  }
  return step;
};

const wrapValue = (value: number, spec: FieldSpec): number => {
  const span = spec.domainMax - spec.min + 1;
  return ((((value - spec.min) % span) + span) % span) + spec.min;
};

const expandRange = (start: number, end: number, step: number, spec: FieldSpec): Array<number> => {
  const values: Array<number> = [];
  // non-cyclic fields walk monotonically — stepping past `end` must stop,
  // never wrap around the domain (vixie semantics: 10-20/8 = {10, 18})
  if (!spec.cyclic) {
    for (let value = start; value <= end; value += step) {
      values.push(value);
    }
    return values;
  }
  const span = spec.domainMax - spec.min + 1;
  let current = start;
  for (let guard = 0; guard < span; guard += 1) {
    values.push(current);
    if (current === end) {
      break;
    }
    const next = wrapValue(current + step, spec);
    if (next === start) {
      break; // wrapped past `end` — the full cycle has been collected
    }
    current = next;
  }
  return values;
};

const parseElement = (element: string, name: FieldName): Array<number> => {
  const spec = FIELD_SPECS[name];
  const slashParts = element.split('/');
  if (slashParts.length > 2 || slashParts.some((part) => part.trim().length === 0)) {
    throw fieldError(name, element);
  }
  const [rangePart, stepPart] = slashParts;
  const step = stepPart !== undefined ? parseStep(stepPart, name) : 1;
  const range = rangePart.trim();

  if (range === '*') {
    return expandRange(spec.min, spec.domainMax, step, spec);
  }

  const hyphenIndex = range.indexOf('-');
  if (hyphenIndex < 0) {
    return [parseValue(range, name)];
  }
  const start = parseValue(range.slice(0, hyphenIndex), name);
  // dow range end 7 means the full weekly cycle, not a second Sunday
  const endToken = range.slice(hyphenIndex + 1);
  const end = name === 'dayOfWeek' && endToken.trim() === '7' ? 6 : parseValue(endToken, name);
  if (start > end && !spec.cyclic) {
    throw new Error(lang.__('SI_CRON_RANGE_DESCENDING', { field: name, range }));
  }
  return expandRange(start, end, step, spec);
};

const parseField = (text: string, name: FieldName): ParsedCronField => {
  const trimmed = text.trim();
  if (trimmed.length === 0) {
    throw new Error(lang.__('SI_CRON_FIELD_EMPTY', { field: name }));
  }
  if (trimmed === '*') {
    return { wildcard: true, values: [], text: trimmed };
  }
  const values = Array.from(new Set(trimmed.split(',').flatMap((e) => parseElement(e, name)))).sort(
    (a, b) => a - b,
  );
  if (values.length === 0) {
    throw fieldError(name, text);
  }
  return { wildcard: false, values, text: trimmed };
};

const EVERY_PATTERN = /^@every\s+((?:\d+\s*[smhdw]\s*)+)$/i;

const parseEveryDuration = (text: string): number => {
  const match = EVERY_PATTERN.exec(text.trim());
  if (!match) {
    throw new Error(lang.__('SI_CRON_EVERY_INVALID', { duration: text.trim() }));
  }
  const totalSeconds = Array.from(match[1].matchAll(/(\d+)\s*([smhdw])/gi)).reduce(
    (sum, [, amount, unit]) => sum + Number(amount) * DURATION_UNIT_SECONDS[unit.toLowerCase()],
    0,
  );
  if (totalSeconds <= 0) {
    throw new Error(lang.__('SI_CRON_EVERY_INVALID', { duration: text.trim() }));
  }
  return totalSeconds;
};

/**
 * Parse and validate an si-cron expression. Throws an i18n Error describing
 * the first problem — run during parse (fail fast) and semantic validation
 * (pre-deploy UX).
 */
export const parseSiCron = (expression: string): SiCronExpression => {
  const trimmed = expression.trim().replace(/\s+/g, ' ');
  if (trimmed.length === 0) {
    throw new Error(lang.__('SI_CRON_EMPTY'));
  }
  if (trimmed.toLowerCase().startsWith('@every')) {
    return { kind: 'every', totalSeconds: parseEveryDuration(trimmed) };
  }

  const parts = trimmed.split(' ');
  const hasSeconds = parts.length === 6;
  if (parts.length !== 5 && parts.length !== 6) {
    throw new Error(lang.__('SI_CRON_WRONG_FIELD_COUNT', { count: String(parts.length) }));
  }
  // 6-field prefixes the seconds domain: minute/hour/... start at parts[1]
  const [secondPart, minute, hour, dayOfMonth, month, dayOfWeek] = hasSeconds
    ? parts
    : ['0', ...parts];
  const fields = {
    second: parseField(secondPart, 'second'),
    minute: parseField(minute, 'minute'),
    hour: parseField(hour, 'hour'),
    dayOfMonth: parseField(dayOfMonth, 'dayOfMonth'),
    month: parseField(month, 'month'),
    dayOfWeek: parseField(dayOfWeek, 'dayOfWeek'),
  };
  return { kind: 'cron', hasSeconds, fields };
};

/** Validate only — throws when the expression is not valid si-cron. */
export const validateSiCron = (expression: string): void => {
  parseSiCron(expression);
};

const encodeNumbers = (values: Array<number>, spec: FieldSpec): string => {
  const sorted = Array.from(new Set(values)).sort((a, b) => a - b);
  if (
    sorted.length === spec.domainMax - spec.min + 1 &&
    sorted.every((value, index) => value === spec.min + index)
  ) {
    return '*';
  }
  const runs: Array<string> = [];
  let runStart = sorted[0];
  let previous = sorted[0];
  for (const value of sorted.slice(1)) {
    if (value === previous + 1) {
      previous = value;
      continue;
    }
    runs.push(runStart === previous ? `${runStart}` : `${runStart}-${previous}`);
    runStart = value;
    previous = value;
  }
  runs.push(runStart === previous ? `${runStart}` : `${runStart}-${previous}`);
  return runs.join(',');
};

const field = (values: Array<number>, spec: FieldSpec): ParsedCronField => ({
  wildcard: false,
  values,
  text: encodeNumbers(values, spec),
});

/**
 * Shift a parsed si-cron (UTC) into the UTC+8 field space the CN providers
 * use. Hours wrap mod 24; when an hour value crosses midnight (>= 16 UTC) the
 * day fields shift one day forward — but only where that is lossless.
 * Month-boundary crossings throw (SI_CRON_SHIFT_UNSUPPORTED) rather than
 * silently changing which dates fire.
 */
const shiftToUtcPlus8 = (
  fields: SiCronCron['fields'],
  expression: string,
): SiCronCron['fields'] => {
  const hour = fields.hour;
  if (hour.wildcard) {
    return fields;
  }

  const crossing = hour.values.some((value) => value >= 24 - UTC_PLUS_8);
  const shiftedHour = field(
    hour.values.map((value) => (value + UTC_PLUS_8) % 24),
    FIELD_SPECS.hour,
  );

  if (!crossing) {
    return { ...fields, hour: shiftedHour };
  }

  const { dayOfMonth: dom, dayOfWeek: dow, month } = fields;
  if (dom.wildcard && dow.wildcard) {
    // daily schedule — the day rollover is absorbed by the wildcards
    return { ...fields, hour: shiftedHour };
  }

  if (dom.wildcard && !dow.wildcard) {
    // day-of-week cycles weekly: shifting +1 day is always lossless
    return {
      ...fields,
      hour: shiftedHour,
      dayOfWeek: field(
        dow.values.map((value) => (value + 1) % 7),
        FIELD_SPECS.dayOfWeek,
      ),
    };
  }

  if (!dom.wildcard && dow.wildcard) {
    const shiftedDays = dom.values.map((value) => value + 1);
    const maxAllowed = month.wildcard
      ? 28
      : month.values.length === 1
        ? DAYS_IN_MONTH[month.values[0] - 1]
        : undefined;
    if (maxAllowed !== undefined && shiftedDays.every((value) => value <= maxAllowed)) {
      return {
        ...fields,
        hour: shiftedHour,
        dayOfMonth: field(shiftedDays, FIELD_SPECS.dayOfMonth),
      };
    }
    // month-end crossing with a single concrete day+month is unambiguous:
    // Jan 31 20:00 UTC === Feb 1 04:00 UTC+8
    const singleMonth = month.wildcard
      ? undefined
      : month.values.length === 1
        ? month.values[0]
        : undefined;
    if (
      singleMonth !== undefined &&
      dom.values.length === 1 &&
      dom.values[0] === DAYS_IN_MONTH[singleMonth - 1]
    ) {
      const nextMonth = (singleMonth % 12) + 1;
      return {
        ...fields,
        hour: shiftedHour,
        dayOfMonth: field([1], FIELD_SPECS.dayOfMonth),
        month: field([nextMonth], FIELD_SPECS.month),
      };
    }
    throw new Error(lang.__('SI_CRON_SHIFT_UNSUPPORTED', { cron: expression }));
  }

  // both day-of-month and day-of-week restricted — the OR semantics plus the
  // day shift cannot be expressed as one expression
  throw new Error(lang.__('SI_CRON_SHIFT_UNSUPPORTED', { cron: expression }));
};

const DOW_SPEC = FIELD_SPECS.dayOfWeek;

const passthroughField = (parsed: ParsedCronField, name: FieldName): string => {
  // normalize the non-canonical Sunday spelling `7` so providers that only
  // accept 0-6 keep the intended day
  if (name === 'dayOfWeek' && /(^|[,\-/])7(?=$|[,\-/])/.test(parsed.text)) {
    return encodeNumbers(parsed.values, DOW_SPEC);
  }
  return parsed.text;
};

const asText = (parsed: ParsedCronField, name: FieldName): string =>
  parsed.wildcard ? '*' : passthroughField(parsed, name);

const everyDialectError = (dialect: CronDialect): Error =>
  new Error(lang.__('SI_CRON_EVERY_NOT_EXPRESSIBLE', { dialect }));

/**
 * Translate `@every <duration>` into a provider step expression. Cron is
 * calendar-anchored, so only durations that divide a calendar field evenly
 * are expressible; the anchor is UTC midnight (intervals are anchor-free, so
 * no UTC+8 shift applies).
 */
const translateEvery = (totalSeconds: number, dialect: CronDialect): string => {
  const year = dialect === 'tencent' ? ' *' : '';
  const sixField = dialect !== 'volcengine';

  const assemble = (fields: Array<string>): string =>
    sixField ? `${fields.join(' ')}${year}` : fields.slice(1).join(' ');

  if (totalSeconds < 60) {
    if (!sixField || 60 % totalSeconds !== 0) {
      throw everyDialectError(dialect);
    }
    return assemble([`*/${totalSeconds}`, '*', '*', '*', '*', '*']);
  }
  if (totalSeconds % 86400 === 0) {
    const days = totalSeconds / 86400;
    if (days === 7) {
      // weekly — anchored to Monday 00:00 (interval-preserving approximation)
      return assemble(['0', '0', '0', '*', '*', '1']);
    }
    return assemble(['0', '0', '0', days === 1 ? '*' : `*/${days}`, '*', '*']);
  }
  if (totalSeconds % 3600 === 0) {
    const hours = totalSeconds / 3600;
    if (24 % hours !== 0) {
      throw everyDialectError(dialect);
    }
    return assemble(['0', '0', hours === 1 ? '*' : `*/${hours}`, '*', '*', '*']);
  }
  if (totalSeconds % 60 === 0) {
    const minutes = totalSeconds / 60;
    if (60 % minutes !== 0) {
      throw everyDialectError(dialect);
    }
    return assemble(['0', minutes === 1 ? '*' : `*/${minutes}`, '*', '*', '*', '*']);
  }
  throw everyDialectError(dialect);
};

/**
 * Translate an si-cron expression into a provider cron dialect.
 * Throws on invalid si-cron, or when the schedule cannot be represented in
 * the target dialect without changing when it fires.
 */
export const translateSiCron = (expression: string, dialect: CronDialect): string => {
  const parsed = parseSiCron(expression);
  if (parsed.kind === 'every') {
    return translateEvery(parsed.totalSeconds, dialect);
  }

  if (dialect === 'volcengine') {
    // unix crontab has no seconds field: only a single 0 second is expressible
    const second = parsed.fields.second;
    if (second.wildcard || second.values.length !== 1 || second.values[0] !== 0) {
      throw new Error(lang.__('SI_CRON_SECONDS_UNSUPPORTED', { cron: expression }));
    }
  }

  const shifted = shiftToUtcPlus8(parsed.fields, expression);
  const base = [
    asText(shifted.minute, 'minute'),
    asText(shifted.hour, 'hour'),
    asText(shifted.dayOfMonth, 'dayOfMonth'),
    asText(shifted.month, 'month'),
    asText(shifted.dayOfWeek, 'dayOfWeek'),
  ];
  if (dialect === 'volcengine') {
    return base.join(' ');
  }
  const secondsText = parsed.hasSeconds ? asText(shifted.second, 'second') : '0';
  const sixField = [secondsText, ...base].join(' ');
  return dialect === 'tencent' ? `${sixField} *` : sixField;
};

const DIALECT_BY_PROVIDER: Record<string, CronDialect> = {
  aliyun: 'aliyun',
  tencent: 'tencent',
  volcengine: 'volcengine',
};

/**
 * Combined pre-deploy check for semantic validation: parse errors and
 * provider expressibility problems both surface as the returned message
 * (i18n); null means the expression is usable on the provider.
 */
export const checkSiCronForProvider = (expression: string, provider: string): string | null => {
  try {
    const dialect = DIALECT_BY_PROVIDER[provider];
    if (!dialect) {
      // Huawei FunctionGraph timers arrive with provider issue #19 — the
      // capability gaps (e.g. no custom payload) surface in validate, not here.
      return lang.__('TIMER_TRIGGER_NOT_SUPPORTED_PROVIDER', { provider });
    }
    translateSiCron(expression, dialect);
    return null;
  } catch (error) {
    return error instanceof Error ? error.message : String(error);
  }
};
