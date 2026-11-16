import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { logger } from './logger';
import { lang } from '../lang';
import {
  ConsoleLineName,
  consoleOriginFor,
  normalizeLineName,
  resolveLineFromOrigin,
  toProfileKey,
} from './consoleLines';

const CREDENTIALS_DIR = '.serverlessinsight';
const CREDENTIALS_FILE = 'credentials.json';

/**
 * One stored login: an API key bound to exactly one org on one console line
 * (ADR-008). The console URL is never stored — it derives from the line
 * registry. Profile keys are the composite `line/orgSlug`, unique by
 * construction because org slugs are `[a-z0-9-]` and never contain `/`.
 */
export type ConsoleProfile = {
  readonly apiKey: string;
  readonly orgId: string;
  readonly orgName?: string;
  /** Present once the validate roundtrip has healed it; slug-keyed profiles always carry it. */
  readonly orgSlug?: string;
  readonly userEmail?: string;
};

export type CredentialsFile = {
  readonly active?: string;
  readonly profiles: Readonly<Record<string, ConsoleProfile>>;
};

/** The active profile as resolved for day-to-day use, with its line and store key attached. */
export type ActiveCredentials = ConsoleProfile & {
  readonly line: ConsoleLineName;
  readonly profileKey: string;
};

/** Legacy (pre-ADR-008) single-profile shape, healed in memory on first load. */
type LegacyCredentials = {
  readonly apiKey: string;
  readonly consoleUrl: string;
  readonly orgId: string;
  readonly userEmail?: string;
  readonly orgName?: string;
  readonly orgSlug?: string;
};

export type ResolveApiKeyParams = {
  readonly siApiKey?: string;
  readonly envKey?: string;
  readonly creds?: { readonly apiKey?: string } | null;
};

export const getCredentialsPath = (): string => {
  return path.join(os.homedir(), CREDENTIALS_DIR, CREDENTIALS_FILE);
};

