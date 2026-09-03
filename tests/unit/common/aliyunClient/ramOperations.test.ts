import { createRamOperations } from '../../../../src/common/aliyunClient/ramOperations';
import type RamClient from '@alicloud/ram20150501';

const mockCreatePolicy = jest.fn();
const mockAttachPolicyToRole = jest.fn();
const mockCreateRole = jest.fn();
const mockGetRole = jest.fn();
const mockUpdateRole = jest.fn();
const mockDetachPolicyFromRole = jest.fn();
const mockDeletePolicy = jest.fn();
const mockDeleteRole = jest.fn();
const mockListPoliciesForRole = jest.fn();
const mockGetPolicy = jest.fn();
const mockGetPolicyVersion = jest.fn();
const mockCreatePolicyVersion = jest.fn();
const mockListPolicyVersions = jest.fn();
const mockDeletePolicyVersion = jest.fn();

const mockRamClient = {
  createPolicy: mockCreatePolicy,
  attachPolicyToRole: mockAttachPolicyToRole,
  createRole: mockCreateRole,
  getRole: mockGetRole,
  updateRole: mockUpdateRole,
  detachPolicyFromRole: mockDetachPolicyFromRole,
  deletePolicy: mockDeletePolicy,
  deleteRole: mockDeleteRole,
  listPoliciesForRole: mockListPoliciesForRole,
  getPolicy: mockGetPolicy,
  getPolicyVersion: mockGetPolicyVersion,
  createPolicyVersion: mockCreatePolicyVersion,
  listPolicyVersions: mockListPolicyVersions,
  deletePolicyVersion: mockDeletePolicyVersion,
} as unknown as RamClient;

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
    __: (key: string, params?: Record<string, string>) => {
      if (params) return `${key}:${JSON.stringify(params)}`;
      return key;
    },
  },
}));

