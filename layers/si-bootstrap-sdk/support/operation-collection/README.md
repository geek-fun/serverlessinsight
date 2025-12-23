# SI Operation Collection

Simple Node.js scripts for managing SI bootstrap SDK operations.

## Setup

```bash
npm install
```

## Usage

### Publish Layer to Multiple Regions

```bash
node publish.js \
  --artifact ../../artifacts/si-bootstrap-sdk.zip \
  --layer-name si-bootstrap-sdk \
  --regions cn-beijing,cn-hangzhou,cn-chengdu \
  --runtimes nodejs20,nodejs18,nodejs16 \
  --delay 2
```

Or use environment variables:

```bash
export ALIYUN_ACCESS_KEY_ID=your-key-id
export ALIYUN_ACCESS_KEY_SECRET=your-key-secret
export ALIYUN_REGIONS=cn-beijing,cn-hangzhou,cn-chengdu
export ALIYUN_COMPATIBLE_RUNTIMES=nodejs20,nodejs18,nodejs16
export API_DELAY=2

node publish.js --artifact ../../artifacts/si-bootstrap-sdk.zip
```

## Required Environment Variables

- `ALIYUN_ACCESS_KEY_ID`: Aliyun access key ID
- `ALIYUN_ACCESS_KEY_SECRET`: Aliyun access key secret

## Optional Environment Variables

- `ALIYUN_SECURITY_TOKEN`: For STS temporary credentials
- `ALIYUN_ACCOUNT_ID`: Aliyun account ID (defaults to 1990893136649406)
- `ALIYUN_REGIONS`: Comma-separated list of regions
- `ALIYUN_COMPATIBLE_RUNTIMES`: Comma-separated list of compatible runtimes
- `API_DELAY`: Delay between API calls in seconds (default: 2)
