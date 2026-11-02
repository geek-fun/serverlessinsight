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
  withIoLock,
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
      store.set(key, structuredClone(data));
    },
    putIfAbsent: async (key: string, data: unknown): Promise<boolean> => {
      if (store.has(key)) return false;
      written.push(key);
      store.set(key, structuredClone(data));
      return true;
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
  scopedPrefixBuilder: (stage: string, region: string) =>
    `scoped/app/svc_${stage}_${region}_state.json`,
  reportKey: (opId: string) => `reports/${opId}.json`,
  backupKey: (opId: string) => `backups/${opId}.json`,
  serviceBindingKey: 'scoped/app/svc_provider.json',
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
      const plan = planRegionalMigration(makeLegacy(), baseOptions);
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
      const plan = planRegionalMigration(legacy, baseOptions);
      expect(plan.unknown).toEqual([
        { stage: 'prod', logicalId: 'functions.gamma', kind: 'resource' },
      ]);
    });

    it('warns on a provider mismatch with the effective provider', () => {
      const plan = planRegionalMigration(makeLegacy(), {
        ...baseOptions,
        provider: 'tencent',
      });
      expect(plan.warnings).toHaveLength(1);
    });

    it('refuses to re-split a barrier-marked aggregate', () => {
      const legacy = { ...makeLegacy(), managedBy: 'regional' };
      expect(() => planRegionalMigration(legacy, baseOptions)).toThrow(/already marked as split/);
    });

    it('refuses a source owned by the SaaS Console before any other check', () => {
      const legacy = { ...makeLegacy(), managedBy: 'saas', version: '9.9' };
      expect(() => planRegionalMigration(legacy, baseOptions)).toThrow(/managedBy=saas/);
    });

    it('reports the already-split refusal (not a version error) for a V4 tombstone', () => {
      const legacy = { ...makeLegacy(), version: CURRENT_STATE_VERSION, managedBy: 'regional' };
      expect(() => planRegionalMigration(legacy, baseOptions)).toThrow(/already marked as split/);
    });

    it('refuses a non-V3 source', () => {
      const legacy = { ...makeLegacy(), version: '9.9' };
      expect(() => planRegionalMigration(legacy, baseOptions)).toThrow(
        /Expected a legacy V3.0 state aggregate/,
      );
    });

    it('defaults the source version when the aggregate has no version field', () => {
      const legacy: Record<string, unknown> = { ...makeLegacy() };
      delete legacy.version;

      const plan = planRegionalMigration(legacy as unknown as PersistedStateFile, baseOptions);
      expect(plan.sourceVersion).toBe(LEGACY_STATE_VERSION);
    });

    it('skips stages outside the selected stage option from groups and unknowns', () => {
      const legacy = makeLegacy();
      legacy.stages.dev = {
        resources: { 'functions.devonly': makeResource(undefined, 'devonly') },
        shared: { 'shared.devlogs': makeResource('cn-hangzhou', 'devlogs') },
      };

      const prodPlan = planRegionalMigration(legacy, {
        ...baseOptions,
        stage: 'prod',
      });
      expect(prodPlan.documents).toHaveLength(2);
      expect(prodPlan.documents.every((d) => d.stage === 'prod')).toBe(true);
      expect(prodPlan.unknown).toHaveLength(0);

      const devPlan = planRegionalMigration(legacy, { ...baseOptions, stage: 'dev' });
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
    it('backs up the source, writes scoped docs under scope locks, barriers the legacy entry, records the binding and writes the report', async () => {
      const { io, store, written } = makeIo();
      const legacy = makeLegacy();
      io.store.set('legacy/state.json', legacy);
      const paths = makePaths();
      const plan = planRegionalMigration(legacy, baseOptions);

      const report = await applyRegionalMigration(io, legacy, paths, plan, baseOptions);
      expect(report.barrierWritten).toBe(true);

      // Backup first (protected writes), exact document
      const backupKey = paths.backupKey(plan.opId);
      expect(written.filter((key) => !key.endsWith('.si-lock'))[0]).toBe(backupKey);
      expect(store.get(backupKey)).toEqual(legacy);

      // Barrier is a V4 TOMBSTONE: content preserved, ownership handed over
      const tombstone = store.get('legacy/state.json') as PersistedStateFile;
      expect(tombstone.version).toBe(CURRENT_STATE_VERSION);
      expect(tombstone.managedBy).toBe('regional');
      expect(tombstone.migration).toMatchObject({
        opId: plan.opId,
        sourceVersion: '3.0',
        sourceHash: plan.sourceHash,
        migratedAt: expect.any(String),
      });
      expect(tombstone.stages).toEqual(legacy.stages);

      // Scoped docs are stripped of the runtime projection and scope-stamped
      const doc = store.get('scoped/app/svc_prod_cn-hangzhou_state.json') as Record<
        string,
        unknown
      >;
      expect(doc.scope).toEqual({ stage: 'prod', region: 'cn-hangzhou' });
      expect(doc).not.toHaveProperty('resources');

      // Each target write ran under its own io lock entry (created, then removed)
      expect(written).toContain('scoped/app/svc_prod_cn-hangzhou_state.json.si-lock');
      expect(written).toContain('scoped/app/svc_prod_ap-southeast-1_state.json.si-lock');
      expect([...store.keys()].filter((key) => key.endsWith('.si-lock'))).toEqual([]);

      // Reserve service identity before writing regional documents
      expect(written.indexOf(paths.serviceBindingKey)).toBeLessThan(
        written.indexOf('scoped/app/svc_prod_ap-southeast-1_state.json'),
      );
      expect(store.get(paths.serviceBindingKey)).toEqual({
        provider: 'aliyun',
        recordedAt: expect.any(String),
      });

      // Report stored under the opId and carries the ACTUAL written doc set
      expect(store.get(paths.reportKey(plan.opId))).toMatchObject({
        opId: plan.opId,
        documents: [
          { stage: 'prod', region: 'cn-hangzhou' },
          { stage: 'prod', region: 'ap-southeast-1' },
        ],
      });
      expect(report.documents).toHaveLength(2);
    });

    it('binds unknown-region resources only through the explicit option and never into sibling regions', async () => {
      const { io, store } = makeIo();
      const legacy = makeLegacy();
      legacy.stages.prod.resources['functions.gamma'] = makeResource(undefined, 'gamma');
      io.store.set('legacy/state.json', legacy);
      const paths = makePaths();

      const plan = planRegionalMigration(legacy, baseOptions);
      await expect(applyRegionalMigration(io, legacy, paths, plan, baseOptions)).rejects.toThrow(
        /bind-unknown-region/,
      );

      await applyRegionalMigration(io, legacy, paths, plan, {
        ...baseOptions,
        bindUnknownRegion: 'CN-Hangzhou',
      });
      const doc = store.get('scoped/app/svc_prod_cn-hangzhou_state.json') as {
        stages: Record<string, { resources: Record<string, { region: string }> }>;
      };
      expect(doc.stages.prod.resources['functions.gamma'].region).toBe('cn-hangzhou');

      // The sibling region of the same stage must NOT receive the unknown resource
      const sibling = store.get('scoped/app/svc_prod_ap-southeast-1_state.json') as {
        stages: Record<string, { resources: Record<string, unknown> }>;
      };
      expect(sibling.stages.prod.resources).toEqual({ 'functions.beta': expect.anything() });
    });

    it('refuses to write when the source changed after planning', async () => {
      const { io, store } = makeIo();
      const legacy = makeLegacy();
      io.store.set('legacy/state.json', legacy);
      const paths = makePaths();
      const plan = planRegionalMigration(legacy, baseOptions);
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
      const plan = planRegionalMigration(legacy, baseOptions);
      io.failOn = 'scoped/app/svc_prod_ap-southeast-1_state.json';

      await expect(applyRegionalMigration(io, legacy, paths, plan, baseOptions)).rejects.toThrow(
        /injected write failure/,
      );

      // Legacy entry unchanged (no barrier, no loss); earlier documents remain valid
      expect(store.get('legacy/state.json')).toEqual(legacy);
      expect(store.has('scoped/app/svc_prod_cn-hangzhou_state.json')).toBe(true);
      expect(store.has('scoped/app/svc_prod_ap-southeast-1_state.json')).toBe(false);
    });

    it('refuses to apply when the source document is missing from io', async () => {
      const { io } = makeIo();
      const paths = makePaths();
      // Plan was produced against a snapshot; io holds nothing when applying
      const plan = planRegionalMigration(makeLegacy(), baseOptions);

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

      const plan = planRegionalMigration(legacy, baseOptions);
      // The dev stage produced no group of its own — only unknown evidence
      expect(plan.documents.every((d) => d.stage === 'prod')).toBe(true);
      expect(plan.unknown).toHaveLength(2);

      const report = await applyRegionalMigration(io, legacy, paths, plan, {
        ...baseOptions,
        bindUnknownRegion: 'CN-Hangzhou',
      });

      const doc = store.get('scoped/app/svc_dev_cn-hangzhou_state.json') as {
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

      // The report's documents are the actual targets: 2 planned prod docs + the bound dev doc
      expect(report.documents).toHaveLength(3);
      expect(report.documents).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ stage: 'dev', region: 'cn-hangzhou' }),
          expect.objectContaining({ stage: 'prod', region: 'cn-hangzhou' }),
          expect.objectContaining({ stage: 'prod', region: 'ap-southeast-1' }),
        ]),
      );
    });

    it('reports the partial failure even when the thrown value is not an Error', async () => {
      const { io, store } = makeIo();
      const legacy = makeLegacy();
      io.store.set('legacy/state.json', legacy);
      const paths = makePaths();
      const plan = planRegionalMigration(legacy, baseOptions);
      io.failOn = 'scoped/app/svc_prod_cn-hangzhou_state.json';
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

      const ghost = store.get('scoped/app/svc_ghost_cn-hangzhou_state.json') as {
        stages: Record<string, { resources: Record<string, unknown>; shared?: unknown }>;
      };
      expect(ghost.stages.ghost.resources).toEqual({});

      const sharedOnly = store.get('scoped/app/svc_sharedonly_cn-hangzhou_state.json') as {
        stages: Record<
          string,
          { resources: Record<string, unknown>; shared?: Record<string, unknown> }
        >;
      };
      expect(sharedOnly.stages.sharedonly.resources).toEqual({});
      expect(sharedOnly.stages.sharedonly.shared?.['shared.only']).toBeDefined();

      // The vanished unknown logicalId is skipped — no phantom resource lands in the doc
      const prodDoc = store.get('scoped/app/svc_prod_cn-hangzhou_state.json') as {
        stages: Record<string, { resources: Record<string, unknown>; shared?: unknown }>;
      };
      expect(Object.keys(prodDoc.stages.prod.resources)).toEqual(['functions.alpha']);
      expect(prodDoc.stages.prod.shared).toBeUndefined();
    });

    it('throws INCOMPLETE_STAGE_COVERAGE before any write when a stage would be stranded', async () => {
      const { io, store, written } = makeIo();
      const legacy = makeLegacy();
      legacy.stages.dev = {
        resources: { 'functions.devonly': makeResource('cn-hangzhou', 'devonly') },
      };
      io.store.set('legacy/state.json', legacy);
      const paths = makePaths();

      // A plan restricted to prod leaves the dev stage uncovered
      const plan = planRegionalMigration(legacy, { ...baseOptions, stage: 'prod' });
      expect(plan.documents.every((d) => d.stage === 'prod')).toBe(true);

      await expect(applyRegionalMigration(io, legacy, paths, plan, baseOptions)).rejects.toThrow(
        /stranded/,
      );

      // Nothing at all was written — not even the backup
      expect(written).toEqual([]);
      expect(store.get('legacy/state.json')).toEqual(legacy);
    });

    it('refuses a conflicting service provider binding before anything is written', async () => {
      const { io, store, written } = makeIo();
      const legacy = makeLegacy();
      io.store.set('legacy/state.json', legacy);
      const paths = makePaths();
      store.set(paths.serviceBindingKey, {
        provider: 'tencent',
        recordedAt: '2024-01-01T00:00:00.000Z',
      });

      const plan = planRegionalMigration(legacy, baseOptions);
      await expect(applyRegionalMigration(io, legacy, paths, plan, baseOptions)).rejects.toThrow(
        /Provider mismatch for this service/,
      );

      expect(written).toEqual([]);
      expect(store.get('legacy/state.json')).toEqual(legacy);
    });

    it('refuses a target document created by a different migration without partial mutation', async () => {
      const { io, store } = makeIo();
      const legacy = makeLegacy();
      io.store.set('legacy/state.json', legacy);
      const paths = makePaths();
      const plan = planRegionalMigration(legacy, baseOptions);

      // An independent regional document from a DIFFERENT operation already lives here
      const foreign = {
        version: CURRENT_STATE_VERSION,
        provider: 'aliyun',
        app: 'app',
        service: 'svc',
        scope: { stage: 'prod', region: 'cn-hangzhou' },
        lineage: 'independent-lineage',
        serial: 3,
        migration: {
          opId: 'another-op',
          sourceVersion: '3.0',
          sourceHash: 'x',
          migratedAt: '2024-01-01T00:00:00.000Z',
        },
        stages: { prod: { resources: {} } },
      };
      store.set('scoped/app/svc_prod_cn-hangzhou_state.json', foreign);

      await expect(applyRegionalMigration(io, legacy, paths, plan, baseOptions)).rejects.toThrow(
        /already exists/,
      );

      // No partial mutation: the foreign doc, the legacy entry and sibling targets untouched
      expect(store.get('scoped/app/svc_prod_cn-hangzhou_state.json')).toEqual(foreign);
      expect(store.get('legacy/state.json')).toEqual(legacy);
      expect(store.has('scoped/app/svc_prod_ap-southeast-1_state.json')).toBe(false);
    });

    it('resumes a target from the same opId preserving lineage/serial', async () => {
      const { io, store } = makeIo();
      const legacy = makeLegacy();
      io.store.set('legacy/state.json', legacy);
      const paths = makePaths();
      const plan = planRegionalMigration(legacy, baseOptions);

      // First run fails partway: the cn-hangzhou doc is written, ap-southeast-1 is not
      io.failOn = 'scoped/app/svc_prod_ap-southeast-1_state.json';
      await expect(applyRegionalMigration(io, legacy, paths, plan, baseOptions)).rejects.toThrow(
        /injected write failure/,
      );
      const firstDoc = store.get('scoped/app/svc_prod_cn-hangzhou_state.json') as Record<
        string,
        unknown
      >;

      // Re-run with the SAME plan (same opId): the written doc resumes in place
      io.failOn = undefined;
      await applyRegionalMigration(io, legacy, paths, plan, baseOptions);

      const resumed = store.get('scoped/app/svc_prod_cn-hangzhou_state.json') as Record<
        string,
        unknown
      >;
      expect(resumed.lineage).toBe(firstDoc.lineage);
      expect(resumed.serial).toBe(firstDoc.serial);
      expect((resumed.migration as { opId: string }).opId).toBe(plan.opId);
    });

    it('reuses an existing matching service binding without rewriting it', async () => {
      const { io, store, written } = makeIo();
      const legacy = makeLegacy();
      io.store.set('legacy/state.json', legacy);
      const paths = makePaths();
      const seeded = { provider: 'aliyun', recordedAt: '2024-01-01T00:00:00.000Z' };
      store.set(paths.serviceBindingKey, seeded);

      const plan = planRegionalMigration(legacy, baseOptions);
      await applyRegionalMigration(io, legacy, paths, plan, baseOptions);

      // Same object identity — the apply must not rewrite a matching binding
      expect(store.get(paths.serviceBindingKey)).toBe(seeded);
      expect(written).not.toContain(paths.serviceBindingKey);
    });

    it('reports exactly the written docTargets for an unknown-only migration', async () => {
      const { io, store } = makeIo();
      const legacy = makeLegacy();
      // Every resource lacks region evidence: no region groups at all
      legacy.stages.prod.resources = {
        'functions.mystery': makeResource(undefined, 'mystery'),
      };
      delete legacy.stages.prod.shared;
      io.store.set('legacy/state.json', legacy);
      const paths = makePaths();

      const plan = planRegionalMigration(legacy, baseOptions);
      expect(plan.documents).toEqual([]);
      expect(plan.unknown).toEqual([
        { stage: 'prod', logicalId: 'functions.mystery', kind: 'resource' },
      ]);

      const report = await applyRegionalMigration(io, legacy, paths, plan, {
        ...baseOptions,
        bindUnknownRegion: 'CN-Beijing',
      });

      expect(report.documents).toEqual([
        { stage: 'prod', region: 'cn-beijing', resources: 1, shared: 0 },
      ]);
      const doc = store.get('scoped/app/svc_prod_cn-beijing_state.json') as {
        stages: Record<string, { resources: Record<string, { region: string }> }>;
      };
      expect(doc.stages.prod.resources['functions.mystery'].region).toBe('cn-beijing');
      // The binding-generated doc set is what rollback later validates and removes
      expect(store.has('scoped/app/svc_prod_cn-beijing_state.json')).toBe(true);
    });
  });

  describe('rollbackRegionalMigration', () => {
    const applyFirst = async () => {
      const { io, store } = makeIo();
      const legacy = makeLegacy();
      store.set('legacy/state.json', legacy);
      const paths = makePaths();
      const plan = planRegionalMigration(legacy, baseOptions);
      const report = await applyRegionalMigration(io, legacy, paths, plan, baseOptions);
      // The exact fixture instance — the rollback assertion must compare
      // against the SAME object (timestamps make two makeLegacy() calls
      // unequal when they straddle a millisecond).
      return { io, store, paths, plan, report, legacy };
    };

    it('restores the aggregate and removes pristine scoped documents', async () => {
      const { io, store, paths, plan, legacy } = await applyFirst();
      await rollbackRegionalMigration(io, paths, plan.opId);

      const restored = store.get('legacy/state.json') as PersistedStateFile;
      expect(restored).toEqual(legacy);
      // The backup restore is the exact pre-split V3 aggregate — no tombstone markers
      expect(restored.version).toBe('3.0');
      expect(restored.managedBy).toBeUndefined();
      expect(restored.migration).toBeUndefined();
      expect(store.has('scoped/app/svc_prod_cn-hangzhou_state.json')).toBe(false);
      expect(store.has('scoped/app/svc_prod_ap-southeast-1_state.json')).toBe(false);
      expect(store.has(paths.reportKey(plan.opId))).toBe(false);
      expect(store.has(paths.backupKey(plan.opId))).toBe(false);
    });

    it('refuses once a scoped document has independent regional writes and deletes nothing', async () => {
      const { io, store, paths, plan } = await applyFirst();
      // Simulate a post-split deploy: serial advanced beyond the migration
      const doc = store.get('scoped/app/svc_prod_cn-hangzhou_state.json') as Record<
        string,
        unknown
      >;
      doc.serial = 2;
      await expect(rollbackRegionalMigration(io, paths, plan.opId)).rejects.toThrow(
        /independent regional writes/,
      );

      // Two-phase refusal: verification happens BEFORE any deletion — the pristine
      // sibling document, the barrier and the artifacts all still exist
      expect(store.has('scoped/app/svc_prod_ap-southeast-1_state.json')).toBe(true);
      expect(store.has('legacy/state.json')).toBe(true);
      expect(store.has(paths.reportKey(plan.opId))).toBe(true);
      expect(store.has(paths.backupKey(plan.opId))).toBe(true);
    });

    it('refuses when a scoped document has no migration provenance', async () => {
      const { io, store, paths, plan } = await applyFirst();
      // A deploy-created document carries no migration info — not the migration's creation
      const doc = store.get('scoped/app/svc_prod_cn-hangzhou_state.json') as Record<
        string,
        unknown
      >;
      delete doc.migration;
      await expect(rollbackRegionalMigration(io, paths, plan.opId)).rejects.toThrow(
        /independent regional writes/,
      );
    });

    it('refuses rollback when a scoped document lost its recorded serial', async () => {
      const { io, store, paths, plan } = await applyFirst();
      const doc = store.get('scoped/app/svc_prod_cn-hangzhou_state.json') as Record<
        string,
        unknown
      >;
      delete doc.serial;

      await expect(rollbackRegionalMigration(io, paths, plan.opId)).rejects.toThrow();

      expect((store.get('legacy/state.json') as PersistedStateFile).managedBy).toBe('regional');
      expect(store.has('scoped/app/svc_prod_cn-hangzhou_state.json')).toBe(true);
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
      store.delete('scoped/app/svc_prod_ap-southeast-1_state.json');

      await rollbackRegionalMigration(io, paths, plan.opId);

      expect(store.get('legacy/state.json')).toEqual(legacy);
      expect(store.has('scoped/app/svc_prod_cn-hangzhou_state.json')).toBe(false);
      expect(store.has(paths.reportKey(plan.opId))).toBe(false);
      expect(store.has(paths.backupKey(plan.opId))).toBe(false);
    });
  });
  describe('locked target validation and interruption recovery', () => {
    it('revalidates a target created between discovery and exclusive lock acquisition', async () => {
      const { io, store } = makeIo();
      const legacy = makeLegacy();
      const paths = makePaths();
      store.set(paths.legacyKey, legacy);
      const plan = planRegionalMigration(legacy, baseOptions);
      const target = paths.scopedPrefixBuilder('prod', 'cn-hangzhou');
      const original = io.putIfAbsent!;
      io.putIfAbsent = async (key, data) => {
        if (key === `${target}.si-lock`) store.set(target, { serial: 9, lineage: 'independent' });
        return original(key, data);
      };
      await expect(applyRegionalMigration(io, legacy, paths, plan, baseOptions)).rejects.toThrow(
        /Refusing to overwrite/,
      );
      expect(store.get(target)).toEqual({ serial: 9, lineage: 'independent' });
      expect(store.has(paths.scopedPrefixBuilder('prod', 'ap-southeast-1'))).toBe(false);
    });

    it('refuses same-operation recovery when a written target gained independent resources', async () => {
      const { io, store } = makeIo();
      const legacy = makeLegacy();
      const paths = makePaths();
      store.set(paths.legacyKey, legacy);
      const plan = planRegionalMigration(legacy, baseOptions);
      io.failOn = paths.scopedPrefixBuilder('prod', 'ap-southeast-1');
      await expect(applyRegionalMigration(io, legacy, paths, plan, baseOptions)).rejects.toThrow();
      const key = paths.scopedPrefixBuilder('prod', 'cn-hangzhou');
      const state = store.get(key) as PersistedStateFile;
      state.serial = 9;
      state.stages.prod.resources['functions.live'] = makeResource('cn-hangzhou', 'live');
      io.failOn = undefined;
      await expect(applyRegionalMigration(io, legacy, paths, plan, baseOptions)).rejects.toThrow(
        /Refusing to overwrite/,
      );
      expect(
        (store.get(key) as PersistedStateFile).stages.prod.resources['functions.live'],
      ).toBeDefined();
    });

    it('rejects changed recovery options and permits rollback before a final report exists', async () => {
      const { io, store } = makeIo();
      const legacy = makeLegacy();
      const paths = makePaths();
      store.set(paths.legacyKey, legacy);
      const plan = planRegionalMigration(legacy, baseOptions);
      io.failOn = paths.scopedPrefixBuilder('prod', 'ap-southeast-1');
      await expect(applyRegionalMigration(io, legacy, paths, plan, baseOptions)).rejects.toThrow();
      io.failOn = undefined;
      await expect(
        applyRegionalMigration(io, legacy, paths, plan, { ...baseOptions, service: 'different' }),
      ).rejects.toThrow(/incomplete/);
      await rollbackRegionalMigration(io, paths, plan.opId);
      expect(store.get(paths.legacyKey)).toEqual(legacy);
      expect(store.has(paths.scopedPrefixBuilder('prod', 'cn-hangzhou'))).toBe(false);
      expect(store.has(`${paths.legacyKey}.regional-migration.json`)).toBe(false);
    });

    it('can continue rollback after an interrupted deletion while retaining all backups', async () => {
      const { io, store } = makeIo();
      const legacy = makeLegacy();
      const paths = makePaths();
      store.set(paths.legacyKey, legacy);
      const plan = planRegionalMigration(legacy, baseOptions);
      await applyRegionalMigration(io, legacy, paths, plan, baseOptions);
      const remove = io.delete;
      let failed = false;
      io.delete = async (key) => {
        if (key === paths.scopedPrefixBuilder('prod', 'ap-southeast-1') && !failed) {
          failed = true;
          throw new Error('interrupted delete');
        }
        return remove(key);
      };
      await expect(rollbackRegionalMigration(io, paths, plan.opId)).rejects.toThrow(
        'interrupted delete',
      );
      expect(store.has(paths.backupKey(plan.opId))).toBe(true);
      await expect(applyRegionalMigration(io, legacy, paths, plan, baseOptions)).rejects.toThrow(
        /incomplete/,
      );
      await rollbackRegionalMigration(io, paths, plan.opId);
      expect(store.get(paths.legacyKey)).toEqual(legacy);
    });
  });
  it('does not execute a mutation when exclusive locks are unavailable', async () => {
    const { io } = makeIo();
    const mutation = jest.fn();
    delete io.putIfAbsent;
    await expect(withIoLock(io, 'lock', 'state', 'migrate', mutation)).rejects.toThrow(
      /cannot atomically/,
    );
    expect(mutation).not.toHaveBeenCalled();
  });
});

