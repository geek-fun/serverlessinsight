import { ProviderEnum } from '../../../../src/common';
import {
  createResource,
  deleteResource,
  readResource,
  updateResource,
} from '../../../../src/stack/aliyunStack/fc3Resource';
import {
  Context,
  CURRENT_STATE_VERSION,
  NasStorageClassEnum,
  PartialResourceError,
  StateFile,
} from '../../../../src/types';

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
  waitForProject: jest.fn(),
  waitForLogstore: jest.fn(),
};
const mockedRamOperations = {
  createRole: jest.fn(),
  updateRoleTrustPolicy: jest.fn(),
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
const mockedOssOperations = {
  getBucket: jest.fn(),
  createBucket: jest.fn(),
  putFile: jest.fn(),
};
const mockedLogger = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};

jest.mock('../../../../src/common/aliyunClient', () => ({
  createAliyunClient: () => ({
    oss: mockedOssOperations,
    fc3: mockedFc3Operations,
    sls: mockedSlsOperations,
    ram: mockedRamOperations,
    ecs: mockedEcsOperations,
    nas: mockedNasOperations,
  }),
}));

jest.mock('../../../../src/common/logger', () => ({
  logger: {
    info: (...args: unknown[]) => mockedLogger.info(...args),
    error: (...args: unknown[]) => mockedLogger.error(...args),
    warn: (...args: unknown[]) => mockedLogger.warn(...args),
  },
}));

jest.mock('../../../../src/stack/aliyunStack/fc3Types', () => ({
  functionToFc3Config: (...args: unknown[]) => mockedFc3Types.functionToFc3Config(...args),
  extractFc3Definition: (...args: unknown[]) => mockedFc3Types.extractFc3Definition(...args),
}));

jest.mock('../../../../src/common/stateManager', () => ({
  ...jest.requireActual('../../../../src/common/stateManager'),
  setResource: (...args: unknown[]) => mockedStateManager.setResource(...args),
  removeResource: (...args: unknown[]) => mockedStateManager.removeResource(...args),
}));

jest.mock('../../../../src/common/hashUtils', () => ({
  ...jest.requireActual('../../../../src/common/hashUtils'),
  computeFileHash: (...args: unknown[]) => mockedHashUtils.computeFileHash(...args),
}));

const mockedStatSync = jest.fn();
jest.mock('node:fs', () => ({
  ...jest.requireActual('node:fs'),
  default: {
    ...jest.requireActual('node:fs'),
    statSync: (...args: unknown[]) => mockedStatSync(...args),
  },
  statSync: (...args: unknown[]) => mockedStatSync(...args),
}));

jest.mock('../../../../src/common/constants', () => ({
  ...jest.requireActual('../../../../src/common/constants'),
  RAM_ROLE_PROPAGATION_DELAY_MS: 0,
  FC3_RECOVERY_GET_FUNCTION_DELAY_MS: 0,
}));

jest.mock('../../../../src/common/context');

import * as context from '../../../../src/common/context';

const initialState: StateFile = {
  version: CURRENT_STATE_VERSION,
  provider: 'aliyun',
  app: 'test-app',
  service: 'test-service',
  stages: {},
  resources: {},
};

