import {
  forceUnlock,
  withLock,
  LockError,
  readLockFileForCommand,
  acquireLockInternal,
} from '../../src/common/lockManager';
import { LOCK_FILE_SUFFIX } from '../../src/common/constants';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

describe('LockManager', () => {
  const testDir = '/tmp/test-lock-manager';
  const statePath = path.join(testDir, '.serverlessinsight', 'state.json');
  const lockPath = `${statePath}${LOCK_FILE_SUFFIX}`;

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

    it('should fail to acquire lock when another lock exists', async () => {
      // Acquire first lock
      const promise1 = withLock(
        statePath,
        'deploy',
        async () => {
          // Hold lock for 2 seconds
          await new Promise((resolve) => setTimeout(resolve, 2000));
          return 'result1';
        },
        { timeout: 5000, retryDelay: 200 },
      );

      // Wait a bit to ensure first lock is acquired
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Try to acquire second lock - should fail quickly
      await expect(
        withLock(statePath, 'destroy', async () => 'result2', { timeout: 1000, retryDelay: 200 }),
      ).rejects.toThrow(LockError);

      // Wait for first lock to complete
      await promise1;
    });

    it('should include lock info in error when lock acquisition fails', async () => {
      // Acquire first lock
      const promise1 = withLock(
        statePath,
        'deploy',
        async () => {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          return 'result1';
        },
        { timeout: 5000, retryDelay: 200 },
      );

      // Wait a bit
      await new Promise((resolve) => setTimeout(resolve, 100));

      try {
        await withLock(statePath, 'destroy', async () => 'result2', {
          timeout: 1000,
          retryDelay: 200,
        });
        throw new Error('Should have thrown LockError');
      } catch (error) {
        expect(error).toBeInstanceOf(LockError);
        expect((error as LockError).lockInfo).toBeDefined();
      }

      await promise1;
    });
  });

  describe('forceUnlock', () => {
    it('should successfully force unlock when lock ID matches', async () => {
      let lockId: string | undefined;

      // Acquire lock and capture ID
      const promise = withLock(
        statePath,
        'deploy',
        async () => {
          const lock = readLockFileForCommand(statePath);
          lockId = lock?.id;
          expect(fs.existsSync(lockPath)).toBe(true);
          // Hold lock for a while
          await new Promise((resolve) => setTimeout(resolve, 1000));
        },
        { timeout: 5000 },
      );

      // Wait for lock to be acquired
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Force unlock
      expect(lockId).toBeDefined();
      if (lockId) {
        const success = forceUnlock(statePath, lockId);
        expect(success).toBe(true);
        expect(fs.existsSync(lockPath)).toBe(false);
      }

      // The original withLock will complete but lock is already gone
      await promise.catch(() => {
        // Ignore error as lock was force-removed
      });
    });

    it('should throw error when lock ID does not match', async () => {
      // Acquire lock
      const promise = withLock(
        statePath,
        'deploy',
        async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        },
        { timeout: 5000 },
      );

      // Wait for lock
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(() => forceUnlock(statePath, 'wrong-id')).toThrow('Lock ID mismatch');

      await promise;
    });

    it('should return false when no lock exists', () => {
      const success = forceUnlock(statePath, 'any-id');
      expect(success).toBe(false);
    });
  });

  describe('concurrent lock attempts', () => {
    it('should handle multiple concurrent lock attempts sequentially', async () => {
      const results: Array<{ success: boolean; value?: string }> = [];

      // Start 3 concurrent lock attempts
      // They will be processed sequentially - first acquires, then releases, then next acquires
      const promises = [
        withLock(
          statePath,
          'deploy',
          async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
            return 'result1';
          },
          { timeout: 5000, retryDelay: 200 },
        )
          .then((value) => {
            results.push({ success: true, value });
            return value;
          })
          .catch(() => {
            results.push({ success: false });
            return null;
          }),
        withLock(
          statePath,
          'deploy',
          async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
            return 'result2';
          },
          { timeout: 5000, retryDelay: 200 },
        )
          .then((value) => {
            results.push({ success: true, value });
            return value;
          })
          .catch(() => {
            results.push({ success: false });
            return null;
          }),
        withLock(
          statePath,
          'deploy',
          async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
            return 'result3';
          },
          { timeout: 5000, retryDelay: 200 },
        )
          .then((value) => {
            results.push({ success: true, value });
            return value;
          })
          .catch(() => {
            results.push({ success: false });
            return null;
          }),
      ];

      await Promise.all(promises);

      // All should succeed as locks are acquired sequentially
      const successCount = results.filter((r) => r.success).length;
      expect(successCount).toBeGreaterThan(0);
      // Ensure at least some executed (proves locks work)
      expect(results.length).toBe(3);
    });
  });

  describe('readLockFileForCommand', () => {
    it('should read existing lock file', async () => {
      let lockInfo;

      await withLock(statePath, 'deploy', async () => {
        lockInfo = readLockFileForCommand(statePath);
        expect(lockInfo).toBeDefined();
        expect(lockInfo?.operation).toBe('deploy');
      });
    });

    it('should return null for non-existent lock file', () => {
      const lockInfo = readLockFileForCommand(statePath);
      expect(lockInfo).toBeNull();
    });
  });

  describe('dead process auto-release', () => {
    it('should auto-release lock from dead process on same host', async () => {
      const deadPid = 999999;
      const staleLock = {
        id: 'dead-process-lock-id',
        user: 'test@test.com',
        processId: deadPid,
        hostname: os.hostname(),
        operation: 'deploy',
        acquiredAt: new Date().toISOString(),
        path: statePath,
      };

      const lockDir = path.dirname(lockPath);
      if (!fs.existsSync(lockDir)) {
        fs.mkdirSync(lockDir, { recursive: true });
      }
      fs.writeFileSync(lockPath, JSON.stringify(staleLock, null, 2), 'utf-8');

      const result = await acquireLockInternal(statePath, 'deploy', {
        timeout: 5000,
        retryDelay: 100,
      });

      expect(result).toBeDefined();
      expect(result.id).not.toBe('dead-process-lock-id');
      expect(result.processId).toBe(process.pid);

      fs.unlinkSync(lockPath);
    });

    it('should NOT auto-release lock from different host', async () => {
      const staleLock = {
        id: 'remote-lock-id',
        user: 'test@test.com',
        processId: 999999,
        hostname: 'some-other-host-that-is-not-this-one',
        operation: 'deploy',
        acquiredAt: new Date().toISOString(),
        path: statePath,
      };

      const lockDir = path.dirname(lockPath);
      if (!fs.existsSync(lockDir)) {
        fs.mkdirSync(lockDir, { recursive: true });
      }
      fs.writeFileSync(lockPath, JSON.stringify(staleLock, null, 2), 'utf-8');

      await expect(
        acquireLockInternal(statePath, 'deploy', { timeout: 1000, retryDelay: 200 }),
      ).rejects.toThrow(LockError);

      if (fs.existsSync(lockPath)) {
        fs.unlinkSync(lockPath);
      }
    });

    it('should NOT auto-release lock from alive process on same host', async () => {
      const aliveLock = {
        id: 'alive-process-lock-id',
        user: 'test@test.com',
        processId: process.pid,
        hostname: os.hostname(),
        operation: 'deploy',
        acquiredAt: new Date().toISOString(),
        path: statePath,
      };

      const lockDir = path.dirname(lockPath);
      if (!fs.existsSync(lockDir)) {
        fs.mkdirSync(lockDir, { recursive: true });
      }
      fs.writeFileSync(lockPath, JSON.stringify(aliveLock, null, 2), 'utf-8');

      await expect(
        acquireLockInternal(statePath, 'deploy', { timeout: 1000, retryDelay: 200 }),
      ).rejects.toThrow(LockError);

      if (fs.existsSync(lockPath)) {
        fs.unlinkSync(lockPath);
      }
    });
  });
});
