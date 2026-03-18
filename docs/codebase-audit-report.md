# ServerlessInsight Codebase Audit Report

**Date**: 2026-03-18
**Last Updated**: 2026-03-18
**Status**: Tier 1 & Tier 2 Completed

---

## Remaining Work

### Tier 3 — IaC Maturity (~1-2 days)

| #   | Action                                  | Effort  | Description                                                                  |
| --- | --------------------------------------- | ------- | ---------------------------------------------------------------------------- |
| 3.1 | Implement `si import <type> <cloud-id>` | 4-6 hrs | Adopt existing cloud resources into state (equivalent to `terraform import`) |
| 3.2 | Implement `si state rm <resource-key>`  | 2-3 hrs | Remove a resource from state without destroying it                           |
| 3.3 | Add `si state list` subcommand          | 2-3 hrs | List all tracked resources in state file                                     |

### Tier 4 — Future Roadmap

| #   | Action                          | Effort   | Notes                                                       |
| --- | ------------------------------- | -------- | ----------------------------------------------------------- |
| 4.1 | `si state mv <old> <new>`       | 3-4 hrs  | Resource key renaming                                       |
| 4.2 | `si refresh`                    | 4-6 hrs  | Explicit state sync with cloud (plan already detects drift) |
| 4.3 | Graph-driven parallel execution | 1-2 days | Use existing dependency graph for parallel deploy           |
| 4.4 | Saved plan concept              | 1-2 days | `plan --out` / `deploy --plan` serialization                |
| 4.5 | `si invoke` / `si logs`         | 2-3 days | Remote function testing and log tailing                     |

### Architectural Issues (Pending)

#### 4.2 Dependency Graph Built but Unused

**File**: `src/stack/aliyunStack/deployer.ts`

The deployer builds a dependency graph for resource ordering but currently only uses it for validation. The actual execution is sequential based on a hardcoded order.

**Action**: Implement graph-driven parallel execution (Tier 4.3).

#### 4.4 No Saved Plan Concept

Terraform supports `terraform plan -out=plan.tfplan` followed by `terraform apply plan.tfplan`, ensuring what was reviewed is exactly what gets applied. ServerlessInsight's plan output is ephemeral.

**Action**: Implement plan serialization (Tier 4.4).

---

## Missing Commands (P1-P3)

### P1 — Important

| Command                 | Purpose                                           | Terraform Equivalent   |
| ----------------------- | ------------------------------------------------- | ---------------------- |
| `si import <type> <id>` | Adopt existing cloud resources into state         | `terraform import`     |
| `si state list`         | List all tracked resources in state               | `terraform state list` |
| `si state rm <id>`      | Remove a resource from state (without destroying) | `terraform state rm`   |

### P2 — Valuable

| Command                   | Purpose                             | Terraform Equivalent   |
| ------------------------- | ----------------------------------- | ---------------------- |
| `si state show <id>`      | Show detailed info for one resource | `terraform state show` |
| `si state mv <old> <new>` | Rename/move resource in state       | `terraform state mv`   |

### P3 — Nice to Have

| Command      | Purpose                             | Notes                                         |
| ------------ | ----------------------------------- | --------------------------------------------- |
| `si refresh` | Sync state with actual cloud state  | Lower priority — `plan` already detects drift |
| `si invoke`  | Invoke a deployed function remotely | Useful for debugging but not core IaC         |
| `si logs`    | Tail function logs                  | Useful for debugging but not core IaC         |

---

## IaC Best Practices Gap Analysis

| Capability         | Terraform        | ServerlessInsight       | Status  |
| ------------------ | ---------------- | ----------------------- | ------- |
| Import existing    | ✅ `import`      | ❌                      | **Gap** |
| State inspection   | ✅ `state list`  | ❌                      | **Gap** |
| State manipulation | ✅ `state rm/mv` | ❌                      | **Gap** |
| Saved plans        | ✅ `plan -out`   | ❌                      | **Gap** |
| Refresh state      | ✅ `refresh`     | ⚠️ Partial (via `plan`) | Minor   |

---

## File Reference

### Architecture

| File                                | Description                                 |
| ----------------------------------- | ------------------------------------------- |
| `src/stack/aliyunStack/deployer.ts` | Dependency graph (needs parallel execution) |
| `src/stack/aliyunStack/planner.ts`  | Aliyun plan generation                      |
| `src/stack/scfStack/deployer.ts`    | Tencent deployment engine                   |
| `src/stack/scfStack/planner.ts`     | Tencent plan generation                     |

### State Backend (Refactored)

| File                                            | Lines | Description                             |
| ----------------------------------------------- | ----- | --------------------------------------- |
| `src/common/stateBackend/types.ts`              | 18    | `StateBackend` + `StorageAdapter` types |
| `src/common/stateBackend/lockUtils.ts`          | 42    | Shared lock utilities                   |
| `src/common/stateBackend/remoteStateBackend.ts` | 197   | Shared remote backend factory           |
| `src/common/stateBackend/ossStateBackend.ts`    | 68    | OSS storage adapter                     |
| `src/common/stateBackend/cosStateBackend.ts`    | 122   | COS storage adapter                     |
| `src/common/stateBackend/localStateBackend.ts`  | 63    | Local filesystem state backend          |
