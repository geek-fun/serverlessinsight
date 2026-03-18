import os from 'node:os';
import { StateFile, LockOptions, LockMetadata, CURRENT_STATE_VERSION } from '../../types';
import { DEFAULT_LOCK_TIMEOUT, DEFAULT_LOCK_RETRY_DELAY } from '../constants';
import { LockError, formatLockInfo } from '../lockManager';
import { logger } from '../logger';
import { lang } from '../../lang';
import { StateBackend, StorageAdapter } from './types';
import {
  LOCK_KEY_SUFFIX,
  sleep,
  isLockStale,
  isProcessAlive,
  createLockMetadata,
} from './lockUtils';

export type RemoteBackendConfig = {
  key: string;
};

export const createRemoteStateBackend = (
  adapter: StorageAdapter,
  config: RemoteBackendConfig,
): StateBackend => {
  const lockKey = `${config.key}${LOCK_KEY_SUFFIX}`;

  const readLockObject = async (): Promise<LockMetadata | null> => {
    return adapter.read<LockMetadata>(lockKey);
  };

  const acquireLockObject = async (
    operation: string,
    options: LockOptions = {},
  ): Promise<LockMetadata> => {
    const timeout = options.timeout ?? DEFAULT_LOCK_TIMEOUT;
    const retryDelay = options.retryDelay ?? DEFAULT_LOCK_RETRY_DELAY;
    const maxRetries = options.maxRetries ?? Math.ceil(timeout / retryDelay);

    const metadata = createLockMetadata(operation, adapter.lockPath);

    const startTime = Date.now();
    let attempt = 0;

    while (attempt <= maxRetries) {
      const existingLock = await readLockObject();

      if (!existingLock) {
        await adapter.write(lockKey, metadata);
        const verify = await readLockObject();
        if (verify && verify.id === metadata.id) {
          return metadata;
        }
      } else {
        if (existingLock.hostname === os.hostname() && !isProcessAlive(existingLock.processId)) {
          logger.info(
            lang.__('LOCK_AUTO_RELEASED_DEAD_PROCESS', {
              processId: String(existingLock.processId),
              hostname: existingLock.hostname,
              user: existingLock.user,
              acquiredAt: existingLock.acquiredAt,
            }),
          );
          await adapter.delete(lockKey);
          attempt++;
          continue;
        }

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
        const acquiredAt = new Date(existingLock.acquiredAt);
        const minutesAgo = Math.floor((Date.now() - acquiredAt.getTime()) / 60000);
        const timeAgo =
          minutesAgo < 1 ? lang.__('LOCK_TIME_AGO_LESS_THAN_MINUTE') : `${minutesAgo}m`;
        logger.info(
          lang.__('LOCK_WAITING', {
            user: existingLock.user,
            timeAgo,
            attempt: String(attempt + 1),
          }),
        );
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
    loadState: async (
      provider: string,
      app: string,
      service: string,
      stage: string,
    ): Promise<StateFile> => {
      const state = await adapter.read<StateFile>(config.key);
      if (state) {
        const stageResources = state.stages?.[stage]?.resources ?? {};
        return { ...state, resources: stageResources };
      }
      return { version: CURRENT_STATE_VERSION, provider, app, service, stages: {}, resources: {} };
    },

    saveState: async (
      state: StateFile,
      app: string,
      service: string,
      stage: string,
    ): Promise<void> => {
      let existing: StateFile = {
        version: CURRENT_STATE_VERSION,
        provider: state.provider,
        app,
        service,
        stages: {},
        resources: {},
      };
      try {
        const raw = await adapter.read<StateFile>(config.key);
        if (raw) existing = raw;
      } catch {
        // noop
      }
      const stateToSave: StateFile = {
        ...existing,
        version: CURRENT_STATE_VERSION,
        app,
        service,
        provider: state.provider,
        stages: {
          ...existing.stages,
          [stage]: { resources: state.resources },
        },
        resources: state.resources,
      };
      await adapter.write(config.key, stateToSave);
    },

    acquireLock: async (operation: string, options?: LockOptions): Promise<string> => {
      const meta = await acquireLockObject(operation, options);
      return meta.id;
    },

    releaseLock: async (lockId: string): Promise<void> => {
      const existing = await readLockObject();
      if (existing && existing.id === lockId) {
        await adapter.delete(lockKey);
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
      await adapter.delete(lockKey);
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
            await adapter.delete(lockKey);
          }
        }
      }
    },
  };
};
