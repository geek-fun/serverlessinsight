import { ProviderEnum, readRequestBody } from '../../common';
import { lang } from '../../lang';
import { LocalHttpAdapter, RouteKind } from '../../types/localStack';
import {
  createAliyunContextSerializable,
  transformFCResponse,
  transformToAliyunEvent,
} from './aliyunFc';
import { volcengineHttpAdapter } from './volcengine';
import { createLocalHttpError } from './httpError';

const aliyunHttpAdapter: LocalHttpAdapter = {
  validate: () => undefined,
  buildInvocation: async (req, parsed, iac, fn, requestId) => ({
    event: (await transformToAliyunEvent(req, parsed.url, parsed.query)).event,
    context: createAliyunContextSerializable(
      iac,
      fn.name,
      fn.code!.handler,
      fn.memory ?? 128,
      fn.timeout ?? 3,
      requestId,
    ),
    env: { ...fn.environment },
  }),
  transformResponse: (result, kind) =>
    result || kind === RouteKind.SI_EVENTS
      ? transformFCResponse(result)
      : { statusCode: 200, body: result },
};

const legacyLambdaHttpAdapter: LocalHttpAdapter = {
  validate: () => undefined,
  buildInvocation: async (req, _parsed, iac, fn) => {
    const rawBody = await readRequestBody(req);
    return {
      event: rawBody ? JSON.parse(rawBody) : {},
      env: {
        ...fn.environment,
        AWS_REGION: iac.provider.region || 'us-east-1',
        FUNCTION_NAME: fn.name,
        FUNCTION_MEMORY_SIZE: String(fn.memory),
        FUNCTION_TIMEOUT: String(fn.timeout),
      },
      context: {
        functionName: fn.name,
        functionVersion: '$LATEST',
        memoryLimitInMB: fn.memory,
        logGroupName: `/aws/lambda/${fn.name}`,
        logStreamName: `${new Date().toISOString().split('T')[0]}/[$LATEST]${Math.random().toString(36).substring(7)}`,
        invokedFunctionArn: `arn:aws:lambda:${iac.provider.region}:000000000000:function:${fn.name}`,
        awsRequestId: Math.random().toString(36).substring(2, 15),
      },
    };
  },
  transformResponse: (result) => ({ statusCode: 200, body: result }),
};

const httpAdapters: Record<ProviderEnum, LocalHttpAdapter> = {
  [ProviderEnum.ALIYUN]: aliyunHttpAdapter,
  [ProviderEnum.VOLCENGINE]: volcengineHttpAdapter,
  [ProviderEnum.AWS]: legacyLambdaHttpAdapter,
  [ProviderEnum.TENCENT]: legacyLambdaHttpAdapter,
  [ProviderEnum.HUAWEI]: legacyLambdaHttpAdapter,
};

export const getLocalHttpAdapter = (provider: ProviderEnum): LocalHttpAdapter => {
  const adapter = Object.hasOwn(httpAdapters, provider) ? httpAdapters[provider] : undefined;
  if (!adapter) {
    throw createLocalHttpError(501, lang.__('LOCAL_HTTP_PROVIDER_UNSUPPORTED', { provider }));
  }
  return adapter;
};
