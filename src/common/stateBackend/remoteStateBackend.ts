import os from 'node:os';
import crypto from 'node:crypto';
import {
  StateFile,
  PersistedStateFile,
  LockOptions,
  LockMetadata,
  StateCorruptError,
  StateVersionError,
  StateScopeMismatchError,
  CURRENT_STATE_VERSION,
} from '../../types';
import { migrateState, toPersistedState, emptyScopedState } from '../stateManager';
import { normalizeScope, buildServiceObjectKey } from '../stateScope';
import {
  MANAGED_BY_REGIONAL,
  enforceMigrationMarker,
  MigrationMarkerAction,
} from '../migrationMarker';
import type { ProviderBinding } from '../regionalMigration';
import { claimProviderBinding } from '../providerBinding';
import { DEFAULT_LOCK_TIMEOUT, DEFAULT_LOCK_RETRY_DELAY } from '../constants';
import { LockError, formatLockInfo } from '../lockManager';
import { logger } from '../logger';
import { lang } from '../../lang';
import {
  StateBackend,
  StorageAdapter,
  StateSource,
  WriteReadiness,
  BackendCapabilities,
  ConditionalPutUnsupportedError,
} from './types';
import type { DeploymentScope } from '../stateScope';
import {
  LOCK_KEY_SUFFIX,
  sleep,
  isLockStale,
  isProcessAlive,
  createLockMetadata,
} from './lockUtils';

export type RemoteBackendConfig = {
  scope: DeploymentScope;
  /** Scoped V4 object key for the bound scope (storage location). */
  scopedKey: string;
  /** The configured (legacy/discovery) object key. Never written after the split. */
  legacyKey: string;
  /** Migration ownership marker behavior on load (decision D-4). Defaults to 'off'. */
  markerAction?: MigrationMarkerAction;
};

/**
 * Scope-bound BUCKET_STORE backend (issue #280): one V4 object per Stage/Region
 * at `<key>.scopes/<app>/<service>/<stage>/<region>/state.json`. The configured
 * key remains the legacy/discovery entry: read for read-only compatibility,
 * never written once scoped state exists.
 */
