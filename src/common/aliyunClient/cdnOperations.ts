import CdnClient from '@alicloud/cdn20180510';
import * as cdn from '@alicloud/cdn20180510';

type CdnSdkClient = CdnClient;

export type CdnDomainConfig = {
  domainName: string;
  // si union (issue #283); per-provider legality is guarded by the capability
  // registry, so the wrapper stays string-typed.
  cdnType: string;
  sources: Array<{
    type: string;
    content: string;
    port?: number;
    priority?: number;
    weight?: number;
  }>;
  scope?: string;
  checkUrl?: string;
};

export type CdnDomainInfo = {
  domainName?: string;
  cname?: string;
  status?: string;
  scope?: string;
  cdnType?: string;
};

export type CdnCertificateConfig = {
  certName?: string;
  certType?: 'upload' | 'cas' | 'free';
  certId?: number;
  serverCertificate?: string;
  privateKey?: string;
  serverCertificateStatus?: 'on' | 'off';
  certRegion?: string;
};

export type CdnOperations = {
  addCdnDomain: (config: CdnDomainConfig) => Promise<void>;
  describeCdnDomainDetail: (domainName: string) => Promise<CdnDomainInfo | null>;
  deleteCdnDomain: (domainName: string) => Promise<void>;
  modifyCdnDomain: (config: Partial<CdnDomainConfig>) => Promise<void>;
  setDomainServerCertificate: (domainName: string, cert: CdnCertificateConfig) => Promise<void>;
  applyCacheConfig: (
    domainName: string,
    cacheTtl?: number | null,
    ignoreQueryString?: boolean | null,
  ) => Promise<void>;
  applyProtocolConfig: (
    domainName: string,
    originProtocol?: 'http' | 'https' | 'follow' | null,
  ) => Promise<void>;
  applyCompression: (domainName: string, enabled?: boolean) => Promise<void>;
  applyHttpsRedirect: (domainName: string, enabled?: boolean | null) => Promise<void>;
};

const addCdnDomain =
  (cdnClient: CdnSdkClient) =>
  async (config: CdnDomainConfig): Promise<void> => {
    const request = new cdn.AddCdnDomainRequest({
      domainName: config.domainName,
      cdnType: config.cdnType,
      sources: JSON.stringify(
        config.sources.map((s) => ({
          type: s.type,
          content: s.content,
          port: s.port ?? 80,
          priority: s.priority ?? 20,
          weight: s.weight ?? 10,
        })),
      ),
      scope: config.scope ?? 'global',
      checkUrl: config.checkUrl,
    });
    await cdnClient.addCdnDomain(request);
  };

const describeCdnDomainDetail =
  (cdnClient: CdnSdkClient) =>
  async (domainName: string): Promise<CdnDomainInfo | null> => {
    try {
      const request = new cdn.DescribeCdnDomainDetailRequest({ domainName });
      const response = await cdnClient.describeCdnDomainDetail(request);
      const detail = response.body?.getDomainDetailModel;
      if (!detail) return null;
      return {
        domainName: detail.domainName,
        cname: detail.cname,
        status: detail.domainStatus,
        scope: detail.scope,
        cdnType: detail.cdnType,
      };
    } catch {
      return null;
    }
  };

const deleteCdnDomain =
  (cdnClient: CdnSdkClient) =>
  async (domainName: string): Promise<void> => {
    const request = new cdn.DeleteCdnDomainRequest({ domainName });
    await cdnClient.deleteCdnDomain(request);
  };

const modifyCdnDomain =
  (cdnClient: CdnSdkClient) =>
  async (config: Partial<CdnDomainConfig>): Promise<void> => {
    const request = new cdn.ModifyCdnDomainRequest({
      domainName: config.domainName,
      ...(config.cdnType ? { cdnType: config.cdnType } : {}),
      ...(config.scope ? { scope: config.scope } : {}),
      sources: config.sources
        ? JSON.stringify(
            config.sources.map((s) => ({
              type: s.type,
              content: s.content,
              port: s.port ?? 80,
              priority: s.priority ?? 20,
              weight: s.weight ?? 10,
            })),
          )
        : undefined,
    });
    await cdnClient.modifyCdnDomain(request);
  };

const setDomainServerCertificate =
  (cdnClient: CdnSdkClient) =>
  async (domainName: string, certConfig: CdnCertificateConfig): Promise<void> => {
    const request = new cdn.SetCdnDomainSSLCertificateRequest({
      domainName,
      certName: certConfig.certName,
      certType: certConfig.certType ?? 'upload',
      certId: certConfig.certId,
      SSLPub: certConfig.serverCertificate,
      SSLPri: certConfig.privateKey,
      SSLProtocol: certConfig.serverCertificateStatus ?? 'on',
      certRegion: certConfig.certRegion,
    });
    await cdnClient.setCdnDomainSSLCertificate(request);
  };

