# ADR-004: Plugin Architecture for Resource Providers

- **Status**: Proposed
- **Date**: 2026-08-29
- **Authors**: ServerlessInsight Team
- **Deciders**: @geek-fun/core

## Context

ServerlessInsight provisions managed cloud resources through a plan/apply pipeline. Every resource type is implemented as a consistent four-file cluster — `*Types` (config mapping + desired-state extraction), `*Planner` (diff desired vs stored state → `PlanItem[]`), `*Executor` (execute plan items), `*Resource` (cloud CRUD + state building) — plus a client-operation wrapper. The database domain alone consists of five products across two providers (Aliyun RDS Serverless, Aliyun ES Serverless, Aliyun Tablestore; Tencent TDSQL-C, Tencent ES Serverless), roughly 25 source files and 5 cloud SDK dependencies.

**Problem**: resource-type dispatch is entirely hardcoded. There is no registry — adding a resource type means editing the engine. Extracting the database domain into plugins is the motivating use case, but the goal is a general extension mechanism.

**Verified coupling points** (surgery checklist):

| # | Location | Coupling |
| - | -------- | -------- |
| 1 | `src/types/index.ts` | `ServerlessIac.databases` / `.tables` top-level fields; `DatabaseEnum` exported from core types |
| 2 | `src/parser/index.ts` | Unconditional `parseDatabase` / `parseTable` calls |
| 3 | `src/validator/iacSchema.ts` + `rootSchema.ts` | DB AJV schemas hard-registered and `$ref`-ed |
| 4 | `src/common/aliyunClient/index.ts` | Factory imports RDS / ES Serverless / Tablestore SDKs |
| 5 | `src/common/tencentClient/index.ts` | Factory imports CynosDB / ES SDKs |
| 6 | `src/stack/{aliyunStack,scfStack}/{planner,deployer,destroyer}.ts` | Hardcoded calls to `generateDatabasePlan` / `executeDatabasePlan` etc., with a hardcoded execution order (functions → buckets → databases → tables → events) |
| 7 | `src/common/dependencyGraph/graph.ts` | `RESOURCE_TYPE_PREFIX_MAP` / `RESOURCE_DEPENDENCY_ORDER` hardcode DB types |
| 8 | `src/commands/show.ts` + `ResourceTypeEnum` + i18n | Display dispatch by string matching on DB types |

**What already works in our favor**: the generic plan/state primitives (`PlanItem`, `ResourceState`, `ExecutionResult`, `PartialResourceError`) are provider-agnostic; `StateBackend` is already pluggable with an event-reporting seam (`reportEvent` / `flushEvents` in `src/common/stateBackend/types.ts`); ownership-tag adoption (ADR-002) already implements import semantics informally.

## Decision Drivers

1. **Extensibility** — new resource types must be addable without editing the engine
2. **Decoupling** — database code must become removable/swappable (initially in-repo, physically splittable later)
3. **State integrity** — the Terraform-like state mechanism must remain core-owned; plugins must never write state files
4. **Plan quality** — drift detection (refresh) should be a first-class pipeline step
5. **Minimal machinery** — no new npm packages, no monorepo, no RPC transport; avoid speculative infrastructure
6. **Backward compatibility** — existing stacks with `databases:` / `tables:` must keep working unchanged
7. **Type safety** — contract violations must fail at compile time for in-repo plugins and at registration time for external plugins, never mid-deploy

## Research: Three Reference Systems

