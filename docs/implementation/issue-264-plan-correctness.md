# Deployment plan correctness (issue #264)

## Behavior contract

- Omitted, null and empty-object settings are never rendered as promised removals on their own. Dependents the framework created and recorded in state are removed when their YAML declaration disappears; untracked or externally created configuration stays unmanaged and is never touched. Explicit clear contracts (such as empty policy statement lists) delete as declared.
- Unknown or failed cloud reads fail planning; only a confirmed absence can schedule creation.
- Identity changes and unsupported/immutable updates fail during planning. This change does not authorize implicit replacement or resource deletion.
- Compare effective provider-shaped desired values. Redact secrets only for presentation; use change fingerprints in persisted intent.
- Separate intent changes, actual live drift and state-only convergence. A code-only change does not force configuration drift repairs.
- Every advertised repair must converge to a second unchanged plan.

## Shared helper impact

| Callers                                             | Operation                                  | Safety requirement                                                                     |
| --------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------- |
| FC3 and veFaaS planners                             | Live comparison, baseline and revert paths | Preserve unreadable code hashes; resolve dependent configuration before comparison.    |
| Alibaba API Gateway                                 | Live group comparison and baseline         | Honor no-refresh; keep trigger probes distinct from readable attributes.               |
| OSS, COS and TOS planners                           | Shared refresh and policy comparison       | Canonical provider policy documents; distinguish known absence from unavailable reads. |
| RDS, Alibaba ES, TDSQL-C, Tencent ES and TableStore | Shared refresh                             | Reject unsupported updates before execution or state writes.                           |
| SCF planner                                         | Shared refresh and nested probes           | Reject immutable runtime/handler changes; compare lifecycle configuration separately.  |
| Human formatter and JSON projection                 | Attribute differences and provenance       | Preserve actions and nested paths with or without color.                               |

The helpers retain provider-unreadable fields as stored intent, project structural defaults only to declared fields, and preserve full replacement semantics for explicitly managed environment maps. Set normalization is limited to named membership fields; ordered command/route arrays remain ordered.

## Alternatives

1. Formatter-only filtering would hide false positives but leave incorrect scheduling and repairs unchanged.
2. Provider-specific duplicate comparisons would allow planners and executors to drift again and multiply maintenance work.
3. Shared comparison semantics plus provider capability/effective-definition builders are used: provider differences remain explicit, while diff and presentation share one contract.

The maintenance cost is a capability/builder update plus a round-trip and convergence regression whenever a new managed field is introduced. This avoids adding new provider API calls as part of an unrelated display fix.

## Implementation checklist

- [x] R01 failed reads
- [x] R02 unmanaged and nested defaults
- [x] R03 intent versus drift
- [x] R04 known absence and strategy drift
- [x] R05 provider-shaped policies
- [x] R06 effective policy repairs
- [x] R07 update capabilities
- [x] R08 credential changes
- [x] R09 effective FC3 NAS
- [x] R10 effective veFaaS configuration
- [x] R11 HTTP and domain lifecycle
- [x] R12 timer descriptions
- [x] R13 physical identities
- [x] R14 no-refresh
- [x] R15 presentation provenance
- [x] R16 membership sets
- [x] Full tests, all coverage thresholds, build and lint

## Field and lifecycle contracts

