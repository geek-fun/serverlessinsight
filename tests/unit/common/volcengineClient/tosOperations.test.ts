import * as fs from 'node:fs';
import { Service } from '@volcengine/openapi';
import { createTosOperations } from '../../../../src/common/volcengineClient/tosOperations';
import type { TosBucketConfig } from '../../../../src/common/volcengineClient/types';

jest.mock('node:fs', () => {
  const actual = jest.requireActual<typeof import('node:fs')>('node:fs');
  return {
    ...actual,
    readdirSync: jest.fn(actual.readdirSync),
    readFileSync: jest.fn(actual.readFileSync),
    statSync: jest.fn(actual.statSync),
  };
});

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

      it('should send ownership tags via the x-tos-tagging header on CreateBucket', async () => {
        const configWithTags: TosBucketConfig = {
          bucketName: 'test-bucket',
          Tags: [{ Key: 'si-owned-by', Value: 'app-svc:buckets.test' }],
        };

        mockClient.fetchOpenAPI
          .mockResolvedValueOnce({}) // CreateBucket
          .mockResolvedValueOnce({
            // GetBucketInfo
            Result: {
              BucketInfo: {
                Location: 'cn-beijing',
                StorageClass: 'STANDARD',
              },
            },
          });

        await operations.createBucket(configWithTags);

        expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            Action: 'CreateBucket',
            headers: expect.objectContaining({
              'x-tos-tagging': 'si-owned-by=app-svc%3Abuckets.test',
            }),
          }),
        );
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

      it('should retain the full GetBucketInfo detail set on createBucket', async () => {
        mockClient.fetchOpenAPI
          .mockResolvedValueOnce({}) // CreateBucket
          .mockResolvedValueOnce({
            // GetBucketInfo
            Result: {
              BucketInfo: {
                Name: 'test-bucket',
                Location: 'cn-beijing',
                CreationDate: '2024-01-01T00:00:00Z',
                StorageClass: 'STANDARD',
                ExtranetEndpoint: 'tos-cn-beijing.volces.com',
                IntranetEndpoint: 'tos-cn-beijing.ivolces.com',
                Owner: { ID: '2000000001', DisplayName: 'test-owner' },
                ProjectName: 'default',
                Type: 'normal',
                AzRedundancy: 'single_az',
                ExtranetS3Endpoint: 'tos-s3-cn-beijing.volces.com',
                IntranetS3Endpoint: 'tos-s3-cn-beijing.internal.volces.com',
                Versioning: 'Enabled',
                CrossRegionReplication: 'Enabled',
                TransferAcceleration: 'Enabled',
                AccessMonitor: 'Disabled',
              },
            },
          });

        const result = await operations.createBucket(mockBucketConfig);

        expect(result).toEqual(
          expect.objectContaining({
            name: 'test-bucket',
            location: 'cn-beijing',
            creationDate: '2024-01-01T00:00:00Z',
            storageClass: 'STANDARD',
            owner: { id: '2000000001', displayName: 'test-owner' },
            projectName: 'default',
            type: 'normal',
            azRedundancy: 'single_az',
            extranetS3Endpoint: 'tos-s3-cn-beijing.volces.com',
            intranetS3Endpoint: 'tos-s3-cn-beijing.internal.volces.com',
            versioning: 'Enabled',
            crossRegionReplication: 'Enabled',
            transferAcceleration: 'Enabled',
            accessMonitor: 'Disabled',
          }),
        );
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

      it('should return bucket tags from GetBucketTagging', async () => {
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
            // GetBucketWebsite (none)
            Result: {},
          })
          .mockResolvedValueOnce({
            // GetBucketTagging
            Result: {
              TagSet: {
                Tags: [
                  { Key: 'si-owned-by', Value: 'app-svc:buckets.test' },
                  { Key: 'env', Value: 'prod' },
                ],
              },
            },
          });

        const result = await operations.getBucket('test-bucket');

        expect(result).not.toBeNull();
        expect(result?.Tags).toEqual([
          { Key: 'si-owned-by', Value: 'app-svc:buckets.test' },
          { Key: 'env', Value: 'prod' },
        ]);
      });

      it('should retain the full GetBucketInfo detail set (max-detail state)', async () => {
        mockClient.fetchOpenAPI
          .mockResolvedValueOnce({
            // GetBucketInfo
            Result: {
              BucketInfo: {
                Name: 'test-bucket',
                Location: 'cn-beijing',
                CreationDate: '2024-01-01T00:00:00Z',
                StorageClass: 'STANDARD',
                ExtranetEndpoint: 'tos-cn-beijing.volces.com',
                IntranetEndpoint: 'tos-cn-beijing.ivolces.com',
                Owner: { ID: '2000000001', DisplayName: 'test-owner' },
                ProjectName: 'default',
                Type: 'normal',
                AzRedundancy: 'single_az',
                ExtranetS3Endpoint: 'tos-s3-cn-beijing.volces.com',
                IntranetS3Endpoint: 'tos-s3-cn-beijing.internal.volces.com',
                Versioning: 'Enabled',
                CrossRegionReplication: 'Enabled',
                TransferAcceleration: 'Enabled',
                AccessMonitor: 'Disabled',
                ServerSideEncryptionConfiguration: {
                  Rule: [
                    {
                      ApplyServerSideEncryptionByDefault: {
                        SSEAlgorithm: 'AES256',
                        KMSMasterKeyID: 'key-1',
                      },
                    },
                  ],
                },
              },
            },
          })
          .mockResolvedValueOnce({ Result: {} }) // GetBucketWebsite (none)
          .mockResolvedValueOnce({ Result: {} }); // GetBucketTagging (none)

        const result = await operations.getBucket('test-bucket');

        expect(result).not.toBeNull();
        expect(result).toEqual(
          expect.objectContaining({
            name: 'test-bucket',
            location: 'cn-beijing',
            creationDate: '2024-01-01T00:00:00Z',
            storageClass: 'STANDARD',
            extranetEndpoint: 'tos-cn-beijing.volces.com',
            intranetEndpoint: 'tos-cn-beijing.ivolces.com',
            owner: { id: '2000000001', displayName: 'test-owner' },
            projectName: 'default',
            type: 'normal',
            azRedundancy: 'single_az',
            extranetS3Endpoint: 'tos-s3-cn-beijing.volces.com',
            intranetS3Endpoint: 'tos-s3-cn-beijing.internal.volces.com',
            versioning: 'Enabled',
            crossRegionReplication: 'Enabled',
            transferAcceleration: 'Enabled',
            accessMonitor: 'Disabled',
            serverSideEncryptionConfiguration: {
              rule: [
                {
                  applyServerSideEncryptionByDefault: {
                    sseAlgorithm: 'AES256',
                    kmsMasterKeyId: 'key-1',
                  },
                },
              ],
            },
          }),
        );
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

    describe('putBucketPolicy', () => {
      it('should put bucket policy successfully', async () => {
        mockClient.fetchOpenAPI.mockResolvedValueOnce({});

        await operations.putBucketPolicy('test-bucket', {
          Statement: [
            {
              Effect: 'Allow',
              Principal: { trn: 'trn:iam:::role/my-role' },
              Action: ['tos:PutObject'],
              Resource: ['trn:tos:::test-bucket/*'],
            },
          ],
        });

        expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            Action: 'PutBucketPolicy',
            Version: '2018-08-01',
            query: expect.objectContaining({ Bucket: 'test-bucket' }),
          }),
        );
      });

      it('should throw error with null client', async () => {
        const nullClientOperations = createTosOperations(null, 'cn-beijing');

        await expect(
          nullClientOperations.putBucketPolicy('test-bucket', { Statement: [] }),
        ).rejects.toThrow('VOLCENGINE_TOS_CLIENT_NOT_INITIALIZED');
      });
    });

    describe('getBucketPolicy', () => {
      it('should return policy when it exists', async () => {
        mockClient.fetchOpenAPI.mockResolvedValueOnce({
          Result: {
            Statement: [
              {
                Effect: 'Allow',
                Principal: { trn: 'trn:iam:::role/my-role' },
                Action: ['tos:GetObject'],
                Resource: ['trn:tos:::test-bucket/*'],
              },
            ],
          },
        });

        const result = await operations.getBucketPolicy('test-bucket');

        expect(result).toBeTruthy();
        expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({ Action: 'GetBucketPolicy' }),
        );
      });

      it('should parse a string policy document', async () => {
        mockClient.fetchOpenAPI.mockResolvedValueOnce({
          Result: { Policy: JSON.stringify({ Version: '1', Statement: [] }) },
        });

        await expect(operations.getBucketPolicy('test-bucket')).resolves.toEqual({
          Version: '1',
          Statement: [],
        });
      });

      it('should return null when the policy result is empty', async () => {
        mockClient.fetchOpenAPI.mockResolvedValueOnce({ Result: {} });

        await expect(operations.getBucketPolicy('test-bucket')).resolves.toBeNull();
      });

      it('should rethrow unexpected policy errors', async () => {
        const error = new Error('Access denied');
        mockClient.fetchOpenAPI.mockRejectedValueOnce(error);

        await expect(operations.getBucketPolicy('test-bucket')).rejects.toBe(error);
      });

      it('should return null when policy does not exist (NoSuchBucketPolicy)', async () => {
        const error = new Error('Not found') as Error & { code: string };
        error.code = 'NoSuchBucketPolicy';
        mockClient.fetchOpenAPI.mockRejectedValueOnce(error);

        const result = await operations.getBucketPolicy('test-bucket');

        expect(result).toBeNull();
      });

      it('should return null when policy does not exist (ResourceNotFound)', async () => {
        const error = new Error('Not found') as Error & { code: string };
        error.code = 'ResourceNotFound';
        mockClient.fetchOpenAPI.mockRejectedValueOnce(error);

        const result = await operations.getBucketPolicy('test-bucket');

        expect(result).toBeNull();
      });

      it('should throw error with null client', async () => {
        const nullClientOperations = createTosOperations(null, 'cn-beijing');

        await expect(nullClientOperations.getBucketPolicy('test-bucket')).rejects.toThrow(
          'VOLCENGINE_TOS_CLIENT_NOT_INITIALIZED',
        );
      });
    });

    describe('deleteBucketPolicy', () => {
      it('should delete bucket policy successfully', async () => {
        mockClient.fetchOpenAPI.mockResolvedValueOnce({});

        await operations.deleteBucketPolicy('test-bucket');

        expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({ Action: 'DeleteBucketPolicy' }),
        );
      });

      it('should handle NoSuchBucketPolicy error gracefully', async () => {
        const error = new Error('Not found') as Error & { code: string };
        error.code = 'NoSuchBucketPolicy';
        mockClient.fetchOpenAPI.mockRejectedValueOnce(error);

        await expect(operations.deleteBucketPolicy('test-bucket')).resolves.toBeUndefined();
      });

      it('should rethrow unexpected delete policy errors', async () => {
        const error = new Error('Access denied');
        mockClient.fetchOpenAPI.mockRejectedValueOnce(error);

        await expect(operations.deleteBucketPolicy('test-bucket')).rejects.toBe(error);
      });

      it('should throw error with null client', async () => {
        const nullClientOperations = createTosOperations(null, 'cn-beijing');

        await expect(nullClientOperations.deleteBucketPolicy('test-bucket')).rejects.toThrow(
          'VOLCENGINE_TOS_CLIENT_NOT_INITIALIZED',
        );
      });
    });
    describe('uploadFiles with a client', () => {
      it('should upload a single file with its basename and content type', async () => {
        const statSync = fs.statSync as jest.Mock;
        statSync.mockReturnValue({
          isDirectory: () => false,
        } as fs.Stats);
        const readFileSync = fs.readFileSync as jest.Mock;
        readFileSync.mockReturnValue(Buffer.from('data'));
        mockClient.fetchOpenAPI.mockResolvedValueOnce({});

        await operations.uploadFiles('test-bucket', '/tmp/index.html');

        expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            Action: 'PutObject',
            headers: { 'content-type': 'text/html' },
            query: { Bucket: 'test-bucket', Key: 'index.html' },
            data: Buffer.from('data'),
          }),
        );
        statSync.mockImplementation(
          jest.requireActual<typeof import('node:fs')>('node:fs').statSync,
        );
        readFileSync.mockImplementation(
          jest.requireActual<typeof import('node:fs')>('node:fs').readFileSync,
        );
      });

      it('should recursively upload files in a directory and ignore unsupported entries', async () => {
        const directoryEntry = {
          name: 'nested',
          isDirectory: () => true,
          isFile: () => false,
        };
        const fileEntry = {
          name: 'app.js',
          isDirectory: () => false,
          isFile: () => true,
        };
        const ignoredEntry = {
          name: 'link',
          isDirectory: () => false,
          isFile: () => false,
        };
        const readdirSync = fs.readdirSync as jest.Mock;
        readdirSync.mockImplementation((dirPath: fs.PathLike) =>
          dirPath === '/tmp/site' ? [directoryEntry, ignoredEntry] : [fileEntry],
        );
        const statSync = fs.statSync as jest.Mock;
        statSync.mockReturnValue({
          isDirectory: () => true,
        } as fs.Stats);
        (fs.readFileSync as jest.Mock).mockReturnValue(Buffer.from('js'));
        mockClient.fetchOpenAPI.mockResolvedValue({});

        await operations.uploadFiles('test-bucket', '/tmp/site');

        expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            Action: 'PutObject',
            query: { Bucket: 'test-bucket', Key: 'nested/app.js' },
          }),
        );
        expect(mockClient.fetchOpenAPI).toHaveBeenCalledTimes(1);
        readdirSync.mockImplementation(
          jest.requireActual<typeof import('node:fs')>('node:fs').readdirSync,
        );
        statSync.mockImplementation(
          jest.requireActual<typeof import('node:fs')>('node:fs').statSync,
        );
        (fs.readFileSync as jest.Mock).mockImplementation(
          jest.requireActual<typeof import('node:fs')>('node:fs').readFileSync,
        );
      });
    });
  });
});