const ensureCredentialsDir = (): void => {
  const dir = path.join(os.homedir(), CREDENTIALS_DIR);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const isLegacyShape = (value: Record<string, unknown>): boolean =>
  typeof value['apiKey'] === 'string' && typeof value['consoleUrl'] === 'string';

/** v1 → v2 heal is in-memory only; the file is rewritten on the next save. */
const healLegacy = (legacy: LegacyCredentials): CredentialsFile => {
  const line = resolveLineFromOrigin(legacy.consoleUrl) ?? 'international';
  const key = legacy.orgSlug
    ? toProfileKey(line, legacy.orgSlug)
    : `${line}/legacy-${legacy.orgId.slice(0, 8)}`;
  return {
    active: key,
    profiles: {
      [key]: {
        apiKey: legacy.apiKey,
        orgId: legacy.orgId,
        ...(legacy.orgName ? { orgName: legacy.orgName } : {}),
        ...(legacy.orgSlug ? { orgSlug: legacy.orgSlug } : {}),
        ...(legacy.userEmail ? { userEmail: legacy.userEmail } : {}),
      },
    },
  };
};

export const loadCredentialsFile = (): CredentialsFile | null => {
  const credPath = getCredentialsPath();
  if (!fs.existsSync(credPath)) {
    return null;
  }
  try {
    const parsed = JSON.parse(fs.readFileSync(credPath, 'utf-8')) as Record<string, unknown>;
    if (isLegacyShape(parsed)) {
      return healLegacy(parsed as unknown as LegacyCredentials);
    }
    const profiles = (parsed.profiles ?? {}) as Record<string, ConsoleProfile>;
    const active = typeof parsed.active === 'string' ? parsed.active : undefined;
    if (active && !profiles[active]) {
      return { profiles };
    }
    return { ...(active ? { active } : {}), profiles };
  } catch {
    logger.warn(lang.__('CREDENTIAL_CORRUPTED'));
    return null;
  }
};

const writeFile = (file: CredentialsFile): void => {
  ensureCredentialsDir();
  const credPath = getCredentialsPath();
  fs.writeFileSync(credPath, JSON.stringify(file, null, 2), 'utf-8');
  fs.chmodSync(credPath, 0o600);
};

/** Store (or replace) the profile for `line/orgSlug` and optionally make it active. */
export const saveProfile = (
  line: ConsoleLineName,
  profile: ConsoleProfile & { readonly orgSlug: string },
  options?: { readonly activate?: boolean },
): void => {
  const file = loadCredentialsFile() ?? { profiles: {} };
  const key = toProfileKey(line, profile.orgSlug);
  const profiles: Record<string, ConsoleProfile> = { ...file.profiles };
  // Re-key cleanup: one login per org — any other stored entry for the same
  // orgId (e.g. a healed `line/legacy-…` key) is stale once the slug-keyed
  // entry exists.
  for (const existing of Object.keys(profiles)) {
    if (existing !== key && profiles[existing].orgId === profile.orgId) {
      delete profiles[existing];
    }
  }
  profiles[key] = profile;
  const active = options?.activate || !file.active || !profiles[file.active] ? key : file.active;
  writeFile({ active, profiles });
};

/** Patch one stored profile in place (e.g. the validate-roundtrip slug heal). */
export const updateProfile = (profileKey: string, patch: Partial<ConsoleProfile>): void => {
  const file = loadCredentialsFile();
  if (!file) return;
  const current = file.profiles[profileKey];
  if (!current) return;
  writeFile({
    active: file.active,
    profiles: { ...file.profiles, [profileKey]: { ...current, ...patch } },
  });
};

/** Log out: remove the active profile; drop the file entirely when it holds nothing else. */
export const removeActiveProfile = (): ActiveCredentials | null => {
  const file = loadCredentialsFile();
  if (!file?.active) return null;
  const active = file.active;
  const profile = file.profiles[active];
  const profiles = { ...file.profiles };
  delete profiles[active];
  if (Object.keys(profiles).length === 0) {
    deleteCredentials();
  } else {
    writeFile({ profiles });
  }
  if (!profile) return null;
  const split = active.indexOf('/');
  const line = (split > 0 ? active.slice(0, split) : '') as ConsoleLineName;
  return { ...profile, line, profileKey: active };
};

export const deleteCredentials = (): void => {
  const credPath = getCredentialsPath();
  if (fs.existsSync(credPath)) {
    fs.unlinkSync(credPath);
  }
};

export const clearCredentials = deleteCredentials;

/**
 * The active profile, resolved against the store. Legacy files are healed in
 * memory, so callers always see the composite shape. Returns null when no
 * active profile exists.
 */
export const loadCredentials = (): ActiveCredentials | null => {
  const file = loadCredentialsFile();
  if (!file?.active) return null;
  const profile = file.profiles[file.active];
  if (!profile) return null;
  const split = file.active.indexOf('/');
  const line =
    split > 0
      ? (normalizeLineName(file.active.slice(0, split)) ?? 'international')
      : 'international';
  return { ...profile, line, profileKey: file.active };
};

/** Find profiles whose org slug matches; used by the yml `org:` resolution step. */
export const findProfilesBySlug = (file: CredentialsFile, orgSlug: string): string[] => {
  return Object.keys(file.profiles).filter((key) => {
    const separator = key.indexOf('/');
    return separator > 0 && key.slice(separator + 1) === orgSlug;
  });
};

export const resolveApiKey = (params: ResolveApiKeyParams): string | null => {
  const { siApiKey, envKey, creds } = params;
  return siApiKey ?? envKey ?? creds?.apiKey ?? null;
};

/** Best-effort console origin for informational messages (force-unlock hint etc.). */
export const bestEffortConsoleOrigin = (): string => {
  const file = loadCredentialsFile();
  const active = file?.active;
  if (active) {
    const separator = active.indexOf('/');
    const line = normalizeLineName(separator > 0 ? active.slice(0, separator) : undefined);
    if (line) return consoleOriginFor(line);
  }
  // Undocumented internal test/dev hook; never part of the product surface.
  return process.env.SI_CONSOLE_URL || 'https://console.serverlessinsight.com';
};

// Re-exports keep the historical import surface working while the format
// helpers live in consoleLines (ADR-008).
export { parseApiKeyLine, validateApiKeyFormat } from './consoleLines';
