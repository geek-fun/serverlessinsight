import { validateSemantics } from '../../../src/validator/semanticValidation';
import { validateYaml } from '../../../src/validator/iacSchema';
import { ServerlessIacRaw } from '../../../src/types';
import { ProviderEnum } from '../../../src/common';
import { logger } from '../../../src/common/logger';

jest.mock('../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

jest.mock('../../../src/lang', () => ({
  lang: { __: (key: string) => key },
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
          { known_fn: { name: 'known-function' } },
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
          { known_fn: { name: 'known-function' } },
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
          { known_fn: { name: 'known-function' } },
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
          { known_fn: { name: 'known-function' } },
        ) as ServerlessIacRaw,
      );

      expect(errors).toHaveLength(0);
      expect(logger.warn).not.toHaveBeenCalled();
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
          triggers: [{ method: 'GET', path: '/shared', backend: 'fn' }],
        },
        second_gateway: {
          ...baseEvent,
          triggers: [{ method: 'GET', path: '/shared', backend: 'fn' }],
        },
      };
      const volcIac = {
        ...buildIac(volcEvents),
        provider: { name: ProviderEnum.VOLCENGINE, region: 'cn-beijing' },
      } as ServerlessIacRaw;

      expect(validateSemantics(volcIac)).toHaveLength(0);
    });
  });

  describe('robustness', () => {
    it('returns no errors when events are absent', () => {
      expect(validateSemantics(buildIac({}) as ServerlessIacRaw)).toHaveLength(0);
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
