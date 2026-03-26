import { ProviderEnum } from '../../../../src/common';
import { executeBucketPlan } from '../../../../src/stack/aliyunStack/ossExecutor';
import {
  Context,
  CURRENT_STATE_VERSION,
  StateFile,
  BucketDomain,
  BucketAccessEnum,
  Plan,
} from '../../../../src/types';

const mockedLogger = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};

const mockedBucketResource = {
  createBucketResource: jest.fn(),
  updateBucketResource: jest.fn(),
  deleteBucketResource: jest.fn(),
};

const mockedStateManager = {
  getResource: jest.fn(),
};

jest.mock('../../../../src/common/logger', () => ({
  logger: {
    info: (...args: unknown[]) => mockedLogger.info(...args),
    error: (...args: unknown[]) => mockedLogger.error(...args),
    warn: (...args: unknown[]) => mockedLogger.warn(...args),
  },
}));

jest.mock('../../../../src/lang', () => ({
  lang: {
    __: (key: string) => key,
  },
}));

jest.mock('../../../../src/stack/aliyunStack/ossResource', () => ({
  createBucketResource: (...args: unknown[]) => mockedBucketResource.createBucketResource(...args),
  updateBucketResource: (...args: unknown[]) => mockedBucketResource.updateBucketResource(...args),
  deleteBucketResource: (...args: unknown[]) => mockedBucketResource.deleteBucketResource(...args),
}));

jest.mock('../../../../src/common/stateManager', () => ({
  getResource: (...args: unknown[]) => mockedStateManager.getResource(...args),
}));

const initialState: StateFile = {
  version: CURRENT_STATE_VERSION,
  provider: 'aliyun',
  app: 'test-app',
  service: 'test-service',
  stages: {},
  resources: {},
};

