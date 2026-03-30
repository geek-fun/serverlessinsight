import { createIamOperations } from '../../../../src/common/volcengineClient/iamOperations';
import type { IamRoleConfig } from '../../../../src/common/volcengineClient/types';

describe('iamOperations', () => {
  let operations: ReturnType<typeof createIamOperations>;

  beforeEach(() => {
    operations = createIamOperations(null);
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
    it('should throw not implemented error', async () => {
      await expect(operations.createRole(mockConfig)).rejects.toThrow(
        'IAM operations not yet implemented - Phase 5',
      );
    });
  });

  describe('getRole', () => {
    it('should throw not implemented error', async () => {
      await expect(operations.getRole('test-role')).rejects.toThrow(
        'IAM operations not yet implemented - Phase 5',
      );
    });
  });

  describe('updateRoleTrustPolicy', () => {
    it('should throw not implemented error', async () => {
      await expect(
        operations.updateRoleTrustPolicy('test-role', mockConfig.trustPolicy),
      ).rejects.toThrow('IAM operations not yet implemented - Phase 5');
    });
  });

  describe('deleteRole', () => {
    it('should throw not implemented error', async () => {
      await expect(operations.deleteRole('test-role')).rejects.toThrow(
        'IAM operations not yet implemented - Phase 5',
      );
    });
  });
});
