import type { VefaasFunctionConfig, VefaasFunctionInfo } from './types';

type VefaasSdkClient = unknown;

export const createVefaasOperations = (_client: VefaasSdkClient) => ({
  createFunction: async (_config: VefaasFunctionConfig, _codeBase64: string): Promise<void> => {
    throw new Error('veFaaS operations not yet implemented - Phase 2');
  },

  getFunction: async (_functionName: string): Promise<VefaasFunctionInfo | null> => {
    throw new Error('veFaaS operations not yet implemented - Phase 2');
  },

  updateFunctionConfiguration: async (_config: VefaasFunctionConfig): Promise<void> => {
    throw new Error('veFaaS operations not yet implemented - Phase 2');
  },

  updateFunctionCode: async (_functionName: string, _codeBase64: string): Promise<void> => {
    throw new Error('veFaaS operations not yet implemented - Phase 2');
  },

  deleteFunction: async (_functionName: string): Promise<void> => {
    throw new Error('veFaaS operations not yet implemented - Phase 2');
  },

  listFunctions: async (): Promise<VefaasFunctionInfo[]> => {
    throw new Error('veFaaS operations not yet implemented - Phase 2');
  },
});
