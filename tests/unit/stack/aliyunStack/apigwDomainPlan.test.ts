import { planApigwDomains } from '../../../../src/stack/aliyunStack/apigwDomainPlan';
import type { Context } from '../../../../src/types';
import type { createAliyunClient } from '../../../../src/common/aliyunClient';

jest.mock('../../../../src/common/logger', () => ({ logger: { info: jest.fn() } }));
jest.mock('../../../../src/common/certUtils', () => ({ readPemContent: (value: string) => value }));

describe('gateway domain comparison', () => {
  const context = { provider: 'aliyun' } as Context;
  const domain = {
    domain_name: 'example.com',
    certificate_id: '100',
    protocol: 'HTTPS',
    www_bind_apex: true,
  };
  const getDomain = jest.fn();
  const getCertificate = jest.fn();
  const client = { apigw: { getDomain }, cas: { getCertificate } } as unknown as ReturnType<
    typeof createAliyunClient
  >;
  const summaries = ['example.com', 'www.example.com'].map((domainName) => ({
    domainName,
    isHttpRedirectToHttps: true,
  }));
  const plan = (items = summaries, desired = domain) =>
    planApigwDomains(context, client, 'group-1', desired, items);

  beforeEach(() => {
    jest.resetAllMocks();
    getCertificate.mockResolvedValue({ cert: 'PUBLIC-CERT' });
    getDomain.mockImplementation(async (_group: string, name: string) => ({
      domainName: name,
      certificateBody: ' PUBLIC-CERT\n',
    }));
  });

  it('compares formatted certificate contents without exposing them', async () => {
    const result = await plan();
    expect(result.updates).toEqual({});
    expect(result.before).toEqual(result.after);
    expect(result.certificateVerified).toBe(true);
    expect(JSON.stringify(result)).not.toContain('PUBLIC-CERT');
    expect(result.before['example.com'].certificateFingerprint).toMatch(/^[a-f0-9]{64}$/);
  });

  it('confirms an omitted summary entry against the domain detail', async () => {
    const result = await plan(summaries.slice(0, 1));
    expect(result.updates).toEqual({});
    expect(getDomain).toHaveBeenCalledWith('group-1', 'www.example.com');
  });

  it('also verifies bindings when the entire summary field is unavailable', async () => {
    const result = await planApigwDomains(context, client, 'group-1', domain, undefined);
    expect(result.updates).toEqual({});
    expect(result.before).toEqual(result.after);
  });

  it('schedules only a confirmed missing domain', async () => {
    getDomain.mockImplementation(async (_group, name) =>
      name.startsWith('www.') ? null : { domainName: name, certificateBody: 'PUBLIC-CERT' },
    );
    const result = await plan();
    expect(result.updates).toEqual({
      'www.example.com': { exists: false, binding: true, certificate: true },
    });
    expect(result.before['www.example.com']).toEqual({ exists: false });
    expect(result.after['www.example.com']).toMatchObject({ exists: true, redirectToHttps: true });
  });

  it('does not classify unavailable certificate contents as missing', async () => {
    getDomain.mockResolvedValue({ domainName: 'example.com', certificateBody: undefined });
    const result = await plan();
    expect(result.updates).toEqual({});
    expect(result.certificateVerified).toBe(false);
    expect(result.after['example.com']).not.toHaveProperty('certificateFingerprint');
  });

  it('keeps an entirely unavailable binding out of the diff', async () => {
    getDomain.mockResolvedValue(undefined);
    const result = await plan([]);
    expect(result.updates).toEqual({});
    expect(result.before).toEqual(result.after);
  });

  it('selects a certificate-only repair on the affected domain', async () => {
    getDomain.mockImplementation(async (_group, name) => ({
      domainName: name,
      certificateBody: name.startsWith('www.') ? null : 'PUBLIC-CERT',
    }));
    const result = await plan();
    expect(result.updates).toEqual({
      'www.example.com': { exists: true, binding: false, certificate: true },
    });
    expect(result.before['www.example.com'].certificateFingerprint).toBeNull();
  });

  it('selects a redirect-only repair on the affected domain', async () => {
    const result = await plan(
      summaries.map((item, index) => ({ ...item, isHttpRedirectToHttps: index === 0 })),
    );
    expect(result.updates).toEqual({
      'www.example.com': { exists: true, binding: true, certificate: false },
    });
    expect(result.before['www.example.com'].redirectToHttps).toBe(false);
  });

  it.each(['detail', 'certificate'])('propagates failed %s reads', async (source) => {
    const error = new Error('AccessDenied');
    (source === 'detail' ? getDomain : getCertificate).mockRejectedValue(error);
    await expect(plan()).rejects.toBe(error);
  });

  it('rejects an unresolved certificate reference', async () => {
    getCertificate.mockResolvedValue(null);
    await expect(plan()).rejects.toThrow('Certificate reference');
  });

  it('supports inline certificates and an HTTP binding without a certificate', async () => {
    const inline = await planApigwDomains(
      context,
      client,
      'group-1',
      { domain_name: 'example.com', certificate_body: 'PUBLIC-CERT' },
      [{ domainName: 'example.com', isHttpRedirectToHttps: false }],
    );
    expect(inline.updates).toEqual({});
    const http = await planApigwDomains(
      context,
      client,
      'group-1',
      { domain_name: 'example.com' },
      [{ domainName: 'example.com', isHttpRedirectToHttps: true }],
    );
    expect(http.updates['example.com']).toEqual({
      exists: true,
      binding: true,
      certificate: false,
    });
    expect(http.after['example.com'].redirectToHttps).toBe(false);
  });
});
