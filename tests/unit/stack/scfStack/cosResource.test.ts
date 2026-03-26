import { ProviderEnum } from '../../../../src/common';
import {
  createBucketResource,
  updateBucketResource,
  deleteBucketResource,
  readBucketResource,
} from '../../../../src/stack/scfStack/cosResource';
import { Context, CURRENT_STATE_VERSION, StateFile, BucketAccessEnum } from '../../../../src/types';

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
};

jest.mock('../../../../src/common/tencentClient', () => ({
  createTencentClient: () => ({
    cos: mockCosOperations,
    ssl: mockSslOperations,
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
          error_page: 'error.html',
          error_code: 404,
        },
      };

      await createBucketResource(mockContext, bucket, initialState);

      expect(mockCosOperations.createBucket).toHaveBeenCalled();
      expect(mockCosOperations.getBucket).toHaveBeenCalledWith('test-bucket', 'ap-guangzhou');
      expect(mockedStateManager.setResource).toHaveBeenCalled();
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
        key: 'my_bucket',
        name: 'test-bucket',
        website: {
          index: 'index.html',
          code: './dist',
          error_page: 'error.html',
          error_code: 404,
          domain: 'cdn.example.com',
          domain_certificate_body: 'CERT-BODY',
          domain_certificate_private_key: 'CERT-KEY',
        },
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
          domain: 'cdn.example.com',
          code: './dist',
          error_page: 'error.html',
          error_code: 404,
        },
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
        key: 'my_bucket',
        name: 'test-bucket',
        website: {
          index: 'index.html',
          code: './dist',
          error_page: 'error.html',
          error_code: 404,
          domain: 'cdn.example.com',
          domain_certificate_body: 'CERT-BODY',
          domain_certificate_private_key: 'CERT-KEY',
        },
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
        key: 'my_bucket',
        name: 'test-bucket',
        website: {
          index: 'index.html',
          code: './dist',
          error_page: 'error.html',
          error_code: 404,
          domain: 'cdn.example.com',
          domain_certificate_id: 'existing-cert-12345',
        },
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
  });

  describe('updateBucketResource', () => {
    it('should deploy SSL certificate on update with domain_certificate', async () => {
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
          domain: 'cdn.example.com',
          domain_certificate_body: 'CERT-BODY',
          domain_certificate_private_key: 'CERT-KEY',
          code: './dist',
          error_page: 'error.html',
          error_code: 404,
        },
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
          domain: 'cdn.example.com',
          domain_certificate_id: 'existing-cert-99999',
          code: './dist',
          error_page: 'error.html',
          error_code: 404,
        },
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
          domain: 'cdn.example.com',
          code: './dist',
          error_page: 'error.html',
          error_code: 404,
        },
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
              error_page: 'error.html',
              error_code: 404,
            },
          },
          initialState,
        ),
      ).rejects.toThrow('Failed to refresh state for bucket');
    });

    it('should create bucket with www_bind_apex domain binding', async () => {
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
            error_page: 'error.html',
            error_code: 404,
            domain: 'example.com',
            www_bind_apex: true,
          },
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

    it('should deploy certificate on www domain when www_bind_apex and cert provided', async () => {
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
            error_page: 'error.html',
            error_code: 404,
            domain: 'example.com',
            www_bind_apex: true,
            domain_certificate_body: 'CERT-BODY',
            domain_certificate_private_key: 'CERT-KEY',
          },
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

    it('should not deploy cert on www if wwwCnameInfo.bucketDomainBound is false', async () => {
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
            error_page: 'error.html',
            error_code: 404,
            domain: 'example.com',
            www_bind_apex: true,
            domain_certificate_body: 'CERT-BODY',
            domain_certificate_private_key: 'CERT-KEY',
          },
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

    it('should handle wwwCnameInfo returning null', async () => {
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
            error_page: 'error.html',
            error_code: 404,
            domain: 'example.com',
            www_bind_apex: true,
          },
        },
        initialState,
      );

      expect(mockCosOperations.bindCustomDomain).toHaveBeenCalledTimes(2);
    });

    it('should refresh bucket info after domain binding', async () => {
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
            error_page: 'error.html',
            error_code: 404,
            domain: 'cdn.example.com',
          },
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
            error_page: 'error.html',
            error_code: 404,
            domain: 'cdn.example.com',
          },
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
            error_page: 'error.html',
            error_code: 404,
            domain: 'cdn.example.com',
          },
        },
        initialState,
      );

      expect(mockCosOperations.bindCustomDomain).toHaveBeenCalled();
      expect(mockSslOperations.deployCertificateInstance).not.toHaveBeenCalled();
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
              error_page: 'error.html',
              error_code: 404,
            },
          },
          initialState,
        ),
      ).rejects.toThrow('Failed to refresh state for bucket');
    });

    it('should unbind old domains when domain changes', async () => {
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
            error_page: 'error.html',
            error_code: 404,
            domain: 'new.example.com',
          },
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

    it('should bind www domain with cert in update when www_bind_apex', async () => {
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
            error_page: 'error.html',
            error_code: 404,
            domain: 'example.com',
            www_bind_apex: true,
            domain_certificate_id: 'cert-ref-123',
          },
        },
        initialState,
      );

      expect(mockCosOperations.bindCustomDomain).toHaveBeenCalledWith(
        'test-bucket',
        'www.example.com',
      );
      expect(mockSslOperations.deployCertificateInstance).toHaveBeenCalledTimes(2);
    });

    it('should unbind existing www domain when www_bind_apex is disabled', async () => {
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
            error_page: 'error.html',
            error_code: 404,
            domain: 'example.com',
            www_bind_apex: false,
          },
        },
        stateWithWww,
      );

      expect(mockCosOperations.unbindCustomDomain).toHaveBeenCalledWith(
        'test-bucket',
        'www.example.com',
        'dns-www',
      );
    });

    it('should unbind all domains when domain is removed in update', async () => {
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
            error_page: 'error.html',
            error_code: 404,
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
            error_page: 'error.html',
            error_code: 404,
            domain: 'cdn.example.com',
          },
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

  describe('resolveBucketDomainCertificate', () => {
    it('should not call bindCustomDomain when cert body provided without domain', async () => {
      mockCosOperations.createBucket.mockResolvedValue(undefined);
      mockCosOperations.getBucket.mockResolvedValue({
        Name: 'test-bucket',
        Location: 'ap-guangzhou',
        CreationDate: '2024-01-01',
      });

      await createBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
          website: {
            index: 'index.html',
            code: './dist',
            error_page: 'error.html',
            error_code: 404,
            domain_certificate_body: 'CERT-BODY',
            domain_certificate_private_key: 'CERT-KEY',
          },
        },
        initialState,
      );

      expect(mockCosOperations.bindCustomDomain).not.toHaveBeenCalled();
    });

    it('should resolve certificate_id reference without domain for logging', async () => {
      mockCosOperations.createBucket.mockResolvedValue(undefined);
      mockCosOperations.getBucket.mockResolvedValue({
        Name: 'test-bucket',
        Location: 'ap-guangzhou',
        CreationDate: '2024-01-01',
      });

      await createBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
          website: {
            index: 'index.html',
            code: './dist',
            error_page: 'error.html',
            error_code: 404,
            domain_certificate_id: 'cert-id-999',
          },
        },
        initialState,
      );

      expect(mockCosOperations.bindCustomDomain).not.toHaveBeenCalled();
    });

    it('should return undefined when no website defined', async () => {
      mockCosOperations.createBucket.mockResolvedValue(undefined);
      mockCosOperations.getBucket.mockResolvedValue({
        Name: 'test-bucket',
        Location: 'ap-guangzhou',
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
    });
  });
});
