import {
  bucketToTosConfig,
  extractTosBucketDefinition,
} from '../../../../src/stack/volcengineStack/tosTypes';
import type { BucketDomain } from '../../../../src/types';

describe('tosTypes', () => {
  describe('bucketToTosConfig', () => {
    it('should pass iam through when present', () => {
      const bucket: BucketDomain = {
        key: 'test_bucket',
        name: 'test-bucket',
        iam: {
          resource: {
            statements: [
              {
                effect: 'Allow',
                principal: { AWS: '*', Service: 'compute.aliyun.com' },
                action: ['tos:GetObject', 'tos:PutObject'],
                resource: ['trn:tos:::my-bucket/*', 'trn:tos:::my-bucket'],
              },
            ],
          },
        },
      };

      const config = bucketToTosConfig(bucket);
      expect(config.iam).toEqual(bucket.iam);
    });

    it('should not include iam when not present', () => {
      const bucket: BucketDomain = {
        key: 'test_bucket',
        name: 'test-bucket',
      };

      const config = bucketToTosConfig(bucket);
      expect(config.iam).toBeUndefined();
    });

    it('should include iam with empty statements', () => {
      const bucket: BucketDomain = {
        key: 'test_bucket',
        name: 'test-bucket',
        iam: {
          resource: {
            statements: [],
          },
        },
      };

      const config = bucketToTosConfig(bucket);
      expect(config.iam).toEqual({ resource: { statements: [] } });
    });
  });

  describe('extractTosBucketDefinition', () => {
    it('should serialize policy when iam is configured', () => {
      const iam = {
        resource: {
          statements: [
            {
              effect: 'Allow' as const,
              principal: { Service: 'tos.volcengine.com' },
              action: ['tos:GetObject'],
              resource: ['trn:tos:::my-bucket/*'],
            },
          ],
        },
      };

      const config = bucketToTosConfig({
        key: 'test_bucket',
        name: 'test-bucket',
        iam,
      });

      const def = extractTosBucketDefinition(config);
      expect(def.policy).toBe(JSON.stringify(iam));
    });

    it('should set null policy when iam is absent', () => {
      const config = bucketToTosConfig({
        key: 'test_bucket',
        name: 'test-bucket',
      });

      const def = extractTosBucketDefinition(config);
      expect(def.policy).toBeNull();
    });

    it('should set null policy when iam has empty statements', () => {
      const config = bucketToTosConfig({
        key: 'test_bucket',
        name: 'test-bucket',
        iam: { resource: { statements: [] } },
      });

      const def = extractTosBucketDefinition(config);
      expect(def.policy).toBeNull();
    });

    it('should include websiteCodeHash when provided', () => {
      const config = bucketToTosConfig({
        key: 'test_bucket',
        name: 'test-bucket',
      });

      const def = extractTosBucketDefinition(config, 'abc123');
      expect(def.websiteCodeHash).toBe('abc123');
    });
  });
});