| Aspect | Serverless Framework | Serverless-Devs | Terraform |
| ------ | -------------------- | --------------- | --------- |
| Contract | Constructor injection (`serverless, options, utils`); instance fields `commands` / `hooks`; duck-typed read | Documented convention: `instance[command](inputs)` dynamic dispatch | Rich versioned protocol: `GetProviderSchema`, `ReadResource`, `PlanResourceChange`, `ApplyResourceChange`, `ImportResourceState`, `UpgradeResourceState` |
| Diff ownership | N/A (no plan) | Component-internal | **Core**: provider receives `ProposedNewState`, returns narrow plan modifications (`RequiresReplace`); core selects actions |
| State ownership | N/A | Component-internal | **Core**: prior state injected, new state returned, core persists |
| Activation | `plugins:` declaration in stack yaml; resolution: service dir → framework modules; `internalPlugins` for core features | `component:` field; registry download + cache | `required_providers` + registry + lock file |
| Config extension | `configSchemaHandler.defineTopLevelProperty` (collision-detected) | `props` passed wholesale | Provider schema declaration |
| Transport | In-process | In-process | Out-of-process gRPC child process |
| Author artifact | Local single file needs no package; published plugin is an npm package with **zero runtime dependency on the host** (verified across serverless-domain-manager, serverless-offline, serverless-esbuild; types optional: own structural types / `import type` / none) | Component = npm/registry package; `publish.yaml` metadata | Separate binary + protocol SDK (plugin-framework) |

**Adopted**: Terraform's contract layer (diff-in-core, refresh, versioned schema, import, unknown-value semantics) + Serverless Framework's activation layer (explicit declaration, resolution order, schema-merge channel, internal plugins).

**Rejected**: Terraform's gRPC transport (no isolation need yet; Pulumi proves it is available later); Serverless-Devs' schema-less duck contract (too weak for a rich state machine); Serverless Framework's open hook tree (fixed lifecycle suffices).

**On plugin packages**: investigation of real SF plugins showed the package exists only for distribution, never for the contract — no plugin imports the host at runtime, and authors either skip types or maintain narrow structural types themselves. This validates keeping the si contract inside the host package with optional export.

## Decision

### 1. Single Package, In-Process Plugins

No new npm packages. No monorepo. No RPC. Plugins are in-repo modules loaded in-process:

```
src/
  engine/
    contract.ts        # ResourceProvider / PluginContext / ResourceSchema interfaces (the only new artifact)
    registry.ts        # ResourceRegistry: registration, collision detection, topological ordering
    diff.ts            # generic schema-driven diff engine
    orchestrator.ts    # pipeline loop
  plugins/
    aliyun-database/   # RDS + ES Serverless + Tablestore (existing 4-file clusters, reorganized)
    tencent-database/  # TDSQL-C + ES Serverless
  types/ parser/ validator/ commands/ stack/ common/   # skeleton as today
docs/
  plugin-author-guide.md   # semantics spec (Phase 3)
```

The 5 DB SDK dependencies remain in the main `package.json` for now. Physical extraction into `@geek-fun/si-plugin-database` is deferred behind an explicit trigger (see Deferred Decisions).

### 2. Contract: Interface for Shape, Document for Semantics

`src/engine/contract.ts` is the single source of truth for the contract's *shape*, enforced by the TypeScript compiler for in-repo plugins. `docs/plugin-author-guide.md` specifies what an interface cannot express: lifecycle timing, error-handling rules, normalization-vs-drift rules, contract evolution policy.

A documentation-only contract (Serverless-Devs style) was rejected: si's contract is rich (schema declarations, unknown-value semantics, refresh rules) and duck typing would convert compile-time failures into mid-deploy runtime failures.

