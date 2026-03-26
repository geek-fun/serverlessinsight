import { parseBucket } from '../../../src/parser/bucketParser';
import { BucketAccessEnum, BucketRaw } from '../../../src/types';

jest.mock('../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

jest.mock('../../../src/lang', () => ({
  lang: { __: (key: string) => key },
}));

describe('bucketParser', () => {
  describe('parseBucket', () => {
    it('should return undefined when buckets is falsy', () => {
      // @ts-expect-error - Testing null input
      expect(parseBucket(null)).toBeUndefined();
      // @ts-expect-error - Testing undefined input
      expect(parseBucket(undefined)).toBeUndefined();
      expect(parseBucket({})).toEqual([]);
    });

    it('should parse minimal bucket configuration', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
        },
      };

      const result = parseBucket(buckets);

      expect(result).toHaveLength(1);
      expect(result?.[0]).toEqual({
        key: 'my_bucket',
        name: 'test-bucket',
        storage: undefined,
        versioning: undefined,
        security: undefined,
        website: undefined,
      });
    });

    it('should parse bucket with storage configuration', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          storage: {
            class: 'Standard',
          },
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].storage).toEqual({
        class: 'Standard',
      });
    });

    it('should parse bucket without storage configuration', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].storage).toBeUndefined();
    });

    it('should parse bucket with versioning configuration', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          versioning: {
            status: 'Enabled',
          },
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].versioning).toEqual({
        status: 'Enabled',
      });
    });

    it('should parse bucket without versioning configuration', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].versioning).toBeUndefined();
    });

    it('should parse bucket with minimal security configuration', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          security: {},
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].security).toEqual({
        acl: BucketAccessEnum.PRIVATE,
        force_delete: false,
        sse_algorithm: undefined,
        sse_kms_master_key_id: undefined,
      });
    });

    it('should parse bucket with full security configuration including acl', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          security: {
            acl: 'PUBLIC_READ',
            force_delete: true,
            sse_algorithm: 'AES256',
            sse_kms_master_key_id: 'key-123',
          },
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].security).toEqual({
        acl: BucketAccessEnum.PUBLIC_READ,
        force_delete: true,
        sse_algorithm: 'AES256',
        sse_kms_master_key_id: 'key-123',
      });
    });

    it('should parse bucket without acl in security', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          security: {
            force_delete: true,
          },
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].security?.acl).toBe(BucketAccessEnum.PRIVATE);
    });

    it('should parse bucket with sse_algorithm but without sse_kms_master_key_id', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          security: {
            sse_algorithm: 'AES256',
          },
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].security?.sse_algorithm).toBe('AES256');
      expect(result?.[0].security?.sse_kms_master_key_id).toBeUndefined();
    });

    it('should parse bucket without security configuration', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].security).toBeUndefined();
    });

    it('should parse bucket with website configuration and null domain', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          website: {
            code: './dist',
            domain: undefined,
          },
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].website).toEqual({
        code: './dist',
        domain: undefined,
        www_bind_apex: false,
        domain_certificate_id: undefined,
        domain_certificate_body: undefined,
        domain_certificate_private_key: undefined,
        domain_protocol: undefined,
        index: 'index.html',
        error_page: '404.html',
        error_code: 404,
      });
    });

    it('should parse bucket with website configuration and undefined domain', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          website: {
            code: './dist',
          },
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].website?.domain).toBeUndefined();
      expect(result?.[0].website?.www_bind_apex).toBe(false);
    });

    it('should parse bucket with website configuration and simple string domain', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          website: {
            code: './dist',
            domain: 'example.com',
          },
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].website).toEqual({
        code: './dist',
        domain: 'example.com',
        www_bind_apex: false,
        domain_certificate_id: undefined,
        domain_certificate_body: undefined,
        domain_certificate_private_key: undefined,
        domain_protocol: undefined,
        index: 'index.html',
        error_page: '404.html',
        error_code: 404,
      });
    });

    it('should parse bucket with website configuration and structured domain with minimal fields', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          website: {
            code: './dist',
            domain: {
              domain_name: 'example.com',
            },
          },
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].website).toEqual({
        code: './dist',
        domain: 'example.com',
        www_bind_apex: false,
        domain_certificate_id: undefined,
        domain_certificate_body: undefined,
        domain_certificate_private_key: undefined,
        domain_protocol: undefined,
        index: 'index.html',
        error_page: '404.html',
        error_code: 404,
      });
    });

    it('should parse bucket with website configuration and structured domain with certificate_id', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          website: {
            code: './dist',
            domain: {
              domain_name: 'example.com',
              www_bind_apex: true,
              certificate_id: 'cert-123',
            },
          },
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].website?.domain).toBe('example.com');
      expect(result?.[0].website?.www_bind_apex).toBe(true);
      expect(result?.[0].website?.domain_certificate_id).toBe('cert-123');
      expect(result?.[0].website?.domain_certificate_body).toBeUndefined();
      expect(result?.[0].website?.domain_certificate_private_key).toBeUndefined();
    });

    it('should parse bucket with website configuration and structured domain with certificate_body', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          website: {
            code: './dist',
            domain: {
              domain_name: 'example.com',
              certificate_body: '-----BEGIN CERTIFICATE-----',
            },
          },
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].website?.domain_certificate_body).toBe('-----BEGIN CERTIFICATE-----');
      expect(result?.[0].website?.domain_certificate_id).toBeUndefined();
    });

    it('should parse bucket with website configuration and structured domain with certificate_private_key', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          website: {
            code: './dist',
            domain: {
              domain_name: 'example.com',
              certificate_private_key: '-----BEGIN PRIVATE KEY-----',
            },
          },
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].website?.domain_certificate_private_key).toBe(
        '-----BEGIN PRIVATE KEY-----',
      );
      expect(result?.[0].website?.domain_certificate_id).toBeUndefined();
    });

    it('should parse bucket with website configuration and structured domain with protocol as string', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          website: {
            code: './dist',
            domain: {
              domain_name: 'example.com',
              protocol: 'https',
            },
          },
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].website?.domain_protocol).toBe('https');
    });

    it('should parse bucket with website configuration and structured domain with protocol as array', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          website: {
            code: './dist',
            domain: {
              domain_name: 'example.com',
              protocol: ['http', 'https'],
            },
          },
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].website?.domain_protocol).toEqual(['http', 'https']);
    });

    it('should parse bucket with website configuration and structured domain with null protocol', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          website: {
            code: './dist',
            domain: {
              domain_name: 'example.com',
              protocol: undefined,
            },
          },
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].website?.domain_protocol).toBeUndefined();
    });

    it('should parse bucket with website configuration and custom index/error pages', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          website: {
            code: './dist',
            index: 'home.html',
            error_page: 'error.html',
            error_code: 500,
          },
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].website?.index).toBe('home.html');
      expect(result?.[0].website?.error_page).toBe('error.html');
      expect(result?.[0].website?.error_code).toBe(500);
    });

    it('should parse bucket without website configuration', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].website).toBeUndefined();
    });

    it('should parse multiple buckets with different configurations', () => {
      const buckets: { [key: string]: BucketRaw } = {
        bucket1: {
          name: 'bucket-one',
          storage: { class: 'Standard' },
        },
        bucket2: {
          name: 'bucket-two',
          versioning: { status: 'Enabled' },
        },
        bucket3: {
          name: 'bucket-three',
          security: { acl: 'PUBLIC_READ' },
        },
      };

      const result = parseBucket(buckets);

      expect(result).toHaveLength(3);
      expect(result?.[0].key).toBe('bucket1');
      expect(result?.[1].key).toBe('bucket2');
      expect(result?.[2].key).toBe('bucket3');
    });

    it('should parse bucket with full configuration including all optional fields', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          storage: { class: 'Standard' },
          versioning: { status: 'Enabled' },
          security: {
            acl: 'PUBLIC_READ',
            force_delete: true,
            sse_algorithm: 'AES256',
            sse_kms_master_key_id: 'key-123',
          },
          website: {
            code: './dist',
            domain: {
              domain_name: 'example.com',
              www_bind_apex: true,
              certificate_id: 'cert-123',
              certificate_body: '-----BEGIN CERTIFICATE-----',
              certificate_private_key: '-----BEGIN PRIVATE KEY-----',
              protocol: ['http', 'https'],
            },
            index: 'index.html',
            error_page: '404.html',
            error_code: 404,
          },
        },
      };

      const result = parseBucket(buckets);

      expect(result).toHaveLength(1);
      expect(result?.[0]).toMatchObject({
        key: 'my_bucket',
        name: 'test-bucket',
        storage: { class: 'Standard' },
        versioning: { status: 'Enabled' },
        security: {
          acl: BucketAccessEnum.PUBLIC_READ,
          force_delete: true,
          sse_algorithm: 'AES256',
          sse_kms_master_key_id: 'key-123',
        },
        website: {
          code: './dist',
          domain: 'example.com',
          www_bind_apex: true,
          domain_certificate_id: 'cert-123',
          domain_certificate_body: '-----BEGIN CERTIFICATE-----',
          domain_certificate_private_key: '-----BEGIN PRIVATE KEY-----',
          domain_protocol: ['http', 'https'],
          index: 'index.html',
          error_page: '404.html',
          error_code: 404,
        },
      });
    });
  });
});
