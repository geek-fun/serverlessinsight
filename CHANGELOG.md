# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
