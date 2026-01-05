import {
  createResource,
  readResource,
  updateResource,
  deleteResource,
} from '../../../src/stack/scfStack/scfResource';
import * as scfTypes from '../../../src/stack/scfStack/scfTypes';
import * as stateManager from '../../../src/common/stateManager';
import * as hashUtils from '../../../src/common/hashUtils';
import { ProviderEnum } from '../../../src/common';
import { Context, StateFile, CURRENT_STATE_VERSION } from '../../../src/types';

const mockScfOperations = {
  createFunction: jest.fn(),
  getFunction: jest.fn(),
  updateFunctionConfiguration: jest.fn(),
  updateFunctionCode: jest.fn(),
  deleteFunction: jest.fn(),
};

jest.mock('../../../src/stack/scfStack/scfTypes');
jest.mock('../../../src/common/stateManager');
jest.mock('../../../src/common/hashUtils');

jest.mock('../../../src/common/tencentClient', () => ({
  createTencentClient: () => ({
    scf: mockScfOperations,
    cos: {},
    tdsqlc: {},
  }),
}));

jest.mock('../../../src/common/fileUtils', () => ({
  readFileAsBase64: jest.fn().mockReturnValue('base64encodedcontent'),
}));

const initialState: StateFile = {
  version: CURRENT_STATE_VERSION,
  provider: 'tencent',
  resources: {},
};

