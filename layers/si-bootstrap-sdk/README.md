# ServerlessInsight bootstrap SDK

This is the bootstrap SDK for ServerlessInsight, packaged as an Aliyun Function Compute layer.

## Automated Publishing

The layer is automatically published to Aliyun Function Compute using GitHub Actions whenever changes are pushed to the `layers/si-bootstrap-sdk/` directory on the master branch.

### Supported Regions

The layer is published to the following Aliyun regions:
- `cn-beijing` (Beijing)
- `cn-hangzhou` (Hangzhou)
- `cn-chengdu` (Chengdu)
- `ap-southeast-1` (Singapore)

### Version Alignment

The automation ensures that all regions have the same layer version. If regions have different versions, the script will publish additional versions to align all regions to the latest version.

### Manual Trigger

You can manually trigger the publishing workflow from the GitHub Actions tab using the "workflow_dispatch" event.

### Prerequisites

The following secrets must be configured in the repository:
- `ALIYUN_ACCESS_KEY_ID`: Aliyun access key ID
- `ALIYUN_ACCESS_KEY_SECRET`: Aliyun access key secret

## Local Development

### Building the Layer

To build the layer locally:

```bash
cd layers/si-bootstrap-sdk
./scripts/package.sh
```

This will create a packaged layer at `./artifacts/si-bootstrap-sdk.zip`.

### Publishing Manually

To publish the layer to all regions manually:

```bash
cd layers/si-bootstrap-sdk
export ALIYUN_ACCESS_KEY_ID="your-access-key-id"
export ALIYUN_ACCESS_KEY_SECRET="your-access-key-secret"
export ALIYUN_REGIONS="cn-beijing,cn-hangzhou,cn-chengdu,ap-southeast-1"  # Optional, defaults shown
export ALIYUN_COMPATIBLE_RUNTIMES="nodejs20,nodejs18,nodejs16"  # Optional, defaults shown
./scripts/publish-to-regions.sh
```

You can customize the target regions by setting the `ALIYUN_REGIONS` environment variable with a comma-separated list of region names.

You can customize the compatible runtimes by setting the `ALIYUN_COMPATIBLE_RUNTIMES` environment variable with a comma-separated list of runtime identifiers.

## Layer Information

- **Compatible Runtimes**: nodejs20, nodejs18, nodejs16
- **License**: Apache-2.0
