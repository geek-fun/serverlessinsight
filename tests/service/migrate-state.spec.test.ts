import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { migrate } from '../../src/commands/migrate';
import { aggregatePartition, type AggregateStateFile } from '../../src/common/aggregateState';
import { clearContext } from '../../src/common/context';
import { hashSaasState } from '../../src/common/saasProtocol';
import { getStatePath } from '../../src/common/stateManager';
import { lang } from '../../src/lang';
import type { PersistedStateFile, ResourceState } from '../../src/types';

const scope = {
  app: 'example-app',
  service: 'example-service',
  provider: 'aliyun',
  region: 'cn-hangzhou',
};
const resource = (region = scope.region): ResourceState => ({
  mode: 'managed',
  region,
  definition: {},
  instances: [],
  lastUpdated: '2026-01-01T00:00:00Z',
});
const partition = (
  stage: string,
  resources: Record<string, ResourceState> = { 'functions.example': resource() },
) => ({
  lineage: `lineage-${stage}`,
  serial: stage === 'prod' ? 4 : 2,
  resources,
});
const stage = (name: string) => ({
  providers: { aliyun: { regions: { [scope.region]: partition(name) } } },
});
const deployableStages = () => ({ dev: stage('dev'), prod: stage('prod') });

type Upload = {
  stage: string;
  provider: string;
  region: string;
  baseContentHash: string;
  contentHash: string;
  resourceCount: number;
  stateJson: PersistedStateFile;
};
const apiKey = `si_com_${'a'.repeat(12)}_${'b'.repeat(32)}`;

