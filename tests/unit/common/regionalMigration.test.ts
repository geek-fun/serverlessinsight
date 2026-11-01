import {
  RegionEvidence,
  collectRegionEvidence,
  planRegionalMigration,
  buildScopedDocument,
  applyRegionalMigration,
  rollbackRegionalMigration,
  RegionalMigrationPaths,
  KeyValueIO,
} from '../../../src/common/regionalMigration';
import { PersistedStateFile, ResourceState, CURRENT_STATE_VERSION } from '../../../src/types';

const makeResource = (region: string | undefined, id = 'fn-1'): ResourceState => ({
  mode: 'managed',
  region: region ?? '',
  definition: {},
  instances: [{ sid: `sid-${id}`, id }],
  lastUpdated: new Date().toISOString(),
});

const makeLegacy = (): PersistedStateFile => ({
  version: '3.0',
  provider: 'aliyun',
  app: 'app',
  service: 'svc',
  lineage: 'legacy-lineage',
  serial: 7,
  stages: {
    prod: {
      resources: {
        'functions.alpha': makeResource('cn-hangzhou', 'alpha'),
        'functions.beta': makeResource('ap-southeast-1', 'beta'),
      },
      shared: {
        'shared.logs': makeResource('cn-hangzhou', 'logs'),
      },
    },
  },
});

/** In-memory KeyValueIO with write tracking for failure-injection tests. */
const makeIo = () => {
  const store = new Map<string, unknown>();
  const written: string[] = [];
  const deleted: string[] = [];
  const io: KeyValueIO & { store: Map<string, unknown>; failOn?: string } = {
    store,
    read: async <T>(key: string): Promise<T | null> =>
      store.has(key) ? (store.get(key) as T) : null,
    write: async (key: string, data: unknown): Promise<void> => {
      if (io.failOn === key) {
        throw new Error(`injected write failure for ${key}`);
      }
      written.push(key);
      store.set(key, data);
    },
    delete: async (key: string): Promise<void> => {
      deleted.push(key);
      store.delete(key);
    },
  };
  return { io, store, written, deleted };
};

const makePaths = (): RegionalMigrationPaths => ({
  legacyKey: 'legacy/state.json',
  scopedPrefixBuilder: (stage: string, region: string) => `scoped/${stage}/${region}/state.json`,
  reportKey: (opId: string) => `reports/${opId}.json`,
  backupKey: (opId: string) => `backups/${opId}.json`,
});

const baseOptions = {
  provider: 'aliyun',
  app: 'app',
  service: 'svc',
};