```typescript
export interface ResourceProvider {
  // identity
  name: string;                    // 'aliyun-database'
  provider: string;                // 'aliyun' | 'tencent' | ...
  resourceTypes: string[];         // ['ALIYUN_RDS_SERVERLESS', 'ALIYUN_ES_SERVERLESS', 'ALIYUN_TABLESTORE_TABLE']
  yamlSections: string[];          // ['databases', 'tables'] — top-level sections it owns
  after?: string[];                // resource types it depends on (replaces hardcoded RESOURCE_DEPENDENCY_ORDER)

  // config channel (Serverless-Framework style, collision-detected)
  yamlSchema?: JsonSchema;         // AJV fragment for its sections, merged into rootSchema
  parse(raw: unknown): Promise<ParsedResource[]>;

  // lifecycle (Terraform style, fixed method set)
  schemaVersion: number;           // recorded in state; mismatch triggers upgradeState; downgrade refused
  attributes: ResourceSchema;      // per-attribute: computed / requiresReplace / sensitive
  configure(ctx: PluginContext): Promise<void>;   // plugin builds its own SDK clients
  read(id: string, state: ResourceState): Promise<ResourceState | null>;  // refresh; null = gone from cloud
  planAdjust?(i: { config; prior; proposed }): { proposed?; requiresReplace?: string[] };
  apply(item: PlanItem, prior: ResourceState | null): Promise<ResourceState>;
  import?(remoteId: string): Promise<ResourceState>;  // formalizes ownership-tag adoption
  upgradeState?(from: number, raw: Record<string, unknown>): Promise<Record<string, unknown>>;

  // presentation
  display?(state: ResourceState): string;
  category?: string;               // show grouping
}

export interface PluginContext {
  app: string; service: string; stage: string; region: string;
  credentials: CloudCredentials;   // resolved by the host (access-alias model)
  state: StateAccessor;            // get / save per logicalId
  reportEvent(e: ResourceEvent): void;   // reuses the state-backend event seam
  logger: Logger;
  helpers: { pollUntil; ownershipTag; isResourceAlreadyExistsError };  // existing modules, imported directly
}
```

**Migration mapping of the existing four-file clusters**: `*Types.extractXxxDefinition` → `attributes` schema declaration; `*Planner` diff logic → absorbed by the core diff engine (`planAdjust` retains resource-specific rules such as serverless-quota replacement); `*Resource` CRUD → `apply` / `read` / `import`; `*Executor` → **eliminated** (the orchestrator takes over).

### 3. Core Owns Diffing and State

The engine, not the plugin, computes the plan:

