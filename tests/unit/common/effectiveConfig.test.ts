import { resolveEffectiveConfig, assertProviderBinding } from '../../../src/common/effectiveConfig';

describe('effectiveConfig (issue #280 §1)', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    delete process.env.SI_REGION;
    delete process.env.ALIYUN_REGION;
  });

  afterAll(() => {
    process.env = { ...originalEnv };
  });

  describe('resolveEffectiveConfig', () => {
    it('prefers explicit CLI options over YAML defaults', () => {
      const resolved = resolveEffectiveConfig({
        cli: { region: 'ap-southeast-1', provider: 'tencent', stage: 'prod' },
        iacProvider: { name: 'aliyun', region: 'cn-hangzhou' },
      });
      expect(resolved).toMatchObject({
        region: 'ap-southeast-1',
        provider: 'tencent',
        stage: 'prod',
        overrides: { region: true, provider: true, stage: true },
      });
    });

    it('falls back to YAML defaults when the CLI is silent', () => {
      const resolved = resolveEffectiveConfig({
        cli: {},
        iacProvider: { name: 'volcengine', region: 'cn-beijing' },
      });
      expect(resolved).toMatchObject({
        region: 'cn-beijing',
        provider: 'volcengine',
        stage: 'default',
        overrides: { region: false, provider: false, stage: false },
      });
    });

    it('keeps environment fallbacks only when CLI and YAML are both silent', () => {
      process.env.SI_REGION = 'eu-central-1';
      const resolved = resolveEffectiveConfig({ cli: {}, iacProvider: {} });
      expect(resolved.region).toBe('eu-central-1');

      // YAML wins over env — env is not a new override channel for explicit YAML values
      const withYaml = resolveEffectiveConfig({
        cli: {},
        iacProvider: { region: 'cn-hangzhou' },
      });
      expect(withYaml.region).toBe('cn-hangzhou');
    });

    it('defaults provider to aliyun and stage to default', () => {
      const resolved = resolveEffectiveConfig({ cli: {}, iacProvider: {} });
      expect(resolved.provider).toBe('aliyun');
      expect(resolved.stage).toBe('default');
    });

    it('canonicalizes the region (trim + lowercase)', () => {
      const resolved = resolveEffectiveConfig({
        cli: { region: ' CN-Hangzhou ' },
        iacProvider: {},
      });
      expect(resolved.region).toBe('cn-hangzhou');
    });

    it('rejects unknown providers', () => {
      expect(() => resolveEffectiveConfig({ cli: { provider: 'gcp' }, iacProvider: {} })).toThrow();
    });

    it('rejects an empty region', () => {
      process.env.SI_REGION = '';
      expect(() => resolveEffectiveConfig({ cli: {}, iacProvider: { region: '  ' } })).toThrow();
    });

    it('rejects path-unsafe stages', () => {
      expect(() => resolveEffectiveConfig({ cli: { stage: '../x' }, iacProvider: {} })).toThrow();
    });
  });

  describe('assertProviderBinding', () => {
    it('accepts the matching provider', () => {
      expect(() => assertProviderBinding('aliyun', 'aliyun')).not.toThrow();
    });

    it('rejects a service/provider mismatch before any mutation', () => {
      expect(() => assertProviderBinding('aliyun', 'tencent')).toThrow(/Provider mismatch/);
    });
  });
});
