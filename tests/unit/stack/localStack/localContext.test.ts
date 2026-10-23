import { ProviderEnum } from '../../../../src/common';
import { FunctionDomain, ServerlessIac } from '../../../../src/types';
import { buildLocalContext } from '../../../../src/stack/localStack/localContext';

const fn: FunctionDomain = {
  key: 'fn',
  name: 'fn-name',
  storage: {},
  code: { runtime: 'nodejs18', handler: 'index.handler', path: '/code' },
  memory: 256,
  timeout: 9,
};

const iac = (provider: ProviderEnum): ServerlessIac =>
  ({
    version: '0.0.1',
    app: 'app',
    service: 'svc',
    provider: { name: provider, region: 'ap-guangzhou' },
    functions: [fn],
  }) as ServerlessIac;

describe('buildLocalContext', () => {
  it('keeps the Aliyun FC context for Aliyun', () => {
    const context = buildLocalContext(
      ProviderEnum.ALIYUN,
      iac(ProviderEnum.ALIYUN),
      fn,
      'req-1',
    ) as Record<string, unknown>;
    expect(context).toMatchObject({ requestId: 'req-1' });
    expect(context).toHaveProperty('service.logProject');
    expect(context).toHaveProperty('credentials.accessKeyId');
  });

  it('tolerates a function without a code block for Aliyun', () => {
    const context = buildLocalContext(
      ProviderEnum.ALIYUN,
      iac(ProviderEnum.ALIYUN),
      { ...fn, code: undefined },
      'req-1',
    ) as { function: { handler: string } };
    expect(context.function.handler).toBe('');
  });

  it('uses the SCF context for Tencent', () => {
    const context = buildLocalContext(
      ProviderEnum.TENCENT,
      iac(ProviderEnum.TENCENT),
      fn,
      'req-1',
    ) as Record<string, unknown>;
    expect(context).toMatchObject({
      request_id: 'req-1',
      memory_limit_in_mb: 256,
      time_limit_in_ms: 9000,
      function_name: 'fn-name',
      tencentcloud_region: 'ap-guangzhou',
    });
    expect(context).not.toHaveProperty('requestId');
  });

  it('uses the veFaaS context for Volcengine', () => {
    expect(
      buildLocalContext(ProviderEnum.VOLCENGINE, iac(ProviderEnum.VOLCENGINE), fn, 'req-1'),
    ).toEqual({ requestId: 'req-1' });
  });

  it.each([ProviderEnum.AWS, ProviderEnum.HUAWEI])(
    'uses the generic context for %s',
    (provider) => {
      const context = buildLocalContext(provider, iac(provider), fn, 'req-1') as Record<
        string,
        unknown
      >;
      expect(context).toMatchObject({ functionName: 'fn-name', awsRequestId: 'req-1' });
    },
  );
});
