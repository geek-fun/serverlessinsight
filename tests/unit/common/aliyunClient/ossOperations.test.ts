import { createOssOperations } from '../../../../src/common/aliyunClient/ossOperations';
import { BucketACL } from '../../../../src/stack/bucketTypes';

const mockRequest = jest.fn();
const mockPutBucketCORS = jest.fn();
const mockGetBucketCORS = jest.fn();
const mockDeleteBucketCORS = jest.fn();
const mockUseBucket = jest.fn();
const mockPutBucketACL = jest.fn();
const mockPutBucket = jest.fn();
const mockGetBucketInfo = jest.fn();

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
  getBucketInfo: mockGetBucketInfo,
  getBucketACL: jest.fn(),
  getBucketWebsite: jest.fn(),
  getBucketLogging: jest.fn(),
  getBucketLifecycle: jest.fn(),
  list: jest.fn(),
  deleteMulti: jest.fn(),
  put: jest.fn(),
} as unknown as Context;

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

describe('ossOperations CORS', () => {
  let operations: ReturnType<typeof createOssOperations>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRequest.mockResolvedValue({});
    mockGetBucketInfo.mockResolvedValue({
      bucket: {
        ExtranetEndpoint: 'test-bucket.oss-cn-hangzhou.aliyuncs.com',
        Name: 'test-bucket',
        Location: 'oss-cn-hangzhou',
      },
    });
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
    mockGetBucketInfo.mockResolvedValue({
      bucket: {
        ExtranetEndpoint: 'test-bucket.oss-cn-hangzhou.aliyuncs.com',
        Name: 'test-bucket',
        Location: 'oss-cn-hangzhou',
      },
    });
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

    it('should throw when NeedVerifyDomainOwnership and no DNS operations available', async () => {
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

      await expect(
        operations.bindCustomDomain('test-bucket', 'cdn.example.com', cert),
      ).rejects.toThrow();
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

describe('ossOperations CNAME endpoint selection', () => {
  let operations: ReturnType<typeof createOssOperations>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRequest.mockResolvedValue({});
    mockGetBucketCORS.mockRejectedValue(new Error('NoSuchCORSConfiguration'));
    mockGetBucketInfo.mockResolvedValue({
      bucket: {
        ExtranetEndpoint: 'test-bucket.oss-cn-hangzhou.aliyuncs.com',
        Name: 'test-bucket',
        Location: 'oss-cn-hangzhou',
      },
    });
    operations = createOssOperations(mockOssClient, 'cn-hangzhou');
  });

  describe('bindCustomDomain CNAME target', () => {
    it('should use recommended CNAME endpoint (taihangcda.cn) for root/apex domain', async () => {
      const result = await operations.bindCustomDomain('test-bucket', 'wentsen.com');

      expect(result.cname).toBe('test-bucket.cn-hangzhou.taihangcda.cn');
    });

    it('should handle @.domain input as apex domain', async () => {
      const result = await operations.bindCustomDomain('test-bucket', '@.wentsen.com');

      expect(result.domain).toBe('wentsen.com');
      expect(result.cname).toBe('test-bucket.cn-hangzhou.taihangcda.cn');
    });

    it('should use recommended CNAME endpoint (taihangcda.cn) for www subdomain', async () => {
      const result = await operations.bindCustomDomain('test-bucket', 'www.wentsen.com');

      expect(result.cname).toBe('test-bucket.cn-hangzhou.taihangcda.cn');
    });

    it('should use recommended CNAME endpoint (taihangcda.cn) for non-www subdomain', async () => {
      const result = await operations.bindCustomDomain('test-bucket', 'cdn.example.com');

      expect(result.cname).toBe('test-bucket.cn-hangzhou.taihangcda.cn');
    });

    it('should derive CNAME endpoint from API Location, not from region parameter', async () => {
      mockGetBucketInfo.mockResolvedValue({
        bucket: {
          ExtranetEndpoint: 'my-bucket.oss-cn-beijing.aliyuncs.com',
          Name: 'my-bucket',
          Location: 'oss-cn-beijing',
        },
      });
      operations = createOssOperations(mockOssClient, 'cn-hangzhou');

      const result = await operations.bindCustomDomain('my-bucket', 'example.com');

      expect(result.cname).toBe('my-bucket.cn-beijing.taihangcda.cn');
    });

    it('should handle bucket names with dots correctly', async () => {
      mockGetBucketInfo.mockResolvedValue({
        bucket: {
          ExtranetEndpoint: 'my.website.bucket.oss-cn-hangzhou.aliyuncs.com',
          Name: 'my.website.bucket',
          Location: 'oss-cn-hangzhou',
        },
      });

      const result = await operations.bindCustomDomain('my.website.bucket', 'example.com');

      expect(result.cname).toBe('my.website.bucket.cn-hangzhou.taihangcda.cn');
    });

    it('should use taihangcda.cn for China regions', async () => {
      mockGetBucketInfo.mockResolvedValue({
        bucket: {
          ExtranetEndpoint: 'oss-cn-hangzhou.aliyuncs.com',
          Name: 'wentsen-site-prod',
          Location: 'oss-cn-hangzhou',
        },
      });

      const result = await operations.bindCustomDomain('wentsen-site-prod', 'example.com');

      expect(result.cname).toBe('wentsen-site-prod.cn-hangzhou.taihangcda.cn');
    });

    it('should use standard endpoint for international regions (Singapore)', async () => {
      mockGetBucketInfo.mockResolvedValue({
        bucket: {
          ExtranetEndpoint: 'oss-ap-southeast-1.aliyuncs.com',
          Name: 'my-bucket',
          Location: 'oss-ap-southeast-1',
        },
      });
      operations = createOssOperations(mockOssClient, 'ap-southeast-1');

      const result = await operations.bindCustomDomain('my-bucket', 'example.com');

      expect(result.cname).toBe('my-bucket.oss-ap-southeast-1.aliyuncs.com');
    });

    it('should use standard endpoint for international regions (US)', async () => {
      mockGetBucketInfo.mockResolvedValue({
        bucket: {
          ExtranetEndpoint: 'oss-us-west-1.aliyuncs.com',
          Name: 'my-bucket',
          Location: 'oss-us-west-1',
        },
      });
      operations = createOssOperations(mockOssClient, 'us-west-1');

      const result = await operations.bindCustomDomain('my-bucket', 'example.com');

      expect(result.cname).toBe('my-bucket.oss-us-west-1.aliyuncs.com');
    });

    it('should use standard endpoint for international regions (Europe)', async () => {
      mockGetBucketInfo.mockResolvedValue({
        bucket: {
          ExtranetEndpoint: 'oss-eu-central-1.aliyuncs.com',
          Name: 'my-bucket',
          Location: 'oss-eu-central-1',
        },
      });
      operations = createOssOperations(mockOssClient, 'eu-central-1');

      const result = await operations.bindCustomDomain('my-bucket', 'example.com');

      expect(result.cname).toBe('my-bucket.oss-eu-central-1.aliyuncs.com');
    });
  });
});

describe('ossOperations bucket operations', () => {
  let operations: ReturnType<typeof createOssOperations>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetBucketInfo.mockResolvedValue({
      bucket: {
        ExtranetEndpoint: 'test-bucket.oss-cn-hangzhou.aliyuncs.com',
        Name: 'test-bucket',
        Location: 'oss-cn-hangzhou',
      },
    });
    operations = createOssOperations(mockOssClient, 'cn-hangzhou');
  });

  describe('getBucket', () => {
    it('should get bucket info with all properties', async () => {
      const mockOssClient2 = {
        ...mockOssClient,
        getBucketInfo: jest.fn().mockResolvedValue({
          bucket: {
            Name: 'test-bucket',
            Location: 'oss-cn-hangzhou',
            CreationDate: '2023-01-01T00:00:00Z',
            StorageClass: 'Standard',
            DataRedundancyType: 'LRS',
            ResourceGroupId: 'rg-123',
            Comment: 'Test bucket',
            Owner: {
              ID: 'user-123',
              DisplayName: 'Test User',
            },
            BlockPublicAccess: false,
            AccessMonitor: 'Enabled',
          },
        }),
        getBucketACL: jest.fn().mockResolvedValue({ acl: 'private' }),
        getBucketWebsite: jest.fn().mockResolvedValue({
          index: 'index.html',
          error: '404.html',
        }),
        getBucketLogging: jest.fn().mockResolvedValue({
          enable: true,
          prefix: 'logs/',
        }),
        getBucketCORS: jest.fn().mockResolvedValue({
          rules: [{ allowedOrigin: ['*'], allowedMethod: ['GET'] }],
        }),
        getBucketLifecycle: jest.fn().mockResolvedValue({
          rules: [
            {
              id: 'rule-1',
              status: 'Enabled',
              prefix: 'temp/',
              days: 30,
            },
          ],
        }),
      };

      const ops = createOssOperations(mockOssClient2, 'cn-hangzhou');
      const result = await ops.getBucket('test-bucket');

      expect(result).toBeDefined();
      expect(result?.name).toBe('test-bucket');
      expect(result?.location).toBe('oss-cn-hangzhou');
      expect(result?.owner?.id).toBe('user-123');
      expect(result?.websiteConfig?.indexDocument).toBe('index.html');
      expect(result?.loggingConfig?.targetPrefix).toBe('logs/');
      expect(result?.corsRules).toBeDefined();
      expect(result?.lifecycleRules).toBeDefined();
    });

    it('should return null when bucket not found', async () => {
      const mockOssClient2 = {
        ...mockOssClient,
        getBucketInfo: jest.fn().mockRejectedValue({ code: 'NoSuchBucket' }),
      };

      const ops = createOssOperations(mockOssClient2, 'cn-hangzhou');
      const result = await ops.getBucket('nonexistent');

      expect(result).toBeNull();
    });

    it('should return null when access denied', async () => {
      const mockOssClient2 = {
        ...mockOssClient,
        getBucketInfo: jest.fn().mockRejectedValue({ code: 'AccessDenied' }),
      };

      const ops = createOssOperations(mockOssClient2, 'cn-hangzhou');
      const result = await ops.getBucket('restricted');

      expect(result).toBeNull();
    });

    it('should handle missing optional configurations gracefully', async () => {
      const mockOssClient2 = {
        ...mockOssClient,
        getBucketInfo: jest.fn().mockResolvedValue({
          bucket: {
            Name: 'test-bucket',
            Location: 'oss-cn-hangzhou',
          },
        }),
        getBucketACL: jest.fn().mockRejectedValue(new Error('Not available')),
        getBucketWebsite: jest.fn().mockRejectedValue(new Error('No website config')),
        getBucketLogging: jest.fn().mockRejectedValue(new Error('No logging')),
        getBucketCORS: jest.fn().mockRejectedValue(new Error('No CORS')),
        getBucketLifecycle: jest.fn().mockRejectedValue(new Error('No lifecycle')),
      };

      const ops = createOssOperations(mockOssClient2, 'cn-hangzhou');
      const result = await ops.getBucket('test-bucket');

      expect(result).toBeDefined();
      expect(result?.name).toBe('test-bucket');
      expect(result?.acl).toBeUndefined();
      expect(result?.websiteConfig).toBeUndefined();
    });
  });

  describe('updateBucketWebsite', () => {
    it('should update bucket website configuration', async () => {
      const mockOssClient2 = {
        ...mockOssClient,
        putBucketWebsite: jest.fn().mockResolvedValue({}),
        useBucket: jest.fn(),
      };

      const ops = createOssOperations(mockOssClient2, 'cn-hangzhou');
      await ops.updateBucketWebsite('test-bucket', {
        indexDocument: 'home.html',
        errorDocument: 'error.html',
      });

      expect(mockOssClient2.putBucketWebsite).toHaveBeenCalledWith(
        'test-bucket',
        expect.objectContaining({
          index: 'home.html',
          error: 'error.html',
        }),
      );
    });
  });

  describe('deleteBucketWebsite', () => {
    it('should delete bucket website configuration', async () => {
      const mockOssClient2 = {
        ...mockOssClient,
        deleteBucketWebsite: jest.fn().mockResolvedValue({}),
        useBucket: jest.fn(),
      };

      const ops = createOssOperations(mockOssClient2, 'cn-hangzhou');
      await ops.deleteBucketWebsite('test-bucket');

      expect(mockOssClient2.deleteBucketWebsite).toHaveBeenCalledWith('test-bucket');
    });
  });

  describe('deleteBucket', () => {
    it('should delete bucket with all objects', async () => {
      const mockOssClient2 = {
        ...mockOssClient,
        list: jest.fn().mockResolvedValueOnce({
          objects: [{ name: 'file1.txt' }, { name: 'file2.txt' }],
          isTruncated: false,
        }),
        deleteMulti: jest.fn().mockResolvedValue({}),
        deleteBucket: jest.fn().mockResolvedValue({}),
        useBucket: jest.fn(),
      };

      const ops = createOssOperations(mockOssClient2, 'cn-hangzhou');
      await ops.deleteBucket('test-bucket');

      expect(mockOssClient2.deleteMulti).toHaveBeenCalledWith(['file1.txt', 'file2.txt'], {
        quiet: true,
      });
      expect(mockOssClient2.deleteBucket).toHaveBeenCalledWith('test-bucket');
    });

    it('should handle pagination when listing objects', async () => {
      const mockOssClient2 = {
        ...mockOssClient,
        list: jest
          .fn()
          .mockResolvedValueOnce({
            objects: [{ name: 'file1.txt' }],
            isTruncated: true,
            nextMarker: 'marker-123',
          })
          .mockResolvedValueOnce({
            objects: [{ name: 'file2.txt' }],
            isTruncated: false,
          }),
        deleteMulti: jest.fn().mockResolvedValue({}),
        deleteBucket: jest.fn().mockResolvedValue({}),
        useBucket: jest.fn(),
      };

      const ops = createOssOperations(mockOssClient2, 'cn-hangzhou');
      await ops.deleteBucket('test-bucket');

      expect(mockOssClient2.list).toHaveBeenCalledTimes(2);
      expect(mockOssClient2.deleteMulti).toHaveBeenCalledTimes(2);
    });

    it('should continue deletion even if listing fails', async () => {
      const mockOssClient2 = {
        ...mockOssClient,
        list: jest.fn().mockRejectedValue(new Error('List error')),
        deleteMulti: jest.fn().mockResolvedValue({}),
        deleteBucket: jest.fn().mockResolvedValue({}),
        useBucket: jest.fn(),
      };

      const ops = createOssOperations(mockOssClient2, 'cn-hangzhou');
      await ops.deleteBucket('test-bucket');

      expect(mockOssClient2.deleteBucket).toHaveBeenCalledWith('test-bucket');
    });
  });

  describe('uploadFiles', () => {
    it('should upload single file', async () => {
      const mockOssClient2 = {
        ...mockOssClient,
        put: jest.fn().mockResolvedValue({}),
        useBucket: jest.fn(),
      };

      const ops = createOssOperations(mockOssClient2, 'cn-hangzhou');
      await ops.uploadFiles('test-bucket', '/path/to/file.txt');

      expect(mockOssClient2.put).toHaveBeenCalledWith('file.txt', '/path/to/file.txt');
    });

    it('should upload directory recursively', async () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const fs = require('node:fs');
      jest.spyOn(fs, 'statSync').mockReturnValue({ isDirectory: () => true });
      jest.spyOn(fs, 'readdirSync').mockReturnValue([
        { name: 'file1.txt', isDirectory: () => false, isFile: () => true },
        { name: 'subdir', isDirectory: () => true, isFile: () => false },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as any);

      const mockOssClient2 = {
        ...mockOssClient,
        put: jest.fn().mockResolvedValue({}),
        useBucket: jest.fn(),
      };

      const ops = createOssOperations(mockOssClient2, 'cn-hangzhou');
      await ops.uploadFiles('test-bucket', '/path/to/dir');

      expect(mockOssClient2.put).toHaveBeenCalled();
    });
  });

  describe('putFile', () => {
    it('should put file to bucket', async () => {
      const mockOssClient2 = {
        ...mockOssClient,
        put: jest.fn().mockResolvedValue({}),
        useBucket: jest.fn(),
      };

      const ops = createOssOperations(mockOssClient2, 'cn-hangzhou');
      await ops.putFile('test-bucket', 'objects/file.txt', '/path/to/file.txt');

      expect(mockOssClient2.put).toHaveBeenCalledWith('objects/file.txt', '/path/to/file.txt');
    });
  });

  describe('createCnameToken', () => {
    it('should create CNAME token for domain verification', async () => {
      mockRequest.mockResolvedValue({
        data: '<CnameToken><Cname>example.com</Cname><Token>token123</Token><ExpireTime>2024-01-01T00:00:00Z</ExpireTime></CnameToken>',
      });

      const result = await operations.createCnameToken('test-bucket', 'example.com');

      expect(result).toBeDefined();
      expect(result.token).toBe('token123');
      expect(result.cname).toBe('example.com');
      expect(result.bucket).toBe('test-bucket');
    });

    it('should throw error when token is missing in response', async () => {
      mockRequest.mockResolvedValue({
        data: '<CnameToken><Cname>example.com</Cname></CnameToken>',
      });

      await expect(operations.createCnameToken('test-bucket', 'example.com')).rejects.toThrow();
    });

    it('should handle empty response', async () => {
      mockRequest.mockResolvedValue({
        data: '',
      });

      await expect(operations.createCnameToken('test-bucket', 'example.com')).rejects.toThrow();
    });
  });
});
