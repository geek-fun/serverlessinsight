import { ParsedRequest, RouteHandler, RouteKind } from '../../types/localStack';
import { EventTypes, ServerlessIac } from '../../types';
import { logger, ProviderEnum, SI_LOCALSTACK_SERVER_PORT } from '../../common';
import { preservesLocalPath } from './localRoute';
import { matchTriggerWithParams } from './event';
import http, { IncomingMessage, ServerResponse } from 'node:http';
import { lang } from '../../lang';

let localServer: http.Server | undefined;

export type LocalServerOptions = {
  strictPrefix?: boolean;
  stage?: string;
};

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

const parseRequest = (
  req: IncomingMessage,
  preservePath: boolean,
  stage?: string,
): ParsedRequest | undefined => {
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

  const subPath = preservePath
    ? (url.pathname.match(/^\/[^/]+\/[^/]+(\/.*)?$/)?.[1] ?? '/')
    : rest.length > 0
      ? `/${rest.join('/')}`
      : '/';
  return {
    kind,
    identifier: identifierSegment,
    url: subPath,
    method: req.method ?? 'GET',
    query: Object.fromEntries(url.searchParams.entries()),
    rawUrl: url.pathname,
    stage,
  };
};

type DirectResolution =
  | { kind: 'matched'; parsed: ParsedRequest }
  | { kind: 'ambiguous'; eventKeys: string[] }
  | { kind: 'none' };

const resolveGatewayRequest = (
  req: IncomingMessage,
  iac: ServerlessIac,
  stage?: string,
): DirectResolution => {
  const url = new URL(req.url ?? '/', 'http://localhost');
  const request = { method: req.method ?? 'GET', path: url.pathname };

  const matchedEventKeys = (iac.events ?? [])
    .filter((event) => event.type === EventTypes.API_GATEWAY)
    .filter((event) =>
      event.triggers.some(
        (trigger) => matchTriggerWithParams(request, trigger, { exact: false }).matched,
      ),
    )
    .map((event) => event.key);

  if (matchedEventKeys.length === 1) {
    const cleaned = cleanPathSegments(url.pathname);
    return {
      kind: 'matched',
      parsed: {
        kind: RouteKind.SI_EVENTS,
        identifier: matchedEventKeys[0],
        url: cleaned.length > 0 ? `/${cleaned.join('/')}` : '/',
        method: request.method,
        query: Object.fromEntries(url.searchParams.entries()),
        rawUrl: url.pathname,
        stage,
        pathParameters: {},
      },
    };
  }

  return matchedEventKeys.length > 1
    ? { kind: 'ambiguous', eventKeys: matchedEventKeys }
    : { kind: 'none' };
};

const findAmbiguousGatewayTriggers = (iac: ServerlessIac): string[] =>
  Object.entries(
    (iac.events ?? [])
      .filter((event) => event.type === EventTypes.API_GATEWAY)
      .flatMap((event) =>
        event.triggers.map((trigger) => ({
          eventKey: event.key,
          method: String(trigger.method).toUpperCase(),
          path: String(trigger.path),
        })),
      )
      .reduce<Record<string, Array<{ eventKey: string; method: string }>>>((groups, trigger) => {
        const existing = groups[trigger.path] ?? [];
        return {
          ...groups,
          [trigger.path]: [...existing, { eventKey: trigger.eventKey, method: trigger.method }],
        };
      }, {}),
  )
    .map(([trigPath, declarations]) => {
      const eventKeys = [...new Set(declarations.map((d) => d.eventKey))];
      if (eventKeys.length < 2) return undefined;
      const methods = new Set(declarations.map((d) => d.method));
      const compatible =
        methods.has('ANY') ||
        declarations.every((d, index, all) =>
          all.every((other) => other.method === d.method || other.method === 'ANY'),
        );
      return compatible ? `'${trigPath}' → ${eventKeys.join(', ')}` : undefined;
    })
    .filter((detail): detail is string => detail !== undefined);

export const servLocal = async (
  handlers: Array<{ kind: RouteKind; handler: RouteHandler }>,
  iac: ServerlessIac,
  options: LocalServerOptions = {},
): Promise<void> => {
  if (localServer) {
    logger.info(
      lang.__('LOCAL_SERVER_ALREADY_RUNNING', { port: String(SI_LOCALSTACK_SERVER_PORT) }),
    );
    return;
  }

  const directResolutionEnabled =
    iac.provider.name === ProviderEnum.ALIYUN && options.strictPrefix !== true;

  if (directResolutionEnabled) {
    logger.info(lang.__('LOCAL_DIRECT_RESOLUTION_ENABLED'));
    const ambiguous = findAmbiguousGatewayTriggers(iac);
    if (ambiguous.length > 0) {
      logger.warn(lang.__('LOCAL_GATEWAY_AMBIGUOUS_TRIGGERS', { details: ambiguous.join('; ') }));
    }
  }

  localServer = http.createServer(async (req, res) => {
    try {
      const parsed = parseRequest(req, preservesLocalPath(iac.provider.name), options.stage);

      let dispatched = parsed;
      if (!dispatched && directResolutionEnabled) {
        const direct = resolveGatewayRequest(req, iac, options.stage);
        if (direct.kind === 'matched') {
          dispatched = direct.parsed;
        } else if (direct.kind === 'ambiguous') {
          respondJson(res, 404, {
            error: 'Route not found',
            hint: lang.__('LOCAL_GATEWAY_AMBIGUOUS_TRIGGERS', {
              details: `'${new URL(req.url ?? '/', 'http://localhost').pathname}' → ${direct.eventKeys.join(', ')}`,
            }),
          });
          return;
        }
      }

      if (!dispatched) {
        respondJson(res, 404, { error: 'Route not found' });
        return;
      }

      const route = handlers.find((h) => h.kind === dispatched!.kind);
      if (!route) {
        respondJson(res, 404, { error: `Handler for ${dispatched!.kind} not registered` });
        return;
      }

      const outcome = await route.handler(req, dispatched, iac);
      if (!outcome) {
        respondJson(res, 204, {});
        return;
      }

      // Cloud API Gateway in PASSTHROUGH mode passes through all responses as-is.
      // Si-local mirrors this by always using respondRaw for function responses.
      if (typeof outcome.body === 'string' || Buffer.isBuffer(outcome.body)) {
        respondRaw(res, outcome.statusCode, outcome.body, outcome.headers);
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
