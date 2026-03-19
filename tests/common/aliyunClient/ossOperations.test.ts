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

describe('ossOperations putBucketCname', () => {
  let operations: ReturnType<typeof createOssOperations>;

  beforeEach(() => {
    jest.clearAllMocks();
    operations = createOssOperations(mockOssClient, 'cn-hangzhou');
  });

  describe('XML body generation', () => {
    it('should generate XML without certificate when none provided', async () => {
      mockRequest.mockResolvedValue({});
      mockGetBucketCORS.mockRejectedValue(new Error('NoSuchCORSConfiguration'));

      await operations.bindCustomDomain('test-bucket', 'cdn.example.com');

      const callArgs = mockRequest.mock.calls[0][0];
      expect(callArgs.content).toContain('<Domain>cdn.example.com</Domain>');
      expect(callArgs.content).not.toContain('<CertificateConfiguration>');
    });

    it('should generate XML with certificate when provided', async () => {
      mockRequest.mockResolvedValue({});
      mockGetBucketCORS.mockRejectedValue(new Error('NoSuchCORSConfiguration'));

      const cert = {
        certificateBody: '-----BEGIN CERTIFICATE-----\nMOCK\n-----END CERTIFICATE-----',
        certificatePrivateKey:
          '-----BEGIN RSA PRIVATE KEY-----\nKEY\n-----END RSA PRIVATE KEY-----',
      };

      await operations.bindCustomDomain('test-bucket', 'cdn.example.com', cert);

      const callArgs = mockRequest.mock.calls[0][0];
      expect(callArgs.content).toContain('<CertificateConfiguration>');
      expect(callArgs.content).toContain(
        '<Certificate>-----BEGIN CERTIFICATE-----\nMOCK\n-----END CERTIFICATE-----</Certificate>',
      );
      expect(callArgs.content).toContain(
        '<PrivateKey>-----BEGIN RSA PRIVATE KEY-----\nKEY\n-----END RSA PRIVATE KEY-----</PrivateKey>',
      );
      expect(callArgs.content).toContain('<Force>true</Force>');
    });

    it('should escape XML special characters in certificate content', async () => {
      mockRequest.mockResolvedValue({});
      mockGetBucketCORS.mockRejectedValue(new Error('NoSuchCORSConfiguration'));

      const cert = {
        certificateBody: 'cert<with>&special',
        certificatePrivateKey: 'key<with>&special',
      };

      await operations.bindCustomDomain('test-bucket', 'cdn.example.com', cert);

      const callArgs = mockRequest.mock.calls[0][0];
      expect(callArgs.content).toContain('<Certificate>cert&lt;with&gt;&amp;special</Certificate>');
      expect(callArgs.content).toContain('<PrivateKey>key&lt;with&gt;&amp;special</PrivateKey>');
    });

    it('should escape XML special characters in domain', async () => {
      mockRequest.mockResolvedValue({});
      mockGetBucketCORS.mockRejectedValue(new Error('NoSuchCORSConfiguration'));

      await operations.bindCustomDomain('test-bucket', 'cdn<test>.example.com');

      const callArgs = mockRequest.mock.calls[0][0];
      expect(callArgs.content).toContain('<Domain>cdn&lt;test&gt;.example.com</Domain>');
    });
  });

  describe('certificate bind failure handling', () => {
    it('should throw on unexpected error when certificate is present', async () => {
      const unexpectedError = Object.assign(new Error('InternalError'), {
        code: 'InternalError',
        status: 500,
      });
      mockRequest.mockRejectedValue(unexpectedError);

      const cert = {
        certificateBody: '-----BEGIN CERTIFICATE-----\nMOCK\n-----END CERTIFICATE-----',
        certificatePrivateKey:
          '-----BEGIN RSA PRIVATE KEY-----\nKEY\n-----END RSA PRIVATE KEY-----',
      };

      await expect(
        operations.bindCustomDomain('test-bucket', 'cdn.example.com', cert),
      ).rejects.toThrow();
    });

    it('should not throw on unexpected error when no certificate is present', async () => {
      const unexpectedError = Object.assign(new Error('InternalError'), {
        code: 'InternalError',
        status: 500,
      });
      mockRequest.mockRejectedValue(unexpectedError);
      mockGetBucketCORS.mockRejectedValue(new Error('NoSuchCORSConfiguration'));

      const result = await operations.bindCustomDomain('test-bucket', 'cdn.example.com');

      expect(result).toBeDefined();
      expect(result.domain).toBe('cdn.example.com');
    });

    it('should still tolerate CnameAlreadyExists when certificate is present', async () => {
      const cnameExistsError = Object.assign(new Error('CnameAlreadyExists'), {
        code: 'CnameAlreadyExists',
        status: 409,
      });
      mockRequest.mockRejectedValue(cnameExistsError);
      mockGetBucketCORS.mockRejectedValue(new Error('NoSuchCORSConfiguration'));

      const cert = {
        certificateBody: '-----BEGIN CERTIFICATE-----\nMOCK\n-----END CERTIFICATE-----',
        certificatePrivateKey:
          '-----BEGIN RSA PRIVATE KEY-----\nKEY\n-----END RSA PRIVATE KEY-----',
      };

      const result = await operations.bindCustomDomain('test-bucket', 'cdn.example.com', cert);

      expect(result).toBeDefined();
      expect(result.domain).toBe('cdn.example.com');
    });

    it('should tolerate NeedVerifyDomainOwnership when certificate is present', async () => {
      const verifyError = Object.assign(new Error('NeedVerifyDomainOwnership'), {
        code: 'NeedVerifyDomainOwnership',
      });
      mockRequest.mockRejectedValue(verifyError);
      mockGetBucketCORS.mockRejectedValue(new Error('NoSuchCORSConfiguration'));

      const cert = {
        certificateBody: '-----BEGIN CERTIFICATE-----\nMOCK\n-----END CERTIFICATE-----',
        certificatePrivateKey:
          '-----BEGIN RSA PRIVATE KEY-----\nKEY\n-----END RSA PRIVATE KEY-----',
      };

      const result = await operations.bindCustomDomain('test-bucket', 'cdn.example.com', cert);

      expect(result).toBeDefined();
      expect(result.bucketCnameBound).toBe(false);
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
