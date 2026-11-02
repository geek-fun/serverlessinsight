# Regional Deployment State Isolation (issue #280)

One deployment state is identified by **Service + Stage + Region**. The same
service and stage can be deployed to different regions without overwriting
state, blocking unrelated regional operations, or affecting another region
during destroy or recovery. YAML path, filename, and content hash are never
deployment identity.

```
Product hierarchy: Organization -> App -> Service -> Stage -> Region
Deployment scope:  Service + Stage + Region  (provider is a constraint, not an axis)
```

## State format V4

`CURRENT_STATE_VERSION` is `4.0`: one state document per Stage/Region scope.
The legacy V3 aggregate (one document per App/Service, all stages, no region
axis) remains readable for compatibility but is never written by this CLI.

```json
{
  "version": "4.0",
  "provider": "aliyun",
  "app": "example-app",
  "service": "example-service",
  "scope": { "stage": "prod", "region": "cn-hangzhou" },
  "lineage": "per-document uuid",
  "serial": 1,
  "stages": { "prod": { "resources": {} } },
  "migration": { "opId": "...", "sourceVersion": "3.0", "sourceHash": "..." }
}
```

Contract rules:

- A V4 document contains **only its selected stage**; the runtime `resources`
  projection is hydrated from `stages[scope.stage]` and never persisted.
- Every load/save validates the document identity (provider, app, service,
  stage, region) against the requested deployment scope. A foreign-scope
  document throws `StateScopeMismatchError` — it is never served as "the state".
- Each regional document has independent `lineage`, `serial`, version/hash,
  lock, backups and current-state handling.
- Missing state (fresh scope) is distinct from malformed data, authorization
  failures, connectivity failures and unsupported versions: only a confirmed
  absence yields an empty state. A missing bucket or an access denial is an
  error, never empty state.

## Effective command configuration

One shared resolver (`src/common/effectiveConfig.ts`) produces the effective
provider/region/stage for every command run:

```
explicit CLI option  >  YAML static default  >  environment fallback  >  default
```

- Environment variables (`SI_REGION`, `ALIYUN_REGION`) apply only when both the
  CLI and the YAML leave the field unset — they are not an override channel for
  explicit YAML values.
- `provider` and `region` stay static during variable evaluation; the final IAC
  carries the effective values, so planning/execution can never dispatch with a
  provider or region different from the resolved configuration.
- One service has exactly one provider. A mismatch against an existing
  deployment is rejected before any cloud mutation.
- The resolved scope is fixed for the whole command run.

Commands: `deploy`, `diff`, `destroy`, `show`, `validate`, `local`, `migrate`,
`force-unlock` all resolve through the same path. `show` accepts the same
`-r/--region` and `-v/--provider` scope options as mutation commands.

## Storage layouts

| Backend      | Legacy (V3, discovery entry)                    | Scoped (V4, authoritative)                                              |
| ------------ | ----------------------------------------------- | ----------------------------------------------------------------------- |
| LOCAL        | `.serverlessinsight/state-<app>-<service>.json` | `.serverlessinsight/states/<app>/<service>/<stage>/<region>/state.json` |
| BUCKET_STORE | `<key>`                                         | `<key>.scopes/<app>/<service>/<stage>/<region>/state.json`              |
| SAAS         | server-side, keyed by service+stage             | service+stage+region (scope protocol)                                   |

Locks live next to the scoped document (`<state path>.lock` for LOCAL,
`<scoped key>.si-lock` for buckets) — two regions never share a lock.

### Bucket storage location is static

`state_manager` accepts explicit storage settings that are **decoupled from the
workload**:

```yaml
backend:
  state_manager:
    type: BUCKET_STORE
    bucket: my-state-bucket
    key: infra/state
    storageRegion: cn-hangzhou # optional: pin where state lives
    storageProvider: aliyun # optional: pin whose storage SDK is used
```

Explicit settings never change when the workload `-r` or `-v` changes. When
omitted, the storage location is resolved from the workload context at backend
creation. State-storage credentials are the workload credentials — SaaS account
binding is intentionally not introduced; unsupported combinations fail with a
clear error instead of silently picking whichever key exists.

### Remote locking

OSS and COS state mutations require conditional creation for locks and the
immutable service provider reservation. A store that cannot evaluate the
condition is refused; a read/write/verify sequence is not mutual exclusion.
Different regions use distinct locks, while the provider reservation is shared
by all regions of one service and must be established before cloud mutation.

