import {
  buildGatewayName,
  buildServiceName,
  buildUpstreamName,
  buildRouteName,
  resolveFunctionKey,
  eventToApigwGatewayConfig,
  eventToApigwServiceConfig,
  triggerToApigwUpstreamConfig,
  triggerToApigwRouteConfig,
  extractEventDomainDefinition,
} from '../../../../src/stack/volcengineStack/apigwTypes';
import type { EventDomain } from '../../../../src/types';

const mockEvent: EventDomain = {
  key: 'api_gateway',
  name: 'rest-api-app-volcengine-gw',
  type: 'API_GATEWAY',
  network: { vpc_id: 'vpc-123', subnet_ids: ['subnet-a', 'subnet-b'] },
  triggers: [
    { method: 'POST', path: '/graphql', backend: '${functions.api_function}' },
    { method: 'GET', path: '/health', backend: '${functions.api_function}' },
  ],
};

describe('apigwTypes', () => {
  it('should build gateway name from service + stage', () => {
    expect(buildGatewayName('rest-api-volcengine', 'dev')).toBe('rest-api-volcengine-dev-apigw');
  });

  it('should build service name from event + stage', () => {
    expect(buildServiceName(mockEvent, 'dev')).toBe('rest-api-app-volcengine-gw-dev-service');
  });

  it('should build upstream name from backend ref', () => {
    expect(buildUpstreamName(mockEvent, '${functions.api_function}', 'dev')).toBe(
      'rest-api-app-volcengine-gw-dev-upstream-api-function',
    );
  });

  it('should build a route name from method + path', () => {
    const name = buildRouteName(mockEvent, 'POST', '/graphql');
    expect(name).toBe('rest-api-app-volcengine-gw-POST-graphql');
    expect(name.length).toBeLessThanOrEqual(63);
  });

  it('should resolve the function key from a backend ref', () => {
    expect(resolveFunctionKey('${functions.api_function}')).toBe('api_function');
    expect(resolveFunctionKey('${functions.probe}')).toBe('probe');
  });

  it('should build gateway config with serverless type and network', () => {
    const config = eventToApigwGatewayConfig(mockEvent, 'rest-api-volcengine', 'dev', 'ownership');
    expect(config.gatewayName).toBe('rest-api-volcengine-dev-apigw');
    expect(config.type).toBe('serverless');
    expect(config.network).toEqual({ vpcId: 'vpc-123', subnetIds: ['subnet-a', 'subnet-b'] });
    expect(config.Tags).toEqual([{ Key: 'si-owned-by', Value: 'ownership' }]);
  });

  it('should build service config', () => {
    const config = eventToApigwServiceConfig(mockEvent, 'rest-api-volcengine', 'dev', 'gw-1');
    expect(config.gatewayId).toBe('gw-1');
    expect(config.serviceName).toBe('rest-api-app-volcengine-gw-dev-service');
    expect(config.protocol).toEqual(['HTTP']);
  });

  it('should build upstream config with the veFaaS function id', () => {
    const config = triggerToApigwUpstreamConfig(
      mockEvent,
      mockEvent.triggers[0],
      'rest-api-volcengine',
      'dev',
      'gw-1',
      'fn-abc',
    );
    expect(config.sourceType).toBe('VeFaas');
    expect(config.functionId).toBe('fn-abc');
    expect(config.gatewayId).toBe('gw-1');
  });

  it('should build route config from a trigger', () => {
    const config = triggerToApigwRouteConfig(mockEvent, mockEvent.triggers[0], 'svc-1', 'up-1');
    expect(config.serviceId).toBe('svc-1');
    expect(config.method).toBe('POST');
    expect(config.path).toBe('/graphql');
    expect(config.upstreamId).toBe('up-1');
  });

  it('should extract the event domain definition', () => {
    const def = extractEventDomainDefinition(mockEvent);
    expect(def.gatewayName).toBe('rest-api-app-volcengine-gw');
    expect(def.network).toEqual({ vpcId: 'vpc-123', subnetIds: ['subnet-a', 'subnet-b'] });
    expect(def.triggers).toHaveLength(2);
    expect(def.triggers[0]).toEqual({
      method: 'POST',
      path: '/graphql',
      backend: '${functions.api_function}',
    });
  });
});
