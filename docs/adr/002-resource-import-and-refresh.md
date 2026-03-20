# ADR-002: Resource Import and State Refresh

- **Status**: Proposed
- **Date**: 2026-03-20
- **Authors**: ServerlessInsight Team
- **Deciders**: @geek-fun/core

## Context

ServerlessInsight manages cloud resources through a state file (`.serverlessinsight/state-{app}-{service}.json`). The state file is the source of truth for tracking deployed resources, enabling incremental deployments and safe destruction.

**Current limitations**:

1. **No import capability** — Resources created outside ServerlessInsight (manually, via console, or by other tools) cannot be brought under management
2. **No explicit refresh** — State drift from manual changes cannot be detected without a full `plan` cycle
3. **Recovery gaps** — Lost state files require either manual JSON editing or redeployment with resource conflicts
4. **Onboarding friction** — Migrating existing infrastructure to ServerlessInsight requires either recreation or manual state manipulation

## Decision Drivers

1. **Infrastructure adoption** — Enable users to bring existing resources under ServerlessInsight management
2. **Drift detection** — Explicit mechanism to detect and reconcile state drift
3. **Disaster recovery** — Recover from lost/corrupted state files
4. **Safety** — Operations should be explicit, previewable, and reversible
5. **Provider agnosticism** — Design works across Alibaba Cloud, Tencent Cloud, and future providers

## Research: Terraform Model

Terraform provides two distinct operations for state management:

| Operation           | Purpose                    | State Change            | Resource Target            |
| ------------------- | -------------------------- | ----------------------- | -------------------------- |
| `terraform import`  | Onboard existing resources | Creates new state entry | Resources NOT in state     |
| `terraform refresh` | Sync state with reality    | Updates existing entry  | Resources ALREADY in state |

**Key insight**: These operations are orthogonal — import handles the **onboarding** problem, refresh handles the **drift** problem. They share implementation (query provider → write state) but serve different user intents.

### Why Separate Commands?

| Scenario                                    | Import                     | Refresh                      |
| ------------------------------------------- | -------------------------- | ---------------------------- |
| Resource exists in cloud, not in state      | ✅ Creates entry           | ❌ No-op (nothing to update) |
| Resource in state, cloud attributes changed | ❌ Error (already managed) | ✅ Updates entry             |
| User intent                                 | "Start managing this"      | "Fix stale state"            |

Merging them would create ambiguity: if a resource is already in state, should we error, overwrite, or merge? Separation makes intent explicit and safe.

## Decision

### Two New CLI Commands

#### Command 1: `si import`

Brings an existing cloud resource under ServerlessInsight management.

```bash
si import -f serverless.yml --resource <resource_address> --id <cloud_resource_id>

# Examples:
si import -f serverless.yml --resource functions.api --id my-api-fn
si import -f serverless.yml --resource events.gateway --id my-api-group
si import -f serverless.yml --resource buckets.static --id my-oss-bucket
```

**Behavior**:

1. Validates that the resource address exists in the YAML configuration
2. Queries the cloud provider to fetch current resource attributes
3. Creates a new state entry with `status: 'ready'` and `mode: 'managed'`
4. Errors if resource already exists in state

#### Command 2: `si refresh`

Updates the state file to match actual cloud infrastructure.

```bash
si refresh -f serverless.yml [--resource <resource_address>]

# Refresh all resources
si refresh -f serverless.yml

# Refresh specific resource
si refresh -f serverless.yml --resource functions.api
```

**Behavior**:

1. For each managed resource in state, queries the cloud provider
2. Updates state attributes to match actual cloud state
3. Reports drifted resources (attributes that changed)
4. No-op for resources not in state

### Resource Address Format

Use the same logical ID format as the YAML configuration:

```
<resource_type>.<resource_name>

Examples:
  functions.api           → function named "api"
  events.gateway          → event named "gateway"
  buckets.static          → bucket named "static"
  databases.primary       → database named "primary"
```

### Provider-Specific Identifiers

Each resource type has a provider-specific identifier used for import:

| Resource Type            | Alibaba Cloud ID | Tencent Cloud ID |
| ------------------------ | ---------------- | ---------------- |
| `functions.*`            | Function name    | Function name    |
| `events.*` (API Gateway) | API Group ID     | Service ID       |
| `buckets.*`              | Bucket name      | Bucket name      |
| `databases.*`            | DB instance ID   | DB instance ID   |
| `tables.*`               | Table name       | Table name       |

### Command Options

