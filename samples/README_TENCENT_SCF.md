# Tencent Cloud SCF (Serverless Cloud Function) Support

This guide demonstrates how to use ServerlessInsight with Tencent Cloud SCF using the new state-based deployment engine.

## Overview

The Tencent SCF support introduces a Terraform-like infrastructure management approach with:

- **State Management**: Local state tracking in `.serverlessinsight/state-example-app-my-service.json`
- **Plan & Apply Flow**: Preview changes before applying them
- **Drift Detection**: Detect manual changes made outside ServerlessInsight
- **Idempotent Operations**: Safe to re-run deployments

## Prerequisites

1. Tencent Cloud account with API credentials
2. ServerlessInsight CLI installed
3. Function code packaged as a ZIP file

## Configuration

Create a `serverless-insight.yml` file:

```yaml
version: 0.0.1
provider:
  name: tencent
  region: ap-guangzhou

vars:
  handler: index.handler

stages:
  default:
    node_env: default
  dev:
    node_env: development
  prod:
    node_env: production

app: example-app
service: my-service

backend:
  state_manager:
    type: LOCAL

functions:
  my_function:
    name: my-function-name
    code:
      runtime: nodejs18
      handler: index.handler
      path: path/to/function.zip
    memory: 512
    timeout: 10
    environment:
      NODE_ENV: ${stages.node_env}
      API_KEY: your-api-key
```

## Supported Runtimes

- Nodejs18.15
- Nodejs16.13
- Python3.7
- Python3.9
- And other Tencent SCF supported runtimes

## Commands

### Plan

Preview changes before deployment:

```bash
si diff \
  -f serverless-insight.yml \
  -r ap-guangzhou \
  -k YOUR_SECRET_ID \
  -x YOUR_SECRET_KEY
```

Output shows:

- Resources to be **created** (green `+`)
- Resources to be **updated** (yellow `~`)
- Resources to be **deleted** (red `-`)
- Resources with **no changes** (blue `=`)

### Deploy

Apply the infrastructure changes:

```bash
si deploy \
  -f serverless-insight.yml \
  -r ap-guangzhou \
  -k YOUR_SECRET_ID \
  -x YOUR_SECRET_KEY
```

The deploy command will:

1. Generate a plan
2. Execute the plan (create/update/delete functions)
3. Save the state to `.serverlessinsight/state-example-app-my-service.json`

### Validate

Validate your YAML configuration:

```bash
si validate -f serverless-insight.yml
```

## State Management

With the explicit LOCAL backend above, state remains at
`.serverlessinsight/state-example-app-my-service.json`. The V5 aggregate contains
independent stage/provider/region partitions, for example after selecting `-s prod`:

```json
{
  "version": "5.0",
  "app": "example-app",
  "service": "my-service",
  "stages": {
    "prod": {
      "providers": {
        "tencent": {
          "regions": {
            "ap-guangzhou": {
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

The executor works with only the selected partition. Its native IDs and revision are
preserved when another provider/region is deployed. All partitions in this file share
one deployment lock. See [deployment state and migration](../docs/regional-deployment-state.md).
Keep state and credentials out of version control.

## Idempotency

Running `si deploy` multiple times with the same configuration is safe:

```bash
# First run - creates the function
si deploy -f serverless-insight.yml

# Second run - detects no changes needed
si deploy -f serverless-insight.yml
```

## Drift Detection

If someone modifies the function in Tencent Cloud Console, the diff command will detect the drift:

```bash
si diff -f serverless-insight.yml
```

Output will show:

```
[UPDATE] Resources to be updated:
  ~ functions.my_function (SCF)
    [DRIFTED] Remote configuration differs from state
```

## Environment Variables

Use stages to manage different environments:

```yaml
stages:
  default:
    node_env: default
    api_url: https://api.example.com
  dev:
    node_env: development
    api_url: https://dev.api.example.com
  prod:
    node_env: production
    api_url: https://api.example.com

functions:
  my_function:
    environment:
      NODE_ENV: ${stages.node_env}
      API_URL: ${stages.api_url}
```

Deploy to different stages:

```bash
# Deploy to dev
si deploy -f serverless-insight.yml --stage dev

# Deploy to prod
si deploy -f serverless-insight.yml --stage prod
```

## Function Configuration

### Memory

Set function memory (in MB):

```yaml
functions:
  my_function:
    memory: 512 # 128-3072 MB
```

### Timeout

Set function timeout (in seconds):

```yaml
functions:
  my_function:
    timeout: 10 # 1-900 seconds
```

### Handler

Specify the entry point:

```yaml
functions:
  my_function:
    code:
      handler: index.handler # <file>.<function>
```

## Examples

See `samples/tencent-poc-scf.yml` for a complete example.

## Troubleshooting

### Authentication Errors

Ensure your Secret ID and Secret Key are correct:

```bash
export TENCENTCLOUD_SECRET_ID=your_secret_id
export TENCENTCLOUD_SECRET_KEY=your_secret_key

si deploy -f serverless-insight.yml
```

### Function Not Found

If you see "ResourceNotFound.FunctionName", the function doesn't exist yet. Run `si deploy` to create it.

### State File Conflicts

Keep the current state and backups. Confirm App/Service/Stage/Provider/Region and the
backend location, wait for the active writer, then refetch and re-plan. Upgrade V3 or
consolidate preview V4 through `si migrate --to-regional`; use operation-ID rollback
only before independent writes. Deleting or hand-editing state can lose sibling ownership.

## Limitations

Current limitations:

- No support for VPC configuration
- No support for triggers (API Gateway, COS, etc.)
- No support for layers
- Local, Bucket and SaaS backends have different lock scopes; choose the backend explicitly when following this Local example.
- No cross-resource dependencies

These features will be added in future releases.

## Next Steps

1. Try the example: `samples/tencent-poc-scf.yml`
2. Read the [main documentation](../README.md)
3. Explore other cloud providers (Aliyun, Huawei)
