import {
  desiredGatewayDomains,
  reconcileGatewayDomains,
} from '../../../../src/stack/volcengineStack/apigwDomains';
import type { Context, EventDomain } from '../../../../src/types';

describe('owned gateway domain reconciliation', () => {
  const context = { stage: 'dev' } as Context;
  const event = { domain: { domain_name: 'example.com' } } as EventDomain;
  const owned = ['example.com', 'www.example.com'].map((domainName, index) => ({
    type: 'VOLCENGINE_APIGW_DOMAIN',
    id: `domain-${index}`,
    sid: 'sid',
    domainName,
  }));
  const makeClient = () => ({
    apigw: {
      getCustomDomain: jest.fn().mockResolvedValue({
        serviceId: 'svc',
        domainName: 'example.com',
        protocol: ['HTTP'],
        sslRedirect: false,
      }),
      createCustomDomain: jest.fn().mockResolvedValue('new-id'),
      updateCustomDomain: jest.fn(),
      deleteCustomDomain: jest.fn(),
    },
  });
  it('restores omitted www to false and removes the recorded child only', async () => {
    const client = makeClient();
    const result = await reconcileGatewayDomains(context, event, 'svc', owned, client as never);
    expect(result.map((instance) => instance.domainName)).toEqual(['example.com']);
    expect(client.apigw.deleteCustomDomain).toHaveBeenCalledWith('domain-1');
    expect(client.apigw.createCustomDomain).not.toHaveBeenCalled();
    expect(client.apigw.updateCustomDomain).not.toHaveBeenCalled();
  });
  it('repairs changed certificates and protocol in place', async () => {
    const client = makeClient();
    const desired = {
      ...event,
      domain: { ...event.domain!, certificate_id: 'new-cert', protocol: 'HTTPS' },
    };
    await reconcileGatewayDomains(context, desired, 'svc', owned.slice(0, 1), client as never);
    expect(client.apigw.updateCustomDomain).toHaveBeenCalledWith(
      'domain-0',
      expect.objectContaining({
        certificateId: 'new-cert',
        protocol: ['HTTPS'],
        sslRedirect: true,
      }),
    );
  });
  it('recreates a confirmed missing owned domain', async () => {
    const client = makeClient();
    client.apigw.getCustomDomain.mockResolvedValue(null);
    expect(
      await reconcileGatewayDomains(context, event, 'svc', owned.slice(0, 1), client as never),
    ).toEqual([expect.objectContaining({ id: 'new-id' })]);
  });
  it('creates primary and www with the same configuration', () => {
    const result = desiredGatewayDomains(
      { ...event, domain: { ...event.domain!, www_bind_apex: true, protocol: ['HTTP', 'HTTPS'] } },
      'svc',
    );
    expect(result.map((domain) => domain.domainName)).toEqual(['example.com', 'www.example.com']);
    expect(
      result.every((domain) => domain.protocol?.length === 2 && domain.sslRedirect === false),
    ).toBe(true);
  });
  it.each(['NotFound', 'DomainNotFound'])(
    'tolerates an already deleted domain: %s',
    async (code) => {
      const client = makeClient();
      client.apigw.deleteCustomDomain.mockRejectedValue({ code });
      await expect(
        reconcileGatewayDomains(
          context,
          { ...event, domain: undefined },
          'svc',
          owned,
          client as never,
        ),
      ).resolves.toEqual([]);
    },
  );
  it('propagates read failures before writing or deleting', async () => {
    const client = makeClient();
    const error = new Error('AccessDenied');
    client.apigw.getCustomDomain.mockRejectedValue(error);
    await expect(
      reconcileGatewayDomains(context, event, 'svc', owned, client as never),
    ).rejects.toBe(error);
    expect(client.apigw.createCustomDomain).not.toHaveBeenCalled();
    expect(client.apigw.deleteCustomDomain).not.toHaveBeenCalled();
  });
  it('propagates unexpected removal failures', async () => {
    const client = makeClient();
    const error = new Error('AccessDenied');
    client.apigw.deleteCustomDomain.mockRejectedValue(error);
    await expect(
      reconcileGatewayDomains(
        context,
        { ...event, domain: undefined },
        'svc',
        owned,
        client as never,
      ),
    ).rejects.toBe(error);
  });
});
