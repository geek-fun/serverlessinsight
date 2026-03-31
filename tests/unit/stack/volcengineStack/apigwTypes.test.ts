import {
  eventToApigwGroupConfig,
  triggerToApigwApiConfig,
  generateApiKey,
  extractEventDomainDefinition,
} from '../../../../src/stack/volcengineStack/apigwTypes';
import { getContext } from '../../../../src/common';
import type { EventDomain } from '../../../../src/types';

jest.mock('../../../../src/common', () => ({
  getContext: jest.fn(),
  getIacDefinition: jest.fn(),
  isFunctionDomain: jest.fn(),
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

const mockGetIacDefinition = jest.requireMock('../../../../src/common').getIacDefinition;
const mockIsFunctionDomain = jest.requireMock('../../../../src/common').isFunctionDomain;

describe('apigwTypes', () => {
  const mockEvent: EventDomain = {
    key: 'api_gateway',
    name: 'test-gateway',
    type: 'API_GATEWAY',
    triggers: [
      {
        method: 'GET',
        path: '/api/test',
        backend: '${functions.test_function}',
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('eventToApigwGroupConfig', () => {
    it('should convert event to group config', () => {
      const result = eventToApigwGroupConfig(mockEvent, 'test-service', 'dev');

      expect(result.groupName).toBe('test-service-dev-apigw');
      expect(result.description).toBe('API Gateway for test-service');
    });

    it('should use custom protocol from event domain', () => {
      const eventWithProtocol: EventDomain = {
        ...mockEvent,
        domain: {
          domain_name: 'api.example.com',
          protocol: 'HTTPS',
        },
      };

      const result = eventToApigwGroupConfig(eventWithProtocol, 'test-service', 'dev');

      expect(result.protocol).toBe('HTTPS');
    });
  });

  describe('triggerToApigwApiConfig', () => {
    it('should convert trigger to API config', () => {
      (getContext as jest.Mock).mockReturnValue({
        iac: { functions: {} },
      });
      mockGetIacDefinition.mockReturnValue({ name: 'test-function' });
      mockIsFunctionDomain.mockReturnValue(true);

      const result = triggerToApigwApiConfig(
        mockEvent,
        mockEvent.triggers[0],
        'gateway-123',
        'test-service',
        'cn-beijing',
        'dev',
      );

      expect(result.gatewayId).toBe('gateway-123');
      expect(result.method).toBe('GET');
      expect(result.path).toBe('/api/test');
      expect(result.backendFunctionName).toBe('test-function');
    });

    it('should return backend ref when context.iac is undefined', () => {
      (getContext as jest.Mock).mockReturnValue({});

      const result = triggerToApigwApiConfig(
        mockEvent,
        mockEvent.triggers[0],
        'gateway-123',
        'test-service',
        'cn-beijing',
        'dev',
      );

      expect(result.backendFunctionName).toBe('${functions.test_function}');
    });

    it('should return backend ref when function not found', () => {
      (getContext as jest.Mock).mockReturnValue({
        iac: { functions: {} },
      });
      mockGetIacDefinition.mockReturnValue(null);
      mockIsFunctionDomain.mockReturnValue(false);

      const result = triggerToApigwApiConfig(
        mockEvent,
        mockEvent.triggers[0],
        'gateway-123',
        'test-service',
        'cn-beijing',
        'dev',
      );

      expect(result.backendFunctionName).toBe('${functions.test_function}');
    });

    it('should return backend ref when function is not a function domain', () => {
      (getContext as jest.Mock).mockReturnValue({
        iac: { functions: {} },
      });
      mockGetIacDefinition.mockReturnValue({ name: 'test' });
      mockIsFunctionDomain.mockReturnValue(false);

      const result = triggerToApigwApiConfig(
        mockEvent,
        mockEvent.triggers[0],
        'gateway-123',
        'test-service',
        'cn-beijing',
        'dev',
      );

      expect(result.backendFunctionName).toBe('${functions.test_function}');
    });
  });

  describe('generateApiKey', () => {
    it('should generate API key from method and path', () => {
      const result = generateApiKey('GET', '/api/test');

      expect(result).toBe('GET_api__test');
    });

    it('should handle root path', () => {
      const result = generateApiKey('GET', '/');

      expect(result).toBe('GET_');
    });

    it('should handle path with parameters', () => {
      const result = generateApiKey('POST', '/users/{id}');

      expect(result).toContain('POST');
      expect(result).toContain('users');
    });
  });

  describe('extractEventDomainDefinition', () => {
    it('should return null when domain is undefined', () => {
      const result = extractEventDomainDefinition(undefined);

      expect(result).toBeNull();
    });

    it('should extract domain definition', () => {
      const domain = {
        domain_name: 'api.example.com',
        www_bind_apex: true,
        certificate_id: 'cert-123',
        protocol: 'HTTPS',
      };

      const result = extractEventDomainDefinition(domain);

      expect(result).toEqual({
        domainName: 'api.example.com',
        wwwBindApex: true,
        certificateId: 'cert-123',
        certificateBody: null,
        certificatePrivateKey: null,
        protocol: 'HTTPS',
      });
    });

    it('should handle domain with certificate body', () => {
      const domain = {
        domain_name: 'api.example.com',
        certificate_body: '-----BEGIN CERTIFICATE-----',
        certificate_private_key: '-----BEGIN PRIVATE KEY-----',
      };

      const result = extractEventDomainDefinition(domain);

      expect(result?.certificateBody).toBe('-----BEGIN CERTIFICATE-----');
      expect(result?.certificatePrivateKey).toBe('(managed)');
    });
  });
});
