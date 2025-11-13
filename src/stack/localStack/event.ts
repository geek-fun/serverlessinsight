import http from 'node:http';
import { logger } from '../../common';
import { EventDomain, EventTypes } from '../../types';
import { isEmpty } from 'lodash';

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

export const startEvents = (events: Array<EventDomain> | undefined) => {
  const apiGateways = events?.filter((event) => event.type === EventTypes.API_GATEWAY);
  if (isEmpty(apiGateways)) {
    return;
  }

  apiGateways!.forEach((gateway) => {
    startApiGatewayServer(gateway);
  });
};
