import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { parseYaml } from '../../src/parser';
import { setContext, clearContext, setIac } from '../../src/common/context';
import { loadState, saveState } from '../../src/common/stateManager';
import { createAliyunClient } from '../../src/common/aliyunClient';
import * as aliyunClient from '../../src/common/aliyunClient';
import { formatPlanItem } from '../../src/common/planFormatter';
import { buildPlanChange } from '../../src/common/jsonOutput';
import { applyPlanStateUpdates } from '../../src/common/refreshPlanner';
import { createApigwResource } from '../../src/stack/aliyunStack/apigwResource';
import { generateApigwPlan } from '../../src/stack/aliyunStack/apigwPlanner';
import { executeApigwPlan } from '../../src/stack/aliyunStack/apigwExecutor';
import { createMockAliyunClient } from './mockCloudClient';
import type { Context, EventDomain, StateFile } from '../../src/types';
import type {
  ApigwApiConfig,
  ApigwApiInfo,
  ApigwCustomDomainConfig,
  ApigwGroupInfo,
} from '../../src/common/aliyunClient';

describe('Aliyun gateway domain plan and repair convergence', () => {
  let directory: string;
  let context: Context;
  let event: EventDomain;
  let state: StateFile;
  let group: ApigwGroupInfo | null;
  let omitWwwSummary: boolean;
  let logConfig: { logType: string; slsProject: string; slsLogStore: string } | null;
  const domains = new Map<string, ApigwCustomDomainConfig>();
  const apis = new Map<string, ApigwApiInfo>();
  let client: ReturnType<typeof createMockAliyunClient>;
  const loadEvent = async (): Promise<EventDomain> => {
    const yaml = path.join(directory, 'si.yml');
    const iac = parseYaml(yaml);
    context.iac = iac;
    await setContext({ ...context, location: yaml, parameters: {}, stages: {} });
    setIac(iac);
    return iac.events![0];
  };
  const rewriteEvent = async (transform: (yaml: string) => string): Promise<EventDomain> => {
    const yaml = path.join(directory, 'si.yml');
    await fs.writeFile(yaml, transform(await fs.readFile(yaml, 'utf8')));
    return loadEvent();
  };
  const roundTrip = (value: StateFile): StateFile => {
    saveState(value, context.app, context.service, context.stage, directory);
    return loadState('aliyun', context.app, context.service, context.stage, directory);
  };
  const readEvent = async (
    domain = true,
    www: boolean | null = true,
    certificate = '100',
    backend = 'external-function',
    protocol: string | null = 'HTTPS',
    domainName = 'example.com',
  ): Promise<EventDomain> => {
    const yaml = path.join(directory, 'si.yml');
    await fs.writeFile(
      yaml,
      `version: 0.0.1
app: gateway-regression
service: sample
provider: { name: aliyun, region: cn-hangzhou }
events:
  gateway:
    name: sample-gateway
    type: API_GATEWAY
    triggers:
      - { method: GET, path: /api, backend: ${backend} }
${
  domain
    ? `    domain:
      domain_name: ${domainName}
${certificate ? `      certificate_id: '${certificate}'\n` : ''}${protocol ? `      protocol: ${protocol}\n` : ''}${www == null ? '' : `      www_bind_apex: ${www}\n`}
`
    : ''
}`,
    );
    return loadEvent();
  };
  const plan = () => generateApigwPlan({ ...context }, state, [event], context.service);
  const execute = async () => {
    const result = await executeApigwPlan(
      context,
      await plan(),
      [event],
      context.service,
      'role-arn',
      state,
    );
    expect(result.partialFailure).toBeUndefined();
    state = roundTrip(result.state);
  };

  beforeEach(async () => {
    directory = await fs.mkdtemp(path.join(os.tmpdir(), 'si-aliyun-gateway-'));
    context = {
      app: 'gateway-regression',
      service: 'sample',
      stage: 'dev',
      region: 'cn-hangzhou',
      provider: 'aliyun',
      accessKeyId: 'test',
      accessKeySecret: 'test',
      iacLocation: directory,
    } as Context;
    group = null;
    omitWwwSummary = false;
    logConfig = null;
    domains.clear();
    apis.clear();
    client = createMockAliyunClient();
    const projects = new Set<string>();
    const logstores = new Set<string>();
    const projectTags = new Map<string, Array<{ key: string; value: string }>>();
    client.sls.getProject.mockImplementation(async (projectName) =>
      projects.has(projectName) ? { projectName } : null,
    );
    client.sls.createProject.mockImplementation(async (projectName) => {
      projects.add(projectName);
      return { projectName };
    });
    client.sls.addTags.mockImplementation(async (config) => {
      projectTags.set(config.resourceId, config.tags);
    });
    client.sls.getProjectTags.mockImplementation(async (project) => projectTags.get(project) ?? []);
    client.sls.getLogstore.mockImplementation(async (project, logstoreName) =>
      logstores.has(`${project}/${logstoreName}`) ? { logstoreName } : null,
    );
    client.sls.createLogstore.mockImplementation(async (project, logstoreName) => {
      logstores.add(`${project}/${logstoreName}`);
      return { logstoreName };
    });
    client.apigw.describeGatewayLogConfig.mockImplementation(async () => logConfig);
    client.apigw.createGatewayLogConfig.mockImplementation(async (config) => {
      logConfig = { ...config, logType: 'PROVIDER' };
    });
    client.cas.getCertificate.mockImplementation(async (id: string) => ({
      cert: id === '200' ? 'PUBLIC-CERT-B' : 'PUBLIC-CERT-A',
      key: 'SYNTHETIC-PRIVATE-KEY',
    }));
    client.apigw.findApiGroupByName.mockImplementation(async () => group);
    client.apigw.createApiGroup.mockImplementation(async (config) => {
      group = { groupId: 'group-1', ...config, subDomain: 'group-1.example.net' };
      return 'group-1';
    });
    client.apigw.getApiGroup.mockImplementation(async () => ({
      ...group,
      customDomains: [...domains.values()]
        .filter((value) => !omitWwwSummary || !value.domainName.startsWith('www.'))
        .map((value) => ({
          domainName: value.domainName,
          certificateId: 'gateway-generated-id',
          isHttpRedirectToHttps: value.isHttpRedirectToHttps,
        })),
    }));
    client.apigw.getDomain.mockImplementation(async (_id: string, name: string) => {
      const value = domains.get(name);
      return value ? { domainName: name, certificateBody: value.certificateBody ?? null } : null;
    });
    client.apigw.updateApiGroup.mockImplementation(async (_id, config) => {
      group = { ...group, ...config };
    });
    client.apigw.createApi.mockImplementation(async (config: ApigwApiConfig) => {
      const id = `api-${apis.size}`;
      apis.set(id, { ...config, apiId: id });
      return id;
    });
    client.apigw.updateApi.mockImplementation(async (id: string, config: ApigwApiConfig) => {
      apis.set(id, { ...config, apiId: id });
    });
    client.apigw.getApi.mockImplementation(async (_group, id) => apis.get(id));
    client.apigw.listApisByGroup.mockImplementation(async () => [...apis.values()]);
    client.apigw.bindCustomDomain.mockImplementation(async (config, value) => {
      domains.set(config.domainName, { ...config });
      return value;
    });
    client.apigw.setDomainCertificate.mockImplementation(async (config) => {
      domains.set(config.domainName, {
        ...domains.get(config.domainName)!,
        certificateBody: config.certificateBody,
      });
    });
    client.apigw.deleteDomainCertificate.mockImplementation(async (_group, name) => {
      domains.get(name)!.certificateBody = undefined;
    });
    client.apigw.unbindCustomDomain.mockImplementation(async (_group, name) => {
      domains.delete(name);
    });
    jest
      .spyOn(aliyunClient, 'createAliyunClient')
      .mockReturnValue(client as unknown as ReturnType<typeof createAliyunClient>);
    event = await readEvent();
    state = roundTrip(
      await createApigwResource(
        context,
        event,
        context.service,
        'role-arn',
        loadState('aliyun', context.app, context.service, context.stage, directory),
      ),
    );
    expect((await plan()).items[0].action).toBe('noop');
    jest.clearAllMocks();
  });
  afterEach(async () => {
    jest.restoreAllMocks();
    clearContext();
    await fs.rm(directory, { recursive: true, force: true });
  });

  it('repairs only the changed www certificate and shows fingerprints in human and JSON output', async () => {
    domains.get('www.example.com')!.certificateBody = 'DIFFERENT-CERT';
    const item = (await plan()).items[0];
    expect(item).toMatchObject({
      action: 'update',
      gatewayUpdate: {
        group: false,
        apis: false,
        logging: false,
        domains: { 'www.example.com': { exists: true, binding: false, certificate: true } },
      },
    });
    expect(item.changes?.before).not.toEqual(item.changes?.after);
    const human = formatPlanItem(item, { colorize: false, indentSize: 2, keyAlignWidth: 0 });
    const json = JSON.stringify(buildPlanChange(item));
    expect(human).toContain('www.example.com');
    expect(human).toContain('certificateFingerprint');
    expect(json).toContain('certificateFingerprint');
    for (const value of ['DIFFERENT-CERT', 'PUBLIC-CERT-A', 'SYNTHETIC-PRIVATE-KEY']) {
      expect(human + json).not.toContain(value);
    }
    const oldInstances = state.resources['events.gateway'].instances;
    await execute();
    expect(client.apigw.setDomainCertificate).toHaveBeenCalledTimes(1);
    expect(client.apigw.setDomainCertificate).toHaveBeenCalledWith(
      expect.objectContaining({ domainName: 'www.example.com' }),
    );
    expect(client.apigw.bindCustomDomain).not.toHaveBeenCalled();
    expect(client.apigw.updateApiGroup).not.toHaveBeenCalled();
    expect(client.apigw.updateApi).not.toHaveBeenCalled();
    expect(client.apigw.deployApi).not.toHaveBeenCalled();
    expect(
      state.resources['events.gateway'].instances.filter(
        (instance) => instance.type === 'ALIYUN_APIGW_API',
      ),
    ).toEqual(oldInstances.filter((instance) => instance.type === 'ALIYUN_APIGW_API'));
    expect(state.resources['events.gateway'].definition).not.toHaveProperty('domainBindings');
    expect((await plan()).items[0].action).toBe('noop');
  });

  it('repairs a redirect on one existing domain without DNS checks or API redeployments', async () => {
    domains.get('www.example.com')!.isHttpRedirectToHttps = false;
    expect((await plan()).items[0].changes?.before?.domainBindings).toMatchObject({
      'www.example.com': { redirectToHttps: false },
    });
    await execute();
    expect(client.apigw.bindCustomDomain).toHaveBeenCalledTimes(1);
    expect(client.apigw.bindCustomDomain).toHaveBeenCalledWith(
      expect.objectContaining({ domainName: 'www.example.com', isHttpRedirectToHttps: true }),
      expect.anything(),
      'events.gateway',
      true,
    );
    expect(client.apigw.deployApi).not.toHaveBeenCalled();
    expect((await plan()).items[0].action).toBe('noop');
  });

  it('ignores an incomplete summary after confirming the domain exists', async () => {
    omitWwwSummary = true;
    expect((await plan()).items[0].action).toBe('noop');
    expect(client.apigw.getDomain).toHaveBeenCalledWith('group-1', 'www.example.com');
    expect(client.apigw.bindCustomDomain).not.toHaveBeenCalled();
  });

  it('does not repair a certificate whose public content is unavailable', async () => {
    client.apigw.getDomain.mockImplementation(async (_group, name) => ({
      domainName: name,
      certificateBody: undefined,
    }));
    expect((await plan()).items[0].action).toBe('noop');
    expect(client.apigw.setDomainCertificate).not.toHaveBeenCalled();
  });

  it('repairs only the group when group attributes drift', async () => {
    group!.description = 'console edit';
    await execute();
    expect(client.apigw.updateApiGroup).toHaveBeenCalledTimes(1);
    expect(client.apigw.updateApi).not.toHaveBeenCalled();
    expect(client.apigw.bindCustomDomain).not.toHaveBeenCalled();
    expect(client.apigw.setDomainCertificate).not.toHaveBeenCalled();
    expect((await plan()).items[0].action).toBe('noop');
  });

  it('enables logging without rewriting APIs or domains and retains it during a certificate repair', async () => {
    event = await rewriteEvent((yaml) =>
      yaml.replace('    type: API_GATEWAY', '    type: API_GATEWAY\n    log: true'),
    );
    expect((await plan()).items[0].gatewayUpdate).toMatchObject({
      logging: true,
      group: false,
      apis: false,
      domains: {},
    });
    await execute();
    expect(client.apigw.createGatewayLogConfig).toHaveBeenCalledTimes(1);
    expect(client.sls.createProject).toHaveBeenCalledTimes(1);
    expect(client.sls.createLogstore).toHaveBeenCalledTimes(1);
    expect(client.apigw.updateApi).not.toHaveBeenCalled();
    expect(client.apigw.bindCustomDomain).not.toHaveBeenCalled();
    const instance = state.resources['events.gateway'].instances.find(
      (value) => value.type === 'ALIYUN_APIGW_LOG_CONFIG',
    );
    expect(instance).toBeDefined();
    expect((await plan()).items[0].action).toBe('noop');
    jest.clearAllMocks();
    domains.get('www.example.com')!.certificateBody = 'DIFFERENT-CERT';
    await execute();
    expect(client.apigw.createGatewayLogConfig).not.toHaveBeenCalled();
    expect(client.sls.createLogstore).not.toHaveBeenCalled();
    expect(state.resources['events.gateway'].instances).toContainEqual(instance);
    expect((await plan()).items[0].action).toBe('noop');
  });

  it('repairs live logging drift while preserving the owned project and unrelated gateway settings', async () => {
    event = await rewriteEvent((yaml) =>
      yaml.replace('    type: API_GATEWAY', '    type: API_GATEWAY\n    log: true'),
    );
    await execute();
    logConfig = null;
    jest.clearAllMocks();
    const item = (await plan()).items[0];
    expect(item.gatewayUpdate).toMatchObject({ logging: true, group: false, apis: false });
    expect(item.changes?.before?.log).toMatchObject({ logEnabled: false });
    await execute();
    expect(client.apigw.createGatewayLogConfig).toHaveBeenCalledTimes(1);
    expect(client.sls.createProject).not.toHaveBeenCalled();
    expect(client.sls.createLogstore).not.toHaveBeenCalled();
    expect(client.apigw.updateApi).not.toHaveBeenCalled();
    expect(client.apigw.bindCustomDomain).not.toHaveBeenCalled();
    expect((await plan()).items[0].action).toBe('noop');
  });

  it.each([false, true])(
    'removes omitted logging intent and preserves a still-referenced logstore: %s',
    async (referenced) => {
      event = await rewriteEvent((yaml) =>
        yaml.replace('    type: API_GATEWAY', '    type: API_GATEWAY\n    log: true'),
      );
      await execute();
      const previousLog = state.resources['events.gateway'].definition.log;
      event = await rewriteEvent((yaml) => yaml.replace('    log: true\n', ''));
      if (!referenced) logConfig = null;
      jest.clearAllMocks();
      const item = (await plan()).items[0];
      expect(item.changes?.before?.log).toEqual(previousLog);
      expect(item.changes?.after).not.toHaveProperty('log');
      const local = await generateApigwPlan(
        { ...context, refresh: false },
        state,
        [event],
        context.service,
      );
      expect(local.items[0].changes?.before?.log).toEqual(previousLog);
      expect(local.items[0].changes?.after).not.toHaveProperty('log');
      await execute();
      expect(client.sls.deleteLogstore).toHaveBeenCalledTimes(referenced ? 0 : 1);
      expect(client.apigw.createGatewayLogConfig).not.toHaveBeenCalled();
      expect(client.apigw.updateApi).not.toHaveBeenCalled();
      expect(state.resources['events.gateway'].definition).not.toHaveProperty('log');
      expect(
        state.resources['events.gateway'].instances.some(
          (value) => value.type === 'ALIYUN_APIGW_LOG_CONFIG',
        ),
      ).toBe(false);
      expect((await plan()).items[0].action).toBe('noop');
    },
  );

  it('updates API intent without rebinding unchanged domains or leaving stale state', async () => {
    state.resources['events.gateway.dns_verification.primary'] = {
      mode: 'managed',
      region: context.region,
      definition: { domainName: 'example.com' },
      instances: [{ id: 'dns-primary', sid: 'dns-primary', type: 'CNAME' }],
      lastUpdated: '2026-01-01T00:00:00Z',
    };
    event = await readEvent(true, true, '100', 'another-external-function');
    await execute();
    expect(client.apigw.updateApi).toHaveBeenCalledTimes(1);
    expect(client.apigw.deployApi).toHaveBeenCalledTimes(1);
    expect(client.apigw.updateApiGroup).not.toHaveBeenCalled();
    expect(client.apigw.bindCustomDomain).not.toHaveBeenCalled();
    expect(state.resources['events.gateway'].definition.triggers).toEqual(event.triggers);
    const instances = state.resources['events.gateway'].instances;
    expect(new Set(instances.map((instance) => instance.sid)).size).toBe(instances.length);
    expect((await plan()).items[0].action).toBe('noop');
  });

  it('uses intent alone when refresh is disabled', async () => {
    event = await readEvent(true, true, '200');
    const item = (
      await generateApigwPlan({ ...context, refresh: false }, state, [event], context.service)
    ).items[0];
    expect(item.action).toBe('update');
    expect(item.gatewayUpdate).toBeUndefined();
    expect(item.drifted).toBeUndefined();
    expect(client.apigw.getApiGroup).not.toHaveBeenCalled();
    expect(client.apigw.getDomain).not.toHaveBeenCalled();
  });

  it('recreates only a domain confirmed absent by the detail endpoint', async () => {
    domains.delete('www.example.com');
    expect((await plan()).items[0].gatewayUpdate?.domains['www.example.com'].exists).toBe(false);
    await execute();
    expect(client.apigw.bindCustomDomain).toHaveBeenCalledTimes(1);
    expect(client.apigw.bindCustomDomain.mock.calls[0][0].domainName).toBe('www.example.com');
    expect(client.apigw.bindCustomDomain.mock.calls[0][3]).toBeUndefined();
    expect(client.apigw.deployApi).not.toHaveBeenCalled();
    expect((await plan()).items[0].action).toBe('noop');
  });

  it('rotates a declared certificate on both domains without API or DNS mutations', async () => {
    event = await readEvent(true, true, '200');
    await execute();
    expect(client.apigw.setDomainCertificate).toHaveBeenCalledTimes(2);
    expect(client.apigw.bindCustomDomain).not.toHaveBeenCalled();
    expect(client.apigw.updateApi).not.toHaveBeenCalled();
    expect((await plan()).items[0].action).toBe('noop');
  });

  it('adopts a new certificate reference when the effective certificate is already deployed', async () => {
    event = await readEvent(true, true, '300');
    const item = (await plan()).items[0];
    expect(item.action).toBe('noop');
    expect(item.stateUpdate).toBeDefined();
    state = roundTrip(applyPlanStateUpdates(state, [item]));
    expect(client.apigw.setDomainCertificate).not.toHaveBeenCalled();
    expect((await plan()).items[0].action).toBe('noop');
  });

  it('rotates only the certificate that does not already match the new reference', async () => {
    domains.get('example.com')!.certificateBody = 'PUBLIC-CERT-B';
    event = await readEvent(true, true, '200');
    await execute();
    expect(client.apigw.setDomainCertificate).toHaveBeenCalledTimes(1);
    expect(client.apigw.setDomainCertificate).toHaveBeenCalledWith(
      expect.objectContaining({ domainName: 'www.example.com' }),
    );
    expect(client.apigw.bindCustomDomain).not.toHaveBeenCalled();
    expect((await plan()).items[0].action).toBe('noop');
  });

  it('applies a changed certificate reference when public content is unavailable', async () => {
    client.apigw.getDomain.mockImplementation(async (_group, name) => ({ domainName: name }));
    event = await readEvent(true, true, '200');
    await execute();
    expect(client.apigw.setDomainCertificate).toHaveBeenCalledTimes(2);
    expect(client.apigw.bindCustomDomain).not.toHaveBeenCalled();
    expect((await plan()).items[0].action).toBe('noop');
  });

  it('removes an omitted owned www binding and then an omitted domain block', async () => {
    for (const [key, name] of [
      ['www', 'www.example.com'],
      ['primary', 'example.com'],
      ['foreign', 'unrelated.example.com'],
    ]) {
      state.resources[`events.gateway.dns_verification.${key}`] = {
        mode: 'managed',
        region: context.region,
        definition: { domainName: name },
        instances: [{ id: `dns-${key}`, sid: `dns-${key}`, type: 'CNAME' }],
        lastUpdated: '2026-01-01T00:00:00Z',
      };
    }
    event = await readEvent(true, null);
    await execute();
    expect(domains.has('www.example.com')).toBe(false);
    expect(domains.has('example.com')).toBe(true);
    expect(client.dns.deleteDomainRecord).toHaveBeenCalledWith('dns-www');
    expect(state.resources['events.gateway.dns_verification.www']).toBeUndefined();
    expect(state.resources['events.gateway.dns_verification.primary']).toBeDefined();
    expect((await plan()).items[0].action).toBe('noop');
    event = await readEvent(false);
    await execute();
    expect(domains.size).toBe(0);
    expect(client.dns.deleteDomainRecord).toHaveBeenCalledWith('dns-primary');
    expect(state.resources['events.gateway.dns_verification.primary']).toBeUndefined();
    expect(state.resources['events.gateway.dns_verification.foreign']).toBeDefined();
    expect(client.dns.deleteDomainRecord).not.toHaveBeenCalledWith('dns-foreign');
    expect(client.apigw.deployApi).toHaveBeenCalledTimes(1);
    expect((await plan()).items[0].action).toBe('noop');
  });

  it('replaces renamed primary and www bindings without redeploying unchanged APIs', async () => {
    event = await readEvent(true, true, '100', 'external-function', 'HTTPS', 'api.example.com');
    await execute();
    expect(client.apigw.unbindCustomDomain).toHaveBeenCalledWith('group-1', 'example.com');
    expect(client.apigw.unbindCustomDomain).toHaveBeenCalledWith('group-1', 'www.example.com');
    expect([...domains.keys()].sort()).toEqual(['api.example.com', 'www.api.example.com']);
    expect(client.apigw.bindCustomDomain).toHaveBeenCalledTimes(2);
    expect(client.apigw.deployApi).not.toHaveBeenCalled();
    expect((await plan()).items[0].action).toBe('noop');
  });

  it('removes www intent when the owned binding was already deleted in the cloud', async () => {
    domains.delete('www.example.com');
    client.apigw.unbindCustomDomain.mockRejectedValueOnce({ code: 'InvalidDomain.NotFound' });
    event = await readEvent(true, false);
    await execute();
    expect(client.apigw.unbindCustomDomain).toHaveBeenCalledWith('group-1', 'www.example.com');
    expect(client.apigw.bindCustomDomain).not.toHaveBeenCalled();
    expect(client.apigw.deployApi).not.toHaveBeenCalled();
    expect(state.resources['events.gateway'].definition.domain).toMatchObject({
      wwwBindApex: false,
    });
    expect((await plan()).items[0].action).toBe('noop');
  });

  it('adds domain configuration to an existing gateway whose saved domain is null', async () => {
    event = await readEvent(false);
    await execute();
    jest.clearAllMocks();
    event = await readEvent();
    const item = (await plan()).items[0];
    expect(item.gatewayUpdate).toMatchObject({ group: false, apis: true, logging: false });
    expect(item.changes?.before?.domainBindings).toMatchObject({
      'example.com': { exists: false },
    });
    await execute();
    expect(client.apigw.bindCustomDomain).toHaveBeenCalledTimes(2);
    expect(client.apigw.deployApi).toHaveBeenCalledTimes(1);
    expect(client.apigw.updateApiGroup).not.toHaveBeenCalled();
    expect((await plan()).items[0].action).toBe('noop');
  });

  it('restores the default protocol on omission and converges without rebinding default intent', async () => {
    event = await readEvent(true, true, '100', 'external-function', null);
    await execute();
    expect(client.apigw.deployApi).toHaveBeenCalledTimes(1);
    expect(client.apigw.bindCustomDomain).toHaveBeenCalledTimes(2);
    expect(domains.get('example.com')!.isHttpRedirectToHttps).toBe(false);
    expect(state.resources['events.gateway'].definition.domain).toMatchObject({ protocol: 'HTTP' });
    event = await readEvent(true, true, '100', 'external-function', 'HTTP');
    expect((await plan()).items[0].action).toBe('noop');
    event = await readEvent(true, true, '100', 'external-function', null);
    expect((await plan()).items[0].action).toBe('noop');
  });

  it('removes previously managed certificates without sending an empty upload', async () => {
    event = await readEvent(true, true, '100', 'external-function', 'HTTP');
    await execute();
    jest.clearAllMocks();
    event = await readEvent(true, true, '', 'external-function', 'HTTP');
    const item = (await plan()).items[0];
    expect(item.changes?.before?.domainBindings).toMatchObject({
      'example.com': { certificateFingerprint: expect.any(String) },
    });
    expect(item.changes?.after?.domainBindings).toMatchObject({
      'example.com': { certificateFingerprint: null },
    });
    const localItem = (
      await generateApigwPlan({ ...context, refresh: false }, state, [event], context.service)
    ).items[0];
    expect(localItem.action).toBe('update');
    expect(localItem.changes?.before).not.toEqual(localItem.changes?.after);
    await execute();
    expect(client.apigw.deleteDomainCertificate).toHaveBeenCalledTimes(2);
    expect(client.apigw.setDomainCertificate).not.toHaveBeenCalled();
    expect(client.apigw.bindCustomDomain).not.toHaveBeenCalled();
    expect(client.apigw.deployApi).not.toHaveBeenCalled();
    expect(domains.get('example.com')!.certificateBody).toBeUndefined();
    expect(state.resources['events.gateway'].definition.domain).toMatchObject({
      certificateId: null,
    });
    expect((await plan()).items[0].action).toBe('noop');
  });

  it('applies changed protocol intent even when the summary cannot report redirects', async () => {
    client.apigw.getApiGroup.mockImplementation(async () => ({ ...group, customDomains: [] }));
    event = await readEvent(true, true, '100', 'external-function', null);
    await execute();
    expect(client.apigw.bindCustomDomain).toHaveBeenCalledTimes(2);
    expect(domains.get('example.com')!.isHttpRedirectToHttps).toBe(false);
    expect((await plan()).items[0].action).toBe('noop');
  });

  it('keeps unowned and legacy placeholder DNS records when removing an owned domain', async () => {
    for (const [key, type, id, mode] of [
      ['placeholder', 'CNAME', 'existing', 'managed'],
      ['data', 'CNAME', 'external-id', 'data'],
      ['unsupported', 'A', 'address-id', 'managed'],
    ] as const) {
      state.resources[`events.gateway.dns_verification.${key}`] = {
        mode,
        region: context.region,
        definition: { domainName: 'www.example.com' },
        instances: [{ id, sid: id, type }],
        lastUpdated: '2026-01-01T00:00:00Z',
      };
    }
    event = await readEvent(true, false);
    const item = (await plan()).items;
    expect(item).toHaveLength(1);
    await execute();
    expect(client.dns.deleteDomainRecord).not.toHaveBeenCalled();
    expect(state.resources['events.gateway.dns_verification.placeholder']).toBeDefined();
    expect(state.resources['events.gateway.dns_verification.data']).toBeDefined();
    expect(state.resources['events.gateway.dns_verification.unsupported']).toBeDefined();
    expect((await plan()).items[0].action).toBe('noop');
  });

  it('retains intent on DNS deletion failure and tolerates already deleted records on retry', async () => {
    state.resources['events.gateway.dns_txt_verification.www_example_com'] = {
      mode: 'managed',
      region: context.region,
      definition: { domainName: 'www.example.com' },
      instances: [{ id: 'dns-txt', sid: 'dns-txt', type: 'TXT' }],
      lastUpdated: '2026-01-01T00:00:00Z',
    };
    event = await readEvent(true, false);
    const error = new Error('DNS AccessDenied');
    client.dns.deleteDomainRecord.mockRejectedValueOnce(error);
    const result = await executeApigwPlan(
      context,
      await plan(),
      [event],
      context.service,
      'role-arn',
      state,
    );
    expect(result.partialFailure?.error).toBe(error);
    expect(result.state).toBe(state);
    client.dns.deleteDomainRecord.mockRejectedValueOnce({ code: 'InvalidRecordId.NotFound' });
    await execute();
    expect(state.resources['events.gateway.dns_txt_verification.www_example_com']).toBeUndefined();
    expect((await plan()).items[0].action).toBe('noop');
  });

  it('stops on a failed domain probe and on a failed repair without saving new intent', async () => {
    const error = new Error('AccessDenied');
    client.apigw.getDomain.mockRejectedValueOnce(error);
    await expect(plan()).rejects.toBe(error);
    domains.get('www.example.com')!.certificateBody = 'DIFFERENT-CERT';
    client.apigw.setDomainCertificate.mockRejectedValueOnce(error);
    const item = (await plan()).items[0];
    const result = await executeApigwPlan(
      context,
      { items: [item] },
      [event],
      context.service,
      'role-arn',
      state,
    );
    expect(result.partialFailure?.error).toBe(error);
    expect(result.state).toBe(state);
  });
});
