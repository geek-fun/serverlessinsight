import * as tencentcloud from 'tencentcloud-sdk-nodejs-dnspod';

const DnspodClient = tencentcloud.dnspod.v20210323.Client;

type DnspodSdkClient = InstanceType<typeof DnspodClient>;

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
  deleteDomainRecord: (domainName: string, recordId: string) => Promise<void>;
  describeDomainRecords: (domainName: string, rrKeyWord?: string) => Promise<Array<DnsRecordInfo>>;
  checkDomainRecordExists: (domainName: string, rr: string) => Promise<boolean>;
};

const addDomainRecord =
  (dnsClient: DnspodSdkClient) =>
  async (config: DnsRecordConfig): Promise<string> => {
    const response = await dnsClient.CreateRecord({
      Domain: config.domainName,
      SubDomain: config.rr,
      RecordType: config.type,
      Value: config.value,
      RecordLine: '默认',
      TTL: config.ttl || 600,
    });

    return String(response.RecordId);
  };

const deleteDomainRecord =
  (dnsClient: DnspodSdkClient) =>
  async (domainName: string, recordId: string): Promise<void> => {
    await dnsClient.DeleteRecord({
      Domain: domainName,
      RecordId: parseInt(recordId, 10),
    });
  };

const describeDomainRecords =
  (dnsClient: DnspodSdkClient) =>
  async (domainName: string, rrKeyWord?: string): Promise<Array<DnsRecordInfo>> => {
    const response = await dnsClient.DescribeRecordList({
      Domain: domainName,
      Subdomain: rrKeyWord,
    });

    const records = response.RecordList || [];

    return records.map((record) => ({
      recordId: String(record.RecordId),
      domainName: domainName,
      rr: record.Name,
      type: record.Type,
      value: record.Value,
      ttl: record.TTL,
      status: record.Status,
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

export const createDnsOperations = (dnsClient: DnspodSdkClient): DnsOperations => {
  const describe = describeDomainRecords(dnsClient);

  return {
    addDomainRecord: addDomainRecord(dnsClient),
    deleteDomainRecord: deleteDomainRecord(dnsClient),
    describeDomainRecords: describe,
    checkDomainRecordExists: checkDomainRecordExists(describe),
  };
};

export const createDnsClient = (context: { accessKeyId: string; accessKeySecret: string }) => {
  return new DnspodClient({
    credential: {
      secretId: context.accessKeyId,
      secretKey: context.accessKeySecret,
    },
    region: '',
    profile: {
      httpProfile: {
        endpoint: 'dnspod.tencentcloudapi.com',
      },
    },
  });
};
