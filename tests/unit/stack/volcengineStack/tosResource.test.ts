import {
  createResource,
  readResource,
  updateResource,
  deleteResource,
} from '../../../../src/stack/volcengineStack/tosResource';
import { createVolcengineClient } from '../../../../src/common/volcengineClient';
import { setResource, removeResource } from '../../../../src/common';
import type { BucketDomain, Context, StateFile } from '../../../../src/types';
import { BucketAccessEnum } from '../../../../src/types';

jest.mock('../../../../src/common/volcengineClient', () => ({
  ...jest.requireActual('../../../../src/common/volcengineClient/tosOperations'),
  createVolcengineClient: jest.fn(),
}));

const mockGetResource = jest.fn();

jest.mock('../../../../src/common', () => ({
  setResource: jest.fn((state, logicalId, resourceState) => ({
    ...state,
    resources: { ...state.resources, [logicalId]: resourceState },
  })),
  removeResource: jest.fn((state, logicalId) => ({
    ...state,
    resources: Object.fromEntries(
      Object.entries(state.resources).filter(([key]) => key !== logicalId),
    ),
  })),
  buildSid: jest.fn((provider, service, stage, name) => `${provider}-${service}-${stage}-${name}`),
  computeDirectoryHash: jest.fn(() => 'test-hash-123'),
  getResource: (...args: unknown[]) => mockGetResource(...args),
  ProviderEnum: {
    HUAWEI: 'huawei',
    ALIYUN: 'aliyun',
    TENCENT: 'tencent',
    AWS: 'aws',
    VOLCENGINE: 'volcengine',
  },
}));

