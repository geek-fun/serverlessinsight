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

const respondJson = (
  res: ServerResponse,
  status: number,
  body: unknown,
  headers: Record<string, string> = {},
) => {
  res.writeHead(status, { 'Content-Type': 'application/json', ...headers });
  res.end(JSON.stringify(body));
};

const parseRequest = (req: IncomingMessage): ParsedRequest | undefined => {
  const url = new URL(req.url ?? '/', 'http://localhost');
  const [routeSegment, identifierSegment, ...rest] = cleanPathSegments(url.pathname);
  if (!routeSegment) {
    return undefined;
  }
  const kindKey = routeSegment.toUpperCase();
  const kind = (RouteKind as Record<string, RouteKind>)[kindKey];
  if (!kind) {
    return undefined;
  }

  const subPath = rest.length > 0 ? `/${rest.join('/')}` : '/';
  return {
    kind,
    identifier: identifierSegment,
    url: subPath,
    method: req.method ?? 'GET',
    query: Object.fromEntries(url.searchParams.entries()),
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

  localServer = http.createServer(async (req, res) => {
    try {
      const parsed = parseRequest(req);

      if (!parsed) {
        respondJson(res, 404, { error: 'Route not found' });
        return;
      }

      const route = handlers.find((h) => h.kind === parsed.kind);
      if (!route) {
        respondJson(res, 404, { error: `Handler for ${parsed.kind} not registered` });
        return;
      }

      const outcome = await route.handler(req, parsed, iac);
      if (!outcome) {
        respondJson(res, 204, {});
        return;
      }
      respondJson(res, outcome.statusCode, outcome.body ?? {}, outcome.headers);
    } catch (err) {
      logger.error({ err }, 'Local gateway error');
      respondJson(res, 500, { error: 'Local gateway failure' });
    }
  });

  await new Promise<void>((resolve, reject) => {
    localServer!.listen(SI_LOCALSTACK_SERVER_PORT, '0.0.0.0', () => {
      logger.info(`Local Server listening on http://localhost:${SI_LOCALSTACK_SERVER_PORT}`);
      resolve();
    });
    localServer!.once('error', reject);
  });
};

export const stopLocal = async (): Promise<void> => {
  if (!localServer) {
    return;
  }

  await new Promise<void>((resolve, reject) => {
    localServer!.close((err) => {
      if (err) {
        reject(err);
      } else {
        localServer = undefined;
        resolve();
      }
    });
  });
};
