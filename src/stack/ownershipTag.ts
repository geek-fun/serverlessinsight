import type { Context } from '../types';

/**
 * Ownership tag stamped on provider resources at create time so a deploy can
 * idempotently adopt a resource that exists in the cloud but is missing from
 * local state (e.g. state was reset or a previous run failed mid-way).
 *
 * The value encodes BOTH the owning stack and the logical id:
 *   `${app}-${service}:${logicalId}`  e.g. "fn-url-probe:functions.probe"
 *
 * A single tag is enough because the cloud resource name is already globally
 * unique per provider; the tag only needs to prove ownership so an unrelated
 * same-named resource is never adopted (that would corrupt state and let a
 * later destroy remove a resource that was never ours).
 */
export const OWNERSHIP_TAG_KEY = 'si-owned-by';

export const buildOwnershipTagValue = (
  context: Pick<Context, 'app' | 'service'>,
  logicalId: string,
): string => `${context.app}-${context.service}:${logicalId}`;

export const parseOwnershipTagValue = (
  value: string | undefined,
): { stack: string; logicalId: string } | null => {
  if (!value) return null;
  const idx = value.indexOf(':');
  if (idx <= 0) return null;
  return { stack: value.slice(0, idx), logicalId: value.slice(idx + 1) };
};

export const isOwnedByStack = (
  context: Pick<Context, 'app' | 'service'>,
  logicalId: string,
  tags: Array<{ Key?: string; Value?: string }> | undefined,
): boolean => {
  if (!tags) return false;
  const tag = tags.find((t) => t.Key === OWNERSHIP_TAG_KEY);
  if (!tag?.Value) return false;
  const parsed = parseOwnershipTagValue(tag.Value);
  if (!parsed) return false;
  return parsed.stack === `${context.app}-${context.service}` && parsed.logicalId === logicalId;
};

/**
 * App-scoped ownership for resources shared across services of one app
 * (issue #214 unified log container). Exact full-value match by design:
 * per-service stacks have no claim on shared resources, so only the
 * owning app may adopt them.
 */
export const SHARED_SCOPE = 'shared';

export const buildSharedOwnershipTagValue = (app: string, logicalId: string): string =>
  `${app}:${SHARED_SCOPE}:${logicalId}`;

export const isOwnedByApp = (
  app: string,
  logicalId: string,
  tags: Array<{ Key?: string; Value?: string }> | undefined,
): boolean => {
  if (!tags) return false;
  const tag = tags.find((t) => t.Key === OWNERSHIP_TAG_KEY);
  if (!tag?.Value) return false;
  return tag.Value === buildSharedOwnershipTagValue(app, logicalId);
};
