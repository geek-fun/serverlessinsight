import { SI_LOCALSTACK_SERVER_PORT } from '../../../../src/common';
import { servLocal, stopLocal } from '../../../../src/stack/localStack/localServer';
import { RouteHandler, RouteKind } from '../../../../src/types/localStack';
import { ServerlessIac } from '../../../../src/types';
import { makeRequest } from '../../../autils';

const htmlRoute: RouteKind = 'SI_BUCKETS' as RouteKind;

describe('localServer routing', () => {
  const jsonHandler: RouteHandler = async () => ({
    statusCode: 200,
    body: { ok: true },
  });

  const htmlHandler: RouteHandler = async () => ({
    statusCode: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
    body: '<!DOCTYPE html><html><body><h1>Hello</h1></body></html>',
  });

  const handlers: Array<{ kind: RouteKind; handler: RouteHandler }> = [
    { kind: RouteKind.SI_FUNCTIONS, handler: jsonHandler },
    { kind: htmlRoute, handler: htmlHandler },
  ];

  const iac = {
    service: 'test',
    version: '0.0.1',
    provider: { name: undefined, region: 'xx' },
  } as unknown as ServerlessIac;

  beforeAll(async () => {
    await servLocal(handlers, iac);
  });

  afterAll(async () => {
    await stopLocal();
  });

  describe('JSON responses', () => {
    it('returns 200 when handler registered', async () => {
      const res = await makeRequest(`http://localhost:${SI_LOCALSTACK_SERVER_PORT}/si_functions/`);

      expect(res.statusCode).toBe(200);
      expect(res.data).toContain('ok');
    });

    it('returns 404 for unknown route', async () => {
      const res = await makeRequest(
        `http://localhost:${SI_LOCALSTACK_SERVER_PORT}/unknown_route/path`,
      );

      expect(res.statusCode).toBe(404);
    });

    it('returns 404 when a recognized route has no registered handler', async () => {
      const res = await makeRequest(
        `http://localhost:${SI_LOCALSTACK_SERVER_PORT}/si_events/missing`,
      );

      expect(res.statusCode).toBe(404);
      expect(res.data).toContain('Handler for SI_EVENTS not registered');
    });

    it('returns 404 when the request has no route segment', async () => {
      const res = await makeRequest(`http://localhost:${SI_LOCALSTACK_SERVER_PORT}/`);

      expect(res.statusCode).toBe(404);
      expect(res.data).toContain('Route not found');
    });

    it('returns 204 when a handler has no response', async () => {
      handlers.push({ kind: RouteKind.SI_EVENTS, handler: async () => undefined });
      const res = await makeRequest(`http://localhost:${SI_LOCALSTACK_SERVER_PORT}/si_events/`);

      expect(res.statusCode).toBe(204);
    });

    it('returns 500 when a handler throws', async () => {
      handlers.push({
        kind: RouteKind.SI_WEBSITE_BUCKETS,
        handler: async () => {
          throw new Error('boom');
        },
      });
      const res = await makeRequest(
        `http://localhost:${SI_LOCALSTACK_SERVER_PORT}/si_website_buckets/`,
      );

      expect(res.statusCode).toBe(500);
      expect(res.data).toContain('Local gateway failure');
    });

    it('does not start a second server when one is already running', async () => {
      await expect(servLocal(handlers, iac)).resolves.toBeUndefined();
    });
  });

  describe('Raw HTML responses', () => {
    it('should pass through raw HTML without JSON wrapping', async () => {
      const res = await makeRequest(`http://localhost:${SI_LOCALSTACK_SERVER_PORT}/si_buckets/`);

      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toBe('text/html; charset=utf-8');
      expect(res.data).toBe('<!DOCTYPE html><html><body><h1>Hello</h1></body></html>');
    });

    it('should send HTML as text/html, not application/json', async () => {
      const res = await makeRequest(`http://localhost:${SI_LOCALSTACK_SERVER_PORT}/si_buckets/`);

      expect(res.headers['content-type']).toBe('text/html; charset=utf-8');
      expect(res.data.startsWith('<!DOCTYPE html>')).toBe(true);
    });

    it('should not wrap HTML body in JSON string quotes', async () => {
      const res = await makeRequest(`http://localhost:${SI_LOCALSTACK_SERVER_PORT}/si_buckets/`);

      expect(res.data.charAt(0)).toBe('<');
      expect(res.data.charAt(0)).not.toBe('"');
      expect(res.data.charAt(0)).not.toBe('{');
    });
  });
});
