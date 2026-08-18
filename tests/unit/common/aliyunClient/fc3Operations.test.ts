import {
  createFc3Operations,
  OssCodeLocation,
} from '../../../../src/common/aliyunClient/fc3Operations';
import { Fc3FunctionConfig } from '../../../../src/common/aliyunClient/types';
import type Fc3Client from '@alicloud/fc20230330';
import fs from 'node:fs';

jest.mock('node:fs');

const mockCreateFunction = jest.fn();
const mockGetFunction = jest.fn();
const mockUpdateFunction = jest.fn();
const mockDeleteFunction = jest.fn();
const mockCreateTrigger = jest.fn();
const mockDeleteTrigger = jest.fn();
const mockCreateCustomDomain = jest.fn();
const mockGetCustomDomain = jest.fn();
const mockDeleteCustomDomain = jest.fn();

const mockFc3Client = {
  createFunction: mockCreateFunction,
  getFunction: mockGetFunction,
  updateFunction: mockUpdateFunction,
  deleteFunction: mockDeleteFunction,
  createTrigger: mockCreateTrigger,
  deleteTrigger: mockDeleteTrigger,
  createCustomDomain: mockCreateCustomDomain,
  getCustomDomain: mockGetCustomDomain,
  deleteCustomDomain: mockDeleteCustomDomain,
} as unknown as Fc3Client;

