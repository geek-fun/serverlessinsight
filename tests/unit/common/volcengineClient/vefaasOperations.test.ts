import { createVefaasOperations } from '../../../../src/common/volcengineClient/vefaasOperations';
import type { VefaasFunctionConfig } from '../../../../src/common/volcengineClient/types';

describe('vefaasOperations', () => {
  let operations: ReturnType<typeof createVefaasOperations>;

  beforeEach(() => {
    operations = createVefaasOperations(null);
  });

  const mockConfig: VefaasFunctionConfig = {
    functionName: 'test-function',
    runtime: 'nodejs/v18',
    handler: 'index.handler',
    memoryMb: 512,
    requestTimeout: 30,
  };

  describe('createFunction', () => {
    it('should throw not implemented error', async () => {
      await expect(operations.createFunction(mockConfig, 'base64code')).rejects.toThrow(
        'veFaaS operations not yet implemented - Phase 2',
      );
    });
  });

  describe('getFunction', () => {
    it('should throw not implemented error', async () => {
      await expect(operations.getFunction('test-function')).rejects.toThrow(
        'veFaaS operations not yet implemented - Phase 2',
      );
    });
  });

  describe('updateFunctionConfiguration', () => {
    it('should throw not implemented error', async () => {
      await expect(operations.updateFunctionConfiguration(mockConfig)).rejects.toThrow(
        'veFaaS operations not yet implemented - Phase 2',
      );
    });
  });

  describe('updateFunctionCode', () => {
    it('should throw not implemented error', async () => {
      await expect(operations.updateFunctionCode('test-function', 'base64code')).rejects.toThrow(
        'veFaaS operations not yet implemented - Phase 2',
      );
    });
  });

  describe('deleteFunction', () => {
    it('should throw not implemented error', async () => {
      await expect(operations.deleteFunction('test-function')).rejects.toThrow(
        'veFaaS operations not yet implemented - Phase 2',
      );
    });
  });

  describe('listFunctions', () => {
    it('should throw not implemented error', async () => {
      await expect(operations.listFunctions()).rejects.toThrow(
        'veFaaS operations not yet implemented - Phase 2',
      );
    });
  });
});
