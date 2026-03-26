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

const mockFc3Client = {
  createFunction: mockCreateFunction,
  getFunction: mockGetFunction,
  updateFunction: mockUpdateFunction,
  deleteFunction: mockDeleteFunction,
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
      await operations.deleteFunction('test-function');

      expect(mockDeleteFunction).toHaveBeenCalledWith('test-function');
    });

    it('should throw on deletion error', async () => {
      mockDeleteFunction.mockRejectedValue(new Error('AccessDenied'));

      await expect(operations.deleteFunction('test-function')).rejects.toThrow('AccessDenied');
    });
  });
});
