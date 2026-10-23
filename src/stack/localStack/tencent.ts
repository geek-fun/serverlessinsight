import { IncomingMessage, validateHeaderName, validateHeaderValue } from 'node:http';
import { ProviderEnum } from '../../common/providerEnum';
import { lang } from '../../lang';
import { FunctionDomain, ServerlessIac } from '../../types';
import {
  LocalHttpAdapter,
  ParsedRequest,
  RouteResponse,
  ScfHttpRequestEvent,
  ScfInvocationContext,
} from '../../types/localStack';
import { createLocalHttpError } from './httpError';
import { isLocalNodeRuntime, localNodeRuntimes } from './localRuntimes';
import { readUtf8Body } from './requestBody';

/**
 * Local SCF (Tencent) HTTP simulation of the contract si deploys:
 * `functions.*.triggers.http` creates a **function URL** (an SCF HTTP trigger
 * with a NetConfig TriggerDesc), which for an event function delivers an
 * API-Gateway-compatible event and expects a response envelope.
 *
 * A Web Function — the other HTTP-triggered function type, where the URL passes
 * the raw HTTP request straight to an in-container server with no event
 * conversion — is a different contract and is not simulated.
 *
 * Account identifiers are synthetic and stable across invocations: no cloud
 * caller, CAM identity or app id exists offline.
 */
const SYNTHETIC_NAMESPACE = 'default';
const SYNTHETIC_APPID = '1250000000';
const SYNTHETIC_UIN = '100000000000';
const DEFAULT_REGION = 'ap-guangzhou';
const JSON_HEADERS = { 'content-type': 'application/json' };

const invalidResponse = (): never => {
  throw createLocalHttpError(502, lang.__('LOCAL_SCF_INVALID_RESPONSE'));
};

const remoteAddress = (req: IncomingMessage): string => {
  const address = req.socket?.remoteAddress || '127.0.0.1';
  return address === '::1' || address === '::ffff:127.0.0.1' ? '127.0.0.1' : address;
};

/** Node keeps `set-cookie` as an array; the event carries one joined string. */
const requestHeaders = (req: IncomingMessage): Record<string, string> =>
  Object.fromEntries(
    Object.entries(req.headers).map(([key, value]) => [
      key,
      Array.isArray(value) ? value.join(', ') : (value ?? ''),
    ]),
  );

export const createScfContextSerializable = (
  iac: ServerlessIac,
  fn: FunctionDomain,
  requestId: string,
): ScfInvocationContext => ({
  memory_limit_in_mb: fn.memory ?? 128,
  time_limit_in_ms: (fn.timeout ?? 3) * 1000,
  request_id: requestId,
  environment: JSON.stringify({ SCF_NAMESPACE: SYNTHETIC_NAMESPACE }),
  environ: `SCF_NAMESPACE=${SYNTHETIC_NAMESPACE};SCF_NAMESPACE=${SYNTHETIC_NAMESPACE}`,
  function_version: '$LATEST',
  function_name: fn.name,
  namespace: SYNTHETIC_NAMESPACE,
  tencentcloud_region: iac.provider.region || DEFAULT_REGION,
  tencentcloud_appid: SYNTHETIC_APPID,
  tencentcloud_uin: SYNTHETIC_UIN,
});

/**
 * The documented function-URL event: API-Gateway-compatible, minus the
 * `requestContext`, `pathParameters`, `queryStringParameters`, `headerParameters`
 * and `isBase64Encoded` fields a gateway integration request would carry.
 */
export const transformToScfEvent = async (
  req: IncomingMessage,
  parsed: ParsedRequest,
): Promise<ScfHttpRequestEvent> => ({
  body: await readUtf8Body(req, 'LOCAL_SCF_BINARY_REQUEST_UNSUPPORTED'),
  headers: { ...requestHeaders(req), 'x-scf-remote-addr': remoteAddress(req) },
  httpMethod: parsed.method,
  path: parsed.url,
  queryString: { ...parsed.query },
});

const toHeaderRecord = (value: unknown): Record<string, unknown> | undefined =>
  typeof value === 'object' && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;

const normalizeHeaders = (headers: Record<string, unknown>): Record<string, string> =>
  Object.fromEntries(
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

const serializeJson = (value: unknown): string => {
  try {
    const serialized = JSON.stringify(value);
    return typeof serialized === 'string' ? serialized : invalidResponse();
  } catch {
    return invalidResponse();
  }
};

/**
 * Translate a handler result with the function-URL response contract: an
 * explicit `{ statusCode, headers, body }` envelope is used as-is, and anything
 * else is serialized with SCF's format inference (HTTP 200 and a JSON content
 * type). No `isBase64Encoded` binary envelope is invented.
 */
export const transformScfResponse = (result: unknown): RouteResponse => {
  if (result == null) {
    return { statusCode: 200, headers: JSON_HEADERS, body: '' };
  }
  if (typeof result === 'string') {
    return { statusCode: 200, headers: JSON_HEADERS, body: result };
  }
  if (typeof result !== 'object') {
    // bare numbers, booleans and other scalars have no inferred SCF response form
    return invalidResponse();
  }
  const envelope = result as Record<string, unknown>;
  if ('isBase64Encoded' in envelope) {
    throw createLocalHttpError(501, lang.__('LOCAL_SCF_BINARY_RESPONSE_UNSUPPORTED'));
  }
  if (!('statusCode' in envelope)) {
    return { statusCode: 200, headers: JSON_HEADERS, body: serializeJson(envelope) };
  }
  const { statusCode = 200, headers = {}, body = '' } = envelope;
  if (typeof statusCode !== 'number' || !Number.isInteger(statusCode)) return invalidResponse();
  if (statusCode < 200 || statusCode > 599) return invalidResponse();
  if (typeof body !== 'string') return invalidResponse();
  const responseHeaders = toHeaderRecord(headers);
  if (!responseHeaders) return invalidResponse();
  return {
    statusCode,
    headers: { ...JSON_HEADERS, ...normalizeHeaders(responseHeaders) },
    body,
  };
};

export const scfHttpAdapter: LocalHttpAdapter = {
  validate: (fn) => {
    if (fn.container || !fn.code || !isLocalNodeRuntime(ProviderEnum.TENCENT, fn.code.runtime)) {
      throw createLocalHttpError(
        501,
        lang.__('LOCAL_SCF_MODE_UNSUPPORTED', {
          functionName: fn.name,
          runtimes: localNodeRuntimes(ProviderEnum.TENCENT).join(', '),
        }),
      );
    }
  },
  buildInvocation: async (req, parsed, iac, fn, requestId) => ({
    event: await transformToScfEvent(req, parsed),
    context: createScfContextSerializable(iac, fn, requestId),
    env: { ...fn.environment },
  }),
  transformResponse: (result) => transformScfResponse(result),
};
