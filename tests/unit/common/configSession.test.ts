import {
  beginConfigSession,
  endConfigSession,
  collectConfigRefs,
  applyConfigResolution,
  configRefMarker,
  isConfigRefMarker,
  parseConfigRefMarker,
  getAppliedConfigMeta,
} from '../../../src/common/configSession';
import { calcValue } from '../../../src/common/iacHelper';
import { assertNoRemainingSentinels } from '../../../src/common/configSession';
import type { Context } from '../../../src/types';

const context = {
  stage: 'prod',
  provider: 'aliyun',
  region: 'cn-hangzhou',
  parameters: [],
  stages: {},
} as unknown as Context;

describe('config-set reference resolution (epic #53 P1)', () => {
  afterEach(() => {
    endConfigSession();
  });

  it('collectConfigRefs scans function environments and database passwords', () => {
    const refs = collectConfigRefs({
      functions: [
        {
          environment: {
            DB_HOST: '${config_sets.db.host}',
            DSN: 'postgres://${config_sets.db.user}:${config_sets.db.password}@h/db',
          },
        },
      ],
      databases: [{ security: { basicAuth: { password: '${config_sets.db.password}' } } }],
    });
    expect(refs.sort()).toEqual(['db.host', 'db.password', 'db.user']);
  });

  it('calcValue swaps refs for stable sentinels inside the session and preserves concatenation', () => {
    const session = beginConfigSession();
    const dsn = calcValue<string>(
      'postgres://${config_sets.db.user}:${config_sets.db.password}@${config_sets.db.host}/orders',
      context,
    );
    expect(dsn).toMatch(/^postgres:\/\/⟦si-cfg:0⟧:⟦si-cfg:1⟧@⟦si-cfg:2⟧\/orders$/);
    const repeated = calcValue<string>('${config_sets.db.host}', context);
    expect(repeated).toBe('⟦si-cfg:2⟧'); // deduplicated per ref
    expect(session.records.size).toBe(3);
  });

  it('calcValue keeps the raw template without a session (validate/show offline)', () => {
    expect(calcValue<string>('${config_sets.db.host}', context)).toBe('${config_sets.db.host}');
  });

  it('applyConfigResolution substitutes values, infers scalars for exact refs and records meta', () => {
    const session = beginConfigSession();
    const host = calcValue<string>('${config_sets.db.host}', context);
    const port = calcValue<string>('${config_sets.db.port}', context);
    const secretConcat = calcValue<string>(
      'postgres://app:${config_sets.db.password}@db/orders',
      context,
    );
    const password = calcValue<string>('${config_sets.db.password}', context);
    session.resolved.set('db.host', {
      value: 'db.prod.internal',
      versionNumber: 5,
      secret: false,
      scope: 'stage',
      configSet: 'db',
    });
    session.resolved.set('db.port', {
      value: '5432',
      versionNumber: 5,
      secret: false,
      scope: 'stage',
      configSet: 'db',
    });
    session.resolved.set('db.password', {
      value: 'sup3r-s3cret',
      versionNumber: 3,
      secret: true,
      scope: 'stage',
      configSet: 'db',
    });

    const iac = {
      functions: [
        {
          key: 'order_fn',
          environment: { host, port, secretConcat },
        },
      ],
      databases: [{ key: 'order_db', security: { basicAuth: { password } } }],
    };
    // A sentinel that was never resolved fails closed.
    expect(() =>
      applyConfigResolution({
        functions: [{ key: 'fn', environment: { A: '⟦si-cfg:99⟧' } }],
        databases: [],
      }),
    ).toThrow(/CONFIG_ITEM_NOT_FOUND|failed to resolve/i);

    const meta = applyConfigResolution(iac);
    expect(iac.functions[0]!.environment.host).toBe('db.prod.internal');
    expect(iac.functions[0]!.environment.port).toBe(5432); // whole-value refs infer scalars
    expect(iac.functions[0]!.environment.secretConcat).toBe(
      'postgres://app:sup3r-s3cret@db/orders',
    );
    expect(iac.databases[0]!.security.basicAuth.password).toBe('sup3r-s3cret');
    expect(meta.databasePasswordRefs.get('order_db')).toEqual({
      configRef: 'config_sets.db.password',
      versionNumber: 3,
      secret: true,
    });
    expect(meta.functionEnvRefs.get('order_fn')?.get('host')).toEqual({
      configRef: 'config_sets.db.host',
      versionNumber: 5,
      secret: false,
    });
    expect(meta.functionEnvRefs.get('order_fn')?.get('secretConcat')?.secret).toBe(true);
    expect(meta.secretValues.has('sup3r-s3cret')).toBe(true);
    expect(meta.refByValue.get('sup3r-s3cret')?.versionNumber).toBe(3);
    expect(getAppliedConfigMeta()).toBe(meta);
  });

  it('a registered sentinel without a resolved value fails substitution', () => {
    const session = beginConfigSession();
    session.placeholderOf('db.missing');
    // resolved deliberately empty — the ref was registered but never resolved
    // lang is real in this file — assert the translated message body.
    expect(() =>
      applyConfigResolution({
        functions: [{ key: 'fn', environment: { A: '⟦si-cfg:0⟧' } }],
        databases: [],
      }),
    ).toThrow(/Config references failed to resolve/);
    endConfigSession();
  });

  it('assertNoRemainingSentinels throws listing leftovers and passes clean trees', () => {
    expect(() => assertNoRemainingSentinels(['⟦si-cfg:0⟧', 'clean', '⟦si-cfg:2⟧'])).toThrow(
      /Config references failed to resolve/,
    );
    // Non-string entries are ignored by the filter — the cast mirrors the
    // loose Iterable<any> data this guard meets in practice.
    expect(() =>
      assertNoRemainingSentinels(['clean', 42] as unknown as Iterable<string>),
    ).not.toThrow();
    expect(() => assertNoRemainingSentinels([])).not.toThrow();
  });

  it('cfgref markers round-trip and carry provenance for drift masking', () => {
    const ref = { configRef: 'config_sets.db.password', versionNumber: 3, secret: true };
    const marker = configRefMarker(ref);
    expect(isConfigRefMarker(marker)).toBe(true);
    expect(parseConfigRefMarker(marker)).toEqual(ref);
    expect(isConfigRefMarker('[REDACTED]')).toBe(false);
    expect(parseConfigRefMarker('cfgref:oops')).toBeNull();
  });
});
