import { createOssOperations } from '../../../src/common/aliyunClient/ossOperations';
import { BucketACL } from '../../../src/stack/bucketTypes';

const mockRequest = jest.fn();
const mockPutBucketCORS = jest.fn();
const mockGetBucketCORS = jest.fn();
const mockDeleteBucketCORS = jest.fn();
const mockUseBucket = jest.fn();
const mockPutBucketACL = jest.fn();
const mockPutBucket = jest.fn();

const mockOssClient = {
  useBucket: mockUseBucket,
  request: mockRequest,
  putBucketCORS: mockPutBucketCORS,
  getBucketCORS: mockGetBucketCORS,
  deleteBucketCORS: mockDeleteBucketCORS,
  putBucket: mockPutBucket,
  putBucketACL: mockPutBucketACL,
  putBucketWebsite: jest.fn(),
  deleteBucketWebsite: jest.fn(),
  deleteBucket: jest.fn(),
  getBucketInfo: jest.fn(),
  getBucketACL: jest.fn(),
  getBucketWebsite: jest.fn(),
  getBucketLogging: jest.fn(),
  getBucketLifecycle: jest.fn(),
  list: jest.fn(),
  deleteMulti: jest.fn(),
  put: jest.fn(),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

jest.mock('../../../src/common/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
}));

jest.mock('../../../src/lang', () => ({
  lang: {
    __: (key: string, params?: Record<string, string>) => {
      if (params) return `${key}:${JSON.stringify(params)}`;
      return key;
    },
  },
}));

describe('ossOperations CORS', () => {
  let operations: ReturnType<typeof createOssOperations>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRequest.mockResolvedValue({});
    operations = createOssOperations(mockOssClient, 'cn-hangzhou');
  });

  describe('bindCustomDomain', () => {
    it('should add CORS rule after binding domain', async () => {
      mockGetBucketCORS.mockRejectedValue(new Error('NoSuchCORSConfiguration'));
      mockPutBucketCORS.mockResolvedValue({});

      await operations.bindCustomDomain('test-bucket', 'cdn.example.com');

      expect(mockPutBucketCORS).toHaveBeenCalledWith(
        'test-bucket',
        expect.arrayContaining([
          expect.objectContaining({
            allowedOrigin: ['https://cdn.example.com', 'http://cdn.example.com'],
            allowedMethod: ['GET', 'HEAD'],
          }),
        ]),
      );
    });

    it('should preserve existing CORS rules when adding new domain', async () => {
      const existingRule = {
        allowedOrigin: ['https://other.example.com'],
        allowedMethod: ['GET', 'POST'],
        allowedHeader: ['*'],
      };
      mockGetBucketCORS.mockResolvedValue({ rules: [existingRule] });
      mockPutBucketCORS.mockResolvedValue({});

      await operations.bindCustomDomain('test-bucket', 'cdn.example.com');

      expect(mockPutBucketCORS).toHaveBeenCalledWith(
        'test-bucket',
        expect.arrayContaining([
          existingRule,
          expect.objectContaining({
            allowedOrigin: ['https://cdn.example.com', 'http://cdn.example.com'],
          }),
        ]),
      );
    });

    it('should not duplicate CORS rule if already exists', async () => {
      const existingRule = {
        allowedOrigin: ['https://cdn.example.com', 'http://cdn.example.com'],
        allowedMethod: ['GET', 'HEAD'],
      };
      mockGetBucketCORS.mockResolvedValue({ rules: [existingRule] });

      await operations.bindCustomDomain('test-bucket', 'cdn.example.com');

      expect(mockPutBucketCORS).not.toHaveBeenCalled();
    });

    it('should not fail bind if CORS addition fails', async () => {
      mockGetBucketCORS.mockRejectedValue(new Error('NoSuchCORSConfiguration'));
      mockPutBucketCORS.mockRejectedValue(new Error('CORS write failed'));

      const result = await operations.bindCustomDomain('test-bucket', 'cdn.example.com');

      expect(result).toBeDefined();
      expect(result.domain).toBe('cdn.example.com');
    });
  });

  describe('unbindCustomDomain', () => {
    it('should remove CORS rule when unbinding domain', async () => {
      const domainRule = {
        allowedOrigin: ['https://cdn.example.com', 'http://cdn.example.com'],
        allowedMethod: ['GET', 'HEAD'],
      };
      const otherRule = {
        allowedOrigin: ['https://other.example.com'],
        allowedMethod: ['GET'],
      };
      mockGetBucketCORS.mockResolvedValue({ rules: [domainRule, otherRule] });
      mockPutBucketCORS.mockResolvedValue({});

      await operations.unbindCustomDomain('test-bucket', 'cdn.example.com');

      expect(mockPutBucketCORS).toHaveBeenCalledWith(
        'test-bucket',
        expect.arrayContaining([otherRule]),
      );
      expect(mockPutBucketCORS).toHaveBeenCalledWith(
        'test-bucket',
        expect.not.arrayContaining([domainRule]),
      );
    });

    it('should delete all CORS when removing last rule', async () => {
      const domainRule = {
        allowedOrigin: ['https://cdn.example.com', 'http://cdn.example.com'],
        allowedMethod: ['GET', 'HEAD'],
      };
      mockGetBucketCORS.mockResolvedValue({ rules: [domainRule] });
      mockDeleteBucketCORS.mockResolvedValue({});

      await operations.unbindCustomDomain('test-bucket', 'cdn.example.com');

      expect(mockDeleteBucketCORS).toHaveBeenCalledWith('test-bucket');
      expect(mockPutBucketCORS).not.toHaveBeenCalled();
    });

    it('should not fail unbind if CORS removal fails', async () => {
      mockGetBucketCORS.mockRejectedValue(new Error('Access denied'));

      await expect(
        operations.unbindCustomDomain('test-bucket', 'cdn.example.com'),
      ).resolves.toBeUndefined();
    });

    it('should skip CORS removal if no matching rule exists', async () => {
      const otherRule = {
        allowedOrigin: ['https://other.example.com'],
        allowedMethod: ['GET'],
      };
      mockGetBucketCORS.mockResolvedValue({ rules: [otherRule] });

      await operations.unbindCustomDomain('test-bucket', 'cdn.example.com');

      expect(mockPutBucketCORS).not.toHaveBeenCalled();
      expect(mockDeleteBucketCORS).not.toHaveBeenCalled();
    });
  });
});

