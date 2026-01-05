import { ProviderEnum, setResource } from '../../../src/common';
import { generateBucketPlan } from '../../../src/stack/aliyunStack/ossPlanner';
import { BucketAccessEnum, BucketDomain, Context, CURRENT_STATE_VERSION } from '../../../src/types';

const initialState = { version: CURRENT_STATE_VERSION, provider: 'aliyun', resources: {} };

const mockOssOperations = {
  createBucket: jest.fn(),
  getBucket: jest.fn(),
  updateBucketAcl: jest.fn(),
  updateBucketWebsite: jest.fn(),
  deleteBucketWebsite: jest.fn(),
  deleteBucket: jest.fn(),
  uploadFiles: jest.fn(),
};

jest.mock('../../../src/common/aliyunClient', () => ({
  createAliyunClient: () => ({ oss: mockOssOperations }),
}));

describe('OSS Planner', () => {
  const mockContext: Context = {
    stage: 'default',
    stackName: 'test-stack',
    provider: ProviderEnum.ALIYUN,
    region: 'cn-hangzhou',
    accountId: '123456789012',
    accessKeyId: 'test-key',
    accessKeySecret: 'test-secret',
    iacLocation: 'test.yml',
    parameters: [],
    stages: {},
  };

  const testBucket: BucketDomain = {
    key: 'test_bucket',
    name: 'test-bucket',
    security: {
      acl: BucketAccessEnum.PUBLIC_READ,
      force_delete: false,
    },
    website: {
      index: 'index.html',
      code: 'dist',
      error_page: '404.html',
      error_code: 404,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateBucketPlan', () => {
    it('should plan to create a new bucket when state is empty', async () => {
      mockOssOperations.getBucket.mockResolvedValue(null);

      const state = initialState;

      const plan = await generateBucketPlan(mockContext, state, [testBucket]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'buckets.test_bucket',
        action: 'create',
        resourceType: 'ALIYUN_OSS_BUCKET',
      });
      expect(plan.items[0].changes?.after).toBeDefined();
    });

    it('should plan no changes when bucket exists and matches state', async () => {
      mockOssOperations.getBucket.mockResolvedValue({
        name: 'test-bucket',
        acl: 'public-read',
        websiteConfig: {
          indexDocument: 'index.html',
          errorDocument: '404.html',
        },
      });

      const state = setResource(initialState, 'buckets.test_bucket', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          bucketName: 'test-bucket',
          acl: 'public-read',
          websiteConfiguration: {
            indexDocument: 'index.html',
            errorDocument: '404.html',
          },
          storageClass: null,
          domain: null,
        },
        instances: [
          {
            arn: 'arn:acs:oss:cn-hangzhou:123456789012:test-bucket',
            id: 'test-bucket',
            bucketName: 'test-bucket',
          },
        ],
        lastUpdated: new Date().toISOString(),
      });

      const plan = await generateBucketPlan(mockContext, state, [testBucket]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'buckets.test_bucket',
        action: 'noop',
        resourceType: 'ALIYUN_OSS_BUCKET',
      });
    });

    it('should plan to update when definition changes', async () => {
      mockOssOperations.getBucket.mockResolvedValue({
        name: 'test-bucket',
        acl: 'private',
        websiteConfig: {
          indexDocument: 'index.html',
          errorDocument: '404.html',
        },
      });

      const state = setResource(initialState, 'buckets.test_bucket', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          bucketName: 'test-bucket',
          acl: 'private',
          websiteConfiguration: {
            indexDocument: 'index.html',
            errorDocument: '404.html',
          },
          storageClass: null,
          domain: null,
        },
        instances: [
          {
            arn: 'arn:acs:oss:cn-hangzhou:123456789012:test-bucket',
            id: 'test-bucket',
            bucketName: 'test-bucket',
          },
        ],
        lastUpdated: new Date().toISOString(),
      });

      const plan = await generateBucketPlan(mockContext, state, [testBucket]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'buckets.test_bucket',
        action: 'update',
        resourceType: 'ALIYUN_OSS_BUCKET',
      });
    });

    it('should plan to delete bucket when removed from config', async () => {
      mockOssOperations.getBucket.mockResolvedValue(null);

      const state = setResource(initialState, 'buckets.old_bucket', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          bucketName: 'old-bucket',
          acl: 'private',
          websiteConfiguration: {},
          storageClass: null,
          domain: null,
        },
        instances: [
          {
            arn: 'arn:acs:oss:cn-hangzhou:123456789012:old-bucket',
            id: 'old-bucket',
            bucketName: 'old-bucket',
          },
        ],
        lastUpdated: new Date().toISOString(),
      });

      const plan = await generateBucketPlan(mockContext, state, []);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'buckets.old_bucket',
        action: 'delete',
        resourceType: 'ALIYUN_OSS_BUCKET',
      });
    });

    it('should plan to recreate bucket when state exists but remote is missing', async () => {
      mockOssOperations.getBucket.mockResolvedValue(null);

      const state = setResource(initialState, 'buckets.test_bucket', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          bucketName: 'test-bucket',
          acl: 'public-read',
          websiteConfiguration: {
            indexDocument: 'index.html',
            errorDocument: '404.html',
          },
          storageClass: null,
          domain: null,
        },
        instances: [
          {
            arn: 'arn:acs:oss:cn-hangzhou:123456789012:test-bucket',
            id: 'test-bucket',
            bucketName: 'test-bucket',
          },
        ],
        lastUpdated: new Date().toISOString(),
      });

      const plan = await generateBucketPlan(mockContext, state, [testBucket]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'buckets.test_bucket',
        action: 'create',
        resourceType: 'ALIYUN_OSS_BUCKET',
        drifted: true,
      });
      expect(plan.items[0].changes?.after).toBeDefined();
    });

    it('should return empty plan when no buckets defined and state is empty', async () => {
      const plan = await generateBucketPlan(mockContext, initialState, undefined);

      expect(plan.items).toHaveLength(0);
    });

    it('should return empty plan when empty array and state is empty', async () => {
      const plan = await generateBucketPlan(mockContext, initialState, []);

      expect(plan.items).toHaveLength(0);
    });
  });
});