jest.mock('../../../../src/common/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

jest.mock('../../../../src/lang', () => ({
  lang: {
    __: (key: string, params?: Record<string, string>) => {
      if (params) return `${key}:${JSON.stringify(params)}`;
      return key;
    },
  },
}));

describe('fc3Operations', () => {
  let operations: ReturnType<typeof createFc3Operations>;

  beforeEach(() => {
    jest.clearAllMocks();
    operations = createFc3Operations(mockFc3Client);
    // Default GetFunction to Active so waits (create/update polling) complete
    // immediately; individual tests override for poll behavior.
    mockGetFunction.mockResolvedValue({
      body: {
        functionName: 'test-function',
        state: 'Active',
      },
    });
  });

  describe('createFunction', () => {
    it('should create function with basic configuration', async () => {
      const config: Fc3FunctionConfig = {
        functionName: 'test-function',
        runtime: 'nodejs18',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 30,
      };

      (fs.readFileSync as jest.Mock).mockReturnValue(Buffer.from('test-code'));

      await operations.createFunction(config, '/path/to/code.zip');

      expect(mockCreateFunction).toHaveBeenCalled();
      const callArgs = mockCreateFunction.mock.calls[0][0];
      expect(callArgs.body.functionName).toBe('test-function');
      expect(callArgs.body.runtime).toBe('nodejs18');
      expect(callArgs.body.handler).toBe('index.handler');
      expect(callArgs.body.memorySize).toBe(512);
      expect(callArgs.body.timeout).toBe(30);
    });

    it('should create function with optional disk and environment variables', async () => {
      const config: Fc3FunctionConfig = {
        functionName: 'test-function',
        runtime: 'nodejs18',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 30,
        diskSize: 1024,
        environmentVariables: { NODE_ENV: 'production' },
      };

      (fs.readFileSync as jest.Mock).mockReturnValue(Buffer.from('test-code'));

      await operations.createFunction(config, '/path/to/code.zip');

      expect(mockCreateFunction).toHaveBeenCalled();
      const callArgs = mockCreateFunction.mock.calls[0][0];
      expect(callArgs.body.diskSize).toBe(1024);
      expect(callArgs.body.environmentVariables).toEqual({ NODE_ENV: 'production' });
    });

    it('should create function with OSS code location', async () => {
      const config: Fc3FunctionConfig = {
        functionName: 'test-function',
        runtime: 'nodejs18',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 30,
      };

      const ossCode: OssCodeLocation = {
        ossBucketName: 'my-bucket',
        ossObjectName: 'code.zip',
      };

      (fs.readFileSync as jest.Mock).mockReturnValue(Buffer.from('test-code'));

      await operations.createFunction(config, '/path/to/code.zip', ossCode);

      expect(mockCreateFunction).toHaveBeenCalled();
      const callArgs = mockCreateFunction.mock.calls[0][0];
      expect(callArgs.body.code.ossBucketName).toBe('my-bucket');
      expect(callArgs.body.code.ossObjectName).toBe('code.zip');
    });

    it('should create function with VPC configuration', async () => {
      const config: Fc3FunctionConfig = {
        functionName: 'test-function',
        runtime: 'nodejs18',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 30,
        vpcConfig: {
          vpcId: 'vpc-123',
          vSwitchIds: ['vsw-456'],
          securityGroupId: 'sg-789',
        },
      };

      (fs.readFileSync as jest.Mock).mockReturnValue(Buffer.from('test-code'));

      await operations.createFunction(config, '/path/to/code.zip');

      expect(mockCreateFunction).toHaveBeenCalled();
      const callArgs = mockCreateFunction.mock.calls[0][0];
      expect(callArgs.body.vpcConfig).toBeDefined();
      expect(callArgs.body.vpcConfig.vpcId).toBe('vpc-123');
    });

    it('should create function with GPU configuration', async () => {
      const config: Fc3FunctionConfig = {
        functionName: 'test-function',
        runtime: 'nodejs18',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 30,
        gpuConfig: {
          gpuMemorySize: 2048,
          gpuType: 'T4',
        },
      };

      (fs.readFileSync as jest.Mock).mockReturnValue(Buffer.from('test-code'));

      await operations.createFunction(config, '/path/to/code.zip');

      expect(mockCreateFunction).toHaveBeenCalled();
      const callArgs = mockCreateFunction.mock.calls[0][0];
      expect(callArgs.body.gpuConfig).toBeDefined();
      expect(callArgs.body.gpuConfig.gpuMemorySize).toBe(2048);
    });

    it('should create function with NAS configuration', async () => {
      const config: Fc3FunctionConfig = {
        functionName: 'test-function',
        runtime: 'nodejs18',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 30,
        nasConfig: {
          userId: 0,
          groupId: 0,
          mountPoints: [
            {
              serverAddr: 'nas-123.cn-hangzhou.nas.aliyuncs.com:/share',
              mountDir: '/mnt/nas',
              enableTls: false,
            },
          ],
        },
      };

      (fs.readFileSync as jest.Mock).mockReturnValue(Buffer.from('test-code'));

      await operations.createFunction(config, '/path/to/code.zip');

      expect(mockCreateFunction).toHaveBeenCalled();
      const callArgs = mockCreateFunction.mock.calls[0][0];
      expect(callArgs.body.nasConfig).toBeDefined();
      expect(callArgs.body.nasConfig.userId).toBe(0);
    });

    it('should create function with log configuration', async () => {
      const config: Fc3FunctionConfig = {
        functionName: 'test-function',
        runtime: 'nodejs18',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 30,
        logConfig: {
          project: 'my-project',
          logstore: 'my-logstore',
          enableRequestMetrics: true,
          enableInstanceMetrics: true,
        },
      };

      (fs.readFileSync as jest.Mock).mockReturnValue(Buffer.from('test-code'));

      await operations.createFunction(config, '/path/to/code.zip');

      expect(mockCreateFunction).toHaveBeenCalled();
      const callArgs = mockCreateFunction.mock.calls[0][0];
      expect(callArgs.body.logConfig).toBeDefined();
      expect(callArgs.body.logConfig.project).toBe('my-project');
    });

    it('should throw on file read error', async () => {
      const config: Fc3FunctionConfig = {
        functionName: 'test-function',
        runtime: 'nodejs18',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 30,
      };

      (fs.readFileSync as jest.Mock).mockImplementation(() => {
        throw new Error('File not found');
      });

      await expect(operations.createFunction(config, '/invalid/path')).rejects.toThrow(
        'File not found',
      );
    });
  });

  describe('getFunction', () => {
    it('should get function successfully', async () => {
      mockGetFunction.mockResolvedValue({
        body: {
          functionName: 'test-function',
          functionArn: 'arn:aliyun:fc:cn-hangzhou:123456789:functions/test-function',
          functionId: 'func-123',
          runtime: 'nodejs18',
          handler: 'index.handler',
          memorySize: 512,
          timeout: 30,
          codeChecksum: 'abc123',
          codeSize: 1024,
          createdTime: '2023-01-01T00:00:00Z',
          lastModifiedTime: '2023-01-01T00:00:00Z',
          state: 'Active',
        },
      });

      const result = await operations.getFunction('test-function');

      expect(result).toBeDefined();
      expect(result?.functionName).toBe('test-function');
      expect(result?.runtime).toBe('nodejs18');
      expect(result?.memorySize).toBe(512);
    });

    it('should return null when function not found', async () => {
      const error = new Error('FunctionNotFound');
      Object.assign(error, { code: 'FunctionNotFound' });
      mockGetFunction.mockRejectedValue(error);

      const result = await operations.getFunction('non-existent');

      expect(result).toBeNull();
    });

    it('should return null when response body is empty', async () => {
      mockGetFunction.mockResolvedValue(null);

      const result = await operations.getFunction('test-function');

      expect(result).toBeNull();
    });

    it('should include optional configurations in response', async () => {
      mockGetFunction.mockResolvedValue({
        body: {
          functionName: 'test-function',
          functionArn: 'arn:aliyun:fc:cn-hangzhou:123456789:functions/test-function',
          functionId: 'func-123',
          runtime: 'nodejs18',
          handler: 'index.handler',
          memorySize: 512,
          timeout: 30,
          vpcConfig: {
            vpcId: 'vpc-123',
            vSwitchIds: ['vsw-456'],
            securityGroupId: 'sg-789',
          },
          gpuConfig: {
            gpuMemorySize: 2048,
            gpuType: 'T4',
          },
          codeChecksum: 'abc123',
          codeSize: 1024,
          createdTime: '2023-01-01T00:00:00Z',
          lastModifiedTime: '2023-01-01T00:00:00Z',
          state: 'Active',
        },
      });

      const result = await operations.getFunction('test-function');

      expect(result?.vpcConfig).toBeDefined();
      expect(result?.vpcConfig?.vpcId).toBe('vpc-123');
      expect(result?.gpuConfig).toBeDefined();
      expect(result?.gpuConfig?.gpuMemorySize).toBe(2048);
    });

    it('should throw on non-FunctionNotFound errors', async () => {
      const error = new Error('InternalError');
      Object.assign(error, { code: 'InternalError' });
      mockGetFunction.mockRejectedValue(error);

      await expect(operations.getFunction('test-function')).rejects.toThrow('InternalError');
    });

    it('should retain the full GetFunction detail set (max-detail state)', async () => {
      mockGetFunction.mockResolvedValue({
        body: {
          functionName: 'max-detail-fn',
          functionArn: 'arn:aliyun:fc:cn-hangzhou:123:functions/max-detail-fn',
          functionId: 'func-999',
          runtime: 'custom.debian12',
          handler: 'index.handler',
          memorySize: 1024,
          timeout: 60,
          diskSize: 512,
          cpu: 1,
          environmentVariables: { NODE_ENV: 'production' },
          vpcConfig: {
            vpcId: 'vpc-123',
            vSwitchIds: ['vsw-1'],
            securityGroupId: 'sg-1',
            role: 'acs:ram::123:role/fc-vpc',
          },
          logConfig: {
            project: 'proj-1',
            logstore: 'logstore-1',
            enableRequestMetrics: true,
            enableInstanceMetrics: true,
            enableLlmMetrics: true,
            logBeginRule: 'DefaultRegex',
          },
          customContainerConfig: {
            image: 'registry.cn-hangzhou.aliyuncs.com/test/image:v1',
            entrypoint: ['/app/start'],
            command: ['--port', '9000'],
            port: 9000,
            accelerationType: 'Default',
            accelerationInfo: { status: 'Ready' },
            acrInstanceId: 'cri-123',
            healthCheckConfig: {
              failureThreshold: 3,
              httpGetUrl: '/health',
              initialDelaySeconds: 5,
              periodSeconds: 10,
              successThreshold: 1,
              timeoutSeconds: 5,
            },
            registryConfig: { authConfig: { password: 'secret', userName: 'user' } },
            resolvedImageUri: 'registry.cn-hangzhou.aliyuncs.com/test/image@sha256:abc',
          },
          customDNS: {
            nameServers: ['8.8.8.8'],
            searches: ['example.com'],
            dnsOptions: [{ name: 'ndots', value: '2' }],
          },
          customRuntimeConfig: {
            args: ['-c'],
            command: ['/opt/run.sh'],
            port: 8080,
            healthCheckConfig: { httpGetUrl: '/', initialDelaySeconds: 1 },
          },
          disableInjectCredentials: 'Env',
          disableOndemand: false,
          enableLongLiving: true,
          idleTimeout: 100,
          instanceConcurrency: 3,
          instanceIsolationMode: 'soft',
          instanceLifecycleConfig: {
            initializer: { handler: 'index.init', timeout: 10 },
            preStop: { handler: 'index.shutdown', timeout: 5 },
          },
          invocationRestriction: {
            disable: false,
            reason: '',
            lastModifiedTime: '2025-01-01T00:00:00Z',
          },
          juiceFsConfig: {
            envs: { KEY: 'val' },
            mountPoints: [
              {
                args: ['-o', 'ro'],
                mountDir: '/mnt/juicefs',
                remoteDir: '/',
                token: 'tok',
                volumeName: 'vol',
              },
            ],
          },
          layers: [{ arn: 'acs:fc:cn-hangzhou:123:layers/l1/versions/1', size: 100 }],
          lockInfo: {
            lockedBy: 'AgentRun',
            lockedAt: '2025-04-05T10:00:00Z',
            lockedResources: ['function'],
          },
          microSandboxConfig: {
            osType: 'Linux',
            readyCommand: '/bin/ready',
            startCommand: '/bin/start',
          },
          ossMountConfig: {
            mountPoints: [
              {
                bucketName: 'b1',
                bucketPath: '/data',
                endpoint: 'oss-cn-hangzhou.aliyuncs.com',
                mountDir: '/mnt/oss',
                readOnly: true,
              },
            ],
          },
          polarFsConfig: {
            groupId: 1000,
            userId: 1000,
            mountPoints: [
              { instanceId: 'polar-1', mountDir: '/mnt/polar', readOnly: true, remoteDir: '/' },
            ],
          },
          resourceGroupId: 'rg-123',
          sessionAffinity: 'MCP_SSE',
          sessionAffinityConfig: '{"sseEndpointPath":"/sse"}',
          tracingConfig: { type: 'Jaeger', params: { endpoint: 'http://jaeger:14268' } },
          description: 'max-detail function',
          internetAccess: true,
          role: 'acs:ram::123:role/fc',
          codeChecksum: 'abc123',
          codeSize: 1024,
          createdTime: '2025-01-01T00:00:00Z',
          lastModifiedTime: '2025-01-02T00:00:00Z',
          state: 'Active',
          stateReason: '',
          stateReasonCode: '',
          lastUpdateStatus: 'Successful',
          lastUpdateStatusReason: '',
          lastUpdateStatusReasonCode: '',
          tags: [{ key: 'si-owned-by', value: 'test-app-test-service:functions.test_fn' }],
        },
      });

      const result = await operations.getFunction('max-detail-fn');

      expect(result).toEqual(
        expect.objectContaining({
          functionArn: 'arn:aliyun:fc:cn-hangzhou:123:functions/max-detail-fn',
          vpcConfig: {
            vpcId: 'vpc-123',
            vSwitchIds: ['vsw-1'],
            securityGroupId: 'sg-1',
            role: 'acs:ram::123:role/fc-vpc',
          },
          logConfig: {
            project: 'proj-1',
            logstore: 'logstore-1',
            enableRequestMetrics: true,
            enableInstanceMetrics: true,
            enableLlmMetrics: true,
            logBeginRule: 'DefaultRegex',
          },
          customContainerConfig: {
            image: 'registry.cn-hangzhou.aliyuncs.com/test/image:v1',
            entrypoint: ['/app/start'],
            command: ['--port', '9000'],
            port: 9000,
            accelerationType: 'Default',
            accelerationInfo: { status: 'Ready' },
            acrInstanceId: 'cri-123',
            healthCheckConfig: {
              failureThreshold: 3,
              httpGetUrl: '/health',
              initialDelaySeconds: 5,
              periodSeconds: 10,
              successThreshold: 1,
              timeoutSeconds: 5,
            },
            registryConfig: { authConfig: { password: 'secret', userName: 'user' } },
            resolvedImageUri: 'registry.cn-hangzhou.aliyuncs.com/test/image@sha256:abc',
          },
          customDNS: {
            nameServers: ['8.8.8.8'],
            searches: ['example.com'],
            dnsOptions: [{ name: 'ndots', value: '2' }],
          },
          customRuntimeConfig: {
            args: ['-c'],
            command: ['/opt/run.sh'],
            port: 8080,
            healthCheckConfig: { httpGetUrl: '/', initialDelaySeconds: 1 },
          },
          disableInjectCredentials: 'Env',
          disableOndemand: false,
          enableLongLiving: true,
          idleTimeout: 100,
          instanceConcurrency: 3,
          instanceIsolationMode: 'soft',
          instanceLifecycleConfig: {
            initializer: { handler: 'index.init', timeout: 10 },
            preStop: { handler: 'index.shutdown', timeout: 5 },
          },
          invocationRestriction: {
            disable: false,
            reason: '',
            lastModifiedTime: '2025-01-01T00:00:00Z',
          },
          juiceFsConfig: {
            envs: { KEY: 'val' },
            mountPoints: [
              {
                args: ['-o', 'ro'],
                mountDir: '/mnt/juicefs',
                remoteDir: '/',
                token: 'tok',
                volumeName: 'vol',
              },
            ],
          },
          layers: [{ arn: 'acs:fc:cn-hangzhou:123:layers/l1/versions/1', size: 100 }],
          lockInfo: {
            lockedBy: 'AgentRun',
            lockedAt: '2025-04-05T10:00:00Z',
            lockedResources: ['function'],
          },
          microSandboxConfig: {
            osType: 'Linux',
            readyCommand: '/bin/ready',
            startCommand: '/bin/start',
          },
          ossMountConfig: {
            mountPoints: [
              {
                bucketName: 'b1',
                bucketPath: '/data',
                endpoint: 'oss-cn-hangzhou.aliyuncs.com',
                mountDir: '/mnt/oss',
                readOnly: true,
              },
            ],
          },
          polarFsConfig: {
            groupId: 1000,
            userId: 1000,
            mountPoints: [
              {
                instanceId: 'polar-1',
                mountDir: '/mnt/polar',
                readOnly: true,
                remoteDir: '/',
              },
            ],
          },
          resourceGroupId: 'rg-123',
          sessionAffinity: 'MCP_SSE',
          sessionAffinityConfig: '{"sseEndpointPath":"/sse"}',
          tracingConfig: { type: 'Jaeger', params: { endpoint: 'http://jaeger:14268' } },
          tags: [{ Key: 'si-owned-by', Value: 'test-app-test-service:functions.test_fn' }],
        }),
      );
    });
  });

  describe('updateFunctionConfiguration', () => {
    it('should update function configuration', async () => {
      const config: Fc3FunctionConfig = {
        functionName: 'test-function',
        runtime: 'nodejs18',
        handler: 'index.handler',
        memorySize: 1024,
        timeout: 60,
      };

      await operations.updateFunctionConfiguration(config);

      expect(mockUpdateFunction).toHaveBeenCalled();
      const callArgs = mockUpdateFunction.mock.calls[0];
      expect(callArgs[0]).toBe('test-function');
      expect(callArgs[1].body.runtime).toBe('nodejs18');
      expect(callArgs[1].body.memorySize).toBe(1024);
      expect(callArgs[1].body.timeout).toBe(60);
    });

    it('should update with optional configurations', async () => {
      const config: Fc3FunctionConfig = {
        functionName: 'test-function',
        runtime: 'nodejs18',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 30,
        diskSize: 2048,
        environmentVariables: { NEW_VAR: 'value' },
        role: 'arn:aliyun:ram::123456789:role/fc-role',
      };

      await operations.updateFunctionConfiguration(config);

      expect(mockUpdateFunction).toHaveBeenCalled();
      const callArgs = mockUpdateFunction.mock.calls[0];
      expect(callArgs[1].body.diskSize).toBe(2048);
      expect(callArgs[1].body.environmentVariables).toEqual({ NEW_VAR: 'value' });
      expect(callArgs[1].body.role).toBe('arn:aliyun:ram::123456789:role/fc-role');
    });
  });

  describe('updateFunctionCode', () => {
    it('should update function code from file', async () => {
      (fs.readFileSync as jest.Mock).mockReturnValue(Buffer.from('new-code'));

      await operations.updateFunctionCode('test-function', '/path/to/new-code.zip');

      expect(mockUpdateFunction).toHaveBeenCalled();
      const callArgs = mockUpdateFunction.mock.calls[0];
      expect(callArgs[0]).toBe('test-function');
      expect(callArgs[1].body.code).toBeDefined();
    });

    it('should update function code from OSS', async () => {
      const ossCode: OssCodeLocation = {
        ossBucketName: 'my-bucket',
        ossObjectName: 'new-code.zip',
      };

      (fs.readFileSync as jest.Mock).mockReturnValue(Buffer.from('ignored'));

      await operations.updateFunctionCode('test-function', '/path/to/code.zip', ossCode);

      expect(mockUpdateFunction).toHaveBeenCalled();
      const callArgs = mockUpdateFunction.mock.calls[0];
      expect(callArgs[1].body.code.ossBucketName).toBe('my-bucket');
      expect(callArgs[1].body.code.ossObjectName).toBe('new-code.zip');
    });
  });

  describe('deleteFunction', () => {
    it('should delete function successfully', async () => {
      // waitForFunctionDeleted polls until GetFunction returns null
      mockGetFunction.mockResolvedValue(null);

      await operations.deleteFunction('test-function');

      expect(mockDeleteFunction).toHaveBeenCalledWith('test-function');
    });

    it('should throw on deletion error', async () => {
      mockDeleteFunction.mockRejectedValue(new Error('AccessDenied'));

      await expect(operations.deleteFunction('test-function')).rejects.toThrow('AccessDenied');
    });
  });

  describe('createTrigger', () => {
    it('should create trigger with config', async () => {
      await operations.createTrigger(
        'test-function',
        'http-trigger',
        'http',
        { authType: 'anonymous', methods: ['GET'] },
        '$LATEST',
      );

      expect(mockCreateTrigger).toHaveBeenCalledTimes(1);
      const [fnName, request] = mockCreateTrigger.mock.calls[0];
      expect(fnName).toBe('test-function');
      expect(request.body.triggerName).toBe('http-trigger');
      expect(request.body.triggerType).toBe('http');
      expect(request.body.triggerConfig).toBe(
        JSON.stringify({ authType: 'anonymous', methods: ['GET'] }),
      );
      expect(request.body.qualifier).toBe('$LATEST');
    });

    it('should create trigger without qualifier', async () => {
      await operations.createTrigger('test-function', 'timer-trigger', 'timer', {
        cron: '* * * * *',
      });

      expect(mockCreateTrigger).toHaveBeenCalledTimes(1);
      const [fnName, request] = mockCreateTrigger.mock.calls[0];
      expect(fnName).toBe('test-function');
      expect(request.body.qualifier).toBeUndefined();
    });

    it('should propagate SDK errors', async () => {
      mockCreateTrigger.mockRejectedValue(new Error('TriggerAlreadyExists'));

      await expect(
        operations.createTrigger('test-function', 'http-trigger', 'http', {}),
      ).rejects.toThrow('TriggerAlreadyExists');
    });
  });

  describe('deleteTrigger', () => {
    it('should delete trigger successfully', async () => {
      await operations.deleteTrigger('test-function', 'http-trigger');

      expect(mockDeleteTrigger).toHaveBeenCalledWith('test-function', 'http-trigger');
    });

    it('should propagate SDK errors', async () => {
      mockDeleteTrigger.mockRejectedValue(new Error('TriggerNotFound'));

      await expect(operations.deleteTrigger('test-function', 'http-trigger')).rejects.toThrow(
        'TriggerNotFound',
      );
    });
  });

  describe('createCustomDomain', () => {
    it('should create custom domain with route to function', async () => {
      await operations.createCustomDomain('api.example.com', 'HTTPS', 'test-function');

      expect(mockCreateCustomDomain).toHaveBeenCalledTimes(1);
      const [request] = mockCreateCustomDomain.mock.calls[0];
      expect(request.body.domainName).toBe('api.example.com');
      expect(request.body.protocol).toBe('HTTPS');
      expect(request.body.routeConfig.routes[0].path).toBe('/*');
      expect(request.body.routeConfig.routes[0].functionName).toBe('test-function');
      expect(request.body.certConfig).toBeUndefined();
    });

    it('should create custom domain with cert config', async () => {
      await operations.createCustomDomain('api.example.com', 'HTTPS', 'test-function', {
        certName: 'my-cert',
        certificate: 'PEM-CERT',
        privateKey: 'PEM-KEY',
      });

      expect(mockCreateCustomDomain).toHaveBeenCalledTimes(1);
      const [request] = mockCreateCustomDomain.mock.calls[0];
      expect(request.body.certConfig.certName).toBe('my-cert');
      expect(request.body.certConfig.certificate).toBe('PEM-CERT');
      expect(request.body.certConfig.privateKey).toBe('PEM-KEY');
    });

    it('should propagate SDK errors', async () => {
      mockCreateCustomDomain.mockRejectedValue(new Error('DomainAlreadyExists'));

      await expect(
        operations.createCustomDomain('api.example.com', 'HTTPS', 'test-function'),
      ).rejects.toThrow('DomainAlreadyExists');
    });
  });

  describe('getCustomDomain', () => {
    it('should return custom domain info', async () => {
      mockGetCustomDomain.mockResolvedValue({
        body: {
          domainName: 'api.example.com',
          protocol: 'HTTPS',
          certConfig: { certName: 'my-cert', certificateId: '123' },
        },
      });

      const result = await operations.getCustomDomain('api.example.com');

      expect(mockGetCustomDomain).toHaveBeenCalledWith('api.example.com');
      expect(result).toEqual({
        domainName: 'api.example.com',
        protocol: 'HTTPS',
        certConfig: { certName: 'my-cert', certificateId: '123' },
      });
    });

    it('should return null when domain not found', async () => {
      const error = Object.assign(new Error('not found'), { code: 'CustomDomainNotFound' });
      mockGetCustomDomain.mockRejectedValue(error);

      const result = await operations.getCustomDomain('nonexistent.example.com');

      expect(result).toBeNull();
    });

    it('should propagate unexpected errors', async () => {
      const error = new Error('unauthorized');
      mockGetCustomDomain.mockRejectedValue(error);

      await expect(operations.getCustomDomain('api.example.com')).rejects.toThrow('unauthorized');
    });
  });

  describe('deleteCustomDomain', () => {
    it('should delete custom domain successfully', async () => {
      await operations.deleteCustomDomain('api.example.com');

      expect(mockDeleteCustomDomain).toHaveBeenCalledWith('api.example.com');
    });

    it('should propagate SDK errors', async () => {
      mockDeleteCustomDomain.mockRejectedValue(new Error('AccessDenied'));

      await expect(operations.deleteCustomDomain('api.example.com')).rejects.toThrow(
        'AccessDenied',
      );
    });
  });
});
