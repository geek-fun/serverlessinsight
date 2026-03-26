import { createDnsOperations } from '../../../../src/common/tencentClient/dnspodOperations';

jest.mock('../../../../src/common/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('../../../../src/lang', () => ({
  lang: {
    __: (key: string, params?: Record<string, unknown>) => {
      if (params) return `${key}:${JSON.stringify(params)}`;
      return key;
    },
  },
}));

const mockDnspodClient = {
  CreateRecord: jest.fn(),
  DeleteRecord: jest.fn(),
  DescribeRecordList: jest.fn(),
};

describe('dnspodOperations', () => {
  let operations: ReturnType<typeof createDnsOperations>;

  beforeEach(() => {
    jest.clearAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    operations = createDnsOperations(mockDnspodClient as any);
  });

  describe('addDomainRecord', () => {
    it('should add DNS record successfully', async () => {
      mockDnspodClient.CreateRecord.mockResolvedValue({
        RecordId: 12345,
      });

      const config = {
        domainName: 'example.com',
        rr: '@',
        type: 'CNAME',
        value: 'bucket.ap-guangzhou.myqcloud.com',
      };

      const recordId = await operations.addDomainRecord(config);

      expect(recordId).toBe('12345');
      expect(mockDnspodClient.CreateRecord).toHaveBeenCalledWith({
        Domain: 'example.com',
        SubDomain: '@',
        RecordType: 'CNAME',
        Value: 'bucket.ap-guangzhou.myqcloud.com',
        RecordLine: '默认',
        TTL: 600,
      });
    });

    it('should use custom TTL when provided', async () => {
      mockDnspodClient.CreateRecord.mockResolvedValue({
        RecordId: 67890,
      });

      const config = {
        domainName: 'example.com',
        rr: 'www',
        type: 'A',
        value: '1.2.3.4',
        ttl: 3600,
      };

      await operations.addDomainRecord(config);

      expect(mockDnspodClient.CreateRecord).toHaveBeenCalledWith(
        expect.objectContaining({
          TTL: 3600,
        }),
      );
    });

    it('should handle record creation errors', async () => {
      const error = new Error('creation failed');
      mockDnspodClient.CreateRecord.mockRejectedValue(error);

      const config = {
        domainName: 'example.com',
        rr: '@',
        type: 'CNAME',
        value: 'bucket.ap-guangzhou.myqcloud.com',
      };

      await expect(operations.addDomainRecord(config)).rejects.toThrow('creation failed');
    });
  });

  describe('deleteDomainRecord', () => {
    it('should delete DNS record successfully', async () => {
      mockDnspodClient.DeleteRecord.mockResolvedValue({});

      await operations.deleteDomainRecord('example.com', '12345');

      expect(mockDnspodClient.DeleteRecord).toHaveBeenCalledWith({
        Domain: 'example.com',
        RecordId: 12345,
      });
    });

    it('should convert recordId string to number', async () => {
      mockDnspodClient.DeleteRecord.mockResolvedValue({});

      await operations.deleteDomainRecord('example.com', '99999');

      expect(mockDnspodClient.DeleteRecord).toHaveBeenCalledWith({
        Domain: 'example.com',
        RecordId: 99999,
      });
    });

    it('should handle delete errors', async () => {
      const error = new Error('delete failed');
      mockDnspodClient.DeleteRecord.mockRejectedValue(error);

      await expect(operations.deleteDomainRecord('example.com', '12345')).rejects.toThrow(
        'delete failed',
      );
    });
  });

  describe('describeDomainRecords', () => {
    it('should return all records for a domain', async () => {
      mockDnspodClient.DescribeRecordList.mockResolvedValue({
        RecordList: [
          {
            RecordId: 111,
            Name: '@',
            Type: 'A',
            Value: '1.2.3.4',
            TTL: 600,
            Status: 'enable',
          },
          {
            RecordId: 222,
            Name: 'www',
            Type: 'CNAME',
            Value: 'example.com',
            TTL: 600,
            Status: 'enable',
          },
        ],
      });

      const records = await operations.describeDomainRecords('example.com');

      expect(records).toHaveLength(2);
      expect(records[0]).toEqual(
        expect.objectContaining({
          recordId: '111',
          rr: '@',
          type: 'A',
          value: '1.2.3.4',
        }),
      );
    });

    it('should filter records by subdomain keyword when provided', async () => {
      mockDnspodClient.DescribeRecordList.mockResolvedValue({
        RecordList: [
          {
            RecordId: 222,
            Name: 'www',
            Type: 'CNAME',
            Value: 'example.com',
            TTL: 600,
            Status: 'enable',
          },
        ],
      });

      const records = await operations.describeDomainRecords('example.com', 'www');

      expect(mockDnspodClient.DescribeRecordList).toHaveBeenCalledWith({
        Domain: 'example.com',
        Subdomain: 'www',
      });
      expect(records).toHaveLength(1);
    });

    it('should return empty array when no records found', async () => {
      mockDnspodClient.DescribeRecordList.mockResolvedValue({
        RecordList: null,
      });

      const records = await operations.describeDomainRecords('example.com');

      expect(records).toEqual([]);
    });

    it('should handle describe errors', async () => {
      const error = new Error('describe failed');
      mockDnspodClient.DescribeRecordList.mockRejectedValue(error);

      await expect(operations.describeDomainRecords('example.com')).rejects.toThrow(
        'describe failed',
      );
    });
  });

  describe('checkDomainRecordExists', () => {
    it('should return true when record exists', async () => {
      mockDnspodClient.DescribeRecordList.mockResolvedValue({
        RecordList: [
          {
            RecordId: 111,
            Name: 'www',
            Type: 'CNAME',
            Value: 'example.com',
            TTL: 600,
            Status: 'enable',
          },
        ],
      });

      const exists = await operations.checkDomainRecordExists('example.com', 'www');

      expect(exists).toBe(true);
    });

    it('should return false when record does not exist', async () => {
      mockDnspodClient.DescribeRecordList.mockResolvedValue({
        RecordList: [
          {
            RecordId: 111,
            Name: 'api',
            Type: 'CNAME',
            Value: 'example.com',
            TTL: 600,
            Status: 'enable',
          },
        ],
      });

      const exists = await operations.checkDomainRecordExists('example.com', 'www');

      expect(exists).toBe(false);
    });

    it('should return false on describe error', async () => {
      const error = new Error('describe failed');
      mockDnspodClient.DescribeRecordList.mockRejectedValue(error);

      const exists = await operations.checkDomainRecordExists('example.com', 'www');

      expect(exists).toBe(false);
    });

    it('should return false when empty record list is returned', async () => {
      mockDnspodClient.DescribeRecordList.mockResolvedValue({
        RecordList: [],
      });

      const exists = await operations.checkDomainRecordExists('example.com', 'www');

      expect(exists).toBe(false);
    });

    it('should match exact subdomain name', async () => {
      mockDnspodClient.DescribeRecordList.mockResolvedValue({
        RecordList: [
          {
            RecordId: 111,
            Name: 'www',
            Type: 'CNAME',
            Value: 'example.com',
          },
          {
            RecordId: 222,
            Name: 'www-api',
            Type: 'CNAME',
            Value: 'api.example.com',
          },
        ],
      });

      const exists = await operations.checkDomainRecordExists('example.com', 'www');

      expect(exists).toBe(true);
    });
  });
});
