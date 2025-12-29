import {
  bucketToCosBucketConfig,
  computeBucketConfigHash,
} from '../../../src/stack/scfStack/cosTypes';
import { BucketDomain, BucketAccessEnum } from '../../../src/types';

describe('CosTypes', () => {
  describe('bucketToCosBucketConfig', () => {
    it('should convert bucket domain to COS bucket config with minimal fields', () => {
      const bucket: BucketDomain = {
        key: 'test_bucket',
        name: 'test-bucket',
      };

      const result = bucketToCosBucketConfig(bucket, 'ap-guangzhou');

      expect(result).toEqual({
        Bucket: 'test-bucket',
        Region: 'ap-guangzhou',
      });
    });

    it('should include ACL when security is defined', () => {
      const bucket: BucketDomain = {
        key: 'test_bucket',
        name: 'test-bucket',
        security: {
          acl: BucketAccessEnum.PUBLIC_READ,
          force_delete: false,
        },
      };

      const result = bucketToCosBucketConfig(bucket, 'ap-guangzhou');

      expect(result).toEqual({
        Bucket: 'test-bucket',
        Region: 'ap-guangzhou',
        ACL: 'public-read',
      });
    });

    it('should map all ACL types correctly', () => {
      const testCases = [
        { acl: BucketAccessEnum.PRIVATE, expected: 'private' },
        { acl: BucketAccessEnum.PUBLIC_READ, expected: 'public-read' },
        { acl: BucketAccessEnum.PUBLIC_READ_WRITE, expected: 'public-read-write' },
      ];

      testCases.forEach(({ acl, expected }) => {
        const bucket: BucketDomain = {
          key: 'test_bucket',
          name: 'test-bucket',
          security: { acl, force_delete: false },
        };

        const result = bucketToCosBucketConfig(bucket, 'ap-guangzhou');

        expect(result.ACL).toBe(expected);
      });
    });

    it('should include website configuration when website is defined', () => {
      const bucket: BucketDomain = {
        key: 'test_bucket',
        name: 'test-bucket',
        website: {
          index: 'index.html',
          code: 'dist',
          error_page: '404.html',
          error_code: 404,
        },
      };

      const result = bucketToCosBucketConfig(bucket, 'ap-guangzhou');

      expect(result).toEqual({
        Bucket: 'test-bucket',
        Region: 'ap-guangzhou',
        WebsiteConfiguration: {
          IndexDocument: {
            Suffix: 'index.html',
          },
          ErrorDocument: {
            Key: '404.html',
          },
        },
      });
    });

    it('should include both ACL and website configuration', () => {
      const bucket: BucketDomain = {
        key: 'test_bucket',
        name: 'test-bucket',
        security: {
          acl: BucketAccessEnum.PUBLIC_READ,
          force_delete: false,
        },
        website: {
          index: 'index.html',
          code: 'dist',
          error_page: '404.html',
          error_code: 404,
        },
      };

      const result = bucketToCosBucketConfig(bucket, 'ap-guangzhou');

      expect(result).toEqual({
        Bucket: 'test-bucket',
        Region: 'ap-guangzhou',
        ACL: 'public-read',
        WebsiteConfiguration: {
          IndexDocument: {
            Suffix: 'index.html',
          },
          ErrorDocument: {
            Key: '404.html',
          },
        },
      });
    });
  });

  describe('computeBucketConfigHash', () => {
    it('should compute consistent hash for same config', () => {
      const config = {
        Bucket: 'test-bucket',
        Region: 'ap-guangzhou',
        ACL: 'public-read' as const,
      };

      const hash1 = computeBucketConfigHash(config);
      const hash2 = computeBucketConfigHash(config);

      expect(hash1).toBe(hash2);
      expect(hash1).toHaveLength(16);
    });

    it('should compute different hash for different configs', () => {
      const config1 = {
        Bucket: 'test-bucket-1',
        Region: 'ap-guangzhou',
      };

      const config2 = {
        Bucket: 'test-bucket-2',
        Region: 'ap-guangzhou',
      };

      const hash1 = computeBucketConfigHash(config1);
      const hash2 = computeBucketConfigHash(config2);

      expect(hash1).not.toBe(hash2);
    });

    it('should include website configuration in hash', () => {
      const config1 = {
        Bucket: 'test-bucket',
        Region: 'ap-guangzhou',
      };

      const config2 = {
        Bucket: 'test-bucket',
        Region: 'ap-guangzhou',
        WebsiteConfiguration: {
          IndexDocument: { Suffix: 'index.html' },
          ErrorDocument: { Key: '404.html' },
        },
      };

      const hash1 = computeBucketConfigHash(config1);
      const hash2 = computeBucketConfigHash(config2);

      expect(hash1).not.toBe(hash2);
    });
  });
});
