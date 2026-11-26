import type { ResourceAttributes, ResourceState, StageState } from '../types';
import {
  configRefMarker,
  getAppliedConfigMeta,
  isConfigRefMarker,
  parseConfigRefMarker,
} from './configSession';

export { isConfigRefMarker };

const SECRET_ENV_KEY =
  /secret|password|passwd|token|credential|api[-_]?key|access[-_]?key|private|cert(?![a-z])/i;
const CREDENTIAL_URL = /^[a-z][a-z0-9+.-]*:\/\/[^/?#\s]+@/i;
const LEGACY_FINGERPRINT = /^fpr:[0-9a-f]{16}$/;
export const REDACTED_ENV_VALUE = '[REDACTED]';
export const RUNTIME_TOKEN_PRESERVE = '⟦si-runtime-token⟧';
const REDACTED_CHANGED = '[REDACTED: updated]';

const isLegacyFingerprint = (value: unknown): boolean =>
  typeof value === 'string' && LEGACY_FINGERPRINT.test(value);

export const isRedactedEnvValue = (value: unknown): boolean =>
  value === REDACTED_ENV_VALUE ||
  value === RUNTIME_TOKEN_PRESERVE ||
  isLegacyFingerprint(value) ||
  isConfigRefMarker(value);

export const isSensitiveEnvEntry = (key: string, value: unknown): boolean =>
  SECRET_ENV_KEY.test(key) ||
  value === RUNTIME_TOKEN_PRESERVE ||
  isLegacyFingerprint(value) ||
  isConfigRefMarker(value) ||
  sessionMarkerFor(value) !== null ||
  (typeof value === 'string' && CREDENTIAL_URL.test(value.trim()));

/**
 * A value resolved from a secret config-set ref this run → its `cfgref:` state
 * marker. Value-based matching covers concatenated secrets too (issue #53 P1).
 */
export const sessionMarkerFor = (value: unknown): string | null => {
  if (typeof value !== 'string') return null;
  const meta = getAppliedConfigMeta();
  const ref = meta?.refByValue.get(value);
  return ref ? configRefMarker(ref) : null;
};

/** The provenance suffix for plan display: `*** (config_sets.db.password@v3 → v5)`. */
export const markerProvenance = (value: string, previous?: string): string | null => {
  const after = parseConfigRefMarker(value);
  if (!after) return null;
  const before = previous ? parseConfigRefMarker(previous) : null;
  if (
    before &&
    before.configRef === after.configRef &&
    before.versionNumber !== after.versionNumber
  ) {
    return `*** (${after.configRef}@v${before.versionNumber} → v${after.versionNumber})`;
  }
  return `*** (${after.configRef}@v${after.versionNumber})`;
};

export const redactEnvironmentOrEmpty = (
  environment?: Record<string, string | undefined>,
): Record<string, string> =>
  Object.fromEntries(
    Object.entries(environment ?? {}).flatMap(([key, value]) => {
      if (value === undefined) return [];
      const marker = sessionMarkerFor(value);
      if (marker) return [[key, marker]];
      // An already-markerred value IS the redacted form — keep it.
      if (isConfigRefMarker(value)) return [[key, value]];
      return [[key, isSensitiveEnvEntry(key, value) ? REDACTED_ENV_VALUE : value]];
    }),
  );

export const readEnvironment = (value: unknown): Record<string, unknown> | undefined =>
  typeof value === 'object' && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;

/** Drop all comparison material at plan and state boundaries. */
export const redactEnvironmentAttributes = <T extends ResourceAttributes>(
  attributes: T,
  before?: ResourceAttributes,
): T => {
  const environment = readEnvironment(attributes.environment);
  if (!environment) return attributes;

  const previous = readEnvironment(before?.environment);
  const entries = Object.entries(environment);
  const redacted = entries.map(([key, value]) => {
    const marker = sessionMarkerFor(value);
    if (marker) {
      const previousMarker =
        previous && Object.hasOwn(previous, key) && typeof previous[key] === 'string'
          ? previous[key]
          : undefined;
      const provenance = markerProvenance(marker, previousMarker);
      // Plan paths (with `before`) show version provenance; state paths keep
      // the bare marker so drift can substitute the live value.
      return [key, previous ? (provenance ?? marker) : marker] as const;
    }
    if (isConfigRefMarker(value)) {
      // With a `before` this is a plan diff — show version provenance; state
      // paths keep the bare marker (drift substitutes the live value).
      const provenance =
        previous && Object.hasOwn(previous, key) && typeof previous[key] === 'string'
          ? markerProvenance(value, previous[key] as string)
          : null;
      return [key, previous ? (provenance ?? value) : value] as const;
    }
    if (!isSensitiveEnvEntry(key, value)) return [key, value] as const;
    if (value === RUNTIME_TOKEN_PRESERVE) {
      return [key, REDACTED_ENV_VALUE] as const;
    }
    const changed = previous && Object.hasOwn(previous, key) && previous[key] !== value;
    return [key, changed ? REDACTED_CHANGED : REDACTED_ENV_VALUE] as const;
  });
  if (redacted.every(([, value], i) => value === entries[i][1])) return attributes;
  return { ...attributes, environment: Object.fromEntries(redacted) };
};

/** Deep redaction for arbitrary payloads (deployment events, error details):
 * scrubs both exact and substring occurrences of every secret value resolved
 * or minted this run (issue #53 P1/P2 — event stream never carries secrets). */
export const redactPayloadDeep = <T>(payload: T): T => {
  const meta = getAppliedConfigMeta();
  if (!meta || meta.secretValues.size === 0) return payload;
  const secrets = [...meta.secretValues]
    .filter((secret) => secret.length > 0)
    .sort((a, b) => b.length - a.length);
  if (secrets.length === 0) return payload;
  const scrubString = (input: string): string =>
    secrets.reduce(
      (current, secret) =>
        current.includes(secret) ? current.split(secret).join(REDACTED_ENV_VALUE) : current,
      input,
    );
  const walk = (value: unknown): unknown => {
    if (typeof value === 'string') return scrubString(value);
    if (Array.isArray(value)) return value.map(walk);
    if (value && typeof value === 'object') {
      return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, walk(v)]));
    }
    return value;
  };
  return walk(payload) as T;
};

const redactResourceEnvironment = (resource: ResourceState): ResourceState => {
  const definition = resource.definition && redactEnvironmentAttributes(resource.definition);
  const instances = resource.instances?.map((instance) => redactEnvironmentAttributes(instance));
  if (
    definition === resource.definition &&
    !instances?.some((item, i) => item !== resource.instances[i])
  ) {
    return resource;
  }
  return { ...resource, definition, ...(instances && { instances }) };
};

export const redactResourceEnvironments = (
  resources: Record<string, ResourceState>,
): Record<string, ResourceState> => {
  const entries = Object.entries(resources);
  const redacted = entries.map(
    ([key, resource]) => [key, redactResourceEnvironment(resource)] as const,
  );
  return redacted.every(([, resource], i) => resource === entries[i][1])
    ? resources
    : Object.fromEntries(redacted);
};

export const redactStageEnvironments = <T extends StageState>(stage: T): T => {
  const resources = stage.resources && redactResourceEnvironments(stage.resources);
  const shared = stage.shared && redactResourceEnvironments(stage.shared);
  return resources === stage.resources && shared === stage.shared
    ? stage
    : { ...stage, resources, ...(shared && { shared }) };
};
