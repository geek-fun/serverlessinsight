/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { executeBucketPlan } from '../../../../src/stack/scfStack/cosExecutor';
import * as cosResource from '../../../../src/stack/scfStack/cosResource';
import * as stateManager from '../../../../src/common/stateManager';
import { ProviderEnum } from '../../../../src/common';
import {
  Context,
  StateFile,
  CURRENT_STATE_VERSION,
  Plan,
  PlanItem,
  BucketDomain,
  BucketAccessEnum,
  ResourceMode,
} from '../../../../src/types';

jest.mock('../../../../src/stack/scfStack/cosResource');
jest.mock('../../../../src/common/stateManager');

jest.mock('../../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

jest.mock('../../../../src/lang', () => ({
  lang: { __: (key: string) => key },
}));

describe('cosExecutor', () => {
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

  const testBucket: BucketDomain = {
    key: 'test_bucket',
    name: 'test-bucket',
    security: { acl: BucketAccessEnum.PRIVATE, force_delete: false },
    storage: { class: 'STANDARD' },
  };

  const mockPlan: Plan = {
    items: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('executeBucketPlan', () => {
    it('should handle empty plan', async () => {
      const plan: Plan = { items: [] };
      const result = await executeBucketPlan(mockContext, plan, [testBucket], initialState);

      expect(result.state).toEqual(initialState);
      expect(result.partialFailure).toBeUndefined();
    });

    it('should execute create action successfully', async () => {
      const newState: StateFile = {
        ...initialState,
        resources: {
          'buckets.test_bucket': {
            mode: 'managed' as ResourceMode,
            region: 'ap-guangzhou',
            definition: { bucket: 'test-bucket' },
            instances: [],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.test_bucket',
            action: 'create',
            resourceType: 'COS_BUCKET',
            changes: { after: {} },
          },
        ],
      };

      (cosResource.createBucketResource as jest.Mock).mockResolvedValue(newState);

      const result = await executeBucketPlan(mockContext, plan, [testBucket], initialState);

      expect(result.state).toEqual(newState);
      expect(result.partialFailure).toBeUndefined();
      expect(cosResource.createBucketResource).toHaveBeenCalledWith(
        mockContext,
        testBucket,
        initialState,
      );
    });

    it('should execute update action successfully', async () => {
      const newState: StateFile = {
        ...initialState,
        resources: {
          'buckets.test_bucket': {
            mode: 'managed' as ResourceMode,
            region: 'ap-guangzhou',
            definition: { bucket: 'test-bucket' },
            instances: [],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.test_bucket',
            action: 'update',
            resourceType: 'COS_BUCKET',
            changes: { before: {}, after: {} },
          },
        ],
      };

      (cosResource.updateBucketResource as jest.Mock).mockResolvedValue(newState);

      const result = await executeBucketPlan(mockContext, plan, [testBucket], initialState);

      expect(result.state).toEqual(newState);
      expect(result.partialFailure).toBeUndefined();
      expect(cosResource.updateBucketResource).toHaveBeenCalledWith(
        mockContext,
        testBucket,
        initialState,
      );
    });

    it('should execute delete action successfully', async () => {
      const stateWithBucket: StateFile = {
        ...initialState,
        resources: {
          'buckets.test_bucket': {
            mode: 'managed' as ResourceMode,
            region: 'ap-guangzhou',
            definition: { bucket: 'test-bucket' },
            instances: [],
            lastUpdated: new Date().toISOString(),
            metadata: {},
          },
        },
      };

      const newState: StateFile = {
        ...initialState,
        resources: {},
      };

      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.test_bucket',
            action: 'delete',
            resourceType: 'COS_BUCKET',
            changes: { before: {} },
          },
        ],
      };

      (stateManager.getResource as jest.Mock).mockReturnValue({
        definition: { bucket: 'test-bucket' },
        region: 'ap-guangzhou',
        metadata: {},
      });
      (cosResource.deleteBucketResource as jest.Mock).mockResolvedValue(newState);

      const result = await executeBucketPlan(mockContext, plan, [testBucket], stateWithBucket);

      expect(result.state).toEqual(newState);
      expect(result.partialFailure).toBeUndefined();
      expect(cosResource.deleteBucketResource).toHaveBeenCalledWith(
        mockContext,
        'test-bucket',
        'ap-guangzhou',
        'buckets.test_bucket',
        stateWithBucket,
      );
    });

    it('should handle noop action', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.test_bucket',
            action: 'noop',
            resourceType: 'COS_BUCKET',
          },
        ],
      };

      const result = await executeBucketPlan(mockContext, plan, [testBucket], initialState);

      expect(result.state).toEqual(initialState);
      expect(result.partialFailure).toBeUndefined();
    });

    it('should handle unknown action', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.test_bucket',
            action: 'unknown' as any,
            resourceType: 'COS_BUCKET',
          },
        ],
      };

      const result = await executeBucketPlan(mockContext, plan, [testBucket], initialState);

      expect(result.state).toEqual(initialState);
      expect(result.partialFailure).toBeUndefined();
    });

    it('should handle missing bucket not found for create', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.missing',
            action: 'create',
            resourceType: 'COS_BUCKET',
            changes: { after: {} },
          },
        ],
      };

      const result = await executeBucketPlan(mockContext, plan, [testBucket], initialState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error.message).toContain('Bucket not found for logical ID');
    });

    it('should handle missing bucket not found for update', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.missing',
            action: 'update',
            resourceType: 'COS_BUCKET',
            changes: { before: {}, after: {} },
          },
        ],
      };

      const result = await executeBucketPlan(mockContext, plan, [testBucket], initialState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error.message).toContain('Bucket not found for logical ID');
    });

    it('should handle state not found for delete', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.missing',
            action: 'delete',
            resourceType: 'COS_BUCKET',
            changes: { before: {} },
          },
        ],
      };

      (stateManager.getResource as jest.Mock).mockReturnValue(null);

      const result = await executeBucketPlan(mockContext, plan, [testBucket], initialState);

      expect(result.state).toEqual(initialState);
      expect(result.partialFailure).toBeUndefined();
    });

    it('should save state on successful action with onStateChange callback', async () => {
      const newState = {
        ...initialState,
        resources: {
          'buckets.test_bucket': {
            mode: 'managed',
            region: 'ap-guangzhou',
            definition: { bucket: 'test-bucket' },
            instances: [],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.test_bucket',
            action: 'create',
            resourceType: 'COS_BUCKET',
            changes: { after: {} },
          },
        ],
      };

      const mockSaveState = jest.fn();

      (cosResource.createBucketResource as jest.Mock).mockResolvedValue(newState);

      const result = await executeBucketPlan(
        mockContext,
        plan,
        [testBucket],
        initialState,
        mockSaveState,
      );

      expect(result.state).toEqual(newState);
      expect(mockSaveState).toHaveBeenCalledWith(newState);
    });

    it('should return partial failure on create action error', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.test_bucket',
            action: 'create',
            resourceType: 'COS_BUCKET',
            changes: { after: {} },
          },
        ],
      };

      const error = new Error('Create failed');
      (cosResource.createBucketResource as jest.Mock).mockRejectedValue(error);

      const result = await executeBucketPlan(mockContext, plan, [testBucket], initialState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error).toEqual(error);
      expect(result.partialFailure?.failedItem).toEqual(plan.items[0]);
      expect(result.partialFailure?.successfulItems).toEqual([]);
      expect(result.state).toEqual(initialState);
    });

    it('should return partial failure on update action error', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.test_bucket',
            action: 'update',
            resourceType: 'COS_BUCKET',
            changes: { before: {}, after: {} },
          },
        ],
      };

      const error = new Error('Update failed');
      (cosResource.updateBucketResource as jest.Mock).mockRejectedValue(error);

      const result = await executeBucketPlan(mockContext, plan, [testBucket], initialState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error).toEqual(error);
    });

    it('should handle multiple plan items and stop on first error', async () => {
      const newState = {
        ...initialState,
        resources: {
          'buckets.test_bucket': {
            mode: 'managed' as ResourceMode,
            region: 'ap-guangzhou',
            definition: { bucket: 'test-bucket' },
            instances: [],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      const bucket2: BucketDomain = {
        key: 'test_bucket2',
        name: 'test-bucket2',
        security: { acl: BucketAccessEnum.PRIVATE, force_delete: false },
        storage: { class: 'STANDARD' },
      };

      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.test_bucket',
            action: 'create',
            resourceType: 'COS_BUCKET',
            changes: { after: {} },
          },
          {
            logicalId: 'buckets.test_bucket2',
            action: 'create',
            resourceType: 'COS_BUCKET',
            changes: { after: {} },
          },
        ],
      };

      (cosResource.createBucketResource as jest.Mock)
        .mockResolvedValueOnce(newState)
        .mockRejectedValueOnce(new Error('Second bucket creation failed'));

      const result = await executeBucketPlan(
        mockContext,
        plan,
        [testBucket, bucket2],
        initialState,
      );

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.successfulItems).toHaveLength(1);
      expect(result.partialFailure?.failedItem.logicalId).toBe('buckets.test_bucket2');
    });
  });
});
