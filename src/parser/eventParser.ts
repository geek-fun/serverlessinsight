import { EventDomain, EventRaw } from '../types';
import { parseBooleanWithDefault } from './parseUtils';

export const parseEvent = (events: { [key: string]: EventRaw }): Array<EventDomain> | undefined => {
  if (!events) {
    return undefined;
  }
  return Object.entries(events).map(([key, event]) => ({
    key,
    name: event.name,
    type: event.type,
    triggers: event.triggers?.map((trigger) => ({ ...trigger, method: trigger.method ?? 'GET' })),
    domain: event.domain
      ? {
          ...event.domain,
          www_bind_apex: parseBooleanWithDefault(event.domain.www_bind_apex, false),
        }
      : undefined,
  }));
};
