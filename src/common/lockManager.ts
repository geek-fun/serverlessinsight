import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { execSync } from 'node:child_process';
import { LockMetadata, LockOptions } from '../types';
import {
  LOCK_FILE_SUFFIX,
  DEFAULT_LOCK_TIMEOUT,
  DEFAULT_LOCK_RETRY_DELAY,
  STALE_LOCK_THRESHOLD,
} from './constants';
import { lang } from '../lang';

export { LockOptions }; // Re-export for convenience

export class LockError extends Error {
  constructor(
    message: string,
    public lockInfo?: LockMetadata,
  ) {
    super(message);
    this.name = 'LockError';
  }
}

export const getLockPath = (statePath: string): string => {
  return `${statePath}${LOCK_FILE_SUFFIX}`;
};

export const generateLockId = (): string => {
  return crypto.randomBytes(16).toString('hex');
};

const getUserEmail = (): string => {
  // Try to get git user email first
  try {
    const email = execSync('git config user.email', {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore'],
    }).trim();
    if (email) return email;
  } catch {
    // Ignore errors
  }

  // Fallback to username@hostname
  const username = os.userInfo().username || 'unknown';
  const hostname = os.hostname() || 'unknown';
  return `${username}@${hostname}`;
};

const createLockMetadata = (statePath: string, operation: string): LockMetadata => {
  return {
    id: generateLockId(),
    user: getUserEmail(),
    processId: process.pid,
    hostname: os.hostname(),
    operation,
    acquiredAt: new Date().toISOString(),
    path: statePath,
  };
};

const readLockFile = (lockPath: string): LockMetadata | null => {
  try {
    if (fs.existsSync(lockPath)) {
      const content = fs.readFileSync(lockPath, 'utf-8');
      return JSON.parse(content) as LockMetadata;
    }
  } catch {
    // If we can't read the lock file, treat it as if it doesn't exist
  }
  return null;
};

const writeLockFile = (lockPath: string, metadata: LockMetadata): void => {
  const lockDir = path.dirname(lockPath);
  if (!fs.existsSync(lockDir)) {
    fs.mkdirSync(lockDir, { recursive: true });
  }
  fs.writeFileSync(lockPath, JSON.stringify(metadata, null, 2), 'utf-8');
};

const removeLockFile = (lockPath: string): void => {
  if (fs.existsSync(lockPath)) {
    fs.unlinkSync(lockPath);
  }
};

const isLockStale = (lock: LockMetadata): boolean => {
  const acquiredAt = new Date(lock.acquiredAt).getTime();
  const now = Date.now();
  return now - acquiredAt > STALE_LOCK_THRESHOLD;
};

const getTimeAgo = (acquiredAt: Date): string => {
  const now = new Date();
  const minutesAgo = Math.floor((now.getTime() - acquiredAt.getTime()) / 60000);

  if (minutesAgo < 1) {
    return lang.__('LOCK_TIME_AGO_LESS_THAN_MINUTE');
  } else if (minutesAgo === 1) {
    return lang.__('LOCK_TIME_AGO_ONE_MINUTE');
  } else if (minutesAgo < 60) {
    return lang.__('LOCK_TIME_AGO_MINUTES', { minutes: String(minutesAgo) });
  } else {
    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo === 1) {
      return lang.__('LOCK_TIME_AGO_ONE_HOUR');
    } else {
      return lang.__('LOCK_TIME_AGO_HOURS', { hours: String(hoursAgo) });
    }
  }
};

export const formatLockInfo = (lock: LockMetadata): string => {
  const acquiredAt = new Date(lock.acquiredAt);
  const timeAgo = getTimeAgo(acquiredAt);

  return `
${lang.__('LOCK_INFO_HEADER')}
${lang.__('LOCK_INFO_ID', { id: lock.id })}
${lang.__('LOCK_INFO_HELD_BY', { user: lock.user })}
${lang.__('LOCK_INFO_PROCESS', { operation: lock.operation, processId: String(lock.processId) })}
${lang.__('LOCK_INFO_HOST', { hostname: lock.hostname })}
${lang.__('LOCK_INFO_ACQUIRED', { acquiredAt: acquiredAt.toISOString(), timeAgo })}
${lang.__('LOCK_INFO_OPERATION', { operation: lock.operation })}
`;
};

