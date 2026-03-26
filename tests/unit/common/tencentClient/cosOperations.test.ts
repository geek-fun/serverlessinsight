import { createCosOperations } from '../../../../src/common/tencentClient/cosOperations';
import type COS from 'cos-nodejs-sdk-v5';

const mockGetBucketCors = jest.fn();
const mockPutBucketCors = jest.fn();
const mockDeleteBucketCors = jest.fn();
const mockPutBucketDomain = jest.fn();
const mockGetBucketDomain = jest.fn();
const mockDeleteBucketDomain = jest.fn();
const mockHeadBucket = jest.fn();
const mockPutBucket = jest.fn();
const mockDeleteBucket = jest.fn();
const mockPutBucketAcl = jest.fn();
const mockGetBucketAcl = jest.fn();
const mockPutBucketWebsite = jest.fn();
const mockGetBucketWebsite = jest.fn();
const mockGetBucketVersioning = jest.fn();
const mockGetBucketTagging = jest.fn();

const mockCosClient = {
  headBucket: mockHeadBucket,
  putBucket: mockPutBucket,
  deleteBucket: mockDeleteBucket,
  putBucketAcl: mockPutBucketAcl,
  getBucketAcl: mockGetBucketAcl,
  putBucketWebsite: mockPutBucketWebsite,
  getBucketWebsite: mockGetBucketWebsite,
  getBucketVersioning: mockGetBucketVersioning,
  getBucketTagging: mockGetBucketTagging,
  getBucketCors: mockGetBucketCors,
  putBucketCors: mockPutBucketCors,
  deleteBucketCors: mockDeleteBucketCors,
  putBucketDomain: mockPutBucketDomain,
  getBucketDomain: mockGetBucketDomain,
  deleteBucketDomain: mockDeleteBucketDomain,
} as unknown as COS;

jest.mock('../../../../src/common/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
}));

jest.mock('../../../../src/lang', () => ({
  lang: {
    __: (key: string, params?: Record<string, string>) => {
      if (params) return `${key}:${JSON.stringify(params)}`;
      return key;
    },
  },
}));

