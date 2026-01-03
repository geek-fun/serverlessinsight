import {
  createResource,
  readResource,
  updateResource,
  deleteResource,
} from '../../../src/stack/scfStack/scfResource';
import * as scfProvider from '../../../src/stack/scfStack/scfProvider';
import * as scfTypes from '../../../src/stack/scfStack/scfTypes';
import * as stateManager from '../../../src/common/stateManager';
import * as hashUtils from '../../../src/common/hashUtils';
import { ProviderEnum } from '../../../src/common';
import { Context, StateFile, CURRENT_STATE_VERSION } from '../../../src/types';

// Mock dependencies
jest.mock('../../../src/stack/scfStack/scfProvider');
jest.mock('../../../src/stack/scfStack/scfTypes');
jest.mock('../../../src/common/stateManager');
jest.mock('../../../src/common/hashUtils');

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

  const initialState: StateFile = {
    version: CURRENT_STATE_VERSION,
    provider: 'tencent',
    resources: {},
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

  beforeEach(() => {
    jest.clearAllMocks();
    (scfTypes.functionToScfConfig as jest.Mock).mockReturnValue(mockConfig);
    (scfTypes.extractScfDefinition as jest.Mock).mockReturnValue(mockDefinition);
    (hashUtils.computeFileHash as jest.Mock).mockReturnValue('mock-code-hash');
  });

  describe('createResource', () => {
    it('should create a resource and update state', async () => {
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

      (scfProvider.createScfFunction as jest.Mock).mockResolvedValue(undefined);
      (stateManager.setResource as jest.Mock).mockReturnValue(newState);

      const result = await createResource(mockContext, testFunction, initialState);

      expect(scfTypes.functionToScfConfig).toHaveBeenCalledWith(testFunction);
      expect(scfProvider.createScfFunction).toHaveBeenCalledWith(
        mockContext,
        mockConfig,
        'test.zip',
      );
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
            }),
          ]),
        }),
      );
      expect(result).toEqual(newState);
    });

    it('should propagate errors from createScfFunction', async () => {
      const error = new Error('Create failed');
      (scfProvider.createScfFunction as jest.Mock).mockRejectedValue(error);

      await expect(createResource(mockContext, testFunction, initialState)).rejects.toThrow(
        'Create failed',
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

      (scfProvider.getScfFunction as jest.Mock).mockResolvedValue(mockFunctionInfo);

      const result = await readResource(mockContext, 'test-function');

      expect(scfProvider.getScfFunction).toHaveBeenCalledWith(mockContext, 'test-function');
      expect(result).toEqual(mockFunctionInfo);
    });

    it('should return null if function not found', async () => {
      (scfProvider.getScfFunction as jest.Mock).mockResolvedValue(null);

      const result = await readResource(mockContext, 'nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('updateResource', () => {
    it('should update resource configuration and code', async () => {
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

      (scfProvider.updateScfFunctionConfiguration as jest.Mock).mockResolvedValue(undefined);
      (scfProvider.updateScfFunctionCode as jest.Mock).mockResolvedValue(undefined);
      (stateManager.setResource as jest.Mock).mockReturnValue(newState);

      const result = await updateResource(mockContext, testFunction, initialState);

      expect(scfTypes.functionToScfConfig).toHaveBeenCalledWith(testFunction);
      expect(scfProvider.updateScfFunctionConfiguration).toHaveBeenCalledWith(
        mockContext,
        mockConfig,
      );
      expect(scfProvider.updateScfFunctionCode).toHaveBeenCalledWith(
        mockContext,
        'test-function',
        'test.zip',
      );
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
            }),
          ]),
        }),
      );
      expect(result).toEqual(newState);
    });

    it('should propagate errors from updateScfFunctionConfiguration', async () => {
      const error = new Error('Update config failed');
      (scfProvider.updateScfFunctionConfiguration as jest.Mock).mockRejectedValue(error);

      await expect(updateResource(mockContext, testFunction, initialState)).rejects.toThrow(
        'Update config failed',
      );
    });

    it('should propagate errors from updateScfFunctionCode', async () => {
      const error = new Error('Update code failed');
      (scfProvider.updateScfFunctionConfiguration as jest.Mock).mockResolvedValue(undefined);
      (scfProvider.updateScfFunctionCode as jest.Mock).mockRejectedValue(error);

      await expect(updateResource(mockContext, testFunction, initialState)).rejects.toThrow(
        'Update code failed',
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

      (scfProvider.deleteScfFunction as jest.Mock).mockResolvedValue(undefined);
      (stateManager.removeResource as jest.Mock).mockReturnValue(initialState);

      const result = await deleteResource(
        mockContext,
        'test-function',
        'functions.test_fn',
        stateWithFunction,
      );

      expect(scfProvider.deleteScfFunction).toHaveBeenCalledWith(mockContext, 'test-function');
      expect(stateManager.removeResource).toHaveBeenCalledWith(
        stateWithFunction,
        'functions.test_fn',
      );
      expect(result).toEqual(initialState);
    });

    it('should propagate errors from deleteScfFunction', async () => {
      const error = new Error('Delete failed');
      (scfProvider.deleteScfFunction as jest.Mock).mockRejectedValue(error);

      await expect(
        deleteResource(mockContext, 'test-function', 'functions.test_fn', initialState),
      ).rejects.toThrow('Delete failed');
    });
  });
});