const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const acquireLockInternal = async (
  statePath: string,
  operation: string,
  options: LockOptions = {},
): Promise<LockMetadata> => {
  const timeout = options.timeout ?? DEFAULT_LOCK_TIMEOUT;
  const retryDelay = options.retryDelay ?? DEFAULT_LOCK_RETRY_DELAY;
  const maxRetries = options.maxRetries ?? Math.ceil(timeout / retryDelay);

  const lockPath = getLockPath(statePath);
  const metadata = createLockMetadata(statePath, operation);

  const startTime = Date.now();
  let attempt = 0;

  while (attempt <= maxRetries) {
    // Check if lock file exists
    const existingLock = readLockFile(lockPath);

    if (!existingLock) {
      // No lock exists, try to acquire
      try {
        writeLockFile(lockPath, metadata);
        // Verify we got the lock by reading it back
        const verifyLock = readLockFile(lockPath);
        if (verifyLock && verifyLock.id === metadata.id) {
          return metadata;
        }
      } catch {
        // Failed to write lock, will retry
      }
    } else {
      // Lock exists, check if it's stale
      if (isLockStale(existingLock)) {
        // Lock is stale, but we don't auto-remove it
        // User must use force-unlock
        throw new LockError(
          `State is currently locked (stale lock detected).\n${formatLockInfo(existingLock)}\nThis lock appears to be stale. If you are certain no other operation is running, use:\n  si force-unlock ${existingLock.id}`,
          existingLock,
        );
      }

      // Check if timeout exceeded
      if (Date.now() - startTime >= timeout) {
        throw new LockError(
          `Failed to acquire lock after ${timeout / 1000} seconds.\n${formatLockInfo(existingLock)}\nIf you are certain no other operation is running, use:\n  si force-unlock ${existingLock.id}`,
          existingLock,
        );
      }
    }

    // Wait before retrying with exponential backoff
    const delay = Math.min(retryDelay * Math.pow(2, attempt), 30000); // Cap at 30 seconds
    await sleep(delay);
    attempt++;
  }

  // This shouldn't be reached, but just in case
  const existingLock = readLockFile(lockPath);
  throw new LockError(
    `Failed to acquire lock.\n${existingLock ? formatLockInfo(existingLock) : ''}\nIf you are certain no other operation is running, use:\n  si force-unlock ${existingLock?.id || 'unknown'}`,
    existingLock || undefined,
  );
};

export const releaseLockInternal = (statePath: string, lockId: string): void => {
  const lockPath = getLockPath(statePath);
  const existingLock = readLockFile(lockPath);

  // Only release if the lock ID matches
  if (existingLock && existingLock.id === lockId) {
    removeLockFile(lockPath);
  }
};

export const forceUnlock = (statePath: string, lockId: string): boolean => {
  const lockPath = getLockPath(statePath);
  const existingLock = readLockFile(lockPath);

  if (!existingLock) {
    return false; // No lock to remove
  }

  if (existingLock.id !== lockId) {
    throw new Error(
      `Lock ID mismatch. Current lock ID is ${existingLock.id}, but you provided ${lockId}`,
    );
  }

  removeLockFile(lockPath);
  return true;
};

export const withLock = async <T>(
  statePath: string,
  operation: string,
  fn: () => Promise<T>,
  options?: LockOptions,
): Promise<T> => {
  let lock: LockMetadata | null = null;
  try {
    lock = await acquireLockInternal(statePath, operation, options);
    return await fn();
  } finally {
    if (lock) {
      releaseLockInternal(statePath, lock.id);
    }
  }
};

// Export only for forceUnlock command which needs to read lock info
export const readLockFileForCommand = (statePath: string): LockMetadata | null => {
  const lockPath = getLockPath(statePath);
  return readLockFile(lockPath);
};
