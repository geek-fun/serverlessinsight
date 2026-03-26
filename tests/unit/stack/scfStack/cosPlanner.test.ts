import { generateBucketPlan } from '../../../../src/stack/scfStack/cosPlanner';
import * as cosTypes from '../../../../src/stack/scfStack/cosTypes';
import * as stateManager from '../../../../src/common/stateManager';
import * as hashUtils from '../../../../src/common/hashUtils';
import { ProviderEnum } from '../../../../src/common';
import {
  Context,
  StateFile,
  CURRENT_STATE_VERSION,
  BucketDomain,
  BucketAccessEnum,
  ResourceMode,
} from '../../../../src/types';

const mockCosOperations = {
  getBucket: jest.fn(),
  putBucket: jest.fn(),
  deleteBucket: jest.fn(),
};

jest.mock('../../../../src/stack/scfStack/cosTypes');
jest.mock('../../../../src/common/stateManager');
jest.mock('../../../../src/common/hashUtils');

jest.mock('../../../../src/common/tencentClient', () => ({
  createTencentClient: () => ({
    cos: mockCosOperations,
  }),
}));

jest.mock('../../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

jest.mock('../../../../src/lang', () => ({
  lang: { __: (key: string) => key },
}));

describe('cosPlanner', () => {
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

  beforeEach(() => {
    jest.clearAllMocks();
    (cosTypes.bucketToCosBucketConfig as jest.Mock).mockReturnValue({
      Bucket: 'test-bucket',
    });
    (cosTypes.extractCosBucketDefinition as jest.Mock).mockReturnValue({
      bucket: 'test-bucket',
    });
    (hashUtils.attributesEqual as jest.Mock).mockReturnValue(true);
  });

  describe('generateBucketPlan', () => {
    it('should return empty plan when no buckets and no state', async () => {
      (stateManager.getAllResources as jest.Mock).mockReturnValue({});

      const plan = await generateBucketPlan(mockContext, initialState, undefined);

      expect(plan.items).toEqual([]);
    });

    it('should plan deletion of buckets not in desired state', async () => {
      const stateWithBucket: StateFile = {
        ...initialState,
        resources: {
          'buckets.old_bucket': {
            mode: 'managed' as ResourceMode,
            region: 'ap-guangzhou',
            definition: { bucket: 'old-bucket' },
            instances: [],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      (stateManager.getAllResources as jest.Mock).mockReturnValue({
        'buckets.old_bucket': {
          definition: { bucket: 'old-bucket' },
        },
      });

      const plan = await generateBucketPlan(mockContext, stateWithBucket, [testBucket]);

      expect(plan.items).toHaveLength(2); // create new + delete old
      expect(plan.items.find((i) => i.action === 'delete')).toBeDefined();
    });

    it('should plan creation when bucket does not exist in state', async () => {
      (stateManager.getResource as jest.Mock).mockReturnValue(null);
      (stateManager.getAllResources as jest.Mock).mockReturnValue({});

      const plan = await generateBucketPlan(mockContext, initialState, [testBucket]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0].action).toBe('create');
      expect(plan.items[0].logicalId).toBe('buckets.test_bucket');
      expect(plan.items[0].resourceType).toBe('COS_BUCKET');
    });

    it('should plan creation when bucket exists in state but not in cloud', async () => {
      const stateWithBucket: StateFile = {
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

      (stateManager.getResource as jest.Mock).mockReturnValue({
        definition: { bucket: 'test-bucket' },
      });
      (stateManager.getAllResources as jest.Mock).mockReturnValue({});
      (mockCosOperations.getBucket as jest.Mock).mockResolvedValue(null);

      const plan = await generateBucketPlan(mockContext, stateWithBucket, [testBucket]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0].action).toBe('create');
      expect(plan.items[0].drifted).toBe(true);
    });

    it('should plan update when definition has changed', async () => {
      const stateWithBucket: StateFile = {
        ...initialState,
        resources: {
          'buckets.test_bucket': {
            mode: 'managed' as ResourceMode,
            region: 'ap-guangzhou',
            definition: { bucket: 'test-bucket', acl: 'PRIVATE' },
            instances: [],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      (stateManager.getResource as jest.Mock).mockReturnValue({
        definition: { bucket: 'test-bucket', acl: 'PRIVATE' },
      });
      (stateManager.getAllResources as jest.Mock).mockReturnValue({});
      (mockCosOperations.getBucket as jest.Mock).mockResolvedValue({
        Bucket: 'test-bucket',
      });
      (hashUtils.attributesEqual as jest.Mock).mockReturnValue(false);

      const plan = await generateBucketPlan(mockContext, stateWithBucket, [testBucket]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0].action).toBe('update');
      expect(plan.items[0].drifted).toBe(true);
    });

    it('should plan noop when bucket exists and definition unchanged', async () => {
      const stateWithBucket: StateFile = {
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

      (stateManager.getResource as jest.Mock).mockReturnValue({
        definition: { bucket: 'test-bucket' },
      });
      (stateManager.getAllResources as jest.Mock).mockReturnValue({});
      (mockCosOperations.getBucket as jest.Mock).mockResolvedValue({
        Bucket: 'test-bucket',
      });
      (hashUtils.attributesEqual as jest.Mock).mockReturnValue(true);

      const plan = await generateBucketPlan(mockContext, stateWithBucket, [testBucket]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0].action).toBe('noop');
    });

    it('should handle error when getting bucket from cloud', async () => {
      const stateWithBucket: StateFile = {
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

      (stateManager.getResource as jest.Mock).mockReturnValue({
        definition: { bucket: 'test-bucket' },
      });
      (stateManager.getAllResources as jest.Mock).mockReturnValue({});
      (mockCosOperations.getBucket as jest.Mock).mockRejectedValue(new Error('Network error'));

      const plan = await generateBucketPlan(mockContext, stateWithBucket, [testBucket]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0].action).toBe('create');
    });

    it('should handle empty buckets array', async () => {
      const stateWithBucket: StateFile = {
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

      (stateManager.getAllResources as jest.Mock).mockReturnValue({
        'buckets.test_bucket': {
          definition: { bucket: 'test-bucket' },
        },
      });

      const plan = await generateBucketPlan(mockContext, stateWithBucket, []);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0].action).toBe('delete');
    });

    it('should handle multiple buckets with mixed actions', async () => {
      const bucket2: BucketDomain = {
        key: 'test_bucket2',
        name: 'test-bucket2',
        security: { acl: BucketAccessEnum.PUBLIC_READ, force_delete: false },
        storage: { class: 'STANDARD' },
      };

      const stateWithBucket: StateFile = {
        ...initialState,
        resources: {
          'buckets.test_bucket': {
            mode: 'managed' as ResourceMode,
            region: 'ap-guangzhou',
            definition: { bucket: 'test-bucket' },
            instances: [],
            lastUpdated: new Date().toISOString(),
          },
          'buckets.old_bucket': {
            mode: 'managed' as ResourceMode,
            region: 'ap-guangzhou',
            definition: { bucket: 'old-bucket' },
            instances: [],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      (stateManager.getResource as jest.Mock)
        .mockReturnValueOnce({
          definition: { bucket: 'test-bucket' },
        })
        .mockReturnValueOnce(null);
      (stateManager.getAllResources as jest.Mock).mockReturnValue({
        'buckets.test_bucket': {
          definition: { bucket: 'test-bucket' },
        },
        'buckets.old_bucket': {
          definition: { bucket: 'old-bucket' },
        },
      });
      (mockCosOperations.getBucket as jest.Mock)
        .mockResolvedValueOnce({ Bucket: 'test-bucket' })
        .mockResolvedValueOnce(null);

      const plan = await generateBucketPlan(mockContext, stateWithBucket, [testBucket, bucket2]);

      expect(plan.items).toHaveLength(3); // noop, create, delete
      expect(
        plan.items.filter((i) => i.action === 'noop' && i.logicalId === 'buckets.test_bucket'),
      ).toHaveLength(1);
      expect(
        plan.items.filter((i) => i.action === 'create' && i.logicalId === 'buckets.test_bucket2'),
      ).toHaveLength(1);
      expect(
        plan.items.filter((i) => i.action === 'delete' && i.logicalId === 'buckets.old_bucket'),
      ).toHaveLength(1);
    });
  });
});
