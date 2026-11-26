import { lang } from '../lang';
import { logger } from './logger';

/**
 * Config-set reference resolution (epic #53 P1).
 *
 * `${config_sets.<set>.<itemKey>[.path…]}` templates flow through the YAML
 * evaluator in two passes so `${vars.*}` / `${stages.*}` concatenation
 * semantics survive:
 *
 *  1. `calcValue` swaps every ref for a unique sentinel (`⟦si-cfg:N⟧`) and
 *     registers it in the active session — the rest of the string (var/stage
 *     substitution, concatenation) is evaluated as usual.
 *  2. After the batch resolve returns, `applyConfigResolution` walks the
 *     function environment / database password leaves, substitutes the
 *     resolved values (inferring scalar types for whole-value refs) and
 *     records the per-owner refs used by the sanitization pipeline.
 *
 * Whole-value refs keep a `ConfigRef`; any string containing a secret ref is
 * treated as sensitive end to end (state stores the `cfgref:` marker, never
 * the plaintext).
 */

export const PLACEHOLDER_PATTERN = /⟦si-cfg:(\d+)⟧/g;
export const CONFIG_REF_TEMPLATE = /\$\{config_sets\.([^}]+)\}/g;

export type ConfigRef = {
  configRef: string;
  versionNumber: number;
  secret: boolean;
};

export type ResolvedConfigValue = {
  value: string;
  versionNumber: number;
  secret: boolean;
  scope: 'org' | 'app' | 'service' | 'stage';
  configSet: string;
};

type SessionRecord = { ref: string; placeholder: string };

export type ConfigResolutionSession = {
  /** ref → resolved value, filled by the batch resolve before evaluation. */
  readonly resolved: Map<string, ResolvedConfigValue>;
  /** registration order: placeholder id → ref (deduplicated). */
  readonly records: Map<string, SessionRecord>;
  /** `⟦si-cfg:N⟧` — assigned at registration time. */
  placeholderOf: (ref: string) => string;
};

let activeSession: ConfigResolutionSession | null = null;

/** Deploy/local/diff start a session so `calcValue` registers refs and swaps
 * sentinels; validate/show run session-less and keep the raw template. */
export const beginConfigSession = (): ConfigResolutionSession => {
  const records = new Map<string, SessionRecord>();
  const byRef = new Map<string, SessionRecord>();
  const resolved = new Map<string, ResolvedConfigValue>();
  let counter = 0;
  const session: ConfigResolutionSession = {
    resolved,
    records,
    placeholderOf: (ref: string) => {
      const known = byRef.get(ref);
      if (known) return known.placeholder;
      const placeholder = `⟦si-cfg:${counter++}⟧`;
      const record = { ref, placeholder };
      records.set(placeholder, record);
      byRef.set(ref, record);
      return placeholder;
    },
  };
  activeSession = session;
  return session;
};

export const activeConfigSession = (): ConfigResolutionSession | null => activeSession;

export const endConfigSession = (): void => {
  activeSession = null;
};

export type AppliedResolution = {
  /** fn key → env key → ConfigRef (values resolved this run). */
  functionEnvRefs: Map<string, Map<string, ConfigRef>>;
  databasePasswordRefs: Map<string, ConfigRef>;
  /** Every plaintext secret value resolved this run — matched by value at the
   * redaction boundaries so concatenated secrets and runtime tokens also mask. */
  secretValues: Set<string>;
  /** Resolved value text → the widest ConfigRef that produced it. */
  refByValue: Map<string, ConfigRef>;
};

let appliedMeta: AppliedResolution | null = null;

export const setAppliedConfigMeta = (meta: AppliedResolution | null): void => {
  appliedMeta = meta;
};

export const getAppliedConfigMeta = (): AppliedResolution | null => appliedMeta;

/** Register a deploy-time secret (e.g. minted/preserved SI_CONFIG_TOKEN) so
 * deep event/error scrubbing never leaks it. */
export const registerRuntimeSecret = (secret: string): void => {
  if (!secret) return;
  if (!appliedMeta) {
    appliedMeta = {
      functionEnvRefs: new Map(),
      databasePasswordRefs: new Map(),
      secretValues: new Set([secret]),
      refByValue: new Map(),
    };
    return;
  }
  appliedMeta.secretValues.add(secret);
};

