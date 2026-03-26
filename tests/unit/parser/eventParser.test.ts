import { parseEvent } from '../../../src/parser/eventParser';
import { EventTypes, EventRaw } from '../../../src/types';

describe('parseEvent', () => {
  it('should return undefined when events is falsy', () => {
    expect(parseEvent(undefined as unknown as { [key: string]: EventRaw })).toBeUndefined();
    expect(parseEvent(null as unknown as { [key: string]: EventRaw })).toBeUndefined();
  });

  it('should parse events with triggers and explicit methods', () => {
    const events: { [key: string]: EventRaw } = {
      my_event: {
        name: 'my-api',
        type: EventTypes.API_GATEWAY,
        triggers: [{ method: 'POST', path: '/api/data', backend: '${functions.fn}' }],
      },
    };

    const result = parseEvent(events);

    expect(result).toHaveLength(1);
    expect(result![0].key).toBe('my_event');
    expect(result![0].name).toBe('my-api');
    expect(result![0].type).toBe(EventTypes.API_GATEWAY);
    expect(result![0].triggers![0].method).toBe('POST');
    expect(result![0].triggers![0].path).toBe('/api/data');
  });

  it('should default method to GET when trigger method is undefined', () => {
    const events: { [key: string]: EventRaw } = {
      api: {
        name: 'api-gw',
        type: EventTypes.API_GATEWAY,
        triggers: [
          { method: undefined as unknown as string, path: '/api/test', backend: '${functions.fn}' },
        ],
      },
    };

    const result = parseEvent(events);

    expect(result![0].triggers![0].method).toBe('GET');
  });

  it('should handle event with undefined triggers', () => {
    const events: { [key: string]: EventRaw } = {
      no_triggers: {
        name: 'no-triggers-event',
        type: EventTypes.API_GATEWAY,
        triggers: undefined as unknown as EventRaw['triggers'],
      },
    };

    const result = parseEvent(events);

    expect(result).toHaveLength(1);
    expect(result![0].triggers).toBeUndefined();
  });

  it('should parse domain with www_bind_apex', () => {
    const events: { [key: string]: EventRaw } = {
      domain_event: {
        name: 'domain-api',
        type: EventTypes.API_GATEWAY,
        triggers: [{ method: 'GET', path: '/api/hello', backend: '${functions.fn}' }],
        domain: {
          domain_name: 'example.com',
          www_bind_apex: true,
        },
      },
    };

    const result = parseEvent(events);

    expect(result![0].domain).toBeDefined();
    expect(result![0].domain!.domain_name).toBe('example.com');
    expect(result![0].domain!.www_bind_apex).toBe(true);
  });

  it('should set domain to undefined when event has no domain', () => {
    const events: { [key: string]: EventRaw } = {
      no_domain: {
        name: 'no-domain-event',
        type: EventTypes.API_GATEWAY,
        triggers: [{ method: 'GET', path: '/api/test', backend: '${functions.fn}' }],
      },
    };

    const result = parseEvent(events);

    expect(result![0].domain).toBeUndefined();
  });

  it('should parse www_bind_apex string value as boolean with default false', () => {
    const events: { [key: string]: EventRaw } = {
      str_domain: {
        name: 'str-domain-api',
        type: EventTypes.API_GATEWAY,
        triggers: [{ method: 'GET', path: '/api/hello', backend: '${functions.fn}' }],
        domain: {
          domain_name: 'test.com',
          www_bind_apex: 'true' as unknown as boolean,
        },
      },
    };

    const result = parseEvent(events);

    expect(result![0].domain!.www_bind_apex).toBe(true);
  });

  it('should default www_bind_apex to false when not provided', () => {
    const events: { [key: string]: EventRaw } = {
      default_domain: {
        name: 'default-domain-api',
        type: EventTypes.API_GATEWAY,
        triggers: [{ method: 'GET', path: '/api/hello', backend: '${functions.fn}' }],
        domain: {
          domain_name: 'test.com',
        },
      },
    };

    const result = parseEvent(events);

    expect(result![0].domain!.www_bind_apex).toBe(false);
  });

  it('should parse multiple events', () => {
    const events: { [key: string]: EventRaw } = {
      event_a: {
        name: 'api-a',
        type: EventTypes.API_GATEWAY,
        triggers: [{ method: 'GET', path: '/a', backend: '${functions.fn_a}' }],
      },
      event_b: {
        name: 'api-b',
        type: EventTypes.API_GATEWAY,
        triggers: [{ method: 'POST', path: '/b', backend: '${functions.fn_b}' }],
        domain: { domain_name: 'b.com' },
      },
    };

    const result = parseEvent(events);

    expect(result).toHaveLength(2);
    expect(result![0].key).toBe('event_a');
    expect(result![0].domain).toBeUndefined();
    expect(result![1].key).toBe('event_b');
    expect(result![1].domain).toBeDefined();
  });
});
