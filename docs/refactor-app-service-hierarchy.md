# Refactor: App/Service Hierarchy

## Status

**Proposed** | Breaking Change | Target: v0.1.0

## Summary

Remove the redundant `stackName` CLI argument and introduce a two-level organizational model: **App** (project) > **Service** (deployable unit). Both `app` and `service` are defined in the YAML configuration. This simplifies the CLI, clarifies domain semantics, and sets the foundation for multi-service projects.

## Motivation

The current `stackName` is a required positional CLI argument passed to every command (`si deploy <stackName>`), stored in `Context`, but barely used:

- **Aliyun**: used only in `fc3Resource.ts` as a fallback service name for SLS/RAM/NAS resource naming (`ctx.stackName ?? fn.name`)
- **Tencent**: not used at all — deployment is fully state-based
- **Huawei** (WIP): passed to HCL template generation

Meanwhile, the YAML `service` field already serves as the real identity of the deployable unit. `stackName` duplicates this purpose and creates confusion about which is the "real" name.

## Design

### Domain Model

```
App (project-level grouping)
 |
 +-- Service A (backend)     <- own YAML, own state, independent deploy
 |     +-- functions
 |     +-- events
 |     +-- databases
 |     +-- buckets
 |     +-- tables
 |
 +-- Service B (frontend)    <- own YAML, own state, independent deploy
 |     +-- buckets
 |
 +-- Service C (worker)      <- own YAML, own state, independent deploy
       +-- functions
```

| Concept     | Description                                                                   | Source                           |
| ----------- | ----------------------------------------------------------------------------- | -------------------------------- |
| **App**     | Top-level project grouping. Logical boundary for related services.            | `app` field in YAML              |
| **Service** | Independently deployable unit with its own config, state, and lifecycle.      | `service` field in YAML          |
| **Stage**   | Environment variant (dev/staging/prod). Applied at deploy-time via `--stage`. | `stages` in YAML + `--stage` CLI |

### YAML Schema Changes

**Before:**

```yaml
version: 0.0.1
provider:
  name: aliyun
  region: cn-hongkong
service: insight-poc-api
functions: { ... }
```

**After:**

```yaml
version: 0.1.0
app: my-project # NEW required field
provider:
  name: aliyun
  region: cn-hongkong
service: backend # scoped under app
functions: { ... }
```

Rules:

- `app` is a new **required** string field at the YAML root
- `service` remains required, semantically scoped under `app`
- `version` bumps to `0.1.0` to signal the schema change
- One YAML file = one service. Multi-service = multiple YAML files in the same repo.

### CLI Changes

**Before:**

```bash
si deploy <stackName> -f serverless.yml -s dev
si destroy <stackName> -f serverless.yml -s dev
si validate [stackName] -f serverless.yml
si plan <stackName> -f serverless.yml -s dev
si template <stackName> -f serverless.yml
si local <stackName> -f serverless.yml -s local
```

**After:**

```bash
si deploy -f serverless.yml -s dev
si destroy -f serverless.yml -s dev
si validate -f serverless.yml
si plan -f serverless.yml -s dev
si template -f serverless.yml
si local -f serverless.yml -s local
```

- `<stackName>` positional argument is **removed** from all commands
- `app` and `service` are always read from the YAML file
- No CLI overrides for `app`/`service` in this iteration (future feature)

### Type Changes

#### `Context` (`src/types/domains/context.ts`)

```typescript
// BEFORE
type Context = {
  region: string;
  accountId?: string;
  provider: ProviderEnum;
  stackName: string; // REMOVE
  stage: string;
  accessKeyId: string;
  accessKeySecret: string;
  securityToken?: string;
  iacLocation: string;
  parameters?: Array<{ key: string; value: string }>;
  stages?: { [stage: string]: Array<{ key: string; value: string }> };
  tags?: Array<{ key: string; value: string }>;
  iac?: ServerlessIac;
};

// AFTER
type Context = {
  region: string;
  accountId?: string;
  provider: ProviderEnum;
  app: string; // NEW - from YAML
  service: string; // NEW - from YAML
  stage: string;
  accessKeyId: string;
  accessKeySecret: string;
  securityToken?: string;
  iacLocation: string;
  parameters?: Array<{ key: string; value: string }>;
  stages?: { [stage: string]: Array<{ key: string; value: string }> };
  tags?: Array<{ key: string; value: string }>;
  iac?: ServerlessIac;
};
```

