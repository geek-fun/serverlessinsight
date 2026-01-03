import {
  bucketToCosBucketConfig,
  extractCosBucketDefinition,
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

  describe('extractCosBucketDefinition', () => {
    it('should extract all attributes with empty object for undefined non-primitive fields', () => {
      const config = {
        Bucket: 'test-bucket',
        Region: 'ap-guangzhou',
      };

      const definition = extractCosBucketDefinition(config);

      expect(definition).toEqual({
        bucket: 'test-bucket',
        region: 'ap-guangzhou',
        acl: null,
        websiteConfiguration: {},
      });
    });

    it('should extract ACL when defined', () => {
      const config = {
        Bucket: 'test-bucket',
        Region: 'ap-guangzhou',
        ACL: 'public-read' as const,
      };

      const definition = extractCosBucketDefinition(config);

      expect(definition.acl).toBe('public-read');
    });

    it('should extract website configuration', () => {
      const config = {
        Bucket: 'test-bucket',
        Region: 'ap-guangzhou',
        WebsiteConfiguration: {
          IndexDocument: { Suffix: 'index.html' },
          ErrorDocument: { Key: '404.html' },
        },
      };

      const definition = extractCosBucketDefinition(config);

      expect(definition.websiteConfiguration).toEqual({
        indexDocument: 'index.html',
        errorDocument: '404.html',
      });
    });

    it('should set errorDocument to null when not provided', () => {
      const config = {
        Bucket: 'test-bucket',
        Region: 'ap-guangzhou',
        WebsiteConfiguration: {
          IndexDocument: { Suffix: 'index.html' },
        },
      };

      const definition = extractCosBucketDefinition(config);

      expect(definition.websiteConfiguration).toEqual({
        indexDocument: 'index.html',
        errorDocument: null,
      });
    });
  });
});
