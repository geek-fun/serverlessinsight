import { IncomingMessage } from 'node:http';
import { Readable } from 'node:stream';
import { ProviderEnum } from '../../../../src/common';
import { EventTypes, FunctionDomain, ServerlessIac } from '../../../../src/types';
import { ParsedRequest, RouteKind } from '../../../../src/types/localStack';
import { functionsHandler } from '../../../../src/stack/localStack/function';
import { eventsHandler } from '../../../../src/stack/localStack/event';
import { scfHttpAdapter, transformScfResponse } from '../../../../src/stack/localStack/tencent';
import { invokeFunction } from '../../../../src/stack/localStack/functionRunner';
import { resolveCodeDir } from '../../../../src/stack/localStack/utils';

jest.mock('../../../../src/stack/localStack/functionRunner', () => ({ invokeFunction: jest.fn() }));
jest.mock('../../../../src/stack/localStack/utils', () => ({ resolveCodeDir: jest.fn() }));
jest.mock('../../../../src/common', () => ({
  ProviderEnum: jest.requireActual('../../../../src/common/providerEnum').ProviderEnum,
  readRequestBody: jest.fn(),
  getIacDefinition: jest.fn((iac: ServerlessIac) => iac.functions?.[0]),
  isFunctionDomain: jest.fn(() => true),
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

const fn: FunctionDomain = {
  key: 'echo',
  name: 'local-scf-echo',
  storage: {},
  code: { runtime: 'nodejs18', handler: 'index.handler', path: 'tests/fixtures/tencent-local' },
  triggers: { http: { auth_type: 'public' } },
  environment: { LOCAL_STAGE: 'preview' },
};
const iac: ServerlessIac = {
  version: '0.1.0',
  app: 'local-scf',
  service: 'contract',
  provider: { name: ProviderEnum.TENCENT, region: 'ap-guangzhou' },
  functions: [fn],
};
const parsed: ParsedRequest = {
  kind: RouteKind.SI_FUNCTIONS,
  identifier: 'echo',
  url: '/echo',
  method: 'GET',
  query: { q: 'snow 雪', tag: 'last' },
  rawUrl: '/si_functions/echo/echo',
};
const request = (body: string | Buffer = '') =>
  Object.assign(Readable.from([body]), {
    headers: { 'x-test': 'hello', 'x-scf-remote-addr': 'spoofed', 'content-type': 'text/plain' },
    method: parsed.method,
  }) as unknown as IncomingMessage;

const scfContext = {
  memory_limit_in_mb: 128,
  time_limit_in_ms: 3000,
  request_id: 'local-request',
  environment: '{"SCF_NAMESPACE":"default"}',
  environ: 'SCF_NAMESPACE=default;SCF_NAMESPACE=default',
  function_version: '$LATEST',
  function_name: 'local-scf-echo',
  namespace: 'default',
  tencentcloud_region: 'ap-guangzhou',
  tencentcloud_appid: '1250000000',
  tencentcloud_uin: '100000000000',
};

const mockInvoke = jest.mocked(invokeFunction);
const mockResolve = jest.mocked(resolveCodeDir);

describe('SCF HTTP invocation contract', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockResolve.mockResolvedValue({ codeDir: '/tmp/scf', tempDir: null });
    mockInvoke.mockResolvedValue({
      statusCode: 207,
      headers: { 'Content-Type': 'application/json', 'X-Local-Contract': 'scf' },
      body: 'raw response',
    });
  });

  it.each(['', '{"hello":"world"}', 'plain text, not JSON', '雪'])(
    'delivers the function-URL event with body %j and the SCF context',
    async (body) => {
      const response = await functionsHandler(request(body), parsed, iac, 'local-request');

      expect(mockInvoke).toHaveBeenCalledWith(
        expect.objectContaining({ codeDir: '/tmp/scf', handler: 'index.handler', timeout: 3000 }),
        { LOCAL_STAGE: 'preview' },
        {
          body,
          headers: expect.objectContaining({
            'x-test': 'hello',
            'x-scf-remote-addr': '127.0.0.1',
          }),
          httpMethod: 'GET',
          path: '/echo',
          queryString: { q: 'snow 雪', tag: 'last' },
        },
        scfContext,
      );
      expect(Object.keys(mockInvoke.mock.calls[0][2] as object)).toEqual([
        'body',
        'headers',
        'httpMethod',
        'path',
        'queryString',
      ]);
      expect(response).toEqual({
        statusCode: 207,
        headers: { 'content-type': 'application/json', 'x-local-contract': 'scf' },
        body: 'raw response',
      });
    },
  );

  it('generates a hyphenated SCF request id and defaults the region', async () => {
    await functionsHandler(request(), parsed, {
      ...iac,
      provider: { name: ProviderEnum.TENCENT, region: '' },
    });
    const context = mockInvoke.mock.calls[0][3] as Record<string, unknown>;
    expect(context.request_id).toMatch(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/);
    expect(context.tencentcloud_region).toBe('ap-guangzhou');
  });

  it('reflects configured memory, timeout and region overrides', async () => {
    await functionsHandler(
      request(),
      parsed,
      {
        ...iac,
        provider: { name: ProviderEnum.TENCENT, region: 'ap-shanghai' },
        functions: [{ ...fn, memory: 512, timeout: 10 }],
      },
      'local-request',
    );
    expect(mockInvoke.mock.calls[0][3]).toMatchObject({
      memory_limit_in_mb: 512,
      time_limit_in_ms: 10000,
      tencentcloud_region: 'ap-shanghai',
    });
  });

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

  it('overrides a client-supplied remote address header', async () => {
    await functionsHandler(request(), parsed, iac, 'local-request');
    const event = mockInvoke.mock.calls[0][2] as { headers: Record<string, string> };
    expect(event.headers['x-scf-remote-addr']).toBe('127.0.0.1');
  });

  it.each(['nodejs10', 'nodejs12', 'nodejs14', 'nodejs16', 'nodejs18'])(
    'accepts code runtime %s',
    (runtime) => {
      expect(() =>
        scfHttpAdapter.validate({ ...fn, code: { ...fn.code!, runtime } }),
      ).not.toThrow();
    },
  );

  it.each(['nodejs20', 'python3.6', 'python3.10', 'java8', 'php7.2', 'go1', 'Nodejs18.15'])(
    'reports unsupported runtime %s without falling back to another provider',
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
    const containerFn = { ...fn, code: undefined, container: { image: 'local/svc', port: 8080 } };
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

  it('propagates request stream errors as local execution failures', async () => {
    const req = request();
    req.destroy(new Error('request interrupted'));
    expect(await functionsHandler(req, parsed, iac)).toMatchObject({
      statusCode: 500,
      body: { message: 'request interrupted' },
    });
  });

  it('reports missing functions', async () => {
    expect(
      (await functionsHandler(request(), parsed, { ...iac, functions: undefined })).statusCode,
    ).toBe(404);
  });

  it('reports API Gateway events as unsupported instead of simulating a gateway', async () => {
    const response = await eventsHandler(
      request(),
      { ...parsed, kind: RouteKind.SI_EVENTS, identifier: 'api' },
      {
        ...iac,
        events: [
          {
            key: 'api',
            name: 'local-scf-api',
            type: EventTypes.API_GATEWAY,
            triggers: [{ method: 'ANY', path: '/echo', backend: '${functions.echo}' }],
          },
        ],
      },
    );
    expect(response?.statusCode).toBe(501);
    expect(mockInvoke).not.toHaveBeenCalled();
  });
});

describe('SCF HTTP response contract', () => {
  it('uses a function-URL envelope with lowercased headers', () => {
    expect(
      scfHttpAdapter.transformResponse({
        statusCode: 201,
        headers: { 'Content-Type': 'text/plain', 'X-Test': 'response' },
        body: 'body text',
      }),
    ).toEqual({
      statusCode: 201,
      headers: { 'content-type': 'text/plain', 'x-test': 'response' },
      body: 'body text',
    });
  });

  it.each([undefined, null])('defaults an omitted return value for %p', (result) => {
    expect(scfHttpAdapter.transformResponse(result)).toEqual({
      statusCode: 200,
      headers: { 'content-type': 'application/json' },
      body: '',
    });
  });

  it('passes a string response through with SCF format inference', () => {
    expect(scfHttpAdapter.transformResponse('Hello, world!')).toEqual({
      statusCode: 200,
      headers: { 'content-type': 'application/json' },
      body: 'Hello, world!',
    });
  });

  it.each([[{ message: 'Hello, world!' }], [['a', 'b']]])(
    'infers JSON for a value without statusCode: %p',
    (result) => {
      expect(scfHttpAdapter.transformResponse(result)).toEqual({
        statusCode: 200,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(result),
      });
    },
  );

  it.each([
    42,
    true,
    { statusCode: '201' },
    { statusCode: 199 },
    { statusCode: 600 },
    { statusCode: 200.5 },
    { statusCode: 200, body: {} },
    { statusCode: 200, body: Buffer.from([0xff]) },
    { statusCode: 200, headers: null },
    { statusCode: 200, headers: 'bad' },
    { statusCode: 200, headers: { test: 3 } },
    { statusCode: 200, headers: { 'invalid header': 'value' } },
    { statusCode: 200, headers: { test: 'bad\r\nvalue' } },
  ])('rejects malformed response %p with 502', (result) => {
    expect(() => transformScfResponse(result)).toThrow(
      expect.objectContaining({ statusCode: 502 }),
    );
  });

  it('refuses a base64 binary response envelope', () => {
    expect(() => transformScfResponse({ isBase64Encoded: true, body: 'AA==' })).toThrow(
      expect.objectContaining({ statusCode: 501 }),
    );
  });
});
