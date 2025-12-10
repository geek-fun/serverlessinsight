export enum EventTypes {
  API_GATEWAY = 'API_GATEWAY',
}

export type EventRaw = {
  name: string;
  type: EventTypes;
  triggers: Array<{
    method: string;
    path: string;
    backend: string;
  }>;
  domain?: {
    domain_name: string;
    certificate_name?: string;
    certificate_body?: string;
    certificate_private_key?: string;
  };
  local?: {
    port: number;
  };
};

export type EventDomain = {
  key: string;
} & EventRaw;
