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
};

export type EventDomain = {
  key: string;
} & EventRaw;