describe('cosOperations CORS', () => {
  let operations: ReturnType<typeof createCosOperations>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockPutBucketDomain.mockImplementation((_params: unknown, cb: (err: null) => void) => cb(null));
    operations = createCosOperations(mockCosClient, 'ap-guangzhou');
  });

  describe('bindCustomDomain', () => {
    it('should add CORS rule after binding domain', async () => {
      mockGetBucketCors.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('NoSuchCORSConfiguration')),
      );
      mockPutBucketCors.mockImplementation((_params: unknown, cb: (err: null) => void) => cb(null));

      await operations.bindCustomDomain('test-bucket', 'cdn.example.com');

      expect(mockPutBucketCors).toHaveBeenCalledWith(
        expect.objectContaining({
          Bucket: 'test-bucket',
          Region: 'ap-guangzhou',
          CORSRules: expect.arrayContaining([
            expect.objectContaining({
              AllowedOrigin: ['https://cdn.example.com', 'http://cdn.example.com'],
              AllowedMethod: ['GET', 'HEAD'],
            }),
          ]),
        }),
        expect.any(Function),
      );
    });

    it('should preserve existing CORS rules when adding new domain', async () => {
      const existingRule = {
        AllowedOrigin: ['https://other.example.com'],
        AllowedMethod: ['GET', 'POST'],
        AllowedHeader: ['*'],
        MaxAgeSeconds: 600,
      };
      mockGetBucketCors.mockImplementation(
        (_params: unknown, cb: (err: null, data: { CORSRules: unknown[] }) => void) =>
          cb(null, { CORSRules: [existingRule] }),
      );
      mockPutBucketCors.mockImplementation((_params: unknown, cb: (err: null) => void) => cb(null));

      await operations.bindCustomDomain('test-bucket', 'cdn.example.com');

      const putCall = mockPutBucketCors.mock.calls[0][0];
      expect(putCall.CORSRules).toHaveLength(2);
      expect(putCall.CORSRules[0].AllowedOrigin).toEqual(['https://other.example.com']);
      expect(putCall.CORSRules[1].AllowedOrigin).toEqual([
        'https://cdn.example.com',
        'http://cdn.example.com',
      ]);
    });

    it('should not duplicate CORS rule if already exists', async () => {
      const existingRule = {
        AllowedOrigin: ['https://cdn.example.com', 'http://cdn.example.com'],
        AllowedMethod: ['GET', 'HEAD'],
      };
      mockGetBucketCors.mockImplementation(
        (_params: unknown, cb: (err: null, data: { CORSRules: unknown[] }) => void) =>
          cb(null, { CORSRules: [existingRule] }),
      );

      await operations.bindCustomDomain('test-bucket', 'cdn.example.com');

      expect(mockPutBucketCors).not.toHaveBeenCalled();
    });

    it('should not fail bind if CORS addition fails', async () => {
      mockGetBucketCors.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('NoSuchCORSConfiguration')),
      );
      mockPutBucketCors.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('CORS write failed')),
      );

      const result = await operations.bindCustomDomain('test-bucket', 'cdn.example.com');

      expect(result).toBeDefined();
      expect(result.domain).toBe('cdn.example.com');
    });
  });

  describe('unbindCustomDomain', () => {
    beforeEach(() => {
      mockGetBucketDomain.mockImplementation(
        (_params: unknown, cb: (err: null, data: { DomainRule: unknown[] }) => void) =>
          cb(null, { DomainRule: [{ Name: 'cdn.example.com', Status: 'ENABLED', Type: 'REST' }] }),
      );
      mockDeleteBucketDomain.mockImplementation((_params: unknown, cb: (err: null) => void) =>
        cb(null),
      );
    });

    it('should remove CORS rule when unbinding domain', async () => {
      const domainRule = {
        AllowedOrigin: ['https://cdn.example.com', 'http://cdn.example.com'],
        AllowedMethod: ['GET', 'HEAD'],
        AllowedHeader: ['*'],
        MaxAgeSeconds: 3600,
      };
      const otherRule = {
        AllowedOrigin: ['https://other.example.com'],
        AllowedMethod: ['GET'],
        AllowedHeader: [],
        MaxAgeSeconds: 600,
      };
      mockGetBucketCors.mockImplementation(
        (_params: unknown, cb: (err: null, data: { CORSRules: unknown[] }) => void) =>
          cb(null, { CORSRules: [domainRule, otherRule] }),
      );
      mockPutBucketCors.mockImplementation((_params: unknown, cb: (err: null) => void) => cb(null));

      await operations.unbindCustomDomain('test-bucket', 'cdn.example.com');

      const putCall = mockPutBucketCors.mock.calls[0][0];
      expect(putCall.CORSRules).toHaveLength(1);
      expect(putCall.CORSRules[0].AllowedOrigin).toEqual(['https://other.example.com']);
    });

    it('should delete all CORS when removing last rule', async () => {
      const domainRule = {
        AllowedOrigin: ['https://cdn.example.com', 'http://cdn.example.com'],
        AllowedMethod: ['GET', 'HEAD'],
      };
      mockGetBucketCors.mockImplementation(
        (_params: unknown, cb: (err: null, data: { CORSRules: unknown[] }) => void) =>
          cb(null, { CORSRules: [domainRule] }),
      );
      mockDeleteBucketCors.mockImplementation((_params: unknown, cb: (err: null) => void) =>
        cb(null),
      );

      await operations.unbindCustomDomain('test-bucket', 'cdn.example.com');

      expect(mockDeleteBucketCors).toHaveBeenCalledWith(
        expect.objectContaining({ Bucket: 'test-bucket', Region: 'ap-guangzhou' }),
        expect.any(Function),
      );
      expect(mockPutBucketCors).not.toHaveBeenCalled();
    });

    it('should not fail unbind if CORS removal fails', async () => {
      mockGetBucketCors.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('Access denied')),
      );

      await expect(
        operations.unbindCustomDomain('test-bucket', 'cdn.example.com'),
      ).resolves.toBeUndefined();
    });

    it('should skip CORS removal if no matching rule exists', async () => {
      const otherRule = {
        AllowedOrigin: ['https://other.example.com'],
        AllowedMethod: ['GET'],
      };
      mockGetBucketCors.mockImplementation(
        (_params: unknown, cb: (err: null, data: { CORSRules: unknown[] }) => void) =>
          cb(null, { CORSRules: [otherRule] }),
      );

      await operations.unbindCustomDomain('test-bucket', 'cdn.example.com');

      expect(mockPutBucketCors).not.toHaveBeenCalled();
      expect(mockDeleteBucketCors).not.toHaveBeenCalled();
    });
  });
});