describe('flat-layout migration compatibility', () => {
  it('refuses a split into a scope that still has nested preview state', async () => {
    const { io, store } = makeIo();
    const paths = makePaths();
    const legacy = makeLegacy();
    store.set(paths.legacyKey, legacy);
    const previous = 'scoped/app/svc/prod/cn-hangzhou/state.json';
    store.set(previous, { version: '4.0' });
    const plan = planRegionalMigration(legacy, baseOptions);
    await expect(applyRegionalMigration(io, legacy, paths, plan, baseOptions)).rejects.toThrow(
      /Previous preview state layout/,
    );
    expect(store.get(paths.legacyKey)).toEqual(legacy);
    expect(store.has(paths.scopedPrefixBuilder('prod', 'cn-hangzhou'))).toBe(false);
    expect(store.has(paths.backupKey(plan.opId))).toBe(false);
    expect(store.get(previous)).toEqual({ version: '4.0' });
  });

  it('does not roll back other flat targets when an absent target has nested preview data', async () => {
    const { io, store, deleted } = makeIo();
    const paths = makePaths();
    const legacy = makeLegacy();
    store.set(paths.legacyKey, legacy);
    const plan = planRegionalMigration(legacy, baseOptions);
    await applyRegionalMigration(io, legacy, paths, plan, baseOptions);
    const target = paths.scopedPrefixBuilder('prod', 'cn-hangzhou');
    const previous = 'scoped/app/svc/prod/cn-hangzhou/state.json';
    store.set(previous, store.get(target));
    store.delete(target);
    await expect(rollbackRegionalMigration(io, paths, plan.opId)).rejects.toThrow(
      /Previous preview state layout/,
    );
    expect(store.has(paths.scopedPrefixBuilder('prod', 'ap-southeast-1'))).toBe(true);
    expect(store.has(previous)).toBe(true);
    expect(deleted).not.toContain(paths.scopedPrefixBuilder('prod', 'ap-southeast-1'));
    expect((store.get(paths.legacyKey) as PersistedStateFile).managedBy).toBe('regional');
  });
});
