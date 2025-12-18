import { bucketsHandler } from '../../../src/stack/localStack/bucket';
import { ParsedRequest, RouteKind } from '../../../src/types/localStack';
import { ServerlessIac, BucketDomain } from '../../../src/types';
import http from 'node:http';
import { setContext, ProviderEnum } from '../../../src/common';
import path from 'node:path';
import { Readable } from 'node:stream';

describe('bucketsHandler', () => {
  const iacLocation = path.resolve(__dirname, '../../fixtures/serverless-insight.yml');

  beforeAll(async () => {
    await setContext({
      stage: 'default',
      location: iacLocation,
    });
  });

  const mockRequest = (method = 'GET'): http.IncomingMessage => {
    const readable = new Readable();
    readable.push(null);
    return Object.assign(readable, {
      method,
      headers: {},
      url: '/',
    }) as http.IncomingMessage;
  };

  const baseParsed: ParsedRequest = {
    kind: RouteKind.SI_BUCKETS,
    identifier: 'test_bucket',
    url: '/',
    method: 'GET',
    query: {},
    rawUrl: '/si_buckets/test_bucket/',
  };

  const testBucket: BucketDomain = {
    key: 'test_bucket',
    name: 'test-bucket',
    website: {
      code: 'tests/fixtures/test-bucket',
      index: 'index.html',
      error_page: '404.html',
      error_code: 404,
    },
  };

  const mockIac: ServerlessIac = {
    version: '0.0.1',
    provider: {
      name: ProviderEnum.ALIYUN,
      region: 'cn-hangzhou',
    },
    service: 'test-service',
    buckets: [testBucket],
  };

  it('returns 404 when bucket not found', async () => {
    const res = await bucketsHandler(
      mockRequest(),
      { ...baseParsed, identifier: 'missing' },
      mockIac,
    );

    expect(res.statusCode).toBe(404);
    expect(res.body).toMatchObject({ error: 'Bucket not found', bucketKey: 'missing' });
  });

  it('returns 404 when bucket directory does not exist', async () => {
    const iacWithMissingDir: ServerlessIac = {
      ...mockIac,
      buckets: [
        {
          ...testBucket,
          website: {
            ...testBucket.website!,
            code: 'tests/fixtures/non-existent',
          },
        },
      ],
    };

    const res = await bucketsHandler(mockRequest(), baseParsed, iacWithMissingDir);

    expect(res.statusCode).toBe(404);
    expect(res.body).toMatchObject({
      error: 'Bucket directory not found',
      bucketKey: 'test_bucket',
    });
  });

  it('lists all files in bucket when requesting root path', async () => {
    const res = await bucketsHandler(mockRequest(), baseParsed, mockIac);

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({
      bucket: 'test-bucket',
      bucketKey: 'test_bucket',
    });

    const body = res.body as {
      files: Array<{ name: string; type: string; path: string }>;
      count: number;
    };
    expect(body.files).toBeDefined();
    expect(body.count).toBeGreaterThan(0);
    expect(body.files.some((f) => f.name === 'index.html')).toBe(true);
    expect(body.files.some((f) => f.name === 'data.json')).toBe(true);
    expect(body.files.some((f) => f.name === 'test.txt')).toBe(true);
  });

  it('serves an HTML file with correct mime type', async () => {
    const res = await bucketsHandler(mockRequest(), { ...baseParsed, url: '/index.html' }, mockIac);

    expect(res.statusCode).toBe(200);
    expect(res.headers?.['Content-Type']).toBe('text/html');
    expect(typeof res.body).toBe('string');
    expect((res.body as string).includes('Hello from test bucket')).toBe(true);
  });

  it('serves a JSON file with correct mime type', async () => {
    const res = await bucketsHandler(mockRequest(), { ...baseParsed, url: '/data.json' }, mockIac);

    expect(res.statusCode).toBe(200);
    expect(res.headers?.['Content-Type']).toBe('application/json');
    expect(typeof res.body).toBe('string');
    expect((res.body as string).includes('test json file')).toBe(true);
  });

  it('serves a text file with correct mime type', async () => {
    const res = await bucketsHandler(mockRequest(), { ...baseParsed, url: '/test.txt' }, mockIac);

    expect(res.statusCode).toBe(200);
    expect(res.headers?.['Content-Type']).toBe('text/plain');
    expect(typeof res.body).toBe('string');
    expect((res.body as string).includes('test text file')).toBe(true);
  });

  it('serves a file from subdirectory', async () => {
    const res = await bucketsHandler(
      mockRequest(),
      { ...baseParsed, url: '/subdir/style.css' },
      mockIac,
    );

    expect(res.statusCode).toBe(200);
    expect(res.headers?.['Content-Type']).toBe('text/css');
    expect(typeof res.body).toBe('string');
    expect((res.body as string).includes('background-color')).toBe(true);
  });

  it('lists files in subdirectory when requesting directory path', async () => {
    const res = await bucketsHandler(mockRequest(), { ...baseParsed, url: '/subdir' }, mockIac);

    expect(res.statusCode).toBe(200);
    const body = res.body as { files: Array<{ name: string; type: string }>; directory: string };
    expect(body.directory).toBe('subdir');
    expect(body.files).toBeDefined();
    expect(body.files.some((f) => f.name === 'style.css')).toBe(true);
  });

  it('returns 404 for non-existent file', async () => {
    const res = await bucketsHandler(
      mockRequest(),
      { ...baseParsed, url: '/non-existent.txt' },
      mockIac,
    );

    expect(res.statusCode).toBe(404);
    expect(res.body).toMatchObject({
      error: 'File not found',
      path: 'non-existent.txt',
    });
  });

  it('prevents path traversal attacks', async () => {
    const res = await bucketsHandler(
      mockRequest(),
      { ...baseParsed, url: '/../../../package.json' },
      mockIac,
    );

    expect(res.statusCode).toBe(403);
    expect(res.body).toMatchObject({
      error: 'Access denied: Path traversal attempt detected',
    });
  });
});