export const createRemoteStateBackend = (
  adapter: StorageAdapter,
  config: RemoteBackendConfig,
): StateBackend => {
  const normalized = normalizeScope(config.scope);
  const markerAction: MigrationMarkerAction = config.markerAction ?? 'off';
  const lockKey = `${config.scopedKey}${LOCK_KEY_SUFFIX}`;
  const capabilities: BackendCapabilities = {
    conditionalCreate: typeof adapter.putIfAbsent === 'function',
  };
  let lastSource: StateSource = 'empty';

  const readLockObject = async (): Promise<LockMetadata | null> => {
    return adapter.read<LockMetadata>(lockKey);
  };

  const writeLockObject = async (metadata: LockMetadata): Promise<boolean> => {
    if (!adapter.putIfAbsent) throw new Error(lang.__('STATE_ATOMIC_CREATE_REQUIRED'));
    try {
      return await adapter.putIfAbsent(lockKey, metadata);
    } catch (error) {
      if (error instanceof ConditionalPutUnsupportedError) {
        capabilities.conditionalCreate = false;
        throw new Error(lang.__('STATE_ATOMIC_CREATE_REQUIRED'), { cause: error });
      }
      throw error;
    }
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
        // Exclusive create when the storage supports it: concurrent acquirers
        // cannot both win. Verify the returned ownership before execution.
        const created = await writeLockObject(metadata);
        if (created) {
          const verify = await readLockObject();
          if (verify && verify.id === metadata.id) {
            return metadata;
          }
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

  const bindingKey = buildServiceObjectKey(config.legacyKey, normalized.app, normalized.service);

  const readProviderBinding = async (): Promise<ProviderBinding | null> => {
    return adapter.read<ProviderBinding>(bindingKey);
  };

  const readScopedDocument = async (): Promise<PersistedStateFile | null> => {
    const raw = await adapter.read<PersistedStateFile>(config.scopedKey);
    if (!raw) {
      return null;
    }
    // A scoped object that exists but does not match the bound scope/version is
    // foreign or malformed data — never served as the requested state.
    if (raw.version && raw.version !== CURRENT_STATE_VERSION) {
      throw new StateCorruptError(
        `bucket://${config.scopedKey}`,
        `unsupported state version ${raw.version}`,
      );
    }
    const stored = {
      provider: raw.provider,
      app: raw.app,
      service: raw.service,
      stage: raw.scope?.stage,
      region: raw.scope?.region,
    };
    const matches =
      stored.provider === normalized.provider &&
      stored.app === normalized.app &&
      stored.service === normalized.service &&
      !!raw.scope &&
      raw.scope.stage === normalized.stage &&
      (raw.scope.region ?? '').toLowerCase() === normalized.region;
    if (!matches) {
      throw new StateCorruptError(
        `bucket://${config.scopedKey}`,
        'state identity does not match the requested deployment scope',
      );
    }
    return raw;
  };

  return {
    scope: normalized,
    capabilities,

    loadState: async (): Promise<StateFile> => {
      const scoped = await readScopedDocument();
      if (scoped) {
        const stageResources = scoped.stages?.[normalized.stage]?.resources ?? {};
        const loaded = { ...scoped, resources: stageResources } as StateFile;
        enforceMigrationMarker(loaded, markerAction);
        lastSource = 'scoped';
        return loaded;
      }

      // Legacy/discovery entry: read-only compatibility until migration. A
      // post-split tombstone (versioned V4 + managedBy=regional) is treated as
      // absent — the scoped documents are authoritative and new regions start
      // fresh (issue #280).
      const legacyRaw = await adapter.read<StateFile>(config.legacyKey);
      if (legacyRaw && legacyRaw.managedBy === MANAGED_BY_REGIONAL) {
        lastSource = 'empty';
        return emptyScopedState(normalized);
      }
      if (legacyRaw) {
        let migrated: StateFile;
        try {
          migrated = migrateState(legacyRaw);
        } catch (error) {
          // Version/shape errors are already precise — never bury them in a
          // generic corruption error.
          if (error instanceof StateVersionError || error instanceof StateScopeMismatchError) {
            throw error;
          }
          throw new StateCorruptError(`bucket://${config.legacyKey}`, error);
        }
        const stageResources = migrated.stages?.[normalized.stage]?.resources ?? {};
        const hasStage =
          !!migrated.stages?.[normalized.stage] && Object.keys(stageResources).length > 0;
        lastSource = hasStage ? 'legacy' : 'empty';
        const loaded = { ...migrated, resources: stageResources };
        enforceMigrationMarker(loaded, markerAction);
        return loaded;
      }

      lastSource = 'empty';
      return emptyScopedState(normalized);
    },

    patchPersisted: async (patch: Record<string, unknown | undefined>): Promise<void> => {
      // Patch whichever persisted object backs the current state source.
      const targetKey = lastSource === 'scoped' ? config.scopedKey : config.legacyKey;
      const raw = await adapter.read<StateFile>(targetKey);
      const merged: Record<string, unknown> = raw ? { ...toPersistedState(raw) } : {};
      for (const [key, value] of Object.entries(patch)) {
        if (value === undefined) {
          delete merged[key];
        } else {
          merged[key] = value;
        }
      }
      await adapter.write(targetKey, merged);
    },

    saveState: async (state: StateFile): Promise<void> => {
      if (
        state.provider !== normalized.provider ||
        state.app !== normalized.app ||
        state.service !== normalized.service
      ) {
        throw new StateCorruptError(
          `bucket://${config.scopedKey}`,
          `state identity (${state.provider}/${state.app}/${state.service}) does not match the bound deployment scope (${normalized.provider}/${normalized.app}/${normalized.service})`,
        );
      }
      // Reserve immutable service identity before writing any regional state.
      await claimProviderBinding(adapter, bindingKey, normalized.provider);
      // Continue this scope document's lineage/serial across saves (independent
      // per Stage/Region document).
      const existing = await adapter.read<PersistedStateFile>(config.scopedKey);
      const persisted: PersistedStateFile = {
        ...toPersistedState(state),
        version: CURRENT_STATE_VERSION,
        provider: normalized.provider,
        app: normalized.app,
        service: normalized.service,
        scope: { stage: normalized.stage, region: normalized.region },
        lineage: existing?.lineage || state.lineage || crypto.randomUUID(),
        serial: (existing?.serial ?? 0) + 1,
        stages: {
          [normalized.stage]: {
            resources: state.resources,
            shared: state.stages?.[normalized.stage]?.shared ?? {},
          },
        },
      };
      await adapter.write(config.scopedKey, persisted);
      lastSource = 'scoped';
    },

    readStateSource: (): StateSource => lastSource,

    probeWriteReadiness: async (): Promise<WriteReadiness> => {
      const source = await detectSourceAsync();
      if (source === 'legacy') {
        return {
          ready: false,
          source,
          reason: lang.__('STATE_WRITE_BLOCKED_LEGACY_BUCKET', { objectKey: config.legacyKey }),
        };
      }
      // One provider per Service across ALL scopes (issue #280 §1).
      const binding = await readProviderBinding();
      if (binding && binding.provider !== normalized.provider) {
        return {
          ready: false,
          source,
          reason: lang.__('STATE_PROVIDER_BINDING_MISMATCH', {
            stored: binding.provider,
            requested: normalized.provider,
          }),
        };
      }
      await claimProviderBinding(adapter, bindingKey, normalized.provider);
      return { ready: true, source };
    },

    acquireLock: async (operation: string, options?: LockOptions): Promise<string> => {
      await claimProviderBinding(adapter, bindingKey, normalized.provider);
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
        throw new Error(lang.__('LOCK_ID_MISMATCH', { actualId: existing.id, providedId: lockId }));
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
      onLockAcquired?: (lockId: string) => void,
    ): Promise<T> => {
      let lockId: string | null = null;
      try {
        if (!operation.startsWith('migrate')) {
          await claimProviderBinding(adapter, bindingKey, normalized.provider);
        }
        const meta = await acquireLockObject(operation, options);
        lockId = meta.id;
        onLockAcquired?.(lockId);
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

  async function detectSourceAsync(): Promise<StateSource> {
    const scoped = await readScopedDocument();
    if (scoped) {
      return 'scoped';
    }
    const legacyRaw = await adapter.read<StateFile>(config.legacyKey);
    if (legacyRaw && legacyRaw.managedBy === MANAGED_BY_REGIONAL) {
      return 'empty';
    }
    if (legacyRaw) {
      const stageResources = legacyRaw.stages?.[normalized.stage]?.resources;
      return stageResources && Object.keys(stageResources).length > 0 ? 'legacy' : 'empty';
    }
    return 'empty';
  }
};
