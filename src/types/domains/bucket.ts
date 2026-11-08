import { Resolvable } from './resolvable';

// cdn_type is the union across implemented providers (issue #283); per-provider
// legality is enforced by semantic validation through the capability registry.
// scope is provider-neutral and anchored to the Chinese mainland; the legacy
// `domestic` value is rejected with a migration error.
export type CdnType = 'web' | 'download' | 'video' | 'media' | 'hybrid' | 'dynamic';
export type CdnScope = 'chinese_mainland' | 'overseas' | 'global';

export type CdnConfig = {
  enabled: boolean;
  cdn_type?: CdnType;
  scope?: CdnScope;
  cache_ttl?: number;
  ignore_query_string?: boolean;
  origin_protocol?: 'http' | 'https' | 'follow';
  compression?: boolean;
  force_redirect_https?: boolean;
};

export type CdnRawConfig = {
  enabled?: Resolvable<boolean>;
  cdn_type?: Resolvable<string>;
  scope?: Resolvable<string>;
  cache_ttl?: Resolvable<number>;
  ignore_query_string?: Resolvable<boolean>;
  origin_protocol?: Resolvable<string>;
  compression?: Resolvable<boolean>;
  force_redirect_https?: Resolvable<boolean>;
};

// v1 (issue #279): a bucket declares bindings through the `domains` list.
// Binding identity is the normalized domain_name scoped to the bucket; list
// order carries no deployment semantics. The never-consumed `protocol` field
// was removed in v1 (issue #283) — usage reports a migration error.
export type BucketDomainBindingRaw = {
  domain_name: Resolvable<string>;
  certificate_id?: Resolvable<string>;
  certificate_body?: Resolvable<string>;
  certificate_private_key?: Resolvable<string>;
  cdn?: Resolvable<boolean> | CdnRawConfig;
};

export type BucketDomainBinding = {
  domain_name: string;
  certificate_id?: string;
  certificate_body?: string;
  certificate_private_key?: string;
  cdn?: boolean | CdnConfig;
};

export type BucketRaw = {
  name: Resolvable<string>;
  storage?: {
    class: Resolvable<string>;
  };
  versioning?: {
    status: Resolvable<string>;
  };

  security?: {
    acl?: Resolvable<string>;
    force_delete?: Resolvable<boolean>;
    sse_algorithm?: Resolvable<string>;
    sse_kms_master_key_id?: Resolvable<string>;
  };
  // Bucket-level transfer acceleration (provider-level feature on all clouds).
  accelerate?: Resolvable<boolean>;
  // The only accepted custom-domain form since v1. Legacy `domain` /
  // `website.domain` / `www_bind_apex` are rejected at schema validation.
  domains?: BucketDomainBindingRaw[];
  website?: {
    code: Resolvable<string>;
    index?: Resolvable<string>;
  };
  iam?: BucketIamRaw;
};

export enum BucketAccessEnum {
  PRIVATE = 'PRIVATE',
  PUBLIC_READ = 'PUBLIC_READ',
  PUBLIC_READ_WRITE = 'PUBLIC_READ_WRITE',
}

export type BucketDomain = {
  key: string;
  name: string;
  storage?: {
    class: string;
  };
  versioning?: {
    status: string;
  };

  security?: {
    acl: BucketAccessEnum;
    force_delete: boolean;
    sse_algorithm?: string;
    sse_kms_master_key_id?: string;
  };
  accelerate?: boolean;
  domains?: BucketDomainBinding[];
  website?: {
    code: string;
    index: string;
  };
  iam?: BucketIam;
};

export type EventDomainConfig = {
  domain_name: Resolvable<string>;
  www_bind_apex?: Resolvable<boolean>;
  certificate_id?: Resolvable<string>;
  certificate_body?: Resolvable<string>;
  certificate_private_key?: Resolvable<string>;
  protocol?: Resolvable<string | string[]>;
  cdn?: Resolvable<boolean> | CdnRawConfig;
};

// ============================================================================
// Bucket IAM Policy Types
// ============================================================================

/**
 * Raw (unresolved) IAM policy statement from YAML config.
 */
export type BucketIamStatementRaw = {
  effect: 'Allow' | 'Deny';
  principal: Record<string, Resolvable<string | string[]>>;
  action: Resolvable<string | string[]>;
  resource: Resolvable<string | string[]>;
  condition?: Record<string, unknown>;
};

/**
 * Raw (unresolved) IAM resource policy config from YAML.
 */
export type BucketIamRaw = {
  resource: {
    statements: BucketIamStatementRaw[];
  };
};

/**
 * Parsed IAM policy statement (all fields resolved).
 */
export type BucketIamStatement = {
  effect: 'Allow' | 'Deny';
  principal: Record<string, string | string[]>;
  action: string[];
  resource: string[];
  condition?: Record<string, unknown>;
};

/**
 * Parsed IAM resource policy config.
 */
export type BucketIam = {
  resource: {
    statements: BucketIamStatement[];
  };
};
