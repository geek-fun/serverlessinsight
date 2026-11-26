import { attributesEqual } from './hashUtils';
import { isRedactedEnvValue, readEnvironment, RUNTIME_TOKEN_PRESERVE } from './envRedaction';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const isDeclared = (value: unknown): boolean =>
  value !== undefined && value !== null && (!isRecord(value) || Object.keys(value).length > 0);

// Membership lists are sets; command arguments, routes and mount sequences are not.
const SET_FIELDS = new Set([
  'vSwitchIds',
  'subnetIds',
  'securityGroupIds',
  'subnet_ids',
  'managed_policies',
  'kibanaWhiteIpList',
  'ips',
  'timers',
  'methods',
  'domainProtocol',
  'statements',
  'action',
  'resource',
  'Service',
  'AWS',
  'qcs',
]);

export const canonicalValue = (value: unknown, key: string, policyDocument = false): unknown => {
  const policyScope = policyDocument || key === 'policy';
  if (key === 'policy' && (value === null || value === 'null')) return 'null';
  if (key === 'policy' && typeof value === 'string') {
    try {
      return canonicalValue(JSON.parse(value) as unknown, '', true);
    } catch {
      return value;
    }
  }
  if (Array.isArray(value)) {
    const entries = value.map((entry) => canonicalValue(entry, '', policyScope));
    return policyScope || SET_FIELDS.has(key)
      ? [
          ...new Map(entries.map((entry) => [JSON.stringify(entry) ?? 'null', entry])).values(),
        ].sort((a, b) => (JSON.stringify(a) ?? 'null').localeCompare(JSON.stringify(b) ?? 'null'))
      : entries;
  }
  if (isRecord(value)) {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([name, entry]) => [name, canonicalValue(entry, name, policyScope)]),
    );
  }
  return value;
};

const projectValue = (actual: unknown, desired: unknown, key: string): unknown => {
  if (key === 'policy') return canonicalValue(actual, key);
  if (Array.isArray(actual) && Array.isArray(desired) && !SET_FIELDS.has(key)) {
    return actual.map((entry, index) =>
      index < desired.length ? projectValue(entry, desired[index], '') : canonicalValue(entry, ''),
    );
  }
  // An environment declaration replaces the entire map, including removal of
  // cloud-only entries. Structural configs write only their declared members.
  if (isRecord(desired) && isRecord(actual) && key !== 'environment') {
    return Object.fromEntries(
      Object.entries(desired)
        .filter(([, value]) => isDeclared(value))
        .map(([name, value]) => [name, projectValue(actual[name], value, name)]),
    );
  }
  return canonicalValue(actual, key);
};

/** The fields the current configuration actually manages, in comparison form. */
export const managedDefinition = (
  actual: Record<string, unknown>,
  desired: Record<string, unknown> = actual,
): Record<string, unknown> =>
  Object.fromEntries(
    Object.entries(desired)
      .filter(([, value]) => isDeclared(value))
      .map(([key, value]) => [key, projectValue(actual[key], value, key)]),
  );

/**
 * Align `RUNTIME_TOKEN_PRESERVE` entries in `desired.environment` with any
 * non-empty string present in `actual.environment` (live `sirt_` token or
 * stored `[REDACTED]`). When `actual` lacks the key, the sentinel stays so
 * drift/create detects the missing runtime token without rotating live keys.
 */
export const alignRuntimeTokenDesired = <T extends Record<string, unknown>>(
  actual: Record<string, unknown>,
  desired: T,
): T => {
  const desiredEnv = readEnvironment(desired.environment);
  const actualEnv = readEnvironment(actual.environment);
  if (!desiredEnv || !actualEnv) return desired;
  let changed = false;
  const aligned = Object.fromEntries(
    Object.entries(desiredEnv).map(([key, value]) => {
      if (
        value === RUNTIME_TOKEN_PRESERVE &&
        typeof actualEnv[key] === 'string' &&
        actualEnv[key].length > 0
      ) {
        changed = true;
        return [key, actualEnv[key]];
      }
      return [key, value];
    }),
  );
  return changed ? { ...desired, environment: aligned } : desired;
};

export const definitionsDiffer = (
  actual: Record<string, unknown>,
  desired: Record<string, unknown>,
): boolean => {
  const alignedDesired = alignRuntimeTokenDesired(actual, desired);
  return !attributesEqual(
    managedDefinition(actual, alignedDesired),
    managedDefinition(alignedDesired),
  );
};

