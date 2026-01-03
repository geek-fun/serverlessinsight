import {
  ensureStateDir,
  getStatePath,
  loadState,
  saveState,
  getResource,
  setResource,
  removeResource,
  getAllResources,
} from '../../src/common/stateManager';
import { ResourceState, CURRENT_STATE_VERSION } from '../../src/types';
import fs from 'node:fs';
import path from 'node:path';

describe('StateManager', () => {
  const testDir = '/tmp/test-state-manager';
  const statePath = path.join(testDir, '.serverlessinsight', 'state.json');

  beforeEach(() => {
    // Clean up test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    // Clean up after tests
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  describe('getStatePath', () => {
    it('should return correct state path', () => {
      const result = getStatePath(testDir);
      expect(result).toBe(statePath);
    });
  });

  describe('ensureStateDir', () => {
    it('should create state directory if it does not exist', () => {
      ensureStateDir(testDir);
      expect(fs.existsSync(path.join(testDir, '.serverlessinsight'))).toBe(true);
    });

    it('should not fail if directory already exists', () => {
      ensureStateDir(testDir);
      ensureStateDir(testDir);
      expect(fs.existsSync(path.join(testDir, '.serverlessinsight'))).toBe(true);
    });
  });

  describe('loadState', () => {
    it('should initialize with empty state if no file exists', () => {
      const state = loadState('tencent', testDir);

      expect(state.version).toBe(CURRENT_STATE_VERSION);
      expect(state.provider).toBe('tencent');
      expect(state.resources).toEqual({});
    });

    it('should load existing state from file', () => {
      // Create state file with new structure
      const existingState = {
        version: CURRENT_STATE_VERSION,
        provider: 'tencent',
        resources: {
          'functions.test': {
            mode: 'managed',
            region: 'ap-guangzhou',
            definition: {
              functionName: 'test-fn',
              runtime: 'nodejs18',
              handler: 'index.handler',
              memorySize: 128,
              timeout: 3,
              environment: {},
              codeHash: 'abc123',
            },
            instances: [
              {
                arn: 'arn:tencent:scf:ap-guangzhou::function:test-fn',
                id: 'test-fn',
                functionName: 'test-fn',
                runtime: 'nodejs18',
                handler: 'index.handler',
                memorySize: 128,
                timeout: 3,
              },
            ],
            lastUpdated: '2025-01-01T00:00:00Z',
          },
        },
      };

      ensureStateDir(testDir);
      fs.writeFileSync(statePath, JSON.stringify(existingState, null, 2));

      const state = loadState('tencent', testDir);

      expect(state).toEqual(existingState);
    });
  });

  describe('getResource', () => {
    it('should get resource state by id', () => {
      const resourceState: ResourceState = {
        mode: 'managed',
        region: 'ap-guangzhou',
        definition: {
          functionName: 'test-fn',
          runtime: 'nodejs18',
          handler: 'index.handler',
          memorySize: 128,
          timeout: 3,
          environment: {},
          codeHash: 'abc123',
        },
        instances: [
          {
            arn: 'arn:tencent:scf:ap-guangzhou::function:test-fn',
            id: 'test-fn',
            functionName: 'test-fn',
            runtime: 'nodejs18',
            handler: 'index.handler',
            memorySize: 128,
            timeout: 3,
          },
        ],
        lastUpdated: '2025-01-01T00:00:00Z',
      };

      let state = loadState('tencent', testDir);
      state = setResource(state, 'functions.test', resourceState);

      const retrieved = getResource(state, 'functions.test');
      expect(retrieved).toEqual(resourceState);
    });

    it('should return undefined for non-existent resource', () => {
      const state = loadState('tencent', testDir);
      const retrieved = getResource(state, 'functions.nonexistent');
      expect(retrieved).toBeUndefined();
    });
  });

  describe('setResource', () => {
    it('should set resource state', () => {
      const resourceState: ResourceState = {
        mode: 'managed',
        region: 'ap-guangzhou',
        definition: {
          functionName: 'test-fn',
          runtime: 'nodejs18',
          handler: 'index.handler',
          memorySize: 128,
          timeout: 3,
          environment: {},
          codeHash: 'abc123',
        },
        instances: [
          {
            arn: 'arn:tencent:scf:ap-guangzhou::function:test-fn',
            id: 'test-fn',
            functionName: 'test-fn',
            runtime: 'nodejs18',
            handler: 'index.handler',
            memorySize: 128,
            timeout: 3,
          },
        ],
        lastUpdated: '2025-01-01T00:00:00Z',
      };

      let state = loadState('tencent', testDir);
      state = setResource(state, 'functions.test', resourceState);

      expect(state.resources['functions.test']).toEqual(resourceState);
    });
  });

  describe('removeResource', () => {
    it('should remove resource state', () => {
      const resourceState: ResourceState = {
        mode: 'managed',
        region: 'ap-guangzhou',
        definition: {
          functionName: 'test-fn',
          runtime: 'nodejs18',
          handler: 'index.handler',
          memorySize: 128,
          timeout: 3,
          environment: {},
          codeHash: 'abc123',
        },
        instances: [
          {
            arn: 'arn:tencent:scf:ap-guangzhou::function:test-fn',
            id: 'test-fn',
            functionName: 'test-fn',
            runtime: 'nodejs18',
            handler: 'index.handler',
            memorySize: 128,
            timeout: 3,
          },
        ],
        lastUpdated: '2025-01-01T00:00:00Z',
      };

      let state = loadState('tencent', testDir);
      state = setResource(state, 'functions.test', resourceState);
      expect(getResource(state, 'functions.test')).toEqual(resourceState);

      state = removeResource(state, 'functions.test');
      expect(getResource(state, 'functions.test')).toBeUndefined();
    });
  });

  describe('saveState', () => {
    it('should save state to file with current version', () => {
      const resourceState: ResourceState = {
        mode: 'managed',
        region: 'ap-guangzhou',
        definition: {
          functionName: 'test-fn',
          runtime: 'nodejs18',
          handler: 'index.handler',
          memorySize: 128,
          timeout: 3,
          environment: {},
          codeHash: 'abc123',
        },
        instances: [
          {
            arn: 'arn:tencent:scf:ap-guangzhou::function:test-fn',
            id: 'test-fn',
            functionName: 'test-fn',
            runtime: 'nodejs18',
            handler: 'index.handler',
            memorySize: 128,
            timeout: 3,
          },
        ],
        lastUpdated: '2025-01-01T00:00:00Z',
      };

      let state = loadState('tencent', testDir);
      state = setResource(state, 'functions.test', resourceState);
      saveState(state, testDir);

      expect(fs.existsSync(statePath)).toBe(true);

      // Load state in a new call
      const state2 = loadState('tencent', testDir);
      expect(state2.version).toBe(CURRENT_STATE_VERSION);
      expect(getResource(state2, 'functions.test')).toEqual(resourceState);
    });
  });

  describe('getAllResources', () => {
    it('should get all resources', () => {
      const resource1: ResourceState = {
        mode: 'managed',
        region: 'ap-guangzhou',
        definition: {
          functionName: 'test-fn-1',
          runtime: 'nodejs18',
          handler: 'index.handler',
          memorySize: 128,
          timeout: 3,
          environment: {},
          codeHash: 'abc123',
        },
        instances: [
          {
            arn: 'arn:tencent:scf:ap-guangzhou::function:test-fn-1',
            id: 'test-fn-1',
            functionName: 'test-fn-1',
            runtime: 'nodejs18',
            handler: 'index.handler',
            memorySize: 128,
            timeout: 3,
          },
        ],
        lastUpdated: '2025-01-01T00:00:00Z',
      };
      const resource2: ResourceState = {
        mode: 'managed',
        region: 'ap-guangzhou',
        definition: {
          functionName: 'test-fn-2',
          runtime: 'nodejs18',
          handler: 'index.handler',
          memorySize: 256,
          timeout: 5,
          environment: {},
          codeHash: 'def456',
        },
        instances: [
          {
            arn: 'arn:tencent:scf:ap-guangzhou::function:test-fn-2',
            id: 'test-fn-2',
            functionName: 'test-fn-2',
            runtime: 'nodejs18',
            handler: 'index.handler',
            memorySize: 256,
            timeout: 5,
          },
        ],
        lastUpdated: '2025-01-02T00:00:00Z',
      };

      let state = loadState('tencent', testDir);
      state = setResource(state, 'functions.test1', resource1);
      state = setResource(state, 'functions.test2', resource2);

      const allResources = getAllResources(state);
      expect(allResources).toEqual({
        'functions.test1': resource1,
        'functions.test2': resource2,
      });
    });
  });
});
