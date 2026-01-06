# Tencent Cloud COS (Cloud Object Storage) Support

This guide demonstrates how to use ServerlessInsight with Tencent Cloud COS buckets using the state-based deployment engine.

## Overview

The Tencent COS support provides full lifecycle management for cloud storage buckets with:

- **State Management**: Local state tracking in `.serverlessinsight/state.json`
- **Plan & Apply Flow**: Preview changes before applying them
- **Drift Detection**: Detect manual changes made outside ServerlessInsight
- **Website Hosting**: Configure static website hosting with error pages
- **Access Control**: Configure bucket ACL (private, public-read, public-read-write)
- **Idempotent Operations**: Safe to re-run deployments

## Prerequisites

1. Tencent Cloud account with API credentials
2. ServerlessInsight CLI installed
3. Bucket name must be globally unique across all Tencent Cloud users

## Configuration

Create a `serverless-insight.yml` file:

```yaml
version: 0.0.1
provider:
  name: tencent
  region: ap-guangzhou

service: my-service

buckets:
  my_bucket:
    name: my-unique-bucket-name-123456 # Must be globally unique
    security:
      acl: PUBLIC_READ # Optional: PRIVATE, PUBLIC_READ, or PUBLIC_READ_WRITE
    website: # Optional: Enable static website hosting
      code: dist # Local directory to deploy (not implemented yet)
      index: index.html
      error_page: 404.html
      error_code: 404
```

## Bucket Naming Requirements

Bucket names in Tencent COS must:

- Be globally unique across all Tencent Cloud users
- Be 1-50 characters long
- Contain only lowercase letters, numbers, and hyphens (-)
- Start and end with a lowercase letter or number

Example valid names:

- `my-app-bucket-20250101`
- `company-static-assets`
- `user123-data-bucket`

## Supported Regions

Common Tencent Cloud regions:

- `ap-guangzhou` - Guangzhou
- `ap-shanghai` - Shanghai
- `ap-beijing` - Beijing
- `ap-chengdu` - Chengdu
- `ap-hongkong` - Hong Kong
- `ap-singapore` - Singapore
- `na-siliconvalley` - Silicon Valley
- `na-ashburn` - Virginia

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

- Buckets to be **created** (green `+`)
- Buckets to be **updated** (yellow `~`)
- Buckets to be **deleted** (red `-`)
- Buckets with **no changes** (blue `=`)

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

1. Generate a plan for all resources (functions + buckets)
2. Execute the plan (create/update/delete buckets)
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
    "buckets.my_bucket": {
      "type": "COS_BUCKET",
      "physicalId": "my-unique-bucket-name-123456",
      "region": "ap-guangzhou",
      "configHash": "abc123...",
      "lastUpdated": "2025-01-01T12:00:00Z"
    }
  }
}
```

**Important**: Add `.serverlessinsight/` to your `.gitignore` if you don't want to commit state files.

## Access Control (ACL)

Configure bucket permissions using the `security.acl` field:

### Private Bucket

```yaml
buckets:
  my_bucket:
    name: my-private-bucket
    security:
      acl: PRIVATE # Only bucket owner has access
```

### Public Read Bucket

```yaml
buckets:
  my_bucket:
    name: my-public-bucket
    security:
      acl: PUBLIC_READ # Anyone can read, only owner can write
```

### Public Read-Write Bucket (Not Recommended)

```yaml
buckets:
  my_bucket:
    name: my-open-bucket
    security:
      acl: PUBLIC_READ_WRITE # Anyone can read and write
```

**Security Note**: `PUBLIC_READ_WRITE` allows anyone to upload files to your bucket, which may incur unexpected costs. Use with caution.

## Website Hosting

Enable static website hosting for your bucket:

```yaml
buckets:
  my_website_bucket:
    name: my-website-bucket
    security:
      acl: PUBLIC_READ # Website content must be publicly readable
    website:
      index: index.html # Default page
      error_page: 404.html # Error page
      error_code: 404 # HTTP error code
```

After deployment, your website will be accessible at:

```
http://my-website-bucket.cos-website.ap-guangzhou.myqcloud.com
```

**Note**: The `website.code` field is defined but automatic file upload is not yet implemented. You'll need to manually upload your website files using the Tencent COS console or CLI.

## Combining Functions and Buckets

You can deploy functions and buckets together:

```yaml
version: 0.0.1
provider:
  name: tencent
  region: ap-guangzhou

service: my-full-app

functions:
  api_function:
    name: my-api-function
    code:
      runtime: nodejs18
      handler: index.handler
      path: functions/api.zip
    memory: 512
    timeout: 10

buckets:
  static_assets:
    name: my-static-assets-123
    security:
      acl: PUBLIC_READ
    website:
      index: index.html
      error_page: 404.html
      error_code: 404
```

## Idempotency

Running `si deploy` multiple times with the same configuration is safe:

```bash
# First run - creates the bucket
si deploy my-stack -f serverless-insight.yml

# Second run - detects no changes needed
si deploy my-stack -f serverless-insight.yml
```

## Drift Detection

If someone modifies the bucket in Tencent Cloud Console, the plan command will detect the drift:

```bash
si plan my-stack -f serverless-insight.yml
```

Output will show:

```
[UPDATE] Resources to be updated:
  ~ buckets.my_bucket (COS_BUCKET)
    [DRIFTED] Remote configuration differs from state
