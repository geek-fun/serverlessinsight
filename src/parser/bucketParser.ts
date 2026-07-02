import {
  BucketAccessEnum,
  BucketDomain,
  BucketRaw,
  BucketIam,
  CdnConfig,
  CdnRawConfig,
} from '../types';
import { parseBooleanWithDefault, parseStringWithDefault } from './parseUtils';
import { logger } from '../common/logger';
import { lang } from '../lang';

const isStructuredDomain = (domain: unknown): domain is Record<string, unknown> =>
  typeof domain === 'object' && domain !== null && 'domain_name' in domain;

const parseCdnConfig = (
  cdn: boolean | CdnRawConfig | undefined,
): boolean | CdnConfig | undefined => {
  if (cdn == null) return undefined;
  if (typeof cdn === 'boolean') return cdn;
  const parsed: CdnConfig = { enabled: parseBooleanWithDefault(cdn.enabled, true) };
  if (cdn.cdn_type != null) parsed.cdn_type = String(cdn.cdn_type) as CdnConfig['cdn_type'];
  if (cdn.scope != null) parsed.scope = String(cdn.scope) as CdnConfig['scope'];
  if (cdn.cache_ttl != null) parsed.cache_ttl = Number(cdn.cache_ttl);
  if (cdn.ignore_query_string != null)
    parsed.ignore_query_string = String(cdn.ignore_query_string) === 'true';
  if (cdn.origin_protocol != null)
    parsed.origin_protocol = String(cdn.origin_protocol) as CdnConfig['origin_protocol'];
  if (cdn.compression != null) parsed.compression = String(cdn.compression) === 'true';
  if (cdn.force_redirect_https != null)
    parsed.force_redirect_https = String(cdn.force_redirect_https) === 'true';
  return parsed;
};

const parseDomainConfig = (
  rawDomain: Record<string, unknown> | undefined,
  accelerateFromDomain?: unknown,
) => {
  if (!rawDomain) return undefined;
  return {
    domain_name: String(rawDomain.domain_name),
    www_bind_apex: parseBooleanWithDefault(rawDomain.www_bind_apex as boolean | undefined, false),
    certificate_id: rawDomain.certificate_id != null ? String(rawDomain.certificate_id) : undefined,
    certificate_body:
      rawDomain.certificate_body != null ? String(rawDomain.certificate_body) : undefined,
    certificate_private_key:
      rawDomain.certificate_private_key != null
        ? String(rawDomain.certificate_private_key)
        : undefined,
    protocol:
      rawDomain.protocol != null
        ? Array.isArray(rawDomain.protocol)
          ? rawDomain.protocol.map(String)
          : String(rawDomain.protocol)
        : undefined,
    cdn: parseCdnConfig(rawDomain.cdn as boolean | CdnRawConfig | undefined),
    accelerate: accelerateFromDomain != null ? String(accelerateFromDomain) === 'true' : undefined,
  };
};

const parseWebsiteDomain = (
  domain: unknown,
): {
  domain: string | undefined;
  www_bind_apex: boolean;
  domain_certificate_id: string | undefined;
  domain_certificate_body: string | undefined;
  domain_certificate_private_key: string | undefined;
  domain_protocol: string | string[] | undefined;
} => {
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
  const d = domain as Record<string, unknown>;
  return {
    domain: String(d.domain_name),
    www_bind_apex: parseBooleanWithDefault(d.www_bind_apex as boolean | undefined, false),
    domain_certificate_id: d.certificate_id != null ? String(d.certificate_id) : undefined,
    domain_certificate_body: d.certificate_body != null ? String(d.certificate_body) : undefined,
    domain_certificate_private_key:
      d.certificate_private_key != null ? String(d.certificate_private_key) : undefined,
    domain_protocol:
      d.protocol != null
        ? Array.isArray(d.protocol)
          ? d.protocol.map(String)
          : String(d.protocol)
        : undefined,
  };
};

/* istanbul ignore next */
export const parseBucket = (buckets: {
  [key: string]: BucketRaw;
}): Array<BucketDomain> | undefined => {
  if (!buckets) {
    return undefined;
  }
  return Object.entries(buckets).map(([key, bucket]) => {
    let domainParsed: ReturnType<typeof parseDomainConfig> = undefined;

    // Parse top-level domain (canonical form)
    if (bucket.domain) {
      const structuredDomain = isStructuredDomain(bucket.domain)
        ? (bucket.domain as Record<string, unknown>)
        : { domain_name: String(bucket.domain) };
      domainParsed = parseDomainConfig(
        structuredDomain as Record<string, unknown>,
        (bucket.domain as Record<string, unknown>).accelerate,
      );
    }

    // Fallback: parse website.domain (deprecated)
    if (!domainParsed && bucket.website?.domain) {
      logger.warn(lang.__('BUCKET_DOMAIN_DEPRECATED', { key }));
      const structuredDomain = isStructuredDomain(bucket.website.domain)
        ? (bucket.website.domain as Record<string, unknown>)
        : { domain_name: String(bucket.website.domain) };
      domainParsed = parseDomainConfig(structuredDomain, undefined);
    }

    const websiteDomain = parseWebsiteDomain(bucket.website?.domain);

    // Parse IAM policy statements
    let iam: BucketIam | undefined;
    if (bucket.iam?.resource?.statements && Array.isArray(bucket.iam.resource.statements)) {
      iam = {
        resource: {
          statements: bucket.iam.resource.statements.map((stmt) => {
            const actionRaw = stmt.Action;
            const actions = Array.isArray(actionRaw) ? actionRaw.map(String) : [String(actionRaw)];

            const resourceRaw = stmt.Resource;
            const resources = Array.isArray(resourceRaw)
              ? resourceRaw.map(String)
              : [String(resourceRaw)];

            const principal: Record<string, string | string[]> = {};
            for (const [key, val] of Object.entries(stmt.Principal || {})) {
              principal[key] = val as string | string[];
            }

            const parsedStmt: BucketIam['resource']['statements'][0] = {
              Effect: stmt.Effect,
              Principal: principal,
              Action: actions,
              Resource: resources,
            };

            if (stmt.Condition != null) {
              parsedStmt.Condition = stmt.Condition as Record<string, unknown>;
            }

            return parsedStmt;
          }),
        },
      };
    }

    return {
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
      // Parsed top-level domain config
      domain: domainParsed,
      iam,
      website: bucket.website
        ? {
            code: String(bucket.website.code),
            ...websiteDomain,
            index: parseStringWithDefault(bucket.website.index, 'index.html'),
          }
        : undefined,
    };
  });
};
