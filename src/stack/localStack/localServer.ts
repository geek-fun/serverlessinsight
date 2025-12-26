import { ParsedRequest, RouteHandler, RouteKind } from '../../types/localStack';
import { logger, SI_LOCALSTACK_SERVER_PORT } from '../../common';
import http, { IncomingMessage, ServerResponse } from 'node:http';
import { ServerlessIac } from '../../types';
import { lang } from '../../lang';

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

const respondRaw = (
  res: ServerResponse,
  status: number,
  body: string | Buffer,
  headers: Record<string, string> = {},
) => {
  res.writeHead(status, headers);
  res.end(body);
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
    logger.info(
      lang.__('LOCAL_SERVER_ALREADY_RUNNING', { port: String(SI_LOCALSTACK_SERVER_PORT) }),
    );
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

      // Raw responses (e.g., from bucket handler) include both Content-Type and Content-Length headers
      // and the body is already formatted as a string (not a JSON object)
      const isRawResponse =
        typeof outcome.body === 'string' &&
        outcome.headers?.['Content-Type'] &&
        outcome.headers?.['Content-Length'];

      if (isRawResponse) {
        respondRaw(res, outcome.statusCode, outcome.body as string, outcome.headers);
      } else {
        respondJson(res, outcome.statusCode, outcome.body ?? {}, outcome.headers);
      }
    } catch (err) {
      logger.error({ err }, lang.__('LOCAL_GATEWAY_ERROR'));
      respondJson(res, 500, { error: 'Local gateway failure' });
    }
  });

  await new Promise<void>((resolve, reject) => {
    localServer!.listen(SI_LOCALSTACK_SERVER_PORT, '0.0.0.0', () => {
      logger.info(lang.__('LOCAL_SERVER_LISTENING', { port: String(SI_LOCALSTACK_SERVER_PORT) }));
      resolve();
    });
    localServer!.once('error', reject);
  });
};

export const stopLocal = async (): Promise<void> => {
  if (!localServer) {
    logger.info(lang.__('LOCAL_SERVER_NOT_RUNNING'));
    return;
  }

  await new Promise<void>((resolve, reject) => {
    localServer!.close((err) => {
      if (err) {
        logger.error({ err }, lang.__('ERROR_STOPPING_LOCAL_SERVER'));
        reject(err);
      } else {
        localServer = undefined;
        logger.info(lang.__('LOCAL_SERVER_STOPPED'));
        resolve();
      }
    });
  });
};
