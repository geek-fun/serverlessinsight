import type { ErrorObject } from 'ajv';
import { validateSemantics } from '../../../src/validator/semanticValidation';
import { validateYaml } from '../../../src/validator/iacSchema';
import { ServerlessIacRaw } from '../../../src/types';
import { ProviderEnum } from '../../../src/common';
import { logger } from '../../../src/common/logger';

jest.mock('../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

jest.mock('../../../src/lang', () => ({
  lang: {
    // append the params so tests can assert on nested i18n keys (reasons)
    __: (key: string, params?: Record<string, unknown>) =>
      params ? `${key}:${JSON.stringify(params)}` : key,
  },
}));

describe('validateSemantics', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const baseEvent = {
    type: 'API_GATEWAY',
    name: 'test-gateway',
    triggers: [] as Array<Record<string, unknown>>,
  };

  const buildIac = (
    events: Record<string, unknown>,
    functions: Record<string, unknown> = {},
  ): ServerlessIacRaw =>
    ({
      version: '0.0.1',
      app: 'test-app',
      service: 'test-service',
      provider: { name: ProviderEnum.ALIYUN, region: 'cn-hangzhou' },
      events,
      functions,
    }) as unknown as ServerlessIacRaw;

  describe('bucket domains semantics (issue #279)', () => {
    const buildBucketIac = (buckets: Record<string, unknown>): ServerlessIacRaw =>
      ({
        version: '0.0.1',
        app: 'test-app',
        service: 'test-service',
        provider: { name: ProviderEnum.ALIYUN, region: 'cn-hangzhou' },
        events: {},
        functions: {},
        buckets,
      }) as unknown as ServerlessIacRaw;

    const keywordsOf = (errors: Array<ErrorObject>): string[] => errors.map((e) => e.keyword);

    it('skips non-object bucket entries', () => {
      const errors = validateSemantics(buildBucketIac({ broken: null }));
      expect(keywordsOf(errors)).not.toContain('bucketDomainMigrated');
    });

    it('skips non-object binding entries and unresolvable hostnames', () => {
      const errors = validateSemantics(
        buildBucketIac({
          assets: {
            name: 'assets',
            domains: [null, { domain_name: 42 }, { domain_name: '${vars.hostA}' }],
          },
        }),
      );
      expect(errors.filter((e) => e.instancePath.startsWith('/buckets/assets/domains'))).toEqual(
        [],
      );
    });

    it('rejects a wildcard that covers a previously declared exact host (both orders)', () => {
      const exactFirst = validateSemantics(
        buildBucketIac({
          assets: {
            name: 'assets',
            domains: [{ domain_name: 'www.example.com' }, { domain_name: '*.example.com' }],
          },
        }),
      );
      expect(keywordsOf(exactFirst)).toContain('wildcardBucketDomainConflict');
      const wildcardFirst = validateSemantics(
        buildBucketIac({
          assets: {
            name: 'assets',
            domains: [{ domain_name: '*.example.com' }, { domain_name: 'www.example.com' }],
          },
        }),
      );
      expect(keywordsOf(wildcardFirst)).toContain('wildcardBucketDomainConflict');
    });

    it('accepts volcengine bucket bindings (issue #294 delivered the capability)', () => {
      const errors = validateSemantics({
        ...buildBucketIac({
          assets: { name: 'assets', domains: [{ domain_name: 'example.com' }] },
        }),
        provider: { name: ProviderEnum.VOLCENGINE, region: 'cn-beijing' },
      } as unknown as ServerlessIacRaw);
      expect(errors).toEqual([]);
    });

    it('rejects inline PEM on a volcengine direct binding (TOS has no bucket-domain cert upload)', () => {
      const errors = validateSemantics({
        ...buildBucketIac({
          assets: {
            name: 'assets',
            domains: [
              {
                domain_name: 'example.com',
                certificate_body: './cert.pem',
                certificate_private_key: './key.pem',
              },
            ],
          },
        }),
        provider: { name: ProviderEnum.VOLCENGINE, region: 'cn-beijing' },
      } as unknown as ServerlessIacRaw);
      expect(keywordsOf(errors)).toContain('volcengineDirectBindingPemUnsupported');
    });

    it('allows a certificate reference on a volcengine direct binding', () => {
      const errors = validateSemantics({
        ...buildBucketIac({
          assets: {
            name: 'assets',
            domains: [{ domain_name: 'example.com', certificate_id: 'cert-75bba922e95b4dc5b1a2f' }],
          },
        }),
        provider: { name: ProviderEnum.VOLCENGINE, region: 'cn-beijing' },
      } as unknown as ServerlessIacRaw);
      expect(errors).toEqual([]);
    });

    it('rejects bucket-level accelerate outside aliyun and volcengine', () => {
      const errors = validateSemantics({
        ...buildBucketIac({
          assets: { name: 'assets', accelerate: true },
        }),
        provider: { name: ProviderEnum.TENCENT, region: 'ap-guangzhou' },
      } as unknown as ServerlessIacRaw);
      expect(keywordsOf(errors)).toContain('bucketAccelerateProviderUnsupported');
      const volcengineErrors = validateSemantics({
        ...buildBucketIac({
          assets: { name: 'assets', accelerate: true },
        }),
        provider: { name: ProviderEnum.VOLCENGINE, region: 'cn-beijing' },
      } as unknown as ServerlessIacRaw);
      expect(keywordsOf(volcengineErrors)).not.toContain('bucketAccelerateProviderUnsupported');
    });
  });

  describe('function source (container vs code)', () => {
    it('rejects functions defining both container and code', () => {
      const errors = validateSemantics(
        buildIac(
          {},
          {
            fn: {
              name: 'fn',
              code: { runtime: 'nodejs20', handler: 'index.handler', path: 'code.zip' },
              container: { image: 'registry.example.com/img:1', port: 9000 },
            },
          },
        ) as ServerlessIacRaw,
      );

      const conflicts = errors.filter((error) => error.keyword === 'containerCodeConflict');
      expect(conflicts).toHaveLength(1);
      expect(conflicts[0].instancePath).toBe('/functions/fn');
    });

    it('rejects functions defining neither container nor code', () => {
      const errors = validateSemantics(
        buildIac({}, { fn: { name: 'fn', memory: 512 } }) as ServerlessIacRaw,
      );

      const missing = errors.filter((error) => error.keyword === 'functionSourceRequired');
      expect(missing).toHaveLength(1);
      expect(missing[0].instancePath).toBe('/functions/fn');
    });

    it('accepts code-only and container-only functions', () => {
      const errors = validateSemantics(
        buildIac(
          {},
          {
            zipFn: {
              name: 'zip-fn',
              code: { runtime: 'nodejs20', handler: 'index.handler', path: 'code.zip' },
            },
            containerFn: {
              name: 'container-fn',
              container: { image: 'registry.example.com/img:1', port: 9000 },
            },
          },
        ) as ServerlessIacRaw,
      );

      expect(
        errors.filter(
          (error) =>
            error.keyword === 'containerCodeConflict' || error.keyword === 'functionSourceRequired',
        ),
      ).toHaveLength(0);
    });
  });

  describe('timer triggers (issue #258)', () => {
    const timerIac = (
      provider: ProviderEnum,
      timers: Array<Record<string, unknown>>,
    ): ServerlessIacRaw =>
      ({
        ...buildIac(
          {},
          {
            fn: {
              name: 'timer-fn',
              code: { runtime: 'nodejs20', handler: 'index.handler', path: 'code.zip' },
              triggers: { timer: timers },
            },
          },
        ),
        provider: { name: provider, region: 'cn-hangzhou' },
      }) as ServerlessIacRaw;

    it('rejects an invalid si-cron with the provider dialect reason', () => {
      const errors = validateSemantics(
        timerIac(ProviderEnum.ALIYUN, [{ name: 'bad', cron: 'not a cron' }]),
      );
      const invalid = errors.filter((error) => error.keyword === 'invalidSiCron');
      expect(invalid).toHaveLength(1);
      expect(invalid[0].instancePath).toBe('/functions/fn/triggers/timer/0');
      expect(invalid[0].message).toContain('SI_CRON_WRONG_FIELD_COUNT');
    });

    it('rejects a timer missing name and a timer missing cron', () => {
      const errors = validateSemantics(
        timerIac(ProviderEnum.ALIYUN, [{ cron: '0 0 * * *' }, { name: 'no-cron' }]),
      );
      expect(errors.filter((error) => error.keyword === 'timerNameRequired')).toHaveLength(1);
      expect(errors.filter((error) => error.keyword === 'timerCronRequired')).toHaveLength(1);
    });

    it('rejects duplicate timer names', () => {
      const errors = validateSemantics(
        timerIac(ProviderEnum.ALIYUN, [
          { name: 'dup', cron: '0 0 * * *' },
          { name: 'dup', cron: '@every 1h' },
        ]),
      );
      const duplicates = errors.filter((error) => error.keyword === 'duplicateTimerName');
      expect(duplicates).toHaveLength(1);
      expect(duplicates[0].instancePath).toBe('/functions/fn/triggers/timer/1');
    });

    it('rejects a volcengine timer with non-zero seconds', () => {
      const errors = validateSemantics(
        timerIac(ProviderEnum.VOLCENGINE, [{ name: 'sub', cron: '30 0 12 * * *' }]),
      );
      const invalid = errors.filter((error) => error.keyword === 'invalidSiCron');
      expect(invalid).toHaveLength(1);
      expect(invalid[0].message).toContain('SI_CRON_SECONDS_UNSUPPORTED');
    });

    it('accepts the same cron on aliyun (6-field dialect supports seconds)', () => {
      const errors = validateSemantics(
        timerIac(ProviderEnum.ALIYUN, [{ name: 'sub', cron: '30 0 12 * * *' }]),
      );
      expect(errors.filter((error) => error.keyword === 'invalidSiCron')).toHaveLength(0);
    });

    it('rejects more than 10 timers on tencent only', () => {
      const timers = Array.from({ length: 11 }, (_, index) => ({
        name: `timer-${index}`,
        cron: '0 0 * * *',
      }));
      const tencentErrors = validateSemantics(timerIac(ProviderEnum.TENCENT, timers));
      expect(tencentErrors.filter((error) => error.keyword === 'timerTriggerLimit')).toHaveLength(
        1,
      );

      const aliyunErrors = validateSemantics(
        timerIac(ProviderEnum.ALIYUN, timers) as ServerlessIacRaw,
      );
      expect(aliyunErrors.filter((error) => error.keyword === 'timerTriggerLimit')).toHaveLength(0);
    });

    it('rejects timers on unsupported providers (huawei)', () => {
      const errors = validateSemantics(
        timerIac(ProviderEnum.HUAWEI, [{ name: 'one', cron: '0 0 * * *' }]),
      );
      const invalid = errors.filter((error) => error.keyword === 'invalidSiCron');
      expect(invalid).toHaveLength(1);
      expect(invalid[0].message).toContain('TIMER_TRIGGER_NOT_SUPPORTED_PROVIDER');
    });

    it('skips grammar checks for template-ref crons', () => {
      const errors = validateSemantics(
        timerIac(ProviderEnum.ALIYUN, [{ name: 'one', cron: '${vars.cron}' }]),
      );
      expect(errors.filter((error) => error.keyword === 'invalidSiCron')).toHaveLength(0);
    });
  });

  describe('trigger duplication', () => {
    it('reports repeated method+path pairs inside one event', () => {
      const errors = validateSemantics(
        buildIac({
          gateway: {
            ...baseEvent,
            triggers: [
              { method: 'GET', path: '/api', backend: '${functions.fn}' },
              { method: 'get', path: '/api', backend: '${functions.fn}' },
            ],
          },
        }) as ServerlessIacRaw,
      );

      const duplicates = errors.filter((error) => error.keyword === 'duplicateTrigger');
      expect(duplicates).toHaveLength(1);
      expect(duplicates[0].instancePath).toBe('/events/gateway/triggers/1');
    });

    it('accepts the same path under different methods', () => {
      const errors = validateSemantics(
        buildIac({
          gateway: {
            ...baseEvent,
            triggers: [
              { method: 'GET', path: '/api', backend: '${functions.fn}' },
              { method: 'POST', path: '/api', backend: '${functions.fn}' },
            ],
          },
        }) as ServerlessIacRaw,
      );

      expect(errors.filter((error) => error.keyword === 'duplicateTrigger')).toHaveLength(0);
    });
  });

  describe('backend references', () => {
    it('flags dangling ${functions.x} references against configured definitions', () => {
      const errors = validateSemantics(
        buildIac({
          gateway: {
            ...baseEvent,
            triggers: [{ method: 'GET', path: '/api', backend: '${functions.missing_fn}' }],
          },
        }) as ServerlessIacRaw,
      );

      const unresolved = errors.filter((error) => error.keyword === 'unresolvedBackendFunction');
      expect(unresolved).toHaveLength(1);
      expect(unresolved[0].instancePath).toBe('/events/gateway/triggers/0');
    });

    it('resolves backends that match a declared function definition key', () => {
      const errors = validateSemantics(
        buildIac(
          {
            gateway: {
              ...baseEvent,
              triggers: [{ method: 'GET', path: '/api', backend: '${functions.known_fn}' }],
            },
          },
          {
            known_fn: {
              name: 'known-function',
              code: { runtime: 'nodejs20', handler: 'index.handler', path: 'code.zip' },
            },
          },
        ) as ServerlessIacRaw,
      );

      expect(errors.filter((error) => error.keyword === 'unresolvedBackendFunction')).toHaveLength(
        0,
      );
    });

    it('ignores non-template backend values', () => {
      const errors = validateSemantics(
        buildIac({
          gateway: {
            ...baseEvent,
            triggers: [{ method: 'GET', path: '/api', backend: 'plain-name-fn' }],
          },
        }) as ServerlessIacRaw,
      );

      expect(errors).toHaveLength(0);
    });

    it('rejects a bare value that equals a template function key (issue #227)', () => {
      const errors = validateSemantics(
        buildIac(
          {
            gateway: {
              ...baseEvent,
              triggers: [{ method: 'GET', path: '/api', backend: 'known_fn' }],
            },
          },
          {
            known_fn: {
              name: 'known-function',
              code: { runtime: 'nodejs20', handler: 'index.handler', path: 'code.zip' },
            },
          },
        ) as ServerlessIacRaw,
      );

      const bareKeyErrors = errors.filter((error) => error.keyword === 'bareBackendKey');
      expect(bareKeyErrors).toHaveLength(1);
      expect(bareKeyErrors[0].instancePath).toBe('/events/gateway/triggers/0');
    });

    it('passes a bare value that equals a template function name and warns to prefer the reference form', () => {
      const errors = validateSemantics(
        buildIac(
          {
            gateway: {
              ...baseEvent,
              triggers: [{ method: 'GET', path: '/api', backend: 'known-function' }],
            },
          },
          {
            known_fn: {
              name: 'known-function',
              code: { runtime: 'nodejs20', handler: 'index.handler', path: 'code.zip' },
            },
          },
        ) as ServerlessIacRaw,
      );

      expect(errors).toHaveLength(0);
      expect(logger.warn).toHaveBeenCalledWith(
        expect.stringContaining('SEMANTIC_BACKEND_BARE_NAME'),
      );
    });

    it('skips backend values that are non-functions template refs (e.g. ${vars.x})', () => {
      const errors = validateSemantics(
        buildIac(
          {
            gateway: {
              ...baseEvent,
              triggers: [{ method: 'GET', path: '/api', backend: '${vars.backend_fn}' }],
            },
          },
          {
            known_fn: {
              name: 'known-function',
              code: { runtime: 'nodejs20', handler: 'index.handler', path: 'code.zip' },
            },
          },
        ) as ServerlessIacRaw,
      );

      expect(errors).toHaveLength(0);
      expect(logger.warn).not.toHaveBeenCalled();
    });

    it('allows external bare backends on volcengine (provider lookup resolves the function Id)', () => {
      const errors = validateSemantics({
        ...buildIac({
          gateway: {
            ...baseEvent,
            triggers: [{ method: 'GET', path: '/api', backend: 'external-fn' }],
          },
        }),
        provider: { name: ProviderEnum.VOLCENGINE, region: 'cn-beijing' },
      } as unknown as ServerlessIacRaw);

      expect(errors).toHaveLength(0);
    });

    it('allows external bare backends on aliyun (gateway assumes the managed role)', () => {
      const errors = validateSemantics({
        ...buildIac({
          gateway: {
            ...baseEvent,
            triggers: [{ method: 'GET', path: '/api', backend: 'external-fn' }],
          },
        }),
        provider: { name: ProviderEnum.ALIYUN, region: 'cn-hangzhou' },
      } as unknown as ServerlessIacRaw);

      expect(errors).toHaveLength(0);
    });
  });

  describe('generated gateway names', () => {
    it('does not report collisions for the issue #221 long-name trigger set', () => {
      const errors = validateSemantics(
        buildIac({
          gateway: {
            ...baseEvent,
            name: 'console-serverlessinsight-api-gateway',
            triggers: [
              { method: 'GET', path: '/healthz', backend: 'fn' },
              { method: 'ANY', path: '/api/*', backend: 'fn' },
              { method: 'ANY', path: '/*', backend: 'fn' },
            ],
          },
        }) as ServerlessIacRaw,
      );

      expect(
        errors.filter((error) =>
          ['duplicateGeneratedApiName', 'duplicateRouteName'].includes(error.keyword),
        ),
      ).toHaveLength(0);
    });

    it('reports duplicate triggers without repeating generated-name collisions', () => {
      const errors = validateSemantics(
        buildIac({
          gateway: {
            ...baseEvent,
            triggers: [
              { method: 'GET', path: '/dup', backend: 'fn' },
              { method: 'GET', path: '/dup', backend: 'fn' },
            ],
          },
        }) as ServerlessIacRaw,
      );

      expect(errors.map((error) => error.keyword)).toEqual(['duplicateTrigger']);
    });

    it('scopes volcengine route checks to single events', () => {
      const volcEvents = {
        first_gateway: {
          ...baseEvent,
          triggers: [{ method: 'GET', path: '/shared', backend: '${functions.fn}' }],
        },
        second_gateway: {
          ...baseEvent,
          triggers: [{ method: 'GET', path: '/shared', backend: '${functions.fn}' }],
        },
      };
      const volcIac = {
        ...buildIac(volcEvents, {
          fn: {
            name: 'fn',
            code: { runtime: 'nodejs20', handler: 'index.handler', path: 'code.zip' },
          },
        }),
        provider: { name: ProviderEnum.VOLCENGINE, region: 'cn-beijing' },
      } as ServerlessIacRaw;

      expect(validateSemantics(volcIac)).toHaveLength(0);
    });
  });

  describe('event domain CDN semantics (issue #283)', () => {
    const keywordsOf = (errors: Array<ErrorObject>): string[] => errors.map((e) => e.keyword);

    const eventWithCdn = (
      cdn: Record<string, unknown>,
      domainExtras: Record<string, unknown> = {},
    ) => ({
      ...baseEvent,
      domain: { domain_name: 'api.example.com', ...domainExtras, cdn },
    });

    it('rejects CDN on event domains of providers without event CDN delivery', () => {
      const iac = {
        ...buildIac({ gw: eventWithCdn({ enabled: true }) }),
        provider: { name: ProviderEnum.TENCENT, region: 'ap-guangzhou' },
      } as ServerlessIacRaw;

      expect(keywordsOf(validateSemantics(iac))).toContain('eventCdnProviderUnsupported');
    });

    it('rejects the legacy domestic scope on an event domain cdn block', () => {
      const errors = validateSemantics(
        buildIac({ gw: eventWithCdn({ enabled: true, scope: 'domestic' }) }),
      );

      expect(keywordsOf(errors)).toContain('eventCdnScopeMigrated');
    });

    it('rejects a cdn_type the provider does not support on event domains', () => {
      const errors = validateSemantics(
        buildIac({ gw: eventWithCdn({ enabled: true, cdn_type: 'media' }) }),
      );

      expect(keywordsOf(errors)).toContain('eventCdnTypeProviderUnsupported');
    });

    it('rejects force_redirect_https without a certificate on an event domain', () => {
      const errors = validateSemantics(
        buildIac({ gw: eventWithCdn({ enabled: true, force_redirect_https: true }) }),
      );

      expect(keywordsOf(errors)).toContain('eventForceRedirectHttpsRequiresCertificate');
    });

    it('accepts a supported event cdn block with a certificate and neutral scope', () => {
      const errors = validateSemantics(
        buildIac({
          gw: eventWithCdn(
            {
              enabled: true,
              cdn_type: 'web',
              scope: 'chinese_mainland',
              force_redirect_https: true,
            },
            { certificate_id: 'cert-1' },
          ),
        }),
      );

      expect(
        errors.filter((e) =>
          [
            'eventCdnScopeMigrated',
            'eventCdnTypeProviderUnsupported',
            'eventForceRedirectHttpsRequiresCertificate',
          ].includes(e.keyword),
        ),
      ).toEqual([]);
    });
  });

  describe('robustness', () => {
    it('returns no errors when events are absent', () => {
      expect(validateSemantics(buildIac({}) as ServerlessIacRaw)).toHaveLength(0);
    });
  });

  describe('function domains semantics (issue #286)', () => {
    const buildFnIac = (
      functions: Record<string, unknown>,
      provider: string = ProviderEnum.ALIYUN,
    ): ServerlessIacRaw =>
      ({
        version: '0.0.1',
        app: 'test-app',
        service: 'test-service',
        provider: { name: provider, region: 'cn-hangzhou' },
        events: {},
        functions,
        buckets: {},
      }) as unknown as ServerlessIacRaw;

    const keywordsOf = (errors: Array<ErrorObject>): string[] => errors.map((e) => e.keyword);

    it('rejects the legacy single-object domain with a migration error', () => {
      const errors = validateSemantics(
        buildFnIac({
          handler: {
            name: 'fn',
            code: { runtime: 'nodejs20', handler: 'index.handler', path: './code' },
            domain: { domain_name: 'api.example.com' },
          },
        }),
      );
      expect(keywordsOf(errors)).toContain('functionDomainMigrated');
    });

    it('requires an HTTP trigger when domains are declared', () => {
      const errors = validateSemantics(
        buildFnIac({
          handler: {
            name: 'fn',
            code: { runtime: 'nodejs20', handler: 'index.handler', path: './code' },
            domains: [{ domain_name: 'api.example.com' }],
          },
        }),
      );
      expect(keywordsOf(errors)).toContain('functionDomainsHttpTriggerRequired');
    });

    it('requires public auth_type on the HTTP trigger', () => {
      const errors = validateSemantics(
        buildFnIac({
          handler: {
            name: 'fn',
            code: { runtime: 'nodejs20', handler: 'index.handler', path: './code' },
            triggers: { http: { auth_type: 'iam' } },
            domains: [{ domain_name: 'api.example.com' }],
          },
        }),
      );
      expect(keywordsOf(errors)).toContain('functionDomainsAuthTypePublicRequired');
    });

    it('requires access to include public when declared', () => {
      const errors = validateSemantics(
        buildFnIac({
          handler: {
            name: 'fn',
            code: { runtime: 'nodejs20', handler: 'index.handler', path: './code' },
            triggers: { http: { auth_type: 'public', access: ['internal'] } },
            domains: [{ domain_name: 'api.example.com' }],
          },
        }),
      );
      expect(keywordsOf(errors)).toContain('functionDomainsAccessPublicRequired');
    });

    it('accepts a valid public function URL with domains', () => {
      const errors = validateSemantics(
        buildFnIac({
          handler: {
            name: 'fn',
            code: { runtime: 'nodejs20', handler: 'index.handler', path: './code' },
            triggers: { http: { auth_type: 'public', access: ['public', 'internal'] } },
            domains: [{ domain_name: 'api.example.com', path: '/api/*' }],
          },
        }),
      );
      expect(errors).toEqual([]);
    });

    it('rejects invalid route paths: wildcard must be trailing and unique', () => {
      const errors = validateSemantics(
        buildFnIac({
          handler: {
            name: 'fn',
            code: { runtime: 'nodejs20', handler: 'index.handler', path: './code' },
            triggers: { http: { auth_type: 'public' } },
            domains: [{ domain_name: 'a.example.com', path: '/api/*/mid' }],
          },
        }),
      );
      expect(keywordsOf(errors)).toContain('functionDomainsInvalidPath');
    });

    it('rejects wildcard domains on providers without wildcard support (tencent)', () => {
      const errors = validateSemantics(
        buildFnIac(
          {
            handler: {
              name: 'fn',
              code: { runtime: 'nodejs20', handler: 'index.handler', path: './code' },
              triggers: { http: { auth_type: 'public' } },
              domains: [{ domain_name: '*.example.com' }],
            },
          },
          ProviderEnum.TENCENT,
        ),
      );
      expect(keywordsOf(errors)).toContain('functionDomainsWildcardUnsupported');
    });

    it('allows wildcard domains on aliyun', () => {
      const errors = validateSemantics(
        buildFnIac({
          handler: {
            name: 'fn',
            code: { runtime: 'nodejs20', handler: 'index.handler', path: './code' },
            triggers: { http: { auth_type: 'public' } },
            domains: [{ domain_name: '*.example.com' }],
          },
        }),
      );
      expect(errors).toEqual([]);
    });

    it('fail-fasts function domains on volcengine (no domain API, #282 row)', () => {
      const errors = validateSemantics(
        buildFnIac(
          {
            handler: {
              name: 'fn',
              code: { runtime: 'nodejs20', handler: 'index.handler', path: './code' },
              triggers: { http: { auth_type: 'public' } },
              domains: [{ domain_name: 'api.example.com' }],
            },
          },
          ProviderEnum.VOLCENGINE,
        ),
      );
      expect(keywordsOf(errors)).toContain('functionDomainsProviderUnsupported');
    });

    it('rejects exact path duplicates within one function', () => {
      const errors = validateSemantics(
        buildFnIac({
          handler: {
            name: 'fn',
            code: { runtime: 'nodejs20', handler: 'index.handler', path: './code' },
            triggers: { http: { auth_type: 'public' } },
            domains: [
              { domain_name: 'api.example.com', path: '/api/*' },
              { domain_name: 'api.example.com' }, // both default to /api/* vs /*? no — second defaults to /*
            ],
          },
        }),
      );
      // '/api/*' vs '/*' are nested prefixes — allowed. Duplicate only when identical.
      expect(keywordsOf(errors)).not.toContain('functionDomainsDuplicateBinding');
    });

    it('rejects identical default paths across bindings on the same domain', () => {
      const errors = validateSemantics(
        buildFnIac({
          handler: {
            name: 'fn',
            code: { runtime: 'nodejs20', handler: 'index.handler', path: './code' },
            triggers: { http: { auth_type: 'public' } },
            domains: [{ domain_name: 'api.example.com' }, { domain_name: 'api.example.com' }],
          },
        }),
      );
      expect(keywordsOf(errors)).toContain('functionDomainsDuplicateBinding');
    });

    it('rejects protocol mismatch across same-domain bindings on different functions', () => {
      const errors = validateSemantics(
        buildFnIac({
          fn_a: {
            name: 'a',
            code: { runtime: 'nodejs20', handler: 'index.handler', path: './code' },
            triggers: { http: { auth_type: 'public' } },
            domains: [{ domain_name: 'api.example.com', protocol: 'HTTPS' }],
          },
          fn_b: {
            name: 'b',
            code: { runtime: 'nodejs20', handler: 'index.handler', path: './code' },
            triggers: { http: { auth_type: 'public' } },
            domains: [{ domain_name: 'api.example.com', protocol: 'HTTP' }],
          },
        }),
      );
      expect(keywordsOf(errors)).toContain('functionDomainsProtocolMismatch');
    });

    it('rejects certificate mismatch across same-domain bindings (id vs inline)', () => {
      const errors = validateSemantics(
        buildFnIac({
          fn_a: {
            name: 'a',
            code: { runtime: 'nodejs20', handler: 'index.handler', path: './code' },
            triggers: { http: { auth_type: 'public' } },
            domains: [{ domain_name: 'api.example.com', certificate_id: 'cert-1' }],
          },
          fn_b: {
            name: 'b',
            code: { runtime: 'nodejs20', handler: 'index.handler', path: './code' },
            triggers: { http: { auth_type: 'public' } },
            domains: [
              {
                domain_name: 'api.example.com',
                certificate_body: 'CERT',
                certificate_private_key: 'KEY',
              },
            ],
          },
        }),
      );
      expect(keywordsOf(errors)).toContain('functionDomainsCertificateMismatch');
    });

    it('rejects exact path conflicts across functions while allowing nested prefixes', () => {
      const conflicts = validateSemantics(
        buildFnIac({
          fn_a: {
            name: 'a',
            code: { runtime: 'nodejs20', handler: 'index.handler', path: './code' },
            triggers: { http: { auth_type: 'public' } },
            domains: [{ domain_name: 'api.example.com', path: '/api/*' }],
          },
          fn_b: {
            name: 'b',
            code: { runtime: 'nodejs20', handler: 'index.handler', path: './code' },
            triggers: { http: { auth_type: 'public' } },
            domains: [{ domain_name: 'api.example.com', path: '/api/*' }],
          },
        }),
      );
      expect(keywordsOf(conflicts)).toContain('functionDomainsPathConflict');

      const nested = validateSemantics(
        buildFnIac({
          fn_a: {
            name: 'a',
            code: { runtime: 'nodejs20', handler: 'index.handler', path: './code' },
            triggers: { http: { auth_type: 'public' } },
            domains: [{ domain_name: 'api.example.com', path: '/api/*' }],
          },
          fn_b: {
            name: 'b',
            code: { runtime: 'nodejs20', handler: 'index.handler', path: './code' },
            triggers: { http: { auth_type: 'public' } },
            domains: [{ domain_name: 'api.example.com' }], // defaults to /*
          },
        }),
      );
      expect(nested).toEqual([]);
    });

    it('skips template-ref values it cannot compare', () => {
      const errors = validateSemantics(
        buildFnIac({
          handler: {
            name: 'fn',
            code: { runtime: 'nodejs20', handler: 'index.handler', path: './code' },
            triggers: { http: { auth_type: 'public' } },
            domains: [{ domain_name: '${vars.host}', protocol: '${vars.proto}' }],
          },
        }),
      );
      expect(errors).toEqual([]);
    });
  });
});

describe('validateYaml semantic integration', () => {
  it('throws IacSchemaErrors aggregating schema and semantic failures', () => {
    const invalidConfig = {
      version: '0.0.1',
      app: 'test-app',
      service: 'test-service',
      provider: { name: 'aliyun', region: 'cn-hangzhou' },
      functions: {},
      events: {
        gateway: {
          type: 'API_GATEWAY',
          name: 'gw',
          triggers: [
            { method: 'GET', path: '/hello', backend: '${functions.absent}' },
            { method: 'POST', path: 'missing-leading-slash', backend: 'fn' },
          ],
        },
      },
    } as unknown as ServerlessIacRaw;

    let thrownError: unknown;
    try {
      validateYaml(invalidConfig);
    } catch (error) {
      thrownError = error;
    }

    expect(thrownError).toBeInstanceOf(Error);
    const errorMessage = (thrownError as Error).message;
    expect(errorMessage).toContain('Invalid yaml');
    const serializedKeywords = JSON.stringify(
      (thrownError as { errors?: Array<{ keyword?: string }> }).errors ?? [],
    );
    expect(serializedKeywords).toContain('unresolvedBackendFunction');
  });
});
