import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { LockMetadata, LockOptions } from '../types';

export { LockOptions }; // Re-export for convenience

const LOCK_FILE_SUFFIX = '.si-lock';
const DEFAULT_TIMEOUT = 10 * 60 * 1000; // 10 minutes
const DEFAULT_RETRY_DELAY = 2000; // 2 seconds
const STALE_LOCK_THRESHOLD = 60 * 60 * 1000; // 1 hour

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
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { execSync } = require('child_process');
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

export const createLockMetadata = (statePath: string, operation: string): LockMetadata => {
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

export const readLockFile = (lockPath: string): LockMetadata | null => {
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

export const writeLockFile = (lockPath: string, metadata: LockMetadata): void => {
  const lockDir = path.dirname(lockPath);
  if (!fs.existsSync(lockDir)) {
    fs.mkdirSync(lockDir, { recursive: true });
  }
  fs.writeFileSync(lockPath, JSON.stringify(metadata, null, 2), 'utf-8');
};

export const removeLockFile = (lockPath: string): void => {
  if (fs.existsSync(lockPath)) {
    fs.unlinkSync(lockPath);
  }
};

export const isLockStale = (lock: LockMetadata): boolean => {
  const acquiredAt = new Date(lock.acquiredAt).getTime();
  const now = Date.now();
  return now - acquiredAt > STALE_LOCK_THRESHOLD;
};

export const formatLockInfo = (lock: LockMetadata): string => {
  const acquiredAt = new Date(lock.acquiredAt);
  const now = new Date();
  const minutesAgo = Math.floor((now.getTime() - acquiredAt.getTime()) / 60000);

  let timeAgo: string;
  if (minutesAgo < 1) {
    timeAgo = 'less than a minute ago';
  } else if (minutesAgo === 1) {
    timeAgo = '1 minute ago';
  } else if (minutesAgo < 60) {
    timeAgo = `${minutesAgo} minutes ago`;
  } else {
    const hoursAgo = Math.floor(minutesAgo / 60);
    timeAgo = hoursAgo === 1 ? '1 hour ago' : `${hoursAgo} hours ago`;
  }

  return `
Lock Info:
  ID:        ${lock.id}
  Held by:   ${lock.user}
  Process:   si ${lock.operation} (PID ${lock.processId})
  Host:      ${lock.hostname}
  Acquired:  ${acquiredAt.toISOString()} (${timeAgo})
  Operation: ${lock.operation}
`;
};

const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const acquireLock = async (
  statePath: string,
  operation: string,
  options: LockOptions = {},
): Promise<LockMetadata> => {
  const timeout = options.timeout ?? DEFAULT_TIMEOUT;
  const retryDelay = options.retryDelay ?? DEFAULT_RETRY_DELAY;
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

export const releaseLock = (statePath: string, lockId: string): void => {
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
    lock = await acquireLock(statePath, operation, options);
    return await fn();
  } finally {
    if (lock) {
      releaseLock(statePath, lock.id);
    }
  }
};
