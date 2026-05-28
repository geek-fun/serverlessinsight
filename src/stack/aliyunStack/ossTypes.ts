import { BucketAccessEnum, BucketDomain, ResourceAttributes } from '../../types';
import { BucketACL, CommonBucketConfig } from '../bucketTypes';

export type OssBucketConfig = CommonBucketConfig & {
  wwwBindApex?: boolean;
  domainCertificateId?: string;
  domainCertificateBody?: string;
  domainCertificatePrivateKey?: string;
  domainProtocol?: string | string[];
  cdnEnabled?: boolean;
  cdnType?: 'web' | 'download' | 'video';
  cdnScope?: 'domestic' | 'overseas' | 'global';
  cdnCacheTtl?: number;
  cdnIgnoreQueryString?: boolean;
  cdnOriginProtocol?: 'http' | 'https' | 'follow';
  cdnCompression?: boolean;
  cdnForceRedirectHttps?: boolean;
  accelerateEnabled?: boolean;
  versioningStatus?: string;
  sseAlgorithm?: string;
  sseKmsMasterKeyId?: string;
};

const aclMap: Record<BucketAccessEnum, BucketACL> = {
  [BucketAccessEnum.PRIVATE]: BucketACL.PRIVATE,
  [BucketAccessEnum.PUBLIC_READ]: BucketACL.PUBLIC_READ,
  [BucketAccessEnum.PUBLIC_READ_WRITE]: BucketACL.PUBLIC_READ_WRITE,
};

const getDomain = (bucket: BucketDomain): string | undefined => {
  if (bucket.domain?.domain_name) return bucket.domain.domain_name;
  return bucket.website?.domain;
};

/* istanbul ignore next */
export const bucketToOssBucketConfig = (bucket: BucketDomain): OssBucketConfig => {
  const config: OssBucketConfig = {
    bucketName: bucket.name,
  };

  if (bucket.security?.acl) {
    config.acl = aclMap[bucket.security.acl];
  }

  if (bucket.website) {
    config.websiteConfig = {
      indexDocument: bucket.website.index,
    };

    if (bucket.website.error_page) {
      config.websiteConfig.errorDocument = bucket.website.error_page;
    }
  }

  if (bucket.storage?.class) {
    config.storageClass = bucket.storage.class;
  }

  const domain = getDomain(bucket);
  if (domain) {
    config.domain = domain;
  }

  if (bucket.domain) {
    config.wwwBindApex = bucket.domain.www_bind_apex;
    config.domainCertificateId = bucket.domain.certificate_id;
    config.domainCertificateBody = bucket.domain.certificate_body;
    config.domainCertificatePrivateKey = bucket.domain.certificate_private_key;
    config.domainProtocol = bucket.domain.protocol;
    config.accelerateEnabled = bucket.domain.accelerate;

    if (bucket.domain.cdn != null) {
      if (typeof bucket.domain.cdn === 'boolean') {
        config.cdnEnabled = bucket.domain.cdn;
      } else {
        config.cdnEnabled = bucket.domain.cdn.enabled;
        config.cdnType = bucket.domain.cdn.cdn_type;
        config.cdnScope = bucket.domain.cdn.scope;
        config.cdnCacheTtl = bucket.domain.cdn.cache_ttl;
        config.cdnIgnoreQueryString = bucket.domain.cdn.ignore_query_string;
        config.cdnOriginProtocol = bucket.domain.cdn.origin_protocol;
        config.cdnCompression = bucket.domain.cdn.compression;
        config.cdnForceRedirectHttps = bucket.domain.cdn.force_redirect_https;
      }
    }
  } else if (bucket.website?.domain) {
    config.wwwBindApex = bucket.website.www_bind_apex;
    config.domainCertificateId = bucket.website.domain_certificate_id;
    config.domainCertificateBody = bucket.website.domain_certificate_body;
    config.domainCertificatePrivateKey = bucket.website.domain_certificate_private_key;
    config.domainProtocol = bucket.website.domain_protocol;
  }

  if (bucket.versioning?.status) {
    config.versioningStatus = bucket.versioning.status;
  }

  if (bucket.security?.sse_algorithm) {
    config.sseAlgorithm = bucket.security.sse_algorithm;
  }

  if (bucket.security?.sse_kms_master_key_id) {
    config.sseKmsMasterKeyId = bucket.security.sse_kms_master_key_id;
  }

  return config;
};

/* istanbul ignore next */
export const extractOssBucketDefinition = (
  config: OssBucketConfig,
  websiteCodeHash?: string | null,
): ResourceAttributes => {
  const def: ResourceAttributes = {
    bucketName: config.bucketName,
    acl: config.acl ?? null,
    websiteConfiguration: config.websiteConfig
      ? {
          indexDocument: config.websiteConfig.indexDocument,
          errorDocument: config.websiteConfig.errorDocument ?? null,
        }
      : {},
    websiteCodeHash: websiteCodeHash ?? null,
    storageClass: config.storageClass ?? null,
    domain: config.domain ?? null,
    wwwBindApex: config.wwwBindApex ?? false,
    domainCertificateId: config.domainCertificateId ?? null,
    domainCertificateBody: config.domainCertificateBody ?? null,
    domainCertificatePrivateKey: config.domainCertificatePrivateKey ? '(managed)' : null,
    domainProtocol: config.domainProtocol ?? null,
    versioningStatus: config.versioningStatus ?? null,
    sseAlgorithm: config.sseAlgorithm ?? null,
    sseKmsMasterKeyId: config.sseKmsMasterKeyId ?? null,
  };

  // Only include CDN/accelerate fields when they're actually enabled
  if (config.cdnEnabled) {
    def.cdnEnabled = true;
    if (config.cdnType) def.cdnType = config.cdnType;
    if (config.cdnScope) def.cdnScope = config.cdnScope;
    if (config.cdnCacheTtl != null) def.cdnCacheTtl = config.cdnCacheTtl;
    if (config.cdnIgnoreQueryString != null) def.cdnIgnoreQueryString = config.cdnIgnoreQueryString;
    if (config.cdnOriginProtocol) def.cdnOriginProtocol = config.cdnOriginProtocol;
    if (config.cdnCompression != null) def.cdnCompression = config.cdnCompression;
    if (config.cdnForceRedirectHttps != null)
      def.cdnForceRedirectHttps = config.cdnForceRedirectHttps;
  }
  if (config.accelerateEnabled) {
    def.accelerateEnabled = true;
  }

  return def;
};
