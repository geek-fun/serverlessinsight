import {
  createCosBucket,
  getCosBucket,
  updateCosBucketAcl,
  updateCosBucketWebsite,
  deleteCosBucket,
} from '../../../src/stack/scfStack/cosProvider';
import { createCosClient } from '../../../src/common/cosClient';
import { ProviderEnum } from '../../../src/common';
import { Context } from '../../../src/types';

// Mock dependencies
jest.mock('../../../src/common/cosClient');

describe('CosProvider', () => {
  const mockContext: Context = {
    stage: 'default',
    stackName: 'test-stack',
    provider: ProviderEnum.TENCENT,
    region: 'ap-guangzhou',
    accessKeyId: 'test-key',
    accessKeySecret: 'test-secret',
    iacLocation: 'test.yml',
    parameters: [],
    stages: {},
  };

  const mockConfig = {
    Bucket: 'test-bucket',
    Region: 'ap-guangzhou',
    ACL: 'public-read' as const,
    WebsiteConfiguration: {
      IndexDocument: {
        Suffix: 'index.html',
      },
      ErrorDocument: {
        Key: '404.html',
      },
    },
  };

  let mockClient: {
    putBucket: jest.Mock;
    putBucketAcl: jest.Mock;
    putBucketWebsite: jest.Mock;
    headBucket: jest.Mock;
    getBucketAcl: jest.Mock;
    getBucketWebsite: jest.Mock;
    deleteBucket: jest.Mock;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockClient = {
      putBucket: jest.fn((params, callback) => callback(null)),
      putBucketAcl: jest.fn((params, callback) => callback(null)),
      putBucketWebsite: jest.fn((params, callback) => callback(null)),
      headBucket: jest.fn((params, callback) => callback(null, {})),
      getBucketAcl: jest.fn((params, callback) => callback(null, { ACL: 'public-read' })),
      getBucketWebsite: jest.fn((params, callback) =>
        callback(null, {
          IndexDocument: { Suffix: 'index.html' },
          ErrorDocument: { Key: '404.html' },
        }),
      ),
      deleteBucket: jest.fn((params, callback) => callback(null)),
    };
    (createCosClient as jest.Mock).mockReturnValue(mockClient);
  });

  describe('createCosBucket', () => {
    it('should create bucket with all parameters', async () => {
      await createCosBucket(mockContext, mockConfig);

      expect(createCosClient).toHaveBeenCalledWith(mockContext);
      expect(mockClient.putBucket).toHaveBeenCalledWith(
        {
          Bucket: 'test-bucket',
          Region: 'ap-guangzhou',
        },
        expect.any(Function),
      );
      expect(mockClient.putBucketAcl).toHaveBeenCalledWith(
        {
          Bucket: 'test-bucket',
          Region: 'ap-guangzhou',
          ACL: 'public-read',
        },
        expect.any(Function),
      );
      expect(mockClient.putBucketWebsite).toHaveBeenCalledWith(
        {
          Bucket: 'test-bucket',
          Region: 'ap-guangzhou',
          WebsiteConfiguration: mockConfig.WebsiteConfiguration,
        },
        expect.any(Function),
      );
    });

    it('should create bucket without ACL', async () => {
      const configWithoutAcl = {
        Bucket: 'test-bucket',
        Region: 'ap-guangzhou',
      };

      await createCosBucket(mockContext, configWithoutAcl);

      expect(mockClient.putBucket).toHaveBeenCalled();
      expect(mockClient.putBucketAcl).not.toHaveBeenCalled();
    });

    it('should create bucket without website configuration', async () => {
      const configWithoutWebsite = {
        Bucket: 'test-bucket',
        Region: 'ap-guangzhou',
      };

      await createCosBucket(mockContext, configWithoutWebsite);

      expect(mockClient.putBucket).toHaveBeenCalled();
      expect(mockClient.putBucketWebsite).not.toHaveBeenCalled();
    });

    it('should propagate errors from client', async () => {
      const error = new Error('Create failed');
      mockClient.putBucket = jest.fn((params, callback) => callback(error));

      await expect(createCosBucket(mockContext, mockConfig)).rejects.toThrow('Create failed');
    });
  });

  describe('getCosBucket', () => {
    it('should get bucket successfully', async () => {
      const result = await getCosBucket(mockContext, 'test-bucket', 'ap-guangzhou');

      expect(createCosClient).toHaveBeenCalledWith(mockContext);
      expect(mockClient.headBucket).toHaveBeenCalledWith(
        {
          Bucket: 'test-bucket',
          Region: 'ap-guangzhou',
        },
        expect.any(Function),
      );
      expect(result).toEqual({
        Name: 'test-bucket',
        Location: 'ap-guangzhou',
        ACL: 'public-read',
        WebsiteConfiguration: {
          IndexDocument: { Suffix: 'index.html' },
          ErrorDocument: { Key: '404.html' },
        },
      });
    });

    it('should return null for non-existent bucket', async () => {
      mockClient.headBucket = jest.fn((params, callback) =>
        callback({ statusCode: 404, message: 'Not Found' }),
      );

      const result = await getCosBucket(mockContext, 'nonexistent', 'ap-guangzhou');

      expect(result).toBeNull();
    });

    it('should handle bucket without ACL', async () => {
      mockClient.getBucketAcl = jest.fn((params, callback) =>
        callback(new Error('ACL not accessible')),
      );

      const result = await getCosBucket(mockContext, 'test-bucket', 'ap-guangzhou');

      expect(result).toEqual({
        Name: 'test-bucket',
        Location: 'ap-guangzhou',
        ACL: undefined,
        WebsiteConfiguration: {
          IndexDocument: { Suffix: 'index.html' },
          ErrorDocument: { Key: '404.html' },
        },
      });
    });

    it('should handle bucket without website configuration', async () => {
      mockClient.getBucketWebsite = jest.fn((params, callback) =>
        callback(new Error('Website not configured')),
      );

      const result = await getCosBucket(mockContext, 'test-bucket', 'ap-guangzhou');

      expect(result).toEqual({
        Name: 'test-bucket',
        Location: 'ap-guangzhou',
        ACL: 'public-read',
        WebsiteConfiguration: undefined,
      });
    });

    it('should propagate non-404 errors', async () => {
      const error = new Error('Some other error');
      mockClient.headBucket = jest.fn((params, callback) => callback(error));

      await expect(getCosBucket(mockContext, 'test-bucket', 'ap-guangzhou')).rejects.toThrow(
        'Some other error',
      );
    });
  });

  describe('updateCosBucketAcl', () => {
    it('should update bucket ACL', async () => {
      await updateCosBucketAcl(mockContext, 'test-bucket', 'ap-guangzhou', 'private');

      expect(createCosClient).toHaveBeenCalledWith(mockContext);
      expect(mockClient.putBucketAcl).toHaveBeenCalledWith(
        {
          Bucket: 'test-bucket',
          Region: 'ap-guangzhou',
          ACL: 'private',
        },
        expect.any(Function),
      );
    });

    it('should propagate errors from client', async () => {
      const error = new Error('Update ACL failed');
      mockClient.putBucketAcl = jest.fn((params, callback) => callback(error));

      await expect(
        updateCosBucketAcl(mockContext, 'test-bucket', 'ap-guangzhou', 'private'),
      ).rejects.toThrow('Update ACL failed');
    });
  });

  describe('updateCosBucketWebsite', () => {
    it('should update bucket website configuration', async () => {
      const websiteConfig = {
        IndexDocument: { Suffix: 'home.html' },
        ErrorDocument: { Key: 'error.html' },
      };

      await updateCosBucketWebsite(mockContext, 'test-bucket', 'ap-guangzhou', websiteConfig);

      expect(createCosClient).toHaveBeenCalledWith(mockContext);
      expect(mockClient.putBucketWebsite).toHaveBeenCalledWith(
        {
          Bucket: 'test-bucket',
          Region: 'ap-guangzhou',
          WebsiteConfiguration: websiteConfig,
        },
        expect.any(Function),
      );
    });

    it('should propagate errors from client', async () => {
      const error = new Error('Update website failed');
      mockClient.putBucketWebsite = jest.fn((params, callback) => callback(error));

      await expect(
        updateCosBucketWebsite(mockContext, 'test-bucket', 'ap-guangzhou', {
          IndexDocument: { Suffix: 'index.html' },
        }),
      ).rejects.toThrow('Update website failed');
    });
  });

  describe('deleteCosBucket', () => {
    it('should delete bucket', async () => {
      await deleteCosBucket(mockContext, 'test-bucket', 'ap-guangzhou');

      expect(createCosClient).toHaveBeenCalledWith(mockContext);
      expect(mockClient.deleteBucket).toHaveBeenCalledWith(
        {
          Bucket: 'test-bucket',
          Region: 'ap-guangzhou',
        },
        expect.any(Function),
      );
    });

    it('should propagate errors from client', async () => {
      const error = new Error('Delete failed');
      mockClient.deleteBucket = jest.fn((params, callback) => callback(error));

      await expect(deleteCosBucket(mockContext, 'test-bucket', 'ap-guangzhou')).rejects.toThrow(
        'Delete failed',
      );
    });
  });
});
