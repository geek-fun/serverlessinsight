# ADR-001: SSL/HTTPS Certificate Management

- **Status**: Superseded (Updated 2026-03-20)
- **Date**: 2026-03-19
- **Authors**: ServerlessInsight Team
- **Deciders**: @geek-fun/core

## Context

ServerlessInsight manages custom domains for API Gateway endpoints and OSS bucket websites. Users need HTTPS access on these domains, which requires SSL/TLS certificates.

**Current limitations**:

1. **No reuse** — PEM content duplicated across domains
2. **Upload-only** — no way to reference existing provider certificates
3. **No bucket SSL** — `BucketRaw.website.domain` has no certificate support
4. **No protocol control** — no HTTP/HTTPS configuration
5. **Provider-coupled** — inline PEM maps to Alibaba API only

## Decision Drivers

1. **Provider agnosticism** — work across Alibaba, Tencent, Huawei, AWS
2. **Separation of concerns** — certificate lifecycle independent of domain lifecycle
3. **DRY configuration** — one certificate definition, referenced by many domains
4. **Simplicity** — users provide certificates, no auto-provisioning
5. **SI Cloud readiness** — support `${secrets.xxx}` for future platform integration

## Research: Provider Models

Terraform reveals three fundamentally different provider certificate models:

| Dimension              | AWS (ACM)                          | Alibaba (CAS/FC)                                 | Tencent (SSL)                                    |
| ---------------------- | ---------------------------------- | ------------------------------------------------ | ------------------------------------------------ |
| **Upload**             | `certificate_body` + `private_key` | `cert` + `key` on CAS, OR inline PEM on consumer | `cert` + `key` on `tencentcloud_ssl_certificate` |
| **Reference existing** | ARN                                | CAS certificate ID                               | SSL certificate ID                               |
| **Binding model**      | Consumer references cert ARN       | Consumer takes inline PEM or cert ID             | Separate deploy operation pushes cert            |

**Decision**: ServerlessInsight will **NOT auto-provision certificates**. Users provide certificates via Upload (PEM files) or Reference (existing provider cert ID). ACME/Let's Encrypt may be added later.

## Decision

### Three-Layer Architecture

#### Layer 1: Top-Level `certificates` Block

Certificates are top-level named resources, separate from domains that consume them:

```yaml
certificates:
  api_cert:
    certificate_body: ./certs/cert.pem # file path auto-detected
    private_key: ./certs/key.pem
    chain: ./certs/chain.pem # optional

  wildcard:
    certificate_id: cas-abc123 # reference existing cert

  # Future: SI Cloud platform
  # production_cert:
  #   certificate_id: ${secrets.production_cert_id}

functions:
  api:
    name: my-api-fn
    code:
      runtime: nodejs18
      handler: index.handler
      path: ./src

events:
  gateway:
    type: API_GATEWAY
    name: my-gateway
    triggers:
      - method: GET
        path: /api/hello
        backend: ${functions.api}
    domain:
      domain_name: api.example.com
      certificate: ${certificates.api_cert}
      protocol: HTTPS # "HTTP" | "HTTPS" | ["HTTP", "HTTPS"]

buckets:
  site:
    name: my-site
    website:
      code: dist
      index: index.html
      domain:
        domain_name: www.example.com
        certificate: ${certificates.api_cert} # same cert, reused
        protocol: ['HTTP', 'HTTPS'] # both protocols, no redirect
```

#### Layer 2: Behavior Inference

No `mode` field — behavior inferred from field presence:

| Fields Present                     | Behavior      | When to Use                                                 |
| ---------------------------------- | ------------- | ----------------------------------------------------------- |
| `certificate_body` + `private_key` | **Upload**    | You have cert files from a CA                               |
| `certificate_id`                   | **Reference** | Cert exists in provider's certificate service (CAS/SSL/ACM) |

#### Layer 3: Provider Adapters

Each provider implements certificate operations as plain functions:

```typescript
// Each provider's client module exposes these operations
type CertificateOperations = {
  uploadCertificate: (
    name: string,
    cert: string,
    key: string,
    chain?: string,
  ) => Promise<{ certificateId: string }>;
  getCertificate: (certificateId: string) => Promise<CertificateInfo | null>;
  deleteCertificate: (certificateId: string) => Promise<void>;
};
```

| Behavior      | Alibaba Cloud                                 | Tencent Cloud                            | AWS (future)                     |
| ------------- | --------------------------------------------- | ---------------------------------------- | -------------------------------- |
| **Upload**    | Upload to CAS → inline PEM to API GW          | Upload to SSL → deploy operation to bind | Import to ACM → reference by ARN |
| **Reference** | Fetch from CAS by ID → inline PEM to consumer | Fetch from SSL by ID → deploy operation  | Reference ACM ARN directly       |

