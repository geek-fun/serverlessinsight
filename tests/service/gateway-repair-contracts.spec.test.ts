import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { parseYaml } from '../../src/parser';
import { setContext, clearContext, setIac } from '../../src/common/context';
import { loadState, saveState } from '../../src/common/stateManager';
import { ProviderEnum } from '../../src/common/providerEnum';
import { createVolcengineClient } from '../../src/common/volcengineClient';
import { createApigwResource } from '../../src/stack/volcengineStack/apigwResource';
import { generateApigwPlan } from '../../src/stack/volcengineStack/apigwPlanner';
import { executeApigwPlan } from '../../src/stack/volcengineStack/apigwExecutor';
import { createMockVolcengineClient } from './mockCloudClient';
import type { Context, StateFile } from '../../src/types';
import type {
  ApigwDomainConfig,
  ApigwUpstreamConfig,
  ApigwUpstreamInfo,
  ApigwRouteConfig,
  ApigwRouteInfo,
} from '../../src/common/volcengineClient/types';

jest.mock('../../src/common/volcengineClient', () => ({ createVolcengineClient: jest.fn() }));

it('repairs gateway certificates, targets and routes, then resets omitted owned bindings', async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'si-gateway-repair-'));
  const context = {
    provider: ProviderEnum.VOLCENGINE,
    app: 'gateway-tests',
    service: 'sample',
    stage: 'dev',
    region: 'cn-beijing',
    accessKeyId: 'test',
    accessKeySecret: 'test',
    iacLocation: directory,
  } as Context;
  const yaml = path.join(directory, 'si.yml');
  const parse = async (www?: boolean, domain = true) => {
    await fs.writeFile(
      yaml,
      'version: 0.0.1\napp: gateway-tests\nservice: sample\nprovider:\n  name: volcengine\n  region: cn-beijing\nevents:\n  gateway:\n    name: gateway\n    type: API_GATEWAY\n    network:\n      vpc_id: vpc-1\n      subnet_ids: [subnet-1, subnet-2]\n    triggers:\n      - method: GET\n        path: /api\n        backend: external-function\n' +
        (domain
          ? '    domain:\n      domain_name: example.com\n      certificate_id: cert-1\n      protocol: HTTPS\n' +
            (www === undefined ? '' : `      www_bind_apex: ${www}\n`)
          : ''),
    );
    const iac = parseYaml(yaml);
    context.iac = iac;
    await setContext({ ...context, parameters: {}, stages: {}, location: yaml });
    setIac(iac);
    return iac.events![0];
  };
  const roundTrip = (state: StateFile) => {
    saveState(state, context.app, context.service, context.stage, directory);
    return loadState(context.provider, context.app, context.service, context.stage, directory);
  };
  const upstreams = new Map<string, ApigwUpstreamInfo>();
  const routes = new Map<string, ApigwRouteInfo>();
  const domains = new Map<string, ApigwDomainConfig & { id: string }>();
  const raw = createMockVolcengineClient();
  raw.vefaas.getFunction.mockResolvedValue({ functionId: 'fn-1' });
  const routeInfo = (id: string, config: ApigwRouteConfig): ApigwRouteInfo => ({
    routeId: id,
    routeName: config.routeName,
    serviceId: config.serviceId,
    method: config.method,
    path: config.path,
    upstreamIds: [config.upstreamId],
    enable: true,
    priority: 0,
  });
  const apigw = {
    ...raw.apigw,
    findServerlessGateway: jest.fn().mockResolvedValue(null),
    findGatewayByName: jest.fn().mockResolvedValue(null),
    waitForGatewayRunning: jest.fn().mockResolvedValue({ gatewayId: 'gw-123' }),
    findServiceByName: jest.fn().mockResolvedValue(null),
    createService: jest.fn().mockResolvedValue('svc'),
    getService: jest.fn(async () => ({
      serviceId: 'svc',
      gatewayId: 'gw-123',
      customDomains: [...domains.values()].map((domain) => ({
        id: domain.id,
        domain: domain.domainName,
      })),
    })),
    findUpstreamByName: jest.fn(
      async (_gateway: string, name: string) =>
        [...upstreams.values()].find((upstream) => upstream.upstreamName === name) ?? null,
    ),
    createUpstream: jest.fn(async (config: ApigwUpstreamConfig) => {
      const id = `up-${upstreams.size}`;
      upstreams.set(id, { ...config, upstreamId: id });
      return id;
    }),
    getUpstream: jest.fn(async (id: string) => upstreams.get(id) ?? null),
    updateUpstream: jest.fn(async (id: string, config: ApigwUpstreamConfig) => {
      upstreams.set(id, { ...config, upstreamId: id });
    }),
    deleteUpstream: jest.fn(async (id: string) => {
      upstreams.delete(id);
    }),
    createRoute: jest.fn(async (config: ApigwRouteConfig) => {
      const id = `route-${routes.size}`;
      routes.set(id, routeInfo(id, config));
      return id;
    }),
    findRouteByName: jest.fn(
      async (_service: string, name: string) =>
        [...routes.values()].find((route) => route.routeName === name) ?? null,
    ),
    listRoutesByService: jest.fn(async () => [...routes.values()]),
    updateRoute: jest.fn(async (id: string, config: ApigwRouteConfig) => {
      routes.set(id, routeInfo(id, config));
    }),
    deleteRoute: jest.fn(async (id: string) => {
      routes.delete(id);
    }),
    createCustomDomain: jest.fn(async (config: ApigwDomainConfig) => {
      const id = config.domainName;
      domains.set(id, { ...config, id });
      return id;
    }),
    getCustomDomain: jest.fn(async (id: string) => domains.get(id) ?? null),
    updateCustomDomain: jest.fn(async (id: string, config: ApigwDomainConfig) => {
      domains.set(id, { ...config, id });
    }),
    deleteCustomDomain: jest.fn(async (id: string) => {
      domains.delete(id);
    }),
  };
  jest
    .mocked(createVolcengineClient)
    .mockReturnValue({ ...raw, apigw } as unknown as ReturnType<typeof createVolcengineClient>);
  try {
    let event = await parse(true);
    let state = roundTrip(
      await createApigwResource(
        context,
        event,
        context.service,
        loadState(context.provider, context.app, context.service, context.stage, directory),
      ),
    );
    domains.get('example.com')!.certificateId = 'edited-certificate';
    upstreams.get('up-0')!.functionId = 'wrong-function';
    routes.get('route-0')!.path = '/wrong';
    const plan = await generateApigwPlan({ ...context }, state, [event], context.service);
    expect(plan.items[0]).toMatchObject({ action: 'update', drifted: true });
    const repaired = await executeApigwPlan(context, plan, [event], context.service, state);
    expect(repaired.partialFailure).toBeUndefined();
    state = roundTrip(repaired.state);
    expect(domains.get('example.com')!.certificateId).toBe('cert-1');
    expect(upstreams.get('up-0')!.functionId).toBe('fn-1');
    expect(routes.get('route-0')!.path).toBe('/api');
    expect(
      (await generateApigwPlan({ ...context }, state, [event], context.service)).items[0].action,
    ).toBe('noop');
    event = await parse();
    const removedWww = await executeApigwPlan(
      context,
      await generateApigwPlan({ ...context }, state, [event], context.service),
      [event],
      context.service,
      state,
    );
    expect(removedWww.partialFailure).toBeUndefined();
    state = roundTrip(removedWww.state);
    expect(domains.has('www.example.com')).toBe(false);
    expect(
      (await generateApigwPlan({ ...context }, state, [await parse(false)], context.service))
        .items[0].action,
    ).toBe('noop');
    event = await parse(undefined, false);
    const removalPlan = await generateApigwPlan({ ...context }, state, [event], context.service);
    expect(removalPlan.items[0].action).toBe('update');
    const removed = await executeApigwPlan(context, removalPlan, [event], context.service, state);
    expect(removed.partialFailure).toBeUndefined();
    state = roundTrip(removed.state);
    expect(domains.size).toBe(0);
    expect(
      (await generateApigwPlan({ ...context }, state, [event], context.service)).items[0].action,
    ).toBe('noop');
  } finally {
    clearContext();
    jest.clearAllMocks();
    await fs.rm(directory, { recursive: true, force: true });
  }
});
