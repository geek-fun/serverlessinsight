import { createApigwOperations } from '../../../../src/common/volcengineClient/apigwOperations';
import type { ApigwConfig } from '../../../../src/common/volcengineClient/types';

describe('apigwOperations', () => {
  let operations: ReturnType<typeof createApigwOperations>;

  beforeEach(() => {
    operations = createApigwOperations(null);
  });

  const mockConfig: ApigwConfig = {
    gatewayName: 'test-gateway',
    triggers: [
      {
        method: 'GET',
        path: '/api/test',
        backendFunctionName: 'test-function',
      },
    ],
  };

  describe('createGateway', () => {
    it('should throw not implemented error', async () => {
      await expect(operations.createGateway(mockConfig)).rejects.toThrow(
        'API Gateway operations not yet implemented - Phase 4',
      );
    });
  });

  describe('getGateway', () => {
    it('should throw not implemented error', async () => {
      await expect(operations.getGateway('gateway-id')).rejects.toThrow(
        'API Gateway operations not yet implemented - Phase 4',
      );
    });
  });

  describe('updateGateway', () => {
    it('should throw not implemented error', async () => {
      await expect(operations.updateGateway('gateway-id', mockConfig)).rejects.toThrow(
        'API Gateway operations not yet implemented - Phase 4',
      );
    });
  });

  describe('deleteGateway', () => {
    it('should throw not implemented error', async () => {
      await expect(operations.deleteGateway('gateway-id')).rejects.toThrow(
        'API Gateway operations not yet implemented - Phase 4',
      );
    });
  });
});
