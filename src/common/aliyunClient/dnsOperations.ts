import DnsClient from '@alicloud/alidns20150109';
import * as dns from '@alicloud/alidns20150109';

type DnsSdkClient = DnsClient;

export type DnsRecordConfig = {
  domainName: string;
  rr: string;
  type: string;
  value: string;
  ttl?: number;
};

export type DnsRecordInfo = {
  recordId?: string;
  domainName?: string;
  rr?: string;
  type?: string;
  value?: string;
  ttl?: number;
  status?: string;
};

export type DnsOperations = {
  addDomainRecord: (config: DnsRecordConfig) => Promise<string>;
  deleteDomainRecord: (recordId: string) => Promise<void>;
  describeDomainRecords: (domainName: string, rrKeyWord?: string) => Promise<Array<DnsRecordInfo>>;
  checkDomainRecordExists: (domainName: string, rr: string) => Promise<boolean>;
};

const addDomainRecord =
  (dnsClient: DnsSdkClient) =>
  async (config: DnsRecordConfig): Promise<string> => {
    const request = new dns.AddDomainRecordRequest({
      domainName: config.domainName,
      RR: config.rr,
      type: config.type,
      value: config.value,
      TTL: config.ttl || 600,
    });

    const response = await dnsClient.addDomainRecord(request);
    return response.body?.recordId || '';
  };

const deleteDomainRecord =
  (dnsClient: DnsSdkClient) =>
  async (recordId: string): Promise<void> => {
    const request = new dns.DeleteDomainRecordRequest({
      recordId,
    });

    await dnsClient.deleteDomainRecord(request);
  };

const describeDomainRecords =
  (dnsClient: DnsSdkClient) =>
  async (domainName: string, rrKeyWord?: string): Promise<Array<DnsRecordInfo>> => {
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
  };

const checkDomainRecordExists =
  (describeFn: (domainName: string, rrKeyWord?: string) => Promise<Array<DnsRecordInfo>>) =>
  async (domainName: string, rr: string): Promise<boolean> => {
    try {
      const records = await describeFn(domainName, rr);
      return records.some((record) => record.rr === rr);
    } catch {
      return false;
    }
  };

export const createDnsOperations = (dnsClient: DnsSdkClient): DnsOperations => {
  const describe = describeDomainRecords(dnsClient);
  
  return {
    addDomainRecord: addDomainRecord(dnsClient),
    deleteDomainRecord: deleteDomainRecord(dnsClient),
    describeDomainRecords: describe,
    checkDomainRecordExists: checkDomainRecordExists(describe),
  };
};