describe('cosOperations bucket management', () => {
  let operations: ReturnType<typeof createCosOperations>;

  beforeEach(() => {
    jest.clearAllMocks();
    operations = createCosOperations(mockCosClient, 'ap-guangzhou');
  });

  describe('createBucket', () => {
    it('should create bucket successfully', async () => {
      mockPutBucket.mockImplementation((_params: unknown, cb: (err: null) => void) => cb(null));

      await operations.createBucket({
        Bucket: 'test-bucket',
        Region: 'ap-guangzhou',
      });

      expect(mockPutBucket).toHaveBeenCalledWith(
        expect.objectContaining({
          Bucket: 'test-bucket',
          Region: 'ap-guangzhou',
        }),
        expect.any(Function),
      );
    });

    it('should create bucket with ACL', async () => {
      mockPutBucket.mockImplementation((_params: unknown, cb: (err: null) => void) => cb(null));
      mockPutBucketAcl.mockImplementation((_params: unknown, cb: (err: null) => void) => cb(null));

      await operations.createBucket({
        Bucket: 'test-bucket',
        Region: 'ap-guangzhou',
        ACL: 'public-read',
      });

      expect(mockPutBucket).toHaveBeenCalled();
      expect(mockPutBucketAcl).toHaveBeenCalledWith(
        expect.objectContaining({
          Bucket: 'test-bucket',
          Region: 'ap-guangzhou',
          ACL: 'public-read',
        }),
        expect.any(Function),
      );
    });

    it('should create bucket with website configuration', async () => {
      mockPutBucket.mockImplementation((_params: unknown, cb: (err: null) => void) => cb(null));
      mockPutBucketWebsite.mockImplementation((_params: unknown, cb: (err: null) => void) =>
        cb(null),
      );

      await operations.createBucket({
        Bucket: 'test-bucket',
        Region: 'ap-guangzhou',
        WebsiteConfiguration: {
          IndexDocument: { Suffix: 'index.html' },
          ErrorDocument: { Key: '404.html' },
        },
      });

      expect(mockPutBucket).toHaveBeenCalled();
      expect(mockPutBucketWebsite).toHaveBeenCalledWith(
        expect.objectContaining({
          Bucket: 'test-bucket',
          Region: 'ap-guangzhou',
          WebsiteConfiguration: {
            IndexDocument: { Suffix: 'index.html' },
            ErrorDocument: { Key: '404.html' },
          },
        }),
        expect.any(Function),
      );
    });

    it('should reject when bucket creation fails', async () => {
      mockPutBucket.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('BucketAlreadyExists')),
      );

      await expect(
        operations.createBucket({
          Bucket: 'test-bucket',
          Region: 'ap-guangzhou',
        }),
      ).rejects.toThrow('BucketAlreadyExists');
    });
  });

  describe('getBucket', () => {
    it('should return bucket info when bucket exists', async () => {
      mockHeadBucket.mockImplementation(
        (_params: unknown, cb: (err: null, data: unknown) => void) => cb(null, {}),
      );
      mockGetBucketAcl.mockImplementation(
        (_params: unknown, cb: (err: null, data: unknown) => void) =>
          cb(null, {
            ACL: 'private',
            Owner: { ID: 'owner-id' },
            Grants: [],
          }),
      );
      mockGetBucketCors.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('NoSuchCORSConfiguration')),
      );
      mockGetBucketWebsite.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('NoSuchWebsiteConfiguration')),
      );
      mockGetBucketVersioning.mockImplementation(
        (_params: unknown, cb: (err: null, data: unknown) => void) =>
          cb(null, { VersioningConfiguration: { Status: 'Suspended' } }),
      );
      mockGetBucketTagging.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('NoSuchTagSet')),
      );

      const result = await operations.getBucket('test-bucket', 'ap-guangzhou');

      expect(result).toEqual({
        Name: 'test-bucket',
        Location: 'ap-guangzhou',
        ACL: 'private',
        AccessControlPolicy: {
          owner: { id: 'owner-id', displayName: undefined },
          grants: [],
        },
        WebsiteConfiguration: undefined,
        CorsConfiguration: undefined,
        VersioningConfiguration: { status: 'Suspended' },
        TaggingConfiguration: undefined,
      });
    });

    it('should return null when bucket does not exist', async () => {
      mockHeadBucket.mockImplementation(
        (_params: unknown, cb: (err: { statusCode: number }) => void) => cb({ statusCode: 404 }),
      );

      const result = await operations.getBucket('non-existent-bucket', 'ap-guangzhou');

      expect(result).toBeNull();
    });

    it('should include website configuration if available', async () => {
      mockHeadBucket.mockImplementation(
        (_params: unknown, cb: (err: null, data: unknown) => void) => cb(null, {}),
      );
      mockGetBucketAcl.mockImplementation(
        (_params: unknown, cb: (err: null, data: unknown) => void) =>
          cb(null, { ACL: 'private', Owner: { ID: 'owner-id' }, Grants: [] }),
      );
      mockGetBucketCors.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('NoSuchCORSConfiguration')),
      );
      mockGetBucketWebsite.mockImplementation(
        (_params: unknown, cb: (err: null, data: unknown) => void) =>
          cb(null, {
            WebsiteConfiguration: {
              IndexDocument: { Suffix: 'index.html' },
              ErrorDocument: { Key: '404.html' },
            },
          }),
      );
      mockGetBucketVersioning.mockImplementation(
        (_params: unknown, cb: (err: null, data: unknown) => void) =>
          cb(null, { VersioningConfiguration: {} }),
      );
      mockGetBucketTagging.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('NoSuchTagSet')),
      );

      const result = await operations.getBucket('test-bucket', 'ap-guangzhou');

      expect(result?.WebsiteConfiguration).toEqual({
        IndexDocument: { Suffix: 'index.html' },
        ErrorDocument: { Key: '404.html' },
      });
    });
  });

  describe('updateBucketAcl', () => {
    it('should update bucket ACL successfully', async () => {
      mockPutBucketAcl.mockImplementation((_params: unknown, cb: (err: null) => void) => cb(null));

      await operations.updateBucketAcl('test-bucket', 'ap-guangzhou', 'public-read');

      expect(mockPutBucketAcl).toHaveBeenCalledWith(
        expect.objectContaining({
          Bucket: 'test-bucket',
          Region: 'ap-guangzhou',
          ACL: 'public-read',
        }),
        expect.any(Function),
      );
    });

    it('should reject when ACL update fails', async () => {
      mockPutBucketAcl.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('AccessDenied')),
      );

      await expect(
        operations.updateBucketAcl('test-bucket', 'ap-guangzhou', 'public-read'),
      ).rejects.toThrow('AccessDenied');
    });
  });

  describe('updateBucketWebsite', () => {
    it('should update bucket website configuration successfully', async () => {
      mockPutBucketWebsite.mockImplementation((_params: unknown, cb: (err: null) => void) =>
        cb(null),
      );

      await operations.updateBucketWebsite('test-bucket', 'ap-guangzhou', {
        IndexDocument: { Suffix: 'home.html' },
        ErrorDocument: { Key: 'error.html' },
      });

      expect(mockPutBucketWebsite).toHaveBeenCalledWith(
        expect.objectContaining({
          Bucket: 'test-bucket',
          Region: 'ap-guangzhou',
          WebsiteConfiguration: {
            IndexDocument: { Suffix: 'home.html' },
            ErrorDocument: { Key: 'error.html' },
          },
        }),
        expect.any(Function),
      );
    });

    it('should reject when website update fails', async () => {
      mockPutBucketWebsite.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('InvalidArgument')),
      );

      await expect(
        operations.updateBucketWebsite('test-bucket', 'ap-guangzhou', {
          IndexDocument: { Suffix: 'home.html' },
        }),
      ).rejects.toThrow('InvalidArgument');
    });
  });

  describe('deleteBucket', () => {
    it('should delete bucket successfully', async () => {
      mockDeleteBucket.mockImplementation((_params: unknown, cb: (err: null) => void) => cb(null));

      await operations.deleteBucket('test-bucket', 'ap-guangzhou');

      expect(mockDeleteBucket).toHaveBeenCalledWith(
        expect.objectContaining({
          Bucket: 'test-bucket',
          Region: 'ap-guangzhou',
        }),
        expect.any(Function),
      );
    });

    it('should reject when bucket deletion fails', async () => {
      mockDeleteBucket.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('BucketNotEmpty')),
      );

      await expect(operations.deleteBucket('test-bucket', 'ap-guangzhou')).rejects.toThrow(
        'BucketNotEmpty',
      );
    });
  });

  describe('getCosEndpoint', () => {
    it('should return correct COS endpoint', () => {
      const endpoint = operations.getCosEndpoint('test-bucket');

      expect(endpoint).toBe('test-bucket.cos.ap-guangzhou.myqcloud.com');
    });
  });

  describe('getBucket advanced branches', () => {
    it('should return CORS configuration when present', async () => {
      mockHeadBucket.mockImplementation(
        (_params: unknown, cb: (err: null, data: unknown) => void) => cb(null, {}),
      );
      mockGetBucketAcl.mockImplementation(
        (_params: unknown, cb: (err: null, data: unknown) => void) =>
          cb(null, { ACL: 'private', Owner: { ID: 'owner-id' }, Grants: [] }),
      );
      mockGetBucketCors.mockImplementation(
        (_params: unknown, cb: (err: null, data: unknown) => void) =>
          cb(null, {
            CORSRules: [
              {
                ID: 'rule-1',
                AllowedOrigin: ['https://example.com'],
                AllowedMethod: ['GET'],
                AllowedHeader: ['*'],
                ExposeHeader: ['ETag'],
                MaxAgeSeconds: 3600,
              },
            ],
          }),
      );
      mockGetBucketWebsite.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('NoSuchWebsiteConfiguration')),
      );
      mockGetBucketVersioning.mockImplementation(
        (_params: unknown, cb: (err: null, data: unknown) => void) =>
          cb(null, { VersioningConfiguration: {} }),
      );
      mockGetBucketTagging.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('NoSuchTagSet')),
      );

      const result = await operations.getBucket('test-bucket', 'ap-guangzhou');

      expect(result?.CorsConfiguration).toEqual([
        {
          id: 'rule-1',
          allowedOrigins: ['https://example.com'],
          allowedMethods: ['GET'],
          allowedHeaders: ['*'],
          exposeHeaders: ['ETag'],
          maxAgeSeconds: 3600,
        },
      ]);
    });

    it('should return tagging configuration when present', async () => {
      mockHeadBucket.mockImplementation(
        (_params: unknown, cb: (err: null, data: unknown) => void) => cb(null, {}),
      );
      mockGetBucketAcl.mockImplementation(
        (_params: unknown, cb: (err: null, data: unknown) => void) =>
          cb(null, { ACL: 'private', Owner: { ID: 'owner-id' }, Grants: [] }),
      );
      mockGetBucketCors.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('NoSuchCORSConfiguration')),
      );
      mockGetBucketWebsite.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('NoSuchWebsiteConfiguration')),
      );
      mockGetBucketVersioning.mockImplementation(
        (_params: unknown, cb: (err: null, data: unknown) => void) =>
          cb(null, { VersioningConfiguration: {} }),
      );
      mockGetBucketTagging.mockImplementation(
        (_params: unknown, cb: (err: null, data: unknown) => void) =>
          cb(null, {
            Tags: [
              { Key: 'env', Value: 'prod' },
              { Key: 'team', Value: 'backend' },
            ],
          }),
      );

      const result = await operations.getBucket('test-bucket', 'ap-guangzhou');

      expect(result?.TaggingConfiguration).toEqual({
        tags: [
          { key: 'env', value: 'prod' },
          { key: 'team', value: 'backend' },
        ],
      });
    });

    it('should handle ACL with Grantee containing URI (Group type)', async () => {
      mockHeadBucket.mockImplementation(
        (_params: unknown, cb: (err: null, data: unknown) => void) => cb(null, {}),
      );
      mockGetBucketAcl.mockImplementation(
        (_params: unknown, cb: (err: null, data: unknown) => void) =>
          cb(null, {
            ACL: 'public-read',
            Owner: { ID: 'owner-id' },
            Grants: [
              {
                Grantee: { URI: 'http://cam.qcloud.com/groups/global/AllUsers' },
                Permission: 'READ',
              },
            ],
          }),
      );
      mockGetBucketCors.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('NoSuchCORSConfiguration')),
      );
      mockGetBucketWebsite.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('NoSuchWebsiteConfiguration')),
      );
      mockGetBucketVersioning.mockImplementation(
        (_params: unknown, cb: (err: null, data: unknown) => void) =>
          cb(null, { VersioningConfiguration: {} }),
      );
      mockGetBucketTagging.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('NoSuchTagSet')),
      );

      const result = await operations.getBucket('test-bucket', 'ap-guangzhou');

      expect(result?.AccessControlPolicy?.grants).toEqual([
        {
          grantee: {
            type: 'Group',
            uri: 'http://cam.qcloud.com/groups/global/AllUsers',
            id: undefined,
            displayName: undefined,
          },
          permission: 'READ',
        },
      ]);
    });

    it('should handle ACL with Grantee containing ID (CanonicalUser type)', async () => {
      mockHeadBucket.mockImplementation(
        (_params: unknown, cb: (err: null, data: unknown) => void) => cb(null, {}),
      );
      mockGetBucketAcl.mockImplementation(
        (_params: unknown, cb: (err: null, data: unknown) => void) =>
          cb(null, {
            ACL: 'private',
            Owner: { ID: 'owner-id' },
            Grants: [
              {
                Grantee: { ID: 'user-123' },
                Permission: 'FULL_CONTROL',
              },
            ],
          }),
      );
      mockGetBucketCors.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('NoSuchCORSConfiguration')),
      );
      mockGetBucketWebsite.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('NoSuchWebsiteConfiguration')),
      );
      mockGetBucketVersioning.mockImplementation(
        (_params: unknown, cb: (err: null, data: unknown) => void) =>
          cb(null, { VersioningConfiguration: {} }),
      );
      mockGetBucketTagging.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('NoSuchTagSet')),
      );

      const result = await operations.getBucket('test-bucket', 'ap-guangzhou');

      expect(result?.AccessControlPolicy?.grants).toEqual([
        {
          grantee: {
            type: 'CanonicalUser',
            uri: undefined,
            id: 'user-123',
            displayName: undefined,
          },
          permission: 'FULL_CONTROL',
        },
      ]);
    });

    it('should handle ACL error gracefully', async () => {
      mockHeadBucket.mockImplementation(
        (_params: unknown, cb: (err: null, data: unknown) => void) => cb(null, {}),
      );
      mockGetBucketAcl.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('AccessDenied')),
      );
      mockGetBucketCors.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('NoSuchCORSConfiguration')),
      );
      mockGetBucketWebsite.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('NoSuchWebsiteConfiguration')),
      );
      mockGetBucketVersioning.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('AccessDenied')),
      );
      mockGetBucketTagging.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('NoSuchTagSet')),
      );

      const result = await operations.getBucket('test-bucket', 'ap-guangzhou');

      expect(result).toEqual({
        Name: 'test-bucket',
        Location: 'ap-guangzhou',
        ACL: undefined,
        AccessControlPolicy: undefined,
        CorsConfiguration: undefined,
        WebsiteConfiguration: undefined,
        VersioningConfiguration: undefined,
        TaggingConfiguration: undefined,
      });
    });

    it('should throw non-404 errors from headBucket', async () => {
      mockHeadBucket.mockImplementation(
        (_params: unknown, cb: (err: { statusCode: number }) => void) => cb({ statusCode: 403 }),
      );

      await expect(operations.getBucket('test-bucket', 'ap-guangzhou')).rejects.toEqual({
        statusCode: 403,
      });
    });

    it('should throw errors without statusCode from headBucket', async () => {
      mockHeadBucket.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('NetworkError')),
      );

      await expect(operations.getBucket('test-bucket', 'ap-guangzhou')).rejects.toThrow(
        'NetworkError',
      );
    });

    it('should handle Grant with no Grantee', async () => {
      mockHeadBucket.mockImplementation(
        (_params: unknown, cb: (err: null, data: unknown) => void) => cb(null, {}),
      );
      mockGetBucketAcl.mockImplementation(
        (_params: unknown, cb: (err: null, data: unknown) => void) =>
          cb(null, {
            ACL: 'private',
            Owner: { ID: 'owner-id' },
            Grants: [{ Permission: 'READ' }],
          }),
      );
      mockGetBucketCors.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('NoSuchCORSConfiguration')),
      );
      mockGetBucketWebsite.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('NoSuchWebsiteConfiguration')),
      );
      mockGetBucketVersioning.mockImplementation(
        (_params: unknown, cb: (err: null, data: unknown) => void) =>
          cb(null, { VersioningConfiguration: {} }),
      );
      mockGetBucketTagging.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('NoSuchTagSet')),
      );

      const result = await operations.getBucket('test-bucket', 'ap-guangzhou');

      expect(result?.AccessControlPolicy?.grants).toEqual([
        {
          grantee: undefined,
          permission: 'READ',
        },
      ]);
    });

    it('should handle Owner being undefined', async () => {
      mockHeadBucket.mockImplementation(
        (_params: unknown, cb: (err: null, data: unknown) => void) => cb(null, {}),
      );
      mockGetBucketAcl.mockImplementation(
        (_params: unknown, cb: (err: null, data: unknown) => void) =>
          cb(null, {
            ACL: 'private',
            Grants: [],
          }),
      );
      mockGetBucketCors.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('NoSuchCORSConfiguration')),
      );
      mockGetBucketWebsite.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('NoSuchWebsiteConfiguration')),
      );
      mockGetBucketVersioning.mockImplementation(
        (_params: unknown, cb: (err: null, data: unknown) => void) =>
          cb(null, { VersioningConfiguration: {} }),
      );
      mockGetBucketTagging.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('NoSuchTagSet')),
      );

      const result = await operations.getBucket('test-bucket', 'ap-guangzhou');

      expect(result?.AccessControlPolicy?.owner).toBeUndefined();
    });
  });
});

