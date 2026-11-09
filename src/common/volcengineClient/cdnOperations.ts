import { Service } from '@volcengine/openapi';
import type { OpenApiResponse } from '@volcengine/openapi/lib/base/types';
import type {
  VolcengineCdnDeliveryUpdate,
  VolcengineCdnDomainConfig,
  VolcengineCdnDomainInfo,
  VolcengineCdnOriginConfig,
} from './types';
import { logger } from '../logger';
import { lang } from '../../lang';

type CdnSdkClient = Service;

// Match-all rule condition shared by Cache/Compression modules — the canonical
// "root directory" filter from the volcengine CDN configuration docs
// (https://docs.volcengine.com/docs/information-delivery-network/cache-configuration-1).
const MATCH_ALL_CONDITION = {
  ConditionRule: [{ Type: 'url', Object: 'directory', Operator: 'match', Value: '/' }],
};

const toOriginLines = (origin: VolcengineCdnOriginConfig): Array<Record<string, unknown>> =>
  origin.originLines.map((line) => ({
    ...(line.originType ? { OriginType: line.originType } : {}),
    ...(line.bucketName ? { BucketName: line.bucketName } : {}),
    ...(line.region ? { Region: line.region } : {}),
    ...(line.address ? { Address: line.address } : {}),
    ...(line.originHost ? { OriginHost: line.originHost } : {}),
    ...(line.privateBucketAccess != null ? { PrivateBucketAccess: line.privateBucketAccess } : {}),
    ...(line.httpPort ? { HttpPort: line.httpPort } : {}),
    ...(line.httpsPort ? { HttpsPort: line.httpsPort } : {}),
    ...(line.weight ? { Weight: line.weight } : {}),
  }));

const toOriginConfig = (origin: VolcengineCdnOriginConfig): Array<Record<string, unknown>> => [
  { OriginAction: { OriginLines: toOriginLines(origin) } },
];

const mapDomainInfo = (entry: Record<string, unknown>): VolcengineCdnDomainInfo => ({
  domain: entry.Domain as string,
  cname: entry.Cname as string | undefined,
  serviceType: entry.ServiceType as string | undefined,
  serviceRegion: entry.ServiceRegion as string | undefined,
  status: entry.Status as string | undefined,
  originProtocol: entry.OriginProtocol as string | undefined,
  https: entry.HTTPS as boolean | undefined,
  origin: (entry.PrimaryOrigin as string[] | undefined) ?? undefined,
});

