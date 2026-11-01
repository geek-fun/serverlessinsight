import {
  RegionEvidence,
  collectRegionEvidence,
  planRegionalMigration,
  buildScopedDocument,
  applyRegionalMigration,
  rollbackRegionalMigration,
  hashDocument,
  RegionalMigrationPaths,
  RegionalMigrationPlan,
  KeyValueIO,
} from '../../../src/common/regionalMigration';
import {
  PersistedStateFile,
  ResourceState,
  CURRENT_STATE_VERSION,
  LEGACY_STATE_VERSION,
} from '../../../src/types';

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
  const io: KeyValueIO & {
    store: Map<string, unknown>;
    failOn?: string;
    failWith?: unknown;
  } = {
    store,
    read: async <T>(key: string): Promise<T | null> =>
      store.has(key) ? (store.get(key) as T) : null,
    write: async (key: string, data: unknown): Promise<void> => {
      if (io.failOn === key) {
        throw io.failWith ?? new Error(`injected write failure for ${key}`);
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

    it('reports missing region as null for shared entries too', () => {
      const legacy = makeLegacy();
      legacy.stages.prod.shared = {
        ...legacy.stages.prod.shared,
        'shared.orphan': makeResource(undefined, 'orphan'),
      };
      const evidence: Array<{ stage: string; evidence: RegionEvidence }> =
        collectRegionEvidence(legacy);
      const orphan = evidence.find(
        (e: { evidence: RegionEvidence }) => e.evidence.logicalId === 'shared.orphan',
      );
      expect(orphan?.evidence.kind).toBe('shared');
      expect(orphan?.evidence.region).toBeNull();
    });

    it('collects only resource evidence for a stage without shared entries', () => {
      const legacy = makeLegacy();
      legacy.stages.dev = {
        resources: { 'functions.devonly': makeResource('cn-hangzhou', 'devonly') },
      };

      const evidence: Array<{ stage: string; evidence: RegionEvidence }> =
        collectRegionEvidence(legacy);
      expect(evidence.filter((e) => e.stage === 'dev')).toEqual([
        {
          stage: 'dev',
          evidence: { logicalId: 'functions.devonly', kind: 'resource', region: 'cn-hangzhou' },
        },
      ]);
    });

    it('collects only shared evidence for a stage without a resources key', () => {
      const legacy = makeLegacy();
      legacy.stages.sharedonly = {
        shared: { 'shared.only': makeResource('cn-hangzhou', 'only') },
      } as unknown as PersistedStateFile['stages'][string];

      const evidence: Array<{ stage: string; evidence: RegionEvidence }> =
        collectRegionEvidence(legacy);
      expect(evidence.filter((e) => e.stage === 'sharedonly')).toEqual([
        {
          stage: 'sharedonly',
          evidence: { logicalId: 'shared.only', kind: 'shared', region: 'cn-hangzhou' },
        },
      ]);
    });

    it('returns no evidence when the aggregate has no stages', () => {
      const legacy = { ...makeLegacy(), stages: undefined } as unknown as PersistedStateFile;

      expect(collectRegionEvidence(legacy)).toEqual([]);
    });
  });

  describe('hashDocument', () => {
    it('is deterministic for the same content and changes with it', () => {
      const doc = makeLegacy();
      expect(hashDocument(doc)).toMatch(/^[0-9a-f]{64}$/);
      expect(hashDocument(doc)).toBe(hashDocument(doc));
      expect(hashDocument(JSON.parse(JSON.stringify(doc)))).toBe(hashDocument(doc));
      expect(hashDocument({ ...doc, serial: (doc.serial ?? 0) + 1 })).not.toBe(hashDocument(doc));
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

    it('defaults the source version when the aggregate has no version field', () => {
      const legacy: Record<string, unknown> = { ...makeLegacy() };
      delete legacy.version;

      const plan = planRegionalMigration(
        legacy as unknown as PersistedStateFile,
        makePaths(),
        baseOptions,
      );
      expect(plan.sourceVersion).toBe(LEGACY_STATE_VERSION);
    });

    it('skips stages outside the selected stage option from groups and unknowns', () => {
      const legacy = makeLegacy();
      legacy.stages.dev = {
        resources: { 'functions.devonly': makeResource(undefined, 'devonly') },
        shared: { 'shared.devlogs': makeResource('cn-hangzhou', 'devlogs') },
      };

      const prodPlan = planRegionalMigration(legacy, makePaths(), {
        ...baseOptions,
        stage: 'prod',
      });
      expect(prodPlan.documents).toHaveLength(2);
      expect(prodPlan.documents.every((d) => d.stage === 'prod')).toBe(true);
      expect(prodPlan.unknown).toHaveLength(0);

      const devPlan = planRegionalMigration(legacy, makePaths(), { ...baseOptions, stage: 'dev' });
      expect(devPlan.documents).toEqual([
        { stage: 'dev', region: 'cn-hangzhou', resources: 0, shared: 1 },
      ]);
      expect(devPlan.unknown).toEqual([
        { stage: 'dev', logicalId: 'functions.devonly', kind: 'resource' },
      ]);
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

    it('rejects path-unsafe stage and region values', () => {
      const legacy = makeLegacy();
      const plan = { sourceVersion: '3.0', sourceHash: 'hash', opId: 'op-1' };

      expect(() =>
        buildScopedDocument(
          legacy,
          plan,
          { stage: '../escape', region: 'cn-hangzhou' },
          baseOptions,
        ),
      ).toThrow();
      expect(() =>
        buildScopedDocument(legacy, plan, { stage: 'prod', region: '' }, baseOptions),
      ).toThrow();
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

    it('refuses to apply when the source document is missing from io', async () => {
      const { io } = makeIo();
      const paths = makePaths();
      // Plan was produced against a snapshot; io holds nothing when applying
      const plan = planRegionalMigration(makeLegacy(), paths, baseOptions);

      await expect(
        applyRegionalMigration(io, makeLegacy(), paths, plan, baseOptions),
      ).rejects.toThrow(/disappeared/);
    });

    it('creates a document for a stage whose resources are all unknown-region', async () => {
      const { io, store } = makeIo();
      const legacy = makeLegacy();
      legacy.stages.dev = {
        resources: { 'functions.devonly': makeResource(undefined, 'devonly') },
        shared: { 'shared.devlogs': makeResource(undefined, 'devlogs') },
      };
      io.store.set('legacy/state.json', legacy);
      const paths = makePaths();

      const plan = planRegionalMigration(legacy, paths, baseOptions);
      // The dev stage produced no group of its own — only unknown evidence
      expect(plan.documents.every((d) => d.stage === 'prod')).toBe(true);
      expect(plan.unknown).toHaveLength(2);

      await applyRegionalMigration(io, legacy, paths, plan, {
        ...baseOptions,
        bindUnknownRegion: 'CN-Hangzhou',
      });

      const doc = store.get('scoped/dev/cn-hangzhou/state.json') as {
        scope: { stage: string; region: string };
        stages: Record<
          string,
          {
            resources: Record<string, { region: string }>;
            shared: Record<string, { region: string }>;
          }
        >;
      };
      expect(doc.scope).toEqual({ stage: 'dev', region: 'cn-hangzhou' });
      expect(doc.stages.dev.resources['functions.devonly'].region).toBe('cn-hangzhou');
      expect(doc.stages.dev.shared['shared.devlogs'].region).toBe('cn-hangzhou');
    });

    it('reports the partial failure even when the thrown value is not an Error', async () => {
      const { io, store } = makeIo();
      const legacy = makeLegacy();
      io.store.set('legacy/state.json', legacy);
      const paths = makePaths();
      const plan = planRegionalMigration(legacy, paths, baseOptions);
      io.failOn = 'scoped/prod/cn-hangzhou/state.json';
      io.failWith = 'plain failure';

      await expect(applyRegionalMigration(io, legacy, paths, plan, baseOptions)).rejects.toBe(
        'plain failure',
      );

      // Legacy entry unchanged (no barrier, no loss)
      expect(store.get('legacy/state.json')).toEqual(legacy);
    });

    it('writes empty documents for plan targets the source cannot prove and skips vanished unknowns', async () => {
      const { io, store } = makeIo();
      const legacy = makeLegacy();
      // A stage recorded with shared only (no resources key) and one with resources only
      legacy.stages.sharedonly = {
        shared: { 'shared.only': makeResource('cn-hangzhou', 'only') },
      } as unknown as PersistedStateFile['stages'][string];
      delete legacy.stages.prod.shared;
      io.store.set('legacy/state.json', legacy);
      const paths = makePaths();

      // Hand-crafted plan: a stage absent from the source plus an unknown item
      // whose logicalId no longer exists — the split never invents ownership.
      const plan: RegionalMigrationPlan = {
        opId: 'op-defensive',
        sourceVersion: '3.0',
        sourceHash: hashDocument(legacy),
        documents: [
          { stage: 'prod', region: 'cn-hangzhou', resources: 1, shared: 0 },
          { stage: 'sharedonly', region: 'cn-hangzhou', resources: 0, shared: 1 },
          { stage: 'ghost', region: 'cn-hangzhou', resources: 0, shared: 0 },
        ],
        unknown: [{ stage: 'prod', logicalId: 'functions.vanished', kind: 'resource' }],
        warnings: [],
      };

      await applyRegionalMigration(io, legacy, paths, plan, {
        ...baseOptions,
        bindUnknownRegion: 'cn-hangzhou',
      });

      const ghost = store.get('scoped/ghost/cn-hangzhou/state.json') as {
        stages: Record<string, { resources: Record<string, unknown>; shared?: unknown }>;
      };
      expect(ghost.stages.ghost.resources).toEqual({});

      const sharedOnly = store.get('scoped/sharedonly/cn-hangzhou/state.json') as {
        stages: Record<
          string,
          { resources: Record<string, unknown>; shared?: Record<string, unknown> }
        >;
      };
      expect(sharedOnly.stages.sharedonly.resources).toEqual({});
      expect(sharedOnly.stages.sharedonly.shared?.['shared.only']).toBeDefined();

      // The vanished unknown logicalId is skipped — no phantom resource lands in the doc
      const prodDoc = store.get('scoped/prod/cn-hangzhou/state.json') as {
        stages: Record<string, { resources: Record<string, unknown>; shared?: unknown }>;
      };
      expect(Object.keys(prodDoc.stages.prod.resources)).toEqual(['functions.alpha']);
      expect(prodDoc.stages.prod.shared).toBeUndefined();
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
      // The exact fixture instance — the rollback assertion must compare
      // against the SAME object (timestamps make two makeLegacy() calls
      // unequal when they straddle a millisecond).
      return { io, store, paths, plan, report, legacy };
    };

    it('restores the aggregate and removes pristine scoped documents', async () => {
      const { io, store, paths, plan, legacy } = await applyFirst();
      await rollbackRegionalMigration(io, paths, plan.opId);

      expect(store.get('legacy/state.json')).toEqual(legacy);
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

    it('refuses when a scoped document has no migration provenance', async () => {
      const { io, store, paths, plan } = await applyFirst();
      // A deploy-created document carries no migration info — not the migration's creation
      const doc = store.get('scoped/prod/cn-hangzhou/state.json') as Record<string, unknown>;
      delete doc.migration;
      await expect(rollbackRegionalMigration(io, paths, plan.opId)).rejects.toThrow(
        /independent regional writes/,
      );
    });

    it('rolls back pristine scoped documents even without a recorded serial', async () => {
      const { io, store, paths, plan, legacy } = await applyFirst();
      const doc = store.get('scoped/prod/cn-hangzhou/state.json') as Record<string, unknown>;
      delete doc.serial;

      await rollbackRegionalMigration(io, paths, plan.opId);

      expect(store.get('legacy/state.json')).toEqual(legacy);
      expect(store.has('scoped/prod/cn-hangzhou/state.json')).toBe(false);
    });

    it('refuses without the migration report', async () => {
      const { io } = makeIo();
      await expect(rollbackRegionalMigration(io, makePaths(), 'missing-op')).rejects.toThrow(
        /migration report/,
      );
    });

    it('refuses when the pre-migration backup is missing even though the report exists', async () => {
      const { io, store, paths, plan } = await applyFirst();
      store.delete(paths.backupKey(plan.opId));

      await expect(rollbackRegionalMigration(io, paths, plan.opId)).rejects.toThrow(
        /backup .* is missing|missing/,
      );
    });

    it('tolerates scoped documents that are already missing during rollback', async () => {
      const { io, store, paths, plan, legacy } = await applyFirst();
      store.delete('scoped/prod/ap-southeast-1/state.json');

      await rollbackRegionalMigration(io, paths, plan.opId);

      expect(store.get('legacy/state.json')).toEqual(legacy);
      expect(store.has('scoped/prod/cn-hangzhou/state.json')).toBe(false);
      expect(store.has(paths.reportKey(plan.opId))).toBe(false);
      expect(store.has(paths.backupKey(plan.opId))).toBe(false);
    });
  });
});
