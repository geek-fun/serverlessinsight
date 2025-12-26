import { StateManager, ensureStateDir, getStatePath } from '../../src/common/stateManager';
import { ResourceState } from '../../src/types';
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

  describe('StateManager', () => {
    it('should initialize with empty state if no file exists', () => {
      const manager = new StateManager('tencent', testDir);
      const state = manager.getState();

      expect(state.version).toBe('0.1');
      expect(state.provider).toBe('tencent');
      expect(state.resources).toEqual({});
    });

    it('should load existing state from file', () => {
      // Create a state file
      const existingState = {
        version: '0.1',
        provider: 'tencent',
        resources: {
          'functions.test': {
            type: 'SCF',
            physicalId: 'test-fn',
            region: 'ap-guangzhou',
            configHash: 'abc123',
            lastUpdated: '2025-01-01T00:00:00Z',
          },
        },
      };

      ensureStateDir(testDir);
      fs.writeFileSync(statePath, JSON.stringify(existingState, null, 2));

      const manager = new StateManager('tencent', testDir);
      const state = manager.getState();

      expect(state).toEqual(existingState);
    });

    it('should get resource state by id', () => {
      const manager = new StateManager('tencent', testDir);
      const resourceState: ResourceState = {
        type: 'SCF',
        physicalId: 'test-fn',
        region: 'ap-guangzhou',
        configHash: 'abc123',
        lastUpdated: '2025-01-01T00:00:00Z',
      };

      manager.set('functions.test', resourceState);

      const retrieved = manager.get('functions.test');
      expect(retrieved).toEqual(resourceState);
    });

    it('should return undefined for non-existent resource', () => {
      const manager = new StateManager('tencent', testDir);
      const retrieved = manager.get('functions.nonexistent');
      expect(retrieved).toBeUndefined();
    });

    it('should set resource state', () => {
      const manager = new StateManager('tencent', testDir);
      const resourceState: ResourceState = {
        type: 'SCF',
        physicalId: 'test-fn',
        region: 'ap-guangzhou',
        configHash: 'abc123',
        lastUpdated: '2025-01-01T00:00:00Z',
      };

      manager.set('functions.test', resourceState);

      const state = manager.getState();
      expect(state.resources['functions.test']).toEqual(resourceState);
    });

    it('should remove resource state', () => {
      const manager = new StateManager('tencent', testDir);
      const resourceState: ResourceState = {
        type: 'SCF',
        physicalId: 'test-fn',
        region: 'ap-guangzhou',
        configHash: 'abc123',
        lastUpdated: '2025-01-01T00:00:00Z',
      };

      manager.set('functions.test', resourceState);
      expect(manager.get('functions.test')).toEqual(resourceState);

      manager.remove('functions.test');
      expect(manager.get('functions.test')).toBeUndefined();
    });

    it('should save state to file', () => {
      const manager = new StateManager('tencent', testDir);
      const resourceState: ResourceState = {
        type: 'SCF',
        physicalId: 'test-fn',
        region: 'ap-guangzhou',
        configHash: 'abc123',
        lastUpdated: '2025-01-01T00:00:00Z',
      };

      manager.set('functions.test', resourceState);
      manager.save();

      expect(fs.existsSync(statePath)).toBe(true);

      // Load state in a new manager
      const manager2 = new StateManager('tencent', testDir);
      expect(manager2.get('functions.test')).toEqual(resourceState);
    });

    it('should get all resources', () => {
      const manager = new StateManager('tencent', testDir);
      const resource1: ResourceState = {
        type: 'SCF',
        physicalId: 'test-fn-1',
        region: 'ap-guangzhou',
        configHash: 'abc123',
        lastUpdated: '2025-01-01T00:00:00Z',
      };
      const resource2: ResourceState = {
        type: 'SCF',
        physicalId: 'test-fn-2',
        region: 'ap-guangzhou',
        configHash: 'def456',
        lastUpdated: '2025-01-02T00:00:00Z',
      };

      manager.set('functions.test1', resource1);
      manager.set('functions.test2', resource2);

      const allResources = manager.getAll();
      expect(allResources).toEqual({
        'functions.test1': resource1,
        'functions.test2': resource2,
      });
    });

    it('should clear all resources', () => {
      const manager = new StateManager('tencent', testDir);
      const resourceState: ResourceState = {
        type: 'SCF',
        physicalId: 'test-fn',
        region: 'ap-guangzhou',
        configHash: 'abc123',
        lastUpdated: '2025-01-01T00:00:00Z',
      };

      manager.set('functions.test', resourceState);
      expect(manager.getAll()).not.toEqual({});

      manager.clear();
      expect(manager.getAll()).toEqual({});
    });
  });
});
