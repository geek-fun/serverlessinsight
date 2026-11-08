import { ProviderEnum } from '../../../../src/common';
import {
  createBucketResource,
  updateBucketResource,
  deleteBucketResource,
  readBucketResource,
} from '../../../../src/stack/scfStack/cosResource';
import {
  Context,
  CURRENT_STATE_VERSION,
  StateFile,
  BucketAccessEnum,
  BucketDomain,
  BucketDomainBinding,
  CdnConfig,
} from '../../../../src/types';

const mockCosOperations = {
  createBucket: jest.fn(),
  getBucket: jest.fn(),
  deleteBucket: jest.fn(),
  uploadFiles: jest.fn(),
  updateBucketAcl: jest.fn(),
  updateBucketWebsite: jest.fn(),
  bindCustomDomain: jest.fn(),
  unbindCustomDomain: jest.fn(),
  getCosEndpoint: jest.fn(),
  putBucketPolicy: jest.fn(),
  deleteBucketPolicy: jest.fn(),
};

const mockSslOperations = {
  uploadCertificate: jest.fn(),
  getCertificate: jest.fn(),
  deleteCertificate: jest.fn(),
  deployCertificateInstance: jest.fn(),
};

const mockedStateManager = {
  setResource: jest.fn(),
  removeResource: jest.fn(),
};

const mockedLogger = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
};

const mockCdnOperations = {
  addCdnDomain: jest.fn(),
  describeCdnDomain: jest.fn(),
  deleteCdnDomain: jest.fn(),
  updateCdnDelivery: jest.fn(),
  applyCacheConfig: jest.fn(),
  applyCompression: jest.fn(),
  applyHttpsRedirect: jest.fn(),
  enableHttps: jest.fn(),
};

const mockDnsOperations = {
  addDomainRecord: jest.fn(),
  updateDomainRecord: jest.fn(),
  deleteDomainRecord: jest.fn(),
  describeDomainRecords: jest.fn(),
  checkDomainRecordExists: jest.fn(),
};

jest.mock('../../../../src/common/tencentClient', () => ({
  createTencentClient: () => ({
    cos: mockCosOperations,
    ssl: mockSslOperations,
    cdn: mockCdnOperations,
    dns: mockDnsOperations,
    scf: {},
    tdsqlc: {},
  }),
}));

jest.mock('../../../../src/common/stateManager', () => ({
  ...jest.requireActual('../../../../src/common/stateManager'),
  setResource: (...args: unknown[]) => mockedStateManager.setResource(...args),
  removeResource: (...args: unknown[]) => mockedStateManager.removeResource(...args),
}));

jest.mock('../../../../src/common/logger', () => ({
  logger: {
    info: (...args: unknown[]) => mockedLogger.info(...args),
    error: (...args: unknown[]) => mockedLogger.error(...args),
    warn: (...args: unknown[]) => mockedLogger.warn(...args),
    debug: (...args: unknown[]) => mockedLogger.debug(...args),
  },
}));