#### `ServerlessIacRaw` / `ServerlessIac` (`src/types/index.ts`)

```typescript
// Add `app` field to both types
type ServerlessIacRaw = {
  version: string;
  app: string; // NEW required field
  provider: Provider;
  service: string;
  vars: Vars;
  stages: Stages;
  tags: Tags;
  functions: { [key: string]: FunctionRaw };
  events: { [key: string]: EventRaw };
  databases: { [key: string]: DatabaseRaw };
  tables: { [key: string]: TableRaw };
  buckets: { [key: string]: BucketRaw };
};

type ServerlessIac = {
  version: string;
  app: string; // NEW required field
  provider: Provider;
  service: string;
  vars?: Vars;
  stages?: Stages;
  tags?: Array<{ key: string; value: string }>;
  functions?: Array<FunctionDomain>;
  events?: Array<EventDomain>;
  databases?: Array<DatabaseDomain>;
  tables?: Array<TableDomain>;
  buckets?: Array<BucketDomain>;
};
```

### State File Restructuring

**Before:** Single flat state file per project directory, no stage isolation.

```
.serverlessinsight/
  state.json                     # all resources in one flat map
  state.json.si-lock
```

**After:** Service-level isolation via `state-{app}-{service}.json`, with per-stage resource tracking inside the file.

```
.serverlessinsight/
  state-{app}-{service}.json
  state-{app}-{service}.json.si-lock
```

Example for an app `my-project` with two services:

```
.serverlessinsight/
  state-my-project-backend.json
  state-my-project-backend.json.si-lock
  state-my-project-frontend.json
  state-my-project-frontend.json.si-lock
```

This approach:

- **Service-level isolation** — each service (one YAML = one service) gets its own state file
- **Human-readable filenames** — `state-my-project-backend.json` is immediately identifiable
- **Stage isolation inside the file** — deploying to `dev` and `prod` tracks separate resource sets, preventing cross-stage interference
- Works naturally with multiple service YAMLs in the same repo directory

#### State File Structure

```typescript
type StateFile = {
  version: string;
  provider: string;
  app: string; // NEW
  service: string; // NEW
  stages: Record<string, StageState>; // NEW - per-stage resources
};

type StageState = {
  resources: Record<string, ResourceState>;
};
```

**Before** (flat resources, no stage awareness):

```json
{
  "version": "1.0",
  "provider": "aliyun",
  "resources": {
    "functions.my_fn": { "region": "cn-hangzhou", "instances": [...] },
    "events.my_gw": { "region": "cn-hangzhou", "instances": [...] }
  }
}
```

**After** (resources scoped by stage):

```json
{
  "version": "2.0",
  "provider": "aliyun",
  "app": "my-project",
  "service": "backend",
  "stages": {
    "dev": {
      "resources": {
        "functions.my_fn": { "region": "cn-hangzhou", "instances": [...] },
        "events.my_gw": { "region": "cn-hangzhou", "instances": [...] }
      }
    },
    "prod": {
      "resources": {
        "functions.my_fn": { "region": "cn-shanghai", "instances": [...] },
        "events.my_gw": { "region": "cn-shanghai", "instances": [...] }
      }
    }
  }
}
```

#### State Version Bump

`CURRENT_STATE_VERSION` changes from `'1.0'` to `'2.0'` to reflect the structural change (flat resources → stage-scoped resources).

#### Impact on State Operations

The state file structure changes from flat `resources` to `stages[stage].resources`. To minimize blast radius, this is handled at two layers:

**Layer 1 — File I/O (changes needed):** `loadState` and `saveState` in `stateManager.ts` must be updated to:

- Derive the file path from `app` + `service`: `state-{app}-{service}.json`
- Read/write the full `StateFile` with its `stages` map
- Accept `stage` to extract/update the correct `stages[stage]` section

```typescript
// loadState now scopes to the correct stage, returning a stage-level view
const loadState = (
  provider: string, app: string, service: string, stage: string, baseDir?: string
): StateFile => { ... };

// getStatePath derives from app + service
const getStatePath = (app: string, service: string, baseDir?: string): string =>
  path.join(baseDir ?? process.cwd(), STATE_DIR, `state-${app}-${service}.json`);
```

