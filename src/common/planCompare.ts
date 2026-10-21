import { attributesEqual } from './hashUtils';

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

const canonicalValue = (value: unknown, key: string, policyDocument = false): unknown => {
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

export const definitionsDiffer = (
  actual: Record<string, unknown>,
  desired: Record<string, unknown>,
): boolean => !attributesEqual(managedDefinition(actual, desired), managedDefinition(desired));

/** Only mapper-emitted fields are readable. Explicit null means known absence. */
export const remoteDiffersFromDesired = (
  remote: Record<string, unknown>,
  desired: Record<string, unknown>,
): boolean =>
  Object.keys(remote).some(
    (key) =>
      remote[key] !== undefined &&
      isDeclared(desired[key]) &&
      !attributesEqual(
        { value: projectValue(remote[key], desired[key], key) },
        { value: projectValue(desired[key], desired[key], key) },
      ),
  );

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
  const saved = managedDefinition(stored, desired);
  const current = managedDefinition(live, desired);
  const target = managedDefinition(desired);
  return Object.keys(live)
    .filter((key) => live[key] !== undefined && isDeclared(desired[key]))
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
