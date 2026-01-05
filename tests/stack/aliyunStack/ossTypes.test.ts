import {
  bucketToOssBucketConfig,
  extractOssBucketDefinition,
} from '../../../src/stack/aliyunStack/ossTypes';
import { BucketDomain, BucketAccessEnum } from '../../../src/types';

describe('OssTypes', () => {
  describe('bucketToOssBucketConfig', () => {
    it('should convert bucket domain to OSS bucket config with minimal fields', () => {
      const bucket: BucketDomain = {
        key: 'test_bucket',
        name: 'test-bucket',
      };

      const result = bucketToOssBucketConfig(bucket);

      expect(result).toEqual({
        BucketName: 'test-bucket',
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

      const result = bucketToOssBucketConfig(bucket);

      expect(result).toEqual({
        BucketName: 'test-bucket',
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

        const result = bucketToOssBucketConfig(bucket);

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

      const result = bucketToOssBucketConfig(bucket);

      expect(result).toEqual({
        BucketName: 'test-bucket',
        WebsiteConfiguration: {
          IndexDocument: 'index.html',
          ErrorDocument: '404.html',
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

      const result = bucketToOssBucketConfig(bucket);

      expect(result).toEqual({
        BucketName: 'test-bucket',
        ACL: 'public-read',
        WebsiteConfiguration: {
          IndexDocument: 'index.html',
          ErrorDocument: '404.html',
        },
      });
    });

    it('should include storage class when defined', () => {
      const bucket: BucketDomain = {
        key: 'test_bucket',
        name: 'test-bucket',
        storage: {
          class: 'Standard',
        },
      };

      const result = bucketToOssBucketConfig(bucket);

      expect(result).toEqual({
        BucketName: 'test-bucket',
        StorageClass: 'Standard',
      });
    });

    it('should include domain when defined in website', () => {
      const bucket: BucketDomain = {
        key: 'test_bucket',
        name: 'test-bucket',
        website: {
          index: 'index.html',
          code: 'dist',
          error_page: '404.html',
          error_code: 404,
          domain: 'www.example.com',
        },
      };

      const result = bucketToOssBucketConfig(bucket);

      expect(result.Domain).toBe('www.example.com');
    });
  });

  describe('extractOssBucketDefinition', () => {
    it('should extract all attributes with empty object for undefined non-primitive fields', () => {
      const config = {
        BucketName: 'test-bucket',
      };

      const definition = extractOssBucketDefinition(config);

      expect(definition).toEqual({
        bucketName: 'test-bucket',
        acl: null,
        websiteConfiguration: {},
        storageClass: null,
        domain: null,
      });
    });

    it('should extract ACL when defined', () => {
      const config = {
        BucketName: 'test-bucket',
        ACL: 'public-read' as const,
      };

      const definition = extractOssBucketDefinition(config);

      expect(definition.acl).toBe('public-read');
    });

    it('should extract website configuration', () => {
      const config = {
        BucketName: 'test-bucket',
        WebsiteConfiguration: {
          IndexDocument: 'index.html',
          ErrorDocument: '404.html',
        },
      };

      const definition = extractOssBucketDefinition(config);

      expect(definition.websiteConfiguration).toEqual({
        indexDocument: 'index.html',
        errorDocument: '404.html',
      });
    });

    it('should set errorDocument to null when not provided', () => {
      const config = {
        BucketName: 'test-bucket',
        WebsiteConfiguration: {
          IndexDocument: 'index.html',
        },
      };

      const definition = extractOssBucketDefinition(config);

      expect(definition.websiteConfiguration).toEqual({
        indexDocument: 'index.html',
        errorDocument: null,
      });
    });

    it('should extract storage class when defined', () => {
      const config = {
        BucketName: 'test-bucket',
        StorageClass: 'Standard',
      };

      const definition = extractOssBucketDefinition(config);

      expect(definition.storageClass).toBe('Standard');
    });

    it('should extract domain when defined', () => {
      const config = {
        BucketName: 'test-bucket',
        Domain: 'www.example.com',
      };

      const definition = extractOssBucketDefinition(config);

      expect(definition.domain).toBe('www.example.com');
    });
  });
});
