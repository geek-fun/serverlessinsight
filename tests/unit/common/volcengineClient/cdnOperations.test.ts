import { Service } from '@volcengine/openapi';
import { createCdnOperations } from '../../../../src/common/volcengineClient/cdnOperations';

jest.mock('../../../../src/common/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

jest.mock('../../../../src/lang', () => ({
  lang: {
    __: (key: string, params?: Record<string, string>) =>
      params ? `${key} ${JSON.stringify(params)}` : key,
  },
}));

type MockCdnClient = {
  fetchOpenAPI: jest.Mock;
};

const createMockCdnClient = (): MockCdnClient => ({
  fetchOpenAPI: jest.fn(),
});

describe('cdnOperations (issue #294)', () => {
  let operations: ReturnType<typeof createCdnOperations>;
  let mockClient: MockCdnClient;

  beforeEach(() => {
    mockClient = createMockCdnClient();
    mockClient.fetchOpenAPI.mockResolvedValue({ Result: {} });
    operations = createCdnOperations(mockClient as unknown as Service);
  });

  const lastCall = () => mockClient.fetchOpenAPI.mock.calls.at(-1)?.[0];

  it('throws when the client is not initialized', async () => {
    const ops = createCdnOperations(null);
    await expect(
      ops.addCdnDomain({
        domain: 'cdn.example.com',
        serviceType: 'web',
        serviceRegion: 'global',
        origin: { originLines: [{ originType: 'TOS', bucketName: 'test-bucket' }] },
      }),
    ).rejects.toThrow('VOLCENGINE_CDN_CLIENT_NOT_INITIALIZED');
  });

  it('addCdnDomain posts the Domain/ServiceType/ServiceRegion/Origin body', async () => {
    await operations.addCdnDomain({
      domain: 'cdn.example.com',
      serviceType: 'download',
      serviceRegion: 'chinese_mainland',
      origin: {
        originLines: [{ originType: 'TOS', bucketName: 'test-bucket', region: 'cn-beijing' }],
      },
      originProtocol: 'followclient',
    });

    const call = lastCall();
    expect(call.Action).toBe('AddCdnDomain');
    expect(call.Version).toBe('2021-03-01');
    expect(call.data).toEqual({
      Domain: 'cdn.example.com',
      ServiceType: 'download',
      ServiceRegion: 'chinese_mainland',
      Origin: [
        {
          OriginAction: {
            OriginLines: [{ OriginType: 'TOS', BucketName: 'test-bucket', Region: 'cn-beijing' }],
          },
        },
      ],
      OriginProtocol: 'followclient',
    });
  });

  it('describeCdnDomain uses an exact-match ListCdnDomains filter and maps the entry', async () => {
    mockClient.fetchOpenAPI.mockResolvedValueOnce({
      Result: {
        Data: [
          {
            Domain: 'cdn.example.com',
            Cname: 'cdn.example.com.boscdn.com',
            ServiceType: 'web',
            ServiceRegion: 'global',
            Status: 'online',
            PrimaryOrigin: ['test-bucket'],
          },
        ],
      },
    });

    const info = await operations.describeCdnDomain('cdn.example.com');

    expect(lastCall().data).toEqual({
      Domain: 'cdn.example.com',
      ExactMatch: true,
      PageNum: 1,
      PageSize: 10,
    });
    expect(info).toEqual({
      domain: 'cdn.example.com',
      cname: 'cdn.example.com.boscdn.com',
      serviceType: 'web',
      serviceRegion: 'global',
      status: 'online',
      originProtocol: undefined,
      https: undefined,
      origin: ['test-bucket'],
    });
  });

  it('describeCdnDomain returns null on not-found errors', async () => {
    mockClient.fetchOpenAPI.mockRejectedValueOnce({ code: 'ResourceNotFound' });
    expect(await operations.describeCdnDomain('missing.example.com')).toBeNull();
  });

  it('deleteCdnDomain warns and returns on not-found errors', async () => {
    mockClient.fetchOpenAPI.mockRejectedValueOnce({ code: 'DomainNotFound' });
    await expect(operations.deleteCdnDomain('missing.example.com')).resolves.toBeUndefined();
    expect(mockClient.fetchOpenAPI).toHaveBeenCalledTimes(1);
  });

  it('updateCdnDelivery posts only the provided modules', async () => {
    await operations.updateCdnDelivery('cdn.example.com', {
      serviceType: 'video',
      originProtocol: 'https',
    });

    expect(lastCall().Action).toBe('UpdateCdnConfig');
    expect(lastCall().data).toEqual({
      Domain: 'cdn.example.com',
      ServiceType: 'video',
      OriginProtocol: 'https',
    });
  });

  it('applyCacheConfig posts the match-all cache rule with seconds TTL and the query-string cache key', async () => {
    await operations.applyCacheConfig('cdn.example.com', 3600, true);

    expect(lastCall().data).toEqual({
      Domain: 'cdn.example.com',
      Cache: [
        {
          Condition: {
            ConditionRule: [{ Type: 'url', Object: 'directory', Operator: 'match', Value: '/' }],
          },
          CacheAction: { Action: 'cache', Ttl: 3600, DefaultPolicy: 'force_cache' },
        },
      ],
      CacheKey: [
        {
          Condition: {
            ConditionRule: [{ Type: 'url', Object: 'directory', Operator: 'match', Value: '/' }],
          },
          CacheKeyAction: {
            CacheKeyComponents: [{ Object: 'queryString', Action: 'excludePart', Subobject: '*' }],
          },
        },
      ],
    });
  });

  it('applyCacheConfig restores include-all query strings when ignoreQueryString is false', async () => {
    await operations.applyCacheConfig('cdn.example.com', undefined, false);

    expect(lastCall().data.CacheKey[0].CacheKeyAction.CacheKeyComponents).toEqual([
      { Object: 'queryString', Action: 'include', Subobject: '*', IgnoreCase: true },
    ]);
    expect(lastCall().data.Cache).toBeUndefined();
  });

  it('applyCacheConfig makes no call when nothing is set', async () => {
    await operations.applyCacheConfig('cdn.example.com');
    expect(mockClient.fetchOpenAPI).not.toHaveBeenCalled();
  });

  it('applyCompression toggles the module with a gzip rule when enabled', async () => {
    await operations.applyCompression('cdn.example.com', true);

    expect(lastCall().data).toEqual({
      Domain: 'cdn.example.com',
      Compression: {
        Switch: true,
        CompressionRules: [
          {
            Condition: {
              ConditionRule: [{ Type: 'url', Object: 'directory', Operator: 'match', Value: '/' }],
            },
            CompressionAction: { CompressionType: ['Gzip'] },
          },
        ],
      },
    });

    await operations.applyCompression('cdn.example.com', false);
    expect(lastCall().data).toEqual({
      Domain: 'cdn.example.com',
      Compression: { Switch: false },
    });
  });

  it('applyCompression makes no call when undefined', async () => {
    await operations.applyCompression('cdn.example.com');
    expect(mockClient.fetchOpenAPI).not.toHaveBeenCalled();
  });

  it('applyHttpsRedirect posts the 301 forced redirect', async () => {
    await operations.applyHttpsRedirect('cdn.example.com', true);

    expect(lastCall().data).toEqual({
      Domain: 'cdn.example.com',
      HttpForcedRedirect: { EnableForcedRedirect: true, StatusCode: '301' },
    });
  });

  it('applyCertificate enables HTTPS with HTTP2 and the certificate reference', async () => {
    await operations.applyCertificate('cdn.example.com', 'cert-volc-1');

    expect(lastCall().data).toEqual({
      Domain: 'cdn.example.com',
      HTTPS: {
        Switch: true,
        HTTP2: true,
        CertInfo: { CertId: 'cert-volc-1' },
      },
    });
  });

  it('addCertificate uploads the PEM pair with Repeatable false and maps CertId', async () => {
    mockClient.fetchOpenAPI.mockResolvedValueOnce({ Result: { CertId: 'cert-volc-2' } });

    const result = await operations.addCertificate({
      certificate: 'CERT-BODY',
      privateKey: 'CERT-KEY',
      name: 'cdn_example_com',
    });

    expect(lastCall().Action).toBe('AddCertificate');
    expect(lastCall().data).toEqual({
      Certificate: 'CERT-BODY',
      PrivateKey: 'CERT-KEY',
      Repeatable: false,
      Desc: 'cdn_example_com',
    });
    expect(result).toEqual({ certificateId: 'cert-volc-2' });
  });

  it('addCertificate fails loudly when no CertId comes back', async () => {
    mockClient.fetchOpenAPI.mockResolvedValueOnce({ Result: {} });
    await expect(
      operations.addCertificate({ certificate: 'CERT-BODY', privateKey: 'CERT-KEY' }),
    ).rejects.toThrow('CDN_CERT_UPLOAD_FAILED');
  });
});
