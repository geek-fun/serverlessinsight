import { Resolvable } from './resolvable';

export type CdnConfig = {
  enabled: boolean;
  cdn_type?: 'web' | 'download' | 'video';
  scope?: 'domestic' | 'overseas' | 'global';
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

type BucketDomainConfigCommon = {
  domain_name: Resolvable<string>;
  www_bind_apex?: Resolvable<boolean>;
  certificate_id?: Resolvable<string>;
  certificate_body?: Resolvable<string>;
  certificate_private_key?: Resolvable<string>;
  protocol?: Resolvable<string | string[]>;
  cdn?: Resolvable<boolean> | CdnRawConfig;
};

export type BucketDomainConfig = BucketDomainConfigCommon & {
  accelerate?: Resolvable<boolean>;
};

export type BucketWebsiteDomainConfig = BucketDomainConfigCommon;

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
  // Canonical form: top-level domain config (preferred over website.domain)
  domain?: BucketDomainConfig;
  website?: {
    code: Resolvable<string>;
    // Deprecated: Use top-level `domain` instead
    domain?: Resolvable<string> | BucketWebsiteDomainConfig;
    index?: Resolvable<string>;
  };
  iam?: BucketIamRaw;
};

export enum BucketAccessEnum {
  PRIVATE = 'PRIVATE',
  PUBLIC_READ = 'PUBLIC_READ',
  PUBLIC_READ_WRITE = 'PUBLIC_READ_WRITE',
}

export type BucketDomainConfigParsed = {
  domain_name: string;
  www_bind_apex: boolean;
  certificate_id?: string;
  certificate_body?: string;
  certificate_private_key?: string;
  protocol?: string | string[];
  cdn?: boolean | CdnConfig;
  accelerate?: boolean;
};

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
  // Parsed from top-level `domain` (canonical) or `website.domain` (deprecated)
  domain?: BucketDomainConfigParsed;
  website?: {
    index: string;
    domain?: string;
    www_bind_apex?: boolean;
    domain_certificate_id?: string;
    domain_certificate_body?: string;
    domain_certificate_private_key?: string;
    domain_protocol?: string | string[];
    code: string;
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
  Effect: 'Allow' | 'Deny';
  Principal: Record<string, Resolvable<string | string[]>>;
  Action: Resolvable<string | string[]>;
  Resource: Resolvable<string | string[]>;
  Condition?: Record<string, unknown>;
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
  Effect: 'Allow' | 'Deny';
  Principal: Record<string, string | string[]>;
  Action: string[];
  Resource: string[];
  Condition?: Record<string, unknown>;
};

/**
 * Parsed IAM resource policy config.
 */
export type BucketIam = {
  resource: {
    statements: BucketIamStatement[];
  };
};
