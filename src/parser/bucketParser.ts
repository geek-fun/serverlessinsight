import {
  BucketAccessEnum,
  BucketDomain,
  BucketRaw,
  BucketWebsiteDomainConfig,
  Resolvable,
} from '../types';
import {
  parseBooleanWithDefault,
  parseNumberWithDefault,
  parseStringWithDefault,
} from './parseUtils';

const isStructuredDomain = (domain: unknown): domain is BucketWebsiteDomainConfig =>
  typeof domain === 'object' && domain !== null && 'domain_name' in domain;

const parseWebsiteDomain = (domain: Resolvable<string> | BucketWebsiteDomainConfig | undefined) => {
  if (domain == null) {
    return {
      domain: undefined,
      www_bind_apex: false,
      domain_certificate_id: undefined,
      domain_certificate_body: undefined,
      domain_certificate_private_key: undefined,
      domain_protocol: undefined,
    };
  }
  if (!isStructuredDomain(domain)) {
    return {
      domain: String(domain),
      www_bind_apex: false,
      domain_certificate_id: undefined,
      domain_certificate_body: undefined,
      domain_certificate_private_key: undefined,
      domain_protocol: undefined,
    };
  }
  return {
    domain: String(domain.domain_name),
    www_bind_apex: parseBooleanWithDefault(domain.www_bind_apex, false),
    domain_certificate_id:
      domain.certificate_id != null ? String(domain.certificate_id) : undefined,
    domain_certificate_body:
      domain.certificate_body != null ? String(domain.certificate_body) : undefined,
    domain_certificate_private_key:
      domain.certificate_private_key != null ? String(domain.certificate_private_key) : undefined,
    domain_protocol:
      domain.protocol != null
        ? Array.isArray(domain.protocol)
          ? domain.protocol.map(String)
          : String(domain.protocol)
        : undefined,
  };
};

export const parseBucket = (buckets: {
  [key: string]: BucketRaw;
}): Array<BucketDomain> | undefined => {
  if (!buckets) {
    return undefined;
  }
  return Object.entries(buckets).map(([key, bucket]) => ({
    key,
    name: String(bucket.name),
    storage: bucket.storage
      ? {
          class: String(bucket.storage.class),
        }
      : undefined,
    versioning: bucket.versioning
      ? {
          status: String(bucket.versioning.status),
        }
      : undefined,
    security: bucket.security
      ? {
          acl: bucket.security.acl
            ? (String(bucket.security.acl) as BucketAccessEnum)
            : BucketAccessEnum.PRIVATE,
          force_delete: parseBooleanWithDefault(bucket.security.force_delete, false),
          sse_algorithm: bucket.security.sse_algorithm
            ? String(bucket.security.sse_algorithm)
            : undefined,
          sse_kms_master_key_id: bucket.security.sse_kms_master_key_id
            ? String(bucket.security.sse_kms_master_key_id)
            : undefined,
        }
      : undefined,

    website: bucket.website
      ? {
          code: String(bucket.website.code),
          ...parseWebsiteDomain(bucket.website.domain),
          index: parseStringWithDefault(bucket.website.index, 'index.html'),
          error_page: parseStringWithDefault(bucket.website.error_page, '404.html'),
          error_code: parseNumberWithDefault(bucket.website.error_code, 404),
        }
      : undefined,
  }));
};
