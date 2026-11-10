import { Service } from '@volcengine/openapi';
import { createDnsOperations } from '../../../../src/common/volcengineClient/dnsOperations';

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

type MockDnsClient = {
  fetchOpenAPI: jest.Mock;
};

const createMockDnsClient = (): MockDnsClient => ({
  fetchOpenAPI: jest.fn(),
});

describe('dnsOperations (issue #294)', () => {
  let operations: ReturnType<typeof createDnsOperations>;
  let mockClient: MockDnsClient;

  const callsByAction = (action: string) =>
    mockClient.fetchOpenAPI.mock.calls
      .filter((call) => call[0].Action === action)
      .map((call) => call[0].data);

  beforeEach(() => {
    mockClient = createMockDnsClient();
    // Default: resolve the example.com zone and no records.
    mockClient.fetchOpenAPI.mockImplementation(async (params: { Action: string }) => {
      if (params.Action === 'ListZones') {
        return { Result: { Total: 1, Zones: [{ ZID: 32100, ZoneName: 'example.com' }] } };
      }
      if (params.Action === 'ListRecords') {
        return { Result: { Records: [] } };
      }
      return { Result: {} };
    });
    operations = createDnsOperations(mockClient as unknown as Service);
  });

  it('throws when the client is not initialized', async () => {
    const ops = createDnsOperations(null);
    await expect(
      ops.addDomainRecord({ domainName: 'example.com', host: 'www', type: 'CNAME', value: 'a.b' }),
    ).rejects.toThrow('VOLCENGINE_DNS_CLIENT_NOT_INITIALIZED');
  });

  it('addDomainRecord resolves the zone by name and creates the record', async () => {
    const recordId = await operations.addDomainRecord({
      domainName: 'example.com',
      host: 'cdn',
      type: 'CNAME',
      value: 'cdn.example.com.boscdn.com',
      ttl: 600,
    });

    expect(recordId).toBeUndefined();
    expect(callsByAction('ListZones')[0]).toEqual({ PageSize: 100, PageNumber: 1 });
    expect(callsByAction('ListRecords')[0]).toEqual({
      ZID: 32100,
      Host: 'cdn',
      Type: 'CNAME',
      PageSize: 100,
    });
    expect(callsByAction('CreateRecord')[0]).toEqual({
      ZID: 32100,
      Host: 'cdn',
      Type: 'CNAME',
      Value: 'cdn.example.com.boscdn.com',
      Line: 'default',
      TTL: 600,
    });
  });

  it('addDomainRecord returns the created RecordID and skips TTL when unset', async () => {
    mockClient.fetchOpenAPI.mockImplementation(async (params: { Action: string }) => {
      if (params.Action === 'ListZones') {
        return { Result: { Total: 1, Zones: [{ ZID: 32100, ZoneName: 'example.com' }] } };
      }
      if (params.Action === 'ListRecords') {
        return { Result: { Records: [] } };
      }
      if (params.Action === 'CreateRecord') {
        return { Result: { RecordID: 'rec-1' } };
      }
      return { Result: {} };
    });

    const recordId = await operations.addDomainRecord({
      domainName: 'example.com',
      host: 'cdn',
      type: 'CNAME',
      value: 'cdn.example.com.boscdn.com',
    });

    expect(recordId).toBe('rec-1');
    expect(callsByAction('CreateRecord')[0]).not.toHaveProperty('TTL');
  });

  it('addDomainRecord adopts an existing record that already points at the target', async () => {
    mockClient.fetchOpenAPI.mockImplementation(async (params: { Action: string }) => {
      if (params.Action === 'ListZones') {
        return { Result: { Total: 1, Zones: [{ ZID: 32100, ZoneName: 'example.com' }] } };
      }
      if (params.Action === 'ListRecords') {
        return {
          Result: {
            Records: [
              {
                RecordID: 12345,
                FQDN: 'cdn.example.com',
                Host: 'cdn',
                Type: 'CNAME',
                Value: 'cdn.example.com.boscdn.com',
              },
            ],
          },
        };
      }
      return { Result: {} };
    });

    const recordId = await operations.addDomainRecord({
      domainName: 'example.com',
      host: 'cdn',
      type: 'CNAME',
      value: 'cdn.example.com.boscdn.com',
    });

    // Numeric provider ids are normalized to strings.
    expect(recordId).toBe('12345');
    expect(callsByAction('UpdateRecord')).toHaveLength(0);
    expect(callsByAction('CreateRecord')).toHaveLength(0);
  });

  it('addDomainRecord never overwrites a foreign CNAME pointing elsewhere', async () => {
    mockClient.fetchOpenAPI.mockImplementation(async (params: { Action: string }) => {
      if (params.Action === 'ListZones') {
        return { Result: { Total: 1, Zones: [{ ZID: 32100, ZoneName: 'example.com' }] } };
      }
      if (params.Action === 'ListRecords') {
        return {
          Result: {
            Records: [
              {
                RecordID: 'rec-foreign',
                FQDN: 'cdn.example.com',
                Host: 'cdn',
                Type: 'CNAME',
                Value: 'other-service.example.net',
              },
            ],
          },
        };
      }
      if (params.Action === 'CreateRecord') {
        throw Object.assign(new Error('RecordExists'), { code: 'RecordAlreadyExists' });
      }
      return { Result: {} };
    });

    const recordId = await operations.addDomainRecord({
      domainName: 'example.com',
      host: 'cdn',
      type: 'CNAME',
      value: 'cdn.example.com.boscdn.com',
    });

    expect(recordId).toBeUndefined();
    expect(callsByAction('UpdateRecord')).toHaveLength(0);
    // The create attempt fails on the provider's duplicate-host guard; si
    // reports the domain as unmanaged rather than repointing traffic.
    expect(callsByAction('CreateRecord')).toHaveLength(1);
  });

  it('addDomainRecord pages through ListZones until the zone matches', async () => {
    mockClient.fetchOpenAPI.mockImplementation(
      async (params: { Action: string; data?: { PageNumber?: number } }) => {
        if (params.Action === 'ListZones') {
          return params.data?.PageNumber === 1
            ? { Result: { Total: 150, Zones: [{ ZID: 1, ZoneName: 'other.com' }] } }
            : { Result: { Total: 150, Zones: [{ ZID: 777, ZoneName: 'example.com' }] } };
        }
        if (params.Action === 'ListRecords') return { Result: { Records: [] } };
        return { Result: { RecordID: 'rec-paged' } };
      },
    );

    const recordId = await operations.addDomainRecord({
      domainName: 'example.com',
      host: 'cdn',
      type: 'CNAME',
      value: 'target',
    });

    expect(recordId).toBe('rec-paged');
    expect(callsByAction('ListZones').map((d) => d.PageNumber)).toEqual([1, 2]);
    expect(callsByAction('CreateRecord')[0]).toEqual(expect.objectContaining({ ZID: 777 }));
  });

  it('addDomainRecord stops when a page comes back empty', async () => {
    mockClient.fetchOpenAPI.mockImplementation(async (params: { Action: string }) => {
      if (params.Action === 'ListZones') return { Result: { Total: 999, Zones: [] } };
      return { Result: {} };
    });

    await expect(
      operations.addDomainRecord({
        domainName: 'example.com',
        host: 'cdn',
        type: 'CNAME',
        value: 'target',
      }),
    ).rejects.toThrow('DNS_ZONE_NOT_FOUND');
    expect(callsByAction('ListZones')).toHaveLength(1);
  });

  it('addDomainRecord fails loudly when the zone is not hosted in Volcengine DNS', async () => {
    mockClient.fetchOpenAPI.mockImplementation(async () => ({
      Result: { Total: 0, Zones: [] },
    }));
    await expect(
      operations.addDomainRecord({
        domainName: 'not-hosted.com',
        host: 'cdn',
        type: 'CNAME',
        value: 'x.y',
      }),
    ).rejects.toThrow('DNS_ZONE_NOT_FOUND');
  });

  it('updateDomainRecord posts the full record config (UpdateRecord requires Host+Line)', async () => {
    await operations.updateDomainRecord('rec-9', {
      domainName: 'example.com',
      host: 'www',
      type: 'CNAME',
      value: 'target',
      ttl: 300,
    });

    expect(callsByAction('UpdateRecord')[0]).toEqual({
      RecordID: 'rec-9',
      Host: 'www',
      Line: 'default',
      Type: 'CNAME',
      Value: 'target',
      TTL: 300,
    });
  });

  it('deleteDomainRecord logs the deletion on success', async () => {
    await expect(operations.deleteDomainRecord('rec-1')).resolves.toBeUndefined();
    expect(callsByAction('DeleteRecord')[0]).toEqual({ RecordID: 'rec-1' });
  });

  it('deleteDomainRecord warns and returns on not-found errors', async () => {
    mockClient.fetchOpenAPI.mockRejectedValueOnce({ code: 'RecordNotFound' });
    await expect(operations.deleteDomainRecord('rec-gone')).resolves.toBeUndefined();
    expect(mockClient.fetchOpenAPI).toHaveBeenCalledTimes(1);
  });

  it('deleteDomainRecord rethrows non-not-found errors', async () => {
    mockClient.fetchOpenAPI.mockRejectedValueOnce({ code: 'AccessDenied' });
    await expect(operations.deleteDomainRecord('rec-1')).rejects.toMatchObject({
      code: 'AccessDenied',
    });
  });

  it('addDomainRecord skips a zone whose ZID is not numeric', async () => {
    mockClient.fetchOpenAPI.mockImplementation(async (params: { Action: string }) => {
      if (params.Action === 'ListZones') {
        return { Result: { Total: 2, Zones: [{ ZID: 'bad', ZoneName: 'example.com' }] } };
      }
      return { Result: {} };
    });

    await expect(
      operations.addDomainRecord({
        domainName: 'example.com',
        host: 'cdn',
        type: 'CNAME',
        value: 'target',
      }),
    ).rejects.toThrow('DNS_ZONE_NOT_FOUND');
  });

  it('addDomainRecord handles a ListZones response without a Result', async () => {
    mockClient.fetchOpenAPI.mockImplementation(async () => ({}));

    await expect(
      operations.addDomainRecord({
        domainName: 'example.com',
        host: 'cdn',
        type: 'CNAME',
        value: 'target',
      }),
    ).rejects.toThrow('DNS_ZONE_NOT_FOUND');
  });

  it('addDomainRecord passes TTL when creating a missing CNAME', async () => {
    mockClient.fetchOpenAPI.mockImplementation(async (params: { Action: string }) => {
      if (params.Action === 'ListZones') {
        return { Result: { Total: 1, Zones: [{ ZID: 32100, ZoneName: 'example.com' }] } };
      }
      if (params.Action === 'ListRecords') return { Result: { Records: [] } };
      return { Result: { RecordID: 'rec-new' } };
    });

    await operations.addDomainRecord({
      domainName: 'example.com',
      host: 'cdn',
      type: 'CNAME',
      value: 'new',
      ttl: 600,
    });

    expect(callsByAction('CreateRecord')[0]).toEqual({
      ZID: 32100,
      Host: 'cdn',
      Line: 'default',
      Type: 'CNAME',
      Value: 'new',
      TTL: 600,
    });
    expect(callsByAction('UpdateRecord')).toHaveLength(0);
  });

  it('describeDomainRecords treats an absent Result as no records', async () => {
    mockClient.fetchOpenAPI.mockImplementation(async (params: { Action: string }) => {
      if (params.Action === 'ListZones') {
        return { Result: { Total: 1, Zones: [{ ZID: 32100, ZoneName: 'example.com' }] } };
      }
      return {};
    });

    await expect(operations.describeDomainRecords('example.com', 'www')).resolves.toEqual([]);
  });

  it('describeDomainRecords fills fallbacks for sparse records', async () => {
    mockClient.fetchOpenAPI.mockImplementation(async (params: { Action: string }) => {
      if (params.Action === 'ListZones') {
        return { Result: { Total: 1, Zones: [{ ZID: 32100, ZoneName: 'example.com' }] } };
      }
      if (params.Action === 'ListRecords') {
        return { Result: { Records: [{ RecordID: 'rec-sparse' }] } };
      }
      return { Result: {} };
    });

    const records = await operations.describeDomainRecords('example.com', 'www');

    expect(records).toEqual([
      { recordId: 'rec-sparse', domain: 'example.com', host: 'www', type: 'CNAME', value: '' },
    ]);
  });

  it('deleteDomainRecord handles a thrown value with no code', async () => {
    mockClient.fetchOpenAPI.mockRejectedValueOnce(null);
    await expect(operations.deleteDomainRecord('rec-1')).rejects.toBeNull();
  });

  it('updateDomainRecord omits TTL when unset', async () => {
    await operations.updateDomainRecord('rec-3', {
      domainName: 'example.com',
      host: 'www',
      type: 'CNAME',
      value: 'target',
    });

    expect(callsByAction('UpdateRecord')[0]).not.toHaveProperty('TTL');
  });

  it('describeDomainRecords lists CNAME records for the zone and host', async () => {
    mockClient.fetchOpenAPI.mockImplementation(async (params: { Action: string }) => {
      if (params.Action === 'ListZones') {
        return { Result: { Total: 1, Zones: [{ ZID: 32100, ZoneName: 'example.com' }] } };
      }
      if (params.Action === 'ListRecords') {
        return {
          Result: {
            Records: [
              {
                RecordID: 'rec-2',
                FQDN: 'www.example.com',
                Host: 'www',
                Type: 'CNAME',
                Value: 'v',
              },
            ],
          },
        };
      }
      return { Result: {} };
    });

    const records = await operations.describeDomainRecords('example.com', 'www');

    expect(callsByAction('ListRecords')[0]).toEqual({
      ZID: 32100,
      Host: 'www',
      Type: 'CNAME',
      PageSize: 100,
    });
    expect(records).toEqual([
      { recordId: 'rec-2', domain: 'www.example.com', host: 'www', type: 'CNAME', value: 'v' },
    ]);
  });
});
