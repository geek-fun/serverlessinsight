import { IncomingMessage } from 'node:http';
import { ProviderEnum, readRequestBody } from '../../../../src/common';
import { FunctionDomain, ServerlessIac } from '../../../../src/types';
import { ParsedRequest, RouteKind } from '../../../../src/types/localStack';
import { getLocalHttpAdapter } from '../../../../src/stack/localStack/httpAdapter';
import {
  createAliyunContextSerializable,
  transformFCResponse,
  transformToAliyunEvent,
} from '../../../../src/stack/localStack/aliyunFc';

jest.mock('../../../../src/common', () => ({
  ProviderEnum: jest.requireActual('../../../../src/common/providerEnum').ProviderEnum,
  readRequestBody: jest.fn(),
}));
jest.mock('../../../../src/stack/localStack/aliyunFc', () => ({
  createAliyunContextSerializable: jest.fn().mockReturnValue({ requestId: 'request', service: {} }),
  transformToAliyunEvent: jest.fn().mockResolvedValue({ event: Buffer.from('FC event') }),
  transformFCResponse: jest.fn().mockReturnValue({ statusCode: 202, body: 'FC response' }),
}));

const fn: FunctionDomain = {
  key: 'echo',
  name: 'echo-function',
  storage: {},
  code: { runtime: 'nodejs18', handler: 'index.handler', path: './code' },
  environment: { TEST_VARIABLE: 'configured' },
};
const iac = { provider: { name: ProviderEnum.ALIYUN, region: 'cn-hangzhou' } } as ServerlessIac;
const parsed = { method: 'GET', url: '/echo', query: { test: '1' } } as unknown as ParsedRequest;
const req = {} as IncomingMessage;

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
  expect(await adapter.buildInvocation(req, parsed, iac, fn, 'request')).toEqual({
    event: Buffer.from('FC event'),
    context: { requestId: 'request', service: {} },
    env: fn.environment,
  });
  expect(transformToAliyunEvent).toHaveBeenCalledWith(req, '/echo', parsed.query);
  expect(createAliyunContextSerializable).toHaveBeenCalledWith(
    iac,
    fn.name,
    'index.handler',
    128,
    3,
    'request',
  );
  await adapter.buildInvocation(req, parsed, iac, { ...fn, memory: 256, timeout: 10 }, 'custom');
  expect(createAliyunContextSerializable).toHaveBeenLastCalledWith(
    iac,
    fn.name,
    'index.handler',
    256,
    10,
    'custom',
  );
});

it('keeps Aliyun response translation for gateway envelopes and falsy return values', () => {
  const adapter = getLocalHttpAdapter(ProviderEnum.ALIYUN);
  expect(adapter.transformResponse({ statusCode: 202, body: 'FC' })).toEqual({
    statusCode: 202,
    body: 'FC response',
  });
  expect(adapter.transformResponse(null, RouteKind.SI_EVENTS)).toEqual({
    statusCode: 202,
    body: 'FC response',
  });
  expect(transformFCResponse).toHaveBeenLastCalledWith(null);
  expect(adapter.transformResponse(null, RouteKind.SI_FUNCTIONS)).toEqual({
    statusCode: 200,
    body: null,
  });
});

it.each([ProviderEnum.AWS, ProviderEnum.TENCENT, ProviderEnum.HUAWEI])(
  'preserves explicitly registered legacy execution for %s',
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