describe('Fc3Resource', () => {
  const mockContext: Context = {
    stage: 'default',
    app: 'test-app',
    service: 'test-service',
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
    mockedRamOperations.updateRoleTrustPolicy.mockResolvedValue({
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
    mockedSlsOperations.waitForProject.mockResolvedValue({
      projectName: 'test-sls',
      status: 'Normal',
    });
    mockedSlsOperations.waitForLogstore.mockResolvedValue({
      logstoreName: 'test-logstore',
      projectName: 'test-sls',
    });
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

    mockedOssOperations.getBucket.mockResolvedValue(null);
    mockedOssOperations.createBucket.mockResolvedValue({});
    mockedOssOperations.putFile.mockResolvedValue(undefined);

    mockedStatSync.mockReturnValue({ size: 1024 });

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
      // Fresh deploy (no tainted state): no pre-check getFunction, only post-create refresh
      mockedFc3Operations.getFunction.mockResolvedValueOnce(mockFunctionInfo);
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
        undefined,
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
      expect(mockedStateManager.setResource).toHaveBeenCalledTimes(2);
      expect(mockedStateManager.setResource).toHaveBeenLastCalledWith(
        expect.anything(),
        'functions.test_fn',
        expect.objectContaining({
          mode: 'managed',
          region: 'cn-hangzhou',
          definition: mockDefinition,
          instances: expect.arrayContaining([
            expect.objectContaining({
              sid: expect.stringContaining('si:aliyun:fc3'),
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

    it('should write state twice on success: tainted after dependents, ready after function', async () => {
      // Fresh deploy: no pre-check getFunction, only post-create refresh
      mockedFc3Operations.getFunction.mockResolvedValueOnce(mockFunctionInfo);
      mockedFc3Operations.createFunction.mockResolvedValue(undefined);
      const taintedState = { ...initialState, _tainted: true };
      const readyState = { ...initialState, _ready: true };
      mockedStateManager.setResource
        .mockReturnValueOnce(taintedState)
        .mockReturnValueOnce(readyState);

      const result = await createResource(mockContext, testFunction, initialState);

      expect(mockedStateManager.setResource).toHaveBeenCalledTimes(2);
      const firstCall = mockedStateManager.setResource.mock.calls[0];
      expect(firstCall[2]).toMatchObject({ status: 'tainted' });
      const secondCall = mockedStateManager.setResource.mock.calls[1];
      expect(secondCall[2]).toMatchObject({ status: 'ready' });
      expect(result).toEqual(readyState);
    });

    it('should throw PartialResourceError with tainted state when createFunction fails', async () => {
      const createError = new Error('Create function failed');
      mockedFc3Operations.createFunction.mockRejectedValue(createError);

      const taintedState = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: mockDefinition,
            instances: [
              {
                sid: 'si:aliyun:ram:default:test-app-test-service-default-fc-role',
                roleArn: 'acs:ram::123456789012:role/test-role',
                id: 'test-app-test-service-default-fc-role',
                type: 'ALIYUN_RAM_ROLE',
                roleName: 'test-role',
              },
            ],
            lastUpdated: expect.any(String),
            status: 'tainted',
          },
        },
      };
      mockedStateManager.setResource.mockReturnValue(taintedState);

      await expect(createResource(mockContext, testFunction, initialState)).rejects.toThrow(
        PartialResourceError,
      );

      try {
        await createResource(mockContext, testFunction, initialState);
      } catch (err) {
        expect(err).toBeInstanceOf(PartialResourceError);
        const partialErr = err as PartialResourceError;
        expect(partialErr.cause).toBe(createError);
        expect(partialErr.updatedState).toEqual(taintedState);
      }

      expect(mockedStateManager.setResource).toHaveBeenCalled();
      const firstCall = mockedStateManager.setResource.mock.calls[0];
      expect(firstCall[2]).toMatchObject({ status: 'tainted' });
    });

    it('should update trust policy for existing role on tainted resource retry', async () => {
      const taintedStateWithDependents: StateFile = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: mockDefinition,
            instances: [
              {
                sid: 'si:aliyun:ram:default:test-app-test-service-default-fc-role',
                roleArn: 'acs:ram::123456789012:role/test-app-test-service-default-fc-role',
                id: 'test-app-test-service-default-fc-role',
                type: 'ALIYUN_RAM_ROLE',
                roleName: 'test-app-test-service-default-fc-role',
              },
            ],
            lastUpdated: '2025-01-01T00:00:00Z',
            status: 'tainted',
          },
        },
      };

      mockedFc3Operations.createFunction.mockResolvedValue(undefined);
      const readyState = { ...taintedStateWithDependents };
      mockedStateManager.setResource.mockReturnValue(readyState);

      await createResource(mockContext, testFunction, taintedStateWithDependents);

      expect(mockedRamOperations.updateRoleTrustPolicy).toHaveBeenCalledWith(
        'test-app-test-service-default-fc-role',
        ['fc.aliyuncs.com'],
      );
      expect(mockedRamOperations.createRole).not.toHaveBeenCalled();
    });

    it('should propagate drift recovery error when createRole recovery fails', async () => {
      const driftRecoveryError = new Error(
        'Failed to recover from RAM role state drift for "test-role": EntityNotExist.Role',
      );
      mockedRamOperations.createRole.mockRejectedValue(driftRecoveryError);

      const taintedState = { ...initialState, _tainted: true };
      mockedStateManager.setResource.mockReturnValue(taintedState);

      await expect(createResource(mockContext, testFunction, initialState)).rejects.toThrow(
        'Failed to recover from RAM role state drift',
      );

      expect(mockedRamOperations.createRole).toHaveBeenCalled();
    });

    it('should throw error when refresh state fails', async () => {
      mockedFc3Operations.getFunction.mockResolvedValue(null);
      mockedFc3Operations.createFunction.mockResolvedValue(undefined);

      await expect(createResource(mockContext, testFunction, initialState)).rejects.toThrow(
        'Failed to refresh state for function: test-function',
      );
    });

    it('should skip createFunction when function exists in provider during tainted recovery', async () => {
      const taintedState: StateFile = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: mockDefinition,
            instances: [
              {
                sid: 'si:aliyun:ram:default:test-app-test-service-default-fc-role',
                roleArn: 'acs:ram::123456789012:role/test-app-test-service-default-fc-role',
                id: 'test-app-test-service-default-fc-role',
                type: 'ALIYUN_RAM_ROLE',
                roleName: 'test-app-test-service-default-fc-role',
              },
            ],
            lastUpdated: '2025-01-01T00:00:00Z',
            status: 'tainted',
          },
        },
      };

      mockedFc3Operations.getFunction.mockResolvedValue(mockFunctionInfo);
      const readyState = { ...taintedState, _ready: true };
      mockedStateManager.setResource.mockReturnValue(readyState);

      await createResource(mockContext, testFunction, taintedState);

      expect(mockedFc3Operations.createFunction).not.toHaveBeenCalled();
      expect(mockedFc3Operations.getFunction).toHaveBeenCalledWith('test-function');
    });

    it('should recover when createFunction times out and immediate getFunction finds the function', async () => {
      const timeoutError = Object.assign(new Error('ReadTimeout(60000)'), { code: 'ReadTimeout' });
      mockedFc3Operations.createFunction.mockRejectedValue(timeoutError);
      mockedFc3Operations.getFunction
        .mockResolvedValueOnce(mockFunctionInfo)
        .mockResolvedValueOnce(mockFunctionInfo);

      const readyState = { ...initialState, _ready: true };
      mockedStateManager.setResource.mockReturnValue(readyState);

      const result = await createResource(mockContext, testFunction, initialState);

      expect(mockedFc3Operations.createFunction).toHaveBeenCalled();
      expect(mockedLogger.warn).toHaveBeenCalledWith(
        expect.stringContaining('reconciling with provider state'),
      );
      expect(mockedLogger.info).toHaveBeenCalledWith(
        expect.stringContaining('found after create error reconciliation'),
      );
      expect(result).toEqual(readyState);
    });

    it('should recover when createFunction times out and delayed getFunction finds the function', async () => {
      const timeoutError = Object.assign(new Error('socket hang up'), { code: 'ECONNRESET' });
      mockedFc3Operations.createFunction.mockRejectedValue(timeoutError);
      mockedFc3Operations.getFunction
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(mockFunctionInfo)
        .mockResolvedValueOnce(mockFunctionInfo);

      const readyState = { ...initialState, _ready: true };
      mockedStateManager.setResource.mockReturnValue(readyState);

      const result = await createResource(mockContext, testFunction, initialState);

      expect(mockedFc3Operations.createFunction).toHaveBeenCalled();
      expect(mockedLogger.info).toHaveBeenCalledWith(
        expect.stringContaining('found after delayed reconciliation'),
      );
      expect(result).toEqual(readyState);
    });

    it('should throw PartialResourceError when timeout recovery fails on both getFunction attempts', async () => {
      const timeoutError = Object.assign(new Error('ReadTimeout(60000)'), { code: 'ReadTimeout' });
      mockedFc3Operations.createFunction.mockRejectedValue(timeoutError);
      mockedFc3Operations.getFunction.mockResolvedValue(null);

      const taintedState = { ...initialState, _tainted: true };
      mockedStateManager.setResource.mockReturnValue(taintedState);

      await expect(createResource(mockContext, testFunction, initialState)).rejects.toThrow(
        PartialResourceError,
      );
    });

    it('should throw PartialResourceError immediately for non-recoverable errors', async () => {
      const apiError = Object.assign(new Error('InternalServerError'), { code: 'InternalError' });
      mockedFc3Operations.createFunction.mockRejectedValue(apiError);

      const taintedState = { ...initialState, _tainted: true };
      mockedStateManager.setResource.mockReturnValue(taintedState);

      await expect(createResource(mockContext, testFunction, initialState)).rejects.toThrow(
        PartialResourceError,
      );

      expect(mockedFc3Operations.getFunction).not.toHaveBeenCalled();
    });

    it('should upload code to OSS and pass ossCode when package exceeds size limit', async () => {
      const largeSize = 80 * 1024 * 1024;
      mockedStatSync.mockReturnValue({ size: largeSize });
      mockedOssOperations.getBucket.mockResolvedValue(null);
      mockedFc3Operations.getFunction.mockResolvedValueOnce(mockFunctionInfo);
      mockedFc3Operations.createFunction.mockResolvedValue(undefined);
      const readyState = { ...initialState, _ready: true };
      mockedStateManager.setResource.mockReturnValue(readyState);

      await createResource(mockContext, testFunction, initialState);

      expect(mockedOssOperations.getBucket).toHaveBeenCalledWith(
        'si-bootstrap-artifacts-cn-hangzhou',
      );
      expect(mockedOssOperations.createBucket).toHaveBeenCalledWith({
        bucketName: 'si-bootstrap-artifacts-cn-hangzhou',
      });
      expect(mockedOssOperations.putFile).toHaveBeenCalledWith(
        'si-bootstrap-artifacts-cn-hangzhou',
        expect.stringMatching(/^fc3-code\/test-function\/.*\.zip$/),
        'test.zip',
      );
      expect(mockedFc3Operations.createFunction).toHaveBeenCalledWith(
        expect.anything(),
        'test.zip',
        expect.objectContaining({
          ossBucketName: 'si-bootstrap-artifacts-cn-hangzhou',
          ossObjectName: expect.stringMatching(/^fc3-code\/test-function\/.*\.zip$/),
        }),
      );
    });

    it('should skip OSS upload when package is within inline size limit', async () => {
      mockedStatSync.mockReturnValue({ size: 50 * 1024 * 1024 });
      mockedFc3Operations.getFunction.mockResolvedValueOnce(mockFunctionInfo);
      mockedFc3Operations.createFunction.mockResolvedValue(undefined);
      const readyState = { ...initialState, _ready: true };
      mockedStateManager.setResource.mockReturnValue(readyState);

      await createResource(mockContext, testFunction, initialState);

      expect(mockedOssOperations.putFile).not.toHaveBeenCalled();
      expect(mockedFc3Operations.createFunction).toHaveBeenCalledWith(
        expect.anything(),
        'test.zip',
        undefined,
      );
    });

    it('should reuse existing OSS bucket when it already exists', async () => {
      const largeSize = 80 * 1024 * 1024;
      mockedStatSync.mockReturnValue({ size: largeSize });
      mockedOssOperations.getBucket.mockResolvedValue({
        name: 'si-bootstrap-artifacts-cn-hangzhou',
      });
      mockedFc3Operations.getFunction.mockResolvedValueOnce(mockFunctionInfo);
      mockedFc3Operations.createFunction.mockResolvedValue(undefined);
      const readyState = { ...initialState, _ready: true };
      mockedStateManager.setResource.mockReturnValue(readyState);

      await createResource(mockContext, testFunction, initialState);

      expect(mockedOssOperations.getBucket).toHaveBeenCalled();
      expect(mockedOssOperations.createBucket).not.toHaveBeenCalled();
      expect(mockedOssOperations.putFile).toHaveBeenCalled();
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
        undefined,
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

    it('should upload code to OSS during update when package exceeds size limit', async () => {
      const largeSize = 80 * 1024 * 1024;
      mockedStatSync.mockReturnValue({ size: largeSize });
      mockedOssOperations.getBucket.mockResolvedValue(null);
      mockedFc3Operations.updateFunctionConfiguration.mockResolvedValue(undefined);
      mockedFc3Operations.updateFunctionCode.mockResolvedValue(undefined);
      const newState = { ...initialState, _updated: true };
      mockedStateManager.setResource.mockReturnValue(newState);

      await updateResource(mockContext, testFunction, initialState);

      expect(mockedOssOperations.putFile).toHaveBeenCalledWith(
        'si-bootstrap-artifacts-cn-hangzhou',
        expect.stringMatching(/^fc3-code\/test-function\/.*\.zip$/),
        'test.zip',
      );
      expect(mockedFc3Operations.updateFunctionCode).toHaveBeenCalledWith(
        'test-function',
        'test.zip',
        expect.objectContaining({
          ossBucketName: 'si-bootstrap-artifacts-cn-hangzhou',
          ossObjectName: expect.stringMatching(/^fc3-code\/test-function\/.*\.zip$/),
        }),
      );
    });

    it('should skip OSS upload during update when package is within inline size limit', async () => {
      mockedStatSync.mockReturnValue({ size: 50 * 1024 * 1024 });
      mockedFc3Operations.updateFunctionConfiguration.mockResolvedValue(undefined);
      mockedFc3Operations.updateFunctionCode.mockResolvedValue(undefined);
      const newState = { ...initialState, _updated: true };
      mockedStateManager.setResource.mockReturnValue(newState);

      await updateResource(mockContext, testFunction, initialState);

      expect(mockedOssOperations.putFile).not.toHaveBeenCalled();
      expect(mockedFc3Operations.updateFunctionCode).toHaveBeenCalledWith(
        'test-function',
        'test.zip',
        undefined,
      );
    });

    it('should update trust policy for existing role when function has API Gateway trigger', async () => {
      const stateWithRamRole: StateFile = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: mockDefinition,
            instances: [
              {
                sid: 'si:aliyun:ram:default:test-app-test-service-default-fc-role',
                roleArn: 'acs:ram::123456789012:role/test-app-test-service-default-fc-role',
                id: 'test-app-test-service-default-fc-role',
                type: 'ALIYUN_RAM_ROLE',
              },
              {
                sid: 'si:aliyun:fc3:default:test-function',
                id: 'test-function',
                type: 'ALIYUN_FC3_FUNCTION',
              },
            ],
            lastUpdated: '2025-01-01T00:00:00Z',
          },
        },
      };

      const contextWithApigw: Context = {
        ...mockContext,
        iac: {
          version: '0.0.1',
          app: 'test-app',
          provider: {
            name: ProviderEnum.ALIYUN,
            region: 'cn-hangzhou',
          },
          service: 'test-service',
          events: [
            {
              key: 'api_gateway',
              name: 'test-api',
              type: 'API_GATEWAY',
              triggers: [
                {
                  method: 'GET',
                  path: '/api/test',
                  backend: '${functions.test_fn}',
                },
              ],
            },
          ],
        },
      };

      mockedFc3Operations.updateFunctionConfiguration.mockResolvedValue(undefined);
      mockedFc3Operations.updateFunctionCode.mockResolvedValue(undefined);
      const newState = { ...stateWithRamRole, _updated: true };
      mockedStateManager.setResource.mockReturnValue(newState);

      await updateResource(contextWithApigw, testFunction, stateWithRamRole);

      expect(mockedRamOperations.updateRoleTrustPolicy).toHaveBeenCalledWith(
        'test-app-test-service-default-fc-role',
        ['fc.aliyuncs.com', 'apigateway.aliyuncs.com'],
      );
      expect(mockedRamOperations.createRole).not.toHaveBeenCalled();
    });

    it('should update trust policy with FC-only services when function has no API Gateway trigger', async () => {
      const stateWithRamRole: StateFile = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: mockDefinition,
            instances: [
              {
                sid: 'si:aliyun:ram:default:test-app-test-service-default-fc-role',
                roleArn: 'acs:ram::123456789012:role/test-app-test-service-default-fc-role',
                id: 'test-app-test-service-default-fc-role',
                type: 'ALIYUN_RAM_ROLE',
              },
              {
                sid: 'si:aliyun:fc3:default:test-function',
                id: 'test-function',
                type: 'ALIYUN_FC3_FUNCTION',
              },
            ],
            lastUpdated: '2025-01-01T00:00:00Z',
          },
        },
      };

      mockedFc3Operations.updateFunctionConfiguration.mockResolvedValue(undefined);
      mockedFc3Operations.updateFunctionCode.mockResolvedValue(undefined);
      const newState = { ...stateWithRamRole, _updated: true };
      mockedStateManager.setResource.mockReturnValue(newState);

      await updateResource(mockContext, testFunction, stateWithRamRole);

      expect(mockedRamOperations.updateRoleTrustPolicy).toHaveBeenCalledWith(
        'test-app-test-service-default-fc-role',
        ['fc.aliyuncs.com'],
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
                sid: 'si:aliyun:fc3:default:test-function',
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

    it('should propagate unexpected errors from deleteFunction', async () => {
      const stateWithFunction: StateFile = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: mockDefinition,
            instances: [
              {
                sid: 'si:aliyun:fc3:default:test-function',
                id: 'test-function',
                functionName: 'test-function',
                type: 'ALIYUN_FC3_FUNCTION',
              },
            ],
            lastUpdated: '2025-01-01T00:00:00Z',
          },
        },
      };

      const error = new Error('Delete failed');
      mockedFc3Operations.deleteFunction.mockRejectedValue(error);

      await expect(
        deleteResource(mockContext, 'test-function', 'functions.test_fn', stateWithFunction),
      ).rejects.toThrow('Delete failed');
    });

    it('should skip deleteFunction and clean up dependents when no FC function instance exists (tainted)', async () => {
      const taintedState: StateFile = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: mockDefinition,
            instances: [
              {
                sid: 'si:aliyun:ram:default:test-app-test-service-default-fc-role',
                roleArn: 'acs:ram::123456789012:role/test-app-test-service-default-fc-role',
                id: 'test-app-test-service-default-fc-role',
                type: 'ALIYUN_RAM_ROLE',
              },
            ],
            lastUpdated: '2025-01-01T00:00:00Z',
            status: 'tainted',
          },
        },
      };

      mockedStateManager.removeResource.mockReturnValue(initialState);

      const result = await deleteResource(
        mockContext,
        'test-function',
        'functions.test_fn',
        taintedState,
      );

      expect(mockedFc3Operations.deleteFunction).not.toHaveBeenCalled();
      expect(mockedRamOperations.deleteRole).toHaveBeenCalledWith(
        'test-app-test-service-default-fc-role',
      );
      expect(result).toEqual(initialState);
    });

    it('should warn and continue cleanup when deleteFunction returns FunctionNotFound', async () => {
      const stateWithFunction: StateFile = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: mockDefinition,
            instances: [
              {
                sid: 'si:aliyun:fc3:default:test-function',
                id: 'test-function',
                functionName: 'test-function',
                type: 'ALIYUN_FC3_FUNCTION',
              },
              {
                sid: 'si:aliyun:ram:default:test-app-test-service-default-fc-role',
                roleArn: 'acs:ram::123456789012:role/test-app-test-service-default-fc-role',
                id: 'test-app-test-service-default-fc-role',
                type: 'ALIYUN_RAM_ROLE',
              },
            ],
            lastUpdated: '2025-01-01T00:00:00Z',
          },
        },
      };

      const notFoundError = Object.assign(new Error('Function not found'), {
        code: 'FunctionNotFound',
      });
      mockedFc3Operations.deleteFunction.mockRejectedValue(notFoundError);
      mockedStateManager.removeResource.mockReturnValue(initialState);

      const result = await deleteResource(
        mockContext,
        'test-function',
        'functions.test_fn',
        stateWithFunction,
      );

      expect(mockedLogger.warn).toHaveBeenCalledWith(
        expect.stringContaining('not found in provider'),
      );
      expect(mockedRamOperations.deleteRole).toHaveBeenCalled();
      expect(result).toEqual(initialState);
    });

    it('should delete all dependent resource types in reverse order', async () => {
      const stateWithAllDeps: StateFile = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: mockDefinition,
            instances: [
              {
                sid: 'si:aliyun:fc3:default:test-function',
                id: 'test-function',
                type: 'ALIYUN_FC3_FUNCTION',
              },
              {
                sid: 'si:aliyun:sls_project:default:test-sls',
                id: 'test-sls',
                type: 'ALIYUN_SLS_PROJECT',
              },
              {
                sid: 'si:aliyun:sls_logstore:default:test-sls/test-logstore',
                id: 'test-sls/test-logstore',
                type: 'ALIYUN_SLS_LOGSTORE',
              },
              {
                sid: 'si:aliyun:sls_index:default:test-sls/test-logstore/index',
                id: 'test-sls/test-logstore/index',
                type: 'ALIYUN_SLS_INDEX',
              },
              {
                sid: 'si:aliyun:ram:default:test-role',
                id: 'test-role',
                type: 'ALIYUN_RAM_ROLE',
              },
              {
                sid: 'si:aliyun:ecs_sg:default:sg-123',
                id: 'sg-123',
                type: 'ALIYUN_ECS_SECURITY_GROUP',
              },
              {
                sid: 'si:aliyun:nas_ag:default:nas-access',
                id: 'nas-access',
                type: 'ALIYUN_NAS_ACCESS_GROUP',
              },
              {
                sid: 'si:aliyun:nas_fs:default:fs-123',
                id: 'fs-123',
                type: 'ALIYUN_NAS_FILE_SYSTEM',
              },
              {
                sid: 'si:aliyun:nas_mt:default:fs-123/mt-domain.com',
                id: 'fs-123/mt-domain.com',
                type: 'ALIYUN_NAS_MOUNT_TARGET',
              },
            ],
            lastUpdated: '2025-01-01T00:00:00Z',
          },
        },
      };

      mockedFc3Operations.deleteFunction.mockResolvedValue(undefined);
      mockedStateManager.removeResource.mockReturnValue(initialState);

      await deleteResource(mockContext, 'test-function', 'functions.test_fn', stateWithAllDeps);

      expect(mockedNasOperations.deleteMountTarget).toHaveBeenCalledWith('fs-123', 'mt-domain.com');
      expect(mockedNasOperations.deleteFileSystem).toHaveBeenCalledWith('fs-123');
      expect(mockedNasOperations.deleteAccessGroup).toHaveBeenCalledWith('nas-access');
      expect(mockedEcsOperations.deleteSecurityGroup).toHaveBeenCalledWith('sg-123');
      expect(mockedRamOperations.deleteRole).toHaveBeenCalledWith('test-role');
      expect(mockedSlsOperations.deleteIndex).toHaveBeenCalledWith('test-sls', 'test-logstore');
      expect(mockedSlsOperations.deleteLogstore).toHaveBeenCalledWith('test-sls', 'test-logstore');
      expect(mockedSlsOperations.deleteProject).toHaveBeenCalledWith('test-sls');
    });

    it('should log error and continue when dependent resource deletion fails', async () => {
      const stateWithDeps: StateFile = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: mockDefinition,
            instances: [
              {
                sid: 'si:aliyun:fc3:default:test-function',
                id: 'test-function',
                type: 'ALIYUN_FC3_FUNCTION',
              },
              {
                sid: 'si:aliyun:ram:default:test-role',
                id: 'test-role',
                type: 'ALIYUN_RAM_ROLE',
              },
              {
                sid: 'si:aliyun:sls:default:test-sls',
                id: 'test-sls',
                type: 'ALIYUN_SLS_PROJECT',
              },
            ],
            lastUpdated: '2025-01-01T00:00:00Z',
          },
        },
      };

      mockedFc3Operations.deleteFunction.mockResolvedValue(undefined);
      mockedRamOperations.deleteRole.mockRejectedValue(new Error('role delete failed'));
      mockedSlsOperations.deleteProject.mockResolvedValue(undefined);
      mockedStateManager.removeResource.mockReturnValue(initialState);

      const result = await deleteResource(
        mockContext,
        'test-function',
        'functions.test_fn',
        stateWithDeps,
      );

      expect(mockedLogger.error).toHaveBeenCalledWith(expect.stringContaining('ALIYUN_RAM_ROLE'));
      expect(mockedSlsOperations.deleteProject).toHaveBeenCalled();
      expect(result).toEqual(initialState);
    });

    it('should warn for unknown resource type during dependent deletion', async () => {
      const stateWithUnknown: StateFile = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: mockDefinition,
            instances: [
              {
                sid: 'si:aliyun:fc3:default:test-function',
                id: 'test-function',
                type: 'ALIYUN_FC3_FUNCTION',
              },
              {
                sid: 'si:aliyun:unknown:default:unknown-1',
                id: 'unknown-1',
                type: 'ALIYUN_UNKNOWN_RESOURCE',
              },
            ],
            lastUpdated: '2025-01-01T00:00:00Z',
          },
        },
      };

      mockedFc3Operations.deleteFunction.mockResolvedValue(undefined);
      mockedStateManager.removeResource.mockReturnValue(initialState);

      await deleteResource(mockContext, 'test-function', 'functions.test_fn', stateWithUnknown);

      expect(mockedLogger.warn).toHaveBeenCalledWith(
        expect.stringContaining('ALIYUN_UNKNOWN_RESOURCE'),
      );
    });

    it('should skip deletion of instances with undefined type', async () => {
      const stateWithUndefined: StateFile = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: mockDefinition,
            instances: [
              {
                sid: 'si:aliyun:fc3:default:test-function',
                id: 'test-function',
                type: 'ALIYUN_FC3_FUNCTION',
              },
              {
                sid: 'si:aliyun:bad:default:bad-1',
                id: 'bad-1',
                type: 'includes_undefined_type',
              },
            ],
            lastUpdated: '2025-01-01T00:00:00Z',
          },
        },
      };

      mockedFc3Operations.deleteFunction.mockResolvedValue(undefined);
      mockedStateManager.removeResource.mockReturnValue(initialState);

      await deleteResource(mockContext, 'test-function', 'functions.test_fn', stateWithUndefined);

      expect(mockedFc3Operations.deleteFunction).toHaveBeenCalled();
    });
  });

  describe('createResource with dependent resources', () => {
    const fnWithLog = {
      ...testFunction,
      log: true,
    };

    const fnWithNetwork = {
      ...testFunction,
      network: {
        vpc_id: 'vpc-123',
        subnet_ids: ['vsw-123'],
        security_group: {
          name: 'test-sg',
          ingress: ['80/80:tcp:0.0.0.0/0'],
          egress: [] as string[],
        },
      },
    };

    const fnWithNas = {
      ...testFunction,
      network: {
        vpc_id: 'vpc-123',
        subnet_ids: ['vsw-123'],
        security_group: {
          name: 'test-sg',
          ingress: [] as string[],
          egress: [] as string[],
        },
      },
      storage: {
        nas: [
          {
            storage_class: NasStorageClassEnum.STANDARD_CAPACITY,
            mount_path: '/mnt/data',
          },
        ],
      },
    };

    it('should create SLS project, logstore, and index when log is true', async () => {
      mockedFc3Operations.getFunction.mockResolvedValueOnce(mockFunctionInfo);
      mockedFc3Operations.createFunction.mockResolvedValue(undefined);
      const readyState = { ...initialState, _ready: true };
      mockedStateManager.setResource.mockReturnValue(readyState);

      await createResource(mockContext, fnWithLog, initialState);

      expect(mockedSlsOperations.createProject).toHaveBeenCalledWith(
        'test-app-test-service-default-sls',
      );
      expect(mockedSlsOperations.createLogstore).toHaveBeenCalledWith(
        'test-app-test-service-default-sls',
        'test-app-test-service-default-sls-logstore',
      );
      expect(mockedSlsOperations.createIndex).toHaveBeenCalledWith(
        'test-app-test-service-default-sls',
        'test-app-test-service-default-sls-logstore',
      );
      expect(mockedSlsOperations.waitForProject).toHaveBeenCalled();
      expect(mockedSlsOperations.waitForLogstore).toHaveBeenCalled();
      expect(mockedFc3Types.functionToFc3Config).toHaveBeenCalled();
    });

    it('should reuse existing SLS resources when they exist in state', async () => {
      const stateWithSls: StateFile = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: mockDefinition,
            instances: [
              {
                sid: 'si:aliyun:sls_project:default:existing-project',
                id: 'existing-project',
                type: 'ALIYUN_SLS_PROJECT',
              },
              {
                sid: 'si:aliyun:sls_logstore:default:existing-project/existing-logstore',
                id: 'existing-project/existing-logstore',
                type: 'ALIYUN_SLS_LOGSTORE',
              },
            ],
            lastUpdated: '2025-01-01T00:00:00Z',
            status: 'tainted',
          },
        },
      };

      mockedFc3Operations.getFunction.mockResolvedValue(mockFunctionInfo);
      mockedFc3Operations.createFunction.mockResolvedValue(undefined);
      const readyState = { ...stateWithSls, _ready: true };
      mockedStateManager.setResource.mockReturnValue(readyState);

      await createResource(mockContext, fnWithLog, stateWithSls);

      expect(mockedSlsOperations.createProject).not.toHaveBeenCalled();
      expect(mockedSlsOperations.createLogstore).not.toHaveBeenCalled();
    });

    it('should create security group when function has network config', async () => {
      mockedFc3Operations.getFunction.mockResolvedValueOnce(mockFunctionInfo);
      mockedFc3Operations.createFunction.mockResolvedValue(undefined);
      const readyState = { ...initialState, _ready: true };
      mockedStateManager.setResource.mockReturnValue(readyState);

      await createResource(mockContext, fnWithNetwork, initialState);

      expect(mockedEcsOperations.createSecurityGroup).toHaveBeenCalledWith(
        'test-sg',
        'vpc-123',
        fnWithNetwork.network.security_group.ingress,
        fnWithNetwork.network.security_group.egress,
      );
    });

    it('should reuse existing security group when it exists in state', async () => {
      const stateWithSg: StateFile = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: mockDefinition,
            instances: [
              {
                sid: 'si:aliyun:ecs_sg:default:sg-existing',
                id: 'sg-existing',
                type: 'ALIYUN_ECS_SECURITY_GROUP',
              },
            ],
            lastUpdated: '2025-01-01T00:00:00Z',
            status: 'tainted',
          },
        },
      };

      mockedFc3Operations.getFunction.mockResolvedValue(mockFunctionInfo);
      mockedFc3Operations.createFunction.mockResolvedValue(undefined);
      const readyState = { ...stateWithSg, _ready: true };
      mockedStateManager.setResource.mockReturnValue(readyState);

      await createResource(mockContext, fnWithNetwork, stateWithSg);

      expect(mockedEcsOperations.createSecurityGroup).not.toHaveBeenCalled();
    });

    it('should create NAS resources when storage.nas is configured', async () => {
      mockedFc3Operations.getFunction.mockResolvedValueOnce(mockFunctionInfo);
      mockedFc3Operations.createFunction.mockResolvedValue(undefined);
      const readyState = { ...initialState, _ready: true };
      mockedStateManager.setResource.mockReturnValue(readyState);

      await createResource(mockContext, fnWithNas, initialState);

      expect(mockedNasOperations.createAccessGroup).toHaveBeenCalledWith(
        expect.stringContaining('nas-access'),
      );
      expect(mockedNasOperations.createAccessRule).toHaveBeenCalledWith(
        expect.stringContaining('nas-access'),
        '10.0.0.0/8',
      );
      expect(mockedNasOperations.createFileSystem).toHaveBeenCalledWith(
        NasStorageClassEnum.STANDARD_CAPACITY,
        'test-function',
      );
      expect(mockedNasOperations.createMountTarget).toHaveBeenCalledWith(
        'fs-123',
        expect.stringContaining('nas-access'),
        'vpc-123',
        'vsw-123',
      );
    });

    it('should reuse existing NAS resources when they exist in state', async () => {
      const stateWithNas: StateFile = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: mockDefinition,
            instances: [
              {
                sid: 'si:aliyun:ecs_sg:default:sg-existing',
                id: 'sg-existing',
                type: 'ALIYUN_ECS_SECURITY_GROUP',
              },
              {
                sid: 'si:aliyun:nas_fs:default:fs-existing',
                id: 'fs-existing',
                type: 'ALIYUN_NAS_FILE_SYSTEM',
              },
              {
                sid: 'si:aliyun:nas_mt:default:fs-existing/mt-domain.nas.cn-hangzhou.com',
                id: 'fs-existing/mt-domain.nas.cn-hangzhou.com',
                type: 'ALIYUN_NAS_MOUNT_TARGET',
                accessGroupName: 'existing-access-group',
              },
            ],
            lastUpdated: '2025-01-01T00:00:00Z',
            status: 'tainted',
          },
        },
      };

      mockedFc3Operations.getFunction.mockResolvedValue(mockFunctionInfo);
      mockedFc3Operations.createFunction.mockResolvedValue(undefined);
      const readyState = { ...stateWithNas, _ready: true };
      mockedStateManager.setResource.mockReturnValue(readyState);

      await createResource(mockContext, fnWithNas, stateWithNas);

      expect(mockedNasOperations.createAccessGroup).not.toHaveBeenCalled();
      expect(mockedNasOperations.createFileSystem).not.toHaveBeenCalled();
      expect(mockedNasOperations.createMountTarget).not.toHaveBeenCalled();
    });
  });

  describe('createResource buildFc3InstanceFromProvider branches', () => {
    it('should include vpcConfig, gpuConfig, nasConfig, logConfig, customContainerConfig from provider info', async () => {
      const functionInfoWithAll = {
        ...mockFunctionInfo,
        vpcConfig: {
          vpcId: 'vpc-123',
          vSwitchIds: ['vsw-1'],
          securityGroupId: 'sg-1',
        },
        gpuConfig: {
          gpuMemorySize: 16384,
          gpuType: 'fc.gpu.tesla.1',
        },
        nasConfig: {
          userId: 10003,
          groupId: 10003,
          mountPoints: [
            {
              serverAddr: 'mt.nas.cn-hangzhou.com:/',
              mountDir: '/mnt/data',
              enableTls: false,
            },
          ],
        },
        logConfig: {
          project: 'test-project',
          logstore: 'test-logstore',
          enableRequestMetrics: true,
          enableInstanceMetrics: true,
          logBeginRule: 'DefaultRegex',
        },
        customContainerConfig: {
          image: 'registry.cn-hangzhou.aliyuncs.com/test/image:latest',
          entrypoint: ['/app/start'],
          command: ['--port', '9000'],
          port: 9000,
          accelerationType: 'Default',
        },
        description: 'Test function',
        internetAccess: true,
        role: 'acs:ram::123456789012:role/test-role',
        codeSize: 1024,
        createdTime: '2025-01-01T00:00:00Z',
        state: 'Active',
        stateReason: '',
        stateReasonCode: '',
        lastUpdateStatus: 'Successful',
        lastUpdateStatusReason: '',
        lastUpdateStatusReasonCode: '',
      };

      mockedFc3Operations.getFunction.mockResolvedValue(functionInfoWithAll);
      mockedFc3Operations.createFunction.mockResolvedValue(undefined);
      const readyState = { ...initialState, _ready: true };
      mockedStateManager.setResource.mockReturnValue(readyState);

      await createResource(mockContext, testFunction, initialState);

      const lastCall =
        mockedStateManager.setResource.mock.calls[
          mockedStateManager.setResource.mock.calls.length - 1
        ];
      const resourceState = lastCall[2];
      const fcInstance = resourceState.instances.find(
        (i: { type: string }) => i.type === 'ALIYUN_FC3_FUNCTION',
      );

      expect(fcInstance.vpcConfig).toEqual({
        vpcId: 'vpc-123',
        vSwitchIds: ['vsw-1'],
        securityGroupId: 'sg-1',
      });
      expect(fcInstance.gpuConfig).toEqual({
        gpuMemorySize: 16384,
        gpuType: 'fc.gpu.tesla.1',
      });
      expect(fcInstance.nasConfig).toEqual({
        userId: 10003,
        groupId: 10003,
        mountPoints: [
          {
            serverAddr: 'mt.nas.cn-hangzhou.com:/',
            mountDir: '/mnt/data',
            enableTls: false,
          },
        ],
      });
      expect(fcInstance.logConfig).toEqual({
        project: 'test-project',
        logstore: 'test-logstore',
        enableRequestMetrics: true,
        enableInstanceMetrics: true,
        logBeginRule: 'DefaultRegex',
      });
      expect(fcInstance.customContainerConfig).toEqual({
        image: 'registry.cn-hangzhou.aliyuncs.com/test/image:latest',
        entrypoint: ['/app/start'],
        command: ['--port', '9000'],
        port: 9000,
        accelerationType: 'Default',
      });
      expect(fcInstance.description).toBe('Test function');
      expect(fcInstance.internetAccess).toBe(true);
      expect(fcInstance.role).toBe('acs:ram::123456789012:role/test-role');
    });

    it('should handle nasConfig with undefined mountPoints', async () => {
      const functionInfoNasNoMounts = {
        ...mockFunctionInfo,
        nasConfig: {
          userId: 10003,
          groupId: 10003,
        },
      };

      mockedFc3Operations.getFunction.mockResolvedValue(functionInfoNasNoMounts);
      mockedFc3Operations.createFunction.mockResolvedValue(undefined);
      const readyState = { ...initialState, _ready: true };
      mockedStateManager.setResource.mockReturnValue(readyState);

      await createResource(mockContext, testFunction, initialState);

      const lastCall =
        mockedStateManager.setResource.mock.calls[
          mockedStateManager.setResource.mock.calls.length - 1
        ];
      const resourceState = lastCall[2];
      const fcInstance = resourceState.instances.find(
        (i: { type: string }) => i.type === 'ALIYUN_FC3_FUNCTION',
      );

      expect(fcInstance.nasConfig).toEqual({
        userId: 10003,
        groupId: 10003,
        mountPoints: [],
      });
    });

    it('should use null fallbacks for missing provider info fields', async () => {
      const minimalFunctionInfo = {
        functionName: undefined,
        functionId: undefined,
        runtime: undefined,
        handler: undefined,
        memorySize: undefined,
        timeout: undefined,
        diskSize: undefined,
        cpu: undefined,
        environmentVariables: undefined,
        vpcConfig: { vpcId: undefined, vSwitchIds: undefined, securityGroupId: undefined },
        gpuConfig: { gpuMemorySize: undefined, gpuType: undefined },
        nasConfig: {
          userId: undefined,
          groupId: undefined,
          mountPoints: [{ serverAddr: undefined, mountDir: undefined, enableTls: undefined }],
        },
        logConfig: {
          project: undefined,
          logstore: undefined,
          enableRequestMetrics: undefined,
          enableInstanceMetrics: undefined,
          logBeginRule: undefined,
        },
        customContainerConfig: {
          image: undefined,
          entrypoint: undefined,
          command: undefined,
          port: undefined,
          accelerationType: undefined,
        },
        description: undefined,
        internetAccess: undefined,
        role: undefined,
        codeChecksum: undefined,
        codeSize: undefined,
        createdTime: undefined,
        lastModifiedTime: undefined,
        state: undefined,
        stateReason: undefined,
        stateReasonCode: undefined,
        lastUpdateStatus: undefined,
        lastUpdateStatusReason: undefined,
        lastUpdateStatusReasonCode: undefined,
      };

      mockedFc3Operations.getFunction.mockResolvedValue(minimalFunctionInfo);
      mockedFc3Operations.createFunction.mockResolvedValue(undefined);
      const readyState = { ...initialState, _ready: true };
      mockedStateManager.setResource.mockReturnValue(readyState);

      await createResource(mockContext, testFunction, initialState);

      const lastCall =
        mockedStateManager.setResource.mock.calls[
          mockedStateManager.setResource.mock.calls.length - 1
        ];
      const resourceState = lastCall[2];
      const fcInstance = resourceState.instances.find(
        (i: { type: string }) => i.type === 'ALIYUN_FC3_FUNCTION',
      );

      expect(fcInstance.id).toBe('');
      expect(fcInstance.functionName).toBeNull();
      expect(fcInstance.functionId).toBeNull();
      expect(fcInstance.runtime).toBeNull();
      expect(fcInstance.handler).toBeNull();
      expect(fcInstance.memorySize).toBeNull();
      expect(fcInstance.timeout).toBeNull();
      expect(fcInstance.diskSize).toBeNull();
      expect(fcInstance.cpu).toBeNull();
      expect(fcInstance.environment).toEqual({});
      expect(fcInstance.vpcConfig).toEqual({
        vpcId: null,
        vSwitchIds: [],
        securityGroupId: null,
      });
      expect(fcInstance.gpuConfig).toEqual({
        gpuMemorySize: null,
        gpuType: null,
      });
      expect(fcInstance.nasConfig.mountPoints).toEqual([
        { serverAddr: null, mountDir: null, enableTls: null },
      ]);
      expect(fcInstance.logConfig).toEqual({
        project: null,
        logstore: null,
        enableRequestMetrics: null,
        enableInstanceMetrics: null,
        logBeginRule: null,
      });
      expect(fcInstance.customContainerConfig).toEqual({
        image: null,
        entrypoint: [],
        command: [],
        port: null,
        accelerationType: null,
      });
      expect(fcInstance.description).toBeNull();
      expect(fcInstance.internetAccess).toBeNull();
      expect(fcInstance.role).toBeNull();
      expect(fcInstance.codeChecksum).toBeNull();
      expect(fcInstance.codeSize).toBeNull();
      expect(fcInstance.createdTime).toBeNull();
      expect(fcInstance.lastModifiedTime).toBeNull();
      expect(fcInstance.state).toBeNull();
    });
  });

  describe('updateResource with dependent resources', () => {
    const fnWithLog = {
      ...testFunction,
      log: true,
    };

    const fnWithNetwork = {
      ...testFunction,
      network: {
        vpc_id: 'vpc-123',
        subnet_ids: ['vsw-123'],
        security_group: {
          name: 'test-sg',
          ingress: [] as string[],
          egress: [] as string[],
        },
      },
    };

    const fnWithNas = {
      ...testFunction,
      network: {
        vpc_id: 'vpc-123',
        subnet_ids: ['vsw-123'],
        security_group: {
          name: 'test-sg',
          ingress: [] as string[],
          egress: [] as string[],
        },
      },
      storage: {
        nas: [
          {
            storage_class: NasStorageClassEnum.STANDARD_CAPACITY,
            mount_path: '/mnt/data',
          },
        ],
      },
    };

    it('should create new SLS resources during update when log=true and no existing SLS', async () => {
      mockedFc3Operations.updateFunctionConfiguration.mockResolvedValue(undefined);
      mockedFc3Operations.updateFunctionCode.mockResolvedValue(undefined);
      const newState = { ...initialState, _updated: true };
      mockedStateManager.setResource.mockReturnValue(newState);

      await updateResource(mockContext, fnWithLog, initialState);

      expect(mockedSlsOperations.createProject).toHaveBeenCalled();
      expect(mockedSlsOperations.createLogstore).toHaveBeenCalled();
      expect(mockedSlsOperations.createIndex).toHaveBeenCalled();
    });

    it('should reuse existing SLS resources during update', async () => {
      const stateWithSls: StateFile = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: mockDefinition,
            instances: [
              {
                sid: 'si:aliyun:sls_project:default:my-project',
                id: 'my-project',
                type: 'ALIYUN_SLS_PROJECT',
              },
              {
                sid: 'si:aliyun:sls_logstore:default:my-project/my-logstore',
                id: 'my-project/my-logstore',
                type: 'ALIYUN_SLS_LOGSTORE',
              },
              {
                sid: 'si:aliyun:fc3:default:test-function',
                id: 'test-function',
                type: 'ALIYUN_FC3_FUNCTION',
              },
            ],
            lastUpdated: '2025-01-01T00:00:00Z',
          },
        },
      };

      mockedFc3Operations.updateFunctionConfiguration.mockResolvedValue(undefined);
      mockedFc3Operations.updateFunctionCode.mockResolvedValue(undefined);
      const newState = { ...stateWithSls, _updated: true };
      mockedStateManager.setResource.mockReturnValue(newState);

      await updateResource(mockContext, fnWithLog, stateWithSls);

      expect(mockedSlsOperations.createProject).not.toHaveBeenCalled();
    });

    it('should create new security group during update when network exists but no existing SG', async () => {
      mockedFc3Operations.updateFunctionConfiguration.mockResolvedValue(undefined);
      mockedFc3Operations.updateFunctionCode.mockResolvedValue(undefined);
      const newState = { ...initialState, _updated: true };
      mockedStateManager.setResource.mockReturnValue(newState);

      await updateResource(mockContext, fnWithNetwork, initialState);

      expect(mockedEcsOperations.createSecurityGroup).toHaveBeenCalled();
    });

    it('should reuse existing security group during update', async () => {
      const stateWithSg: StateFile = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: mockDefinition,
            instances: [
              {
                sid: 'si:aliyun:ecs_sg:default:sg-existing',
                id: 'sg-existing',
                type: 'ALIYUN_ECS_SECURITY_GROUP',
              },
              {
                sid: 'si:aliyun:fc3:default:test-function',
                id: 'test-function',
                type: 'ALIYUN_FC3_FUNCTION',
              },
            ],
            lastUpdated: '2025-01-01T00:00:00Z',
          },
        },
      };

      mockedFc3Operations.updateFunctionConfiguration.mockResolvedValue(undefined);
      mockedFc3Operations.updateFunctionCode.mockResolvedValue(undefined);
      const newState = { ...stateWithSg, _updated: true };
      mockedStateManager.setResource.mockReturnValue(newState);

      await updateResource(mockContext, fnWithNetwork, stateWithSg);

      expect(mockedEcsOperations.createSecurityGroup).not.toHaveBeenCalled();
    });

    it('should create new NAS resources during update when NAS does not exist', async () => {
      mockedFc3Operations.updateFunctionConfiguration.mockResolvedValue(undefined);
      mockedFc3Operations.updateFunctionCode.mockResolvedValue(undefined);
      const newState = { ...initialState, _updated: true };
      mockedStateManager.setResource.mockReturnValue(newState);

      await updateResource(mockContext, fnWithNas, initialState);

      expect(mockedNasOperations.createAccessGroup).toHaveBeenCalled();
      expect(mockedNasOperations.createFileSystem).toHaveBeenCalled();
      expect(mockedNasOperations.createMountTarget).toHaveBeenCalled();
    });

    it('should reuse existing NAS mount targets during update', async () => {
      const stateWithNas: StateFile = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: mockDefinition,
            instances: [
              {
                sid: 'si:aliyun:nas_fs:default:fs-existing',
                id: 'fs-existing',
                type: 'ALIYUN_NAS_FILE_SYSTEM',
              },
              {
                sid: 'si:aliyun:nas_mt:default:fs-existing/mt-domain.nas.cn-hangzhou.com',
                id: 'fs-existing/mt-domain.nas.cn-hangzhou.com',
                type: 'ALIYUN_NAS_MOUNT_TARGET',
              },
              {
                sid: 'si:aliyun:ecs_sg:default:sg-existing',
                id: 'sg-existing',
                type: 'ALIYUN_ECS_SECURITY_GROUP',
              },
              {
                sid: 'si:aliyun:fc3:default:test-function',
                id: 'test-function',
                type: 'ALIYUN_FC3_FUNCTION',
              },
            ],
            lastUpdated: '2025-01-01T00:00:00Z',
          },
        },
      };

      mockedFc3Operations.updateFunctionConfiguration.mockResolvedValue(undefined);
      mockedFc3Operations.updateFunctionCode.mockResolvedValue(undefined);
      const newState = { ...stateWithNas, _updated: true };
      mockedStateManager.setResource.mockReturnValue(newState);

      await updateResource(mockContext, fnWithNas, stateWithNas);

      expect(mockedNasOperations.createAccessGroup).not.toHaveBeenCalled();
      expect(mockedNasOperations.createFileSystem).not.toHaveBeenCalled();
      expect(mockedNasOperations.createMountTarget).not.toHaveBeenCalled();
    });

    it('should skip updateFunctionConfiguration and updateFunctionCode when nothing changed', async () => {
      const stateWithMatch: StateFile = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: { ...mockDefinition },
            instances: [
              {
                sid: 'si:aliyun:fc3:default:test-function',
                id: 'test-function',
                type: 'ALIYUN_FC3_FUNCTION',
              },
            ],
            lastUpdated: '2025-01-01T00:00:00Z',
          },
        },
      };

      mockedFc3Operations.updateFunctionConfiguration.mockResolvedValue(undefined);
      mockedFc3Operations.updateFunctionCode.mockResolvedValue(undefined);
      const newState = { ...stateWithMatch, _updated: true };
      mockedStateManager.setResource.mockReturnValue(newState);

      await updateResource(mockContext, testFunction, stateWithMatch);

      expect(mockedLogger.warn).toHaveBeenCalledWith(
        expect.stringContaining('No changes detected'),
      );
    });

    it('should only update config (not code) when config changed but code did not', async () => {
      const stateWithSameCode: StateFile = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: {
              ...mockDefinition,
              memorySize: 256,
            },
            instances: [
              {
                sid: 'si:aliyun:fc3:default:test-function',
                id: 'test-function',
                type: 'ALIYUN_FC3_FUNCTION',
              },
            ],
            lastUpdated: '2025-01-01T00:00:00Z',
          },
        },
      };

      mockedFc3Operations.updateFunctionConfiguration.mockResolvedValue(undefined);
      const newState = { ...stateWithSameCode, _updated: true };
      mockedStateManager.setResource.mockReturnValue(newState);

      await updateResource(mockContext, testFunction, stateWithSameCode);

      expect(mockedFc3Operations.updateFunctionConfiguration).toHaveBeenCalled();
      expect(mockedFc3Operations.updateFunctionCode).not.toHaveBeenCalled();
    });

    it('should only update code (not config) when code changed but config did not', async () => {
      const stateWithDifferentCode: StateFile = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: {
              ...mockDefinition,
              codeHash: 'old-hash',
            },
            instances: [
              {
                sid: 'si:aliyun:fc3:default:test-function',
                id: 'test-function',
                type: 'ALIYUN_FC3_FUNCTION',
              },
            ],
            lastUpdated: '2025-01-01T00:00:00Z',
          },
        },
      };

      mockedFc3Operations.updateFunctionCode.mockResolvedValue(undefined);
      const newState = { ...stateWithDifferentCode, _updated: true };
      mockedStateManager.setResource.mockReturnValue(newState);

      await updateResource(mockContext, testFunction, stateWithDifferentCode);

      expect(mockedFc3Operations.updateFunctionConfiguration).not.toHaveBeenCalled();
      expect(mockedFc3Operations.updateFunctionCode).toHaveBeenCalled();
    });
  });
});
