import {
  beginConfigSession,
  endConfigSession,
  collectConfigRefs,
  applyConfigResolution,
  configRefMarker,
  isConfigRefMarker,
  parseConfigRefMarker,
  getAppliedConfigMeta,
  setAppliedConfigMeta,
  registerRuntimeSecret,
  assertNoRemainingSentinels,
} from '../../../src/common/configSession';
import { calcValue } from '../../../src/common/iacHelper';
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
    setAppliedConfigMeta(null);
  });

  it('collectConfigRefs scans function environments, database passwords (both shapes) and vars/stages indirection', () => {
    const refs = collectConfigRefs(
      {
        vars: {
          shared_host: '${config_sets.db.host}',
          unused_var: '${config_sets.unused.item}',
        },
        stages: {
          prod: {
            stage_secret: '${config_sets.db.stage_token}',
          },
        },
        functions: [
          {
            environment: {
              DB_HOST: '${vars.shared_host}',
              STAGE_TOKEN: '${stages.stage_secret}',
              DSN: 'postgres://${config_sets.db.user}:${config_sets.db.password}@h/db',
            },
          },
        ],
        databases: [
          { security: { basicAuth: { password: '${config_sets.db.password}' } } },
          { security: { basic_auth: { password: '${config_sets.es.password}' } } },
        ],
      },
      'prod',
    );
    expect(refs.sort()).toEqual([
      'db.host',
      'db.password',
      'db.stage_token',
      'db.user',
      'es.password',
    ]);
  });

  it('calcValue swaps config refs expanded via ${vars.*} and ${stages.*} into sentinels', () => {
    const session = beginConfigSession();
    const fromVar = calcValue<string>(
      '${vars.host}',
      context,
      { host: '${config_sets.db.host}' },
      false,
    );
    const fromStage = calcValue<string>(
      '${stages.pw}',
      { ...context, stages: { prod: { pw: '${config_sets.db.password}' } } } as unknown as Context,
      undefined,
      false,
    );
    expect(fromVar).toBe('⟦si-cfg:0⟧');
    expect(fromStage).toBe('⟦si-cfg:1⟧');
    expect(session.records.size).toBe(2);
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
    // Environment variables stay strings so numeric values never phantom-drift
    // against cloud string maps or bypass string secret redaction.
    expect(iac.functions[0]!.environment.port).toBe('5432');
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
    expect(meta.secretValues.has('postgres://app:sup3r-s3cret@db/orders')).toBe(true);
    expect(meta.refByValue.get('sup3r-s3cret')?.versionNumber).toBe(3);
    expect(getAppliedConfigMeta()).toBe(meta);
  });

  it('preserves secret provenance and final value when a non-secret ref follows a secret ref in concatenation', () => {
    const session = beginConfigSession();
    const dsn = calcValue<string>(
      'postgres://${config_sets.db.user}:${config_sets.db.password}@${config_sets.db.host}/orders',
      context,
    );
    const numericSecret = calcValue<string>('${config_sets.auth.pin}', context);
    session.resolved.set('db.user', {
      value: 'app',
      versionNumber: 2,
      secret: false,
      scope: 'stage',
      configSet: 'db',
    });
    session.resolved.set('db.password', {
      value: 'sup3r-s3cret',
      versionNumber: 4,
      secret: true,
      scope: 'stage',
      configSet: 'db',
    });
    session.resolved.set('db.host', {
      value: 'db.prod.internal',
      versionNumber: 5,
      secret: false,
      scope: 'stage',
      configSet: 'db',
    });
    session.resolved.set('auth.pin', {
      value: '123456',
      versionNumber: 1,
      secret: true,
      scope: 'stage',
      configSet: 'auth',
    });

    const iac = {
      functions: [{ key: 'fn', environment: { APP_CONN: dsn, PIN: numericSecret } }],
      databases: [],
    };
    const meta = applyConfigResolution(iac);
    const fullDsn = 'postgres://app:sup3r-s3cret@db.prod.internal/orders';
    expect(iac.functions[0]!.environment.APP_CONN).toBe(fullDsn);
    expect(iac.functions[0]!.environment.PIN).toBe('123456');
    expect(meta.secretValues.has(fullDsn)).toBe(true);
    expect(meta.refByValue.get(fullDsn)).toEqual({
      configRef: 'config_sets.db.password',
      versionNumber: 4,
      secret: true,
    });
    expect(meta.functionEnvRefs.get('fn')?.get('APP_CONN')?.secret).toBe(true);
    expect(meta.secretValues.has('123456')).toBe(true);
    expect(meta.refByValue.get('123456')?.secret).toBe(true);
  });

  it('fails closed when a config sentinel lands in an unsupported deployed field', () => {
    const session = beginConfigSession();
    const badName = calcValue<string>('${config_sets.db.host}', context);
    session.resolved.set('db.host', {
      value: 'db.prod.internal',
      versionNumber: 1,
      secret: false,
      scope: 'stage',
      configSet: 'db',
    });
    expect(() =>
      applyConfigResolution({
        functions: [
          { key: 'fn', name: badName, environment: {} } as unknown as {
            key: string;
            environment?: Record<string, unknown>;
          },
        ],
        databases: [],
        events: [{ key: 'gw', name: badName }],
      }),
    ).toThrow(/Config references failed to resolve/);
  });

  it('registerRuntimeSecret tracks minted/live runtime tokens even without prior appliedMeta', () => {
    setAppliedConfigMeta(null);
    registerRuntimeSecret('');
    expect(getAppliedConfigMeta()).toBeNull();
    registerRuntimeSecret('sirt_com_live_token');
    expect(getAppliedConfigMeta()?.secretValues.has('sirt_com_live_token')).toBe(true);
    registerRuntimeSecret('sirt_com_second_token');
    expect(getAppliedConfigMeta()?.secretValues.has('sirt_com_second_token')).toBe(true);
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

  it('plain (non-secret) refs concatenate without marking the field sensitive', () => {
    const session = beginConfigSession();
    const dsn = calcValue<string>(
      'postgres://${config_sets.db.user}:${config_sets.db.host}/orders',
      context,
    );
    session.resolved.set('db.user', {
      value: 'app_user',
      versionNumber: 2,
      secret: false,
      scope: 'service',
      configSet: 'db',
    });
    session.resolved.set('db.host', {
      value: 'db.prod.internal',
      versionNumber: 2,
      secret: false,
      scope: 'service',
      configSet: 'db',
    });
    const meta = applyConfigResolution({
      functions: [{ key: 'fn', environment: { DSN: dsn } }],
      databases: [],
    });
    expect(meta.functionEnvRefs.get('fn')?.get('DSN')?.secret).toBe(false);
    expect(meta.secretValues.size).toBe(0);
    endConfigSession();
  });

  it('org-scope refs resolve when app/service context is absent', () => {
    const session = beginConfigSession();
    const raw = calcValue<string>('${config_sets.shared.smtp}', context);
    session.resolved.set('shared.smtp', {
      value: 'smtp.example.com',
      versionNumber: 4,
      secret: false,
      scope: 'org',
      configSet: 'shared',
    });
    const meta = applyConfigResolution({
      functions: [{ key: 'fn', environment: { SMTP: raw } }],
      databases: [],
    });
    expect(meta.functionEnvRefs.get('fn')?.get('SMTP')).toEqual({
      configRef: 'config_sets.shared.smtp',
      versionNumber: 4,
      secret: false,
    });
    endConfigSession();
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