export const configRefMarker = (ref: ConfigRef): string =>
  `cfgref:${ref.configRef}@v${ref.versionNumber}`;

export const parseConfigRefMarker = (value: string): ConfigRef | null => {
  const match = value.match(/^cfgref:(.+?)@v(\d+)$/);
  if (!match) return null;
  return { configRef: match[1]!, versionNumber: Number(match[2]), secret: true };
};

export const isConfigRefMarker = (value: unknown): value is string =>
  typeof value === 'string' && /^cfgref:.+?@v\d+$/.test(value);

type FnLike = { key: string; environment?: Record<string, unknown> };

type DatabaseLike = {
  key: string;
  security?: { basicAuth?: { password?: unknown }; basic_auth?: { password?: unknown } };
};

const collectRemainingSentinels = (value: unknown, out: Set<string>): void => {
  if (typeof value === 'string') {
    if (value.includes('⟦si-cfg:')) out.add(value);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((entry) => collectRemainingSentinels(entry, out));
    return;
  }
  if (value && typeof value === 'object') {
    Object.values(value).forEach((entry) => collectRemainingSentinels(entry, out));
  }
};

/**
 * Pass 2 — substitute sentinels with resolved string values and record the refs
 * per owner. Only `functions.*.environment` and `databases.*.password` are
 * supported in P1 (issue #53); sentinels left anywhere else in deployed
 * sections fail closed.
 */
export const applyConfigResolution = <
  T extends {
    functions?: FnLike[];
    databases?: DatabaseLike[];
    events?: unknown;
    buckets?: unknown;
    tables?: unknown;
    tags?: unknown;
  },
>(
  iac: T,
): AppliedResolution => {
  const session = activeConfigSession();
  const functionEnvRefs = new Map<string, Map<string, ConfigRef>>();
  const databasePasswordRefs = new Map<string, ConfigRef>();
  const secretValues = new Set<string>();
  const refByValueGlobal = new Map<string, ConfigRef>();

  const substitute = (raw: string): { text: string; ref?: ConfigRef } => {
    if (!raw.includes('⟦si-cfg:')) return { text: raw };
    let text = raw;
    let lastRef: ConfigRef | undefined;
    let secretRef: ConfigRef | undefined;
    for (const [placeholder, record] of session?.records ?? []) {
      if (!text.includes(placeholder)) continue;
      const resolved = session?.resolved.get(record.ref);
      if (!resolved) {
        throw new Error(
          lang.__('CONFIG_ITEM_NOT_FOUND', {
            refs: record.ref,
            scopes: 'stage, service, app, org',
          }),
        );
      }
      const ref: ConfigRef = {
        configRef: `config_sets.${record.ref}`,
        versionNumber: resolved.versionNumber,
        secret: resolved.secret,
      };
      text = text.split(placeholder).join(resolved.value);
      if (resolved.secret) {
        secretValues.add(resolved.value);
        refByValueGlobal.set(resolved.value, ref);
        secretRef = ref;
      }
      lastRef = ref;
    }
    // A sentinel that never resolved (or was never registered) fails closed —
    // deploys must not ship unresolved placeholders (issue #53 P1).
    if (text.includes('⟦si-cfg:')) {
      throw new Error(
        lang.__('CONFIG_ITEM_NOT_FOUND', { refs: text, scopes: 'stage, service, app, org' }),
      );
    }
    if (secretRef) {
      // A concatenation containing a secret ref is sensitive as a whole —
      // record the FINAL substituted text so later non-secret refs never drop it.
      secretValues.add(text);
      refByValueGlobal.set(text, secretRef);
      return { text, ref: secretRef };
    }
    return { text, ref: lastRef };
  };

  for (const fn of iac.functions ?? []) {
    for (const [envKey, raw] of Object.entries(fn.environment ?? {})) {
      if (typeof raw !== 'string') continue;
      const { text, ref } = substitute(raw);
      fn.environment![envKey] = text;
      if (ref) {
        const perFn = functionEnvRefs.get(fn.key) ?? new Map<string, ConfigRef>();
        perFn.set(envKey, ref);
        functionEnvRefs.set(fn.key, perFn);
        logger.debug(
          lang.__('CONFIG_REF_APPLIED', {
            field: `${fn.key}.environment.${envKey}`,
            ref: ref.configRef,
            version: String(ref.versionNumber),
          }),
        );
      }
    }
  }

  for (const db of iac.databases ?? []) {
    const raw = db.security?.basicAuth?.password ?? db.security?.basic_auth?.password;
    if (typeof raw !== 'string') continue;
    const { text, ref } = substitute(raw);
    if (db.security?.basicAuth) db.security.basicAuth.password = text;
    if (db.security?.basic_auth) db.security.basic_auth.password = text;
    if (ref) {
      databasePasswordRefs.set(db.key, ref);
      logger.debug(
        lang.__('CONFIG_REF_APPLIED', {
          field: `${db.key}.password`,
          ref: ref.configRef,
          version: String(ref.versionNumber),
        }),
      );
    }
  }

  // Fail closed if any sentinel leaked into an unsupported deployed field
  // (e.g. function name, event, bucket, table, tag, or non-password DB field).
  const remainingSentinels = new Set<string>();
  collectRemainingSentinels(
    {
      functions: iac.functions,
      databases: iac.databases,
      events: iac.events,
      buckets: iac.buckets,
      tables: iac.tables,
      tags: iac.tags,
    },
    remainingSentinels,
  );
  assertNoRemainingSentinels(remainingSentinels);

  const meta: AppliedResolution = {
    functionEnvRefs,
    databasePasswordRefs,
    secretValues,
    refByValue: refByValueGlobal,
  };
  setAppliedConfigMeta(meta);
  return meta;
};

