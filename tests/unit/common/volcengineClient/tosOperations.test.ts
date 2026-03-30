import { Service } from '@volcengine/openapi';
import { createTosOperations } from '../../../../src/common/volcengineClient/tosOperations';
import type { TosBucketConfig } from '../../../../src/common/volcengineClient/types';

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
    __: (key: string, params?: Record<string, string>) => {
      if (params) {
        return `${key} ${JSON.stringify(params)}`;
      }
      return key;
    },
  },
}));

type MockTosClient = {
  fetchOpenAPI: jest.Mock;
};

const createMockTosClient = (): MockTosClient => ({
  fetchOpenAPI: jest.fn(),
});

describe('tosOperations', () => {
  let operations: ReturnType<typeof createTosOperations>;
  let mockClient: MockTosClient;

  const mockBucketConfig: TosBucketConfig = {
    bucketName: 'test-bucket',
    acl: 'private',
  };

  describe('with null client', () => {
    beforeEach(() => {
      operations = createTosOperations(null, 'cn-beijing');
    });

    it('should throw error when creating bucket with null client', async () => {
      await expect(operations.createBucket(mockBucketConfig)).rejects.toThrow(
        'VOLCENGINE_TOS_CLIENT_NOT_INITIALIZED',
      );
    });

    it('should throw error when getting bucket with null client', async () => {
      await expect(operations.getBucket('test-bucket')).rejects.toThrow(
        'VOLCENGINE_TOS_CLIENT_NOT_INITIALIZED',
      );
    });

    it('should throw error when deleting bucket with null client', async () => {
      await expect(operations.deleteBucket('test-bucket')).rejects.toThrow(
        'VOLCENGINE_TOS_CLIENT_NOT_INITIALIZED',
      );
    });

    it('should throw error when updating bucket ACL with null client', async () => {
      await expect(operations.updateBucketAcl('test-bucket', 'public-read')).rejects.toThrow(
        'VOLCENGINE_TOS_CLIENT_NOT_INITIALIZED',
      );
    });

    it('should throw error when updating bucket website with null client', async () => {
      await expect(
        operations.updateBucketWebsite('test-bucket', { indexDocument: 'index.html' }),
      ).rejects.toThrow('VOLCENGINE_TOS_CLIENT_NOT_INITIALIZED');
    });

    it('should throw error when putting object with null client', async () => {
      await expect(
        operations.putObject('test-bucket', 'test.txt', Buffer.from('test')),
      ).rejects.toThrow('VOLCENGINE_TOS_CLIENT_NOT_INITIALIZED');
    });

    it('should throw error when listing objects with null client', async () => {
      await expect(operations.listObjects('test-bucket')).rejects.toThrow(
        'VOLCENGINE_TOS_CLIENT_NOT_INITIALIZED',
      );
    });

    it('should throw error when deleting objects with null client', async () => {
      await expect(operations.deleteObjects('test-bucket', ['key'])).rejects.toThrow(
        'VOLCENGINE_TOS_CLIENT_NOT_INITIALIZED',
      );
    });

    it('should throw error when uploading files with null client', async () => {
      await expect(operations.uploadFiles('test-bucket', '/tmp/test')).rejects.toThrow(
        'VOLCENGINE_TOS_CLIENT_NOT_INITIALIZED',
      );
    });
  });

  describe('with mock client', () => {
    beforeEach(() => {
      mockClient = createMockTosClient();
      operations = createTosOperations(mockClient as unknown as Service, 'cn-beijing');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('createBucket', () => {
      it('should create bucket successfully', async () => {
        mockClient.fetchOpenAPI
          .mockResolvedValueOnce({}) // CreateBucket
          .mockResolvedValueOnce({
            // GetBucketInfo
            Result: {
              BucketInfo: {
                Location: 'cn-beijing',
                CreationDate: '2024-01-01T00:00:00Z',
                StorageClass: 'STANDARD',
                ExtranetEndpoint: 'tos-cn-beijing.volces.com',
                IntranetEndpoint: 'tos-cn-beijing.ivolces.com',
                ACL: 'private',
              },
            },
          });

        const result = await operations.createBucket(mockBucketConfig);

        expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            Action: 'CreateBucket',
            Version: '2018-08-01',
          }),
        );
        expect(result.name).toBe('test-bucket');
      });

      it('should create bucket with storage class', async () => {
        const configWithStorageClass: TosBucketConfig = {
          bucketName: 'test-bucket',
          storageClass: 'IA',
        };

        mockClient.fetchOpenAPI
          .mockResolvedValueOnce({}) // CreateBucket
          .mockResolvedValueOnce({
            // GetBucketInfo
            Result: {
              BucketInfo: {
                Location: 'cn-beijing',
                StorageClass: 'IA',
                ExtranetEndpoint: 'tos-cn-beijing.volces.com',
                IntranetEndpoint: 'tos-cn-beijing.ivolces.com',
              },
            },
          });

        const result = await operations.createBucket(configWithStorageClass);

        expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            query: expect.objectContaining({
              StorageClass: 'IA',
            }),
          }),
        );
        expect(result.storageClass).toBe('IA');
      });

      it('should create bucket with website config without error document', async () => {
        const configWithWebsite: TosBucketConfig = {
          bucketName: 'test-bucket',
          websiteConfig: {
            indexDocument: 'index.html',
          },
        };

        mockClient.fetchOpenAPI
          .mockResolvedValueOnce({}) // CreateBucket
          .mockResolvedValueOnce({}) // PutBucketWebsite
          .mockResolvedValueOnce({
            // GetBucketInfo
            Result: {
              BucketInfo: {
                Location: 'cn-beijing',
                StorageClass: 'STANDARD',
                ExtranetEndpoint: 'tos-cn-beijing.volces.com',
                IntranetEndpoint: 'tos-cn-beijing.ivolces.com',
              },
            },
          });

        await operations.createBucket(configWithWebsite);

        expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            Action: 'PutBucketWebsite',
          }),
        );
      });

      it('should create bucket with website config', async () => {
        const configWithWebsite: TosBucketConfig = {
          bucketName: 'test-bucket',
          acl: 'public-read',
          websiteConfig: {
            indexDocument: 'index.html',
            errorDocument: '404.html',
          },
        };

        mockClient.fetchOpenAPI
          .mockResolvedValueOnce({}) // CreateBucket
          .mockResolvedValueOnce({}) // PutBucketWebsite
          .mockResolvedValueOnce({
            // GetBucketInfo
            Result: {
              BucketInfo: {
                Location: 'cn-beijing',
                StorageClass: 'STANDARD',
                ExtranetEndpoint: 'tos-cn-beijing.volces.com',
                IntranetEndpoint: 'tos-cn-beijing.ivolces.com',
                ACL: 'public-read',
              },
            },
          });

        const result = await operations.createBucket(configWithWebsite);

        expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            Action: 'PutBucketWebsite',
          }),
        );
        expect(result.acl).toBe('public-read');
      });
    });

    describe('getBucket', () => {
      it('should return bucket info when bucket exists', async () => {
        mockClient.fetchOpenAPI.mockResolvedValueOnce({
          Result: {
            BucketInfo: {
              Location: 'cn-beijing',
              CreationDate: '2024-01-01T00:00:00Z',
              StorageClass: 'STANDARD',
              ExtranetEndpoint: 'tos-cn-beijing.volces.com',
              IntranetEndpoint: 'tos-cn-beijing.ivolces.com',
              ACL: 'private',
            },
          },
        });

        const result = await operations.getBucket('test-bucket');

        expect(result).not.toBeNull();
        expect(result?.name).toBe('test-bucket');
        expect(result?.location).toBe('cn-beijing');
      });

      it('should return bucket info with website config', async () => {
        mockClient.fetchOpenAPI
          .mockResolvedValueOnce({
            // GetBucketInfo
            Result: {
              BucketInfo: {
                Location: 'cn-beijing',
                StorageClass: 'STANDARD',
              },
            },
          })
          .mockResolvedValueOnce({
            // GetBucketWebsite
            Result: {
              IndexDocument: { Suffix: 'index.html' },
              ErrorDocument: { Key: '404.html' },
            },
          });

        const result = await operations.getBucket('test-bucket');

        expect(result).not.toBeNull();
        expect(result?.websiteConfig).toEqual({
          indexDocument: 'index.html',
          errorDocument: '404.html',
        });
      });

      it('should return null when bucket does not exist (NoSuchBucket)', async () => {
        const error = new Error('Bucket not found') as Error & { code: string };
        error.code = 'NoSuchBucket';
        mockClient.fetchOpenAPI.mockRejectedValueOnce(error);

        const result = await operations.getBucket('nonexistent-bucket');

        expect(result).toBeNull();
      });

      it('should return null when bucket does not exist (ResourceNotFound)', async () => {
        const error = new Error('Bucket not found') as Error & { code: string };
        error.code = 'ResourceNotFound';
        mockClient.fetchOpenAPI.mockRejectedValueOnce(error);

        const result = await operations.getBucket('nonexistent-bucket');

        expect(result).toBeNull();
      });

      it('should throw error for other errors', async () => {
        const error = new Error('Access denied') as Error & { code: string };
        error.code = 'AccessDenied';
        mockClient.fetchOpenAPI.mockRejectedValueOnce(error);

        await expect(operations.getBucket('test-bucket')).rejects.toThrow('Access denied');
      });
    });

    describe('deleteBucket', () => {
      it('should delete bucket and its objects', async () => {
        mockClient.fetchOpenAPI
          .mockResolvedValueOnce({ Result: { Contents: [] } }) // ListObjectsType2
          .mockResolvedValueOnce({}); // DeleteBucket

        await operations.deleteBucket('test-bucket');

        expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            Action: 'DeleteBucket',
          }),
        );
      });

      it('should delete objects before deleting bucket', async () => {
        mockClient.fetchOpenAPI
          .mockResolvedValueOnce({
            Result: {
              Contents: [{ Key: 'file1.txt' }, { Key: 'file2.txt' }],
            },
          })
          .mockResolvedValueOnce({}) // DeleteMultipleObjects
          .mockResolvedValueOnce({ Result: { Contents: [] } }) // ListObjectsType2 (empty)
          .mockResolvedValueOnce({}); // DeleteBucket

        await operations.deleteBucket('test-bucket');

        expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            Action: 'DeleteMultipleObjects',
          }),
        );
      });

      it('should handle pagination when listing objects', async () => {
        mockClient.fetchOpenAPI
          .mockResolvedValueOnce({
            Result: {
              Contents: [{ Key: 'file1.txt' }],
              NextContinuationToken: 'token123',
            },
          })
          .mockResolvedValueOnce({}) // DeleteMultipleObjects
          .mockResolvedValueOnce({
            Result: {
              Contents: [{ Key: 'file2.txt' }],
            },
          })
          .mockResolvedValueOnce({}) // DeleteMultipleObjects
          .mockResolvedValueOnce({}); // DeleteBucket

        await operations.deleteBucket('test-bucket');

        expect(mockClient.fetchOpenAPI).toHaveBeenCalledTimes(5);
      });

      it('should handle NoSuchBucket error gracefully', async () => {
        const error = new Error('Bucket not found') as Error & { code: string };
        error.code = 'NoSuchBucket';
        mockClient.fetchOpenAPI.mockRejectedValueOnce(error);

        await operations.deleteBucket('nonexistent-bucket');

        expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            Action: 'ListObjectsType2',
          }),
        );
      });

      it('should handle ResourceNotFound error gracefully', async () => {
        const error = new Error('Resource not found') as Error & { code: string };
        error.code = 'ResourceNotFound';
        mockClient.fetchOpenAPI.mockRejectedValueOnce(error);

        await operations.deleteBucket('nonexistent-bucket');

        expect(mockClient.fetchOpenAPI).toHaveBeenCalled();
      });

      it('should throw error for other errors', async () => {
        const error = new Error('Access denied') as Error & { code: string };
        error.code = 'AccessDenied';
        mockClient.fetchOpenAPI.mockRejectedValueOnce(error);

        await expect(operations.deleteBucket('test-bucket')).rejects.toThrow('Access denied');
      });
    });

    describe('updateBucketAcl', () => {
      it('should update bucket ACL', async () => {
        mockClient.fetchOpenAPI.mockResolvedValueOnce({});

        await operations.updateBucketAcl('test-bucket', 'public-read');

        expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            Action: 'PutBucketAcl',
            query: expect.objectContaining({
              ACL: 'public-read',
            }),
          }),
        );
      });
    });

    describe('updateBucketWebsite', () => {
      it('should update bucket website config', async () => {
        mockClient.fetchOpenAPI.mockResolvedValueOnce({});

        await operations.updateBucketWebsite('test-bucket', {
          indexDocument: 'index.html',
          errorDocument: '404.html',
        });

        expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            Action: 'PutBucketWebsite',
          }),
        );
      });

      it('should update bucket website config without error document', async () => {
        mockClient.fetchOpenAPI.mockResolvedValueOnce({});

        await operations.updateBucketWebsite('test-bucket', {
          indexDocument: 'index.html',
        });

        expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            Action: 'PutBucketWebsite',
            data: expect.objectContaining({
              IndexDocument: { Suffix: 'index.html' },
            }),
          }),
        );
        expect(mockClient.fetchOpenAPI).not.toHaveBeenCalledWith(
          expect.objectContaining({
            data: expect.objectContaining({
              ErrorDocument: expect.anything(),
            }),
          }),
        );
      });
    });

    describe('putObject', () => {
      it('should put object to bucket', async () => {
        mockClient.fetchOpenAPI.mockResolvedValueOnce({});

        await operations.putObject('test-bucket', 'test.txt', Buffer.from('test content'));

        expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            Action: 'PutObject',
            query: expect.objectContaining({
              Bucket: 'test-bucket',
              Key: 'test.txt',
            }),
          }),
        );
      });

      it('should set correct content type for html files', async () => {
        mockClient.fetchOpenAPI.mockResolvedValueOnce({});

        await operations.putObject('test-bucket', 'index.html', Buffer.from('<html></html>'));

        expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            headers: expect.objectContaining({
              'content-type': 'text/html',
            }),
          }),
        );
      });

      it('should set correct content type for json files', async () => {
        mockClient.fetchOpenAPI.mockResolvedValueOnce({});

        await operations.putObject('test-bucket', 'data.json', Buffer.from('{}'));

        expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            headers: expect.objectContaining({
              'content-type': 'application/json',
            }),
          }),
        );
      });

      it('should set default content type for unknown extensions', async () => {
        mockClient.fetchOpenAPI.mockResolvedValueOnce({});

        await operations.putObject('test-bucket', 'data.xyz', Buffer.from('test'));

        expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            headers: expect.objectContaining({
              'content-type': 'application/octet-stream',
            }),
          }),
        );
      });
    });

    describe('listObjects', () => {
      it('should list objects in bucket', async () => {
        mockClient.fetchOpenAPI.mockResolvedValueOnce({
          Result: {
            Contents: [
              { Key: 'file1.txt', Size: 100, LastModified: '2024-01-01T00:00:00Z' },
              { Key: 'file2.txt', Size: 200, LastModified: '2024-01-02T00:00:00Z' },
            ],
          },
        });

        const result = await operations.listObjects('test-bucket');

        expect(result).toHaveLength(2);
        expect(result[0].key).toBe('file1.txt');
        expect(result[1].key).toBe('file2.txt');
      });

      it('should list objects with prefix', async () => {
        mockClient.fetchOpenAPI.mockResolvedValueOnce({
          Result: {
            Contents: [{ Key: 'prefix/file1.txt' }],
          },
        });

        await operations.listObjects('test-bucket', 'prefix/');

        expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            query: expect.objectContaining({
              Prefix: 'prefix/',
            }),
          }),
        );
      });

      it('should handle pagination with continuation token', async () => {
        mockClient.fetchOpenAPI
          .mockResolvedValueOnce({
            Result: {
              Contents: [{ Key: 'file1.txt', Size: 100 }],
              NextContinuationToken: 'token123',
            },
          })
          .mockResolvedValueOnce({
            Result: {
              Contents: [{ Key: 'file2.txt', Size: 200 }],
            },
          });

        const result = await operations.listObjects('test-bucket');

        expect(result).toHaveLength(2);
        expect(result[0].key).toBe('file1.txt');
        expect(result[1].key).toBe('file2.txt');
        expect(mockClient.fetchOpenAPI).toHaveBeenCalledTimes(2);
      });

      it('should return empty array when no objects', async () => {
        mockClient.fetchOpenAPI.mockResolvedValueOnce({
          Result: {},
        });

        const result = await operations.listObjects('test-bucket');

        expect(result).toHaveLength(0);
      });
    });

    describe('deleteObjects', () => {
      it('should delete multiple objects', async () => {
        mockClient.fetchOpenAPI.mockResolvedValueOnce({});

        await operations.deleteObjects('test-bucket', ['file1.txt', 'file2.txt']);

        expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            Action: 'DeleteMultipleObjects',
          }),
        );
      });

      it('should do nothing when keys array is empty', async () => {
        await operations.deleteObjects('test-bucket', []);

        expect(mockClient.fetchOpenAPI).not.toHaveBeenCalled();
      });
    });

    describe('uploadFiles', () => {
      it('should throw error with null client', async () => {
        const nullClientOperations = createTosOperations(null, 'cn-beijing');

        await expect(nullClientOperations.uploadFiles('test-bucket', '/tmp')).rejects.toThrow(
          'VOLCENGINE_TOS_CLIENT_NOT_INITIALIZED',
        );
      });
    });
  });
});
