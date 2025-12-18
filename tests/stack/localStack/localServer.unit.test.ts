import { SI_LOCALSTACK_SERVER_PORT } from '../../../src/common';
import { servLocal, stopLocal } from '../../../src/stack/localStack/localServer';
import { RouteHandler, RouteKind, ParsedRequest } from '../../../src/types/localStack';
import { ServerlessIac } from '../../../src/types';
import { makeRequest } from '../../autils';
import { IncomingMessage } from 'http';

describe('LocalServer Unit Tests', () => {
  const successHandler: RouteHandler = async () => ({
    statusCode: 200,
    body: { message: 'success' },
  });

  const emptyResponseHandler: RouteHandler = async () => undefined;

  const errorHandler: RouteHandler = async () => {
    throw new Error('Handler error');
  };

  const headersHandler: RouteHandler = async () => ({
    statusCode: 200,
    body: { message: 'with headers' },
    headers: { 'x-custom-header': 'custom-value' },
  });

  const iac = {
    service: 'test',
    version: '0.0.1',
    provider: { name: undefined, region: 'xx' },
  } as unknown as ServerlessIac;

  afterEach(async () => {
    // Ensure server is stopped between tests
    try {
      await stopLocal();
    } catch {
      // Ignore if already stopped
    }
  });

  describe('route parsing', () => {
    it('should handle routes with query parameters', async () => {
      const handlers = [
        {
          kind: RouteKind.SI_FUNCTIONS,
          handler: async (_req: IncomingMessage, parsed: ParsedRequest) => ({
            statusCode: 200,
            body: { query: parsed.query },
          }),
        },
      ];

      await servLocal(handlers, iac);

      const res = await makeRequest(
        `http://localhost:${SI_LOCALSTACK_SERVER_PORT}/si_functions/test?param1=value1&param2=value2`,
      );

      expect(res.statusCode).toBe(200);
      expect(res.data).toContain('param1');

      await stopLocal();
    });

    it('should handle routes with multiple path segments', async () => {
      const handlers = [
        {
          kind: RouteKind.SI_FUNCTIONS,
          handler: async (_req: IncomingMessage, parsed: ParsedRequest) => ({
            statusCode: 200,
            body: { url: parsed.url },
          }),
        },
      ];

      await servLocal(handlers, iac);

      const res = await makeRequest(
        `http://localhost:${SI_LOCALSTACK_SERVER_PORT}/si_functions/test/path/to/resource`,
      );

      expect(res.statusCode).toBe(200);

      await stopLocal();
    });

    it('should handle routes with no identifier', async () => {
      const handlers = [
        {
          kind: RouteKind.SI_FUNCTIONS,
          handler: successHandler,
        },
      ];

      await servLocal(handlers, iac);

      const res = await makeRequest(`http://localhost:${SI_LOCALSTACK_SERVER_PORT}/si_functions/`);

      expect(res.statusCode).toBe(200);

      await stopLocal();
    });

    it('should return 404 for invalid route format', async () => {
      const handlers = [
        {
          kind: RouteKind.SI_FUNCTIONS,
          handler: successHandler,
        },
      ];

      await servLocal(handlers, iac);

      const res = await makeRequest(`http://localhost:${SI_LOCALSTACK_SERVER_PORT}/`);

      expect(res.statusCode).toBe(404);

      await stopLocal();
    });
  });

  describe('response handling', () => {
    it('should return 204 when handler returns undefined', async () => {
      const handlers = [
        {
          kind: RouteKind.SI_FUNCTIONS,
          handler: emptyResponseHandler,
        },
      ];

      await servLocal(handlers, iac);

      const res = await makeRequest(
        `http://localhost:${SI_LOCALSTACK_SERVER_PORT}/si_functions/test`,
      );

      expect(res.statusCode).toBe(204);

      await stopLocal();
    });

    it('should include custom headers in response', async () => {
      const handlers = [
        {
          kind: RouteKind.SI_FUNCTIONS,
          handler: headersHandler,
        },
      ];

      await servLocal(handlers, iac);

      const res = await makeRequest(
        `http://localhost:${SI_LOCALSTACK_SERVER_PORT}/si_functions/test`,
      );

      expect(res.statusCode).toBe(200);

      await stopLocal();
    });

    it('should return 500 when handler throws error', async () => {
      const handlers = [
        {
          kind: RouteKind.SI_FUNCTIONS,
          handler: errorHandler,
        },
      ];

      await servLocal(handlers, iac);

      const res = await makeRequest(
        `http://localhost:${SI_LOCALSTACK_SERVER_PORT}/si_functions/test`,
      );

      expect(res.statusCode).toBe(500);
      expect(res.data).toContain('Local gateway failure');

      await stopLocal();
    });
  });

  describe('handler registration', () => {
    it('should return 404 when no handler registered for route kind', async () => {
      const handlers = [
        {
          kind: RouteKind.SI_FUNCTIONS,
          handler: successHandler,
        },
      ];

      await servLocal(handlers, iac);

      const res = await makeRequest(`http://localhost:${SI_LOCALSTACK_SERVER_PORT}/si_events/test`);

      expect(res.statusCode).toBe(404);
      expect(res.data).toContain('Handler for SI_EVENTS not registered');

      await stopLocal();
    });

    it('should handle multiple route kinds', async () => {
      const handlers = [
        {
          kind: RouteKind.SI_FUNCTIONS,
          handler: async () => ({ statusCode: 200, body: { type: 'function' } }),
        },
        {
          kind: RouteKind.SI_EVENTS,
          handler: async () => ({ statusCode: 200, body: { type: 'event' } }),
        },
      ];

      await servLocal(handlers, iac);

      const res1 = await makeRequest(
        `http://localhost:${SI_LOCALSTACK_SERVER_PORT}/si_functions/test`,
      );
      const res2 = await makeRequest(
        `http://localhost:${SI_LOCALSTACK_SERVER_PORT}/si_events/test`,
      );

      expect(res1.statusCode).toBe(200);
      expect(res1.data).toContain('function');
      expect(res2.statusCode).toBe(200);
      expect(res2.data).toContain('event');

      await stopLocal();
    });
  });

  describe('server lifecycle', () => {
    it('should not start server if already running', async () => {
      const handlers = [
        {
          kind: RouteKind.SI_FUNCTIONS,
          handler: successHandler,
        },
      ];

      await servLocal(handlers, iac);
      // Try to start again
      await servLocal(handlers, iac);

      const res = await makeRequest(
        `http://localhost:${SI_LOCALSTACK_SERVER_PORT}/si_functions/test`,
      );

      expect(res.statusCode).toBe(200);

      await stopLocal();
    });

    it('should handle stopLocal when server is not running', async () => {
      // Should not throw
      await expect(stopLocal()).resolves.not.toThrow();
    });
  });

  describe('HTTP methods', () => {
    it('should handle POST requests', async () => {
      const handlers = [
        {
          kind: RouteKind.SI_FUNCTIONS,
          handler: async (_req: IncomingMessage, parsed: ParsedRequest) => ({
            statusCode: 200,
            body: { method: parsed.method },
          }),
        },
      ];

      await servLocal(handlers, iac);

      const res = await makeRequest(
        `http://localhost:${SI_LOCALSTACK_SERVER_PORT}/si_functions/test`,
        'POST',
      );

      expect(res.statusCode).toBe(200);

      await stopLocal();
    });

    it('should handle PUT requests', async () => {
      const handlers = [
        {
          kind: RouteKind.SI_FUNCTIONS,
          handler: async (_req: IncomingMessage, parsed: ParsedRequest) => ({
            statusCode: 200,
            body: { method: parsed.method },
          }),
        },
      ];

      await servLocal(handlers, iac);

      const res = await makeRequest(
        `http://localhost:${SI_LOCALSTACK_SERVER_PORT}/si_functions/test`,
        'PUT',
      );

      expect(res.statusCode).toBe(200);

      await stopLocal();
    });

    it('should handle DELETE requests', async () => {
      const handlers = [
        {
          kind: RouteKind.SI_FUNCTIONS,
          handler: async (_req: IncomingMessage, parsed: ParsedRequest) => ({
            statusCode: 200,
            body: { method: parsed.method },
          }),
        },
      ];

      await servLocal(handlers, iac);

      const res = await makeRequest(
        `http://localhost:${SI_LOCALSTACK_SERVER_PORT}/si_functions/test`,
        'DELETE',
      );

      expect(res.statusCode).toBe(200);

      await stopLocal();
    });
  });
});
