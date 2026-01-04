import {
  eventToApigwGroupConfig,
  triggerToApigwApiConfig,
  extractApigwGroupDefinition,
  extractApigwApiDefinition,
  extractApigwDeploymentDefinition,
} from '../../../src/stack/aliyunStack/apigwTypes';
import { EventDomain, EventTypes } from '../../../src/types';

describe('Apigw Types', () => {
  const testEvent: EventDomain = {
    key: 'test_api',
    name: 'Test API Gateway',
    type: EventTypes.API_GATEWAY,
    triggers: [
      {
        method: 'GET',
        path: '/users',
        backend: 'userFunction',
      },
      {
        method: 'POST',
        path: '/users',
        backend: 'createUserFunction',
      },
    ],
    domain: {
      domain_name: 'api.example.com',
      certificate_name: 'test-cert',
    },
  };

  describe('eventToApigwGroupConfig', () => {
    it('should convert EventDomain to ApigwGroupConfig', () => {
      const config = eventToApigwGroupConfig(testEvent, 'my-service');

      expect(config.groupName).toBe('my-service-agw-group');
      expect(config.description).toBe('API Gateway group for my-service');
    });

    it('should handle service names with underscores', () => {
      const config = eventToApigwGroupConfig(testEvent, 'my_test_service');

      expect(config.groupName).toBe('my-test-service-agw-group');
    });
  });

  describe('triggerToApigwApiConfig', () => {
    it('should convert trigger to ApigwApiConfig', () => {
      const config = triggerToApigwApiConfig(
        testEvent,
        testEvent.triggers[0],
        'group-123',
        'my-service',
        'cn-hangzhou',
        'acs:ram::123456:role/fc-access-role',
      );

      expect(config.groupId).toBe('group-123');
      expect(config.apiName).toBe('Test API Gateway-agw-api-GET-users');
      expect(config.visibility).toBe('PRIVATE');
      expect(config.authType).toBe('ANONYMOUS');
      expect(config.requestConfig.requestHttpMethod).toBe('GET');
      expect(config.requestConfig.requestPath).toBe('/users');
      expect(config.requestConfig.requestMode).toBe('PASSTHROUGH');
      expect(config.serviceConfig.serviceProtocol).toBe('FunctionCompute');
      expect(config.serviceConfig.functionComputeConfig?.functionName).toBe('userFunction');
      expect(config.serviceConfig.functionComputeConfig?.fcRegionId).toBe('cn-hangzhou');
      expect(config.serviceConfig.functionComputeConfig?.roleArn).toBe(
        'acs:ram::123456:role/fc-access-role',
      );
    });

    it('should handle POST trigger', () => {
      const config = triggerToApigwApiConfig(
        testEvent,
        testEvent.triggers[1],
        'group-123',
        'my-service',
        'cn-hangzhou',
        undefined,
      );

      expect(config.requestConfig.requestHttpMethod).toBe('POST');
      expect(config.requestConfig.requestPath).toBe('/users');
      expect(config.serviceConfig.functionComputeConfig?.functionName).toBe('createUserFunction');
    });
  });

  describe('extractApigwGroupDefinition', () => {
    it('should extract definition from group config', () => {
      const config = {
        groupName: 'my-api-group',
        description: 'Test API group',
        basePath: '/api/v1',
      };

      const definition = extractApigwGroupDefinition(config);

      expect(definition).toEqual({
        groupName: 'my-api-group',
        description: 'Test API group',
        basePath: '/api/v1',
      });
    });

    it('should set null for optional fields when not provided', () => {
      const config = {
        groupName: 'my-api-group',
      };

      const definition = extractApigwGroupDefinition(config);

      expect(definition).toEqual({
        groupName: 'my-api-group',
        description: null,
        basePath: null,
      });
    });
  });

  describe('extractApigwApiDefinition', () => {
    it('should extract definition from API config', () => {
      const config = {
        groupId: 'group-123',
        apiName: 'test-api',
        visibility: 'PRIVATE' as const,
        authType: 'ANONYMOUS' as const,
        requestConfig: {
          requestProtocol: 'HTTP' as const,
          requestHttpMethod: 'GET',
          requestPath: '/users',
          requestMode: 'PASSTHROUGH' as const,
        },
        serviceConfig: {
          serviceProtocol: 'FunctionCompute' as const,
          functionComputeConfig: {
            fcRegionId: 'cn-hangzhou',
            functionName: 'userFunction',
          },
        },
        resultType: 'JSON' as const,
      };

      const definition = extractApigwApiDefinition(config);

      expect(definition.apiName).toBe('test-api');
      expect(definition.groupId).toBe('group-123');
      expect(definition.visibility).toBe('PRIVATE');
      expect(definition.authType).toBe('ANONYMOUS');
      expect(definition.requestConfig).toEqual(config.requestConfig);
    });
  });

  describe('extractApigwDeploymentDefinition', () => {
    it('should extract definition from deployment config', () => {
      const config = {
        groupId: 'group-123',
        apiId: 'api-456',
        stageName: 'RELEASE' as const,
        description: 'Test deployment',
      };

      const definition = extractApigwDeploymentDefinition(config);

      expect(definition).toEqual({
        groupId: 'group-123',
        apiId: 'api-456',
        stageName: 'RELEASE',
      });
    });
  });
});