| Dimension                                    | Result                                                                                                                                                                                                                     |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Omitted/null/empty-object configuration      | Excluded from the update diff. Dependents the framework created and recorded in state (managed bucket policy, custom domains, tracked DNS records) are removed when their owning declaration disappears; untracked or externally created configuration is retained. |
| Explicit empty timer or managed-policy lists | Reconcile the declared list, including removals. Both an explicit empty bucket policy statement list and the omission of `iam` on an owned bucket delete the policy.                                                                                             |
| Provider reads                               | Identity and existence reads are fail-closed: only confirmed absence permits recreation, and permission, network and probe failures stop planning. Optional sub-configuration reads on OSS and COS buckets (ACL and CORS) fall back to stored intent when the provider returns them unreliably. Failed advertised repairs propagate instead of saving unperformed changes. |
| Physical identities                          | Renames stop planning; they never silently become creates or implicit destructive replacement.                                                                                                                                                                                                                                                                    |
| Unsupported updates                          | The capability table rejects them before execution. Examples include database engine/storage/network changes and SCF runtime/handler changes. Existing CDN mode/domain and NAS storage-class restrictions remain explicit. |
| Effective policy comparison                  | Use provider documents for OSS/COS/TOS, migrate old DSL-shaped saved policy intent in memory, and compare policy collections without depending on provider ordering.                                                       |
| Function lifecycle                           | Persist HTTP, domain and timer intent; reconcile readable HTTP/domain attributes and timer descriptions. Dependents the framework created and recorded in state (HTTP triggers, custom domains, timer triggers) are deleted when their declaration is removed. Timer removal is ownership-based: trigger records the framework owns are torn down, while unrecorded timers are only removed when the timer list itself is declared (the issue #258 live reconcile). Externally created triggers are never touched. Explicit list changes remain actionable. |
| Managed-dependency ownership                 | Applied bucket policies and tracked DNS records/others live in state as explicit instances (`*_BUCKET_POLICY` types plus per-provider helper APIs). Ownership inherits from legacy state that stored a policy document, so policies applied before this change are still torn down by omission.                                    |
| NAS and veFaaS dependencies                  | Use recorded NAS target addresses and deployed user/group IDs; derive veFaaS VPC, mount and role configuration through the same builder used during deployment.                                                            |
| Verified state-only convergence              | A read-only plan reports it; deployment adopts the new saved intent under its existing state lock without cloud writes. JSON adds optional `stateUpdates` logical IDs.                                                     |
| Presentation                                 | Human and JSON output preserve nested revert paths. Added/removed values have text markers without color. Credentials are redacted after comparison, so a secret-only edit remains visible.                                |
| Membership collections                       | Canonicalize VPC memberships, allowlists, managed policies, protocol/method sets, named timers and policy collections. Preserve order for command arguments, routes and mount sequences.                                   |

## Verification evidence

- `tests/service/plan-correctness.spec.test.ts` exercises real YAML parsing, planners, executors and persisted state with mocked cloud clients. It verifies policy drift repair and an unchanged second plan, policy removal after omitting `iam` on an owned bucket and its converging second plan, explicit policy clearing, state-only adoption, and a code-only function update with live VPC/NAS defaults and no configuration API call.
- Shared comparison, capability, redaction, formatter and JSON tests cover nested defaults, unsupported updates, sensitive changes, set versus sequence semantics, provenance and state-only reporting.
- Provider planner/resource/client regressions cover read failures, ownership, physical identities, HTTP/domain/timer configuration, effective policy documents, strategy settings and no-refresh behavior.
- Coverage thresholds remain unchanged at 85% for statements, branches, functions and lines.
- Final validation passed on an unchanged source and test tree: 184 suites and 3,989 tests, including the ownership-based removal suite. Coverage is above 85% statements, branches, functions and lines. TypeScript build, ESLint and `git diff --check` also passed.
- The coverage follow-up adds 125 regression cases for optional configuration read failures, lifecycle comparisons and repairs, effective dependency settings, state-only adoption, and diff provenance. Production code and coverage settings are unchanged by that follow-up.

## Readability and migration limits

- Tencent SCF HTTP triggers are not recorded as state instances because Tencent does not keep the requested trigger name, so their removal is not yet state-owned: they are updated in place while declared and neither recorded nor deleted when the declaration is removed. Recording the cloud-assigned trigger name at create time is a follow-up that needs the live SCF response shape verified.
- Function code hashes compare local code with saved deployment intent; provider code bytes are not downloaded and verified.
- Some provider fields remain unavailable from read APIs. Their saved intent is the baseline, rather than proof of live equality. ES credential fingerprints detect local rotations, but cannot verify a cloud-only credential change. Legacy masked credential state needs one apply to establish its fingerprint.
- Gateway probes retain their existing API-specific limits: some domain/certificate/log and upstream fields cannot be fully compared live. veFaaS custom policy documents also have no read API in the current client.
- These tests use synthetic cloud responses and mocked cloud clients. No real-cloud deployment was performed.


## Repair contract follow-up

- Bucket reads distinguish successful values, confirmed absence (`null`), and unavailable fields (`undefined`). Only a failed bucket identity read with a known absence result permits creation. Managed website, versioning, encryption, and policy read failures stop planning; optional ACL/CORS fallback remains unchanged. An unclassified HTTP 403/404 is not proof that a policy is absent.
- The bucket parser preserves an omitted `www_bind_apex` flag. On an existing domain, omission retains the owned binding and its complete state instance; explicit `false` removes it. A parent-domain replacement or removal tears down its owned bindings. CDN updates preserve retained instances and continue through policy reconciliation and merged intent persistence.
- Custom-domain delete operations on FC3 and SCF succeed when the domain is already absent and propagate other failures. Function plans retain every applicable HTTP/domain repair reason. SCF identifies saved function instances by their function identity, including records whose `type` contains a provider value, and excludes them from dependent-instance reconstruction.
- `tests/service/plan-repair-contracts.spec.test.ts` exercises real YAML parsing, provider wrappers, planning, execution, and persisted-state round trips with mocked cloud clients. It covers retained and removed bucket bindings, forbidden or malformed reads, simultaneous HTTP/domain drift, and retry after failed domain recreation. SDK and mapper unit tests cover absence/error classification and unavailable fields without fabricated revert markers.
