import {
  createScfFunction,
  getScfFunction,
  updateScfFunctionConfiguration,
  updateScfFunctionCode,
  deleteScfFunction,
} from '../../../src/stack/scfStack/scfProvider';
import { createScfClient } from '../../../src/common/scfClient';
import { ProviderEnum } from '../../../src/common';
import { Context } from '../../../src/types';
import fs from 'node:fs';

// Mock dependencies
jest.mock('../../../src/common/scfClient');
jest.mock('node:fs');

describe('ScfProvider', () => {
  const mockContext: Context = {
    stage: 'default',
    stackName: 'test-stack',
    provider: ProviderEnum.TENCENT,
    region: 'ap-guangzhou',
    accessKeyId: 'test-key',
    accessKeySecret: 'test-secret',
    iacLocation: 'test.yml',
    parameters: [],
    stages: {},
  };

  const mockConfig = {
    FunctionName: 'test-function',
    Runtime: 'nodejs18',
    Handler: 'index.handler',
    MemorySize: 512,
    Timeout: 10,
    Environment: {
      Variables: [{ Key: 'NODE_ENV', Value: 'production' }],
    },
  };

  let mockClient: {
    CreateFunction: jest.Mock;
    GetFunction: jest.Mock;
    UpdateFunctionConfiguration: jest.Mock;
    UpdateFunctionCode: jest.Mock;
    DeleteFunction: jest.Mock;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockClient = {
      CreateFunction: jest.fn().mockResolvedValue({}),
      GetFunction: jest.fn().mockResolvedValue({}),
      UpdateFunctionConfiguration: jest.fn().mockResolvedValue({}),
      UpdateFunctionCode: jest.fn().mockResolvedValue({}),
      DeleteFunction: jest.fn().mockResolvedValue({}),
    };
    (createScfClient as jest.Mock).mockReturnValue(mockClient);
    (fs.readFileSync as jest.Mock).mockReturnValue(Buffer.from('test-code'));
  });

  describe('createScfFunction', () => {
    it('should create function with all parameters', async () => {
      await createScfFunction(mockContext, mockConfig, 'test.zip');

      expect(createScfClient).toHaveBeenCalledWith(mockContext);
      expect(fs.readFileSync).toHaveBeenCalledWith('test.zip');
      expect(mockClient.CreateFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          FunctionName: 'test-function',
          Runtime: 'nodejs18',
          Handler: 'index.handler',
          MemorySize: 512,
          Timeout: 10,
          Code: {
            ZipFile: expect.any(String),
          },
          Environment: mockConfig.Environment,
        }),
      );
    });

    it('should create function without environment variables', async () => {
      const configWithoutEnv = {
        FunctionName: 'test-function',
        Runtime: 'nodejs18',
        Handler: 'index.handler',
        MemorySize: 512,
        Timeout: 10,
      };

      await createScfFunction(mockContext, configWithoutEnv, 'test.zip');

      const callArgs = mockClient.CreateFunction.mock.calls[0][0];
      expect(callArgs).not.toHaveProperty('Environment');
      expect(callArgs).toMatchObject({
        FunctionName: 'test-function',
        Runtime: 'nodejs18',
        Handler: 'index.handler',
        MemorySize: 512,
        Timeout: 10,
      });
    });

    it('should encode code to base64', async () => {
      await createScfFunction(mockContext, mockConfig, 'test.zip');

      const callArgs = mockClient.CreateFunction.mock.calls[0][0];
      expect(callArgs.Code.ZipFile).toBe(Buffer.from('test-code').toString('base64'));
    });

    it('should propagate errors from client', async () => {
      const error = new Error('Create failed');
      mockClient.CreateFunction.mockRejectedValue(error);

      await expect(createScfFunction(mockContext, mockConfig, 'test.zip')).rejects.toThrow(
        'Create failed',
      );
    });
  });

  describe('getScfFunction', () => {
    it('should get function successfully', async () => {
      mockClient.GetFunction.mockResolvedValue({
        FunctionName: 'test-function',
        Runtime: 'nodejs18',
        Handler: 'index.handler',
        MemorySize: 512,
        Timeout: 10,
        Environment: {
          Variables: [{ Key: 'NODE_ENV', Value: 'production' }],
        },
        ModTime: '2025-01-01T00:00:00Z',
      });

      const result = await getScfFunction(mockContext, 'test-function');

      expect(createScfClient).toHaveBeenCalledWith(mockContext);
      expect(mockClient.GetFunction).toHaveBeenCalledWith({
        FunctionName: 'test-function',
      });
      expect(result).toEqual({
        FunctionName: 'test-function',
        Runtime: 'nodejs18',
        Handler: 'index.handler',
        MemorySize: 512,
        Timeout: 10,
        Environment: {
          Variables: [{ Key: 'NODE_ENV', Value: 'production' }],
        },
        ModTime: '2025-01-01T00:00:00Z',
      });
    });

    it('should return null if response is empty', async () => {
      mockClient.GetFunction.mockResolvedValue({});

      const result = await getScfFunction(mockContext, 'test-function');

      expect(result).toBeNull();
    });

    it('should return null if FunctionName is missing', async () => {
      mockClient.GetFunction.mockResolvedValue({
        Runtime: 'nodejs18',
      });

      const result = await getScfFunction(mockContext, 'test-function');

      expect(result).toBeNull();
    });

    it('should handle function without environment variables', async () => {
      mockClient.GetFunction.mockResolvedValue({
        FunctionName: 'test-function',
        Runtime: 'nodejs18',
        Handler: 'index.handler',
        MemorySize: 512,
        Timeout: 10,
      });

      const result = await getScfFunction(mockContext, 'test-function');

      expect(result).toEqual({
        FunctionName: 'test-function',
        Runtime: 'nodejs18',
        Handler: 'index.handler',
        MemorySize: 512,
        Timeout: 10,
        Environment: undefined,
        ModTime: undefined,
      });
    });

    it('should return null for ResourceNotFound error', async () => {
      const error = { code: 'ResourceNotFound.FunctionName' };
      mockClient.GetFunction.mockRejectedValue(error);

      const result = await getScfFunction(mockContext, 'nonexistent');

      expect(result).toBeNull();
    });

    it('should propagate other errors', async () => {
      const error = new Error('Some other error');
      mockClient.GetFunction.mockRejectedValue(error);

      await expect(getScfFunction(mockContext, 'test-function')).rejects.toThrow(
        'Some other error',
      );
    });

    it('should use default values for missing fields', async () => {
      mockClient.GetFunction.mockResolvedValue({
        FunctionName: 'test-function',
      });

      const result = await getScfFunction(mockContext, 'test-function');

      expect(result).toEqual({
        FunctionName: 'test-function',
        Runtime: '',
        Handler: '',
        MemorySize: 128,
        Timeout: 3,
        Environment: undefined,
        ModTime: undefined,
      });
    });

    it('should handle environment variables with missing keys', async () => {
      mockClient.GetFunction.mockResolvedValue({
        FunctionName: 'test-function',
        Runtime: 'nodejs18',
        Handler: 'index.handler',
        MemorySize: 512,
        Timeout: 10,
        Environment: {
          Variables: [{ Key: 'NODE_ENV' }, { Value: 'test' }, {}],
        },
      });

      const result = await getScfFunction(mockContext, 'test-function');

      expect(result?.Environment?.Variables).toEqual([
        { Key: 'NODE_ENV', Value: '' },
        { Key: '', Value: 'test' },
        { Key: '', Value: '' },
      ]);
    });
  });

  describe('updateScfFunctionConfiguration', () => {
    it('should update function configuration with all parameters', async () => {
      await updateScfFunctionConfiguration(mockContext, mockConfig);

      expect(createScfClient).toHaveBeenCalledWith(mockContext);
      expect(mockClient.UpdateFunctionConfiguration).toHaveBeenCalledWith(
        expect.objectContaining({
          FunctionName: 'test-function',
          Runtime: 'nodejs18',
          Handler: 'index.handler',
          MemorySize: 512,
          Timeout: 10,
          Environment: mockConfig.Environment,
        }),
      );
    });

    it('should update function configuration without environment variables', async () => {
      const configWithoutEnv = {
        FunctionName: 'test-function',
        Runtime: 'nodejs18',
        Handler: 'index.handler',
        MemorySize: 512,
        Timeout: 10,
      };

      await updateScfFunctionConfiguration(mockContext, configWithoutEnv);

      const callArgs = mockClient.UpdateFunctionConfiguration.mock.calls[0][0];
      expect(callArgs).not.toHaveProperty('Environment');
    });

    it('should propagate errors from client', async () => {
      const error = new Error('Update config failed');
      mockClient.UpdateFunctionConfiguration.mockRejectedValue(error);

      await expect(updateScfFunctionConfiguration(mockContext, mockConfig)).rejects.toThrow(
        'Update config failed',
      );
    });
  });

  describe('updateScfFunctionCode', () => {
    it('should update function code', async () => {
      await updateScfFunctionCode(mockContext, 'test-function', 'test.zip');

      expect(createScfClient).toHaveBeenCalledWith(mockContext);
      expect(fs.readFileSync).toHaveBeenCalledWith('test.zip');
      expect(mockClient.UpdateFunctionCode).toHaveBeenCalledWith({
        FunctionName: 'test-function',
        ZipFile: Buffer.from('test-code').toString('base64'),
      });
    });

    it('should encode code to base64', async () => {
      await updateScfFunctionCode(mockContext, 'test-function', 'test.zip');

      const callArgs = mockClient.UpdateFunctionCode.mock.calls[0][0];
      expect(callArgs.ZipFile).toBe(Buffer.from('test-code').toString('base64'));
    });

    it('should propagate errors from client', async () => {
      const error = new Error('Update code failed');
      mockClient.UpdateFunctionCode.mockRejectedValue(error);

      await expect(updateScfFunctionCode(mockContext, 'test-function', 'test.zip')).rejects.toThrow(
        'Update code failed',
      );
    });
  });

  describe('deleteScfFunction', () => {
    it('should delete function', async () => {
      await deleteScfFunction(mockContext, 'test-function');

      expect(createScfClient).toHaveBeenCalledWith(mockContext);
      expect(mockClient.DeleteFunction).toHaveBeenCalledWith({
        FunctionName: 'test-function',
      });
    });

    it('should propagate errors from client', async () => {
      const error = new Error('Delete failed');
      mockClient.DeleteFunction.mockRejectedValue(error);

      await expect(deleteScfFunction(mockContext, 'test-function')).rejects.toThrow(
        'Delete failed',
      );
    });
  });
});
