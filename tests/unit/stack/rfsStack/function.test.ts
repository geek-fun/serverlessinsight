import { resolveCode } from '../../../../src/common';
import { resolveFunction } from '../../../../src/stack/rfsStack/function';
import type { RfsStack } from '../../../../src/stack/rfsStack';
import type { Context, FunctionDomain } from '../../../../src/types';

jest.mock('../../../../src/common/iacHelper', () => ({
  resolveCode: jest.fn(),
}));

const appendHcl = jest.fn();
const stack = { appendHcl } as unknown as RfsStack;
const context = {
  stage: 'dev',
  app: 'app',
  service: 'service',
  provider: 'huaweicloud',
  region: 'cn-north-4',
  accessKeyId: 'access-key',
  accessKeySecret: 'secret-key',
  iacLocation: 'serverless.yml',
} as unknown as Context;

const functionDefinition = {
  key: 'hello',
  name: 'hello-function',
  memory: 256,
  timeout: 30,
  environment: { MODE: 'test' },
  code: { path: 'functions/hello.zip', handler: 'index.handler', runtime: 'Node.js18' },
} as unknown as FunctionDomain;

describe('resolveFunction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (resolveCode as jest.Mock).mockReturnValue('base64-code');
  });

  it('does nothing when functions are undefined', () => {
    expect(resolveFunction(stack, undefined, context, 'app-service')).toBeUndefined();
    expect(appendHcl).not.toHaveBeenCalled();
  });

  it('appends an application and function resource for each function', () => {
    const secondFunction = {
      ...functionDefinition,
      key: 'goodbye',
      name: 'goodbye-function',
      code: { ...functionDefinition.code, path: 'functions/goodbye.zip' },
    } as FunctionDomain;

    resolveFunction(stack, [functionDefinition, secondFunction], context, 'app-service');

    expect(resolveCode).toHaveBeenCalledTimes(2);
    expect(resolveCode).toHaveBeenNthCalledWith(1, 'functions/hello.zip');
    expect(resolveCode).toHaveBeenNthCalledWith(2, 'functions/goodbye.zip');
    expect(appendHcl).toHaveBeenCalledTimes(1);
    expect(appendHcl.mock.calls[0][0]).toContain('resource "huaweicloud_fgs_application"');
    expect(appendHcl.mock.calls[0][0]).toContain('resource "huaweicloud_fgs_function" "hello"');
    expect(appendHcl.mock.calls[0][0]).toContain('resource "huaweicloud_fgs_function" "goodbye"');
    expect(appendHcl.mock.calls[0][0]).toContain('environment = {"MODE":"test"}');
    expect(appendHcl.mock.calls[0][0]).toContain('func_code = "base64-code"');
  });

  it('appends only the application resource for an empty function list', () => {
    resolveFunction(stack, [], context, 'app-service');

    expect(resolveCode).not.toHaveBeenCalled();
    expect(appendHcl.mock.calls[0][0]).toContain('name = "app-service-app"');
    expect(appendHcl.mock.calls[0][0]).not.toContain('huaweicloud_fgs_function');
  });
});