The state bucket must keep versioning disabled (never enabled). Both enabled and
suspended versioning invalidate the forbid-overwrite guarantee; the adapters
check bucket versioning before exclusive creation and reject those states.
Credentials therefore need `oss:GetBucketVersioning` or `cos:GetBucketVersioning`
in addition to the existing object permissions. Keep bucket versioning disabled
throughout operations; si retains its own state backups.
See [OSS PutObject](https://help.aliyun.com/en/oss/developer-reference/putobject)
and [COS PUT Object](https://cloud.tencent.com/document/product/436/7749).

## SaaS regional protocol

The CLI requires `GET /api/v1/capabilities` to advertise all of:
`regionalScope: true`, `scopeProtocol: 2`, and `stateFormat: "4.0"`.
Missing, older, or newer unsupported protocols fail before provisioning or cloud
mutation. There is no fallback to unscoped writes.

- Identity lookup, current state, imports, and locks select an explicit stage
  and region. Read-only `diff`/`show` never create deployments or lifecycles.
- New services opt into regional mode at creation. Existing legacy services
  require an explicit server-side binding and activation; the CLI cannot
  activate them implicitly.
- Current-state and sync responses include `scopeProtocol`, `stageId`, `stage`,
  `region`, snapshot `id`, `contentHash`, `versionNumber`, and `serviceId`.
  Binding metadata is authoritative independently of the historical JSON format.
  A migrated V3 snapshot can be projected into V4 at runtime without changing
  its historical JSON, hash, or native resource IDs.
- A sync sends `baseContentHash`: the last server-acknowledged hash, or `""`
  only after a confirmed 404. The server returns its authoritative snapshot.
  Document-local serial/lineage are not the SaaS concurrency mechanism.
- New content hashes use SHA-256 over JSON with recursively sorted object keys;
  array order is preserved. This survives JSONB key reordering. An existing
  head's CAS hash is always taken from its response, never reconstructed.
- `start` compares the approved plan's base before invoking cloud mutations.
  Incremental writes name their active `deploymentId`; another writer cannot
  alter that lifecycle while the run owns it.
- `complete`/`fail` reference the acknowledged `stateId` and `baseContentHash`.
  New terminal state uses the same CAS rules. Stale terminal payloads cannot
  rewind the current head. Conflicting failure diagnostics can be retained
  without replacing state.
- Sync/start/terminal requests can be retried after a lost response without
  re-running cloud callbacks or duplicating snapshots. Invalid acknowledgments
  fail closed.

### Importing Local/Bucket state into SaaS

First split a legacy V3 aggregate with the protected regional migration below.
Then import each V4 stage/region separately:

```sh
si migrate --to-regional --dry-run
si migrate --to-regional
si migrate --stage prod --region cn-hangzhou --dry-run
si migrate --stage prod --region cn-hangzhou
si migrate --stage prod --region cn-beijing
```

Keep the Local/Bucket backend configured during these commands. Each import
checks the target provider and regional activation, sends the selected region
and protocol, and verifies the returned snapshot/lifecycle/hash before marking
only that source document `managedBy=saas`. Other regional copies remain under
their existing ownership. An already transferred source is not uploaded again.
`--force` still uses the preflight head's hash; it cannot overwrite a concurrently
changed target. Shared-only regional documents can be imported as well.

After importing the required scopes, select the SaaS backend and owning org,
verify an empty plan in each region, and resume deployments. Stop legacy writers
throughout cutover. Existing SaaS V3 state uses the server-side audit/bind/enable
procedure instead of `--to-regional`, which applies only to Local/Bucket sources.

## Resource identity and ownership

- A service-level **provider binding** is persisted next to the scoped
  documents and checked on every mutating write and readiness probe: the same
  App/Service cannot be opened under a different provider in a new region.
- Ownership tags on **new** resources encode the owning region:
  `si-owned-by: <app>-<service>:<logicalId>@<region>`. Region-tagged values
  must match the checking scope; legacy values (no `@region`) keep their
  single-region adoption semantics. Pre-regional tags cannot be
  region-discriminated — the migration dry-run reports them.
- Execution roles are account-global: fresh auto-named roles incorporate the
  region (`buildFunctionRoleName(service, stage, region, fnKey)`); existing
  deployments keep their recorded names (stored-first, no recreation).
- SIDs (`si:<provider>:<service>:<stage>:<id>`) are intentionally unchanged:
  per-provider, lifecycle-bound to their physical resource, not a cross-region
  address.
- Regional resources (SLS/TLS/CLS log containers) need no region in the name —
  the same name in two regions is already two physical resources.
- Explicit customer names remain explicit; collisions produce clear conflict
  errors. Shared global resources have exactly one owning state; other regional
  deployments reference them externally.

## Migration: `si migrate --to-regional`

The protected V3 → V4 split for LOCAL/BUCKET_STORE backends — explicit,
evidence-based, distinguishable from (and composable with) the SaaS migration.

```sh
si migrate --to-regional --dry-run              # classify, write nothing
si migrate --to-regional                        # review, confirm, apply
si migrate --to-regional --bind-unknown-region cn-hangzhou
si migrate --to-regional --legacy-app old-app --legacy-service old-svc
si migrate --to-regional --rollback-op-id <opId>
```

Classification rules:

- Resource `region` fields are the **only** historical evidence. YAML defaults,
  CLI flags and filenames are not evidence.
- Resources without region evidence require `--bind-unknown-region` — the CLI
  never guesses.
- `stages[stage].shared` entries are classified explicitly and are never
  duplicated across regional documents.
- A provider mismatch between the aggregate and the effective provider is
  reported as a warning (the recorded binding is preserved).

Apply order (each artifact named by the migration `opId`):

0. **Preconditions** — the split refuses a source already owned by the Console
   (`managedBy: saas`), an already-split source (`managedBy: regional`), a plan
   that would leave any resource-holding stage uncovered, a conflicting
   service provider binding, or any target document that already holds
   independent state. Nothing is written until every precondition holds.
1. **Backup first** — the exact source document (canonical hash recorded)
   lands in `<legacy>.pre-regional-<opId>` / `<key>.pre-regional-<opId>.json`.
2. Scoped V4 documents are written — each under its own scope lock so a
   concurrent deploy cannot interleave (independent lineage, serial 1,
   provenance stamped in `migration`). Unknown-region resources are placed
   ONLY in the explicitly bound region, never duplicated across siblings.
3. The legacy entry is rewritten as a **V4 tombstone**: original content kept
   for forensics, but `version: "4.0"` + `managedBy: "regional"`. Old CLIs
   refuse it with a version error **before any mutation** (they reject any
   version above 3.0); this CLI treats the tombstone as an absent source — the
   scoped documents are authoritative and NEW regions start fresh.
4. The service provider binding (`.serverlessinsight/states/<app>/<service>/
provider.json` / `<key>.scopes/<app>/<service>/provider.json`) records the
   source provider; a later scope of the same service under a different
   provider is refused.
5. A migration report is stored next to the scoped documents; it carries the
   ACTUAL written document set (including binding-generated documents).

Before writing the first target, migration persists its plan, operation ID,
original target documents and recovery phase in `<legacy-entry>.regional-migration.json`.
The original source remains in its operation-specific backup. Re-running the
same command automatically resumes an incomplete operation, including a failure
between tombstone creation and report persistence. Keep the original app,
service, provider, stage and unknown-region binding options.

All target locks are held in deterministic order through validation, persistence
and cutover. Recovery only reuses documents that exactly match their recorded
migration-time content; independent writes are never overwritten, even for the
same operation ID. To abandon a partial operation, use
`si migrate --to-regional --rollback-op-id <opId>`; the journal makes this possible
before the final report exists. Backup and journal artifacts must be retained
until recovery finishes.

### Rollback

Allowed only while no scoped document has taken an independent regional write.
All target region locks are acquired before checking any document and remain
held until rollback completes. Every document must be pristine before anything
is removed. The rollback phase is journaled so interrupted deletion or source
restoration can be continued with the same `--rollback-op-id`. A deployment that
already owns a target lock finishes first; any resulting independent write
blocks rollback without deleting another region's state.

### Old-CLI compatibility

The post-split tombstone is versioned `4.0` precisely so old CLIs refuse it:
they reject any state version above their known `3.0` before reading further,
so a pre-upgrade CLI fails closed on deploy/destroy instead of treating the
deployment as fresh. Note two residual gaps that cannot be fixed client-side
and must be covered by operating discipline: old CLIs use their own lock file
(not the scoped one), so lock exclusion across CLI generations does not apply,
and an operator could still hand-edit the tombstone away. Verify the barrier
against the actual minimum supported CLI version before sharing a deployment
across versions.

## Post-migration verification

After any migration: run `si diff` — it must report no unintended
create/replace/delete plan (exit 0 / `unchanged` for every resource). Normal
cloud mutation stays blocked by the write gate until the scoped state is
authoritative.
