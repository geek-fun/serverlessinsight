import * as tencentcloud from 'tencentcloud-sdk-nodejs-cdn';
import type { UpdateDomainConfigRequest } from 'tencentcloud-sdk-nodejs-cdn/tencentcloud/services/cdn/v20180606/cdn_models';
import { lang } from '../../lang';
import { logger } from '../logger';

const CdnClient = tencentcloud.cdn.v20180606.Client;

type CdnSdkClient = InstanceType<typeof CdnClient>;

export type TencentCdnOriginConfig = {
  originType: string;
  origins: string[];
  /** Required by Tencent when originType is `cos`: the origin-pull Host header. */
  serverName?: string;
  cosPrivateAccess?: string;
  originPullProtocol?: string;
};

export type TencentCdnDomainConfig = {
  domainName: string;
  serviceType: string;
  area: string;
  origin: TencentCdnOriginConfig;
};

export type TencentCdnDeliveryUpdate = {
  serviceType?: string;
  area?: string;
  origin?: TencentCdnOriginConfig;
};

export type TencentCdnOriginInfo = {
  originType?: string;
  origins?: string[];
  serverName?: string;
};

export type TencentCdnDomainInfo = {
  domainName?: string;
  cname?: string;
  status?: string;
  serviceType?: string;
  /** Surfaced so stacks can verify an existing domain's origin before adopting it. */
  origin?: TencentCdnOriginInfo;
};

export type TencentCdnOperations = {
  addCdnDomain: (config: TencentCdnDomainConfig) => Promise<void>;
  describeCdnDomain: (domainName: string) => Promise<TencentCdnDomainInfo | null>;
  deleteCdnDomain: (domainName: string) => Promise<void>;
  updateCdnDelivery: (domainName: string, update: TencentCdnDeliveryUpdate) => Promise<void>;
  applyCacheConfig: (
    domainName: string,
    cacheTtl?: number | null,
    ignoreQueryString?: boolean | null,
  ) => Promise<void>;
  applyCompression: (domainName: string, enabled?: boolean) => Promise<void>;
  applyHttpsRedirect: (domainName: string, enabled?: boolean) => Promise<void>;
  enableHttps: (domainName: string) => Promise<void>;
};

const toOrigin = (origin: TencentCdnOriginConfig) => ({
  OriginType: origin.originType,
  Origins: origin.origins,
  ...(origin.serverName ? { ServerName: origin.serverName } : {}),
  ...(origin.cosPrivateAccess ? { CosPrivateAccess: origin.cosPrivateAccess } : {}),
  ...(origin.originPullProtocol ? { OriginPullProtocol: origin.originPullProtocol } : {}),
});

const addCdnDomain =
  (cdnClient: CdnSdkClient) =>
  async (config: TencentCdnDomainConfig): Promise<void> => {
    await cdnClient.AddCdnDomain({
      Domain: config.domainName,
      ServiceType: config.serviceType,
      Area: config.area,
      Origin: toOrigin(config.origin),
    });
  };

const describeCdnDomain =
  (cdnClient: CdnSdkClient) =>
  async (domainName: string): Promise<TencentCdnDomainInfo | null> => {
    try {
      const response = await cdnClient.DescribeDomains({
        Filters: [{ Name: 'domain', Value: [domainName] }],
        Limit: 1,
      });
      const info = response.Domains?.[0];
      if (!info || !info.Domain) return null;
      return {
        domainName: info.Domain,
        cname: info.Cname,
        status: info.Status,
        serviceType: info.ServiceType,
        origin: info.Origin
          ? {
              originType: info.Origin.OriginType,
              origins: info.Origin.Origins ?? undefined,
              serverName: info.Origin.ServerName,
            }
          : undefined,
      };
    } catch {
      return null;
    }
  };

