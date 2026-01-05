import { ProviderEnum } from '../../../src/common';
import {
  createResource,
  deleteResource,
  readResource,
  updateResource,
} from '../../../src/stack/aliyunStack/fc3Resource';
import { Context, CURRENT_STATE_VERSION, StateFile } from '../../../src/types';

// Create mock operations
const mockedFc3Operations = {
  createFunction: jest.fn(),
  getFunction: jest.fn(),
  updateFunctionConfiguration: jest.fn(),
  updateFunctionCode: jest.fn(),
  deleteFunction: jest.fn(),
};
const mockedFc3Types = {
  functionToFc3Config: jest.fn(),
  extractFc3Definition: jest.fn(),
};
const mockedStateManager = {
  setResource: jest.fn(),
  removeResource: jest.fn(),
};
const mockedHashUtils = {
  computeFileHash: jest.fn(),
};
const mockedSlsOperations = {
  createProject: jest.fn(),
  createLogstore: jest.fn(),
  createIndex: jest.fn(),
  deleteProject: jest.fn(),
  deleteLogstore: jest.fn(),
  deleteIndex: jest.fn(),
};
const mockedRamOperations = {
  createRole: jest.fn(),
  deleteRole: jest.fn(),
};
const mockedEcsOperations = {
  createSecurityGroup: jest.fn(),
  deleteSecurityGroup: jest.fn(),
};
const mockedNasOperations = {
  createAccessGroup: jest.fn(),
  createAccessRule: jest.fn(),
  createFileSystem: jest.fn(),
  createMountTarget: jest.fn(),
  deleteAccessGroup: jest.fn(),
  deleteFileSystem: jest.fn(),
  deleteMountTarget: jest.fn(),
};
const mockedLogger = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};

jest.mock('../../../src/common/aliyunClient', () => ({
  createAliyunClient: () => ({
    oss: {},
    fc3: mockedFc3Operations,
    sls: mockedSlsOperations,
    ram: mockedRamOperations,
    ecs: mockedEcsOperations,
    nas: mockedNasOperations,
  }),
}));

jest.mock('../../../src/common/logger', () => ({
  logger: mockedLogger,
}));

jest.mock('../../../src/stack/aliyunStack/fc3Types', () => ({
  functionToFc3Config: (...args: unknown[]) => mockedFc3Types.functionToFc3Config(...args),
  extractFc3Definition: (...args: unknown[]) => mockedFc3Types.extractFc3Definition(...args),
}));

jest.mock('../../../src/common/stateManager', () => ({
  ...jest.requireActual('../../../src/common/stateManager'),
  setResource: (...args: unknown[]) => mockedStateManager.setResource(...args),
  removeResource: (...args: unknown[]) => mockedStateManager.removeResource(...args),
}));

jest.mock('../../../src/common/hashUtils', () => ({
  ...jest.requireActual('../../../src/common/hashUtils'),
  computeFileHash: (...args: unknown[]) => mockedHashUtils.computeFileHash(...args),
}));

jest.mock('../../../src/common/context');

import * as context from '../../../src/common/context';

