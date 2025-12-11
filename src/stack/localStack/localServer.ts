import { ParsedRequest, RouteHandler, RouteKind } from '../../types/localStack';
import { logger, SI_LOCALSTACK_SERVER_PORT } from '../../common';
import http, { IncomingMessage, ServerResponse } from 'node:http';
import { ServerlessIac } from '../../types';

let localServer: http.Server | undefined;

const cleanPathSegments = (pathname: string): Array<string> =>
  pathname
    .split('/')
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0);

const respondText = (res: ServerResponse, status: number, text: string) => {
  res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end(`${text}\n`);
};

const parseRequest = (req: IncomingMessage): ParsedRequest | undefined => {
  const url = new URL(req.url ?? '/', 'http://localhost');
  const [routeSegment, identifierSegment, ...rest] = cleanPathSegments(url.pathname);

  const kind = routeSegment.toUpperCase() as RouteKind;

  if (RouteKind[kind] === undefined || !identifierSegment) {
    return undefined;
  }

  const subPath = rest.length > 0 ? `/${rest.join('/')}` : '/';
  const query = Object.fromEntries(url.searchParams.entries());

  return {
    kind,
    identifier: identifierSegment,
    url: subPath,
    query,
    method: req.method ?? 'GET',
    rawUrl: url.pathname,
  };
};

export const servLocal = async (
  handlers: Array<{ kind: RouteKind; handler: RouteHandler }>,
  iac: ServerlessIac,
): Promise<void> => {
  if (localServer) {
    logger.info(`localServer already running on http://localhost:${SI_LOCALSTACK_SERVER_PORT}`);
    return;
  }

  localServer = http.createServer((req, res) => {
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
      const result = requestHandler.handler(req, parsed, iac);
      logger.info(`LocalServer handled ${parsed.kind}: ${parsed.identifier} ${parsed.url}`);

      respondText(res, 200, JSON.stringify(result));
    } catch (error) {
      respondText(res, 500, 'Internal server error');
      logger.error(
        { err: error },
        `Local gateway error -> ${req.method ?? 'GET'} ${req.url ?? '/'}`,
      );
    }
  });

  await new Promise<void>((resolve, reject) => {
    localServer!.listen(SI_LOCALSTACK_SERVER_PORT, '0.0.0.0', () => {
      logger.info(`Local Server listening on http://localhost:${SI_LOCALSTACK_SERVER_PORT}`);
      resolve();
    });

    localServer!.once('error', (err) => {
      logger.error({ err }, 'Failed to start local server');
      reject(err);
    });
  });
};

export const stopLocal = async (): Promise<void> => {
  if (!localServer) {
    return;
  }

  await new Promise<void>((resolve, reject) => {
    localServer!.close((err) => {
      if (err) {
        logger.error({ err }, 'Error stopping local server');
        reject(err);
      } else {
        logger.info('Local server stopped');
        localServer = undefined;
        resolve();
      }
    });
  });
};
