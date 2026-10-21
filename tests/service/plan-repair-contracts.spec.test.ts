import type OSS from 'ali-oss';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import JSZip from 'jszip';

import { createOssOperations } from '../../src/common/aliyunClient/ossOperations';
import {
  bucketToOssBucketConfig,
  extractOssBucketDefinition,
} from '../../src/stack/aliyunStack/ossTypes';
import { parseYaml } from '../../src/parser';
import { loadState, saveState, setResource } from '../../src/common/stateManager';
import { ProviderEnum } from '../../src/common/providerEnum';
import { createAliyunClient } from '../../src/common/aliyunClient';
import { createTencentClient } from '../../src/common/tencentClient';
import { setContext, clearContext } from '../../src/common/context';
import { createFc3Operations } from '../../src/common/aliyunClient/fc3Operations';
import { generateFunctionPlan as planFc3 } from '../../src/stack/aliyunStack/fc3Planner';
import { createResource as createFc3 } from '../../src/stack/aliyunStack/fc3Resource';
import { executeFunctionPlan as executeFc3 } from '../../src/stack/aliyunStack/fc3Executor';
import { createScfOperations } from '../../src/common/tencentClient/scfOperations';
import { generateBucketPlan as planOss } from '../../src/stack/aliyunStack/ossPlanner';
import {
  createBucketResource as createOss,
  updateBucketResource as updateOss,
  deleteBucketResource as deleteOss,
} from '../../src/stack/aliyunStack/ossResource';
import { generateBucketPlan as planCos } from '../../src/stack/scfStack/cosPlanner';
import {
  createBucketResource as createCos,
  updateBucketResource as updateCos,
  deleteBucketResource as deleteCos,
} from '../../src/stack/scfStack/cosResource';
import { generateFunctionPlan } from '../../src/stack/scfStack/scfPlanner';
import { createResource } from '../../src/stack/scfStack/scfResource';
import { executeFunctionPlan } from '../../src/stack/scfStack/scfExecutor';
import { createMockAliyunClient, createMockTencentClient } from './mockCloudClient';

import type { Context, StateFile } from '../../src/types';

jest.mock('../../src/common/aliyunClient', () => ({ createAliyunClient: jest.fn() }));
jest.mock('../../src/common/tencentClient', () => ({ createTencentClient: jest.fn() }));

