import { createIamOperations } from '../../../../src/common/volcengineClient/iamOperations';
import type { IamRoleConfig } from '../../../../src/common/volcengineClient/types';

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
          Principal: { Service: ['vefaas.volcengine.com'] },
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
          },
        },
      });

      const result = await operations.getRole('test-role');

      expect(result?.roleName).toBe('test-role');
    });

    it('should return null when role not found', async () => {
      const notFoundError = new Error('Not found') as Error & { code: string };
      notFoundError.code = 'RoleNotFound';

      mockClient.fetchOpenAPI.mockRejectedValueOnce(notFoundError);

      const result = await operations.getRole('non-existent-role');

      expect(result).toBeNull();
    });
  });

  describe('updateRoleTrustPolicy', () => {
    it('should update trust policy successfully', async () => {
      mockClient.fetchOpenAPI.mockResolvedValueOnce({});

      await operations.updateRoleTrustPolicy('test-role', mockConfig.trustPolicy);

      expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
        expect.objectContaining({
          Action: 'UpdateTrustPolicy',
        }),
      );
    });

    it('should throw error when role not found', async () => {
      const notFoundError = new Error('Not found') as Error & { code: string };
      notFoundError.code = 'RoleNotFound';

      mockClient.fetchOpenAPI.mockRejectedValueOnce(notFoundError);

      await expect(
        operations.updateRoleTrustPolicy('non-existent-role', mockConfig.trustPolicy),
      ).rejects.toThrow();
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

    it('should handle role not found gracefully', async () => {
      const notFoundError = new Error('Not found') as Error & { code: string };
      notFoundError.code = 'RoleNotFound';

      mockClient.fetchOpenAPI.mockRejectedValueOnce({}).mockRejectedValueOnce(notFoundError);

      await operations.deleteRole('non-existent-role');
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

    it('should handle already attached policy', async () => {
      const alreadyAttachedError = new Error('Already attached') as Error & { code: string };
      alreadyAttachedError.code = 'PolicyAlreadyAttached';

      mockClient.fetchOpenAPI.mockRejectedValueOnce(alreadyAttachedError);

      await operations.attachRolePolicy('test-role', 'test-policy', 'Custom');
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
  });
});
