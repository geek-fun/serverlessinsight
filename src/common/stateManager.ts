import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { ResourceState, StateFile, StateCorruptError, CURRENT_STATE_VERSION } from '../types';
import { withLock, LockOptions } from './lockManager';

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
 * Load state file, scoped to the given stage.
 * The returned StateFile has `resources` populated from `stages[stage].resources`.
 * A corrupt primary is recovered from `statePath + '.backup'`; if both are corrupt,
 * StateCorruptError is thrown instead of silently returning empty state.
 */
/* istanbul ignore next */
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

  try {
    const content = fs.readFileSync(statePath, 'utf-8');
    const raw = JSON.parse(content) as StateFile;
    const stageResources = raw.stages?.[stage]?.resources ?? {};
    return { ...raw, resources: stageResources };
  } catch (error) {
    const backup = readBackup();
    if (backup) {
      const stageResources = backup.stages?.[stage]?.resources ?? {};
      return { ...backup, resources: stageResources };
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
  let existing: StateFile = {
    version: CURRENT_STATE_VERSION,
    provider: state.provider,
    app,
    service,
    stages: {},
    resources: {},
  };
  try {
    if (fs.existsSync(statePath)) {
      const content = fs.readFileSync(statePath, 'utf-8');
      existing = JSON.parse(content) as StateFile;
    }
  } catch {
    // use default
  }

  // Write updated stage resources, preserve all other stages
  const stateToSave: StateFile = {
    ...existing,
    version: CURRENT_STATE_VERSION,
    lineage: existing.lineage || crypto.randomUUID(),
    serial: (existing.serial ?? 0) + 1,
    app,
    service,
    provider: state.provider,
    stages: {
      ...existing.stages,
      [stage]: { resources: state.resources },
    },
    resources: state.resources,
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
