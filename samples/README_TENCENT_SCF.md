# Tencent Cloud SCF (Serverless Cloud Function) Support

This guide demonstrates how to use ServerlessInsight with Tencent Cloud SCF using the new state-based deployment engine.

## Overview

The Tencent SCF support introduces a Terraform-like infrastructure management approach with:

- **State Management**: Local state tracking in `.serverlessinsight/state.json`
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

service: my-service

functions:
  my_function:
    name: my-function-name
    code:
      runtime: Nodejs18.15
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
si plan my-stack \
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
si deploy my-stack \
  -f serverless-insight.yml \
  -r ap-guangzhou \
  -k YOUR_SECRET_ID \
  -x YOUR_SECRET_KEY
```

The deploy command will:

1. Generate a plan
2. Execute the plan (create/update/delete functions)
3. Save the state to `.serverlessinsight/state.json`

### Validate

Validate your YAML configuration:

```bash
si validate my-stack -f serverless-insight.yml
```

## State Management

State is stored locally in `.serverlessinsight/state.json`:

```json
{
  "version": "0.1",
  "provider": "tencent",
  "resources": {
    "functions.my_function": {
      "type": "SCF",
      "physicalId": "my-function-name",
      "region": "ap-guangzhou",
      "configHash": "abc123...",
      "lastUpdated": "2025-01-01T12:00:00Z"
    }
  }
}
```

**Important**: Add `.serverlessinsight/` to your `.gitignore` if you don't want to commit state files.

## Idempotency

Running `si deploy` multiple times with the same configuration is safe:

```bash
# First run - creates the function
si deploy my-stack -f serverless-insight.yml

# Second run - detects no changes needed
si deploy my-stack -f serverless-insight.yml
```

## Drift Detection

If someone modifies the function in Tencent Cloud Console, the plan command will detect the drift:

```bash
si plan my-stack -f serverless-insight.yml
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
si deploy my-stack -f serverless-insight.yml --stage dev

# Deploy to prod
si deploy my-stack -f serverless-insight.yml --stage prod
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

si deploy my-stack -f serverless-insight.yml
```

### Function Not Found

If you see "ResourceNotFound.FunctionName", the function doesn't exist yet. Run `si deploy` to create it.

### State File Conflicts

If you encounter state conflicts, you can:

1. Delete `.serverlessinsight/state.json` and re-deploy (will recreate resources)
2. Manually edit the state file (advanced users only)

## Limitations

Current limitations:

- No support for VPC configuration
- No support for triggers (API Gateway, COS, etc.)
- No support for layers
- No remote state backends
- No cross-resource dependencies

These features will be added in future releases.

## Next Steps

1. Try the example: `samples/tencent-poc-scf.yml`
2. Read the [main documentation](../README.md)
3. Explore other cloud providers (Aliyun, Huawei)
