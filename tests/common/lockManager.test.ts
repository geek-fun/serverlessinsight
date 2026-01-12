import {
  acquireLock,
  releaseLock,
  forceUnlock,
  readLockFile,
  getLockPath,
  isLockStale,
  createLockMetadata,
  withLock,
  LockError,
} from '../../src/common/lockManager';
import fs from 'node:fs';
import path from 'node:path';

describe('LockManager', () => {
  const testDir = '/tmp/test-lock-manager';
  const statePath = path.join(testDir, '.serverlessinsight', 'state.json');
  const lockPath = getLockPath(statePath);

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

  describe('getLockPath', () => {
    it('should return correct lock path', () => {
      const result = getLockPath(statePath);
      expect(result).toBe(`${statePath}.si-lock`);
    });
  });

  describe('createLockMetadata', () => {
    it('should create lock metadata with required fields', () => {
      const metadata = createLockMetadata(statePath, 'deploy');

      expect(metadata.id).toBeDefined();
      expect(metadata.user).toBeDefined();
      expect(metadata.processId).toBe(process.pid);
      expect(metadata.hostname).toBeDefined();
      expect(metadata.operation).toBe('deploy');
      expect(metadata.acquiredAt).toBeDefined();
      expect(metadata.path).toBe(statePath);
    });
  });

  describe('acquireLock', () => {
    it('should successfully acquire lock when no lock exists', async () => {
      const lock = await acquireLock(statePath, 'deploy', { timeout: 5000 });

      expect(lock).toBeDefined();
      expect(lock.operation).toBe('deploy');
      expect(fs.existsSync(lockPath)).toBe(true);

      // Clean up
      releaseLock(statePath, lock.id);
    });

    it('should fail to acquire lock when another lock exists', async () => {
      // Acquire first lock
      const lock1 = await acquireLock(statePath, 'deploy', { timeout: 1000, retryDelay: 200 });

      // Try to acquire second lock - should fail quickly
      await expect(
        acquireLock(statePath, 'destroy', { timeout: 1000, retryDelay: 200 }),
      ).rejects.toThrow(LockError);

      // Clean up
      releaseLock(statePath, lock1.id);
    });

    it('should include lock info in error when lock acquisition fails', async () => {
      const lock1 = await acquireLock(statePath, 'deploy', { timeout: 1000, retryDelay: 200 });

      try {
        await acquireLock(statePath, 'destroy', { timeout: 1000, retryDelay: 200 });
        throw new Error('Should have thrown LockError');
      } catch (error) {
        expect(error).toBeInstanceOf(LockError);
        expect((error as LockError).lockInfo).toBeDefined();
        expect((error as LockError).lockInfo?.id).toBe(lock1.id);
      }

      // Clean up
      releaseLock(statePath, lock1.id);
    });
  });

  describe('releaseLock', () => {
    it('should release lock when lock ID matches', async () => {
      const lock = await acquireLock(statePath, 'deploy', { timeout: 5000 });
      expect(fs.existsSync(lockPath)).toBe(true);

      releaseLock(statePath, lock.id);
      expect(fs.existsSync(lockPath)).toBe(false);
    });

    it('should not release lock when lock ID does not match', async () => {
      const lock = await acquireLock(statePath, 'deploy', { timeout: 5000 });
      expect(fs.existsSync(lockPath)).toBe(true);

      releaseLock(statePath, 'wrong-id');
      expect(fs.existsSync(lockPath)).toBe(true);

      // Clean up
      releaseLock(statePath, lock.id);
    });
  });

  describe('forceUnlock', () => {
    it('should successfully force unlock when lock ID matches', async () => {
      const lock = await acquireLock(statePath, 'deploy', { timeout: 5000 });
      expect(fs.existsSync(lockPath)).toBe(true);

      const success = forceUnlock(statePath, lock.id);
      expect(success).toBe(true);
      expect(fs.existsSync(lockPath)).toBe(false);
    });

    it('should throw error when lock ID does not match', async () => {
      const lock = await acquireLock(statePath, 'deploy', { timeout: 5000 });

      expect(() => forceUnlock(statePath, 'wrong-id')).toThrow('Lock ID mismatch');

      // Clean up
      releaseLock(statePath, lock.id);
    });

    it('should return false when no lock exists', () => {
      const success = forceUnlock(statePath, 'any-id');
      expect(success).toBe(false);
    });
  });

  describe('isLockStale', () => {
    it('should detect stale lock', () => {
      const metadata = createLockMetadata(statePath, 'deploy');
      // Set acquiredAt to more than 1 hour ago
      metadata.acquiredAt = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();

      expect(isLockStale(metadata)).toBe(true);
    });

    it('should not detect fresh lock as stale', () => {
      const metadata = createLockMetadata(statePath, 'deploy');
      expect(isLockStale(metadata)).toBe(false);
    });
  });

  describe('withLock', () => {
    it('should execute function with automatic lock acquisition and release', async () => {
      let executed = false;

      await withLock(statePath, 'deploy', async () => {
        executed = true;
        // Verify lock exists during execution
        expect(fs.existsSync(lockPath)).toBe(true);
      });

      expect(executed).toBe(true);
      // Verify lock is released after execution
      expect(fs.existsSync(lockPath)).toBe(false);
    });

    it('should release lock even if function throws error', async () => {
      await expect(
        withLock(statePath, 'deploy', async () => {
          throw new Error('Test error');
        }),
      ).rejects.toThrow('Test error');

      // Verify lock is released after error
      expect(fs.existsSync(lockPath)).toBe(false);
    });

    it('should return function result', async () => {
      const result = await withLock(statePath, 'deploy', async () => {
        return 'test-result';
      });

      expect(result).toBe('test-result');
    });
  });

  describe('readLockFile', () => {
    it('should read existing lock file', async () => {
      const lock = await acquireLock(statePath, 'deploy', { timeout: 5000 });

      const readLock = readLockFile(lockPath);
      expect(readLock).toBeDefined();
      expect(readLock?.id).toBe(lock.id);
      expect(readLock?.operation).toBe('deploy');

      // Clean up
      releaseLock(statePath, lock.id);
    });

    it('should return null for non-existent lock file', () => {
      const readLock = readLockFile(lockPath);
      expect(readLock).toBeNull();
    });

    it('should return null for corrupted lock file', () => {
      const lockDir = path.dirname(lockPath);
      fs.mkdirSync(lockDir, { recursive: true });
      fs.writeFileSync(lockPath, 'invalid json');

      const readLock = readLockFile(lockPath);
      expect(readLock).toBeNull();
    });
  });

  describe('concurrent lock attempts', () => {
    it('should handle multiple concurrent lock attempts', async () => {
      const results: Array<{ success: boolean; lockId?: string }> = [];

      // Start 3 concurrent lock attempts
      const promises = [
        acquireLock(statePath, 'deploy', { timeout: 2000, retryDelay: 200 })
          .then((lock) => {
            results.push({ success: true, lockId: lock.id });
            return lock;
          })
          .catch(() => {
            results.push({ success: false });
            return null;
          }),
        acquireLock(statePath, 'deploy', { timeout: 2000, retryDelay: 200 })
          .then((lock) => {
            results.push({ success: true, lockId: lock.id });
            return lock;
          })
          .catch(() => {
            results.push({ success: false });
            return null;
          }),
        acquireLock(statePath, 'deploy', { timeout: 2000, retryDelay: 200 })
          .then((lock) => {
            results.push({ success: true, lockId: lock.id });
            return lock;
          })
          .catch(() => {
            results.push({ success: false });
            return null;
          }),
      ];

      const locks = await Promise.all(promises);

      // Only one should succeed
      const successCount = results.filter((r) => r.success).length;
      expect(successCount).toBe(1);

      // Clean up
      const successfulLock = locks.find((l) => l !== null);
      if (successfulLock) {
        releaseLock(statePath, successfulLock.id);
      }
    });
  });
});