describe('ossOperations public access block', () => {
  let operations: ReturnType<typeof createOssOperations>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRequest.mockResolvedValue({});
    mockPutBucketACL.mockResolvedValue({});
    mockPutBucket.mockResolvedValue({});
    operations = createOssOperations(mockOssClient, 'cn-hangzhou');
  });

  describe('createBucket', () => {
    it('should disable public access block before setting public-read ACL', async () => {
      await operations.createBucket({
        bucketName: 'test-bucket',
        acl: BucketACL.PUBLIC_READ,
      });

      expect(mockRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'PUT',
          subres: { publicAccessBlock: '' },
          content: expect.stringContaining('<BlockPublicAccess>false</BlockPublicAccess>'),
        }),
      );
      expect(mockPutBucketACL).toHaveBeenCalledWith('test-bucket', BucketACL.PUBLIC_READ);
    });

    it('should disable public access block before setting public-read-write ACL', async () => {
      await operations.createBucket({
        bucketName: 'test-bucket',
        acl: BucketACL.PUBLIC_READ_WRITE,
      });

      expect(mockRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'PUT',
          subres: { publicAccessBlock: '' },
        }),
      );
      expect(mockPutBucketACL).toHaveBeenCalledWith('test-bucket', BucketACL.PUBLIC_READ_WRITE);
    });

    it('should not disable public access block for private ACL', async () => {
      await operations.createBucket({
        bucketName: 'test-bucket',
        acl: BucketACL.PRIVATE,
      });

      expect(mockRequest).not.toHaveBeenCalled();
      expect(mockPutBucketACL).toHaveBeenCalledWith('test-bucket', BucketACL.PRIVATE);
    });

    it('should not disable public access block when no ACL is specified', async () => {
      await operations.createBucket({ bucketName: 'test-bucket' });

      expect(mockRequest).not.toHaveBeenCalled();
      expect(mockPutBucketACL).not.toHaveBeenCalled();
    });

    it('should still set ACL even if disabling public access block fails', async () => {
      mockRequest.mockRejectedValue(new Error('AccessDenied'));

      await operations.createBucket({
        bucketName: 'test-bucket',
        acl: BucketACL.PUBLIC_READ,
      });

      expect(mockPutBucketACL).toHaveBeenCalledWith('test-bucket', BucketACL.PUBLIC_READ);
    });
  });

  describe('updateBucketAcl', () => {
    it('should disable public access block before setting public-read ACL', async () => {
      await operations.updateBucketAcl('test-bucket', BucketACL.PUBLIC_READ);

      expect(mockRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'PUT',
          subres: { publicAccessBlock: '' },
          content: expect.stringContaining('<BlockPublicAccess>false</BlockPublicAccess>'),
        }),
      );
      expect(mockPutBucketACL).toHaveBeenCalledWith('test-bucket', BucketACL.PUBLIC_READ);
    });

    it('should disable public access block before setting public-read-write ACL', async () => {
      await operations.updateBucketAcl('test-bucket', BucketACL.PUBLIC_READ_WRITE);

      expect(mockRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'PUT',
          subres: { publicAccessBlock: '' },
        }),
      );
      expect(mockPutBucketACL).toHaveBeenCalledWith('test-bucket', BucketACL.PUBLIC_READ_WRITE);
    });

    it('should not disable public access block for private ACL', async () => {
      await operations.updateBucketAcl('test-bucket', BucketACL.PRIVATE);

      expect(mockRequest).not.toHaveBeenCalled();
      expect(mockPutBucketACL).toHaveBeenCalledWith('test-bucket', BucketACL.PRIVATE);
    });

    it('should still set ACL even if disabling public access block fails', async () => {
      mockRequest.mockRejectedValue(new Error('AccessDenied'));

      await operations.updateBucketAcl('test-bucket', BucketACL.PUBLIC_READ);

      expect(mockPutBucketACL).toHaveBeenCalledWith('test-bucket', BucketACL.PUBLIC_READ);
    });
  });
});
