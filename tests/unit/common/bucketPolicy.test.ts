import {
  buildBucketPolicy,
  serializeBucketPolicy,
  normalizeBucketPolicyDefinition,
} from '../../../src/common/bucketPolicy';
import { remoteDiffersFromDesired, managedDefinition } from '../../../src/common/planCompare';
import type { BucketIam } from '../../../src/types';

const iam: BucketIam = {
  resource: {
    statements: [
      {
        effect: 'Allow',
        principal: { AWS: ['reader'] },
        action: ['GetObject'],
        resource: ['bucket/*'],
        condition: { test: 'value' },
      },
    ],
  },
};

describe('effective bucket policy definitions', () => {
  it.each(['aliyun', 'tencent', 'volcengine'] as const)(
    'uses the same %s policy document for cloud writes and comparisons',
    (provider) => {
      const desired = { policy: serializeBucketPolicy(iam, provider) };
      const live = { policy: JSON.stringify(buildBucketPolicy(iam, provider)) };
      expect(remoteDiffersFromDesired(live, desired)).toBe(false);
      expect(
        managedDefinition(
          normalizeBucketPolicyDefinition({ policy: JSON.stringify(iam) }, provider),
        ),
      ).toEqual(managedDefinition(desired));
    },
  );

  it('uses provider-specific version, casing, and effect normalization', () => {
    expect(buildBucketPolicy(iam, 'aliyun')).toMatchObject({
      Version: '1',
      Statement: [{ Effect: 'Allow', Condition: { test: 'value' } }],
    });
    expect(buildBucketPolicy(iam, 'tencent')).toMatchObject({
      version: '2.0',
      statement: [{ effect: 'allow', condition: { test: 'value' } }],
    });
    expect(buildBucketPolicy(iam, 'volcengine')).not.toHaveProperty('Version');
  });

  it('handles absent and empty policies without manufacturing a declaration', () => {
    expect(buildBucketPolicy(undefined, 'aliyun')).toBeNull();
    expect(serializeBucketPolicy({ resource: { statements: [] } }, 'tencent')).toBe('null');
    expect(
      buildBucketPolicy(
        {
          resource: {
            statements: [
              {
                effect: 'Deny',
                principal: { AWS: '*' },
                action: ['DeleteObject'],
                resource: ['bucket/*'],
              },
            ],
          },
        },
        'volcengine',
      ),
    ).toEqual({
      Statement: [
        {
          Effect: 'Deny',
          Principal: { AWS: '*' },
          Action: ['DeleteObject'],
          Resource: ['bucket/*'],
        },
      ],
    });
    expect(
      buildBucketPolicy(
        {
          resource: {
            statements: [
              {
                effect: 'Allow',
                principal: { AWS: '*' },
                action: ['GetObject'],
                resource: ['bucket/*'],
              },
            ],
          },
        },
        'tencent',
      ),
    ).toEqual({
      version: '2.0',
      statement: [
        { effect: 'allow', principal: { AWS: '*' }, action: ['GetObject'], resource: ['bucket/*'] },
      ],
    });
  });

  it.each([
    {},
    { policy: null },
    { policy: 'invalid' },
    { policy: '{"Version":"1","Statement":[]}' },
    { policy: 'null' },
  ])('preserves non-legacy definitions: %j', (definition) => {
    expect(normalizeBucketPolicyDefinition(definition, 'aliyun')).toEqual(definition);
  });
  it('distinguishes an explicit policy clear from omitted IAM', () => {
    expect(serializeBucketPolicy({ resource: { statements: [] } }, 'aliyun')).toBe('null');
    expect(serializeBucketPolicy(undefined, 'aliyun')).toBeNull();
  });
});
