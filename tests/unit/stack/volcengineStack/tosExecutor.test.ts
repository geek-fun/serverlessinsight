import { executeBucketPlan } from '../../../../src/stack/volcengineStack/tosExecutor';
import {
  createResource,
  updateResource,
  deleteResource,
} from '../../../../src/stack/volcengineStack/tosResource';
import { PartialResourceError } from '../../../../src/types';
import type { BucketDomain, Context, Plan, StateFile } from '../../../../src/types';

jest.mock('../../../../src/stack/volcengineStack/tosResource', () => ({
  createResource: jest.fn(),
  updateResource: jest.fn(),
  deleteResource: jest.fn(),
  readResource: jest.fn(),
}));

jest.mock('../../../../src/common/stateManager', () => ({
  getResource: jest.fn(),
}));

jest.mock('../../../../src/common/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

jest.mock('../../../../src/lang', () => ({
  lang: {
    __: (key: string) => key,
  },
}));

describe('tosExecutor', () => {
  const mockContext: Context = {
    app: 'test-app',
    service: 'test-service',
    stage: 'dev',
    region: 'cn-beijing',
    provider: 'volcengine' as unknown as Context['provider'],
    accessKeyId: 'test-ak',
    accessKeySecret: 'test-sk',
    iacLocation: '/test/path',
  };

  const mockState: StateFile = {
    version: '1.0',
    provider: 'volcengine',
    app: 'test-app',
    service: 'test-service',
    stages: {},
    resources: {},
  };

  const mockBucket: BucketDomain = {
    key: 'static_site',
    name: 'test-bucket',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('executeBucketPlan', () => {
    it('should execute create action', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.static_site',
            action: 'create',
            resourceType: 'VOLCENGINE_TOS_BUCKET',
          },
        ],
      };

      const newState = {
        ...mockState,
        resources: { 'buckets.static_site': { mode: 'managed' } },
      };
      (createResource as jest.Mock).mockResolvedValueOnce(newState);

      const result = await executeBucketPlan(mockContext, plan, [mockBucket], mockState);

      expect(createResource).toHaveBeenCalledWith(mockContext, mockBucket, mockState);
      expect(result.state).toBe(newState);
    });

    it('should execute update action', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.static_site',
            action: 'update',
            resourceType: 'VOLCENGINE_TOS_BUCKET',
          },
        ],
      };

      (updateResource as jest.Mock).mockResolvedValueOnce({
        ...mockState,
        resources: { 'buckets.static_site': {} },
      });

      await executeBucketPlan(mockContext, plan, [mockBucket], mockState);

      expect(updateResource).toHaveBeenCalledWith(mockContext, mockBucket, mockState);
    });

    it('should execute delete action', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.static_site',
            action: 'delete',
            resourceType: 'VOLCENGINE_TOS_BUCKET',
            changes: { before: { bucketName: 'test-bucket' } },
          },
        ],
      };

      const stateWithBucket: StateFile = {
        ...mockState,
        resources: {
          'buckets.static_site': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { bucketName: 'test-bucket' },
            instances: [],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      const { getResource } = jest.requireMock('../../../../src/common/stateManager');
      getResource.mockReturnValueOnce(stateWithBucket.resources['buckets.static_site']);

      (deleteResource as jest.Mock).mockResolvedValueOnce(mockState);

      await executeBucketPlan(mockContext, plan, [], stateWithBucket);

      expect(deleteResource).toHaveBeenCalled();
    });

    it('should handle noop action', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.static_site',
            action: 'noop',
            resourceType: 'VOLCENGINE_TOS_BUCKET',
          },
        ],
      };

      await executeBucketPlan(mockContext, plan, [mockBucket], mockState);

      expect(createResource).not.toHaveBeenCalled();
      expect(updateResource).not.toHaveBeenCalled();
      expect(deleteResource).not.toHaveBeenCalled();
    });

    it('should return partial failure for missing bucket on create', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.missing',
            action: 'create',
            resourceType: 'VOLCENGINE_TOS_BUCKET',
          },
        ],
      };

      const result = await executeBucketPlan(mockContext, plan, [], mockState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error.message).toContain('Bucket not found');
    });

    it('should handle partial failure', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.static_site',
            action: 'create',
            resourceType: 'VOLCENGINE_TOS_BUCKET',
          },
        ],
      };

      (createResource as jest.Mock).mockRejectedValueOnce(new Error('Creation failed'));

      const result = await executeBucketPlan(mockContext, plan, [mockBucket], mockState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error.message).toBe('Creation failed');
    });

    it('should call onStateChange after each operation', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.static_site',
            action: 'create',
            resourceType: 'VOLCENGINE_TOS_BUCKET',
          },
        ],
      };

      const onStateChange = jest.fn();
      const newState = { ...mockState, resources: { 'buckets.static_site': {} } };
      (createResource as jest.Mock).mockResolvedValueOnce(newState);

      await executeBucketPlan(mockContext, plan, [mockBucket], mockState, onStateChange);

      expect(onStateChange).toHaveBeenCalledWith(newState);
    });

    it('should return partial failure for missing bucket on update', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.missing',
            action: 'update',
            resourceType: 'VOLCENGINE_TOS_BUCKET',
          },
        ],
      };

      const result = await executeBucketPlan(mockContext, plan, [], mockState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error.message).toContain('Bucket not found');
    });

    it('should skip delete when state not found', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.missing',
            action: 'delete',
            resourceType: 'VOLCENGINE_TOS_BUCKET',
          },
        ],
      };

      const { getResource } = jest.requireMock('../../../../src/common/stateManager');
      getResource.mockReturnValueOnce(null);

      const result = await executeBucketPlan(mockContext, plan, [], mockState);

      expect(deleteResource).not.toHaveBeenCalled();
      expect(result.state).toBe(mockState);
    });

    it('should handle unknown action', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.static_site',
            action: 'unknown' as 'create',
            resourceType: 'VOLCENGINE_TOS_BUCKET',
          },
        ],
      };

      const result = await executeBucketPlan(mockContext, plan, [], mockState);

      expect(createResource).not.toHaveBeenCalled();
      expect(result.state).toBe(mockState);
    });

    it('should handle PartialResourceError with updatedState', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'buckets.static_site',
            action: 'create',
            resourceType: 'VOLCENGINE_TOS_BUCKET',
          },
        ],
      };

      const updatedState: StateFile = {
        ...mockState,
        resources: {
          'buckets.static_site': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { bucketName: 'test-bucket' },
            instances: [
              {
                sid: 'test-sid',
                id: 'test-bucket',
                type: 'VOLCENGINE_TOS_BUCKET',
                status: 'tainted',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };
      const causeError = new Error('Upload failed');
      const partialError = new PartialResourceError(updatedState, causeError);

      (createResource as jest.Mock).mockRejectedValueOnce(partialError);

      const onStateChange = jest.fn();
      const result = await executeBucketPlan(
        mockContext,
        plan,
        [mockBucket],
        mockState,
        onStateChange,
      );

      expect(onStateChange).toHaveBeenCalledWith(updatedState);
      expect(result.state).toBe(updatedState);
      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error).toBe(causeError);
    });
  });
});
