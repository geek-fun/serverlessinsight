import { serializeBucketPolicy } from '../../common/bucketPolicy';
import {
  BucketAccessEnum,
  BucketDomain,
  BucketDomainBinding,
  BucketIam,
  ResourceAttributes,
} from '../../types';
import type { OssBucketInfo } from '../../common/aliyunClient/ossOperations';
import { BucketACL, CommonBucketConfig } from '../bucketTypes';

export const OSS_BUCKET_POLICY_INSTANCE_TYPE = 'ALIYUN_OSS_BUCKET_POLICY';

export type OssBindingConfig = {
  domainName: string;
  certificateId?: string;
  certificateBody?: string;
  certificatePrivateKey?: string;
  protocol?: string | string[];
  cdn?:
    | boolean
    | {
        enabled: boolean;
        cdn_type?: 'web' | 'download' | 'video';
        scope?: 'domestic' | 'overseas' | 'global';
        cache_ttl?: number;
        ignore_query_string?: boolean;
        origin_protocol?: 'http' | 'https' | 'follow';
        compression?: boolean;
        force_redirect_https?: boolean;
      };
};

export type OssBucketConfig = CommonBucketConfig & {
  iam?: BucketIam;
  // Bucket-level transfer acceleration (issue #279: per-domain accelerate removed).
  accelerateEnabled?: boolean;
  domains?: OssBindingConfig[];
  versioningStatus?: string;
  sseAlgorithm?: string;
  sseKmsMasterKeyId?: string;
  Tags?: Array<{ Key: string; Value: string }>;
};

const aclMap: Record<BucketAccessEnum, BucketACL> = {
  [BucketAccessEnum.PRIVATE]: BucketACL.PRIVATE,
  [BucketAccessEnum.PUBLIC_READ]: BucketACL.PUBLIC_READ,
  [BucketAccessEnum.PUBLIC_READ_WRITE]: BucketACL.PUBLIC_READ_WRITE,
};

const isCdnEnabled = (binding: OssBindingConfig): boolean => {
  if (binding.cdn == null) return false;
  if (typeof binding.cdn === 'boolean') return binding.cdn;
  return binding.cdn.enabled;
};

export const getBindingCdnConfig = (
  binding: OssBindingConfig,
):
  | {
      enabled: boolean;
      cdn_type?: 'web' | 'download' | 'video';
      scope?: 'domestic' | 'overseas' | 'global';
      cache_ttl?: number;
      ignore_query_string?: boolean;
      origin_protocol?: 'http' | 'https' | 'follow';
      compression?: boolean;
      force_redirect_https?: boolean;
    }
  | undefined => {
  if (typeof binding.cdn === 'object') return binding.cdn;
  if (binding.cdn === true) return { enabled: true };
  return undefined;
};

const bindingToDefinitionEntry = (binding: OssBindingConfig): ResourceAttributes => {
  const cdn = getBindingCdnConfig(binding);
  const cdnEnabled = isCdnEnabled(binding);
  return {
    domain_name: binding.domainName,
    certificate_id: binding.certificateId ?? null,
    certificate_body: binding.certificateBody ?? null,
    certificate_private_key: binding.certificatePrivateKey ? '(managed)' : null,
    protocol: binding.protocol ?? null,
    ...(cdn
      ? {
          cdn: {
            enabled: cdnEnabled,
            ...(cdn.cdn_type != null || cdnEnabled ? { cdn_type: cdn.cdn_type ?? 'web' } : {}),
            ...(cdn.scope != null || cdnEnabled ? { scope: cdn.scope ?? 'global' } : {}),
            ...(cdn.cache_ttl != null ? { cache_ttl: cdn.cache_ttl } : {}),
            ...(cdn.ignore_query_string != null
              ? { ignore_query_string: cdn.ignore_query_string }
              : {}),
            ...(cdn.origin_protocol != null ? { origin_protocol: cdn.origin_protocol } : {}),
            ...(cdn.compression != null ? { compression: cdn.compression } : {}),
            ...(cdn.force_redirect_https != null
              ? { force_redirect_https: cdn.force_redirect_https }
              : {}),
          },
        }
      : { cdn: null }),
  };
};

/* istanbul ignore next */
export const bucketToOssBucketConfig = (bucket: BucketDomain): OssBucketConfig => {
  const config: OssBucketConfig = {
    bucketName: bucket.name,
  };

  if (bucket.iam) {
    config.iam = bucket.iam;
  }

  if (bucket.security?.acl) {
    config.acl = aclMap[bucket.security.acl];
  }

  if (bucket.website) {
    config.websiteConfig = {
      indexDocument: bucket.website.index,
      errorDocument: bucket.website.index,
    };
  }

  if (bucket.storage?.class) {
    config.storageClass = bucket.storage.class;
  }

  if (bucket.accelerate != null) {
    config.accelerateEnabled = bucket.accelerate;
  }

  if (bucket.domains?.length) {
    config.domains = bucket.domains.map((binding: BucketDomainBinding) => ({
      domainName: binding.domain_name,
      certificateId: binding.certificate_id,
      certificateBody: binding.certificate_body,
      certificatePrivateKey: binding.certificate_private_key,
      protocol: binding.protocol,
      ...(binding.cdn != null ? { cdn: binding.cdn } : {}),
    }));
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
    // Bindings are canonicalized: sorted by normalized hostname so list
    // reordering in YAML never produces a plan change (issue #279).
    domains: (config.domains ?? [])
      .slice()
      .sort((a, b) => a.domainName.localeCompare(b.domainName))
      .map(bindingToDefinitionEntry),
    accelerate: config.accelerateEnabled ?? false,
    versioningStatus: config.versioningStatus ?? null,
    sseAlgorithm: config.sseAlgorithm ?? null,
    sseKmsMasterKeyId: config.sseKmsMasterKeyId ?? null,
    policy: serializeBucketPolicy(config.iam, 'aliyun'),
  };

  return def;
};

export const cloudOssToDefinition = (info: OssBucketInfo): ResourceAttributes => ({
  bucketName: info.name,
  ...(info.acl !== undefined ? { acl: info.acl } : {}),
  ...(info.websiteConfig
    ? {
        websiteConfiguration: {
          indexDocument: info.websiteConfig.indexDocument,
          errorDocument: info.websiteConfig.errorDocument ?? null,
        },
      }
    : { websiteConfiguration: info.websiteConfig }),
  ...(info.storageClass !== undefined ? { storageClass: info.storageClass } : {}),
  ...(info.versioningConfig?.status !== undefined
    ? { versioningStatus: info.versioningConfig.status }
    : { versioningStatus: info.versioningConfig === null ? null : undefined }),
  ...(info.encryptionConfig?.sseAlgorithm !== undefined
    ? { sseAlgorithm: info.encryptionConfig.sseAlgorithm }
    : { sseAlgorithm: info.encryptionConfig === null ? null : undefined }),
  sseKmsMasterKeyId:
    info.encryptionConfig === undefined
      ? undefined
      : (info.encryptionConfig?.kmsMasterKeyId ?? null),
  policy: info.policy,
  // accelerate is intentionally not mapped from the cloud: transfer
  // acceleration cannot be disabled through update (destroy+recreate is
  // required), so a live-vs-desired diff here would be unresolvable drift.
});
