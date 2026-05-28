import { Resolvable } from './resolvable';
import { EventDomainConfig } from './bucket';

export enum EventTypes {
  API_GATEWAY = 'API_GATEWAY',
}

export type EventRaw = {
  name: Resolvable<string>;
  type: Resolvable<EventTypes | string>;
  triggers: Array<{
    method: Resolvable<string>;
    path: Resolvable<string>;
    backend: Resolvable<string>;
  }>;
  domain?: EventDomainConfig;
};

export type EventDomain = {
  key: string;
} & EventRaw;
