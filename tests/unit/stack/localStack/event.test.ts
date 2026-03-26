import { eventsHandler } from '../../../../src/stack/localStack';
import { ParsedRequest } from '../../../../src/types/localStack';
import { EventTypes, ServerlessIac } from '../../../../src/types';
import http from 'node:http';
import { Readable } from 'node:stream';
import { setContext, getContext, ProviderEnum } from '../../../../src/common';
import path from 'node:path';
import { revalYaml } from '../../../../src/parser';

describe('eventsHandler', () => {
  const iacLocation = path.resolve(__dirname, '../../../fixtures/serverless-insight.yml');
  let iac: ReturnType<typeof revalYaml>;

  beforeAll(async () => {
    await setContext({
      stage: 'default',
      app: 'test-app',
      service: 'test-service',
      location: iacLocation,
    });

    const ctx = getContext();
    iac = revalYaml(iacLocation, ctx);
  });

  const mockRequest = (method = 'GET', body = ''): http.IncomingMessage => {
    const readable = new Readable();
    readable.push(body);
    readable.push(null);
    return Object.assign(readable, {
      method,
      url: '/api/hello',
      headers: {},
    }) as http.IncomingMessage;
  };

  const parsedBase: ParsedRequest = {
    kind: undefined as unknown as ParsedRequest['kind'],
    identifier: 'gateway_event',
    url: '/api/hello',
    method: 'GET',
    query: {},
    rawUrl: '/si_events/gateway_event/api/hello',
  };

  it('returns 404 when event missing', async () => {
    const res = await eventsHandler(mockRequest(), { ...parsedBase, identifier: 'missing' }, iac);

    expect(res?.statusCode).toBe(404);
    expect(res?.body).toEqual({ error: 'API Gateway event not found', event: 'missing' });
  });

  it('returns 404 when trigger not matched', async () => {
    const res = await eventsHandler(mockRequest(), { ...parsedBase, url: '/api/unknown' }, iac);

    expect(res?.statusCode).toBe(404);
    expect(res?.body).toEqual({ error: 'No matching trigger found' });
  });

  it('returns 404 when method does not match trigger', async () => {
    const res = await eventsHandler(mockRequest('POST'), { ...parsedBase, method: 'POST' }, iac);

    expect(res?.statusCode).toBe(404);
    expect(res?.body).toEqual({ error: 'No matching trigger found' });
  });

  it('delegates to backend function when trigger matched', async () => {
    const res = await eventsHandler(mockRequest('POST'), parsedBase, iac);

    expect(res?.statusCode).toBe(200);
    expect(res?.body).toBe('ServerlessInsight Hello World');
  });

  it('matches trigger with path parameter segment', async () => {
    const customIac: ServerlessIac = {
      version: '0.0.1',
      app: 'test-app',
      provider: { name: ProviderEnum.TENCENT, region: 'ap-guangzhou' },
      service: 'test-service',
      functions: [
        {
          key: 'test_fn',
          name: 'test-fn',
          code: {
            runtime: 'nodejs18',
            handler: 'index.handler',
            path: 'tests/fixtures/artifacts/artifact.zip',
          },
          memory: 128,
          timeout: 3,
          storage: {},
        },
      ],
      events: [
        {
          key: 'api_event',
          name: 'api-event',
          type: EventTypes.API_GATEWAY,
          triggers: [{ method: 'GET', path: '/users/[id]', backend: '${functions.test_fn}' }],
        },
      ],
    };

    const res = await eventsHandler(
      mockRequest('GET'),
      { ...parsedBase, identifier: 'api_event', url: '/users/123', method: 'GET' },
      customIac,
    );

    expect(res?.statusCode).toBe(200);
  });

  it('returns 202 when trigger matched but no backend configured', async () => {
    const customIac: ServerlessIac = {
      version: '0.0.1',
      app: 'test-app',
      provider: { name: ProviderEnum.ALIYUN, region: 'cn-hangzhou' },
      service: 'test-service',
      events: [
        {
          key: 'no_backend_event',
          name: 'no-backend-event',
          type: EventTypes.API_GATEWAY,
          triggers: [{ method: 'GET', path: '/api/test', backend: '' }],
        },
      ],
    };

    const res = await eventsHandler(
      mockRequest('GET'),
      { ...parsedBase, identifier: 'no_backend_event', url: '/api/test', method: 'GET' },
      customIac,
    );

    expect(res?.statusCode).toBe(202);
    expect(res?.body).toEqual({ message: 'Trigger matched but no backend configured' });
  });

  it('returns 500 when backend definition is missing', async () => {
    const customIac: ServerlessIac = {
      version: '0.0.1',
      app: 'test-app',
      provider: { name: ProviderEnum.ALIYUN, region: 'cn-hangzhou' },
      service: 'test-service',
      events: [
        {
          key: 'bad_backend_event',
          name: 'bad-backend-event',
          type: EventTypes.API_GATEWAY,
          triggers: [
            {
              method: 'GET',
              path: '/api/broken',
              backend: '${functions.nonexistent_fn}',
            },
          ],
        },
      ],
    };

    const res = await eventsHandler(
      mockRequest('GET'),
      { ...parsedBase, identifier: 'bad_backend_event', url: '/api/broken', method: 'GET' },
      customIac,
    );

    expect(res?.statusCode).toBe(500);
    expect(res?.body).toMatchObject({ error: 'Backend definition missing' });
  });

  it('uses non-Aliyun path for tencent provider', async () => {
    const customIac: ServerlessIac = {
      version: '0.0.1',
      app: 'test-app',
      provider: { name: ProviderEnum.TENCENT, region: 'ap-guangzhou' },
      service: 'test-service',
      functions: [
        {
          key: 'test_fn',
          name: 'test-fn',
          code: {
            runtime: 'nodejs18',
            handler: 'index.handler',
            path: 'tests/fixtures/artifacts/artifact.zip',
          },
          memory: 128,
          timeout: 3,
          storage: {},
        },
      ],
      events: [
        {
          key: 'tencent_event',
          name: 'tencent-event',
          type: EventTypes.API_GATEWAY,
          triggers: [{ method: 'GET', path: '/api/hello', backend: '${functions.test_fn}' }],
        },
      ],
    };

    const res = await eventsHandler(
      mockRequest('GET'),
      { ...parsedBase, identifier: 'tencent_event', url: '/api/hello', method: 'GET' },
      customIac,
    );

    expect(res?.statusCode).toBe(200);
  });

  it('handles Aliyun function with directory code path', async () => {
    const customIac: ServerlessIac = {
      version: '0.0.1',
      app: 'test-app',
      provider: { name: ProviderEnum.ALIYUN, region: 'cn-hangzhou' },
      service: 'test-service',
      functions: [
        {
          key: 'dir_fn',
          name: 'dir-fn',
          code: {
            runtime: 'nodejs18',
            handler: 'index.handler',
            path: 'tests/fixtures/artifacts',
          },
          memory: 128,
          timeout: 3,
          storage: {},
        },
      ],
      events: [
        {
          key: 'dir_event',
          name: 'dir-event',
          type: EventTypes.API_GATEWAY,
          triggers: [{ method: 'GET', path: '/api/dir', backend: '${functions.dir_fn}' }],
        },
      ],
    };

    const res = await eventsHandler(
      mockRequest('GET'),
      { ...parsedBase, identifier: 'dir_event', url: '/api/dir', method: 'GET' },
      customIac,
    );

    expect(res?.statusCode).toBe(200);
  });

  it('handles Aliyun function with non-existent code path falling back to dirname', async () => {
    const customIac: ServerlessIac = {
      version: '0.0.1',
      app: 'test-app',
      provider: { name: ProviderEnum.ALIYUN, region: 'cn-hangzhou' },
      service: 'test-service',
      functions: [
        {
          key: 'nopath_fn',
          name: 'nopath-fn',
          code: {
            runtime: 'nodejs18',
            handler: 'index.handler',
            path: 'tests/fixtures/artifacts/nonexistent.js',
          },
          memory: 128,
          timeout: 3,
          storage: {},
        },
      ],
      events: [
        {
          key: 'nopath_event',
          name: 'nopath-event',
          type: EventTypes.API_GATEWAY,
          triggers: [{ method: 'GET', path: '/api/nopath', backend: '${functions.nopath_fn}' }],
        },
      ],
    };

    const res = await eventsHandler(
      mockRequest('GET'),
      { ...parsedBase, identifier: 'nopath_event', url: '/api/nopath', method: 'GET' },
      customIac,
    );

    expect(res?.statusCode).toBe(200);
  });

  it('matches trigger with wildcard path', async () => {
    const customIac: ServerlessIac = {
      version: '0.0.1',
      app: 'test-app',
      provider: { name: ProviderEnum.TENCENT, region: 'ap-guangzhou' },
      service: 'test-service',
      functions: [
        {
          key: 'wild_fn',
          name: 'wild-fn',
          code: {
            runtime: 'nodejs18',
            handler: 'index.handler',
            path: 'tests/fixtures/artifacts/artifact.zip',
          },
          memory: 128,
          timeout: 3,
          storage: {},
        },
      ],
      events: [
        {
          key: 'wild_event',
          name: 'wild-event',
          type: EventTypes.API_GATEWAY,
          triggers: [{ method: 'GET', path: '/api/*', backend: '${functions.wild_fn}' }],
        },
      ],
    };

    const res = await eventsHandler(
      mockRequest('GET'),
      { ...parsedBase, identifier: 'wild_event', url: '/api/anything/here', method: 'GET' },
      customIac,
    );

    expect(res?.statusCode).toBe(200);
  });

  it('matches trigger when request method is ANY', async () => {
    const customIac: ServerlessIac = {
      version: '0.0.1',
      app: 'test-app',
      provider: { name: ProviderEnum.TENCENT, region: 'ap-guangzhou' },
      service: 'test-service',
      functions: [
        {
          key: 'any_fn',
          name: 'any-fn',
          code: {
            runtime: 'nodejs18',
            handler: 'index.handler',
            path: 'tests/fixtures/artifacts/artifact.zip',
          },
          memory: 128,
          timeout: 3,
          storage: {},
        },
      ],
      events: [
        {
          key: 'any_event',
          name: 'any-event',
          type: EventTypes.API_GATEWAY,
          triggers: [{ method: 'POST', path: '/api/any', backend: '${functions.any_fn}' }],
        },
      ],
    };

    const req = mockRequest('GET');
    req.method = 'ANY';
    const res = await eventsHandler(
      req,
      { ...parsedBase, identifier: 'any_event', url: '/api/any', method: 'ANY' },
      customIac,
    );

    expect(res?.statusCode).toBe(200);
  });

  it('uses functionsHandler fallback for Aliyun function without code', async () => {
    const customIac: ServerlessIac = {
      version: '0.0.1',
      app: 'test-app',
      provider: { name: ProviderEnum.ALIYUN, region: 'cn-hangzhou' },
      service: 'test-service',
      functions: [
        {
          key: 'nocode_fn',
          name: 'nocode-fn',
          memory: 128,
          timeout: 3,
          storage: {},
        } as unknown as ServerlessIac['functions'] extends (infer T)[] | undefined ? T : never,
      ],
      events: [
        {
          key: 'nocode_event',
          name: 'nocode-event',
          type: EventTypes.API_GATEWAY,
          triggers: [{ method: 'GET', path: '/api/nocode', backend: '${functions.nocode_fn}' }],
        },
      ],
    };

    const res = await eventsHandler(
      mockRequest('GET'),
      { ...parsedBase, identifier: 'nocode_event', url: '/api/nocode', method: 'GET' },
      customIac,
    );

    expect(res).toBeDefined();
    expect(res?.statusCode).toBeDefined();
  });

  it('does not match when path has fewer segments than required', async () => {
    const customIac: ServerlessIac = {
      version: '0.0.1',
      app: 'test-app',
      provider: { name: ProviderEnum.ALIYUN, region: 'cn-hangzhou' },
      service: 'test-service',
      events: [
        {
          key: 'deep_event',
          name: 'deep-event',
          type: EventTypes.API_GATEWAY,
          triggers: [{ method: 'GET', path: '/api/v1/deep', backend: '' }],
        },
      ],
    };

    const res = await eventsHandler(
      mockRequest('GET'),
      { ...parsedBase, identifier: 'deep_event', url: '/api', method: 'GET' },
      customIac,
    );

    expect(res?.statusCode).toBe(404);
    expect(res?.body).toEqual({ error: 'No matching trigger found' });
  });
});
