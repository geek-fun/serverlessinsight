import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createLocalStateBackend } from '../../../../src/common/stateBackend/localStateBackend';
import { clearStateMigrations, registerStateMigration } from '../../../../src/common/stateManager';
import {
  StateFile,
  CURRENT_STATE_VERSION,
  ResourceState,
  StateCorruptError,
  StateScopeMismatchError,
} from '../../../../src/types';

jest.mock('../../../../src/common/lockManager', () => ({
  ...jest.requireActual('../../../../src/common/lockManager'),
}));

describe('localStateBackend (scope-bound, issue #280)', () => {
  let baseDir: string;

  const scope = {
    provider: 'aliyun',
    app: 'test-app',
    service: 'test-service',
    stage: 'prod',
    region: 'cn-hangzhou',
  };

  const makeResource = (id: string): ResourceState => ({
    mode: 'managed',
    region: scope.region,
    definition: {},
    instances: [{ sid: `sid-${id}`, id }],
    lastUpdated: new Date().toISOString(),
  });

  const scopedPath = () =>
    path.join(
      baseDir,
      '.serverlessinsight',
      'states',
      scope.app,
      scope.service,
      scope.stage,
      scope.region,
      'state.json',
    );

  const legacyPath = () =>
    path.join(baseDir, '.serverlessinsight', `state-${scope.app}-${scope.service}.json`);

  beforeEach(() => {
    baseDir = fs.mkdtempSync(path.join(os.tmpdir(), 'si-local-backend-'));
  });

  afterEach(() => {
    fs.rmSync(baseDir, { recursive: true, force: true });
  });

  it('binds the normalized scope and exposes the backend contract', () => {
    const backend = createLocalStateBackend(scope, { baseDir });
    expect(backend.scope).toEqual(scope);
    expect(backend.capabilities).toEqual({ conditionalCreate: true });
    expect(backend).toHaveProperty('loadState');
    expect(backend).toHaveProperty('saveState');
    expect(backend).toHaveProperty('probeWriteReadiness');
    expect(backend).toHaveProperty('readStateSource');
    expect(backend).toHaveProperty('patchPersisted');
  });

  describe('loadState', () => {
    it('returns an empty scoped state for a fresh scope', async () => {
      const backend = createLocalStateBackend(scope, { baseDir });
      const state = await backend.loadState();
      expect(state.version).toBe(CURRENT_STATE_VERSION);
      expect(state.scope).toEqual({ stage: 'prod', region: 'cn-hangzhou' });
      expect(state.resources).toEqual({});
      expect(backend.readStateSource()).toBe('empty');
    });

    it('loads the scoped V4 document when present', async () => {
      const backend = createLocalStateBackend(scope, { baseDir });
      const saved: StateFile = {
        version: CURRENT_STATE_VERSION,
        provider: scope.provider,
        app: scope.app,
        service: scope.service,
        scope: { stage: scope.stage, region: scope.region },
        stages: { prod: { resources: {} } },
        resources: { 'functions.a': makeResource('a') },
      };
      await backend.saveState(saved);

      const loaded = await backend.loadState();
      expect(loaded.resources['functions.a']).toBeDefined();
      expect(backend.readStateSource()).toBe('scoped');
    });

    it('falls back to the legacy aggregate for read-only compatibility', async () => {
      fs.mkdirSync(path.dirname(legacyPath()), { recursive: true });
      fs.writeFileSync(
        legacyPath(),
        JSON.stringify({
          version: '3.0',
          provider: scope.provider,
          app: scope.app,
          service: scope.service,
          lineage: 'legacy',
          serial: 3,
          stages: {
            prod: { resources: { 'functions.legacy': makeResource('legacy') } },
          },
        }),
        'utf-8',
      );

      const backend = createLocalStateBackend(scope, { baseDir });
      const loaded = await backend.loadState();
      expect(loaded.resources['functions.legacy']).toBeDefined();
      expect(loaded.version).toBe('3.0');
      expect(backend.readStateSource()).toBe('legacy');
    });

    it('reports empty when the legacy aggregate has no resources for this stage', async () => {
      fs.mkdirSync(path.dirname(legacyPath()), { recursive: true });
      fs.writeFileSync(
        legacyPath(),
        JSON.stringify({
          version: '3.0',
          provider: scope.provider,
          app: scope.app,
          service: scope.service,
          stages: { dev: { resources: { 'functions.x': makeResource('x') } } },
        }),
        'utf-8',
      );

      const backend = createLocalStateBackend(scope, { baseDir });
      await backend.loadState();
      expect(backend.readStateSource()).toBe('empty');
    });

    it('rejects a scoped document belonging to a different scope', async () => {
      fs.mkdirSync(path.dirname(scopedPath()), { recursive: true });
      fs.writeFileSync(
        scopedPath(),
        JSON.stringify({
          version: CURRENT_STATE_VERSION,
          provider: scope.provider,
          app: scope.app,
          service: scope.service,
          scope: { stage: 'prod', region: 'ap-southeast-1' },
          stages: { prod: { resources: {} } },
        }),
        'utf-8',
      );

      const backend = createLocalStateBackend(scope, { baseDir });
      await expect(backend.loadState()).rejects.toThrow(StateScopeMismatchError);
    });

    it('never converts a corrupt scoped document to empty state', async () => {
      fs.mkdirSync(path.dirname(scopedPath()), { recursive: true });
      fs.writeFileSync(scopedPath(), '{not json', 'utf-8');
      const backend = createLocalStateBackend(scope, { baseDir });
      await expect(backend.loadState()).rejects.toThrow(/corrupt/);
    });

    it('treats an unparseable legacy aggregate as absent and returns the empty scoped state', async () => {
      // readLegacyPersistedState swallows corrupt legacy files as null — the
      // empty scoped document, not an error, is the documented recovery.
      fs.mkdirSync(path.dirname(legacyPath()), { recursive: true });
      fs.writeFileSync(legacyPath(), '{not json', 'utf-8');

      const backend = createLocalStateBackend(scope, { baseDir });
      const state = await backend.loadState();

      expect(state.version).toBe(CURRENT_STATE_VERSION);
      expect(state.resources).toEqual({});
      expect(backend.readStateSource()).toBe('empty');
    });

    it('rejects a legacy aggregate whose registered migration fails instead of serving it', async () => {
      fs.mkdirSync(path.dirname(legacyPath()), { recursive: true });
      fs.writeFileSync(
        legacyPath(),
        JSON.stringify({
          version: '3.0',
          provider: scope.provider,
          app: scope.app,
          service: scope.service,
          stages: { prod: { resources: {} } },
        }),
        'utf-8',
      );
      registerStateMigration('3.0', () => {
        throw new Error('migration exploded');
      });

      const backend = createLocalStateBackend(scope, { baseDir });
      try {
        await expect(backend.loadState()).rejects.toThrow(StateCorruptError);
      } finally {
        clearStateMigrations();
      }
    });
  });

  describe('saveState', () => {
    it('writes the scoped document with independent lineage and serial', async () => {
      const backend = createLocalStateBackend(scope, { baseDir });
      const state: StateFile = {
        version: CURRENT_STATE_VERSION,
        provider: scope.provider,
        app: scope.app,
        service: scope.service,
        stages: { prod: { resources: { 'functions.a': makeResource('a') } } },
        resources: { 'functions.a': makeResource('a') },
      };
      await backend.saveState(state);

      const persisted = JSON.parse(fs.readFileSync(scopedPath(), 'utf-8'));
      expect(persisted.version).toBe(CURRENT_STATE_VERSION);
      expect(persisted.scope).toEqual({ stage: 'prod', region: 'cn-hangzhou' });
      expect(persisted.serial).toBe(1);
      expect(persisted.lineage).toBeDefined();
      expect(persisted.stages.prod.resources['functions.a']).toBeDefined();
      // Runtime projection is never persisted
      expect(persisted.resources).toBeUndefined();

      // Second save continues the lineage and increments the serial
      await backend.saveState(state);
      const second = JSON.parse(fs.readFileSync(scopedPath(), 'utf-8'));
      expect(second.serial).toBe(2);
      expect(second.lineage).toBe(persisted.lineage);
    });

    it('refuses to bind or write a scope without a resolved region', async () => {
      // Fail fast at binding — an empty region can never select a state.
      expect(() => createLocalStateBackend({ ...scope, region: '' }, { baseDir })).toThrow(
        /region/i,
      );
      expect(fs.existsSync(scopedPath())).toBe(false);
    });

    it('rejects a save whose identity differs from the bound scope', async () => {
      const backend = createLocalStateBackend(scope, { baseDir });
      const foreign: StateFile = {
        version: CURRENT_STATE_VERSION,
        provider: scope.provider,
        app: 'other-app',
        service: scope.service,
        stages: { prod: { resources: {} } },
        resources: {},
      };
      await expect(backend.saveState(foreign)).rejects.toThrow(StateScopeMismatchError);
      expect(fs.existsSync(scopedPath())).toBe(false);
    });

    it('isolates two regional documents of the same service+stage', async () => {
      const hangzhou = createLocalStateBackend(scope, { baseDir });
      const southeast = createLocalStateBackend(
        { ...scope, region: 'ap-southeast-1' },
        { baseDir },
      );
      await hangzhou.saveState({
        version: CURRENT_STATE_VERSION,
        provider: scope.provider,
        app: scope.app,
        service: scope.service,
        stages: { prod: { resources: { 'functions.a': makeResource('a') } } },
        resources: { 'functions.a': makeResource('a') },
      });
      expect(fs.existsSync(scopedPath())).toBe(true);
      expect(fs.existsSync(scopedPath().replace('cn-hangzhou', 'ap-southeast-1'))).toBe(false);

      await southeast.saveState({
        version: CURRENT_STATE_VERSION,
        provider: scope.provider,
        app: scope.app,
        service: scope.service,
        stages: { prod: { resources: { 'functions.b': makeResource('b') } } },
        resources: { 'functions.b': makeResource('b') },
      });
      const other = JSON.parse(
        fs.readFileSync(scopedPath().replace('cn-hangzhou', 'ap-southeast-1'), 'utf-8'),
      );
      expect(Object.keys(other.stages.prod.resources)).toEqual(['functions.b']);
    });
  });

  describe('patchPersisted', () => {
    it('patches the legacy aggregate while it is the state source', async () => {
      fs.mkdirSync(path.dirname(legacyPath()), { recursive: true });
      fs.writeFileSync(
        legacyPath(),
        JSON.stringify({
          version: '3.0',
          provider: scope.provider,
          app: scope.app,
          service: scope.service,
          stages: { prod: { resources: { 'functions.l': makeResource('l') } } },
        }),
        'utf-8',
      );
      const backend = createLocalStateBackend(scope, { baseDir });
      await backend.loadState();
      await backend.patchPersisted!({ managedBy: 'saas' });

      const patched = JSON.parse(fs.readFileSync(legacyPath(), 'utf-8'));
      expect(patched.managedBy).toBe('saas');
    });

    it('patches the scoped document once the split happened', async () => {
      const backend = createLocalStateBackend(scope, { baseDir });
      await backend.saveState({
        version: CURRENT_STATE_VERSION,
        provider: scope.provider,
        app: scope.app,
        service: scope.service,
        stages: { prod: { resources: {} } },
        resources: {},
      });
      await backend.patchPersisted!({ managedBy: 'saas' });
      const patched = JSON.parse(fs.readFileSync(scopedPath(), 'utf-8'));
      expect(patched.managedBy).toBe('saas');
    });
  });

  describe('probeWriteReadiness', () => {
    it('blocks mutations while the legacy aggregate is authoritative', async () => {
      fs.mkdirSync(path.dirname(legacyPath()), { recursive: true });
      fs.writeFileSync(
        legacyPath(),
        JSON.stringify({
          version: '3.0',
          provider: scope.provider,
          app: scope.app,
          service: scope.service,
          stages: { prod: { resources: { 'functions.l': makeResource('l') } } },
        }),
        'utf-8',
      );
      const backend = createLocalStateBackend(scope, { baseDir });
      const readiness = await backend.probeWriteReadiness();
      expect(readiness.ready).toBe(false);
      expect(readiness.source).toBe('legacy');
      expect(readiness.reason).toContain('migrate --to-regional');
    });

    it('allows fresh scoped writes and post-migration writes', async () => {
      const backend = createLocalStateBackend(scope, { baseDir });
      expect((await backend.probeWriteReadiness()).ready).toBe(true);

      await backend.saveState({
        version: CURRENT_STATE_VERSION,
        provider: scope.provider,
        app: scope.app,
        service: scope.service,
        stages: { prod: { resources: {} } },
        resources: {},
      });
      const after = await backend.probeWriteReadiness();
      expect(after.ready).toBe(true);
      expect(after.source).toBe('scoped');
    });
  });

  describe('locks', () => {
    it('locks the scoped path so two regions never share a lock', async () => {
      const backend = createLocalStateBackend(scope, { baseDir });
      const lockId = await backend.acquireLock('deploy');
      expect(fs.existsSync(`${scopedPath()}.si-lock`)).toBe(true);
      expect(await backend.readLock()).toMatchObject({ id: lockId, operation: 'deploy' });

      // A different region holds an independent lock
      const other = createLocalStateBackend({ ...scope, region: 'ap-southeast-1' }, { baseDir });
      const otherId = await other.acquireLock('deploy');
      expect(otherId).not.toBe(lockId);

      await backend.releaseLock(lockId);
      await other.releaseLock(otherId);
      expect(fs.existsSync(`${scopedPath()}.si-lock`)).toBe(false);
    });

    it('force-unlocks the scoped lock and refuses a foreign lock id', async () => {
      const backend = createLocalStateBackend(scope, { baseDir });
      expect(await backend.forceUnlock('no-lock-id')).toBe(false);

      const lockId = await backend.acquireLock('deploy');

      await expect(backend.forceUnlock('wrong-id')).rejects.toThrow(/mismatch/i);
      expect(fs.existsSync(`${scopedPath()}.si-lock`)).toBe(true);

      expect(await backend.forceUnlock(lockId)).toBe(true);
      expect(fs.existsSync(`${scopedPath()}.si-lock`)).toBe(false);
    });

    it('runs withLock with and without the onLockAcquired callback', async () => {
      const backend = createLocalStateBackend(scope, { baseDir });

      const result = await backend.withLock('deploy', async () => 'ok');
      expect(result).toBe('ok');
      expect(fs.existsSync(`${scopedPath()}.si-lock`)).toBe(false);

      const onLockAcquired = jest.fn();
      const withCallback = await backend.withLock(
        'deploy',
        async () => 42,
        undefined,
        onLockAcquired,
      );
      expect(withCallback).toBe(42);
      expect(onLockAcquired).toHaveBeenCalledWith(expect.any(String));
      expect(fs.existsSync(`${scopedPath()}.si-lock`)).toBe(false);
    });
  });
});
