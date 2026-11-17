import type { ResourceAttributes, ResourceState, StageState } from '../types';

const SECRET_ENV_KEY =
  /secret|password|passwd|token|credential|api[-_]?key|access[-_]?key|private|cert(?![a-z])/i;
const CREDENTIAL_URL = /^[a-z][a-z0-9+.-]*:\/\/[^/?#\s]+@/i;
const LEGACY_FINGERPRINT = /^fpr:[0-9a-f]{16}$/;
export const REDACTED_ENV_VALUE = '[REDACTED]';
const REDACTED_CHANGED = '[REDACTED: updated]';

const isLegacyFingerprint = (value: unknown): boolean =>
  typeof value === 'string' && LEGACY_FINGERPRINT.test(value);

export const isRedactedEnvValue = (value: unknown): boolean =>
  value === REDACTED_ENV_VALUE || isLegacyFingerprint(value);

export const isSensitiveEnvEntry = (key: string, value: unknown): boolean =>
  SECRET_ENV_KEY.test(key) ||
  isLegacyFingerprint(value) ||
  (typeof value === 'string' && CREDENTIAL_URL.test(value.trim()));

export const redactEnvironmentOrEmpty = (
  environment?: Record<string, string | undefined>,
): Record<string, string> =>
  Object.fromEntries(
    Object.entries(environment ?? {}).flatMap(([key, value]) =>
      value === undefined
        ? []
        : [[key, isSensitiveEnvEntry(key, value) ? REDACTED_ENV_VALUE : value]],
    ),
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
    if (!isSensitiveEnvEntry(key, value)) return [key, value] as const;
    const changed = previous && Object.hasOwn(previous, key) && previous[key] !== value;
    return [key, changed ? REDACTED_CHANGED : REDACTED_ENV_VALUE] as const;
  });
  if (redacted.every(([, value], i) => value === entries[i][1])) return attributes;
  return { ...attributes, environment: Object.fromEntries(redacted) };
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
