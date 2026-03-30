import {
  createResource,
  readResource,
  updateResource,
  deleteResource,
} from '../../../../src/stack/volcengineStack/vefaasResource';
import { createVolcengineClient } from '../../../../src/common/volcengineClient';
import { setResource, removeResource, getResource } from '../../../../src/common';
import type { FunctionDomain, Context, StateFile } from '../../../../src/types';
import { PartialResourceError } from '../../../../src/types';

jest.mock('../../../../src/common/volcengineClient', () => ({
  createVolcengineClient: jest.fn(),
}));

jest.mock('../../../../src/common', () => ({
  setResource: jest.fn((state, logicalId, resourceState) => ({
    ...state,
    resources: { ...state.resources, [logicalId]: resourceState },
  })),
  removeResource: jest.fn((state, logicalId) => ({
    ...state,
    resources: Object.fromEntries(
      Object.entries(state.resources).filter(([key]) => key !== logicalId),
    ),
  })),
  getResource: jest.fn(),
  computeFileHash: jest.fn(() => 'test-hash-123'),
  buildSid: jest.fn((provider, service, stage, name) => `${provider}-${service}-${stage}-${name}`),
  attributesEqual: jest.fn((a, b) => JSON.stringify(a) === JSON.stringify(b)),
}));

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
    __: (key: string) => key,
  },
}));

jest.mock('node:fs', () => ({
  readFileSync: jest.fn(() => Buffer.from('test code content')),
}));

