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
  PartialResourceError,
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
  enableTransferAcceleration: jest.fn(),
  getAccelerateEndpoint: jest.fn(),
  getBucketCnameEndpoint: jest.fn().mockResolvedValue('test-bucket.oss-cn-hangzhou.aliyuncs.com'),
  putBucketPolicy: jest.fn(),
  deleteBucketPolicy: jest.fn(),
};

// getBucket mocks for createBucketResource must return a bucket carrying our
// ownership tag, or the after-create ownership verification refuses it.
const taggedBucketInfo = (
  info: Record<string, unknown>,
  logicalId: string,
): Record<string, unknown> => ({
  ...info,
  tags: [{ key: 'si-owned-by', value: `test-app-test-service:${logicalId}` }],
});

const mockCasOperations = {
  getCertificate: jest.fn(),
  uploadCertificate: jest.fn(),
  deleteCertificate: jest.fn(),
};

const mockCdnOperations = {
  addCdnDomain: jest.fn(),
  describeCdnDomainDetail: jest.fn(),
  deleteCdnDomain: jest.fn(),
  modifyCdnDomain: jest.fn(),
  setDomainServerCertificate: jest.fn(),
  applyCacheConfig: jest.fn(),
  applyProtocolConfig: jest.fn(),
  applyCompression: jest.fn(),
  applyHttpsRedirect: jest.fn(),
};

const mockDnsOperations = {
  addDomainRecord: jest.fn().mockResolvedValue('dns-record-id'),
  deleteDomainRecord: jest.fn(),
  describeDomainRecords: jest.fn(),
  checkDomainRecordExists: jest.fn(),
};

const mockedStateManager = {
  setResource: jest.fn(),
  removeResource: jest.fn(),
  getResource: jest.fn(),
};

const mockedLogger = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};

jest.mock('../../../../src/common/hashUtils', () => ({
  computeDirectoryHash: jest.fn().mockReturnValue('hash-abc'),
  computeFileHash: jest.fn().mockReturnValue('file-hash'),
  attributesEqual: jest.requireActual('../../../../src/common/hashUtils').attributesEqual,
}));

jest.mock('../../../../src/common/aliyunClient', () => ({
  createAliyunClient: () => ({
    oss: mockOssOperations,
    cas: mockCasOperations,
    cdn: mockCdnOperations,
    dns: mockDnsOperations,
  }),
}));

