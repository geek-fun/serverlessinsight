import { IncomingMessage } from 'node:http';
import { FunctionDomain, ServerlessIac } from '../index';

export enum RouteKind {
  SI_FUNCTIONS = 'SI_FUNCTIONS',
  SI_BUCKETS = 'SI_BUCKETS',
  SI_WEBSITE_BUCKETS = 'SI_WEBSITE_BUCKETS',
  SI_EVENTS = 'SI_EVENTS',
}

export type ParsedRequest = {
  kind: RouteKind;
  identifier: string;
  url: string;
  method: string;
  query: Record<string, string>;
  rawUrl: string;
};

export type RouteResponse = {
  statusCode: number;
  headers?: Record<string, string>;
  body?: unknown;
};

export type RouteHandler = (
  req: IncomingMessage,
  parsed: ParsedRequest,
  iac: ServerlessIac,
) => Promise<RouteResponse | void> | RouteResponse | void;

export type FunctionOptions = {
  codeDir: string;
  functionKey: string;
  handler: string;
  servicePath: string;
  timeout: number;
};

export type LocalHttpInvocation = {
  event: unknown;
  context: unknown;
  env: Record<string, string>;
};

export type LocalHttpAdapter = {
  validate: (fn: FunctionDomain) => void;
  buildInvocation: (
    req: IncomingMessage,
    parsed: ParsedRequest,
    iac: ServerlessIac,
    fn: FunctionDomain,
    requestId: string,
  ) => Promise<LocalHttpInvocation>;
  transformResponse: (result: unknown, kind?: RouteKind) => RouteResponse;
};

export type AliyunApiGatewayContext = {
  requestId: string;
  region: string;
  accountId: string;
  credentials: {
    accessKeyId: string;
    accessKeySecret: string;
    securityToken: string;
  };
  function: {
    name: string;
    handler: string;
    memory: number;
    timeout: number;
    initializer: string;
  };
  service: {
    name: string;
    logProject: string;
    logStore: string;
    qualifier: string;
    versionId: string;
  };
  tracing: {
    spanContext: string;
    jaegerEndpoint: string;
    spanBaggages: Record<string, string>;
    parseOpenTracingBaggages: () => Record<string, string>;
  };
  logger: {
    debug: (message: string) => void;
    info: (message: string) => void;
    warn: (message: string) => void;
    error: (message: string) => void;
    log: (message: string) => void;
  };
};

export type AliyunServerlessEvent = {
  path: string;
  httpMethod: string;
  headers: Record<string, string>;
  queryParameters: Record<string, string>;
  pathParameters: Record<string, string>;
  body: string | undefined;
  isBase64Encoded: boolean;
};

/**
 * SCF invocation context, as documented for the Node.js runtime. The account
 * identifiers are synthetic offline; `getRemainingTimeInMillis()` cannot cross
 * the worker boundary and is not simulated.
 */
export type ScfInvocationContext = {
  memory_limit_in_mb: number;
  time_limit_in_ms: number;
  request_id: string;
  environment: string;
  environ: string;
  function_version: string;
  function_name: string;
  namespace: string;
  tencentcloud_region: string;
  tencentcloud_appid: string;
  tencentcloud_uin: string;
};

/**
 * The SCF function-URL HTTP event: API-Gateway-compatible with the gateway-only
 * fields removed.
 */
export type ScfHttpRequestEvent = {
  body: string;
  headers: Record<string, string>;
  httpMethod: string;
  path: string;
  queryString: Record<string, string>;
};

export type AliyunFCResponse = {
  isBase64Encoded: boolean;
  statusCode: string | number;
  headers?: Record<string, string>;
  body: string | unknown;
};