describe('vefaasResource', () => {
  const mockContext: Context = {
    app: 'test-app',
    service: 'test-service',
    stage: 'dev',
    region: 'cn-beijing',
    provider: 'volcengine' as unknown as Context['provider'],
    accessKeyId: 'test-ak',
    accessKeySecret: 'test-sk',
    iacLocation: '/test/path',
  };

  const mockState: StateFile = {
    version: '1.0',
    provider: 'volcengine',
    app: 'test-app',
    service: 'test-service',
    stages: {},
    resources: {},
  };

  const mockFunction: FunctionDomain = {
    key: 'test_fn',
    name: 'test-function',
    code: {
      path: '/test/code.zip',
      handler: 'index.handler',
      runtime: 'nodejs16',
    },
    memory: 128,
    timeout: 30,
    storage: {},
  };

  const mockVefaasClient = {
    vefaas: {
      createFunction: jest.fn(),
      getFunction: jest.fn(),
      updateFunctionConfiguration: jest.fn(),
      updateFunctionCode: jest.fn(),
      deleteFunction: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (createVolcengineClient as jest.Mock).mockReturnValue(mockVefaasClient);
  });

  describe('createResource', () => {
    it('should create function successfully', async () => {
      mockVefaasClient.vefaas.createFunction.mockResolvedValueOnce(undefined);
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });

      await createResource(mockContext, mockFunction, mockState);

      expect(mockVefaasClient.vefaas.createFunction).toHaveBeenCalled();
      expect(setResource).toHaveBeenCalled();
    });

    it('should handle recoverable timeout error', async () => {
      const timeoutError = new Error('readtimeout') as Error & { code: string };
      timeoutError.code = 'ReadTimeout';

      mockVefaasClient.vefaas.createFunction.mockRejectedValueOnce(timeoutError);
      mockVefaasClient.vefaas.getFunction
        .mockResolvedValueOnce({
          functionName: 'test-function',
          functionId: 'func-123',
        })
        .mockResolvedValueOnce({
          functionName: 'test-function',
          functionId: 'func-123',
          runtime: 'nodejs16',
        });

      await createResource(mockContext, mockFunction, mockState);

      expect(mockVefaasClient.vefaas.getFunction).toHaveBeenCalledWith('test-function');
    });

    it('should throw PartialResourceError for non-recoverable error', async () => {
      const error = new Error('Access denied') as Error & { code: string };
      error.code = 'AccessDenied';

      mockVefaasClient.vefaas.createFunction.mockRejectedValueOnce(error);

      await expect(createResource(mockContext, mockFunction, mockState)).rejects.toThrow(
        PartialResourceError,
      );
    });

    it('should throw PartialResourceError when function not found after recoverable error', async () => {
      const timeoutError = new Error('timeout') as Error & { code: string };
      timeoutError.code = 'timeout';

      mockVefaasClient.vefaas.createFunction.mockRejectedValueOnce(timeoutError);
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce(null);

      await expect(createResource(mockContext, mockFunction, mockState)).rejects.toThrow(
        PartialResourceError,
      );
    });

    it('should throw error when function not found after creation', async () => {
      mockVefaasClient.vefaas.createFunction.mockResolvedValueOnce(undefined);
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce(null);

      await expect(createResource(mockContext, mockFunction, mockState)).rejects.toThrow();
    });
  });

  describe('readResource', () => {
    it('should read function from provider', async () => {
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        runtime: 'nodejs16',
      });

      const result = await readResource(mockContext, 'test-function');

      expect(mockVefaasClient.vefaas.getFunction).toHaveBeenCalledWith('test-function');
      expect(result).toEqual({
        functionName: 'test-function',
        runtime: 'nodejs16',
      });
    });
  });

  describe('updateResource', () => {
    const stateWithFunction: StateFile = {
      ...mockState,
      resources: {
        'functions.test_fn': {
          mode: 'managed',
          region: 'cn-beijing',
          definition: {
            functionName: 'test-function',
            codeHash: 'old-hash',
            runtime: 'nodejs16',
            handler: 'index.handler',
            memorySize: 128,
            timeout: 30,
          },
          instances: [
            {
              type: 'VOLCENGINE_VEFAAS_FUNCTION',
              sid: 'volcengine-test-service-dev-test-function',
              id: 'test-function',
              functionName: 'test-function',
            },
          ],
          lastUpdated: '2024-01-01T00:00:00Z',
        },
      },
    };

    it('should update function when config changed', async () => {
      (getResource as jest.Mock).mockReturnValue(stateWithFunction.resources['functions.test_fn']);
      jest.requireMock('../../../../src/common').attributesEqual.mockReturnValue(false);

      mockVefaasClient.vefaas.updateFunctionConfiguration.mockResolvedValueOnce(undefined);
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        runtime: 'nodejs18',
      });

      await updateResource(mockContext, mockFunction, stateWithFunction);

      expect(mockVefaasClient.vefaas.updateFunctionConfiguration).toHaveBeenCalled();
    });

    it('should update function code when code changed', async () => {
      (getResource as jest.Mock).mockReturnValue(stateWithFunction.resources['functions.test_fn']);
      jest.requireMock('../../../../src/common').attributesEqual.mockReturnValue(true);

      mockVefaasClient.vefaas.updateFunctionCode.mockResolvedValueOnce(undefined);
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
      });

      await updateResource(mockContext, mockFunction, stateWithFunction);

      expect(mockVefaasClient.vefaas.updateFunctionCode).toHaveBeenCalled();
    });

    it('should throw error when state not found', async () => {
      (getResource as jest.Mock).mockReturnValue(undefined);

      await expect(updateResource(mockContext, mockFunction, mockState)).rejects.toThrow();
    });

    it('should throw error when instance not found', async () => {
      (getResource as jest.Mock).mockReturnValue({
        ...stateWithFunction.resources['functions.test_fn'],
        instances: [],
      });

      await expect(updateResource(mockContext, mockFunction, stateWithFunction)).rejects.toThrow();
    });

    it('should throw error when function not found after update', async () => {
      (getResource as jest.Mock).mockReturnValue(stateWithFunction.resources['functions.test_fn']);
      jest.requireMock('../../../../src/common').attributesEqual.mockReturnValue(true);

      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce(null);

      await expect(updateResource(mockContext, mockFunction, stateWithFunction)).rejects.toThrow();
    });
  });

  describe('deleteResource', () => {
    it('should delete function successfully', async () => {
      mockVefaasClient.vefaas.deleteFunction.mockResolvedValueOnce(undefined);

      await deleteResource(mockContext, 'test-function', 'functions.test_fn', mockState);

      expect(mockVefaasClient.vefaas.deleteFunction).toHaveBeenCalledWith('test-function');
      expect(removeResource).toHaveBeenCalled();
    });

    it('should handle FunctionNotFound error', async () => {
      const error = new Error('Not found') as Error & { code: string };
      error.code = 'FunctionNotFound';

      mockVefaasClient.vefaas.deleteFunction.mockRejectedValueOnce(error);

      await deleteResource(mockContext, 'test-function', 'functions.test_fn', mockState);

      expect(removeResource).toHaveBeenCalled();
    });

    it('should throw other errors', async () => {
      const error = new Error('Access denied') as Error & { code: string };
      error.code = 'AccessDenied';

      mockVefaasClient.vefaas.deleteFunction.mockRejectedValueOnce(error);

      await expect(
        deleteResource(mockContext, 'test-function', 'functions.test_fn', mockState),
      ).rejects.toThrow('Access denied');
    });
  });
});
