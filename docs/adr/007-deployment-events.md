# ADR 007: Deployment event ordering, ownership and protocol versioning

Status: implemented for the CLI-to-Console deployment event pipeline.

## Problem

Deployment events were ordered by the database `created_at`, which records the
insert time on the Console, not the time an event happened. The CLI batches
events asynchronously (durable JSONL queue, 20 events or a 5-second heartbeat),
so a batch flushed after the terminal PATCH landed with a later `created_at`
than the completion milestone. The frontend then sorted by that timestamp again
and derived the deployment's end state from the last event, so a completed
deployment could render an "Apply / in-progress" summary. Lifecycle milestones
were written twice (server and CLI) with messages in two languages, `noop`
resources never received a completing event, and a hung request could block
process exit while a v1 API silently stripped the new timestamp field.

## Decision

### Ownership

The Console owns lifecycle milestones. It writes the start and terminal events
in the same transaction as the status transition, with `occurred_at` equal to
the deployment row's `started_at` / `completed_at`. Duplicate requests return
the committed result and keep the original milestone. Once the server declares
event protocol v2, the CLI stops emitting `deployment_started`,
`deployment_completed` and `deployment_failed` display events; it only reports
`resource_pre` / `resource_complete` / `resource_failed`. The frontend prefers
the server record when a pre-v2 CLI duplicated a milestone and renders lifecycle
titles from structure (`type` / `phase`) in the viewer's language; stored
messages remain as diagnostic detail in expanded rows.

### Ordering

The detail API returns a fixed order that never compares clocks across writers:

1. the server-written start milestone,
2. sequenced CLI events by `sequence`,
3. unsequenced legacy events by display time (`COALESCE(occurred_at,
   created_at)`) and record id,
4. the server-written terminal milestone.

The frontend renders events in API order and does not re-sort. `occurred_at` is
display metadata only. `noop` resource groups are hidden (matching the Changes
tab); a resource whose last event is a start event after the deployment ended
renders as "result unknown".

### Fields

`occurred_at` is a nullable `timestamptz` stamped by the CLI at emit time.
Replays and retries keep the original value. Rows without it fall back to
`created_at` for display. `created_at` is pure storage metadata. `sequence` is
the client's monotonic per-deployment integer and the ordering key for CLI
events; `(deployment_id, sequence)` identifies retries — identical content is
confirmed idempotently, different content under the same sequence is rejected
with a conflict and the batch stays on the client.

### Protocol versioning

`GET /api/v1/capabilities` advertises `deploymentEventsProtocol: 2`. A v2 batch
PATCH carries the same top-level marker; every event in it must have a valid
`occurredAt` and a `sequence`. The marker is what protects the timestamp: a
pre-v2 API has a strict request schema and rejects the unknown top-level field
instead of accepting the batch and silently dropping `occurredAt`. The CLI
probes capabilities and falls back to v1 (no marker, timestamps stripped by the
old server) only when the probe fails or does not declare v2. Batches already
written to disk keep their original shape until a compatible API is available.

### Delivery

Every batch insert is one transaction. After the terminal PATCH commits, the
CLI flushes the remaining queue — never before the terminal PATCH, because late
batches only add resource detail while the Console anchors the end state on
`deployment.status`. Exit flush and startup replay run under a time budget that
cancels in-flight requests through an `AbortSignal` passed down to
`fetch`. A batch the server rejects with a 4xx (except 408/429) is a permanent
rejection: it leaves the pending queue for the rest of the run and its records
stay in the JSONL file for inspection. Queue files live under
`event-queue/v2`, are atomically claimed by rename for replay, record the
Console origin per event, and files without a matching origin are preserved for
explicit recovery.
