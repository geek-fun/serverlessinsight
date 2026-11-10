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

// Origin lines use two distinct fields (UpdateCdnConfig error codes):
// `OriginType` is the primary/backup slot, `InstanceType` is the origin kind
// (TOS/OSS/COS/Domain/IP). For a TOS origin the pull address is the bucket's
// virtual-host endpoint.
const toOriginLines = (origin: VolcengineCdnOriginConfig): Array<Record<string, unknown>> =>
  origin.originLines.map((line) => ({
    OriginType: line.originType,
    ...(line.instanceType ? { InstanceType: line.instanceType } : {}),
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

    // Cache rules are seconds-based TTLs (si time-unit convention). The Cache
    // module has a built-in lowest-priority default rule matching everything,
    // so a single match-all rule is the domain-wide TTL.
    // `null` renders the provider-default behavior — follow-origin caching /
    // query string kept in the cache key — so a dropped si option converges
    // the cloud instead of leaving the previous rule behind (issue #294).
    // CacheKey: `exclude` drops the whole query string from the cache key,
    // `include` (with Subobject '*') restores the default. `excludePart` is
    // for naming specific parameters and rejects '*'.
    applyCacheConfig: async (
      domainName: string,
      cacheTtl?: number | null,
      ignoreQueryString?: boolean | null,
    ): Promise<void> => {
      const body: Record<string, unknown> = { Domain: domainName };
      body.Cache = [
        {
          Condition: MATCH_ALL_CONDITION,
          ...(cacheTtl != null
            ? { CacheAction: { Action: 'cache', Ttl: cacheTtl } }
            : { CacheAction: { Action: 'follow_origin' } }),
        },
      ];
      body.CacheKey = [
        {
          CacheKeyAction: {
            CacheKeyComponents: [
              ignoreQueryString
                ? { Object: 'queryString', Action: 'exclude', Subobject: '*' }
                : { Object: 'queryString', Action: 'include', Subobject: '*', IgnoreCase: true },
            ],
          },
          Condition: MATCH_ALL_CONDITION,
        },
      ];
      await fetchCdn('UpdateCdnConfig', body);
    },

    // Smart compression: `Switch` enables the module and `CompressionRules`
    // carries a match-all rule. CompressionType takes lowercase algorithm
    // names ('gzip' / 'br').
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
                    CompressionAction: { CompressionType: ['gzip'] },
                  },
                ],
              }
            : {}),
        },
      });
    },

    // HTTP→HTTPS redirect lives under HTTPS.ForcedRedirect (not the
    // HttpForcedRedirect module, which downgrades HTTPS to HTTP and is
    // mutually exclusive with it). The provider requires HTTPS to be enabled
    // first, so the caller applies the certificate before this.
    applyHttpsRedirect: async (domainName: string, enabled?: boolean): Promise<void> => {
      if (enabled == null) return;
      await fetchCdn('UpdateCdnConfig', {
        Domain: domainName,
        HTTPS: {
          Switch: true,
          ForcedRedirect: {
            EnableForcedRedirect: enabled,
            StatusCode: '301',
          },
        },
      });
    },

    // HTTPS must be on for any redirect; HTTP2 is left at the provider default
    // (the API currently rejects enabling it).
    applyCertificate: async (domainName: string, certificateId: string): Promise<void> => {
      await fetchCdn('UpdateCdnConfig', {
        Domain: domainName,
        HTTPS: {
          Switch: true,
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
