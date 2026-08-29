import { createIamOperations } from '../../../../src/common/volcengineClient/iamOperations';
import type { IamRoleConfig } from '../../../../src/common/volcengineClient/types';
import type { IamStatement } from '../../../../src/common/iamStatements';

type MockFetchOpenAPI = jest.Mock;

const createMockClient = () => ({
  fetchOpenAPI: jest.fn() as MockFetchOpenAPI,
});

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
    __: (key: string) => key,
  },
}));

describe('iamOperations', () => {
  let operations: ReturnType<typeof createIamOperations>;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    mockClient = createMockClient();
    operations = createIamOperations(
      mockClient as unknown as Parameters<typeof createIamOperations>[0],
    );
    jest.clearAllMocks();
  });

  const mockConfig: IamRoleConfig = {
    roleName: 'test-role',
    displayName: 'Test Role',
    trustPolicy: {
      Statement: [
        {
          Effect: 'Allow',
          Action: ['sts:AssumeRole'],
          Principal: { Service: ['vefaas'] },
        },
      ],
    },
  };

  describe('createRole', () => {
    it('should create role successfully', async () => {
      mockClient.fetchOpenAPI
        .mockResolvedValueOnce({
          Result: {
            Role: {
              RoleName: 'test-role',
              RoleId: 'role-123',
              TRN: 'trn:iam::123456:role/test-role',
              Description: 'Test role',
              CreateTime: '2024-01-01T00:00:00Z',
              MaxSessionDuration: 3600,
            },
          },
        })
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({});

      const result = await operations.createRole(mockConfig);

      expect(result.roleName).toBe('test-role');
      expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
        expect.objectContaining({
          Action: 'CreateRole',
        }),
      );
    });

    it('should handle existing role and update trust policy', async () => {
      const existingError = new Error('Role exists') as Error & { code: string };
      existingError.code = 'RoleAlreadyExists';

      mockClient.fetchOpenAPI
        .mockRejectedValueOnce(existingError)
        .mockResolvedValueOnce({
          Result: {
            Role: {
              RoleName: 'test-role',
              RoleId: 'role-123',
              TRN: 'trn:iam::123456:role/test-role',
            },
          },
        })
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({});

      const result = await operations.createRole(mockConfig);

      expect(result.roleName).toBe('test-role');
    });

    it('rebuilds the policy with baseline and custom statements in the RoleAlreadyExists recovery', async () => {
      const existingError = new Error('Role exists') as Error & { code: string };
      existingError.code = 'RoleAlreadyExists';

      mockClient.fetchOpenAPI
        .mockRejectedValueOnce(existingError)
        .mockResolvedValueOnce({
          Result: {
            Role: {
              RoleName: 'test-role',
              RoleId: 'role-123',
              TRN: 'trn:iam::123456:role/test-role',
            },
          },
        })
        .mockResolvedValue({})
        .mockResolvedValue({})
        .mockResolvedValue({});

      await operations.createRole({
        ...mockConfig,
        executionStatements: [{ effect: 'Allow', action: ['vefaas:*'], resource: ['*'] }],
        customStatements: [
          { effect: 'Allow', action: ['oss:GetObject'], resource: ['trn:tos:::my-bucket/*'] },
        ],
      });

      const createPolicyCall = mockClient.fetchOpenAPI.mock.calls.find(
        (call) => call[0]?.Action === 'CreatePolicy',
      );
      expect(createPolicyCall).toBeDefined();
      const policyDocument = JSON.parse(createPolicyCall![0].query.PolicyDocument) as {
        Statement: Array<{ Action: string[] }>;
      };
      const actions = policyDocument.Statement.flatMap((statement) => statement.Action);
      expect(actions).toContain('vefaas:*');
      expect(actions).toContain('oss:GetObject');
    });

    it('should handle existing role with Conflict code', async () => {
      const conflictError = new Error('Conflict') as Error & { code: string };
      conflictError.code = 'Conflict';

      mockClient.fetchOpenAPI
        .mockRejectedValueOnce(conflictError)
        .mockResolvedValueOnce({
          Result: {
            Role: {
              RoleName: 'test-role',
              RoleId: 'role-123',
              TRN: 'trn:iam::123456:role/test-role',
            },
          },
        })
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({});

      const result = await operations.createRole(mockConfig);

      expect(result.roleName).toBe('test-role');
    });

    it('should throw recovery error when drift recovery fails', async () => {
      const existingError = new Error('Role exists') as Error & { code: string };
      existingError.code = 'RoleAlreadyExists';

      const recoveryError = new Error('Recovery failed') as Error & { code: string };
      recoveryError.code = 'AccessDenied';

      mockClient.fetchOpenAPI
        .mockRejectedValueOnce(existingError)
        .mockRejectedValueOnce(recoveryError);

      await expect(operations.createRole(mockConfig)).rejects.toThrow();
    });

    it('should rethrow non-role-exists errors', async () => {
      const accessDeniedError = new Error('Access denied') as Error & { code: string };
      accessDeniedError.code = 'AccessDenied';

      mockClient.fetchOpenAPI.mockRejectedValueOnce(accessDeniedError);

      await expect(operations.createRole(mockConfig)).rejects.toThrow('Access denied');
    });

    it('should handle policy already exists error', async () => {
      const policyExistsError = new Error('Policy exists') as Error & { code: string };
      policyExistsError.code = 'PolicyAlreadyExists';

      mockClient.fetchOpenAPI
        .mockResolvedValueOnce({
          Result: {
            Role: {
              RoleName: 'test-role',
              RoleId: 'role-123',
            },
          },
        })
        .mockRejectedValueOnce(policyExistsError)
        .mockResolvedValueOnce({});

      const result = await operations.createRole(mockConfig);

      expect(result.roleName).toBe('test-role');
    });

    it('should handle policy conflict error', async () => {
      const conflictError = new Error('Conflict') as Error & { code: string };
      conflictError.code = 'Conflict';

      mockClient.fetchOpenAPI
        .mockResolvedValueOnce({
          Result: {
            Role: {
              RoleName: 'test-role',
              RoleId: 'role-123',
            },
          },
        })
        .mockRejectedValueOnce(conflictError)
        .mockResolvedValueOnce({});

      const result = await operations.createRole(mockConfig);

      expect(result.roleName).toBe('test-role');
    });

    it('should handle policy already attached error', async () => {
      const alreadyAttachedError = new Error('Already attached') as Error & { code: string };
      alreadyAttachedError.code = 'PolicyAlreadyAttached';

      mockClient.fetchOpenAPI
        .mockResolvedValueOnce({
          Result: {
            Role: {
              RoleName: 'test-role',
              RoleId: 'role-123',
            },
          },
        })
        .mockResolvedValueOnce({})
        .mockRejectedValueOnce(alreadyAttachedError);

      const result = await operations.createRole(mockConfig);

      expect(result.roleName).toBe('test-role');
    });

    it('should rethrow policy creation errors that are not already-exists', async () => {
      const policyError = new Error('Policy error') as Error & { code: string };
      policyError.code = 'InvalidPolicyName';

      mockClient.fetchOpenAPI
        .mockResolvedValueOnce({
          Result: {
            Role: {
              RoleName: 'test-role',
            },
          },
        })
        .mockRejectedValueOnce(policyError);

      await expect(operations.createRole(mockConfig)).rejects.toThrow('Policy error');
    });

    it('should rethrow policy attach errors that are not already-attached', async () => {
      const attachError = new Error('Attach error') as Error & { code: string };
      attachError.code = 'InvalidRoleName';

      mockClient.fetchOpenAPI
        .mockResolvedValueOnce({
          Result: {
            Role: {
              RoleName: 'test-role',
            },
          },
        })
        .mockResolvedValueOnce({})
        .mockRejectedValueOnce(attachError);

      await expect(operations.createRole(mockConfig)).rejects.toThrow('Attach error');
    });
  });

  describe('getRole', () => {
    it('should return role info when found', async () => {
      mockClient.fetchOpenAPI.mockResolvedValueOnce({
        Result: {
          Role: {
            RoleName: 'test-role',
            RoleId: 'role-123',
            TRN: 'trn:iam::123456:role/test-role',
            Description: 'Test role',
            CreateTime: '2024-01-01T00:00:00Z',
            TrustPolicyDocument: '{"Statement":[]}',
            MaxSessionDuration: 3600,
          },
        },
      });

      const result = await operations.getRole('test-role');

      expect(result?.roleName).toBe('test-role');
      expect(result?.trustPolicyDocument).toBe('{"Statement":[]}');
      expect(result?.policyName).toBe('test-role-policy');
    });

    it('should return null when role not found with RoleNotFound code', async () => {
      const notFoundError = new Error('Not found') as Error & { code: string };
      notFoundError.code = 'RoleNotFound';

      mockClient.fetchOpenAPI.mockRejectedValueOnce(notFoundError);

      const result = await operations.getRole('non-existent-role');

      expect(result).toBeNull();
    });

    it('should return null when role not found with NoSuchEntity code', async () => {
      const notFoundError = new Error('Not found') as Error & { code: string };
      notFoundError.code = 'NoSuchEntity';

      mockClient.fetchOpenAPI.mockRejectedValueOnce(notFoundError);

      const result = await operations.getRole('non-existent-role');

      expect(result).toBeNull();
    });

    it('should return null when role data is missing', async () => {
      mockClient.fetchOpenAPI.mockResolvedValueOnce({
        Result: {},
      });

      const result = await operations.getRole('test-role');

      expect(result).toBeNull();
    });

    it('should rethrow non-not-found errors', async () => {
      const accessDeniedError = new Error('Access denied') as Error & { code: string };
      accessDeniedError.code = 'AccessDenied';

      mockClient.fetchOpenAPI.mockRejectedValueOnce(accessDeniedError);

      await expect(operations.getRole('test-role')).rejects.toThrow('Access denied');
    });
  });

  describe('updateRoleTrustPolicy', () => {
    it('should update trust policy successfully', async () => {
      mockClient.fetchOpenAPI.mockResolvedValueOnce({});

      await operations.updateRoleTrustPolicy('test-role', mockConfig.trustPolicy);

      expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
        expect.objectContaining({
          Action: 'UpdateRole',
        }),
      );
    });

    it('should throw error when role not found with RoleNotFound code', async () => {
      const notFoundError = new Error('Not found') as Error & { code: string };
      notFoundError.code = 'RoleNotFound';

      mockClient.fetchOpenAPI.mockRejectedValueOnce(notFoundError);

      await expect(
        operations.updateRoleTrustPolicy('non-existent-role', mockConfig.trustPolicy),
      ).rejects.toThrow();
    });

    it('should throw error when role not found with NoSuchEntity code', async () => {
      const notFoundError = new Error('Not found') as Error & { code: string };
      notFoundError.code = 'NoSuchEntity';

      mockClient.fetchOpenAPI.mockRejectedValueOnce(notFoundError);

      await expect(
        operations.updateRoleTrustPolicy('non-existent-role', mockConfig.trustPolicy),
      ).rejects.toThrow();
    });

    it('should rethrow non-not-found errors', async () => {
      const accessDeniedError = new Error('Access denied') as Error & { code: string };
      accessDeniedError.code = 'AccessDenied';

      mockClient.fetchOpenAPI.mockRejectedValueOnce(accessDeniedError);

      await expect(
        operations.updateRoleTrustPolicy('test-role', mockConfig.trustPolicy),
      ).rejects.toThrow('Access denied');
    });
  });

  describe('deleteRole', () => {
    it('should delete role successfully', async () => {
      mockClient.fetchOpenAPI.mockResolvedValue({});

      await operations.deleteRole('test-role');

      expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
        expect.objectContaining({
          Action: 'DeleteRole',
        }),
      );
    });

    it('should handle role not found with RoleNotFound code', async () => {
      const notFoundError = new Error('Not found') as Error & { code: string };
      notFoundError.code = 'RoleNotFound';

      mockClient.fetchOpenAPI
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({})
        .mockRejectedValueOnce(notFoundError);

      await operations.deleteRole('non-existent-role');
    });

    it('should handle role not found with NoSuchEntity code', async () => {
      const notFoundError = new Error('Not found') as Error & { code: string };
      notFoundError.code = 'NoSuchEntity';

      mockClient.fetchOpenAPI
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({})
        .mockRejectedValueOnce(notFoundError);

      await operations.deleteRole('non-existent-role');
    });

    it('should rethrow non-not-found errors', async () => {
      const accessDeniedError = new Error('Access denied') as Error & { code: string };
      accessDeniedError.code = 'AccessDenied';

      mockClient.fetchOpenAPI
        .mockResolvedValueOnce({ Result: { AttachedPolicyMetadata: [] } })
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({})
        .mockRejectedValueOnce(accessDeniedError);

      await expect(operations.deleteRole('test-role')).rejects.toThrow('Access denied');
    });
  });

  describe('attachRolePolicy', () => {
    it('should attach policy successfully', async () => {
      mockClient.fetchOpenAPI.mockResolvedValueOnce({});

      await operations.attachRolePolicy('test-role', 'test-policy', 'Custom');

      expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
        expect.objectContaining({
          Action: 'AttachRolePolicy',
        }),
      );
    });

    it('should handle already attached policy with PolicyAlreadyAttached code', async () => {
      const alreadyAttachedError = new Error('Already attached') as Error & { code: string };
      alreadyAttachedError.code = 'PolicyAlreadyAttached';

      mockClient.fetchOpenAPI.mockRejectedValueOnce(alreadyAttachedError);

      await operations.attachRolePolicy('test-role', 'test-policy', 'Custom');
    });

    it('should handle already attached policy with Conflict code', async () => {
      const conflictError = new Error('Conflict') as Error & { code: string };
      conflictError.code = 'Conflict';

      mockClient.fetchOpenAPI.mockRejectedValueOnce(conflictError);

      await operations.attachRolePolicy('test-role', 'test-policy', 'Custom');
    });

    it('should rethrow non-already-attached errors', async () => {
      const accessDeniedError = new Error('Access denied') as Error & { code: string };
      accessDeniedError.code = 'AccessDenied';

      mockClient.fetchOpenAPI.mockRejectedValueOnce(accessDeniedError);

      await expect(
        operations.attachRolePolicy('test-role', 'test-policy', 'Custom'),
      ).rejects.toThrow('Access denied');
    });
  });

  describe('detachRolePolicy', () => {
    it('should detach policy successfully', async () => {
      mockClient.fetchOpenAPI.mockResolvedValueOnce({});

      await operations.detachRolePolicy('test-role', 'test-policy');

      expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
        expect.objectContaining({
          Action: 'DetachRolePolicy',
        }),
      );
    });

    it('should handle errors silently', async () => {
      const error = new Error('Not attached') as Error & { code: string };
      error.code = 'PolicyNotAttached';

      mockClient.fetchOpenAPI.mockRejectedValueOnce(error);

      await operations.detachRolePolicy('test-role', 'test-policy');
    });

    it('should warn when detach fails with non-recoverable error', async () => {
      const error = new Error('Access denied') as Error & { code: string };
      error.code = 'AccessDenied';

      mockClient.fetchOpenAPI.mockRejectedValueOnce(error);

      const { logger } = jest.requireMock('../../../../src/common/logger');

      await operations.detachRolePolicy('test-role', 'test-policy');

      expect(logger.warn).toHaveBeenCalled();
    });
  });

  describe('createRole - managed policies', () => {
    it('should attach managed policies when managedPolicies is provided', async () => {
      const configWithManaged: IamRoleConfig = {
        ...mockConfig,
        managedPolicies: ['arn:policy:one', 'arn:policy:two'],
      };

      mockClient.fetchOpenAPI
        .mockResolvedValueOnce({
          Result: {
            Role: {
              RoleName: 'test-role',
              RoleId: 'role-123',
              TRN: 'trn:iam::123456:role/test-role',
              Description: 'Test role',
              CreateTime: '2024-01-01T00:00:00Z',
              MaxSessionDuration: 3600,
            },
          },
        })
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({});

      const result = await operations.createRole(configWithManaged);

      expect(result.roleName).toBe('test-role');
      expect(result.managedPolicies).toEqual(['arn:policy:one', 'arn:policy:two']);

      expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
        expect.objectContaining({
          Action: 'AttachRolePolicy',
          query: expect.objectContaining({
            PolicyName: 'arn:policy:one',
            PolicyType: 'System',
          }),
        }),
      );
      expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
        expect.objectContaining({
          Action: 'AttachRolePolicy',
          query: expect.objectContaining({
            PolicyName: 'arn:policy:two',
            PolicyType: 'System',
          }),
        }),
      );
    });

    it('should attach managed policies in RoleAlreadyExists branch', async () => {
      const configWithManaged: IamRoleConfig = {
        ...mockConfig,
        managedPolicies: ['arn:policy:one'],
      };

      const existingError = new Error('Role exists') as Error & { code: string };
      existingError.code = 'RoleAlreadyExists';

      mockClient.fetchOpenAPI
        .mockRejectedValueOnce(existingError)
        .mockResolvedValueOnce({
          Result: {
            Role: {
              RoleName: 'test-role',
              RoleId: 'role-123',
            },
          },
        })
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({});

      const result = await operations.createRole(configWithManaged);

      expect(result.roleName).toBe('test-role');
      expect(result.managedPolicies).toEqual(['arn:policy:one']);
      expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
        expect.objectContaining({
          Action: 'AttachRolePolicy',
          query: expect.objectContaining({
            PolicyName: 'arn:policy:one',
            PolicyType: 'System',
          }),
        }),
      );
    });

    it('should skip managed policy attachment when managedPolicies is empty', async () => {
      const configNoManaged: IamRoleConfig = {
        ...mockConfig,
        managedPolicies: [],
      };

      mockClient.fetchOpenAPI
        .mockResolvedValueOnce({
          Result: {
            Role: {
              RoleName: 'test-role',
              RoleId: 'role-123',
            },
          },
        })
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({});

      const result = await operations.createRole(configNoManaged);

      expect(result.roleName).toBe('test-role');
      expect(result.managedPolicies).toEqual([]);
      // Only 3 calls: CreateRole, CreatePolicy, AttachRolePolicy (inline)
      expect(mockClient.fetchOpenAPI).toHaveBeenCalledTimes(3);
    });
  });

  describe('deleteRole - managed policies', () => {
    it('should detach managed policies before deleting role', async () => {
      mockClient.fetchOpenAPI
        .mockResolvedValueOnce({
          Result: {
            AttachedPolicyMetadata: [
              { PolicyName: 'arn:policy:one' },
              { PolicyName: 'arn:policy:two' },
            ],
          },
        })
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({});

      await operations.deleteRole('test-role');

      // 1st call: ListAttachedRolePolicies
      expect(mockClient.fetchOpenAPI).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({ Action: 'ListAttachedRolePolicies' }),
      );
      // 2nd call: DetachRolePolicy for managed policy one (System)
      expect(mockClient.fetchOpenAPI).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          Action: 'DetachRolePolicy',
          query: expect.objectContaining({
            PolicyName: 'arn:policy:one',
            PolicyType: 'System',
          }),
        }),
      );
      // 3rd call: DetachRolePolicy for managed policy two (System)
      expect(mockClient.fetchOpenAPI).toHaveBeenNthCalledWith(
        3,
        expect.objectContaining({
          Action: 'DetachRolePolicy',
          query: expect.objectContaining({
            PolicyName: 'arn:policy:two',
            PolicyType: 'System',
          }),
        }),
      );
      // 4th call: DetachRolePolicy for custom inline policy (Custom - from detachAndDeletePolicy)
      expect(mockClient.fetchOpenAPI).toHaveBeenNthCalledWith(
        4,
        expect.objectContaining({
          Action: 'DetachRolePolicy',
          query: expect.objectContaining({
            PolicyType: 'Custom',
          }),
        }),
      );
    });

    it('should handle ListAttachedRolePolicies returning empty and still delete role', async () => {
      mockClient.fetchOpenAPI
        .mockResolvedValueOnce({
          Result: {
            AttachedPolicyMetadata: [],
          },
        })
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({});

      await operations.deleteRole('test-role');

      expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
        expect.objectContaining({ Action: 'DeleteRole' }),
      );
    });
  });

  describe('listAttachedRolePolicies', () => {
    it('should return policy names from API response', async () => {
      mockClient.fetchOpenAPI.mockResolvedValueOnce({
        Result: {
          AttachedPolicyMetadata: [
            { PolicyName: 'arn:policy:one' },
            { PolicyName: 'arn:policy:two' },
          ],
        },
      });

      const result = await operations.listAttachedRolePolicies('test-role');

      expect(result).toEqual(['arn:policy:one', 'arn:policy:two']);
      expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
        expect.objectContaining({ Action: 'ListAttachedRolePolicies' }),
      );
    });

    it('should return empty array when no policies attached', async () => {
      mockClient.fetchOpenAPI.mockResolvedValueOnce({
        Result: {},
      });

      const result = await operations.listAttachedRolePolicies('test-role');

      expect(result).toEqual([]);
    });

    it('should return empty array on API error', async () => {
      const error = new Error('API error') as Error & { code: string };
      error.code = 'AccessDenied';

      mockClient.fetchOpenAPI.mockRejectedValueOnce(error);

      const result = await operations.listAttachedRolePolicies('test-role');

      expect(result).toEqual([]);
    });
  });

  describe('updateManagedPolicies', () => {
    it('should attach new and detach removed policies', async () => {
      mockClient.fetchOpenAPI
        .mockResolvedValueOnce({
          Result: {
            AttachedPolicyMetadata: [
              { PolicyName: 'arn:policy:a' },
              { PolicyName: 'arn:policy:b' },
            ],
          },
        })
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({});

      await operations.updateManagedPolicies('test-role', ['arn:policy:b', 'arn:policy:c']);

      // 1st: ListAttachedRolePolicies → [a, b]
      // 2nd: DetachRolePolicy for a (removed) - System
      expect(mockClient.fetchOpenAPI).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          Action: 'DetachRolePolicy',
          query: expect.objectContaining({
            PolicyName: 'arn:policy:a',
            PolicyType: 'System',
          }),
        }),
      );
      // 3rd: AttachRolePolicy for c (new) - System
      expect(mockClient.fetchOpenAPI).toHaveBeenNthCalledWith(
        3,
        expect.objectContaining({
          Action: 'AttachRolePolicy',
          query: expect.objectContaining({
            PolicyName: 'arn:policy:c',
            PolicyType: 'System',
          }),
        }),
      );
    });

    it('should do nothing when current and desired are identical', async () => {
      mockClient.fetchOpenAPI.mockResolvedValueOnce({
        Result: {
          AttachedPolicyMetadata: [{ PolicyName: 'arn:policy:a' }, { PolicyName: 'arn:policy:b' }],
        },
      });

      await operations.updateManagedPolicies('test-role', ['arn:policy:a', 'arn:policy:b']);

      // Only 1 call: ListAttachedRolePolicies, no attach/detach needed
      expect(mockClient.fetchOpenAPI).toHaveBeenCalledTimes(1);
    });

    it('should handle empty desired policies by detaching all', async () => {
      mockClient.fetchOpenAPI
        .mockResolvedValueOnce({
          Result: {
            AttachedPolicyMetadata: [
              { PolicyName: 'arn:policy:a' },
              { PolicyName: 'arn:policy:b' },
            ],
          },
        })
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({});

      await operations.updateManagedPolicies('test-role', []);

      // 1st: ListAttachedRolePolicies
      // 2nd: DetachRolePolicy for a
      // 3rd: DetachRolePolicy for b
      expect(mockClient.fetchOpenAPI).toHaveBeenCalledTimes(3);
      expect(mockClient.fetchOpenAPI).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          Action: 'DetachRolePolicy',
          query: expect.objectContaining({ PolicyName: 'arn:policy:a' }),
        }),
      );
      expect(mockClient.fetchOpenAPI).toHaveBeenNthCalledWith(
        3,
        expect.objectContaining({
          Action: 'DetachRolePolicy',
          query: expect.objectContaining({ PolicyName: 'arn:policy:b' }),
        }),
      );
    });
  });

  describe('createRole - execution statements', () => {
    it('builds the execution policy from executionStatements when provided', async () => {
      const configWithBaseline: IamRoleConfig = {
        ...mockConfig,
        executionStatements: [
          { effect: 'Allow', action: ['vefaas:*'], resource: ['*'] },
          {
            effect: 'Allow',
            action: ['vpc:DescribeVpcs', 'vpc:DescribeSubnets', 'vpc:DescribeSecurityGroups'],
            resource: ['*'],
          },
        ],
        customStatements: [{ effect: 'Allow', action: ['ecs:DescribeInstances'], resource: ['*'] }],
      };

      mockClient.fetchOpenAPI
        .mockResolvedValueOnce({
          Result: { Role: { RoleName: 'test-role', RoleId: 'role-123' } },
        })
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({});

      await operations.createRole(configWithBaseline);

      const createPolicyCall = mockClient.fetchOpenAPI.mock.calls.find(
        ([call]) => call.Action === 'CreatePolicy',
      )?.[0];
      const policyDocument = JSON.parse(createPolicyCall.query.PolicyDocument as string);
      expect(policyDocument.Statement.map((s: { Action: string[] }) => s.Action)).toEqual([
        ['vefaas:*'],
        ['vpc:DescribeVpcs', 'vpc:DescribeSubnets', 'vpc:DescribeSecurityGroups'],
        ['ecs:DescribeInstances'],
      ]);
    });

    it('uses the static execution policy when no executionStatements are provided', async () => {
      mockClient.fetchOpenAPI
        .mockResolvedValueOnce({
          Result: { Role: { RoleName: 'test-role', RoleId: 'role-123' } },
        })
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({});

      await operations.createRole(mockConfig);

      const createPolicyCall = mockClient.fetchOpenAPI.mock.calls.find(
        ([call]) => call.Action === 'CreatePolicy',
      )?.[0];
      const policyDocument = JSON.parse(createPolicyCall.query.PolicyDocument as string);
      expect(policyDocument.Statement).toHaveLength(4);
    });

    it('uses executionStatements in the RoleAlreadyExists recovery branch', async () => {
      const configWithBaseline: IamRoleConfig = {
        ...mockConfig,
        executionStatements: [{ effect: 'Allow', action: ['vefaas:*'], resource: ['*'] }],
      };

      const existingError = new Error('Role exists') as Error & { code: string };
      existingError.code = 'RoleAlreadyExists';

      mockClient.fetchOpenAPI
        .mockRejectedValueOnce(existingError)
        .mockResolvedValueOnce({
          Result: { Role: { RoleName: 'test-role', RoleId: 'role-123' } },
        })
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({});

      await operations.createRole(configWithBaseline);

      const createPolicyCall = mockClient.fetchOpenAPI.mock.calls.find(
        ([call]) => call.Action === 'CreatePolicy',
      )?.[0];
      const policyDocument = JSON.parse(createPolicyCall.query.PolicyDocument as string);
      expect(policyDocument.Statement).toEqual([expect.objectContaining({ Action: ['vefaas:*'] })]);
    });
  });

  describe('updateRolePolicy', () => {
    it('rebuilds the full policy from baseline and custom statements', async () => {
      const baseline: IamStatement[] = [
        { effect: 'Allow', action: ['vefaas:*'], resource: ['*'] },
        {
          effect: 'Allow',
          action: ['vpc:DescribeVpcs', 'vpc:DescribeSubnets', 'vpc:DescribeSecurityGroups'],
          resource: ['*'],
        },
      ];
      const custom: IamStatement[] = [
        { effect: 'Allow', action: ['ecs:DescribeInstances'], resource: ['*'] },
      ];

      mockClient.fetchOpenAPI
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({});

      await operations.updateRolePolicy('test-role', baseline, custom);

      const createPolicyCall = mockClient.fetchOpenAPI.mock.calls.find(
        ([call]) => call.Action === 'CreatePolicy',
      )?.[0];
      const policyDocument = JSON.parse(createPolicyCall.query.PolicyDocument as string);
      expect(policyDocument.Statement).toHaveLength(3);
      expect(policyDocument.Statement.map((s: { Action: string[] }) => s.Action)).toEqual([
        ['vefaas:*'],
        ['vpc:DescribeVpcs', 'vpc:DescribeSubnets', 'vpc:DescribeSecurityGroups'],
        ['ecs:DescribeInstances'],
      ]);
    });
  });

  describe('createRole - non-object error handling', () => {
    it('should rethrow non-object policy creation error', async () => {
      mockClient.fetchOpenAPI
        .mockResolvedValueOnce({
          Result: { Role: { RoleName: 'test-role', RoleId: 'role-123' } },
        })
        .mockRejectedValueOnce('plain string error');

      await expect(operations.createRole(mockConfig)).rejects.toBe('plain string error');
    });

    it('should rethrow non-object policy attach error', async () => {
      mockClient.fetchOpenAPI
        .mockResolvedValueOnce({
          Result: { Role: { RoleName: 'test-role', RoleId: 'role-123' } },
        })
        .mockResolvedValueOnce({})
        .mockRejectedValueOnce('plain string attach error');

      await expect(operations.createRole(mockConfig)).rejects.toBe('plain string attach error');
    });
  });

  describe('tagRole', () => {
    it('tags IAM roles using numbered query parameters', async () => {
      mockClient.fetchOpenAPI.mockResolvedValueOnce({});

      await operations.tagRole('role-a', [
        { key: 'k', value: 'v' },
        { key: 'k2', value: 'v2' },
      ]);

      expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
        expect.objectContaining({
          Action: 'TagResources',
          Version: '2018-01-01',
          method: 'GET',
          query: expect.objectContaining({
            ResourceType: 'role',
            'ResourceIds.1': 'role-a',
            'Tags.1.Key': 'k',
            'Tags.1.Value': 'v',
            'Tags.2.Key': 'k2',
            'Tags.2.Value': 'v2',
          }),
        }),
      );
    });

    it('ignores missing IAM roles during tagging', async () => {
      const notFoundError = new Error('Not found') as Error & { code: string };
      notFoundError.code = 'ResourceNotFound.Role';
      mockClient.fetchOpenAPI.mockRejectedValueOnce(notFoundError);
      const { logger } = jest.requireMock('../../../../src/common/logger');

      await expect(
        operations.tagRole('missing-role', [{ key: 'k', value: 'v' }]),
      ).resolves.toBeUndefined();

      expect(logger.warn).toHaveBeenCalledWith('VOLCENGINE_ROLE_NOT_FOUND_FOR_TAG');
    });

    it('rethrows unexpected IAM tagging failures', async () => {
      const accessDeniedError = new Error('Access denied') as Error & { code: string };
      accessDeniedError.code = 'AccessDenied';
      mockClient.fetchOpenAPI.mockRejectedValueOnce(accessDeniedError);

      await expect(operations.tagRole('role-a', [{ key: 'k', value: 'v' }])).rejects.toBe(
        accessDeniedError,
      );
    });
  });
});
