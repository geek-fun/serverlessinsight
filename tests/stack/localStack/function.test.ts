import { functionsHandler } from '../../../src/stack/localStack/function';
import { oneFcIac } from '../../fixtures/deploy-fixtures/oneFc';
import { ParsedRequest } from '../../../src/types/localStack';
import http from 'node:http';
import { setContext } from '../../../src/common';
import path from 'node:path';
import { Readable } from 'node:stream';

describe('functionsHandler', () => {
  const iacLocation = path.resolve(__dirname, '../../fixtures/serverless-insight.yml');

  beforeAll(async () => {
    await setContext({
      stage: 'default',
      location: iacLocation,
    });
  });

  const mockRequest = (method = 'GET', body = ''): http.IncomingMessage => {
    const readable = new Readable();
    readable.push(body);
    readable.push(null);
    return Object.assign(readable, {
      method,
      headers: {},
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

  it('returns 404 when function missing', async () => {
    const res = await functionsHandler(
      mockRequest(),
      { ...baseParsed, identifier: 'missing' },
      oneFcIac,
    );

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: 'Function not found', functionKey: 'missing' });
  });

  it('returns 400 when function has no code configuration', async () => {
    const iacWithoutCode = {
      ...oneFcIac,
      functions: [
        {
          ...oneFcIac.functions![0],
          code: undefined,
        },
      ],
    };

    const res = await functionsHandler(mockRequest('POST'), baseParsed, iacWithoutCode);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      error: 'Function code configuration not found',
      functionKey: 'hello_fn',
    });
  });
});
