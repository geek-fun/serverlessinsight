import { generateBucketPlan } from '../../../../src/stack/volcengineStack/tosPlanner';
import { createVolcengineClient } from '../../../../src/common/volcengineClient';
import { ProviderEnum } from '../../../../src/common';
import { BucketAccessEnum } from '../../../../src/types';
import type { BucketDomain, Context, StateFile } from '../../../../src/types';
import * as stateManager from '../../../../src/common/stateManager';
import * as hashUtils from '../../../../src/common/hashUtils';

jest.mock('../../../../src/common/volcengineClient', () => ({
  createVolcengineClient: jest.fn(),
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

describe('tosPlanner', () => {
  const mockContext: Context = {
    app: 'test-app',
    service: 'test-service',
    stage: 'dev',
    region: 'cn-beijing',
    provider: ProviderEnum.VOLCENGINE,
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

  let mockTosClient: { tos: { getBucket: jest.Mock } };

  beforeEach(() => {
    mockTosClient = {
      tos: {
        getBucket: jest.fn(),
      },
    };
    (createVolcengineClient as jest.Mock).mockReturnValue(mockTosClient);
    jest.spyOn(stateManager, 'getResource').mockReturnValue(undefined);
    jest.spyOn(stateManager, 'getAllResources').mockReturnValue({});
    jest
      .spyOn(hashUtils, 'attributesEqual')
      .mockImplementation((a, b) => JSON.stringify(a) === JSON.stringify(b));
    jest.spyOn(hashUtils, 'computeDirectoryHash').mockReturnValue('test-hash');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('generateBucketPlan', () => {
    it('should return empty plan when no buckets defined', async () => {
      const result = await generateBucketPlan(mockContext, mockState, undefined);

      expect(result.items).toEqual([]);
    });

    it('should return empty plan when buckets array is empty', async () => {
      const result = await generateBucketPlan(mockContext, mockState, []);

      expect(result.items).toEqual([]);
    });

    it('should generate create plan for new bucket', async () => {
      const buckets: Array<BucketDomain> = [
        {
          key: 'static_site',
          name: 'test-bucket',
          website: {
            index: 'index.html',
            code: './dist',
            error_page: '404.html',
            error_code: 404,
          },
        },
      ];

      mockTosClient.tos.getBucket.mockResolvedValueOnce(null);

      const result = await generateBucketPlan(mockContext, mockState, buckets);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].action).toBe('create');
      expect(result.items[0].logicalId).toBe('buckets.static_site');
    });

    it('should generate update plan when bucket exists with changes', async () => {
      const buckets: Array<BucketDomain> = [
        {
          key: 'static_site',
          name: 'test-bucket',
          security: { acl: BucketAccessEnum.PUBLIC_READ, force_delete: false },
        },
      ];

      const stateWithBucket: StateFile = {
        ...mockState,
        resources: {
          'buckets.static_site': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              bucketName: 'test-bucket',
              acl: 'private',
            },
            instances: [{ sid: 'test-sid', id: 'test-bucket', type: 'VOLCENGINE_TOS_BUCKET' }],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      mockTosClient.tos.getBucket.mockResolvedValueOnce({
        name: 'test-bucket',
        acl: 'private',
      });

      jest
        .spyOn(stateManager, 'getResource')
        .mockReturnValue(stateWithBucket.resources['buckets.static_site']);

      const result = await generateBucketPlan(mockContext, stateWithBucket, buckets);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].action).toBe('update');
      expect(result.items[0].drifted).toBe(true);
    });

    it('should generate noop plan when bucket unchanged', async () => {
      const buckets: Array<BucketDomain> = [
        {
          key: 'static_site',
          name: 'test-bucket',
        },
      ];

      const stateWithBucket: StateFile = {
        ...mockState,
        resources: {
          'buckets.static_site': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              bucketName: 'test-bucket',
              acl: null,
              storageClass: null,
              websiteConfiguration: null,
              websiteCodeHash: null,
            },
            instances: [{ sid: 'test-sid', id: 'test-bucket', type: 'VOLCENGINE_TOS_BUCKET' }],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      mockTosClient.tos.getBucket.mockResolvedValueOnce({
        name: 'test-bucket',
      });

      jest
        .spyOn(stateManager, 'getResource')
        .mockReturnValue(stateWithBucket.resources['buckets.static_site']);

      jest.spyOn(hashUtils, 'attributesEqual').mockReturnValue(true);

      const result = await generateBucketPlan(mockContext, stateWithBucket, buckets);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].action).toBe('noop');
    });

    it('should generate delete plan for removed bucket', async () => {
      const stateWithBucket: StateFile = {
        ...mockState,
        resources: {
          'buckets.old_bucket': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              bucketName: 'old-bucket',
            },
            instances: [{ sid: 'test-sid', id: 'old-bucket', type: 'VOLCENGINE_TOS_BUCKET' }],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      jest.spyOn(stateManager, 'getAllResources').mockReturnValue(stateWithBucket.resources);

      const result = await generateBucketPlan(mockContext, stateWithBucket, []);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].action).toBe('delete');
      expect(result.items[0].logicalId).toBe('buckets.old_bucket');
    });

    it('should generate create plan when bucket not found in provider', async () => {
      const buckets: Array<BucketDomain> = [
        {
          key: 'static_site',
          name: 'test-bucket',
        },
      ];

      const stateWithBucket: StateFile = {
        ...mockState,
        resources: {
          'buckets.static_site': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              bucketName: 'test-bucket',
            },
            instances: [{ sid: 'test-sid', id: 'test-bucket', type: 'VOLCENGINE_TOS_BUCKET' }],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      mockTosClient.tos.getBucket.mockResolvedValueOnce(null);

      jest
        .spyOn(stateManager, 'getResource')
        .mockReturnValue(stateWithBucket.resources['buckets.static_site']);

      const result = await generateBucketPlan(mockContext, stateWithBucket, buckets);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].action).toBe('create');
      expect(result.items[0].drifted).toBe(true);
    });

    it('should handle error when checking remote bucket', async () => {
      const buckets: Array<BucketDomain> = [
        {
          key: 'static_site',
          name: 'test-bucket',
        },
      ];

      const stateWithBucket: StateFile = {
        ...mockState,
        resources: {
          'buckets.static_site': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              bucketName: 'test-bucket',
            },
            instances: [{ sid: 'test-sid', id: 'test-bucket', type: 'VOLCENGINE_TOS_BUCKET' }],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      mockTosClient.tos.getBucket.mockRejectedValueOnce(new Error('Network error'));

      jest
        .spyOn(stateManager, 'getResource')
        .mockReturnValue(stateWithBucket.resources['buckets.static_site']);

      const result = await generateBucketPlan(mockContext, stateWithBucket, buckets);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].action).toBe('create');
    });
  });
});
