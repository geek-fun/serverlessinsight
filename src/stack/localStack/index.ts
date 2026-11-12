import { RouteHandler, RouteKind } from '../../types/localStack';
import { LocalServerOptions, servLocal, stopLocal as stopLocalServer } from './localServer';
import { eventsHandler } from './event';
import { functionsHandler } from './function';
import { bucketsHandler } from './bucket';
import { startLocalTimers, stopLocalTimers } from './timer';
import { ServerlessIac } from '../../types';

export * from './event';
export { stopLocal };

const handlers: Array<{ kind: RouteKind; handler: RouteHandler }> = [
  { kind: RouteKind.SI_FUNCTIONS, handler: functionsHandler },
  { kind: RouteKind.SI_EVENTS, handler: eventsHandler },
  { kind: RouteKind.SI_BUCKETS, handler: bucketsHandler },
];

export const startLocalStack = async (iac: ServerlessIac, options: LocalServerOptions = {}) => {
  await servLocal(handlers, iac, options);
  // functions.*.triggers.timer fire locally too (issue #258)
  startLocalTimers(iac);
};

const stopLocal = async (): Promise<void> => {
  stopLocalTimers();
  await stopLocalServer();
};
