import { eventsHandler } from '../../../src/stack/localStack';
import { ParsedRequest } from '../../../src/types/localStack';
import http from 'node:http';
import { Readable } from 'node:stream';
import { setContext, getContext } from '../../../src/common';
import path from 'node:path';
import { parseYaml, revalYaml } from '../../../src/parser';

describe('eventsHandler', () => {
  const iacLocation = path.resolve(__dirname, '../../fixtures/serverless-insight.yml');
  const parsedIac = parseYaml(iacLocation);
  let iac: ReturnType<typeof revalYaml>;

  beforeAll(async () => {
    await setContext({
      stage: 'default',
      location: iacLocation,
      stages: parsedIac.stages,
    });

    const ctx = getContext();
    iac = revalYaml(iacLocation, ctx);
  });

  const mockRequest = (method = 'GET', body = ''): http.IncomingMessage => {
    const readable = new Readable();
    readable.push(body);
    readable.push(null);
    return Object.assign(readable, {
      method,
      url: '/api/hello',
      headers: {},
    }) as http.IncomingMessage;
  };

  const parsedBase: ParsedRequest = {
    kind: undefined as unknown as ParsedRequest['kind'],
    identifier: 'gateway_event',
    url: '/api/hello',
    method: 'GET',
    query: {},
    rawUrl: '/si_events/gateway_event/api/hello',
  };

  it('returns 404 when event missing', async () => {
    const res = await eventsHandler(mockRequest(), { ...parsedBase, identifier: 'missing' }, iac);

    expect(res?.statusCode).toBe(404);
    expect(res?.body).toEqual({ error: 'API Gateway event not found', event: 'missing' });
  });

  it('returns 404 when trigger not matched', async () => {
    const res = await eventsHandler(mockRequest(), { ...parsedBase, url: '/api/unknown' }, iac);

    expect(res?.statusCode).toBe(404);
    expect(res?.body).toEqual({ error: 'No matching trigger found' });
  });

  it('delegates to backend function when trigger matched', async () => {
    const res = await eventsHandler(mockRequest('POST'), parsedBase, iac);

    expect(res?.statusCode).toBe(200);
    expect(res?.body).toBe('ServerlessInsight Hello World');
  });
});
