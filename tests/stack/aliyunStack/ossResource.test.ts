import { ProviderEnum } from '../../../src/common';
import { deleteBucketResource } from '../../../src/stack/aliyunStack/ossResource';
import { Context, CURRENT_STATE_VERSION, StateFile } from '../../../src/types';

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

      expect(mockOssOperations.unbindCustomDomain).not.toHaveBeenCalled();
      expect(mockOssOperations.deleteBucket).toHaveBeenCalledWith(bucketName);
      expect(result).toEqual(initialState);
    });
  });
});
