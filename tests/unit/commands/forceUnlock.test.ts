jest.mock('node:fs', () =>
  jest.requireActual('../../autils/memoryFileSystem').createMemoryFileSystem(),
);
jest.mock('node:child_process', () => ({ execSync: jest.fn(() => 'test@example.com') }));
jest.mock('../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));
jest.mock('../../../src/common', () => ({
  calcValue: (value: string) => value,
  formatLockInfo: jest.requireActual('../../../src/common/lockManager').formatLockInfo,
  logger: jest.requireMock('../../../src/common/logger').logger,
  getIacLocation: (location: string) => location,
  setContext: jest.fn(),
  getContext: () => ({
    provider: 'aliyun',
    region: 'cn-hongkong',
    stage: 'default',
    accessKeyId: 'test',
    accessKeySecret: 'test',
  }),
}));

import { forceUnlockCommand } from '../../../src/commands/forceUnlock';
import { withLock, readLockFileForCommand } from '../../../src/common/lockManager';
import { getStatePath } from '../../../src/common/stateManager';
import { LOCK_FILE_SUFFIX } from '../../../src/common/constants';
import fs from 'node:fs';
import readline from 'node:readline';
import path from 'node:path';

const mockCreateStateBackend = jest.fn();

jest.mock('../../../src/common/stateBackend', () => ({
  createStateBackend: (...args: unknown[]) => mockCreateStateBackend(...args),
}));

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
  let cwdSpy: jest.SpyInstance;

  beforeEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });
    cwdSpy = jest.spyOn(process, 'cwd').mockReturnValue(testDir);
  });

  afterEach(() => {
    cwdSpy.mockRestore();
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

  it('should find a scoped lock file nested under .serverlessinsight/states recursively', async () => {
    const scopedStatePath = path.join(
      testDir,
      '.serverlessinsight',
      'states',
      'myapp',
      'myservice_prod_cn-hangzhou_state.json',
    );
    const nestedLockPath = `${scopedStatePath}${LOCK_FILE_SUFFIX}`;
    fs.mkdirSync(path.dirname(nestedLockPath), { recursive: true });
    fs.writeFileSync(
      nestedLockPath,
      JSON.stringify({
        id: 'nested-lock-id',
        user: 'nested@example.com',
        processId: process.pid,
        hostname: 'nested-host',
        operation: 'deploy',
        acquiredAt: new Date().toISOString(),
        path: scopedStatePath,
      }),
      'utf-8',
    );

    await forceUnlockCommand('nested-lock-id');

    expect(fs.existsSync(nestedLockPath)).toBe(false);
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
    (readline.createInterface as jest.Mock).mockReturnValueOnce({
      question: (_question: string, callback: (answer: string) => void) => callback('no'),
      close: jest.fn(),
    });

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
      await forceUnlockCommand(lockId);

      expect(fs.existsSync(lockPath)).toBe(true);
    }

    await promise.catch(() => {});
  });

  it('should print a web-console hint instead of unlocking when SaaS backend (no backend config in yml)', async () => {
    const loggerInfo = jest.spyOn(console, 'log').mockImplementation(() => {});
    const ymlPath = path.join(testDir, 'saas.yml');
    fs.writeFileSync(
      ymlPath,
      [
        'version: 0.1.0',
        'provider:',
        '  name: aliyun',
        '  region: cn-hongkong',
        'app: test-app',
        'service: test-service',
      ].join('\n'),
    );

    await forceUnlockCommand('any-lock-id', { location: ymlPath });

    loggerInfo.mockRestore();
  });

  it('should throw when a configured backend has no lock', async () => {
    mockCreateStateBackend.mockReturnValue({
      readLock: jest.fn().mockResolvedValue(null),
    });

    const ymlPath = path.join(testDir, 'local.yml');
    fs.writeFileSync(
      ymlPath,
      [
        'version: 0.1.0',
        'provider:',
        '  name: aliyun',
        '  region: cn-hongkong',
        'app: test-app',
        'service: test-service',
        'backend:',
        '  state_manager:',
        '    type: LOCAL',
      ].join('\n'),
    );

    await expect(forceUnlockCommand('missing-lock', { location: ymlPath })).rejects.toThrow(
      'No lock found',
    );
    expect(mockCreateStateBackend).toHaveBeenCalled();
  });

  it('should throw when the configured backend cannot release the lock', async () => {
    const lock = {
      id: 'lock-id',
      user: 'test@example.com',
      processId: 123,
      hostname: 'test-host',
      operation: 'deploy',
      acquiredAt: new Date().toISOString(),
      path: '/test/path',
    };
    mockCreateStateBackend.mockReturnValue({
      readLock: jest.fn().mockResolvedValue(lock),
      forceUnlock: jest.fn().mockResolvedValue(false),
    });

    const ymlPath = path.join(testDir, 'local.yml');
    fs.writeFileSync(
      ymlPath,
      [
        'version: 0.1.0',
        'provider:',
        '  name: aliyun',
        '  region: cn-hongkong',
        'app: test-app',
        'service: test-service',
        'backend:',
        '  state_manager:',
        '    type: LOCAL',
      ].join('\n'),
    );

    await expect(forceUnlockCommand('lock-id', { location: ymlPath })).rejects.toThrow(
      'Failed to release lock',
    );
  });
});
