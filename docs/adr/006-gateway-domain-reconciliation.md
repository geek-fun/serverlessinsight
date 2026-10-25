# ADR 006: Observable and scoped gateway domain reconciliation

Status: implemented for Aliyun direct API Gateway domains.

## Problem

A gateway domain drift reason could accompany identical displayed attributes.
Missing entries in a group summary were treated as missing bindings without
checking domain details. An update then rewrote the group and every API and
repeated DNS verification for unchanged domains. A domain skip path also saved
the previous intent instead of the updated API definition.

## Decision

Compare each desired primary and optional www domain against the provider's
readable fields. Confirm an omitted summary entry using `DescribeDomain`.
Confirmed absence is `null`; an unavailable certificate body is `undefined`.
Read failures stop planning. A known gateway certificate ID with an omitted body
does not prove that a certificate is absent.

Human and JSON plans show `domainBindings.<domain>` with existence, redirect and
SHA-256 certificate fingerprints where those dimensions are readable. Certificate
PEM content and private keys are not added to these diagnostic attributes.
Fingerprints normalize whitespace. CAS references are compared by effective
certificate content, rather than gateway-generated certificate IDs. A verified
equivalent reference change updates saved intent without a cloud mutation.

Attach an optional execution scope to the in-memory plan. Certificate-only drift
uses `SetDomainCertificate`; an existing binding needing a redirect update uses
`SetDomain` without DNS verification. Only missing bindings enter the DNS path.
Group, API deployment and logging writes run only for their changed dimensions.
Changed declared intent still applies when a corresponding live field is
unavailable. Skipped mutations retain recorded instances and save new intent.

Omitting `www_bind_apex` restores false; omitting protocol restores HTTP. Removed
owned bindings and certificates are deleted explicitly. Certificate deletion uses
the current gateway-assigned ID, as required by
[DeleteDomainCertificate](https://api.alibabacloud.com/document/CloudAPI/2016-07-14/DeleteDomainCertificate).
Removed domains' DNS records are deleted only by recorded CNAME/TXT identities.
Foreign, data-mode and legacy `existing` placeholder records are preserved.
DNS child entries, including domain-qualified keys, are excluded from gateway
deletion plans. A failed repair retains previous intent so the next run retries.

## Alternatives considered

1. Improve only the formatter. This exposes more detail but leaves false missing
   bindings, redundant deployment and DNS checks unchanged.
2. Disable domain refresh. This reduces updates but hides actual certificate and
   binding drift, so a successful plan no longer checks these managed dimensions.
3. Compare readable domain dimensions and pass a narrow repair scope to the
   existing executor. This fixes observation and execution together while keeping
   the established mutation wrappers and state format.

Option 3 adds no runtime dependencies or platform-specific commands. Over the
next year, expected maintenance is limited to provider response mappings and
regressions for these domain lifecycle transitions. The optional scope preserves
compatibility for existing plans and callers. No state version change is needed.

## Validation and limits

Unit tests cover provider request mapping, missing versus unavailable fields,
certificate fingerprints, failures and selective repairs. Service tests use real
YAML parsing, planning, execution, state save/reload and human/JSON formatting,
with mocked cloud clients. They verify that successful repairs converge to noop,
that unrelated mutations are skipped, and that removal and retry preserve ownership.

Unreadable live certificate content cannot establish equality. An unchanged
declaration does not trigger a speculative replacement; a changed certificate
declaration still applies. CDN transitions, no-refresh plans and legacy callers
without a scope use the existing full reconciliation path. These changes do not
claim new CDN drift coverage or replace the gateway API trigger comparison.
Live-cloud execution remains unverified by the offline tests.
