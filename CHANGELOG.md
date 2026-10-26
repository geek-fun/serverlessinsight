# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Deprecated

- `si plan` is deprecated in favor of `si diff`, which is now the sole long-term
  CLI command for previewing deployment changes
  ([#271](https://github.com/geek-fun/serverlessinsight/issues/271)). The
  registration is consolidated into one command implementation with `plan` kept
  as a temporary compatibility alias: both names perform the identical
  read-only operation with the same options, exit codes (`0` no changes / `2`
  changes / `1` errors) and `--json` envelope (`planVersion: 1`). Invoking
  `si plan` prints a localized deprecation warning on stderr (stdout stays
  parseable); `si diff` never warns. Migrate by replacing the command verb —
  the same flags and arguments are accepted. `plan` will be removed in an
  explicitly documented breaking release that follows at least one published
  release carrying this warning (version to be announced).

### Changed

- CLI help, README examples, command references and sample guides now promote
  `si diff` as the primary planning command; `si plan` is presented as its
  deprecated alias.

## [0.9.3] - 2026-10-24

### Added

- `si local` now invokes veFaaS functions with a veFaaS-native HTTP event and fires
  `triggers.timer` schedules locally with the documented CloudEvents timer envelope,
  so veFaaS HTTP- and timer-driven handlers can be debugged without deploying
  ([#268](https://github.com/geek-fun/serverlessinsight/issues/268),
  [#261](https://github.com/geek-fun/serverlessinsight/issues/261)).
- `si local` runs Tencent SCF functions with an SCF-native invocation context and
  simulates the HTTP trigger contract si deploys (function URL delivering an
  API-Gateway-compatible event), instead of falling back to a generic non-Aliyun
  shape; unsupported contracts are reported clearly rather than silently substituted
  ([#267](https://github.com/geek-fun/serverlessinsight/issues/267)).
- Plans now enforce lifecycle ownership for what si created: removing a bucket `iam`
  policy, a bucket domain, a function HTTP trigger or custom domain, or
  `triggers.timer` from the YAML deletes the corresponding cloud resources (and their
  recorded dependents) on the next deploy instead of silently retaining them, and the
  removals show up in the plan before/after
  ([#264](https://github.com/geek-fun/serverlessinsight/issues/264)).

### Fixed

- `si plan` and `si diff` now work for Volcengine stacks.
- Deployment diffs now reflect changes made to managed resources directly in the
  cloud, restore documented defaults on update, and repair drifted dependents
  ([#264](https://github.com/geek-fun/serverlessinsight/issues/264)).
- veFaaS functions with `logEnabled` or HTTP/domain triggers no longer crash during
  planning.
- Bucket planning no longer fails when the account lacks permission to read ACL or
  CORS settings: those optional sub-config values are treated as absent, while
  identity and existence checks remain strict.
- `si local` no longer fails on non-JSON response metadata in function logs.

## [0.9.2] - 2026-10-05

### ⚠️ Breaking change

- **Generated API Gateway resource names are now collision-safe.** Aliyun apiNames
  (`agw_api` events), Volcengine route names, and Aliyun group names are produced by a
  deterministic constrained-name builder ([#221](https://github.com/geek-fun/serverlessinsight/issues/221),
  [#222](https://github.com/geek-fun/serverlessinsight/issues/222)): when a composed name exceeds the provider
  limit, the leading human-readable segments are truncated while the method/path
  discriminator is preserved, and a deterministic hash suffix guarantees distinctness.
  - Configurations whose previous names already fit their provider limit keep the
    exact same generated names.
  - Deployments affected by the historical truncation will regenerate names. Existing
    cloud APIs/routes created under old truncated names are no longer matched by
    `expectedApiNames` during updates: they become orphaned instead of adopted, so
    plans may show create operations for new names. Manually delete superseded
    gateway resources after upgrading.
- **Aliyun API Gateway groups are now per-event.** The group name includes the event
  key (`<service>-<stage>-<eventKey>-agw-group`), so multiple `API_GATEWAY` events
  under one service+stage each own their group instead of fighting over one shared
  group's ownership tag. Groups created before this change are orphaned on the next
  plan (same regeneration story as above); delete them manually after upgrading.
- **Volcengine `python3.8/v1` runtime removed.** Volcengine has retired Python 3.8
  for veFaaS (product notice). The two newer native runtime ids from
  Volcengine-maintained tooling were added: `native-python3.12/v1`,
  `native-node20/v1`.

### Added

- Schedule functions with `functions.*.triggers.timer`: a provider-agnostic si-cron
  expression (5-field, 6-field with seconds, or `@every <duration>`, interpreted in
  UTC) is translated to each provider's cron dialect (Aliyun FC3, Tencent SCF,
  Volcengine veFaaS), validated before deploy — including per-provider capability
  limits (Tencent allows at most 10 timers per function) — registered by trigger
  name in state, and drift-checked so console-side edits or deletions are detected
  and repaired on the next deploy
  ([#259](https://github.com/geek-fun/serverlessinsight/pull/259)).
- `si local` now fires `triggers.timer` schedules locally and invokes your handler
  with the provider's timer event shape, so timer-driven code can be debugged
  without deploying
  ([#259](https://github.com/geek-fun/serverlessinsight/pull/259)).
- Agent- and script-friendly CLI foundation: `--json` outputs, exported JSON Schema,
  and documented exit/error code conventions
  ([#256](https://github.com/geek-fun/serverlessinsight/pull/256)).
- Huawei Cloud FunctionGraph is now first-class in runtime compatibility checks:
  standard runtime ids map to the officially supported FunctionGraph runtimes
  (Node.js 10–20, Python 3.6/3.9/3.10/3.12, Java 8/11/17/21, Go 1.x, .NET Core 3.1),
  so literal `runtime` values validate for provider `huawei` instead of always
  failing.
- Pre-deploy semantic validation runs alongside schema validation and reports, in a
  single aggregated error set: duplicate `method+path` triggers per event,
  duplicate generated apiName/routeName within the deploy scope, dangling
  `${functions.x}` trigger backends, plus provider-conditional function-name length
  limits (Aliyun ≤ 64, Tencent ≤ 60) enforced through JSON Schema `if/then`, and
  literal-format rules for trigger paths (`^/…`), bucket names and domain hostnames.
  Template references (`${vars.x}`, …) bypass literal format rules by design.
- Samples-as-canaries: a unit test validates every `samples/*.yml` through the full
  schema + semantic validation, so sample drift fails CI instead of users.
- Fixed trigger definitions being silently unvalidated inside `events.*.triggers`
  items (the subschema lacked its object envelope), which also hid HTTP-method enums.

### Fixed

- Table schema now accepts `network.vpc_id` (the resource layer always passed it
  through) and rejects unknown keys inside `network` via `additionalProperties`.
- Schema error formatter no longer prints an empty `Allowed values:` line when the
  violating rule has no allowed values.
- Localized the BUCKET_STORE backend error message to the i18n system
  ([#222](https://github.com/geek-fun/serverlessinsight/issues/222)).

## [0.9.0] - 2026-09-11

### Added

- `si plan` — also available as the new `si diff` alias — now diffs against
  **live cloud state**: every update renders a complete live→desired,
  field-level comparison with per-field Add/Modify/Remove annotations, so
  out-of-config drift and pure-drift updates are explained instead of shown as
  empty ([#246](https://github.com/geek-fun/serverlessinsight/issues/246)).
- Drifted resources report a probe-level reason for the drift, and a failed
  live read now surfaces a warning and degrades to a drifted create instead of
  silently passing.

### Fixed

- Aliyun: deploy container-only functions that define no code payload — the
  code zip/OSS upload is skipped for container-image functions, and configs
  that define both container and code (or neither) are rejected during
  validation ([#239](https://github.com/geek-fun/serverlessinsight/issues/239)).
- Aliyun: recreated NAS mount targets bind to the normalized access-group name
  (`mnt-data`, not `/mnt/data`) and are tracked with their live domain after
  repair, so the repair succeeds on real providers and later deploys/destroys
  follow the target that actually exists
  ([#234](https://github.com/geek-fun/serverlessinsight/issues/234)).

### Documentation

- Added ADR-004 describing the plugin architecture for resource providers.

## [0.7.2] - 2026-06-26

### Fixed

- Remove misleading `-p`/`--port` flag from `si local` command. The local stack
  is a single unified HTTP server that multiplexes across all simulated cloud
  services (API Gateway, functions, buckets) — a single port flag creates false
  expectations about which service's port is being controlled.

## [0.7.1] - 2026-06-26

### Fixed

- Always set errorDocument=indexDocument and enable SupportSubDir for OSS
  static websites (#196) (#197)

### Added

- CDN integration with OSS and API Gateway CDN support (#195)
