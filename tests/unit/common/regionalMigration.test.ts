import {
  RegionEvidence,
  collectRegionEvidence,
  planRegionalMigration,
  buildScopedDocument,
  applyRegionalMigration,
  rollbackRegionalMigration,
  hashDocument,
  RegionalMigrationPaths,
  KeyValueIO,
  withIoLock,
  readRegionalMigrationJournal,
} from '../../../src/common/regionalMigration';
import {
  emptyDeploymentState,
  mergeAggregateScope,
  type AggregateStateFile,
} from '../../../src/common/aggregateState';
import {
  PersistedStateFile,
  ResourceState,
  CURRENT_STATE_VERSION,
  LEGACY_STATE_VERSION,
} from '../../../src/types';
jest.mock('../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

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

  describe('in-place aggregate upgrade', () => {
    const upgrade = async () => {
      const { io, store, written, deleted } = makeIo();
      const legacy = makeLegacy();
      const paths = makePaths();
      store.set(paths.legacyKey, legacy);
      const plan = planRegionalMigration(legacy, baseOptions);
      await applyRegionalMigration(io, legacy, paths, plan, baseOptions);
      return { io, store, written, deleted, legacy, paths, plan };
    };

    it('refuses a plan omitting one region from a populated stage', async () => {
      const legacy = makeLegacy();
      const plan = planRegionalMigration(legacy, baseOptions);
      const { io, store, written } = makeIo();
      const basePaths = makePaths();
      store.set(basePaths.legacyKey, legacy);
      await expect(
        applyRegionalMigration(
          io,
          legacy,
          basePaths,
          { ...plan, documents: plan.documents.slice(0, 1) },
          baseOptions,
        ),
      ).rejects.toThrow(/every resource/);
      expect(written).toEqual([]);
    });

    it('upgrades the original key with independent provider/region partitions and an immutable source backup', async () => {
      const { store, written, paths, legacy, plan } = await upgrade();
      const aggregate = store.get(paths.legacyKey) as AggregateStateFile;
      expect(aggregate.version).toBe('5.0');
      expect(aggregate).not.toHaveProperty('provider');
      expect(aggregate.stages.prod.providers.aliyun.regions['cn-hangzhou'].resources).toEqual({
        'functions.alpha': legacy.stages.prod.resources['functions.alpha'],
      });
      expect(aggregate.stages.prod.providers.aliyun.regions['ap-southeast-1'].resources).toEqual({
        'functions.beta': legacy.stages.prod.resources['functions.beta'],
      });
      expect(aggregate.stages.prod.providers.aliyun.regions['cn-hangzhou'].shared).toEqual(
        legacy.stages.prod.shared,
      );
      expect(aggregate.stages.prod.providers.aliyun.regions['ap-southeast-1'].shared).toEqual({});
      expect(store.get(paths.backupKey(plan.opId))).toEqual(legacy);
      expect(written).not.toContain(paths.serviceBindingKey);
      expect(written.some((key) => key.startsWith('scoped/'))).toBe(false);
      expect(written.indexOf(paths.backupKey(plan.opId))).toBeLessThan(
        written.indexOf(paths.legacyKey),
      );
    });

    it('preserves source provider and native identities when workload flags select another provider', async () => {
      const { io, store } = makeIo();
      const legacy = makeLegacy();
      const options = { ...baseOptions, provider: 'tencent' };
      const paths = makePaths();
      store.set(paths.legacyKey, legacy);
      await applyRegionalMigration(
        io,
        legacy,
        paths,
        planRegionalMigration(legacy, options),
        options,
      );
      const aggregate = store.get(paths.legacyKey) as AggregateStateFile;
      expect(Object.keys(aggregate.stages.prod.providers)).toEqual(['aliyun']);
      expect(
        aggregate.stages.prod.providers.aliyun.regions['cn-hangzhou'].resources['functions.alpha']
          .instances,
      ).toEqual(legacy.stages.prod.resources['functions.alpha'].instances);
    });

    it('requires explicit unknown-region binding and never duplicates an entry into siblings', async () => {
      const { io, store, written } = makeIo();
      const legacy = makeLegacy();
      legacy.stages.dev = { resources: { orphan: makeResource(undefined, 'orphan') } };
      const paths = makePaths();
      store.set(paths.legacyKey, legacy);
      const plan = planRegionalMigration(legacy, baseOptions);
      await expect(applyRegionalMigration(io, legacy, paths, plan, baseOptions)).rejects.toThrow(
        /no region evidence/,
      );
      expect(written).toEqual([]);
      await applyRegionalMigration(io, legacy, paths, plan, {
        ...baseOptions,
        bindUnknownRegion: 'CN-BEIJING',
      });
      const aggregate = store.get(paths.legacyKey) as AggregateStateFile;
      expect(
        aggregate.stages.dev.providers.aliyun.regions['cn-beijing'].resources.orphan.region,
      ).toBe('cn-beijing');
      expect(Object.keys(aggregate.stages.dev.providers.aliyun.regions)).toEqual(['cn-beijing']);
    });

    it.each(['legacy', 'report', 'journal'])(
      'resumes after an interrupted %s write without changing partition lineages or source backups',
      async (failure) => {
        const { io, store } = makeIo();
        const legacy = makeLegacy();
        const paths = makePaths();
        const plan = planRegionalMigration(legacy, baseOptions);
        store.set(paths.legacyKey, legacy);
        io.failOn =
          failure === 'legacy'
            ? paths.legacyKey
            : failure === 'report'
              ? paths.reportKey(plan.opId)
              : paths.legacyKey + '.regional-migration.json';
        if (failure === 'journal') {
          await expect(
            applyRegionalMigration(io, legacy, paths, plan, baseOptions),
          ).rejects.toThrow();
          expect(store.get(paths.legacyKey)).toEqual(legacy);
        } else {
          await expect(
            applyRegionalMigration(io, legacy, paths, plan, baseOptions),
          ).rejects.toThrow();
        }
        const pending = await readRegionalMigrationJournal(io, paths);
        io.failOn = undefined;
        await applyRegionalMigration(io, legacy, paths, plan, baseOptions);
        expect(store.get(paths.backupKey(plan.opId))).toEqual(legacy);
        if (pending?.aggregate) expect(store.get(paths.legacyKey)).toEqual(pending.aggregate);
        expect((await readRegionalMigrationJournal(io, paths))?.phase).toBe('complete');
      },
    );

    it('returns the completed report without overwriting later deployments', async () => {
      const { io, store, paths, plan, legacy } = await upgrade();
      const aggregate = store.get(paths.legacyKey) as AggregateStateFile;
      const scope = { ...baseOptions, provider: 'tencent', stage: 'prod', region: 'ap-shanghai' };
      const updated = mergeAggregateScope(aggregate, scope, emptyDeploymentState(scope));
      store.set(paths.legacyKey, updated);
      await applyRegionalMigration(io, legacy, paths, plan, baseOptions);
      expect(store.get(paths.legacyKey)).toEqual(updated);
    });

    it('refuses source drift, missing state and partial stage coverage before writing', async () => {
      const { io, store, written } = makeIo();
      const legacy = makeLegacy();
      const paths = makePaths();
      const plan = planRegionalMigration(legacy, baseOptions);
      await expect(applyRegionalMigration(io, legacy, paths, plan, baseOptions)).rejects.toThrow(
        /changed/,
      );
      store.set(paths.legacyKey, { ...legacy, serial: 9 });
      await expect(applyRegionalMigration(io, legacy, paths, plan, baseOptions)).rejects.toThrow(
        /changed/,
      );
      store.set(paths.legacyKey, legacy);
      await expect(
        applyRegionalMigration(io, legacy, paths, { ...plan, documents: [] }, baseOptions),
      ).rejects.toThrow(/every stage|every resource/);
      expect(written).toEqual([]);
    });

    it('rejects changed recovery options and corrupt backups without overwriting anything', async () => {
      const { io, store, paths, plan, legacy } = await upgrade();
      await expect(
        applyRegionalMigration(io, legacy, paths, plan, {
          ...baseOptions,
          bindUnknownRegion: 'cn-beijing',
        }),
      ).rejects.toThrow(/incomplete/);
      store.set(paths.backupKey(plan.opId), { ...legacy, serial: 99 });
      await expect(rollbackRegionalMigration(io, paths, plan.opId)).rejects.toThrow(/changed/);
    });

    it('restores a pristine upgrade in place and retains its original backup', async () => {
      const { io, store, paths, plan, legacy } = await upgrade();
      await rollbackRegionalMigration(io, paths, plan.opId);
      expect(store.get(paths.legacyKey)).toEqual(legacy);
      expect(store.get(paths.backupKey(plan.opId))).toEqual(legacy);
      expect(store.has(paths.reportKey(plan.opId))).toBe(false);
      expect(await readRegionalMigrationJournal(io, paths)).toBeNull();
    });

    it.each(['selected', 'sibling'])(
      'blocks rollback after %s partition writes without deleting any recovery records',
      async (kind) => {
        const { io, store, deleted, paths, plan } = await upgrade();
        const aggregate = store.get(paths.legacyKey) as AggregateStateFile;
        const scope = {
          ...baseOptions,
          stage: 'prod',
          region: kind === 'selected' ? 'cn-hangzhou' : 'cn-beijing',
        };
        const updated = mergeAggregateScope(aggregate, scope, emptyDeploymentState(scope));
        store.set(paths.legacyKey, updated);
        await expect(rollbackRegionalMigration(io, paths, plan.opId)).rejects.toThrow(
          /Cannot roll back/,
        );
        expect(store.get(paths.legacyKey)).toEqual(updated);
        expect(deleted).toEqual([]);
        expect(store.has(paths.backupKey(plan.opId))).toBe(true);
      },
    );

    it('can resume rollback after the original source was restored but report deletion failed', async () => {
      const { io, store, paths, plan, legacy } = await upgrade();
      const remove = io.delete;
      io.delete = async (key) => {
        if (key === paths.reportKey(plan.opId)) throw new Error('delete interrupted');
        return remove(key);
      };
      await expect(rollbackRegionalMigration(io, paths, plan.opId)).rejects.toThrow(
        'delete interrupted',
      );
      expect(store.get(paths.legacyKey)).toEqual(legacy);
      io.delete = remove;
      await rollbackRegionalMigration(io, paths, plan.opId);
      expect(store.get(paths.legacyKey)).toEqual(legacy);
    });

    it('requires matching recovery records and a verified backup', async () => {
      const { io, store, paths, plan } = await upgrade();
      await expect(rollbackRegionalMigration(io, paths, 'different-operation')).rejects.toThrow(
        /No migration report/,
      );
      store.delete(paths.backupKey(plan.opId));
      await expect(rollbackRegionalMigration(io, paths, plan.opId)).rejects.toThrow(
        /backup.*missing/,
      );
    });
  });

  it('does not execute a mutation when exclusive locks are unavailable', async () => {
    const { io } = makeIo();
    delete io.putIfAbsent;
    const callback = jest.fn();
    await expect(withIoLock(io, 'state.si-lock', 'state', 'migrate', callback)).rejects.toThrow(
      /atomically/,
    );
    expect(callback).not.toHaveBeenCalled();
  });
});
