# Provider and region deployment state

A deployment is identified by `org / app / service / stage / provider / region`.
App and Service are literal YAML identities. They cannot be overridden by CLI flags,
environment variables or template expressions. `-s`, `-v` and `-r` select a stage,
provider and region; they do not move existing resources.

```yaml
version: 0.0.1
app: example
service: api
provider:
  name: aliyun
  region: cn-hangzhou
backend:
  state_manager:
    type: BUCKET_STORE
    bucket: example-state
    key: infra/state.json
```

```bash
si deploy -s prod -r cn-hangzhou
si deploy -s prod -r ap-southeast-1
si destroy -s prod -r cn-hangzhou
```

The second deploy creates an independent regional deployment. An existing selected
partition is updated; all other partitions remain present until explicitly destroyed.
A provider override follows the same rule. The effective template must be supported by
the selected provider; an override does not translate vendor-specific resource fields.
Cloud credentials authorize access, but cloud account IDs do not enter deployment identity.
Use different Organizations/Apps/Services for deployments that need separate ownership.
Changing credentials does not create a new partition or adopt foreign resources.

## Local and Bucket storage

The authoritative location is unchanged:

| Backend | State location                                  | Lock                      |
| ------- | ----------------------------------------------- | ------------------------- |
| Local   | `.serverlessinsight/state-<app>-<service>.json` | Same path plus `.si-lock` |
| Bucket  | Exact YAML `key`, e.g. `infra/state.json`       | Same key plus `.si-lock`  |

Both hold a V4 aggregate. There are no authoritative per-region folders or provider
binding files. Each partition owns its resources, shared resources, lineage, serial and
SaaS ownership/migration metadata.

The aggregate and its single-deployment view both use version `4.0`. Storage readers
validate the aggregate structure; executors and snapshot APIs validate the selected
deployment structure.

```json
{
  "version": "4.0",
  "app": "example",
  "service": "api",
  "stages": {
    "prod": {
      "providers": {
        "aliyun": {
          "regions": {
            "cn-hangzhou": {
              "lineage": "deployment-uuid",
              "serial": 1,
              "resources": {},
              "shared": {}
            }
          }
        }
      }
    }
  }
}
```

One command reads a single-deployment V4 view. Under the whole-file deployment lock,
writes read the fresh aggregate and merge only that partition. A change to the planned
partition invalidates the plan before cloud execution; changes to siblings do not.
Partial execution results stay in the selected partition. All Local/Bucket scopes
serialize against the same file/key, including migrations and SaaS handoffs.

Bucket storage provider, region and credentials are independent from workload overrides.
`storageProvider` and `storageRegion` explicitly select storage; otherwise the original
YAML provider/region defaults apply. A cross-provider workload uses the storage cloud's
credentials, not the workload cloud's credentials. Keep the bucket/key stable across
commands and YAML files that should share state.

## Upgrade and recovery

Upgrade all CLI writers before using V4 state. Keep the original state location and
Bucket configuration; do not change the YAML `key` or move files manually.

```bash
si deploy -s prod -r cn-hangzhou
```

`deploy` automatically upgrades V3 state in place to V4 before planning or cloud
execution. `destroy` and source-to-SaaS `migrate` use the same preparation. There is
no separate format-migration command. `diff` and `show` only project the selected
deployment in memory and do not upgrade the stored file.

Resource regions come from persisted evidence, independent of the selected workload
provider/region. Unknown-region resources require an explicitly reviewed binding:

```bash
si deploy -s prod -r cn-hangzhou --bind-unknown-region cn-hangzhou
```

The upgrade covers the complete original file, including every populated stage and
region, under its existing whole-file/key lock. Native resource IDs and SIDs are
preserved. It writes an immutable pre-upgrade backup, operation journal and report.
If interrupted, retain these files and rerun the original operation to resume. A
conflicting source or missing backup stops the operation before cloud execution.

The metadata upgrade can complete before the later deployment-plan confirmation;
cancelling that plan leaves V4 state in place without applying cloud changes. A
`migrate --dry-run` validates and previews the conversion without changing source
state or its ownership. There is no format rollback command. Preserve current state
and recover forward from retained evidence rather than overwrite newer partition
writes with an old whole file. Older clients reject V4; do not downgrade writers.

## SaaS protocol 3

Capabilities must advertise `scopeProtocol: 3`, `regionalScope: true`,
`providerScope: true` and `stateFormat: "4.0"`. Discovery and read-only commands do not
create lifecycle rows, deployment runs or billing windows. Existing Services need an
explicit server-side cutover; the CLI does not silently activate them.

Reads select `stage`, `provider` and `region`. Init, sync, import, start, complete and fail
use the same provider/region and `scopeProtocol: 3`. The lifecycle ID returned by init is
immutable. Current-state and write acknowledgements carry `serviceId`, `stageId`, stage,
provider, region and protocol; state acknowledgements also carry snapshot ID, version and
content hash. Mismatched metadata is an error, never an empty deployment.

SaaS snapshots remain single-deployment V4 JSON, without the runtime root `resources`
projection. Historical snapshot JSON and hashes are immutable. CAS uses the server's
`contentHash` through `baseContentHash` (`''` for an empty head). Repeated identical writes
are idempotent; stale writes and scope switches fail before changing the head.
Deployment event replay uses the immutable deployment UUID and per-run sequence.

`si migrate` imports and verifies only the selected partition, then marks only that
partition `managedBy=saas`. Siblings remain owned by their original backend. Local/Bucket
V3 is automatically prepared in place during the handoff; an aggregate V4 is never
uploaded as a SaaS snapshot. `si migrate --rollback` only removes the source ownership
marker after a reviewed handback; it does not downgrade state or copy newer SaaS state
back to the source.

Protocol tests mock the peer API independently in each repository. Normal repository
tests do not depend on a live peer service or a cross-repository test harness.
