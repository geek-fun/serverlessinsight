import { Resolvable } from './resolvable';

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
  domain?: {
    domain_name: Resolvable<string>;
    www_bind_apex?: Resolvable<boolean>;
    certificate_id?: Resolvable<string>;
    certificate_body?: Resolvable<string>;
    certificate_private_key?: Resolvable<string>;
    protocol?: Resolvable<string | string[]>;
  };
};

export type EventDomain = {
  key: string;
} & EventRaw;
