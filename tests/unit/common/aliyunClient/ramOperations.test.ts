import { createRamOperations } from '../../../../src/common/aliyunClient/ramOperations';

const mockCreatePolicy = jest.fn();
const mockAttachPolicyToRole = jest.fn();
const mockCreateRole = jest.fn();
const mockGetRole = jest.fn();
const mockUpdateRole = jest.fn();
const mockDetachPolicyFromRole = jest.fn();
const mockDeletePolicy = jest.fn();
const mockDeleteRole = jest.fn();

const mockRamClient = {
  createPolicy: mockCreatePolicy,
  attachPolicyToRole: mockAttachPolicyToRole,
  createRole: mockCreateRole,
  getRole: mockGetRole,
  updateRole: mockUpdateRole,
  detachPolicyFromRole: mockDetachPolicyFromRole,
  deletePolicy: mockDeletePolicy,
  deleteRole: mockDeleteRole,
} as unknown as Context;

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
      mockCreatePolicy.mockResolvedValue({});
      mockAttachPolicyToRole.mockResolvedValue({});

      const result = await operations.createRole('fc-execution-role', ['fc.aliyuncs.com']);

      expect(result.roleName).toBe('fc-execution-role');
      expect(mockGetRole).toHaveBeenCalled();
      expect(mockUpdateRole).toHaveBeenCalled();
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
  });
});
