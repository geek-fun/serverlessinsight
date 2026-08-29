/**
 * Deterministic constrained-name builder.
 *
 * Contract (see GitHub issue #222):
 * - Identifiers are derived from user config and must respect a provider
 *   maximum length. Silent truncation used to discard the distinguishing
 *   discriminator (issue #221: RepeatedApiName collisions).
 * - When the composed name fits the maximum length, it is returned verbatim
 *   (minus charset sanitisation) so existing well-fitting configurations keep
 *   their deployed names and do not churn.
 * - When it does not fit, the human-readable prefix is truncated FIRST while
 *   the discriminator (later parts) is preserved whenever possible, and a
 *   deterministic hash of the raw parts is always appended so distinct inputs
 *   never collapse to the same name. Theoretical digest collisions within a
 *   deploy set are additionally rejected up-front by semantic validation.
 */

const FNV_OFFSET_BASIS = 0x811c9dc5;
const FNV_PRIME = 0x01000193;

type CharsetMode = 'underscore' | 'hyphen';

const SANITISERS: Record<CharsetMode, { invalidChars: RegExp; separator: string }> = {
  // Aliyun identifiers (CreateApi apiName: [A-Za-z0-9_], hyphens forbidden)
  underscore: { invalidChars: /[^A-Za-z0-9_]/g, separator: '_' },
  // Volcengine identifiers (letters/digits/hyphens, underscores folded to hyphens)
  hyphen: { invalidChars: /[^A-Za-z0-9-]/g, separator: '-' },
};

export const DEFAULT_HASH_LENGTH = 7;

const toUtf8Bytes = (input: string): Array<number> => Array.from(Buffer.from(input, 'utf8'));

/** Deterministic 32-bit FNV-1a rendered as fixed-width base36. */
export const stableHash = (raw: string, length: number = DEFAULT_HASH_LENGTH): string =>
  toUtf8Bytes(raw)
    .reduce((hash, byte) => ((hash ^ byte) * FNV_PRIME) >>> 0, FNV_OFFSET_BASIS)
    .toString(36)
    .padStart(length, '0')
    .slice(0, length);

const sanitizePart = (part: string, mode: CharsetMode): string =>
  part.replace(SANITISERS[mode].invalidChars, SANITISERS[mode].separator);

export type ConstrainedNameOptions = {
  parts: Array<string>;
  maxLength: number;
  charset: CharsetMode;
};

/**
 * Build a provider-constrained identifier from ordered user-derived segments,
 * joined by the charset separator. Over-long compositions truncate the leading
 * (human-readable) segments first and append a hash of the raw segments so
 * distinct inputs never collapse into one name.
 */
export const buildConstrainedName = ({
  parts,
  maxLength,
  charset,
}: ConstrainedNameOptions): string => {
  const { separator } = SANITISERS[charset];
  const joinSegments = (segments: Array<string>): string =>
    segments
      .map((part) => sanitizePart(part, charset))
      .filter((part) => part.length > 0)
      .join(separator);

  const readable = joinSegments(parts);
  if (readable.length <= maxLength) {
    return readable;
  }

  const hashLength = Math.max(1, Math.min(DEFAULT_HASH_LENGTH, maxLength - 1));
  // Hash over the RAW segments so inputs sanitising identically stay distinct.
  const hash = stableHash(parts.join('\u0000'), hashLength);

  const clampPrefix = (cap: number): string => {
    const prefix = joinSegments(parts.slice(0, -1)).slice(0, Math.max(cap, 0));
    return prefix.replace(new RegExp(`\\${separator}+$`), '');
  };

  const separatorAllowance = separator.length * 2;
  const discriminatorRoom = maxLength - hashLength - separatorAllowance;
  const discriminatorSanitized = sanitizePart(parts[parts.length - 1], charset);

  if (parts.length > 1 && discriminatorSanitized.length <= discriminatorRoom) {
    const headSegments = [
      clampPrefix(discriminatorRoom - discriminatorSanitized.length),
      discriminatorSanitized,
    ].filter((segment) => segment.length > 0);
    return `${headSegments.join(separator)}${separator}${hash}`;
  }

  const headOnly = clampPrefix(maxLength - hashLength - separator.length);
  return [headOnly, hash].filter((segment) => segment.length > 0).join(separator);
};

/** Per-provider maximum lengths for names generated through this module. */
export const CONSTRAINT_NAME_LIMITS = {
  ALIYUN_CREATE_API_NAME: 50,
  ALIYUN_API_GROUP_NAME: 50,
  VOLCENGINE_ROUTE_NAME: 63,
  FUNCTION_ROLE_NAME: 64,
} as const;

/** Single source of truth for per-function execution role names across all providers. */
export const buildFunctionRoleName = (serviceName: string, stage: string, fnKey: string): string =>
  buildConstrainedName({
    parts: [serviceName, stage, fnKey, 'role'],
    maxLength: CONSTRAINT_NAME_LIMITS.FUNCTION_ROLE_NAME,
    charset: 'hyphen',
  });

/** Single source of truth for the execution policy name attached to a role. */
export const buildRolePolicyName = (roleName: string): string => `${roleName}-policy`;
