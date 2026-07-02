import { createCamOperations } from '../../../../src/common/tencentClient/camOperations';

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
    __: (key: string, params?: Record<string, unknown>) => {
      if (params) return `${key}:${JSON.stringify(params)}`;
      return key;
    },
  },
}));

const mockCamClient = {
  CreateRole: jest.fn(),
  GetRole: jest.fn(),
  DeleteRole: jest.fn(),
  AttachRolePolicy: jest.fn(),
  DetachRolePolicy: jest.fn(),
  CreatePolicy: jest.fn(),
  DeletePolicy: jest.fn(),
  ListPolicies: jest.fn(),
  ListAttachedRolePolicies: jest.fn(),
};

describe('camOperations', () => {
  let operations: ReturnType<typeof createCamOperations>;

  beforeEach(() => {
    jest.clearAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    operations = createCamOperations(mockCamClient as any);
  });

  describe('createRole', () => {
    it('should create role with trusted services', async () => {
      mockCamClient.CreateRole.mockResolvedValue({
        RoleId: 'role-123',
      });
      mockCamClient.GetRole.mockResolvedValue({
        RoleInfo: {
          RoleId: 'role-123',
          RoleName: 'scf-execution-role',
          RoleArn: 'arn:tencent:cam::123456789:role/scf-execution-role',
          Description: 'SCF execution role',
        },
      });
      mockCamClient.CreatePolicy.mockResolvedValue({ PolicyId: 1 });
      mockCamClient.AttachRolePolicy.mockResolvedValue({});

      const result = await operations.createRole('scf-execution-role', ['scf.tencentcloud.com']);

      expect(mockCamClient.CreateRole).toHaveBeenCalledWith({
        RoleName: 'scf-execution-role',
        PolicyDocument: expect.stringContaining('sts:AssumeRole'),
        Description: expect.stringContaining(
          'ServerlessInsight SCF execution role for scf-execution-role',
        ),
      });
      expect(mockCamClient.CreatePolicy).toHaveBeenCalledWith(
        expect.objectContaining({ PolicyName: 'scf-execution-role-policy' }),
      );
      expect(mockCamClient.AttachRolePolicy).toHaveBeenCalledWith({
        PolicyName: 'scf-execution-role-policy',
        AttachRoleName: 'scf-execution-role',
      });
      expect(result).toEqual({
        roleName: 'scf-execution-role',
        roleId: 'role-123',
        roleArn: 'arn:tencent:cam::123456789:role/scf-execution-role',
        policyName: 'scf-execution-role-policy',
      });
    });

    it('should create role with custom description', async () => {
      mockCamClient.CreateRole.mockResolvedValue({ RoleId: 'role-456' });
      mockCamClient.GetRole.mockResolvedValue({
        RoleInfo: {
          RoleId: 'role-456',
          RoleName: 'custom-role',
          RoleArn: 'arn:tencent:cam::123456789:role/custom-role',
        },
      });
      mockCamClient.CreatePolicy.mockResolvedValue({ PolicyId: 2 });
      mockCamClient.AttachRolePolicy.mockResolvedValue({});

      await operations.createRole(
        'custom-role',
        ['scf.tencentcloud.com'],
        'My custom role description',
      );

      expect(mockCamClient.CreateRole).toHaveBeenCalledWith(
        expect.objectContaining({ Description: 'My custom role description' }),
      );
    });

    it('should attach managed policies when provided', async () => {
      mockCamClient.CreateRole.mockResolvedValue({ RoleId: 'role-789' });
      mockCamClient.GetRole.mockResolvedValue({
        RoleInfo: { RoleId: 'role-789', RoleName: 'managed-role', RoleArn: '' },
      });
      mockCamClient.CreatePolicy.mockResolvedValue({ PolicyId: 3 });
      mockCamClient.AttachRolePolicy.mockResolvedValue({});

      await operations.createRole('managed-role', ['scf.tencentcloud.com'], undefined, undefined, [
        'QCS::AdministratorAccess',
        'QCS::ReadOnlyAccess',
      ]);

      expect(mockCamClient.AttachRolePolicy).toHaveBeenCalledTimes(3);
      expect(mockCamClient.AttachRolePolicy).toHaveBeenCalledWith({
        PolicyName: 'QCS::AdministratorAccess',
        AttachRoleName: 'managed-role',
      });
      expect(mockCamClient.AttachRolePolicy).toHaveBeenCalledWith({
        PolicyName: 'QCS::ReadOnlyAccess',
        AttachRoleName: 'managed-role',
      });
    });

    it('should throw when AttachRolePolicy fails with unexpected error', async () => {
      mockCamClient.CreateRole.mockResolvedValue({ RoleId: 'role-123' });
      mockCamClient.GetRole.mockResolvedValue({
        RoleInfo: { RoleId: 'role-123', RoleName: 'attach-fail-role', RoleArn: '' },
      });
      mockCamClient.CreatePolicy.mockResolvedValue({ PolicyId: 1 });
      const error = Object.assign(new Error('AccessDenied'), { code: 'AccessDenied' });
      mockCamClient.AttachRolePolicy.mockRejectedValue(error);

      await expect(
        operations.createRole('attach-fail-role', ['scf.tencentcloud.com']),
      ).rejects.toThrow('AccessDenied');
    });

    it('should throw when AttachRolePolicy throws error without code property', async () => {
      mockCamClient.CreateRole.mockResolvedValue({ RoleId: 'role-123' });
      mockCamClient.GetRole.mockResolvedValue({
        RoleInfo: { RoleId: 'role-123', RoleName: 'attach-no-code-role', RoleArn: '' },
      });
      mockCamClient.CreatePolicy.mockResolvedValue({ PolicyId: 1 });
      mockCamClient.AttachRolePolicy.mockRejectedValue(new Error('NoCodeError'));

      await expect(
        operations.createRole('attach-no-code-role', ['scf.tencentcloud.com']),
      ).rejects.toThrow('NoCodeError');
    });

    it('should swallow AlreadyExist error when attaching managed policy', async () => {
      mockCamClient.CreateRole.mockResolvedValue({ RoleId: 'role-123' });
      mockCamClient.GetRole.mockResolvedValue({
        RoleInfo: { RoleId: 'role-123', RoleName: 'attach-swallow-role', RoleArn: '' },
      });
      mockCamClient.CreatePolicy.mockResolvedValue({ PolicyId: 1 });
      const attachError = Object.assign(new Error('AlreadyExist'), {
        code: 'InvalidParameter.AttachmentRoleAlreadyExist',
      });
      mockCamClient.AttachRolePolicy.mockRejectedValue(attachError);

      const result = await operations.createRole(
        'attach-swallow-role',
        ['scf.tencentcloud.com'],
        undefined,
        undefined,
        ['QCS::AdministratorAccess'],
      );

      expect(result).toBeDefined();
      expect(mockCamClient.AttachRolePolicy).toHaveBeenCalled();
    });

    it('should handle role already exists error by recovering', async () => {
      const error = Object.assign(new Error('RoleAlreadyExist'), {
        code: 'InvalidParameter.RoleAlreadyExist',
      });
      mockCamClient.CreateRole.mockRejectedValueOnce(error);

      mockCamClient.GetRole.mockResolvedValue({
        RoleInfo: {
          RoleId: 'role-123',
          RoleName: 'scf-execution-role',
          RoleArn: 'arn:tencent:cam::123456789:role/scf-execution-role',
        },
      });
      mockCamClient.CreatePolicy.mockResolvedValue({ PolicyId: 1 });
      mockCamClient.AttachRolePolicy.mockResolvedValue({});

      const result = await operations.createRole('scf-execution-role', ['scf.tencentcloud.com']);

      expect(result.roleName).toBe('scf-execution-role');
      expect(result.roleId).toBe('role-123');
      expect(result.roleArn).toBe('arn:tencent:cam::123456789:role/scf-execution-role');
      expect(mockCamClient.GetRole).toHaveBeenCalled();
    });

    it('should throw on role creation failure for other errors', async () => {
      mockCamClient.CreateRole.mockRejectedValue(new Error('InternalError'));

      await expect(operations.createRole('role', ['scf.tencentcloud.com'])).rejects.toThrow(
        'InternalError',
      );
    });

    it('should handle policy already exists error', async () => {
      mockCamClient.CreateRole.mockResolvedValue({ RoleId: 'role-123' });
      mockCamClient.GetRole.mockResolvedValue({
        RoleInfo: { RoleId: 'role-123', RoleName: 'scf-execution-role', RoleArn: '' },
      });

      const policyError = Object.assign(new Error('PolicyAlreadyExist'), {
        code: 'InvalidParameter.PolicyAlreadyExist',
      });
      mockCamClient.CreatePolicy.mockRejectedValueOnce(policyError);
      mockCamClient.AttachRolePolicy.mockResolvedValue({});

      const result = await operations.createRole('scf-execution-role', ['scf.tencentcloud.com']);

      expect(result).toBeDefined();
      expect(result.policyName).toBe('scf-execution-role-policy');
    });

    it('should throw when CreatePolicy fails with unexpected error', async () => {
      mockCamClient.CreateRole.mockResolvedValue({ RoleId: 'role-123' });
      mockCamClient.GetRole.mockResolvedValue({
        RoleInfo: { RoleId: 'role-123', RoleName: 'create-policy-fail-role', RoleArn: '' },
      });
      const error = Object.assign(new Error('AccessDenied'), { code: 'AccessDenied' });
      mockCamClient.CreatePolicy.mockRejectedValue(error);

      await expect(
        operations.createRole('create-policy-fail-role', ['scf.tencentcloud.com']),
      ).rejects.toThrow('AccessDenied');
    });

    it('should rethrow CreatePolicy error without code property', async () => {
      mockCamClient.CreateRole.mockResolvedValue({ RoleId: 'role-123' });
      mockCamClient.GetRole.mockResolvedValue({
        RoleInfo: { RoleId: 'role-123', RoleName: 'no-code-error-role', RoleArn: '' },
      });
      mockCamClient.CreatePolicy.mockRejectedValue(new Error('PlainErrorNoCode'));

      await expect(
        operations.createRole('no-code-error-role', ['scf.tencentcloud.com']),
      ).rejects.toThrow('PlainErrorNoCode');
    });

    it('should throw on drift recovery failure', async () => {
      const error = Object.assign(new Error('RoleAlreadyExist'), {
        code: 'InvalidParameter.RoleAlreadyExist',
      });
      mockCamClient.CreateRole.mockRejectedValueOnce(error);
      mockCamClient.GetRole.mockRejectedValue(new Error('GetRoleFailed'));

      await expect(
        operations.createRole('scf-execution-role', ['scf.tencentcloud.com']),
      ).rejects.toThrow('TENCENT_CAM_ROLE_DRIFT_RECOVERY_FAILED');
    });

    it('should reattach managed policies during drift recovery', async () => {
      const error = Object.assign(new Error('RoleAlreadyExist'), {
        code: 'InvalidParameter.RoleAlreadyExist',
      });
      mockCamClient.CreateRole.mockRejectedValueOnce(error);
      mockCamClient.GetRole.mockResolvedValue({
        RoleInfo: {
          RoleId: 'role-123',
          RoleName: 'drift-recover-role',
          RoleArn: 'trn:cam::123:role/drift-recover-role',
        },
      });
      mockCamClient.CreatePolicy.mockResolvedValue({ PolicyId: 1 });
      mockCamClient.AttachRolePolicy.mockResolvedValue({});

      const result = await operations.createRole(
        'drift-recover-role',
        ['scf.tencentcloudapi.com'],
        undefined,
        undefined,
        ['QCS::AdministratorAccess'],
      );

      expect(result.roleName).toBe('drift-recover-role');
      expect(result.roleId).toBe('role-123');
      expect(result.roleArn).toBe('trn:cam::123:role/drift-recover-role');
      expect(mockCamClient.AttachRolePolicy).toHaveBeenCalledWith({
        PolicyName: 'QCS::AdministratorAccess',
        AttachRoleName: 'drift-recover-role',
      });
    });

    it('should include custom statements in execution policy', async () => {
      mockCamClient.CreateRole.mockResolvedValue({ RoleId: 'role-123' });
      mockCamClient.GetRole.mockResolvedValue({
        RoleInfo: { RoleId: 'role-123', RoleName: 'custom-stmt-role', RoleArn: '' },
      });
      mockCamClient.CreatePolicy.mockResolvedValue({ PolicyId: 1 });
      mockCamClient.AttachRolePolicy.mockResolvedValue({});

      await operations.createRole('custom-stmt-role', ['scf.tencentcloud.com'], undefined, [
        { effect: 'Allow', actions: ['cos:GetObject'], resources: ['qcs::cos:::*'] },
      ]);

      expect(mockCamClient.CreatePolicy).toHaveBeenCalledWith(
        expect.objectContaining({
          PolicyDocument: expect.stringContaining('cos:GetObject'),
        }),
      );
    });

    it('should include sid in statement when provided', async () => {
      mockCamClient.CreateRole.mockResolvedValue({ RoleId: 'role-sid' });
      mockCamClient.GetRole.mockResolvedValue({
        RoleInfo: { RoleId: 'role-sid', RoleName: 'sid-role', RoleArn: '' },
      });
      mockCamClient.CreatePolicy.mockResolvedValue({ PolicyId: 1 });
      mockCamClient.AttachRolePolicy.mockResolvedValue({});

      await operations.createRole('sid-role', ['scf.tencentcloud.com'], undefined, [
        { sid: 'MyCustomSid', effect: 'Allow', actions: ['scf:*'], resources: ['*'] },
      ]);

      const policyDocCall = mockCamClient.CreatePolicy.mock.calls[0][0];
      const parsedDoc = JSON.parse(policyDocCall.PolicyDocument);
      expect(parsedDoc.Statement).toEqual(
        expect.arrayContaining([expect.objectContaining({ Sid: 'MyCustomSid' })]),
      );
    });
  });

  describe('getRole', () => {
    it('should return role info on success', async () => {
      mockCamClient.GetRole.mockResolvedValue({
        RoleInfo: {
          RoleId: 'role-123',
          RoleName: 'scf-execution-role',
          RoleArn: 'arn:tencent:cam::123456789:role/scf-execution-role',
          Description: 'SCF execution role',
        },
      });

      const result = await operations.getRole('scf-execution-role');

      expect(mockCamClient.GetRole).toHaveBeenCalledWith({ RoleName: 'scf-execution-role' });
      expect(result).toEqual({
        roleName: 'scf-execution-role',
        roleId: 'role-123',
        roleArn: 'arn:tencent:cam::123456789:role/scf-execution-role',
        description: 'SCF execution role',
        policyName: 'scf-execution-role-policy',
      });
    });

    it('should return null when role is not found', async () => {
      const error = Object.assign(new Error('RoleNotExist'), {
        code: 'ResourceNotFound.RoleNotExist',
      });
      mockCamClient.GetRole.mockRejectedValue(error);

      const result = await operations.getRole('nonexistent-role');

      expect(result).toBeNull();
    });

    it('should return null when RoleInfo is empty', async () => {
      mockCamClient.GetRole.mockResolvedValue({});

      const result = await operations.getRole('some-role');

      expect(result).toBeNull();
    });

    it('should throw on unexpected error', async () => {
      mockCamClient.GetRole.mockRejectedValue(new Error('InternalError'));

      await expect(operations.getRole('some-role')).rejects.toThrow('InternalError');
    });
  });

  describe('deleteRole', () => {
    it('should detach managed policies, inline policy, and delete role', async () => {
      mockCamClient.DetachRolePolicy.mockResolvedValue({});
      mockCamClient.ListPolicies.mockResolvedValue({ List: [] });
      mockCamClient.DeleteRole.mockResolvedValue({});

      await operations.deleteRole('test-role', ['QCS::AdministratorAccess']);

      // Should detach managed policy
      expect(mockCamClient.DetachRolePolicy).toHaveBeenCalledWith({
        PolicyName: 'QCS::AdministratorAccess',
        DetachRoleName: 'test-role',
      });
      // Should detach inline policy
      expect(mockCamClient.DetachRolePolicy).toHaveBeenCalledWith({
        PolicyName: 'test-role-policy',
        DetachRoleName: 'test-role',
      });
      // Should delete role
      expect(mockCamClient.DeleteRole).toHaveBeenCalledWith({ RoleName: 'test-role' });
    });

    it('should handle role not found on deletion', async () => {
      mockCamClient.DetachRolePolicy.mockResolvedValue({});
      mockCamClient.ListPolicies.mockResolvedValue({ List: [] });
      const error = Object.assign(new Error('RoleNotExist'), {
        code: 'ResourceNotFound.RoleNotExist',
      });
      mockCamClient.DeleteRole.mockRejectedValue(error);

      await operations.deleteRole('test-role');

      expect(mockCamClient.DetachRolePolicy).toHaveBeenCalled();
    });

    it('should throw on unexpected delete error', async () => {
      mockCamClient.DetachRolePolicy.mockResolvedValue({});
      mockCamClient.ListPolicies.mockResolvedValue({ List: [] });
      mockCamClient.DeleteRole.mockRejectedValue(new Error('DeleteConflict'));

      await expect(operations.deleteRole('test-role')).rejects.toThrow('DeleteConflict');
    });

    it('should handle policy detach idempotently', async () => {
      const error = Object.assign(new Error('PolicyNotAttached'), {
        code: 'ResourceNotFound.PolicyNotAttached',
      });
      mockCamClient.DetachRolePolicy.mockRejectedValue(error);
      mockCamClient.ListPolicies.mockResolvedValue({ List: [] });
      mockCamClient.DeleteRole.mockResolvedValue({});

      await operations.deleteRole('test-role');

      expect(mockCamClient.DeleteRole).toHaveBeenCalled();
    });

    it('should throw on unexpected detach policy error', async () => {
      const error = Object.assign(new Error('AccessDenied'), {
        code: 'AccessDenied',
      });
      mockCamClient.DetachRolePolicy.mockRejectedValue(error);
      mockCamClient.ListPolicies.mockResolvedValue({ List: [] });

      await expect(operations.deleteRole('test-role')).rejects.toThrow('AccessDenied');
      expect(mockCamClient.DeleteRole).not.toHaveBeenCalled();
    });
  });

  describe('updateRolePolicy', () => {
    it('should detach old policy, delete it, create new, and attach', async () => {
      mockCamClient.DetachRolePolicy.mockResolvedValue({});
      mockCamClient.ListPolicies.mockResolvedValue({ List: [] });
      mockCamClient.CreatePolicy.mockResolvedValue({ PolicyId: 2 });
      mockCamClient.AttachRolePolicy.mockResolvedValue({});

      await operations.updateRolePolicy('test-role', [
        { effect: 'Allow', actions: ['cos:PutObject'], resources: ['*'] },
      ]);

      expect(mockCamClient.DetachRolePolicy).toHaveBeenCalledWith({
        PolicyName: 'test-role-policy',
        DetachRoleName: 'test-role',
      });
      expect(mockCamClient.ListPolicies).toHaveBeenCalledWith({
        Keyword: 'test-role-policy',
        Scope: 'Local',
      });
      expect(mockCamClient.CreatePolicy).toHaveBeenCalledWith(
        expect.objectContaining({ PolicyName: 'test-role-policy' }),
      );
      expect(mockCamClient.AttachRolePolicy).toHaveBeenCalledWith({
        PolicyName: 'test-role-policy',
        AttachRoleName: 'test-role',
      });
    });

    it('should handle policy already exists on create', async () => {
      mockCamClient.DetachRolePolicy.mockResolvedValue({});
      mockCamClient.ListPolicies.mockResolvedValue({ List: [] });
      const error = Object.assign(new Error('PolicyAlreadyExist'), {
        code: 'InvalidParameter.PolicyAlreadyExist',
      });
      mockCamClient.CreatePolicy.mockRejectedValue(error);
      mockCamClient.AttachRolePolicy.mockResolvedValue({});

      await operations.updateRolePolicy('test-role');

      expect(mockCamClient.AttachRolePolicy).toHaveBeenCalled();
    });

    it('should delete old policy when found during updateRolePolicy', async () => {
      mockCamClient.DetachRolePolicy.mockResolvedValue({});
      mockCamClient.ListPolicies.mockResolvedValue({
        List: [{ PolicyName: 'test-role-policy', PolicyId: 42 }],
      });
      mockCamClient.CreatePolicy.mockResolvedValue({ PolicyId: 2 });
      mockCamClient.AttachRolePolicy.mockResolvedValue({});

      await operations.updateRolePolicy('test-role');

      expect(mockCamClient.DeletePolicy).toHaveBeenCalledWith({ PolicyId: [42] });
      expect(mockCamClient.CreatePolicy).toHaveBeenCalled();
    });

    it('should rethrow error without code from CreatePolicy in updateRolePolicy', async () => {
      mockCamClient.DetachRolePolicy.mockResolvedValue({});
      mockCamClient.ListPolicies.mockResolvedValue({ List: [] });
      mockCamClient.CreatePolicy.mockRejectedValue(new Error('CreatePolicyFailed'));

      await expect(operations.updateRolePolicy('test-role')).rejects.toThrow('CreatePolicyFailed');
    });
  });

  describe('updateManagedPolicies', () => {
    it('should attach new policies and detach removed ones', async () => {
      mockCamClient.ListAttachedRolePolicies.mockResolvedValue({
        List: [{ PolicyName: 'QCS::ReadOnlyAccess' }, { PolicyName: 'QCS::OldPolicy' }],
      });
      mockCamClient.AttachRolePolicy.mockResolvedValue({});
      mockCamClient.DetachRolePolicy.mockResolvedValue({});

      await operations.updateManagedPolicies('test-role', [
        'QCS::ReadOnlyAccess',
        'QCS::NewPolicy',
      ]);

      // Should detach removed policy
      expect(mockCamClient.DetachRolePolicy).toHaveBeenCalledWith({
        PolicyName: 'QCS::OldPolicy',
        DetachRoleName: 'test-role',
      });
      // Should attach new policy
      expect(mockCamClient.AttachRolePolicy).toHaveBeenCalledWith({
        PolicyName: 'QCS::NewPolicy',
        AttachRoleName: 'test-role',
      });
      // Should NOT detach or re-attach existing one
      expect(mockCamClient.DetachRolePolicy).not.toHaveBeenCalledWith(
        expect.objectContaining({ PolicyName: 'QCS::ReadOnlyAccess' }),
      );
    });

    it('should handle role not found', async () => {
      const error = Object.assign(new Error('RoleNotExist'), {
        code: 'ResourceNotFound.RoleNotExist',
      });
      mockCamClient.ListAttachedRolePolicies.mockRejectedValue(error);

      await operations.updateManagedPolicies('nonexistent-role', ['QCS::Admin']);

      // Should silently return
      expect(mockCamClient.AttachRolePolicy).not.toHaveBeenCalled();
      expect(mockCamClient.DetachRolePolicy).not.toHaveBeenCalled();
    });

    it('should throw on unexpected errors', async () => {
      mockCamClient.ListAttachedRolePolicies.mockRejectedValue(new Error('AccessDenied'));

      await expect(operations.updateManagedPolicies('test-role', ['QCS::Admin'])).rejects.toThrow(
        'AccessDenied',
      );
    });
  });
});
