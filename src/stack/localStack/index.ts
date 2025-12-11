import { IncomingMessage, ServerResponse } from 'node:http';
import { ParsedRequest, RouteHandler, RouteKind } from '../../types/localStack';
import { servLocal, stopLocal } from './localServer';
import { eventsHandler } from './event';
import { ServerlessIac } from '../../types';

export * from './event';
export { stopLocal };

const handlers = [
  {
    kind: 'SI_FUNCTIONS',
    handler: (req: IncomingMessage, res: ServerResponse, parsed: ParsedRequest) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          message: `Function request received by local gateway ${parsed}`,
        }),
      );
    },
  },
  { kind: 'SI_EVENTS', handler: eventsHandler },
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

export const startLocalStack = async (iac: ServerlessIac) => {
  await servLocal(handlers as Array<{ kind: RouteKind; handler: RouteHandler }>, iac);
};
