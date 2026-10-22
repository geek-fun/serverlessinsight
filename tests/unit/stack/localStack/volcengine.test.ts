import { IncomingMessage } from 'node:http';
import { Readable } from 'node:stream';
import fs from 'node:fs';
import { ProviderEnum } from '../../../../src/common';
import { EventTypes, FunctionDomain, ServerlessIac } from '../../../../src/types';
import { ParsedRequest, RouteKind } from '../../../../src/types/localStack';
import { functionsHandler } from '../../../../src/stack/localStack/function';
import { eventsHandler } from '../../../../src/stack/localStack/event';
import { getLocalHttpAdapter } from '../../../../src/stack/localStack/httpAdapter';
import { volcengineHttpAdapter } from '../../../../src/stack/localStack/volcengine';
import { invokeFunction } from '../../../../src/stack/localStack/functionRunner';
import { resolveCodeDir } from '../../../../src/stack/localStack/utils';

jest.mock('../../../../src/stack/localStack/functionRunner', () => ({ invokeFunction: jest.fn() }));
jest.mock('../../../../src/stack/localStack/utils', () => ({ resolveCodeDir: jest.fn() }));
jest.mock('node:fs', () => ({ existsSync: jest.fn(), rmSync: jest.fn() }));
jest.mock('../../../../src/common', () => ({
  ProviderEnum: jest.requireActual('../../../../src/common/providerEnum').ProviderEnum,
  readRequestBody: jest.fn(),
  getIacDefinition: jest.fn((iac: ServerlessIac) => iac.functions?.[0]),
  isFunctionDomain: jest.fn(() => true),
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

const fn: FunctionDomain = {
  key: 'echo',
  name: 'local-vefaas-echo',
  storage: {},
  code: { runtime: 'node20/v1', handler: 'index.handler', path: './code.zip' },
  environment: { LOCAL_STAGE: 'test' },
};
const iac: ServerlessIac = {
  version: '0.1.0',
  app: 'local-app',
  service: 'local-service',
  provider: { name: ProviderEnum.VOLCENGINE, region: 'cn-beijing' },
  functions: [fn],
  events: [
    {
      key: 'api',
      name: 'local-api',
      type: EventTypes.API_GATEWAY,
      triggers: [{ method: 'ANY', path: '/echo', backend: '${functions.echo}' }],
    },
  ],
};
const parsed: ParsedRequest = {
  kind: RouteKind.SI_FUNCTIONS,
  identifier: 'echo',
  url: '/echo',
  method: 'GET',
  query: { q: 'snow 雪' },
  rawUrl: '/si_functions/echo/echo',
};
const request = (body: string | Buffer = '') =>
  Object.assign(Readable.from([body]), {
    headers: { 'x-test': 'hello', 'content-type': 'text/plain', 'x-faas-request-id': 'untrusted' },
    method: parsed.method,
  }) as unknown as IncomingMessage;
const mockInvoke = jest.mocked(invokeFunction);
const mockResolve = jest.mocked(resolveCodeDir);

describe('veFaaS HTTP invocation contract', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockResolve.mockResolvedValue({ codeDir: '/tmp/vefaas', tempDir: null });
    mockInvoke.mockResolvedValue({
      statusCode: 207,
      headers: { 'Content-Type': 'text/plain', 'X-Test': 'response' },
      body: 'raw response',
    });
  });

  it.each(['', '{"hello":"world"}', 'plain text, not JSON', '\uFEFF雪', 'a\u0000b'])(
    'preserves the UTF-8 request body %j and exposes only veFaaS context',
    async (body) => {
      const response = await functionsHandler(request(body), parsed, iac, 'local-request');
      expect(mockInvoke).toHaveBeenCalledWith(
        expect.objectContaining({
          timeout: 3000,
          codeDir: '/tmp/vefaas',
          handler: 'index.handler',
        }),
        { LOCAL_STAGE: 'test' },
        {
          httpMethod: 'GET',
          path: '/echo',
          pathParameters: {},
          queryStringParameters: parsed.query,
          headers: expect.objectContaining({
            'x-test': 'hello',
            'x-faas-request-id': 'local-request',
          }),
          body,
        },
        { requestId: 'local-request' },
      );
      expect(response).toEqual({
        statusCode: 207,
        headers: { 'content-type': 'text/plain', 'x-test': 'response' },
        body: 'raw response',
      });
    },
  );

  it('preserves a multibyte character split across request chunks', async () => {
    const bytes = Buffer.from('雪');
    const req = Object.assign(Readable.from([bytes.subarray(0, 1), bytes.subarray(1)]), {
      headers: {},
    }) as IncomingMessage;
    await functionsHandler(req, parsed, iac);
    expect(mockInvoke.mock.calls[0][2]).toMatchObject({ body: '雪' });
  });

  it('rejects non-UTF-8 binary requests before invoking a worker', async () => {
    const response = await functionsHandler(request(Buffer.from([0xff, 0x80, 0x00])), parsed, iac);
    expect(response).toMatchObject({
      statusCode: 415,
      body: { message: expect.stringContaining('UTF-8') },
    });
    expect(mockInvoke).not.toHaveBeenCalled();
  });

  it('propagates request stream errors as local execution failures', async () => {
    const req = request();
    req.destroy(new Error('request interrupted'));
    expect(await functionsHandler(req, parsed, iac)).toMatchObject({
      statusCode: 500,
      body: { message: 'request interrupted' },
    });
  });

  it.each(['node14/v1', 'node20/v1'])('accepts code runtime %s', (runtime) => {
    expect(() =>
      volcengineHttpAdapter.validate({ ...fn, code: { ...fn.code!, runtime } }),
    ).not.toThrow();
  });

  it.each(['python3.12/v1', 'native/v1', 'nodeprime14/v1', 'nodejs20'])(
    'reports unsupported runtime %s without invoking another provider',
    async (runtime) => {
      const response = await functionsHandler(request(), parsed, {
        ...iac,
        functions: [{ ...fn, code: { ...fn.code!, runtime } }],
      });
      expect(response.statusCode).toBe(501);
      expect(mockResolve).not.toHaveBeenCalled();
      expect(mockInvoke).not.toHaveBeenCalled();
    },
  );

  it('reports unsupported container and missing code modes', async () => {
    const containerFn = {
      ...fn,
      code: undefined,
      container: { image: 'local/example', port: 8080 },
    };
    expect(
      (await functionsHandler(request(), parsed, { ...iac, functions: [containerFn] })).statusCode,
    ).toBe(501);
    expect(
      (
        await functionsHandler(request(), parsed, {
          ...iac,
          functions: [{ ...fn, code: undefined }],
        })
      ).statusCode,
    ).toBe(501);
    expect(mockInvoke).not.toHaveBeenCalled();
  });

  it('does not fall back for an unknown provider', async () => {
    const provider = 'unknown' as ProviderEnum;
    expect(() => getLocalHttpAdapter(provider)).toThrow('not supported');
    expect(
      (
        await functionsHandler(request(), parsed, {
          ...iac,
          provider: { ...iac.provider, name: provider },
        })
      ).statusCode,
    ).toBe(501);
  });

  it.each([new Error('handler exception'), 'thrown string'])(
    'returns 500 and cleans up extracted code after %p',
    async (error) => {
      mockResolve.mockResolvedValue({ codeDir: '/tmp/vefaas', tempDir: '/tmp/vefaas' });
      jest.mocked(fs.existsSync).mockReturnValue(true);
      mockInvoke.mockRejectedValue(error);
      expect(await functionsHandler(request(), parsed, iac)).toMatchObject({
        statusCode: 500,
        body: { error: 'Function execution failed' },
      });
      expect(fs.rmSync).toHaveBeenCalledWith('/tmp/vefaas', { recursive: true, force: true });
    },
  );

  it('does not remove an extraction directory that has already gone', async () => {
    mockResolve.mockResolvedValue({ codeDir: '/tmp/vefaas', tempDir: '/tmp/vefaas' });
    jest.mocked(fs.existsSync).mockReturnValue(false);
    await functionsHandler(request(), parsed, iac);
    expect(fs.rmSync).not.toHaveBeenCalled();
  });

  it('reports missing functions', async () => {
    expect(
      (await functionsHandler(request(), parsed, { ...iac, functions: undefined })).statusCode,
    ).toBe(404);
  });

  it('uses the same adapter through an API Gateway route', async () => {
    const response = await eventsHandler(
      request('POST body'),
      { ...parsed, kind: RouteKind.SI_EVENTS, identifier: 'api', method: 'POST' },
      iac,
    );
    expect(response).toMatchObject({ statusCode: 207, body: 'raw response' });
    expect(mockInvoke.mock.calls[0][2]).toMatchObject({
      httpMethod: 'POST',
      path: '/echo',
      body: 'POST body',
    });
    const context = mockInvoke.mock.calls[0][3] as { requestId: string };
    expect(Object.keys(context)).toEqual(['requestId']);
    expect(context.requestId).toMatch(/^[\da-f-]{36}$/);
    expect(mockInvoke.mock.calls[0][2]).toMatchObject({
      headers: { 'x-faas-request-id': context.requestId },
    });
  });

  it.each(['/echo/extra', '/echo/', '/missing'])(
    'does not prefix-match exact route %s',
    async (url) => {
      expect(
        (await eventsHandler(request(), { ...parsed, identifier: 'api', url }, iac))?.statusCode,
      ).toBe(404);
      expect(mockInvoke).not.toHaveBeenCalled();
    },
  );

  it('requires a matching method for a non-ANY route', async () => {
    const getOnly = {
      ...iac,
      events: [
        {
          ...iac.events![0],
          triggers: [{ method: 'GET', path: '/echo', backend: '${functions.echo}' }],
        },
      ],
    };
    expect(
      (await eventsHandler(request(), { ...parsed, identifier: 'api', method: 'POST' }, getOnly))
        ?.statusCode,
    ).toBe(404);
  });

  it('rejects other event trigger modes explicitly', async () => {
    const other = { ...iac, events: [{ ...iac.events![0], type: 'OTHER' as EventTypes }] };
    expect(
      (await eventsHandler(request(), { ...parsed, identifier: 'api' }, other))?.statusCode,
    ).toBe(501);
  });
});

