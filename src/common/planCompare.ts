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
