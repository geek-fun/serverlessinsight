import {
  createResource,
  readResource,
  updateResource,
  deleteResource,
} from '../../../../src/stack/volcengineStack/tosResource';
import { createVolcengineClient } from '../../../../src/common/volcengineClient';
import { setResource, removeResource } from '../../../../src/common';
import type { BucketDomain, Context, StateFile } from '../../../../src/types';
import { BucketAccessEnum } from '../../../../src/types';

jest.mock('../../../../src/common/volcengineClient', () => ({
  createVolcengineClient: jest.fn(),
}));

jest.mock('../../../../src/common', () => ({
  setResource: jest.fn((state, logicalId, resourceState) => ({
    ...state,
    resources: { ...state.resources, [logicalId]: resourceState },
  })),
  removeResource: jest.fn((state, logicalId) => ({
    ...state,
    resources: Object.fromEntries(
      Object.entries(state.resources).filter(([key]) => key !== logicalId),
    ),
  })),
  buildSid: jest.fn((provider, service, stage, name) => `${provider}-${service}-${stage}-${name}`),
  computeDirectoryHash: jest.fn(() => 'test-hash-123'),
  ProviderEnum: {
    HUAWEI: 'huawei',
    ALIYUN: 'aliyun',
    TENCENT: 'tencent',
    AWS: 'aws',
    VOLCENGINE: 'volcengine',
  },
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

jest.mock('../../../../src/common', () => ({
  setResource: jest.fn((state, logicalId, resourceState) => ({
    ...state,
    resources: { ...state.resources, [logicalId]: resourceState },
  })),
  removeResource: jest.fn((state, logicalId) => ({
    ...state,
    resources: Object.fromEntries(
      Object.entries(state.resources).filter(([key]) => key !== logicalId),
    ),
  })),
  buildSid: jest.fn((provider, service, stage, name) => `${provider}-${service}-${stage}-${name}`),
  computeDirectoryHash: jest.fn(() => 'test-hash-123'),
  ProviderEnum: {
    HUAWEI: 'huawei',
    ALIYUN: 'aliyun',
    TENCENT: 'tencent',
    AWS: 'aws',
    VOLCENGINE: 'volcengine',
  },
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

describe('tosResource', () => {
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

  const mockTosClient = {
    tos: {
      createBucket: jest.fn(),
      getBucket: jest.fn(),
      deleteBucket: jest.fn(),
      updateBucketAcl: jest.fn(),
      updateBucketWebsite: jest.fn(),
      uploadFiles: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (createVolcengineClient as jest.Mock).mockReturnValue(mockTosClient);
  });

  describe('createResource', () => {
    it('should create bucket without website', async () => {
      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
      };

      mockTosClient.tos.createBucket.mockResolvedValueOnce({
        name: 'test-bucket',
        location: 'cn-beijing',
        acl: 'private',
      });

      await createResource(mockContext, bucket, mockState);

      expect(mockTosClient.tos.createBucket).toHaveBeenCalledWith(
        expect.objectContaining({ bucketName: 'test-bucket' }),
      );
      expect(mockTosClient.tos.uploadFiles).not.toHaveBeenCalled();
      expect(setResource).toHaveBeenCalled();
    });

    it('should create bucket with website and upload files', async () => {
      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
        website: {
          index: 'index.html',
          code: './dist',
          error_page: '404.html',
          error_code: 404,
        },
      };

      mockTosClient.tos.createBucket.mockResolvedValueOnce({
        name: 'test-bucket',
        location: 'cn-beijing',
      });
      mockTosClient.tos.uploadFiles.mockResolvedValueOnce(undefined);
      mockTosClient.tos.getBucket.mockResolvedValueOnce({
        name: 'test-bucket',
        websiteConfig: { indexDocument: 'index.html' },
      });

      await createResource(mockContext, bucket, mockState);

      expect(mockTosClient.tos.uploadFiles).toHaveBeenCalledWith('test-bucket', expect.any(String));
      expect(setResource).toHaveBeenCalled();
    });

    it('should handle upload error gracefully', async () => {
      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
        website: {
          index: 'index.html',
          code: './dist',
          error_page: '404.html',
          error_code: 404,
        },
      };

      mockTosClient.tos.createBucket.mockResolvedValueOnce({
        name: 'test-bucket',
        location: 'cn-beijing',
      });
      mockTosClient.tos.uploadFiles.mockRejectedValueOnce(new Error('Upload failed'));

      await createResource(mockContext, bucket, mockState);

      expect(setResource).toHaveBeenCalled();
    });
  });

  describe('readResource', () => {
    it('should read bucket from provider', async () => {
      mockTosClient.tos.getBucket.mockResolvedValueOnce({
        name: 'test-bucket',
        location: 'cn-beijing',
        acl: 'private',
      });

      const bucketInfo = await readResource(mockContext, 'test-bucket');

      expect(mockTosClient.tos.getBucket).toHaveBeenCalledWith('test-bucket');
      expect(bucketInfo).toEqual({
        name: 'test-bucket',
        location: 'cn-beijing',
        acl: 'private',
      });
    });
  });

  describe('updateResource', () => {
    it('should update bucket ACL and website', async () => {
      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
        security: { acl: BucketAccessEnum.PUBLIC_READ, force_delete: false },
        website: {
          index: 'index.html',
          code: './dist',
          error_page: '404.html',
          error_code: 404,
        },
      };

      mockTosClient.tos.updateBucketAcl.mockResolvedValueOnce(undefined);
      mockTosClient.tos.updateBucketWebsite.mockResolvedValueOnce(undefined);
      mockTosClient.tos.uploadFiles.mockResolvedValueOnce(undefined);
      mockTosClient.tos.getBucket.mockResolvedValueOnce({
        name: 'test-bucket',
        acl: 'public-read',
      });

      await updateResource(mockContext, bucket, mockState);

      expect(mockTosClient.tos.updateBucketAcl).toHaveBeenCalledWith('test-bucket', 'public-read');
      expect(mockTosClient.tos.updateBucketWebsite).toHaveBeenCalled();
      expect(setResource).toHaveBeenCalled();
    });

    it('should throw error if bucket not found after update', async () => {
      const bucket: BucketDomain = {
        key: 'static_site',
        name: 'test-bucket',
      };

      mockTosClient.tos.getBucket.mockResolvedValueOnce(null);

      await expect(updateResource(mockContext, bucket, mockState)).rejects.toThrow();
    });
  });

  describe('deleteResource', () => {
    it('should delete bucket successfully', async () => {
      mockTosClient.tos.deleteBucket.mockResolvedValueOnce(undefined);

      await deleteResource(mockContext, 'test-bucket', 'buckets.static_site', mockState);

      expect(mockTosClient.tos.deleteBucket).toHaveBeenCalledWith('test-bucket');
      expect(removeResource).toHaveBeenCalledWith(mockState, 'buckets.static_site');
    });

    it('should handle NoSuchBucket error', async () => {
      const error = new Error('Not found') as Error & { code: string };
      error.code = 'NoSuchBucket';
      mockTosClient.tos.deleteBucket.mockRejectedValueOnce(error);

      await deleteResource(mockContext, 'test-bucket', 'buckets.static_site', mockState);

      expect(removeResource).toHaveBeenCalledWith(mockState, 'buckets.static_site');
    });

    it('should handle ResourceNotFound error', async () => {
      const error = new Error('Not found') as Error & { code: string };
      error.code = 'ResourceNotFound';
      mockTosClient.tos.deleteBucket.mockRejectedValueOnce(error);

      await deleteResource(mockContext, 'test-bucket', 'buckets.static_site', mockState);

      expect(removeResource).toHaveBeenCalledWith(mockState, 'buckets.static_site');
    });

    it('should throw other errors', async () => {
      const error = new Error('Access denied') as Error & { code: string };
      error.code = 'AccessDenied';
      mockTosClient.tos.deleteBucket.mockRejectedValueOnce(error);

      await expect(
        deleteResource(mockContext, 'test-bucket', 'buckets.static_site', mockState),
      ).rejects.toThrow('Access denied');
    });
  });
});
