import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {
  ResourceState,
  StateFile,
  PersistedStateFile,
  StateCorruptError,
  StateVersionError,
  CURRENT_STATE_VERSION,
} from '../types';
import { withLock, LockOptions } from './lockManager';
import { logger } from './logger';

const STATE_DIR = '.serverlessinsight';

/* istanbul ignore next */
export const getStatePath = (
  app: string,
  service: string,
  baseDir: string = process.cwd(),
): string => {
  return path.join(baseDir, STATE_DIR, `state-${app}-${service}.json`);
};

/* istanbul ignore next */
export const ensureStateDir = (baseDir: string = process.cwd()): void => {
  const stateDir = path.join(baseDir, STATE_DIR);
  if (!fs.existsSync(stateDir)) {
    fs.mkdirSync(stateDir, { recursive: true });
  }
};

/**
 * A state migration transforms a state file written by `fromVersion` into a
 * newer format. The migration itself must stamp the resulting state with the
 * next `version` so the chain can advance toward CURRENT_STATE_VERSION.
 */
export type StateMigration = (state: Record<string, unknown>) => Record<string, unknown>;

const STATE_MIGRATIONS: Array<{ fromVersion: string; migrate: StateMigration }> = [];

/**
 * Register a migration from `fromVersion` to a newer format. Applied in
 * registration order during `loadState`; empty today because CURRENT_STATE_VERSION
 * ('3.0') is the only format this CLI writes so far.
 */
export const registerStateMigration = (fromVersion: string, migrate: StateMigration): void => {
  STATE_MIGRATIONS.push({ fromVersion, migrate });
};

/** Drop all registered migrations (test/cleanup helper). */
export const clearStateMigrations = (): void => {
  STATE_MIGRATIONS.length = 0;
};

/**
 * Parse a state version string ("3.0", "1.0.0") into a comparable number.
 * Versions are treated as legacy-format (major.minor[.patch]); a missing
 * minor/patch defaults to 0. Non-numeric segments are ignored.
 */
const parseStateVersion = (version: string): number => {
  const [major, minor] = version.split('.').map((part) => parseInt(part, 10));
  return (isNaN(major) ? 0 : major) * 1000 + (isNaN(minor) ? 0 : minor);
};

/**
 * Apply registered migrations to bring `raw` up to CURRENT_STATE_VERSION, then
 * guard against versions that cannot reach it. A state written by a NEWER CLI
 * must not be silently read (downgraded) — that risks data loss — so it is
 * rejected instead. Older/legacy versions without a registered migration load
 * as-is (they predate the migration registry).
 */
export const migrateState = (raw: StateFile): StateFile => {
  if (!raw.version) {
    logger.debug(
      { stateVersion: raw.version },
      'state file has no version field; treating as legacy',
    );
    return raw;
  }
  if (raw.version === CURRENT_STATE_VERSION) {
    return raw;
  }

  let migrated: Record<string, unknown> = raw as unknown as Record<string, unknown>;
  let hops = 0;
  while (migrated.version !== CURRENT_STATE_VERSION && hops < STATE_MIGRATIONS.length) {
    const entry = STATE_MIGRATIONS.find((m) => m.fromVersion === migrated.version);
    if (!entry) {
      break;
    }
    migrated = entry.migrate(migrated);
    hops++;
  }

  const migratedVersion = String(migrated.version ?? '');
  if (migratedVersion && migratedVersion !== CURRENT_STATE_VERSION) {
    // A registered migration ran but did not land on CURRENT — refuse rather
    // than persist a half-migrated state.
    if (hops > 0) {
      throw new StateVersionError(migratedVersion, CURRENT_STATE_VERSION);
    }
    // No migration was applicable. Only reject versions NEWER than CURRENT
    // (written by a newer CLI, or an unknown future format). Older legacy
    // versions load as-is.
    if (parseStateVersion(migratedVersion) > parseStateVersion(CURRENT_STATE_VERSION)) {
      throw new StateVersionError(migratedVersion, CURRENT_STATE_VERSION);
    }
  }
  return migrated as unknown as StateFile;
};

/** Strip the runtime-only `resources` projection — `stages` is the authoritative store (issue #225). */
export const toPersistedState = (state: StateFile): PersistedStateFile => {
  const { resources: _projection, ...persisted } = state;
  return persisted;
};

/**
 * Load state file, scoped to the given stage.
 * The returned StateFile has `resources` populated from `stages[stage].resources`.
 * A corrupt primary is recovered from `statePath + '.backup'`; if both are corrupt,
 * StateCorruptError is thrown instead of silently returning empty state.
 * Registered version migrations are applied on load; a state version that cannot
 * be migrated to CURRENT_STATE_VERSION throws StateVersionError.
 */
export const loadState = (
  provider: string,
  app: string,
  service: string,
  stage: string,
  baseDir: string = process.cwd(),
): StateFile => {
  const statePath = getStatePath(app, service, baseDir);

  if (!fs.existsSync(statePath)) {
    return { version: CURRENT_STATE_VERSION, provider, app, service, stages: {}, resources: {} };
  }

  const readBackup = (): StateFile | null => {
    const backupPath = `${statePath}.backup`;
    if (!fs.existsSync(backupPath)) {
      return null;
    }
    try {
      const content = fs.readFileSync(backupPath, 'utf-8');
      return JSON.parse(content) as StateFile;
    } catch {
      return null;
    }
  };

  const hydrate = (raw: StateFile): StateFile => {
    const migrated = migrateState(raw);
    const stageResources = migrated.stages?.[stage]?.resources ?? {};
    return { ...migrated, resources: stageResources };
  };

  try {
    const content = fs.readFileSync(statePath, 'utf-8');
    return hydrate(JSON.parse(content) as StateFile);
  } catch (error) {
    if (error instanceof StateVersionError) {
      throw error;
    }
    const backup = readBackup();
    if (backup) {
      return hydrate(backup);
    }
    throw new StateCorruptError(statePath, error);
  }
};

