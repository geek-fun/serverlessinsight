import {
  validateScopeKeyPart,
  canonicalizeRegion,
  normalizeScope,
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
