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

type SessionRecord = { ref: string; placeholder: string; exact: boolean };

export type ConfigResolutionSession = {
  /** ref → resolved value, filled by the batch resolve before evaluation. */
  readonly resolved: Map<string, ResolvedConfigValue>;
  /** registration order: placeholder id → ref (deduplicated). */
  readonly records: Map<string, SessionRecord>;
  /** `⟦si-cfg:N⟧` — assigned at registration time. */
  placeholderOf: (ref: string) => string;
};

let activeSession: ConfigResolutionSession | null = null;

/** Deploy/local start a session so `calcValue` registers refs and swaps
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
      const record = { ref, placeholder, exact: false };
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

/** The exact-ref flag is only knowable inside calcValue (needs the raw value). */
export const markExactRef = (ref: string, exact: boolean): void => {
  if (!activeSession) return;
  for (const entry of activeSession.records.values()) {
    if (entry.ref === ref) {
      entry.exact = exact;
      return;
    }
  }
};

export type AppliedResolution = {
  /** fn key → env key → ConfigRef (values resolved this run). */
  functionEnvRefs: Map<string, Map<string, ConfigRef>>;
  databasePasswordRefs: Map<string, ConfigRef>;
  /** Every plaintext secret value resolved this run — matched by value at the
   * redaction boundaries so concatenated secrets also mask. */
  secretValues: Set<string>;
  /** Resolved value text → the widest ConfigRef that produced it. */
  refByValue: Map<string, ConfigRef>;
};

let appliedMeta: AppliedResolution | null = null;

export const setAppliedConfigMeta = (meta: AppliedResolution | null): void => {
  appliedMeta = meta;
};

export const getAppliedConfigMeta = (): AppliedResolution | null => appliedMeta;

export const configRefMarker = (ref: ConfigRef): string =>
  `cfgref:${ref.configRef}@v${ref.versionNumber}`;

export const parseConfigRefMarker = (value: string): ConfigRef | null => {
  const match = value.match(/^cfgref:(.+?)@v(\d+)$/);
  if (!match) return null;
  return { configRef: match[1]!, versionNumber: Number(match[2]), secret: true };
};

export const isConfigRefMarker = (value: unknown): value is string =>
  typeof value === 'string' && /^cfgref:.+?@v\d+$/.test(value);

/** Infer the scalar type of a whole-value ref's resolved value (issue #53 P1). */
const inferScalar = (value: string): string | number | boolean => {
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  if (value === 'true') return true;
  if (value === 'false') return false;
  return value;
};

type FnLike = { key: string; environment?: Record<string, unknown> };

type DatabaseLike = {
  key: string;
  security?: { basicAuth?: { password?: unknown }; basic_auth?: { password?: unknown } };
};

/**
 * Pass 2 — substitute sentinels with resolved values and record the refs per
 * owner. Only `functions.*.environment` and `databases.*.password` are
 * supported in P1 (issue #53); sentinels anywhere else fail closed.
 */
export const applyConfigResolution = <
  T extends { functions?: FnLike[]; databases?: DatabaseLike[] },
>(
  iac: T,
): AppliedResolution => {
  const session = activeConfigSession();
  const functionEnvRefs = new Map<string, Map<string, ConfigRef>>();
  const databasePasswordRefs = new Map<string, ConfigRef>();
  const secretValues = new Set<string>();
  const refByValueGlobal = new Map<string, ConfigRef>();

  const substitute = (raw: string): { text: string | number | boolean; ref?: ConfigRef } => {
    if (!raw.includes('⟦si-cfg:')) return { text: raw };
    let text = raw;
    let exactRef: ConfigRef | undefined;
    let concatenatedSecret = false;
    let typedValue: string | number | boolean | undefined;
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
      const isExact = record.exact && raw.trim() === placeholder;
      text = text.split(placeholder).join(resolved.value);
      // Whole-value refs keep the inferred scalar type (issue #53 P1).
      if (isExact) typedValue = inferScalar(resolved.value);
      if (resolved.secret) {
        concatenatedSecret = true;
        secretValues.add(resolved.value);
        secretValues.add(text);
        refByValueGlobal.set(resolved.value, ref);
        refByValueGlobal.set(text, ref);
      }
      exactRef = ref;
    }
    // A sentinel that never resolved (or was never registered) fails closed —
    // deploys must not ship unresolved placeholders (issue #53 P1).
    if (text.includes('⟦si-cfg:')) {
      throw new Error(
        lang.__('CONFIG_ITEM_NOT_FOUND', { refs: text, scopes: 'stage, service, app, org' }),
      );
    }
    if (concatenatedSecret) {
      // A concatenation containing a secret ref is sensitive as a whole —
      // keep the widest ref for provenance.
      return { text: typedValue ?? text, ref: exactRef };
    }
    return { text: typedValue ?? text, ref: exactRef };
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

/** Scan the RAW yaml tree for `${config_sets.*}` refs in the P1-supported fields. */
export const collectConfigRefs = (rawIac: {
  functions?: Array<{ environment?: Record<string, unknown> }>;
  databases?: Array<{ security?: { basicAuth?: { password?: unknown } } }>;
}): string[] => {
  const refs = new Set<string>();
  for (const fn of rawIac.functions ?? []) {
    for (const value of Object.values(fn.environment ?? {})) {
      if (typeof value !== 'string') continue;
      for (const match of value.matchAll(CONFIG_REF_TEMPLATE)) {
        refs.add(match[1]!);
      }
    }
  }
  for (const db of rawIac.databases ?? []) {
    const password = db.security?.basicAuth?.password;
    if (typeof password !== 'string') continue;
    for (const match of password.matchAll(CONFIG_REF_TEMPLATE)) {
      refs.add(match[1]!);
    }
  }
  return [...refs];
};