describe('ScfResource', () => {
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

  const testFunction = {
    key: 'test_fn',
    name: 'test-function',
    code: {
      runtime: 'nodejs18',
      handler: 'index.handler',
      path: 'test.zip',
    },
    memory: 512,
    timeout: 10,
    environment: {
      NODE_ENV: 'production',
    },
    storage: {},
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

  const mockDefinition = {
    functionName: 'test-function',
    runtime: 'nodejs18',
    handler: 'index.handler',
    memorySize: 512,
    timeout: 10,
    environment: { NODE_ENV: 'production' },
    codeHash: 'mock-code-hash',
  };

  const mockFunctionInfo = {
    FunctionName: 'test-function',
    Runtime: 'nodejs18',
    Handler: 'index.handler',
    MemorySize: 512,
    Timeout: 10,
    Environment: {
      Variables: [{ Key: 'NODE_ENV', Value: 'production' }],
    },
    ModTime: '2025-01-01T00:00:00Z',
    CodeSha256: 'provider-code-sha256',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (scfTypes.functionToScfConfig as jest.Mock).mockReturnValue(mockConfig);
    (scfTypes.extractScfDefinition as jest.Mock).mockReturnValue(mockDefinition);
    (hashUtils.computeFileHash as jest.Mock).mockReturnValue('mock-code-hash');
    mockScfOperations.getFunction.mockResolvedValue(mockFunctionInfo);
  });

  describe('createResource', () => {
    it('should create a resource and refresh state from provider', async () => {
      const newState = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'ap-guangzhou',
            definition: mockDefinition,
            instances: expect.any(Array),
            lastUpdated: expect.any(String),
          },
        },
      };

      (mockScfOperations.createFunction as jest.Mock).mockResolvedValue(undefined);
      (stateManager.setResource as jest.Mock).mockReturnValue(newState);

      const result = await createResource(mockContext, testFunction, initialState);

      expect(scfTypes.functionToScfConfig).toHaveBeenCalledWith(testFunction);
      expect(mockScfOperations.createFunction).toHaveBeenCalledWith(
        mockConfig,
        'base64encodedcontent',
      );
      expect(mockScfOperations.getFunction).toHaveBeenCalledWith('test-function');
      expect(hashUtils.computeFileHash).toHaveBeenCalledWith('test.zip');
      expect(scfTypes.extractScfDefinition).toHaveBeenCalledWith(mockConfig, 'mock-code-hash');
      expect(stateManager.setResource).toHaveBeenCalledWith(
        initialState,
        'functions.test_fn',
        expect.objectContaining({
          mode: 'managed',
          region: 'ap-guangzhou',
          definition: mockDefinition,
          instances: expect.arrayContaining([
            expect.objectContaining({
              arn: expect.stringContaining('arn:tencent:scf'),
              id: 'test-function',
              functionName: 'test-function',
              runtime: 'nodejs18',
              handler: 'index.handler',
              memorySize: 512,
              timeout: 10,
              modTime: '2025-01-01T00:00:00Z',
              codeSha256: 'provider-code-sha256',
            }),
          ]),
        }),
      );
      expect(result).toEqual(newState);
    });

    it('should propagate errors from createScfFunction', async () => {
      const error = new Error('Create failed');
      (mockScfOperations.createFunction as jest.Mock).mockRejectedValue(error);

      await expect(createResource(mockContext, testFunction, initialState)).rejects.toThrow(
        'Create failed',
      );
    });

    it('should throw error when refresh state fails', async () => {
      (mockScfOperations.createFunction as jest.Mock).mockResolvedValue(undefined);
      (mockScfOperations.getFunction as jest.Mock).mockResolvedValue(null);

      await expect(createResource(mockContext, testFunction, initialState)).rejects.toThrow(
        'Failed to refresh state for function: test-function',
      );
    });
  });

  describe('readResource', () => {
    it('should read resource from provider', async () => {
      const mockFunctionInfo = {
        FunctionName: 'test-function',
        Runtime: 'nodejs18',
        Handler: 'index.handler',
        MemorySize: 512,
        Timeout: 10,
      };

      (mockScfOperations.getFunction as jest.Mock).mockResolvedValue(mockFunctionInfo);

      const result = await readResource(mockContext, 'test-function');

      expect(mockScfOperations.getFunction).toHaveBeenCalledWith('test-function');
      expect(result).toEqual(mockFunctionInfo);
    });

    it('should return null if function not found', async () => {
      (mockScfOperations.getFunction as jest.Mock).mockResolvedValue(null);

      const result = await readResource(mockContext, 'nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('updateResource', () => {
    it('should update resource and refresh state from provider', async () => {
      const newState = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'ap-guangzhou',
            definition: mockDefinition,
            instances: expect.any(Array),
            lastUpdated: expect.any(String),
          },
        },
      };

      (mockScfOperations.updateFunctionConfiguration as jest.Mock).mockResolvedValue(undefined);
      (mockScfOperations.updateFunctionCode as jest.Mock).mockResolvedValue(undefined);
      (stateManager.setResource as jest.Mock).mockReturnValue(newState);

      const result = await updateResource(mockContext, testFunction, initialState);

      expect(scfTypes.functionToScfConfig).toHaveBeenCalledWith(testFunction);
      expect(mockScfOperations.updateFunctionConfiguration).toHaveBeenCalledWith(mockConfig);
      expect(mockScfOperations.updateFunctionCode).toHaveBeenCalledWith(
        'test-function',
        'base64encodedcontent',
      );
      expect(mockScfOperations.getFunction).toHaveBeenCalledWith('test-function');
      expect(hashUtils.computeFileHash).toHaveBeenCalledWith('test.zip');
      expect(scfTypes.extractScfDefinition).toHaveBeenCalledWith(mockConfig, 'mock-code-hash');
      expect(stateManager.setResource).toHaveBeenCalledWith(
        initialState,
        'functions.test_fn',
        expect.objectContaining({
          mode: 'managed',
          region: 'ap-guangzhou',
          definition: mockDefinition,
          instances: expect.arrayContaining([
            expect.objectContaining({
              arn: expect.stringContaining('arn:tencent:scf'),
              id: 'test-function',
              functionName: 'test-function',
              runtime: 'nodejs18',
            }),
          ]),
        }),
      );
      expect(result).toEqual(newState);
    });

    it('should propagate errors from updateScfFunctionConfiguration', async () => {
      const error = new Error('Update config failed');
      (mockScfOperations.updateFunctionConfiguration as jest.Mock).mockRejectedValue(error);

      await expect(updateResource(mockContext, testFunction, initialState)).rejects.toThrow(
        'Update config failed',
      );
    });

    it('should propagate errors from updateScfFunctionCode', async () => {
      const error = new Error('Update code failed');
      (mockScfOperations.updateFunctionConfiguration as jest.Mock).mockResolvedValue(undefined);
      (mockScfOperations.updateFunctionCode as jest.Mock).mockRejectedValue(error);

      await expect(updateResource(mockContext, testFunction, initialState)).rejects.toThrow(
        'Update code failed',
      );
    });

    it('should throw error when refresh state fails', async () => {
      (mockScfOperations.updateFunctionConfiguration as jest.Mock).mockResolvedValue(undefined);
      (mockScfOperations.updateFunctionCode as jest.Mock).mockResolvedValue(undefined);
      (mockScfOperations.getFunction as jest.Mock).mockResolvedValue(null);

      await expect(updateResource(mockContext, testFunction, initialState)).rejects.toThrow(
        'Failed to refresh state for function: test-function',
      );
    });
  });

  describe('deleteResource', () => {
    it('should delete resource and remove from state', async () => {
      const stateWithFunction: StateFile = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'ap-guangzhou',
            definition: mockDefinition,
            instances: [
              {
                arn: 'arn:tencent:scf:ap-guangzhou::function:test-function',
                id: 'test-function',
                functionName: 'test-function',
              },
            ],
            lastUpdated: '2025-01-01T00:00:00Z',
          },
        },
      };

      (mockScfOperations.deleteFunction as jest.Mock).mockResolvedValue(undefined);
      (stateManager.removeResource as jest.Mock).mockReturnValue(initialState);

      const result = await deleteResource(
        mockContext,
        'test-function',
        'functions.test_fn',
        stateWithFunction,
      );

      expect(mockScfOperations.deleteFunction).toHaveBeenCalledWith('test-function');
      expect(stateManager.removeResource).toHaveBeenCalledWith(
        stateWithFunction,
        'functions.test_fn',
      );
      expect(result).toEqual(initialState);
    });

    it('should propagate errors from deleteScfFunction', async () => {
      const error = new Error('Delete failed');
      (mockScfOperations.deleteFunction as jest.Mock).mockRejectedValue(error);

      await expect(
        deleteResource(mockContext, 'test-function', 'functions.test_fn', initialState),
      ).rejects.toThrow('Delete failed');
    });
  });
});