describe('cosOperations with dnsOps', () => {
  let operations: ReturnType<typeof createCosOperations>;

  const mockDnsOps = {
    addDomainRecord: jest.fn(),
    deleteDomainRecord: jest.fn(),
    describeDomainRecords: jest.fn(),
    checkDomainRecordExists: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockPutBucketDomain.mockImplementation((_params: unknown, cb: (err: null) => void) => cb(null));
    mockGetBucketCors.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
      cb(new Error('NoSuchCORSConfiguration')),
    );
    mockPutBucketCors.mockImplementation((_params: unknown, cb: (err: null) => void) => cb(null));
    operations = createCosOperations(mockCosClient, 'ap-guangzhou', mockDnsOps);
  });

  describe('bindCustomDomain with dnsOps', () => {
    it('should create DNS CNAME record when no existing record', async () => {
      mockDnsOps.describeDomainRecords.mockResolvedValue([]);
      mockDnsOps.addDomainRecord.mockResolvedValue('record-123');

      const result = await operations.bindCustomDomain('test-bucket', 'cdn.example.com');

      expect(result.domain).toBe('cdn.example.com');
      expect(result.cname).toBe('test-bucket.cos.ap-guangzhou.myqcloud.com');
      expect(result.dnsRecordId).toBe('record-123');
      expect(result.bucketDomainBound).toBe(true);
      expect(mockDnsOps.addDomainRecord).toHaveBeenCalledWith(
        expect.objectContaining({
          domainName: 'example.com',
          rr: 'cdn',
          type: 'CNAME',
          value: 'test-bucket.cos.ap-guangzhou.myqcloud.com',
          ttl: 600,
        }),
      );
    });

    it('should return existing DNS record when CNAME already exists', async () => {
      mockDnsOps.describeDomainRecords.mockResolvedValue([
        {
          rr: 'cdn',
          type: 'CNAME',
          value: 'test-bucket.cos.ap-guangzhou.myqcloud.com',
          recordId: 'existing-record-456',
        },
      ]);

      const result = await operations.bindCustomDomain('test-bucket', 'cdn.example.com');

      expect(result.dnsRecordId).toBe('existing-record-456');
      expect(mockDnsOps.addDomainRecord).not.toHaveBeenCalled();
    });

    it('should handle DNS error gracefully and return result without dnsRecordId', async () => {
      mockDnsOps.describeDomainRecords.mockRejectedValue(new Error('DNS API error'));

      const result = await operations.bindCustomDomain('test-bucket', 'cdn.example.com');

      expect(result.domain).toBe('cdn.example.com');
      expect(result.cname).toBe('test-bucket.cos.ap-guangzhou.myqcloud.com');
      expect(result.dnsRecordId).toBeUndefined();
      expect(result.bucketDomainBound).toBe(true);
    });

    it('should handle putBucketDomain failure', async () => {
      mockPutBucketDomain.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('DomainBindFailed')),
      );
      mockDnsOps.describeDomainRecords.mockResolvedValue([]);
      mockDnsOps.addDomainRecord.mockResolvedValue('record-789');

      const result = await operations.bindCustomDomain('test-bucket', 'cdn.example.com');

      expect(result.bucketDomainBound).toBe(false);
      expect(result.dnsRecordId).toBe('record-789');
    });
  });

  describe('unbindCustomDomain with dnsOps', () => {
    beforeEach(() => {
      mockGetBucketCors.mockImplementation((_params: unknown, cb: (err: Error) => void) =>
        cb(new Error('NoSuchCORSConfiguration')),
      );
    });

    it('should delete DNS record when dnsRecordId provided', async () => {
      mockGetBucketDomain.mockImplementation(
        (_params: unknown, cb: (err: null, data: { DomainRule: unknown[] }) => void) =>
          cb(null, {
            DomainRule: [{ Name: 'cdn.example.com', Status: 'ENABLED', Type: 'REST' }],
          }),
      );
      mockDeleteBucketDomain.mockImplementation((_params: unknown, cb: (err: null) => void) =>
        cb(null),
      );
      mockDnsOps.deleteDomainRecord.mockResolvedValue(undefined);

      await operations.unbindCustomDomain('test-bucket', 'cdn.example.com', 'record-123');

      expect(mockDnsOps.deleteDomainRecord).toHaveBeenCalledWith('example.com', 'record-123');
    });

    it('should skip DNS deletion when dnsRecordId is "existing"', async () => {
      mockGetBucketDomain.mockImplementation(
        (_params: unknown, cb: (err: null, data: { DomainRule: unknown[] }) => void) =>
          cb(null, { DomainRule: [] }),
      );

      await operations.unbindCustomDomain('test-bucket', 'cdn.example.com', 'existing');

      expect(mockDnsOps.deleteDomainRecord).not.toHaveBeenCalled();
    });

    it('should skip DNS deletion when no dnsRecordId', async () => {
      mockGetBucketDomain.mockImplementation(
        (_params: unknown, cb: (err: null, data: { DomainRule: unknown[] }) => void) =>
          cb(null, { DomainRule: [] }),
      );

      await operations.unbindCustomDomain('test-bucket', 'cdn.example.com');

      expect(mockDnsOps.deleteDomainRecord).not.toHaveBeenCalled();
    });

    it('should handle DNS deletion error gracefully', async () => {
      mockGetBucketDomain.mockImplementation(
        (_params: unknown, cb: (err: null, data: { DomainRule: unknown[] }) => void) =>
          cb(null, { DomainRule: [] }),
      );
      mockDnsOps.deleteDomainRecord.mockRejectedValue(new Error('DNS delete failed'));

      await expect(
        operations.unbindCustomDomain('test-bucket', 'cdn.example.com', 'record-123'),
      ).resolves.toBeUndefined();
    });

    it('should update remaining domain rules when unbinding one of multiple domains', async () => {
      mockGetBucketDomain.mockImplementation(
        (_params: unknown, cb: (err: null, data: { DomainRule: unknown[] }) => void) =>
          cb(null, {
            DomainRule: [
              { Name: 'cdn.example.com', Status: 'ENABLED', Type: 'REST' },
              { Name: 'other.example.com', Status: 'ENABLED', Type: 'WEBSITE' },
            ],
          }),
      );
      mockPutBucketDomain.mockImplementation((_params: unknown, cb: (err: null) => void) =>
        cb(null),
      );

      await operations.unbindCustomDomain('test-bucket', 'cdn.example.com', 'record-123');

      expect(mockPutBucketDomain).toHaveBeenCalledWith(
        expect.objectContaining({
          Bucket: 'test-bucket',
          Region: 'ap-guangzhou',
          DomainRule: [
            {
              Status: 'ENABLED',
              Name: 'other.example.com',
              Type: 'WEBSITE',
            },
          ],
        }),
        expect.any(Function),
      );
    });

    it('should handle getBucketDomain 404 error by returning empty rules', async () => {
      mockGetBucketDomain.mockImplementation(
        (_params: unknown, cb: (err: { statusCode: number }) => void) => cb({ statusCode: 404 }),
      );

      await expect(
        operations.unbindCustomDomain('test-bucket', 'cdn.example.com', 'record-123'),
      ).resolves.toBeUndefined();

      expect(mockDeleteBucketDomain).not.toHaveBeenCalled();
    });

    it('should handle getBucketDomain non-404 error', async () => {
      mockGetBucketDomain.mockImplementation(
        (_params: unknown, cb: (err: { statusCode: number }) => void) => cb({ statusCode: 500 }),
      );

      await expect(
        operations.unbindCustomDomain('test-bucket', 'cdn.example.com', 'record-123'),
      ).resolves.toBeUndefined();
    });

    it('should handle getBucketDomain with no DomainRule', async () => {
      mockGetBucketDomain.mockImplementation(
        (_params: unknown, cb: (err: null, data: Record<string, unknown>) => void) => cb(null, {}),
      );

      await expect(
        operations.unbindCustomDomain('test-bucket', 'cdn.example.com'),
      ).resolves.toBeUndefined();
    });
  });
});
