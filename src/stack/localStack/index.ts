import { RouteHandler, RouteKind } from '../../types/localStack';
import { servLocal, stopLocal } from './localServer';
import { eventsHandler } from './event';
import { functionsHandler } from './function';
import { ServerlessIac } from '../../types';

export * from './event';
export { stopLocal };

const handlers: Array<{ kind: RouteKind; handler: RouteHandler }> = [
  { kind: RouteKind.SI_FUNCTIONS, handler: functionsHandler },
  { kind: RouteKind.SI_EVENTS, handler: eventsHandler },
];

export const startLocalStack = async (iac: ServerlessIac) => {
  await servLocal(handlers, iac);
};
