#!/bin/bash -eux
set -o pipefail

cd "$(dirname "$0")/.." || exit

SOURCE_CODE_BASE64=$(base64 -i ./artifacts/si-bootstrap-sdk.zip)

ALIYUN_REGION="cn-hangzhou" ./scripts/aliyuncli.sh fc POST /2023-03-30/layers/si-bootstrap-sdk/versions \
  --header "Content-Type=application/json" \
  --body "{\"compatibleRuntime\":[\"nodejs20\",\"nodejs18\",\"nodejs16\"],\"code\":{\"zipFile\":\"${SOURCE_CODE_BASE64}\"},\"license\":\"Apache-2.0license\"}"
