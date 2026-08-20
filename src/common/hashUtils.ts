import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

/* istanbul ignore next */
export const computeFileHash = (filePath: string): string => {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(fileBuffer).digest('hex');
};

/**
 * Content-based hash of a ZIP archive: hashes each entry's path + bytes in
 * sorted order, ignoring the archive binary itself. ZIP binaries embed file
 * timestamps and ordering, so hashing the raw file yields a different value
 * every time the same sources are repackaged — which makes every deploy plan
 * show a phantom code update. Entry paths are sorted so archive ordering does
 * not affect the result either.
 */
export const computeZipContentHash = async (zipPath: string): Promise<string> => {
  const { default: JSZip } = await import('jszip');
  const data = await fs.promises.readFile(zipPath);
  const zip = await JSZip.loadAsync(data);
  const entries = Object.values(zip.files)
    .filter((entry) => !entry.dir)
    .map((entry) => ({ path: entry.name, content: entry.async('nodebuffer') }));
  entries.sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));

  const hash = crypto.createHash('sha256');
  for (const entry of entries) {
    hash.update(entry.path);
    hash.update(await entry.content);
  }
  return hash.digest('hex');
};

/* istanbul ignore next */
export const computeDirectoryHash = (dirPath: string): string => {
  const files: string[] = [];

  const collectFiles = (currentPath: string) => {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      if (entry.isDirectory()) {
        collectFiles(fullPath);
      } else if (entry.isFile()) {
        files.push(fullPath);
      }
    }
  };

  collectFiles(dirPath);
  files.sort();

  const hash = crypto.createHash('sha256');
  for (const file of files) {
    const relativePath = path.relative(dirPath, file).split(path.sep).join('/');
    hash.update(relativePath);
    const content = fs.readFileSync(file);
    hash.update(content);
  }

  return hash.digest('hex');
};

/**
 * Deep equality comparison for two values.
 * Handles primitives, objects, arrays, null, and undefined.
 * @param a - First value
 * @param b - Second value
 * @returns True if values are deeply equal, false otherwise
 */
const deepEqual = (
  a: unknown,
  b: unknown,
  options?: { nullEqualsUndefined?: boolean },
): boolean => {
  const { nullEqualsUndefined = false } = options ?? {};

  // null and undefined both represent "unset" — treat them as equal when
  // requested. Resource attribute comparison (plans, drift detection) relies
  // on this because provider APIs return `null` for unset fields while
  // desired definitions carry `undefined`.
  if (nullEqualsUndefined) {
    if (a === null && b === undefined) return true;
    if (a === undefined && b === null) return true;
  }

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
      if (!deepEqual(objA[i], objB[i], options)) {
        return false;
      }
    }
    return true;
  }

  // If one is array and other is not, they're not equal
  if (Array.isArray(objA) || Array.isArray(objB)) {
    return false;
  }

  // Compare object keys. With nullEqualsUndefined, keys whose value is
  // undefined (or null, which the option treats as equivalent) are treated as
  // absent — JSON serialization drops undefined keys, so a state round-trip
  // would otherwise look like a phantom added/removed.
  const normalizeKey = (key: string, obj: Record<string, unknown>): boolean =>
    nullEqualsUndefined && (obj[key] === undefined || obj[key] === null);
  const keysA = Object.keys(objA).filter((k) => !normalizeKey(k, objA));
  const keysB = Object.keys(objB).filter((k) => !normalizeKey(k, objB));

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Check all keys exist in both and have equal values
  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, key)) {
      return false;
    }
    if (!deepEqual(objA[key], objB[key], options)) {
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
/* istanbul ignore next */
export const attributesEqual = (
  a: Record<string, unknown>,
  b: Record<string, unknown>,
): boolean => {
  return deepEqual(a, b, { nullEqualsUndefined: true });
};

/**
 * Find differences between two ResourceAttributes objects.
 * Returns an object with changed keys and their before/after values.
 * @param before - Previous attributes
 * @param after - New attributes
 * @returns Object with changed, added, and removed keys
 */
/* istanbul ignore next */
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
      // JSON serialization drops undefined keys — a key absent on one side
      // whose counterpart is undefined/null is not a real difference.
      if (afterVal !== undefined && afterVal !== null) added[key] = afterVal;
    } else if (!(key in after)) {
      if (beforeVal !== undefined && beforeVal !== null) removed[key] = beforeVal;
    } else {
      // Both exist - check if they're different using deep equality
      if (!deepEqual(beforeVal, afterVal, { nullEqualsUndefined: true })) {
        changed[key] = { before: beforeVal, after: afterVal };
      }
    }
  }

  return { changed, added, removed };
};
