import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { plan } from '../../src/commands/plan';
import { BucketAccessEnum } from '../../src/types';
import { createVolcengineClient } from '../../src/common/volcengineClient';
import { createLocalStateBackend } from '../../src/common/stateBackend';
import { clearContext, getContext, setResource } from '../../src/common';
import { bucketToTosConfig, extractTosBucketDefinition } from '../../src/stack/volcengineStack';
import { createMockVolcengineClient, type MockVolcengineClient } from './mockCloudClient';

jest.mock('../../src/common/volcengineClient', () => ({
  createVolcengineClient: jest.fn(),
}));

const ROOT = path.join(__dirname, '../..');
const CLI_PATH = path.join(ROOT, 'dist/src/commands/index.js');
const FIXTURE = path.join(__dirname, '../fixtures/serverless-insight-volcengine-plan.yml');
const STATE_PATH = path.join(ROOT, '.serverlessinsight/state-volc-plan-app-volc-plan.json');
const options = {
  location: FIXTURE,
  stage: 'dev',
  region: 'cn-shanghai',
  accessKeyId: 'test-ak',
  accessKeySecret: 'test-sk',
};

const runCli = (command: string, args: string[] = []) =>
  new Promise<{ code: number | null; stdout: string; stderr: string }>((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [
        CLI_PATH,
        command,
        '-f',
        FIXTURE,
        '-s',
        'dev',
        '-r',
        'cn-shanghai',
        '-k',
        'test-ak',
        '-x',
        'test-sk',
        ...args,
      ],
      { cwd: ROOT, env: { ...process.env, NO_COLOR: '1' } },
    );
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => {
      stdout += chunk;
    });
    child.stderr.on('data', (chunk) => {
      stderr += chunk;
    });
    child.on('error', reject);
    child.on('close', (code) => resolve({ code, stdout, stderr }));
  });

