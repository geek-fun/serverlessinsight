import {
  REDACTED_ENV_VALUE,
  redactEnvironmentOrEmpty,
  redactStageEnvironments,
} from '../../../src/common/envRedaction';
import { toPersistedState } from '../../../src/common/stateManager';
import type { ResourceState, StageState, StateFile } from '../../../src/types';

describe('environment redaction', () => {
  it('uses one mask for different secret values and keeps ordinary values', () => {
    expect(
      redactEnvironmentOrEmpty({
        NODE_ENV: 'production',
        CONFIG_SECRET: 'a',
        db_password: 'b',
        AUTH_TOKEN: 'c',
        CLOUD_ACCESS_KEY_ID: 'd',
        PRIVATE_KEY: 'e',
        CLIENT_CERT: 'f',
        certificateMode: 'automatic',
      }),
    ).toEqual({
      NODE_ENV: 'production',
      CONFIG_SECRET: REDACTED_ENV_VALUE,
      db_password: REDACTED_ENV_VALUE,
      AUTH_TOKEN: REDACTED_ENV_VALUE,
      CLOUD_ACCESS_KEY_ID: REDACTED_ENV_VALUE,
      PRIVATE_KEY: REDACTED_ENV_VALUE,
      CLIENT_CERT: REDACTED_ENV_VALUE,
      certificateMode: 'automatic',
    });
  });

  it('masks connection URLs with userinfo and removes legacy fingerprints', () => {
    const environment = {
      DATABASE_URL: 'postgres://app:pw@db.example.test/mydb',
      CACHE_URL: 'redis://:pw@cache.example.test:6379',
      CLUSTER_URL: 'mongodb+srv://app:p%40ss@cluster.example.test/data',
      OLD_VALUE: 'fpr:0123456789abcdef',
      PUBLIC_URL: 'https://example.test/hello?to=user@example.test',
      STATUS_URL: 'https://example.test/@status',
    };
    expect(redactEnvironmentOrEmpty(environment)).toEqual({
      DATABASE_URL: REDACTED_ENV_VALUE,
      CACHE_URL: REDACTED_ENV_VALUE,
      CLUSTER_URL: REDACTED_ENV_VALUE,
      OLD_VALUE: REDACTED_ENV_VALUE,
      PUBLIC_URL: environment.PUBLIC_URL,
      STATUS_URL: environment.STATUS_URL,
    });
  });

  it('accepts empty maps and omits undefined values', () => {
    expect(redactEnvironmentOrEmpty()).toEqual({});
    expect(redactEnvironmentOrEmpty({})).toEqual({});
    expect(redactEnvironmentOrEmpty({ ABSENT: undefined, EMPTY: '', EMPTY_SECRET: '' })).toEqual({
      EMPTY: '',
      EMPTY_SECRET: REDACTED_ENV_VALUE,
    });
  });

  it('redacts legacy definitions and every instance in the persisted stage store', () => {
    const resource: ResourceState = {
      mode: 'managed',
      region: 'cn-hangzhou',
      definition: { environment: { PASSWORD: 'old-password', MODE: 'debug' } },
      instances: [
        {
          sid: 'primary',
          id: 'hello',
          environment: { DATABASE_URL: 'postgres://app:pw@db.example.test', MODE: 'debug' },
        },
        { sid: 'secondary', id: 'old-hello', environment: { TOKEN: 'fpr:0123456789abcdef' } },
      ],
      lastUpdated: '2024-01-01T00:00:00.000Z',
    };
    const stage = { resources: { 'functions.hello': resource }, shared: { example: resource } };
    const state: StateFile = {
      provider: 'aliyun',
      app: 'example',
      service: 'example',
      version: '4.0',
      resources: stage.resources,
      stages: { dev: stage },
    };
    const expected = {
      ...resource,
      definition: { environment: { PASSWORD: REDACTED_ENV_VALUE, MODE: 'debug' } },
      instances: [
        {
          sid: 'primary',
          id: 'hello',
          environment: { DATABASE_URL: REDACTED_ENV_VALUE, MODE: 'debug' },
        },
        { sid: 'secondary', id: 'old-hello', environment: { TOKEN: REDACTED_ENV_VALUE } },
      ],
    };

    const saved = toPersistedState(state);
    expect(saved).not.toHaveProperty('resources');
    expect(saved.stages.dev).toEqual({
      resources: { 'functions.hello': expected },
      shared: { example: expected },
    });
    expect(redactStageEnvironments(saved.stages.dev)).toBe(saved.stages.dev);
    expect(resource.definition.environment).toEqual({ PASSWORD: 'old-password', MODE: 'debug' });
  });

  it.each([undefined, null, [], 'unstructured', { MODE: 'debug' }])(
    'preserves state with no sensitive environment entries (%j)',
    (environment) => {
      const stage: StageState = {
        resources: {
          'functions.hello': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: { environment },
            instances: [{ sid: 'primary', id: 'hello' }],
            lastUpdated: '2024-01-01T00:00:00.000Z',
          },
        },
      };
      expect(redactStageEnvironments(stage)).toBe(stage);
    },
  );
});

describe('config-set ref markers (epic #53 P1)', () => {
  it('masks resolved secret values as cfgref markers and keeps existing markers', async () => {
    const { beginConfigSession, endConfigSession } =
      await import('../../../src/common/configSession');
    const session = beginConfigSession();
    session.resolved.set('db.password', {
      value: 'sup3r-s3cret',
      versionNumber: 5,
      secret: true,
      scope: 'stage',
      configSet: 'db',
    });
    const { applyConfigResolution } = await import('../../../src/common/configSession');

    session.resolved.set('db.password', {
      value: 'sup3r-s3cret',
      versionNumber: 5,
      secret: true,
      scope: 'stage',
      configSet: 'db',
    });
    // register the sentinel first: calcValue would normally do this
    session.placeholderOf('db.password');
    // simulate the sentinel→value application with meta
    const meta = applyConfigResolution({
      functions: [{ key: 'fn', environment: { PW: '⟦si-cfg:0⟧' } }],
      databases: [],
    });
    void meta;
    const redacted = redactEnvironmentOrEmpty({ PW: 'sup3r-s3cret', OTHER: 'visible' });
    expect(redacted.PW).toBe('cfgref:config_sets.db.password@v5');
    expect(redacted.OTHER).toBe('visible');
    // an already-markerred value is the redacted form — kept as-is
    expect(redactEnvironmentOrEmpty({ PW: 'cfgref:config_sets.db.password@v5' }).PW).toBe(
      'cfgref:config_sets.db.password@v5',
    );
    endConfigSession();
  });

  it('plan display shows ref@vBefore → vAfter provenance for changed markers', async () => {
    const { redactEnvironmentAttributes } = await import('../../../src/common/envRedaction');
    const redacted = redactEnvironmentAttributes(
      { environment: { PW: 'cfgref:config_sets.db.password@v5' } },
      { environment: { PW: 'cfgref:config_sets.db.password@v3' } },
    );
    expect(redacted.environment?.PW).toBe('*** (config_sets.db.password@v3 → v5)');
    const fresh = redactEnvironmentAttributes({
      environment: { PW: 'cfgref:config_sets.db.password@v7' },
    });
    expect(fresh.environment?.PW).toBe('cfgref:config_sets.db.password@v7');
  });
});
