import http, { IncomingMessage, ServerResponse } from 'node:http';
import { getContext, logger } from '../../common';
import { EventDomain, EventTypes } from '../../types';
import { isEmpty } from 'lodash';
import { ParsedRequest, RouteHandler } from '../../types/localStack';
import { parseYaml } from '../../parser';

const startApiGatewayServer = (event: EventDomain) => {
  const server = http.createServer((req, res) => {
    const matchedTrigger = event.triggers.find(
      (trigger) => trigger.method === req.method && trigger.path === req.url,
    );
    if (!matchedTrigger) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not Found\n');
      logger.warn(`API Gateway Event - ${req.method} ${req.url} -> Not Found`);
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`Invoked backend: ${matchedTrigger.backend}\n`);
    logger.info(`API Gateway Event - ${req.method} ${req.url} -> ${matchedTrigger.backend}`);
  });

  const port = 3000 + Math.floor(Math.random() * 1000);
  server.listen(port, () => {
    logger.info(`API Gateway "${event.name}" listening on http://localhost:${port}`);
  });
};

const servEvents = (events: Array<EventDomain> | undefined) => {
  const apiGateways = events?.filter((event) => event.type === EventTypes.API_GATEWAY);
  if (isEmpty(apiGateways)) {
    return;
  }

  apiGateways!.forEach((gateway) => {
    startApiGatewayServer(gateway);
  });
};

export const createEventHandler = (): RouteHandler => {
  const context = getContext();
  const iac = parseYaml(context.iacLocation);
  const apiGatewayEvents = iac.events?.filter((e) => e.type === EventTypes.API_GATEWAY);

  servEvents(apiGatewayEvents);

  return (req: IncomingMessage, res: ServerResponse, parsed: ParsedRequest) => {
    try {
      const event = apiGatewayEvents?.find((e) => parsed.identifier.name === e.name);

      if (!event) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            error: 'API Gateway event not found',
            eventName: parsed.identifier.name,
          }),
        );
        logger.warn(
          `API Gateway event not found: ${parsed.identifier.name} for ${parsed.method} ${parsed.subPath}`,
        );
        return;
      }

      // @TODO implement regex path matching
      const trigger = event.triggers.find(
        (t) => t.method === parsed.method && t.path === parsed.subPath,
      );

      if (!trigger) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            error: 'No matching trigger found',
            method: parsed.method,
            path: parsed.subPath,
            availableTriggers: event.triggers.map((t) => `${t.method} ${t.path}`),
          }),
        );
        logger.warn(
          `No matching trigger for ${parsed.method} ${parsed.subPath} in event ${event.name}`,
        );
        return;
      }

      // Successfully matched - return information about the backend function
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          message: 'API Gateway trigger matched',
          event: event.name,
          method: parsed.method,
          path: parsed.subPath,
          backend: trigger.backend,
          query: parsed.query,
        }),
      );
      logger.info(
        `API Gateway: ${event.name} - ${parsed.method} ${parsed.subPath} -> ${trigger.backend}`,
      );
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          error: 'Internal server error',
          message: error instanceof Error ? error.message : String(error),
        }),
      );
      logger.error({ err: error }, 'Error processing API Gateway request');
    }
  };
};