describe('Volcengine standalone planning (issue #266)', () => {
  let client: MockVolcengineClient;
  let stateBefore: string;

  beforeEach(async () => {
    clearContext();
    client = createMockVolcengineClient();
    (createVolcengineClient as jest.Mock).mockReturnValue(client);
    const backend = createLocalStateBackend('volc-plan-app', 'volc-plan', ROOT);
    const initial = await backend.loadState('volcengine', 'volc-plan-app', 'volc-plan', 'dev');
    const state = setResource(initial, 'buckets.assets', {
      mode: 'managed',
      region: 'cn-shanghai',
      status: 'ready',
      instances: [],
      lastUpdated: '2026-01-01T00:00:00.000Z',
      definition: extractTosBucketDefinition(
        bucketToTosConfig({
          key: 'assets',
          name: 'volc-plan-assets',
          security: { acl: BucketAccessEnum.PRIVATE, force_delete: false },
        }),
      ),
    });
    await backend.saveState(state, 'volc-plan-app', 'volc-plan', 'dev');
    stateBefore = await fs.readFile(STATE_PATH, 'utf8');
  });

  afterEach(async () => {
    const mutators = Object.values(client).flatMap((service) =>
      Object.entries(service).filter(([name]) => !/^(get|list|find)/.test(name)),
    );
    try {
      mutators.forEach(([, operation]) => expect(operation).not.toHaveBeenCalled());
      expect(await fs.readFile(STATE_PATH, 'utf8')).toBe(stateBefore);
    } finally {
      await fs.rm(STATE_PATH, { force: true });
      clearContext();
    }
  });

  it('refreshes live state and preserves stage, region and parameter overrides', async () => {
    client.tos.getBucket.mockResolvedValue({ name: 'volc-plan-assets', acl: 'private' });

    const result = await plan({ ...options, parameters: { acl: 'PUBLIC_READ' } });

    expect(result.hasChanges).toBe(true);
    expect(client.tos.getBucket).toHaveBeenCalledWith('volc-plan-assets');
    expect(getContext()).toMatchObject({
      provider: 'volcengine',
      stage: 'dev',
      region: 'cn-shanghai',
      refresh: true,
      parameters: [{ key: 'acl', value: 'PUBLIC_READ' }],
    });
  });

  it('skips live refresh for tracked resources with --no-refresh', async () => {
    client.tos.getBucket.mockRejectedValue(new Error('must not read'));

    await expect(plan({ ...options, refresh: false })).resolves.toEqual({ hasChanges: false });

    expect(client.tos.getBucket).not.toHaveBeenCalled();
  });

  it('propagates a live refresh failure without producing a successful JSON plan', async () => {
    const error = new Error('cloud read denied');
    client.tos.getBucket.mockRejectedValue(error);
    const stdout = jest.spyOn(process.stdout, 'write').mockImplementation(() => true);
    try {
      await expect(plan({ ...options, json: true })).rejects.toBe(error);
      expect(stdout).not.toHaveBeenCalled();
    } finally {
      stdout.mockRestore();
    }
  });

  it('combines function, TOS and gateway changes in dependency order', async () => {
    client.vefaas.getFunction.mockResolvedValue(null);
    client.tos.getBucket.mockResolvedValue(null);
    const stdout = jest.spyOn(process.stdout, 'write').mockImplementation(() => true);
    try {
      const result = await plan({
        ...options,
        location: path.join(
          __dirname,
          '../fixtures/serverless-insight-volcengine-plan-dependencies.yml',
        ),
        json: true,
      });
      const payload = JSON.parse(stdout.mock.calls[0][0] as string);
      expect(result.hasChanges).toBe(true);
      expect(payload.changes).toHaveLength(3);
      const ids = payload.changes.map((change: { logicalId: string }) => change.logicalId);
      expect(ids).toContain('buckets.assets');
      expect(ids.indexOf('functions.hello')).toBeLessThan(ids.indexOf('events.http'));
      expect(payload.summary.create).toBe(3);
    } finally {
      stdout.mockRestore();
    }
  });

  (existsSync(CLI_PATH) ? describe : describe.skip).each(['plan', 'diff'])('si %s', (command) => {
    it('exits 0 with a versioned JSON envelope when there are no changes', async () => {
      const result = await runCli(command, ['--json', '--no-refresh']);
      expect(result.code).toBe(0);
      expect(JSON.parse(result.stdout)).toMatchObject({
        planVersion: 1,
        provider: 'volcengine',
        app: 'volc-plan-app',
        service: 'volc-plan',
        stage: 'dev',
        changes: [],
        summary: { create: 0, update: 0, destroy: 0, recreate: 0, unchanged: 1 },
      });
    });

    it('exits 2 and reports parameter-driven changes in JSON', async () => {
      const result = await runCli(command, [
        '--json',
        '--no-refresh',
        '-p',
        'acl=PUBLIC_READ',
        '-p',
        'unused=value',
      ]);
      expect(result.code).toBe(2);
      const payload = JSON.parse(result.stdout);
      expect(payload.provider).toBe('volcengine');
      expect(payload.changes).toEqual([
        expect.objectContaining({
          logicalId: 'buckets.assets',
          type: 'VOLCENGINE_TOS_BUCKET',
          action: 'update',
          attributes: expect.arrayContaining([
            expect.objectContaining({ key: 'acl', before: 'private', after: 'public-read' }),
          ]),
        }),
      ]);
      expect(payload.summary).toEqual({
        create: 0,
        update: 1,
        destroy: 0,
        recreate: 0,
        unchanged: 0,
      });
    });

    it('names Volcengine and renders changes in human output without ANSI colors', async () => {
      const result = await runCli(command, ['--no-refresh', '--no-color', '-p', 'acl=PUBLIC_READ']);
      expect(result.code).toBe(2);
      expect(result.stderr).toContain('Generating plan for Volcengine resources');
      expect(result.stderr).toContain('buckets.assets');
      expect(result.stderr).toContain('public-read');
      expect(result.stderr).not.toContain('\u001b[');
      expect(result.stdout).toBe('');
    });

    it('exits 1 with a JSON error when the planner cannot load state', async () => {
      const raw = JSON.parse(stateBefore);
      await fs.writeFile(STATE_PATH, JSON.stringify({ ...raw, version: '99.0' }));
      try {
        const result = await runCli(command, ['--json', '--no-refresh']);
        expect(result.code).toBe(1);
        const payload = JSON.parse(result.stdout);
        expect(payload.error.message).toBeTruthy();
        expect(payload.planVersion).toBeUndefined();
      } finally {
        await fs.writeFile(STATE_PATH, stateBefore);
      }
    });

    it('warns on migrated state and leaves the legacy copy unchanged', async () => {
      const raw = JSON.parse(stateBefore);
      const migrated = JSON.stringify({ ...raw, managedBy: 'saas' });
      await fs.writeFile(STATE_PATH, migrated);
      try {
        const result = await runCli(command, ['--json', '--no-refresh']);
        expect(result.code).toBe(0);
        expect(JSON.parse(result.stdout).provider).toBe('volcengine');
        expect(result.stderr).toContain('migrated');
        expect(await fs.readFile(STATE_PATH, 'utf8')).toBe(migrated);
      } finally {
        await fs.writeFile(STATE_PATH, stateBefore);
      }
    });
  });
});