/** Only mapper-emitted fields are readable. Explicit null means known absence. */
export const remoteDiffersFromDesired = (
  remote: Record<string, unknown>,
  desired: Record<string, unknown>,
): boolean => {
  const alignedDesired = alignRuntimeTokenDesired(remote, desired);
  return Object.keys(remote).some(
    (key) =>
      remote[key] !== undefined &&
      isDeclared(alignedDesired[key]) &&
      !attributesEqual(
        { value: projectValue(remote[key], alignedDesired[key], key) },
        { value: projectValue(alignedDesired[key], alignedDesired[key], key) },
      ),
  );
};

export const remoteDiffersFromStored = (
  remote: Record<string, unknown>,
  stored: Record<string, unknown>,
  desired: Record<string, unknown>,
): boolean => {
  const intent = managedDefinition(stored, desired);
  const storedEnvironment = readEnvironment(intent.environment);
  const liveEnvironment = readEnvironment(remote.environment);
  if (storedEnvironment && liveEnvironment) {
    // A stored mask establishes that a key existed, but gives no value to compare.
    intent.environment = Object.fromEntries(
      Object.entries(storedEnvironment).map(([key, value]) => [
        key,
        isRedactedEnvValue(value) && Object.hasOwn(liveEnvironment, key)
          ? liveEnvironment[key]
          : value,
      ]),
    );
  }
  return remoteDiffersFromDesired(remote, intent);
};

/** Undefined is unavailable; null is a successfully read, absent policy. */
export const jsonDocumentDiffers = (desired: string | null, cloud: unknown): boolean => {
  if (desired === null || cloud === undefined) {
    return false;
  }
  if (cloud === null) {
    return desired !== 'null';
  }
  try {
    const desiredObj = JSON.parse(desired) as unknown;
    const cloudObj = typeof cloud === 'string' ? (JSON.parse(cloud) as unknown) : cloud;
    return !attributesEqual({ doc: desiredObj }, { doc: cloudObj });
  } catch {
    return false;
  }
};

/** Live values override stored intent only inside currently managed dimensions. */
export const mergeLiveBefore = (
  stored: Record<string, unknown>,
  live: Record<string, unknown>,
  desired?: Record<string, unknown>,
): Record<string, unknown> => {
  const before = {
    ...stored,
    ...Object.fromEntries(Object.entries(live).filter(([, value]) => value !== undefined)),
  };
  return desired ? managedDefinition(before, desired) : before;
};

const revertPaths = (stored: unknown, live: unknown, desired: unknown, path: string): string[] => {
  if (attributesEqual({ value: live }, { value: desired })) {
    return [];
  }
  if (isRecord(live) && isRecord(desired)) {
    const saved = isRecord(stored) ? stored : {};
    return [...new Set([...Object.keys(live), ...Object.keys(desired)])].flatMap((key) =>
      revertPaths(saved[key], live[key], desired[key], `${path}.${key}`),
    );
  }
  return attributesEqual({ value: stored }, { value: desired }) ? [path] : [];
};

export const computeRevertKeys = (
  stored: Record<string, unknown>,
  live: Record<string, unknown>,
  desired: Record<string, unknown>,
): string[] => {
  const alignedDesired = alignRuntimeTokenDesired(live, desired);
  const saved = managedDefinition(stored, alignRuntimeTokenDesired(stored, desired));
  const current = managedDefinition(live, alignedDesired);
  const target = managedDefinition(alignedDesired);
  return Object.keys(live)
    .filter((key) => live[key] !== undefined && isDeclared(alignedDesired[key]))
    .flatMap((key) => revertPaths(saved[key], current[key], target[key], key))
    .sort((a, b) => a.localeCompare(b));
};

const mergeIntentValue = (stored: unknown, desired: unknown): unknown => {
  if (!isDeclared(desired)) return stored ?? desired;
  if (!isRecord(desired)) return desired;
  const previous = isRecord(stored) ? stored : {};
  return Object.fromEntries(
    [...new Set([...Object.keys(previous), ...Object.keys(desired)])].map((key) => [
      key,
      mergeIntentValue(previous[key], desired[key]),
    ]),
  );
};

/** Retain unmanaged history so unrelated writes cannot erase dependency configuration. */
export const mergeManagedIntent = (
  stored: Record<string, unknown>,
  desired: Record<string, unknown>,
): Record<string, unknown> =>
  Object.fromEntries(
    [...new Set([...Object.keys(stored), ...Object.keys(desired)])].map((key) => [
      key,
      key === 'environment' && isDeclared(desired[key])
        ? desired[key]
        : mergeIntentValue(stored[key], desired[key]),
    ]),
  );
