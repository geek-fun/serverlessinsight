import { SI_LOCALSTACK_SERVER_PORT, setContext } from '../../../../src/common';
import { servLocal, stopLocal } from '../../../../src/stack/localStack/localServer';
import { RouteHandler, RouteKind } from '../../../../src/types/localStack';
import { EventTypes, ServerlessIac } from '../../../../src/types';
import { ProviderEnum } from '../../../../src/common';
import { makeRequest } from '../../../autils';
import { logger } from '../../../../src/common/logger';
import http from 'node:http';
import path from 'node:path';

jest.mock('../../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

const base = `http://localhost:${SI_LOCALSTACK_SERVER_PORT}`;
const iacLocation = path.resolve(__dirname, '../../../fixtures/serverless-insight.yml');

const buildIac = (provider: ProviderEnum, events: ServerlessIac['events']): ServerlessIac =>
  ({
    version: '0.0.1',
    app: 'direct-test',
    service: 'svc',
    provider: { name: provider, region: 'cn-hangzhou' },
    events,
  }) as unknown as ServerlessIac;

const aliyunEvent = (key: string, method: string, path: string, backend = '') => ({
  key,
  name: key,
  type: EventTypes.API_GATEWAY,
  triggers: [{ method, path, backend }],
});

describe('localServer layered direct URL resolution (issue #298 S1)', () => {
  const echoParsed: RouteHandler = async (_req, parsed) => ({
    statusCode: 200,
    body: parsed,
  });

  const start = async (iac: ServerlessIac, strictPrefix = false) => {
    await setContext({
      stage: 'preview',
      app: 'direct-test',
      service: 'svc',
      location: iacLocation,
    });
    await servLocal(
      [
        { kind: RouteKind.SI_EVENTS, handler: echoParsed },
        { kind: RouteKind.SI_FUNCTIONS, handler: echoParsed },
        { kind: RouteKind.SI_BUCKETS, handler: echoParsed },
      ],
      iac,
      { strictPrefix, stage: 'preview' },
    );
  };

  afterEach(async () => {
    // makeRequest keeps sockets alive on the global agent; destroy them so
    // server.close() completes before the next scenario rebinds the port.
    http.globalAgent.destroy();
    await stopLocal();
    jest.clearAllMocks();
  });

  it('dispatches an unambiguous production-shaped URL without the prefix (aliyun)', async () => {
    await start(buildIac(ProviderEnum.ALIYUN, [aliyunEvent('api1', 'GET', '/api/v1/users/[id]')]));

    const res = await makeRequest(`${base}/api/v1/users/123`);

    expect(res.statusCode).toBe(200);
    const parsed = JSON.parse(res.data);
    expect(parsed).toMatchObject({
      kind: 'SI_EVENTS',
      identifier: 'api1',
      url: '/api/v1/users/123',
      method: 'GET',
      stage: 'preview',
    });
  });

  it('matches a root-path trigger owning its whole domain', async () => {
    await start(buildIac(ProviderEnum.ALIYUN, [aliyunEvent('root_api', 'ANY', '/')]));

    const res = await makeRequest(`${base}/anything/here`);

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.data).identifier).toBe('root_api');
  });

  it('keeps prefixed gateway URLs working in the default mode', async () => {
    await start(buildIac(ProviderEnum.ALIYUN, [aliyunEvent('api1', 'GET', '/api/v1/users/[id]')]));

    const res = await makeRequest(`${base}/si_events/api1/api/v1/users/123`);

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.data).identifier).toBe('api1');
  });

  it('returns 404 with a hint when several events declare the same trigger', async () => {
    await start(
      buildIac(ProviderEnum.ALIYUN, [
        aliyunEvent('api1', 'GET', '/api/x'),
        aliyunEvent('api2', 'GET', '/api/x'),
      ]),
    );

    const res = await makeRequest(`${base}/api/x`);

    expect(res.statusCode).toBe(404);
    const body = JSON.parse(res.data);
    expect(body.error).toBe('Route not found');
    expect(body.hint).toContain('/api/x');
    expect(body.hint).toContain('api1');
    expect(body.hint).toContain('api2');
  });

  it('warns about ambiguous trigger declarations at startup', async () => {
    await start(
      buildIac(ProviderEnum.ALIYUN, [
        aliyunEvent('api1', 'GET', '/api/x'),
        aliyunEvent('api2', 'GET', '/api/x'),
      ]),
    );

    expect(jest.mocked(logger.warn)).toHaveBeenCalledWith(expect.stringContaining('/api/x'));
    expect(jest.mocked(logger.warn)).toHaveBeenCalledWith(expect.stringContaining('api1, api2'));
  });

  it('does not warn when every trigger declaration is unique', async () => {
    await start(
      buildIac(ProviderEnum.ALIYUN, [
        aliyunEvent('api1', 'GET', '/api/one'),
        aliyunEvent('api2', 'POST', '/api/two'),
      ]),
    );

    expect(jest.mocked(logger.warn)).not.toHaveBeenCalled();
  });

  it('keeps prefix-only mode under --strict-prefix and drops the startup warning', async () => {
    await start(
      buildIac(ProviderEnum.ALIYUN, [
        aliyunEvent('api1', 'GET', '/api/x'),
        aliyunEvent('api2', 'GET', '/api/x'),
      ]),
      true,
    );

    const unprefixed = await makeRequest(`${base}/api/x`);
    expect(unprefixed.statusCode).toBe(404);
    expect(JSON.parse(unprefixed.data).error).toBe('Route not found');

    const prefixed = await makeRequest(`${base}/si_events/api1/api/x`);
    expect(prefixed.statusCode).toBe(200);
    expect(JSON.parse(prefixed.data).identifier).toBe('api1');

    expect(jest.mocked(logger.warn)).not.toHaveBeenCalled();
  });

  it('returns 404 when no gateway trigger matches the unprefixed URL', async () => {
    await start(buildIac(ProviderEnum.ALIYUN, [aliyunEvent('api1', 'GET', '/api/v1/users/[id]')]));

    const res = await makeRequest(`${base}/api/unknown`);

    expect(res.statusCode).toBe(404);
    expect(JSON.parse(res.data).error).toBe('Route not found');
  });

  it.each([ProviderEnum.TENCENT, ProviderEnum.VOLCENGINE, ProviderEnum.AWS])(
    'engages direct resolution for aliyun only (%s keeps prefix-only behavior)',
    async (provider) => {
      await start(buildIac(provider, [aliyunEvent('api1', 'GET', '/api/x')]));

      const res = await makeRequest(`${base}/api/x`);
      expect(res.statusCode).toBe(404);
      expect(JSON.parse(res.data).error).toBe('Route not found');
    },
  );
});
