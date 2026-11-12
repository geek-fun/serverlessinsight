import { IncomingMessage } from 'node:http';
import { ProviderEnum, readRequestBody } from '../../../../src/common';
import { FunctionDomain, ServerlessIac } from '../../../../src/types';
import { ParsedRequest, RouteKind } from '../../../../src/types/localStack';
import { getLocalHttpAdapter } from '../../../../src/stack/localStack/httpAdapter';

jest.mock('../../../../src/common', () => ({
  ProviderEnum: jest.requireActual('../../../../src/common/providerEnum').ProviderEnum,
  readRequestBody: jest.fn(),
}));

const fn: FunctionDomain = {
  key: 'echo',
  name: 'echo-function',
  storage: {},
  code: { runtime: 'nodejs18', handler: 'index.handler', path: './code' },
  environment: { TEST_VARIABLE: 'configured' },
};
const iac = {
  app: 'adapter-test',
  provider: { name: ProviderEnum.ALIYUN, region: 'cn-hangzhou' },
} as ServerlessIac;
const parsed = { method: 'GET', url: '/echo', query: { test: '1' } } as unknown as ParsedRequest;
const req = {
  method: 'GET',
  headers: { host: 'localhost:4567', 'x-custom': 'kept' },
  socket: { remoteAddress: '127.0.0.1' },
} as unknown as IncomingMessage;

beforeEach(() => jest.clearAllMocks());

it.each(['unknown', '__proto__', 'toString'])(
  'rejects unsupported provider %s explicitly',
  (provider) => {
    expect(() => getLocalHttpAdapter(provider as ProviderEnum)).toThrow(
      expect.objectContaining({ statusCode: 501 }),
    );
  },
);

it('keeps Aliyun Buffer events, context, environment and default limits', async () => {
  const adapter = getLocalHttpAdapter(ProviderEnum.ALIYUN);
  expect(() => adapter.validate(fn)).not.toThrow();
  const invocation = await adapter.buildInvocation(req, parsed, iac, fn, 'request');
  expect(Buffer.isBuffer(invocation.event)).toBe(true);
  const event = JSON.parse((invocation.event as Buffer).toString());
  expect(event).toMatchObject({
    path: '/echo',
    httpMethod: 'GET',
    queryParameters: { test: '1' },
    pathParameters: {},
    requestContext: { stage: 'default', requestId: 'request' },
  });
  expect(event.headers).toMatchObject({
    host: 'adapter-test-default.si-local.gateway',
    'x-custom': 'kept',
    'x-forwarded-for': '127.0.0.1',
    'x-ca-request-id': 'request',
  });
  expect(invocation.context).toMatchObject({
    requestId: 'request',
    function: { name: 'echo-function', handler: 'index.handler', memory: 128, timeout: 3 },
  });
  expect(invocation.env).toEqual(fn.environment);
  await adapter.buildInvocation(req, parsed, iac, { ...fn, memory: 256, timeout: 10 }, 'custom');
});

it('keeps Aliyun response translation for gateway envelopes and falsy return values', () => {
  const adapter = getLocalHttpAdapter(ProviderEnum.ALIYUN);
  expect(adapter.transformResponse({ statusCode: 202, body: 'plain text' })).toEqual({
    statusCode: 202,
    headers: {},
    body: 'plain text',
  });
  expect(adapter.transformResponse(null, RouteKind.SI_EVENTS)).toEqual({
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: null,
  });
  expect(adapter.transformResponse(null, RouteKind.SI_FUNCTIONS)).toEqual({
    statusCode: 200,
    body: null,
  });
});

it('routes Tencent to the SCF adapter instead of the generic fallback', () => {
  const adapter = getLocalHttpAdapter(ProviderEnum.TENCENT);
  expect(adapter).not.toBe(getLocalHttpAdapter(ProviderEnum.AWS));
  expect(() => adapter.validate(fn)).not.toThrow();
  expect(() => adapter.validate({ ...fn, code: { ...fn.code!, runtime: 'go1' } })).toThrow(
    expect.objectContaining({ statusCode: 501 }),
  );
  expect(adapter.transformResponse('hello')).toEqual({
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: 'hello',
  });
});

it.each([ProviderEnum.AWS, ProviderEnum.HUAWEI])(
  'preserves explicitly registered generic execution for %s',
  async (provider) => {
    jest.mocked(readRequestBody).mockResolvedValue('{"legacy":true}');
    const adapter = getLocalHttpAdapter(provider);
    expect(() => adapter.validate(fn)).not.toThrow();
    const invocation = await adapter.buildInvocation(req, parsed, iac, fn, 'request');
    expect(invocation.event).toEqual({ legacy: true });
    expect(invocation.env).toMatchObject({
      TEST_VARIABLE: 'configured',
      AWS_REGION: 'cn-hangzhou',
    });
    expect(invocation.context).toMatchObject({
      functionName: fn.name,
      invokedFunctionArn: expect.stringContaining('arn:aws:lambda:cn-hangzhou:'),
    });
    expect(adapter.transformResponse({ raw: true })).toEqual({
      statusCode: 200,
      body: { raw: true },
    });
  },
);

it('preserves legacy defaults for empty payloads and regions and rejects invalid JSON', async () => {
  const adapter = getLocalHttpAdapter(ProviderEnum.AWS);
  jest.mocked(readRequestBody).mockResolvedValue('');
  const invocation = await adapter.buildInvocation(
    req,
    parsed,
    { ...iac, provider: { ...iac.provider, region: '' } },
    fn,
    'request',
  );
  expect(invocation.event).toEqual({});
  expect(invocation.env.AWS_REGION).toBe('us-east-1');
  jest.mocked(readRequestBody).mockResolvedValue('not JSON');
  await expect(adapter.buildInvocation(req, parsed, iac, fn, 'request')).rejects.toThrow();
});