1. Build `proposed` = non-null config values merged with computed attributes from prior state (Terraform's `ProposedNewState` model)
2. Diff `proposed` against prior state, driven by the plugin's `attributes` schema (`requiresReplace` → replace action; `computed` → unknown placeholder allowed in plan, forbidden after apply)
3. Call `planAdjust` for resource-specific plan modification
4. Select actions (`noop` / `create` / `update` / `delete` / `replace`) in core

Plugins never persist state: prior state is injected, new state is returned, core serializes it. Refresh (`read`) returns wholly-known state or `null`; a `--refresh=false` fast path skips the step.

### 4. Activation and Loading

```yaml
provider: aliyun
plugins:
  - @geek-fun/si-plugin-aliyun-database   # published package
  - ./local-plugin.ts                     # local single file (no package required)
databases:
  - name: pg-1
    type: RDS_SERVERLESS
```

Resolution order: stack-relative path → stack `node_modules` → built-in internal plugins. Registration performs collision detection on `resourceType` and `yamlSection`. Loading uses dynamic `import()`, so DB SDKs load only when DB sections are present.

**Backward compatibility**: when `plugins:` is absent, the built-in database plugins auto-load with a deprecation warning. The fallback is removed after one major version.

### 5. Open Resource-Type Space

`ResourceTypeEnum` opens to `string`, validated against the registry. Existing state values are unchanged — zero state migration. Display dispatch moves from string matching to plugin `display()` / `category` with a generic fallback.

### 6. Orchestrated Pipeline

```
si deploy
 1. loadStack        read yaml
 2. loadPlugins      resolve plugins: → dynamic import → registry.register (collision checks)
 3. parse            skeleton sections + plugin parse() for owned sections
 4. validate         merge plugin yamlSchemas → unified AJV validation → semantic checks
 5. upgradeState     per-resource schemaVersion comparison → plugin upgradeState(); refuse downgrade
 6. refresh          plugin read() corrects prior state (drift detection; --refresh=false skips)
 7. diff             core engine: proposed merge → diff → plugin planAdjust() → action selection
 8. displayPlan      PlanItem[] (unknown placeholders shown as-is)
 9. apply            topological order from after declarations → per-item plugin apply()
                     → state persisted per item via onStateChange → PartialResourceError → handlePartialFailure
10. flush            reportEvent upload
```

`destroy` = reverse topological order with `apply(delete)`. `plan` / `show` reuse steps 5–8.

## Architecture Decisions

### D1: In-process plugins; no RPC transport

**Rationale**: si is a single-package Node CLI with no third-party isolation requirement today. The contract is transport-agnostic; if isolation or cross-language providers become real requirements, the same interface can be exposed over a local subprocess transport (the Pulumi precedent), but building gRPC now is pure liability.

### D2: Diffing lives in core, not plugins

**Rationale**: the per-planner diff code in the current codebase is highly repetitive (cu/storage/quota/tag comparisons re-implemented per product). Terraform's model — core computes the generic diff from a schema declaration, plugins contribute narrow plan adjustments — collapses each planner from ~4 files to a schema plus small hooks, and makes plan semantics uniform and testable in one place.

### D3: No separate plugin-sdk package; contract lives in the host

**Rationale**: verified across three ecosystems — Serverless Framework never shipped a plugin-sdk (plugins rely on constructor injection; TS types are community `@types/serverless` or author-maintained structural types), and no surveyed plugin imports the host at runtime. si's in-repo plugins import existing modules (`types`, `ownershipTag`, `pollUntil`) exactly as they do today. External plugin authors get types via optional host export (Phase 3) or write narrow structural types themselves — TypeScript structural typing makes both compatible.

### D4: Interface-enforced shape + registry runtime validation, not docs-only

**Rationale**: in-repo plugins get compile-time contract enforcement for free. External plugins get validation at registration time (missing methods, type collisions, schema-version mismatch → explicit errors) — better than Serverless Framework's silent duck-typing, which surfaces typos as mid-deploy failures. A documentation-only contract would create a second source of truth that drifts.

### D5: Plugin granularity = provider + domain

**Rationale**: one plugin directory per provider-domain (`aliyun-database` covers three products) keeps migration cost low and package count minimal. Product-level splits remain possible later since the registry filters by `provider` at runtime.

### D6: Built-in fallback for undeclared `plugins:`

**Rationale**: existing stacks must not break. Auto-loading built-in DB plugins when `plugins:` is absent, with a deprecation warning, provides a one-major-version migration window.

### D7: Refresh is a first-class pipeline step, on by default

**Rationale**: current planners diff against stored state only — drift is invisible until apply. Terraform's refresh-before-plan is the source of its plan quality. The added cloud API cost is bounded by `--refresh=false`.

### D8: Physical package extraction is deferred behind explicit triggers

**Rationale**: the value of the plugin boundary comes from the contract + registry + lazy loading, not the npm boundary. Splitting out `@geek-fun/si-plugin-database` is triggered only by real needs: main-package dependency slimming (the 5 DB SDKs) or independent DB release cadence. The extraction is then a directory move — the contract does not depend on packaging.

## Implementation Plan

| Phase | Scope | Behavior Change | Verification Gate |
| ----- | ----- | --------------- | ----------------- |
| **1** | `contract.ts` + `registry.ts`; DB four-file clusters registered as internal plugins; coupling points 2, 3, 6, 7, 8 rewritten to registry-driven dispatch; `after` declarations replace hardcoded order tables | None | Golden tests: plan output field-identical for all sample stacks; full existing suite green |
| **1.5** | Core diff engine + refresh step + `schemaVersion`/`upgradeState` + unknown-value semantics; DB planners migrated per resource type to `attributes` schema + `planAdjust` | **Yes — the only behavior-changing phase** | Per resource type: golden test locks plan output before migrating the next |
| **2** | Lazy loading via dynamic `import()`; `plugins:` declaration + resolution order; built-in fallback + deprecation warning; coupling point 1 (open `ServerlessIac` sections) and 4–5 (client-factory slimming) | None | E2E: declared loading, fallback loading, local-file plugin |
| **3** | Optional host export of contract types; `docs/plugin-author-guide.md`; `si plugin install/uninstall` (npm install + yaml edit) | — | — |
| **4** *(optional)* | Physical extraction to `@geek-fun/si-plugin-database` | — | Trigger: dependency slimming or independent release cadence |

Functions, buckets, events, and tags remain in core initially and migrate to the same internal-plugin mechanism incrementally afterwards.

## Consequences

**Positive**:

- New resource types become addable without engine edits; DB code is removable without engine edits
- Generic diff engine eliminates per-planner diff duplication and makes plan semantics uniform
- Drift detection (refresh) becomes available — a qualitative plan-quality improvement
- Contract violations fail at compile time (in-repo) or registration time (external), never mid-deploy
- Zero new packages, zero build-system migration; every phase independently shippable and revertible
- State format unchanged; existing stacks keep working throughout

**Negative**:

- Phase 1.5 is a genuine behavior change and carries regression risk (mitigated by golden-test gating per resource type)
- Refresh adds cloud API calls per plan (mitigated by `--refresh=false`)
- The 5 DB SDKs remain in the main package's dependency footprint until Phase 4
- Test import paths require mechanical updates during pluginization
- Once contract types are exported (Phase 3), they are semver-bound

**Risks**:

- Golden-test coverage must be established *before* Phase 1.5 begins, or the safety gate is illusory
- Service-level mocks (`mockCloudClient.ts`) must migrate with the DB code and adapt to the new contract
- Contract evolution discipline (schemaVersion policy) must be written down before external plugins exist

## Deferred Decisions

| Topic | Trigger to revisit | Expected path |
| ----- | ------------------ | ------------- |
| Physical package split | Dependency slimming / independent DB releases demanded | Directory move to `@geek-fun/si-plugin-database`; contract unchanged |
| Subprocess / cross-language providers | Third-party isolation or non-JS providers required | Same interface over local transport (Terraform protobuf + docs model) |
| Plugin registry distribution | Ecosystem size justifies it | S-Devs-style registry metadata (`publish.yaml` analog) |
| Internal plugins for functions/buckets/events | Post-Phase-3 capacity | Same registry mechanism, incremental |

## References

- [ADR-002: Resource Import and State Refresh](./002-resource-import-and-refresh.md) — ownership-tag adoption formalized as `import()`
- Event reporting seam — `reportEvent` / `flushEvents` in `src/common/stateBackend/types.ts`, reused as `PluginContext.reportEvent`
- [Serverless Framework Plugin Manager](https://github.com/serverless/serverless/blob/main/packages/serverless/lib/classes/plugin-manager.js) — activation, resolution, internal plugins, schema handler
- [Serverless-Devs Component Model](https://github.com/Serverless-Devs/Serverless-Devs/blob/main/spec/en/0.0.2/serverless_package_model/package_model.md) — component contract, publish metadata
- [Terraform Plugin Protocol v6](https://developer.hashicorp.com/terraform/plugin/terraform-plugin-protocol) — provider RPC contract, state ownership, refresh semantics
- [Terraform Resource Change Lifecycle](https://github.com/hashicorp/terraform/blob/main/docs/resource-instance-change-lifecycle.md) — ProposedNewState merge, unknown-value rules
- Case studies: [serverless-domain-manager](https://github.com/amplify-education/serverless-domain-manager), [serverless-offline](https://github.com/dherault/serverless-offline), [serverless-esbuild](https://github.com/floydspace/serverless-esbuild) — plugin packages carry zero runtime host dependency