jest.mock('../../../../src/common/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

jest.mock('../../../../src/lang', () => ({
  lang: {
    __: (key: string) => key,
  },
}));

describe('tosResource', () => {
  const mockContext: Context = {
    app: 'test-app',
    service: 'test-service',
    stage: 'dev',
    region: 'cn-beijing',
    provider: 'volcengine' as unknown as Context['provider'],
    accessKeyId: 'test-ak',
    accessKeySecret: 'test-sk',
    iacLocation: '/test/path',
  };

  const mockState: StateFile = {
    version: '1.0',
    provider: 'volcengine',
    app: 'test-app',
    service: 'test-service',
    stages: {},
    resources: {},
  };

  const mockTosClient = {
    tos: {
      createBucket: jest.fn(),
      getBucket: jest.fn(),
      deleteBucket: jest.fn(),
      updateBucketAcl: jest.fn(),
      updateBucketWebsite: jest.fn(),
      uploadFiles: jest.fn(),
      putBucketPolicy: jest.fn(),
      getBucketPolicy: jest.fn(),
      deleteBucketPolicy: jest.fn(),
      putBucketCustomDomain: jest.fn(),
      getBucketCustomDomains: jest.fn(),
      deleteBucketCustomDomain: jest.fn(),
      putBucketTransferAcceleration: jest.fn(),
      getBucketTransferAcceleration: jest.fn(),
    },
    cdn: {
      addCdnDomain: jest.fn(),
      describeCdnDomain: jest.fn(),
      deleteCdnDomain: jest.fn(),
      updateCdnDelivery: jest.fn(),
      applyCacheConfig: jest.fn(),
      applyCompression: jest.fn(),
      applyHttpsRedirect: jest.fn(),
      applyCertificate: jest.fn(),
      addCertificate: jest.fn(),
    },
    dns: {
      addDomainRecord: jest.fn(),
      updateDomainRecord: jest.fn(),
      deleteDomainRecord: jest.fn(),
      describeDomainRecords: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetResource.mockReturnValue(undefined);
    (createVolcengineClient as jest.Mock).mockReturnValue(mockTosClient);
  });

  const ownershipTag = { Key: 'si-owned-by', Value: 'test-app-test-service:buckets.static_site' };
  const createOwnershipTag = {
    Key: 'si-owned-by',
    Value: 'test-app-test-service:buckets.static_site@cn-beijing',
  };
  const ownedBucketInfo = {
    name: 'test-bucket',
    location: 'cn-beijing',
    Tags: [ownershipTag],
  };

  describe('createResource', () => {
    it('should create bucket without website', async () => {
      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
      };

      mockTosClient.tos.createBucket.mockResolvedValueOnce({});
      mockTosClient.tos.getBucket.mockResolvedValueOnce(ownedBucketInfo);

      await createResource(mockContext, bucket, mockState);

      expect(mockTosClient.tos.createBucket).toHaveBeenCalledWith(
        expect.objectContaining({ bucketName: 'test-bucket' }),
      );
      expect(mockTosClient.tos.uploadFiles).not.toHaveBeenCalled();
      expect(setResource).toHaveBeenCalled();
    });

    it('should stamp the ownership tag on the createBucket config', async () => {
      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
      };

      mockTosClient.tos.createBucket.mockResolvedValueOnce({});
      mockTosClient.tos.getBucket.mockResolvedValueOnce(ownedBucketInfo);

      await createResource(mockContext, bucket, mockState);

      expect(mockTosClient.tos.createBucket).toHaveBeenCalledWith(
        expect.objectContaining({ Tags: [createOwnershipTag] }),
      );
    });

    it('should create bucket with website and upload files', async () => {
      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
        website: {
          index: 'index.html',
          code: './dist',
        },
      };

      mockTosClient.tos.createBucket.mockResolvedValueOnce({});
      mockTosClient.tos.getBucket.mockResolvedValueOnce(ownedBucketInfo); // ownership probe
      mockTosClient.tos.uploadFiles.mockResolvedValueOnce(undefined);
      mockTosClient.tos.getBucket.mockResolvedValueOnce({
        name: 'test-bucket',
        websiteConfig: { indexDocument: 'index.html' },
      });

      await createResource(mockContext, bucket, mockState);

      expect(mockTosClient.tos.uploadFiles).toHaveBeenCalledWith('test-bucket', expect.any(String));
      expect(setResource).toHaveBeenCalled();
    });

    it('should apply IAM bucket policy when iam is configured', async () => {
      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
        iam: {
          resource: {
            statements: [
              {
                effect: 'Allow',
                principal: { trn: 'trn:iam:::role/my-role' },
                action: ['tos:PutObject'],
                resource: ['trn:tos:::test-bucket/*'],
              },
            ],
          },
        },
      };

      mockTosClient.tos.createBucket.mockResolvedValueOnce({});
      mockTosClient.tos.getBucket.mockResolvedValueOnce(ownedBucketInfo);

      await createResource(mockContext, bucket, mockState);

      expect(mockTosClient.tos.putBucketPolicy).toHaveBeenCalledWith('test-bucket', {
        Statement: [
          {
            Effect: 'Allow',
            Principal: { trn: 'trn:iam:::role/my-role' },
            Action: ['tos:PutObject'],
            Resource: ['trn:tos:::test-bucket/*'],
          },
        ],
      });
    });

    it('should apply IAM bucket policy with condition', async () => {
      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
        iam: {
          resource: {
            statements: [
              {
                effect: 'Allow',
                principal: { trn: 'trn:iam:::role/my-role' },
                action: ['tos:GetObject'],
                resource: ['trn:tos:::test-bucket/*'],
                condition: { ip_address: { 'trn:SourceIp': '10.0.0.0/8' } },
              },
            ],
          },
        },
      };

      mockTosClient.tos.createBucket.mockResolvedValueOnce({});
      mockTosClient.tos.getBucket.mockResolvedValueOnce(ownedBucketInfo);

      await createResource(mockContext, bucket, mockState);

      expect(mockTosClient.tos.putBucketPolicy).toHaveBeenCalledWith('test-bucket', {
        Statement: [
          {
            Effect: 'Allow',
            Principal: { trn: 'trn:iam:::role/my-role' },
            Action: ['tos:GetObject'],
            Resource: ['trn:tos:::test-bucket/*'],
            Condition: { ip_address: { 'trn:SourceIp': '10.0.0.0/8' } },
          },
        ],
      });
    });

    it('should delete policy when iam has empty statements', async () => {
      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
        iam: {
          resource: {
            statements: [],
          },
        },
      };

      mockTosClient.tos.createBucket.mockResolvedValueOnce({});
      mockTosClient.tos.getBucket.mockResolvedValueOnce(ownedBucketInfo);
      mockTosClient.tos.deleteBucketPolicy.mockResolvedValueOnce(undefined);

      await createResource(mockContext, bucket, mockState);

      expect(mockTosClient.tos.deleteBucketPolicy).toHaveBeenCalledWith('test-bucket');
    });

    it('should throw PartialResourceError with tainted state when upload fails', async () => {
      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
        website: {
          index: 'index.html',
          code: './dist',
        },
      };

      mockTosClient.tos.createBucket.mockResolvedValueOnce({});
      mockTosClient.tos.getBucket.mockResolvedValueOnce(ownedBucketInfo); // ownership probe
      mockTosClient.tos.uploadFiles.mockRejectedValueOnce(new Error('Upload failed'));

      await expect(createResource(mockContext, bucket, mockState)).rejects.toMatchObject({
        name: 'PartialResourceError',
        updatedState: {
          resources: {
            'buckets.static_site': {
              status: 'tainted',
            },
          },
        },
        cause: { message: 'Upload failed' },
      });
    });

    it('should skip createBucket and retry upload when tainted and bucket exists in provider', async () => {
      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
        website: {
          index: 'index.html',
          code: './dist',
        },
      };

      mockGetResource.mockReturnValueOnce({
        mode: 'managed',
        region: 'cn-beijing',
        definition: {},
        instances: [],
        lastUpdated: new Date().toISOString(),
        status: 'tainted',
      });
      mockTosClient.tos.getBucket.mockResolvedValue({
        name: 'test-bucket',
        location: 'cn-beijing',
      });
      mockTosClient.tos.uploadFiles.mockResolvedValueOnce(undefined);

      await createResource(mockContext, bucket, mockState);

      expect(mockTosClient.tos.createBucket).not.toHaveBeenCalled();
      expect(mockTosClient.tos.uploadFiles).toHaveBeenCalledWith('test-bucket', expect.any(String));
    });

    it('should create bucket when tainted but bucket absent in provider', async () => {
      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
      };

      mockGetResource.mockReturnValueOnce({
        mode: 'managed',
        region: 'cn-beijing',
        definition: {},
        instances: [],
        lastUpdated: new Date().toISOString(),
        status: 'tainted',
      });
      mockTosClient.tos.getBucket.mockResolvedValueOnce(null); // pre-flight: no existing bucket
      mockTosClient.tos.createBucket.mockResolvedValueOnce({});
      mockTosClient.tos.getBucket.mockResolvedValueOnce(ownedBucketInfo); // ownership probe

      await createResource(mockContext, bucket, mockState);

      expect(mockTosClient.tos.getBucket).toHaveBeenCalled(); // pre-flight probe
      expect(mockTosClient.tos.createBucket).toHaveBeenCalledWith(
        expect.objectContaining({ bucketName: 'test-bucket' }),
      );
    });

    it('should throw PartialResourceError with tainted state when createBucket fails', async () => {
      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
      };

      mockTosClient.tos.createBucket.mockRejectedValueOnce(new Error('Create failed'));

      await expect(createResource(mockContext, bucket, mockState)).rejects.toMatchObject({
        name: 'PartialResourceError',
        updatedState: {
          resources: {
            'buckets.static_site': {
              status: 'tainted',
            },
          },
        },
        cause: { message: 'Create failed' },
      });
    });

    it('should throw PartialResourceError with tainted state when applyBucketPolicy fails', async () => {
      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
        iam: {
          resource: {
            statements: [
              {
                effect: 'Allow',
                principal: { trn: 'trn:iam:::role/my-role' },
                action: ['tos:PutObject'],
                resource: ['trn:tos:::test-bucket/*'],
              },
            ],
          },
        },
      };

      mockTosClient.tos.createBucket.mockResolvedValueOnce({});
      mockTosClient.tos.getBucket.mockResolvedValueOnce(ownedBucketInfo); // ownership probe
      mockTosClient.tos.putBucketPolicy.mockRejectedValueOnce(new Error('Policy create failed'));

      await expect(createResource(mockContext, bucket, mockState)).rejects.toMatchObject({
        name: 'PartialResourceError',
        cause: { message: 'Policy create failed' },
      });
    });

    it('should write ready state on successful create', async () => {
      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
      };

      mockTosClient.tos.createBucket.mockResolvedValueOnce({});
      mockTosClient.tos.getBucket.mockResolvedValueOnce(ownedBucketInfo);

      await createResource(mockContext, bucket, mockState);

      expect(setResource).toHaveBeenCalledWith(
        expect.anything(),
        'buckets.static_site',
        expect.objectContaining({ status: 'ready' }),
      );
    });

    it('should retain the full provider detail set on the bucket instance', async () => {
      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
      };

      const fullBucketInfo = {
        name: 'test-bucket',
        location: 'cn-beijing',
        creationDate: '2024-01-01T00:00:00Z',
        storageClass: 'STANDARD',
        extranetEndpoint: 'tos-cn-beijing.volces.com',
        intranetEndpoint: 'tos-cn-beijing.ivolces.com',
        acl: 'private',
        websiteConfig: { indexDocument: 'index.html' },
        Tags: [ownershipTag],
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
      };

      mockTosClient.tos.createBucket.mockResolvedValueOnce({});
      mockTosClient.tos.getBucket.mockResolvedValueOnce(fullBucketInfo);

      await createResource(mockContext, bucket, mockState);

      expect(setResource).toHaveBeenCalledWith(
        expect.anything(),
        'buckets.static_site',
        expect.objectContaining({
          status: 'ready',
          instances: [
            expect.objectContaining({
              type: 'VOLCENGINE_TOS_BUCKET',
              bucketName: 'test-bucket',
              location: 'cn-beijing',
              creationDate: '2024-01-01T00:00:00Z',
              storageClass: 'STANDARD',
              extranetEndpoint: 'tos-cn-beijing.volces.com',
              intranetEndpoint: 'tos-cn-beijing.ivolces.com',
              acl: 'private',
              websiteConfig: { indexDocument: 'index.html', errorDocument: null },
              Tags: [ownershipTag],
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
            }),
          ],
        }),
      );
    });

    it('should adopt idempotently when createBucket collides and existing bucket carries our ownership tag', async () => {
      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
      };

      const collisionError = Object.assign(new Error('Bucket already exists'), {
        code: 'BucketAlreadyExists',
      });
      mockTosClient.tos.createBucket.mockRejectedValueOnce(collisionError);
      mockTosClient.tos.getBucket.mockResolvedValueOnce(ownedBucketInfo);

      await createResource(mockContext, bucket, mockState);

      expect(mockTosClient.tos.createBucket).toHaveBeenCalledWith(
        expect.objectContaining({ Tags: [createOwnershipTag] }),
      );
      expect(setResource).toHaveBeenCalledWith(
        expect.anything(),
        'buckets.static_site',
        expect.objectContaining({ status: 'ready' }),
      );
    });

    it('should refuse adoption when createBucket collides but existing bucket lacks our ownership tag', async () => {
      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
      };

      const collisionError = Object.assign(new Error('Bucket already exists'), {
        code: 'BucketAlreadyExists',
      });
      mockTosClient.tos.createBucket.mockRejectedValueOnce(collisionError);
      mockTosClient.tos.getBucket.mockResolvedValueOnce({
        name: 'test-bucket',
        location: 'cn-beijing',
        Tags: [{ Key: 'other-project-tag', Value: 'someone-else' }],
      });

      await expect(createResource(mockContext, bucket, mockState)).rejects.toMatchObject({
        name: 'PartialResourceError',
        cause: { message: expect.stringContaining('RESOURCE_EXISTS_NOT_OWNED_ADOPT') },
      });
    });

    it('should refuse adoption when createBucket succeeds idempotently but bucket lacks our ownership tag', async () => {
      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
      };

      mockTosClient.tos.createBucket.mockResolvedValueOnce({});
      mockTosClient.tos.getBucket.mockResolvedValueOnce({
        name: 'test-bucket',
        location: 'cn-beijing',
        Tags: [],
      });

      await expect(createResource(mockContext, bucket, mockState)).rejects.toMatchObject({
        name: 'PartialResourceError',
        cause: { message: expect.stringContaining('RESOURCE_EXISTS_NOT_OWNED_ADOPT') },
      });
    });
  });

  describe('bucket domain bindings (issue #294)', () => {
    const ownedGetBucket = () => {
      mockTosClient.tos.createBucket.mockResolvedValueOnce({});
      mockTosClient.tos.getBucket.mockResolvedValueOnce(ownedBucketInfo);
    };

    it('creates a direct binding: TOS custom domain + TrafficRoute CNAME', async () => {
      ownedGetBucket();
      mockTosClient.dns.addDomainRecord.mockResolvedValueOnce('rec-123');
      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
        domains: [{ domain_name: 'cdn.example.com' }],
      };

      await createResource(mockContext, bucket, mockState);

      expect(mockTosClient.tos.putBucketCustomDomain).toHaveBeenCalledWith(
        'test-bucket',
        'cdn.example.com',
        undefined,
      );
      expect(mockTosClient.dns.addDomainRecord).toHaveBeenCalledWith(
        expect.objectContaining({
          domainName: 'example.com',
          host: 'cdn',
          type: 'CNAME',
          value: 'test-bucket.tos-cn-beijing.volces.com',
          ttl: 600,
        }),
      );
    });

    it('creates a CDN binding: AddCdnDomain with TOS origin and deploys the certificate', async () => {
      ownedGetBucket();
      mockTosClient.cdn.describeCdnDomain
        // adopt probe after a successful add
        .mockResolvedValueOnce({
          domain: 'cdn.example.com',
          cname: 'cdn.example.com.boscdn.com',
          origin: ['test-bucket'],
        });
      mockTosClient.cdn.addCertificate.mockResolvedValueOnce({
        certificateId: 'cert-volc-1',
      });
      mockTosClient.dns.addDomainRecord.mockResolvedValueOnce('rec-cdn-1');
      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
        domains: [
          {
            domain_name: 'cdn.example.com',
            certificate_body: 'CERT-BODY',
            certificate_private_key: 'CERT-KEY',
            cdn: {
              enabled: true,
              cdn_type: 'download',
              scope: 'chinese_mainland',
              cache_ttl: 3600,
              ignore_query_string: true,
              force_redirect_https: true,
            },
          },
        ],
      };

      await createResource(mockContext, bucket, mockState);

      expect(mockTosClient.cdn.addCdnDomain).toHaveBeenCalledWith(
        expect.objectContaining({
          domain: 'cdn.example.com',
          serviceType: 'download',
          serviceRegion: 'chinese_mainland',
          origin: {
            originLines: [
              {
                originType: 'primary',
                instanceType: 'TOS',
                bucketName: 'test-bucket',
                region: 'cn-beijing',
                address: 'test-bucket.tos-cn-beijing.volces.com',
                originHost: 'test-bucket.tos-cn-beijing.volces.com',
              },
            ],
          },
        }),
      );
      expect(mockTosClient.cdn.applyCacheConfig).toHaveBeenCalledWith(
        'cdn.example.com',
        3600,
        true,
      );
      expect(mockTosClient.cdn.applyHttpsRedirect).toHaveBeenCalledWith('cdn.example.com', true);
      expect(mockTosClient.cdn.addCertificate).toHaveBeenCalledWith(
        expect.objectContaining({ certificate: 'CERT-BODY', privateKey: 'CERT-KEY' }),
      );
      expect(mockTosClient.cdn.applyCertificate).toHaveBeenCalledWith(
        'cdn.example.com',
        'cert-volc-1',
      );
      // CDN mode does NOT bind the custom domain to the bucket.
      expect(mockTosClient.tos.putBucketCustomDomain).not.toHaveBeenCalled();
      expect(mockTosClient.dns.addDomainRecord).toHaveBeenCalledWith(
        expect.objectContaining({ value: 'cdn.example.com.boscdn.com' }),
      );
    });

    it('adopts an existing CDN domain on retry when its origin points at this bucket', async () => {
      ownedGetBucket();
      mockTosClient.cdn.addCdnDomain.mockRejectedValueOnce({ code: 'InternalError' });
      mockTosClient.cdn.describeCdnDomain
        .mockResolvedValueOnce({
          domain: 'cdn.example.com',
          cname: 'cdn.example.com.boscdn.com',
          origin: ['test-bucket.tos-cn-beijing.volces.com'],
        })
        .mockResolvedValueOnce({
          domain: 'cdn.example.com',
          cname: 'cdn.example.com.boscdn.com',
          origin: ['test-bucket.tos-cn-beijing.volces.com'],
        });
      mockTosClient.dns.addDomainRecord.mockResolvedValueOnce('rec-cdn-1');
      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
        domains: [{ domain_name: 'cdn.example.com', cdn: true }],
      };

      await createResource(mockContext, bucket, mockState);

      expect(mockTosClient.dns.addDomainRecord).toHaveBeenCalled();
    });

    it('refuses to adopt an existing CDN domain whose origin points elsewhere', async () => {
      ownedGetBucket();
      mockTosClient.cdn.addCdnDomain.mockRejectedValueOnce({ code: 'InternalError' });
      mockTosClient.cdn.describeCdnDomain.mockResolvedValueOnce({
        domain: 'cdn.example.com',
        cname: 'cdn.example.com.boscdn.com',
        origin: ['other-bucket'],
      });
      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
        domains: [{ domain_name: 'cdn.example.com', cdn: true }],
      };

      await expect(createResource(mockContext, bucket, mockState)).rejects.toThrow(
        'CDN_DOMAIN_EXISTS_NOT_OWNED',
      );
    });

    it('fails loudly when the ownership probe cannot find the bucket', async () => {
      mockTosClient.tos.createBucket.mockResolvedValueOnce({});
      mockTosClient.tos.getBucket.mockResolvedValueOnce(null);
      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
      };

      await expect(createResource(mockContext, bucket, mockState)).rejects.toThrow(
        'REFRESH_STATE_BUCKET',
      );
    });

    it('applies option-level diffs in place when the delivery shape is unchanged', async () => {
      const storedState: StateFile = {
        ...mockState,
        resources: {
          'buckets.static_site': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              bucketName: 'test-bucket',
              acl: null,
              storageClass: null,
              websiteConfiguration: null,
              websiteCodeHash: null,
              domains: [
                {
                  domain_name: 'cdn.example.com',
                  cdn: {
                    enabled: true,
                    cdn_type: 'web',
                    scope: 'global',
                    cache_ttl: 3600,
                    origin_protocol: 'https',
                  },
                },
              ],
              accelerate: false,
            },
            instances: [
              {
                sid: 'volcengine-tos-dev-test-bucket',
                id: 'test-bucket',
                type: 'VOLCENGINE_TOS_BUCKET',
              },
              {
                sid: 'volcengine-cdn-dev-cdn.example.com',
                id: 'cdn.example.com',
                type: 'VOLCENGINE_CDN_DOMAIN',
                domainName: 'cdn.example.com',
                cname: 'cdn.example.com.boscdn.com',
              },
              {
                sid: 'volcengine-cdn-dns-dev-rec-cdn-1',
                id: 'rec-cdn-1',
                type: 'VOLCENGINE_CDN_DNS_CNAME',
                domain: 'cdn.example.com',
                cname: 'cdn.example.com.boscdn.com',
                dnsRecordId: 'rec-cdn-1',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };
      mockGetResource.mockReturnValue(storedState.resources['buckets.static_site']);
      mockTosClient.tos.getBucket.mockResolvedValueOnce(ownedBucketInfo);

      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
        domains: [
          {
            domain_name: 'cdn.example.com',
            cdn: {
              enabled: true,
              cdn_type: 'web',
              scope: 'global',
              cache_ttl: 7200,
              compression: true,
              origin_protocol: 'http',
            },
          },
        ],
      };

      await updateResource(mockContext, bucket, storedState);

      // delivery shape unchanged → no AddCdnDomain/DeleteCdnConfig churn, only
      // the option modules that actually differ.
      expect(mockTosClient.cdn.addCdnDomain).not.toHaveBeenCalled();
      expect(mockTosClient.cdn.updateCdnDelivery).toHaveBeenCalledWith('cdn.example.com', {
        originProtocol: 'http',
      });
      expect(mockTosClient.cdn.applyCacheConfig).toHaveBeenCalledWith(
        'cdn.example.com',
        7200,
        undefined,
      );
      expect(mockTosClient.cdn.applyCompression).toHaveBeenCalledWith('cdn.example.com', true);
    });

    it('applies only the new option module when a single option is dropped', async () => {
      const storedState: StateFile = {
        ...mockState,
        resources: {
          'buckets.static_site': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              bucketName: 'test-bucket',
              acl: null,
              storageClass: null,
              websiteConfiguration: null,
              websiteCodeHash: null,
              domains: [
                {
                  domain_name: 'cdn.example.com',
                  cdn: {
                    enabled: true,
                    cdn_type: 'web',
                    scope: 'global',
                    force_redirect_https: true,
                  },
                },
              ],
              accelerate: false,
            },
            instances: [
              {
                sid: 'volcengine-tos-dev-test-bucket',
                id: 'test-bucket',
                type: 'VOLCENGINE_TOS_BUCKET',
              },
              {
                sid: 'volcengine-cdn-dev-cdn.example.com',
                id: 'cdn.example.com',
                type: 'VOLCENGINE_CDN_DOMAIN',
                domainName: 'cdn.example.com',
                cname: 'cdn.example.com.boscdn.com',
              },
              {
                sid: 'volcengine-cdn-dns-dev-rec-cdn-1',
                id: 'rec-cdn-1',
                type: 'VOLCENGINE_CDN_DNS_CNAME',
                domain: 'cdn.example.com',
                cname: 'cdn.example.com.boscdn.com',
                dnsRecordId: 'rec-cdn-1',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };
      mockGetResource.mockReturnValue(storedState.resources['buckets.static_site']);
      mockTosClient.tos.getBucket.mockResolvedValueOnce(ownedBucketInfo);

      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
        domains: [
          {
            domain_name: 'cdn.example.com',
            cdn: { enabled: true, cdn_type: 'web', scope: 'global' },
          },
        ],
      };

      await updateResource(mockContext, bucket, storedState);

      // force_redirect_https removed → the redirect module is switched off.
      expect(mockTosClient.cdn.applyHttpsRedirect).toHaveBeenCalledWith(
        'cdn.example.com',
        undefined,
      );
      expect(mockTosClient.cdn.applyCacheConfig).not.toHaveBeenCalled();
      expect(mockTosClient.cdn.applyCompression).not.toHaveBeenCalled();
    });

    it('creates a CDN binding during update when no distribution instance is stored', async () => {
      const storedState: StateFile = {
        ...mockState,
        resources: {
          'buckets.static_site': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              bucketName: 'test-bucket',
              acl: null,
              storageClass: null,
              websiteConfiguration: null,
              websiteCodeHash: null,
              domains: [],
              accelerate: false,
            },
            instances: [
              {
                sid: 'volcengine-tos-dev-test-bucket',
                id: 'test-bucket',
                type: 'VOLCENGINE_TOS_BUCKET',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };
      mockGetResource.mockReturnValue(storedState.resources['buckets.static_site']);
      mockTosClient.tos.getBucket.mockResolvedValueOnce(ownedBucketInfo);
      mockTosClient.cdn.describeCdnDomain.mockResolvedValue({
        domain: 'cdn.example.com',
        cname: 'cdn.example.com.boscdn.com',
        origin: ['test-bucket'],
      });
      mockTosClient.dns.addDomainRecord.mockResolvedValueOnce('rec-new');

      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
        domains: [{ domain_name: 'cdn.example.com', cdn: true }],
      };

      await updateResource(mockContext, bucket, storedState);

      expect(mockTosClient.cdn.addCdnDomain).toHaveBeenCalledWith(
        expect.objectContaining({ domain: 'cdn.example.com' }),
      );
    });

    it('applies the CDN certificate by upload when inline PEM is declared on a CDN binding', async () => {
      ownedGetBucket();
      mockTosClient.cdn.addCertificate.mockResolvedValueOnce({ certificateId: 'cert-uploaded' });
      mockTosClient.cdn.describeCdnDomain.mockResolvedValueOnce({
        domain: 'cdn.example.com',
        cname: 'cdn.example.com.boscdn.com',
        origin: ['test-bucket'],
      });
      mockTosClient.dns.addDomainRecord.mockResolvedValueOnce('rec-1');
      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
        domains: [
          {
            domain_name: 'cdn.example.com',
            certificate_body: 'CERT-BODY',
            certificate_private_key: 'CERT-KEY',
            cdn: true,
          },
        ],
      };

      await createResource(mockContext, bucket, mockState);

      expect(mockTosClient.cdn.addCertificate).toHaveBeenCalledWith(
        expect.objectContaining({
          certificate: 'CERT-BODY',
          privateKey: 'CERT-KEY',
          name: 'cdn_example_com',
        }),
      );
      expect(mockTosClient.cdn.applyCertificate).toHaveBeenCalledWith(
        'cdn.example.com',
        'cert-uploaded',
      );
    });

    it('forwards origin_protocol and delivery changes when the CDN shape changes', async () => {
      const storedState: StateFile = {
        ...mockState,
        resources: {
          'buckets.static_site': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              bucketName: 'test-bucket',
              acl: null,
              storageClass: null,
              websiteConfiguration: null,
              websiteCodeHash: null,
              domains: [
                {
                  domain_name: 'cdn.example.com',
                  cdn: { enabled: true, cdn_type: 'web', scope: 'global' },
                },
              ],
              accelerate: false,
            },
            instances: [
              {
                sid: 'volcengine-tos-dev-test-bucket',
                id: 'test-bucket',
                type: 'VOLCENGINE_TOS_BUCKET',
              },
              {
                sid: 'volcengine-cdn-dev-cdn.example.com',
                id: 'cdn.example.com',
                type: 'VOLCENGINE_CDN_DOMAIN',
                domainName: 'cdn.example.com',
                cname: 'cdn.example.com.boscdn.com',
              },
              {
                sid: 'volcengine-cdn-dns-dev-rec-cdn-1',
                id: 'rec-cdn-1',
                type: 'VOLCENGINE_CDN_DNS_CNAME',
                domain: 'cdn.example.com',
                cname: 'cdn.example.com.boscdn.com',
                dnsRecordId: 'rec-cdn-1',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };
      mockGetResource.mockReturnValue(storedState.resources['buckets.static_site']);
      mockTosClient.tos.getBucket.mockResolvedValueOnce(ownedBucketInfo);

      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
        domains: [
          {
            domain_name: 'cdn.example.com',
            cdn: {
              enabled: true,
              cdn_type: 'video',
              scope: 'overseas',
              origin_protocol: 'follow',
            },
          },
        ],
      };

      await updateResource(mockContext, bucket, storedState);

      expect(mockTosClient.cdn.updateCdnDelivery).toHaveBeenCalledWith(
        'cdn.example.com',
        expect.objectContaining({
          serviceType: 'video',
          serviceRegion: 'outside_chinese_mainland',
          origin: {
            originLines: [
              {
                originType: 'primary',
                instanceType: 'TOS',
                bucketName: 'test-bucket',
                region: 'cn-beijing',
                address: 'test-bucket.tos-cn-beijing.volces.com',
                originHost: 'test-bucket.tos-cn-beijing.volces.com',
              },
            ],
          },
        }),
      );
    });

    it('skips certificate redeploy when the recorded hash is unchanged', async () => {
      const storedState: StateFile = {
        ...mockState,
        resources: {
          'buckets.static_site': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              bucketName: 'test-bucket',
              acl: null,
              storageClass: null,
              websiteConfiguration: null,
              websiteCodeHash: null,
              domains: [
                {
                  domain_name: 'cdn.example.com',
                  certificate_body: 'CERT-BODY',
                  certificate_private_key: '(managed)',
                  certificate_hash: null,
                  cdn: { enabled: true, cdn_type: 'web', scope: 'global' },
                },
              ],
              accelerate: false,
            },
            instances: [
              {
                sid: 'volcengine-tos-dev-test-bucket',
                id: 'test-bucket',
                type: 'VOLCENGINE_TOS_BUCKET',
              },
              {
                sid: 'volcengine-cdn-dev-cdn.example.com',
                id: 'cdn.example.com',
                type: 'VOLCENGINE_CDN_DOMAIN',
                domainName: 'cdn.example.com',
                cname: 'cdn.example.com.boscdn.com',
              },
              {
                sid: 'volcengine-cdn-dns-dev-rec-cdn-1',
                id: 'rec-cdn-1',
                type: 'VOLCENGINE_CDN_DNS_CNAME',
                domain: 'cdn.example.com',
                cname: 'cdn.example.com.boscdn.com',
                dnsRecordId: 'rec-cdn-1',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };
      const entry = (
        storedState.resources['buckets.static_site'].definition.domains as Array<
          Record<string, unknown>
        >
      )[0];
      const certUtils = jest.requireActual('../../../../src/common/certUtils') as {
        resolveBindingCertificateHash: (b: Record<string, unknown>) => string | undefined;
      };
      entry.certificate_hash = certUtils.resolveBindingCertificateHash({
        certificate_body: 'CERT-BODY',
        certificate_private_key: 'CERT-KEY',
      });
      mockGetResource.mockReturnValue(storedState.resources['buckets.static_site']);
      mockTosClient.tos.getBucket.mockResolvedValueOnce(ownedBucketInfo);

      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
        domains: [
          {
            domain_name: 'cdn.example.com',
            certificate_body: 'CERT-BODY',
            certificate_private_key: 'CERT-KEY',
            cdn: true,
          },
        ],
      };

      await updateResource(mockContext, bucket, storedState);

      expect(mockTosClient.cdn.addCertificate).not.toHaveBeenCalled();
      expect(mockTosClient.cdn.applyCertificate).not.toHaveBeenCalled();
    });

    it('swallows a failing CDN delivery-record cleanup during CDN teardown', async () => {
      const storedState: StateFile = {
        ...mockState,
        resources: {
          'buckets.static_site': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              bucketName: 'test-bucket',
              acl: null,
              storageClass: null,
              websiteConfiguration: null,
              websiteCodeHash: null,
              domains: [{ domain_name: 'cdn.example.com', cdn: { enabled: true } }],
              accelerate: false,
            },
            instances: [
              {
                sid: 'volcengine-tos-dev-test-bucket',
                id: 'test-bucket',
                type: 'VOLCENGINE_TOS_BUCKET',
              },
              {
                sid: 'volcengine-cdn-dev-cdn.example.com',
                id: 'cdn.example.com',
                type: 'VOLCENGINE_CDN_DOMAIN',
                domainName: 'cdn.example.com',
                cname: 'cdn.example.com.boscdn.com',
              },
              {
                sid: 'volcengine-cdn-dns-dev-rec-cdn-1',
                id: 'rec-cdn-1',
                type: 'VOLCENGINE_CDN_DNS_CNAME',
                domain: 'cdn.example.com',
                cname: 'cdn.example.com.boscdn.com',
                dnsRecordId: 'rec-cdn-1',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };
      mockTosClient.dns.deleteDomainRecord.mockRejectedValueOnce({ code: 'AccessDenied' });

      await deleteResource(mockContext, 'test-bucket', 'buckets.static_site', storedState);

      expect(mockTosClient.cdn.deleteCdnDomain).toHaveBeenCalledWith('cdn.example.com');
      expect(mockTosClient.tos.deleteBucket).toHaveBeenCalledWith('test-bucket');
    });

    it('fails loudly when a pending CDN binding exposes no CNAME and none is recorded', async () => {
      const storedState: StateFile = {
        ...mockState,
        resources: {
          'buckets.static_site': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              bucketName: 'test-bucket',
              acl: null,
              storageClass: null,
              websiteConfiguration: null,
              websiteCodeHash: null,
              domains: [{ domain_name: 'cdn.example.com', cdn: { enabled: true } }],
              accelerate: false,
            },
            instances: [
              {
                sid: 'volcengine-tos-dev-test-bucket',
                id: 'test-bucket',
                type: 'VOLCENGINE_TOS_BUCKET',
              },
              {
                sid: 'volcengine-cdn-dev-cdn.example.com',
                id: 'cdn.example.com',
                type: 'VOLCENGINE_CDN_DOMAIN',
                domainName: 'cdn.example.com',
                cname: 'cdn.example.com.boscdn.com',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };
      mockGetResource.mockReturnValue(storedState.resources['buckets.static_site']);
      mockTosClient.tos.getBucket.mockResolvedValueOnce(ownedBucketInfo);
      mockTosClient.cdn.describeCdnDomain.mockResolvedValueOnce({ domain: 'cdn.example.com' });

      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
        domains: [{ domain_name: 'cdn.example.com', cdn: true }],
      };

      await expect(updateResource(mockContext, bucket, storedState)).rejects.toThrow(
        'FAILED_TO_REFRESH_STATE',
      );
    });

    it('swallows a failing delivery-record cleanup while tearing down a direct binding', async () => {
      const storedState: StateFile = {
        ...mockState,
        resources: {
          'buckets.static_site': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              bucketName: 'test-bucket',
              acl: null,
              storageClass: null,
              websiteConfiguration: null,
              websiteCodeHash: null,
              domains: [{ domain_name: 'old.example.com', cdn: { enabled: false } }],
              accelerate: false,
            },
            instances: [
              {
                sid: 'volcengine-tos-dev-test-bucket',
                id: 'test-bucket',
                type: 'VOLCENGINE_TOS_BUCKET',
              },
              {
                sid: 'volcengine-dns-dev-old.example.com',
                id: 'old.example.com',
                type: 'VOLCENGINE_TOS_DNS_CNAME',
                domain: 'old.example.com',
                cname: 'test-bucket.tos-cn-beijing.volces.com',
                dnsRecordId: 'rec-old-1',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };
      mockGetResource.mockReturnValue(storedState.resources['buckets.static_site']);
      mockTosClient.tos.getBucket.mockResolvedValueOnce(ownedBucketInfo);
      mockTosClient.dns.deleteDomainRecord.mockRejectedValueOnce({ code: 'AccessDenied' });

      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
        domains: [],
      };

      await expect(updateResource(mockContext, bucket, storedState)).resolves.toBeDefined();
      expect(mockTosClient.tos.deleteBucketCustomDomain).toHaveBeenCalledWith(
        'test-bucket',
        'old.example.com',
      );
    });

    it('enables acceleration via update and rebinds a direct binding in place', async () => {
      const storedState: StateFile = {
        ...mockState,
        resources: {
          'buckets.static_site': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              bucketName: 'test-bucket',
              acl: null,
              storageClass: null,
              websiteConfiguration: null,
              websiteCodeHash: null,
              domains: [{ domain_name: 'a.example.com', cdn: { enabled: false } }],
              accelerate: false,
            },
            instances: [
              {
                sid: 'volcengine-tos-dev-test-bucket',
                id: 'test-bucket',
                type: 'VOLCENGINE_TOS_BUCKET',
              },
              {
                sid: 'volcengine-dns-dev-a.example.com',
                id: 'a.example.com',
                type: 'VOLCENGINE_TOS_DNS_CNAME',
                domain: 'a.example.com',
                cname: 'test-bucket.tos-cn-beijing.volces.com',
                dnsRecordId: 'rec-a-1',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };
      mockGetResource.mockReturnValue(storedState.resources['buckets.static_site']);
      mockTosClient.tos.getBucket.mockResolvedValueOnce(ownedBucketInfo);
      mockTosClient.dns.addDomainRecord.mockResolvedValueOnce('rec-a-2');

      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
        accelerate: true,
        domains: [{ domain_name: 'a.example.com' }],
      };

      await updateResource(mockContext, bucket, storedState);

      expect(mockTosClient.tos.putBucketTransferAcceleration).toHaveBeenCalledWith(
        'test-bucket',
        true,
      );
      // the direct binding is rebound in place against the accelerate endpoint,
      // not torn down.
      expect(mockTosClient.dns.deleteDomainRecord).not.toHaveBeenCalled();
      expect(mockTosClient.dns.addDomainRecord).toHaveBeenCalledWith(
        expect.objectContaining({ value: 'test-bucket.tos-accelerate.volces.com' }),
      );
    });

    it('switches a stored binding from CDN to direct at binding level without touching the bucket', async () => {
      const storedState: StateFile = {
        ...mockState,
        resources: {
          'buckets.static_site': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              bucketName: 'test-bucket',
              acl: null,
              storageClass: null,
              websiteConfiguration: null,
              websiteCodeHash: null,
              domains: [{ domain_name: 'cdn.example.com', cdn: { enabled: true } }],
              accelerate: false,
            },
            instances: [
              {
                sid: 'volcengine-tos-dev-test-bucket',
                id: 'test-bucket',
                type: 'VOLCENGINE_TOS_BUCKET',
              },
              {
                sid: 'volcengine-cdn-dev-cdn.example.com',
                id: 'cdn.example.com',
                type: 'VOLCENGINE_CDN_DOMAIN',
                domainName: 'cdn.example.com',
                cname: 'cdn.example.com.boscdn.com',
              },
              {
                sid: 'volcengine-cdn-dns-dev-rec-cdn-1',
                id: 'rec-cdn-1',
                type: 'VOLCENGINE_CDN_DNS_CNAME',
                domain: 'cdn.example.com',
                cname: 'cdn.example.com.boscdn.com',
                dnsRecordId: 'rec-cdn-1',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };
      mockGetResource.mockReturnValue(storedState.resources['buckets.static_site']);
      mockTosClient.tos.getBucket.mockResolvedValueOnce(ownedBucketInfo);
      mockTosClient.dns.addDomainRecord.mockResolvedValueOnce('rec-123');

      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
        domains: [{ domain_name: 'cdn.example.com' }],
      };

      await updateResource(mockContext, bucket, storedState);

      expect(mockTosClient.cdn.deleteCdnDomain).toHaveBeenCalledWith('cdn.example.com');
      expect(mockTosClient.dns.deleteDomainRecord).toHaveBeenCalledWith('rec-cdn-1');
      // CDN-mode storage never bound the bucket, so only the new direct rule is written.
      expect(mockTosClient.tos.deleteBucketCustomDomain).not.toHaveBeenCalled();
      expect(mockTosClient.tos.putBucketCustomDomain).toHaveBeenCalledWith(
        'test-bucket',
        'cdn.example.com',
        undefined,
      );
    });

    it('tears down bindings removed from the YAML', async () => {
      const storedState: StateFile = {
        ...mockState,
        resources: {
          'buckets.static_site': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              bucketName: 'test-bucket',
              acl: null,
              storageClass: null,
              websiteConfiguration: null,
              websiteCodeHash: null,
              domains: [{ domain_name: 'old.example.com', cdn: { enabled: false } }],
              accelerate: false,
            },
            instances: [
              {
                sid: 'volcengine-tos-dev-test-bucket',
                id: 'test-bucket',
                type: 'VOLCENGINE_TOS_BUCKET',
              },
              {
                sid: 'volcengine-dns-dev-old.example.com',
                id: 'old.example.com',
                type: 'VOLCENGINE_TOS_DNS_CNAME',
                domain: 'old.example.com',
                cname: 'test-bucket.tos-cn-beijing.volces.com',
                dnsRecordId: 'rec-old-1',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };
      mockGetResource.mockReturnValue(storedState.resources['buckets.static_site']);
      mockTosClient.tos.getBucket.mockResolvedValueOnce(ownedBucketInfo);

      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
        domains: [],
      };

      await updateResource(mockContext, bucket, storedState);

      expect(mockTosClient.tos.deleteBucketCustomDomain).toHaveBeenCalledWith(
        'test-bucket',
        'old.example.com',
      );
      expect(mockTosClient.dns.deleteDomainRecord).toHaveBeenCalledWith('rec-old-1');
    });

    it('enables transfer acceleration and binds accelerate-only bindings on create', async () => {
      ownedGetBucket();
      mockTosClient.dns.addDomainRecord.mockResolvedValueOnce('rec-acc-1');
      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
        accelerate: true,
        domains: [{ domain_name: 'acc.example.com' }],
      };

      await createResource(mockContext, bucket, mockState);

      expect(mockTosClient.tos.putBucketTransferAcceleration).toHaveBeenCalledWith(
        'test-bucket',
        true,
      );
      expect(mockTosClient.dns.addDomainRecord).toHaveBeenCalledWith(
        expect.objectContaining({ value: 'test-bucket.tos-accelerate.volces.com' }),
      );
    });

    it('rejects disabling transfer acceleration via update', async () => {
      const storedState: StateFile = {
        ...mockState,
        resources: {
          'buckets.static_site': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              bucketName: 'test-bucket',
              acl: null,
              storageClass: null,
              websiteConfiguration: null,
              websiteCodeHash: null,
              domains: [],
              accelerate: true,
            },
            instances: [
              {
                sid: 'volcengine-tos-dev-test-bucket',
                id: 'test-bucket',
                type: 'VOLCENGINE_TOS_BUCKET',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };
      mockGetResource.mockReturnValue(storedState.resources['buckets.static_site']);

      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
      };

      await expect(updateResource(mockContext, bucket, storedState)).rejects.toThrow(
        'CDN_ACCELERATE_CONFIG_CHANGED',
      );
      expect(mockTosClient.tos.updateBucketAcl).not.toHaveBeenCalled();
    });

    it('tears down stored bindings before deleting the bucket', async () => {
      const storedState: StateFile = {
        ...mockState,
        resources: {
          'buckets.static_site': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              bucketName: 'test-bucket',
              acl: null,
              storageClass: null,
              websiteConfiguration: null,
              websiteCodeHash: null,
              domains: [{ domain_name: 'old.example.com', cdn: { enabled: false } }],
              accelerate: false,
            },
            instances: [
              {
                sid: 'volcengine-tos-dev-test-bucket',
                id: 'test-bucket',
                type: 'VOLCENGINE_TOS_BUCKET',
              },
              {
                sid: 'volcengine-dns-dev-old.example.com',
                id: 'old.example.com',
                type: 'VOLCENGINE_TOS_DNS_CNAME',
                domain: 'old.example.com',
                cname: 'test-bucket.tos-cn-beijing.volces.com',
                dnsRecordId: 'rec-old-1',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      await deleteResource(mockContext, 'test-bucket', 'buckets.static_site', storedState);

      expect(mockTosClient.tos.deleteBucketCustomDomain).toHaveBeenCalledWith(
        'test-bucket',
        'old.example.com',
      );
      expect(mockTosClient.dns.deleteDomainRecord).toHaveBeenCalledWith('rec-old-1');
      expect(mockTosClient.tos.deleteBucket).toHaveBeenCalledWith('test-bucket');
    });
  });

  describe('readResource', () => {
    it('should read bucket from provider', async () => {
      mockTosClient.tos.getBucket.mockResolvedValueOnce({
        name: 'test-bucket',
        location: 'cn-beijing',
        acl: 'private',
      });

      const bucketInfo = await readResource(mockContext, 'test-bucket');

      expect(mockTosClient.tos.getBucket).toHaveBeenCalledWith('test-bucket');
      expect(bucketInfo).toEqual({
        name: 'test-bucket',
        location: 'cn-beijing',
        acl: 'private',
      });
    });
  });

  describe('updateResource', () => {
    it('should update bucket ACL and website', async () => {
      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
        security: { acl: BucketAccessEnum.PUBLIC_READ, force_delete: false },
        website: {
          index: 'index.html',
          code: './dist',
        },
      };

      mockTosClient.tos.updateBucketAcl.mockResolvedValueOnce(undefined);
      mockTosClient.tos.updateBucketWebsite.mockResolvedValueOnce(undefined);
      mockTosClient.tos.uploadFiles.mockResolvedValueOnce(undefined);
      mockTosClient.tos.getBucket.mockResolvedValueOnce({
        name: 'test-bucket',
        acl: 'public-read',
      });

      await updateResource(mockContext, bucket, mockState);

      expect(mockTosClient.tos.updateBucketAcl).toHaveBeenCalledWith('test-bucket', 'public-read');
      expect(mockTosClient.tos.updateBucketWebsite).toHaveBeenCalled();
      expect(setResource).toHaveBeenCalled();
    });

    it('should throw error if bucket not found after update', async () => {
      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
      };

      mockTosClient.tos.getBucket.mockResolvedValueOnce(null);

      await expect(updateResource(mockContext, bucket, mockState)).rejects.toThrow();
    });

    it('should apply bucket policy when iam changes', async () => {
      mockTosClient.tos.getBucket.mockResolvedValueOnce({
        name: 'test-bucket',
        location: 'cn-beijing',
        acl: 'private',
      });
      mockTosClient.tos.putBucketPolicy.mockResolvedValueOnce(undefined);

      const bucket: BucketDomain = {
        key: 'test_bucket',
        name: 'test-bucket',
        iam: {
          resource: {
            statements: [
              {
                effect: 'Allow',
                principal: { Service: 'tos.volcengine.com' },
                action: ['tos:GetObject'],
                resource: ['trn:tos:::my-bucket/*'],
              },
            ],
          },
        },
      };

      await updateResource(mockContext, bucket, mockState);

      expect(mockTosClient.tos.putBucketPolicy).toHaveBeenCalledWith(
        'test-bucket',
        expect.objectContaining({ Statement: expect.any(Array) }),
      );
    });

    it('clears a policy only when the statement list is explicitly empty', async () => {
      const stateWithPolicy: StateFile = {
        ...mockState,
        resources: {
          'buckets.test_bucket': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              bucketName: 'test-bucket',
              policy:
                '{"resource":{"statements":[{"effect":"Allow","action":["tos:GetObject"],"resource":["*"],"principal":{"Service":"tos"}}]}}',
            },
            instances: [{ sid: 'tos-sid', id: 'test-bucket', type: 'VOLCENGINE_TOS_BUCKET' }],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      mockTosClient.tos.getBucket.mockResolvedValueOnce({
        name: 'test-bucket',
        location: 'cn-beijing',
      });
      mockTosClient.tos.deleteBucketPolicy.mockResolvedValueOnce(undefined);

      const bucket: BucketDomain = {
        iam: { resource: { statements: [] } },
        key: 'test_bucket',
        name: 'test-bucket',
      };

      await updateResource(mockContext, bucket, stateWithPolicy);

      expect(mockTosClient.tos.deleteBucketPolicy).toHaveBeenCalledWith('test-bucket');
    });

    it('reapplies a declared policy during a selected repair even when saved intent is unchanged', async () => {
      const stateWithPolicy: StateFile = {
        ...mockState,
        resources: {
          'buckets.test_bucket': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              bucketName: 'test-bucket',
              policy: JSON.stringify({
                resource: {
                  statements: [
                    {
                      effect: 'Allow',
                      principal: { Service: 'tos.volcengine.com' },
                      action: ['tos:GetObject'],
                      resource: ['trn:tos:::my-bucket/*'],
                    },
                  ],
                },
              }),
            },
            instances: [{ sid: 'tos-sid', id: 'test-bucket', type: 'VOLCENGINE_TOS_BUCKET' }],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      mockTosClient.tos.getBucket.mockResolvedValueOnce({
        name: 'test-bucket',
        location: 'cn-beijing',
      });

      const bucket: BucketDomain = {
        key: 'test_bucket',
        name: 'test-bucket',
        iam: {
          resource: {
            statements: [
              {
                effect: 'Allow',
                principal: { Service: 'tos.volcengine.com' },
                action: ['tos:GetObject'],
                resource: ['trn:tos:::my-bucket/*'],
              },
            ],
          },
        },
      };

      await updateResource(mockContext, bucket, stateWithPolicy);

      expect(mockTosClient.tos.putBucketPolicy).toHaveBeenCalled();
      expect(mockTosClient.tos.deleteBucketPolicy).not.toHaveBeenCalled();
    });
  });

  describe('deleteResource', () => {
    it('should delete bucket policy before deleting bucket', async () => {
      mockTosClient.tos.deleteBucketPolicy.mockResolvedValueOnce(undefined);
      mockTosClient.tos.deleteBucket.mockResolvedValueOnce(undefined);

      await deleteResource(mockContext, 'test-bucket', 'buckets.static_site', mockState);

      expect(mockTosClient.tos.deleteBucketPolicy).toHaveBeenCalledWith('test-bucket');
      expect(mockTosClient.tos.deleteBucket).toHaveBeenCalledWith('test-bucket');
      expect(removeResource).toHaveBeenCalledWith(mockState, 'buckets.static_site');
    });

    it('should propagate deleteBucketPolicy error and keep resource in state', async () => {
      mockTosClient.tos.deleteBucketPolicy.mockRejectedValueOnce(new Error('Policy error'));

      await expect(
        deleteResource(mockContext, 'test-bucket', 'buckets.static_site', mockState),
      ).rejects.toThrow('Policy error');

      expect(mockTosClient.tos.deleteBucket).not.toHaveBeenCalled();
      expect(removeResource).not.toHaveBeenCalled();
    });

    it('should delete bucket successfully', async () => {
      mockTosClient.tos.deleteBucket.mockResolvedValueOnce(undefined);

      await deleteResource(mockContext, 'test-bucket', 'buckets.static_site', mockState);

      expect(mockTosClient.tos.deleteBucket).toHaveBeenCalledWith('test-bucket');
      expect(removeResource).toHaveBeenCalledWith(mockState, 'buckets.static_site');
    });

    it('should handle NoSuchBucket error', async () => {
      const error = new Error('Not found') as Error & { code: string };
      error.code = 'NoSuchBucket';
      mockTosClient.tos.deleteBucket.mockRejectedValueOnce(error);

      await deleteResource(mockContext, 'test-bucket', 'buckets.static_site', mockState);

      expect(removeResource).toHaveBeenCalledWith(mockState, 'buckets.static_site');
    });

    it('should handle ResourceNotFound error', async () => {
      const error = new Error('Not found') as Error & { code: string };
      error.code = 'ResourceNotFound';
      mockTosClient.tos.deleteBucket.mockRejectedValueOnce(error);

      await deleteResource(mockContext, 'test-bucket', 'buckets.static_site', mockState);

      expect(removeResource).toHaveBeenCalledWith(mockState, 'buckets.static_site');
    });

    it('should throw other errors', async () => {
      const error = new Error('Access denied') as Error & { code: string };
      error.code = 'AccessDenied';
      mockTosClient.tos.deleteBucket.mockRejectedValueOnce(error);

      await expect(
        deleteResource(mockContext, 'test-bucket', 'buckets.static_site', mockState),
      ).rejects.toThrow('Access denied');
    });
  });
});
