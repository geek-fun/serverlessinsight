import { buildConstrainedName, CONSTRAINT_NAME_LIMITS } from '../../../src/common/nameBuilder';
import { buildAliyunApigwApiName, generateApiKey } from '../../../src/common/providerNames';

describe('buildConstrainedName', () => {
  describe('legacy fit path', () => {
    it('returns the sanitized join unchanged when it fits the maximum length', () => {
      expect(
        buildConstrainedName({
          parts: ['test-gateway', 'dev', 'agw_api', 'GET_users'],
          maxLength: 50,
          charset: 'underscore',
        }),
      ).toBe('test_gateway_dev_agw_api_GET_users');
    });

    it('folds underscores into hyphens for the hyphen charset', () => {
      expect(
        buildConstrainedName({
          parts: ['rest api', 'POST', 'api_v1'],
          maxLength: 63,
          charset: 'hyphen',
        }),
      ).toBe('rest-api-POST-api-v1');
    });

    it('is deterministic for identical inputs', () => {
      const options = {
        parts: ['a-name', 'stage-x'],
        maxLength: 20,
        charset: 'underscore' as const,
      };
      expect(buildConstrainedName(options)).toBe(buildConstrainedName(options));
    });

    it('skips empty segments instead of emitting dangling separators', () => {
      expect(
        buildConstrainedName({
          parts: ['', 'only-part', ''],
          maxLength: 30,
          charset: 'underscore',
        }),
      ).toBe('only_part');
    });
  });

  describe('constrained path', () => {
    const longEventName = 'console-serverlessinsight-api-gateway';

    const constrainedOptions = (apiKey: string) => ({
      parts: [longEventName, 'prod', 'agw_api', apiKey],
      maxLength: CONSTRAINT_NAME_LIMITS.ALIYUN_CREATE_API_NAME,
      charset: 'underscore' as const,
    });

    it('preserves the discriminator segments of an over-long composition', () => {
      const name = buildConstrainedName(constrainedOptions('GET_healthz'));

      expect(name.length).toBeLessThanOrEqual(50);
      expect(name).toContain('_GET_healthz_');
    });

    it('appends the hash after truncating only the leading segments', () => {
      const name = buildConstrainedName(constrainedOptions('GET_healthz'));

      expect(name.startsWith('console_serverlessinsight')).toBe(true);
      expect(name.endsWith('GET_healthz')).toBe(false);
      expect(name.split('_').pop()).toHaveLength(7);
    });

    it('never collapses distinct raw inputs that sanitise identically', () => {
      const firstVariant = buildConstrainedName({
        ...constrainedOptions('x y'),
      });
      const secondVariant = buildConstrainedName({
        ...constrainedOptions('x_y'),
      });

      expect(new Set([firstVariant, secondVariant]).size).toBe(2);
    });

    it('degrades gracefully to a hash-only name for tiny maximum lengths', () => {
      const name = buildConstrainedName({
        parts: ['long-segment-here'],
        maxLength: 8,
        charset: 'underscore',
      });

      expect(name.length).toBeLessThanOrEqual(8);
    });
  });
});

describe('providerNames', () => {
  it('generates the historic apiKey from method and path', () => {
    expect(generateApiKey('GET', '/healthz')).toBe('GET_healthz');
  });

  it('keeps fitting aliyun apiNames byte-compatible with the pre-builder format', () => {
    expect(buildAliyunApigwApiName('test-gateway-dev', 'default', 'GET_users')).toBe(
      'test_gateway_dev_default_agw_api_GET_users',
    );
  });

  it('produces unique aliyun apiNames for the issue #221 collision set', () => {
    const eventName = 'console-serverlessinsight-api-gateway';
    const apiKeys = [
      generateApiKey('GET', '/healthz'),
      generateApiKey('ANY', '/api/*'),
      generateApiKey('ANY', '/*'),
    ];
    const apiNames = apiKeys.map((apiKey) => buildAliyunApigwApiName(eventName, 'prod', apiKey));

    expect(new Set(apiNames).size).toBe(apiNames.length);
    apiNames.forEach((name) => {
      expect(name.length).toBeLessThanOrEqual(CONSTRAINT_NAME_LIMITS.ALIYUN_CREATE_API_NAME);
      expect(name).toMatch(/^[A-Za-z0-9_]+$/);
    });
  });
});