/* istanbul ignore next */
export const saveState = (
  state: StateFile,
  app: string,
  service: string,
  stage: string,
  baseDir: string = process.cwd(),
): void => {
  ensureStateDir(baseDir);
  const statePath = getStatePath(app, service, baseDir);
  const tmpPath = `${statePath}.tmp`;
  const backupPath = `${statePath}.backup`;

  // Read the existing file to preserve other stages
  let existing: PersistedStateFile = {
    version: CURRENT_STATE_VERSION,
    provider: state.provider,
    app,
    service,
    stages: {},
  };
  try {
    if (fs.existsSync(statePath)) {
      const content = fs.readFileSync(statePath, 'utf-8');
      existing = toPersistedState(JSON.parse(content) as StateFile);
    }
  } catch {
    // use default
  }

  // Write updated stage resources, preserve all other stages
  const stateToSave: PersistedStateFile = {
    ...existing,
    version: CURRENT_STATE_VERSION,
    lineage: existing.lineage || crypto.randomUUID(),
    serial: (existing.serial ?? 0) + 1,
    app,
    service,
    provider: state.provider,
    stages: {
      ...existing.stages,
      [stage]: {
        resources: state.resources,
        shared: state.stages?.[stage]?.shared ?? existing.stages?.[stage]?.shared ?? {},
      },
    },
  };

  // Atomic write: back up the previous state, then write tmp + fsync + rename
  try {
    if (fs.existsSync(statePath)) {
      fs.copyFileSync(statePath, backupPath);
    }
    const fd = fs.openSync(tmpPath, 'w');
    try {
      fs.writeFileSync(fd, JSON.stringify(stateToSave, null, 2), 'utf-8');
      fs.fsyncSync(fd);
    } finally {
      fs.closeSync(fd);
    }
    fs.renameSync(tmpPath, statePath);
  } catch (error) {
    try {
      if (fs.existsSync(tmpPath)) {
        fs.rmSync(tmpPath);
      }
    } catch {
      // ignore cleanup failure
    }
    throw error;
  }
};

/**
 * Save state with automatic locking.
 * This should be used by high-level operations like deploy/destroy.
 */
/* istanbul ignore next */
export const saveStateWithLock = async (
  state: StateFile,
  app: string,
  service: string,
  stage: string,
  operation: string,
  baseDir: string = process.cwd(),
  options?: LockOptions,
): Promise<void> => {
  const statePath = getStatePath(app, service, baseDir);
  await withLock(
    statePath,
    operation,
    async () => {
      saveState(state, app, service, stage, baseDir);
    },
    options,
  );
};

/* istanbul ignore next */
export const getResource = (state: StateFile, resourceId: string): ResourceState | undefined => {
  return state.resources[resourceId];
};

/* istanbul ignore next */
export const setResource = (
  state: StateFile,
  resourceId: string,
  resourceState: ResourceState,
): StateFile => {
  return {
    ...state,
    resources: {
      ...state.resources,
      [resourceId]: resourceState,
    },
  };
};

/* istanbul ignore next */
export const removeResource = (state: StateFile, resourceId: string): StateFile => {
  const { [resourceId]: _, ...remainingResources } = state.resources;
  return {
    ...state,
    resources: remainingResources,
  };
};

/* istanbul ignore next */
export const getAllResources = (state: StateFile): Record<string, ResourceState> => {
  return state.resources;
};

/* istanbul ignore next */
export const getAllSharedResources = (
  state: StateFile,
  stage: string,
): Record<string, ResourceState> => {
  return state.stages?.[stage]?.shared ?? {};
};

/* istanbul ignore next */
export const getSharedResource = (
  state: StateFile,
  stage: string,
  key: string,
): ResourceState | undefined => {
  return state.stages?.[stage]?.shared?.[key];
};

/* istanbul ignore next */
export const setSharedResource = (
  state: StateFile,
  stage: string,
  key: string,
  resourceState: ResourceState,
): StateFile => {
  return {
    ...state,
    stages: {
      ...state.stages,
      [stage]: {
        ...state.stages?.[stage],
        resources: state.stages?.[stage]?.resources ?? {},
        shared: {
          ...state.stages?.[stage]?.shared,
          [key]: resourceState,
        },
      },
    },
  };
};

/* istanbul ignore next */
export const removeSharedResource = (state: StateFile, stage: string, key: string): StateFile => {
  const existingShared = state.stages?.[stage]?.shared;
  if (!existingShared) {
    return state;
  }
  const { [key]: _removed, ...remainingShared } = existingShared;
  return {
    ...state,
    stages: {
      ...state.stages,
      [stage]: {
        ...state.stages[stage],
        shared: remainingShared,
      },
    },
  };
};

/**
 * Extract role ARN from function state for event resources.
 * Looks through all function resources to find a RAM role instance and returns its ARN.
 */
/* istanbul ignore next */
export const getRoleArnFromState = (state: StateFile): string | undefined => {
  const allResources = getAllResources(state);
  for (const [logicalId, resourceState] of Object.entries(allResources)) {
    if (logicalId.startsWith('functions.')) {
      const ramRoleInstance = resourceState.instances?.find((i) => i.type === 'ALIYUN_RAM_ROLE');
      if (ramRoleInstance?.roleArn) {
        return ramRoleInstance.roleArn as string;
      }
    }
  }
  return undefined;
};
