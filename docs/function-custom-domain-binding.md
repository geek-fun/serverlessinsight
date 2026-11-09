# Function Custom Domain Binding (issue #286)

Function custom domains are declared as a per-function `domains` list, mirroring the bucket (`#279`) and event (`#284`) binding models — one mental model across the three resource kinds.

## Declaration

```yaml
functions:
  fn_api:
    triggers:
      http: # required precondition (see below)
        auth_type: public
        access: [public]
    domains:
      - domain_name: api.example.com
        path: /api/* # optional; defaults to '/*'
        certificate_id: cert-1
        protocol: HTTPS # scalar or array: [HTTP, HTTPS]
      - domain_name: static.example.com
        certificate_body: ${vars.fullchain_pem}
        certificate_private_key: ${vars.key_pem}
        protocol: [HTTP, HTTPS]
```

Fields:

| Field                                          | Required      | Default   | Notes                                                                              |
| ---------------------------------------------- | ------------- | --------- | ---------------------------------------------------------------------------------- |
| `domain_name`                                  | yes           | —         | hostname, optionally wildcard (`*.example.com`) where the provider supports it     |
| `path`                                         | no            | `/*`      | route path; `*` may appear at most once and only trailing (`/api/*`)               |
| `certificate_id`                               | one cert form | —         | reference into the provider certificate service                                    |
| `certificate_body` + `certificate_private_key` | one cert form | —         | inline PEM (literal or `${vars.*}` reference). `${file(...)}` is **not** supported |
| `protocol`                                     | no            | `[HTTPS]` | scalar `HTTPS` or array `[HTTP, HTTPS]`                                            |

## Cross-function merged routes

The same `domain_name` may appear under multiple functions (paths must not duplicate exactly). si merges their routes into **one** cloud-side domain resource:

```yaml
functions:
  fn_api:
    domains:
      - { domain_name: api.example.com, path: /api/*, certificate_id: cert-1, protocol: HTTPS }
  fn_admin:
    domains:
      - { domain_name: api.example.com, path: /admin/*, certificate_id: cert-1, protocol: HTTPS }
# → one domain resource with routes: /api/* → fn_api, /admin/* → fn_admin
```

- Cloud matching is **exact > longest-prefix**, independent of route order — nested prefixes (`/api/*` + `/*`) are a legitimate catch-all pattern and are allowed. Exact duplicate paths are rejected.
- Certificate and protocol are **per-domain physical facts**: all bindings of one domain must declare the same certificate (same form and value) and the same protocol; mismatches are rejected at validation.
- Domain ownership is stack-level: removing one function only removes its routes; the domain resource is deleted when the last binding is removed (per-owner teardown with a live-route check).
- A function's routes converge in place via the provider update API (`UpdateCustomDomain`) — plan output shows per-function route changes, and a follow-up plan is a noop after deploy.

## Trigger dependency contract (all providers)

Declaring `domains` requires, on **every** provider:

1. `triggers.http` exists (the domain routes through the function URL it creates);
2. `auth_type: public`;
3. `access` (when declared) includes `public` — an intranet-only function URL cannot serve a public domain.

Aliyun FC 3.0 domains are technically independent of HTTP triggers; si still creates the free HTTP trigger so one YAML behaves identically across providers. Changing `auth_type` to `iam` while `domains` are declared is rejected.

## Certificates

Both certificate forms are accepted; each provider adapts:

| Provider    | `certificate_id`                                                       | inline PEM                                                                             |
| ----------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Aliyun FC3  | resolved through CAS to PEM, submitted inline (API only accepts PEM)   | submitted inline                                                                       |
| Tencent SCF | passed through as `CertificateId` (API only accepts an SSL-service id) | uploaded to Tencent SSL service (`Repeatable: false` — idempotent), delivered as an id |

Certificate redeploys happen only on content change: the canonical `certificate_hash` is recorded in state (issue #283 pattern). Cross-stack collisions fail fast — an existing domain whose routes do not point at this stack's functions is never adopted.

## Wildcards

The schema accepts wildcard hostnames uniformly; semantic validation enforces provider support: aliyun supports wildcards (single `*`, first label only), tencent does not and fail-fasts.

## Provider support

| Provider          | Function domains | Notes                                                                                            |
| ----------------- | ---------------- | ------------------------------------------------------------------------------------------------ |
| Aliyun FC3        | ✅               | `routeConfig.routes[]` merged reconcile                                                          |
| Tencent SCF       | ✅               | `EndpointsConfig[]` merged reconcile; namespace follows the CLI `namespace` parameter            |
| Volcengine veFaaS | ❌ fail-fast     | no domain API; the real path is an APIG trigger + APIG domain (use the event/APIG model, `#284`) |

## Function domains vs the API_GATEWAY event model

- Need **simple path-based dispatch** of HTTP traffic to functions without a gateway? → function `domains` (this model).
- Need methods/auth/rate-limiting per route, request validation, or a managed gateway? → `API_GATEWAY` event (`#284`).
- Weighted traffic shifting (canary) is a function-side versions/aliases feature (future issue); route qualifiers will surface through it — the domain model needs no change.
