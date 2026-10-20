import type { BucketIam, ResourceAttributes, ResourceState } from '../types';

type PolicyProvider = 'aliyun' | 'tencent' | 'volcengine';

/** The exact provider document used by both comparison and write requests. */
export const buildBucketPolicy = (
  iam: BucketIam | undefined,
  provider: PolicyProvider,
): Record<string, unknown> | null => {
  if (!iam?.resource?.statements?.length) return null;
  if (provider === 'tencent') {
    return {
      version: '2.0',
      statement: iam.resource.statements.map((statement) => ({
        effect: statement.effect.toLowerCase(),
        principal: statement.principal,
        action: statement.action,
        resource: statement.resource,
        ...(statement.condition ? { condition: statement.condition } : {}),
      })),
    };
  }
  return {
    ...(provider === 'aliyun' ? { Version: '1' } : {}),
    Statement: iam.resource.statements.map((statement) => ({
      Effect: statement.effect,
      Principal: statement.principal,
      Action: statement.action,
      Resource: statement.resource,
      ...(statement.condition ? { Condition: statement.condition } : {}),
    })),
  };
};

export const serializeBucketPolicy = (
  iam: BucketIam | undefined,
  provider: PolicyProvider,
): string | null => {
  const policy = buildBucketPolicy(iam, provider);
  return policy ? JSON.stringify(policy) : iam?.resource?.statements !== undefined ? 'null' : null;
};

/** A policy is ours when state records its instance, or when pre-instance state stored a policy document. */
export const isOwnedBucketPolicy = (
  policyInstanceType: string,
  instances: Array<Record<string, unknown>> | undefined,
  definition: ResourceAttributes | undefined,
): boolean =>
  (instances ?? []).some((instance) => instance.type === policyInstanceType) ||
  (typeof definition?.policy === 'string' && definition.policy !== 'null');

/** A recorded policy the YAML no longer declares (omitted or emptied statements) is removed. */
export const removedBucketPolicy = (
  policyInstanceType: string,
  currentState: ResourceState | undefined,
  desired: ResourceAttributes,
): ResourceAttributes =>
  currentState &&
  isOwnedBucketPolicy(policyInstanceType, currentState.instances, currentState.definition) &&
  (desired.policy === null || desired.policy === 'null')
    ? { policy: currentState.definition.policy ?? null }
    : {};

/** Read older saved intent without treating the DSL-to-wire migration as drift. */
export const normalizeBucketPolicyDefinition = (
  definition: ResourceAttributes,
  provider: PolicyProvider,
): ResourceAttributes => {
  if (typeof definition.policy !== 'string') return definition;
  try {
    const value = JSON.parse(definition.policy) as { resource?: { statements?: unknown } };
    if (value?.resource && Array.isArray(value.resource.statements)) {
      return { ...definition, policy: serializeBucketPolicy(value as BucketIam, provider) };
    }
  } catch {
    // Invalid documents are preserved so comparison cannot silently erase them.
  }
  return definition;
};
