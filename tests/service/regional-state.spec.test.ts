import path from 'node:path';
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { deploy } from '../../src/commands/deploy';
import { destroyStack } from '../../src/commands/destroy';
import { lang } from '../../src/lang';
import { migrate } from '../../src/commands/migrate';
import { plan } from '../../src/commands/plan';
import { createMockAliyunClient, type MockAliyunClient } from './mockCloudClient';

jest.mock('../../src/common/aliyunClient', () => ({
  createAliyunClient: jest.fn(),
}));

jest.mock('../../src/common/imsClient', () => ({
  getIamInfo: jest.fn().mockResolvedValue({
    accountId: '123456789012',
    displayName: 'Test User',
    userId: 'test-user-id',
  }),
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mockCreateAliyunClient = require('../../src/common/aliyunClient')
  .createAliyunClient as jest.Mock;

/**
 * Regional deployment state isolation (issue #280) — service-flow matrix.
 * Real parser → planner → executor → state components; only the cloud SDK is
 * mocked. LOCAL backend with real scoped state on disk.
 */
describe('Regional state isolation (issue #280)', () => {
  const fixturesDir = path.join(__dirname, '../fixtures');
  const fixture = path.join(fixturesDir, 'serverless-insight-deploy.yml');
  const APP = 'insight-poc-deploy-app';
  const SERVICE = 'insight-poc-deploy';
  const scopedDir = path.join(process.cwd(), '.serverlessinsight', 'states', APP);
  const scopedPath = (stage: string, region: string): string =>
    path.join(scopedDir, `${SERVICE}_${stage}_${region}_state.json`);
  const legacyPath = path.join(process.cwd(), '.serverlessinsight', `state-${APP}-${SERVICE}.json`);

  let mockClient: MockAliyunClient;
  // A real cloud SDK is region-scoped: functions with the same name in two
  // regions are INDEPENDENT physical resources. Model that by handing each
  // region its own mock client (issue #280 matrix requirement).
  let clientsByRegion: Record<string, MockAliyunClient>;
  const totalCalls = (pick: (client: MockAliyunClient) => jest.Mock): number =>
    Object.values(clientsByRegion).reduce((sum, client) => sum + pick(client).mock.calls.length, 0);

  const cleanAll = async (): Promise<void> => {
    await fs.rm(scopedDir, { recursive: true, force: true }).catch(() => {});
    await fs.rm(legacyPath, { force: true }).catch(() => {});
    const directory = path.dirname(legacyPath);
    const artifacts = await fs.readdir(directory).catch(() => [] as string[]);
    await Promise.all(
      artifacts
        .filter((file) => file.startsWith(`${path.basename(legacyPath)}.`))
        .map((file) => fs.rm(path.join(directory, file), { force: true })),
    );
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    mockClient = createMockAliyunClient();
    clientsByRegion = { 'cn-hangzhou': mockClient };
    mockCreateAliyunClient.mockImplementation((context: { region: string }) => {
      if (!clientsByRegion[context.region]) {
        clientsByRegion[context.region] = createMockAliyunClient();
      }
      return clientsByRegion[context.region];
    });
    await cleanAll();
  });

  afterEach(async () => {
    await cleanAll();
  });

  it('deploys the same service+stage to two regions into independent states', async () => {
    await deploy({ location: fixture, stage: 'dev', autoApprove: true, region: 'cn-hangzhou' });
    await deploy({
      location: fixture,
      stage: 'dev',
      autoApprove: true,
      region: 'ap-southeast-1',
    });

    // Two independent V4 documents
    const hangzhou = JSON.parse(await fs.readFile(scopedPath('dev', 'cn-hangzhou'), 'utf-8'));
    const southeast = JSON.parse(await fs.readFile(scopedPath('dev', 'ap-southeast-1'), 'utf-8'));
    expect(hangzhou.scope).toEqual({ stage: 'dev', region: 'cn-hangzhou' });
    expect(southeast.scope).toEqual({ stage: 'dev', region: 'ap-southeast-1' });
    expect(hangzhou.lineage).not.toBe(southeast.lineage);
    // Per-resource incremental saves mean several persisted versions per
    // deploy — the isolation point is the independent lineage + serial stream.
    expect(hangzhou.serial).toBeGreaterThanOrEqual(1);
    expect(southeast.serial).toBeGreaterThanOrEqual(1);
    expect(hangzhou.stages.dev.resources['functions.insight_poc_fn']).toBeDefined();
    expect(southeast.stages.dev.resources['functions.insight_poc_fn']).toBeDefined();

    // Native identities are independent per region (created twice, distinct roles)
    expect(totalCalls((c) => c.fc3.createFunction)).toBe(2);
    expect(totalCalls((c) => c.ram.createRole)).toBe(2);
    const roleNames = Object.values(clientsByRegion).flatMap((client) =>
      client.ram.createRole.mock.calls.map((call: Array<string>) => call[0]),
    );
    // Distinct roles per region (long compositions truncate the readable
    // prefix but the deterministic hash keeps regions from colliding).
    expect(new Set(roleNames).size).toBe(2);
  });

  it('keeps one state per scope regardless of the YAML file used', async () => {
    await deploy({ location: fixture, stage: 'dev', autoApprove: true, region: 'cn-hangzhou' });
    expect(mockClient.fc3.createFunction).toHaveBeenCalledTimes(1);

    // A DIFFERENT file (different name, same app/service/stage/region) must see
    // the same scoped state — filename is not deployment identity.
    const otherFile = path.join(fixturesDir, 'serverless-insight-deploy-copy.yml');
    await fs.copyFile(fixture, otherFile);
    try {
      await deploy({ location: otherFile, stage: 'dev', autoApprove: true, region: 'cn-hangzhou' });
      // No changes: the second file planned against the SAME state → no create
      expect(mockClient.fc3.createFunction).toHaveBeenCalledTimes(1);
      const doc = JSON.parse(await fs.readFile(scopedPath('dev', 'cn-hangzhou'), 'utf-8'));
      // Each save is a new persisted version of the scope document
      expect(doc.serial).toBeGreaterThanOrEqual(2);
    } finally {
      await fs.rm(otherFile, { force: true }).catch(() => {});
    }
  });

  it('applies explicit CLI region overrides and writes state under the effective region', async () => {
    // The fixture's static default is provider.region: cn-chengdu
    await deploy({ location: fixture, stage: 'dev', autoApprove: true, region: 'cn-beijing' });

    expect(existsSync(scopedPath('dev', 'cn-beijing'))).toBe(true);
    expect(existsSync(scopedPath('dev', 'cn-chengdu'))).toBe(false);
    const doc = JSON.parse(await fs.readFile(scopedPath('dev', 'cn-beijing'), 'utf-8'));
    expect(doc.scope).toEqual({ stage: 'dev', region: 'cn-beijing' });
  });

  it('destroys one region without touching the other region or its state', async () => {
    await deploy({ location: fixture, stage: 'dev', autoApprove: true, region: 'cn-hangzhou' });
    await deploy({
      location: fixture,
      stage: 'dev',
      autoApprove: true,
      region: 'ap-southeast-1',
    });
    expect(totalCalls((c) => c.fc3.createFunction)).toBe(2);

    await destroyStack({ location: fixture, stage: 'dev', region: 'cn-hangzhou' });

    expect(totalCalls((c) => c.fc3.deleteFunction)).toBe(1);
    // The other region's document and its resources are untouched
    const southeast = JSON.parse(await fs.readFile(scopedPath('dev', 'ap-southeast-1'), 'utf-8'));
    expect(southeast.stages.dev.resources['functions.insight_poc_fn']).toBeDefined();
  });

  it('never creates state from read-only commands', async () => {
    await plan({ location: fixture, stage: 'dev', region: 'cn-hangzhou', noColor: true });

    await expect(fs.stat(scopedDir)).rejects.toThrow();
    expect(mockClient.fc3.createFunction).not.toHaveBeenCalled();
  });

  it('rejects a provider mismatch against existing scoped state before cloud mutation', async () => {
    await deploy({ location: fixture, stage: 'dev', autoApprove: true, region: 'cn-hangzhou' });
    expect(mockClient.fc3.createFunction).toHaveBeenCalledTimes(1);

    await expect(
      deploy({
        location: fixture,
        stage: 'dev',
        autoApprove: true,
        region: 'cn-hangzhou',
        provider: 'tencent',
      }),
    ).rejects.toThrow();

    // No cloud mutation happened for the foreign provider
    expect(mockClient.fc3.createFunction).toHaveBeenCalledTimes(1);
  });

  describe('legacy aggregate handling', () => {
    const legacyState = () => ({
      version: '3.0',
      provider: 'aliyun',
      app: APP,
      service: SERVICE,
      lineage: 'legacy-lineage',
      serial: 4,
      stages: {
        dev: {
          resources: {
            'functions.insight_poc_fn': {
              mode: 'managed',
              region: 'cn-hangzhou',
              definition: {
                functionName: 'insight-poc-fn',
                runtime: 'nodejs18',
                handler: 'index.handler',
                memorySize: 512,
                timeout: 10,
              },
              instances: [
                { sid: 'insight-poc-fn', id: 'insight-poc-fn', type: 'ALIYUN_FC3_FUNCTION' },
              ],
              lastUpdated: '2024-01-01T00:00:00.000Z',
              status: 'ready',
            },
          },
        },
      },
      resources: {},
    });

    it('blocks mutations while the legacy aggregate is authoritative', async () => {
      await fs.mkdir(path.dirname(legacyPath), { recursive: true });
      await fs.writeFile(legacyPath, JSON.stringify(legacyState()), 'utf-8');

      await expect(
        deploy({ location: fixture, stage: 'dev', autoApprove: true, region: 'cn-hangzhou' }),
      ).rejects.toThrow(lang.__('STATE_WRITE_BLOCKED_LEGACY', { statePath: legacyPath }));
      expect(mockClient.fc3.createFunction).not.toHaveBeenCalled();
    });

    it('keeps read-only commands working against the legacy aggregate', async () => {
      await fs.mkdir(path.dirname(legacyPath), { recursive: true });
      await fs.writeFile(legacyPath, JSON.stringify(legacyState()), 'utf-8');
      mockClient.fc3.getFunction.mockResolvedValue({
        body: {
          functionConfig: {
            functionName: 'insight-poc-fn',
            runtime: 'nodejs18',
            handler: 'index.handler',
            memorySize: 512,
            timeout: 10,
          },
        },
      });

      const result = await plan({
        location: fixture,
        stage: 'dev',
        region: 'cn-hangzhou',
        noColor: true,
      });
      void result;
      // Read-only: nothing provisioned, nothing mutated
      expect(mockClient.fc3.createFunction).not.toHaveBeenCalled();
      expect(existsSync(scopedPath('dev', 'cn-hangzhou'))).toBe(false);
    });

    it('splits the legacy aggregate through the protected dry-run/apply migration', async () => {
      await fs.mkdir(path.dirname(legacyPath), { recursive: true });
      await fs.writeFile(legacyPath, JSON.stringify(legacyState()), 'utf-8');

      // Dry-run: reports, writes nothing
      await migrate({
        location: fixture,
        stage: 'dev',
        region: 'cn-hangzhou',
        autoApprove: true,
        toRegional: true,
        dryRun: true,
      });
      await expect(fs.stat(scopedPath('dev', 'cn-hangzhou'))).rejects.toThrow();

      // Apply: scoped doc + barrier on the legacy entry
      await migrate({
        location: fixture,
        stage: 'dev',
        region: 'cn-hangzhou',
        autoApprove: true,
        toRegional: true,
      });

      const scoped = JSON.parse(await fs.readFile(scopedPath('dev', 'cn-hangzhou'), 'utf-8'));
      expect(scoped.version).toBe('4.0');
      expect(scoped.scope).toEqual({ stage: 'dev', region: 'cn-hangzhou' });
      expect(scoped.serial).toBe(1);
      expect(scoped.migration.sourceVersion).toBe('3.0');
      expect(scoped.stages.dev.resources['functions.insight_poc_fn'].instances[0].id).toBe(
        'insight-poc-fn',
      );

      const barriered = JSON.parse(await fs.readFile(legacyPath, 'utf-8'));
      // The barrier is a V4 tombstone: versioned 4.0 (old CLIs refuse it before
      // any mutation), marked managedBy=regional, and carrying the migration
      // provenance — while keeping the legacy content for forensics.
      expect(barriered.version).toBe('4.0');
      expect(barriered.managedBy).toBe('regional');
      expect(barriered.migration).toMatchObject({ sourceVersion: '3.0' });
      expect(barriered.stages.dev.resources['functions.insight_poc_fn']).toBeDefined();

      // The next deploy writes the scoped document (and adopts nothing new)
      await deploy({ location: fixture, stage: 'dev', autoApprove: true, region: 'cn-hangzhou' });
      const after = JSON.parse(await fs.readFile(scopedPath('dev', 'cn-hangzhou'), 'utf-8'));
      expect(after.serial).toBeGreaterThanOrEqual(2);
    });

    it('reports unknown-region resources and requires an explicit binding', async () => {
      const state = legacyState();
      // Pre-regional resource without region evidence
      state.stages.dev.resources['functions.insight_poc_fn'].region = '';
      await fs.mkdir(path.dirname(legacyPath), { recursive: true });
      await fs.writeFile(legacyPath, JSON.stringify(state), 'utf-8');

      await expect(
        migrate({
          location: fixture,
          stage: 'dev',
          region: 'cn-hangzhou',
          autoApprove: true,
          toRegional: true,
        }),
      ).rejects.toThrow(lang.__('REGIONAL_MIGRATION_UNKNOWN_REGION_REQUIRED'));

      await migrate({
        location: fixture,
        stage: 'dev',
        region: 'cn-hangzhou',
        autoApprove: true,
        toRegional: true,
        bindUnknownRegion: 'cn-hangzhou',
      });

      const scoped = JSON.parse(await fs.readFile(scopedPath('dev', 'cn-hangzhou'), 'utf-8'));
      expect(scoped.stages.dev.resources['functions.insight_poc_fn'].region).toBe('cn-hangzhou');
    });

    it('allows deploying a NEW region after the split', async () => {
      await fs.mkdir(path.dirname(legacyPath), { recursive: true });
      await fs.writeFile(legacyPath, JSON.stringify(legacyState()), 'utf-8');

      await migrate({
        location: fixture,
        stage: 'dev',
        region: 'cn-hangzhou',
        autoApprove: true,
        toRegional: true,
      });

      // The tombstoned legacy entry is treated as absent: the new region starts
      // from empty state and provisions independently (issue #280).
      await deploy({
        location: fixture,
        stage: 'dev',
        autoApprove: true,
        region: 'ap-southeast-1',
      });

      const southeastClient = clientsByRegion['ap-southeast-1'];
      expect(southeastClient.fc3.createFunction).toHaveBeenCalled();
      const fresh = JSON.parse(await fs.readFile(scopedPath('dev', 'ap-southeast-1'), 'utf-8'));
      expect(fresh.scope).toEqual({ stage: 'dev', region: 'ap-southeast-1' });
      expect(fresh.stages.dev.resources['functions.insight_poc_fn']).toBeDefined();
    });

    it('blocks deploy when the legacy aggregate is corrupt instead of rebuilding state', async () => {
      await fs.mkdir(path.dirname(legacyPath), { recursive: true });
      await fs.writeFile(legacyPath, '{invalid', 'utf-8');

      await expect(
        deploy({ location: fixture, stage: 'dev', autoApprove: true, region: 'cn-hangzhou' }),
      ).rejects.toThrow(/corrupt/i);
      expect(mockClient.fc3.createFunction).not.toHaveBeenCalled();
      expect(existsSync(scopedPath('dev', 'cn-hangzhou'))).toBe(false);
    });
  });
});
