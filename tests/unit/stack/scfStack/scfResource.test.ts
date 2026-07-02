import {
  createResource,
  readResource,
  updateResource,
  deleteResource,
} from '../../../../src/stack/scfStack/scfResource';
import * as scfTypes from '../../../../src/stack/scfStack/scfTypes';
import * as stateManager from '../../../../src/common/stateManager';
import * as hashUtils from '../../../../src/common/hashUtils';
import { ProviderEnum } from '../../../../src/common';
import { Context, StateFile, CURRENT_STATE_VERSION, ResourceTypeEnum } from '../../../../src/types';

const mockScfOperations = {
  createFunction: jest.fn(),
  getFunction: jest.fn(),
  updateFunctionConfiguration: jest.fn(),
  updateFunctionCode: jest.fn(),
  deleteFunction: jest.fn(),
};

const mockCamOperations = {
  createRole: jest.fn(),
  getRole: jest.fn(),
  deleteRole: jest.fn(),
  updateRolePolicy: jest.fn(),
  updateManagedPolicies: jest.fn(),
};

jest.mock('../../../../src/stack/scfStack/scfTypes');
jest.mock('../../../../src/common/stateManager');
jest.mock('../../../../src/common/hashUtils');

jest.mock('../../../../src/common/tencentClient', () => ({
  createTencentClient: () => ({
    scf: mockScfOperations,
    cam: mockCamOperations,
    cos: {},
    tdsqlc: {},
  }),
}));

jest.mock('../../../../src/common/fileUtils', () => ({
  readFileAsBase64: jest.fn().mockReturnValue('base64encodedcontent'),
}));

const initialState: StateFile = {
  version: CURRENT_STATE_VERSION,
  provider: 'tencent',
  app: 'test-app',
  service: 'test-service',
  stages: {},
  resources: {},
};

