import http, { IncomingMessage, ServerResponse } from 'node:http';
import { logger, SI_LOCALSTACK_GATEWAY_PORT } from '../../common';
import { ParsedRequest, RouteHandler, RouteKind } from '../../types/localStack';

interface ResourceIdentifier {
  id: string;
  name: string;
  region: string;
}

const parseIdentifier = (segment: string): ResourceIdentifier | undefined => {
  const parts = segment.split('-');
  if (parts.length < 3) {
    return undefined;
  }

  const id = parts.shift()!;
  const region = parts.pop()!;
  const name = parts.join('-');
  if (!id || !name || !region) {
    return undefined;
  }

  return { id, name, region };
};

const cleanPathSegments = (pathname: string): Array<string> =>
  pathname
    .split('/')
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0);

const parseRequest = (req: IncomingMessage): ParsedRequest | undefined => {
  const url = new URL(req.url ?? '/', 'http://localhost');
  const [routeSegment, descriptorSegment, ...rest] = cleanPathSegments(url.pathname);

  const kind = routeSegment as RouteKind;
  if (!kind || !['si_functions', 'si_buckets', 'si_website_buckets', 'si_events'].includes(kind)) {
    return undefined;
  }

  if (!descriptorSegment) {
    return undefined;
  }

  const identifier = parseIdentifier(descriptorSegment);
  if (!identifier) {
    return undefined;
  }

  const subPath = rest.length > 0 ? `/${rest.join('/')}` : '/';
  const query = Object.fromEntries(url.searchParams.entries());

  return {
    kind,
    identifier,
    subPath,
    query,
    method: req.method ?? 'GET',
    rawPath: url.pathname,
  };
};

const respondText = (res: ServerResponse, status: number, text: string) => {
  res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end(`${text}\n`);
};

let gatewayServer: http.Server | undefined;

export const startGateway = async (
  handlers: Array<{ kind: RouteKind; handler: RouteHandler }>,
): Promise<void> => {
  if (gatewayServer) {
    logger.info(`Local gateway already running on http://localhost:${SI_LOCALSTACK_GATEWAY_PORT}`);
    return;
  }

  gatewayServer = http.createServer((req, res) => {
    try {
      const parsed = parseRequest(req);

      if (!parsed) {
        respondText(res, 404, 'Route not found');
        logger.warn(`Local gateway 404 -> ${req.method ?? 'GET'} ${req.url ?? '/'} `);
        return;
      }
      const requestHandler = handlers.find((h) => h.kind === parsed.kind);
      if (!requestHandler) {
        respondText(res, 501, `No handler for route kind: ${parsed.kind}`);
        logger.warn(
          `Local gateway 501 -> No handler for ${parsed.kind} ${req.method ?? 'GET'} ${
            req.url ?? '/'
          }`,
        );
        return;
      }
      requestHandler.handler(req, res, parsed);
      logger.info(
        `Local gateway handled ${parsed.kind}: ${parsed.identifier.name} (${parsed.identifier.region}) ${parsed.subPath}`,
      );
    } catch (error) {
      respondText(res, 500, 'Internal server error');
      logger.error(
        { err: error },
        `Local gateway error -> ${req.method ?? 'GET'} ${req.url ?? '/'}`,
      );
    }
  });

  await new Promise<void>((resolve, reject) => {
    gatewayServer!.listen(SI_LOCALSTACK_GATEWAY_PORT, '0.0.0.0', () => {
      logger.info(`Local gateway listening on http://localhost:${SI_LOCALSTACK_GATEWAY_PORT}`);
      resolve();
    });

    gatewayServer!.once('error', (err) => {
      logger.error({ err }, 'Failed to start local gateway');
      reject(err);
    });
  });
};
