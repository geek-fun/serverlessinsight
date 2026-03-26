import { forceUnlockCommand } from '../../../src/commands/forceUnlock';
import { withLock, readLockFileForCommand } from '../../../src/common/lockManager';
import { getStatePath } from '../../../src/common/stateManager';
import { LOCK_FILE_SUFFIX } from '../../../src/common/constants';
import fs from 'node:fs';

// Mock readline for confirmation
jest.mock('node:readline', () => ({
  createInterface: jest.fn(() => ({
    question: jest.fn((question: string, callback: (answer: string) => void) => {
      // Auto-confirm for tests
      callback('yes');
    }),
    close: jest.fn(),
  })),
}));

describe('forceUnlockCommand', () => {
  const testDir = '/tmp/test-force-unlock';
  const originalCwd = process.cwd();

  beforeEach(() => {
    // Clean up test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });
    process.chdir(testDir);
  });

  afterEach(() => {
    process.chdir(originalCwd);
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('should successfully force unlock with correct lock ID', async () => {
    const statePath = getStatePath('', '', testDir);
    const lockPath = `${statePath}${LOCK_FILE_SUFFIX}`;

    let lockId: string | undefined;

    // Acquire a lock
    const promise = withLock(
      statePath,
      'deploy',
      async () => {
        const lock = readLockFileForCommand(statePath);
        lockId = lock?.id;
        expect(fs.existsSync(lockPath)).toBe(true);
        // Hold for a while
        await new Promise((resolve) => setTimeout(resolve, 1000));
      },
      { timeout: 5000 },
    );

    // Wait for lock
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Force unlock
    expect(lockId).toBeDefined();
    if (lockId) {
      await forceUnlockCommand(lockId);

      // Verify lock is removed
      expect(fs.existsSync(lockPath)).toBe(false);
    }

    await promise.catch(() => {
      // Ignore error
    });
  });

  it('should throw error when no lock exists', async () => {
    await expect(forceUnlockCommand('non-existent-id')).rejects.toThrow();
  });

  it('should throw error when lock ID does not match', async () => {
    const statePath = getStatePath('', '', testDir);
    const lockPath = `${statePath}${LOCK_FILE_SUFFIX}`;

    // Acquire a lock
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
    expect(fs.existsSync(lockPath)).toBe(true);

    // Try to force unlock with wrong ID
    await expect(forceUnlockCommand('wrong-id')).rejects.toThrow();

    // Verify lock still exists
    expect(fs.existsSync(lockPath)).toBe(true);

    await promise;
  });
});
