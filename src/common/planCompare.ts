import { attributesEqual } from './hashUtils';

/**
 * One-directional live-drift check (issue #234 Phase 1 contract):
 * compares only the attributes a cloud->definition mapper emits (remote) that
 * the desired definition actually declares non-null. A desired value with no
 * matching cloud value IS drift (the executor sets it on update); a cloud-only
 * extra the config never asked for is ignored (the executor may not clear it).
 * Unreadable/config-only keys never appear in `remote` — so matching reality
 * stays `noop` instead of phantom-drifting every plan.
 */
export const remoteDiffersFromDesired = (
  remote: Record<string, unknown>,
  desired: Record<string, unknown>,
): boolean =>
  Object.entries(remote).some(([key]) => {
    const desiredValue = desired[key];
    if (desiredValue === undefined || desiredValue === null) {
      return false;
    }
    return !attributesEqual({ [key]: remote[key] }, { [key]: desiredValue });
  });
