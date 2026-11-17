import { createHash } from 'node:crypto';

/**
 * Issue #23 Phase 9: function environment maps persist into the deployment
 * state (bucket or SaaS). Secret-bearing keys must not store plaintext —
 * they are replaced by a stable fingerprint so drift comparison still works
 * (both the desired definition and the remote capture pass through the same
 * redaction, so equal values yield equal fingerprints), while the value
 * itself never leaves the CLI process.
 */
const SECRET_ENV_KEY =
  /secret|password|passwd|token|credential|api[-_]?key|access[-_]?key|private|cert(?![a-z])/i;

export const isSecretEnvKey = (key: string): boolean => SECRET_ENV_KEY.test(key);

export const fingerprintEnvValue = (value: string): string =>
  `fpr:${createHash('sha256').update(value).digest('hex').slice(0, 16)}`;

export const redactEnvironment = (
  environment: Record<string, string | undefined> | undefined,
): Record<string, string> | undefined => {
  if (!environment) {
    return undefined;
  }
  const redacted: Record<string, string> = {};
  for (const [key, value] of Object.entries(environment)) {
    if (value === undefined) continue;
    redacted[key] = isSecretEnvKey(key) ? fingerprintEnvValue(value) : value;
  }
  return redacted;
};

export const redactEnvironmentOrEmpty = (
  environment: Record<string, string | undefined> | undefined,
): Record<string, string> => redactEnvironment(environment) ?? {};