**Layer 2 — In-memory operations (no signature changes):** `getResource`, `setResource`, `removeResource`, `getAllResources`, `getRoleArnFromState` operate on a `StateFile` object in memory. Since `loadState` will populate `resources` from the correct stage, these functions continue to work on `state.resources` as before. The stage scoping is handled at load/save time, not at every call site.

This means the ~90 call sites across resource/executor/planner files that use `getResource`/`setResource`/etc. require **no changes** — only the 6 `loadState` call sites and 8 `saveState` call sites need updating.

### Resource Naming Convention

Replace all `stackName`-based naming with `{app}-{service}`:

| Resource        | Before (using stackName)  | After                            |
| --------------- | ------------------------- | -------------------------------- |
| SLS Log Project | `{stackName}-log-project` | `{app}-{service}-log-project`    |
| SLS Log Store   | `{stackName}-log-store`   | `{app}-{service}-log-store`      |
| RAM Role        | `{stackName}-role`        | `{app}-{service}-role`           |
| NAS resources   | `{stackName}-*`           | `{app}-{service}-*`              |
| APIGW group     | `iac.service`             | unchanged (already uses service) |
| Local stack     | `iac.service`             | `{app}-{service}`                |
| HCL template    | `stackName`               | `{app}-{service}`                |

### Schema Validation Changes

Update `src/validator/rootSchema.ts`:

```typescript
// version enum: add '0.1.0'
version: { type: 'string', enum: ['0.0.0', '0.0.1', '0.1.0'] },

// add `app` property
app: { type: 'string', pattern: '^[a-z][a-z0-9-]*$' },

// add `app` to required
required: ['version', 'provider', 'app', 'service'],
```

The `app` field enforces lowercase alphanumeric with hyphens (DNS-safe naming, consistent with cloud resource constraints).

### Parser Changes

Update `src/parser/index.ts` `transformYaml`:

```typescript
const transformYaml = (iacJson: ServerlessIacRaw): ServerlessIac => {
  return {
    app: iacJson.app, // NEW
    service: iacJson.service,
    version: iacJson.version,
    provider: iacJson.provider,
    // ... rest unchanged
  };
};
```

### Context Initialization Changes

Update `src/common/context.ts` `setContext`:

```typescript
// Remove stackName from config parameter
// Add app and service from IAC (parsed YAML)
const newContext: Context = {
  stage: config.stage ?? 'default',
  app: config.app, // NEW - from parsed YAML
  service: config.service, // NEW - from parsed YAML
  provider,
  region,
  // ... rest unchanged
};
```

The `setContext` call sites in commands change from:

```typescript
// BEFORE
await setContext(
  { ...options, stackName, iacProvider: rawIac.provider, stages: rawIac.stages },
  true,
);

// AFTER
await setContext(
  {
    ...options,
    app: rawIac.app,
    service: rawIac.service,
    iacProvider: rawIac.provider,
    stages: rawIac.stages,
  },
  true,
);
```

## File-by-File Change List