describe('veFaaS HTTP response contract', () => {
  it.each([undefined, null, {}])('defaults omitted response fields for %p', (response) => {
    expect(volcengineHttpAdapter.transformResponse(response)).toMatchObject({
      statusCode: 200,
      body: '',
    });
  });

  it('ignores non-contract fields instead of exposing them in a nested object', () => {
    expect(
      volcengineHttpAdapter.transformResponse({
        body: 'hello',
        internal: 'hidden',
        isBase64Encoded: true,
      }),
    ).toEqual({ statusCode: 200, headers: { 'content-type': 'application/json' }, body: 'hello' });
  });

  it.each([
    'hello',
    [],
    42,
    { statusCode: '201' },
    { statusCode: 199 },
    { statusCode: 600 },
    { statusCode: 200.5 },
    { body: {} },
    { body: Buffer.from([0xff]) },
    { headers: null },
    { headers: [] },
    { headers: 'bad' },
    { headers: { test: 3 } },
    { headers: { 'invalid header': 'value' } },
    { headers: { test: 'bad\r\nvalue' } },
  ])('rejects malformed response %p with 502', (response) => {
    expect(() => volcengineHttpAdapter.transformResponse(response)).toThrow(
      expect.objectContaining({ statusCode: 502 }),
    );
  });
});
