import { eventsHandler } from '../../../src/stack/localStack';
import { oneFcOneGatewayIac } from '../../fixtures/deploy-fixtures';
import { ParsedRequest } from '../../../src/types/localStack';
import http from 'node:http';

describe('eventsHandler', () => {
  const mockRequest = (method = 'GET'): http.IncomingMessage =>
    ({
      method,
      url: '/api/hello',
    }) as http.IncomingMessage;

  const parsedBase: ParsedRequest = {
    kind: undefined as unknown as ParsedRequest['kind'],
    identifier: 'gateway_event',
    url: '/api/hello',
    method: 'GET',
    query: {},
    rawUrl: '/si_events/gateway_event/api/hello',
  };

  it('returns 404 when event missing', async () => {
    const res = await eventsHandler(
      mockRequest(),
      { ...parsedBase, identifier: 'missing' },
      oneFcOneGatewayIac,
    );

    expect(res?.statusCode).toBe(404);
    expect(res?.body).toEqual({ error: 'API Gateway event not found', event: 'missing' });
  });

  it('returns 404 when trigger not matched', async () => {
    const res = await eventsHandler(
      mockRequest(),
      { ...parsedBase, url: '/api/unknown' },
      oneFcOneGatewayIac,
    );

    expect(res?.statusCode).toBe(404);
    expect(res?.body).toEqual({ error: 'No matching trigger found' });
  });

  it('delegates to backend function when trigger matched', async () => {
    const res = await eventsHandler(mockRequest('POST'), parsedBase, oneFcOneGatewayIac);

    expect(res?.statusCode).toBe(200);
    expect(res?.body).toMatchObject({
      message: 'Function hello-fn invoked successfully',
      functionKey: 'hello_fn',
      method: 'POST',
    });
  });
});
