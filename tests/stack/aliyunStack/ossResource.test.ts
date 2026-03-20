import { ProviderEnum } from '../../../src/common';
import {
  createBucketResource,
  deleteBucketResource,
  updateBucketResource,
} from '../../../src/stack/aliyunStack/ossResource';
import { BucketDomain, Context, CURRENT_STATE_VERSION, StateFile } from '../../../src/types';

const mockOssOperations = {
  createBucket: jest.fn(),
  getBucket: jest.fn(),
  deleteBucket: jest.fn(),
  uploadFiles: jest.fn(),
  updateBucketAcl: jest.fn(),
  updateBucketWebsite: jest.fn(),
  bindCustomDomain: jest.fn(),
  unbindCustomDomain: jest.fn(),
  getOssEndpoint: jest.fn(),
};

const mockCasOperations = {
  getCertificate: jest.fn(),
  uploadCertificate: jest.fn(),
  deleteCertificate: jest.fn(),
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

jest.mock('../../../src/common/aliyunClient', () => ({
  createAliyunClient: () => ({
    oss: mockOssOperations,
    cas: mockCasOperations,
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

describe('OssResource', () => {
  const mockContext: Context = {
    stage: 'default',
    app: 'test-app',
    service: 'test-service',
    provider: ProviderEnum.ALIYUN,
    region: 'cn-hangzhou',
    accessKeyId: 'test-key',
    accessKeySecret: 'test-secret',
    iacLocation: 'test.yml',
    parameters: [],
    stages: {},
  };

  const initialState: StateFile = {
    version: CURRENT_STATE_VERSION,
    provider: 'aliyun',
    app: 'test-app',
    service: 'test-service',
    stages: {},
    resources: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('deleteBucketResource', () => {
    it('should delete bucket and remove from state', async () => {
      const bucketName = 'test-bucket';
      const logicalId = 'buckets.test_bucket';
      const stateWithBucket: StateFile = {
        ...initialState,
        resources: {
          [logicalId]: {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: {},
            instances: [],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      mockOssOperations.deleteBucket.mockResolvedValue(undefined);
      mockedStateManager.removeResource.mockReturnValue(initialState);

      const result = await deleteBucketResource(
        mockContext,
        bucketName,
        logicalId,
        stateWithBucket,
      );

      expect(mockOssOperations.deleteBucket).toHaveBeenCalledWith(bucketName);
      expect(mockedStateManager.removeResource).toHaveBeenCalledWith(stateWithBucket, logicalId);
      expect(result).toEqual(initialState);
    });

    it('should handle NoSuchBucket gracefully and remove state', async () => {
      const bucketName = 'test-bucket';
      const logicalId = 'buckets.test_bucket';
      const stateWithBucket: StateFile = {
        ...initialState,
        resources: {
          [logicalId]: {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: {},
            instances: [],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      const noSuchBucketError = Object.assign(new Error('NoSuchBucket'), {
        code: 'NoSuchBucket',
      });
      mockOssOperations.deleteBucket.mockRejectedValue(noSuchBucketError);
      mockedStateManager.removeResource.mockReturnValue(initialState);

      const result = await deleteBucketResource(
        mockContext,
        bucketName,
        logicalId,
        stateWithBucket,
      );

      expect(mockOssOperations.deleteBucket).toHaveBeenCalledWith(bucketName);
      expect(mockedLogger.warn).toHaveBeenCalledWith(
        expect.stringContaining('Bucket test-bucket not found in provider'),
      );
      expect(mockedStateManager.removeResource).toHaveBeenCalledWith(stateWithBucket, logicalId);
      expect(result).toEqual(initialState);
    });

    it('should rethrow unexpected errors from deleteBucket', async () => {
      const bucketName = 'test-bucket';
      const logicalId = 'buckets.test_bucket';
      const error = new Error('Delete failed');

      mockOssOperations.deleteBucket.mockRejectedValue(error);

      await expect(
        deleteBucketResource(mockContext, bucketName, logicalId, initialState),
      ).rejects.toThrow('Delete failed');
    });

    it('should delete DNS CNAME record when bucket has custom domain', async () => {
      const bucketName = 'test-bucket';
      const logicalId = 'buckets.test_bucket';
      const stateWithDns: StateFile = {
        ...initialState,
        resources: {
          [logicalId]: {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: {},
            instances: [
              { sid: 'oss-sid', id: bucketName, type: 'ALIYUN_OSS_BUCKET' },
              {
                sid: 'dns-sid',
                id: 'dns-record-123',
                type: 'ALIYUN_OSS_DNS_CNAME',
                domain: 'example.com',
                cname: `${bucketName}.oss-cn-hangzhou.aliyuncs.com`,
                dnsRecordId: 'dns-record-123',
              },
            ],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      mockOssOperations.unbindCustomDomain.mockResolvedValue(undefined);
      mockOssOperations.deleteBucket.mockResolvedValue(undefined);
      mockedStateManager.removeResource.mockReturnValue(initialState);

      const result = await deleteBucketResource(mockContext, bucketName, logicalId, stateWithDns);

      expect(mockOssOperations.unbindCustomDomain).toHaveBeenCalledWith(
        bucketName,
        'example.com',
        'dns-record-123',
        undefined,
      );
      expect(mockOssOperations.deleteBucket).toHaveBeenCalledWith(bucketName);
      expect(mockedStateManager.removeResource).toHaveBeenCalledWith(stateWithDns, logicalId);
      expect(result).toEqual(initialState);
    });

    it('should not fail when DNS record ID is missing', async () => {
      const bucketName = 'test-bucket';
      const logicalId = 'buckets.test_bucket';
      const stateWithoutDnsRecordId: StateFile = {
        ...initialState,
        resources: {
          [logicalId]: {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: {},
            instances: [
              { sid: 'oss-sid', id: bucketName, type: 'ALIYUN_OSS_BUCKET' },
              {
                sid: 'dns-sid',
                id: 'existing',
                type: 'ALIYUN_OSS_DNS_CNAME',
                domain: 'example.com',
                cname: `${bucketName}.oss-cn-hangzhou.aliyuncs.com`,
              },
            ],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      mockOssOperations.deleteBucket.mockResolvedValue(undefined);
      mockedStateManager.removeResource.mockReturnValue(initialState);

      const result = await deleteBucketResource(
        mockContext,
        bucketName,
        logicalId,
        stateWithoutDnsRecordId,
      );

      expect(mockOssOperations.unbindCustomDomain).toHaveBeenCalledWith(
        bucketName,
        'example.com',
        undefined,
        undefined,
      );
      expect(mockOssOperations.deleteBucket).toHaveBeenCalledWith(bucketName);
      expect(result).toEqual(initialState);
    });
  });

  describe('createBucketResource', () => {
    const baseBucketInfo = {
      name: 'test-bucket',
      location: 'oss-cn-hangzhou',
      acl: 'private',
      storageClass: 'Standard',
    };

    const baseBucket: BucketDomain = {
      key: 'test_bucket',
      name: 'test-bucket',
      website: {
        index: 'index.html',
        code: './dist',
        error_page: '404.html',
        error_code: 404,
      },
    };

    it('should create bucket with domain and certificate', async () => {
      const bucket: BucketDomain = {
        ...baseBucket,
        website: {
          ...baseBucket.website!,
          domain: 'www.example.com',
          domain_certificate_body: '-----BEGIN CERTIFICATE-----\nMOCK\n-----END CERTIFICATE-----',
          domain_certificate_private_key:
            '-----BEGIN RSA PRIVATE KEY-----\nMOCK\n-----END RSA PRIVATE KEY-----',
        },
      };

      mockOssOperations.createBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.getBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.bindCustomDomain.mockResolvedValue({
        domain: 'www.example.com',
        cname: 'test-bucket.oss-cn-hangzhou.aliyuncs.com',
        bucketCnameBound: true,
      });
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      await createBucketResource(mockContext, bucket, initialState);

      expect(mockOssOperations.bindCustomDomain).toHaveBeenCalledWith(
        'test-bucket',
        'www.example.com',
        {
          certificateBody: '-----BEGIN CERTIFICATE-----\nMOCK\n-----END CERTIFICATE-----',
          certificatePrivateKey:
            '-----BEGIN RSA PRIVATE KEY-----\nMOCK\n-----END RSA PRIVATE KEY-----',
        },
      );
    });

    it('should create bucket with domain but no certificate', async () => {
      const bucket: BucketDomain = {
        ...baseBucket,
        website: {
          ...baseBucket.website!,
          domain: 'www.example.com',
        },
      };

      mockOssOperations.createBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.getBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.bindCustomDomain.mockResolvedValue({
        domain: 'www.example.com',
        cname: 'test-bucket.oss-cn-hangzhou.aliyuncs.com',
        bucketCnameBound: true,
      });
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      await createBucketResource(mockContext, bucket, initialState);

      expect(mockOssOperations.bindCustomDomain).toHaveBeenCalledWith(
        'test-bucket',
        'www.example.com',
        undefined,
      );
    });

    it('should throw when certificate reference is invalid', async () => {
      const bucket: BucketDomain = {
        ...baseBucket,
        website: {
          ...baseBucket.website!,
          domain: 'www.example.com',
          domain_certificate_id: 'nonexistent-cert-id',
        },
      };

      mockOssOperations.createBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.getBucket.mockResolvedValue(baseBucketInfo);
      mockCasOperations.getCertificate.mockResolvedValue(null);
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      await expect(createBucketResource(mockContext, bucket, initialState)).rejects.toThrow();
    });

    it('should create bucket without domain', async () => {
      mockOssOperations.createBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.getBucket.mockResolvedValue(baseBucketInfo);
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      await createBucketResource(mockContext, baseBucket, initialState);

      expect(mockOssOperations.bindCustomDomain).not.toHaveBeenCalled();
    });

    it('should resolve reference certificate from CAS provider', async () => {
      const bucket: BucketDomain = {
        ...baseBucket,
        website: {
          ...baseBucket.website!,
          domain: 'www.example.com',
          domain_certificate_id: '12345',
        },
      };

      mockCasOperations.getCertificate.mockResolvedValue({
        cert: '-----BEGIN CERTIFICATE-----\nCAS_CERT\n-----END CERTIFICATE-----',
        key: '-----BEGIN RSA PRIVATE KEY-----\nCAS_KEY\n-----END RSA PRIVATE KEY-----',
      });
      mockOssOperations.createBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.getBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.bindCustomDomain.mockResolvedValue({
        domain: 'www.example.com',
        cname: 'test-bucket.oss-cn-hangzhou.aliyuncs.com',
        bucketCnameBound: true,
      });
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      await createBucketResource(mockContext, bucket, initialState);

      expect(mockCasOperations.getCertificate).toHaveBeenCalledWith('12345');
      expect(mockOssOperations.bindCustomDomain).toHaveBeenCalledWith(
        'test-bucket',
        'www.example.com',
        {
          certificateBody: '-----BEGIN CERTIFICATE-----\nCAS_CERT\n-----END CERTIFICATE-----',
          certificatePrivateKey:
            '-----BEGIN RSA PRIVATE KEY-----\nCAS_KEY\n-----END RSA PRIVATE KEY-----',
        },
      );
    });
  });

  describe('updateBucketResource', () => {
    const baseBucketInfo = {
      name: 'test-bucket',
      location: 'oss-cn-hangzhou',
      acl: 'private',
      storageClass: 'Standard',
    };

    const baseBucket: BucketDomain = {
      key: 'test_bucket',
      name: 'test-bucket',
      website: {
        index: 'index.html',
        code: './dist',
        error_page: '404.html',
        error_code: 404,
      },
    };

    const stateWithDomain: StateFile = {
      ...initialState,
      resources: {
        'buckets.test_bucket': {
          mode: 'managed',
          region: 'cn-hangzhou',
          definition: {},
          instances: [
            {
              sid: 'aliyun:oss:default:test-bucket',
              id: 'test-bucket',
              type: 'ALIYUN_OSS_BUCKET' as const,
              bucketName: 'test-bucket',
            },
            {
              sid: 'aliyun:alidns:default:www.example.com',
              id: 'www.example.com',
              type: 'ALIYUN_OSS_DNS_CNAME' as const,
              domain: 'www.example.com',
              cname: 'test-bucket.oss-cn-hangzhou.aliyuncs.com',
            },
          ],
          lastUpdated: new Date().toISOString(),
        },
      },
    };

    it('should update bucket with certificate on existing domain', async () => {
      const bucket: BucketDomain = {
        ...baseBucket,
        website: {
          ...baseBucket.website!,
          domain: 'www.example.com',
          domain_certificate_body:
            '-----BEGIN CERTIFICATE-----\nUPDATED\n-----END CERTIFICATE-----',
          domain_certificate_private_key:
            '-----BEGIN RSA PRIVATE KEY-----\nUPDATED_KEY\n-----END RSA PRIVATE KEY-----',
        },
      };

      mockOssOperations.getBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.bindCustomDomain.mockResolvedValue({
        domain: 'www.example.com',
        cname: 'test-bucket.oss-cn-hangzhou.aliyuncs.com',
        bucketCnameBound: true,
      });
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      await updateBucketResource(mockContext, bucket, stateWithDomain);

      expect(mockOssOperations.unbindCustomDomain).not.toHaveBeenCalled();
      expect(mockOssOperations.bindCustomDomain).toHaveBeenCalledWith(
        'test-bucket',
        'www.example.com',
        {
          certificateBody: '-----BEGIN CERTIFICATE-----\nUPDATED\n-----END CERTIFICATE-----',
          certificatePrivateKey:
            '-----BEGIN RSA PRIVATE KEY-----\nUPDATED_KEY\n-----END RSA PRIVATE KEY-----',
        },
      );
    });

    it('should update bucket with domain but no certificate (cert removed)', async () => {
      const bucket: BucketDomain = {
        ...baseBucket,
        website: {
          ...baseBucket.website!,
          domain: 'www.example.com',
        },
      };

      mockOssOperations.getBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.bindCustomDomain.mockResolvedValue({
        domain: 'www.example.com',
        cname: 'test-bucket.oss-cn-hangzhou.aliyuncs.com',
        bucketCnameBound: true,
      });
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      await updateBucketResource(mockContext, bucket, stateWithDomain);

      expect(mockOssOperations.bindCustomDomain).toHaveBeenCalledWith(
        'test-bucket',
        'www.example.com',
        undefined,
      );
    });
  });
});
