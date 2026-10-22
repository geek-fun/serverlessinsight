# ADR 005: Provider adapters for local HTTP invocation

Status: implemented for the Volcengine HTTP subset in issue #268.

## Decision

Use an explicit provider registry of `LocalHttpAdapter` objects to validate the
execution mode, construct the HTTP invocation and translate its result. Both
function and API Gateway endpoints use this boundary. Keep the existing local
HTTP server, package resolution, worker loader, timeout and cleanup machinery.
The request's route kind remains available to adapters for trigger-specific
response behavior. Aliyun retains its existing FC transformation. Tencent,
AWS and Huawei keep explicitly registered legacy execution behavior; those
registrations do not establish provider-native parity.

Volcengine uses the documented veFaaS event and minimal context, with exact paths
matching the deployed gateway integration. Its string body contract supports
UTF-8 locally and reports unsupported binary input, execution modes and invalid
responses explicitly. The context builder can be reused when #261 repairs timer
simulation. Until then, local Volcengine timers warn and remain unscheduled.

## Alternatives considered

1. Extend the Aliyun-versus-default conditional. This leaves provider fallback
   implicit and duplicates event/response handling across the two HTTP endpoints.
2. Use small provider adapters over the shared execution machinery. This keeps
   contracts separate and lets #267 add Tencent behavior at the same boundary.
3. Run provider runtime containers or separate per-provider servers. This adds
   image distribution, OS dependencies and maintenance beyond the HTTP subset.

Option 2 fits the existing functional TypeScript structure and has no new runtime
dependencies. Expected maintenance over the next year is localized contract and
fixture updates per provider. Offline unit, worker and CLI tests cover the
boundary; the existing CI runs on Linux, Windows and macOS. Node and path APIs
handle process spawning and artifacts without shell-specific scripts.

## Consequences

Support claims must remain tied to tested provider/trigger contracts. Unsupported
Volcengine modes return localized diagnostics instead of borrowing another
provider's context. Raw request and response fidelity take precedence over JSON
convenience parsing. Cloud credentials, networking and deployment behavior are
outside the simulation. Live-cloud parity remains unverified.
