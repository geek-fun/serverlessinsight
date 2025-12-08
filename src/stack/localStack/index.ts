import { IncomingMessage, ServerResponse } from 'node:http';
import { ParsedRequest, RouteHandler, RouteKind } from '../../types/localStack';
import { servLocal, stopLocal } from './localServer';
import { getContext } from '../../common';
import { parseYaml } from '../../parser';
import { EventTypes } from '../../types';
import { logger } from '../../common';

export * from './event';
export { stopLocal };

const createApiGatewayHandler = (): RouteHandler => {
  return (req: IncomingMessage, res: ServerResponse, parsed: ParsedRequest) => {
    try {
      const context = getContext();
      const iac = parseYaml(context.iacLocation);

      // Find the event by matching identifier name with event name
      // The identifier name may include region code (e.g., "insight-poc-gateway-cn")
      // while the actual event name is "insight-poc-gateway"
      // Match by checking if identifier name starts with event name followed by a hyphen or exact match
      const event = iac.events?.find(
        (e) =>
          e.type === EventTypes.API_GATEWAY &&
          (parsed.identifier.name === e.name || parsed.identifier.name.startsWith(`${e.name}-`)),
      );

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

      // Match the trigger by method and path
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

const handlers = [
  {
    kind: 'si_functions',
    handler: (req: IncomingMessage, res: ServerResponse, parsed: ParsedRequest) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          message: `Function request received by local gateway ${parsed}`,
        }),
      );
    },
  },
  {
    kind: 'si_events',
    handler: createApiGatewayHandler(),
  },
  // {
  //   kind: 'bucket',
  //   handler: async (req: IncomingMessage, res: ServerResponse, parsed: ParsedRequest) => {
  //     res.writeHead(200, { 'Content-Type': 'application/json' });
  //     res.end(
  //       JSON.stringify({
  //         message: 'Bucket API request received by local gateway',
  //       }),
  //     );
  //   },
  // },
];

export const startLocalStack = async () => {
  await servLocal(handlers as Array<{ kind: RouteKind; handler: RouteHandler }>);
};
