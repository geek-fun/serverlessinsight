import { show } from '../../../src/commands/show';
import { getContext, hasCredentials } from '../../../src/common';
import { createStateBackend } from '../../../src/common/stateBackend';
import { readLockFileForCommand } from '../../../src/common/lockManager';
import { StateBackend, LockMetadata } from '../../../src/common/stateBackend/types';
import { ServerlessIac } from '../../../src/types';
import fs from 'node:fs';
import path from 'node:path';

const mockLoggerInfo = jest.fn();
const mockLoggerWarn = jest.fn();

jest.mock('../../../src/common/logger', () => ({
  logger: {
    info: (...args: unknown[]) => mockLoggerInfo(...args),
    warn: (...args: unknown[]) => mockLoggerWarn(...args),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

jest.mock('../../../src/common', () => ({
  ...jest.requireActual('../../../src/common'),
  getContext: jest.fn(),
  hasCredentials: jest.fn(),
}));

jest.mock('../../../src/common/stateBackend', () => ({
  createStateBackend: jest.fn(),
}));

jest.mock('../../../src/common/lockManager', () => ({
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

  describe('function with internet access', () => {
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
                    internetAccess: true,
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

    it('should display internet access status when true', async () => {
      await show({ stage: 'default', location: testDir, iac: createMockIac('LOCAL') });

      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('Internet Access: Yes'));
    });
  });

  describe('function without internet access', () => {
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
              'functions.fn': {
                mode: 'managed',
                region: 'cn-hangzhou',
                definition: {},
                instances: [
                  {
                    type: 'ALIYUN_FC3_FUNCTION',
                    sid: 'fc-sid',
                    id: 'fn',
                    functionName: 'isolated-function',
                    runtime: 'nodejs18',
                    handler: 'index.handler',
                    memorySize: 512,
                    timeout: 30,
                    internetAccess: false,
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

    it('should display "No" for internet access when false', async () => {
      await show({ stage: 'default', location: testDir, iac: createMockIac('LOCAL') });

      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('Internet Access: No'));
    });
  });

  describe('api gateway resources', () => {
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
              'events.api_group': {
                mode: 'managed',
                region: 'cn-hangzhou',
                definition: {},
                instances: [
                  {
                    type: 'ALIYUN_APIGW_GROUP',
                    sid: 'apigw-group-sid',
                    id: 'api-group-id',
                    groupName: 'my-api-group',
                    subDomain: 'api.example.com',
                    basePath: '/v1',
                  },
                ],
                lastUpdated: new Date().toISOString(),
              },
              'events.api_resource': {
                mode: 'managed',
                region: 'cn-hangzhou',
                definition: {},
                instances: [
                  {
                    type: 'ALIYUN_APIGW_API',
                    sid: 'apigw-api-sid',
                    id: 'api-id',
                    apiName: 'my-api',
                    groupId: 'api-group-id',
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

    it('should display API gateway group with subdomain and base path', async () => {
      await show({ stage: 'default', location: testDir, iac: createMockIac('LOCAL') });

      expect(mockLoggerInfo).toHaveBeenCalledWith(
        expect.stringContaining('API Group: my-api-group'),
      );
      expect(mockLoggerInfo).toHaveBeenCalledWith(
        expect.stringContaining('Sub-domain: api.example.com'),
      );
      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('Base Path: /v1'));
    });

    it('should display API resource with group ID', async () => {
      await show({ stage: 'default', location: testDir, iac: createMockIac('LOCAL') });

      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('API: my-api'));
      expect(mockLoggerInfo).toHaveBeenCalledWith(
        expect.stringContaining('Group ID: api-group-id'),
      );
    });
  });

  describe('api gateway without optional fields', () => {
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
              'events.api': {
                mode: 'managed',
                region: 'cn-hangzhou',
                definition: {},
                instances: [
                  {
                    type: 'ALIYUN_APIGW_GROUP',
                    sid: 'apigw-sid',
                    id: 'api-group-id',
                    groupName: 'api-group-only',
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

    it('should display API group without subdomain and base path', async () => {
      await show({ stage: 'default', location: testDir, iac: createMockIac('LOCAL') });

      expect(mockLoggerInfo).toHaveBeenCalledWith(
        expect.stringContaining('API Group: api-group-only'),
      );
    });
  });

  describe('database resources', () => {
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
              'databases.test_rds': {
                mode: 'managed',
                region: 'cn-hangzhou',
                definition: {},
                instances: [
                  {
                    type: 'ALIYUN_RDS_SERVERLESS',
                    sid: 'rds-sid',
                    id: 'rds-instance-id',
                    instanceId: 'test-rds-instance',
                    engine: 'MySQL',
                    status: 'Running',
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

    it('should display RDS database with engine and status', async () => {
      await show({ stage: 'default', location: testDir, iac: createMockIac('LOCAL') });

      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('test-rds-instance'));
      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('Engine: MySQL'));
      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('Status: Running'));
    });
  });

  describe('tdsql cluster resources', () => {
    beforeEach(() => {
      process.chdir(testDir);

      const stateDir = path.join(testDir, '.serverlessinsight');
      fs.mkdirSync(stateDir, { recursive: true });

      const statePath = path.join(stateDir, 'state-test-app-test-service.json');
      const stateData = {
        version: '1.0.0',
        provider: 'tencent',
        app: 'test-app',
        service: 'test-service',
        stages: {
          default: {
            resources: {
              'databases.tdsql': {
                mode: 'managed',
                region: 'ap-beijing',
                definition: {},
                instances: [
                  {
                    type: 'TDSQL_C_SERVERLESS',
                    sid: 'tdsql-sid',
                    id: 'tdsql-cluster',
                    clusterId: 'tdsql-cluster-id',
                    engine: 'MySQL',
                    status: 'Running',
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

    it('should display TDSQL cluster with cluster ID, engine and status', async () => {
      await show({ stage: 'default', location: testDir, iac: createMockIac('LOCAL') });

      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('tdsql-cluster-id'));
      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('Engine: MySQL'));
      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('Status: Running'));
    });
  });

  describe('tablestore and elasticsearch resources', () => {
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
              'databases.table': {
                mode: 'managed',
                region: 'cn-hangzhou',
                definition: {},
                instances: [
                  {
                    type: 'ALIYUN_TABLESTORE_TABLE',
                    sid: 'tablestore-sid',
                    id: 'my-table',
                    instanceId: 'tablestore-instance',
                    status: 'Active',
                  },
                ],
                lastUpdated: new Date().toISOString(),
              },
              'databases.elasticsearch': {
                mode: 'managed',
                region: 'cn-hangzhou',
                definition: {},
                instances: [
                  {
                    type: 'ALIYUN_ES_SERVERLESS',
                    sid: 'es-sid',
                    id: 'es-instance',
                    clusterId: 'es-cluster-id',
                    engineMode: 'serverless',
                    status: 'Ready',
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

    it('should display tablestore with instance ID and status', async () => {
      await show({ stage: 'default', location: testDir, iac: createMockIac('LOCAL') });

      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('tablestore-instance'));
      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('Status: Active'));
    });

    it('should display elasticsearch with cluster ID and engine mode', async () => {
      await show({ stage: 'default', location: testDir, iac: createMockIac('LOCAL') });

      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('es-cluster-id'));
      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('Engine: serverless'));
    });
  });

  describe('tencent cloud resources', () => {
    beforeEach(() => {
      process.chdir(testDir);

      const stateDir = path.join(testDir, '.serverlessinsight');
      fs.mkdirSync(stateDir, { recursive: true });

      const statePath = path.join(stateDir, 'state-test-app-test-service.json');
      const stateData = {
        version: '1.0.0',
        provider: 'tencent',
        app: 'test-app',
        service: 'test-service',
        stages: {
          default: {
            resources: {
              'functions.scf_fn': {
                mode: 'managed',
                region: 'ap-beijing',
                definition: {},
                instances: [
                  {
                    type: 'SCF_FUNCTION',
                    sid: 'scf-sid',
                    id: 'scf-function',
                    functionName: 'my-scf-function',
                    runtime: 'python3.9',
                    handler: 'index.handler',
                    memorySize: 256,
                    timeout: 60,
                  },
                ],
                lastUpdated: new Date().toISOString(),
              },
              'storage.cos_bucket': {
                mode: 'managed',
                region: 'ap-beijing',
                definition: {},
                instances: [
                  {
                    type: 'COS_BUCKET',
                    sid: 'cos-sid',
                    id: 'cos-bucket',
                    bucketName: 'my-cos-bucket',
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

    it('should display SCF function', async () => {
      await show({ stage: 'default', location: testDir, iac: createMockIac('LOCAL') });

      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('my-scf-function'));
      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('python3.9'));
    });

    it('should display COS bucket with endpoint', async () => {
      await show({ stage: 'default', location: testDir, iac: createMockIac('LOCAL') });

      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('my-cos-bucket'));
      expect(mockLoggerInfo).toHaveBeenCalledWith(
        expect.stringContaining('https://my-cos-bucket.cos.ap-beijing.myqcloud.com'),
      );
    });
  });

  describe('DNS records display', () => {
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
              'dns.verification': {
                mode: 'managed',
                region: 'cn-hangzhou',
                definition: {},
                instances: [
                  {
                    type: 'ALIYUN_APIGW_DNS_VERIFICATION',
                    sid: 'dns-verify-sid',
                    id: 'dns-verify-id',
                    domain: 'api.example.com',
                    cname: 'apigw.example.com',
                    rr: '_acmchallenge',
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

    it('should display DNS verification record with RR and CNAME', async () => {
      await show({ stage: 'default', location: testDir, iac: createMockIac('LOCAL') });

      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('api.example.com'));
      expect(mockLoggerInfo).toHaveBeenCalledWith(
        expect.stringContaining('_acmchallenge -> apigw.example.com'),
      );
    });
  });

  describe('OSS bucket with custom domain fallback', () => {
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
              'buckets.website': {
                mode: 'managed',
                region: 'cn-beijing',
                definition: {},
                instances: [
                  {
                    type: 'ALIYUN_OSS_BUCKET',
                    sid: 'oss-sid',
                    id: 'website-bucket',
                    bucketName: 'website-bucket',
                    customDomain: 'example.com',
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

    it('should display custom domain from instance property', async () => {
      await show({ stage: 'default', location: testDir, iac: createMockIac('LOCAL') });

      expect(mockLoggerInfo).toHaveBeenCalledWith(
        expect.stringContaining('Custom Domain: example.com'),
      );
    });
  });

  describe('multiple resource types', () => {
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
              'functions.fn1': {
                mode: 'managed',
                region: 'cn-hangzhou',
                definition: {},
                instances: [
                  {
                    type: 'ALIYUN_FC3_FUNCTION',
                    sid: 'fc-sid-1',
                    id: 'fn1',
                    functionName: 'function-1',
                    runtime: 'nodejs18',
                    handler: 'index.handler',
                    memorySize: 512,
                    timeout: 30,
                  },
                ],
                lastUpdated: new Date().toISOString(),
              },
              'functions.fn2': {
                mode: 'managed',
                region: 'cn-hangzhou',
                definition: {},
                instances: [
                  {
                    type: 'ALIYUN_FC3_FUNCTION',
                    sid: 'fc-sid-2',
                    id: 'fn2',
                    functionName: 'function-2',
                    runtime: 'python3.9',
                    handler: 'handler.main',
                    memorySize: 256,
                    timeout: 60,
                  },
                ],
                lastUpdated: new Date().toISOString(),
              },
              'buckets.bucket1': {
                mode: 'managed',
                region: 'cn-hangzhou',
                definition: {},
                instances: [
                  {
                    type: 'ALIYUN_OSS_BUCKET',
                    sid: 'oss-sid',
                    id: 'bucket1',
                    bucketName: 'my-bucket',
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

    it('should display all resources grouped by category', async () => {
      await show({ stage: 'default', location: testDir, iac: createMockIac('LOCAL') });

      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('📦 Functions'));
      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('Storage'));
      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('function-1'));
      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('function-2'));
      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('my-bucket'));
    });

    it('should display correct summary with resource count', async () => {
      await show({ stage: 'default', location: testDir, iac: createMockIac('LOCAL') });

      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('Resources:    3'));
    });
  });

  describe('last updated timestamp', () => {
    beforeEach(() => {
      process.chdir(testDir);

      const stateDir = path.join(testDir, '.serverlessinsight');
      fs.mkdirSync(stateDir, { recursive: true });

      const pastDate = new Date();
      pastDate.setHours(pastDate.getHours() - 2);

      const statePath = path.join(stateDir, 'state-test-app-test-service.json');
      const stateData = {
        version: '1.0.0',
        provider: 'aliyun',
        app: 'test-app',
        service: 'test-service',
        stages: {
          default: {
            resources: {
              'functions.fn': {
                mode: 'managed',
                region: 'cn-hangzhou',
                definition: {},
                instances: [
                  {
                    type: 'ALIYUN_FC3_FUNCTION',
                    sid: 'fc-sid',
                    id: 'fn',
                    functionName: 'test-fn',
                    runtime: 'nodejs18',
                    handler: 'index.handler',
                    memorySize: 512,
                    timeout: 30,
                  },
                ],
                lastUpdated: pastDate.toISOString(),
              },
            },
          },
        },
        resources: {},
      };
      fs.writeFileSync(statePath, JSON.stringify(stateData, null, 2));
    });

    it('should display "hours ago" for lastUpdated', async () => {
      await show({ stage: 'default', location: testDir, iac: createMockIac('LOCAL') });

      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('Last Updated:'));
      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('hour(s) ago'));
    });
  });

  describe('default stage usage', () => {
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
              'functions.fn': {
                mode: 'managed',
                region: 'cn-hangzhou',
                definition: {},
                instances: [
                  {
                    type: 'ALIYUN_FC3_FUNCTION',
                    sid: 'fc-sid',
                    id: 'fn',
                    functionName: 'test-fn',
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

    it('should use context stage when stage option not provided', async () => {
      await show({ location: testDir, iac: createMockIac('LOCAL') });

      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('test-fn'));
    });
  });

  describe('remote backend location string formatting', () => {
    it('should display bucket backend location correctly', async () => {
      const mockState = {
        version: '1.0.0',
        provider: 'aliyun',
        app: 'test-app',
        service: 'test-service',
        resources: {
          'functions.fn': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: {},
            instances: [
              {
                type: 'ALIYUN_FC3_FUNCTION',
                sid: 'fc-sid',
                id: 'fn',
                functionName: 'test-fn',
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

      const mockIac = createMockIac('BUCKET_STORE', 'my-state-bucket', 'path/to/state.json');

      await show({ stage: 'default', location: testDir, iac: mockIac });

      expect(mockLoggerInfo).toHaveBeenCalledWith(
        expect.stringContaining('bucket://my-state-bucket/path/to/state.json'),
      );
    });
  });

  describe('resources with minimal data', () => {
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
              'functions.fn': {
                mode: 'managed',
                region: 'cn-hangzhou',
                definition: {},
                instances: [
                  {
                    type: 'ALIYUN_FC3_FUNCTION',
                    sid: 'fc-sid',
                    id: 'fn-fallback-id',
                  },
                ],
                lastUpdated: new Date().toISOString(),
              },
              'dns.record': {
                mode: 'managed',
                region: 'cn-hangzhou',
                definition: {},
                instances: [
                  {
                    type: 'ALIYUN_OSS_DNS_CNAME',
                    sid: 'dns-sid',
                    id: 'dns-fallback-id',
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

    it('should use ID as fallback when functionName not available', async () => {
      await show({ stage: 'default', location: testDir, iac: createMockIac('LOCAL') });

      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('fn-fallback-id'));
    });

    it('should use ID for DNS record when domain not available', async () => {
      await show({ stage: 'default', location: testDir, iac: createMockIac('LOCAL') });

      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('dns-fallback-id'));
    });
  });

  describe('DNS with only CNAME no RR', () => {
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
              'dns.cname': {
                mode: 'managed',
                region: 'cn-hangzhou',
                definition: {},
                instances: [
                  {
                    type: 'ALIYUN_OSS_DNS_CNAME',
                    sid: 'dns-sid',
                    id: 'dns-cname-only',
                    domain: 'example.com',
                    cname: 'example.com.oss-cn-hangzhou.aliyuncs.com',
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

    it('should display CNAME when RR is not present', async () => {
      await show({ stage: 'default', location: testDir, iac: createMockIac('LOCAL') });

      expect(mockLoggerInfo).toHaveBeenCalledWith(
        expect.stringContaining('CNAME: example.com.oss-cn-hangzhou.aliyuncs.com'),
      );
    });
  });

  describe('unknown resource type', () => {
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
              'other.resource': {
                mode: 'managed',
                region: 'cn-hangzhou',
                definition: {},
                instances: [
                  {
                    type: 'UNKNOWN_RESOURCE_TYPE',
                    sid: 'unknown-sid',
                    id: 'unknown-resource',
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

    it('should handle unknown resource type without error', async () => {
      await show({ stage: 'default', location: testDir, iac: createMockIac('LOCAL') });

      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('Other Resources'));
    });
  });

  describe('empty state with remote backend', () => {
    it('should show backend info when no resources and using remote backend', async () => {
      const mockState = {
        version: '1.0.0',
        provider: 'aliyun',
        app: 'test-app',
        service: 'test-service',
        resources: {},
      };

      (mockStateBackend.loadState as jest.Mock).mockResolvedValue(mockState);
      (mockStateBackend.readLock as jest.Mock).mockResolvedValue(null);

      const mockIac = createMockIac('BUCKET_STORE', 'test-bucket', 'state.json');

      await show({ stage: 'default', location: testDir, iac: mockIac });

      expect(mockLoggerInfo).toHaveBeenCalledWith('No resources found in state.');
      expect(mockLoggerInfo).toHaveBeenCalledWith('Backend: Remote');
    });
  });

  describe('empty state with LOCAL backend', () => {
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

    it('should show "local" backend location when no resources with LOCAL backend', async () => {
      await show({ stage: 'default', location: testDir, iac: createMockIac('LOCAL') });

      expect(mockLoggerInfo).toHaveBeenCalledWith('No resources found in state.');
      expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('State location:'));
    });
  });
});