describe('OssExecutor', () => {
  const mockContext: Context = {
    stage: 'dev',
    app: 'test-app',
    service: 'test-service',
    provider: ProviderEnum.ALIYUN,
    region: 'cn-hangzhou',
    accountId: '123456789012',
    accessKeyId: 'test-key',
    accessKeySecret: 'test-secret',
    iacLocation: 'test.yml',
    parameters: [],
    stages: {},
  };

  const createTestBucket = (key: string = 'bucket1'): BucketDomain => ({
    key,
    name: `test-${key}`,
    security: { acl: BucketAccessEnum.PRIVATE, force_delete: false },
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockedStateManager.getResource.mockReturnValue(null);
    mockedBucketResource.createBucketResource.mockImplementation((ctx, bucket, state) => state);
    mockedBucketResource.updateBucketResource.mockImplementation((ctx, bucket, state) => state);
    mockedBucketResource.deleteBucketResource.mockImplementation((ctx, name, lid, state) => state);
  });

  describe('executeBucketPlan', () => {
    it('should execute create action', async () => {
      const bucket = createTestBucket('bucket1');
      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.bucket1',
            action: 'create',
            resourceType: 'ALIYUN_OSS_BUCKET',
          },
        ],
      };

      const result = await executeBucketPlan(mockContext, plan, [bucket], initialState);

      expect(mockedBucketResource.createBucketResource).toHaveBeenCalledWith(
        mockContext,
        bucket,
        initialState,
      );
      expect(result.partialFailure).toBeUndefined();
    });

    it('should execute update action', async () => {
      const bucket = createTestBucket('bucket1');
      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.bucket1',
            action: 'update',
            resourceType: 'ALIYUN_OSS_BUCKET',
          },
        ],
      };

      const result = await executeBucketPlan(mockContext, plan, [bucket], initialState);

      expect(mockedBucketResource.updateBucketResource).toHaveBeenCalledWith(
        mockContext,
        bucket,
        initialState,
      );
      expect(result.partialFailure).toBeUndefined();
    });

    it('should execute delete action', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.bucket1',
            action: 'delete',
            resourceType: 'ALIYUN_OSS_BUCKET',
          },
        ],
      };

      const existingState = {
        definition: { bucketName: 'test-bucket1' },
      };

      mockedStateManager.getResource.mockReturnValue(existingState);

      const result = await executeBucketPlan(mockContext, plan, undefined, initialState);

      expect(mockedBucketResource.deleteBucketResource).toHaveBeenCalledWith(
        mockContext,
        'test-bucket1',
        'buckets.bucket1',
        initialState,
      );
      expect(result.partialFailure).toBeUndefined();
    });

    it('should skip noop action', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.bucket1',
            action: 'noop',
            resourceType: 'ALIYUN_OSS_BUCKET',
          },
        ],
      };

      const result = await executeBucketPlan(mockContext, plan, undefined, initialState);

      expect(mockedLogger.info).toHaveBeenCalledWith(
        expect.stringContaining('NO_CHANGESForResource'),
      );
      expect(result.partialFailure).toBeUndefined();
    });

    it('should handle create action failure', async () => {
      const bucket = createTestBucket('bucket1');
      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.bucket1',
            action: 'create',
            resourceType: 'ALIYUN_OSS_BUCKET',
          },
        ],
      };

      const error = new Error('Create bucket failed');
      mockedBucketResource.createBucketResource.mockRejectedValue(error);

      const result = await executeBucketPlan(mockContext, plan, [bucket], initialState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error).toBe(error);
      expect(result.partialFailure?.failedItem.logicalId).toBe('buckets.bucket1');
    });

    it('should handle update action failure', async () => {
      const bucket = createTestBucket('bucket1');
      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.bucket1',
            action: 'update',
            resourceType: 'ALIYUN_OSS_BUCKET',
          },
        ],
      };

      const error = new Error('Update bucket failed');
      mockedBucketResource.updateBucketResource.mockRejectedValue(error);

      const result = await executeBucketPlan(mockContext, plan, [bucket], initialState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error).toBe(error);
    });

    it('should handle delete action failure', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.bucket1',
            action: 'delete',
            resourceType: 'ALIYUN_OSS_BUCKET',
          },
        ],
      };

      const existingState = {
        definition: { bucketName: 'test-bucket1' },
      };

      const error = new Error('Delete bucket failed');
      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedBucketResource.deleteBucketResource.mockRejectedValue(error);

      const result = await executeBucketPlan(mockContext, plan, undefined, initialState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error).toBe(error);
    });

    it('should handle missing bucket in map for create', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.missing_bucket',
            action: 'create',
            resourceType: 'ALIYUN_OSS_BUCKET',
          },
        ],
      };

      const result = await executeBucketPlan(mockContext, plan, [], initialState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error.message).toContain('Bucket not found');
    });

    it('should handle missing bucket in map for update', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.missing_bucket',
            action: 'update',
            resourceType: 'ALIYUN_OSS_BUCKET',
          },
        ],
      };

      const result = await executeBucketPlan(mockContext, plan, [], initialState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error.message).toContain('Bucket not found');
    });

    it('should handle missing state for delete', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.bucket1',
            action: 'delete',
            resourceType: 'ALIYUN_OSS_BUCKET',
          },
        ],
      };

      mockedStateManager.getResource.mockReturnValue(null);

      const result = await executeBucketPlan(mockContext, plan, undefined, initialState);

      expect(mockedLogger.warn).toHaveBeenCalledWith(
        expect.stringContaining('STATE_NOT_FOUND_SKIPPING'),
      );
      expect(result.partialFailure).toBeUndefined();
    });

    it('should call onStateChange callback after successful action', async () => {
      const bucket = createTestBucket('bucket1');
      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.bucket1',
            action: 'create',
            resourceType: 'ALIYUN_OSS_BUCKET',
          },
        ],
      };

      const onStateChange = jest.fn();
      const newState = { ...initialState, resources: { 'buckets.bucket1': {} } };
      mockedBucketResource.createBucketResource.mockResolvedValue(newState);

      await executeBucketPlan(mockContext, plan, [bucket], initialState, onStateChange);

      expect(onStateChange).toHaveBeenCalledWith(newState);
    });

    it('should handle multiple buckets in plan', async () => {
      const bucket1 = createTestBucket('bucket1');
      const bucket2 = createTestBucket('bucket2');

      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.bucket1',
            action: 'create',
            resourceType: 'ALIYUN_OSS_BUCKET',
          },
          {
            logicalId: 'buckets.bucket2',
            action: 'create',
            resourceType: 'ALIYUN_OSS_BUCKET',
          },
        ],
      };

      const result = await executeBucketPlan(mockContext, plan, [bucket1, bucket2], initialState);

      expect(mockedBucketResource.createBucketResource).toHaveBeenCalledTimes(2);
      expect(result.partialFailure).toBeUndefined();
    });

    it('should stop execution on first failure', async () => {
      const bucket1 = createTestBucket('bucket1');
      const bucket2 = createTestBucket('bucket2');

      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.bucket1',
            action: 'create',
            resourceType: 'ALIYUN_OSS_BUCKET',
          },
          {
            logicalId: 'buckets.bucket2',
            action: 'create',
            resourceType: 'ALIYUN_OSS_BUCKET',
          },
        ],
      };

      mockedBucketResource.createBucketResource.mockImplementation((ctx, bucket, state) => {
        if (bucket.key === 'bucket1') {
          throw new Error('Bucket1 creation failed');
        }
        return state;
      });

      const result = await executeBucketPlan(mockContext, plan, [bucket1, bucket2], initialState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.failedItem.logicalId).toBe('buckets.bucket1');
      expect(mockedBucketResource.createBucketResource).toHaveBeenCalledTimes(1);
    });
  });
});
