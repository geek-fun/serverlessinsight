import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { runRegionalMigration } from '../../src/commands/migrateRegional';
import { createLocalStateBackend } from '../../src/common/stateBackend';
import { buildScopedStatePath } from '../../src/common/stateScope';
import { getStatePath } from '../../src/common/stateManager';

describe('regional migration interruption and concurrent deployment', () => {
  const scope = {
    provider: 'aliyun',
    app: 'example-app',
    service: 'example-service',
    stage: 'prod',
    region: 'cn-hangzhou',
  };
  let baseDir: string;
  const sourcePath = () => getStatePath(scope.app, scope.service, baseDir);
  const statePath = () =>
    buildScopedStatePath(scope.app, scope.service, scope.stage, scope.region, baseDir);
  const command = () => ({
    ...scope,
    baseDir,
    backendType: 'LOCAL' as const,
    autoApprove: true,
    askConfirmation: async () => true,
  });

  beforeEach(() => {
    baseDir = fs.mkdtempSync(path.join(os.tmpdir(), 'si-regional-recovery-'));
    const resources = Object.fromEntries(
      ['cn-hangzhou', 'ap-southeast-1'].map((region) => [
        region,
        {
          mode: 'managed',
          region,
          definition: {},
          instances: [{ id: region }],
          lastUpdated: '',
        },
      ]),
    );
    fs.mkdirSync(path.dirname(sourcePath()), { recursive: true });
    fs.writeFileSync(
      sourcePath(),
      JSON.stringify({
        version: '3.0',
        provider: scope.provider,
        app: scope.app,
        service: scope.service,
        stages: { prod: { resources } },
      }),
    );
  });
  afterEach(() => {
    jest.restoreAllMocks();
    fs.rmSync(baseDir, { recursive: true, force: true });
  });

  it('resumes the original CLI operation after a target write fails', async () => {
    const rename = fs.renameSync;
    let failed = false;
    jest.spyOn(fs, 'renameSync').mockImplementation((from, to) => {
      if (!failed && String(to).includes('ap-southeast-1') && String(to).endsWith('state.json')) {
        failed = true;
        throw new Error('injected storage failure');
      }
      return rename(from, to);
    });
    await expect(runRegionalMigration(command())).rejects.toThrow('injected storage failure');
    const before = fs.readFileSync(statePath(), 'utf-8');
    await runRegionalMigration(command());
    expect(fs.readFileSync(statePath(), 'utf-8')).toBe(before);
    const tombstone = JSON.parse(fs.readFileSync(sourcePath(), 'utf-8'));
    expect(tombstone.migration.opId).toBe(JSON.parse(before).migration.opId);
    expect(tombstone.managedBy).toBe('regional');
  });

  it('waits for an active deployment, then refuses rollback of its saved state', async () => {
    await runRegionalMigration(command());
    const opId = JSON.parse(fs.readFileSync(sourcePath(), 'utf-8')).migration.opId;
    const backend = createLocalStateBackend(scope, { baseDir });
    let release!: () => void;
    let entered!: () => void;
    const holding = new Promise<void>((resolve) => {
      release = resolve;
    });
    const started = new Promise<void>((resolve) => {
      entered = resolve;
    });
    const deployment = backend.withLock('deploy', async () => {
      entered();
      await holding;
    });
    await started;
    const rollback = runRegionalMigration({ ...command(), rollbackOpId: opId });
    const rejected = expect(rollback).rejects.toThrow(/independent regional writes/);
    try {
      await new Promise((resolve) => setTimeout(resolve, 20));
      expect(fs.existsSync(statePath())).toBe(true);
      expect(await backend.readLock()).not.toBeNull();
      await backend.saveState(await backend.loadState());
    } finally {
      release();
      await deployment;
    }
    await rejected;
    expect(fs.existsSync(statePath())).toBe(true);
    expect(JSON.parse(fs.readFileSync(sourcePath(), 'utf-8')).managedBy).toBe('regional');
  });

  it('resumes finalization when the tombstone was written but the report failed', async () => {
    const rename = fs.renameSync;
    let failed = false;
    jest.spyOn(fs, 'renameSync').mockImplementation((from, to) => {
      if (!failed && String(to).includes('migration-report-')) {
        failed = true;
        throw new Error('report failure');
      }
      return rename(from, to);
    });
    await expect(runRegionalMigration(command())).rejects.toThrow('report failure');
    const opId = JSON.parse(fs.readFileSync(sourcePath(), 'utf-8')).migration.opId;
    await runRegionalMigration(command());
    expect(JSON.parse(fs.readFileSync(sourcePath(), 'utf-8')).migration.opId).toBe(opId);
    expect(
      fs.existsSync(
        path.join(baseDir, '.serverlessinsight', 'states', `migration-report-${opId}.json`),
      ),
    ).toBe(true);
  });
});
