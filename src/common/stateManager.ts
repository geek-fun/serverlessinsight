import fs from 'node:fs';
import path from 'node:path';
import { ResourceState, StateFile, CURRENT_STATE_VERSION } from '../types';
import { withLock, LockOptions } from './lockManager';

const STATE_DIR = '.serverlessinsight';

export const getStatePath = (
  app: string,
  service: string,
  baseDir: string = process.cwd(),
): string => {
  return path.join(baseDir, STATE_DIR, `state-${app}-${service}.json`);
};

export const ensureStateDir = (baseDir: string = process.cwd()): void => {
  const stateDir = path.join(baseDir, STATE_DIR);
  if (!fs.existsSync(stateDir)) {
    fs.mkdirSync(stateDir, { recursive: true });
  }
};

/**
 * Load state file, scoped to the given stage.
 * The returned StateFile has `resources` populated from `stages[stage].resources`.
 */
export const loadState = (
  provider: string,
  app: string,
  service: string,
  stage: string,
  baseDir: string = process.cwd(),
): StateFile => {
  const statePath = getStatePath(app, service, baseDir);
  try {
    if (fs.existsSync(statePath)) {
      const content = fs.readFileSync(statePath, 'utf-8');
      const raw = JSON.parse(content) as StateFile;
      // Populate in-memory resources from the stage slice
      const stageResources = raw.stages?.[stage]?.resources ?? {};
      return { ...raw, resources: stageResources };
    }
  } catch {
    // Ignore error, fall through to empty state
  }

  return { version: CURRENT_STATE_VERSION, provider, app, service, stages: {}, resources: {} };
};

export const saveState = (
  state: StateFile,
  app: string,
  service: string,
  stage: string,
  baseDir: string = process.cwd(),
): void => {
  ensureStateDir(baseDir);
  const statePath = getStatePath(app, service, baseDir);

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
    app,
    service,
    provider: state.provider,
    stages: {
      ...existing.stages,
      [stage]: { resources: state.resources },
    },
    resources: state.resources,
  };

  fs.writeFileSync(statePath, JSON.stringify(stateToSave, null, 2), 'utf-8');
};

/**
 * Save state with automatic locking.
 * This should be used by high-level operations like deploy/destroy.
 */
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

export const getResource = (state: StateFile, resourceId: string): ResourceState | undefined => {
  return state.resources[resourceId];
};

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

export const removeResource = (state: StateFile, resourceId: string): StateFile => {
  const { [resourceId]: _, ...remainingResources } = state.resources;
  return {
    ...state,
    resources: remainingResources,
  };
};

export const getAllResources = (state: StateFile): Record<string, ResourceState> => {
  return state.resources;
};

/**
 * Extract role ARN from function state for event resources.
 * Looks through all function resources to find a RAM role instance and returns its ARN.
 */
export const getRoleArnFromState = (state: StateFile): string | undefined => {
  const allResources = getAllResources(state);
  for (const [logicalId, resourceState] of Object.entries(allResources)) {
    if (logicalId.startsWith('functions.')) {
      const ramRoleInstance = resourceState.instances?.find((i) => i.type === 'ALIYUN_RAM_ROLE');
      if (ramRoleInstance?.arn) {
        return ramRoleInstance.arn as string;
      }
    }
  }
  return undefined;
};
