import * as readline from 'node:readline';
import { logger } from './logger';
import { lang } from '../lang';
import {
  ConsoleLineName,
  assertLineFlag,
  assertOrgMatches,
  consoleOriginFor,
  normalizeLineName,
  parseApiKeyLine,
  splitProfileKey,
  toProfileKey,
} from './consoleLines';
import { findProfilesBySlug, loadCredentialsFile } from './credentialStore';

export type LineContext = {
  readonly line: ConsoleLineName;
  readonly consoleUrl: string;
  readonly apiKey: string;
  readonly orgId?: string;
  readonly orgSlug?: string;
  readonly orgName?: string;
  readonly userEmail?: string;
  /** Credential-store profile that owns the API key in this context. */
  readonly profileKey?: string;
  /** Where the API key came from — explicit flags/env win over stored profiles. */
  readonly keySource: 'flag' | 'env' | 'profile';
  /** Which resolution step fixed the line (ADR-008 order). */
  readonly lineSource: 'key-segment' | 'yml-org' | 'flag' | 'active' | 'env-legacy' | 'prompt';
};

export type ResolveLineContextParams = {
  /** `--si-api-key` flag — highest key precedence. */
  readonly siApiKey?: string;
  /** Top-level `org:` in the yaml (D-6). */
  readonly declaredOrg?: string;
  /** `--org <slug>` one-off override. */
  readonly orgFlag?: string;
  /** `--line international|china` override. */
  readonly lineFlag?: string;
  /** Command name for error messages. */
  readonly operation?: string;
};

const readInput = async (query: string): Promise<string> => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer: string = await new Promise((resolve) => {
    rl.question(query, (value) => resolve(value));
  });
  rl.close();
  return answer;
};

const isInteractive = (): boolean => process.stdin.isTTY === true;

const lineConflict = (source: string, line: string, resolvedLine: string): Error =>
  new Error(lang.__('SAAS_LINE_CONFLICT', { source, line, resolvedLine }));

/** Prompt among stored profiles; returns the chosen key or null to abort. */
const promptProfile = async (profileKeys: string[], operation?: string): Promise<string | null> => {
  logger.info(lang.__('SAAS_LINE_PROMPT_HEADER', { operation: operation ?? 'this command' }));
  profileKeys.forEach((key, index) => {
    logger.info(lang.__('SAAS_LINE_PROMPT_OPTION', { index: String(index + 1), profileKey: key }));
  });
  const answer = await readInput(
    lang.__('SAAS_LINE_PROMPT_SELECT', { count: String(profileKeys.length) }),
  );
  const index = Number.parseInt(answer.trim(), 10);
  if (Number.isNaN(index) || index < 1 || index > profileKeys.length) {
    return null;
  }
  return profileKeys[index - 1] ?? null;
};

/**
 * Key segments pin the line. A line flag disambiguates org slugs, and a
 * legacy key can use the transition hint before looking up stored profiles.
 * A stored profile supplies identity only when it owns the effective key.
 */
export const resolveLineContext = async (
  params: ResolveLineContextParams,
): Promise<LineContext> => {
  const explicitKey = params.siApiKey ?? process.env.SI_API_KEY;
  const keySource =
    params.siApiKey !== undefined ? 'flag' : explicitKey !== undefined ? 'env' : 'profile';
  // Issue #309: a flag/env key is self-contained CI identity. The credentials
  // file is never read and no stored profile is selected, so a runner with a
  // shared or cached HOME can neither inherit a local identity nor have one
  // attached to its key — the validate roundtrip is the only identity source.
  const file = keySource === 'profile' ? loadCredentialsFile() : null;
  const profiles = file?.profiles ?? {};
  const activeKey = file?.active;
  const active = activeKey ? splitProfileKey(activeKey) : null;
  const targetSlug = params.declaredOrg ?? params.orgFlag;

  const keyLine = explicitKey ? parseApiKeyLine(explicitKey) : null;
  const flagLine = assertLineFlag(params.lineFlag);
  if (keyLine && flagLine && keyLine !== flagLine) {
    throw lineConflict('the API key', keyLine, flagLine);
  }

  const legacyLine =
    explicitKey && !keyLine && !flagLine ? normalizeLineName(process.env.SI_CONSOLE_LINE) : null;
  if (legacyLine) {
    logger.warn(lang.__('SAAS_LINE_ENV_DEPRECATED'));
  }

  let line = keyLine ?? flagLine ?? legacyLine;
  let lineSource: LineContext['lineSource'] = keyLine
    ? 'key-segment'
    : flagLine
      ? 'flag'
      : 'env-legacy';
  let profileKey: string | undefined;

  if (targetSlug) {
    const matches = findProfilesBySlug({ profiles }, targetSlug);
    if (line) {
      profileKey = matches.find((key) => splitProfileKey(key)?.line === line);
    } else {
      const lines = [...new Set(matches.map((key) => splitProfileKey(key)!.line))];
      if (lines.length > 1) {
        throw new Error(
          lang.__('SAAS_LINE_AMBIGUOUS_ORG', { org: targetSlug, lines: lines.join(', ') }),
        );
      }
      if (lines[0]) {
        line = lines[0];
        lineSource = params.declaredOrg ? 'yml-org' : 'flag';
        profileKey = matches[0];
      } else if (explicitKey === undefined) {
        const saved = Object.values(profiles);
        if (saved.length === 1) assertOrgMatches(targetSlug, saved[0]?.orgSlug);
      }
    }
  }

  if (!line && active) {
    line = active.line;
    lineSource = 'active';
  }

  if (!line && keySource === 'profile' && isInteractive()) {
    const candidates = Object.keys(profiles).filter(
      (key) => splitProfileKey(key) && (!targetSlug || !profiles[key]?.orgSlug),
    );
    const chosen = candidates.length > 0 ? await promptProfile(candidates, params.operation) : null;
    if (chosen) {
      profileKey = chosen;
      line = splitProfileKey(chosen)!.line;
      lineSource = 'prompt';
    }
  }

  if (!line) {
    throw new Error(
      lang.__('SAAS_LINE_UNRESOLVED', { operation: params.operation ?? 'this command' }),
    );
  }

  if (!profileKey && !targetSlug && active && activeKey) {
    if (active.line === line) {
      profileKey = activeKey;
    } else if (keyLine) {
      profileKey = toProfileKey(line, active.orgSlug);
    }
  }
  // A legacy active profile has no verified slug until the first validate call.
  if (!profileKey && activeKey && active?.line === line && !profiles[activeKey]?.orgSlug) {
    profileKey = activeKey;
  }

  const profile = profileKey ? profiles[profileKey] : undefined;
  const apiKey = explicitKey ?? profile?.apiKey;
  if (!apiKey) {
    throw new Error(lang.__('SAAS_BACKEND_NO_CREDENTIALS'));
  }

  const identity = profile?.apiKey === apiKey ? profile : undefined;
  assertOrgMatches(targetSlug, identity?.orgSlug);

  return {
    line,
    consoleUrl: consoleOriginFor(line),
    apiKey,
    ...(identity?.orgId ? { orgId: identity.orgId } : {}),
    ...(identity?.orgSlug ? { orgSlug: identity.orgSlug } : {}),
    ...(identity?.orgName ? { orgName: identity.orgName } : {}),
    ...(identity?.userEmail ? { userEmail: identity.userEmail } : {}),
    ...(identity ? { profileKey } : {}),
    keySource,
    lineSource,
  };
};
