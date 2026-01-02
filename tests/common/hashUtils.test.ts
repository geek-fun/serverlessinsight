import { computeFileHash, attributesEqual, diffAttributes } from '../../src/common/hashUtils';
import fs from 'node:fs';
import path from 'node:path';

describe('HashUtils', () => {
  const testDir = '/tmp/test-hash-utils';

  beforeEach(() => {
    // Clean up test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    // Clean up after tests
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  describe('computeFileHash', () => {
    it('should compute consistent hash for same content', () => {
      const testFile = path.join(testDir, 'test.txt');
      fs.writeFileSync(testFile, 'Hello, World!');

      const hash1 = computeFileHash(testFile);
      const hash2 = computeFileHash(testFile);

      expect(hash1).toBe(hash2);
      expect(hash1).toHaveLength(64); // SHA-256 produces 64 hex characters
    });

    it('should compute different hash for different content', () => {
      const testFile1 = path.join(testDir, 'test1.txt');
      const testFile2 = path.join(testDir, 'test2.txt');
      fs.writeFileSync(testFile1, 'Hello, World!');
      fs.writeFileSync(testFile2, 'Hello, World!2');

      const hash1 = computeFileHash(testFile1);
      const hash2 = computeFileHash(testFile2);

      expect(hash1).not.toBe(hash2);
    });

    it('should compute same hash for same content in different files', () => {
      const testFile1 = path.join(testDir, 'test1.txt');
      const testFile2 = path.join(testDir, 'test2.txt');
      fs.writeFileSync(testFile1, 'Hello, World!');
      fs.writeFileSync(testFile2, 'Hello, World!');

      const hash1 = computeFileHash(testFile1);
      const hash2 = computeFileHash(testFile2);

      expect(hash1).toBe(hash2);
    });
  });

  describe('attributesEqual', () => {
    it('should return true for empty objects', () => {
      expect(attributesEqual({}, {})).toBe(true);
    });

    it('should return true for same simple attributes', () => {
      const a = { name: 'test', count: 5, enabled: true };
      const b = { name: 'test', count: 5, enabled: true };
      expect(attributesEqual(a, b)).toBe(true);
    });

    it('should return false for different values', () => {
      const a = { name: 'test', count: 5 };
      const b = { name: 'test', count: 10 };
      expect(attributesEqual(a, b)).toBe(false);
    });

    it('should return false for different keys', () => {
      const a = { name: 'test', count: 5 };
      const b = { name: 'test', total: 5 };
      expect(attributesEqual(a, b)).toBe(false);
    });

    it('should return false for different number of keys', () => {
      const a = { name: 'test', count: 5 };
      const b = { name: 'test', count: 5, extra: 'value' };
      expect(attributesEqual(a, b)).toBe(false);
    });

    it('should handle nested objects', () => {
      const a = { config: { runtime: 'nodejs18', handler: 'index.handler' } };
      const b = { config: { runtime: 'nodejs18', handler: 'index.handler' } };
      expect(attributesEqual(a, b)).toBe(true);
    });

    it('should detect differences in nested objects', () => {
      const a = { config: { runtime: 'nodejs18', handler: 'index.handler' } };
      const b = { config: { runtime: 'nodejs20', handler: 'index.handler' } };
      expect(attributesEqual(a, b)).toBe(false);
    });

    it('should handle arrays', () => {
      const a = { items: [1, 2, 3] };
      const b = { items: [1, 2, 3] };
      expect(attributesEqual(a, b)).toBe(true);
    });

    it('should detect differences in arrays', () => {
      const a = { items: [1, 2, 3] };
      const b = { items: [1, 2, 4] };
      expect(attributesEqual(a, b)).toBe(false);
    });

    it('should handle null values', () => {
      const a = { value: null };
      const b = { value: null };
      expect(attributesEqual(a, b)).toBe(true);
    });

    it('should handle undefined vs defined', () => {
      const a = { value: undefined };
      const b = { value: 'test' };
      expect(attributesEqual(a, b)).toBe(false);
    });
  });

  describe('diffAttributes', () => {
    it('should return empty diff for identical objects', () => {
      const a = { name: 'test', count: 5 };
      const b = { name: 'test', count: 5 };
      const diff = diffAttributes(a, b);
      expect(diff.changed).toEqual({});
      expect(diff.added).toEqual({});
      expect(diff.removed).toEqual({});
    });

    it('should detect changed values', () => {
      const a = { name: 'test', count: 5 };
      const b = { name: 'test', count: 10 };
      const diff = diffAttributes(a, b);
      expect(diff.changed).toEqual({
        count: { before: 5, after: 10 },
      });
      expect(diff.added).toEqual({});
      expect(diff.removed).toEqual({});
    });

    it('should detect added keys', () => {
      const a = { name: 'test' };
      const b = { name: 'test', count: 5 };
      const diff = diffAttributes(a, b);
      expect(diff.changed).toEqual({});
      expect(diff.added).toEqual({ count: 5 });
      expect(diff.removed).toEqual({});
    });

    it('should detect removed keys', () => {
      const a = { name: 'test', count: 5 };
      const b = { name: 'test' };
      const diff = diffAttributes(a, b);
      expect(diff.changed).toEqual({});
      expect(diff.added).toEqual({});
      expect(diff.removed).toEqual({ count: 5 });
    });

    it('should detect multiple changes', () => {
      const a = { name: 'test', count: 5, old: 'value' };
      const b = { name: 'updated', count: 5, new: 'value' };
      const diff = diffAttributes(a, b);
      expect(diff.changed).toEqual({
        name: { before: 'test', after: 'updated' },
      });
      expect(diff.added).toEqual({ new: 'value' });
      expect(diff.removed).toEqual({ old: 'value' });
    });

    it('should handle nested object changes', () => {
      const a = { config: { runtime: 'nodejs18' } };
      const b = { config: { runtime: 'nodejs20' } };
      const diff = diffAttributes(a, b);
      expect(diff.changed).toEqual({
        config: {
          before: { runtime: 'nodejs18' },
          after: { runtime: 'nodejs20' },
        },
      });
    });
  });
});
