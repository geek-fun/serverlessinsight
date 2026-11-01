import type { Context } from '../types';

/**
 * Ownership tag stamped on provider resources at create time so a deploy can
 * idempotently adopt a resource that exists in the cloud but is missing from
 * local state (e.g. state was reset or a previous run failed mid-way).
 *
 * The value encodes the owning stack, the logical id and — for resources
 * created after the regional refactor (issue #280) — the owning region:
 *   legacy:  `${app}-${service}:${logicalId}`      e.g. "fn-url-probe:functions.probe"
 *   current: `${app}-${service}:${logicalId}@${region}`
 *
 * A single tag is enough because the cloud resource name is already globally
 * unique per provider; the tag only needs to prove ownership so an unrelated
 * same-named resource is never adopted (that would corrupt state and let a
 * later destroy remove a resource that was never ours). The region component
 * prevents one regional deployment from adopting a physical resource that
 * belongs to another regional deployment of the same stack. Legacy values
 * without a region keep working for existing single-region deployments —
 * `si migrate --to-regional` reports them so ownership can be refreshed.
 */
export const OWNERSHIP_TAG_KEY = 'si-owned-by';

export const buildOwnershipTagValue = (
  context: Pick<Context, 'app' | 'service' | 'region'>,
  logicalId: string,
): string => `${context.app}-${context.service}:${logicalId}@${context.region}`;

export const parseOwnershipTagValue = (
  value: string | undefined,
): { stack: string; logicalId: string; region?: string } | null => {
  if (!value) return null;
  const idx = value.indexOf(':');
  if (idx <= 0) return null;
  const stack = value.slice(0, idx);
  const rest = value.slice(idx + 1);
  const atIdx = rest.lastIndexOf('@');
  if (atIdx > 0) {
    const region = rest.slice(atIdx + 1);
    if (region) {
      return { stack, logicalId: rest.slice(0, atIdx), region };
    }
  }
  return { stack, logicalId: rest };
};

/** True for pre-regional ownership tags (no region component). */
export const isLegacyOwnershipTag = (value: string | undefined): boolean => {
  const parsed = parseOwnershipTagValue(value);
  return !!parsed && !parsed.region;
};

export const isOwnedByStack = (
  context: Pick<Context, 'app' | 'service' | 'region'>,
  logicalId: string,
  tags: Array<{ Key?: string; Value?: string }> | undefined,
): boolean => {
  if (!tags) return false;
  const tag = tags.find((t) => t.Key === OWNERSHIP_TAG_KEY);
  if (!tag?.Value) return false;
  const parsed = parseOwnershipTagValue(tag.Value);
  if (!parsed) return false;
  if (parsed.stack !== `${context.app}-${context.service}` || parsed.logicalId !== logicalId) {
    return false;
  }
  // Region-tagged values must match the checking scope exactly; legacy values
  // (no region) keep their single-region adoption semantics.
  return parsed.region === undefined || parsed.region === context.region;
};

/**
 * App-scoped ownership for resources shared across services of one app
 * (issue #214 unified log container). Exact full-value match by design:
 * per-service stacks have no claim on shared resources, so only the
 * owning app may adopt them. The region component follows the same
 * legacy/current rule as buildOwnershipTagValue.
 */
export const SHARED_SCOPE = 'shared';

export const buildSharedOwnershipTagValue = (
  app: string,
  logicalId: string,
  region?: string,
): string =>
  region ? `${app}:${SHARED_SCOPE}:${logicalId}@${region}` : `${app}:${SHARED_SCOPE}:${logicalId}`;

export const isOwnedByApp = (
  app: string,
  logicalId: string,
  tags: Array<{ Key?: string; Value?: string }> | undefined,
  region?: string,
): boolean => {
  if (!tags) return false;
  const tag = tags.find((t) => t.Key === OWNERSHIP_TAG_KEY);
  if (!tag?.Value) return false;
  if (!tag.Value.startsWith(`${app}:${SHARED_SCOPE}:`)) {
    return false;
  }
  const suffix = tag.Value.slice(`${app}:${SHARED_SCOPE}:`.length);
  const atIdx = suffix.lastIndexOf('@');
  const taggedLogicalId = atIdx > 0 ? suffix.slice(0, atIdx) : suffix;
  const taggedRegion = atIdx > 0 ? suffix.slice(atIdx + 1) : undefined;
  if (taggedLogicalId !== logicalId) {
    return false;
  }
  return taggedRegion === undefined || (region !== undefined && taggedRegion === region);
};