```bash
si import [options]
  -f, --file <path>        Serverless YAML file (required)
  -r, --resource <address> Resource logical ID (required)
  -i, --id <cloud_id>      Cloud provider resource ID (required)
  -s, --stage <stage>      Stage name (default: 'default')
  --help                   Show help

si refresh [options]
  -f, --file <path>        Serverless YAML file (required)
  -r, --resource <address> Resource logical ID (optional, defaults to all)
  -s, --stage <stage>      Stage name (default: 'default')
  --help                   Show help
```

### Type System Additions

```typescript
// src/types/domains/state.ts

export type ImportResult = {
  logicalId: string;
  resourceType: ResourceTypeEnum;
  cloudId: string;
  attributes: ResourceAttributes;
  imported: boolean;
};

export type RefreshResult = {
  logicalId: string;
  action: 'updated' | 'unchanged' | 'not_found';
  drift?: {
    before: ResourceAttributes;
    after: ResourceAttributes;
  };
};

export type ImportError = {
  code:
    | 'RESOURCE_ALREADY_MANAGED'
    | 'RESOURCE_NOT_FOUND_IN_CONFIG'
    | 'RESOURCE_NOT_FOUND_IN_CLOUD'
    | 'PERMISSION_DENIED';
  message: string;
  resourceId?: string;
};
```

### State File Changes

No schema changes required. Import creates new entries; refresh updates existing entries.

```json
// After import - new entry created
{
  "resources": {
    "functions.api": {
      "mode": "managed",
      "region": "cn-hongkong",
      "definition": { ... },
      "instances": [{ "id": "my-api-fn", ... }],
      "lastUpdated": "2026-03-20T10:00:00Z",
      "status": "ready"
    }
  }
}
```

### i18n Messages

```typescript
// src/lang/en.ts
IMPORT_SUCCESS: 'Successfully imported {{resourceType}} "{{logicalId}}" with cloud ID "{{cloudId}}"',
IMPORT_ALREADY_MANAGED: 'Resource "{{logicalId}}" is already managed by ServerlessInsight. Use "si refresh" to update its state.',
IMPORT_NOT_FOUND_IN_CONFIG: 'Resource address "{{logicalId}}" not found in configuration file.',
IMPORT_NOT_FOUND_IN_CLOUD: '{{resourceType}} with ID "{{cloudId}}" not found in the cloud provider.',
IMPORT_PERMISSION_DENIED: 'Permission denied when accessing {{resourceType}} "{{cloudId}}". Check your credentials.',

REFRESH_SUCCESS: 'Refreshed {{count}} resource(s).',
REFRESH_DRIFT_DETECTED: 'Drift detected for {{resourceType}} "{{logicalId}}"',
REFRESH_RESOURCE_NOT_FOUND: 'Resource "{{logicalId}}" exists in state but not found in cloud. It may have been deleted manually.',
REFRESH_NO_RESOURCES: 'No resources found in state to refresh.',
```

### Architecture

#### Layer 1: Command Handlers

```
src/commands/import.ts   → Import command handler
src/commands/refresh.ts  → Refresh command handler
```

#### Layer 2: Resource Operations

Each resource type implements `readResource` (already exists for most resources):

```typescript
// Existing pattern (already implemented)
export const readResource = async (
  context: Context,
  identifier: string,
): Promise<ResourceState | null> => {
  // Query cloud provider and return current state
};
```

#### Layer 3: Provider Clients

Uses existing client pattern:

```typescript
// src/common/aliyunClient/fc3Operations.ts
export const createFc3Operations = (fc3Client: Fc3Client) => ({
  getFunction: async (functionName: string) => { ... },  // Already exists
  // ...
});
```

### Implementation Plan

| Phase | Scope           | Key Tasks                                                           |
| ----- | --------------- | ------------------------------------------------------------------- |
| **1** | Type System     | `ImportResult`, `RefreshResult`, `ImportError` types, i18n messages |
| **2** | Import Command  | `src/commands/import.ts`, validation, state creation                |
| **3** | Refresh Command | `src/commands/refresh.ts`, drift detection, state update            |
| **4** | CLI Integration | Commander.js integration, help text, option parsing                 |
| **5** | Testing         | Unit tests, integration tests with mock providers                   |
| **6** | Documentation   | User guide, examples, troubleshooting                               |

### Detailed Behavior

#### Import Flow

```
1. Parse YAML configuration
2. Validate resource address exists in config
3. Check state file — error if already managed
4. Determine resource type from address (functions.* → FC3, buckets.* → OSS, etc.)
5. Call provider-specific readResource(identifier)
6. If not found in cloud → error
7. Create state entry with fetched attributes
8. Save state file
9. Report success
```