describe('ScfResource', () => {
  const mockContext: Context = {
    stage: 'default',
    app: 'test-app',
    service: 'test-service',
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
    jest.useRealTimers();
    (scfTypes.functionToScfConfig as jest.Mock).mockReturnValue(mockConfig);
    (scfTypes.extractScfDefinition as jest.Mock).mockReturnValue(mockDefinition);
    (hashUtils.computeFileHash as jest.Mock).mockReturnValue('mock-code-hash');
    mockScfOperations.getFunction.mockResolvedValue(mockFunctionInfo);
    (stateManager.getResource as jest.Mock).mockReturnValue(undefined);
  });

  describe('createResource', () => {
    it('should create a resource and refresh state from provider', async () => {
      const taintedState = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'ap-guangzhou',
            definition: mockDefinition,
            instances: [],
            lastUpdated: expect.any(String),
            status: 'tainted',
          },
        },
      };

      const finalState = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'ap-guangzhou',
            definition: mockDefinition,
            instances: expect.any(Array),
            lastUpdated: expect.any(String),
            status: 'ready',
          },
        },
      };

      (mockScfOperations.createFunction as jest.Mock).mockResolvedValue(undefined);
      (stateManager.setResource as jest.Mock)
        .mockReturnValueOnce(taintedState)
        .mockReturnValueOnce(finalState);

      const result = await createResource(mockContext, testFunction, initialState);

      expect(scfTypes.functionToScfConfig).toHaveBeenCalledWith(testFunction);
      expect(mockScfOperations.createFunction).toHaveBeenCalledWith(
        mockConfig,
        'base64encodedcontent',
      );
      expect(mockScfOperations.getFunction).toHaveBeenCalledWith('test-function');
      expect(hashUtils.computeFileHash).toHaveBeenCalledWith('test.zip');
      expect(scfTypes.extractScfDefinition).toHaveBeenCalledWith(
        mockConfig,
        'mock-code-hash',
        undefined,
      );
      // Check final setResource call (second call)
      expect(stateManager.setResource).toHaveBeenLastCalledWith(
        expect.objectContaining({ version: CURRENT_STATE_VERSION }),
        'functions.test_fn',
        expect.objectContaining({
          mode: 'managed',
          region: 'ap-guangzhou',
          definition: mockDefinition,
          instances: expect.arrayContaining([
            expect.objectContaining({
              sid: expect.stringContaining('si:tencent:scf'),
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
          status: 'ready',
        }),
      );
      expect(result).toEqual(finalState);
    });

    it('should create resource with CAM role when iam config provided', async () => {
      jest.useFakeTimers();

      const fnWithIam = {
        ...testFunction,
        iam: {
          role: {
            name: 'test-scf-role',
            statements: [
              { effect: 'Allow' as const, action: ['scf:InvokeFunction'], resource: ['*'] },
            ],
          },
        },
      };

      (mockCamOperations.createRole as jest.Mock).mockResolvedValue({
        roleName: 'test-scf-role',
        roleId: 'role-id',
        roleArn: 'test-scf-role',
        policyName: 'test-scf-role-policy',
      });
      (mockScfOperations.createFunction as jest.Mock).mockResolvedValue(undefined);
      (stateManager.setResource as jest.Mock).mockReturnValue(initialState);

      const createPromise = createResource(mockContext, fnWithIam, initialState);
      await jest.advanceTimersByTimeAsync(5000);
      await createPromise;

      // Should create the CAM role
      expect(mockCamOperations.createRole).toHaveBeenCalledWith(
        'test-scf-role',
        ['scf.tencentcloudapi.com'],
        expect.any(String),
        expect.arrayContaining([expect.objectContaining({ effect: 'Allow' })]),
        undefined,
      );

      // Should pass role to SCF config
      const expectedConfig = {
        ...mockConfig,
        Role: 'test-scf-role',
      };
      expect(mockScfOperations.createFunction).toHaveBeenCalledWith(
        expectedConfig,
        'base64encodedcontent',
      );
    });

    it('should use external role ARN directly without creating CAM role', async () => {
      const fnWithExternalRole = {
        ...testFunction,
        iam: {
          role: 'qcs::cam:uin/123:roleName/external-role',
        },
      };

      (mockScfOperations.createFunction as jest.Mock).mockResolvedValue(undefined);
      (stateManager.setResource as jest.Mock).mockReturnValue(initialState);

      await createResource(mockContext, fnWithExternalRole, initialState);

      // Should NOT create a CAM role
      expect(mockCamOperations.createRole).not.toHaveBeenCalled();

      // Should pass external role ARN to SCF config
      const expectedConfig = {
        ...mockConfig,
        Role: 'qcs::cam:uin/123:roleName/external-role',
      };
      expect(mockScfOperations.createFunction).toHaveBeenCalledWith(
        expectedConfig,
        'base64encodedcontent',
      );
    });

    it('should reuse existing CAM role when state has dependent instances', async () => {
      const stateWithExistingRole: StateFile = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'ap-guangzhou',
            definition: mockDefinition,
            instances: [
              {
                sid: 'si:tencent:scf:default:test-function',
                id: 'test-function',
                functionName: 'test-function',
              },
              {
                sid: 'si:tencent:scf-role:default:existing-role',
                type: ResourceTypeEnum.TENCENT_SCF_ROLE,
                id: 'existing-role',
                roleArn: 'existing-role',
              },
            ],
            lastUpdated: '2025-01-01T00:00:00Z',
          },
        },
      };

      const fnWithIam = {
        ...testFunction,
        iam: {
          role: {
            name: 'existing-role',
            statements: [
              { effect: 'Allow' as const, action: ['scf:InvokeFunction'], resource: ['*'] },
            ],
          },
        },
      };

      (stateManager.getResource as jest.Mock).mockReturnValue(
        stateWithExistingRole.resources['functions.test_fn'],
      );
      (mockScfOperations.createFunction as jest.Mock).mockResolvedValue(undefined);
      (stateManager.setResource as jest.Mock).mockReturnValue(initialState);

      await createResource(mockContext, fnWithIam, stateWithExistingRole);

      // Should NOT create a new CAM role (reuses existing one)
      expect(mockCamOperations.createRole).not.toHaveBeenCalled();

      // Should pass existing role ARN to SCF config
      const expectedConfig = {
        ...mockConfig,
        Role: 'existing-role',
      };
      expect(mockScfOperations.createFunction).toHaveBeenCalledWith(
        expectedConfig,
        'base64encodedcontent',
      );
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

    it('should handle function info with null/undefined CfsConfig fields', async () => {
      const functionInfoWithNullCfs = {
        ...mockFunctionInfo,
        CfsConfig: {
          CfsInsList: [
            {
              UserId: null,
              UserGroupId: undefined,
              CfsId: null,
              MountInsId: undefined,
              LocalMountDir: null,
              RemoteMountDir: undefined,
              IpAddress: null,
              MountVpcId: undefined,
              MountSubnetId: null,
            },
          ],
        },
      };

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
      (mockScfOperations.getFunction as jest.Mock).mockResolvedValue(functionInfoWithNullCfs);
      (stateManager.setResource as jest.Mock).mockReturnValue(newState);

      const result = await createResource(mockContext, testFunction, initialState);

      expect(mockScfOperations.createFunction).toHaveBeenCalled();
      expect(mockScfOperations.getFunction).toHaveBeenCalledWith('test-function');
      expect(result).toEqual(newState);
    });

    it('should handle function info with null CfsInsList', async () => {
      const functionInfoWithNullList = {
        ...mockFunctionInfo,
        CfsConfig: {
          CfsInsList: null,
        },
      };

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
      (mockScfOperations.getFunction as jest.Mock).mockResolvedValue(functionInfoWithNullList);
      (stateManager.setResource as jest.Mock).mockReturnValue(newState);

      const result = await createResource(mockContext, testFunction, initialState);

      expect(mockScfOperations.createFunction).toHaveBeenCalled();
      expect(result).toEqual(newState);
    });

    it('should handle function info with undefined CfsConfig', async () => {
      const functionInfoWithoutCfs = {
        ...mockFunctionInfo,
        CfsConfig: undefined,
      };

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
      (mockScfOperations.getFunction as jest.Mock).mockResolvedValue(functionInfoWithoutCfs);
      (stateManager.setResource as jest.Mock).mockReturnValue(newState);

      const result = await createResource(mockContext, testFunction, initialState);

      expect(mockScfOperations.createFunction).toHaveBeenCalled();
      expect(result).toEqual(newState);
    });

    it('should handle function info with null StatusReasons fields', async () => {
      const functionInfoWithNullStatusReasons = {
        ...mockFunctionInfo,
        StatusReasons: [
          {
            ErrorCode: null,
            ErrorMessage: undefined,
          },
          {
            ErrorCode: undefined,
            ErrorMessage: null,
          },
        ],
      };

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
      (mockScfOperations.getFunction as jest.Mock).mockResolvedValue(
        functionInfoWithNullStatusReasons,
      );
      (stateManager.setResource as jest.Mock).mockReturnValue(newState);

      const result = await createResource(mockContext, testFunction, initialState);

      expect(mockScfOperations.createFunction).toHaveBeenCalled();
      expect(result).toEqual(newState);
    });

    it('should handle function info with null StatusReasons array', async () => {
      const functionInfoWithNullArray = {
        ...mockFunctionInfo,
        StatusReasons: null,
      };

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
      (mockScfOperations.getFunction as jest.Mock).mockResolvedValue(functionInfoWithNullArray);
      (stateManager.setResource as jest.Mock).mockReturnValue(newState);

      const result = await createResource(mockContext, testFunction, initialState);

      expect(mockScfOperations.createFunction).toHaveBeenCalled();
      expect(result).toEqual(newState);
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
      expect(scfTypes.extractScfDefinition).toHaveBeenCalledWith(
        mockConfig,
        'mock-code-hash',
        undefined,
      );
      expect(stateManager.setResource).toHaveBeenCalledWith(
        initialState,
        'functions.test_fn',
        expect.objectContaining({
          mode: 'managed',
          region: 'ap-guangzhou',
          definition: mockDefinition,
          instances: expect.arrayContaining([
            expect.objectContaining({
              sid: expect.stringContaining('si:tencent:scf'),
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

    it('should update with existing role and detect iam changes', async () => {
      const fnWithIam = {
        ...testFunction,
        iam: {
          role: {
            name: 'existing-role',
            statements: [
              { effect: 'Allow' as const, action: ['scf:InvokeFunction'], resource: ['*'] },
            ],
            managed_policies: ['QcloudSCFFullAccess'],
          },
        },
      };

      const stateWithRole: StateFile = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'ap-guangzhou',
            definition: {
              ...mockDefinition,
              iam: {
                role: {
                  name: 'existing-role',
                  statements: [
                    { effect: 'Allow', action: ['scf:InvokeFunction'], resource: ['*'] },
                  ],
                  managed_policies: ['QcloudSCFFullAccess'],
                },
              },
            },
            instances: [
              {
                sid: 'si:tencent:scf:default:test-function',
                id: 'test-function',
                functionName: 'test-function',
              },
              {
                sid: 'si:tencent:scf-role:default:existing-role',
                type: ResourceTypeEnum.TENCENT_SCF_ROLE,
                id: 'existing-role',
                roleArn: 'existing-role',
              },
            ],
            lastUpdated: '2025-01-01T00:00:00Z',
          },
        },
      };

      (stateManager.getResource as jest.Mock).mockReturnValue(
        stateWithRole.resources['functions.test_fn'],
      );
      (mockScfOperations.updateFunctionConfiguration as jest.Mock).mockResolvedValue(undefined);
      (mockScfOperations.updateFunctionCode as jest.Mock).mockResolvedValue(undefined);
      (mockCamOperations.updateRolePolicy as jest.Mock).mockResolvedValue(undefined);
      (mockCamOperations.updateManagedPolicies as jest.Mock).mockResolvedValue(undefined);
      (stateManager.setResource as jest.Mock).mockReturnValue(stateWithRole);

      await updateResource(mockContext, fnWithIam, stateWithRole);

      // Role config should be injected into SCF config
      const expectedConfig = {
        ...mockConfig,
        Role: 'existing-role',
      };
      expect(mockScfOperations.updateFunctionConfiguration).toHaveBeenCalledWith(expectedConfig);
    });

    it('should create role during update when no existing role', async () => {
      jest.useFakeTimers();

      const fnWithIam = {
        ...testFunction,
        iam: {
          role: {
            name: 'new-role',
          },
        },
      };

      // No existing state has role
      (stateManager.getResource as jest.Mock).mockReturnValue(undefined);
      (mockCamOperations.createRole as jest.Mock).mockResolvedValue({
        roleName: 'new-role',
        roleId: 'role-id',
        roleArn: 'new-role',
        policyName: 'new-role-policy',
      });
      (mockScfOperations.updateFunctionConfiguration as jest.Mock).mockResolvedValue(undefined);
      (mockScfOperations.updateFunctionCode as jest.Mock).mockResolvedValue(undefined);
      (stateManager.setResource as jest.Mock).mockReturnValue(initialState);

      const updatePromise = updateResource(mockContext, fnWithIam, initialState);
      await jest.advanceTimersByTimeAsync(5000);
      await updatePromise;

      expect(mockCamOperations.createRole).toHaveBeenCalled();
      const expectedConfig = {
        ...mockConfig,
        Role: 'new-role',
      };
      expect(mockScfOperations.updateFunctionConfiguration).toHaveBeenCalledWith(expectedConfig);
    });

    it('should update with external role ARN string', async () => {
      const fnWithExternalRole = {
        ...testFunction,
        iam: {
          role: 'qcs::cam:uin/123:roleName/external-update-role',
        },
      };

      (mockScfOperations.updateFunctionConfiguration as jest.Mock).mockResolvedValue(undefined);
      (mockScfOperations.updateFunctionCode as jest.Mock).mockResolvedValue(undefined);
      (stateManager.setResource as jest.Mock).mockReturnValue(initialState);

      await updateResource(mockContext, fnWithExternalRole, initialState);

      const expectedConfig = {
        ...mockConfig,
        Role: 'qcs::cam:uin/123:roleName/external-update-role',
      };
      expect(mockScfOperations.updateFunctionConfiguration).toHaveBeenCalledWith(expectedConfig);
      expect(mockCamOperations.createRole).not.toHaveBeenCalled();
    });
  });

  describe('deleteResource', () => {
    const stateWithFunction: StateFile = {
      ...initialState,
      resources: {
        'functions.test_fn': {
          mode: 'managed',
          region: 'ap-guangzhou',
          definition: mockDefinition,
          instances: [
            {
              sid: 'si:tencent:scf:default:test-function',
              id: 'test-function',
              functionName: 'test-function',
            },
          ],
          lastUpdated: '2025-01-01T00:00:00Z',
        },
      },
    };

    const stateWithFunctionAndRole: StateFile = {
      ...initialState,
      resources: {
        'functions.test_fn': {
          mode: 'managed',
          region: 'ap-guangzhou',
          definition: { ...mockDefinition, iam: { role: { name: 'test-role' } } },
          instances: [
            {
              sid: 'si:tencent:scf:default:test-function',
              id: 'test-function',
              functionName: 'test-function',
            },
            {
              sid: 'si:tencent:scf-role:default:test-role',
              type: ResourceTypeEnum.TENCENT_SCF_ROLE,
              id: 'test-role',
              roleArn: 'test-role',
            },
          ],
          lastUpdated: '2025-01-01T00:00:00Z',
        },
      },
    };

    it('should delete resource and remove from state', async () => {
      (stateManager.getResource as jest.Mock).mockReturnValue(
        stateWithFunction.resources['functions.test_fn'],
      );
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

    it('should handle ResourceNotFound.FunctionName gracefully and remove state', async () => {
      (stateManager.getResource as jest.Mock).mockReturnValue(
        stateWithFunction.resources['functions.test_fn'],
      );
      const notFoundError = Object.assign(new Error('not found'), {
        code: 'ResourceNotFound.FunctionName',
      });
      (mockScfOperations.deleteFunction as jest.Mock).mockRejectedValue(notFoundError);
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

    it('should rethrow unexpected errors from deleteFunction', async () => {
      (stateManager.getResource as jest.Mock).mockReturnValue(
        stateWithFunction.resources['functions.test_fn'],
      );
      const error = new Error('Delete failed');
      (mockScfOperations.deleteFunction as jest.Mock).mockRejectedValue(error);

      await expect(
        deleteResource(mockContext, 'test-function', 'functions.test_fn', stateWithFunction),
      ).rejects.toThrow('Delete failed');
    });

    it('should delete role after function when role present in state', async () => {
      (stateManager.getResource as jest.Mock).mockReturnValue(
        stateWithFunctionAndRole.resources['functions.test_fn'],
      );
      (mockScfOperations.deleteFunction as jest.Mock).mockResolvedValue(undefined);
      (mockCamOperations.deleteRole as jest.Mock).mockResolvedValue(undefined);
      (stateManager.removeResource as jest.Mock).mockReturnValue(initialState);

      const result = await deleteResource(
        mockContext,
        'test-function',
        'functions.test_fn',
        stateWithFunctionAndRole,
      );

      expect(mockScfOperations.deleteFunction).toHaveBeenCalledWith('test-function');
      expect(mockCamOperations.deleteRole).toHaveBeenCalledWith('test-role');
      expect(stateManager.removeResource).toHaveBeenCalledWith(
        stateWithFunctionAndRole,
        'functions.test_fn',
      );
      expect(result).toEqual(initialState);
    });

    it('should skip role deletion for external roles', async () => {
      const stateWithExternalRole: StateFile = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            ...stateWithFunctionAndRole.resources['functions.test_fn'],
            instances: [
              stateWithFunctionAndRole.resources['functions.test_fn'].instances[0],
              {
                sid: 'si:tencent:scf-role:default:external-role',
                type: ResourceTypeEnum.TENCENT_SCF_ROLE,
                id: 'external-role',
                roleArn: 'qcs::cam:uin/123:roleName/external-role',
                external: true,
              },
            ],
          },
        },
      };
      (stateManager.getResource as jest.Mock).mockReturnValue(
        stateWithExternalRole.resources['functions.test_fn'],
      );
      (mockScfOperations.deleteFunction as jest.Mock).mockResolvedValue(undefined);
      (mockCamOperations.deleteRole as jest.Mock).mockResolvedValue(undefined);
      (stateManager.removeResource as jest.Mock).mockReturnValue(initialState);

      await deleteResource(
        mockContext,
        'test-function',
        'functions.test_fn',
        stateWithExternalRole,
      );

      // Function should be deleted, but role should NOT be deleted (external)
      expect(mockScfOperations.deleteFunction).toHaveBeenCalledWith('test-function');
      expect(mockCamOperations.deleteRole).not.toHaveBeenCalled();
    });

    it('should log warning for unknown dependent resource types during deletion', async () => {
      const stateWithUnknownType: StateFile = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'ap-guangzhou',
            definition: mockDefinition,
            instances: [
              {
                sid: 'si:tencent:scf:default:test-function',
                id: 'test-function',
                functionName: 'test-function',
              },
              {
                sid: 'si:tencent:unknown:default:unknown-resource',
                type: 'SOME_UNKNOWN_TYPE',
                id: 'unknown-resource',
              },
            ],
            lastUpdated: '2025-01-01T00:00:00Z',
          },
        },
      };

      (stateManager.getResource as jest.Mock).mockReturnValue(
        stateWithUnknownType.resources['functions.test_fn'],
      );
      (mockScfOperations.deleteFunction as jest.Mock).mockResolvedValue(undefined);
      (stateManager.removeResource as jest.Mock).mockReturnValue(initialState);

      await deleteResource(mockContext, 'test-function', 'functions.test_fn', stateWithUnknownType);

      expect(mockScfOperations.deleteFunction).toHaveBeenCalledWith('test-function');
      // Role deletion should not be attempted for unknown type
      expect(mockCamOperations.deleteRole).not.toHaveBeenCalled();
      expect(stateManager.removeResource).toHaveBeenCalledWith(
        stateWithUnknownType,
        'functions.test_fn',
      );
    });
  });

  describe('buildScfInstanceFromProvider - all optional fields', () => {
    const fullFunctionInfo = {
      FunctionName: 'full-function',
      Runtime: 'nodejs18',
      Handler: 'index.handler',
      MemorySize: 1024,
      Timeout: 30,
      Environment: {
        Variables: [
          { Key: 'ENV1', Value: 'val1' },
          { Key: 'ENV2', Value: 'val2' },
        ],
      },
      ModTime: '2025-06-01T00:00:00Z',
      CodeSha256: 'sha256hash',
      CodeInfo: 'code-info-url',
      Description: 'Full function description',
      Triggers: [
        {
          ModTime: '2025-06-01',
          Type: 'timer',
          TriggerDesc: 'cron trigger',
          TriggerName: 'timer-1',
          AddTime: '2025-05-01',
          Enable: 1,
          CustomArgument: 'custom-arg',
          AvailableStatus: 'Available',
          ResourceId: 'res-123',
          BindStatus: 'bindStatus',
          TriggerAttribute: 'triggerAttr',
          Qualifier: '$LATEST',
          Description: 'trigger description',
        },
      ],
      Tags: [
        { Key: 'tag1', Value: 'tagVal1' },
        { Key: 'tag2', Value: 'tagVal2' },
      ],
      Layers: [
        {
          LayerName: 'my-layer',
          LayerVersion: 1,
          CompatibleRuntimes: ['nodejs18', 'nodejs16'],
        },
      ],
      CodeSize: 1024,
      FunctionVersion: '$LATEST',
      VpcConfig: {
        VpcId: 'vpc-123',
        SubnetId: 'subnet-456',
      },
      UseGpu: 'FALSE',
      CodeResult: 'Success',
      CodeError: null,
      ErrNo: 0,
      Namespace: 'default',
      Role: 'SCF_QcsRole',
      InstallDependency: 'TRUE',
      Status: 'Active',
      StatusDesc: 'Active status',
      ClsLogsetId: 'logset-id',
      ClsTopicId: 'topic-id',
      FunctionId: 'lam-funcid',
      EipConfig: {
        EipFixed: 'TRUE',
        Eips: ['1.2.3.4'],
      },
      AccessInfo: {
        Host: 'access-host.example.com',
        Vip: '10.0.0.1',
      },
      Type: 'Event',
      L5Enable: 'FALSE',
      DeadLetterConfig: {
        Type: 'CMQ',
        Name: 'dead-letter-queue',
        FilterType: 'TAG',
      },
      AddTime: '2025-01-01',
      PublicNetConfig: {
        PublicNetStatus: 'ENABLE',
        EipConfig: {
          EipStatus: 'ENABLE',
          EipAddress: ['5.6.7.8'],
        },
      },
      OnsEnable: 'TRUE',
      CfsConfig: {
        CfsInsList: [
          {
            UserId: 'user-1',
            UserGroupId: 'group-1',
            CfsId: 'cfs-1',
            MountInsId: 'mount-1',
            LocalMountDir: '/mnt/local',
            RemoteMountDir: '/mnt/remote',
            IpAddress: '192.168.1.1',
            MountVpcId: 'vpc-mount',
            MountSubnetId: 'subnet-mount',
          },
        ],
      },
      AvailableStatus: 'Available',
      Qualifier: '$LATEST',
      InitTimeout: 10,
      StatusReasons: [{ ErrorCode: 'ERR001', ErrorMessage: 'some error' }],
      AsyncRunEnable: 'TRUE',
      TraceEnable: 'TRUE',
      ImageConfig: {
        ImageType: 'personal',
        ImageUri: 'image-uri-123',
      },
      ProtocolType: 'http',
      ProtocolParams: {
        WSParams: {
          IdleTimeOut: 60,
        },
      },
      DnsCache: 'TRUE',
      IntranetConfig: {
        IpFixed: 'ENABLE',
      },
    };

    it('should map all populated nested objects from provider info', async () => {
      const newState = {
        ...initialState,
        resources: { 'functions.test_fn': expect.anything() },
      };

      (mockScfOperations.createFunction as jest.Mock).mockResolvedValue(undefined);
      (mockScfOperations.getFunction as jest.Mock).mockResolvedValue(fullFunctionInfo);
      (stateManager.setResource as jest.Mock).mockReturnValue(newState);

      await createResource(mockContext, testFunction, initialState);

      expect(stateManager.setResource).toHaveBeenLastCalledWith(
        expect.objectContaining({ version: CURRENT_STATE_VERSION }),
        'functions.test_fn',
        expect.objectContaining({
          instances: expect.arrayContaining([
            expect.objectContaining({
              functionName: 'full-function',
              environment: { ENV1: 'val1', ENV2: 'val2' },
              triggers: expect.arrayContaining([
                expect.objectContaining({
                  type: 'timer',
                  triggerName: 'timer-1',
                  customArgument: 'custom-arg',
                  availableStatus: 'Available',
                  resourceId: 'res-123',
                  bindStatus: 'bindStatus',
                  triggerAttribute: 'triggerAttr',
                  qualifier: '$LATEST',
                  description: 'trigger description',
                }),
              ]),
              tags: expect.arrayContaining([
                expect.objectContaining({ key: 'tag1', value: 'tagVal1' }),
              ]),
              layers: expect.arrayContaining([
                expect.objectContaining({
                  layerName: 'my-layer',
                  layerVersion: 1,
                  compatibleRuntimes: ['nodejs18', 'nodejs16'],
                }),
              ]),
              vpcConfig: expect.objectContaining({
                vpcId: 'vpc-123',
                subnetId: 'subnet-456',
              }),
              eipConfig: expect.objectContaining({
                eipFixed: 'TRUE',
                eips: ['1.2.3.4'],
              }),
              accessInfo: expect.objectContaining({
                host: 'access-host.example.com',
                vip: '10.0.0.1',
              }),
              deadLetterConfig: expect.objectContaining({
                type: 'CMQ',
                name: 'dead-letter-queue',
                filterType: 'TAG',
              }),
              publicNetConfig: expect.objectContaining({
                publicNetStatus: 'ENABLE',
                eipConfig: expect.objectContaining({
                  eipStatus: 'ENABLE',
                  eipAddress: ['5.6.7.8'],
                }),
              }),
              cfsConfig: expect.objectContaining({
                cfsInsList: expect.arrayContaining([
                  expect.objectContaining({
                    userId: 'user-1',
                    cfsId: 'cfs-1',
                    localMountDir: '/mnt/local',
                  }),
                ]),
              }),
              imageConfig: expect.objectContaining({
                imageType: 'personal',
                imageUri: 'image-uri-123',
              }),
              protocolParams: expect.objectContaining({
                wsParams: expect.objectContaining({
                  idleTimeOut: 60,
                }),
              }),
              intranetConfig: expect.objectContaining({
                ipFixed: 'ENABLE',
              }),
              useGpu: 'FALSE',
              codeResult: 'Success',
              namespace: 'default',
              role: 'SCF_QcsRole',
              installDependency: 'TRUE',
              status: 'Active',
              functionId: 'lam-funcid',
              type: 'Event',
              l5Enable: 'FALSE',
              onsEnable: 'TRUE',
              availableStatus: 'Available',
              qualifier: '$LATEST',
              initTimeout: 10,
              asyncRunEnable: 'TRUE',
              traceEnable: 'TRUE',
              protocolType: 'http',
              dnsCache: 'TRUE',
            }),
          ]),
        }),
      );
    });

    it('should handle null Environment Variables', async () => {
      const infoWithNoEnvVars = {
        ...fullFunctionInfo,
        Environment: { Variables: undefined },
      };

      const newState = { ...initialState, resources: {} };
      (mockScfOperations.createFunction as jest.Mock).mockResolvedValue(undefined);
      (mockScfOperations.getFunction as jest.Mock).mockResolvedValue(infoWithNoEnvVars);
      (stateManager.setResource as jest.Mock).mockReturnValue(newState);

      await createResource(mockContext, testFunction, initialState);

      expect(stateManager.setResource).toHaveBeenLastCalledWith(
        expect.objectContaining({ version: CURRENT_STATE_VERSION }),
        'functions.test_fn',
        expect.objectContaining({
          instances: expect.arrayContaining([
            expect.objectContaining({
              environment: {},
            }),
          ]),
        }),
      );
    });

    it('should handle undefined Triggers, Tags, and Layers', async () => {
      const infoWithoutArrays = {
        ...fullFunctionInfo,
        Triggers: undefined,
        Tags: undefined,
        Layers: undefined,
      };

      const newState = { ...initialState, resources: {} };
      (mockScfOperations.createFunction as jest.Mock).mockResolvedValue(undefined);
      (mockScfOperations.getFunction as jest.Mock).mockResolvedValue(infoWithoutArrays);
      (stateManager.setResource as jest.Mock).mockReturnValue(newState);

      await createResource(mockContext, testFunction, initialState);

      expect(stateManager.setResource).toHaveBeenLastCalledWith(
        expect.objectContaining({ version: CURRENT_STATE_VERSION }),
        'functions.test_fn',
        expect.objectContaining({
          instances: expect.arrayContaining([
            expect.objectContaining({
              triggers: [],
              tags: [],
              layers: [],
            }),
          ]),
        }),
      );
    });

    it('should handle trigger with all null optional fields', async () => {
      const infoWithMinTrigger = {
        ...fullFunctionInfo,
        Triggers: [
          {
            ModTime: '2025-01-01',
            Type: 'timer',
            TriggerDesc: 'desc',
            TriggerName: 'name',
            AddTime: '2025-01-01',
            Enable: 0,
            CustomArgument: undefined,
            AvailableStatus: undefined,
            ResourceId: undefined,
            BindStatus: undefined,
            TriggerAttribute: undefined,
            Qualifier: undefined,
            Description: undefined,
          },
        ],
      };

      const newState = { ...initialState, resources: {} };
      (mockScfOperations.createFunction as jest.Mock).mockResolvedValue(undefined);
      (mockScfOperations.getFunction as jest.Mock).mockResolvedValue(infoWithMinTrigger);
      (stateManager.setResource as jest.Mock).mockReturnValue(newState);

      await createResource(mockContext, testFunction, initialState);

      expect(stateManager.setResource).toHaveBeenLastCalledWith(
        expect.objectContaining({ version: CURRENT_STATE_VERSION }),
        'functions.test_fn',
        expect.objectContaining({
          instances: expect.arrayContaining([
            expect.objectContaining({
              triggers: expect.arrayContaining([
                expect.objectContaining({
                  customArgument: null,
                  availableStatus: null,
                  resourceId: null,
                  bindStatus: null,
                  triggerAttribute: null,
                  qualifier: null,
                  description: null,
                }),
              ]),
            }),
          ]),
        }),
      );
    });

    it('should handle layer with all null optional fields', async () => {
      const infoWithMinLayer = {
        ...fullFunctionInfo,
        Layers: [
          {
            LayerName: undefined,
            LayerVersion: undefined,
            CompatibleRuntimes: undefined,
          },
        ],
      };

      const newState = { ...initialState, resources: {} };
      (mockScfOperations.createFunction as jest.Mock).mockResolvedValue(undefined);
      (mockScfOperations.getFunction as jest.Mock).mockResolvedValue(infoWithMinLayer);
      (stateManager.setResource as jest.Mock).mockReturnValue(newState);

      await createResource(mockContext, testFunction, initialState);

      expect(stateManager.setResource).toHaveBeenLastCalledWith(
        expect.objectContaining({ version: CURRENT_STATE_VERSION }),
        'functions.test_fn',
        expect.objectContaining({
          instances: expect.arrayContaining([
            expect.objectContaining({
              layers: expect.arrayContaining([
                expect.objectContaining({
                  layerName: null,
                  layerVersion: null,
                  compatibleRuntimes: [],
                }),
              ]),
            }),
          ]),
        }),
      );
    });

    it('should handle undefined VpcConfig, EipConfig, AccessInfo', async () => {
      const infoWithoutConfigs = {
        ...fullFunctionInfo,
        VpcConfig: undefined,
        EipConfig: undefined,
        AccessInfo: undefined,
        DeadLetterConfig: undefined,
        PublicNetConfig: undefined,
        ImageConfig: undefined,
        ProtocolParams: undefined,
        IntranetConfig: undefined,
      };

      const newState = { ...initialState, resources: {} };
      (mockScfOperations.createFunction as jest.Mock).mockResolvedValue(undefined);
      (mockScfOperations.getFunction as jest.Mock).mockResolvedValue(infoWithoutConfigs);
      (stateManager.setResource as jest.Mock).mockReturnValue(newState);

      await createResource(mockContext, testFunction, initialState);

      expect(stateManager.setResource).toHaveBeenLastCalledWith(
        expect.objectContaining({ version: CURRENT_STATE_VERSION }),
        'functions.test_fn',
        expect.objectContaining({
          instances: expect.arrayContaining([
            expect.objectContaining({
              vpcConfig: {},
              eipConfig: {},
              accessInfo: {},
              deadLetterConfig: {},
              publicNetConfig: {},
              imageConfig: {},
              protocolParams: {},
              intranetConfig: {},
            }),
          ]),
        }),
      );
    });

    it('should handle PublicNetConfig with undefined EipConfig', async () => {
      const infoWithPubNetNoEip = {
        ...fullFunctionInfo,
        PublicNetConfig: {
          PublicNetStatus: 'ENABLE',
          EipConfig: undefined,
        },
      };

      const newState = { ...initialState, resources: {} };
      (mockScfOperations.createFunction as jest.Mock).mockResolvedValue(undefined);
      (mockScfOperations.getFunction as jest.Mock).mockResolvedValue(infoWithPubNetNoEip);
      (stateManager.setResource as jest.Mock).mockReturnValue(newState);

      await createResource(mockContext, testFunction, initialState);

      expect(stateManager.setResource).toHaveBeenLastCalledWith(
        expect.objectContaining({ version: CURRENT_STATE_VERSION }),
        'functions.test_fn',
        expect.objectContaining({
          instances: expect.arrayContaining([
            expect.objectContaining({
              publicNetConfig: expect.objectContaining({
                publicNetStatus: 'ENABLE',
                eipConfig: {},
              }),
            }),
          ]),
        }),
      );
    });

    it('should handle ProtocolParams with undefined WSParams', async () => {
      const infoWithProtocolNoWs = {
        ...fullFunctionInfo,
        ProtocolParams: {
          WSParams: undefined,
        },
      };

      const newState = { ...initialState, resources: {} };
      (mockScfOperations.createFunction as jest.Mock).mockResolvedValue(undefined);
      (mockScfOperations.getFunction as jest.Mock).mockResolvedValue(infoWithProtocolNoWs);
      (stateManager.setResource as jest.Mock).mockReturnValue(newState);

      await createResource(mockContext, testFunction, initialState);

      expect(stateManager.setResource).toHaveBeenLastCalledWith(
        expect.objectContaining({ version: CURRENT_STATE_VERSION }),
        'functions.test_fn',
        expect.objectContaining({
          instances: expect.arrayContaining([
            expect.objectContaining({
              protocolParams: expect.objectContaining({
                wsParams: {},
              }),
            }),
          ]),
        }),
      );
    });

    it('should handle EipConfig and AccessInfo with null inner fields', async () => {
      const infoWithNullInnerFields = {
        ...fullFunctionInfo,
        EipConfig: {
          EipFixed: undefined,
          Eips: undefined,
        },
        AccessInfo: {
          Host: undefined,
          Vip: undefined,
        },
        DeadLetterConfig: {
          Type: undefined,
          Name: undefined,
          FilterType: undefined,
        },
        PublicNetConfig: {
          PublicNetStatus: undefined,
          EipConfig: {
            EipStatus: undefined,
            EipAddress: undefined,
          },
        },
        IntranetConfig: {
          IpFixed: undefined,
        },
        ImageConfig: {
          ImageType: undefined,
          ImageUri: undefined,
        },
        ProtocolParams: {
          WSParams: {
            IdleTimeOut: undefined,
          },
        },
      };

      const newState = { ...initialState, resources: {} };
      (mockScfOperations.createFunction as jest.Mock).mockResolvedValue(undefined);
      (mockScfOperations.getFunction as jest.Mock).mockResolvedValue(infoWithNullInnerFields);
      (stateManager.setResource as jest.Mock).mockReturnValue(newState);

      await createResource(mockContext, testFunction, initialState);

      expect(stateManager.setResource).toHaveBeenLastCalledWith(
        expect.objectContaining({ version: CURRENT_STATE_VERSION }),
        'functions.test_fn',
        expect.objectContaining({
          instances: expect.arrayContaining([
            expect.objectContaining({
              eipConfig: expect.objectContaining({
                eipFixed: null,
                eips: [],
              }),
              accessInfo: expect.objectContaining({
                host: null,
                vip: null,
              }),
              deadLetterConfig: expect.objectContaining({
                type: null,
                name: null,
                filterType: null,
              }),
              publicNetConfig: expect.objectContaining({
                publicNetStatus: null,
                eipConfig: expect.objectContaining({
                  eipStatus: null,
                  eipAddress: [],
                }),
              }),
              intranetConfig: expect.objectContaining({
                ipFixed: null,
              }),
              imageConfig: expect.objectContaining({
                imageType: null,
                imageUri: null,
              }),
              protocolParams: expect.objectContaining({
                wsParams: expect.objectContaining({
                  idleTimeOut: null,
                }),
              }),
            }),
          ]),
        }),
      );
    });

    it('should handle all top-level null optional fields', async () => {
      const infoWithAllNulls = {
        FunctionName: 'min-function',
        Runtime: 'nodejs18',
        Handler: 'index.handler',
        MemorySize: 256,
        Timeout: 5,
        Environment: { Variables: [] },
        ModTime: undefined,
        CodeSha256: undefined,
        CodeInfo: undefined,
        Description: undefined,
        CodeSize: undefined,
        FunctionVersion: undefined,
        UseGpu: undefined,
        CodeResult: undefined,
        CodeError: undefined,
        ErrNo: undefined,
        Namespace: undefined,
        Role: undefined,
        InstallDependency: undefined,
        Status: undefined,
        StatusDesc: undefined,
        ClsLogsetId: undefined,
        ClsTopicId: undefined,
        FunctionId: undefined,
        Type: undefined,
        L5Enable: undefined,
        AddTime: undefined,
        OnsEnable: undefined,
        AvailableStatus: undefined,
        Qualifier: undefined,
        InitTimeout: undefined,
        AsyncRunEnable: undefined,
        TraceEnable: undefined,
        ProtocolType: undefined,
        DnsCache: undefined,
      };

      const newState = { ...initialState, resources: {} };
      (mockScfOperations.createFunction as jest.Mock).mockResolvedValue(undefined);
      (mockScfOperations.getFunction as jest.Mock).mockResolvedValue(infoWithAllNulls);
      (stateManager.setResource as jest.Mock).mockReturnValue(newState);

      await createResource(mockContext, testFunction, initialState);

      expect(stateManager.setResource).toHaveBeenLastCalledWith(
        expect.objectContaining({ version: CURRENT_STATE_VERSION }),
        'functions.test_fn',
        expect.objectContaining({
          instances: expect.arrayContaining([
            expect.objectContaining({
              functionName: 'min-function',
              modTime: null,
              codeSha256: null,
              codeInfo: null,
              description: null,
              codeSize: null,
              functionVersion: null,
              useGpu: null,
              codeResult: null,
              codeError: null,
              errNo: null,
              namespace: null,
              role: null,
              installDependency: null,
              status: null,
              statusDesc: null,
              clsLogsetId: null,
              clsTopicId: null,
              functionId: null,
              type: null,
              l5Enable: null,
              addTime: null,
              onsEnable: null,
              availableStatus: null,
              qualifier: null,
              initTimeout: null,
              asyncRunEnable: null,
              traceEnable: null,
              protocolType: null,
              dnsCache: null,
            }),
          ]),
        }),
      );
    });
  });
});
