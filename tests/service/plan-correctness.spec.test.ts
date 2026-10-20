import { setContext, clearContext } from '../../src/common/context';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import JSZip from 'jszip';
import { parseYaml } from '../../src/parser';
import { ProviderEnum } from '../../src/common/providerEnum';
import { createAliyunClient } from '../../src/common/aliyunClient';
import { applyPlanStateUpdates } from '../../src/common/refreshPlanner';
import { loadState, saveState } from '../../src/common/stateManager';
import { generateBucketPlan } from '../../src/stack/aliyunStack/ossPlanner';
import {
  createBucketResource,
  updateBucketResource,
} from '../../src/stack/aliyunStack/ossResource';
import { generateFunctionPlan } from '../../src/stack/aliyunStack/fc3Planner';
import { createResource } from '../../src/stack/aliyunStack/fc3Resource';
import { executeFunctionPlan } from '../../src/stack/aliyunStack/fc3Executor';
import { createMockAliyunClient } from './mockCloudClient';
import type { Context } from '../../src/types';

jest.mock('../../src/common/aliyunClient', () => ({ createAliyunClient: jest.fn() }));

describe('effective deployment plan convergence', () => {
  let directory: string;
  const baseYaml =
    'version: 0.0.1\napp: plan-regression\nservice: example\nprovider:\n  name: aliyun\n  region: cn-hangzhou\n';
  const context: Context = {
    provider: ProviderEnum.ALIYUN,
    region: 'cn-hangzhou',
    stage: 'dev',
    app: 'plan-regression',
    service: 'example',
    accessKeyId: 'test',
    accessKeySecret: 'test',
    accountId: '123456789012',
    iacLocation: 'test.yml',
    parameters: [],
    stages: {},
  };

  beforeEach(async () => {
    directory = await fs.mkdtemp(path.join(os.tmpdir(), 'si-plan-regression-'));
  });
  afterEach(async () => {
    await fs.rm(directory, { recursive: true, force: true });
    jest.clearAllMocks();
    clearContext();
  });

  it('repairs an effective bucket policy, removes an omitted owned policy, clears explicitly and converges', async () => {
    const yamlPath = path.join(directory, 'bucket.yml');
    await fs.writeFile(
      yamlPath,
      baseYaml +
        `buckets:
  assets:
    name: synthetic-assets
    iam:
      resource:
        statements:
          - effect: Allow
            principal: { AWS: '*' }
            action: ['oss:GetObject']
            resource: ['acs:oss:*:*:synthetic-assets/*']
`,
    );
    const bucket = parseYaml(yamlPath).buckets![0];
    const client = createMockAliyunClient();
    let remote: Record<string, unknown> | null = null;
    const oss = {
      ...client.oss,
      createBucket: jest.fn(
        async (config: { bucketName: string; Tags: { Key: string; Value: string }[] }) => {
          remote = {
            name: config.bucketName,
            tags: config.Tags.map(({ Key, Value }) => ({ key: Key, value: Value })),
          };
        },
      ),
      getBucket: jest.fn(async () => remote),
      putBucketPolicy: jest.fn(async (_name: string, policy: Record<string, unknown>) => {
        remote = { ...(remote as Record<string, unknown> | null), policy: JSON.stringify(policy) };
      }),
      deleteBucketPolicy: jest.fn(async () => {
        remote = { ...(remote as Record<string, unknown> | null), policy: undefined };
      }),
    };
    jest
      .mocked(createAliyunClient)
      .mockReturnValue({ ...client, oss } as unknown as ReturnType<typeof createAliyunClient>);
    let state = loadState('aliyun', context.app, context.service, context.stage, directory);
    state = await createBucketResource(context, bucket, state);
    expect((await generateBucketPlan({ ...context }, state, [bucket])).items[0].action).toBe(
      'noop',
    );

    remote = {
      ...(remote as Record<string, unknown> | null),
      policy: JSON.stringify({ Version: '1', Statement: [] }),
    };
    const drift = (await generateBucketPlan({ ...context }, state, [bucket])).items[0];
    expect(drift).toMatchObject({
      action: 'update',
      drifted: true,
      revertKeys: ['policy.Statement'],
    });
    state = await updateBucketResource(context, bucket, state);
    expect(oss.putBucketPolicy).toHaveBeenCalledTimes(2);
    expect((await generateBucketPlan({ ...context }, state, [bucket])).items[0].action).toBe(
      'noop',
    );
    const omitted = { ...bucket, iam: undefined };
    expect((await generateBucketPlan({ ...context }, state, [omitted])).items[0].action).toBe(
      'update',
    );
    expect(oss.deleteBucketPolicy).not.toHaveBeenCalled();
    state = await updateBucketResource(context, omitted, state);
    expect(oss.deleteBucketPolicy).toHaveBeenCalledTimes(1);
    expect((await generateBucketPlan({ ...context }, state, [omitted])).items[0].action).toBe(
      'noop',
    );

    state = await updateBucketResource(context, bucket, state);
    const cleared = { ...bucket, iam: { resource: { statements: [] } } };
    expect((await generateBucketPlan({ ...context }, state, [cleared])).items[0].action).toBe(
      'update',
    );
    state = await updateBucketResource(context, cleared, state);
    expect(oss.deleteBucketPolicy).toHaveBeenCalledTimes(2);
    expect((await generateBucketPlan({ ...context }, state, [cleared])).items[0].action).toBe(
      'noop',
    );
  });

  it('applies state-only convergence without changing the cloud and persists it', async () => {
    const client = createMockAliyunClient();
    const oss = {
      ...client.oss,
      getBucket: jest.fn(async () => ({ name: 'synthetic-assets', acl: 'public-read' })),
    };
    jest
      .mocked(createAliyunClient)
      .mockReturnValue({ ...client, oss } as unknown as ReturnType<typeof createAliyunClient>);
    const state = loadState('aliyun', context.app, context.service, context.stage, directory);
    const current = {
      ...state,
      resources: {
        'buckets.assets': {
          mode: 'managed' as const,
          region: context.region,
          definition: { bucketName: 'synthetic-assets', acl: 'private' },
          instances: [],
          lastUpdated: new Date().toISOString(),
        },
      },
    };
    const yamlPath = path.join(directory, 'bucket.yml');
    await fs.writeFile(
      yamlPath,
      baseYaml +
        'buckets:\n  assets:\n    name: synthetic-assets\n    security:\n      acl: PUBLIC_READ\n',
    );
    const buckets = parseYaml(yamlPath).buckets;
    const plan = await generateBucketPlan({ ...context }, current, buckets);
    expect(plan.items[0]).toMatchObject({ action: 'noop', stateUpdate: { acl: 'public-read' } });
    expect(current.resources['buckets.assets'].definition.acl).toBe('private');
    const adopted = applyPlanStateUpdates(current, plan.items);
    saveState(adopted, context.app, context.service, context.stage, directory);
    const restored = loadState('aliyun', context.app, context.service, context.stage, directory);
    expect(restored.resources['buckets.assets'].definition.acl).toBe('public-read');
    expect((await generateBucketPlan({ ...context }, restored, buckets)).items[0]).toMatchObject({
      action: 'noop',
    });
    expect(oss.createBucket).not.toHaveBeenCalled();
  });

  it('changes only code when live VPC and NAS defaults are unmanaged, then converges', async () => {
    const zipPath = path.join(directory, 'function.zip');
    const writeCode = async (value: string) => {
      const zip = new JSZip();
      zip.file('index.js', value);
      await fs.writeFile(zipPath, await zip.generateAsync({ type: 'nodebuffer' }));
    };
    await writeCode('exports.handler = () => 1;');
    const yamlPath = path.join(directory, 'function.yml');
    await fs.writeFile(
      yamlPath,
      baseYaml +
        `functions:
  api:
    name: synthetic-function
    code:
      path: ${JSON.stringify(zipPath)}
      runtime: nodejs20
      handler: index.handler
    memory: 512
    timeout: 10
`,
    );
    const functions = parseYaml(yamlPath).functions!;
    await setContext({
      app: context.app,
      service: context.service,
      stage: context.stage,
      provider: context.provider,
      region: context.region,
      accessKeyId: 'test',
      accessKeySecret: 'test',
      location: yamlPath,
    });
    const client = createMockAliyunClient();
    jest
      .mocked(createAliyunClient)
      .mockReturnValue(client as unknown as ReturnType<typeof createAliyunClient>);
    let state = loadState('aliyun', context.app, context.service, context.stage, directory);
    state = await createResource(context, functions[0], state);
    const live = await client.fc3.getFunction(functions[0].name);
    client.fc3.getFunction.mockResolvedValue({
      ...live,
      vpcConfig: { vpcId: 'vpc-default', vSwitchIds: ['vsw-default'] },
      nasConfig: { userId: -1, groupId: -1, mountPoints: [] },
    });
    await writeCode('exports.handler = () => 2;');
    const plan = await generateFunctionPlan({ ...context }, state, functions);
    expect(plan.items[0]).toMatchObject({ action: 'update' });
    expect(plan.items[0].drifted).toBeUndefined();
    expect(plan.items[0].changes?.before).not.toHaveProperty('vpcConfig');
    expect(plan.items[0].changes?.before).not.toHaveProperty('nasConfig');
    const result = await executeFunctionPlan(context, plan, functions, state);
    expect(result.partialFailure).toBeUndefined();
    expect(client.fc3.updateFunctionCode).toHaveBeenCalledTimes(1);
    expect(client.fc3.updateFunctionConfiguration).not.toHaveBeenCalled();
    state = result.state;
    expect((await generateFunctionPlan({ ...context }, state, functions)).items[0].action).toBe(
      'noop',
    );
  });
});
