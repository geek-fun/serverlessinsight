import { forceUnlockCommand } from '../../src/commands/forceUnlock';
import { acquireLock, releaseLock, getLockPath } from '../../src/common/lockManager';
import { getStatePath } from '../../src/common/stateManager';
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
    const statePath = getStatePath(testDir);
    const lockPath = getLockPath(statePath);

    // Acquire a lock
    const lock = await acquireLock(statePath, 'deploy', { timeout: 5000 });
    expect(fs.existsSync(lockPath)).toBe(true);

    // Force unlock
    await forceUnlockCommand(lock.id);

    // Verify lock is removed
    expect(fs.existsSync(lockPath)).toBe(false);
  });

  it('should throw error when no lock exists', async () => {
    await expect(forceUnlockCommand('non-existent-id')).rejects.toThrow();
  });

  it('should throw error when lock ID does not match', async () => {
    const statePath = getStatePath(testDir);
    const lockPath = getLockPath(statePath);

    // Acquire a lock
    const lock = await acquireLock(statePath, 'deploy', { timeout: 5000 });
    expect(fs.existsSync(lockPath)).toBe(true);

    // Try to force unlock with wrong ID
    await expect(forceUnlockCommand('wrong-id')).rejects.toThrow();

    // Verify lock still exists
    expect(fs.existsSync(lockPath)).toBe(true);

    // Clean up
    releaseLock(statePath, lock.id);
  });
});
