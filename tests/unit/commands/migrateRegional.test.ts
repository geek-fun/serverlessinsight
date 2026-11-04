jest.mock('../../../src/common', () => ({
  createLocalStateIO: jest.requireActual('../../../src/common/stateStorageIO').createLocalStateIO,
}));

jest.mock('node:fs', () =>
  jest.requireActual('../../autils/memoryFileSystem').createMemoryFileSystem(),
);

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { runRegionalMigration } from '../../../src/commands/migrateRegional';
import type { RegionalMigrationCommandOptions } from '../../../src/commands/migrateRegional';
import type {
  KeyValueIO,
  RegionalMigrationPaths,
  RegionalMigrationPlan,
} from '../../../src/common/regionalMigration';
import { StateCorruptError, StateVersionError } from '../../../src/types';

const mockLoggerInfo = jest.fn();
const mockLoggerWarn = jest.fn();
const mockLoggerError = jest.fn();

const mockPlanRegionalMigration = jest.fn();
const mockApplyRegionalMigration = jest.fn();
const mockRollbackRegionalMigration = jest.fn();

const mockOssAdapter = {
  read: jest.fn(),
  putIfAbsent: jest.fn().mockResolvedValue(true),
  write: jest.fn(),
  delete: jest.fn(),
};

const mockCosAdapter = {
  read: jest.fn(),
  putIfAbsent: jest.fn().mockResolvedValue(true),
  write: jest.fn(),
  delete: jest.fn(),
};

jest.mock('../../../src/lang', () => ({
  lang: { __: (key: string) => key },
}));

jest.mock('../../../src/common/logger', () => ({
  logger: {
    info: (...args: unknown[]) => mockLoggerInfo(...args),
    warn: (...args: unknown[]) => mockLoggerWarn(...args),
    error: (...args: unknown[]) => mockLoggerError(...args),
    debug: jest.fn(),
  },
}));

jest.mock('../../../src/common/regionalMigration', () => ({
  // The command also calls the REAL withIoLock around the source aggregate;
  // only the three migration steps are mocked.
  ...jest.requireActual<Record<string, unknown>>('../../../src/common/regionalMigration'),
  planRegionalMigration: (...args: unknown[]) => mockPlanRegionalMigration(...args),
  applyRegionalMigration: (...args: unknown[]) => mockApplyRegionalMigration(...args),
  rollbackRegionalMigration: (...args: unknown[]) => mockRollbackRegionalMigration(...args),
}));

