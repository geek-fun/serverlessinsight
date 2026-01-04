import {
  createResource,
  readResource,
  updateResource,
  deleteResource,
} from '../../../src/stack/aliyunStack/fc3Resource';
import { createAliyunClient } from '../../../src/common/aliyunClient';
import * as fc3Types from '../../../src/stack/aliyunStack/fc3Types';
import * as stateManager from '../../../src/common/stateManager';
import * as hashUtils from '../../../src/common/hashUtils';
import { ProviderEnum } from '../../../src/common';
import { Context, StateFile, CURRENT_STATE_VERSION } from '../../../src/types';

// Mock dependencies
jest.mock('../../../src/common/aliyunClient');
jest.mock('../../../src/stack/aliyunStack/fc3Types');
jest.mock('../../../src/stack/aliyunStack/dependentResourceProvider');
jest.mock('../../../src/common/stateManager');
jest.mock('../../../src/common/hashUtils');
jest.mock('../../../src/common/context');

import * as context from '../../../src/common/context';
import * as dependentResourceProvider from '../../../src/stack/aliyunStack/dependentResourceProvider';

// Create mock operations
const mockFc3Operations = {
  createFunction: jest.fn(),
  getFunction: jest.fn(),
  updateFunctionConfiguration: jest.fn(),
  updateFunctionCode: jest.fn(),
  deleteFunction: jest.fn(),
};

