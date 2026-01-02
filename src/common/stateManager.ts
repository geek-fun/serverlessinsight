import fs from 'node:fs';
import path from 'node:path';
import { ResourceState, StateFile, STATE_VERSION_V1, CURRENT_STATE_VERSION } from '../types';

const STATE_DIR = '.serverlessinsight';
const STATE_FILE = 'state.json';

export const getStatePath = (baseDir: string = process.cwd()): string => {
  return path.join(baseDir, STATE_DIR, STATE_FILE);
};

export const ensureStateDir = (baseDir: string = process.cwd()): void => {
  const stateDir = path.join(baseDir, STATE_DIR);
  if (!fs.existsSync(stateDir)) {
    fs.mkdirSync(stateDir, { recursive: true });
  }
};

/**
 * Migrate a v0.1 state file to v0.2 format.
 * v0.1 used configHash, v0.2 uses attributes.
 */
const migrateStateV1ToV2 = (state: StateFile): StateFile => {
  const migratedResources: Record<string, ResourceState> = {};

  for (const [resourceId, resource] of Object.entries(state.resources)) {
    // If resource already has attributes, keep them
    if (resource.attributes) {
      migratedResources[resourceId] = resource;
    } else {
      // Migrate from v0.1: create attributes from metadata if available
      // Keep configHash for backward compatibility but mark as deprecated
      migratedResources[resourceId] = {
        ...resource,
        attributes: resource.metadata || {},
        // Keep old configHash for reference during transition
        configHash: (resource as { configHash?: string }).configHash,
      };
    }
  }

  return {
    ...state,
    version: CURRENT_STATE_VERSION,
    resources: migratedResources,
  };
};

/**
 * Load and optionally migrate state file to current version.
 */
export const loadState = (provider: string, baseDir: string = process.cwd()): StateFile => {
  const statePath = getStatePath(baseDir);
  try {
    if (fs.existsSync(statePath)) {
      const content = fs.readFileSync(statePath, 'utf-8');
      const state = JSON.parse(content) as StateFile;

      // Migrate older state files to current format
      if (state.version === STATE_VERSION_V1) {
        return migrateStateV1ToV2(state);
      }

      return state;
    }
    // If file doesn't exist or is invalid, return empty state
  } catch {
    // Ignore error
  }
  return {
    version: CURRENT_STATE_VERSION,
    provider,
    resources: {},
  };
};

export const saveState = (state: StateFile, baseDir: string = process.cwd()): void => {
  ensureStateDir(baseDir);
  const statePath = getStatePath(baseDir);
  // Ensure we always save with current version
  const stateToSave: StateFile = {
    ...state,
    version: CURRENT_STATE_VERSION,
  };
  fs.writeFileSync(statePath, JSON.stringify(stateToSave, null, 2), 'utf-8');
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [resourceId]: _, ...remainingResources } = state.resources;
  return {
    ...state,
    resources: remainingResources,
  };
};

export const getAllResources = (state: StateFile): Record<string, ResourceState> => {
  return state.resources;
};
