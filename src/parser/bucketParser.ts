import {
  BucketAccessEnum,
  BucketDomain,
  BucketDomainBinding,
  BucketRaw,
  BucketIam,
  CdnConfig,
  CdnRawConfig,
} from '../types';
import { parseBooleanWithDefault, parseStringWithDefault } from './parseUtils';
import { normalizeHostname } from '../common/domainUtils';

const TEMPLATE_REF_PATTERN = /^\$\{[^}]+\}$/;

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

// Binding identity is the normalized hostname (issue #279). Template refs are
// preserved verbatim — they resolve at deploy time.
const parseBindingHostname = (raw: unknown): string => {
  const value = String(raw);
  return TEMPLATE_REF_PATTERN.test(value) ? value : normalizeHostname(value);
};

const parseDomainBinding = (raw: Record<string, unknown>): BucketDomainBinding => ({
  domain_name: parseBindingHostname(raw.domain_name),
  certificate_id: raw.certificate_id != null ? String(raw.certificate_id) : undefined,
  certificate_body: raw.certificate_body != null ? String(raw.certificate_body) : undefined,
  certificate_private_key:
    raw.certificate_private_key != null ? String(raw.certificate_private_key) : undefined,
  protocol:
    raw.protocol != null
      ? Array.isArray(raw.protocol)
        ? raw.protocol.map(String)
        : String(raw.protocol)
      : undefined,
  cdn: parseCdnConfig(raw.cdn as boolean | CdnRawConfig | undefined),
});

/* istanbul ignore next */
export const parseBucket = (buckets: {
  [key: string]: BucketRaw;
}): Array<BucketDomain> | undefined => {
  if (!buckets) {
    return undefined;
  }
  return Object.entries(buckets).map(([key, bucket]) => {
    const domains = bucket.domains?.map((entry) =>
      parseDomainBinding(entry as unknown as Record<string, unknown>),
    );

    // Parse IAM policy statements
    let iam: BucketIam | undefined;
    if (bucket.iam?.resource?.statements && Array.isArray(bucket.iam.resource.statements)) {
      iam = {
        resource: {
          statements: bucket.iam.resource.statements.map((stmt) => {
            const actionRaw = stmt.action;
            const actions = Array.isArray(actionRaw) ? actionRaw.map(String) : [String(actionRaw)];

            const resourceRaw = stmt.resource;
            const resources = Array.isArray(resourceRaw)
              ? resourceRaw.map(String)
              : [String(resourceRaw)];

            const principal: Record<string, string | string[]> = {};
            for (const [entryKey, val] of Object.entries(stmt.principal || {})) {
              principal[entryKey] = val as string | string[];
            }

            const parsedStmt: BucketIam['resource']['statements'][0] = {
              effect: stmt.effect,
              principal: principal,
              action: actions,
              resource: resources,
            };

            if (stmt.condition != null) {
              parsedStmt.condition = stmt.condition as Record<string, unknown>;
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
      accelerate: parseBooleanWithDefault(bucket.accelerate as boolean, false),
      domains,
      iam,
      website: bucket.website
        ? {
            code: String(bucket.website.code),
            index: parseStringWithDefault(bucket.website.index, 'index.html'),
          }
        : undefined,
    };
  });
};