// Setup client mock
(createAliyunClient as jest.Mock).mockReturnValue({
  fc3: mockFc3Operations,
});

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
    (mockFc3Operations.getFunction as jest.Mock).mockResolvedValue(mockFunctionInfo);
    (context.getContext as jest.Mock).mockReturnValue(mockContext);
    (dependentResourceProvider.createDependentResources as jest.Mock).mockResolvedValue({
      logConfig: undefined,
      role: { roleName: 'test-role', arn: 'acs:ram::123456789012:role/test-role' },
      securityGroup: undefined,
      nasConfig: undefined,
      instances: [],
    });
    (dependentResourceProvider.deleteDependentResources as jest.Mock).mockResolvedValue(undefined);
    (stateManager.getResource as jest.Mock).mockReturnValue(undefined);
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

      (mockFc3Operations.createFunction as jest.Mock).mockResolvedValue(undefined);
      (stateManager.setResource as jest.Mock).mockReturnValue(newState);

      const result = await createResource(mockContext, testFunction, initialState);

      expect(fc3Types.functionToFc3Config).toHaveBeenCalledWith(testFunction);
      expect(mockFc3Operations.createFunction).toHaveBeenCalledWith(
        mockContext,
        expect.objectContaining({
          ...mockConfig,
          role: 'acs:ram::123456789012:role/test-role',
        }),
        'test.zip',
      );
      expect(mockFc3Operations.getFunction).toHaveBeenCalledWith(mockContext, 'test-function');
      expect(hashUtils.computeFileHash).toHaveBeenCalledWith('test.zip');
      expect(fc3Types.extractFc3Definition).toHaveBeenCalledWith(
        expect.objectContaining({
          ...mockConfig,
          role: 'acs:ram::123456789012:role/test-role',
        }),
        'mock-code-hash',
      );
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
      (mockFc3Operations.createFunction as jest.Mock).mockRejectedValue(error);

      await expect(createResource(mockContext, testFunction, initialState)).rejects.toThrow(
        'Create failed',
      );
    });

    it('should throw error when refresh state fails', async () => {
      (mockFc3Operations.createFunction as jest.Mock).mockResolvedValue(undefined);
      (mockFc3Operations.getFunction as jest.Mock).mockResolvedValue(null);

      await expect(createResource(mockContext, testFunction, initialState)).rejects.toThrow(
        'Failed to refresh state for function: test-function',
      );
    });
  });

  describe('readResource', () => {
    it('should read resource from provider', async () => {
      (mockFc3Operations.getFunction as jest.Mock).mockResolvedValue(mockFunctionInfo);

      const result = await readResource(mockContext, 'test-function');

      expect(mockFc3Operations.getFunction).toHaveBeenCalledWith(mockContext, 'test-function');
      expect(result).toEqual(mockFunctionInfo);
    });

    it('should return null if function not found', async () => {
      (mockFc3Operations.getFunction as jest.Mock).mockResolvedValue(null);

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

      (mockFc3Operations.updateFunctionConfiguration as jest.Mock).mockResolvedValue(undefined);
      (mockFc3Operations.updateFunctionCode as jest.Mock).mockResolvedValue(undefined);
      (stateManager.setResource as jest.Mock).mockReturnValue(newState);

      const result = await updateResource(mockContext, testFunction, initialState);

      expect(fc3Types.functionToFc3Config).toHaveBeenCalledWith(testFunction);
      expect(mockFc3Operations.updateFunctionConfiguration).toHaveBeenCalledWith(
        mockContext,
        expect.objectContaining({
          ...mockConfig,
          role: 'acs:ram::123456789012:role/test-role',
        }),
      );
      expect(mockFc3Operations.updateFunctionCode).toHaveBeenCalledWith(
        mockContext,
        'test-function',
        'test.zip',
      );
      expect(mockFc3Operations.getFunction).toHaveBeenCalledWith(mockContext, 'test-function');
      expect(hashUtils.computeFileHash).toHaveBeenCalledWith('test.zip');
      expect(fc3Types.extractFc3Definition).toHaveBeenCalledWith(
        expect.objectContaining({
          ...mockConfig,
          role: 'acs:ram::123456789012:role/test-role',
        }),
        'mock-code-hash',
      );
      expect(result).toEqual(newState);
    });

    it('should propagate errors from updateFc3FunctionConfiguration', async () => {
      const error = new Error('Update config failed');
      (mockFc3Operations.updateFunctionConfiguration as jest.Mock).mockRejectedValue(error);

      await expect(updateResource(mockContext, testFunction, initialState)).rejects.toThrow(
        'Update config failed',
      );
    });

    it('should propagate errors from updateFc3FunctionCode', async () => {
      const error = new Error('Update code failed');
      (mockFc3Operations.updateFunctionConfiguration as jest.Mock).mockResolvedValue(undefined);
      (mockFc3Operations.updateFunctionCode as jest.Mock).mockRejectedValue(error);

      await expect(updateResource(mockContext, testFunction, initialState)).rejects.toThrow(
        'Update code failed',
      );
    });

    it('should throw error when refresh state fails', async () => {
      (mockFc3Operations.updateFunctionConfiguration as jest.Mock).mockResolvedValue(undefined);
      (mockFc3Operations.updateFunctionCode as jest.Mock).mockResolvedValue(undefined);
      (mockFc3Operations.getFunction as jest.Mock).mockResolvedValue(null);

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

      (mockFc3Operations.deleteFunction as jest.Mock).mockResolvedValue(undefined);
      (stateManager.removeResource as jest.Mock).mockReturnValue(initialState);

      const result = await deleteResource(
        mockContext,
        'test-function',
        'functions.test_fn',
        stateWithFunction,
      );

      expect(mockFc3Operations.deleteFunction).toHaveBeenCalledWith(mockContext, 'test-function');
      expect(stateManager.removeResource).toHaveBeenCalledWith(
        stateWithFunction,
        'functions.test_fn',
      );
      expect(result).toEqual(initialState);
    });

    it('should propagate errors from deleteFc3Function', async () => {
      const error = new Error('Delete failed');
      (mockFc3Operations.deleteFunction as jest.Mock).mockRejectedValue(error);

      await expect(
        deleteResource(mockContext, 'test-function', 'functions.test_fn', initialState),
      ).rejects.toThrow('Delete failed');
    });
  });
});
