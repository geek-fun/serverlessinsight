import { ProviderEnum } from '../../../../src/common';
import {
  createBucketResource,
  deleteBucketResource,
  readBucketResource,
  updateBucketResource,
} from '../../../../src/stack/aliyunStack/ossResource';
import {
  BucketAccessEnum,
  BucketDomain,
  Context,
  CURRENT_STATE_VERSION,
  StateFile,
} from '../../../../src/types';
import { CommonBucketInstance } from '../../../../src/stack/bucketTypes';

const mockOssOperations = {
  createBucket: jest.fn(),
  getBucket: jest.fn(),
  deleteBucket: jest.fn(),
  uploadFiles: jest.fn(),
  updateBucketAcl: jest.fn(),
  updateBucketWebsite: jest.fn(),
  bindCustomDomain: jest.fn(),
  unbindCustomDomain: jest.fn(),
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

jest.mock('../../../../src/common/aliyunClient', () => ({
  createAliyunClient: () => ({
    oss: mockOssOperations,
    cas: mockCasOperations,
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

  describe('buildOssInstanceFromProvider', () => {
    it('should handle undefined optional fields in corsRules', async () => {
      const bucketInfo = {
        name: 'test-bucket',
        location: 'oss-cn-hangzhou',
        acl: 'private',
        storageClass: 'Standard',
        corsRules: [
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

      mockOssOperations.getBucket.mockResolvedValue(bucketInfo);
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      const result = await updateBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
          website: { index: 'index.html', code: './dist', error_page: '404.html', error_code: 404 },
        },
        initialState,
      );

      const instances = result.resources['buckets.test_bucket'].instances;
      const ossInstance = instances.find(
        (inst) => inst.type === 'ALIYUN_OSS_BUCKET',
      ) as CommonBucketInstance;

      expect(ossInstance.corsRules).toEqual([
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

    it('should handle undefined optional fields in lifecycleRules expiration', async () => {
      const bucketInfo = {
        name: 'test-bucket',
        location: 'oss-cn-hangzhou',
        acl: 'private',
        storageClass: 'Standard',
        lifecycleRules: [
          {
            id: undefined,
            status: undefined,
            prefix: undefined,
            expiration: {
              days: undefined,
              date: undefined,
              expiredObjectDeleteMarker: undefined,
            },
            transition: undefined,
          },
        ],
      };

      mockOssOperations.getBucket.mockResolvedValue(bucketInfo);
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      const result = await updateBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
          website: { index: 'index.html', code: './dist', error_page: '404.html', error_code: 404 },
        },
        initialState,
      );

      const instances = result.resources['buckets.test_bucket'].instances;
      const ossInstance = instances.find(
        (inst) => inst.type === 'ALIYUN_OSS_BUCKET',
      ) as CommonBucketInstance;

      expect(ossInstance.lifecycleRules).toEqual([
        {
          id: null,
          status: null,
          prefix: null,
          expiration: {
            days: null,
            date: null,
            expiredObjectDeleteMarker: null,
          },
          transition: undefined,
        },
      ]);
    });

    it('should handle undefined optional fields in lifecycleRules transition', async () => {
      const bucketInfo = {
        name: 'test-bucket',
        location: 'oss-cn-hangzhou',
        acl: 'private',
        storageClass: 'Standard',
        lifecycleRules: [
          {
            id: 'rule1',
            status: 'Enabled',
            prefix: 'logs/',
            expiration: undefined,
            transition: {
              days: undefined,
              date: undefined,
              storageClass: undefined,
            },
          },
        ],
      };

      mockOssOperations.getBucket.mockResolvedValue(bucketInfo);
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      const result = await updateBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
          website: { index: 'index.html', code: './dist', error_page: '404.html', error_code: 404 },
        },
        initialState,
      );

      const instances = result.resources['buckets.test_bucket'].instances;
      const ossInstance = instances.find(
        (inst) => inst.type === 'ALIYUN_OSS_BUCKET',
      ) as CommonBucketInstance;

      expect(ossInstance.lifecycleRules).toEqual([
        {
          id: 'rule1',
          status: 'Enabled',
          prefix: 'logs/',
          expiration: undefined,
          transition: {
            days: null,
            date: null,
            storageClass: null,
          },
        },
      ]);
    });

    it('should handle undefined optional fields in encryptionConfig', async () => {
      const bucketInfo = {
        name: 'test-bucket',
        location: 'oss-cn-hangzhou',
        acl: 'private',
        storageClass: 'Standard',
        encryptionConfig: {
          sseAlgorithm: undefined,
          kmsMasterKeyId: undefined,
          kmsDataEncryption: undefined,
        },
      };

      mockOssOperations.getBucket.mockResolvedValue(bucketInfo);
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      const result = await updateBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
          website: { index: 'index.html', code: './dist', error_page: '404.html', error_code: 404 },
        },
        initialState,
      );

      const instances = result.resources['buckets.test_bucket'].instances;
      const ossInstance = instances.find(
        (inst) => inst.type === 'ALIYUN_OSS_BUCKET',
      ) as CommonBucketInstance;

      expect(ossInstance.encryptionConfig).toEqual({
        sseAlgorithm: null,
        kmsMasterKeyId: null,
        kmsDataEncryption: null,
      });
    });

    it('should handle undefined optional fields in replicationRules', async () => {
      const bucketInfo = {
        name: 'test-bucket',
        location: 'oss-cn-hangzhou',
        acl: 'private',
        storageClass: 'Standard',
        replicationRules: [
          {
            id: undefined,
            status: undefined,
            prefix: undefined,
            destination: {
              bucket: undefined,
              storageClass: undefined,
            },
          },
        ],
      };

      mockOssOperations.getBucket.mockResolvedValue(bucketInfo);
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      const result = await updateBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
          website: { index: 'index.html', code: './dist', error_page: '404.html', error_code: 404 },
        },
        initialState,
      );

      const instances = result.resources['buckets.test_bucket'].instances;
      const ossInstance = instances.find(
        (inst) => inst.type === 'ALIYUN_OSS_BUCKET',
      ) as CommonBucketInstance;

      expect(ossInstance.replicationRules).toEqual([
        {
          id: null,
          status: null,
          prefix: null,
          destination: {
            bucket: null,
            storageClass: null,
          },
        },
      ]);
    });

    it('should handle undefined optional fields in tags', async () => {
      const bucketInfo = {
        name: 'test-bucket',
        location: 'oss-cn-hangzhou',
        acl: 'private',
        storageClass: 'Standard',
        tags: [
          {
            key: undefined,
            value: undefined,
          },
        ],
      };

      mockOssOperations.getBucket.mockResolvedValue(bucketInfo);
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      const result = await updateBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
          website: { index: 'index.html', code: './dist', error_page: '404.html', error_code: 404 },
        },
        initialState,
      );

      const instances = result.resources['buckets.test_bucket'].instances;
      const ossInstance = instances.find(
        (inst) => inst.type === 'ALIYUN_OSS_BUCKET',
      ) as CommonBucketInstance;

      expect(ossInstance.tags).toEqual([
        {
          key: null,
          value: null,
        },
      ]);
    });

    it('should handle top-level undefined optional fields', async () => {
      const bucketInfo = {
        name: 'test-bucket',
        location: undefined,
        creationDate: undefined,
        storageClass: undefined,
        dataRedundancyType: undefined,
        resourceGroupId: undefined,
        comment: undefined,
        owner: undefined,
        blockPublicAccess: undefined,
        accessMonitorStatus: undefined,
        acl: undefined,
        websiteConfig: undefined,
        loggingConfig: undefined,
        versioningConfig: undefined,
        transferAccelerationStatus: undefined,
      };

      mockOssOperations.getBucket.mockResolvedValue(bucketInfo);
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      const result = await updateBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
          website: { index: 'index.html', code: './dist', error_page: '404.html', error_code: 404 },
        },
        initialState,
      );

      const instances = result.resources['buckets.test_bucket'].instances;
      const ossInstance = instances.find(
        (inst) => inst.type === 'ALIYUN_OSS_BUCKET',
      ) as CommonBucketInstance;

      expect(ossInstance.location).toEqual(null);
      expect(ossInstance.creationDate).toEqual(null);
      expect(ossInstance.storageClass).toEqual(null);
      expect(ossInstance.dataRedundancyType).toEqual(null);
      expect(ossInstance.resourceGroupId).toEqual(null);
      expect(ossInstance.comment).toEqual(null);
      expect(ossInstance.owner).toBeUndefined();
      expect(ossInstance.blockPublicAccess).toEqual(null);
      expect(ossInstance.accessMonitorStatus).toEqual(null);
      expect(ossInstance.acl).toEqual(null);
      expect(ossInstance.websiteConfig).toBeUndefined();
      expect(ossInstance.loggingConfig).toBeUndefined();
      expect(ossInstance.versioningStatus).toEqual(null);
      expect(ossInstance.encryptionConfig).toBeUndefined();
      expect(ossInstance.transferAccelerationStatus).toEqual(null);
    });

    it('should handle undefined optional nested fields in owner', async () => {
      const bucketInfo = {
        name: 'test-bucket',
        location: 'oss-cn-hangzhou',
        acl: 'private',
        storageClass: 'Standard',
        owner: {
          id: undefined,
          displayName: undefined,
        },
      };

      mockOssOperations.getBucket.mockResolvedValue(bucketInfo);
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      const result = await updateBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
          website: { index: 'index.html', code: './dist', error_page: '404.html', error_code: 404 },
        },
        initialState,
      );

      const instances = result.resources['buckets.test_bucket'].instances;
      const ossInstance = instances.find(
        (inst) => inst.type === 'ALIYUN_OSS_BUCKET',
      ) as CommonBucketInstance;

      expect(ossInstance.owner).toEqual({
        id: null,
        displayName: null,
      });
    });

    it('should handle undefined optional nested fields in websiteConfig', async () => {
      const bucketInfo = {
        name: 'test-bucket',
        location: 'oss-cn-hangzhou',
        acl: 'private',
        storageClass: 'Standard',
        websiteConfig: {
          indexDocument: undefined,
          errorDocument: undefined,
        },
      };

      mockOssOperations.getBucket.mockResolvedValue(bucketInfo);
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      const result = await updateBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
          website: { index: 'index.html', code: './dist', error_page: '404.html', error_code: 404 },
        },
        initialState,
      );

      const instances = result.resources['buckets.test_bucket'].instances;
      const ossInstance = instances.find(
        (inst) => inst.type === 'ALIYUN_OSS_BUCKET',
      ) as CommonBucketInstance;

      expect(ossInstance.websiteConfig).toEqual({
        indexDocument: null,
        errorDocument: null,
      });
    });

    it('should handle undefined optional nested fields in loggingConfig', async () => {
      const bucketInfo = {
        name: 'test-bucket',
        location: 'oss-cn-hangzhou',
        acl: 'private',
        storageClass: 'Standard',
        loggingConfig: {
          targetBucket: undefined,
          targetPrefix: undefined,
        },
      };

      mockOssOperations.getBucket.mockResolvedValue(bucketInfo);
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      const result = await updateBucketResource(
        mockContext,
        {
          key: 'test_bucket',
          name: 'test-bucket',
          website: { index: 'index.html', code: './dist', error_page: '404.html', error_code: 404 },
        },
        initialState,
      );

      const instances = result.resources['buckets.test_bucket'].instances;
      const ossInstance = instances.find(
        (inst) => inst.type === 'ALIYUN_OSS_BUCKET',
      ) as CommonBucketInstance;

      expect(ossInstance.loggingConfig).toEqual({
        targetBucket: null,
        targetPrefix: null,
      });
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

    it('should throw when getBucket returns null after create', async () => {
      mockOssOperations.createBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.getBucket.mockResolvedValue(null);

      await expect(createBucketResource(mockContext, baseBucket, initialState)).rejects.toThrow(
        'Failed to refresh state for bucket: test-bucket',
      );
    });

    it('should bind www domain when www_bind_apex is true', async () => {
      const bucket: BucketDomain = {
        ...baseBucket,
        website: {
          ...baseBucket.website!,
          domain: 'example.com',
          www_bind_apex: true,
        },
      };

      mockOssOperations.createBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.getBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.bindCustomDomain
        .mockResolvedValueOnce({
          domain: 'example.com',
          cname: 'test-bucket.oss-cn-hangzhou.aliyuncs.com',
          bucketCnameBound: true,
          dnsRecordId: 'dns-123',
          txtRecordId: 'txt-456',
        })
        .mockResolvedValueOnce({
          domain: 'www.example.com',
          cname: 'test-bucket.oss-cn-hangzhou.aliyuncs.com',
          bucketCnameBound: true,
          dnsRecordId: 'dns-www-789',
          txtRecordId: 'txt-www-012',
        });
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      const result = await createBucketResource(mockContext, bucket, initialState);

      // Primary domain bound
      expect(mockOssOperations.bindCustomDomain).toHaveBeenCalledWith(
        'test-bucket',
        'example.com',
        undefined,
      );
      // www variant bound
      expect(mockOssOperations.bindCustomDomain).toHaveBeenCalledWith(
        'test-bucket',
        'www.example.com',
        undefined,
      );

      const instances = result.resources['buckets.test_bucket'].instances;
      const dnsInstances = instances.filter(
        (i: Record<string, unknown>) => i.type === 'ALIYUN_OSS_DNS_CNAME',
      );
      expect(dnsInstances).toHaveLength(2);

      const primaryDns = dnsInstances.find(
        (i: Record<string, unknown>) => i.domain === 'example.com',
      );
      expect(primaryDns).toEqual(
        expect.objectContaining({
          dnsRecordId: 'dns-123',
          txtRecordId: 'txt-456',
          domain: 'example.com',
        }),
      );

      const wwwDns = dnsInstances.find(
        (i: Record<string, unknown>) => i.domain === 'www.example.com',
      );
      expect(wwwDns).toEqual(
        expect.objectContaining({
          dnsRecordId: 'dns-www-789',
          txtRecordId: 'txt-www-012',
          domain: 'www.example.com',
          isWwwVariant: true,
        }),
      );
    });

    it('should handle wwwCnameInfo returning null', async () => {
      const bucket: BucketDomain = {
        ...baseBucket,
        website: {
          ...baseBucket.website!,
          domain: 'example.com',
          www_bind_apex: true,
        },
      };

      mockOssOperations.createBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.getBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.bindCustomDomain
        .mockResolvedValueOnce({
          domain: 'example.com',
          cname: 'test-bucket.oss-cn-hangzhou.aliyuncs.com',
          bucketCnameBound: true,
        })
        .mockResolvedValueOnce(null);
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      const result = await createBucketResource(mockContext, bucket, initialState);

      const instances = result.resources['buckets.test_bucket'].instances;
      const dnsInstances = instances.filter(
        (i: Record<string, unknown>) => i.type === 'ALIYUN_OSS_DNS_CNAME',
      );
      // Only primary domain, www was null
      expect(dnsInstances).toHaveLength(1);
    });

    it('should handle primary cnameInfo returning null', async () => {
      const bucket: BucketDomain = {
        ...baseBucket,
        website: {
          ...baseBucket.website!,
          domain: 'example.com',
        },
      };

      mockOssOperations.createBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.getBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.bindCustomDomain.mockResolvedValue(null);
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      const result = await createBucketResource(mockContext, bucket, initialState);

      const instances = result.resources['buckets.test_bucket'].instances;
      const dnsInstances = instances.filter(
        (i: Record<string, unknown>) => i.type === 'ALIYUN_OSS_DNS_CNAME',
      );
      expect(dnsInstances).toHaveLength(0);
    });

    it('should refresh bucket info after domain binding when getBucket returns null', async () => {
      const bucket: BucketDomain = {
        ...baseBucket,
        website: {
          ...baseBucket.website!,
          domain: 'example.com',
        },
      };

      mockOssOperations.createBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.getBucket
        .mockResolvedValueOnce(baseBucketInfo) // initial getBucket
        .mockResolvedValueOnce(null); // refresh after domain binding returns null
      mockOssOperations.bindCustomDomain.mockResolvedValue({
        domain: 'example.com',
        cname: 'test-bucket.oss-cn-hangzhou.aliyuncs.com',
        bucketCnameBound: true,
      });
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      // Should not throw — null refresh after domain binding just skips instance update
      const result = await createBucketResource(mockContext, bucket, initialState);
      expect(result.resources['buckets.test_bucket']).toBeDefined();
    });

    it('should upload files and refresh state after upload', async () => {
      mockOssOperations.createBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.getBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.uploadFiles.mockResolvedValue(undefined);
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      await createBucketResource(mockContext, baseBucket, initialState);

      expect(mockOssOperations.uploadFiles).toHaveBeenCalledWith(
        'test-bucket',
        expect.stringContaining('dist'),
      );
      // getBucket called: once for initial refresh, once after upload
      expect(mockOssOperations.getBucket).toHaveBeenCalledTimes(2);
    });

    it('should handle upload failure gracefully and still return state', async () => {
      mockOssOperations.createBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.getBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.uploadFiles.mockRejectedValue(new Error('Upload network error'));
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      const result = await createBucketResource(mockContext, baseBucket, initialState);

      expect(mockedLogger.error).toHaveBeenCalledWith(
        expect.stringContaining('Failed to upload files to bucket'),
      );
      expect(result.resources['buckets.test_bucket']).toBeDefined();
    });

    it('should handle upload success with null getBucket refresh', async () => {
      mockOssOperations.createBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.getBucket
        .mockResolvedValueOnce(baseBucketInfo) // initial
        .mockResolvedValueOnce(null); // after upload
      mockOssOperations.uploadFiles.mockResolvedValue(undefined);
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      const result = await createBucketResource(mockContext, baseBucket, initialState);
      // Should not throw, just skip refresh
      expect(result.resources['buckets.test_bucket']).toBeDefined();
    });

    it('should use dnsRecordId as instance id when cnameInfo has dnsRecordId', async () => {
      const bucket: BucketDomain = {
        ...baseBucket,
        website: {
          ...baseBucket.website!,
          domain: 'example.com',
        },
      };

      mockOssOperations.createBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.getBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.bindCustomDomain.mockResolvedValue({
        domain: 'example.com',
        cname: 'test-bucket.oss-cn-hangzhou.aliyuncs.com',
        bucketCnameBound: true,
        dnsRecordId: 'record-abc',
      });
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      const result = await createBucketResource(mockContext, bucket, initialState);

      const instances = result.resources['buckets.test_bucket'].instances;
      const dnsInstance = instances.find(
        (i: Record<string, unknown>) => i.type === 'ALIYUN_OSS_DNS_CNAME',
      );
      expect(dnsInstance).toEqual(
        expect.objectContaining({
          id: 'record-abc',
          dnsRecordId: 'record-abc',
        }),
      );
    });
  });

  describe('readBucketResource', () => {
    it('should delegate to oss.getBucket', async () => {
      const bucketInfo = { name: 'test-bucket', location: 'oss-cn-hangzhou' };
      mockOssOperations.getBucket.mockResolvedValue(bucketInfo);

      const result = await readBucketResource(mockContext, 'test-bucket');

      expect(mockOssOperations.getBucket).toHaveBeenCalledWith('test-bucket');
      expect(result).toEqual(bucketInfo);
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

    it('should throw when getBucket returns null in update', async () => {
      mockOssOperations.getBucket.mockResolvedValue(null);
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      await expect(updateBucketResource(mockContext, baseBucket, initialState)).rejects.toThrow(
        'Failed to refresh state for bucket: test-bucket',
      );
    });

    it('should skip updateBucketAcl when acl is not set', async () => {
      const bucket: BucketDomain = {
        key: 'test_bucket',
        name: 'test-bucket',
        website: {
          index: 'index.html',
          code: './dist',
          error_page: '404.html',
          error_code: 404,
        },
      };

      mockOssOperations.getBucket.mockResolvedValue(baseBucketInfo);
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      await updateBucketResource(mockContext, bucket, initialState);

      expect(mockOssOperations.updateBucketAcl).not.toHaveBeenCalled();
    });

    it('should call updateBucketAcl when acl is set', async () => {
      const bucket: BucketDomain = {
        key: 'test_bucket',
        name: 'test-bucket',
        security: {
          acl: BucketAccessEnum.PUBLIC_READ,
          force_delete: false,
        },
        website: {
          index: 'index.html',
          code: './dist',
          error_page: '404.html',
          error_code: 404,
        },
      };

      mockOssOperations.getBucket.mockResolvedValue(baseBucketInfo);
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      await updateBucketResource(mockContext, bucket, initialState);

      expect(mockOssOperations.updateBucketAcl).toHaveBeenCalledWith('test-bucket', 'public-read');
    });

    it('should unbind old domains when domain changes', async () => {
      const stateWithOldDomain: StateFile = {
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
                sid: 'aliyun:alidns:default:old.example.com',
                id: 'old.example.com',
                type: 'ALIYUN_OSS_DNS_CNAME' as const,
                domain: 'old.example.com',
                cname: 'test-bucket.oss-cn-hangzhou.aliyuncs.com',
                dnsRecordId: 'old-dns-123',
                txtRecordId: 'old-txt-456',
              },
            ],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      const bucket: BucketDomain = {
        ...baseBucket,
        website: {
          ...baseBucket.website!,
          domain: 'new.example.com',
        },
      };

      mockOssOperations.getBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.unbindCustomDomain.mockResolvedValue(undefined);
      mockOssOperations.bindCustomDomain.mockResolvedValue({
        domain: 'new.example.com',
        cname: 'test-bucket.oss-cn-hangzhou.aliyuncs.com',
        bucketCnameBound: true,
      });
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      await updateBucketResource(mockContext, bucket, stateWithOldDomain);

      expect(mockOssOperations.unbindCustomDomain).toHaveBeenCalledWith(
        'test-bucket',
        'old.example.com',
        'old-dns-123',
        'old-txt-456',
      );
      expect(mockOssOperations.bindCustomDomain).toHaveBeenCalledWith(
        'test-bucket',
        'new.example.com',
        undefined,
      );
    });

    it('should bind www domain in update when www_bind_apex is true', async () => {
      const bucket: BucketDomain = {
        ...baseBucket,
        website: {
          ...baseBucket.website!,
          domain: 'example.com',
          www_bind_apex: true,
        },
      };

      mockOssOperations.getBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.bindCustomDomain
        .mockResolvedValueOnce({
          domain: 'example.com',
          cname: 'test-bucket.oss-cn-hangzhou.aliyuncs.com',
          bucketCnameBound: true,
        })
        .mockResolvedValueOnce({
          domain: 'www.example.com',
          cname: 'test-bucket.oss-cn-hangzhou.aliyuncs.com',
          bucketCnameBound: true,
          dnsRecordId: 'www-dns-id',
        });
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      const result = await updateBucketResource(mockContext, bucket, initialState);

      expect(mockOssOperations.bindCustomDomain).toHaveBeenCalledTimes(2);
      expect(mockOssOperations.bindCustomDomain).toHaveBeenCalledWith(
        'test-bucket',
        'www.example.com',
        undefined,
      );

      const instances = result.resources['buckets.test_bucket'].instances;
      const wwwDns = instances.find((i: Record<string, unknown>) => i.isWwwVariant === true);
      expect(wwwDns).toEqual(
        expect.objectContaining({
          domain: 'www.example.com',
          isWwwVariant: true,
        }),
      );
    });

    it('should unbind existing www domain when www_bind_apex is disabled', async () => {
      const stateWithWwwDomain: StateFile = {
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
                sid: 'aliyun:alidns:default:example.com',
                id: 'example.com',
                type: 'ALIYUN_OSS_DNS_CNAME' as const,
                domain: 'example.com',
                cname: 'test-bucket.oss-cn-hangzhou.aliyuncs.com',
              },
              {
                sid: 'aliyun:alidns:default:www.example.com',
                id: 'www.example.com',
                type: 'ALIYUN_OSS_DNS_CNAME' as const,
                domain: 'www.example.com',
                cname: 'test-bucket.oss-cn-hangzhou.aliyuncs.com',
                isWwwVariant: true,
                dnsRecordId: 'www-dns-record',
                txtRecordId: 'www-txt-record',
              },
            ],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      const bucket: BucketDomain = {
        ...baseBucket,
        website: {
          ...baseBucket.website!,
          domain: 'example.com',
          www_bind_apex: false,
        },
      };

      mockOssOperations.getBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.bindCustomDomain.mockResolvedValue({
        domain: 'example.com',
        cname: 'test-bucket.oss-cn-hangzhou.aliyuncs.com',
        bucketCnameBound: true,
      });
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      await updateBucketResource(mockContext, bucket, stateWithWwwDomain);

      expect(mockOssOperations.unbindCustomDomain).toHaveBeenCalledWith(
        'test-bucket',
        'www.example.com',
        'www-dns-record',
        'www-txt-record',
      );
    });

    it('should unbind all DNS when domain is removed entirely', async () => {
      const stateWithDnsInstances: StateFile = {
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
                sid: 'aliyun:alidns:default:example.com',
                id: 'example.com',
                type: 'ALIYUN_OSS_DNS_CNAME' as const,
                domain: 'example.com',
                cname: 'test-bucket.oss-cn-hangzhou.aliyuncs.com',
                dnsRecordId: 'dns-1',
              },
              {
                sid: 'aliyun:alidns:default:www.example.com',
                id: 'www.example.com',
                type: 'ALIYUN_OSS_DNS_CNAME' as const,
                domain: 'www.example.com',
                cname: 'test-bucket.oss-cn-hangzhou.aliyuncs.com',
                isWwwVariant: true,
                dnsRecordId: 'dns-2',
                txtRecordId: 'txt-2',
              },
            ],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      const bucketNoDomain: BucketDomain = {
        ...baseBucket,
        website: {
          index: 'index.html',
          code: './dist',
          error_page: '404.html',
          error_code: 404,
        },
      };

      mockOssOperations.getBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.unbindCustomDomain.mockResolvedValue(undefined);
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      await updateBucketResource(mockContext, bucketNoDomain, stateWithDnsInstances);

      expect(mockOssOperations.unbindCustomDomain).toHaveBeenCalledTimes(2);
      expect(mockOssOperations.unbindCustomDomain).toHaveBeenCalledWith(
        'test-bucket',
        'example.com',
        'dns-1',
        undefined,
      );
      expect(mockOssOperations.unbindCustomDomain).toHaveBeenCalledWith(
        'test-bucket',
        'www.example.com',
        'dns-2',
        'txt-2',
      );
      expect(mockOssOperations.bindCustomDomain).not.toHaveBeenCalled();
    });

    it('should handle refreshedInfo null after domain binding in update', async () => {
      const bucket: BucketDomain = {
        ...baseBucket,
        website: {
          ...baseBucket.website!,
          domain: 'example.com',
        },
      };

      mockOssOperations.getBucket
        .mockResolvedValueOnce(baseBucketInfo) // initial getBucket
        .mockResolvedValueOnce(null); // refresh after domain binding
      mockOssOperations.bindCustomDomain.mockResolvedValue({
        domain: 'example.com',
        cname: 'test-bucket.oss-cn-hangzhou.aliyuncs.com',
        bucketCnameBound: true,
      });
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      const result = await updateBucketResource(mockContext, bucket, initialState);
      expect(result.resources['buckets.test_bucket']).toBeDefined();
    });

    it('should resolve certificate by ID in update', async () => {
      const bucket: BucketDomain = {
        ...baseBucket,
        website: {
          ...baseBucket.website!,
          domain: 'www.example.com',
          domain_certificate_id: 'cert-999',
        },
      };

      mockCasOperations.getCertificate.mockResolvedValue({
        cert: '-----BEGIN CERTIFICATE-----\nCERT\n-----END CERTIFICATE-----',
        key: '-----BEGIN RSA PRIVATE KEY-----\nKEY\n-----END RSA PRIVATE KEY-----',
      });
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

      await updateBucketResource(mockContext, bucket, initialState);

      expect(mockCasOperations.getCertificate).toHaveBeenCalledWith('cert-999');
      expect(mockOssOperations.bindCustomDomain).toHaveBeenCalledWith(
        'test-bucket',
        'www.example.com',
        {
          certificateBody: '-----BEGIN CERTIFICATE-----\nCERT\n-----END CERTIFICATE-----',
          certificatePrivateKey:
            '-----BEGIN RSA PRIVATE KEY-----\nKEY\n-----END RSA PRIVATE KEY-----',
        },
      );
    });

    it('should throw when certificate reference returns null in update', async () => {
      const bucket: BucketDomain = {
        ...baseBucket,
        website: {
          ...baseBucket.website!,
          domain: 'www.example.com',
          domain_certificate_id: 'missing-cert',
        },
      };

      mockOssOperations.getBucket.mockResolvedValue(baseBucketInfo);
      mockCasOperations.getCertificate.mockResolvedValue(null);
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      await expect(updateBucketResource(mockContext, bucket, initialState)).rejects.toThrow();
    });

    it('should throw when certificate reference has missing key', async () => {
      const bucket: BucketDomain = {
        ...baseBucket,
        website: {
          ...baseBucket.website!,
          domain: 'www.example.com',
          domain_certificate_id: 'cert-no-key',
        },
      };

      mockOssOperations.getBucket.mockResolvedValue(baseBucketInfo);
      mockCasOperations.getCertificate.mockResolvedValue({
        cert: '-----BEGIN CERTIFICATE-----\nCERT\n-----END CERTIFICATE-----',
        key: null,
      });
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      await expect(updateBucketResource(mockContext, bucket, initialState)).rejects.toThrow();
    });

    it('should handle wwwCnameInfo returning null in update', async () => {
      const bucket: BucketDomain = {
        ...baseBucket,
        website: {
          ...baseBucket.website!,
          domain: 'example.com',
          www_bind_apex: true,
        },
      };

      mockOssOperations.getBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.bindCustomDomain
        .mockResolvedValueOnce({
          domain: 'example.com',
          cname: 'test-bucket.oss-cn-hangzhou.aliyuncs.com',
          bucketCnameBound: true,
        })
        .mockResolvedValueOnce(null);
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      const result = await updateBucketResource(mockContext, bucket, initialState);

      const instances = result.resources['buckets.test_bucket'].instances;
      const wwwDns = instances.find((i: Record<string, unknown>) => i.isWwwVariant === true);
      expect(wwwDns).toBeUndefined();
    });
  });
});
