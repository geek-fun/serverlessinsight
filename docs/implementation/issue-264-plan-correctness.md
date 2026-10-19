# Deployment plan correctness (issue #264)

## Behavior contract

- Omitted, null and empty-object settings are unmanaged unless the provider has an explicit clear contract. Never render them as promised removals.
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
| Omitted/null/empty-object configuration      | Excluded from the update diff; saved unmanaged history and tracked dependencies are retained during unrelated updates.                                                                                                     |
| Explicit empty timer or managed-policy lists | Reconcile the declared list, including removals. An explicit empty bucket policy statement list deletes the policy; omission leaves it unmanaged.                                                                          |
| Provider reads                               | Only confirmed absence permits recreation. Permission, network and nested-probe failures stop planning. Failed advertised repairs propagate instead of saving unperformed changes.                                         |
| Physical identities                          | Renames stop planning; they never silently become creates or implicit destructive replacement.                                                                                                                             |
| Unsupported updates                          | The capability table rejects them before execution. Examples include database engine/storage/network changes and SCF runtime/handler changes. Existing CDN mode/domain and NAS storage-class restrictions remain explicit. |
| Effective policy comparison                  | Use provider documents for OSS/COS/TOS, migrate old DSL-shaped saved policy intent in memory, and compare policy collections without depending on provider ordering.                                                       |
| Function lifecycle                           | Persist HTTP, domain and timer intent; reconcile readable HTTP/domain attributes and timer descriptions. Omission preserves existing lifecycle resources; explicit list changes remain actionable.                         |
| NAS and veFaaS dependencies                  | Use recorded NAS target addresses and deployed user/group IDs; derive veFaaS VPC, mount and role configuration through the same builder used during deployment.                                                            |
| Verified state-only convergence              | A read-only plan reports it; deployment adopts the new saved intent under its existing state lock without cloud writes. JSON adds optional `stateUpdates` logical IDs.                                                     |
| Presentation                                 | Human and JSON output preserve nested revert paths. Added/removed values have text markers without color. Credentials are redacted after comparison, so a secret-only edit remains visible.                                |
| Membership collections                       | Canonicalize VPC memberships, allowlists, managed policies, protocol/method sets, named timers and policy collections. Preserve order for command arguments, routes and mount sequences.                                   |

## Verification evidence

- `tests/service/plan-correctness.spec.test.ts` exercises real YAML parsing, planners, executors and persisted state with mocked cloud clients. It verifies policy drift repair and an unchanged second plan, explicit policy clearing, unmanaged omission, state-only adoption, and a code-only function update with live VPC/NAS defaults and no configuration API call.
- Shared comparison, capability, redaction, formatter and JSON tests cover nested defaults, unsupported updates, sensitive changes, set versus sequence semantics, provenance and state-only reporting.
- Provider planner/resource/client regressions cover read failures, ownership, physical identities, HTTP/domain/timer configuration, effective policy documents, strategy settings and no-refresh behavior.
- Coverage thresholds remain unchanged at 85% for statements, branches, functions and lines.
- Final validation passed on an unchanged source and test tree: 183 suites and 3,843 tests. Coverage is 96.63% statements, 86.25% branches, 97.68% functions and 97.02% lines. TypeScript build, ESLint and `git diff --check` also passed.

## Readability and migration limits

- Function code hashes compare local code with saved deployment intent; provider code bytes are not downloaded and verified.
- Some provider fields remain unavailable from read APIs. Their saved intent is the baseline, rather than proof of live equality. ES credential fingerprints detect local rotations, but cannot verify a cloud-only credential change. Legacy masked credential state needs one apply to establish its fingerprint.
- Gateway probes retain their existing API-specific limits: some domain/certificate/log and upstream fields cannot be fully compared live. veFaaS custom policy documents also have no read API in the current client.
- These tests use synthetic cloud responses and mocked cloud clients. No real-cloud deployment was performed.
