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
  /** Volcengine API 网关 instance network (VPC + subnets) — required for CreateGateway */
  network?: {
    vpc_id: string;
    subnet_ids: string[];
  };
  log?: Resolvable<boolean>;
};

export type EventDomain = {
  key: string;
} & EventRaw;
