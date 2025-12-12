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
