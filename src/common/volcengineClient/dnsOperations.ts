import { Service } from '@volcengine/openapi';
import type { OpenApiResponse } from '@volcengine/openapi/lib/base/types';
import type { VolcengineDnsRecordConfig, VolcengineDnsRecordInfo } from './types';
import { logger } from '../logger';
import { lang } from '../../lang';

type DnsSdkClient = Service;

/**
 * Volcengine TrafficRoute public DNS operations (issue #294). API host
 * `dns.volcengineapi.com`, Version `2018-08-01`; records are addressed by
 * RecordID and belong to a zone identified by a numeric ZID. si resolves the
 * zone by name (ListZones) on every record write — the domain must be hosted
 * in Volcengine DNS (same constraint class as Tencent DNSPod).
 */
export const createDnsOperations = (dnsClient: DnsSdkClient | null) => {
  const fetchDns = async <T = Record<string, unknown>>(
    action: string,
    body: Record<string, unknown>,
  ): Promise<T | undefined> => {
    if (!dnsClient) {
      throw new Error(lang.__('VOLCENGINE_DNS_CLIENT_NOT_INITIALIZED'));
    }
    const response = (await dnsClient.fetchOpenAPI({
      Action: action,
      Version: '2018-08-01',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: body,
    })) as OpenApiResponse<T>;
    return response.Result as T | undefined;
  };

  const resolveZoneId = async (domainName: string): Promise<number> => {
    const pageSize = 100;
    for (let pageNumber = 1; pageNumber <= 20; pageNumber++) {
      const result = await fetchDnsListZones(pageNumber, pageSize);
      const zones = (result?.Zones ?? []) as Array<Record<string, unknown>>;
      const match = zones.find((zone) => zone.ZoneName === domainName);
      if (match && typeof match.ZID === 'number') return match.ZID;
      const total = result?.Total ?? 0;
      if (zones.length === 0 || pageNumber * pageSize >= total) break;
    }
    throw new Error(lang.__('DNS_ZONE_NOT_FOUND', { domain: domainName }));
  };

  const fetchDnsListZones = async (pageNumber: number, pageSize: number) =>
    fetchDns<{ Zones?: Array<Record<string, unknown>>; Total?: number }>('ListZones', {
      PageSize: pageSize,
      PageNumber: pageNumber,
    });

  const describeZoneRecords = async (
    domainName: string,
    host: string,
    zid?: number,
  ): Promise<VolcengineDnsRecordInfo[]> => {
    const resolvedZid = zid ?? (await resolveZoneId(domainName));
    const result = await fetchDns<{ Records?: Array<Record<string, unknown>> }>('ListRecords', {
      ZID: resolvedZid,
      Host: host,
      Type: 'CNAME',
      PageSize: 100,
    });
    return ((result?.Records ?? []) as Array<Record<string, unknown>>).map((record) => ({
      recordId: String(record.RecordID),
      domain: (record.FQDN as string) ?? domainName,
      host: (record.Host as string) ?? host,
      type: (record.Type as string) ?? 'CNAME',
      value: (record.Value as string) ?? '',
    }));
  };

  return {
    /**
     * Value-matched record management (unified with the Tencent DNSPod flow):
     * a record that already points at the requested target is adopted as-is,
     * a missing one is created. Records pointing elsewhere are never touched —
     * the create fails on the provider's duplicate-host guard and si reports
     * the domain as not managed rather than silently repointing traffic.
     */
    addDomainRecord: async (config: VolcengineDnsRecordConfig): Promise<string | undefined> => {
      const zid = await resolveZoneId(config.domainName);
      const existing = await describeZoneRecords(config.domainName, config.host, zid);
      const matched = existing.find((record) => record.value === config.value);
      if (matched) {
        logger.info(
          lang.__('DNS_RECORD_EXISTS', {
            domain: `${config.host}.${config.domainName}`,
            value: config.value,
          }),
        );
        return matched.recordId;
      }

      try {
        const result = await fetchDns<{ RecordID?: number }>('CreateRecord', {
          ZID: zid,
          Host: config.host,
          Type: config.type,
          Value: config.value,
          Line: 'default',
          ...(config.ttl ? { TTL: config.ttl } : {}),
        });
        logger.info(
          lang.__('DNS_RECORD_CREATED', { domain: `${config.host}.${config.domainName}` }),
        );
        return result?.RecordID != null ? String(result.RecordID) : undefined;
      } catch (error) {
        logger.warn(
          lang.__('DNS_RECORD_FOREIGN_EXISTS', {
            domain: `${config.host}.${config.domainName}`,
            value: config.value,
          }),
        );
        logger.debug(lang.__('DNS_OPERATION_ERROR', { error: String(error) }));
        return undefined;
      }
    },

    // UpdateRecord requires Host and Line on every call, so the full record
    // config is passed instead of a partial patch.
    updateDomainRecord: async (
      recordId: string,
      config: VolcengineDnsRecordConfig,
    ): Promise<void> => {
      await fetchDns('UpdateRecord', {
        RecordID: recordId,
        Host: config.host,
        Line: 'default',
        Type: config.type,
        Value: config.value,
        ...(config.ttl ? { TTL: config.ttl } : {}),
      });
    },

    deleteDomainRecord: async (recordId: string): Promise<void> => {
      try {
        await fetchDns('DeleteRecord', { RecordID: recordId });
      } catch (error) {
        const code = (error as { code?: string } | null)?.code ?? '';
        if (code.includes('NotFound') || code === 'ResourceNotFound') {
          logger.warn(
            lang.__('RESOURCE_NOT_FOUND_PROVIDER', { resourceType: 'DNS record', name: recordId }),
          );
          return;
        }
        throw error;
      }
      logger.debug(lang.__('DNS_RECORD_DELETED', { recordId }));
    },

    describeDomainRecords: async (
      domainName: string,
      host: string,
    ): Promise<VolcengineDnsRecordInfo[]> => describeZoneRecords(domainName, host),
  };
};
