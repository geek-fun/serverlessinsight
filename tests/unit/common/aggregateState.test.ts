import crypto from 'node:crypto';

import {
  AGGREGATE_STATE_VERSION,
  aggregatePartition,
  assertDeploymentState,
  deploymentStateHash,
  emptyDeploymentState,
  mergeAggregateScope,
  patchAggregateScope,
  projectAggregateScope,
  readAggregateDocument,
  type AggregateStateFile,
} from '../../../src/common/aggregateState';
import type { DeploymentScope } from '../../../src/common/stateScope';

jest.mock('../../../src/lang', () => ({ lang: { __: (key: string) => key } }));
jest.mock('../../../src/common/logger', () => ({
  logger: { debug: jest.fn(), info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

const scope: DeploymentScope = {
  app: 'shop',
  service: 'api',
  provider: 'aliyun',
  stage: 'prod',
  region: 'cn-hangzhou',
};

const state = (target = scope) => ({
  ...emptyDeploymentState(target),
  resources: {
    'functions.api': {
      mode: 'managed' as const,
      region: target.region,
      definition: { functionName: 'recorded-function' },
      instances: [{ id: 'native-id', sid: 'recorded-sid', type: 'ALIYUN_FC3_FUNCTION' }],
      status: 'ready' as const,
      lastUpdated: '2026-01-01T00:00:00.000Z',
    },
  },
});

const document = (): AggregateStateFile => mergeAggregateScope(null, scope, state());

afterEach(() => jest.restoreAllMocks());

describe('aggregate deployment state', () => {
  it('distinguishes the V4 runtime view from the V4 aggregate envelope', () => {
    jest.spyOn(crypto, 'randomUUID').mockReturnValue('00000000-0000-4000-8000-000000000001');
    const persisted = document();
    expect(persisted.version).toBe(AGGREGATE_STATE_VERSION);
    expect(persisted).not.toHaveProperty('provider');
    expect(persisted).not.toHaveProperty('resources');
    const partition = aggregatePartition(persisted, scope)!;
    expect(partition.serial).toBe(1);
    expect(partition.lineage).toBe('00000000-0000-4000-8000-000000000001');
    expect(partition.resources['functions.api'].instances[0].id).toBe('native-id');
    const view = projectAggregateScope(persisted, scope);
    expect(view.version).toBe('4.0');
    expect(view.provider).toBe('aliyun');
    expect(Object.keys(view.stages)).toEqual(['prod']);
    expect(view.resources).toEqual(state().resources);
    expect(view.stages.prod.shared).toEqual({});
    expect(readAggregateDocument(persisted, scope, 'state.json')).toBe(persisted);
    expect(view.version).toBe(persisted.version);
    expect(() => readAggregateDocument(view, scope, 'state.json')).toThrow(
      'STATE_AGGREGATE_INVALID',
    );
  });

  it('merges only the selected provider, stage and region without mutating siblings', () => {
    const initial = document();
    const saved = JSON.stringify(initial);
    const otherCloud = { ...scope, provider: 'volcengine' };
    const otherRegion = { ...scope, region: 'ap-southeast-1' };
    const otherStage = { ...scope, stage: 'test' };
    const cloudAdded = mergeAggregateScope(initial, otherCloud, state(otherCloud));
    const regionAdded = mergeAggregateScope(cloudAdded, otherRegion, state(otherRegion));
    const all = mergeAggregateScope(regionAdded, otherStage, state(otherStage));
    expect(JSON.stringify(initial)).toBe(saved);
    expect(aggregatePartition(all, otherCloud)).toBe(aggregatePartition(cloudAdded, otherCloud));
    expect(aggregatePartition(all, otherRegion)).toBe(aggregatePartition(regionAdded, otherRegion));
    expect(aggregatePartition(all, scope)).toBe(aggregatePartition(initial, scope));
    const updated = mergeAggregateScope(all, scope, { ...state(), resources: {} });
    expect(aggregatePartition(updated, scope)?.serial).toBe(2);
    expect(aggregatePartition(updated, scope)?.lineage).toBe(
      aggregatePartition(initial, scope)?.lineage,
    );
    expect(aggregatePartition(updated, scope)?.resources).toEqual({});
    [otherCloud, otherRegion, otherStage].forEach((target) =>
      expect(aggregatePartition(updated, target)).toBe(aggregatePartition(all, target)),
    );
    expect(Object.keys(projectAggregateScope(updated, otherCloud).stages)).toEqual(['prod']);
  });

  it('returns confirmed empty state for a missing partition and canonicalizes region', () => {
    const target = { ...scope, region: ' AP-SOUTHEAST-1 ' };
    const empty = projectAggregateScope(document(), target);
    expect(empty.scope).toEqual({ stage: 'prod', region: 'ap-southeast-1' });
    expect(empty.resources).toEqual({});
    expect(empty).not.toHaveProperty('lineage');
    expect(projectAggregateScope(null, scope)).toEqual(emptyDeploymentState(scope));
    const reserved = { ...scope, stage: 'constructor' };
    expect(projectAggregateScope(document(), reserved).resources).toEqual({});
    expect(
      projectAggregateScope(mergeAggregateScope(document(), reserved, state(reserved)), reserved)
        .resources,
    ).toEqual(state(reserved).resources);
  });

  it('patches and removes ownership metadata on one partition only', () => {
    const initial = mergeAggregateScope(null, scope, {
      ...state(),
      orgId: 'org-a',
      managedBy: 'saas',
    });
    const other = { ...scope, provider: 'tencent' };
    const both = mergeAggregateScope(initial, other, state(other));
    const patched = patchAggregateScope(both, scope, { managedBy: undefined, serviceId: 'svc-a' });
    const partition = aggregatePartition(patched, scope)!;
    expect(partition).not.toHaveProperty('managedBy');
    expect(partition.orgId).toBe('org-a');
    expect(partition.serviceId).toBe('svc-a');
    expect(partition.serial).toBe(2);
    expect(partition.resources).toBe(aggregatePartition(initial, scope)?.resources);
    expect(
      aggregatePartition(
        patchAggregateScope(both, { ...scope, region: 'CN-Hangzhou' }, { managedBy: undefined }),
        scope,
      )?.managedBy,
    ).toBeUndefined();
    expect(aggregatePartition(patched, other)).toBe(aggregatePartition(both, other));
    expect(() => patchAggregateScope(both, scope, { provider: 'tencent' })).toThrow(
      'STATE_PARTITION_PATCH_INVALID',
    );
    const updated = mergeAggregateScope(initial, scope, { ...state(), orgId: 'org-b' });
    expect(aggregatePartition(updated, scope)?.orgId).toBe('org-a');
  });

  it('preserves migration metadata and shared ownership in the selected view', () => {
    const shared = state().resources;
    const migration = {
      opId: 'operation',
      sourceVersion: '3.0',
      sourceHash: 'source',
      migratedAt: '2026-01-01',
    };
    const persisted = mergeAggregateScope(null, scope, {
      ...state(),
      lineage: 'recorded-lineage',
      appId: 'app-id',
      migration,
      stages: { prod: { resources: {}, shared } },
    });
    const view = projectAggregateScope(persisted, scope);
    expect(view.lineage).toBe('recorded-lineage');
    expect(view.migration).toEqual(migration);
    expect(view.appId).toBe('app-id');
    expect(view.stages.prod.shared).toBe(shared);
    expect(
      aggregatePartition(mergeAggregateScope(persisted, scope, { ...state(), stages: {} }), scope)
        ?.shared,
    ).toBe(shared);
  });

  it.each([
    null,
    [],
    { version: '4.0', app: 'shop', service: 'api', stages: [] },
    { version: '4.0', app: 'shop', service: 'api', stages: {}, provider: 'aliyun' },
    { version: '4.0', app: 'shop', service: 'api', stages: {}, resources: {} },
    { version: '4.0', app: 'shop', service: 'api', stages: { prod: {} } },
    {
      version: '4.0',
      app: 'shop',
      service: 'api',
      stages: { prod: { providers: { aliyun: {} } } },
    },
  ])('refuses malformed aggregate envelopes: %j', (value) => {
    expect(() => readAggregateDocument(value, scope, 'state.json')).toThrow(
      'STATE_AGGREGATE_INVALID',
    );
  });

  it.each([
    ['resources', []],
    ['shared', []],
    ['lineage', ''],
    ['serial', 0],
    ['serial', 1.5],
    ['provider', 'tencent'],
    ['scope', { stage: 'foreign', region: 'foreign' }],
  ])('refuses a malformed partition field %s', (key, value) => {
    const doc = document();
    const partition = aggregatePartition(doc, scope)!;
    Object.assign(partition, { [key]: value });
    expect(() => readAggregateDocument(doc, scope, 'state.json')).toThrow(
      'STATE_AGGREGATE_INVALID',
    );
  });

  it('rejects noncanonical keys, foreign identity and unsupported versions', () => {
    const doc = document();
    doc.stages.prod.providers.aliyun.regions['CN-Hangzhou'] = aggregatePartition(doc, scope)!;
    expect(() => readAggregateDocument(doc, scope, 'state.json')).toThrow(
      'STATE_AGGREGATE_INVALID',
    );
    expect(() =>
      readAggregateDocument(document(), { ...scope, app: 'other' }, 'state.json'),
    ).toThrow('STATE_SCOPED_IDENTITY_MISMATCH');
    expect(() =>
      readAggregateDocument({ ...document(), version: '5.0' }, scope, 'state.json'),
    ).toThrow();
    expect(() =>
      readAggregateDocument({ ...document(), version: undefined }, scope, 'state.json'),
    ).toThrow();
    const unsafe = { ...document(), stages: { '../prod': { providers: {} } } };
    expect(() => readAggregateDocument(unsafe, scope, 'state.json')).toThrow();
  });

  it.each([
    { app: 'other' },
    { service: 'other' },
    { provider: 'tencent' },
    { scope: { stage: 'test', region: scope.region } },
    { scope: { stage: scope.stage, region: 'ap-southeast-1' } },
  ])('rejects a foreign runtime scope: %j', (foreign) => {
    expect(() => assertDeploymentState({ ...state(), ...foreign }, scope)).toThrow();
  });

  it('accepts the matching view and rejects unsupported runtime versions', () => {
    expect(() => assertDeploymentState(state(), scope)).not.toThrow();
    expect(() => assertDeploymentState({ ...state(), scope: undefined }, scope)).not.toThrow();
    expect(() => assertDeploymentState({ ...state(), version: '5.0' }, scope)).toThrow();
  });

  it('hashes only the selected view, independently of key order and sibling commits', () => {
    const initial = document();
    const before = projectAggregateScope(initial, scope);
    const other = { ...scope, provider: 'tencent' };
    const changed = mergeAggregateScope(initial, other, state(other));
    expect(deploymentStateHash(projectAggregateScope(changed, scope))).toBe(
      deploymentStateHash(before),
    );
    expect(deploymentStateHash({ ...before, resources: {} })).toBe(deploymentStateHash(before));
    expect(deploymentStateHash({ ...before, serial: 2 })).not.toBe(deploymentStateHash(before));
  });

  it('does not resurrect cleared ownership metadata from a stale runtime view', () => {
    const initial = document();
    const stale = {
      ...projectAggregateScope(initial, scope),
      managedBy: 'saas',
      orgId: 'stale-org',
    };
    const saved = mergeAggregateScope(initial, scope, stale);
    expect(aggregatePartition(saved, scope)?.managedBy).toBeUndefined();
    expect(aggregatePartition(saved, scope)?.orgId).toBeUndefined();
  });
});
