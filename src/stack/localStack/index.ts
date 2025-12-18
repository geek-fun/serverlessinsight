import { RouteHandler, RouteKind } from '../../types/localStack';
import { servLocal, stopLocal } from './localServer';
import { eventsHandler } from './event';
import { functionsHandler } from './function';
import { bucketsHandler } from './bucket';
import { ServerlessIac } from '../../types';

export * from './event';
export { stopLocal };

const handlers: Array<{ kind: RouteKind; handler: RouteHandler }> = [
  { kind: RouteKind.SI_FUNCTIONS, handler: functionsHandler },
  { kind: RouteKind.SI_EVENTS, handler: eventsHandler },
  { kind: RouteKind.SI_BUCKETS, handler: bucketsHandler },
];

export const startLocalStack = async (iac: ServerlessIac) => {
  await servLocal(handlers, iac);
};
