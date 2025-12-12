import { functionsHandler } from '../../../src/stack/localStack/function';
import { oneFcIac } from '../../fixtures/deploy-fixtures/oneFc';
import { ParsedRequest } from '../../../src/types/localStack';
import http from 'node:http';

describe('functionsHandler', () => {
  const mockRequest = (method = 'GET'): http.IncomingMessage =>
    ({
      method,
    }) as http.IncomingMessage;

  const baseParsed: ParsedRequest = {
    kind: undefined as unknown as ParsedRequest['kind'],
    identifier: 'hello_fn',
    url: '/',
    method: 'GET',
    query: {},
    rawUrl: '/',
  };

  it('returns 404 when function missing', () => {
    const res = functionsHandler(mockRequest(), { ...baseParsed, identifier: 'missing' }, oneFcIac);

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: 'Function not found', functionKey: 'missing' });
  });

  it('returns 200 when function exists', () => {
    const res = functionsHandler(mockRequest('POST'), baseParsed, oneFcIac);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      message: 'Function hello-fn invoked successfully',
      functionKey: 'hello_fn',
      method: 'POST',
      path: '/',
    });
  });
});