const deleteCdnDomain =
  (cdnClient: CdnSdkClient) =>
  async (domainName: string): Promise<void> => {
    try {
      await cdnClient.DeleteCdnDomain({ Domain: domainName });
    } catch (error: unknown) {
      const code = (error as { code?: string })?.code ?? '';
      if (code.includes('NotFound') || code.includes('NotExist')) {
        logger.warn(
          lang.__('RESOURCE_NOT_FOUND_PROVIDER', { resourceType: 'CDN domain', name: domainName }),
        );
        return;
      }
      throw error;
    }
  };

const updateCdnDelivery =
  (cdnClient: CdnSdkClient) =>
  async (domainName: string, update: TencentCdnDeliveryUpdate): Promise<void> => {
    const request: UpdateDomainConfigRequest = { Domain: domainName };
    if (update.serviceType != null) request.ServiceType = update.serviceType;
    if (update.area != null) request.Area = update.area;
    if (update.origin) request.Origin = toOrigin(update.origin);
    await cdnClient.UpdateDomainConfig(request);
  };

const applyCacheConfig =
  (cdnClient: CdnSdkClient) =>
  async (
    domainName: string,
    cacheTtl?: number | null,
    ignoreQueryString?: boolean | null,
  ): Promise<void> => {
    const request: UpdateDomainConfigRequest = { Domain: domainName };
    // cache_ttl is expressed in seconds across si (issue #283); Tencent's
    // SimpleCache CacheTime is seconds-based. `null` renders the provider
    // default (FollowOrigin on, query string in the key) so a dropped si
    // option converges the cloud instead of leaving the previous override
    // behind — same contract on aliyun/volcengine.
    request.Cache = {
      SimpleCache: {
        // CacheRules is required by the API shape; FollowOrigin on makes the
        // empty rule list mean "no override, follow the origin headers".
        CacheRules:
          cacheTtl != null
            ? [{ CacheType: 'all', CacheContents: ['all'], CacheTime: cacheTtl }]
            : [],
        FollowOrigin: cacheTtl != null ? 'off' : 'on',
        IgnoreCacheControl: 'off',
        IgnoreSetCookie: 'off',
        CompareMaxAge: 'off',
      },
    };
    request.CacheKey = { FullUrlCache: ignoreQueryString ? 'off' : 'on' };
    await cdnClient.UpdateDomainConfig(request);
  };

const applyCompression =
  (cdnClient: CdnSdkClient) =>
  async (domainName: string, enabled?: boolean): Promise<void> => {
    if (enabled == null) return;
    await cdnClient.UpdateDomainConfig({
      Domain: domainName,
      Compression: { Switch: enabled ? 'on' : 'off' },
    });
  };

const applyHttpsRedirect =
  (cdnClient: CdnSdkClient) =>
  async (domainName: string, enabled?: boolean): Promise<void> => {
    if (enabled == null) return;
    await cdnClient.UpdateDomainConfig({
      Domain: domainName,
      ForceRedirect: {
        Switch: enabled ? 'on' : 'off',
        ...(enabled ? { RedirectType: 'https', RedirectStatusCode: 301 } : {}),
      },
    });
  };

const enableHttps =
  (cdnClient: CdnSdkClient) =>
  async (domainName: string): Promise<void> => {
    await cdnClient.UpdateDomainConfig({
      Domain: domainName,
      Https: { Switch: 'on', Http2: 'on' },
    });
  };

export const createTencentCdnOperations = (cdnClient: CdnSdkClient): TencentCdnOperations => ({
  addCdnDomain: addCdnDomain(cdnClient),
  describeCdnDomain: describeCdnDomain(cdnClient),
  deleteCdnDomain: deleteCdnDomain(cdnClient),
  updateCdnDelivery: updateCdnDelivery(cdnClient),
  applyCacheConfig: applyCacheConfig(cdnClient),
  applyCompression: applyCompression(cdnClient),
  applyHttpsRedirect: applyHttpsRedirect(cdnClient),
  enableHttps: enableHttps(cdnClient),
});

export { CdnClient };
