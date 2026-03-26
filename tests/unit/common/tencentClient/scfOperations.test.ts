import { createScfOperations } from '../../../../src/common/tencentClient/scfOperations';

jest.mock('../../../../src/common/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('../../../../src/lang', () => ({
  lang: {
    __: (key: string, params?: Record<string, unknown>) => {
      if (params) return `${key}:${JSON.stringify(params)}`;
      return key;
    },
  },
}));

const mockScfClient = {
  CreateFunction: jest.fn(),
  GetFunction: jest.fn(),
  UpdateFunctionConfiguration: jest.fn(),
  UpdateFunctionCode: jest.fn(),
  DeleteFunction: jest.fn(),
};

describe('scfOperations', () => {
  let operations: ReturnType<typeof createScfOperations>;

  beforeEach(() => {
    jest.clearAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    operations = createScfOperations(mockScfClient as any);
  });

  describe('createFunction', () => {
    it('should create function successfully with basic config', async () => {
      mockScfClient.CreateFunction.mockResolvedValue({
        FunctionName: 'test-function',
      });

      const config = {
        FunctionName: 'test-function',
        Handler: 'index.handler',
        Runtime: 'nodejs18.x',
        MemorySize: 256,
        Timeout: 30,
      };

      await operations.createFunction(config, 'BASE64_CODE');

      expect(mockScfClient.CreateFunction).toHaveBeenCalledWith({
        FunctionName: 'test-function',
        Code: {
          ZipFile: 'BASE64_CODE',
        },
        Handler: 'index.handler',
        Runtime: 'nodejs18.x',
        MemorySize: 256,
        Timeout: 30,
      });
    });

    it('should create function with environment variables', async () => {
      mockScfClient.CreateFunction.mockResolvedValue({});

      const config = {
        FunctionName: 'test-function',
        Handler: 'index.handler',
        Runtime: 'nodejs18.x',
        MemorySize: 256,
        Timeout: 30,
        Environment: {
          Variables: [
            { Key: 'NODE_ENV', Value: 'production' },
            { Key: 'DB_URL', Value: 'postgres://localhost' },
          ],
        },
      };

      await operations.createFunction(config, 'BASE64_CODE');

      expect(mockScfClient.CreateFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          Environment: config.Environment,
        }),
      );
    });

    it('should handle SDK errors during creation', async () => {
      const error = new Error('CreateFunction failed');
      mockScfClient.CreateFunction.mockRejectedValue(error);

      const config = {
        FunctionName: 'test-function',
        Handler: 'index.handler',
        Runtime: 'nodejs18.x',
      };

      await expect(operations.createFunction(config, 'BASE64_CODE')).rejects.toThrow(
        'CreateFunction failed',
      );
    });

    it('should not include Environment when not provided', async () => {
      mockScfClient.CreateFunction.mockResolvedValue({});

      const config = {
        FunctionName: 'test-function',
        Handler: 'index.handler',
        Runtime: 'nodejs18.x',
      };

      await operations.createFunction(config, 'BASE64_CODE');

      expect(mockScfClient.CreateFunction).toHaveBeenCalledWith(
        expect.not.objectContaining({
          Environment: expect.anything(),
        }),
      );
    });
  });

  describe('getFunction', () => {
    it('should return function info on success', async () => {
      mockScfClient.GetFunction.mockResolvedValue({
        FunctionName: 'test-function',
        Runtime: 'nodejs18.x',
        Handler: 'index.handler',
        MemorySize: 256,
        Timeout: 30,
        ModTime: '2024-01-01T00:00:00Z',
        CodeSize: 1024,
      });

      const result = await operations.getFunction('test-function');

      expect(mockScfClient.GetFunction).toHaveBeenCalledWith({
        FunctionName: 'test-function',
      });
      expect(result).toEqual(
        expect.objectContaining({
          FunctionName: 'test-function',
          Runtime: 'nodejs18.x',
          Handler: 'index.handler',
          MemorySize: 256,
          Timeout: 30,
        }),
      );
    });

    it('should return null when function is not found', async () => {
      const error = Object.assign(new Error('not found'), {
        code: 'ResourceNotFound.FunctionName',
      });
      mockScfClient.GetFunction.mockRejectedValue(error);

      const result = await operations.getFunction('nonexistent-function');

      expect(result).toBeNull();
    });

    it('should return function with environment variables', async () => {
      mockScfClient.GetFunction.mockResolvedValue({
        FunctionName: 'test-function',
        Runtime: 'nodejs18.x',
        Handler: 'index.handler',
        MemorySize: 256,
        Timeout: 30,
        Environment: {
          Variables: [
            { Key: 'NODE_ENV', Value: 'production' },
            { Key: 'LOG_LEVEL', Value: 'info' },
          ],
        },
      });

      const result = await operations.getFunction('test-function');

      expect(result?.Environment?.Variables).toHaveLength(2);
      expect(result?.Environment?.Variables).toContainEqual({
        Key: 'NODE_ENV',
        Value: 'production',
      });
    });

    it('should return function with triggers', async () => {
      mockScfClient.GetFunction.mockResolvedValue({
        FunctionName: 'test-function',
        Runtime: 'nodejs18.x',
        Handler: 'index.handler',
        MemorySize: 256,
        Timeout: 30,
        Triggers: [
          {
            Type: 'timer',
            TriggerName: 'test-trigger',
            TriggerDesc: '*/5 * * * *',
            AddTime: '2024-01-01T00:00:00Z',
            ModTime: '2024-01-01T00:00:00Z',
            Enable: 1,
          },
        ],
      });

      const result = await operations.getFunction('test-function');

      expect(result?.Triggers).toHaveLength(1);
      expect(result?.Triggers?.[0]).toEqual(
        expect.objectContaining({
          Type: 'timer',
          TriggerName: 'test-trigger',
        }),
      );
    });

    it('should handle missing optional fields with defaults', async () => {
      mockScfClient.GetFunction.mockResolvedValue({
        FunctionName: 'test-function',
      });

      const result = await operations.getFunction('test-function');

      expect(result?.MemorySize).toBe(128);
      expect(result?.Timeout).toBe(3);
    });

    it('should return null with missing FunctionName', async () => {
      mockScfClient.GetFunction.mockResolvedValue({
        Runtime: 'nodejs18.x',
      });

      const result = await operations.getFunction('test-function');

      expect(result).toBeNull();
    });

    it('should rethrow unexpected errors', async () => {
      const error = new Error('unauthorized');
      mockScfClient.GetFunction.mockRejectedValue(error);

      await expect(operations.getFunction('test-function')).rejects.toThrow('unauthorized');
    });

    it('should map tags correctly', async () => {
      mockScfClient.GetFunction.mockResolvedValue({
        FunctionName: 'test-function',
        Runtime: 'nodejs18.x',
        Handler: 'index.handler',
        MemorySize: 256,
        Timeout: 30,
        Tags: [
          { Key: 'env', Value: 'prod' },
          { Key: 'team', Value: 'backend' },
        ],
      });

      const result = await operations.getFunction('test-function');

      expect(result?.Tags).toHaveLength(2);
      expect(result?.Tags?.[0]).toEqual({ Key: 'env', Value: 'prod' });
    });
  });

  describe('updateFunctionConfiguration', () => {
    it('should update function configuration successfully', async () => {
      mockScfClient.UpdateFunctionConfiguration.mockResolvedValue({});

      const config = {
        FunctionName: 'test-function',
        Handler: 'index.handler',
        Runtime: 'nodejs18.x',
        MemorySize: 512,
        Timeout: 60,
      };

      await operations.updateFunctionConfiguration(config);

      expect(mockScfClient.UpdateFunctionConfiguration).toHaveBeenCalledWith({
        FunctionName: 'test-function',
        Handler: 'index.handler',
        Runtime: 'nodejs18.x',
        MemorySize: 512,
        Timeout: 60,
      });
    });

    it('should include environment when provided', async () => {
      mockScfClient.UpdateFunctionConfiguration.mockResolvedValue({});

      const config = {
        FunctionName: 'test-function',
        Handler: 'index.handler',
        Runtime: 'nodejs18.x',
        MemorySize: 512,
        Timeout: 60,
        Environment: {
          Variables: [{ Key: 'ENV', Value: 'test' }],
        },
      };

      await operations.updateFunctionConfiguration(config);

      expect(mockScfClient.UpdateFunctionConfiguration).toHaveBeenCalledWith(
        expect.objectContaining({
          Environment: config.Environment,
        }),
      );
    });

    it('should handle update errors', async () => {
      const error = new Error('update failed');
      mockScfClient.UpdateFunctionConfiguration.mockRejectedValue(error);

      const config = {
        FunctionName: 'test-function',
        Handler: 'index.handler',
        Runtime: 'nodejs18.x',
      };

      await expect(operations.updateFunctionConfiguration(config)).rejects.toThrow('update failed');
    });
  });

  describe('updateFunctionCode', () => {
    it('should update function code successfully', async () => {
      mockScfClient.UpdateFunctionCode.mockResolvedValue({});

      await operations.updateFunctionCode('test-function', 'NEW_BASE64_CODE');

      expect(mockScfClient.UpdateFunctionCode).toHaveBeenCalledWith({
        FunctionName: 'test-function',
        ZipFile: 'NEW_BASE64_CODE',
      });
    });

    it('should handle code update errors', async () => {
      const error = new Error('code update failed');
      mockScfClient.UpdateFunctionCode.mockRejectedValue(error);

      await expect(operations.updateFunctionCode('test-function', 'CODE')).rejects.toThrow(
        'code update failed',
      );
    });
  });

  describe('deleteFunction', () => {
    it('should delete function successfully', async () => {
      mockScfClient.DeleteFunction.mockResolvedValue({});

      await operations.deleteFunction('test-function');

      expect(mockScfClient.DeleteFunction).toHaveBeenCalledWith({
        FunctionName: 'test-function',
      });
    });

    it('should handle delete errors', async () => {
      const error = new Error('delete failed');
      mockScfClient.DeleteFunction.mockRejectedValue(error);

      await expect(operations.deleteFunction('test-function')).rejects.toThrow('delete failed');
    });
  });
});
