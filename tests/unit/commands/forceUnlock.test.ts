import { forceUnlockCommand } from '../../../src/commands/forceUnlock';
import { withLock, readLockFileForCommand } from '../../../src/common/lockManager';
import { getStatePath } from '../../../src/common/stateManager';
import { LOCK_FILE_SUFFIX } from '../../../src/common/constants';
import fs from 'node:fs';

jest.mock('node:readline', () => ({
  createInterface: jest.fn(() => ({
    question: jest.fn((_question: string, callback: (answer: string) => void) => {
      callback('yes');
    }),
    close: jest.fn(),
  })),
}));

describe('forceUnlockCommand', () => {
  const testDir = '/tmp/test-force-unlock';
  const originalCwd = process.cwd();

  beforeEach(() => {
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

    const promise = withLock(
      statePath,
      'deploy',
      async () => {
        const lock = readLockFileForCommand(statePath);
        lockId = lock?.id;
        expect(fs.existsSync(lockPath)).toBe(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      },
      { timeout: 5000 },
    );

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(lockId).toBeDefined();
    if (lockId) {
      await forceUnlockCommand(lockId);
      expect(fs.existsSync(lockPath)).toBe(false);
    }

    await promise.catch(() => {});
  });

  it('should throw error when no lock exists', async () => {
    await expect(forceUnlockCommand('non-existent-id')).rejects.toThrow();
  });

  it('should throw error when lock ID does not match', async () => {
    const statePath = getStatePath('', '', testDir);
    const lockPath = `${statePath}${LOCK_FILE_SUFFIX}`;

    const promise = withLock(
      statePath,
      'deploy',
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      },
      { timeout: 5000 },
    );

    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(fs.existsSync(lockPath)).toBe(true);

    await expect(forceUnlockCommand('wrong-id')).rejects.toThrow();
    expect(fs.existsSync(lockPath)).toBe(true);

    await promise;
  });

  it('should cancel unlock when user does not confirm', async () => {
    jest.resetModules();
    jest.doMock('node:readline', () => ({
      createInterface: jest.fn(() => ({
        question: jest.fn((_question: string, callback: (answer: string) => void) => {
          callback('no');
        }),
        close: jest.fn(),
      })),
    }));

    const statePath = getStatePath('', '', testDir);
    const lockPath = `${statePath}${LOCK_FILE_SUFFIX}`;

    let lockId: string | undefined;

    const promise = withLock(
      statePath,
      'deploy',
      async () => {
        const lock = readLockFileForCommand(statePath);
        lockId = lock?.id;
        await new Promise((resolve) => setTimeout(resolve, 1000));
      },
      { timeout: 5000 },
    );

    await new Promise((resolve) => setTimeout(resolve, 100));

    if (lockId) {
      const { forceUnlockCommand: forceUnlockWithNoConfirm } =
        await import('../../../src/commands/forceUnlock');
      await forceUnlockWithNoConfirm(lockId);

      expect(fs.existsSync(lockPath)).toBe(true);
    }

    await promise.catch(() => {});
  });
});