### Protocol Configuration

`protocol` accepts string or array — redirect is inferred:

| Value               | Behavior                | HTTP→HTTPS Redirect |
| ------------------- | ----------------------- | ------------------- |
| `"HTTP"`            | HTTP only (no TLS)      | N/A                 |
| `"HTTPS"`           | HTTPS only              | **Enabled**         |
| `["HTTP", "HTTPS"]` | Both protocols accepted | Disabled            |

### Type System

```typescript
// src/types/domains/certificate.ts
export type CertificateRaw = {
  certificate_body?: Resolvable<string>;
  private_key?: Resolvable<string>;
  chain?: Resolvable<string>;
  certificate_id?: Resolvable<string>;
};

// Updated EventRaw.domain
export type EventRaw = {
  // ... existing fields ...
  domain?: {
    domain_name: Resolvable<string>;
    certificate?: Resolvable<string>; // ${certificates.xxx} reference
    protocol?: Resolvable<string | string[]>; // "HTTP" | "HTTPS" | ["HTTP", "HTTPS"]
  };
};

// Updated ServerlessIacRaw
export type ServerlessIacRaw = {
  // ... existing fields ...
  certificates?: { [key: string]: CertificateRaw };
};
```

### Validation Schema

```typescript
export const certificateSchema = {
  type: 'object',
  patternProperties: {
    '.*': {
      type: 'object',
      properties: {
        certificate_body: { type: 'string' },
        private_key: { type: 'string' },
        chain: { type: 'string' },
        certificate_id: { type: 'string' },
      },
      oneOf: [
        { required: ['certificate_body', 'private_key'], not: { required: ['certificate_id'] } },
        {
          required: ['certificate_id'],
          not: { anyOf: [{ required: ['certificate_body'] }, { required: ['private_key'] }] },
        },
      ],
      additionalProperties: false,
    },
  },
};
```

### File Path Auto-Detection

`certificate_body` and `private_key` auto-detect file paths:

| Condition                                 | Treatment  |
| ----------------------------------------- | ---------- |
| Value starts with `./` or `../`           | File path  |
| Value ends with `.pem`, `.crt`, or `.key` | File path  |
| Otherwise                                 | Inline PEM |

### SI Cloud Platform Integration (Future)

`${secrets.xxx}` resolves values from SI Cloud at deploy time — orthogonal to certificate logic:

```yaml
certificates:
  production_cert:
    certificate_id: ${secrets.production_cert_id}

functions:
  api:
    environment:
      DB_PASSWORD: ${secrets.db_password}
```

#### Template Reference Namespaces

| Namespace             | Source                      | Resolution                   | Available |
| --------------------- | --------------------------- | ---------------------------- | --------- |
| `${vars.xxx}`         | Local `vars:` block         | Parse-time, local            | Yes       |
| `${stages.xxx}`       | Local `stages:` block       | Parse-time, local            | Yes       |
| `${functions.xxx}`    | Local `functions:` block    | Parse-time, local            | Yes       |
| `${certificates.xxx}` | Local `certificates:` block | Parse-time, local            | This ADR  |
| `${secrets.xxx}`      | SI Cloud secret store       | Deploy-time, remote API call | Future    |

**Key distinction**: Local references resolved at parse time; `${secrets.xxx}` resolved at deploy time via authenticated API.

#### Resolution Flow

```
1. Parser encounters ${secrets.xxx} → preserves as unresolved reference
2. Deploy time: resolver batch-fetches all ${secrets.*} references
   POST /api/v1/secrets/{org}/{project}/resolve
   Body: { "keys": ["production_cert_id", "db_password"] }
3. Resolved values injected as plain strings
4. Normal behavior inference proceeds (certificate_id → Reference, etc.)
5. Secrets NEVER written to state files or logs
```

#### Security Constraints

- Secrets never persisted locally — exist only in memory during deployment
- State records template reference (`${secrets.xxx}`), never resolved value
- Logger redacts any value resolved from `${secrets.xxx}`
- Authentication required via `si-cloud-token` (from `si login` or `SI_CLOUD_TOKEN` env)
- Secrets scoped to organization + project

#### State Example with Secrets

```json
{
  "certificates.production_cert": {
    "definition": {
      "certificateName": "production_cert",
      "certificateIdRef": "${secrets.production_cert_id}"
    },
    "instances": [
      {
        "type": "ALIYUN_CAS_CERTIFICATE",
        "id": "cas-67890",
        "expirationDate": "2027-06-01T00:00:00Z"
      }
    ],
    "status": "ready"
  }
}
```

The `certificateIdRef` preserves the template expression for re-resolution on subsequent deployments.

## Architecture Decisions