/** Sentinels left after substitution mean an unresolved or unauthorized ref. */
export const assertNoRemainingSentinels = (values: Iterable<string>): void => {
  const remaining = [...values].filter(
    (value) => typeof value === 'string' && value.includes('⟦si-cfg:'),
  );
  if (remaining.length > 0) {
    throw new Error(
      lang.__('CONFIG_ITEM_NOT_FOUND', {
        refs: remaining.join(', '),
        scopes: 'stage, service, app, org',
      }),
    );
  }
};

const extractConfigRefsFromString = (
  value: string,
  refs: Set<string>,
  vars?: Record<string, unknown>,
  stageVars?: Record<string, unknown>,
): void => {
  for (const match of value.matchAll(CONFIG_REF_TEMPLATE)) {
    refs.add(match[1]!);
  }
  if (vars) {
    for (const match of value.matchAll(/\$\{vars\.(\w+)\}/g)) {
      const indirect = vars[match[1]!];
      if (typeof indirect === 'string') {
        for (const inner of indirect.matchAll(CONFIG_REF_TEMPLATE)) {
          refs.add(inner[1]!);
        }
      }
    }
  }
  if (stageVars) {
    for (const match of value.matchAll(/\$\{stages\.(\w+)\}/g)) {
      const indirect = stageVars[match[1]!];
      if (typeof indirect === 'string') {
        for (const inner of indirect.matchAll(CONFIG_REF_TEMPLATE)) {
          refs.add(inner[1]!);
        }
      }
    }
  }
};

/** Scan the RAW yaml tree for `${config_sets.*}` refs in the P1-supported fields,
 * including indirect `${vars.*}` / `${stages.*}` references pointing to config_sets. */
export const collectConfigRefs = (
  rawIac: {
    functions?: Array<{ environment?: Record<string, unknown> }>;
    databases?: Array<{
      security?: { basicAuth?: { password?: unknown }; basic_auth?: { password?: unknown } };
    }>;
    vars?: Record<string, unknown>;
    stages?: Record<string, Record<string, unknown>>;
  },
  stage?: string,
): string[] => {
  const refs = new Set<string>();
  const stageVars = stage ? rawIac.stages?.[stage] : undefined;
  for (const fn of rawIac.functions ?? []) {
    for (const value of Object.values(fn.environment ?? {})) {
      if (typeof value !== 'string') continue;
      extractConfigRefsFromString(value, refs, rawIac.vars, stageVars);
    }
  }
  for (const db of rawIac.databases ?? []) {
    const password = db.security?.basicAuth?.password ?? db.security?.basic_auth?.password;
    if (typeof password !== 'string') continue;
    extractConfigRefsFromString(password, refs, rawIac.vars, stageVars);
  }
  return [...refs];
};
