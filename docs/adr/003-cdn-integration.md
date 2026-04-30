# ADR-003: Cross-Provider CDN Integration & OSS Transfer Acceleration

- **Status**: Accepted
- **Date**: 2026-04-28
- **Authors**: ServerlessInsight Team
- **Deciders**: @geek-fun/core

## Context

ServerlessInsight currently manages custom domains for API Gateway and OSS buckets via direct DNS CNAME binding. While this provides basic custom domain support, users who need global acceleration, edge caching, or China-region CDN distribution cannot achieve these without manual cloud console configuration.

**Trigger**: [dockit#366](https://github.com/geek-fun/dockit/issues/366) requires Aliyun OSS + CDN mirroring for both global and China users. GitHub Releases is throttled/unreliable from Mainland China, while users worldwide benefit from edge-accelerated downloads. Release artifacts need to be distributed through CDN — with Alibaba CDN providing China mainland acceleration and global edge coverage.

**Current domain architecture**:

```
User → DNS (CNAME) → OSS Endpoint
User → DNS (CNAME) → API Gateway Endpoint
```

**Desired architecture** (dual-layer):

```
User → DNS (CNAME) → CDN Edge Node → (back-to-origin) → OSS / API Gateway
                                                              │
                                         Regular: public internet path
                                         Accelerated: provider backbone path
```

### Current Limitations

1. **No CDN resource type** — zero CDN-related code exists in the codebase
2. **No CDN SDK integration** — `@alicloud/cdn20180510` not installed; no Tencent/Huawei equivalents
3. **Direct-to-origin only** — domain binding creates CNAMEs pointing directly to OSS/API GW endpoints, bypassing CDN entirely
4. **No cache control** — static assets served from OSS have no CDN-layer cache policy
5. **No edge SSL** — certificate deployment at the CDN edge layer is not possible
6. **No transfer acceleration** — cross-region origin fetches use public internet routing

### Use Cases to Support

| # | Use Case | Origin Type | CDN Role | Example |
|---|----------|-------------|----------|---------|
| 1 | **Static Site / SPA** | OSS/COS bucket | Global acceleration, edge caching, SSL termination | Corporate website, documentation site |
| 2 | **Release Artifact Mirroring** | OSS bucket | Global + region-optimized delivery | Dockit update binaries, SDK downloads, CLI tools |
| 3 | **API Acceleration** | API Gateway / FC function | Edge caching of responses, DDoS protection | Public REST API with global users |
| 4 | **Custom Origin** | Any HTTP backend | CDN as a managed cache layer | Legacy backend behind CDN |

> **Note**: Use case 4 (Custom Origin) is low priority for serverlessInsight since it involves resources not managed by the framework. Users with custom origin CDN needs are better served by Terraform/Pulumi.

### serverlessInsight's Identity Constraint

ServerlessInsight is **not a general-purpose IaC framework** like Terraform or Pulumi. It is a **use-case-optimized deployment accelerator**. Its job is to make common application stacks (API stack = APIGW + FC + ServerlessDB; SPA site = CDN + Bucket + Website) deployable with minimal configuration. Users who need comprehensive IaC resource definitions should use Terraform — serverlessInsight optimizes for specific patterns, not exhaustive resource coverage.

This constraint is critical when evaluating CDN design: the question is not "how do we expose every CDN feature?" but "how does CDN accelerate the use cases serverlessInsight already owns?"

## Decision Drivers

1. **Provider agnosticism** — YAML config must work across Aliyun, Tencent, Volcengine, Huawei, AWS without schema changes
2. **Use-case optimization** — config should express intent ("make my site fast"), not infrastructure topology ("create a CdnDomain resource with ossSourceType")
3. **Common-case simplicity** — 80% use case (OSS + CDN for static site, API + CDN for global API) should require minimal config
4. **Consistency with existing patterns** — framework already auto-manages DNS CNAMEs and SSL certificates on domain binding
5. **Not Terraform** — don't compete on resource granularity; win on deployment speed and developer experience
6. **Phased delivery** — Aliyun first (unblocks dockit#366), then other providers
7. **No breaking changes** — existing domain binding on buckets/events must continue to work without CDN

## Research: Provider CDN Models

### Cloud Provider Comparison

| Provider | CDN Product | SDK Package | Origin Types | Transfer Acceleration | Domain Verification | SSL Support |
|----------|------------|------------|--------------|----------------------|---------------------|-------------|
| **Alibaba** | Alibaba Cloud CDN | `@alicloud/cdn20180510` | OSS, ECS, SLB, FC, Custom IP/Domain | ✅ OSS Transfer Acceleration (`oss-accelerate` endpoint) | DNS TXT + ownership check | CAS cert ID or inline PEM |
| **Tencent** | Tencent Cloud CDN / ECDN | `tencentcloud-sdk-nodejs-cdn` | COS, CVM, CLB, Custom IP/Domain | ✅ COS Global Acceleration (`cos.accelerate` endpoint) | DNS TXT / file upload | SSL cert ID or inline upload |
| **Volcengine** | Volcengine CDN | `@volcengine/openapi` (cdn) | TOS, ECS, Custom IP/Domain | ❌ Not available | DNS CNAME verification | Certificate service |
| **Huawei** | Huawei Cloud CDN | `@huaweicloud/huaweicloud-sdk-cdn` | OBS, ECS, ELB, Custom IP/Domain | ❌ Not available | DNS TXT + ownership check | SCM cert ID or inline PEM |
| **AWS** | CloudFront | `@aws-sdk/client-cloudfront` | S3, ALB, API GW, Custom Origin | ✅ S3 Transfer Acceleration (`s3-accelerate` endpoint; primarily for uploads) | DNS validation (Route53) | ACM cert (auto-provisioned) |

### Transfer Acceleration: A Separate Layer

All major providers offer a bucket-level "transfer acceleration" feature that is **orthogonal to CDN** — it optimizes the network path between client and origin, rather than caching content at the edge:

| | Alibaba | Tencent | AWS |
|---|---|---|---|
| **Feature name** | OSS Transfer Acceleration | COS Global Acceleration | S3 Transfer Acceleration |
| **Endpoint** | `oss-accelerate.aliyuncs.com` | `cos.accelerate.myqcloud.com` | `s3-accelerate.amazonaws.com` |
| **How it works** | Routes through Alibaba backbone network | Routes through Tencent Direct Connect | Routes through CloudFront edge locations over AWS backbone |
| **Caching?** | No | No | No |
| **Primary use** | Cross-region downloads & uploads | Cross-region uploads & downloads | Upload acceleration (CDN covers downloads) |
| **CDN combo recommended?** | ✅ Yes — dual-layer explicitly documented by Alibaba | ✅ Yes — same dual-layer architecture works | ⚠️ For downloads, CloudFront alone is preferred |

Alibaba Cloud explicitly recommends the dual-layer architecture:

> *"You can enable both CDN acceleration and transfer acceleration. Configure your CDN origin to point to the acceleration endpoint to build a **dual-layer system: CDN edge caching + OSS transfer acceleration**. CDN serves requests from the nearest cache, while transfer acceleration optimizes the CDN's origin-fetch path."*

This means `cdn` and `accelerate` are two independent, composable features on the same bucket domain.

### Common CDN Abstraction Across Providers

Despite API differences, all CDN providers share a core abstraction:

```
CDN Distribution ─────────────┐
  ├── Domain (加速域名)        │  All providers require a domain name
  ├── Origin (源站)            │  All providers need origin type + address
  ├── SSL Certificate (证书)   │  All providers support HTTPS
  ├── Cache Policy (缓存策略)  │  All providers control caching
  └── CNAME Target (CNAME记录) │  All providers return a CNAME to point DNS at
```

**Divergent areas**: Origin type nomenclature, domain verification mechanism, pricing tier/scope (domestic-only vs. global), cache rule granularity.

### How Other Tools Handle CDN

| Tool | Pattern | Role | Takeaway |
|------|---------|------|----------|
| **Terraform** | `alicloud_cdn_domain_new` standalone resource | General IaC | Maximum flexibility; origins referenced by ID/ARN |
| **Pulumi** | `aws.cloudfront.Distribution` with origin access identity | General IaC | Rich type system; any storage/http resource as origin |
| **Serverless Framework** | `serverless-domain-manager` plugin — no CDN management | Serverless accelerator | CDN is API Gateway's internal CloudFront; users can't configure it |
| **SST** | `sst.aws.Cdn` — high-level abstraction over CloudFront | Serverless accelerator | Origins auto-resolved; CDN created with minimal config |
| **Vercel/Netlify** | CDN is implicit — every deployment gets it | Platform | Users never think about CDN; it's just there |

**Key takeaway**: Tools that share serverlessInsight's "accelerator" identity (SST, Vercel) treat CDN as a transparent enhancement, not a configurable resource. General IaC tools (Terraform, Pulumi) expose full CDN topology.

## Options Considered

### Option A: CDN as a Top-Level `cdn:` Resource

CDN distributions become a standalone top-level configuration block. Users explicitly define distributions with origin references, domain names, and SSL config.

```yaml
buckets:
  my_site:
    name: my-static-site
    website:
      code: ./dist

cdn:
  my_site_cdn:
    name: my-site-cdn
    origin:
      type: OSS
      bucket: ${buckets.my_site}
    domain: cdn.example.com
    ssl:
      certificate_id: cas-abc123
    protocol: HTTPS
```

**Pros**: Maximum flexibility — any origin type, custom cache rules, multiple CDNs per origin. Explicit dependency graph via `${}` refs. Matches Terraform/Pulumi patterns.

**Cons**: Forces users to understand CDN concepts. Duplicates domain/certificate config already on bucket/event domains. Adds ~20 lines of YAML for Terraform territory. Conflicts with serverlessInsight's accelerator identity. Custom origin use case drives complexity that leaks into common cases.

---

### Option B: CDN as Enhancement on Existing `domain:` Blocks

CDN is a property of the `domain:` configuration on buckets and events. Users add a single flag to enable CDN. The framework handles origin resolution, DNS routing, and SSL deployment automatically.

**Critical design detail**: `domain` moves from under `website` to the bucket **top level**, because domain/DNS/CDN applies to all bucket use cases (static sites, asset distribution, release mirroring), while `website` is specifically for static site hosting (code upload, index/error pages). They are independent, composable concerns:

```yaml
buckets:
  # Pattern A: SPA with CDN — website + domain both present
  spa_site:
    name: spa-bucket
    security:
      acl: PUBLIC_READ
    website:                           # static site hosting: code upload, index, error page
      code: ./dist
      index: index.html
    domain:                            # custom domain + CDN (top-level, independent of website)
      domain_name: www.example.com
      certificate_id: cas-abc123
      protocol: HTTPS
      cdn: true

  # Pattern B: Asset distribution — domain only, no website needed
  releases:
    name: app-releases
    security:
      acl: PRIVATE                     # CDN handles public access; bucket stays private
    domain:                            # standalone — works without any website config
      domain_name: releases.example.com
      certificate_id: ${vars.cert_id}
      protocol: HTTPS
      cdn:
        enabled: true
        cdn_type: download
      accelerate: true

  # Pattern C: Backward compat — website.domain still works (deprecated alias)
  legacy:
    name: old-site
    website:
      code: ./old-dist
      domain:                          # still functional; internally resolves to bucket.domain
        domain_name: old.example.com
```

**Why this separation matters**: `website` is about **content** (what files to serve, how to route requests). `domain` is about **access** (DNS, SSL, CDN, acceleration). A release artifact bucket has no website content but still needs CDN-accelerated access. An SPA bucket needs both. Forcing `domain` inside `website` would make non-website CDN use cases impossible.

**Pros**: Zero cognitive overhead — `cdn: true` is the only thing users add. Framework already knows origin, domain, and certificate — no duplication. Reuses existing DNS/SSL patterns. Works for all bucket use cases (website and non-website). Matches serverlessInsight's identity: use-case-optimized, not resource-exhaustive.

**Cons**: Less flexible — no multi-CDN-per-origin or custom origin CDN. Framework must make sensible defaults per provider. Requires migrating `website.domain` to bucket top-level (backward compat maintained).

---

## Decision

**Option B is accepted**: CDN as an enhancement on `domain:` blocks, with `cdn` accepting both boolean and object forms, and `accelerate` as a separate boolean for transfer acceleration. `domain` is placed at the bucket top level (not inside `website`) to support both website and non-website use cases. `website.domain` remains as a backward-compatible deprecated alias.

### Domain Placement

`domain` moves from `website.domain` to bucket top-level (`buckets.<key>.domain`):

| Location | Status | Use When |
|----------|--------|----------|
| `buckets.<key>.domain` | ✅ Recommended | All bucket use cases (SPA, assets, releases) |
| `buckets.<key>.website.domain` | ⚠️ Deprecated alias | Existing configs; internally resolves to `bucket.domain` |

The parser normalizes both locations to the same internal representation. The top-level `domain` is the canonical form in documentation and examples.

### Configuration Shape

#### `cdn` — Accepts `boolean` or `object`

**Boolean (simple form — 90% of cases):**

```yaml
buckets:
  my_site:
    name: my-site-bucket
    domain:
      domain_name: www.example.com
      certificate_id: cas-abc123
      protocol: HTTPS
      cdn: true                    # create CDN with sensible defaults
```

**Object (advanced form — 10% of cases):**

```yaml
buckets:
  my_site:
    name: my-site-bucket
    domain:
      domain_name: www.example.com
      certificate_id: cas-abc123
      protocol: HTTPS
      cdn:
        enabled: true              # explicitly enable (same as `cdn: true`)
        cdn_type: web              # web | download | video
        scope: global              # domestic | overseas | global
        cache_ttl: 86400           # seconds (default: 86400 for static, 60 for API)
        ignore_query_string: true  # default: true for buckets, false for APIs
        origin_protocol: follow    # http | https | follow
        compression: true          # enable gzip/brotli
        force_redirect_https: true # HTTP → HTTPS redirect
```

**Boolean (disable — explicit opt-out):**

```yaml
buckets:
  internal:
    name: internal-bucket
    domain:
      domain_name: internal.example.com
      cdn: false                   # explicitly disable (useful when overriding defaults)
```

#### `accelerate` — Accepts `boolean` only

Enables OSS/COS/S3 Transfer Acceleration for the bucket. When combined with CDN, the CDN's origin is set to the accelerated endpoint for optimized back-to-origin routing.

```yaml
buckets:
  assets:
    name: asset-bucket
    domain:
      domain_name: assets.example.com
      cdn: true
      accelerate: true             # CDN origin → accelerated endpoint (dual-layer)
```

Without CDN, `accelerate: true` creates a DNS CNAME to the accelerated endpoint instead of the standard bucket endpoint.

#### Complete Config Matrix

| `cdn` | `accelerate` | DNS CNAME target | CDN origin | Use case |
|-------|-------------|-----------------|------------|----------|
| `false` / omitted | `false` / omitted | OSS standard endpoint | — | Basic custom domain (existing behavior) |
| `false` / omitted | `true` | OSS accelerated endpoint | — | Accelerated direct access (no CDN) |
| `true` | `false` / omitted | CDN distribution CNAME | OSS standard endpoint | CDN with standard origin fetch |
| `true` | `true` | CDN distribution CNAME | OSS accelerated endpoint | CDN + accelerated origin fetch (dual-layer) |

#### Bucket Config Patterns Summary

```yaml
buckets:
  # SPA static site: has website (code upload) + domain (CDN access)
  spa_site:
    name: spa-bucket
    security: { acl: PUBLIC_READ }
    website:
      code: ./dist
      index: index.html
    domain:
      domain_name: www.example.com
      certificate_id: cas-abc123
      protocol: HTTPS
      cdn: true

  # Asset distribution: domain only, NO website (artifacts uploaded via CI)
  releases:
    name: releases-bucket
    security: { acl: PRIVATE }     # CDN is the only public access path
    domain:
      domain_name: releases.example.com
      certificate_id: ${vars.cert_id}
      protocol: HTTPS
      cdn:
        enabled: true
        cdn_type: download
        cache_ttl: 86400
      accelerate: true

  # Simple bucket: no domain, no website — just storage (existing behavior, unchanged)
  raw_storage:
    name: raw-data
    security: { acl: PRIVATE }
```

### Rationale

1. **Matches serverlessInsight's identity**: CDN is an acceleration feature of the application, not infrastructure plumbing. Users describe their app — framework handles the rest.

2. **Boolean-first, object-when-needed**: `cdn: true` handles 90% of cases. The structured object form exists for power users who need cache TTL or scope control, but is not required for basic usage.

3. **`accelerate` is orthogonal**: Transfer acceleration is a bucket-level network optimization, not a CDN feature. Making it a separate flag keeps the concerns clean and allows independent composition.

4. **Domain at bucket top-level, not inside `website`**: `domain` (DNS, SSL, CDN) is about **access**; `website` (code, index, error page) is about **content**. They are independent concerns. A release artifact bucket needs CDN-accelerated access without being a static website. Moving `domain` up enables this separation. `website.domain` remains as backward-compatible deprecated alias.

## Comparison Matrix

| Dimension | Option A: Top-Level Resource | Option B: Enhancement **(chosen)** |
|-----------|-----------------------------|-------------------------------------|
| **Config for static site CDN** | ~20 lines YAML | 1 line (`cdn: true`) |
| **Config for API acceleration** | ~20 lines YAML | 1 line (`cdn: true`) |
| **Advanced CDN config** | ✅ Full control | ✅ Object form (`cdn: { ... }`) |
| **Transfer acceleration** | Separate resource needed | 1 line (`accelerate: true`) |
| **User needs to know CDN concepts?** | Yes (origin types, CNAME, cert) | No (boolean form); Yes (object form) |
| **Duplicates domain/cert config?** | Yes | No |
| **Matches serverlessInsight identity?** | ❌ Terraform-in-YAML | ✅ Deployment accelerator |
| **Matches existing patterns?** | New paradigm | Extends existing `domain:` block |
| **Custom origin CDN** | ✅ Supported | ❌ Out of scope (use Terraform) |
| **Multi-CDN per origin** | ✅ Supported | ❌ Out of scope (use Terraform) |
| **Implementation complexity** | High | Medium |
| **Works without `website` config?** | N/A (separate resource) | ✅ Domain at bucket top-level |
| **Backward compat** | N/A | ✅ `website.domain` still works (deprecated) |
| **Breaks existing config?** | No | No |

## Provider-Specific Defaults

When `cdn: true` is used (boolean form), the framework applies sensible defaults per provider:

| Provider | Default Cache TTL (static) | Default Cache TTL (API) | Default Scope | Default `cdn_type` |
|----------|---------------------------|------------------------|---------------|---------------------|
| **Alibaba** | 86400s (24h) | 60s | Global | `web` |
| **Tencent** | 86400s (24h) | 60s | Global | `web` |
| **Volcengine** | 86400s (24h) | 60s | Global | `web` |
| **Huawei** | 86400s (24h) | 60s | Global | `web` |
| **AWS** | 86400s (24h) | 60s | PriceClass_All | N/A (implicit) |

Users override via the object form (`cdn: { cache_ttl: 3600 }`) when defaults don't match their needs.

## Use Cases Walkthrough

### Use Case 1: Static Site with Global CDN

```yaml
buckets:
  docs_site:
    name: docs-bucket
    security:
      acl: PUBLIC_READ
    website:
      code: ./docs-dist
      index: index.html
    domain:
      domain_name: docs.example.com
      certificate_id: cas-xyz789
      protocol: HTTPS
      cdn: true
```

**What happens**:
1. OSS bucket created with static website hosting enabled
2. Framework resolves bucket's extranet endpoint → CDN origin address
3. CDN distribution created fronting the OSS bucket
4. SSL certificate deployed at CDN edge (reuses `casOperations`)
5. DNS CNAME record created: `docs.example.com` → CDN distribution CNAME target
6. Global users hit nearest CDN edge → OSS (cached with 24h TTL)

### Use Case 2: Release Artifact Mirroring (Global, Dual-Layer)

```yaml
buckets:
  releases:
    name: app-releases
    security:
      acl: PRIVATE                       # CDN handles public access
    domain:
      domain_name: releases.example.com
      certificate_id: ${vars.release_cert_id}
      protocol: HTTPS
      cdn:
        enabled: true
        cdn_type: download              # optimized for large file distribution
        scope: global
        cache_ttl: 86400
      accelerate: true                  # dual-layer: CDN + backbone origin fetch
```

**Context**: dockit#366 and similar applications — Tauri/Electron updaters, CLI tool installers, SDK downloaders need fast binary downloads worldwide.

**What happens**:
1. OSS bucket stores release artifacts (uploaded via CI pipeline)
2. OSS transfer acceleration enabled → `oss-accelerate` endpoint
3. CDN distribution created with `cdn_type: download` for large file optimization
4. CDN origin set to OSS accelerated endpoint (dual-layer)
5. Users hit nearest CDN edge → cache hit → served immediately
6. Cache miss → CDN fetches from OSS over Alibaba backbone (not public internet)
7. Application updater config uses CDN endpoint as primary, GitHub Releases as fallback

> **Note**: This use case does NOT need `website:` config — release artifacts are uploaded via CI pipeline (e.g., `ossutil`, GitHub Actions), not deployed by serverlessInsight. The `domain` block alone provides CDN + acceleration without any website hosting overhead.

### Use Case 3: API Acceleration

```yaml
events:
  gateway:
    type: API_GATEWAY
    name: public-api-gw
    triggers:
      - method: GET
        path: /api/v1/*
        backend: ${functions.public_api}
    domain:
      domain_name: api-cdn.example.com
      certificate_id: ${vars.api_cert_id}
      protocol: HTTPS
      cdn:
        enabled: true
        cache_ttl: 60
        ignore_query_string: false
```

**What happens**:
1. FC3 function and API Gateway created as usual
2. Framework resolves API Gateway's default domain → CDN origin address
3. CDN distribution fronts the API Gateway with 60s cache TTL
4. Query strings not ignored (API responses vary by query params)
5. Global users hit nearest CDN edge → reduced latency
6. `accelerate` not applicable (transfer acceleration is bucket-level only)

### Use Case 4: Accelerated Direct Access (No CDN, No Website)

```yaml
buckets:
  backups:
    name: cross-region-backups
    security:
      acl: PRIVATE
    domain:
      domain_name: backups.internal.example.com
      accelerate: true                  # faster cross-region transfers, no caching needed
```

**What happens**:
1. OSS bucket created
2. Transfer acceleration enabled
3. DNS CNAME: `backups.internal.example.com` → `oss-accelerate.aliyuncs.com`
4. Cross-region uploads/downloads route over Alibaba backbone

## Implementation Plan (Phase 1: Aliyun)

### Phase 1.1: CDN Client Operations

Create `src/common/aliyunClient/cdnOperations.ts` wrapping `@alicloud/cdn20180510` SDK:

- `addCdnDomain(config)` — create CDN distribution
- `getCdnDomain(domainName)` — query distribution status
- `deleteCdnDomain(domainName)` — stop and delete distribution
- `updateCdnDomain(config)` — modify origin, cache, or SSL config
- `setDomainServerCertificate(config)` — deploy SSL cert to CDN

Wire into `src/common/aliyunClient/index.ts` (initialize CDN client, export operations).

### Phase 1.2: OSS Transfer Acceleration Operations

Add to existing `ossOperations.ts`:

- `enableTransferAcceleration(bucketName)` — enable accelerate on bucket
- `getTransferAcceleration(bucketName)` — check accelerate status
- `getAccelerateEndpoint(bucketName, region)` — resolve `oss-accelerate` endpoint

### Phase 1.3: Bucket Domain CDN + Acceleration Path

Modify `src/stack/aliyunStack/ossResource.ts` — in the domain binding code path (now at bucket top-level `domain`):

When `domain.cdn.enabled === true` (boolean `true` or object with `enabled: true`):
1. If `domain.accelerate === true`, enable transfer acceleration on the bucket
2. Resolve origin address: accelerated endpoint (if enabled) or standard extranet endpoint
3. Create CDN distribution with the resolved origin
4. Deploy SSL certificate to CDN edge
5. Create DNS CNAME pointing to CDN distribution CNAME target (not OSS endpoint)
6. Track CDN distribution in state alongside bucket resources

When `domain.accelerate === true` only (no CDN):
1. Enable transfer acceleration
2. Create DNS CNAME to accelerated endpoint

When neither is enabled: existing behavior (DNS CNAME to standard OSS endpoint).

**Backward compatibility**: If `website.domain` is present and `domain` is absent, normalize `website.domain` → `domain` internally. Log a deprecation notice suggesting migration to the top-level `domain` form.

### Phase 1.4: Event Domain CDN Path

Modify `src/stack/aliyunStack/apigwResource.ts` — similar CDN logic for API Gateway events. `accelerate` not applicable (bucket-level feature only).

### Phase 1.5: Schema + Parser Updates

- Move `domain` from `BucketRaw.website.domain` to `BucketRaw.domain` (top-level bucket property)
- Keep `BucketRaw.website.domain` as deprecated alias; parser normalizes both to the same internal representation
- Add `cdn` field to bucket domain type and event domain type (accepts `boolean | CdnConfig`)
- Add `accelerate` field to bucket domain type (boolean, default `false`; not applicable to events)
- Define `CdnConfig` type with optional fields: `enabled`, `cdn_type`, `scope`, `cache_ttl`, `ignore_query_string`, `origin_protocol`, `compression`, `force_redirect_https`
- Add `cdn` and `accelerate` to AJV schema validation
- Update `bucketParser.ts` to parse `domain` at top level, and normalize `website.domain` as fallback
- Parse `cdn` (boolean → `{ enabled: true }`, object → as-is, `false`/omitted → `undefined`) and `accelerate`

### Phase 1.6: i18n + Documentation

Add CDN and transfer acceleration i18n messages to `src/lang/en.ts` and `src/lang/zh-CN.ts`. Document features in README and samples directory.

### Dependency Addition

```json
{
  "@alicloud/cdn20180510": "^3.x"
}
```

## Roadmap: Post-Phase-1

### Phase 2: Tencent CDN + COS Global Acceleration
- Add `tencentcloud-sdk-nodejs-cdn` dependency
- Create `src/common/tencentClient/cdnOperations.ts`
- Modify `cosResource.ts` domain binding for CDN + acceleration paths

### Phase 3+: Other Providers
- Volcengine, Huawei follow the same enhancement pattern
- Transfer acceleration only where provider supports it

### Cache Invalidation (Post-MVP)
- `si cdn invalidate` CLI command for purging stale cache after deployment
- Provider-specific invalidation operations (`RefreshObjectCaches` / `PurgeUrlsCache`)

### Future: CDN as Default for Public Buckets
- Buckets with `security.acl: PUBLIC_READ` + `website.domain` could default to `cdn: true`
- Opt-out via `cdn: false` for internal/cost-sensitive deployments

## Consequences

**Positive**:
- Unlocks CDN acceleration for static sites and APIs across all providers with minimal config
- Dual-layer architecture (CDN + transfer acceleration) supported with two flags
- `cdn: true` handles 90% of cases; object form provides escape hatch without schema explosion
- `accelerate: true` is independently composable with or without CDN
- Consistent pattern: `cdn` and `accelerate` mean the same thing on buckets; `cdn` on events
- Reuses proven DNS/SSL patterns from existing domain binding code
- Existing domain binding continues to work unchanged (both features are opt-in)

**Negative**:
- Less flexible than a top-level resource — custom origin CDN and multi-CDN not supported
- Framework must choose sensible CDN defaults per provider (cache TTL, scope)
- `cdn: true` on events needs different origin resolution than on buckets
- Users with complex CDN needs must use Terraform (documentation makes this clear)

**Risks**:
- **ICP filing**: China CDN domains require ICP filing (out of scope — user responsibility; document explicitly)
- **SSL certificate propagation**: CDN SSL cert deployment can take minutes; need proper async handling
- **Origin address resolution**: OSS bucket endpoint format varies by region; use `GetBucketInfo` API
- **Cost**: CDN bandwidth + transfer acceleration fees vary by provider; document cost estimates upfront
- **CDN provisioning latency**: 5-15 minutes for domain activation; deployment feedback loop is long

## References

- [dockit#366 — Add China-region CDN mirror for faster update downloads](https://github.com/geek-fun/dockit/issues/366)
- [ADR-001: SSL/HTTPS Certificate Management](./001-ssl-certificate-management.md)
- [Alibaba Cloud: Combine CDN with transfer acceleration (dual-layer architecture)](https://www.alibabacloud.com/help/en/oss/user-guide/enable-transfer-acceleration)
- [Alibaba Cloud CDN: Accelerate OSS static content delivery](https://www.alibabacloud.com/help/cdn/use-cases/accelerate-the-retrieval-of-resources-from-an-oss-bucket-in-the-alibaba-cloud-cdn-console)
- [serverless-domain-manager — How custom domains work in serverless framework](https://github.com/amplify-education/serverless-domain-manager)
- [Alibaba Cloud CDN API Documentation](https://help.aliyun.com/zh/cdn/)
- [Alibaba Cloud CDN SDK — @alicloud/cdn20180510](https://www.npmjs.com/package/@alicloud/cdn20180510)
- [Tencent Cloud CDN API Documentation](https://cloud.tencent.com/document/product/228)
- [Tencent COS Global Acceleration](https://www.tencentcloud.com/document/product/436/40700)
- [AWS S3 Transfer Acceleration](https://docs.aws.amazon.com/AmazonS3/latest/dev/transfer-acceleration.html)
- [SST CDN — High-level CloudFront abstraction](https://sst.dev/docs/component/aws/cdn)
- [ServerlessInsight OSS Custom Domain Binding Guide](../oss-custom-domain-binding.md)
