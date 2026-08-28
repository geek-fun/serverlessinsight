import {
  ensureStateDir,
  getStatePath,
  loadState,
  saveState,
  saveStateWithLock,
  getResource,
  setResource,
  removeResource,
  getAllResources,
  getRoleArnFromState,
  registerStateMigration,
  clearStateMigrations,
  setSharedResource,
  getSharedResource,
  removeSharedResource,
  getAllSharedResources,
} from '../../../src/common/stateManager';
import {
  ResourceState,
  CURRENT_STATE_VERSION,
  StateCorruptError,
  StateVersionError,
} from '../../../src/types';
import fs from 'node:fs';
import path from 'node:path';

jest.mock('../../../src/common/lockManager', () => ({
  withLock: jest.fn(async (_path, _operation, callback) => {
    await callback();
  }),
}));

describe('StateManager', () => {
  const testDir = '/tmp/test-state-manager';
  const statePath = path.join(testDir, '.serverlessinsight', 'state-test-app-test-service.json');

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
      const result = getStatePath('test-app', 'test-service', testDir);
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
      const state = loadState('tencent', 'test-app', 'test-service', 'default', testDir);

      expect(state.version).toBe(CURRENT_STATE_VERSION);
      expect(state.provider).toBe('tencent');
      expect(state.resources).toEqual({});
    });

    it('should load existing state from file', () => {
      const resourceData: ResourceState = {
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
            sid: 'si:tencent:scf:default:test-fn',
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

      const stateOnDisk = {
        version: CURRENT_STATE_VERSION,
        provider: 'tencent',
        app: 'test-app',
        service: 'test-service',
        stages: {
          default: {
            resources: {
              'functions.test': resourceData,
            },
          },
        },
      };

      ensureStateDir(testDir);
      fs.writeFileSync(statePath, JSON.stringify(stateOnDisk, null, 2));

      const state = loadState('tencent', 'test-app', 'test-service', 'default', testDir);

      expect(state).toEqual({
        ...stateOnDisk,
        resources: { 'functions.test': resourceData },
      });
    });

    describe('corrupt state handling (B2)', () => {
      const goodState = {
        version: CURRENT_STATE_VERSION,
        provider: 'tencent',
        app: 'test-app',
        service: 'test-service',
        stages: {
          default: {
            resources: {
              'functions.test': {
                mode: 'managed',
                region: 'ap-guangzhou',
                definition: { functionName: 'test-fn' },
                instances: [{ sid: 'si:tencent:scf:default:test-fn', id: 'test-fn' }],
                lastUpdated: '2025-01-01T00:00:00Z',
              },
            },
          },
        },
      };

      it('loadState throws StateCorruptError on corrupt state file', () => {
        ensureStateDir(testDir);
        fs.writeFileSync(statePath, '{{{ not valid json');

        expect(() => loadState('tencent', 'test-app', 'test-service', 'default', testDir)).toThrow(
          StateCorruptError,
        );
      });

      it('loadState falls back to .backup when primary is corrupt', () => {
        ensureStateDir(testDir);
        fs.writeFileSync(`${statePath}.backup`, JSON.stringify(goodState, null, 2));
        fs.writeFileSync(statePath, '{{{ not valid json');

        const state = loadState('tencent', 'test-app', 'test-service', 'default', testDir);
        expect(state.resources['functions.test']).toEqual(
          goodState.stages.default.resources['functions.test'],
        );
      });

      it('loadState throws when both primary and backup are corrupt', () => {
        ensureStateDir(testDir);
        fs.writeFileSync(statePath, '{{{ not valid json');
        fs.writeFileSync(`${statePath}.backup`, 'also not valid json');

        expect(() => loadState('tencent', 'test-app', 'test-service', 'default', testDir)).toThrow(
          StateCorruptError,
        );
      });
    });

    describe('state version migration scaffold (P4)', () => {
      const writeState = (body: Record<string, unknown>): void => {
        ensureStateDir(testDir);
        fs.writeFileSync(statePath, JSON.stringify(body));
      };

      it('loadState throws StateVersionError on a newer unknown state version', () => {
        writeState({
          version: '99.0',
          provider: 'tencent',
          app: 'test-app',
          service: 'test-service',
          stages: {},
          resources: {},
        });

        expect(() => loadState('tencent', 'test-app', 'test-service', 'default', testDir)).toThrow(
          StateVersionError,
        );
        expect(() => loadState('tencent', 'test-app', 'test-service', 'default', testDir)).toThrow(
          /upgrade/i,
        );
      });

      it('loadState loads state with version === CURRENT_STATE_VERSION without throwing', () => {
        writeState({
          version: CURRENT_STATE_VERSION,
          provider: 'tencent',
          app: 'test-app',
          service: 'test-service',
          stages: { default: { resources: {} } },
          resources: {},
        });

        const state = loadState('tencent', 'test-app', 'test-service', 'default', testDir);
        expect(state.version).toBe(CURRENT_STATE_VERSION);
      });

      it('loadState loads a legacy state with an older version field without throwing', () => {
        writeState({
          version: '1.0.0',
          provider: 'tencent',
          app: 'test-app',
          service: 'test-service',
          stages: { default: { resources: {} } },
          resources: {},
        });

        const state = loadState('tencent', 'test-app', 'test-service', 'default', testDir);
        expect(state.version).toBe('1.0.0');
        expect(state.resources).toEqual({});
      });

      it('loadState loads a legacy state with a missing version field without throwing', () => {
        writeState({
          provider: 'tencent',
          app: 'test-app',
          service: 'test-service',
          stages: { default: {} },
          resources: {},
        });

        const state = loadState('tencent', 'test-app', 'test-service', 'default', testDir);
        expect(state.version).toBeUndefined();
        expect(state.resources).toEqual({});
      });

      it('applies a registered migration for an older state version', () => {
        const migrateSpy = jest.fn((state: Record<string, unknown>) => ({
          ...state,
          version: CURRENT_STATE_VERSION,
          migrated: true,
        }));
        registerStateMigration('0.5', migrateSpy);
        try {
          writeState({
            version: '0.5',
            provider: 'tencent',
            app: 'test-app',
            service: 'test-service',
            stages: { default: { resources: {} } },
            resources: {},
          });

          const state = loadState('tencent', 'test-app', 'test-service', 'default', testDir);

          expect(migrateSpy).toHaveBeenCalledTimes(1);
          expect(state.version).toBe(CURRENT_STATE_VERSION);
          expect((state as { migrated?: boolean }).migrated).toBe(true);
        } finally {
          clearStateMigrations();
        }
      });

      it('throws StateVersionError when a registered migration cannot reach CURRENT', () => {
        registerStateMigration('0.5', (state) => ({ ...state, version: '1.0' }));
        try {
          writeState({
            version: '0.5',
            provider: 'tencent',
            app: 'test-app',
            service: 'test-service',
            stages: {},
            resources: {},
          });

          expect(() =>
            loadState('tencent', 'test-app', 'test-service', 'default', testDir),
          ).toThrow(StateVersionError);
        } finally {
          clearStateMigrations();
        }
      });
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
            sid: 'si:tencent:scf:default:test-fn',
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

      let state = loadState('tencent', 'test-app', 'test-service', 'default', testDir);
      state = setResource(state, 'functions.test', resourceState);

      const retrieved = getResource(state, 'functions.test');
      expect(retrieved).toEqual(resourceState);
    });

    it('should return undefined for non-existent resource', () => {
      const state = loadState('tencent', 'test-app', 'test-service', 'default', testDir);
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
            sid: 'si:tencent:scf:default:test-fn',
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

      let state = loadState('tencent', 'test-app', 'test-service', 'default', testDir);
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
            sid: 'si:tencent:scf:default:test-fn',
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

      let state = loadState('tencent', 'test-app', 'test-service', 'default', testDir);
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
            sid: 'si:tencent:scf:default:test-fn',
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

      let state = loadState('tencent', 'test-app', 'test-service', 'default', testDir);
      state = setResource(state, 'functions.test', resourceState);
      saveState(state, 'test-app', 'test-service', 'default', testDir);

      expect(fs.existsSync(statePath)).toBe(true);

      // Load state in a new call
      const state2 = loadState('tencent', 'test-app', 'test-service', 'default', testDir);
      expect(state2.version).toBe(CURRENT_STATE_VERSION);
      expect(getResource(state2, 'functions.test')).toEqual(resourceState);
    });

    describe('persisted shape (issue #225)', () => {
      const makeResourceState = (name: string): ResourceState => ({
        mode: 'managed',
        region: 'ap-guangzhou',
        definition: { functionName: name },
        instances: [{ sid: `si:tencent:scf:default:${name}`, id: name }],
        lastUpdated: '2025-01-01T00:00:00Z',
      });

      it('saveState does not persist the top-level resources projection', () => {
        let state = loadState('tencent', 'test-app', 'test-service', 'default', testDir);
        state = setResource(state, 'functions.test', makeResourceState('test-fn'));
        saveState(state, 'test-app', 'test-service', 'default', testDir);

        const onDisk = JSON.parse(fs.readFileSync(statePath, 'utf-8'));
        expect(onDisk.resources).toBeUndefined();
        expect(onDisk.stages.default.resources['functions.test']).toEqual(
          makeResourceState('test-fn'),
        );
      });

      it('saveState drops a stale top-level resources field left by an older CLI', () => {
        const legacyOnDisk = {
          version: CURRENT_STATE_VERSION,
          provider: 'tencent',
          app: 'test-app',
          service: 'test-service',
          stages: {
            default: { resources: { 'functions.current': makeResourceState('current-fn') } },
          },
          resources: { 'functions.stale': makeResourceState('stale-fn') },
        };
        ensureStateDir(testDir);
        fs.writeFileSync(statePath, JSON.stringify(legacyOnDisk, null, 2));

        const state = loadState('tencent', 'test-app', 'test-service', 'default', testDir);
        saveState(state, 'test-app', 'test-service', 'default', testDir);

        const onDisk = JSON.parse(fs.readFileSync(statePath, 'utf-8'));
        expect(onDisk.resources).toBeUndefined();
        expect(onDisk.stages.default.resources['functions.current']).toEqual(
          makeResourceState('current-fn'),
        );
      });

      it('round-trips resources through stages for the same stage', () => {
        let state = loadState('tencent', 'test-app', 'test-service', 'default', testDir);
        state = setResource(state, 'functions.test', makeResourceState('round-trip-fn'));
        saveState(state, 'test-app', 'test-service', 'default', testDir);

        const reloaded = loadState('tencent', 'test-app', 'test-service', 'default', testDir);
        expect(getResource(reloaded, 'functions.test')).toEqual(makeResourceState('round-trip-fn'));
      });
    });

    describe('atomic persistence (B1)', () => {
      const makeResourceState = (name: string): ResourceState => ({
        mode: 'managed',
        region: 'ap-guangzhou',
        definition: { functionName: name },
        instances: [{ sid: `si:tencent:scf:default:${name}`, id: name }],
        lastUpdated: '2025-01-01T00:00:00Z',
      });

      it('saveState writes atomically via tmp+rename', () => {
        const renameSpy = jest.spyOn(fs, 'renameSync');
        try {
          let state = loadState('tencent', 'test-app', 'test-service', 'default', testDir);
          state = setResource(state, 'functions.test', makeResourceState('test-fn'));
          saveState(state, 'test-app', 'test-service', 'default', testDir);
          saveState(state, 'test-app', 'test-service', 'default', testDir);

          expect(renameSpy).toHaveBeenCalled();
          expect(fs.existsSync(`${statePath}.tmp`)).toBe(false);

          const onDisk = JSON.parse(fs.readFileSync(statePath, 'utf-8'));
          expect(onDisk.resources).toBeUndefined();
          expect(onDisk.stages.default.resources['functions.test']).toEqual(
            makeResourceState('test-fn'),
          );
        } finally {
          renameSpy.mockRestore();
        }
      });

      it('saveState keeps a .backup of the previous state', () => {
        let state = loadState('tencent', 'test-app', 'test-service', 'default', testDir);
        state = setResource(state, 'functions.test', makeResourceState('v1-fn'));
        saveState(state, 'test-app', 'test-service', 'default', testDir);

        state = setResource(state, 'functions.test', makeResourceState('v2-fn'));
        saveState(state, 'test-app', 'test-service', 'default', testDir);

        expect(fs.existsSync(`${statePath}.backup`)).toBe(true);
        const backup = JSON.parse(fs.readFileSync(`${statePath}.backup`, 'utf-8'));
        expect(backup.stages.default.resources['functions.test']).toEqual(
          makeResourceState('v1-fn'),
        );
      });

      it('saveState leaves original intact if write fails', () => {
        let state = loadState('tencent', 'test-app', 'test-service', 'default', testDir);
        state = setResource(state, 'functions.test', makeResourceState('v1-fn'));
        saveState(state, 'test-app', 'test-service', 'default', testDir);
        const originalContent = fs.readFileSync(statePath, 'utf-8');

        state = setResource(state, 'functions.test', makeResourceState('v2-fn'));
        const renameSpy = jest.spyOn(fs, 'renameSync').mockImplementationOnce(() => {
          throw new Error('simulated rename failure');
        });

        try {
          expect(() => saveState(state, 'test-app', 'test-service', 'default', testDir)).toThrow(
            'simulated rename failure',
          );
        } finally {
          renameSpy.mockRestore();
        }

        expect(fs.readFileSync(statePath, 'utf-8')).toBe(originalContent);
        expect(fs.existsSync(`${statePath}.tmp`)).toBe(false);
      });
    });

    describe('serial and lineage (B3)', () => {
      const resourceState: ResourceState = {
        mode: 'managed',
        region: 'ap-guangzhou',
        definition: { functionName: 'test-fn' },
        instances: [{ sid: 'si:tencent:scf:default:test-fn', id: 'test-fn' }],
        lastUpdated: '2025-01-01T00:00:00Z',
      };

      it('saveState increments serial across saves', () => {
        let state = loadState('tencent', 'test-app', 'test-service', 'default', testDir);
        state = setResource(state, 'functions.test', resourceState);
        saveState(state, 'test-app', 'test-service', 'default', testDir);
        const first = JSON.parse(fs.readFileSync(statePath, 'utf-8'));
        saveState(state, 'test-app', 'test-service', 'default', testDir);
        const second = JSON.parse(fs.readFileSync(statePath, 'utf-8'));

        expect(first.serial).toBe(1);
        expect(second.serial).toBe(first.serial + 1);
      });

      it('saveState keeps lineage stable across saves', () => {
        let state = loadState('tencent', 'test-app', 'test-service', 'default', testDir);
        state = setResource(state, 'functions.test', resourceState);
        saveState(state, 'test-app', 'test-service', 'default', testDir);
        const first = JSON.parse(fs.readFileSync(statePath, 'utf-8'));
        saveState(state, 'test-app', 'test-service', 'default', testDir);
        const second = JSON.parse(fs.readFileSync(statePath, 'utf-8'));

        expect(first.lineage).toBeDefined();
        expect(second.lineage).toBe(first.lineage);
      });
    });

    it('preserves shared resources during local save round trip', () => {
      const sharedLog: ResourceState = {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: { logProject: 'logs', logstore: 'app-logs' },
        instances: [],
        lastUpdated: '2025-01-01T00:00:00Z',
      };
      const fnResource: ResourceState = {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: { functionName: 'test-fn' },
        instances: [{ sid: 'si:aliyun:fc3:default:test-fn', id: 'test-fn' }],
        lastUpdated: '2025-01-01T00:00:00Z',
      };
      const stateOnDisk = {
        version: CURRENT_STATE_VERSION,
        provider: 'aliyun',
        app: 'test-app',
        service: 'test-service',
        stages: {
          dev: {
            resources: {},
            shared: { logs: sharedLog },
          },
        },
      };

      ensureStateDir(testDir);
      fs.writeFileSync(statePath, JSON.stringify(stateOnDisk, null, 2));

      let state = loadState('aliyun', 'test-app', 'test-service', 'dev', testDir);
      state = setResource(state, 'functions.test', fnResource);
      saveState(state, 'test-app', 'test-service', 'dev', testDir);

      const reloaded = loadState('aliyun', 'test-app', 'test-service', 'dev', testDir);
      expect(reloaded.stages.dev.shared?.logs).toEqual(sharedLog);
      expect(reloaded.stages.dev.shared?.logs?.definition).toEqual(sharedLog.definition);
      expect(reloaded.resources['functions.test']).toEqual(fnResource);
    });

    it('preserves legacy stages without shared metadata', () => {
      const legacyResource: ResourceState = {
        mode: 'managed',
        region: 'ap-guangzhou',
        definition: { functionName: 'legacy-fn' },
        instances: [{ sid: 'si:tencent:scf:default:legacy-fn', id: 'legacy-fn' }],
        lastUpdated: '2025-01-01T00:00:00Z',
      };
      const prodResource: ResourceState = {
        mode: 'managed',
        region: 'ap-guangzhou',
        definition: { functionName: 'prod-fn' },
        instances: [{ sid: 'si:tencent:scf:default:prod-fn', id: 'prod-fn' }],
        lastUpdated: '2025-01-01T00:00:00Z',
      };
      const stateOnDisk = {
        version: CURRENT_STATE_VERSION,
        provider: 'tencent',
        app: 'test-app',
        service: 'test-service',
        stages: {
          dev: { resources: { 'functions.legacy': legacyResource } },
          prod: { resources: { 'functions.prod': prodResource } },
        },
      };

      ensureStateDir(testDir);
      fs.writeFileSync(statePath, JSON.stringify(stateOnDisk, null, 2));

      const state = loadState('tencent', 'test-app', 'test-service', 'dev', testDir);
      saveState(state, 'test-app', 'test-service', 'dev', testDir);
      const reloaded = loadState('tencent', 'test-app', 'test-service', 'dev', testDir);

      expect(reloaded.stages.dev.resources['functions.legacy']).toEqual(legacyResource);
      expect(reloaded.stages.prod.resources['functions.prod']).toEqual(prodResource);
      expect(reloaded.stages.dev.shared).toEqual({});
    });

    it('does not copy shared resources between stages', () => {
      const sharedLog: ResourceState = {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: { logProject: 'logs' },
        instances: [],
        lastUpdated: '2025-01-01T00:00:00Z',
      };
      const stateOnDisk = {
        version: CURRENT_STATE_VERSION,
        provider: 'aliyun',
        app: 'test-app',
        service: 'test-service',
        stages: {
          dev: { resources: {}, shared: { logs: sharedLog } },
          prod: { resources: {} },
        },
      };

      ensureStateDir(testDir);
      fs.writeFileSync(statePath, JSON.stringify(stateOnDisk, null, 2));

      const state = loadState('aliyun', 'test-app', 'test-service', 'prod', testDir);
      saveState(state, 'test-app', 'test-service', 'prod', testDir);
      const reloaded = loadState('aliyun', 'test-app', 'test-service', 'prod', testDir);

      expect(reloaded.stages.prod.shared).toEqual({});
      expect(reloaded.stages.dev.shared?.logs).toEqual(sharedLog);
    });
  });

  describe('shared resource helpers', () => {
    const makeSharedLog = (): ResourceState => ({
      mode: 'managed',
      region: 'cn-hangzhou',
      definition: { logProject: 'logs' },
      instances: [],
      lastUpdated: '2025-01-01T00:00:00Z',
    });

    it('setSharedResource adds without touching resources', () => {
      const fnResource: ResourceState = {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: { functionName: 'test-fn' },
        instances: [{ sid: 'si:aliyun:fc3:default:test-fn', id: 'test-fn' }],
        lastUpdated: '2025-01-01T00:00:00Z',
      };
      let state = loadState('aliyun', 'test-app', 'test-service', 'dev', testDir);
      state = setResource(state, 'functions.test', fnResource);
      const shared = makeSharedLog();

      const updated = setSharedResource(state, 'dev', 'logs', shared);

      expect(getAllSharedResources(updated, 'dev')).toEqual({ logs: shared });
      expect(getResource(updated, 'functions.test')).toEqual(fnResource);
    });

    it('getSharedResource returns undefined when absent', () => {
      const state = loadState('aliyun', 'test-app', 'test-service', 'dev', testDir);
      expect(getSharedResource(state, 'dev', 'logs')).toBeUndefined();
    });

    it('removeSharedResource returns state unchanged when shared absent', () => {
      const state = loadState('aliyun', 'test-app', 'test-service', 'dev', testDir);
      const updated = removeSharedResource(state, 'dev', 'logs');
      expect(updated).toBe(state);
    });

    it('removeSharedResource deletes key and deletion persists through save/load', () => {
      let state = loadState('aliyun', 'test-app', 'test-service', 'dev', testDir);
      const shared = makeSharedLog();
      state = setSharedResource(state, 'dev', 'logs', shared);
      state = setSharedResource(state, 'dev', 'metrics', shared);
      saveState(state, 'test-app', 'test-service', 'dev', testDir);

      let reloaded = loadState('aliyun', 'test-app', 'test-service', 'dev', testDir);
      reloaded = removeSharedResource(reloaded, 'dev', 'logs');
      expect(getSharedResource(reloaded, 'dev', 'logs')).toBeUndefined();
      saveState(reloaded, 'test-app', 'test-service', 'dev', testDir);

      const final = loadState('aliyun', 'test-app', 'test-service', 'dev', testDir);
      expect(getSharedResource(final, 'dev', 'logs')).toBeUndefined();
      expect(getSharedResource(final, 'dev', 'metrics')).toEqual(shared);
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
            sid: 'si:tencent:scf:default:test-fn-1',
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
            sid: 'si:tencent:scf:default:test-fn-2',
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

      let state = loadState('tencent', 'test-app', 'test-service', 'default', testDir);
      state = setResource(state, 'functions.test1', resource1);
      state = setResource(state, 'functions.test2', resource2);

      const allResources = getAllResources(state);
      expect(allResources).toEqual({
        'functions.test1': resource1,
        'functions.test2': resource2,
      });
    });
  });

  describe('saveStateWithLock', () => {
    it('should save state with locking', async () => {
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
            sid: 'si:tencent:scf:default:test-fn',
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

      let state = loadState('tencent', 'test-app', 'test-service', 'default', testDir);
      state = setResource(state, 'functions.test', resourceState);

      await saveStateWithLock(state, 'test-app', 'test-service', 'default', 'deploy', testDir);

      expect(fs.existsSync(statePath)).toBe(true);

      const loadedState = loadState('tencent', 'test-app', 'test-service', 'default', testDir);
      expect(getResource(loadedState, 'functions.test')).toEqual(resourceState);
    });
  });

  describe('getRoleArnFromState', () => {
    it('should return role ARN from function state', () => {
      const state = loadState('aliyun', 'test-app', 'test-service', 'default', testDir);
      const functionState: ResourceState = {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: { functionName: 'test-fn' },
        instances: [
          {
            sid: 'si:aliyun:fc3:default:test-fn',
            id: 'test-fn',
            type: 'ALIYUN_RAM_ROLE',
            roleArn: 'acs:ram::123456789012:role/TestRole',
          },
        ],
        lastUpdated: '2025-01-01T00:00:00Z',
      };

      const updatedState = setResource(state, 'functions.test', functionState);
      const roleArn = getRoleArnFromState(updatedState);

      expect(roleArn).toBe('acs:ram::123456789012:role/TestRole');
    });

    it('should return undefined when no role ARN exists', () => {
      const state = loadState('aliyun', 'test-app', 'test-service', 'default', testDir);
      const roleArn = getRoleArnFromState(state);

      expect(roleArn).toBeUndefined();
    });

    it('should return undefined when function has no RAM role instance', () => {
      const state = loadState('aliyun', 'test-app', 'test-service', 'default', testDir);
      const functionState: ResourceState = {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: { functionName: 'test-fn' },
        instances: [
          {
            sid: 'si:aliyun:fc3:default:test-fn',
            id: 'test-fn',
            type: 'OTHER_TYPE',
          },
        ],
        lastUpdated: '2025-01-01T00:00:00Z',
      };

      const updatedState = setResource(state, 'functions.test', functionState);
      const roleArn = getRoleArnFromState(updatedState);

      expect(roleArn).toBeUndefined();
    });

    it('should return undefined when function instances array is empty', () => {
      const state = loadState('aliyun', 'test-app', 'test-service', 'default', testDir);
      const functionState: ResourceState = {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: { functionName: 'test-fn' },
        instances: [],
        lastUpdated: '2025-01-01T00:00:00Z',
      };

      const updatedState = setResource(state, 'functions.test', functionState);
      const roleArn = getRoleArnFromState(updatedState);

      expect(roleArn).toBeUndefined();
    });
  });
});
