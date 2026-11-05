import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { REGIONAL_MIGRATION_SUFFIX } from '../../src/common/constants';
import { createLocalStateBackend } from '../../src/common/stateBackend';
import { getStatePath } from '../../src/common/stateManager';

describe('automatic upgrade interruption and concurrent deployment', () => {
  const scope = {
    provider: 'aliyun',
    app: 'example-app',
    service: 'example-service',
    stage: 'prod',
    region: 'cn-hangzhou',
  };
  let baseDir: string;
  const sourcePath = () => getStatePath(scope.app, scope.service, baseDir);
  const journal = () =>
    JSON.parse(fs.readFileSync(`${sourcePath()}${REGIONAL_MIGRATION_SUFFIX}`, 'utf-8'));
  const aggregate = () => JSON.parse(fs.readFileSync(sourcePath(), 'utf-8'));
  const blockTargetWrite = () => {
    const blocker = `${sourcePath()}.tmp`;
    fs.mkdirSync(blocker, { recursive: true });
    return blocker;
  };
  const upgrade = () =>
    createLocalStateBackend(scope, { baseDir, markerAction: 'refuse' }).upgradeLegacyState!();

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
    fs.rmSync(baseDir, { recursive: true, force: true });
  });

  it('resumes an in-place upgrade after the original-key write fails', async () => {
    const blocker = blockTargetWrite();
    await expect(upgrade()).rejects.toThrow();
    const pending = journal();
    expect(aggregate().version).toBe('3.0');
    expect(fs.existsSync(`${sourcePath()}.pre-upgrade-${pending.plan.opId}.json`)).toBe(true);
    fs.rmSync(blocker, { recursive: true });
    await upgrade();
    expect(aggregate().version).toBe('4.0');
    expect(Object.keys(aggregate().stages.prod.providers.aliyun.regions).sort()).toEqual([
      'ap-southeast-1',
      'cn-hangzhou',
    ]);
    expect(journal().phase).toBe('complete');
  });

  it('waits for the whole-file deployment lock without replacing a newer partition write', async () => {
    await upgrade();
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
      await backend.saveState(await backend.loadState());
    });
    await started;
    const waitingUpgrade = upgrade();
    expect(await backend.readLock()).not.toBeNull();
    release();
    await deployment;
    await waitingUpgrade;
    expect(aggregate().version).toBe('4.0');
    expect(Object.keys(aggregate().stages.prod.providers.aliyun.regions)).toHaveLength(2);
  });

  it('resumes finalization when the aggregate was written but the report failed', async () => {
    const blocker = blockTargetWrite();
    await expect(upgrade()).rejects.toThrow();
    fs.rmSync(blocker, { recursive: true });
    const pending = journal();
    const reportPath = `${sourcePath()}.upgrade-report-${pending.plan.opId}.json`;
    const reportBlocker = `${reportPath}.tmp`;
    fs.mkdirSync(reportBlocker, { recursive: true });
    await expect(upgrade()).rejects.toThrow();
    const before = fs.readFileSync(sourcePath(), 'utf-8');
    expect(aggregate().version).toBe('4.0');
    fs.rmSync(reportBlocker, { recursive: true });
    await upgrade();
    expect(fs.readFileSync(sourcePath(), 'utf-8')).toBe(before);
    expect(journal().phase).toBe('complete');
    expect(fs.existsSync(reportPath)).toBe(true);
  });
});
