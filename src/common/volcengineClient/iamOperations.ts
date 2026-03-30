import type { IamRoleConfig, IamRoleInfo } from './types';

type IamSdkClient = unknown;

export const createIamOperations = (_client: IamSdkClient) => ({
  createRole: async (_config: IamRoleConfig): Promise<IamRoleInfo> => {
    throw new Error('IAM operations not yet implemented - Phase 5');
  },

  getRole: async (_roleName: string): Promise<IamRoleInfo | null> => {
    throw new Error('IAM operations not yet implemented - Phase 5');
  },

  updateRoleTrustPolicy: async (
    _roleName: string,
    _policy: IamRoleConfig['trustPolicy'],
  ): Promise<void> => {
    throw new Error('IAM operations not yet implemented - Phase 5');
  },

  deleteRole: async (_roleName: string): Promise<void> => {
    throw new Error('IAM operations not yet implemented - Phase 5');
  },
});
