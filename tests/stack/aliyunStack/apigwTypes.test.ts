import {
  eventToApigwGroupConfig,
  triggerToApigwApiConfig,
  extractApigwGroupDefinition,
  extractApigwApiDefinition,
  extractApigwDeploymentDefinition,
  inferProtocolConfig,
} from '../../../src/stack/aliyunStack/apigwTypes';
import { EventDomain, EventTypes, ServerlessIac } from '../../../src/types';
import { ProviderEnum, setContext, setIac } from '../../../src/common';

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
      certificate_id: 'test-cert-id',
    },
  };

  const mockIac: ServerlessIac = {
    version: '1.0',
    app: 'test-app',
    service: 'test-service',
    provider: {
      name: ProviderEnum.ALIYUN,
      region: 'cn-hangzhou',
    },
    functions: [
      {
        key: 'userFunc',
        name: 'userFunction',
        code: {
          runtime: 'nodejs20',
          handler: 'index.handler',
          path: 'test.zip',
        },
        memory: 512,
        timeout: 10,
        storage: {},
      },
      {
        key: 'createUserFunc',
        name: 'createUserFunction',
        code: {
          runtime: 'nodejs20',
          handler: 'index.handler',
          path: 'test.zip',
        },
        memory: 512,
        timeout: 10,
        storage: {},
      },
    ],
  };

  beforeEach(async () => {
    // Set up context and IAC before each test
    await setContext({
      app: 'test-app',
      service: 'test-service',
      region: 'cn-hangzhou',
      provider: ProviderEnum.ALIYUN,
      location: 'tests/fixtures/serverless-insight.yml', // Use fixture file
    });
    setIac(mockIac);
  });

  describe('eventToApigwGroupConfig', () => {
    it('should convert EventDomain to ApigwGroupConfig', () => {
      const config = eventToApigwGroupConfig(testEvent, 'my-service', 'default');

      expect(config.groupName).toBe('my-service-default-agw-group');
      expect(config.description).toBe('API Gateway group for my-service');
    });

    it('should handle service names with underscores', () => {
      const config = eventToApigwGroupConfig(testEvent, 'my_test_service', 'default');

      expect(config.groupName).toBe('my-test-service-default-agw-group');
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
        'default',
        'acs:ram::123456:role/fc-access-role',
      );

      expect(config.groupId).toBe('group-123');
      expect(config.apiName).toBe('Test API Gateway-default-agw-api-GET-users');
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
        'default',
      );

      expect(config.requestConfig.requestHttpMethod).toBe('POST');
      expect(config.requestConfig.requestPath).toBe('/users');
      expect(config.serviceConfig.functionComputeConfig?.functionName).toBe('createUserFunction');
    });

    it('should set requestProtocol to HTTPS when domain protocol is HTTPS', () => {
      const httpsEvent: EventDomain = {
        ...testEvent,
        domain: { domain_name: 'api.example.com', protocol: 'HTTPS' },
      };
      const config = triggerToApigwApiConfig(
        httpsEvent,
        httpsEvent.triggers[0],
        'group-123',
        'my-service',
        'cn-hangzhou',
        'default',
      );

      expect(config.requestConfig.requestProtocol).toBe('HTTPS');
    });

    it('should set requestProtocol to HTTP,HTTPS when domain protocol is an array', () => {
      const bothEvent: EventDomain = {
        ...testEvent,
        domain: { domain_name: 'api.example.com', protocol: ['HTTP', 'HTTPS'] },
      };
      const config = triggerToApigwApiConfig(
        bothEvent,
        bothEvent.triggers[0],
        'group-123',
        'my-service',
        'cn-hangzhou',
        'default',
      );

      expect(config.requestConfig.requestProtocol).toBe('HTTP,HTTPS');
    });

    it('should default requestProtocol to HTTP when no domain protocol is set', () => {
      const noProtocolEvent: EventDomain = { ...testEvent, domain: undefined };
      const config = triggerToApigwApiConfig(
        noProtocolEvent,
        noProtocolEvent.triggers[0],
        'group-123',
        'my-service',
        'cn-hangzhou',
        'default',
      );

      expect(config.requestConfig.requestProtocol).toBe('HTTP');
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

  describe('inferProtocolConfig', () => {
    it('should default to HTTP with no redirect when protocol is undefined', () => {
      const result = inferProtocolConfig(undefined);
      expect(result.requestProtocol).toBe('HTTP');
      expect(result.isHttpRedirectToHttps).toBeUndefined();
    });

    it('should return HTTPS with redirect=true when protocol is "HTTPS"', () => {
      const result = inferProtocolConfig('HTTPS');
      expect(result.requestProtocol).toBe('HTTPS');
      expect(result.isHttpRedirectToHttps).toBe(true);
    });

    it('should return HTTP,HTTPS with redirect=false when protocol is ["HTTP","HTTPS"]', () => {
      const result = inferProtocolConfig(['HTTP', 'HTTPS']);
      expect(result.requestProtocol).toBe('HTTP,HTTPS');
      expect(result.isHttpRedirectToHttps).toBe(false);
    });

    it('should return HTTP with no redirect when protocol is "HTTP"', () => {
      const result = inferProtocolConfig('HTTP');
      expect(result.requestProtocol).toBe('HTTP');
      expect(result.isHttpRedirectToHttps).toBeUndefined();
    });
  });
});
