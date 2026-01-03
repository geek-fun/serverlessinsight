import {
  createResource,
  readResource,
  updateResource,
  deleteResource,
} from '../../../src/stack/aliyunStack/fc3Resource';
import * as fc3Provider from '../../../src/stack/aliyunStack/fc3Provider';
import * as fc3Types from '../../../src/stack/aliyunStack/fc3Types';
import * as stateManager from '../../../src/common/stateManager';
import * as hashUtils from '../../../src/common/hashUtils';
import { ProviderEnum } from '../../../src/common';
import { Context, StateFile, CURRENT_STATE_VERSION } from '../../../src/types';

// Mock dependencies
jest.mock('../../../src/stack/aliyunStack/fc3Provider');
jest.mock('../../../src/stack/aliyunStack/fc3Types');
jest.mock('../../../src/common/stateManager');
jest.mock('../../../src/common/hashUtils');

describe('Fc3Resource', () => {
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

  const initialState: StateFile = {
    version: CURRENT_STATE_VERSION,
    provider: 'aliyun',
    resources: {},
  };

  const testFunction = {
    key: 'test_fn',
    name: 'test-function',
    code: {
      runtime: 'nodejs20',
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
    functionName: 'test-function',
    runtime: 'nodejs20',
    handler: 'index.handler',
    memorySize: 512,
    timeout: 10,
    environmentVariables: { NODE_ENV: 'production' },
  };

  const mockDefinition = {
    functionName: 'test-function',
    runtime: 'nodejs20',
    handler: 'index.handler',
    memorySize: 512,
    timeout: 10,
    environment: { NODE_ENV: 'production' },
    codeHash: 'mock-code-hash',
  };

  const mockFunctionInfo = {
    functionName: 'test-function',
    functionArn: 'arn:acs:fc:cn-hangzhou:123456789012:function/test-function',
    functionId: 'func-123',
    runtime: 'nodejs20',
    handler: 'index.handler',
    memorySize: 512,
    timeout: 10,
    environmentVariables: { NODE_ENV: 'production' },
    lastModifiedTime: '2025-01-01T00:00:00Z',
    codeChecksum: 'provider-code-checksum',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (fc3Types.functionToFc3Config as jest.Mock).mockReturnValue(mockConfig);
    (fc3Types.extractFc3Definition as jest.Mock).mockReturnValue(mockDefinition);
    (hashUtils.computeFileHash as jest.Mock).mockReturnValue('mock-code-hash');
    (fc3Provider.getFc3Function as jest.Mock).mockResolvedValue(mockFunctionInfo);
  });

  describe('createResource', () => {
    it('should create a resource and refresh state from provider', async () => {
      const newState = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: mockDefinition,
            instances: expect.any(Array),
            lastUpdated: expect.any(String),
          },
        },
      };

      (fc3Provider.createFc3Function as jest.Mock).mockResolvedValue(undefined);
      (stateManager.setResource as jest.Mock).mockReturnValue(newState);

      const result = await createResource(mockContext, testFunction, initialState);

      expect(fc3Types.functionToFc3Config).toHaveBeenCalledWith(testFunction);
      expect(fc3Provider.createFc3Function).toHaveBeenCalledWith(
        mockContext,
        mockConfig,
        'test.zip',
      );
      expect(fc3Provider.getFc3Function).toHaveBeenCalledWith(mockContext, 'test-function');
      expect(hashUtils.computeFileHash).toHaveBeenCalledWith('test.zip');
      expect(fc3Types.extractFc3Definition).toHaveBeenCalledWith(mockConfig, 'mock-code-hash');
      expect(stateManager.setResource).toHaveBeenCalledWith(
        initialState,
        'functions.test_fn',
        expect.objectContaining({
          mode: 'managed',
          region: 'cn-hangzhou',
          definition: mockDefinition,
          instances: expect.arrayContaining([
            expect.objectContaining({
              arn: expect.stringContaining('arn:acs:fc'),
              id: 'test-function',
              functionName: 'test-function',
              runtime: 'nodejs20',
              handler: 'index.handler',
              memorySize: 512,
              timeout: 10,
            }),
          ]),
        }),
      );
      expect(result).toEqual(newState);
    });

    it('should propagate errors from createFc3Function', async () => {
      const error = new Error('Create failed');
      (fc3Provider.createFc3Function as jest.Mock).mockRejectedValue(error);

      await expect(createResource(mockContext, testFunction, initialState)).rejects.toThrow(
        'Create failed',
      );
    });

    it('should throw error when refresh state fails', async () => {
      (fc3Provider.createFc3Function as jest.Mock).mockResolvedValue(undefined);
      (fc3Provider.getFc3Function as jest.Mock).mockResolvedValue(null);

      await expect(createResource(mockContext, testFunction, initialState)).rejects.toThrow(
        'Failed to refresh state for function: test-function',
      );
    });
  });

  describe('readResource', () => {
    it('should read resource from provider', async () => {
      (fc3Provider.getFc3Function as jest.Mock).mockResolvedValue(mockFunctionInfo);

      const result = await readResource(mockContext, 'test-function');

      expect(fc3Provider.getFc3Function).toHaveBeenCalledWith(mockContext, 'test-function');
      expect(result).toEqual(mockFunctionInfo);
    });

    it('should return null if function not found', async () => {
      (fc3Provider.getFc3Function as jest.Mock).mockResolvedValue(null);

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
            region: 'cn-hangzhou',
            definition: mockDefinition,
            instances: expect.any(Array),
            lastUpdated: expect.any(String),
          },
        },
      };

      (fc3Provider.updateFc3FunctionConfiguration as jest.Mock).mockResolvedValue(undefined);
      (fc3Provider.updateFc3FunctionCode as jest.Mock).mockResolvedValue(undefined);
      (stateManager.setResource as jest.Mock).mockReturnValue(newState);

      const result = await updateResource(mockContext, testFunction, initialState);

      expect(fc3Types.functionToFc3Config).toHaveBeenCalledWith(testFunction);
      expect(fc3Provider.updateFc3FunctionConfiguration).toHaveBeenCalledWith(
        mockContext,
        mockConfig,
      );
      expect(fc3Provider.updateFc3FunctionCode).toHaveBeenCalledWith(
        mockContext,
        'test-function',
        'test.zip',
      );
      expect(fc3Provider.getFc3Function).toHaveBeenCalledWith(mockContext, 'test-function');
      expect(hashUtils.computeFileHash).toHaveBeenCalledWith('test.zip');
      expect(fc3Types.extractFc3Definition).toHaveBeenCalledWith(mockConfig, 'mock-code-hash');
      expect(result).toEqual(newState);
    });

    it('should propagate errors from updateFc3FunctionConfiguration', async () => {
      const error = new Error('Update config failed');
      (fc3Provider.updateFc3FunctionConfiguration as jest.Mock).mockRejectedValue(error);

      await expect(updateResource(mockContext, testFunction, initialState)).rejects.toThrow(
        'Update config failed',
      );
    });

    it('should propagate errors from updateFc3FunctionCode', async () => {
      const error = new Error('Update code failed');
      (fc3Provider.updateFc3FunctionConfiguration as jest.Mock).mockResolvedValue(undefined);
      (fc3Provider.updateFc3FunctionCode as jest.Mock).mockRejectedValue(error);

      await expect(updateResource(mockContext, testFunction, initialState)).rejects.toThrow(
        'Update code failed',
      );
    });

    it('should throw error when refresh state fails', async () => {
      (fc3Provider.updateFc3FunctionConfiguration as jest.Mock).mockResolvedValue(undefined);
      (fc3Provider.updateFc3FunctionCode as jest.Mock).mockResolvedValue(undefined);
      (fc3Provider.getFc3Function as jest.Mock).mockResolvedValue(null);

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
            region: 'cn-hangzhou',
            definition: mockDefinition,
            instances: [
              {
                arn: 'arn:acs:fc:cn-hangzhou:123456789012:function/test-function',
                id: 'test-function',
                functionName: 'test-function',
              },
            ],
            lastUpdated: '2025-01-01T00:00:00Z',
          },
        },
      };

      (fc3Provider.deleteFc3Function as jest.Mock).mockResolvedValue(undefined);
      (stateManager.removeResource as jest.Mock).mockReturnValue(initialState);

      const result = await deleteResource(
        mockContext,
        'test-function',
        'functions.test_fn',
        stateWithFunction,
      );

      expect(fc3Provider.deleteFc3Function).toHaveBeenCalledWith(mockContext, 'test-function');
      expect(stateManager.removeResource).toHaveBeenCalledWith(
        stateWithFunction,
        'functions.test_fn',
      );
      expect(result).toEqual(initialState);
    });

    it('should propagate errors from deleteFc3Function', async () => {
      const error = new Error('Delete failed');
      (fc3Provider.deleteFc3Function as jest.Mock).mockRejectedValue(error);

      await expect(
        deleteResource(mockContext, 'test-function', 'functions.test_fn', initialState),
      ).rejects.toThrow('Delete failed');
    });
  });
});
