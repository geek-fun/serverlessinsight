import DnsClient from '@alicloud/alidns20150109';
import * as dns from '@alicloud/alidns20150109';

type DnsSdkClient = DnsClient;

/**
 * DNS record configuration
 */
export type DnsRecordConfig = {
  domainName: string;
  rr: string;
  type: string;
  value: string;
  ttl?: number;
};

/**
 * DNS record info
 */
export type DnsRecordInfo = {
  recordId?: string;
  domainName?: string;
  rr?: string;
  type?: string;
  value?: string;
  ttl?: number;
  status?: string;
};

/**
 * Create DNS operations
 */
export function createDnsOperations(dnsClient: DnsSdkClient) {
  const operations = {
    /**
     * Add a DNS record
     */
    addDomainRecord: async (config: DnsRecordConfig): Promise<string> => {
      const request = new dns.AddDomainRecordRequest({
        domainName: config.domainName,
        RR: config.rr,
        type: config.type,
        value: config.value,
        TTL: config.ttl || 600,
      });

      const response = await dnsClient.addDomainRecord(request);
      return response.body?.recordId || '';
    },

    /**
     * Delete a DNS record
     */
    deleteDomainRecord: async (recordId: string): Promise<void> => {
      const request = new dns.DeleteDomainRecordRequest({
        recordId,
      });

      await dnsClient.deleteDomainRecord(request);
    },

    /**
     * Describe domain records
     */
    describeDomainRecords: async (
      domainName: string,
      rrKeyWord?: string,
    ): Promise<Array<DnsRecordInfo>> => {
      const request = new dns.DescribeDomainRecordsRequest({
        domainName,
        RRKeyWord: rrKeyWord,
      });

      const response = await dnsClient.describeDomainRecords(request);
      const records = response.body?.domainRecords?.record || [];

      return records.map((record: dns.DescribeDomainRecordsResponseBodyDomainRecordsRecord) => ({
        recordId: record.recordId,
        domainName: record.domainName,
        rr: record.RR,
        type: record.type,
        value: record.value,
        ttl: record.TTL,
        status: record.status,
      }));
    },

    /**
     * Check if a DNS record exists
     */
    checkDomainRecordExists: async (domainName: string, rr: string): Promise<boolean> => {
      try {
        const records = await operations.describeDomainRecords(domainName, rr);
        return records.some((record) => record.rr === rr);
      } catch {
        return false;
      }
    },
  };

  return operations;
}
