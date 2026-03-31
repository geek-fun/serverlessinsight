import { createApigwOperations } from '../../../../src/common/volcengineClient/apigwOperations';
import type {
  ApigwGroupConfig,
  ApigwApiConfig,
  ApigwDomainConfig,
} from '../../../../src/common/volcengineClient/types';

describe('apigwOperations', () => {
  let operations: ReturnType<typeof createApigwOperations>;

  beforeEach(() => {
    operations = createApigwOperations(null);
  });

  const mockGroupConfig: ApigwGroupConfig = {
    groupName: 'test-gateway',
    description: 'Test gateway',
    protocol: 'HTTP',
  };

  const mockApiConfig: ApigwApiConfig = {
    gatewayId: 'gateway-123',
    apiName: 'test-api',
    method: 'GET',
    path: '/api/test',
    backendFunctionName: 'test-function',
    backendType: 'veFaaS',
  };

  const mockDomainConfig: ApigwDomainConfig = {
    gatewayId: 'gateway-123',
    domainName: 'api.example.com',
  };

  describe('createGateway', () => {
    it('should throw client not initialized error', async () => {
      await expect(operations.createGateway(mockGroupConfig)).rejects.toThrow(
        'API Gateway client not initialized. Check your credentials.',
      );
    });
  });

  describe('getGateway', () => {
    it('should throw client not initialized error', async () => {
      await expect(operations.getGateway('gateway-id')).rejects.toThrow(
        'API Gateway client not initialized. Check your credentials.',
      );
    });
  });

  describe('findGatewayByName', () => {
    it('should throw client not initialized error', async () => {
      await expect(operations.findGatewayByName('test-gateway')).rejects.toThrow(
        'API Gateway client not initialized. Check your credentials.',
      );
    });
  });

  describe('updateGateway', () => {
    it('should throw client not initialized error', async () => {
      await expect(operations.updateGateway('gateway-id', mockGroupConfig)).rejects.toThrow(
        'API Gateway client not initialized. Check your credentials.',
      );
    });
  });

  describe('deleteGateway', () => {
    it('should throw client not initialized error', async () => {
      await expect(operations.deleteGateway('gateway-id')).rejects.toThrow(
        'API Gateway client not initialized. Check your credentials.',
      );
    });
  });

  describe('createApi', () => {
    it('should throw client not initialized error', async () => {
      await expect(operations.createApi(mockApiConfig)).rejects.toThrow(
        'API Gateway client not initialized. Check your credentials.',
      );
    });
  });

  describe('getApi', () => {
    it('should throw client not initialized error', async () => {
      await expect(operations.getApi('gateway-id', 'api-id')).rejects.toThrow(
        'API Gateway client not initialized. Check your credentials.',
      );
    });
  });

  describe('updateApi', () => {
    it('should throw client not initialized error', async () => {
      await expect(operations.updateApi('api-id', mockApiConfig)).rejects.toThrow(
        'API Gateway client not initialized. Check your credentials.',
      );
    });
  });

  describe('deleteApi', () => {
    it('should throw client not initialized error', async () => {
      await expect(operations.deleteApi('gateway-id', 'api-id')).rejects.toThrow(
        'API Gateway client not initialized. Check your credentials.',
      );
    });
  });

  describe('deployApi', () => {
    it('should throw client not initialized error', async () => {
      await expect(operations.deployApi('gateway-id', 'api-id')).rejects.toThrow(
        'API Gateway client not initialized. Check your credentials.',
      );
    });
  });

  describe('bindDomain', () => {
    it('should throw client not initialized error', async () => {
      await expect(operations.bindDomain(mockDomainConfig)).rejects.toThrow(
        'API Gateway client not initialized. Check your credentials.',
      );
    });
  });

  describe('unbindDomain', () => {
    it('should throw client not initialized error', async () => {
      await expect(operations.unbindDomain('gateway-id', 'api.example.com')).rejects.toThrow(
        'API Gateway client not initialized. Check your credentials.',
      );
    });
  });
});