export const createCdnOperations = (cdnClient: CdnSdkClient | null) => {
  const fetchCdn = async <T = Record<string, unknown>>(
    action: string,
    body: Record<string, unknown>,
  ): Promise<T | undefined> => {
    if (!cdnClient) {
      throw new Error(lang.__('VOLCENGINE_CDN_CLIENT_NOT_INITIALIZED'));
    }
    const response = (await cdnClient.fetchOpenAPI({
      Action: action,
      Version: '2021-03-01',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: body,
    })) as OpenApiResponse<T>;
    return response.Result as T | undefined;
  };

  const isNotFound = (error: unknown): boolean => {
    const code = (error as { code?: string } | null)?.code ?? '';
    return code.includes('NotFound') || code === 'ResourceNotFound';
  };

  return {
    // AddCdnDomain (https://docs.volcengine.com/docs/6454/97340): Domain /
    // ServiceType (web·download·video) / Origin / OriginProtocol
    // (http·https·followclient); 20 requests/second.
    addCdnDomain: async (config: VolcengineCdnDomainConfig): Promise<void> => {
      await fetchCdn('AddCdnDomain', {
        Domain: config.domain,
        ServiceType: config.serviceType,
        ...(config.serviceRegion ? { ServiceRegion: config.serviceRegion } : {}),
        Origin: toOriginConfig(config.origin),
        ...(config.originProtocol ? { OriginProtocol: config.originProtocol } : {}),
      });
      logger.info(lang.__('CDN_DOMAIN_CREATED', { domain: config.domain }));
    },

    describeCdnDomain: async (domainName: string): Promise<VolcengineCdnDomainInfo | null> => {
      try {
        const result = await fetchCdn<{ Data?: Array<Record<string, unknown>> }>('ListCdnDomains', {
          Domain: domainName,
          ExactMatch: true,
          PageNum: 1,
          PageSize: 10,
        });
        const entry = result?.Data?.[0];
        return entry ? mapDomainInfo(entry) : null;
      } catch (error) {
        if (isNotFound(error)) return null;
        throw error;
      }
    },

    deleteCdnDomain: async (domainName: string): Promise<void> => {
      try {
        await fetchCdn('DeleteCdnDomain', { Domain: domainName });
        logger.info(lang.__('CDN_DOMAIN_DELETED', { domain: domainName }));
      } catch (error) {
        if (isNotFound(error)) {
          logger.warn(
            lang.__('RESOURCE_NOT_FOUND_PROVIDER', {
              resourceType: 'CDN domain',
              name: domainName,
            }),
          );
          return;
        }
        throw error;
      }
    },

    // UpdateCdnConfig applies only the modules present in the body — delivery
    // fields (ServiceType/ServiceRegion/Origin/OriginProtocol) go through here.
    updateCdnDelivery: async (
      domainName: string,
      update: VolcengineCdnDeliveryUpdate,
    ): Promise<void> => {
      await fetchCdn('UpdateCdnConfig', {
        Domain: domainName,
        ...(update.serviceType ? { ServiceType: update.serviceType } : {}),
        ...(update.serviceRegion ? { ServiceRegion: update.serviceRegion } : {}),
        ...(update.origin ? { Origin: toOriginConfig(update.origin) } : {}),
        ...(update.originProtocol ? { OriginProtocol: update.originProtocol } : {}),
      });
    },

    // Cache rules are seconds-based TTLs (si time-unit convention); the
    // match-all directory rule carries DefaultPolicy 'force_cache' as the
    // domain-wide default. CacheKey: ignoreQueryString excludes the whole
    // query string from the cache key, false restores include-all.
    applyCacheConfig: async (
      domainName: string,
      cacheTtl?: number,
      ignoreQueryString?: boolean,
    ): Promise<void> => {
      const body: Record<string, unknown> = { Domain: domainName };
      if (cacheTtl != null) {
        body.Cache = [
          {
            Condition: MATCH_ALL_CONDITION,
            CacheAction: {
              Action: 'cache',
              Ttl: cacheTtl,
              DefaultPolicy: 'force_cache',
            },
          },
        ];
      }
      if (ignoreQueryString != null) {
        body.CacheKey = [
          {
            CacheKeyAction: {
              CacheKeyComponents: [
                ignoreQueryString
                  ? { Object: 'queryString', Action: 'excludePart', Subobject: '*' }
                  : { Object: 'queryString', Action: 'include', Subobject: '*', IgnoreCase: true },
              ],
            },
            Condition: MATCH_ALL_CONDITION,
          },
        ];
      }
      if (Object.keys(body).length > 1) {
        await fetchCdn('UpdateCdnConfig', body);
      }
    },

    // Smart compression: Switch enables the module, the match-all rule carries
    // the Gzip format (https://docs.volcengine.com/docs/information-delivery-network/intelligent-compression).
    applyCompression: async (domainName: string, enabled?: boolean): Promise<void> => {
      if (enabled == null) return;
      await fetchCdn('UpdateCdnConfig', {
        Domain: domainName,
        Compression: {
          Switch: enabled,
          ...(enabled
            ? {
                CompressionRules: [
                  {
                    Condition: MATCH_ALL_CONDITION,
                    CompressionAction: { CompressionType: ['Gzip'] },
                  },
                ],
              }
            : {}),
        },
      });
    },

    applyHttpsRedirect: async (domainName: string, enabled?: boolean): Promise<void> => {
      if (enabled == null) return;
      await fetchCdn('UpdateCdnConfig', {
        Domain: domainName,
        HttpForcedRedirect: {
          EnableForcedRedirect: enabled,
          StatusCode: '301',
        },
      });
    },

    applyCertificate: async (domainName: string, certificateId: string): Promise<void> => {
      await fetchCdn('UpdateCdnConfig', {
        Domain: domainName,
        HTTPS: {
          Switch: true,
          HTTP2: true,
          CertInfo: { CertId: certificateId },
        },
      });
    },

    // AddCertificate uploads a PEM pair; Repeatable false makes a same-content
    // re-upload return the existing certificate id (mirrors the Tencent SSL flow).
    addCertificate: async (input: {
      certificate: string;
      privateKey: string;
      name?: string;
    }): Promise<{ certificateId: string }> => {
      const result = await fetchCdn<{ CertId?: string }>('AddCertificate', {
        Certificate: input.certificate,
        PrivateKey: input.privateKey,
        Repeatable: false,
        ...(input.name ? { Desc: input.name } : {}),
      });
      const certificateId = result?.CertId;
      if (!certificateId) {
        throw new Error(lang.__('CDN_CERT_UPLOAD_FAILED', {}));
      }
      return { certificateId };
    },
  };
};