#### Refresh Flow

```
1. Parse YAML configuration
2. Load state file
3. For each resource in state (or specific resource if --resource specified):
   a. Call provider-specific readResource(identifier)
   b. If not found in cloud → report warning, optionally mark as tainted
   c. Compare attributes with state
   d. If different → update state, report drift
   e. If same → report unchanged
4. Save state file
5. Report summary
```

### Edge Cases

| Scenario                                 | Import                   | Refresh                           |
| ---------------------------------------- | ------------------------ | --------------------------------- |
| Resource in state but deleted from cloud | N/A                      | Report warning, mark as `tainted` |
| Resource in config but not in state      | Valid target             | N/A (not in state)                |
| Resource in state but not in config      | Error                    | Valid target (orphan)             |
| Import same resource twice               | Error: already managed   | N/A                               |
| Permission denied during read            | Error                    | Error, skip resource              |
| State file doesn't exist                 | Create empty state first | Error: no state to refresh        |

## Architecture Decisions

### Decision 1: Separate Commands for Import and Refresh

**Rationale**: Different user intents, different target resources (unmanaged vs managed), different failure modes. Following Terraform's proven design.

### Decision 2: Resource Address Uses YAML Logical ID

**Rationale**: Consistency with existing configuration format, familiar to users, maps directly to state file keys.

### Decision 3: Refresh Does Not Modify Config

**Rationale**: Refresh updates state to match cloud reality. If the user wants to align their config, they should review the drift and update manually. This prevents surprise config changes.

### Decision 4: Import Requires Config Entry

**Rationale**: Import maps an existing cloud resource to a config definition. The definition must exist first. This ensures imported resources are properly configured for future updates.

### Decision 5: No `--dry-run` for Import

**Rationale**: Import is read-only (queries provider) then writes state. The operation is safe and reversible (just remove from state). A `plan` after import will show if config matches imported state.

## Consequences

**Positive**:

- Enables infrastructure adoption from manual/cloud console origins
- Explicit drift detection mechanism
- Disaster recovery path for lost state files
- Consistent with Terraform conventions (familiar to DevOps users)

**Negative**:

- Additional CLI commands to document and maintain
- Import requires prior config definition (user friction)
- Refresh could mask configuration drift (state matches cloud but config doesn't)

**Risks**:

- Provider API changes affecting read operations
- Complex resources with many dependent resources (e.g., function + role + security group) require multiple imports
- State locking contention during long refresh operations

## User Guide

### Importing an Existing Function

```bash
# 1. Add function to your YAML (minimal definition)
# functions:
#   api:
#     name: my-existing-fn
#     code:
#       runtime: nodejs18
#       handler: index.handler

# 2. Import the function
si import -f serverless.yml --resource functions.api --id my-existing-fn

# 3. Verify with plan
si plan -f serverless.yml
# Should show "No changes" if config matches imported state
```

### Recovering from Lost State

```bash
# 1. Import all resources manually (tedious but recoverable)
si import -f serverless.yml --resource functions.api --id my-api-fn
si import -f serverless.yml --resource events.gateway --id my-api-group
si import -f serverless.yml --resource buckets.static --id my-oss-bucket

# 2. Verify with plan
si plan -f serverless.yml
```

### Detecting Drift

```bash
# Refresh all resources and see what changed
si refresh -f serverless.yml

# Output:
# Refreshed 5 resource(s).
# ⚠️  Drift detected for ALIYUN_FC3_FUNCTION "functions.api":
#     memory: 256 → 512
#     timeout: 10 → 30
```

## Future Considerations

### Bulk Import

A `si import --all` mode that attempts to auto-discover and import all resources matching the YAML configuration. Requires:

- Resource naming conventions
- Provider-specific list operations
- Heuristic matching (config name → cloud resource name)

### State Repair

A `si state repair` command that:

- Detects orphaned state entries (in state but not in config)
- Detects missing state entries (in config but not in state)
- Interactive mode for reconciliation

### Import Planning

A `si import --plan` mode that shows what would be imported without actually importing, similar to `terraform plan`.

## References

- [Terraform Import Documentation](https://developer.hashicorp.com/terraform/cli/commands/import)
- [Terraform Refresh Documentation](https://developer.hashicorp.com/terraform/cli/commands/refresh)
- [Terraform State Management](https://developer.hashicorp.com/terraform/language/state)
- [ADR-001: SSL/HTTPS Certificate Management](./001-ssl-certificate-management.md)
