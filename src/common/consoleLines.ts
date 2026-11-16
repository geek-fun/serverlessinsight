/**
 * ADR-008: built-in registry of console lines. Users pick a line BY NAME
 * (login picker / --line); the console origin is always derived from this
 * table and is never typed, configured or stored by the user.
 */
import { lang } from '../lang';

export type ConsoleLineName = 'international' | 'china';
export type ConsoleLineKeySegment = 'com' | 'cn';

type ConsoleLine = {
  readonly origin: string;
  readonly keySegment: ConsoleLineKeySegment;
};

export const CONSOLE_LINES: Record<ConsoleLineName, ConsoleLine> = {
  international: { origin: 'https://console.serverlessinsight.com', keySegment: 'com' },
  china: { origin: 'https://console.serverlessinsight.cn', keySegment: 'cn' },
};

export const LINE_NAMES = Object.keys(CONSOLE_LINES) as ConsoleLineName[];

const LINE_BY_SEGMENT: Record<ConsoleLineKeySegment, ConsoleLineName> = {
  com: 'international',
  cn: 'china',
};

/** New-format keys carry the issuing line: `si_<com|cn>_<12>_<32>`. */
export const parseApiKeyLine = (key: string): ConsoleLineName | null => {
  const match = /^si_(com|cn)_[A-Za-z0-9_-]{12}_[A-Za-z0-9_-]{32}$/.exec(key);
  if (!match) return null;
  return LINE_BY_SEGMENT[match[1] as ConsoleLineKeySegment];
};

/** Both formats are valid: legacy `si_<12>_<32>` and line-stamped `si_<com|cn>_<12>_<32>`. */
export const validateApiKeyFormat = (key: string): boolean => {
  if (parseApiKeyLine(key)) return true;
  return /^si_[A-Za-z0-9_-]{12}_[A-Za-z0-9_-]{32}$/.test(key);
};

/** Accepts the registry names and, leniently, the key segments as aliases. */
export const normalizeLineName = (input?: string): ConsoleLineName | null => {
  if (!input) return null;
  const lower = input.trim().toLowerCase();
  if ((LINE_NAMES as string[]).includes(lower)) return lower as ConsoleLineName;
  return lower === 'com' || lower === 'cn' ? LINE_BY_SEGMENT[lower] : null;
};

/**
 * Undocumented internal hook: SI_CONSOLE_URL overrides the derived origin so
 * the CLI's own tests and local console development can target localhost.
 * It is not part of the product surface (ADR-008).
 */
export const consoleOriginFor = (line: ConsoleLineName): string => {
  return process.env.SI_CONSOLE_URL || CONSOLE_LINES[line].origin;
};

/** UI origin for browser flows; the local dev API (:3000) maps to the Vite server (:5173). */
export const consoleUiOriginFor = (line: ConsoleLineName): string => {
  if (process.env.SI_CONSOLE_UI_URL) {
    return process.env.SI_CONSOLE_UI_URL;
  }
  const origin = consoleOriginFor(line);
  if (origin.includes('localhost:3000')) {
    return origin.replace('localhost:3000', 'localhost:5173');
  }
  return origin;
};

/** Reverse mapping used when healing legacy credentials that still store a consoleUrl. */
export const resolveLineFromOrigin = (origin?: string): ConsoleLineName | null => {
  if (!origin) return null;
  const normalized = origin.replace(/\/+$/, '');
  const entry = (Object.entries(CONSOLE_LINES) as Array<[ConsoleLineName, ConsoleLine]>).find(
    ([, line]) => line.origin === normalized,
  );
  if (entry) return entry[0];
  if (normalized.includes('console.serverlessinsight.com')) return 'international';
  if (normalized.includes('console.serverlessinsight.cn')) return 'china';
  return null;
};

/** Composite credential-store key: `line/orgSlug`. Slugs are `[a-z0-9-]`, so `/` is unambiguous. */
export const toProfileKey = (line: ConsoleLineName, orgSlug: string): string =>
  `${line}/${orgSlug}`;

export const splitProfileKey = (key: string): { line: ConsoleLineName; orgSlug: string } | null => {
  const separator = key.indexOf('/');
  if (separator <= 0 || separator === key.length - 1) return null;
  const line = normalizeLineName(key.slice(0, separator));
  if (!line) return null;
  return { line, orgSlug: key.slice(separator + 1) };
};

export const assertLineFlag = (input?: string): ConsoleLineName | undefined => {
  if (input === undefined) return undefined;
  const line = normalizeLineName(input);
  if (!line) {
    throw new Error(lang.__('SAAS_LINE_INVALID', { value: input, lines: LINE_NAMES.join(', ') }));
  }
  return line;
};

export const assertValidatedRegion = (line: ConsoleLineName, region?: string): void => {
  const segment = CONSOLE_LINES[line].keySegment;
  if (region && region !== segment) {
    throw new Error(
      lang.__('SAAS_LINE_CONFLICT', {
        source: 'the console validate response',
        line: region,
        resolvedLine: segment,
      }),
    );
  }
};

export const assertOrgMatches = (expected?: string, actual?: string): void => {
  if (expected && actual && expected !== actual) {
    throw new Error(lang.__('SAAS_ORG_MISMATCH', { declared: expected, actual }));
  }
};

export const assertValidatedOrg = (expected?: string, actual?: string): void => {
  if (expected && !actual) {
    throw new Error(lang.__('SAAS_ORG_UNVERIFIED', { org: expected }));
  }
  assertOrgMatches(expected, actual);
};
