import { IncomingMessage, validateHeaderName, validateHeaderValue } from 'node:http';
import { TextDecoder } from 'node:util';
import { buffer } from 'node:stream/consumers';
import { lang } from '../../lang';
import { LocalHttpAdapter } from '../../types/localStack';
import { createLocalHttpError } from './httpError';

export const createVolcengineContext = (requestId: string) => ({ requestId });

const readUtf8Body = async (req: IncomingMessage): Promise<string> => {
  const body = await buffer(req);
  try {
    return new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(body);
  } catch {
    throw createLocalHttpError(415, lang.__('LOCAL_VOLCENGINE_BINARY_UNSUPPORTED'));
  }
};

const invalidResponse = (): never => {
  throw createLocalHttpError(502, lang.__('LOCAL_VOLCENGINE_INVALID_RESPONSE'));
};

export const volcengineHttpAdapter: LocalHttpAdapter = {
  validate: (fn) => {
    if (fn.container || !fn.code || !['node14/v1', 'node20/v1'].includes(fn.code.runtime)) {
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
      body: await readUtf8Body(req),
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
