import { ProviderEnum } from '../../../src/common';
import {
  createBucketResource,
  updateBucketResource,
  deleteBucketResource,
} from '../../../src/stack/scfStack/cosResource';
import { Context, CURRENT_STATE_VERSION, StateFile } from '../../../src/types';

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

jest.mock('../../../src/common/tencentClient', () => ({
  createTencentClient: () => ({
    cos: mockCosOperations,
    ssl: mockSslOperations,
    scf: {},
    tdsqlc: {},
  }),
}));

jest.mock('../../../src/common/stateManager', () => ({
  ...jest.requireActual('../../../src/common/stateManager'),
  setResource: (...args: unknown[]) => mockedStateManager.setResource(...args),
  removeResource: (...args: unknown[]) => mockedStateManager.removeResource(...args),
}));

jest.mock('../../../src/common/logger', () => ({
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

    it('should reject certificate_id reference with TENCENT_CERT_REFERENCE_NOT_SUPPORTED', async () => {
      mockCosOperations.createBucket.mockResolvedValue(undefined);
      mockCosOperations.getBucket.mockResolvedValue(mockBucketInfo);

      const domainBucket = {
        key: 'my_bucket',
        name: 'test-bucket',
        website: {
          index: 'index.html',
          code: './dist',
          error_page: 'error.html',
          error_code: 404,
          domain: 'cdn.example.com',
          domain_certificate_id: '12345',
        },
      };

      await expect(createBucketResource(mockContext, domainBucket, initialState)).rejects.toThrow(
        'certificate_id reference mode',
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
});
