import { IncomingMessage, ServerResponse } from 'node:http';

export type RouteKind = 'si_functions' | 'si_buckets' | 'si_website_buckets' | 'si_events';

export type ResourceIdentifier = {
  id: string;
  name: string;
  region: string;
};

export type ParsedRequest = {
  kind: RouteKind;
  identifier: ResourceIdentifier;
  subPath: string;
  method: string;
  query: Record<string, string>;
  rawPath: string;
};

export type RouteHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  parsed: ParsedRequest,
) => void;
