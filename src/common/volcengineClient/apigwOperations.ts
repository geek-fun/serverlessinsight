import type { ApigwConfig, ApigwInfo } from './types';

type ApigwSdkClient = unknown;

export const createApigwOperations = (_client: ApigwSdkClient) => ({
  createGateway: async (_config: ApigwConfig): Promise<ApigwInfo> => {
    throw new Error('API Gateway operations not yet implemented - Phase 4');
  },

  getGateway: async (_gatewayId: string): Promise<ApigwInfo | null> => {
    throw new Error('API Gateway operations not yet implemented - Phase 4');
  },

  updateGateway: async (_gatewayId: string, _config: ApigwConfig): Promise<void> => {
    throw new Error('API Gateway operations not yet implemented - Phase 4');
  },

  deleteGateway: async (_gatewayId: string): Promise<void> => {
    throw new Error('API Gateway operations not yet implemented - Phase 4');
  },
});
