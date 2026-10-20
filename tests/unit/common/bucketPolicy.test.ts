import {
  buildBucketPolicy,
  serializeBucketPolicy,
  normalizeBucketPolicyDefinition,
  isOwnedBucketPolicy,
  removedBucketPolicy,
} from '../../../src/common/bucketPolicy';
import { remoteDiffersFromDesired, managedDefinition } from '../../../src/common/planCompare';
import type { BucketIam, ResourceState } from '../../../src/types';
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

  describe('isOwnedBucketPolicy', () => {
    it('is owned when the state records a policy instance', () => {
      expect(
        isOwnedBucketPolicy('ALIYUN_OSS_BUCKET_POLICY', [{ type: 'ALIYUN_OSS_BUCKET_POLICY' }], {
          policy: null,
        }),
      ).toBe(true);
    });

    it('is owned when pre-instance state stored a real policy document', () => {
      expect(
        isOwnedBucketPolicy('ALIYUN_OSS_BUCKET_POLICY', [], { policy: '{"Version":"1"}' }),
      ).toBe(true);
    });

    it('is not owned without an instance or a stored policy document', () => {
      expect(isOwnedBucketPolicy('ALIYUN_OSS_BUCKET_POLICY', [], { policy: null })).toBe(false);
      expect(isOwnedBucketPolicy('ALIYUN_OSS_BUCKET_POLICY', [], { policy: 'null' })).toBe(false);
      expect(isOwnedBucketPolicy('ALIYUN_OSS_BUCKET_POLICY', [{ type: 'OTHER' }], undefined)).toBe(
        false,
      );
    });
  });

  describe('removedBucketPolicy', () => {
    const state = (instances: Array<Record<string, unknown>>): ResourceState =>
      ({
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: { policy: '{"Version":"1"}' },
        instances,
        lastUpdated: '2024-01-01T00:00:00Z',
      }) as unknown as ResourceState;

    it('reports the recorded policy when owned but omitted from the desired definition', () => {
      expect(
        removedBucketPolicy(
          'ALIYUN_OSS_BUCKET_POLICY',
          state([{ type: 'ALIYUN_OSS_BUCKET_POLICY' }]),
          {
            policy: null,
          },
        ),
      ).toEqual({ policy: '{"Version":"1"}' });
    });

    it('reports the recorded policy when the desired definition empties it explicitly', () => {
      expect(
        removedBucketPolicy('ALIYUN_OSS_BUCKET_POLICY', state([]), { policy: 'null' }),
      ).toEqual({ policy: '{"Version":"1"}' });
    });

    it('reports nothing for an unowned policy, a kept policy, or fresh state', () => {
      const unowned: ResourceState = {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: { policy: null },
        instances: [{ type: 'OTHER' }],
        lastUpdated: '2024-01-01T00:00:00Z',
      } as unknown as ResourceState;
      expect(removedBucketPolicy('ALIYUN_OSS_BUCKET_POLICY', unowned, { policy: null })).toEqual(
        {},
      );
      expect(
        removedBucketPolicy(
          'ALIYUN_OSS_BUCKET_POLICY',
          state([{ type: 'ALIYUN_OSS_BUCKET_POLICY' }]),
          {
            policy: '{"Version":"1"}',
          },
        ),
      ).toEqual({});
      expect(removedBucketPolicy('ALIYUN_OSS_BUCKET_POLICY', undefined, { policy: null })).toEqual(
        {},
      );
    });
  });
});
