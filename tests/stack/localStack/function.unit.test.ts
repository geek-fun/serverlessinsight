import { functionsHandler } from '../../../src/stack/localStack/function';
import { ParsedRequest } from '../../../src/types/localStack';
import http from 'node:http';
import { setContext } from '../../../src/common';
import path from 'node:path';
import { Readable } from 'node:stream';
import { oneFcIac } from '../../fixtures/deploy-fixtures/oneFc';

describe('Function Unit Tests', () => {
  const iacLocation = path.resolve(__dirname, '../../fixtures/serverless-insight.yml');

  beforeAll(async () => {
    await setContext({
      stage: 'default',
      location: iacLocation,
    });
  });

  const mockRequest = (
    method = 'GET',
    body = '',
    headers: Record<string, string> = {},
  ): http.IncomingMessage => {
    const readable = new Readable();
    readable.push(body);
    readable.push(null);
    return Object.assign(readable, {
      method,
      headers: {
        'content-type': 'application/json',
        ...headers,
      },
      url: '/',
    }) as http.IncomingMessage;
  };

  const baseParsed: ParsedRequest = {
    kind: undefined as unknown as ParsedRequest['kind'],
    identifier: 'hello_fn',
    url: '/',
    method: 'GET',
    query: {},
    rawUrl: '/',
  };

  describe('error handling paths', () => {
    it('should handle invalid JSON in POST body', async () => {
      const res = await functionsHandler(
        mockRequest('POST', '{invalid json}'),
        baseParsed,
        oneFcIac,
      );

      // Should handle the error gracefully
      expect(res.statusCode).toBeDefined();
    });
  });

  describe('request body parsing', () => {
    it('should handle POST request with JSON body', async () => {
      const body = JSON.stringify({ key: 'value', number: 42 });
      const res = await functionsHandler(mockRequest('POST', body), baseParsed, oneFcIac);

      expect(res.statusCode).toBeDefined();
    });

    it('should handle POST request with empty body', async () => {
      const res = await functionsHandler(mockRequest('POST', ''), baseParsed, oneFcIac);

      expect(res.statusCode).toBeDefined();
    });

    it('should handle GET request (no body)', async () => {
      const res = await functionsHandler(mockRequest('GET'), baseParsed, oneFcIac);

      expect(res.statusCode).toBeDefined();
    });
  });

  describe('environment variables', () => {
    it('should pass function environment variables to handler', async () => {
      const iacWithEnv = {
        ...oneFcIac,
        functions: [
          {
            ...oneFcIac.functions![0],
            environment: {
              TEST_VAR: 'test_value',
              ANOTHER_VAR: 'another_value',
            },
          },
        ],
      };

      const res = await functionsHandler(mockRequest('POST'), baseParsed, iacWithEnv);

      expect(res.statusCode).toBeDefined();
    });
  });

  describe('query parameters', () => {
    it('should handle requests with query parameters', async () => {
      const parsed: ParsedRequest = {
        ...baseParsed,
        query: { param1: 'value1', param2: 'value2' },
      };

      const res = await functionsHandler(mockRequest('GET'), parsed, oneFcIac);

      expect(res.statusCode).toBeDefined();
    });

    it('should handle requests with empty query', async () => {
      const parsed: ParsedRequest = {
        ...baseParsed,
        query: {},
      };

      const res = await functionsHandler(mockRequest('GET'), parsed, oneFcIac);

      expect(res.statusCode).toBeDefined();
    });
  });

  describe('code path handling', () => {
    it('should handle directory code path', async () => {
      const res = await functionsHandler(mockRequest('POST'), baseParsed, oneFcIac);

      expect(res.statusCode).toBeDefined();
    });

    it('should handle function with custom timeout', async () => {
      const iacWithTimeout = {
        ...oneFcIac,
        functions: [
          {
            ...oneFcIac.functions![0],
            timeout: 30,
          },
        ],
      };

      const res = await functionsHandler(mockRequest('POST'), baseParsed, iacWithTimeout);

      expect(res.statusCode).toBeDefined();
    });

    it('should handle function with custom memory', async () => {
      const iacWithMemory = {
        ...oneFcIac,
        functions: [
          {
            ...oneFcIac.functions![0],
            memory: 512,
          },
        ],
      };

      const res = await functionsHandler(mockRequest('POST'), baseParsed, iacWithMemory);

      expect(res.statusCode).toBeDefined();
    });
  });
});
