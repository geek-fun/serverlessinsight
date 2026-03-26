import { createDnsOperations } from '../../../../src/common/aliyunClient/dnsOperations';
import * as dns from '@alicloud/alidns20150109';

const mockAddDomainRecord = jest.fn();
const mockDeleteDomainRecord = jest.fn();
const mockDescribeDomainRecords = jest.fn();

const mockDnsClient = {
  addDomainRecord: mockAddDomainRecord,
  deleteDomainRecord: mockDeleteDomainRecord,
  describeDomainRecords: mockDescribeDomainRecords,
} as unknown as InstanceType<typeof dns.default>;

describe('DnsOperations', () => {
  let operations: ReturnType<typeof createDnsOperations>;

  beforeEach(() => {
    jest.clearAllMocks();
    operations = createDnsOperations(mockDnsClient);
  });

  describe('addDomainRecord', () => {
    it('should add domain record with all parameters', async () => {
      const recordId = 'record-12345';
      mockAddDomainRecord.mockResolvedValue({
        body: { recordId },
      });

      const result = await operations.addDomainRecord({
        domainName: 'example.com',
        rr: 'www',
        type: 'A',
        value: '192.168.1.1',
        ttl: 600,
      });

      expect(mockAddDomainRecord).toHaveBeenCalledWith(
        expect.objectContaining({
          domainName: 'example.com',
          RR: 'www',
          type: 'A',
          value: '192.168.1.1',
          TTL: 600,
        }),
      );
      expect(result).toBe(recordId);
    });

    it('should use default TTL of 600 when ttl not provided', async () => {
      const recordId = 'record-12345';
      mockAddDomainRecord.mockResolvedValue({
        body: { recordId },
      });

      await operations.addDomainRecord({
        domainName: 'example.com',
        rr: 'www',
        type: 'CNAME',
        value: 'target.example.com',
      });

      expect(mockAddDomainRecord).toHaveBeenCalledWith(
        expect.objectContaining({
          TTL: 600,
        }),
      );
    });

    it('should return empty string when body recordId is missing', async () => {
      mockAddDomainRecord.mockResolvedValue({
        body: {},
      });

      const result = await operations.addDomainRecord({
        domainName: 'example.com',
        rr: 'test',
        type: 'TXT',
        value: 'verification-token',
      });

      expect(result).toBe('');
    });

    it('should return empty string when body is null', async () => {
      mockAddDomainRecord.mockResolvedValue({
        body: null,
      });

      const result = await operations.addDomainRecord({
        domainName: 'example.com',
        rr: 'test',
        type: 'TXT',
        value: 'verification-token',
      });

      expect(result).toBe('');
    });
  });

  describe('deleteDomainRecord', () => {
    it('should delete domain record by recordId', async () => {
      const recordId = 'record-12345';
      mockDeleteDomainRecord.mockResolvedValue({});

      await operations.deleteDomainRecord(recordId);

      expect(mockDeleteDomainRecord).toHaveBeenCalledWith(
        expect.objectContaining({
          recordId,
        }),
      );
    });

    it('should handle successful deletion', async () => {
      mockDeleteDomainRecord.mockResolvedValue({
        body: {},
      });

      await expect(operations.deleteDomainRecord('record-xyz')).resolves.toBeUndefined();
    });
  });

  describe('describeDomainRecords', () => {
    it('should describe domain records with domain name only', async () => {
      const records = [
        {
          recordId: 'rec-1',
          domainName: 'example.com',
          RR: 'www',
          type: 'A',
          value: '192.168.1.1',
          TTL: 600,
          status: 'ENABLE',
        },
        {
          recordId: 'rec-2',
          domainName: 'example.com',
          RR: 'mail',
          type: 'MX',
          value: 'mail.example.com',
          TTL: 600,
          status: 'ENABLE',
        },
      ];

      mockDescribeDomainRecords.mockResolvedValue({
        body: {
          domainRecords: {
            record: records,
          },
        },
      });

      const result = await operations.describeDomainRecords('example.com');

      expect(mockDescribeDomainRecords).toHaveBeenCalledWith(
        expect.objectContaining({
          domainName: 'example.com',
        }),
      );
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        recordId: 'rec-1',
        domainName: 'example.com',
        rr: 'www',
        type: 'A',
        value: '192.168.1.1',
        ttl: 600,
        status: 'ENABLE',
      });
    });

    it('should describe domain records with RR keyword filter', async () => {
      const records = [
        {
          recordId: 'rec-1',
          domainName: 'example.com',
          RR: 'www',
          type: 'A',
          value: '192.168.1.1',
          TTL: 600,
          status: 'ENABLE',
        },
      ];

      mockDescribeDomainRecords.mockResolvedValue({
        body: {
          domainRecords: {
            record: records,
          },
        },
      });

      const result = await operations.describeDomainRecords('example.com', 'www');

      expect(mockDescribeDomainRecords).toHaveBeenCalledWith(
        expect.objectContaining({
          domainName: 'example.com',
          RRKeyWord: 'www',
        }),
      );
      expect(result).toHaveLength(1);
    });

    it('should return empty array when no records found', async () => {
      mockDescribeDomainRecords.mockResolvedValue({
        body: {
          domainRecords: {
            record: [],
          },
        },
      });

      const result = await operations.describeDomainRecords('example.com');

      expect(result).toEqual([]);
    });

    it('should return empty array when domainRecords is missing', async () => {
      mockDescribeDomainRecords.mockResolvedValue({
        body: {},
      });

      const result = await operations.describeDomainRecords('example.com');

      expect(result).toEqual([]);
    });

    it('should return empty array when body is null', async () => {
      mockDescribeDomainRecords.mockResolvedValue({
        body: null,
      });

      const result = await operations.describeDomainRecords('example.com');

      expect(result).toEqual([]);
    });
  });

  describe('checkDomainRecordExists', () => {
    it('should return true when record exists with matching rr', async () => {
      const records = [
        {
          recordId: 'rec-1',
          domainName: 'example.com',
          rr: 'www',
          type: 'A',
          value: '192.168.1.1',
        },
      ];

      mockDescribeDomainRecords.mockResolvedValue({
        body: {
          domainRecords: {
            record: records.map((r) => ({ ...r, RR: r.rr, TTL: 600 })),
          },
        },
      });

      const result = await operations.checkDomainRecordExists('example.com', 'www');

      expect(result).toBe(true);
      expect(mockDescribeDomainRecords).toHaveBeenCalledWith(
        expect.objectContaining({
          domainName: 'example.com',
          RRKeyWord: 'www',
        }),
      );
    });

    it('should return false when record exists but rr does not match', async () => {
      const records = [
        {
          recordId: 'rec-1',
          domainName: 'example.com',
          RR: 'mail',
          type: 'A',
          value: '192.168.1.1',
          TTL: 600,
        },
      ];

      mockDescribeDomainRecords.mockResolvedValue({
        body: {
          domainRecords: {
            record: records,
          },
        },
      });

      const result = await operations.checkDomainRecordExists('example.com', 'www');

      expect(result).toBe(false);
    });

    it('should return false when no records found', async () => {
      mockDescribeDomainRecords.mockResolvedValue({
        body: {
          domainRecords: {
            record: [],
          },
        },
      });

      const result = await operations.checkDomainRecordExists('example.com', 'www');

      expect(result).toBe(false);
    });

    it('should return false when describeDomainRecords throws error', async () => {
      mockDescribeDomainRecords.mockRejectedValue(new Error('DNS API error'));

      const result = await operations.checkDomainRecordExists('example.com', 'www');

      expect(result).toBe(false);
    });

    it('should return false when describeDomainRecords throws non-Error exception', async () => {
      mockDescribeDomainRecords.mockRejectedValue('Network timeout');

      const result = await operations.checkDomainRecordExists('example.com', 'www');

      expect(result).toBe(false);
    });
  });
});