```

## Updating Buckets

### Change ACL

Update the access control:

```yaml
buckets:
  my_bucket:
    name: my-bucket
    security:
      acl: PRIVATE # Changed from PUBLIC_READ to PRIVATE
```

Run `si deploy` to apply the change.

### Add Website Hosting

Add website configuration to an existing bucket:

```yaml
buckets:
  my_bucket:
    name: my-bucket
    security:
      acl: PUBLIC_READ
    website: # Added website configuration
      index: index.html
      error_page: 404.html
      error_code: 404
```

Run `si deploy` to apply the change.

## Deleting Buckets

To delete a bucket, remove it from your YAML file and run deploy:

```yaml
# Before
buckets:
  my_bucket:
    name: my-bucket

# After - bucket removed
buckets: {}
```

Run `si deploy` to delete the bucket.

**Warning**: The bucket must be empty before it can be deleted. If the bucket contains objects, the deletion will fail.

## Examples

### Simple Public Bucket

```yaml
version: 0.0.1
provider:
  name: tencent
  region: ap-guangzhou

service: simple-bucket

buckets:
  assets:
    name: my-assets-bucket-20250101
    security:
      acl: PUBLIC_READ
```

### Website Hosting Bucket

```yaml
version: 0.0.1
provider:
  name: tencent
  region: ap-guangzhou

service: my-website

buckets:
  website:
    name: my-website-bucket-20250101
    security:
      acl: PUBLIC_READ
    website:
      index: index.html
      error_page: error.html
      error_code: 404
```

### Multiple Buckets

```yaml
version: 0.0.1
provider:
  name: tencent
  region: ap-guangzhou

service: multi-bucket-app

buckets:
  public_assets:
    name: public-assets-20250101
    security:
      acl: PUBLIC_READ

  private_data:
    name: private-data-20250101
    security:
      acl: PRIVATE

  website:
    name: website-20250101
    security:
      acl: PUBLIC_READ
    website:
      index: index.html
      error_page: 404.html
      error_code: 404
```

## Troubleshooting

### Bucket Name Already Exists

Error: `BucketAlreadyExists` or `BucketAlreadyOwnedByYou`

**Solution**: Bucket names must be globally unique. Try a different name with random suffix:

```yaml
name: my-bucket-a1b2c3d4e5
```

### Authentication Errors

Error: `AuthFailure.SecretIdNotFound`

**Solution**: Ensure your Secret ID and Secret Key are correct:

```bash
export TENCENTCLOUD_SECRET_ID=your_secret_id
export TENCENTCLOUD_SECRET_KEY=your_secret_key

si deploy my-stack -f serverless-insight.yml
```

### Bucket Not Empty

Error: `BucketNotEmpty` when deleting

**Solution**: Empty the bucket before deletion using Tencent Cloud Console or CLI:

```bash
# Using Tencent Cloud CLI (coscmd)
coscmd delete -r -f /
```

### Website Not Accessible

If your website is not accessible after deployment:

1. Verify ACL is set to `PUBLIC_READ`
2. Check that `index` and `error_page` files exist in the bucket
3. Access the website using the correct URL format:
   ```
   http://{bucket-name}.cos-website.{region}.myqcloud.com
   ```

### State File Conflicts

If you encounter state conflicts, you can:

1. Delete `.serverlessinsight/state.json` and re-deploy (will recreate resources)
2. Manually edit the state file (advanced users only)

## Limitations

Current limitations:

- No automatic file upload from `website.code` directory (planned)
- No support for bucket lifecycle policies
- No support for bucket replication
- No support for bucket logging
- No support for bucket tags
- No support for bucket encryption (SSE)
- No cross-resource dependencies

These features will be added in future releases.

## Cost Considerations

Tencent COS charges for:

- **Storage**: Amount of data stored (GB/month)
- **Requests**: Number of API requests (read/write)
- **Traffic**: Data transfer out (GB)
- **Website Hosting**: No additional charge for hosting feature

Public buckets (`PUBLIC_READ` or `PUBLIC_READ_WRITE`) can incur higher traffic costs if content is heavily accessed. Consider using CDN for high-traffic websites.

## Security Best Practices

1. **Use PRIVATE for sensitive data**: Don't expose confidential data publicly
2. **Enable encryption**: Use server-side encryption for sensitive data (coming soon)
3. **Limit bucket permissions**: Use least privilege principle
4. **Monitor access**: Enable access logging to track who accesses your buckets (coming soon)
5. **Use CDN**: Serve public content through Tencent Cloud CDN for better security and performance

## Next Steps

1. Try the example: `samples/tencent-poc-cos.yml`
2. Combine with functions: See `samples/tencent-poc-scf.yml`
3. Read the [main documentation](../README.md)
4. Explore other cloud providers (Aliyun, Huawei)
5. Check Tencent Cloud COS documentation: https://cloud.tencent.com/document/product/436

## Related Documentation

- [Tencent SCF Support](./README_TENCENT_SCF.md) - Serverless functions
- [Main README](../README.md) - General documentation
- [Aliyun Bucket Support](../samples/aliyun-poc-bucket.yml) - Compare with Aliyun implementation
