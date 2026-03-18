import crypto from 'node:crypto';
import os from 'node:os';
import { execSync } from 'node:child_process';
import { LockMetadata } from '../../types';
import { STALE_LOCK_THRESHOLD } from '../constants';

export const LOCK_KEY_SUFFIX = '.si-lock';

export const getUserEmail = (): string => {
  try {
    const email = execSync('git config user.email', {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore'],
    }).trim();
    if (email) return email;
  } catch {
    // noop
  }
  const username = os.userInfo().username || 'unknown';
  const hostname = os.hostname() || 'unknown';
  return `${username}@${hostname}`;
};

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const isLockStale = (lock: LockMetadata): boolean => {
  const acquiredAt = new Date(lock.acquiredAt).getTime();
  return Date.now() - acquiredAt > STALE_LOCK_THRESHOLD;
};

export const isProcessAlive = (pid: number): boolean => {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
};

export const createLockMetadata = (operation: string, lockPath: string): LockMetadata => ({
  id: crypto.randomBytes(16).toString('hex'),
  user: getUserEmail(),
  processId: process.pid,
  hostname: os.hostname(),
  operation,
  acquiredAt: new Date().toISOString(),
  path: lockPath,
});
