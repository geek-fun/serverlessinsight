import { createVolcengineClient } from '../../../../src/common/volcengineClient';

const mockFetchOpenAPI = jest.fn();

jest.mock('@volcengine/openapi', () => ({
  Service: jest.fn().mockImplementation(() => ({ fetchOpenAPI: mockFetchOpenAPI })),
}));

describe('volcengineClient wrapService', () => {
  const context = {
    provider: 'volcengine',
    region: 'cn-beijing',
    app: 'test-app',
    service: 'test-service',
    stage: 'dev',
    accessKeyId: 'ak',
    accessKeySecret: 'sk',
    iac: null,
  } as never;

  beforeEach(() => {
    mockFetchOpenAPI.mockReset();
  });

  it('rethrows API errors with code, action and RequestId', async () => {
    mockFetchOpenAPI.mockResolvedValue({
      ResponseMetadata: {
        RequestId: 'req-abc-123',
        Error: { Code: 'ForbiddenOperation', Message: 'gateway is not running' },
      },
    });

    const client = createVolcengineClient(context);

    await expect(
      client.apigw.createService({
        gatewayId: 'gw-1',
        serviceName: 'svc',
      }),
    ).rejects.toThrow(
      'Volcengine CreateGatewayService failed: ForbiddenOperation: gateway is not running (RequestId: req-abc-123)',
    );

    try {
      await client.apigw.createService({ gatewayId: 'gw-1', serviceName: 'svc' });
    } catch (error) {
      const err = error as Error & { code?: string; requestId?: string; action?: string };
      expect(err.code).toBe('ForbiddenOperation');
      expect(err.requestId).toBe('req-abc-123');
      expect(err.action).toBe('CreateGatewayService');
    }
  });

  it('resolves successfully when there is no API error', async () => {
    mockFetchOpenAPI.mockResolvedValue({
      ResponseMetadata: { RequestId: 'req-ok' },
      Result: { Id: 'svc-1' },
    });

    const client = createVolcengineClient(context);
    const id = await client.apigw.createService({ gatewayId: 'gw-1', serviceName: 'svc' });
    expect(id).toBe('svc-1');
  });
});
