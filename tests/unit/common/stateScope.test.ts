import {
  validateScopeKeyPart,
  canonicalizeRegion,
  normalizeScope,
  buildScopedStatePath,
  buildScopedObjectKey,
  stateScopeMatches,
} from '../../../src/common/stateScope';

describe('stateScope (issue #280 contracts)', () => {
  describe('validateScopeKeyPart', () => {
    it('accepts normal identifiers', () => {
      expect(validateScopeKeyPart('prod', 'stage')).toBe('prod');
      expect(validateScopeKeyPart('my-app', 'app')).toBe('my-app');
    });

    it('rejects empty values', () => {
      expect(() => validateScopeKeyPart('', 'stage')).toThrow();
      expect(() => validateScopeKeyPart('   ', 'stage')).toThrow();
      expect(() => validateScopeKeyPart(undefined as unknown as string, 'stage')).toThrow();
    });

    it('rejects path-escaping values', () => {
      expect(() => validateScopeKeyPart('a/b', 'app')).toThrow();
      expect(() => validateScopeKeyPart('a\\b', 'app')).toThrow();
      expect(() => validateScopeKeyPart('..', 'app')).toThrow();
      expect(() => validateScopeKeyPart('a/../b', 'app')).toThrow();
      expect(() => validateScopeKeyPart('.', 'app')).toThrow();
      expect(() => validateScopeKeyPart(' prod', 'stage')).toThrow();
      expect(() => validateScopeKeyPart('prod ', 'stage')).toThrow();
    });
  });

  describe('canonicalizeRegion', () => {
    it('trims and lowercases', () => {
      expect(canonicalizeRegion(' CN-Hangzhou ')).toBe('cn-hangzhou');
    });

    it('rejects missing regions — ambiguity never selects an arbitrary state', () => {
      expect(() => canonicalizeRegion(undefined)).toThrow();
      expect(() => canonicalizeRegion('')).toThrow();
      expect(() => canonicalizeRegion('  ')).toThrow();
    });

    it('rejects path-unsafe regions', () => {
      expect(() => canonicalizeRegion('../evil')).toThrow();
    });
  });

  describe('normalizeScope', () => {
    it('normalizes and validates every part', () => {
      const scope = normalizeScope({
        provider: 'aliyun',
        app: 'app',
        service: 'svc',
        stage: 'prod',
        region: 'CN-HANGZHOU',
      });
      expect(scope.region).toBe('cn-hangzhou');
    });

    it('rejects an invalid stage', () => {
      expect(() =>
        normalizeScope({
          provider: 'aliyun',
          app: 'app',
          service: 'svc',
          stage: '../x',
          region: 'cn-hangzhou',
        }),
      ).toThrow();
    });
  });

  describe('buildScopedStatePath', () => {
    it('produces the documented local layout', () => {
      expect(buildScopedStatePath('app', 'svc', 'prod', 'cn-hangzhou', '/base')).toBe(
        '/base/.serverlessinsight/states/app/svc/prod/cn-hangzhou/state.json',
      );
    });

    it('isolates two regions of the same service+stage', () => {
      const a = buildScopedStatePath('app', 'svc', 'prod', 'cn-hangzhou', '/base');
      const b = buildScopedStatePath('app', 'svc', 'prod', 'ap-southeast-1', '/base');
      expect(a).not.toBe(b);
    });

    it('rejects unsafe segments', () => {
      expect(() => buildScopedStatePath('app', 'svc', 'p/q', 'cn-hangzhou', '/base')).toThrow();
    });
  });

  describe('buildScopedObjectKey', () => {
    it('nests scoped objects under the configured key', () => {
      expect(buildScopedObjectKey('infra/state', 'app', 'svc', 'prod', 'cn-hangzhou')).toBe(
        'infra/state.scopes/app/svc/prod/cn-hangzhou/state.json',
      );
    });

    it('keeps the legacy key discoverable and distinct per region', () => {
      const a = buildScopedObjectKey('k', 'app', 'svc', 'prod', 'cn-hangzhou');
      const b = buildScopedObjectKey('k', 'app', 'svc', 'prod', 'ap-southeast-1');
      expect(a).toContain('.scopes/');
      expect(a).not.toBe(b);
    });

    it('rejects an empty configured key', () => {
      expect(() => buildScopedObjectKey('', 'app', 'svc', 'prod', 'cn-hangzhou')).toThrow();
    });
  });

  describe('stateScopeMatches', () => {
    it('matches the same stage+region case-insensitively on region', () => {
      expect(
        stateScopeMatches({ stage: 'prod', region: 'CN-Hangzhou' }, 'prod', 'cn-hangzhou'),
      ).toBe(true);
    });

    it('rejects a different stage or region', () => {
      expect(
        stateScopeMatches({ stage: 'prod', region: 'cn-hangzhou' }, 'dev', 'cn-hangzhou'),
      ).toBe(false);
      expect(
        stateScopeMatches({ stage: 'prod', region: 'cn-hangzhou' }, 'prod', 'ap-southeast-1'),
      ).toBe(false);
    });
  });
});
