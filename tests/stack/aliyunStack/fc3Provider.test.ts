import {
  createFc3Function,
  getFc3Function,
  updateFc3FunctionConfiguration,
  updateFc3FunctionCode,
  deleteFc3Function,
} from '../../../src/stack/aliyunStack/fc3Provider';
import { createAliyunClient } from '../../../src/common/aliyunClient';
import { ProviderEnum } from '../../../src/common';
import { Context } from '../../../src/types';
import fs from 'node:fs';

// Mock dependencies
jest.mock('../../../src/common/aliyunClient');
jest.mock('node:fs');

describe('Fc3Provider', () => {
  const mockContext: Context = {
    stage: 'default',
    stackName: 'test-stack',
    provider: ProviderEnum.ALIYUN,
    region: 'cn-hangzhou',
    accountId: '123456789012',
    accessKeyId: 'test-key',
    accessKeySecret: 'test-secret',
    iacLocation: 'test.yml',
    parameters: [],
    stages: {},
  };

  const mockConfig = {
    functionName: 'test-function',
    runtime: 'nodejs20',
    handler: 'index.handler',
    memorySize: 512,
    timeout: 10,
    environmentVariables: { NODE_ENV: 'production' },
  };

  let mockFc3Client: {
    createFunction: jest.Mock;
    getFunction: jest.Mock;
    updateFunction: jest.Mock;
    deleteFunction: jest.Mock;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockFc3Client = {
      createFunction: jest.fn().mockResolvedValue({}),
      getFunction: jest.fn().mockResolvedValue({ body: {} }),
      updateFunction: jest.fn().mockResolvedValue({}),
      deleteFunction: jest.fn().mockResolvedValue({}),
    };
    (createAliyunClient as jest.Mock).mockReturnValue({ fc3: mockFc3Client, oss: {} });
    (fs.readFileSync as jest.Mock).mockReturnValue(Buffer.from('test-code'));
  });

  describe('createFc3Function', () => {
    it('should create function with all parameters', async () => {
      await createFc3Function(mockContext, mockConfig, 'test.zip');

      expect(createAliyunClient).toHaveBeenCalledWith(mockContext);
      expect(fs.readFileSync).toHaveBeenCalledWith('test.zip');
      expect(mockFc3Client.createFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          body: expect.objectContaining({
            functionName: 'test-function',
            runtime: 'nodejs20',
            handler: 'index.handler',
            memorySize: 512,
            timeout: 10,
          }),
        }),
      );
    });

    it('should create function without environment variables', async () => {
      const configWithoutEnv = {
        functionName: 'test-function',
        runtime: 'nodejs20',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 10,
      };

      await createFc3Function(mockContext, configWithoutEnv, 'test.zip');

      expect(mockFc3Client.createFunction).toHaveBeenCalled();
    });

    it('should propagate errors from client', async () => {
      const error = new Error('Create failed');
      mockFc3Client.createFunction.mockRejectedValue(error);

      await expect(createFc3Function(mockContext, mockConfig, 'test.zip')).rejects.toThrow(
        'Create failed',
      );
    });
  });

  describe('getFc3Function', () => {
    it('should get function successfully', async () => {
      mockFc3Client.getFunction.mockResolvedValue({
        body: {
          functionName: 'test-function',
          runtime: 'nodejs20',
          handler: 'index.handler',
          memorySize: 512,
          timeout: 10,
          environmentVariables: { NODE_ENV: 'production' },
          lastModifiedTime: '2025-01-01T00:00:00Z',
        },
      });

      const result = await getFc3Function(mockContext, 'test-function');

      expect(createAliyunClient).toHaveBeenCalledWith(mockContext);
      expect(mockFc3Client.getFunction).toHaveBeenCalledWith('test-function', expect.any(Object));
      expect(result).toMatchObject({
        functionName: 'test-function',
        runtime: 'nodejs20',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 10,
        environmentVariables: { NODE_ENV: 'production' },
        lastModifiedTime: '2025-01-01T00:00:00Z',
      });
    });

    it('should return null if response body is empty', async () => {
      mockFc3Client.getFunction.mockResolvedValue({});

      const result = await getFc3Function(mockContext, 'test-function');

      expect(result).toBeNull();
    });

    it('should return null for FunctionNotFound error', async () => {
      const error = { code: 'FunctionNotFound' };
      mockFc3Client.getFunction.mockRejectedValue(error);

      const result = await getFc3Function(mockContext, 'nonexistent');

      expect(result).toBeNull();
    });

    it('should propagate other errors', async () => {
      const error = new Error('Some other error');
      mockFc3Client.getFunction.mockRejectedValue(error);

      await expect(getFc3Function(mockContext, 'test-function')).rejects.toThrow(
        'Some other error',
      );
    });
  });

  describe('updateFc3FunctionConfiguration', () => {
    it('should update function configuration with all parameters', async () => {
      await updateFc3FunctionConfiguration(mockContext, mockConfig);

      expect(createAliyunClient).toHaveBeenCalledWith(mockContext);
      expect(mockFc3Client.updateFunction).toHaveBeenCalledWith(
        'test-function',
        expect.objectContaining({
          body: expect.objectContaining({
            runtime: 'nodejs20',
            handler: 'index.handler',
            memorySize: 512,
            timeout: 10,
          }),
        }),
      );
    });

    it('should propagate errors from client', async () => {
      const error = new Error('Update config failed');
      mockFc3Client.updateFunction.mockRejectedValue(error);

      await expect(updateFc3FunctionConfiguration(mockContext, mockConfig)).rejects.toThrow(
        'Update config failed',
      );
    });
  });

  describe('updateFc3FunctionCode', () => {
    it('should update function code', async () => {
      await updateFc3FunctionCode(mockContext, 'test-function', 'test.zip');

      expect(createAliyunClient).toHaveBeenCalledWith(mockContext);
      expect(fs.readFileSync).toHaveBeenCalledWith('test.zip');
      expect(mockFc3Client.updateFunction).toHaveBeenCalledWith(
        'test-function',
        expect.objectContaining({
          body: expect.objectContaining({
            code: expect.any(Object),
          }),
        }),
      );
    });

    it('should propagate errors from client', async () => {
      const error = new Error('Update code failed');
      mockFc3Client.updateFunction.mockRejectedValue(error);

      await expect(updateFc3FunctionCode(mockContext, 'test-function', 'test.zip')).rejects.toThrow(
        'Update code failed',
      );
    });
  });

  describe('deleteFc3Function', () => {
    it('should delete function', async () => {
      await deleteFc3Function(mockContext, 'test-function');

      expect(createAliyunClient).toHaveBeenCalledWith(mockContext);
      expect(mockFc3Client.deleteFunction).toHaveBeenCalledWith('test-function');
    });

    it('should propagate errors from client', async () => {
      const error = new Error('Delete failed');
      mockFc3Client.deleteFunction.mockRejectedValue(error);

      await expect(deleteFc3Function(mockContext, 'test-function')).rejects.toThrow(
        'Delete failed',
      );
    });
  });
});
