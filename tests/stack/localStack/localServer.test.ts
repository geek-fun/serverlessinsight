import { SI_LOCALSTACK_SERVER_PORT } from '../../../src/common';
import { servLocal, stopLocal } from '../../../src/stack/localStack/localServer';
import { RouteHandler, RouteKind } from '../../../src/types/localStack';
import { ServerlessIac } from '../../../src/types';
import { makeRequest } from '../../autils';

describe('localServer routing', () => {
  const handlers: Array<{ kind: RouteKind; handler: RouteHandler }> = [
    {
      kind: RouteKind.SI_FUNCTIONS,
      handler: async () => ({
        statusCode: 200,
        body: { ok: true },
      }),
    },
  ];
  const iac = {
    service: 'test',
    version: '0.0.1',
    provider: { name: undefined, region: 'xx' },
  } as unknown as ServerlessIac;

  beforeAll(async () => {
    await servLocal(handlers, iac);
  });

  afterAll(async () => {
    await stopLocal();
  });

  it('returns 200 when handler registered', async () => {
    const res = await makeRequest(`http://localhost:${SI_LOCALSTACK_SERVER_PORT}/si_functions/`);

    expect(res.statusCode).toBe(200);
    expect(res.data).toContain('ok');
  });

  it('returns 404 for unknown route', async () => {
    const res = await makeRequest(
      `http://localhost:${SI_LOCALSTACK_SERVER_PORT}/unknown_route/path`,
    );

    expect(res.statusCode).toBe(404);
  });
});
