import { ProviderEnum } from '../../../src/common';
import { deleteBucketResource } from '../../../src/stack/scfStack/cosResource';
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

  beforeEach(() => {
    jest.clearAllMocks();
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

      expect(mockCosOperations.unbindCustomDomain).not.toHaveBeenCalled();
      expect(mockCosOperations.deleteBucket).toHaveBeenCalledWith(bucketName, region);
      expect(result).toEqual(initialState);
    });
  });
});
