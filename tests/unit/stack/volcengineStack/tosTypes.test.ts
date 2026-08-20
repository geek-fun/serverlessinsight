import {
  bucketToTosConfig,
  extractTosBucketDefinition,
  buildTosInstanceFromProvider,
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

  describe('buildTosInstanceFromProvider', () => {
    it('should retain the full provider detail set', () => {
      const instance = buildTosInstanceFromProvider(
        {
          name: 'test-bucket',
          location: 'cn-beijing',
          creationDate: '2024-01-01T00:00:00Z',
          storageClass: 'STANDARD',
          extranetEndpoint: 'tos-cn-beijing.volces.com',
          intranetEndpoint: 'tos-cn-beijing.ivolces.com',
          acl: 'private',
          websiteConfig: { indexDocument: 'index.html', errorDocument: '404.html' },
          Tags: [{ Key: 'si-owned-by', Value: 'v' }],
          owner: { id: '2000000001', displayName: 'test-owner' },
          projectName: 'default',
          type: 'normal',
          azRedundancy: 'single_az',
          extranetS3Endpoint: 'tos-s3-cn-beijing.volces.com',
          intranetS3Endpoint: 'tos-s3-cn-beijing.internal.volces.com',
          versioning: 'Enabled',
          crossRegionReplication: 'Enabled',
          transferAcceleration: 'Enabled',
          accessMonitor: 'Disabled',
          serverSideEncryptionConfiguration: {
            rule: [
              {
                applyServerSideEncryptionByDefault: {
                  sseAlgorithm: 'AES256',
                  kmsMasterKeyId: 'key-1',
                },
              },
            ],
          },
        },
        'sid-1',
      );

      expect(instance).toEqual({
        type: 'VOLCENGINE_TOS_BUCKET',
        sid: 'sid-1',
        id: 'test-bucket',
        bucketName: 'test-bucket',
        location: 'cn-beijing',
        creationDate: '2024-01-01T00:00:00Z',
        storageClass: 'STANDARD',
        extranetEndpoint: 'tos-cn-beijing.volces.com',
        intranetEndpoint: 'tos-cn-beijing.ivolces.com',
        acl: 'private',
        websiteConfig: { indexDocument: 'index.html', errorDocument: '404.html' },
        Tags: [{ Key: 'si-owned-by', Value: 'v' }],
        owner: { id: '2000000001', displayName: 'test-owner' },
        projectName: 'default',
        bucketType: 'normal',
        azRedundancy: 'single_az',
        extranetS3Endpoint: 'tos-s3-cn-beijing.volces.com',
        intranetS3Endpoint: 'tos-s3-cn-beijing.internal.volces.com',
        versioning: 'Enabled',
        crossRegionReplication: 'Enabled',
        transferAcceleration: 'Enabled',
        accessMonitor: 'Disabled',
        serverSideEncryptionConfiguration: {
          rule: [
            {
              applyServerSideEncryptionByDefault: {
                sseAlgorithm: 'AES256',
                kmsMasterKeyId: 'key-1',
              },
            },
          ],
        },
      });
    });

    it('should default absent optional fields to null', () => {
      const instance = buildTosInstanceFromProvider({ name: 'test-bucket' }, 'sid-1');

      expect(instance).toEqual({
        type: 'VOLCENGINE_TOS_BUCKET',
        sid: 'sid-1',
        id: 'test-bucket',
        bucketName: 'test-bucket',
        location: null,
        creationDate: null,
        storageClass: null,
        extranetEndpoint: null,
        intranetEndpoint: null,
        acl: null,
        websiteConfig: null,
        Tags: null,
        owner: null,
        projectName: null,
        bucketType: null,
        azRedundancy: null,
        extranetS3Endpoint: null,
        intranetS3Endpoint: null,
        versioning: null,
        crossRegionReplication: null,
        transferAcceleration: null,
        accessMonitor: null,
        serverSideEncryptionConfiguration: null,
      });
    });
  });
});
