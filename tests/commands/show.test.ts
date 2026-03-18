import { show } from '../../src/commands/show';
import { getContext, hasCredentials } from '../../src/common';
import { createStateBackend } from '../../src/common/stateBackend';
import { readLockFileForCommand } from '../../src/common/lockManager';
import { StateBackend, LockMetadata } from '../../src/common/stateBackend/types';
import { ServerlessIac } from '../../src/types';
import fs from 'node:fs';
import path from 'node:path';

const mockLoggerInfo = jest.fn();
const mockLoggerWarn = jest.fn();

jest.mock('../../src/common/logger', () => ({
  logger: {
    info: (...args: unknown[]) => mockLoggerInfo(...args),
    warn: (...args: unknown[]) => mockLoggerWarn(...args),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

jest.mock('../../src/common', () => ({
  ...jest.requireActual('../../src/common'),
  getContext: jest.fn(),
  hasCredentials: jest.fn(),
}));

jest.mock('../../src/common/stateBackend', () => ({
  createStateBackend: jest.fn(),
}));

jest.mock('../../src/common/lockManager', () => ({
  readLockFileForCommand: jest.fn(),
}));

describe('show command', () => {
  const testDir = '/tmp/test-show-command';
  const originalCwd = process.cwd();

  const mockContext = {
    app: 'test-app',
    service: 'test-service',
    provider: 'aliyun',
    region: 'cn-hangzhou',
    stage: 'default',
    accessKeyId: 'test-key-id',
    accessKeySecret: 'test-secret',
  };

  const mockStateBackend: StateBackend = {
    loadState: jest.fn(),
    saveState: jest.fn(),
    acquireLock: jest.fn(),
    releaseLock: jest.fn(),
    forceUnlock: jest.fn(),
    readLock: jest.fn(),
    withLock: jest.fn(),
  };

  const createMockIac = (backendType: string, bucket?: string, key?: string): ServerlessIac => {
    return {
      version: '0.0.1',
      app: 'test-app',
      service: 'test-service',
      provider: { name: 'aliyun' as const, region: 'cn-hangzhou' },
      backend:
        backendType === 'BUCKET_STORE'
          ? { type: 'BUCKET_STORE' as const, bucket: bucket!, key: key! }
          : { type: 'LOCAL' as const },
    } as ServerlessIac;
  };

  beforeEach(() => {
    jest.clearAllMocks();

    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    (getContext as jest.Mock).mockReturnValue(mockContext);
    (hasCredentials as jest.Mock).mockReturnValue(true);
    (createStateBackend as jest.Mock).mockReturnValue(mockStateBackend);
    (readLockFileForCommand as jest.Mock).mockReturnValue(null);
  });

  afterEach(() => {
    process.chdir(originalCwd);
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  describe('with local state backend', () => {
    beforeEach(() => {
      process.chdir(testDir);

      const stateDir = path.join(testDir, '.serverlessinsight');
      fs.mkdirSync(stateDir, { recursive: true });

      const statePath = path.join(stateDir, 'state-test-app-test-service.json');
      const stateData = {
        version: '1.0.0',
        provider: 'aliyun',
        app: 'test-app',
        service: 'test-service',
        stages: {
          default: {
            resources: {
              'functions.test_fn': {
                mode: 'managed',
                region: 'cn-hangzhou',
                definition: {},
                instances: [
                  {
                    type: 'ALIYUN_FC3_FUNCTION',
                    sid: 'fc-sid',
                    id: 'test-function',
                    functionName: 'test-function',
                    runtime: 'nodejs18',
                    handler: 'index.handler',
                    memorySize: 512,
                    timeout: 30,
                  },
                ],
                lastUpdated: new Date().toISOString(),
              },
            },
          },
        },
        resources: {},
      };
      fs.writeFileSync(statePath, JSON.stringify(stateData, null, 2));
    });

    it('should display resources from local state', async () => {
      await show({ stage: 'default', location: testDir, iac: createMockIac('LOCAL') });

      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('Loading state'));
      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('DEPLOYED RESOURCES'));
      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('test-function'));
    });

    it('should show lock status when locked', async () => {
      const mockLockInfo: LockMetadata = {
        id: 'test-lock-id',
        user: 'test@example.com',
        processId: 12345,
        hostname: 'test-host',
        operation: 'deploy',
        acquiredAt: new Date().toISOString(),
        path: '/test/path',
      };
      (readLockFileForCommand as jest.Mock).mockReturnValue(mockLockInfo);

      await show({ stage: 'default', location: testDir, iac: createMockIac('LOCAL') });

      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('LOCKED'));
      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('test@example.com'));
    });

    it('should show UNLOCKED when no lock exists', async () => {
      await show({ stage: 'default', location: testDir, iac: createMockIac('LOCAL') });

      expect(mockLoggerInfo).toHaveBeenCalledWith('Lock Status: UNLOCKED');
    });
  });

  describe('with remote state backend', () => {
    it('should use remote backend when configured and credentials available', async () => {
      const mockState = {
        version: '1.0.0',
        provider: 'aliyun',
        app: 'test-app',
        service: 'test-service',
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: {},
            instances: [
              {
                type: 'ALIYUN_FC3_FUNCTION',
                sid: 'fc-sid',
                id: 'test-function',
                functionName: 'test-function',
                runtime: 'nodejs18',
                handler: 'index.handler',
                memorySize: 512,
                timeout: 30,
              },
            ],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      (mockStateBackend.loadState as jest.Mock).mockResolvedValue(mockState);
      (mockStateBackend.readLock as jest.Mock).mockResolvedValue(null);

      const mockIac = createMockIac('BUCKET_STORE', 'test-bucket', 'state.json');

      await show({ stage: 'default', location: testDir, iac: mockIac });

      expect(createStateBackend).toHaveBeenCalledWith(mockIac.backend, mockContext);
      expect(mockStateBackend.loadState).toHaveBeenCalled();
      expect(mockStateBackend.readLock).toHaveBeenCalled();
      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('Backend: Remote'));
    });

    it('should fallback to local state when credentials not available', async () => {
      (hasCredentials as jest.Mock).mockReturnValue(false);

      process.chdir(testDir);
      const stateDir = path.join(testDir, '.serverlessinsight');
      fs.mkdirSync(stateDir, { recursive: true });

      const statePath = path.join(stateDir, 'state-test-app-test-service.json');
      const stateData = {
        version: '1.0.0',
        provider: 'aliyun',
        app: 'test-app',
        service: 'test-service',
        stages: { default: { resources: {} } },
        resources: {},
      };
      fs.writeFileSync(statePath, JSON.stringify(stateData, null, 2));

      const mockIac = createMockIac('BUCKET_STORE', 'test-bucket', 'state.json');

      await show({ stage: 'default', location: testDir, iac: mockIac });

      expect(mockLoggerWarn).toHaveBeenCalledWith(
        expect.stringContaining('credentials not available'),
      );
    });

    it('should fallback to local state when remote backend fails', async () => {
      (mockStateBackend.loadState as jest.Mock).mockRejectedValue(new Error('Network error'));

      process.chdir(testDir);
      const stateDir = path.join(testDir, '.serverlessinsight');
      fs.mkdirSync(stateDir, { recursive: true });

      const statePath = path.join(stateDir, 'state-test-app-test-service.json');
      const stateData = {
        version: '1.0.0',
        provider: 'aliyun',
        app: 'test-app',
        service: 'test-service',
        stages: { default: { resources: {} } },
        resources: {},
      };
      fs.writeFileSync(statePath, JSON.stringify(stateData, null, 2));

      const mockIac = createMockIac('BUCKET_STORE', 'test-bucket', 'state.json');

      await show({ stage: 'default', location: testDir, iac: mockIac });

      expect(mockLoggerWarn).toHaveBeenCalledWith(
        expect.stringContaining('Failed to load state from remote backend'),
      );
    });
  });

  describe('with empty state', () => {
    beforeEach(() => {
      process.chdir(testDir);

      const stateDir = path.join(testDir, '.serverlessinsight');
      fs.mkdirSync(stateDir, { recursive: true });

      const statePath = path.join(stateDir, 'state-test-app-test-service.json');
      const stateData = {
        version: '1.0.0',
        provider: 'aliyun',
        app: 'test-app',
        service: 'test-service',
        stages: { default: { resources: {} } },
        resources: {},
      };
      fs.writeFileSync(statePath, JSON.stringify(stateData, null, 2));
    });

    it('should show "No resources found" when state is empty', async () => {
      await show({ stage: 'default', location: testDir, iac: createMockIac('LOCAL') });

      expect(mockLoggerInfo).toHaveBeenCalledWith('No resources found in state.');
      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('To deploy resources'));
    });
  });

  describe('bucket custom domain display', () => {
    beforeEach(() => {
      process.chdir(testDir);

      const stateDir = path.join(testDir, '.serverlessinsight');
      fs.mkdirSync(stateDir, { recursive: true });

      const statePath = path.join(stateDir, 'state-test-app-test-service.json');
      const stateData = {
        version: '1.0.0',
        provider: 'aliyun',
        app: 'test-app',
        service: 'test-service',
        stages: {
          default: {
            resources: {
              'buckets.test_bucket': {
                mode: 'managed',
                region: 'cn-hangzhou',
                definition: {},
                instances: [
                  {
                    type: 'ALIYUN_OSS_BUCKET',
                    sid: 'oss-sid',
                    id: 'test-bucket',
                    bucketName: 'test-bucket',
                  },
                  {
                    type: 'ALIYUN_OSS_DNS_CNAME',
                    sid: 'dns-sid',
                    id: 'dns-record-id',
                    domain: 'custom.example.com',
                    cname: 'test-bucket.oss-cn-hangzhou.aliyuncs.com',
                    dnsRecordId: 'dns-record-id',
                  },
                ],
                lastUpdated: new Date().toISOString(),
              },
            },
          },
        },
        resources: {},
      };
      fs.writeFileSync(statePath, JSON.stringify(stateData, null, 2));
    });

    it('should display custom domain from DNS instance', async () => {
      await show({ stage: 'default', location: testDir, iac: createMockIac('LOCAL') });

      expect(mockLoggerInfo).toHaveBeenCalledWith(
        expect.stringContaining('Custom Domain: custom.example.com'),
      );
      expect(mockLoggerInfo).toHaveBeenCalledWith(
        expect.stringContaining('CNAME Target: test-bucket.oss-cn-hangzhou.aliyuncs.com'),
      );
    });
  });
});