jest.mock('../../../src/common/stateBackend/lockUtils', () => ({
  ...jest.requireActual('../../../src/common/stateBackend/lockUtils'),
  // Only the retry-wait path sleeps; keep it instantaneous so lock-contention
  // tests exhaust their retries without real wall-clock waiting.
  sleep: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('../../../src/common/stateBackend/ossStateBackend', () => ({
  createOssStorageAdapter: jest.fn(() => mockOssAdapter),
}));

jest.mock('../../../src/common/stateBackend/cosStateBackend', () => ({
  createCosStorageAdapter: jest.fn(() => mockCosAdapter),
}));

import { createOssStorageAdapter } from '../../../src/common/stateBackend/ossStateBackend';
import { createCosStorageAdapter } from '../../../src/common/stateBackend/cosStateBackend';

const mockedCreateOssStorageAdapter = createOssStorageAdapter as jest.Mock;
const mockedCreateCosStorageAdapter = createCosStorageAdapter as jest.Mock;
const mockedPlan = mockPlanRegionalMigration as jest.Mock;
const mockedApply = mockApplyRegionalMigration as jest.Mock;
const mockedRollback = mockRollbackRegionalMigration as jest.Mock;

/* ---------------- fixtures ---------------- */

const makeResource = (region: string, id: string) => ({
  mode: 'managed',
  region,
  definition: {},
  instances: [{ sid: `sid-${id}`, id }],
  lastUpdated: '2024-01-01T00:00:00.000Z',
});

const legacyDoc = (overrides: Record<string, unknown> = {}) => ({
  version: '3.0',
  provider: 'aliyun',
  app: 'myapp',
  service: 'myservice',
  serial: 7,
  lineage: 'legacy-lineage',
  stages: {
    dev: {
      resources: {
        'functions.hello': makeResource('cn-hangzhou', 'hello'),
      },
      shared: {
        'shared.logs': makeResource('cn-hangzhou', 'logs'),
      },
    },
  },
  resources: {},
  ...overrides,
});

const makePlan = (overrides: Partial<RegionalMigrationPlan> = {}): RegionalMigrationPlan => ({
  opId: 'op-1',
  sourceVersion: '3.0',
  sourceHash: 'hash-abc',
  documents: [{ stage: 'dev', region: 'cn-hangzhou', resources: 1, shared: 1 }],
  unknown: [],
  warnings: [],
  ...overrides,
});

/* ---------------- harness ---------------- */

let baseDir: string;
let siDir: string;
let legacyPath: string;
let lockPath: string;

const writeLegacyFile = (doc: Record<string, unknown>, target = legacyPath): void => {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, JSON.stringify(doc, null, 2), 'utf-8');
};

const localOptions = (
  overrides: Partial<RegionalMigrationCommandOptions> = {},
): RegionalMigrationCommandOptions => ({
  provider: 'aliyun',
  app: 'myapp',
  service: 'myservice',
  region: 'cn-hangzhou',
  stage: 'dev',
  baseDir,
  backendType: 'LOCAL',
  autoApprove: true,
  askConfirmation: async () => true,
  ...overrides,
});

const bucketOptions = (
  overrides: Partial<RegionalMigrationCommandOptions> = {},
): RegionalMigrationCommandOptions => ({
  provider: 'aliyun',
  app: 'myapp',
  service: 'myservice',
  region: 'cn-hangzhou',
  stage: 'dev',
  baseDir,
  backendType: 'BUCKET_STORE',
  bucketConfig: {
    bucket: 'my-bucket',
    key: 'state.json',
    storageRegion: 'cn-hangzhou',
    accessKeyId: 'ak',
    accessKeySecret: 'sk',
    securityToken: 'tok',
  },
  autoApprove: true,
  askConfirmation: async () => true,
  ...overrides,
});

const listFiles = (dir: string): string[] => {
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory() ? listFiles(path.join(dir, entry.name)) : [path.join(dir, entry.name)],
    );
};

beforeEach(() => {
  jest.clearAllMocks();
  mockLoggerInfo.mockClear();
  mockLoggerWarn.mockClear();

  baseDir = fs.mkdtempSync(path.join(os.tmpdir(), 'si-migrate-regional-'));
  siDir = path.join(baseDir, '.serverlessinsight');
  legacyPath = path.join(siDir, 'state-myapp-myservice.json');
  lockPath = `${legacyPath}.si-lock`;

  mockedPlan.mockReturnValue(makePlan());
  mockedApply.mockResolvedValue(undefined);
  mockedRollback.mockResolvedValue(undefined);

  mockOssAdapter.read.mockResolvedValue(null);
  mockOssAdapter.write.mockResolvedValue(undefined);
  mockOssAdapter.delete.mockResolvedValue(undefined);
  mockCosAdapter.read.mockResolvedValue(null);
  mockCosAdapter.write.mockResolvedValue(undefined);
  mockCosAdapter.delete.mockResolvedValue(undefined);
});

afterEach(() => {
  fs.rmSync(baseDir, { recursive: true, force: true });
});

/* ---------------- tests ---------------- */

describe('migrateRegional command (si migrate --to-regional)', () => {
  describe('backend guard', () => {
    it('rejects a backend type that is neither LOCAL nor BUCKET_STORE', async () => {
      await expect(
        runRegionalMigration({
          ...localOptions(),
          backendType: 'SAAS' as unknown as 'LOCAL',
        }),
      ).rejects.toThrow('REGIONAL_MIGRATION_LOCAL_OR_BUCKET_ONLY');
      expect(mockedPlan).not.toHaveBeenCalled();
      expect(mockedApply).not.toHaveBeenCalled();
    });
  });

  describe('LOCAL backend', () => {
    it('leaves an already upgraded V5 aggregate unchanged', async () => {
      const aggregate = { version: '5.0', app: 'myapp', service: 'myservice', stages: {} };
      writeLegacyFile(aggregate);

      await runRegionalMigration(localOptions());

      expect(JSON.parse(fs.readFileSync(legacyPath, 'utf-8'))).toEqual(aggregate);
      expect(mockedPlan).not.toHaveBeenCalled();
      expect(mockedApply).not.toHaveBeenCalled();
      expect(fs.existsSync(lockPath)).toBe(false);
    });

    it('rejects an already upgraded aggregate with a foreign identity', async () => {
      writeLegacyFile({ version: '5.0', app: 'another-app', service: 'myservice', stages: {} });

      await expect(runRegionalMigration(localOptions())).rejects.toThrow(StateCorruptError);
      expect(mockedPlan).not.toHaveBeenCalled();
      expect(mockedApply).not.toHaveBeenCalled();
      expect(fs.existsSync(lockPath)).toBe(false);
    });

    it('throws REGIONAL_MIGRATION_NO_LEGACY_STATE when no legacy file exists and leaves no lock', async () => {
      await expect(runRegionalMigration(localOptions())).rejects.toThrow(
        'REGIONAL_MIGRATION_NO_LEGACY_STATE',
      );
      expect(mockedPlan).not.toHaveBeenCalled();
      expect(mockedApply).not.toHaveBeenCalled();
      expect(fs.existsSync(lockPath)).toBe(false);
    });

    it('wraps an unparseable legacy file in StateCorruptError instead of treating it as empty', async () => {
      writeLegacyFile({});
      fs.writeFileSync(legacyPath, '{{{ not json', 'utf-8');

      await expect(runRegionalMigration(localOptions())).rejects.toThrow(StateCorruptError);
      expect(mockedPlan).not.toHaveBeenCalled();
      expect(mockedApply).not.toHaveBeenCalled();
    });

    it.each(['4.0', '9.9'])(
      'rejects unsupported source format %s without writing',
      async (version) => {
        writeLegacyFile(legacyDoc({ version }));
        await expect(runRegionalMigration(localOptions())).rejects.toThrow(StateVersionError);
        expect(mockedPlan).not.toHaveBeenCalled();
        expect(mockedApply).not.toHaveBeenCalled();
        expect(fs.existsSync(lockPath)).toBe(false);
      },
    );

    it('dry-run: plans against the persisted legacy document, prints the report and writes nothing beyond the released lock', async () => {
      writeLegacyFile(legacyDoc());
      let lockDuringPlan: Record<string, unknown> | null = null;
      mockedPlan.mockImplementation(() => {
        lockDuringPlan = JSON.parse(fs.readFileSync(lockPath, 'utf-8'));
        return makePlan();
      });

      await runRegionalMigration(localOptions({ dryRun: true }));

      expect(mockedPlan).toHaveBeenCalledTimes(1);
      const [legacyArg, optionsArg] = mockedPlan.mock.calls[0];
      expect(legacyArg).toEqual(legacyDoc());
      expect(optionsArg).toEqual({
        provider: 'aliyun',
        app: 'myapp',
        service: 'myservice',
        stage: 'dev',
      });

      expect(mockedApply).not.toHaveBeenCalled();
      expect(mockLoggerInfo).toHaveBeenCalledWith('REGIONAL_MIGRATION_DRY_RUN_NOTICE');

      // the migration lock was held around the callback and released afterwards
      expect(lockDuringPlan).toEqual(
        expect.objectContaining({ operation: 'migrate-regional', path: legacyPath }),
      );
      expect(fs.existsSync(lockPath)).toBe(false);
      expect(listFiles(baseDir)).toEqual([legacyPath]);
    });

    it('apply (autoApprove): passes the plan and options to applyRegionalMigration with a working storage adapter', async () => {
      writeLegacyFile(legacyDoc());

      await runRegionalMigration(localOptions());

      expect(mockedApply).toHaveBeenCalledTimes(1);
      const [io, legacyArg, pathsArg, planArg, applyOptions] = mockedApply.mock.calls[0];
      expect(legacyArg).toEqual(legacyDoc());
      const paths = pathsArg as RegionalMigrationPaths;
      expect(paths.legacyKey).toBe(legacyPath);
      expect(paths.reportKey('op-1')).toBe(`${legacyPath}.migration-report-op-1.json`);
      expect(paths.backupKey('op-1')).toBe(`${legacyPath}.pre-regional-op-1`);

      expect(planArg).toEqual(makePlan());
      expect(applyOptions).toEqual({
        provider: 'aliyun',
        app: 'myapp',
        service: 'myservice',
        stage: 'dev',
      });

      const keyValueIo = io as KeyValueIO;
      await expect(keyValueIo.read(legacyPath)).resolves.toEqual(legacyDoc());

      const nested = path.join(siDir, 'states', 'x', 'scratch.json');
      await keyValueIo.write(nested, { a: 1 });
      expect(JSON.parse(fs.readFileSync(nested, 'utf-8'))).toEqual({ a: 1 });
      await keyValueIo.delete(nested);
      expect(fs.existsSync(nested)).toBe(false);
      expect(fs.existsSync(lockPath)).toBe(false);
    });

    it('asks for confirmation and aborts without applying when declined', async () => {
      writeLegacyFile(legacyDoc());
      const askConfirmation = jest.fn().mockResolvedValue(false);

      await runRegionalMigration(localOptions({ autoApprove: false, askConfirmation }));

      expect(askConfirmation).toHaveBeenCalledWith('REGIONAL_MIGRATION_CONFIRM');
      expect(mockedApply).not.toHaveBeenCalled();
      expect(mockLoggerInfo).toHaveBeenCalledWith('MIGRATE_CANCELLED');
      expect(fs.existsSync(lockPath)).toBe(false);
    });

    it('applies when confirmation is accepted without autoApprove', async () => {
      writeLegacyFile(legacyDoc());

      await runRegionalMigration(
        localOptions({ autoApprove: false, askConfirmation: async () => true }),
      );

      expect(mockedApply).toHaveBeenCalledTimes(1);
      expect(mockLoggerInfo).not.toHaveBeenCalledWith('MIGRATE_CANCELLED');
    });

    it('rollbackOpId: restores under the legacy lock without planning or applying', async () => {
      writeLegacyFile(legacyDoc());
      let lockDuringRollback: Record<string, unknown> | null = null;
      mockedRollback.mockImplementation(async () => {
        lockDuringRollback = JSON.parse(fs.readFileSync(lockPath, 'utf-8'));
      });

      await runRegionalMigration(localOptions({ rollbackOpId: 'op-9' }));

      expect(mockedRollback).toHaveBeenCalledTimes(1);
      const [io, pathsArg, opId] = mockedRollback.mock.calls[0];
      expect(opId).toBe('op-9');
      expect((pathsArg as RegionalMigrationPaths).legacyKey).toBe(legacyPath);
      await expect((io as KeyValueIO).read(legacyPath)).resolves.toEqual(legacyDoc());
      expect(lockDuringRollback).toEqual(
        expect.objectContaining({ operation: 'migrate-regional-rollback', path: legacyPath }),
      );
      expect(mockedPlan).not.toHaveBeenCalled();
      expect(mockedApply).not.toHaveBeenCalled();
      expect(fs.existsSync(lockPath)).toBe(false);
    });

    it('passes bindUnknownRegion through to the plan and apply options', async () => {
      writeLegacyFile(legacyDoc());

      await runRegionalMigration(localOptions({ bindUnknownRegion: 'cn-beijing' }));

      expect(mockedPlan.mock.calls[0][1]).toEqual(
        expect.objectContaining({ bindUnknownRegion: 'cn-beijing' }),
      );
      expect(mockedApply.mock.calls[0][4]).toEqual(
        expect.objectContaining({ bindUnknownRegion: 'cn-beijing' }),
      );
    });

    it('refuses identity rebinding before reading or writing any state', async () => {
      await expect(
        runRegionalMigration(localOptions({ legacyApp: 'old-app', legacyService: 'old-svc' })),
      ).rejects.toThrow();
      expect(mockedApply).not.toHaveBeenCalled();
      expect(mockedPlan).not.toHaveBeenCalled();
    });
  });

  describe('BUCKET_STORE backend', () => {
    it('uses the OSS adapter for aliyun and wires its read/write/delete as the KeyValueIO', async () => {
      mockOssAdapter.read.mockImplementation(async (key: string) =>
        key === 'state.json' ? legacyDoc() : null,
      );

      await runRegionalMigration(bucketOptions());

      expect(mockedCreateOssStorageAdapter).toHaveBeenCalledWith({
        bucket: 'my-bucket',
        region: 'cn-hangzhou',
        accessKeyId: 'ak',
        accessKeySecret: 'sk',
        securityToken: 'tok',
        lockPath: 'oss://my-bucket/state.json',
      });
      expect(mockedCreateCosStorageAdapter).not.toHaveBeenCalled();

      expect(mockedPlan).toHaveBeenCalledTimes(1);
      expect(mockedPlan.mock.calls[0][0]).toEqual(legacyDoc());
      const paths = mockedApply.mock.calls[0][2] as RegionalMigrationPaths;
      expect(paths.legacyKey).toBe('state.json');
      expect(paths.reportKey('op-1')).toBe('state.json.migration-report-op-1.json');
      expect(paths.backupKey('op-1')).toBe('state.json.pre-regional-op-1.json');

      expect(mockedApply).toHaveBeenCalledTimes(1);
      const io = mockedApply.mock.calls[0][0] as KeyValueIO & { read: jest.Mock };
      expect(io.read).toBe(mockOssAdapter.read);
      expect((mockedApply.mock.calls[0][1] as Record<string, unknown>).version).toBe('3.0');
      // the lock was read first, then the legacy object
      expect(mockOssAdapter.read.mock.calls[0][0]).toBe('state.json.si-lock');
    });

    it('uses the COS adapter for tencent', async () => {
      mockCosAdapter.read.mockImplementation(async (key: string) =>
        key === 'state.json' ? legacyDoc() : null,
      );

      await runRegionalMigration(bucketOptions({ provider: 'tencent' }));

      expect(mockedCreateCosStorageAdapter).toHaveBeenCalledWith(
        expect.objectContaining({ bucket: 'my-bucket', lockPath: 'cos://my-bucket/state.json' }),
      );
      expect(mockedCreateOssStorageAdapter).not.toHaveBeenCalled();
      expect(mockedApply).toHaveBeenCalledTimes(1);
    });

    it('honours an explicit storageProvider that differs from the workload provider', async () => {
      mockCosAdapter.read.mockImplementation(async (key: string) =>
        key === 'state.json' ? legacyDoc() : null,
      );

      await runRegionalMigration(
        bucketOptions({
          provider: 'aliyun',
          bucketConfig: {
            bucket: 'my-bucket',
            key: 'state.json',
            storageRegion: 'ap-guangzhou',
            storageProvider: 'tencent',
            accessKeyId: 'ak',
            accessKeySecret: 'sk',
          },
        }),
      );

      // The storage adapter gets the STORAGE region/provider, not the workload ones
      expect(mockedCreateCosStorageAdapter).toHaveBeenCalledWith(
        expect.objectContaining({
          bucket: 'my-bucket',
          region: 'ap-guangzhou',
          lockPath: 'cos://my-bucket/state.json',
        }),
      );
      expect(mockedCreateOssStorageAdapter).not.toHaveBeenCalled();
      expect(mockedApply).toHaveBeenCalledTimes(1);
      expect(mockedPlan.mock.calls[0][0]).toEqual(legacyDoc());
    });

    it('throws REGIONAL_MIGRATION_NO_LEGACY_STATE when the legacy object is absent', async () => {
      await expect(runRegionalMigration(bucketOptions())).rejects.toThrow(
        'REGIONAL_MIGRATION_NO_LEGACY_STATE',
      );
      expect(mockedApply).not.toHaveBeenCalled();
    });

    it('takes the lock via exclusive create and releases it via io.delete on the lock object', async () => {
      let capturedLock: unknown = null;
      mockOssAdapter.read.mockImplementation(async (key: string) =>
        key === 'state.json.si-lock' ? capturedLock : null,
      );
      mockOssAdapter.putIfAbsent.mockImplementation(async (key: string, data: unknown) => {
        if (key === 'state.json.si-lock') {
          capturedLock = data;
        }
        return true;
      });

      await expect(runRegionalMigration(bucketOptions())).rejects.toThrow(
        'REGIONAL_MIGRATION_NO_LEGACY_STATE',
      );

      expect(mockOssAdapter.read.mock.calls[0][0]).toBe('state.json.si-lock');
      expect(mockOssAdapter.putIfAbsent).toHaveBeenCalledWith(
        'state.json.si-lock',
        expect.objectContaining({ operation: 'migrate-regional', path: 'state.json' }),
      );
      expect(mockOssAdapter.delete).toHaveBeenCalledWith('state.json.si-lock');
    });
  });

  describe('migration lock', () => {
    it('auto-releases a lock left by a dead process on this host and proceeds', async () => {
      writeLegacyFile(legacyDoc());
      fs.writeFileSync(
        lockPath,
        JSON.stringify({
          id: 'dead-lock-id',
          user: 'previous@host',
          processId: 999999,
          hostname: os.hostname(),
          operation: 'migrate-regional',
          acquiredAt: new Date().toISOString(),
          path: legacyPath,
        }),
        'utf-8',
      );

      await runRegionalMigration(localOptions());

      expect(mockedApply).toHaveBeenCalledTimes(1);
      expect(fs.existsSync(lockPath)).toBe(false);
    });

    it('refuses a stale lock from another host with localized guidance and leaves it in place', async () => {
      writeLegacyFile(legacyDoc());
      fs.writeFileSync(
        lockPath,
        JSON.stringify({
          id: 'stale-lock-id',
          user: 'someone@other-host',
          processId: 999999,
          hostname: 'some-other-host-that-is-not-this-one',
          operation: 'migrate-regional',
          acquiredAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          path: legacyPath,
        }),
        'utf-8',
      );

      await expect(runRegionalMigration(localOptions())).rejects.toThrow('REGIONAL_LOCK_STALE');

      expect(mockedPlan).not.toHaveBeenCalled();
      expect(mockedApply).not.toHaveBeenCalled();
      expect(fs.existsSync(lockPath)).toBe(true);
    });

    it('waits behind a live lock on this host and fails to acquire it after exhausting retries', async () => {
      writeLegacyFile(legacyDoc());
      fs.writeFileSync(
        lockPath,
        JSON.stringify({
          id: 'live-lock-id',
          user: 'active@host',
          processId: process.pid,
          hostname: os.hostname(),
          operation: 'deploy',
          acquiredAt: new Date().toISOString(),
          path: legacyPath,
        }),
        'utf-8',
      );

      await expect(runRegionalMigration(localOptions())).rejects.toThrow('REGIONAL_LOCK_FAILED');

      expect(mockLoggerInfo).toHaveBeenCalledWith('LOCK_WAITING');
      expect(mockedPlan).not.toHaveBeenCalled();
      expect(mockedApply).not.toHaveBeenCalled();
      expect(fs.existsSync(lockPath)).toBe(true);
    });
  });

  describe('plan report logging', () => {
    it('logs document lines, unknown-resource warnings and raw warnings', async () => {
      writeLegacyFile(legacyDoc());
      mockedPlan.mockReturnValue(
        makePlan({
          documents: [{ stage: 'dev', region: 'cn-hangzhou', resources: 2, shared: 1 }],
          unknown: [{ stage: 'prod', logicalId: 'functions.mystery', kind: 'resource' }],
          warnings: ['provider mismatch on functions.hello'],
        }),
      );

      await runRegionalMigration(localOptions({ dryRun: true }));

      expect(mockLoggerInfo).toHaveBeenCalledWith('REGIONAL_MIGRATION_PLAN_HEADER');
      expect(mockLoggerInfo).toHaveBeenCalledWith('REGIONAL_MIGRATION_SOURCE_HASH');
      expect(mockLoggerInfo).toHaveBeenCalledWith('REGIONAL_MIGRATION_PLAN_DOCUMENT');
      expect(mockLoggerInfo).not.toHaveBeenCalledWith('REGIONAL_MIGRATION_NO_REGIONAL_RESOURCES');
      expect(mockLoggerWarn).toHaveBeenCalledWith('REGIONAL_MIGRATION_UNKNOWN_HEADER');
      expect(mockLoggerWarn).toHaveBeenCalledWith('REGIONAL_MIGRATION_UNKNOWN_ITEM');
      expect(mockLoggerWarn).toHaveBeenCalledWith('REGIONAL_MIGRATION_UNKNOWN_HINT');
      expect(mockLoggerWarn).toHaveBeenCalledWith('provider mismatch on functions.hello');
      expect(mockLoggerInfo).toHaveBeenCalledWith('REGIONAL_MIGRATION_BACKUP_NOTICE');
    });

    it('logs the no-regional-resources notice for an empty plan without unknown lines', async () => {
      writeLegacyFile(legacyDoc());
      mockedPlan.mockReturnValue(makePlan({ documents: [], unknown: [], warnings: [] }));

      await runRegionalMigration(localOptions({ dryRun: true }));

      expect(mockLoggerInfo).toHaveBeenCalledWith('REGIONAL_MIGRATION_NO_REGIONAL_RESOURCES');
      expect(mockLoggerWarn).not.toHaveBeenCalledWith('REGIONAL_MIGRATION_UNKNOWN_HEADER');
      expect(mockLoggerWarn).not.toHaveBeenCalledWith('REGIONAL_MIGRATION_UNKNOWN_ITEM');
    });
  });
});
