import { attributesEqual } from './hashUtils';

/**
 * A desired value "declares" a dimension only when the executor would write it:
 * `undefined`/`null` mean unset, and an empty plain object means the executor
 * omits the field entirely (e.g. fc3 `environment: {}`, oss
 * `websiteConfiguration: {}`) — so cloud-side values in that dimension can
 * never be cleared and are not drift. Arrays and empty strings stay declared:
 * the executor writes them explicitly.
 */
const isDeclared = (value: unknown): boolean => {
  if (value === undefined || value === null) {
    return false;
  }
  if (
    typeof value === 'object' &&
    !Array.isArray(value) &&
    Object.keys(value as Record<string, unknown>).length === 0
  ) {
    return false;
  }
  return true;
};

/**
 * One-directional live-drift check (issue #234 Phase 1 contract):
 * compares only the attributes a cloud->definition mapper emits (remote) that
 * the desired definition actually declares. A desired value with no matching
 * cloud value IS drift (the executor sets it on update); a cloud-only extra
 * the config never asked for is ignored (the executor may not clear it).
 * Unreadable/config-only keys never appear in `remote` — so matching reality
 * stays `noop` instead of phantom-drifting every plan.
 */
export const remoteDiffersFromDesired = (
  remote: Record<string, unknown>,
  desired: Record<string, unknown>,
): boolean =>
  Object.entries(remote).some(([key]) => {
    const desiredValue = desired[key];
    if (!isDeclared(desiredValue)) {
      return false;
    }
    return !attributesEqual({ [key]: remote[key] }, { [key]: desiredValue });
  });

/**
 * Canonical JSON document compare (issue #234 phase 3): providers return
 * policy documents as parsed objects (or re-serialized strings) whose key
 * order and formatting differ from what the config serialized, so byte-level
 * string comparison false-drifts. Parses both sides and compares
 * key-order-insensitively. Undeclared (null) desired or unreadable cloud
 * values are not drift — only a parseable pair with different content is.
 */
export const jsonDocumentDiffers = (desired: string | null, cloud: unknown): boolean => {
  if (desired === null || cloud === undefined || cloud === null) {
    return false;
  }
  try {
    const desiredObj = JSON.parse(desired) as unknown;
    const cloudObj = typeof cloud === 'string' ? (JSON.parse(cloud) as unknown) : cloud;
    return !attributesEqual({ doc: cloudObj }, { doc: desiredObj });
  } catch {
    return false;
  }
};

/**
 * Best-known "current live" display baseline (issue #246): the plan diff's
 * `before` must always be cloud reality, not the stored intent. Live mapper
 * output covers only the attributes the cloud API exposes, so stored
 * definition keys the mapper never emits (codeHash, iam, ...) are carried
 * over from the stored definition — live values win where readable, stored
 * values fill the unreadable rest.
 */
export const mergeLiveBefore = (
  stored: Record<string, unknown>,
  live: Record<string, unknown>,
): Record<string, unknown> => ({ ...stored, ...live });

/**
 * Field-level drift signature (issue #246): top-level keys where the stored
 * definition already matches the desired one while the live value does not —
 * i.e. the difference on that key is entirely a cloud-side edit the config
 * never asked for. All three sides should be passed through the same
 * normalization the display uses, so keys line up with the rendered diff.
 */
export const computeRevertKeys = (
  stored: Record<string, unknown>,
  live: Record<string, unknown>,
  desired: Record<string, unknown>,
): string[] => {
  // Only keys the live read actually carries can claim a cloud-side edit —
  // a desired-declared key the mapper never emits (codeHash, iam, ...) is an
  // unreadable dimension, not a revert.
  return Object.keys(live)
    .filter((key) => {
      const storedMatchesDesired = attributesEqual({ [key]: stored[key] }, { [key]: desired[key] });
      const liveMatchesDesired = attributesEqual({ [key]: live[key] }, { [key]: desired[key] });
      return storedMatchesDesired && !liveMatchesDesired;
    })
    .sort((a, b) => a.localeCompare(b));
};
