import { IncomingMessage, ServerResponse } from 'node:http';
import { ParsedRequest, RouteHandler, RouteKind } from '../../types/localStack';
import { servLocal, stopLocal } from './localServer';
import { createEventHandler } from './event';

export * from './event';
export { stopLocal };

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
    handler: createEventHandler(),
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
