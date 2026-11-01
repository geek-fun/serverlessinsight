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

| Backend | Legacy (V3, discovery entry) | Scoped (V4, authoritative) |
| --- | --- | --- |
| LOCAL | `.serverlessinsight/state-<app>-<service>.json` | `.serverlessinsight/states/<app>/<service>/<stage>/<region>/state.json` |
| BUCKET_STORE | `<key>` | `<key>.scopes/<app>/<service>/<stage>/<region>/state.json` |
| SAAS | server-side, keyed by service+stage | service+stage+region (scope protocol) |

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
    storageRegion: cn-hangzhou    # optional: pin where state lives
    storageProvider: aliyun       # optional: pin whose storage SDK is used
```

Explicit settings never change when the workload `-r` or `-v` changes. When
omitted, the storage location is resolved from the workload context at backend
creation. State-storage credentials are the workload credentials — SaaS account
binding is intentionally not introduced; unsupported combinations fail with a
clear error instead of silently picking whichever key exists.

### Remote locking

OSS uses verified conditional create (`x-oss-forbid-overwrite`); COS attempts
`If-None-Match` and, when the storage cannot evaluate the condition, the backend
downgrades to a verified write and **declares** `conditionalCreate: false`
instead of claiming atomicity. Avoid running mutating commands for the same
scope in parallel on such backends.

## SaaS regional protocol

The SaaS backend passes region/scope through initialization, current-state
lookup, sync, execution identity and recovery metadata (`scopeProtocol: 1`,
`scope`, `region`, base serial/lineage, idempotency key). Mutating commands
probe `GET /api/v1/capabilities` first:

- `regionalScope: true` → regional writes proceed; returned states are scope
  validated (a state for a different region is refused even if Service/Stage
  match).
- capability missing (pre-regional server) → mutating commands fail with a
  clear error. The CLI never silently falls back to the unscoped write
  protocol; read-only commands (`diff`, `show`) resolve identity/state through
  the read-only targets endpoint and do not create deployments or lifecycle
  records.

Minimum server capabilities: scope-aware state endpoints (stage+region),
capabilities probe, scope echo on returned state documents.

## Resource identity and ownership

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

1. **Backup first** — the exact source document (canonical hash recorded)
   lands in `<legacy>.pre-regional-<opId>` / `<key>.pre-regional-<opId>.json`.
2. Scoped V4 documents are written (independent lineage, serial 1, provenance
   stamped in `migration`).
3. The legacy entry is **kept** and marked `managedBy: regional` — deleting it
   would let an old CLI treat the deployment as fresh. This CLI never mutates
   or re-splits the marked aggregate.
4. A migration report is stored next to the scoped documents.

A partial failure leaves written documents (individually valid) and an intact
legacy entry — fix the cause and re-run.

### Rollback

Allowed only while no scoped document has taken an independent regional write
(every doc still at the migration's serial 1): the aggregate is restored and
scoped documents removed. After independent regional writes exist, states are
never collapsed back automatically.

### Old-CLI compatibility limits

Old CLIs ignore the `managedBy: regional` marker (unknown field) and would
still write the legacy aggregate, and they lock a different lock file than the
scoped layout. The barrier protects **this and later CLI versions** only;
document this minimum-version boundary to every operator who shares a
deployment between CLI generations.

## Post-migration verification

After any migration: run `si diff` — it must report no unintended
create/replace/delete plan (exit 0 / `unchanged` for every resource). Normal
cloud mutation stays blocked by the write gate until the scoped state is
authoritative.
