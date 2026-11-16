import * as readline from 'node:readline';
import { logger } from './logger';
import { lang } from '../lang';
import {
  ConsoleLineName,
  assertLineFlag,
  consoleOriginFor,
  normalizeLineName,
  parseApiKeyLine,
  splitProfileKey,
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
  /** Credential-store key of the selected profile, when one matched. */
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
 * ADR-008 resolution order (zero-network, first match wins for the LINE):
 *   1. line segment of the API key (--si-api-key / SI_API_KEY, new format)
 *   2. yml `org:` → profile (single match wins; cross-line slug fails fast)
 *   3. `--line` (+ `--org`) → profile
 *   4. `active` profile
 *   5. interactive prompt over stored profiles (TTY only; otherwise fail fast)
 *
 * The API KEY is separate: explicit flag/env win over the selected profile's
 * stored key. A key line segment always pins the line — an explicit `--line`
 * or a yml-selected profile on another line is a hard conflict, while an
 * active profile on another line is silently overridden (the key routes,
 * e.g. CI with SI_API_KEY against a differently-located local profile).
 * `SI_CONSOLE_LINE` is read only for legacy (segment-less) keys and is
 * deprecated — removal once line-stamped issuance has shipped.
 */
export const resolveLineContext = async (
  params: ResolveLineContextParams,
): Promise<LineContext> => {
  const file = loadCredentialsFile();

  // ---- key ----
  const explicitKey = params.siApiKey ?? process.env.SI_API_KEY ?? undefined;
  const keySource: LineContext['keySource'] = params.siApiKey
    ? 'flag'
    : process.env.SI_API_KEY
      ? 'env'
      : 'profile';
  const keyLine = explicitKey ? parseApiKeyLine(explicitKey) : null;

  const lineFlag = assertLineFlag(params.lineFlag);

  // ---- line candidates (first match wins) ----
  let line: ConsoleLineName | null = keyLine;
  let lineSource: LineContext['lineSource'] | null = keyLine ? 'key-segment' : null;
  let profileKey: string | null = null;

  // A key segment pins the line; --line must agree.
  if (keyLine && lineFlag && lineFlag !== keyLine) {
    throw lineConflict('the API key', keyLine, lineFlag);
  }

  const selectProfileBySlug = (orgSlug: string): string | null => {
    const all = findProfilesBySlug(file ?? { profiles: {} }, orgSlug);
    const scoped = keyLine
      ? all.filter((key) => (splitProfileKey(key)?.line ?? '') === keyLine)
      : all;
    if (scoped.length > 1) {
      const lines = scoped
        .map((key) => splitProfileKey(key)?.line ?? '')
        .filter(Boolean)
        .join(', ');
      throw new Error(lang.__('SAAS_LINE_AMBIGUOUS_ORG', { org: orgSlug, lines }));
    }
    return scoped[0] ?? null;
  };

  // SI_CONSOLE_LINE: deprecated transitional aid for legacy (segment-less) keys.
  const legacyLine = keyLine ? null : normalizeLineName(process.env.SI_CONSOLE_LINE);
  if (legacyLine) {
    logger.warn(lang.__('SAAS_LINE_ENV_DEPRECATED'));
  }

  if (!line && !legacyLine && params.declaredOrg) {
    const match = selectProfileBySlug(params.declaredOrg);
    if (match) {
      profileKey = match;
      line = splitProfileKey(match)!.line;
      lineSource = 'yml-org';
    } else if (!keyLine) {
      // No stored login for the declared org and no explicit key: when a
      // single stored login exists and its slug already disagrees, surface
      // the D-6 mismatch locally instead of the generic unresolved error.
      const slugged = Object.entries(file?.profiles ?? {}).filter(
        ([, profile]) => !!profile.orgSlug,
      );
      if (
        slugged.length === 1 &&
        slugged[0]![1].orgSlug !== params.declaredOrg &&
        slugged[0]![1].apiKey
      ) {
        throw new Error(
          lang.__('SAAS_ORG_MISMATCH', {
            declared: params.declaredOrg,
            actual: slugged[0]![1].orgSlug ?? '',
          }),
        );
      }
    }
  }

  if (line && lineFlag && lineFlag !== line) {
    throw lineConflict(`org "${params.declaredOrg ?? ''}" in yaml`, line, lineFlag);
  }
  if (!line && lineFlag) {
    line = lineFlag;
    lineSource = 'flag';
  }

  if (!line && !legacyLine && params.orgFlag) {
    const match = selectProfileBySlug(params.orgFlag);
    if (match) {
      profileKey = match;
      line = splitProfileKey(match)!.line;
      lineSource = 'flag';
    } else {
      // Org named but nothing stored — the explicit key (if any) still routes;
      // without one this ends in the no-credentials error below.
      line = keyLine;
    }
  }

  if (!line && legacyLine) {
    line = legacyLine;
    lineSource = 'env-legacy';
  }

  if (!line && file?.active) {
    const split = splitProfileKey(file.active);
    if (split) {
      line = split.line;
      lineSource = 'active';
    }
  }

  if (!line) {
    const profileKeys = Object.keys(file?.profiles ?? {});
    if (isInteractive() && profileKeys.length > 0) {
      const chosen = await promptProfile(profileKeys, params.operation);
      if (chosen) {
        profileKey = chosen;
        line = splitProfileKey(chosen)!.line;
        lineSource = 'prompt';
      }
    }
  }

  if (!line) {
    throw new Error(
      lang.__('SAAS_LINE_UNRESOLVED', { operation: params.operation ?? 'this command' }),
    );
  }

  // ---- profile selection within the resolved line ----
  const targetSlug = params.declaredOrg ?? params.orgFlag;
  if (!profileKey && targetSlug) {
    const candidate = `${line}/${targetSlug}`;
    if (file?.profiles[candidate]) {
      profileKey = candidate;
    }
  }
  if (!profileKey && !targetSlug && file?.active) {
    const split = splitProfileKey(file.active);
    if (split && split.line === line) {
      profileKey = file.active;
    }
  }
  if (!profileKey && !targetSlug && keyLine && file?.active) {
    // Key-pinned line with an active profile elsewhere: carry the org identity
    // over when the same slug exists on the key's line (the org matches, only
    // the line differs — e.g. CI key against a locally-logged-in project).
    const activeSplit = splitProfileKey(file.active);
    if (activeSplit?.orgSlug) {
      const candidate = `${keyLine}/${activeSplit.orgSlug}`;
      if (file.profiles[candidate]) {
        profileKey = candidate;
      }
    }
  }

  const profile = profileKey ? file?.profiles[profileKey] : undefined;

  // ---- coherence checks ----
  if (keyLine && profileKey) {
    const profileLine = splitProfileKey(profileKey)?.line;
    if (profileLine && profileLine !== keyLine) {
      throw lineConflict(`stored profile ${profileKey}`, profileLine, keyLine);
    }
  }
  if (profile?.orgSlug && params.declaredOrg && profile.orgSlug !== params.declaredOrg) {
    throw new Error(
      lang.__('SAAS_ORG_MISMATCH', {
        declared: params.declaredOrg,
        actual: profile.orgSlug,
      }),
    );
  }

  const apiKey = explicitKey ?? profile?.apiKey;
  if (!apiKey) {
    throw new Error(lang.__('SAAS_BACKEND_NO_CREDENTIALS'));
  }

  return {
    line,
    consoleUrl: consoleOriginFor(line),
    apiKey,
    ...(profile?.orgId ? { orgId: profile.orgId } : {}),
    ...(profile?.orgSlug ? { orgSlug: profile.orgSlug } : {}),
    ...(profile?.orgName ? { orgName: profile.orgName } : {}),
    ...(profile?.userEmail ? { userEmail: profile.userEmail } : {}),
    ...(profileKey ? { profileKey } : {}),
    keySource,
    lineSource: (lineSource ?? 'active') as LineContext['lineSource'],
  };
};