// Aliyun expresses "off" for module-style functions (cache_expire,
// force_redirect) by the absence of the config item — there is no off value,
// so a reset is a describe + delete of that function's config.
const removeDomainConfig =
  (cdnClient: CdnSdkClient) =>
  async (domainName: string, functionName: string): Promise<void> => {
    const describeRequest = new cdn.DescribeCdnDomainConfigsRequest({
      domainName,
      functionNames: functionName,
    });
    const response = await cdnClient.describeCdnDomainConfigs(describeRequest);
    const configured = response.body?.domainConfigs?.domainConfig ?? [];
    if (!configured.some((config) => config.functionName === functionName)) return;
    const deleteRequest = new cdn.BatchDeleteCdnDomainConfigRequest({
      domainNames: domainName,
      functionNames: functionName,
    });
    await cdnClient.batchDeleteCdnDomainConfig(deleteRequest);
  };

const applyCacheConfig =
  (cdnClient: CdnSdkClient) =>
  async (
    domainName: string,
    cacheTtl?: number | null,
    ignoreQueryString?: boolean | null,
  ): Promise<void> => {
    // Both options reset → the provider default is the absence of the
    // cache_expire config; a ttl of '0' would mean "do not cache", not
    // "follow origin", so deletion is the only honest reset.
    if (cacheTtl == null && ignoreQueryString == null) {
      await removeDomainConfig(cdnClient)(domainName, 'cache_expire');
      return;
    }
    const functions: Array<{
      featureName: string;
      featureParameters: Record<string, string>;
    }> = [];
    if (cacheTtl != null || ignoreQueryString != null) {
      functions.push({
        featureName: 'cache_expire',
        featureParameters: {
          cache_ttl: cacheTtl != null ? String(cacheTtl) : '0',
          ignore_query_string:
            ignoreQueryString != null ? (ignoreQueryString ? 'on' : 'off') : 'off',
          redirect_type: 'default',
        },
      });
    }
    if (functions.length > 0) {
      const request = new cdn.BatchSetCdnDomainConfigRequest({
        domainNames: domainName,
        functions: JSON.stringify(functions),
      });
      await cdnClient.batchSetCdnDomainConfig(request);
    }
  };

const applyProtocolConfig =
  (cdnClient: CdnSdkClient) =>
  async (
    domainName: string,
    originProtocol?: 'http' | 'https' | 'follow' | null,
  ): Promise<void> => {
    if (!originProtocol) {
      // Dropped option → provider default = the absence of the forward_scheme
      // config, so the reset deletes it instead of leaving the old scheme.
      await removeDomainConfig(cdnClient)(domainName, 'forward_scheme');
      return;
    }
    const functions = [
      {
        featureName: 'forward_scheme',
        featureParameters: {
          enable: originProtocol,
        },
      },
    ];
    const request = new cdn.BatchSetCdnDomainConfigRequest({
      domainNames: domainName,
      functions: JSON.stringify(functions),
    });
    await cdnClient.batchSetCdnDomainConfig(request);
  };

const applyCompression =
  (cdnClient: CdnSdkClient) =>
  async (domainName: string, enabled?: boolean): Promise<void> => {
    if (enabled != null) {
      const functions = [
        {
          featureName: 'page_compress',
          featureParameters: {
            enable: enabled ? 'on' : 'off',
          },
        },
      ];
      const request = new cdn.BatchSetCdnDomainConfigRequest({
        domainNames: domainName,
        functions: JSON.stringify(functions),
      });
      await cdnClient.batchSetCdnDomainConfig(request);
    }
  };

const applyHttpsRedirect =
  (cdnClient: CdnSdkClient) =>
  async (domainName: string, enabled?: boolean | null): Promise<void> => {
    if (enabled == null) return;
    if (!enabled) {
      // redirect_type 'http' would be an active HTTPS→HTTP downgrade —
      // disabling removes the force_redirect config instead.
      await removeDomainConfig(cdnClient)(domainName, 'force_redirect');
      return;
    }
    const functions = [
      {
        featureName: 'force_redirect',
        featureParameters: {
          redirect_code: '301',
          redirect_type: 'https',
        },
      },
    ];
    const request = new cdn.BatchSetCdnDomainConfigRequest({
      domainNames: domainName,
      functions: JSON.stringify(functions),
    });
    await cdnClient.batchSetCdnDomainConfig(request);
  };

/* istanbul ignore next */
export const createCdnOperations = (cdnClient: CdnSdkClient): CdnOperations => ({
  addCdnDomain: addCdnDomain(cdnClient),
  describeCdnDomainDetail: describeCdnDomainDetail(cdnClient),
  deleteCdnDomain: deleteCdnDomain(cdnClient),
  modifyCdnDomain: modifyCdnDomain(cdnClient),
  setDomainServerCertificate: setDomainServerCertificate(cdnClient),
  applyCacheConfig: applyCacheConfig(cdnClient),
  applyProtocolConfig: applyProtocolConfig(cdnClient),
  applyCompression: applyCompression(cdnClient),
  applyHttpsRedirect: applyHttpsRedirect(cdnClient),
});
