import { createTencentCdnOperations } from '../../../../src/common/tencentClient/cdnOperations';

jest.mock('../../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

jest.mock('../../../../src/lang', () => ({
  lang: { __: (key: string) => key },
}));

const mockSdkClient = {
  AddCdnDomain: jest.fn(),
  DescribeDomains: jest.fn(),
  DeleteCdnDomain: jest.fn(),
  UpdateDomainConfig: jest.fn(),
};

describe('createTencentCdnOperations', () => {
  let operations: ReturnType<typeof createTencentCdnOperations>;

  beforeEach(() => {
    operations = createTencentCdnOperations(mockSdkClient as never);
    jest.clearAllMocks();
  });

  it('adds a CDN domain with COS origin and mapped area', async () => {
    mockSdkClient.AddCdnDomain.mockResolvedValue({});

    await operations.addCdnDomain({
      domainName: 'static.example.com',
      serviceType: 'media',
      area: 'mainland',
      origin: {
        originType: 'cos',
        origins: ['bucket.cos.ap-guangzhou.myqcloud.com'],
        serverName: 'bucket.cos.ap-guangzhou.myqcloud.com',
        originPullProtocol: 'https',
      },
    });

    expect(mockSdkClient.AddCdnDomain).toHaveBeenCalledWith({
      Domain: 'static.example.com',
      ServiceType: 'media',
      Area: 'mainland',
      Origin: {
        OriginType: 'cos',
        Origins: ['bucket.cos.ap-guangzhou.myqcloud.com'],
        ServerName: 'bucket.cos.ap-guangzhou.myqcloud.com',
        OriginPullProtocol: 'https',
      },
    });
  });

  it('describes a CDN domain by exact filter and maps the response', async () => {
    mockSdkClient.DescribeDomains.mockResolvedValue({
      Domains: [
        {
          Domain: 'static.example.com',
          Cname: 'static.example.com.cdn.dnsv1.com',
          Status: 'online',
          ServiceType: 'web',
        },
      ],
    });

    const info = await operations.describeCdnDomain('static.example.com');

    expect(mockSdkClient.DescribeDomains).toHaveBeenCalledWith({
      Filters: [{ Name: 'domain', Value: ['static.example.com'] }],
      Limit: 1,
    });
    expect(info).toEqual({
      domainName: 'static.example.com',
      cname: 'static.example.com.cdn.dnsv1.com',
      status: 'online',
      serviceType: 'web',
    });
  });

  it('returns null when the domain query fails or is empty', async () => {
    mockSdkClient.DescribeDomains.mockRejectedValue(new Error('boom'));
    expect(await operations.describeCdnDomain('x.c')).toBeNull();

    mockSdkClient.DescribeDomains.mockResolvedValue({ Domains: [] });
    expect(await operations.describeCdnDomain('x.c')).toBeNull();
  });

  it('deletes a CDN domain and swallows not-found errors', async () => {
    mockSdkClient.DeleteCdnDomain.mockResolvedValue({});
    await operations.deleteCdnDomain('x.c');
    expect(mockSdkClient.DeleteCdnDomain).toHaveBeenCalledWith({ Domain: 'x.c' });

    mockSdkClient.DeleteCdnDomain.mockRejectedValue({ code: 'ResourceNotFound.InvalidDomain' });
    await expect(operations.deleteCdnDomain('x.c')).resolves.toBeUndefined();

    mockSdkClient.DeleteCdnDomain.mockRejectedValue({ code: 'InternalError', message: 'boom' });
    await expect(operations.deleteCdnDomain('x.c')).rejects.toBeTruthy();
  });

  it('updates delivery (service type / area / origin) in place', async () => {
    mockSdkClient.UpdateDomainConfig.mockResolvedValue({});

    await operations.updateCdnDelivery('x.c', {
      serviceType: 'download',
      area: 'overseas',
      origin: { originType: 'cos', origins: ['e'], serverName: 'e' },
    });

    expect(mockSdkClient.UpdateDomainConfig).toHaveBeenCalledWith({
      Domain: 'x.c',
      ServiceType: 'download',
      Area: 'overseas',
      Origin: { OriginType: 'cos', Origins: ['e'], ServerName: 'e' },
    });
  });

  it('applies cache config with seconds TTL and query-string key handling', async () => {
    mockSdkClient.UpdateDomainConfig.mockResolvedValue({});

    await operations.applyCacheConfig('x.c', 3600, true);

    expect(mockSdkClient.UpdateDomainConfig).toHaveBeenCalledWith({
      Domain: 'x.c',
      Cache: {
        SimpleCache: {
          CacheRules: [{ CacheType: 'all', CacheContents: ['all'], CacheTime: 3600 }],
          FollowOrigin: 'off',
          IgnoreCacheControl: 'off',
          IgnoreSetCookie: 'off',
          CompareMaxAge: 'off',
        },
      },
      CacheKey: { FullUrlCache: 'off' },
    });

    await operations.applyCacheConfig('x.c', undefined, false);
    expect(mockSdkClient.UpdateDomainConfig).toHaveBeenLastCalledWith({
      Domain: 'x.c',
      CacheKey: { FullUrlCache: 'on' },
    });

    await operations.applyCacheConfig('x.c');
    expect(mockSdkClient.UpdateDomainConfig).toHaveBeenCalledTimes(2);
  });

  it('applies compression and https redirect switches', async () => {
    mockSdkClient.UpdateDomainConfig.mockResolvedValue({});

    await operations.applyCompression('x.c', true);
    expect(mockSdkClient.UpdateDomainConfig).toHaveBeenLastCalledWith({
      Domain: 'x.c',
      Compression: { Switch: 'on' },
    });

    await operations.applyCompression('x.c');
    expect(mockSdkClient.UpdateDomainConfig).toHaveBeenCalledTimes(1);

    await operations.applyHttpsRedirect('x.c', true);
    expect(mockSdkClient.UpdateDomainConfig).toHaveBeenLastCalledWith({
      Domain: 'x.c',
      ForceRedirect: { Switch: 'on', RedirectType: 'https', RedirectStatusCode: 301 },
    });

    await operations.applyHttpsRedirect('x.c', false);
    expect(mockSdkClient.UpdateDomainConfig).toHaveBeenLastCalledWith({
      Domain: 'x.c',
      ForceRedirect: { Switch: 'off' },
    });
  });

  it('enables https with http2', async () => {
    mockSdkClient.UpdateDomainConfig.mockResolvedValue({});

    await operations.enableHttps('x.c');

    expect(mockSdkClient.UpdateDomainConfig).toHaveBeenCalledWith({
      Domain: 'x.c',
      Https: { Switch: 'on', Http2: 'on' },
    });
  });
});