| #   | File                                   | Change                                                                                                                                                                                         | Size |
| --- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| 1   | `src/types/domains/context.ts`         | Remove `stackName`, add `app` + `service`                                                                                                                                                      | S    |
| 2   | `src/types/index.ts`                   | Add `app` to `ServerlessIacRaw` and `ServerlessIac`                                                                                                                                            | S    |
| 3   | `src/types/domains/state.ts`           | Restructure `StateFile`: add `app`, `service`, replace flat `resources` with `stages` map containing per-stage `resources`; bump `CURRENT_STATE_VERSION` to `'2.0'`; add `StageState` type     | M    |
| 4   | `src/validator/rootSchema.ts`          | Add `app` property, add `'0.1.0'` to version enum, update `required`                                                                                                                           | S    |
| 5   | `src/parser/index.ts`                  | Parse `app` field in `transformYaml`                                                                                                                                                           | S    |
| 6   | `src/common/context.ts`                | Remove `stackName` from config, add `app`/`service` from IAC                                                                                                                                   | M    |
| 7   | `src/common/stateManager.ts`           | State path becomes `state-{app}-{service}.json`; `loadState`/`saveState` accept `app`, `service`, `stage`; stage scoping at load/save boundaries; in-memory ops (`getResource` etc.) unchanged | M    |
| 8   | `src/common/lockManager.ts`            | Lock path follows new state path                                                                                                                                                               | S    |
| 9   | `src/commands/index.ts`                | Remove `<stackName>` from all commands                                                                                                                                                         | M    |
| 10  | `src/commands/deploy.ts`               | Remove `stackName` param, pass `app`/`service` from parsed YAML                                                                                                                                | S    |
| 11  | `src/commands/destroy.ts`              | Same as deploy                                                                                                                                                                                 | S    |
| 12  | `src/commands/validate.ts`             | Remove `stackName` param                                                                                                                                                                       | S    |
| 13  | `src/commands/plan.ts`                 | Remove `stackName` param                                                                                                                                                                       | S    |
| 14  | `src/commands/template.ts`             | Remove `stackName` param                                                                                                                                                                       | S    |
| 15  | `src/commands/local.ts`                | Remove `stackName` param                                                                                                                                                                       | S    |
| 16  | `src/commands/forceUnlock.ts`          | No change (uses lockId, not stackName)                                                                                                                                                         | -    |
| 17  | `src/stack/deploy.ts`                  | Replace `stackName` params with `iac.app`/`iac.service`                                                                                                                                        | S    |
| 18  | `src/stack/aliyunStack/fc3Resource.ts` | Replace `ctx.stackName` with `${ctx.app}-${ctx.service}` (L335, L461)                                                                                                                          | S    |
| 19  | `src/stack/aliyunStack/deployer.ts`    | Update `loadState`/`saveState` calls to pass `app`, `service`, `stage`                                                                                                                         | M    |
| 20  | `src/stack/aliyunStack/planner.ts`     | Update `loadState` call to pass `app`, `service`, `stage`                                                                                                                                      | S    |
| 21  | `src/stack/aliyunStack/destroyer.ts`   | Update `loadState`/`saveState` calls to pass `app`, `service`, `stage`                                                                                                                         | M    |
| 22  | `src/stack/scfStack/deployer.ts`       | Update `loadState`/`saveState` calls to pass `app`, `service`, `stage`                                                                                                                         | M    |
| 23  | `src/stack/scfStack/planner.ts`        | Update `loadState` call to pass `app`, `service`, `stage`                                                                                                                                      | S    |
| 24  | `src/stack/scfStack/destroyer.ts`      | Update `loadState`/`saveState` calls to pass `app`, `service`, `stage`                                                                                                                         | M    |
| 25  | `src/stack/localStack/aliyunFc.ts`     | Replace `iac.service` with `${iac.app}-${iac.service}`                                                                                                                                         | S    |
| 26  | `src/stack/rfsStack/index.ts`          | Replace stackName with `iac.app`-`iac.service`                                                                                                                                                 | S    |
| 27  | `src/lang/*.json`                      | Update log messages referencing stackName                                                                                                                                                      | S    |
| 28  | `samples/*.yml`                        | Add `app` field, bump version to `0.1.0`                                                                                                                                                       | S    |
| 29  | `tests/`                               | Update all fixtures and tests                                                                                                                                                                  | M    |
| 30  | `README.md`                            | Update CLI usage examples and YAML examples                                                                                                                                                    | M    |
| 31  | `docs/state-locking.md`                | Update references from `si deploy <stackName>`                                                                                                                                                 | S    |

## Execution Order

1. **Types first** (#1-3) — establish the new type contracts
2. **Schema + Parser** (#4-5) — YAML can now be parsed with `app`
3. **Context + State** (#6-8) — runtime understands new model
4. **Commands** (#9-16) — CLI surface updated
5. **Stack implementations** (#17-26) — deployment logic uses new naming and state signatures
6. **Fixtures + Tests** (#27-29) — everything validates
7. **Docs** (#30-31) — update references

## Future Work (Out of Scope)

These are explicitly deferred and not part of this refactor:

- **Multi-service orchestration**: `si deploy --all` to discover and deploy all service YAMLs in a repo in dependency order
- **Cross-service state references**: Service A referencing outputs from Service B (e.g., bucket URL)
- **CLI overrides**: `--app` and `--service` flags to override YAML values (useful for CI/CD)
- **App-level config**: A `.serverlessinsight/config.yml` at repo root defining shared app-level settings
- **State migration tooling**: Auto-migration from old flat state format to new file-isolated format