describe('deployment read and ownership repair contracts', () => {
  let directory: string;
  const base = 'version: 0.0.1\napp: repair-tests\nservice: sample\n';
  const contextFor = (provider: ProviderEnum): Context => ({
    provider,
    app: 'repair-tests',
    service: 'sample',
    stage: 'dev',
    region: provider === ProviderEnum.ALIYUN ? 'cn-hangzhou' : 'ap-guangzhou',
    accessKeyId: 'test',
    accessKeySecret: 'test',
    iacLocation: 'test.yml',
    parameters: [],
    stages: {},
  });
  const roundTrip = (state: StateFile, context: Context): StateFile => {
    saveState(state, context.app, context.service, context.stage, directory);
    return loadState(context.provider, context.app, context.service, context.stage, directory);
  };
  beforeEach(async () => {
    directory = await fs.mkdtemp(path.join(os.tmpdir(), 'si-repair-contract-'));
  });
  afterEach(async () => {
    clearContext();
    jest.clearAllMocks();
    await fs.rm(directory, { recursive: true, force: true });
  });

  it.each([ProviderEnum.ALIYUN, ProviderEnum.TENCENT])(
    '%s retains an omitted www binding through persistence and later removes owned bindings',
    async (provider) => {
      const context = contextFor(provider);
      const yamlPath = path.join(directory, 'bucket.yml');
      const writeBucket = async (options: { www?: boolean; index: string; domain?: string }) => {
        const websitePath = path.join(directory, 'website');
        await fs.mkdir(websitePath, { recursive: true });
        await fs.writeFile(
          yamlPath,
          base +
            `provider:\n  name: ${provider}\n  region: ${context.region}\nbuckets:\n  assets:\n    name: synthetic-assets\n    website:\n      code: ${websitePath}\n      index: ${options.index}\n` +
            (options.domain
              ? `      domain:\n        domain_name: ${options.domain}\n` +
                (options.www !== undefined ? `        www_bind_apex: ${options.www}\n` : '')
              : ''),
        );
        return parseYaml(yamlPath).buckets![0];
      };
      const bindings = new Set<string>();
      const bind = jest.fn(async (_bucket: string, domain: string) => {
        bindings.add(domain);
        return {
          domain,
          cname: 'synthetic-endpoint',
          dnsRecordId: domain,
          bucketCnameBound: true,
          bucketDomainBound: true,
        };
      });
      const unbind = jest.fn(async (_bucket: string, domain: string) => {
        bindings.delete(domain);
      });
      let website = { indexDocument: 'index.html', errorDocument: 'index.html' };
      const aliyun = createMockAliyunClient();
      const tencent = createMockTencentClient();
      const oss = {
        ...aliyun.oss,
        uploadFiles: jest.fn(),
        getBucket: jest.fn(async () => ({
          name: 'synthetic-assets',
          websiteConfig: website,
          policy: null,
          tags: [{ key: 'si-owned-by', value: 'repair-tests-sample:buckets.assets' }],
        })),
        updateBucketWebsite: jest.fn(async (_name: string, config: typeof website) => {
          website = config;
        }),
        bindCustomDomain: bind,
        unbindCustomDomain: unbind,
      };
      const cos = {
        ...tencent.cos,
        createBucket: jest.fn(),
        getBucket: jest.fn(async () => ({
          Name: 'synthetic-assets',
          Location: context.region,
          WebsiteConfiguration: {
            IndexDocument: { Suffix: website.indexDocument },
            ErrorDocument: { Key: website.errorDocument },
          },
          Policy: null,
          Tags: [{ Key: 'si-owned-by', Value: 'repair-tests-sample:buckets.assets' }],
        })),
        updateBucketWebsite: jest.fn(
          async (
            _name: string,
            _region: string,
            config: { IndexDocument: { Suffix: string }; ErrorDocument?: { Key: string } },
          ) => {
            website = {
              indexDocument: config.IndexDocument.Suffix,
              errorDocument: config.ErrorDocument?.Key ?? config.IndexDocument.Suffix,
            };
          },
        ),
        bindCustomDomain: bind,
        unbindCustomDomain: unbind,
        deleteBucketPolicy: jest.fn(),
      };
      jest
        .mocked(createAliyunClient)
        .mockReturnValue({ ...aliyun, oss } as unknown as ReturnType<typeof createAliyunClient>);
      jest
        .mocked(createTencentClient)
        .mockReturnValue({ ...tencent, cos } as unknown as ReturnType<typeof createTencentClient>);
      const create = provider === ProviderEnum.ALIYUN ? createOss : createCos;
      const update = provider === ProviderEnum.ALIYUN ? updateOss : updateCos;
      const plan = provider === ProviderEnum.ALIYUN ? planOss : planCos;
      const destroy = (state: StateFile) =>
        provider === ProviderEnum.ALIYUN
          ? deleteOss(context, 'synthetic-assets', 'buckets.assets', state)
          : deleteCos(context, 'synthetic-assets', context.region, 'buckets.assets', state);
      let bucket = await writeBucket({ domain: 'example.com', www: true, index: 'index.html' });
      let state = loadState(provider, context.app, context.service, context.stage, directory);
      state = roundTrip(await create(context, bucket, state), context);
      const www = state.resources['buckets.assets'].instances.find((i) => i.isWwwVariant);
      expect(www).toBeDefined();
      bucket = await writeBucket({ domain: 'example.com', index: 'next.html' });
      // Changing another domain setting also exercises OSS's domain reconciliation branch.
      bucket = {
        ...bucket,
        domain: { ...bucket.domain!, protocol: ['HTTP'] },
        website: { ...bucket.website!, domain_protocol: ['HTTP'] },
      };
      expect((await plan({ ...context }, state, [bucket])).items[0].action).toBe('update');
      state = roundTrip(await update(context, bucket, state), context);
      expect(state.resources['buckets.assets'].instances.find((i) => i.isWwwVariant)).toEqual(www);
      expect(bindings.has('www.example.com')).toBe(true);
      expect((await plan({ ...context }, state, [bucket])).items[0].action).toBe('noop');
      bucket = await writeBucket({ domain: 'example.com', www: false, index: 'next.html' });
      state = roundTrip(await update(context, bucket, state), context);
      expect(bindings.has('www.example.com')).toBe(false);
      expect(state.resources['buckets.assets'].instances.some((i) => i.isWwwVariant)).toBe(false);
      expect((await plan({ ...context }, state, [bucket])).items[0].action).toBe('noop');
      // Restore www, then remove the parent declaration: both owned bindings disappear.
      bucket = await writeBucket({ domain: 'example.com', www: true, index: 'next.html' });
      state = roundTrip(await update(context, bucket, state), context);
      bucket = await writeBucket({ index: 'next.html' });
      expect((await plan({ ...context }, state, [bucket])).items[0].action).toBe('update');
      state = roundTrip(await update(context, bucket, state), context);
      expect(bindings.size).toBe(0);
      expect((await plan({ ...context }, state, [bucket])).items[0].action).toBe('noop');
      // Destroy also removes a retained child after an omitted flag.
      bucket = await writeBucket({ domain: 'example.com', www: true, index: 'next.html' });
      state = await update(context, bucket, state);
      bucket = await writeBucket({ domain: 'example.com', index: 'next.html' });
      state = roundTrip(await update(context, bucket, state), context);
      await destroy(state);
      expect(bindings.size).toBe(0);
    },
  );

  it.each([false, true])(
    'OSS read failure stops planning without state changes (existing state %s)',
    async (existing) => {
      const context = contextFor(ProviderEnum.ALIYUN);
      const yamlPath = path.join(directory, 'policy.yml');
      await fs.writeFile(
        yamlPath,
        base +
          `provider:\n  name: aliyun\n  region: cn-hangzhou\nbuckets:\n  assets:\n    name: synthetic-assets\n    iam:\n      resource:\n        statements:\n          - effect: Allow\n            principal: { AWS: '*' }\n            action: ['oss:GetObject']\n            resource: ['acs:oss:*:*:synthetic-assets/*']\n`,
      );
      const bucket = parseYaml(yamlPath).buckets![0];
      const sdk = {
        useBucket: jest.fn(),
        getBucketInfo: jest.fn().mockResolvedValue({ bucket: { Name: bucket.name } }),
        getBucketACL: jest.fn().mockResolvedValue({}),
        getBucketWebsite: jest.fn().mockResolvedValue({}),
        getBucketVersioning: jest.fn().mockResolvedValue({}),
        getBucketEncryption: jest.fn().mockResolvedValue({}),
        getBucketPolicy: jest.fn(),
        request: jest.fn().mockResolvedValue({ data: '' }),
      };
      const client = createMockAliyunClient();
      const writePolicy = jest.fn();
      const cloudClient = {
        ...client,
        oss: {
          ...client.oss,
          putBucketPolicy: writePolicy,
          getBucket: createOssOperations(sdk as unknown as OSS, context.region).getBucket,
        },
      };
      jest
        .mocked(createAliyunClient)
        .mockReturnValue(cloudClient as unknown as ReturnType<typeof createAliyunClient>);
      let state = loadState(
        context.provider,
        context.app,
        context.service,
        context.stage,
        directory,
      );
      if (existing)
        state = setResource(state, 'buckets.assets', {
          mode: 'managed',
          region: context.region,
          definition: extractOssBucketDefinition(bucketToOssBucketConfig(bucket)),
          instances: [],
          lastUpdated: '',
        });
      state = roundTrip(state, context);
      const before = JSON.stringify(state);
      for (const code of ['AccessDenied', 'ECONNRESET']) {
        const error = Object.assign(new Error(code), { code });
        sdk.getBucketPolicy.mockRejectedValueOnce(error);
        await expect(planOss({ ...context }, state, [bucket])).rejects.toBe(error);
      }
      sdk.getBucketPolicy.mockResolvedValueOnce({ policy: '{invalid' });
      await expect(planOss({ ...context }, state, [bucket])).rejects.toThrow(SyntaxError);
      expect(
        JSON.stringify(
          loadState(context.provider, context.app, context.service, context.stage, directory),
        ),
      ).toBe(before);
      expect(client.oss.createBucket).not.toHaveBeenCalled();
      expect(writePolicy).not.toHaveBeenCalled();
    },
  );

  it('FC3 repairs HTTP and domain drift together and converges after reloading state', async () => {
    const context = contextFor(ProviderEnum.ALIYUN);
    const codePath = path.join(directory, 'code.zip');
    await fs.writeFile(
      codePath,
      await new JSZip()
        .file('index.js', 'exports.handler = () => 1;')
        .generateAsync({ type: 'nodebuffer' }),
    );
    const yamlPath = path.join(directory, 'function.yml');
    await fs.writeFile(
      yamlPath,
      base +
        `provider:\n  name: aliyun\n  region: cn-hangzhou\nfunctions:\n  handler:\n    name: synthetic-handler\n    code:\n      runtime: nodejs18\n      handler: index.handler\n      path: ${codePath}\n    iam:\n      role: acs:ram::123:role/external\n    triggers:\n      http:\n        auth_type: public\n    domain:\n      domain_name: api.example.com\n      protocol: HTTP\n`,
    );
    const fn = parseYaml(yamlPath).functions![0];
    await setContext({ ...context, parameters: {}, stages: {}, location: yamlPath });
    const client = createMockAliyunClient();
    let remote: Record<string, unknown> = {};
    let triggers: Array<Record<string, unknown>> = [];
    let domain: Record<string, unknown> | null = null;
    const domainSdk = {
      createCustomDomain: jest.fn(async (request: { body: Record<string, unknown> }) => {
        domain = request.body;
      }),
      deleteCustomDomain: jest.fn(async () => {
        if (!domain) throw { code: 'CustomDomainNotFound' };
        domain = null;
      }),
      getCustomDomain: jest.fn(async () => {
        if (!domain) throw { code: 'CustomDomainNotFound' };
        return { body: domain };
      }),
    };
    const domains = createFc3Operations(domainSdk as never);
    client.fc3.createFunction.mockImplementation(async (config: Record<string, unknown>) => {
      remote = config;
    });
    client.fc3.getFunction.mockImplementation(async () => remote);
    client.fc3.listTriggers.mockImplementation(async () => triggers);
    client.fc3.createTrigger.mockImplementation(
      async (
        _name: string,
        triggerName: string,
        triggerType: string,
        triggerConfig: Record<string, unknown>,
      ) => {
        triggers = [{ triggerName, triggerType, triggerConfig }];
      },
    );
    client.fc3.deleteTrigger.mockImplementation(async () => {
      triggers = [];
    });
    const fc3 = {
      ...client.fc3,
      createCustomDomain: domains.createCustomDomain,
      deleteCustomDomain: domains.deleteCustomDomain,
      getCustomDomain: domains.getCustomDomain,
    };
    jest
      .mocked(createAliyunClient)
      .mockReturnValue({ ...client, fc3 } as unknown as ReturnType<typeof createAliyunClient>);
    let state = loadState(context.provider, context.app, context.service, context.stage, directory);
    state = roundTrip(await createFc3(context, fn, state), context);
    domain = null;
    triggers = triggers.map((trigger) => ({
      ...trigger,
      triggerConfig: { authType: 'function', methods: ['GET'] },
    }));
    const plan = await planFc3({ ...context }, state, [fn]);
    expect(plan.items[0].driftReasons).toEqual([
      'PLAN_DRIFT_HTTP_TRIGGER',
      'PLAN_DRIFT_FUNCTION_DOMAIN',
    ]);
    const repaired = await executeFc3(context, plan, [fn], state);
    expect(repaired.partialFailure).toBeUndefined();
    state = roundTrip(repaired.state, context);
    expect(domain).toMatchObject({ domainName: 'api.example.com', protocol: 'HTTP' });
    expect((await planFc3({ ...context }, state, [fn])).items[0].action).toBe('noop');
  });

  it.each([undefined, 'Event', 'HTTP'])(
    'SCF repairs simultaneous drift and retries failed recreation with function type %s',
    async (functionType) => {
      const context = contextFor(ProviderEnum.TENCENT);
      const codePath = path.join(directory, 'code.zip');
      await fs.writeFile(
        codePath,
        await new JSZip()
          .file('index.js', 'exports.handler = () => 1;')
          .generateAsync({ type: 'nodebuffer' }),
      );
      const yamlPath = path.join(directory, 'function.yml');
      await fs.writeFile(
        yamlPath,
        base +
          `provider:\n  name: tencent\n  region: ap-guangzhou\nfunctions:\n  handler:\n    name: synthetic-handler\n    code:\n      runtime: nodejs18\n      handler: index.handler\n      path: ${codePath}\n    iam:\n      role: external-role\n    triggers:\n      http:\n        auth_type: public\n    domain:\n      domain_name: api.example.com\n      protocol: HTTP\n`,
      );
      const fn = parseYaml(yamlPath).functions![0];
      const raw = createMockTencentClient();
      let remote: Record<string, unknown> = {};
      let triggers: Array<Record<string, unknown>> = [];
      let domain: Record<string, unknown> | null = null;
      raw.scf.CreateFunction.mockImplementation(async (config: Record<string, unknown>) => {
        remote = { ...config, Status: 'Active', Type: functionType };
      });
      raw.scf.GetFunction.mockImplementation(async () => ({ ...remote, Triggers: triggers }));
      raw.scf.CreateTrigger.mockImplementation(async (config: Record<string, unknown>) => {
        triggers = [{ ...config, TriggerName: 'cloud-http-id', Enable: 1 }];
      });
      raw.scf.DeleteTrigger.mockImplementation(async () => {
        triggers = [];
      });
      raw.scf.CreateCustomDomain.mockImplementation(async (config: Record<string, unknown>) => {
        domain = config;
      });
      raw.scf.GetCustomDomain.mockImplementation(async () => {
        if (!domain) throw { code: 'ResourceNotFound' };
        return domain;
      });
      raw.scf.DeleteCustomDomain.mockImplementation(async () => {
        if (!domain) throw { code: 'ResourceNotFound' };
        domain = null;
      });
      const scf = createScfOperations(raw.scf as never, {
        tag: { TagResources: jest.fn() } as never,
        cam: { GetUserAppId: jest.fn().mockResolvedValue({ OwnerUin: '123' }) } as never,
        region: context.region,
        namespace: 'default',
      });
      jest
        .mocked(createTencentClient)
        .mockReturnValue({ ...raw, scf } as unknown as ReturnType<typeof createTencentClient>);
      let state = loadState(
        context.provider,
        context.app,
        context.service,
        context.stage,
        directory,
      );
      state = roundTrip(await createResource(context, fn, state), context);
      domain = null;
      triggers = triggers.map((trigger) => ({
        ...trigger,
        TriggerDesc: JSON.stringify({
          AuthType: 'CAM',
          NetConfig: { EnableExtranet: false, EnableIntranet: true },
        }),
      }));
      const plan = await generateFunctionPlan({ ...context }, state, [fn]);
      expect(plan.items[0].driftReasons).toEqual([
        'PLAN_DRIFT_HTTP_TRIGGER',
        'PLAN_DRIFT_FUNCTION_DOMAIN',
      ]);
      raw.scf.CreateCustomDomain.mockRejectedValueOnce(new Error('temporary create failure'));
      const failed = await executeFunctionPlan(context, plan, [fn], state);
      expect(failed.partialFailure).toBeDefined();
      expect(domain).toBeNull();
      const retry = await generateFunctionPlan({ ...context }, failed.state, [fn]);
      const repaired = await executeFunctionPlan(context, retry, [fn], failed.state);
      expect(repaired.partialFailure).toBeUndefined();
      state = roundTrip(repaired.state, context);
      expect(domain).toMatchObject({ Domain: 'api.example.com', Protocol: 'HTTP' });
      expect(
        state.resources['functions.handler'].instances.filter(
          (instance) => instance.functionName === fn.name,
        ),
      ).toHaveLength(1);
      expect((await generateFunctionPlan({ ...context }, state, [fn])).items[0]).toEqual({
        logicalId: 'functions.handler',
        resourceType: 'SCF',
        action: 'noop',
      });
    },
  );
});