describe('CosResource', () => {
  const mockContext: Context = {
    stage: 'default',
    app: 'test-app',
    service: 'test-service',
    provider: ProviderEnum.TENCENT,
    region: 'ap-guangzhou',
    accessKeyId: 'test-key',
    accessKeySecret: 'test-secret',
    iacLocation: 'test.yml',
    parameters: [],
    stages: {},
  };

  const initialState: StateFile = {
    version: CURRENT_STATE_VERSION,
    provider: 'tencent',
    app: 'test-app',
    service: 'test-service',
    stages: {},
    resources: {},
  };

  const mockBucketInfo = {
    Name: 'test-bucket',
    Location: 'ap-guangzhou',
    CreationDate: '2024-01-01',
    ACL: 'private',
    WebsiteConfiguration: { IndexDocument: { Suffix: 'index.html' } },
    AccessControlPolicy: { owner: { id: 'owner-1' }, grants: [] },
    CorsConfiguration: [],
    VersioningConfiguration: { status: 'Enabled' },
    TaggingConfiguration: { tags: [] },
    Tags: [{ Key: 'si-owned-by', Value: 'test-app-test-service:buckets.test_bucket' }],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedStateManager.setResource.mockImplementation(
      (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
        ...initialState,
        resources: { [`buckets.test_bucket`]: resourceState },
      }),
    );
  });

  describe('createBucketResource', () => {
    it('should create bucket and return state', async () => {
      mockCosOperations.createBucket.mockResolvedValue(undefined);
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfo);

      const bucket = {
        key: 'test_bucket',
        name: 'test-bucket',
        website: {
          index: 'index.html',
          code: './dist',
        },
      };

      await createBucketResource(mockContext, bucket, initialState);

      expect(mockCosOperations.createBucket).toHaveBeenCalled();
      expect(mockCosOperations.getBucket).toHaveBeenCalledWith('test-bucket', 'ap-guangzhou');
      expect(mockedStateManager.setResource).toHaveBeenCalled();
    });

    it('should persist tainted state via PartialResourceError on create failure', async () => {
      const error = new Error('Create failed');
      mockCosOperations.createBucket.mockRejectedValue(error);

      const taintedState = {
        ...initialState,
        resources: {
          'buckets.test_bucket': {
            mode: 'managed',
            region: 'ap-guangzhou',
            definition: { bucket: 'test-bucket' },
            instances: [],
            lastUpdated: expect.any(String),
            status: 'tainted',
          },
        },
      };
      mockedStateManager.setResource.mockReturnValue(taintedState);

      await expect(
        createBucketResource(
          mockContext,
          { key: 'test_bucket', name: 'test-bucket' },
          initialState,
        ),
      ).rejects.toMatchObject({
        name: 'PartialResourceError',
        cause: { message: 'Create failed' },
        updatedState: expect.objectContaining({
          resources: expect.objectContaining({
            'buckets.test_bucket': expect.objectContaining({ status: 'tainted' }),
          }),
        }),
      });
    });

    it('should deploy SSL certificate to COS after domain binding', async () => {
      mockCosOperations.createBucket.mockResolvedValue(undefined);
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfo);
      mockCosOperations.bindCustomDomain.mockResolvedValue({
        cname: 'test-bucket.cos.ap-guangzhou.myqcloud.com',
        dnsRecordId: 'dns-123',
        bucketDomainBound: true,
      });
      mockSslOperations.uploadCertificate.mockResolvedValue({
        certificateId: 'ssl-cert-001',
        alias: 'my-cert',
      });
      mockSslOperations.deployCertificateInstance.mockResolvedValue({
        deployRecordId: 42,
        deployStatus: 1,
      });

      const domainBucket = {
        key: 'test_bucket',
        name: 'test-bucket',
        website: {
          index: 'index.html',
          code: './dist',
        },
        domains: [
          {
            domain_name: 'cdn.example.com',
            certificate_body: 'CERT-BODY',
            certificate_private_key: 'CERT-KEY',
          },
        ],
      };

      await createBucketResource(mockContext, domainBucket, initialState);

      expect(mockCosOperations.createBucket).toHaveBeenCalled();
      expect(mockCosOperations.bindCustomDomain).toHaveBeenCalledWith(
        'test-bucket',
        'cdn.example.com',
      );
      expect(mockSslOperations.uploadCertificate).toHaveBeenCalledWith(
        'cdn_example_com',
        'CERT-BODY',
        'CERT-KEY',
      );
      expect(mockSslOperations.deployCertificateInstance).toHaveBeenCalledWith(
        'ssl-cert-001',
        'cos',
        ['ap-guangzhou|test-bucket|cdn.example.com'],
      );
    });

    it('should not deploy certificate when domain_certificate is not specified', async () => {
      mockCosOperations.createBucket.mockResolvedValue(undefined);
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfo);
      mockCosOperations.bindCustomDomain.mockResolvedValue({
        cname: 'test-bucket.cos.ap-guangzhou.myqcloud.com',
      });

      const bucket = {
        key: 'test_bucket',
        name: 'test-bucket',
        website: {
          index: 'index.html',
          code: './dist',
        },
        domains: [{ domain_name: 'cdn.example.com' }],
      };

      await createBucketResource(mockContext, bucket, initialState);

      expect(mockCosOperations.bindCustomDomain).toHaveBeenCalled();
      expect(mockSslOperations.uploadCertificate).not.toHaveBeenCalled();
      expect(mockSslOperations.deployCertificateInstance).not.toHaveBeenCalled();
    });

    it('should not deploy SSL when bucketDomainBound is false', async () => {
      mockCosOperations.createBucket.mockResolvedValue(undefined);
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfo);
      mockCosOperations.bindCustomDomain.mockResolvedValue({
        cname: 'test-bucket.cos.ap-guangzhou.myqcloud.com',
        dnsRecordId: 'dns-123',
        bucketDomainBound: false,
      });

      const domainBucket = {
        key: 'test_bucket',
        name: 'test-bucket',
        website: {
          index: 'index.html',
          code: './dist',
        },
        domains: [
          {
            domain_name: 'cdn.example.com',
            certificate_body: 'CERT-BODY',
            certificate_private_key: 'CERT-KEY',
          },
        ],
      };

      await createBucketResource(mockContext, domainBucket, initialState);

      expect(mockCosOperations.bindCustomDomain).toHaveBeenCalled();
      expect(mockSslOperations.uploadCertificate).not.toHaveBeenCalled();
      expect(mockSslOperations.deployCertificateInstance).not.toHaveBeenCalled();
    });

    it('should deploy SSL certificate using certificate_id reference mode', async () => {
      mockCosOperations.createBucket.mockResolvedValue(undefined);
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfo);
      mockCosOperations.bindCustomDomain.mockResolvedValue({
        cname: 'test-bucket.cos.ap-guangzhou.myqcloud.com',
        dnsRecordId: 'dns-123',
        bucketDomainBound: true,
      });
      mockSslOperations.deployCertificateInstance.mockResolvedValue({
        deployRecordId: 100,
      });

      const domainBucket = {
        key: 'test_bucket',
        name: 'test-bucket',
        website: {
          index: 'index.html',
          code: './dist',
        },
        domains: [{ domain_name: 'cdn.example.com', certificate_id: 'existing-cert-12345' }],
      };

      await createBucketResource(mockContext, domainBucket, initialState);

      expect(mockCosOperations.bindCustomDomain).toHaveBeenCalled();
      expect(mockSslOperations.uploadCertificate).not.toHaveBeenCalled();
      expect(mockSslOperations.deployCertificateInstance).toHaveBeenCalledWith(
        'existing-cert-12345',
        'cos',
        ['ap-guangzhou|test-bucket|cdn.example.com'],
      );
    });

    it('should stamp the ownership tag onto the createBucket config (x-cos-tagging header source)', async () => {
      mockCosOperations.createBucket.mockResolvedValue(undefined);
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfo);

      await createBucketResource(
        mockContext,
        { key: 'test_bucket', name: 'test-bucket' },
        initialState,
      );

      expect(mockCosOperations.createBucket).toHaveBeenCalledWith(
        expect.objectContaining({
          Bucket: 'test-bucket',
          Region: 'ap-guangzhou',
          Tags: [
            { Key: 'si-owned-by', Value: 'test-app-test-service:buckets.test_bucket@ap-guangzhou' },
          ],
        }),
      );
    });

    it('should idempotently adopt a bucket that already exists and carries our ownership tag', async () => {
      const existsError = Object.assign(new Error('BucketAlreadyExists'), {
        code: 'BucketAlreadyExists',
      });
      mockCosOperations.createBucket.mockRejectedValue(existsError);
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfo);

      const result = await createBucketResource(
        mockContext,
        { key: 'test_bucket', name: 'test-bucket' },
        initialState,
      );

      expect(mockCosOperations.createBucket).toHaveBeenCalledTimes(1);
      expect(mockCosOperations.getBucket).toHaveBeenCalledWith('test-bucket', 'ap-guangzhou');
      expect(result).toBeDefined();
    });

    it('should refuse an untagged pre-existing bucket even when createBucket succeeds idempotently', async () => {
      // COS PutBucket is idempotent for the same region/owner — createBucket
      // resolves, but the bucket pre-existed without our ownership tag, so it
      // must be refused rather than silently adopted.
      mockCosOperations.createBucket.mockResolvedValue(undefined);
      mockCosOperations.getBucket.mockResolvedValue({
        ...mockBucketInfo,
        Tags: [{ Key: 'env', Value: 'prod' }],
      });

      await expect(
        createBucketResource(
          mockContext,
          { key: 'test_bucket', name: 'test-bucket' },
          initialState,
        ),
      ).rejects.toMatchObject({
        name: 'PartialResourceError',
        cause: { message: expect.stringContaining('not owned by this stack') },
      });
    });

    it('should refuse adoption when a bucket collision occurs and the bucket lacks our ownership tag', async () => {
      const existsError = Object.assign(new Error('BucketAlreadyOwnedByYou'), {
        code: 'BucketAlreadyOwnedByYou',
      });
      mockCosOperations.createBucket.mockRejectedValue(existsError);
      mockCosOperations.getBucket.mockResolvedValue({
        ...mockBucketInfo,
        Tags: [{ Key: 'other-project-tag', Value: 'someone-else' }],
      });

      await expect(
        createBucketResource(
          mockContext,
          { key: 'test_bucket', name: 'test-bucket' },
          initialState,
        ),
      ).rejects.toMatchObject({
        name: 'PartialResourceError',
        cause: { message: expect.stringContaining('not owned by this stack') },
      });
    });
  });

  describe('updateBucketResource', () => {
    it('should deploy SSL certificate on update with inline certificate', async () => {
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfo);
      mockCosOperations.bindCustomDomain.mockResolvedValue({
        cname: 'test-bucket.cos.ap-guangzhou.myqcloud.com',
        dnsRecordId: 'dns-456',
        bucketDomainBound: true,
      });
      mockSslOperations.uploadCertificate.mockResolvedValue({
        certificateId: 'ssl-cert-002',
        alias: 'my-cert',
      });
      mockSslOperations.deployCertificateInstance.mockResolvedValue({
        deployRecordId: 99,
      });

      const bucket = {
        key: 'test_bucket',
        name: 'test-bucket',
        website: {
          index: 'index.html',
          code: './dist',
        },
        domains: [
          {
            domain_name: 'cdn.example.com',
            certificate_body: 'CERT-BODY',
            certificate_private_key: 'CERT-KEY',
          },
        ],
      };

      await updateBucketResource(mockContext, bucket, initialState);

      expect(mockSslOperations.uploadCertificate).toHaveBeenCalledWith(
        'cdn_example_com',
        'CERT-BODY',
        'CERT-KEY',
      );
      expect(mockSslOperations.deployCertificateInstance).toHaveBeenCalledWith(
        'ssl-cert-002',
        'cos',
        ['ap-guangzhou|test-bucket|cdn.example.com'],
      );
    });

    it('should deploy SSL certificate on update using certificate_id reference mode', async () => {
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfo);
      mockCosOperations.bindCustomDomain.mockResolvedValue({
        cname: 'test-bucket.cos.ap-guangzhou.myqcloud.com',
        dnsRecordId: 'dns-456',
        bucketDomainBound: true,
      });
      mockSslOperations.deployCertificateInstance.mockResolvedValue({
        deployRecordId: 101,
      });

      const bucket = {
        key: 'test_bucket',
        name: 'test-bucket',
        website: {
          index: 'index.html',
          code: './dist',
        },
        domains: [{ domain_name: 'cdn.example.com', certificate_id: 'existing-cert-99999' }],
      };

      await updateBucketResource(mockContext, bucket, initialState);

      expect(mockSslOperations.uploadCertificate).not.toHaveBeenCalled();
      expect(mockSslOperations.deployCertificateInstance).toHaveBeenCalledWith(
        'existing-cert-99999',
        'cos',
        ['ap-guangzhou|test-bucket|cdn.example.com'],
      );
    });

    it('should not deploy certificate on update without domain_certificate', async () => {
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfo);
      mockCosOperations.bindCustomDomain.mockResolvedValue({
        cname: 'test-bucket.cos.ap-guangzhou.myqcloud.com',
      });

      const bucket = {
        key: 'test_bucket',
        name: 'test-bucket',
        website: {
          index: 'index.html',
          code: './dist',
        },
        domains: [{ domain_name: 'cdn.example.com' }],
      };

      await updateBucketResource(mockContext, bucket, initialState);

      expect(mockSslOperations.uploadCertificate).not.toHaveBeenCalled();
      expect(mockSslOperations.deployCertificateInstance).not.toHaveBeenCalled();
    });
  });

  describe('deleteBucketResource', () => {
    it('should delete bucket and remove from state', async () => {
      const bucketName = 'test-bucket';
      const region = 'ap-guangzhou';
      const logicalId = 'buckets.test_bucket';
      const stateWithBucket: StateFile = {
        ...initialState,
        resources: {
          [logicalId]: {
            mode: 'managed',
            region: 'ap-guangzhou',
            definition: {},
            instances: [],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      mockCosOperations.deleteBucket.mockResolvedValue(undefined);
      mockedStateManager.removeResource.mockReturnValue(initialState);

      const result = await deleteBucketResource(
        mockContext,
        bucketName,
        region,
        logicalId,
        stateWithBucket,
      );

      expect(mockCosOperations.deleteBucket).toHaveBeenCalledWith(bucketName, region);
      expect(mockedStateManager.removeResource).toHaveBeenCalledWith(stateWithBucket, logicalId);
      expect(result).toEqual(initialState);
    });

    it('should handle NoSuchBucket gracefully and remove state', async () => {
      const bucketName = 'test-bucket';
      const region = 'ap-guangzhou';
      const logicalId = 'buckets.test_bucket';
      const stateWithBucket: StateFile = {
        ...initialState,
        resources: {
          [logicalId]: {
            mode: 'managed',
            region: 'ap-guangzhou',
            definition: {},
            instances: [],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      const noSuchBucketError = Object.assign(new Error('NoSuchBucket'), {
        code: 'NoSuchBucket',
      });
      mockCosOperations.deleteBucket.mockRejectedValue(noSuchBucketError);
      mockedStateManager.removeResource.mockReturnValue(initialState);

      const result = await deleteBucketResource(
        mockContext,
        bucketName,
        region,
        logicalId,
        stateWithBucket,
      );

      expect(mockCosOperations.deleteBucket).toHaveBeenCalledWith(bucketName, region);
      expect(mockedLogger.warn).toHaveBeenCalledWith(
        expect.stringContaining('Bucket test-bucket not found in provider'),
      );
      expect(mockedStateManager.removeResource).toHaveBeenCalledWith(stateWithBucket, logicalId);
      expect(result).toEqual(initialState);
    });

    it('should handle 404 statusCode gracefully and remove state', async () => {
      const bucketName = 'test-bucket';
      const region = 'ap-guangzhou';
      const logicalId = 'buckets.test_bucket';
      const stateWithBucket: StateFile = {
        ...initialState,
        resources: {
          [logicalId]: {
            mode: 'managed',
            region: 'ap-guangzhou',
            definition: {},
            instances: [],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      const notFoundError = Object.assign(new Error('Not Found'), {
        statusCode: 404,
      });
      mockCosOperations.deleteBucket.mockRejectedValue(notFoundError);
      mockedStateManager.removeResource.mockReturnValue(initialState);

      const result = await deleteBucketResource(
        mockContext,
        bucketName,
        region,
        logicalId,
        stateWithBucket,
      );

      expect(mockCosOperations.deleteBucket).toHaveBeenCalledWith(bucketName, region);
      expect(mockedLogger.warn).toHaveBeenCalledWith(
        expect.stringContaining('Bucket test-bucket not found in provider'),
      );
      expect(mockedStateManager.removeResource).toHaveBeenCalledWith(stateWithBucket, logicalId);
      expect(result).toEqual(initialState);
    });

    it('should rethrow unexpected errors from deleteBucket', async () => {
      const bucketName = 'test-bucket';
      const region = 'ap-guangzhou';
      const logicalId = 'buckets.test_bucket';
      const error = new Error('Delete failed');

      mockCosOperations.deleteBucket.mockRejectedValue(error);

      await expect(
        deleteBucketResource(mockContext, bucketName, region, logicalId, initialState),
      ).rejects.toThrow('Delete failed');
    });

    it('should propagate sub-delete policy errors and keep state', async () => {
      const bucketName = 'test-bucket';
      const region = 'ap-guangzhou';
      const logicalId = 'buckets.test_bucket';
      const stateWithBucket: StateFile = {
        ...initialState,
        resources: {
          [logicalId]: {
            mode: 'managed',
            region: 'ap-guangzhou',
            definition: {},
            instances: [],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      const policyError = new Error('Policy delete failed');
      mockCosOperations.deleteBucketPolicy.mockRejectedValue(policyError);

      await expect(
        deleteBucketResource(mockContext, bucketName, region, logicalId, stateWithBucket),
      ).rejects.toThrow('Policy delete failed');
      expect(mockCosOperations.deleteBucket).not.toHaveBeenCalled();
      expect(mockedStateManager.removeResource).not.toHaveBeenCalled();
      mockCosOperations.deleteBucketPolicy.mockReset();
    });

    it('should delete DNS CNAME record when bucket has custom domain', async () => {
      const bucketName = 'test-bucket';
      const region = 'ap-guangzhou';
      const logicalId = 'buckets.test_bucket';
      const stateWithDns: StateFile = {
        ...initialState,
        resources: {
          [logicalId]: {
            mode: 'managed',
            region: 'ap-guangzhou',
            definition: {},
            instances: [
              { sid: 'cos-sid', id: bucketName, type: 'COS_BUCKET' },
              {
                sid: 'dns-sid',
                id: 'dns-record-123',
                type: 'TENCENT_COS_DNS_CNAME',
                domain: 'example.com',
                cname: `${bucketName}.cos.${region}.myqcloud.com`,
                dnsRecordId: 'dns-record-123',
              },
            ],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      mockCosOperations.unbindCustomDomain.mockResolvedValue(undefined);
      mockCosOperations.deleteBucket.mockResolvedValue(undefined);
      mockedStateManager.removeResource.mockReturnValue(initialState);

      const result = await deleteBucketResource(
        mockContext,
        bucketName,
        region,
        logicalId,
        stateWithDns,
      );

      expect(mockCosOperations.unbindCustomDomain).toHaveBeenCalledWith(
        bucketName,
        'example.com',
        'dns-record-123',
      );
      expect(mockCosOperations.deleteBucket).toHaveBeenCalledWith(bucketName, region);
      expect(mockedStateManager.removeResource).toHaveBeenCalledWith(stateWithDns, logicalId);
      expect(result).toEqual(initialState);
    });

    it('should not fail when DNS record ID is missing', async () => {
      const bucketName = 'test-bucket';
      const region = 'ap-guangzhou';
      const logicalId = 'buckets.test_bucket';
      const stateWithoutDnsRecordId: StateFile = {
        ...initialState,
        resources: {
          [logicalId]: {
            mode: 'managed',
            region: 'ap-guangzhou',
            definition: {},
            instances: [
              { sid: 'cos-sid', id: bucketName, type: 'COS_BUCKET' },
              {
                sid: 'dns-sid',
                id: 'existing',
                type: 'TENCENT_COS_DNS_CNAME',
                domain: 'example.com',
                cname: `${bucketName}.cos.${region}.myqcloud.com`,
              },
            ],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      mockCosOperations.deleteBucket.mockResolvedValue(undefined);
      mockedStateManager.removeResource.mockReturnValue(initialState);

      const result = await deleteBucketResource(
        mockContext,
        bucketName,
        region,
        logicalId,
        stateWithoutDnsRecordId,
      );

      expect(mockCosOperations.unbindCustomDomain).toHaveBeenCalledWith(
        bucketName,
        'example.com',
        undefined,
      );
      expect(mockCosOperations.deleteBucket).toHaveBeenCalledWith(bucketName, region);
      expect(result).toEqual(initialState);
    });
  });

  describe('buildCosInstanceFromProvider', () => {
    it('should handle undefined optional fields in grants grantee', async () => {
      const bucketInfo = {
        Name: 'test-bucket',
        Location: 'ap-guangzhou',
        CreationDate: '2024-01-01',
        AccessControlPolicy: {
          owner: { id: 'owner-1', displayName: 'Owner' },
          grants: [
            {
              grantee: {
                type: undefined,
                uri: undefined,
                id: undefined,
                displayName: undefined,
              },
              permission: undefined,
            },
          ],
        },
      };

      mockCosOperations.getBucket.mockResolvedValue(bucketInfo);

      await updateBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
        },
        initialState,
      );

      const state = mockedStateManager.setResource.mock.calls[0][2] as Record<string, unknown>;
      const cosInstance = (state.instances as Array<Record<string, unknown>>)[0];

      expect((cosInstance.accessControlPolicy as Record<string, unknown>).grants).toEqual([
        {
          grantee: {
            type: null,
            uri: null,
            id: null,
            displayName: null,
          },
          permission: null,
        },
      ]);
    });

    it('should handle undefined optional fields in owner', async () => {
      const bucketInfo = {
        Name: 'test-bucket',
        Location: 'ap-guangzhou',
        CreationDate: '2024-01-01',
        AccessControlPolicy: {
          owner: {
            id: undefined,
            displayName: undefined,
          },
          grants: [],
        },
      };

      mockCosOperations.getBucket.mockResolvedValue(bucketInfo);

      await updateBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
        },
        initialState,
      );

      const state = mockedStateManager.setResource.mock.calls[0][2] as Record<string, unknown>;
      const cosInstance = (state.instances as Array<Record<string, unknown>>)[0];

      expect((cosInstance.accessControlPolicy as Record<string, unknown>).owner).toEqual({
        id: null,
        displayName: null,
      });
    });

    it('should handle undefined optional fields in CorsConfiguration', async () => {
      const bucketInfo = {
        Name: 'test-bucket',
        Location: 'ap-guangzhou',
        CreationDate: '2024-01-01',
        CorsConfiguration: [
          {
            id: undefined,
            allowedOrigins: undefined,
            allowedMethods: undefined,
            allowedHeaders: undefined,
            exposeHeaders: undefined,
            maxAgeSeconds: undefined,
          },
        ],
      };

      mockCosOperations.getBucket.mockResolvedValue(bucketInfo);

      await updateBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
        },
        initialState,
      );

      const state = mockedStateManager.setResource.mock.calls[0][2] as Record<string, unknown>;
      const cosInstance = (state.instances as Array<Record<string, unknown>>)[0];

      expect(cosInstance.corsConfiguration).toEqual([
        {
          id: null,
          allowedOrigins: [],
          allowedMethods: [],
          allowedHeaders: [],
          exposeHeaders: [],
          maxAgeSeconds: null,
        },
      ]);
    });

    it('should handle undefined optional fields in VersioningConfiguration', async () => {
      const bucketInfo = {
        Name: 'test-bucket',
        Location: 'ap-guangzhou',
        CreationDate: '2024-01-01',
        VersioningConfiguration: {
          status: undefined,
        },
      };

      mockCosOperations.getBucket.mockResolvedValue(bucketInfo);

      await updateBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
        },
        initialState,
      );

      const state = mockedStateManager.setResource.mock.calls[0][2] as Record<string, unknown>;
      const cosInstance = (state.instances as Array<Record<string, unknown>>)[0];

      expect(cosInstance.versioningConfiguration).toEqual({
        status: null,
      });
    });

    it('should handle undefined optional fields in TaggingConfiguration tags', async () => {
      const bucketInfo = {
        Name: 'test-bucket',
        Location: 'ap-guangzhou',
        CreationDate: '2024-01-01',
        TaggingConfiguration: {
          tags: [
            {
              key: undefined,
              value: undefined,
            },
          ],
        },
      };

      mockCosOperations.getBucket.mockResolvedValue(bucketInfo);

      await updateBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
        },
        initialState,
      );

      const state = mockedStateManager.setResource.mock.calls[0][2] as Record<string, unknown>;
      const cosInstance = (state.instances as Array<Record<string, unknown>>)[0];

      expect((cosInstance.taggingConfiguration as Record<string, unknown>).tags).toEqual([
        {
          key: null,
          value: null,
        },
      ]);
    });

    it('should retain the full detail set in the state instance', async () => {
      const bucketInfo = {
        Name: 'test-bucket',
        Location: 'ap-guangzhou',
        CreationDate: '2024-01-01T00:00:00Z',
        ACL: 'private',
        Tags: [{ Key: 'env', Value: 'prod' }],
        LifecycleConfiguration: {
          rules: [
            {
              id: 'rule-1',
              status: 'Enabled',
              prefix: 'logs/',
              expiration: { days: 30, date: undefined, expiredObjectDeleteMarker: undefined },
              transition: { days: 7, date: undefined, storageClass: 'STANDARD_IA' },
            },
          ],
        },
        LoggingConfiguration: {
          targetBucket: 'log-bucket',
          targetPrefix: 'logs/',
        },
        ReplicationConfiguration: {
          role: 'qcs::cam::uin/1:uin/2',
          rules: [
            {
              id: 'repl-1',
              status: 'Enabled',
              prefix: 'src/',
              destination: { bucket: 'dst-bucket', storageClass: 'STANDARD' },
            },
          ],
        },
        SseConfiguration: {
          sseAlgorithm: 'AES256',
          sseKmsMasterKeyId: undefined,
        },
        Policy: { version: '2.0', statement: [] },
      };

      mockCosOperations.getBucket.mockResolvedValue(bucketInfo);

      await updateBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
        },
        initialState,
      );

      const state = mockedStateManager.setResource.mock.calls[0][2] as Record<string, unknown>;
      const cosInstance = (state.instances as Array<Record<string, unknown>>)[0];

      expect(cosInstance).toEqual(
        expect.objectContaining({
          id: 'test-bucket',
          creationDate: '2024-01-01T00:00:00Z',
          tags: [{ key: 'env', value: 'prod' }],
          lifecycleConfiguration: {
            rules: [
              {
                id: 'rule-1',
                status: 'Enabled',
                prefix: 'logs/',
                expiration: { days: 30, date: null, expiredObjectDeleteMarker: null },
                transition: { days: 7, date: null, storageClass: 'STANDARD_IA' },
              },
            ],
          },
          loggingConfiguration: {
            targetBucket: 'log-bucket',
            targetPrefix: 'logs/',
          },
          replicationConfiguration: {
            role: 'qcs::cam::uin/1:uin/2',
            rules: [
              {
                id: 'repl-1',
                status: 'Enabled',
                prefix: 'src/',
                destination: { bucket: 'dst-bucket', storageClass: 'STANDARD' },
              },
            ],
          },
          sseConfiguration: {
            sseAlgorithm: 'AES256',
            sseKmsMasterKeyId: null,
          },
          policy: { version: '2.0', statement: [] },
        }),
      );
    });
  });

  describe('readBucketResource', () => {
    it('should read bucket from provider', async () => {
      mockCosOperations.getBucket.mockResolvedValue({ Name: 'test-bucket' });

      const result = await readBucketResource(mockContext, 'test-bucket', 'ap-guangzhou');

      expect(mockCosOperations.getBucket).toHaveBeenCalledWith('test-bucket', 'ap-guangzhou');
      expect(result).toEqual({ Name: 'test-bucket' });
    });
  });

  describe('createBucketResource - domain management', () => {
    const mockBucketInfoBase = {
      Name: 'test-bucket',
      Location: 'ap-guangzhou',
      CreationDate: '2024-01-01',
      ACL: 'private',
      Tags: [{ Key: 'si-owned-by', Value: 'test-app-test-service:buckets.test_bucket' }],
    };

    it('should throw when getBucket returns null after create', async () => {
      mockCosOperations.createBucket.mockResolvedValue(undefined);
      mockCosOperations.getBucket.mockResolvedValue(null);

      await expect(
        createBucketResource(
          mockContext,
          {
            key: 'test_bucket',
            name: 'test-bucket',
            website: {
              index: 'index.html',
              code: './dist',
            },
          },
          initialState,
        ),
      ).rejects.toThrow('Failed to refresh state for bucket');
    });

    it('should create bucket with multiple explicit domain bindings', async () => {
      mockCosOperations.createBucket.mockResolvedValue(undefined);
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfoBase);
      mockCosOperations.bindCustomDomain.mockResolvedValue({
        cname: 'test-bucket.cos.ap-guangzhou.myqcloud.com',
        dnsRecordId: 'dns-primary',
        bucketDomainBound: true,
      });

      await createBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
          website: {
            index: 'index.html',
            code: './dist',
          },
          domains: [{ domain_name: 'example.com' }, { domain_name: 'www.example.com' }],
        },
        initialState,
      );

      expect(mockCosOperations.bindCustomDomain).toHaveBeenCalledTimes(2);
      expect(mockCosOperations.bindCustomDomain).toHaveBeenCalledWith('test-bucket', 'example.com');
      expect(mockCosOperations.bindCustomDomain).toHaveBeenCalledWith(
        'test-bucket',
        'www.example.com',
      );
    });

    it('should deploy per-binding certificate on each bound domain', async () => {
      mockCosOperations.createBucket.mockResolvedValue(undefined);
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfoBase);
      mockCosOperations.bindCustomDomain
        .mockResolvedValueOnce({
          cname: 'test-bucket.cos.ap-guangzhou.myqcloud.com',
          dnsRecordId: 'dns-primary',
          bucketDomainBound: true,
        })
        .mockResolvedValueOnce({
          cname: 'test-bucket.cos.ap-guangzhou.myqcloud.com',
          dnsRecordId: 'dns-www',
          bucketDomainBound: true,
        });
      mockSslOperations.uploadCertificate.mockResolvedValue({
        certificateId: 'ssl-cert-001',
        alias: 'my-cert',
      });
      mockSslOperations.deployCertificateInstance.mockResolvedValue({
        deployRecordId: 42,
      });

      await createBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
          website: {
            index: 'index.html',
            code: './dist',
          },
          domains: [
            {
              domain_name: 'example.com',
              certificate_body: 'CERT-BODY',
              certificate_private_key: 'CERT-KEY',
            },
            {
              domain_name: 'www.example.com',
              certificate_body: 'CERT-BODY',
              certificate_private_key: 'CERT-KEY',
            },
          ],
        },
        initialState,
      );

      expect(mockSslOperations.deployCertificateInstance).toHaveBeenCalledTimes(2);
      expect(mockSslOperations.deployCertificateInstance).toHaveBeenCalledWith(
        'ssl-cert-001',
        'cos',
        ['ap-guangzhou|test-bucket|example.com'],
      );
      expect(mockSslOperations.deployCertificateInstance).toHaveBeenCalledWith(
        'ssl-cert-001',
        'cos',
        ['ap-guangzhou|test-bucket|www.example.com'],
      );
    });

    it('should not deploy cert on a binding whose bucketDomainBound is false', async () => {
      mockCosOperations.createBucket.mockResolvedValue(undefined);
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfoBase);
      mockCosOperations.bindCustomDomain
        .mockResolvedValueOnce({
          cname: 'test-bucket.cos.ap-guangzhou.myqcloud.com',
          dnsRecordId: 'dns-primary',
          bucketDomainBound: true,
        })
        .mockResolvedValueOnce({
          cname: 'test-bucket.cos.ap-guangzhou.myqcloud.com',
          dnsRecordId: 'dns-www',
          bucketDomainBound: false,
        });
      mockSslOperations.uploadCertificate.mockResolvedValue({
        certificateId: 'ssl-cert-001',
        alias: 'my-cert',
      });
      mockSslOperations.deployCertificateInstance.mockResolvedValue({
        deployRecordId: 42,
      });

      await createBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
          website: {
            index: 'index.html',
            code: './dist',
          },
          domains: [
            {
              domain_name: 'example.com',
              certificate_body: 'CERT-BODY',
              certificate_private_key: 'CERT-KEY',
            },
            {
              domain_name: 'www.example.com',
              certificate_body: 'CERT-BODY',
              certificate_private_key: 'CERT-KEY',
            },
          ],
        },
        initialState,
      );

      expect(mockSslOperations.deployCertificateInstance).toHaveBeenCalledTimes(1);
      expect(mockSslOperations.deployCertificateInstance).toHaveBeenCalledWith(
        'ssl-cert-001',
        'cos',
        ['ap-guangzhou|test-bucket|example.com'],
      );
    });

    it('should handle second binding cnameInfo returning null', async () => {
      mockCosOperations.createBucket.mockResolvedValue(undefined);
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfoBase);
      mockCosOperations.bindCustomDomain
        .mockResolvedValueOnce({
          cname: 'test-bucket.cos.ap-guangzhou.myqcloud.com',
          dnsRecordId: 'dns-primary',
          bucketDomainBound: true,
        })
        .mockResolvedValueOnce(null);

      await createBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
          website: {
            index: 'index.html',
            code: './dist',
          },
          domains: [{ domain_name: 'example.com' }, { domain_name: 'www.example.com' }],
        },
        initialState,
      );

      expect(mockCosOperations.bindCustomDomain).toHaveBeenCalledTimes(2);
    });

    it('should refresh bucket info after binding', async () => {
      mockCosOperations.createBucket.mockResolvedValue(undefined);
      mockCosOperations.getBucket
        .mockResolvedValueOnce(mockBucketInfoBase)
        .mockResolvedValueOnce({ ...mockBucketInfoBase, ACL: 'public-read' });
      mockCosOperations.bindCustomDomain.mockResolvedValue({
        cname: 'test-bucket.cos.ap-guangzhou.myqcloud.com',
        dnsRecordId: 'dns-123',
        bucketDomainBound: true,
      });

      await createBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
          website: {
            index: 'index.html',
            code: './dist',
          },
          domains: [{ domain_name: 'cdn.example.com' }],
        },
        initialState,
      );

      expect(mockCosOperations.getBucket).toHaveBeenCalledTimes(2);
    });

    it('should handle refreshedInfo returning null in create', async () => {
      mockCosOperations.createBucket.mockResolvedValue(undefined);
      mockCosOperations.getBucket
        .mockResolvedValueOnce(mockBucketInfoBase)
        .mockResolvedValueOnce(null);
      mockCosOperations.bindCustomDomain.mockResolvedValue({
        cname: 'test-bucket.cos.ap-guangzhou.myqcloud.com',
        dnsRecordId: 'dns-123',
        bucketDomainBound: true,
      });

      await createBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
          website: {
            index: 'index.html',
            code: './dist',
          },
          domains: [{ domain_name: 'cdn.example.com' }],
        },
        initialState,
      );

      expect(mockCosOperations.getBucket).toHaveBeenCalledTimes(2);
      expect(mockedStateManager.setResource).toHaveBeenCalled();
    });

    it('should handle cnameInfo returning null', async () => {
      mockCosOperations.createBucket.mockResolvedValue(undefined);
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfoBase);
      mockCosOperations.bindCustomDomain.mockResolvedValue(null);

      await createBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
          website: {
            index: 'index.html',
            code: './dist',
          },
          domains: [{ domain_name: 'cdn.example.com' }],
        },
        initialState,
      );

      expect(mockCosOperations.bindCustomDomain).toHaveBeenCalled();
      expect(mockSslOperations.deployCertificateInstance).not.toHaveBeenCalled();
    });

    it('should reject bucket-level accelerate on COS (capability not supported)', async () => {
      mockCosOperations.createBucket.mockResolvedValue(undefined);
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfoBase);

      await expect(
        createBucketResource(
          mockContext,
          {
            key: 'test_bucket',
            name: 'test-bucket',
            accelerate: true,
          },
          initialState,
        ),
      ).rejects.toThrow(/transfer acceleration/);
    });
  });

  describe('updateBucketResource - domain management', () => {
    const mockBucketInfoBase = {
      Name: 'test-bucket',
      Location: 'ap-guangzhou',
      CreationDate: '2024-01-01',
      ACL: 'private',
    };

    const stateWithDomain: StateFile = {
      ...initialState,
      resources: {
        'buckets.test_bucket': {
          mode: 'managed',
          region: 'ap-guangzhou',
          definition: {},
          instances: [
            {
              sid: 'tencent:cos:default:test-bucket',
              id: 'test-bucket',
              type: 'COS_BUCKET' as const,
            },
            {
              sid: 'tencent:dnspod:default:old.example.com',
              id: 'old.example.com',
              type: 'TENCENT_COS_DNS_CNAME' as const,
              domain: 'old.example.com',
              cname: 'test-bucket.cos.ap-guangzhou.myqcloud.com',
              dnsRecordId: 'dns-old',
            },
          ],
          lastUpdated: new Date().toISOString(),
        },
      },
    };

    it('should throw when getBucket returns null in update', async () => {
      mockCosOperations.getBucket.mockResolvedValue(null);

      await expect(
        updateBucketResource(
          mockContext,
          {
            key: 'test_bucket',
            name: 'test-bucket',
            website: {
              index: 'index.html',
              code: './dist',
            },
          },
          initialState,
        ),
      ).rejects.toThrow('Failed to refresh state for bucket');
    });

    it('should converge a removed binding and bind the new one', async () => {
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfoBase);
      mockCosOperations.unbindCustomDomain.mockResolvedValue(undefined);
      mockCosOperations.bindCustomDomain.mockResolvedValue({
        cname: 'test-bucket.cos.ap-guangzhou.myqcloud.com',
        dnsRecordId: 'dns-new',
        bucketDomainBound: true,
      });

      await updateBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
          website: {
            index: 'index.html',
            code: './dist',
          },
          domains: [{ domain_name: 'new.example.com' }],
        },
        stateWithDomain,
      );

      expect(mockCosOperations.unbindCustomDomain).toHaveBeenCalledWith(
        'test-bucket',
        'old.example.com',
        'dns-old',
      );
      expect(mockCosOperations.bindCustomDomain).toHaveBeenCalledWith(
        'test-bucket',
        'new.example.com',
      );
    });

    it('should deploy per-binding certificate references in update', async () => {
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfoBase);
      mockCosOperations.bindCustomDomain
        .mockResolvedValueOnce({
          cname: 'test-bucket.cos.ap-guangzhou.myqcloud.com',
          dnsRecordId: 'dns-primary',
          bucketDomainBound: true,
        })
        .mockResolvedValueOnce({
          cname: 'test-bucket.cos.ap-guangzhou.myqcloud.com',
          dnsRecordId: 'dns-www',
          bucketDomainBound: true,
        });
      mockSslOperations.deployCertificateInstance.mockResolvedValue({ deployRecordId: 100 });

      await updateBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
          website: {
            index: 'index.html',
            code: './dist',
          },
          domains: [
            { domain_name: 'example.com', certificate_id: 'cert-ref-123' },
            { domain_name: 'www.example.com', certificate_id: 'cert-ref-123' },
          ],
        },
        initialState,
      );

      expect(mockCosOperations.bindCustomDomain).toHaveBeenCalledWith(
        'test-bucket',
        'www.example.com',
      );
      expect(mockSslOperations.deployCertificateInstance).toHaveBeenCalledTimes(2);
    });

    it('should migrate legacy www-variant state to explicit bindings without recreating', async () => {
      const stateWithWww: StateFile = {
        ...initialState,
        resources: {
          'buckets.test_bucket': {
            mode: 'managed',
            region: 'ap-guangzhou',
            definition: {},
            instances: [
              {
                sid: 'tencent:cos:default:test-bucket',
                id: 'test-bucket',
                type: 'COS_BUCKET' as const,
              },
              {
                sid: 'tencent:dnspod:default:example.com',
                id: 'example.com',
                type: 'TENCENT_COS_DNS_CNAME' as const,
                domain: 'example.com',
                cname: 'test-bucket.cos.ap-guangzhou.myqcloud.com',
                dnsRecordId: 'dns-primary',
              },
              {
                sid: 'tencent:dnspod:default:www.example.com',
                id: 'www.example.com',
                type: 'TENCENT_COS_DNS_CNAME' as const,
                domain: 'www.example.com',
                cname: 'test-bucket.cos.ap-guangzhou.myqcloud.com',
                dnsRecordId: 'dns-www',
                isWwwVariant: true,
              },
            ],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfoBase);
      mockCosOperations.unbindCustomDomain.mockResolvedValue(undefined);
      mockCosOperations.bindCustomDomain.mockResolvedValue({
        cname: 'test-bucket.cos.ap-guangzhou.myqcloud.com',
        dnsRecordId: 'dns-primary',
        bucketDomainBound: true,
      });

      await updateBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
          website: {
            index: 'index.html',
            code: './dist',
          },
          domains: [{ domain_name: 'example.com' }, { domain_name: 'www.example.com' }],
        },
        stateWithWww,
      );

      // Both bindings re-bound in place; nothing torn down.
      expect(mockCosOperations.bindCustomDomain).toHaveBeenCalledTimes(2);
      expect(mockCosOperations.unbindCustomDomain).not.toHaveBeenCalled();
    });

    it('unbinds DNS records recorded in state when the domain is removed', async () => {
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfoBase);
      mockCosOperations.unbindCustomDomain.mockResolvedValue(undefined);

      await updateBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
          website: {
            index: 'index.html',
            code: './dist',
          },
        },
        stateWithDomain,
      );

      expect(mockCosOperations.unbindCustomDomain).toHaveBeenCalledWith(
        'test-bucket',
        'old.example.com',
        'dns-old',
      );
    });

    it('should handle refreshedInfo returning null in update', async () => {
      mockCosOperations.getBucket
        .mockResolvedValueOnce(mockBucketInfoBase)
        .mockResolvedValueOnce(null);
      mockCosOperations.bindCustomDomain.mockResolvedValue({
        cname: 'test-bucket.cos.ap-guangzhou.myqcloud.com',
        dnsRecordId: 'dns-123',
        bucketDomainBound: true,
      });

      await updateBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
          website: {
            index: 'index.html',
            code: './dist',
          },
          domains: [{ domain_name: 'cdn.example.com' }],
        },
        initialState,
      );

      expect(mockCosOperations.getBucket).toHaveBeenCalledTimes(2);
      expect(mockedStateManager.setResource).toHaveBeenCalled();
    });

    it('should handle update with ACL but no websiteConfig', async () => {
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfoBase);

      await updateBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
          security: { acl: BucketAccessEnum.PUBLIC_READ, force_delete: false },
        },
        initialState,
      );

      expect(mockCosOperations.updateBucketAcl).toHaveBeenCalled();
    });
  });

  describe('per-binding certificate resolution', () => {
    it('should upload inline PEM certificate and deploy to the bound domain', async () => {
      mockCosOperations.createBucket.mockResolvedValue(undefined);
      mockCosOperations.getBucket.mockResolvedValue({
        Name: 'test-bucket',
        Location: 'ap-guangzhou',
        CreationDate: '2024-01-01',
        Tags: [{ Key: 'si-owned-by', Value: 'test-app-test-service:buckets.test_bucket' }],
      });
      mockCosOperations.bindCustomDomain.mockResolvedValue({
        cname: 'test-bucket.cos.ap-guangzhou.myqcloud.com',
        dnsRecordId: 'dns-1',
        bucketDomainBound: true,
      });
      mockSslOperations.uploadCertificate.mockResolvedValue({
        certificateId: 'ssl-cert-002',
        alias: 'example_com',
      });
      mockSslOperations.deployCertificateInstance.mockResolvedValue({ deployRecordId: 7 });

      await createBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
          domains: [
            {
              domain_name: 'example.com',
              certificate_body: 'CERT-BODY',
              certificate_private_key: 'CERT-KEY',
            },
          ],
        },
        initialState,
      );

      expect(mockSslOperations.uploadCertificate).toHaveBeenCalledWith(
        'example_com',
        'CERT-BODY',
        'CERT-KEY',
      );
      expect(mockSslOperations.deployCertificateInstance).toHaveBeenCalledWith(
        'ssl-cert-002',
        'cos',
        ['ap-guangzhou|test-bucket|example.com'],
      );
    });

    it('should deploy certificate_id references without uploading', async () => {
      mockCosOperations.createBucket.mockResolvedValue(undefined);
      mockCosOperations.getBucket.mockResolvedValue({
        Name: 'test-bucket',
        Location: 'ap-guangzhou',
        CreationDate: '2024-01-01',
        Tags: [{ Key: 'si-owned-by', Value: 'test-app-test-service:buckets.test_bucket' }],
      });
      mockCosOperations.bindCustomDomain.mockResolvedValue({
        cname: 'test-bucket.cos.ap-guangzhou.myqcloud.com',
        dnsRecordId: 'dns-1',
        bucketDomainBound: true,
      });
      mockSslOperations.deployCertificateInstance.mockResolvedValue({ deployRecordId: 8 });

      await createBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
          domains: [{ domain_name: 'example.com', certificate_id: 'cert-id-999' }],
        },
        initialState,
      );

      expect(mockSslOperations.uploadCertificate).not.toHaveBeenCalled();
      expect(mockSslOperations.deployCertificateInstance).toHaveBeenCalledWith(
        'cert-id-999',
        'cos',
        ['ap-guangzhou|test-bucket|example.com'],
      );
    });

    it('should skip ssl operations for bindings without certificate config', async () => {
      mockCosOperations.createBucket.mockResolvedValue(undefined);
      mockCosOperations.getBucket.mockResolvedValue({
        Name: 'test-bucket',
        Location: 'ap-guangzhou',
        Tags: [{ Key: 'si-owned-by', Value: 'test-app-test-service:buckets.test_bucket' }],
      });

      await createBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
        },
        initialState,
      );

      expect(mockCosOperations.bindCustomDomain).not.toHaveBeenCalled();
      expect(mockSslOperations.deployCertificateInstance).not.toHaveBeenCalled();
    });
  });

  describe('createBucketResource - IAM policy', () => {
    const mockBucketInfoBase = {
      Name: 'test-bucket',
      Location: 'ap-guangzhou',
      CreationDate: '2024-01-01',
      ACL: 'private',
      Tags: [{ Key: 'si-owned-by', Value: 'test-app-test-service:buckets.test_bucket' }],
    };

    it('should apply bucket policy when iam is configured', async () => {
      mockCosOperations.createBucket.mockResolvedValue(undefined);
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfoBase);
      mockCosOperations.putBucketPolicy.mockResolvedValue(undefined);

      const bucket = {
        key: 'test_bucket',
        name: 'test-bucket',
        iam: {
          resource: {
            statements: [
              {
                effect: 'Allow' as const,
                principal: { Service: 'cos.tencentcloud.com' },
                action: ['cos:GetObject'],
                resource: ['qcs::cos:ap-guangzhou:uid/123:test-bucket/*'],
              },
            ],
          },
        },
      };

      await createBucketResource(mockContext, bucket as BucketDomain, initialState);

      expect(mockCosOperations.putBucketPolicy).toHaveBeenCalledWith(
        'test-bucket',
        'ap-guangzhou',
        expect.objectContaining({
          version: '2.0',
          statement: expect.arrayContaining([
            expect.objectContaining({
              effect: 'allow',
              action: ['cos:GetObject'],
            }),
          ]),
        }),
      );
    });

    it('should delete bucket policy when iam has empty statements', async () => {
      mockCosOperations.createBucket.mockResolvedValue(undefined);
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfoBase);
      mockCosOperations.deleteBucketPolicy.mockResolvedValue(undefined);

      const bucket = {
        key: 'test_bucket',
        name: 'test-bucket',
        iam: {
          resource: {
            statements: [],
          },
        },
      };

      await createBucketResource(mockContext, bucket as BucketDomain, initialState);

      expect(mockCosOperations.deleteBucketPolicy).toHaveBeenCalledWith(
        'test-bucket',
        'ap-guangzhou',
      );
    });

    it('should not call policy functions when iam is not configured', async () => {
      mockCosOperations.createBucket.mockResolvedValue(undefined);
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfoBase);

      const bucket = {
        key: 'test_bucket',
        name: 'test-bucket',
      };

      await createBucketResource(mockContext, bucket as BucketDomain, initialState);

      expect(mockCosOperations.putBucketPolicy).not.toHaveBeenCalled();
      expect(mockCosOperations.deleteBucketPolicy).not.toHaveBeenCalled();
    });
  });

  describe('updateBucketResource - IAM policy', () => {
    const mockBucketInfoBase = {
      Name: 'test-bucket',
      Location: 'ap-guangzhou',
      CreationDate: '2024-01-01',
      ACL: 'private',
    };

    const stateWithPolicy: StateFile = {
      ...initialState,
      resources: {
        'buckets.test_bucket': {
          mode: 'managed',
          region: 'ap-guangzhou',
          definition: {
            bucketName: 'test-bucket',
            policy: JSON.stringify({
              resource: {
                statements: [
                  {
                    effect: 'Allow',
                    action: ['cos:GetObject'],
                    resource: ['*'],
                    principal: { Service: 'cos' },
                  },
                ],
              },
            }),
          },
          instances: [{ sid: 'cos-sid', id: 'test-bucket', type: 'COS_BUCKET' }],
          lastUpdated: new Date().toISOString(),
        },
      },
    };

    it('should apply updated policy when iam changes', async () => {
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfoBase);
      mockCosOperations.putBucketPolicy.mockResolvedValue(undefined);

      const bucket = {
        key: 'test_bucket',
        name: 'test-bucket',
        iam: {
          resource: {
            statements: [
              {
                effect: 'Allow' as const,
                principal: { Service: 'cos.tencentcloud.com' },
                action: ['cos:GetObject', 'cos:PutObject'],
                resource: ['qcs::cos:ap-guangzhou:uid/123:test-bucket/*'],
              },
            ],
          },
        },
      };

      await updateBucketResource(mockContext, bucket as BucketDomain, stateWithPolicy);

      expect(mockCosOperations.putBucketPolicy).toHaveBeenCalledWith(
        'test-bucket',
        'ap-guangzhou',
        expect.objectContaining({ version: '2.0' }),
      );
    });

    it('clears a policy only when the statement list is explicitly empty', async () => {
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfoBase);
      mockCosOperations.deleteBucketPolicy.mockResolvedValue(undefined);

      const bucket = {
        iam: { resource: { statements: [] } },
        key: 'test_bucket',
        name: 'test-bucket',
      };

      await updateBucketResource(mockContext, bucket as BucketDomain, stateWithPolicy);

      expect(mockCosOperations.deleteBucketPolicy).toHaveBeenCalledWith(
        'test-bucket',
        'ap-guangzhou',
      );
    });

    it('reapplies a declared policy during a selected repair even when saved intent is unchanged', async () => {
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfoBase);

      const existingIam = {
        resource: {
          statements: [
            {
              effect: 'Allow' as const,
              principal: { Service: 'cos' },
              action: ['cos:GetObject'],
              resource: ['*'],
            },
          ],
        },
      };

      const stateWithMatchingPolicy: StateFile = {
        ...initialState,
        resources: {
          'buckets.test_bucket': {
            mode: 'managed',
            region: 'ap-guangzhou',
            definition: {
              bucketName: 'test-bucket',
              policy: JSON.stringify(existingIam),
            },
            instances: [{ sid: 'cos-sid', id: 'test-bucket', type: 'COS_BUCKET' }],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      await updateBucketResource(
        mockContext,
        { key: 'test_bucket', name: 'test-bucket', iam: existingIam } as BucketDomain,
        stateWithMatchingPolicy,
      );

      expect(mockCosOperations.putBucketPolicy).toHaveBeenCalled();
      expect(mockCosOperations.deleteBucketPolicy).not.toHaveBeenCalled();
    });
  });

  describe('deleteBucketResource - IAM policy cleanup', () => {
    it('should delete bucket policy when deleting bucket', async () => {
      const bucketName = 'test-bucket';
      const region = 'ap-guangzhou';
      const logicalId = 'buckets.test_bucket';
      const stateWithBucket: StateFile = {
        ...initialState,
        resources: {
          [logicalId]: {
            mode: 'managed',
            region: 'ap-guangzhou',
            definition: {},
            instances: [],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      mockCosOperations.deleteBucketPolicy.mockResolvedValue(undefined);
      mockCosOperations.deleteBucket.mockResolvedValue(undefined);
      mockedStateManager.removeResource.mockReturnValue(initialState);

      await deleteBucketResource(mockContext, bucketName, region, logicalId, stateWithBucket);

      expect(mockCosOperations.deleteBucketPolicy).toHaveBeenCalledWith(bucketName, region);
    });
  });

  describe('CDN delivery bindings (issue #283)', () => {
    const CDN_HOST = 'cdn.example.com';
    const CDN_CNAME = 'cdn.example.com.cdn.dnsv1.com';
    const COS_ENDPOINT = 'test-bucket.cos.ap-guangzhou.myqcloud.com';

    const cdnBinding: BucketDomainBinding = {
      domain_name: CDN_HOST,
      certificate_id: 'cert-ref-1',
      cdn: {
        enabled: true,
        cdn_type: 'web',
        scope: 'global',
        cache_ttl: 3600,
        force_redirect_https: true,
      },
    };

    const cdnOptions = cdnBinding.cdn as CdnConfig;

    const cdnInstances = [
      {
        sid: 'si:tencent:cos:default:test-bucket',
        id: 'test-bucket',
        type: 'COS_BUCKET',
        bucket: 'test-bucket',
      },
      {
        sid: 'si:tencent:cdn:default:cdn.example.com',
        id: CDN_HOST,
        type: 'TENCENT_CDN_DOMAIN',
        domainName: CDN_HOST,
      },
      {
        sid: 'si:tencent:dnspod:default:rec-1',
        id: 'rec-1',
        type: 'TENCENT_CDN_DNS_CNAME',
        domain: CDN_HOST,
        cname: CDN_CNAME,
        dnsRecordId: 'rec-1',
      },
    ];

    beforeEach(() => {
      mockCosOperations.getCosEndpoint.mockImplementation(
        (bucket: string) => `${bucket}.cos.ap-guangzhou.myqcloud.com`,
      );
      mockCdnOperations.describeCdnDomain.mockResolvedValue({
        domainName: CDN_HOST,
        cname: CDN_CNAME,
        status: 'online',
        origin: { originType: 'cos', origins: [COS_ENDPOINT], serverName: COS_ENDPOINT },
      });
      mockCosOperations.bindCustomDomain.mockResolvedValue({
        domain: CDN_HOST,
        cname: COS_ENDPOINT,
        bucketDomainBound: true,
      });
      mockDnsOperations.addDomainRecord.mockResolvedValue('rec-1');
    });

    it('creates a CDN binding with COS origin, mapped scope, certificate and CDN CNAME', async () => {
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfo);

      await createBucketResource(
        mockContext,
        { key: 'test_bucket', name: 'test-bucket', domains: [cdnBinding] },
        initialState,
      );

      expect(mockCdnOperations.addCdnDomain).toHaveBeenCalledWith({
        domainName: CDN_HOST,
        serviceType: 'web',
        area: 'global',
        origin: {
          originType: 'cos',
          origins: [COS_ENDPOINT],
          serverName: COS_ENDPOINT,
        },
      });
      expect(mockCdnOperations.applyCacheConfig).toHaveBeenCalledWith(CDN_HOST, 3600, undefined);
      expect(mockCdnOperations.applyHttpsRedirect).toHaveBeenCalledWith(CDN_HOST, true);
      expect(mockSslOperations.deployCertificateInstance).toHaveBeenCalledWith(
        'cert-ref-1',
        'cdn',
        [CDN_HOST],
      );
      expect(mockCdnOperations.enableHttps).toHaveBeenCalledWith(CDN_HOST);
      expect(mockDnsOperations.addDomainRecord).toHaveBeenCalledWith({
        domainName: 'example.com',
        rr: 'cdn',
        type: 'CNAME',
        value: CDN_CNAME,
        ttl: 600,
      });
      // The delivery record replaces the bucket-side record for CDN bindings.
      expect(mockCosOperations.bindCustomDomain).toHaveBeenCalledWith('test-bucket', CDN_HOST, {
        skipDns: true,
      });
    });

    it('continues as an update when the CDN domain already exists (partial-failure retry)', async () => {
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfo);
      mockCdnOperations.addCdnDomain.mockRejectedValue({ code: 'ResourceExists' });

      await createBucketResource(
        mockContext,
        { key: 'test_bucket', name: 'test-bucket', domains: [cdnBinding] },
        initialState,
      );

      expect(mockCdnOperations.describeCdnDomain).toHaveBeenCalledWith(CDN_HOST);
      expect(mockCdnOperations.applyCacheConfig).toHaveBeenCalled();
    });

    it('refuses to adopt an existing CDN domain whose origin does not point at this bucket', async () => {
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfo);
      mockCdnOperations.addCdnDomain.mockRejectedValue({ code: 'ResourceExists' });
      mockCdnOperations.describeCdnDomain.mockResolvedValue({
        domainName: CDN_HOST,
        cname: CDN_CNAME,
        status: 'online',
        origin: { originType: 'custom', origins: ['other-origin.example.com'] },
      });

      await expect(
        createBucketResource(
          mockContext,
          { key: 'test_bucket', name: 'test-bucket', domains: [cdnBinding] },
          initialState,
        ),
      ).rejects.toThrow('already exists but its origin does not point at bucket');

      expect(mockCdnOperations.updateCdnDelivery).not.toHaveBeenCalled();
    });

    it('fails the create when a rejected CDN add has no existing domain', async () => {
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfo);
      mockCdnOperations.addCdnDomain.mockRejectedValue(new Error('quota'));
      mockCdnOperations.describeCdnDomain.mockResolvedValue(null);

      await expect(
        createBucketResource(
          mockContext,
          { key: 'test_bucket', name: 'test-bucket', domains: [cdnBinding] },
          initialState,
        ),
      ).rejects.toThrow();
    });

    it('redeploys a changed certificate reference and updates delivery in place', async () => {
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfo);
      const existing = {
        mode: 'managed' as const,
        region: 'ap-guangzhou',
        definition: {
          bucket: 'test-bucket',
          domains: [
            {
              domain_name: CDN_HOST,
              certificate_id: 'cert-ref-old',
              certificate_hash: 'old-hash',
              cdn: { enabled: true, cdn_type: 'web', scope: 'global' },
            },
          ],
        },
        instances: cdnInstances,
        lastUpdated: new Date().toISOString(),
      };
      const state = { ...initialState, resources: { 'buckets.test_bucket': existing } };

      await updateBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
          domains: [
            {
              ...cdnBinding,
              certificate_id: 'cert-ref-2',
              cdn: { ...cdnOptions, cdn_type: 'media', scope: 'chinese_mainland', cache_ttl: 7200 },
            },
          ],
        },
        state,
      );

      expect(mockCdnOperations.updateCdnDelivery).toHaveBeenCalledWith(CDN_HOST, {
        serviceType: 'media',
        area: 'mainland',
        origin: { originType: 'cos', origins: [COS_ENDPOINT], serverName: COS_ENDPOINT },
      });
      expect(mockCdnOperations.applyCacheConfig).toHaveBeenCalledWith(CDN_HOST, 7200, undefined);
      expect(mockSslOperations.deployCertificateInstance).toHaveBeenCalledWith(
        'cert-ref-2',
        'cdn',
        [CDN_HOST],
      );
      expect(mockCdnOperations.addCdnDomain).not.toHaveBeenCalled();
    });

    it('skips certificate deployment when the certificate hash is unchanged', async () => {
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfo);
      const hash = 'stable-hash';
      const existing = {
        mode: 'managed' as const,
        region: 'ap-guangzhou',
        definition: {
          bucket: 'test-bucket',
          domains: [
            {
              domain_name: CDN_HOST,
              certificate_id: 'cert-ref-1',
              certificate_hash: hash,
              cdn: { enabled: true, cdn_type: 'web', scope: 'global' },
            },
          ],
        },
        instances: cdnInstances,
        lastUpdated: new Date().toISOString(),
      };
      mockSslOperations.deployCertificateInstance.mockClear();

      await updateBucketResource(
        mockContext,
        { key: 'test_bucket', name: 'test-bucket', domains: [cdnBinding] },
        { ...initialState, resources: { 'buckets.test_bucket': existing } },
      );

      expect(mockSslOperations.deployCertificateInstance).not.toHaveBeenCalled();
      expect(mockCdnOperations.enableHttps).not.toHaveBeenCalled();
      expect(mockedLogger.info).toHaveBeenCalledWith(
        expect.stringContaining('unchanged (hash match)'),
      );
    });

    it('switches a binding off CDN at binding level: teardown then direct rebind', async () => {
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfo);
      const existing = {
        mode: 'managed' as const,
        region: 'ap-guangzhou',
        definition: {
          bucket: 'test-bucket',
          domains: [
            {
              domain_name: CDN_HOST,
              certificate_id: 'cert-ref-1',
              cdn: { enabled: true, cdn_type: 'web', scope: 'global' },
            },
          ],
        },
        instances: cdnInstances,
        lastUpdated: new Date().toISOString(),
      };
      mockCosOperations.bindCustomDomain.mockResolvedValue({
        domain: CDN_HOST,
        cname: COS_ENDPOINT,
        dnsRecordId: 'direct-rec-1',
        bucketDomainBound: true,
      });

      await updateBucketResource(
        mockContext,
        { key: 'test_bucket', name: 'test-bucket', domains: [{ domain_name: CDN_HOST }] },
        { ...initialState, resources: { 'buckets.test_bucket': existing } },
      );

      expect(mockCdnOperations.deleteCdnDomain).toHaveBeenCalledWith(CDN_HOST);
      expect(mockDnsOperations.deleteDomainRecord).toHaveBeenCalledWith('example.com', 'rec-1');
      expect(mockCosOperations.unbindCustomDomain).toHaveBeenCalledWith('test-bucket', CDN_HOST);
      // The same hostname is re-bound directly with its own bucket CNAME record.
      expect(mockCosOperations.bindCustomDomain).toHaveBeenCalledWith('test-bucket', CDN_HOST);
    });

    it('skips direct-binding certificate deployment when the reference is unchanged', async () => {
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfo);
      const existing = {
        mode: 'managed' as const,
        region: 'ap-guangzhou',
        definition: {
          bucket: 'test-bucket',
          domains: [
            {
              domain_name: 'direct.example.com',
              certificate_id: 'cert-1',
              cdn: { enabled: false },
            },
          ],
        },
        instances: [
          {
            sid: 'si:tencent:cos:default:test-bucket',
            id: 'test-bucket',
            type: 'COS_BUCKET',
            bucket: 'test-bucket',
          },
          {
            sid: 'si:tencent:dnspod:default:rec-d',
            id: 'rec-d',
            type: 'TENCENT_COS_DNS_CNAME',
            domain: 'direct.example.com',
            cname: COS_ENDPOINT,
            dnsRecordId: 'rec-d',
          },
        ],
        lastUpdated: new Date().toISOString(),
      };
      mockCosOperations.bindCustomDomain.mockResolvedValue({
        domain: 'direct.example.com',
        cname: COS_ENDPOINT,
        dnsRecordId: 'rec-d',
        bucketDomainBound: true,
      });

      await updateBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
          domains: [{ domain_name: 'direct.example.com', certificate_id: 'cert-1' }],
        },
        { ...initialState, resources: { 'buckets.test_bucket': existing } },
      );

      expect(mockSslOperations.deployCertificateInstance).not.toHaveBeenCalled();
      expect(mockedLogger.info).toHaveBeenCalledWith(
        expect.stringContaining('unchanged (hash match)'),
      );
    });

    it('migrates legacy single-domain state in place without CDN calls', async () => {
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfo);
      const existing = {
        mode: 'managed' as const,
        region: 'ap-guangzhou',
        definition: { bucket: 'test-bucket', domain: 'legacy.example.com' },
        instances: [
          {
            sid: 'si:tencent:dnspod:default:rec-legacy',
            id: 'rec-legacy',
            type: 'TENCENT_COS_DNS_CNAME',
            domain: 'legacy.example.com',
            cname: COS_ENDPOINT,
            dnsRecordId: 'rec-legacy',
          },
        ],
        lastUpdated: new Date().toISOString(),
      };
      mockCosOperations.bindCustomDomain.mockResolvedValue({
        domain: 'legacy.example.com',
        cname: COS_ENDPOINT,
        dnsRecordId: 'rec-legacy',
        bucketDomainBound: true,
      });

      await updateBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
          domains: [{ domain_name: 'legacy.example.com' }],
        },
        { ...initialState, resources: { 'buckets.test_bucket': existing } },
      );

      expect(mockCdnOperations.addCdnDomain).not.toHaveBeenCalled();
      expect(mockCdnOperations.deleteCdnDomain).not.toHaveBeenCalled();
      expect(mockCosOperations.bindCustomDomain).toHaveBeenCalledWith(
        'test-bucket',
        'legacy.example.com',
      );
    });

    it('applies compression during pending option application', async () => {
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfo);

      await createBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
          domains: [{ ...cdnBinding, cdn: { ...cdnOptions, compression: true } }],
        },
        initialState,
      );

      expect(mockCdnOperations.applyCompression).toHaveBeenCalledWith(CDN_HOST, true);
    });

    it('re-resolves and records the CDN CNAME when no delivery record is tracked', async () => {
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfo);
      const existing = {
        mode: 'managed' as const,
        region: 'ap-guangzhou',
        definition: {
          bucket: 'test-bucket',
          domains: [
            {
              domain_name: CDN_HOST,
              certificate_id: 'cert-ref-1',
              cdn: { enabled: true, cdn_type: 'web', scope: 'global' },
            },
          ],
        },
        instances: [
          {
            sid: 'si:tencent:cos:default:test-bucket',
            id: 'test-bucket',
            type: 'COS_BUCKET',
            bucket: 'test-bucket',
          },
          {
            sid: 'si:tencent:cdn:default:cdn.example.com',
            id: CDN_HOST,
            type: 'TENCENT_CDN_DOMAIN',
            domainName: CDN_HOST,
          },
        ],
        lastUpdated: new Date().toISOString(),
      };
      mockCdnOperations.describeCdnDomain.mockResolvedValue({
        domainName: CDN_HOST,
        cname: 'cdn.example.com.cdn.dnsv1.com.v2',
        status: 'online',
        origin: { originType: 'cos', origins: [COS_ENDPOINT], serverName: COS_ENDPOINT },
      });
      mockDnsOperations.addDomainRecord.mockResolvedValue('rec-2');

      await updateBucketResource(
        mockContext,
        { key: 'test_bucket', name: 'test-bucket', domains: [cdnBinding] },
        { ...initialState, resources: { 'buckets.test_bucket': existing } },
      );

      expect(mockDnsOperations.addDomainRecord).toHaveBeenCalledWith({
        domainName: 'example.com',
        rr: 'cdn',
        type: 'CNAME',
        value: 'cdn.example.com.cdn.dnsv1.com.v2',
        ttl: 600,
      });
    });

    it('fails the update when the CDN domain cannot be resolved', async () => {
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfo);
      const existing = {
        mode: 'managed' as const,
        region: 'ap-guangzhou',
        definition: {
          bucket: 'test-bucket',
          domains: [
            {
              domain_name: CDN_HOST,
              cdn: { enabled: true, cdn_type: 'web', scope: 'global' },
            },
          ],
        },
        instances: [
          {
            sid: 'si:tencent:cos:default:test-bucket',
            id: 'test-bucket',
            type: 'COS_BUCKET',
            bucket: 'test-bucket',
          },
          {
            sid: 'si:tencent:cdn:default:cdn.example.com',
            id: CDN_HOST,
            type: 'TENCENT_CDN_DOMAIN',
            domainName: CDN_HOST,
          },
        ],
        lastUpdated: new Date().toISOString(),
      };
      mockCdnOperations.describeCdnDomain.mockResolvedValue(null);

      await expect(
        updateBucketResource(
          mockContext,
          { key: 'test_bucket', name: 'test-bucket', domains: [cdnBinding] },
          { ...initialState, resources: { 'buckets.test_bucket': existing } },
        ),
      ).rejects.toThrow();
    });

    it('creates a new CDN binding when one is added on update', async () => {
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfo);
      const existing = {
        mode: 'managed' as const,
        region: 'ap-guangzhou',
        definition: { bucket: 'test-bucket', domains: [] },
        instances: [
          {
            sid: 'si:tencent:cos:default:test-bucket',
            id: 'test-bucket',
            type: 'COS_BUCKET',
            bucket: 'test-bucket',
          },
        ],
        lastUpdated: new Date().toISOString(),
      };

      await updateBucketResource(
        mockContext,
        { key: 'test_bucket', name: 'test-bucket', domains: [cdnBinding] },
        { ...initialState, resources: { 'buckets.test_bucket': existing } },
      );

      expect(mockCdnOperations.addCdnDomain).toHaveBeenCalled();
      expect(mockCdnOperations.deleteCdnDomain).not.toHaveBeenCalled();
    });

    it('applies an origin-protocol change and compression change in place', async () => {
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfo);
      const existing = {
        mode: 'managed' as const,
        region: 'ap-guangzhou',
        definition: {
          bucket: 'test-bucket',
          domains: [
            {
              domain_name: CDN_HOST,
              cdn: {
                enabled: true,
                cdn_type: 'web',
                scope: 'global',
                origin_protocol: 'http',
                compression: false,
              },
            },
          ],
        },
        instances: cdnInstances,
        lastUpdated: new Date().toISOString(),
      };

      await updateBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
          domains: [
            {
              domain_name: CDN_HOST,
              cdn: {
                enabled: true,
                cdn_type: 'web',
                scope: 'global',
                origin_protocol: 'follow',
                compression: true,
              },
            },
          ],
        },
        { ...initialState, resources: { 'buckets.test_bucket': existing } },
      );

      expect(mockCdnOperations.updateCdnDelivery).toHaveBeenCalledWith(CDN_HOST, {
        origin: {
          originType: 'cos',
          origins: [COS_ENDPOINT],
          serverName: COS_ENDPOINT,
          originPullProtocol: 'follow',
        },
      });
      expect(mockCdnOperations.applyCompression).toHaveBeenCalledWith(CDN_HOST, true);
    });

    it('tolerates teardown of a stored binding without any recorded instances', async () => {
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfo);
      const existing = {
        mode: 'managed' as const,
        region: 'ap-guangzhou',
        definition: {
          bucket: 'test-bucket',
          domains: [
            {
              domain_name: 'gone.example.com',
              cdn: { enabled: true, cdn_type: 'web', scope: 'global' },
            },
          ],
        },
        instances: [],
        lastUpdated: new Date().toISOString(),
      };

      await updateBucketResource(
        mockContext,
        { key: 'test_bucket', name: 'test-bucket' },
        { ...initialState, resources: { 'buckets.test_bucket': existing } },
      );

      // Nothing recorded to tear down — converges without touching the CDN APIs.
      expect(mockCdnOperations.deleteCdnDomain).not.toHaveBeenCalled();
    });

    it('tears down CDN bindings on delete and survives record-delete errors', async () => {
      mockDnsOperations.deleteDomainRecord.mockRejectedValue(new Error('dns gone'));

      await deleteBucketResource(
        mockContext,
        'test-bucket',
        'ap-guangzhou',
        'buckets.test_bucket',
        {
          ...initialState,
          resources: {
            'buckets.test_bucket': {
              mode: 'managed',
              region: 'ap-guangzhou',
              definition: { bucket: 'test-bucket' },
              instances: cdnInstances,
              lastUpdated: new Date().toISOString(),
            },
          },
        },
      );

      expect(mockCdnOperations.deleteCdnDomain).toHaveBeenCalledWith(CDN_HOST);
      expect(mockDnsOperations.deleteDomainRecord).toHaveBeenCalledWith('example.com', 'rec-1');
      expect(mockCosOperations.unbindCustomDomain).toHaveBeenCalledWith('test-bucket', CDN_HOST);
      expect(mockCosOperations.deleteBucket).toHaveBeenCalledWith('test-bucket', 'ap-guangzhou');
    });
  });
});
