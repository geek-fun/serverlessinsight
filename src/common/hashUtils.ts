import crypto from 'node:crypto';
import fs from 'node:fs';

/**
 * Compute SHA-256 hash of a file.
 * Used for tracking external artifacts like function code zip files.
 * @param filePath - Path to the file to hash
 * @returns Hex-encoded SHA-256 hash of the file contents
 */
export const computeFileHash = (filePath: string): string => {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(fileBuffer).digest('hex');
};

/**
 * Compare two ResourceAttributes objects for equality.
 * Returns true if all keys and values match.
 * @param a - First attributes object
 * @param b - Second attributes object
 * @returns True if objects are equal, false otherwise
 */
export const attributesEqual = (
  a: Record<string, unknown>,
  b: Record<string, unknown>,
): boolean => {
  const aKeys = Object.keys(a).sort();
  const bKeys = Object.keys(b).sort();

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  for (let i = 0; i < aKeys.length; i++) {
    if (aKeys[i] !== bKeys[i]) {
      return false;
    }
    const key = aKeys[i];
    const aVal = a[key];
    const bVal = b[key];

    // Deep comparison for nested objects/arrays
    if (typeof aVal === 'object' && aVal !== null && typeof bVal === 'object' && bVal !== null) {
      const aStr = JSON.stringify(aVal);
      const bStr = JSON.stringify(bVal);
      if (aStr !== bStr) {
        return false;
      }
    } else if (aVal !== bVal) {
      return false;
    }
  }

  return true;
};

/**
 * Find differences between two ResourceAttributes objects.
 * Returns an object with changed keys and their before/after values.
 * @param before - Previous attributes
 * @param after - New attributes
 * @returns Object with changed, added, and removed keys
 */
export const diffAttributes = (
  before: Record<string, unknown>,
  after: Record<string, unknown>,
): {
  changed: Record<string, { before: unknown; after: unknown }>;
  added: Record<string, unknown>;
  removed: Record<string, unknown>;
} => {
  const changed: Record<string, { before: unknown; after: unknown }> = {};
  const added: Record<string, unknown> = {};
  const removed: Record<string, unknown> = {};

  const allKeys = new Set([...Object.keys(before), ...Object.keys(after)]);

  for (const key of allKeys) {
    const beforeVal = before[key];
    const afterVal = after[key];

    if (!(key in before)) {
      added[key] = afterVal;
    } else if (!(key in after)) {
      removed[key] = beforeVal;
    } else {
      // Both exist - check if they're different
      const beforeStr = JSON.stringify(beforeVal);
      const afterStr = JSON.stringify(afterVal);
      if (beforeStr !== afterStr) {
        changed[key] = { before: beforeVal, after: afterVal };
      }
    }
  }

  return { changed, added, removed };
};
