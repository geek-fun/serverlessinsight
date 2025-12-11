import { EventDomain, EventRaw } from '../types';

export const parseEvent = (events: { [key: string]: EventRaw }): Array<EventDomain> | undefined => {
  if (!events) {
    return undefined;
  }
  return Object.entries(events).map(([key, event]) => ({
    key,
    name: event.name,
    type: event.type,
    triggers: event.triggers?.map((trigger) => ({ ...trigger, method: trigger.method ?? 'GET' })),
    domain: event.domain,
  }));
};