describe('si migrate using a local state file', () => {
  const originalDirectory = process.cwd();
  let directory: string;
  let statePath: string;
  let yamlPath: string;

  beforeEach(() => {
    directory = fs.mkdtempSync(path.join(os.tmpdir(), 'si-migrate-test-'));
    jest.spyOn(os, 'homedir').mockReturnValue(directory);
    process.chdir(directory);
    statePath = getStatePath(scope.app, scope.service, directory);
    yamlPath = path.join(directory, 'stack.yml');
    fs.mkdirSync(path.dirname(statePath), { recursive: true });
    fs.writeFileSync(
      yamlPath,
      [
        'version: 0.0.1',
        `app: ${scope.app}`,
        `service: ${scope.service}`,
        'provider:',
        `  name: ${scope.provider}`,
        `  region: ${scope.region}`,
        'backend:',
        '  state_manager:',
        '    type: LOCAL',
        '',
      ].join('\n'),
    );
  });

  afterEach(() => {
    clearContext();
    jest.restoreAllMocks();
    process.chdir(originalDirectory);
    fs.rmSync(directory, { recursive: true, force: true });
  });

  const run = (options: Partial<Parameters<typeof migrate>[0]> = {}) =>
    migrate({ location: yamlPath, siApiKey: apiKey, autoApprove: true, ...options });
  const writeState = (stages: AggregateStateFile['stages']) =>
    fs.writeFileSync(
      statePath,
      JSON.stringify({ version: '4.0', app: scope.app, service: scope.service, stages }),
    );
  const readState = (): AggregateStateFile => JSON.parse(fs.readFileSync(statePath, 'utf8'));
  const mark = (name: string) =>
    aggregatePartition(readState(), { ...scope, stage: name })?.managedBy;

  const mockConsole = (headHashes: Record<string, string> = {}) => {
    const targets: string[] = [];
    const uploads: Upload[] = [];
    const deduped: string[] = [];
    const snapshots = new Map<string, Upload>();
    let failure: string | undefined;
    const failUpload = (name?: string) => {
      failure = name;
    };

    jest.spyOn(globalThis, 'fetch').mockImplementation(async (input, init) => {
      const url = new URL(String(input));
      if (url.pathname.endsWith('/api-keys/validate')) {
        return Response.json({
          orgId: 'org-1',
          orgName: 'Example',
          orgSlug: 'example',
          region: 'com',
        });
      }
      if (url.pathname.endsWith('/capabilities')) {
        return Response.json({
          regionalScope: true,
          providerScope: true,
          scopeProtocol: 3,
          stateFormat: '4.0',
        });
      }
      if (url.pathname.endsWith('/migrate/targets')) {
        const name = url.searchParams.get('stages')!;
        targets.push(name);
        const contentHash = snapshots.get(name)?.contentHash ?? headHashes[name];
        return Response.json({
          app: { exists: true, id: 'app-1' },
          service: { exists: true, id: 'service-1', regionalScopeEnabled: true, scopeProtocol: 3 },
          stages: [{ name, hasState: !!contentHash, contentHash }],
        });
      }
      if (url.pathname.endsWith('/state/migrate')) {
        const body = JSON.parse(String(init?.body)) as Upload;
        uploads.push(body);
        if (body.stage === failure) return Response.json({}, { status: 500 });

        const previous = snapshots.get(body.stage);
        expect(body.baseContentHash).toBe(previous?.contentHash ?? headHashes[body.stage] ?? '');
        expect(body.contentHash).toBe(hashSaasState(body.stateJson));
        expect(body.stateJson).not.toHaveProperty('resources');
        expect(Object.keys(body.stateJson.stages)).toEqual([body.stage]);
        const identical = previous?.contentHash === body.contentHash;
        if (identical) deduped.push(body.stage);
        snapshots.set(body.stage, body);
        return Response.json({
          appId: 'app-1',
          serviceId: 'service-1',
          stateId: `snapshot-${body.stage}`,
          stageId: `stage-${body.stage}`,
          versionNumber: 1,
          provider: body.provider,
          region: body.region,
          scopeProtocol: 3,
          deduped: identical,
        });
      }
      if (url.pathname.endsWith('/state/current')) {
        const body = snapshots.get(url.searchParams.get('stage')!)!;
        return Response.json({
          id: `snapshot-${body.stage}`,
          serviceId: 'service-1',
          stageId: `stage-${body.stage}`,
          stage: body.stage,
          versionNumber: 1,
          provider: body.provider,
          region: body.region,
          scopeProtocol: 3,
          stateJson: body.stateJson,
          contentHash: body.contentHash,
          resourceCount: body.resourceCount,
        });
      }
      throw new Error(`Unexpected API request: ${url.pathname}`);
    });

    return { targets, uploads, deduped, failUpload };
  };

  it('migrates dev and prod without a default partition and marks both in the same source update', async () => {
    const unrelatedRegion = 'cn-beijing';
    const stages = deployableStages();
    writeState({
      ...stages,
      dev: {
        providers: {
          aliyun: {
            regions: {
              ...stages.dev.providers.aliyun.regions,
              [unrelatedRegion]: partition('dev-other-region', {
                example: resource(unrelatedRegion),
              }),
            },
          },
          tencent: { regions: { [scope.region]: partition('dev-other-provider') } },
        },
      },
    });
    const original = readState();
    const console = mockConsole({ dev: 'a'.repeat(64), prod: 'b'.repeat(64) });

    await run({ force: true });

    expect(console.targets).toEqual(['dev', 'prod']);
    expect(
      console.uploads.map(({ stage, stateJson, resourceCount }) => ({
        stage,
        scope: stateJson.scope,
        serial: stateJson.serial,
        lineage: stateJson.lineage,
        resourceCount,
      })),
    ).toEqual([
      {
        stage: 'dev',
        scope: { stage: 'dev', region: scope.region },
        serial: 2,
        lineage: 'lineage-dev',
        resourceCount: 1,
      },
      {
        stage: 'prod',
        scope: { stage: 'prod', region: scope.region },
        serial: 4,
        lineage: 'lineage-prod',
        resourceCount: 1,
      },
    ]);
    expect(mark('dev')).toBe('saas');
    expect(mark('prod')).toBe('saas');
    expect(readState().stages.default).toBeUndefined();
    expect(JSON.parse(fs.readFileSync(`${statePath}.backup`, 'utf8'))).toEqual(original);
    expect(
      aggregatePartition(readState(), { ...scope, stage: 'dev', region: unrelatedRegion }),
    ).toEqual(aggregatePartition(original, { ...scope, stage: 'dev', region: unrelatedRegion }));
    expect(
      aggregatePartition(readState(), { ...scope, stage: 'dev', provider: 'tencent' }),
    ).toEqual(aggregatePartition(original, { ...scope, stage: 'dev', provider: 'tencent' }));

    await run();
    expect(console.uploads).toHaveLength(2);
  });

  it('redacts each stage before upload and preserves redaction while marking the source', async () => {
    const stages = deployableStages();
    const recorded = resource();
    recorded.definition = {
      environment: { DB_PASSWORD: 'short-password', NODE_ENV: 'production' },
    };
    recorded.instances = [
      {
        id: 'example',
        sid: 'example-sid',
        environment: { DATABASE_URL: 'postgres://app:pw@db.example.test/database' },
      },
    ];
    stages.dev.providers.aliyun.regions[scope.region].resources['functions.example'] = recorded;
    stages.prod.providers.aliyun.regions[scope.region].resources['functions.example'] = recorded;
    writeState(stages);
    const console = mockConsole();

    await run();

    expect(console.uploads.map(({ stage }) => stage)).toEqual(['dev', 'prod']);
    for (const upload of console.uploads) {
      expect(upload.contentHash).toBe(hashSaasState(upload.stateJson));
      expect(upload.stateJson.stages[upload.stage].resources['functions.example']).toMatchObject({
        definition: { environment: { DB_PASSWORD: '[REDACTED]', NODE_ENV: 'production' } },
        instances: [{ environment: { DATABASE_URL: '[REDACTED]' } }],
      });
    }
    for (const file of [statePath, `${statePath}.backup`]) {
      const content = fs.readFileSync(file, 'utf8');
      expect(content).not.toMatch(/short-password|postgres:\/\/|fpr:/);
      expect(content).toContain('[REDACTED]');
    }
    expect(mark('dev')).toBe('saas');
    expect(mark('prod')).toBe('saas');
  });

  it.each(['absent', 'empty'])(
    'rejects --force on an %s explicit source partition',
    async (kind) => {
      writeState({
        dev: stage('dev'),
        ...(kind === 'empty'
          ? {
              prod: {
                providers: { aliyun: { regions: { [scope.region]: partition('prod', {}) } } },
              },
            }
          : {}),
      });
      const original = readState();
      const console = mockConsole({ prod: 'b'.repeat(64) });

      await expect(run({ stage: 'prod', force: true })).rejects.toThrow(
        lang.__('MIGRATE_NOTHING_TO_MIGRATE'),
      );

      expect(console.targets).toEqual([]);
      expect(console.uploads).toEqual([]);
      expect(readState()).toEqual(original);
    },
  );

  it('migrates only the explicitly selected stage and later skips its marker', async () => {
    writeState(deployableStages());
    const console = mockConsole();

    await run({ stage: 'prod' });
    expect(console.targets).toEqual(['prod']);
    expect(mark('prod')).toBe('saas');
    expect(mark('dev')).toBeUndefined();

    await run();
    expect(console.targets).toEqual(['prod', 'dev']);
    expect(mark('dev')).toBe('saas');

    await run({ stage: 'prod', rollback: true });
    expect(mark('prod')).toBeUndefined();
    expect(mark('dev')).toBe('saas');
  });

  it('marks no partitions on partial upload failure and deduplicates the successful stage on retry', async () => {
    writeState(deployableStages());
    const original = readState();
    const console = mockConsole();
    console.failUpload('prod');

    await expect(run()).rejects.toThrow();
    expect(console.uploads.map(({ stage }) => stage)).toEqual(['dev', 'prod']);
    expect(readState()).toEqual(original);
    expect(fs.existsSync(`${statePath}.backup`)).toBe(false);

    console.failUpload();
    await run();
    expect(console.deduped).toEqual(['dev']);
    expect(mark('dev')).toBe('saas');
    expect(mark('prod')).toBe('saas');
  });

  it('previews every matching V3 stage without upgrading or uploading', async () => {
    const legacy = JSON.stringify({
      version: '3.0',
      app: scope.app,
      service: scope.service,
      provider: scope.provider,
      stages: {
        dev: { resources: { example: resource() } },
        prod: { resources: {}, shared: { bucket: resource('') } },
        foreign: { resources: { example: resource('cn-beijing') } },
      },
    });
    fs.writeFileSync(statePath, legacy);
    const console = mockConsole();

    await run({ dryRun: true, bindUnknownRegion: scope.region });

    expect(console.targets).toEqual(['dev', 'prod']);
    expect(console.uploads).toEqual([]);
    expect(fs.readFileSync(statePath, 'utf8')).toBe(legacy);
    expect(fs.readdirSync(path.dirname(statePath))).toEqual([path.basename(statePath)]);
  });
});
