import { AsyncLocalStorage } from 'node:async_hooks';
import os from 'node:os';

import { createAggregateStore } from '../aggregateStore';
import { normalizeScope } from '../stateScope';
import { DEFAULT_LOCK_TIMEOUT, DEFAULT_LOCK_RETRY_DELAY } from '../constants';
import { LockError, formatLockInfo } from '../lockManager';
import { logger } from '../logger';
import { lang } from '../../lang';
import {
  LOCK_KEY_SUFFIX,
  sleep,
  isLockStale,
  isProcessAlive,
  createLockMetadata,
} from './lockUtils';
import type { StateFile, LockOptions, LockMetadata } from '../../types';
import type { StateBackend, StorageAdapter, BackendCapabilities } from './types';
import type { DeploymentScope } from '../stateScope';
import type { MigrationMarkerAction } from '../migrationMarker';

export type RemoteBackendConfig = {
  scope: DeploymentScope;
  key: string;
  /** Migration ownership marker behavior on load (decision D-4). Defaults to 'off'. */
  markerAction?: MigrationMarkerAction;
};

export const createRemoteStateBackend = (
  adapter: StorageAdapter,
  config: RemoteBackendConfig,
): StateBackend => {
  const normalized = normalizeScope(config.scope);
  const lockKey = `${config.key}${LOCK_KEY_SUFFIX}`;
  const capabilities: BackendCapabilities = {
    conditionalCreate: false,
  };
  const store = createAggregateStore(adapter, normalized, {
    key: config.key,
    markerAction: config.markerAction ?? 'off',
    backupWrites: true,
  });
  const writer = new AsyncLocalStorage<boolean>();
  let manualLockId: string | null = null;

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
            lang.__('REGIONAL_LOCK_STALE', {
              info: formatLockInfo(existingLock),
              lockId: existingLock.id,
            }),
            existingLock,
          );
        }
        if (Date.now() - startTime >= timeout) {
          throw new LockError(
            lang.__('REGIONAL_LOCK_TIMEOUT', {
              seconds: String(timeout / 1000),
              info: formatLockInfo(existingLock),
            }),
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
      lang.__('REGIONAL_LOCK_FAILED', { path: adapter.lockPath }),
      existingLock || undefined,
    );
  };

  const releaseLock = async (lockId: string): Promise<void> => {
    const existing = await readLockObject();
    if (existing?.id === lockId) await adapter.delete(lockKey);
    if (manualLockId === lockId) {
      manualLockId = null;
      store.clearPlanBase();
    }
  };

  const withLock = async <T>(
    operation: string,
    fn: () => Promise<T>,
    options?: LockOptions,
    onLockAcquired?: (lockId: string) => void,
  ): Promise<T> => {
    const lock = await acquireLockObject(operation, options);
    try {
      return await writer.run(true, async () => {
        if (!operation.startsWith('migrate')) await store.verifyPlanBase();
        onLockAcquired?.(lock.id);
        return fn();
      });
    } finally {
      store.clearPlanBase();
      await releaseLock(lock.id);
    }
  };

  const mutate = async (operation: string, fn: () => Promise<void>): Promise<void> => {
    if (writer.getStore() || manualLockId) return fn();
    return withLock(operation, fn);
  };

  return {
    scope: normalized,
    capabilities,
    loadState: (): Promise<StateFile> => store.loadState(!writer.getStore() && !manualLockId),
    saveState: (state): Promise<void> => mutate('state-save', () => store.saveState(state)),
    patchPersisted: (patch): Promise<void> =>
      mutate('migrate-metadata', () => store.patchPersisted(patch)),
    upgradeLegacyState: (options) =>
      mutate('migrate-upgrade', () => store.upgradeLegacyState(options)),
    readStateSource: store.readStateSource,
    probeWriteReadiness: store.probeWriteReadiness,
    acquireLock: async (operation, options): Promise<string> => {
      const lock = await acquireLockObject(operation, options);
      try {
        if (!operation.startsWith('migrate')) await store.verifyPlanBase();
        manualLockId = lock.id;
        return lock.id;
      } catch (error) {
        await releaseLock(lock.id);
        throw error;
      }
    },
    releaseLock,
    forceUnlock: async (lockId): Promise<boolean> => {
      const existing = await readLockObject();
      if (!existing) return false;
      if (existing.id !== lockId) {
        throw new Error(lang.__('LOCK_ID_MISMATCH', { actualId: existing.id, providedId: lockId }));
      }
      await releaseLock(lockId);
      return true;
    },
    readLock: readLockObject,
    withLock,
  };
};