describe('regionalMigration (issue #280 §6)', () => {
  describe('collectRegionEvidence', () => {
    it('collects region evidence for resources and shared entries', () => {
      const evidence: Array<{ stage: string; evidence: RegionEvidence }> =
        collectRegionEvidence(makeLegacy());
      expect(evidence).toHaveLength(3);
      const alpha = evidence.find(
        (e: { evidence: RegionEvidence }) => e.evidence.logicalId === 'functions.alpha',
      );
      expect(alpha?.evidence.region).toBe('cn-hangzhou');
      const shared = evidence.find(
        (e: { evidence: RegionEvidence }) => e.evidence.kind === 'shared',
      );
      expect(shared?.evidence.region).toBe('cn-hangzhou');
    });

    it('reports missing region as null evidence', () => {
      const legacy = makeLegacy();
      legacy.stages.prod.resources['functions.gamma'] = makeResource(undefined, 'gamma');
      const evidence: Array<{ stage: string; evidence: RegionEvidence }> =
        collectRegionEvidence(legacy);
      const gamma = evidence.find(
        (e: { evidence: RegionEvidence }) => e.evidence.logicalId === 'functions.gamma',
      );
      expect(gamma?.evidence.region).toBeNull();
    });
  });

  describe('planRegionalMigration', () => {
    it('groups resources by stage+region and classifies shared explicitly', () => {
      const plan = planRegionalMigration(makeLegacy(), makePaths(), baseOptions);
      expect(plan.documents).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            stage: 'prod',
            region: 'cn-hangzhou',
            resources: 1,
            shared: 1,
          }),
          expect.objectContaining({
            stage: 'prod',
            region: 'ap-southeast-1',
            resources: 1,
            shared: 0,
          }),
        ]),
      );
      expect(plan.unknown).toHaveLength(0);
      expect(plan.sourceVersion).toBe('3.0');
    });

    it('reports unknown-region resources without guessing a region', () => {
      const legacy = makeLegacy();
      legacy.stages.prod.resources['functions.gamma'] = makeResource(undefined, 'gamma');
      const plan = planRegionalMigration(legacy, makePaths(), baseOptions);
      expect(plan.unknown).toEqual([
        { stage: 'prod', logicalId: 'functions.gamma', kind: 'resource' },
      ]);
    });

    it('warns on a provider mismatch with the effective provider', () => {
      const plan = planRegionalMigration(makeLegacy(), makePaths(), {
        ...baseOptions,
        provider: 'tencent',
      });
      expect(plan.warnings).toHaveLength(1);
    });

    it('refuses to re-split a barrier-marked aggregate', () => {
      const legacy = { ...makeLegacy(), managedBy: 'regional' };
      expect(() => planRegionalMigration(legacy, makePaths(), baseOptions)).toThrow(
        /already marked as split/,
      );
    });

    it('refuses a non-V3 source', () => {
      const legacy = { ...makeLegacy(), version: '9.9' };
      expect(() => planRegionalMigration(legacy, makePaths(), baseOptions)).toThrow();
    });
  });

  describe('buildScopedDocument', () => {
    it('creates an independent V4 document containing only its own stage+region', () => {
      const legacy = makeLegacy();
      const plan = { sourceVersion: '3.0', sourceHash: 'hash', opId: 'op-1' };
      const doc = buildScopedDocument(
        legacy,
        plan,
        { stage: 'prod', region: 'cn-hangzhou' },
        baseOptions,
      );
      expect(doc.version).toBe(CURRENT_STATE_VERSION);
      expect(doc.scope).toEqual({ stage: 'prod', region: 'cn-hangzhou' });
      expect(Object.keys(doc.stages)).toEqual(['prod']);
      expect(Object.keys(doc.stages.prod.resources)).toEqual(['functions.alpha']);
      expect(doc.stages.prod.shared?.['shared.logs']).toBeDefined();
      // Independent lineage and fresh serial
      expect(doc.lineage).not.toBe('legacy-lineage');
      expect(doc.serial).toBe(1);
      expect(doc.migration).toMatchObject({
        opId: 'op-1',
        sourceVersion: '3.0',
        sourceHash: 'hash',
      });
    });

    it('does not duplicate shared ownership across regional documents', () => {
      const legacy = makeLegacy();
      const plan = { sourceVersion: '3.0', sourceHash: 'hash', opId: 'op-1' };
      const other = buildScopedDocument(
        legacy,
        plan,
        { stage: 'prod', region: 'ap-southeast-1' },
        baseOptions,
      );
      expect(other.stages.prod.shared ?? {}).toEqual({});
    });

    it('preserves console metadata and org ownership from the source', () => {
      const legacy = { ...makeLegacy(), orgId: 'org-1', appId: 'app-1', serviceId: 'svc-1' };
      const doc = buildScopedDocument(
        legacy,
        { sourceVersion: '3.0', sourceHash: 'hash', opId: 'op-1' },
        { stage: 'prod', region: 'cn-hangzhou' },
        baseOptions,
      );
      expect(doc.orgId).toBe('org-1');
      expect(doc.appId).toBe('app-1');
      expect(doc.serviceId).toBe('svc-1');
    });
  });

  describe('applyRegionalMigration', () => {
    it('backs up the source, writes scoped docs, barriers the legacy entry, writes the report', async () => {
      const { io, store, written } = makeIo();
      const legacy = makeLegacy();
      io.store.set('legacy/state.json', legacy);
      const paths = makePaths();
      const plan = planRegionalMigration(legacy, paths, baseOptions);

      const report = await applyRegionalMigration(io, legacy, paths, plan, baseOptions);
      expect(report.barrierWritten).toBe(true);

      // Backup first (protected writes), exact document
      const backupKey = paths.backupKey(plan.opId);
      expect(written[0]).toBe(backupKey);
      expect(store.get(backupKey)).toEqual(legacy);

      // Barrier keeps content but marks ownership handover
      const barriered = store.get('legacy/state.json') as PersistedStateFile;
      expect(barriered.managedBy).toBe('regional');
      expect(barriered.stages).toEqual(legacy.stages);

      // Scoped docs are stripped of the runtime projection and scope-stamped
      const doc = store.get('scoped/prod/cn-hangzhou/state.json') as Record<string, unknown>;
      expect(doc.scope).toEqual({ stage: 'prod', region: 'cn-hangzhou' });
      expect(doc).not.toHaveProperty('resources');

      // Report stored under the opId
      expect(store.get(paths.reportKey(plan.opId))).toMatchObject({ opId: plan.opId });
    });

    it('binds unknown-region resources only through the explicit option', async () => {
      const { io, store } = makeIo();
      const legacy = makeLegacy();
      legacy.stages.prod.resources['functions.gamma'] = makeResource(undefined, 'gamma');
      io.store.set('legacy/state.json', legacy);
      const paths = makePaths();

      const plan = planRegionalMigration(legacy, paths, baseOptions);
      await expect(applyRegionalMigration(io, legacy, paths, plan, baseOptions)).rejects.toThrow(
        /bind-unknown-region/,
      );

      await applyRegionalMigration(io, legacy, paths, plan, {
        ...baseOptions,
        bindUnknownRegion: 'CN-Hangzhou',
      });
      const doc = store.get('scoped/prod/cn-hangzhou/state.json') as {
        stages: Record<string, { resources: Record<string, { region: string }> }>;
      };
      expect(doc.stages.prod.resources['functions.gamma'].region).toBe('cn-hangzhou');
    });

    it('refuses to write when the source changed after planning', async () => {
      const { io, store } = makeIo();
      const legacy = makeLegacy();
      io.store.set('legacy/state.json', legacy);
      const paths = makePaths();
      const plan = planRegionalMigration(legacy, paths, baseOptions);
      // Source mutated between plan and apply
      (store.get('legacy/state.json') as PersistedStateFile).serial = 99;
      await expect(applyRegionalMigration(io, legacy, paths, plan, baseOptions)).rejects.toThrow(
        /hash mismatch/,
      );
    });

    it('keeps the legacy entry untouched when a scoped write fails partway', async () => {
      const { io, store } = makeIo();
      const legacy = makeLegacy();
      io.store.set('legacy/state.json', legacy);
      const paths = makePaths();
      const plan = planRegionalMigration(legacy, paths, baseOptions);
      io.failOn = 'scoped/prod/ap-southeast-1/state.json';

      await expect(applyRegionalMigration(io, legacy, paths, plan, baseOptions)).rejects.toThrow(
        /injected write failure/,
      );

      // Legacy entry unchanged (no barrier, no loss)
      expect(store.get('legacy/state.json')).toEqual(legacy);
    });
  });

  describe('rollbackRegionalMigration', () => {
    const applyFirst = async () => {
      const { io, store } = makeIo();
      const legacy = makeLegacy();
      store.set('legacy/state.json', legacy);
      const paths = makePaths();
      const plan = planRegionalMigration(legacy, paths, baseOptions);
      const report = await applyRegionalMigration(io, legacy, paths, plan, baseOptions);
      return { io, store, paths, plan, report };
    };

    it('restores the aggregate and removes pristine scoped documents', async () => {
      const { io, store, paths, plan } = await applyFirst();
      await rollbackRegionalMigration(io, paths, plan.opId);

      expect(store.get('legacy/state.json')).toEqual(makeLegacy());
      expect(store.has('scoped/prod/cn-hangzhou/state.json')).toBe(false);
      expect(store.has('scoped/prod/ap-southeast-1/state.json')).toBe(false);
      expect(store.has(paths.reportKey(plan.opId))).toBe(false);
      expect(store.has(paths.backupKey(plan.opId))).toBe(false);
    });

    it('refuses once a scoped document has independent regional writes', async () => {
      const { io, store, paths, plan } = await applyFirst();
      // Simulate a post-split deploy: serial advanced beyond the migration
      const doc = store.get('scoped/prod/cn-hangzhou/state.json') as Record<string, unknown>;
      doc.serial = 2;
      await expect(rollbackRegionalMigration(io, paths, plan.opId)).rejects.toThrow(
        /independent regional writes/,
      );
    });

    it('refuses without the migration report', async () => {
      const { io } = makeIo();
      await expect(rollbackRegionalMigration(io, makePaths(), 'missing-op')).rejects.toThrow(
        /migration report/,
      );
    });
  });
});
