import path from 'node:path';
import {
  validateScopeKeyPart,
  canonicalizeRegion,
  normalizeScope,
  buildScopedStatePath,
  buildScopedObjectKey,
  stateScopeMatches,
  buildServiceBindingPath,
  buildServiceObjectKey,
  getPreviousScopedLocations,
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
      // path.join keeps the layout platform-correct (Windows separators).
      expect(buildScopedStatePath('app', 'svc', 'prod', 'cn-hangzhou', '/base')).toBe(
        path.join(
          '/base',
          '.serverlessinsight',
          'states',
          'app',
          'svc_prod_cn-hangzhou_state.json',
        ),
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
        'infra/state.scopes/app/svc_prod_cn-hangzhou_state.json',
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

  it('stores one provider binding per service directly under the app', () => {
    expect(buildServiceBindingPath('app', 'svc', '/base')).toBe(
      path.join('/base', '.serverlessinsight', 'states', 'app', 'svc_provider.json'),
    );
    expect(buildServiceObjectKey('infra/state/', 'app', 'svc')).toBe(
      'infra/state.scopes/app/svc_provider.json',
    );
    expect(() => buildServiceObjectKey('', 'app', 'svc')).toThrow();
  });

  it('escapes underscores and percent signs without changing scope identity', () => {
    const left = buildScopedObjectKey('k', 'app', 'svc', 'dev_blue', 'cn-hangzhou');
    const right = buildScopedObjectKey('k', 'app', 'svc_dev', 'blue', 'cn-hangzhou');
    expect(left).toBe('k.scopes/app/svc_dev%5Fblue_cn-hangzhou_state.json');
    expect(right).toBe('k.scopes/app/svc%5Fdev_blue_cn-hangzhou_state.json');
    expect(left).not.toBe(right);
    expect(buildScopedObjectKey('k', 'app', 'svc', 'dev%5Fblue', 'cn-hangzhou')).not.toBe(left);
    expect(buildServiceObjectKey('k', 'app', 'svc_dev')).toBe(
      'k.scopes/app/svc%5Fdev_provider.json',
    );
    expect(
      normalizeScope({
        provider: 'aliyun',
        app: 'app',
        service: 'svc',
        stage: 'dev_blue',
        region: 'cn-hangzhou',
      }).stage,
    ).toBe('dev_blue');
  });

  describe('previous preview layout detection', () => {
    it('identifies the old binding, state, lock and recovery files', () => {
      expect(getPreviousScopedLocations('k.scopes/app/svc_prod_cn-hangzhou_state.json')).toEqual([
        'k.scopes/app/svc/provider.json',
        'k.scopes/app/svc/prod/cn-hangzhou/state.json',
        'k.scopes/app/svc/prod/cn-hangzhou/state.json.si-lock',
        'k.scopes/app/svc/prod/cn-hangzhou/state.json.backup',
        'k.scopes/app/svc/prod/cn-hangzhou/state.json.tmp',
      ]);
    });

    it('preserves Windows separators and decodes escaped identity fields', () => {
      const locations = getPreviousScopedLocations(
        'C:\\work\\app\\svc_dev%5Fblue_cn-hangzhou_state.json',
      );
      expect(locations[1]).toBe('C:\\work\\app\\svc\\dev_blue\\cn-hangzhou\\state.json');
    });

    it('supports relative keys and ignores unrelated custom locations', () => {
      expect(getPreviousScopedLocations('svc_prod_cn-hangzhou_state.json')[1]).toBe(
        'svc/prod/cn-hangzhou/state.json',
      );
      [
        '',
        'custom/state.json',
        'svc__cn-hangzhou_state.json',
        'svc_prod_cn-hangzhou_state.json_extra',
      ].forEach((value) => expect(getPreviousScopedLocations(value)).toEqual([]));
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