### Decision 1: Top-Level `certificates` Block

**Rationale**: Enables reuse, clean lifecycle management, and provider-agnostic mapping. Alternatives (inline-only, lookup-only) rejected due to DRY violations and poor UX.

### Decision 2: Two Behaviors Only (Upload + Reference)

**Rationale**: Implementation simplicity. Provider variability (Tencent free DV, Alibaba China-only, AWS ACM) makes auto-provisioning inconsistent. ACME can be added later without schema changes.

### Decision 3: Protocol as String or Array

**Rationale**: Simpler schema — redirect inferred from protocol value. `"HTTPS"` implies redirect; `["HTTP", "HTTPS"]` disables it.

### Decision 4: File Path Auto-Detection

**Rationale**: No special syntax needed. Users write file paths directly. Follows Terraform precedent.

### Decision 5: `${secrets.xxx}` as Value Source

**Rationale**: Works for any sensitive value (passwords, API keys, cert IDs, PEM). No schema explosion.

## Implementation Plan

| Phase | Scope                         | Key Tasks                                                             |
| ----- | ----------------------------- | --------------------------------------------------------------------- |
| **1** | Type System + Schema          | `CertificateRaw` type, `certificateSchema`, parser, i18n              |
| **2** | Alibaba Certificate Ops       | `casOperations.ts`, API Gateway certificate binding, state management |
| **3** | Protocol Config               | Protocol + redirect inference in `apigwResource.ts`                   |
| **4** | Bucket Domain SSL             | Structured `website.domain`, OSS SSL binding                          |
| **5** | Tencent SSL Ops               | `sslOperations.ts`, `DeployCertificateInstance` flow                  |
| **6** | SI Cloud Integration (Future) | `${secrets.xxx}` resolver, `si login` CLI                             |

## Consequences

**Positive**: Certificate reuse, provider flexibility, clean separation, state-tracked, SI Cloud ready, no `mode` boilerplate.

**Negative**: Migration needed for existing inline PEM users; Alibaba `certificate_id` requires extra API call; OSS SSL may need CDN.

**Risks**: File path detection edge cases; provider API changes; SI Cloud availability for `${secrets.xxx}`.

## User Guide: Obtaining Certificates

### Tencent Cloud

