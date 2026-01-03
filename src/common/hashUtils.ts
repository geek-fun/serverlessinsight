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
 * Deep equality comparison for two values.
 * Handles primitives, objects, arrays, null, and undefined.
 * @param a - First value
 * @param b - Second value
 * @returns True if values are deeply equal, false otherwise
 */
const deepEqual = (a: unknown, b: unknown): boolean => {
  // Handle primitives and null/undefined
  if (a === b) {
    return true;
  }

  // Handle type mismatches
  if (typeof a !== typeof b) {
    return false;
  }

  // Handle null (typeof null === 'object')
  if (a === null || b === null) {
    return false; // One is null, other is not (would have matched above if both null)
  }

  // Handle non-objects (primitives that didn't match above)
  if (typeof a !== 'object') {
    return false;
  }

  // Both are objects/arrays at this point
  const objA = a as Record<string, unknown>;
  const objB = b as Record<string, unknown>;

  // Handle arrays
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }
    for (let i = 0; i < objA.length; i++) {
      if (!deepEqual(objA[i], objB[i])) {
        return false;
      }
    }
    return true;
  }

  // If one is array and other is not, they're not equal
  if (Array.isArray(objA) || Array.isArray(objB)) {
    return false;
  }

  // Compare object keys
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Check all keys exist in both and have equal values
  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, key)) {
      return false;
    }
    if (!deepEqual(objA[key], objB[key])) {
      return false;
    }
  }

  return true;
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
  return deepEqual(a, b);
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
      // Both exist - check if they're different using deep equality
      if (!deepEqual(beforeVal, afterVal)) {
        changed[key] = { before: beforeVal, after: afterVal };
      }
    }
  }

  return { changed, added, removed };
};
