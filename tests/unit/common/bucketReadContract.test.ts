import type OSS from 'ali-oss';
import type COS from 'cos-nodejs-sdk-v5';
import type { Service } from '@volcengine/openapi';
import { createOssOperations } from '../../../src/common/aliyunClient/ossOperations';
import { createCosOperations } from '../../../src/common/tencentClient/cosOperations';
import { createTosOperations } from '../../../src/common/volcengineClient/tosOperations';

jest.mock('../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

const createOssSdk = () => ({
  useBucket: jest.fn(),
  getBucketInfo: jest.fn().mockResolvedValue({ bucket: { Name: 'assets' } }),
  getBucketACL: jest.fn().mockResolvedValue({}),
  getBucketWebsite: jest.fn().mockResolvedValue({}),
  getBucketVersioning: jest.fn().mockResolvedValue({}),
  getBucketEncryption: jest.fn().mockResolvedValue({}),
  getBucketPolicy: jest.fn().mockResolvedValue({}),
  request: jest.fn().mockResolvedValue({ data: '' }),
});

const callbackRead = () => jest.fn((_params, callback) => callback(null, {}));
const createCosSdk = () => ({
  headBucket: callbackRead(),
  getBucketAcl: callbackRead(),
  getBucketCors: callbackRead(),
  getBucketWebsite: callbackRead(),
  getBucketVersioning: callbackRead(),
  getBucketEncryption: callbackRead(),
  getBucketPolicy: callbackRead(),
  getBucketTagging: callbackRead(),
  getBucketLifecycle: callbackRead(),
  getBucketLogging: callbackRead(),
  getBucketReplication: callbackRead(),
  putBucketPolicy: callbackRead(),
});

describe('OSS managed configuration reads', () => {
  it.each([
    'getBucketInfo',
    'getBucketWebsite',
    'getBucketVersioning',
    'getBucketEncryption',
    'getBucketPolicy',
  ] as const)('propagates operational failures from %s', async (method) => {
    const sdk = createOssSdk();
    const error = Object.assign(new Error('denied'), { code: 'AccessDenied' });
    sdk[method].mockRejectedValueOnce(error);
    const operations = createOssOperations(sdk as unknown as OSS, 'cn-hangzhou');
    await expect(operations.getBucket('assets')).rejects.toBe(error);
  });

  it.each([
    'getBucketWebsite',
    'getBucketVersioning',
    'getBucketEncryption',
    'getBucketPolicy',
  ] as const)(
    'does not reinterpret a parent disappearing during %s as a successful existence check',
    async (method) => {
      const sdk = createOssSdk();
      const error = { code: 'NoSuchBucket' };
      sdk[method].mockRejectedValueOnce(error);
      const operations = createOssOperations(sdk as unknown as OSS, 'cn-hangzhou');
      await expect(operations.getBucket('assets')).rejects.toBe(error);
    },
  );

  it('records successful empty reads and classified configuration absence as null', async () => {
    const sdk = createOssSdk();
    sdk.getBucketWebsite.mockRejectedValueOnce({ code: 'NoSuchWebsiteConfiguration' });
    sdk.getBucketEncryption.mockRejectedValueOnce({ code: 'NoSuchServerSideEncryptionRule' });
    sdk.getBucketPolicy.mockRejectedValueOnce({ code: 'NoSuchBucketPolicy' });
    const operations = createOssOperations(sdk as unknown as OSS, 'cn-hangzhou');
    await expect(operations.getBucket('assets')).resolves.toMatchObject({
      name: 'assets',
      websiteConfig: null,
      encryptionConfig: null,
      versioningConfig: null,
      policy: null,
    });
  });

  it('returns null only when the bucket identity read confirms absence', async () => {
    const sdk = createOssSdk();
    sdk.getBucketInfo.mockRejectedValueOnce({ code: 'NoSuchBucket' });
    const operations = createOssOperations(sdk as unknown as OSS, 'cn-hangzhou');
    await expect(operations.getBucket('assets')).resolves.toBeNull();
    expect(sdk.getBucketPolicy).not.toHaveBeenCalled();
  });

  it('propagates malformed policy responses', async () => {
    const sdk = createOssSdk();
    sdk.getBucketPolicy.mockResolvedValueOnce({ policy: '{invalid' });
    const operations = createOssOperations(sdk as unknown as OSS, 'cn-hangzhou');
    await expect(operations.getBucket('assets')).rejects.toThrow(SyntaxError);
  });
});

describe('COS managed configuration reads', () => {
  it.each([
    'getBucketWebsite',
    'getBucketVersioning',
    'getBucketEncryption',
    'getBucketPolicy',
  ] as const)(
    'propagates nested errors from %s without reporting a missing bucket',
    async (method) => {
      const sdk = createCosSdk();
      const error = { statusCode: 404, code: 'NoSuchBucket' };
      sdk[method].mockImplementationOnce((_params, callback) => callback(error));
      const operations = createCosOperations(sdk as unknown as COS, 'ap-guangzhou');
      await expect(operations.getBucket('assets', 'ap-guangzhou')).rejects.toBe(error);
    },
  );

  it.each([403, 503, 404])('propagates an unclassified policy HTTP %s', async (statusCode) => {
    const sdk = createCosSdk();
    const error = { statusCode };
    sdk.getBucketPolicy.mockImplementation((_params, callback) => callback(error));
    const operations = createCosOperations(sdk as unknown as COS, 'ap-guangzhou');
    await expect(operations.getBucket('assets', 'ap-guangzhou')).rejects.toBe(error);
    await expect(operations.getBucketPolicy('assets', 'ap-guangzhou')).rejects.toBe(error);
  });

  it('records classified policy absence and propagates failed policy removal', async () => {
    const sdk = createCosSdk();
    sdk.getBucketPolicy.mockImplementation((_params, callback) =>
      callback({ code: 'NoSuchBucketPolicy' }),
    );
    const error = { code: 'AccessDenied' };
    sdk.putBucketPolicy.mockImplementation((_params, callback) => callback(error));
    const operations = createCosOperations(sdk as unknown as COS, 'ap-guangzhou');
    await expect(operations.getBucket('assets', 'ap-guangzhou')).resolves.toMatchObject({
      Policy: null,
    });
    await expect(operations.deleteBucketPolicy('assets', 'ap-guangzhou')).rejects.toBe(error);
  });
});

describe('TOS managed configuration reads', () => {
  it.each(['AccessDenied', 'ServiceUnavailable', 'NoSuchBucket', 'ResourceNotFound'])(
    'propagates nested website failure %s',
    async (code) => {
      const error = { code };
      const sdk = {
        fetchOpenAPI: jest
          .fn()
          .mockResolvedValueOnce({ Result: { BucketInfo: {} } })
          .mockRejectedValueOnce(error),
      };
      const operations = createTosOperations(sdk as unknown as Service, 'cn-beijing');
      await expect(operations.getBucket('assets')).rejects.toBe(error);
    },
  );

  it('records a classified absent website while keeping the bucket', async () => {
    const sdk = {
      fetchOpenAPI: jest
        .fn()
        .mockResolvedValue({ Result: {} })
        .mockResolvedValueOnce({ Result: { BucketInfo: {} } })
        .mockRejectedValueOnce({ code: 'NoSuchWebsiteConfiguration' }),
    };
    const operations = createTosOperations(sdk as unknown as Service, 'cn-beijing');
    await expect(operations.getBucket('assets')).resolves.toMatchObject({
      name: 'assets',
      websiteConfig: null,
    });
  });
});