const initialState: StateFile = {
  version: CURRENT_STATE_VERSION,
  provider: 'aliyun',
  resources: {},
};

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
    mockedFc3Types.functionToFc3Config.mockReturnValue(mockConfig);
    mockedFc3Types.extractFc3Definition.mockReturnValue(mockDefinition);
    mockedHashUtils.computeFileHash.mockReturnValue('mock-code-hash');
    mockedFc3Operations.getFunction.mockResolvedValue(mockFunctionInfo);
    (context.getContext as jest.Mock).mockReturnValue(mockContext);

    // Mock dependent resource operations
    mockedRamOperations.createRole.mockResolvedValue({
      roleName: 'test-role',
      arn: 'acs:ram::123456789012:role/test-role',
    });
    mockedRamOperations.deleteRole.mockResolvedValue(undefined);
    mockedSlsOperations.createProject.mockResolvedValue({ projectName: 'test-sls' });
    mockedSlsOperations.createLogstore.mockResolvedValue({ logstoreName: 'test-logstore' });
    mockedSlsOperations.createIndex.mockResolvedValue({});
    mockedSlsOperations.deleteProject.mockResolvedValue(undefined);
    mockedSlsOperations.deleteLogstore.mockResolvedValue(undefined);
    mockedSlsOperations.deleteIndex.mockResolvedValue(undefined);
    mockedEcsOperations.createSecurityGroup.mockResolvedValue({ securityGroupId: 'sg-123' });
    mockedEcsOperations.deleteSecurityGroup.mockResolvedValue(undefined);
    mockedNasOperations.createAccessGroup.mockResolvedValue({ accessGroupName: 'nas-access' });
    mockedNasOperations.createAccessRule.mockResolvedValue(undefined);
    mockedNasOperations.createFileSystem.mockResolvedValue({ fileSystemId: 'fs-123' });
    mockedNasOperations.createMountTarget.mockResolvedValue({
      mountTargetDomain: 'fs-123.nas.cn-hangzhou.com',
    });
    mockedNasOperations.deleteAccessGroup.mockResolvedValue(undefined);
    mockedNasOperations.deleteFileSystem.mockResolvedValue(undefined);
    mockedNasOperations.deleteMountTarget.mockResolvedValue(undefined);

    mockedStateManager.setResource.mockReturnValue(undefined);
    mockedStateManager.removeResource.mockReturnValue(undefined);
  });

  afterEach(() => {
    jest.clearAllMocks();
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
      mockedFc3Operations.createFunction.mockResolvedValue(undefined);
      mockedStateManager.setResource.mockReturnValue(newState);

      const result = await createResource(mockContext, testFunction, initialState);

      expect(mockedFc3Types.functionToFc3Config).toHaveBeenCalledWith(testFunction);
      expect(mockedFc3Operations.createFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          ...mockConfig,
          role: 'acs:ram::123456789012:role/test-role',
        }),
        'test.zip',
      );
      expect(mockedFc3Operations.getFunction).toHaveBeenCalledWith('test-function');
      expect(mockedHashUtils.computeFileHash).toHaveBeenCalledWith('test.zip');
      expect(mockedFc3Types.extractFc3Definition).toHaveBeenCalledWith(
        expect.objectContaining({
          ...mockConfig,
          role: 'acs:ram::123456789012:role/test-role',
        }),
        'mock-code-hash',
      );
      expect(mockedStateManager.setResource).toHaveBeenCalledWith(
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
      mockedFc3Operations.createFunction.mockRejectedValue(error);

      await expect(createResource(mockContext, testFunction, initialState)).rejects.toThrow(
        'Create failed',
      );
    });

    it('should throw error when refresh state fails', async () => {
      mockedFc3Operations.createFunction.mockResolvedValue(undefined);
      mockedFc3Operations.getFunction.mockResolvedValue(null);

      await expect(createResource(mockContext, testFunction, initialState)).rejects.toThrow(
        'Failed to refresh state for function: test-function',
      );
    });
  });

  describe('readResource', () => {
    it('should read resource from provider', async () => {
      mockedFc3Operations.getFunction.mockResolvedValue(mockFunctionInfo);

      const result = await readResource(mockContext, 'test-function');

      expect(mockedFc3Operations.getFunction).toHaveBeenCalledWith('test-function');
      expect(result).toEqual(mockFunctionInfo);
    });

    it('should return null if function not found', async () => {
      mockedFc3Operations.getFunction.mockResolvedValue(null);

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

      mockedFc3Operations.updateFunctionConfiguration.mockResolvedValue(undefined);
      mockedFc3Operations.updateFunctionCode.mockResolvedValue(undefined);
      mockedStateManager.setResource.mockReturnValue(newState);

      const result = await updateResource(mockContext, testFunction, initialState);

      expect(mockedFc3Types.functionToFc3Config).toHaveBeenCalledWith(testFunction);
      expect(mockedFc3Operations.updateFunctionConfiguration).toHaveBeenCalledWith(
        expect.objectContaining({
          ...mockConfig,
          role: 'acs:ram::123456789012:role/test-role',
        }),
      );
      expect(mockedFc3Operations.updateFunctionCode).toHaveBeenCalledWith(
        'test-function',
        'test.zip',
      );
      expect(mockedFc3Operations.getFunction).toHaveBeenCalledWith('test-function');
      expect(mockedHashUtils.computeFileHash).toHaveBeenCalledWith('test.zip');
      expect(mockedFc3Types.extractFc3Definition).toHaveBeenCalledWith(
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
      mockedFc3Operations.updateFunctionConfiguration.mockRejectedValue(error);

      await expect(updateResource(mockContext, testFunction, initialState)).rejects.toThrow(
        'Update config failed',
      );
    });

    it('should propagate errors from updateFc3FunctionCode', async () => {
      const error = new Error('Update code failed');
      mockedFc3Operations.updateFunctionConfiguration.mockResolvedValue(undefined);
      mockedFc3Operations.updateFunctionCode.mockRejectedValue(error);

      await expect(updateResource(mockContext, testFunction, initialState)).rejects.toThrow(
        'Update code failed',
      );
    });

    it('should throw error when refresh state fails', async () => {
      mockedFc3Operations.updateFunctionConfiguration.mockResolvedValue(undefined);
      mockedFc3Operations.updateFunctionCode.mockResolvedValue(undefined);
      mockedFc3Operations.getFunction.mockResolvedValue(null);

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
                type: 'ALIYUN_FC3_FUNCTION',
              },
            ],
            lastUpdated: '2025-01-01T00:00:00Z',
          },
        },
      };

      mockedFc3Operations.deleteFunction.mockResolvedValue(undefined);
      mockedStateManager.removeResource.mockReturnValue(initialState);

      const result = await deleteResource(
        mockContext,
        'test-function',
        'functions.test_fn',
        stateWithFunction,
      );

      expect(mockedFc3Operations.deleteFunction).toHaveBeenCalledWith('test-function');
      expect(mockedStateManager.removeResource).toHaveBeenCalledWith(
        stateWithFunction,
        'functions.test_fn',
      );
      expect(result).toEqual(initialState);
    });

    it('should propagate errors from deleteFc3Function', async () => {
      const error = new Error('Delete failed');
      mockedFc3Operations.deleteFunction.mockRejectedValue(error);

      await expect(
        deleteResource(mockContext, 'test-function', 'functions.test_fn', initialState),
      ).rejects.toThrow('Delete failed');
    });
  });
});
