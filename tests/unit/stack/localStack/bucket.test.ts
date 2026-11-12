import { bucketsHandler } from '../../../../src/stack/localStack/bucket';
import { ParsedRequest, RouteKind } from '../../../../src/types/localStack';
import { ServerlessIac, BucketDomain } from '../../../../src/types';
import http from 'node:http';
import { setContext, ProviderEnum } from '../../../../src/common';
import path from 'node:path';
import fs from 'node:fs';
import { Readable } from 'node:stream';

describe('bucketsHandler', () => {
  const iacLocation = path.resolve(__dirname, '../../../fixtures/serverless-insight.yml');

  beforeAll(async () => {
    await setContext({
      app: 'insight-poc-app',
      service: 'insight-poc',
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
    },
  };

  const mockIac: ServerlessIac = {
    version: '0.0.1',
    app: 'test-app',
    provider: {
      name: ProviderEnum.ALIYUN,
      region: 'cn-hangzhou',
    },
    service: 'test-service',
    buckets: [testBucket],
  };

  const plainBucket: BucketDomain = {
    key: 'plain_bucket',
    name: 'tests/fixtures/test-bucket',
  };

  const plainIac: ServerlessIac = { ...mockIac, buckets: [plainBucket] };
  const plainParsed: ParsedRequest = { ...baseParsed, identifier: 'plain_bucket' };

  describe('website-mode buckets (explicit website block)', () => {
    it('serves the index document for the root path instead of a file listing', async () => {
      const res = await bucketsHandler(mockRequest(), baseParsed, mockIac);

      expect(res.statusCode).toBe(200);
      expect(res.headers?.['Content-Type']).toBe('text/html');
      expect(res.body).toContain('Hello from test bucket');
    });

    it('serves an existing file directly', async () => {
      const res = await bucketsHandler(
        mockRequest(),
        { ...baseParsed, url: '/data.json' },
        mockIac,
      );

      expect(res.statusCode).toBe(200);
      expect(res.headers?.['Content-Type']).toBe('application/json');
      expect(res.body).toContain('test json file');
    });

    it('resolves the index document inside an existing directory', async () => {
      const websiteWithSubdirIndex: BucketDomain = {
        ...testBucket,
        website: { code: 'tests/fixtures/test-bucket', index: 'style.css' },
      };

      const res = await bucketsHandler(
        mockRequest(),
        { ...baseParsed, url: '/subdir' },
        { ...mockIac, buckets: [websiteWithSubdirIndex] },
      );

      expect(res.statusCode).toBe(200);
      expect(res.headers?.['Content-Type']).toBe('text/css');
      expect(res.body).toContain('background-color');
    });

    it('falls back to the site index for unmatched non-asset paths (SPA fallback)', async () => {
      const res = await bucketsHandler(
        mockRequest(),
        { ...baseParsed, url: '/admin/dashboard' },
        mockIac,
      );

      expect(res.statusCode).toBe(200);
      expect(res.headers?.['Content-Type']).toBe('text/html');
      expect(res.body).toContain('Hello from test bucket');
    });

    it('falls back to the site index for directories without their own index', async () => {
      const res = await bucketsHandler(mockRequest(), { ...baseParsed, url: '/subdir' }, mockIac);

      expect(res.statusCode).toBe(200);
      expect(res.headers?.['Content-Type']).toBe('text/html');
      expect(res.body).toContain('Hello from test bucket');
    });

    it('returns 404 for a missing asset path with a file extension', async () => {
      const res = await bucketsHandler(
        mockRequest(),
        { ...baseParsed, url: '/assets/missing.png' },
        mockIac,
      );

      expect(res.statusCode).toBe(404);
      expect(res.body).toMatchObject({
        error: 'File not found in bucket',
        path: 'assets/missing.png',
        bucketKey: 'test_bucket',
      });
    });

    it('returns 404 when the index document itself is missing', async () => {
      const websiteMissingIndex: BucketDomain = {
        ...testBucket,
        website: { code: 'tests/fixtures/test-bucket', index: 'missing.html' },
      };

      const res = await bucketsHandler(
        mockRequest(),
        { ...baseParsed, url: '/any/spa/route' },
        { ...mockIac, buckets: [websiteMissingIndex] },
      );

      expect(res.statusCode).toBe(404);
      expect(res.body).toMatchObject({
        error: 'Website index document not found in bucket',
        index: 'missing.html',
        bucketKey: 'test_bucket',
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

    it('returns 500 when readFileSync throws during file serving', async () => {
      const spy = jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
        throw new Error('File read error');
      });

      const res = await bucketsHandler(
        mockRequest(),
        { ...baseParsed, url: '/index.html' },
        mockIac,
      );

      spy.mockRestore();

      expect(res.statusCode).toBe(500);
      expect(res.body).toMatchObject({
        error: 'Failed to read file',
        message: 'File read error',
      });
    });

    it('returns 500 when readFileSync throws a non-Error value', async () => {
      const spy = jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
        throw 'string error';
      });

      const res = await bucketsHandler(
        mockRequest(),
        { ...baseParsed, url: '/index.html' },
        mockIac,
      );

      spy.mockRestore();

      expect(res.statusCode).toBe(500);
      expect(res.body).toMatchObject({
        error: 'Failed to read file',
        message: 'string error',
      });
    });
  });

  describe('plain buckets (no website block) keep raw object semantics', () => {
    it('lists all files in bucket when requesting root path', async () => {
      const res = await bucketsHandler(mockRequest(), plainParsed, plainIac);

      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchObject({
        bucket: 'tests/fixtures/test-bucket',
        bucketKey: 'plain_bucket',
      });

      const body = res.body as {
        files: Array<{ name: string; type: string; path: string }>;
        count: number;
      };
      expect(body.files).toBeDefined();
      expect(body.count).toBeGreaterThan(0);
      expect(body.files.some((f) => f.name === 'index.html')).toBe(true);
      expect(body.files.some((f) => f.name === 'data.json')).toBe(true);
    });

    it('serves an HTML file with correct mime type', async () => {
      const res = await bucketsHandler(
        mockRequest(),
        { ...plainParsed, url: '/index.html' },
        plainIac,
      );

      expect(res.statusCode).toBe(200);
      expect(res.headers?.['Content-Type']).toBe('text/html');
      expect(res.body).toContain('Hello from test bucket');
    });

    it('serves a file from subdirectory', async () => {
      const res = await bucketsHandler(
        mockRequest(),
        { ...plainParsed, url: '/subdir/style.css' },
        plainIac,
      );

      expect(res.statusCode).toBe(200);
      expect(res.headers?.['Content-Type']).toBe('text/css');
      expect(res.body).toContain('background-color');
    });

    it('lists files in subdirectory when requesting directory path', async () => {
      const res = await bucketsHandler(mockRequest(), { ...plainParsed, url: '/subdir' }, plainIac);

      expect(res.statusCode).toBe(200);
      const body = res.body as { files: Array<{ name: string; type: string }>; directory: string };
      expect(body.directory).toBe('subdir');
      expect(body.files).toBeDefined();
      expect(body.files.some((f) => f.name === 'style.css')).toBe(true);
    });

    it('returns 404 for non-existent file', async () => {
      const res = await bucketsHandler(
        mockRequest(),
        { ...plainParsed, url: '/non-existent.txt' },
        plainIac,
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
        { ...plainParsed, url: '/../../../package.json' },
        plainIac,
      );

      expect(res.statusCode).toBe(403);
      expect(res.body).toMatchObject({
        error: 'Access denied: Path traversal attempt detected',
      });
    });

    it('returns 500 when getAllFiles throws during root listing', async () => {
      const spy = jest.spyOn(fs, 'readdirSync').mockImplementation(() => {
        throw new Error('Permission denied');
      });

      const res = await bucketsHandler(mockRequest(), plainParsed, plainIac);

      spy.mockRestore();

      expect(res.statusCode).toBe(200);
      const body = res.body as { files: unknown[]; count: number };
      expect(body.count).toBe(0);
    });

    it('returns empty files when subdirectory listing throws', async () => {
      const originalReaddirSync = fs.readdirSync.bind(fs);
      const spy = jest.spyOn(fs, 'readdirSync').mockImplementation((...args) => {
        const dirPath = String(args[0]);
        if (dirPath.includes('subdir')) {
          throw new Error('Dir read error');
        }
        return originalReaddirSync(...(args as Parameters<typeof fs.readdirSync>));
      });

      const res = await bucketsHandler(mockRequest(), { ...plainParsed, url: '/subdir' }, plainIac);

      spy.mockRestore();

      expect(res.statusCode).toBe(200);
      const body = res.body as { files: unknown[] };
      expect(body.files).toEqual([]);
    });
  });

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
});
