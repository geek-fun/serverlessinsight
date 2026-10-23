import { ProviderEnum, readRequestBody } from '../../common';
import { lang } from '../../lang';
import { LocalHttpAdapter, RouteKind } from '../../types/localStack';
import {
  createAliyunContextSerializable,
  transformFCResponse,
  transformToAliyunEvent,
} from './aliyunFc';
import { createLegacyContext, createLegacyEnv } from './legacyLambda';
import { scfHttpAdapter } from './tencent';
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

/**
 * Generic execution for providers without a native local HTTP simulation.
 * The request body is treated as an already-formed event object; this is a
 * low-level invocation harness, not a provider-native simulation.
 */
const genericHttpAdapter: LocalHttpAdapter = {
  validate: () => undefined,
  buildInvocation: async (req, _parsed, iac, fn, requestId) => {
    const rawBody = await readRequestBody(req);
    return {
      event: rawBody ? JSON.parse(rawBody) : {},
      env: { ...fn.environment, ...createLegacyEnv(iac, fn) },
      context: createLegacyContext(iac, fn, requestId),
    };
  },
  transformResponse: (result) => ({ statusCode: 200, body: result }),
};

const httpAdapters: Record<ProviderEnum, LocalHttpAdapter> = {
  [ProviderEnum.ALIYUN]: aliyunHttpAdapter,
  [ProviderEnum.VOLCENGINE]: volcengineHttpAdapter,
  [ProviderEnum.TENCENT]: scfHttpAdapter,
  [ProviderEnum.AWS]: genericHttpAdapter,
  [ProviderEnum.HUAWEI]: genericHttpAdapter,
};

export const getLocalHttpAdapter = (provider: ProviderEnum): LocalHttpAdapter => {
  const adapter = Object.hasOwn(httpAdapters, provider) ? httpAdapters[provider] : undefined;
  if (!adapter) {
    throw createLocalHttpError(501, lang.__('LOCAL_HTTP_PROVIDER_UNSUPPORTED', { provider }));
  }
  return adapter;
};
