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
        origin: {
          originLines: [{ originType: 'primary', instanceType: 'TOS', bucketName: 'test-bucket' }],
        },
      }),
    ).rejects.toThrow('VOLCENGINE_CDN_CLIENT_NOT_INITIALIZED');
  });

  it('addCdnDomain posts the Domain/ServiceType/ServiceRegion/Origin body', async () => {
    await operations.addCdnDomain({
      domain: 'cdn.example.com',
      serviceType: 'download',
      serviceRegion: 'chinese_mainland',
      origin: {
        originLines: [
          {
            originType: 'primary',
            instanceType: 'TOS',
            bucketName: 'test-bucket',
            region: 'cn-beijing',
          },
        ],
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
            OriginLines: [
              {
                OriginType: 'primary',
                InstanceType: 'TOS',
                BucketName: 'test-bucket',
                Region: 'cn-beijing',
              },
            ],
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

  it('addCdnDomain omits ServiceRegion and OriginProtocol when unset', async () => {
    await operations.addCdnDomain({
      domain: 'cdn.example.com',
      serviceType: 'web',
      serviceRegion: '',
      origin: {
        originLines: [{ originType: 'primary', instanceType: 'TOS', bucketName: 'test-bucket' }],
      },
    });

    expect(lastCall().data).toEqual({
      Domain: 'cdn.example.com',
      ServiceType: 'web',
      Origin: [
        {
          OriginAction: {
            OriginLines: [
              { OriginType: 'primary', InstanceType: 'TOS', BucketName: 'test-bucket' },
            ],
          },
        },
      ],
    });
  });

  it('updateCdnDelivery forwards serviceRegion, origin and originProtocol together', async () => {
    await operations.updateCdnDelivery('cdn.example.com', {
      serviceType: 'video',
      serviceRegion: 'outside_chinese_mainland',
      origin: {
        originLines: [{ originType: 'primary', instanceType: 'TOS', bucketName: 'test-bucket' }],
      },
      originProtocol: 'followclient',
    });

    expect(lastCall().data).toEqual({
      Domain: 'cdn.example.com',
      ServiceType: 'video',
      ServiceRegion: 'outside_chinese_mainland',
      Origin: [
        {
          OriginAction: {
            OriginLines: [
              { OriginType: 'primary', InstanceType: 'TOS', BucketName: 'test-bucket' },
            ],
          },
        },
      ],
      OriginProtocol: 'followclient',
    });
  });

  it('updateCdnDelivery posts only the domain when no module is provided', async () => {
    await operations.updateCdnDelivery('cdn.example.com', {});

    expect(lastCall().data).toEqual({ Domain: 'cdn.example.com' });
  });

  it('applyHttpsRedirect makes no call when undefined', async () => {
    await operations.applyHttpsRedirect('cdn.example.com');
    expect(mockClient.fetchOpenAPI).not.toHaveBeenCalled();
  });

  it('addCdnDomain forwards every optional origin line field', async () => {
    await operations.addCdnDomain({
      domain: 'cdn.example.org',
      serviceType: 'web',
      serviceRegion: 'global',
      origin: {
        originLines: [
          {
            originType: 'primary',
            instanceType: 'Domain',
            address: 'origin.example.com',
            originHost: 'cdn.example.org',
            privateBucketAccess: true,
            httpPort: '80',
            httpsPort: '443',
            weight: '100',
          },
          { originType: 'backup', instanceType: 'IP', address: '203.0.113.1' },
        ],
      },
    });

    const body = lastCall().data;
    expect(body.Origin[0].OriginAction.OriginLines[0]).toEqual({
      OriginType: 'primary',
      InstanceType: 'Domain',
      Address: 'origin.example.com',
      OriginHost: 'cdn.example.org',
      PrivateBucketAccess: true,
      HttpPort: '80',
      HttpsPort: '443',
      Weight: '100',
    });
    expect(body.Origin[0].OriginAction.OriginLines[1]).toEqual({
      OriginType: 'backup',
      InstanceType: 'IP',
      Address: '203.0.113.1',
    });
    expect(body).not.toHaveProperty('OriginProtocol');
  });

  it('applyCacheConfig renders the default cache key when only a TTL is given', async () => {
    await operations.applyCacheConfig('cdn.example.com', 60);

    expect(lastCall().data).toEqual({
      Domain: 'cdn.example.com',
      Cache: [expect.objectContaining({ CacheAction: expect.objectContaining({ Ttl: 60 }) })],
      // Default for a dropped ignore_query_string: query string stays in the key.
      CacheKey: [
        expect.objectContaining({
          CacheKeyAction: {
            CacheKeyComponents: [
              { Object: 'queryString', Action: 'include', Subobject: '*', IgnoreCase: true },
            ],
          },
        }),
      ],
    });
  });

  it('describeCdnDomain maps every optional field when present', async () => {
    mockClient.fetchOpenAPI.mockResolvedValueOnce({
      Result: {
        Data: [
          {
            Domain: 'cdn.example.com',
            Cname: 'cdn.example.com.boscdn.com',
            ServiceType: 'web',
            ServiceRegion: 'global',
            Status: 'online',
            OriginProtocol: 'https',
            HTTPS: true,
            PrimaryOrigin: ['test-bucket'],
          },
        ],
      },
    });

    const info = await operations.describeCdnDomain('cdn.example.com');

    expect(info).toEqual(
      expect.objectContaining({
        originProtocol: 'https',
        https: true,
        origin: ['test-bucket'],
      }),
    );
  });

  it('describeCdnDomain returns null when the domain list is empty', async () => {
    mockClient.fetchOpenAPI.mockResolvedValueOnce({ Result: { Data: [] } });
    expect(await operations.describeCdnDomain('cdn.example.com')).toBeNull();
  });

  it('describeCdnDomain returns null when the Result is absent', async () => {
    mockClient.fetchOpenAPI.mockResolvedValueOnce({});
    expect(await operations.describeCdnDomain('cdn.example.com')).toBeNull();
  });

  it('maps a not-found error carrying no code as a non-not-found error', async () => {
    mockClient.fetchOpenAPI.mockRejectedValueOnce(null);
    await expect(operations.describeCdnDomain('cdn.example.com')).rejects.toBeNull();
  });

  it('describeCdnDomain returns null on not-found errors', async () => {
    mockClient.fetchOpenAPI.mockRejectedValueOnce({ code: 'ResourceNotFound' });
    expect(await operations.describeCdnDomain('missing.example.com')).toBeNull();
  });

  it('describeCdnDomain rethrows non-not-found errors', async () => {
    mockClient.fetchOpenAPI.mockRejectedValueOnce({ code: 'AccessDenied' });
    await expect(operations.describeCdnDomain('cdn.example.com')).rejects.toMatchObject({
      code: 'AccessDenied',
    });
  });

  it('deleteCdnDomain logs the deletion on success', async () => {
    await expect(operations.deleteCdnDomain('cdn.example.com')).resolves.toBeUndefined();
    expect(lastCall().data).toEqual({ Domain: 'cdn.example.com' });
  });

  it('deleteCdnDomain warns and returns on not-found errors', async () => {
    mockClient.fetchOpenAPI.mockRejectedValueOnce({ code: 'DomainNotFound' });
    await expect(operations.deleteCdnDomain('missing.example.com')).resolves.toBeUndefined();
    expect(mockClient.fetchOpenAPI).toHaveBeenCalledTimes(1);
  });

  it('deleteCdnDomain rethrows non-not-found errors', async () => {
    mockClient.fetchOpenAPI.mockRejectedValueOnce({ code: 'OperationFailed' });
    await expect(operations.deleteCdnDomain('cdn.example.com')).rejects.toMatchObject({
      code: 'OperationFailed',
    });
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
          CacheAction: { Action: 'cache', Ttl: 3600 },
        },
      ],
      CacheKey: [
        {
          Condition: {
            ConditionRule: [{ Type: 'url', Object: 'directory', Operator: 'match', Value: '/' }],
          },
          CacheKeyAction: {
            CacheKeyComponents: [{ Object: 'queryString', Action: 'exclude', Subobject: '*' }],
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
    // A dropped TTL resets the cache module to follow-origin.
    expect(lastCall().data.Cache[0].CacheAction).toEqual({ Action: 'follow_origin' });
  });

  it('applyCacheConfig resets both modules when nothing is set', async () => {
    await operations.applyCacheConfig('cdn.example.com');

    // Omission restores the documented defaults on the cloud — not a no-op.
    expect(lastCall().data).toEqual({
      Domain: 'cdn.example.com',
      Cache: [
        expect.objectContaining({
          CacheAction: { Action: 'follow_origin' },
        }),
      ],
      CacheKey: [
        expect.objectContaining({
          CacheKeyAction: {
            CacheKeyComponents: [
              { Object: 'queryString', Action: 'include', Subobject: '*', IgnoreCase: true },
            ],
          },
        }),
      ],
    });
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
            CompressionAction: { CompressionType: ['gzip'] },
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

  it('applyHttpsRedirect posts the 301 forced redirect under HTTPS', async () => {
    await operations.applyHttpsRedirect('cdn.example.com', true);

    // HttpForcedRedirect is the HTTPS→HTTP module and is mutually exclusive
    // with this one; the HTTP→HTTPS redirect belongs to HTTPS.ForcedRedirect.
    expect(lastCall().data).toEqual({
      Domain: 'cdn.example.com',
      HTTPS: {
        Switch: true,
        ForcedRedirect: { EnableForcedRedirect: true, StatusCode: '301' },
      },
    });
    expect(lastCall().data).not.toHaveProperty('HttpForcedRedirect');
  });

  it('applyCertificate enables HTTPS with the certificate reference', async () => {
    await operations.applyCertificate('cdn.example.com', 'cert-volc-1');

    // HTTP2 is left at the provider default — the API rejects enabling it.
    expect(lastCall().data).toEqual({
      Domain: 'cdn.example.com',
      HTTPS: {
        Switch: true,
        CertInfo: { CertId: 'cert-volc-1' },
      },
    });
    expect(lastCall().data.HTTPS).not.toHaveProperty('HTTP2');
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
