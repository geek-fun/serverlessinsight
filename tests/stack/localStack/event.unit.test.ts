import { eventsHandler } from '../../../src/stack/localStack';
import { ParsedRequest } from '../../../src/types/localStack';
import http from 'node:http';
import { Readable } from 'node:stream';
import { setContext, getContext } from '../../../src/common';
import path from 'node:path';
import { revalYaml } from '../../../src/parser';
import { ServerlessIac } from '../../../src/types';

describe('Event Unit Tests', () => {
  const iacLocation = path.resolve(__dirname, '../../fixtures/serverless-insight.yml');
  let iac: ReturnType<typeof revalYaml>;

  beforeAll(async () => {
    await setContext({
      stage: 'default',
      location: iacLocation,
    });

    const ctx = getContext();
    iac = revalYaml(iacLocation, ctx);
  });

  const mockRequest = (
    method = 'GET',
    body = '',
    url = '/api/hello',
    headers: Record<string, string> = {},
  ): http.IncomingMessage => {
    const readable = new Readable();
    readable.push(body);
    readable.push(null);
    const req = Object.assign(readable, {
      method,
      url,
      headers: {
        'content-type': 'application/json',
        ...headers,
      },
      socket: {
        remoteAddress: '192.168.1.100',
      },
    }) as http.IncomingMessage;
    return req;
  };

  const parsedBase: ParsedRequest = {
    kind: undefined as unknown as ParsedRequest['kind'],
    identifier: 'gateway_event',
    url: '/api/hello',
    method: 'GET',
    query: {},
    rawUrl: '/si_events/gateway_event/api/hello',
  };

  describe('matchTrigger edge cases', () => {
    it('should handle wildcard paths', async () => {
      // Test with a path that has more segments than the trigger
      const res = await eventsHandler(
        mockRequest('GET', '', '/api/hello/extra/segments'),
        { ...parsedBase, url: '/api/hello/extra/segments' },
        iac,
      );

      // Should still match because of wildcard or exact match logic
      expect(res?.statusCode).toBeDefined();
    });

    it('should handle path parameters', async () => {
      const res = await eventsHandler(
        mockRequest('GET', '', '/api/[id]'),
        { ...parsedBase, url: '/api/123' },
        iac,
      );

      expect(res?.statusCode).toBeDefined();
    });

    it('should handle paths with trailing slashes', async () => {
      const res = await eventsHandler(
        mockRequest('GET', '', '/api/hello/'),
        { ...parsedBase, url: '/api/hello/' },
        iac,
      );

      expect(res?.statusCode).toBeDefined();
    });

    it('should handle ANY method', async () => {
      const resGet = await eventsHandler(mockRequest('GET'), { ...parsedBase, method: 'ANY' }, iac);

      const resPost = await eventsHandler(
        mockRequest('POST'),
        { ...parsedBase, method: 'ANY' },
        iac,
      );

      expect(resGet?.statusCode).toBeDefined();
      expect(resPost?.statusCode).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('should return 500 when backend definition is missing', async () => {
      // Create a mock IAC with a trigger that points to non-existent backend
      const badIac = {
        ...iac,
        events: [
          {
            type: 'api-gateway',
            key: 'bad_event',
            triggers: [
              {
                method: 'GET',
                path: '/api/bad',
                backend: '${functions.non_existent_fn}',
              },
            ],
          },
        ],
      };

      const res = await eventsHandler(
        mockRequest('GET', '', '/api/bad'),
        { ...parsedBase, identifier: 'bad_event', url: '/api/bad' },
        badIac as unknown as ServerlessIac,
      );

      expect(res?.statusCode).toBe(500);
      expect(res?.body).toHaveProperty('error', 'Backend definition missing');
    });
  });

  describe('request body handling', () => {
    it('should handle POST requests with JSON body', async () => {
      const body = JSON.stringify({ name: 'test', value: 123 });
      const res = await eventsHandler(mockRequest('POST', body), parsedBase, iac);

      expect(res?.statusCode).toBe(200);
    });

    it('should handle POST requests with empty body', async () => {
      const res = await eventsHandler(mockRequest('POST', ''), parsedBase, iac);

      expect(res?.statusCode).toBe(200);
    });
  });

  describe('query parameters', () => {
    it('should handle requests with query parameters', async () => {
      const parsed: ParsedRequest = {
        ...parsedBase,
        query: { param1: 'value1', param2: 'value2' },
        url: '/api/hello?param1=value1&param2=value2',
      };

      const res = await eventsHandler(mockRequest('GET'), parsed, iac);

      expect(res?.statusCode).toBeDefined();
    });
  });

  describe('source IP handling', () => {
    it('should use default IP when socket remoteAddress is missing', async () => {
      const req = mockRequest('GET');
      // Remove socket
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (req as any).socket;

      const res = await eventsHandler(req, parsedBase, iac);

      expect(res?.statusCode).toBeDefined();
    });
  });
});
