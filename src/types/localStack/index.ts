import { IncomingMessage } from 'node:http';
import { ServerlessIac } from '../index';

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

export type AliyunFCResponse = {
  isBase64Encoded: boolean;
  statusCode: string | number;
  headers?: Record<string, string>;
  body: string | unknown;
};
