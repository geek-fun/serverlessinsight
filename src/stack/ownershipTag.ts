import type { Context } from '../types';

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

  return parsed.region === undefined || parsed.region === context.region;
};

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
