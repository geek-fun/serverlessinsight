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

  it('addDomainRecord updates an existing CNAME instead of creating a duplicate', async () => {
    mockClient.fetchOpenAPI.mockImplementation(async (params: { Action: string }) => {
      if (params.Action === 'ListZones') {
        return { Result: { Total: 1, Zones: [{ ZID: 32100, ZoneName: 'example.com' }] } };
      }
      if (params.Action === 'ListRecords') {
        return {
          Result: {
            Records: [
              {
                RecordID: 'rec-existing',
                FQDN: 'cdn.example.com',
                Host: 'cdn',
                Type: 'CNAME',
                Value: 'old.boscdn.com',
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

    expect(recordId).toBe('rec-existing');
    expect(callsByAction('UpdateRecord')[0]).toEqual({
      RecordID: 'rec-existing',
      Host: 'cdn',
      Line: 'default',
      Type: 'CNAME',
      Value: 'cdn.example.com.boscdn.com',
    });
    expect(callsByAction('CreateRecord')).toHaveLength(0);
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