1. [SSL Console](https://console.cloud.tencent.com/ssl) → "Apply for Free Certificate"
2. Select "TrustAsia C1 DV" (free, 3-month, single domain only)
3. DNS validation (auto if on DNSPod, otherwise manual TXT)
4. Download PEM or copy `certificate_id`

**Limitations**: 20 free certs/account/year, no wildcards for free tier.

### Alibaba Cloud

1. [CAS Console](https://yundun.console.aliyun.com/?p=cas) → "DV SSL Certificate"
2. Complete DNS/email validation
3. Download PEM or use `certificate_id`

**Limitations**: Free DV only on China site (aliyun.com); quota pre-purchase required; 1-2 business day validation.

### Let's Encrypt (Any Provider)

```bash
# DNS-01 for wildcards
certbot certonly --manual --preferred-challenges dns -d "*.example.com" -d "example.com"

# HTTP-01 for single domains
certbot certonly --standalone -d api.example.com
```

Files: `/etc/letsencrypt/live/example.com/fullchain.pem` → `certificate_body`, `privkey.pem` → `private_key`.

**Note**: 90-day validity — set up renewal cron job.

## Future Considerations

**ACME / Let's Encrypt Auto-Provisioning**: May be added later. Would require ACME client library, DNS API integration (DNSPod, Alibaba DNS, Route53), and renewal tracking. Preferred for managed provisioning due to provider-agnostic nature and wildcard support.

| Capability       | Tencent (native) | Alibaba (CAS) | ACME / Let's Encrypt |
| ---------------- | ---------------- | ------------- | -------------------- |
| Free DV via API  | ✅ Global        | ⚠️ China only | ✅ Global            |
| Wildcard support | ❌ (free)        | ❌ (free)     | ✅                   |
| Provider lock-in | Yes              | Yes           | None                 |

## Update (2026-03-20): Remove Top-Level `certificates` Block

### Motivation

The original three-layer architecture (top-level `certificates` block → `${certificates.xxx}` reference → provider adapter) introduced several problems:

1. **Stage collision** — Certificate names are not stage-scoped, causing collisions when deploying the same service to multiple stages (dev, staging, prod)
2. **Dual-pattern confusion** — Events supported both `${certificates.xxx}` references AND legacy inline fields (`certificate_body`, `certificate_private_key`), creating ambiguity
3. **Schema inconsistency** — Certificates as a top-level reference namespace (`${certificates.xxx}`) doesn't match how other resources work. Functions, buckets, and events create physical resources from YAML config. Certificates are pre-existing artifacts (requiring manual verification/approval to obtain), making them a reference rather than a managed resource
4. **Unnecessary indirection** — The `certificates` block adds a layer of indirection that doesn't provide meaningful value given the existing `${vars.xxx}` and `${stages.xxx}` mechanisms for sharing values

### Decision

**Remove the `certificates` top-level block entirely.** Certificate fields are inlined directly on each consumer (event domains and bucket domains).

#### New Schema

```yaml
# Event domain with certificate (upload mode)
events:
  gateway:
    type: API_GATEWAY
    name: my-gateway
    triggers:
      - method: GET
        path: /api/hello
        backend: ${functions.api}
    domain:
      domain_name: api.example.com
      certificate_body: ./certs/cert.pem
      certificate_private_key: ./certs/key.pem
      protocol: HTTPS

# Event domain with certificate (reference mode)
events:
  gateway:
    domain:
      domain_name: api.example.com
      certificate_id: cas-abc123
      protocol: HTTPS

# Bucket domain with certificate
buckets:
  site:
    name: my-site
    website:
      code: dist
      domain:
        domain_name: www.example.com
        certificate_body: ${vars.cert_body}
        certificate_private_key: ${vars.cert_key}
        protocol: ['HTTP', 'HTTPS']
```

#### Mutual Exclusion

`certificate_id` XOR (`certificate_body` + `certificate_private_key`) — enforced via JSON Schema `oneOf`. Providing both is a validation error.

#### Auto-Generated Certificate Name

Provider-side certificate name is deterministic and stage-scoped: `{service}-{stage}-{resourceType}-{resourceKey}`. This eliminates name collisions across stages.

#### DRY via Existing Mechanisms

Users share certificate values across consumers using `${vars.xxx}` or `${stages.xxx}`:

```yaml
vars:
  cert_body: ./certs/cert.pem
  cert_key: ./certs/key.pem

events:
  gateway:
    domain:
      domain_name: api.example.com
      certificate_body: ${vars.cert_body}
      certificate_private_key: ${vars.cert_key}

buckets:
  site:
    website:
      domain:
        domain_name: www.example.com
        certificate_body: ${vars.cert_body}
        certificate_private_key: ${vars.cert_key}
```

#### Validation Warning

When `certificate_private_key` contains inline PEM content (detected by `BEGIN` or `PRIVATE KEY` keywords), a warning is emitted suggesting file paths instead. This is a warning, not an error — inline PEM is still valid.

#### Provider Constraints

- **Tencent Cloud COS** does not support `certificate_id` for bucket domains. Using `certificate_id` on a Tencent bucket domain throws `TENCENT_CERT_REFERENCE_NOT_SUPPORTED`.
- **Aliyun API Gateway** and **Aliyun OSS** support both `certificate_id` and upload modes.

### Files Removed

- `src/types/domains/certificate.ts` — `CertificateRaw` and `CertificateDomain` types
- `src/common/certificateResolver.ts` — `resolveUploadCertificate`, `resolveReferenceCertificate`, `resolveCertificateDomain`
- `src/parser/certificateParser.ts` — `parseCertificate`, `isFilePath`
- `src/validator/certificateSchema.ts` — Certificate validation schema

### Files Added

- `src/common/certUtils.ts` — Shared utility with `isFilePath()`, `readPemContent()`, `warnInlinePem()`

### Updated Template Reference Namespaces

| Namespace                 | Source                          | Resolution                   | Available   |
| ------------------------- | ------------------------------- | ---------------------------- | ----------- |
| `${vars.xxx}`             | Local `vars:` block             | Parse-time, local            | Yes         |
| `${stages.xxx}`           | Local `stages:` block           | Parse-time, local            | Yes         |
| `${functions.xxx}`        | Local `functions:` block        | Parse-time, local            | Yes         |
| ~~`${certificates.xxx}`~~ | ~~Local `certificates:` block~~ | ~~Parse-time, local~~        | **Removed** |
| `${secrets.xxx}`          | SI Cloud secret store           | Deploy-time, remote API call | Future      |

---

## References

- [Terraform `alicloud_ssl_certificates_service_certificate`](https://registry.terraform.io/providers/aliyun/alicloud/latest/docs/resources/ssl_certificates_service_certificate)
- [Terraform `tencentcloud_ssl_certificate`](https://registry.terraform.io/providers/tencentcloudstack/tencentcloud/latest/docs/resources/ssl_certificate)
- [Alibaba Cloud CAS API](https://help.aliyun.com/zh/ssl-certificate/)
- [Tencent Cloud SSL API](https://cloud.tencent.com/document/product/400)
- [ACME Protocol (RFC 8555)](https://datatracker.ietf.org/doc/html/rfc8555)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
