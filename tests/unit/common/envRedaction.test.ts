import {
  redactEnvironment,
  isSecretEnvKey,
  fingerprintEnvValue,
  redactEnvironmentOrEmpty,
} from '../../../src/common/envRedaction';

describe('envRedaction (issue #23 Phase 9)', () => {
  it('fingerprints secret-bearing keys and keeps the rest as plaintext', () => {
    const redacted = redactEnvironment({
      NODE_ENV: 'production',
      CONFIG_SECRET: 'super-secret-value',
      OTA_PREFLIGHT_TOKEN: 'tok-123',
      DB_PASSWORD: 'pw',
      logLevel: 'info',
    });
    expect(redacted).toEqual({
      NODE_ENV: 'production',
      CONFIG_SECRET: fingerprintEnvValue('super-secret-value'),
      OTA_PREFLIGHT_TOKEN: fingerprintEnvValue('tok-123'),
      DB_PASSWORD: fingerprintEnvValue('pw'),
      logLevel: 'info',
    });
  });

  it('fingerprints are stable for equal values and differ for different values', () => {
    expect(fingerprintEnvValue('same')).toBe(fingerprintEnvValue('same'));
    expect(fingerprintEnvValue('a')).not.toBe(fingerprintEnvValue('b'));
    expect(fingerprintEnvValue('v')).toMatch(/^fpr:[0-9a-f]{16}$/);
  });

  it('detects the secret-key vocabulary, case-insensitively', () => {
    expect(isSecretEnvKey('CONFIG_SECRET')).toBe(true);
    expect(isSecretEnvKey('db_password')).toBe(true);
    expect(isSecretEnvKey('OTA_PREFLIGHT_TOKEN')).toBe(true);
    expect(isSecretEnvKey('ALIBABA_CLOUD_ACCESS_KEY_ID')).toBe(true);
    expect(isSecretEnvKey('private_key_pem')).toBe(true);
    expect(isSecretEnvKey('NODE_ENV')).toBe(false);
    expect(isSecretEnvKey('logLevel')).toBe(false);
  });

  it('passes through undefined and empty maps', () => {
    expect(redactEnvironment(undefined)).toBeUndefined();
    expect(redactEnvironmentOrEmpty(undefined)).toEqual({});
    expect(redactEnvironment({})).toEqual({});
  });

  it('drops undefined values while redacting the rest', () => {
    expect(redactEnvironment({ A: 'plain', B: undefined, API_TOKEN: 't' })).toEqual({
      A: 'plain',
      API_TOKEN: fingerprintEnvValue('t'),
    });
  });
});
