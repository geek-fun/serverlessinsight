import OSS from 'ali-oss';
import crypto from 'node:crypto';
import os from 'node:os';
import { execSync } from 'node:child_process';
import { StateFile, LockOptions, LockMetadata, CURRENT_STATE_VERSION } from '../../types';
import { DEFAULT_LOCK_TIMEOUT, DEFAULT_LOCK_RETRY_DELAY, STALE_LOCK_THRESHOLD } from '../constants';
import { LockError, formatLockInfo } from '../lockManager';
import { StateBackend } from './types';

type OssBackendConfig = {
  bucket: string;
  key: string;
  region: string;
  accessKeyId: string;
  accessKeySecret: string;
  securityToken?: string;
};

const LOCK_KEY_SUFFIX = '.si-lock';

const getUserEmail = (): string => {
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

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const isLockStale = (lock: LockMetadata): boolean => {
  const acquiredAt = new Date(lock.acquiredAt).getTime();
  return Date.now() - acquiredAt > STALE_LOCK_THRESHOLD;
};

export const createOssStateBackend = (config: OssBackendConfig): StateBackend => {
  const ossClient = new OSS({
    accessKeyId: config.accessKeyId,
    accessKeySecret: config.accessKeySecret,
    region: `oss-${config.region}`,
    bucket: config.bucket,
    stsToken: config.securityToken,
  });

  const lockKey = `${config.key}${LOCK_KEY_SUFFIX}`;

  const readObject = async <T>(key: string): Promise<T | null> => {
    try {
      const result = await ossClient.get(key);
      const content = result.content.toString('utf-8');
      return JSON.parse(content) as T;
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'code' in err) {
        const code = (err as { code: string }).code;
        if (code === 'NoSuchKey' || code === 'NoSuchBucket') {
          return null;
        }
      }
      throw err;
    }
  };

  const writeObject = async (key: string, data: unknown): Promise<void> => {
    const content = JSON.stringify(data, null, 2);
    await ossClient.put(key, Buffer.from(content, 'utf-8'));
  };

  const deleteObject = async (key: string): Promise<void> => {
    try {
      await ossClient.delete(key);
    } catch {
      // noop
    }
  };

  const readLockObject = async (): Promise<LockMetadata | null> => {
    return readObject<LockMetadata>(lockKey);
  };

  const acquireLockObject = async (
    operation: string,
    options: LockOptions = {},
  ): Promise<LockMetadata> => {
    const timeout = options.timeout ?? DEFAULT_LOCK_TIMEOUT;
    const retryDelay = options.retryDelay ?? DEFAULT_LOCK_RETRY_DELAY;
    const maxRetries = options.maxRetries ?? Math.ceil(timeout / retryDelay);

    const metadata: LockMetadata = {
      id: crypto.randomBytes(16).toString('hex'),
      user: getUserEmail(),
      processId: process.pid,
      hostname: os.hostname(),
      operation,
      acquiredAt: new Date().toISOString(),
      path: `oss://${config.bucket}/${config.key}`,
    };

    const startTime = Date.now();
    let attempt = 0;

    while (attempt <= maxRetries) {
      const existingLock = await readLockObject();

      if (!existingLock) {
        await writeObject(lockKey, metadata);
        const verify = await readLockObject();
        if (verify && verify.id === metadata.id) {
          return metadata;
        }
      } else {
        if (isLockStale(existingLock)) {
          throw new LockError(
            `State is currently locked (stale lock detected).\n${formatLockInfo(existingLock)}\nThis lock appears to be stale. If you are certain no other operation is running, use:\n  si force-unlock ${existingLock.id}`,
            existingLock,
          );
        }
        if (Date.now() - startTime >= timeout) {
          throw new LockError(
            `Failed to acquire lock after ${timeout / 1000} seconds.\n${formatLockInfo(existingLock)}\nIf you are certain no other operation is running, use:\n  si force-unlock ${existingLock.id}`,
            existingLock,
          );
        }
      }

      const delay = Math.min(retryDelay * Math.pow(2, attempt), 30000);
      await sleep(delay);
      attempt++;
    }

    const existingLock = await readLockObject();
    throw new LockError(
      `Failed to acquire lock.\n${existingLock ? formatLockInfo(existingLock) : ''}\nIf you are certain no other operation is running, use:\n  si force-unlock ${existingLock?.id || 'unknown'}`,
      existingLock || undefined,
    );
  };

  return {
    loadState: async (provider: string): Promise<StateFile> => {
      const state = await readObject<StateFile>(config.key);
      if (state) return state;
      return { version: CURRENT_STATE_VERSION, provider, resources: {} };
    },

    saveState: async (state: StateFile): Promise<void> => {
      const stateToSave: StateFile = { ...state, version: CURRENT_STATE_VERSION };
      await writeObject(config.key, stateToSave);
    },

    acquireLock: async (operation: string, options?: LockOptions): Promise<string> => {
      const meta = await acquireLockObject(operation, options);
      return meta.id;
    },

    releaseLock: async (lockId: string): Promise<void> => {
      const existing = await readLockObject();
      if (existing && existing.id === lockId) {
        await deleteObject(lockKey);
      }
    },

    forceUnlock: async (lockId: string): Promise<boolean> => {
      const existing = await readLockObject();
      if (!existing) return false;
      if (existing.id !== lockId) {
        throw new Error(
          `Lock ID mismatch. Current lock ID is ${existing.id}, but you provided ${lockId}`,
        );
      }
      await deleteObject(lockKey);
      return true;
    },

    readLock: async (): Promise<LockMetadata | null> => {
      return readLockObject();
    },

    withLock: async <T>(
      operation: string,
      fn: () => Promise<T>,
      options?: LockOptions,
    ): Promise<T> => {
      let lockId: string | null = null;
      try {
        const meta = await acquireLockObject(operation, options);
        lockId = meta.id;
        return await fn();
      } finally {
        if (lockId) {
          const existing = await readLockObject();
          if (existing && existing.id === lockId) {
            await deleteObject(lockKey);
          }
        }
      }
    },
  };
};