jest.mock('../../../../src/common/stateManager', () => ({
  ...jest.requireActual('../../../../src/common/stateManager'),
  setResource: (...args: unknown[]) => mockedStateManager.setResource(...args),
  removeResource: (...args: unknown[]) => mockedStateManager.removeResource(...args),
  getResource: (...args: unknown[]) => mockedStateManager.getResource(...args),
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
    mockedStateManager.getResource.mockReturnValue(undefined);
  });

  it('keeps declared CDN bindings and converges removed ones by hostname', async () => {
    const state: StateFile = {
      ...initialState,
      resources: {
        'buckets.assets': {
          mode: 'managed',
          region: mockContext.region,
          lastUpdated: '',
          definition: {
            bucketName: 'assets',
            domains: [
              { domain_name: 'example.com', cdn: { enabled: true, cache_ttl: 60 } },
              { domain_name: 'www.example.com', cdn: { enabled: true, cache_ttl: 60 } },
            ],
            accelerate: false,
            policy: '{"Statement":[]}',
          },
          instances: [
            {
              sid: 'apex-cdn',
              id: 'example.com',
              type: 'ALIYUN_CDN_DISTRIBUTION',
              domainName: 'example.com',
            },
            {
              sid: 'apex-dns',
              id: 'apex',
              type: 'ALIYUN_CDN_DNS_CNAME',
              domain: 'example.com',
              dnsRecordId: 'apex',
            },
            {
              sid: 'www-cdn',
              id: 'www.example.com',
              type: 'ALIYUN_CDN_DISTRIBUTION',
              domainName: 'www.example.com',
            },
            {
              sid: 'www-dns',
              id: 'www',
              type: 'ALIYUN_CDN_DNS_CNAME',
              domain: 'www.example.com',
              dnsRecordId: 'www',
            },
            { sid: 'policy', id: 'assets', type: 'ALIYUN_OSS_BUCKET_POLICY' },
          ],
        },
      },
    };
    mockOssOperations.getBucket.mockResolvedValue({ name: 'assets' });
    await updateBucketResource(
      mockContext,
      {
        key: 'assets',
        name: 'assets',
        domains: [{ domain_name: 'example.com', cdn: { enabled: true, cache_ttl: 120 } }],
      },
      state,
    );
    const saved = mockedStateManager.setResource.mock.calls.at(-1)?.[2];
    expect(mockOssOperations.deleteBucketPolicy).toHaveBeenCalledWith('assets');
    // Removed www binding is torn down...
    expect(mockCdnOperations.deleteCdnDomain).toHaveBeenCalledWith('www.example.com');
    expect(mockDnsOperations.deleteDomainRecord).toHaveBeenCalledWith('www');
    // ...and its instances disappear from saved state.
    expect(saved.instances.some((instance: { sid: string }) => instance.sid === 'www-dns')).toBe(
      false,
    );
    expect(saved.instances.some((instance: { sid: string }) => instance.sid === 'www-cdn')).toBe(
      false,
    );
    // Kept binding preserves its recorded instances (no recreation).
    expect(saved.instances.some((instance: { sid: string }) => instance.sid === 'apex-dns')).toBe(
      true,
    );
    // Binding list is canonicalized (sorted by hostname) in the saved intent.
    expect(saved.definition.domains).toEqual([
      {
        domain_name: 'example.com',
        certificate_id: null,
        certificate_body: null,
        certificate_private_key: null,
        protocol: null,
        cdn: { enabled: true, cdn_type: 'web', scope: 'global', cache_ttl: 120 },
      },
    ]);
    expect(mockCdnOperations.modifyCdnDomain).not.toHaveBeenCalled();
    expect(mockCdnOperations.applyCacheConfig).toHaveBeenCalledWith('example.com', 120, undefined);
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

    it('should propagate CDN delete failure and not remove resource from state', async () => {
      const bucketName = 'test-bucket';
      const logicalId = 'buckets.test_bucket';
      const stateWithCdn: StateFile = {
        ...initialState,
        resources: {
          [logicalId]: {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: {},
            instances: [
              { sid: 'oss-sid', id: bucketName, type: 'ALIYUN_OSS_BUCKET' },
              {
                sid: 'cdn-sid',
                id: 'example.com',
                type: 'ALIYUN_CDN_DISTRIBUTION',
                domainName: 'example.com',
              },
            ],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      mockCdnOperations.deleteCdnDomain.mockRejectedValue(new Error('CDN delete failed'));

      await expect(
        deleteBucketResource(mockContext, bucketName, logicalId, stateWithCdn),
      ).rejects.toThrow('CDN delete failed');
      expect(mockedStateManager.removeResource).not.toHaveBeenCalled();
      expect(mockOssOperations.deleteBucket).not.toHaveBeenCalled();
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
          website: { index: 'index.html', code: './dist' },
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
          website: { index: 'index.html', code: './dist' },
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
          website: { index: 'index.html', code: './dist' },
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
          website: { index: 'index.html', code: './dist' },
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
          website: { index: 'index.html', code: './dist' },
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
          website: { index: 'index.html', code: './dist' },
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
          website: { index: 'index.html', code: './dist' },
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
          website: { index: 'index.html', code: './dist' },
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
          website: { index: 'index.html', code: './dist' },
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
          website: { index: 'index.html', code: './dist' },
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
    // A bucket created by THIS stack carries the ownership tag, so fresh-create
    // verification (getBucket after an idempotent PutBucket) passes.
    const baseBucketInfo = {
      name: 'test-bucket',
      location: 'oss-cn-hangzhou',
      acl: 'private',
      storageClass: 'Standard',
      tags: [{ key: 'si-owned-by', value: 'test-app-test-service:buckets.test_bucket' }],
    };

    const baseBucket: BucketDomain = {
      key: 'test_bucket',
      name: 'test-bucket',
      website: {
        index: 'index.html',
        code: './dist',
      },
    };

    it('should create bucket with domain bindings and certificate', async () => {
      const bucket: BucketDomain = {
        ...baseBucket,
        domains: [
          {
            domain_name: 'www.example.com',
            certificate_body: '-----BEGIN CERTIFICATE-----\nMOCK\n-----END CERTIFICATE-----',
            certificate_private_key:
              '-----BEGIN RSA PRIVATE KEY-----\nMOCK\n-----END RSA PRIVATE KEY-----',
          },
        ],
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

    it('should create bucket with a binding but no certificate', async () => {
      const bucket: BucketDomain = {
        ...baseBucket,
        domains: [{ domain_name: 'www.example.com' }],
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
        domains: [{ domain_name: 'www.example.com', certificate_id: 'nonexistent-cert-id' }],
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
        domains: [{ domain_name: 'www.example.com', certificate_id: '12345' }],
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

    it('should throw PartialResourceError with tainted state when transfer acceleration fails after bucket creation', async () => {
      const bucket: BucketDomain = {
        ...baseBucket,
        accelerate: true,
      };

      mockOssOperations.createBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.getBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.enableTransferAcceleration.mockRejectedValue(new Error('Create failed'));
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      const error = await createBucketResource(mockContext, bucket, initialState).catch(
        (e: unknown) => e,
      );

      expect(error).toBeInstanceOf(PartialResourceError);
      const partialError = error as PartialResourceError;
      expect(partialError.updatedState.resources['buckets.test_bucket']).toMatchObject({
        status: 'tainted',
      });
      expect(partialError.cause.message).toBe('Create failed');
    });

    it('should bind multiple explicit domain bindings', async () => {
      const bucket: BucketDomain = {
        ...baseBucket,
        domains: [{ domain_name: 'example.com' }, { domain_name: 'www.example.com' }],
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
        }),
      );
    });

    it('should handle second binding cnameInfo returning null', async () => {
      const bucket: BucketDomain = {
        ...baseBucket,
        domains: [{ domain_name: 'example.com' }, { domain_name: 'www.example.com' }],
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

    it('should handle binding cnameInfo returning null', async () => {
      const bucket: BucketDomain = {
        ...baseBucket,
        domains: [{ domain_name: 'example.com' }],
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

    it('should refresh bucket info after binding when getBucket returns null', async () => {
      const bucket: BucketDomain = {
        ...baseBucket,
        domains: [{ domain_name: 'example.com' }],
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

    it('should throw PartialResourceError with tainted state when upload fails', async () => {
      mockOssOperations.createBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.getBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.uploadFiles.mockRejectedValue(new Error('Upload network error'));
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      const error = await createBucketResource(mockContext, baseBucket, initialState).catch(
        (e: unknown) => e,
      );

      expect(error).toBeInstanceOf(PartialResourceError);
      const partialError = error as PartialResourceError;
      expect(partialError.updatedState.resources['buckets.test_bucket']).toMatchObject({
        status: 'tainted',
      });
      // Bucket instance present in the tainted state so a retry can recover it
      expect(partialError.updatedState.resources['buckets.test_bucket'].instances).toHaveLength(1);
      expect(partialError.cause.message).toBe('Upload network error');
      // The swallowed-upload path previously wrote a 'ready' state — never again
      const readyCalls = mockedStateManager.setResource.mock.calls.filter(
        ([, , resourceState]) => (resourceState as { status?: string }).status === 'ready',
      );
      expect(readyCalls).toHaveLength(0);
    });

    it('should skip createBucket and retry upload when tainted and bucket exists in provider', async () => {
      mockOssOperations.getBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.uploadFiles.mockResolvedValue(undefined);
      mockedStateManager.getResource.mockReturnValueOnce({
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {},
        instances: [],
        lastUpdated: new Date().toISOString(),
        status: 'tainted',
      });
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      const result = await createBucketResource(mockContext, baseBucket, initialState);

      expect(mockOssOperations.createBucket).not.toHaveBeenCalled();
      expect(mockOssOperations.uploadFiles).toHaveBeenCalledWith(
        'test-bucket',
        expect.stringContaining('dist'),
      );
      expect(result.resources['buckets.test_bucket'].instances).toHaveLength(1);
    });

    it('should create bucket when tainted but bucket absent in provider', async () => {
      mockOssOperations.getBucket
        .mockResolvedValueOnce(null) // pre-flight: no existing bucket in provider
        .mockResolvedValue(baseBucketInfo);
      mockOssOperations.createBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.uploadFiles.mockResolvedValue(undefined);
      mockedStateManager.getResource.mockReturnValueOnce({
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {},
        instances: [],
        lastUpdated: new Date().toISOString(),
        status: 'tainted',
      });
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      const result = await createBucketResource(mockContext, baseBucket, initialState);

      expect(mockOssOperations.createBucket).toHaveBeenCalledWith(
        expect.objectContaining({ bucketName: 'test-bucket' }),
      );
      expect(result.resources['buckets.test_bucket'].instances).toHaveLength(1);
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
        domains: [{ domain_name: 'example.com' }],
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

    it('should stamp the ownership tag into the create bucket config', async () => {
      mockOssOperations.createBucket.mockResolvedValue(baseBucketInfo);
      mockOssOperations.getBucket.mockResolvedValue(baseBucketInfo);
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      await createBucketResource(mockContext, baseBucket, initialState);

      expect(mockOssOperations.createBucket).toHaveBeenCalledWith(
        expect.objectContaining({
          Tags: [
            { Key: 'si-owned-by', Value: 'test-app-test-service:buckets.test_bucket@cn-hangzhou' },
          ],
        }),
      );
    });

    it('should idempotently adopt an existing bucket that carries our ownership tag on collision', async () => {
      const existsError = Object.assign(new Error('The specified bucket already exists.'), {
        code: 'BucketAlreadyExists',
      });
      mockOssOperations.createBucket.mockRejectedValue(existsError);
      // Collision probe returns the tagged bucket → adopted, flow continues
      mockOssOperations.getBucket.mockResolvedValue(baseBucketInfo);
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      const result = await createBucketResource(mockContext, baseBucket, initialState);

      expect(mockOssOperations.createBucket).toHaveBeenCalledTimes(1);
      expect(result.resources['buckets.test_bucket']).toBeDefined();
    });

    it('should reject adoption on collision when existing bucket lacks our ownership tag', async () => {
      const existsError = Object.assign(new Error('The specified bucket already exists.'), {
        code: 'BucketAlreadyExists',
      });
      mockOssOperations.createBucket.mockRejectedValue(existsError);
      mockOssOperations.getBucket.mockResolvedValue({
        ...baseBucketInfo,
        tags: [{ key: 'other-project-tag', value: 'someone-else' }],
      });
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      await expect(
        createBucketResource(mockContext, baseBucket, initialState),
      ).rejects.toMatchObject({
        name: 'PartialResourceError',
        cause: { message: expect.stringContaining('not owned by this stack') },
      });
    });

    it('should refuse a bucket that pre-existed untagged even when createBucket succeeds idempotently', async () => {
      mockOssOperations.createBucket.mockResolvedValue(baseBucketInfo);
      // PutBucket is idempotent within region/account, so success does not prove
      // we created it — an untagged bucket read back afterwards is refused.
      mockOssOperations.getBucket.mockResolvedValue({
        ...baseBucketInfo,
        tags: [],
      });
      mockedStateManager.setResource.mockImplementation(
        (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
          ...initialState,
          resources: { 'buckets.test_bucket': resourceState },
        }),
      );

      await expect(
        createBucketResource(mockContext, baseBucket, initialState),
      ).rejects.toMatchObject({
        name: 'PartialResourceError',
        cause: { message: expect.stringContaining('not owned by this stack') },
      });
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
      },
    };

    const stateWithDomain: StateFile = {
      ...initialState,
      resources: {
        'buckets.test_bucket': {
          mode: 'managed',
          region: 'cn-hangzhou',
          definition: {
            domains: [{ domain_name: 'www.example.com', cdn: null }],
            accelerate: false,
          },
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

    it('should update bucket with certificate on existing binding', async () => {
      const bucket: BucketDomain = {
        ...baseBucket,
        domains: [
          {
            domain_name: 'www.example.com',
            certificate_body: '-----BEGIN CERTIFICATE-----\nUPDATED\n-----END CERTIFICATE-----',
            certificate_private_key:
              '-----BEGIN RSA PRIVATE KEY-----\nUPDATED_KEY\n-----END RSA PRIVATE KEY-----',
          },
        ],
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

    it('should update bucket with a binding but no certificate (cert removed)', async () => {
      const bucket: BucketDomain = {
        ...baseBucket,
        domains: [{ domain_name: 'www.example.com' }],
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

    it('should converge a removed binding and bind the new one', async () => {
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
        domains: [{ domain_name: 'new.example.com' }],
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

    it('should add a new binding during update', async () => {
      const bucket: BucketDomain = {
        ...baseBucket,
        domains: [{ domain_name: 'example.com' }, { domain_name: 'www.example.com' }],
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
      const wwwDns = instances.find((i: Record<string, unknown>) => i.domain === 'www.example.com');
      expect(wwwDns).toEqual(expect.objectContaining({ domain: 'www.example.com' }));
    });

    it('should migrate legacy single-domain state (incl. www variant) to bindings without recreating', async () => {
      // Pre-v1 state: flat definition keys + instances recorded for the apex and
      // the www variant derived from www_bind_apex. The v1 domains list declares
      // both hosts explicitly — the reconcile must re-bind in place, never
      // unbind/recreate.
      const legacyState: StateFile = {
        ...initialState,
        resources: {
          'buckets.test_bucket': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: {
              domain: 'example.com',
              wwwBindApex: true,
            },
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
              },
            ],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      const bucket: BucketDomain = {
        ...baseBucket,
        domains: [{ domain_name: 'example.com' }, { domain_name: 'www.example.com' }],
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

      await updateBucketResource(mockContext, bucket, legacyState);

      // Both bindings re-bound in place; nothing torn down.
      expect(mockOssOperations.bindCustomDomain).toHaveBeenCalledTimes(2);
      expect(mockOssOperations.unbindCustomDomain).not.toHaveBeenCalled();
    });

    it('unbinds DNS records recorded in state when the domain is removed', async () => {
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
      expect(mockOssOperations.bindCustomDomain).not.toHaveBeenCalled();
    });

    it('should handle refreshedInfo null after binding in update', async () => {
      const bucket: BucketDomain = {
        ...baseBucket,
        domains: [{ domain_name: 'example.com' }],
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
        domains: [{ domain_name: 'www.example.com', certificate_id: 'cert-999' }],
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
        domains: [{ domain_name: 'www.example.com', certificate_id: 'missing-cert' }],
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
        domains: [{ domain_name: 'www.example.com', certificate_id: 'cert-no-key' }],
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

    it('should handle second binding cnameInfo returning null in update', async () => {
      const bucket: BucketDomain = {
        ...baseBucket,
        domains: [{ domain_name: 'example.com' }, { domain_name: 'www.example.com' }],
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
      const wwwDns = instances.find((i: Record<string, unknown>) => i.domain === 'www.example.com');
      expect(wwwDns).toBeUndefined();
    });
  });

  describe('CDN batch coverage', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      mockCdnOperations.addCdnDomain.mockResolvedValue({});
      mockCdnOperations.describeCdnDomainDetail.mockResolvedValue({
        domainName: 'x.com',
        cname: 'x.cdn.com',
        status: 'online',
      });
      mockCdnOperations.setDomainServerCertificate.mockResolvedValue({});
      mockCdnOperations.deleteCdnDomain.mockResolvedValue({});
      mockCdnOperations.applyCacheConfig.mockResolvedValue({});
      mockCdnOperations.applyProtocolConfig.mockResolvedValue({});
      mockCdnOperations.applyCompression.mockResolvedValue({});
      mockCdnOperations.applyHttpsRedirect.mockResolvedValue({});
      mockCdnOperations.modifyCdnDomain.mockResolvedValue({});
      mockOssOperations.createBucket.mockResolvedValue({ name: 'tb', location: 'oss-cn-hangzhou' });
      mockOssOperations.getBucket.mockResolvedValue(
        taggedBucketInfo({ name: 'tb', location: 'oss-cn-hangzhou' }, 'buckets.b'),
      );
      mockOssOperations.bindCustomDomain.mockResolvedValue({
        domain: 'x.com',
        cname: 'bkt.oss.com',
        bucketCnameBound: true,
      });
      mockOssOperations.enableTransferAcceleration.mockResolvedValue(true);
      mockOssOperations.getAccelerateEndpoint.mockResolvedValue('bkt.oss-accelerate.aliyuncs.com');
      mockDnsOperations.addDomainRecord.mockResolvedValue('did');
      mockedStateManager.setResource.mockImplementation((_s, _l, rs) => ({
        ..._s,
        resources: { b: rs },
      }));
    });

    it('CDN boolean true creates distribution', async () => {
      const b: BucketDomain = {
        key: 'b',
        name: 'tb',
        security: { acl: BucketAccessEnum.PUBLIC_READ, force_delete: false },
        website: { code: './d', index: 'i.html' },
        domains: [{ domain_name: 'x.com', cdn: true }],
      };
      await createBucketResource(mockContext, b, initialState);
      expect(mockCdnOperations.addCdnDomain).toHaveBeenCalled();
    });

    it('Bucket accelerate with non-CDN binding points DNS at the accelerate endpoint', async () => {
      const b: BucketDomain = {
        key: 'b',
        name: 'tb',
        security: { acl: BucketAccessEnum.PUBLIC_READ, force_delete: false },
        website: { code: './d', index: 'i.html' },
        accelerate: true,
        domains: [{ domain_name: 'x.com' }],
      };
      await createBucketResource(mockContext, b, initialState);
      expect(mockOssOperations.enableTransferAcceleration).toHaveBeenCalled();
      expect(mockCdnOperations.addCdnDomain).not.toHaveBeenCalled();
      expect(mockOssOperations.bindCustomDomain).not.toHaveBeenCalled();
      expect(mockDnsOperations.addDomainRecord).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'CNAME', value: 'bkt.oss-accelerate.aliyuncs.com' }),
      );
    });

    it('No CDN no accelerate uses direct binding', async () => {
      const b: BucketDomain = {
        key: 'b',
        name: 'tb',
        security: { acl: BucketAccessEnum.PUBLIC_READ, force_delete: false },
        website: { code: './d', index: 'i.html' },
        domains: [{ domain_name: 'x.com' }],
      };
      await createBucketResource(mockContext, b, initialState);
      expect(mockOssOperations.bindCustomDomain).toHaveBeenCalled();
    });

    it('CDN bindings create one distribution per hostname', async () => {
      const b: BucketDomain = {
        key: 'b',
        name: 'tb',
        security: { acl: BucketAccessEnum.PUBLIC_READ, force_delete: false },
        website: { code: './d', index: 'i.html' },
        domains: [
          { domain_name: 'example.com', cdn: true },
          { domain_name: 'www.example.com', cdn: true },
        ],
      };
      await createBucketResource(mockContext, b, initialState);
      expect(mockCdnOperations.addCdnDomain).toHaveBeenCalledTimes(2);
      expect(mockCdnOperations.addCdnDomain).toHaveBeenCalledWith(
        expect.objectContaining({ domainName: 'www.example.com' }),
      );
    });

    it('CDN delete via deleteBucketResource', async () => {
      const state: StateFile = {
        ...initialState,
        resources: {
          'buckets.b': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: { bucketName: 'tb' },
            instances: [
              { sid: 's', id: 'tb', type: 'ALIYUN_OSS_BUCKET', bucketName: 'tb' },
              { sid: 'c', id: 'x.com', type: 'ALIYUN_CDN_DISTRIBUTION', domainName: 'x.com' },
              {
                sid: 'd',
                id: 'did',
                type: 'ALIYUN_CDN_DNS_CNAME',
                domain: 'x.com',
                dnsRecordId: 'did',
              },
            ],
            lastUpdated: new Date().toISOString(),
          },
        },
      };
      mockOssOperations.getBucket.mockResolvedValue(null);
      await deleteBucketResource(mockContext, 'tb', 'buckets.b', state);
      expect(mockCdnOperations.deleteCdnDomain).toHaveBeenCalledWith('x.com');
    });
  });

  describe('CDN integration tests', () => {
    const baseInfo = { name: 'tb', location: 'oss-cn-hangzhou', acl: 'private' };

    beforeEach(() => {
      jest.clearAllMocks();
      mockCdnOperations.addCdnDomain.mockResolvedValue({});
      mockCdnOperations.describeCdnDomainDetail.mockResolvedValue({
        domainName: 'x.com',
        cname: 'x.cdn.com',
        status: 'online',
      });
      mockCdnOperations.deleteCdnDomain.mockResolvedValue({});
      mockCdnOperations.setDomainServerCertificate.mockResolvedValue({});
      mockOssOperations.createBucket.mockResolvedValue(baseInfo);
      mockOssOperations.getBucket.mockResolvedValue(taggedBucketInfo(baseInfo, 'buckets.b'));
      mockOssOperations.bindCustomDomain.mockResolvedValue({
        domain: 'x.com',
        cname: 'b.oss.com',
        bucketCnameBound: true,
      });
      mockOssOperations.enableTransferAcceleration.mockResolvedValue(true);
      mockOssOperations.getAccelerateEndpoint.mockResolvedValue('b.oss-accelerate.aliyuncs.com');
      mockDnsOperations.addDomainRecord.mockResolvedValue('did');
      mockedStateManager.setResource.mockImplementation((_s, _l, rs) => ({
        ..._s,
        resources: { b: rs },
      }));
    });

    function makeBucket(overrides: Partial<BucketDomain> = {}): BucketDomain {
      return {
        key: 'b',
        name: 'tb',
        security: { acl: BucketAccessEnum.PUBLIC_READ, force_delete: false },
        ...overrides,
      };
    }

    it('CDN true creates distribution', async () => {
      const b = makeBucket({ domains: [{ domain_name: 'x.com', cdn: true }] });
      await createBucketResource(mockContext, b, initialState);
      expect(mockCdnOperations.addCdnDomain).toHaveBeenCalledWith(
        expect.objectContaining({ domainName: 'x.com', cdnType: 'web' }),
      );
    });

    it('Bucket accelerate calls enableTransferAcceleration once', async () => {
      const b = makeBucket({ accelerate: true, domains: [{ domain_name: 'x.com' }] });
      await createBucketResource(mockContext, b, initialState);
      expect(mockOssOperations.enableTransferAcceleration).toHaveBeenCalled();
      expect(mockCdnOperations.addCdnDomain).not.toHaveBeenCalled();
    });

    it('two explicit CDN bindings create two distributions', async () => {
      const b = makeBucket({
        domains: [
          { domain_name: 'example.com', cdn: true },
          { domain_name: 'www.example.com', cdn: true },
        ],
      });
      await createBucketResource(mockContext, b, initialState);
      expect(mockCdnOperations.addCdnDomain).toHaveBeenCalledTimes(2);
    });

    it('CDN delete cleans up distribution', async () => {
      const state: StateFile = {
        ...initialState,
        resources: {
          'buckets.b': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: {},
            instances: [
              { sid: 's', id: 'tb', type: 'ALIYUN_OSS_BUCKET', bucketName: 'tb' },
              { sid: 'c', id: 'x.com', type: 'ALIYUN_CDN_DISTRIBUTION', domainName: 'x.com' },
              {
                sid: 'd',
                id: 'dns',
                type: 'ALIYUN_CDN_DNS_CNAME',
                domain: 'x.com',
                dnsRecordId: 'dns',
              },
            ],
            lastUpdated: new Date().toISOString(),
          },
        },
      };
      mockOssOperations.getBucket.mockResolvedValue(null);
      await deleteBucketResource(mockContext, 'tb', 'buckets.b', state);
      expect(mockCdnOperations.deleteCdnDomain).toHaveBeenCalledWith('x.com');
    });
  });

  describe('CDN coverage', () => {
    function mkBucket(overrides: Record<string, unknown> = {}): BucketDomain {
      return {
        key: 'b',
        name: 'tb',
        security: { acl: BucketAccessEnum.PUBLIC_READ, force_delete: false },
        ...overrides,
      } as BucketDomain;
    }

    beforeEach(() => {
      jest.clearAllMocks();
      mockCdnOperations.addCdnDomain.mockResolvedValue({});
      mockCdnOperations.describeCdnDomainDetail.mockResolvedValue({
        domainName: 'x.c',
        cname: 'x.cdn.c',
        status: 'online',
      });
      mockCdnOperations.setDomainServerCertificate.mockResolvedValue({});
      mockCdnOperations.deleteCdnDomain.mockResolvedValue({});
      mockOssOperations.createBucket.mockResolvedValue({ name: 'tb', location: 'oss-cn-hangzhou' });
      mockOssOperations.getBucket.mockResolvedValue(
        taggedBucketInfo({ name: 'tb', location: 'oss-cn-hangzhou' }, 'buckets.b'),
      );
      mockOssOperations.bindCustomDomain.mockResolvedValue({
        domain: 'x.c',
        cname: 'bkt.o.c',
        bucketCnameBound: true,
      });
      mockOssOperations.enableTransferAcceleration.mockResolvedValue(true);
      mockOssOperations.getAccelerateEndpoint.mockResolvedValue('bkt.oss-accelerate.aliyuncs.com');
      mockDnsOperations.addDomainRecord.mockResolvedValue('did');
      mockedStateManager.setResource.mockImplementation((_s, _l, rs) => ({
        ..._s,
        resources: { b: rs },
      }));
    });

    it('cdn:true', () =>
      createBucketResource(
        mockContext,
        mkBucket({ domains: [{ domain_name: 'a.c', cdn: true }] }),
        initialState,
      ).then(() => {
        expect(mockCdnOperations.addCdnDomain).toHaveBeenCalled();
      }));
    it('accelerate', () =>
      createBucketResource(
        mockContext,
        mkBucket({ accelerate: true, domains: [{ domain_name: 'a.c' }] }),
        initialState,
      ).then(() => {
        expect(mockOssOperations.enableTransferAcceleration).toHaveBeenCalled();
      }));
    it('cdn+accel', () =>
      createBucketResource(
        mockContext,
        mkBucket({ accelerate: true, domains: [{ domain_name: 'a.c', cdn: true }] }),
        initialState,
      ).then(() => {
        expect(mockCdnOperations.addCdnDomain).toHaveBeenCalled();
        expect(mockOssOperations.enableTransferAcceleration).toHaveBeenCalled();
      }));
    it('cdn:false', () =>
      createBucketResource(
        mockContext,
        mkBucket({ domains: [{ domain_name: 'a.c', cdn: false }] }),
        initialState,
      ).then(() => {
        expect(mockCdnOperations.addCdnDomain).not.toHaveBeenCalled();
      }));
  });

  describe('CDN full coverage', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      mockCdnOperations.addCdnDomain.mockResolvedValue({});
      mockCdnOperations.describeCdnDomainDetail.mockResolvedValue({
        domainName: 'x.c',
        cname: 'x.cdn.c',
        status: 'online',
      });
      mockCdnOperations.setDomainServerCertificate.mockResolvedValue({});
      mockCdnOperations.deleteCdnDomain.mockResolvedValue({});
      mockOssOperations.createBucket.mockResolvedValue({ name: 'tb', location: 'oss-cn-hangzhou' });
      mockOssOperations.getBucket.mockResolvedValue(
        taggedBucketInfo({ name: 'tb', location: 'oss-cn-hangzhou' }, 'buckets.b'),
      );
      mockOssOperations.bindCustomDomain.mockResolvedValue({
        domain: 'x.c',
        cname: 'bkt.oss.c',
        bucketCnameBound: true,
      });
      mockOssOperations.enableTransferAcceleration.mockResolvedValue(true);
      mockOssOperations.getAccelerateEndpoint.mockResolvedValue('bkt.oss-accelerate.aliyuncs.com');
      mockDnsOperations.addDomainRecord.mockResolvedValue('did');
      mockedStateManager.setResource.mockImplementation((_s, _l, rs) => ({
        ..._s,
        resources: { b: rs },
      }));
    });

    it('cdn true', async () => {
      const b: BucketDomain = {
        key: 'b',
        name: 'tb',
        security: { acl: BucketAccessEnum.PUBLIC_READ, force_delete: false },
        domains: [{ domain_name: 'x.c', cdn: true }],
      };
      await createBucketResource(mockContext, b, initialState);
      expect(mockCdnOperations.addCdnDomain).toHaveBeenCalled();
      expect(mockDnsOperations.addDomainRecord).toHaveBeenCalled();
    });

    it('accelerate', async () => {
      const b: BucketDomain = {
        key: 'b',
        name: 'tb',
        security: { acl: BucketAccessEnum.PUBLIC_READ, force_delete: false },
        accelerate: true,
        domains: [{ domain_name: 'x.c' }],
      };
      await createBucketResource(mockContext, b, initialState);
      expect(mockOssOperations.enableTransferAcceleration).toHaveBeenCalled();
      expect(mockCdnOperations.addCdnDomain).not.toHaveBeenCalled();
    });

    it('cdn false', async () => {
      const b: BucketDomain = {
        key: 'b',
        name: 'tb',
        security: { acl: BucketAccessEnum.PUBLIC_READ, force_delete: false },
        domains: [{ domain_name: 'x.c', cdn: false }],
      };
      await createBucketResource(mockContext, b, initialState);
      expect(mockCdnOperations.addCdnDomain).not.toHaveBeenCalled();
      expect(mockOssOperations.bindCustomDomain).toHaveBeenCalled();
    });

    it('cdn + accelerate', async () => {
      const b: BucketDomain = {
        key: 'b',
        name: 'tb',
        security: { acl: BucketAccessEnum.PUBLIC_READ, force_delete: false },
        accelerate: true,
        domains: [{ domain_name: 'example.com', cdn: true }],
      };
      await createBucketResource(mockContext, b, initialState);
      expect(mockCdnOperations.addCdnDomain).toHaveBeenCalled();
      expect(mockOssOperations.enableTransferAcceleration).toHaveBeenCalled();
    });

    it('cdn update fail: switching an existing binding off CDN requires destroy+recreate', async () => {
      const existing = {
        mode: 'managed' as const,
        region: 'cn-hangzhou',
        definition: { bucketName: 'tb', cdnEnabled: true, domain: 'x.c' },
        instances: [
          { sid: 's', id: 'tb', type: 'ALIYUN_OSS_BUCKET', bucketName: 'tb' },
          { sid: 'c', id: 'x.c', type: 'ALIYUN_CDN_DISTRIBUTION', domainName: 'x.c' },
          { sid: 'd', id: 'did', type: 'ALIYUN_CDN_DNS_CNAME', domain: 'x.c', dnsRecordId: 'did' },
        ],
        lastUpdated: new Date().toISOString(),
      };
      mockedStateManager.getResource.mockReturnValue(existing);
      const b: BucketDomain = {
        key: 'b',
        name: 'tb',
        security: { acl: BucketAccessEnum.PUBLIC_READ, force_delete: false },
        domains: [{ domain_name: 'x.c', cdn: false }],
      };
      await expect(
        updateBucketResource(mockContext, b, {
          ...initialState,
          resources: { 'buckets.b': existing },
        }),
      ).rejects.toThrow();
    });

    it('cdn delete', async () => {
      const s: StateFile = {
        ...initialState,
        resources: {
          'buckets.b': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: {},
            instances: [
              { sid: 's', id: 'tb', type: 'ALIYUN_OSS_BUCKET', bucketName: 'tb' },
              { sid: 'c', id: 'x.c', type: 'ALIYUN_CDN_DISTRIBUTION', domainName: 'x.c' },
            ],
            lastUpdated: new Date().toISOString(),
          },
        },
      };
      mockOssOperations.getBucket.mockResolvedValue(null);
      await deleteBucketResource(mockContext, 'tb', 'buckets.b', s);
      expect(mockCdnOperations.deleteCdnDomain).toHaveBeenCalledWith('x.c');
    });
  });

  describe('CDN final', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      mockCdnOperations.addCdnDomain.mockResolvedValue({});
      mockCdnOperations.describeCdnDomainDetail.mockResolvedValue({
        domainName: 'x.c',
        cname: 'x.cdn.c',
        status: 'online',
      });
      mockCdnOperations.setDomainServerCertificate.mockResolvedValue({});
      mockCdnOperations.deleteCdnDomain.mockResolvedValue({});
      mockOssOperations.createBucket.mockResolvedValue({ name: 'tb', location: 'oss-cn-hangzhou' });
      mockOssOperations.getBucket.mockResolvedValue(
        taggedBucketInfo({ name: 'tb', location: 'oss-cn-hangzhou' }, 'buckets.b'),
      );
      mockOssOperations.bindCustomDomain.mockResolvedValue({
        domain: 'x.c',
        cname: 'bkt.oss.c',
        bucketCnameBound: true,
      });
      mockOssOperations.enableTransferAcceleration.mockResolvedValue(true);
      mockOssOperations.getAccelerateEndpoint.mockResolvedValue('bkt.oss-accelerate.aliyuncs.com');
      mockDnsOperations.addDomainRecord.mockResolvedValue('did');
      mockedStateManager.setResource.mockImplementation((_s, _l, rs) => ({
        ..._s,
        resources: { b: rs },
      }));
    });

    it('cdn obj', () =>
      createBucketResource(
        mockContext,
        {
          key: 'b',
          name: 'tb',
          security: { acl: BucketAccessEnum.PUBLIC_READ, force_delete: false },
          domains: [{ domain_name: 'x.c', cdn: { enabled: true } }],
        } as BucketDomain,
        initialState,
      ).then(() => {
        expect(mockCdnOperations.addCdnDomain).toHaveBeenCalled();
      }));
    it('direct binding', () =>
      createBucketResource(
        mockContext,
        {
          key: 'b',
          name: 'tb',
          security: { acl: BucketAccessEnum.PUBLIC_READ, force_delete: false },
          domains: [{ domain_name: 'x.c' }],
        } as BucketDomain,
        initialState,
      ).then(() => {
        expect(mockOssOperations.bindCustomDomain).toHaveBeenCalled();
      }));

    describe('createBucketResource - IAM policy', () => {
      it('clears an existing owned bucket policy when creation explicitly declares an empty statement list', async () => {
        const bucket: BucketDomain = {
          key: 'test_bucket',
          name: 'test-bucket',
          iam: { resource: { statements: [] } },
        };
        mockOssOperations.getBucket.mockResolvedValue(
          taggedBucketInfo(
            {
              name: 'test-bucket',
              location: 'oss-cn-hangzhou',
              acl: 'private',
              storageClass: 'Standard',
            },
            'buckets.test_bucket',
          ),
        );
        mockOssOperations.deleteBucketPolicy.mockResolvedValue(undefined);

        await createBucketResource(mockContext, bucket, initialState);

        expect(mockOssOperations.deleteBucketPolicy).toHaveBeenCalledWith('test-bucket');
        expect(mockOssOperations.putBucketPolicy).not.toHaveBeenCalled();
      });

      it('should apply bucket policy when iam is configured', async () => {
        const bucket: BucketDomain = {
          key: 'test_bucket',
          name: 'test-bucket',
          iam: {
            resource: {
              statements: [
                {
                  effect: 'Allow',
                  principal: { Service: 'oss.aliyuncs.com' },
                  action: ['oss:GetObject', 'oss:PutObject'],
                  resource: ['acs:oss:*:*:my-bucket/*'],
                },
              ],
            },
          },
        };

        mockOssOperations.getBucket.mockResolvedValue(
          taggedBucketInfo(
            {
              name: 'test-bucket',
              location: 'oss-cn-hangzhou',
              acl: 'private',
              storageClass: 'Standard',
              creationDate: '2024-01-01',
            },
            'buckets.test_bucket',
          ),
        );
        mockOssOperations.putBucketPolicy.mockResolvedValue(undefined);
        mockedStateManager.setResource.mockImplementation(
          (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
            ...initialState,
            resources: { 'buckets.test_bucket': resourceState },
          }),
        );

        await createBucketResource(mockContext, bucket, initialState);

        expect(mockOssOperations.putBucketPolicy).toHaveBeenCalledWith(
          'test-bucket',
          expect.objectContaining({
            Version: '1',
            Statement: expect.arrayContaining([
              expect.objectContaining({
                Effect: 'Allow',
                Action: ['oss:GetObject', 'oss:PutObject'],
              }),
            ]),
          }),
        );
      });

      it('should not call putBucketPolicy when iam is not configured', async () => {
        const bucket: BucketDomain = {
          key: 'test_bucket',
          name: 'test-bucket',
        };

        mockOssOperations.getBucket.mockResolvedValue(
          taggedBucketInfo(
            {
              name: 'test-bucket',
              location: 'oss-cn-hangzhou',
              acl: 'private',
              storageClass: 'Standard',
              creationDate: '2024-01-01',
            },
            'buckets.test_bucket',
          ),
        );
        mockedStateManager.setResource.mockImplementation(
          (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
            ...initialState,
            resources: { 'buckets.test_bucket': resourceState },
          }),
        );

        await createBucketResource(mockContext, bucket, initialState);

        expect(mockOssOperations.putBucketPolicy).not.toHaveBeenCalled();
      });
    });

    describe('updateBucketResource - IAM policy', () => {
      it('should apply updated policy when iam changes', async () => {
        const stateWithPolicy: StateFile = {
          ...initialState,
          resources: {
            'buckets.test_bucket': {
              mode: 'managed',
              region: 'cn-hangzhou',
              definition: {
                bucketName: 'test-bucket',
                policy: JSON.stringify({
                  resource: {
                    statements: [
                      {
                        effect: 'Allow',
                        action: ['oss:GetObject'],
                        resource: ['*'],
                        principal: { Service: 'oss' },
                      },
                    ],
                  },
                }),
              },
              instances: [{ sid: 'oss-sid', id: 'test-bucket', type: 'ALIYUN_OSS_BUCKET' }],
              lastUpdated: new Date().toISOString(),
            },
          },
        };

        const bucket: BucketDomain = {
          key: 'test_bucket',
          name: 'test-bucket',
          iam: {
            resource: {
              statements: [
                {
                  effect: 'Allow',
                  principal: { Service: 'oss.aliyuncs.com' },
                  action: ['oss:GetObject', 'oss:PutObject'],
                  resource: ['acs:oss:*:*:my-bucket/*'],
                },
              ],
            },
          },
        };

        mockOssOperations.getBucket.mockResolvedValue({
          name: 'test-bucket',
          location: 'oss-cn-hangzhou',
          acl: 'private',
          storageClass: 'Standard',
        });
        mockOssOperations.putBucketPolicy.mockResolvedValue(undefined);
        mockedStateManager.setResource.mockImplementation(
          (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
            ...initialState,
            resources: { 'buckets.test_bucket': resourceState },
          }),
        );

        await updateBucketResource(mockContext, bucket, stateWithPolicy);

        expect(mockOssOperations.putBucketPolicy).toHaveBeenCalledWith(
          'test-bucket',
          expect.objectContaining({ Version: '1', Statement: expect.any(Array) }),
        );
      });

      it('clears a policy only when the statement list is explicitly empty', async () => {
        const stateWithPolicy: StateFile = {
          ...initialState,
          resources: {
            'buckets.test_bucket': {
              mode: 'managed',
              region: 'cn-hangzhou',
              definition: {
                bucketName: 'test-bucket',
                policy: JSON.stringify({
                  resource: {
                    statements: [
                      {
                        effect: 'Allow',
                        action: ['oss:GetObject'],
                        resource: ['*'],
                        principal: { Service: 'oss' },
                      },
                    ],
                  },
                }),
              },
              instances: [{ sid: 'oss-sid', id: 'test-bucket', type: 'ALIYUN_OSS_BUCKET' }],
              lastUpdated: new Date().toISOString(),
            },
          },
        };

        const bucket: BucketDomain = {
          iam: { resource: { statements: [] } },
          key: 'test_bucket',
          name: 'test-bucket',
        };

        mockOssOperations.getBucket.mockResolvedValue({
          name: 'test-bucket',
          location: 'oss-cn-hangzhou',
          acl: 'private',
          storageClass: 'Standard',
        });
        mockOssOperations.deleteBucketPolicy.mockResolvedValue(undefined);
        mockedStateManager.setResource.mockImplementation(
          (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
            ...initialState,
            resources: { 'buckets.test_bucket': resourceState },
          }),
        );

        await updateBucketResource(mockContext, bucket, stateWithPolicy);

        expect(mockOssOperations.deleteBucketPolicy).toHaveBeenCalledWith('test-bucket');
      });

      it('reapplies a declared policy during a selected repair even when saved intent is unchanged', async () => {
        const existingIam = {
          resource: {
            statements: [
              {
                effect: 'Allow' as const,
                principal: { Service: 'oss' },
                action: ['oss:GetObject'],
                resource: ['*'],
              },
            ],
          },
        };

        const stateWithPolicy: StateFile = {
          ...initialState,
          resources: {
            'buckets.test_bucket': {
              mode: 'managed',
              region: 'cn-hangzhou',
              definition: {
                bucketName: 'test-bucket',
                policy: JSON.stringify(existingIam),
              },
              instances: [{ sid: 'oss-sid', id: 'test-bucket', type: 'ALIYUN_OSS_BUCKET' }],
              lastUpdated: new Date().toISOString(),
            },
          },
        };

        mockOssOperations.getBucket.mockResolvedValue({
          name: 'test-bucket',
          location: 'oss-cn-hangzhou',
          acl: 'private',
          storageClass: 'Standard',
        });
        mockedStateManager.setResource.mockImplementation(
          (_state: StateFile, _logicalId: string, resourceState: unknown) => ({
            ...initialState,
            resources: { 'buckets.test_bucket': resourceState },
          }),
        );

        await updateBucketResource(
          mockContext,
          { key: 'test_bucket', name: 'test-bucket', iam: existingIam } as BucketDomain,
          stateWithPolicy,
        );

        expect(mockOssOperations.putBucketPolicy).toHaveBeenCalled();
        expect(mockOssOperations.deleteBucketPolicy).not.toHaveBeenCalled();
      });
    });

    describe('deleteBucketResource - IAM policy cleanup', () => {
      it('should delete bucket policy when deleting bucket', async () => {
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

        mockOssOperations.deleteBucketPolicy.mockResolvedValue(undefined);
        mockOssOperations.deleteBucket.mockResolvedValue(undefined);
        mockedStateManager.removeResource.mockReturnValue(initialState);

        await deleteBucketResource(mockContext, bucketName, logicalId, stateWithBucket);

        expect(mockOssOperations.deleteBucketPolicy).toHaveBeenCalledWith(bucketName);
      });
    });
  });

  describe('per-binding reconcile (issue #279)', () => {
    const info = { name: 'tb', location: 'oss-cn-hangzhou', acl: 'private' };

    const taggedInfo = () => ({
      ...info,
      tags: [{ key: 'si-owned-by', value: 'test-app-test-service:buckets.b' }],
    });

    beforeEach(() => {
      jest.clearAllMocks();
      mockOssOperations.getBucket.mockResolvedValue(taggedInfo());
      mockOssOperations.bindCustomDomain.mockResolvedValue({
        domain: 'x.c',
        cname: 'tb.oss-c.c',
        bucketCnameBound: true,
      });
      mockOssOperations.unbindCustomDomain.mockResolvedValue(undefined);
      mockOssOperations.enableTransferAcceleration.mockResolvedValue(true);
      mockOssOperations.getAccelerateEndpoint.mockResolvedValue('tb.oss-accelerate.aliyuncs.com');
      mockOssOperations.getBucketCnameEndpoint.mockResolvedValue('tb.oss-c.c');
      mockCdnOperations.addCdnDomain.mockResolvedValue({});
      mockCdnOperations.describeCdnDomainDetail.mockResolvedValue({
        domainName: 'x.c',
        cname: 'x.cdn.c',
        status: 'online',
      });
      mockCdnOperations.setDomainServerCertificate.mockResolvedValue({});
      mockCdnOperations.deleteCdnDomain.mockResolvedValue({});
      mockCdnOperations.modifyCdnDomain.mockResolvedValue({});
      mockCdnOperations.applyCacheConfig.mockResolvedValue({});
      mockCdnOperations.applyProtocolConfig.mockResolvedValue({});
      mockCdnOperations.applyCompression.mockResolvedValue({});
      mockCdnOperations.applyHttpsRedirect.mockResolvedValue({});
      mockDnsOperations.addDomainRecord.mockResolvedValue('did');
      mockedStateManager.setResource.mockImplementation((_s, _l, rs) => ({
        ..._s,
        resources: { 'buckets.b': rs },
      }));
    });

    it('updates a stored CDN binding in place when its cdn options change', async () => {
      const state: StateFile = {
        ...initialState,
        resources: {
          'buckets.b': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: {
              domains: [{ domain_name: 'x.c', cdn: { enabled: true, cache_ttl: 60 } }],
              accelerate: false,
            },
            instances: [
              { sid: 's', id: 'tb', type: 'ALIYUN_OSS_BUCKET', bucketName: 'tb' },
              { sid: 'c', id: 'x.c', type: 'ALIYUN_CDN_DISTRIBUTION', domainName: 'x.c' },
              {
                sid: 'd',
                id: 'did',
                type: 'ALIYUN_CDN_DNS_CNAME',
                domain: 'x.c',
                dnsRecordId: 'did',
              },
            ],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      await updateBucketResource(
        mockContext,
        {
          key: 'b',
          name: 'tb',
          domains: [
            {
              domain_name: 'x.c',
              cdn: { enabled: true, cache_ttl: 120, origin_protocol: 'https' },
            },
          ],
        },
        state,
      );

      expect(mockCdnOperations.addCdnDomain).not.toHaveBeenCalled();
      expect(mockCdnOperations.modifyCdnDomain).not.toHaveBeenCalled();
      expect(mockCdnOperations.applyCacheConfig).toHaveBeenCalledWith('x.c', 120, undefined);
      expect(mockCdnOperations.applyProtocolConfig).toHaveBeenCalledWith('x.c', 'https');
      // Distribution and DNS instances preserved — no recreation.
      const saved = mockedStateManager.setResource.mock.calls.at(-1)?.[2];
      expect(saved.instances.some((i: { sid: string }) => i.sid === 'c')).toBe(true);
      expect(saved.instances.some((i: { sid: string }) => i.sid === 'd')).toBe(true);
    });

    it('modifies the CDN domain when cdn_type or scope change on a stored binding', async () => {
      const state: StateFile = {
        ...initialState,
        resources: {
          'buckets.b': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: {
              domains: [
                { domain_name: 'x.c', cdn: { enabled: true, cdn_type: 'web', scope: 'global' } },
              ],
              accelerate: false,
            },
            instances: [],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      await updateBucketResource(
        mockContext,
        {
          key: 'b',
          name: 'tb',
          domains: [
            { domain_name: 'x.c', cdn: { enabled: true, cdn_type: 'download', scope: 'domestic' } },
          ],
        },
        state,
      );

      expect(mockCdnOperations.modifyCdnDomain).toHaveBeenCalledWith(
        expect.objectContaining({ domainName: 'x.c', cdnType: 'download', scope: 'domestic' }),
      );
    });

    it('re-points a direct binding at the accelerate endpoint when acceleration is enabled', async () => {
      const state: StateFile = {
        ...initialState,
        resources: {
          'buckets.b': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: {
              domains: [{ domain_name: 'x.c', cdn: null }],
              accelerate: false,
            },
            instances: [
              { sid: 's', id: 'tb', type: 'ALIYUN_OSS_BUCKET', bucketName: 'tb' },
              {
                sid: 'd',
                id: 'old-dns',
                type: 'ALIYUN_OSS_DNS_CNAME',
                domain: 'x.c',
                cname: 'tb.oss-c.c',
                dnsRecordId: 'old-dns',
              },
            ],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      const saved = await updateBucketResource(
        mockContext,
        { key: 'b', name: 'tb', accelerate: true, domains: [{ domain_name: 'x.c' }] },
        state,
      );

      expect(mockOssOperations.enableTransferAcceleration).toHaveBeenCalledWith('tb');
      // The direct binding is torn down and replaced by an accelerate-only DNS record.
      expect(mockOssOperations.unbindCustomDomain).toHaveBeenCalledWith(
        'tb',
        'x.c',
        'old-dns',
        undefined,
      );
      expect(mockDnsOperations.addDomainRecord).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'CNAME', value: 'tb.oss-accelerate.aliyuncs.com' }),
      );
      const instances = saved.resources['buckets.b'].instances.filter(
        (i: Record<string, unknown>) => i.type === 'ALIYUN_CDN_DNS_CNAME',
      );
      expect(instances).toHaveLength(1);
    });

    it('rejects disabling transfer acceleration through update', async () => {
      const state: StateFile = {
        ...initialState,
        resources: {
          'buckets.b': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: { domains: [], accelerate: true },
            instances: [{ sid: 's', id: 'tb', type: 'ALIYUN_OSS_BUCKET', bucketName: 'tb' }],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      await expect(
        updateBucketResource(
          mockContext,
          { key: 'b', name: 'tb', domains: [{ domain_name: 'x.c' }] },
          state,
        ),
      ).rejects.toThrow(/destroy\+recreate/);
      expect(mockOssOperations.enableTransferAcceleration).not.toHaveBeenCalled();
    });

    it('rejects enabling acceleration under existing CDN bindings (origin cannot switch)', async () => {
      const state: StateFile = {
        ...initialState,
        resources: {
          'buckets.b': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: {
              domains: [{ domain_name: 'x.c', cdn: { enabled: true } }],
              accelerate: false,
            },
            instances: [],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      await expect(
        updateBucketResource(
          mockContext,
          {
            key: 'b',
            name: 'tb',
            accelerate: true,
            domains: [{ domain_name: 'x.c', cdn: { enabled: true } }],
          },
          state,
        ),
      ).rejects.toThrow(/destroy\+recreate/);
    });

    it('keeps an unchanged accelerate-only binding without recreating its DNS record', async () => {
      const state: StateFile = {
        ...initialState,
        resources: {
          'buckets.b': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: { domains: [{ domain_name: 'x.c', cdn: null }], accelerate: true },
            instances: [
              { sid: 's', id: 'tb', type: 'ALIYUN_OSS_BUCKET', bucketName: 'tb' },
              {
                sid: 'd',
                id: 'did',
                type: 'ALIYUN_CDN_DNS_CNAME',
                domain: 'x.c',
                cname: 'tb.oss-accelerate.aliyuncs.com',
                dnsRecordId: 'did',
              },
            ],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      const saved = await updateBucketResource(
        mockContext,
        { key: 'b', name: 'tb', accelerate: true, domains: [{ domain_name: 'x.c' }] },
        state,
      );

      expect(mockDnsOperations.addDomainRecord).not.toHaveBeenCalled();
      expect(mockOssOperations.bindCustomDomain).not.toHaveBeenCalled();
      const dns = saved.resources['buckets.b'].instances.filter(
        (i: Record<string, unknown>) => i.type === 'ALIYUN_CDN_DNS_CNAME',
      );
      expect(dns).toHaveLength(1);
    });

    it('records domainBound: false when a direct binding fails bucket-cname verification', async () => {
      mockOssOperations.bindCustomDomain.mockResolvedValue({
        domain: 'x.c',
        cname: 'tb.oss-c.c',
        bucketCnameBound: false,
      });

      const saved = await updateBucketResource(
        mockContext,
        { key: 'b', name: 'tb', domains: [{ domain_name: 'x.c' }] },
        initialState,
      );

      expect(saved.resources['buckets.b'].definition.domainBound).toBe(false);
    });

    it('aggregates domainBound across bindings: any unbound binding marks the bucket pending', async () => {
      mockOssOperations.bindCustomDomain
        .mockResolvedValueOnce({
          domain: 'a.c',
          cname: 'tb.oss-c.c',
          bucketCnameBound: true,
        })
        .mockResolvedValueOnce({
          domain: 'b.c',
          cname: 'tb.oss-c.c',
          bucketCnameBound: false,
        });

      const saved = await updateBucketResource(
        mockContext,
        { key: 'b', name: 'tb', domains: [{ domain_name: 'a.c' }, { domain_name: 'b.c' }] },
        initialState,
      );

      expect(saved.resources['buckets.b'].definition.domainBound).toBe(false);
    });

    it('saves domainBound: null when only accelerate-only bindings exist (no bucket bind by design)', async () => {
      const saved = await updateBucketResource(
        mockContext,
        { key: 'b', name: 'tb', accelerate: true, domains: [{ domain_name: 'x.c' }] },
        initialState,
      );

      expect(saved.resources['buckets.b'].definition.domainBound).toBeNull();
    });

    it('migrates a legacy CDN binding to the v1 definition without recreating the distribution', async () => {
      const state: StateFile = {
        ...initialState,
        resources: {
          'buckets.b': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: {
              bucketName: 'tb',
              domain: 'x.c',
              cdnEnabled: true,
              cdnType: 'web',
              cdnScope: 'global',
              cdnCacheTtl: 60,
            },
            instances: [
              { sid: 's', id: 'tb', type: 'ALIYUN_OSS_BUCKET', bucketName: 'tb' },
              { sid: 'c', id: 'x.c', type: 'ALIYUN_CDN_DISTRIBUTION', domainName: 'x.c' },
              {
                sid: 'd',
                id: 'did',
                type: 'ALIYUN_CDN_DNS_CNAME',
                domain: 'x.c',
                dnsRecordId: 'did',
              },
            ],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      const saved = await updateBucketResource(
        mockContext,
        {
          key: 'b',
          name: 'tb',
          domains: [{ domain_name: 'x.c', cdn: { enabled: true, cache_ttl: 60 } }],
        },
        state,
      );

      expect(mockCdnOperations.addCdnDomain).not.toHaveBeenCalled();
      expect(mockCdnOperations.deleteCdnDomain).not.toHaveBeenCalled();
      const savedState = saved.resources['buckets.b'];
      expect(savedState.instances.some((i: { sid: string }) => i.sid === 'c')).toBe(true);
      expect(savedState.definition.domains).toEqual([
        {
          domain_name: 'x.c',
          certificate_id: null,
          certificate_body: null,
          certificate_private_key: null,
          protocol: null,
          cdn: { enabled: true, cdn_type: 'web', scope: 'global', cache_ttl: 60 },
        },
      ]);
      expect(savedState.definition.accelerate).toBe(false);
    });

    it('applies partial cdn options and deploys the certificate on a fresh CDN binding', async () => {
      mockCasOperations.getCertificate.mockResolvedValue({ cert: 'CERT-BODY', key: 'CERT-KEY' });

      const saved = await updateBucketResource(
        mockContext,
        {
          key: 'b',
          name: 'tb',
          domains: [
            {
              domain_name: 'x.c',
              certificate_id: 'cert-1',
              // cache_ttl/ignore_query_string deliberately omitted:
              // only protocol/compression/https-redirect branches run
              cdn: {
                enabled: true,
                origin_protocol: 'follow',
                compression: false,
                force_redirect_https: true,
              },
            },
          ],
        },
        initialState,
      );

      expect(mockCdnOperations.addCdnDomain).toHaveBeenCalledWith(
        expect.objectContaining({ domainName: 'x.c', cdnType: 'web', scope: 'global' }),
      );
      expect(mockCdnOperations.applyCacheConfig).not.toHaveBeenCalled();
      expect(mockCdnOperations.applyProtocolConfig).toHaveBeenCalledWith('x.c', 'follow');
      expect(mockCdnOperations.applyCompression).toHaveBeenCalledWith('x.c', false);
      expect(mockCdnOperations.applyHttpsRedirect).toHaveBeenCalledWith('x.c', true);
      expect(mockCdnOperations.setDomainServerCertificate).toHaveBeenCalledWith('x.c', {
        serverCertificate: 'CERT-BODY',
        privateKey: 'CERT-KEY',
        serverCertificateStatus: 'on',
      });
      expect(saved.resources['buckets.b'].definition.domainBound).toBe(true);
    });

    it('handles the cdn shorthand with a DNS record id missing from the provider', async () => {
      mockDnsOperations.addDomainRecord.mockResolvedValueOnce(undefined);

      const saved = await updateBucketResource(
        mockContext,
        { key: 'b', name: 'tb', domains: [{ domain_name: 'x.c', cdn: true }] },
        initialState,
      );

      // cdn shorthand applies no extra options and falls back to the hostname as id
      expect(mockCdnOperations.applyCacheConfig).not.toHaveBeenCalled();
      expect(mockCdnOperations.applyProtocolConfig).not.toHaveBeenCalled();
      const dns = saved.resources['buckets.b'].instances.find(
        (i: Record<string, unknown>) => i.type === 'ALIYUN_CDN_DNS_CNAME',
      );
      expect(dns).toMatchObject({ id: 'x.c', domain: 'x.c' });
      expect(dns?.dnsRecordId).toBeUndefined();
    });

    it('updates only compression and https-redirect when the rest of the cdn config is unchanged', async () => {
      const state: StateFile = {
        ...initialState,
        resources: {
          'buckets.b': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: {
              domains: [
                {
                  domain_name: 'x.c',
                  cdn: { enabled: true, cdn_type: 'web', scope: 'global', compression: true },
                },
              ],
              accelerate: false,
            },
            instances: [
              { sid: 'c', id: 'x.c', type: 'ALIYUN_CDN_DISTRIBUTION', domainName: 'x.c' },
            ],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      await updateBucketResource(
        mockContext,
        {
          key: 'b',
          name: 'tb',
          domains: [
            {
              domain_name: 'x.c',
              cdn: { enabled: true, cdn_type: 'web', scope: 'global', compression: false },
            },
          ],
        },
        state,
      );

      expect(mockCdnOperations.modifyCdnDomain).not.toHaveBeenCalled();
      expect(mockCdnOperations.applyCacheConfig).not.toHaveBeenCalled();
      expect(mockCdnOperations.applyProtocolConfig).not.toHaveBeenCalled();
      expect(mockCdnOperations.applyCompression).toHaveBeenCalledWith('x.c', false);
      expect(mockCdnOperations.applyHttpsRedirect).not.toHaveBeenCalled();
    });

    it('tears down an accelerate-only binding removed from the list', async () => {
      const state: StateFile = {
        ...initialState,
        resources: {
          'buckets.b': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: { domains: [{ domain_name: 'x.c', cdn: null }], accelerate: true },
            instances: [
              { sid: 's', id: 'tb', type: 'ALIYUN_OSS_BUCKET', bucketName: 'tb' },
              {
                sid: 'd',
                id: 'did',
                type: 'ALIYUN_CDN_DNS_CNAME',
                domain: 'x.c',
                cname: 'tb.oss-accelerate.aliyuncs.com',
                dnsRecordId: 'did',
              },
            ],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      const saved = await updateBucketResource(
        mockContext,
        { key: 'b', name: 'tb', accelerate: true, domains: [{ domain_name: 'y.c' }] },
        state,
      );

      expect(mockDnsOperations.deleteDomainRecord).toHaveBeenCalledWith('did');
      expect(mockOssOperations.unbindCustomDomain).not.toHaveBeenCalled();
      const kept = saved.resources['buckets.b'].instances.filter(
        (i: Record<string, unknown>) => i.type === 'ALIYUN_CDN_DNS_CNAME',
      );
      expect(kept).toHaveLength(1);
      expect((kept[0] as unknown as { domain: string }).domain).toBe('y.c');
    });

    it('skips malformed entries in the stored domains definition', async () => {
      const state: StateFile = {
        ...initialState,
        resources: {
          'buckets.b': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: {
              domains: [{ domain_name: 42 }, 'not-an-object', { domain_name: 'y.c', cdn: null }],
              accelerate: false,
            },
            instances: [
              {
                sid: 'd',
                id: 'y.c',
                type: 'ALIYUN_OSS_DNS_CNAME',
                domain: 'y.c',
                cname: 'tb.oss-c.c',
              },
            ],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      // y.c is stored as a direct binding and re-bound in place; the malformed
      // entries are ignored rather than crashing the reconcile.
      await updateBucketResource(
        mockContext,
        { key: 'b', name: 'tb', domains: [{ domain_name: 'y.c' }] },
        state,
      );

      expect(mockOssOperations.bindCustomDomain).toHaveBeenCalledWith('tb', 'y.c', undefined);
      expect(mockOssOperations.unbindCustomDomain).not.toHaveBeenCalled();
    });

    it('migrates a legacy cdnEnabled definition that has no cdn sub-fields or certificate', async () => {
      const state: StateFile = {
        ...initialState,
        resources: {
          'buckets.b': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: { bucketName: 'tb', domain: 'x.c', cdnEnabled: true },
            instances: [
              { sid: 's', id: 'tb', type: 'ALIYUN_OSS_BUCKET', bucketName: 'tb' },
              { sid: 'c', id: 'x.c', type: 'ALIYUN_CDN_DISTRIBUTION', domainName: 'x.c' },
              {
                sid: 'd',
                id: 'did',
                type: 'ALIYUN_CDN_DNS_CNAME',
                domain: 'x.c',
                dnsRecordId: 'did',
              },
            ],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      const saved = await updateBucketResource(
        mockContext,
        { key: 'b', name: 'tb', domains: [{ domain_name: 'x.c', cdn: true }] },
        state,
      );

      // Same delivery mode (CDN) with defaults equal to the legacy defaults — no recreation.
      expect(mockCdnOperations.addCdnDomain).not.toHaveBeenCalled();
      expect(mockCdnOperations.deleteCdnDomain).not.toHaveBeenCalled();
      expect(mockCdnOperations.modifyCdnDomain).not.toHaveBeenCalled();
      expect(
        saved.resources['buckets.b'].instances.some((i: { sid: string }) => i.sid === 'c'),
      ).toBe(true);
    });

    it('falls back to the hostname as instance id when a direct binding has no record ids', async () => {
      mockOssOperations.bindCustomDomain.mockResolvedValueOnce({
        domain: 'x.c',
        cname: 'tb.oss-c.c',
        bucketCnameBound: true,
      });

      const saved = await updateBucketResource(
        mockContext,
        { key: 'b', name: 'tb', domains: [{ domain_name: 'x.c' }] },
        initialState,
      );

      const dns = saved.resources['buckets.b'].instances.find(
        (i: Record<string, unknown>) => i.type === 'ALIYUN_OSS_DNS_CNAME',
      );
      expect(dns).toMatchObject({ id: 'x.c', domain: 'x.c', cname: 'tb.oss-c.c' });
      expect(dns?.dnsRecordId).toBeUndefined();
      expect(dns?.txtRecordId).toBeUndefined();
    });

    it('falls back to the hostname as id for accelerate-only DNS when the record id is missing', async () => {
      mockDnsOperations.addDomainRecord.mockResolvedValueOnce(undefined);

      const saved = await updateBucketResource(
        mockContext,
        { key: 'b', name: 'tb', accelerate: true, domains: [{ domain_name: 'x.c' }] },
        initialState,
      );

      const dns = saved.resources['buckets.b'].instances.find(
        (i: Record<string, unknown>) => i.type === 'ALIYUN_CDN_DNS_CNAME',
      );
      expect(dns).toMatchObject({
        id: 'x.c',
        domain: 'x.c',
        cname: 'tb.oss-accelerate.aliyuncs.com',
      });
    });

    it('redeploys the certificate when a binding switches certificate reference', async () => {
      const state: StateFile = {
        ...initialState,
        resources: {
          'buckets.b': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: {
              domains: [{ domain_name: 'x.c', certificate_id: 'cert-old', cdn: { enabled: true } }],
              accelerate: false,
            },
            instances: [
              { sid: 'c', id: 'x.c', type: 'ALIYUN_CDN_DISTRIBUTION', domainName: 'x.c' },
            ],
            lastUpdated: new Date().toISOString(),
          },
        },
      };
      mockCasOperations.getCertificate.mockResolvedValue({
        cert: 'CERT-BODY-NEW',
        key: 'CERT-KEY-NEW',
      });

      await updateBucketResource(
        mockContext,
        {
          key: 'b',
          name: 'tb',
          domains: [{ domain_name: 'x.c', certificate_id: 'cert-new', cdn: { enabled: true } }],
        },
        state,
      );

      expect(mockCasOperations.getCertificate).toHaveBeenCalledWith('cert-new');
      expect(mockCdnOperations.setDomainServerCertificate).toHaveBeenCalledWith('x.c', {
        serverCertificate: 'CERT-BODY-NEW',
        privateKey: 'CERT-KEY-NEW',
        serverCertificateStatus: 'on',
      });
    });
  });
});
