import { validateHeaderName, validateHeaderValue } from 'node:http';
import { ProviderEnum } from '../../common/providerEnum';
import { lang } from '../../lang';
import { LocalHttpAdapter } from '../../types/localStack';
import { createLocalHttpError } from './httpError';
import { isLocalNodeRuntime } from './localRuntimes';
import { readUtf8Body } from './requestBody';

export const createVolcengineContext = (requestId: string) => ({ requestId });

const invalidResponse = (): never => {
  throw createLocalHttpError(502, lang.__('LOCAL_VOLCENGINE_INVALID_RESPONSE'));
};

export const volcengineHttpAdapter: LocalHttpAdapter = {
  validate: (fn) => {
    if (fn.container || !fn.code || !isLocalNodeRuntime(ProviderEnum.VOLCENGINE, fn.code.runtime)) {
      throw createLocalHttpError(
        501,
        lang.__('LOCAL_VOLCENGINE_MODE_UNSUPPORTED', { functionName: fn.name }),
      );
    }
  },
  buildInvocation: async (req, parsed, _iac, fn, requestId) => ({
    event: {
      httpMethod: parsed.method,
      path: parsed.url,
      pathParameters: {},
      queryStringParameters: parsed.query,
      headers: { ...req.headers, 'x-faas-request-id': requestId },
      body: await readUtf8Body(req, 'LOCAL_VOLCENGINE_BINARY_UNSUPPORTED'),
    },
    context: createVolcengineContext(requestId),
    env: { ...fn.environment },
  }),
  transformResponse: (result) => {
    if (result == null) {
      return { statusCode: 200, headers: { 'content-type': 'application/json' }, body: '' };
    }
    if (typeof result !== 'object' || Array.isArray(result)) return invalidResponse();
    const { statusCode = 200, headers = {}, body = '' } = result as Record<string, unknown>;
    if (
      typeof statusCode !== 'number' ||
      !Number.isInteger(statusCode) ||
      statusCode < 200 ||
      statusCode > 599 ||
      typeof body !== 'string' ||
      !headers ||
      typeof headers !== 'object' ||
      Array.isArray(headers)
    ) {
      return invalidResponse();
    }
    const responseHeaders = Object.fromEntries(
      Object.entries(headers).map(([key, value]) => {
        if (typeof value !== 'string') return invalidResponse();
        try {
          validateHeaderName(key);
          validateHeaderValue(key, value);
        } catch {
          return invalidResponse();
        }
        return [key.toLowerCase(), value];
      }),
    );
    return {
      statusCode,
      headers: { 'content-type': 'application/json', ...responseHeaders },
      body,
    };
  },
};
