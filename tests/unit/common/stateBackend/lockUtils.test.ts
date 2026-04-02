import os from 'node:os';
import { execSync } from 'node:child_process';
import {
  getUserEmail,
  sleep,
  isLockStale,
  isProcessAlive,
  createLockMetadata,
  LOCK_KEY_SUFFIX,
} from '../../../../src/common/stateBackend/lockUtils';
import { STALE_LOCK_THRESHOLD } from '../../../../src/common/constants';
import { LockMetadata } from '../../../../src/types';

jest.mock('node:child_process');
jest.mock('node:os');

describe('lockUtils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('LOCK_KEY_SUFFIX', () => {
    it('should have correct suffix value', () => {
      expect(LOCK_KEY_SUFFIX).toBe('.si-lock');
    });
  });

  describe('getUserEmail', () => {
    it('should return git user email if configured', () => {
      (execSync as jest.Mock).mockReturnValue('user@example.com\n');
      (os.userInfo as jest.Mock).mockReturnValue({ username: 'testuser' });
      (os.hostname as jest.Mock).mockReturnValue('localhost');

      const email = getUserEmail();
      expect(email).toBe('user@example.com');
      expect(execSync).toHaveBeenCalledWith('git config user.email', {
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'ignore'],
      });
    });

    it('should return username@hostname if git config fails', () => {
      (execSync as jest.Mock).mockImplementation(() => {
        throw new Error('git config failed');
      });
      (os.userInfo as jest.Mock).mockReturnValue({ username: 'testuser' });
      (os.hostname as jest.Mock).mockReturnValue('localhost');

      const email = getUserEmail();
      expect(email).toBe('testuser@localhost');
    });

    it('should use "unknown" when username is missing', () => {
      (execSync as jest.Mock).mockImplementation(() => {
        throw new Error('git config failed');
      });
      (os.userInfo as jest.Mock).mockReturnValue({ username: '' });
      (os.hostname as jest.Mock).mockReturnValue('localhost');

      const email = getUserEmail();
      expect(email).toBe('unknown@localhost');
    });

    it('should use "unknown" when hostname is missing', () => {
      (execSync as jest.Mock).mockImplementation(() => {
        throw new Error('git config failed');
      });
      (os.userInfo as jest.Mock).mockReturnValue({ username: 'testuser' });
      (os.hostname as jest.Mock).mockReturnValue('');

      const email = getUserEmail();
      expect(email).toBe('testuser@unknown');
    });

    it('should trim whitespace from git email output', () => {
      (execSync as jest.Mock).mockReturnValue('  user@example.com  \n');
      (os.userInfo as jest.Mock).mockReturnValue({ username: 'testuser' });
      (os.hostname as jest.Mock).mockReturnValue('localhost');

      const email = getUserEmail();
      expect(email).toBe('user@example.com');
    });

    it('should fall back to username@hostname when git returns empty email', () => {
      (execSync as jest.Mock).mockReturnValue('   ');
      (os.userInfo as jest.Mock).mockReturnValue({ username: 'testuser' });
      (os.hostname as jest.Mock).mockReturnValue('localhost');

      const email = getUserEmail();
      expect(email).toBe('testuser@localhost');
    });
  });

  describe('sleep', () => {
    it('should delay execution for specified milliseconds', async () => {
      const start = Date.now();
      await sleep(100);
      const elapsed = Date.now() - start;
      // Allow 10ms tolerance for timing precision issues in CI environments
      expect(elapsed).toBeGreaterThanOrEqual(90);
      expect(elapsed).toBeLessThan(200);
    });

    it('should return a resolved promise', async () => {
      const result = await sleep(10);
      expect(result).toBeUndefined();
    });

    it('should work with zero delay', async () => {
      const start = Date.now();
      await sleep(0);
      const elapsed = Date.now() - start;
      expect(elapsed).toBeLessThan(50);
    });
  });

  describe('isLockStale', () => {
    it('should return true for locks older than threshold', () => {
      const oldTime = new Date(Date.now() - STALE_LOCK_THRESHOLD - 1000).toISOString();
      const lock: LockMetadata = {
        id: 'test-id',
        user: 'user@example.com',
        processId: 1234,
        hostname: 'localhost',
        operation: 'deploy',
        acquiredAt: oldTime,
        path: '/path/to/state',
      };

      expect(isLockStale(lock)).toBe(true);
    });

    it('should return false for locks newer than threshold', () => {
      const recentTime = new Date(Date.now() - STALE_LOCK_THRESHOLD + 1000).toISOString();
      const lock: LockMetadata = {
        id: 'test-id',
        user: 'user@example.com',
        processId: 1234,
        hostname: 'localhost',
        operation: 'deploy',
        acquiredAt: recentTime,
        path: '/path/to/state',
      };

      expect(isLockStale(lock)).toBe(false);
    });

    it('should return false for locks just acquired', () => {
      const now = new Date().toISOString();
      const lock: LockMetadata = {
        id: 'test-id',
        user: 'user@example.com',
        processId: 1234,
        hostname: 'localhost',
        operation: 'deploy',
        acquiredAt: now,
        path: '/path/to/state',
      };

      expect(isLockStale(lock)).toBe(false);
    });

    it('should return true for locks older than or equal to threshold boundary', () => {
      const boundaryTime = new Date(Date.now() - STALE_LOCK_THRESHOLD - 1).toISOString();
      const lock: LockMetadata = {
        id: 'test-id',
        user: 'user@example.com',
        processId: 1234,
        hostname: 'localhost',
        operation: 'deploy',
        acquiredAt: boundaryTime,
        path: '/path/to/state',
      };

      expect(isLockStale(lock)).toBe(true);
    });
  });

  describe('isProcessAlive', () => {
    it('should return true when process is alive', () => {
      const currentPid = process.pid;
      expect(isProcessAlive(currentPid)).toBe(true);
    });

    it('should return false when process does not exist', () => {
      const invalidPid = 999999999;
      expect(isProcessAlive(invalidPid)).toBe(false);
    });
  });

  describe('createLockMetadata', () => {
    beforeEach(() => {
      (os.hostname as jest.Mock).mockReturnValue('test-hostname');
    });

    it('should create lock metadata with correct fields', () => {
      const lock = createLockMetadata('deploy', '/path/to/state');

      expect(lock).toHaveProperty('id');
      expect(lock).toHaveProperty('user');
      expect(lock).toHaveProperty('processId');
      expect(lock).toHaveProperty('hostname');
      expect(lock).toHaveProperty('operation');
      expect(lock).toHaveProperty('acquiredAt');
      expect(lock).toHaveProperty('path');
    });

    it('should set operation correctly', () => {
      const lock = createLockMetadata('destroy', '/path/to/state');
      expect(lock.operation).toBe('destroy');
    });

    it('should set path correctly', () => {
      const lockPath = '/custom/path/to/state';
      const lock = createLockMetadata('deploy', lockPath);
      expect(lock.path).toBe(lockPath);
    });

    it('should set processId to current process.pid', () => {
      const lock = createLockMetadata('deploy', '/path/to/state');
      expect(lock.processId).toBe(process.pid);
    });

    it('should set hostname from os.hostname()', () => {
      const lock = createLockMetadata('deploy', '/path/to/state');
      expect(lock.hostname).toBe('test-hostname');
    });

    it('should set acquiredAt to recent timestamp', () => {
      const before = Date.now();
      const lock = createLockMetadata('deploy', '/path/to/state');
      const after = Date.now();

      const acquiredTime = new Date(lock.acquiredAt).getTime();
      expect(acquiredTime).toBeGreaterThanOrEqual(before);
      expect(acquiredTime).toBeLessThanOrEqual(after);
    });

    it('should generate unique IDs for different locks', () => {
      const lock1 = createLockMetadata('deploy', '/path/to/state');
      const lock2 = createLockMetadata('deploy', '/path/to/state');

      expect(lock1.id).not.toBe(lock2.id);
      expect(lock1.id).toMatch(/^[a-f0-9]{32}$/); // 16 bytes = 32 hex chars
      expect(lock2.id).toMatch(/^[a-f0-9]{32}$/);
    });

    it('should generate 32-character hex ID', () => {
      const lock = createLockMetadata('deploy', '/path/to/state');
      expect(lock.id).toHaveLength(32);
      expect(lock.id).toMatch(/^[a-f0-9]{32}$/);
    });
  });
});
