import { BucketAccessEnum, BucketDomain, ResourceAttributes } from '../../types';
import { BucketACL, CommonBucketConfig } from '../bucketTypes';

export type OssBucketConfig = CommonBucketConfig & {
  wwwBindApex?: boolean;
  domainCertificateId?: string;
  domainCertificateBody?: string;
  domainCertificatePrivateKey?: string;
  domainProtocol?: string | string[];
  versioningStatus?: string;
  sseAlgorithm?: string;
  sseKmsMasterKeyId?: string;
};

// Map from domain enum to provider ACL type
const aclMap: Record<BucketAccessEnum, BucketACL> = {
  [BucketAccessEnum.PRIVATE]: BucketACL.PRIVATE,
  [BucketAccessEnum.PUBLIC_READ]: BucketACL.PUBLIC_READ,
  [BucketAccessEnum.PUBLIC_READ_WRITE]: BucketACL.PUBLIC_READ_WRITE,
};

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

  if (bucket.website?.domain) {
    config.domain = bucket.website.domain;
  }

  if (bucket.website?.www_bind_apex !== undefined) {
    config.wwwBindApex = bucket.website.www_bind_apex;
  }

  if (bucket.website?.domain_certificate_id) {
    config.domainCertificateId = bucket.website.domain_certificate_id;
  }

  if (bucket.website?.domain_certificate_body) {
    config.domainCertificateBody = bucket.website.domain_certificate_body;
  }

  if (bucket.website?.domain_certificate_private_key) {
    config.domainCertificatePrivateKey = bucket.website.domain_certificate_private_key;
  }

  if (bucket.website?.domain_protocol) {
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

export const extractOssBucketDefinition = (
  config: OssBucketConfig,
  websiteCodeHash?: string | null,
): ResourceAttributes => {
  return {
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
};