describe('ramOperations', () => {
  let operations: ReturnType<typeof createRamOperations>;

  beforeEach(() => {
    jest.clearAllMocks();
    operations = createRamOperations(mockRamClient);
  });

  describe('createRole', () => {
    it('should create role with trusted services', async () => {
      mockCreateRole.mockResolvedValue({
        body: {
          role: {
            roleName: 'fc-execution-role',
            roleId: 'role-123',
            arn: 'arn:aliyun:ram::123456789:role/fc-execution-role',
            description: 'FC execution role',
            createDate: '2023-01-01T00:00:00Z',
            updateDate: '2023-01-01T00:00:00Z',
            maxSessionDuration: 3600,
          },
        },
      });

      mockCreatePolicy.mockResolvedValue({});
      mockAttachPolicyToRole.mockResolvedValue({});

      const result = await operations.createRole('fc-execution-role', ['fc.aliyuncs.com']);

      expect(result).toBeDefined();
      expect(result.roleName).toBe('fc-execution-role');
      expect(result.roleId).toBe('role-123');
      expect(result.arn).toBe('arn:aliyun:ram::123456789:role/fc-execution-role');
      expect(result.policyName).toBe('fc-execution-role-policy');
    });

    it('should create role with custom description', async () => {
      mockCreateRole.mockResolvedValue({
        body: {
          role: {
            roleName: 'custom-role',
            roleId: 'role-456',
            arn: 'arn:aliyun:ram::123456789:role/custom-role',
            description: 'Custom role',
          },
        },
      });

      mockCreatePolicy.mockResolvedValue({});
      mockAttachPolicyToRole.mockResolvedValue({});

      await operations.createRole('custom-role', ['fc.aliyuncs.com'], 'My custom role');

      expect(mockCreateRole).toHaveBeenCalled();
      const callArgs = mockCreateRole.mock.calls[0][0];
      expect(callArgs.description).toBe('My custom role');
    });

    it('should handle role already exists error', async () => {
      const error = new Error('EntityAlreadyExists.Role');
      Object.assign(error, { code: 'EntityAlreadyExists.Role' });
      mockCreateRole.mockRejectedValueOnce(error);

      mockGetRole.mockResolvedValue({
        body: {
          role: {
            roleName: 'fc-execution-role',
            roleId: 'role-123',
            arn: 'arn:aliyun:ram::123456789:role/fc-execution-role',
          },
        },
      });

      mockUpdateRole.mockResolvedValue({});
      mockGetPolicy.mockResolvedValue({
        body: {
          policy: { policyName: 'fc-execution-role-policy', defaultVersion: 'v1' },
        },
      });
      mockGetPolicyVersion.mockResolvedValue({
        body: { policyVersion: { versionId: 'v1', policyDocument: '{"stale":true}' } },
      });
      mockListPolicyVersions.mockResolvedValue({
        body: { policyVersions: { policyVersion: [] } },
      });
      mockCreatePolicyVersion.mockResolvedValue({});
      mockAttachPolicyToRole.mockResolvedValue({});

      const result = await operations.createRole('fc-execution-role', ['fc.aliyuncs.com']);

      expect(result.roleName).toBe('fc-execution-role');
      expect(mockGetRole).toHaveBeenCalled();
      expect(mockUpdateRole).toHaveBeenCalled();
      expect(mockCreatePolicyVersion).toHaveBeenCalled();
    });

    it('should throw on role creation failure', async () => {
      mockCreateRole.mockRejectedValue(new Error('InternalError'));

      await expect(operations.createRole('role', ['fc.aliyuncs.com'])).rejects.toThrow(
        'InternalError',
      );
    });

    it('should handle policy attachment error when policy already attached', async () => {
      mockCreateRole.mockResolvedValue({
        body: {
          role: {
            roleName: 'fc-execution-role',
            roleId: 'role-123',
            arn: 'arn:aliyun:ram::123456789:role/fc-execution-role',
          },
        },
      });

      mockCreatePolicy.mockResolvedValue({});

      const attachError = new Error('EntityAlreadyExists.Role.Policy');
      Object.assign(attachError, { code: 'EntityAlreadyExists.Role.Policy' });
      mockAttachPolicyToRole.mockRejectedValue(attachError);

      const result = await operations.createRole('fc-execution-role', ['fc.aliyuncs.com']);

      expect(result).toBeDefined();
      expect(result.policyName).toBe('fc-execution-role-policy');
    });
  });

  describe('updateRoleTrustPolicy', () => {
    it('should update role trust policy', async () => {
      mockGetRole.mockResolvedValue({
        body: {
          role: {
            roleName: 'fc-execution-role',
            roleId: 'role-123',
            arn: 'arn:aliyun:ram::123456789:role/fc-execution-role',
            description: 'FC execution role',
          },
        },
      });

      mockUpdateRole.mockResolvedValue({});

      const result = await operations.updateRoleTrustPolicy('fc-execution-role', [
        'fc.aliyuncs.com',
        'apigateway.aliyuncs.com',
      ]);

      expect(result).toBeDefined();
      expect(result.roleName).toBe('fc-execution-role');
      expect(mockUpdateRole).toHaveBeenCalled();
      const callArgs = mockUpdateRole.mock.calls[0][0];
      expect(callArgs.newAssumeRolePolicyDocument).toContain('fc.aliyuncs.com');
      expect(callArgs.newAssumeRolePolicyDocument).toContain('apigateway.aliyuncs.com');
    });

    it('should throw when role does not exist', async () => {
      const error = new Error('EntityNotExist.Role');
      Object.assign(error, { code: 'EntityNotExist.Role' });
      mockGetRole.mockRejectedValue(error);

      await expect(
        operations.updateRoleTrustPolicy('non-existent', ['fc.aliyuncs.com']),
      ).rejects.toThrow('RAM_ROLE_NOT_FOUND_IN_CLOUD');
    });

    it('should throw on update failure', async () => {
      mockGetRole.mockResolvedValue({
        body: {
          role: {
            roleName: 'fc-execution-role',
            roleId: 'role-123',
          },
        },
      });

      mockUpdateRole.mockRejectedValue(new Error('AccessDenied'));

      await expect(
        operations.updateRoleTrustPolicy('fc-execution-role', ['fc.aliyuncs.com']),
      ).rejects.toThrow('AccessDenied');
    });
  });

  describe('getRole', () => {
    it('should get existing role', async () => {
      mockGetRole.mockResolvedValue({
        body: {
          role: {
            roleName: 'fc-execution-role',
            roleId: 'role-123',
            arn: 'arn:aliyun:ram::123456789:role/fc-execution-role',
            description: 'FC execution role',
            assumeRolePolicyDocument: JSON.stringify({
              Version: '1',
              Statement: [
                {
                  Action: 'sts:AssumeRole',
                  Effect: 'Allow',
                  Principal: { Service: ['fc.aliyuncs.com'] },
                },
              ],
            }),
          },
        },
      });

      const result = await operations.getRole('fc-execution-role');

      expect(result).toBeDefined();
      expect(result?.roleName).toBe('fc-execution-role');
      expect(result?.roleId).toBe('role-123');
      expect(result?.policyName).toBe('fc-execution-role-policy');
    });

    it('should return null when role does not exist', async () => {
      const error = new Error('EntityNotExist.Role');
      Object.assign(error, { code: 'EntityNotExist.Role' });
      mockGetRole.mockRejectedValue(error);

      const result = await operations.getRole('non-existent');

      expect(result).toBeNull();
    });

    it('should return null when response is empty', async () => {
      mockGetRole.mockResolvedValue(null);

      const result = await operations.getRole('fc-execution-role');

      expect(result).toBeNull();
    });

    it('should throw on unexpected error', async () => {
      mockGetRole.mockRejectedValue(new Error('InternalError'));

      await expect(operations.getRole('fc-execution-role')).rejects.toThrow('InternalError');
    });
  });

  describe('deleteRole', () => {
    it('should delete role and associated policy', async () => {
      mockDetachPolicyFromRole.mockResolvedValue({});
      mockDeletePolicy.mockResolvedValue({});
      mockDeleteRole.mockResolvedValue({});

      await operations.deleteRole('fc-execution-role');

      expect(mockDetachPolicyFromRole).toHaveBeenCalled();
      expect(mockDeletePolicy).toHaveBeenCalled();
      expect(mockDeleteRole).toHaveBeenCalled();
    });

    it('should continue if policy detach fails', async () => {
      mockDetachPolicyFromRole.mockRejectedValue(new Error('PolicyNotAttached'));
      mockDeletePolicy.mockResolvedValue({});
      mockDeleteRole.mockResolvedValue({});

      await operations.deleteRole('fc-execution-role');

      expect(mockDeletePolicy).toHaveBeenCalled();
      expect(mockDeleteRole).toHaveBeenCalled();
    });

    it('should continue if policy deletion fails', async () => {
      mockDetachPolicyFromRole.mockResolvedValue({});
      mockDeletePolicy.mockRejectedValue(new Error('PolicyNotFound'));
      mockDeleteRole.mockResolvedValue({});

      await operations.deleteRole('fc-execution-role');

      expect(mockDeleteRole).toHaveBeenCalled();
    });

    it('should throw if role deletion fails', async () => {
      mockDetachPolicyFromRole.mockResolvedValue({});
      mockDeletePolicy.mockResolvedValue({});
      mockDeleteRole.mockRejectedValue(new Error('RoleNotEmpty'));

      await expect(operations.deleteRole('fc-execution-role')).rejects.toThrow('RoleNotEmpty');
    });

    it('should detach managed policies before custom policy and role deletion', async () => {
      mockDetachPolicyFromRole.mockResolvedValue({});
      mockDeletePolicy.mockResolvedValue({});
      mockDeleteRole.mockResolvedValue({});

      await operations.deleteRole('fc-execution-role', ['AliyunOSSFullAccess']);

      // Detach managed policy first
      expect(mockDetachPolicyFromRole).toHaveBeenCalledWith(
        expect.objectContaining({
          policyType: 'System',
          policyName: 'AliyunOSSFullAccess',
          roleName: 'fc-execution-role',
        }),
      );
      // Then detach custom inline policy
      expect(mockDetachPolicyFromRole).toHaveBeenCalledWith(
        expect.objectContaining({
          policyType: 'Custom',
          policyName: 'fc-execution-role-policy',
          roleName: 'fc-execution-role',
        }),
      );
      expect(mockDeleteRole).toHaveBeenCalled();
    });
  });

  describe('createRole with managedPolicies', () => {
    it('should attach managed policies after role creation', async () => {
      mockCreateRole.mockResolvedValue({
        body: {
          role: {
            roleName: 'fc-execution-role',
            roleId: 'role-123',
            arn: 'arn:aliyun:ram::123456789:role/fc-execution-role',
            description: 'FC execution role',
            createDate: '2023-01-01T00:00:00Z',
            updateDate: '2023-01-01T00:00:00Z',
            maxSessionDuration: 3600,
          },
        },
      });

      mockCreatePolicy.mockResolvedValue({});
      mockAttachPolicyToRole.mockResolvedValue({});

      const result = await operations.createRole(
        'fc-execution-role',
        ['fc.aliyuncs.com'],
        undefined,
        undefined,
        ['AliyunOSSFullAccess', 'AliyunLogFullAccess'],
      );

      // Should attach both managed policies as System type
      expect(mockAttachPolicyToRole).toHaveBeenCalledWith(
        expect.objectContaining({
          policyType: 'System',
          policyName: 'AliyunOSSFullAccess',
          roleName: 'fc-execution-role',
        }),
      );
      expect(mockAttachPolicyToRole).toHaveBeenCalledWith(
        expect.objectContaining({
          policyType: 'System',
          policyName: 'AliyunLogFullAccess',
          roleName: 'fc-execution-role',
        }),
      );
      // Should also attach the custom inline policy
      expect(mockAttachPolicyToRole).toHaveBeenCalledWith(
        expect.objectContaining({
          policyType: 'Custom',
          policyName: 'fc-execution-role-policy',
          roleName: 'fc-execution-role',
        }),
      );
      expect(result.managedPolicies).toEqual(['AliyunOSSFullAccess', 'AliyunLogFullAccess']);
    });

    it('should not attach managed policies when none provided', async () => {
      mockCreateRole.mockResolvedValue({
        body: { role: { roleName: 'fc-execution-role', roleId: 'role-123' } },
      });
      mockCreatePolicy.mockResolvedValue({});
      mockAttachPolicyToRole.mockResolvedValue({});

      await operations.createRole('fc-execution-role', ['fc.aliyuncs.com']);

      // Should only attach the custom inline policy
      const customCalls = mockAttachPolicyToRole.mock.calls.filter(
        (call: Record<string, unknown>[]) => call[0].policyType === 'System',
      );
      expect(customCalls).toHaveLength(0);
    });

    it('should handle already-attached error for managed policies during role creation', async () => {
      mockCreateRole.mockResolvedValue({
        body: {
          role: {
            roleName: 'fc-execution-role',
            roleId: 'role-123',
            arn: 'arn:aliyun:ram::123456789:role/fc-execution-role',
            description: 'FC execution role',
            createDate: '2023-01-01T00:00:00Z',
            updateDate: '2023-01-01T00:00:00Z',
            maxSessionDuration: 3600,
          },
        },
      });

      mockCreatePolicy.mockResolvedValue({});

      const alreadyAttachedError = new Error('EntityAlreadyExists.Role.Policy');
      Object.assign(alreadyAttachedError, { code: 'EntityAlreadyExists.Role.Policy' });
      mockAttachPolicyToRole
        .mockResolvedValueOnce({})
        .mockRejectedValueOnce(alreadyAttachedError)
        .mockResolvedValueOnce({});

      const result = await operations.createRole(
        'fc-execution-role',
        ['fc.aliyuncs.com'],
        undefined,
        undefined,
        ['AliyunOSSFullAccess', 'AliyunLogFullAccess'],
      );

      expect(result).toBeDefined();
      expect(result.roleName).toBe('fc-execution-role');
      expect(mockAttachPolicyToRole).toHaveBeenCalledTimes(3);
    });

    it('should throw on unexpected managed policy error during role creation', async () => {
      mockCreateRole.mockResolvedValue({
        body: {
          role: {
            roleName: 'fc-execution-role',
            roleId: 'role-123',
            arn: 'arn:aliyun:ram::123456789:role/fc-execution-role',
            description: 'FC execution role',
            createDate: '2023-01-01T00:00:00Z',
            updateDate: '2023-01-01T00:00:00Z',
            maxSessionDuration: 3600,
          },
        },
      });

      mockCreatePolicy.mockResolvedValue({});
      mockAttachPolicyToRole
        .mockResolvedValueOnce({})
        .mockRejectedValueOnce(new Error('AccessDenied'));

      await expect(
        operations.createRole('fc-execution-role', ['fc.aliyuncs.com'], undefined, undefined, [
          'AliyunOSSFullAccess',
        ]),
      ).rejects.toThrow('AccessDenied');
    });
  });

  describe('createRole with customStatements', () => {
    it('should create role with custom statements including sid', async () => {
      mockCreateRole.mockResolvedValue({
        body: {
          role: {
            roleName: 'fc-execution-role',
            roleId: 'role-123',
            arn: 'arn:aliyun:ram::123456789:role/fc-execution-role',
            description: 'FC execution role',
            createDate: '2023-01-01T00:00:00Z',
            updateDate: '2023-01-01T00:00:00Z',
            maxSessionDuration: 3600,
          },
        },
      });

      mockCreatePolicy.mockResolvedValue({});
      mockAttachPolicyToRole.mockResolvedValue({});

      const result = await operations.createRole(
        'fc-execution-role',
        ['fc.aliyuncs.com'],
        undefined,
        [{ sid: 'custom-ecs', effect: 'Allow', action: ['ecs:*'], resource: ['*'] }],
      );

      expect(result).toBeDefined();
      expect(result.roleName).toBe('fc-execution-role');

      const createPolicyCall = mockCreatePolicy.mock.calls[0][0];
      const policyDoc = JSON.parse(createPolicyCall.policyDocument);
      const customStmt = policyDoc.Statement[5];
      expect(customStmt.Sid).toBe('custom-ecs');
      expect(customStmt.Effect).toBe('Allow');
      expect(customStmt.Action).toEqual(['ecs:*']);
      expect(customStmt.Resource).toEqual(['*']);
    });

    it('should create role with custom statements without sid', async () => {
      mockCreateRole.mockResolvedValue({
        body: {
          role: {
            roleName: 'fc-execution-role',
            roleId: 'role-123',
            arn: 'arn:aliyun:ram::123456789:role/fc-execution-role',
          },
        },
      });

      mockCreatePolicy.mockResolvedValue({});
      mockAttachPolicyToRole.mockResolvedValue({});

      const result = await operations.createRole(
        'fc-execution-role',
        ['fc.aliyuncs.com'],
        undefined,
        [{ effect: 'Deny', action: ['ram:DeleteRole'], resource: ['*'] }],
      );

      expect(result).toBeDefined();

      const policyDoc = JSON.parse(mockCreatePolicy.mock.calls[0][0].policyDocument);
      const customStmt = policyDoc.Statement[5];
      expect(customStmt.Sid).toBeUndefined();
      expect(customStmt.Effect).toBe('Deny');
      expect(customStmt.Action).toEqual(['ram:DeleteRole']);
    });
  });

  describe('createRole with executionStatements', () => {
    it('should use the provided execution statements as the policy baseline', async () => {
      mockCreateRole.mockResolvedValue({
        body: {
          role: {
            roleName: 'fc-execution-role',
            roleId: 'role-123',
            arn: 'arn:aliyun:ram::123456789:role/fc-execution-role',
          },
        },
      });
      mockCreatePolicy.mockResolvedValue({});
      mockAttachPolicyToRole.mockResolvedValue({});

      const baseline = [
        { effect: 'Allow' as const, action: ['fc:InvokeFunction'], resource: ['*'] },
      ];
      const custom = [{ effect: 'Allow' as const, action: ['oss:GetObject'], resource: ['*'] }];

      await operations.createRole(
        'fc-execution-role',
        ['fc.aliyuncs.com'],
        undefined,
        custom,
        undefined,
        baseline,
      );

      const policyDoc = JSON.parse(mockCreatePolicy.mock.calls[0][0].policyDocument);
      expect(policyDoc.Statement).toHaveLength(2);
      expect(policyDoc.Statement[0].Action).toEqual(['fc:InvokeFunction']);
      expect(policyDoc.Statement[1].Action).toEqual(['oss:GetObject']);
    });
  });

  describe('updateExecutionPolicyDocument', () => {
    const desiredDoc = JSON.stringify({
      Version: '1',
      Statement: [
        { Effect: 'Allow', Action: ['fc:InvokeFunction'], Resource: '*' },
        { Effect: 'Allow', Action: ['log:GetLogStore'], Resource: '*' },
      ],
    });
    const existingDoc = JSON.stringify({
      Version: '1',
      Statement: [{ Effect: 'Allow', Action: ['log:GetLogStore'], Resource: '*' }],
    });

    beforeEach(() => {
      mockGetPolicy.mockResolvedValue({
        body: {
          policy: { policyName: 'fc-execution-role-policy', defaultVersion: 'v1' },
        },
      });
      mockGetPolicyVersion.mockResolvedValue({
        body: { policyVersion: { versionId: 'v1', policyDocument: existingDoc } },
      });
      mockListPolicyVersions.mockResolvedValue({
        body: { policyVersions: { policyVersion: [] } },
      });
      mockCreatePolicyVersion.mockResolvedValue({});
      mockDeletePolicyVersion.mockResolvedValue({});
      mockAttachPolicyToRole.mockResolvedValue({});
    });

    it('should not create a new version when the document is identical', async () => {
      await operations.updateExecutionPolicyDocument('fc-execution-role', existingDoc);

      expect(mockGetPolicy).toHaveBeenCalledWith(
        expect.objectContaining({ policyName: 'fc-execution-role-policy', policyType: 'Custom' }),
      );
      expect(mockCreatePolicyVersion).not.toHaveBeenCalled();
      expect(mockAttachPolicyToRole).not.toHaveBeenCalled();
    });

    it('should create a new version and ensure attachment when the document changed', async () => {
      await operations.updateExecutionPolicyDocument('fc-execution-role', desiredDoc);

      expect(mockCreatePolicyVersion).toHaveBeenCalledWith(
        expect.objectContaining({
          policyName: 'fc-execution-role-policy',
          policyDocument: desiredDoc,
          setAsDefault: true,
        }),
      );
      expect(mockAttachPolicyToRole).toHaveBeenCalledWith(
        expect.objectContaining({
          policyType: 'Custom',
          policyName: 'fc-execution-role-policy',
          roleName: 'fc-execution-role',
        }),
      );
    });

    it('should create the policy when it does not exist yet', async () => {
      const notFound = new Error('EntityNotExist.Policy');
      Object.assign(notFound, { code: 'EntityNotExist.Policy' });
      mockGetPolicy.mockRejectedValue(notFound);

      await operations.updateExecutionPolicyDocument('fc-execution-role', desiredDoc);

      expect(mockCreatePolicy).toHaveBeenCalledWith(
        expect.objectContaining({
          policyName: 'fc-execution-role-policy',
          policyDocument: desiredDoc,
        }),
      );
      expect(mockCreatePolicyVersion).not.toHaveBeenCalled();
      expect(mockAttachPolicyToRole).toHaveBeenCalled();
    });

    it('should prune the oldest non-default version when at the version limit', async () => {
      mockListPolicyVersions.mockResolvedValue({
        body: {
          policyVersions: {
            policyVersion: [
              { versionId: 'v1', isDefaultVersion: true, createDate: '2023-01-01T00:00:00Z' },
              { versionId: 'v2', isDefaultVersion: false, createDate: '2023-01-02T00:00:00Z' },
              { versionId: 'v3', isDefaultVersion: false, createDate: '2023-01-03T00:00:00Z' },
              { versionId: 'v4', isDefaultVersion: false, createDate: '2023-01-04T00:00:00Z' },
              { versionId: 'v5', isDefaultVersion: false, createDate: '2023-01-05T00:00:00Z' },
            ],
          },
        },
      });

      await operations.updateExecutionPolicyDocument('fc-execution-role', desiredDoc);

      expect(mockDeletePolicyVersion).toHaveBeenCalledWith(
        expect.objectContaining({ policyName: 'fc-execution-role-policy', versionId: 'v2' }),
      );
      expect(mockCreatePolicyVersion).toHaveBeenCalledWith(
        expect.objectContaining({ policyName: 'fc-execution-role-policy', setAsDefault: true }),
      );
    });

    it('should ignore an already-attached error when ensuring attachment', async () => {
      const alreadyAttached = new Error('EntityAlreadyExists.Role.Policy');
      Object.assign(alreadyAttached, { code: 'EntityAlreadyExists.Role.Policy' });
      mockAttachPolicyToRole.mockRejectedValue(alreadyAttached);

      await expect(
        operations.updateExecutionPolicyDocument('fc-execution-role', desiredDoc),
      ).resolves.toBeUndefined();
    });
  });

  describe('getExecutionPolicyDocument', () => {
    const policyDocument = JSON.stringify({
      Version: '1',
      Statement: [{ Effect: 'Allow', Action: ['fc:InvokeFunction'], Resource: '*' }],
    });

    it('should return the default policy document when policy and version exist', async () => {
      mockGetPolicy.mockResolvedValue({
        body: { policy: { policyName: 'fc-execution-role-policy', defaultVersion: 'v1' } },
      });
      mockGetPolicyVersion.mockResolvedValue({
        body: { policyVersion: { versionId: 'v1', policyDocument } },
      });

      const result = await operations.getExecutionPolicyDocument('fc-execution-role');

      expect(result).toBe(policyDocument);
      expect(mockGetPolicy).toHaveBeenCalledWith(
        expect.objectContaining({ policyName: 'fc-execution-role-policy', policyType: 'Custom' }),
      );
      expect(mockGetPolicyVersion).toHaveBeenCalledWith(
        expect.objectContaining({
          policyName: 'fc-execution-role-policy',
          policyType: 'Custom',
          versionId: 'v1',
        }),
      );
    });

    it('should return undefined when getPolicy throws EntityNotExist.Policy', async () => {
      const notFound = new Error('EntityNotExist.Policy');
      Object.assign(notFound, { code: 'EntityNotExist.Policy' });
      mockGetPolicy.mockRejectedValue(notFound);

      const result = await operations.getExecutionPolicyDocument('fc-execution-role');

      expect(result).toBeUndefined();
      expect(mockGetPolicyVersion).not.toHaveBeenCalled();
    });

    it('should rethrow non-not-found errors from getPolicy', async () => {
      mockGetPolicy.mockRejectedValue(new Error('AccessDenied'));

      await expect(operations.getExecutionPolicyDocument('fc-execution-role')).rejects.toThrow(
        'AccessDenied',
      );
    });

    it('should return undefined when the policy has no default version (role without policy)', async () => {
      mockGetPolicy.mockResolvedValue({
        body: { policy: { policyName: 'fc-execution-role-policy' } },
      });

      const result = await operations.getExecutionPolicyDocument('fc-execution-role');

      expect(result).toBeUndefined();
      expect(mockGetPolicyVersion).not.toHaveBeenCalled();
    });
  });

  describe('attachManagedPolicies', () => {
    it('should attach multiple managed policies', async () => {
      mockAttachPolicyToRole.mockResolvedValue({});

      await operations.attachManagedPolicies('fc-execution-role', [
        'AliyunOSSFullAccess',
        'AliyunLogFullAccess',
      ]);

      expect(mockAttachPolicyToRole).toHaveBeenCalledTimes(2);
      expect(mockAttachPolicyToRole).toHaveBeenCalledWith(
        expect.objectContaining({
          policyType: 'System',
          policyName: 'AliyunOSSFullAccess',
          roleName: 'fc-execution-role',
        }),
      );
      expect(mockAttachPolicyToRole).toHaveBeenCalledWith(
        expect.objectContaining({
          policyType: 'System',
          policyName: 'AliyunLogFullAccess',
          roleName: 'fc-execution-role',
        }),
      );
    });

    it('should handle already-attached error gracefully', async () => {
      const alreadyAttachedError = new Error('EntityAlreadyExists.Role.Policy');
      Object.assign(alreadyAttachedError, { code: 'EntityAlreadyExists.Role.Policy' });
      mockAttachPolicyToRole.mockRejectedValueOnce(alreadyAttachedError).mockResolvedValueOnce({});

      await expect(
        operations.attachManagedPolicies('fc-execution-role', [
          'AliyunOSSFullAccess',
          'AliyunLogFullAccess',
        ]),
      ).resolves.toBeUndefined();
    });

    it('should rethrow non-already-attached errors', async () => {
      mockAttachPolicyToRole.mockRejectedValue(new Error('AccessDenied'));

      await expect(
        operations.attachManagedPolicies('fc-execution-role', ['AliyunOSSFullAccess']),
      ).rejects.toThrow('AccessDenied');
    });
  });

  describe('detachManagedPolicies', () => {
    it('should detach multiple managed policies', async () => {
      mockDetachPolicyFromRole.mockResolvedValue({});

      await operations.detachManagedPolicies('fc-execution-role', [
        'AliyunOSSFullAccess',
        'AliyunLogFullAccess',
      ]);

      expect(mockDetachPolicyFromRole).toHaveBeenCalledTimes(2);
      expect(mockDetachPolicyFromRole).toHaveBeenCalledWith(
        expect.objectContaining({
          policyType: 'System',
          policyName: 'AliyunOSSFullAccess',
          roleName: 'fc-execution-role',
        }),
      );
      expect(mockDetachPolicyFromRole).toHaveBeenCalledWith(
        expect.objectContaining({
          policyType: 'System',
          policyName: 'AliyunLogFullAccess',
          roleName: 'fc-execution-role',
        }),
      );
    });

    it('should handle not-attached error gracefully', async () => {
      const notAttachedError = new Error('EntityNotExist.Role.Policy');
      Object.assign(notAttachedError, { code: 'EntityNotExist.Role.Policy' });
      mockDetachPolicyFromRole.mockRejectedValueOnce(notAttachedError).mockResolvedValueOnce({});

      await expect(
        operations.detachManagedPolicies('fc-execution-role', [
          'AliyunOSSFullAccess',
          'AliyunLogFullAccess',
        ]),
      ).resolves.toBeUndefined();
    });

    it('should rethrow non-not-attached errors', async () => {
      mockDetachPolicyFromRole.mockRejectedValue(new Error('AccessDenied'));

      await expect(
        operations.detachManagedPolicies('fc-execution-role', ['AliyunOSSFullAccess']),
      ).rejects.toThrow('AccessDenied');
    });
  });

  describe('listAttachedRolePolicies', () => {
    it('should return list of attached system policy names', async () => {
      mockListPoliciesForRole.mockResolvedValue({
        body: {
          policies: {
            policy: [
              { policyName: 'AliyunOSSFullAccess', policyType: 'System' },
              { policyName: 'fc-execution-role-policy', policyType: 'Custom' },
              { policyName: 'AliyunLogFullAccess', policyType: 'System' },
            ],
          },
        },
      });

      const result = await operations.listAttachedRolePolicies('fc-execution-role');

      expect(result).toEqual(['AliyunOSSFullAccess', 'AliyunLogFullAccess']);
    });

    it('should return empty array when no policies attached', async () => {
      mockListPoliciesForRole.mockResolvedValue({
        body: { policies: { policy: [] } },
      });

      const result = await operations.listAttachedRolePolicies('fc-execution-role');

      expect(result).toEqual([]);
    });

    it('should return empty array when response is empty', async () => {
      mockListPoliciesForRole.mockResolvedValue(null);

      const result = await operations.listAttachedRolePolicies('fc-execution-role');

      expect(result).toEqual([]);
    });
  });

  describe('updateManagedPolicies', () => {
    it('should attach new and detach removed policies', async () => {
      mockListPoliciesForRole.mockResolvedValue({
        body: {
          policies: {
            policy: [
              { policyName: 'AliyunOSSFullAccess', policyType: 'System' },
              { policyName: 'AliyunLogFullAccess', policyType: 'System' },
            ],
          },
        },
      });
      mockAttachPolicyToRole.mockResolvedValue({});
      mockDetachPolicyFromRole.mockResolvedValue({});

      await operations.updateManagedPolicies('fc-execution-role', [
        'AliyunLogFullAccess',
        'AliyunRDSFullAccess',
      ]);

      // Detach removed: AliyunOSSFullAccess
      expect(mockDetachPolicyFromRole).toHaveBeenCalledWith(
        expect.objectContaining({
          policyType: 'System',
          policyName: 'AliyunOSSFullAccess',
          roleName: 'fc-execution-role',
        }),
      );
      // Attach new: AliyunRDSFullAccess
      expect(mockAttachPolicyToRole).toHaveBeenCalledWith(
        expect.objectContaining({
          policyType: 'System',
          policyName: 'AliyunRDSFullAccess',
          roleName: 'fc-execution-role',
        }),
      );
      // Should NOT detach AliyunLogFullAccess (still desired)
      expect(mockDetachPolicyFromRole).not.toHaveBeenCalledWith(
        expect.objectContaining({ policyName: 'AliyunLogFullAccess' }),
      );
      // Should NOT attach AliyunOSSFullAccess (already current)
      expect(mockAttachPolicyToRole).not.toHaveBeenCalledWith(
        expect.objectContaining({ policyName: 'AliyunOSSFullAccess' }),
      );
    });

    it('should handle full ARN format in desired policies', async () => {
      mockListPoliciesForRole.mockResolvedValue({
        body: {
          policies: {
            policy: [{ policyName: 'AliyunOSSFullAccess', policyType: 'System' }],
          },
        },
      });
      mockAttachPolicyToRole.mockResolvedValue({});
      mockDetachPolicyFromRole.mockResolvedValue({});

      await operations.updateManagedPolicies('fc-execution-role', [
        'acs:ram::123456789:policy/AliyunRDSFullAccess',
      ]);

      // Detach OSS (removed)
      expect(mockDetachPolicyFromRole).toHaveBeenCalledWith(
        expect.objectContaining({ policyName: 'AliyunOSSFullAccess' }),
      );
      // Attach RDS (new - extracted from ARN)
      expect(mockAttachPolicyToRole).toHaveBeenCalledWith(
        expect.objectContaining({ policyName: 'AliyunRDSFullAccess' }),
      );
    });

    it('should be no-op when desired matches current', async () => {
      mockListPoliciesForRole.mockResolvedValue({
        body: {
          policies: {
            policy: [{ policyName: 'AliyunOSSFullAccess', policyType: 'System' }],
          },
        },
      });

      await operations.updateManagedPolicies('fc-execution-role', ['AliyunOSSFullAccess']);

      expect(mockAttachPolicyToRole).not.toHaveBeenCalled();
      expect(mockDetachPolicyFromRole).not.toHaveBeenCalled();
    });
  });
});
