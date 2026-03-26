import { createCosOperations } from '../../../../src/common/tencentClient/cosOperations';

const mockGetBucketCors = jest.fn();
const mockPutBucketCors = jest.fn();
const mockDeleteBucketCors = jest.fn();

const mockCosClient = {
  headBucket: jest.fn(),
  putBucket: jest.fn(),
  deleteBucket: jest.fn(),
  putBucketAcl: jest.fn(),
  getBucketAcl: jest.fn(),
  putBucketWebsite: jest.fn(),
  getBucketWebsite: jest.fn(),
  getBucketVersioning: jest.fn(),
  getBucketTagging: jest.fn(),
  getBucketCors: mockGetBucketCors,
  putBucketCors: mockPutBucketCors,
  deleteBucketCors: mockDeleteBucketCors,
  putBucketDomain: jest.fn(),
  getBucketDomain: jest.fn(),
  deleteBucketDomain: jest.fn(),
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

describe('cosOperations CORS', () => {
  let operations: ReturnType<typeof createCosOperations>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockCosClient.putBucketDomain.mockImplementation((_params: unknown, cb: (err: null) => void) =>
      cb(null),
    );
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
      mockCosClient.getBucketDomain.mockImplementation(
        (_params: unknown, cb: (err: null, data: { DomainRule: unknown[] }) => void) =>
          cb(null, { DomainRule: [{ Name: 'cdn.example.com', Status: 'ENABLED', Type: 'REST' }] }),
      );
      mockCosClient.deleteBucketDomain.mockImplementation(
        (_params: unknown, cb: (err: null) => void) => cb(null),
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
